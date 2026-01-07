/**
 * Dynamic Metrics Fetcher for Stats Page
 * 
 * Fetches real-time stats from GitHub, LeetCode, MonkeyType, and GeeksForGeeks
 * with proper error handling and caching.
 */

import { unstable_cache } from 'next/cache';

// ============================================================================
// Type Definitions
// ============================================================================

export interface GitHubStats {
    stars: number;
    repos: number;
    followers: number;
    contributions: number;
}

export interface LeetCodeStats {
    totalSolved: number;
    easySolved: number;
    mediumSolved: number;
    hardSolved: number;
    ranking: number;
}

export interface MonkeyTypeStats {
    best60s: number;
    best30s: number;
    best15s: number;
}

export interface GFGStats {
    totalSolved: number;
    monthlySolved: number;
}

export interface AllMetrics {
    github: GitHubStats | null;
    leetcode: LeetCodeStats | null;
    monkeytype: MonkeyTypeStats | null;
    gfg: GFGStats | null;
    lastUpdated: string;
}

// ============================================================================
// Fallback Values (Last Known Good Data)
// ============================================================================

const FALLBACK_GITHUB: GitHubStats = {
    stars: 45,
    repos: 28,
    followers: 127,
    contributions: 1526,
};

const FALLBACK_LEETCODE: LeetCodeStats = {
    totalSolved: 231,
    easySolved: 95,
    mediumSolved: 116,
    hardSolved: 20,
    ranking: 125000,
};

const FALLBACK_MONKEYTYPE: MonkeyTypeStats = {
    best60s: 118,
    best30s: 135,
    best15s: 152,
};

const FALLBACK_GFG: GFGStats = {
    totalSolved: 89,
    monthlySolved: 12,
};

// ============================================================================
// GitHub Stats Fetcher
// ============================================================================

async function fetchGitHubStats(): Promise<GitHubStats | null> {
    try {
        const token = process.env.GITHUB_TOKEN;
        if (!token) {
            console.warn('GITHUB_TOKEN not found, using fallback');
            return FALLBACK_GITHUB;
        }

        const response = await fetch('https://api.github.com/graphql', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: `
          query {
            viewer {
              repositories(first: 100, ownerAffiliations: OWNER) {
                totalCount
                nodes {
                  stargazerCount
                }
              }
              followers {
                totalCount
              }
              contributionsCollection {
                contributionCalendar {
                  totalContributions
                }
              }
            }
          }
        `,
            }),
            next: { revalidate: 3600 }, // Cache for 1 hour
        });

        if (!response.ok) {
            throw new Error(`GitHub API error: ${response.status}`);
        }

        const data = await response.json();
        const viewer = data.data.viewer;

        const totalStars = viewer.repositories.nodes.reduce(
            (sum: number, repo: { stargazerCount: number }) => sum + repo.stargazerCount,
            0
        );

        return {
            stars: totalStars,
            repos: viewer.repositories.totalCount,
            followers: viewer.followers.totalCount,
            contributions: viewer.contributionsCollection.contributionCalendar.totalContributions,
        };
    } catch (error) {
        console.error('GitHub fetch failed:', error);
        return FALLBACK_GITHUB;
    }
}

// ============================================================================
// LeetCode Stats Fetcher
// ============================================================================

