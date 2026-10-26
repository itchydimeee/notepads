// T10 — Shared ContactStrip: the reusable contact block the Visit section
// (#visit) renders left of the map card, and the T11 Footer re-renders inside
// its narrow columns (Visit + Say hello). Pure server component — no state,
// no JS; content comes from docs/details.md §Site Identity + §9 + §10
// verbatim (no invented copy), with BLUE lucide accent icons per the v3 spec
// (ui_design.md §4 item 9).
//
// Reuse contract for T11 (documented in the component report):
//   <ContactStrip blocks={{...}} heading="Say hello" headingLevel={4} compact />
// - `blocks` gates each row: address / hours / contact / email / socials
//   (default: all on) — footer columns toggle rows independently.
// - `heading` + `headingLevel`: a doc-word heading above the rows (h2/h3/h4).
// - `compact`: tighter type/spacing so the strip fits narrow footer columns.
// - Colors ride scope vars on .cs (--cs-ink / --cs-muted / --cs-ico), so the
//   footer can re-tint the strip on --forest navy by overriding those three
//   vars in its own scope (see contact-strip.css header). Nothing else needs
//   to change for the footer reprise.
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import type { ComponentType, SVGProps } from "react";
import "../contact-strip.css";

/* --- verbatim constants (prerender-safe, outside JSX) ---------------------- */

// details.md §Site Identity prints the address as ONE string; it is folded
// into 3 honest segments (same words, same order, no invented wording):
//   1. "NotePads Cafe, 2nd Floor, SDC Building"   (the venue)
//   2. "Guzman–Jesena Street, Mandurriao"          (the street + district)
//   3. "Iloilo City, Philippines"                  (the city + country)
// — the same 3-segment split details.md's Location intent already implies.
const ADDRESS_LABEL = "Address";
const ADDRESS_LINES = [
  "NotePads Cafe, 2nd Floor, SDC Building",
  "Guzman–Jesena Street, Mandurriao",
  "Iloilo City, Philippines",
];

const HOURS_LABEL = "Hours";
const HOURS_LINES = [
  "Monday – Saturday: 7:00 AM – 10:00 PM",
  "Sunday: 10:00 AM – 8:00 PM",
];

const CALL_LABEL = "Call or text";
const PHONE = { label: "0956 554 3184", href: "tel:+639565543184" };
const WHATSAPP = {
  label: "WhatsApp +63 995 229 3755",
  href: "https://wa.me/639952293755",
};

const EMAIL_LABEL = "Email";
const EMAIL = {
  label: "notepadscafe1109@gmail.com",
  href: "mailto:notepadscafe1109@gmail.com",
};

// details.md §10 footer labels: Instagram + TikTok are per-handle
// ("@notepads.cafe"), Facebook is the page name ("NotePads Cafe" — the
// §10 choice, documented so the §9/§10 strip and footer agree). Link text
// carries the brand name so the link's purpose is never bare "@notepads.cafe".
const SOCIALS = [
  { text: "Instagram @notepads.cafe", href: "https://www.instagram.com/notepads.cafe/" },
  { text: "NotePads Cafe", href: "https://www.facebook.com/profile.php?id=61582392323170" },
  { text: "TikTok @notepads.cafe", href: "https://www.tiktok.com/@notepads.cafe/" },
];

/* --- social brand marks ------------------------------------------------------
   The installed lucide-react version no longer exports brand icons
   (Instagram/Facebook resolve to undefined — checked at build time). All
   three are drawn here as inline SVGs in the same idiom as the lucide row
   icons: 24 viewBox, stroke currentColor, strokeWidth 2, round caps/joins.
   Instagram + Facebook use the classic simple stroke geometry; TikTok is a
   drawn musical note (its brand shape) in the same idiom. */
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

const SOCIAL_ICONS: ComponentType<MarkProps>[] = [
  InstagramMark,
  FacebookMark,
  TikTokMark,
];

/* --- props ----------------------------------------------------------------- */

