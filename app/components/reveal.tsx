"use client";

// T13 — the ONE shared reveal wrapper (docs/ui_design.md §5 + §7, task.md T13).
// Every section consumes this; there are NO per-section bespoke easings —
// tokens match the spec exactly: rise 28px + fade, 0.8s, ease [0.22, 1, 0.36, 1]
// (the CSS token --ease, cubic-bezier(0.22, 1, 0.36, 1)), once, viewport -72px.
//
// THREE invariants baked in here, inherited by every consumer:
//
// 1. REDUCED MOTION (prefers-reduced-motion: reduce): useReducedMotion() → the
//    wrapper renders a PLAIN <div> with zero animation props — the content is
//    instant-visible and static, on top of the globals.css `1ms` kill-switch.
//
// 2. No-JS / SSR safety (impeccable craft-floor: "content must never be
//    permanently hidden for no-JS users"): framer-motion would SSR its
//    `initial` state (opacity 0, y 28) into the prerendered HTML, hiding the
//    whole section from a visitor without JavaScript. So the motion props are
//    ONLY applied after first client mount (mounted gate). Consequences:
//      - Server HTML + no-JS visitors: every Reveal block fully visible.
//      - First client render (mounted = false): identical markup → NO hydration
//        mismatch (same pattern the hero clock and the Saturday batch logic use).
//      - After mount: the element gets `initial` and animates in on the next
//        paint — an imperceptible handoff for below-viewport reveals.
//
// 3. Semantically transparent: a plain <div> with no layout, margin, or
//    flex/grid behavior of its own. It inherits full width; place it as the
//    section's grid child where one existed before (wrapper takes its place).
//    Where a NestING would break CSS grid placement rules baked into the
//    section styles (e.g. menu-main's justify-self centering), the section
//    instead wraps its WHOLE content stack in one Reveal — documented in the
//    section files.

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  /** Stagger delay in SECONDS (spec: i × 60ms, capped 3–4 items per group). */
  delay?: number;
  /** Escape hatch for the rare wrapper needed as a specific grid item. */
  className?: string;
};

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function Reveal({ children, delay = 0, className }: RevealProps) {
  const reduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Reduced motion (or pre-hydration / no-JS): visible, static, no props.
  if (reduce || !mounted) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-72px" }}
      transition={{ duration: 0.8, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}
