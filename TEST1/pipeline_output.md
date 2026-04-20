# AgileFlow 파이프라인 산출물

**프로젝트 ID**: `test-all`  
**아이디어**: Hello Wordl 앱만들기

---

## 1. 아이디어 분석 보고서

# Hello World 앱 프로젝트 정의서

## 1. 프로젝트 개요

### 프로젝트명
**Hello World** - 프로그래밍 초보자를 위한 코딩 학습 플랫폼

### 한줄 설명
"첫 번째 코드 한 줄부터 시작하는 프로그래밍 학습 앱"

### 핵심 가치
- **진입장벽 극소화**: 설치 없이 웹/앱에서 즉시 코딩 시작
- **성취감 극대화**: 작은 성공 경험을 통한 동기 부여
- **실시간 피드백**: 코드 실행 결과를 즉시 확인하며 학습

---

## 2. 타겟 사용자

### 페르소나 1: 대학생 '김준호' (20대 초반)
- **배경**: 전공 전환으로 프로그래밍 배우기 시작
- **니즈**: 기초부터 차근차근 배우고 싶음, 가성비 좋은 학습 도구
- **페인포인트**: 복잡한 개발 환경 설정, 비싼 강의료, 혼자 공부할 때 답답함

### 페르소나 2: 직장인 '박수진' (30대 중반)
- **배경**: 업무 효율화를 위해 스크립트 배우려는 마케팅 담당자
- **니즈**: 짧은 시간에 실용적인 코딩 지식, 모바일로 언제든 학습 가능
- **페인포인트**: 시간 부족, 복잡한 문법, 실무 연결성 불명확

### 페르소나 3: 중학생 '이준영' (14세)
- **배경**: 게임 개발에 관심 있는 프로그래밍 입문자
- **니즈**: 재미있는 학습, 눈에 보이는 결과물, 커뮤니티 활동
- **페인포인트**: 이해하기 어려운 설명, 너무 긴 강좌, 따라하다 막힐 때 도움 없음

---

## 3. 핵심 기능 목록

### MVP v1.0 (6-8개월, 최소 실행 제품)

#### 핵심 기능
- **온라인 코드 에디터**
  - Python, JavaScript 2개 언어 지원
  - 신택스 하이라이팅, 자동완성 기본 기능
  - 실행/결과 표시 (최대 5초 실행 제한)

- **체계적인 커리큘럼**
  - 30개의 기초 과제 (1개당 5~10분)
  - 단계별 진도 (Beginner → Basic → Intermediate)
  - 개념 설명 + 예제 + 실습 구조

- **학습 진도 추적**
  - 완료한 과제 목록 및 진행률
  - 간단한 레벨/배지 시스템
  - 학습 통계 (학습 시간, 실행 횟수)

- **기본 피드백 시스템**
  - 자동 정답 검사 (테스트 케이스 기반)
  - 힌트 제공 (선택적)
  - 오류 메시지 친절하게 설명

- **사용자 계정**
  - 이메일/소셜 회원가입
  - 학습 데이터 저장 및 복구

#### 지원 환경
- 웹 앱 (반응형 디자인)
- iOS/Android 모바일 앱 (웹 래퍼 고려)

---

### 확장 기능 v2.0+ (이후 분기)

#### Phase 2.1 (3-4개월)
- 추가 언어 지원 (Java, C++)
- 커뮤니티 기능 (질문 게시판, 댓글)
- 사용자 작성 과제 (UGC)
- 프로젝트 기반 학습 (작은 미니 프로젝트 5개)

#### Phase 2.2 (이후)
- AI 기반 개인화 커리큘럼
- 라이브 코딩 세션/튜터링
- 기업 연계 채용 정보
- 오프라인 워크숍 연동
- 인증서/크레딧 발급

---

## 4. 경쟁 분석

| 서비스 | 강점 | 약점 | 우리의 차별점 |
|--------|------|------|--------------|
| **Codecademy** | 체계적 커리큘럼, 큰 커뮤니티 | 유료, 높은 진입장벽, 설명 길음 | 무료, 초단위 레슨, 즉시 실행 피드백 |
| **HackerRank** | 많은 문제, 기업 채용 연계 | 경쟁 위주, 초보자 어려움 | 학습 중심, 단계적 난이도, 친절한 설명 |
| **SoloLearn** | 모바일 최적화, 게임화 | 깊이 부족, 커뮤니티 품질 | 웹+모바일 통합, 더 나은 에디터 환경 |

**우리의 포지셀: "쉽고 재밌는 프로그래밍 첫걸음"**
- 초보자 최적화 (너무 쉽지 않으면서도 도달 가능)
- 빠른 성취감 (작은 과제들의 누적)
- 100% 무료 모델 (광고 또는 기업 후원)

---

## 5. 기술 리스크 & 제약사항

### 기술 리스크

| 리스크 | 심각도 | 대응방안 |
|--------|--------|---------|
| 코드 실행 보안 (악성 코드) | **높음** | 샌드박스 환경(Docker), 실행 시간/메모리 제한 |
| 서버 비용 (사용자 증가) | 중간 | 캐싱 전략, CDN 활용, 초기 시드 서버 제한 |
| 멀티 언어 지원 복잡도 | 중간 | Codechef/Judge0 같은 오픈소스 API 활용 |
| 모바일 앱 유지보수 | 중간 | React Native 또는 PWA로 단일 코드베이스 관리 |
| 초기 사용자 확보 | **높음** | 교육기관 파트너십, SNS/유튜브 마케팅, 베타 테스터 프로그램 |

### 제약사항
- **V1에서 제외할 기능**
  - 데이터베이스 학습 (DB 설치 필요)
  - 웹 프론트엔드 심화 (HTML/CSS/DOM 제외)
  - 게임 개발 (별도 라이브러리 필요)
  - 실시간 협업 코딩

---

## 6. 프로젝트 규모 판단

### 규모
| 항목 | 평가 | 이유 |
|------|------|------|
| **개발 기간** | **6-8개월** | 백엔드 3개월, 프론트엔드 3개월, QA/배포 1-2개월 |
| **팀 규모** | **8-10명** | 백엔드 3명, 프론트엔드 2명, 모바일 2명, PM/디자인/QA 2명 |
| **개발 비용** | **$80K-120K** | 급여, 인프라, 3rd-party API |

### 난이도
**중상(Medium-High)**
- ✅ 코드 에디터 및 실행 엔진 연동이 핵심 (기술적 도전)
- ✅ 초보자 UX 설계 (비즈니스 도전)
- ✅ 스케일링 (성장 시)

### 권장 기술 스택

#### 백엔드
```
- 런타임: Node.js (Express.js) 또는 Python (FastAPI)
- 코드 실행: Docker + Judge0 API (오픈소스 활용)
- DB: PostgreSQL (사용자, 과제, 진도 관리)
- 캐싱: Redis (세션, 학습 통계)
- 클라우드: AWS (EC2, RDS, S3)
```

#### 프론트엔드 (웹)
```
- 프레임워크: React.js (UI 재사용성)
- 에디터: Monaco Editor 또는 CodeMirror
- 상태관리: Redux 또는 Zustand
- 스타일: Tailwind CSS (빠른 개발)
```

#### 모바일
```
- React Native 또는 Flutter (크로스플랫폼)
- 또는 PWA (웹 래퍼) - 초기 빠른 출시
```

#### DevOps & 모니터링
```
- CI/CD: GitHub Actions / GitLab CI
- 모니터링: Sentry, DataDog
- 분석: Mixpanel, Google Analytics
```

---

## 추가 권장사항

### 우선순위
1. **Phase 1**: Python만 지원, 간단한 실습 문제 20개
2. **Phase 2** (2개월 후): JavaScript 추가, 30개로 확대
3. **Phase 3** (4개월 후): 커뮤니티 기능, 프로젝트 학습

### 성공 지표 (KPI)
- **V1 출시 6개월**: 10,000 가입자
- **6개월 후**: 월 활성 사용자 3,000명 이상
- **완료율**: 5개 과제 이상 완료 사용자 20% 이상
- **재방문율**: 7일 활성 사용자율 30% 이상

### 자금 조달 전략
- 시드 라운드: $500K (초기 개발 + 마케팅)
- 수익화 (이후): B2B 엔터프라이즈 버전, 기업 교육 라이선싱

---

**결론**: 실현 가능하고 명확한 목표를 가진 프로젝트. MVP 완성 후 사용자 피드백 기반으로 확장하는 것을 권장합니다.

---

## 2. 상품 기획서 (PRD)

# Hello World 앱 - 상세 기획서 (PRD)

**문서 버전**: v1.0  
**작성일**: 2025년 1월  
**작성자**: Product Manager  
**검토 대상**: 개발팀, 디자인팀, 경영진  
**상태**: Draft → Review 대기

---

## 목차

1. [제품 비전 & KPI](#1-제품-비전--kpi)
2. [기능 요구사항 (Epic별 User Story)](#2-기능-요구사항-epic별-user-story)
3. [비기능 요구사항](#3-비기능-요구사항)
4. [화면 목록 & 흐름](#4-화면-목록--흐름)
5. [데이터 모델](#5-데이터-모델)
6. [API 명세 초안](#6-api-명세-초안)
7. [마일스톤](#7-마일스톤)

---

## 1. 제품 비전 & KPI

### 1.1 제품 비전

> **"누구나 첫 번째 코드 한 줄을 성공적으로 실행하는 경험을 통해, 프로그래밍에 대한 두려움을 없애고 지속적인 학습 동기를 만든다."**

#### 비전 선언문

Hello World는 프로그래밍을 시작하고 싶지만 어디서부터 시작해야 할지 모르는 초보자를 위한 플랫폼입니다. 복잡한 개발 환경 설정 없이 브라우저에서 즉시 코딩을 시작하고, 5~10분 단위의 짧은 과제를 통해 작은 성공을 반복하며 성장하는 경험을 제공합니다.

#### 포지셔닝

```
경쟁사 대비 포지셔닝 맵

          [깊이 있는 학습]
               ↑
    HackerRank |  Codecademy
               |
[어려움] ------+------ [쉬움]
               |
               | ← Hello World (초보자 최적화 + 즉시 성취감)
    SoloLearn  |
               ↓
          [가벼운 학습]
```

| 구분 | 내용 |
|------|------|
| **타겟** | 프로그래밍 완전 초보자 (10대~30대) |
| **핵심 가치** | 설치 없이 즉시 시작 → 5분 내 첫 성공 경험 |
| **수익 모델** | 무료(광고/후원) → 추후 B2B 기업 교육 라이선싱 |
| **경쟁 우위** | 초보자 UX 최적화 + 실시간 코드 실행 + 무료 |

---

### 1.2 목표 사용자 (페르소나 요약)

| 페르소나 | 핵심 니즈 | 핵심 페인포인트 | 설계 원칙 반영 |
|----------|----------|---------------|--------------|
| **김준호** (20대 대학생) | 기초부터 차근차근, 가성비 | 환경 설정 어려움, 비싼 강의 | 무료 + 즉시 실행 환경 |
| **박수진** (30대 직장인) | 짧은 시간, 실용적 학습 | 시간 부족, 실무 연결성 불명확 | 5~10분 단위 마이크로 레슨 |
| **이준영** (14세 중학생) | 재미, 눈에 보이는 결과 | 어려운 설명, 막힐 때 도움 없음 | 게임화 + 힌트 시스템 |

---

### 1.3 성공 지표 (KPI)

#### North Star Metric

> **"5개 이상 과제를 완료한 월간 활성 사용자 수 (MAU with 5+ completions)"**
> 
> 이 지표가 올라간다는 것은 단순 가입이 아닌, 실제 학습 경험이 유의미하게 이루어지고 있다는 의미입니다.

#### 단계별 KPI 목표

**MVP 출시 기준 (v1.0 출시 후 3개월)**

| 지표 | 목표 | 측정 방법 |
|------|------|----------|
| 누적 가입자 수 | 3,000명 | DB 사용자 테이블 COUNT |
| 첫 과제 완료율 | 60% 이상 | 완료 이벤트 / 첫 접속 이벤트 |
| 7일 재방문율 (Day 7 Retention) | 20% 이상 | 가입 7일 후 재접속 비율 |
| 평균 세션 시간 | 15분 이상 | 세션 시작~종료 시간 차이 |

**v1.0 출시 6개월 목표**

| 지표 | 목표 | 측정 방법 |
|------|------|----------|
| 누적 가입자 수 | 10,000명 | DB COUNT |
| MAU (월간 활성 사용자) | 3,000명 이상 | 30일 내 1회 이상 접속 |
| 5개 이상 과제 완료 사용자 비율 | 20% 이상 | 완료 수 ≥ 5 사용자 / 전체 사용자 |
| 7일 재방문율 | 30% 이상 | Mixpanel 코호트 분석 |
| NPS (순추천지수) | 40 이상 | 인앱 설문 (10점 척도) |

**v2.0 확장 목표 (출시 12개월)**

| 지표 | 목표 | 비고 |
|------|------|------|
| MAU | 15,000명 | 커뮤니티 기능 추가 효과 |
| 30일 재방문율 | 40% 이상 | — |
| B2B 파일럿 계약 | 3건 이상 | 기업/교육기관 |
| 과제 완료 총 횟수 | 100,000회 | 누적 플랫폼 활성도 |

#### 가드레일 지표 (하락 시 즉시 조치)

| 지표 | 임계값 | 의미 |
|------|--------|------|
| 코드 실행 평균 응답시간 | > 3초 | 서버 스케일링 필요 |
| 오류 실행 비율 | > 30% | 과제 난이도 재검토 필요 |
| Day 1 이탈율 | > 80% | 온보딩 UX 개선 필요 |
| 에디터 크래시율 | > 1% | 즉시 핫픽스 배포 |

---

## 2. 기능 요구사항 (Epic별 User Story)

### Epic 구조 개요

```
Epic 1: 사용자 인증 & 계정 관리
Epic 2: 온보딩 & 커리큘럼 탐색
Epic 3: 코드 에디터 & 실행 환경
Epic 4: 학습 과제 시스템
Epic 5: 진도 추적 & 게임화
Epic 6: 피드백 & 힌트 시스템
Epic 7: 관리자 기능 (Admin)
```

**MVP 포함 여부 표시**: ✅ MVP 포함 / 🔄 v2.0 확장

---

### Epic 1: 사용자 인증 & 계정 관리

**Epic 목표**: 사용자가 안전하게 계정을 생성하고, 학습 데이터를 어느 기기에서든 이어서 활용할 수 있다.

#### User Stories

**US-101** ✅ MVP
```
As a 신규 방문자,
I want to 이메일과 비밀번호로 30초 이내에 계정을 만들고 싶다,
So that 학습 진도를 저장하고 언제든 이어서 학습할 수 있다.
```

**인수 조건 (Acceptance Criteria)**:
- [ ] 이메일 형식 유효성 검사 (실시간)
- [ ] 비밀번호 최소 8자, 영문+숫자 조합 필수
- [ ] 가입 완료 후 이메일 인증 링크 발송 (24시간 유효)
- [ ] 가입 완료 즉시 학습 대시보드로 이동
- [ ] 이미 사용 중인 이메일 입력 시 명확한 오류 메시지 표시

---

**US-102** ✅ MVP
```
As a 기존 사용자,
I want to 구글/카카오 소셜 계정으로 1클릭 로그인하고 싶다,
So that 비밀번호를 기억하지 않아도 빠르게 접속할 수 있다.
```

**인수 조건**:
- [ ] Google OAuth 2.0 연동
- [ ] Kakao OAuth 연동
- [ ] 소셜 로그인 첫 사용 시 자동 계정 생성
- [ ] 기존 이메일 계정과 소셜 계정 연동 가능
- [ ] 로그인 실패 시 원인 명확히 안내 (계정 없음 / 비밀번호 오류 구분)

---

**US-103** ✅ MVP
```
As a 로그인한 사용자,
I want to 내 프로필(닉네임, 아바타)을 설정하고 싶다,
So that 커뮤니티에서 나를 표현하고 학습 동기를 높일 수 있다.
```

**인수 조건**:
- [ ] 닉네임 2~20자, 특수문자 제한
- [ ] 기본 아바타 8종 제공 (이미지 업로드는 v2.0)
- [ ] 닉네임 중복 실시간 확인
- [ ] 프로필 설정 건너뛰기 가능 (기본값 자동 설정)

---

**US-104** ✅ MVP
```
As a 비밀번호를 잊은 사용자,
I want to 이메일로 비밀번호 재설정 링크를 받고 싶다,
So that 계정에 다시 접속하고 학습을 이어갈 수 있다.
```

**인수 조건**:
- [ ] 재설정 링크 유효시간 1시간
- [ ] 링크 1회 사용 후 만료
- [ ] 재설정 완료 시 기존 세션 전체 만료

---

**US-105** 🔄 v2.0
```
As a 학부모/교사,
I want to 자녀/학생 계정을 관리하고 학습 현황을 모니터링하고 싶다,
So that 안전한 학습 환경을 제공하고 학습 지도를 할 수 있다.
```

---

### Epic 2: 온보딩 & 커리큘럼 탐색

**Epic 목표**: 처음 접속한 사용자가 5분 이내에 첫 번째 과제를 실행하고 성공 경험을 갖는다.

#### User Stories

**US-201** ✅ MVP
```
As a 처음 가입한 신규 사용자,
I want to 3단계 이내의 간단한 온보딩을 통해 나에게 맞는 학습 경로를 추천받고 싶다,
So that 어디서부터 시작해야 할지 막막하지 않고 바로 학습을 시작할 수 있다.
```

**인수 조건**:
- [ ] 온보딩 질문 최대 3개: ①학습 목적, ②경험 수준, ③선호 언어
- [ ] 답변에 따라 Python 또는 JavaScript 커리큘럼 자동 추천
- [ ] 온보딩 건너뛰기 시 Python Beginner 기본 추천
- [ ] 온보딩 완료 후 "첫 과제 바로 시작" CTA 버튼 표시
- [ ] 온보딩 소요시간 60초 이내 (UX 테스트 기준)

---

**US-202** ✅ MVP
```
As a 학습 중인 사용자,
I want to 커리큘럼 전체 구조와 내 현재 위치를 한눈에 보고 싶다,
So that 얼마나 진행했는지 파악하고 다음 목표를 설정할 수 있다.
```

**인수 조건**:
- [ ] 커리큘럼 맵: Beginner(10개) → Basic(10개) → Intermediate(10개)
- [ ] 완료 과제: 초록색 체크, 현재 과제: 강조 표시, 미완료: 잠금 아이콘
- [ ] 각 과제에 예상 소요시간 표시 (5분 / 10분)
- [ ] 현재 단계 완료율 퍼센트 표시
- [ ] 다음 추천 과제로 1클릭 이동 가능

---

**US-203** ✅ MVP
```
As a 학습 중인 사용자,
I want to Python과 JavaScript 중 내가 배우고 싶은 언어를 선택하고 싶다,
So that 나의 목표에 

---

## 3a. 디자인 시스템

# Hello World 디자인 시스템 v1.0
## 다크 테마 기반 Tailwind CSS 호환

---

## 1. 색상 팔레트 (Color Palette)

### 1.1 기본 색상 체계

```css
/* Primary Color: 학습 활동성과 신뢰감 */
--color-primary-50: #f0f9ff   /* rgb(240, 249, 255) */
--color-primary-100: #e0f2fe  /* rgb(224, 242, 254) */
--color-primary-200: #bae6fd  /* rgb(186, 230, 253) */
--color-primary-300: #7dd3fc  /* rgb(125, 211, 252) */
--color-primary-400: #38bdf8  /* rgb(56, 189, 248) */
--color-primary-500: #0ea5e9  /* rgb(14, 165, 233) - 주 색상 */
--color-primary-600: #0284c7  /* rgb(2, 132, 199) */
--color-primary-700: #0369a1  /* rgb(3, 105, 161) */
--color-primary-800: #075985  /* rgb(7, 89, 133) */
--color-primary-900: #0c3d66  /* rgb(12, 61, 102) */

/* Secondary Color: 성취감과 긍정 */
--color-success-50: #f0fdf4   /* rgb(240, 253, 244) */
--color-success-100: #dcfce7  /* rgb(220, 252, 231) */
--color-success-200: #bbf7d0  /* rgb(187, 247, 208) */
--color-success-300: #86efac  /* rgb(134, 239, 172) */
--color-success-400: #4ade80  /* rgb(74, 222, 128) */
--color-success-500: #22c55e  /* rgb(34, 197, 94) - 완료/성공 */
--color-success-600: #16a34a  /* rgb(22, 163, 74) */
--color-success-700: #15803d  /* rgb(21, 128, 61) */
--color-success-800: #166534  /* rgb(22, 101, 52) */
--color-success-900: #134e4a  /* rgb(19, 78, 74) */

/* Warning Color: 주의/에러 경고 */
--color-warning-50: #fffbeb   /* rgb(255, 251, 235) */
--color-warning-100: #fef3c7  /* rgb(254, 243, 199) */
--color-warning-200: #fde68a  /* rgb(253, 230, 138) */
--color-warning-300: #fcd34d  /* rgb(252, 211, 77) */
--color-warning-400: #fbbf24  /* rgb(251, 191, 36) */
--color-warning-500: #f59e0b  /* rgb(245, 158, 11) - 경고 */
--color-warning-600: #d97706  /* rgb(217, 119, 6) */
--color-warning-700: #b45309  /* rgb(180, 83, 9) */
--color-warning-800: #92400e  /* rgb(146, 64, 14) */
--color-warning-900: #78350f  /* rgb(120, 53, 15) */

/* Error Color: 오류/실패 */
--color-error-50: #fef2f2    /* rgb(254, 242, 242) */
--color-error-100: #fee2e2   /* rgb(254, 226, 226) */
--color-error-200: #fecaca   /* rgb(254, 202, 202) */
--color-error-300: #fca5a5   /* rgb(252, 165, 165) */
--color-error-400: #f87171   /* rgb(248, 113, 113) */
--color-error-500: #ef4444   /* rgb(239, 68, 68) - 에러 */
--color-error-600: #dc2626   /* rgb(220, 38, 38) */
--color-error-700: #b91c1c   /* rgb(185, 28, 28) */
--color-error-800: #991b1b   /* rgb(153, 27, 27) */
--color-error-900: #7f1d1d   /* rgb(127, 29, 29) */

/* Info Color: 정보/피드백 */
--color-info-50: #f5f3ff    /* rgb(245, 243, 255) */
--color-info-100: #ede9fe   /* rgb(237, 233, 254) */
--color-info-200: #ddd6fe   /* rgb(221, 214, 254) */
--color-info-300: #c4b5fd   /* rgb(196, 181, 253) */
--color-info-400: #a78bfa   /* rgb(167, 139, 250) */
--color-info-500: #8b5cf6   /* rgb(139, 92, 246) - 정보/팁 */
--color-info-600: #7c3aed   /* rgb(124, 58, 237) */
--color-info-700: #6d28d9   /* rgb(109, 40, 217) */
--color-info-800: #5b21b6   /* rgb(91, 33, 182) */
--color-info-900: #4c1d95   /* rgb(76, 29, 149) */
```

### 1.2 다크 테마 중립색 (Neutral/Grayscale)

```css
/* Dark Theme Neutrals - 배경과 텍스트 */
--color-neutral-50: #fafafa    /* 라이트 모드 배경 (미사용) */
--color-neutral-100: #f5f5f5   /* 라이트 모드 배경 (미사용) */
--color-neutral-200: #e5e5e5   /* 라이트 모드 배경선 (미사용) */
--color-neutral-300: #d4d4d4   /* 라이트 모드 경계선 (미사용) */
--color-neutral-400: #a3a3a3   /* 라이트 모드 텍스트 (미사용) */
--color-neutral-500: #737373   /* 보조 텍스트 (다크 모드) */
--color-neutral-600: #525252   /* 보조 텍스트 더 어두움 */
--color-neutral-700: #404040   /* 경계선, 구분선 */
--color-neutral-800: #262626   /* 다크 모드 카드 배경 */
--color-neutral-900: #171717   /* 다크 모드 주 배경 */
--color-neutral-950: #0a0a0a   /* 최상 진한 배경 (선택사항) */
```

### 1.3 다크 테마 팔레트 매핑 (Tailwind CSS)

```javascript
// tailwind.config.js
module.exports = {
  darkMode: 'class', // 클래스 기반 다크 모드
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9', // Main Primary
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c3d66',
        },
        success: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e', // Main Success
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#134e4a',
        },
        warning: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b', // Main Warning
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        error: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444', // Main Error
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
        },
        info: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6', // Main Info
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
        },
        neutral: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
          950: '#0a0a0a',
        },
      },
    },
  },
};
```

---

## 2. 타이포그래피 (Typography)

### 2.1 폰트 스택

```css
/* 기본 폰트 스택 (최적화된 웹 폰트) */
--font-family-sans: 
  -apple-system,           /* macOS, iOS */
  BlinkMacSystemFont,      /* Safari */
  'Segoe UI',              /* Windows */
  Roboto,                  /* Android, Material Design */
  'Helvetica Neue',        /* 폴백 */
  Arial,                   /* 폴백 */
  sans-serif;              /* 기본값 */

/* 코드 폰트 (모노스페이스) */
--font-family-mono: 
  'Fira Code',             /* 선호 모노스페이스 */
  'Roboto Mono',           /* 대체 모노스페이스 */
  'Courier New',           /* 폴백 */
  monospace;               /* 기본값 */

/* 소제목 등 강조 폰트 */
--font-family-display:
  -apple-system,
  BlinkMacSystemFont,
  'Segoe UI',
  Roboto,
  sans-serif;
```

### 2.2 타이포그래피 스케일

```css
/* 모바일 우선 (Mobile First) 설계 */
/* 기본 font-size = 16px (1rem) */

/* Display: 대제목 (메인 헤더) */
--text-display-lg:
  font-size: 2.25rem;      /* 36px */
  line-height: 1.2;        /* 43.2px */
  font-weight: 700;        /* Bold */
  letter-spacing: -0.02em; /* 더 타이트 */

--text-display-md:
  font-size: 1.875rem;     /* 30px */
  line-height: 1.25;       /* 37.5px */
  font-weight: 700;        /* Bold */
  letter-spacing: -0.01em;

/* Heading: 섹션 제목 */
--text-heading-1:
  font-size: 1.875rem;     /* 30px */
  line-height: 1.3;        /* 39px */
  font-weight: 700;        /* Bold */

--text-heading-2:
  font-size: 1.5rem;       /* 24px */
  line-height: 1.35;       /* 32.4px */
  font-weight: 700;        /* Bold */

--text-heading-3:
  font-size: 1.25rem;      /* 20px */
  line-height: 1.4;        /* 28px */
  font-weight: 600;        /* SemiBold */

--text-heading-4:
  font-size: 1.125rem;     /* 18px */
  line-height: 1.45;       /* 26.1px */
  font-weight: 600;        /* SemiBold */

/* Body: 본문 */
--text-body-lg:
  font-size: 1.0625rem;    /* 17px */
  line-height: 1.5;        /* 25.5px */
  font-weight: 400;        /* Regular */

--text-body-md:
  font-size: 1rem;         /* 16px (기본) */
  line-height: 1.5;        /* 24px */
  font-weight: 400;        /* Regular */

--text-body-sm:
  font-size: 0.9375rem;    /* 15px */
  line-height: 1.5;        /* 22.5px */
  font-weight: 400;        /* Regular */

/* Label: 입력폼 레이블, 태그 */
--text-label-lg:
  font-size: 0.9375rem;    /* 15px */
  line-height: 1.4;        /* 21px */
  font-weight: 500;        /* Medium */

--text-label-md:
  font-size: 0.875rem;     /* 14px */
  line-height: 1.4;        /* 19.6px */
  font-weight: 500;        /* Medium */

--text-label-sm:
  font-size: 0.8125rem;    /* 13px */
  line-height: 1.4;        /* 18.2px */
  font-weight: 500;        /* Medium */

/* Caption: 작은 텍스트, 도움말 */
--text-caption:
  font-size: 0.75rem;      /* 12px */
  line-height: 1.4;        /* 16.8px */
  font-weight: 400;        /* Regular */

--text-caption-sm:
  font-size: 0.6875rem;    /* 11px */
  line-height: 1.4;        /* 15.4px */
  font-weight: 400;        /* Regular */

/* Code: 코드 블록 */
--text-code-lg:
  font-size: 0.9375rem;    /* 15px */
  line-height: 1.6;        /* 24px */
  font-weight: 400;        /* Regular */
  font-family: var(--font-family-mono);

--text-code-md:
  font-size: 0.875rem;     /* 14px */
  line-height: 1.6;

---

## 3b. 와이어프레임

# Hello World 앱 - 주요 화면 3개 ASCII 와이어프레임

---

## 화면 1: 로그인/온보딩 화면

```
╔════════════════════════════════════════════════════╗
║                                                    ║
║                   HELLO WORLD                      ║
║            누구나 코딩의 첫 성공을 경험하세요      ║
║                                                    ║
║  ┌──────────────────────────────────────────────┐  ║
║  │ 이메일 입력                                   │  ║
║  │ [________________________________]            │  ║
║  └──────────────────────────────────────────────┘  ║
║                                                    ║
║  ┌──────────────────────────────────────────────┐  ║
║  │ 비밀번호 입력                                 │  ║
║  │ [________________________________]            │  ║
║  └──────────────────────────────────────────────┘  ║
║                                                    ║
║  ┌──────────────────────────────────────────────┐  ║
║  │           [로그인]        [회원가입]          │  ║
║  └──────────────────────────────────────────────┘  ║
║                                                    ║
║            또는 다음으로 로그인                    ║
║  ┌─────────────┐  ┌─────────────┐  ┌──────────┐  ║
║  │   Google    │  │   GitHub    │  │ Apple ID │  ║
║  └─────────────┘  └─────────────┘  └──────────┘  ║
║                                                    ║
║         회원가입 시 [선호 언어 선택]               ║
║  ┌──────────────────────────────────────────────┐  ║
║  │ ○ Python  ○ JavaScript  ○ Java  ○ 아직 모름 │  ║
║  └──────────────────────────────────────────────┘  ║
║                                                    ║
╚════════════════════════════════════════════════════╝
```

**주요 요소:**
- 간단한 로그인/회원가입
- SNS 로그인 옵션
- 선호 언어 사전 선택 (개인화)
- 게스트 모드 옵션

---

## 화면 2: 과제 목록 & 대시보드 화면

```
╔════════════════════════════════════════════════════════════════╗
║  ☰ HELLO WORLD    👤 프로필    🔔 알림    ⚙️ 설정            ║
╠════════════════════════════════════════════════════════════════╣
║                                                                ║
║  ┌──────────────────────────────────────────────────────────┐ ║
║  │ 안녕하세요, 김준호님! 👋                                   │ ║
║  │                                                           │ ║
║  │ 📊 당신의 학습 진행도                                     │ ║
║  │ ┌─────────────────────────────────────────────────────┐ │ ║
║  │ │ 완료한 과제: 7개  |  연속 학습: 5일  |  레벨: 초급 2 │ ║
║  │ │ 다음 레벨까지: ███░░░░░░░░ 35%                       │ ║
║  │ └─────────────────────────────────────────────────────┘ │ ║
║  └──────────────────────────────────────────────────────────┘ ║
║                                                                ║
║  ┌──────────────────────────────────────────────────────────┐ ║
║  │ 🎓 추천 과제                                              │ ║
║  │ ┌──────────────────┐  ┌──────────────────┐              │ ║
║  │ │ [Python]         │  │ [Python]         │              │ ║
║  │ │ 1. Hello World   │  │ 2. 변수 선언하기 │              │ ║
║  │ │ ⭐⭐⭐⭐⭐     │  │ ⭐⭐⭐⭐☆     │              │ ║
║  │ │ 5분  ✓완료      │  │ 8분  □미시작     │              │ ║
║  │ └──────────────────┘  └──────────────────┘              │ ║
║  │                                                           │ ║
║  │ ┌──────────────────┐  ┌──────────────────┐              │ ║
║  │ │ [JavaScript]     │  │ [Python]         │              │ ║
║  │ │ 3. 함수 만들기   │  │ 4. 반복문 이해   │              │ ║
║  │ │ ⭐⭐⭐⭐⭐     │  │ ⭐⭐⭐☆☆     │              │ ║
║  │ │ 10분 □미시작     │  │ 12분 □미시작     │              │ ║
║  │ └──────────────────┘  └──────────────────┘              │ ║
║  └──────────────────────────────────────────────────────────┘ ║
║                                                                ║
║  ┌──────────────────────────────────────────────────────────┐ ║
║  │ [모든 과제 보기 →]                                         │ ║
║  └──────────────────────────────────────────────────────────┘ ║
║                                                                ║
║  ┌──────────────────────────────────────────────────────────┐ ║
║  │ 🏆 주간 랭킹                                              │ ║
║  │ 1위: 박수진 - 15개 과제 완료 ⭐                          │ ║
║  │ 2위: 이준영 - 12개 과제 완료                             │ ║
║  │ 3위: 당신 - 7개 과제 완료                                │ ║
║  └──────────────────────────────────────────────────────────┘ ║
║                                                                ║
╚════════════════════════════════════════════════════════════════╝
```

**주요 요소:**
- 사용자 맞춤형 인사말
- 학습 진행도 시각화 (게임화)
- 추천 과제 카드 (난이도, 소요시간, 완료 상태)
- 언어별 필터링
- 주간 랭킹 (커뮤니티 참여 유도)
- 하단 네비게이션 바

---

## 화면 3: 과제 풀이 & 코드 에디터 화면

```
╔════════════════════════════════════════════════════════════════╗
║  ← 돌아가기    Python - 과제 #1: Hello World 출력    [X]      ║
╠════════════════════════════════════════════════════════════════╣
║                                                                ║
║  ┌─────────────────────────────────────────────────────────┐  ║
║  │ 📝 과제 설명                                              │  ║
║  │                                                          │  ║
║  │ "Hello World"를 출력하는 Python 프로그램을 작성하세요.   │  ║
║  │                                                          │  ║
║  │ 💡 힌트:                                                │  ║
║  │   - print() 함수를 사용하세요                            │  ║
║  │   - 문자열은 따옴표("")로 감싸야 합니다                  │  ║
║  │                                                          │  ║
║  │ 📌 학습 목표:                                           │  ║
║  │   ✓ 기본 함수 이해 (print)                              │  ║
║  │   ✓ 문자열 다루기                                       │  ║
║  └─────────────────────────────────────────────────────────┘  ║
║                                                                ║
║  ┌─────────────────────────────────────────────────────────┐  ║
║  │ 💻 코드 에디터                                            │  ║
║  │                                                          │  ║
║  │  1 │ # 당신의 코드를 작성하세요                          │  ║
║  │  2 │ print("Hello World")                               │  ║
║  │  3 │                                                     │  ║
║  │  4 │                                                     │  ║
║  │    │                                                     │  ║
║  │ [언어: Python ▼]  [테마: 밝기 ▼]  [글자크기: 14pt ▼]  │  ║
║  └─────────────────────────────────────────────────────────┘  ║
║                                                                ║
║  ┌─────────────────────────────────────────────────────────┐  ║
║  │ ▶ 실행 (Ctrl+Enter)    🔄 리셋    ✓ 제출               │  ║
║  └─────────────────────────────────────────────────────────┘  ║
║                                                                ║
║  ┌─────────────────────────────────────────────────────────┐  ║
║  │ 📤 실행 결과                                              │  ║
║  │                                                          │  ║
║  │ >>> 프로그램 실행 중...                                  │  ║
║  │ Hello World                                             │  ║
║  │                                                          │  ║
║  │ ✅ 정답입니다! 축하합니다!                               │  ║
║  │                                                          │  ║
║  │ 🎉 과제 완료!                                            │  ║
║  │    +5 경험치  |  다음 과제로 →                          │  ║
║  └─────────────────────────────────────────────────────────┘  ║
║                                                                ║
╚════════════════════════════════════════════════════════════════╝
```

**주요 요소:**
- 과제 설명 (명확한 목표 + 힌트)
- 문법 강조 포함 코드 에디터
- 실시간 실행 & 결과 출력
- 자동 정답 판정
- 게임화된 보상 시스템 (경험치, 뱃지)
- 다음 과제로의 자연스러운 유도

---

## 화면 흐름도

