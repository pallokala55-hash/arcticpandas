# Arctic Pandas Maintenance Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Clean up vibe-coded codebase with asset optimization, CSS deduplication, accessibility fixes, and technical debt removal.

**Architecture:** No structural changes. Focus on optimization, consolidation, and cleanup within existing patterns.

**Tech Stack:** Next.js 16, TypeScript, CSS Modules, WebP image conversion

---

## Phase 1: Asset Optimization

### Task 1.1: Convert Product PNGs to WebP

**Files:**
- Create: `public/koneen-kotelo.webp`
- Create: `public/hiirimatto.webp`
- Create: `public/paitapanda.webp`
- Create: `public/vihreepaita.webp`

**Step 1: Install cwebp tool**

Run: `brew install webp`
Expected: webp tools installed

**Step 2: Convert product images to WebP**

```bash
cd /Users/tomi/Developer/arcticpandas/public
cwebp -q 85 "koneen kotelo.png" -o "koneen-kotelo.webp"
cwebp -q 85 "hiirimatto.png" -o "hiirimatto.webp"
cwebp -q 85 "paitapanda.png" -o "paitapanda.webp"
cwebp -q 85 "vihreepaita.png" -o "vihreepaita.webp"
```

Expected: 4 new .webp files, each ~200-400KB (vs 1.3-2.3MB originals)

**Step 3: Verify file sizes**

Run: `ls -lh /Users/tomi/Developer/arcticpandas/public/*.webp`
Expected: All files under 500KB

**Step 4: Commit**

```bash
git add public/*.webp
git commit -m "feat: add WebP versions of product images"
```

---

### Task 1.2: Convert Player JPEGs to WebP

**Files:**
- Create: `public/nille.webp`
- Create: `public/simpli.webp`
- Create: `public/dipu.webp`
- Create: `public/Kehvo.webp`
- Create: `public/boltox.webp`

**Step 1: Convert player images to WebP**

```bash
cd /Users/tomi/Developer/arcticpandas/public
cwebp -q 85 nille.jpg -o nille.webp
cwebp -q 85 simpli.jpg -o simpli.webp
cwebp -q 85 dipu.jpg -o dipu.webp
cwebp -q 85 Kehvo.jpg -o Kehvo.webp
cwebp -q 85 boltox.jpg -o boltox.webp
```

Expected: 5 new .webp files, each ~80-120KB (vs 350-420KB originals)

**Step 2: Verify file sizes**

Run: `ls -lh /Users/tomi/Developer/arcticpandas/public/*.webp`
Expected: Player images under 150KB each

**Step 3: Commit**

```bash
git add public/*.webp
git commit -m "feat: add WebP versions of player images"
```

---

### Task 1.3: Update next.config.ts for Image Optimization

**Files:**
- Modify: `next.config.ts`

**Step 1: Update config**

Replace contents of `next.config.ts`:

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
};

