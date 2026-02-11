
# Page Load Speed Optimization Plan

## Goal
Improve Lighthouse/PageSpeed Insights performance score to 90+ by optimizing render-blocking resources, implementing code splitting, optimizing images, and reducing third-party script impact.

---

## Current Performance Issues Identified

### 1. Third-Party Render-Blocking Scripts (Critical)
The `index.html` loads multiple third-party scripts synchronously in the `<head>`:
- **Leadsy AI Tag** - loads synchronously (has `async` but in head)
- **Lead Connector Chat Widget** - synchronous script in head
- **Meta Pixel** - inline script that blocks rendering

### 2. No Code Splitting
- All 16 page routes are statically imported in `App.tsx`
- All 16 sections on Index page are loaded synchronously
- No `React.lazy()` or `Suspense` usage

### 3. Font Loading Overhead
- 8 font weight imports (5 Inter + 3 JetBrains Mono)
- All loaded synchronously via CSS `@import`
- Fonts loaded before content can paint

### 4. Large SVG Animation
- `DataFlowAnimation.tsx` is 437 lines of complex SVG
- Contains ~30 animated circles with filters
- Rendered immediately on page load

### 5. Image Optimization
- Images loaded without `loading="lazy"` attribute
- No explicit `width`/`height` causing layout shifts
- No WebP format optimization

### 6. CSS Complexity
- Large CSS bundle from Tailwind
- Multiple animation keyframes loaded globally

---

## Implementation Plan

### Phase 1: Third-Party Script Optimization

**index.html changes:**

1. **Defer non-critical scripts** - Move Lead Connector widget to load after page
2. **Load Meta Pixel asynchronously** - Convert to async loading pattern
3. **Add `defer` to Leadsy tag** - Prevent render blocking

```text
Before:
<script src="widgets.leadconnectorhq.com/loader.js" ...></script>

After:
Move to bottom of body with defer/async
```

### Phase 2: Code Splitting with React.lazy

**App.tsx changes:**

Convert all route imports to lazy loading:
```text
import { lazy, Suspense } from 'react';

const Qualify = lazy(() => import('./pages/Qualify'));
const Onboarding = lazy(() => import('./pages/Onboarding'));
const TestBatchCalendar = lazy(() => import('./pages/TestBatchCalendar'));
// ... other routes
```

Wrap routes in Suspense with minimal loading fallback.

### Phase 3: Lazy Load Below-the-Fold Sections

**New LazySection component:**

Create a reusable component that uses IntersectionObserver to lazy-load sections when they enter viewport.

**Index.tsx changes:**

Apply lazy loading to sections below the fold:
- Keep above-fold: Header, HeroSection, TrustBar (critical)
- Lazy load: PartnershipModel, LiveTransfersSection, ServiceTiers, TrustStats, ComparisonTable, ValueProposition, HowItWorks, ComplianceSection, FounderSection, InHouseIntakeSection, FAQSection, TestBatchProtocol, Footer

### Phase 4: Font Optimization

**index.css changes:**

1. Reduce font weights to essential only:
   - Inter: 400, 600, 700 (remove 500, 900)
   - JetBrains Mono: 400, 500 (remove 600)

2. Add `font-display: swap` to prevent FOIT

### Phase 5: Image Optimization

**Add to all images:**

1. Explicit `width` and `height` attributes (prevents CLS)
2. `loading="lazy"` for below-fold images
3. `decoding="async"` for non-critical images

**Header.tsx, FounderSection.tsx, Footer.tsx:**
- Add dimensions to logo and founder image
- Add lazy loading where applicable

### Phase 6: Simplify DataFlowAnimation

**DataFlowAnimation.tsx changes:**

1. Reduce animated pulse count from ~30 to ~12
2. Remove duplicate filters (consolidate pulseGlow/nodeGlow)
3. Reduce complexity of mobile version
4. Add `will-change: transform` for GPU acceleration

### Phase 7: Critical CSS Optimization

**index.css changes:**

1. Move animation keyframes that aren't used above-fold to separate file
2. Remove unused animation classes
3. Use CSS `content-visibility: auto` for off-screen sections

---

## Files to Modify

| File | Changes |
|------|---------|
| `index.html` | Defer third-party scripts, optimize Meta Pixel loading |
| `src/App.tsx` | Add React.lazy() for route components, wrap in Suspense |
| `src/pages/Index.tsx` | Implement lazy section loading for below-fold content |
| `src/index.css` | Reduce font imports, add font-display, optimize animations |
| `src/components/DataFlowAnimation.tsx` | Reduce animation complexity |
| `src/components/Header.tsx` | Add image dimensions |
| `src/components/FounderSection.tsx` | Add lazy loading + dimensions to founder image |
| `src/components/Footer.tsx` | Add image dimensions |

---

## New Files to Create

| File | Purpose |
|------|---------|
| `src/components/LazySection.tsx` | Reusable IntersectionObserver-based lazy loader |
| `src/components/LoadingSpinner.tsx` | Minimal loading fallback for Suspense |

---

## Expected Impact

| Metric | Before | After (Expected) |
|--------|--------|------------------|
| First Contentful Paint | Delayed by third-party scripts | 30-40% faster |
| Largest Contentful Paint | All sections load at once | Only above-fold loads initially |
| Total Blocking Time | High due to sync scripts | Reduced by 50%+ |
| Cumulative Layout Shift | Images without dimensions | Near-zero CLS |
| JavaScript Bundle Size | All pages in initial bundle | Route-level splitting |

---

## Technical Details

### LazySection Implementation
```text
- Uses IntersectionObserver with rootMargin="100px" for preloading
- Shows skeleton/placeholder until section enters viewport
- Falls back gracefully for browsers without IO support
```

### Script Loading Strategy
```text
1. Critical: Vite bundle (module, in head)
2. Deferred: Meta Pixel (move to body, async)
3. Deferred: Lead Connector (move to body, defer)
4. Async: Leadsy (already async, add defer)
```

### Font Loading Strategy
```text
1. Preload critical font weight (Inter 700 for headings)
2. Let other weights load with font-display: swap
3. Remove unused weights to reduce total size
```
