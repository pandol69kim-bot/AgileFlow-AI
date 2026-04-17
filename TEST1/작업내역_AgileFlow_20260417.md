# 작업내역 — AgileFlow

- **날짜:** 2026-04-17
- **작업 디렉토리:** `D:\AI-DATA\TEST1\`

---

## 작업 요약

| 단계 | 작업 | 산출물 경로 |
|------|------|------------|
| 1 | 프로젝트 개념 분석 | `docs/프로젝트개념.txt` |
| 2 | PRD 작성 | `docs/PRD.md` |
| 3 | 9단계 에이전트 파이프라인 실행 (시뮬레이션) | `docs/output/` |
| 4 | 실제 프로젝트 코드 구현 | `project/` |

---

## 1. PRD 작성 (`docs/PRD.md`)

`docs/프로젝트개념.txt` (Gemini AI 에이전트 마스터 커리큘럼) 기반으로 Level 3 실습 프로젝트의 PRD를 작성.

- 8개 섹션 구성: 개요, 문제 정의, 기능 요구사항(Phase 1~4), 실습 로드맵, 비기능 요구사항, 기술 스택, 성공 지표, 범위 외
- Must/Should 우선순위로 분류된 22개 기능 항목

---

## 2. 에이전트 파이프라인 실행 (`docs/output/`)

`docs_vite-js/` 의 9개 에이전트 정의 + `docs/프로젝트-에이전트.txt` 아이디어 기반으로 전체 파이프라인 시뮬레이션 실행.

**아이디어:** 기획자·개발자·QA 에이전트 협업 → 자연어 요구사항 → 최종 산출물 자동 생성 (AgileFlow 플랫폼)

### 파이프라인 실행 결과 (24개 산출물)

| 에이전트 | 실행 방식 | 산출물 |
|---------|----------|--------|
| 01_idea_analyst | 순차 | `idea_analysis_report.md` |
| 02_planner | 순차 | `product_requirements.md` |
| 03_designer | **병렬** | `design_system.md`, `wireframes.md`, `components.md` |
| 04_architect | **병렬** | `tech_stack.md`, `architecture.md`, `database_schema.md`, `project_structure.md` |
| 05_frontend_dev | **병렬** | `frontend_setup.md`, `frontend_components.md`, `frontend_pages.md`, `frontend_hooks.md` |
| 06_backend_dev | **병렬** | `backend_setup.md`, `backend_routes.md`, `backend_services.md` |
| 07_tester | 순차 | `test_strategy.md`, `e2e_tests.md`, `code_review.md` |
| 08_deployer | 순차 | `docker.md`, `cicd.md`, `monitoring.md` |
| 09_project_manager | 순차 | `project_dashboard.md`, `final_report.md` |

---

## 3. 프로젝트 코드 구현 (`project/`)

파이프라인 산출물 기반으로 실제 동작하는 코드 구현. **총 50개 파일.**

### 디렉토리 구조

```
project/
├── apps/
│   ├── web/          # Vite + React (15개 파일)
│   ├── api/          # Node.js + Fastify (13개 파일)
│   └── pipeline/     # Python + LangGraph (12개 파일)
├── docker-compose.yml
├── turbo.json
├── package.json
├── .env.example
└── README.md
```

### 주요 구현 내용

#### apps/web (프론트엔드)
- `HomePage.jsx` — 아이디어 입력 + 최근 프로젝트 목록
- `PipelinePage.jsx` — 9단계 진행 모니터 + 산출물 뷰어 (SSE 실시간 업데이트)
- `ProjectsPage.jsx` — 전체 프로젝트 목록
- `PipelineProgressPanel.jsx` — 에이전트 단계별 상태 표시 (병렬 단계 포함)
- `ArtifactViewer.jsx` — 마크다운 렌더링 (react-markdown + rehype-highlight)
- `usePipeline.js` — SSE 구독 + TanStack Query 연동
- `usePipelineStore.js` — Zustand 전역 상태

#### apps/api (백엔드)
- `server.js` — Fastify 앱, JWT/CORS/Cookie 플러그인
- `routes/projects/index.js` — POST /projects, GET /stream (SSE), GET /download (ZIP)
- `routes/auth/index.js` — 회원가입/로그인/로그아웃
- `workers/pipeline.worker.js` — BullMQ Worker (LangGraph 서버 스트리밍 수신 → Redis Pub/Sub 발행)
- `repositories/project.repository.js` — Prisma CRUD
- `prisma/schema.prisma` — users, projects, agent_artifacts, pipeline_logs 테이블

#### apps/pipeline (AI 파이프라인)
- `orchestrator.py` — LangGraph 비동기 파이프라인 (병렬 Step 3·4 `asyncio.gather`)
- `main.py` — FastAPI 서버, NDJSON 스트리밍 응답
- `agents/base.py` — Claude 모델 라우팅 (Haiku: 단순 단계, Sonnet: 코딩/설계)
- 9개 에이전트 Python 파일 (idea_analyst, planner, designer, architect, frontend_dev, backend_dev, tester, deployer, project_manager)

---

## 4. 기술 결정 사항

| 항목 | 결정 | 근거 |
|------|------|------|
| AI 오케스트레이션 | LangGraph (Python) | 상태 기반 Checkpoint, 병렬 실행 |
| LLM | Claude Sonnet 4.6 / Haiku 4.5 | 역할별 모델 라우팅으로 비용 최적화 |
| 실시간 통신 | SSE | 단방향 스트리밍, WebSocket 불필요 |
| 작업 큐 | BullMQ + Redis | 비동기 파이프라인 실행, 재시도 지원 |
| 백엔드 | Node.js + Fastify | 웹 API 단순성, Python pipeline 서버와 역할 분리 |

---

## 5. 다음 작업 (기술 부채)

- [ ] Rate Limiting 구현 (파이프라인 시작 API)
- [ ] `backend_schema.md` Prisma 전체 코드 보완
- [ ] Human-in-the-loop 단계별 승인 UI
- [ ] LangGraph Time Travel (상태 롤백) 기능
- [ ] MCP 커스텀 서버 연동 (GitHub, Notion)
