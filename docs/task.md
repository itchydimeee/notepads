# NotePads UI Rebuild — Implementation Checklist

> Plan: **"Warm scholar" rebuild** (approved 2026-10-26). Design source: `docs/details.md` (content parity) + `docs/ui_design.md` (existing system, to be replaced by `DESIGN.md`).
> Work through T0 → T14 in order, one task at a time. Check off boxes only when the acceptance criteria are verified, not when written.

## Design Non-Negotiables (apply to every task)

- [ ] Palette = warm tokens only: `--parchment #f7f0e3`, `--paper #fcf9ef`, `--kraft #ead9bd`, `--walnut #34281b`, `--bark #6b5343`, `--terra #b85433`, `--mustard #e2b064`, `--sage #a7b087`, `--forest #3a4a2f`, `--cobalt #43568f` (links/focus only), `--dusty #97a5b8`, overlay `#1d2a56`.
- [ ] Shadows warm & soft: default `0 6px 16px rgba(52,40,27,.12)`; sticker shadow `6px 6px 0 #b8543333` on CTAs only.
- [ ] Display line-height ≥ 1.06; body line-height ≥ 1.5; no `cqw` units for text; no `letter-spacing` beyond −0.01em on display.
- [ ] Section padding-y ≥ `clamp(4rem, 10vw, 7.5rem)`; page gutter `clamp(20px, 5vw, 64px)`.
- [ ] Content parity: strings come from `docs/details.md` — no invented copy.
- [ ] Every interactive target ≥ 44px tap size; focus-visible outlines (walnut/terra); `prefers-reduced-motion` honored.
- [ ] Next 16.4.3: read `node_modules/next/dist/docs/` before unfamiliar APIs.

---

## T0 — Foundations

- [ ] `npm install framer-motion lucide-react` (NO MapLibre — Visit uses a Google Maps iframe).
- [ ] Download production photos from `https://notepad-opal-three.vercel.app/images/*` (cafe-01…cafe-20 webp, `-sm`/`-md` variants as needed) into `public/images/`; grab `/logo-256.png` as `public/logo.png`.
- [ ] Fonts: load **Fraunces** (variable, italic axis) + **Gaegu** (400/700) via `next/font/google`; expose CSS vars `--font-display`, `--font-hand`.
- [ ] Rewrite `app/globals.css`: Tailwind v4 import replaced with warm token block (`:root` + `@theme inline`), warm shadow utilities, tape/ruled-paper/polaroid utilities, reduced-motion kill-switch.
- [ ] Rewrite `app/layout.tsx`: metadata title `NotePads Study Hub Cafe · Iloilo City`, description from docs/details.md, lang="en", theme-color `#b85433`.
- [ ] **DoD:** `npm run dev` still starts; tokens visible when body bg set to `--parchment`.

## T1 — Design artifacts

- [ ] Run `.agents/skills/impeccable/scripts/impeccable.cmd context` (Windows); load `reference/new-work.md` + `concept-seed` flow.
- [ ] Write `notepads/DESIGN.md` (warm scholar world: palette above, type rules, motifs, motion rules) + surface brief for the landing page.
- [ ] Read `.agents/skills/impeccable/reference/craft-floor.md` before the first UI edit.
- [ ] **DoD:** DESIGN.md + brief exist and match the token table above.

## T2 — Preloader

