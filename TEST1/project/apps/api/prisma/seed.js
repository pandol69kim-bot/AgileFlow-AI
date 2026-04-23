import { PrismaClient } from '@prisma/client';
import { createHash } from 'node:crypto';

const prisma = new PrismaClient();

function sha256(str) {
  return createHash('sha256').update(str).digest('hex');
}

function daysAgo(n) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d;
}

// ── Agent 이름 목록 ──────────────────────────────────────────────
const AGENTS = [
  'idea_analyst',
  'planner',
  'designer',
  'architect',
  'frontend_dev',
  'backend_dev',
  'tester',
  'deployer',
  'project_manager',
];

// ── 아티팩트 파일 정의 ────────────────────────────────────────────
const ARTIFACT_FILES = {
  idea_analyst:    [{ filename: 'idea_analysis.md', content: '# 아이디어 분석\n\n## 핵심 가치\n- 사용자 문제 해결\n- 시장 기회 분석\n\n## 결론\n실현 가능성 높음.' }],
  planner:         [{ filename: 'product_requirements.md', content: '# PRD\n\n## 목표\n- MVP 출시 8주 내\n\n## 핵심 기능\n1. 사용자 인증\n2. 데이터 관리\n3. 알림 시스템' }],
  designer:        [
    { filename: 'design_system.md', content: '# 디자인 시스템\n\n## 컬러\n- Primary: #6366F1\n- Surface: #0A0A0F\n\n## 타이포그래피\n- Font: Inter' },
    { filename: 'wireframes.md',    content: '# 와이어프레임\n\n## 메인 화면\n- 헤더 / 사이드바 / 콘텐츠 영역\n\n## 모바일 대응\n- 반응형 브레이크포인트 적용' },
  ],
  architect:       [
    { filename: 'tech_stack.md',      content: '# 기술 스택\n\n- Frontend: Vite + React\n- Backend: Node.js + Fastify\n- DB: PostgreSQL + Prisma\n- Cache: Redis' },
    { filename: 'architecture.md',    content: '# 아키텍처\n\n## 레이어\n1. 프레젠테이션\n2. 애플리케이션\n3. 도메인\n4. 인프라' },
    { filename: 'database_schema.md', content: '# DB 스키마\n\n## users\n| 컬럼 | 타입 |\n|------|------|\n| id | UUID |\n| email | VARCHAR |\n| name | VARCHAR |' },
  ],
  frontend_dev:    [
    { filename: 'frontend_setup.md',      content: '# 프론트엔드 설정\n\n## Vite 설정\n- port: 5173\n- proxy: /api → localhost:3001' },
    { filename: 'frontend_components.md', content: '# 컴포넌트 목록\n\n- Button\n- Card\n- Modal\n- Table\n- Form' },
  ],
  backend_dev:     [
    { filename: 'backend_setup.md',  content: '# 백엔드 설정\n\n## Fastify\n- port: 3001\n- JWT 인증\n- Swagger UI: /docs' },
    { filename: 'backend_routes.md', content: '# API 라우트\n\n- POST /api/v1/auth/login\n- GET /api/v1/projects\n- POST /api/v1/projects' },
  ],
  tester:          [{ filename: 'test_strategy.md', content: '# 테스트 전략\n\n## 커버리지 목표: 80%\n\n- Unit: vitest\n- E2E: playwright' }],
  deployer:        [
    { filename: 'docker.md', content: '# Docker 설정\n\n## 서비스\n- postgres:16-alpine\n- redis:7-alpine\n- api (Node.js)\n- web (Nginx)' },
    { filename: 'cicd.md',   content: '# CI/CD\n\n## GitHub Actions\n- lint → test → build → deploy\n- main 브랜치 자동 배포' },
  ],
  project_manager: [{ filename: 'final_report.md', content: '# 최종 보고서\n\n## 요약\n파이프라인 성공적으로 완료.\n\n## 다음 단계\n- 스테이징 배포\n- 사용자 테스트' }],
};

function makeLogs(projectId, agents, eventSuffix = '') {
  const logs = [];
  for (const agent of agents) {
    logs.push({ projectId, agentName: agent, eventType: 'agent_start',    message: `${agent} 시작${eventSuffix}` });
    logs.push({ projectId, agentName: agent, eventType: 'agent_complete', message: `${agent} 완료${eventSuffix}` });
  }
  return logs;
}

