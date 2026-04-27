# 수정작업 로그

---

## 2026-04-17

### 1. Prisma DATABASE_URL 환경변수 오류 수정

**오류 내용**
```
Error: P1012 — Environment variable not found: DATABASE_URL.
  --> prisma\schema.prisma:7
```

**원인**
`npx prisma migrate dev` 실행 위치가 `project/apps/api/` 이지만,
`.env` 파일은 `project/` 루트에만 존재해 Prisma가 `DATABASE_URL`을 찾지 못함.

**수정 내용**
- `project/apps/api/.env` 파일 신규 생성
- 루트 `.env`의 환경변수 복사 (DATABASE_URL, REDIS_URL, JWT_SECRET 등)

**수정 파일**
| 파일 | 작업 |
|------|------|
| `project/apps/api/.env` | 신규 생성 |

**확인 방법**
```bash
cd project/apps/api
npx prisma migrate dev
```

---

### 2. 401 Unauthorized — 로그인/인증 흐름 누락 수정

**오류 내용**
```
POST http://localhost:5173/api/v1/projects 401 (Unauthorized)
HomePage.jsx:17
```

**원인**
- 라우터에 로그인 페이지(`/login`)가 없어 인증 없이 보호된 API 호출
- JWT 쿠키가 없는 상태로 `POST /projects` 요청 → API가 401 반환
- `api.js` 인터셉터에 401 처리 로직 부재

**수정 내용**
1. `useAuth.jsx` — `AuthContext` + `AuthProvider` 생성 (login/register/logout/me)
2. `LoginPage.jsx` — 로그인·회원가입 폼 (탭 전환)
3. `ProtectedRoute.jsx` — 비인증 시 `/login` 리다이렉트
4. `router.jsx` — `/login` 추가, 기존 경로에 `ProtectedRoute` 래핑
5. `main.jsx` — `AuthProvider` 전역 등록
6. `api.js` — 401 인터셉터에 `/login` 리다이렉트 추가
7. `layout.jsx` — 헤더에 유저명 + 로그아웃 버튼 추가
8. `auth/index.js` (API) — `GET /auth/me` 엔드포인트 추가

**수정 파일**
| 파일 | 작업 |
|------|------|
| `apps/web/src/hooks/useAuth.jsx` | 신규 생성 |
| `apps/web/src/pages/LoginPage.jsx` | 신규 생성 |
| `apps/web/src/components/ui/ProtectedRoute.jsx` | 신규 생성 |
| `apps/web/src/app/router.jsx` | 수정 |
| `apps/web/src/main.jsx` | 수정 |
| `apps/web/src/lib/api.js` | 수정 |
| `apps/web/src/app/layout.jsx` | 수정 |
| `apps/api/src/routes/auth/index.js` | 수정 (`GET /me` 추가) |

**확인 방법**
```bash
# 1. 브라우저에서 http://localhost:5173 접속 → /login 리다이렉트 확인
# 2. 회원가입 후 홈 이동 → 파이프라인 시작 정상 동작 확인
# 3. 새로고침 후 로그인 유지 확인 (JWT 쿠키)
```

---

### 3. Vite JSX 파싱 오류 — useAuth.js → useAuth.jsx 확장자 수정

**오류 내용**
```
[plugin:vite:import-analysis] Failed to parse source for import analysis
because the content contains invalid JS syntax.
If you are using JSX, make sure to name the file with the .jsx or .tsx extension.
D:/AI-DATA/TEST1/project/apps/web/src/hooks/useAuth.js:40:28
```

**원인**
`useAuth.js`에 JSX(`<AuthContext.Provider>`) 문법이 포함되어 있으나 파일 확장자가 `.js`여서 Vite가 JSX로 처리하지 못함.

**수정 내용**
- `useAuth.js` 삭제 후 `useAuth.jsx`로 재생성
- 4개 파일의 import 경로 `.js` → `.jsx` 변경

**수정 파일**
| 파일 | 작업 |
|------|------|
| `apps/web/src/hooks/useAuth.js` | 삭제 |
| `apps/web/src/hooks/useAuth.jsx` | 신규 생성 |
| `apps/web/src/pages/LoginPage.jsx` | import 경로 수정 |
| `apps/web/src/main.jsx` | import 경로 수정 |
| `apps/web/src/components/ui/ProtectedRoute.jsx` | import 경로 수정 |
| `apps/web/src/app/layout.jsx` | import 경로 수정 |

**확인 방법**
```bash
cd project/apps/web && npm run dev
```

---

### 4. 정상작동 확인 (파일 상태 검증)

**확인 일시**: 2026-04-17

**검증 결과**
| 항목 | 상태 |
|------|------|
| `useAuth.js` (문제 파일) 삭제 | ✅ 확인 |
| `useAuth.jsx` 존재 | ✅ 확인 |
| `LoginPage.jsx` → `useAuth.jsx` import | ✅ 확인 |
| `main.jsx` → `useAuth.jsx` import | ✅ 확인 |
| `ProtectedRoute.jsx` → `useAuth.jsx` import | ✅ 확인 |
| `layout.jsx` → `useAuth.jsx` import | ✅ 확인 |

