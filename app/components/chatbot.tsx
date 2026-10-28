"use client";

// T12 — Notey chatbot (docs/task.md lines 139–144 + docs/ui_design.md §4 item 11,
// §5 motion, §6 a11y). Floating `.btn-blue` FAB + dismissible nudge + 380×600
// `--paper` panel with a rule-based intent engine (no LLM).
//
// Every reply is composed from docs/details.md facts only: §Site Identity table
// (hours/address/phones/socials), §4 lines 105–115 (₱350 package + premium),
// §7 (Saturday workshops), amenity cards, reviews, and the §11 intent table
// (lines 400–423). Menu prices come from the SHARED source menu.tsx TABS
// (the only menu.tsx edit: `export` keywords — no data duplicated, no refactors).
// Never-invent rule honored: payment / parking / delivery / dietary / pets get
// the "not posted online — message us" prompt from the intent table.
//
// Documented behavior decisions (T12 report):
//  • The FAB MORPHS into the close control while the panel is open — exactly
//    ONE close control, labels swap `Chat with Notey` ↔ `Close chat`
//    (aria-expanded + aria-controls on the same button; the focus-trap loop
//    contains the FAB, so Escape/keyboard exit is always reachable).
//  • Conversation lives in React memory only: closing the panel does NOT reset
//    it, a page reload does. No message persistence, ever.
//  • Nudge dismissal IS persisted (try/catch-guarded localStorage
//    `notey-nudge-dismissed` — storage failures never surface or block).
//  • Anchor action chips (#menu / #visit / #reviews / #saturdays) CLOSE the
//    chat: on mobile the near-fullscreen panel would hide the section being
//    scrolled to. tel: chips and external links keep the panel open.
//  • Events: opening the panel auto-focuses the input and auto-dismisses the
//    nudge (the "shown once" budget is spent).
import { MessageCircle, Send, X } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent as ReactKeyboardEvent } from "react";
import { TABS, type Group, type Row } from "./menu";
import "../chatbot.css";

/* ------------------------------- vocabulary -------------------------------- */

const GREETING =
  "Hi! I'm Notey ☕ — ask me anything about NotePads: menu prices, study rates, hours, directions or Saturday workshops.";
const BYE = "Bye for now! ☕ Come study, sip, and stay a while.";
const FALLBACK =
  "I didn't quite catch that — try one of the chips below, or ask me about the menu, hours, rates or Saturday workshops.";

const NUDGE_TEXT = "Questions? Ask Notey!";
const NUDGE_DISMISS = "Dismiss nudge";
const HEAD_NAME = "Notey";
const HEAD_SUB = "NotePads assistant";
const PANEL_LABEL = "Notey — NotePads assistant";
const LOG_LABEL = "Notey conversation";
const PLACEHOLDER = "Ask about the menu, hours, rates\u2026"; // verbatim §11 (…)
const SEND_LABEL = "Send message";
const NUDGE_KEY = "notey-nudge-dismissed";

const QUICK = [
  "Opening hours",
  "Study rates",
  "Show the menu",
  "Saturday workshops",
  "Where are you?",
];

/* -------------------------- action chips (§11 line 423) -------------------- */

const DIRS_URL =
  "https://www.google.com/maps/dir/?api=1&destination=Notepads+Cafe%2C+SDC+Building%2C+Guzman-Jesena+Street%2C+Mandurriao%2C+Iloilo+City";

type Chip = { label: string; href: string; external: boolean };

const CH = {
  menu: { label: "Open the menu book", href: "#menu", external: false },
  directions: { label: "Get directions", href: DIRS_URL, external: true },
  map: { label: "See the map", href: "#visit", external: false },
  call: { label: "Call us", href: "tel:+639565543184", external: false },
  wa: { label: "WhatsApp", href: "https://wa.me/639952293755", external: true },
  reserve: { label: "Call to reserve", href: "tel:+639177169035", external: false },
  ig: { label: "Instagram DM", href: "https://www.instagram.com/notepads.cafe/", external: true },
  fb: { label: "Facebook", href: "https://www.facebook.com/profile.php?id=61582392323170", external: true },
  msg: { label: "Message us", href: "https://wa.me/639952293755", external: true },
  reviews: { label: "Read the reviews", href: "#reviews", external: false },
  workshops: { label: "See the workshops", href: "#saturdays", external: false },
} satisfies Record<string, Chip>;