export default nextConfig;
```

**Step 2: Verify config is valid**

Run: `cd /Users/tomi/Developer/arcticpandas && bun run build`
Expected: Build succeeds without errors

**Step 3: Commit**

```bash
git add next.config.ts
git commit -m "feat: configure Next.js image optimization for WebP/AVIF"
```

---

### Task 1.4: Update merch.ts to Use WebP Images

**Files:**
- Modify: `src/data/merch.ts:18,33,48,62`

**Step 1: Update image paths**

In `src/data/merch.ts`, change:
- Line 18: `"/koneen kotelo.png"` → `"/koneen-kotelo.webp"`
- Line 33: `"/hiirimatto.png"` → `"/hiirimatto.webp"`
- Line 48: `"/paitapanda.png"` → `"/paitapanda.webp"`
- Line 62: `"/vihreepaita.png"` → `"/vihreepaita.webp"`

**Step 2: Verify no TypeScript errors**

Run: `cd /Users/tomi/Developer/arcticpandas && bunx tsc --noEmit`
Expected: No errors

**Step 3: Commit**

```bash
git add src/data/merch.ts
git commit -m "feat: use WebP images for merchandise"
```

---

### Task 1.5: Update players.ts to Use WebP Images

**Files:**
- Modify: `src/data/players.ts:30,54,79,104,129`

**Step 1: Update image paths**

In `src/data/players.ts`, change:
- Line 30: `"/nille.jpg"` → `"/nille.webp"`
- Line 54: `"/simpli.jpg"` → `"/simpli.webp"`
- Line 79: `"/dipu.jpg"` → `"/dipu.webp"`
- Line 104: `"/Kehvo.jpg"` → `"/Kehvo.webp"`
- Line 129: `"/boltox.jpg"` → `"/boltox.webp"`

**Step 2: Verify no TypeScript errors**

Run: `cd /Users/tomi/Developer/arcticpandas && bunx tsc --noEmit`
Expected: No errors

**Step 3: Commit**

```bash
git add src/data/players.ts
git commit -m "feat: use WebP images for player profiles"
```

---

## Phase 2: CSS Cleanup

### Task 2.1: Create Shared Star Background Utility

**Files:**
- Create: `src/styles/stars.css`

**Step 1: Create shared stars CSS file**

Create `src/styles/stars.css`:

```css
/* Reusable star particle background effect */
.stars {
  position: absolute;
  inset: 0;
  pointer-events: none;
  mix-blend-mode: screen;
  opacity: 0.9;
  background-image:
    radial-gradient(1px 1px at 15% 18%, rgba(255, 255, 255, 0.45), transparent),
    radial-gradient(1px 1px at 35% 22%, rgba(255, 255, 255, 0.38), transparent),
    radial-gradient(1px 1px at 55% 14%, rgba(255, 255, 255, 0.4), transparent),
    radial-gradient(1px 1px at 75% 20%, rgba(255, 255, 255, 0.42), transparent),
    radial-gradient(1.5px 1.5px at 22% 52%, rgba(255, 255, 255, 0.4), transparent),
    radial-gradient(1.5px 1.5px at 48% 48%, rgba(255, 255, 255, 0.38), transparent),
    radial-gradient(1.5px 1.5px at 72% 58%, rgba(255, 255, 255, 0.42), transparent),
    radial-gradient(1.5px 1.5px at 88% 46%, rgba(255, 255, 255, 0.4), transparent),
    radial-gradient(2px 2px at 30% 72%, rgba(255, 255, 255, 0.45), transparent),
    radial-gradient(2px 2px at 64% 76%, rgba(255, 255, 255, 0.38), transparent),
    radial-gradient(2px 2px at 82% 68%, rgba(255, 255, 255, 0.42), transparent),
    radial-gradient(1px 1px at 12% 30%, rgba(255, 255, 255, 0.36), transparent),
    radial-gradient(1px 1px at 42% 32%, rgba(255, 255, 255, 0.34), transparent),
    radial-gradient(2px 2px at 12% 14%, rgba(255, 255, 255, 0.6), transparent),
    radial-gradient(2px 2px at 52% 26%, rgba(255, 255, 255, 0.58), transparent),
    radial-gradient(2px 2px at 72% 22%, rgba(255, 255, 255, 0.57), transparent),
    radial-gradient(2px 2px at 42% 72%, rgba(255, 255, 255, 0.55), transparent),
    radial-gradient(2px 2px at 82% 72%, rgba(255, 255, 255, 0.56), transparent);
}