```
시작
  ↓
[로그인/회원가입] ← 언어 선택
  ↓
[대시보드] ← 진행도, 추천 과제, 랭킹
  ↓
[과제 선택]
  ↓
[과제 풀이] ← 코드 작성 → 실행 → 정답 판정
  ↓
┌─성공──┐ ┌─실패──┐
↓       ↓
경험치 획득  힌트 제공 / 다시 시도
↓            ↓
다음 과제    [과제 풀이]로 돌아가기
↓
대시보드으로 돌아가기 (완료도 업데이트)
```

---

## 설계 원칙 반영 사항

| 원칙 | 반영 | 화면 |
|------|------|------|
| **즉시성** | 로그인 후 즉시 코딩 시작 가능 | 대시보드 → 과제 풀이 |
| **명확성** | 과제 목표와 힌트를 명확하게 제시 | 과제 풀이 |
| **성취감** | 실시간 결과 표시, 게임화 요소 | 과제 풀이 (경험치, 뱃지) |
| **포함성** | 직관적 UI, 복잡한 설정 최소화 | 전체 화면 |
| **사회성** | 랭킹, 커뮤니티 요소 | 대시보드 |

---

## 3c. 컴포넌트 명세

# Hello World 앱 - Atomic Design 컴포넌트 명세서

**작성일**: 2025년 1월  
**버전**: v1.0  
**대상**: 개발팀

---

## 📋 목차

