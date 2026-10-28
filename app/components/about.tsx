import Image from "next/image";
import {
  AirVent,
  CalendarCheck,
  Check,
  Clock3,
  Cookie,
  Dices,
  Laptop,
  MapPin,
  PlugZap,
  Wifi,
} from "lucide-react";
import "../about.css";
import Accent from "./accent";
import Reveal from "./reveal";

// T16 About craft pass (2026-10-27) — content inventory + shipped copy:
//   · every title/label/desc rewritten cozy & human (T13.1 tone brief);
//   · FACTS kept verbatim from docs/details.md §4: location line, 2 hrs free,
//     ₱40/hr after, 7–10 Mon–Sat + Sun 10–8, the 6 package includes (menu
//     item names are facts), and the ₱40-per-hour footnote. No new claims.
//   · Doodle budget = 2 floating motifs/section (cleanliness bar): one coffee
//     cup + one linking arrow, both hand-drawn crisp linework, aria-hidden.
// T13: transitions ride the shared <Reveal> wrapper only. Stagger = cap
// i × 60ms over 4 groups (intro/stats/amenities/package). Polaroids stay
// unwrapped — the sheet's still-life, not part of its staged reveal group.
//
// Structure: (1) warm oat floating sheet — intro copy (title + location
// chip / lede), smaller sticky-note trio with the doodles flanking it, then
// a 4-up taped photo strip (2×2 responsive); (2) a UNIFORM 4×2 amenities
// card wall on the parchment ground; (3) a boarding-pass package ticket:
// deal column + tear-off stub.

const LEDE_1 =
  "Tucked on the second floor of the SDC Building along Guzman–Jesena Street in Mandurriao, Iloilo City — long tables, warm lights, and coffee that never rushes you.";
const LEDE_2 =
  "Cramming before finals, working from the cafe, a board game catch-up with friends, or a hands-on Saturday for the kids — there's a seat, a cup, and a plug waiting for you.";

// Sticky-note stats — same three facts as details.md §4. The hours note
// carries a friendly header ("Open daily") with the times verbatim below:
// "Mon – Sat · 7 – 10" + Sunday's own small line. Tones: butter / paper /
// mustard-soft — all warm, all safely carrying ink-soft (≥ 5:1; the
// mustard-soft note sits at 5.1:1).
const STICKIES = [
  { value: "2 hrs", label: "Wi-Fi, charging & a seat — on us", extra: "", tone: "butter" },
  { value: "₱40", label: "every hour after your free stay", extra: "", tone: "paper" },
  { value: "Open daily", label: "Mon – Sat · 7 – 10", extra: "Sunday · 10 – 8", tone: "mustard" },
];

// Photo shelf (round 5): FOUR taped polaroids side by side in a row.
// Captions/alt carry doc vocabulary: two About captions verbatim from
// details.md §4, one rewritten cozy line from the lede, and the §6 sign
// caption for the sign image. Alt text = the future production photo's
// subject (placeholder PNG stubs).
const POLAROIDS = [
  {
    src: "/images/cafe-10-md.png",
    alt: "The NotePads lounge with the logo wall",
    caption: "study hub, in full swing",
  },
  {
    src: "/images/cafe-05-sm.png",
    alt: "Study stations and red chairs",
    caption: "single space · 2 hrs of focus",
  },
  {
    src: "/images/cafe-03-sm.png",
    alt: "The NotePads coffee counter with warm hanging lights",
    caption: "coffee that never rushes you",
  },
  {
    src: "/images/cafe-16-md.png",
    alt: "The glowing NotePads Study Hub Café sign at night",
    caption: "look for the glowing sign",
  },
];

// Amenities — 8 facts from details.md §4, friendlier names. Round 6: the
// even 4×2 uniform card grid (no wide/full spans — equal cards, like the
// reference's amenity wall).
const AMENITIES = [
  { icon: Wifi, name: "Fast, free Wi-Fi", desc: "Strong, steady connection for every guest — research tabs and all." },
  { icon: PlugZap, name: "Plugs within reach", desc: "Charging stations — stay as long as the work needs." },
  { icon: Clock3, name: "Two hours, on the house", desc: "Free stay for every guest; ₱40 per hour after." },
  { icon: AirVent, name: "A calm, cool room", desc: "Air-conditioned comfort that steadies long focus runs." },
  { icon: Laptop, name: "Built for laptops", desc: "Study and work stations made for marathon sessions." },
  { icon: Dices, name: "Games for a breather", desc: "Board games and chess — for friends or a date." },
  { icon: Cookie, name: "The pantry is open", desc: "Complimentary snacks and brain fuel, help yourself." },
  { icon: CalendarCheck, name: "Rent the whole room", desc: "Good coffee, cozy space — open for event bookings." },
];

// The one elevated moment — cobalt package board. Includes list VERBATIM
// (dish names are facts); label/title/CTA rewritten per the copy brief.
const PACKAGE_INCLUDES = [
  "One complimentary meal — pork or chicken adobo, embotido rice meal, or ham & cheese sandwich",
  "One free drink — signature hot chocolate, iced tea, cucumber lemonade, blue lemonade, or pink lychee",
  "Free access to our open pantry",
  "Complimentary Wi-Fi & free charging stations",
  "Free use of a laptop",
  "2 hours of stay included",
];

const BAND_TITLE = "Comfort you don't have to ask for";
const BAND_SUB = "The small stuff is already waiting when you arrive.";

