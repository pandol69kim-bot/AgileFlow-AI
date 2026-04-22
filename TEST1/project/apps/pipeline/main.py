from dotenv import load_dotenv
load_dotenv()

from fastapi import FastAPI, HTTPException
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from langchain_core.messages import HumanMessage
from duckduckgo_search import DDGS
import json
import asyncio

from orchestrator import run_pipeline, EMPTY_STATE
from agents.base import get_fast_llm, invoke_with_retry, set_current_ai_profile, validate_ai_profile
from agents.idea_analyst import run_idea_analyst
from agents.planner import run_planner
from agents.designer import run_designer
from agents.architect import run_architect
from agents.frontend_dev import run_frontend_dev
from agents.backend_dev import run_backend_dev
from agents.tester import run_tester
from agents.deployer import run_deployer
from agents.project_manager import run_project_manager

app = FastAPI(title="AgileFlow Pipeline Server")


class RunRequest(BaseModel):
    project_id: str
    idea_input: str
    ai_profile: str = "claude"


class RetryRequest(BaseModel):
    project_id: str
    idea_input: str
    ai_profile: str = "claude"
    initial_state: dict = {}


class StepRequest(BaseModel):
    project_id: str
    idea_input: str
    ai_profile: str = "claude"
    until_step: int  # 1~7 중 실행할 마지막 단계


STEP_RUNNERS = {
    1: lambda s: run_idea_analyst(s),
    2: lambda s: run_planner(s),
    3: lambda s: _run_parallel(run_designer, run_architect, s),
    4: lambda s: _run_parallel(run_frontend_dev, run_backend_dev, s),
    5: lambda s: run_tester(s),
    6: lambda s: run_deployer(s),
    7: lambda s: run_project_manager(s),
}

STEP_NAMES = {
    1: "01_idea_analyst",
    2: "02_planner",
    3: "03_designer+04_architect",
    4: "05_frontend+06_backend",
    5: "07_tester",
    6: "08_deployer",
    7: "09_project_manager",
}


async def _run_parallel(fn_a, fn_b, state: dict) -> dict:
    a, b = await asyncio.gather(fn_a(state), fn_b(state))
    return {**state, **a, **b}


@app.get("/health")
async def health():
    return {"status": "ok"}


@app.get("/providers/{ai_profile}/health")
async def provider_health(ai_profile: str):
    try:
        validated = validate_ai_profile(ai_profile)
        set_current_ai_profile(validated)
        get_fast_llm(validated)
        return {"ai_profile": validated, "available": True, "reason": None}
    except Exception as exc:
        raise HTTPException(status_code=503, detail=str(exc))


def _search_error(query: str, max_results: int = 5) -> list[dict]:
    try:
        with DDGS() as ddgs:
            return list(ddgs.text(query, max_results=max_results))
    except Exception:
        return []


async def generate_failure_solution(error_message: str, idea_input: str = "", ai_profile: str = "claude") -> str:
    # 오류 메시지에서 핵심 키워드 추출 (첫 200자, 줄바꿈 제거)
    search_query = error_message.replace("\n", " ").strip()[:200]
    search_query = f"{search_query} solution fix"

    search_results = await asyncio.to_thread(_search_error, search_query)

    snippets = "\n".join(
        f"[{i+1}] {r.get('title','')}\n{r.get('body','')}"
        for i, r in enumerate(search_results)
        if r.get("body")
    ) or "(검색 결과 없음)"

    set_current_ai_profile(validate_ai_profile(ai_profile))
    llm = get_fast_llm(ai_profile)
    prompt = f"""AgileFlow 파이프라인 실행 중 오류가 발생했습니다.
아래 오류 내용과 웹 검색 결과를 바탕으로 해결책을 한국어로 요약해주세요.

아이디어 입력: {idea_input or '(없음)'}

오류 내용:
{error_message[:1000]}

웹 검색 결과:
{snippets}

다음 형식으로 응답하세요:

## 오류 원인
(원인 1~2문장)

## 해결 방법
1. ...
2. ...

## 참고 정보
(검색 결과에서 유용한 내용 요약)"""

    response = await invoke_with_retry(llm, [HumanMessage(content=prompt)])
    return response.content


