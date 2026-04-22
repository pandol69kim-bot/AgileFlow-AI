#!/usr/bin/env bash
# AgileFlow — 전체 서비스 시작 스크립트

set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
LOG_DIR="$ROOT/scripts/logs"
mkdir -p "$LOG_DIR"

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m'

log()  { echo -e "${CYAN}[AgileFlow]${NC} $*"; }
ok()   { echo -e "${GREEN}[OK]${NC} $*"; }
warn() { echo -e "${YELLOW}[WARN]${NC} $*"; }
err()  { echo -e "${RED}[ERR]${NC} $*"; }

# ── PID 추적 (종료 시 정리) ─────────────────────────────────────
PIDS=()
cleanup() {
  echo ""
  log "서비스 종료 중..."
  for pid in "${PIDS[@]}"; do
    kill "$pid" 2>/dev/null && ok "PID $pid 종료" || true
  done
  log "완료. Ctrl+C로 종료되었습니다."
}
trap cleanup EXIT INT TERM

# ── 1. 환경 변수 확인 ───────────────────────────────────────────
if [[ ! -f "$ROOT/.env" ]]; then
  warn ".env 파일이 없습니다. .env.example 복사 후 계속합니다."
  cp "$ROOT/.env.example" "$ROOT/.env"
  warn "⚠  .env 파일을 열어 API 키를 입력하세요: $ROOT/.env"
fi

# ── 2. Docker 인프라 시작 (postgres + redis + pipeline) ─────────
log "Docker 인프라 시작 중 (postgres, redis, pipeline)..."
cd "$ROOT"
docker compose up -d --remove-orphans

# postgres 헬스체크 대기
log "PostgreSQL 준비 대기 중..."
for i in $(seq 1 30); do
  if docker compose exec -T postgres pg_isready -U postgres -q 2>/dev/null; then
    ok "PostgreSQL 준비 완료"
    break
  fi
  [[ $i -eq 30 ]] && { err "PostgreSQL 시작 타임아웃"; exit 1; }
  sleep 2
done

# redis 헬스체크 대기
log "Redis 준비 대기 중..."
for i in $(seq 1 15); do
  if docker compose exec -T redis redis-cli ping 2>/dev/null | grep -q PONG; then
    ok "Redis 준비 완료"
    break
  fi
  [[ $i -eq 15 ]] && { err "Redis 시작 타임아웃"; exit 1; }
  sleep 2
done

# ── 3. DB 마이그레이션 ──────────────────────────────────────────
API_DIR="$ROOT/apps/api"
log "DB 마이그레이션 확인 중..."
cd "$API_DIR"
if [[ ! -d "node_modules" ]]; then
  log "API 패키지 설치 중..."
  npm install --silent
fi
npx prisma migrate deploy 2>&1 | tail -3
ok "DB 마이그레이션 완료"

# ── 4. API 서버 시작 ────────────────────────────────────────────
log "API 서버 시작 중 (포트 3001)..."
cd "$API_DIR"
npm run dev > "$LOG_DIR/api.log" 2>&1 &
PIDS+=($!)
ok "API 서버 PID: ${PIDS[-1]}  →  로그: scripts/logs/api.log"

# API 준비 대기 (최대 20초)
log "API 준비 대기 중..."
for i in $(seq 1 20); do
  if curl -sf http://localhost:3001/health > /dev/null 2>&1; then
    ok "API 서버 준비 완료"
    break
  fi
  [[ $i -eq 20 ]] && warn "API 응답 없음 — 백그라운드에서 계속 시작 중일 수 있습니다"
  sleep 1
done

# ── 5. 웹 서버 시작 ─────────────────────────────────────────────
WEB_DIR="$ROOT/apps/web"
log "웹 서버 시작 중 (포트 5173)..."
cd "$WEB_DIR"
if [[ ! -d "node_modules" ]]; then
  log "Web 패키지 설치 중..."
  npm install --silent
fi
npm run dev > "$LOG_DIR/web.log" 2>&1 &
PIDS+=($!)
ok "웹 서버 PID: ${PIDS[-1]}  →  로그: scripts/logs/web.log"

# ── 완료 메시지 ─────────────────────────────────────────────────
echo ""
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}  AgileFlow 서비스 시작 완료${NC}"
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "  🌐 Web       →  http://localhost:5173"
echo -e "  🔌 API       →  http://localhost:3001"
echo -e "  🤖 Pipeline  →  http://localhost:8000"
echo -e "  🗄  DB        →  localhost:5432"
echo -e "  📋 Swagger   →  http://localhost:3001/docs"
echo ""
echo -e "  로그 실시간 보기:"
echo -e "  ${CYAN}tail -f scripts/logs/api.log${NC}"
echo -e "  ${CYAN}tail -f scripts/logs/web.log${NC}"
echo -e "  ${CYAN}docker compose logs -f pipeline${NC}"
echo ""
echo -e "  종료: ${YELLOW}Ctrl+C${NC}"
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

# 프로세스 유지 (Ctrl+C 전까지)
wait
