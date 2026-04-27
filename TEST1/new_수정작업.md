# 수정 로그

---

## 2026-04-24

### 파이프라인 신규 작업 시 이전 진행상태 표시 버그 수정

**프롬프트**
```
파이프라인 다음작업시 이전 진행상태가 나타남. 신규로 작업시에는 초기 상태표시야함.
```

**원인**
`usePipelineStore`의 `agentStatuses`가 Zustand 전역 싱글톤 스토어에 저장되어 있어, 다른 프로젝트의 파이프라인 페이지로 이동해도 이전 프로젝트의 에이전트 상태가 그대로 남아있었음.
`reset()` 함수가 스토어에 정의되어 있었지만 어디서도 호출되지 않았음.

**수정 내용**
`usePipeline.js`에 `useEffect`를 추가해 `projectId`가 변경될 때(= 새 프로젝트 파이프라인 진입 시) `reset()`을 호출하도록 수정.
이후 `dbStatuses` 쿼리가 실행되어 해당 프로젝트의 실제 에이전트 상태만 복원됨.

**수정 파일**
| 파일 | 작업 |
|------|------|
| `apps/web/src/hooks/usePipeline.js` | `projectId` 변경 시 스토어 `reset()` 호출 추가 |

**확인 방법**
```
프로젝트 A 파이프라인 확인 후 → 프로젝트 B 파이프라인 이동
→ 에이전트 상태가 초기(대기 중)로 표시 확인
→ DB 복원 후 프로젝트 B의 실제 상태 표시 확인
```

---

## 2026-04-23

### AgentArtifact unique constraint 미적용 재발 — prisma db push 필요

**프롬프트**
```
@TEST1/errro_msg.txt 에러체크
```

**오류 내용**
```
Invalid `prisma.agentArtifact.upsert()` invocation:
ConnectorError: PostgresError { code: "42P10",
  message: "there is no unique or exclusion constraint matching the ON CONFLICT specification" }
```

