# NotePads — UI Design Spec (v4 "Golden Corner" Elevate)

> **Status: CURRENT spec for the local rebuild.** This document defines the redesigned UI to be built in `notepads/`.
> v4 supersedes the v3 "Ink & Indigo" spec (2026-10-26), which itself superseded v2 "Warm Scholar" — a logo-matched revision. v2 fixed v1's cramped, cold production UI; v3 matched the identity to the brand logo (deep navy + cream + indigo) and swapped the display font to **Fredoka**; v4 *elevates* all of it — premium, warm, modern cafe brand, cozy study-hub personality kept. Direction source: user-crafted "impeccable" craft brief (2026-10-27).
> Why v4: v3's `#3d4bb8` drifted cool; the brief re-pins the brand blue to warm ultramarine **`#1c3aae`** with a slight purple lean (the logo's lettering ink), promotes honey/gold to a first-class highlight family (never readable-text on light ground), and adds the **accent-word rule** — one oblique gold-marked word per heading for a hand-crafted, premium feel. Copywriting moves from "least-invention verbatim" to **warm human tone**: headlines, ledes, CTAs, and buttons rewritten cozy/short; all *facts* (prices, hours, phones, addresses, dates, review quotes) stay verbatim from `docs/details.md`.
> History kept: v1 production extraction preserved verbatim as the **Appendix**; the v3 deltas are summarized in §0.3.
> Implementation checklist: `docs/task.md` (T0–T14 + T4.5/T4.6 re-theme records + E1–E13 v4 elevation section). Content source of truth: `docs/details.md`.

## §0.1 Design Concept (v4) — "Golden Corner"

A calm, airy page that feels like a warm corner of a cafe — cream and soft ivory grounds, warm navy handwriting ink, ultramarine accents, honey-gold highlights. The scholar/notebook world stays (taped polaroids, ruled paper, margin line, punched holes, doodles, study puns) but reads *premium*: generous whitespace, layered/asymmetric layouts (overlapping polaroids, offset cards), soft warm gradients, a light paper-grain, and one crafted touch per heading.

| Principle | Rule in v4 |
|---|---|
| Ground | warm cream `--parchment` + soft ivory `--paper`/`--ivory`; **never pure white, never gray** |
| Ink/text | deep warm navy `--ink` (+ `--ink-soft` secondary) — never pure black |
| Accent blue | warm ultramarine `--blue: #1c3aae` (slight purple lean) — buttons, links, icons, key text; hover `--blue-deep: #142c80` |
| Accent gold | **honey family** `--honey: #d9a441` / `--mustard: #e2b064` — highlights, checkmarks, tape, swash underlines, doodles; **never as readable text on light ground** |
| Supports | optional peach `#f4c8a4`, butter `#f6e3b4`, light caramel `#d8a869` in soft tints only |
| Banned | icy blues, teal, cold grays, harsh contrast; hard black offsets |
| Shadows | ink-tinted soft warm shadows (§1) |
| Whitespace | generous: big section padding, ≥32px gaps, ≤38em prose, airy cards (§3) |
| Layering | asymmetry + gentle overlap allowed for interest, but always easy to scan |

### §0.3 v3 → v4 delta summary (convenience)

- `--blue` `#3d4bb8` → `#1c3aae`; `--blue-deep` `#2a3482` → `#142c80`; blue sticker shadow re-pinned.
- New `--honey #d9a441` token next to `--mustard`; gold promoted from seasoning to the highlight family (still not light-bg text).
- Titles keep Fredoka 700 but gain the **accent-word rule** (§2.1) — supersedes the 2026-10-26 "plain titles, no embellishment" decision.
- Copy tone change: headlines/ledes/CTAs rewritten warm; new canonical lines: "Your cozy corner for focus", "Grab a seat — we saved you a plug", "Two free hours, on us".
- Backgrounds may blend cream→ivory soft gradients and light paper-grain; layout allows layered/offset compositions.
- Everything else in v3 stands: entrance rules, cleanliness bar, tabbed menu, scroll-snap reviews, live chips, self-hosted fonts.

### §0.4 Historical comparison (v1 → v3; evidence, not target)

| Principle | v1 (live site) | v2 (warm scholar) | v3 (ink & indigo) |
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

## 1. Color Palette (v4 tokens — canonical)

### Core tokens (`:root`)

