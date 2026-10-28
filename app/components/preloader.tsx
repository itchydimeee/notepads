// Preloader — "morning brew" memo card (v4 redesign ≠ the ruled-sheet
// reference). Server-rendered static card paints with the first byte; the
// inline script below drives the ink/nib name reveal, rotating cozy notes,
// and the two-stage exit (card lifts first, then the warm ground fades to
// reveal the page). If scripting is blocked, preloader.css's pre-autofade
// removes the overlay. Classes the script touches are stable:
// .pre-name-ink, .pre-nib, .pre-rule i, .pre-count, .pre-note.

const SCRIPT = `(function () {
  var root = document.getElementById('preloader');
  if (!root) return;
  var doc = document.documentElement;
  doc.classList.add('is-preloading');
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var ink = root.querySelector('.pre-name-ink');
  var nib = root.querySelector('.pre-nib');
  var bar = root.querySelector('.pre-rule i');
  var num = root.querySelector('.pre-count');
  var note = root.querySelector('.pre-note');
  var NOTES = ['warming the cups', 'finding you a seat', 'plugging in the Wi-Fi', 'tearing off a fresh page'];
  var t0 = Date.now();
  var MIN = 900, MAX = 2500, RAMP = 1500;
  var left = false;

  var timer = setInterval(function () {
    var i = Math.floor((Date.now() - t0) / 700) % NOTES.length;
    note.textContent = NOTES[i] + '…';
  }, 700);

  function leave() {
    if (left) return;
    left = true;
    clearInterval(timer);
    root.classList.add('is-out');
    doc.classList.remove('is-preloading');
    setTimeout(function () {
      if (root.parentNode) root.parentNode.removeChild(root);
    }, 1250);
  }

  if (reduce) {
    requestAnimationFrame(leave);
    return;
  }

  (function step() {
    var e = Date.now() - t0;
    // eased progress: brisk off the line, gentle settle to 100 (cozy, not anxiously linear)
    var p = Math.min(1, e / RAMP);
    var eased = 1 - Math.pow(1 - p, 2.2);
    var w = Math.min(104, Math.round(eased * 108));
    var shown = Math.min(100, Math.round(eased * 100 * Math.min(1, e / (RAMP * 0.92))));
    ink.style.clipPath = 'inset(0 ' + Math.max(0, 100 - w) + '% 0 0)';
    nib.style.left = 'min(' + w + '%, calc(100% - 3px))';
    nib.style.opacity = w > 103 ? 0 : 1;
    bar.style.transform = 'scaleX(' + Math.min(1, eased * 1.04) + ')';
    num.textContent = shown;
    if (shown >= 100 && e >= MIN) {
      leave();
      return;
    }
    if (e >= MAX) {
      leave();
      return;
    }
    requestAnimationFrame(step);
  })();
})();`;

const NOTES = [
  "warming the cups",
  "finding you a seat",
  "plugging in the Wi-Fi",
  "tearing off a fresh page",
];

export default function Preloader() {
  return (
    <div id="preloader" className="pre" aria-hidden="true">
      {/* warm ground: butter glow + one slow diamond star, page-level */}
      <div className="pre-glow" />
      <svg viewBox="0 0 24 24" className="pre-spark" width="30" height="30" fill="currentColor" aria-hidden="true">
        <path d="M12 0c.9 5.4 3.6 8.6 8.6 10.2 1.4.45 1.4 2.15 0 2.6C15.6 14.4 12.9 17.6 12 24c-.9-6.4-3.6-9.6-8.6-11.2-1.4-.45-1.4-2.15 0-2.6C8.4 8.6 11.1 5.4 12 0Z" />
      </svg>

      {/* the memo card lives in a small stage so the torn-off sliver (a
          sibling ::after) can drop away from it on exit without being
          clipped by the card's own tear clip-path */}
      <div className="pre-stage">
        <div className="pre-card">
          <span className="u-tape pre-card-tape" aria-hidden="true" />

          <svg className="pre-cup" viewBox="0 0 72 66" fill="none" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <g stroke="var(--honey)" strokeWidth="3" className="pre-steam">
              <path d="M30 14c0-4 4-4 4-8" />
              <path d="M38 16c0-4 4-4 4-8" />
              <path d="M34 22c0-4 4-4 4-8" />
            </g>
            <path
              d="M20 28h32v14a12 12 0 0 1-12 12h-8a12 12 0 0 1-12-12V28Z"
              stroke="var(--ink)"
              strokeWidth="3"
              fill="var(--butter-soft)"
            />
            <path d="M52 30h4a6 6 0 0 1 6 6c0 4-3 7-7 7" stroke="var(--ink)" strokeWidth="3" />
            <path d="M14 62h44" stroke="var(--ink)" strokeWidth="3" />
          </svg>

          <span className="pre-name">
            <span className="pre-name-ghost">NotePads</span>
            <span className="pre-name-ink" suppressHydrationWarning>
              NotePads
            </span>
            <span className="pre-nib" suppressHydrationWarning />
          </span>

          <span className="pre-rule">
            <i suppressHydrationWarning />
          </span>

          <p className="pre-note" suppressHydrationWarning>
            {/* single string child: two adjacent text nodes would make React
                emit marker comments between them in SSR, and the inline
                script's textContent swap then breaks hydration structurally
                (suppressHydrationWarning only covers text/attribute diffs) */}
            {NOTES[0] + "…"}
          </p>
        </div>
      </div>

      <span className="pre-count" suppressHydrationWarning>
        0
      </span>

      <script dangerouslySetInnerHTML={{ __html: SCRIPT }} />
    </div>
  );
}
