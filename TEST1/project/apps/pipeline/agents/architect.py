from agents.base import get_smart_llm
from langchain_core.messages import HumanMessage


async def run_architect(state: dict) -> dict:
    llm = get_smart_llm()

    tech_stack = await llm.ainvoke([HumanMessage(content=f"""당신은 15년차 시니어 소프트웨어 아키텍트입니다.
기획서를 기반으로 기술 스택 결정서를 작성하세요.
프론트엔드(Vite+React), 백엔드(Node.js+Fastify), DB(PostgreSQL+Redis), 인프라 포함.
각 항목에 선택 근거와 대안 비교 포함.
[기획서]
{state['product_requirements'][:3000]}""")])

    architecture = await llm.ainvoke([HumanMessage(content=f"""시스템 아키텍처 문서를 작성하세요.
전체 구성도(ASCII), 서비스간 통신, 인증 흐름, API 설계 원칙 포함.
[기획서]
{state['product_requirements'][:2000]}""")])

    db_schema = await llm.ainvoke([HumanMessage(content=f"""데이터베이스 스키마를 작성하세요.
ERD 요약, 테이블 정의(컬럼명/타입/제약조건/설명), 인덱스 전략, 마이그레이션 계획 포함.
[기획서]
{state['product_requirements'][:2000]}""")])

    proj_structure = await llm.ainvoke([HumanMessage(content=f"""Turborepo 모노레포 디렉토리 구조를 작성하세요.
apps/web(Vite+React), apps/api(Fastify), apps/pipeline(Python LangGraph), packages/shared 포함.
[기획서]
{state['product_requirements'][:1500]}""")])

    return {
        **state,
        "tech_stack": tech_stack.content,
        "architecture": architecture.content,
        "database_schema": db_schema.content,
        "project_structure": proj_structure.content,
    }
