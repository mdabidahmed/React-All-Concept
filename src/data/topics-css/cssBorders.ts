import type { Topic } from "../../types";

export const cssBordersTopic: Topic = {
  id: "css-borders",
  title: "CSS Borders",
  category: "CSS Basics",
  shortExplanation: `A border is built from three pieces — **style**, **width**, and **color** — usually combined into one \`border\` shorthand.

- \`border-style\`: \`solid\`, \`dashed\`, \`dotted\`, \`double\`, ... — with no style set, a border is ==invisible== even if width/color are set
- \`border-width\` and \`border-color\` — thickness and color
- \`border: 2px solid #333;\` — the shorthand combining all three, in any order
- Per-side control: \`border-top\`, \`border-right\`, \`border-bottom\`, \`border-left\`
- \`border-radius\` rounds the corners — a percentage value (like \`50%\`) turns a square into a ==circle==`,
  longExplanation: `A border is a visible line drawn around an element's padding, sitting between the padding and the margin in the box model. Three separate properties describe it, and understanding all three individually makes the shorthand — and its most common gotcha — obvious.

**\`border-style\`** decides what the line looks like: \`solid\` (one continuous line), \`dashed\` (evenly spaced dashes), \`dotted\` (a row of dots), \`double\` (two parallel lines with a gap), plus less common values like \`groove\`, \`ridge\`, \`inset\`, and \`outset\` that fake a 3D bevel effect. The default value is \`none\` — and this is the detail that trips people up most: **setting only \`border-width\` and \`border-color\` produces no visible border at all**, because with no style, there's nothing to render. A style must always be set for a border to appear.

**\`border-width\`** sets the thickness, in any length unit (\`1px\`, \`0.25rem\`) or one of the keywords \`thin\`/\`medium\`/\`thick\`. **\`border-color\`** accepts any color notation. Left unset, \`border-color\` actually defaults to the element's own text color (\`currentColor\`) — which is a handy, if easy-to-miss, default.

Rather than setting these three separately, the **\`border\`** shorthand combines them in a single declaration, in any order: \`border: 2px solid #2563eb;\` or equivalently \`border: solid 2px #2563eb;\` — CSS shorthands like this one accept their component values in flexible order because each value's *type* (a length, a keyword, a color) is unambiguous regardless of position.

Borders don't have to be uniform on all four sides. **Per-side longhands** — \`border-top\`, \`border-right\`, \`border-bottom\`, \`border-left\` — each accept the same style/width/color shorthand syntax, but apply to just one edge: \`border-bottom: 1px solid #e5e7eb;\` is the classic "underline" divider under a heading or list item, with the other three sides left borderless. Each side can even be further broken into \`border-top-style\`, \`border-top-width\`, \`border-top-color\` individually, though that level of granularity is rarely needed outside of very specific overrides.

**\`border-radius\`** rounds an element's corners, and it's technically unrelated to the style/width/color trio — it reshapes the *geometry* of all four border edges (and the background and content clipping along with them) rather than their appearance. A single value rounds all four corners equally: \`border-radius: 8px\` for a subtly rounded card, or \`border-radius: 50%\` on a square element to turn it into a perfect circle (50% of each dimension meets in the middle from every corner). Radius values can also be **elliptical** — two values separated by a slash, like \`border-radius: 50% / 20%\`, round the corners with a different horizontal and vertical curve, useful for pill and leaf-like shapes. And like the other border properties, each corner can be targeted individually: \`border-top-left-radius\`, \`border-top-right-radius\`, \`border-bottom-right-radius\`, \`border-bottom-left-radius\` — handy for a speech-bubble shape or a card that should only round its top two corners because it's flush against something else below.

Border-radius also accepts up to four values shorthand-style (top-left, top-right, bottom-right, bottom-left, following the same clockwise-from-top-left pattern as margin/padding), so \`border-radius: 12px 12px 0 0\` rounds only the top two corners of a card in one line.

A border always adds to an element's total rendered size under the default \`box-sizing\` — it sits outside the padding and inside the margin, which becomes especially relevant once \`box-sizing: border-box\` enters the picture (covered in its own topic) as the usual fix for borders unexpectedly enlarging a fixed-width box.`,
  examples: [
    {
      id: "border-styles",
      title: "border-style: solid, dashed, dotted, double",
      summary: "Four border-style keywords on otherwise identical boxes — width and color unchanged.",
      code: `function App() {
  const box = { width: 100, height: 70, borderWidth: 4, borderColor: "#4338ca", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12 };

  return (
    <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
      <div style={{ ...box, borderStyle: "solid" }}>solid</div>
      <div style={{ ...box, borderStyle: "dashed" }}>dashed</div>
      <div style={{ ...box, borderStyle: "dotted" }}>dotted</div>
      <div style={{ ...box, borderStyle: "double" }}>double</div>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "no-style-means-invisible",
      title: "Width + color without a style: invisible",
      summary: "The classic gotcha — border-width and border-color alone render nothing until border-style is set.",
      code: `function App() {
  const base = { width: 140, height: 70, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, textAlign: "center" };

  return (
    <div style={{ display: "flex", gap: 14 }}>
      <div style={{ ...base, borderWidth: 4, borderColor: "#dc2626" }}>
        width + color only — no visible border
      </div>
      <div style={{ ...base, borderWidth: 4, borderColor: "#dc2626", borderStyle: "solid" }}>
        + borderStyle: "solid" — now it shows
      </div>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "shorthand-and-per-side-borders",
      title: "The border shorthand and per-side borders",
      summary: "One border shorthand, plus a bottom-only divider border using borderBottom.",
      code: `function App() {
  return (
    <div style={{ display: "grid", gap: 14 }}>
      <div style={{ border: "3px solid #16a34a", borderRadius: 6, padding: 12 }}>
        border: "3px solid #16a34a" — all four sides via the shorthand
      </div>
      <div style={{ borderBottom: "2px solid #e5e7eb", paddingBottom: 8 }}>
        Only borderBottom is set — a common "divider under a heading" pattern
      </div>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "border-radius-shapes",
      title: "border-radius: cards, pills, and circles",
      summary: "Uniform, elliptical, and per-corner border-radius values shaping the same square box differently.",
      code: `function App() {
  const box = { width: 84, height: 84, backgroundColor: "#f97316", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: 11, textAlign: "center" };

  return (
    <div style={{ display: "flex", gap: 16, flexWrap: "wrap", alignItems: "center" }}>
      <div style={{ ...box, borderRadius: 8 }}>8px card</div>
      <div style={{ ...box, borderRadius: "50%" }}>50% circle</div>
      <div style={{ ...box, width: 140, height: 44, borderRadius: 999 }}>999px pill</div>
      <div style={{ ...box, borderRadius: "24px 24px 24px 4px" }}>4-corner mix</div>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
