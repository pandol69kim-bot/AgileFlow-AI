const STATUS_CONFIG = {
  pending:   { icon: '⏳', label: '대기',     className: 'text-slate-500 bg-slate-800/60' },
  running:   { icon: '⚡', label: '실행중',   className: 'text-yellow-400 bg-yellow-900/30 animate-pulse' },
  completed: { icon: '✅', label: '완료',     className: 'text-emerald-400 bg-emerald-900/30' },
  failed:    { icon: '❌', label: '실패',     className: 'text-red-400 bg-red-900/30' },
  skipped:   { icon: '⏭', label: '건너뜀',   className: 'text-slate-400 bg-slate-700/60' },
};

export function AgentStatusBadge({ status = 'pending' }) {
  const cfg = STATUS_CONFIG[status] ?? STATUS_CONFIG.pending;
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${cfg.className}`}>
      {cfg.icon} {cfg.label}
    </span>
  );
}
