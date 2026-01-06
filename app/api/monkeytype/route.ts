/**
 * MonkeyType API Route
 * 
 * Fetches typing stats from MonkeyType API using the user's ApeKey.
 * This keeps the API key server-side only.
 */

import { NextResponse } from 'next/server';

const MONKEYTYPE_API_URL = 'https://api.monkeytype.com';
const APE_KEY = process.env.MONKEYTYPE_APE_KEY;

export const revalidate = 3600; // Cache for 1 hour

export async function GET() {
  try {
    // If no API key, return cached/fallback data
    if (!APE_KEY) {
      return NextResponse.json({
        success: true,
        cached: true,
        data: getFallbackData(),
      });
    }

    // Fetch user stats
    const [statsRes, personalBestsRes, streakRes] = await Promise.all([
      fetch(`${MONKEYTYPE_API_URL}/users/stats`, {
        headers: { Authorization: `ApeKey ${APE_KEY}` },
        next: { revalidate: 3600 },
      }),
      fetch(`${MONKEYTYPE_API_URL}/users/personalBests?mode=time&mode2=60`, {
        headers: { Authorization: `ApeKey ${APE_KEY}` },
        next: { revalidate: 3600 },
      }),
      fetch(`${MONKEYTYPE_API_URL}/users/streak`, {
        headers: { Authorization: `ApeKey ${APE_KEY}` },
        next: { revalidate: 3600 },
      }),
    ]);

    const stats = await statsRes.json();
    const personalBests = await personalBestsRes.json();
    const streak = await streakRes.json();

    // Calculate time typing in hours
    const timeTypingHours = stats.data?.timeTyping 
      ? Math.floor(stats.data.timeTyping / 3600) 
      : 0;

    // Get best 60-second WPM from personal bests
    let bestWpm60 = 0;
    let bestAccuracy = 0;
    
    if (personalBests.data && Array.isArray(personalBests.data)) {
      const best60 = personalBests.data.find((pb: any) => pb.mode2 === 60 || pb.mode2 === '60');
      if (best60) {
        bestWpm60 = Math.round(best60.wpm || 0);
        bestAccuracy = best60.acc || 0;
      }
    } else if (personalBests.data?.wpm) {
      bestWpm60 = Math.round(personalBests.data.wpm);
      bestAccuracy = personalBests.data.acc || 0;
    }

    return NextResponse.json({
      success: true,
      cached: false,
      data: {
        testsStarted: stats.data?.startedTests || 0,
        testsCompleted: stats.data?.completedTests || 0,
        timeTypingSeconds: stats.data?.timeTyping || 0,
        timeTypingHours,
        bestWpm60,
        bestAccuracy,
        currentStreak: streak.data?.length || 0,
        maxStreak: streak.data?.maxLength || 0,
      },
    });
  } catch (error) {
    console.error('MonkeyType API error:', error);
    return NextResponse.json({
      success: true,
      cached: true,
      data: getFallbackData(),
    });
  }
}

// Fallback data based on the user's actual stats from screenshots
function getFallbackData() {
  return {
    testsStarted: 60252,
    testsCompleted: 25955,
    timeTypingSeconds: 270064, // ~75 hours
    timeTypingHours: 75,
    bestWpm60: 116,
    bestAccuracy: 95,
    currentStreak: 7,
    maxStreak: 7,
    // Personal bests from screenshots
    personalBests: {
      '15': { wpm: 138, acc: 100 },
      '30': { wpm: 124, acc: 94 },
      '60': { wpm: 116, acc: 95 },
      '120': { wpm: 108, acc: 93 },
    },
    leaderboard: {
      '15sec': { rank: 55991, percentile: 11.89 },
      '60sec': { rank: 44879, percentile: 9.7 },
    },
  };
}
