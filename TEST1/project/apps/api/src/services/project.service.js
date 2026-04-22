import { projectRepository } from '../repositories/project.repository.js';
import { pipelineQueue } from '../workers/pipeline.worker.js';
import { AppError } from '../utils/errors.js';
import { redis } from '../lib/redis.js';
import { DEFAULT_AI_PROFILE, ensureAiProfile, getAiProfile } from '../constants/aiProfiles.js';

function normalizeProject(project) {
  if (!project) return project;

  const aiProfile = ensureAiProfile(project.checkpointData?.aiProfile ?? DEFAULT_AI_PROFILE);
  const profileMeta = getAiProfile(aiProfile);

  return {
    ...project,
    aiProfile,
    aiLabel: profileMeta.label,
    aiProvider: profileMeta.provider,
  };
}

export const projectService = {
  async create({ userId, ideaInput, aiProfile }) {
    const resolvedAiProfile = ensureAiProfile(aiProfile ?? DEFAULT_AI_PROFILE);
    const title = ideaInput.length > 60 ? ideaInput.slice(0, 57) + '...' : ideaInput;
    const project = await projectRepository.create({
      userId,
      title,
      ideaInput,
      checkpointData: { aiProfile: resolvedAiProfile },
    });
    await pipelineQueue.add(
      'run-pipeline',
      { projectId: project.id, ideaInput: project.ideaInput, aiProfile: resolvedAiProfile },
      { attempts: 2, backoff: { type: 'exponential', delay: 5000 } }
    );
    return normalizeProject(project);
  },

  async getById(id, userId) {
    const project = await projectRepository.findById(id);
    if (!project) throw new AppError(404, 'NOT_FOUND', 'Project not found');
    if (project.userId !== userId) throw new AppError(403, 'FORBIDDEN', 'Access denied');
    return normalizeProject(project);
  },

  async listByUser(userId) {
    const projects = await projectRepository.findByUser(userId);
    return projects.map(normalizeProject);
  },

  async cancelPipeline(projectId, userId) {
    const project = await this.getById(projectId, userId);
    if (project.status !== 'running') {
      throw new AppError(409, 'CONFLICT', '실행 중인 파이프라인만 취소할 수 있습니다');
    }
    // 워커가 2초 내 폴링으로 감지 후 스트림을 중단함
    await redis.set(`project:${projectId}:cancel`, '1', 'EX', 60);
    return { projectId, cancelling: true };
  },

  async deleteFailedProject(projectId, userId) {
    const project = await this.getById(projectId, userId);
    if (project.status !== 'failed' && project.status !== 'cancelled') {
      throw new AppError(409, 'CONFLICT', '실패하거나 취소된 프로젝트만 삭제할 수 있습니다');
    }

    const jobs = await pipelineQueue.getJobs(['waiting', 'delayed', 'active']);
    for (const job of jobs) {
      if (job.data?.projectId === projectId) {
        await job.remove();
      }
    }

    await redis.del(`project:${projectId}:skip_steps`);
    await projectRepository.deleteById(projectId);

    return { projectId, deleted: true };
  },

  async getArtifacts(projectId, userId) {
    await this.getById(projectId, userId);
    return projectRepository.findArtifacts(projectId);
  },

  async getAgentStatuses(projectId, userId) {
    await this.getById(projectId, userId);
    const logs = await projectRepository.findLogs(projectId);
    const statuses = {};
    for (const log of logs) {
      if (log.agentName !== 'pipeline') {
        statuses[log.agentName] = log.eventType;
      }
    }
    return statuses;
  },

  async updateArtifact(projectId, artifactId, content, userId) {
    await this.getById(projectId, userId);
    const artifact = await projectRepository.findArtifactById(artifactId);
    if (!artifact || artifact.projectId !== projectId) {
      throw new AppError(404, 'NOT_FOUND', 'Artifact not found');
    }
    return projectRepository.updateArtifact(artifactId, content);
  },

  async getFailureInfo(projectId, userId) {
    await this.getById(projectId, userId);
    const logs = await projectRepository.findLogs(projectId);
    const reversed = [...logs].reverse();
    const failLog = reversed.find(
      (l) => l.agentName === 'pipeline' && l.eventType === 'failed' && l.message
    );
    const solutionLog = reversed.find(
      (l) => l.agentName === 'pipeline' && l.eventType === 'solution' && l.message
    );
    return {
      reason: failLog?.message ?? null,
      solution: solutionLog?.message ?? null,
    };
  },

  async retryFromStep(projectId, step, userId) {
    const project = await this.getById(projectId, userId);
    if (project.status === 'running') {
      throw new AppError(409, 'CONFLICT', '이미 실행 중인 파이프라인은 재시도할 수 없습니다');
    }
    if (step < 1 || step > 7) throw new AppError(400, 'BAD_REQUEST', 'step은 1~7 사이여야 합니다');
    // 재시도 대상 스텝 이후 skip 플래그 제거 (이전 수동 스킵이 재실행을 막지 않도록)
    for (let s = step; s <= 7; s++) {
      await redis.srem(`project:${projectId}:skip_steps`, String(s));
    }
    await projectRepository.updateStatus(projectId, 'running');
    await pipelineQueue.add(
      'retry-pipeline',
      { projectId, ideaInput: project.ideaInput, startStep: step, jobType: 'retry-from-step', aiProfile: project.aiProfile },
      { attempts: 1 }
    );
    return { projectId, step, status: 'running' };
  },

  async skipStep(projectId, step, userId) {
    await this.getById(projectId, userId);
    if (step < 1 || step > 7) throw new AppError(400, 'BAD_REQUEST', 'step은 1~7 사이여야 합니다');
    await redis.sadd(`project:${projectId}:skip_steps`, String(step));
    return { projectId, step, skipped: true };
  },
};
