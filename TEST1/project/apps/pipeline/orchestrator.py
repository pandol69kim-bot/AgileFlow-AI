from typing import TypedDict, AsyncGenerator, Optional
import asyncio
import os

import redis.asyncio as aioredis

from agents.idea_analyst import run_idea_analyst
from agents.planner import run_planner
from agents.designer import run_designer
from agents.architect import run_architect
from agents.frontend_dev import run_frontend_dev
from agents.backend_dev import run_backend_dev
from agents.tester import run_tester
from agents.deployer import run_deployer
from agents.project_manager import run_project_manager
from agents.base import set_current_ai_profile, validate_ai_profile


class PipelineState(TypedDict):
    project_id: str
    idea_input: str
    ai_profile: str
    idea_analysis: str
    product_requirements: str
    design_system: str
    wireframes: str
    components: str
    tech_stack: str
    architecture: str
    database_schema: str
    project_structure: str
    frontend_code: dict
    backend_code: dict
    test_artifacts: dict
    deploy_artifacts: dict
    final_report: str
    current_step: int
    errors: list


EMPTY_STATE: PipelineState = {
    "project_id": "",
    "idea_input": "",
    "ai_profile": "claude",
    "idea_analysis": "",
    "product_requirements": "",
    "design_system": "",
    "wireframes": "",
    "components": "",
    "tech_stack": "",
    "architecture": "",
    "database_schema": "",
    "project_structure": "",
    "frontend_code": {},
    "backend_code": {},
    "test_artifacts": {},
    "deploy_artifacts": {},
    "final_report": "",
    "current_step": 0,
    "errors": [],
}

REDIS_URL = os.environ.get("REDIS_URL", "redis://localhost:6379")


async def _should_skip(r: aioredis.Redis, project_id: str, step: int) -> bool:
    return bool(await r.sismember(f"project:{project_id}:skip_steps", str(step)))


