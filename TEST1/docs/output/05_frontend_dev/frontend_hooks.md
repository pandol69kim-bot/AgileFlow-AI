# 훅 & 상태 관리 — AgileFlow

## src/hooks/usePipeline.js
```js
import { useState, useEffect, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '../lib/api';

export function usePipeline(projectId) {
  const [agentStatuses, setAgentStatuses] = useState({});
  const [selectedArtifact, setSelectedArtifact] = useState(null);

  const { data: project } = useQuery({
    queryKey: ['project', projectId],
    queryFn: () => api.get(`/projects/${projectId}`).then(r => r.data),
    enabled: !!projectId,
  });

  // SSE로 실시간 에이전트 상태 수신
  useEffect(() => {
    if (!projectId) return;
    const eventSource = new EventSource(`${import.meta.env.VITE_API_URL}/projects/${projectId}/stream`);

    eventSource.onmessage = (e) => {
      const data = JSON.parse(e.data);
      setAgentStatuses(prev => ({ ...prev, [data.agent]: data.status }));
    };

    return () => eventSource.close();
  }, [projectId]);

  return { project, agentStatuses, selectedArtifact, setSelectedArtifact };
}
```

## src/stores/usePipelineStore.js
```js
import { create } from 'zustand';

export const usePipelineStore = create((set) => ({
  currentProjectId: null,
  agentStatuses: {},
  setCurrentProject: (id) => set({ currentProjectId: id }),
  updateAgentStatus: (agent, status) =>
    set(state => ({
      agentStatuses: { ...state.agentStatuses, [agent]: status }
    })),
  reset: () => set({ currentProjectId: null, agentStatuses: {} }),
}));
```
