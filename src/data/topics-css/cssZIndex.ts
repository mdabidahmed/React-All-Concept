import type { Topic } from "../../types";

export const cssZIndexTopic: Topic = {
  id: "css-z-index",
  title: "CSS Z-Index",
  category: "CSS Layout & Positioning",
  shortExplanation: `\`z-index\` controls *stacking order* — which overlapping element renders in front when boxes visually overlap.

- Higher \`z-index\` values render **in front of** lower ones
- \`z-index\` only has any effect on elements with \`position\` set to something other than \`static\`
- Without an explicit \`z-index\`, later elements in the HTML/JSX source stack on top of earlier ones
- A positioned element with a \`z-index\` creates its own ==stacking context== — its children's z-index values are only compared *among themselves*, never directly against elements outside that context

This last rule is why a child with an enormous \`z-index\` can still end up hidden behind a completely unrelated element — the comparison that matters is between stacking *contexts*, not raw numbers.`,
  longExplanation: `When two elements visually overlap on the page, the browser needs a rule for which one appears drawn "in front." By default, without any \`z-index\` at all, that rule is simple: elements later in the document (HTML/JSX source order) stack on top of elements earlier in it, as if each new element is painted over whatever came before. \`z-index\` lets that default be overridden explicitly — an element with a higher \`z-index\` value renders in front of one with a lower value, regardless of source order.

The first rule that catches almost everyone off guard: **\`z-index\` only works on positioned elements** — anything with \`position: relative\`, \`absolute\`, \`fixed\`, or \`sticky\`. Setting \`z-index: 999\` on an element that still has the default \`position: static\` does nothing at all; the browser silently ignores it. This trips people up constantly, because the error is invisible — there's no warning, the element just doesn't reorder, and it's easy to spend a while adjusting the number higher and higher before realizing the actual problem is a missing \`position\` declaration.

The second, subtler rule is about **stacking contexts**. Every positioned element that has an explicit \`z-index\` (and several other properties, like \`opacity\` less than 1, or a \`transform\`) creates a new, self-contained stacking context for its own descendants. Inside that context, children's \`z-index\` values are compared *only against each other* — the entire context, as a single unit, is then compared against sibling elements *outside* it using the z-index of the context-creating parent itself, not the highest z-index of anything nested inside it. This is why a deeply nested child with \`z-index: 99999\` can still visually render *behind* a completely different, seemingly unrelated element on the page: if that child's ancestor stacking context has a lower z-index than the other element, the entire context — including everything inside it, no matter how large its internal z-index values are — stays behind. The fix is almost always to raise the z-index on the *ancestor* that owns the stacking context, not the deeply nested child.

In practice, most z-index bugs come down to one of these two rules: either the element isn't positioned at all, or it's trapped inside a lower-stacked parent context. A third practical habit worth adopting: rather than picking arbitrary huge numbers (\`z-index: 9999\`) wherever a stacking problem shows up, most real projects settle on a small, deliberate scale (\`10\` for dropdowns, \`100\` for a sticky header, \`1000\` for a modal overlay, for example) so that stacking relationships across the whole app stay predictable and don't turn into an escalating war of ever-larger arbitrary numbers.

Z-index has no unit and accepts negative values too — a negative z-index can push an element behind its own (positioned) parent's background, a technique occasionally used for subtle decorative layers sitting visually "underneath" a card's own content.`,
  examples: [
    {
      id: "z-index-requires-position",
      title: "z-index does nothing without position",
      summary: "The same z-index value is ignored on a static element but works once position is set.",
      code: `function App() {
  return (
    <div style={{ position: "relative", height: 100 }}>
      <div style={{ position: "absolute", top: 20, left: 20, width: 100, height: 60, background: "#93c5fd" }}>
        Positioned, z-index: 1
      </div>
      <div style={{ zIndex: 999, width: 100, height: 60, background: "#fca5a5", marginLeft: 60, marginTop: 10 }}>
        Static, z-index: 999 (ignored — no effect)
      </div>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "overlapping-cards-stack-order",
      title: "Three overlapping cards, ordered purely by z-index",
      summary: "Card B has the highest z-index and renders on top despite being written first in the source.",
      code: `function App() {
  const card = {
    position: "absolute",
    width: 120,
    height: 80,
    borderRadius: 8,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    fontWeight: 700,
  };
  return (
    <div style={{ position: "relative", height: 150 }}>
      <div style={{ ...card, top: 20, left: 20, background: "#2563eb", zIndex: 5 }}>B (z: 5)</div>
      <div style={{ ...card, top: 0, left: 60, background: "#dc2626", zIndex: 1 }}>A (z: 1)</div>
      <div style={{ ...card, top: 40, left: 100, background: "#16a34a", zIndex: 3 }}>C (z: 3)</div>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "stacking-context-trap",
      title: "A high child z-index trapped inside a lower stacking context",
      summary: "The child's z-index of 999 still loses to a sibling, because its parent context has a lower z-index.",
      code: `function App() {
  return (
    <div style={{ position: "relative", height: 130 }}>
      <div
        style={{
          position: "absolute",
          top: 10,
          left: 10,
          zIndex: 1,
          background: "#fde68a",
          padding: 10,
          width: 160,
        }}
      >
        Parent context, z-index: 1
        <div style={{ position: "absolute", top: 30, left: 10, zIndex: 999, background: "#f59e0b", padding: 8 }}>
          Child z-index: 999 — still loses
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          top: 40,
          left: 60,
          zIndex: 2,
          background: "#a78bfa",
          color: "white",
          padding: 10,
          width: 160,
        }}
      >
        Sibling, z-index: 2 — wins because 2 &gt; 1 at the CONTEXT level
      </div>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
