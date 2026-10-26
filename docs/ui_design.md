# NotePads — UI Design Spec (v3 "Ink & Indigo" Redesign)

> **Status: CURRENT spec for the local rebuild.** This document defines the redesigned UI to be built in `notepads/`.
> v3 supersedes the v2 "Warm Scholar" spec — a logo-matched revision (2026-10-26). v2 fixed v1's cramped, cold production UI; v3 keeps those fixes and swaps the identity from walnut/terracotta to the brand logo's own palette (deep navy + cream + indigo), warms every blue into the blue family, swaps the display font to **Fredoka**, and raises the aesthetic bar: cleaner, airier, never a 1:1 copy of the original production site.
> Why v3: the v2 palette was warm but brown-forward and its display font (Fraunces brushed serif) did not match the logo. The v3 palette is derived from the brand logo (`public/images/Screenshot 2026-10-26 220726.png`): near-black navy ground, cream circle, indigo-blue handwritten lettering. Blues are warmed (red/purple undertone) so the site feels like the logo, not like a corporate cobalt theme.
> The v1 spec (design system extracted from the live production site `notepad-opal-three.vercel.app`) is preserved verbatim as the **Appendix** at the bottom — incumbent evidence, explicitly **not** the target look.
> Implementation checklist: `docs/task.md` (T0–T14 + T4.5/T4.6 re-theme records). Content source of truth: `docs/details.md`.

## 0. Design Concept — "Ink & Indigo"

