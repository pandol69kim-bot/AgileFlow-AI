from agents.base import get_fast_llm
from langchain_core.messages import HumanMessage


async def run_designer(state: dict) -> dict:
    llm = get_fast_llm()

    design_system = await llm.ainvoke([HumanMessage(content=f"""당신은 시니어 UI/UX 디자이너입니다.
다음 기획서 기반으로 디자인 시스템을 작성하세요 (다크 테마, Tailwind CSS 호환).
컬러 팔레트, 타이포그래피, 스페이싱, 컴포넌트 상태 색상, 그림자 포함.

[기획서]
{state['product_requirements'][:3000]}""")])

    wireframes = await llm.ainvoke([HumanMessage(content=f"""다음 기획서의 주요 화면 3개를 ASCII 와이어프레임으로 작성하세요.
[기획서]
{state['product_requirements'][:2000]}""")])

    components = await llm.ainvoke([HumanMessage(content=f"""Atomic Design 기반 컴포넌트 명세를 작성하세요.
Atoms, Molecules, Organisms 각 3개 이상, 상태(State)와 Props 정의 포함.
[기획서]
{state['product_requirements'][:2000]}""")])

    return {
        **state,
        "design_system": design_system.content,
        "wireframes": wireframes.content,
        "components": components.content,
    }