| Token | Value | Usage |
|---|---|---|
| `--parchment` | `#f7f0e3` | Body background (warm cream ground — never pure white, never gray) |
| `--paper` | `#fdfaf2` | Cards, nav sheet, chat panel, light surfaces (soft ivory) |
| `--kraft` | `#ead9bd` | Alternating section backgrounds (menu, workshops) |
| `--ink` | `#1e2540` | Primary text — deep warm navy, never pure black; soft-shadow tint base |
| `--ink-soft` | `#4d5878` | Secondary text, descriptions, captions (audit ≥ 4.5:1 on `--parchment`; darken to `#454e6e` if it fails) |
| `--blue` | `#1c3aae` | **Primary accent — warm ultramarine, slight purple lean** — CTAs, link underlines, margin line, pen nib, motto, chatbot FAB, amenity icon circles, ticket punch detail |
| `--blue-deep` | `#142c80` | Hover/active states + focus outlines |
| `--honey` | `#d9a441` | **Deeper honey-gold** — swash/marker underlines, checkmarks, key-word marks; decoration only on light ground (never readable text) |
| `--terra` | `#b85433` | **Seasoning only** — in the shipped UI it survives only within the status-dot family; never a primary fill |
| `--mustard` | `#e2b064` | Tape, scribble highlights, check bullets, warm chip fill; gold-text permitted only on dark navy ground |
| `--sage` | `#a7b087` | Positive accents, session card tone |
| `--forest` | `#202a52` | **Deep warm navy** — footer background, menu chapter headers |
| `--dusty` | `#97a5b8` | Neutral card tone (3rd workshop card) |
| `--peach` | `#f4c8a4` | Optional soft support tint (cards/highlights only) |
| `--butter` | `#f6e3b4` | Optional soft support tint (cards/highlights only) |
| `--caramel` | `#d8a869` | Optional light-caramel support (borders/washes only) |
| `--overlay-deep` | `#1d2a56` | Photo overlay shade on hero/lightbox ONLY (nearly invisible as a "color") |
| `--nav-h` | `72px` | Fixed header height |
| `--maxw` | `1200px` | Content max width |
| `--gutter` | `clamp(20px, 5vw, 64px)` | Page side padding |
| `--ease` | `cubic-bezier(.22, 1, .36, 1)` | Single shared easing |

### Derived / utility values

- Ruled paper lines: `#1e254014` (graph/ruled grids; ink tint)
- Dotted grid: `#1e254012` / `#1e25400c`
- Margin line: `#1c3aae55` (ultramarine at half alpha)
- Dotted price leader: `#1e254026`
- Lightbox scrim: `rgba(30,37,64,.88)`
- Status dots: open `#4e8a5f` (warm green), closed `#c06a5a` (unchanged)
- Tape: `#e2b064b8`, shadow `0 1px 2px rgba(30,37,64,.12)`
- Scribble/swash highlight stroke: `--honey #d9a441` (marker stroke, decoration only; was `#e9c98a` in v3)
- Soft warm gradient: `linear-gradient(180deg, #fdfaf2, #f7f0e3)` allowed on section boundaries; light paper-grain ≤ .18 decorative layer where it adds depth
- **Blush ground `--blush #faf0dd` (2026-10-27)**: warm apricot-cream BLOCK ground for the hero page-top — deliberately warmer than `--parchment` so the top never blends into the nav/ivory; the hero wears a blush→cream gradient, faint dot grid, and a rounded bottom seam; **About + Visit become floating sheets, edge-to-edge FULL PAGE (no inline margins — uniform with Hero/Menu) with vertical seams of body parchment before/after the panel** — About wears the warm `--oat #f4e9d6` ground, Visit the ivory `--paper` ground (the 2026-10-27 about-rebuild pass: `--paper` read too white/cool, and the old inline margins broke edge alignment with the neighbors)
- **Oat ground `--oat #f4e9d6` (2026-10-27)**: warm oat sheet tone for the About floating panel — sits between `--blush` and `--kraft` (never white, never a clash with the hero); ivory `--paper` cards read white-on-cream on it, exactly the reference's layered panels
- Tinted card tones: sage-soft `#c9d0b4`, mustard-soft `#f0d8a8`, dusty-soft `#c2ccd8`, butter-soft `#f6e3b4` (new), peach-soft `#f8e3d2` (new)
- Dark section (footer): `--forest #202a52` deep warm navy only — never blue-black, never olive

