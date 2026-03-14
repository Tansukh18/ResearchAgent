from tavily import TavilyClient
from langchain_core.tools import tool
import os
from dotenv import load_dotenv

load_dotenv()

tavily_client = TavilyClient(api_key=os.getenv("TAVILY_API_KEY"))

@tool
def web_search(query: str) -> str:
    """Search the web for information about a given query.
    Returns a list of relevant results with titles, URLs and content."""
    try:
        results = tavily_client.search(
            query=query,
            search_depth="advanced",
            max_results=5,
            include_answer=True,
            include_raw_content=False
        )

        formatted = []
        for i, result in enumerate(results.get("results", []), 1):
            formatted.append(
                f"[Source {i}]\n"
                f"Title: {result.get('title', 'N/A')}\n"
                f"URL: {result.get('url', 'N/A')}\n"
                f"Content: {result.get('content', 'N/A')}\n"
            )

        answer = results.get("answer", "")
        if answer:
            formatted.insert(0, f"Quick Answer: {answer}\n")

        return "\n---\n".join(formatted)

    except Exception as e:
        return f"Search error: {str(e)}"