# Docker 설정 — AgileFlow

## apps/api/Dockerfile (Node.js 백엔드)
```dockerfile
FROM node:22-alpine AS base
WORKDIR /app

FROM base AS deps
COPY package*.json ./
RUN npm ci --only=production

FROM base AS build
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM deps AS production
COPY --from=build /app/dist ./dist
COPY --from=build /app/prisma ./prisma
RUN npx prisma generate
EXPOSE 3001
CMD ["node", "dist/server.js"]
```

## apps/pipeline/Dockerfile (Python LangGraph)
```dockerfile
FROM python:3.12-slim AS base
WORKDIR /app
RUN apt-get update && apt-get install -y docker.io && rm -rf /var/lib/apt/lists/*

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY . .
EXPOSE 8000
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

## docker-compose.prod.yml
```yaml
services:
  web:
    image: agileflow/web:latest
    # Vercel 배포 → 별도 컨테이너 불필요

  api:
    image: agileflow/api:latest
    ports: ["3001:3001"]
    env_file: .env.production
    depends_on: [postgres, redis]

  pipeline:
    image: agileflow/pipeline:latest
    ports: ["8000:8000"]
    env_file: .env.production
    volumes: [/var/run/docker.sock:/var/run/docker.sock]  # Docker-in-Docker for sandbox
    depends_on: [redis]

  postgres:
    image: postgres:16-alpine
    volumes: [pgdata:/var/lib/postgresql/data]
    env_file: .env.production

  redis:
    image: redis:7-alpine

volumes:
  pgdata:
```
