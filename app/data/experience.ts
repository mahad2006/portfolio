/**
 * Experience Data
 * 
 * Centralized experience/timeline information.
 * Import from '@/data/experience' throughout the app.
 */

// ============================================================================
// Experience Timeline Items
// ============================================================================

export const EXPERIENCE_ITEMS = [
  {
    id: 'ubit-hub',
    title: 'Founder & Mentor',
    organization: 'The UBIT Hub',
    period: 'Present',
    isCurrent: true,
    isHighlighted: true,
    description: 'Established a student community to bridge the gap between academic theory and engineering reality.',
    achievements: [
      'Mentoring peers in engineering discipline and technical growth.',
      'Curated the "DSA Roadmap" now used by juniors for interview prep.',
    ],
    link: '/community',
    linkText: 'View Community Details',
  },
  {
    id: 'ubit-education',
    title: 'Software Engineering Undergraduate',
    organization: 'UBIT, University of Karachi',
    period: '2025 - 2028',
    isCurrent: false,
    isHighlighted: false,
    description: 'Focusing on Data Structures, Algorithms, and Distributed Systems. Transitioned from building native Android apps to engineering robust backend architectures.',
    achievements: [],
    link: null,
    linkText: null,
  },
];

// ============================================================================
// Section Metadata
// ============================================================================

export const EXPERIENCE_SECTION = {
  title: 'Impact & Leadership',
  sectionNumber: '06',
};

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Get highlighted (current/featured) experience items
 */
export const getHighlightedExperience = () => 
  EXPERIENCE_ITEMS.filter(item => item.isHighlighted);

/**
 * Get current positions
 */
export const getCurrentPositions = () => 
  EXPERIENCE_ITEMS.filter(item => item.isCurrent);
