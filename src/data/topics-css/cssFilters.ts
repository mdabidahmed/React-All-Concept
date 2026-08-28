import type { Topic } from "../../types";

export const cssFiltersTopic: Topic = {
  id: "css-filters",
  title: "CSS Filters",
  category: "CSS Advanced & Effects",
  shortExplanation: `The \`filter\` property applies image-processing effects — blur, brightness, grayscale, and more — directly to any element, ==no image editor required==.

- \`blur(px)\` — softens the element
- \`brightness(%)\` / \`contrast(%)\` — lightens/darkens or adjusts contrast
- \`grayscale(%)\` — desaturates toward black and white
- \`drop-shadow(x y blur color)\` — a shadow that follows the element's actual visible shape, not just its box
- Multiple filters can be **chained**, space-separated, in one \`filter\` value
- \`backdrop-filter\` applies the same effects to whatever is ==behind== an element instead of the element itself`,
  longExplanation: `\`filter\` brings a set of familiar photo-editing operations — blur, brightness, contrast, grayscale, and more — directly into CSS, applying them live to any element: images, text, backgrounds, even entire layouts. Because it's a real-time rendering effect rather than a pre-processed image, a filter recalculates instantly if the underlying element changes, and can be transitioned or triggered by hover/state just like any other property.

**The common filter functions:**

- **\`blur(radius)\`** softens the element by averaging nearby pixels — \`blur(5px)\` produces a mild haze, larger values produce a heavier blur. Commonly used for background images behind a modal, or a "reveal on hover" loading placeholder.
- **\`brightness(%)\`** scales the element's luminance — \`100%\` is unchanged, values above brighten (up to fully white), values below darken (down to fully black at \`0%\`).
- **\`contrast(%)\`** stretches or compresses the difference between light and dark areas — \`100%\` is unchanged, higher values make darks darker and lights lighter, lower values flatten everything toward gray.
- **\`grayscale(%)\`** desaturates the element toward black and white — \`100%\` is fully grayscale, \`0%\` is the original color. A common pattern is grayscale by default with color restored on \`:hover\`, drawing attention to whichever item the user is interested in.
- **\`drop-shadow(offset-x offset-y blur-radius color)\`** looks similar to \`box-shadow\` but behaves fundamentally differently: rather than casting a shadow from the element's rectangular box, \`drop-shadow()\` follows the actual **visible (non-transparent) shape** of the content — so an image with transparent padding, or an oddly-shaped SVG icon, gets a shadow that hugs its real silhouette instead of a rectangle around empty space.
- Other useful functions include \`saturate(%)\` (intensify or mute colors), \`hue-rotate(deg)\` (shift every color around the color wheel), \`invert(%)\` (flip colors to their negative), \`sepia(%)\` (an old-photo tint), and \`opacity(%)\` (functionally similar to the \`opacity\` property, but composable within a filter chain).

**Chaining filters.** Any number of filter functions can be listed space-separated in a single \`filter\` value, and they apply in order, each operating on the result of the one before it: \`filter: grayscale(60%) brightness(1.1) blur(1px);\`. This lets you build up a specific look — a common "frosted" look combines \`blur()\` with a slight \`brightness()\` or \`saturate()\` push.

**\`backdrop-filter\`** is a close relative that applies the *same* set of filter functions, but instead of altering the element itself, it alters whatever is **visible behind** the element, through it — this is exactly the effect behind modern "frosted glass" UI panels: a semi-transparent element with \`backdrop-filter: blur(12px)\` blurs the page content showing through it, while its own content (text, icons) stays perfectly sharp on top. This requires the element to have at least some transparency (a solid opaque background would simply hide the backdrop entirely, making the filter invisible).

**Performance and gotchas.** Filters — especially \`blur()\` and \`backdrop-filter\` — can be more GPU-intensive than simpler properties like \`opacity\` or \`transform\`, particularly over large areas or when applied to many elements at once, so they're best used deliberately rather than blanket-applied. Also worth noting: \`filter\` (like \`transform\`) creates a new stacking context and containing block for the element, which can occasionally affect how descendants with \`position: fixed\` or \`absolute\` behave. Finally, remember that \`filter\` changes *rendering only* — it never affects the underlying source image data, so a grayscaled \`<img>\` can always be restored to full color simply by removing or transitioning the filter away.`,
  examples: [
    {
      id: "filter-gallery",
      title: "A gallery of individual filter functions",
      summary: "The same colorful swatch run through blur, brightness, contrast, and grayscale, one filter each.",
      code: `function App() {
  const swatch = {
    width: 90,
    height: 90,
    borderRadius: 10,
    background: "linear-gradient(135deg, #f59e0b, #ec4899, #6366f1)",
  };
  const items = [
    { label: "none (original)", filter: "none" },
    { label: "blur(4px)", filter: "blur(4px)" },
    { label: "brightness(1.6)", filter: "brightness(1.6)" },
    { label: "contrast(2)", filter: "contrast(2)" },
    { label: "grayscale(100%)", filter: "grayscale(100%)" },
  ];

  return (
    <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
      {items.map((item) => (
        <div key={item.label} style={{ textAlign: "center" }}>
          <div style={{ ...swatch, filter: item.filter }} />
          <p style={{ fontSize: 12, color: "#6b7280", marginTop: 8 }}>{item.label}</p>
        </div>
      ))}
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "chained-filters",
      title: "Chaining multiple filters in one value",
      summary: "grayscale, brightness, and blur are combined into a single filter value applied in sequence.",
      code: `function App() {
  return (
    <div
      style={{
        width: 160,
        height: 160,
        borderRadius: 12,
        background: "linear-gradient(135deg, #22c55e, #06b6d4, #a855f7)",
        filter: "grayscale(50%) brightness(1.15) blur(1.5px)",
      }}
    />
  );
}

render(<App />);`,
    },
    {
      id: "drop-shadow-vs-box-shadow",
      title: "drop-shadow() follows the visible shape, box-shadow follows the box",
      summary: "A star-like shape made of a rotated square with transparent corners, compared under box-shadow vs. filter: drop-shadow().",
      code: `function App() {
  const diamond = {
    width: 70,
    height: 70,
    background: "#f97316",
    transform: "rotate(45deg)",
  };

  return (
    <div style={{ display: "flex", gap: 60, flexWrap: "wrap", padding: 24 }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ width: 100, height: 100, display: "grid", placeItems: "center" }}>
          <div style={{ ...diamond, boxShadow: "8px 8px 10px rgba(0,0,0,0.5)" }} />
        </div>
        <p style={{ fontSize: 12, color: "#6b7280", maxWidth: 160 }}>
          box-shadow — shadow follows the SQUARE box, visible corners bleed out
        </p>
      </div>
      <div style={{ textAlign: "center" }}>
        <div style={{ width: 100, height: 100, display: "grid", placeItems: "center" }}>
          <div style={{ ...diamond, filter: "drop-shadow(8px 8px 6px rgba(0,0,0,0.5))" }} />
        </div>
        <p style={{ fontSize: 12, color: "#6b7280", maxWidth: 160 }}>
          filter: drop-shadow() — shadow hugs the diamond's actual rotated silhouette
        </p>
      </div>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "backdrop-filter-frosted-glass",
      title: "backdrop-filter: a frosted-glass panel",
      summary: "A semi-transparent panel blurs the colorful background behind it while its own text stays sharp.",
      code: `function App() {
  return (
    <div
      style={{
        position: "relative",
        width: 280,
        height: 160,
        borderRadius: 14,
        background: "linear-gradient(135deg, #ef4444, #f59e0b, #10b981, #3b82f6)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: "30px 20px",
          borderRadius: 10,
          background: "rgba(255,255,255,0.25)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          display: "grid",
          placeItems: "center",
          color: "white",
          fontWeight: 600,
          textAlign: "center",
          padding: 12,
        }}
      >
        Frosted glass panel
        <br />
        (backdrop-filter: blur)
      </div>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "hover-grayscale-to-color",
      title: "Grayscale by default, full color on hover",
      summary: "A common gallery pattern: swatches sit in grayscale until hovered, when the filter smoothly transitions away.",
      code: `function HoverFilterStyles() {
  return (
    <style>{\`
      .filter-swatch {
        width: 80px;
        height: 80px;
        border-radius: 10px;
        filter: grayscale(100%);
        transition: filter 0.3s ease;
      }
      .filter-swatch:hover { filter: grayscale(0%); }
    \`}</style>
  );
}

function App() {
  return (
    <div style={{ display: "flex", gap: 14 }}>
      <HoverFilterStyles />
      <div className="filter-swatch" style={{ background: "#ef4444" }} />
      <div className="filter-swatch" style={{ background: "#3b82f6" }} />
      <div className="filter-swatch" style={{ background: "#10b981" }} />
    </div>
  );
}

render(<App />);`,
    },
  ],
};
