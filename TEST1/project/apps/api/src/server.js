import Fastify from 'fastify';
import cors from '@fastify/cors';
import jwt from '@fastify/jwt';
import cookie from '@fastify/cookie';
import { projectRoutes } from './routes/projects/index.js';
import { authRoutes } from './routes/auth/index.js';
import { errorHandler } from './middlewares/errorHandler.js';

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

app.setErrorHandler(errorHandler);

await app.register(authRoutes, { prefix: '/api/v1/auth' });
await app.register(projectRoutes, { prefix: '/api/v1/projects' });

const port = Number(process.env.PORT ?? 3001);
await app.listen({ port, host: '0.0.0.0' });
console.log(`API server running on http://localhost:${port}`);