**비고**
`errro_msg.txt`의 오류는 이전 세션 오류가 남아있는 것이며, 실제 파일은 정상 수정 완료 상태.

---

### 5. 파이프라인 01~02 점검 및 수정

**점검 결과**: 로직 정상, 잠재적 문제 3건 수정

**수정 내용**
1. `base.py` — `os.getenv` → `os.environ` (API 키 미설정 시 시작 즉시 오류 발생)
2. `orchestrator.py` — 미사용 `from langgraph.graph import StateGraph, END` 제거
3. `main.py` — `idea_input: str | None = None` → `idea_input: str` (빈 문자열 허용 차단)

**수정 파일**
| 파일 | 작업 |
|------|------|
| `apps/pipeline/agents/base.py` | `getenv` → `environ` 수정 |
| `apps/pipeline/orchestrator.py` | 미사용 import 제거 |
| `apps/pipeline/main.py` | `idea_input` 필수값 처리 |

**확인 방법**
```bash
cd project/apps/pipeline
uvicorn main:app --reload --port 8000
curl http://localhost:8000/health  # {"status":"ok"} 확인
```

---

### 6. uvicorn 명령어 인식 오류 (PowerShell)

**오류 내용**
```
uvicorn : 'uvicorn' 용어가 cmdlet, 함수, 스크립트 파일 또는 실행할 수 있는
프로그램 이름으로 인식되지 않습니다.
```

**원인**
Python 가상환경 미생성 및 미활성화 상태에서 `uvicorn` 직접 실행

**해결 순서**
```powershell
cd D:\AI-DATA\TEST1\project\apps\pipeline

# 1. 가상환경 생성 (최초 1회)
python -m venv venv

# 2. 가상환경 활성화 (터미널 열 때마다)
.\venv\Scripts\Activate.ps1

# 3. 패키지 설치 (최초 1회)
python -m pip install --upgrade pip
pip install -r requirements.txt

# 4. 서버 실행
uvicorn main:app --reload --port 8000
```

**비고**
- `Activate.ps1 cannot be loaded` 오류 시: PowerShell 관리자 권한으로 `Set-ExecutionPolicy RemoteSigned` 실행 후 재시도
- 터미널 재시작 시 반드시 Step 2(활성화)부터 재실행 필요

---

### 7. 파이프라인 단계별 테스트 구현

**구현 내용**
단계별 단독 실행 스크립트 및 HTTP 엔드포인트 추가

**생성/수정 파일**
| 파일 | 작업 |
|------|------|
| `apps/pipeline/tests/state_io.py` | state JSON 저장/로드 유틸 |
| `apps/pipeline/tests/test_step.py` | CLI 단계별 실행 스크립트 |
| `apps/pipeline/main.py` | `/run/until/{step}`, `/run/step/{step}` 엔드포인트 추가 |
| `apps/pipeline/orchestrator.py` | `EMPTY_STATE` 상수 추출, `run_pipeline` 중복 제거 |

**CLI 사용법**
```powershell
cd D:\AI-DATA\TEST1\project\apps\pipeline
.\venv\Scripts\Activate.ps1

# 1단계만
python tests/test_step.py --step 1 --idea "반려동물 건강관리 앱"

# 2단계 (1단계 결과 자동 로드)
python tests/test_step.py --step 2

# 전체 연속
python tests/test_step.py --all --idea "반려동물 건강관리 앱"
```

**HTTP 사용법**
```powershell
# 1단계까지 실행
curl -X POST http://localhost:8000/run/until/1 `
  -H "Content-Type: application/json" `
  -d '{"project_id":"test-001","idea_input":"반려동물 건강관리 앱"}'
```

---

### 8. 웹 서비스 상태 시각화 페이지 추가 + 폴링 버그 수정

**문제**
- 같은 API 요청(`GET /projects/{id}`, `/artifacts`)이 무한 반복 — 파이프라인 미실행 시 폴링만 지속
- 서비스 상태(API/DB/Redis/Pipeline)를 웹에서 확인할 방법 없음
- artifacts 폴링이 완료 후에도 멈추지 않는 버그

**수정 내용**
1. `routes/status/index.js` — API/DB/Redis/Pipeline 헬스 체크 엔드포인트 추가
2. `StatusPage.jsx` — 서비스 상태 시각화 페이지 (10초 자동 갱신 + 수동 새로고침)
3. `router.jsx` + `layout.jsx` — `/status` 라우트 및 헤더 링크 추가
4. `usePipeline.js` — artifacts 폴링 완료 후 중단 버그 수정

**수정 파일**
| 파일 | 작업 |
|------|------|
| `apps/api/src/routes/status/index.js` | 신규 생성 |
| `apps/api/src/server.js` | status 라우트 등록 |
| `apps/web/src/pages/StatusPage.jsx` | 신규 생성 |
| `apps/web/src/app/router.jsx` | `/status` 라우트 추가 |
| `apps/web/src/app/layout.jsx` | 헤더 Status 링크 추가 |
| `apps/web/src/hooks/usePipeline.js` | artifacts 폴링 조건 수정 |

