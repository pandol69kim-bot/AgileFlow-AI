import os
from langchain_anthropic import ChatAnthropic


def get_llm(model: str = "claude-sonnet-4-6") -> ChatAnthropic:
    api_key = os.environ["ANTHROPIC_API_KEY"]  # 미설정 시 시작 즉시 KeyError
    return ChatAnthropic(
        model=model,
        api_key=api_key,
        max_tokens=8192,
    )


def get_fast_llm() -> ChatAnthropic:
    return get_llm("claude-haiku-4-5-20251001")


def get_smart_llm() -> ChatAnthropic:
    return get_llm("claude-sonnet-4-6")
