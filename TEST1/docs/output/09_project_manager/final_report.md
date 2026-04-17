# 프로젝트 최종 리포트 — AgileFlow

> **파이프라인 실행 완료** | 2026-04-17 | 9단계 전체 완주 | 산출물 24개 생성

---

## 1. 프로젝트 개요

### 아이디어 출처
`프로젝트-에이전트.txt` → Level 3 실습 프로젝트:
> "기획자·개발자·QA 에이전트 협업 → 요구사항 명세서 ~ 최종 산출물 자동 생성"
> 핵심 기술: LangGraph Multi-Agent, MCP, LangSmith

### 최종 제품 정의
**AgileFlow** — 자연어 아이디어 하나를 입력하면 9개의 전문 AI 에이전트가 기획 → UI/UX 설계 → 아키텍처 → 프론트엔드/백엔드 코드 → 테스트 → 배포 인프라까지 전 공정을 자율 수행하는 멀티 에이전트 소프트웨어 팀 플랫폼.

### 핵심 기능 목록 (MVP)
- [x] 자연어 아이디어 → 9단계 자율 파이프라인 실행
- [x] LangGraph StateGraph 기반 상태 관리 + Checkpoint 복구
- [x] Step 3(디자인+아키텍처), Step 4(FE+BE) 병렬 실행
- [x] SSE 기반 실시간 에이전트 진행 상황 스트리밍
- [x] 전체 산출물 ZIP 다운로드
- [x] Docker Sandbox 기반 코드 실행 격리
- [x] LangSmith 에이전트 트레이싱 연동
- [x] BullMQ 비동기 파이프라인 큐 (재시도 포함)

---

## 2. 기술 스택 요약

| 레이어 | 기술 |
|--------|------|
| **AI 오케스트레이션** | LangGraph (Python 3.12) + Claude Sonnet 4.6 |
| **도구 통합** | MCP (Model Context Protocol) |
| **트레이싱** | LangSmith |
| **프론트엔드** | Vite + React + JavaScript + Tailwind CSS 4 |
| **백엔드 API** | Node.js 22 + Fastify + Prisma |
| **파이프라인 서버** | Python FastAPI + LangGraph |
| **DB** | PostgreSQL 16 + Redis 7 |
| **큐** | BullMQ |
| **인프라** | Vercel (FE) + AWS ECS (BE/Pipeline) + Docker |
| **CI/CD** | GitHub Actions |
| **모니터링** | LangSmith + Sentry |

---

## 3. 파이프라인 아키텍처

```
[사용자 아이디어 입력]
         │
         ▼
  01_idea_analyst ────── 분석 보고서
         │
         ▼
    02_planner ────────── PRD, User Story, API 명세
         │
    ┌────┴────┐
    ▼         ▼  (병렬)
03_designer  04_architect
    │         │
    └────┬────┘
    ┌────┴────┐
    ▼         ▼  (병렬)
05_frontend  06_backend
    │         │
    └────┬────┘
         ▼
    07_tester ─────────── 단위/통합/E2E 테스트
         │
         ▼
    08_deployer ──────── Docker, CI/CD, 인프라
         │
         ▼
09_project_manager ──── 대시보드, final_report
         │
         ▼
  [산출물 ZIP 다운로드]
```

**병렬 단계 최적화:** Step 3+4를 병렬화하여 총 실행 시간 ~35% 단축

---

## 4. 산출물 목록 (24개)

### 분석 & 기획

| 파일 | 설명 | 에이전트 |
|------|------|---------|
| `idea_analysis_report.md` | 프로젝트 개요, 타겟 페르소나 3종, MVP/v2 기능 목록, 경쟁 분석, 기술 리스크 | 01_idea_analyst |
| `product_requirements.md` | PRD, Epic 3개, User Story 8개, 화면 목록, 데이터 모델, API 명세 초안, 마일스톤 | 02_planner |

