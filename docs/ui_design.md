# NotePads Study Hub Cafe — UI Design System Documentation

> Source: https://notepad-opal-three.vercel.app/
> Stack: React 19.3 + Vite, Tailwind v4 (with shadcn/ui token layer), Framer Motion, Lenis 1.3.26 (smooth scroll), MapLibre GL (map, code-split), lucide icons.
> All colors, timings, easings, and breakpoints below are literal values extracted from the production CSS/JS unless marked (inferred).

## 1. Design Concept

The entire UI is themed as a **notebook / stationery spread** — the visitor is "a scholar" writing in a study pad. Core visual metaphors:

- Ruled-paper and graph-paper backgrounds
- A red margin rule down the left side
- Punched binder holes
- Masking tape holding photos and cards
- Torn paper edges
- Ink-writing reveals (clip-path wipe with a pen nib)
- Hand-drawn doodles (coffee cup, bean, sparkle, squiggle, smiley, bee, cat)
- Hard "sticker" offset shadows instead of soft blur shadows
- Polaroid photo frames with handwritten captions
- The menu rendered as a physical 3D flip-book
- Study-pun microcopy everywhere (see `details.md`)

## 2. Color Palette

### Brand tokens (`:root`)

| Token | Value | Usage |
|---|---|---|
| `--cream` | `#f8f7f0` | Body background, punch-hole fill |
| `--paper` | `#fbfaf4` | Cards, preloader bg, light surfaces |
| `--sand` | `#e8dcc3` / `#efe9d6` | Menu section background |
| `--kraft` | `#e8dcc3` | Events section (kraft/graph paper) |
| `--ink` | `#131c57` | Primary text, hard-shadow color |
| `--ink-soft` | `#3b4686` | Secondary text |
| `--cobalt` | `#1c3aae` | Primary brand blue — buttons, accents, selection, focus ring, `theme-color` |
| `--cobalt-deep` | `#12276f` | Hero background |
| `--sky` | `#dfe6fa` | Hover wash, chip backgrounds |
| `--forest` | `#2d3a22` | Menu-book pages, wave shape |
| `--terra` | `#c0451c` | Pen-nib red, margin lines, baked-goods pages, stars |
| `--sage` | `#a9b48a` | Workshop card tone |
| `--mustard` | `#e9b96e` | Accents, stars, tape, scribble highlights |
| `--dusty` | `#8fa3bf` | Workshop card tone |
| `--nav-h` | `76px` | Fixed header height |
| `--maxw` | `1200px` | Content max width |
| `--gutter` | `clamp(18px, 4vw, 48px)` | Page side padding |
| `--ease` | `cubic-bezier(.22, 1, .36, 1)` | Default easing |

### Derived / one-off values

- Ruled lines: `#1c3aae21` (preloader), `#131c5714` (menu dots, graph grid)
- Dotted grid: `#131c5712` (preloader, chat), `#131c5721` (menu section)
- Margin line: `#c0451c73`; pen-nib glow: `#c0451c80`
- Hero photo shades: `#0e164a` family at various alphas
- Lightbox scrim: `#0a1034eb`; deep section shades: `#0a1034` family
- Open/closed status dots: `#4ade80` (open, animated ping), `#f87171` (closed)
- Tape: `#e9b96eb8` with `0 1px 2px #0000001f` shadow
- Nav (scrolled): frosted `#f8f7f0e6` + `blur(14px) saturate(1.3)`

### Tailwind/shadcn token layer (coexisting)

`--background: #f8f7f0` · `--foreground: #131c57` · `--card: #fbfaf4` · `--primary: #1c3aae` · `--primary-foreground: #fbfaf4` · `--secondary: #e6ebfa` · `--ring: #1c3aae` · `--radius: 1rem`. A `.dark` block exists (shadcn boilerplate) but no dark-mode toggle is wired up the UI (inferred: unused).

- Text selection: `background: var(--cobalt); color: var(--paper)`
- Focus: `:focus-visible { outline: 3px solid var(--cobalt); outline-offset: 3px; border-radius: 6px }`

## 3. Typography

| Role | Font | Sample styling |
|---|---|---|
| Display (headings, brand) | **Fraunces** — Google Fonts variable serif (`ital,opsz,wght@0,9..144,400..900;1,…`) | Italic 900, `font-variation-settings: "opsz" 144, "SOFT" 100`, `letter-spacing: -.02em`, `line-height: .98` |
| Body / handwriting | **Gaegu** (`wght@400;700`) | Body uses Gaegu 400 at `1.28rem`, `line-height: 1.5` |
| Fallback stacks | `--font-display: "Fraunces", Georgia, serif` · `--font-hand: "Gaegu", Comic Sans MS, cursive` | |

