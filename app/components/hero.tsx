"use client";

import Image from "next/image";
import {
  ArrowRight,
  ChevronDown,
  MapPin,
  Pause,
  Play,
  Snowflake,
  Sparkle,
  Wifi,
  Zap,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import Accent from "./accent";
import "../hero.css";

// Real photos from public/images (descriptive file names). src is null when no
// photo matches the caption yet — null slides are filtered out before render.
type HeroShot = { src: string | null; alt: string; caption: string };

const SLIDES: HeroShot[] = [
  { src: "/images/lounge-navy-sofas.webp", alt: "Lounge corner with navy sofas and a street view", caption: "the lounge, in its natural state" },
  { src: "/images/glowing-sign-night.webp", alt: "The glowing NotePads Study Hub Café sign at dusk", caption: "look for the glowing sign" },
  { src: "/images/study-stations-printing.webp", alt: "Workstation pods with ergonomic chairs by the window", caption: "stations with a plug and a view" },
  { src: "/images/counter-evening-lights.webp", alt: "Coffee counter and menu board in warm evening light", caption: "the counter with warm lights" },
  { src: "/images/the-open-pantry.webp", alt: "The open pantry with fruit trays, cereal dispensers, and snack jars", caption: "pantry within reach" },
];

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
  // Page-tear transition: `tearing` holds the OUTGOING slide while its piece
  // rips away (cleared by onAnimationEnd); `tick` rekeys the overlay so the
  // animation restarts every cycle.
  const [tearing, setTearing] = useState<number | null>(null);
  const [tick, setTick] = useState(0);
  const [paused, setPaused] = useState(false);
  const slideRef = useRef(0);
  const [visible, setVisible] = useState(true);
  const status = useSyncExternalStore(subscribeClock, getClockSnapshot, getServerClockSnapshot);

  const slides = useMemo(
    () => SLIDES.filter((s): s is HeroShot & { src: string } => s.src !== null),
    [],
  );

  // Shared by the interval and the pagination dots: tear to a slide.
  const goTo = (i: number) => {
    if (i === slideRef.current) return;
    setTearing(slideRef.current);
    setTick((t) => t + 1);
    slideRef.current = i;
    setSlide(i);
  };

  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    // The interval runs whenever the hero is on screen and not paused — even
    // under reduced motion (the CSS layer swaps the tear for a gentle fade
    // there; the state change itself must still happen so the photo updates).
    if (visible && !paused) {
      timer = setInterval(() => {
        goTo((slideRef.current + 1) % slides.length);
      }, 6000);
    }
    return () => clearInterval(timer);
  }, [visible, paused, slides.length]);

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
            A calm second-floor space with good coffee, hearty meals, and a seat
            with a plug waiting for you.
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
          {/* feature row + live meta line (reference structure): drawn icons,
              a hairline rule, then the live open/closed dot + address. */}
          <ul className="hero-feats" aria-label="What's included with your visit">
            <li>
              <Wifi size={16} strokeWidth={2.4} aria-hidden="true" />
              Free Wi-Fi
            </li>
            <li>
              <Zap size={16} strokeWidth={2.4} aria-hidden="true" />
              Free charging
            </li>
            <li>
              <Snowflake size={16} strokeWidth={2.4} aria-hidden="true" />
              Air-conditioned
            </li>
          </ul>
          <div className="hero-meta">
            <span className="hero-status" aria-live="polite">
              <span className={`chip-dot ${status?.open ? "is-open" : "is-closed"}`} />
              {status ? (
                status.open ? (
                  <>Open today · {status.today}</>
                ) : (
                  <>Closed · opens {status.opens}</>
                )
              ) : (
                <>{LIVE_HOURS}</>
              )}
            </span>
            <span className="hero-loc">
              <MapPin size={15} strokeWidth={2.4} aria-hidden="true" />
              2/F SDC Bldg, Guzman–Jesena St
            </span>
          </div>
        </div>

        <div className="hero-shots">
          {/* Collage garnish (drawn SVG, all in the mustard/honey decoration
              family): big diamond star + twinkling companion + hand-drawn
              honey flourish + one plus mark ride the open upper-right band
              above the single polaroid — never over the print. */}
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

          {/* THE polaroid: the page-tear slideshow. The outgoing slide is
              clipped by a jagged polygon that sweeps off like a ripped page;
              the incoming slide is already fully visible beneath. The photo's
              bottom edge carries the static torn-paper zigzag from the
              reference. figure = the frame itself, so the figcaption is a
              direct child. */}
          <figure className="shot-frame">
            <span className="u-tape" aria-hidden="true" />
            <div className="shot-photo">
              {slides.map((s, i) => (
                <Image
                  key={s.src}
                  src={s.src}
                  alt={i === slide ? s.alt : ""}
                  fill
                  priority={i === 0}
                  sizes="(max-width: 980px) 92vw, 500px"
                  style={{
                    objectFit: "cover",
                    opacity: i === slide ? 1 : 0,
                  }}
                />
              ))}
              {tearing !== null && slides[tearing] ? (
                <div
                  className="shot-tear"
                  key={tick}
                  onAnimationEnd={() => setTearing(null)}
                  aria-hidden="true"
                >
                  <div className="shot-tear-piece">
                    <Image
                      src={slides[tearing].src}
                      alt=""
                      fill
                      sizes="(max-width: 980px) 92vw, 500px"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                </div>
              ) : null}
            </div>
            {/* Caption sits IN FLOW under the photo — it can never overlap
                the print. key={} restarts the rise-in on every tear. */}
            <figcaption className="shot-cap tear-in" key={slide} aria-live="off">
              {slides[slide].caption}
            </figcaption>
            {/* slideshow controls: pagination dots + pause, per reference */}
            <div className="shot-ctrls">
              <div className="shot-dots">
                {slides.map((s, i) => (
                  <button
                    key={s.src}
                    type="button"
                    className={`shot-dot${i === slide ? " is-active" : ""}`}
                    aria-label={`Show photo ${i + 1} — ${s.caption}`}
                    aria-current={i === slide}
                    onClick={() => goTo(i)}
                  />
                ))}
              </div>
              <button
                type="button"
                className="shot-pause"
                aria-label={paused ? "Play slideshow" : "Pause slideshow"}
                onClick={() => setPaused((p) => !p)}
              >
                {paused ? (
                  <Play size={12} aria-hidden="true" />
                ) : (
                  <Pause size={12} aria-hidden="true" />
                )}
              </button>
            </div>
          </figure>

          {/* Round "2 hrs" stamp riding the polaroid's top-right corner — a
              real fact (2 free study hours), not pure décor. */}
          <p className="hero-badge">
            <strong>2 hrs</strong>
            <span>on the house</span>
          </p>
        </div>
      </div>

      <a href="#about" className="hero-scroll" aria-label="Scroll to About">
        scroll
        <ChevronDown size={18} aria-hidden="true" />
      </a>
    </section>
  );
}