**확인 방법**
```
브라우저 → http://localhost:5173/status
- API 서버: 정상 (초록)
- PostgreSQL: 정상 (초록)
- Redis: 정상 (초록)
- Pipeline 서버: 오류 (빨강) + 시작 명령어 안내 표시
```

---

### 9. `/api/v1/status` 500 오류 수정

**오류 내용**
```
GET http://localhost:5173/api/v1/status 500 (Internal Server Error)
StatusPage.jsx:14
```

**원인**
`redis.ping()`이 `maxRetriesPerRequest: null` 설정으로 Redis 미실행 시 무한 대기
→ Fastify 요청 타임아웃 → errorHandler가 500 반환

**수정 내용**
`withTimeout(promise, 3000)` 래퍼 추가 — DB/Redis/Pipeline 모두 3초 초과 시 즉시 `ok: false` 반환

**수정 파일**
| 파일 | 작업 |
|------|------|
| `apps/api/src/routes/status/index.js` | `withTimeout` 래퍼 추가 |

---

## 2026-04-20

### 10. ANTHROPIC_API_KEY 인증 오류 + LangSmith 403 오류

**오류 내용**
```
anthropic.AuthenticationError: Error code: 401 - invalid x-api-key
LangSmithError: 403 Forbidden - Failed to POST https://api.smith.langchain.com/runs/batch
```

**원인**
1. `apps/pipeline/.env`의 `ANTHROPIC_API_KEY` 만료/오류
2. `LANGCHAIN_API_KEY=ls__...` (플레이스홀더) 상태에서 `LANGCHAIN_TRACING_V2=true` 활성화

**수정 내용**
- `LANGCHAIN_TRACING_V2=false` 로 변경
- `LANGCHAIN_API_KEY` 빈값 처리

**미해결 (사용자 조치 필요)**
`apps/pipeline/.env`의 `ANTHROPIC_API_KEY`를 유효한 키로 교체 필요
→ 발급: console.anthropic.com → API Keys

**수정 파일**
| 파일 | 작업 |
|------|------|
| `apps/pipeline/.env` | `LANGCHAIN_TRACING_V2=false`, `LANGCHAIN_API_KEY` 빈값 |

---

### 11. 파이프라인 실행 불가 버그 진단

**원인**
프로젝트 "드론 시뮬레이션 앱2" — 상태: `pending`, `currentStep: 0` → 파이프라인이 한 번도 실행되지 않은 상태

**발견된 버그**

**Bug #1 (CRITICAL) — Worker가 시작되지 않음**
`server.js`에 `startPipelineWorker()` 호출 코드 없음.

**Bug #2 (HIGH) — `idea_input` 누락**
`pipeline.worker.js`에서 Pipeline `/run` 호출 시 `project_id`만 전송.

**Bug #3 (MEDIUM) — Pipeline 서버 구버전 실행 중**

**수정 파일**
| 파일 | 작업 |
|------|------|
| `apps/api/src/server.js` | `startPipelineWorker()` 호출 추가 |
| `apps/api/src/workers/pipeline.worker.js` | `idea_input` 전달 수정 |

---

### 12. AgentArtifact @@unique 누락 → saveArtifact 500 오류 수정

**오류 내용**
```
Failed to load resource: the server responded with a status of 500
```

**원인**
`prisma/schema.prisma`의 `AgentArtifact` 모델에 `@@unique([projectId, agentName, filename])` 제약이 없어 `upsert` 실패.

**수정 내용**
`AgentArtifact` 모델에 `@@unique` 추가 후 `prisma db push` 적용

**수정 파일**
| 파일 | 작업 |
|------|------|
| `apps/api/prisma/schema.prisma` | `@@unique([projectId, agentName, filename])` 추가 |

---

### 13. 파이프라인 Worker 미시작 + idea_input 누락 수정

**오류 내용**
프로젝트 생성 후 파이프라인이 영원히 `pending` 상태 유지

**원인**
1. `server.js`에 `startPipelineWorker()` 호출 없음
2. `pipeline.worker.js`에서 `idea_input` 누락
3. `project.service.js`에서 큐 등록 시 `ideaInput` 미포함

**수정 파일**
| 파일 | 수정 내용 |
|------|----------|
| `apps/api/src/server.js` | `startPipelineWorker()` import 및 호출 추가 |
| `apps/api/src/services/project.service.js` | 큐 job data에 `ideaInput` 추가 |
| `apps/api/src/workers/pipeline.worker.js` | `idea_input: ideaInput` Pipeline 서버 전달 추가 |

---

### 14. 파이프라인 전체 대기(⏳) 상태 — 복합 버그 수정

**프롬프트**
```
파이프라인 전체 대기상태로 진행안되고 있는데 다시 확인해서 진행되게 해줘
```

