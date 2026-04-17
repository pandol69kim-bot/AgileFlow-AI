# 시스템 아키텍처 — AgileFlow

## 전체 구성도

```
┌─────────────────────────────────────────────────────────────────────┐
│                          Client (Browser)                           │
│              Vite + React SPA (Vercel CDN)                          │
└───────────────────────────┬─────────────────────────────────────────┘
                            │ HTTPS REST + SSE
┌───────────────────────────▼─────────────────────────────────────────┐
│                    API Gateway (Fastify / Node.js)                  │
│    /api/v1/projects   /api/v1/artifacts   /api/v1/stream/:id        │
└──────┬──────────────────────────────────────────────┬───────────────┘
       │ BullMQ Job                                   │ PostgreSQL
┌──────▼──────────────┐                    ┌──────────▼──────────────┐
│   Pipeline Worker   │                    │     PostgreSQL 16        │
│  (Python LangGraph) │                    │  projects, artifacts     │
│                     │                    └─────────────────────────┘
│  01_idea_analyst    │
│  02_planner         │◄──── MCP Server (파일, DB, 외부 API)
│  03_designer  ┐     │
│  04_architect ┘병렬 │◄──── Docker SDK (샌드박스 코드 실행)
│  05_frontend  ┐     │
│  06_backend   ┘병렬 │◄──── LangSmith (트레이싱)
│  07_tester          │
│  08_deployer        │
│  09_pm_reporter     │
└─────────────────────┘
```

## 에이전트 간 상태 흐름 (LangGraph State)

```python
class PipelineState(TypedDict):
    project_id: str
    idea_input: str
    # 각 단계 산출물
    idea_analysis: str        # Step 1
    product_requirements: str  # Step 2
    design_system: str        # Step 3a (병렬)
    wireframes: str
    components: str
    tech_stack: str           # Step 3b (병렬)
    architecture: str
    database_schema: str
    project_structure: str
    frontend_code: dict       # Step 4a (병렬)
    backend_code: dict        # Step 4b (병렬)
    test_artifacts: dict      # Step 5
    deploy_artifacts: dict    # Step 6
    final_report: str         # Step 7
    current_step: int
    errors: list[str]
```

## 실시간 스트리밍 (SSE)

- 파이프라인 실행 중 `GET /api/v1/projects/:id/stream` SSE 연결
- 각 에이전트 완료 시 이벤트 전송:
  ```
  data: {"agent": "01_idea_analyst", "status": "completed", "artifact": "idea_analysis_report.md"}
  ```

## 인증 흐름
- JWT Access Token (15분) + Refresh Token (7일)
- HttpOnly Cookie 전송
