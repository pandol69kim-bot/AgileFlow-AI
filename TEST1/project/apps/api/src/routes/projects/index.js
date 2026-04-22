import { z } from 'zod';
import axios from 'axios';
import archiver from 'archiver';
import { authenticate } from '../../middlewares/authenticate.js';
import { projectService } from '../../services/project.service.js';
import { redis } from '../../lib/redis.js';
import { AppError } from '../../utils/errors.js';
import { buildProjectPackageEntries, toSlug } from '../../utils/projectPackage.js';
import { AI_PROFILES, AI_PROFILE_IDS, DEFAULT_AI_PROFILE, ensureAiProfile } from '../../constants/aiProfiles.js';

const createProjectBody = z.object({
  idea_input: z.string().min(5).max(2000),
  ai_profile: z.enum(AI_PROFILE_IDS).optional().default(DEFAULT_AI_PROFILE),
});
const MAX_PACKAGE_SIZE_BYTES = 25 * 1024 * 1024;
const pipelineUrl = process.env.PIPELINE_URL ?? 'http://localhost:8000';

const tags = ['Projects'];
const security = [{ cookieAuth: [] }];

const projectSchema = {
  type: 'object',
  properties: {
    id: { type: 'string', format: 'uuid' },
    title: { type: 'string' },
    ideaInput: { type: 'string' },
    aiProfile: { type: 'string', enum: AI_PROFILE_IDS },
    aiLabel: { type: 'string' },
    aiProvider: { type: 'string' },
    status: { type: 'string', enum: ['pending', 'running', 'completed', 'failed', 'cancelled'] },
    currentStep: { type: 'integer' },
    createdAt: { type: 'string', format: 'date-time' },
    completedAt: { type: 'string', nullable: true },
  },
};

async function getAiProfileAvailability(aiProfile) {
  try {
    const response = await axios.get(`${pipelineUrl}/providers/${aiProfile}/health`, { timeout: 10_000 });
    return {
      available: Boolean(response.data?.available),
      reason: response.data?.reason ?? null,
    };
  } catch (error) {
    return {
      available: false,
      reason: error.response?.data?.detail ?? error.message,
    };
  }
}

