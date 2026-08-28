import type { Topic } from "../../types";

export const cssHeightWidthTopic: Topic = {
  id: "css-height-width",
  title: "CSS Height and Width",
  category: "CSS Box Model",
  shortExplanation: `\`width\` and \`height\` set an element's size directly. \`max-width\`/\`min-width\` and \`max-height\`/\`min-height\` set flexible ==bounds== instead of a fixed number, letting a box shrink or grow but never cross the limit.

- \`width: 300px\` — a fixed size, unaffected by anything else on the page
- \`width: 50%\` — relative to the *parent's* content width, so it resizes when the parent does
- \`max-width: 100%\` — the classic rule that keeps images and containers from overflowing
- \`min-height\` guarantees a box never collapses below a certain size even with little content

Percentages always resolve against the *parent* element, not the viewport — a common source of "why isn't this percentage doing anything" confusion.`,
  longExplanation: `\`width\` and \`height\` are the most direct sizing properties in CSS, but "direct" doesn't mean "absolute" — how they behave depends heavily on the unit used and on \`box-sizing\` (covered in its own topic). By default, block-level elements like \`<div>\` don't need an explicit \`width\` at all: they automatically stretch to fill their parent's available width, and \`height\` defaults to just enough to fit the content. Setting \`width\`/\`height\` explicitly overrides that automatic behavior with a specific size.

**Fixed units** like \`px\` produce a size that never changes regardless of the parent, the viewport, or the content — reliable, but rigid. **Percentage** values are relative instead: \`width: 50%\` always means "50% of the *parent's* content-box width," which is why a percentage width appears to do nothing when the parent itself has no defined width (an element with \`width: auto\` sized only by its own content can't meaningfully hand down "50% of what?" to a child). Percentage *heights* have an even stricter version of this problem — since a block parent's height is usually determined by its children's content (not the other way around), \`height: 50%\` frequently computes to nothing unless the parent has an explicit height of its own.

**\`max-width\` and \`min-width\`** don't set a size directly — they clamp whatever size the element would otherwise have. \`max-width\` is one of the single most useful rules in all of CSS for exactly one reason: \`max-width: 100%\` on an \`<img>\` lets the image shrink to fit a narrower container (a phone screen, a narrow sidebar) while never being force-stretched beyond its own natural size or beyond its parent's width. This is the simplest possible "responsive image" technique, and it works because \`max-width\` only *caps* the size — it never overrides a *smaller* natural or explicit size, unlike a fixed \`width\` which would stretch a small image up and distort it. The same pattern applies to layout containers: a card or article with \`max-width: 600px\` fills available space on narrow screens (since block elements default to \`width: auto\`, i.e. "fill the parent") but stops growing past 600px on a wide monitor, avoiding uncomfortably long lines of text.

**\`min-width\`** works in the opposite direction — it prevents an element from shrinking below a floor, which matters most inside flexible layouts (flexbox, grid) where children can otherwise be squeezed to the point of unreadability. **\`max-height\`/\`min-height\`** are the vertical equivalents: \`max-height\` combined with \`overflow: auto\` is the standard way to build a scrollable panel that never grows past a certain size, and \`min-height\` is commonly used to guarantee a card or section never visually collapses to nothing when its content is sparse (\`min-height: 100vh\`, for a section that should always fill at least the full viewport height, is an extremely common pattern).

One subtlety worth internalizing: when \`max-width\` and a fixed \`width\` are both set and they conflict, \`max-width\` wins — it's specifically designed to override a wider explicit width, which is exactly why it's the safer, more defensive choice for anything that needs to adapt to unpredictable container sizes, while plain \`width\` remains better for cases where a truly fixed size is actually intended.`,
  examples: [
    {
      id: "fixed-vs-percentage-width",
      title: "Fixed width vs. percentage width",
      summary: "A percentage-width box resizes with its parent; a fixed-width box never changes.",
      code: `function App() {
  return (
    <div style={{ display: "grid", gap: 12 }}>
      <div style={{ width: 300, backgroundColor: "#bfdbfe", padding: 10 }}>
        width: 300px — always exactly 300px wide
      </div>
      <div style={{ width: "400px", border: "2px dashed #9ca3af", padding: 10 }}>
        <div style={{ width: "50%", backgroundColor: "#86efac", padding: 10 }}>
          width: 50% — half of this 400px parent, so 200px
        </div>
      </div>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "max-width-responsive-image",
      title: "max-width: 100% keeps an image inside its container",
      summary: "The same image never overflows even as its container shrinks, because max-width caps it.",
      code: `function App() {
  return (
    <div style={{ display: "flex", gap: 16 }}>
      <div style={{ width: 260, border: "2px solid #4338ca", padding: 8 }}>
        <p style={{ margin: "0 0 6px", fontSize: 12, color: "#4338ca" }}>Wide container (260px)</p>
        <div
          style={{
            width: 400,
            height: 80,
            maxWidth: "100%",
            background: "linear-gradient(135deg, #f472b6, #6366f1)",
            borderRadius: 6,
          }}
        />
      </div>
      <div style={{ width: 120, border: "2px solid #b91c1c", padding: 8 }}>
        <p style={{ margin: "0 0 6px", fontSize: 12, color: "#b91c1c" }}>Narrow container (120px)</p>
        <div
          style={{
            width: 400,
            height: 80,
            maxWidth: "100%",
            background: "linear-gradient(135deg, #f472b6, #6366f1)",
            borderRadius: 6,
          }}
        />
      </div>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "min-height-guarantees-floor",
      title: "min-height keeps a box from collapsing",
      summary: "An empty card still takes up meaningful space thanks to min-height.",
      code: `function App() {
  return (
    <div style={{ display: "flex", gap: 16 }}>
      <div style={{ width: 160, minHeight: 120, backgroundColor: "#fef08a", padding: 10, borderRadius: 6 }}>
        Some content that naturally needs a bit of height to display.
      </div>
      <div style={{ width: 160, minHeight: 120, backgroundColor: "#fef08a", padding: 10, borderRadius: 6 }}>
        Empty
      </div>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "max-height-scroll-panel",
      title: "max-height + overflow builds a capped scroll panel",
      summary: "A list grows naturally until it hits max-height, then starts scrolling instead of growing further.",
      code: `function App() {
  const items = Array.from({ length: 20 }, (_, i) => \`Item #\${i + 1}\`);
  return (
    <div
      style={{
        width: 220,
        maxHeight: 160,
        overflowY: "auto",
        border: "2px solid #0f766e",
        borderRadius: 6,
        padding: 8,
      }}
    >
      {items.map((item) => (
        <div key={item} style={{ padding: "4px 0", borderBottom: "1px solid #e5e7eb" }}>
          {item}
        </div>
      ))}
    </div>
  );
}

render(<App />);`,
    },
  ],
};
