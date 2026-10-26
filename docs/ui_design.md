# NotePads — UI Design Spec (v2 "Warm Scholar" Redesign)

> **Status: CURRENT spec for the local rebuild.** This document defines the redesigned UI to be built in `notepads/`.
> The v1 spec (design system extracted from the live production site `notepad-opal-three.vercel.app`) is preserved verbatim as the **Appendix** at the bottom — it is the *incumbent evidence*, explicitly **not** the target look.
> Why the redesign: the v1 UI reads as "too clamped up and hard to read" — 0.98 display line-heights, container-query menu typography, 10–18px minimum paddings, 3-column menu walls, and cold cream + hard-cobalt + hard black offset shadows.
> The redesign keeps the site's **notebook/stationery identity and a similar palette family** but warms it, opens the spacing, and fixes every readability offender at the source.
> Implementation checklist: `docs/task.md` (T0–T14). Content source of truth: `docs/details.md`.

## 0. Design Concept — "Warm Scholar"

Keep the scholar/notebook world (taped polaroids, ruled paper, red margin line, punched holes, doodles, study-pun microcopy) but shift the ground from cold cream + hard blue to **parchment + walnut + terracotta**, and treat motifs as seasoning rather than wallpaper (lower opacity, more margin around them).

| Principle | v1 (live site) | v2 (this spec) |
|---|---|---|
| Ground | cold cream `#f8f7f0` | warm parchment `#f7f0e3` |
| Dominant text color | deep navy `#131c57` | warm walnut `#34281b` |
| Primary accent | cobalt blue `#1c3aae` everywhere | **terracotta `#b85433`**; cobalt demoted to links/focus only |
| Shadows | `4px 4px 0 var(--ink)` hard black offsets | warm soft offsets (`rgba(52,40,27,.12)`), sticker shadow on CTAs only |
| Display line-height | `.98` | `1.06–1.1` |
| Body type | 1.28rem / lh 1.5 in `cqw` units on menu | fixed rem, lh `1.55–1.65`, max-width `38em`, no `cqw` text |
| Menu | 3D flip-book + 3-column list wall | **warm tabbed chapters** |
| Reviews | physics-drifting carousel | native scroll-snap cards |
| Preloader hold | up to 4s | ≤ 2.5s hard cap |
| Section padding-y | varies, tight | `clamp(4rem, 10vw, 7.5rem)` minimum |

## 1. Color Palette (v2 tokens — canonical)

### Core tokens (`:root`)

| Token | Value | Usage |
|---|---|---|
| `--parchment` | `#f7f0e3` | Body background (global ground) |
| `--paper` | `#fcf9ef` | Cards, nav sheet, chat panel, light surfaces |
| `--kraft` | `#ead9bd` | Alternating section backgrounds (menu, workshops) |
| `--walnut` | `#34281b` | Primary text; soft-shadow tint base; dark doodles |
| `--bark` | `#6b5343` | Secondary text, descriptions, captions (audit ≥ 4.5:1 on `--parchment`; darken to `#5c4636` if it fails) |
| `--terra` | `#b85433` | Primary accent: CTAs, eyebrow ticks, margin lines, pen nib, stars, "save" notes, motto |
| `--mustard` | `#e2b064` | Tape, scribble highlights, check bullets, star markers, warm chip fill |
| `--sage` | `#a7b087` | Workshops/positive accents, session card tone |
| `--forest` | `#3a4a2f` | Footer background, menu chapter headers, wave divider base |
| `--cobalt` | `#43568f` | **Links, focus rings, status accents only** (never a section background or dominant fill) |
| `--dusty` | `#97a5b8` | Neutral card tone (3rd workshop card) |
| `--overlay-deep` | `#1d2a56` | Photo overlay shade on hero/lightbox ONLY (nearly invisible as a "color") |
| `--nav-h` | `72px` | Fixed header height (was 76) |
| `--maxw` | `1200px` | Content max width |
| `--gutter` | `clamp(20px, 5vw, 64px)` | Page side padding (floor raised from 18px) |
| `--ease` | `cubic-bezier(.22, 1, .36, 1)` | Single shared easing |

### Derived / utility values