**오류 내용**
```
- BullMQ job 상태: failed (reason: aborted)
- anthropic.RateLimitError: 429 — rate limit of 8,000~10,000 output tokens/minute 초과
- designer 결과가 빈 문자열로 저장됨
```

**원인**
| # | 원인 | 설명 |
|---|------|------|
| 1 | **Rate Limit 초과** | Step 4에서 frontend_dev(4회) + backend_dev(4회) Sonnet 병렬 호출 → 분당 토큰 한도 초과 |
| 2 | **병렬 상태 덮어쓰기 버그** | 병렬 에이전트가 `{**state, ...}` 반환 시 서로의 결과를 덮어씀 |
| 3 | **Docker 컨테이너 다운** | Redis/PostgreSQL Docker 컨테이너 미실행 → ECONNREFUSED |

**수정 내용**
1. `base.py` — `invoke_with_retry()` 추가 (429 발생 시 최대 3회, 60초 간격 재시도)
2. `orchestrator.py` — Step 3 병렬 머지 버그 수정, Step 4 병렬→순차 변경
3. `frontend_dev.py`, `backend_dev.py` — `get_smart_llm` → `get_fast_llm` (Haiku) 변경

**수정 파일**
| 파일 | 작업 |
|------|------|
| `apps/pipeline/agents/base.py` | `invoke_with_retry()` 추가 |
| `apps/pipeline/agents/idea_analyst.py` | `invoke_with_retry` 적용 |
| `apps/pipeline/agents/planner.py` | `invoke_with_retry` 적용 |
| `apps/pipeline/agents/designer.py` | `invoke_with_retry` 적용 |
| `apps/pipeline/agents/architect.py` | `invoke_with_retry` 적용 |
| `apps/pipeline/agents/frontend_dev.py` | Haiku 변경 + `invoke_with_retry` 적용 |
| `apps/pipeline/agents/backend_dev.py` | Haiku 변경 + `invoke_with_retry` 적용 |
| `apps/pipeline/orchestrator.py` | 병렬 머지 버그 수정, Step 4 순차 실행 |
| `apps/pipeline/tests/test_step.py` | Step 3·4 순차 실행 변경 |

---

### 15. 파이프라인 미진행 + 상태 정상표시 + 아웃풋 미표시 복합 수정

**원인**
| # | 원인 | 설명 |
|---|------|------|
| 1 | **Python 예외 묻힘** | `event_stream()`에 try-except 없음 → 스택트레이스가 plain text로 전송 → JSON 파싱 실패 |
| 2 | **워커 silent fail** | non-JSON 라인 `catch {}`로 무시 → 아티팩트 없어도 `completed` 처리 |
| 3 | **SSE 재접속 시 상태 공백** | 페이지 재로드 시 Redis Pub/Sub 이벤트 없음 → 에이전트 상태 전부 pending |

**수정 파일**
| 파일 | 작업 |
|------|------|
| `apps/pipeline/main.py` | `event_stream()` 예외 처리 추가 |
| `apps/api/src/workers/pipeline.worker.js` | non-JSON 로깅, failed 감지, 빈 아티팩트 감지 |
| `apps/api/src/routes/projects/index.js` | SSE 재접속 시 기존 아티팩트 상태 재전송 |
| `apps/web/src/hooks/usePipeline.js` | `refetchInterval` 단순화 |

---

### 16. 파이프라인 후반 에이전트 invoke_with_retry 누락 수정

**원인**
`tester.py`, `deployer.py`, `project_manager.py`가 `llm.ainvoke()` 직접 호출.
Rate Limit(429) 발생 시 `failed` 처리.

**수정 파일**
| 파일 | 작업 |
|------|------|
| `apps/pipeline/agents/tester.py` | `invoke_with_retry` import 및 5개 호출 교체 |
| `apps/pipeline/agents/deployer.py` | `invoke_with_retry` import 및 4개 호출 교체 |
| `apps/pipeline/agents/project_manager.py` | `invoke_with_retry` import 및 1개 호출 교체 |

---

### 17. pipeline_logs 테이블 저장 누락 수정

**원인**
`PipelineLog` Prisma 모델은 스키마에 정의되어 있었지만, `projectRepository`에 저장 메서드 없음.

**수정 파일**
| 파일 | 작업 |
|------|------|
| `apps/api/src/repositories/project.repository.js` | `saveLog` 메서드 추가 |
| `apps/api/src/workers/pipeline.worker.js` | 이벤트마다 `saveLog` 호출 추가 |

---

### 18. agent_artifacts 저장 0건 — pipeline 서버 .env 미로드 수정

**원인**
`main.py`에 `load_dotenv()` 호출 없음 → uvicorn 시작 시 `.env`를 읽지 않아 `ANTHROPIC_API_KEY` 미설정 → `KeyError` → 스트림 종료

**수정 파일**
| 파일 | 작업 |
|------|------|
| `apps/pipeline/main.py` | `from dotenv import load_dotenv` + `load_dotenv()` 추가 |

---

