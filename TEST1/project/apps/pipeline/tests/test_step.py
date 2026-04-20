"""
파이프라인 단계별 단독 실행 테스트

사용법:
  # 가상환경 활성화 후 pipeline/ 폴더에서 실행
  cd D:/AI-DATA/TEST1/project/apps/pipeline

  # 1단계: idea_analyst
  python tests/test_step.py --step 1 --idea "반려동물 건강관리 앱"

  # 2단계: planner (1단계 결과 자동 로드)
  python tests/test_step.py --step 2

  # 3단계: designer + architect 병렬
  python tests/test_step.py --step 3

  # 4단계: frontend + backend 병렬
  python tests/test_step.py --step 4

  # 5~7단계
  python tests/test_step.py --step 5
  python tests/test_step.py --step 6
  python tests/test_step.py --step 7

  # 전체 연속 실행
  python tests/test_step.py --all --idea "반려동물 건강관리 앱"
"""
import sys
import asyncio
import argparse
import time
from pathlib import Path

# pipeline/ 루트를 import 경로에 추가
sys.path.insert(0, str(Path(__file__).parent.parent))

from dotenv import load_dotenv
load_dotenv()

from tests.state_io import save_state, load_state, empty_state
from agents.idea_analyst import run_idea_analyst
from agents.planner import run_planner
from agents.designer import run_designer
from agents.architect import run_architect
from agents.frontend_dev import run_frontend_dev
from agents.backend_dev import run_backend_dev
from agents.tester import run_tester
from agents.deployer import run_deployer
from agents.project_manager import run_project_manager


STEP_INFO = {
    1: ("01_idea_analyst", "Haiku"),
    2: ("02_planner",      "Sonnet"),
    3: ("03_designer + 04_architect [병렬]", "Haiku"),
    4: ("05_frontend_dev + 06_backend_dev [병렬]", "Sonnet"),
    5: ("07_tester",       "Sonnet"),
    6: ("08_deployer",     "Sonnet"),
    7: ("09_project_manager", "Sonnet"),
}


def header(step: int):
    name, model = STEP_INFO[step]
    print(f"\n{'='*55}")
    print(f"  STEP {step}: {name}  [{model}]")
    print(f"{'='*55}")


async def run_step(step: int, state: dict) -> dict:
    if step == 1:
        return await run_idea_analyst(state)
    elif step == 2:
        return await run_planner(state)
    elif step == 3:
        d = await run_designer(state)
        a = await run_architect({**state, **d})
        return {**state, **d, **a}
    elif step == 4:
        fe = await run_frontend_dev(state)
        be = await run_backend_dev({**state, **fe})
        return {**state, **fe, **be}
    elif step == 5:
        return await run_tester(state)
    elif step == 6:
        return await run_deployer(state)
    elif step == 7:
        return await run_project_manager(state)
    else:
        raise ValueError(f"step은 1~7 사이여야 합니다. (입력: {step})")


def preview(state: dict, step: int):
    """단계별 결과 미리보기 (앞 300자)"""
    keys = {
        1: ["idea_analysis"],
        2: ["product_requirements"],
        3: ["design_system", "tech_stack"],
        4: ["frontend_code", "backend_code"],
        5: ["test_artifacts"],
        6: ["deploy_artifacts"],
        7: ["final_report"],
    }
    print("\n[결과 미리보기]")
    for key in keys.get(step, []):
        val = state.get(key, "")
        if isinstance(val, dict):
            print(f"  {key}: {list(val.keys())}")
        elif isinstance(val, str):
            print(f"  {key[:50]}...\n  {val[:300]}\n  ...")


async def run_single(step: int, idea: str | None):
    header(step)

    if step == 1:
        if not idea:
            print("  [오류] --idea 옵션이 필요합니다.")
            print("  예: python tests/test_step.py --step 1 --idea '반려동물 건강관리 앱'")
            sys.exit(1)
        state = empty_state("test-local", idea)
    else:
        prev = step - 1
        print(f"  이전 단계(step {prev}) 결과 로드 중...")
        state = load_state(prev)

    print(f"  실행 중... (LLM 호출, 수십 초 소요)")
    t0 = time.time()
    result = await run_step(step, state)
    elapsed = time.time() - t0

    save_state(step, result)
    preview(result, step)
    print(f"\n  완료: {elapsed:.1f}초  |  current_step={result.get('current_step')}")
    print(f"  결과 저장: tests/output/step{step:02d}_state.json")


async def run_all(idea: str):
    print(f"\n{'#'*55}")
    print(f"  전체 파이프라인 실행: {idea}")
    print(f"{'#'*55}")

    state = empty_state("test-all", idea)
    total_start = time.time()

    for step in range(1, 8):
        header(step)
        t0 = time.time()
        state = await run_step(step, state)
        save_state(step, state)
        print(f"  완료: {time.time()-t0:.1f}초")

    print(f"\n{'='*55}")
    print(f"  전체 완료: {time.time()-total_start:.1f}초")
    print(f"  결과: tests/output/step01~07_state.json")


def main():
    parser = argparse.ArgumentParser(description="파이프라인 단계별 테스트")
    parser.add_argument("--step", type=int, choices=range(1, 8), help="실행할 단계 (1~7)")
    parser.add_argument("--all",  action="store_true", help="전체 단계 순서대로 실행")
    parser.add_argument("--idea", type=str, help="프로젝트 아이디어 (step 1 또는 --all 필수)")
    args = parser.parse_args()

    if args.all:
        if not args.idea:
            print("[오류] --all 사용 시 --idea 필수")
            sys.exit(1)
        asyncio.run(run_all(args.idea))
    elif args.step:
        asyncio.run(run_single(args.step, args.idea))
    else:
        parser.print_help()


if __name__ == "__main__":
    main()
