from agents.base import get_fast_llm, invoke_with_retry
from langchain_core.messages import HumanMessage


async def run_backend_dev(state: dict) -> dict:
    llm = get_fast_llm()
    ctx = f"[기획서]\n{state['product_requirements'][:2000]}\n[아키텍처]\n{state['architecture'][:1000]}"

    setup = await invoke_with_retry(llm, [HumanMessage(content=f"Node.js+Fastify 백엔드 초기 설정 가이드를 작성하세요. npm 명령어, docker-compose.yml, 환경변수 포함.\n{ctx}")])
    schema = await invoke_with_retry(llm, [HumanMessage(content=f"Prisma schema.prisma 전체 코드를 작성하세요. 모든 모델, 관계, 인덱스 포함.\n[DB 스키마]\n{state['database_schema'][:2000]}")])
    routes = await invoke_with_retry(llm, [HumanMessage(content=f"Fastify API 라우트 코드를 작성하세요. Zod 검증, 인증 미들웨어, 에러 처리 포함.\n{ctx}")])
    services = await invoke_with_retry(llm, [HumanMessage(content=f"서비스 레이어와 Repository 패턴 코드를 작성하세요. 비즈니스 로직, 트랜잭션 처리 포함.\n{ctx}")])

    return {
        **state,
        "backend_code": {
            "backend_setup.md": setup.content,
            "backend_schema.md": schema.content,
            "backend_routes.md": routes.content,
            "backend_services.md": services.content,
        }
    }