### 19. 파이프라인 진행상태 저장·복원 기능 개선

**문제**
1. `agentStatuses`가 Zustand 메모리 → 새로고침/재접속 시 전부 pending으로 리셋
2. SSE 오류 시 재연결 없음 → 상태 공백
3. in-progress 중 페이지 이동 후 복귀 시 현재 단계 파악 불가

**개선 내용**
| 항목 | 내용 |
|------|------|
| `GET /projects/:id/agent-statuses` | pipeline_logs 기반 에이전트별 최신 상태 반환 신규 엔드포인트 |
| SSE replay 개선 | artifacts 기반 → pipeline_logs 기반으로 교체 |
| REST 폴링 추가 | `running` 시 3초 간격으로 DB 상태 폴링 |
| 상태 배지 | PipelinePage 헤더에 대기중/실행중(pulse)/완료/실패 배지 표시 |

**수정 파일**
| 파일 | 작업 |
|------|------|
| `apps/api/src/repositories/project.repository.js` | `findLogs()` 메서드 추가 |
| `apps/api/src/services/project.service.js` | `getAgentStatuses()` 메서드 추가 |
| `apps/api/src/routes/projects/index.js` | `/agent-statuses` 엔드포인트 추가, SSE replay 개선 |
| `apps/web/src/hooks/usePipeline.js` | DB 상태 복원 쿼리 + effect 추가 |
| `apps/web/src/pages/PipelinePage.jsx` | 파이프라인 상태 배지 추가 |

---

### 20. 파이프라인 생성 즉시 fail — Docker 컨테이너 구버전·잘못된 API 키 수정

**원인**
| 원인 | 설명 |
|------|------|
| **잘못된 API 키** | `docker-compose.yml`이 호스트 env `${ANTHROPIC_API_KEY}` 전달. 키 만료/무효 상태 |
| **구버전 코드** | 컨테이너가 `docker build` 시점 코드로 실행 중 |
| **LangSmith 오류** | `LANGCHAIN_TRACING_V2: "true"` + 무효 키 → 403 에러 |

**수정 파일**
| 파일 | 작업 |
|------|------|
| `docker-compose.yml` | `env_file`, `LANGCHAIN_TRACING_V2: "false"`, volumes 마운트, `--reload` 추가 |
| `apps/pipeline/agents/base.py` | `load_dotenv()` 추가 |

---

### 21. ZIP 다운로드 버튼 클릭 시 404 오류 수정

**오류 내용**
```
http://localhost:5173/pipeline/undefined/projects/.../download
Unexpected Application Error! 404 Not Found
```

**원인**
`VITE_API_URL` 환경변수 미설정 시 값이 `undefined`(문자열)이 되어 잘못된 경로 생성

**수정 파일**
| 파일 | 작업 |
|------|------|
| `apps/web/src/pages/PipelinePage.jsx` | `VITE_API_URL ?? '/api/v1'` 폴백 추가 |

---

### 22. 마크다운 산출물 뷰어 레이아웃 개선 및 MD 다운로드 기능 추가

**원인**
`@tailwindcss/typography` 플러그인 미설치로 `prose prose-invert` 클래스가 미적용.

**수정 내용**
1. `globals.css`에 `.md-content` 커스텀 마크다운 스타일 추가
2. `ArtifactViewer.jsx` — `md-content` 클래스 적용 + "↓ MD 다운로드" 버튼 추가

**수정 파일**
| 파일 | 작업 |
|------|------|
| `apps/web/src/styles/globals.css` | `.md-content` 마크다운 스타일 추가 |
| `apps/web/src/components/features/artifacts/ArtifactViewer.jsx` | md-content 클래스 적용 + MD 다운로드 버튼 추가 |

---

### 23. 파이프라인 진행 중 MD 파일 편집 및 스텝 건너뛰기 기능 추가

**수정 내용**
1. **MD 파일 편집** — "✏ 편집" 버튼 클릭 시 textarea 인라인 에디터, `PATCH /artifacts/:id` 저장
2. **스텝 건너뛰기** — Redis 플래그 방식. `POST /steps/:step/skip` → Python orchestrator가 `skipped` 이벤트 발행
3. `requirements.txt`에 `redis[asyncio]>=5.0.0` 추가

**수정 파일**
| 파일 | 작업 |
|------|------|
| `apps/pipeline/orchestrator.py` | Redis skip 체크 + skipped 이벤트 yield 추가 |
| `apps/pipeline/requirements.txt` | redis[asyncio] 패키지 추가 |
| `apps/api/src/repositories/project.repository.js` | `findArtifactById`, `updateArtifact` 추가 |
| `apps/api/src/services/project.service.js` | `updateArtifact`, `skipStep` 추가 |
| `apps/api/src/routes/projects/index.js` | `PATCH /:id/artifacts/:artifactId`, `POST /:id/steps/:step/skip` 추가 |
| `apps/web/src/components/features/artifacts/ArtifactViewer.jsx` | 편집 모드 UI 추가 |
| `apps/web/src/components/features/pipeline/AgentStepCard.jsx` | 건너뛰기 버튼 추가 |

