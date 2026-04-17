import { projectRepository } from '../repositories/project.repository.js';
import { pipelineQueue } from '../workers/pipeline.worker.js';
import { AppError } from '../utils/errors.js';

export const projectService = {
  async create({ userId, ideaInput }) {
    const title = ideaInput.length > 60 ? ideaInput.slice(0, 57) + '...' : ideaInput;
    const project = await projectRepository.create({ userId, title, ideaInput });
    await pipelineQueue.add(
      'run-pipeline',
      { projectId: project.id },
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
};
