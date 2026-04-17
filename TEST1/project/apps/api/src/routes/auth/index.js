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

export async function authRoutes(app) {
  app.post('/register', async (req, reply) => {
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

  app.post('/login', async (req, reply) => {
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

  app.post('/logout', async (req, reply) => {
    return reply.clearCookie('accessToken').send({ data: null });
  });

  app.get('/me', { preHandler: authenticate }, async (req, reply) => {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: { id: true, email: true, name: true },
    });
    if (!user) throw new AppError(404, 'NOT_FOUND', 'User not found');
    return { data: user };
  });
}
