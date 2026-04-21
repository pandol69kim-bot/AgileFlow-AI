import { Worker, Queue } from 'bullmq';
import axios from 'axios';
import { redis } from '../lib/redis.js';
import { projectRepository } from '../repositories/project.repository.js';

export const pipelineQueue = new Queue('pipeline', { connection: redis });

const pipelineUrl = process.env.PIPELINE_URL ?? 'http://localhost:8000';

export function startPipelineWorker() {
  const worker = new Worker(
    'pipeline',
    async (job) => {
      const { projectId, ideaInput } = job.data;
      await projectRepository.updateStatus(projectId, 'running');

      // Python LangGraph 서버에 파이프라인 실행 요청 (스트리밍)
      let response;
      try {
        response = await axios.post(
          `${pipelineUrl}/run`,
          { project_id: projectId, idea_input: ideaInput },
          { responseType: 'stream', timeout: 600_000 }
        );
      } catch (err) {
        throw new Error(`파이프라인 서버 연결 실패: ${err.message}`);
      }

      let buffer = '';
      let artifactCount = 0;

      for await (const chunk of response.data) {
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
            console.error(`[pipeline:${projectId}] non-JSON line: ${msg}`);
            await projectRepository.saveLog(projectId, {
              agentName: 'pipeline',
              eventType: 'error',
              message: msg,
            });
            continue;
          }

          await redis.publish(`project:${projectId}:events`, JSON.stringify(event));

          if (event.agent && event.status) {
            await projectRepository.saveLog(projectId, {
              agentName: event.agent,
              eventType: event.status,
              message: event.filename ?? null,
            });
          }

          if (event.filename && event.content) {
            await projectRepository.saveArtifact(projectId, event);
            artifactCount++;
          }
          if (event.step) {
            await projectRepository.updateStep(projectId, event.step);
          }
          if (event.agent === 'pipeline' && event.status === 'failed') {
            throw new Error(event.error ?? 'Pipeline execution failed');
          }
        }
      }

      if (artifactCount === 0) {
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
    }
    console.error('Pipeline job failed:', err.message);
  });

  return worker;
}
