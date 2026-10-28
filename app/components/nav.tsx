"use client";

import Image from "next/image";
import { Menu, MessageCircle, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import "../nav.css";

// WhatsApp is a details.md fact (general channel +63 995 229 3755).
const WHATSAPP = "https://wa.me/639952293755";

const LINKS = [
  { href: "#about", label: "About" },
  { href: "#menu", label: "Menu" },
  { href: "#place", label: "The Place" },
  { href: "#saturdays", label: "Saturdays" },
  { href: "#reviews", label: "Reviews" },
  { href: "#visit", label: "Visit" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active-section tracking: observe the anchor targets once they exist
  // (sections land in later tasks; the observer picks them up on mount).
  useEffect(() => {
    const targets = LINKS.map((l) => document.getElementById(l.href.slice(1))).filter(
      (el): el is HTMLElement => el !== null,
    );
    if (targets.length === 0) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(`#${e.target.id}`);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    burgerRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;
    // lock BOTH roots: iOS Safari keeps scrolling the viewport unless html
    // itself is overflow-hidden, not just body (matches the preloader lock)
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  return (
    <>
    <header className={`nav ${scrolled ? "is-scrolled" : ""}`}>
      <div className="nav-inner">
        <a href="#top" className="nav-brand" aria-label="NotePads — back to top">
          <span className="nav-logo-coin">
            <Image
              src="/logo.jpg"
              alt=""
              width={1320}
              height={1321}
              className="nav-logo"
            />
          </span>
          <span className="nav-brand-text">
            <span className="nav-brand-name">NotePads</span>
            <span className="nav-brand-sub">study hub cafe</span>
          </span>
        </a>

        <nav className="nav-links" aria-label="Site sections">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              aria-current={active === l.href ? "true" : undefined}
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* CTA = an ACTION, not a scroll: WhatsApp keeps the nav free of a
            duplicate #menu affordance (the Menu link tracks scroll position)
            and matches the mobile-heavy WhatsApp-first scene (details.md). */}
        <a
          href={WHATSAPP}
          target="_blank"
          rel="noreferrer"
          className="btn btn-blue nav-cta"
        >
          WhatsApp us
          <MessageCircle size={18} aria-hidden="true" />
        </a>

        <button
          ref={burgerRef}
          className="nav-burger"
          aria-expanded={open}
          aria-controls="nav-sheet"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
    </header>

    {/* Sibling of the header: a backdrop-filter on ".nav.is-scrolled" makes it
        the containing block for fixed descendants, which would clip this
        full-screen sheet to the 72px nav bar once the page has scrolled. */}
    <div id="nav-sheet" className={`nav-sheet ${open ? "is-open" : ""}`} aria-hidden={!open}>
          <nav className="nav-sheet-links" aria-label="Site sections">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className={open ? "is-open" : ""}
                onClick={() => setOpen(false)}
                tabIndex={open ? 0 : -1}
              >
                {l.label}
              </a>
            ))}
          </nav>
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noreferrer"
            className={`btn btn-blue nav-sheet-cta ${open ? "is-open" : ""}`}
            tabIndex={open ? 0 : -1}
          >
            WhatsApp us
            <MessageCircle size={18} aria-hidden="true" />
          </a>
          <p className="nav-sheet-contact">
            Open Mon–Sat 7am–10pm · Sun 10am–8pm <br />
            <a href="tel:+639565543184">0956 554 3184</a> ·{" "}
            <a href="mailto:notepadscafe1109@gmail.com">notepadscafe1109@gmail.com</a>
          </p>
    </div>
    </>
  );
}