/* Sparse variant for subtle sections */
.starsSparse {
  position: absolute;
  inset: 0;
  pointer-events: none;
  mix-blend-mode: screen;
  opacity: 0.7;
  background-image:
    radial-gradient(1px 1px at 15% 20%, rgba(255, 255, 255, 0.35), transparent),
    radial-gradient(1px 1px at 45% 30%, rgba(255, 255, 255, 0.3), transparent),
    radial-gradient(1px 1px at 75% 25%, rgba(255, 255, 255, 0.32), transparent),
    radial-gradient(1.5px 1.5px at 30% 60%, rgba(255, 255, 255, 0.35), transparent),
    radial-gradient(1.5px 1.5px at 70% 70%, rgba(255, 255, 255, 0.3), transparent);
}
```

**Step 2: Import in globals.css**

Add to top of `src/app/globals.css`:

```css
@import "../styles/stars.css";
```

**Step 3: Commit**

```bash
git add src/styles/stars.css src/app/globals.css
git commit -m "feat: add shared star background utility CSS"
```

---

### Task 2.2: Add Hardcoded Colors to theme.ts

**Files:**
- Modify: `src/theme.ts`

**Step 1: Add glow colors to theme**

In `src/theme.ts`, add after line 21 (after the existing colors object closing):

```typescript
// Glow effects (used in Hero, CTA, etc.)
export const glows = {
  heroBlue: "rgba(12, 42, 88, 0.72)",
  heroOrange: "rgba(255, 120, 40, 0.28)",
  ctaBlue: "rgba(10, 28, 64, 0.65)",
  ctaOrange: "rgba(210, 120, 46, 0.24)",
  dark: "rgba(6, 10, 18, 0.9)",
} as const;
```

**Step 2: Verify no TypeScript errors**

Run: `cd /Users/tomi/Developer/arcticpandas && bunx tsc --noEmit`
Expected: No errors

**Step 3: Commit**

```bash
git add src/theme.ts
git commit -m "feat: centralize glow colors in theme"
```

---

### Task 2.3: Add Shared Container Utility

**Files:**
- Modify: `src/app/globals.css`

**Step 1: Add container utility class**

Add to `src/app/globals.css`:

```css
/* Shared container pattern */
.container {
  position: relative;
  z-index: 1;
  width: min(var(--layout-maxWidth, 1200px), 92vw);
  margin: 0 auto;
}
```

**Step 2: Commit**

```bash
git add src/app/globals.css
git commit -m "feat: add shared container utility class"
```

---

## Phase 3: Accessibility & SEO

### Task 3.1: Fix Heading Hierarchy in About.tsx

**Files:**
- Modify: `src/components/sections/About.tsx:19,33`

**Step 1: Change p tags to h2 tags**

In `src/components/sections/About.tsx`:
- Line 19: Change `<p className={styles.kicker}>Team composition</p>` to `<h2 className={styles.kicker}>Team composition</h2>`
- Line 33: Change `<p className={styles.kicker}>Management</p>` to `<h2 className={styles.kicker}>Management</h2>`

**Step 2: Verify no TypeScript errors**

Run: `cd /Users/tomi/Developer/arcticpandas && bunx tsc --noEmit`
Expected: No errors

**Step 3: Commit**

```bash
git add src/components/sections/About.tsx
git commit -m "fix(a11y): use semantic h2 headings in About section"
```

---

### Task 3.2: Add JSON-LD Structured Data

**Files:**
- Modify: `src/app/layout.tsx`

**Step 1: Add JSON-LD script to layout**

In `src/app/layout.tsx`, add after line 7 (after the imports):

```typescript
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Arctic Pandas",
  url: "https://arcticpandas.gg",
  logo: "https://arcticpandas.gg/logo.svg",
  description: "Finnish League of Legends esports organization",
  sameAs: ["https://twitch.tv/arcticpandas"],
};
```

**Step 2: Add script tag inside head**

In the `<html>` element, add after `<body>` opening tag (around line 66):

```tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
/>
```

**Step 3: Verify build succeeds**

Run: `cd /Users/tomi/Developer/arcticpandas && bun run build`
Expected: Build succeeds

**Step 4: Commit**

```bash
git add src/app/layout.tsx
git commit -m "feat(seo): add JSON-LD structured data for Organization"
```

---

### Task 3.3: Add Canonical URLs

**Files:**
- Modify: `src/app/layout.tsx`

**Step 1: Add alternates to metadata**

In `src/app/layout.tsx`, add to the `metadata` object after line 42 (after icons):

```typescript
alternates: {
  canonical: siteConfig.url,
},
```

**Step 2: Verify no TypeScript errors**

Run: `cd /Users/tomi/Developer/arcticpandas && bunx tsc --noEmit`
Expected: No errors

**Step 3: Commit**

```bash
git add src/app/layout.tsx
git commit -m "feat(seo): add canonical URL to metadata"
```

---

## Phase 4: Technical Debt

### Task 4.1: Remove Unused sponsors Export

**Files:**
- Modify: `src/data/sponsors.ts`

**Step 1: Make sponsors array private**

In `src/data/sponsors.ts`, change line 10 from:
```typescript
export const sponsors: Sponsor[] = [
```
to:
```typescript
const sponsors: Sponsor[] = [
```

**Step 2: Verify no import errors**

Run: `cd /Users/tomi/Developer/arcticpandas && bunx tsc --noEmit`
Expected: No errors (only `sponsorLabels` is imported elsewhere)

**Step 3: Commit**

```bash
git add src/data/sponsors.ts
git commit -m "refactor: make unused sponsors array private"
```

---

### Task 4.2: Remove Unused timelineStars Export

**Files:**
- Modify: `src/data/timeline.ts`

**Step 1: Delete timelineStars**

In `src/data/timeline.ts`, delete lines 44-55 (the entire `timelineStars` export).

**Step 2: Verify no import errors**

Run: `cd /Users/tomi/Developer/arcticpandas && bunx tsc --noEmit`
Expected: No errors

**Step 3: Commit**

```bash
git add src/data/timeline.ts
git commit -m "refactor: remove unused timelineStars export"
```

---

### Task 4.3: Add Error Boundary Component

**Files:**
- Create: `src/components/ErrorBoundary.tsx`

**Step 1: Create error boundary**

Create `src/components/ErrorBoundary.tsx`:

```tsx
"use client";

import { Component, ReactNode } from "react";

type Props = {
  children: ReactNode;
  fallback?: ReactNode;
};

type State = {
  hasError: boolean;
};

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div style={{ padding: "2rem", textAlign: "center" }}>
            <h2>Something went wrong</h2>
            <button onClick={() => this.setState({ hasError: false })}>
              Try again
            </button>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
```

**Step 2: Verify no TypeScript errors**

Run: `cd /Users/tomi/Developer/arcticpandas && bunx tsc --noEmit`
Expected: No errors

**Step 3: Commit**

```bash
git add src/components/ErrorBoundary.tsx
git commit -m "feat: add ErrorBoundary component"
```

---

### Task 4.4: Add Loading State for Player Route

**Files:**
- Create: `src/app/[player]/loading.tsx`

**Step 1: Create loading component**

Create `src/app/[player]/loading.tsx`:

```tsx
export default function Loading() {
  return (
    <div
      style={{
        minHeight: "80vh",
        display: "grid",
        placeItems: "center",
        color: "#C8C8C8",
      }}
    >
      Loading player...
    </div>
  );
}
```

**Step 2: Verify no TypeScript errors**

Run: `cd /Users/tomi/Developer/arcticpandas && bunx tsc --noEmit`
Expected: No errors

**Step 3: Commit**

```bash
git add "src/app/[player]/loading.tsx"
git commit -m "feat: add loading state for player route"
```

---

### Task 4.5: Decide on Shop Component

**Files:**
- Modify: `src/app/page.tsx` (if integrating)
- OR delete: `src/components/sections/Shop.tsx` and `src/components/sections/Shop.module.css` (if removing)

**Step 1: Ask user preference**

This task requires a decision: Should the Shop component be integrated into the home page or removed?

**Option A - Integrate Shop:**
In `src/app/page.tsx`, add import and render:
```tsx
import Shop from "../components/sections/Shop";
// Add <Shop /> after <About /> in the JSX
```

**Option B - Remove Shop:**
```bash
rm src/components/sections/Shop.tsx src/components/sections/Shop.module.css
rm src/data/merch.ts
```

**Step 2: Commit based on choice**

If integrated:
```bash
git add src/app/page.tsx
git commit -m "feat: integrate Shop section into home page"
```

If removed:
```bash
git add -A
git commit -m "refactor: remove unused Shop component"
```

---

## Summary

| Phase | Tasks | Estimated Commits |
|-------|-------|-------------------|
| 1. Asset Optimization | 5 | 5 |
| 2. CSS Cleanup | 3 | 3 |
| 3. Accessibility/SEO | 3 | 3 |
| 4. Technical Debt | 5 | 5 |
| **Total** | **16** | **16** |