async def run_pipeline(
    project_id: str,
    idea_input: str,
    ai_profile: str = "claude",
    start_step: int = 1,
    initial_state: Optional[dict] = None,
) -> AsyncGenerator[dict, None]:
    resolved_ai_profile = validate_ai_profile(ai_profile)
    set_current_ai_profile(resolved_ai_profile)
    state: PipelineState = {**EMPTY_STATE, "project_id": project_id, "idea_input": idea_input, "ai_profile": resolved_ai_profile}
    # Pre-populate state from previous run artifacts (for step retry)
    if initial_state:
        for k, v in initial_state.items():
            if k in EMPTY_STATE:
                state[k] = v

    r = aioredis.from_url(REDIS_URL, decode_responses=True)

    try:
        # Step 1: Idea Analyst
        if start_step > 1:
            pass  # state pre-populated from initial_state
        elif await _should_skip(r, project_id, 1):
            yield {"agent": "01_idea_analyst", "status": "skipped", "step": 1,
                   "filename": "idea_analysis_report.md", "content": ""}
        else:
            yield {"agent": "01_idea_analyst", "status": "running", "step": 1}
            state = await run_idea_analyst(state)
            yield {
                "agent": "01_idea_analyst", "status": "completed", "step": 1,
                "filename": "idea_analysis_report.md", "content": state["idea_analysis"]
            }

        # Step 2: Planner
        if start_step > 2:
            pass
        elif await _should_skip(r, project_id, 2):
            yield {"agent": "02_planner", "status": "skipped", "step": 2,
                   "filename": "product_requirements.md", "content": ""}
        else:
            yield {"agent": "02_planner", "status": "running", "step": 2}
            state = await run_planner(state)
            yield {
                "agent": "02_planner", "status": "completed", "step": 2,
                "filename": "product_requirements.md", "content": state["product_requirements"]
            }

        # Step 3: Designer + Architect (병렬)
        if start_step > 3:
            pass
        elif await _should_skip(r, project_id, 3):
            yield {"agent": "03_designer", "status": "skipped", "step": 3,
                   "filename": "design_system.md", "content": ""}
            yield {"agent": "04_architect", "status": "skipped", "step": 3,
                   "filename": "tech_stack.md", "content": ""}
        else:
            yield {"agent": "03_designer", "status": "running", "step": 3}
            yield {"agent": "04_architect", "status": "running", "step": 3}

            designer_task = asyncio.create_task(run_designer(state))
            architect_task = asyncio.create_task(run_architect(state))
            designer_state, architect_state = await asyncio.gather(designer_task, architect_task)

            state["design_system"] = designer_state["design_system"]
            state["wireframes"] = designer_state["wireframes"]
            state["components"] = designer_state["components"]
            state["tech_stack"] = architect_state["tech_stack"]
            state["architecture"] = architect_state["architecture"]
            state["database_schema"] = architect_state["database_schema"]
            state["project_structure"] = architect_state["project_structure"]

            for filename, content_key in [
                ("design_system.md", "design_system"),
                ("wireframes.md", "wireframes"),
                ("components.md", "components"),
            ]:
                yield {"agent": "03_designer", "status": "completed", "step": 3,
                       "filename": filename, "content": state[content_key]}

            for filename, content_key in [
                ("tech_stack.md", "tech_stack"),
                ("architecture.md", "architecture"),
                ("database_schema.md", "database_schema"),
                ("project_structure.md", "project_structure"),
            ]:
                yield {"agent": "04_architect", "status": "completed", "step": 3,
                       "filename": filename, "content": state[content_key]}

        # Step 4: Frontend → Backend
        if start_step > 4:
            pass
        elif await _should_skip(r, project_id, 4):
            yield {"agent": "05_frontend_dev", "status": "skipped", "step": 4,
                   "filename": "frontend_setup.md", "content": ""}
            yield {"agent": "06_backend_dev", "status": "skipped", "step": 4,
                   "filename": "backend_setup.md", "content": ""}
        else:
            yield {"agent": "05_frontend_dev", "status": "running", "step": 4}
            fe_state = await run_frontend_dev(state)
            state["frontend_code"] = fe_state["frontend_code"]
            for filename, content in fe_state["frontend_code"].items():
                yield {"agent": "05_frontend_dev", "status": "completed", "step": 4,
                       "filename": filename, "content": content}

            yield {"agent": "06_backend_dev", "status": "running", "step": 4}
            be_state = await run_backend_dev(state)
            state["backend_code"] = be_state["backend_code"]
            for filename, content in be_state["backend_code"].items():
                yield {"agent": "06_backend_dev", "status": "completed", "step": 4,
                       "filename": filename, "content": content}

        # Step 5: Tester
        if start_step > 5:
            pass
        elif await _should_skip(r, project_id, 5):
            yield {"agent": "07_tester", "status": "skipped", "step": 5,
                   "filename": "test_strategy.md", "content": ""}
        else:
            yield {"agent": "07_tester", "status": "running", "step": 5}
            state = await run_tester(state)
            for filename, content in state["test_artifacts"].items():
                yield {"agent": "07_tester", "status": "completed", "step": 5,
                       "filename": filename, "content": content}

        # Step 6: Deployer
        if start_step > 6:
            pass
        elif await _should_skip(r, project_id, 6):
            yield {"agent": "08_deployer", "status": "skipped", "step": 6,
                   "filename": "docker.md", "content": ""}
        else:
            yield {"agent": "08_deployer", "status": "running", "step": 6}
            state = await run_deployer(state)
            for filename, content in state["deploy_artifacts"].items():
                yield {"agent": "08_deployer", "status": "completed", "step": 6,
                       "filename": filename, "content": content}

        # Step 7: Project Manager
        if await _should_skip(r, project_id, 7):
            yield {"agent": "09_project_manager", "status": "skipped", "step": 7,
                   "filename": "final_report.md", "content": ""}
        else:
            yield {"agent": "09_project_manager", "status": "running", "step": 7}
            state = await run_project_manager(state)
            yield {
                "agent": "09_project_manager", "status": "completed", "step": 7,
                "filename": "final_report.md", "content": state["final_report"]
            }

        yield {"agent": "pipeline", "status": "completed", "step": 9}

    finally:
        await r.aclose()
