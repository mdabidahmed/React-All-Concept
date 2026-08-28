import type { Topic } from "../../types";

export const cssInlineBlockTopic: Topic = {
  id: "css-inline-block",
  title: "CSS Inline-Block",
  category: "CSS Layout & Positioning",
  shortExplanation: `\`display: inline-block\` combines the two worlds covered in the Display topic: elements sit ==side by side== on the same line, like inline elements, while still fully respecting \`width\`, \`height\`, and margin/padding on every side, like block elements.

- Before flexbox existed, this was the standard way to build a horizontal row of nav links or buttons
- The well-known gotcha: whitespace (a newline or space) *between* inline-block elements in the source renders as a small visible gap
- That gap is commonly removed by eliminating the whitespace in the source, or by setting \`font-size: 0\` on the parent`,
  longExplanation: `\`inline-block\` sits deliberately between \`inline\` and \`block\`, taking one property from each. Like an inline element, it doesn't force a line break — several inline-block elements written next to each other in the source sit side by side on the same line, wrapping onto a new line only when they run out of horizontal room, exactly like words in a sentence. But like a block element, it fully honors \`width\`, \`height\`, and margin/padding on *every* side — including vertical margin, which a plain \`inline\` element notably does not reliably respect.

This combination made \`inline-block\` the standard technique, for many years before flexbox arrived, for laying out a horizontal row of same-sized items that still needed real dimensions: a navigation bar's links, a row of buttons, or a simple grid of image thumbnails. Each item could be given an explicit \`width\`, \`height\`, and \`padding\` — none of which a plain \`inline\` element would respect — while still flowing naturally next to its siblings without needing \`float\` and its collapsing-parent complications, or \`display: flex\`, which didn't yet exist in older browsers.

The one persistently confusing quirk of \`inline-block\` is the **whitespace gap**: if inline-block elements are written in the HTML/JSX source with a space, tab, or newline between their closing and opening tags — which is the natural, readable way to format markup — that whitespace is itself treated as inline content (much like a space between two words), and renders as a small visible gap between the elements, typically around 4px depending on the font size. This surprises people because the gap has no corresponding CSS property causing it — it comes purely from formatting whitespace in the markup, and disappears if the elements are written with no whitespace between them at all (e.g., \`<div>A</div><div>B</div>\` on a single unbroken line), which hurts source readability as a fix.

Two more targeted fixes exist for teams that want to keep readable, whitespace-formatted markup: setting \`font-size: 0\` on the *parent* container (since the gap's size is proportional to font-size, a zero font-size collapses the gap to nothing — though the font-size then has to be reset on each child, since font-size doesn't otherwise affect layout width/height directly), or simply removing the whitespace with an HTML comment placed between the tags (\`</div><!--\n--><div>\`), which is uglier but works without touching font-size at all. In React/JSX code specifically, this gap is less commonly encountered in practice because JSX often renders elements from a \`.map()\` call or without meaningful literal whitespace between tags — but it can still appear, and is worth recognizing on sight rather than mistaking it for a margin or padding bug.

In modern CSS, flexbox has taken over almost all of \`inline-block\`'s old layout responsibilities — a flex container achieves the same side-by-side result without any whitespace-gap quirk at all, and with far more control over alignment and spacing (via \`gap\`, \`justify-content\`, etc.). \`inline-block\` remains genuinely useful today mainly for smaller, self-contained cases: an element that needs to flow naturally within a line of text (unlike flex items, which always break out of inline text flow) while still needing an explicit width or height — a small badge or tag sitting inline with a sentence, for instance.`,
  examples: [
    {
      id: "inline-block-nav-row",
      title: "A pre-flexbox nav row built with inline-block",
      summary: "Each link gets real width/height/padding while still sitting side by side on one line.",
      code: `function App() {
  const link = {
    display: "inline-block",
    width: 90,
    padding: "10px 0",
    textAlign: "center",
    background: "#e0e7ff",
    borderRadius: 6,
    marginRight: 8,
    fontWeight: 600,
    color: "#3730a3",
  };
  return (
    <nav>
      <span style={link}>Home</span>
      <span style={link}>Docs</span>
      <span style={link}>Pricing</span>
    </nav>
  );
}

render(<App />);`,
    },
    {
      id: "whitespace-gap-gotcha",
      title: "The whitespace gap between inline-block elements",
      summary: "Two boxes written with a newline between them show a small gap; removing the whitespace closes it.",
      code: `function App() {
  return (
    <div style={{ display: "grid", gap: 16 }}>
      <div>
        <p style={{ fontSize: 12, marginBottom: 4 }}>Written with whitespace between tags — small gap appears</p>
        <div style={{ background: "#f3f4f6", padding: 4 }}>
          <div style={{ display: "inline-block", width: 80, height: 40, background: "#93c5fd" }} />
          <div style={{ display: "inline-block", width: 80, height: 40, background: "#fca5a5" }} />
        </div>
      </div>
      <div>
        <p style={{ fontSize: 12, marginBottom: 4 }}>Parent has font-size: 0 — gap collapses to nothing</p>
        <div style={{ background: "#f3f4f6", padding: 4, fontSize: 0 }}>
          <div style={{ display: "inline-block", width: 80, height: 40, background: "#93c5fd" }} />
          <div style={{ display: "inline-block", width: 80, height: 40, background: "#fca5a5" }} />
        </div>
      </div>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "inline-block-within-text",
      title: "inline-block flowing naturally within a sentence",
      summary: "A sized badge sits inline with surrounding text, something a flex item cannot do.",
      code: `function App() {
  return (
    <p style={{ lineHeight: 2 }}>
      Your order status is{" "}
      <span
        style={{
          display: "inline-block",
          width: 80,
          textAlign: "center",
          background: "#16a34a",
          color: "white",
          borderRadius: 4,
          padding: "2px 0",
          fontSize: 12,
          fontWeight: 700,
        }}
      >
        SHIPPED
      </span>{" "}
      as of this morning.
    </p>
  );
}

render(<App />);`,
    },
  ],
};
