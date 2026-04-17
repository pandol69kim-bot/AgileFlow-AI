# 컴포넌트 구현 명세 — AgileFlow

## src/components/ui/AgentStatusBadge.jsx
```jsx
const STATUS_CONFIG = {
  pending:   { icon: '⏳', label: '대기', className: 'text-slate-500 bg-slate-800' },
  running:   { icon: '⚡', label: '실행중', className: 'text-yellow-400 bg-yellow-900/30 animate-pulse' },
  completed: { icon: '✅', label: '완료', className: 'text-emerald-400 bg-emerald-900/30' },
  failed:    { icon: '❌', label: '실패', className: 'text-red-400 bg-red-900/30' },
};

export function AgentStatusBadge({ status }) {
  const cfg = STATUS_CONFIG[status] ?? STATUS_CONFIG.pending;
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${cfg.className}`}>
      {cfg.icon} {cfg.label}
    </span>
  );
}
```

## src/components/features/pipeline/AgentStepCard.jsx
```jsx
import { AgentStatusBadge } from '../../ui/AgentStatusBadge';

export function AgentStepCard({ step, name, status, artifacts, onViewArtifact }) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-lg border border-surface-border bg-surface-raised hover:bg-surface-overlay transition-colors">
      <span className="text-slate-500 font-mono text-xs w-6">{String(step).padStart(2, '0')}</span>
      <span className="flex-1 text-sm text-slate-200">{name}</span>
      <AgentStatusBadge status={status} />
      {status === 'completed' && (
        <button
          type="button"
          onClick={() => onViewArtifact(artifacts[0])}
          className="text-xs text-primary-400 hover:text-primary-300 underline"
        >
          산출물 보기
        </button>
      )}
    </div>
  );
}
```

## src/components/features/pipeline/PipelineProgressPanel.jsx
```jsx
import { AgentStepCard } from './AgentStepCard';

const AGENTS = [
  { step: 1, name: '아이디어 분석', key: '01_idea_analyst' },
  { step: 2, name: '기획서 작성', key: '02_planner' },
  { step: '3a', name: 'UI/UX 디자인', key: '03_designer' },
  { step: '3b', name: '시스템 아키텍처', key: '04_architect' },
  { step: '4a', name: '프론트엔드 개발', key: '05_frontend_dev' },
  { step: '4b', name: '백엔드 개발', key: '06_backend_dev' },
  { step: 5, name: '테스트 & QA', key: '07_tester' },
  { step: 6, name: '배포 & 인프라', key: '08_deployer' },
  { step: 7, name: '프로젝트 리포트', key: '09_project_manager' },
];

export function PipelineProgressPanel({ agentStatuses, onViewArtifact }) {
  const completed = Object.values(agentStatuses).filter(s => s === 'completed').length;
  const progress = Math.round((completed / AGENTS.length) * 100);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-slate-400">전체 진행률</span>
        <span className="text-xs text-primary-400 font-mono">{progress}%</span>
      </div>
      <div className="h-1.5 bg-surface-border rounded-full mb-4">
        <div
          className="h-full bg-primary-500 rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
      {AGENTS.map(agent => (
        <AgentStepCard
          key={agent.key}
          step={agent.step}
          name={agent.name}
          status={agentStatuses[agent.key] ?? 'pending'}
          artifacts={[]}
          onViewArtifact={onViewArtifact}
        />
      ))}
    </div>
  );
}
```