Fluid scale:

- Site H2: `clamp(2.6rem, 6.4vw, 5.2rem)`
- Hero title: `clamp(2.5rem, 7vw, 5.4rem)`
- Lede: `clamp(1.3rem, 2vw, 1.55rem)`, max-width `34em`
- Eyebrow: Gaegu 700, `1.15rem`, `letter-spacing: .22em`, uppercase, cobalt, with a `34px × 2px` tick line
- Nav brand: Fraunces italic 900 `1.55rem`; mobile sheet links Fraunces italic 900 `clamp(2.6rem, 11vw, 4rem)`
- **Menu book pages** use container-query units (`cqw`): page base `2.9cqw/1.25`; `.pg-title` `7.4cqw` Fraunces 900 italic (cover word `menu` up to `19cqw` lowercase); dish names `4.3cqw/800 italic`; prices `4cqw/900 italic`; page numbers `3.4cqw` at opacity `.55`

## 4. Section Anatomy & Components

### Preloader (inlined so it paints with first byte of HTML)

- Notebook sheet on `#fbfaf4`: 38px repeating ruled lines `#1c3aae21` over a 24px dotted grid `#131c5712`; red margin rule `#c0451c73` (2px) at `clamp(34px, 7vw, 92px)`; three punched holes with `inset 0 2px 4px #131c5747`
- Coffee cup SVG with 3 staggered steam paths (opacity `.18→.7`, translateY)
- Brand name in Fraunces italic 900 with an ink-write reveal: ghost text at `#1c3aae21` + clip-path `inset(0 100% -20% 0)` wiping in, tracked by a `#c0451c` pen nib (2.5px bar + 9px glowing dot)
- 320px progress rule; cycling loading notes; italic page-number percentage counter
- Exit: `translateY(-104%) rotate(-1.2deg)` over `.85s cubic-bezier(.76,0,.24,1)`
- Handshake: `window.__notepadsReady()` (fonts ready + hero image decoded; 3.5s fallback, 4s hard cap)

### Nav

- Fixed 76px header, transparent over hero → frosted paper when scrolled (`.is-scrolled`)
- Circular logo, animated scaleX underline links (`transform .4s var(--ease)`)
- "See the menu" CTA; burger opens a full-screen cobalt `.nav-sheet` with a circular clip-path reveal (`clip-path: circle(0%→150%)`, `.6s cubic-bezier(.76,0,.24,1)`) and staggered links (`.2s + i × .06s`)
- Active-section tracking via IntersectionObserver (`-45% 0px -50% 0px`)

### Hero

- `100svh`, `--cobalt-deep` background, 7-photo Ken Burns slideshow (`8.5s linear forwards`, scale 1.12→1.02; auto-advance 6.5s, crossfade 1.6s, paused offscreen via IntersectionObserver)
- Spring-in logo medallion (spring: `stiffness: 120, damping: 12, delay: .15`) with `0 0 0 3px var(--cobalt)` ring
- Glass status chips (`#fbfaf41f` bg / `#fbfaf48c` border) with live Open/Closed logic + `ping` dot
- Mustard scribble-highlight under key title words (`.scribble:after` masked wavy underline)
- Bobbing scroll cue (`2.4s ease-in-out infinite`, translateY 8px), twinkling sparkles, squiggle doodle

### About & Package

- Display head + lede; stat cards (`2 hrs / ₱40 / 7–10`)
- Three taped polaroids (rotate −5°/4°/−3°, hover flattens + scale 1.03)
- Floating hand-drawn doodles at opacity .22
- Amenity grid: cobalt icon circles; hover `translateY(-6px) rotate(-1deg)` + sky bg + cobalt shadow
- Cobalt "Study Space Package" ticket card with cream punch holes and dashed perforation + mustard check bullets

### Menu (centerpiece: the flip-book)

