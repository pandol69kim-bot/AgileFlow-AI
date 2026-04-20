import os
import asyncio
from dotenv import load_dotenv
from langchain_anthropic import ChatAnthropic
from anthropic import RateLimitError

load_dotenv()


def get_llm(model: str = "claude-sonnet-4-6") -> ChatAnthropic:
    api_key = os.environ["ANTHROPIC_API_KEY"]
    return ChatAnthropic(
        model=model,
        api_key=api_key,
        max_tokens=4096,
    )


def get_fast_llm() -> ChatAnthropic:
    return get_llm("claude-haiku-4-5-20251001")


def get_smart_llm() -> ChatAnthropic:
    return get_llm("claude-sonnet-4-6")


async def invoke_with_retry(llm: ChatAnthropic, messages: list, max_retries: int = 3) -> any:
    """Rate Limit 시 지수 백오프로 재시도"""
    for attempt in range(max_retries):
        try:
            return await llm.ainvoke(messages)
        except RateLimitError:
            if attempt == max_retries - 1:
                raise
            wait = 60 * (attempt + 1)
            print(f"  [RateLimit] {wait}초 대기 후 재시도 ({attempt + 1}/{max_retries})...")
            await asyncio.sleep(wait)
