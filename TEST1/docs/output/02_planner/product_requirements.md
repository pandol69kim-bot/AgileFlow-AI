# 제품 요구사항 정의서 (PRD) — AgileFlow

## 1. 제품 비전

- **목표:** 자연어 아이디어 하나를 입력하면 9개의 전문 AI 에이전트가 기획→설계→개발→테스트→배포 전 공정을 자율 수행
- **KPI:**
  - 파이프라인 완주율 90% 이상
  - 단계별 산출물 품질 점수 4.0/5.0 이상 (LangSmith 평가 기준)
  - 에이전트 루프 무한 반복 발생 0건

---

## 2. 기능 요구사항

### Epic 1: 파이프라인 실행 엔진

| ID | User Story | 우선순위 | Acceptance Criteria |
|----|-----------|---------|-------------------|
| US-001 | 사용자로서 자연어 아이디어를 입력하면 전체 파이프라인이 자동 시작되길 원한다 | Must | - 입력 후 30초 내 01_idea_analyst 실행 시작<br>- 진행률 실시간 표시 |
| US-002 | 사용자로서 각 에이전트 단계의 산출물을 실시간으로 확인하고 싶다 | Must | - 단계 완료 시 산출물 즉시 UI에 표시<br>- 마크다운 렌더링 지원 |
| US-003 | 사용자로서 특정 단계에서 AI 출력을 수정하고 다음 단계로 진행할 수 있길 원한다 | Should | - 각 단계 완료 후 편집 가능<br>- 수정 후 '다음 단계' 버튼으로 계속 진행 |

### Epic 2: 에이전트 관리

| ID | User Story | 우선순위 | Acceptance Criteria |
|----|-----------|---------|-------------------|
| US-004 | 관리자로서 각 에이전트의 LLM 모델을 개별 설정하고 싶다 | Should | - 에이전트별 모델 선택 드롭다운<br>- Haiku/Sonnet/Opus 지원 |
| US-005 | 사용자로서 에이전트 실패 시 자동으로 재시도되길 원한다 | Must | - 실패 시 최대 2회 재시도<br>- 재시도 실패 시 사용자에게 알림 |
| US-006 | 사용자로서 파이프라인을 일시 중지하고 나중에 재개할 수 있길 원한다 | Should | - LangGraph Checkpoint 기반 상태 저장<br>- 세션 복원 기능 |

### Epic 3: 산출물 관리

| ID | User Story | 우선순위 | Acceptance Criteria |
|----|-----------|---------|-------------------|
| US-007 | 사용자로서 전체 산출물을 ZIP으로 다운로드하고 싶다 | Must | - 파이프라인 완료 후 ZIP 다운로드 버튼<br>- output/ 디렉토리 구조 그대로 압축 |
| US-008 | 사용자로서 이전 프로젝트 실행 내역을 조회하고 싶다 | Should | - 프로젝트 목록 페이지<br>- 각 실행 기록과 산출물 접근 가능 |

---

## 3. 비기능 요구사항

- **성능:** 파이프라인 1회 실행 < 10분 (병렬 단계 최적화 포함)
- **보안:** 생성된 코드 실행은 Docker Sandbox 격리 환경에서만 허용
- **가용성:** API 서버 99% 업타임
- **브라우저:** Chrome, Safari, Firefox 최신 2버전

---

## 4. 화면 목록 & 흐름

| 화면 ID | 화면명 | 설명 | 연결 화면 |
|---------|--------|------|----------|
| SCR-001 | 홈/아이디어 입력 | 아이디어 텍스트 입력 + 실행 버튼 | SCR-002 |
| SCR-002 | 파이프라인 모니터 | 9단계 진행률 + 각 단계 산출물 실시간 표시 | SCR-003 |
| SCR-003 | 산출물 뷰어 | 각 에이전트 산출물 마크다운 렌더링 | SCR-002 |
| SCR-004 | 프로젝트 히스토리 | 이전 실행 목록 및 재열람 | SCR-002, SCR-003 |
| SCR-005 | 에이전트 설정 | 모델 선택, 파라미터 조정 | SCR-001 |

---

## 5. 데이터 모델

### Entity: Project (프로젝트 실행 단위)

| 필드명 | 타입 | 필수 | 설명 |
|--------|------|------|------|
| id | UUID | Y | PK |
| title | VARCHAR(200) | Y | 프로젝트명 |
| idea_input | TEXT | Y | 사용자 입력 아이디어 |
| status | ENUM | Y | pending/running/completed/failed |
| current_step | INT | Y | 현재 실행 중인 에이전트 번호 (1~9) |
| created_at | TIMESTAMPTZ | Y | 생성일 |
| completed_at | TIMESTAMPTZ | N | 완료일 |

### Entity: AgentArtifact (에이전트 산출물)

| 필드명 | 타입 | 필수 | 설명 |
|--------|------|------|------|
| id | UUID | Y | PK |
| project_id | UUID | Y | FK → Project |
| agent_name | VARCHAR(50) | Y | 에이전트 이름 (01_idea_analyst 등) |
| filename | VARCHAR(100) | Y | 산출물 파일명 |
| content | TEXT | Y | 마크다운 내용 |
| status | ENUM | Y | pending/completed/failed |
| created_at | TIMESTAMPTZ | Y | 생성일 |

---

## 6. API 명세 초안

| Method | Endpoint | 설명 | 인증 |
|--------|----------|------|------|
| POST | /api/v1/projects | 새 파이프라인 실행 시작 | Required |
| GET | /api/v1/projects | 프로젝트 목록 조회 | Required |
| GET | /api/v1/projects/:id | 프로젝트 상세 + 진행 상태 | Required |
| GET | /api/v1/projects/:id/artifacts | 전체 산출물 목록 | Required |
| GET | /api/v1/projects/:id/artifacts/:filename | 특정 산출물 내용 | Required |
| PUT | /api/v1/projects/:id/artifacts/:filename | 산출물 수정 (Human-in-the-loop) | Required |
| POST | /api/v1/projects/:id/resume | 일시 중지된 파이프라인 재개 | Required |
| GET | /api/v1/projects/:id/download | 전체 산출물 ZIP 다운로드 | Required |

---

## 7. 마일스톤

| Phase | 기간 | 목표 | 주요 기능 |
|-------|------|------|----------|
| MVP | 4주 | 파이프라인 순차 실행 동작 | 01~09 에이전트 연결, 산출물 저장, 기본 UI |
| v1.1 | 2주 | 병렬 실행 + Human-in-the-loop | Step 3·4 병렬화, 단계별 편집 기능 |
| v1.2 | 2주 | LangSmith 트레이싱 + 재시도 | 에러 처리, 대시보드 고도화 |
| v2.0 | 4주 | MCP 커스텀 서버 + Time Travel | 외부 도구 연동, 상태 롤백 |