export async function projectRoutes(app) {
  app.get('/ai-profiles', {
    preHandler: authenticate,
    schema: {
      tags,
      summary: '선택 가능한 파이프라인 AI 목록',
      security,
      response: {
        200: {
          type: 'object',
          properties: {
            data: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  id: { type: 'string', enum: AI_PROFILE_IDS },
                  label: { type: 'string' },
                  description: { type: 'string' },
                  provider: { type: 'string' },
                  isDefault: { type: 'boolean' },
                  available: { type: 'boolean' },
                  reason: { type: 'string', nullable: true },
                },
              },
            },
          },
        },
      },
    },
  }, async () => {
    const profiles = await Promise.all(
      AI_PROFILES.map(async (profile) => {
        const availability = await getAiProfileAvailability(profile.id);
        return { ...profile, ...availability };
      })
    );
    return { data: profiles };
  });

  app.post('/', {
    preHandler: authenticate,
    schema: {
      tags,
      summary: '프로젝트 생성 + 파이프라인 실행',
      security,
      body: {
        type: 'object',
        required: ['idea_input'],
        properties: {
          idea_input: { type: 'string', minLength: 5, maxLength: 2000, description: '아이디어 설명' },
          ai_profile: { type: 'string', enum: AI_PROFILE_IDS, default: DEFAULT_AI_PROFILE, description: '파이프라인 AI 프로필' },
        },
      },
      response: {
        201: {
          description: '생성된 프로젝트',
          type: 'object',
          properties: { data: projectSchema },
        },
      },
    },
  }, async (req, reply) => {
    const { idea_input, ai_profile } = createProjectBody.parse(req.body);
    const aiAvailability = await getAiProfileAvailability(ai_profile);
    if (!aiAvailability.available) {
      throw new AppError(503, 'AI_PROFILE_UNAVAILABLE', aiAvailability.reason ?? '선택한 AI를 현재 사용할 수 없습니다');
    }
    const project = await projectService.create({
      userId: req.user.id,
      ideaInput: idea_input,
      aiProfile: ensureAiProfile(ai_profile),
    });
    return reply.code(201).send({ data: project });
  });

  app.get('/', {
    preHandler: authenticate,
    schema: {
      tags,
      summary: '내 프로젝트 목록',
      security,
      response: {
        200: {
          type: 'object',
          properties: { data: { type: 'array', items: projectSchema } },
        },
      },
    },
  }, async (req, reply) => {
    const projects = await projectService.listByUser(req.user.id);
    return { data: projects };
  });

  app.get('/:id', {
    preHandler: authenticate,
    schema: {
      tags,
      summary: '프로젝트 상세 조회',
      security,
      params: { type: 'object', properties: { id: { type: 'string', format: 'uuid' } } },
      response: {
        200: { type: 'object', properties: { data: projectSchema } },
      },
    },
  }, async (req, reply) => {
    const project = await projectService.getById(req.params.id, req.user.id);
    return { data: project };
  });

  app.delete('/:id', {
    preHandler: authenticate,
    schema: {
      tags,
      summary: '실패한 프로젝트 삭제',
      security,
      params: { type: 'object', properties: { id: { type: 'string', format: 'uuid' } } },
      response: {
        200: {
          type: 'object',
          properties: {
            data: {
              type: 'object',
              properties: {
                projectId: { type: 'string', format: 'uuid' },
                deleted: { type: 'boolean' },
              },
            },
          },
        },
      },
    },
  }, async (req, reply) => {
    const result = await projectService.deleteFailedProject(req.params.id, req.user.id);
    return { data: result };
  });

  app.get('/:id/artifacts', {
    preHandler: authenticate,
    schema: {
      tags,
      summary: '파이프라인 산출물 목록',
      security,
      params: { type: 'object', properties: { id: { type: 'string', format: 'uuid' } } },
      response: {
        200: {
          type: 'object',
          properties: {
            data: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  id: { type: 'string' },
                  agentName: { type: 'string' },
                  filename: { type: 'string' },
                  content: { type: 'string' },
                  status: { type: 'string' },
                },
              },
            },
          },
        },
      },
    },
  }, async (req, reply) => {
    const artifacts = await projectService.getArtifacts(req.params.id, req.user.id);
    return { data: artifacts };
  });

  app.get('/:id/agent-statuses', {
    preHandler: authenticate,
    schema: {
      tags,
      summary: '에이전트별 최신 실행 상태',
      security,
      params: { type: 'object', properties: { id: { type: 'string', format: 'uuid' } } },
      response: {
        200: { type: 'object', properties: { data: { type: 'object', additionalProperties: { type: 'string' } } } },
      },
    },
  }, async (req, reply) => {
    const statuses = await projectService.getAgentStatuses(req.params.id, req.user.id);
    return { data: statuses };
  });

  app.get('/:id/stream', {
    preHandler: authenticate,
    schema: {
      tags,
      summary: '파이프라인 실시간 이벤트 스트림 (SSE)',
      security,
      params: { type: 'object', properties: { id: { type: 'string', format: 'uuid' } } },
      produces: ['text/event-stream'],
      response: { 200: { type: 'string', description: 'Server-Sent Events 스트림' } },
    },
  }, async (req, reply) => {
    const { id } = req.params;

    // 헤더 전송 전에 권한 검증 — 예외 발생 시 Fastify가 정상적으로 에러 응답 가능
    const statuses = await projectService.getAgentStatuses(id, req.user.id);

    // hijack으로 Fastify 직렬화 파이프라인 비활성화 — 핸들러 반환 후 개입 차단
    reply.hijack();
    reply.raw.setHeader('Content-Type', 'text/event-stream');
    reply.raw.setHeader('Cache-Control', 'no-cache');
    reply.raw.setHeader('Connection', 'keep-alive');
    reply.raw.flushHeaders();

    for (const [agent, status] of Object.entries(statuses)) {
      reply.raw.write(`data: ${JSON.stringify({ agent, status })}\n\n`);
    }

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

  app.patch('/:id/artifacts/:artifactId', {
    preHandler: authenticate,
    schema: {
      tags,
      summary: '산출물 내용 수정',
      security,
      params: {
        type: 'object',
        properties: {
          id: { type: 'string', format: 'uuid' },
          artifactId: { type: 'string', format: 'uuid' },
        },
      },
      body: {
        type: 'object',
        required: ['content'],
        properties: { content: { type: 'string' } },
      },
      response: {
        200: {
          type: 'object',
          properties: {
            data: {
              type: 'object',
              properties: {
                id: { type: 'string' },
                filename: { type: 'string' },
                content: { type: 'string' },
              },
            },
          },
        },
      },
    },
  }, async (req, reply) => {
    const artifact = await projectService.updateArtifact(
      req.params.id,
      req.params.artifactId,
      req.body.content,
      req.user.id,
    );
    return { data: artifact };
  });

  app.post('/:id/cancel', {
    preHandler: authenticate,
    schema: {
      tags,
      summary: '실행 중인 파이프라인 취소',
      security,
      params: { type: 'object', properties: { id: { type: 'string', format: 'uuid' } } },
      response: {
        200: {
          type: 'object',
          properties: {
            data: {
              type: 'object',
              properties: {
                projectId: { type: 'string', format: 'uuid' },
                cancelling: { type: 'boolean' },
              },
            },
          },
        },
      },
    },
  }, async (req, reply) => {
    const result = await projectService.cancelPipeline(req.params.id, req.user.id);
    return { data: result };
  });

  app.post('/:id/steps/:step/skip', {
    preHandler: authenticate,
    schema: {
      tags,
      summary: '파이프라인 스텝 건너뛰기',
      security,
      params: {
        type: 'object',
        properties: {
          id: { type: 'string', format: 'uuid' },
          step: { type: 'integer', minimum: 1, maximum: 7 },
        },
      },
      response: {
        200: {
          type: 'object',
          properties: {
            data: {
              type: 'object',
              properties: {
                projectId: { type: 'string' },
                step: { type: 'integer' },
                skipped: { type: 'boolean' },
              },
            },
          },
        },
      },
    },
  }, async (req, reply) => {
    const result = await projectService.skipStep(
      req.params.id,
      Number(req.params.step),
      req.user.id,
    );
    return { data: result };
  });

  app.post('/:id/steps/:step/run', {
    preHandler: authenticate,
    schema: {
      tags,
      summary: '특정 스텝부터 파이프라인 재실행',
      security,
      params: {
        type: 'object',
        properties: {
          id:   { type: 'string', format: 'uuid' },
          step: { type: 'integer', minimum: 1, maximum: 7 },
        },
      },
      response: {
        200: {
          type: 'object',
          properties: {
            data: {
              type: 'object',
              properties: {
                projectId: { type: 'string' },
                step:      { type: 'integer' },
                status:    { type: 'string' },
              },
            },
          },
        },
      },
    },
  }, async (req, reply) => {
    const result = await projectService.retryFromStep(
      req.params.id,
      Number(req.params.step),
      req.user.id,
    );
    return { data: result };
  });

  app.get('/:id/failure-reason', {
    preHandler: authenticate,
    schema: {
      tags,
      summary: '파이프라인 실패 사유 및 해결책 조회',
      security,
      params: { type: 'object', properties: { id: { type: 'string', format: 'uuid' } } },
      response: {
        200: {
          type: 'object',
          properties: {
            data: {
              type: 'object',
              properties: {
                reason: { type: 'string', nullable: true },
                solution: { type: 'string', nullable: true },
              },
            },
          },
        },
      },
    },
  }, async (req, reply) => {
    const info = await projectService.getFailureInfo(req.params.id, req.user.id);
    return { data: info };
  });

  app.get('/:id/download', {
    preHandler: authenticate,
    schema: {
      tags,
      summary: '산출물 ZIP 다운로드',
      security,
      params: { type: 'object', properties: { id: { type: 'string', format: 'uuid' } } },
    },
  }, async (req, reply) => {
    const [project, artifacts] = await Promise.all([
      projectService.getById(req.params.id, req.user.id),
      projectService.getArtifacts(req.params.id, req.user.id),
    ]);

    const slug = toSlug(project.title);
    const asciiFilename = `${slug.replace(/[^\x20-\x7E]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '') || 'project'}.zip`;
    const encodedFilename = encodeURIComponent(`${slug}.zip`);
    const packageEntries = buildProjectPackageEntries(project, artifacts);
    const totalSize = packageEntries.reduce(
      (sum, entry) => sum + Buffer.byteLength(entry.content ?? '', 'utf8'),
      0,
    );

    if (totalSize > MAX_PACKAGE_SIZE_BYTES) {
      throw new AppError(413, 'PACKAGE_TOO_LARGE', 'Project package exceeds 25MB limit');
    }

    // ZIP을 Writable 스트림으로 수집 후 Buffer 전송 — pipe 기반으로 타이밍 문제 차단
    const { Writable } = await import('stream');
    const zipBuffer = await new Promise((resolve, reject) => {
      const archive = archiver('zip', { zlib: { level: 9 } });
      const chunks = [];

      const sink = new Writable({
        write(chunk, _enc, cb) { chunks.push(chunk); cb(); },
        final(cb) { resolve(Buffer.concat(chunks)); cb(); },
      });

      archive.on('error', reject);
      sink.on('error', reject);
      archive.pipe(sink);

      for (const entry of packageEntries) {
        archive.append(entry.content ?? '', { name: `${slug}/${entry.name}` });
      }

      Promise.resolve(archive.finalize()).catch(reject);
    });

    return reply
      .header('Content-Type', 'application/zip')
      .header('Content-Disposition', `attachment; filename="${asciiFilename}"; filename*=UTF-8''${encodedFilename}`)
      .send(zipBuffer);
  });
}
