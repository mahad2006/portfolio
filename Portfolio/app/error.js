'use client'; // Error components must be Client Components

import { useEffect } from 'react';

export default function Error({ error, reset }) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error);
    }, [error]);

    return (
        <div className="min-h-screen bg-[#050505] text-red-500 font-mono flex flex-col items-center justify-center p-6 text-center">
            <div className="border border-red-900/50 bg-red-900/10 p-8 rounded-xl max-w-lg w-full shadow-2xl shadow-red-900/20 backdrop-blur-sm">
                <h2 className="text-3xl font-bold mb-4">CRITICAL_SYSTEM_FAILURE</h2>
                <p className="text-gray-400 mb-2">Error Code: 0x500_INTERNAL_SERVER_ERROR</p>
                <p className="text-sm text-red-400/60 mb-8 border-t border-b border-red-900/30 py-2">
                    {error.message || "An unexpected runtime error occurred."}
                </p>

                <button
                    onClick={reset}
                    className="px-6 py-3 bg-red-600 text-black font-bold rounded hover:bg-red-500 transition-colors uppercase tracking-widest text-sm"
                >
                    Initiate_System_Reboot
                </button>
            </div>
        </div>
    );
}