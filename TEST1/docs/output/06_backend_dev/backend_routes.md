# API 라우트 구현 — AgileFlow

## POST /api/v1/projects — 파이프라인 시작
```js
// routes/projects/handler.js
import { projectService } from '../../services/project.service.js';
import { createProjectSchema } from './schema.js';

export async function createProject(req, reply) {
  const { idea_input } = req.body;
  const userId = req.user.id;

  const project = await projectService.create({ userId, ideaInput: idea_input });
  // BullMQ 큐에 파이프라인 잡 등록
  await projectService.enqueuePipeline(project.id);

  return reply.code(201).send({ data: project });
}
```

## GET /api/v1/projects/:id/stream — SSE 실시간 스트리밍
```js
export async function streamProjectEvents(req, reply) {
  const { id } = req.params;

  reply.raw.setHeader('Content-Type', 'text/event-stream');
  reply.raw.setHeader('Cache-Control', 'no-cache');
  reply.raw.setHeader('Connection', 'keep-alive');

  // Redis Pub/Sub 구독 → SSE 전달
  const subscriber = redis.duplicate();
  await subscriber.subscribe(`project:${id}:events`);

  subscriber.on('message', (channel, message) => {
    reply.raw.write(`data: ${message}\n\n`);
  });

  req.raw.on('close', () => subscriber.unsubscribe());
}
```

## GET /api/v1/projects/:id/download — ZIP 다운로드
```js
import archiver from 'archiver';

export async function downloadArtifacts(req, reply) {
  const { id } = req.params;
  const artifacts = await artifactRepository.findByProjectId(id);

  reply.raw.setHeader('Content-Type', 'application/zip');
  reply.raw.setHeader('Content-Disposition', `attachment; filename=agileflow-${id}.zip`);

  const archive = archiver('zip');
  archive.pipe(reply.raw);

  for (const artifact of artifacts) {
    archive.append(artifact.content, { name: `output/${artifact.agent_name}/${artifact.filename}` });
  }

  await archive.finalize();
}
```