- Ruled paper lines: `#34281b14` (graph/ruled grids; replaces cold blue rules)
- Dotted grid: `#34281b12`
- Margin line: `#b8543355` (terracotta at half alpha)
- Status dots: open `#4e8a5f` (warm green, was `#4ade80`), closed `#c06a5a`
- Tape: `#e2b064b8`, shadow `0 1px 2px rgba(52,40,27,.12)`
- Tinted card tones: sage-soft `#c9d0b4`, mustard-soft `#f0d8a8`, dusty-soft `#c2ccd8`
- Dark section (footer/hero overlay): `#2a2116`–`#34281b` range only, never blue

### Shadows (empty until replaced — every v1 hard-black shadow is banned)

```css
--shadow-soft:  0 6px 16px rgba(52,40,27,.12);   /* default card */
--shadow-lift:  0 10px 24px rgba(52,40,27,.16);  /* hover lift */
--shadow-stick: 6px 6px 0 #b8543333;             /* CTA "sticker" moment only */
```

Selection: `background: #b85433; color: #fcf9ef`. Focus: `outline: 3px solid #43568f; outline-offset: 3px; border-radius: 6px`.

## 2. Typography

| Role | Font | v2 rules |
|---|---|---|
| Display | **Fraunces** variable (ital, opsz, wght 400–900), italic 700–900 | `line-height: 1.06–1.1` (v1: .98); `letter-spacing: -0.01em` (v1: -.02em); opsz max 144 |
| Body / hand | **Gaegu** 400/700 | `1.35rem`, `line-height: 1.55–1.65`, max-width `38em` (v1: 1.28rem / 1.5 / 34em) |
| Stacks | `--font-display: "Fraunces", Georgia, serif` · `--font-hand: "Gaegu", "Comic Sans MS", cursive` | loaded via `next/font/google`, CSS vars |

Fluid scale (higher floors than v1, less aggressive max so big text never fights dense text):

- Site H2: `clamp(2.2rem, 5vw, 4.4rem)`
- Hero title: `clamp(2.4rem, 6vw, 4.8rem)`
- Lede: `clamp(1.25rem, 2vw, 1.5rem)`
- Eyebrow: Gaegu 700 `1.05–1.15rem`, `letter-spacing: .18em` (v1: .22em), uppercase, terracotta + `30px × 2px` tick
- Nav brand: Fraunces italic 900 `1.5rem`; mobile sheet links `clamp(1.8rem, 6vw, 3rem)` (v1: up to 4rem)
- **Menu text: fixed rem only** — dish names `1.05–1.15rem/800`, prices `1rem–1.1rem/700 tabular-nums`, no `cqw` anywhere, no opacity-below-.6 on text (v1 page numbers at .55 are banned)

## 3. Spacing & Density Rules

- Spacing scale: `4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96` (px). No in-between odd values except clamp() fluid formulas.
- Section padding-y: `clamp(4rem, 10vw, 7.5rem)` — non-negotiable floor of 4rem on mobile.
- Card padding: ≥ 24px on all content-bearing cards (v1 polaroids at 10px are banned).
- Line-length: prose ≤ `38em`; price lists ≤ 720px wide.
- Max visible density: menu shows 6–10 items per active tab; workshops split into card tiles instead of enumerated walls; gallery dedup photos (8 max) vs v1's 11 photo surfaces.
- Doodles/decor: opacity ≤ .25 for floating motifs; never adjacent to body text.

## 4. Section-by-Section v2 Anatomy

