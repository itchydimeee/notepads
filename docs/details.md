# NotePads Study Hub Cafe — Website Content Documentation


## Site Identity

| Field | Value |
|---|---|
| Name | NotePads Study Hub Cafe |
| Short name | NotePads |
| Tagline | Where learning meets comfort |
| Bio | Your cozy corner for coffee, focus, and fresh ideas |
| Meta description | NotePads Study Hub Cafe in Mandurriao, Iloilo City — where learning meets comfort. Coffee, hearty meals, study spaces with free Wi-Fi & charging, and Saturday kids workshops. |
| Address | NotePads Cafe, 2nd Floor, SDC Building, Guzman–Jesena Street, Mandurriao, Iloilo City, Philippines |
| Coordinates | 10.7226, 122.5311 |
| Phone | 0956 554 3184 (tel:+639565543184) |
| Email | notepadscafe1109@gmail.com |
| Hours | Monday – Saturday: 7:00 AM – 10:00 PM · Sunday: 10:00 AM – 8:00 PM |
| WhatsApp | +63 995 229 3755 (https://wa.me/639952293755) |
| Workshop phones | 0917 716 9035 · 0995 229 3755 |
| Instagram | https://www.instagram.com/notepads.cafe/ (@notepads.cafe) |
| Facebook | https://www.facebook.com/profile.php?id=61582392323170 |
| TikTok | https://www.tiktok.com/@notepads.cafe/ (@notepads.cafe) |
| Hopp link | https://notepadscafe.hopp.site/ |
| Maps place | https://www.google.com/maps/place/Notepads+Cafe/data=!4m2!3m1!1s0x0:0x959b3df705b32020 |
| Google Maps | https://www.google.com/maps/dir/?api=1&destination=Notepads+Cafe%2C+SDC+Building%2C+Guzman-Jesena+Street%2C+Mandurriao%2C+Iloilo+City |

Schema.org markup (`CafeOrCoffeeShop`): servesCuisine — Coffee, Filipino, Pasta, Sandwiches, Baked goods; geo coordinates included; opening hours as listed above.

## Page Structure & Render Order

1. Nav (header)
2. Hero (`#top`)
3. About (`#about`)
4. Menu (`#menu`)
5. The Place — gallery (`#place`)
6. Saturdays — kids workshops (`#saturdays`)
7. Reviews (`#reviews`)
8. Visit / Location (`#visit` — lazy-loaded)
9. Footer
10. Chatbot "Notey" (lazy-loaded chat widget)

## 1. Preloader

A notebook-sheet loading screen shown before the app bundle arrives. Rotating notes cycle every ~760ms:

- `warming the cups`
- `finding you a seat`
- `plugging in the Wi-Fi`
- `tearing off a fresh page`

Visuals: coffee cup with animated steam, "ink writing" brand-name reveal with a pen nib, progress bar, page-number counter. The sheet peels upward and fades on exit.

## 2. Nav (Header)

- Brand: `NotePads` + small `study hub cafe` (logo `/logo-256.png`)
- Links: `About` (#about) · `Menu` (#menu) · `The Place` (#place) · `Saturdays` (#saturdays) · `Reviews` (#reviews) · `Visit` (#visit)
- CTA button: `See the menu`
- Mobile: burger (`Open menu` / `Close menu`) opens a full-screen sheet with the same 6 links

## 3. Hero (`#top`)

- Kicker: `Study hub cafe · Mandurriao, Iloilo`
- H1: `Where learning` / `meets comfort` ("comfort" scribble-styled)
- Sub: `Your cozy corner for coffee, focus, and fresh ideas ☕ — with free Wi-Fi, charging, and 2 hours of study time on the house.`
- CTAs: `Flip the menu book` · `Find us`
- Live status chips (computed in Asia/Manila timezone): `Open now · until XPM` or `Closed now`, plus `Today 7AM – 10PM` (`10AM – 8PM` on Sundays)
- Background: rotating slideshow of 7 photos every 6.5s:
  1. The NotePads lounge with the logo wall
  2. The NotePads Study Hub Café sign at night
  3. Students studying at the long communal table
  4. The NotePads coffee counter
  5. Study stations and red chairs
  6. The open pantry
  7. A full house of laptops and coffee

## 4. About (`#about`)

- Eyebrow: `About NotePads`
- H2: `A study hub that feels like home` ("home" scribble)
- Lede: `NotePads Study Hub Cafe is your cozy corner for coffee, focus, and fresh ideas — tucked on the 2nd floor of the SDC Building along Guzman–Jesena Street in Mandurriao, Iloilo City.`
- Paragraph 2: `Whether it's a cram session before finals, a work-from-cafe day, a catch-up with friends over a board game, or a Saturday of creativity for the little ones — there's a seat, a cup, and a plug waiting for you.`
- Stats:
  - `2 hrs` — free stay, Wi-Fi & charging
  - `₱40` — per hour after that
  - `7 – 10` — Mon – Sat (Sunday 10 – 8)
- Polaroid captions: `study hub, in full swing` · `single space · 2 hrs of focus` · `premium space`

### Amenities (8 cards)

| Amenity | Description |
|---|---|
| Free Wi-Fi | Reliable, complimentary Wi-Fi for every guest. |
| Charging stations | Plug in and stay as long as the work needs. |
| 2 hours on the house | Then just ₱40 per hour beyond the 2-hour stay. |
| Climate controlled | A calm, air-conditioned space made for focus. |
| Laptop-friendly | Study & work stations, built for long sessions. |
| Board games & chess | Unplug and play with friends or a date. |
| Open pantry & treats | Complimentary snacks and a brain-boosting pantry. |
| Event venue | Good coffee, cozy space — now open for bookings. |

### Study Space Package — ₱350

Eyebrow: `Study space package` · `₱350` · `Single space · 2 hours of uninterrupted study time`

Includes:
1. One complimentary meal — pork or chicken adobo, embotido rice meal, or ham & cheese sandwich
2. One free drink — signature hot chocolate, iced tea, cucumber lemonade, blue lemonade, or pink lychee
3. Free access to our open pantry
4. Complimentary Wi-Fi & free charging stations
5. Free use of a laptop
6. 2 hours of stay included

Extra time: `₱40 per hour beyond the 2-hour stay`. A Premium Space package exists but has no published price (referenced in chatbot and poster copy only).

## 5. Menu (`#menu`)

- Eyebrow: `The Menu` · H2: `Open the menu book` · Lede: `Rice bowls, crunchy bites, pasta, sandwiches, coffee, sodas and bakes — every page, just like on our counter.`
- View toggle: `Book` / `List`; button `Original menu photos`; hint `drag a page · tap an edge · or use ← →`
- Interactive 3D menu book (flippable pages) with chapters; footnotes: `* from our printed menu — ask us to confirm the price` (book view); `* from our printed menu — please confirm the price with us. Prices in Philippine pesos.` (list view)
- Book page order: `Welcome` → `Rice Meals` → `Bites & Noodles` → `Pasta & Sandwiches` → `Coffee` → `Non-Coffee` → `Sodas & More` → `Baked Goods`
- Cover: `menu` / `coffee · meals · bakes` / `tap, drag, or flip me open →`
- Welcome page: `hello, scholar!` — study package summary
- Back cover: `thank you!` / `where learning meets comfort`

### Full Menu List (14 categories, prices in ₱)

Items marked `*` are flagged "from our printed menu" (price confirmation requested).

#### 1. Knowledge Bowl (Rice Meal)

| Item | Note | Price | Description |
|---|---|---|---|
| Pork Adobo | rice topping | ₱179 | Tender pork simmered in soy sauce, vinegar, garlic, and bay leaves. Savory, tangy, just a bit sweet — with hot steamed rice. |
| Chicken Adobo | rice meal | ₱159 | Juicy chicken simmered in soy sauce, vinegar, and garlic. Served with a generous serving of rice. |
| Spam & Egg | rice bowl | ₱199 | Crispy Spam slices and fried egg on warm steamed rice. |
| Embutido & Egg | rice bowl | ₱179 | Homemade embutido with hot steamed rice and a sunny-side-up egg. |
| Bacon & Egg | rice meal | ₱199 | Crispy bacon, fried egg, and hot steamed rice. |
| Corned Beef & Egg | rice meal | ₱199 | Sautéed corned beef with onions, fried egg, and hot steamed rice. |
| Creamy Bakareta | rice meal | ₱189 * | Slow-cooked beef in a creamy, savory tomato sauce with vegetables, over hot steamed rice. |
| Chicken Fillet | rice meal | ₱179 | Tender chicken fillet lightly breaded and fried, served with rice. |
| Fried Chicken | rice meal | ₱119 (1 pc) / ₱199 (2 pc) | Crispy fried chicken with hot steamed rice and gravy. |
| Fish Fillet & Egg | rice meal | ₱179 | — |
| Bangus Ala NotePads | rice meal | ₱189 | — |
| Chorizo & Egg | rice meal | ₱199 | — |
| Tocino & Egg | rice meal | ₱199 | — |

#### 2. Cram Crunchy Bites

| Item | Price |
|---|---|
| Lumpia (5 pcs) | ₱70 |
| French Fries | ₱75 |
| Cheese Sticks | ₱90 |
| Chicken Fillet Bites | ₱99 |
| Chicken Nuggets (6 pcs) | ₱109 |
| New York Frank Sausage & Fries | ₱189 |

#### 3. Noodle Notes

| Item | Price | Note |
|---|---|---|
| Korean Ramen | ₱139 * | Flavors: Spicy · Mild · Hot Beef · Cheesy · Cheesy Spicy |
| Chicken Noodles | ₱89 * | — |

#### 4. Professor's Pot

| Item | Price | Description |
|---|---|---|
| Pancit Molo Soup (sharing) | ₱149 | Handmade dumplings filled with seasoned pork, in a light and savory broth. |

#### 5. Brain Fuel Pasta

| Item | Price | Description |
|---|---|---|
| Spaghetti Scarlatto | ₱189 | Spaghetti with hearty red tomato sauce, garlic, and ground meat. Best with garlic bread. |
| Creamy Bacon Carbonara | ₱189 | Pasta in a light, creamy sauce with smoky bacon and parmesan. |

#### 6. Brain Booster Sandwiches

| Item | Price | Description |
|---|---|---|
| Club Sandwich | ₱199 | Grilled chicken, smoky bacon, crisp greens, juicy tomatoes on toasted whole wheat bread, light mayo. Side of house fries or salad. |
| Ham & Cheese Sandwich | ₱149 | Smoked ham and creamy cheese grilled between buttered bread. |
| Bacon & Egg Sandwich | ₱149 | Freshly cracked egg, crispy bacon, and light mayo on toasted bread. |
| Crunchy Chicken Burger | ₱129 | — |
| Tuna Gourmet Sandwich | ₱179 | — |

#### 7. Pandesal Almusal

| Item | Price |
|---|---|
| Bacon & Egg | ₱109 |
| Ham & Egg | ₱100 |
| Corned Beef & Egg | ₱109 |
| Spam & Egg | ₱100 |

#### 8. Coffee Based (hot / iced 12oz / iced 16oz)

| Item | Hot | 12oz | 16oz |
|---|---|---|---|
| Americano | ₱110 | ₱109 | ₱129 |
| Café Latte | ₱120 | ₱129 | ₱149 |
| Cappuccino | ₱120 | ₱129 | ₱149 |
| Vanilla Latte | ₱120 | ₱129 | ₱149 |
| Café Mocha | ₱120 | ₱129 | ₱149 |
| Caramel Latte | ₱120 | ₱129 | ₱149 |
| White Mocha Latte | ₱120 | ₱129 | ₱149 |
| Roasted Almond Latte | ₱120 | ₱129 | * |
| Salted Caramel Latte | ₱120 | ₱129 | ₱149 |
| Butterscotch Latte | ₱120 | ₱129 | ₱149 |
| Hazelnut Latte | ₱120 | ₱129 | ₱149 |
| Hazelnut Mocha Latte | ₱120 | ₱129 | ₱149 |
| Spanish Latte | ₱120 | ₱129 | ₱149 |
| Caramel Macchiato | ₱120 | ₱129 | ₱149 |
| Dirty Matcha Latte | ₱140 | ₱149 | ₱159 |
| Strawberry Mocha | ₱130 | ₱139 | ₱159 |
| Strawberry White Mocha | ₱130 | ₱139 | ₱159 |
| Henny Strawberry Latte | — | ₱129 | — |
| Gingerbread Latte (seasonal) | ₱130 | ₱139 | ₱159 |

#### 9. Non-Coffee Based

| Item | Hot | 12oz | 16oz |
|---|---|---|---|
| Flower Tea | ₱80 | ₱80 | — |
| Green Tea | ₱80 | ₱89 | ₱109 |
| Signature Chocolate | ₱100 | ₱110 | ₱129 |
| Strawberry Latte | ₱120 | ₱129 | ₱149 |
| Strawberry Choco Latte | ₱130 | ₱139 | ₱159 |
| Strawberry Matcha Latte | ₱120 | ₱139 | ₱159 |
| Green Matcha Latte | ₱130 | ₱139 | ₱159 |

#### 10. Frappuccino

| Item | Price |
|---|---|
| Caramel Macchiato | ₱169 |
| Peppermint Mocha | ₱169 |
| Mocha Hazelnut | ₱169 |

#### 11. Fruit Based Soda

| Item | Price |
|---|---|
| Blueberry | ₱90 |
| Strawberry | ₱90 |
| Raspberry | ₱90 |
| Green Apple | ₱90 |
| Grape | ₱90 |
| Wintermelon | ₱110 |

#### 12. Other Beverages

| Item | Price |
|---|---|
| Soda in Can | ₱69 * |
| Blue Lemonade | ₱70 * |
| Iced Tea | ₱70 * |
| Pink Lychee | ₱70 * |
| Cucumber Lemonade | ₱70 * |
| Yakult | ₱20 * |
| Bottled Water | ₱20 * |

#### 13. Cookies (by arabella)

| Item | Price |
|---|---|
| Cookie Butter Treats (Biscoff cookies) | ₱115 * |
| Classic Chippers (chocolate chip) | ₱85 * |
| Velvet Bites (red velvet) | ₱115 * |
| Banana Chip Crunchies | ₱90 * |
| Matcha Munchies | ₱110 * |
| Oreo Bliss Bites (cookies & cream) | ₱125 * |
| Assorted Cookies (5 pieces) | ₱400 * |

#### 14. Brownies & Blondies (by arabella)

| Item | Price |
|---|---|
| Biscoff Bars | ₱120 * (box of 9: ₱475) |
| Choco Chunkies (chocolate brownies) | ₱105 * (box of 9: ₱425) |

### Menu Photo Easybook (lightbox captions)

1. Our menu — cover
2. Knowledge Bowl · rice meals
3. Knowledge Bowl · more rice meals
4. Sandwiches · pasta · noodles · bites
5. Coffee based
6. Non-coffee · frappuccino · sodas
7. Baked goods by arabella
8. Study spaces · single space
9. Study spaces · premium space

## 6. The Place — Gallery (`#place`)

- Eyebrow: `The Place` · H2: `Make yourself at home` · Lede: `Warm lights, red chairs, a pantry within reach and a seat with a plug. Here's a peek around the 2nd floor.`
- 8 photos (polaroid-style, in a mosaic):

| Photo | Layout | Alt text |
|---|---|---|
| Look for the glowing sign | wide | The glowing NotePads Study Hub Café sign at night |
| The coffee counter | — | The NotePads coffee counter with warm hanging lights |
| The open pantry | — | The open pantry shelves with fruit and cereal jars |
| The communal table, in full focus | tall | Students working at the long communal study table |
| Study stations | wide | Study stations with red chairs and string lights |
| Lounge corner & logo wall | — | Lounge seating under the NotePads logo wall |
| Laptops, coffee, good company | tall | Guests studying with laptops and iced coffee |
| SDC Building · 2nd floor · Guzman–Jesena St | — | The SDC Building on Guzman–Jesena Street |

- Lines list the shipped gallery order — a narrative walkthrough: arrive (`glowing sign`) → order (`coffee counter`) → snacks (`open pantry`) → study (`communal table`, `stations`) → perch/lounge (`lounge corner`) → company (`laptops, coffee`) → address (`SDC Building`). Tape strips on the first and last photo only.
- Only 5 real photos exist for 8 slots, so reused sources get a distinct `object-position` crop per slot: communal table `50% 20%` (tall), laptops/coffee `20% 45%` (tall), building `50% 70%` (square). Crop values also recorded in `place.tsx`.

## 7. Saturdays — Kids Workshops (`#saturdays`)

- Eyebrow: `Every Saturday` · H2: `Saturdays at NotePads`
- Lede: `Give your child the gift of creativity, one gadget-free Saturday at a time. We're inviting parents to let their little ones unplug, explore, and create in a fun, hands-on environment where they can learn new skills, build confidence, and make new friends.`
- Title card: `No Gadget Kids Workshops` · tagline `Learn · Create · Imagine`
- Facts: `Saturdays` · `9:00 – 11:00 AM` · `Ages 6 – 10 years old`

### 2026 Batch Sessions (Aug–Sep)

| Session | Tagline | Dates |
|---|---|---|
| Art Workshop | Unleash creativity through colors & craft! | Aug 15 & Aug 22, 2026 |
| Little Barista | Learn basic coffee skills + make their own drinks! | Aug 29 & Sep 5, 2026 |
| Cookie Decor | Bake, design, and eat their yummy creations! | Sep 12 & Sep 19, 2026 |

Past dates render with a check mark (✓).

### What's Included

`Apron` · `ID` · `Materials` · `Snacks` · `Certificate`

### Pricing

| Package | Price | Savings |
|---|---|---|
| Per workshop | ₱1,299 | — |
| Any 2 workshops | ₱2,298 | save ₱300 |
| All 3 workshops | ₱3,497 | save ₱400 |

### Reserve

- H4: `Reserve your child's spot`
- Text: `Limited slots only! Saturdays only: message our FB/IG, call, or visit us to reserve.` — or, when the batch has ended: `The 2026 batch of sessions has wrapped up — message us to ask about the next dates.`
- Buttons: `0917 716 9035` (phone call) · `WhatsApp` · `Instagram` · `Facebook`
- Small line: `Also: 0995 229 3755 · NotePads Cafe, 2nd Floor, SDC Building, Guzman–Jesena Street, Mandurriao`
- Motto: `Because the best things happen offline.`

### Menu-Book Tie-in

Final book page: `See you on Saturday?` — `Every Saturday the café turns into a gadget-free playground for kids aged 6–10 — no gadget kids workshops. Learn · Create · Imagine.` + address card + motto.

Workshops poster: `No Gadget Kids Workshops poster: Art, Little Barista and Cookie Decor workshops for ages 6 to 10` (lightbox caption: `No Gadget Kids Workshops · Saturdays · Ages 6–10`).

## 8. Reviews (`#reviews`)

- Eyebrow: `Reviews` · H2: `Hear from our customers`
- Summary: `★★★★★ 5.0 from 5 five-star reviews · drag to browse`
- All 5 reviews are 5-star:

**Jayhan94** — `Good place to hang out with a date — great atmosphere, has board games you can do with your date or friends. Would recommend the lemon muffins. Got a complimentary fudge which is also good, and if you work from home and there's a blackout you can come to this place as they have a study/work station.`

**Belle N.** — `All the staff are incredibly pleasant and welcoming. The food is delicious and very affordable, and the coffee tastes authentic, not commercial at all.`

**Corman A.** (Coffee lover) — `Cozy place for coffee and food. The desserts were surprisingly good — I especially loved the chocolate cheesecake. The staff are nice and courteous. This has become my go-to hangout spot, conveniently located and open from 7 a.m. to 10 p.m., if I'm not mistaken.`

**Peter** — `Perfect cafe for a relaxing affordable meal. Friendly attentive service, comfortable decor and climate controlled. Perfect spot to get some work done on your laptop. We enjoyed & recommend!`

**Cj R.** (Photographer) — `NotePads Studyhub & Café is totally best for both work and unwinding! Their salted caramel coffee is seriously amazing — perfectly balanced, not too sweet, and just so comforting. The service is always warm and friendly, and you feel right at home the moment you step inside. Plus, the complimentary snacks are a lovely touch. A fantastic place to study, relax, or just enjoy a good cup of coffee. I definitely plan to come back again! ☕✨`

## 9. Visit / Location (`#visit`)

- Eyebrow: `Visit us` · H2: `Find your seat` · Lede: `2nd floor of the SDC Building, Guzman–Jesena Street, Mandurriao — look for the glowing NotePads sign.`
- Info list: `Address` (3 lines) · `Hours` (Mon–Sat / Sunday) · `Call or text` (`0956 554 3184`, `WhatsApp +63 995 229 3755`) · `Email`
- Buttons: `Get directions` · `Google Maps`
- Interactive MapLibre map with popup: `NotePads Study Hub Cafe` / `2/F SDC Building, Guzman–Jesena St.` / `Mandurriao, Iloilo City` / `Get directions →`
- Map note: `Map pin is approximate — tap "Get directions" for turn-by-turn.`
- Controls: `Zoom in`, `Zoom out`, `Toggle fullscreen`, pulsing logo pin

## 10. Footer

- Brand block: `Where learning meets comfort.` + bio + `☕`
- Social links: Instagram @notepads.cafe · Facebook (NotePads Cafe) · TikTok @notepads.cafe · WhatsApp · Email
- Explore column: `About` · `Menu book` · `The place` · `Saturday workshops` · `Reviews` · `Find us`
- Visit column: address lines; hours repeated as `days time`
- Say hello column: phone · WhatsApp · email · `@notepads.cafe` (IG/TikTok) · `NotePads Cafe` (FB)
- Bottom line: `© {year} NotePads Study Hub Cafe · Iloilo City, Philippines` · `brewed with care` (with cup/bean/sparkle doodles)

## 11. Chatbot — "Notey"

Lazy-loaded widget (mounts ~3.5s after load or first interaction).

- FAB: `Chat with Notey` / `Close chat`; desktop nudge bubble: `Questions? Ask Notey!`
- Header: `Notey` / `NotePads assistant`
- Greeting: `Hi! I'm Notey ☕ — ask me anything about NotePads: menu prices, study rates, hours, directions or Saturday workshops.`
- Quick-reply chips: `Opening hours` · `Study rates` · `Show the menu` · `Saturday workshops` · `Where are you?`
- Input placeholder: `Ask about the menu, hours, rates…`

### Notey Knowledge Base (intents)

| Intent | Answer summary |
|---|---|
| greeting | Friendly intro to ask about menu & prices, study rates, hours, location, workshops |
| hours | Full opening hours + live open/closed status; holiday hours not posted |
| location | Address (3 lines) + "It's on the 2nd floor of the SDC Building — look for the glowing NotePads Study Hub Café sign." |
| contact | Phone / WhatsApp / Email / Instagram / Facebook + workshop phones 0917 716 9035 / 0995 229 3755 |
| socials | Follow along for new drinks, events and cozy corners |
| wifi | Yes — complimentary Wi-Fi for all guests |
| charging | Charging stations free for everyone; blackout-friendly work spot; first 2 hours on the house |
| rates | Up to 2 hours of stay free; ₱40/hour beyond; ask about the ₱350 Study Space package |
| package | Full Study Space package list + Premium Space package (message us for details) |
| menu | All 14 categories listed; "Tell me a category or dish and I'll share prices." |
| category intents (12) | Full price list per menu category (same data as the menu); baked goods adds "Reviewers also love our lemon muffins and chocolate cheesecake" |
| recommend | Customer favorites ✨ — Salted Caramel Latte ("perfectly balanced, not too sweet"), lemon muffins & chocolate cheesecake, adobo rice meals, Signature Chocolate; Salted Caramel Latte prices: hot ₱120 / iced 12oz ₱129 / iced 16oz ₱149 |
| saturday | Workshop listing with dates + reserve early note (or "The 2026 batch of sessions has wrapped up — message us for the next dates!") |
| workshop-price / -included / -age / reserve / venue | Workshop prices, inclusions, ages 6–10, reservation methods, venue booking |
| games | Yes — board games and chess 🎲♟️ |
| pantry / laptop / aircon / reviews | Standard factual responses; reviews: "All 5 reviews on our page are 5 stars ⭐" |
| payment / parking / delivery / dietary / pets | Not posted online — message prompts |
| thanks / bye | `Bye for now! ☕ Come study, sip, and stay a while.` |

- Reply action chips include: `Call us`, `WhatsApp`, `Instagram`, `Facebook`, `Get directions`, `See the map`, `Open the menu book`, `Flip the menu book`, `Call to reserve`, `Call 0917 716 9035`, `Instagram DM`, `See the workshops`, `Read the reviews`, `Message us`.

## Design Language Summary (content-level)

The site follows a **notebook/stationery theme** — the menu is presented as a physical flip-book, callers are "scholars", the preloader simulates ink handwriting on ruled paper, and workshop/pricing copy uses study puns (`Cram Crunchy Bites`, `Noodle Notes`, `Brain Fuel Pasta`, `Professor's Pot`, `Brain Booster Sandwiches`, `hello, scholar!`, `brewed with care`). See `ui_design.md` for the full design system.
