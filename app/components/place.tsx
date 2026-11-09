"use client";

// T7 — The Place (#place) gallery. Client island: the lightbox needs state.
// Card anatomy (reference redesign 2026-11-09): a slim --paper frame around a
// full-photo box whose aspect-ratio matches the photo's intrinsic dimensions
// (--ar var, zero CLS). Over the photo: a mustard 01–08 badge top-left and the
// caption + Gaegu sub-line bottom-left on an ink scrim gradient. src is null
// where no honest match exists — those slots render a kraft "photo coming
// soon" frame (badge/caption/sub grouped bottom-left in --ink) and never open
// the lightbox. A --blue CTA banner closes the section. Shots run the room's
// narrative: arrive → order → snacks → study → perch → lounge → company →
// address. No priority: the hero owns LCP; every gallery src is lazy.
import Image from "next/image";
import { ArrowRight, ChevronLeft, ChevronRight, X } from "lucide-react";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import Reveal from "./reveal";
import Accent from "./accent";
import SectionTab from "./section-tab";
import "../place.css";

type Shot = {
  src: string | null;
  alt: string; // describes the actual photo (or the wanted one when src is null)
  caption: string; // verbatim from details.md §6
  sub: string; // warm sub-line under the caption (shot order)
  ratio: string; // intrinsic aspect-ratio of the photo, e.g. "3 / 2"
  pos?: string; // object-position crop; differentiates reused srcs
  tape?: boolean; // décor budget: max 2 taped cards in the whole section
  sizes?: string; // overrides CARD_SIZES when the cover crop needs more width (see cardSizes)
};

// object-fit: cover scales a photo up until it covers the box, so a source
// wider than the box is painted wider than the box and a width-only `sizes`
// hint underserves the card. mult = painted width ÷ box width =
// (source ratio) ÷ (box ratio). Every card box now matches its photo's
// intrinsic ratio, so mult is 1 for all shots — the mechanism stays for any
// future reused-src crop that needs it.
const cardSizes = (mult: number) =>
  `(min-width: 980px) calc((min(100vw, 1200px) - 160px) / 3 * ${mult}), (min-width: 640px) calc((100vw - 96px) / 2 * ${mult}), calc((100vw - 48px) * ${mult})`;

const SHOTS: Shot[] = [
  {
    src: "/images/glowing-sign-night.webp", // the actual glowing sign at dusk (3:2)
    alt: "The glowing NotePads Study Hub Café sign at dusk",
    caption: "Look for the glowing sign",
    sub: "Follow the glowing sign up to the 2nd floor.",
    ratio: "3 / 2",
    tape: true,
  },
  {
    src: "/images/counter-menu-board.webp", // counter + barista + menu board (4:3)
    alt: "Coffee counter and menu board behind the barista",
    caption: "The coffee counter",
    sub: "Round tables and red chairs for coffee with friends.",
    ratio: "4 / 3",
  },
  {
    src: "/images/the-open-pantry.webp", // the actual open pantry (3:2)
    alt: "The open pantry with fruit trays, cereal dispensers, and snack jars under a Pantry sign",
    caption: "The open pantry",
    sub: "Snacks and brain fuel. Help yourself.",
    ratio: "3 / 2",
  },
  {
    src: "/images/communal-table-red-chairs.webp", // empty communal table, clear view (4:3)
    alt: "Empty communal table with red chairs under the logo wall",
    caption: "The communal table, in full focus",
    sub: "Spread out, plug in, and stay a while.",
    ratio: "4 / 3",
    pos: "50% 20%",
  },
  {
    src: "/images/study-stations-printing.webp", // workstation pods — reused from hero (4:3)
    alt: "Workstation pods with ergonomic chairs by the window",
    caption: "Study stations",
    sub: "Your own desk, your own plug, your own quiet.",
    ratio: "4 / 3",
  },
  {
    src: "/images/logo-wall.webp", // NotePads mural wall + booth seating (4:3)
    alt: "NotePads Café mural wall with booth seating",
    caption: "Lounge corner & logo wall",
    sub: "Soft seats under our logo. Slow chats welcome.",
    ratio: "4 / 3",
  },
  {
    src: "/images/laptops-daylight.webp", // guests with laptops, bright room (2:3 portrait)
    alt: "Guests working on laptops in the bright café",
    caption: "Laptops, coffee, good company",
    sub: "Good company for a long work session.",
    ratio: "2 / 3",
    pos: "20% 45%",
  },
  {
    src: "/images/SDC-building-2nd-floor.webp", // NotePads sign on the 2nd-floor balcony (~2:1 source, boxed 3/2 to balance the pantry card)
    alt: "The SDC Building on Guzman–Jesena Street with the NotePads sign on its 2nd-floor balcony",
    caption: "SDC Building · 2nd floor · Guzman–Jesena St",
    sub: "2nd floor, Guzman–Jesena Street, Mandurriao.",
    ratio: "3 / 2",
    tape: true,
  },
];

// Indices of shots that have a photo — the lightbox only cycles through these.
const VIEWABLE_INDICES = SHOTS.flatMap((s, i) => (s.src ? [i] : []));

