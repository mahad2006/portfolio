'use client';
import React, { useState } from 'react';

export const CodeBlock = ({ code, language = 'javascript', title = '' }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  return (
    <div className="relative group my-6">
      {title && (
        <div className="px-4 py-2 bg-white/5 border border-white/10 border-b-0 rounded-t-lg flex items-center justify-between">
          <span className="text-xs text-gray-400 font-mono">{title}</span>
          <span className="text-[9px] text-gray-600 font-mono uppercase tracking-wider">{language}</span>
        </div>
      )}
      <div className="relative">
        <pre className={`p-6 bg-[#0a0a0a] ${title ? '' : 'rounded-t-lg'} rounded-b-lg overflow-x-auto border border-white/10 font-mono text-sm leading-relaxed`}>
          <code className="text-gray-300">{code}</code>
        </pre>

        {/* Copy Button */}
        <button
          onClick={handleCopy}
          className="absolute top-3 right-3 px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-md text-xs font-mono text-gray-400 hover:text-white transition-all opacity-0 group-hover:opacity-100 flex items-center gap-2"
          aria-label="Copy code to clipboard"
        >
          {copied ? (
            <>
              <svg className="w-4 h-4 text-[#6DB33F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-[#6DB33F]">Copied!</span>
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Copy
            </>
          )}
        </button>
      </div>

      {/* Toast Notification */}
      {copied && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[200] animate-fade-up">
          <div className="px-6 py-3 bg-[#6DB33F] text-black font-bold rounded-lg shadow-2xl flex items-center gap-3 font-mono text-sm">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            Code copied to clipboard!
          </div>
        </div>
      )}
    </div>
  );
};
