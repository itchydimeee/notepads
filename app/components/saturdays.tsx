"use client";

// T8 — Saturdays (#saturdays): kids-workshops memo board on the kraft ground,
// ink-tinted dot grid (mirrors menu.css's treatment — re-expressed locally).
// Client island kept deliberately small: its ONLY state is the post-mount
// "has each session's last date passed?" verdict, which drives the dimmed+✓
// date chips and the batch-over reserve copy (the T8 DoD batch logic — see
// the hydration note on the logic functions below).
// All copy + links verbatim from docs/details.md §7 (lines 313–354) and the
// §Site Identity table (lines 15, 21–23). No invented copy; no invented claims
// (payment / parking are not published and are not shown).
import { Check, Coffee, Cookie, Palette } from "lucide-react";
import { useEffect, useState } from "react";
import Accent from "./accent";
import Reveal from "./reveal";
import SectionTab from "./section-tab";
import "../saturdays.css";

/* --- constants ----------------------------------------------------------------
   Verbatim strings kept OUTSIDE JSX (menu.tsx / place.tsx idiom) so ₱, —, ·,
   en-dashes and apostrophes survive prerender untouched. v4: the H2 gains the
   shared accent word (dates, prices, phone numbers stay verbatim §7). */
const LEDE =
  "Give your child the gift of creativity, one gadget-free Saturday at a time. We're inviting parents to let their little ones unplug, explore, and create in a fun, hands-on environment where they can learn new skills, build confidence, and make new friends.";

const BOARD_TITLE = "No Gadget Kids Workshops";
const BOARD_TAGLINE = "Learn · Create · Imagine";
const FACTS = ["Saturdays", "9:00 – 11:00 AM", "Ages 6 – 10 years old"];

const INCLUSIONS_HEADING = "What's Included";
const INCLUSIONS = ["Apron", "ID", "Materials", "Snacks", "Certificate"];

const PRICING_HEADING = "Pricing";
const PRICES = [
  { pkg: "Per workshop", price: "₱1,299", save: null },
  { pkg: "Any 2 workshops", price: "₱2,298", save: "save ₱300" },
  { pkg: "All 3 workshops", price: "₱3,497", save: "save ₱400" },
];

const RESERVE_TITLE = "Reserve your child's spot";
const RESERVE_LIMITED =
  "Limited slots only! Saturdays only: message our FB/IG, call, or visit us to reserve.";
const RESERVE_OVER =
  "The 2026 batch of sessions has wrapped up — message us to ask about the next dates.";

// All 4 contact routes render in BOTH reserve states (the docs don't retire
// the workshop phone once the batch wraps; contact routes never disappear).
const CONTACT_BTNS = [
  { label: "0917 716 9035", href: "tel:+639177169035" },
  { label: "WhatsApp", href: "https://wa.me/639952293755" },
  { label: "Instagram", href: "https://www.instagram.com/notepads.cafe/" },
  { label: "Facebook", href: "https://www.facebook.com/profile.php?id=61582392323170" },
];

const SMALL_LINE =
  "Also: 0995 229 3755 · NotePads Cafe, 2nd Floor, SDC Building, Guzman–Jesena Street, Mandurriao";
const MOTTO = "Because the best things happen offline.";

type Session = {
  name: string;
  tag: string;
  dates: string;
  Icon: typeof Palette;
};

const SESSIONS: [Session, Session, Session] = [
  {
    name: "Art Workshop",
    tag: "Unleash creativity through colors & craft!",
    dates: "Aug 15 & Aug 22, 2026",
    Icon: Palette,
  },
  {
    name: "Little Barista",
    tag: "Learn basic coffee skills + make their own drinks!",
    dates: "Aug 29 & Sep 5, 2026",
    Icon: Coffee,
  },
  {
    name: "Cookie Decor",
    tag: "Bake, design, and eat their yummy creations!",
    dates: "Sep 12 & Sep 19, 2026",
    Icon: Cookie,
  },
];

