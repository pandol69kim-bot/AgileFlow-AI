import { useEffect, useCallback } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '../lib/api.js';
import { usePipelineStore } from '../stores/usePipelineStore.js';

const TERMINAL = ['completed', 'failed'];

const STEP_AGENT_KEYS = {
  1: ['01_idea_analyst'],
  2: ['02_planner'],
  3: ['03_designer', '04_architect'],
  4: ['05_frontend_dev', '06_backend_dev'],
  5: ['07_tester'],
  6: ['08_deployer'],
  7: ['09_project_manager'],
};

export function usePipeline(projectId) {
  const queryClient = useQueryClient();
  const { agentStatuses, updateAgentStatus, selectedArtifactKey, setSelectedArtifact } =
    usePipelineStore();

  const { data: project } = useQuery({
    queryKey: ['project', projectId],
    queryFn: () => api.get(`/projects/${projectId}`).then((r) => r.data.data),
    enabled: !!projectId,
    refetchInterval: (data) => (TERMINAL.includes(data?.status) ? false : 5000),
  });

  const { data: artifacts } = useQuery({
    queryKey: ['artifacts', projectId],
    queryFn: () => api.get(`/projects/${projectId}/artifacts`).then((r) => r.data.data),
    enabled: !!projectId,
    refetchInterval: TERMINAL.includes(project?.status) ? false : 3000,
  });

  const { data: failureReasonData } = useQuery({
    queryKey: ['failure-reason', projectId],
    queryFn: () => api.get(`/projects/${projectId}/failure-reason`).then((r) => r.data.data),
    enabled: !!projectId && project?.status === 'failed',
    refetchInterval: (data) => (data?.solution ? false : 3000),
  });

  // DB 기반 에이전트 상태 복원 — 새로고침/재접속 시 running·completed 상태 복구
  const { data: dbStatuses } = useQuery({
    queryKey: ['agent-statuses', projectId],
    queryFn: () => api.get(`/projects/${projectId}/agent-statuses`).then((r) => r.data.data),
    enabled: !!projectId,
    refetchInterval: project?.status === 'running' ? 3000 : false,
  });

  useEffect(() => {
    if (!dbStatuses) return;
    for (const [agent, status] of Object.entries(dbStatuses)) {
      updateAgentStatus(agent, status);
    }
  }, [dbStatuses, updateAgentStatus]);

  // 프로젝트가 완료/실패 상태가 되면 artifacts와 agent-statuses를 즉시 최종 동기화
  useEffect(() => {
    if (!projectId || !TERMINAL.includes(project?.status)) return;
    queryClient.invalidateQueries({ queryKey: ['artifacts', projectId] });
    queryClient.invalidateQueries({ queryKey: ['agent-statuses', projectId] });
  }, [project?.status, projectId, queryClient]);

  // SSE 실시간 업데이트 — 완료/실패 시 연결 불필요
  useEffect(() => {
    if (!projectId || TERMINAL.includes(project?.status)) return;

    const baseUrl = import.meta.env.VITE_API_URL ?? '/api/v1';
    const es = new EventSource(`${baseUrl}/projects/${projectId}/stream`, {
      withCredentials: true,
    });

    es.onmessage = (e) => {
      const data = JSON.parse(e.data);
      if (data.agent && data.status) {
        updateAgentStatus(data.agent, data.status);
        // 아티팩트가 생성될 때마다 즉시 artifacts 쿼리 갱신 (race condition 방지)
        if (data.status === 'completed' && data.filename) {
          queryClient.invalidateQueries({ queryKey: ['artifacts', projectId] });
        }
      }
    };

    es.onerror = () => es.close();

    return () => es.close();
  }, [projectId, project?.status, updateAgentStatus, queryClient]);

  const updateArtifact = useCallback(async (artifactId, content) => {
    await api.patch(`/projects/${projectId}/artifacts/${artifactId}`, { content });
    queryClient.invalidateQueries({ queryKey: ['artifacts', projectId] });
  }, [projectId, queryClient]);

  const skipStep = useCallback(async (orchestratorStep) => {
    await api.post(`/projects/${projectId}/steps/${orchestratorStep}/skip`);
    for (const key of STEP_AGENT_KEYS[orchestratorStep] ?? []) {
      updateAgentStatus(key, 'skipped');
    }
  }, [projectId, updateAgentStatus]);

  const retryStep = useCallback(async (orchestratorStep) => {
    await api.post(`/projects/${projectId}/steps/${orchestratorStep}/run`);
    queryClient.invalidateQueries({ queryKey: ['project', projectId] });
    queryClient.invalidateQueries({ queryKey: ['agent-statuses', projectId] });
  }, [projectId, queryClient]);

  const cancelPipeline = useCallback(async () => {
    await api.post(`/projects/${projectId}/cancel`);
    queryClient.invalidateQueries({ queryKey: ['project', projectId] });
  }, [projectId, queryClient]);

  const deleteProject = useCallback(async () => {
    await api.delete(`/projects/${projectId}`);
    queryClient.removeQueries({ queryKey: ['project', projectId] });
    queryClient.removeQueries({ queryKey: ['artifacts', projectId] });
    queryClient.removeQueries({ queryKey: ['agent-statuses', projectId] });
    queryClient.removeQueries({ queryKey: ['failure-reason', projectId] });
    await queryClient.invalidateQueries({ queryKey: ['projects'] });
  }, [projectId, queryClient]);

  const selectedArtifact = artifacts?.find((a) => a.filename === selectedArtifactKey) ?? null;

  const failureReason = failureReasonData?.reason ?? null;
  const failureSolution = failureReasonData?.solution ?? null;

  return {
    project,
    artifacts,
    agentStatuses,
    selectedArtifact,
    setSelectedArtifact,
    updateArtifact,
    skipStep,
    retryStep,
    cancelPipeline,
    deleteProject,
    failureReason,
    failureSolution,
  };
}
