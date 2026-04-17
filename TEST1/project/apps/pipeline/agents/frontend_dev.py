from agents.base import get_smart_llm
from langchain_core.messages import HumanMessage


async def run_frontend_dev(state: dict) -> dict:
    llm = get_smart_llm()
    ctx = f"[디자인]\n{state['design_system'][:1500]}\n[구조]\n{state['project_structure'][:1000]}"

    setup = await llm.ainvoke([HumanMessage(content=f"Vite+React+Tailwind CSS 프론트엔드 초기 설정 가이드를 작성하세요. npm 명령어, tailwind.config.js, 환경변수 포함.\n{ctx}")])
    components = await llm.ainvoke([HumanMessage(content=f"핵심 UI 컴포넌트 코드를 작성하세요 (Button, StatusBadge, ProgressBar, 기능 컴포넌트 2개). 실제 동작하는 JSX 코드.\n{ctx}")])
    pages = await llm.ainvoke([HumanMessage(content=f"주요 페이지 컴포넌트 코드를 작성하세요 (홈, 메인 기능 페이지). React Router 기반 실제 JSX 코드.\n{ctx}")])
    hooks = await llm.ainvoke([HumanMessage(content=f"커스텀 훅과 Zustand 스토어를 작성하세요. TanStack Query 훅 포함.\n{ctx}")])

    return {
        **state,
        "frontend_code": {
            "frontend_setup.md": setup.content,
            "frontend_components.md": components.content,
            "frontend_pages.md": pages.content,
            "frontend_hooks.md": hooks.content,
        }
    }
