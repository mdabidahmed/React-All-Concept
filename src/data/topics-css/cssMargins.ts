import type { Topic } from "../../types";

export const cssMarginsTopic: Topic = {
  id: "css-margins",
  title: "CSS Margins",
  category: "CSS Box Model",
  shortExplanation: `\`margin\` sets the transparent space **outside** an element's border, controlling distance from its neighbors.

- \`margin: 10px;\` — all four sides
- \`margin: 10px 20px;\` — vertical (top/bottom) then horizontal (left/right)
- \`margin: 10px 20px 5px 15px;\` — top, right, bottom, left, clockwise from the top
- \`margin: 0 auto;\` — the classic trick for ==horizontally centering== a block element with a set width
- **Negative** margins are legal and pull an element *closer* to (or overlapping) its neighbors
- Adjacent **vertical** margins between sibling elements can ==collapse== into just the larger of the two, rather than adding together`,
  longExplanation: `\`margin\` is the outermost layer of the box model — transparent space that sits outside an element's border and pushes its neighbors away, without ever painting a background color of its own.

The shorthand accepts one to four length values, and the number of values changes what they mean:

- **One value** — \`margin: 10px\` — applies to all four sides equally
- **Two values** — \`margin: 10px 20px\` — the first is **top and bottom**, the second is **left and right**
- **Three values** — \`margin: 10px 20px 5px\` — **top**, then **left and right**, then **bottom**
- **Four values** — \`margin: 10px 20px 5px 15px\` — **top, right, bottom, left**, always clockwise starting from the top (a useful mnemonic: **TRBL**, "trouble")

Each side also has its own longhand — \`margin-top\`, \`margin-right\`, \`margin-bottom\`, \`margin-left\` — for setting or overriding just one side without repeating the whole shorthand.

One of margin's most practical uses is **horizontal centering**: given a block-level element with an explicit \`width\` (or \`max-width\`), \`margin: 0 auto\` tells the browser to compute the left and right margins automatically, splitting the remaining horizontal space evenly on both sides — which visually centers the element within its parent. This only works for horizontal centering of a block element with a constrained width; it does *not* center an element vertically, and it does nothing if the element's width is left to its default of filling the full available space (there'd be no leftover space to split).

Margins can also be **negative**. A negative margin pulls an element *toward* — or even past — its neighbor, effectively overlapping it: \`margin-top: -10px\` shifts an element ten pixels up into whatever is above it. This is a genuinely useful technique for deliberate overlaps (a badge hanging off the corner of a card, an avatar overlapping a banner image) but easy to misuse — reaching for a negative margin to "fix" unwanted spacing elsewhere is usually a sign the *actual* spacing rule causing the gap deserves a closer look instead.

**Margin collapsing** is the single most distinctive — and most confusing the first time you meet it — behavior unique to margin. When two **vertical** margins meet between adjacent sibling block elements (one element's \`margin-bottom\` touching the next element's \`margin-top\`), they do **not** add together the way you might expect. Instead, the browser collapses them into a single margin equal to the **larger** of the two. Given a paragraph with \`margin-bottom: 20px\` immediately followed by another paragraph with \`margin-top: 30px\`, the actual visible gap between them is **30px** — not 50px. This collapsing only happens for **vertical** margins between elements in normal document flow (never horizontal margins, and never for elements using flexbox or grid layout, where collapsing doesn't apply at all) — which is one more reason flex and grid containers feel more predictable to space out than plain block-flow layouts. Margin collapsing can also happen between a parent and its first/last child in certain cases, which is a common source of "why is there unexpected space above my container" bugs — usually solved by giving the parent a small amount of padding or a border, either of which stops the collapse.

The practical takeaway: use margin for spacing *between* elements (where collapsing and \`auto\`-centering are genuinely useful tools), and reach for padding instead when the goal is spacing *inside* one element's own box, where none of margin's special collapsing behavior applies.`,
  examples: [
    {
      id: "shorthand-value-counts",
      title: "1, 2, and 4-value margin shorthand",
      summary: "The same box shown with all-sides, vertical/horizontal, and per-side (TRBL) margin shorthand.",
      code: `function App() {
  const chip = { backgroundColor: "#c7d2fe", padding: 8, borderRadius: 4, display: "inline-block", fontSize: 12 };

  return (
    <div style={{ display: "grid", gap: 4, backgroundColor: "#f9fafb", padding: 10 }}>
      <div style={{ ...chip, margin: 20 }}>margin: 20px (all sides)</div>
      <div style={{ ...chip, margin: "8px 40px" }}>margin: 8px 40px (vertical, horizontal)</div>
      <div style={{ ...chip, margin: "4px 60px 4px 8px" }}>margin: 4px 60px 4px 8px (T R B L)</div>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "margin-auto-centering",
      title: "margin: 0 auto for horizontal centering",
      summary: "A fixed-width box centers itself in its parent once left/right margins are set to auto.",
      code: `function App() {
  return (
    <div style={{ backgroundColor: "#f3f4f6", padding: 16, width: "100%" }}>
      <div style={{ width: 220, margin: "0 auto", backgroundColor: "#0ea5e9", color: "white", padding: 14, borderRadius: 6, textAlign: "center" }}>
        width: 220px, margin: 0 auto
      </div>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "negative-margin-overlap",
      title: "A negative margin pulling an element over its neighbor",
      summary: "A badge with a negative top/right margin deliberately overlaps the card above it.",
      code: `function App() {
  return (
    <div style={{ display: "flex", justifyContent: "center", paddingTop: 30 }}>
      <div style={{ position: "relative", width: 220, backgroundColor: "#1f2937", color: "white", padding: 16, borderRadius: 10 }}>
        Card content
        <span
          style={{
            position: "absolute",
            top: -14,
            right: -14,
            marginTop: -0,
            backgroundColor: "#f43f5e",
            color: "white",
            fontSize: 11,
            fontWeight: 700,
            padding: "4px 8px",
            borderRadius: 999,
          }}
        >
          NEW
        </span>
      </div>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "margin-collapsing-demo",
      title: "Margin collapsing: 20px + 30px becomes 30px",
      summary: "Two stacked paragraphs' vertical margins collapse to the larger value instead of adding together.",
      code: `function CollapseStyles() {
  return (
    <style>{\`
      .collapse-a { margin-bottom: 20px; background: #fee2e2; padding: 8px; }
      .collapse-b { margin-top: 30px; background: #dbeafe; padding: 8px; }
    \`}</style>
  );
}

function App() {
  return (
    <div>
      <CollapseStyles />
      <p className="collapse-a">Paragraph A — margin-bottom: 20px</p>
      <p className="collapse-b">Paragraph B — margin-top: 30px</p>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        The visible gap between A and B is 30px (the larger margin), not 50px —
        this is margin collapsing.
      </p>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
