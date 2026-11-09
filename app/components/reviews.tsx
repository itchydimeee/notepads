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
  tilt?: string; // per-card tilt class (user-pinned 2026-11-09); absent = level
};

// Grid order = COLUMN-first (2026-11-09 user decision, third pass: the mockup
// masonry is back — CJ R.'s long review runs longer than its row-mates — but
// the three columns must share ONE bottom line). CSS columns can't stretch
// cards, so the grid is three explicit column stacks and each card grows a
// little (flex-grow) toward its column's bottom: column 1 = Jayhan94 + Belle
// N., column 2 = Corman A. + Peter, column 3 = Cj R. + the CTA card.
const REVIEWS: Review[] = [
  {
    name: "Jayhan94",
    role: null,
    tone: "mustard",
    tag: "Board games & a work station",
    tilt: "rev-tilt-soft-l", // softened left lean (user-pinned)
    quote:
      "Good place to hang out with a date — great atmosphere, has board games you can do with your date or friends. Would recommend the lemon muffins. Got a complimentary fudge which is also good, and if you work from home and there's a blackout you can come to this place as they have a study/work station.",
  },
  {
    name: "Belle N.",
    role: null,
    tone: "dusty",
    tag: "Friendly staff",
    tilt: "rev-tilt-r", // right lean, unchanged (user-pinned)
    quote:
      "All the staff are incredibly pleasant and welcoming. The food is delicious and very affordable, and the coffee tastes authentic, not commercial at all.",
  },
  {
    name: "Corman A.",
    role: "(Coffee lover)",
    tone: "peach",
    tag: "Chocolate cheesecake",
    tilt: "rev-tilt-r", // right lean (user-pinned)
    quote:
      "Cozy place for coffee and food. The desserts were surprisingly good — I especially loved the chocolate cheesecake. The staff are nice and courteous. This has become my go-to hangout spot, conveniently located and open from 7 a.m. to 10 p.m., if I'm not mistaken.",
  },
  {
    name: "Peter",
    role: null,
    tone: "sage",
    tag: "Great for working on a laptop",
    tilt: "rev-tilt-l", // left lean (user-pinned)
    quote:
      "Perfect cafe for a relaxing affordable meal. Friendly attentive service, comfortable decor and climate controlled. Perfect spot to get some work done on your laptop. We enjoyed & recommend!",
  },
  {
    name: "Cj R.",
    role: "(Photographer)",
    tone: "butter",
    tag: "Salted caramel coffee",
    quote:
      "NotePads Studyhub & Café is totally best for both work and unwinding! Their salted caramel coffee is seriously amazing — perfectly balanced, not too sweet, and just so comforting. The service is always warm and friendly, and you feel right at home the moment you step inside. Plus, the complimentary snacks are a lovely touch. A fantastic place to study, relax, or just enjoy a good cup of coffee. I definitely plan to come back again! ☕✨",
  },
];

// One review card: avatar initial + name/role, drawn stars, verbatim quote,
// one warm topic chip. Watermark ≤ .12; ink text on --paper ≥ 4.5:1.
// Per-card tilts are user-pinned (see the Review type) — Cj R. and the CTA
// card stay level.
function RevCard({ r }: { r: Review }) {
  return (
    <figure className={r.tilt ? `rev-card ${r.tilt}` : "rev-card"}>
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
  );
}

// The grid closes with the navy CTA card (bottom-right in the mockup
// placement). Gold accent words are permitted on the dark navy ground (§2.1
// rule 4 — goldtext variant, no swash). "Find your seat" → #visit.
function RevCta() {
  return (
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
  );
}

// Three explicit column stacks (column-first order, see the REVIEWS note):
// the last stack carries the CTA card.
const COLUMNS: Review[][] = [
  REVIEWS.slice(0, 2),
  REVIEWS.slice(2, 4),
  REVIEWS.slice(4, 5),
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

      {/* Three column stacks (2026-11-09 user decision: all three columns
          share ONE bottom line — every card grows a little via flex-grow,
          so Jayhan94/Belle/CTA lengthen while CJ R. still runs longest).
          Below 980 the stacks dissolve (display: contents) into a plain
          2/1-col grid of cards. */}
      <Reveal delay={0.06}>
        <div className="rev-grid">
          {COLUMNS.map((col, ci) => (
            <div key={col[0].name} className="rev-col">
              {col.map((r) => (
                <RevCard key={r.name} r={r} />
              ))}
              {ci === 2 ? <RevCta /> : null}
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
