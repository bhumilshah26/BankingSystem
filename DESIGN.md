# Design

## Theme

Maroon (oxblood) + warm gold banking theme — the project's original brand color, restored. Light UI on a subtle warm off-white surface, with a maroon brand gradient (gold radial highlight) for hero/auth/header bands. Heritage-bank feel; per-action color tints differentiate actions without noise.

## Color

Defined as Tailwind tokens in `frontend/tailwind.config.js`.

- **Primary (maroon):** `#832625` (`primary`), ramp `primary-50 #FBF1F0` … `primary-800 #561917`; hover/pressed `dark #6B1F1D`; `secondary #A03A3C`.
- **Accent (gold):** `#C9A227` (`accent`), `accent-dark #A8881D`, `accent-light #E3C457`, `accent-50 #FBF6E6`. Used for highlights, primary CTAs (`btn-accent`), nav hover underline, EMV chip, sync button. Gold always pairs with dark (`ink`) text, never light. Gold + maroon is the heritage pairing.
- **Neutrals:** `surface #FAF5F5` (app bg), `ink #1F2937` (body text), `light #E5CBCB` (pale maroon/pink fill, light text on maroon).
- **Semantic:** `success #1A7F5A`, `danger #C0392B`, `warning #B8860B`, `info #0E7490`. Money-in/success green, money-out/error red, always paired with an icon or +/- sign.
- **Per-action tints (scanning aid):** icon tiles use `bg-{hue}-50 text-{hue}-700` across teal/sky/emerald/amber/violet/rose/indigo/yellow. Brand anchors (nav, CTAs, headers) stay teal+gold.
- Contrast: body ≥4.5:1, large/bold ≥3:1.

## Typography

- **Display:** `Sora` (600–800) for `h1/h2`, brand mark, section titles (`.font-display`), letter-spacing -0.02em.
- **Body/UI:** `Inter` (300–800) for everything else.
- Fixed rem scale (product register), not fluid. Hero uses a bounded clamp via responsive sizes (max ~`text-6xl`). `text-balance` on headings, `text-pretty` on long paragraphs.

## Components

Shared classes in `frontend/src/index.css`:

- `.card-modern` — white, `rounded-2xl`, soft teal-tinted shadow, `border-primary-100`, hover lift.
- `.btn-primary` — teal fill, white text, focus ring, active nudge, disabled state.
- `.btn-secondary` — outline teal on white.
- `.btn-accent` — gold fill, ink text (hero/primary CTA).
- `.input-modern` — white field, `rounded-xl`, teal focus ring; auth inputs use a left leading icon.
- `.section-eyebrow` — small teal label with a short gold rule; used sparingly (hero, dashboard header only).
- Icon tiles — `react-icons/fa`, one glyph + one color tint per action. No emoji as primary icons.
- States present: default, hover, focus, active, disabled, loading (`InlineLoading`/`LoadingSpinner`).

## Layout

- Sticky translucent navbar (`backdrop-blur`, `z-sticky`) with brand mark + gold-underline hover links.
- Brand-gradient hero/header bands; content cards overlap the band edge on the dashboard (`-mt`).
- Responsive grids: 2-col mobile → 4/5-col desktop. Structural breakpoints, not fluid type.
- Semantic z-index scale in tokens: `dropdown < sticky < modal < toast`.

## Motion

- 150–300ms transitions; `ease`/exponential-out curves, no bounce.
- `animate-fade-up` for hero/auth card entrance (already-visible default, enhanced).
- Hover: card lift, icon scale, CTA shadow, nav underline scale-x.
- `prefers-reduced-motion: reduce` collapses all animation/transition to instant (in `index.css`).
