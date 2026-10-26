// T11 — Footer: deep navy --forest #202a52 ground with a parchment wave
// divider, brand block, drawn-mark socials row with doc-vocabulary
// aria-labels, Explore anchors, and two re-renders of the T10 shared
// ContactStrip (Visit + Say hello columns). Pure server component — no
// state, no JS, no bespoke motion (globals transitions only).
//
// All copy verbatim from docs/details.md §10 + §Site Identity + the §1
// anchor table. Colors ride footer.css constants; the navy retint of the
// strip rides the .cs scope vars (overridden in footer.css — the
// contact-strip.css header documents the route). Contrast math for every
// tone on #202a52 lives in the T11 report and in footer.css comments.
import { Coffee, Mail, MessageCircle, Sparkles } from "lucide-react";
import type { SVGProps } from "react";
import ContactStrip from "./contact-strip";
import "../footer.css";

/* --- verbatim constants (prerender-safe, outside JSX) ---------------------- */

const BRAND_LINE = "Where learning meets comfort.";
const BIO = "Your cozy corner for coffee, focus, and fresh ideas";

// details.md §10 prints "bio + ☕" — the glyph is CONTENT in the source
// document (it also sits literally in the hero sub in §3), so it stays a
// literal text glyph appended to the bio; it is not styled as an icon.
const BIO_GLYPH = " ☕";

// §1 anchor table + §10 Explore labels, verbatim:
const EXPLORE = [
  { text: "About", href: "#about" },
  { text: "Menu book", href: "#menu" },
  { text: "The place", href: "#place" },
  { text: "Saturday workshops", href: "#saturdays" },
  { text: "Reviews", href: "#reviews" },
  { text: "Find us", href: "#visit" },
];

const BOTTOM_LINE = `© ${new Date().getFullYear()} NotePads Study Hub Cafe · Iloilo City, Philippines`;
const CARE_LINE = "brewed with care";

/* --- drawn brand marks -------------------------------------------------------
   Icon-only social controls NEED names (craft-floor: name the control;
   ui_design.md §6 bike-shed rule). The T10 strip's marks are file-internal,
   and its socials block renders visible text — intended for the Say hello
   column. This standalone "Social links" row draws its own copies in the
   SAME idiom as the strip marks (24 viewBox, stroke currentColor,
   strokeWidth 2, round caps/joins) with aria-labels built only from
   details.md vocabulary: Follow (from `Follow along`), the two doc
   handles, the FB page name `NotePads Cafe`, the `Message us` chip, the
   `Email` chip + the verbatim address string. No invented flavor. */

type MarkProps = SVGProps<SVGSVGElement>;

function InstagramMark(props: MarkProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function FacebookMark(props: MarkProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function TikTokMark(props: MarkProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M9 18a3 3 0 1 0 0-.01" />
      <path d="M12 18V4" />
      <path d="M12 4c.6 3.1 2.6 4.9 6 5.1" />
    </svg>
  );
}

const SOCIAL_LINKS = [
  {
    href: "https://www.instagram.com/notepads.cafe/",
    label: "Follow NotePads on Instagram (@notepads.cafe)",
    Mark: InstagramMark,
  },
  {
    href: "https://www.facebook.com/profile.php?id=61582392323170",
    label: "NotePads Cafe on Facebook",
    Mark: FacebookMark,
  },
  {
    href: "https://www.tiktok.com/@notepads.cafe/",
    label: "Follow NotePads on TikTok (@notepads.cafe)",
    Mark: TikTokMark,
  },
  {
    href: "https://wa.me/639952293755",
    label: "Message us on WhatsApp",
    Mark: MessageCircle,
  },
  {
    href: "mailto:notepadscafe1109@gmail.com",
    label: "Email notepadscafe1109@gmail.com",
    Mark: Mail,
  },
];

/* --- bottom-bar doodles: cup / bean / sparkle, mustard accents --------------
   Text furniture inside the care line (not floating motifs). Lucide-free
   bean: the two-arc drawn spec. Decorative — contrast duty ≥ 3:1 with
   mustard #e2b064 on navy (computed 7.0:1) and aria-hidden. */
function BeanMark(props: MarkProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <ellipse cx="12" cy="12" rx="9.5" ry="6" transform="rotate(45 12 12)" />
      <path d="M6.3 6.3c3.2 3.2 8.2 8.2 11.4 11.4" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="footer">
      {/* Parchment wave divider (the one elevated moment with the brand
          block): ONE wave shape, crisp geometry SVG, parchment fill on the
          navy ground — never a busy multi-wave. Decorative, not a motif. */}
      <svg
        className="footer-wave"
        viewBox="0 0 1440 72"
        preserveAspectRatio="none"
        aria-hidden="true"
        focusable="false"
      >
        <path
          fill="var(--parchment)"
          d="M0 0h1440v24c-158 40-348 44-540 26C700 32 570 14 430 20s-320 36-430 14z"
        />
      </svg>

      <div className="footer-inner">
        <div className="footer-grid">
          {/* --- Brand block (left) --------------------------------------- */}
          <div className="footer-brandcol">
            <p className="footer-brand">{BRAND_LINE}</p>
            <p className="footer-bio">
              {BIO}
              <span className="footer-bio-glyph">{BIO_GLYPH}</span>
            </p>

            {/* Standalone "Social links" row (§10): drawn marks, aria-labels
                from doc vocabulary. Padding keeps every mark ≥ 44px tap. */}
            <nav className="footer-socials" aria-label="Social links">
              <ul>
                {SOCIAL_LINKS.map(({ href, label, Mark }) => (
                  <li key={href}>
                    <a href={href} aria-label={label} {...(href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}>
                      <Mark width={22} height={22} strokeWidth={2} aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* --- Explore column (verbatim §10 anchors) --------------------- */}
          <nav className="footer-col" aria-label="Explore">
            <h3 className="footer-heading">Explore</h3>
            <ul className="footer-explore">
              {EXPLORE.map((e) => (
                <li key={e.href}>
                  <a href={e.href}>{e.text}</a>
                </li>
              ))}
            </ul>
          </nav>

          {/* --- Visit column (ContactStrip reprise) ------------------------ */}
          <div className="footer-col">
            <ContactStrip
              blocks={{ address: true, hours: true }}
              heading="Visit"
              headingLevel={4}
              compact
            />
          </div>

          {/* --- Say hello column (ContactStrip reprise) -------------------- */}
          <div className="footer-col">
            <ContactStrip
              blocks={{ socials: true, contact: true, email: true }}
              heading="Say hello"
              headingLevel={4}
              compact
            />
          </div>
        </div>

        {/* --- bottom bar: © line + care line with mustard doodles --------- */}
        <div className="footer-bottom">
          <p className="footer-copyright">{BOTTOM_LINE}</p>
          <p className="footer-care">
            <span className="footer-care-doodle" aria-hidden="true">
              <Coffee width={17} height={17} strokeWidth={2} aria-hidden="true" />
            </span>
            {CARE_LINE}
            <span className="footer-care-doodle" aria-hidden="true">
              <BeanMark width={17} height={17} strokeWidth={2} aria-hidden="true" />
              <Sparkles width={17} height={17} strokeWidth={2} aria-hidden="true" />
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
