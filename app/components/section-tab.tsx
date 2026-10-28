// 2026-10-28 — notebook index tab: section-name marker requested by the user.
// One per major section, placed above the H2; `<p>` level so the heading
// order stays untouched. Tones come from the warm-paper token family
// (globals.css tokens only). STAB (static) — numbers/labels mirror nav.tsx.
type Tone = "butter" | "peach" | "mustard" | "sage" | "dusty" | "paper";

type Props = {
  num: string; // hand-stamped chapter number, e.g. "01"
  label: string; // nav label verbatim ("About", "Menu", "The Place", …)
  tone?: Tone; // warm paper behind the tab ink
};

export default function SectionTab({ num, label, tone = "paper" }: Props) {
  const cls = tone === "paper" ? "u-sectab" : `u-sectab is-${tone}`;
  return (
    <p className={cls}>
      <span className="u-sectab-num" aria-hidden="true">
        {num}
      </span>
      {label}
    </p>
  );
}