1. [Atoms (원자)](#atoms-원자)
2. [Molecules (분자)](#molecules-분자)
3. [Organisms (유기체)](#organisms-유기체)
4. [Props & State 정의](#props--state-정의)

---

## Atoms (원자)

원자는 더 이상 분해될 수 없는 기본 UI 요소입니다.

### 1. Button 컴포넌트

**목적**: 사용자 액션 트리거 (과제 실행, 제출, 다음 등)

```typescript
// Button.tsx
interface ButtonProps {
  // Props
  label: string;
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  icon?: ReactNode;
  fullWidth?: boolean;
  onClick?: () => void;
  loading?: boolean;
  ariaLabel?: string;
}

interface ButtonState {
  isHovered: boolean;
  isPressed: boolean;
  isFocused: boolean;
}
```

**디자인 규격**

| variant | 배경색 | 텍스트색 | 보더 |
|---------|--------|----------|------|
| primary | #4F46E5 | #FFFFFF | - |
| secondary | #F3F4F6 | #374151 | 1px #D1D5DB |
| success | #10B981 | #FFFFFF | - |
| danger | #EF4444 | #FFFFFF | - |

**상태별 스타일**

```css
/* Normal */
Button {
  padding: 8px 16px (size: medium);
  border-radius: 6px;
  font-weight: 500;
  transition: all 0.2s ease;
  cursor: pointer;
}

/* Hover */
Button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  opacity: 0.9;
}

/* Active/Pressed */
Button:active:not(:disabled) {
  transform: translateY(0px);
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

/* Disabled */
Button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Loading */
Button[loading="true"] {
  pointer-events: none;
  opacity: 0.8;
}
```

**사용 예시**

```jsx
<Button 
  label="과제 실행하기" 
  variant="primary" 
  size="large"
  onClick={handleExecuteTask}
/>

<Button 
  label="제출" 
  variant="success"
  disabled={isSubmitting}
  loading={isSubmitting}
/>
```

---

### 2. TextField (입력 필드)

**목적**: 사용자 텍스트/코드 입력 (이메일, 코드 에디터 등)

```typescript
interface TextFieldProps {
  // Props
  value: string;
  placeholder?: string;
  type?: 'text' | 'email' | 'password' | 'number';
  disabled?: boolean;
  readOnly?: boolean;
  error?: boolean;
  errorMessage?: string;
  maxLength?: number;
  multiline?: boolean;
  rows?: number;
  onChange?: (value: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  label?: string;
  required?: boolean;
  helperText?: string;
  prefix?: string;
  suffix?: string;
}

interface TextFieldState {
  isFocused: boolean;
  hasValue: boolean;
  isValidating: boolean;
  validationError: string | null;
}
```

**상태별 스타일**

```css
/* Default */
TextField {
  border: 1px solid #D1D5DB;
  padding: 10px 12px;
  border-radius: 6px;
  font-size: 14px;
  font-family: 'Monaco', 'Courier New', monospace; /* 코드용 */
}

/* Focused */
TextField:focus {
  border-color: #4F46E5;
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
  outline: none;
}

/* Error */
TextField[error="true"] {
  border-color: #EF4444;
  background-color: #FEF2F2;
}

/* Disabled */
TextField:disabled {
  background-color: #F9FAFB;
  color: #9CA3AF;
  cursor: not-allowed;
}
```

**사용 예시**

```jsx
<TextField
  label="이메일"
  type="email"
  placeholder="example@gmail.com"
  value={email}
  onChange={setEmail}
  required
/>

<TextField
  label="코드 입력"
  multiline
  rows={8}
  value={code}
  onChange={setCode}
  helperText="파이썬 코드를 입력하세요"
/>
```

---

### 3. Badge (배지)

**목적**: 상태 표시 (난이도, 완료 상태, 카테고리 등)

```typescript
interface BadgeProps {
  // Props
  label: string;
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info';
  size?: 'small' | 'medium';
  icon?: ReactNode;
  closeable?: boolean;
  onClose?: () => void;
}

interface BadgeState {
  isHovered: boolean;
  isClosed: boolean;
}
```

**디자인 규격**

| variant | 배경색 | 텍스트색 | 사용처 |
|---------|--------|----------|--------|
| success | #D1FAE5 | #047857 | 완료 상태 |
| warning | #FEF3C7 | #D97706 | 경고/난이도 중 |
| danger | #FEE2E2 | #991B1B | 실패/난이도 높음 |
| info | #DBEAFE | #1E40AF | 카테고리/힌트 |

**사용 예시**

```jsx
<Badge label="Python 기초" variant="info" size="medium" />
<Badge label="완료" variant="success" icon={<CheckIcon />} />
<Badge label="⭐ 난이도: 초급" variant="warning" />
```

---

### 4. Typography 컴포넌트

**목적**: 텍스트 스타일 통일 (제목, 본문, 라벨)

```typescript
interface TypographyProps {
  // Props
  children: ReactNode;
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'body' | 'caption' | 'code';
  color?: 'primary' | 'secondary' | 'error' | 'success' | 'inherit';
  weight?: 'light' | 'regular' | 'medium' | 'bold';
  align?: 'left' | 'center' | 'right';
  truncate?: boolean;
  component?: string;
}
```

**타이포그래피 규격**

```css
/* h1 - 페이지 제목 */
h1 {
  font-size: 32px;
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.5px;
  color: #111827;
}

/* h2 - 섹션 제목 */
h2 {
  font-size: 24px;
  font-weight: 700;
  line-height: 1.3;
  color: #111827;
}

/* h3 - 소제목 */
h3 {
  font-size: 18px;
  font-weight: 600;
  line-height: 1.4;
  color: #1F2937;
}

/* body - 본문 */
body {
  font-size: 14px;
  font-weight: 400;
  line-height: 1.5;
  color: #374151;
}

/* caption - 작은 텍스트 */
caption {
  font-size: 12px;
  font-weight: 400;
  line-height: 1.4;
  color: #6B7280;
}

/* code - 코드 블록 */
code {
  font-family: 'Monaco', 'Courier New', monospace;
  font-size: 13px;
  background-color: #F3F4F6;
  padding: 2px 6px;
  border-radius: 4px;
  color: #DC2626;
}
```

**사용 예시**

```jsx
<Typography variant="h1">Hello World에 오신 것을 환영합니다</Typography>
<Typography variant="body" color="secondary">
  첫 번째 코드를 작성하고 실행해보세요
</Typography>
<Typography variant="code">print("Hello, World!")</Typography>
```

---

### 5. Icon 컴포넌트

**목적**: 액션/상태 표시 아이콘

```typescript
interface IconProps {
  // Props
  name: string; // 'play', 'pause', 'check', 'close', 'arrow-right', etc.
  size?: 'small' | 'medium' | 'large'; // 16px | 24px | 32px
  color?: string; // hex color or named color
  onClick?: () => void;
  className?: string;
  ariaLabel?: string;
}

interface IconState {
  isHovered: boolean;
  isLoading?: boolean;
}
```

**지원 아이콘 목록**

```typescript
const ICONS = {
  // Action
  'play': PlayIcon,
  'pause': PauseIcon,
  'stop': StopIcon,
  'refresh': RefreshIcon,
  
  // Status
  'check': CheckIcon,
  'close': CloseIcon,
  'warning': WarningIcon,
  'error': ErrorIcon,
  'info': InfoIcon,
  
  // Navigation
  'arrow-right': ArrowRightIcon,
  'arrow-left': ArrowLeftIcon,
  'chevron-down': ChevronDownIcon,
  
  // Code
  'code': CodeIcon,
  'terminal': TerminalIcon,
  'copy': CopyIcon,
}
```

**사용 예시**

```jsx
<Icon name="play" size="medium" color="#4F46E5" onClick={handleRun} />
<Icon name="check" size="large" color="#10B981" />
```

---

### 6. Spinner (로딩 인디케이터)

**목적**: 비동기 작업 진행 상태 표시

```typescript
interface SpinnerProps {
  // Props
  size?: 'small' | 'medium' | 'large'; // 24px | 40px | 60px
  color?: string; // default: #4F46E5
  label?: string; // "실행 중입니다..."
}

interface SpinnerState {
  isAnimating: boolean;
}
```

**애니메이션**

```css
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

Spinner {
  animation: spin 1s linear infinite;
  border: 3px solid rgba(79, 70, 229, 0.1);
  border-top-color: #4F46E5;
  border-radius: 50%;
}
```

**사용 예시**

```jsx
<Spinner size="medium" label="코드 실행 중..." />
```

---

## Molecules (분자)

분자는 2개 이상의 원자로 구성된 기본 기능 단위입니다.

### 1. CodeEditor 컴포넌트

**목적**: 코드 입력 및 문법 강조, 라인 번호 표시

```typescript
interface CodeEditorProps {
  // Props
  value: string;
  language?: 'python' | 'javascript' | 'java' | 'cpp';
  theme?: 'light' | 'dark';
  readOnly?: boolean;
  minLines?: number;
  maxLines?: number;
  showLineNumbers?: boolean;
  onChange?: (value: string) => void;
  onRun?: () => void;
  onReset?: () => void;
  hasError?: boolean;
  errorMessage?: string;
}

interface CodeEditorState {
  cursorPosition: { line: number; column: number };
  isFocused: boolean;
  isDirty: boolean; // 변경 여부
  hasUnsavedChanges: boolean;
}
```

**구성 요소**

```
┌─────────────────────────────────────┐
│ Language Selector | Reset | Run     │ ← Toolbar (Molecules)
├─────────────────────────────────────┤
│ 1  │ print("Hello, World!")          │ ← Code + Line Numbers (Atoms)
│ 2  │                                 │
│ 3  │ name = input("Your name: ")     │
├─────────────────────────────────────┤
│ ⚠️  Error: Invalid syntax at line 3 │ ← Error Display (Atom)
└─────────────────────────────────────┘
```

**사용 예시**

```jsx
<CodeEditor
  value={code}
  language="python"
  onChange={setCode}
  onRun={handleExecute}
  showLineNumbers={true}
  hasError={!!errorMessage}
  errorMessage={errorMessage}
/>
```

---

### 2. TaskCard 컴포넌트

**목적**: 개별 과제 정보 표시 (카드 형식)

```typescript
interface TaskCardProps {
  // Props
  id: string;
  title: string;
  description: string;
  difficulty?: 'easy' | 'medium' | 'hard'; // 난이도
  estimatedTime?: number; // 분 단위
  category?: string; // 'Python 기초', 'JavaScript 시작' etc.
  isCompleted?: boolean;
  icon?: ReactNode;
  onClick?: () => void;
  onStart?: () => void;
  progressPercentage?: number; // 진행률
  completedAt?: Date;
}

interface TaskCardState {
  isHovered: boolean;
  isSelected: boolean;
}
```

**디자인 레이아웃**

```
┌────────────────────────────────────┐
│ [카테고리] 난이도: 초급      ⭐ ✓  │ ← Badge 2개 (Atoms)
│                                    │
│ 📌 Hello World 출력하기            │ ← Title (Typography)
│                                    │
│ 첫 번째 프로그램 작성하기         │ ← Description (

---

## 4a. 기술 스택

# 기술 스택 결정서 (Technology Stack Decision Document)

**문서 번호**: TSD-2025-001
**프로젝트**: Hello World 학습 플랫폼
**작성자**: Senior Software Architect (15년차)
**작성일**: 2025년 1월
**버전**: v1.0
**상태**: Draft

---

## 목차

1. [Executive Summary](#1-executive-summary)
2. [아키텍처 개요](#2-아키텍처-개요)
3. [프론트엔드 스택](#3-프론트엔드-스택)
4. [백엔드 스택](#4-백엔드-스택)
5. [데이터베이스 스택](#5-데이터베이스-스택)
6. [인프라 & DevOps](#6-인프라--devops)
7. [보안 스택](#7-보안-스택)
8. [모니터링 & 관측성](#8-모니터링--관측성)
9. [의존성 위험 분석](#9-의존성-위험-분석)
10. [비용 추정](#10-비용-추정)
11. [마이그레이션 로드맵](#11-마이그레이션-로드맵)
12. [결정 이력](#12-결정-이력)

---

## 1. Executive Summary

### 1.1 핵심 제약 조건

기획서 분석을 통해 도출한 기술 선택의 핵심 제약 조건입니다.

```
비기능 요구사항 → 기술 제약 매핑

┌─────────────────────────────────────────────────────────────────┐
│  비즈니스 요구사항              기술적 함의                        │
├─────────────────────────────────────────────────────────────────┤
│  코드 실행 응답시간 < 3초    → 실행 환경 격리 + 빠른 스핀업 필요   │
│  무료 서비스 (초기)          → 인프라 비용 최소화, OSS 우선        │
│  초보자 UX                  → 빠른 초기 로딩, 안정적 에디터       │
│  MAU 3,000 → 15,000 성장    → 수평 확장 가능한 아키텍처            │
│  코드 에디터 크래시율 < 1%   → 검증된 에디터 라이브러리            │
│  5~10분 단위 마이크로 레슨   → 실시간 상태 동기화                  │
│  게임화 (XP, 뱃지)          → 빠른 읽기/쓰기 성능                 │
│  7일/30일 리텐션 추적        → 이벤트 분석 인프라                  │
│  B2B 확장 고려              → 멀티테넌트 설계 여지                 │
└─────────────────────────────────────────────────────────────────┘
```

### 1.2 선택된 최종 스택 요약

```
┌─────────────────────────────────────────────────────────────────┐
│                    HELLO WORLD TECH STACK                       │
├───────────────┬─────────────────────────────────────────────────┤
│  Frontend     │  Vite 5 + React 18 + TypeScript                 │
│               │  Monaco Editor + Tailwind CSS + Zustand          │
├───────────────┼─────────────────────────────────────────────────┤
│  Backend      │  Node.js 22 LTS + Fastify 4                     │
│               │  Zod (validation) + Prisma (ORM)                 │
├───────────────┼─────────────────────────────────────────────────┤
│  Code Runner  │  Docker + isolate (gVisor 샌드박스)              │
│               │  Judge0 CE (자체 호스팅)                         │
├───────────────┼─────────────────────────────────────────────────┤
│  Database     │  PostgreSQL 16 + Redis 7.2                       │
│               │  Prisma Migrate (스키마 관리)                     │
├───────────────┼─────────────────────────────────────────────────┤
│  Infra        │  AWS (ECS Fargate + RDS + ElastiCache)           │
│               │  Terraform + GitHub Actions CI/CD                │
├───────────────┼─────────────────────────────────────────────────┤
│  Monitoring   │  Grafana + Prometheus + Sentry + PostHog         │
└───────────────┴─────────────────────────────────────────────────┘
```

---

## 2. 아키텍처 개요

### 2.1 시스템 아키텍처 다이어그램

```
                           ┌─────────────────┐
                           │   CloudFront    │  CDN (정적 자산)
                           │   (AWS CDN)     │
                           └────────┬────────┘
                                    │
                           ┌────────▼────────┐
                           │  S3 (정적 호스팅) │  React SPA
                           └────────┬────────┘
                                    │ API 호출
                    ┌───────────────▼───────────────┐
                    │        AWS ALB (Load Balancer) │
                    └───────────────┬───────────────┘
                                    │
              ┌─────────────────────┼─────────────────────┐
              │                     │                     │
     ┌────────▼────────┐  ┌────────▼────────┐  ┌────────▼────────┐
     │  API Server     │  │  API Server     │  │  API Server     │
     │  (Fastify)      │  │  (Fastify)      │  │  (Fastify)      │
     │  ECS Fargate    │  │  ECS Fargate    │  │  ECS Fargate    │
     └────────┬────────┘  └────────┬────────┘  └────────┬────────┘
              │                     │                     │
              └─────────────────────┼─────────────────────┘
                                    │
          ┌─────────────────────────┼──────────────────────────┐
          │                         │                          │
┌─────────▼────────┐    ┌──────────▼─────────┐    ┌──────────▼─────────┐
│   PostgreSQL 16  │    │    Redis 7.2        │    │  Code Runner       │
│   (RDS Multi-AZ) │    │  (ElastiCache)      │    │  (ECS + Docker)    │
│                  │    │                     │    │  Judge0 CE         │
│  - Users         │    │  - Session Cache    │    │                    │
│  - Courses       │    │  - Rate Limiting    │    │  격리된 샌드박스에서  │
│  - Progress      │    │  - Leaderboard      │    │  코드 실행           │
│  - Badges        │    │  - Pub/Sub (WS)     │    │                    │
└──────────────────┘    └─────────────────────┘    └────────────────────┘
```

### 2.2 코드 실행 흐름 (Critical Path)

```
사용자 "실행" 버튼 클릭
         │
         ▼ (목표: 3초 이내)
┌────────────────────────────────────────────────────────────────┐
│                                                                │
│  [Frontend]     [API Server]      [Code Runner]               │
│      │               │                  │                     │
│      │──POST /run──▶│                  │                     │
│      │               │──작업 큐 push──▶│                     │
│      │               │                  │──컨테이너 스핀업    │
│      │               │                  │──코드 실행(격리)    │
│      │               │                  │──결과 반환          │
│      │               │◀─────결과────────│                     │
│      │◀───응답────────│                  │                     │
│                                                                │
│  예상 소요시간:                                                  │
│  - 컨테이너 워밍업: ~500ms (사전 워밍)                           │
│  - Python 실행: ~200ms                                          │
│  - 네트워크 왕복: ~100ms                                        │
│  - 총합: ~800ms (목표 3초 대비 2.2초 여유)                       │
└────────────────────────────────────────────────────────────────┘
```

---

## 3. 프론트엔드 스택

### 3.1 빌드 도구: Vite 5

#### 선택 근거

```
┌────────────────────────────────────────────────────────────────┐
│  Vite 선택의 핵심 이유                                           │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  1. 개발 생산성                                                  │
│     - HMR(Hot Module Replacement) 속도: ~50ms                  │
│     - Create React App 대비 초기 시작 10배 빠름                  │
│     - 초보자 플랫폼 특성상 빠른 이터레이션이 필수                  │
│                                                                │
│  2. 번들 크기 최적화                                             │
│     - esbuild 기반 프리번들링                                    │
│     - Tree-shaking 우수 → 초기 로딩 최소화                       │
│     - 초보자 사용자 = 저사양 기기 사용 가능성 고려                 │
│                                                                │
│  3. 생태계 성숙도                                                │
│     - npm 주간 다운로드 1,200만+ (2025년 기준)                   │
│     - React, Vue, Svelte 모두 지원                              │
│     - 추후 기술 스택 변경 시 빌드 도구 유지 가능                   │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

#### 대안 비교

| 항목 | **Vite 5** ✅ | Create React App | Next.js | Turbopack |
|------|:---:|:---:|:---:|:---:|
| 개발 서버 시작 | ~300ms | ~15s | ~3s | ~200ms |
| HMR 속도 | ~50ms | ~2s | ~500ms | ~30ms |
| SSR 지원 | 가능(플러그인) | ❌ | ✅ 내장 | Next.js 전용 |
| 번들러 | Rollup(prod) | Webpack | Webpack/Turbo | Rust 기반 |
| 학습 곡선 | 낮음 | 매우 낮음 | 중간 | 낮음 |
| 설정 유연성 | 높음 | 낮음 | 중간 | 낮음 |
| 성숙도 | ★★★★★ | ★★★★★ | ★★★★★ | ★★★☆☆ |

**Next.js 미선택 이유**: Hello World는 순수 SPA 구조로 충분합니다. SEO가 중요한 마케팅 페이지는 별도 정적 페이지로 분리하거나 추후 도입 가능합니다. Next.js의 서버 컴포넌트 복잡성이 현 팀 규모에 과도한 오버헤드를 유발합니다.

**Turbopack 미선택 이유**: 2025년 1분기 기준 아직 완전한 프로덕션 안정성 검증이 부족합니다.

---

### 3.2 UI 프레임워크: React 18

#### 선택 근거

```
React 18 핵심 이점 (Hello World 맥락)

  Concurrent Features
  ├── useTransition → 코드 실행 중 UI 블로킹 방지
  ├── Suspense → 코드 에디터 로딩 UX 개선
  └── useDeferredValue → 에디터 입력 성능 최적화

  Strict Mode
  └── 개발 환경에서 부작용 조기 발견 → 에디터 크래시율 < 1% 달성에 기여

  생태계
  ├── Monaco Editor → React 래퍼 존재 (@monaco-editor/react)
  ├── 국내 개발자 커뮤니티 가장 활성화
  └── 채용 시장 우위 (팀 확장 고려)
```

#### 대안 비교

| 항목 | **React 18** ✅ | Vue 3 | Svelte 5 | SolidJS |
|------|:---:|:---:|:---:|:---:|
| 번들 크기 | 중간(42KB) | 중간(33KB) | 작음(<5KB) | 작음(7KB) |
| 성능 | 우수 | 우수 | 최우수 | 최우수 |
| 에디터 라이브러리 지원 | ✅ 최고 | ✅ 양호 | ⚠️ 제한적 | ⚠️ 제한적 |
| 국내 커뮤니티 | ★★★★★ | ★★★★☆ | ★★★☆☆ | ★★☆☆☆ |
| 채용 용이성 | 매우 쉬움 | 쉬움 | 어려움 | 매우 어려움 |
| TypeScript 지원 | ★★★★★ | ★★★★★ | ★★★★☆ | ★★★★☆ |

**Monaco Editor 의존성이 React 선택의 결정적 요인**: VS Code와 동일한 에디터 엔진 사용으로 에디터 크래시율 목표(< 1%) 달성이 가장 확실합니다.

---

### 3.3 언어: TypeScript 5

#### 선택 근거

```
TypeScript 도입 ROI 분석

  비용
  ├──

---

## 4b. 시스템 아키텍처

# Hello World 앱 - 시스템 아키텍처 문서

**문서 버전**: v1.0  
**작성일**: 2025년 1월  
**작성자**: Architecture Team  
**상태**: Draft

---

## 목차

1. [아키텍처 개요](#1-아키텍처-개요)
2. [전체 구성도](#2-전체-구성도)
3. [서비스 컴포넌트 상세](#3-서비스-컴포넌트-상세)
4. [서비스 간 통신](#4-서비스-간-통신)
5. [인증 흐름](#5-인증-흐름)
6. [API 설계 원칙](#6-api-설계-원칙)
7. [데이터 흐름](#7-데이터-흐름)
8. [인프라 & 배포](#8-인프라--배포)
9. [보안 설계](#9-보안-설계)
10. [장애 대응 & 확장 전략](#10-장애-대응--확장-전략)

---

## 1. 아키텍처 개요

### 1.1 설계 철학

Hello World는 **완전 초보자**가 대상이므로, 인프라 설계 역시 동일한 원칙을 따릅니다.

| 원칙 | 내용 | 이유 |
|------|------|------|
| **Reliability First** | 99.9% 가용성 목표 | 처음 접속한 사용자가 에러를 보면 이탈 확정 |
| **Low Latency** | 코드 실행 결과 3초 이내 반환 | 학습 몰입감 유지 |
| **Isolation** | 코드 실행 환경 완전 격리 | 악의적 코드 실행 방지 |
| **Stateless Services** | 앱 서버 무상태 설계 | 수평 확장 용이 |
| **Progressive Scale** | MVP는 단순, 트래픽 증가 시 점진적 확장 | 초기 운영 비용 최소화 |

### 1.2 아키텍처 스타일

```
결정: Modular Monolith → Microservices (점진적 전환)

MVP (v1.0):  Modular Monolith + Code Execution Sidecar
  └─ 이유: 3개월 출시 목표, 팀 규모 최소화, 빠른 이터레이션

v2.0 이후:   핵심 도메인 분리 (Auth, Code Runner, Content, Progress)
  └─ 이유: 코드 실행 서비스는 보안/스케일 요구사항이 독립적으로 다름
```

---

## 2. 전체 구성도

### 2.1 MVP 아키텍처 (v1.0)

```
┌─────────────────────────────────────────────────────────────────────┐
│                         INTERNET / USERS                            │
└──────────────────────────────┬──────────────────────────────────────┘
                               │ HTTPS (443)
                               ▼
┌─────────────────────────────────────────────────────────────────────┐
│                         CDN (CloudFront)                            │
│         정적 자산 캐싱 (JS/CSS/Images)   Edge Location 배포          │
└──────────────┬──────────────────────────────────────────────────────┘
               │                          │
        동적 요청                      정적 자산
               │                          │
               ▼                          ▼
┌──────────────────────────┐   ┌──────────────────────────┐
│     Load Balancer        │   │     S3 (Static Hosting)   │
│   (ALB / Nginx)          │   │  React SPA Build Output   │
│   SSL Termination        │   │  과제 이미지, 튜토리얼 파일  │
└──────────┬───────────────┘   └──────────────────────────┘
           │
           │  HTTP (8080)
           ▼
┌──────────────────────────────────────────────────────────────────┐
│                    Application Server (Node.js)                  │
│                       [Modular Monolith]                         │
│                                                                  │
│  ┌─────────────┐  ┌─────────────┐  ┌──────────────────────────┐ │
│  │ Auth Module │  │Content Module│  │   Progress Module        │ │
│  │             │  │             │  │                          │ │
│  │ - 회원가입   │  │ - 과제 목록  │  │  - 완료 처리             │ │
│  │ - 로그인    │  │ - 과제 상세  │  │  - XP 계산              │ │
│  │ - 토큰 검증 │  │ - 힌트 제공  │  │  - 뱃지 지급             │ │
│  └─────────────┘  └─────────────┘  └──────────────────────────┘ │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │                    API Gateway Layer                        │ │
│  │            (Rate Limiting / Request Validation)             │ │
│  └─────────────────────────────────────────────────────────────┘ │
└──────────────────────────┬───────────────────────────────────────┘
           │                              │
           │ gRPC / HTTP                  │ TCP
           ▼                              ▼
┌──────────────────────┐      ┌───────────────────────┐
│   Code Runner        │      │    Primary DB         │
│   Service            │      │    (PostgreSQL)        │
│                      │      │                       │
│  ┌────────────────┐  │      │  users                │
│  │  Queue Worker  │  │      │  courses              │
│  │  (Bull/Redis)  │  │      │  challenges           │
│  └───────┬────────┘  │      │  submissions          │
│          │           │      │  user_progress        │
│          ▼           │      │  badges               │
│  ┌────────────────┐  │      └───────────────────────┘
│  │ Docker Sandbox │  │
│  │  Containers    │  │      ┌───────────────────────┐
│  │  (격리 실행)   │  │      │      Redis Cache       │
│  │  Python/JS     │  │      │                       │
│  └────────────────┘  │      │  세션 데이터           │
│                      │      │  과제 캐시            │
│  실행 제한:           │      │  Rate Limit 카운터    │
│  - CPU: 0.5 core     │      │  Job Queue           │
│  - MEM: 128MB        │      └───────────────────────┘
│  - TIME: 5초         │
└──────────────────────┘
           │
           ▼
┌──────────────────────────────────────────────────────────────────┐
│                    Observability Stack                           │
│                                                                  │
│  ┌────────────────┐  ┌──────────────────┐  ┌─────────────────┐  │
│  │   CloudWatch   │  │  Sentry (Error)  │  │  Mixpanel       │  │
│  │   Logs/Metrics │  │  Tracking        │  │  (KPI Analytics)│  │
│  └────────────────┘  └──────────────────┘  └─────────────────┘  │
└──────────────────────────────────────────────────────────────────┘
```

### 2.2 v2.0 목표 아키텍처 (마이크로서비스 전환)

```
┌─────────────────────────────────────────────────────────────────────┐
│                     API Gateway (Kong / AWS API GW)                │
│              인증, Rate Limit, 라우팅, 로깅 중앙화                   │
└─────┬───────────────┬────────────────┬────────────────┬─────────────┘
      │               │                │                │
      ▼               ▼                ▼                ▼
┌──────────┐   ┌──────────────┐  ┌──────────────┐  ┌────────────────┐
│  Auth    │   │   Content    │  │   Progress   │  │  Code Runner   │
│ Service  │   │   Service    │  │   Service    │  │   Service      │
│          │   │              │  │              │  │                │
│ JWT 발급 │   │ 과제 CRUD    │  │ 진도 추적    │  │ 격리 실행 엔진  │
│ OAuth2   │   │ 힌트 시스템  │  │ XP/뱃지      │  │ 언어별 런타임   │
│ 토큰갱신  │   │ 검색         │  │ 리더보드     │  │ 보안 샌드박스   │
└──────────┘   └──────────────┘  └──────────────┘  └────────────────┘
      │               │                │                │
      └───────────────┴────────────────┴────────────────┘
                                │
                    ┌──────────────────────┐
                    │   Message Broker     │
                    │  (RabbitMQ / SQS)    │
                    │  Progress 이벤트     │
                    │  알림 트리거         │
                    └──────────────────────┘
```

---

## 3. 서비스 컴포넌트 상세

### 3.1 Frontend (React SPA)

```
src/
├── features/               # 도메인별 모듈
│   ├── auth/               # 로그인, 회원가입
│   ├── dashboard/          # 메인 대시보드
│   ├── challenge/          # 과제 풀기 화면
│   │   ├── CodeEditor/     # Monaco Editor 래핑
│   │   ├── OutputPanel/    # 실행 결과 표시
│   │   └── HintSystem/     # 힌트 요청/표시
│   ├── progress/           # 학습 현황, XP
│   └── leaderboard/        # 리더보드
├── shared/
│   ├── api/                # API 클라이언트 (axios 인스턴스)
│   ├── auth/               # 토큰 관리, Auth Context
│   └── components/         # 공통 UI 컴포넌트
└── store/                  # Zustand 상태 관리
```

| 항목 | 선택 기술 | 이유 |
|------|----------|------|
| 프레임워크 | React 18 | 생태계, 팀 친숙도 |
| 코드 에디터 | Monaco Editor | VS Code 동일 경험, 초보자 친숙 |
| 상태 관리 | Zustand | Redux 대비 보일러플레이트 최소 |
| API 통신 | Axios + React Query | 캐싱, 로딩/에러 상태 자동 관리 |
| 스타일링 | TailwindCSS | 빠른 UI 구성 |

### 3.2 Application Server (Node.js)

```
app/
├── modules/
│   ├── auth/
│   │   ├── auth.controller.ts    # 라우트 핸들러
│   │   ├── auth.service.ts       # 비즈니스 로직
│   │   ├── auth.repository.ts    # DB 접근
│   │   └── auth.dto.ts           # 요청/응답 스키마
│   ├── challenge/
│   ├── progress/
│   └── user/
├── common/
│   ├── middleware/
│   │   ├── authenticate.ts       # JWT 검증 미들웨어
│   │   ├── rateLimiter.ts        # Rate Limit
│   │   └── requestLogger.ts      # 요청 로깅
│   ├── guards/                   # 역할 기반 접근 제어
│   └── exceptions/               # 전역 에러 핸들러
└── infrastructure/
    ├── database/                 # Prisma ORM 설정
    ├── redis/                    # Redis 클라이언트
    └── queue/                    # Bull Queue 설정
```

### 3.3 Code Runner Service

```
코드 실행 보안 격리 레이어

┌─────────────────────────────────────────────────────────┐
│                   Code Runner Service                   │
│                                                         │
│  Request  ──►  Queue  ──►  Worker  ──►  Container       │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │              Docker Container (격리)             │   │
│  │                                                 │   │
│  │  제한 사항:                                      │   │
│  │  - CPU: 0.5 core                               │   │
│  │  - Memory: 128MB                               │   │
│  │  - 실행 시간: 최대 5초                           │   │
│  │  - 네트워크: 완전 차단 (--network none)          │   │
│  │  - 파일시스템: Read-only (tmpfs만 허용)          │   │
│  │  - 권한: non-root user 강제                     │   │
│  │                                                 │   │
│  │  지원 언어:                                      │   │
│  │  - Python 3.11 (v1.0)                          │   │
│  │  - JavaScript/Node.js (v1.0)                   │   │
│  │  - Java, C++ (v2.0 예정)                       │   │
│  └─────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

---

## 4. 서비스 간 통신

### 4.1 통신 방식 결정 원칙

```
동기 통신 (HTTP/REST):
  - 즉각적인 응답이 필요한 경우
  - 사용자가 결과를 기다리는 요청
  예) 로그인, 과제

---

## 4c. 데이터베이스 스키마

# Hello World 앱 - 데이터베이스 스키마 설계서

**문서 버전**: v1.0  
**작성일**: 2025년 1월  
**대상 DB**: PostgreSQL 15+  
**연관 문서**: PRD v1.0

---

## 목차

1. [ERD 요약](#1-erd-요약)
2. [테이블 정의](#2-테이블-정의)
3. [인덱스 전략](#3-인덱스-전략)
4. [마이그레이션 계획](#4-마이그레이션-계획)
5. [설계 결정 근거](#5-설계-결정-근거)

---

## 1. ERD 요약

### 1.1 엔터티 관계 다이어그램

```
┌─────────────────────────────────────────────────────────────────────┐
│                          핵심 도메인 관계도                            │
└─────────────────────────────────────────────────────────────────────┘

[users] ─────────────────────────────────────────────────────────────┐
   │ 1                                                               │
   │                                                                 │
   ├──< [user_profiles]        (1:1)  프로필 확장 정보                │
   │                                                                 │
   ├──< [user_sessions]        (1:N)  세션 추적 (KPI: 세션 시간)      │
   │                                                                 │
   ├──< [user_progress]        (1:N)  ──────────────────────────────>│
   │       │ N                                [lessons]              │
   │       │                                     │ 1                 │
   ├──< [code_submissions]     (1:N)  ──────────>│                   │
   │       │ N                               [lesson_hints]  (1:N)   │
   │                                             │                   │
   ├──< [user_achievements]    (1:N)         [courses] (1:N)         │
   │       │ N                               [course_lessons] (N:M)  │
   │       ↓                                     │                   │
   │  [achievements]                         [language_configs]      │
   │                                                                 │
   └──< [user_streaks]         (1:1)                                 │
                                                                     │
[user_progress] >─────────────────────── [lessons] ─────────────────┘

※ >──< : 일대다(1:N),  >──< N:M은 중간 테이블로 해소
```

### 1.2 도메인 그룹 요약

```
┌──────────────────────────────────────────────────────────────┐
│  Domain Group 1: 사용자 (Users)                               │
│  ┌──────────────┐  ┌──────────────┐  ┌────────────────────┐  │
│  │ users        │  │ user_profiles│  │ user_sessions      │  │
│  │ (핵심 인증)  │  │ (확장 정보)  │  │ (세션/KPI 측정)    │  │
│  └──────────────┘  └──────────────┘  └────────────────────┘  │
│  ┌──────────────┐  ┌──────────────┐                          │
│  │ user_streaks │  │ user_stats   │                          │
│  │ (연속 학습)  │  │ (집계 캐시)  │                          │
│  └──────────────┘  └──────────────┘                          │
├──────────────────────────────────────────────────────────────┤
│  Domain Group 2: 학습 콘텐츠 (Learning Content)              │
│  ┌──────────────┐  ┌──────────────┐  ┌────────────────────┐  │
│  │ courses      │  │ lessons      │  │ lesson_hints       │  │
│  │ (코스 묶음)  │  │ (개별 과제)  │  │ (단계별 힌트)      │  │
│  └──────────────┘  └──────────────┘  └────────────────────┘  │
│  ┌──────────────┐  ┌──────────────┐                          │
│  │course_lessons│  │language_     │                          │
│  │ (N:M 매핑)  │  │configs       │                          │
│  └──────────────┘  └──────────────┘                          │
├──────────────────────────────────────────────────────────────┤
│  Domain Group 3: 학습 활동 (Learning Activity)               │
│  ┌──────────────┐  ┌──────────────┐                          │
│  │user_progress │  │code_         │                          │
│  │ (진도 상태)  │  │submissions   │                          │
│  └──────────────┘  └──────────────┘                          │
├──────────────────────────────────────────────────────────────┤
│  Domain Group 4: 게임화 (Gamification)                       │
│  ┌──────────────┐  ┌──────────────┐                          │
│  │achievements  │  │user_         │                          │
│  │ (업적 정의)  │  │achievements  │                          │
│  └──────────────┘  └──────────────┘                          │
└──────────────────────────────────────────────────────────────┘
```

---

## 2. 테이블 정의

### 2.1 Domain Group 1: 사용자 (Users)

---

#### 📋 `users` — 핵심 인증 테이블

> 사용자 계정 정보. 인증에 필요한 최소 데이터만 보관, 나머지는 user_profiles로 분리.

```sql
CREATE TABLE users (
    id              UUID            PRIMARY KEY DEFAULT gen_random_uuid(),
    email           VARCHAR(320)    NOT NULL,
    email_verified  BOOLEAN         NOT NULL DEFAULT FALSE,
    password_hash   VARCHAR(255)    NULL,           -- NULL = 소셜 전용 계정
    provider        VARCHAR(20)     NOT NULL DEFAULT 'email',
    provider_id     VARCHAR(255)    NULL,           -- OAuth 공급자의 사용자 ID
    status          VARCHAR(20)     NOT NULL DEFAULT 'active',
    created_at      TIMESTAMPTZ     NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ     NOT NULL DEFAULT NOW(),
    deleted_at      TIMESTAMPTZ     NULL            -- Soft Delete
);
```

| 컬럼명 | 타입 | 제약조건 | 설명 |
|--------|------|----------|------|
| `id` | UUID | PK, DEFAULT gen_random_uuid() | 사용자 고유 식별자. 순차 ID 노출 방지 |
| `email` | VARCHAR(320) | NOT NULL, UNIQUE (partial) | RFC 5321 최대 길이. deleted_at IS NULL 조건 UNIQUE |
| `email_verified` | BOOLEAN | NOT NULL, DEFAULT FALSE | 이메일 인증 여부 |
| `password_hash` | VARCHAR(255) | NULL | bcrypt 해시. 소셜 로그인 전용 계정은 NULL |
| `provider` | VARCHAR(20) | NOT NULL, DEFAULT 'email' | 'email' / 'google' / 'kakao' / 'github' |
| `provider_id` | VARCHAR(255) | NULL | OAuth 제공자 고유 ID |
| `status` | VARCHAR(20) | NOT NULL, CHECK | 'active' / 'suspended' / 'withdrawn' |
| `created_at` | TIMESTAMPTZ | NOT NULL | 가입 시각 (타임존 포함) |
| `updated_at` | TIMESTAMPTZ | NOT NULL | 트리거로 자동 갱신 |
| `deleted_at` | TIMESTAMPTZ | NULL | NULL = 활성, 값 있음 = 탈퇴 |

```sql
-- 제약조건 추가
ALTER TABLE users
    ADD CONSTRAINT users_email_unique
        UNIQUE NULLS NOT DISTINCT (email)               -- PostgreSQL 15+
        WHERE deleted_at IS NULL,                        -- 탈퇴 계정은 이메일 재사용 허용
    ADD CONSTRAINT users_status_check
        CHECK (status IN ('active', 'suspended', 'withdrawn')),
    ADD CONSTRAINT users_provider_check
        CHECK (provider IN ('email', 'google', 'kakao', 'github')),
    ADD CONSTRAINT users_provider_id_check
        CHECK (
            (provider = 'email' AND provider_id IS NULL) OR
            (provider != 'email' AND provider_id IS NOT NULL)
        );
```

---

#### 📋 `user_profiles` — 사용자 프로필 확장 (1:1)

> users와 1:1. 학습 경험에 영향을 미치는 개인화 정보.

```sql
CREATE TABLE user_profiles (
    user_id         UUID            PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    nickname        VARCHAR(30)     NOT NULL,
    avatar_url      VARCHAR(500)    NULL,
    birth_year      SMALLINT        NULL,           -- 연령대 분류용 (일 미수집)
    experience_level VARCHAR(20)    NOT NULL DEFAULT 'absolute_beginner',
    preferred_language VARCHAR(20)  NOT NULL DEFAULT 'python',
    learning_goal   VARCHAR(500)    NULL,           -- "취미로 배우고 싶어요" 등 자유 입력
    weekly_goal_days SMALLINT       NOT NULL DEFAULT 3, -- 주 목표 학습 일수
    notification_enabled BOOLEAN   NOT NULL DEFAULT TRUE,
    timezone        VARCHAR(50)     NOT NULL DEFAULT 'Asia/Seoul',
    created_at      TIMESTAMPTZ     NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ     NOT NULL DEFAULT NOW()
);
```

| 컬럼명 | 타입 | 제약조건 | 설명 |
|--------|------|----------|------|
| `user_id` | UUID | PK, FK → users.id | users와 1:1 관계 |
| `nickname` | VARCHAR(30) | NOT NULL, UNIQUE | 서비스 내 표시 이름 |
| `avatar_url` | VARCHAR(500) | NULL | 프로필 이미지 URL (CDN 경로) |
| `birth_year` | SMALLINT | NULL, CHECK | 1900~2020 범위 체크. 연령대 분류용 |
| `experience_level` | VARCHAR(20) | NOT NULL | 'absolute_beginner' / 'beginner' / 'intermediate' |
| `preferred_language` | VARCHAR(20) | NOT NULL | 'python' / 'javascript' / 'java' 등 |
| `learning_goal` | VARCHAR(500) | NULL | 온보딩 시 수집하는 자유 입력 목표 |
| `weekly_goal_days` | SMALLINT | NOT NULL, CHECK (1~7) | 주 학습 목표 일수 (스트릭 기준) |
| `notification_enabled` | BOOLEAN | NOT NULL | 푸시/이메일 알림 수신 동의 |
| `timezone` | VARCHAR(50) | NOT NULL | 스트릭 계산 기준 타임존 |

```sql
ALTER TABLE user_profiles
    ADD CONSTRAINT profiles_nickname_unique UNIQUE (nickname),
    ADD CONSTRAINT profiles_birth_year_check
        CHECK (birth_year IS NULL OR (birth_year BETWEEN 1900 AND 2020)),
    ADD CONSTRAINT profiles_experience_check
        CHECK (experience_level IN ('absolute_beginner', 'beginner', 'intermediate')),
    ADD CONSTRAINT profiles_weekly_goal_check
        CHECK (weekly_goal_days BETWEEN 1 AND 7);
```

---

#### 📋 `user_sessions` — 세션 추적 (KPI: 평균 세션 시간 15분)

> PRD KPI "평균 세션 시간 15분 이상" 측정을 위한 핵심 테이블.

```sql
CREATE TABLE user_sessions (
    id              UUID            PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id         UUID            NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    started_at      TIMESTAMPTZ     NOT NULL DEFAULT NOW(),
    ended_at        TIMESTAMPTZ     NULL,           -- NULL = 현재 진행 중 세션
    duration_seconds INTEGER        NULL,           -- 종료 시 계산하여 저장
    device_type     VARCHAR(20)     NULL,           -- 'mobile' / 'tablet' / 'desktop'
    user_agent      TEXT            NULL,
    ip_address      INET            NULL            -- 분석용, 해시 저장 권장
);
```

| 컬럼명 | 타입 | 제약조건 | 설명 |
|--------|------|----------|------|
| `id` | UUID | PK | 세션 고유 ID |
| `user_id` | UUID | FK → users.id, NOT NULL | 세션 소유 사용자 |
| `started_at` | TIMESTAMPTZ | NOT NULL | 세션 시작 시각 |
| `ended_at` | TIMESTAMPTZ | NULL | NULL이면 활성 세션 |
| `duration_seconds` | INTEGER | NULL, CHECK (≥0) | ended_at - started_at 를 애플리케이션에서 계산 후 저장 |
| `device_type` | VARCHAR(20) | NULL | 디바이스 분류 |
| `user_agent` | TEXT | NULL | 분석용 UA 문자열 |
| `ip_address` | INET | NULL | PostgreSQL 네이티브 IP 타입, GDPR 고려 필요 |

```sql
-- 파티셔닝: 세션 데이터 누적량 대비 월별 파티션
CREATE TABLE user_sessions (
    -- 위와 동일
) PARTITION BY RANGE (started_at);

CREATE TABLE user_sessions_2025_01 
    PARTITION OF user_sessions
    FOR VALUES FROM ('2025-01-01') TO ('2025-02-01');
-- 이후 월 파티션은 자동 생성 배치 처리
```

---

#### 📋 `user_streaks` — 연속 학습 스트릭 (1:1)

> 게임화 핵심 요소. 연속 학습 일수를 추적하여 동기 부여.

```sql
CREATE TABLE user_streaks (
    user_id             UUID        PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    current_streak      INTEGER     NOT NULL DEFAULT 0,
    longest_streak      INTEGER     NOT NULL DEFAULT 0,
    last_activity_date  DATE        NULL,   -- 타임존 변환 후 날짜 저장
    streak_frozen_until DATE        NULL,   -- 스트릭 보호 아이템 사용 시

---

## 4d. 프로젝트 구조

# Turborepo 모노레포 디렉토리 구조

## 전체 디렉토리 트리

```
hello-world/
├── .github/
│   ├── workflows/
│   │   ├── ci.yml                          # PR 시 lint, test, build
│   │   ├── deploy-web.yml                  # Web 배포 (Vercel/Netlify)
│   │   ├── deploy-api.yml                  # API 배포 (Fly.io/Railway)
│   │   └── deploy-pipeline.yml             # Pipeline 배포 (Modal/Railway)
│   └── pull_request_template.md
│
├── apps/
│   ├── web/                                # Vite + React (프론트엔드)
│   │   ├── public/
│   │   │   ├── favicon.ico
│   │   │   └── robots.txt
│   │   ├── src/
│   │   │   ├── assets/
│   │   │   │   ├── fonts/
│   │   │   │   └── images/
│   │   │   ├── components/
│   │   │   │   ├── common/                 # 공통 UI 컴포넌트
│   │   │   │   │   ├── Button/
│   │   │   │   │   │   ├── Button.tsx
│   │   │   │   │   │   ├── Button.test.tsx
│   │   │   │   │   │   └── index.ts
│   │   │   │   │   ├── Modal/
│   │   │   │   │   │   ├── Modal.tsx
│   │   │   │   │   │   └── index.ts
│   │   │   │   │   └── Toast/
│   │   │   │   │       ├── Toast.tsx
│   │   │   │   │       └── index.ts
│   │   │   │   ├── editor/                 # 코드 에디터 관련
│   │   │   │   │   ├── CodeEditor/
│   │   │   │   │   │   ├── CodeEditor.tsx  # Monaco Editor 래퍼
│   │   │   │   │   │   ├── CodeEditor.test.tsx
│   │   │   │   │   │   └── index.ts
│   │   │   │   │   ├── OutputPanel/
│   │   │   │   │   │   ├── OutputPanel.tsx # 실행 결과 표시
│   │   │   │   │   │   └── index.ts
│   │   │   │   │   └── HintPanel/
│   │   │   │   │       ├── HintPanel.tsx   # 힌트 표시 패널
│   │   │   │   │       └── index.ts
│   │   │   │   ├── lesson/                 # 레슨 관련
│   │   │   │   │   ├── LessonCard/
│   │   │   │   │   │   ├── LessonCard.tsx
│   │   │   │   │   │   └── index.ts
│   │   │   │   │   ├── LessonProgress/
│   │   │   │   │   │   ├── LessonProgress.tsx
│   │   │   │   │   │   └── index.ts
│   │   │   │   │   └── LessonTimer/        # 5~10분 타이머
│   │   │   │   │       ├── LessonTimer.tsx
│   │   │   │   │       └── index.ts
│   │   │   │   └── gamification/           # 게임화 요소
│   │   │   │       ├── BadgeDisplay/
│   │   │   │       │   ├── BadgeDisplay.tsx
│   │   │   │       │   └── index.ts
│   │   │   │       └── StreakCounter/
│   │   │   │           ├── StreakCounter.tsx
│   │   │   │           └── index.ts
│   │   │   ├── pages/
│   │   │   │   ├── Landing/                # 랜딩 페이지
│   │   │   │   │   ├── Landing.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   ├── Auth/
│   │   │   │   │   ├── Login.tsx
│   │   │   │   │   ├── Register.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   ├── Dashboard/              # 학습 대시보드
│   │   │   │   │   ├── Dashboard.tsx
│   │   │   │   │   ├── Dashboard.test.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   ├── Lesson/                 # 레슨 실행 페이지
│   │   │   │   │   ├── LessonPage.tsx
│   │   │   │   │   ├── LessonPage.test.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   └── Profile/                # 사용자 프로필
│   │   │   │       ├── Profile.tsx
│   │   │   │       └── index.ts
│   │   │   ├── hooks/
│   │   │   │   ├── useCodeExecution.ts     # 코드 실행 훅
│   │   │   │   ├── useLesson.ts            # 레슨 상태 관리 훅
│   │   │   │   ├── useHint.ts              # 힌트 요청 훅
│   │   │   │   ├── useAuth.ts              # 인증 훅
│   │   │   │   └── useProgress.ts          # 학습 진도 훅
│   │   │   ├── stores/                     # Zustand 상태 관리
│   │   │   │   ├── authStore.ts
│   │   │   │   ├── lessonStore.ts
│   │   │   │   └── editorStore.ts
│   │   │   ├── services/                   # API 통신 레이어
│   │   │   │   ├── api.ts                  # axios/fetch 인스턴스
│   │   │   │   ├── lessonService.ts
│   │   │   │   ├── codeService.ts
│   │   │   │   ├── authService.ts
│   │   │   │   └── hintService.ts          # AI 힌트 요청
│   │   │   ├── styles/
│   │   │   │   ├── globals.css
│   │   │   │   └── themes/
│   │   │   │       ├── light.css
│   │   │   │       └── dark.css
│   │   │   ├── types/                      # 웹 전용 타입 (shared 보완)
│   │   │   │   └── ui.types.ts
│   │   │   ├── utils/
│   │   │   │   ├── cn.ts                   # className 유틸
│   │   │   │   └── formatTime.ts
│   │   │   ├── router/
│   │   │   │   └── index.tsx               # React Router 설정
│   │   │   ├── App.tsx
│   │   │   └── main.tsx
│   │   ├── index.html
│   │   ├── vite.config.ts
│   │   ├── tsconfig.json
│   │   ├── tsconfig.node.json
│   │   ├── tailwind.config.ts
│   │   ├── vitest.config.ts
│   │   ├── .env.example
│   │   └── package.json
│   │
│   ├── api/                                # Fastify (백엔드 API)
│   │   ├── src/
│   │   │   ├── plugins/                    # Fastify 플러그인
│   │   │   │   ├── auth.ts                 # JWT 인증 플러그인
│   │   │   │   ├── cors.ts
│   │   │   │   ├── rateLimit.ts            # API 레이트 리밋
│   │   │   │   ├── swagger.ts              # API 문서 자동화
│   │   │   │   └── sensible.ts             # fastify-sensible
│   │   │   ├── routes/
│   │   │   │   ├── v1/
│   │   │   │   │   ├── auth/
│   │   │   │   │   │   ├── index.ts        # POST /auth/register, /auth/login
│   │   │   │   │   │   └── auth.schema.ts  # Zod/JSON Schema 검증
│   │   │   │   │   ├── lessons/
│   │   │   │   │   │   ├── index.ts        # GET /lessons, /lessons/:id
│   │   │   │   │   │   └── lessons.schema.ts
│   │   │   │   │   ├── code/
│   │   │   │   │   │   ├── index.ts        # POST /code/execute (코드 실행)
│   │   │   │   │   │   └── code.schema.ts
│   │   │   │   │   ├── hints/
│   │   │   │   │   │   ├── index.ts        # POST /hints (AI 힌트 요청 → pipeline 호출)
│   │   │   │   │   │   └── hints.schema.ts
│   │   │   │   │   ├── progress/
│   │   │   │   │   │   ├── index.ts        # GET/POST /progress
│   │   │   │   │   │   └── progress.schema.ts
│   │   │   │   │   └── users/
│   │   │   │   │       ├── index.ts        # GET /users/me, PATCH /users/me
│   │   │   │   │       └── users.schema.ts
│   │   │   │   └── index.ts                # 라우트 통합 등록
│   │   │   ├── services/                   # 비즈니스 로직
│   │   │   │   ├── authService.ts
│   │   │   │   ├── lessonService.ts
│   │   │   │   ├── codeExecutionService.ts # 코드 샌드박스 연동
│   │   │   │   ├── hintService.ts          # pipeline 서버 호출
│   │   │   │   ├── progressService.ts
│   │   │   │   └── userService.ts
│   │   │   ├── repositories/               # DB 접근 레이어 (Prisma)
│   │   │   │   ├── userRepository.ts
│   │   │   │   ├── lessonRepository.ts
│   │   │   │   └── progressRepository.ts
│   │   │   ├── middlewares/
│   │   │   │   ├── errorHandler.ts         # 전역 에러 핸들러
│   │   │   │   └── requestLogger.ts
│   │   │   ├── lib/
│   │   │   │   ├── prisma.ts               # Prisma 클라이언트 싱글톤
│   │   │   │   ├── redis.ts                # Redis 클라이언트 (세션/캐시)
│   │   │   │   └── pipelineClient.ts       # Python pipeline HTTP 클라이언트
│   │   │   ├── types/                      # API 전용 타입
│   │   │   │   └── fastify.d.ts            # Fastify 타입 확장
│   │   │   ├── config/
│   │   │   │   └── index.ts                # 환경변수 파싱 (zod)
│   │   │   └── app.ts                      # Fastify 앱 초기화
│   │   ├── prisma/
│   │   │   ├── schema.prisma               # DB 스키마 정의
│   │   │   ├── migrations/                 # 마이그레이션 이력
│   │   │   └── seed.ts                     # 초기 데이터 시딩
│   │   ├── tests/
│   │   │   ├── unit/
│   │   │   │   ├── services/
│   │   │   │   │   └── lessonService.test.ts
│   │   │   │   └── repositories/
│   │   │   └── integration/
│   │   │       ├── routes/
│   │   │       │   ├── auth.test.ts
│   │   │       │   ├── lessons.test.ts
│   │   │       │   └── code.test.ts
│   │   │       └── helpers/
│   │   │           └── testApp.ts          # 테스트용 Fastify 인스턴스
│   │   ├── .env.example
│   │   ├── tsconfig.json
│   │   └── package.json
│   │
│   └── pipeline/                           # Python LangGraph (AI 파이프라인)
│       ├── src/
│       │   ├── graphs/                     # LangGraph 그래프 정의
│       │   │   ├── hint_graph.py           # 힌트 생성 그래프
│       │   │   │                           #   ┌─ analyze_code_node
│       │   │   │                           #   ├─ check_difficulty_node
│       │   │   │                           #   ├─ generate_hint_node
│       │   │   │                           #   └─ validate_hint_node
│       │   │   ├── lesson_graph.py         # 레슨 콘텐츠 생성 그래프
│       │   │   └── feedback_graph.py       # 코드 피드백 그래프
│       │   ├── nodes/                      # 개별 노드 구현
│       │   │   ├── hint_nodes.py           # 힌트 관련 노드들
│       │   │   ├── code_analysis_nodes.py  # 코드 분석 노드들
│       │   │   ├── lesson_nodes.py         # 레슨 생성 노드들
│       │   │   └── validation_nodes.py     # 검증 노드들
│       │   ├── states/                     # LangGraph State 정의
│       │   │   ├── hint_state.py           # TypedDict 기반 상태
│       │   │   ├── lesson_state.py
│       │   │   └── feedback_state.py
│       │   ├── prompts/                    # 프롬프트 템플릿
│       │   │   ├── hint_prompts.py
│       │   │   ├── lesson_prompts.py
│       │   │   └── feedback_prompts.py
│       │   ├── tools/                      # LangChain 커스텀 툴
│       │   │   ├── code_runner_tool

---

## 9. PM 최종 보고서

# 🎯 최종 프로젝트 리포트
## Hello World 앱 개발 프로젝트

**프로젝트 ID**: `test-all`  
**문서 작성일**: 2025년 1월  
**리포트 상태**: ✅ Final  
**버전**: v1.0

---

## 📋 목차

1. [프로젝트 개요](#1-프로젝트-개요)
2. [기술 스택 요약](#2-기술-스택-요약)
3. [시스템 아키텍처](#3-시스템-아키텍처)
4. [에이전트별 산출물 현황](#4-에이전트별-산출물-현황)
5. [기술 의사결정 근거](#5-기술-의사결정-근거)
6. [다음 단계 로드맵](#6-다음-단계-로드맵)
7. [기술 부채 및 위험 관리](#7-기술-부채-및-위험-관리)
8. [실행 통계 및 지표](#8-실행-통계-및-지표)

---

## 1. 프로젝트 개요

### 1.1 아이디어 요약

| 항목 | 내용 |
|------|------|
| **프로젝트명** | Hello World 학습 플랫폼 |
| **핵심 비전** | 초보자 개발자들이 브라우저에서 직접 코드를 작성하고 실행할 수 있는 온라인 학습 환경 |
| **타겟 사용자** | 프로그래밍 입문자 (10-40대) |
| **주요 차별점** | 낮은 진입장벽 + 빠른 실행 응답 + 직관적 UX |

### 1.2 최종 제품 정의

```
┌─────────────────────────────────────────────────────────────┐
│                    Hello World Platform                      │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  브라우저 기반 코드 에디터 + 실시간 실행 환경                   │
│                                                               │
│  ✓ 실시간 문법 하이라이팅 (Syntax Highlighting)               │
│  ✓ 코드 실행 응답시간 < 3초                                   │
│  ✓ 다중 언어 지원 (Python, JavaScript, Java 등)              │
│  ✓ 학습 진도 추적 및 배지 시스템                              │
│  ✓ 커뮤니티 코드 공유 기능                                     │
│  ✓ 초보자 맞춤형 에러 메시지                                   │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

### 1.3 핵심 비기능 요구사항

| 요구사항 | 목표값 | 기술적 영향 |
|---------|--------|-----------|
| **응답시간** | < 3초 | 컨테이너 기반 실행, CDN 활용 |
| **초기 로딩** | < 2초 | 번들 크기 최소화, Tree shaking |
| **동시 사용자** | 1,000+ | 로드 밸런싱, 캐싱 전략 |
| **가용성** | 99.5% | 다중 AZ 배포, 자동 페일오버 |
| **비용** | 월 $500 이하 | OSS, 자동 스케일링 |

---

## 2. 기술 스택 요약

### 2.1 전체 기술 스택 매트릭스

```
┌──────────────────┬─────────────────────┬────────────────────────────┐
│   계층           │    기술              │        선택 근거           │
├──────────────────┼─────────────────────┼────────────────────────────┤
│ FRONTEND         │                     │                            │
│ - 프레임워크     │ React 18.x          │ 컴포넌트 재사용성, 성숙도  │
│ - 번들러         │ Vite                │ 개발 속도, HMR 지원        │
│ - 상태관리       │ Zustand             │ 경량, 보일러플레이트 최소  │
│ - UI 라이브러리  │ Tailwind CSS        │ 빠른 개발, 커스터마이징   │
│ - 에디터         │ Monaco Editor       │ VS Code 동일 기능          │
│ - HTTP 클라이언트│ Axios               │ 인터셉터, 요청/응답 처리  │
├──────────────────┼─────────────────────┼────────────────────────────┤
│ BACKEND         │                     │                            │
│ - 런타임         │ Node.js 18 LTS      │ 빠른 개발, 큰 커뮤니티     │
│ - 프레임워크     │ Express.js          │ 경량, 미들웨어 확장성      │
│ - 코드 샌드박스  │ Docker + Isolation  │ 보안, 리소스 제한          │
│ - 작업 큐        │ Bull/Redis          │ 비동기 작업 처리           │
│ - 인증          │ JWT + OAuth2.0      │ 토큰 기반, 확장성          │
├──────────────────┼─────────────────────┼────────────────────────────┤
│ DATABASE        │                     │                            │
│ - 메인 DB       │ PostgreSQL 15       │ ACID, 복잡 쿼리, 신뢰성   │
│ - 캐시 레이어   │ Redis 7.x           │ 빠른 응답, 세션 저장소     │
│ - 파일 저장소   │ S3/MinIO            │ 확장성, 비용 최적화        │
├──────────────────┼─────────────────────┼────────────────────────────┤
│ INFRA & DevOps  │                     │                            │
│ - 컨테이너화    │ Docker              │ 일관성, 격리, 확장성       │
│ - 오케스트레이션│ Kubernetes / Docker │ 자동 스케일링              │
│ - CI/CD         │ GitHub Actions      │ 무료, 기본 제공            │
│ - IaC           │ Terraform           │ 선언적 인프라 관리         │
│ - 클라우드       │ AWS (또는 GCP)      │ 비용 효율, 글로벌 인프라   │
├──────────────────┼─────────────────────┼────────────────────────────┤
│ MONITORING      │                     │                            │
│ - 로깅          │ ELK Stack / Loki    │ 로그 분석, 디버깅          │
│ - 메트릭        │ Prometheus          │ 성능 모니터링              │
│ - 트레이싱      │ Jaeger              │ 요청 흐름 추적             │
│ - 알림          │ AlertManager        │ 임계값 기반 알림           │
├──────────────────┼─────────────────────┼────────────────────────────┤
│ SECURITY        │                     │                            │
│ - 방화벽        │ WAF + Network ACL   │ DDoS 방어                  │
│ - 스캔          │ OWASP ZAP           │ 취약점 분석                │
│ - 의존성 관리   │ Snyk / Dependabot   │ 자동 패치                  │
│ - 시크릿 관리   │ HashiCorp Vault     │ 암호 안전 저장             │
└──────────────────┴─────────────────────┴────────────────────────────┘
```

### 2.2 버전 요약표

| 컴포넌트 | 버전 | 상태 | 지원 종료 |
|---------|------|------|---------|
| Node.js | 18 LTS | ✅ 안정 | 2025-04 |
| React | 18.2+ | ✅ 안정 | - |
| PostgreSQL | 15 | ✅ 안정 | 2027-10 |
| Kubernetes | 1.28+ | ✅ 안정 | 3개월마다 |
| Docker | 24.x | ✅ 안정 | 6개월마다 |

---

## 3. 시스템 아키텍처

### 3.1 전체 아키텍처 다이어그램

```
┌─────────────────────────────────────────────────────────────────────┐
│                          사용자 (브라우저)                              │
└────────────────────────┬────────────────────────────────────────────┘
                         │ HTTPS
                    ┌────▼─────┐
                    │  CDN      │ (정적 자산)
                    └────┬──────┘
                         │
         ┌───────────────┼───────────────┐
         │               │               │
    ┌────▼─────┐    ┌────▼─────┐   ┌────▼──────┐
    │ API GW   │    │ Auth Svc  │   │  Static   │
    │ (ALB)    │    │ (JWT)     │   │  Content  │
    └────┬─────┘    └────┬──────┘   └───────────┘
         │                │
    ┌────▼────────────────▼──────┐
    │  Kubernetes Cluster        │
    │  ┌──────────────────────┐  │
    │  │ Frontend Pods (4)    │  │
    │  │ - React App          │  │
    │  │ - Nginx Reverse Proxy│  │
    │  └──────────────────────┘  │
    │  ┌──────────────────────┐  │
    │  │ Backend Pods (6)     │  │
    │  │ - Express.js         │  │
    │  │ - API Routes         │  │
    │  └──────────────────────┘  │
    │  ┌──────────────────────┐  │
    │  │ Worker Pods (2)      │  │
    │  │ - Code Execution     │  │
    │  │ - Bull Jobs          │  │
    │  └──────────────────────┘  │
    └────┬────────────────────────┘
         │
    ┌────┴─────────────────────────────┐
    │                                   │
┌───▼──────┐    ┌────────────┐    ┌───▼─────┐
│PostgreSQL│    │   Redis    │    │   S3    │
│Database  │    │   Cache    │    │ Storage │
│(RDS)     │    │  (ElastiC) │    │(MinIO)  │
└──────────┘    └────────────┘    └─────────┘

        ┌───────────────────────────────┐
        │  Monitoring & Observability   │
        │  ┌──────────┐  ┌──────────┐  │
        │  │Prometheus│  │   Loki   │  │
        │  └──────────┘  └──────────┘  │
        │  ┌──────────┐  ┌──────────┐  │
        │  │  Jaeger  │  │ Grafana  │  │
        │  └──────────┘  └──────────┘  │
        └───────────────────────────────┘
```

### 3.2 데이터 흐름 (코드 실행)

```
1️⃣  사용자 코드 입력
    │
    ▼
2️⃣  Frontend: 코드 검증 + 문법 체크 (Monaco)
    │
    ▼
3️⃣  Backend: 요청 수신, Job 큐에 추가
    │
    ▼
4️⃣  Worker: 분리된 컨테이너에서 코드 실행
    │
    ├─ 시간 제한: 30초 (타임아웃)
    ├─ 메모리 제한: 256MB
    ├─ CPU 제한: 0.5 core
    │
    ▼
5️⃣  결과 수집: 출력, 에러, 메타데이터
    │
    ▼
6️⃣  Redis 캐싱: 결과 임시 저장
    │
    ▼
7️⃣  WebSocket: 실시간 결과 스트리밍
    │
    ▼
8️⃣  Frontend: 결과 렌더링 + 저장 버튼
    │
    ▼
9️⃣  Database: 코드 히스토리 저장
    │
    ▼
🔟  Analytics: 실행 로그 수집
```

### 3.3 보안 계층

```
┌─────────────────────────────────────────────┐
│          Security Architecture              │
├─────────────────────────────────────────────┤
│                                             │
│  1️⃣  Edge Layer (AWS WAF)                   │
│     - DDoS 방어                              │
│     - SQL Injection 블로킹                   │
│     - Rate limiting                         │
│                                             │
│  2️⃣  API Gateway                           │
│     - 인증 검증 (JWT)                       │
│     - CORS 정책 강제                        │
│     - API 키 검증                           │
│                                             │
│  3️⃣  Application Layer                     │
│     - 입력 검증 (Joi)                       │
│     - 권한 확인 (RBAC)                      │
│     - 감사 로깅                              │
│                                             │
│  4️⃣  Code Execution Layer                  │
│     - 네임스페이스 격리 (Linux)              │
│     - 리소스 제한 (cgroups)                  │
│     - 화이트리스트 라이브러리                │
│                                             │

---

## 5. 프론트엔드 코드

### `frontend_setup.md`

# Vite + React + Tailwind CSS 프론트엔드 초기 설정 가이드

## 1. 프로젝트 생성

```bash
# Vite를 사용한 React 프로젝트 생성
npm create vite@latest hello-world-web -- --template react
cd hello-world-web

# 또는 TypeScript 사용
npm create vite@latest hello-world-web -- --template react-ts
cd hello-world-web
```

## 2. 필수 패키지 설치

```bash
# 의존성 설치
npm install

# Tailwind CSS 및 관련 패키지 설치
npm install -D tailwindcss postcss autoprefixer

# Tailwind CSS 초기화
npx tailwindcss init -p
```

이 명령어는 다음 두 파일을 자동 생성합니다:
- `tailwind.config.js`
- `postcss.config.js`

## 3. Tailwind CSS 설정

### 3.1 `tailwind.config.js`

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Color: 학습 활동성과 신뢰감
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c3d66',
        },
        // Success Color: 성취감과 긍정
        success: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#134e4a',
        },
        // Warning Color: 주의/에러 경고
        warning: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        // Danger Color: 위험/삭제
        danger: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
        },
        // Neutral Colors: 다크 테마 기반
        neutral: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        },
      },
      fontFamily: {
        sans: ['Pretendard', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'xs': ['12px', { lineHeight: '16px' }],
        'sm': ['14px', { lineHeight: '20px' }],
        'base': ['16px', { lineHeight: '24px' }],
        'lg': ['18px', { lineHeight: '28px' }],
        'xl': ['20px', { lineHeight: '28px' }],
        '2xl': ['24px', { lineHeight: '32px' }],
        '3xl': ['30px', { lineHeight: '36px' }],
        '4xl': ['36px', { lineHeight: '40px' }],
      },
      spacing: {
        'xs': '4px',
        'sm': '8px',
        'md': '12px',
        'lg': '16px',
        'xl': '24px',
        '2xl': '32px',
        '3xl': '48px',
        '4xl': '64px',
      },
      borderRadius: {
        'xs': '4px',
        'sm': '8px',
        'md': '12px',
        'lg': '16px',
        'xl': '20px',
        'full': '9999px',
      },
      boxShadow: {
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'base': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'dark': '0 20px 25px -5px rgba(0, 0, 0, 0.3)',
      },
      backdropBlur: {
        'xs': '2px',
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
      },
    },
  },
  plugins: [],
  darkMode: 'class', // 다크 모드 활성화
}
```

### 3.2 `postcss.config.js`

```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

## 4. 글로벌 스타일 설정

### 4.1 `src/index.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* 기본 폰트 설정 */
@layer base {
  html {
    @apply scroll-smooth;
  }

  body {
    @apply bg-neutral-900 text-neutral-100 font-sans;
  }

  /* 제목 스타일 */
  h1 {
    @apply text-4xl font-bold tracking-tight;
  }

  h2 {
    @apply text-3xl font-bold tracking-tight;
  }

  h3 {
    @apply text-2xl font-bold;
  }

  h4 {
    @apply text-xl font-semibold;
  }

  /* 링크 스타일 */
  a {
    @apply text-primary-500 hover:text-primary-400 transition-colors duration-200;
  }

  /* 버튼 리셋 */
  button {
    @apply transition-all duration-200;
  }

  /* 입력 필드 스타일 */
  input,
  textarea,
  select {
    @apply bg-neutral-800 border border-neutral-700 rounded-md px-3 py-2
           text-neutral-100 focus:outline-none focus:ring-2 focus:ring-primary-500
           focus:border-transparent transition-all duration-200;
  }

  input::placeholder {
    @apply text-neutral-500;
  }
}

/* 컴포넌트 레이어 */
@layer components {
  .container-custom {
    @apply max-w-7xl mx-auto px-4 sm:px-6 lg:px-8;
  }

  .btn {
    @apply inline-flex items-center justify-center px-4 py-2 rounded-md
           font-medium transition-colors duration-200 disabled:opacity-50
           disabled:cursor-not-allowed;
  }

  .btn-primary {
    @apply btn bg-primary-500 text-white hover:bg-primary-600
           active:bg-primary-700;
  }

  .btn-secondary {
    @apply btn bg-neutral-700 text-neutral-100 hover:bg-neutral-600
           active:bg-neutral-800;
  }

  .btn-danger {
    @apply btn bg-danger-500 text-white hover:bg-danger-600
           active:bg-danger-700;
  }

  .card {
    @apply bg-neutral-800 rounded-lg border border-neutral-700
           p-6 shadow-md hover:shadow-lg transition-shadow duration-200;
  }

  .badge {
    @apply inline-flex items-center px-3 py-1 rounded-full text-xs
           font-medium;
  }

  .badge-primary {
    @apply badge bg-primary-500/20 text-primary-300;
  }

  .badge-success {
    @apply badge bg-success-500/20 text-success-300;
  }

  .badge-warning {
    @apply badge bg-warning-500/20 text-warning-300;
  }

  .badge-danger {
    @apply badge bg-danger-500/20 text-danger-300;
  }
}

/* 유틸리티 레이어 */
@layer utilities {
  /* 스크롤바 스타일 */
  @supports (scrollbar-color: auto) {
    ::-webkit-scrollbar {
      @apply w-2 h-2;
    }

    ::-webkit-scrollbar-track {
      @apply bg-neutral-800;
    }

    ::-webkit-scrollbar-thumb {
      @apply bg-neutral-600 rounded hover:bg-neutral-500;
    }
  }

  /* 텍스트 절단 */
  .truncate-line-1 {
    @apply truncate;
  }

  .truncate-line-2 {
    @apply line-clamp-2;
  }

  .truncate-line-3 {
    @apply line-clamp-3;
  }

  /* Flex 센터 */
  .flex-center {
    @apply flex items-center justify-center;
  }

  /* 그리드 센터 */
  .grid-center {
    @apply grid place-items-center;
  }

  /* 배경 그라데이션 */
  .gradient-primary {
    @apply bg-gradient-to-br from-primary-600 to-primary-900;
  }

  .gradient-success {
    @apply bg-gradient-to-br from-success-600 to-success-900;
  }

  /* 애니메이션 */
  .animate-shimmer {
    animation: shimmer 2s infinite;
  }

  @keyframes shimmer {
    0% {
      background-position: -1000px 0;
    }
    100% {
      background-position: 1000px 0;
    }
  }
}
```

## 5. 환경 변수 설정

### 5.1 `.env` (로컬 개발용)

```env
# API 설정
VITE_API_URL=http://localhost:3000
VITE_API_TIMEOUT=10000

# 앱 설정
VITE_APP_NAME=Hello World
VITE_APP_VERSION=1.0.0

# 기능 플래그
VITE_ENABLE_DARK_MODE=true
VITE_ENABLE_ANALYTICS=false
```

### 5.2 `.env.production` (프로덕션용)

```env
# API 설정
VITE_API_URL=https://api.example.com
VITE_API_TIMEOUT=10000

# 앱 설정
VITE_APP_NAME=Hello World
VITE_APP_VERSION=1.0.0

# 기능 플래그
VITE_ENABLE_DARK_MODE=true
VITE_ENABLE_ANALYTICS=true
```

### 5.3 `.env.staging` (스테이징용)

```env
# API 설정
VITE_API_URL=https://api-staging.example.com
VITE_API_TIMEOUT=10000

# 앱 설정
VITE_APP_NAME=Hello World (Staging)
VITE_APP_VERSION=1.0.0

# 기능 플래그
VITE_ENABLE_DARK_MODE=true
VITE_ENABLE_ANALYTICS=true
```

### 5.4 `.env.d.ts` (타입스크립트 타입 정의)

```typescript
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string
  readonly VITE_API_TIMEOUT: string
  readonly VITE_APP_NAME: string
  readonly VITE_APP_VERSION: string
  readonly VITE_ENABLE_DARK_MODE: string
  readonly VITE_ENABLE_ANALYTICS: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
```

### 5.5 `src/config/env.ts` (환경 변수 헬퍼)

```typescript
export const env = {
  api: {
    url: import.meta.env.VITE_API_URL || 'http://localhost:3000',
    timeout: parseInt(import.meta.env.VITE_API_TIMEOUT || '10000', 10),
  },
  app: {
    name: import.meta.env.VITE_APP_NAME || 'Hello World',
    version: import.meta.env.VITE_APP_VERSION || '1.0.0',
  },
  features: {
    darkMode: import.meta.env.VITE_ENABLE_DARK_MODE === 'true',
    analytics: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
  },
} as const

export type Env = typeof env
```

## 6. Vite 설정

### 6.1 `vite.config.ts`

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  preview: {
    port: 4173,
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
      },
    },
  },
  resolve: {
    alias: {

### `frontend_components.md`

# Hello World 디자인 시스템 - 핵심 UI 컴포넌트

실제 동작하는 JSX 코드를 작성하겠습니다.

## 1. Button 컴포넌트

```tsx
// apps/web/src/components/common/Button/Button.tsx
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      isLoading = false,
      icon,
      children,
      className = '',
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles = 'font-medium rounded-lg transition-all duration-200 flex items-center justify-center gap-2';

    const variantStyles = {
      primary: 'bg-sky-500 hover:bg-sky-600 text-white shadow-lg hover:shadow-xl active:bg-sky-700',
      secondary: 'bg-slate-700 hover:bg-slate-800 text-white shadow-md hover:shadow-lg active:bg-slate-900',
      success: 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg hover:shadow-xl active:bg-emerald-700',
      warning: 'bg-amber-500 hover:bg-amber-600 text-white shadow-lg hover:shadow-xl active:bg-amber-700',
      danger: 'bg-red-500 hover:bg-red-600 text-white shadow-lg hover:shadow-xl active:bg-red-700',
    };

    const sizeStyles = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
    };

    const disabledStyles = disabled || isLoading ? 'opacity-50 cursor-not-allowed' : '';

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${disabledStyles} ${className}`}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <>
            <svg
              className="animate-spin h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span>로딩 중...</span>
          </>
        ) : (
          <>
            {icon && icon}
            {children}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
export default Button;
```

## 2. StatusBadge 컴포넌트

```tsx
// apps/web/src/components/common/StatusBadge/StatusBadge.tsx
import React from 'react';

interface StatusBadgeProps {
  status: 'completed' | 'in-progress' | 'pending' | 'failed';
  size?: 'sm' | 'md' | 'lg';
  icon?: boolean;
  label?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md', icon = true, label }) => {
  const statusConfig = {
    completed: {
      bg: 'bg-emerald-100',
      text: 'text-emerald-700',
      dot: 'bg-emerald-500',
      label: '완료됨',
    },
    'in-progress': {
      bg: 'bg-sky-100',
      text: 'text-sky-700',
      dot: 'bg-sky-500',
      label: '진행 중',
    },
    pending: {
      bg: 'bg-amber-100',
      text: 'text-amber-700',
      dot: 'bg-amber-500',
      label: '대기 중',
    },
    failed: {
      bg: 'bg-red-100',
      text: 'text-red-700',
      dot: 'bg-red-500',
      label: '실패',
    },
  };

  const sizeStyles = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base',
  };

  const config = statusConfig[status];

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full font-medium ${config.bg} ${config.text} ${sizeStyles[size]}`}>
      {icon && <span className={`inline-block w-2 h-2 rounded-full ${config.dot}`} />}
      {label || config.label}
    </span>
  );
};

export default StatusBadge;
```

## 3. ProgressBar 컴포넌트

```tsx
// apps/web/src/components/common/ProgressBar/ProgressBar.tsx
import React from 'react';

interface ProgressBarProps {
  progress: number; // 0-100
  variant?: 'primary' | 'success' | 'warning' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  animated?: boolean;
  label?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  variant = 'primary',
  size = 'md',
  showLabel = true,
  animated = true,
  label,
}) => {
  // progress 0-100 범위로 제한
  const normalizedProgress = Math.min(100, Math.max(0, progress));

  const variantStyles = {
    primary: 'bg-sky-500',
    success: 'bg-emerald-500',
    warning: 'bg-amber-500',
    danger: 'bg-red-500',
  };

  const sizeStyles = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3',
  };

  const bgSizeStyles = {
    sm: 'h-1 bg-slate-700',
    md: 'h-2 bg-slate-700',
    lg: 'h-3 bg-slate-700',
  };

  return (
    <div className="w-full">
      {(showLabel || label) && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-slate-300">{label || '진행률'}</span>
          <span className="text-sm font-semibold text-sky-400">{normalizedProgress}%</span>
        </div>
      )}
      <div className={`w-full rounded-full overflow-hidden ${bgSizeStyles[size]}`}>
        <div
          className={`${variantStyles[variant]} ${sizeStyles[size]} rounded-full transition-all duration-500 ${
            animated ? 'ease-out' : ''
          }`}
          style={{ width: `${normalizedProgress}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
```

## 4. Notification 컴포넌트 (기능 컴포넌트 1)

```tsx
// apps/web/src/components/common/Notification/Notification.tsx
import React, { useState, useEffect } from 'react';

interface NotificationProps {
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  onClose?: () => void;
  autoClose?: number; // ms, 0 = 자동 닫기 없음
  action?: {
    label: string;
    onClick: () => void;
  };
}

const Notification: React.FC<NotificationProps> = ({
  type,
  title,
  message,
  onClose,
  autoClose = 5000,
  action,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (autoClose === 0) return;

    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose?.();
    }, autoClose);

    return () => clearTimeout(timer);
  }, [autoClose, onClose]);

  if (!isVisible) return null;

  const typeConfig = {
    success: {
      bg: 'bg-emerald-900 border-emerald-700',
      icon: '✓',
      iconColor: 'text-emerald-400',
      title: 'text-emerald-200',
      message: 'text-emerald-100',
    },
    error: {
      bg: 'bg-red-900 border-red-700',
      icon: '✕',
      iconColor: 'text-red-400',
      title: 'text-red-200',
      message: 'text-red-100',
    },
    warning: {
      bg: 'bg-amber-900 border-amber-700',
      icon: '⚠',
      iconColor: 'text-amber-400',
      title: 'text-amber-200',
      message: 'text-amber-100',
    },
    info: {
      bg: 'bg-sky-900 border-sky-700',
      icon: 'ℹ',
      iconColor: 'text-sky-400',
      title: 'text-sky-200',
      message: 'text-sky-100',
    },
  };

  const config = typeConfig[type];

  return (
    <div
      className={`${config.bg} border rounded-lg p-4 shadow-lg animate-in slide-in-from-right duration-300 flex items-start gap-3`}
    >
      <span className={`text-xl font-bold ${config.iconColor} flex-shrink-0`}>{config.icon}</span>
      <div className="flex-1">
        <h3 className={`font-semibold ${config.title}`}>{title}</h3>
        <p className={`text-sm mt-1 ${config.message}`}>{message}</p>
      </div>
      {action && (
        <button
          onClick={action.onClick}
          className="text-sky-400 hover:text-sky-300 font-medium text-sm flex-shrink-0"
        >
          {action.label}
        </button>
      )}
      <button
        onClick={() => {
          setIsVisible(false);
          onClose?.();
        }}
        className="text-slate-400 hover:text-slate-300 flex-shrink-0"
      >
        ✕
      </button>
    </div>
  );
};

export default Notification;
```

## 5. Card 컴포넌트 (기능 컴포넌트 2)

```tsx
// apps/web/src/components/common/Card/Card.tsx
import React from 'react';

interface CardProps {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  header?: React.ReactNode;
  hoverable?: boolean;
  clickable?: boolean;
  onClick?: () => void;
  className?: string;
  variant?: 'default' | 'elevated' | 'outlined';
}

const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  children,
  footer,
  header,
  hoverable = false,
  clickable = false,
  onClick,
  className = '',
  variant = 'default',
}) => {
  const variantStyles = {
    default: 'bg-slate-800 border border-slate-700',
    elevated: 'bg-slate-800 border border-slate-700 shadow-xl',
    outlined: 'bg-transparent border-2 border-slate-600',
  };

  const interactiveStyles =
    (hoverable || clickable) && 'transition-all duration-200 cursor-pointer hover:border-sky-500';
  const clickableStyles = clickable && 'hover:bg-slate-700';

  return (
    <div
      className={`rounded-lg p-6 ${variantStyles[variant]} ${interactiveStyles} ${clickableStyles} ${className}`}
      onClick={onClick}
      role={clickable ? 'button' : undefined}
      tabIndex={clickable ? 0 : undefined}
    >
      {header && <div className="mb-4">{header}</div>}

      {(title || subtitle) && (
        <div className="mb-4">
          {title && <h3 className="text-lg font-semibold text-white">{title}</h3>}
          {subtitle && <p className="text-sm text-slate-400 mt-1">{subtitle}</p>}
        </div>
      )}

      <div className="text-slate-200">{children}</div>

      {footer && (
        <div className="mt-6 pt-4 border-t border-slate-700">
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;
```

## 6. 전체 통합 Demo 컴포넌트

```tsx
// apps/web/src/components/ComponentDemo.tsx
import React, { useState } from 'react';
import Button from './common/Button/Button';
import StatusBadge from './common/StatusBadge/StatusBadge';
import ProgressBar from './common/ProgressBar/ProgressBar';
import Notification from './common/Notification/Notification';
import Card from './common/Card/Card';

export const ComponentDemo: React.FC = () => {
  const [progress, setProgress] = useState(45);
  const [notifications, setNotifications] = useState<Array<{ id: string; type: any; title: string; message: string }>>([]);
  const [isLoading, setIsLoading] = useState(false);

  const showNotification = (type: 'success' | 'error' | 'warning' | 'info', title: string, message: string) => {
    const id = Date.now().toString();
    setNotifications((prev) => [...prev, { id, type, title, message }]);
  };

  const handleSimulateProgress = () => {
    setIsLoading(true);
    setTimeout(() => {
      setProgress((prev) => Math.min(100, prev + 20));
      setIsLoading(false);
      showNotification('success', '진행률 업데이트', `진행률이 ${progress + 20}%로 업데이트되었습니다.`);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-950 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text

### `frontend_pages.md`

# 주요 페이지 컴포넌트 코드

Turborepo 구조에 맞춘 React Router 기반 페이지 컴포넌트들을 작성하겠습니다.

## 1. 라우팅 설정 (`src/router.tsx`)

```tsx
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './layouts/Layout';
import HomePage from './pages/HomePage';
import LearningPage from './pages/LearningPage';
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';
import NotFoundPage from './pages/NotFoundPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'learning',
        element: <LearningPage />,
      },
      {
        path: 'dashboard',
        element: <DashboardPage />,
      },
      {
        path: 'profile',
        element: <ProfilePage />,
      },
    ],
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
```

## 2. 레이아웃 (`src/layouts/Layout.tsx`)

```tsx
import { Outlet } from 'react-router-dom';
import Header from '../components/common/Header';
import Sidebar from '../components/common/Sidebar';
import Footer from '../components/common/Footer';

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-950">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 overflow-y-auto">
          <div className="container mx-auto px-4 py-8">
            <Outlet />
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
```

## 3. 홈 페이지 (`src/pages/HomePage.tsx`)

```tsx
import { Link } from 'react-router-dom';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import { ArrowRight, Zap, Target, Users, TrendingUp } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-sky-600 to-sky-400 px-8 py-20 text-white">
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-5xl font-bold leading-tight mb-6">
            Hello World, 학습의 새로운 경험
          </h1>
          <p className="text-xl text-sky-100 mb-8">
            AI 기반 맞춤형 학습으로 개발자의 꿈을 현실로 만드세요.
            효율적이고 재미있는 프로그래밍 학습 여정을 시작하세요.
          </p>
          <div className="flex gap-4">
            <Link to="/learning">
              <Button size="lg" className="bg-white text-sky-600 hover:bg-sky-50">
                지금 시작하기
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white/10"
            >
              자세히 알아보기
            </Button>
          </div>
        </div>

        {/* Decorative Background */}
        <div className="absolute right-0 top-0 -z-0 opacity-20">
          <div className="w-96 h-96 rounded-full bg-white blur-3xl"></div>
        </div>
      </section>

      {/* Features Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <FeatureCard
          icon={<Zap className="w-8 h-8" />}
          title="AI 맞춤 학습"
          description="개인의 학습 속도와 스타일에 맞춘 개인화된 커리큘럼"
        />
        <FeatureCard
          icon={<Target className="w-8 h-8" />}
          title="목표 달성"
          description="명확한 마일스톤으로 목표를 체계적으로 관리하세요"
        />
        <FeatureCard
          icon={<Users className="w-8 h-8" />}
          title="커뮤니티"
          description="같은 꿈을 가진 개발자들과 함께 성장하세요"
        />
        <FeatureCard
          icon={<TrendingUp className="w-8 h-8" />}
          title="실시간 분석"
          description="학습 진도를 실시간으로 추적하고 최적화하세요"
        />
      </section>

      {/* CTA Section */}
      <section className="rounded-2xl bg-slate-900 border border-slate-800 px-8 py-16 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">
          지금 바로 시작하세요
        </h2>
        <p className="text-slate-400 mb-8 max-w-xl mx-auto">
          무료 회원가입으로 Hello World의 모든 기능을 체험해보세요.
          첫 번째 과정은 완전히 무료입니다.
        </p>
        <Button
          size="lg"
          className="bg-sky-500 hover:bg-sky-600 text-white"
        >
          가입하기
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </section>

      {/* Stats Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <StatCard number="10K+" label="활성 사용자" />
        <StatCard number="500+" label="학습 컨텐츠" />
        <StatCard number="4.9★" label="평균 평점" />
      </section>
    </div>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <Card className="p-6 hover:shadow-lg transition-shadow">
      <div className="text-sky-500 mb-4">{icon}</div>
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-slate-400">{description}</p>
    </Card>
  );
}

interface StatCardProps {
  number: string;
  label: string;
}

function StatCard({ number, label }: StatCardProps) {
  return (
    <div className="text-center p-6 rounded-lg bg-slate-900 border border-slate-800">
      <p className="text-4xl font-bold text-sky-400 mb-2">{number}</p>
      <p className="text-slate-400">{label}</p>
    </div>
  );
}
```

## 4. 학습 페이지 (`src/pages/LearningPage.tsx`)

```tsx
import { useState } from 'react';
import { ChevronRight, Play, Lock, CheckCircle, Clock } from 'lucide-react';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import Tabs from '../components/common/Tabs';

interface Course {
  id: string;
  title: string;
  description: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  progress: number;
  lessons: number;
  duration: string;
  isCompleted: boolean;
  isLocked: boolean;
}

const COURSES: Course[] = [
  {
    id: '1',
    title: 'JavaScript 기초',
    description: '변수, 함수, 객체 등 JavaScript의 기본 개념을 배워보세요',
    level: 'beginner',
    progress: 75,
    lessons: 12,
    duration: '4시간',
    isCompleted: false,
    isLocked: false,
  },
  {
    id: '2',
    title: 'React 시작하기',
    description: 'React의 핵심 개념과 Hook을 실습으로 배워봅시다',
    level: 'intermediate',
    progress: 30,
    lessons: 15,
    duration: '6시간',
    isCompleted: false,
    isLocked: false,
  },
  {
    id: '3',
    title: 'TypeScript 마스터',
    description: 'TypeScript를 통해 안전하고 확장 가능한 코드를 작성하세요',
    level: 'intermediate',
    progress: 0,
    lessons: 18,
    duration: '8시간',
    isCompleted: false,
    isLocked: false,
  },
  {
    id: '4',
    title: '고급 React 패턴',
    description: 'Context API, Reducer, 성능 최적화 등 고급 패턴을 학습합니다',
    level: 'advanced',
    progress: 0,
    lessons: 20,
    duration: '10시간',
    isCompleted: false,
    isLocked: true,
  },
];

export default function LearningPage() {
  const [activeTab, setActiveTab] = useState('all');

  const tabs = [
    { id: 'all', label: '모든 과정' },
    { id: 'ongoing', label: '진행 중' },
    { id: 'completed', label: '완료' },
  ];

  const filteredCourses = COURSES.filter((course) => {
    if (activeTab === 'ongoing') return course.progress > 0 && !course.isCompleted;
    if (activeTab === 'completed') return course.isCompleted;
    return true;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-white mb-2">학습 센터</h1>
        <p className="text-slate-400">
          당신의 페이스로 프로그래밍 능력을 키워보세요
        </p>
      </div>

      {/* Learning Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <LearningStatCard
          label="진행 중인 과정"
          value="2"
          color="bg-sky-500"
        />
        <LearningStatCard
          label="학습 시간"
          value="14시간"
          color="bg-green-500"
        />
        <LearningStatCard
          label="완료율"
          value="35%"
          color="bg-purple-500"
        />
      </div>

      {/* Tabs */}
      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      {/* Courses Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredCourses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <div className="text-center py-12 rounded-lg border border-slate-800 bg-slate-900">
          <p className="text-slate-400 mb-4">완료된 과정이 없습니다</p>
          <Button className="bg-sky-500 hover:bg-sky-600">
            새 과정 시작하기
          </Button>
        </div>
      )}
    </div>
  );
}

interface CourseCardProps {
  course: Course;
}

function CourseCard({ course }: CourseCardProps) {
  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner':
        return 'bg-green-500/20 text-green-400';
      case 'intermediate':
        return 'bg-sky-500/20 text-sky-400';
      case 'advanced':
        return 'bg-purple-500/20 text-purple-400';
      default:
        return 'bg-slate-500/20 text-slate-400';
    }
  };

  const getLevelLabel = (level: string) => {
    switch (level) {
      case 'beginner':
        return '초급';
      case 'intermediate':
        return '중급';
      case 'advanced':
        return '고급';
      default:
        return level;
    }
  };

  return (
    <Card className="p-6 hover:shadow-lg transition-shadow relative group">
      {/* Level Badge */}
      <div className="absolute top-4 right-4">
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getLevelColor(course.level)}`}>
          {getLevelLabel(course.level)}
        </span>
      </div>

      {/* Content */}
      <div className="space-y-4">
        <div>
          <h3 className="text-xl font-semibold text-white mb-2">
            {course.title}
          </h3>
          <p className="text-slate-400 text-sm">{course.description}</p>
        </div>

        {/* Progress Bar */}
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm text-slate-400">진행도</span>
            <span className="text-sm font-medium text-sky-400">
              {course.progress}%
            </span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-sky-500 to-sky-400 h-full transition-all"
              style={{ width: `${course.progress}%` }}
            ></div>
          </div>
        </div>

        {/* Meta Info */}
        <div className="flex items-center gap-6 text-sm text-slate-400 pt-2 border-t border-slate-800">
          <div className="flex items-center gap-2">
            <ChevronRight className="w-4 h-4" />
            <span>{course.lessons}개 레슨</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>{course.duration}</span>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-4 border-t border-slate-

### `frontend_hooks.md`

# 커스텀 훅 & Zustand 스토어 구현

## 1. Zustand 스토어 작성

```typescript
// packages/stores/src/useAuthStore.ts
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
  avatar?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  logout: () => void;
  reset: () => void;
}

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,

        setUser: (user) =>
          set({
            user,
            isAuthenticated: !!user,
            error: null,
          }),

        setLoading: (isLoading) =>
          set({ isLoading }),

        setError: (error) =>
          set({ error }),

        logout: () =>
          set({
            user: null,
            isAuthenticated: false,
            error: null,
          }),

        reset: () =>
          set({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,
          }),
      }),
      {
        name: 'auth-storage',
        partialize: (state) => ({
          user: state.user,
          isAuthenticated: state.isAuthenticated,
        }),
      }
    ),
    { name: 'AuthStore' }
  )
);
```

```typescript
// packages/stores/src/useUIStore.ts
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export interface UIState {
  theme: 'dark' | 'light';
  sidebarOpen: boolean;
  notifications: Array<{
    id: string;
    type: 'success' | 'error' | 'warning' | 'info';
    message: string;
    duration?: number;
  }>;

  // Actions
  toggleTheme: () => void;
  setTheme: (theme: 'dark' | 'light') => void;
  toggleSidebar: () => void;
  addNotification: (notification: Omit<UIState['notifications'][0], 'id'>) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
}