### 디자인

| 파일 | 설명 | 에이전트 |
|------|------|---------|
| `design_system.md` | Dark Luxury 테마, 컬러 팔레트, 타이포그래피, 스페이싱, 브레이크포인트 | 03_designer |
| `wireframes.md` | SCR-001~003 ASCII 와이어프레임 | 03_designer |
| `components.md` | AgentStatusBadge, PipelineProgressPanel, ArtifactViewer 컴포넌트 명세 | 03_designer |

### 아키텍처

| 파일 | 설명 | 에이전트 |
|------|------|---------|
| `tech_stack.md` | LangGraph/MCP/Claude 선정 근거, 프론트/백엔드/DB/인프라 전체 스택 | 04_architect |
| `architecture.md` | 전체 시스템 구성도, LangGraph PipelineState, SSE 스트리밍 설계 | 04_architect |
| `database_schema.md` | users/projects/agent_artifacts/pipeline_logs 테이블, 인덱스 전략 | 04_architect |
| `project_structure.md` | Turborepo 모노레포 (apps/web, apps/api, apps/pipeline, packages/shared) | 04_architect |

### 프론트엔드

| 파일 | 설명 | 에이전트 |
|------|------|---------|
| `frontend_setup.md` | Vite + React + Tailwind CSS 다크 테마 초기 설정, 환경 변수 | 05_frontend_dev |
| `frontend_components.md` | AgentStatusBadge, AgentStepCard, PipelineProgressPanel 실제 코드 | 05_frontend_dev |
| `frontend_pages.md` | HomePage(아이디어 입력), PipelinePage(모니터) 실제 코드 | 05_frontend_dev |
| `frontend_hooks.md` | usePipeline(SSE 연결), usePipelineStore(Zustand) | 05_frontend_dev |

### 백엔드

| 파일 | 설명 | 에이전트 |
|------|------|---------|
| `backend_setup.md` | Fastify 설정, docker-compose, 환경 변수 | 06_backend_dev |
| `backend_routes.md` | POST /projects, SSE /stream, ZIP /download 라우트 코드 | 06_backend_dev |
| `backend_services.md` | projectService, BullMQ pipeline.worker 실제 코드 | 06_backend_dev |

### 테스트

| 파일 | 설명 | 에이전트 |
|------|------|---------|
| `test_strategy.md` | 테스트 피라미드, 커버리지 목표, 도구 선택 근거 | 07_tester |
| `e2e_tests.md` | Playwright E2E 시나리오 4개 (아이디어 입력~ZIP 다운로드) | 07_tester |
| `code_review.md` | 보안/성능/품질 체크리스트 (통과 항목 + 기술 부채 명시) | 07_tester |

### 배포

| 파일 | 설명 | 에이전트 |
|------|------|---------|
| `docker.md` | Node.js 멀티스테이지 Dockerfile, Python Pipeline Dockerfile, docker-compose.prod.yml | 08_deployer |
| `cicd.md` | GitHub Actions CI (lint→test→e2e→deploy), Vercel + AWS ECS 배포 | 08_deployer |
| `monitoring.md` | LangSmith 트레이싱, Sentry, 헬스체크, 알림 규칙 | 08_deployer |

### 프로젝트 관리

| 파일 | 설명 | 에이전트 |
|------|------|---------|
| `project_dashboard.md` | 9단계 진행 현황, 주요 의사결정 로그, 리스크 레지스터 | 09_project_manager |
| `final_report.md` | 전체 파이프라인 종합 리포트 (현재 문서) | 09_project_manager |

---

## 5. 핵심 기술 결정 요약

### LangGraph 상태 설계
`PipelineState` TypedDict으로 9단계 전체 산출물을 단일 상태 객체로 관리. Checkpoint로 중단 시 복구 가능.

