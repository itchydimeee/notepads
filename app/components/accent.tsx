"use client";

// T13.1 E2 — shared accent-word per ui_design.md §2.1: ONE key word per main
// heading, lightly slanted, marked by a hand-drawn honey swash that draws in
// when scrolled into view. SSR/no-JS/reduced-motion: swash shows fully drawn
// (the draw-in is armed only after hydration, so visible content is never
// hidden from prerender). The word itself keeps --ink on light ground — gold
// stays decoration (contrast bar, ui_design.md §6).

import { useEffect, useRef } from "react";

export default function Accent({
  children,
  variant,
}: {
  children: string;
  /** "goldtext" = dark-ground treatment (--mustard text, swash hidden —
   *  styles already live in globals.css `.accent-word--goldtext`). */
  variant?: "goldtext";
}) {
  const boxRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const box = boxRef.current;
    if (!box) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) return; // keep the swash drawn statically

    // Arm AFTER mount: swash dashes out, then draws in on first view.
    let armed = false;
    const armTimer = window.setTimeout(() => {
      armed = true;
      box.dataset.armed = "1";
    }, 50);

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          box.classList.add("is-in");
          io.disconnect();
        }
      },
      { rootMargin: "-32px 0px 0px 0px" },
    );
    io.observe(box);

    return () => {
      window.clearTimeout(armTimer);
      io.disconnect();
    };
  }, []);

  const cls = variant === "goldtext" ? "accent-word accent-word--goldtext" : "accent-word";

  return (
    <span className={cls} ref={boxRef}>
      <span className="accent-word-text">{children}</span>
      <svg
        className="accent-word-swash"
        viewBox="0 0 120 14"
        preserveAspectRatio="none"
        aria-hidden="true"
        focusable="false"
      >
        <path
          d="M3 9.5 C 22 3.5, 44 11.5, 62 7.5 S 98 4, 117 8.5"
          pathLength={100}
        />
      </svg>
    </span>
  );
}
