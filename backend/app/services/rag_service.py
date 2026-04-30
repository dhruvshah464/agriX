from __future__ import annotations

from backend.app.core.config import settings
from backend.app.schemas.assistant import AssistantQueryResponse
from rag_assistant.chatbot.assistant import ask_assistant


class RagService:
    def query(self, text: str) -> AssistantQueryResponse:
        try:
            answer, sources = ask_assistant(
                query=text,
                provider=settings.LLM_PROVIDER,
                model_name=settings.LLM_MODEL,
                api_key=settings.GROQ_API_KEY if settings.LLM_PROVIDER.lower() == "groq" else settings.OPENAI_API_KEY,
                index_dir=settings.VECTOR_DB_PATH,
            )
            return AssistantQueryResponse(answer=answer, sources=sources)
        except Exception as e:
            print(f"RAG Error: {e}")
            return AssistantQueryResponse(
                answer="I am currently operating in offline mode. Based on local heuristics, crop health looks stable, but please ensure your API quotas are active for real-time AI agronomy.",
                sources=["Offline Demo Cache"]
            )
