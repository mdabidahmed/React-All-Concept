import type { Topic } from "../../types";

export const cssTextTopic: Topic = {
  id: "css-text",
  title: "CSS Text",
  category: "CSS Text & Typography",
  shortExplanation: `CSS gives you direct control over how text *looks* and *reads* — color, alignment, decoration, casing, spacing, and shadow all have their own dedicated properties.

- \`color\` sets the text color
- \`text-align\`: \`left\`, \`center\`, \`right\`, or \`justify\`
- \`text-decoration\`: \`underline\`, \`line-through\`, or \`none\` — plus its own \`-color\`, \`-style\`, and \`-thickness\`
- \`text-transform\`: \`uppercase\`, \`lowercase\`, or \`capitalize\` — changes only how text *displays*, never the underlying string
- \`letter-spacing\` and \`line-height\` control horizontal and vertical breathing room
- \`text-shadow\` adds depth, a glow, or an emboss effect behind characters`,
  longExplanation: `Text is the most common thing CSS ever styles, so it has an unusually large toolbox dedicated to it. Most of these properties are independent of each other and can be freely combined on the same element.

\`color\` is the simplest — it sets the color of the text itself (not the background; that's \`background-color\`). It accepts any color notation: named colors, hex, \`rgb()\`, or \`hsl()\`.

\`text-align\` controls how text lines up *inside its own box*: \`left\` and \`right\` are self-explanatory, \`center\` centers each line, and \`justify\` stretches the spacing between words so every line (except the last) touches both edges, the way a printed newspaper column looks. It's important to remember \`text-align\` only affects inline content — it has no effect on the width or position of the block element itself, a common source of confusion when someone tries to use it to center a whole \`<div>\`.

\`text-decoration\` is actually a shorthand for several longhand properties: \`text-decoration-line\` (\`underline\`, \`line-through\`, \`overline\`, or \`none\`), \`text-decoration-color\` (a different color than the text itself), \`text-decoration-style\` (\`solid\`, \`dashed\`, \`dotted\`, \`double\`, \`wavy\` — the wavy squiggle used for spell-check underlines is this), and \`text-decoration-thickness\` (how thick the line is drawn). Setting just \`text-decoration: none\` is one of the most common CSS rules in existence, used to strip the default underline off links.

\`text-transform\` changes how text is *displayed* without touching the actual characters in the HTML or the DOM — \`uppercase\` renders "hello" as "HELLO", \`lowercase\` does the reverse, and \`capitalize\` upper-cases the first letter of each word. Because the underlying text is untouched, anything that reads the text content (copy-paste, screen readers in some cases, JavaScript's \`.textContent\`) still sees the original casing — this makes \`text-transform\` the correct tool for stylistic casing, rather than manually retyping strings in a different case.

\`letter-spacing\` adds (or, with a negative value, removes) horizontal space between characters — small positive values (\`0.05em\`–\`0.1em\`) are a classic technique for headings and all-caps labels, since capital letters set close together can feel cramped. \`line-height\` sets the height of each line box, which is what actually creates the vertical gap between wrapped lines of text — a unitless value like \`1.5\` is generally preferred over a fixed pixel value because it scales proportionally with the element's own \`font-size\` rather than staying fixed. Too tight a \`line-height\` (close to \`1\`) makes multi-line paragraphs hard to read; too loose and lines feel disconnected from each other.

\`text-shadow\` draws one or more shadows behind the text's characters, in the form \`text-shadow: offsetX offsetY blurRadius color\`. A small dark offset with no blur gives a crisp emboss/3D look; a larger blur with no offset gives a soft glow; multiple comma-separated shadows can be layered for more elaborate effects like a neon sign.

All of these properties are inherited by default, meaning a \`color\` or \`line-height\` set on a parent container flows down to its text-containing children unless something more specific overrides it — this is why setting base typography once on a high-level wrapper (or the \`body\`) is such a common pattern.`,
  examples: [
    {
      id: "text-align-values",
      title: "text-align: left, center, right, justify",
      summary: "The same paragraph of text laid out four different ways.",
      code: `function App() {
  const box = { border: "1px solid #d1d5db", borderRadius: 6, padding: 10, marginBottom: 8 };
  const text =
    "CSS lets you control how each line of text lines up inside its own box.";

  return (
    <div>
      <div style={{ ...box, textAlign: "left" }}>left: {text}</div>
      <div style={{ ...box, textAlign: "center" }}>center: {text}</div>
      <div style={{ ...box, textAlign: "right" }}>right: {text}</div>
      <div style={{ ...box, textAlign: "justify" }}>justify: {text} {text}</div>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "text-decoration-variations",
      title: "text-decoration line, color, style, and thickness",
      summary: "Underline, line-through, and none, plus a custom-colored wavy underline.",
      code: `function App() {
  const row = { padding: "6px 0", fontSize: 16 };

  return (
    <div>
      <p style={{ ...row, textDecoration: "underline" }}>Underlined text</p>
      <p style={{ ...row, textDecoration: "line-through" }}>Line-through text</p>
      <p style={{ ...row, textDecoration: "none", color: "#6b7280" }}>
        No decoration (this is how link underlines get removed)
      </p>
      <p
        style={{
          ...row,
          textDecorationLine: "underline",
          textDecorationColor: "#dc2626",
          textDecorationStyle: "wavy",
          textDecorationThickness: 2,
        }}
      >
        Custom underline: red, wavy, 2px thick
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "text-transform-values",
      title: "text-transform: uppercase, lowercase, capitalize",
      summary: "The exact same underlying string, displayed three different ways.",
      code: `function App() {
  const original = "the quick brown fox";
  const row = { padding: "6px 0", fontSize: 16 };

  return (
    <div>
      <p style={row}>Original string: "{original}"</p>
      <p style={{ ...row, textTransform: "uppercase" }}>{original}</p>
      <p style={{ ...row, textTransform: "capitalize" }}>{original}</p>
      <p style={{ ...row, textTransform: "lowercase" }}>THE QUICK BROWN FOX</p>
      <p style={{ ...row, color: "#6b7280", fontSize: 13 }}>
        The underlying text never changes — only how it's displayed does.
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "spacing-and-shadow-heading",
      title: "letter-spacing, line-height, and text-shadow together",
      summary: "A styled heading and a paragraph that show all three properties working together.",
      code: `function App() {
  return (
    <div style={{ display: "grid", gap: 16 }}>
      <h2
        style={{
          margin: 0,
          fontSize: 28,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "#1e293b",
          textShadow: "2px 2px 0px #cbd5e1",
        }}
      >
        Bold Heading
      </h2>

      <p style={{ maxWidth: 360, lineHeight: 1.8, color: "#374151" }}>
        A generous line-height (1.8 here) gives wrapped lines room to breathe,
        which makes longer paragraphs noticeably easier to read than text set
        with a tight, cramped line-height.
      </p>

      <p
        style={{
          fontSize: 32,
          fontWeight: 700,
          color: "#0ea5e9",
          textShadow: "0 0 8px rgba(14,165,233,0.6)",
        }}
      >
        Glowing text
      </p>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