/* --- hydration-safe batch logic (hero's Asia/Manila clock pattern) -------------
   Server HTML and the FIRST client render share the "not yet past" default —
   NO static wrapped state (a rebuild in Sept 2026, or any future batch, flips
   automatically the first time an island hydrates after the last date passes).
   After mount, "today" is resolved in Asia/Manila and compared against each
   session's LAST date, parsed at run time from the verbatim dates string
   itself ("Aug 22, 2026" → 2026-08-22) — the date strings on the page never
   change, no invented date copy. Post-mount setState only: the pre-mount
   markup matches the server exactly, so no hydration mismatch (and no
   suppressHydrationWarning — same reasoning as the hero). */

const MANILA_TZ = "Asia/Manila";

const MONTH_NO: Record<string, number> = {
  Jan: 1, Feb: 2, Mar: 3, Apr: 4, May: 5, Jun: 6,
  Jul: 7, Aug: 8, Sep: 9, Oct: 10, Nov: 11, Dec: 12,
};

// "Aug 15 & Aug 22, 2026" → the session's last date as a sortable
// "YYYY-MM-DD" key derived from the verbatim string (single source of truth).
function lastDateKey(dates: string): string {
  const tail = dates.split(" & ").pop() ?? "";
  const m = /^([A-Z][a-z]{2}) (\d{1,2}), (\d{4})$/.exec(tail);
  if (!m) return "";
  return `${m[3]}-${String(MONTH_NO[m[1]] ?? 0).padStart(2, "0")}-${m[2].padStart(2, "0")}`;
}

// Today in Manila as "YYYY-MM-DD" (hero.tsx's same "resolve the clock in
// Manila after mount" shape — here we only need the calendar date).
function manilaToday(): string {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: MANILA_TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "00";
  return `${get("year")}-${get("month")}-${get("day")}`;
}

// Strictly AFTER the last date: on the final Saturday itself the sessions are
// still live (9–11 AM that morning), so the flip happens at the following
// Manila midnight. Unparseable strings stay live — never invent a past verdict.
function isPast(dates: string, today: string): boolean {
  const last = lastDateKey(dates);
  return last !== "" && today > last;
}

