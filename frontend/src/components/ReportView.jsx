import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useState } from "react";

export default function ReportView({ report, topic }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(report);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleDownload = () => {
        const blob = new Blob([report], { type: "text/markdown" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${topic.replace(/\s+/g, "_")}_report.md`;
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className="w-full max-w-3xl mx-auto mt-8 fade-in-up">

            {/* Report toolbar */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <span className="text-green-400 font-semibold text-sm">
                        Research Complete
                    </span>
                </div>

                <div className="flex gap-2">
                    {/* Copy button */}
                    <button
                        onClick={handleCopy}
                        className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white
                       bg-[#1a1a2e] hover:bg-[#1e1e3f] border border-gray-700
                       hover:border-gray-500 px-3 py-1.5 rounded-lg transition-all duration-200"
                    >
                        {copied ? (
                            <>
                                <svg className="w-3.5 h-3.5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                Copied!
                            </>
                        ) : (
                            <>
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                        d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1
                       M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg>
                                Copy
                            </>
                        )}
                    </button>

                    {/* Download button */}
                    <button
                        onClick={handleDownload}
                        className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white
                       bg-[#1a1a2e] hover:bg-[#1e1e3f] border border-gray-700
                       hover:border-gray-500 px-3 py-1.5 rounded-lg transition-all duration-200"
                    >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        Download
                    </button>
                </div>
            </div>

            {/* Report content */}
            <div className="bg-[#0f0f1a] border border-gray-800 rounded-2xl p-8">
                <div className="prose prose-invert prose-indigo max-w-none
                        prose-headings:font-bold
                        prose-h1:text-2xl prose-h1:text-indigo-300
                        prose-h2:text-xl prose-h2:text-indigo-200
                        prose-h2:border-b prose-h2:border-gray-700 prose-h2:pb-2
                        prose-h3:text-lg prose-h3:text-gray-200
                        prose-p:text-gray-300 prose-p:leading-relaxed
                        prose-li:text-gray-300
                        prose-strong:text-white
                        prose-a:text-indigo-400 prose-a:no-underline
                        hover:prose-a:underline
                        prose-blockquote:border-indigo-500 prose-blockquote:text-gray-400
                        prose-code:text-indigo-300 prose-code:bg-indigo-950/50
                        prose-code:px-1 prose-code:rounded">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {report}
                    </ReactMarkdown>
                </div>
            </div>
        </div>
    );
}