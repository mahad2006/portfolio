'use client';
import React, { useState, useEffect } from 'react';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { FadeUp } from '@/components/ui/AnimatedSection';
import { CP_STATS, GITHUB_STATS } from '@/data/profile';
import { 
  CheckBadgeIcon,
  ArrowTopRightOnSquareIcon,
} from '@heroicons/react/24/solid';
import { SiLeetcode, SiCodeforces, SiGithub } from 'react-icons/si';

const VerifyLink = ({ url, label }: { url: string; label: string }) => (
  <a
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-primary/50 hover:border-primary hover:bg-primary/10 text-xs text-gray-400 hover:text-primary transition-all"
  >
    <CheckBadgeIcon className="w-4 h-4" />
    <span>{label}</span>
    <ArrowTopRightOnSquareIcon className="w-3 h-3" />
  </a>
);

const MetricCard = ({ 
  icon: Icon, 
  label, 
  value, 
  platform, 
  verifyUrl 
}: { 
  icon: React.ElementType; 
  label: string; 
  value: React.ReactNode; 
  platform: string; 
  verifyUrl: string;
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="p-6 rounded-xl bg-surface border border-white/10 hover:border-primary/30 transition-all group">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Icon className="w-5 h-5 text-primary" />
          </div>
          <div>
            <div className="text-xs text-gray-500 uppercase tracking-wider">{label}</div>
            <div className="text-xs text-gray-600">{platform}</div>
          </div>
        </div>
      </div>
      <div className="text-3xl font-bold text-white mb-3">
        {mounted ? value : '—'}
      </div>
      <VerifyLink url={verifyUrl} label="Verify Profile" />
    </div>
  );
};

export const VerifiedMetrics = () => {
  return (
    <section id="metrics" className="py-24 relative bg-black/20 border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6">
        <FadeUp>
          <div className="mb-12 text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">
              <span className="text-primary mono text-2xl">05.</span> Verified Metrics
            </h2>
            <p className="text-gray-400">
              Real, verifiable stats from competitive programming and open-source contributions.
            </p>
          </div>
        </FadeUp>

        <FadeUp delay={0.2}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <MetricCard
              icon={SiLeetcode}
              label="LeetCode Rating"
              value={<AnimatedCounter target={CP_STATS.rating.leetcode} />}
              platform="LeetCode"
              verifyUrl={CP_STATS.profileUrls.leetcode}
            />
            <MetricCard
              icon={SiCodeforces}
              label="Problems Solved"
              value={<AnimatedCounter target={CP_STATS.totalProblems} />}
              platform="Competitive Programming"
              verifyUrl={CP_STATS.profileUrls.codolio}
            />
            <MetricCard
              icon={SiGithub}
              label="Contributions"
              value={<AnimatedCounter target={GITHUB_STATS.contributions} />}
              platform="GitHub"
              verifyUrl={GITHUB_STATS.profileUrl}
            />
          </div>
        </FadeUp>
      </div>
    </section>
  );
};
