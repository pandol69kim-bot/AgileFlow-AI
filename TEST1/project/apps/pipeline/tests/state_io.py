"""State 저장/로드 유틸리티"""
import json
from pathlib import Path

OUTPUT_DIR = Path(__file__).parent / "output"
OUTPUT_DIR.mkdir(exist_ok=True)


def save_state(step: int, state: dict) -> Path:
    path = OUTPUT_DIR / f"step{step:02d}_state.json"
    path.write_text(json.dumps(state, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"  [저장] {path}")
    return path


def load_state(step: int) -> dict:
    path = OUTPUT_DIR / f"step{step:02d}_state.json"
    if not path.exists():
        raise FileNotFoundError(f"Step {step} 결과 없음: {path}\n먼저 step {step}을 실행하세요.")
    return json.loads(path.read_text(encoding="utf-8"))


def empty_state(project_id: str, idea_input: str) -> dict:
    return {
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
