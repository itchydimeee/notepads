"use client";

// T7 — The Place (#place) gallery. Client island: the lightbox needs state.
// Captions + alt text verbatim from docs/details.md §6 (no invented copy).
// Images are the 5 branded placeholder PNGs in public/images (production
// photos deferred in T0): slots are mapped onto them by reuse — exact subject
// matches first (hero.tsx alts), the rest reuse the closest interior shot.
// No priority: the hero owns LCP; every gallery src is lazy by default.
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import Reveal from "./reveal";
import "../place.css";

type RatioHint = "wide" | "tall" | "square";

type Shot = {
  src: string;
  alt: string; // alt of the FUTURE photo (verbatim from details.md §6)
  caption: string; // verbatim from details.md §6
  ratio: RatioHint; // layout hint from details.md §6
  tape?: boolean; // décor budget: max 2 taped cards in the whole section
};

const SHOTS: Shot[] = [
  {
    src: "/images/cafe-16-md.png", // hero: "the sign at night" — exact match
    alt: "The glowing NotePads Study Hub Café sign at night",
    caption: "Look for the glowing sign",
    ratio: "wide",
    tape: true,
  },
  {
    src: "/images/cafe-05-sm.png", // students studying — closest subject
    alt: "Students working at the long communal study table",
    caption: "The communal table, in full focus",
    ratio: "tall",
  },
  {
    src: "/images/cafe-10-md.png", // hero: "lounge with the logo wall" — exact match
    alt: "Lounge seating under the NotePads logo wall",
    caption: "Lounge corner & logo wall",
    ratio: "square",
  },
  {
    src: "/images/cafe-03-sm.png", // hero: "coffee counter with hanging lights" — exact match
    alt: "The NotePads coffee counter with warm hanging lights",
    caption: "The coffee counter",
    ratio: "square",
  },
  {
    src: "/images/cafe-05-sm.png", // hero: "study stations and red chairs" — exact match
    alt: "Study stations with red chairs and string lights",
    caption: "Study stations",
    ratio: "wide",
  },
  {
    src: "/images/cafe-12-sm.png", // hero: "the open pantry" — exact match
    alt: "The open pantry shelves with fruit and cereal jars",
    caption: "The open pantry",
    ratio: "square",
  },
  {
    src: "/images/cafe-03-sm.png", // drinks warm the scene — reuse
    alt: "Guests studying with laptops and iced coffee",
    caption: "Laptops, coffee, good company",
    ratio: "tall",
  },
  {
    src: "/images/cafe-16-md.png", // signage/building — reuse
    alt: "The SDC Building on Guzman–Jesena Street",
    caption: "SDC Building · 2nd floor · Guzman–Jesena St",
    ratio: "square",
    tape: true,
  },
];

const LEDE =
  "Warm lights, red chairs, a pantry within reach and a seat with a plug. Here's a peek around the 2nd floor.";

// Single content column (--maxw) minus gutters/gap, split by the masonry
// column count at each breakpoint (3 ≥980, 2 ≥640, 1 below).
const CARD_SIZES =
  "(min-width: 980px) calc((min(100vw, 1200px) - 160px) / 3), (min-width: 640px) calc((100vw - 96px) / 2), calc(100vw - 48px)";
const LB_SIZES = "(min-width: 1100px) 900px, 92vw";

const BUTTON_BOTH = { strokeWidth: 2.4 } as const;