// Hand-drawn coffee cup doodle (crisp linework; motif 1 of 2 in the sheet)
function CupDoodle() {
  return (
    <svg
      className="about-doodle about-doodle-cup"
      viewBox="0 0 52 46"
      width="52"
      height="46"
      aria-hidden="true"
      focusable="false"
    >
      <g fill="none" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 22 h26 v10 a9 9 0 0 1 -9 9 h-8 a9 9 0 0 1 -9 -9 z" stroke="currentColor" />
        <path d="M34 24 q10 0 9 8 q-1.5 7.5 -9 6" stroke="currentColor" />
        <path d="M15 15 q4 -5 0 -10" stroke="var(--honey)" />
        <path d="M24 15 q4 -5 0 -10" stroke="var(--honey)" />
      </g>
    </svg>
  );
}

// Hand-drawn linking arrow doodle (crisp linework; motif 2 of 2 — connects
// the copy column to the photo strip, ≥1020px only)
function ArrowDoodle() {
  return (
    <svg
      className="about-doodle about-doodle-arrow"
      viewBox="0 0 64 40"
      width="64"
      height="40"
      aria-hidden="true"
      focusable="false"
    >
      <g fill="none" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 8 C 26 4, 44 14, 52 28" stroke="currentColor" />
        <path d="M44 26 l9 3 l1 -10" stroke="currentColor" />
      </g>
    </svg>
  );
}

export default function About() {
  return (
    <section id="about" className="about" aria-labelledby="about-title">
      {/* 1 · warm oat floating sheet — stack: copy → notes → photo shelf */}
      <div className="about-sheet">
        <div className="about-inner">
          <Reveal>
            <div className="about-intro">
              <div className="about-title-col">
                <h2 id="about-title" className="about-title">
                  Slow sips, soft light, and a place to{" "}
                  <Accent>belong</Accent>
                </h2>
                <p className="about-loc">
                  <MapPin size={18} strokeWidth={2.4} aria-hidden="true" />
                  <span>2nd floor · SDC Building · Mandurriao, Iloilo City</span>
                </p>
              </div>
              <div className="about-lede">
                <p>{LEDE_1}</p>
                <p>{LEDE_2}</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            <div className="about-notes-row">
              <CupDoodle />
              <ul className="about-notes" aria-label="Rates and hours, the short version">
                {STICKIES.map((s) => (
                  <li key={s.value} className={`about-note about-note--${s.tone}`}>
                    <span className="about-note-value">{s.value}</span>
                    <span className="about-note-label">{s.label}</span>
                    {s.extra ? <span className="about-note-extra">{s.extra}</span> : null}
                  </li>
                ))}
              </ul>
              <ArrowDoodle />
            </div>
          </Reveal>

          <div className="about-shots">
            {POLAROIDS.map((p) => (
              <figure key={p.src} className="about-shot u-polaroid">
                <span className="u-tape" aria-hidden="true" />
                <div className="about-shot-photo">
                  <Image
                    src={p.src}
                    alt={p.alt}
                    fill
                    sizes="(max-width: 1020px) 46vw, 280px"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <figcaption className="about-shot-cap">{p.caption}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>

      {/* 2 · amenities band on the parchment ground — uniform 4×2 card grid */}
      <Reveal delay={0.12}>
        <div className="about-band">
          <div className="about-inner">
            <div className="about-band-head">
              <h3 className="about-band-title">{BAND_TITLE}</h3>
              <p className="about-band-sub">{BAND_SUB}</p>
            </div>
            <div className="about-amenities">
              {AMENITIES.map(({ icon: Icon, name, desc }) => (
                <article key={name} className="about-amenity">
                  <span className="amenity-ico" aria-hidden="true">
                    <Icon size={22} strokeWidth={2.4} />
                  </span>
                  <h4 className="amenity-name">{name}</h4>
                  <p className="amenity-desc">{desc}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </Reveal>

      {/* 3 · the elevated moment: cobalt package board. Ticket format:
           deal column (label · title · 2-column includes checklist) LEFT,
           tear-off stub RIGHT (price · sub · CTA · very small print) with the
           boarding-pass perforation between them; stacked on mobile. */}
      <Reveal delay={0.18}>
        <div className="about-package-wrap">
          <article className="about-package" aria-label="Study space package — ₱350">
            <div className="about-package-deal">
              <p className="about-package-label">The study space deal</p>
              <h3 className="about-package-title">
                Two hours — <Accent variant="goldtext">everything</Accent>{" "}
                included
              </h3>
              <ol className="about-package-list">
                {PACKAGE_INCLUDES.map((item, i) => (
                  <li key={item}>
                    <Check
                      size={20}
                      strokeWidth={3.2}
                      className="about-package-check"
                      aria-hidden="true"
                    />
                    <span>
                      <span className="about-package-n">{i + 1}. </span>
                      {item}
                    </span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="about-package-stub">
              <span className="about-package-hole top" aria-hidden="true" />
              <span className="about-package-hole bottom" aria-hidden="true" />
              <p className="about-package-price">₱350</p>
              <p className="about-package-sub">
                One seat · two whole hours of quiet focus
              </p>
              <a href="#visit" className="btn btn-light about-package-btn">
                Grab a seat
              </a>
              <footer className="about-package-foot">
                <Clock3 size={18} strokeWidth={2.4} aria-hidden="true" />
                <span>₱40 per hour beyond the 2-hour stay</span>
              </footer>
            </div>
          </article>
        </div>
      </Reveal>
    </section>
  );
}