export type ContactStripProps = {
  /** Gate rows: no `blocks` = all rows on; passing `blocks` = exactly the
      listed rows render (omitted keys are OFF). */
  blocks?: {
    address?: boolean;
    hours?: boolean;
    contact?: boolean;
    email?: boolean;
    socials?: boolean;
  };
  /** Optional heading above the rows (T11 supplies its own doc words). */
  heading?: string;
  /** Heading tag for `heading` — h3 (section scope) or h4 (footer scope). */
  headingLevel?: 2 | 3 | 4;
  /** Tighter type + spacing for narrow footer columns. */
  compact?: boolean;
};

export default function ContactStrip({
  blocks,
  heading = "",
  headingLevel = 3,
  compact = false,
}: ContactStripProps) {
  // No `blocks` → all rows on. Passing `blocks` is OPT-IN: omitted rows
  // stay OFF (this is what keeps the footer's Visit/Say-hello columns
  // from rendering identical content).
  const show = blocks
    ? {
        address: !!blocks.address,
        hours: !!blocks.hours,
        contact: !!blocks.contact,
        email: !!blocks.email,
        socials: !!blocks.socials,
      }
    : {
        address: true,
        hours: true,
        contact: true,
        email: true,
        socials: true,
      };

  const Heading = ("h" + String(headingLevel)) as "h2" | "h3" | "h4";
  const cls = compact ? "cs cs-compact" : "cs";

  return (
    <div className={cls}>
      {heading ? <Heading className="cs-heading">{heading}</Heading> : null}

      {/* One <address> wraps the whole block — every row is contact-relevant.
          Scope var set here so the footer can re-tint on navy (see css). */}
      <address className="cs-body">
        {show.address ? (
          <div className="cs-row">
            <span className="cs-ico" aria-hidden="true">
              <MapPin size={20} strokeWidth={2} />
            </span>
            <div className="cs-content">
              <p className="cs-label">{ADDRESS_LABEL}</p>
              {ADDRESS_LINES.map((line) => (
                <p key={line} className="cs-line">
                  {line}
                </p>
              ))}
            </div>
          </div>
        ) : null}

        {show.hours ? (
          <div className="cs-row">
            <span className="cs-ico" aria-hidden="true">
              <Clock size={20} strokeWidth={2} />
            </span>
            <div className="cs-content">
              <p className="cs-label">{HOURS_LABEL}</p>
              {HOURS_LINES.map((line) => (
                <p key={line} className="cs-line">
                  {line}
                </p>
              ))}
            </div>
          </div>
        ) : null}

        {show.contact ? (
          <div className="cs-row">
            <span className="cs-ico" aria-hidden="true">
              <Phone size={20} strokeWidth={2} />
            </span>
            <div className="cs-content">
              <p className="cs-label">{CALL_LABEL}</p>
              <p className="cs-line cs-line-link">
                <a href={PHONE.href}>{PHONE.label}</a>
              </p>
              <p className="cs-line cs-line-link">
                {/*External → blank + noreferrer. */}
                <a href={WHATSAPP.href} target="_blank" rel="noreferrer">
                  <MessageCircle size={16} strokeWidth={2.4} aria-hidden="true" />
                  {WHATSAPP.label}
                </a>
              </p>
            </div>
          </div>
        ) : null}

        {show.email ? (
          <div className="cs-row">
            <span className="cs-ico" aria-hidden="true">
              <Mail size={20} strokeWidth={2} />
            </span>
            <div className="cs-content">
              <p className="cs-label">{EMAIL_LABEL}</p>
              <p className="cs-line cs-line-link">
                <a href={EMAIL.href}>{EMAIL.label}</a>
              </p>
            </div>
          </div>
        ) : null}

        {show.socials ? (
          <div className="cs-row cs-row-socials">
            <ul className="cs-socials">
              {SOCIALS.map((s, i) => {
                const Icon = SOCIAL_ICONS[i];
                return (
                  <li key={s.href}>
                    <a href={s.href} target="_blank" rel="noreferrer">
                      <Icon width={18} height={18} strokeWidth={2} aria-hidden="true" />
                      {s.text}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        ) : null}
      </address>
    </div>
  );
}
