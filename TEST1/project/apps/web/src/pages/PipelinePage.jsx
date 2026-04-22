import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { usePipeline } from '../hooks/usePipeline.js';
import { PipelineProgressPanel } from '../components/features/pipeline/PipelineProgressPanel.jsx';
import { ArtifactViewer } from '../components/features/artifacts/ArtifactViewer.jsx';

const STATUS_BADGE = {
  pending:   { label: '대기 중',  cls: 'bg-slate-700 text-slate-300' },
  running:   { label: '실행 중',  cls: 'bg-blue-900 text-blue-300 animate-pulse' },
  completed: { label: '완료',     cls: 'bg-green-900 text-green-300' },
  failed:    { label: '실패',     cls: 'bg-red-900 text-red-300' },
  cancelled: { label: '취소됨',   cls: 'bg-orange-900 text-orange-300' },
};

export function PipelinePage() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { project, agentStatuses, selectedArtifact, setSelectedArtifact, updateArtifact, skipStep, retryStep, cancelPipeline, deleteProject, failureReason, failureSolution } =
    usePipeline(projectId);

  const badge = STATUS_BADGE[project?.status] ?? STATUS_BADGE.pending;

  const [downloading, setDownloading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [cancelling, setCancelling] = useState(false);

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

  async function handleCancel() {
    if (cancelling || project?.status !== 'running') return;
    const confirmed = window.confirm('파이프라인을 취소할까요? 현재 단계까지의 산출물은 유지됩니다.');
    if (!confirmed) return;

    setCancelling(true);
    try {
      await cancelPipeline();
    } catch (err) {
      alert(`취소 오류:\n${err.message}`);
    } finally {
      setCancelling(false);
    }
  }

  async function handleDelete() {
    if (deleting || (project?.status !== 'failed' && project?.status !== 'cancelled')) return;

    const confirmed = window.confirm('프로젝트를 삭제할까요? 관련 산출물과 로그도 함께 삭제됩니다.');
    if (!confirmed) return;

    setDeleting(true);
    try {
      await deleteProject();
      navigate('/projects');
    } catch (err) {
      console.error('프로젝트 삭제 오류:', err);
      alert(`삭제 오류:\n${err.message}`);
    } finally {
      setDeleting(false);
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
            {project?.aiLabel && (
              <p className="text-[11px] text-slate-600 mt-1">선택 AI: {project.aiLabel}</p>
            )}
          </div>
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${badge.cls}`}>
            {badge.label}
          </span>
        </div>
        <div className="flex items-center gap-3">
          {project?.status === 'running' && (
            <button
              type="button"
              onClick={handleCancel}
              disabled={cancelling}
              className="text-xs text-orange-400 hover:text-orange-300 border border-orange-800 hover:border-orange-600 px-3 py-1 rounded cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {cancelling ? '취소 요청 중...' : '⏹ 실행 취소'}
            </button>
          )}
          {(project?.status === 'failed' || project?.status === 'cancelled') && (
            <button
              type="button"
              onClick={handleDelete}
              disabled={deleting}
              className="text-xs text-red-400 hover:text-red-300 underline cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {deleting ? '삭제 중...' : '프로젝트 삭제'}
            </button>
          )}
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
            onRetryStep={project?.status === 'failed' ? retryStep : null}
            projectStatus={project?.status}
          />
        </aside>

        <main className="flex-1 px-6 pb-6 overflow-y-auto">
          {!selectedArtifact && project?.status === 'failed' && failureReason ? (
            <div className="max-w-3xl mx-auto pt-6 flex flex-col gap-4">
              <div
                className="rounded-lg border p-5"
                style={{ borderColor: '#7f1d1d', backgroundColor: '#1c0a0a' }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-red-400 text-sm font-semibold">❌ 파이프라인 실패 사유</span>
                </div>
                <pre
                  className="text-red-300 text-xs font-mono whitespace-pre-wrap break-all leading-relaxed"
                  style={{ maxHeight: '40vh', overflowY: 'auto' }}
                >
                  {failureReason}
                </pre>
              </div>
              {failureSolution && (
                <div
                  className="rounded-lg border p-5"
                  style={{ borderColor: '#1e3a5f', backgroundColor: '#0a1628' }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-blue-400 text-sm font-semibold">💡 해결책</span>
                  </div>
                  <pre
                    className="text-blue-200 text-xs font-mono whitespace-pre-wrap break-words leading-relaxed"
                    style={{ maxHeight: '40vh', overflowY: 'auto' }}
                  >
                    {failureSolution}
                  </pre>
                </div>
              )}
              {!failureSolution && (
                <div className="text-slate-500 text-xs text-center py-2">해결책 분석 중...</div>
              )}
            </div>
          ) : (
            <ArtifactViewer
              artifact={selectedArtifact}
              onSave={updateArtifact}
            />
          )}
        </main>
      </div>
    </div>
  );
}
