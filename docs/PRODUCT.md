# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Next.js 16.4.3 (App Router, Turbopack, React 19.3) + Tailwind CSS v4 + Framer Motion + lucide-react. Deployed on Vercel (production reference deployment: https://notepad-opal-three.vercel.app/). Google Maps rendered via iframe embed (no map SDK).

## Users

- Students and remote workers in Mandurriao, Iloilo City, Philippines looking for a calm, affordable study/work space with coffee, Wi-Fi, charging, and long-closing hours (open Mon–Sat 7am–10pm, Sun 10am–8pm). Their job: find out quickly whether this cafe suits a study session or workday, then get there.
- Parents of kids aged 6–10 considering the Saturday "No Gadget" workshops (creative offline activities). Their job: check the 2026 session schedule, price, what's included, and how to reserve.
- Date-night/hangout visitors attracted by the cozy atmosphere, board games, menu, and reviews.

## Product Purpose

A local cafe website that persuades visitors to visit (or reserve workshop spots): presents the menu with real prices, study rates/packages, photos of the space, real customer reviews, exact location and hours.

## Positioning

"A study hub cafe" — the cafe whose entire identity is built around learning and studying (study-pun menu chapter names, no-gadget kids workshops, 2-hours-free study stay). Not just another coffee shop: it is organized around what students need. Visually it should read as a warm, premium, modern cafe brand — a calm, airy, crafted page that feels like a warm corner of the cafe — never a generic template.

## Operating Context

- Single physical location: 2/F SDC Building, Guzman–Jesena Street, Mandurriao, Iloilo City (coordinates 10.7226, 122.5311).
- Visitors read on mobile (Philippine mobile-heavy scene), often over WhatsApp first.
- Open/closed status is computed live in Asia/Manila timezone.
- Menu prices in Philippine pesos (₱); items marked from the printed menu require staff confirmation.

## Capabilities and Constraints

- Single landing page with anchor sections: Hero, About, Menu, The Place (gallery), Saturdays (workshops), Reviews, Visit (map/contact), Footer, plus a rule-based chatbot ("Notey").
- All content strings are factual site content, captured verbatim in docs/details.md — no invented claims, prices, or testimonials.
- Payment methods, parking, delivery/dietary details are NOT published — copy must not claim them (chatbot answers "not posted online").
- Premium Space study package exists but has no published price.
- Workshop batch dates (Aug–Sep 2026) may pass; the UI shows the batch-wrapped message after dates end.

## Brand Commitments

- Name: NotePads Study Hub Cafe (short: NotePads). Logo and photos: real assets in public/images/.
- Voice: warm, playful scholar/notebook identity — study puns, handwritten accents, taped polaroids, ruled paper (user-pinned; keep in any visual rendition). **v4 copy tone (2026-10-27)**: cozy, short, human — headlines, ledes, CTAs and buttons rewritten to sound inviting, never generic ("Your cozy corner for focus", "Grab a seat — we saved you a plug", "Two free hours, on us"). Facts (prices, hours, phones, addresses, dates, reviews) stay verbatim from docs/details.md — tone lives in how they're framed, never in invented claims.
- User-pinned palette direction (v4 "Golden Corner", 2026-10-27): warm cream/ivory grounds (never pure white/gray) + deep warm navy ink + brand ultramarine blue `#1c3aae` (slight purple lean) for buttons/links/icons + first-class honey/gold highlight family for swashes, checkmarks and tape (always decoration on light ground) + peach/butter/caramel soft supports; icy blues, teal, cold grays and harsh contrast banned; see docs/ui_design.md v4 spec.
- Typography: Fredoka headings (600–700, one oblique + gold-switched accent word per main heading — swash underline on light ground, gold text only on dark navy) + Gaegu handwritten body.

## Evidence on Hand

- 35 real production photos (cafe interior, sign, counter, pantry, workshops poster) in public/images/ (extracted from production site).
- 5 real five-star customer reviews with reviewer names (docs/details.md §8) — real testimonials, do not fabricate more.
- Complete factual menu: 14 categories, ~90 priced items (docs/details.md §5).
- 2026 workshop batch schedule with real dates, prices, and contact numbers (docs/details.md §7).
- Precedent design system of the production site (docs/ui_design.md appendix) — evidence of the incumbent look, being replaced by the v2 warm redesign.

## Product Principles

- Realism over polish theater: every price, hour, and date on the page must match reality; nothing that a staff member couldn't confirm.
- Warmth signals comfort for long stays: calm, low-clutter, spacious surfaces; density is the enemy when the visitor is there to focus.
- The menu and package rates are the conversion surface: make them the easiest thing on the page to read.
- Trust through specifics: real photos, real reviews, live open/closed status, exact address.

## Accessibility & Inclusion

- WCAG AA contrast minimums (bark on parchment ≥ 4.5:1; forest section text ≥ 4.5:1).
- Full keyboard operability; reduced-motion support as a first-class mode (motion always optional).
- Mobile-first readability (Philippine audience is mobile-heavy); tap targets ≥ 44px.
