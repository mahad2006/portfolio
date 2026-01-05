'use client';
import React from 'react';

export const ArchitectureDiagram = ({ projectSlug }) => {
  const diagrams = {
    'scalable-ecommerce': (
      <div className="flex flex-col items-center gap-8 py-8">
        <div className="flex items-center gap-8 flex-wrap justify-center">
          {/* Client */}
          <div className="flex flex-col items-center">
            <div className="px-8 py-6 bg-white/5 border-2 border-white/20 rounded-lg font-mono text-sm font-bold hover:border-[#6DB33F]/50 transition-all">
              Client
            </div>
          </div>

          {/* Arrow */}
          <svg className="w-12 h-8 text-[#6DB33F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>

          {/* Redis Cache */}
          <div className="flex flex-col items-center">
            <div className="px-8 py-6 bg-[#E76F00]/10 border-2 border-[#E76F00]/40 rounded-lg font-mono text-sm font-bold text-[#E76F00] hover:border-[#E76F00] transition-all">
              Redis Cache
            </div>
            <span className="text-xs text-gray-500 mt-2 font-mono">Write-Through</span>
          </div>

          {/* Arrow */}
          <svg className="w-12 h-8 text-[#6DB33F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>

          {/* PostgreSQL */}
          <div className="flex flex-col items-center">
            <div className="px-8 py-6 bg-[#6DB33F]/10 border-2 border-[#6DB33F]/40 rounded-lg font-mono text-sm font-bold text-[#6DB33F] hover:border-[#6DB33F] transition-all">
              PostgreSQL
            </div>
            <span className="text-xs text-gray-500 mt-2 font-mono">Source of Truth</span>
          </div>
        </div>

        {/* Additional Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-3xl mt-4">
          <div className="p-4 bg-white/[0.02] border border-white/5 rounded-lg">
            <div className="text-[10px] text-[#6DB33F] font-mono uppercase tracking-wider mb-1">Cache Hit Ratio</div>
            <div className="text-2xl font-bold">70%</div>
          </div>
          <div className="p-4 bg-white/[0.02] border border-white/5 rounded-lg">
            <div className="text-[10px] text-[#E76F00] font-mono uppercase tracking-wider mb-1">Latency Reduction</div>
            <div className="text-2xl font-bold">45%</div>
          </div>
          <div className="p-4 bg-white/[0.02] border border-white/5 rounded-lg">
            <div className="text-[10px] text-gray-400 font-mono uppercase tracking-wider mb-1">Throughput</div>
            <div className="text-2xl font-bold">12k rps</div>
          </div>
        </div>
      </div>
    ),
    'derivify-calculus': (
      <div className="flex flex-col items-center gap-8 py-8">
        <div className="flex items-center gap-8 flex-wrap justify-center">
          {/* User Input */}
          <div className="flex flex-col items-center">
            <div className="px-8 py-6 bg-white/5 border-2 border-white/20 rounded-lg font-mono text-sm font-bold">
              User Input
            </div>
            <span className="text-xs text-gray-500 mt-2 font-mono">Expression</span>
          </div>

          {/* Arrow */}
          <svg className="w-12 h-8 text-[#6DB33F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>

          {/* Lexer */}
          <div className="flex flex-col items-center">
            <div className="px-8 py-6 bg-[#E76F00]/10 border-2 border-[#E76F00]/40 rounded-lg font-mono text-sm font-bold text-[#E76F00]">
              Lexer
            </div>
            <span className="text-xs text-gray-500 mt-2 font-mono">Tokenization</span>
          </div>

          {/* Arrow */}
          <svg className="w-12 h-8 text-[#6DB33F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>

          {/* Parser */}
          <div className="flex flex-col items-center">
            <div className="px-8 py-6 bg-[#6DB33F]/10 border-2 border-[#6DB33F]/40 rounded-lg font-mono text-sm font-bold text-[#6DB33F]">
              Parser
            </div>
            <span className="text-xs text-gray-500 mt-2 font-mono">AST Generation</span>
          </div>

          {/* Arrow */}
          <svg className="w-12 h-8 text-[#6DB33F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>

          {/* Result */}
          <div className="flex flex-col items-center">
            <div className="px-8 py-6 bg-white/5 border-2 border-white/20 rounded-lg font-mono text-sm font-bold">
              Result
            </div>
            <span className="text-xs text-gray-500 mt-2 font-mono">Offline</span>
          </div>
        </div>
      </div>
    ),
    'distributed-caching': (
      <div className="flex flex-col items-center gap-8 py-8">
        <div className="flex flex-col items-center gap-8">
          {/* Request Flow */}
          <div className="flex items-center gap-8 flex-wrap justify-center">
            <div className="px-8 py-6 bg-white/5 border-2 border-white/20 rounded-lg font-mono text-sm font-bold">
              Request
            </div>
            <svg className="w-12 h-8 text-[#6DB33F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
            <div className="px-8 py-6 bg-[#E76F00]/10 border-2 border-[#E76F00]/40 rounded-lg font-mono text-sm font-bold text-[#E76F00]">
              Cache Check
            </div>
          </div>

          {/* Branching Path */}
          <div className="flex gap-16">
            <div className="flex flex-col items-center">
              <div className="text-xs text-[#6DB33F] font-mono mb-4">HIT (89%)</div>
              <div className="px-8 py-6 bg-[#6DB33F]/10 border-2 border-[#6DB33F]/40 rounded-lg font-mono text-sm font-bold text-[#6DB33F]">
                Return Cached
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-xs text-gray-500 font-mono mb-4">MISS (11%)</div>
              <div className="px-8 py-6 bg-white/5 border-2 border-white/20 rounded-lg font-mono text-sm font-bold">
                Query DB
              </div>
              <svg className="w-8 h-12 text-gray-400 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
              <div className="px-6 py-4 bg-[#E76F00]/10 border border-[#E76F00]/40 rounded font-mono text-xs text-[#E76F00]">
                Update Cache
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  };

  return diagrams[projectSlug] || null;
};