Keep the scholar/notebook world (taped polaroids, ruled paper, blue margin line, punched holes, doodles, study-pun microcopy) but ground it in the logo's identity: **cream ground, warm navy ink, indigo accents**, with mustard and terracotta as seasoning only. Fredoka provides a clean, strong, warm display voice that contrasts deliberately with Gaegu's handwriting (which already matches the logo's lettering). Warm blue tones only — never cold cobalt.

| Principle | v1 (live site) | v2 (warm scholar) | v3 (ink & indigo, this spec) |
|---|---|---|---|
| Ground | cold cream `#f8f7f0` | warm parchment `#f7f0e3` | warm parchment `#f7f0e3` (matches logo cream circle) |
| Dominant text color | deep navy `#131c57` | warm walnut `#34281b` | warm deep navy ink `#1e2540` (logo-derived) |
| Primary accent | cobalt blue `#1c3aae` everywhere | terracotta `#b85433`; cobalt demoted | **warm indigo `#3d4bb8`** — logo lettering color; terra + mustard kept as seasoning only |
| Shadows | `4px 4px 0 var(--ink)` hard black offsets | warm walnut soft offsets | warm **ink-tinted** soft offsets (`rgba(30,37,64,.12)`), blue sticker shadow on CTAs only |
| Display font | Fraunces italic 900 | Fraunces italic 900 | **Fredoka 600–700**, non-italic — clean typographic contrast to Gaegu handwriting |
| Display line-height | `.98` | `1.06–1.1` | `1.08–1.14` |
| Body type | 1.28rem / lh 1.5 in `cqw` units on menu | fixed rem, lh `1.55–1.65`, max-width `38em` | unchanged from v2 (Gaegu 400/700, 1.35rem) |
| Menu | 3D flip-book + 3-column list wall | warm tabbed chapters | unchanged from v2 (tabbed chapters) |
| Reviews | physics-drifting carousel | native scroll-snap cards | unchanged from v2 |
| Preloader hold | up to 4s | ≤ 2.5s hard cap | unchanged from v2 |
| Section padding-y | varies, tight | `clamp(4rem, 10vw, 7.5rem)` minimum | unchanged floor, plus the **cleanliness bar** (§3) |
| **Cleanliness** | dense, cramped walls | fixed density offenders | décor ≤ 2 motifs/section @ opacity ≤ .25; one elevated moment per screen; whitespace-first (never the cramped production look) |

## 1. Color Palette (v3 tokens — canonical)

### Core tokens (`:root`)

| Token | Value | Usage |
|---|---|---|
| `--parchment` | `#f7f0e3` | Body background (global ground) |
| `--paper` | `#fcf9ef` | Cards, nav sheet, chat panel, light surfaces |
| `--kraft` | `#ead9bd` | Alternating section backgrounds (menu, workshops) |
| `--ink` | `#1e2540` | Primary text; soft-shadow tint base (renamed from `--walnut`) |
| `--ink-soft` | `#4d5878` | Secondary text, descriptions, captions (audit ≥ 4.5:1 on `--parchment`; darken to `#454e6e` if it fails) |
| `--blue` | `#3d4bb8` | **Primary accent** — CTAs, link underlines, margin line, pen nib, motto, chatbot FAB, amenity icon circles, ticket punch detail |
| `--blue-deep` | `#2a3482` | Hover/active states + focus outlines (replaces `--cobalt` everywhere; the cobalt token is REMOVED) |
| `--terra` | `#b85433` | **Seasoning only** — in the shipped UI it survives only within the status-dot family; never a primary fill |
| `--mustard` | `#e2b064` | Tape, scribble highlights, check bullets, warm chip fill (seasoning kept) |
| `--sage` | `#a7b087` | Positive accents, session card tone |
| `--forest` | `#202a52` | **Deep navy** — footer background, menu chapter headers (logo-ground match; was olive `#3a4a2f`) |
| `--dusty` | `#97a5b8` | Neutral card tone (3rd workshop card) |
| `--overlay-deep` | `#1d2a56` | Photo overlay shade on hero/lightbox ONLY (nearly invisible as a "color") |
| `--nav-h` | `72px` | Fixed header height |
| `--maxw` | `1200px` | Content max width |
| `--gutter` | `clamp(20px, 5vw, 64px)` | Page side padding |
| `--ease` | `cubic-bezier(.22, 1, .36, 1)` | Single shared easing |

### Derived / utility values

- Ruled paper lines: `#1e254014` (graph/ruled grids; ink tint)
- Dotted grid: `#1e254012` / `#1e25400c`
- Margin line: `#3d4bb855` (warm indigo at half alpha)
- Dotted price leader: `#1e254026`
- Lightbox scrim: `rgba(30,37,64,.88)`
- Status dots: open `#4e8a5f` (warm green), closed `#c06a5a` (unchanged)
- Tape: `#e2b064b8`, shadow `0 1px 2px rgba(30,37,64,.12)`
- Scribble highlight stroke: `#e9c98a` (mustard, decoration only)
- Tinted card tones: sage-soft `#c9d0b4`, mustard-soft `#f0d8a8`, dusty-soft `#c2ccd8`
- Dark section (footer): `--forest #202a52` navy only — never blue-black, never olive

### Shadows

```css
--shadow-soft:  0 6px 16px rgba(30,37,64,.12);   /* default card */
--shadow-lift:  0 10px 24px rgba(30,37,64,.16);  /* hover lift */
--shadow-stick: 6px 6px 0 #3d4bb833;             /* CTA "sticker" moment only */
```

Selection: `background: #3d4bb8; color: #fcf9ef`. Focus: `outline: 3px solid #2a3482; outline-offset: 3px; border-radius: 6px`.

## 2. Typography

| Role | Font | v3 rules |
|---|---|---|
| Display / titles | **Fredoka** (rounded, warm), loaded via `next/font/google` | Headings **non-italic**, weight **700** (bold, poster-like — no handwriting/underline embellishments on titles); `line-height: 1.06–1.14`; `letter-spacing: 0` (rounded forms don't need tightening); **no `font-variation-settings`**; never uppercase-forced. Replaces Fraunces everywhere. |
| Brand wordmark | Fredoka **700**, title case | Nav brand + preloader name; clean lockup, no italic, no brushed-serif look |
| Body / hand | **Gaegu** 400/700 (kept — already matches the logo's handwriting) | `1.35rem`, `line-height: 1.55–1.65`, max-width `38em` |
| Stacks | `--font-display: "Fredoka", system-ui, sans-serif` · `--font-hand: "Gaegu", "Comic Sans MS", cursive` | loaded via `next/font/google`, CSS vars (`--font-fredoka` mapped to `--font-display`) |

Fluid scale (calmer ceilings than v2 — big text never fights dense text):

- Site H2: `clamp(2rem, 4.6vw, 4rem)`
- Hero title: `clamp(2.4rem, 5.8vw, 4.4rem)`
- Lede: `clamp(1.25rem, 2vw, 1.5rem)`
- Brand: Fredoka 700 `1.45rem`; mobile sheet links `clamp(1.8rem, 6vw, 3rem)` (Fredoka 700, non-italic)
- **Eyebrow device BANNED** (carried-over v2 spec amendment; see task.md T1)
- **Menu text: fixed rem only** — dish names `1.05–1.15rem/800`, prices `1rem–1.1rem/700 tabular-nums`, no `cqw` anywhere, no opacity-below-.6 on text

## 3. Spacing & Density Rules (v3)

- Spacing scale: `4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96` (px). No in-between odd values except clamp() fluid formulas.
- Section padding-y: `clamp(4rem, 10vw, 7.5rem)` — non-negotiable floor of 4rem on mobile.
- Card padding: ≥ 24px on all content-bearing cards.
- Line-length: prose ≤ `38em`; price lists ≤ 720px wide.
- Max visible density: menu shows 6–10 items per active tab; workshops split into card tiles; gallery max 8 photos.

**Cleanliness bar (new — the complaint against v1 was "cramped"):**

- Décor budget: ≤ 2 floating motif elements per section, opacity ≤ .25, never adjacent to body text; only the hero may carry sparkles.
- One elevated visual moment per screen; everything else supports it.
- Every section reads: Fredoka title → short lede (≤ 2 lines) → content. Nothing stacked dense.
- Grids gap ≥ 32px; no text walls (split ≥ 980px); white space is a feature, not a defect.
- Motifs are seasoning: lower opacity, warm-blue or mustard only, more margin around them.

## 4. Section-by-Section v3 Anatomy

1. **Preloader** — ruled-parchment sheet, 3 punched holes, **blue margin line `#3d4bb855`**, steam cup (slower keyframes), **Fredoka 700 non-italic** name reveal with **blue** nib + glow, rotating notes (4 strings), progress counter. Exit `.85s cubic-bezier(.76,0,.24,1)` translateY(-104%) rotate(-1.2deg). Min-hold 800ms, cap 2.5s; reduced-motion = simple fade.
2. **Nav** — fixed 72px; transparent → frosted `#fcf9efe0` blur(12px) on scroll; circular logo; brand lockup **Fredoka 700**; scaleX underline links in **`--blue`**; CTA "See the menu" as **`.btn-blue`** sticker button; mobile burger → clip-path circle sheet on parchment with Fredoka sheet links (ink-tinted shadows).
3. **Hero** — 100svh `--parchment`; 4 rotating photos crossfade 6s under an **ink-navy** gradient overlay ≥ 45% at text side; title **Fredoka 700 non-italic** `clamp(2.4rem,5.8vw,4.4rem)` lh 1.06, plain — NO scribble/handwriting embellishment on titles (user decision 2026-10-26); lede folds the location line (chip with **blue** MapPin icon); 2 CTAs (`.btn-blue` + `.btn-ghost`); live Open/Closed chip (sage-green dot, hydration-safe Asia/Manila clock); ≤ 2 sparkles (mustard); bobbing scroll cue.
4. **About** — Fredoka H2 + 2 short lede paragraphs (38em), stat cards (`2 hrs`/`₱40`/`7–10`) padded ≥ 24px, ≤ 2 taped polaroids, 8-amenity grid with **blue** icon circles, ₱350 Study Space Package ticket card (punch holes + dashed perforation, mustard checks).
5. **Menu (tabbed)** — `--kraft` bg + **ink-tinted** soft dot grid; category chip tabs; per-tab airy price rows (name + dotted leader **`#1e254026`** + tabular price), **blue** `*` markers for "printed menu" items; ₱350 welcome ticket on top; mobile = scrollable chip row; ARIA tablist + arrow keys.
6. **The Place** — 8 polaroid photos, CSS masonry 3/2/1, tilt ≤ 1.5°, lightbox scrim **`rgba(30,37,64,.88)`**, keyboard + swipe.
7. **Saturdays** — kraft memo board; `No Gadget Kids Workshops` in **Fredoka 700** + `Learn · Create · Imagine`; 3 session cards (sage/mustard-soft/dusty-soft) w/ 2026 dates (past dimmed + ✓); inclusions chips; pricing rows; reserve panel with **blue** ghost buttons; motto in **`--blue`** — `Because the best things happen offline.`
8. **Reviews** — ★5.0 summary (Fredoka); 5 index cards in a native scroll-snap row; paper/mustard-soft/sky-warm tints; quote watermark ≤ .12.
9. **Visit** — Fredoka H2 `Find your seat`; **shared `ContactStrip`** (address lines, hours, phone/WhatsApp, email, socials, **blue** accent icons) reused by footer; Google Maps **iframe embed** (lazy) in warm-framed card; `Get directions`; approximate-pin note.
10. **Footer** — **deep navy `--forest #202a52`** background with parchment wave divider; Fredoka headings; Explore links; ContactStrip reprise; `brewed with care` doodles (mustard accents kept); **link contrast ≥ 4.5:1 on `#202a52`**.
11. **Notey chatbot** — 56px **`.btn-blue`** FAB (`--shadow-stick`), dismissible nudge; 380×600 `--paper` panel with **ink-tinted** dotted-grid scroll area, dashed separators, Gaegu bubbles (bot paper / user **blue**), typing dots, quick-reply chips, pill input.

## 5. Motion

- **One shared easing** `--ease: cubic-bezier(.22,1,.36,1)` for all transitions; reveal = rise 28px + fade, duration .8s, stagger `i × 60ms` max, once, viewport −72px.
- Ambient loops (steam, twinkle ≤2 items, bob, typing dots) remain pure CSS, slower and softer than v1.
- Hero: crossfade 6s (no Ken Burns zoom — calmer); lightbox scale .96→1 `.4s`; buttons lift `--shadow-soft → --shadow-lift` + translateY(-2px) `.25s`.
- Smooth scroll: native `scroll-behavior: smooth` only — no library.
- Reduced motion: global kill-switch, preloader fade, hero static photo, scroll-snap rows still work.

## 6. Accessibility

- Contrast: `--ink-soft #4d5878` on `--parchment` ≥ 4.5:1 (darken to `#454e6e` if it fails); white/parchment text on navy `--forest #202a52` ≥ 4.5:1; `--blue #3d4bb8` usable as accent/link text on parchment (≈ 7:1 — fine for accents and links); `--mustard` never as text color on light ground (decoration only).
- Focus-visible: 3px `#2a3482` outline offset 3px, radius 6px, everywhere.
- Tap targets ≥ 44px; menu tabs keyboard-switchable; lightbox Escape/arrows; chatbot Escape closes; skip-to-content link.
- Bike-shed rule: any icon-only control gets an aria-label from details.md vocabulary.

## 7. CSS Architecture

- Tailwind v4 (`@import "tailwindcss"`) + `@theme inline` mapping the token names and font vars.
- Custom component layer with BEM-ish names (`.nav`, `.hero`, `.menu-tabs`, `.tab-row`, `.card-polaroid`, `.tape`, `.chip`, **`.btn-blue`** — renamed from `.btn-terra`, `.btn-ghost`, `.btn-light`, `.chat-*`).
- Utilities: `.tape` (mustard zigzag), `.ruled` (38px lines, `#1e254014`), `.dotted-grid`, `.polaroid`, `.sticker` (blue sticker shadow), `Reveal` (shared wrapper targeting `opacity 0→1, y 28→0`).
- Fonts: Fredoka via `next/font/google` with `weight: ["300","400","500","600","700"]` (variable font — do NOT pass `axes` together with `weight`, the known Next 16.4.3 failure); Gaegu via `next/font/google`; CSS vars `--font-fredoka`/`--font-gaegu` mapped to `--font-display`/`--font-hand` in `@theme inline`. All `font-variation-settings` and italic display rules removed app-wide.
- Framer Motion for enter/reveal/springs only; ambient loops in CSS; no physics carousels.

---

# Appendix — v1 Production Reference (extraction, 2026-10-26)

> The original design system extracted from `https://notepad-opal-three.vercel.app/` (React 19.3 + Vite, Tailwind v4 + shadcn tokens, Framer Motion, Lenis 1.3.26, MapLibre GL, lucide). Preserved for evidence and content-parity checks. **Do not reuse its cold tokens, hard shadows, or density values — the v3 spec above replaces them.** Items below marked (inferred) were not literal source values.

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
- Menu book pages in `cqw` container units (page base `2.9cqw/1.25`; `.pg-title` 7.4cqw; cover `menu` 19cqw; dish 4.3cqw/800 italic). **Banned in v2+.**

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