/* ---------------------------- composed answers ----------------------------- */

// --- hours (live status = hero's Asia/Manila clock pattern, computed at reply
// time on the client; SSR never evaluates it) ---
const HOURS_LINES =
  "Monday – Saturday: 7:00 AM – 10:00 PM\nSunday: 10:00 AM – 8:00 PM";

function manilaStatusLine(): string {
  try {
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
    if (!open) return "Closed right now (Mon–Sat 7 AM – 10 PM · Sun 10 AM – 8 PM).";
    return `Open now · until ${sun ? "8:00 PM" : "10:00 PM"}.`;
  } catch {
    // Timezone API unavailable → fall back to the full-hours line only.
    return "";
  }
}

function hoursReply(): string {
  const live = manilaStatusLine();
  return `Our hours:\n${HOURS_LINES}${live ? `\n${live}` : ""}\nHoliday hours are not posted online.`;
}

// --- Saturday batch logic: reimplemented locally (deliberately NOT imported
// from saturdays.tsx — no cross-island coupling), same Asia/Manila approach:
// the verdict is computed at reply time on the client, never at SSR. ---
const MANILA_TZ = "Asia/Manila";
const MONTH_NO: Record<string, number> = {
  Jan: 1, Feb: 2, Mar: 3, Apr: 4, May: 5, Jun: 6,
  Jul: 7, Aug: 8, Sep: 9, Oct: 10, Nov: 11, Dec: 12,
};

