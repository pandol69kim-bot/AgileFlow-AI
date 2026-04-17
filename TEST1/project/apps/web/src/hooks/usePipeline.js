import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '../lib/api.js';
import { usePipelineStore } from '../stores/usePipelineStore.js';

export function usePipeline(projectId) {
  const { agentStatuses, updateAgentStatus, selectedArtifactKey, setSelectedArtifact } =
    usePipelineStore();

  const { data: project } = useQuery({
    queryKey: ['project', projectId],
    queryFn: () => api.get(`/projects/${projectId}`).then((r) => r.data.data),
    enabled: !!projectId,
    refetchInterval: (data) => (data?.status === 'completed' ? false : 5000),
  });

  const { data: artifacts } = useQuery({
    queryKey: ['artifacts', projectId],
    queryFn: () => api.get(`/projects/${projectId}/artifacts`).then((r) => r.data.data),
    enabled: !!projectId,
    refetchInterval: (data) => (project?.status === 'completed' ? false : 3000),
  });

  // SSE 실시간 에이전트 상태 수신
  useEffect(() => {
    if (!projectId) return;
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
  }, [projectId, updateAgentStatus]);

  const selectedArtifact = artifacts?.find((a) => a.filename === selectedArtifactKey) ?? null;

  return { project, artifacts, agentStatuses, selectedArtifact, setSelectedArtifact };
}
