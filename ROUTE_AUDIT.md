# Portfolio Route Audit

## Active Routes & Structure

| Route | Purpose | Has TerminalBackButton | Current Layout | Notes |
|-------|---------|------------------------|-----------------|-------|
| `/` | Home Page | ❌ No (anchor links) | Custom Hero layout | Main landing page with sections |
| `/projects` | Projects Archive | ✅ Yes | Manual padding/header | Netflix-style project showcase |
| `/projects/[slug]` | Project Detail | ✅ Yes (via ProjectDetailClient) | Manual padding | Individual project case studies |
| `/writing` | Writing Archive | ✅ Yes | Manual padding/header | Technical articles list |
| `/writing/[slug]` | Article Detail | ✅ Yes (via WritingDetailClient) | Manual padding | Individual article pages |
| `/community` | Community Hub | ✅ Yes | Manual padding/header | UBIT Hub community page |
| `/stats` | Career Analytics | ✅ Yes | Manual padding/header | GitHub/LeetCode stats dashboard |
| `/status` | System Status | ✅ Yes | Manual padding/header | System health monitoring |
| `/uses` | Setup/Equipment | ✅ Yes | Manual padding/header | Hardware/software setup page |
| `/settings` | Settings Page | ✅ Yes | Manual padding/header | User preferences & theme config |

## Layout Inconsistencies Found

1. **Padding Variations:**
   - `/projects`: `pt-16 pb-16` (Hero section)
   - `/writing`: `pt-32 pb-24` (WritingView)
   - `/community`: `pt-24 pb-24` (CommunityView)
   - `/stats`: `pt-24 pb-24` (StatsView)
   - `/status`: `pt-24 pb-24` (StatusView)
   - `/uses`: `pt-24 pb-24` (UsesView)
   - `/settings`: `pt-24 pb-24` (Settings)

2. **Header Variations:**
   - Different `h1` sizes: `text-5xl`, `text-6xl`, `text-7xl`
   - Inconsistent description spacing: `mb-4`, `mb-6`, `mb-8`, `mb-12`
   - Different max-width containers: `max-w-4xl`, `max-w-5xl`, `max-w-6xl`, `max-w-7xl`

3. **Back Button Placement:**
   - All pages have TerminalBackButton but with inconsistent spacing (`mb-8`)

## Standardization Plan

All sub-pages should use `PageShell` component with:
- Fixed container: `max-w-7xl mx-auto px-6 pt-32 pb-20`
- Standardized header: `text-heading-1` for h1, consistent spacing
- Consistent back button placement

