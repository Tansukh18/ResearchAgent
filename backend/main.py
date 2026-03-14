from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import json
import asyncio
from agent import run_research_agent
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="AI Research Agent", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"status": "AI Research Agent is live"}

@app.websocket("/ws/research")
async def research_websocket(websocket: WebSocket):
    await websocket.accept()
    try:
        while True:
            # Receive topic from frontend
            data = await websocket.receive_text()
            payload = json.loads(data)
            topic = payload.get("topic", "")

            if not topic:
                await websocket.send_text(json.dumps({
                    "type": "error",
                    "message": "Please provide a research topic"
                }))
                continue

            await websocket.send_text(json.dumps({
                "type": "start",
                "message": f"Starting research on: {topic}"
            }))

            # Run agent and stream results
            loop = asyncio.get_event_loop()

            def generate():
                return list(run_research_agent(topic))

            results = await loop.run_in_executor(None, generate)

            for chunk in results:
                await websocket.send_text(json.dumps(chunk))
                await asyncio.sleep(0.01)

            await websocket.send_text(json.dumps({
                "type": "done",
                "message": "Research complete"
            }))

    except WebSocketDisconnect:
        print("Client disconnected")
    except Exception as e:
        await websocket.send_text(json.dumps({
            "type": "error",
            "message": str(e)
        }))