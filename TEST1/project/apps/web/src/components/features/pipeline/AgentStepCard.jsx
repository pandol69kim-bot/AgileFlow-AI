import { AgentStatusBadge } from '../../ui/AgentStatusBadge.jsx';

export function AgentStepCard({ step, name, status, artifactFilename, onViewArtifact }) {
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
      {status === 'completed' && artifactFilename && (
        <button
          type="button"
          onClick={() => onViewArtifact(artifactFilename)}
          className="text-xs text-primary-400 hover:text-primary-300 underline shrink-0"
        >
          보기
        </button>
      )}
    </div>
  );
}
