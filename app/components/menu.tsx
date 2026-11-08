"use client";

// T6 — Menu (tabbed chapters). Client island: the tab list needs state.
// All copy verbatim from docs/details.md §5 (14 datasets intact) and §4
// lines 105–107 (₱350 Study Space Package). Strings kept as constants
// outside JSX so ₱ / — / apostrophes survive untouched.
import {
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import {
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  Coffee,
  Croissant,
  CupSoda,
  GlassWater,
  Sandwich,
  Soup,
  Utensils,
  type LucideIcon,
} from "lucide-react";
import Accent from "./accent";
import Reveal from "./reveal";
import SectionTab from "./section-tab";
import "../menu.css";

// v4 copy (T17 craft pass): headline/lede rewritten warm + cozy
// (ui_design.md §4.5); every dish name, price, note and dataset name stays
// verbatim from docs/details.md §5. The ₱350 study-space ticket was REMOVED
// from this section (it duplicated the About boarding-pass ticket). The book
// is now a paginated chapter book: navy cover, two-page spread, "Also in
// this chapter" overflow panel, chapter pagination below.
const LEDE =
  "Rice bowls, crunchy bites, pasta, noodles and fresh-brewed coffee — flip through, find your favorite, and settle in.";
const FOOTNOTE = "from our printed menu — please confirm the price with us.";

// Row/Group/Tab + TABS are exported (T12) so the Notey chatbot can compose
// category/price answers from this single source — no menu data duplicated.
export type Row = {
  name: string;
  // single-price rows
  price?: string;
  // three-column rows: [hot, iced 12oz, iced 16oz]; "—" = not offered, "*" = printed-menu flag
  prices?: [string, string, string];
  note?: string;
  desc?: string;
  star?: boolean;
};

export type Group = {
  label: string; // dataset pun name, kept visible
  cols?: 3; // hot / 12oz / 16oz price columns
  rows: Row[];
};

export type Tab = {
  id: string;
  label: string;
  groups: Group[];
  // two named chapters share one spread: the right page restarts at the
  // group `startsAt` under its own heading (`label`). Presentation only —
  // `groups` stays the flat category list the Notey chatbot composes from.
  rightPage?: { label: string; startsAt: string };
};

export const TABS: Tab[] = [
  {
    id: "rice",
    label: "Rice Meals",
    groups: [
      {
        label: "Knowledge Bowl (Rice Meal)",
        rows: [
          {
            name: "Pork Adobo",
            note: "rice topping",
            price: "₱179",
            desc: "Tender pork simmered in soy sauce, vinegar, garlic, and bay leaves. Savory, tangy, just a bit sweet — with hot steamed rice.",
          },
          {
            name: "Chicken Adobo",
            note: "rice meal",
            price: "₱159",
            desc: "Juicy chicken simmered in soy sauce, vinegar, and garlic. Served with a generous serving of rice.",
          },
          {
            name: "Spam & Egg",
            note: "rice bowl",
            price: "₱199",
            desc: "Crispy Spam slices and fried egg on warm steamed rice.",
          },
          {
            name: "Embutido & Egg",
            note: "rice bowl",
            price: "₱179",
            desc: "Homemade embutido with hot steamed rice and a sunny-side-up egg.",
          },
          {
            name: "Bacon & Egg",
            note: "rice meal",
            price: "₱199",
            desc: "Crispy bacon, fried egg, and hot steamed rice.",
          },
          {
            name: "Corned Beef & Egg",
            note: "rice meal",
            price: "₱199",
            desc: "Sautéed corned beef with onions, fried egg, and hot steamed rice.",
          },
          {
            name: "Creamy Bakareta",
            note: "rice meal",
            price: "₱189",
            star: true,
            desc: "Slow-cooked beef in a creamy, savory tomato sauce with vegetables, over hot steamed rice.",
          },
          {
            name: "Chicken Fillet",
            note: "rice meal",
            price: "₱179",
            desc: "Tender chicken fillet lightly breaded and fried, served with rice.",
          },
          {
            name: "Fried Chicken",
            note: "rice meal",
            price: "₱119 (1 pc) / ₱199 (2 pc)",
            desc: "Crispy fried chicken with hot steamed rice and gravy.",
          },
          { name: "Fish Fillet & Egg", note: "rice meal", price: "₱179" },
          { name: "Bangus Ala NotePads", note: "rice meal", price: "₱189" },
          { name: "Chorizo & Egg", note: "rice meal", price: "₱199" },
          { name: "Tocino & Egg", note: "rice meal", price: "₱199" },
        ],
      },
    ],
  },
  {
    id: "bites",
    label: "Bites & Noodles",
    rightPage: { label: "Morning & fils", startsAt: "Professor's Pot" },
    groups: [
      {
        label: "Cram Crunchy Bites",
        rows: [
          { name: "Lumpia (5 pcs)", price: "₱70" },
          { name: "French Fries", price: "₱75" },
          { name: "Cheese Sticks", price: "₱90" },
          { name: "Chicken Fillet Bites", price: "₱99" },
          { name: "Chicken Nuggets (6 pcs)", price: "₱109" },
          { name: "New York Frank Sausage & Fries", price: "₱189" },
        ],
      },
      {
        label: "Noodle Notes",
        rows: [
          {
            name: "Korean Ramen",
            price: "₱139",
            star: true,
            note: "Flavors: Spicy · Mild · Hot Beef · Cheesy · Cheesy Spicy",
          },
          { name: "Chicken Noodles", price: "₱89", star: true },
        ],
      },
      // Morning & fils merged into this chapter (few rows on their own) —
      // group labels and items stay verbatim from docs/details.md §5
      {
        label: "Professor's Pot",
        rows: [
          {
            name: "Pancit Molo Soup (sharing)",
            price: "₱149",
            desc: "Handmade dumplings filled with seasoned pork, in a light and savory broth.",
          },
        ],
      },
      {
        label: "Pandesal Almusal",
        rows: [
          { name: "Bacon & Egg", price: "₱109" },
          { name: "Ham & Egg", price: "₱100" },
          { name: "Corned Beef & Egg", price: "₱109" },
          { name: "Spam & Egg", price: "₱100" },
        ],
      },
    ],
  },
  {
    id: "pasta",
    label: "Pasta & Sandwiches",
    groups: [
      {
        label: "Brain Fuel Pasta",
        rows: [
          {
            name: "Spaghetti Scarlatto",
            price: "₱189",
            desc: "Spaghetti with hearty red tomato sauce, garlic, and ground meat. Best with garlic bread.",
          },
          {
            name: "Creamy Bacon Carbonara",
            price: "₱189",
            desc: "Pasta in a light, creamy sauce with smoky bacon and parmesan.",
          },
        ],
      },
      {
        label: "Brain Booster Sandwiches",
        rows: [
          {
            name: "Club Sandwich",
            price: "₱199",
            desc: "Grilled chicken, smoky bacon, crisp greens, juicy tomatoes on toasted whole wheat bread, light mayo. Side of house fries or salad.",
          },
          {
            name: "Ham & Cheese Sandwich",
            price: "₱149",
            desc: "Smoked ham and creamy cheese grilled between buttered bread.",
          },
          {
            name: "Bacon & Egg Sandwich",
            price: "₱149",
            desc: "Freshly cracked egg, crispy bacon, and light mayo on toasted bread.",
          },
          { name: "Crunchy Chicken Burger", price: "₱129" },
          { name: "Tuna Gourmet Sandwich", price: "₱179" },
        ],
      },
    ],
  },
  {
    id: "coffee",
    label: "Coffee",
    groups: [
      {
        label: "Coffee Based",
        cols: 3,
        rows: [
          { name: "Americano", prices: ["₱110", "₱109", "₱129"] },
          { name: "Café Latte", prices: ["₱120", "₱129", "₱149"] },
          { name: "Cappuccino", prices: ["₱120", "₱129", "₱149"] },
          { name: "Vanilla Latte", prices: ["₱120", "₱129", "₱149"] },
          { name: "Café Mocha", prices: ["₱120", "₱129", "₱149"] },
          { name: "Caramel Latte", prices: ["₱120", "₱129", "₱149"] },
          { name: "White Mocha Latte", prices: ["₱120", "₱129", "₱149"] },
          { name: "Roasted Almond Latte", prices: ["₱120", "₱129", "*"] },
          { name: "Salted Caramel Latte", prices: ["₱120", "₱129", "₱149"] },
          { name: "Butterscotch Latte", prices: ["₱120", "₱129", "₱149"] },
          { name: "Hazelnut Latte", prices: ["₱120", "₱129", "₱149"] },
          { name: "Hazelnut Mocha Latte", prices: ["₱120", "₱129", "₱149"] },
          { name: "Spanish Latte", prices: ["₱120", "₱129", "₱149"] },
          { name: "Caramel Macchiato", prices: ["₱120", "₱129", "₱149"] },
          { name: "Dirty Matcha Latte", prices: ["₱140", "₱149", "₱159"] },
          { name: "Strawberry Mocha", prices: ["₱130", "₱139", "₱159"] },
          { name: "Strawberry White Mocha", prices: ["₱130", "₱139", "₱159"] },
          { name: "Henny Strawberry Latte", prices: ["—", "₱129", "—"] },
          { name: "Gingerbread Latte (seasonal)", prices: ["₱130", "₱139", "₱159"] },
        ],
      },
    ],
  },
  {
    id: "noncoffee",
    label: "Non-Coffee & Frappe",
    groups: [
      {
        label: "Non-Coffee Based",
        cols: 3,
        rows: [
          { name: "Flower Tea", prices: ["₱80", "₱80", "—"] },
          { name: "Green Tea", prices: ["₱80", "₱89", "₱109"] },
          { name: "Signature Chocolate", prices: ["₱100", "₱110", "₱129"] },
          { name: "Strawberry Latte", prices: ["₱120", "₱129", "₱149"] },
          { name: "Strawberry Choco Latte", prices: ["₱130", "₱139", "₱159"] },
          { name: "Strawberry Matcha Latte", prices: ["₱120", "₱139", "₱159"] },
          { name: "Green Matcha Latte", prices: ["₱130", "₱139", "₱159"] },
        ],
      },
      {
        label: "Frappuccino",
        rows: [
          { name: "Caramel Macchiato", price: "₱169" },
          { name: "Peppermint Mocha", price: "₱169" },
          { name: "Mocha Hazelnut", price: "₱169" },
        ],
      },
    ],
  },
  {
    id: "sodas",
    label: "Sodas",
    groups: [
      {
        label: "Fruit Based Soda",
        rows: [
          { name: "Blueberry", price: "₱90" },
          { name: "Strawberry", price: "₱90" },
          { name: "Raspberry", price: "₱90" },
          { name: "Green Apple", price: "₱90" },
          { name: "Grape", price: "₱90" },
          { name: "Wintermelon", price: "₱110" },
        ],
      },
      {
        label: "Other Beverages",
        rows: [
          { name: "Soda in Can", price: "₱69", star: true },
          { name: "Blue Lemonade", price: "₱70", star: true },
          { name: "Iced Tea", price: "₱70", star: true },
          { name: "Pink Lychee", price: "₱70", star: true },
          { name: "Cucumber Lemonade", price: "₱70", star: true },
          { name: "Yakult", price: "₱20", star: true },
          { name: "Bottled Water", price: "₱20", star: true },
        ],
      },
    ],
  },
  {
    id: "baked",
    label: "Baked Goods",
    groups: [
      {
        label: "Cookies (by arabella)",
        rows: [
          { name: "Cookie Butter Treats (Biscoff cookies)", price: "₱115", star: true },
          { name: "Classic Chippers (chocolate chip)", price: "₱85", star: true },
          { name: "Velvet Bites (red velvet)", price: "₱115", star: true },
          { name: "Banana Chip Crunchies", price: "₱90", star: true },
          { name: "Matcha Munchies", price: "₱110", star: true },
          { name: "Oreo Bliss Bites (cookies & cream)", price: "₱125", star: true },
          { name: "Assorted Cookies (5 pieces)", price: "₱400", star: true },
        ],
      },
      {
        label: "Brownies & Blondies (by arabella)",
        rows: [
          { name: "Biscoff Bars", price: "₱120", star: true, note: "box of 9: ₱475" },
          { name: "Choco Chunkies (chocolate brownies)", price: "₱105", star: true, note: "box of 9: ₱425" },
        ],
      },
    ],
  },
];

// Tab-strip view: a chapter with a rightPage gets a second tag that opens
// the same spread — the right page carries that chapter's own title.
const VIEW_TABS = TABS.flatMap((t) => [
  { chapter: t.id, label: t.label },
  ...(t.rightPage ? [{ chapter: t.id, label: t.rightPage.label }] : []),
]);

// Chapter spread split: deterministic, no measuring — rows are weighted by
// rough height (a described row takes ~2× a plain one; a group label ~1) and
// packed left page first, then right page; overflow lands in the "Also in
// this chapter" panel. Chapters that fit the spread split ~in half so both
// pages feel inhabited; overflowing chapters pack to fixed page budgets.
const LEFT_WEIGHT = 10;
const SPREAD_WEIGHT = 19;

type Seg = { group: Group; rows: Row[]; head: boolean };

function rowWeight(row: Row): number {
  return row.note || row.desc ? 2 : 1;
}

function splitChapter(chapter: Tab): [Seg[], Seg[], Seg[]] {
  const solo = chapter.groups.length === 1;

  // Two named chapters on one spread: the right page restarts at the
  // boundary group with its own heading — no flowing across the gutter.
  if (chapter.rightPage) {
    const at = chapter.groups.findIndex((g) => g.label === chapter.rightPage!.startsAt);
    const leftGroups = at > 0 ? chapter.groups.slice(0, at) : chapter.groups.slice(0, 1);
    const rightGroups = at > 0 ? chapter.groups.slice(at) : [];
    const seg = (group: Group): Seg => ({ group, rows: group.rows, head: true });
    return [
      leftGroups.map(seg),
      rightGroups.map(seg),
      [],
    ];
  }

  let total = chapter.groups.length;
  for (const group of chapter.groups) {
    for (const row of group.rows) total += rowWeight(row);
  }
  // fits both pages? balance them ~in half; otherwise pack to the budgets
  const fits = total <= SPREAD_WEIGHT + 1;
  const leftCap = fits ? Math.ceil(total / 2) : LEFT_WEIGHT;
  const spreadCap = fits ? total : SPREAD_WEIGHT;

  const pages: Seg[][] = [[], [], []];
  let n = 0;
  for (const group of chapter.groups) {
    for (let start = 0; start < group.rows.length; ) {
      const head = start === 0;
      // the group label renders on the head segment only for multi-group
      // chapters (solo chapters' title already carries it); a 3-price group
      // renders its column headers there instead
      const headBonus = head ? (solo ? (group.cols === 3 ? 1 : 0) : 1) : 0;
      const w = rowWeight(group.rows[start]) + headBonus;
      const p = n < leftCap ? 0 : n < spreadCap ? 1 : 2;
      const cap = p === 0 ? leftCap : p === 1 ? spreadCap : Infinity;
      // first row of a page always places (a page never stays empty because
      // its budget is spent) — later rows stop at the cap
      if (p < 2 && n > 0 && n + w > cap) {
        n = cap;
        continue;
      }
      let take = 0;
      while (start + take < group.rows.length) {
        const rw =
          rowWeight(group.rows[start + take]) + (take === 0 ? headBonus : 0);
        if (n + rw > cap && p < 2) break;
        take += 1;
        n += rw;
      }
      pages[p].push({ group, rows: group.rows.slice(start, start + take), head });
      start += take;
    }
  }
  return [pages[0], pages[1], pages[2]];
}

// one garnish per chapter: icon coin, ≤2° tilt
const CHAPTER_ICONS: Record<string, LucideIcon> = {
  rice: Soup,
  bites: Utensils,
  pasta: Sandwich,
  coffee: Coffee,
  noncoffee: CupSoda,
  sodas: GlassWater,
  baked: Croissant,
};

function Star() {
  return (
    <abbr className="menu-star" title={`* ${FOOTNOTE}`}>
      *
    </abbr>
  );
}

function PriceCell({ v }: { v: string }) {
  if (v === "—") return <span className="menu-none">—</span>;
  if (v === "*") return <Star />;
  return <span className="menu-p">{v}</span>;
}

function MenuRow({
  row,
  cols,
  wide,
}: {
  row: Row;
  cols?: 3;
  // extra-long single-price strings (e.g. "₱119 (1 pc) / ₱199 (2 pc)") get a
  // full-width row inside the compact Also panel so the name never crushes
  wide?: boolean;
}) {
  const meta =
    row.note && row.desc
      ? `${row.note} · ${row.desc}`
      : row.note ?? row.desc ?? null;
  return (
    // T17 — row wrapper = one hoverable unit (honey wash + name→blue);
    // the outer .menu-list is a vertical stack of these. 3-price rows
    // (Hot / Iced 12oz / Iced 16oz) need the is-cols template on the row.
    <div
      className={`menu-row${cols === 3 ? " is-cols" : ""}${wide ? " is-wide" : ""}`}
    >
      <div className="menu-n">
        <span className="menu-nline">
          <span className="menu-name">{row.name}</span>
          <span className="menu-leader" aria-hidden="true" />
        </span>
        {meta && <span className="menu-meta">{meta}</span>}
      </div>
      {cols === 3 ? (
        <>
          <span className="menu-pc">
            <PriceCell v={row.prices![0]} />
          </span>
          <span className="menu-pc">
            <PriceCell v={row.prices![1]} />
          </span>
          <span className="menu-pc">
            <PriceCell v={row.prices![2]} />
          </span>
        </>
      ) : (
        <span className="menu-pc">
          <span className="menu-p">{row.price}</span>
          {row.star && <Star />}
        </span>
      )}
    </div>
  );
}

// One page segment: the slice of a group's rows that lands on this page.
// The group label + 3-price column headers render only on the segment where
// the group starts ("head"), so headers stay on the page a group begins on.
// Single-group chapters skip the label — the chapter title already is it.
function MenuPageSegs({ segs, from, solo }: { segs: Seg[]; from: number; solo?: boolean }) {
  return (
    <>
      {segs.map((seg, i) => (
        <div
          className="menu-group"
          style={{ "--i": Math.min(from + i, 3) } as CSSProperties}
          key={seg.group.label}
        >
          {seg.head && !solo && <h4 className="menu-label">{seg.group.label}</h4>}
          <div className="menu-list">
            {seg.head && seg.group.cols === 3 && (
              <div className="menu-row is-colsh is-cols" aria-hidden="true">
                <span className="menu-colsh is-blank">{"\u00a0"}</span>
                <span className="menu-colsh">Hot</span>
                <span className="menu-colsh">Iced 12oz</span>
                <span className="menu-colsh">Iced 16oz</span>
              </div>
            )}
            {seg.rows.map((row) => (
              <MenuRow key={row.name} row={row} cols={seg.group.cols} />
            ))}
          </div>
        </div>
      ))}
    </>
  );
}

function MenuAlso({
  segs,
  expanded,
  onToggle,
  i,
}: {
  segs: Seg[];
  expanded: boolean;
  onToggle: () => void;
  i: number;
}) {
  const count = segs.reduce((n, s) => n + s.rows.length, 0);
  return (
    <aside
      className={`menu-also${expanded ? " is-open" : ""}`}
      style={{ "--i": Math.min(i, 3) } as CSSProperties}
    >
      {/* desktop: plain header (list is always visible); ≤900px: real
          expander button — a focusable no-op control would be a dead end */}
      <span className="menu-also-static">Also in this chapter</span>
      <button
        type="button"
        className="menu-also-head"
        aria-expanded={expanded}
        onClick={onToggle}
      >
        <span className="menu-also-title">Also in this chapter</span>
        <span className="menu-also-hint">
          {expanded ? "Show less" : `Show ${count} more`}
        </span>
        <ChevronDown size={16} strokeWidth={2.5} aria-hidden="true" className="menu-also-chev" />
      </button>
      <div className="menu-also-list">
        {segs.map((seg) =>
          seg.rows.map((row) => (
            <MenuRow
              key={row.name}
              row={row}
              cols={seg.group.cols}
              wide={(row.price?.length ?? 0) > 12}
            />
          ))
        )}
      </div>
    </aside>
  );
}

export default function Menu() {
  const [active, setActive] = useState("rice");
  const [expanded, setExpanded] = useState(false);
  const [bookH, setBookH] = useState<number | null>(null);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const panelRefs = useRef<Array<HTMLDivElement | null>>([]);

  // The book frame is sized to the TALLEST chapter's real rendered spread, so
  // every chapter fits without scrolling and the book never changes size.
  // Inactive panels stay in the layout (visibility:hidden) to be measurable.
  useLayoutEffect(() => {
    const measure = () => {
      const spreads = panelRefs.current
        .map((p) => p?.querySelector<HTMLElement>(".menu-spread"))
        .filter((s): s is HTMLElement => !!s);
      if (!spreads.length) return;
      const prev = spreads.map((s) => s.style.height);
      spreads.forEach((s) => {
        s.style.height = "auto";
      });
      const h = Math.max(...spreads.map((s) => s.offsetHeight));
      spreads.forEach((s, i) => {
        s.style.height = prev[i] ?? "";
      });
      setBookH((cur) => (cur === h ? cur : h));
    };
    measure();
    document.fonts?.ready.then(measure).catch(() => {});
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const idx = TABS.findIndex((t) => t.id === active);
  const prev = idx > 0 ? TABS[idx - 1] : null;
  const next = idx < TABS.length - 1 ? TABS[idx + 1] : null;

  // One switch path for tabs / Previous / Next; ≤900px also pulls the
  // active tab into view (the strip scrolls horizontally there).
  const go = (id: string) => {
    setActive(id);
    setExpanded(false);
    if (window.matchMedia("(max-width: 900px)").matches) {
      tabRefs.current[VIEW_TABS.findIndex((v) => v.chapter === id)]?.scrollIntoView({
        inline: "nearest",
        block: "nearest",
      });
    }
  };

  const onKeyDown = (e: ReactKeyboardEvent<HTMLDivElement>) => {
    const n = VIEW_TABS.length;
    const i = VIEW_TABS.findIndex((v) => v.chapter === active);
    let nextIdx = -1;
    if (e.key === "ArrowRight") nextIdx = (i + 1) % n;
    else if (e.key === "ArrowLeft") nextIdx = (i - 1 + n) % n;
    else if (e.key === "Home") nextIdx = 0;
    else if (e.key === "End") nextIdx = n - 1;
    if (nextIdx < 0) return;
    e.preventDefault();
    go(VIEW_TABS[nextIdx].chapter);
    tabRefs.current[nextIdx]?.focus();
  };

  return (
    <section id="menu" className="menu" aria-labelledby="menu-title">
      <div className="menu-inner">
        <Reveal>
          {/* T17/M9 — one-column header, no ₱350 ticket (removed — it
              duplicated the About boarding-pass ticket). */}
          <header className="menu-head">
            <SectionTab num="02" label="Menu" tone="peach" />
            <h2 id="menu-title" className="menu-title">
              There&rsquo;s a <Accent>chapter</Accent> for every craving
            </h2>
            <p className="menu-lede">{LEDE}</p>
          </header>
        </Reveal>

        {/* T13 — ONE Reveal over the whole menu-main stack (tabs + panels +
            controls + footnote come in together). */}
        <Reveal delay={0.06}>
          <div className="menu-main">
            {/* Chapter book: detached tab strip above an open two-page
                spread on the warm ground (no cover); tabs/panels keep the
                panel ARIA/keyboard untouched. */}
            <div className="menu-bookwrap">
              <div
                className="menu-tabs"
                role="tablist"
                aria-label="Menu chapters"
                onKeyDown={onKeyDown}
              >
                {VIEW_TABS.map((v, i) => (
                  <button
                    key={`${v.chapter}:${v.label}`}
                    ref={(el) => {
                      tabRefs.current[i] = el;
                    }}
                    id={`menu-tab-${i}`}
                    suppressHydrationWarning
                    className="menu-tab"
                    role="tab"
                    aria-selected={active === v.chapter}
                    aria-controls={`menu-panel-${v.chapter}`}
                    tabIndex={active === v.chapter ? 0 : -1}
                    onClick={() => go(v.chapter)}
                  >
                    {v.label}
                  </button>
                ))}
              </div>

              <div className="menu-book" style={bookH ? ({ "--book-h": `${bookH}px` } as CSSProperties) : undefined}>
                <span className="menu-ribbon" aria-hidden="true" />
                {TABS.map((t, ti) => {
                  const [left, right, also] = splitChapter(t);
                  const Icon = CHAPTER_ICONS[t.id] ?? Utensils;
                  const title = t.groups.length === 1 ? t.groups[0].label : t.label;
                  return (
                    <div
                      key={t.id}
                      ref={(el) => {
                        panelRefs.current[ti] = el;
                      }}
                      id={`menu-panel-${t.id}`}
                      role="tabpanel"
                      aria-labelledby={`menu-tab-${VIEW_TABS.findIndex((v) => v.chapter === t.id)}`}
                      className={`menu-panel${active === t.id ? " is-active" : ""}`}
                      aria-hidden={active !== t.id}
                      suppressHydrationWarning
                    >
                    <div className="menu-body" key={`${t.id}:${active}`}>
                      <div className="menu-spread">
                        <span className="menu-binding" aria-hidden="true" />
                        <div className="menu-page">
                          <header className="menu-pagehead">
                            <span className="menu-coin" aria-hidden="true">
                              <Icon size={20} strokeWidth={2} />
                            </span>
                            <h3 className="menu-chapter">{title}</h3>
                          </header>
                          <MenuPageSegs segs={left} from={0} solo={t.groups.length === 1} />
                          <span className="menu-pageno" aria-hidden="true">
                            {ti * 2 + 1}
                          </span>
                        </div>
                        <div className="menu-page">
                          {t.rightPage && (
                            <header className="menu-pagehead">
                              <span className="menu-coin" aria-hidden="true">
                                <Utensils size={20} strokeWidth={2} />
                              </span>
                              <h3 className="menu-chapter">{t.rightPage.label}</h3>
                            </header>
                          )}
                          <MenuPageSegs
                            segs={right}
                            from={left.length}
                            solo={t.groups.length === 1}
                          />
                          {also.length > 0 && (
                            <MenuAlso
                              segs={also}
                              expanded={expanded}
                              onToggle={() => setExpanded((v) => !v)}
                              i={left.length + right.length}
                            />
                          )}
                          <span className="menu-pageno" aria-hidden="true">
                            {ti * 2 + 2}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
              </div>
            </div>

            <div className="menu-pager">
              <div className="menu-pager-nav">
                <p className="menu-progress">
                  Chapter {idx + 1} of {TABS.length}
                </p>
                <div className="menu-dots">
                  {TABS.map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      className="menu-dot"
                      aria-label={`Go to ${t.label}`}
                      aria-current={active === t.id ? "true" : undefined}
                      onClick={() => go(t.id)}
                    >
                      <span className="menu-dot-core" />
                    </button>
                  ))}
                </div>
              </div>
              <div className="menu-pager-ctas">
                <button
                  type="button"
                  className="btn btn-ghost"
                  disabled={!prev}
                  onClick={() => prev && go(prev.id)}
                >
                  <ArrowLeft size={16} strokeWidth={2.5} aria-hidden="true" /> Previous
                </button>
                <button
                  type="button"
                  className="btn btn-blue"
                  disabled={!next}
                  onClick={() => next && go(next.id)}
                >
                  {next ? `Next: ${next.label}` : "Next"}{" "}
                  <ArrowRight size={16} strokeWidth={2.5} aria-hidden="true" />
                </button>
              </div>
            </div>

            <p className="menu-footnote">
              <abbr className="menu-star" title={`* ${FOOTNOTE}`}>
                *
              </abbr>{" "}
              {FOOTNOTE}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
