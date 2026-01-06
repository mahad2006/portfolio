/**
 * Design Tokens - Spacing & Layout
 * 
 * Centralized spacing, sizing, and layout constants.
 * Import from '@/styles/tokens' throughout the app.
 * 
 * Usage in Tailwind classes:
 *   className={`max-w-[${MAX_WIDTHS.page}]`}  // Arbitrary value
 *   className="max-w-7xl"                       // Use Tailwind preset when matching
 * 
 * Usage in inline styles:
 *   style={{ maxWidth: MAX_WIDTHS.page }}
 */

// ============================================================================
// Max Width Tokens
// ============================================================================

/**
 * Maximum width values for containers
 * Maps to Tailwind: max-w-4xl (56rem), max-w-6xl (72rem), max-w-7xl (80rem)
 */
export const MAX_WIDTHS = {
  /** Narrow content (blog posts, forms) - matches max-w-4xl */
  narrow: '56rem',    // 896px
  
  /** Standard content width - matches max-w-6xl */
  content: '72rem',   // 1152px
  
  /** Full page width - matches max-w-7xl */
  page: '80rem',      // 1280px
  
  /** Modal/dialog max width - matches max-w-2xl */
  modal: '42rem',     // 672px
} as const;

/** Tailwind class equivalents for MAX_WIDTHS */
export const MAX_WIDTH_CLASSES = {
  narrow: 'max-w-4xl',
  content: 'max-w-6xl', 
  page: 'max-w-7xl',
  modal: 'max-w-2xl',
} as const;

// ============================================================================
// Section Padding Tokens
// ============================================================================

/**
 * Vertical padding for page sections
 * Use for consistent section spacing throughout the site
 */
export const SECTION_PADDING = {
  /** Top padding for main content (accounts for fixed header) */
  top: '6rem',        // 96px - pt-24
  
  /** Bottom padding for main content */
  bottom: '5rem',     // 80px - pb-20
  
  /** Large section vertical padding */
  vertical: '8rem',   // 128px - py-32
  
  /** Medium section vertical padding */
  verticalMd: '6rem', // 96px - py-24
  
  /** Small section vertical padding */
  verticalSm: '3rem', // 48px - py-12
} as const;

/** Tailwind class equivalents for SECTION_PADDING */
export const SECTION_PADDING_CLASSES = {
  top: 'pt-24',
  bottom: 'pb-20',
  vertical: 'py-32',
  verticalMd: 'py-24',
  verticalSm: 'py-12',
} as const;

// ============================================================================
// Gap Tokens
// ============================================================================

/**
 * Gap/spacing values for flexbox and grid layouts
 */
export const GAPS = {
  /** Extra small gap - 0.5rem */
  xs: '0.5rem',       // 8px - gap-2
  
  /** Small gap - 0.75rem */
  sm: '0.75rem',      // 12px - gap-3
  
  /** Medium gap - 1rem */
  md: '1rem',         // 16px - gap-4
  
  /** Large gap - 1.5rem */
  lg: '1.5rem',       // 24px - gap-6
  
  /** Extra large gap - 2rem */
  xl: '2rem',         // 32px - gap-8
  
  /** 2XL gap - 3rem */
  '2xl': '3rem',      // 48px - gap-12
} as const;

/** Tailwind class equivalents for GAPS */
export const GAP_CLASSES = {
  xs: 'gap-2',
  sm: 'gap-3',
  md: 'gap-4',
  lg: 'gap-6',
  xl: 'gap-8',
  '2xl': 'gap-12',
} as const;

// ============================================================================
// Horizontal Padding (Container)
// ============================================================================

/**
 * Horizontal padding for page containers
 */
export const CONTAINER_PADDING = {
  /** Standard horizontal padding */
  x: '1.5rem',        // 24px - px-6
  
  /** Mobile horizontal padding */
  xMobile: '1rem',    // 16px - px-4
} as const;

export const CONTAINER_PADDING_CLASSES = {
  x: 'px-6',
  xMobile: 'px-4',
} as const;

// ============================================================================
// Z-Index Scale
// ============================================================================

/**
 * Z-index values for layering
 * Use these instead of arbitrary z-index values
 */
export const Z_INDEX = {
  /** Below content (backgrounds, decorative elements) */
  behind: -1,
  
  /** Default/base content level */
  base: 0,
  
  /** Slightly elevated (cards, dropdowns) */
  dropdown: 10,
  
  /** Sticky elements (headers, floating buttons) */
  sticky: 50,
  
  /** Fixed navigation, modals */
  modal: 100,
  
  /** Tooltips, popovers */
  tooltip: 200,
  
  /** Critical overlays (boot screen, blocking modals) */
  critical: 9999,
} as const;

/** Tailwind class equivalents for Z_INDEX */
export const Z_INDEX_CLASSES = {
  behind: 'z-[-1]',
  base: 'z-0',
  dropdown: 'z-10',
  sticky: 'z-50',
  modal: 'z-[100]',
  tooltip: 'z-[200]',
  critical: 'z-[9999]',
} as const;

// ============================================================================
// Header/Navbar Heights
// ============================================================================

/**
 * Fixed header heights
 */
export const HEADER_HEIGHT = {
  /** Main navbar height */
  navbar: '4rem',     // 64px - h-16
  
  /** Sub-page header height */
  subpage: '4rem',    // 64px - h-16
} as const;

export const HEADER_HEIGHT_CLASSES = {
  navbar: 'h-16',
  subpage: 'h-16',
} as const;

// ============================================================================
// Margin Bottom (Content Spacing)
// ============================================================================

/**
 * Margin bottom values for content elements
 */
export const MARGIN_BOTTOM = {
  /** Tight spacing */
  sm: '1rem',         // 16px - mb-4
  
  /** Standard spacing */
  md: '1.5rem',       // 24px - mb-6
  
  /** Section header spacing */
  lg: '2rem',         // 32px - mb-8
  
  /** Large section spacing */
  xl: '3rem',         // 48px - mb-12
} as const;

export const MARGIN_BOTTOM_CLASSES = {
  sm: 'mb-4',
  md: 'mb-6',
  lg: 'mb-8',
  xl: 'mb-12',
} as const;

// ============================================================================
// Composite Layout Classes (for easy import)
// ============================================================================

/**
 * Pre-composed layout class strings for common patterns
 */
export const LAYOUT = {
  /** Standard page container */
  pageContainer: 'max-w-7xl mx-auto px-6',
  
  /** Narrow content container */
  narrowContainer: 'max-w-4xl mx-auto px-6',
  
  /** Content container */
  contentContainer: 'max-w-6xl mx-auto px-6',
  
  /** Main content with header offset */
  mainContent: 'max-w-7xl mx-auto px-6 pt-24 pb-20',
  
  /** Fixed header base */
  fixedHeader: 'fixed top-0 left-0 w-full z-50',
} as const;

// ============================================================================
// Type Exports
// ============================================================================

export type MaxWidthKey = keyof typeof MAX_WIDTHS;
export type GapKey = keyof typeof GAPS;
export type ZIndexKey = keyof typeof Z_INDEX;
