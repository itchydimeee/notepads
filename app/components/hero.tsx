"use client";

import Image from "next/image";
import { ChevronDown, MapPin } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import "../hero.css";

// Real production photos, warm crops of the space; alt text from docs/details.md.
const SLIDES = [
  { src: "/images/cafe-10-md.webp", alt: "The NotePads lounge with the logo wall", caption: "the lounge, in its natural state" },
  { src: "/images/cafe-16-md.webp", alt: "The NotePads Study Hub Café sign at night", caption: "look for the glowing sign" },
  { src: "/images/cafe-05-sm.webp", alt: "Study stations and red chairs", caption: "stations with a plug and a view" },
  { src: "/images/cafe-12-sm.webp", alt: "The open pantry", caption: "pantry within reach" },
];

const BACK_SHOT = { src: "/images/cafe-03-sm.webp", alt: "The NotePads coffee counter with warm hanging lights", caption: "the counter with warm lights" };

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
  const minute = get("minute");
  const sun = get("weekday") === "Sun";
  const open = sun ? hour >= 10 && hour < 20 : hour >= 7 && hour < 22;
  const closes = sun ? "8 PM" : "10 PM";
  const opens = sun ? "10 AM" : "7 AM";
  const today = sun ? "10 AM – 8 PM" : "7 AM – 10 PM";
  return { open, closes, opens, today };
}

const LIVE_HOURS = "Open Mon–Sat 7 AM – 10 PM · Sun 10 AM – 8 PM";

export default function Hero() {
  const [slide, setSlide] = useState(0);
  const [visible, setVisible] = useState(true);
  // Live status only after hydration — an SSG-rendered clock could go stale
  // or mismatch between server render and first client render.
  const [status, setStatus] = useState<ReturnType<typeof manilaNow> | null>(null);

  const slides = useMemo(() => SLIDES, []);

  useEffect(() => {
    setStatus(manilaNow());
    const t = setInterval(() => setStatus(manilaNow()), 60_000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (visible) {
      timer = setInterval(() => setSlide((s) => (s + 1) % slides.length), 6000);
    }
    return () => clearInterval(timer);
  }, [visible, slides.length]);

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), {
      threshold: 0.15,
    });
    const el = document.getElementById("top");
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section id="top" className="hero" aria-label="NotePads Study Hub Cafe — welcome">
      <svg viewBox="0 0 24 24" className="hero-spark a" width="26" height="26" fill="currentColor" aria-hidden="true">
        <path d="M12 2l2.6 7.4L22 12l-7.4 2.6L12 22l-2.6-7.4L2 12l7.4-2.6Z" />
      </svg>
      <svg viewBox="0 0 24 24" className="hero-spark b" width="16" height="16" fill="currentColor" aria-hidden="true">
        <path d="M12 2l2.6 7.4L22 12l-7.4 2.6L12 22l-2.6-7.4L2 12l7.4-2.6Z" />
      </svg>

      <div className="hero-inner">
        <div className="hero-copy">
          <h1 className="hero-title">
            Where learning <br />
            meets <span className="scribble">comfort</span>
          </h1>
          <p className="hero-lede">
            Your cozy corner for coffee, focus, and fresh ideas — <strong>free Wi-Fi, charging,
            and 2 hours of study time on the house</strong>. Tucked on the 2nd floor of the SDC
            Building, Mandurriao, Iloilo City.
          </p>
          <div className="hero-ctas">
            <a href="#menu" className="btn btn-terra">
              See the menu
            </a>
            <a href="#visit" className="btn btn-ghost">
              Find us
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
          <figure className="shot is-back">
            <span className="u-tape" aria-hidden="true" />
            <div className="shot-frame">
              <div className="shot-photo">
                <Image
                  src={BACK_SHOT.src}
                  alt={BACK_SHOT.alt}
                  fill
                  sizes="(max-width: 980px) 88vw, 370px"
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
                    sizes="(max-width: 980px) 92vw, 420px"
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
        </div>
      </div>

      <a href="#about" className="hero-scroll" aria-label="Scroll to About">
        scroll
        <ChevronDown size={18} aria-hidden="true" />
      </a>
    </section>
  );
}
