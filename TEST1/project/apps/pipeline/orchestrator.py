from typing import TypedDict, AsyncGenerator
import asyncio

from agents.idea_analyst import run_idea_analyst
from agents.planner import run_planner
from agents.designer import run_designer
from agents.architect import run_architect
from agents.frontend_dev import run_frontend_dev
from agents.backend_dev import run_backend_dev
from agents.tester import run_tester
from agents.deployer import run_deployer
from agents.project_manager import run_project_manager


class PipelineState(TypedDict):
    project_id: str
    idea_input: str
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


async def run_pipeline(project_id: str, idea_input: str) -> AsyncGenerator[dict, None]:
    state: PipelineState = {
        "project_id": project_id,
        "idea_input": idea_input,
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

    # Step 1: Idea Analyst
    yield {"agent": "01_idea_analyst", "status": "running", "step": 1}
    state = await run_idea_analyst(state)
    yield {
        "agent": "01_idea_analyst", "status": "completed", "step": 1,
        "filename": "idea_analysis_report.md", "content": state["idea_analysis"]
    }

    # Step 2: Planner
    yield {"agent": "02_planner", "status": "running", "step": 2}
    state = await run_planner(state)
    yield {
        "agent": "02_planner", "status": "completed", "step": 2,
        "filename": "product_requirements.md", "content": state["product_requirements"]
    }

    # Step 3: Designer + Architect (병렬)
    yield {"agent": "03_designer", "status": "running", "step": 3}
    yield {"agent": "04_architect", "status": "running", "step": 3}

    designer_task = asyncio.create_task(run_designer(state))
    architect_task = asyncio.create_task(run_architect(state))
    designer_state, architect_state = await asyncio.gather(designer_task, architect_task)

    state.update(designer_state)
    state.update(architect_state)

    for filename, content_key in [
        ("design_system.md", "design_system"),
        ("wireframes.md", "wireframes"),
        ("components.md", "components"),
    ]:
        yield {"agent": "03_designer", "status": "completed", "step": 3, "filename": filename, "content": state[content_key]}

    for filename, content_key in [
        ("tech_stack.md", "tech_stack"),
        ("architecture.md", "architecture"),
        ("database_schema.md", "database_schema"),
        ("project_structure.md", "project_structure"),
    ]:
        yield {"agent": "04_architect", "status": "completed", "step": 3, "filename": filename, "content": state[content_key]}

    # Step 4: Frontend + Backend (병렬)
    yield {"agent": "05_frontend_dev", "status": "running", "step": 4}
    yield {"agent": "06_backend_dev", "status": "running", "step": 4}

    fe_task = asyncio.create_task(run_frontend_dev(state))
    be_task = asyncio.create_task(run_backend_dev(state))
    fe_state, be_state = await asyncio.gather(fe_task, be_task)

    state.update(fe_state)
    state.update(be_state)

    for filename, key in fe_state["frontend_code"].items():
        yield {"agent": "05_frontend_dev", "status": "completed", "step": 4, "filename": filename, "content": key}
    for filename, key in be_state["backend_code"].items():
        yield {"agent": "06_backend_dev", "status": "completed", "step": 4, "filename": filename, "content": key}

    # Step 5: Tester
    yield {"agent": "07_tester", "status": "running", "step": 5}
    state = await run_tester(state)
    for filename, content in state["test_artifacts"].items():
        yield {"agent": "07_tester", "status": "completed", "step": 5, "filename": filename, "content": content}

    # Step 6: Deployer
    yield {"agent": "08_deployer", "status": "running", "step": 6}
    state = await run_deployer(state)
    for filename, content in state["deploy_artifacts"].items():
        yield {"agent": "08_deployer", "status": "completed", "step": 6, "filename": filename, "content": content}

    # Step 7: Project Manager
    yield {"agent": "09_project_manager", "status": "running", "step": 7}
    state = await run_project_manager(state)
    yield {
        "agent": "09_project_manager", "status": "completed", "step": 7,
        "filename": "final_report.md", "content": state["final_report"]
    }

    yield {"agent": "pipeline", "status": "completed", "step": 9}