- [ ] Ruled-paper sheet on `--parchment` (38px rules `#34281b14`, red terracotta margin line, 3 punched holes).
- [ ] Coffee cup + steam (2 CSS keyframes, slower/cuter), brand name Fraunces italic 900 revealed by Gaegu-style brush wipe with terra nib.
- [ ] Rotating notes (4 strings from details.md), progress counter, exit `translateY(-104%) rotate(-1.2deg) .85s cubic-bezier(.76,0,.24,1)`.
- [ ] Min-hold 800ms, hard cap 2.5s (shorter than live site's 4s); instant fade under reduced motion.
- [ ] **DoD:** paint before JS (inlined or blocking-first style), removed from DOM after exit.

## T3 — Nav

- [ ] Fixed header 72px, transparent → frosted `--paper` at 85% + blur on scroll.
- [ ] Circular logo + `NotePads` / `study hub cafe` brand lockup; links About/Menu/The Place/Saturdays/Reviews/Visit.
- [ ] CTA "See the menu" (terra sticker button); mobile burger → clip-path circle sheet, links `clamp(1.8rem, 6vw, 3rem)`.
- [ ] Active-section tracking via IntersectionObserver.
- [ ] **DoD:** keyboard-navigable, sheet closes on Escape + link click.

## T4 — Hero

- [ ] Full-height `--parchment` hero; 4 rotating photos (cafe-10, cafe-16, cafe-05, cafe-12) crossfade 6s, walnut overlay gradient.
- [ ] Kicker `Study hub cafe · Mandurriao, Iloilo`; H1 `Where learning meets comfort` with mustard scribble under "comfort"; lede from docs.
- [ ] CTAs `Flip the menu book` → `#menu` (scrolls to menu) + `Find us` → `#visit`; live Open/Closed chip (Asia/Manila logic).
- [ ] Bobbing scroll cue; sparkles ≤ 2, opacity ≤ .25.
- [ ] **DoD:** LCP image preloaded; no layout shift on slide change.

## T5 — About

- [ ] Eyebrow `About NotePads`, H2 `A study hub that feels like home`, both lede paragraphs from docs/details.md.
- [ ] 3 stat cards (`2 hrs` free stay / `₱40` per extra hour / `7–10` Mon–Sat) with ≥ 24px padding.
- [ ] Max 2 polaroids with tape; amenity grid (8 cards from details.md) with terra icon circles; ₱350 Study Space Package card.
- [ ] **DoD:** paragraph max-width ≤ 38em; no wall of text (split into 2 columns at ≥ 980px if needed).

## T6 — Menu (tabbed chapters)

- [ ] Section bg `--kraft` with subtle dot grid; eyebrow `The Menu`, H2 `Open the menu book` (kept as book heritage).
- [ ] Category chip tabs, 4 rows: Rice Meals / Bites & Noodles / Pasta & Sandwiches (+ Molo, Pandesal under "Morning & fils" split only if cleaner) / Coffee / Non-Coffee & Frappe / Sodas / Baked Goods — keep all 14 datasets intact.
- [ ] Each tab: airy price rows (dish name + dotted leader + price right-aligned with tabular-nums), description under name at `--bark`; 6–10 items visible with scroll within tab panel.
- [ ] ₱350 welcome card as a taped ticket at the top; footnote `* from our printed menu — please confirm the price with us.` for `poster:true` items.
- [ ] Mobile: tabs become a horizontally scrollable chip row; panel padding ≥ 24px; no flip-book.
- [ ] **DoD:** content parity with docs/details.md menu table (spot-check 10 items + all 14 categories present); keyboard arrows switch tabs (proper tablist ARIA).

## T7 — The Place (Gallery)

- [ ] Eyebrow `The Place`, H2 `Come on in`, lede from docs; 8 photos w/ captions as polaroids, CSS masonry 3/2/1 cols, tilt ≤ 1.5°.
- [ ] Lightbox: scrim `rgba(29,20,10,.88)`, figure scale-in `.4s cubic-bezier(.22,1,.36,1)`, Escape/arrows/swipe.
- [ ] **DoD:** lazy-loaded images (`<Image>`), zero CLS (reserved aspect boxes).

## T8 — Saturdays (Workshops)

- [ ] Eyebrow `Every Saturday`, H2 `Saturdays at NotePads`, lede from docs; title card `No Gadget Kids Workshops` + `Learn · Create · Imagine` on kraft-tape board.
- [ ] 3 session cards (Art Workshop / Little Barista / Cookie Decor) sage/mustard/dusty tones with 2026 dates; past dates dimmed + ✓.
- [ ] Inclusions chips (Apron/ID/Materials/Snacks/Certificate); pricing table (₱1,299 / ₱2,298 save ₱300 / ₱3,497 save ₱400).
- [ ] Reserve panel: phones 0917 716 9035 + 0995 229 3755, WhatsApp, IG/FB buttons; batch-over message logic from docs.
- [ ] Motto `Because the best things happen offline.` in terra.
- [ ] **DoD:** all workshop copy matches docs/details.md.

## T9 — Reviews

- [ ] Eyebrow `Reviews`, H2 `Hear from our customers`; ★★★★★ 5.0 summary line.
- [ ] 5 index-card reviews (docs quotes verbatim) in a horizontal scroll-snap row (no JS physics carousel); card tone paper/mustard/sky variants at warm alpha.
- [ ] **DoD:** swipeable at mobile, scroll = native, no momentum JS.

## T10 — Visit

- [ ] Eyebrow `Visit us`, H2 `Find your seat`, lede from docs.
- [ ] **Create shared `components/ContactStrip.tsx`** (address lines, hours, phone/WhatsApp, email, socials) — reused by Footer.
- [ ] Google Maps iframe embed (destination URL from docs) in warm-framed card + `Get directions` button + approximate-pin note.
- [ ] **DoD:** iframe lazy-loaded; info readable at 390px without horizontal scroll.

## T11 — Footer

- [ ] `--forest` background, parchment wave divider; Explore links (6 anchors); Visit + Say hello columns reuse ContactStrip.
- [ ] Brand block `Where learning meets comfort.` + bio; socials with aria-labels from docs.
- [ ] Bottom: `© {year} NotePads Study Hub Cafe · Iloilo City, Philippines` + `brewed with care` with cup/bean/sparkle doodles.
- [ ] **DoD:** link contrast ≥ 4.5:1 on forest.

## T12 — Notey chatbot

- [ ] Floating terra button with soft shadow; nudge bubble `Questions? Ask Notey!` (desktop, once, dismissible).
- [ ] 380×600 `--paper` panel: header `Notey / NotePads assistant`, greeting + 5 quick-reply chips from docs; input `Ask about the menu, hours, rates…`.
- [ ] Intent engine: port the intent table from docs/details.md (hours w/ live status, location, contact, rates, package, full menu categories, recommend, saturday, payment/parking/delivery/dietary/pets unknowns, thanks/bye).
- [ ] **DoD:** chip flows + phrase matching work; loading dots animation; reduced-motion safe.

## T13 — Motion & a11y pass

- [ ] One shared reveal utility (Framer Motion `whileInView`, ease `[.22,1,.36,1]`, y 28, duration .8) OR CSS-only equivalent — no per-section bespoke easings.
- [ ] Reduced-motion: current live-region `100vh`, animations 1ms, hero static.
- [ ] Focus-visible walnut/terra outlines everywhere; skip-to-content link.
- [ ] Contrast audit: `--bark #6b5343` on `--parchment #f7f0e3` — computed ratio ≥ 4.5:1; darken to `#5c4636` if it fails.
- [ ] **DoD:** keyboard-only walk-through of full page passes; axe/lighthouse a11y ≥ 95.

## T14 — QA & polish

- [ ] `npm run build` + `npm run lint` clean.
- [ ] impeccable `.agents/skills/impeccable/scripts/impeccable audit` then `polish app/page.tsx`.
- [ ] Responsive sweep 390 / 768 / 1200: no horizontal overflow, menu tabs scrollable, tap targets ≥ 44px.
- [ ] Content parity spot-check vs docs/details.md (menu prices, workshop dates, contact info, reviews).
- [ ] Warmth checklist re-verified (line-heights, spacings, warm shadows, cobalt only for links/focus).
- [ ] **DoD:** dev server mnual-verified; final `npm run build` green; DESIGN.md matches shipped UI.

---

## Status log

| Date | Task | Result |
|---|---|---|
| 2026-10-26 | Plan approved | task.md created |