async function main() {
  // ── 유저 ────────────────────────────────────────────────────────
  const [demo, alice] = await Promise.all([
    prisma.user.upsert({
      where:  { email: 'demo@agileflow.io' },
      update: {},
      create: { email: 'demo@agileflow.io', name: 'Demo User', password: sha256('password123') },
    }),
    prisma.user.upsert({
      where:  { email: 'alice@agileflow.io' },
      update: {},
      create: { email: 'alice@agileflow.io', name: 'Alice', password: sha256('password123') },
    }),
  ]);
  console.log('✓ users:', demo.email, alice.email);

  // ── 프로젝트 1: 완료 ─────────────────────────────────────────────
  const p1 = await prisma.project.upsert({
    where:  { id: '00000000-0000-0000-0000-000000000001' },
    update: {},
    create: {
      id:          '00000000-0000-0000-0000-000000000001',
      userId:      demo.id,
      title:       '반려동물 건강관리 앱',
      ideaInput:   '반려동물의 예방접종, 병원 방문, 건강 기록을 통합 관리하는 모바일 앱',
      status:      'completed',
      currentStep: 9,
      createdAt:   daysAgo(7),
      completedAt: daysAgo(6),
    },
  });

  // 아티팩트 (전체 에이전트)
  for (const agent of AGENTS) {
    for (const file of ARTIFACT_FILES[agent] ?? []) {
      await prisma.agentArtifact.upsert({
        where:  { projectId_agentName_filename: { projectId: p1.id, agentName: agent, filename: file.filename } },
        update: {},
        create: { projectId: p1.id, agentName: agent, filename: file.filename, content: file.content, status: 'completed' },
      });
    }
  }

  // 로그
  await prisma.pipelineLog.deleteMany({ where: { projectId: p1.id } });
  await prisma.pipelineLog.createMany({ data: makeLogs(p1.id, AGENTS) });
  console.log('✓ project 1 (completed):', p1.title);

  // ── 프로젝트 2: 실행 중 ──────────────────────────────────────────
  const p2 = await prisma.project.upsert({
    where:  { id: '00000000-0000-0000-0000-000000000002' },
    update: { status: 'running', currentStep: 4 },
    create: {
      id:          '00000000-0000-0000-0000-000000000002',
      userId:      demo.id,
      title:       '팀 일정 관리 SaaS',
      ideaInput:   '소규모 팀을 위한 일정 관리, 업무 배분, 진척도 추적 SaaS 서비스',
      status:      'running',
      currentStep: 4,
      createdAt:   daysAgo(1),
    },
  });

  const completedAgents = AGENTS.slice(0, 4); // idea_analyst ~ architect
  for (const agent of completedAgents) {
    for (const file of ARTIFACT_FILES[agent] ?? []) {
      await prisma.agentArtifact.upsert({
        where:  { projectId_agentName_filename: { projectId: p2.id, agentName: agent, filename: file.filename } },
        update: {},
        create: { projectId: p2.id, agentName: agent, filename: file.filename, content: file.content, status: 'completed' },
      });
    }
  }

  await prisma.pipelineLog.deleteMany({ where: { projectId: p2.id } });
  await prisma.pipelineLog.createMany({ data: makeLogs(p2.id, completedAgents) });
  console.log('✓ project 2 (running):', p2.title);

  // ── 프로젝트 3: 실패 ─────────────────────────────────────────────
  const p3 = await prisma.project.upsert({
    where:  { id: '00000000-0000-0000-0000-000000000003' },
    update: {},
    create: {
      id:          '00000000-0000-0000-0000-000000000003',
      userId:      demo.id,
      title:       '중고책 거래 플랫폼',
      ideaInput:   '대학생 간 중고 교재 거래를 위한 P2P 플랫폼. 학교별 커뮤니티 제공.',
      status:      'failed',
      currentStep: 2,
      createdAt:   daysAgo(3),
    },
  });

  await prisma.pipelineLog.deleteMany({ where: { projectId: p3.id } });
  await prisma.pipelineLog.createMany({
    data: [
      { projectId: p3.id, agentName: 'idea_analyst', eventType: 'agent_start',  message: 'idea_analyst 시작' },
      { projectId: p3.id, agentName: 'idea_analyst', eventType: 'agent_complete', message: 'idea_analyst 완료' },
      { projectId: p3.id, agentName: 'planner',      eventType: 'agent_start',  message: 'planner 시작' },
      { projectId: p3.id, agentName: 'planner',      eventType: 'agent_error',  message: 'API 응답 타임아웃 — 재시도 가능' },
    ],
  });
  console.log('✓ project 3 (failed):', p3.title);

  // ── 프로젝트 4: 대기 중 (alice) ──────────────────────────────────
  const p4 = await prisma.project.upsert({
    where:  { id: '00000000-0000-0000-0000-000000000004' },
    update: {},
    create: {
      id:        '00000000-0000-0000-0000-000000000004',
      userId:    alice.id,
      title:     '재고 관리 대시보드',
      ideaInput: '중소 쇼핑몰을 위한 실시간 재고 현황, 발주 알림, 판매 분석 대시보드',
      status:    'pending',
      currentStep: 0,
      createdAt: daysAgo(0),
    },
  });
  console.log('✓ project 4 (pending):', p4.title);

  // ── 프로젝트 5: 완료 (alice) ──────────────────────────────────────
  const p5 = await prisma.project.upsert({
    where:  { id: '00000000-0000-0000-0000-000000000005' },
    update: {},
    create: {
      id:          '00000000-0000-0000-0000-000000000005',
      userId:      alice.id,
      title:       '음식 레시피 추천 앱',
      ideaInput:   '냉장고 재료를 입력하면 AI가 레시피를 추천해주는 앱',
      status:      'completed',
      currentStep: 9,
      createdAt:   daysAgo(14),
      completedAt: daysAgo(13),
    },
  });

  for (const agent of AGENTS) {
    for (const file of ARTIFACT_FILES[agent] ?? []) {
      await prisma.agentArtifact.upsert({
        where:  { projectId_agentName_filename: { projectId: p5.id, agentName: agent, filename: file.filename } },
        update: {},
        create: { projectId: p5.id, agentName: agent, filename: file.filename, content: file.content, status: 'completed' },
      });
    }
  }

  await prisma.pipelineLog.deleteMany({ where: { projectId: p5.id } });
  await prisma.pipelineLog.createMany({ data: makeLogs(p5.id, AGENTS) });
  console.log('✓ project 5 (completed):', p5.title);

  console.log('\n🎉 Seed 완료');
  console.log('  로그인: demo@agileflow.io / password123');
  console.log('  로그인: alice@agileflow.io / password123');
}

main().catch(console.error).finally(() => prisma.$disconnect());
