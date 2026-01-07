import React from 'react';
import { getAllMetrics, getTotalCodingProblems } from '@/lib/metrics';
import { PageTemplate } from '@/components/layout/PageTemplate';
import { StatCard } from '@/components/stats/StatCard';
import {
  SiGithub,
  SiLeetcode,
} from 'react-icons/si';

export const metadata = {
  title: 'Live Stats & Metrics',
  description: 'Real-time performance metrics from GitHub, LeetCode, MonkeyType, and GeeksForGeeks',
};

export default async function StatsPage() {
  const metrics = await getAllMetrics();
  const totalCodingProblems = getTotalCodingProblems(metrics);

  return (
    <PageTemplate
      title={<>Live<span className="text-primary">_</span>Metrics</>}
      description="Real-time stats synced from GitHub, LeetCode, MonkeyType, and GeeksForGeeks"
      headerTag="PERFORMANCE_DASHBOARD"
      maxWidth="page"
    >
      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">

        {/* Featured: Total Coding Problems */}
        <StatCard
          title="Total Coding Problems"
          value={totalCodingProblems}
          subtitle={`LeetCode: ${metrics.leetcode?.totalSolved || 0} • GFG: ${metrics.gfg?.totalSolved || 0}`}
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
          }
          color="#6DB33F"
          size="large"
          delay={0}
        />

        {/* GitHub Stars */}
        <StatCard
          title="GitHub Stars"
          value={metrics.github?.stars || 0}
          subtitle="Across all repositories"
          icon={<SiGithub className="w-6 h-6" />}
          color="#6DB33F"
          delay={0.1}
        />

        {/* GitHub Contributions */}
        <StatCard
          title="GitHub Contributions"
          value={metrics.github?.contributions || 0}
          subtitle="This year"
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          }
          color="#6DB33F"
          delay={0.2}
        />

        {/* LeetCode Easy */}
        <StatCard
          title="LeetCode Easy"
          value={metrics.leetcode?.easySolved || 0}
          icon={<SiLeetcode className="w-6 h-6" />}
          color="#00b8a3"
          delay={0.3}
        />

        {/* LeetCode Medium */}
        <StatCard
          title="LeetCode Medium"
          value={metrics.leetcode?.mediumSolved || 0}
          icon={<SiLeetcode className="w-6 h-6" />}
          color="#ffa116"
          delay={0.4}
        />

        {/* LeetCode Hard */}
        <StatCard
          title="LeetCode Hard"
          value={metrics.leetcode?.hardSolved || 0}
          icon={<SiLeetcode className="w-6 h-6" />}
          color="#ef4743"
          delay={0.5}
        />

        {/* MonkeyType 60s */}
        <StatCard
          title="Typing Speed (60s)"
          value={metrics.monkeytype?.best60s || 0}
          suffix="WPM"
          subtitle="MonkeyType Personal Best"
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          }
          color="#e2b714"
          delay={0.6}
        />

        {/* GitHub Followers */}
        <StatCard
          title="GitHub Followers"
          value={metrics.github?.followers || 0}
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          }
          color="#6DB33F"
          delay={0.7}
        />

        {/* Public Repositories */}
        <StatCard
          title="Public Repositories"
          value={metrics.github?.repos || 0}
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
            </svg>
          }
          color="#6DB33F"
          delay={0.8}
        />

        {/* GFG Problems */}
        <StatCard
          title="GeeksForGeeks"
          value={metrics.gfg?.totalSolved || 0}
          subtitle="Problems Solved"
          icon={
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M21.45 17.98c0 2.66-1.76 4.48-4.42 4.48H4.55C1.89 22.46.13 20.64.13 17.98V6.54c0-2.66 1.76-4.48 4.42-4.48h12.48c2.66 0 4.42 1.82 4.42 4.48v11.44zm-16.9-5.68c-.09.09-.09.23 0 .32l3.77 3.77c.09.09.23.09.32 0l7.97-7.97c.09-.09.09-.23 0-.32l-1.06-1.06c-.09-.09-.23-.09-.32 0l-6.59 6.59-2.39-2.39c-.09-.09-.23-.09-.32 0l-1.38 1.06z" />
            </svg>
          }
          color="#2f8d46"
          delay={0.9}
        />

        {/* MonkeyType 30s */}
        <StatCard
          title="Typing Speed (30s)"
          value={metrics.monkeytype?.best30s || 0}
          suffix="WPM"
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
          color="#e2b714"
          delay={1.0}
        />

        {/* LeetCode Ranking */}
        <StatCard
          title="LeetCode Ranking"
          value={metrics.leetcode?.ranking || 0}
          subtitle="Global Position"
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
          color="#ffa116"
          delay={1.1}
        />
      </div>

      {/* Last Updated */}
      <div className="mt-8 text-center">
        <p className="text-xs text-gray-500">
          Last synced: {new Date(metrics.lastUpdated).toLocaleString()} • Updates hourly
        </p>
      </div>
    </PageTemplate>
  );
}
