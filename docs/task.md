# NotePads UI Rebuild — Implementation Checklist

> Plan: **"Warm scholar" rebuild** (approved 2026-10-26; **v3 "Ink & Indigo" + Fredoka revision 2026-10-26** — logo-matched re-theme locked in docs BEFORE code, per user order). Design source: `docs/ui_design.md` (v3 spec, single design reference) + `docs/details.md` (content parity).
> Work through T0 → T14 in order, one task at a time. Check off boxes only when the acceptance criteria are verified, not when written.

## Design Non-Negotiables (apply to every task)

- [ ] Palette = warm-blue "Ink & Indigo" tokens only: `--parchment #f7f0e3`, `--paper #fcf9ef`, `--kraft #ead9bd`, `--ink #1e2540` (primary text; renamed from walnut), `--ink-soft #4d5878` (secondary; renamed from bark; darken to `#454e6e` if contrast fails), `--blue #3d4bb8` (primary accent), `--blue-deep #2a3482` (hover/focus; cobalt token REMOVED), `--terra #b85433` + `--mustard #e2b064` (seasoning only — terra never a primary fill), `--sage #a7b087`, `--forest #202a52` (deep navy footer/chapter headers), `--dusty #97a5b8`, overlay `#1d2a56`.
- [ ] Shadows ink-tinted & soft: default `0 6px 16px rgba(30,37,64,.12)`; sticker shadow `6px 6px 0 #3d4bb833` on CTAs only.
- [ ] Typography: display = **Fredoka 600–700, non-italic, lh 1.08–1.14, letter-spacing 0, no font-variation-settings** (Fraunces removed app-wide); body = **Gaegu** (matches the logo handwriting); no eyebrow device; no `cqw` units for text.
- [ ] Cleanliness bar: décor ≤ 2 motifs/section @ opacity ≤ .25; one elevated moment per screen; section padding-y ≥ `clamp(4rem, 10vw, 7.5rem)`; grid gap ≥ 32px; prose ≤ 38em; page gutter `clamp(20px, 5vw, 64px)`.
- [ ] Content parity: strings come from `docs/details.md` — no invented copy.
- [ ] Every interactive target ≥ 44px tap size; focus-visible outlines (ink/blue-deep); `prefers-reduced-motion` honored.
- [ ] Next 16.4.3: read `node_modules/next/dist/docs/` before unfamiliar APIs.

---

## T0 — Foundations

- [x] `npm install framer-motion lucide-react` (NO MapLibre — Visit uses a Google Maps iframe).
- [ ] ~~Download production photos~~ → **Deferred by user decision (2026-10-26):** production photos removed; `public/images/` now holds branded placeholder PNG stubs (`cafe-10-md/cafe-16-md/cafe-05-sm/cafe-12-sm/cafe-03-sm.png`, parchment + blue frame, "to be replaced" label) and `public/logo.png` (placeholder copied from the brand logo screenshot). Hero refs switched to `.png`; swap real photos in later by overwriting/updating filenames.
- [x] Fonts: ~~Fraunces~~ **Fredoka** (variable, weights 300–700, NO axes+weight conflict — see T4.6) + **Gaegu** (400/700) via `next/font/google`; CSS vars mapped to `--font-display`/`--font-hand` in `@theme inline`. NOTE: passing `weight: [...]` with `axes` fails in Next 16.4.3 — variable fonts must omit `axes` when `weight` is set.
- [x] Rewrite `app/globals.css`: Tailwind v4 import replaced with token block (`:root` + `@theme inline`), shadow utilities, tape/ruled-paper/polaroid utilities, reduced-motion kill-switch. (Tokens re-tinted to Ink & Indigo in T4.5.)
- [x] Rewrite `app/layout.tsx`: metadata title `NotePads Study Hub Cafe · Iloilo City`, description from docs/details.md, lang="en", `export const viewport { themeColor: "#b85433" }` (metadata.themeColor is invalid in this Next version) (re-tinted to `#3d4bb8` in T4.5).
- [x] **DoD:** `npm run dev` starts ✓; HTTP 200 verified with title/theme-color/fonts preloading; tokens visible on body (`background: var(--parchment)`).

