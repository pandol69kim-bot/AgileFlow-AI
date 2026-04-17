# CI/CD 파이프라인 — AgileFlow

## .github/workflows/ci.yml
```yaml
name: CI
on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  lint-and-type-check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 22 }
      - run: npm ci
      - run: npm run lint
      - run: cd apps/pipeline && pip install -r requirements.txt && python -m pytest --co -q

  test-backend:
    runs-on: ubuntu-latest
    needs: lint-and-type-check
    services:
      postgres:
        image: postgres:16-alpine
        env: { POSTGRES_DB: testdb, POSTGRES_USER: test, POSTGRES_PASSWORD: test }
        ports: ["5432:5432"]
      redis:
        image: redis:7-alpine
        ports: ["6379:6379"]
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci
      - run: cd apps/api && npx prisma migrate deploy
        env: { DATABASE_URL: postgresql://test:test@localhost:5432/testdb }
      - run: npm run test:api -- --coverage

  test-pipeline:
    runs-on: ubuntu-latest
    needs: lint-and-type-check
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with: { python-version: '3.12' }
      - run: cd apps/pipeline && pip install -r requirements.txt && pytest --cov=agents

  e2e:
    runs-on: ubuntu-latest
    needs: [test-backend, test-pipeline]
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci && npx playwright install --with-deps
      - run: npm run e2e

  deploy-production:
    if: github.ref == 'refs/heads/main'
    needs: e2e
    runs-on: ubuntu-latest
    environment: production
    steps:
      - name: Deploy Frontend to Vercel
        run: npx vercel --prod --token ${{ secrets.VERCEL_TOKEN }}
      - name: Deploy API to AWS ECS
        run: aws ecs update-service --cluster agileflow --service api --force-new-deployment
```
