import { AgentStatusBadge } from '../../ui/AgentStatusBadge.jsx';

export function AgentStepCard({ step, name, status, artifactFilename, orchestratorStep, onViewArtifact, onSkipStep, onRetryStep, projectStatus }) {
  // 완료된 에이전트는 항상 보기 가능, 프로젝트 완료 시 skipped 에이전트도 포함
  const canView = artifactFilename && (
    status === 'completed' ||
    (projectStatus === 'completed' && status === 'skipped')
  );

  // 실패한 프로젝트에서 재시도 버튼: completed 포함 (해당 스텝 이후를 다시 돌릴 수 있도록)
  const canRetry = onRetryStep && orchestratorStep && projectStatus === 'failed';

  return (
    <div
      className="flex items-center gap-3 p-3 rounded-lg border transition-colors"
      style={{ borderColor: 'var(--color-surface-border)', backgroundColor: 'var(--color-surface-raised)' }}
    >
      <span className="text-slate-600 font-mono text-xs w-6 shrink-0">
        {typeof step === 'number' ? String(step).padStart(2, '0') : step}
      </span>
      <span className="flex-1 text-sm text-slate-200 truncate">{name}</span>
      <AgentStatusBadge status={status} />
      {canView && (
        <button
          type="button"
          onClick={() => onViewArtifact(artifactFilename)}
          className="text-xs text-primary-400 underline shrink-0 hover:text-primary-300 cursor-pointer transition-all"
        >
          보기
        </button>
      )}
      {canRetry && (
        <button
          type="button"
          onClick={() => onRetryStep(orchestratorStep)}
          className="text-xs text-amber-400 hover:text-amber-300 underline shrink-0 cursor-pointer transition-all"
          title={`스텝 ${orchestratorStep}부터 재실행`}
        >
          ↺ 진행
        </button>
      )}
      {status === 'pending' && onSkipStep && orchestratorStep && (
        <button
          type="button"
          onClick={() => onSkipStep(orchestratorStep)}
          className="text-xs text-slate-500 hover:text-slate-300 underline shrink-0"
          title="이 스텝을 건너뜁니다"
        >
          건너뛰기
        </button>
      )}
    </div>
  );
}
