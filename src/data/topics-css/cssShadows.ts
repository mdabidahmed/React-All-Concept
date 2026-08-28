import type { Topic } from "../../types";

export const cssShadowsTopic: Topic = {
  id: "css-shadows",
  title: "CSS Shadows",
  category: "CSS Advanced & Effects",
  shortExplanation: `CSS can cast shadows behind whole elements with \`box-shadow\`, or behind just the glyphs of text with \`text-shadow\` — both built from the same core idea: offset, blur, and color.

- \`box-shadow: offset-x offset-y blur spread color;\`
- \`inset\` flips the shadow to render ==inside== the element instead of behind it
- \`text-shadow: offset-x offset-y blur color;\` — same idea, applied to text glyphs
- Multiple shadows can be **comma-separated and layered** for a sense of depth`,
  longExplanation: `Shadows are one of the simplest ways to add a sense of depth and elevation to an otherwise flat interface, and CSS provides two dedicated properties for it: \`box-shadow\` for whole elements, and \`text-shadow\` for text glyphs specifically.

**\`box-shadow\`** takes up to five values: \`box-shadow: offset-x offset-y blur-radius spread-radius color;\`

- **\`offset-x\`** and **\`offset-y\`** position the shadow relative to the element — positive \`offset-x\` pushes it right, positive \`offset-y\` pushes it down; negative values push left/up.
- **\`blur-radius\`** (optional, defaults to \`0\`) softens the shadow's edge — a larger value spreads the shadow into a wider, softer gradient rather than a hard-edged copy of the shape.
- **\`spread-radius\`** (optional, defaults to \`0\`) grows or shrinks the shadow's shape itself, independent of blur — a positive value makes the shadow larger than the element in every direction before blur is applied; negative shrinks it.
- **\`color\`** sets the shadow's color, and can include alpha transparency (\`rgba(...)\`, or a hex color with an 8th/9th alpha digit) — real-world shadows are almost always semi-transparent rather than solid black, which is what makes them look natural against varying backgrounds.

**\`inset\`** is a keyword that can be added anywhere in the value list: it flips the shadow to render *inside* the element's border edge, as if the element were a carved-out recess rather than a raised object — commonly used for "pressed" button states or input field focus rings.

**\`text-shadow\`** follows the same offset/blur/color pattern but has no spread value: \`text-shadow: offset-x offset-y blur-radius color;\`. Because it follows the exact shape of each glyph rather than a rectangular box, it's used for effects like embossed or engraved text, a soft glow around light text on a dark hero image (to keep it legible), or a simple drop shadow for headings.

**Layering multiple shadows.** Both properties accept a **comma-separated list** of shadow definitions, and each one is rendered as an independent layer stacked on top of the next (the first shadow listed sits above/in-front of the later ones in rendering order, though visually they usually blend). Layering is the standard technique for realistic depth: a common pattern is one shadow with a small offset and tight blur (simulating a nearby light source and close contact with the surface) plus a second shadow with a larger offset and wider blur (simulating the broader, softer shadow further from the object) — together, they read as much more convincing depth than a single flat shadow does. Design systems often codify this into named "elevation" tiers (e.g., "shadow-sm", "shadow-lg") that each combine two or three shadow layers of increasing offset and blur.

**Performance and gotchas.** \`box-shadow\` and \`text-shadow\` are both relatively cheap to render and can be transitioned/animated smoothly (they're a good target for hover feedback, since — unlike \`border\` — adding or thickening a shadow doesn't shift surrounding layout). Note that \`box-shadow\` follows the element's actual **box** shape (including \`border-radius\`, so a rounded box gets a rounded shadow) but ignores anything drawn *inside* it via \`background-image\` transparency; if you need a shadow that hugs the visible, non-transparent pixels of an image (like a logo with transparent padding), \`filter: drop-shadow()\` — covered in the CSS Filters topic — is the better tool, since it follows alpha-channel shape rather than the bounding box.`,
  examples: [
    {
      id: "basic-box-shadow-anatomy",
      title: "The anatomy of box-shadow",
      summary: "Four boxes isolate offset, blur, spread, and color so each part's effect is visible on its own.",
      code: `function App() {
  const base = { width: 90, height: 90, background: "white", borderRadius: 10 };
  return (
    <div style={{ display: "flex", gap: 40, flexWrap: "wrap", padding: 20, background: "#f3f4f6" }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ ...base, boxShadow: "10px 10px 0 rgba(0,0,0,0.3)" }} />
        <p style={{ fontSize: 12, color: "#6b7280", marginTop: 10 }}>offset only, no blur</p>
      </div>
      <div style={{ textAlign: "center" }}>
        <div style={{ ...base, boxShadow: "6px 6px 16px rgba(0,0,0,0.35)" }} />
        <p style={{ fontSize: 12, color: "#6b7280", marginTop: 10 }}>offset + blur</p>
      </div>
      <div style={{ textAlign: "center" }}>
        <div style={{ ...base, boxShadow: "0 0 0 8px rgba(37,99,235,0.35)" }} />
        <p style={{ fontSize: 12, color: "#6b7280", marginTop: 10 }}>spread only, no offset (a "ring")</p>
      </div>
      <div style={{ textAlign: "center" }}>
        <div style={{ ...base, boxShadow: "inset 4px 4px 10px rgba(0,0,0,0.4)" }} />
        <p style={{ fontSize: 12, color: "#6b7280", marginTop: 10 }}>inset — shadow carved inward</p>
      </div>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "layered-elevation-shadows",
      title: "Layering shadows for realistic elevation",
      summary: "Three cards use one, then two stacked shadow layers, showing how layering reads as more convincing depth.",
      code: `function App() {
  const card = { width: 140, height: 90, background: "white", borderRadius: 10 };
  return (
    <div style={{ display: "flex", gap: 40, flexWrap: "wrap", padding: 24, background: "#e5e7eb" }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ ...card, boxShadow: "0 4px 6px rgba(0,0,0,0.3)" }} />
        <p style={{ fontSize: 12, color: "#4b5563", marginTop: 10 }}>single flat shadow</p>
      </div>
      <div style={{ textAlign: "center" }}>
        <div
          style={{
            ...card,
            boxShadow:
              "0 1px 2px rgba(0,0,0,0.15), 0 8px 20px rgba(0,0,0,0.2)",
          }}
        />
        <p style={{ fontSize: 12, color: "#4b5563", marginTop: 10 }}>two layers: tight + wide</p>
      </div>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "text-shadow-styles",
      title: "text-shadow: glow, emboss, and drop shadow",
      summary: "Three headings each use a different text-shadow recipe for a different visual effect.",
      code: `function App() {
  return (
    <div style={{ display: "grid", gap: 20, padding: 24 }}>
      <h3 style={{ margin: 0, color: "#111827", textShadow: "2px 2px 3px rgba(0,0,0,0.35)" }}>
        Simple drop shadow
      </h3>
      <h3
        style={{
          margin: 0,
          background: "#1e3a8a",
          color: "#dbeafe",
          padding: 16,
          borderRadius: 8,
          textShadow: "0 0 10px #60a5fa, 0 0 20px #3b82f6",
        }}
      >
        Glowing text
      </h3>
      <h3
        style={{
          margin: 0,
          color: "#9ca3af",
          background: "#e5e7eb",
          padding: 16,
          borderRadius: 8,
          textShadow: "1px 1px 0 white, -1px -1px 0 rgba(0,0,0,0.25)",
        }}
      >
        Embossed text
      </h3>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "interactive-shadow-hover",
      title: "Animating box-shadow on hover",
      summary: "A card's shadow grows on hover to suggest it's lifting off the page, paired with a transition.",
      code: `function LiftStyles() {
  return (
    <style>{\`
      .lift-card {
        width: 200px;
        padding: 18px;
        border-radius: 10px;
        background: white;
        box-shadow: 0 2px 4px rgba(0,0,0,0.15);
        transition: box-shadow 0.25s ease, transform 0.25s ease;
      }
      .lift-card:hover {
        box-shadow: 0 16px 30px rgba(0,0,0,0.25);
        transform: translateY(-4px);
      }
    \`}</style>
  );
}

function App() {
  return (
    <div style={{ padding: 20, background: "#f3f4f6" }}>
      <LiftStyles />
      <div className="lift-card">Hover to lift this card off the page.</div>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