// Zero-CLS: the reserved photo box reads its ratio from this var (see
// .place-shot-photo / .place-lb-photo in place.css).
const arStyle = (ratio: string) => ({ "--ar": ratio }) as CSSProperties;

// v4 copy: headline carries the accent word; lede stays warm (details facts).
const LEDE =
  "Warm lights, red chairs, a pantry within reach and a seat with a plug waiting. Take a peek around the 2nd floor — tap any photo for a closer look.";

// Single content column (--maxw) minus gutters/gap, split by the masonry
// column count at each breakpoint (3 ≥980, 2 ≥640, 1 below).
const CARD_SIZES = cardSizes(1);
const LB_SIZES = "(min-width: 1100px) 900px, 92vw";

// CTA banner — same directions URL the visit section's "Get directions"
// uses (copied verbatim from visit.tsx; %2C segments pre-encoded there).
const DIRECTIONS =
  "https://www.google.com/maps/dir/?api=1&destination=Notepads+Cafe%2C+SDC+Building%2C+Guzman-Jesena+Street%2C+Mandurriao%2C+Iloilo+City";

const CTA_BODY =
  "Walk in anytime. We're on the 2nd floor of the SDC Building, Guzman–Jesena Street, Mandurriao. Look for the glowing sign.";

const BUTTON_BOTH = { strokeWidth: 2.4 } as const;

