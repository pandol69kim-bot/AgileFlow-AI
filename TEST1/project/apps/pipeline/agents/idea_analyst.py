from agents.base import get_fast_llm
from langchain_core.messages import HumanMessage

PROMPT = """당신은 시니어 프로덕트 매니저이자 비즈니스 분석가입니다.
다음 아이디어를 분석하여 구체적인 프로젝트 정의서를 작성하세요.

아이디어: {idea}

다음 구조로 마크다운 분석 보고서를 작성하세요:
1. 프로젝트 개요 (프로젝트명, 한줄 설명, 핵심 가치)
2. 타겟 사용자 (페르소나 3개, 니즈, 페인포인트)
3. 핵심 기능 목록 (MVP v1, 확장 기능 v2+)
4. 경쟁 분석 (유사 서비스 3개)
5. 기술 리스크 & 제약사항
6. 프로젝트 규모 판단 (규모, 난이도, 권장 기술 스택)

실현 가능하고 구체적으로 작성하되 범위를 과도하게 확장하지 마세요."""


async def run_idea_analyst(state: dict) -> dict:
    llm = get_fast_llm()
    prompt = PROMPT.format(idea=state["idea_input"])
    response = await llm.ainvoke([HumanMessage(content=prompt)])
    return {**state, "idea_analysis": response.content, "current_step": 1}
