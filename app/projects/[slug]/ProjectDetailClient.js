'use client';
import { TerminalBackButton } from '@/components/ui/TerminalBackButton';

export const ProjectDetailClient = ({ children }) => {
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