@app.post("/run")
async def run(req: RunRequest):
    """전체 파이프라인 NDJSON 스트리밍 실행"""
    async def event_stream():
        ai_profile = validate_ai_profile(req.ai_profile)
        set_current_ai_profile(ai_profile)
        error_message = None
        try:
            async for event in run_pipeline(req.project_id, req.idea_input, ai_profile=ai_profile):
                if event.get("status") == "failed":
                    error_message = event.get("error", "알 수 없는 오류")
                yield json.dumps(event) + "\n"
        except Exception as e:
            error_message = str(e)
            yield json.dumps({"agent": "pipeline", "status": "failed", "error": error_message}) + "\n"
        if error_message:
            try:
                solution = await generate_failure_solution(error_message, req.idea_input, ai_profile=ai_profile)
                yield json.dumps({"agent": "pipeline", "status": "solution", "content": solution}) + "\n"
            except Exception:
                pass

    return StreamingResponse(event_stream(), media_type="application/x-ndjson")


@app.post("/run/from/{step}")
async def run_from_step(step: int, req: RetryRequest):
    """start_step부터 파이프라인 재실행 — 기존 state를 body로 주입받아 스트리밍"""
    if step < 1 or step > 7:
        raise HTTPException(status_code=400, detail="step은 1~7 사이여야 합니다.")

    async def event_stream():
        ai_profile = validate_ai_profile(req.ai_profile)
        set_current_ai_profile(ai_profile)
        error_message = None
        try:
            async for event in run_pipeline(
                req.project_id, req.idea_input,
                ai_profile=ai_profile,
                start_step=step, initial_state=req.initial_state or None
            ):
                if event.get("status") == "failed":
                    error_message = event.get("error", "알 수 없는 오류")
                yield json.dumps(event) + "\n"
        except Exception as e:
            error_message = str(e)
            yield json.dumps({"agent": "pipeline", "status": "failed", "error": error_message}) + "\n"
        if error_message:
            try:
                solution = await generate_failure_solution(error_message, req.idea_input, ai_profile=ai_profile)
                yield json.dumps({"agent": "pipeline", "status": "solution", "content": solution}) + "\n"
            except Exception:
                pass

    return StreamingResponse(event_stream(), media_type="application/x-ndjson")


@app.post("/run/until/{step}")
async def run_until(step: int, req: RunRequest):
    """step 번호까지만 실행하고 state 반환 (1~7)"""
    if step < 1 or step > 7:
        raise HTTPException(status_code=400, detail="step은 1~7 사이여야 합니다.")

    ai_profile = validate_ai_profile(req.ai_profile)
    set_current_ai_profile(ai_profile)
    state = {**EMPTY_STATE, "project_id": req.project_id, "idea_input": req.idea_input, "ai_profile": ai_profile}
    results = []

    for s in range(1, step + 1):
        runner = STEP_RUNNERS[s]
        state = await runner(state)
        results.append({"step": s, "name": STEP_NAMES[s], "status": "completed"})

    return {
        "completed_steps": results,
        "current_step": state["current_step"],
        "state_snapshot": {
            k: (v[:500] + "..." if isinstance(v, str) and len(v) > 500 else v)
            for k, v in state.items()
            if k not in ("project_id",)
        },
    }


@app.post("/run/step/{step}")
async def run_single_step(step: int, req: RunRequest):
    """단일 단계만 실행 (이전 state를 body로 전달하거나 idea_input으로 초기화)"""
    if step < 1 or step > 7:
        raise HTTPException(status_code=400, detail="step은 1~7 사이여야 합니다.")

    ai_profile = validate_ai_profile(req.ai_profile)
    set_current_ai_profile(ai_profile)
    state = {**EMPTY_STATE, "project_id": req.project_id, "idea_input": req.idea_input, "ai_profile": ai_profile}
    runner = STEP_RUNNERS[step]
    result = await runner(state)

    return {
        "step": step,
        "name": STEP_NAMES[step],
        "status": "completed",
        "current_step": result["current_step"],
        "output": {
            k: (v[:800] + "..." if isinstance(v, str) and len(v) > 800 else v)
            for k, v in result.items()
            if k not in ("project_id", "idea_input") and result[k] != EMPTY_STATE.get(k)
        },
    }
