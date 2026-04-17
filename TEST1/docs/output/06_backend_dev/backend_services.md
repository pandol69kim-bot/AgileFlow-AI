# 서비스 레이어 — AgileFlow

## services/project.service.js
```js
import { projectRepository } from '../repositories/project.repository.js';
import { pipelineQueue } from '../workers/pipeline.worker.js';
import { AppError } from '../utils/errors.js';

export const projectService = {
  async create({ userId, ideaInput }) {
    const title = ideaInput.slice(0, 60) + (ideaInput.length > 60 ? '...' : '');
    return projectRepository.create({ userId, title, ideaInput });
  },

  async enqueuePipeline(projectId) {
    await pipelineQueue.add('run-pipeline', { projectId }, {
      attempts: 2,
      backoff: { type: 'exponential', delay: 5000 },
    });
  },

  async getById(projectId, userId) {
    const project = await projectRepository.findById(projectId);
    if (!project) throw new AppError(404, 'NOT_FOUND', 'Project not found');
    if (project.userId !== userId) throw new AppError(403, 'FORBIDDEN', 'Access denied');
    return project;
  },
};
```

## workers/pipeline.worker.js — BullMQ Worker
```js
import { Worker, Queue } from 'bullmq';
import { redis } from '../lib/redis.js';
import { pipelineClient } from '../lib/pipeline-client.js';
import { projectRepository } from '../repositories/project.repository.js';

export const pipelineQueue = new Queue('pipeline', { connection: redis });

const worker = new Worker('pipeline', async (job) => {
  const { projectId } = job.data;
  await projectRepository.updateStatus(projectId, 'running');

  // Python LangGraph 파이프라인 서버에 실행 요청
  const response = await pipelineClient.post('/run', { project_id: projectId });

  // 에이전트 완료 이벤트 수신 및 Redis Pub/Sub 발행
  for await (const event of response.data) {
    await redis.publish(`project:${projectId}:events`, JSON.stringify(event));
    await projectRepository.saveArtifact(projectId, event);
  }

  await projectRepository.updateStatus(projectId, 'completed');
}, { connection: redis });
```
