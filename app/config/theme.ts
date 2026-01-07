/**
 * Theme Configuration
 * 
 * Centralized color definitions, accent colors, and brand colors.
 * Import from '@/config/theme' throughout the app.
 * 
 * Note: CSS variables in globals.css should reference these values.
 * For Tailwind arbitrary values, use the hex codes directly.
 */

// ============================================================================
// Base Colors (Backgrounds & Surfaces)
// ============================================================================

export const BASE_COLORS = {
  /** Main page background - near black */
  page: '#050505',
  
  /** Page background RGB values (for rgba usage) */
  pageRgb: '5, 5, 5',
  
  /** Card/surface background */
  surface: '#141414',
  
  /** Surface hover state */
  surfaceHover: '#1A1A1A',
  
  /** Darker surface variant (scrollbar, impacts) */
  surfaceDark: '#0a0a0a',
  
  /** Modal/overlay background */
  modal: '#0d0d0d',
  
  /** Section alternate background */
  sectionAlt: '#080808',
  
  /** Subtle border color */
  borderSubtle: 'rgba(255, 255, 255, 0.08)',
  
  /** Card shadow */
  shadowCard: '0 8px 30px rgba(0, 0, 0, 0.5)',
  
  /** Card shadow on hover */
  shadowCardHover: '0 12px 40px rgba(0, 0, 0, 0.6)',
} as const;

// ============================================================================
// Brand Colors (Primary & Secondary)
// ============================================================================

export const BRAND_COLORS = {
  /** Primary brand color (Spring Boot green) */
  primary: '#6DB33F',
  primaryRgb: '109, 179, 63',
  
  /** Primary hover state (darker green) */
  primaryHover: '#5aa035',
  
  /** Secondary brand color (Java orange) */
  secondary: '#E76F00',
  secondaryRgb: '231, 111, 0',
  
  /** Text colors */
  textMain: '#e5e5e5',
  textMuted: '#a3a3a3',
  textSubtle: '#666666',
} as const;

// ============================================================================
// Accent Colors (User-selectable theme colors)
// ============================================================================

/**
 * Unified accent color definitions
 * Used in: Settings page, Command Palette, Settings Modal
 * 
 * Structure:
 * - id: Unique identifier (used for data attributes)
 * - value: Hex color code (for inline styles)
 * - rgb: RGB values (for rgba usage)
 * - label: Display name
 * - labelFull: Extended description (optional)
 */
export const ACCENT_COLORS = [
  // Greens
  {
    id: 'emerald',
    value: '#10b981',
    rgb: '16, 185, 129',
    label: 'Emerald',
    labelFull: 'Emerald Green',
  },
  {
    id: 'spring',
    value: '#6DB33F',
    rgb: '109, 179, 63',
    label: 'Spring',
    labelFull: 'Spring Boot',
  },
  // Blues
  {
    id: 'cyan',
    value: '#06b6d4',
    rgb: '6, 182, 212',
    label: 'Cyan',
    labelFull: 'Electric Cyan',
  },
  {
    id: 'sky',
    value: '#0ea5e9',
    rgb: '14, 165, 233',
    label: 'Sky',
    labelFull: 'Sky Blue',
  },
  {
    id: 'indigo',
    value: '#6366f1',
    rgb: '99, 102, 241',
    label: 'Indigo',
    labelFull: 'Deep Indigo',
  },
  // Purples & Pinks
  {
    id: 'violet',
    value: '#8b5cf6',
    rgb: '139, 92, 246',
    label: 'Violet',
    labelFull: 'Electric Violet',
  },
  {
    id: 'fuchsia',
    value: '#d946ef',
    rgb: '217, 70, 239',
    label: 'Fuchsia',
    labelFull: 'Neon Fuchsia',
  },
  {
    id: 'rose',
    value: '#f43f5e',
    rgb: '244, 63, 94',
    label: 'Rose',
    labelFull: 'Rose Red',
  },
  // Warm Tones
  {
    id: 'orange',
    value: '#f97316',
    rgb: '249, 115, 22',
    label: 'Orange',
    labelFull: 'Vibrant Orange',
  },
  {
    id: 'amber',
    value: '#f59e0b',
    rgb: '245, 158, 11',
    label: 'Amber',
    labelFull: 'Golden Amber',
  },
  // Neutrals
  {
    id: 'zinc',
    value: '#a1a1aa',
    rgb: '161, 161, 170',
    label: 'Zinc',
    labelFull: 'Minimal Zinc',
  },
  {
    id: 'slate',
    value: '#64748b',
    rgb: '100, 116, 139',
    label: 'Slate',
    labelFull: 'Cool Slate',
  },
] as const;

/** Default accent color ID */
export const DEFAULT_ACCENT = 'spring';

// ============================================================================
// Social Platform Brand Colors
// ============================================================================

export const SOCIAL_BRAND_COLORS = {
  discord: {
    base: '#5865F2',
    hover: '#4752C4',
    shadow: 'rgba(88, 101, 242, 0.3)',
    shadowHover: 'rgba(88, 101, 242, 0.5)',
  },
  whatsapp: {
    base: '#25D366',
    hover: '#1ebe58',
  },
  github: {
    base: '#333333',
    hover: '#24292e',
  },
  linkedin: {
    base: '#0A66C2',
    hover: '#004182',
  },
  twitter: {
    base: '#1DA1F2',
    hover: '#0c85d0',
  },
} as const;

// ============================================================================
// Z-Index Scale
// ============================================================================

export const Z_INDEX = {
  /** Default content */
  base: 1,
  
  /** Elevated content */
  elevated: 10,
  
  /** Sticky headers, floating buttons */
  sticky: 50,
  
  /** Navigation, modals */
  modal: 100,
  
  /** Boot screen, critical overlays */
  critical: 9999,
  
  /** Below content (backgrounds) */
  behind: -1,
} as const;

// ============================================================================
// Animation Durations (for consistency)
// ============================================================================

export const DURATIONS = {
  fast: 150,
  normal: 300,
  slow: 500,
  slower: 800,
} as const;

// ============================================================================
// Type Exports
// ============================================================================

export type AccentColor = (typeof ACCENT_COLORS)[number];
export type AccentColorId = AccentColor['id'];
export type AccentColorValue = AccentColor['value'];
export type SocialPlatform = keyof typeof SOCIAL_BRAND_COLORS;
