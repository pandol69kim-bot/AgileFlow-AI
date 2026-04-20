from agents.base import get_fast_llm, invoke_with_retry
from langchain_core.messages import HumanMessage


async def run_project_manager(state: dict) -> dict:
    llm = get_fast_llm()

    artifacts_summary = f"""
프로젝트 ID: {state['project_id']}
아이디어: {state['idea_input']}

완료된 에이전트: 01_idea_analyst, 02_planner, 03_designer, 04_architect,
05_frontend_dev, 06_backend_dev, 07_tester, 08_deployer

산출물 목록:
- idea_analysis_report.md
- product_requirements.md
- design_system.md, wireframes.md, components.md
- tech_stack.md, architecture.md, database_schema.md, project_structure.md
- frontend_setup.md, frontend_components.md, frontend_pages.md, frontend_hooks.md
- backend_setup.md, backend_schema.md, backend_routes.md, backend_services.md
- test_strategy.md, backend_tests.md, frontend_tests.md, e2e_tests.md, code_review.md
- docker.md, cicd.md, infrastructure.md, monitoring.md
"""

    response = await invoke_with_retry(llm, [HumanMessage(content=f"""당신은 시니어 프로젝트 매니저입니다.
다음 프로젝트 산출물을 종합하여 최종 리포트를 작성하세요.

{artifacts_summary}

[기술 스택 요약]
{state['tech_stack'][:1000]}

다음을 포함하세요:
1. 프로젝트 개요 (아이디어 요약, 최종 제품 정의, 핵심 기능)
2. 기술 스택 요약 표
3. 파이프라인 아키텍처 (ASCII 흐름도)
4. 전체 산출물 목록 (에이전트별 표)
5. 다음 단계 권장사항 (MVP→v1.1→v2.0)
6. 기술 부채 목록 (우선순위별)
7. 실행 통계 (에이전트 수, 산출물 수, 예상 비용)""")])

    return {**state, "final_report": response.content, "current_step": 9}
