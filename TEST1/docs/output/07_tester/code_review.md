# 코드 리뷰 체크리스트 — AgileFlow

## 보안
- [x] SQL Injection 방지 (Prisma parameterized queries 사용)
- [x] JWT HttpOnly Cookie 전송
- [x] Docker Sandbox로 생성 코드 격리 실행
- [x] ANTHROPIC_API_KEY 환경 변수 처리 (소스코드 미포함)
- [x] CORS 화이트리스트 설정 (WEB_ORIGIN)
- [ ] Rate Limiting — 파이프라인 시작 API에 IP 기반 제한 추가 필요 (기술 부채)
- [x] 파일 업로드 없음

## 성능
- [x] BullMQ 비동기 큐로 파이프라인 실행 분리
- [x] SSE 기반 실시간 스트리밍 (WebSocket 불필요)
- [x] LangGraph 병렬 단계(Step 3, 4)로 전체 실행 시간 단축
- [ ] LangSmith 캐싱 — 동일 아이디어 재실행 시 캐시 활용 검토 필요

## 코드 품질
- [x] 서비스/레포지터리 레이어 분리
- [x] AppError 중앙 집중식 에러 처리
- [x] 에이전트 간 통신 JSON 스키마 정의
- [x] React 컴포넌트 단일 책임 원칙 준수
- [ ] 백엔드 스키마 backend_schema.md 누락 → 추가 작성 필요 (기술 부채)
