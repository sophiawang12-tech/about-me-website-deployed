# Implementation Plan — RulerCarousel for "Tools I Use Daily"

## 1. Current Project Assessment

| Requirement | Current State | Gap |
|---|---|---|
| shadcn project structure | ❌ Single `index.html` | No React, no components folder |
| Tailwind CSS | ✅ Loaded via CDN | OK |
| TypeScript | ❌ Plain HTML/JS | No compiler |
| framer-motion | ❌ Not installed | No npm build |
| lucide-react | ❌ Not installed | No npm build |

**Verdict:** The project does NOT meet the requirements for dropping in the React component as-is.

---

## 2. Two Options Considered

### Option A — Migrate to Next.js + shadcn (full React setup)
- Run `npx create-next-app` → new project
- Run `npx shadcn init` → sets up `/components/ui`
- Move all existing HTML/CSS/JS into React components
- Install `framer-motion` + `lucide-react`

**Rejected** — rewrites entire project, high risk of breaking existing GSAP/Three.js animations.

---

### Option B — Port RulerCarousel to Vanilla JS ✅ CHOSEN
- Keep the single `index.html` approach
- Recreate the visual effect using HTML/CSS + vanilla JS
- Replace `framer-motion` spring → GSAP (already on page)
- Replace `lucide-react` → inline SVGs (already the page's pattern)
- Replace TypeScript types → plain JS

---

## 3. User Decisions (confirmed before coding)

| Question | Answer |
|---|---|
| Image treatment for landmark PNGs | `mix-blend-mode: multiply` (Option A) |
| Show icon or name only? | Icon + name |
| Clicking a tool does anything? | No — display only |
| Page counter? | Yes |
| Extra items to add? | Prompt Engineering, Evaluation |

**Final item list (6 total):** Claude, Cursor, Lovable, Gemini, Prompt Engineering, Evaluation

---

## 4. Implementation Detail

### Layout
```
─────────────────────────────────────────────────────
  |  |  |  |||  |  |  |||  |  |  |||  |  |  |||  |    ← ruler ticks (top)

  🖱 Cursor   ⚡[CLAUDE]⚡   ♥ Lovable   ✦ Gemini     ← sliding track, active = large + crimson

  |  |  |  |||  |  |  |||  |  |  |||  |  |  |||  |    ← ruler ticks (bottom)
                        ‹‹   1 / 6   ››
─────────────────────────────────────────────────────
```

### Style (brand_assets/style.md)
| Element | Value |
|---|---|
| Active item color | `#A01818` (crimson) |
| Inactive item color | `#5A5248` (warm brown), low opacity |
| Background | `#EAE3D6` (warm linen) |
| Ruler center tick | `#A01818`, 28px tall |
| Ruler every-5th tick | `#A01818`, 16px tall, 40% opacity |
| Ruler short ticks | `rgba(90,82,72,0.22)`, 8px tall |
| Font | Libre Baskerville (matches page display font) |

### Behavior (ported from original RulerCarousel.tsx)
| Feature | Implementation |
|---|---|
| Click item → center it | GSAP `back.out(1.2)` spring, 0.65s |
| Active scale | 1.18× |
| Inactive scale | 0.65× |
| ← → arrow keys | `keydown` listener |
| Prev / Next buttons | SVG double-chevron, inline |
| Infinite loop | 3× triplication; silent jump on wrap |
| Page counter | `1 / 6`, updates on navigate |

---

## 5. Changes Made to `index.html`

### CSS (replaced `.tool-chip` block)
- Removed: `.tool-chip`, `.tool-chip:hover`
- Added: `.ruler-carousel`, `.ruler-ticks`, `.ruler-tick`, `.ruler-track-wrapper`, `.ruler-track`, `.ruler-item`, `.ruler-item.is-active`, `.ruler-nav`, `.ruler-btn`, `.ruler-counter`

### HTML (replaced AI Tools div content)
- Removed: 4× `.tool-chip` div elements
- Added: `.ruler-carousel#tool-carousel` containing:
  - `#ruler-ticks-top` — populated by JS
  - `.ruler-track-wrapper > #ruler-track` — items injected by JS
  - `#ruler-ticks-bottom` — populated by JS
  - `.ruler-nav` with `#ruler-prev`, `.ruler-counter`, `#ruler-next`
- Section label font-size: `0.62rem` → `0.72rem`, margin-bottom: `20px` → `32px`

### JS (appended to first `<script>` block)
New IIFE `(function() { ... })()` containing:
- `tools[]` array — 6 items with name + inline SVG icon
- `allItems[]` — triplication of tools (18 total) for infinite scroll
- DOM injection of `.ruler-item` elements into `#ruler-track`
- `targetX(idx)` — calculates translateX to center item `idx`
- `updateVisuals(animate)` — GSAP animate or set scale/opacity per item; toggles `.is-active`
- `goTo(newIdx)` — animates track, calls `updateVisuals`, handles wrap
- Click, `#ruler-prev`, `#ruler-next`, `keydown` event listeners
- `buildTicks(containerId, 80)` — creates 80 tick divs with correct heights/colors

### Cursor expand listener
Added `.ruler-item` and `.ruler-btn` to the existing selector so the custom cursor expands on hover over carousel elements.

---

## 6. Constants (JS ↔ CSS must stay in sync)

| Constant | Value | Used in |
|---|---|---|
| `ITEM_W` | `200px` | CSS `.ruler-item { width }`, JS `targetX()` |
| `GAP` | `64px` | CSS `.ruler-track { gap }`, JS `SLOT = ITEM_W + GAP` |
| `SLOT` | `264px` | JS spacing calculation only |