function manilaToday(): string {
  try {
    const parts = new Intl.DateTimeFormat("en-US", {
      timeZone: MANILA_TZ,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).formatToParts(new Date());
    const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "00";
    return `${get("year")}-${get("month")}-${get("day")}`;
  } catch {
    return ""; // unknown → never flip the batch (fail live, no invented past)
  }
}

// "Aug 22, 2026" → sortable "YYYY-MM-DD" key parsed from the verbatim string.
function lastDateKey(dates: string): string {
  const tail = dates.split(" & ").pop() ?? "";
  const m = /^([A-Z][a-z]{2}) (\d{1,2}), (\d{4})$/.exec(tail);
  if (!m) return "";
  return `${m[3]}-${String(MONTH_NO[m[1]] ?? 0).padStart(2, "0")}-${m[2].padStart(2, "0")}`;
}

// Strictly AFTER the last date (the final Saturday morning itself stays live).
function batchOver(dates: string[], today: string): boolean {
  if (today === "") return false;
  return dates.every((d) => lastDateKey(d) !== "" && today > lastDateKey(d));
}

const SAT_SESSIONS = [
  { name: "Art Workshop", tag: "Unleash creativity through colors & craft!", dates: "Aug 15 & Aug 22, 2026" },
  { name: "Little Barista", tag: "Learn basic coffee skills + make their own drinks!", dates: "Aug 29 & Sep 5, 2026" },
  { name: "Cookie Decor", tag: "Bake, design, and eat their yummy creations!", dates: "Sep 12 & Sep 19, 2026" },
];
const SAT_OVER =
  "The 2026 batch of sessions has wrapped up — message us for the next dates!\nSaturdays at NotePads: 9:00 – 11:00 AM · ages 6 – 10.";

function satReply(): string {
  const over = batchOver(SAT_SESSIONS.map((s) => s.dates), manilaToday());
  if (over) return SAT_OVER;
  return [
    "No Gadget Kids Workshops — Learn · Create · Imagine",
    "Saturdays · 9:00 – 11:00 AM · ages 6 – 10",
    ...SAT_SESSIONS.map((s) => `${s.name} — ${s.dates} — ${s.tag}`),
    "₱1,299 per workshop · includes Apron, ID, Materials, Snacks, Certificate",
    "Reserve early — limited slots!",
  ].join("\n");
}

const SAT_RESERVE =
  "Limited slots only! Saturdays only: message our FB/IG, call, or visit us to reserve.";
const SAT_RESERVE_OVER =
  "The 2026 batch of sessions has wrapped up — message us to ask about the next dates.";

// --- rates / package / amenities / contact ( §§Site Identity, 4, 7 ) ---
const RATES_TEXT =
  "Up to 2 hours of stay are free — Wi-Fi & charging included.\nBeyond that it's just ₱40 per hour.\nAsk me about the ₱350 Study Space package!";

const PACKAGE_TEXT =
  "Study Space package — ₱350 · single space · 2 hours of uninterrupted study time:\n1. One complimentary meal — pork or chicken adobo, embotido rice meal, or ham & cheese sandwich\n2. One free drink — signature hot chocolate, iced tea, cucumber lemonade, blue lemonade, or pink lychee\n3. Free access to our open pantry\n4. Complimentary Wi-Fi & free charging stations\n5. Free use of a laptop\n6. 2 hours of stay included\nExtra time: ₱40 per hour beyond the 2-hour stay. A Premium Space package exists — message us for details.";

const CONTACT_TEXT =
  "Call or text: 0956 554 3184\nWhatsApp: +63 995 229 3755 · Email: notepadscafe1109@gmail.com\nWorkshop line: 0917 716 9035 · 0995 229 3755";

const LOCATION_TEXT =
  "NotePads Cafe\n2/F SDC Building, Guzman–Jesena Street\nMandurriao, Iloilo City\nIt's on the 2nd floor of the SDC Building — look for the glowing NotePads Study Hub Café sign.";

const SOCIALS_TEXT =
  "Follow along for new drinks, events and cozy corners — @notepads.cafe on Instagram & TikTok, and NotePads Cafe on Facebook.";

const WIFI_TEXT = "Yes — complimentary Wi-Fi for every guest.";

const CHARGING_TEXT =
  "Yes — charging stations are free for everyone: plug in and stay as long as the work needs. If you work from home, we're a blackout-friendly study & work spot — the first 2 hours are on the house.";

const GAMES_TEXT = "Yes — board games and chess 🎲♟️. Unplug and play with friends or a date.";

const PANTRY_TEXT =
  "There's an open pantry & treats — complimentary snacks and a brain-boosting pantry for guests.";

const LAPTOP_TEXT = "Laptop-friendly — study & work stations, built for long sessions.";

const AIRCON_TEXT = "Climate controlled — a calm, air-conditioned space made for focus.";

const REVIEWS_TEXT = "All 5 reviews on our page are 5 stars ⭐ — hear from our customers on the page.";

const RECO_TEXT =
  "Customer favorites ✨\nSalted Caramel Latte — perfectly balanced, not too sweet (hot ₱120 · iced 12oz ₱129 · iced 16oz ₱149)\nLemon muffins & chocolate cheesecake\nAdobo rice meals\nSignature Chocolate";

const NOT_POSTED_TEXT =
  "That one isn't posted online — message us and we'll fill you in!";

const WORKSHOP_PRICES_TEXT =
  "Workshop pricing:\nPer workshop — ₱1,299\nAny 2 workshops — ₱2,298 · save ₱300\nAll 3 workshops — ₱3,497 · save ₱400";

/* ------------------------- menu data (shared TABS) -------------------------- */

const norm = (s: string): string =>
  s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

type Entry = { row: Row; group: Group; nn: string };

const ALL_ROWS: Entry[] = TABS.flatMap((tab) =>
  tab.groups.flatMap((group) => group.rows.map((row) => ({ row, group, nn: norm(row.name) })))
);

// dish/keyword → menu GROUP (finer grained than tabs; checked in order — the
// "iced tea"/"cheese sticks" style multi-words sit above their shorter rivals).
const GROUP_KEYS: Array<[string, RegExp]> = [
  ["Noodle Notes", /\b(ramen|noodles?|chicken noodles)\b/],
  ["Cram Crunchy Bites", /\b(bites|fries|lumpia|nuggets?|cheese sticks?|sausage)\b/],
  ["Pandesal Almusal", /\b(pandesal|almusal)\b/],
  ["Professor's Pot", /\b(pancit|molo|soup)\b/],
  ["Brain Fuel Pasta", /\b(pasta|spaghetti|carbonara)\b/],
  ["Brain Booster Sandwiches", /\b(sandwiches?|burger|tuna)\b/],
  ["Other Beverages", /\b(iced tea|lemonade|yakult|lychee|wintermelon|bottled water)\b/],
  ["Fruit Based Soda", /\b(sodas?|blueberry|strawberry soda|raspberry|green apple|grape)\b/],
  ["Frappuccino", /\b(frapp|frappe|frappuccino|peppermint)\b/],
  ["Cookies (by arabella)", /\b(cookies?|biscoff|chippers|velvet bites?|crunchies|bliss bites)\b/],
  ["Brownies & Blondies (by arabella)", /\b(brownies?|blondies?|choco chunkies|bars)\b/],
  ["Non-Coffee Based", /\b(tea|chocolate|signature choco|matcha latte)\b/],
  ["Coffee Based", /\b(coffees?|latte|mochas?|americano|cappuccino|espresso|macchiato|caramel|butterscotch|hazelnut|matcha|almond)\b/],
  ["Knowledge Bowl (Rice Meal)", /\b(rice|adobo|tocino|corned beef|corned|bangus|embutido|spam)\b/],
];

const MENU_OVERVIEW = `The menu book has these chapters:\n${TABS.map((t) => t.label).join(" · ")}\nTell me a category or dish and I'll share prices.`;
const STAR_NOTE = "\n* from our printed menu — please confirm the price with us.";

const isStar = (row: Row): boolean => Boolean(row.star) || Boolean(row.prices?.includes("*"));

function rowLine(e: Entry): string {
  const { row } = e;
  if (row.prices) {
    return `${row.name}: Hot ${row.prices[0]} · Iced 12oz ${row.prices[1]} · Iced 16oz ${row.prices[2]}${row.note ? ` (${row.note})` : ""}`;
  }
  return `${row.name}: ${row.price ?? ""}${row.note ? ` (${row.note})` : ""}${row.star ? " *" : ""}`;
}

function listReply(entries: Entry[], title: string): { text: string; chips: Chip[] } {
  const shown = entries.slice(0, 10); // cap: 10 items max per reply
  const rest = entries.length - shown.length;
  let text = shown.map(rowLine).join("\n");
  if (rest > 0) text += `\n…and ${rest} more — ask me a dish name for its exact price.`;
  if (shown.some((e) => isStar(e.row))) text += STAR_NOTE;
  return { text: `${title}\n${text}`, chips: [CH.menu] };
}

function dishReply(e: Entry): { text: string; chips: Chip[] } {
  const title = `${e.group.label}:`;
  if (e.group.cols === 3) {
    return { text: `${e.row.name}: Hot ${e.row.prices![0]} · Iced 12oz ${e.row.prices![1]} · Iced 16oz ${e.row.prices![2]}${isStar(e.row) ? STAR_NOTE : ""}`, chips: [CH.menu] };
  }
  return { text: `${title}\n${rowLine(e)}${isStar(e.row) ? STAR_NOTE : ""}`, chips: [CH.menu] };
}

/* ------------------------------ intent engine ------------------------------ */

type Reply = { text: string; chips?: Chip[]; keepChips?: boolean };

// First match wins, most specific first. Normalized matching: lowercase,
// accents + punctuation stripped (§ task brief), \b word bounds.
export function replyTo(textRaw: string): Reply {
  const t = norm(textRaw);

  // thanks / bye (§11 tail intents — caught first so "thanks for the menu" doesn't re-run the menu engine)
  if (/\b(thanks?|thank you|salamat|bye|goodbye)\b/.test(t)) return { text: BYE };

  // greeting → the intro again, with the quick chips still up
  if (/^(hi|hey|hello|yo|hola|kumusta|howdy|good (morning|afternoon|evening|day))\b/.test(t)) {
    return { text: GREETING, keepChips: true };
  }

  // workshop sub-intents (price / included / age / reserve / venue — §11) need workshop context
  if (/\b(workshops?|saturdays?|barista|cookie decor)\b/.test(t)) {
    if (/\b(age|ages|years old|years)\b/.test(t)) {
      return { text: "Kids workshops are for ages 6 – 10 years old, every Saturday 9:00 – 11:00 AM.", chips: [CH.workshops] };
    }
    if (/\b(includes?|included|apron|materials?|snacks?|certificate|id)\b/.test(t)) {
      return { text: "What's included: Apron · ID · Materials · Snacks · Certificate.", chips: [CH.workshops] };
    }
    if (/\b(venues?|bookings?|event|events|functions?)\b/.test(t)) {
      return { text: "The venue is open for bookings — good coffee, cozy space. Message us to arrange yours.", chips: [CH.msg] };
    }
    if (/\b(reserves?|reserved|reservations?|slots?|sign ?ups?|sign ?up|registers?|limited)\b/.test(t)) {
      const over = batchOver(SAT_SESSIONS.map((s) => s.dates), manilaToday());
      return { text: over ? `${SAT_RESERVE_OVER}\nMessage our FB/IG, call, or visit us.` : SAT_RESERVE, chips: [CH.reserve, CH.workshops] };
    }
    if (/\b(prices?|costs?|how much|pay|fees?|1,?299|2,?298|3,?497)\b/.test(t)) {
      return { text: WORKSHOP_PRICES_TEXT, chips: [CH.workshops] };
    }
    // generic Saturday → the full listing (or batch-over variant)
    return { text: satReply(), chips: [CH.workshops, CH.reserve] };
  }
  if (/\b(kids?|child|children)\b/.test(t)) {
    return { text: satReply(), chips: [CH.workshops, CH.reserve] };
  }

  // recommend (intent table: customer favorites)
  if (/\b(recommend|recommended|favorites?|favourites?|bestsellers?|best seller|must ?try|popular)\b/.test(t)) {
    return { text: RECO_TEXT, chips: [CH.reviews, CH.menu] };
  }

  // never-posted family (payment / parking / delivery / dietary / pets)
  if (/\b(payment|payments|pays?|cash|gcash|card|visa|parking|delivery|deliveries|deliver|dietary|diet|vegan|vegetarian|halal|allergies|allergy|pets?|dogs?|cats?)\b/.test(t)) {
    return { text: NOT_POSTED_TEXT, chips: [CH.msg, CH.call] };
  }

  // menu: dish-level full-name scan first (most specific, e.g. "salted caramel latte")
  const full = ALL_ROWS.filter((e) => e.nn.length >= 4 && t.includes(e.nn)).sort((a, b) => b.nn.length - a.nn.length);
  if (full[0]) return dishReply(full[0]);

  // menu: keyword → group
  for (const [label, rx] of GROUP_KEYS) {
    if (rx.test(t)) {
      const entries = ALL_ROWS.filter((e) => e.group.label === label);
      if (entries.length > 0) return listReply(entries, `${entries[0].group.label}:`);
    }
  }

  // menu: category chips (…) (generic menu overview last)
  if (/\b(menu|dishes?|meals?|foods?|drinks?|price list|categories?|category|eat|hungry|thirsty)\b/.test(t)) {
    return { text: MENU_OVERVIEW, chips: [CH.menu] };
  }

  // amenities (fine-grained singles)
  if (/\b(wifi|wi fi|internet|wi fi)\b/.test(t)) return { text: WIFI_TEXT };
  if (/\b(chargers?|charging|plug|plugs?|outlets?|sockets?|blackout|brownout)\b/.test(t)) return { text: CHARGING_TEXT };
  if (/\b(games?|chess|board games?)\b/.test(t)) return { text: GAMES_TEXT };
  if (/\b(pantry|snacks?)\b/.test(t)) return { text: PANTRY_TEXT };
  if (/\b(laptops?|computer|stations?)\b/.test(t)) return { text: LAPTOP_TEXT };
  if (/\b(aircon|air\s?con|conditioning|climate|hot inside|warm inside)\b/.test(t)) return { text: AIRCON_TEXT };
  if (/\b(reviews?|ratings?|stars?|testimonials?)\b/.test(t)) return { text: REVIEWS_TEXT, chips: [CH.reviews] };

  // package (₱350 / premium)
  if (/\b(350|packages?|premium|study space)\b/.test(t)) {
    return { text: PACKAGE_TEXT, chips: [CH.msg] };
  }

  // rates — BEFORE hours so "price per hour" / "2 hours" / "40" rate-talk wins
  if (/\b(rates?|fees?|per hour|hourly|40|2 hours|study time)\b/.test(t)) {
    return { text: RATES_TEXT };
  }

  // hours — full lines + live status (computed in Asia/Manila on the client)
  if (/\b(hours?|opens?|opening|closes?|closing|closed|times?|schedule|today|now)\b/.test(t)) {
    return { text: hoursReply() };
  }

  // location
  if (/\b(where|address|located?|located|locations?|maps?|directions|find you|finds?|mandurriao|guzman|sdc|2nd floor)\b/.test(t)) {
    return { text: LOCATION_TEXT, chips: [CH.directions, CH.map] };
  }

  // contact, then socials
  if (/\b(contact|phones?|call|calls?|text|texted|messages?|messages us|email|whatsapp|number|dial)\b/.test(t)) {
    return { text: CONTACT_TEXT, chips: [CH.call, CH.wa] };
  }
  if (/\b(instagram|insta|facebook|tiktok|socials?)\b/.test(t)) {
    return { text: SOCIALS_TEXT, chips: [CH.ig, CH.fb] };
  }

  // fallback — gentle, no invented promises; the quick chips stay visible
  return { text: FALLBACK, keepChips: true };
}

/* -------------------------------- the island ------------------------------- */

type Msg = { id: number; role: "bot" | "user"; text: string; chips?: Chip[] };

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [nudge, setNudge] = useState(false);
  const [keepChips, setKeepChips] = useState(true);
  const [msgs, setMsgs] = useState<Msg[]>([{ id: 0, role: "bot", text: GREETING }]);
  const [typing, setTyping] = useState(false);
  const [value, setValue] = useState("");

  const rootRef = useRef<HTMLDivElement>(null);
  const fabRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const idRef = useRef(1);
  const timerRef = useRef(0);

  // Nudge: once, ~3.5s after load, never popped when already dismissed.
  // localStorage reads/writes are try/catch-guarded — private-mode storage
  // failures never break the widget.
  useEffect(() => {
    let dismissed = false;
    try {
      dismissed = window.localStorage.getItem(NUDGE_KEY) === "1";
    } catch {
      dismissed = false; // storage unavailable — nudge simply shows once
    }
    if (dismissed) return;
    const timer = window.setTimeout(() => setNudge(true), 3500);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  // Auto-scroll to the newest message; instant jump (no smooth) = reduced-
  // motion safe by construction.
  useEffect(() => {
    const log = logRef.current;
    if (log && open) log.scrollTop = log.scrollHeight;
  }, [msgs, typing, open]);

  useEffect(() => () => window.clearTimeout(timerRef.current), []);

  const spendNudge = () => {
    setNudge(false);
    try {
      window.localStorage.setItem(NUDGE_KEY, "1");
    } catch {
      /* storage unavailable — dismissal is memory-only this visit */
    }
  };

  const openPanel = () => {
    spendNudge();
    setOpen(true);
  };

  const closePanel = () => {
    setOpen(false);
    fabRef.current?.focus(); // Escape/focus return target = the FAB
  };

  const ask = (raw: string) => {
    const text = raw.trim();
    if (!text || typing) return;
    setMsgs((m) => [...m, { id: idRef.current++, role: "user", text }]);
    setValue("");
    setKeepChips(false);
    setTyping(true);
    // typing-dots pause 500–800ms (§ task brief); reply then lands.
    timerRef.current = window.setTimeout(() => {
      const reply = replyTo(text);
      setMsgs((m) => [...m, { id: idRef.current++, role: "bot", text: reply.text, chips: reply.chips }]);
      setKeepChips(Boolean(reply.keepChips));
      setTyping(false);
    }, 620);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    ask(value);
  };

  const onKey = (e: ReactKeyboardEvent<HTMLDivElement>) => {
    if (!open) return;
    if (e.key === "Escape") {
      e.preventDefault();
      closePanel();
      return;
    }
    if (e.key !== "Tab") return;
    // Focus trap across the open panel + the morphed close FAB.
    const els = Array.from(
      rootRef.current?.querySelectorAll<HTMLElement>("a[href], button:not([disabled]):not([hidden]), input") ?? []
    ).filter((el) => el.offsetParent !== null);
    if (els.length === 0) return;
    const first = els[0];
    const last = els[els.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  return (
    <div className="nt-root" ref={rootRef} onKeyDown={onKey}>
      {/* Nudge — desktop only (CSS), once, dismissible; text is a real button that opens the chat */}
      <div className="nt-nudge" hidden={!nudge}>
        <button type="button" className="nt-nudge-q" onClick={openPanel}>
          {NUDGE_TEXT}
        </button>
        <button type="button" className="nt-nudge-x" aria-label={NUDGE_DISMISS} onClick={spendNudge}>
          <X size={16} aria-hidden="true" />
        </button>
      </div>

      {/* Panel — always mounted (SSR'd), hidden while closed; history stays in
          React memory, so closing ≠ resetting. */}
      <div className="nt-panel" id="notey-panel" role="dialog" aria-label={PANEL_LABEL} hidden={!open}>
        <header className="nt-head">
          <span className="nt-head-ava" aria-hidden="true">
            <MessageCircle size={18} strokeWidth={2.4} />
          </span>
          <div className="nt-head-copy">
            <h2 className="nt-name">{HEAD_NAME}</h2>
            <p className="nt-sub">{HEAD_SUB}</p>
          </div>
        </header>

        <div className="nt-log u-dotgrid" role="log" aria-live="polite" aria-label={LOG_LABEL} ref={logRef}>
          {msgs.map((m) => (
            <div key={m.id} className={`nt-msg is-${m.role}`}>
              {m.role === "bot" && (
                <span className="nt-ava" aria-hidden="true">
                  <MessageCircle size={15} strokeWidth={2.4} />
                </span>
              )}
              <div className="nt-bubble">
                <span className="nt-bubble-text">{m.text}</span>
                {m.role === "bot" && m.chips && m.chips.length > 0 && (
                  <span className="nt-chips">
                    {m.chips.map((c) => (
                      <a
                        key={c.label}
                        className="nt-chip"
                        href={c.href}
                        {...(c.external ? { target: "_blank", rel: "noreferrer" } : {})}
                        {...(!c.external && c.href.startsWith("#")
                          ? { onClick: () => setOpen(false) }
                          : {})}
                      >
                        {c.label}
                      </a>
                    ))}
                  </span>
                )}
              </div>
            </div>
          ))}
          {typing && (
            <div className="nt-msg is-bot">
              <span className="nt-ava" aria-hidden="true">
                <MessageCircle size={15} strokeWidth={2.4} />
              </span>
              <span className="nt-typing" aria-hidden="true">
                <i className="nt-dot" />
                <i className="nt-dot" />
                <i className="nt-dot" />
              </span>
            </div>
          )}
        </div>

        <div className="nt-composer">
          <div className="nt-quick" hidden={!keepChips}>
            {QUICK.map((q) => (
              <button key={q} type="button" className="nt-chip" onClick={() => ask(q)}>
                {q}
              </button>
            ))}
          </div>
          <form className="nt-row" onSubmit={onSubmit}>
            <input
              ref={inputRef}
              className="nt-input"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder={PLACEHOLDER}
              aria-label={PLACEHOLDER}
              autoComplete="off"
            />
            <button type="submit" className="nt-send" aria-label={SEND_LABEL} disabled={!value.trim()}>
              <Send size={19} aria-hidden="true" />
            </button>
          </form>
        </div>
      </div>

      {/* FAB / close control — one button, labels swap per state (§11) */}
      <button
        ref={fabRef}
        type="button"
        className="btn btn-blue nt-fab"
        aria-expanded={open}
        aria-controls="notey-panel"
        aria-label={open ? "Close chat" : "Chat with Notey"}
        onClick={open ? closePanel : openPanel}
      >
        {open ? <X size={24} aria-hidden="true" /> : <MessageCircle size={26} aria-hidden="true" />}
      </button>
    </div>
  );
}