export const useUIStore = create<UIState>()(
  devtools(
    (set) => ({
      theme: 'dark',
      sidebarOpen: true,
      notifications: [],

      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === 'dark' ? 'light' : 'dark',
        })),

      setTheme: (theme) =>
        set({ theme }),

      toggleSidebar: () =>
        set((state) => ({
          sidebarOpen: !state.sidebarOpen,
        })),

      addNotification: (notification) =>
        set((state) => ({
          notifications: [
            ...state.notifications,
            {
              ...notification,
              id: `${Date.now()}-${Math.random()}`,
            },
          ],
        })),

      removeNotification: (id) =>
        set((state) => ({
          notifications: state.notifications.filter((n) => n.id !== id),
        })),

      clearNotifications: () =>
        set({ notifications: [] }),
    }),
    { name: 'UIStore' }
  )
);
```

```typescript
// packages/stores/src/useLearningStore.ts
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

export interface Lesson {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  progress: number;
  duration: number; // minutes
  completedAt?: Date;
}

export interface LearningState {
  lessons: Lesson[];
  currentLessonId: string | null;
  totalProgress: number;
  completedCount: number;

  // Actions
  setLessons: (lessons: Lesson[]) => void;
  updateLesson: (id: string, updates: Partial<Lesson>) => void;
  setCurrentLesson: (id: string | null) => void;
  completeLesson: (id: string) => void;
  calculateProgress: () => void;
}

export const useLearningStore = create<LearningState>()(
  devtools(
    persist(
      (set) => ({
        lessons: [],
        currentLessonId: null,
        totalProgress: 0,
        completedCount: 0,

        setLessons: (lessons) =>
          set({ lessons }, false, 'setLessons'),

        updateLesson: (id, updates) =>
          set(
            (state) => ({
              lessons: state.lessons.map((lesson) =>
                lesson.id === id ? { ...lesson, ...updates } : lesson
              ),
            }),
            false,
            'updateLesson'
          ),

        setCurrentLesson: (id) =>
          set({ currentLessonId: id }, false, 'setCurrentLesson'),

        completeLesson: (id) =>
          set(
            (state) => ({
              lessons: state.lessons.map((lesson) =>
                lesson.id === id
                  ? {
                      ...lesson,
                      completed: true,
                      progress: 100,
                      completedAt: new Date(),
                    }
                  : lesson
              ),
            }),
            false,
            'completeLesson'
          ),

        calculateProgress: () =>
          set((state) => {
            const completedCount = state.lessons.filter(
              (l) => l.completed
            ).length;
            const totalProgress =
              state.lessons.length > 0
                ? Math.round(
                    (completedCount / state.lessons.length) * 100
                  )
                : 0;

            return {
              completedCount,
              totalProgress,
            };
          }, false, 'calculateProgress'),
      }),
      {
        name: 'learning-storage',
      }
    ),
    { name: 'LearningStore' }
  )
);
```

## 2. 커스텀 훅 작성

```typescript
// apps/web/src/hooks/useAuth.ts
import { useCallback } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useAuthStore } from '@hello-world/stores';
import { authAPI } from '@/api/auth';

export const useAuth = () => {
  const { user, isAuthenticated, setUser, setError, logout } = useAuthStore();

  // 현재 사용자 정보 조회
  const { data: currentUser, isLoading } = useQuery({
    queryKey: ['auth', 'currentUser'],
    queryFn: authAPI.getCurrentUser,
    enabled: isAuthenticated,
    staleTime: 5 * 60 * 1000, // 5분
  });

  // 로그인
  const loginMutation = useMutation({
    mutationFn: (credentials: { email: string; password: string }) =>
      authAPI.login(credentials),
    onSuccess: (data) => {
      setUser(data.user);
      localStorage.setItem('authToken', data.token);
    },
    onError: (error) => {
      setError(error instanceof Error ? error.message : '로그인 실패');
    },
  });

  // 회원가입
  const signupMutation = useMutation({
    mutationFn: (data: { email: string; password: string; name: string }) =>
      authAPI.signup(data),
    onSuccess: (data) => {
      setUser(data.user);
      localStorage.setItem('authToken', data.token);
    },
    onError: (error) => {
      setError(error instanceof Error ? error.message : '회원가입 실패');
    },
  });

  // 로그아웃
  const logoutMutation = useMutation({
    mutationFn: authAPI.logout,
    onSuccess: () => {
      logout();
      localStorage.removeItem('authToken');
    },
    onError: (error) => {
      setError(error instanceof Error ? error.message : '로그아웃 실패');
    },
  });

  // 비밀번호 변경
  const changePasswordMutation = useMutation({
    mutationFn: (data: { currentPassword: string; newPassword: string }) =>
      authAPI.changePassword(data),
    onSuccess: () => {
      setError(null);
    },
    onError: (error) => {
      setError(error instanceof Error ? error.message : '비밀번호 변경 실패');
    },
  });

  return {
    user: currentUser || user,
    isAuthenticated,
    isLoading,
    login: loginMutation.mutate,
    signup: signupMutation.mutate,
    logout: logoutMutation.mutate,
    changePassword: changePasswordMutation.mutate,
    loginLoading: loginMutation.isPending,
    signupLoading: signupMutation.isPending,
    logoutLoading: logoutMutation.isPending,
  };
};
```

```typescript
// apps/web/src/hooks/useLessons.ts
import { useCallback, useEffect } from 'react';
import { useQuery, useMutation, useInfiniteQuery } from '@tanstack/react-query';
import { useLearningStore } from '@hello-world/stores';
import { lessonsAPI } from '@/api/lessons';

export interface LessonsFilters {
  search?: string;
  category?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  completed?: boolean;
}

export const useLessons = (filters?: LessonsFilters) => {
  const {
    lessons,
    setLessons,
    updateLesson,
    completeLesson,
    calculateProgress,
  } = useLearningStore();

  // 레슨 목록 조회 (무한 스크롤)
  const {
    data: lessonsData,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['lessons', filters],
    queryFn: ({ pageParam = 1 }) =>
      lessonsAPI.getLessons({ ...filters, page: pageParam, limit: 20 }),
    getNextPageParam: (lastPage, allPages) =>
      lastPage.hasMore ? allPages.length + 1 : null,
    staleTime: 5 * 60 * 1000,
  });

  // 레슨 목록을 스토어에 동기화
  useEffect(() => {
    if (lessonsData?.pages) {
      const allLessons = lessonsData.pages.flatMap((page) => page.lessons);
      setLessons(allLessons);
      calculateProgress();
    }
  }, [lessonsData, setLessons, calculateProgress]);

  // 레슨 상세 정보 조회
  const useLesson = (id: string) => {
    return useQuery({
      queryKey: ['lessons', id],
      queryFn: () => lessonsAPI.getLesson(id),
      staleTime: 10 * 60 * 1000,
    });
  };

  // 레슨 진행도 업데이트
  const updateProgressMutation = useMutation({
    mutationFn: (data: { lessonId: string; progress: number }) =>
      lessonsAPI.updateProgress(data.lessonId, data.progress),
    onMutate: ({ lessonId, progress }) => {
      updateLesson(lessonId, { progress });
    },
    onSuccess: (data) => {
      updateLesson(data.id, { progress: data.progress });
    },
  });

  // 레슨 완료
  const completeLessonMutation = useMutation({
    mutationFn: (lessonId: string) =>
      lessonsAPI.completeLesson(lessonId),
    onMutate: (lessonId) => {
      completeLesson(lessonId);
    },
    onSuccess: (data) => {
      updateLesson(data.id, { completed: true, completedAt: new Date() });
      calculateProgress();
    },
  });

  // 레슨 북마크
  const bookmarkMutation = useMutation({
    mutationFn: (data: { lessonId: string; bookmarked: boolean }) =>
      lessonsAPI.toggleBookmark(data.lessonId, data.bookmarked),
    onMutate: ({ lessonId, bookmarked }) => {
      updateLesson(lessonId, { bookmarked });
    },
  });

  const handleLoadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return {
    lessons,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    loadMore: handleLoadMore,
    useLesson,
    updateProgress: updateProgressMutation.mutate,
    completeLesson: completeLessonMutation.mutate,
    toggleBookmark: bookmarkMutation.mutate,
    isUpdatingProgress: updateProgressMutation.isPending,
    isCompletingLesson: completeLessonMutation.isPending,
  };
};
```

```typescript
// apps/web/src/hooks/useNotification.ts
import { useCallback, useEffect } from 'react';
import { useUIStore } from '@hello-world/stores';

export const useNotification = () => {
  const { addNotification, removeNotification } = useUIStore();

  const showNotification = useCallback(
    (
      message: string,
      type: 'success' | 'error' | 'warning' | 'info' = 'info',
      duration = 3000
    ) => {
      addNotification({
        type,
        message,
        duration,
      });
    },
    [addNotification]
  );

  const showSuccess = useCallback(
    (message: string, duration?: number) => {
      showNotification(message, 'success', duration);
    },
    [showNotification]
  );

  const showError = useCallback(
    (message: string, duration?: number) => {
      showNotification(message, 'error', duration);
    },
    [showNotification]
  );

  const showWarning = useCallback(
    (message: string, duration?: number) => {
      showNotification(message, 'warning', duration);
    },
    [showNotification]
  );

  return {
    showNotification,
    showSuccess,
    showError,
    showWarning,
    removeNotification,
  };
};
```

```typescript
// apps/web/src/hooks/useLocalStorage.ts
import { useState, useCallback, useEffect } from 'react';

export const useLocalStorage = <T,>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = typeof window !== 'undefined' ? window.localStorage.getItem(key) : null;
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {

---

## 6. 백엔드 코드

### `backend_setup.md`

# Node.js + Fastify 백엔드 초기 설정 가이드

## 📋 개요

이 가이드는 Hello World 앱의 **Modular Monolith** 백엔드를 Node.js + Fastify로 구축하기 위한 초기 설정 방법을 제시합니다.

---

## 1️⃣ 프로젝트 초기화

### 1.1 Node.js 환경 확인

```bash
# Node.js 18+ 확인 (v18.17.0 이상 권장)
node --version
npm --version
```

### 1.2 프로젝트 디렉토리 생성 및 초기화

```bash
# 프로젝트 디렉토리 생성
mkdir hello-world-backend
cd hello-world-backend

# npm 초기화
npm init -y

# git 초기화 (권장)
git init
```

---

## 2️⃣ 필수 패키지 설치

### 2.1 핵심 패키지

```bash
# Fastify 및 플러그인
npm install fastify fastify-cors fastify-helmet fastify-jwt

# 데이터베이스 (PostgreSQL 권장)
npm install pg sequelize sequelize-cli

# 환경변수 관리
npm install dotenv

# 유틸리티
npm install uuid lodash

# 로깅
npm install pino pino-pretty

# 데이터 검증
npm install joi

# 패스워드 해싱
npm install bcryptjs

# 타입스크립트 (권장)
npm install typescript --save-dev

# 코드 포매팅 및 린팅
npm install -D eslint prettier eslint-config-prettier eslint-plugin-prettier
```

### 2.2 개발 환경 패키지

```bash
npm install --save-dev \
  nodemon \
  ts-node \
  @types/node \
  @types/express \
  jest \
  supertest \
  @types/jest

# 패키지 설치 확인
npm list
```

---

## 3️⃣ 디렉토리 구조 설정

```
hello-world-backend/
├── src/
│   ├── config/
│   │   ├── database.ts
│   │   ├── env.ts
│   │   └── logger.ts
│   │
│   ├── domains/
│   │   ├── users/
│   │   │   ├── controllers/
│   │   │   │   └── user.controller.ts
│   │   │   ├── models/
│   │   │   │   └── user.model.ts
│   │   │   ├── services/
│   │   │   │   └── user.service.ts
│   │   │   ├── routes/
│   │   │   │   └── user.routes.ts
│   │   │   └── validators/
│   │   │       └── user.validator.ts
│   │   │
│   │   ├── tasks/
│   │   │   ├── controllers/
│   │   │   ├── models/
│   │   │   ├── services/
│   │   │   ├── routes/
│   │   │   └── validators/
│   │   │
│   │   └── code-execution/
│   │       ├── controllers/
│   │       ├── services/
│   │       ├── routes/
│   │       └── validators/
│   │
│   ├── middleware/
│   │   ├── auth.ts
│   │   ├── error-handler.ts
│   │   └── logger.ts
│   │
│   ├── utils/
│   │   ├── constants.ts
│   │   ├── helpers.ts
│   │   └── types.ts
│   │
│   └── app.ts
│
├── tests/
│   ├── unit/
│   ├── integration/
│   └── fixtures/
│
├── .env.example
├── .env.local (개발용)
├── .dockerignore
├── .gitignore
├── docker-compose.yml
├── Dockerfile
├── jest.config.js
├── tsconfig.json
├── .eslintrc.json
├── .prettierrc.json
├── package.json
├── package-lock.json
└── README.md
```

### 디렉토리 생성 명령어

```bash
mkdir -p src/{config,domains/{users,tasks,code-execution},middleware,utils}
mkdir -p src/domains/{users,tasks,code-execution}/{controllers,models,services,routes,validators}
mkdir -p tests/{unit,integration,fixtures}
```

---

## 4️⃣ TypeScript 설정

### 4.1 tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@config/*": ["src/config/*"],
      "@domains/*": ["src/domains/*"],
      "@middleware/*": ["src/middleware/*"],
      "@utils/*": ["src/utils/*"]
    }
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "tests"]
}
```

---

## 5️⃣ 환경변수 설정

### 5.1 .env.example

```bash
# 앱 설정
NODE_ENV=development
PORT=3000
APP_NAME=hello-world-api
APP_VERSION=1.0.0
LOG_LEVEL=debug

# 데이터베이스 (PostgreSQL)
DB_HOST=localhost
DB_PORT=5432
DB_NAME=hello_world_dev
DB_USER=postgres
DB_PASSWORD=your_secure_password
DB_POOL_MIN=2
DB_POOL_MAX=10

