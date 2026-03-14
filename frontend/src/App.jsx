import { useState, useRef } from "react";
import SearchBar from "./components/SearchBar";
import ThinkingSteps from "./components/ThinkingSteps";
import ReportView from "./components/ReportView";

const WS_URL = import.meta.env.VITE_WS_URL || "ws://localhost:8001/ws/research";


export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [thinkingSteps, setThinkingSteps] = useState([]);
  const [report, setReport] = useState("");
  const [currentTopic, setCurrentTopic] = useState("");
  const [error, setError] = useState("");
  const [phase, setPhase] = useState("idle");
  const wsRef = useRef(null);

  const handleSearch = (topic) => {
    setReport("");
    setThinkingSteps([]);
    setError("");
    setCurrentTopic(topic);
    setIsLoading(true);
    setPhase("thinking");

    const ws = new WebSocket(WS_URL);
    wsRef.current = ws;

    ws.onopen = () => {
      ws.send(JSON.stringify({ topic }));
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type === "thinking") {
        setThinkingSteps((prev) => [...prev, data.step]);
      } else if (data.type === "report") {
        setReport(data.content);
        setPhase("done");
        setIsLoading(false);
      } else if (data.type === "error") {
        setError(data.message);
        setIsLoading(false);
        setPhase("idle");
      } else if (data.type === "done") {
        setIsLoading(false);
        setPhase("done");
      }
    };

    ws.onerror = () => {
      setError("Connection failed. Make sure backend is running on port 8001.");
      setIsLoading(false);
      setPhase("idle");
    };

    ws.onclose = () => {
      setIsLoading(false);
    };
  };

  const handleReset = () => {
    setPhase("idle");
    setReport("");
    setThinkingSteps([]);
    setCurrentTopic("");
    setError("");
    if (wsRef.current) wsRef.current.close();
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f]">

      {/* Background glow */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[20%] w-[600px] h-[600px] bg-indigo-900/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[10%] w-[500px] h-[500px] bg-purple-900/20 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-16">

        {/* Hero — shown only on idle */}
        {phase === "idle" && (
          <div className="text-center mb-12 fade-in-up">
            <div className="inline-flex items-center gap-2 bg-indigo-600/10 border border-indigo-500/20
                            text-indigo-400 text-sm px-4 py-1.5 rounded-full mb-6">
              <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-pulse" />
              Powered by LangGraph + Groq Llama-3
            </div>

            <h1 className="text-5xl font-bold text-white mb-4">
              AI Research{" "}
              <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Agent
              </span>
            </h1>

            <p className="text-gray-400 text-lg max-w-xl mx-auto leading-relaxed">
              Enter any topic and watch the AI agent autonomously search the web,
              analyse multiple sources, and generate a structured research report.
            </p>
          </div>
        )}

        {/* Compact header — shown when active */}
        {phase !== "idle" && (
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold text-white">
              AI Research{" "}
              <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Agent
              </span>
            </h1>
            <button
              onClick={handleReset}
              className="text-sm text-gray-400 hover:text-white bg-[#1a1a2e] hover:bg-[#1e1e3f]
                         border border-gray-700 hover:border-gray-500 px-4 py-2 rounded-lg
                         transition-all duration-200 flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              New Research
            </button>
          </div>
        )}

        {/* Search bar */}
        <SearchBar onSearch={handleSearch} isLoading={isLoading} />

        {/* Error */}
        {error && (
          <div className="mt-6 max-w-3xl mx-auto bg-red-900/20 border border-red-500/30
                          text-red-400 px-5 py-4 rounded-xl text-sm flex items-start gap-3">
            <span className="text-lg">⚠️</span>
            <span>{error}</span>
          </div>
        )}

        {/* Thinking steps */}
        {(phase === "thinking" || (phase === "done" && thinkingSteps.length > 0)) && (
          <ThinkingSteps steps={thinkingSteps} isLoading={isLoading} />
        )}

        {/* Final report */}
        {report && (
          <ReportView report={report} topic={currentTopic} />
        )}

      </div>
    </div>
  );
}