export default function Place() {
  const [open, setOpen] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const boxRef = useRef<HTMLDivElement | null>(null);
  // Triggering card, captured in the click handler so focus returns there on close.
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const touchX = useRef<number | null>(null);

  const isOpen = open !== null;

  const next = useCallback(() => {
    setOpen((i) => (i === null ? i : (i + 1) % SHOTS.length));
  }, []);

  const prev = useCallback(() => {
    setOpen((i) => (i === null ? i : (i - 1 + SHOTS.length) % SHOTS.length));
  }, []);

  const close = useCallback(() => setOpen(null), []);

  // Focus management + body scroll lock. Runs once per open/close (not per
  // index change), so arrow navigation doesn't bounce focus back to the close.
  useEffect(() => {
    if (!isOpen) return;
    const trigger = triggerRef.current;
    closeRef.current?.focus();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
      trigger?.focus();
    };
  }, [isOpen]);

  // Escape closes; ArrowLeft/ArrowRight navigate (wrapping); Tab stays trapped
  // inside the dialog's controls. Only mounted while the lightbox is open.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        next();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        prev();
      } else if (e.key === "Tab") {
        const box = boxRef.current;
        if (!box) return;
        const focusables = Array.from(
          box.querySelectorAll<HTMLButtonElement>("button:not([disabled])"),
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        const active = document.activeElement;
        if (e.shiftKey && active === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && active === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, close, next, prev]);

  return (
    <section id="place" className="place" aria-labelledby="place-title">
      <div className="place-inner">
        <Reveal>
          <header className="place-head">
            <h2 id="place-title" className="place-title">
              Come on in
            </h2>
            <p className="place-lede">{LEDE}</p>
          </header>
        </Reveal>

        {/* CSS multi-column masonry — reading order runs column-first
            (top of column 1 → down, then column 2), accepted by the spec
            for a photo wall. Flex/Grid deliberately NOT used on this
            container so `break-inside: avoid` can't fall back to
            fragmenting; flex only lives inside each card (figure). */}
        <Reveal delay={0.06}>
          <ul className="place-wall">
          {SHOTS.map((shot, i) => (
              <li key={shot.alt} className="place-item">
                <button
                  type="button"
                  className={`place-card place-tilt-${i % 2 === 0 ? "l" : "r"}`}
                  aria-label={shot.caption}
                  aria-haspopup="dialog"
                  onClick={(e) => {
                    triggerRef.current = e.currentTarget;
                    setOpen(i);
                  }}
                >
                  <figure className="place-shot">
                    {shot.tape && <span className="u-tape place-tape" aria-hidden="true" />}
                    <div className={`place-shot-photo place-ar-${shot.ratio}`}>
                      <Image
                        src={shot.src}
                        alt={shot.alt}
                        fill
                        sizes={CARD_SIZES}
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                    <figcaption className="place-shot-cap">{shot.caption}</figcaption>
                  </figure>
                </button>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>

      {open !== null && (
        <div
          className="place-lb"
          onClick={close}
          onTouchStart={(e) => {
            const t = e.touches[0];
            touchX.current = t ? t.clientX : null;
          }}
          onTouchEnd={(e) => {
            const startX = touchX.current;
            touchX.current = null;
            if (startX === null) return;
            const end = e.changedTouches[0];
            if (!end) return;
            const dx = end.clientX - startX;
            if (Math.abs(dx) > 48) {
              if (dx < 0) next();
              else prev();
            }
          }}
        >
          <div
            ref={boxRef}
            className="place-lb-box"
            role="dialog"
            aria-modal="true"
            aria-label={SHOTS[open].caption}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              ref={closeRef}
              type="button"
              className="place-lb-close"
              aria-label="Close photo view"
              onClick={close}
            >
              <X size={22} aria-hidden="true" {...BUTTON_BOTH} />
            </button>
            <button
              type="button"
              className="place-lb-nav place-lb-prev"
              aria-label="Previous photo"
              onClick={prev}
            >
              <ChevronLeft size={24} aria-hidden="true" {...BUTTON_BOTH} />
            </button>
            {/* key={} restarts the scale-in on every arrow/swipe move */}
            <figure className="place-lb-fig" key={open}>
              <div className={`place-lb-photo place-ar-${SHOTS[open].ratio}`}>
                <Image
                  src={SHOTS[open].src}
                  alt={SHOTS[open].alt}
                  fill
                  sizes={LB_SIZES}
                  style={{ objectFit: "cover" }}
                />
              </div>
              <figcaption className="place-lb-cap">{SHOTS[open].caption}</figcaption>
            </figure>
            <button
              type="button"
              className="place-lb-nav place-lb-next"
              aria-label="Next photo"
              onClick={next}
            >
              <ChevronRight size={24} aria-hidden="true" {...BUTTON_BOTH} />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
