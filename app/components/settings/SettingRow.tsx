import React from 'react';

interface SettingRowProps {
  label: string;
  description?: string;
  children?: React.ReactNode;
  preview?: React.ReactNode;
}

export const SettingRow = ({ label, description, children, preview }: SettingRowProps) => (
  <div className="group py-5 border-b border-white/4 last:border-0 last:pb-0 first:pt-0">
    <div className="flex items-center justify-between gap-6">
      <div className="flex-1 min-w-0">
        <h3 className="text-white font-medium text-[15px] mb-1 group-hover:text-primary transition-colors">{label}</h3>
        {description && <p className="text-xs text-gray-500 leading-relaxed">{description}</p>}
      </div>
      <div className="flex items-center gap-3 shrink-0">
        {children}
      </div>
    </div>
    {preview && (
      <div className="mt-4 p-4 rounded-xl bg-black/30 border border-white/4">
        {preview}
      </div>
    )}
  </div>
);
