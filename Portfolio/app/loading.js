export default function Loading() {
    return (
        <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center font-mono text-xs md:text-sm">
            <div className="w-64 space-y-2">
                {/* Loading Bar */}
                <div className="h-1 w-full bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-[#6DB33F] animate-progress origin-left"></div>
                </div>

                {/* Terminal Output */}
                <div className="text-[#6DB33F] space-y-1">
                    <p className="animate-pulse">_ initializing_system...</p>
                    <p className="text-gray-500">loading_modules: [================]</p>
                </div>
            </div>

            <style>{`
        @keyframes progress {
          0% { width: 0%; }
          50% { width: 70%; }
          100% { width: 100%; }
        }
        .animate-progress {
          animation: progress 1.5s ease-in-out infinite;
        }
      `}</style>
        </div>
    );
}