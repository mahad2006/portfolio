import Link from 'next/link'

export default function NotFound() {
    return (
        <div className="min-h-screen bg-page text-white flex flex-col items-center justify-center p-4 text-center">
            <h1 className="text-9xl font-bold text-(--bg-surface) animate-pulse select-none">404</h1>

            <div className="absolute space-y-4">
                <h2 className="text-3xl md:text-4xl font-bold text-primary font-mono">System Malfunction</h2>
                <p className="text-muted max-w-md mx-auto">
                    The requested resource could not be found on this server. It might have been moved, deleted, or never existed.
                </p>

                <div className="pt-8">
                    <Link
                        href="/"
                        className="px-8 py-3 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-all inline-flex items-center gap-2"
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 12l18 0" /><path d="M3 12l6 6" /><path d="M3 12l6 -6" /></svg>
                        Return to Base
                    </Link>
                </div>
            </div>

            {/* Decorative Grid Background */}
            <div className="absolute inset-0 bg-[radial-gradient(var(--border-subtle)_1px,transparent_1px)] bg-size-[24px_24px] pointer-events-none -z-1"></div>
        </div>
    )
}
