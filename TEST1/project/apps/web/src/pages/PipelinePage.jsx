import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { usePipeline } from '../hooks/usePipeline.js';
import { PipelineProgressPanel } from '../components/features/pipeline/PipelineProgressPanel.jsx';
import { ArtifactViewer } from '../components/features/artifacts/ArtifactViewer.jsx';

const STATUS_BADGE = {
  pending:   { label: '대기 중',    cls: 'bg-slate-700 text-slate-300' },
  running:   { label: '실행 중',    cls: 'bg-blue-900 text-blue-300 animate-pulse' },
  completed: { label: '완료',       cls: 'bg-green-900 text-green-300' },
  failed:    { label: '실패',       cls: 'bg-red-900 text-red-300' },
};

export function PipelinePage() {
  const { projectId } = useParams();
  const { project, agentStatuses, selectedArtifact, setSelectedArtifact, updateArtifact, skipStep } =
    usePipeline(projectId);

  const badge = STATUS_BADGE[project?.status] ?? STATUS_BADGE.pending;

  const [downloading, setDownloading] = useState(false);

  async function handleDownload() {
    if (downloading) return;
    setDownloading(true);
    try {
      const res = await fetch(`/api/v1/projects/${projectId}/download`, {
        credentials: 'include',
      });
      if (res.status === 401) throw new Error('세션이 만료되었습니다. 다시 로그인해주세요.');
      if (!res.ok) {
        const body = await res.text().catch(() => '');
        throw new Error(`서버 오류 ${res.status}${body ? ': ' + body.slice(0, 200) : ''}`);
      }
      const blob = await res.blob();
      if (blob.size === 0) throw new Error('서버에서 빈 파일이 반환되었습니다.');
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${project?.title ?? projectId}.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch (err) {
      console.error('ZIP 다운로드 오류:', err);
      alert(`다운로드 오류:\n${err.message}`);
    } finally {
      setDownloading(false);
    }
  }

  return (
    <div className="flex flex-col" style={{ height: 'calc(100vh - 57px)' }}>
      <div
        className="px-6 py-3 border-b flex items-center justify-between"
        style={{ borderColor: 'var(--color-surface-border)', backgroundColor: 'var(--color-surface-raised)' }}
      >
        <div className="flex items-center gap-3">
          <div>
            <h2 className="text-sm font-semibold text-slate-200">{project?.title ?? '파이프라인 실행 중...'}</h2>
            <p className="text-xs text-slate-500 font-mono mt-0.5">{project?.idea_input}</p>
          </div>
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${badge.cls}`}>
            {badge.label}
          </span>
        </div>
        {project?.status === 'completed' && (
          <button
            type="button"
            onClick={handleDownload}
            disabled={downloading}
            className="text-xs text-primary-400 hover:text-primary-300 underline cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {downloading ? '다운로드 중...' : '↓ ZIP 다운로드'}
          </button>
        )}
      </div>

      <div className="flex flex-1 overflow-hidden">
        <aside
          className="w-72 shrink-0 border-r p-4 overflow-y-auto"
          style={{ borderColor: 'var(--color-surface-border)' }}
        >
          <PipelineProgressPanel
            agentStatuses={agentStatuses}
            onViewArtifact={setSelectedArtifact}
            onSkipStep={project?.status === 'running' ? skipStep : null}
            projectStatus={project?.status}
          />
        </aside>

        <main className="flex-1 px-6 pb-6 overflow-y-auto">
          <ArtifactViewer
            artifact={selectedArtifact}
            onSave={updateArtifact}
          />
        </main>
      </div>
    </div>
  );
}
