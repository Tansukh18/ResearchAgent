export default function ThinkingSteps({ steps, isLoading }) {
    return (
        <div className="w-full max-w-3xl mx-auto mt-8">
            <div className="bg-[#0f0f1a] border border-gray-800 rounded-2xl p-5">

                {/* Header */}
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-indigo-600/20 flex items-center justify-center">
                        <svg className="w-4 h-4 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3
                   m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547
                   A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531
                   c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                    </div>
                    <span className="text-indigo-300 font-semibold">Agent Thinking</span>

                    {/* Animated dots */}
                    {isLoading && (
                        <div className="flex gap-1 ml-2">
                            <div className="thinking-dot w-2 h-2 bg-indigo-400 rounded-full" />
                            <div className="thinking-dot w-2 h-2 bg-indigo-400 rounded-full" />
                            <div className="thinking-dot w-2 h-2 bg-indigo-400 rounded-full" />
                        </div>
                    )}

                    {/* Done badge */}
                    {!isLoading && steps.length > 0 && (
                        <span className="ml-auto text-xs text-green-400 bg-green-400/10
                             border border-green-400/20 px-2 py-0.5 rounded-full">
                            ✓ {steps.length} steps completed
                        </span>
                    )}
                </div>

                {/* Steps */}
                <div className="space-y-2">
                    {steps.map((step, i) => (
                        <div key={i} className="fade-in-up flex items-start gap-3 text-sm">
                            <span className="shrink-0 w-5 h-5 rounded-full bg-indigo-600/30
                               text-indigo-400 text-xs flex items-center justify-center
                               font-bold mt-0.5">
                                {i + 1}
                            </span>
                            <span className="text-gray-300">{step}</span>
                        </div>
                    ))}

                    {isLoading && steps.length === 0 && (
                        <div className="text-gray-500 text-sm animate-pulse">
                            Initialising research agent...
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
