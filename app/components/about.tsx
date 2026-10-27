import Image from "next/image";
import {
  AirVent,
  CalendarCheck,
  Check,
  Clock3,
  Cookie,
  Dices,
  Laptop,
  PlugZap,
  Wifi,
} from "lucide-react";
import "../about.css";
import Reveal from "./reveal";

// All copy verbatim from docs/details.md §4 (About). Strings kept as constants
// so apostrophes/₱/– survive JSX untouched.
// T13: transitions ride the shared <Reveal> wrapper only (one shared utility).
// Stagger = spec cap i × 60ms over the 4 group members (head/stats/amenities/
// ticket). The two polaroids stay unwrapped on purpose — they are the
// section's still-life, not part of its staged reveal group.

const LEDE_1 =
  "NotePads Study Hub Cafe is your cozy corner for coffee, focus, and fresh ideas — tucked on the 2nd floor of the SDC Building along Guzman–Jesena Street in Mandurriao, Iloilo City.";
const LEDE_2 =
  "Whether it's a cram session before finals, a work-from-cafe day, a catch-up with friends over a board game, or a Saturday of creativity for the little ones — there's a seat, a cup, and a plug waiting for you.";

const STATS = [
  { value: "2 hrs", label: "free stay, Wi-Fi & charging" },
  { value: "₱40", label: "per hour after that" },
  { value: "7 – 10", label: "Mon – Sat (Sunday 10 – 8)" },
];

// Placeholder photos (branded PNG stubs; real photos swapped later —
// alt text from docs/details.md).
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
];

const AMENITIES = [
  { icon: Wifi, name: "Free Wi-Fi", desc: "Reliable, complimentary Wi-Fi for every guest." },
  { icon: PlugZap, name: "Charging stations", desc: "Plug in and stay as long as the work needs." },
  { icon: Clock3, name: "2 hours on the house", desc: "Then just ₱40 per hour beyond the 2-hour stay." },
  { icon: AirVent, name: "Climate controlled", desc: "A calm, air-conditioned space made for focus." },
  { icon: Laptop, name: "Laptop-friendly", desc: "Study & work stations, built for long sessions." },
  { icon: Dices, name: "Board games & chess", desc: "Unplug and play with friends or a date." },
  { icon: Cookie, name: "Open pantry & treats", desc: "Complimentary snacks and a brain-boosting pantry." },
  { icon: CalendarCheck, name: "Event venue", desc: "Good coffee, cozy space — now open for bookings." },
];

const PACKAGE_INCLUDES = [
  "One complimentary meal — pork or chicken adobo, embotido rice meal, or ham & cheese sandwich",
  "One free drink — signature hot chocolate, iced tea, cucumber lemonade, blue lemonade, or pink lychee",
  "Free access to our open pantry",
  "Complimentary Wi-Fi & free charging stations",
  "Free use of a laptop",
  "2 hours of stay included",
];

export default function About() {
  return (
    <section id="about" className="about" aria-labelledby="about-title">
      <div className="about-inner">
        <Reveal>
          <header className="about-head">
            <h2 id="about-title" className="about-title">
              A study hub that feels like home
            </h2>
            <div className="about-lede">
              <p>{LEDE_1}</p>
              <p>{LEDE_2}</p>
            </div>
          </header>
        </Reveal>

        <Reveal delay={0.06}>
          <div className="about-stats">
            {STATS.map((s) => (
              <div key={s.value} className="about-stat">
                <span className="about-stat-value">{s.value}</span>
                <span className="about-stat-label">{s.label}</span>
              </div>
            ))}
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
                  sizes="(max-width: 640px) 92vw, 320px"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <figcaption className="about-shot-cap">{p.caption}</figcaption>
            </figure>
          ))}
        </div>

        <Reveal delay={0.12}>
          <div className="about-amenities">
            {AMENITIES.map(({ icon: Icon, name, desc }) => (
              <article key={name} className="about-amenity">
                <span className="amenity-ico" aria-hidden="true">
                  <Icon size={22} strokeWidth={2.4} />
                </span>
                <h3 className="amenity-name">{name}</h3>
                <p className="amenity-desc">{desc}</p>
              </article>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.18}>
          <article className="about-ticket" aria-label="Study space package — ₱350">
            <header className="about-ticket-head">
              <p className="about-ticket-label">Study space package</p>
              <p className="about-ticket-price">₱350</p>
              <p className="about-ticket-sub">Single space · 2 hours of uninterrupted study time</p>
            </header>

            <div className="about-ticket-perf">
              <span className="about-ticket-hole start" aria-hidden="true" />
              <span className="about-ticket-hole end" aria-hidden="true" />
            </div>

            <ol className="about-ticket-list">
              {PACKAGE_INCLUDES.map((item, i) => (
                <li key={item}>
                  <Check size={20} strokeWidth={3.2} className="about-ticket-check" aria-hidden="true" />
                  <span>
                    <span className="about-ticket-n">{i + 1}. </span>
                    {item}
                  </span>
                </li>
              ))}
            </ol>

            <footer className="about-ticket-foot">
              <Clock3 size={18} strokeWidth={2.4} aria-hidden="true" />
              <span>₱40 per hour beyond the 2-hour stay</span>
            </footer>
          </article>
        </Reveal>
      </div>
    </section>
  );
}
