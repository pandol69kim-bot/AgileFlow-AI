import { beforeEach, describe, expect, it, vi } from 'vitest';

const projectRepositoryMock = {
  create: vi.fn(),
  findById: vi.fn(),
  findByUser: vi.fn(),
  deleteById: vi.fn(),
  updateStatus: vi.fn(),
};

const pipelineQueueMock = {
  add: vi.fn(),
  getJobs: vi.fn(),
};

const redisMock = {
  del: vi.fn(),
  srem: vi.fn(),
};

vi.mock('../repositories/project.repository.js', () => ({
  projectRepository: projectRepositoryMock,
}));

vi.mock('../workers/pipeline.worker.js', () => ({
  pipelineQueue: pipelineQueueMock,
}));

vi.mock('../lib/redis.js', () => ({
  redis: redisMock,
}));

const { projectService } = await import('./project.service.js');

describe('projectService.deleteFailedProject', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    pipelineQueueMock.getJobs.mockResolvedValue([]);
  });

  it('deletes a failed project owned by the user', async () => {
    projectRepositoryMock.findById.mockResolvedValue({
      id: 'project-1',
      userId: 'user-1',
      status: 'failed',
    });
    projectRepositoryMock.deleteById.mockResolvedValue({ id: 'project-1' });
    redisMock.del.mockResolvedValue(1);
    const remove = vi.fn().mockResolvedValue(undefined);
    pipelineQueueMock.getJobs.mockResolvedValue([
      { data: { projectId: 'project-1' }, remove },
      { data: { projectId: 'project-else' }, remove: vi.fn() },
    ]);

    await expect(projectService.deleteFailedProject('project-1', 'user-1')).resolves.toEqual({
      projectId: 'project-1',
      deleted: true,
    });

    expect(pipelineQueueMock.getJobs).toHaveBeenCalledWith(['waiting', 'delayed', 'active']);
    expect(remove).toHaveBeenCalledTimes(1);
    expect(redisMock.del).toHaveBeenCalledWith('project:project-1:skip_steps');
    expect(projectRepositoryMock.deleteById).toHaveBeenCalledWith('project-1');
  });

  it('rejects deletion when the project is not failed', async () => {
    projectRepositoryMock.findById.mockResolvedValue({
      id: 'project-2',
      userId: 'user-1',
      status: 'completed',
    });

    await expect(projectService.deleteFailedProject('project-2', 'user-1')).rejects.toMatchObject({
      statusCode: 409,
      code: 'CONFLICT',
    });

    expect(redisMock.del).not.toHaveBeenCalled();
    expect(projectRepositoryMock.deleteById).not.toHaveBeenCalled();
  });

  it('rejects deletion for a project owned by another user', async () => {
    projectRepositoryMock.findById.mockResolvedValue({
      id: 'project-3',
      userId: 'user-1',
      status: 'failed',
    });

    await expect(projectService.deleteFailedProject('project-3', 'user-2')).rejects.toMatchObject({
      statusCode: 403,
      code: 'FORBIDDEN',
    });

    expect(pipelineQueueMock.getJobs).not.toHaveBeenCalled();
    expect(redisMock.del).not.toHaveBeenCalled();
    expect(projectRepositoryMock.deleteById).not.toHaveBeenCalled();
  });

  it('rejects deletion when the project does not exist', async () => {
    projectRepositoryMock.findById.mockResolvedValue(null);

    await expect(projectService.deleteFailedProject('missing-project', 'user-1')).rejects.toMatchObject({
      statusCode: 404,
      code: 'NOT_FOUND',
    });

    expect(pipelineQueueMock.getJobs).not.toHaveBeenCalled();
    expect(redisMock.del).not.toHaveBeenCalled();
    expect(projectRepositoryMock.deleteById).not.toHaveBeenCalled();
  });
});

describe('projectService AI profile flow', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    pipelineQueueMock.getJobs.mockResolvedValue([]);
  });

  it('creates a project with the selected ai profile and queues it', async () => {
    projectRepositoryMock.create.mockResolvedValue({
      id: 'project-ai-1',
      userId: 'user-1',
      ideaInput: 'AI 문서 자동화 서비스',
      title: 'AI 문서 자동화 서비스',
      status: 'pending',
      checkpointData: { aiProfile: 'openai' },
    });

    const result = await projectService.create({
      userId: 'user-1',
      ideaInput: 'AI 문서 자동화 서비스',
      aiProfile: 'openai',
    });

    expect(projectRepositoryMock.create).toHaveBeenCalledWith({
      userId: 'user-1',
      title: 'AI 문서 자동화 서비스',
      ideaInput: 'AI 문서 자동화 서비스',
      checkpointData: { aiProfile: 'openai' },
    });

    expect(pipelineQueueMock.add).toHaveBeenCalledWith(
      'run-pipeline',
      expect.objectContaining({
        projectId: 'project-ai-1',
        ideaInput: 'AI 문서 자동화 서비스',
        aiProfile: 'openai',
      }),
      expect.any(Object),
    );

    expect(result).toMatchObject({
      id: 'project-ai-1',
      aiProfile: 'openai',
    });
  });

  it('retries a failed project with its persisted ai profile', async () => {
    projectRepositoryMock.findById.mockResolvedValue({
      id: 'project-ai-2',
      userId: 'user-1',
      status: 'failed',
      ideaInput: '테스트 자동화 플랫폼',
      checkpointData: { aiProfile: 'gemini' },
    });
    projectRepositoryMock.updateStatus.mockResolvedValue({ id: 'project-ai-2', status: 'running' });
    redisMock.srem.mockResolvedValue(1);

    const result = await projectService.retryFromStep('project-ai-2', 4, 'user-1');

    expect(pipelineQueueMock.add).toHaveBeenCalledWith(
      'retry-pipeline',
      expect.objectContaining({
        projectId: 'project-ai-2',
        startStep: 4,
        aiProfile: 'gemini',
      }),
      expect.any(Object),
    );

    expect(result).toEqual({ projectId: 'project-ai-2', step: 4, status: 'running' });
  });
});