---

### 24. ZIP 다운로드 프로젝트 구조 개선

**원인**
기존 ZIP 구조가 `output/{agentName}/{filename}` 형태로 에이전트 기준 분류 → 실제 프로젝트 구조와 무관

**수정 내용**
- `ZIP_PATH_MAP`: artifact 파일명 → 프로젝트 디렉토리 경로 매핑 테이블 추가
- `toSlug()`: 프로젝트 제목을 폴더명으로 변환
- `buildIndexMd()`: 프로젝트 전체 구조 네비게이션 INDEX.md 자동 생성

**수정 파일**
| 파일 | 작업 |
|------|------|
| `apps/api/src/routes/projects/index.js` | ZIP 구조 재편성, INDEX.md 생성, 파일명 슬러그화 |

---

### 25. ZIP 다운로드 500 오류 수정 (FST_ERR_REP_INVALID_PAYLOAD_TYPE)

**오류 내용**
```json
{"statusCode":500,"code":"FST_ERR_REP_INVALID_PAYLOAD_TYPE",
"message":"Attempted to send payload of invalid type 'object'."}
```

**원인**
다운로드 핸들러가 `archive.finalize()` 완료 후 `undefined` 반환 → Fastify가 직렬화 시도 → 오류

**수정 내용**
`reply.hijack()` 추가 → Fastify가 응답 직렬화·훅을 건너뛰고 `reply.raw`에 위임

**수정 파일**
| 파일 | 작업 |
|------|------|
| `apps/api/src/routes/projects/index.js` | `reply.hijack()` 추가, response schema 제거 |

---

### 27. MD 뷰어 헤더 스크롤 고정 + 스텝명칭 표시 + 상단 틈 제거

**수정 내용**
1. `PipelinePage.jsx`: `<main>` padding을 `p-6` → `px-6 pb-6`으로 변경 (top padding 제거)
2. `ArtifactViewer.jsx`: sticky 헤더 `paddingTop` 추가, 스텝 한국어 명칭 매핑 추가

**수정 파일**
| 파일 | 작업 |
|------|------|
| `apps/web/src/pages/PipelinePage.jsx` | main padding `p-6` → `px-6 pb-6` |
| `apps/web/src/components/features/artifacts/ArtifactViewer.jsx` | 스텝명 표시, sticky 틈 제거 |

---

### 28. ZIP 다운로드 500 오류 재수정 (스트림 전송 방식 변경)

**오류 내용**
```json
{"statusCode":500,"code":"FST_ERR_REP_INVALID_PAYLOAD_TYPE"}
```

**원인**
`reply.hijack()` + `archive.pipe(reply.raw)` 방식이 예외 발생 시 Fastify 에러 핸들러와 충돌

**수정 내용**
`reply.raw` + `hijack()` 방식 → Fastify 표준 스트림 전송 방식(`reply.header(...).send(archive)`)으로 변경

**수정 파일**
| 파일 | 작업 |
|------|------|
| `apps/api/src/routes/projects/index.js` | `reply.send(archive)` 스트림 방식으로 전환 |

---

## 2026-04-21

### 29. Redis 연결 끊김으로 인한 서버 크래시 수정

**오류 내용**
```
Pipeline job failed: socket hang up
Error: Connection is closed.
Node.js v24.13.0 — Failed running 'src/server.js'
```

**원인**
`redis.js`에 `error` 이벤트 핸들러가 없어 Redis 연결 끊김 시 Node.js 프로세스 크래시

**수정 파일**
| 파일 | 작업 |
|------|------|
| `apps/api/src/lib/redis.js` | `redis.on('error', ...)` 핸들러 추가, `enableOfflineQueue: false` 추가 |
| `apps/api/src/workers/pipeline.worker.js` | axios.post try/catch 래핑 |

---

### 30. SSE /stream 엔드포인트 500 오류 수정 (ERR_HTTP_HEADERS_SENT)

**오류 내용**
```
FST_ERR_REP_INVALID_PAYLOAD_TYPE
ERR_HTTP_HEADERS_SENT: Cannot write headers after they are sent to the client
```

**원인**
`reply.raw.flushHeaders()` 이후 `getAgentStatuses()` 예외 발생 시 헤더 중복 전송

**수정 내용**
1. `getAgentStatuses()` 호출을 `flushHeaders()` 이전으로 이동
2. `reply.hijack()` 추가 — 핸들러 반환 후 Fastify 직렬화 파이프라인 개입 차단

**수정 파일**
| 파일 | 작업 |
|------|------|
| `apps/api/src/routes/projects/index.js` | `getAgentStatuses` 헤더 전송 전으로 이동, `reply.hijack()` 추가 |

---

### 31. ZIP 다운로드 버튼 인증 오류 및 robustness 수정

