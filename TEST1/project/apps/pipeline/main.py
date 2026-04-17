from fastapi import FastAPI, HTTPException
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
import json
import asyncio

from orchestrator import run_pipeline, EMPTY_STATE
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


class StepRequest(BaseModel):
    project_id: str
    idea_input: str
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


@app.post("/run")
async def run(req: RunRequest):
    """전체 파이프라인 NDJSON 스트리밍 실행"""
    async def event_stream():
        async for event in run_pipeline(req.project_id, req.idea_input):
            yield json.dumps(event) + "\n"

    return StreamingResponse(event_stream(), media_type="application/x-ndjson")


@app.post("/run/until/{step}")
async def run_until(step: int, req: RunRequest):
    """step 번호까지만 실행하고 state 반환 (1~7)"""
    if step < 1 or step > 7:
        raise HTTPException(status_code=400, detail="step은 1~7 사이여야 합니다.")

    state = {**EMPTY_STATE, "project_id": req.project_id, "idea_input": req.idea_input}
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

    state = {**EMPTY_STATE, "project_id": req.project_id, "idea_input": req.idea_input}
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
