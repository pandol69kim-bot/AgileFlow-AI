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
      const { projectId } = job.data;
      await projectRepository.updateStatus(projectId, 'running');

      // Python LangGraph 서버에 파이프라인 실행 요청 (스트리밍)
      const response = await axios.post(
        `${pipelineUrl}/run`,
        { project_id: projectId },
        { responseType: 'stream', timeout: 600_000 }
      );

      let buffer = '';
      for await (const chunk of response.data) {
        buffer += chunk.toString();
        const lines = buffer.split('\n');
        buffer = lines.pop() ?? '';

        for (const line of lines) {
          if (!line.trim()) continue;
          try {
            const event = JSON.parse(line);
            // Redis Pub/Sub으로 SSE 이벤트 발행
            await redis.publish(`project:${projectId}:events`, JSON.stringify(event));
            // 산출물 저장
            if (event.filename && event.content) {
              await projectRepository.saveArtifact(projectId, event);
            }
            if (event.step) {
              await projectRepository.updateStep(projectId, event.step);
            }
          } catch {
            // non-JSON 라인 무시
          }
        }
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
