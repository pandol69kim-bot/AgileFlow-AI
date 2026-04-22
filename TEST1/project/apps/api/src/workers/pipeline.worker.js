import http from 'http';
import { Worker, Queue } from 'bullmq';
import axios from 'axios';
import { redis } from '../lib/redis.js';
import { projectRepository } from '../repositories/project.repository.js';

export const pipelineQueue = new Queue('pipeline', { connection: redis });

const pipelineUrl = process.env.PIPELINE_URL ?? 'http://localhost:8000';

// agentName → dict state field (frontend/backend/test/deploy artifacts)
const AGENT_DICT_FIELDS = {
  '05_frontend_dev': 'frontend_code',
  '06_backend_dev':  'backend_code',
  '07_tester':       'test_artifacts',
  '08_deployer':     'deploy_artifacts',
};

// start_step별로 필요한 이전 단계 state 필드 (payload 최소화)
const STEP_PREREQ_FIELDS = {
  1: [],
  2: ['idea_analysis'],
  3: ['idea_analysis', 'product_requirements'],
  4: ['idea_analysis', 'product_requirements', 'design_system', 'wireframes', 'components',
      'tech_stack', 'architecture', 'database_schema', 'project_structure'],
  5: ['idea_analysis', 'product_requirements', 'design_system', 'wireframes', 'components',
      'tech_stack', 'architecture', 'database_schema', 'project_structure',
      'frontend_code', 'backend_code'],
  6: ['idea_analysis', 'product_requirements', 'design_system', 'wireframes', 'components',
      'tech_stack', 'architecture', 'database_schema', 'project_structure',
      'frontend_code', 'backend_code', 'test_artifacts'],
  7: ['idea_analysis', 'product_requirements', 'design_system', 'wireframes', 'components',
      'tech_stack', 'architecture', 'database_schema', 'project_structure',
      'frontend_code', 'backend_code', 'test_artifacts', 'deploy_artifacts'],
};

// 스트리밍 요청용 — keep-alive 비활성화로 연결 풀링 문제 방지
const pipelineAgent = new http.Agent({ keepAlive: false });

// filename → scalar state field
const FILENAME_STRING_FIELDS = {
  'idea_analysis_report.md': 'idea_analysis',
  'product_requirements.md': 'product_requirements',
  'design_system.md':        'design_system',
  'wireframes.md':           'wireframes',
  'components.md':           'components',
  'tech_stack.md':           'tech_stack',
  'architecture.md':         'architecture',
  'database_schema.md':      'database_schema',
  'project_structure.md':    'project_structure',
  'final_report.md':         'final_report',
};

function reconstructState(artifacts) {
  const state = {};
  for (const artifact of artifacts) {
    const dictField = AGENT_DICT_FIELDS[artifact.agentName];
    if (dictField) {
      if (!state[dictField]) state[dictField] = {};
      state[dictField][artifact.filename] = artifact.content ?? '';
    } else {
      const strField = FILENAME_STRING_FIELDS[artifact.filename];
      if (strField) state[strField] = artifact.content ?? '';
    }
  }
  return state;
}

export async function consumePipelineStream(stream, handlers) {
  let buffer = '';
  let artifactCount = 0;
  let failureError = null;
  let sawSolution = false;

  for await (const chunk of stream) {
    buffer += chunk.toString();
    const lines = buffer.split('\n');
    buffer = lines.pop() ?? '';

    for (const line of lines) {
      if (!line.trim()) continue;

      let event;
      try {
        event = JSON.parse(line);
      } catch {
        const msg = line.slice(0, 500);
        await handlers.onMalformedLine(msg);
        continue;
      }

      await handlers.onEvent(event);

      if (event.filename && event.content) {
        await handlers.onArtifact(event);
        artifactCount += 1;
      }

      if (event.step) {
        await handlers.onStep(event.step);
      }

      if (event.agent === 'pipeline' && event.status === 'failed') {
        failureError = event.error ?? 'Pipeline execution failed';
      }

      if (event.agent === 'pipeline' && event.status === 'solution' && event.content) {
        sawSolution = true;
      }
    }
  }

  return { artifactCount, failureError, sawSolution };
}

export function startPipelineWorker() {
  const worker = new Worker(
    'pipeline',
    async (job) => {
      const { projectId, ideaInput, startStep = 1, jobType, aiProfile } = job.data;
      await projectRepository.updateStatus(projectId, 'running');

      // Python LangGraph 서버에 파이프라인 실행 요청 (스트리밍)
      let response;
      const axiosOpts = {
        responseType: 'stream',
        timeout: 600_000,
        maxBodyLength: Infinity,
        maxContentLength: Infinity,
        httpAgent: pipelineAgent,
      };

      try {
        if (jobType === 'retry-from-step' && startStep > 1) {
          const artifacts = await projectRepository.findArtifacts(projectId);
          const fullState = reconstructState(artifacts);
          const requiredFields = STEP_PREREQ_FIELDS[startStep] ?? [];
          const initialState = Object.fromEntries(
            Object.entries(fullState).filter(([k]) => requiredFields.includes(k))
          );
          response = await axios.post(
            `${pipelineUrl}/run/from/${startStep}`,
            { project_id: projectId, idea_input: ideaInput, initial_state: initialState, ai_profile: aiProfile },
            axiosOpts
          );
        } else {
          response = await axios.post(
            `${pipelineUrl}/run`,
            { project_id: projectId, idea_input: ideaInput, ai_profile: aiProfile },
            axiosOpts
          );
        }
      } catch (err) {
        throw new Error(`파이프라인 서버 연결 실패: ${err.message}`);
      }

      const { artifactCount, failureError } = await consumePipelineStream(response.data, {
        onEvent: async (event) => {
          await redis.publish(`project:${projectId}:events`, JSON.stringify(event));

          if (event.agent && event.status) {
            await projectRepository.saveLog(projectId, {
              agentName: event.agent,
              eventType: event.status,
              message: event.content ?? event.error ?? event.filename ?? null,
            });
          }
        },
        onArtifact: async (event) => {
          await projectRepository.saveArtifact(projectId, event);
        },
        onStep: async (step) => {
          await projectRepository.updateStep(projectId, step);
        },
        onMalformedLine: async (msg) => {
          console.error(`[pipeline:${projectId}] non-JSON line: ${msg}`);
          await projectRepository.saveLog(projectId, {
            agentName: 'pipeline',
            eventType: 'error',
            message: msg,
          });
        },
      });

      if (failureError) {
        throw new Error(failureError);
      }

      if (artifactCount === 0 && startStep === 1) {
        throw new Error('Pipeline completed but produced no artifacts — check pipeline server logs');
      }

      await projectRepository.updateStatus(projectId, 'completed');
    },
    {
      connection: redis,
      concurrency: 3,
    }
  );

  worker.on('failed', async (job, err) => {
    if (job) {
      await projectRepository.updateStatus(job.data.projectId, 'failed');
      await projectRepository.saveLog(job.data.projectId, {
        agentName: 'pipeline',
        eventType: 'failed',
        message: err.message,
      });
    }
    console.error('Pipeline job failed:', err.message);
  });

  return worker;
}