**원인**
1. `<a>` 태그가 절대경로(`http://localhost:3001`) 사용 → Vite 프록시 미경유 → 쿠키 미전송 → 401
2. archiver 스트림에 `error` 이벤트 핸들러 없음
3. `Content-Disposition` 헤더 한국어 파일명 RFC 6266 미준수

**수정 파일**
| 파일 | 작업 |
|------|------|
| `apps/web/src/pages/PipelinePage.jsx` | 다운로드 URL 고정 상대경로로 변경 |
| `apps/api/src/routes/projects/index.js` | archiver 에러 핸들러 추가, Content-Disposition 인코딩 개선 |

---

### 32. 파이프라인 실패 시 진행바 불합리 표시 수정

**오류 내용**
```
프로젝트 상태: 실패 / 전체 진행률: 100% (파란색) → 시각적 모순
```

**원인**
`PipelineProgressPanel`이 `projectStatus`를 받지 않아 실패해도 파란색 100% 표시

**수정 내용**
`projectStatus === 'failed'` 시 진행바 빨간색, 레이블 "파이프라인 실패" 표시

**수정 파일**
| 파일 | 작업 |
|------|------|
| `apps/web/src/components/features/pipeline/PipelineProgressPanel.jsx` | `projectStatus` prop 추가, 실패 시 시각적 표시 변경 |
| `apps/web/src/pages/PipelinePage.jsx` | `projectStatus={project?.status}` 전달 |

---

### 33. "보기" 버튼 표시 조건 개선 (완료 시 전체 표시, 실패 시 블러)

**수정 내용**
1. `canView` 조건: `status === 'completed' || projectStatus === 'completed'`
2. `projectStatus === 'failed'` 시 "보기" 버튼에 `blur-sm`, `pointer-events-none` 적용

**수정 파일**
| 파일 | 작업 |
|------|------|
| `apps/web/src/components/features/pipeline/AgentStepCard.jsx` | `canView` 조건 추가, 실패 시 보기 버튼 블러/비활성화 |
| `apps/web/src/components/features/pipeline/PipelineProgressPanel.jsx` | `projectStatus` → `AgentStepCard` 전달 |

---

### 34. ZIP 다운로드 "사이트를 사용할 수 없음" 오류 수정

**오류 내용**
```
Chrome 다운로드 바: download.zip - 사이트를 사용할 수 없음
```

**원인**
`archive.finalize()`를 `reply.send(archive)` 보다 먼저 호출 → 아카이브 종료 후 파이프 연결 시도 → 빈 응답

**수정 내용**
`reply.hijack()` + `archive.pipe(reply.raw)` 방식으로 변경 (파이프 먼저, finalize 나중)

**수정 파일**
| 파일 | 작업 |
|------|------|
| `apps/api/src/routes/projects/index.js` | hijack + pipe + finalize 순서로 변경 |

---

### 35. ZIP 다운로드 완전 불작동 수정 (fetch + Blob 방식으로 전환)

**원인**
1. **백엔드**: `reply.hijack()` 사용 시 `@fastify/cors`가 버퍼링한 CORS 헤더가 `reply.raw`에 미전달
2. **프론트엔드**: `<a href>` 방식은 Vite 개발 프록시 환경에서 쿠키·응답 처리가 불안정

**수정 내용**
- 백엔드: `reply.hijack()` 제거, `reply.send(archive)` 후 `archive.finalize()` 순서
- 프론트엔드: `<a href>` → `fetch` + Blob URL 방식으로 교체

**수정 파일**
| 파일 | 작업 |
|------|------|
| `apps/api/src/routes/projects/index.js` | hijack 제거, reply.send() 후 finalize() 순서 적용 |
| `apps/web/src/pages/PipelinePage.jsx` | a태그 → button + fetch/Blob 다운로드 방식 전환 |

---

### 36. ZIP 다운로드 "다운로드 중 오류" 수정 — 메모리 버퍼 방식으로 전환

**원인**
`reply.send(archive)` 이후 Fastify의 onSend 훅이 비동기로 실행되어 `archive.finalize()`가 먼저 완료 → 스트림 종료 이벤트 emit → 빈/깨진 응답

**수정 내용**
스트림 전송 방식 폐기, **메모리 버퍼(Buffer) 방식**으로 전환:
- `new Promise`로 archiver의 'data' 청크를 수집, 'end'에서 `Buffer.concat(chunks)` resolve
- 완성된 Buffer를 `reply.send(buffer)`로 전송

**수정 파일**
| 파일 | 작업 |
|------|------|
| `apps/api/src/routes/projects/index.js` | 스트림 파이프 방식 → await Promise(Buffer) 방식으로 전환 |

---

### 37. JWT 토큰 만료(15분)로 인한 다운로드 401 오류 수정

**오류 내용**
```
fetch /api/v1/projects/{id}/download → 401 Unauthorized
```

**원인**
JWT `expiresIn: '15m'` 설정. 15분 경과 후 TanStack Query는 캐시 표시하나 실제 요청 시 401

**수정 파일**
| 파일 | 작업 |
|------|------|
| `apps/api/src/routes/auth/index.js` | JWT expiresIn: 15m → 7d |

