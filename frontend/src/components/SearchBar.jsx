import { useState } from "react";

export default function SearchBar({ onSearch, isLoading }) {
    const [topic, setTopic] = useState("");

    const handleSubmit = () => {
        if (topic.trim() && !isLoading) {
            onSearch(topic.trim());
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleSubmit();
        }
    };

    const suggestions = [
        "Quantum Computing in 2026",
        "Impact of AI on Healthcare",
        "Climate Change Solutions",
        "Future of Electric Vehicles",
    ];

    return (
        <div className="w-full max-w-3xl mx-auto">

            {/* Search input with gradient border */}
            <div className="gradient-border p-[2px] rounded-2xl">
                <div className="bg-[#0f0f1a] rounded-2xl flex items-center gap-3 px-5 py-4">

                    {/* Search icon */}
                    <svg className="w-5 h-5 text-indigo-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>

                    <input
                        type="text"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Enter any topic to research..."
                        disabled={isLoading}
                        className="flex-1 bg-transparent text-white placeholder-gray-500
                       outline-none text-lg disabled:opacity-50"
                    />

                    <button
                        onClick={handleSubmit}
                        disabled={!topic.trim() || isLoading}
                        className="shrink-0 bg-indigo-600 hover:bg-indigo-500
                       disabled:bg-gray-700 disabled:cursor-not-allowed
                       text-white font-semibold px-6 py-2.5 rounded-xl
                       transition-all duration-200 flex items-center gap-2"
                    >
                        {isLoading ? (
                            <>
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                Researching...
                            </>
                        ) : (
                            <>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                        d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                                Research
                            </>
                        )}
                    </button>
                </div>
            </div>

            {/* Suggestion chips */}
            {!isLoading && (
                <div className="flex flex-wrap gap-2 mt-4 justify-center">
                    {suggestions.map((s) => (
                        <button
                            key={s}
                            onClick={() => setTopic(s)}
                            className="text-sm text-gray-400 hover:text-indigo-300
                         bg-[#1a1a2e] hover:bg-[#1e1e3f]
                         border border-gray-700 hover:border-indigo-500
                         px-3 py-1.5 rounded-full transition-all duration-200"
                        >
                            {s}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}