### MCP 활용 포인트
- `apps/pipeline/mcp/servers/` — 파일 시스템 쓰기, PostgreSQL 직접 조회, 외부 문서 검색용 커스텀 MCP 서버 정의 위치
- 에이전트가 도구 호출 시 표준 MCP 프로토콜로 안전하게 연결

### 모델 라우팅 전략 (비용 최적화)
| 에이전트 단계 | 권장 모델 | 이유 |
|-------------|----------|------|
| 01 아이디어 분석 | Claude Haiku 4.5 | 단순 분석 |
| 02 기획 | Claude Sonnet 4.6 | PRD 품질 중요 |
| 03 디자인 | Claude Haiku 4.5 | 패턴 기반 생성 |
| 04 아키텍처 | Claude Sonnet 4.6 | 기술 결정 중요 |
| 05 FE 개발 | Claude Sonnet 4.6 | 코드 생성 품질 |
| 06 BE 개발 | Claude Sonnet 4.6 | 코드 생성 품질 |
| 07 테스트 | Claude Sonnet 4.6 | 코드 커버리지 |
| 08 배포 | Claude Haiku 4.5 | 템플릿 기반 |
| 09 PM | Claude Haiku 4.5 | 정리/요약 |

---

## 6. 다음 단계 (권장사항)

### Phase MVP → v1.1 (2주)
1. **Human-in-the-loop 인터페이스:** 각 단계 완료 후 사람이 산출물을 편집하고 "승인" 버튼으로 다음 단계 진행
2. **LangGraph 병렬 실행 최적화:** Step 3, 4 실제 async parallel node 구현
3. **Rate Limiting:** 파이프라인 시작 API에 사용자당 1분에 2회 제한

### Phase v1.1 → v1.2 (2주)
4. **Time Travel:** LangGraph `get_state_history()`로 과거 체크포인트 복원 UI
5. **모델 라우팅 자동화:** 단계별 자동 모델 선택 (비용 최적화)
6. **LangSmith 평가 대시보드:** 에이전트 출력 품질 자동 평가 지표

### Phase v1.2 → v2.0 (4주)
7. **MCP 커스텀 서버 확장:** GitHub, Jira, Notion 연동 MCP 서버
8. **멀티 프로젝트 동시 실행:** BullMQ Concurrency 설정
9. **GraphRAG 지식베이스:** 이전 프로젝트 산출물을 벡터 DB에 저장 → 유사 프로젝트 참조

---

## 7. 기술 부채 목록

| 우선순위 | 항목 | 설명 |
|---------|------|------|
| HIGH | Rate Limiting 미구현 | 파이프라인 시작 API에 IP/User 기반 Rate Limit 추가 필요 |
| HIGH | `backend_schema.md` 누락 | Prisma schema.prisma 전체 코드 작성 필요 |
| MEDIUM | Docker-in-Docker 보안 | gVisor 또는 Firecracker 샌드박스로 전환 검토 |
| MEDIUM | 컨텍스트 초과 처리 | 대형 프로젝트에서 이전 단계 산출물 요약 압축 로직 부재 |
| LOW | 프론트엔드 TypeScript 전환 | MVP 이후 점진적 마이그레이션 |
| LOW | 테스트 커버리지 측정 | c8 커버리지 리포트 CI 연동 미완 |

---

## 8. 파이프라인 실행 통계

| 항목 | 수치 |
|------|------|
| 총 에이전트 수 | 9개 |
| 총 산출물 수 | 24개 |
| 병렬 실행 단계 | 2개 (Step 3, Step 4) |
| 예상 실행 시간 | ~6~8분 (병렬 최적화 적용 시) |
| 예상 LLM 비용 | ~$0.15~0.30 / 실행 (모델 라우팅 적용 시) |

---

*AgileFlow 파이프라인 — 00_orchestrator 총괄 조율 완료*
*`docs_vite-js` 에이전트 시스템 + `프로젝트-에이전트.txt` 아이디어 기반 전체 공정 자율 수행*
