// T9 — Reviews (#reviews): Fredoka H2 + ★5.0 summary + 5 index-card reviews
// in a NATIVE scroll-snap row. Pure server component — no state, no JS
// physics: the browser's own overflow scrolling + scroll-snap does all the
// work (DoD: no momentum/physics carousel).
// All copy verbatim from docs/details.md §8 (lines 356–370). Strings kept as
// constants OUTSIDE JSX so apostrophes, —, ·, é and the trailing ☕✨ survive
// prerender untouched.
import { Quote, Star } from "lucide-react";
import Reveal from "./reveal";
import "../reviews.css";

const H2 = "Hear from our customers";

// Source string: `★★★★★ 5.0 from 5 five-star reviews · drag to browse`.
// Composition decision (documented in the T9 report): the five ★ glyphs are
// Unicode iconography — banned as an icon stand-in — so they are DRAWN as
// five lucide `Star` icons (filled, one consistent size), followed by the
// verbatim remainder below. The visible result is equivalent to the source
// string; the remainder text is what screen readers hear.
const SUMMARY_REMAINDER = "5.0 from 5 five-star reviews · drag to browse";

type Review = {
  name: string;
  role: string | null; // parenthetical exactly as printed in details.md
  quote: string;
  tone: "paper" | "mustard" | "dusty";
};

const REVIEWS: [Review, Review, Review, Review, Review] = [
  {
    name: "Jayhan94",
    role: null,
    tone: "paper",
    quote:
      "Good place to hang out with a date — great atmosphere, has board games you can do with your date or friends. Would recommend the lemon muffins. Got a complimentary fudge which is also good, and if you work from home and there's a blackout you can come to this place as they have a study/work station.",
  },
  {
    name: "Belle N.",
    role: null,
    tone: "mustard",
    quote:
      "All the staff are incredibly pleasant and welcoming. The food is delicious and very affordable, and the coffee tastes authentic, not commercial at all.",
  },
  {
    name: "Corman A.",
    role: "(Coffee lover)",
    tone: "paper",
    quote:
      "Cozy place for coffee and food. The desserts were surprisingly good — I especially loved the chocolate cheesecake. The staff are nice and courteous. This has become my go-to hangout spot, conveniently located and open from 7 a.m. to 10 p.m., if I'm not mistaken.",
  },
  {
    name: "Peter",
    role: null,
    tone: "dusty",
    quote:
      "Perfect cafe for a relaxing affordable meal. Friendly attentive service, comfortable decor and climate controlled. Perfect spot to get some work done on your laptop. We enjoyed & recommend!",
  },
  {
    name: "Cj R.",
    role: "(Photographer)",
    tone: "mustard",
    quote:
      "NotePads Studyhub & Café is totally best for both work and unwinding! Their salted caramel coffee is seriously amazing — perfectly balanced, not too sweet, and just so comforting. The service is always warm and friendly, and you feel right at home the moment you step inside. Plus, the complimentary snacks are a lovely touch. A fantastic place to study, relax, or just enjoy a good cup of coffee. I definitely plan to come back again! ☕✨",
  },
];

export default function Reviews() {
  return (
    <section id="reviews" className="rev" aria-labelledby="reviews-title">
      <Reveal>
        <div className="rev-inner">
          <h2 id="reviews-title" className="rev-title">
            {H2}
          </h2>

          {/* Summary: drawn filled stars (icon system, not unicode glyphs) +
              the verbatim remainder text — equivalent to the source string. */}
          <p className="rev-summary">
            <span className="rev-summary-stars" aria-hidden="true">
              {[0, 1, 2, 3, 4].map((i) => (
                <Star key={i} size={21} strokeWidth={1.6} fill="currentColor" />
              ))}
            </span>
            <span className="rev-summary-text">{SUMMARY_REMAINDER}</span>
          </p>
        </div>
      </Reveal>

      {/* Native scroll-snap row. tabindex=0 + label so keyboard users can
          focus it and scroll with arrow keys (the cards contain no focusable
          elements); the global :focus-visible outline marks the focus. No JS
          carousel anywhere — the browser does the scrolling. The Reveal div
          wrapper is semantically transparent (plain block) and does not
          affect the row's own overflow/snap machinery. */}
      <Reveal delay={0.06}>
        <ul
          className="rev-row"
          tabIndex={0}
          aria-label="Customer reviews — five five-star testimonials, scroll sideways to browse"
        >
          {REVIEWS.map((r) => (
            <li key={r.name} className={`rev-card rev-card-${r.tone}`}>
              {/* Quote watermark — contextual card furniture (not a floating
                  motif), one per card at opacity .1 ≤ the .12 cap. */}
              <span className="rev-quote-mark" aria-hidden="true">
                <Quote size={72} strokeWidth={1.4} aria-hidden="true" />
              </span>

              <div className="rev-card-head">
                {/* Drawn filled stars; rating also spoken for screen readers. */}
                <span className="rev-card-stars" aria-hidden="true">
                  {[0, 1, 2, 3, 4].map((j) => (
                    <Star key={j} size={15} strokeWidth={1.6} fill="currentColor" />
                  ))}
                </span>
                <span className="sr-only-note">Rated 5 out of 5</span>
              </div>

              <h3 className="rev-name">{r.name}</h3>
              {r.role ? <p className="rev-role">{r.role}</p> : null}

              <blockquote className="rev-quote">
                <p>{r.quote}</p>
              </blockquote>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
