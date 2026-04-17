# PRD: Gemini AI 에이전트 마스터 커리큘럼 플랫폼

## 1. 개요 (Overview)

### 1.1 제품 목적
단순 챗봇 수준을 넘어, 자율적으로 과업을 수행하고 외부 도구와 협업하는 **에이전트형 AI(Agentic AI) 시스템**을 구축할 수 있는 역량을 제공하는 학습 및 실습 플랫폼.

### 1.2 핵심 목표
- 상태(State) 기반 동적 AI 워크플로우 설계 역량 습득
- GraphRAG, LangGraph, Multi-Agent, MCP 4단계 심화 학습 완주
- 최종 산출물: 기획·개발·테스트가 자율 수행되는 소프트웨어 팀 에이전트 구축

### 1.3 타겟 사용자
- AI/ML 개발자 (중급 이상)
- LLM 응용 시스템 아키텍트
- 자율화 파이프라인에 관심 있는 백엔드 엔지니어

---

## 2. 문제 정의 (Problem Statement)

| 현재 상태 | 목표 상태 |
|---|---|
| 단순 프롬프트 → 응답 구조 | 상태 기반 루프와 도구 통합이 가능한 에이전트 |
| 벡터 검색 의존 RAG | 관계 추론이 가능한 GraphRAG |
| 단일 에이전트 처리 | 전문화된 멀티 에이전트 협업 |
| 수동 도구 연결 | MCP 표준 프로토콜 기반 자동 도구 통합 |

---

## 3. 기능 요구사항 (Functional Requirements)

### Phase 1: GraphRAG — 지식 그래프 기반 RAG

**목표:** 단순 벡터 검색 한계 극복, 데이터 관계 기반 복잡 추론 구현

| ID | 기능 | 우선순위 |
|---|---|---|
| F1-1 | Query Transformation (Multi-query, Decomposition) | Must |
| F1-2 | Re-ranking 파이프라인 구현 | Must |
| F1-3 | Self-RAG 자가 피드백 루프 | Should |
| F1-4 | 비정형 데이터 → Knowledge Graph 변환 (Entity/Relation 추출) | Must |
| F1-5 | 커뮤니티 요약 기술로 전역 질문(Global Query) 처리 | Should |
| F1-6 | Neo4j / FalkorDB + 벡터 DB 통합 | Must |

### Phase 2: LangGraph 기반 Agentic Workflow

**목표:** 루프와 상태 관리가 가능한 에이전트 제어 흐름 설계

| ID | 기능 | 우선순위 |
|---|---|---|
| F2-1 | Nodes / Edges / State 스키마 정의 및 조건부 라우팅 | Must |
| F2-2 | Checkpoint 기반 Persistence (작업 상태 저장/복구) | Must |
| F2-3 | Human-in-the-loop 중단점(Breakpoints) 설계 | Must |
| F2-4 | Time Travel 디버깅 (과거 상태 복원) | Should |
| F2-5 | Plan-and-Execute 추론 패턴 구현 | Must |
| F2-6 | ReAct(Reasoning + Acting) 프레임워크 최적화 | Must |

### Phase 3: 멀티 에이전트 협업 및 오케스트레이션

**목표:** 전문화된 에이전트 조율로 복잡 과업 해결

| ID | 기능 | 우선순위 |
|---|---|---|
| F3-1 | Hierarchical 패턴: Supervisor 에이전트 → 하위 작업자 배분 | Must |
| F3-2 | Sequential 패턴: 체인형 에이전트 파이프라인 | Must |
| F3-3 | Joint Collaboration: 공유 State 기반 자유 협업 | Should |
| F3-4 | 에이전트 간 표준 데이터 전달 스키마 설계 | Must |
| F3-5 | 종료 조건(Termination) 및 루프 방지 로직 | Must |

### Phase 4: MCP 및 외부 도구 통합

**목표:** 표준 프로토콜 기반 에이전트 ↔ 외부 시스템 안전 연결

| ID | 기능 | 우선순위 |
|---|---|---|
| F4-1 | MCP 서버 아키텍처 이해 및 클라이언트-서버 구조 구현 | Must |
| F4-2 | Python/TypeScript 커스텀 MCP Server 개발 | Must |
| F4-3 | 도구 선택 최적화 (프롬프트 엔지니어링 + 에러 핸들링) | Must |
| F4-4 | Docker 기반 샌드박스 코드 실행 환경 구성 | Must |
| F4-5 | Claude Desktop / Cursor IDE MCP 통합 | Should |

---

## 4. 실습 프로젝트 로드맵

### Level 1: GraphRAG 지식 탐색기
- **설명:** 대규모 PDF → 지식 그래프 변환 → 관계 기반 복잡 질문 답변 시스템
- **핵심 기술:** LangChain, Neo4j, FalkorDB
- **완료 기준:** 전역 질문(Global Query)에 대해 관계 추론 기반 답변 생성

### Level 2: MCP 기반 자율 코딩 비서
- **설명:** 파일 수정 → 테스트 실행 → 에러 수정 루프를 자율 반복하는 코딩 에이전트
- **핵심 기술:** LangGraph, MCP, Docker Sandbox
- **완료 기준:** 요구사항 입력 시 코드 작성~테스트 통과까지 자율 완료

### Level 3: 에이전트 소프트웨어 팀 (Agile Team)
- **설명:** 기획자·개발자·QA 에이전트 협업 → 요구사항 명세서 ~ 최종 산출물 자동 생성
- **핵심 기술:** LangGraph Multi-Agent, MCP, LangSmith
- **완료 기준:** 자연어 요구사항 → 테스트 통과 코드 + 문서 자동 생성

---

## 5. 비기능 요구사항 (Non-Functional Requirements)

| 항목 | 요구사항 |
|---|---|
| 신뢰성 | 에이전트 실패 시 Checkpoint로 자동 복구 |
| 보안 | 코드 실행은 반드시 Docker Sandbox 격리 환경에서만 수행 |
| 관찰 가능성 | LangSmith 연동으로 전체 에이전트 추론 과정 트레이싱 |
| 확장성 | 새로운 에이전트/도구 추가 시 기존 파이프라인 수정 최소화 |
| 테스트 커버리지 | 각 Phase 핵심 로직 단위 테스트 80% 이상 |

---

## 6. 기술 스택

| 분류 | 기술 |
|---|---|
| 핵심 프레임워크 | LangChain, LangGraph, MCP (Model Context Protocol) |
| 데이터/인프라 | Neo4j, FalkorDB, Docker |
| 디버깅/트레이싱 | LangSmith |
| 언어 | Python, TypeScript |
| 참고 논문 | Self-RAG, GraphRAG (Microsoft), Reflexion |

---

## 7. 성공 지표 (Success Metrics)

| 지표 | 목표값 |
|---|---|
| Phase별 실습 완료율 | 4 Phase 전체 완주 |
| Level 3 자동화율 | 요구사항 → 산출물 인간 개입 없이 80% 완성 |
| 에이전트 루프 안정성 | 무한 루프 발생 0건 (종료 조건 설계 기준) |
| 테스트 커버리지 | 핵심 모듈 80% 이상 |

---

## 8. 범위 외 (Out of Scope)

- LLM 모델 자체 파인튜닝
- 프로덕션 서빙 인프라 구축 (CI/CD, Kubernetes 등)
- 비개발자용 No-Code UI 제공