## T1 — Design artifacts

- [x] Run `.agents/skills/impeccable/scripts/impeccable.cmd context` (Windows); load `reference/new-work.md` + `concept-seed` flow.
- [x] Create `docs/PRODUCT.md` (product truth per impeccable init — platform, users, positioning, evidence, commitments).
- [x] Run the concept-seed direction roll (direction is **user-pinned**: Warm Scholar per `docs/ui_design.md`; a brief-pinned decision beats the roll). Challenger verdicts recorded: brick-build-instructions holds the clarity axis → accepted as a discipline raise (menu = numbered chapters with one 1:1 featured callout per chapter + grid-module alignment); others declined.
- [x] **Design reference = `docs/ui_design.md` (v3 spec) — do NOT create a separate DESIGN.md.** Surface direction contract for the landing page lives in the impeccable surface brief (build-internal note), not in `docs/` and never in shipped source.
- [x] Read `.agents/skills/impeccable/reference/craft-floor.md` before the first UI edit (T2) — flagged the eyebrow ban (applied in T2 status note) and warm-shadow/type rules.
- [x] **DoD:** PRODUCT.md + surface brief exist; ui_design.md covers the design world (palette, type, motifs, motion) and matches the token table above (now v3 "Ink & Indigo" — logo-matched).

## T2 — Preloader

