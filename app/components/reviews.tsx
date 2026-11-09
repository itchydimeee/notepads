// T9 — Reviews (#reviews): header row (H2 + lede LEFT, ★5.0 stat card RIGHT)
// above a masonry grid of 5 review cards, closed by a navy "Your turn to
// write one" CTA card. Pure server component — no state, no JS.
// 2026-11-09 redesign, second pass (user decision): mockup PLACEMENT adopted —
// stat card beside the heading, 3/2/1 masonry grid, CTA card last. The
// featured panel + scroll-snap row from the first pass are retired; the
// bordered look stays rejected. Warm parchment ground kept.
// All review quotes/names/roles verbatim from docs/details.md §8. Strings kept
// as constants OUTSIDE JSX so apostrophes, —, ·, é and the trailing ☕✨
// survive prerender untouched.
import { ArrowRight, Quote, Star } from "lucide-react";
import Accent from "./accent";
import Reveal from "./reveal";
import SectionTab from "./section-tab";
import "../reviews.css";

// Source string: `★★★★★ 5.0 from 5 five-star reviews · drag to browse`.
// Composition decision (2026-11-09): "5.0" is DRAWN as the big Fredoka numeral
// + five lucide `Star` icons (never unicode ★ glyphs); the remainder keeps
// "from 5 five-star reviews". "· drag to browse" is retired — the grid has
// nothing to drag (placement change is recorded in ui_design.md §4.8).
const SUMMARY_REMAINDER = "from 5 five-star reviews";

// Warm non-factual lede (v4 tone rules; no facts).
const LEDE = "Real words from the people who study, work, and unwind with us.";

type Review = {
  name: string;
  role: string | null; // parenthetical exactly as printed in details.md
  tone: "mustard" | "dusty" | "peach" | "sage" | "butter"; // avatar circle tint
  quote: string;
  tag: string; // warm topic chip — derived from the quote, never a new claim
};

// Grid order = row-major visual order (2026-11-09 user decision: card
// BOTTOMS aligned — rows stretch to their tallest card, so this order pairs
// row 1 = Jayhan94 / Corman A. / Cj R., row 2 = Belle N. / Peter / CTA).
const REVIEWS: Review[] = [
  {
    name: "Jayhan94",
    role: null,
    tone: "mustard",
    tag: "Board games & a work station",
    quote:
      "Good place to hang out with a date — great atmosphere, has board games you can do with your date or friends. Would recommend the lemon muffins. Got a complimentary fudge which is also good, and if you work from home and there's a blackout you can come to this place as they have a study/work station.",
  },
  {
    name: "Corman A.",
    role: "(Coffee lover)",
    tone: "peach",
    tag: "Chocolate cheesecake",
    quote:
      "Cozy place for coffee and food. The desserts were surprisingly good — I especially loved the chocolate cheesecake. The staff are nice and courteous. This has become my go-to hangout spot, conveniently located and open from 7 a.m. to 10 p.m., if I'm not mistaken.",
  },
  {
    name: "Cj R.",
    role: "(Photographer)",
    tone: "butter",
    tag: "Salted caramel coffee",
    quote:
      "NotePads Studyhub & Café is totally best for both work and unwinding! Their salted caramel coffee is seriously amazing — perfectly balanced, not too sweet, and just so comforting. The service is always warm and friendly, and you feel right at home the moment you step inside. Plus, the complimentary snacks are a lovely touch. A fantastic place to study, relax, or just enjoy a good cup of coffee. I definitely plan to come back again! ☕✨",
  },
  {
    name: "Belle N.",
    role: null,
    tone: "dusty",
    tag: "Friendly staff",
    quote:
      "All the staff are incredibly pleasant and welcoming. The food is delicious and very affordable, and the coffee tastes authentic, not commercial at all.",
  },
  {
    name: "Peter",
    role: null,
    tone: "sage",
    tag: "Great for working on a laptop",
    quote:
      "Perfect cafe for a relaxing affordable meal. Friendly attentive service, comfortable decor and climate controlled. Perfect spot to get some work done on your laptop. We enjoyed & recommend!",
  },
];

export default function Reviews() {
  return (
    <section id="reviews" className="rev" aria-labelledby="reviews-title">
      {/* Header: copy left, stat card right (mockup placement). */}
      <Reveal>
        <div className="rev-head">
          <div className="rev-head-copy">
            <SectionTab num="04" label="Reviews" tone="dusty" />
            <h2 id="reviews-title" className="rev-title">
              What our <Accent>guests</Accent> are saying
            </h2>
            <p className="rev-lede">{LEDE}</p>
          </div>

          {/* Stat card: the drawn "5.0" is real text (SRs hear the whole
              fact once); stars are the drawn icon row. */}
          <p className="rev-summary">
            <span className="rev-summary-score">5.0</span>
            <span className="rev-summary-rest">
              <span className="rev-summary-stars" aria-hidden="true">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star key={i} size={16} strokeWidth={1.6} fill="currentColor" />
                ))}
              </span>
              <span className="rev-summary-text">{SUMMARY_REMAINDER}</span>
            </span>
          </p>
        </div>
      </Reveal>

      {/* Aligned grid (CSS Grid 3/2/1). Rows stretch to the tallest card so
          every bottom edge lines up (user decision 2026-11-09); each card's
          topic chip pins to its card's bottom via margin-top: auto.
          Each card: avatar initial + name/role, drawn stars, verbatim quote,
          one warm topic chip. Watermark ≤ .12; ink text on --paper ≥ 4.5:1. */}
      <Reveal delay={0.06}>
        <div className="rev-grid">
          {REVIEWS.map((r) => (
            <figure key={r.name} className="rev-card">
              <span className="rev-quote-mark" aria-hidden="true">
                <Quote size={56} strokeWidth={1.4} aria-hidden="true" />
              </span>

              <figcaption className="rev-card-byline">
                <span className={`rev-avatar rev-avatar-${r.tone}`} aria-hidden="true">
                  {r.name.charAt(0)}
                </span>
                <span className="rev-card-id">
                  <span className="rev-name">{r.name}</span>
                  {r.role ? <span className="rev-role">{r.role}</span> : null}
                </span>
              </figcaption>

              <span className="rev-card-stars" aria-hidden="true">
                {[0, 1, 2, 3, 4].map((j) => (
                  <Star key={j} size={14} strokeWidth={1.6} fill="currentColor" />
                ))}
                <span className="sr-only-note">Rated 5 out of 5</span>
              </span>

              <blockquote className="rev-quote">
                <p>{r.quote}</p>
              </blockquote>

              <span className="rev-tag">{r.tag}</span>
            </figure>
          ))}

          {/* CTA card closes the grid (bottom-right in the mockup placement).
              Gold accent words are permitted on the dark navy ground (§2.1
              rule 4 — goldtext variant, no swash). "Find your seat" → #visit. */}
          <aside className="rev-cta" aria-label="Visit NotePads">
            <h3 className="rev-cta-title">
              Your turn to <Accent variant="goldtext">write one</Accent>
            </h3>
            <p className="rev-cta-copy">Come by, grab a seat, and tell us how it went.</p>
            <a className="rev-cta-btn" href="#visit">
              Find your seat
              <ArrowRight size={16} strokeWidth={2.2} aria-hidden="true" />
            </a>
          </aside>
        </div>
      </Reveal>
    </section>
  );
}
