# 작업내역 — AgileFlow

- 날짜: 2026-04-21
- 작업 디렉토리: D:\AI-DATA\TEST1\
- 대상 프로젝트: D:\AI-DATA\TEST1\project

---

## 작업 요약

2026-04-21 세션에서 다음 3개 흐름을 연속으로 작업했다.

1. 프로젝트 ZIP 다운로드 기능을 실제 개발 산출물 중심으로 재구성
2. 수동 파이프라인 실패 시 우측 패널에 실패 해결책 분석 결과가 표시되도록 수정
3. 실패한 프로젝트만 삭제할 수 있는 삭제 버튼 및 API 추가

---

## 1. 프로젝트 ZIP 다운로드 기능 보강

### 프롬프트

```text
프로젝트 다운로드 버튼 동작시켜줘. 파이프라인으로 생성한 개발 소스들 패키지 묶어서 README.md 사용설명서 추가해서 zip 다운로드 받는거야. 체크시작.
```

### 작업내용

- 기존 다운로드 기능은 문서성 산출물 위주로 묶여 있어 실제 생성된 개발 결과물을 바로 활용하기 어려운 구조였다.
- 파이프라인 산출물이 Markdown 내부 코드펜스 형태로 저장된다는 점을 기준으로, 산출물에서 실제 파일을 복원해 ZIP에 포함하는 방식으로 패키징 전략을 재설계했다.
- ZIP 내부에 다음 구성을 만들도록 정리했다.
  - 루트 README.md: 패키지 사용법, 생성물 성격, 주의사항 안내
  - INDEX.md: 어떤 산출물이 어떤 경로로 복원되었는지 인덱스 제공
  - docs/: 문서 산출물 정리본
  - generated/frontend/: 프론트엔드 관련 복원 파일
  - generated/backend/: 백엔드 관련 복원 파일
- 파일 경로 파싱 시 경로 traversal, 중복 파일명, 비정상 fence 범위 같은 예외를 방어하도록 보강했다.
- 다운로드 전송 과정에서 발생하던 스트림 타이밍 문제를 제거하기 위해 ZIP을 메모리 버퍼로 완성한 뒤 응답하는 방식으로 고정했다.
- 한글 프로젝트 제목으로 다운로드 시 `Content-Disposition` 헤더에서 오류가 나던 문제를 막기 위해 ASCII fallback 파일명과 UTF-8 `filename*` 헤더를 같이 사용하도록 정리했다.
- 실사용 검증 기준으로 실제 프로젝트 다운로드가 가능하도록 25MB 제한, 에러 핸들링, 브라우저 fetch + Blob 다운로드 흐름까지 점검했다.

### 수정 파일

| 파일 | 작업 |
|------|------|
| `project/apps/api/src/utils/projectPackage.js` | 신규 생성, 패키지 엔트리/파일 복원 로직 구현 |
| `project/apps/api/src/utils/projectPackage.test.js` | 신규 생성, 패키지 파싱/보안/중복 처리 테스트 추가 |
| `project/apps/api/src/routes/projects/index.js` | ZIP 다운로드 라우트 개선, 버퍼 응답 및 한글 파일명 처리 |
| `project/apps/web/src/pages/PipelinePage.jsx` | 다운로드 버튼 fetch + Blob 처리 및 오류 표시 |

### 검증

- 실제 완료 프로젝트를 대상으로 ZIP 다운로드 응답 200 확인
- ZIP 내부에 README.md, INDEX.md, docs/, generated/backend/, generated/frontend/ 구조 포함 확인
- `npx vitest run src/utils/projectPackage.test.js` 기준 패키지 관련 테스트 통과

---

## 2. 파이프라인 실패 해결책 표시 개선

### 프롬프트

```text
파이프라인 수동진행시 우측에 실패사유 나오고 아래에 "해결책 분석중..". 이렇게만 나오는데 분석결과도 보여줘.
```

### 작업내용

- 문제를 프론트, API, 파이프라인 서버로 분리해서 조사한 결과, 프론트는 이미 실패 사유와 해결책을 렌더링할 준비가 되어 있었고, 파이프라인 서버도 `solution` 이벤트를 생성하고 있었다.
- 실제 원인은 API 워커가 NDJSON 스트림에서 `pipeline:failed` 이벤트를 읽는 즉시 예외를 던져 스트림 소비를 중단하는 구조였다.
- 이 때문에 직후에 전송되는 `pipeline:solution` 이벤트가 DB 로그에 저장되지 못했고, 프론트는 계속 "해결책 분석 중..." 상태로 남았다.
- 이를 해결하기 위해 스트림 파서를 `consumePipelineStream()` 헬퍼로 분리했다.
- 새 스트림 소비 로직은 다음을 보장한다.
  - 부분 청크 버퍼링 처리
  - 잘못된 JSON 라인 무시 및 에러 로그 기록
  - `failed` 이벤트 이후에도 계속 읽기
  - 뒤이어 오는 `solution` 이벤트 저장
  - 스트림 소비를 끝낸 뒤에만 최종 실패 예외 발생
