"use client";

import Image from "next/image";
import { ArrowRight, ChevronDown, MapPin, Sparkle } from "lucide-react";
import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import Accent from "./accent";
import "../hero.css";

// Placeholder photos (branded PNG stubs; real photos to be swapped in — alt text from docs/details.md).
const SLIDES = [
  { src: "/images/cafe-10-md.png", alt: "The NotePads lounge with the logo wall", caption: "the lounge, in its natural state" },
  { src: "/images/cafe-16-md.png", alt: "The NotePads Study Hub Café sign at night", caption: "look for the glowing sign" },
  { src: "/images/cafe-05-sm.png", alt: "Study stations and red chairs", caption: "stations with a plug and a view" },
  { src: "/images/cafe-12-sm.png", alt: "The open pantry", caption: "pantry within reach" },
];

const BACK_SHOT = { src: "/images/cafe-03-sm.png", alt: "The NotePads coffee counter with warm hanging lights", caption: "the counter with warm lights" };

function manilaNow() {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Manila",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(new Date());
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  const hour = parseInt(get("hour"), 10);
  const sun = get("weekday") === "Sun";
  const open = sun ? hour >= 10 && hour < 20 : hour >= 7 && hour < 22;
  const closes = sun ? "8 PM" : "10 PM";
  const opens = sun ? "10 AM" : "7 AM";
  const today = sun ? "10 AM – 8 PM" : "7 AM – 10 PM";
  return { open, closes, opens, today };
}

const LIVE_HOURS = "Open Mon–Sat 7 AM – 10 PM · Sun 10 AM – 8 PM";

// External Manila-clock store. Live status only after hydration — an SSG-rendered
// clock could go stale or mismatch between server render and first client render.
// The server snapshot is null (full-hours fallback chip); after hydration the
// subscription ticks and re-renders with the live value.
let clockSnapshot: ReturnType<typeof manilaNow> | null = null;

function subscribeClock(onChange: () => void) {
  const tick = () => {
    clockSnapshot = manilaNow();
    onChange();
  };
  tick();
  const t = setInterval(tick, 60_000);
  return () => clearInterval(t);
}

const getClockSnapshot = () => clockSnapshot;
const getServerClockSnapshot = () => null;

