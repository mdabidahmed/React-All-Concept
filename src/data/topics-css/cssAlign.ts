import type { Topic } from "../../types";

export const cssAlignTopic: Topic = {
  id: "css-align",
  title: "CSS Centering and Alignment",
  category: "CSS Layout & Positioning",
  shortExplanation: `"How do I center a div?" is famous precisely because CSS has ==several different answers== depending on what's being centered and how.

- \`margin: 0 auto\` — centers a **block** element *horizontally* within its parent (needs an explicit \`width\`)
- Flexbox \`justify-content\`/\`align-items: center\` — centers a flex item both horizontally and vertically, in one parent
- Absolute positioning + \`transform: translate(-50%, -50%)\` — centers an element of *any* (even unknown) size, relative to a positioned ancestor
- \`text-align: center\` — centers **inline/text** content, not the block box itself`,
  longExplanation: `Centering something in CSS has a reputation as a running joke ("how do I center a div") mainly because the *right* technique genuinely depends on what's being centered, and CSS offers several tools that solve overlapping but not identical problems.

**\`margin: 0 auto\`** centers a block-level element *horizontally* within its parent. It works because the top/bottom margin values (\`0\`) are literal, while the left/right values (\`auto\`) tell the browser to distribute all the leftover horizontal space evenly between the two sides — and if a block element already fills the full available width, there's no leftover space to distribute, which is exactly why this technique **requires the element to have an explicit \`width\`** (or a \`max-width\`) narrower than its parent. This is the classic technique for centering a fixed-width page container (\`width: 960px; margin: 0 auto;\`) and predates flexbox by many years — it does nothing for vertical centering at all, since \`auto\` doesn't distribute vertical space the same way.

**Flexbox** is the most flexible modern answer, and it solves both axes at once from the *parent's* side: setting \`display: flex\` on a container, then \`justify-content: center\` (centers along the main axis — horizontally, by default) and \`align-items: center\` (centers along the cross axis — vertically, by default) centers a child perfectly in both directions with just three lines on the parent, regardless of the child's own size. This has become the default recommendation for "center this thing" in modern CSS precisely because it requires no special property on the child at all, and adapts automatically if the child's size changes.

**Absolute positioning combined with \`transform: translate(-50%, -50%)\`** solves a specific case the other two don't handle as cleanly: centering an element **whose size might not be known in advance**, inside a positioned ancestor. The technique is: \`position: absolute; top: 50%; left: 50%;\` moves the element's *top-left corner* to the exact center point of its positioned ancestor — which alone isn't centered, since the rest of the element still extends down and to the right from that point. \`transform: translate(-50%, -50%)\` then shifts the element back by *half of its own width and height*, which — unlike a fixed pixel offset — is calculated dynamically from whatever the element's actual rendered size happens to be, so it stays perfectly centered even if the content inside changes size later. This was the standard "center an element of unknown size" technique before flexbox, and it's still useful today specifically for cases involving \`position: absolute\` overlays (a modal centered over its backdrop, for instance) where flexbox isn't already part of the layout.

**\`text-align: center\`** is a different tool entirely — it centers **inline content** (text, images, inline/inline-block elements) *within* their containing block, rather than centering a block-level box itself. \`text-align: center\` on a \`<div>\` centers the *text inside* that div, but has zero effect on the div's own position relative to its parent, and no effect at all on other block-level children (only inline-level content responds to it). This is the tool for centering a heading's text, or centering an inline-block button *within* its full-width parent, but it's easy to reach for by mistake when what's actually needed is to center the *box itself*, which calls for one of the other three techniques instead.

Picking between these four comes down to one question: is a block box being centered (\`margin: 0 auto\`, or flexbox on the parent), an element of possibly-unknown size inside a positioned ancestor (absolute + transform), or just text/inline content within its own box (\`text-align: center\`)?`,
  examples: [
    {
      id: "margin-auto-horizontal-center",
      title: "margin: 0 auto centers a fixed-width block",
      summary: "A 200px-wide box centers itself horizontally within its full-width parent.",
      code: `function App() {
  return (
    <div style={{ background: "#f3f4f6", padding: 10 }}>
      <div style={{ width: 200, margin: "0 auto", background: "#93c5fd", padding: 16, textAlign: "center" }}>
        width: 200px; margin: 0 auto
      </div>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "flexbox-center-both-axes",
      title: "Flexbox centers both axes at once",
      summary: "justify-content and align-items center a box perfectly in the middle of its parent.",
      code: `function App() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: 160,
        background: "#f3f4f6",
        borderRadius: 8,
      }}
    >
      <div style={{ background: "#16a34a", color: "white", padding: 16, borderRadius: 6, fontWeight: 700 }}>
        Perfectly centered, both axes
      </div>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "absolute-transform-center",
      title: "Absolute + translate centers an unknown-size element",
      summary: "The badge's exact size doesn't need to be known ahead of time — translate(-50%, -50%) adapts to it.",
      code: `function App() {
  return (
    <div style={{ position: "relative", height: 160, background: "#fef3c7", borderRadius: 8 }}>
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background: "#dc2626",
          color: "white",
          padding: "10px 20px",
          borderRadius: 6,
          fontWeight: 700,
          whiteSpace: "nowrap",
        }}
      >
        Centered no matter my own size
      </div>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "text-align-vs-box-centering",
      title: "text-align: center only centers inline content, not the box",
      summary: "The text centers within the box, but the box itself stays flush left — a common point of confusion.",
      code: `function App() {
  return (
    <div style={{ background: "#f3f4f6", padding: 10 }}>
      <div style={{ width: 220, textAlign: "center", background: "#c4b5fd", padding: 16 }}>
        text-align: center — the TEXT is centered, but this box is still flush-left in its parent.
      </div>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
