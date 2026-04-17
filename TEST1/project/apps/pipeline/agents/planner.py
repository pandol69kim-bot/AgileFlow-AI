from agents.base import get_smart_llm
from langchain_core.messages import HumanMessage

PROMPT = """당신은 10년차 시니어 프로덕트 기획자입니다.
아래 분석 보고서를 기반으로 상세 기획서(PRD)를 작성하세요.

[분석 보고서]
{idea_analysis}

다음 원칙을 준수하세요:
1. 모든 기능은 User Story 형태 (As a... I want... So that...)
2. MVP 범위를 명확히 구분
3. 데이터 모델은 정규화 원칙 준수
4. API는 RESTful 설계 원칙
5. 실현 가능한 마일스톤 (MVP 4주, v1.1 2주)

섹션: 제품 비전/KPI, 기능 요구사항(Epic별 User Story), 비기능 요구사항,
화면 목록&흐름, 데이터 모델, API 명세 초안, 마일스톤"""


async def run_planner(state: dict) -> dict:
    llm = get_smart_llm()
    prompt = PROMPT.format(idea_analysis=state["idea_analysis"])
    response = await llm.ainvoke([HumanMessage(content=prompt)])
    return {**state, "product_requirements": response.content, "current_step": 2}
