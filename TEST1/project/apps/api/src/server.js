import Fastify from 'fastify';
import cors from '@fastify/cors';
import jwt from '@fastify/jwt';
import cookie from '@fastify/cookie';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';
import { projectRoutes } from './routes/projects/index.js';
import { authRoutes } from './routes/auth/index.js';
import { statusRoutes } from './routes/status/index.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { startPipelineWorker } from './workers/pipeline.worker.js';

const app = Fastify({ logger: true });

await app.register(cors, {
  origin: process.env.WEB_ORIGIN ?? 'http://localhost:5173',
  credentials: true,
});

await app.register(cookie);
await app.register(jwt, {
  secret: process.env.JWT_SECRET ?? 'dev-secret',
  cookie: { cookieName: 'accessToken', signed: false },
});

await app.register(swagger, {
  openapi: {
    info: {
      title: 'AgileFlow API',
      description: 'AgileFlow 프로젝트 파이프라인 API 문서',
      version: '1.0.0',
    },
    components: {
      securitySchemes: {
        cookieAuth: {
          type: 'apiKey',
          in: 'cookie',
          name: 'accessToken',
        },
      },
    },
  },
});

await app.register(swaggerUi, {
  routePrefix: '/docs',
  uiConfig: { docExpansion: 'list', deepLinking: true },
});

app.setErrorHandler(errorHandler);

await app.register(authRoutes, { prefix: '/api/v1/auth' });
await app.register(projectRoutes, { prefix: '/api/v1/projects' });
await app.register(statusRoutes, { prefix: '/api/v1/status' });

const port = Number(process.env.PORT ?? 3001);
await app.listen({ port, host: '0.0.0.0' });
console.log(`API server running on http://localhost:${port}`);
console.log(`API docs available at http://localhost:${port}/docs`);

startPipelineWorker();
console.log('Pipeline worker started');
