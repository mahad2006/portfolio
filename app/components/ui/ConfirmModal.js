'use client';
import React from 'react';

export const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message, confirmText = 'Yes', cancelText = 'No', danger = false }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md" />
      
      {/* Modal */}
      <div
        className="relative card-base rounded-2xl p-8 max-w-md w-full animate-fade-up"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <h2 id="modal-title" className="text-2xl font-bold text-white mb-4">
          {title}
        </h2>
        <p className="text-gray-400 mb-8 leading-relaxed">
          {message}
        </p>
        
        <div className="flex gap-4 justify-end">
          <button
            onClick={onClose}
            className="px-6 py-3 bg-white/5 border border-white/10 rounded-lg text-white font-medium hover:bg-white/10 transition-colors"
          >
            {cancelText}
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              danger
                ? 'bg-red-500/20 border border-red-500/50 text-red-400 hover:bg-red-500/30 hover:border-red-500'
                : 'bg-primary text-black hover:opacity-90'
            }`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