- 이 변경으로 실패 상태는 유지하면서도, 해결책 분석 결과가 DB 로그와 UI 조회 흐름에 정상 반영되도록 정리했다.

### 수정 파일

| 파일 | 작업 |
|------|------|
| `project/apps/api/src/workers/pipeline.worker.js` | NDJSON 스트림 소비 로직 분리, 실패 후 solution 이벤트까지 처리 |
| `project/apps/api/src/workers/pipeline.worker.test.js` | 신규 생성, failed 이후 solution 유지/부분 청크/오염 라인 테스트 추가 |

### 검증

- `npx vitest run src/workers/pipeline.worker.test.js` 통과
- 워커 파일 오류 없음 확인
- 프론트 수정 없이 기존 실패 패널 렌더링 로직으로 해결책 표시 가능 상태 확보

---

## 3. 실패 프로젝트 삭제 버튼 추가

### 프롬프트

```text
실패프로젝트 삭제버튼 만들어줘
```

### 작업내용

- 삭제 동선은 가장 자연스러운 위치인 파이프라인 상세 화면 상단에 배치했다.
- 버튼은 프로젝트 상태가 `failed`일 때만 노출되도록 제한했다.
- 삭제 실행 전 브라우저 확인창을 띄워 실수 삭제를 한 번 더 막았다.
- 삭제 성공 시 현재 프로젝트 관련 React Query 캐시를 제거하고 프로젝트 목록 쿼리를 무효화한 뒤 `/projects` 화면으로 이동하도록 처리했다.
- 서버는 `DELETE /projects/:id` 라우트를 추가했다.
- 서비스 계층에서 다음 정책을 강제했다.
  - 본인 프로젝트만 삭제 가능
  - `failed` 상태 프로젝트만 삭제 가능
  - 삭제 전 BullMQ 큐에서 해당 프로젝트의 waiting/delayed/active 잡 제거
  - Redis `skip_steps` 키 정리
  - Prisma cascade 삭제로 artifacts/logs 동시 정리
- 테스트는 TDD 방식으로 먼저 작성했고, 이후 서비스 구현을 맞춰 통과시켰다.
- 서비스 테스트에는 정상 삭제, 실패 상태가 아닌 프로젝트 거부, 타 유저 프로젝트 거부, 없는 프로젝트 거부 케이스를 포함했다.

### 수정 파일

| 파일 | 작업 |
|------|------|
| `project/apps/api/src/repositories/project.repository.js` | `deleteById()` 추가 |
| `project/apps/api/src/services/project.service.js` | `deleteFailedProject()` 추가, BullMQ/Redis 정리 포함 |
| `project/apps/api/src/services/project.service.test.js` | 신규 생성, 삭제 정책 테스트 4건 추가 |
| `project/apps/api/src/routes/projects/index.js` | `DELETE /:id` 라우트 추가 |
| `project/apps/web/src/hooks/usePipeline.js` | `deleteProject()` 훅 추가 및 관련 캐시 제거 |
| `project/apps/web/src/pages/PipelinePage.jsx` | 실패 상태에서만 삭제 버튼 노출 및 삭제 후 목록 이동 |

### 검증

- `npx vitest run src/services/project.service.test.js` 통과
- `npm run build` in `project/apps/web` 통과
- 변경 파일 정적 오류 없음 확인

---

## 최종 정리

이번 세션에서는 다운로드, 실패 분석 표시, 실패 프로젝트 삭제까지 사용자 흐름 3개를 이어서 정비했다.

- 다운로드는 문서 ZIP이 아니라 실제 생성 코드가 포함된 패키지로 정리했다.
- 실패 분석은 파이프라인 서버가 만든 해결책이 워커 중단 때문에 사라지던 문제를 수정했다.
- 실패 프로젝트는 UI 버튼과 서버 정책을 함께 추가해 안전하게 삭제할 수 있게 만들었다.

## 세션 중 사용된 주요 검증 명령

```bash
cd D:\AI-DATA\TEST1\project\apps\api
npx vitest run src/workers/pipeline.worker.test.js
npx vitest run src/services/project.service.test.js

cd D:\AI-DATA\TEST1\project\apps\web
npm run build
```