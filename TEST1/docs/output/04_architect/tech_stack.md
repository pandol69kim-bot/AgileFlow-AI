# 기술 스택 결정서 — AgileFlow

## 오케스트레이션 (AI 파이프라인 엔진)

| 항목 | 선택 | 대안 | 선정 근거 |
|------|------|------|----------|
| 에이전트 프레임워크 | LangGraph (Python) | AutoGen, CrewAI | 상태 기반 워크플로우, LangChain 생태계, Checkpoint |
| LLM 연결 | Anthropic SDK (Claude) | OpenAI | Claude Sonnet 4.6 최고 코딩 성능 |
| 도구 통합 | MCP (Model Context Protocol) | 커스텀 Tool | 표준화된 도구 연결, IDE 연동 |
| 트레이싱 | LangSmith | Langfuse, MLflow | LangGraph 네이티브 지원 |
| 코드 실행 격리 | Docker SDK (Python) | E2B, Modal | 온프레미스 실행, 비용 절감 |

## 프론트엔드

| 항목 | 선택 | 대안 | 선정 근거 |
|------|------|------|----------|
| Framework | Vite + React | Next.js | SPA 충분, 빠른 DX |
| Language | JavaScript (ESM) | TypeScript | MVP 속도 우선 |
| Styling | Tailwind CSS 4 | styled-components | 다크 테마 빠른 구현 |
| State | Zustand | Redux | 경량, 간결 |
| Realtime | Server-Sent Events | WebSocket | 단방향 스트리밍, 구현 단순 |
| Markdown | react-markdown + rehype-highlight | MDX | 산출물 렌더링 |

## 백엔드

| 항목 | 선택 | 대안 | 선정 근거 |
|------|------|------|----------|
| Runtime | Node.js 22 | Python FastAPI | 프론트와 언어 통일, JSON API 단순성 |
| Framework | Fastify | Express | 성능, Schema 기반 검증 |
| AI 파이프라인 실행 | Python 서브프로세스 / HTTP | 직접 통합 | LangGraph는 Python 전용 → 별도 Python 서버 |
| ORM | Prisma | Drizzle | DX, 타입 안전 |
| Queue | BullMQ (Redis) | - | 파이프라인 비동기 실행 |

## 데이터베이스
| 항목 | 선택 | 용도 |
|------|------|------|
| Primary DB | PostgreSQL 16 | 프로젝트·산출물 저장 |
| Cache/Queue | Redis 7 | BullMQ, 세션 |
| File Storage | S3 호환 (MinIO) | ZIP 산출물 저장 |

## 인프라
| 항목 | 선택 |
|------|------|
| Cloud | Vercel (Frontend) + AWS ECS (Backend + LangGraph) |
| Container | Docker + Docker Compose |
| CI/CD | GitHub Actions |
| Monitoring | LangSmith (AI) + Sentry (앱) |
