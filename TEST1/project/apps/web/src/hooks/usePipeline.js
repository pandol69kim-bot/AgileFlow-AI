import { useEffect, useCallback } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '../lib/api.js';
import { usePipelineStore } from '../stores/usePipelineStore.js';

const TERMINAL = ['completed', 'failed'];

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
      }
    };

    es.onerror = () => es.close();

    return () => es.close();
  }, [projectId, project?.status, updateAgentStatus]);

  const updateArtifact = useCallback(async (artifactId, content) => {
    await api.patch(`/projects/${projectId}/artifacts/${artifactId}`, { content });
    queryClient.invalidateQueries({ queryKey: ['artifacts', projectId] });
  }, [projectId, queryClient]);

  const skipStep = useCallback(async (orchestratorStep) => {
    await api.post(`/projects/${projectId}/steps/${orchestratorStep}/skip`);
    updateAgentStatus(`step_${orchestratorStep}_skipped`, 'skipped');
  }, [projectId, updateAgentStatus]);

  const selectedArtifact = artifacts?.find((a) => a.filename === selectedArtifactKey) ?? null;

  return { project, artifacts, agentStatuses, selectedArtifact, setSelectedArtifact, updateArtifact, skipStep };
}
