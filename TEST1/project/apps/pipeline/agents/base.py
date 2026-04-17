import os
from langchain_anthropic import ChatAnthropic

def get_llm(model: str = "claude-sonnet-4-6"):
    return ChatAnthropic(
        model=model,
        api_key=os.getenv("ANTHROPIC_API_KEY"),
        max_tokens=8192,
    )

def get_fast_llm():
    return get_llm("claude-haiku-4-5-20251001")

def get_smart_llm():
    return get_llm("claude-sonnet-4-6")