- [x] Ruled-paper sheet on warm tokens (38px rules `#34281b14` → re-tinted `#1e254014` in T4.5, margin line → blue `#3d4bb855`, 3 punched holes) — `app/preloader.css`.
- [x] Coffee cup SVG + 3 steam strokes (CSS `pre-steam` keyframes 2.6s, staggered), brand name ~~Fraunces italic 900~~ **Fredoka 700 non-italic (T4.6)** revealed by clip-path ink wipe driven by a ~~terra~~ **blue** nib (bar + glowing dot).
- [x] Rotating notes (4 strings from details.md, 700ms cycle), progress counter (icon-style display font, tabular), exit `translateY(-104%) rotate(-1.2deg) .85s cubic-bezier(.76,0,.24,1)`.
- [x] Min-hold 800ms, hard cap 2.5s; reduced-motion = immediate fade (`.3s` opacity, no transform).
- [x] Architecture: server-rendered static sheet in `app/components/preloader.tsx` (paints before hydration, mirrors the production site's inline pattern) + inline vanilla script; `pre-autofade` CSS fallback removes the sheet even if scripting is blocked; `html.is-preloading` locks scroll during hold.
- [x] **DoD:** verified HTTP 200 on dev with preloader markup + script in initial HTML; sheet removed from DOM after exit.

## T3 — Nav

- [x] Fixed header 72px (`--nav-h`); transparent → frosted `#fcf9efe0` + blur(12px) on scroll (ink-tinted shadows — T4.5) — `app/nav.css` + client island `app/components/nav.tsx`.
- [x] Circular logo (`/logo.png`, Next Image) + `NotePads` / `study hub cafe` brand lockup (Fredoka 700 — T4.6); links About/Menu/The Place/Saturdays/Reviews/Visit with ~~terracotta~~ **blue** scaleX underline on hover/active (T4.5).
- [x] CTA "See the menu" using the shared `.btn` system (`.btn-terra` renamed **`.btn-blue`** in T4.5, 48px min-height, warm shadows).
- [x] Mobile burger → full-screen ruled-parchment sheet, circular clip-path reveal from the burger corner, links `clamp(1.8rem, 6vw, 3rem)` ~~Fraunces italic 900~~ **Fredoka 600 non-italic (T4.6)**, staggered link entrance; reduced-motion = simple opacity fade.
- [x] Active-section tracking via IntersectionObserver (`-45%/-50%` margins), picks up sections automatically as later tasks add them; `aria-current` → persistent underline.
- [x] Keyboard: Escape closes and refocuses burger; sheet locks body scroll; link click closes; inactive sheet links get `tabindex: -1`.
- [x] Smooth anchor scrolling: `html { scroll-behavior: smooth; scroll-padding-top: calc(var(--nav-h) + 8px) }` in globals.
- [x] **DoD:** verified on dev (HTTP 200, full nav markup server-rendered with aria attributes); nav hot-reloads; #top anchor baked into brand link.

## T4 — Hero

- [x] Full-height parchment hero (100svh min, 38px rulings + dot grid — re-tinted ink in T4.5) — `app/hero.css` + client island `app/components/hero.tsx`; scaffold `app/page.tsx` replaced.
- [x] Photos live inside **taped polaroid frames** (front frame crossfades 4 real photos w/ Gaegu captions on `.9s` ease every 6s; back polaroid static cafe-03 counter shot, tilted +4°) — warmer and lighter than the v1 dark full-bleed overlay. Alt text from docs/details.md. First slide `priority` preloaded (LCP).
- [x] H1 `Where learning meets comfort` **Fredoka 700 non-italic (T4.6; bolded 700 + scribble removed per user decision 2026-10-26 — plain, thick titles)** `clamp(2.4rem,5.8vw,4.4rem)` lh 1.06.
- [x] Lede folds the location line (eyebrow BANNED per craft-floor — location became part of copy + a chip); 2-line max, 34em measure.
- [x] CTAs: `See the menu` (`.btn-terra` → `.btn-blue` in T4.5) → #menu + `Find us` (`.btn-ghost`) → #visit. Renamed from "Flip the menu book" since the flip-book was dropped in the redesign.
- [x] Live chips: Open/Closed w/ green/sage dot + ping (kept in T4.5), computed in Asia/Manila via Intl (open 7–22 Mon–Sat, 10–20 Sun; status renders only after hydration to avoid SSG clock staleness, falls back to full-hours chip); "Today …" chip; location chip with **blue** MapPin icon (was terra — T4.5).
- [x] Decor: exactly 2 sparkles (mustard, opacity ≤ .3, slow twinkle — kept in T4.5), bobbing scroll cue to #about. Slides pause when hero is off screen (IntersectionObserver).
- [x] **DoD:** verified on dev — HTTP 200, hero SSRs incl. title/photos/CTAs; no layout shift on slide change (fixed aspect frame, absolute-positioned slides).

## T4.5 — Logo blue re-theme (Ink & Indigo)

> Docs locked FIRST (v3 ui_design.md + this file), then code applied — user order. Palette derived from the brand logo (navy ground + cream circle + warm indigo lettering); blues warmed, redundancy with v2 cobalt removed.

- [x] v3 spec locked in `docs/ui_design.md` (palette table, derived values, shadows, selection/focus, per-section anatomy, a11y, CSS architecture) — before any code edit.
- [x] `app/globals.css`: `--walnut`→`--ink #1e2540`, `--bark`→`--ink-soft #4d5878`, new `--blue #3d4bb8`/`--blue-deep #2a3482` (cobalt removed), `--forest`→`#202a52`, ink-tinted shadows, blue sticker shadow, selection/focus re-tinted, ruled/dot utilities re-tinted, `.btn-terra`→`.btn-blue`.
- [x] `app/layout.tsx`: `themeColor` → `#3d4bb8`.
- [x] `app/preloader.css`: margin line `#3d4bb855`, blue nib + glow + rule, ink ghost/counter tints, ink text colors.
- [x] `app/nav.css`: blue link underlines + contact links, ink text brand/links, ink-tinted frosted shadows.
- [x] `app/hero.css`: ink-tinted rulings/dot grid/photo placeholder, blue location icon, mustard scribble + sparkles kept, green/red status dots kept.
- [x] Acceptance: hex sweep over `app/` shows no stale `#34281b`/`#b85433`-as-primary; `npm run dev` HTTP 200; build clean. (Verified after code lands — see status log.)

## T4.6 — Display typography swap (Fraunces → Fredoka)

> Docs locked FIRST (v3 spec §2/§7), then code applied. Fredoka = rounded warm display; clean typographic contrast to Gaegu's logo-matching handwriting.

- [x] v3 typography rules locked in `docs/ui_design.md`: Fredoka 600–700 headings, non-italic, lh 1.08–1.14, letter-spacing 0, no fvs; Gaegu body unchanged; brand wordmark Fredoka 700.
- [x] `app/layout.tsx`: Fraunces import → Fredoka via `next/font/google`, `weight: ["300","400","500","600","700"]`, NO axes param (Next 16.4.3 axes+weight failure); CSS var `--font-fredoka`.
- [x] `@theme inline`: `--font-fredoka` mapped to `--font-display` (fraunces var removed).
- [x] All Fraunces usages replaced app-wide: nav brand name (700, no italic), mobile sheet links (700, no italic), preloader name (700), hero title (700) — all `font-style: italic` and `font-variation-settings` removed from display rules; titles stay plain/thick, no handwriting embellishments (user decision 2026-10-26).
- [x] Acceptance: zero `Fraunces`/`font-fraunces`/`font-variation-settings` refs in `app/`; headings render Fredoka; dev HTTP 200. (Verified after code lands — see status log.)

## T5 — About

- [ ] Fredoka H2 `A study hub that feels like home` + 2 lede paragraphs from docs/details.md (no eyebrow).
- [ ] 3 stat cards (`2 hrs` free stay / `₱40` per extra hour / `7–10` Mon–Sat) with ≥ 24px padding.
- [ ] Max 2 polaroids with tape; amenity grid (8 cards from details.md) with **blue icon circles**; ₱350 Study Space Package card (blue punch detail, mustard checks).
- [ ] **DoD:** paragraph max-width ≤ 38em; no wall of text (split into 2 columns at ≥ 980px if needed).

## T6 — Menu (tabbed chapters)

- [ ] Section bg `--kraft` with **ink-tinted** subtle dot grid; H2 `Open the menu book` in Fredoka 700 (kept as book heritage; location line joins a chip — no eyebrow).
- [ ] Category chip tabs, 4 rows: Rice Meals / Bites & Noodles / Pasta & Sandwiches (+ Molo, Pandesal under "Morning & fils" split only if cleaner) / Coffee / Non-Coffee & Frappe / Sodas / Baked Goods — keep all 14 datasets intact.
- [ ] Each tab: airy price rows (dish name + dotted leader `#1e254026` + price right-aligned with tabular-nums), description under name at `--ink-soft`; 6–10 items visible with scroll within tab panel.
- [ ] ₱350 welcome card as a taped ticket at the top (blue punch detail); footnote `* from our printed menu — please confirm the price with us.` for `poster:true` items — `*` markers in `--blue`.
- [ ] Mobile: tabs become a horizontally scrollable chip row; panel padding ≥ 24px; no flip-book.
- [ ] **DoD:** content parity with docs/details.md menu table (spot-check 10 items + all 14 categories present); keyboard arrows switch tabs (proper tablist ARIA).

## T7 — The Place (Gallery)

- [ ] Fredoka H2 `Come on in`, lede from docs (no eyebrow); 8 photos w/ captions as polaroids (Gaegu captions), CSS masonry 3/2/1 cols, tilt ≤ 1.5°.
- [ ] Lightbox: scrim `rgba(30,37,64,.88)`, figure scale-in `.4s cubic-bezier(.22,1,.36,1)`, Escape/arrows/swipe.
- [ ] **DoD:** lazy-loaded images (`<Image>`), zero CLS (reserved aspect boxes).

## T8 — Saturdays (Workshops)

- [ ] Fredoka H2 `Saturdays at NotePads`, lede from docs (no eyebrow); title card `No Gadget Kids Workshops` (Fredoka 700) + `Learn · Create · Imagine` on kraft-tape board.
- [ ] 3 session cards (Art Workshop / Little Barista / Cookie Decor) sage/mustard-soft/dusty-soft tones with 2026 dates; past dates dimmed + ✓.
- [ ] Inclusions chips (Apron/ID/Materials/Snacks/Certificate); pricing table (₱1,299 / ₱2,298 save ₱300 / ₱3,497 save ₱400).
- [ ] Reserve panel: phones 0917 716 9035 + 0995 229 3755, WhatsApp, IG/FB buttons (**blue** ghost buttons); **blue** motto `Because the best things happen offline.`; batch-over message logic from docs.
- [ ] **DoD:** all workshop copy matches docs/details.md.

## T9 — Reviews

- [ ] Fredoka H2 `Hear from our customers` (no eyebrow); ★★★★★ 5.0 summary line.
- [ ] 5 index-card reviews (docs quotes verbatim) in a horizontal scroll-snap row (no JS physics carousel); card tone paper/mustard/sky variants at warm alpha.
- [ ] **DoD:** swipeable at mobile, scroll = native, no momentum JS.

## T10 — Visit

- [ ] Fredoka H2 `Find your seat`, lede from docs (no eyebrow).
- [ ] **Create shared `components/ContactStrip.tsx`** (address lines, hours, phone/WhatsApp, email, socials — **blue** accent icons) — reused by Footer.
- [ ] Google Maps iframe embed (destination URL from docs) in warm-framed card + `Get directions` button + approximate-pin note.
- [ ] **DoD:** iframe lazy-loaded; info readable at 390px without horizontal scroll.

## T11 — Footer

- [ ] **Deep navy `--forest #202a52`** background, parchment wave divider; Fredoka headings; Explore links (6 anchors); Visit + Say hello columns reuse ContactStrip.
- [ ] Brand block `Where learning meets comfort.` + bio; socials with aria-labels from docs.
- [ ] Bottom: `© {year} NotePads Study Hub Cafe · Iloilo City, Philippines` + `brewed with care` with cup/bean/sparkle doodles (mustard accents kept).
- [ ] **DoD:** link contrast ≥ 4.5:1 on navy `#202a52`.

## T12 — Notey chatbot

- [ ] Floating **`.btn-blue`** button with soft shadow; nudge bubble `Questions? Ask Notey!` (desktop, once, dismissible).
- [ ] 380×600 `--paper` panel: header `Notey / NotePads assistant` (Fredoka), greeting + 5 quick-reply chips from docs; input `Ask about the menu, hours, rates…`; ink-tinted dotted-grid scroll area; dashed separators; Gaegu bubbles (bot paper / user **blue**).
- [ ] Intent engine: port the intent table from docs/details.md (hours w/ live status, location, contact, rates, package, full menu categories, recommend, saturday, payment/parking/delivery/dietary/pets unknowns, thanks/bye).
- [ ] **DoD:** chip flows + phrase matching work; loading dots animation; reduced-motion safe.

## T13 — Motion & a11y pass

- [ ] One shared reveal utility (Framer Motion `whileInView`, ease `[.22,1,.36,1]`, y 28, duration .8) OR CSS-only equivalent — no per-section bespoke easings.
- [ ] Reduced-motion: current live-region `100vh`, animations 1ms, hero static.
- [ ] Focus-visible **ink/blue-deep** outlines everywhere; skip-to-content link.
- [ ] Contrast audit: `--ink-soft #4d5878` on `--parchment #f7f0e3` — computed ratio ≥ 4.5:1; darken to `#454e6e` if it fails; footer links ≥ 4.5:1 on navy `#202a52`.
- [ ] **DoD:** keyboard-only walk-through of full page passes; axe/lighthouse a11y ≥ 95.

## T14 — QA & polish

- [ ] `npm run build` + `npm run lint` clean.
- [ ] impeccable `.agents/skills/impeccable/scripts/impeccable audit` then `polish app/page.tsx`.
- [ ] Responsive sweep 390 / 768 / 1200: no horizontal overflow, menu tabs scrollable, tap targets ≥ 44px.
- [ ] Content parity spot-check vs docs/details.md (menu prices, workshop dates, contact info, reviews).
- [ ] Warmth + cleanliness checklist re-verified (line-heights, spacings, ink-tinted shadows, **blue tokens only for links/focus — blue-deep outline**; décor ≤ 2 motifs/section; whitespace floors).
- [ ] **DoD:** dev server manual-verified; final `npm run build` green; shipped UI matches `docs/ui_design.md` v3 (the single design reference — no separate DESIGN.md). Also update `ui_design.md` if any shipped decision diverged from spec.

---

## Status log

| Date | Task | Result |
|---|---|---|
| 2026-10-26 | Plan approved | task.md created |
| 2026-10-26 | ui_design.md updated | v2 "Warm Scholar" spec documented (v1 kept as appendix) |
| 2026-10-26 | T0 Foundations | DONE — deps installed, 36 assets downloaded, tokens/layout rewritten; fixed next/font `axes`+`weight` conflict; dev verified HTTP 200 |
| 2026-10-26 | T1 Design artifacts | DONE — PRODUCT.md moved to docs/ (user preference, overrides root-path default); concept-seed run, Warm Scholar pinned + brick-instructions discipline raise; DESIGN.md dropped, ui_design.md = single design reference |
| 2026-10-26 | T2 Preloader | DONE — static server-rendered sheet + inline script (800ms min / 2.5s cap, autofade fallback), warm tokens; craft-floor read → eyebrow device BANNED for T4–T6 (spec amendment: no kicker/eyebrow labels; location line joins the lede or a chip) |
| 2026-10-26 | T3 Nav | DONE — fixed 72px header, frosted scroll state, brand lockup, 6 links w/ terra underlines, active-section IO, mobile circle-reveal sheet w/ Escape+scroll-lock, shared .btn system in globals, smooth anchors |
| 2026-10-26 | T4 Hero | DONE — parchment hero, polaroid-frame crossfade slideshow (4 photos + captions), mustard scribble H1, live Asia/Manila open/closed chips, 2 CTAs, hydration-safe clock; page.tsx replaced; 2 spec deviations logged (no eyebrow, CTA renamed) |
| 2026-10-26 | Docs → v3 "Ink & Indigo" + Fredoka | DONE — ui_design.md rewritten FIRST per user order: logo-derived warm-blue palette (`--ink #1e2540`, `--blue #3d4bb8`, `--blue-deep #2a3482`, forest→navy `#202a52`, cobalt removed, terra+mustard demoted to seasoning), Fredoka 600–700 non-italic display (Fraunces removed), cleanliness bar added (décor ≤ 2 motifs/section, whitespace floors); T0–T4 history annotated, T5–T14 swept to v3 |
| 2026-10-26 | T4.5 / T4.6 re-theme + typography | DOCS LOCKED — code workers applying next: core tokens, layout fonts, preloader, nav, hero; acceptance = hex sweep + font sweep + dev HTTP 200 + build clean |
| 2026-10-26 | T4.5/T4.6 code APPLIED | DONE — globals/layout (ink+blue tokens, Fredoka 300–700, themeColor #3d4bb8), hero (Fredoka 600 title, ink rulings, blue loc icon, btn-blue), nav (blue underlines/contact, Fredoka brand), preloader (blue margin/nib/rule, ink tints); stale-hex + Fraunces sweeps clean; fixed pre-existing hero.tsx:67 null-guard; build green; HTTP 200 |
| 2026-10-26 | Assets placeholdered | user decision: production photo download deferred; branded PNG placeholders in place (hero refs → .png, logo.png from logo screenshot); preloader hydration mismatch patched (suppressHydrationWarning on script-driven nodes + html) |
| 2026-10-26 | Title type bolded | user decision: hero title → Fredoka 700 `clamp(2.4rem,5.8vw,4.4rem)` lh 1.06; mustard scribble removed (plain thick titles); nav sheet links → 700; ui_design.md updated |
