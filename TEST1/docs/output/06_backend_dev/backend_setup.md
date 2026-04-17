# 백엔드 설정 가이드 — AgileFlow

## 초기 설정
```bash
mkdir api && cd api
npm init -y
npm install fastify @fastify/cors @fastify/jwt @fastify/cookie
npm install @prisma/client zod bullmq ioredis axios archiver
npm install -D prisma nodemon
```

## docker-compose.yml
```yaml
services:
  postgres:
    image: postgres:16-alpine
    ports: ["5432:5432"]
    environment:
      POSTGRES_DB: agileflow
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
    volumes: [pgdata:/var/lib/postgresql/data]

  redis:
    image: redis:7-alpine
    ports: ["6379:6379"]

  pipeline:
    build: ./apps/pipeline
    ports: ["8000:8000"]
    environment:
      ANTHROPIC_API_KEY: ${ANTHROPIC_API_KEY}
      LANGCHAIN_API_KEY: ${LANGCHAIN_API_KEY}
    volumes: [./output:/app/output]

volumes:
  pgdata:
```

## 환경 변수 (.env)
```
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/agileflow
REDIS_URL=redis://localhost:6379
JWT_SECRET=your-jwt-secret
PIPELINE_URL=http://localhost:8000
WEB_ORIGIN=http://localhost:5173
ANTHROPIC_API_KEY=sk-ant-...
LANGCHAIN_API_KEY=ls__...
```