---

### 42. 파이프라인 실패 시 우측 패널에 실패 사유 + 외부검색 기반 해결책 표시

**수정 내용**
- `pipeline/main.py`: DuckDuckGo 검색으로 오류 메시지 키워드 검색(max 5건) → LLM으로 해결책 요약
- `/run`, `/run/from/{step}`: 실패 후 `solution` 이벤트 전송
- `PipelinePage.jsx`: 빨간 실패사유 박스 + 파란 해결책 박스 표시

**수정 파일**
| 파일 | 작업 |
|------|------|
| `apps/pipeline/main.py` | 수정 |
| `apps/api/src/workers/pipeline.worker.js` | 수정 |
| `apps/api/src/services/project.service.js` | 수정 |
| `apps/api/src/routes/projects/index.js` | 수정 |
| `apps/web/src/hooks/usePipeline.js` | 수정 |
| `apps/web/src/pages/PipelinePage.jsx` | 수정 |

---

### 43. Pipeline 서버 기동 실패 — duckduckgo_search 모듈 누락

**오류 내용**
```
ModuleNotFoundError: No module named 'duckduckgo_search'
```

**원인**
`duckduckgo-search` 패키지가 `myenvv` 가상환경에 미설치, `requirements.txt`에도 누락

**수정 파일**
| 파일 | 작업 |
|------|------|
| `apps/pipeline/requirements.txt` | `duckduckgo-search>=6.0.0` 추가 |

---

## 2026-04-22

### Pipeline Docker 이미지 — duckduckgo_search 모듈 누락

**프롬프트**
```
파이프라인 오류 체크 후 수정해줘. start.sh로 구동했어.
```

**오류 내용**
```
pipeline-1  | ModuleNotFoundError: No module named 'duckduckgo_search'
```

**원인**
`requirements.txt`에 `duckduckgo-search>=6.0.0`이 존재하지만, Docker 이미지가 캐시로 빌드되어 컨테이너 내부에 모듈 미설치.

**수정 내용**
Docker 이미지를 캐시 없이 재빌드

```bash
docker compose build --no-cache pipeline
docker compose up -d pipeline
```

**수정 파일**
| 파일 | 작업 |
|------|------|
| Docker 이미지 (project-pipeline) | 재빌드 (코드 변경 없음) |

---

### Pipeline — Redis localhost:6379 연결 거부 오류

**프롬프트**
```
AgileFlow 파이프라인이 Redis 서버에 localhost:6379 포트로 연결을 시도했으나 연결이 거부되어 발생한 오류
```

**원인**
`orchestrator.py`의 `REDIS_URL` 기본값이 `redis://localhost:6379`.
Docker 컨테이너 내부에서 `localhost`는 컨테이너 자신을 가리키므로 Redis 접근 불가.
`docker-compose.yml`에 `REDIS_URL`이 없어 fallback 기본값이 사용됨.

**수정 파일**
| 파일 | 작업 |
|------|------|
| `project/apps/pipeline/orchestrator.py` | `REDIS_URL` 기본값 `redis://localhost:6379` → `redis://redis:6379` |
| `project/docker-compose.yml` | pipeline environment에 `REDIS_URL: "redis://redis:6379"` 추가 |

**확인 방법**
```bash
docker compose up -d pipeline
docker compose logs --tail=10 pipeline
# INFO: Application startup complete. 출력 확인
```

---

### 파이프라인 실행 취소 기능 추가

**프롬프트**
```
실행중인 파이프라인의 일시중지버튼이나 취소버튼이 필요해
```

**구현 내용**
실행 중인 파이프라인을 즉시 취소. 취소 시 현재까지 완료된 단계의 산출물은 보존.

취소 흐름:
1. 프론트 `⏹ 실행 취소` 버튼 클릭 → `POST /projects/:id/cancel`
2. API가 Redis에 `project:{id}:cancel = 1` 플래그 세팅 (TTL 60초)
3. 워커가 2초마다 Redis 폴링 → 감지 시 `AbortController.abort()` 호출
4. axios 스트림 즉시 중단 → 상태 `cancelled`로 업데이트

**수정 파일**
| 파일 | 작업 |
|------|------|
| `apps/api/src/workers/pipeline.worker.js` | AbortController + Redis cancel 폴링 + `cancelled` 상태 처리 |
| `apps/api/src/services/project.service.js` | `cancelPipeline` 메서드 추가, delete에 cancelled 상태 허용 |
| `apps/api/src/routes/projects/index.js` | `POST /:id/cancel` 엔드포인트 추가, status enum에 `cancelled` 추가 |
| `apps/web/src/hooks/usePipeline.js` | `cancelPipeline` 콜백 추가 |
| `apps/web/src/pages/PipelinePage.jsx` | `⏹ 실행 취소` 버튼, `cancelled` 상태 배지 추가 |
| `apps/web/src/components/features/pipeline/PipelineProgressPanel.jsx` | `cancelled` 상태 진행률 패널 스타일 추가 |