export default function Place() {
  const [open, setOpen] = useState<number | null>(null);
  const [closing, setClosing] = useState(false);
  // "next"/"prev" drives the direction-aware enter animation; null (first
  // open, reset on card click) falls back to the scale-in. State, not a ref:
  // the figure's className reads it during render.
  const [dir, setDir] = useState<"next" | "prev" | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);
  // Overlay root — anchors the chrome AND scopes the Tab trap, since the
  // close/prev/next buttons live outside the dialog box.
  const lbRef = useRef<HTMLDivElement | null>(null);
  // Triggering card, captured in the click handler so focus returns there on close.
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const touchX = useRef<number | null>(null);
  // Pending close-fade timer; non-null doubles as the double-close guard.
  const closeTimer = useRef<number | null>(null);

  const isOpen = open !== null;

  const next = useCallback(() => {
    setDir("next");
    setOpen((i) => (i === null ? i : (i + 1) % VIEWABLE_INDICES.length));
  }, []);

  const prev = useCallback(() => {
    setDir("prev");
    setOpen((i) =>
      i === null ? i : (i - 1 + VIEWABLE_INDICES.length) % VIEWABLE_INDICES.length,
    );
  }, []);

  const close = useCallback(() => {
    if (closeTimer.current !== null) return; // fade already running
    // Reduced motion: skip the 200ms fade and unmount immediately.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setOpen(null);
      return;
    }
    setClosing(true);
    closeTimer.current = window.setTimeout(() => {
      closeTimer.current = null;
      setOpen(null);
    }, 200);
  }, []);

  // Focus management + body scroll lock. Runs once per open/close (not per
  // index change), so arrow navigation doesn't bounce focus back to the close.
  useEffect(() => {
    if (!isOpen) return;
    const trigger = triggerRef.current;
    closeRef.current?.focus();
    const prevBodyOverflow = document.body.style.overflow;
    const prevHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevBodyOverflow;
      document.documentElement.style.overflow = prevHtmlOverflow;
      trigger?.focus();
    };
  }, [isOpen]);

  // Abort a pending close-fade if the lightbox unmounts or reopens mid-fade,
  // and reset the flag so the next open starts from the scale-in.
  useEffect(() => {
    return () => {
      if (closeTimer.current !== null) {
        window.clearTimeout(closeTimer.current);
        closeTimer.current = null;
      }
      setClosing(false);
    };
  }, [isOpen]);

  // Escape closes; ArrowLeft/ArrowRight navigate (wrapping); Tab stays trapped
  // across the overlay's controls (close + prev + next — the dialog box holds
  // no focusables). Only mounted while the lightbox is open.
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
        const root = lbRef.current;
        if (!root) return;
        const focusables = Array.from(
          root.querySelectorAll<HTMLButtonElement>("button:not([disabled])"),
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
            <div className="place-head-col">
              <SectionTab num="03" label="The Place" tone="mustard" />
              <h2 id="place-title" className="place-title">
                Make yourself at <Accent>home</Accent>
              </h2>
            </div>
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
          {SHOTS.map((shot, i) =>
            shot.src ? (
              <li key={shot.alt} className="place-item">
                <button
                  type="button"
                  className={`place-card place-tilt-${i % 2 === 0 ? "l" : "r"}`}
                  suppressHydrationWarning
                  aria-label={shot.caption}
                  aria-haspopup="dialog"
                  onClick={(e) => {
                    triggerRef.current = e.currentTarget;
                    setDir(null); // first open: scale-in, not directional
                    setOpen(VIEWABLE_INDICES.indexOf(i));
                  }}
                >
                  <figure className="place-shot">
                    {shot.tape && <span className="u-tape place-tape" aria-hidden="true" />}
                    <div className="place-shot-photo" style={arStyle(shot.ratio)}>
                      <Image
                        src={shot.src}
                        alt={shot.alt}
                        fill
                        sizes={shot.sizes ?? CARD_SIZES}
                        style={{
                          objectFit: "cover",
                          objectPosition: shot.pos,
                        }}
                      />
                      <span className="place-scrim" aria-hidden="true" />
                      <span className="place-num" aria-hidden="true">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <figcaption className="place-shot-cap">
                      <span className="place-cap">{shot.caption}</span>
                      <span className="place-sub">{shot.sub}</span>
                    </figcaption>
                  </figure>
                </button>
              </li>
            ) : (
              // No matching photo yet: a non-interactive kraft frame at the
              // slot's exact ratio — "photo coming soon" top-left, the badge +
              // caption/sub grouped bottom-left in --ink. Never opens the
              // lightbox.
              <li key={shot.alt} className="place-item">
                <figure
                  className={`place-shot place-shot-empty place-tilt-${i % 2 === 0 ? "l" : "r"}`}
                >
                  {shot.tape && <span className="u-tape place-tape" aria-hidden="true" />}
                  <div className="place-shot-photo" style={arStyle(shot.ratio)}>
                    <span className="place-empty-note">Photo coming soon</span>
                  </div>
                  <figcaption className="place-shot-cap place-shot-cap--empty">
                    <span className="place-num place-num--empty" aria-hidden="true">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="place-cap">{shot.caption}</span>
                    <span className="place-sub">{shot.sub}</span>
                  </figcaption>
                </figure>
              </li>
            ),
          )}
          </ul>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="place-cta">
            <h3 className="place-cta-title">
              Found your favorite <span className="place-cta-accent">spot</span>?
            </h3>
            <p className="place-cta-body">{CTA_BODY}</p>
            <div className="place-cta-btns">
              <a
                className="place-cta-btn place-cta-btn--solid"
                href={DIRECTIONS}
                target="_blank"
                rel="noopener"
              >
                Get directions
                <ArrowRight size={18} aria-hidden="true" {...BUTTON_BOTH} />
              </a>
              <a className="place-cta-btn place-cta-btn--ghost" href="#menu">
                See the menu
              </a>
            </div>
          </div>
        </Reveal>
      </div>

      {open !== null && (
        <div
          ref={lbRef}
          className={closing ? "place-lb is-closing" : "place-lb"}
          onClick={(e) => {
            // close only on a true backdrop tap — never when a child (nav
            // arrows, count, dialog box) is the click target
            if (e.target === e.currentTarget) close();
          }}
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
          {/* chrome anchored to the overlay itself, not the dialog box, so the
              fixed nav can never paint over it; DOM order = Tab order */}
          <button
            ref={closeRef}
            type="button"
            className="place-lb-close"
            aria-label="Close photo view"
            onClick={close}
          >
            <X size={22} aria-hidden="true" {...BUTTON_BOTH} />
          </button>
          <p className="place-lb-count" aria-hidden="true">
            {open + 1} / {VIEWABLE_INDICES.length}
          </p>
          <button
            type="button"
            className="place-lb-nav place-lb-prev"
            aria-label="Previous photo"
            onClick={prev}
          >
            <ChevronLeft size={24} aria-hidden="true" {...BUTTON_BOTH} />
          </button>
          <button
            type="button"
            className="place-lb-nav place-lb-next"
            aria-label="Next photo"
            onClick={next}
          >
            <ChevronRight size={24} aria-hidden="true" {...BUTTON_BOTH} />
          </button>
          <div
            className="place-lb-box"
            role="dialog"
            aria-modal="true"
            aria-label={SHOTS[VIEWABLE_INDICES[open]].caption}
            onClick={(e) => e.stopPropagation()}
          >
            {/* key={} restarts the enter animation on every arrow/swipe move;
                the dir class slides it in from the travel direction (null on
                first open = scale-in) */}
            <figure
              className={dir ? `place-lb-fig place-lb-fig--${dir}` : "place-lb-fig"}
              key={open}
            >
              <div
                className="place-lb-photo"
                style={arStyle(SHOTS[VIEWABLE_INDICES[open]].ratio)}
              >
                <Image
                  src={SHOTS[VIEWABLE_INDICES[open]].src!}
                  alt={SHOTS[VIEWABLE_INDICES[open]].alt}
                  fill
                  sizes={LB_SIZES}
                  style={{
                    objectFit: "cover",
                    objectPosition: SHOTS[VIEWABLE_INDICES[open]].pos,
                  }}
                />
              </div>
              <figcaption className="place-lb-cap">
                <span className="place-lb-cap-title">
                  {SHOTS[VIEWABLE_INDICES[open]].caption}
                </span>
                <span className="place-lb-cap-sub">
                  {SHOTS[VIEWABLE_INDICES[open]].sub}
                </span>
              </figcaption>
            </figure>
          </div>
        </div>
      )}
    </section>
  );
}
