'use client';
import React, { useState, useEffect } from 'react';
import { PageTemplate } from '@/components/layout/PageTemplate';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import SpotlightCard from '@/components/ui/SpotlightCard';
import { TYPING_STATS, CP_STATS, GITHUB_STATS } from '@/data/profile';
import {
  BoltIcon,
  TrophyIcon,
  ClockIcon,
  ChartBarIcon,
  CheckBadgeIcon,
  ArrowTopRightOnSquareIcon,
  FireIcon,
  StarIcon,
  DocumentCheckIcon,
} from '@heroicons/react/24/solid';
import {
  ArrowRightIcon,
} from '@heroicons/react/24/outline';
import { SiLeetcode, SiCodeforces, SiGeeksforgeeks, SiMonkeytype, SiGithub } from 'react-icons/si';

// Crown icon for Personal Bests
const CrownIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zm14 3c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1v-1h14v1z"/>
  </svg>
);

// Verified link with accent border
const VerifyLink = ({ url, label }) => (
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

// Simple stat card - NO spotlight effect (basic card)
const StatCard = ({ icon: Icon, label, value, suffix = '', subtext }: { icon: React.ElementType; label: string; value: React.ReactNode; suffix?: string; subtext?: string }) => (
  <div className="p-6 rounded-xl bg-surface border border-white/10 hover:border-white/20 transition-colors">
    <div className="flex items-center gap-3 mb-3">
      <Icon className="w-5 h-5 text-gray-500" />
      <span className="text-xs text-gray-500 uppercase tracking-wider">{label}</span>
    </div>
    <div className="text-3xl font-bold text-white">
      {value}{suffix && <span className="text-lg text-gray-500 ml-1">{suffix}</span>}
    </div>
    {subtext && <div className="text-xs text-gray-600 mt-2">{subtext}</div>}
  </div>
);

// Platform link - NO spotlight (basic card), arrow gray -> accent on hover
const PlatformLink = ({ name, url, detail, icon: Icon }) => (
  <a
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    className="group flex items-center justify-between p-4 rounded-xl bg-surface border border-white/10 hover:border-white/20 transition-all"
  >
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
        <Icon className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors" />
      </div>
      <div>
        <div className="text-sm font-semibold text-white group-hover:text-primary transition-colors">{name}</div>
        <div className="text-xs text-gray-500">{detail}</div>
      </div>
    </div>
    <ArrowRightIcon className="w-4 h-4 text-gray-500 group-hover:text-primary group-hover:translate-x-1 transition-all" />
  </a>
);

export default function StatsPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <PageTemplate 
      title={<>Performance<span className="text-primary">_</span>Metrics</>}
      description="Verified stats from MonkeyType, LeetCode, Codeforces & GitHub"
      headerTag="STATS"
      maxWidth="page"
    >
      {/* ═══════════════════════════════════════════════════════════════════
          TYPING SPEED SECTION
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="mb-20">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-surface border border-white/10 flex items-center justify-center">
              <BoltIcon className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Typing Speed</h2>
              <p className="text-xs text-gray-500">Personal Bests on MonkeyType</p>
            </div>
          </div>
          <VerifyLink url={TYPING_STATS.profileUrl} label="Verify" />
        </div>

        {/* Personal Bests - MAIN CARDS with spotlight effect */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {Object.entries(TYPING_STATS.personalBests).map(([duration, data]) => (
            <SpotlightCard
              key={duration} 
              className="rounded-xl bg-surface border border-white/10 hover:border-primary/30 transition-colors"
            >
              <div className="relative p-6">
                {/* Crown badge */}
                <div className="absolute top-4 right-4 flex items-center gap-1 px-2 py-1 rounded-full bg-amber-500/10 border border-amber-500/30">
                  <CrownIcon className="w-3.5 h-3.5 text-amber-500" />
                  <span className="text-[10px] font-bold text-amber-500">PB</span>
                </div>
                
                <div className="text-xs text-gray-500 uppercase tracking-wider mb-3">{duration}s</div>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-4xl font-bold text-white">
                    {mounted ? <AnimatedCounter target={data.wpm} /> : data.wpm}
                  </span>
                  <span className="text-sm text-gray-500">WPM</span>
                </div>
                <div className="text-xs text-gray-600">{data.accuracy}% accuracy</div>
              </div>
            </SpotlightCard>
          ))}
        </div>

        {/* Typing Stats Row - basic cards, no spotlight */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <StatCard 
            icon={DocumentCheckIcon} 
            label="Tests Completed" 
            value={mounted ? <AnimatedCounter target={TYPING_STATS.testsCompleted} /> : TYPING_STATS.testsCompleted} 
          />
          <StatCard 
            icon={ClockIcon} 
            label="Time Typing" 
            value={TYPING_STATS.timeTypingHours} 
            suffix="hrs"
          />
          <StatCard 
            icon={TrophyIcon} 
            label="Leaderboard" 
            value={`Top ${TYPING_STATS.leaderboard['60sec'].topPercent}%`}
            subtext="60 second mode"
          />
        </div>

        {/* MonkeyType Link - MAIN CARD with spotlight */}
        <SpotlightCard className="rounded-xl bg-surface border border-white/10 hover:border-primary/50 transition-all">
          <a 
            href={TYPING_STATS.profileUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="group flex items-center justify-between p-6"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <SiMonkeytype className="w-6 h-6 text-primary" />
              </div>
              <div>
                <div className="text-base font-semibold text-white group-hover:text-primary transition-colors">MonkeyType Profile</div>
                <div className="text-sm text-gray-500">@CodeWithMahad1 · {TYPING_STATS.testsStarted.toLocaleString()} tests started</div>
              </div>
            </div>
            <ArrowRightIcon className="w-5 h-5 text-gray-500 group-hover:text-primary group-hover:translate-x-1 transition-all" />
          </a>
        </SpotlightCard>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          COMPETITIVE PROGRAMMING SECTION
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="mb-20">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-surface border border-white/10 flex items-center justify-center">
              <FireIcon className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Competitive Programming</h2>
              <p className="text-xs text-gray-500">LeetCode, Codeforces & More</p>
            </div>
          </div>
          <VerifyLink url={CP_STATS.profileUrls.codolio} label="Verify" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Problems Solved Card - MAIN CARD with spotlight */}
          <SpotlightCard className="lg:col-span-2 rounded-xl bg-surface border border-white/10">
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <FireIcon className="w-5 h-5 text-primary" />
                  <span className="text-sm text-gray-400 uppercase tracking-wider">Problems Solved</span>
                </div>
                <span className="px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-xs font-semibold text-primary">
                  {CP_STATS.rank}
                </span>
              </div>
              
              <div className="flex items-baseline gap-4 mb-8">
                <span className="text-7xl font-bold text-white">
                  {mounted ? <AnimatedCounter target={CP_STATS.totalProblems} /> : CP_STATS.totalProblems}
                </span>
                <span className="text-xl text-gray-500">Total</span>
              </div>

              {/* Difficulty Breakdown */}
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 rounded-lg bg-white/5 border border-white/10 text-center">
                  <div className="text-2xl font-bold text-emerald-400">{CP_STATS.breakdown.easy}</div>
                  <div className="text-xs text-gray-500 mt-1">Easy</div>
                </div>
                <div className="p-4 rounded-lg bg-white/5 border border-white/10 text-center">
                  <div className="text-2xl font-bold text-amber-400">{CP_STATS.breakdown.medium}</div>
                  <div className="text-xs text-gray-500 mt-1">Medium</div>
                </div>
                <div className="p-4 rounded-lg bg-white/5 border border-white/10 text-center">
                  <div className="text-2xl font-bold text-red-400">{CP_STATS.breakdown.hard}</div>
                  <div className="text-xs text-gray-500 mt-1">Hard</div>
                </div>
              </div>
            </div>
          </SpotlightCard>

          {/* Ratings - basic cards, no spotlight */}
          <div className="space-y-4">
            <div className="p-6 rounded-xl bg-surface border border-white/10">
              <div className="flex items-center gap-3 mb-4">
                <TrophyIcon className="w-5 h-5 text-amber-500" />
                <div>
                  <div className="text-sm font-semibold text-white">LeetCode</div>
                  <div className="text-xs text-gray-500">Contest Rating</div>
                </div>
              </div>
              <div className="text-3xl font-bold text-white">{CP_STATS.rating.leetcode}</div>
            </div>

            <div className="p-6 rounded-xl bg-surface border border-white/10">
              <div className="flex items-center gap-3 mb-4">
                <StarIcon className="w-5 h-5 text-cyan-500" />
                <div>
                  <div className="text-sm font-semibold text-white">Codeforces</div>
                  <div className="text-xs text-gray-500">{CP_STATS.rank}</div>
                </div>
              </div>
              <div className="text-3xl font-bold text-white">{CP_STATS.rating.codeforces}</div>
            </div>
          </div>
        </div>

        {/* Platform Links - basic cards, no spotlight */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <PlatformLink name="LeetCode" url={CP_STATS.profileUrls.leetcode} detail={`Rating ${CP_STATS.rating.leetcode}`} icon={SiLeetcode} />
          <PlatformLink name="Codeforces" url={CP_STATS.profileUrls.codeforces} detail={CP_STATS.rank} icon={SiCodeforces} />
          <PlatformLink name="GeeksforGeeks" url={CP_STATS.profileUrls.geeksforgeeks} detail="View Profile" icon={SiGeeksforgeeks} />
          <PlatformLink name="Codolio" url={CP_STATS.profileUrls.codolio} detail="All Stats" icon={ChartBarIcon} />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          GITHUB SECTION
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="mb-16">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-surface border border-white/10 flex items-center justify-center">
              <SiGithub className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">GitHub Activity</h2>
              <p className="text-xs text-gray-500">Open Source Contributions</p>
            </div>
          </div>
          <VerifyLink url={GITHUB_STATS.profileUrl} label="Verify" />
        </div>

        {/* GitHub Card - MAIN CARD with spotlight */}
        <SpotlightCard className="rounded-xl bg-surface border border-white/10">
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="text-sm text-gray-500 uppercase tracking-wider mb-4">Total Contributions</div>
                <div className="flex items-baseline gap-4 mb-4">
                  <span className="text-6xl font-bold text-white">
                    {mounted ? <AnimatedCounter target={GITHUB_STATS.contributions} /> : GITHUB_STATS.contributions}
                  </span>
                </div>
                <div className="text-sm text-gray-500">{GITHUB_STATS.activeDays} active days</div>
              </div>

              <a 
                href={GITHUB_STATS.profileUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="group flex items-center justify-between p-5 rounded-xl bg-white/5 border border-white/10 hover:border-primary/50 transition-all"
              >
                <div className="flex items-center gap-4">
                  <SiGithub className="w-10 h-10 text-gray-400 group-hover:text-primary transition-colors" />
                  <div>
                    <div className="text-base font-semibold text-white group-hover:text-primary transition-colors">@{GITHUB_STATS.username}</div>
                    <div className="text-sm text-gray-500">View Profile</div>
                  </div>
                </div>
                <ArrowRightIcon className="w-5 h-5 text-gray-500 group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </a>
            </div>
          </div>
        </SpotlightCard>
      </section>

      {/* Data Notice */}
      <div className="p-5 rounded-xl bg-surface border border-white/10">
        <p className="text-xs text-gray-500">
          <span className="text-gray-400 font-medium">Note:</span> Stats are manually verified and updated periodically. Click &quot;Verify&quot; to view original sources. Last updated: Jan 2026
        </p>
      </div>
    </PageTemplate>
  );
}
