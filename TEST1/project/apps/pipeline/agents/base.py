import os
import asyncio
from contextvars import ContextVar
from dotenv import load_dotenv

load_dotenv()


DEFAULT_AI_PROFILE = "claude"

AI_PROFILES = {
    "claude": {
        "label": "Claude",
        "provider": "anthropic",
        "fast_model": "claude-haiku-4-5-20251001",
        "smart_model": "claude-sonnet-4-6",
    },
    "openai": {
        "label": "GPT-4.1",
        "provider": "openai",
        "fast_model": "gpt-4.1-mini",
        "smart_model": "gpt-4.1",
    },
    "gemini": {
        "label": "Gemini 2.5",
        "provider": "gemini",
        "fast_model": "gemini-2.5-flash",
        "smart_model": "gemini-2.5-pro",
    },
}

CURRENT_AI_PROFILE: ContextVar[str] = ContextVar("current_ai_profile", default=DEFAULT_AI_PROFILE)


def validate_ai_profile(ai_profile: str | None) -> str:
    profile_id = ai_profile or DEFAULT_AI_PROFILE
    if profile_id not in AI_PROFILES:
        raise ValueError(f"Unsupported ai profile: {profile_id}")
    return profile_id


def set_current_ai_profile(ai_profile: str | None) -> str:
    profile_id = validate_ai_profile(ai_profile)
    CURRENT_AI_PROFILE.set(profile_id)
    return profile_id


def get_current_ai_profile() -> str:
    return CURRENT_AI_PROFILE.get()


def _resolve_profile(ai_profile: str | None = None) -> dict:
    return AI_PROFILES[validate_ai_profile(ai_profile or get_current_ai_profile())]


def _missing_key_error(env_key: str, label: str) -> RuntimeError:
    return RuntimeError(f"{label} 프로필을 사용하려면 {env_key} 환경변수가 필요합니다.")


def get_available_ai_profiles() -> list[dict]:
    return [
        {
            "id": profile_id,
            "label": profile["label"],
            "provider": profile["provider"],
        }
        for profile_id, profile in AI_PROFILES.items()
    ]


def get_llm(kind: str = "smart_model", ai_profile: str | None = None):
    profile = _resolve_profile(ai_profile)
    provider = profile["provider"]
    model = profile[kind]

    if provider == "anthropic":
        try:
            from langchain_anthropic import ChatAnthropic
        except ImportError as err:
            raise RuntimeError("Claude 프로필을 사용하려면 langchain-anthropic 패키지가 설치되어야 합니다.") from err

        api_key = os.environ.get("ANTHROPIC_API_KEY")
        if not api_key:
            raise _missing_key_error("ANTHROPIC_API_KEY", profile["label"])

        return ChatAnthropic(
            model=model,
            api_key=api_key,
            max_tokens=4096,
        )

    if provider == "openai":
        try:
            from langchain_openai import ChatOpenAI
        except ImportError as err:
            raise RuntimeError("OpenAI 프로필을 사용하려면 langchain-openai 패키지가 설치되어야 합니다.") from err

        api_key = os.environ.get("OPENAI_API_KEY")
        if not api_key:
            raise _missing_key_error("OPENAI_API_KEY", profile["label"])

        return ChatOpenAI(
            model=model,
            api_key=api_key,
            max_tokens=4096,
        )

    if provider == "gemini":
        try:
            from langchain_google_genai import ChatGoogleGenerativeAI
        except ImportError as err:
            raise RuntimeError("Gemini 프로필을 사용하려면 langchain-google-genai 패키지가 설치되어야 합니다.") from err

        api_key = os.environ.get("GOOGLE_API_KEY")
        if not api_key:
            raise _missing_key_error("GOOGLE_API_KEY", profile["label"])

        return ChatGoogleGenerativeAI(
            model=model,
            google_api_key=api_key,
            max_output_tokens=4096,
        )

    raise RuntimeError(f"Unsupported provider: {provider}")

def get_fast_llm(ai_profile: str | None = None):
    return get_llm("fast_model", ai_profile)


def get_smart_llm(ai_profile: str | None = None):
    return get_llm("smart_model", ai_profile)


def _is_rate_limit_error(err: Exception) -> bool:
    status_code = getattr(err, "status_code", None)
    if status_code == 429:
        return True

    response = getattr(err, "response", None)
    if getattr(response, "status_code", None) == 429:
        return True

    return err.__class__.__name__ == "RateLimitError"


async def invoke_with_retry(llm, messages: list, max_retries: int = 3) -> any:
    """Rate Limit 시 지수 백오프로 재시도"""
    for attempt in range(max_retries):
        try:
            return await llm.ainvoke(messages)
        except Exception as err:
            if not _is_rate_limit_error(err) or attempt == max_retries - 1:
                raise
            wait = 60 * (attempt + 1)
            print(f"  [RateLimit] {wait}초 대기 후 재시도 ({attempt + 1}/{max_retries})...")
            await asyncio.sleep(wait)
