import { z } from 'zod';
import archiver from 'archiver';
import { authenticate } from '../../middlewares/authenticate.js';
import { projectService } from '../../services/project.service.js';
import { redis } from '../../lib/redis.js';

const createProjectBody = z.object({ idea_input: z.string().min(5).max(2000) });

export async function projectRoutes(app) {
  // POST /projects
  app.post('/', { preHandler: authenticate }, async (req, reply) => {
    const { idea_input } = createProjectBody.parse(req.body);
    const project = await projectService.create({ userId: req.user.id, ideaInput: idea_input });
    return reply.code(201).send({ data: project });
  });

  // GET /projects
  app.get('/', { preHandler: authenticate }, async (req, reply) => {
    const projects = await projectService.listByUser(req.user.id);
    return { data: projects };
  });

  // GET /projects/:id
  app.get('/:id', { preHandler: authenticate }, async (req, reply) => {
    const project = await projectService.getById(req.params.id, req.user.id);
    return { data: project };
  });

  // GET /projects/:id/artifacts
  app.get('/:id/artifacts', { preHandler: authenticate }, async (req, reply) => {
    const artifacts = await projectService.getArtifacts(req.params.id, req.user.id);
    return { data: artifacts };
  });

  // GET /projects/:id/stream  (SSE)
  app.get('/:id/stream', { preHandler: authenticate }, async (req, reply) => {
    const { id } = req.params;
    reply.raw.setHeader('Content-Type', 'text/event-stream');
    reply.raw.setHeader('Cache-Control', 'no-cache');
    reply.raw.setHeader('Connection', 'keep-alive');
    reply.raw.flushHeaders();

    const subscriber = redis.duplicate();
    await subscriber.subscribe(`project:${id}:events`);

    subscriber.on('message', (_ch, message) => {
      reply.raw.write(`data: ${message}\n\n`);
    });

    req.raw.on('close', () => {
      subscriber.unsubscribe();
      subscriber.disconnect();
    });
  });

  // GET /projects/:id/download  (ZIP)
  app.get('/:id/download', { preHandler: authenticate }, async (req, reply) => {
    const artifacts = await projectService.getArtifacts(req.params.id, req.user.id);
    reply.raw.setHeader('Content-Type', 'application/zip');
    reply.raw.setHeader('Content-Disposition', `attachment; filename=agileflow-${req.params.id}.zip`);

    const archive = archiver('zip', { zlib: { level: 9 } });
    archive.pipe(reply.raw);
    for (const a of artifacts) {
      archive.append(a.content, { name: `output/${a.agentName}/${a.filename}` });
    }
    await archive.finalize();
  });
}