1. **Preloader** — ruled-parchment sheet, 3 punched holes, terracotta margin line, steam cup (slower keyframes), Fraunces italic 900 name reveal with terra nib, rotating notes (4 strings), progress counter. Exit `.85s cubic-bezier(.76,0,.24,1)` translateY(-104%) rotate(-1.2deg). Min-hold 800ms, cap 2.5s; reduced-motion = simple fade.
2. **Nav** — fixed 72px; transparent → frosted `#fcf9e6e6` blur(12px) on scroll; circular logo; scaleX underline links; CTA "See the menu" as terra sticker button; mobile burger → clip-path circle sheet on parchment.
3. **Hero** — 100svh `--parchment`; 4 rotating photos (cafe-10/16/05/12) crossfade 6s under a walnut `#2a2116` gradient overlay ≥ 45% at text side; kicker + H1 + lede; 2 CTAs; live Open/Closed chip (Asia/Manila); 2 sparkles max.
4. **About** — H2 + 2 short lede paragraphs (38em), stat cards (`2 hrs`/`₱40`/`7–10`) padded ≥ 24px, ≤ 2 taped polaroids, 8-amenity grid with terra icon circles, ₱350 Study Space Package ticket card (punch holes + dashed perforation, mustard checks).
5. **Menu (tabbed)** — `--kraft` bg + soft walnut dot grid; category chip tabs; per-tab airy price rows (name + dotted leader `#34281b26` + tabular price), terracotta `*` markers for "printed menu" items; ₱350 welcome ticket on top; mobile = scrollable chip row; ARIA tablist + arrow keys.
6. **The Place** — 8 polaroid photos (captions from details.md), CSS masonry 3/2/1, tilt ≤ 1.5°, lightbox scrim `rgba(42,33,22,.88)`, keyboard + swipe.
7. **Saturdays** — kraft memo board; `No Gadget Kids Workshops` + `Learn · Create · Imagine`; 3 session cards (sage/mustard-soft/dusty-soft) w/ 2026 dates (past dimmed + ✓); inclusions chips; pricing rows (₱1,299 / ₱2,298 save ₱300 / ₱3,497 save ₱400); reserve panel with terra ghost buttons; motto terracotta `Because the best things happen offline.`
8. **Reviews** — ★5.0 summary; 5 index cards in a native scroll-snap row (NO JS drift carousel); paper/mustard-soft/sky-warm tints; quote watermark ≤ .12.
9. **Visit** — H2 `Find your seat`; **shared `ContactStrip`** (address lines, hours, phone/WhatsApp, email, socials) reused by footer; Google Maps **iframe embed** (lazy) in warm-framed card; `Get directions`; approximate-pin note.
10. **Footer** — `--forest` bg with parchment wave divider; Explore links; ContactStrip reprise; `brewed with care` doodles; link contrast ≥ 4.5:1 on forest.
11. **Notey chatbot** — 56px terra FAB (`--shadow-stick`), dismissible nudge; 380×600 `--paper` panel with dotted-grid scroll area, dashed separators, Gaegu bubbles (bot paper / user terra), typing dots, quick-reply chips, pill input. Intent KB = port of details.md table (menus, rates, hours w/ live status, location, contact, recommend, workshops, unknown-handlers for payment/parking/delivery/diets/pets, thanks/bye).

## 5. Motion (v2 rules)

- **One shared easing** `--ease: cubic-bezier(.22,1,.36,1)` for all transitions; reveal = rise 28px + fade, duration .8s, stagger `i × 60ms` max, once, viewport −72px.
- Ambient loops (steam, twinkle ≤2 items, bob, typing dots) remain pure CSS, slower and softer than v1.
- Hero: crossfade 6s (no Ken Burns zoom — calmer); lightbox scale .96→1 `.4s`; buttons lift `--shadow-soft → --shadow-lift` + translateY(-2px) `.25s`.
- Smooth scroll: native `scroll-behavior: smooth` OR Lenis duration 1.0 — pick one, no library unless needed.
- Reduced motion: global kill-switch (`transition/animation-duration: .001ms!important; iteration-count:1!important`), preloader fade, hero static photo, scroll-snap rows still work.

## 6. Accessibility (v2 minimums)

- Contrast: `--bark` on `--parchment` ≥ 4.5:1; white/parchment text on `--forest` ≥ 4.5:1; `--mustard` never used as text color on light ground (decoration only).
- Focus-visible: 3px cobalt outline offset 3px, radius 6px, everywhere.
- Tap targets ≥ 44px; menu tabs keyboard-switchable; lightbox Escape/arrows; chatbot Escape closes; skip-to-content link.
- Bike-shed rule: any icon-only control gets an aria-label from details.md vocabulary.

## 7. CSS Architecture (v2)

- Tailwind v4 (`@import "tailwindcss"`) + `@theme inline` mapping the token names and font vars.
- Custom component layer with BEM-ish names (`.nav`, `.hero`, `.menu-tabs`, `.tab-row`, `.card-polaroid`, `.tape`, `.chip`, `.btn-terra`, `.btn-ghost`, `.chat-*`) — same naming spirit as v1, warm values.
- Utilities: `.tape` (mustard zigzag), `.ruled` (38px lines), `.dotted-grid`, `.polaroid`, `.sticker` (sticker shadow), `Reveal` (shared Framer Motion wrapper targeting `opacity 0→1, y 28→0`).
- Framer Motion for enter/reveal/springs only; ambient loops in CSS; no physics carousels.

