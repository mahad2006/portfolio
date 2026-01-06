'use client';
import React from 'react';

export const PrintStyles = () => (
  <style>{`
    @media print {
      body { background: white !important; color: black !important; }
      nav, footer, .animate-blob, button { display: none !important; }
      .glass-panel { background: none !important; border: 1px solid #ccc !important; box-shadow: none !important; color: black !important; }
      h1, h2, h3, p, span { color: black !important; text-shadow: none !important; }
      a { text-decoration: underline; color: black !important; }
    }
  `}</style>
);