### Shadows

```css
--shadow-soft:  0 6px 16px rgba(30,37,64,.12);   /* default card */
--shadow-lift:  0 10px 24px rgba(30,37,64,.16);  /* hover lift */
--shadow-stick: 6px 6px 0 #1c3aae33;             /* CTA "sticker" moment only */
```

Selection: `background: #1c3aae; color: #fdfaf2`. Focus: `outline: 3px solid #142c80; outline-offset: 3px; border-radius: 6px`.

## 2. Typography

| Role | Font | v4 rules |
|---|---|---|
| Display / titles | **Fredoka** (rounded, warm), self-hosted via `next/font/local` | Headings weight **600–700**; `line-height: 1.1` (1.06–1.14); `letter-spacing: -0.01em` (slightly tight); **no `font-variation-settings`**; never uppercase-forced. |
| Accent word (new §2.1) | Fredoka 700, `font-style: oblique 8deg` (fallback: `inline-block; transform: skewX(-8deg)`) | See §2.1 — ONE key word per main heading |
| Brand wordmark | Fredoka **700**, title case | Nav brand + preloader name; clean lockup, no italic |
| Body / hand | **Gaegu** 400/700 (`next/font/local`) | `1.35rem`, `line-height: 1.55–1.65`, max-width `38em`; friendly handwritten body kept, narrow readable width |
| Stacks | `--font-display: "Fredoka", system-ui, sans-serif` · `--font-hand: "Gaegu", "Comic Sans MS", cursive` | self-hosted woff2, CSS vars (`--font-fredoka` → `--font-display`, `--font-gaegu` → `--font-hand`) |

Fluid scale (calmer ceilings — big text never fights dense text):

- Site H2: `clamp(2rem, 4.6vw, 4rem)`
- Hero title: `clamp(2.4rem, 5.8vw, 4.4rem)`
- Lede: `clamp(1.25rem, 2vw, 1.5rem)`
- Brand: Fredoka 700 `1.45rem`; mobile sheet links `clamp(1.8rem, 6vw, 3rem)` (Fredoka 700, non-italic)
- **Eyebrow device BANNED** (carried-over v2 spec amendment; see task.md T1)
- **Menu text: fixed rem only** — dish names `1.05–1.15rem/800`, prices `1rem–1.1rem/700 tabular-nums`, no `cqw` anywhere, no opacity-below-.6 on text

### §2.1 Accent-word rule (v4 — revised 2026-10-27 by user review)

Every main heading (H1/H2) gets exactly ONE accent word:

