import type { Topic } from "../../types";

export const cssFlexboxItemsTopic: Topic = {
  id: "css-flexbox-items",
  title: "CSS Flexbox: Items",
  category: "CSS Flexbox & Grid",
  shortExplanation: `While the flex **container** controls overall alignment, individual flex ==items== can override how they personally behave using their own properties.

- \`flexGrow\` — how much of the *extra* space an item should claim, relative to its siblings
- \`flexShrink\` — how much an item should shrink when there isn't enough space
- \`flexBasis\` — the item's starting size before growing/shrinking is applied
- \`flex\` — a shorthand combining all three
- \`order\` and \`alignSelf\` — reordering and per-item cross-axis alignment`,
  longExplanation: `The previous topic covered properties written on the flex *container*. This one covers the properties written on the flex *items themselves* — the direct children of a flex container — which let any individual item opt out of the container's default behavior.

- \`flexBasis\` sets the item's **starting size** along the main axis, before any growing or shrinking happens. It behaves like \`width\` in a row container (or \`height\` in a column container), but takes priority over an explicit \`width\` when both are set, because it's specifically the flex layout algorithm's starting point.
- \`flexGrow\` is a **ratio**, not a pixel value. If every item has \`flexGrow: 1\`, any leftover space in the container is split evenly among them. If one item has \`flexGrow: 2\` while its siblings have \`flexGrow: 1\`, that item claims twice as much of the *leftover* space — not twice its total size. An item with \`flexGrow: 0\` (the default) never grows past its \`flexBasis\`.
- \`flexShrink\` is the mirror image for when there **isn't** enough space: it's a ratio describing how much an item gives up relative to its siblings when the container is too small to fit everyone at their \`flexBasis\`. \`flexShrink: 0\` pins an item at its base size, refusing to shrink even if others do — useful for a fixed-width icon next to text that should wrap or truncate instead.
- \`flex\` is the shorthand almost everyone actually uses: \`flex: "1 1 0%"\` (grow, shrink, basis) or simply \`flex: 1\`, which is shorthand for "take an equal share of all available space, ignore your natural content size." Three common patterns are worth memorizing: \`flex: "1"\` (grow and shrink equally, ideal for fluid columns), \`flex: "0 0 auto"\` (never grow or shrink — stay exactly your natural size, common for fixed-width sidebars or icons), and \`flex: "0 1 200px"\` (start at 200px, allowed to shrink but never grow).
- \`order\` changes the **visual** order items are painted in without touching the underlying markup (or, in React, without touching the actual array/JSX order). It defaults to \`0\`, and items are sorted by this number, lowest first, with ties broken by source order. This is purely visual — screen readers and tab order still follow the original DOM order, which is why \`order\` should be used sparingly and never to fix accessibility problems.
- \`alignSelf\` overrides the container's \`alignItems\` for **one specific item**, taking the same values (\`"flex-start"\`, \`"center"\`, \`"flex-end"\`, \`"stretch"\`). It's how you push a single button to the bottom of a card while everything else stays top-aligned, without restructuring the layout.

A common gotcha: \`flexGrow\`/\`flexShrink\`/\`flexBasis\` only matter *along the main axis* — in a row container they affect width, and in a column container they affect height. If a layout that "should" be growing seems stuck, checking \`flexDirection\` on the parent is usually the fix. All of these translate directly to camelCase React style properties, so no \`<style>\` tag is needed for anything in this topic.`,
  examples: [
    {
      id: "flex-grow-ratios",
      title: "flexGrow claims leftover space proportionally",
      summary: "Three items with grow ratios 1, 2, 1 — the middle one claims twice the extra space.",
      code: `function App() {
  const item = { background: "#2563eb", color: "white", padding: 10, borderRadius: 6, textAlign: "center" };
  return (
    <div style={{ display: "flex", gap: 8, background: "#f3f4f6", padding: 10, borderRadius: 8 }}>
      <div style={{ ...item, flexGrow: 1 }}>flexGrow: 1</div>
      <div style={{ ...item, flexGrow: 2, background: "#1d4ed8" }}>flexGrow: 2</div>
      <div style={{ ...item, flexGrow: 1 }}>flexGrow: 1</div>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "flex-shorthand-patterns",
      title: "Three common flex shorthand patterns",
      summary: "A fixed sidebar, a fluid main area, and a fixed-but-shrinkable footer note, side by side.",
      code: `function App() {
  return (
    <div style={{ display: "flex", gap: 8, background: "#111827", padding: 10, borderRadius: 8, color: "white" }}>
      <div style={{ flex: "0 0 80px", background: "#374151", padding: 10, borderRadius: 6 }}>
        flex: "0 0 80px"
        <div style={{ fontSize: 11, opacity: 0.7 }}>fixed width</div>
      </div>
      <div style={{ flex: "1", background: "#2563eb", padding: 10, borderRadius: 6 }}>
        flex: "1"
        <div style={{ fontSize: 11, opacity: 0.8 }}>fills remaining space</div>
      </div>
      <div style={{ flex: "0 1 120px", background: "#374151", padding: 10, borderRadius: 6 }}>
        flex: "0 1 120px"
        <div style={{ fontSize: 11, opacity: 0.7 }}>starts at 120px, can shrink</div>
      </div>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "order-reordering",
      title: "Reordering items visually with order",
      summary: "The JSX defines items 1, 2, 3 in that order — order property rearranges how they're painted.",
      code: `function App() {
  const [swapped, setSwapped] = useState(false);
  const base = { padding: 16, borderRadius: 6, color: "white", textAlign: "center", flex: 1 };
  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={() => setSwapped((s) => !s)} style={{ justifySelf: "start" }}>
        Toggle order
      </button>
      <div style={{ display: "flex", gap: 8 }}>
        <div style={{ ...base, background: "#2563eb", order: swapped ? 3 : 1 }}>First in markup</div>
        <div style={{ ...base, background: "#16a34a", order: 2 }}>Second in markup</div>
        <div style={{ ...base, background: "#dc2626", order: swapped ? 1 : 3 }}>Third in markup</div>
      </div>
      <p style={{ fontSize: 13, color: "#6b7280", margin: 0 }}>
        The markup order never changes — only the "order" style property does.
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "align-self-override",
      title: "alignSelf overrides the container's alignItems",
      summary: "Every card stretches to full height except one, which opts itself out with alignSelf.",
      code: `function App() {
  const card = { background: "#f3f4f6", padding: 12, borderRadius: 8, width: 90 };
  return (
    <div style={{ display: "flex", alignItems: "stretch", gap: 10, height: 140, background: "#e5e7eb", padding: 10, borderRadius: 10 }}>
      <div style={card}>Stretch (default)</div>
      <div style={{ ...card, alignSelf: "center" }}>alignSelf: "center"</div>
      <div style={card}>Stretch (default)</div>
      <div style={{ ...card, alignSelf: "flex-end" }}>alignSelf: "flex-end"</div>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