# JWT 설정
JWT_SECRET=your_jwt_secret_key_at_least_32_characters_long
JWT_EXPIRES_IN=7d
REFRESH_TOKEN_SECRET=your_refresh_token_secret_key
REFRESH_TOKEN_EXPIRES_IN=30d

# 코드 실행 환경
DOCKER_IMAGE=node:18-alpine
CODE_EXECUTION_TIMEOUT=5000
CODE_EXECUTION_MEMORY_LIMIT=128mb

# CORS 설정
CORS_ORIGIN=http://localhost:3001
CORS_CREDENTIALS=true

# 외부 서비스 (추후)
REDIS_URL=redis://localhost:6379
SENTRY_DSN=

# 보안
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
HELMET_ENABLED=true
```

### 5.2 .env.local (로컬 개발용)

```bash
cp .env.example .env.local
```

### 5.3 src/config/env.ts

```typescript
import dotenv from 'dotenv';

dotenv.config({
  path: process.env.NODE_ENV === 'production' 
    ? '.env' 
    : `.env.${process.env.NODE_ENV || 'local'}`,
});

interface EnvConfig {
  // App
  nodeEnv: string;
  port: number;
  appName: string;
  appVersion: string;
  logLevel: string;

  // Database
  db: {
    host: string;
    port: number;
    name: string;
    user: string;
    password: string;
    poolMin: number;
    poolMax: number;
  };

  // JWT
  jwt: {
    secret: string;
    expiresIn: string;
    refreshSecret: string;
    refreshExpiresIn: string;
  };

  // Code Execution
  codeExecution: {
    dockerImage: string;
    timeout: number;
    memoryLimit: string;
  };

  // CORS
  cors: {
    origin: string;
    credentials: boolean;
  };

  // Security
  security: {
    rateLimitWindow: number;
    rateLimitMax: number;
    helmetEnabled: boolean;
  };
}

const config: EnvConfig = {
  // App
  nodeEnv: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT || '3000', 10),
  appName: process.env.APP_NAME || 'hello-world-api',
  appVersion: process.env.APP_VERSION || '1.0.0',
  logLevel: process.env.LOG_LEVEL || 'info',

  // Database
  db: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    name: process.env.DB_NAME || 'hello_world_dev',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'password',
    poolMin: parseInt(process.env.DB_POOL_MIN || '2', 10),
    poolMax: parseInt(process.env.DB_POOL_MAX || '10', 10),
  },

  // JWT
  jwt: {
    secret: process.env.JWT_SECRET || 'your_jwt_secret_key_at_least_32_characters_long',
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
    refreshSecret: process.env.REFRESH_TOKEN_SECRET || 'your_refresh_token_secret_key',
    refreshExpiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN || '30d',
  },

  // Code Execution
  codeExecution: {
    dockerImage: process.env.DOCKER_IMAGE || 'node:18-alpine',
    timeout: parseInt(process.env.CODE_EXECUTION_TIMEOUT || '5000', 10),
    memoryLimit: process.env.CODE_EXECUTION_MEMORY_LIMIT || '128mb',
  },

  // CORS
  cors: {
    origin: process.env.CORS_ORIGIN || 'http://localhost:3001',
    credentials: process.env.CORS_CREDENTIALS === 'true',
  },

  // Security
  security: {
    rateLimitWindow: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000', 10),
    rateLimitMax: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100', 10),
    helmetEnabled: process.env.HELMET_ENABLED !== 'false',
  },
};

// 필수 환경변수 검증
const requiredEnvVars = ['JWT_SECRET'];
const missingEnvVars = requiredEnvVars.filter((envVar) => !process.env[envVar]);

if (missingEnvVars.length > 0) {
  throw new Error(`Missing required environment variables: ${missingEnvVars.join(', ')}`);
}

export default config;
```

---

## 6️⃣ 로거 설정

### 6.1 src/config/logger.ts

```typescript
import pino from 'pino';
import config from './env';

const isDevelopment = config.nodeEnv === 'development';

export const logger = pino(
  {
    level: config.logLevel,
    transport: isDevelopment
      ? {
          target: 'pino-pretty',
          options: {
            colorize: true,
            translateTime: 'SYS:standard',
            ignore: 'pid,hostname',
            singleLine: false,
          },
        }
      : undefined,
  },
  isDevelopment ? pino.transport({ target: 'pino/file' }) : undefined
);

export default logger;
```

---

## 7️⃣ Fastify 앱 초기화

### 7.1 src/app.ts

```typescript
import Fastify, { FastifyInstance } from 'fastify';
import fastifyJwt from '@fastify/jwt';
import fastifyCors from '@fastify/cors';
import fastifyHelmet from '@fastify/helmet';

import config from '@config/env';
import logger from '@config/logger';

export async function createApp(): Promise<FastifyInstance> {
  const app = Fastify({
    logger,
    trustProxy: true,
  });

  // 보안 헤더 설정
  if (config.security.helmetEnabled) {
    await app.register(fastifyHelmet, {
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: ["'self'", "'unsafe-inline'"],
          styleSrc: ["'self'", "'unsafe-inline'"],
        },
      },
    });
  }

  // CORS 설정
  await app.register(fastifyCors, {
    origin: config.cors.origin,
    credentials: config.cors.credentials,
  });

  // JWT 설정
  await app.register(fastifyJwt, {
    secret: config.jwt.secret,
  });

  // 헬스 체크 엔드포인트
  app.get('/health', async (request, reply) => {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      version: config.appVersion,
    };
  });

  // 라우트 등록 (추후 추가)
  // await app.register(userRoutes, { prefix: '/api/v1/users' });
  // await app.register(taskRoutes, { prefix: '/api/v1/tasks' });

  // 에러 핸들링
  app.setErrorHandler((error, request, reply) => {
    logger.error(error);
    reply.status(500).send({
      statusCode: 500,
      error: 'Internal Server Error',
      message: error.message,
    });
  });

  return app;
}

export default createApp;
```

### 7.2 src/index.ts (Entry Point)

```typescript
import config from '@config/env';
import logger from '@config/logger';
import { createApp } from './app';

async function start() {
  try {
    const app = await createApp();

    await app.listen({ port: config.port, host: '0.0.0.0' });

    logger.info(
      {
        port: config.port,
        env: config.nodeEnv,
        version: config.appVersion,
      },
      `${config.appName} server started successfully`
    );
  } catch (error) {
    logger.error(error, 'Failed to start server');
    process.exit(1);
  }
}

// Graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM received, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  logger.info('SIGINT received, shutting down gracefully');
  process.exit(0);
});

start();
```

---

## 8️⃣ Docker & Docker Compose 설정

### 8.1 Dockerfile

```dockerfile
# Build Stage
FROM node:18-alpine AS builder

WORKDIR /app

# 패키지 파일 복사
COPY package*.json ./

# 의존성 설치
R

### `backend_schema.md`

# Prisma Schema 완전 코드

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ============================================================================
// 1. 사용자 관련 모델
// ============================================================================

/// 사용자 기본 정보
model User {
  id                String            @id @default(cuid())
  email             String            @unique @db.VarChar(255)
  username          String            @unique @db.VarChar(100)
  passwordHash      String            @db.VarChar(255)
  role              UserRole          @default(USER)
  status            UserStatus        @default(ACTIVE)
  lastLoginAt       DateTime?
  createdAt         DateTime          @default(now())
  updatedAt         DateTime          @updatedAt

  // 관계
  profile           UserProfile?
  sessions          UserSession[]
  progress          UserProgress[]
  codeSubmissions   CodeSubmission[]
  achievements      UserAchievement[]
  streak            UserStreak?
  notifications     Notification[]

  @@index([email])
  @@index([username])
  @@index([status])
  @@index([createdAt])
}

enum UserRole {
  ADMIN
  INSTRUCTOR
  USER
}

enum UserStatus {
  ACTIVE
  INACTIVE
  SUSPENDED
  DELETED
}

/// 사용자 프로필 (1:1 확장)
model UserProfile {
  id                String            @id @default(cuid())
  userId            String            @unique
  fullName          String?           @db.VarChar(200)
  avatarUrl         String?           @db.VarChar(500)
  bio               String?           @db.Text
  timezone          String?           @default("UTC") @db.VarChar(50)
  preferredLanguage String            @default("ko") @db.VarChar(10)
  theme             Theme             @default(LIGHT)
  emailNotifications Boolean           @default(true)
  pushNotifications Boolean           @default(true)
  createdAt         DateTime          @default(now())
  updatedAt         DateTime          @updatedAt

  // 관계
  user              User              @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([userId])
}

enum Theme {
  LIGHT
  DARK
}

/// 사용자 세션 (1:N) - KPI 추적용
model UserSession {
  id                String            @id @default(cuid())
  userId            String
  ipAddress         String?           @db.VarChar(45)
  userAgent         String?           @db.Text
  deviceType        DeviceType        @default(UNKNOWN)
  sessionDuration   Int               @default(0) // 초 단위
  lastActivityAt    DateTime          @default(now())
  startedAt         DateTime          @default(now())
  endedAt           DateTime?
  createdAt         DateTime          @default(now())

  // 관계
  user              User              @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([userId])
  @@index([startedAt])
  @@index([endedAt])
}

enum DeviceType {
  DESKTOP
  MOBILE
  TABLET
  UNKNOWN
}

/// 사용자 연속 학습 일수 (1:1)
model UserStreak {
  id                String            @id @default(cuid())
  userId            String            @unique
  currentStreak     Int               @default(0)
  longestStreak     Int               @default(0)
  lastActivityDate  DateTime
  createdAt         DateTime          @default(now())
  updatedAt         DateTime          @updatedAt

  // 관계
  user              User              @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([currentStreak])
  @@index([lastActivityDate])
}

// ============================================================================
// 2. 학습 콘텐츠 관련 모델
// ============================================================================

/// 강좌 정보
model Course {
  id                String            @id @default(cuid())
  title             String            @db.VarChar(255)
  slug              String            @unique @db.VarChar(255)
  description       String?           @db.Text
  thumbnailUrl      String?           @db.VarChar(500)
  difficulty        Difficulty        @default(BEGINNER)
  status            ContentStatus     @default(DRAFT)
  estimatedHours    Float             @default(0)
  enrollmentCount   Int               @default(0)
  completionRate    Float             @default(0) // 0-100
  createdAt         DateTime          @default(now())
  updatedAt         DateTime          @updatedAt

  // 관계
  lessons           CourseLessons[]
  languageConfigs   LanguageConfig[]

  @@index([slug])
  @@index([difficulty])
  @@index([status])
  @@index([enrollmentCount])
}

enum Difficulty {
  BEGINNER
  INTERMEDIATE
  ADVANCED
  EXPERT
}

enum ContentStatus {
  DRAFT
  PUBLISHED
  ARCHIVED
}

/// 단원/강의
model Lesson {
  id                String            @id @default(cuid())
  title             String            @db.VarChar(255)
  slug              String            @unique @db.VarChar(255)
  description       String?           @db.Text
  content           String?           @db.Text
  order             Int
  difficulty        Difficulty        @default(BEGINNER)
  estimatedMinutes  Int               @default(30)
  status            ContentStatus     @default(DRAFT)
  videoUrl          String?           @db.VarChar(500)
  createdAt         DateTime          @default(now())
  updatedAt         DateTime          @updatedAt

  // 관계
  courses           CourseLessons[]
  hints             LessonHint[]
  userProgress      UserProgress[]
  codeSubmissions   CodeSubmission[]

  @@index([slug])
  @@index([difficulty])
  @@index([status])
}

/// 강좌-단원 중간 테이블 (N:M)
model CourseLessons {
  id                String            @id @default(cuid())
  courseId          String
  lessonId          String
  order             Int
  createdAt         DateTime          @default(now())

  // 관계
  course            Course            @relation(fields: [courseId], references: [id], onDelete: Cascade)
  lesson            Lesson            @relation(fields: [lessonId], references: [id], onDelete: Cascade)

  @@unique([courseId, lessonId])
  @@index([courseId])
  @@index([lessonId])
}

/// 단원 힌트/팁
model LessonHint {
  id                String            @id @default(cuid())
  lessonId          String
  title             String            @db.VarChar(255)
  content           String            @db.Text
  hintType          HintType          @default(TIP)
  order             Int               @default(0)
  createdAt         DateTime          @default(now())
  updatedAt         DateTime          @updatedAt

  // 관계
  lesson            Lesson            @relation(fields: [lessonId], references: [id], onDelete: Cascade)

  @@index([lessonId])
  @@index([hintType])
}

enum HintType {
  TIP
  WARNING
  INFO
  SOLUTION
}

/// 프로그래밍 언어별 강좌 설정
model LanguageConfig {
  id                String            @id @default(cuid())
  courseId          String
  language          String            @db.VarChar(50)
  template          String?           @db.Text
  testCode          String?           @db.Text
  createdAt         DateTime          @default(now())
  updatedAt         DateTime          @updatedAt

  // 관계
  course            Course            @relation(fields: [courseId], references: [id], onDelete: Cascade)

  @@unique([courseId, language])
  @@index([courseId])
  @@index([language])
}

// ============================================================================
// 3. 학습 진행도 관련 모델
// ============================================================================

/// 사용자 단원 진행도 (1:N)
model UserProgress {
  id                String            @id @default(cuid())
  userId            String
  lessonId          String
  status            ProgressStatus    @default(NOT_STARTED)
  completedAt       DateTime?
  attemptCount      Int               @default(0)
  bestScore         Float?            // 0-100
  timeSpentSeconds  Int               @default(0)
  lastAccessedAt    DateTime          @default(now())
  createdAt         DateTime          @default(now())
  updatedAt         DateTime          @updatedAt

  // 관계
  user              User              @relation(fields: [userId], references: [id], onDelete: Cascade)
  lesson            Lesson            @relation(fields: [lessonId], references: [id], onDelete: Cascade)

  @@unique([userId, lessonId])
  @@index([userId])
  @@index([lessonId])
  @@index([status])
  @@index([completedAt])
}

enum ProgressStatus {
  NOT_STARTED
  IN_PROGRESS
  COMPLETED
  ABANDONED
}

/// 코드 제출 (1:N)
model CodeSubmission {
  id                String            @id @default(cuid())
  userId            String
  lessonId          String
  code              String            @db.Text
  language          String            @db.VarChar(50)
  status            SubmissionStatus  @default(PENDING)
  output            String?           @db.Text
  errorMessage      String?           @db.Text
  score             Float?            // 0-100
  executionTime     Float?            // 밀리초
  memoryUsed        Float?            // MB
  testsPassed       Int               @default(0)
  totalTests        Int               @default(0)
  submittedAt       DateTime          @default(now())

  // 관계
  user              User              @relation(fields: [userId], references: [id], onDelete: Cascade)
  lesson            Lesson            @relation(fields: [lessonId], references: [id], onDelete: Cascade)

  @@index([userId])
  @@index([lessonId])
  @@index([status])
  @@index([submittedAt])
}

enum SubmissionStatus {
  PENDING
  COMPILING
  RUNNING
  ACCEPTED
  WRONG_ANSWER
  RUNTIME_ERROR
  TIME_LIMIT_EXCEEDED
  MEMORY_LIMIT_EXCEEDED
}

// ============================================================================
// 4. 성취/배지 관련 모델
// ============================================================================

/// 배지/성취 정의
model Achievement {
  id                String            @id @default(cuid())
  name              String            @unique @db.VarChar(100)
  description       String?           @db.Text
  iconUrl           String?           @db.VarChar(500)
  condition         String            @db.VarChar(255) // 예: "complete_5_lessons"
  points            Int               @default(0)
  rarity            AchievementRarity @default(COMMON)
  createdAt         DateTime          @default(now())
  updatedAt         DateTime          @updatedAt

  // 관계
  userAchievements  UserAchievement[]

  @@index([name])
  @@index([rarity])
}

enum AchievementRarity {
  COMMON
  UNCOMMON
  RARE
  EPIC
  LEGENDARY
}

/// 사용자별 획득 배지 (1:N)
model UserAchievement {
  id                String            @id @default(cuid())
  userId            String
  achievementId     String
  unlockedAt        DateTime          @default(now())
  createdAt         DateTime          @default(now())

  // 관계
  user              User              @relation(fields: [userId], references: [id], onDelete: Cascade)
  achievement       Achievement       @relation(fields: [achievementId], references: [id], onDelete: Cascade)

  @@unique([userId, achievementId])
  @@index([userId])
  @@index([achievementId])
  @@index([unlockedAt])
}

// ============================================================================
// 5. 알림 관련 모델
// ============================================================================

/// 사용자 알림
model Notification {
  id                String            @id @default(cuid())
  userId            String
  type              NotificationType  @default(INFO)
  title             String            @db.VarChar(255)
  message           String            @db.Text
  relatedId         String?           // 관련 리소스 ID
  relatedType       String?           @db.VarChar(50) // 관련 리소스 타입
  isRead            Boolean           @default(false)
  readAt            DateTime?
  createdAt         DateTime          @default(now())

  // 관계
  user              User              @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([userId])
  @@index([isRead])
  @@index([createdAt])
  @@index([type])
}

enum NotificationType {
  INFO
  SUCCESS
  WARNING
  ERROR
  ACHIEVEMENT
  REMINDER
}

// ============================================================================
// 6. 분석/로깅 관련 모델
// ============================================================================

/// 활동 로그 (분석용)
model ActivityLog {
  id                String            @id @default(cuid())
  userId            String?
  action            String            @db.VarChar(100)
  resourceType      String            @db.VarChar(50)
  resourceId        String?           @db.VarChar(255)
  metadata          String?           @db.Text // JSON 저장용
  ipAddress         String?           @db.VarChar(45)
  userAgent         String?           @db.Text
  createdAt         DateTime          @default(now())

  @@index([userId])
  @@index([action])
  @@index([resourceType])
  @@index([createdAt])
  @@index([resourceId])
}

// ============================================================================
// 인덱스 전략
// ============================================================================

// 주요 쿼리 인덱스:
// 1. User 조회: email, username, status, createdAt
// 2. UserSession: userId, startedAt, endedAt (세션 시간 분석)
// 3. UserProgress: userId + lessonId (UNIQUE), status, completedAt
// 4. CodeSubmission: userId + lessonId, status, submittedAt
// 5. UserAchievement: userId, unlockedAt
// 6. ActivityLog: userId, action, createdAt
// 7. Notification: userId, isRead, createdAt
```

## 주요 특징

### 1. **관계 설계**
- ✅ 1:1 관계: `UserProfile`, `UserStreak`
- ✅ 1:N 관계: `User` → `UserSession`, `UserProgress`, `CodeSubmission` 등
- ✅ N:M 관계: `CourseLessons` (중간 테이블)

### 2. **Enum 타입**
```prisma
- UserRole, UserStatus, Theme
- Difficulty, ContentStatus, ProgressStatus
- SubmissionStatus, HintType, AchievementRarity
- NotificationType, DeviceType
```

### 3. **인덱스 최적화**
- 빈번한 검색 필드: `email`, `username`, `userId`
- 범위 

### `backend_routes.md`

# Fastify API 라우트 구현 (Zod + 인증 + 에러 처리)

## 1. 프로젝트 구조

```
src/
├── server.ts                 # 메인 진입점
├── routes/
│   ├── auth.routes.ts       # 인증 라우트
│   ├── challenges.routes.ts # 과제 라우트
│   └── submissions.routes.ts # 제출 라우트
├── middleware/
│   ├── auth.middleware.ts   # 인증 미들웨어
│   ├── errorHandler.ts      # 에러 핸들러
│   └── validation.ts        # 검증 미들웨어
├── schemas/
│   ├── auth.schema.ts       # 인증 스키마
│   ├── challenges.schema.ts # 과제 스키마
│   └── submissions.schema.ts# 제출 스키마
├── controllers/
│   ├── auth.controller.ts
│   ├── challenges.controller.ts
│   └── submissions.controller.ts
├── services/
│   └── auth.service.ts
├── utils/
│   ├── jwt.ts
│   └── errors.ts
└── types/
    └── index.ts
```

---

## 2. 타입 정의

```typescript
// src/types/index.ts
export interface User {
  id: string;
  email: string;
  name: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface JwtPayload {
  userId: string;
  email: string;
  iat: number;
  exp: number;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  language: string;
  initialCode: string;
  testCases: TestCase[];
  createdAt: Date;
}

export interface TestCase {
  input: string;
  expectedOutput: string;
}

export interface Submission {
  id: string;
  userId: string;
  challengeId: string;
  code: string;
  status: 'pending' | 'success' | 'failed';
  testResults: TestResult[];
  createdAt: Date;
}

export interface TestResult {
  testCaseId: string;
  passed: boolean;
  actual: string;
  expected: string;
}

// FastifyRequest 확장
declare module 'fastify' {
  interface FastifyRequest {
    user?: JwtPayload;
  }
}
```

---

## 3. Zod 스키마

```typescript
// src/schemas/auth.schema.ts
import { z } from 'zod';

export const signUpSchema = z.object({
  body: z.object({
    email: z.string().email('유효한 이메일을 입력하세요'),
    password: z.string()
      .min(8, '비밀번호는 최소 8자 이상이어야 합니다')
      .regex(/[A-Z]/, '대문자를 포함해야 합니다')
      .regex(/[0-9]/, '숫자를 포함해야 합니다'),
    name: z.string()
      .min(2, '이름은 최소 2자 이상이어야 합니다')
      .max(50, '이름은 50자 이하여야 합니다'),
  }),
});

export const signInSchema = z.object({
  body: z.object({
    email: z.string().email('유효한 이메일을 입력하세요'),
    password: z.string().min(1, '비밀번호를 입력하세요'),
  }),
});

export const refreshTokenSchema = z.object({
  body: z.object({
    refreshToken: z.string().min(1, 'Refresh token이 필요합니다'),
  }),
});

export type SignUpRequest = z.infer<typeof signUpSchema>;
export type SignInRequest = z.infer<typeof signInSchema>;
export type RefreshTokenRequest = z.infer<typeof refreshTokenSchema>;
```

```typescript
// src/schemas/challenges.schema.ts
import { z } from 'zod';

export const createChallengeSchema = z.object({
  body: z.object({
    title: z.string()
      .min(5, '제목은 최소 5자 이상이어야 합니다')
      .max(100, '제목은 100자 이하여야 합니다'),
    description: z.string()
      .min(10, '설명은 최소 10자 이상이어야 합니다'),
    difficulty: z.enum(['beginner', 'intermediate', 'advanced']),
    language: z.enum(['javascript', 'python', 'java', 'cpp']),
    initialCode: z.string().min(1, '초기 코드는 필수입니다'),
    testCases: z.array(
      z.object({
        input: z.string(),
        expectedOutput: z.string(),
      })
    ).min(1, '최소 1개의 테스트 케이스가 필요합니다'),
  }),
});

export const getChallengeSchema = z.object({
  params: z.object({
    id: z.string().uuid('유효한 UUID를 입력하세요'),
  }),
});

export const listChallengesSchema = z.object({
  querystring: z.object({
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().min(1).max(100).default(10),
    difficulty: z.enum(['beginner', 'intermediate', 'advanced']).optional(),
    language: z.string().optional(),
  }),
});

export type CreateChallengeRequest = z.infer<typeof createChallengeSchema>;
export type GetChallengeRequest = z.infer<typeof getChallengeSchema>;
export type ListChallengesRequest = z.infer<typeof listChallengesSchema>;
```

```typescript
// src/schemas/submissions.schema.ts
import { z } from 'zod';

export const submitSolutionSchema = z.object({
  params: z.object({
    challengeId: z.string().uuid('유효한 UUID를 입력하세요'),
  }),
  body: z.object({
    code: z.string()
      .min(1, '코드는 필수입니다')
      .max(10000, '코드는 10000자 이하여야 합니다'),
  }),
});

export const getUserSubmissionsSchema = z.object({
  querystring: z.object({
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().min(1).max(50).default(20),
    status: z.enum(['pending', 'success', 'failed']).optional(),
  }),
});

export type SubmitSolutionRequest = z.infer<typeof submitSolutionSchema>;
export type GetUserSubmissionsRequest = z.infer<typeof getUserSubmissionsSchema>;
```

---

## 4. 유틸리티

```typescript
// src/utils/errors.ts
export class AppError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public code?: string
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export class ValidationError extends AppError {
  constructor(message: string, public details?: any) {
    super(400, message, 'VALIDATION_ERROR');
    this.name = 'ValidationError';
  }
}

export class AuthenticationError extends AppError {
  constructor(message: string = '인증이 필요합니다') {
    super(401, message, 'AUTHENTICATION_ERROR');
    this.name = 'AuthenticationError';
  }
}

export class AuthorizationError extends AppError {
  constructor(message: string = '접근 권한이 없습니다') {
    super(403, message, 'AUTHORIZATION_ERROR');
    this.name = 'AuthorizationError';
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string) {
    super(404, `${resource}를 찾을 수 없습니다`, 'NOT_FOUND');
    this.name = 'NotFoundError';
  }
}

export class ConflictError extends AppError {
  constructor(message: string) {
    super(409, message, 'CONFLICT');
    this.name = 'ConflictError';
  }
}
```

```typescript
// src/utils/jwt.ts
import jwt from '@fastify/jwt';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const JWT_EXPIRY = '1h';
const REFRESH_TOKEN_EXPIRY = '7d';

export const generateAccessToken = (userId: string, email: string): string => {
  return jwt.sign(
    { userId, email },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRY }
  );
};

export const generateRefreshToken = (userId: string): string => {
  return jwt.sign(
    { userId },
    JWT_SECRET,
    { expiresIn: REFRESH_TOKEN_EXPIRY }
  );
};

export const verifyToken = (token: string): any => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    throw new Error('Invalid token');
  }
};
```

---

## 5. 인증 미들웨어

```typescript
// src/middleware/auth.middleware.ts
import { FastifyRequest, FastifyReply } from 'fastify';
import { AuthenticationError } from '../utils/errors';

export const verifyAuth = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    await request.jwtVerify();
  } catch (error) {
    throw new AuthenticationError('유효하지 않은 토큰입니다');
  }
};

export const optionalAuth = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    await request.jwtVerify();
  } catch (error) {
    // 선택사항이므로 에러를 무시
  }
};

// 특정 역할 확인
export const requireRole = (roles: string[]) => {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    await verifyAuth(request, reply);
    // 나중에 role 필드 추가 시 검증
  };
};
```

---

## 6. 에러 핸들러

```typescript
// src/middleware/errorHandler.ts
import { FastifyInstance, FastifyError } from 'fastify';
import { ZodError } from 'zod';
import { AppError, ValidationError } from '../utils/errors';

export const setupErrorHandler = (fastify: FastifyInstance) => {
  fastify.setErrorHandler((error, request, reply) => {
    // Zod 검증 에러
    if (error instanceof ZodError) {
      return reply.status(400).send({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: '입력 값 검증 실패',
          details: error.errors.map((err) => ({
            path: err.path.join('.'),
            message: err.message,
            code: err.code,
          })),
        },
      });
    }

    // AppError 및 상속 클래스
    if (error instanceof AppError) {
      return reply.status(error.statusCode).send({
        success: false,
        error: {
          code: error.code,
          message: error.message,
        },
      });
    }

    // JWT 검증 에러
    if (error.name === 'UnauthorizedError') {
      return reply.status(401).send({
        success: false,
        error: {
          code: 'UNAUTHORIZED',
          message: '인증되지 않은 요청입니다',
        },
      });
    }

    // Fastify 기본 에러
    if ('statusCode' in error) {
      return reply.status(error.statusCode as number).send({
        success: false,
        error: {
          code: 'INTERNAL_SERVER_ERROR',
          message: error.message,
        },
      });
    }

    // 예상치 못한 에러
    console.error('Unexpected error:', error);
    return reply.status(500).send({
      success: false,
      error: {
        code: 'INTERNAL_SERVER_ERROR',
        message: '서버 오류가 발생했습니다',
      },
    });
  });
};
```

---

## 7. 검증 미들웨어

```typescript
// src/middleware/validation.ts
import { FastifyRequest, FastifyReply } from 'fastify';
import { ZodSchema } from 'zod';
import { ValidationError } from '../utils/errors';

export const validateRequest = (schema: ZodSchema) => {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const validated = schema.parse({
        body: request.body,
        params: request.params,
        querystring: request.query,
        headers: request.headers,
      });

      // 검증된 데이터를 request에 첨부
      request.body = validated.body;
      request.params = validated.params;
      request.query = validated.querystring;
    } catch (error) {
      if (error instanceof Error) {
        throw new ValidationError(error.message);
      }
      throw error;
    }
  };
};
```

---

## 8. 서비스

```typescript
// src/services/auth.service.ts
import { User, JwtPayload } from '../types';
import { ConflictError, NotFoundError, AuthenticationError } from '../utils/errors';
import bcrypt from 'bcrypt';

// 실제로는 DB 사용
const users: Map<string, User> = new Map();

