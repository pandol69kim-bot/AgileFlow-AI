from agents.base import get_smart_llm
from langchain_core.messages import HumanMessage


async def run_tester(state: dict) -> dict:
    llm = get_smart_llm()
    ctx = f"[기획서 Acceptance Criteria]\n{state['product_requirements'][:2000]}"

    strategy = await llm.ainvoke([HumanMessage(content=f"테스트 전략을 작성하세요. 테스트 피라미드, 커버리지 목표(80%+), Vitest/Playwright 도구 선택 근거.\n{ctx}")])
    be_tests = await llm.ainvoke([HumanMessage(content=f"백엔드 Vitest 단위/통합 테스트 코드를 작성하세요. AAA 패턴, 엣지 케이스 포함.\n{ctx}")])
    fe_tests = await llm.ainvoke([HumanMessage(content=f"프론트엔드 Vitest+Testing Library 컴포넌트 테스트 코드를 작성하세요.\n{ctx}")])
    e2e = await llm.ainvoke([HumanMessage(content=f"Playwright E2E 테스트 코드를 작성하세요. 핵심 사용자 시나리오 5개 이상.\n{ctx}")])
    review = await llm.ainvoke([HumanMessage(content=f"코드 리뷰 체크리스트를 작성하세요. 보안, 성능, 코드 품질 항목 포함.\n{ctx}")])

    return {
        **state,
        "test_artifacts": {
            "test_strategy.md": strategy.content,
            "backend_tests.md": be_tests.content,
            "frontend_tests.md": fe_tests.content,
            "e2e_tests.md": e2e.content,
            "code_review.md": review.content,
        }
    }