export default function Hero() {
  const [slide, setSlide] = useState(0);
  const [visible, setVisible] = useState(true);
  const status = useSyncExternalStore(subscribeClock, getClockSnapshot, getServerClockSnapshot);

  const slides = useMemo(() => SLIDES, []);

  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    // Reduced motion = the hero shows ONE static photo (the crossfade interval
    // never runs; the CSS kill-switch would otherwise turn crossfades into
    // hard cuts).
    const reduce =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (visible && !reduce) {
      timer = setInterval(() => setSlide((s) => (s + 1) % slides.length), 6000);
    }
    return () => clearInterval(timer);
  }, [visible, slides.length]);

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), {
      threshold: 0.15,
    });
    const el = document.getElementById("top");
    if (el) io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section id="top" className="hero" aria-label="NotePads Study Hub Cafe — welcome">
      {/* Tiny sparkle stays a section-level garnish; the diamond star lives
          INSIDE the collage so it tracks the polaroid, not the navbar. */}
      <svg viewBox="0 0 24 24" className="hero-spark b" width="16" height="16" fill="currentColor" aria-hidden="true">
        <path d="M12 2l2.6 7.4L22 12l-7.4 2.6L12 22l-2.6-7.4L2 12l7.4-2.6Z" />
      </svg>

      <div className="hero-inner">
        <div className="hero-copy">
          {/* v4 rework per user reference (ui_structure_reference.png): small
              location badge above the title, gold accent word, layered
              polaroid collage + gold sticky note on the photo side. */}
          <p className="hero-eyebrow">
            <Sparkle size={14} aria-hidden="true" />
            Study Hub Cafe · Mandurriao, Iloilo
          </p>
          <h1 className="hero-title">
            Your <Accent>cozy</Accent> corner for coffee, focus, and fresh ideas
          </h1>
          <p className="hero-lede">
            With <strong>free Wi-Fi, free charging, and 2 study hours on the house</strong> —
            on the 2nd floor of the SDC Building, Mandurriao, Iloilo City.
          </p>
          <div className="hero-ctas">
            <a href="#menu" className="btn btn-blue">
              Flip the menu book
              <ArrowRight size={18} aria-hidden="true" />
            </a>
            <a href="#visit" className="btn btn-ghost">
              Find your seat
            </a>
          </div>
          <div className="hero-chips">
            {status ? (
              <>
                <span className="chip" aria-live="polite">
                  <span className={`chip-dot ${status.open ? "is-open" : "is-closed"}`} />
                  {status.open ? `Open now · until ${status.closes}` : `Closed · opens ${status.opens}`}
                </span>
                <span className="chip">Today {status.today}</span>
              </>
            ) : (
              <span className="chip">{LIVE_HOURS}</span>
            )}
            <span className="chip loc">
              <MapPin size={16} className="chip-ico" aria-hidden="true" />
              2/F SDC Bldg, Guzman–Jesena St
            </span>
          </div>
        </div>

        <div className="hero-shots">
          {/* Collage garnish (drawn SVG, all in the mustard/honey decoration
              family, placed only in genuinely open zones of the collage):
              top-right open band above the small polaroid holds the big
              diamond star + 16px companion star + hand-drawn honey flourish
              + a tiny plus scribble, drifting down like written margin
              marks; the narrow bottom gap between sticky note and small
              polaroid holds a 12px star + a second plus. Repositioned per
              user feedback — nothing sits on a polaroid anymore. */}
          <svg viewBox="0 0 24 24" className="hero-spark a" width="34" height="34" fill="currentColor" aria-hidden="true">
            <path d="M12 0c.9 5.4 3.6 8.6 8.6 10.2 1.4.45 1.4 2.15 0 2.6C15.6 14.4 12.9 17.6 12 24c-.9-6.4-3.6-9.6-8.6-11.2-1.4-.45-1.4-2.15 0-2.6C8.4 8.6 11.1 5.4 12 0Z" />
          </svg>
          <svg viewBox="0 0 24 24" className="hero-spark c" width="16" height="16" fill="currentColor" aria-hidden="true">
            <path d="M12 0c.9 5.4 3.6 8.6 8.6 10.2 1.4.45 1.4 2.15 0 2.6C15.6 14.4 12.9 17.6 12 24c-.9-6.4-3.6-9.6-8.6-11.2-1.4-.45-1.4-2.15 0-2.6C8.4 8.6 11.1 5.4 12 0Z" />
          </svg>
          <svg viewBox="0 0 64 16" className="hero-doodle" width="58" height="15" fill="none" aria-hidden="true">
            <path
              d="M2 11c7-8 12 4 19-3 7-7 12 7 19 0 6-5.5 11 4 15 0 2.5-2.5 4-4 7-5.5"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
          <svg viewBox="0 0 24 24" className="hero-plus o1" width="12" height="12" fill="none" aria-hidden="true">
            <path d="M12 3.5v17M3.5 12h17" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
          </svg>
          <figure className="shot is-back">
            <span className="u-tape" aria-hidden="true" />
            <div className="shot-frame">
              <div className="shot-photo">
                <Image
                  src={BACK_SHOT.src}
                  alt={BACK_SHOT.alt}
                  fill
                  sizes="(max-width: 980px) 88vw, 290px"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <figcaption className="shot-cap">{BACK_SHOT.caption}</figcaption>
            </div>
          </figure>

          <figure className="shot">
            <span className="u-tape" aria-hidden="true" />
            <div className="shot-frame">
              <div className="shot-photo">
                {slides.map((s, i) => (
                  <Image
                    key={s.src}
                    src={s.src}
                    alt={i === slide ? s.alt : ""}
                    fill
                    priority={i === 0}
                    sizes="(max-width: 980px) 92vw, 470px"
                    style={{
                      objectFit: "cover",
                      opacity: i === slide ? 1 : 0,
                    }}
                  />
                ))}
              </div>
              <figcaption className="shot-cap" aria-live="off">
                {slides[slide].caption}
              </figcaption>
            </div>
          </figure>

          {/* Gold sticky note riding the collage's bottom-left corner — a real
              note ("2 free hours, on us"), not pure décor: it states the study
              stay fact. Its shadow + tilt mirror the taped-polaroid world. */}
          <p className="hero-note">
            2 free hours
            <br />
            on the house!
          </p>

          {/* bottom-gap beat: tiny star + plus scribble in the open sliver
              between the note and the small polaroid */}
          <svg viewBox="0 0 24 24" className="hero-spark d" width="12" height="12" fill="currentColor" aria-hidden="true">
            <path d="M12 0c.9 5.4 3.6 8.6 8.6 10.2 1.4.45 1.4 2.15 0 2.6C15.6 14.4 12.9 17.6 12 24c-.9-6.4-3.6-9.6-8.6-11.2-1.4-.45-1.4-2.15 0-2.6C8.4 8.6 11.1 5.4 12 0Z" />
          </svg>
          <svg viewBox="0 0 24 24" className="hero-plus o2" width="10" height="10" fill="none" aria-hidden="true">
            <path d="M12 3.5v17M3.5 12h17" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      <a href="#about" className="hero-scroll" aria-label="Scroll to About">
        scroll
        <ChevronDown size={18} aria-hidden="true" />
      </a>
    </section>
  );
}