- Sand background with cobalt radial glow and masked dot grid; Book/List segmented toggle
- Book: `perspective: 2600px`; 12 page-spreads as 3D sheets; page flip `.62s cubic-bezier(.4,.02,.2,1)` (rotateY 0↔−180 via Framer Motion MotionValues); spread slide `.55s`; edge "peek" hover `.45s`
- Layered page-edge shadows (`2px 1px #ebe6d6 … 9px 8px 18px #131c574d`), spine line, gutter gradients
- Interactive: drag / tap edge / ← → keys / aria (`role=group`, `aria-roledescription=book`, live-region page status)
- Chapters: forest-green coffee pages, terra baked goods pages with hand-drawn frame, torn-paper photo strips (JS seeded-random `polygon()` clip-paths)
- Switches to single-page mode below `820px` (`matchMedia`)
- List fallback: 3-column CSS layout of `.ml-card`s with dotted price leaders `#131c5740`

### Gallery ("The Place")

- 4-col dense mosaic of polaroid shots (`padding: 10px 10px 40px`, caption strip, ±1.8° tilt, taped corners)
- Zoom-in hover badge; lightbox: `.25s` scrim fade, figure scale `.94→1` over `.4s cubic-bezier(.22,1,.36,1)`, Escape + arrow keys, swipe if drag > 90px

### Saturday Workshops (Events)

- Kraft-graph background: `repeating-linear-gradient` 40px grid `#131c5714` on both axes
- Sticky taped poster (rotate −2.5°), cobalt title card (−.6°)
- Session cards in sage/mustard/dusty tones with tape, date chips; past dates dimmed + badge-check
- "What's included" dashed-border card; pricing table with dashed separators and terra "save ₱300/400" notes
- Cobalt reserve panel with light ghost buttons; terra motto line

### Reviews

- Cobalt section with rain of review dots; 5.0★ summary
- Self-drifting drag carousel (velocity-based, not a marquee): drift 34px/s, drag momentum with decay `0.04^t`, arrows add ±900 velocity; 3 duplicated sets for seamless wrap; masked edges
- Index-card styled review cards (paper/mustard/sky variants), quote watermark at opacity .16, offset shadow `8px 10px #0a103473`, cobalt avatar initials

### Location (Visit)

- Info card (address/hours/phone/socials with lift-and-tilt icon hovers) beside a lazy MapLibre map in a cobalt-shadowed frame
- Pulsing logo pin (`pinring`: scale 2.1 fade, 2.4s), paper popup card, zoom/fullscreen controls

### Footer

- Ink (`#131c57`) background with a flipped cream wave SVG on top
- 4-col grid, mustard headings, dashed top rule, doodle sign-off `brewed with care` (cup/bean/sparkle SVGs)

### Chat Widget "Notey"

- Lazy chunk; 64px cobalt FAB (`border: 3px solid var(--ink)`, `4px 4px 0` shadow); speech-bubble nudge (`border-radius: 999px 999px 4px`)
- 400×620 paper panel (`3px` border, `8px 8px 0` hard shadow + soft shadow), dotted-grid scroll area, dashed separators
- Gaegu bubbles: bot on paper, user on cobalt; typing dots (`blink`, 1.1s, 3 dots staggered); quick-reply chips; pill input

## 5. Motion Inventory

All motion is reduced-motion aware — a global kill-switch at the end of the stylesheet:

```css
@media (prefers-reduced-motion: reduce) {
  * { transition-duration: .001ms !important; animation-duration: .001ms !important;
      animation-iteration-count: 1 !important; }
}
```

Plus targeted handling: preloader fades via opacity `.3s`, Lenis scrolls instantly (duration 0, `smoothWheel: false`), book flips become instant, hero shows a static image.

| Effect | Timing / easing | Source |
|---|---|---|
| Preloader steam | `2.4s ease-in-out infinite`, delays .35s/.7s | CSS `pre-steam` |
| Preloader exit | `.85s cubic-bezier(.76,0,.24,1)` translateY(-104%) + rotate(-1.2deg) | CSS/vanilla JS |
| Hero Ken Burns | `8.5s linear` scale 1.12→1.02; crossfade 1.6s | CSS `kenburns` |
| Twinkle doodles | `3.2s/4s/5s ease-in-out infinite` | CSS `twinkle` |
| Open-dot ping | `2s infinite` scale 1→3.2 | CSS `ping` |
| Scroll cue bob | `2.4s` translateY 8px | CSS `bob` |
| Book flip | `.62s cubic-bezier(.4,.02,.2,1)` rotateY 0↔−180 | Framer Motion |
| Nav underline / scrolled | `.4s var(--ease)` | CSS |
| Nav sheet reveal | `.6s cubic-bezier(.76,0,.24,1)` clip-path circle | CSS |
| Buttons | shadow/transform `.35s var(--ease)`; hover shadow 4px→7px + translate(−2px,−2px); active 1px + translate(2px,2px) | CSS |
| Amenity cards | hover `translateY(-6px) rotate(-1deg)` `.4s` | CSS |
| Scroll reveals (shared `Reveal`) | Framer Motion `whileInView`: duration `.9`, ease `[.22,1,.36,1]`, y:36, once, viewport −80px | JS |
| Polaroids / gallery | 1s / .8s staggered entrances; hover rotate→0, scale 1.025–1.03 | Framer Motion |
| Map pin ring | `2.4s ease-out infinite` | CSS `pinring` |
| Chat typing dots | `1.1s infinite`, delays .18s/.36s | CSS `blink` |
| Reviews carousel | rAF physics: 34px/s drift, drag momentum, decay `0.04^t` | JS |
| Smooth scroll (Lenis) | duration `1.15`, exponential easing, `autoRaf`; anchor scrolls ~1.6s, nav offset 76px | JS |

