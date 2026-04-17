# 테스트 전략 — AgileFlow

## 테스트 피라미드
```
        /     E2E (Playwright)     \     ← 핵심 시나리오 7개
       /  Integration (Supertest)   \   ← API 전체 엔드포인트
      /   Unit Tests (Vitest)        \  ← 서비스/유틸 80%+ 커버리지
```

## 커버리지 목표
- 단위 테스트: 80%+ (services, repositories, utils)
- 통합 테스트: 모든 API 엔드포인트 (12개)
- E2E: 핵심 사용자 흐름 7개 시나리오

## 테스트 도구
| 영역 | 도구 |
|------|------|
| 백엔드 단위/통합 | Vitest + Supertest |
| 프론트엔드 단위 | Vitest + Testing Library |
| E2E | Playwright |
| Mock | MSW (API Mock) |
| 커버리지 | c8 |

## 테스트 환경
- 테스트 DB: Docker 격리 PostgreSQL (TEST_DATABASE_URL)
- Python LangGraph: MSW로 Mock
- 각 테스트 전후 DB 초기화 (beforeEach/afterEach)
