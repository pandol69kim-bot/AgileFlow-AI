import { projectRepository } from '../repositories/project.repository.js';
import { pipelineQueue } from '../workers/pipeline.worker.js';
import { AppError } from '../utils/errors.js';
import { redis } from '../lib/redis.js';

export const projectService = {
  async create({ userId, ideaInput }) {
    const title = ideaInput.length > 60 ? ideaInput.slice(0, 57) + '...' : ideaInput;
    const project = await projectRepository.create({ userId, title, ideaInput });
    await pipelineQueue.add(
      'run-pipeline',
      { projectId: project.id, ideaInput: project.ideaInput },
      { attempts: 2, backoff: { type: 'exponential', delay: 5000 } }
    );
    return project;
  },

  async getById(id, userId) {
    const project = await projectRepository.findById(id);
    if (!project) throw new AppError(404, 'NOT_FOUND', 'Project not found');
    if (project.userId !== userId) throw new AppError(403, 'FORBIDDEN', 'Access denied');
    return project;
  },

  async listByUser(userId) {
    return projectRepository.findByUser(userId);
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

  async skipStep(projectId, step, userId) {
    await this.getById(projectId, userId);
    if (step < 1 || step > 7) throw new AppError(400, 'BAD_REQUEST', 'step은 1~7 사이여야 합니다');
    await redis.sadd(`project:${projectId}:skip_steps`, String(step));
    return { projectId, step, skipped: true };
  },
};
