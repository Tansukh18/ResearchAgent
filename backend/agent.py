from langchain_groq import ChatGroq
from langchain_core.messages import HumanMessage, SystemMessage
from langgraph.prebuilt import create_react_agent
import os
from dotenv import load_dotenv
from tools import web_search
from prompts import RESEARCH_SYSTEM_PROMPT

load_dotenv()

# Initialize LLM
llm = ChatGroq(
    model="llama-3.3-70b-versatile",
    api_key=os.getenv("GROQ_API_KEY"),
    temperature=0.3,
    streaming=True
)

# Tools list
tools = [web_search]

# Create the ReAct agent — fixed for latest langgraph version
agent_executor = create_react_agent(
    llm,
    tools,
    prompt=RESEARCH_SYSTEM_PROMPT
)

def run_research_agent(topic: str):
    """
    Run the research agent on a given topic.
    Yields chunks of text as the agent thinks and writes.
    """
    messages = [HumanMessage(content=f"Research this topic thoroughly and write a complete report: {topic}")]

    tool_call_count = 0

    for chunk in agent_executor.stream({"messages": messages}):

        # Agent is thinking / using tools
        if "agent" in chunk:
            agent_messages = chunk["agent"]["messages"]
            for msg in agent_messages:
                # Check if agent is calling a tool
                if hasattr(msg, "tool_calls") and msg.tool_calls:
                    for tc in msg.tool_calls:
                        tool_call_count += 1
                        query = tc.get("args", {}).get("query", "")
                        yield {
                            "type": "thinking",
                            "step": f"🔍 Searching: {query}",
                            "count": tool_call_count
                        }
                # Agent is writing final response
                elif hasattr(msg, "content") and msg.content:
                    yield {
                        "type": "report",
                        "content": msg.content
                    }

        # Tool returned results
        if "tools" in chunk:
            yield {
                "type": "thinking",
                "step": f"📖 Reading search results...",
                "count": tool_call_count
            }
            