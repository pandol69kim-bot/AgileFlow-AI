import { prisma } from '../lib/prisma.js';

export const projectRepository = {
  async create({ userId, title, ideaInput }) {
    return prisma.project.create({
      data: { userId, title, ideaInput },
    });
  },

  async findById(id) {
    return prisma.project.findUnique({ where: { id } });
  },

  async findByUser(userId) {
    return prisma.project.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  },

  async updateStatus(id, status) {
    return prisma.project.update({
      where: { id },
      data: {
        status,
        ...(status === 'completed' ? { completedAt: new Date() } : {}),
      },
    });
  },

  async updateStep(id, currentStep) {
    return prisma.project.update({ where: { id }, data: { currentStep } });
  },

  async saveArtifact(projectId, { agent, filename, content }) {
    return prisma.agentArtifact.upsert({
      where: {
        projectId_agentName_filename: { projectId, agentName: agent, filename },
      },
      create: { projectId, agentName: agent, filename, content, status: 'completed' },
      update: { content, status: 'completed' },
    });
  },

  async findArtifacts(projectId) {
    return prisma.agentArtifact.findMany({
      where: { projectId },
      orderBy: { createdAt: 'asc' },
    });
  },
};
