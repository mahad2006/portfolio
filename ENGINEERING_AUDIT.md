# Portfolio Audit: Phase 3

This document contains the Engineering & Code Quality Review portion of the portfolio audit.

---

## PHASE 3 — ENGINEERING & CODE QUALITY REVIEW

### 1. Code Identification

*   **Over-abstraction**:
    *   The `SystemProvider` and `useSystem` hook (`app/hooks/useSystem.ts`) is powerful but manages too many disparate states (sound, theme, matrix). It risks becoming a "god object."
    *   `PageShell` and `PageTemplate` have overlapping responsibilities and could likely be merged.

*   **Unnecessary Complexity**:
    *   `SpotlightCard.tsx` uses a `MutationObserver` to watch for `data-accent` changes on the `<body>`. This is overly complex. This should be handled declaratively via React context or CSS variables.
    *   The scroll-spying logic in `Navbar.tsx` is implemented manually. A library like `react-intersection-observer` would simplify this code, improve performance, and be more idiomatic.

*   **Repeated Logic**:
    *   Boilerplate page structure (`stats/page.tsx`, `writing/page.tsx`) could be reduced with a higher-order component (HOC) or a more generic layout.
    *   The `getCategory` function in `app/projects/page.tsx` is brittle. This logic should live with the data itself, not in the UI component.

*   **Hardcoded Values**:
    *   The project is very strong at avoiding hardcoded values by using `app/config/` and `app/data/`.
    *   Minor issue: `ACCENT_COLORS` is defined locally in `SpotlightCard.tsx` instead of being imported from the central theme config where it also seems to be used (`app/config/theme.ts`).

*   **Poor Naming**:
    *   Naming is generally very strong.
    *   Minor: `ClientLayout.tsx` is a bit vague. `GlobalWrapper` or `AppContainer` might be more descriptive.

*   **Anti-patterns**:
    *   **Manual DOM Manipulation**: `Navbar.tsx` and `Hero.tsx` directly access `document` and use `setInterval`, which breaks the declarative paradigm of React. These should be refactored to use modern hooks (`IntersectionObserver`) and state-driven animations.

### 2. Evaluation

*   **Scalability**: **7/10**. Strong foundation, but manual DOM work and brittle logic would create friction as the site grows.
*   **Maintainability**: **8/10**. Excellent. The separation of data, config, and UI makes updates easy and safe.
*   **Readability**: **9/10**. The code is very clean, well-commented, and intuitively structured.

### 3. Code Maturity

*   **Junior**:
    *   Manual scroll-spying and `setInterval` animations.
    *   Brittle data mapping logic (`getCategory`).
    *   Overly complex solutions for simple problems (`MutationObserver` in `SpotlightCard`).
*   **Mid-level**:
    *   Good component structure and file organization.
    *   Use of `useMemo` for performance.
*   **Senior**:
    *   **The strict separation of data/config from UI is the most impressive, senior-level aspect of the codebase.**
    *   The `SystemProvider` for global state shows architectural thinking.
    *   The `Settings` page is a piece of senior-level front-end work.

### 4. Architectural Improvements

*   **Refactor `useSystem`**: Split the hook into more focused contexts (e.g., `useTheme`, `useAudio`).
*   **Centralize Data Mapping**: Move the `getCategory` logic into a data transformation step or add the `category` field directly to the `projectsData` objects.
*   **Adopt `IntersectionObserver`**: Refactor the `Navbar`'s scroll-spying logic to use a modern hook-based approach.
*   **Unify Card Styles**: Create a single, flexible `Card` component with variants (`<Card variant="stat">`) to enforce visual consistency across the `Stats` and `Uses` pages.
