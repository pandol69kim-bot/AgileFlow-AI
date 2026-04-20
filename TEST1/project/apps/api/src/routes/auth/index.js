import { z } from 'zod';
import { prisma } from '../../lib/prisma.js';
import { AppError } from '../../utils/errors.js';
import { authenticate } from '../../middlewares/authenticate.js';

const registerBody = z.object({
  email: z.string().email(),
  name: z.string().min(2).max(100),
  password: z.string().min(8),
});

const loginBody = z.object({
  email: z.string().email(),
  password: z.string(),
});

const tags = ['Auth'];

export async function authRoutes(app) {
  app.post('/register', {
    schema: {
      tags,
      summary: '회원가입',
      body: {
        type: 'object',
        required: ['email', 'name', 'password'],
        properties: {
          email: { type: 'string', format: 'email' },
          name: { type: 'string', minLength: 2, maxLength: 100 },
          password: { type: 'string', minLength: 8 },
        },
      },
      response: {
        201: {
          description: '가입 성공',
          type: 'object',
          properties: {
            data: {
              type: 'object',
              properties: {
                id: { type: 'string' },
                email: { type: 'string' },
                name: { type: 'string' },
              },
            },
          },
        },
      },
    },
  }, async (req, reply) => {
    const { email, name, password } = registerBody.parse(req.body);
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) throw new AppError(409, 'CONFLICT', 'Email already in use');

    const { createHash } = await import('node:crypto');
    const hashed = createHash('sha256').update(password).digest('hex');
    const user = await prisma.user.create({ data: { email, name, password: hashed } });

    const token = app.jwt.sign({ id: user.id, email: user.email }, { expiresIn: '15m' });
    return reply
      .setCookie('accessToken', token, { httpOnly: true, path: '/', sameSite: 'lax' })
      .code(201)
      .send({ data: { id: user.id, email: user.email, name: user.name } });
  });

  app.post('/login', {
    schema: {
      tags,
      summary: '로그인',
      body: {
        type: 'object',
        required: ['email', 'password'],
        properties: {
          email: { type: 'string', format: 'email' },
          password: { type: 'string' },
        },
      },
      response: {
        200: {
          description: '로그인 성공 (accessToken 쿠키 설정)',
          type: 'object',
          properties: {
            data: {
              type: 'object',
              properties: {
                id: { type: 'string' },
                email: { type: 'string' },
                name: { type: 'string' },
              },
            },
          },
        },
      },
    },
  }, async (req, reply) => {
    const { email, password } = loginBody.parse(req.body);
    const user = await prisma.user.findUnique({ where: { email } });

    const { createHash } = await import('node:crypto');
    const hashed = createHash('sha256').update(password).digest('hex');
    if (!user || user.password !== hashed) {
      throw new AppError(401, 'INVALID_CREDENTIALS', 'Invalid email or password');
    }

    const token = app.jwt.sign({ id: user.id, email: user.email }, { expiresIn: '15m' });
    return reply
      .setCookie('accessToken', token, { httpOnly: true, path: '/', sameSite: 'lax' })
      .send({ data: { id: user.id, email: user.email, name: user.name } });
  });

  app.post('/logout', {
    schema: { tags, summary: '로그아웃', response: { 200: { type: 'object' } } },
  }, async (req, reply) => {
    return reply.clearCookie('accessToken').send({ data: null });
  });

  app.get('/me', {
    preHandler: authenticate,
    schema: {
      tags,
      summary: '내 정보 조회',
      security: [{ cookieAuth: [] }],
      response: {
        200: {
          type: 'object',
          properties: {
            data: {
              type: 'object',
              properties: {
                id: { type: 'string' },
                email: { type: 'string' },
                name: { type: 'string' },
              },
            },
          },
        },
      },
    },
  }, async (req, reply) => {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: { id: true, email: true, name: true },
    });
    if (!user) throw new AppError(404, 'NOT_FOUND', 'User not found');
    return { data: user };
  });
}
