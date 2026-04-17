# 프로젝트 디렉토리 구조 — AgileFlow

```
agileflow/
├── apps/
│   ├── web/                          # Vite + React 프론트엔드
│   │   ├── index.html
│   │   ├── vite.config.js
│   │   └── src/
│   │       ├── main.jsx
│   │       ├── app/
│   │       │   ├── router.jsx        # React Router
│   │       │   └── layout.jsx
│   │       ├── pages/
│   │       │   ├── HomePage.jsx      # SCR-001
│   │       │   ├── PipelinePage.jsx  # SCR-002
│   │       │   ├── ArtifactPage.jsx  # SCR-003
│   │       │   └── ProjectsPage.jsx  # SCR-004
│   │       ├── components/
│   │       │   ├── ui/               # Button, Badge, ProgressBar
│   │       │   ├── features/
│   │       │   │   ├── pipeline/     # PipelineProgressPanel
│   │       │   │   └── artifacts/    # ArtifactViewer, ArtifactCard
│   │       │   └── layouts/          # Header, PageLayout
│   │       ├── hooks/
│   │       │   ├── usePipeline.js    # 파이프라인 상태 + SSE 연결
│   │       │   └── useArtifacts.js   # 산출물 조회
│   │       ├── stores/
│   │       │   └── usePipelineStore.js  # Zustand
│   │       └── lib/
│   │           └── api.js            # axios 인스턴스
│   │
│   ├── api/                          # Fastify 백엔드 API
│   │   ├── src/
│   │   │   ├── routes/
│   │   │   │   ├── projects/
│   │   │   │   └── artifacts/
│   │   │   ├── services/
│   │   │   │   ├── project.service.js
│   │   │   │   └── pipeline.service.js
│   │   │   ├── repositories/
│   │   │   ├── middlewares/
│   │   │   └── workers/
│   │   │       └── pipeline.worker.js  # BullMQ Worker
│   │   └── prisma/
│   │       ├── schema.prisma
│   │       └── migrations/
│   │
│   └── pipeline/                     # LangGraph Python 엔진
│       ├── main.py                   # FastAPI HTTP 서버
│       ├── orchestrator.py           # LangGraph StateGraph 정의
│       ├── agents/
│       │   ├── idea_analyst.py
│       │   ├── planner.py
│       │   ├── designer.py
│       │   ├── architect.py
│       │   ├── frontend_dev.py
│       │   ├── backend_dev.py
│       │   ├── tester.py
│       │   ├── deployer.py
│       │   └── project_manager.py
│       ├── mcp/
│       │   └── servers/              # 커스텀 MCP 서버
│       └── sandbox/
│           └── docker_runner.py      # Docker 코드 실행
│
├── packages/
│   └── shared/                       # 공유 타입/상수
│
├── docker-compose.yml
├── turbo.json                        # Turborepo
└── package.json
```
