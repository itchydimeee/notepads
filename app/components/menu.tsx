"use client";

// T6 — Menu (tabbed chapters). Client island: the tab list needs state.
// All copy verbatim from docs/details.md §5 (14 datasets intact) and §4
// lines 105–107 (₱350 Study Space Package). Strings kept as constants
// outside JSX so ₱ / — / apostrophes survive untouched.
import { useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from "react";
import Accent from "./accent";
import Reveal from "./reveal";
import SectionTab from "./section-tab";
import "../menu.css";

// v4 copy: headline/lede rewritten warm (ui_design.md §0.1); every dish name,
// price, note and dataset name stays verbatim from docs/details.md §5.
const LEDE =
  "Rice bowls and crunchy bites, pasta, coffee, sodas and bakes — every chapter, just like the printed book on our counter.";
const TICKET_NAME = "Study space package";
const TICKET_SUB = "Single space · 2 hours of uninterrupted study time";
const TICKET_HINT = "full details up in the About section →";
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
    id: "morning",
    label: "Morning & fils",
    groups: [
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

function MenuRow({ row, cols }: { row: Row; cols?: 3 }) {
  const meta =
    row.note && row.desc
      ? `${row.note} · ${row.desc}`
      : row.note ?? row.desc ?? null;
  return (
    <>
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
    </>
  );
}

function MenuGroup({ group }: { group: Group }) {
  return (
    <div className="menu-group">
      <h3 className="menu-label">{group.label}</h3>
      <div className={group.cols === 3 ? "menu-list is-cols" : "menu-list"}>
        {group.cols === 3 && (
          <span className="menu-colsh is-blank" aria-hidden="true">
            {"\u00a0"}
          </span>
        )}
        {group.cols === 3 && (
          <>
            <span className="menu-colsh">Hot</span>
            <span className="menu-colsh">Iced 12oz</span>
            <span className="menu-colsh">Iced 16oz</span>
          </>
        )}
        {group.rows.map((row) => (
          <MenuRow key={row.name} row={row} cols={group.cols} />
        ))}
      </div>
    </div>
  );
}

export default function Menu() {
  const [active, setActive] = useState("rice");
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const onKeyDown = (e: ReactKeyboardEvent<HTMLDivElement>) => {
    const n = TABS.length;
    const idx = TABS.findIndex((t) => t.id === active);
    let next = -1;
    if (e.key === "ArrowRight") next = (idx + 1) % n;
    else if (e.key === "ArrowLeft") next = (idx - 1 + n) % n;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = n - 1;
    if (next < 0) return;
    e.preventDefault();
    setActive(TABS[next].id);
    tabRefs.current[next]?.focus();
  };

  return (
    <section id="menu" className="menu" aria-labelledby="menu-title">
      <div className="menu-inner">
        <Reveal>
          <header className="menu-head">
            <SectionTab num="02" label="Menu" tone="peach" />
            <h2 id="menu-title" className="menu-title">
              Open the menu <Accent>book</Accent>
            </h2>
            <p className="menu-lede">{LEDE}</p>
          </header>
        </Reveal>

        {/* T13 — ONE Reveal over the whole menu-main stack (ticket + tabs +
            panels + footnote come in together). Wrapping ticket/tabs
            individually would turn them into plain children of a block div
            and lose .menu-ticket's justify-self: center grid placement. */}
        <Reveal delay={0.06}>
          <div className="menu-main">
          <aside className="menu-ticket" aria-label="Study space package — ₱350">
            <span className="u-tape menu-ticket-tape" aria-hidden="true" />
            <div className="menu-ticket-stub">
              <span className="menu-ticket-price">₱350</span>
            </div>
            <span className="menu-ticket-perf" aria-hidden="true">
              <span className="menu-ticket-hole menu-ticket-hole-a" />
              <span className="menu-ticket-hole menu-ticket-hole-b" />
            </span>
            <div className="menu-ticket-info">
              <p className="menu-ticket-name">{TICKET_NAME}</p>
              <p className="menu-ticket-sub">{TICKET_SUB}</p>
              <p className="menu-ticket-hint">
                <a href="#about">{TICKET_HINT}</a>
              </p>
            </div>
          </aside>

          <div
            className="menu-tabs"
            role="tablist"
            aria-label="Menu chapters"
            onKeyDown={onKeyDown}
          >
            {TABS.map((t, i) => (
              <button
                key={t.id}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                id={`menu-tab-${t.id}`}
                className="menu-tab"
                role="tab"
                aria-selected={active === t.id}
                aria-controls={`menu-panel-${t.id}`}
                tabIndex={active === t.id ? 0 : -1}
                onClick={() => setActive(t.id)}
              >
                {t.label}
              </button>
            ))}
          </div>

          {TABS.map((t) => (
            <div
              key={t.id}
              id={`menu-panel-${t.id}`}
              role="tabpanel"
              aria-labelledby={`menu-tab-${t.id}`}
              className="menu-panel"
              tabIndex={0}
              hidden={active !== t.id}
            >
              <div className="menu-body" key={`${t.id}:${active}`}>
                <div className="menu-scroll">
                  {t.groups.map((g) => (
                    <MenuGroup key={g.label} group={g} />
                  ))}
                </div>
              </div>
            </div>
          ))}

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