async function fetchLeetCodeStats(): Promise<LeetCodeStats | null> {
    try {
        const username = process.env.LEETCODE_USERNAME || 'mahad2006';

        const response = await fetch('https://leetcode.com/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: `
          query getUserProfile($username: String!) {
            matchedUser(username: $username) {
              submitStats {
                acSubmissionNum {
                  difficulty
                  count
                }
              }
              profile {
                ranking
              }
            }
          }
        `,
                variables: { username },
            }),
            next: { revalidate: 3600 },
        });

        if (!response.ok) {
            throw new Error(`LeetCode API error: ${response.status}`);
        }

        const data = await response.json();
        const stats = data.data.matchedUser.submitStats.acSubmissionNum;

        const allSolved = stats.find((s: any) => s.difficulty === 'All')?.count || 0;
        const easySolved = stats.find((s: any) => s.difficulty === 'Easy')?.count || 0;
        const mediumSolved = stats.find((s: any) => s.difficulty === 'Medium')?.count || 0;
        const hardSolved = stats.find((s: any) => s.difficulty === 'Hard')?.count || 0;

        return {
            totalSolved: allSolved,
            easySolved,
            mediumSolved,
            hardSolved,
            ranking: data.data.matchedUser.profile.ranking || 0,
        };
    } catch (error) {
        console.error('LeetCode fetch failed:', error);
        return FALLBACK_LEETCODE;
    }
}

// ============================================================================
// MonkeyType Stats Fetcher
// ============================================================================

async function fetchMonkeyTypeStats(): Promise<MonkeyTypeStats | null> {
    try {
        const apiKey = process.env.MONKEYTYPE_API_KEY;
        if (!apiKey) {
            console.warn('MONKEYTYPE_API_KEY not found, using fallback');
            return FALLBACK_MONKEYTYPE;
        }

        // MonkeyType API endpoint for personal bests
        const response = await fetch('https://api.monkeytype.com/users/personalBests', {
            headers: {
                'Authorization': `Bearer ${apiKey}`,
            },
            next: { revalidate: 3600 },
        });

        if (!response.ok) {
            throw new Error(`MonkeyType API error: ${response.status}`);
        }

        const data = await response.json();

        // Extract best WPM for different durations
        const best60s = data.data?.time?.[60]?.[0]?.wpm || FALLBACK_MONKEYTYPE.best60s;
        const best30s = data.data?.time?.[30]?.[0]?.wpm || FALLBACK_MONKEYTYPE.best30s;
        const best15s = data.data?.time?.[15]?.[0]?.wpm || FALLBACK_MONKEYTYPE.best15s;

        return {
            best60s: Math.round(best60s),
            best30s: Math.round(best30s),
            best15s: Math.round(best15s),
        };
    } catch (error) {
        console.error('MonkeyType fetch failed:', error);
        return FALLBACK_MONKEYTYPE;
    }
}

// ============================================================================
// GeeksForGeeks Stats Fetcher
// ============================================================================

async function fetchGFGStats(): Promise<GFGStats | null> {
    try {
        const username = process.env.GFG_USERNAME || 'mahad';

        const response = await fetch(
            `https://geeks-for-geeks-stats-api.vercel.app/?userName=${username}`,
            {
                next: { revalidate: 3600 },
            }
        );

        if (!response.ok) {
            throw new Error(`GFG API error: ${response.status}`);
        }

        const data = await response.json();

        return {
            totalSolved: parseInt(data.totalProblemsSolved || '0', 10),
            monthlySolved: parseInt(data.monthlySolved || '0', 10),
        };
    } catch (error) {
        console.error('GFG fetch failed:', error);
        return FALLBACK_GFG;
    }
}

// ============================================================================
// Main Metrics Aggregator (Cached)
// ============================================================================

export const getAllMetrics = unstable_cache(
    async (): Promise<AllMetrics> => {
        const [github, leetcode, monkeytype, gfg] = await Promise.allSettled([
            fetchGitHubStats(),
            fetchLeetCodeStats(),
            fetchMonkeyTypeStats(),
            fetchGFGStats(),
        ]);

        return {
            github: github.status === 'fulfilled' ? github.value : FALLBACK_GITHUB,
            leetcode: leetcode.status === 'fulfilled' ? leetcode.value : FALLBACK_LEETCODE,
            monkeytype: monkeytype.status === 'fulfilled' ? monkeytype.value : FALLBACK_MONKEYTYPE,
            gfg: gfg.status === 'fulfilled' ? gfg.value : FALLBACK_GFG,
            lastUpdated: new Date().toISOString(),
        };
    },
    ['all-metrics'],
    {
        revalidate: 3600, // Revalidate every hour
        tags: ['metrics'],
    }
);

// Helper: Get total coding problems solved across all platforms
export function getTotalCodingProblems(metrics: AllMetrics): number {
    const leetcodeTotal = metrics.leetcode?.totalSolved || 0;
    const gfgTotal = metrics.gfg?.totalSolved || 0;
    return leetcodeTotal + gfgTotal;
}
