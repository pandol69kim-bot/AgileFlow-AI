# 디자인 시스템 — AgileFlow

## 1. 비주얼 방향
**Dark Luxury + Terminal Aesthetic** — AI 파이프라인 실행 모니터를 연상시키는 다크 테마.
코드/터미널 감성 + 고급스러운 컬러 액센트.

---

## 2. 컬러 팔레트

### Primary (Brand Indigo)
- primary-50: #EEF2FF
- primary-100: #E0E7FF
- primary-400: #818CF8
- primary-500: #6366F1 (메인 액센트)
- primary-600: #4F46E5 (호버)
- primary-900: #312E81

### Surface (Dark Backgrounds)
- surface-base: #0A0A0F (최하단 배경)
- surface-raised: #111118 (카드 배경)
- surface-overlay: #1C1C27 (모달, 드롭다운)
- surface-border: #2A2A3A (구분선)

### Semantic
- success: #10B981 (단계 완료)
- warning: #F59E0B (진행 중)
- error: #EF4444 (실패)
- info: #3B82F6 (정보)

### Text
- text-primary: #F1F5F9
- text-secondary: #94A3B8
- text-muted: #475569

---

## 3. 타이포그래피

| Level | Size | Weight | Font | 용도 |
|-------|------|--------|------|------|
| h1 | 32px | 700 | Inter | 페이지 제목 |
| h2 | 24px | 600 | Inter | 섹션 제목 |
| h3 | 18px | 600 | Inter | 카드 제목 |
| body1 | 15px | 400 | Inter | 본문 |
| body2 | 13px | 400 | Inter | 보조 텍스트 |
| code | 13px | 400 | JetBrains Mono | 코드, 에이전트 출력 |
| caption | 11px | 400 | Inter | 레이블, 배지 |

---

## 4. 스페이싱 (4px 기준)
- xs: 4px | sm: 8px | md: 16px | lg: 24px | xl: 32px | 2xl: 48px | 3xl: 64px

## 5. 브레이크포인트
- mobile: 0~639px | tablet: 640~1023px | desktop: 1024px+

## 6. 컴포넌트 상태 색상
- 에이전트 PENDING: text-muted + surface-raised
- 에이전트 RUNNING: warning (애니메이션 펄스)
- 에이전트 COMPLETED: success
- 에이전트 FAILED: error

## 7. 그림자
- card: 0 0 0 1px surface-border
- elevated: 0 4px 24px rgba(0,0,0,0.4)
- glow-primary: 0 0 16px rgba(99,102,241,0.3)
