import { prisma } from '../../lib/prisma.js';
import { redis } from '../../lib/redis.js';

const TIMEOUT_MS = 3000;

function withTimeout(promise, ms) {
  return Promise.race([
    promise,
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error(`timeout after ${ms}ms`)), ms)
    ),
  ]);
}

export async function statusRoutes(app) {
  app.get('/', async (req, reply) => {
    const checks = await Promise.allSettled([
      checkDb(),
      checkRedis(),
      checkPipeline(),
    ]);

    const [db, redisResult, pipeline] = checks.map((c) =>
      c.status === 'fulfilled'
        ? c.value
        : { ok: false, latency: null, error: c.reason?.message ?? 'unknown error' }
    );

    const allOk = db.ok && redisResult.ok && pipeline.ok;

    return reply.code(allOk ? 200 : 503).send({
      status: allOk ? 'healthy' : 'degraded',
      timestamp: new Date().toISOString(),
      services: {
        api:      { ok: true, latency: null },
        db:       db,
        redis:    redisResult,
        pipeline: pipeline,
      },
    });
  });
}

async function checkDb() {
  const t = Date.now();
  try {
    await withTimeout(prisma.$queryRaw`SELECT 1`, TIMEOUT_MS);
    return { ok: true, latency: Date.now() - t };
  } catch (e) {
    return { ok: false, latency: null, error: e.message };
  }
}

async function checkRedis() {
  const t = Date.now();
  try {
    await withTimeout(redis.ping(), TIMEOUT_MS);
    return { ok: true, latency: Date.now() - t };
  } catch (e) {
    return { ok: false, latency: null, error: e.message };
  }
}

async function checkPipeline() {
  const t = Date.now();
  const url = process.env.PIPELINE_URL ?? 'http://localhost:8000';
  try {
    const res = await fetch(`${url}/health`, {
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    const body = await res.json();
    return { ok: res.ok && body.status === 'ok', latency: Date.now() - t };
  } catch (e) {
    return { ok: false, latency: null, error: e.message };
  }
}
