#!/usr/bin/env bash
# AgileFlow — 전체 서비스 종료 스크립트

ROOT="$(cd "$(dirname "$0")/.." && pwd)"

echo "[AgileFlow] 서비스 종료 중..."

# Node 프로세스 종료 (API, Web)
pkill -f "node.*server.js" 2>/dev/null && echo "[OK] API 서버 종료" || true
pkill -f "vite"            2>/dev/null && echo "[OK] 웹 서버 종료" || true

# Docker 인프라 종료
cd "$ROOT"
docker compose down
echo "[OK] Docker 인프라 종료"
echo "[AgileFlow] 모든 서비스가 종료되었습니다."
