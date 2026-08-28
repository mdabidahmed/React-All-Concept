import type { Topic } from "../../types";

export const cssBoxModelTopic: Topic = {
  id: "css-box-model",
  title: "CSS Box Model",
  category: "CSS Box Model",
  shortExplanation: `Every HTML element is rendered as a rectangular box made of ==four nested layers==, from the inside out:

- **Content** — the text/media itself, sized by \`width\`/\`height\`
- **Padding** — transparent space *inside* the border, cushioning the content
- **Border** — a visible (or invisible) line wrapping the padding
- **Margin** — transparent space *outside* the border, separating this box from its neighbors

An element's total rendered size (by default) is \`width/height + padding + border\` — margin creates spacing but isn't part of the box's own size.`,
  longExplanation: `Every single element the browser renders — a \`<div>\`, a \`<p>\`, a button — is treated as a rectangular box, and that box is always built from the same four concentric layers, from the inside out: **content**, **padding**, **border**, and **margin**. Understanding this model is foundational to nearly everything else in CSS layout, because \`width\`, \`height\`, spacing, and alignment all ultimately mean "how big is this box, and where does it sit relative to its neighbors."

**Content** is the innermost layer — the actual text, image, or child elements — and it's what \`width\` and \`height\` (or \`max-width\`, \`min-height\`, etc.) directly size, under the default box-sizing behavior. This is the "useful" area an element exists to display.

**Padding** is transparent space immediately *inside* the border, between the content and the border line. It pushes the border outward away from the content without adding any visible line of its own — think of it as internal breathing room, keeping text from crowding right up against a card's edge. Padding always shares the element's own background — if the box has a \`background-color\`, that color fills the padding area too, visibly, unlike margin.

**Border** is a line (or nothing, if unstyled) drawn at the boundary between padding and margin — it's the layer covered in detail in the CSS Borders topic, but the important thing here is *where* it sits: outside all the padding, but still fully part of the "box," not yet in the neutral space beyond it.

**Margin** is transparent space *outside* the border, and it's the odd one out in two ways. First, it never has a background — it's always fully transparent, showing whatever is behind the entire box. Second, unlike the other three layers, adjacent vertical margins between sibling elements can *collapse* into a single margin rather than stacking (covered in depth in the Margins topic) — a behavior unique to margin, which is part of why it's used for spacing *between* elements while padding is used for spacing *within* one.

**Computing total rendered size** is where the box model has real, practical consequences. By default (\`box-sizing: content-box\`, the browser default), setting \`width: 200px\` sizes only the *content* box — padding and border are added *on top of* that 200px, making the element's actual rendered footprint larger than the width you wrote: a \`width: 200px\` box with \`padding: 20px\` and a \`2px\` border on every side renders at \`200 + 20 + 20 + 2 + 2 = 244px\` wide in total. This surprises nearly everyone the first time they hit it — a row of boxes each given the same \`width\` plus some \`padding\` don't fit where expected, because the visible size is quietly larger than the number in the \`width\` declaration. (The \`box-sizing: border-box\` topic covers the near-universal fix: making \`width\` describe the *total* size, padding and border included.) Margin is never part of this calculation either way — it affects the *space around* a box, never the box's own measured size.

A useful way to build intuition: imagine picking up an element with your hand. Your fingers touch the border. Squeeze inward past the border and you find the padding, then the content. Step back from the border and the empty space before you reach the *next* box is the margin. Every layout technique in CSS — flexbox, grid, positioning — is still, underneath, arranging and sizing these same four-layer boxes; there's no fifth layer or exception hiding anywhere later in more "advanced" CSS.`,
  examples: [
    {
      id: "four-layers-labeled",
      title: "The four layers, labeled and visually nested",
      summary: "Content, padding, border, and margin rendered as visibly distinct, color-coded, nested regions.",
      code: `function App() {
  return (
    <div style={{ backgroundColor: "#fef3c7", padding: 30, display: "inline-block" }}>
      <p style={{ margin: "0 0 4px", fontSize: 11, color: "#92400e", fontWeight: 700 }}>MARGIN (transparent, shows page background)</p>
      <div style={{ backgroundColor: "#fca5a5", padding: 16, display: "inline-block" }}>
        <p style={{ margin: "0 0 4px", fontSize: 11, color: "#7f1d1d", fontWeight: 700 }}>BORDER area</p>
        <div style={{ border: "10px solid #b91c1c", backgroundColor: "#93c5fd", padding: 16 }}>
          <p style={{ margin: "0 0 4px", fontSize: 11, color: "#1e3a8a", fontWeight: 700 }}>PADDING (shares the background color)</p>
          <div style={{ backgroundColor: "white", padding: 14, borderRadius: 4, textAlign: "center", fontWeight: 700 }}>
            CONTENT
          </div>
        </div>
      </div>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "computing-total-size",
      title: "Computing an element's real rendered size",
      summary: "A 200px-wide box with padding and a border ends up visibly wider than 200px under default box-sizing.",
      code: `function App() {
  return (
    <div style={{ display: "grid", gap: 10 }}>
      <div
        style={{
          width: 200,
          padding: 20,
          border: "2px solid #4338ca",
          backgroundColor: "#e0e7ff",
        }}
      >
        width: 200px + padding: 20px (each side) + border: 2px (each side)
      </div>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        Rendered width = 200 + 20 + 20 + 2 + 2 = 244px, even though "width" only says 200px.
        Inspect this box in dev tools to see the full 244px take-up.
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "margin-vs-padding-background",
      title: "Margin never shows a background; padding always does",
      summary: "Same background color on both boxes — padding fills right up to the border, margin stays fully transparent.",
      code: `function App() {
  return (
    <div style={{ backgroundColor: "#f9fafb", padding: 16 }}>
      <div style={{ backgroundColor: "#34d399", padding: 24, margin: 24, borderRadius: 6, display: "inline-block" }}>
        The green fills the padding area right up to this box's edge.
        <br />
        The gray you see AROUND this box is the page background showing through
        the (always transparent) margin.
      </div>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