export default function Saturdays() {
  const [done, setDone] = useState<[boolean, boolean, boolean]>([false, false, false]);

  // One-shot after hydration — a batch runs for weeks, so the natural flip
  // point is the next full page render, not a ticking interval.
  useEffect(() => {
    const today = manilaToday();
    setDone([
      isPast(SESSIONS[0].dates, today),
      isPast(SESSIONS[1].dates, today),
      isPast(SESSIONS[2].dates, today),
    ]);
  }, []);

  const batchOver = done.every(Boolean);
  const reserve = batchOver ? RESERVE_OVER : RESERVE_LIMITED;

  return (
    <section id="saturdays" className="sat" aria-labelledby="saturdays-title">
      <div className="sat-inner">
        <Reveal>
          <SectionTab num="04" label="Saturdays" tone="butter" />
          <h2 id="saturdays-title" className="sat-title">
            <Accent>Saturdays</Accent> at NotePads
          </h2>
          <p className="sat-lede">{LEDE}</p>
        </Reveal>

        {/* The ONE elevated moment: taped paper memo card on the kraft board.
            Decor budget = its tape (motif 1) + ruled margin line (motif 2). */}
        <Reveal delay={0.06}>
          <aside className="sat-board" aria-label={BOARD_TITLE}>
            <span className="u-tape sat-board-tape" aria-hidden="true" />
            <span className="sat-board-line" aria-hidden="true" />
            <h3 className="sat-board-title">{BOARD_TITLE}</h3>
            <p className="sat-board-tag">{BOARD_TAGLINE}</p>
            <div className="sat-facts">
              {FACTS.map((f) => (
                <span key={f} className="sat-fact">
                  {f}
                </span>
              ))}
            </div>
          </aside>
        </Reveal>

        {/* Inclusions: row of paper chips (labels verbatim, doc §7; the drawn
            check is one consistent lucide glyph, not a unicode stand-in) */}
        <div className="sat-incl">
          <p className="sat-incl-label">{INCLUSIONS_HEADING}</p>
          <ul className="sat-incl-list">
            {INCLUSIONS.map((item) => (
              <li key={item} className="sat-incl-chip">
                <Check size={16} strokeWidth={3} aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* 3 session cards — differentiated by tone + drawn lucide icon AND
            by internal composition (three distinct scaffolds, not a row of
            identical icon+heading+text cards): */}
        <Reveal delay={0.12}>
          <ul className="sat-cards">
          {/* Art — vertical poster head: icon chip above the name */}
          <li className="sat-card sat-card-art">
            <span className="sat-ico" aria-hidden="true">
              <Palette size={24} strokeWidth={2.4} />
            </span>
            <h3 className="sat-name">{SESSIONS[0].name}</h3>
            <p className="sat-tag">{SESSIONS[0].tag}</p>
            <p className={`sat-dates${done[0] ? " is-past" : ""}`}>
              {done[0] && <Check size={16} strokeWidth={3} aria-hidden="true" />}
              {SESSIONS[0].dates}
            </p>
          </li>

          {/* Little Barista — mirrored head: name left, icon chip right,
              dates pinned in a dashed ticket-stub footer */}
          <li className="sat-card sat-card-barista">
            <div className="sat-barista-top">
              <h3 className="sat-name">{SESSIONS[1].name}</h3>
              <span className="sat-ico" aria-hidden="true">
                <Coffee size={24} strokeWidth={2.4} />
              </span>
            </div>
            <p className="sat-tag">{SESSIONS[1].tag}</p>
            <p className={`sat-dates sat-dates-stub${done[1] ? " is-past" : ""}`}>
              {done[1] && <Check size={16} strokeWidth={3} aria-hidden="true" />}
              {SESSIONS[1].dates}
            </p>
          </li>

          {/* Cookie Decor — flowing run-head: icon chip pinned top-right,
              name and tagline as tight separate elements (verbatim strings
              stay discrete — never fused into one sentence). Distinct
              scaffold on purpose. */}
          <li className="sat-card sat-card-cookie">
            <span className="sat-ico sat-ico-tip" aria-hidden="true">
              <Cookie size={24} strokeWidth={2.4} />
            </span>
            <h3 className="sat-poster">{SESSIONS[2].name}</h3>
            <p className="sat-tag">{SESSIONS[2].tag}</p>
            <p className={`sat-dates${done[2] ? " is-past" : ""}`}>
              {done[2] && <Check size={16} strokeWidth={3} aria-hidden="true" />}
              {SESSIONS[2].dates}
            </p>
          </li>
          </ul>
        </Reveal>

        {/* Pricing rows (dotted leaders, menu idiom — NOT a card row) side
            by side with the reserve panel on wide screens */}
        <Reveal delay={0.18}>
          <div className="sat-lower">
          <section className="sat-panel sat-panel-pricing" aria-labelledby="sat-pricing-h">
            <h4 id="sat-pricing-h" className="sat-panel-h">
              {PRICING_HEADING}
            </h4>
            <div className="sat-rows">
              {PRICES.map((r) => (
                <p key={r.pkg} className="sat-row">
                  <span className="sat-pkg">{r.pkg}</span>
                  <span className="sat-leader" aria-hidden="true" />
                  <span className="sat-price">{r.price}</span>
                  {r.save ? <span className="sat-save">{r.save}</span> : null}
                </p>
              ))}
            </div>
          </section>

          {/* Reserve panel — both copy variants wired; batch-over is the one
              that surfaces live today (after mount). aria-live announces the
              swap politely. */}
          <section
            className="sat-panel sat-panel-reserve sat-panel-in"
            aria-labelledby="sat-reserve-h"
          >
            <h4 id="sat-reserve-h" className="sat-panel-h">
              {RESERVE_TITLE}
            </h4>
            <p className="sat-reserve-body" aria-live="polite">
              {reserve}
            </p>
            <div className="sat-btns">
              {CONTACT_BTNS.map((b) => (
                <a
                  key={b.label}
                  className="btn btn-ghost"
                  href={b.href}
                  {...(b.href.startsWith("http")
                    ? { target: "_blank", rel: "noreferrer" }
                    : {})}
                >
                  {b.label}
                </a>
              ))}
            </div>
            <p className="sat-small">{SMALL_LINE}</p>
            <p className="sat-motto">{MOTTO}</p>
          </section>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
