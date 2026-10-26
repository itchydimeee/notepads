// Preloader — a static notebook sheet that paints with the first byte.
// Server-rendered so it appears before hydration; the inline script below
// drives the ink/nib reveal, notes, counter, and the exit. If scripting is
// blocked, the sheet fades itself away via preloader.css's pre-autofade.

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
  var MIN = 800, MAX = 2500, RAMP = 1400;
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
    }, 950);
  }

  if (reduce) {
    requestAnimationFrame(leave);
    return;
  }

  (function step() {
    var e = Date.now() - t0;
    var p = Math.min(100, Math.round((e / RAMP) * 100));
    var w = Math.min(100, p * 1.06);
    ink.style.clipPath = 'inset(0 ' + Math.max(0, 100 - w) + '% 0 0)';
    nib.style.left = w + '%';
    nib.style.opacity = w > 99 ? 0 : 1;
    bar.style.transform = 'scaleX(' + p / 100 + ')';
    num.textContent = p;
    if (p >= 100 && e >= MIN) {
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
      <div className="pre-margin" />
      <div className="pre-holes">
        <i />
        <i />
        <i />
      </div>
      <div className="pre-body">
        <svg viewBox="0 0 72 62" fill="none" strokeLinecap="round" strokeLinejoin="round" className="pre-cup">
          <g stroke="#b85433" strokeWidth="3" className="pre-steam">
            <path d="M30 14c0-4 4-4 4-8" />
            <path d="M38 16c0-4 4-4 4-8" />
            <path d="M34 22c0-4 4-4 4-8" />
          </g>
          <path
            d="M20 26h32v14a12 12 0 0 1-12 12h-8a12 12 0 0 1-12-12V26Z"
            stroke="#34281b"
            strokeWidth="3"
            fill="#fcf9ef"
          />
          <path d="M52 28h4a6 6 0 0 1 6 6c0 4-3 7-7 7" stroke="#34281b" strokeWidth="3" />
          <path d="M14 58h44" stroke="#34281b" strokeWidth="3" />
        </svg>
        <span className="pre-name">
          <span className="pre-name-ghost">NotePads</span>
          <span className="pre-name-ink">NotePads</span>
          <span className="pre-nib" />
        </span>
        <span className="pre-rule">
          <i />
        </span>
        <p className="pre-note">{NOTES[0]}…</p>
      </div>
      <span className="pre-count">0</span>
      <script dangerouslySetInnerHTML={{ __html: SCRIPT }} />
    </div>
  );
}