---

# Appendix — v1 Production Reference (extraction, 2026-10-26)

> The original design system extracted from `https://notepad-opal-three.vercel.app/` (React 19.3 + Vite, Tailwind v4 + shadcn tokens, Framer Motion, Lenis 1.3.26, MapLibre GL, lucide). Preserved for evidence and content-parity checks. **Do not reuse its cold tokens, hard shadows, or density values — the v2 spec above replaces them.** Items below marked (inferred) were not literal source values.

## A1. v1 Palette (superseded)

| Token | Value | Usage |
|---|---|---|
| `--cream` `#f8f7f0` | body bg | cold ground (v2 → parchment) |
| `--paper` `#fbfaf4` | cards | (v2 → warmer) |
| `--sand` `#efe9d6`/`--kraft` `#e8dcc3` | menu/events bg | (v2 → kraft `#ead9bd`) |
| `--ink` `#131c57` | text + hard shadows | (v2 → walnut) |
| `--ink-soft` `#3b4686` | secondary text | (v2 → bark) |
| `--cobalt` `#1c3aae` / `--cobalt-deep` `#12276f` | brand-dominant | (v2 → demoted `#43568f`, overlay `#1d2a56`) |
| `--sky` `#dfe6fa`, `--forest` `#2d3a22`, `--terra` `#c0451c`, `--sage` `#a9b48a`, `--mustard` `#e9b96e`, `--dusty` `#8fa3bf` | accents | family retained with warmed values |

## A2. v1 Typography (superseded)

- Fraunces display italic 900: `line-height .98`, `letter-spacing -.02em`, `font-variation-settings "opsz" 144 "SOFT" 100`
- Gaegu body 400 `1.28rem/1.5`, lede max-width 34em
- H2 `clamp(2.6rem,6.4vw,5.2rem)`; hero `clamp(2.5rem,7vw,5.4rem)`; eyebrow `.22em` uppercase
- Menu book pages in `cqw` container units (page base `2.9cqw/1.25`; `.pg-title` 7.4cqw; cover `menu` 19cqw; dish 4.3cqw/800 italic). **Banned in v2.**

## A3. v1 Signature Effects (motif reference — re-implement warmed)

- Preloader notebook sheet: ruled 38px lines + 24px dot grid + red margin line + punched holes; ink-write clip-path reveal with terra nib; steam paths; progress counter; exit `translateY(-104%) rotate(-1.2deg) .85s cubic-bezier(.76,0,.24,1)`
- 3D menu flip-book: `perspective 2600px`, rotateY ±180 `.62s cubic-bezier(.4,.02,.2,1)`, page-edge shadows — replaced by tabbed menu; only the "menu book" language/heritage naming survives
- Masking tape `.tape` `#e9b96eb8` 92×28px zigzag clip-path; torn strips via seeded-random polygons
- Hard sticker shadows `4px 4px 0 var(--ink)` family — replaced by warm soft shadows
- Hero Ken Burns `8.5s` slides every 6.5s; glass chips `#fbfaf41f`; open-dot ping
- Lenis smooth scroll duration 1.15; Framer Motion reveals `[.22,1,.36,1]` y36 .9s
- Reviews physics-drift carousel 34px/s with 3 duplicated sets — replaced by scroll-snap
- Paper-grain `feTurbulence` fixed overlay opacity .3 (v2: optional, ≤ .18)

## A4. v1 Breakpoints (superseded by one fluid-density approach)

≤520 / ≤560 / ≤620 / ≤640 / ≤820 (book single-page) / ≤899 / ≤900 / ≤920 (nav burger) / ≤980. v2 keeps this ladder only where stacking still needed; lead with generous mobile spacing rather than 9 cascading breakpoints.

## A5. Asset Manifest (still canonical)

35 images under `/images/` (cafe-01…cafe-16 + `-sm/-md` variants, `building.webp`, `workshop-poster.webp`, `logo.webp`), favicon `/favicon.png`, OG image `/images/cafe-10.webp`. Photos carry alt text in `docs/details.md` — reuse verbatim.
