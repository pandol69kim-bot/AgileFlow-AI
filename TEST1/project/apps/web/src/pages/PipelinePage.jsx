import { useParams } from 'react-router-dom';
import { usePipeline } from '../hooks/usePipeline.js';
import { PipelineProgressPanel } from '../components/features/pipeline/PipelineProgressPanel.jsx';
import { ArtifactViewer } from '../components/features/artifacts/ArtifactViewer.jsx';

export function PipelinePage() {
  const { projectId } = useParams();
  const { project, agentStatuses, selectedArtifact, setSelectedArtifact } = usePipeline(projectId);

  return (
    <div className="flex flex-col" style={{ height: 'calc(100vh - 57px)' }}>
      <div
        className="px-6 py-3 border-b flex items-center justify-between"
        style={{ borderColor: 'var(--color-surface-border)', backgroundColor: 'var(--color-surface-raised)' }}
      >
        <div>
          <h2 className="text-sm font-semibold text-slate-200">{project?.title ?? '파이프라인 실행 중...'}</h2>
          <p className="text-xs text-slate-500 font-mono mt-0.5">{project?.idea_input}</p>
        </div>
        {project?.status === 'completed' && (
          <a
            href={`${import.meta.env.VITE_API_URL}/projects/${projectId}/download`}
            className="text-xs text-primary-400 hover:text-primary-300 underline"
          >
            ↓ ZIP 다운로드
          </a>
        )}
      </div>

      <div className="flex flex-1 overflow-hidden">
        <aside
          className="w-72 shrink-0 border-r p-4 overflow-y-auto"
          style={{ borderColor: 'var(--color-surface-border)' }}
        >
          <PipelineProgressPanel agentStatuses={agentStatuses} onViewArtifact={setSelectedArtifact} />
        </aside>

        <main className="flex-1 p-6 overflow-y-auto">
          <ArtifactViewer artifact={selectedArtifact} />
        </main>
      </div>
    </div>
  );
}
