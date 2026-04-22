@echo off
chcp 65001 > nul
setlocal EnableDelayedExpansion

set ROOT=%~dp0..
set LOG_DIR=%ROOT%\scripts\logs
if not exist "%LOG_DIR%" mkdir "%LOG_DIR%"

echo.
echo [AgileFlow] 서비스 시작 중...
echo.

:: 1. .env 확인
if not exist "%ROOT%\.env" (
    echo [WARN] .env 없음 — .env.example 복사
    copy "%ROOT%\.env.example" "%ROOT%\.env" > nul
    echo [WARN] .env 파일에 API 키를 입력하세요: %ROOT%\.env
)

:: 2. Docker 인프라 시작
echo [1/4] Docker 인프라 시작 중 (postgres + redis + pipeline)...
cd /d "%ROOT%"
docker compose up -d --remove-orphans
if errorlevel 1 ( echo [ERR] Docker 시작 실패 & pause & exit /b 1 )

:: PostgreSQL 대기
echo [1/4] PostgreSQL 준비 대기 중...
:wait_pg
docker compose exec -T postgres pg_isready -U postgres -q > nul 2>&1
if errorlevel 1 ( timeout /t 2 /nobreak > nul & goto wait_pg )
echo [OK] PostgreSQL 준비 완료

:: Redis 대기
echo [1/4] Redis 준비 대기 중...
:wait_redis
docker compose exec -T redis redis-cli ping 2> nul | findstr PONG > nul
if errorlevel 1 ( timeout /t 2 /nobreak > nul & goto wait_redis )
echo [OK] Redis 준비 완료

:: 3. DB 마이그레이션
echo [2/4] DB 마이그레이션 중...
cd /d "%ROOT%\apps\api"
if not exist "node_modules" ( echo 패키지 설치 중... & npm install --silent )
npx prisma migrate deploy
echo [OK] DB 마이그레이션 완료

:: 4. API 서버 (새 창)
echo [3/4] API 서버 시작 중 (포트 3001)...
start "AgileFlow - API" cmd /k "cd /d "%ROOT%\apps\api" && npm run dev"

:: API 준비 대기
timeout /t 5 /nobreak > nul

:: 5. 웹 서버 (새 창)
echo [4/4] 웹 서버 시작 중 (포트 5173)...
if not exist "%ROOT%\apps\web\node_modules" (
    echo 패키지 설치 중...
    cd /d "%ROOT%\apps\web" && npm install --silent
)
start "AgileFlow - Web" cmd /k "cd /d "%ROOT%\apps\web" && npm run dev"

:: 완료
echo.
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo   AgileFlow 서비스 시작 완료
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo   Web       -^>  http://localhost:5173
echo   API       -^>  http://localhost:3001
echo   Pipeline  -^>  http://localhost:8000
echo   Swagger   -^>  http://localhost:3001/docs
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo.
pause
