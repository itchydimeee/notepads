// T10 — Visit (#visit): Fredoka H2 "Find your seat" + verbatim lede, the
// shared ContactStrip LEFT, and a warm-framed Google Maps iframe RIGHT.
// Pure server component — NO JS: the map is the standard no-key Google Maps
// embed in a reserved aspect box (zero CLS), buttons are the shared .btn
// system, motion comes only from those buttons' global transitions.
// All copy + URLs verbatim from docs/details.md §9 + §Site Identity.
import ContactStrip from "./contact-strip";
import "../visit.css";

const H2 = "Find your seat";
const LEDE =
  "2nd floor of the SDC Building, Guzman–Jesena Street, Mandurriao — look for the glowing NotePads sign.";

const MAP_TITLE = "Map of NotePads Cafe, Mandurriao";
// Standard keyless Google Maps embed on the §Site Identity coordinates
// (10.7226, 122.5311). MapLibre + the Maps JS SDK are both banned by task.md
// T0 — the iframe is the sanctioned route into the map.
const MAP_SRC = "https://maps.google.com/maps?q=10.7226,122.5311&z=16&output=embed";

// §Site Identity buttons. The Maps place URL contains `!`s, so it is passed
// as a JS string constant — no JSX-level escaping needed and none applied
// (the string is shipped byte-identical, JSX attribute interpolation is
// literal). The directions URL's pre-encoded %2C segments are likewise
// copied as-is.
const DIRECTIONS =
  "https://www.google.com/maps/dir/?api=1&destination=Notepads+Cafe%2C+SDC+Building%2C+Guzman-Jesena+Street%2C+Mandurriao%2C+Iloilo+City";
const MAPS_PLACE =
  "https://www.google.com/maps/place/Notepads+Cafe/data=!4m2!3m1!1s0x0:0x959b3df705b32020";

const MAP_NOTE =
  "Map pin is approximate — tap \"Get directions\" for turn-by-turn.";

export default function Visit() {
  return (
    <section id="visit" className="visit" aria-labelledby="visit-title">
      <div className="visit-inner">
        <h2 id="visit-title" className="visit-title">
          {H2}
        </h2>
        <p className="visit-lede">{LEDE}</p>

        {/* Strip LEFT + map RIGHT on wide screens; stacked below ~980px with
            the strip first, matching the reading order on mobile. gap 32px+.
            Decor budget: 0 floating motifs — the framed map card is the
            section's one elevated moment and the strip is content. */}
        <div className="visit-grid">
          <ContactStrip />

          <div className="visit-mapcol">
            {/* The one elevated moment: warm --paper frame + --shadow-soft
                around the map. The inner wrapper reserves the aspect box so
                the late-loading iframe never shifts layout (zero CLS). */}
            <div className="visit-mapcard">
              <div className="visit-mapframe">
                <iframe
                  className="visit-map"
                  src={MAP_SRC}
                  title={MAP_TITLE}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            {/* Buttons: `Get directions` = blue-tinted ghost primary,
                `Google Maps` = secondary ghost. The shared .btn floor is
                48px, so both clear the 44px tap target. */}
            <div className="visit-btns">
              <a
                className="btn btn-ghost visit-btn-primary"
                href={DIRECTIONS}
                target="_blank"
                rel="noreferrer"
              >
                Get directions
              </a>
              <a
                className="btn btn-ghost"
                href={MAPS_PLACE}
                target="_blank"
                rel="noreferrer"
              >
                Google Maps
              </a>
            </div>

            <p className="visit-mapnote">{MAP_NOTE}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
