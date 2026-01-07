'use client';
import { TerminalBackButton } from '@/components/ui/TerminalBackButton';

export const WritingDetailClient = ({ children }) => {
  return (
    <>
      <div className="mb-8">
        <TerminalBackButton />
      </div>
      <div>
        {children}
      </div>
    </>
  );
};

