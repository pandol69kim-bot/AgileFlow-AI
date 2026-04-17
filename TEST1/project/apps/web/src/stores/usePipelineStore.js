import { create } from 'zustand';

export const usePipelineStore = create((set) => ({
  agentStatuses: {},
  selectedArtifactKey: null,

  updateAgentStatus: (agent, status) =>
    set((state) => ({
      agentStatuses: { ...state.agentStatuses, [agent]: status },
    })),

  setSelectedArtifact: (key) => set({ selectedArtifactKey: key }),

  reset: () => set({ agentStatuses: {}, selectedArtifactKey: null }),
}));
