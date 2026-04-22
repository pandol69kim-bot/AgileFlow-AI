# AgileFlow

자연어 아이디어 하나로 기획·설계·개발·테스트·배포까지 자율 수행하는 AI 에이전트 소프트웨어 팀 플랫폼.

## 구조

```
apps/
  web/       → Vite + React (프론트엔드)
  api/       → Node.js + Fastify (백엔드 API)
  pipeline/  → Python + LangGraph (AI 파이프라인)
packages/
  shared/    → 공유 타입/상수
```

## 빠른 시작

### 1. 환경 변수 설정
```bash
cp .env.example .env
# .env 에서 사용할 AI 공급자의 키를 입력
# Claude: ANTHROPIC_API_KEY
# OpenAI: OPENAI_API_KEY
# Gemini: GOOGLE_API_KEY
# 공통 추적용: LANGCHAIN_API_KEY
```

### 2. 인프라 실행
```bash
docker compose up -d postgres redis pipeline
```

### 3. 백엔드 실행
```bash
cd apps/api
npm install
npx prisma migrate dev
npm run db:seed
npm run dev
```

### 4. 프론트엔드 실행
```bash
cd apps/web
npm install
npm run dev
```

브라우저에서 http://localhost:5173 열기

## 에이전트 파이프라인

```
아이디어 입력
  → 01 아이디어 분석
  → 02 기획서 작성
  → 03 디자인 + 04 아키텍처  (병렬)
  → 05 프론트엔드 + 06 백엔드 (병렬)
  → 07 테스트
  → 08 배포 인프라
  → 09 최종 리포트
```

## 기술 스택

| 레이어 | 기술 |
|--------|------|
| AI 파이프라인 | LangGraph + Claude (Anthropic) |
| 프론트엔드 | Vite + React + Tailwind CSS |
| 백엔드 API | Node.js + Fastify + Prisma |
| 데이터베이스 | PostgreSQL + Redis |
| 작업 큐 | BullMQ |
| 트레이싱 | LangSmith |

## 선택 가능한 파이프라인 AI

- Claude: Anthropic Claude Sonnet 4.6 + Haiku 4.5
- GPT-4.1: OpenAI GPT-4.1 + GPT-4.1 mini
- Gemini 2.5: Google Gemini 2.5 Pro + Flash

파이프라인 시작 화면에서 AI를 선택할 수 있고, 실패 후 스텝 재실행 시에도 동일한 AI 설정이 유지됩니다.
