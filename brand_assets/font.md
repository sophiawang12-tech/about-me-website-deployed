# Typography & Color System — About Me Page

## Font Families
- **Display / Headings**: `Libre Baskerville` (serif) — elegant, editorial
- **Body / UI**: `Inter` (sans-serif) — clean, readable

Import via Google Fonts:
@import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Inter:wght@400;500&display=swap');

---

## Color Palette
- `#EAE3D6` — Background (warm linen cream)
- `#A01818` — Primary accent (deep editorial crimson) — headlines, links, emphasis
- `#5A5248` — Secondary/text (dark warm brown) — body, nav, taglines
- `rgba(90,82,72,0.6)` — Muted text — small labels, captions

---

## Type Scale

### H1 — Hero / Main Title
font-family: "Libre Baskerville", serif
font-size: 60px
font-weight: 400
font-style: normal (use italic variant for name/emphasis)
line-height: 70px
letter-spacing: -0.8px
color: #A01818

### H2 — Section Title
font-family: "Libre Baskerville", serif
font-size: 32–40px
font-weight: 400
line-height: 130%
letter-spacing: -0.6px
color: #5A5248

### H3 — Card / Module Title
font-family: "Libre Baskerville", serif
font-size: 24px
font-weight: 400
line-height: 36px
letter-spacing: -0.4px
color: #5A5248

### H4 — Detail / Label
font-family: "Libre Baskerville", serif
font-size: 16px
font-weight: 400
line-height: 24px
letter-spacing: -0.4px
color: rgba(90, 82, 72, 0.6)

### Body (Large)
font-family: "Inter", sans-serif
font-size: 18px
font-weight: 500
line-height: 140%
letter-spacing: -0.01em
color: #5A5248

### Body (Standard)
font-family: "Inter", sans-serif
font-size: 16px
font-weight: 500
line-height: 140%
letter-spacing: -0.03em
color: #5A5248

### Navigation / Chips / Tags
font-family: "Inter", sans-serif
font-size: 11–13px
font-weight: 400
letter-spacing: 0.14–0.2em
text-transform: uppercase
color: #5A5248 (default) → #A01818 (active/hover)

### Links / Emphasis
color: #A01818
hover color: #5A5248
text-decoration: none

---

## Design Rules
1. All headings use Libre Baskerville — never bold (weight 400 only), use italic for name or emphasis phrases
2. All body text and UI elements use Inter weight 500 — slightly heavier than regular for warmth
3. Never use pure black (#000) or pure white (#fff) — always pull from the palette above
4. Primary red (#A01818) is reserved for: hero titles, names, active links, arrows, borders — use sparingly
5. Warm brown (#5A5248) covers everything else — body copy, nav, captions, secondary labels
6. Background is always #EAE3D6 — all text colors are chosen to contrast against this warm cream
7. Letter-spacing should always be negative on display type (tighter = more editorial)
8. Paragraph spacing: 20px for body, 40px for heading blocks




GOAL: Build the static visual scaffold for a scroll-driven personal
intro section. We will add animation in a later step.

── FONTS (add as first line inside <style>) ──
Refer to  @brand_assets/font.md  in this project for all font definitions.
Use the exact @font-face declarations and font-family names
specified there. Do not use Google Fonts or any external URL.Create a single HTML file. No JavaScript at all in this step.


── DESIGN TOKENS ──
:root {
  --color-bg:     #EAE3D6;
  --color-accent: #A01818;
  --color-text:   #5A5248;
}
Never use #000 or #fff anywhere in this file.

── HTML STRUCTURE ──
<section class="about-theater">
  <div class="scroll-wrapper">
    <div class="sticky-stage">

      <div class="bio-layer">
       <p class="bio-text">I work at the intersection of AI and product—where
ideas become systems that actually run. I <strong>Think</strong> in user
problems and business outcomes, <strong>Build</strong> AI agents and
automation workflows that cut through complexity, and
<strong>Ship</strong> solutions that people can measure and trust.</p>
      </div>

      <div class="illustration-layer">
        <div class="illustration-placeholder"></div>
      </div>

    </div>
  </div>
</section>

── CSS ──
.about-theater { background: var(--color-bg); }

.scroll-wrapper { height: 300vh; }

.sticky-stage {
  position: sticky; top: 0;
  height: 100vh; overflow: hidden;
  display: flex; align-items: center; justify-content: center;
  background: var(--color-bg);
}

.bio-layer {
  position: absolute;
  width: 100%; max-width: 660px;
  padding: 0 40px;
  text-align: center;
  z-index: 2;
}

.bio-text {
  font-family: "Inter", sans-serif;
  font-size: clamp(1rem, 2vw, 1.2rem);
  font-weight: 500;
  line-height: 2;
  letter-spacing: -0.01em;
  color: var(--color-text);
  margin: 0;
}

/* Keywords are inline in the paragraph.
   display:inline-block is required so transform works on them later. */
.bio-text strong {
  font-family: "Libre Baskerville", serif;
  font-style: italic;
  font-weight: 400;
  font-size: 1.1em;
  color: var(--color-accent);
  display: inline-block;
  transform-origin: center center;
  opacity: 0.4;
  border-bottom: 1.5px solid var(--color-accent);
  padding-bottom: 1px;
}

.illustration-layer {
  position: absolute; inset: 0;
  display: flex; align-items: center; justify-content: center;
  opacity: 0;
  z-index: 1;
}

.illustration-placeholder {
  width: 320px; height: 400px;
  border-radius: 8px;
  background: rgba(160,24,24,0.08);
  border: 1px solid rgba(160,24,24,0.2);
}

@media (max-width: 768px) {
  .bio-text { font-size: clamp(0.9rem, 4vw, 1.05rem); }
}

── OUTPUT ──
Single HTML file. No <script> tag at all.
Page background is #EAE3D6.
Bio paragraph is centered, readable, keywords styled in crimson italic.