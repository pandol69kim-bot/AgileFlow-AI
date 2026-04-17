# 모니터링 & 알림 — AgileFlow

## LangSmith 에이전트 트레이싱
- 모든 LangGraph 실행 자동 추적
- 에이전트별 토큰 사용량, 지연 시간, 오류율 대시보드
- 프로젝트별 실행 비용 집계

## Sentry 에러 트래킹
```js
// apps/api/src/plugins/sentry.js
import * as Sentry from '@sentry/node';
Sentry.init({ dsn: process.env.SENTRY_DSN, tracesSampleRate: 0.1 });
```

## 헬스체크
```
GET /health → { status: "ok", version: "1.0.0", uptime: 3600, db: "ok", redis: "ok", pipeline: "ok" }
```

## 알림 규칙
| 조건 | 채널 | 심각도 |
|------|------|--------|
| 파이프라인 실패율 > 10%/1시간 | Slack #alerts | Critical |
| 에이전트 평균 응답 > 60초 | Slack #alerts | Warning |
| API 5xx > 5회/분 | Slack #alerts | Critical |
| LLM 토큰 일일 예산 80% 초과 | Slack #cost | Warning |
| DB 연결 실패 | Slack + PagerDuty | Critical |