export class AuthService {
  async signUp(
    email: string,
    password: string,
    name: string
  ): Promise<Omit<User, 'password'>> {
    // 이미 존재하는 이메일 확인
    const existing = Array.from(users.values()).find((u) => u.email === email);
    if (existing) {
      throw new ConflictError('이미 가입된 이메일입니다');
    }

    // 비밀번호 해싱
    const hashedPassword = await bcrypt.hash(password, 10);

    const user: User = {
      id: crypto.randomUUID(),
      email,
      password: hashedPassword,
      name,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    users.set(user.id, user);

    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async signIn(email: string, password: string): Promise<User> {
    const user = Array.from(users.values()).find((u) => u.email === email);

    if (!user) {
      throw new AuthenticationError('이메일 또는 비밀번호가 올바르지 않습니다');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new AuthenticationError('이메

### `backend_services.md`

# Service Layer & Repository Pattern with Transaction Management

## 1. 도메인 모델 정의

```csharp
// Domain/Models/User.cs
public class User
{
    public int Id { get; set; }
    public string Email { get; set; }
    public string PasswordHash { get; set; }
    public string Nickname { get; set; }
    public int TotalCompletions { get; set; }
    public int CurrentStreak { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime LastActivityAt { get; set; }
    
    public virtual ICollection<UserProgress> UserProgresses { get; set; }
    public virtual ICollection<Submission> Submissions { get; set; }
}

// Domain/Models/Challenge.cs
public class Challenge
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public string Difficulty { get; set; } // EASY, MEDIUM, HARD
    public int EstimatedMinutes { get; set; }
    public string Language { get; set; }
    public string BoilerplateCode { get; set; }
    public string SolutionCode { get; set; }
    public int Points { get; set; }
    public bool IsActive { get; set; }
    public DateTime CreatedAt { get; set; }
    
    public virtual ICollection<UserProgress> UserProgresses { get; set; }
    public virtual ICollection<Submission> Submissions { get; set; }
}

// Domain/Models/UserProgress.cs
public class UserProgress
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public int ChallengeId { get; set; }
    public ProgressStatus Status { get; set; } // NOT_STARTED, IN_PROGRESS, COMPLETED
    public int AttemptCount { get; set; }
    public DateTime? CompletedAt { get; set; }
    public DateTime StartedAt { get; set; }
    
    public virtual User User { get; set; }
    public virtual Challenge Challenge { get; set; }
}

// Domain/Models/Submission.cs
public class Submission
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public int ChallengeId { get; set; }
    public string SubmittedCode { get; set; }
    public ExecutionResult ExecutionResult { get; set; } // SUCCESS, COMPILATION_ERROR, RUNTIME_ERROR, WRONG_OUTPUT
    public string ErrorMessage { get; set; }
    public string ActualOutput { get; set; }
    public DateTime SubmittedAt { get; set; }
    public int ExecutionTimeMs { get; set; }
    
    public virtual User User { get; set; }
    public virtual Challenge Challenge { get; set; }
}

// Domain/Enums/ProgressStatus.cs
public enum ProgressStatus
{
    NOT_STARTED = 0,
    IN_PROGRESS = 1,
    COMPLETED = 2
}

// Domain/Enums/ExecutionResult.cs
public enum ExecutionResult
{
    SUCCESS = 0,
    COMPILATION_ERROR = 1,
    RUNTIME_ERROR = 2,
    WRONG_OUTPUT = 3,
    TIMEOUT = 4
}
```

## 2. Repository Pattern 구현

```csharp
// Infrastructure/Data/DbContext/HelloWorldDbContext.cs
public class HelloWorldDbContext : DbContext
{
    public HelloWorldDbContext(DbContextOptions<HelloWorldDbContext> options) 
        : base(options)
    {
    }

    public DbSet<User> Users { get; set; }
    public DbSet<Challenge> Challenges { get; set; }
    public DbSet<UserProgress> UserProgresses { get; set; }
    public DbSet<Submission> Submissions { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // User Configuration
        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Email).IsRequired().HasMaxLength(255);
            entity.Property(e => e.PasswordHash).IsRequired();
            entity.Property(e => e.Nickname).IsRequired().HasMaxLength(50);
            entity.HasIndex(e => e.Email).IsUnique();
            entity.HasMany(e => e.UserProgresses)
                .WithOne(p => p.User)
                .HasForeignKey(p => p.UserId)
                .OnDelete(DeleteBehavior.Cascade);
        });

        // Challenge Configuration
        modelBuilder.Entity<Challenge>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Title).IsRequired().HasMaxLength(200);
            entity.Property(e => e.Description).IsRequired();
            entity.Property(e => e.Difficulty).IsRequired().HasMaxLength(20);
            entity.Property(e => e.Language).IsRequired().HasMaxLength(50);
            entity.Property(e => e.BoilerplateCode).IsRequired();
            entity.Property(e => e.SolutionCode).IsRequired();
            entity.HasIndex(e => e.IsActive);
        });

        // UserProgress Configuration
        modelBuilder.Entity<UserProgress>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.HasOne(e => e.User).WithMany(u => u.UserProgresses);
            entity.HasOne(e => e.Challenge).WithMany(c => c.UserProgresses);
            entity.HasIndex(e => new { e.UserId, e.ChallengeId }).IsUnique();
            entity.Property(e => e.Status).HasConversion<string>();
        });

        // Submission Configuration
        modelBuilder.Entity<Submission>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.HasOne(e => e.User).WithMany(u => u.Submissions);
            entity.HasOne(e => e.Challenge).WithMany(c => c.Submissions);
            entity.Property(e => e.ExecutionResult).HasConversion<string>();
            entity.HasIndex(e => new { e.UserId, e.ChallengeId, e.SubmittedAt });
        });
    }
}

// Infrastructure/Repositories/IRepository.cs
public interface IRepository<T> where T : class
{
    Task<T> GetByIdAsync(int id);
    Task<IEnumerable<T>> GetAllAsync();
    Task<IEnumerable<T>> FindAsync(Expression<Func<T, bool>> predicate);
    Task<T> FirstOrDefaultAsync(Expression<Func<T, bool>> predicate);
    Task<bool> AnyAsync(Expression<Func<T, bool>> predicate);
    Task<int> CountAsync(Expression<Func<T, bool>> predicate);
    Task AddAsync(T entity);
    Task AddRangeAsync(IEnumerable<T> entities);
    void Update(T entity);
    void UpdateRange(IEnumerable<T> entities);
    void Remove(T entity);
    void RemoveRange(IEnumerable<T> entities);
}

// Infrastructure/Repositories/Repository.cs
public class Repository<T> : IRepository<T> where T : class
{
    protected readonly HelloWorldDbContext _context;
    protected readonly DbSet<T> _dbSet;

    public Repository(HelloWorldDbContext context)
    {
        _context = context ?? throw new ArgumentNullException(nameof(context));
        _dbSet = context.Set<T>();
    }

    public async Task<T> GetByIdAsync(int id)
    {
        return await _dbSet.FindAsync(id);
    }

    public async Task<IEnumerable<T>> GetAllAsync()
    {
        return await _dbSet.ToListAsync();
    }

    public async Task<IEnumerable<T>> FindAsync(Expression<Func<T, bool>> predicate)
    {
        return await _dbSet.Where(predicate).ToListAsync();
    }

    public async Task<T> FirstOrDefaultAsync(Expression<Func<T, bool>> predicate)
    {
        return await _dbSet.FirstOrDefaultAsync(predicate);
    }

    public async Task<bool> AnyAsync(Expression<Func<T, bool>> predicate)
    {
        return await _dbSet.AnyAsync(predicate);
    }

    public async Task<int> CountAsync(Expression<Func<T, bool>> predicate)
    {
        return await _dbSet.CountAsync(predicate);
    }

    public async Task AddAsync(T entity)
    {
        await _dbSet.AddAsync(entity);
    }

    public async Task AddRangeAsync(IEnumerable<T> entities)
    {
        await _dbSet.AddRangeAsync(entities);
    }

    public void Update(T entity)
    {
        _dbSet.Update(entity);
    }

    public void UpdateRange(IEnumerable<T> entities)
    {
        _dbSet.UpdateRange(entities);
    }

    public void Remove(T entity)
    {
        _dbSet.Remove(entity);
    }

    public void RemoveRange(IEnumerable<T> entities)
    {
        _dbSet.RemoveRange(entities);
    }
}

// Infrastructure/Repositories/IUserRepository.cs
public interface IUserRepository : IRepository<User>
{
    Task<User> GetByEmailAsync(string email);
    Task<bool> IsEmailExistsAsync(string email);
    Task<IEnumerable<User>> GetTopUsersByCompletionsAsync(int limit);
    Task<User> GetWithProgressAndSubmissionsAsync(int userId);
}

// Infrastructure/Repositories/UserRepository.cs
public class UserRepository : Repository<User>, IUserRepository
{
    public UserRepository(HelloWorldDbContext context) : base(context)
    {
    }

    public async Task<User> GetByEmailAsync(string email)
    {
        return await _dbSet
            .AsNoTracking()
            .FirstOrDefaultAsync(u => u.Email == email);
    }

    public async Task<bool> IsEmailExistsAsync(string email)
    {
        return await _dbSet.AnyAsync(u => u.Email == email);
    }

    public async Task<IEnumerable<User>> GetTopUsersByCompletionsAsync(int limit)
    {
        return await _dbSet
            .AsNoTracking()
            .OrderByDescending(u => u.TotalCompletions)
            .Take(limit)
            .ToListAsync();
    }

    public async Task<User> GetWithProgressAndSubmissionsAsync(int userId)
    {
        return await _dbSet
            .Include(u => u.UserProgresses)
            .ThenInclude(up => up.Challenge)
            .Include(u => u.Submissions)
            .FirstOrDefaultAsync(u => u.Id == userId);
    }
}

// Infrastructure/Repositories/IChallengeRepository.cs
public interface IChallengeRepository : IRepository<Challenge>
{
    Task<IEnumerable<Challenge>> GetActiveChallengesAsync();
    Task<IEnumerable<Challenge>> GetChallengesByDifficultyAsync(string difficulty);
    Task<IEnumerable<Challenge>> GetChallengesByLanguageAsync(string language);
    Task<Challenge> GetWithProgressAndSubmissionsAsync(int challengeId);
}

// Infrastructure/Repositories/ChallengeRepository.cs
public class ChallengeRepository : Repository<Challenge>, IChallengeRepository
{
    public ChallengeRepository(HelloWorldDbContext context) : base(context)
    {
    }

    public async Task<IEnumerable<Challenge>> GetActiveChallengesAsync()
    {
        return await _dbSet
            .AsNoTracking()
            .Where(c => c.IsActive)
            .OrderBy(c => c.Difficulty)
            .ToListAsync();
    }

    public async Task<IEnumerable<Challenge>> GetChallengesByDifficultyAsync(string difficulty)
    {
        return await _dbSet
            .AsNoTracking()
            .Where(c => c.IsActive && c.Difficulty == difficulty)
            .ToListAsync();
    }

    public async Task<IEnumerable<Challenge>> GetChallengesByLanguageAsync(string language)
    {
        return await _dbSet
            .AsNoTracking()
            .Where(c => c.IsActive && c.Language == language)
            .ToListAsync();
    }

    public async Task<Challenge> GetWithProgressAndSubmissionsAsync(int challengeId)
    {
        return await _dbSet
            .Include(c => c.UserProgresses)
            .Include(c => c.Submissions)
            .FirstOrDefaultAsync(c => c.Id == challengeId);
    }
}

// Infrastructure/Repositories/IUserProgressRepository.cs
public interface IUserProgressRepository : IRepository<UserProgress>
{
    Task<UserProgress> GetByUserAndChallengeAsync(int userId, int challengeId);
    Task<IEnumerable<UserProgress>> GetUserProgressAsync(int userId);
    Task<IEnumerable<UserProgress>> GetChallengeProgressAsync(int challengeId);
    Task<int> GetCompletedCountByUserAsync(int userId);
}

// Infrastructure/Repositories/UserProgressRepository.cs
public class UserProgressRepository : Repository<UserProgress>, IUserProgressRepository
{
    public UserProgressRepository(HelloWorldDbContext context) : base(context)
    {
    }

    public async Task<UserProgress> GetByUserAndChallengeAsync(int userId, int challengeId)
    {
        return await _dbSet
            .Include(up => up.Challenge)
            .FirstOrDefaultAsync(up => up.UserId == userId && up.ChallengeId == challengeId);
    }

    public async Task<IEnumerable<UserProgress>> GetUserProgressAsync(int userId)
    {
        return await _dbSet
            .Where(up => up.UserId == userId)
            .Include(up => up.Challenge)
            .OrderByDescending(up => up.StartedAt)
            .ToListAsync();
    }

    public async Task<IEnumerable<UserProgress>> GetChallengeProgressAsync(int challengeId)
    {
        return await _dbSet
            .Where(up => up.ChallengeId == challengeId)
            .Include(up => up.User)
            .ToListAsync();
    }

    public async Task<int> GetCompletedCountByUserAsync(int userId)
    {
        return await _dbSet
            .CountAsync(up => up.UserId == userId && up.Status == ProgressStatus.COMPLETED);
    }
}

// Infrastructure/Repositories/ISubmissionRepository.cs
public interface ISubmissionRepository : IRepository<Submission>
{
    Task<IEnumerable<Submission>> GetUserSubmissionsAsync(int userId);
    Task<IEnumerable<Submission>> GetChallengeSubmissionsAsync(int challengeId);
    Task<Submission> GetLatestSubmissionAsync(int userId, int challengeId);
    Task<int> GetAttemptCountAsync(int userId, int challengeId);
}

// Infrastructure/Repositories/SubmissionRepository.cs
public class SubmissionRepository : Repository<Submission>, ISubmissionRepository
{
    public SubmissionRepository(HelloWorldDbContext context) : base(context)
    {
    }

    public async Task<IEnumerable<Submission>> GetUserSubmissionsAsync(int userId)
    {
        return await _dbSet
            .Where(s => s.UserId == userId)
            .Include(s => s.Challenge)
            .OrderByDescending(s => s.SubmittedAt)
            .ToListAsync();
    }

    public async Task<IEnumerable<Submission>> GetChallengeSubmissionsAsync(int challengeId)
    {
        return await _dbSet
            .Where(s => s.ChallengeId == challengeId)
            .Include(s => s.User)
            .Order

---

## 7. 테스트

### `test_strategy.md`

# Hello World 앱 - 테스트 전략 문서

**문서 버전**: v1.0  
**작성일**: 2025년 1월  
**작성자**: QA/개발팀  
**참조 문서**: Hello World 앱 PRD v1.0

---

## 목차

1. [테스트 전략 개요](#1-테스트-전략-개요)
2. [테스트 피라미드](#2-테스트-피라미드)
3. [커버리지 목표](#3-커버리지-목표)
4. [도구 선택 근거](#4-도구-선택-근거)
5. [Acceptance Criteria 테스트 매핑](#5-acceptance-criteria-테스트-매핑)
6. [테스트 실행 전략](#6-테스트-실행-전략)
7. [품질 게이트 & CI/CD 통합](#7-품질-게이트--cicd-통합)

---

## 1. 테스트 전략 개요

### 1.1 테스트 철학

```
"빠른 피드백, 높은 신뢰, 지속 가능한 유지보수"

- 버그는 발견될수록 좋고, 일찍 발견될수록 저렴하다
- 테스트는 코드 작성과 동시에 이루어진다 (TDD/BDD 지향)
- 자동화 불가능한 영역만 수동 테스트로 보완한다
```

### 1.2 핵심 리스크 기반 우선순위

PRD의 핵심 사용자 경험을 기준으로 테스트 우선순위를 결정합니다.

```
리스크 매트릭스

높음 │ 코드 실행 엔진    │ 사용자 인증/가입
     │ (샌드박스 안전성) │ (데이터 손실)
     │                  │
영향 │──────────────────┼──────────────────
     │ 힌트 시스템       │ 랭킹/배지
낮음 │ 과제 목록 렌더링  │ 다크모드
     └──────────────────┴──────────────────
           높음               낮음
                    빈도
```

| 우선순위 | 기능 영역 | 이유 |
|---------|---------|------|
| **P0 Critical** | 코드 실행 엔진, 사용자 인증 | North Star Metric 직결 |
| **P1 High** | 과제 진행/완료, 힌트 시스템 | 첫 과제 완료율 60% 목표 직결 |
| **P2 Medium** | 진척도 추적, 배지 시스템 | 7일 재방문율 20% 목표 직결 |
| **P3 Low** | UI 테마, 부가 기능 | 비즈니스 임팩트 낮음 |

---

## 2. 테스트 피라미드

### 2.1 피라미드 구조

```
                    ╱‾‾‾‾‾‾‾‾‾‾‾‾‾‾╲
                   ╱   E2E Tests    ╲
                  ╱  (Playwright)    ╲
                 ╱  10% │ ~20개 시나리오 ╲
                ╱────────────────────────╲
               ╱    Integration Tests     ╲
              ╱       (Vitest)             ╲
             ╱   20% │ ~80개 테스트         ╲
            ╱──────────────────────────────╲
           ╱         Unit Tests             ╲
          ╱           (Vitest)               ╲
         ╱    70% │ ~300개 테스트             ╲
        ╱──────────────────────────────────────╲

        비용: 낮음 ────────────────────── 높음
        속도: 빠름 ────────────────────── 느림
        신뢰: 격리 ────────────────────── 실제 환경
```

### 2.2 Unit Tests (70%) - 단위 테스트

#### 목적
- 개별 함수/컴포넌트의 독립적인 동작 검증
- 빠른 피드백 루프 (전체 실행 < 30초)
- 비즈니스 로직의 엣지 케이스 커버

#### 적용 대상 & 예시

**[비즈니스 로직]**
```typescript
// src/domain/challenge/scoring.test.ts
describe('채점 엔진 - 핵심 비즈니스 로직', () => {
  
  describe('점수 계산', () => {
    it('정답 제출 시 기본 점수 100점을 반환한다', () => {
      const result = calculateScore({ 
        isCorrect: true, 
        hintsUsed: 0, 
        timeSpent: 120 
      });
      expect(result.baseScore).toBe(100);
    });

    it('힌트 1개 사용 시 점수가 20% 감점된다', () => {
      const result = calculateScore({ 
        isCorrect: true, 
        hintsUsed: 1, 
        timeSpent: 120 
      });
      expect(result.finalScore).toBe(80);
    });

    it('힌트를 3개 이상 사용해도 최소 40점은 보장된다', () => {
      // PRD: "초보자 좌절 방지" 정책 반영
      const result = calculateScore({ 
        isCorrect: true, 
        hintsUsed: 5, 
        timeSpent: 300 
      });
      expect(result.finalScore).toBeGreaterThanOrEqual(40);
    });
  });

  describe('배지 판정', () => {
    it('첫 번째 과제 완료 시 "First Step" 배지가 발급된다', () => {
      const badges = evaluateBadges({ 
        completedChallenges: 1, 
        previousBadges: [] 
      });
      expect(badges).toContain('FIRST_STEP');
    });

    it('이미 보유한 배지는 중복 발급되지 않는다', () => {
      const badges = evaluateBadges({ 
        completedChallenges: 1, 
        previousBadges: ['FIRST_STEP'] 
      });
      expect(badges.filter(b => b === 'FIRST_STEP')).toHaveLength(1);
    });
  });
});
```

**[React 컴포넌트]**
```typescript
// src/components/CodeEditor/CodeEditor.test.tsx
describe('CodeEditor 컴포넌트', () => {
  
  it('초기 렌더링 시 placeholder 코드가 표시된다', () => {
    render(<CodeEditor language="javascript" initialCode="// 코드를 입력하세요" />);
    expect(screen.getByText('// 코드를 입력하세요')).toBeInTheDocument();
  });

  it('실행 버튼 클릭 시 onRun 콜백이 현재 코드와 함께 호출된다', async () => {
    const mockOnRun = vi.fn();
    render(<CodeEditor onRun={mockOnRun} initialCode="console.log('hello')" />);
    
    await userEvent.click(screen.getByRole('button', { name: /실행/ }));
    
    expect(mockOnRun).toHaveBeenCalledWith("console.log('hello')");
  });

  it('로딩 상태에서 실행 버튼이 비활성화된다', () => {
    render(<CodeEditor isExecuting={true} />);
    expect(screen.getByRole('button', { name: /실행/ })).toBeDisabled();
  });
});
```

**[유틸리티 함수]**
```typescript
// src/utils/codeValidator.test.ts
describe('코드 보안 검증기', () => {
  
  it.each([
    ['process.exit(0)', 'DANGEROUS_SYSTEM_CALL'],
    ['require("fs").unlinkSync("/")', 'DANGEROUS_FILE_OPERATION'],
    ['while(true){}', 'INFINITE_LOOP_RISK'],
  ])('위험 코드 "%s"를 감지하고 %s 에러를 반환한다', (code, errorType) => {
    const result = validateCode(code);
    expect(result.isValid).toBe(false);
    expect(result.errorType).toBe(errorType);
  });

  it('정상적인 Hello World 코드는 통과한다', () => {
    const result = validateCode('console.log("Hello, World!")');
    expect(result.isValid).toBe(true);
  });
});
```

#### 단위 테스트 규칙
```
✅ DO
- 단일 책임 검증: 테스트 1개 = 동작 1개
- AAA 패턴: Arrange → Act → Assert
- 외부 의존성 Mock 처리 (API, DB, 시간)
- 엣지 케이스 명시적 작성

❌ DON'T  
- 테스트 간 상태 공유
- 외부 네트워크 호출
- 구현 상세(내부 변수명) 테스트
```

---

### 2.3 Integration Tests (20%) - 통합 테스트

#### 목적
- 컴포넌트 간, 레이어 간 연동 검증
- API ↔ DB, Service ↔ Repository 계층 연동
- Mock을 최소화하고 실제 의존성 연동 확인

#### 적용 대상 & 예시

**[API 라우트 통합]**
```typescript
// src/api/challenges/route.test.ts
describe('GET /api/challenges/:id - 과제 조회 API', () => {
  
  beforeEach(async () => {
    await db.seed(testChallengeFixtures);
  });

  afterEach(async () => {
    await db.cleanup();
  });

  it('유효한 과제 ID로 조회 시 과제 데이터와 200을 반환한다', async () => {
    const response = await request(app)
      .get('/api/challenges/challenge-001')
      .set('Authorization', `Bearer ${testUserToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      id: 'challenge-001',
      title: expect.any(String),
      description: expect.any(String),
      language: 'javascript',
      hints: expect.arrayContaining([
        expect.objectContaining({ order: 1 })
      ])
    });
  });

  it('존재하지 않는 과제 ID 조회 시 404를 반환한다', async () => {
    const response = await request(app)
      .get('/api/challenges/non-existent-id')
      .set('Authorization', `Bearer ${testUserToken}`);

    expect(response.status).toBe(404);
    expect(response.body.error).toBe('CHALLENGE_NOT_FOUND');
  });

  it('인증 없이 접근 시 401을 반환한다', async () => {
    const response = await request(app)
      .get('/api/challenges/challenge-001');

    expect(response.status).toBe(401);
  });
});
```

**[서비스-레포지토리 통합]**
```typescript
// src/services/progress.service.test.ts
describe('ProgressService 통합 테스트', () => {
  
  it('과제 완료 처리 시 진척도 업데이트와 배지 발급이 원자적으로 처리된다', async () => {
    const userId = 'test-user-001';
    
    // Act
    const result = await progressService.completeChallenge({
      userId,
      challengeId: 'js-hello-world',
      submittedCode: 'console.log("Hello, World!")',
      executionResult: { passed: true, output: 'Hello, World!\n' }
    });

    // Assert - DB 실제 반영 확인
    const [progress, badges, userStats] = await Promise.all([
      progressRepo.findByUserId(userId),
      badgeRepo.findByUserId(userId),
      userRepo.findById(userId)
    ]);

    expect(result.success).toBe(true);
    expect(progress.completedChallengeIds).toContain('js-hello-world');
    expect(badges.map(b => b.type)).toContain('FIRST_STEP');
    expect(userStats.totalCompletions).toBe(1);
  });
});
```

**[컴포넌트 통합 - Provider 포함]**
```typescript
// src/features/challenge/ChallengeWorkspace.test.tsx
describe('ChallengeWorkspace 통합 테스트', () => {

  it('코드 실행 → 결과 표시 → 성공 모달 전체 플로우가 동작한다', async () => {
    // API Mock (네트워크는 Mock, UI 통합은 실제)
    server.use(
      rest.post('/api/execute', (req, res, ctx) => 
        res(ctx.json({ output: 'Hello, World!\n', passed: true }))
      )
    );

    render(
      <AuthProvider user={mockUser}>
        <ChallengeWorkspace challengeId="js-hello-world" />
      </AuthProvider>
    );

    // 코드 입력
    const editor = await screen.findByRole('textbox', { name: /코드 편집기/ });
    await userEvent.type(editor, 'console.log("Hello, World!")');

    // 실행
    await userEvent.click(screen.getByRole('button', { name: /실행/ }));

    // 결과 확인
    await waitFor(() => {
      expect(screen.getByText('Hello, World!')).toBeInTheDocument();
      expect(screen.getByText('🎉 성공!')).toBeInTheDocument();
    });
  });
});
```

---

### 2.4 E2E Tests (10%) - 종단간 테스트

#### 목적
- 실제 사용자 여정(User Journey) 전체 검증
- 실 브라우저 환경에서 Critical Path 보장
- 배포 전 최종 품질 게이트

#### Critical User Journey 시나리오 목록

```typescript
// tests/e2e/critical-journeys/

📁 01

### `backend_tests.md`

# Hello World 앱 - 백엔드 Vitest 단위/통합 테스트 코드

## 프로젝트 구조 및 설정

```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    setupFiles: ['./src/tests/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: ['node_modules/', 'dist/', '**/*.d.ts'],
      thresholds: {
        branches: 80,
        functions: 80,
        lines: 80,
        statements: 80,
      },
    },
    testTimeout: 10000,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
```

```typescript
// src/tests/setup.ts
import { beforeAll, afterAll, beforeEach, afterEach } from 'vitest';
import { db } from '@/database/connection';
import { redis } from '@/cache/redis';

beforeAll(async () => {
  await db.migrate.latest();
});

afterAll(async () => {
  await db.destroy();
  await redis.quit();
});

beforeEach(async () => {
  await db.seed.run();
});

afterEach(async () => {
  await db('users').truncate();
  await db('challenges').truncate();
  await db('submissions').truncate();
  await db('user_progress').truncate();
  await redis.flushDb();
});
```

---

## 1. 사용자 도메인 테스트

### 1.1 User Service 단위 테스트

```typescript
// src/tests/unit/user/user.service.spec.ts
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { UserService } from '@/modules/user/user.service';
import { UserRepository } from '@/modules/user/user.repository';
import { EmailService } from '@/modules/email/email.service';
import { PasswordHasher } from '@/utils/password.hasher';
import { createMockUser, createMockUserDto } from '@/tests/factories/user.factory';
import {
  UserAlreadyExistsError,
  UserNotFoundError,
  InvalidCredentialsError,
} from '@/modules/user/user.errors';

/**
 * UserService 단위 테스트
 * - 외부 의존성은 모두 Mock 처리
 * - 비즈니스 로직에 집중
 */
describe('UserService', () => {
  let userService: UserService;
  let mockUserRepository: ReturnType<typeof createMockUserRepository>;
  let mockEmailService: ReturnType<typeof createMockEmailService>;
  let mockPasswordHasher: ReturnType<typeof createMockPasswordHasher>;

  // ──────────────────────────────────────────
  // Mock Factory 함수
  // ──────────────────────────────────────────
  const createMockUserRepository = () => ({
    findById: vi.fn(),
    findByEmail: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
    findAll: vi.fn(),
  });

  const createMockEmailService = () => ({
    sendWelcomeEmail: vi.fn(),
    sendPasswordResetEmail: vi.fn(),
  });

  const createMockPasswordHasher = () => ({
    hash: vi.fn(),
    compare: vi.fn(),
  });

  beforeEach(() => {
    mockUserRepository = createMockUserRepository();
    mockEmailService = createMockEmailService();
    mockPasswordHasher = createMockPasswordHasher();

    userService = new UserService(
      mockUserRepository as unknown as UserRepository,
      mockEmailService as unknown as EmailService,
      mockPasswordHasher as unknown as PasswordHasher,
    );
  });

  // ──────────────────────────────────────────
  // 회원가입
  // ──────────────────────────────────────────
  describe('register()', () => {
    describe('정상 케이스', () => {
      it('신규 사용자를 정상적으로 등록한다', async () => {
        // Arrange
        const registerDto = createMockUserDto.register({
          email: 'test@example.com',
          password: 'SecurePass123!',
          nickname: '김준호',
        });
        const hashedPassword = 'hashed_password_xyz';
        const createdUser = createMockUser({
          email: registerDto.email,
          nickname: registerDto.nickname,
          passwordHash: hashedPassword,
        });

        mockUserRepository.findByEmail.mockResolvedValue(null);
        mockPasswordHasher.hash.mockResolvedValue(hashedPassword);
        mockUserRepository.create.mockResolvedValue(createdUser);
        mockEmailService.sendWelcomeEmail.mockResolvedValue(undefined);

        // Act
        const result = await userService.register(registerDto);

        // Assert
        expect(result).toMatchObject({
          id: expect.any(String),
          email: 'test@example.com',
          nickname: '김준호',
        });
        expect(result).not.toHaveProperty('passwordHash'); // 비밀번호 해시 미노출
        expect(mockPasswordHasher.hash).toHaveBeenCalledWith('SecurePass123!');
        expect(mockEmailService.sendWelcomeEmail).toHaveBeenCalledWith(
          'test@example.com',
          '김준호',
        );
      });

      it('회원가입 완료 후 환영 이메일을 발송한다', async () => {
        // Arrange
        const registerDto = createMockUserDto.register();
        const createdUser = createMockUser();

        mockUserRepository.findByEmail.mockResolvedValue(null);
        mockPasswordHasher.hash.mockResolvedValue('hashed');
        mockUserRepository.create.mockResolvedValue(createdUser);
        mockEmailService.sendWelcomeEmail.mockResolvedValue(undefined);

        // Act
        await userService.register(registerDto);

        // Assert
        expect(mockEmailService.sendWelcomeEmail).toHaveBeenCalledTimes(1);
        expect(mockEmailService.sendWelcomeEmail).toHaveBeenCalledWith(
          createdUser.email,
          createdUser.nickname,
        );
      });
    });

    describe('엣지 케이스', () => {
      it('이미 존재하는 이메일로 가입 시 UserAlreadyExistsError를 던진다', async () => {
        // Arrange
        const registerDto = createMockUserDto.register({
          email: 'existing@example.com',
        });
        const existingUser = createMockUser({ email: 'existing@example.com' });

        mockUserRepository.findByEmail.mockResolvedValue(existingUser);

        // Act & Assert
        await expect(userService.register(registerDto)).rejects.toThrow(
          UserAlreadyExistsError,
        );
        expect(mockUserRepository.create).not.toHaveBeenCalled();
        expect(mockEmailService.sendWelcomeEmail).not.toHaveBeenCalled();
      });

      it('이메일 발송 실패 시에도 사용자 등록은 완료된다', async () => {
        // Arrange - 이메일 발송이 실패해도 회원가입 자체는 성공해야 함
        const registerDto = createMockUserDto.register();
        const createdUser = createMockUser();

        mockUserRepository.findByEmail.mockResolvedValue(null);
        mockPasswordHasher.hash.mockResolvedValue('hashed');
        mockUserRepository.create.mockResolvedValue(createdUser);
        mockEmailService.sendWelcomeEmail.mockRejectedValue(
          new Error('SMTP 서버 오류'),
        );

        // Act
        const result = await userService.register(registerDto);

        // Assert - 회원가입은 성공, 이메일 에러는 로깅만
        expect(result.id).toBeDefined();
        expect(mockUserRepository.create).toHaveBeenCalledTimes(1);
      });

      it('비밀번호 해싱 실패 시 사용자가 생성되지 않는다', async () => {
        // Arrange
        const registerDto = createMockUserDto.register();

        mockUserRepository.findByEmail.mockResolvedValue(null);
        mockPasswordHasher.hash.mockRejectedValue(new Error('해싱 실패'));

        // Act & Assert
        await expect(userService.register(registerDto)).rejects.toThrow(
          '해싱 실패',
        );
        expect(mockUserRepository.create).not.toHaveBeenCalled();
      });

      it('닉네임이 없으면 이메일 앞부분을 기본 닉네임으로 사용한다', async () => {
        // Arrange
        const registerDto = createMockUserDto.register({
          email: 'junho@example.com',
          nickname: undefined,
        });

        mockUserRepository.findByEmail.mockResolvedValue(null);
        mockPasswordHasher.hash.mockResolvedValue('hashed');
        mockUserRepository.create.mockImplementation(async (data) =>
          createMockUser({ ...data, id: 'new-id' }),
        );
        mockEmailService.sendWelcomeEmail.mockResolvedValue(undefined);

        // Act
        const result = await userService.register(registerDto);

        // Assert
        expect(result.nickname).toBe('junho');
      });
    });
  });

  // ──────────────────────────────────────────
  // 로그인 검증
  // ──────────────────────────────────────────
  describe('validateCredentials()', () => {
    describe('정상 케이스', () => {
      it('올바른 이메일과 비밀번호로 사용자를 반환한다', async () => {
        // Arrange
        const email = 'test@example.com';
        const password = 'ValidPass123!';
        const user = createMockUser({ email, passwordHash: 'hashed_pass' });

        mockUserRepository.findByEmail.mockResolvedValue(user);
        mockPasswordHasher.compare.mockResolvedValue(true);

        // Act
        const result = await userService.validateCredentials(email, password);

        // Assert
        expect(result.email).toBe(email);
        expect(mockPasswordHasher.compare).toHaveBeenCalledWith(
          password,
          'hashed_pass',
        );
      });
    });

    describe('엣지 케이스', () => {
      it('존재하지 않는 이메일이면 InvalidCredentialsError를 던진다', async () => {
        // Arrange - 사용자 없음
        mockUserRepository.findByEmail.mockResolvedValue(null);

        // Act & Assert
        await expect(
          userService.validateCredentials('ghost@example.com', 'pass'),
        ).rejects.toThrow(InvalidCredentialsError);
        // 사용자 존재 여부를 추론할 수 없도록 동일한 에러를 던져야 함
      });

      it('비밀번호가 틀리면 InvalidCredentialsError를 던진다', async () => {
        // Arrange
        const user = createMockUser();

        mockUserRepository.findByEmail.mockResolvedValue(user);
        mockPasswordHasher.compare.mockResolvedValue(false);

        // Act & Assert
        await expect(
          userService.validateCredentials(user.email, 'wrongpassword'),
        ).rejects.toThrow(InvalidCredentialsError);
      });

      it('탈퇴한 사용자는 로그인할 수 없다', async () => {
        // Arrange
        const deletedUser = createMockUser({ deletedAt: new Date() });

        mockUserRepository.findByEmail.mockResolvedValue(deletedUser);
        mockPasswordHasher.compare.mockResolvedValue(true);

        // Act & Assert
        await expect(
          userService.validateCredentials(deletedUser.email, 'pass'),
        ).rejects.toThrow(InvalidCredentialsError);
      });
    });
  });

  // ──────────────────────────────────────────
  // 사용자 조회
  // ──────────────────────────────────────────
  describe('findById()', () => {
    it('존재하는 사용자를 ID로 조회한다', async () => {
      // Arrange
      const userId = 'user-uuid-123';
      const user = createMockUser({ id: userId });

      mockUserRepository.findById.mockResolvedValue(user);

      // Act
      const result = await userService.findById(userId);

      // Assert
      expect(result.id).toBe(userId);
      expect(mockUserRepository.findById).toHaveBeenCalledWith(userId);
    });

    it('존재하지 않는 ID로 조회 시 UserNotFoundError를 던진다', async () => {
      // Arrange
      mockUserRepository.findById.mockResolvedValue(null);

      // Act & Assert
      await expect(
        userService.findById('non-existent-id'),
      ).rejects.toThrow(UserNotFoundError);
    });

    it('UUID 형식이 아닌 ID는 즉시 UserNotFoundError를 던진다', async () => {
      // Arrange - DB 조회 없이 유효성 검사에서 실패해야 함
      const invalidId = 'not-a-valid-uuid';

      // Act & Assert
      await expect(
        userService.findById(invalidId),
      ).rejects.toThrow(UserNotFoundError);
      expect(mockUserRepository.findById).not.toHaveBeenCalled();
    });
  });
});
```

### 1.2 User Repository 단위 테스트

```typescript
// src/tests/unit/user/user.repository.spec.ts
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { UserRepository } from '@/modules/user/user.repository';
import { createMockUser } from '@/tests/factories/user.factory';

describe('UserRepository', () => {
  let userRepository: UserRepository;
  let mockDb: ReturnType<typeof createMockDb>;

  const createMockDb = () => {
    const queryBuilder = {
      where: vi.fn().mockReturnThis(),
      whereNull: vi.fn().mockReturnThis(),
      first: vi.fn(),
      insert: vi.fn(),
      update: vi.fn(),
      returning: vi.fn().mockReturnThis(),
      select: vi.fn().mockReturnThis(),
      orderBy: vi.fn().mockReturnThis(),
      limit: vi.fn().mockReturnThis(),
      offset: vi.fn().mockReturnThis(),
    };
    const db = vi.fn().mockReturnValue(queryBuilder);
    return { db, queryBuilder };
  };

  beforeEach(() => {
    mockDb = createMockDb();
    userRepository = new UserRepository(mockDb.db as any);
  });

  describe('findByEmail()', () => {
    

### `frontend_tests.md`

# Hello World 앱 - 컴포넌트 테스트 코드

기획서 내용을 기반으로 핵심 컴포넌트들의 Vitest + Testing Library 테스트 코드를 작성합니다.

## 프로젝트 구조 및 설정

```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: ['node_modules/', 'src/test/'],
    },
  },
})
```

```typescript
// src/test/setup.ts
import '@testing-library/jest-dom'
import { cleanup } from '@testing-library/react'
import { afterEach, vi } from 'vitest'

afterEach(() => {
  cleanup()
  vi.clearAllMocks()
})
```

---

## 1. 랜딩 페이지 - 히어로 섹션 테스트

```typescript
// src/components/landing/HeroSection.test.tsx
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import HeroSection from './HeroSection'

const renderHeroSection = () =>
  render(
    <MemoryRouter>
      <HeroSection />
    </MemoryRouter>
  )

describe('HeroSection', () => {
  describe('콘텐츠 렌더링', () => {
    it('메인 슬로건이 노출된다', () => {
      renderHeroSection()

      expect(
        screen.getByText(/프로그래밍에 대한 두려움을 없애고/i)
      ).toBeInTheDocument()
    })

    it('부제목이 노출된다', () => {
      renderHeroSection()

      expect(
        screen.getByText(/설치 없이 즉시 시작/i)
      ).toBeInTheDocument()
    })

    it('5분 내 첫 성공 경험 메시지가 노출된다', () => {
      renderHeroSection()

      expect(
        screen.getByText(/5분 내 첫 성공 경험/i)
      ).toBeInTheDocument()
    })
  })

  describe('CTA 버튼', () => {
    it('무료로 시작하기 버튼이 노출된다', () => {
      renderHeroSection()

      const ctaButton = screen.getByRole('button', {
        name: /무료로 시작하기/i,
      })
      expect(ctaButton).toBeInTheDocument()
    })

    it('무료로 시작하기 버튼 클릭 시 회원가입 페이지로 이동하는 링크가 있다', () => {
      renderHeroSection()

      const ctaLink = screen.getByRole('link', { name: /무료로 시작하기/i })
      expect(ctaLink).toHaveAttribute('href', '/signup')
    })

    it('데모 보기 버튼이 노출된다', () => {
      renderHeroSection()

      expect(
        screen.getByRole('button', { name: /데모 보기/i })
      ).toBeInTheDocument()
    })
  })

  describe('접근성', () => {
    it('히어로 섹션이 main landmark 내에 위치한다', () => {
      renderHeroSection()

      const heading = screen.getByRole('heading', { level: 1 })
      expect(heading).toBeInTheDocument()
    })
  })
})
```

---

## 2. 코드 에디터 컴포넌트 테스트

```typescript
// src/components/editor/CodeEditor.test.tsx
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CodeEditor from './CodeEditor'

const defaultProps = {
  initialCode: 'print("Hello, World!")',
  language: 'python' as const,
  onRun: vi.fn(),
  onCodeChange: vi.fn(),
}

describe('CodeEditor', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('초기 렌더링', () => {
    it('초기 코드가 에디터에 표시된다', () => {
      render(<CodeEditor {...defaultProps} />)

      expect(
        screen.getByDisplayValue('print("Hello, World!")')
      ).toBeInTheDocument()
    })

    it('선택된 언어(Python)가 표시된다', () => {
      render(<CodeEditor {...defaultProps} />)

      expect(screen.getByText(/python/i)).toBeInTheDocument()
    })

    it('실행 버튼이 활성화 상태로 노출된다', () => {
      render(<CodeEditor {...defaultProps} />)

      const runButton = screen.getByRole('button', { name: /실행/i })
      expect(runButton).toBeInTheDocument()
      expect(runButton).not.toBeDisabled()
    })

    it('코드 초기화 버튼이 노출된다', () => {
      render(<CodeEditor {...defaultProps} />)

      expect(
        screen.getByRole('button', { name: /초기화/i })
      ).toBeInTheDocument()
    })
  })

  describe('코드 입력', () => {
    it('코드 입력 시 onCodeChange 콜백이 호출된다', async () => {
      const user = userEvent.setup()
      render(<CodeEditor {...defaultProps} />)

      const editor = screen.getByRole('textbox', { name: /코드 에디터/i })
      await user.clear(editor)
      await user.type(editor, 'print("Hello")')

      expect(defaultProps.onCodeChange).toHaveBeenCalled()
    })

    it('코드 초기화 버튼 클릭 시 초기 코드로 복원된다', async () => {
      const user = userEvent.setup()
      render(<CodeEditor {...defaultProps} />)

      const editor = screen.getByRole('textbox', { name: /코드 에디터/i })
      await user.clear(editor)
      await user.type(editor, '변경된 코드')

      const resetButton = screen.getByRole('button', { name: /초기화/i })
      await user.click(resetButton)

      expect(
        screen.getByDisplayValue('print("Hello, World!")')
      ).toBeInTheDocument()
    })
  })

  describe('코드 실행', () => {
    it('실행 버튼 클릭 시 onRun 콜백이 현재 코드와 함께 호출된다', async () => {
      const user = userEvent.setup()
      render(<CodeEditor {...defaultProps} />)

      const runButton = screen.getByRole('button', { name: /실행/i })
      await user.click(runButton)

      expect(defaultProps.onRun).toHaveBeenCalledWith('print("Hello, World!")')
    })

    it('실행 중에는 실행 버튼이 비활성화된다', async () => {
      const user = userEvent.setup()
      const slowOnRun = vi.fn(
        () => new Promise((resolve) => setTimeout(resolve, 1000))
      )
      render(<CodeEditor {...defaultProps} onRun={slowOnRun} />)

      const runButton = screen.getByRole('button', { name: /실행/i })
      await user.click(runButton)

      expect(runButton).toBeDisabled()
    })

    it('실행 완료 후 실행 버튼이 다시 활성화된다', async () => {
      const user = userEvent.setup()
      render(<CodeEditor {...defaultProps} />)

      const runButton = screen.getByRole('button', { name: /실행/i })
      await user.click(runButton)

      await waitFor(() => {
        expect(runButton).not.toBeDisabled()
      })
    })

    it('Ctrl+Enter 단축키로 코드를 실행할 수 있다', async () => {
      const user = userEvent.setup()
      render(<CodeEditor {...defaultProps} />)

      const editor = screen.getByRole('textbox', { name: /코드 에디터/i })
      await user.click(editor)
      await user.keyboard('{Control>}{Enter}{/Control}')

      expect(defaultProps.onRun).toHaveBeenCalledWith('print("Hello, World!")')
    })
  })

  describe('실행 결과 출력', () => {
    it('실행 결과가 출력 영역에 표시된다', async () => {
      const user = userEvent.setup()
      const onRun = vi.fn().mockResolvedValue({ output: 'Hello, World!' })
      render(<CodeEditor {...defaultProps} onRun={onRun} />)

      await user.click(screen.getByRole('button', { name: /실행/i }))

      await waitFor(() => {
        expect(screen.getByText('Hello, World!')).toBeInTheDocument()
      })
    })

    it('에러 발생 시 에러 메시지가 출력 영역에 표시된다', async () => {
      const user = userEvent.setup()
      const onRun = vi.fn().mockResolvedValue({
        output: '',
        error: 'SyntaxError: invalid syntax',
      })
      render(<CodeEditor {...defaultProps} onRun={onRun} />)

      await user.click(screen.getByRole('button', { name: /실행/i }))

      await waitFor(() => {
        expect(
          screen.getByText(/SyntaxError: invalid syntax/i)
        ).toBeInTheDocument()
      })
    })

    it('에러 메시지는 에러 스타일로 구분되어 표시된다', async () => {
      const user = userEvent.setup()
      const onRun = vi.fn().mockResolvedValue({
        output: '',
        error: 'SyntaxError: invalid syntax',
      })
      render(<CodeEditor {...defaultProps} onRun={onRun} />)

      await user.click(screen.getByRole('button', { name: /실행/i }))

      await waitFor(() => {
        const errorOutput = screen.getByRole('alert')
        expect(errorOutput).toHaveTextContent('SyntaxError: invalid syntax')
      })
    })
  })

  describe('접근성', () => {
    it('에디터 영역에 적절한 label이 존재한다', () => {
      render(<CodeEditor {...defaultProps} />)

      expect(
        screen.getByRole('textbox', { name: /코드 에디터/i })
      ).toBeInTheDocument()
    })

    it('실행 버튼에 aria-label이 설정되어 있다', () => {
      render(<CodeEditor {...defaultProps} />)

      const runButton = screen.getByRole('button', { name: /실행/i })
      expect(runButton).toHaveAccessibleName()
    })
  })
})
```

---

## 3. 과제 목록 컴포넌트 테스트

```typescript
// src/components/challenge/ChallengeList.test.tsx
import { describe, it, expect, vi } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import ChallengeList from './ChallengeList'
import type { Challenge } from '../../types/challenge'

const mockChallenges: Challenge[] = [
  {
    id: '1',
    title: 'Hello World 출력하기',
    description: '화면에 Hello, World!를 출력하세요.',
    difficulty: 'beginner',
    estimatedMinutes: 5,
    isCompleted: false,
    language: 'python',
    order: 1,
  },
  {
    id: '2',
    title: '변수 선언하기',
    description: '변수를 선언하고 출력하세요.',
    difficulty: 'beginner',
    estimatedMinutes: 7,
    isCompleted: true,
    language: 'python',
    order: 2,
  },
  {
    id: '3',
    title: '조건문 작성하기',
    description: 'if문을 사용하여 조건에 따라 다른 출력을 하세요.',
    difficulty: 'intermediate',
    estimatedMinutes: 10,
    isCompleted: false,
    language: 'python',
    order: 3,
  },
]

const renderChallengeList = (
  challenges = mockChallenges,
  onSelect = vi.fn()
) =>
  render(
    <MemoryRouter>
      <ChallengeList challenges={challenges} onSelect={onSelect} />
    </MemoryRouter>
  )

describe('ChallengeList', () => {
  describe('과제 목록 렌더링', () => {
    it('과제 목록이 전체 노출된다', () => {
      renderChallengeList()

      const items = screen.getAllByRole('listitem')
      expect(items).toHaveLength(mockChallenges.length)
    })

    it('각 과제의 제목이 노출된다', () => {
      renderChallengeList()

      expect(screen.getByText('Hello World 출력하기')).toBeInTheDocument()
      expect(screen.getByText('변수 선언하기')).toBeInTheDocument()
      expect(screen.getByText('조건문 작성하기')).toBeInTheDocument()
    })

    it('각 과제의 예상 소요 시간이 노출된다', () => {
      renderChallengeList()

      expect(screen.getByText(/5분/)).toBeInTheDocument()
      expect(screen.getByText(/7분/)).toBeInTheDocument()
      expect(screen.getByText(/10분/)).toBeInTheDocument()
    })

    it('완료된 과제에 완료 뱃지가 표시된다', () => {
      renderChallengeList()

      // 완료된 과제('변수 선언하기') 아이템 내 완료 뱃지 확인
      const completedItem = screen
        .getByText('변수 선언하기')
        .closest('[role="listitem"]')!

      expect(within(completedItem).getByText(/완료/i)).toBeInTheDocument()
    })

    it('미완료 과제에는 완료 뱃지가 없다', () => {
      renderChallengeList()

### `e2e_tests.md`

# Playwright E2E 테스트 코드

기획서의 Acceptance Criteria를 기반으로 핵심 사용자 시나리오 5개 이상을 작성합니다.

## 프로젝트 구조

```
tests/
├── e2e/
│   ├── auth/
│   │   └── registration.spec.ts
│   ├── learning/
│   │   ├── first-task.spec.ts
│   │   ├── code-execution.spec.ts
│   │   └── task-progression.spec.ts
│   └── gamification/
│       └── achievement.spec.ts
├── fixtures/
│   ├── test-data.ts
│   └── custom-fixtures.ts
├── pages/
│   ├── BasePage.ts
│   ├── LandingPage.ts
│   ├── AuthPage.ts
│   ├── DashboardPage.ts
│   ├── EditorPage.ts
│   └── ProfilePage.ts
└── playwright.config.ts
```

## playwright.config.ts

```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['html', { outputFolder: 'playwright-report' }],
    ['json', { outputFile: 'test-results/results.json' }],
    ['list'],
  ],
  use: {
    baseURL: process.env.BASE_URL || 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: 10_000,
    navigationTimeout: 30_000,
  },
  projects: [
    // 인증이 필요한 테스트를 위한 Setup
    {
      name: 'setup',
      testMatch: /.*\.setup\.ts/,
    },
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'playwright/.auth/user.json',
      },
      dependencies: ['setup'],
    },
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
        storageState: 'playwright/.auth/user.json',
      },
      dependencies: ['setup'],
    },
    // 비로그인 테스트 (랜딩, 회원가입)
    {
      name: 'anonymous',
      testMatch: /.*\/(auth|landing)\/.*/,
      use: { ...devices['Desktop Chrome'] },
    },
    // 모바일 반응형 테스트
    {
      name: 'mobile-chrome',
      use: {
        ...devices['Pixel 5'],
        storageState: 'playwright/.auth/user.json',
      },
      dependencies: ['setup'],
    },
  ],
  globalSetup: './tests/fixtures/global-setup.ts',
  globalTeardown: './tests/fixtures/global-teardown.ts',
});
```

## tests/fixtures/test-data.ts

```typescript
export const TEST_USERS = {
  // 이미 존재하는 테스트 계정 (auth setup에서 생성)
  existingUser: {
    email: 'test.user@helloworld.dev',
    password: 'TestPass123!',
    username: 'testuser',
  },
  // 회원가입 테스트용 (매 테스트 실행마다 다른 이메일)
  newUser: () => ({
    email: `new.user.${Date.now()}@helloworld.dev`,
    password: 'NewPass456!',
    username: `newuser${Date.now()}`,
  }),
} as const;

export const TASKS = {
  firstTask: {
    id: 'task-001',
    title: 'Hello World 출력하기',
    description: 'print() 함수를 사용해서 Hello, World!를 출력하세요.',
    language: 'python',
    expectedOutput: 'Hello, World!',
    solutionCode: 'print("Hello, World!")',
    wrongCode: 'console.log("Hello, World!")',  // Python에서 잘못된 문법
    hintText: 'print() 함수를 사용해보세요',
  },
  secondTask: {
    id: 'task-002',
    title: '변수 사용하기',
    language: 'python',
    solutionCode: 'name = "World"\nprint(f"Hello, {name}!")',
  },
} as const;

export const ROUTES = {
  landing: '/',
  login: '/login',
  register: '/register',
  dashboard: '/dashboard',
  tasks: '/tasks',
  taskDetail: (id: string) => `/tasks/${id}`,
  editor: (id: string) => `/tasks/${id}/editor`,
  profile: '/profile',
} as const;

export const SELECTORS = {
  // 공통
  loadingSpinner: '[data-testid="loading-spinner"]',
  errorMessage: '[data-testid="error-message"]',
  successToast: '[data-testid="success-toast"]',

  // 랜딩
  heroTitle: '[data-testid="hero-title"]',
  ctaButton: '[data-testid="cta-start-button"]',

  // 인증
  emailInput: '[data-testid="email-input"]',
  passwordInput: '[data-testid="password-input"]',
  usernameInput: '[data-testid="username-input"]',
  submitButton: '[data-testid="submit-button"]',
  loginLink: '[data-testid="login-link"]',
  registerLink: '[data-testid="register-link"]',

  // 대시보드
  welcomeMessage: '[data-testid="welcome-message"]',
  taskList: '[data-testid="task-list"]',
  taskCard: '[data-testid="task-card"]',
  progressBar: '[data-testid="progress-bar"]',
  completedCount: '[data-testid="completed-count"]',

  // 에디터
  codeEditor: '[data-testid="code-editor"]',
  runButton: '[data-testid="run-button"]',
  outputPanel: '[data-testid="output-panel"]',
  hintButton: '[data-testid="hint-button"]',
  hintContent: '[data-testid="hint-content"]',
  submitCodeButton: '[data-testid="submit-code-button"]',
  successModal: '[data-testid="success-modal"]',
  nextTaskButton: '[data-testid="next-task-button"]',
  timerDisplay: '[data-testid="timer-display"]',

  // 프로필
  totalCompleted: '[data-testid="total-completed"]',
  badgeList: '[data-testid="badge-list"]',
  streakCount: '[data-testid="streak-count"]',
} as const;
```

## tests/fixtures/custom-fixtures.ts

```typescript
import { test as base, expect, Page } from '@playwright/test';
import { LandingPage } from '../pages/LandingPage';
import { AuthPage } from '../pages/AuthPage';
import { DashboardPage } from '../pages/DashboardPage';
import { EditorPage } from '../pages/EditorPage';
import { ProfilePage } from '../pages/ProfilePage';
import { TEST_USERS } from './test-data';

// 커스텀 Fixture 타입 정의
type AppFixtures = {
  landingPage: LandingPage;
  authPage: AuthPage;
  dashboardPage: DashboardPage;
  editorPage: EditorPage;
  profilePage: ProfilePage;
  authenticatedPage: Page;
};

export const test = base.extend<AppFixtures>({
  landingPage: async ({ page }, use) => {
    await use(new LandingPage(page));
  },
  authPage: async ({ page }, use) => {
    await use(new AuthPage(page));
  },
  dashboardPage: async ({ page }, use) => {
    await use(new DashboardPage(page));
  },
  editorPage: async ({ page }, use) => {
    await use(new EditorPage(page));
  },
  profilePage: async ({ page }, use) => {
    await use(new ProfilePage(page));
  },
  // 이미 로그인된 페이지 컨텍스트
  authenticatedPage: async ({ page }, use) => {
    await page.goto('/dashboard');
    await page.waitForSelector('[data-testid="welcome-message"]');
    await use(page);
  },
});

export { expect };
```

## tests/fixtures/auth.setup.ts

```typescript
import { test as setup, expect } from '@playwright/test';
import { TEST_USERS, ROUTES, SELECTORS } from './test-data';
import path from 'path';

const authFile = path.join(__dirname, '../../playwright/.auth/user.json');

/**
 * 테스트 실행 전 인증 상태를 저장하는 Setup
 * 모든 테스트가 매번 로그인하지 않아도 되도록 세션을 재사용
 */
setup('authenticate', async ({ page }) => {
  await page.goto(ROUTES.login);

  // 로그인 폼 작성
  await page.fill(SELECTORS.emailInput, TEST_USERS.existingUser.email);
  await page.fill(SELECTORS.passwordInput, TEST_USERS.existingUser.password);
  await page.click(SELECTORS.submitButton);

  // 로그인 성공 확인
  await page.waitForURL(ROUTES.dashboard);
  await expect(page.locator(SELECTORS.welcomeMessage)).toBeVisible();

  // 인증 상태 저장
  await page.context().storageState({ path: authFile });
});
```

## tests/pages/BasePage.ts

```typescript
import { Page, Locator, expect } from '@playwright/test';
import { SELECTORS } from '../fixtures/test-data';

export abstract class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * 로딩 스피너가 사라질 때까지 대기
   */
  async waitForLoadingComplete(): Promise<void> {
    const spinner = this.page.locator(SELECTORS.loadingSpinner);
    // 스피너가 나타났다가 사라지는 경우 처리
    try {
      await spinner.waitFor({ state: 'visible', timeout: 2000 });
      await spinner.waitFor({ state: 'hidden', timeout: 30000 });
    } catch {
      // 스피너가 처음부터 없는 경우 무시
    }
  }

  /**
   * 성공 토스트 메시지 확인
   */
  async expectSuccessToast(message?: string): Promise<void> {
    const toast = this.page.locator(SELECTORS.successToast);
    await expect(toast).toBeVisible({ timeout: 5000 });
    if (message) {
      await expect(toast).toContainText(message);
    }
  }

  /**
   * 에러 메시지 확인
   */
  async expectErrorMessage(message?: string): Promise<void> {
    const error = this.page.locator(SELECTORS.errorMessage);
    await expect(error).toBeVisible({ timeout: 5000 });
    if (message) {
      await expect(error).toContainText(message);
    }
  }

  /**
   * 현재 URL이 예상 경로를 포함하는지 확인
   */
  async expectUrl(path: string): Promise<void> {
    await expect(this.page).toHaveURL(new RegExp(path));
  }
}
```

## tests/pages/AuthPage.ts

```typescript
import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { ROUTES, SELECTORS } from '../fixtures/test-data';

export class AuthPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async navigateToRegister(): Promise<void> {
    await this.page.goto(ROUTES.register);
    await this.waitForLoadingComplete();
  }

  async navigateToLogin(): Promise<void> {
    await this.page.goto(ROUTES.login);
    await this.waitForLoadingComplete();
  }

  async fillRegisterForm(data: {
    username: string;
    email: string;
    password: string;
  }): Promise<void> {
    await this.page.fill(SELECTORS.usernameInput, data.username);
    await this.page.fill(SELECTORS.emailInput, data.email);
    await this.page.fill(SELECTORS.passwordInput, data.password);
  }

  async fillLoginForm(data: {
    email: string;
    password: string;
  }): Promise<void> {
    await this.page.fill(SELECTORS.emailInput, data.email);
    await this.page.fill(SELECTORS.passwordInput, data.password);
  }

  async submitForm(): Promise<void> {
    await this.page.click(SELECTORS.submitButton);
  }

  async register(data: {
    username: string;
    email: string;
    password: string;
  }): Promise<void> {
    await this.navigateToRegister();
    await this.fillRegisterForm(data);
    await this.submitForm();
  }

  async login(data: {
    email: string;
    password: string;
  }): Promise<void> {
    await this.navigateToLogin();
    await this.fillLoginForm(data);
    await this.submitForm();
  }

  async expectRedirectToDashboard(): Promise<void> {
    await this.page.waitForURL(ROUTES.dashboard, { timeout: 10000 });
    await expect(
      this.page.locator(SELECTORS.welcomeMessage)
    ).toBeVisible();
  }
}
```

## tests/pages/EditorPage.ts

```typescript
import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { ROUTES, SELECTORS } from '../fixtures/test-data';

export class EditorPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async navigateToTask(taskId: string): Promise<void> {
    await this.page.goto(ROUTES.editor(taskId));
    await this.waitForLoadingComplete();
    // 에디터 완전 로드 대기
    await this.page.waitForSelector(SELECTORS.codeEditor, {
      state: 'visible',
      timeout: 15000,
    });
  }

  /**
   * 코드 에디터에 코드 입력
   * Monaco Editor / CodeMirror 등 다양한 에디터 대응
   */
  async typeCode(code: string): Promise<void> {
    const editor = this.page.locator(SELECTORS.codeEditor);
    // 기존 코드 전체 선택 후 교체
    await editor.click();
    await this.page.keyboard.press('Control+a');
    await this.page.keyboard.type(code);
  }

  async clearCode(): Promise<void>

### `code_review.md`

# 코드 리뷰 체크리스트 - Hello World 앱

## 문서 정보

| 항목 | 내용 |
|------|------|
| **대상 프로젝트** | Hello World 앱 (프로그래밍 학습 플랫폼) |
| **버전** | v1.0 |
| **적용 범위** | 신규 기능 PR, 버그 픽스, 리팩토링 |
| **필수 통과 기준** | 🔴 Critical 항목 전체 + 🟡 Major 항목 80% 이상 |

---

## 체크리스트 사용 방법

```
✅ 통과    ❌ 미통과 (블로킹)    ⚠️ 개선 권장    N/A 해당 없음

심각도 기준:
🔴 Critical  - 미통과 시 머지 불가
🟡 Major     - 미통과 시 수정 요청
🔵 Minor     - 개선 권장 (머지 가능)
```

---

## 1. 🔒 보안 (Security)

### 1.1 인증 & 인가

| # | 심각도 | 체크 항목 | 확인 방법 | 결과 |
|---|--------|-----------|-----------|------|
| S-01 | 🔴 | JWT 토큰 만료 시간이 적절히 설정되었는가? (Access: 15~60분, Refresh: 7~30일) | 토큰 설정 코드 확인 | |
| S-02 | 🔴 | 인증이 필요한 API 엔드포인트에 인증 미들웨어가 적용되었는가? | API 라우터 코드 확인 | |
| S-03 | 🔴 | 타 사용자의 리소스에 접근 가능한 권한 우회 취약점이 없는가? (IDOR) | userId 기반 필터링 확인 | |
| S-04 | 🟡 | 로그인 실패 횟수 제한(Rate Limiting)이 구현되어 있는가? | Rate limiter 설정 확인 | |
| S-05 | 🟡 | 비밀번호가 bcrypt/argon2 등 안전한 해시 함수로 저장되는가? | 회원가입 로직 확인 | |

```
💡 Hello World 앱 특이사항
- 14세 미만 사용자(이준영 페르소나) 고려 → 아동 개인정보보호법(COPPA) 요건 확인 필수
- 소셜 로그인(추후 도입) 대비 OAuth 상태값 검증 로직 미리 설계
```

### 1.2 코드 실행 보안 ⚠️ 최우선 주의

> Hello World 앱의 핵심 기능인 **브라우저 기반 코드 실행** 환경의 보안은 가장 중요한 항목입니다.

| # | 심각도 | 체크 항목 | 확인 방법 | 결과 |
|---|--------|-----------|-----------|------|
| S-06 | 🔴 | 사용자 코드 실행이 샌드박스(sandbox) 환경에서만 이루어지는가? | 실행 환경 격리 설정 확인 | |
| S-07 | 🔴 | 코드 실행 시 타임아웃(최대 5~10초)이 설정되어 무한 루프를 차단하는가? | 실행 제한 설정 확인 | |
| S-08 | 🔴 | 파일 시스템, 네트워크, 시스템 명령어 접근이 차단되어 있는가? | 샌드박스 권한 설정 확인 | |
| S-09 | 🟡 | 실행 가능한 코드 크기에 제한이 있는가? (예: 50KB 이하) | 입력 검증 로직 확인 | |
| S-10 | 🟡 | 코드 실행 결과가 XSS 방지를 위해 이스케이프 처리되는가? | 출력 렌더링 코드 확인 | |

### 1.3 입력 검증 & 인젝션 방지

| # | 심각도 | 체크 항목 | 확인 방법 | 결과 |
|---|--------|-----------|-----------|------|
| S-11 | 🔴 | 모든 DB 쿼리에 파라미터 바인딩이 사용되는가? (SQL Injection 방지) | ORM/쿼리 빌더 사용 확인 | |
| S-12 | 🔴 | 사용자 입력이 HTML에 직접 삽입되지 않는가? (XSS 방지) | 렌더링 코드 확인 | |
| S-13 | 🟡 | API 요청 바디에 대한 스키마 검증이 이루어지는가? | 입력 유효성 검사 로직 확인 | |
| S-14 | 🟡 | CSRF 토큰이 상태 변경 요청(POST/PUT/DELETE)에 적용되는가? | CSRF 미들웨어 확인 | |
| S-15 | 🔵 | HTTP 보안 헤더가 올바르게 설정되었는가? (CSP, HSTS, X-Frame-Options) | 응답 헤더 확인 | |

### 1.4 민감 정보 관리

| # | 심각도 | 체크 항목 | 확인 방법 | 결과 |
|---|--------|-----------|-----------|------|
| S-16 | 🔴 | API 키, DB 비밀번호, JWT 시크릿이 코드에 하드코딩되지 않았는가? | 코드 및 git history 확인 | |
| S-17 | 🔴 | .env 파일이 .gitignore에 포함되어 있는가? | .gitignore 확인 | |
| S-18 | 🟡 | 로그에 비밀번호, 토큰, 개인정보가 출력되지 않는가? | 로깅 코드 확인 | |
| S-19 | 🟡 | API 응답에 불필요한 내부 정보(스택 트레이스, DB 스키마)가 노출되지 않는가? | 에러 핸들러 확인 | |

---

## 2. ⚡ 성능 (Performance)

### 2.1 응답 시간 기준

> **PRD 비기능 요구사항 기반 목표값**

| 작업 유형 | 목표 응답 시간 | 최대 허용 |
|-----------|---------------|-----------|
| 페이지 첫 로딩 (FCP) | 1.5초 이하 | 3초 |
| API 응답 (조회) | 200ms 이하 | 500ms |
| 코드 실행 결과 반환 | 3초 이하 | 10초 |
| 과제 목록 로딩 | 300ms 이하 | 1초 |

### 2.2 데이터베이스

| # | 심각도 | 체크 항목 | 확인 방법 | 결과 |
|---|--------|-----------|-----------|------|
| P-01 | 🔴 | N+1 쿼리 문제가 없는가? (루프 내 DB 호출 금지) | 쿼리 로그 / ORM 코드 확인 | |
| P-02 | 🟡 | 자주 조회되는 컬럼에 인덱스가 적절히 설정되었는가? | 마이그레이션 파일 확인 | |
| P-03 | 🟡 | 대용량 데이터 조회 시 페이지네이션이 적용되었는가? | 목록 API 코드 확인 | |
| P-04 | 🟡 | 불필요한 컬럼까지 `SELECT *`로 조회하지 않는가? | ORM 쿼리 확인 | |
| P-05 | 🔵 | 트랜잭션이 필요한 연산에 적절히 사용되었는가? | 데이터 변경 로직 확인 | |

```sql
-- ❌ 나쁜 예시: N+1 쿼리
users.forEach(user => {
  const progress = await db.query(`SELECT * FROM progress WHERE user_id = ${user.id}`)
})

-- ✅ 좋은 예시: JOIN 또는 IN 절 사용
SELECT u.*, p.* FROM users u
LEFT JOIN progress p ON u.id = p.user_id
WHERE u.id IN (...)
```

### 2.3 프론트엔드 성능

| # | 심각도 | 체크 항목 | 확인 방법 | 결과 |
|---|--------|-----------|-----------|------|
| P-06 | 🟡 | 번들 크기가 합리적인가? (초기 JS 로드 200KB 이하 권장) | Bundle Analyzer 확인 | |
| P-07 | 🟡 | 이미지가 최적화되었는가? (WebP 형식, 적절한 해상도) | 이미지 파일 확인 | |
| P-08 | 🟡 | 코드 에디터, 차트 등 무거운 라이브러리에 Lazy Loading이 적용되었는가? | 임포트 구문 확인 | |
| P-09 | 🔵 | 불필요한 리렌더링이 발생하지 않는가? (React 기준: memo, useCallback 활용) | React DevTools 프로파일링 | |
| P-10 | 🔵 | API 응답 데이터가 적절히 캐싱되는가? (React Query, SWR 등) | 캐싱 설정 확인 | |

### 2.4 서버 & 인프라

| # | 심각도 | 체크 항목 | 확인 방법 | 결과 |
|---|--------|-----------|-----------|------|
| P-11 | 🟡 | API Rate Limiting이 구현되어 악용을 방지하는가? | Rate limiter 설정 확인 | |
| P-12 | 🟡 | 자주 요청되는 데이터(과제 목록, 힌트)에 캐싱이 적용되었는가? | Redis/인메모리 캐시 확인 | |
| P-13 | 🔵 | 정적 파일(이미지, CSS, JS)에 적절한 Cache-Control 헤더가 설정되었는가? | HTTP 응답 헤더 확인 | |

---

## 3. 📋 코드 품질 (Code Quality)

### 3.1 가독성 & 명명 규칙

| # | 심각도 | 체크 항목 | 확인 방법 | 결과 |
|---|--------|-----------|-----------|------|
| Q-01 | 🟡 | 변수/함수/클래스 이름이 의도를 명확히 표현하는가? | 코드 직접 읽기 | |
| Q-02 | 🟡 | 팀 컨벤션(camelCase, snake_case 등)이 일관되게 적용되었는가? | Lint 결과 확인 | |
| Q-03 | 🟡 | 매직 넘버/문자열이 상수로 정의되었는가? | 하드코딩 값 검색 | |
| Q-04 | 🔵 | 함수/메서드의 길이가 적절한가? (단일 책임 원칙, 50줄 이하 권장) | 코드 라인 수 확인 | |
| Q-05 | 🔵 | 중복 코드(DRY 원칙 위반)가 없는가? | 유사 코드 블록 검색 | |

```javascript
// ❌ 나쁜 예시
if (user.status === 2) { ... }  // 2가 무엇인지 알 수 없음
setTimeout(fn, 86400000)        // 86400000이 무엇인지 알 수 없음

// ✅ 좋은 예시
const USER_STATUS = { ACTIVE: 1, SUSPENDED: 2, DELETED: 3 }
const ONE_DAY_MS = 24 * 60 * 60 * 1000

if (user.status === USER_STATUS.SUSPENDED) { ... }
setTimeout(fn, ONE_DAY_MS)
```

### 3.2 에러 처리

| # | 심각도 | 체크 항목 | 확인 방법 | 결과 |
|---|--------|-----------|-----------|------|
| Q-06 | 🔴 | 예외(Exception)가 적절히 캐치되어 서버 크래시를 방지하는가? | try-catch 적용 확인 | |
| Q-07 | 🟡 | API 에러 응답이 일관된 형식을 따르는가? | 에러 응답 구조 확인 | |
| Q-08 | 🟡 | 사용자에게 표시되는 에러 메시지가 친절하고 이해하기 쉬운가? | 에러 메시지 문구 확인 | |
| Q-09 | 🟡 | Promise rejection이 unhandled 상태로 남지 않는가? | async/await 패턴 확인 | |
| Q-10 | 🔵 | 에러 로깅이 충분한 컨텍스트(타임스탬프, 사용자 ID, 요청 정보

---

## 8. 배포

### `docker.md`

# Docker 설정 완전 가이드
## Hello World 학습 플랫폼 - 멀티스테이지 Dockerfile & Docker Compose

---

## 📁 디렉토리 구조

```
project-root/
├── docker/
│   ├── frontend/
│   │   ├── Dockerfile
│   │   └── nginx.conf
│   ├── backend/
│   │   ├── Dockerfile
│   │   └── .dockerignore
│   └── docker-entrypoint.sh
├── frontend/
│   ├── package.json
│   ├── vite.config.ts
│   └── src/
├── backend/
│   ├── package.json
│   ├── src/
│   └── .env.example
├── docker-compose.yml          # 개발용
├── docker-compose.prod.yml     # 프로덕션용
└── docker-compose.override.yml # 로컬 개발 오버라이드
```

---

## 🐳 1. Frontend Dockerfile (Next.js + TypeScript)

### `docker/frontend/Dockerfile`

```dockerfile
# ============================================================================
# Stage 1: Dependencies (캐시 레이어 분리)
# ============================================================================
FROM node:20-alpine AS dependencies

WORKDIR /app

# 패키지 파일 복사 (캐시 레이어 최적화)
COPY frontend/package*.json ./

# 프로덕션 의존성만 설치
RUN npm ci --only=production --legacy-peer-deps && \
    npm cache clean --force

# 모든 의존성 설치 (빌드용)
RUN npm ci --legacy-peer-deps


# ============================================================================
# Stage 2: Builder (빌드 최적화)
# ============================================================================
FROM node:20-alpine AS builder

WORKDIR /app

# 이전 스테이지에서 node_modules 복사
COPY --from=dependencies /app/node_modules ./node_modules

# 소스 코드 복사
COPY frontend/ .

# 환경 변수 설정
ARG NODE_ENV=production
ARG NEXT_PUBLIC_API_URL=https://api.helloworld.com
ENV NODE_ENV=${NODE_ENV}
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}

# Next.js 빌드
RUN npm run build

# 빌드 파일 검증
RUN if [ ! -d ".next" ]; then echo "Build failed!"; exit 1; fi


# ============================================================================
# Stage 3: Production Runtime (최소 크기)
# ============================================================================
FROM node:20-alpine AS production

WORKDIR /app

# 비루트 사용자 생성 (보안)
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001

# 시스템 패키지 (최소화)
RUN apk add --no-cache tini

# 프로덕션 의존성만 복사
COPY --from=dependencies /app/node_modules ./node_modules

# 빌드된 앱 복사
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package*.json ./

# 소유권 변경
RUN chown -R nextjs:nodejs /app

# 비루트 사용자로 전환
USER nextjs

# 포트 노출
EXPOSE 3000

# 헬스 체크
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD node -e "require('http').get('http://localhost:3000', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"

# tini를 init으로 사용 (좀비 프로세스 방지)
ENTRYPOINT ["/sbin/tini", "--"]

# 앱 시작
CMD ["npm", "start"]
```

### `docker/frontend/nginx.conf` (프로덕션 리버스 프록시)

```nginx
# Nginx 설정 파일

upstream nextjs_backend {
    server localhost:3000;
    keepalive 64;
}

# Rate Limiting
limit_req_zone $binary_remote_addr zone=general:10m rate=10r/s;
limit_req_zone $binary_remote_addr zone=api:10m rate=30r/s;

server {
    listen 80;
    server_name _;

    # 보안 헤더
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header Permissions-Policy "geolocation=(), microphone=(), camera=()" always;

    # GZIP 압축
    gzip on;
    gzip_vary on;
    gzip_min_length 1000;
    gzip_types text/plain text/css text/xml text/javascript 
               application/x-javascript application/xml+rss 
               application/json application/javascript;

    # Static 파일 캐싱
    location /_next/static {
        proxy_cache_valid 200 1d;
        proxy_cache_use_stale error timeout updating http_500 http_502 http_503 http_504;
        expires 1d;
        add_header Cache-Control "public, immutable";
        proxy_pass http://nextjs_backend;
    }

    # Public 파일 캐싱
    location /public {
        expires 7d;
        add_header Cache-Control "public";
        proxy_pass http://nextjs_backend;
    }

    # API 요청 Rate Limiting
    location /api {
        limit_req zone=api burst=100 nodelay;
        proxy_pass http://nextjs_backend;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # 일반 요청
    location / {
        limit_req zone=general burst=20 nodelay;
        proxy_pass http://nextjs_backend;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

---

## 🐳 2. Backend Dockerfile (Node.js + Express + TypeScript)

### `docker/backend/Dockerfile`

```dockerfile
# ============================================================================
# Stage 1: Dependencies Builder
# ============================================================================
FROM node:20-alpine AS dependencies-builder

WORKDIR /app

# 패키지 파일만 먼저 복사
COPY backend/package*.json ./

# 의존성 설치
RUN npm ci --legacy-peer-deps && \
    npm cache clean --force


# ============================================================================
# Stage 2: TypeScript Builder
# ============================================================================
FROM node:20-alpine AS builder

WORKDIR /app

# 의존성 복사
COPY --from=dependencies-builder /app/node_modules ./node_modules

# 소스 코드 복사
COPY backend/ .

# 환경 변수
ARG NODE_ENV=production
ARG LOG_LEVEL=info
ARG DATABASE_URL=postgresql://user:password@db:5432/helloworld
ENV NODE_ENV=${NODE_ENV}
ENV LOG_LEVEL=${LOG_LEVEL}
ENV DATABASE_URL=${DATABASE_URL}

# TypeScript 컴파일
RUN npm run build

# 빌드 검증
RUN if [ ! -d "dist" ]; then echo "Build failed!"; exit 1; fi

# 마이그레이션 파일 복사 (필요한 경우)
RUN if [ -d "src/migrations" ]; then cp -r src/migrations dist/; fi


# ============================================================================
# Stage 3: Production Runtime
# ============================================================================
FROM node:20-alpine AS production

WORKDIR /app

# 시스템 패키지 (최소화)
RUN apk add --no-cache \
    tini \
    curl \
    dumb-init

# 비루트 사용자 생성
RUN addgroup -g 1001 -S nodejs && \
    adduser -S appuser -u 1001

# 프로덕션 의존성만 설치
COPY backend/package*.json ./
RUN npm ci --only=production --legacy-peer-deps && \
    npm cache clean --force

# 컴파일된 앱 복사
COPY --from=builder /app/dist ./dist

# 마이그레이션 파일 복사
COPY --from=builder --chown=appuser:nodejs /app/dist ./dist

# 공개 파일 디렉토리 (만약 필요한 경우)
RUN mkdir -p /app/uploads && chown -R appuser:nodejs /app/uploads

# 소유권 변경
RUN chown -R appuser:nodejs /app

# 비루트 사용자로 전환
USER appuser

# 포트 노출
EXPOSE 3001

# 환경 변수 설정
ENV NODE_ENV=production
ENV LOG_LEVEL=info

# 헬스 체크
HEALTHCHECK --interval=30s --timeout=10s --start-period=10s --retries=3 \
    CMD curl -f http://localhost:3001/health || exit 1

# Init 시스템으로 tini 사용
ENTRYPOINT ["/sbin/tini", "--"]

# 앱 시작
CMD ["node", "dist/index.js"]
```

### `docker/backend/.dockerignore`

```
node_modules
npm-debug.log
dist
.git
.gitignore
README.md
.env.example
.env
.env.local
.env.*.local
.vscode
.idea
*.log
coverage
.nyc_output
.DS_Store
```

---

## 🐳 3. Docker Compose 개발 환경

### `docker-compose.yml` (개발용)

```yaml
version: '3.9'

services:
  # ==================== 데이터베이스 ====================
  postgres:
    image: postgres:16-alpine
    container_name: helloworld-db-dev
    environment:
      POSTGRES_USER: ${DB_USER:-devuser}
      POSTGRES_PASSWORD: ${DB_PASSWORD:-devpassword}
      POSTGRES_DB: ${DB_NAME:-helloworld_dev}
      POSTGRES_INITDB_ARGS: "--encoding=UTF8 --locale=C"
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./backend/scripts/init-db.sql:/docker-entrypoint-initdb.d/01-init.sql
    ports:
      - "5432:5432"
    networks:
      - helloworld-network
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U ${DB_USER:-devuser}"]
      interval: 10s
      timeout: 5s
      retries: 5
    restart: unless-stopped

  # ==================== Redis (캐시 & 세션) ====================
  redis:
    image: redis:7-alpine
    container_name: helloworld-redis-dev
    command: redis-server --appendonly yes --requirepass ${REDIS_PASSWORD:-redisdevpass}
    volumes:
      - redis_data:/data
    ports:
      - "6379:6379"
    networks:
      - helloworld-network
    healthcheck:
      test: ["CMD", "redis-cli", "-a", "${REDIS_PASSWORD:-redisdevpass}", "ping"]
      interval: 10s
      timeout: 5s
      retries: 5
    restart: unless-stopped

  # ==================== 백엔드 ====================
  backend:
    build:
      context: .
      dockerfile: docker/backend/Dockerfile
      args:
        NODE_ENV: development
        LOG_LEVEL: debug
    container_name: helloworld-backend-dev
    environment:
      NODE_ENV: development
      LOG_LEVEL: debug
      PORT: 3001
      DATABASE_URL: postgresql://${DB_USER:-devuser}:${DB_PASSWORD:-devpassword}@postgres:5432/${DB_NAME:-helloworld_dev}
      REDIS_URL: redis://:${REDIS_PASSWORD:-redisdevpass}@redis:6379/0
      JWT_SECRET: ${JWT_SECRET:-dev-secret-key-change-in-production}
      JWT_EXPIRY: 7d
      CORS_ORIGIN: http://localhost:3000
      NODE_OPTIONS: --max-old-space-size=512
    depends_on:
      postgres:
        condition: service_healthy
      redis:
        condition: service_healthy
    volumes:
      - ./backend:/app
      - /app/node_modules
      - ./backend/logs:/app/logs
    ports:
      - "3001:3001"
    networks:
      - helloworld-network
    restart: unless-stopped
    command: npm run dev

  # ==================== 프론트엔드 ====================
  frontend:
    build:
      context: .
      dockerfile: docker/frontend/Dockerfile
      args:
        NODE_ENV: development
        NEXT_PUBLIC_API_URL: http://localhost:3001
    container_name: helloworld-frontend-dev
    environment:
      NODE_ENV: development
      NEXT_PUBLIC_API_URL: http://localhost:3001
      NEXT_PUBLIC_ANALYTICS_ID: ${NEXT_PUBLIC_ANALYTICS_ID:-}
    depends_on:
      - backend
    volumes:
      - ./frontend:/app
      - /app/node_modules
      - /app/.next
    ports:
      - "3000:3000"
    networks:
      - helloworld-network
    restart: unless-stopped
    command: npm run dev

  # ==================== 코드 실행 엔진 (선택사항) ====================
  code-executor:
    image: node:20-alpine
    container_name: helloworld-executor-dev
    environment:
      NODE_ENV: development
      MAX_EXECUTION_TIME: 5000
      MAX_MEMORY_MB: 512
    volumes:
      - ./backend/src/executor:/app
    ports:
      - "3002:3002"
    networks:
      - helloworld-network
    working_dir: /app
    command: node server.js
    restart: unless-stopped

  # ==================== 개발용 유틸리티 ====================
  adminer:
    image: adminer:latest
    container_name: helloworld-adminer
    environment:
      ADMINER_DEFAULT_SERVER: postgres
    ports:
      - "8080:8080"
    networks:
      - helloworld-network
    depends_on:
      - postgres
    restart: unless-stopped

  redis-commander:
    image: rediscommander/redis-commander:latest
    container_name: helloworld-redis-commander
    environment

### `cicd.md`

# GitHub Actions CI/CD 워크플로우

기술 스택 기반으로 작성한 완전한 CI/CD 파이프라인입니다.

```yaml
# .github/workflows/main.yml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

env:
  REGISTRY: ghcr.io
  NODE_VERSION: '20'
  PYTHON_VERSION: '3.11'
  DOCKER_BUILDKIT: 1

jobs:
  # =====================================================
  # 1️⃣ LINT 단계
  # =====================================================
  lint:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        service: [frontend, backend]
    name: Lint - ${{ matrix.service }}
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      # Frontend Lint
      - name: Setup Node.js
        if: matrix.service == 'frontend'
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'
          cache-dependency-path: 'frontend/package-lock.json'

      - name: Frontend - Install dependencies
        if: matrix.service == 'frontend'
        working-directory: ./frontend
        run: npm ci

      - name: Frontend - ESLint
        if: matrix.service == 'frontend'
        working-directory: ./frontend
        run: npm run lint --no-fix

      - name: Frontend - Prettier check
        if: matrix.service == 'frontend'
        working-directory: ./frontend
        run: npm run format:check

      - name: Frontend - TypeScript check
        if: matrix.service == 'frontend'
        working-directory: ./frontend
        run: npm run type-check

      # Backend Lint
      - name: Setup Python
        if: matrix.service == 'backend'
        uses: actions/setup-python@v4
        with:
          python-version: ${{ env.PYTHON_VERSION }}
          cache: 'pip'
          cache-dependency-path: 'backend/requirements*.txt'

      - name: Backend - Install dependencies
        if: matrix.service == 'backend'
        working-directory: ./backend
        run: |
          python -m pip install --upgrade pip
          pip install -r requirements-dev.txt

      - name: Backend - Ruff lint
        if: matrix.service == 'backend'
        working-directory: ./backend
        run: ruff check --select=E,W,F .

      - name: Backend - Black format check
        if: matrix.service == 'backend'
        working-directory: ./backend
        run: black --check .

      - name: Backend - Mypy type check
        if: matrix.service == 'backend'
        working-directory: ./backend
        run: mypy . --ignore-missing-imports

      # SonarQube 분석 (선택 사항)
      - name: SonarQube Scan
        uses: SonarSource/sonarcloud-github-action@master
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          SONAR_TOKEN: ${{ secrets.SONAR_TOKEN }}

  # =====================================================
  # 2️⃣ TEST 단계
  # =====================================================
  test:
    needs: lint
    runs-on: ubuntu-latest
    strategy:
      matrix:
        service: [frontend, backend]
    name: Test - ${{ matrix.service }}

    services:
      postgres:
        image: postgres:16-alpine
        env:
          POSTGRES_DB: helloworld_test
          POSTGRES_USER: test
          POSTGRES_PASSWORD: test_password
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
        ports:
          - 5432:5432

      redis:
        image: redis:7-alpine
        options: >-
          --health-cmd "redis-cli ping"
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
        ports:
          - 6379:6379

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      # Frontend Tests
      - name: Setup Node.js
        if: matrix.service == 'frontend'
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'
          cache-dependency-path: 'frontend/package-lock.json'

      - name: Frontend - Install dependencies
        if: matrix.service == 'frontend'
        working-directory: ./frontend
        run: npm ci

      - name: Frontend - Unit & Integration tests
        if: matrix.service == 'frontend'
        working-directory: ./frontend
        run: npm run test -- --coverage --watchAll=false

      - name: Frontend - E2E tests (Cypress)
        if: matrix.service == 'frontend'
        working-directory: ./frontend
        run: npm run test:e2e

      - name: Frontend - Upload coverage
        if: matrix.service == 'frontend'
        uses: codecov/codecov-action@v3
        with:
          files: ./frontend/coverage/coverage-final.json
          flags: frontend
          fail_ci_if_error: true

      # Backend Tests
      - name: Setup Python
        if: matrix.service == 'backend'
        uses: actions/setup-python@v4
        with:
          python-version: ${{ env.PYTHON_VERSION }}
          cache: 'pip'
          cache-dependency-path: 'backend/requirements*.txt'

      - name: Backend - Install dependencies
        if: matrix.service == 'backend'
        working-directory: ./backend
        run: |
          python -m pip install --upgrade pip
          pip install -r requirements-dev.txt

      - name: Backend - Run migrations
        if: matrix.service == 'backend'
        working-directory: ./backend
        env:
          DATABASE_URL: postgresql://test:test_password@localhost:5432/helloworld_test
          REDIS_URL: redis://localhost:6379/0
        run: python manage.py migrate

      - name: Backend - Pytest with coverage
        if: matrix.service == 'backend'
        working-directory: ./backend
        env:
          DATABASE_URL: postgresql://test:test_password@localhost:5432/helloworld_test
          REDIS_URL: redis://localhost:6379/0
        run: |
          pytest \
            --cov=. \
            --cov-report=xml \
            --cov-report=html \
            --cov-fail-under=80 \
            -v

      - name: Backend - Upload coverage
        if: matrix.service == 'backend'
        uses: codecov/codecov-action@v3
        with:
          files: ./backend/coverage.xml
          flags: backend
          fail_ci_if_error: true

      - name: Backend - Security scan (Bandit)
        if: matrix.service == 'backend'
        working-directory: ./backend
        run: bandit -r . -ll || true

  # =====================================================
  # 3️⃣ BUILD 단계
  # =====================================================
  build:
    needs: test
    runs-on: ubuntu-latest
    strategy:
      matrix:
        service: [frontend, backend, code-executor]
    name: Build - ${{ matrix.service }}
    permissions:
      contents: read
      packages: write

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      # Frontend Build
      - name: Setup Node.js
        if: matrix.service == 'frontend'
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'
          cache-dependency-path: 'frontend/package-lock.json'

      - name: Frontend - Install dependencies
        if: matrix.service == 'frontend'
        working-directory: ./frontend
        run: npm ci

      - name: Frontend - Build
        if: matrix.service == 'frontend'
        working-directory: ./frontend
        run: npm run build
        env:
          VITE_API_BASE_URL: ${{ secrets.VITE_API_BASE_URL }}
          VITE_PUBLIC_KEY: ${{ secrets.VITE_PUBLIC_KEY }}

      - name: Frontend - Generate SBOM
        if: matrix.service == 'frontend'
        uses: CycloneDX/cyclonedx-npm@v1
        with:
          input-file: frontend/package-lock.json
          output-file: frontend/sbom.xml

      # Backend Build
      - name: Setup Python
        if: matrix.service == 'backend'
        uses: actions/setup-python@v4
        with:
          python-version: ${{ env.PYTHON_VERSION }}

      - name: Backend - Install dependencies
        if: matrix.service == 'backend'
        working-directory: ./backend
        run: |
          python -m pip install --upgrade pip
          pip install -r requirements.txt

      - name: Backend - Generate SBOM
        if: matrix.service == 'backend'
        working-directory: ./backend
        run: pip install cyclonedx-bom && cyclonedx-py -o sbom.xml

      # Docker 빌드 및 푸시
      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v2

      - name: Log in to Container Registry
        uses: docker/login-action@v2
        with:
          registry: ${{ env.REGISTRY }}
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}

      - name: Extract metadata
        id: meta
        uses: docker/metadata-action@v4
        with:
          images: ${{ env.REGISTRY }}/${{ github.repository }}/${{ matrix.service }}
          tags: |
            type=ref,event=branch
            type=semver,pattern={{version}}
            type=semver,pattern={{major}}.{{minor}}
            type=sha

      - name: Build and push Docker image
        uses: docker/build-push-action@v4
        with:
          context: ./services/${{ matrix.service }}
          push: ${{ github.event_name == 'push' && github.ref == 'refs/heads/main' }}
          tags: ${{ steps.meta.outputs.tags }}
          labels: ${{ steps.meta.outputs.labels }}
          cache-from: type=gha
          cache-to: type=gha,mode=max
          build-args: |
            BUILD_DATE=$(date -u +'%Y-%m-%dT%H:%M:%SZ')
            VCS_REF=${{ github.sha }}
            VERSION=${{ steps.meta.outputs.version }}

      - name: Save artifact path
        run: |
          echo "artifact_path=${{ matrix.service }}" >> $GITHUB_OUTPUT
        id: artifact

  # =====================================================
  # 4️⃣ DEPLOY 단계
  # =====================================================
  deploy:
    needs: build
    runs-on: ubuntu-latest
    if: github.event_name == 'push' && github.ref == 'refs/heads/main'
    name: Deploy
    environment:
      name: production
      url: https://helloworld.example.com

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v4
        with:
          role-to-assume: arn:aws:iam::${{ secrets.AWS_ACCOUNT_ID }}:role/github-actions-role
          aws-region: ap-northeast-2

      # EKS 배포
      - name: Update kubeconfig
        run: |
          aws eks update-kubeconfig \
            --region ap-northeast-2 \
            --name helloworld-prod-eks

      - name: Install Helm
        uses: azure/setup-helm@v3
        with:
          version: '3.13.0'

      - name: Deploy with Helm
        working-directory: ./k8s
        run: |
          helm repo add helloworld-charts ${{ secrets.HELM_REPO_URL }}
          helm repo update
          
          helm upgrade --install helloworld-prod \
            helloworld-charts/helloworld \
            --namespace production \
            --create-namespace \
            --values values-prod.yaml \
            --values values-secrets.yaml \
            --set image.tag=${{ github.sha }} \
            --wait \
            --timeout 5m

      - name: Verify deployment
        run: |
          kubectl rollout status deployment/helloworld-api -n production --timeout=5m
          kubectl get pods -n production

      # 데이터베이스 마이그레이션
      - name: Run database migrations
        run: |
          kubectl run db-migrate \
            --image=${{ env.REGISTRY }}/${{ github.repository }}/backend:${{ github.sha }} \
            --rm -i \
            --restart=Never \
            -n production \
            -- python manage.py migrate --no-input

      # Health Check
      - name: Health check
        run: |
          for i in {1..30}; do
            RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" https://helloworld.example.com/health)
            if [ "$RESPONSE" = "200" ]; then
              echo "✅ Health check passed"
              exit 0
            fi
            echo "⏳ Waiting for service to be healthy... ($i/30)"
            sleep 10
          done
          echo "❌ Health check failed"
          exit 1

      # Smoke Tests
      - name: Smoke tests
        run: |
          npm install -g @playwright/test
          npx playwright test --config=e2e/playwright.config.prod.ts

      # 알림
      - name: Notify Slack - Success
        if: success()
        uses: slackapi/slack-github-action@v1.24.0
        with:
          webhook-url: ${{ secrets.SLACK_WEBHOOK }}
          payload: |
            {
              "text": "✅ Production deployment successful",
              "blocks": [
                {
                  "type": "section",
                  "text": {
                    "type": "mrkdwn",
                    "text": "*Production Deployment Successful*\n*Commit:* `${{ github.sha }}`\n*Author:* ${{ github.actor }}"
                  }
                }
              ]
            }

      - name: Notify Slack - Failure
        if: failure()
        uses: slackapi/slack-github-action@v1.24.0
        with:
          webhook-url: ${{ secrets.SLACK_WEBHOOK }}
          payload: |
            {
              "text": "❌ Production deployment failed",
              "blocks": [
                {
                  "type": "section",
                  "text": {
                    "type": "mrkdwn",
                    "text": "*Production Deployment Failed*\n*Commit:* `${{ github.sha }}`\n*Author:* ${{ github.actor }}\n<${{ github.server_url }}/${{ github.repository }}/actions/runs/${{ github.run_id }}|View Logs>"
                  }
                }
              ]
            }

      # 배포 후 모니터링
      - name: Configure monitoring alerts
        run: |
          aws cloudwatch put-metric-alarm \
            --alarm-name helloworld-prod-high-error-rate \
            --alarm-description "High error rate in production" \
            --metric-name ErrorRate \
            --namespace HelloWorld \
            --statistic Average \
            --period 300 \
            --threshold 5 \
            --comparison-operator GreaterThanThreshold
```

---

## 주요 특징

### 1. **병렬 처리**
```yaml
strategy:
  matrix:
    service: [frontend, backend]

### `infrastructure.md`

# 인프라 구성 문서
## Hello World 학습 플랫폼

**문서 번호**: ICD-2025-001  
**프로젝트**: Hello World 학습 플랫폼  
**작성자**: Infrastructure Team  
**작성일**: 2025년 1월  
**버전**: v1.0  
**상태**: Draft

---

## 목차

1. [클라우드 아키텍처 개요](#1-클라우드-아키텍처-개요)
2. [환경 구성](#2-환경-구성)
3. [스케일링 정책](#3-스케일링-정책)
4. [백업 및 재해복구 정책](#4-백업-및-재해복구-정책)
5. [네트워크 설계](#5-네트워크-설계)
6. [보안 설계](#6-보안-설계)
7. [모니터링 및 알림](#7-모니터링-및-알림)
8. [비용 최적화](#8-비용-최적화)
9. [운영 절차](#9-운영-절차)
10. [변경 이력](#10-변경-이력)

---

## 1. 클라우드 아키텍처 개요

### 1.1 핵심 설계 원칙

```
┌────────────────────────────────────────────────────────┐
│           인프라 설계 핵심 원칙                          │
├────────────────────────────────────────────────────────┤
│                                                        │
│  1. High Availability (99.9% 가용성)                  │
│     └─ 초보자 서비스 특성상 신뢰성 최우선              │
│                                                        │
│  2. Cost Optimization (초기 무료 운영)                │
│     └─ Vercel Free + AWS Free Tier 최대 활용          │
│                                                        │
│  3. Auto-Scaling (즉시 대응)                          │
│     └─ 트래픽 변동 → 자동 스케일 아웃/인              │
│                                                        │
│  4. Security by Default                               │
│     └─ 악의적 코드 실행 격리 + 데이터 암호화           │
│                                                        │
│  5. Disaster Recovery (RTO: 1시간, RPO: 30분)        │
│     └─ 자동화된 백업/복구 프로세스                     │
│                                                        │
│  6. Infrastructure as Code (IaC)                      │
│     └─ Terraform으로 완전 자동화 배포                 │
│                                                        │
└────────────────────────────────────────────────────────┘
```

### 1.2 전체 아키텍처 다이어그램

```
┌─────────────────────────────────────────────────────────────────┐
│                     Global Edge Network                          │
│                       (Vercel CDN)                               │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                    사용자 요청                            │   │
│  └─────────────────────┬───────────────────────────────────┘   │
└─────────────────────────┼──────────────────────────────────────┘
                          │
        ┌─────────────────┼─────────────────┐
        │                 │                 │
        ▼                 ▼                 ▼
    ┌──────────┐    ┌──────────┐    ┌──────────┐
    │ Vercel   │    │ Vercel   │    │ Vercel   │
    │ Edge     │    │ Edge     │    │ Edge     │
    │ (US)     │    │ (EU)     │    │ (ASIA)   │
    └────┬─────┘    └────┬─────┘    └────┬─────┘
         │                │              │
         └────────────────┼──────────────┘
                          │
        ┌─────────────────▼──────────────────┐
        │                                    │
    ┌───┴─────────────────────────────────┐ │
    │   Vercel Production                 │ │
    │  ┌──────────────────────────────┐   │ │
    │  │  Next.js App                 │   │ │
    │  │ (React + TypeScript)          │   │ │
    │  │                              │   │ │
    │  │  Pages:                      │   │ │
    │  │  - Dashboard                 │   │ │
    │  │  - Course Editor             │   │ │
    │  │  - Code Playground           │   │ │
    │  │  - User Profile              │   │ │
    │  │                              │   │ │
    │  │  API Routes (Edge):          │   │ │
    │  │  - /api/auth/*               │   │ │
    │  │  - /api/course/*             │   │ │
    │  │  - /api/progress/*           │   │ │
    │  └──────────────────────────────┘   │ │
    │                                    │ │
    │  ┌──────────────────────────────┐  │ │
    │  │  Environment Variables       │  │ │
    │  │  - AWS_ACCESS_KEY_ID         │  │ │
    │  │  - DATABASE_URL              │  │ │
    │  │  - NEXTAUTH_SECRET           │  │ │
    │  └──────────────────────────────┘  │ │
    └────────┬──────────────────────────┘ │
             │ (HTTPS)                    │
             │ Port 443                   │
             │                            │
    ┌────────▼──────────────────────────┐ │
    │   AWS VPC                         │ │
    │   (Region: us-east-1)             │ │
    │                                   │ │
    │  ┌─────────────────────────────┐  │ │
    │  │  Public Subnet (ALB)        │  │ │
    │  │  ┌─────────────────────┐    │  │ │
    │  │  │ Application Load    │    │  │ │
    │  │  │ Balancer (ALB)      │    │  │ │
    │  │  │ - SSL/TLS Term      │    │  │ │
    │  │  │ - Health Check      │    │  │ │
    │  │  └──────────┬──────────┘    │  │ │
    │  │             │               │  │ │
    │  └─────────────┼───────────────┘  │ │
    │                │                  │ │
    │  ┌─────────────▼───────────────┐  │ │
    │  │ Private Subnet A (AZ-1a)    │  │ │
    │  │ ┌─────────────────────────┐ │  │ │
    │  │ │  ECS Cluster            │ │  │ │
    │  │ │  (Fargate)              │ │  │ │
    │  │ │                         │ │  │ │
    │  │ │  Task Group 1:          │ │  │ │
    │  │ │  └─ Node.js/Express App │ │  │ │
    │  │ │     (Initial: 2 tasks)  │ │  │ │
    │  │ │                         │ │  │ │
    │  │ │  Task Group 2:          │ │  │ │
    │  │ │  └─ Code Executor       │ │  │ │
    │  │ │     (Sandboxed)         │ │  │ │
    │  │ │     (Initial: 1 task)   │ │  │ │
    │  │ │                         │ │  │ │
    │  │ │  Task Group 3:          │ │  │ │
    │  │ │  └─ Background Worker   │ │  │ │
    │  │ │     (Initial: 1 task)   │ │  │ │
    │  │ └─────────────────────────┘ │  │ │
    │  └─────────────────────────────┘  │ │
    │                                   │ │
    │  ┌─────────────────────────────┐  │ │
    │  │ Private Subnet B (AZ-1b)    │  │ │
    │  │ ┌─────────────────────────┐ │  │ │
    │  │ │  ECS Cluster            │ │  │ │
    │  │ │  (Fargate)              │ │  │ │
    │  │ │                         │ │  │ │
    │  │ │  Task Group 1:          │ │  │ │
    │  │ │  └─ Node.js/Express App │ │  │ │
    │  │ │     (Initial: 2 tasks)  │ │  │ │
    │  │ │                         │ │  │ │
    │  │ │  Task Group 2:          │ │  │ │
    │  │ │  └─ Code Executor       │ │  │ │
    │  │ │     (Initial: 1 task)   │ │  │ │
    │  │ │                         │ │  │ │
    │  │ │  Task Group 3:          │ │  │ │
    │  │ │  └─ Background Worker   │ │  │ │
    │  │ │     (Initial: 1 task)   │ │  │ │
    │  │ └─────────────────────────┘ │  │ │
    │  └─────────────────────────────┘  │ │
    │                                   │ │
    │  ┌─────────────────────────────┐  │ │
    │  │ Private Subnet (Databases)  │  │ │
    │  │                             │  │ │
    │  │ ┌───────────────────────┐   │  │ │
    │  │ │ RDS PostgreSQL        │   │  │ │
    │  │ │ (Multi-AZ)            │   │  │ │
    │  │ │                       │   │  │ │
    │  │ │ Primary + Standby     │   │  │ │
    │  │ │ (Automated Failover)  │   │  │ │
    │  │ └───────────────────────┘   │  │ │
    │  │                             │  │ │
    │  │ ┌───────────────────────┐   │  │ │
    │  │ │ ElastiCache Redis     │   │  │ │
    │  │ │ (Cache + Session)     │   │  │ │
    │  │ │                       │   │  │ │
    │  │ │ Multi-node Cluster    │   │  │ │
    │  │ │ (Replication)         │   │  │ │
    │  │ └───────────────────────┘   │  │ │
    │  │                             │  │ │
    │  │ ┌───────────────────────┐   │  │ │
    │  │ │ S3 (Media Storage)    │   │  │ │
    │  │ │                       │   │  │ │
    │  │ │ - User Avatars        │   │  │ │
    │  │ │ - Course Resources    │   │  │ │
    │  │ │ - Code Snapshots      │   │  │ │
    │  │ └───────────────────────┘   │  │ │
    │  └─────────────────────────────┘  │ │
    │                                   │ │
    │  ┌─────────────────────────────┐  │ │
    │  │ Monitoring & Logging        │  │ │
    │  │                             │  │ │
    │  │ - CloudWatch Logs           │  │ │
    │  │ - CloudWatch Metrics        │  │ │
    │  │ - X-Ray Tracing             │  │ │
    │  │ - SNS Alarms                │  │ │
    │  └─────────────────────────────┘  │ │
    │                                   │ │
    └───────────────────────────────────┘ │
                                          │
    ┌─────────────────────────────────────┘
    │
    ▼
┌─────────────────────────────────────────┐
│   AWS Data & Analytics Layer            │
│                                        │
│  ┌──────────────────────────────────┐  │
│  │ S3 (Data Lake)                   │  │
│  │ - Event Logs                     │  │
│  │ - Analytics Data                 │  │
│  │ - Backups                        │  │
│  └──────────────────────────────────┘  │
│                                        │
│  ┌──────────────────────────────────┐  │
│  │ EventBridge                      │  │
│  │ - Event Routing                  │  │
│  │ - Scheduled Tasks                │  │
│  └──────────────────────────────────┘  │
│                                        │
│  ┌──────────────────────────────────┐  │
│  │ SNS / SQS                        │  │
│  │ - Async Processing               │  │
│  │ - Notifications                  │  │
│  └──────────────────────────────────┘  │
│                                        │
└─────────────────────────────────────────┘
```

### 1.3 아키텍처 특성 매트릭스

| 특성 | 값 | 설명 |
|------|-----|------|
| **배포 모델** | Hybrid (Edge + Cloud) | Vercel (프론트엔드) + AWS (백엔드) |
| **가용성** | 99.9% (Multi-AZ) | 단일 리전, 다중 가용 영역 |
| **스케일링** | Auto (ECS + ALB) | CPU/메모리 기반 자동 스케일링 |
| **복제 전략** | Active-Active | 다중 AZ 분산 배치 |
| **데이터 일관성** | Strong (RDS) | 트랜잭션 기반 일관성 |
| **캐시 전략** | Multi-Layer | Redis (세션) + CloudFront (정적) |
| **코드 실행** | Isolated Container | Fargate 기반 격리 환경 |

---

## 2. 환경 구성

### 2.1 환경 정의

```
┌──────────────────────────────────────────────────────────────┐
│                    Multi-Environment Strategy                

### `monitoring.md`

# 모니터링 설정 작성서

**문서 번호**: MON-2025-001  
**프로젝트**: Hello World 학습 플랫폼  
**작성자**: DevOps/Observability Lead  
**작성일**: 2025년 1월  
**버전**: v1.0  
**상태**: Draft

---

## 목차

1. [모니터링 전략](#1-모니터링-전략)
2. [LangSmith 설정](#2-langsmith-설정)
3. [Sentry 설정](#3-sentry-설정)
4. [헬스체크 설정](#4-헬스체크-설정)
5. [알림 규칙](#5-알림-규칙)
6. [대시보드 구성](#6-대시보드-구성)
7. [SLA & 메트릭](#7-sla--메트릭)

---

## 1. 모니터링 전략

### 1.1 관측성 3기둥 (Three Pillars of Observability)

```
┌────────────────────────────────────────────────────────────┐
│              Observability Architecture                     │
├────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Metrics    │  │     Logs     │  │    Traces    │      │
│  │  (LangSmith) │  │   (Sentry)   │  │  (Sentry)    │      │
│  │   + DataDog  │  │  + ELK Stack │  │  + Jaeger    │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│        │                  │                  │               │
│        └──────────────────┼──────────────────┘               │
│                           ▼                                  │
│                    Alert Manager                            │
│              (Slack, Email, PagerDuty)                      │
│                                                              │
└────────────────────────────────────────────────────────────┘
```

### 1.2 도구별 역할 분담

| 도구 | 목적 | 대상 | 우선순위 |
|------|------|------|---------|
| **LangSmith** | AI/LLM 체인 모니터링 | 코드 실행 추론, 프롬프트 성능 | 🔴 Critical |
| **Sentry** | 애플리케이션 에러 추적 | 모든 Exception, 에러율 | 🔴 Critical |
| **헬스체크** | 서비스 가용성 확인 | 엔드포인트 상태 | 🟠 High |
| **DataDog** | APM + 메트릭 수집 | 성능, 인프라 | 🟠 High |
| **ELK Stack** | 로그 집계 & 검색 | 구조화된 로그 분석 | 🟡 Medium |

---

## 2. LangSmith 설정

### 2.1 LangSmith 기본 구성

```yaml
# langsmith-config.yaml
langsmith:
  api_key: ${LANGSMITH_API_KEY}
  project_name: "hello-world-prod"
  environment: "production"
  
  # 샘플링 설정 (비용 최적화)
  sampling:
    trace_sample_rate: 0.3  # 30% 샘플링 (에러는 100%)
    error_sampling_rate: 1.0  # 에러는 모두 기록
    
  # 필터링 설정
  filters:
    exclude_paths:
      - "/health"
      - "/metrics"
    min_duration_ms: 100  # 100ms 이상만 기록
    
  # 보존 정책
  retention:
    days: 30
    max_traces_per_project: 100000
```

### 2.2 LangSmith 계측 코드 (FastAPI)

```python
# app/instrumentation/langsmith_config.py
from langsmith import Client
from langchain.callbacks import LangChainTracer
from functools import wraps
import logging
import time
from datetime import datetime
import os

logger = logging.getLogger(__name__)

class LangSmithMonitor:
    """LangSmith 모니터링 래퍼"""
    
    def __init__(self):
        self.client = Client(
            api_key=os.getenv("LANGSMITH_API_KEY"),
            endpoint=os.getenv("LANGSMITH_ENDPOINT", "https://api.smith.langchain.com")
        )
        self.project_name = os.getenv("LANGSMITH_PROJECT", "hello-world-prod")
    
    def trace_execution(self, chain_type: str, metadata: dict = None):
        """코드 실행 체인 추적 데코레이터"""
        def decorator(func):
            @wraps(func)
            async def async_wrapper(*args, **kwargs):
                # LangSmith 런 생성
                run_name = f"{chain_type}_{func.__name__}_{int(time.time())}"
                
                with self.client.trace(
                    name=run_name,
                    run_type="chain",
                    tags=[chain_type, "async"],
                    metadata={
                        "function": func.__name__,
                        "timestamp": datetime.utcnow().isoformat(),
                        **(metadata or {})
                    }
                ) as run:
                    try:
                        start_time = time.time()
                        result = await func(*args, **kwargs)
                        duration = time.time() - start_time
                        
                        # 성공 메트릭
                        run.end(
                            outputs={"result": result},
                            tags=["success"]
                        )
                        
                        logger.info(
                            f"Chain execution successful",
                            extra={
                                "chain_type": chain_type,
                                "duration_ms": duration * 1000,
                                "run_id": run.id
                            }
                        )
                        
                        return result
                        
                    except Exception as e:
                        # 에러 메트릭
                        run.end(
                            error=str(e),
                            tags=["error"]
                        )
                        
                        logger.error(
                            f"Chain execution failed: {str(e)}",
                            extra={
                                "chain_type": chain_type,
                                "error": str(e),
                                "run_id": run.id
                            }
                        )
                        raise
            
            def sync_wrapper(*args, **kwargs):
                run_name = f"{chain_type}_{func.__name__}_{int(time.time())}"
                
                with self.client.trace(
                    name=run_name,
                    run_type="chain",
                    tags=[chain_type, "sync"]
                ) as run:
                    try:
                        start_time = time.time()
                        result = func(*args, **kwargs)
                        duration = time.time() - start_time
                        
                        run.end(outputs={"result": result})
                        return result
                        
                    except Exception as e:
                        run.end(error=str(e))
                        raise
            
            return async_wrapper if "async" in func.__code__.co_names else sync_wrapper
        
        return decorator
    
    def trace_llm_call(self, model_name: str, metadata: dict = None):
        """LLM API 호출 추적"""
        def decorator(func):
            @wraps(func)
            async def async_wrapper(*args, **kwargs):
                with self.client.trace(
                    name=f"llm_{model_name}",
                    run_type="llm",
                    tags=[model_name]
                ) as run:
                    try:
                        start_time = time.time()
                        result = await func(*args, **kwargs)
                        duration = time.time() - start_time
                        
                        # 토큰 사용량 메트릭
                        if hasattr(result, 'usage'):
                            run.end(
                                outputs={
                                    "tokens_used": result.usage.total_tokens,
                                    "input_tokens": result.usage.prompt_tokens,
                                    "output_tokens": result.usage.completion_tokens
                                },
                                tags=["success"]
                            )
                        else:
                            run.end(outputs={"result": result})
                        
                        return result
                        
                    except Exception as e:
                        run.end(error=str(e))
                        raise
            
            return async_wrapper
        
        return decorator


# FastAPI 미들웨어 통합
from fastapi import Request, Response
from starlette.middleware.base import BaseHTTPMiddleware

class LangSmithMiddleware(BaseHTTPMiddleware):
    """전역 LangSmith 추적 미들웨어"""
    
    def __init__(self, app, langsmith_monitor: LangSmithMonitor):
        super().__init__(app)
        self.monitor = langsmith_monitor
    
    async def dispatch(self, request: Request, call_next) -> Response:
        # 헬스체크/메트릭 엔드포인트는 추적 제외
        if request.url.path in ["/health", "/metrics", "/docs"]:
            return await call_next(request)
        
        with self.monitor.client.trace(
            name=f"{request.method} {request.url.path}",
            run_type="chain",
            tags=[request.method],
            metadata={
                "method": request.method,
                "path": request.url.path,
                "client_ip": request.client.host if request.client else None
            }
        ) as run:
            try:
                start_time = time.time()
                response = await call_next(request)
                duration = time.time() - start_time
                
                run.end(
                    outputs={"status_code": response.status_code},
                    tags=[f"status_{response.status_code}"]
                )
                
                return response
                
            except Exception as e:
                run.end(error=str(e))
                raise
```

### 2.3 LangSmith 대시보드 쿼리

```python
# app/monitoring/langsmith_queries.py
from langsmith import Client
from datetime import datetime, timedelta

class LangSmithQueries:
    """LangSmith 데이터 조회"""
    
    def __init__(self):
        self.client = Client()
    
    def get_execution_metrics(self, hours: int = 24) -> dict:
        """코드 실행 성능 메트릭"""
        start_time = datetime.utcnow() - timedelta(hours=hours)
        
        runs = self.client.list_runs(
            project_name="hello-world-prod",
            filter=f'gt(start_time, "{start_time.isoformat()}")',
            run_type="chain"
        )
        
        executions = list(runs)
        
        if not executions:
            return {
                "total_executions": 0,
                "avg_duration_ms": 0,
                "success_rate": 0,
                "error_count": 0
            }
        
        total = len(executions)
        successes = sum(1 for r in executions if r.end_time and not r.error)
        errors = total - successes
        
        durations = [
            (r.end_time - r.start_time).total_seconds() * 1000 
            for r in executions if r.end_time
        ]
        
        return {
            "total_executions": total,
            "success_executions": successes,
            "error_count": errors,
            "success_rate": (successes / total * 100) if total > 0 else 0,
            "avg_duration_ms": sum(durations) / len(durations) if durations else 0,
            "p95_duration_ms": sorted(durations)[int(len(durations) * 0.95)] if durations else 0,
            "p99_duration_ms": sorted(durations)[int(len(durations) * 0.99)] if durations else 0
        }
    
    def get_llm_metrics(self, hours: int = 24) -> dict:
        """LLM 호출 성능 메트릭"""
        start_time = datetime.utcnow() - timedelta(hours=hours)
        
        runs = self.client.list_runs(
            project_name="hello-world-prod",
            filter=f'and(eq(run_type, "llm"), gt(start_time, "{start_time.isoformat()}"))'
        )
        
        llm_runs = list(runs)
        
        if not llm_runs:
            return {
                "total_llm_calls": 0,
                "total_tokens": 0,
                "avg_tokens_per_call": 0
            }
        
        total_tokens = sum(
            (r.outputs.get("tokens_used", 0) if r.outputs else 0)
            for r in llm_runs
        )
        
        return {
            "total_llm_calls": len(llm_runs),
            "total_tokens": total_tokens,
            "avg_tokens_per_call": total_tokens / len(llm_runs) if llm_runs else 0,
            "input_tokens": sum(
                (r.outputs.get("input_tokens", 0) if r.outputs else 0)
                for r in llm_runs
            ),
            "output_tokens": sum(
                (r.outputs.get("output_tokens", 0) if r.outputs else 0)
                for r in llm_runs
            )
        }
    
    def get_error_summary(self, hours: int = 24) -> list:
        """최근 에러 요약"""
        start_time = datetime.utcnow() - timedelta(hours=hours)
        
        runs = self.client.list_runs(
            project_name="hello-world-prod",
            filter=f'and(isNotNull(error), gt(start_time, "{start_time.isoformat()}"))'
        )
        
        errors = list(runs)
        
        error_groups = {}
        for error in errors:
            key = error.error[:100]  # 처음 100자로 그룹핑
            if key not in error_groups:
                error_groups[key] = {
                    "error_message": error.error,
                    "count": 0,
                    "first_seen": error.start_time,
                    "last_seen": error.start_time,
                    "run_ids": []
                }
            error_groups[key]["count"] += 1
            error_groups[key]["last_seen"] = max(error_groups[key]["last_seen"], error.start_time)
            error_groups[key]["run_ids"].append(str(error.id))
        
        return sorted(
            error_groups.values(),
            key=lambda x: x["count"],
            reverse=True
        )[:10]
```

---

## 3. Sentry 설정

### 3.1 Sentry 초기 설정

```yaml
# sentry-config.yaml

---