**원인**
`schema.prisma`의 `AgentArtifact` 모델에 `@@unique([projectId, agentName, filename])`는 정의되어 있으나, 초기 마이그레이션 SQL(`20260417074747_start_db_test`)에 해당 UNIQUE INDEX가 포함되지 않아 DB에 constraint가 없는 상태. `upsert()`의 `INSERT ... ON CONFLICT (project_id, agent_name, filename)` 구문이 일치하는 unique constraint를 찾지 못해 `42P10` 오류 발생. (#12와 동일 이슈 재발 — DB 초기화 또는 재생성 시 반복 가능)

**수정 방법**
```bash
cd TEST1/project/apps/api
npx prisma migrate dev --name add_agent_artifact_unique_constraint
# 또는 (마이그레이션 없이 즉시 적용)
npx prisma db push
```

**수정 파일**
| 파일 | 작업 |
|------|------|
| DB `agent_artifacts` 테이블 | unique constraint 적용 (코드 변경 없음) |

**확인 방법**
```bash
npx prisma db push
# → "The database is already in sync with the Prisma schema." 출력 확인
```

---

## 2026-04-22

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

---

### Pipeline — Redis localhost:6379 연결 거부 오류

**프롬프트**
```
AgileFlow 파이프라인이 Redis 서버에 localhost:6379 포트로 연결을 시도했으나,
Redis 서버가 실행 중이지 않거나 연결이 거부되어 발생한 오류입니다.
```

**원인**
`orchestrator.py`의 `REDIS_URL` 기본값이 `redis://localhost:6379`로 설정되어 있었음.
Docker 컨테이너 내부에서 `localhost`는 컨테이너 자신을 가리키므로 Redis에 접근 불가.
Docker 네트워크에서는 서비스명 `redis`로 접근해야 함.
추가로 `docker-compose.yml`의 pipeline 환경변수에 `REDIS_URL`이 없어 fallback 기본값이 사용됨.

**수정 내용**
1. `orchestrator.py` 기본값 변경: `localhost` → `redis`
2. `docker-compose.yml` pipeline environment에 `REDIS_URL` 명시적 추가

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

### Pipeline Docker 이미지 — duckduckgo_search 모듈 누락

**프롬프트**
```
파이프라인 오류 체크 후 수정해줘. start.sh로 구동했어.
```

**오류 내용**
```
pipeline-1  | ModuleNotFoundError: No module named 'duckduckgo_search'
  File "/app/main.py", line 8, in <module>
    from duckduckgo_search import DDGS
```

**원인**
`requirements.txt`에 `duckduckgo-search>=6.0.0`이 존재하지만, Docker 이미지가 해당 패키지 추가 이전의 캐시로 빌드되어 컨테이너 내부에 모듈이 설치되지 않은 상태.

**수정 내용**
Docker 이미지를 캐시 없이 재빌드하여 `requirements.txt` 전체를 새로 설치.

```bash
docker compose build --no-cache pipeline
docker compose up -d pipeline
```

**수정 파일**
| 파일 | 작업 |
|------|------|
| Docker 이미지 (project-pipeline) | 재빌드 (코드 변경 없음) |

**확인 방법**
```bash
docker compose logs --tail=20 pipeline
# INFO:     Application startup complete. 출력 확인
```

---

## 2026-04-21

### 43. Pipeline 서버 기동 실패 — duckduckgo_search 모듈 누락

**프롬프트**
```
@TEST1/errro_msg.txt 오류체크해서 보고해줘
```

**오류 내용**
```
File "D:\AI-DATA\TEST1\project\apps\pipeline\main.py", line 8, in <module>
    from duckduckgo_search import DDGS
ModuleNotFoundError: No module named 'duckduckgo_search'
```

**원인**
`duckduckgo-search` 패키지가 `myenvv` 가상환경에 설치되지 않았고, `requirements.txt`에도 누락되어 있었음.
uvicorn `--reload` 모드로 파일 변경 감지 시마다 재시작하나 매번 동일 오류로 실패 반복.

**수정 내용**
- `requirements.txt`에 `duckduckgo-search>=6.0.0` 추가

**수정 파일**
| 파일 | 작업 |
|------|------|
| `apps/pipeline/requirements.txt` | `duckduckgo-search>=6.0.0` 추가 |

**확인 방법**
```bash
D:\AI-DATA\TEST1\project\apps\pipeline\myenvv\Scripts\pip install duckduckgo-search
# uvicorn --reload 가 자동 재시작 후 정상 기동 확인
```

---

### 42. 파이프라인 실패 시 우측 패널에 실패 사유 + 외부검색 기반 해결책 표시

**프롬프트**
```
파이프라인 실패 사유 db에 로그 저장해줘 그리고 프로젝트 실패시 우측창에 실패사유, 해결책 내용 보여줘.
해결책은 외부검색을 이용한 결과 요약해서 보여줘
```

**수정 내용**
- `pipeline/main.py`: `duckduckgo-search` 패키지 도입 — `_search_error()` 함수로 오류 메시지 키워드 DuckDuckGo 검색(max 5건), `asyncio.to_thread`로 비동기 처리
- `generate_failure_solution()`: 검색 스니펫을 LLM 프롬프트에 포함해 오류원인/해결방법/참고정보 3섹션으로 한국어 요약 생성
- `/run`, `/run/from/{step}` 이벤트 스트림: 실패 감지 후 solution 이벤트 `{"agent":"pipeline","status":"solution","content":"..."}` 전송
- `pipeline.worker.js`: 로그 저장 시 `event.content` 포함 — solution 이벤트를 DB에 저장
- `project.service.js`: `getFailureReason` → `getFailureInfo`로 개편 — `reason`과 `solution` 동시 반환
- `routes/projects/index.js`: `GET /:id/failure-reason` 응답에 `solution` 필드 추가
- `usePipeline.js`: `failureSolution` 추출 및 반환
- `PipelinePage.jsx`: 우측 패널에 빨간 실패사유 박스 + 파란 해결책 박스 표시 (해결책 로딩 전 "분석 중..." 텍스트)

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

### 37. JWT 토큰 만료(15분)로 인한 다운로드 401 오류 수정

**프롬프트**
```
다운로드 버튼 클릭시 오류발생 (다운로드 중 오류가 발생했습니다 alert)
```

**오류 내용**
```
fetch /api/v1/projects/{id}/download → 401 Unauthorized
→ !res.ok → throw → catch → alert("다운로드 중 오류가 발생했습니다")
```

**원인**
JWT 토큰 만료 시간이 `expiresIn: '15m'`(15분)으로 설정되어 있었음.
- 로그인 후 15분 내에는 모든 API 정상 작동
- 15분 경과 후: TanStack Query는 `completed` 상태에서 refetch 중단 → UI에는 캐시된 프로젝트 데이터가 그대로 표시 → 토큰 만료 사실을 UI에서 알 수 없음
- 다운로드 버튼 클릭: 캐시 없이 새로운 fetch 요청 → `authenticate` 미들웨어가 만료 토큰 감지 → 401 → catch 블록 → alert

**수정 내용**
`register`, `login` 양쪽의 `expiresIn: '15m'` → `expiresIn: '7d'`로 변경

**수정 파일**
| 파일 | 작업 |
|------|------|
| `apps/api/src/routes/auth/index.js` | JWT expiresIn: 15m → 7d |

**확인 방법**
```
재로그인 후 15분 이상 경과 → ZIP 다운로드 버튼 클릭 → 정상 다운로드 확인
```

---

### 36. ZIP 다운로드 "다운로드 중 오류" 수정 — 메모리 버퍼 방식으로 전환

**프롬프트**
```
다운로드 오류발생 체크 (다운로드 중 오류가 발생했습니다 alert)
```

**원인**
`reply.send(archive)` 이후 Fastify의 onSend 라이프사이클 훅이 **비동기**로 실행되므로, 그 사이에 호출된 `archive.finalize()`가 먼저 완료되어 스트림 종료 이벤트('end')를 emit → Fastify가 뒤늦게 파이프를 연결할 때 이미 종료된 스트림 → 빈/깨진 응답 → fetch 오류.

**수정 내용**
스트림 전송 방식 폐기, **메모리 버퍼(Buffer) 방식**으로 전환:
- `new Promise`로 archiver의 'data' 청크를 수집, 'end'에서 `Buffer.concat(chunks)` resolve
- `archive.finalize()`를 Promise 내에서 호출 → ZIP 완성까지 `await`
- 완성된 Buffer를 `reply.send(buffer)`로 전송 — Fastify가 Buffer를 완벽하게 처리
- 타이밍 문제 원천 차단, 에러 시 Promise reject → Fastify 에러 핸들러로 전파

**수정 파일**
| 파일 | 작업 |
|------|------|
| `apps/api/src/routes/projects/index.js` | 스트림 파이프 방식 → await Promise(Buffer) 방식으로 전환 |

---

### 35. ZIP 다운로드 완전 불작동 수정 (fetch + Blob 방식으로 전환)

**프롬프트**
```
ZIP 다운로드 클릭 작동안하네... 확실하게 문제 잡아서 수정해!
```

**원인 (2가지)**
1. **백엔드**: `reply.hijack()` 사용 시 `@fastify/cors`가 `reply.header()`로 버퍼링한 CORS 헤더가 `reply.raw`에 전달되지 않음. Vite 프록시와의 스트림 타이밍 충돌도 발생
2. **프론트엔드**: `<a href>` 방식은 Vite 개발 프록시 환경에서 쿠키·응답 처리가 불안정. fetch + Blob URL 방식이 확실하게 쿠키를 포함하고 오류를 처리함

**수정 내용**

백엔드 — `reply.hijack()` 완전 제거, 표준 Fastify 스트림 API 사용:
- `reply.send(archive)` 호출로 Fastify가 파이프 연결 (동기)
- 파이프 연결 **후** `archive.finalize()` 호출 — 스트림 종료 전 파이프 보장

프론트엔드 — `<a href download>` → `fetch` + Blob URL 방식으로 교체:
- `fetch('/api/v1/projects/{id}/download', { credentials: 'include' })` — 쿠키 명시 전송
- 응답을 Blob으로 변환 → `URL.createObjectURL()` → 프로그래밍 방식으로 다운로드
- 다운로드 중 버튼 비활성화 + "다운로드 중..." 텍스트 표시
- 실패 시 `alert()` 오류 안내

**수정 파일**
| 파일 | 작업 |
|------|------|
| `apps/api/src/routes/projects/index.js` | hijack 제거, reply.send() 후 finalize() 순서 적용 |
| `apps/web/src/pages/PipelinePage.jsx` | a태그 → button + fetch/Blob 다운로드 방식 전환 |

---

### 34. ZIP 다운로드 "사이트를 사용할 수 없음" 오류 수정

**프롬프트**
```
다운로드 오류 체크 해줘 (download.zip - 사이트를 사용할 수 없음)
```

**오류 내용**
```
Chrome 다운로드 바: download.zip - 사이트를 사용할 수 없음
```

**원인**
`archive.finalize()`를 `reply.send(archive)` 보다 먼저 호출하여, 아카이브가 이미 종료(end 이벤트 발생)된 후 Fastify가 스트림에 파이프를 연결하려는 타이밍 문제.
Node.js ReadableStream은 end 이벤트가 발생한 후 파이프를 붙이면 데이터가 전달되지 않아 빈/깨진 응답 → 브라우저가 "사이트를 사용할 수 없음" 표시.

**수정 내용**
SSE 엔드포인트와 동일하게 `reply.hijack()` + `archive.pipe(reply.raw)` 방식으로 변경:
1. `reply.hijack()` — Fastify 직렬화 파이프라인 비활성화
2. `reply.raw`에 직접 헤더 설정
3. `archive.pipe(reply.raw)` — 파이프 먼저 연결
4. `archive.finalize()` — 파이프 연결 후 finalize (올바른 순서)
5. archiver 에러 핸들러에서 `reply.raw.destroy(err)` 추가

**수정 파일**
| 파일 | 작업 |
|------|------|
| `apps/api/src/routes/projects/index.js` | hijack + pipe + finalize 순서로 변경 |

**확인 방법**
```
완료된 프로젝트 → ZIP 다운로드 클릭 → 정상 다운로드 확인
```

---

### 33. "보기" 버튼 표시 조건 개선 (완료 시 전체 표시, 실패 시 블러)

**프롬프트**
```
파이프라인 성공한 경우 보기 가능하게 하고, 실패인 경우는 보기 링크 블러처리
파이프라인 완료는 보기 가능하게 해줘
```

**수정 내용**
1. `AgentStepCard`에 `projectStatus` prop 추가
2. `canView` 조건: `status === 'completed' || projectStatus === 'completed'` — 프로젝트 완료 시 개별 에이전트 상태와 무관하게 artifact가 있으면 "보기" 표시 (타이밍 이슈로 store 미반영 에이전트도 포함)
3. `projectStatus === 'failed'` 시 "보기" 버튼에 `blur-sm`, `pointer-events-none`, `disabled` 적용 → 클릭 불가 + 흐릿하게 표시
4. `PipelineProgressPanel`에서 `projectStatus`를 `AgentStepCard`로 전달

**수정 파일**
| 파일 | 작업 |
|------|------|
| `apps/web/src/components/features/pipeline/AgentStepCard.jsx` | `canView` 조건 추가, 실패 시 보기 버튼 블러/비활성화 |
| `apps/web/src/components/features/pipeline/PipelineProgressPanel.jsx` | `projectStatus` → `AgentStepCard` 전달 |

---

### 32. 파이프라인 실패 시 진행바 불합리 표시 수정

**프롬프트**
```
실패 시 파이프라인 완료 불합리 수정해줘
```

**오류 내용**
```
프로젝트 상태: 실패 / 전체 진행률: 100% (파란색)
→ 실패했는데 완료처럼 보이는 시각적 모순
```

**원인**
`PipelineProgressPanel`은 `projectStatus`를 받지 않아, 파이프라인이 `pipeline:failed` 이벤트로 실패해도 그 이전에 완료된 개별 에이전트들의 `completed` 상태를 그대로 카운트해 파란색 100% 진행바를 표시함.

**수정 내용**
1. `PipelineProgressPanel`에 `projectStatus` prop 추가
2. `projectStatus === 'failed'` 시:
   - 진행바 색상: 파란색 → 빨간색(`#ef4444`)
   - 레이블: "전체 진행률" → "파이프라인 실패"
   - 수치: "100%" → "4/9 완료 후 실패" 형식
3. `PipelinePage`에서 `project?.status`를 `PipelineProgressPanel`로 전달

**수정 파일**
| 파일 | 작업 |
|------|------|
| `apps/web/src/components/features/pipeline/PipelineProgressPanel.jsx` | `projectStatus` prop 추가, 실패 시 시각적 표시 변경 |
| `apps/web/src/pages/PipelinePage.jsx` | `projectStatus={project?.status}` 전달 |

**확인 방법**
```
실패 상태 프로젝트 파이프라인 페이지 접속 → 좌측 패널 진행바가 빨간색, "파이프라인 실패 / N/9 완료 후 실패" 표시 확인
```

---

### 31. ZIP 다운로드 버튼 인증 오류 및 robustness 수정

**프롬프트**
```
http://localhost:5173/api/v1/projects/22f1bf4e-.../download   zip 다운로드 버튼 정상작동 여부 체크 후 수정해줘
```

**원인**
1. 프론트엔드 `<a>` 태그가 `${VITE_API_URL}` 환경변수를 사용 — `VITE_API_URL`이 절대경로(`http://localhost:3001/api/v1`)로 설정된 경우 브라우저가 다른 포트(3001)로 직접 요청을 보내, Vite 프록시를 거치지 않아 `accessToken` 쿠키가 전송되지 않음 → 401 인증 실패
2. 백엔드 archiver 스트림에 `error` 이벤트 핸들러 없음 — archiver 오류 발생 시 Node.js 프로세스 크래시 가능
3. `Content-Disposition` 헤더 파일명에 한국어 포함 시 RFC 6266 미준수 (ASCII 외 문자 미인코딩)

**수정 내용**
1. 다운로드 링크 URL을 `/api/v1/projects/{id}/download` 고정 상대경로로 변경 — Vite 프록시를 통해 쿠키가 항상 올바르게 전달됨
2. `<a>` 태그에 `download` 속성 추가
3. archiver `error` 이벤트 핸들러 추가
4. `Content-Disposition` 헤더에 `filename*=UTF-8''...` 형식 추가 (RFC 6266 준수)

**수정 파일**
| 파일 | 작업 |
|------|------|
| `apps/web/src/pages/PipelinePage.jsx` | 다운로드 URL 고정 상대경로로 변경, `download` 속성 추가 |
| `apps/api/src/routes/projects/index.js` | archiver 에러 핸들러 추가, Content-Disposition 인코딩 개선 |

---

### 30. SSE /stream 엔드포인트 500 오류 수정 (ERR_HTTP_HEADERS_SENT)

**프롬프트**
```
@TEST1/errro_msg.txt 오류체크해줘
```

**오류 내용**
```
FST_ERR_REP_INVALID_PAYLOAD_TYPE: Attempted to send payload of invalid type 'object'
ERR_HTTP_HEADERS_SENT: Cannot write headers after they are sent to the client
  at GET /api/v1/projects/:id/stream
```

**원인**
1. `reply.raw.flushHeaders()`로 SSE 헤더를 먼저 전송한 뒤 `getAgentStatuses()` 호출
2. `getAgentStatuses()`에서 예외(프로젝트 없음·권한 없음 등) 발생 시, 이미 헤더가 전송된 상태에서 Fastify 에러 핸들러가 500 응답을 추가로 쓰려다 `ERR_HTTP_HEADERS_SENT` 연쇄 발생
3. 핸들러가 정상 종료 시에도 Fastify의 response 직렬화 파이프라인이 `undefined`를 string으로 직렬화하려다 `FST_ERR_REP_INVALID_PAYLOAD_TYPE` 발생

**수정 내용**
1. `getAgentStatuses()` 호출을 `reply.raw.flushHeaders()` 이전으로 이동 — 예외 시 정상 에러 응답 가능
2. `reply.hijack()` 추가 — 핸들러 반환 후 Fastify 직렬화 파이프라인 개입 차단

**수정 파일**
| 파일 | 작업 |
|------|------|
| `apps/api/src/routes/projects/index.js` | `getAgentStatuses` 헤더 전송 전으로 이동, `reply.hijack()` 추가 |

**확인 방법**
```
파이프라인 페이지 접속 → 브라우저 개발자 도구 Network 탭 → stream 요청 상태 200 확인
```

---

### 29. Redis 연결 끊김으로 인한 서버 크래시 수정

**프롬프트**
```
@TEST1/errro_msg.txt 오류체크해줘
```

**오류 내용**
```
Pipeline job failed: socket hang up
Error: Connection is closed.
    at close (node_modules/ioredis/built/redis/event_handler.js:214:25)
Node.js v24.13.0
Failed running 'src/server.js'. Waiting for file changes before restarting...
```

**원인**
1. `redis.js`에 `error` 이벤트 핸들러가 없어, Redis 서버 연결이 끊겼을 때 ioredis가 발생시키는 `error` 이벤트를 Node.js가 처리하지 못하고 프로세스 전체를 크래시시킴
2. `socket hang up`은 Python 파이프라인 서버가 응답 도중 연결을 끊어 axios 스트림이 오류를 수신한 것으로, 에러 메시지가 불명확했음

**수정 내용**
1. `redis.js`에 `redis.on('error', ...)` 핸들러 추가 — Redis 연결 오류를 콘솔 로그로 처리하여 서버 크래시 방지
2. `enableOfflineQueue: false` 옵션 추가 — Redis 오프라인 중 큐에 쌓이는 명령 방지
3. `pipeline.worker.js`에서 axios.post를 try/catch로 감싸 파이프라인 서버 연결 실패 시 명확한 오류 메시지 출력

**수정 파일**
| 파일 | 작업 |
|------|------|
| `apps/api/src/lib/redis.js` | 수정 |
| `apps/api/src/workers/pipeline.worker.js` | 수정 |

**확인 방법**
```bash
# Redis가 꺼진 상태에서 API 서버 기동 — 크래시 없이 에러 로그만 출력되어야 함
npm run dev
```

---

## 2026-04-20

### 28. ZIP 다운로드 500 오류 재수정 (스트림 전송 방식 변경)

**프롬프트**
```
@errro_msg.txt 오류원인 체크 후 수정해줘
```

**오류 내용**
```json
{"statusCode":500,"code":"FST_ERR_REP_INVALID_PAYLOAD_TYPE",
"message":"Attempted to send payload of invalid type 'object'. Expected a string or Buffer."}
```

**원인**
이전 수정(`reply.hijack()` + `archive.pipe(reply.raw)`)은 Fastify의 응답 파이프라인을 우회하는 비표준 방식.
`reply.hijack()` 호출 전에 `Promise.all`에서 예외 발생 시 Fastify 에러 핸들러가 개입하거나,
archiver 스트림이 object로 인식되어 동일 오류가 재발함.

**수정 내용**
`reply.raw` + `hijack()` 방식 → Fastify 표준 스트림 전송 방식으로 변경
- `archive.finalize()` 호출 후 `return reply.header(...).send(archive)` 로 스트림 전달
- Fastify가 archiver 스트림을 직접 response에 파이프 처리 → 직렬화 문제 완전 해소
- `a.content ?? ''` 추가 → content가 null인 artifact 방어 처리

**수정 파일**
| 파일 | 작업 |
|------|------|
| `apps/api/src/routes/projects/index.js` | `reply.send(archive)` 스트림 방식으로 전환 |

**확인 방법**
```
파이프라인 완료 후 "↓ ZIP 다운로드" 클릭 → {slug}.zip 정상 다운로드
```

---

### 27. MD 뷰어 헤더 스크롤 고정 + 스텝명칭 표시 + 상단 틈 제거

**프롬프트**
```
md 보기 화면에서 헤더부분은 스크롤 고정해주면 좋겠어.
md 파일명 대신에 파이프라인 스텝명칭이 앞에 나오게 해주면 좋겠다.
헤더 고정 위부분에 틈이 없게 해줘. 스크롤시 내용이 틈으로 보인다.
```

**원인**
- 헤더 sticky 적용 시 `<main p-6>`의 top padding(1.5rem)이 스크롤 컨테이너 상단과 헤더 사이에 틈으로 남아 스크롤 시 내용이 비쳐 보임
- 헤더에 MD 파일명(`idea_analysis_report.md`)만 표시되어 어떤 스텝인지 직관적으로 알기 어려움

**수정 내용**
1. `PipelinePage.jsx`: `<main>` padding을 `p-6` → `px-6 pb-6`으로 변경 (top padding 제거)
2. `ArtifactViewer.jsx`:
   - sticky 헤더에 `paddingTop: '1.5rem'` 추가 → main top padding 제거분 보완
   - `AGENT_STEP_NAMES` 매핑 추가 (`01_idea_analyst` → '아이디어 분석' 등)
   - 헤더 타이틀을 스텝 한국어 명칭으로 변경, 파일명은 하단 mono 서브텍스트로

**수정 파일**
| 파일 | 작업 |
|------|------|
| `apps/web/src/pages/PipelinePage.jsx` | main padding `p-6` → `px-6 pb-6` |
| `apps/web/src/components/features/artifacts/ArtifactViewer.jsx` | 스텝명 표시, sticky 틈 제거 |

**확인 방법**
```
보기 클릭 → 헤더에 "아이디어 분석" 등 스텝명 표시 확인
스크롤 내릴 때 헤더 고정, 상단 틈 없음 확인
```

---

### 25. ZIP 다운로드 500 오류 수정 (FST_ERR_REP_INVALID_PAYLOAD_TYPE)

**프롬프트**
```
↓ ZIP 다운로드 링크 클릭후 오류
```

**오류 내용**
```json
{"statusCode":500,"code":"FST_ERR_REP_INVALID_PAYLOAD_TYPE",
"error":"Internal Server Error",
"message":"Attempted to send payload of invalid type 'object'. Expected a string or Buffer."}
```

**원인**
- 다운로드 핸들러가 `archive.finalize()` 완료 후 `undefined` 반환
- Fastify가 response schema (`type: 'string'`)로 반환값 직렬화 시도
- `undefined`는 string이 아니므로 `FST_ERR_REP_INVALID_PAYLOAD_TYPE` 발생
- SSE 엔드포인트는 handler가 종료되지 않아 동일 구조에서도 문제없었지만,
  download는 `finalize()` 후 종료되므로 Fastify의 직렬화 파이프라인이 실행됨

**수정 내용**
1. `reply.hijack()` 추가 → Fastify가 응답 직렬화·훅을 건너뛰고 `reply.raw`에 위임
2. response schema (`type: 'string', format: 'binary'`) 제거 → 스트리밍 응답에 불필요

**수정 파일**
| 파일 | 작업 |
|------|------|
| `apps/api/src/routes/projects/index.js` | `reply.hijack()` 추가, response schema 제거 |

**확인 방법**
```
파이프라인 완료 후 "↓ ZIP 다운로드" 클릭 → {slug}.zip 정상 다운로드
```

---

### 24. ZIP 다운로드 프로젝트 구조 개선

**프롬프트**
```
zip 다운로드는 생성된 최종 프로젝트 파일 구성해서 다운받을 수 있게해줘
```

**원인**
기존 ZIP 구조가 `output/{agentName}/{filename}` 형태로 에이전트 기준 분류 → 실제 프로젝트 구조와 무관

**수정 내용**
- `ZIP_PATH_MAP`: artifact 파일명 → 프로젝트 디렉토리 경로 매핑 테이블 추가
- `toSlug()`: 프로젝트 제목을 폴더명으로 변환
- `buildIndexMd()`: 프로젝트 전체 구조 네비게이션 INDEX.md 자동 생성
- ZIP 파일명도 프로젝트 제목 기반으로 변경 (`{slug}.zip`)

**ZIP 최종 구조**
```
{project-slug}/
├── INDEX.md              ← 전체 구조 네비게이션
├── README.md             ← final_report.md
├── docs/
│   ├── 01-idea-analysis.md
│   ├── 02-requirements.md
│   ├── 03-design-system.md / 03-wireframes.md / 03-components.md
│   └── 04-tech-stack.md / 04-architecture.md / 04-database-schema.md / 04-project-structure.md
├── frontend/
│   ├── SETUP.md / COMPONENTS.md / PAGES.md / HOOKS.md
├── backend/
│   ├── SETUP.md / SCHEMA.md / ROUTES.md / SERVICES.md
├── tests/
│   ├── STRATEGY.md / BACKEND.md / FRONTEND.md / E2E.md / CODE-REVIEW.md
└── deploy/
    ├── DOCKER.md / CICD.md / INFRASTRUCTURE.md / MONITORING.md
```

**수정 파일**
| 파일 | 작업 |
|------|------|
| `apps/api/src/routes/projects/index.js` | ZIP 구조 재편성, INDEX.md 생성, 파일명 슬러그화 |

---

### 23. 파이프라인 진행 중 MD 파일 편집 및 스텝 건너뛰기 기능 추가

**프롬프트**
```
파이프라인 진행 중 잠시 멈추고 이전 스텝 md 파일을 수정할 수 있게 기능 추가해줘,
그리고 파이프라인을 건너 뛰고 다음스텝 진행 할 수도 있는지 확인해줘.
```

**수정 내용**
1. **MD 파일 편집 (ArtifactViewer)**
   - "✏ 편집" 버튼 클릭 시 textarea 인라인 에디터 전환
   - "저장" 버튼: `PATCH /api/v1/projects/:id/artifacts/:artifactId` 호출 후 캐시 갱신
   - "취소" 버튼: 원본 복원
   - artifact 변경 시 편집 모드 자동 해제

2. **스텝 건너뛰기 (Redis 플래그 방식)**
   - 파이프라인 실행 중 pending 스텝에 "건너뛰기" 버튼 표시
   - 클릭 시 `POST /api/v1/projects/:id/steps/:step/skip` → Redis `SADD project:{id}:skip_steps {step}`
   - Python orchestrator가 각 스텝 시작 전 Redis 체크 → 플래그 있으면 "skipped" 이벤트 발행 후 다음 스텝 진행
   - AgentStatusBadge에 "건너뜀(⏭)" 상태 추가
   - 진행률 계산에서 skipped도 완료로 처리

3. **Python 환경**
   - `requirements.txt`에 `redis[asyncio]>=5.0.0` 추가

**수정 파일**
| 파일 | 작업 |
|------|------|
| `apps/pipeline/orchestrator.py` | Redis skip 체크 + skipped 이벤트 yield 추가 |
| `apps/pipeline/requirements.txt` | redis[asyncio] 패키지 추가 |
| `apps/api/src/repositories/project.repository.js` | `findArtifactById`, `updateArtifact` 추가 |
| `apps/api/src/services/project.service.js` | `updateArtifact`, `skipStep` 추가 |
| `apps/api/src/routes/projects/index.js` | `PATCH /:id/artifacts/:artifactId`, `POST /:id/steps/:step/skip` 추가 |
| `apps/web/src/components/ui/AgentStatusBadge.jsx` | `skipped` 상태 추가 |
| `apps/web/src/components/features/pipeline/AgentStepCard.jsx` | 건너뛰기 버튼 추가 |
| `apps/web/src/components/features/pipeline/PipelineProgressPanel.jsx` | orchestratorStep + onSkipStep 전달 |
| `apps/web/src/pages/PipelinePage.jsx` | skipStep, updateArtifact 연결 |
| `apps/web/src/hooks/usePipeline.js` | updateArtifact, skipStep 함수 추가 |
| `apps/web/src/components/features/artifacts/ArtifactViewer.jsx` | 편집 모드 UI 추가 |

**확인 방법**
```
1. 파이프라인 실행 중 → 완료된 스텝 "보기" 클릭 → "✏ 편집" 버튼 → 내용 수정 → "저장"
2. 파이프라인 실행 중 → pending 스텝 "건너뛰기" 클릭 → 해당 스텝 "건너뜀" 배지 표시 → 다음 스텝 자동 진행
```

---

### 22. 마크다운 산출물 뷰어 레이아웃 개선 및 MD 다운로드 기능 추가

**프롬프트**
```
md 파일 보기좋게 레이아웃 잡아주고 download 받게 해줘
```

**원인**
`@tailwindcss/typography` 플러그인 미설치로 `prose prose-invert` 클래스가 미적용 상태.
마크다운 콘텐츠가 스타일 없이 일반 텍스트로 표시됨. 개별 MD 파일 다운로드 버튼 부재.

**수정 내용**
1. `globals.css`에 `.md-content` 커스텀 마크다운 스타일 추가
   - h1~h6 계층별 크기/색상/구분선
   - 코드 블록·인라인 코드 하이라이트
   - 테이블 줄무늬 행 및 테두리
   - blockquote 왼쪽 accent 라인
   - 목록, 링크, strong/em 스타일
2. `ArtifactViewer.jsx` 수정
   - `prose` 클래스 → `md-content` 클래스로 교체
   - 헤더 우측에 "↓ MD 다운로드" 버튼 추가 (Blob URL 방식으로 `.md` 파일 즉시 다운로드)

**수정 파일**
| 파일 | 작업 |
|------|------|
| `apps/web/src/styles/globals.css` | `.md-content` 마크다운 스타일 추가 |
| `apps/web/src/components/features/artifacts/ArtifactViewer.jsx` | md-content 클래스 적용 + MD 다운로드 버튼 추가 |

**확인 방법**
```
파이프라인 완료 후 각 단계 "보기" 클릭 → 마크다운 렌더링 확인
오른쪽 상단 "↓ MD 다운로드" 클릭 → .md 파일 다운로드 확인
```

---

### 21. ZIP 다운로드 버튼 클릭 시 404 오류 수정

**프롬프트**
```
@errro_msg.txt 오류원인 체크 후 수정해줘
```

**오류 내용**
```
http://localhost:5173/pipeline/undefined/projects/22f1bf4e-.../download
Unexpected Application Error! 404 Not Found
```

**원인**
`PipelinePage.jsx` 다운로드 링크에서 `import.meta.env.VITE_API_URL` 폴백 없음.
`VITE_API_URL` 환경변수 미설정 시 값이 `undefined`(문자열)이 되어
`href="undefined/projects/.../download"` 생성 →
현재 경로(`/pipeline/22f1bf4e.../`) 기준 상대경로로 해석 →
`/pipeline/undefined/projects/.../download` → React Router 404

**수정 내용**
`?? '/api/v1'` 폴백 추가. (`api.js`, `usePipeline.js`는 이미 동일 패턴 적용 중)

**수정 파일**
| 파일 | 작업 |
|------|------|
| `apps/web/src/pages/PipelinePage.jsx` | `VITE_API_URL ?? '/api/v1'` 폴백 추가 |

---

### 20. 파이프라인 생성 즉시 fail — Docker 컨테이너 구버전·잘못된 API 키 수정

**프롬프트**
```
파이프라인 생성시 바로 fail 로 바뀌는데 한번에 수정해줘
```

**원인 추적**
```
failedReason: aborted (Socket.socketCloseListener)
→ 컨테이너 내부 테스트:
   anthropic.AuthenticationError: invalid x-api-key (401)
   LangSmithError: 403 Forbidden
```

| 원인 | 설명 |
|------|------|
| **잘못된 API 키** | `docker-compose.yml`이 호스트 환경변수 `${ANTHROPIC_API_KEY}`를 컨테이너에 전달. 호스트 env에 설정된 키가 만료/무효 상태 |
| **구버전 코드** | 컨테이너가 `docker build` 시점 코드로 실행 중. 이후의 모든 코드 수정 미반영 |
| **LangSmith 오류** | `LANGCHAIN_TRACING_V2: "true"` + 무효 `LANGCHAIN_API_KEY` → 403 에러 |

**수정 내용 (`docker-compose.yml`)**

| 항목 | 변경 전 | 변경 후 |
|------|--------|--------|
| API 키 소스 | `${ANTHROPIC_API_KEY}` (호스트 env) | `env_file: ./apps/pipeline/.env` |
| LangSmith | `LANGCHAIN_TRACING_V2: "true"` | `"false"` |
| 코드 소스 | 빌드 시점 이미지 | `volumes: ./apps/pipeline:/app` (호스트 마운트) |
| 서버 재시작 | 수동 rebuild 필요 | `--reload` 옵션으로 코드 변경 시 자동 반영 |

**수정 파일**
| 파일 | 작업 |
|------|------|
| `docker-compose.yml` | `env_file`, `LANGCHAIN_TRACING_V2`, volumes 마운트, `--reload` 추가 |
| `apps/pipeline/agents/base.py` | `load_dotenv()` 추가 (로컬 실행 대비) |

**검증 결과**
```
[0.1s]  01_idea_analyst running
[34.1s] 01_idea_analyst completed idea_analysis_report.md ✅
[34.1s] 02_planner      running
[88.6s] 02_planner      completed product_requirements.md ✅
```

**향후 컨테이너 재시작 방법**
```bash
docker compose up -d pipeline
# 코드 수정은 --reload가 자동 반영 (rebuild 불필요)
```

---

### 19. 파이프라인 진행상태 저장·복원 기능 개선

**프롬프트**
```
파이프라인 생성시 상태 저장 안되고 진행여부 확인할 수 있는 방법이 없네. 기능 개선 해줘
```

**문제**
1. `agentStatuses`가 Zustand 메모리 → 새로고침/재접속 시 전부 pending으로 리셋
2. SSE 오류 시 재연결 없음 → 상태 공백
3. in-progress 중 페이지 이동 후 복귀 시 현재 단계 파악 불가
4. `pipeline` 상태(running/failed)가 UI에 표시 안 됨

**개선 내용**

| 항목 | 내용 |
|------|------|
| `GET /projects/:id/agent-statuses` | pipeline_logs 기반 에이전트별 최신 상태 반환 신규 엔드포인트 |
| SSE replay 개선 | artifacts 기반 → pipeline_logs 기반으로 교체 (running 상태도 복원) |
| REST 폴링 추가 | `running` 시 3초 간격으로 DB 상태 폴링 → SSE 오류 시에도 상태 유지 |
| 상태 배지 | PipelinePage 헤더에 대기중/실행중(pulse)/완료/실패 배지 표시 |
| project refetchInterval | `completed`만 중단 → `completed \| failed` 모두 중단으로 수정 |

**수정 파일**
| 파일 | 작업 |
|------|------|
| `apps/api/src/repositories/project.repository.js` | `findLogs()` 메서드 추가 |
| `apps/api/src/services/project.service.js` | `getAgentStatuses()` 메서드 추가 |
| `apps/api/src/routes/projects/index.js` | `/agent-statuses` 엔드포인트 추가, SSE replay 개선 |
| `apps/web/src/hooks/usePipeline.js` | DB 상태 복원 쿼리 + effect 추가, SSE 종료 조건 개선 |
| `apps/web/src/pages/PipelinePage.jsx` | 파이프라인 상태 배지 추가 |

**확인 방법**
```
1. 파이프라인 실행 중 페이지 새로고침 → running 중인 에이전트 상태 유지 확인
2. 파이프라인 완료 후 재접속 → 전체 completed 상태 표시 확인
3. 헤더 배지: 대기중(회색) / 실행중(파란색 pulse) / 완료(초록) / 실패(빨강)
4. curl http://localhost:3001/api/v1/projects/{id}/agent-statuses -b cookies.txt
```

---

### 18. agent_artifacts 저장 0건 — pipeline 서버 .env 미로드 수정

**프롬프트**
```
agent_artifacts 테이블 저장관련 정상저장 여부 체크 해줘
```

**원인 추적**
- DB 조회: `agent_artifacts` 0건, 모든 프로젝트 `status=failed`, `currentStep=1`
- 파이프라인 로그: `01_idea_analyst running` 이벤트 후 스트림 즉시 종료
- 직접 테스트: `load_dotenv()` 없이 실행 시 `KeyError: 'ANTHROPIC_API_KEY'` 발생 확인
- **근본 원인: `main.py`에 `load_dotenv()` 호출 없음**
  → uvicorn 시작 시 `.env`를 읽지 않아 `ANTHROPIC_API_KEY` 미설정
  → `run_idea_analyst` 내 `os.environ["ANTHROPIC_API_KEY"]` → `KeyError` → 스트림 종료

**수정 내용**
`main.py` 최상단에 `load_dotenv()` 추가 (기존 `python-dotenv==1.0.1` 설치 확인)

**수정 파일**
| 파일 | 작업 |
|------|------|
| `apps/pipeline/main.py` | `from dotenv import load_dotenv` + `load_dotenv()` 추가 |

**확인 방법 (파이프라인 서버 재시작 필수)**
```powershell
# 기존 서버 종료 후 재시작
cd D:\AI-DATA\TEST1\project\apps\pipeline
.\myenvv\Scripts\Activate.ps1
uvicorn main:app --reload --port 8000
```
```sql
SELECT agent_name, filename, status FROM agent_artifacts ORDER BY created_at;
```

---

### 17. pipeline_logs 테이블 저장 누락 수정

**프롬프트**
```
pipeline_log 테이블에 데이터 저장이 안되는데 확인해줘
```

**원인**
`PipelineLog` Prisma 모델은 스키마에 정의되어 있었지만,
`projectRepository`에 저장 메서드가 없고 `pipeline.worker.js`에서도 호출하는 코드가 전혀 없었음.

**수정 내용**
1. `project.repository.js` — `saveLog({ agentName, eventType, message })` 메서드 추가
2. `pipeline.worker.js` — 매 이벤트마다 `saveLog` 호출:
   - 에이전트 상태 이벤트(`running`/`completed`/`failed`) → eventType=status, message=filename
   - non-JSON 라인(Python 예외 등) → eventType=`error`, message=원문(최대 500자)

**저장되는 eventType 종류**
| eventType | 발생 시점 |
|-----------|----------|
| `running` | 에이전트 시작 시 |
| `completed` | 에이전트 완료 시 (message=파일명) |
| `failed` | 파이프라인 실패 이벤트 수신 시 |
| `error` | Python 예외 등 non-JSON 라인 수신 시 |

**수정 파일**
| 파일 | 작업 |
|------|------|
| `apps/api/src/repositories/project.repository.js` | `saveLog` 메서드 추가 |
| `apps/api/src/workers/pipeline.worker.js` | 이벤트마다 `saveLog` 호출 추가 |

**확인 방법**
```sql
SELECT agent_name, event_type, message, created_at
FROM pipeline_logs
WHERE project_id = '<프로젝트ID>'
ORDER BY created_at;
```

---

### 16. 파이프라인 후반 에이전트 invoke_with_retry 누락 수정

**프롬프트**
```
파이프라인 실제 디비에 저장되게 체크해줘. cli테스트는 진행 잘되네.
```

**원인**
`tester.py`, `deployer.py`, `project_manager.py`가 `llm.ainvoke()` 직접 호출.
Rate Limit(429) 발생 시 예외가 `orchestrator.py`를 타고 올라가 `main.py`가 `failed` 이벤트 전송
→ 워커가 job을 실패 처리 → 앞에서 저장된 artifacts는 DB에 있지만 status=`failed`로 마무리.

**수정 내용**
3개 에이전트 모두 `ainvoke` → `invoke_with_retry` 교체 (429 시 최대 3회, 60초 간격 재시도)

**수정 파일**
| 파일 | 작업 |
|------|------|
| `apps/pipeline/agents/tester.py` | `invoke_with_retry` import 및 5개 호출 교체 |
| `apps/pipeline/agents/deployer.py` | `invoke_with_retry` import 및 4개 호출 교체 |
| `apps/pipeline/agents/project_manager.py` | `invoke_with_retry` import 및 1개 호출 교체 |

**확인 방법**
```
파이프라인 서버 재시작 후 새 프로젝트 생성
→ 전체 완료 시 DB에 26개 artifacts 저장 확인
  (아이디어1, 기획1, 디자인3, 아키텍처4, FE4, BE4, 테스트5, 배포4, PM1 = 27개)
```

---

### 15. 파이프라인 미진행 + 상태 정상표시 + 아웃풋 미표시 복합 수정

**프롬프트**
```
파이프라인이 진행안되는데 상태도 정상으로 표시되고 아웃풋 확인이 전혀 안되고 있으니 확인해보고 수정해줘
```

**원인**

| # | 원인 | 설명 |
|---|------|------|
| 1 | **Python 예외 묻힘** | `main.py`의 `event_stream()`에 try-except 없음 → 에이전트 오류 시 스택트레이스가 plain text로 전송 → 워커 JSON 파싱 실패 → 전부 무시 → `completed` 처리 (아티팩트 0개) |
| 2 | **워커 silent fail** | non-JSON 라인 `catch {}`로 무시 → 아티팩트 없어도 `completed` 처리 → 오류 원인 알 수 없음 |
| 3 | **SSE 재접속 시 상태 공백** | 페이지 재로드·재접속 시 Redis Pub/Sub 이벤트 없음 → 에이전트 상태 전부 pending 표시 → 아웃풋 클릭해도 안 보임 |

**수정 내용**

1. `main.py` — `event_stream()` try-except 추가 → 예외 발생 시 `{"agent":"pipeline","status":"failed","error":"..."}` 이벤트 전송
2. `pipeline.worker.js` — non-JSON 라인 `console.error` 로깅, 아티팩트 카운트 추적, `failed` 이벤트 수신 시 throw, 아티팩트 0개 시 throw
3. `routes/projects/index.js` — SSE 연결 시 기존 DB 아티팩트를 에이전트별 completed 이벤트로 먼저 재전송
4. `usePipeline.js` — artifacts `refetchInterval` stale closure 정리

**수정 파일**
| 파일 | 작업 |
|------|------|
| `apps/pipeline/main.py` | `event_stream()` 예외 처리 추가 |
| `apps/api/src/workers/pipeline.worker.js` | non-JSON 로깅, failed 감지, 빈 아티팩트 감지 |
| `apps/api/src/routes/projects/index.js` | SSE 재접속 시 기존 아티팩트 상태 재전송 |
| `apps/web/src/hooks/usePipeline.js` | `refetchInterval` 단순화 |

**확인 방법**
```
1. 새 프로젝트 생성 → 파이프라인 진행 중 에러 발생 시 status: failed 표시 확인
2. 파이프라인 완료 후 페이지 새로고침 → 에이전트 상태가 completed로 표시 확인
3. 아웃풋 "보기" 클릭 → 내용 표시 확인
```

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
| 2 | **병렬 상태 덮어쓰기 버그** | 병렬 에이전트가 `{**state, ...}` 반환 시 서로의 결과를 덮어씀 → designer 결과가 빈 값으로 저장 |
| 3 | **Docker 컨테이너 다운** | Redis/PostgreSQL Docker 컨테이너 미실행 → ECONNREFUSED |

**수정 내용**

1. `base.py` — `invoke_with_retry()` 추가 (Rate Limit 429 발생 시 최대 3회, 60초 간격 재시도)
2. `orchestrator.py` — Step 3 병렬 머지 버그 수정 (고유 필드만 명시적 갱신), Step 4 병렬→순차 변경
3. `frontend_dev.py`, `backend_dev.py` — `get_smart_llm` → `get_fast_llm` (Haiku) 변경
4. `designer.py`, `architect.py`, `planner.py`, `idea_analyst.py` — `invoke_with_retry` 적용
5. `tests/test_step.py` — Step 3·4 `asyncio.gather` 병렬→순차 변경

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

**확인 방법**
```powershell
# Docker 컨테이너 확인 후
docker-compose up -d postgres redis

# 파이프라인 단계 테스트
cd D:\AI-DATA\TEST1\project\apps\pipeline
.\myenvv\Scripts\Activate.ps1
python tests/test_step.py --step 4
```

---

### 13. 파이프라인 Worker 미시작 + idea_input 누락 수정

**오류 내용**
프로젝트 생성 후 파이프라인이 영원히 `pending` 상태 유지

**원인**
1. `server.js`에 `startPipelineWorker()` 호출 없음 → BullMQ 워커 미작동
2. `pipeline.worker.js`에서 Pipeline 서버 호출 시 `idea_input` 누락 → 400 오류 예정
3. `project.service.js`에서 큐 등록 시 `ideaInput`을 job data에 미포함

**수정 내용**

| 파일 | 수정 내용 |
|------|----------|
| `apps/api/src/server.js` | `startPipelineWorker()` import 및 호출 추가 |
| `apps/api/src/services/project.service.js` | 큐 job data에 `ideaInput` 추가 |
| `apps/api/src/workers/pipeline.worker.js` | `idea_input: ideaInput` Pipeline 서버 전달 추가 |

**확인 방법**
```bash
# API 서버 재시작 후 새 프로젝트 생성
# → status: pending → running → completed 순으로 변경되면 정상
curl http://localhost:3001/api/v1/projects/{id} -b cookies.txt
```

---

### 12. AgentArtifact @@unique 누락 → saveArtifact 500 오류 수정

**오류 내용**
```
:5173/api/v1/projects/{id}/artifacts:1
Failed to load resource: the server responded with a status of 500
```

**원인**
`prisma/schema.prisma`의 `AgentArtifact` 모델에 `@@unique([projectId, agentName, filename])` 제약이 없었음.
`projectRepository.saveArtifact()`가 해당 복합키로 `upsert` 호출 시 Prisma가 unique 제약을 찾지 못해 500 반환.

**수정 내용**
`AgentArtifact` 모델에 `@@unique` 추가 후 `prisma db push` 적용

```prisma
@@unique([projectId, agentName, filename])
```

**수정 파일**
| 파일 | 작업 |
|------|------|
| `apps/api/prisma/schema.prisma` | `@@unique([projectId, agentName, filename])` 추가 |

**확인 방법**
```bash
npx prisma db push --skip-generate
# → "The database is already in sync with the Prisma schema." 확인
```

**비고**
API 서버 재시작 필요 (Prisma 클라이언트 DLL 재로드)

---

### 11. 파이프라인 실행 불가 버그 진단

**프롬프트**
```
http://localhost:5173/pipeline/77c3d9ec-... 사이트 파이프라인 정상 실행여부 체크
```

**진단 결과**
프로젝트 "드론 시뮬레이션 앱2" (`77c3d9ec`) — 상태: `pending`, `currentStep: 0`
→ 파이프라인이 한 번도 실행되지 않은 상태

**발견된 버그**

| 순위 | 버그 | 내용 |
|------|------|------|
| CRITICAL | Worker가 시작되지 않음 | `server.js`에 `startPipelineWorker()` 호출 코드 없음 |
| HIGH | `idea_input` 누락 | `pipeline.worker.js`에서 Pipeline `/run` 호출 시 `project_id`만 전송 |
| MEDIUM | Pipeline 서버 구버전 실행 중 | 이후 추가된 라우트 미반영 — 서버 재시작 필요 |

**수정 파일**
| 파일 | 작업 |
|------|------|
| `apps/api/src/server.js` | `startPipelineWorker()` 호출 추가 |
| `apps/api/src/workers/pipeline.worker.js` | `idea_input` 전달 수정 |

---

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
- `LANGCHAIN_TRACING_V2=false` 로 변경 (즉시 수정)
- `LANGCHAIN_API_KEY` 빈값 처리

**미해결 (사용자 조치 필요)**
`apps/pipeline/.env`의 `ANTHROPIC_API_KEY`를 유효한 키로 교체 필요
→ 발급: console.anthropic.com → API Keys

**수정 파일**
| 파일 | 작업 |
|------|------|
| `apps/pipeline/.env` | `LANGCHAIN_TRACING_V2=false`, `LANGCHAIN_API_KEY` 빈값 |

**확인 방법**
```powershell
# API 키 교체 후
python tests/test_step.py --step 1 --idea "드론 시뮬레이션 테스트 앱"
```

---

## 2026-04-17

### 9. `/api/v1/status` 500 오류 수정

**오류 내용**
```
GET http://localhost:5173/api/v1/status 500 (Internal Server Error)
StatusPage.jsx:14
```

**원인**
`redis.ping()`이 `maxRetriesPerRequest: null` 설정으로 Redis 미실행 시 무한 대기
→ Fastify 요청 타임아웃 → errorHandler가 500 반환
(DB 체크도 동일 위험)

**수정 내용**
`withTimeout(promise, 3000)` 래퍼 추가 — DB/Redis/Pipeline 모두 3초 초과 시 즉시 `ok: false` 반환

**수정 파일**
| 파일 | 작업 |
|------|------|
| `apps/api/src/routes/status/index.js` | `withTimeout` 래퍼 추가 |

**확인 방법**
```
브라우저 → http://localhost:5173/status
→ 각 서비스 정상/오류 카드 표시 (500 없음)
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
# 서버 실행
uvicorn main:app --reload --port 8000

# 1단계까지 실행
curl -X POST http://localhost:8000/run/until/1 `
  -H "Content-Type: application/json" `
  -d '{"project_id":"test-001","idea_input":"반려동물 건강관리 앱"}'

# 2단계까지 실행
curl -X POST http://localhost:8000/run/until/2 `
  -d '{"project_id":"test-001","idea_input":"반려동물 건강관리 앱"}'
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