## 6. Responsive Breakpoints

All literal, CSS + JS (`matchMedia`):

| Breakpoint | Effect |
|---|---|
| ≤ 520px | Amenities, collage, mosaic, chat stack |
| ≤ 560px | Footer stacks |
| ≤ 620px | Sessions / inclusions grids |
| ≤ 640px | Lightbox arrows + hero scroll cue/squiggle hidden |
| ≤ 820px | Menu book typography bump; JS switches book to **single-page mode** |
| ≤ 899px | Chat nudge hidden |
| ≤ 900px | Mosaic → 2 columns |
| ≤ 920px | Nav collapses to burger; location section stacks |
| ≤ 980px | About / package / events sections stack |

Lazy-mount IntersectionObserver gates: 700px (menu book), 900px (map min-height), 1000px (Location & Chatbot chunks). Tailwind container scale: 40/48/64/80/96rem.

## 7. CSS Architecture

- **Two stacked token systems:**
  1. Tailwind v4 `@theme` + shadcn/ui layer (oklch values, `--radius: 1rem`, `.dark` variant) — used by primitive components (chat form, controls)
  2. Hand-authored brand layer (`--cream … --dusty`, `--font-display/--font-hand`, `--ease`, `--nav-h`, `--maxw`, `--gutter`) — powers the custom design system
- **Layers:** Tailwind `@layer properties/theme/base/utilities` + `@property` registrations for custom properties (transform/shadow/scroll-fade/shimmer), then a fully custom component layer with terse BEM-ish class names (`.btn`, `.nav`, `.hero-*`, `.pg-*`, `.pg-num...`, `.rv-*`, `.ev-*`, `.chat-*`)
- **Layout techniques:** container queries (`container-type: size` on book faces, `cqw` page typography), `clamp()` fluid type/spacing, CSS columns (menu list), mask fades
- **Performance:** inlined preloader CSS (paints before JS), font preconnect/preload, code-split Chatbot/Location chunks, responsive `-sm/-md.webp` image variants, hero preload + decode handshake, next-slide preloading
- **Libraries:** Framer Motion (reveals, springs, drag, 3D book), Lenis (smooth scroll, `respectReducedMotion`), MapLibre GL (code-split), lucide icons; ambient loops pure CSS keyframes

## 8. Accessibility Notes

- `prefers-reduced-motion` honored in 4 independent places (global CSS kill-switch, preloader fade, Lenis instant mode, instant book flips + static hero)
- Focus-visible cobalt outline (3px, offset 3px)
- Full keyboard support on the book (arrow keys), lightbox (Escape/arrows), carousel (drag with ARIA announcement)
- ARIA roles/labels throughout: `aria-roledescription="book"`, carousel drag hint, dialog lightbox, live-region page status, labeled controls (`Zoom in`, `Toggle fullscreen`, etc.)

## 9. Design Takeaways (for building a similar site)

1. Lead with one strong metaphor and commit everywhere — notebook paper, flip-book menu, scholar microcopy, doodles, tape.
2. Hard offset shadows (`Npx Npx 0 var(--ink)`) give a sticker/print character while staying cheap to render.
3. Pair a variable serif display (Fraunces italic 900) with a handwriting font (Gaegu) — display hierarchy carries the design.
4. Ambient motion (steam, twinkle, bob, drift) comes from short pure-CSS keyframes; entrance/interaction motion from Framer Motion with a single shared easing `[.22,1,.36,1]`.
5. Respect reduced motion as a first-class mode, not an afterthought.
6. Turn the biggest product surface (the menu) into the signature interaction (3D book) with a pragmatic list fallback and print-photo lightbox.
