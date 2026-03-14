# AI Research Agent

> Simplicity is the ultimate sophistication.

An autonomous, full-stack AI research agent that takes a user query, dynamically searches the web, analyzes multiple sources, and generates a structured, comprehensive markdown report. Built with a focus on real-time feedback, the application streams the agent's internal reasoning steps directly to the frontend using WebSockets.

**Live Demo:** [AI Research Agent on Vercel](https://research-agent-m601gnk4o-tansukhs-projects-0b9707ac.vercel.app)  
**API Documentation:** [FastAPI Swagger UI on Render](https://researchagent-52ne.onrender.com/docs)

---

## 🚀 Features

* **Real-Time Streaming:** Utilizes WebSockets to stream the agent's thought process (e.g., "Searching...", "Reading results...") to the UI in real-time.
* **Autonomous Reasoning:** Powered by LangGraph and Groq (Llama-3) to route queries, search the web, and synthesize information without human intervention.
* **Clean, Minimalist UI:** A sophisticated, responsive interface built with React and Tailwind CSS, featuring ambient glow effects and state-driven animations.
* **Structured Output:** Generates clean Markdown reports with integrated features to instantly copy to clipboard or download as a `.md` file.
* **Production Ready:** Fully containerized using Docker, with the backend deployed on Render and the frontend globally distributed via Vercel.

---

## 🛠️ Tech Stack

**Frontend**
* React (Vite)
* Tailwind CSS
* React-Markdown & Remark-GFM
* Native WebSockets API

**Backend**
* Python 3.x
* FastAPI
* Uvicorn (ASGI Server)

**AI & Orchestration**
* LangGraph
* Groq API (Llama-3)

**Infrastructure & Deployment**
* Docker
* Render (Backend hosting)
* Vercel (Frontend hosting)

---

## 📸 Glimpse of the Application

### Agent Thinking & Searching
![Agent Thinking Process](./Screenshot%202026-03-14%20at%209.21.17%20PM.jpg)

### Final Generated Report
![Generated Markdown Report](./Screenshot%202026-03-14%20at%209.10.49%20PM.jpg)

---

## ⚙️ Local Setup & Installation

### Prerequisites
* Python 3.9+
* Node.js 18+
* Docker (Optional, for containerized running)
* Required API Keys (e.g., Groq API Key, Search API Key)

### Backend Setup (FastAPI)
```bash
# Create and activate a virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create a .env file and add your API keys
# GROQ_API_KEY=your_key_here

# Run the backend server
uvicorn main:app --reload --port 8001
