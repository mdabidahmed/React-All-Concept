import type { Topic } from "../../types";

export const cssDisplayTopic: Topic = {
  id: "css-display",
  title: "CSS Display",
  category: "CSS Layout & Positioning",
  shortExplanation: `\`display\` controls the fundamental way an element participates in layout — it's arguably the single most consequential CSS property.

- \`block\` — starts on its own new line, fills the parent's width, and *does* respect \`width\`/\`height\`/vertical \`margin\`
- \`inline\` — flows inside a line of text, ignores \`width\`/\`height\` entirely, and vertical margin/padding don't push other lines away
- \`inline-block\` — flows like inline, but *does* respect \`width\`/\`height\`/margin like block
- \`none\` — removed entirely; takes up ==no space== at all, as if it didn't exist
- \`flex\`/\`grid\` — turn an element into a layout container whose children follow flexbox/grid rules instead (their own dedicated topics)`,
  longExplanation: `Every HTML element has a default \`display\` value baked into the browser's built-in stylesheet, and that value is what decides the element's most basic layout behavior — before any other CSS property even comes into play. Understanding \`display\` is foundational because it determines *whether* properties like \`width\`, \`height\`, and vertical \`margin\` do anything at all.

**\`block\`** is the default for elements like \`<div>\`, \`<p>\`, \`<h1>\`-\`<h6>\`, and \`<section>\`. A block element always starts on a new line, stacking vertically with its siblings, and by default stretches to fill 100% of its parent's available width regardless of its content. Critically, block elements fully respect \`width\`, \`height\`, and margin/padding on *all four sides* — vertical margin included, which is also why block elements are the ones subject to margin collapsing (covered in the Margins topic).

**\`inline\`** is the default for elements like \`<span>\`, \`<a>\`, \`<strong>\`, and \`<em>\` — anything meant to sit *within* a run of text rather than interrupt it. Inline elements flow left-to-right (or per the writing direction) alongside other inline content and text, wrapping onto new lines automatically like words do, and never force a line break themselves. The tradeoff: inline elements **ignore \`width\` and \`height\` completely** — they're always exactly as wide and tall as their content requires — and vertical padding/margin, while they might visually appear to add space, don't actually push surrounding lines of text away from them; only horizontal padding/margin reliably affects layout on an inline element.

**\`inline-block\`** exists specifically to combine the best of both: an element with \`display: inline-block\` flows *inline* with its neighbors — sitting side by side on the same line rather than each forcing a new one — while still respecting \`width\`, \`height\`, and margin/padding on every side exactly like a block element would. This was the standard technique for laying out horizontal button rows and simple grids before flexbox existed, and it's still useful today for smaller cases that don't need flexbox's full alignment toolkit. It comes with one well-known quirk: adjacent inline-block elements written with whitespace (a newline or space) between them in the HTML/JSX source pick up a small, seemingly mysterious gap, because that whitespace itself is treated as inline content — its own dedicated topic covers the fixes.

**\`none\`** removes an element from the page entirely — no space is reserved for it, as if the element were never in the DOM at all, which is the key difference from \`visibility: hidden\` (a different property, covered elsewhere) that hides an element visually but *still* reserves its layout space. \`display: none\` is the standard way to conditionally show/hide UI — collapsed accordion panels, closed modals, tabs that aren't currently active.

Finally, **\`flex\`** and **\`grid\`** are a different category of value altogether: rather than describing how the element *itself* behaves among its siblings, they turn the element into a *layout container*, switching on an entirely different set of rules (flexbox or CSS grid) for how *its children* are sized, spaced, and aligned. These two values are powerful enough, and used often enough, that they each warrant — and get — their own dedicated topics; the short version here is simply that \`display\` is also the on/off switch for those two modern layout systems, not just the classic block/inline/inline-block/none distinctions.`,
  examples: [
    {
      id: "block-vs-inline-basics",
      title: "Block starts a new line; inline flows with text",
      summary: "Two divs (block) stack vertically; two spans (inline) sit side by side within the same line.",
      code: `function App() {
  return (
    <div style={{ display: "grid", gap: 16 }}>
      <div>
        <p style={{ margin: "0 0 4px", fontSize: 12, color: "#6b7280" }}>display: block (default for div)</p>
        <div style={{ background: "#bfdbfe", padding: 6 }}>Block A</div>
        <div style={{ background: "#93c5fd", padding: 6 }}>Block B — starts on its own new line</div>
      </div>
      <div>
        <p style={{ margin: "0 0 4px", fontSize: 12, color: "#6b7280" }}>display: inline (default for span)</p>
        <span style={{ background: "#fde68a", padding: 6 }}>Inline A</span>
        <span style={{ background: "#fcd34d", padding: 6 }}>Inline B — sits right next to A</span>
      </div>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "inline-ignores-width-height",
      title: "inline ignores width/height; inline-block respects them",
      summary: "Setting width and height on an inline element has no effect; the same values work on inline-block.",
      code: `function App() {
  return (
    <div style={{ display: "flex", gap: 16 }}>
      <span style={{ display: "inline", width: 150, height: 80, background: "#fca5a5", padding: 8 }}>
        display: inline — width/height ignored
      </span>
      <span style={{ display: "inline-block", width: 150, height: 80, background: "#86efac", padding: 8 }}>
        display: inline-block — width/height respected
      </span>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "display-none-removes-space",
      title: "display: none removes the element's space entirely",
      summary: "Toggling a box's display between block and none — its neighbor jumps to fill the gap.",
      code: `import { useState } from "react";

function App() {
  const [hidden, setHidden] = useState(false);
  return (
    <div>
      <button onClick={() => setHidden((h) => !h)} style={{ marginBottom: 12 }}>
        {hidden ? "Show" : "Hide"} the middle box
      </button>
      <div style={{ display: "flex", gap: 8 }}>
        <div style={{ background: "#93c5fd", padding: 12 }}>Box A</div>
        <div style={{ display: hidden ? "none" : "block", background: "#fca5a5", padding: 12 }}>Box B</div>
        <div style={{ background: "#86efac", padding: 12 }}>Box C</div>
      </div>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "display-flex-preview",
      title: "display: flex turns children into a flex layout (preview)",
      summary: "Switching a container's display to flex instantly changes how its children arrange themselves.",
      code: `function App() {
  const item = { background: "#ddd6fe", padding: 12, borderRadius: 6 };
  return (
    <div>
      <p style={{ fontSize: 12, color: "#6b7280", marginBottom: 4 }}>
        display: flex — children line up in a row and can be aligned (full topic covers this separately)
      </p>
      <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
        <div style={item}>One</div>
        <div style={item}>Two</div>
        <div style={item}>Three</div>
      </div>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