1. **Pick one key word** with mood — e.g. "cozy", "home", "book". Never more than one per heading; the rest of the heading stays upright.
2. **Slant it lightly**: `display: inline-block; transform: skewX(-8deg)`. Never slant the whole heading.
3. **Color it deep gold**: the accent word itself is `--gold-text #b07f19` (deep honey, ≈3.5:1 on cream — reserved for LARGE heading text ≥ the WCAG large-text threshold; never body/small text). Plus a hand-drawn **honey swash underline that hugs the baseline** (≈100% of the word's width, `bottom: -0.12em`, stroke `--honey #d9a441`) — tight to the word, never a detached low line. Draws in on scroll (reduced-motion: instant/always drawn).
4. **On dark ground** (footer navy): brighter `--mustard` text on `--forest` (7.0:1), no swash.
5. Implementation: shared `<Accent>` component (word + swash SVG) everywhere; ≤ 1 swash per section; never adjacent to body copy.

> Divergence note (2026-10-27): the rule previously kept the word in `--ink` with a detached swash "never gold text on light ground". The user rejected the near-black word + floating line (position mismatch, color mismatch) and pinned the `ui_structure_reference.png` treatment — the accent word IS gold, with the swash hugging it. A dedicated `--gold-text` token was added (deep enough for large text; `--mustard`/`--honey` remain decoration-only for smaller text).

Copy note: headings rewritten for warmth first, accent word chosen to fit naturally (not every old heading survives slotted verbatim).

## 3. Spacing & Density Rules (v3 rules, v4 keeps them)

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

## 4. Section-by-Section v4 Anatomy (structure from v3, retinted + warm copy + accent words)

> Per-section copy lives in the E-task entries of `docs/task.md` (written against `docs/details.md` facts). Anatomy below records the v4 visual contract per section — all apply the §2.1 accent-word rule and retint `--blue #1c3aae` / `--honey` / `--paper #fdfaf2`.

1. **Preloader** — ruled-parchment sheet, 3 punched holes, **ultramarine margin line `#1c3aae55`**, steam cup (slower keyframes), **Fredoka 700 non-italic** name reveal with **blue** nib + glow, rotating notes (4 strings), progress counter. Exit `.85s cubic-bezier(.76,0,.24,1)` translateY(-104%) rotate(-1.2deg). Min-hold 800ms, cap 2.5s; reduced-motion = simple fade. Warm, subtle — a quiet first breath, never a performance.
2. **Nav** — fixed 72px; **alignment contract: gutter padding on the full-width header, plain `max-width: var(--maxw)` box centered inside** — identical to every section's `section { padding: … var(--gutter) } > .inner { max-width: var(--maxw) }` grid, so brand/CTA edges align exactly with section headings at every viewport width; transparent over the blush hero (cream band above the panel — see §4.3) → **lighter frosted paper `#fdfaf4f9`** blur(12px) saturate(1.1) on scroll with a **1px warm kraft hairline** bottom border (`rgba(234,217,189,.5)`, replaces the cool navy-tinted drop shadow); brand lockup **Fredoka 700 1.8rem** + Gaegu sub `0.95rem` next to the `logo.jpg` brand illustration set in a **circular brand coin** — 52px circle (42px logo inset), warm kraft border `#d3bd93` + faint honey inner ring (`inset 0 0 0 2.5px rgba(226,176,100,.3)`) on a face that exactly matches the logo's own cream ground `#f2efe4` (no `mix-blend-mode` — the blend inside the backdrop-filtered header caused Chromium scroll-repaint glitches where the nav failed to render fully while scrolling; honor that constraint if the logo asset ever changes), gentle ≤6° tilt on brand hover; desktop links (About / **Menu** / The Place / Saturdays / Reviews / Visit — 6 anchors; **re-added 2026-10-27**: with the `#menu` link removed the active-section observer skipped the menu, leaving "The Place" marked while visitors read the menu) **centered** on the brand | links | CTA axis, Gaegu 700 **1.3rem** (scaled to the 1.35rem body) with **honey `--d9a441`** scaleX underlines on hover/active (active link also reads `--blue`), gap 28px; **CTA = an action, not a scroll** — `.btn-blue` **"WhatsApp us"** (`https://wa.me/639952293755`, details.md general WhatsApp, `target=_blank`, MessageCircle icon; replaced the menu-anchored "Open the menu" so the nav carries no duplicate #menu control to the Menu link's scroll tracking); mobile burger → clip-path circle sheet on parchment with the same 6 links (Fredoka sheet links, ink-tinted shadows) + a full-width `.btn-blue` **"WhatsApp us"** CTA (staggered in after the 6th link, `.56s`) + contact block; Escape refocuses the burger; honey is decoration-only (§0.1); focus-visible stays the global 3px `--blue-deep` ring.
3. **Hero** — 100svh blush panel starting BELOW the nav band (cream band above; the behind-nav blend experiment was REVERTED 2026-10-27 on user request); soft cream→ivory gradient topped by a **dotted-paper grid** (2026-10-27, two fixes: background layers reordered — the opaque gradient had painted fully over the dots — then dots bumped from the invisible 1.2px @ 9% ink to **1.5px @ ink `#1e254024` on a 20px pitch**, firm on close look, quiet at a glance); 4 rotating photos crossfade 6s in taped polaroid frames (warm shadows, slight tilt); title **Fredoka 700** `clamp(2.4rem,5.8vw,4.4rem)` lh ~1.1 with **one accent word** (oblique + gold swash — e.g. "Your cozy corner for *focus*"); short warm lede ≤ 2 lines folding the location (chip with **blue** MapPin icon); 2 CTAs (`.btn-blue` + `.btn-ghost`) with warm labels; live Open/Closed chip (sage-green dot, hydration-safe Asia/Manila clock); collage garnish (2026-10-27 balance pass, repositioned after user feedback — every piece parked in genuinely open zones, never over a print): **top-right open band** (right of the front polaroid, above the small one) carries the drawn diamond-star constellation — 34px star top-right → 16px companion star (opacity .55, slow twinkle) → hand-drawn **honey flourish** (wave doodle, rotate 5°, opacity .5, at ~15%/right 7.5%) → 12px **plus scribble** (rotate 9°, opacity .45) drifting down like written margin marks; the **bottom sliver** between sticky note and small polaroid (x≈42–46%) holds a 12px tiny star (opacity .4, slowest twinkle) + a 10px plus (rotate −7°) — all mustard/honey decoration, hidden ≤640px to keep mobile airy; slow-twinkle ≤2 ambient; bobbing scroll cue.
4. **About** — ONE full-page section, three moments on one shared alignment box (T16 craft rebuild 2026-10-27, user-adjusted ×6). **(a) warm oat floating sheet** (`--oat #f4e9d6`, full-page edge-to-edge, radius clamp(24–40px), vertical parchment seams before/after; `padding clamp(4rem,10vw,7.5rem) + --gutter`): intro head **two-column ≥980 — Fredoka H2 LEFT ("Slow sips, soft light, and a place to *belong*") with a location chip beneath it (blue MapPin + "2nd floor · SDC Building · Mandurriao, Iloilo City" — facts already in the lede; fills the heading column's dead band, mirrors the hero chip) / Gaegu lede RIGHT** (seat/cup/plug line + tucked-address line), then a **sticky-note stat trio** (butter / paper / mustard-soft papers — warm accent family, each safely carrying ink-soft ≥5:1; tape pins, −1.2°–0.8° tilts settling to level on hover, gap 32px → 24px at ≥1020, **capped 900px + centered — round 5 "smaller" pass**, cards hug their own content height, type sized up so the roomy cards feel inhabited) — `2 hrs` "Wi-Fi, charging & a seat — on us"; `₱40` "every hour after your free stay"; **`Open daily`** (friendly header, not a bare time) "Mon – Sat · 7 – 10" + dashed-top small line "Sunday · 10 – 8"; **the two hand-drawn doodles (crisp-linework coffee cup LEFT / linking arrow RIGHT, ink-soft @ .4, honey steam) flank the capped trio ≥1020 — they eat the row's side bands (round 6 move off the shelf); décor budget still 2/section**; then a **4-up taped photo shelf** (side-by-side row, gentle alternating tilts ≤1.8°, hover settle; 2×2 on phones / 2-up mid / 4-up ≥1020; captions Gaegu in-frame — two About doc captions verbatim, one cozy line from the lede, the §6 "look for the glowing sign"): cafe-10 lounge · cafe-05 study stations · cafe-03 coffee counter · cafe-16 glowing sign. **(b) amenities band** on the parchment ground: centered Fredoka h3 "Comfort you don't have to ask for" + Gaegu sub; **UNIFORM 4×2 `--paper` card grid** (round 6: the wide/full bento spans and the butter-soft pantry ground RETIRED — every card equal, 24px padding, 48px blue icon circles; 4/2/1 responsive); rewritten cozy names ("Fast, free Wi-Fi", "Plugs within reach", "Two hours, on the house", "A calm, cool room", "Built for laptops", "Games for a breather", "The pantry is open", "Rent the whole room"). **(c) the elevated moment — ₱350 boarding-pass TICKET** (cobalt `--blue`, radius clamp(18–24px), `--shadow-lift`, **max-width var(--maxw) — uniform with the content pool**): deal column LEFT (Gaegu `--mustard` label "The study space deal"; Fredoka "Two hours — *everything* included" with the dark-ground `--goldtext` accent; includes checklist of 6 VERBATIM facts (dish names) in **2 columns ≥720px**, honey checks); tear-off stub RIGHT ≥900 (₱350 Fredoka cream, "One seat · two whole hours of quiet focus", `.btn-light` **"Grab a seat" → #visit** full-width, hourly small print under a dashed notch); horizontal perforation + stub cut below 900, vertical perforation + 2 punched parchment holes ≥900. Copy rule honored: every title/label/desc rewritten cozy, facts verbatim from details.md §4.
5. **Menu — "warm tabbed chapters" (T17 craft pass 2026-10-28; the same-day notepad + sequential-flip experiment was REVERTED on user feedback — M9 book-only revert; this is the shipped contract)** — kraft ground with a warm bottom blend toward lighter kraft + the softened ink dot grid (`#1e254010`-level wash). Header = ONE column: SectionTab `02 · Menu` (peach tone) + H2 **"There's a *chapter* for every craving"** (accent word *chapter* via `<Accent>` §2.1) + warm lede ("Rice bowls, crunchy bites, pasta, noodles and fresh-brewed coffee — flip through, find your favorite, and settle in."). **The ₱350 study-space ticket is REMOVED (user instruction: it duplicated the About boarding-pass ticket) — the menu carries no package promo.** The 8 category chips = **notebook page tabs**: rounded-top index tabs attached to the page card's top edge — inactive = tinted translucent paper (ink-soft text, 6.2:1 on the blended ground), active = full `--paper` connecting flush with a short honey `--honey` bottom-edge accent (decoration only); hover lift −2px; mobile = edge-bleeding scroll strip w/ snap; ARIA tablist + Arrow/Home/End roving focus unchanged. The page = plain `--paper` card (radius `0 18px 18px 18px`, `--shadow-soft`; NOT the ruled/spiral notepad — rejected): punched paper holes along the top edge (kraft cutouts + faint blue ring), blue margin line, groups (dataset names, e.g. `Knowledge Bowl (Rice Meal)`) as blue Gaegu chapter labels, dotted-leader price rows `#1e254026` + tabular prices, **blue** `*` markers verbatim; row hover = faint honey wash `#d9a44114` + name → `--blue`; tab switch = `menu-in` rise+fade with per-group stagger (i×70ms cap 3), single `--ease`. The printed-menu footnote is the **readable small-print chip card** centered under the book: inline-flex `--paper` chip, dashed warm border, Gaegu 700 `1.06rem`, `--ink-soft` on paper (6.75:1); sentence verbatim. All motion under the global reduced-motion kill.
6. **The Place** — warm H2 ("Come on *in*" or warmer) + lede; 8 polaroid photos, CSS masonry 3/2/1 with gentle offsets/overlaps, tilt ≤ 1.5°, hover settle-to-0 + lift; lightbox scrim **`rgba(30,37,64,.88)`**, keyboard + swipe.
7. **Saturdays** — kraft memo board; `No Gadget Kids Workshops` in **Fredoka 700** + `Learn · Create · Imagine`; 3 session cards (sage/mustard-soft/dusty-soft) w/ 2026 dates verbatim (past dimmed + drawn ✓); inclusions chips; pricing rows with honey save-accents; reserve panel with **blue** ghost buttons; motto in **`--blue`** — warm short invitation copy.
8. **Reviews** — ★5.0 summary (drawn stars, Fredoka); 5 index cards in a native scroll-snap row; paper/mustard-soft/sky-warm tints; quote watermark ≤ .12; review quotes stay verbatim (real testimonials).
9. **Visit** — H2 "Find your *seat*"; **shared `ContactStrip`** (address lines, hours, phone/WhatsApp, email, socials, **blue** accent icons) reused by footer; Google Maps **iframe embed** (lazy) in warm-framed card; `Get directions`; approximate-pin note; hours/price/location easy to find at a glance.
10. **Footer** — **deep warm navy `--forest #202a52`** background with parchment wave divider; Fredoka headings; Explore links; ContactStrip reprise; `brewed with care` doodles; **gold text accent allowed here** (mustard on navy 7.0:1); **link contrast ≥ 4.5:1 on `#202a52`**.
11. **Notey chatbot** — 56px **`.btn-blue`** FAB (`--shadow-stick`), dismissible nudge (`Questions? Ask Notey!`); 380×600 `--paper` panel with **ink-tinted** dotted-grid scroll area, dashed separators, Gaegu bubbles (bot paper / user **blue**), typing dots, quick-reply chips, pill input; chatbot's factual answers stay verbatim.

## 5. Motion

- **One shared easing** `--ease: cubic-bezier(.22,1,.36,1)` for all transitions; reveal = rise 28px + fade, duration .8s, stagger `i × 60ms` max, once, viewport −72px.
- Ambient loops (steam, twinkle ≤2 items, bob, typing dots) remain pure CSS, slower and softer than v1.
- Hero: crossfade 6s (no Ken Burns zoom — calmer); lightbox scale .96→1 `.4s`; buttons lift `--shadow-soft → --shadow-lift` + translateY(-2px) `.25s`.
- Cards: gentle hover = tiny tilt (≤ 2°, settling toward level) + lift (`--shadow-soft → --shadow-lift`); polaroids straighten on hover.
- Accent swash: hand-drawn gold underline draws in (stroke-dashoffset → 0, `.5s`) when scrolled into view, once; instant under reduced motion.
- Smooth scroll: native `scroll-behavior: smooth` only — no library.
- Reduced motion: global kill-switch (animations → 1ms), preloader fade, hero static photo, no swash draw-in, reveal wrappers render static — scroll-snap rows still work.

## 6. Accessibility

- Contrast: `--ink-soft #4d5878` on `--parchment` ≥ 4.5:1 (darken to `#454e6e` if it fails; on the oat sheet `--oat #f4e9d6` it measures ≈ 5.9:1); cream on navy `--forest #202a52` ≥ 4.5:1; **cream `--paper` on `--blue #1c3aae` ≈ 8.5:1 and `--mustard` on `--blue` ≈ 4.5:1 (About package board, 2026-10-27 — mustard carries LARGE display text only, honey/cream-tint checks stay decoration)**; `--blue #1c3aae` usable as accent/link text on parchment (darker than v3's — comfortably ≥ 7:1); `--mustard`/`--honey` never as text color on light ground (decoration only; gold text permitted only on `--forest` navy); scrims/swashes are decoration and never the only carrier of meaning.
- Focus-visible: 3px `#142c80` outline offset 3px, radius 6px, everywhere. Alt text meaningful (photo subject from details.md); buttons/links descriptive.
- Tap targets ≥ 44px; menu tabs keyboard-switchable; lightbox Escape/arrows; chatbot Escape closes; skip-to-content link.
- Bike-shed rule: any icon-only control gets an aria-label from details.md vocabulary.

## 7. CSS Architecture

- Tailwind v4 (`@import "tailwindcss"`) + `@theme inline` mapping the token names and font vars.
- Custom component layer with BEM-ish names (`.nav`, `.hero`, `.menu-tabs`, `.tab-row`, `.card-polaroid`, `.tape`, `.chip`, **`.btn-blue`** — renamed from `.btn-terra`, `.btn-ghost`, `.btn-light`, `.chat-*`).
- Utilities: `.tape` (mustard zigzag), `.ruled` (38px lines, `#1e254014`), `.dotted-grid`, `.polaroid`, `.sticker` (blue sticker shadow), `Reveal` (shared wrapper targeting `opacity 0→1, y 28→0`).
- Fonts: **shipped mechanism**: Fredoka = `next/font/local` (`app/fonts/fredoka-latin-var.woff2`, complete latin variable file, `--font-fredoka`). **Gaegu = self-hosted multi-slice @font-face** (`app/fonts/gaegu.css` + 22 woff2 slice files) — updated 2026-10-27: Google shards Gaegu's Latin across several woff2 files **per weight**, and the single "latin" slice that was self-hosted DID NOT CONTAIN the glyphs **H, I, M, N, 9, ’** (they live in Google's shards 99/117/118). With one slice only, every use of those glyphs fell back — visibly: the desktop nav **"Menu" M** rendered in a different font/size. gaegu.css now registers the needed slices **with their `unicode-range`s** so the browser reassembles the face exactly like Google's hosted CSS; the face itself is the same OFL files. `--font-gaegu` is defined in `globals.css` (`:root`), `--font-fredoka` still from `next/font/local`; CSS vars map to `--font-display`/`--font-hand` in `@theme inline`. All `font-variation-settings` and italic display rules removed app-wide. **Known glyph caveats (unchanged, pre-existing):** U+2013 en-dash, `·`, and ₱ have no glyph in any Gaegu slice — they render via the fallback stack (body fallback `"Comic Sans MS", cursive`).
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

> **Logo asset update (2026-10-27):** the nav brand mark now ships as **`/logo.jpg`** — the full "NOTE PADS / based in ILO / study hub cafe" brand illustration (ultramarine ink on its own cream paper ground, 1320×1321). It replaces the old `logo.png` coin (black square background — banned pure black, retired). Displayed inside a **circular brand coin** (52px, kraft border + faint honey inner ring, logo inset so nothing clips). NO `mix-blend-mode` on the mark (see §4.2 — blend inside the backdrop-filtered header broke Chromium scroll rendering); the coin face is `#f2efe4`, matching the asset's own ground, so no patch shows. `logo.png` remains on disk but is unused in the app.
