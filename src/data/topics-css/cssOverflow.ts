import type { Topic } from "../../types";

export const cssOverflowTopic: Topic = {
  id: "css-overflow",
  title: "CSS Overflow",
  category: "CSS Layout & Positioning",
  shortExplanation: `\`overflow\` decides what happens when content is bigger than the box it lives in.

- \`visible\` (default) — content spills outside the box, unclipped
- \`hidden\` — anything past the box's edge is clipped and simply not shown
- \`scroll\` — always shows scrollbars, even if content happens to fit
- \`auto\` — shows scrollbars only when the content actually overflows
- \`overflow-x\`/\`overflow-y\` — control each axis independently

A very common combo — \`white-space: nowrap\` + \`overflow: hidden\` + \`text-overflow: ellipsis\` — truncates long text onto a single line ending in "…" instead of wrapping or spilling out.`,
  longExplanation: `\`overflow\` answers a question every layout eventually runs into: what should happen when an element's content is too big to fit inside the box's set size? By default, the answer is \`visible\` — the content simply keeps rendering past the box's edge, uncontained, which is why a fixed-height box with too much text can appear to "leak" over whatever sits below it.

\`overflow: hidden\` clips anything extending past the box's border edge — it's simply not rendered, not scrollable, just gone from view (though still present in the DOM, and still reachable by things like screen readers unless separately hidden from accessibility too). This is useful anywhere content needs to be strictly contained — a fixed-size avatar image cropped to a perfect circle, a card that shouldn't grow no matter how much text is dropped into it, or the classic clearfix technique for containing floated children (covered in the Float topic).

\`overflow: scroll\` forces scrollbars to appear on both axes *unconditionally*, even when the content actually fits without any scrolling needed — this can leave an oddly empty scrollbar-shaped gutter around content that never needed to scroll in the first place, which is exactly why it's used far less often than the next option.

\`overflow: auto\` is the more commonly reached-for choice: it shows scrollbars only when content genuinely overflows, and shows none at all when it fits — letting the browser decide per-case rather than forcing scrollbars everywhere. This is the standard way to build a capped-height scrollable panel (often paired with \`max-height\`, as covered in the Height and Width topic).

\`overflow-x\` and \`overflow-y\` split the behavior by axis, letting one direction scroll while the other stays clipped or visible — a horizontally-scrolling row of cards with \`overflow-x: auto; overflow-y: hidden\` is a common pattern for carousels and tab strips. Setting the shorthand \`overflow\` sets both axes to the same value at once; the longhands let them differ.

One of the single most practically useful combinations built on \`overflow\` is **text truncation with an ellipsis** — cutting off long text with a trailing "…" instead of letting it wrap onto multiple lines or spill outside its container. This specific effect actually requires **three** properties working together, and missing any one of them causes it to silently not work:

- \`white-space: nowrap\` — prevents the text from wrapping onto a second line in the first place
- \`overflow: hidden\` — clips whatever part of that single (now very long) line doesn't fit
- \`text-overflow: ellipsis\` — replaces the clipped-off end with "…" instead of just abruptly cutting the text off

This trio shows up constantly in real UI — table cells, sidebar labels, notification previews, dropdown menu items — anywhere a fixed-width container needs to gracefully handle text of unpredictable length without breaking the layout. It's worth remembering as a set precisely because \`text-overflow: ellipsis\` alone, without the other two, has no visible effect at all: there needs to *be* clipped overflow (which needs \`overflow: hidden\`) on a single unwrapped line (which needs \`white-space: nowrap\`) before there's anything for the ellipsis rule to replace.`,
  examples: [
    {
      id: "overflow-values-compared",
      title: "visible, hidden, scroll, and auto side by side",
      summary: "The same oversized paragraph inside four boxes, each with a different overflow value.",
      code: `function App() {
  const box = { width: 140, height: 70, border: "2px solid #4338ca", padding: 6, fontSize: 12 };
  const text = "This paragraph is deliberately far too long to fit inside its small fixed-height box.";
  return (
    <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
      <div>
        <p style={{ fontSize: 11, marginBottom: 4 }}>visible</p>
        <div style={{ ...box, overflow: "visible", background: "#fee2e2" }}>{text}</div>
      </div>
      <div>
        <p style={{ fontSize: 11, marginBottom: 4 }}>hidden</p>
        <div style={{ ...box, overflow: "hidden", background: "#fef9c3" }}>{text}</div>
      </div>
      <div>
        <p style={{ fontSize: 11, marginBottom: 4 }}>scroll</p>
        <div style={{ ...box, overflow: "scroll", background: "#dcfce7" }}>{text}</div>
      </div>
      <div>
        <p style={{ fontSize: 11, marginBottom: 4 }}>auto</p>
        <div style={{ ...box, overflow: "auto", background: "#dbeafe" }}>{text}</div>
      </div>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "text-truncation-ellipsis",
      title: "The nowrap + hidden + ellipsis truncation trio",
      summary: "Long labels are cut off with a trailing ellipsis inside a fixed-width list.",
      code: `function App() {
  const labels = [
    "Short label",
    "A considerably longer label that will not fit in this narrow box",
    "Another very long piece of text used to demonstrate ellipsis truncation",
  ];
  return (
    <div style={{ width: 200, display: "grid", gap: 8 }}>
      {labels.map((label) => (
        <div
          key={label}
          style={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            background: "#f3f4f6",
            padding: "6px 10px",
            borderRadius: 4,
          }}
        >
          {label}
        </div>
      ))}
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "overflow-x-only-carousel",
      title: "overflow-x alone builds a horizontal-scrolling row",
      summary: "Cards scroll horizontally while the container never grows taller than one row.",
      code: `function App() {
  const cards = Array.from({ length: 8 }, (_, i) => i + 1);
  return (
    <div
      style={{
        display: "flex",
        gap: 10,
        overflowX: "auto",
        overflowY: "hidden",
        padding: 10,
        border: "1px solid #d1d5db",
        borderRadius: 8,
      }}
    >
      {cards.map((n) => (
        <div
          key={n}
          style={{
            flex: "0 0 auto",
            width: 90,
            height: 60,
            background: "#c7d2fe",
            borderRadius: 6,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 700,
          }}
        >
          Card {n}
        </div>
      ))}
    </div>
  );
}

render(<App />);`,
    },
  ],
};
