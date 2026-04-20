from agents.base import get_fast_llm, invoke_with_retry
from langchain_core.messages import HumanMessage


async def run_deployer(state: dict) -> dict:
    llm = get_fast_llm()
    ctx = f"[기술스택]\n{state['tech_stack'][:1500]}\n[아키텍처]\n{state['architecture'][:1000]}"

    docker = await invoke_with_retry(llm, [HumanMessage(content=f"Docker 설정을 작성하세요. 멀티스테이지 Dockerfile(FE/BE), docker-compose.prod.yml 포함.\n{ctx}")])
    cicd = await invoke_with_retry(llm, [HumanMessage(content=f"GitHub Actions CI/CD 워크플로우를 작성하세요. lint→test→build→deploy 단계.\n{ctx}")])
    infra = await invoke_with_retry(llm, [HumanMessage(content=f"인프라 구성 문서를 작성하세요. 클라우드 아키텍처(Vercel+AWS), 환경 구성, 스케일링 정책, 백업 정책.\n{ctx}")])
    monitoring = await invoke_with_retry(llm, [HumanMessage(content=f"모니터링 설정을 작성하세요. LangSmith, Sentry, 헬스체크, 알림 규칙.\n{ctx}")])

    return {
        **state,
        "deploy_artifacts": {
            "docker.md": docker.content,
            "cicd.md": cicd.content,
            "infrastructure.md": infra.content,
            "monitoring.md": monitoring.content,
        }
    }
