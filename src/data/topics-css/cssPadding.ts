import type { Topic } from "../../types";

export const cssPaddingTopic: Topic = {
  id: "css-padding",
  title: "CSS Padding",
  category: "CSS Box Model",
  shortExplanation: `\`padding\` sets the transparent space **inside** an element's border, between the border and the content.

- \`padding: 10px;\` — all four sides
- \`padding: 10px 20px;\` — vertical then horizontal
- \`padding: 10px 20px 5px 15px;\` — top, right, bottom, left (clockwise)
- Padding shares the element's own **background** — unlike margin, it's never transparent-to-the-page
- Padding ==adds to== an element's visible rendered size (under default box-sizing); margin creates space but isn't part of the box itself
- Padding never collapses — two adjacent padding values always simply add up`,
  longExplanation: `\`padding\` is the layer of the box model sitting directly *inside* the border, cushioning the content from the border's edge. Functionally it looks a lot like margin's shorthand — same 1-to-4-value syntax, same per-side longhands — but it behaves quite differently, and those differences are exactly what dictate when to reach for one over the other.

The shorthand follows the identical value-count rules as margin:

- **One value** — \`padding: 10px\` — all four sides
- **Two values** — \`padding: 10px 20px\` — **top/bottom**, then **left/right**
- **Three values** — \`padding: 10px 20px 5px\` — **top**, **left/right**, **bottom**
- **Four values** — \`padding: 10px 20px 5px 15px\` — **top, right, bottom, left**, clockwise from the top

And the same per-side longhands exist: \`padding-top\`, \`padding-right\`, \`padding-bottom\`, \`padding-left\`.

The first real difference from margin is visual: padding always shares the element's own \`background-color\` (and \`background-image\`) — the background fills the content **and** the padding area, right up to the inner edge of the border. Margin, by contrast, is always fully transparent, showing whatever sits behind the entire box. This is precisely why padding is the tool for "space *inside* a box" — a button's background needs to extend under the breathing room around its label, not stop short of it — while margin is the tool for "space *between* boxes," where you generally want the page or parent's own background to show through untouched.

The second difference is about sizing. Under the browser's default \`box-sizing: content-box\`, padding is **added on top of** an element's set \`width\`/\`height\`, meaningfully increasing its total rendered footprint — a \`200px\`-wide box with \`20px\` of padding on each side renders at \`240px\` wide overall (before even counting any border). Margin, meanwhile, never affects an element's *own* measured size at all — it only affects the gap between that box and its neighbors. This is why unexpectedly large boxes in a layout are so often traced back to padding rather than margin, and it's exactly the problem \`box-sizing: border-box\` (its own topic) exists to solve, by making \`width\` describe the total size, padding included.

The third, and perhaps most important, difference is that **padding never collapses**. Margin has that special, easy-to-forget behavior where two adjacent *vertical* margins merge into just the larger one instead of stacking. Padding has no such rule, ever — two padding values in any context always simply do exactly what their numbers say, adding to the total space exactly as written, with no adjacent-element interaction to account for. This makes padding considerably more predictable to reason about, which is one more reason to prefer it for spacing *within* a single element rather than trying to simulate internal spacing with margins on children.

A useful mental shortcut that captures all three differences at once: **padding is spacing that belongs to the box itself** (it shows the box's background, it counts toward the box's size, and it behaves consistently) **while margin is spacing that exists between boxes** (it's transparent, it doesn't count toward either box's own size, and adjacent vertical instances of it can merge). Reaching for the right one is mostly a matter of asking: "is this gap conceptually part of this element, or is it the distance to the next one?"`,
  examples: [
    {
      id: "padding-shorthand-values",
      title: "1, 2, and 4-value padding shorthand",
      summary: "The same colored box shown with all-sides, vertical/horizontal, and per-side padding.",
      code: `function App() {
  const box = { backgroundColor: "#fef08a", display: "inline-block", border: "1px solid #ca8a04" };

  return (
    <div style={{ display: "grid", gap: 12 }}>
      <div style={{ ...box, padding: 24 }}>padding: 24px (all sides)</div>
      <div style={{ ...box, padding: "8px 40px" }}>padding: 8px 40px (vertical, horizontal)</div>
      <div style={{ ...box, padding: "4px 40px 20px 8px" }}>padding: 4px 40px 20px 8px (T R B L)</div>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "padding-shares-background",
      title: "Padding shares the background; margin never does",
      summary: "The colored fill extends through the padding right up to the border — margin around it stays transparent.",
      code: `function App() {
  return (
    <div style={{ backgroundColor: "#e5e7eb", padding: 20 }}>
      <div style={{ backgroundColor: "#4ade80", padding: 24, margin: 24, borderRadius: 6, border: "2px solid #166534" }}>
        The green background fills all the way to the border (through the padding).
        The gray you see outside the border is the parent's background showing
        through this box's transparent margin.
      </div>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "padding-adds-to-size",
      title: "Padding enlarges the rendered box; margin doesn't",
      summary: "Two boxes with an identical width — one with padding added grows visibly larger than the other.",
      code: `function App() {
  return (
    <div style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
      <div style={{ width: 160, backgroundColor: "#bfdbfe", border: "2px solid #1d4ed8" }}>
        width: 160px, no padding
      </div>
      <div style={{ width: 160, padding: 20, backgroundColor: "#bfdbfe", border: "2px solid #1d4ed8" }}>
        width: 160px, padding: 20px — visibly wider overall (160 + 40)
      </div>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "padding-never-collapses",
      title: "Padding never collapses — it always adds up",
      summary: "Nested boxes' padding stacks exactly as written, with no merging behavior like margin has.",
      code: `function App() {
  return (
    <div style={{ backgroundColor: "#fde68a", padding: 20 }}>
      <div style={{ backgroundColor: "#fca5a5", padding: 20 }}>
        <div style={{ backgroundColor: "white", padding: 20, textAlign: "center", fontWeight: 600 }}>
          20px + 20px + 20px of padding, each layer, all fully additive
        </div>
      </div>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
