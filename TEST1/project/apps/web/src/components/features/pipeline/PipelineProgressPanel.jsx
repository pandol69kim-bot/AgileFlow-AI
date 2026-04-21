import { AgentStepCard } from './AgentStepCard.jsx';

const AGENTS = [
  { step: 1,    orchestratorStep: 1, name: '아이디어 분석',   key: '01_idea_analyst',    artifact: 'idea_analysis_report.md' },
  { step: 2,    orchestratorStep: 2, name: '기획서 작성',     key: '02_planner',         artifact: 'product_requirements.md' },
  { step: '3a', orchestratorStep: 3, name: 'UI/UX 디자인',   key: '03_designer',        artifact: 'design_system.md' },
  { step: '3b', orchestratorStep: 3, name: '시스템 아키텍처', key: '04_architect',       artifact: 'tech_stack.md' },
  { step: '4a', orchestratorStep: 4, name: '프론트엔드 개발', key: '05_frontend_dev',    artifact: 'frontend_setup.md' },
  { step: '4b', orchestratorStep: 4, name: '백엔드 개발',    key: '06_backend_dev',     artifact: 'backend_setup.md' },
  { step: 5,    orchestratorStep: 5, name: '테스트 & QA',    key: '07_tester',          artifact: 'test_strategy.md' },
  { step: 6,    orchestratorStep: 6, name: '배포 & 인프라',  key: '08_deployer',        artifact: 'docker.md' },
  { step: 7,    orchestratorStep: 7, name: 'PM 리포트',      key: '09_project_manager', artifact: 'final_report.md' },
];

export function PipelineProgressPanel({ agentStatuses = {}, onViewArtifact, onSkipStep, projectStatus }) {
  const isFailed = projectStatus === 'failed';

  const completed = AGENTS.filter(
    (a) => agentStatuses[a.key] === 'completed' || agentStatuses[a.key] === 'skipped'
  ).length;
  const progress = Math.round((completed / AGENTS.length) * 100);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between mb-1">
        <span className={`text-xs ${isFailed ? 'text-red-400' : 'text-slate-400'}`}>
          {isFailed ? '파이프라인 실패' : '전체 진행률'}
        </span>
        <span className={`text-xs font-mono ${isFailed ? 'text-red-400' : 'text-primary-400'}`}>
          {isFailed ? `${completed}/${AGENTS.length} 완료 후 실패` : `${progress}%`}
        </span>
      </div>
      <div className="h-1 rounded-full mb-3" style={{ backgroundColor: 'var(--color-surface-border)' }}>
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${progress}%`, backgroundColor: isFailed ? '#ef4444' : 'var(--color-primary-500)' }}
        />
      </div>
      {AGENTS.map((agent) => (
        <AgentStepCard
          key={agent.key}
          step={agent.step}
          orchestratorStep={agent.orchestratorStep}
          name={agent.name}
          status={agentStatuses[agent.key] ?? 'pending'}
          artifactFilename={agent.artifact}
          onViewArtifact={onViewArtifact}
          onSkipStep={onSkipStep}
          projectStatus={projectStatus}
        />
      ))}
    </div>
  );
}
