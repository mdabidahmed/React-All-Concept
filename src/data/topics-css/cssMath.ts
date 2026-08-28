import type { Topic } from "../../types";

export const cssMathTopic: Topic = {
  id: "css-math",
  title: "CSS Math Functions",
  category: "CSS Advanced & Effects",
  shortExplanation: `CSS can do arithmetic directly inside a property value, so sizes can be computed instead of hard-coded.

- \`calc(expression)\` — mixes different units in one expression, e.g. \`calc(100% - 40px)\`
- \`min(a, b, ...)\` — picks the ==smallest== value; useful as a ceiling
- \`max(a, b, ...)\` — picks the ==largest== value; useful as a floor
- \`clamp(min, preferred, max)\` — a "Goldilocks" value: preferred, unless it would go outside \`min\`/\`max\`
- Together, these replace many cases where you'd otherwise need media queries just to resize something`,
  longExplanation: `Before CSS math functions, mixing units — "make this 100% wide, minus a fixed 40px gutter" — was impossible to express in a single value; developers reached for JavaScript, extra wrapper elements, or approximations. \`calc()\` and its relatives close that gap by letting arithmetic live directly inside a CSS value.

**\`calc()\`** evaluates a standard arithmetic expression (\`+\`, \`-\`, \`*\`, \`/\`) and can freely mix units that would otherwise be incompatible: \`width: calc(100% - 40px)\`, \`font-size: calc(1rem + 0.5vw)\`, or \`margin-top: calc(var(--gap) * 2)\`. The one syntax quirk that trips people up: \`+\` and \`-\` **must** have a space on both sides (\`calc(100% - 40px)\`, not \`calc(100%-40px)\`), because \`-40px\` alone would parse as a single negative value rather than a subtraction operator — \`*\` and \`/\` don't have this requirement.

**\`min()\`** takes any number of comma-separated values and resolves to the *smallest* one at render time. It's typically used to cap a value that would otherwise grow too large — \`width: min(90%, 600px)\` means "as wide as 90% of the container, but never more than 600px," which is a common way to keep a layout from becoming unreadably wide on huge screens without writing a separate media query.

**\`max()\`** is the mirror image — it resolves to the *largest* value, commonly used as a floor: \`width: max(50%, 300px)\` means "at least 300px wide, growing past that only once 50% would exceed it," ensuring something never shrinks below a usable minimum on small screens.

**\`clamp(min, preferred, max)\`** combines both ideas into one function that takes three arguments: a minimum, a preferred value, and a maximum. The browser uses the *preferred* value as long as it falls between the min and max; if it would go below the minimum, the minimum is used instead, and likewise the maximum caps it from above. This is effectively \`max(min-value, min(preferred-value, max-value))\` written more legibly. It's most famous for **fluid typography**: \`font-size: clamp(1rem, 0.5rem + 2vw, 2.5rem)\` grows the text smoothly as the viewport widens, but never drops below \`1rem\` on tiny screens or exceeds \`2.5rem\` on huge ones — all in a single declaration, with zero media query breakpoints.

**Why this replaces media queries in many cases.** A traditional responsive approach picks a handful of fixed breakpoints (say, 480px, 768px, 1200px) and jumps the font size or width between fixed values at each one — which always leaves a slightly awkward size for viewports that fall between breakpoints. \`clamp()\` and friends instead produce a value that changes *continuously* with the viewport (when the preferred value includes a relative unit like \`vw\`), so there's no jump at all — just a smooth scale. Media queries are still essential for structural changes (rearranging a layout, hiding a sidebar), but for pure sizing, math functions are usually simpler and smoother.

**Nesting and mixing.** These functions can be nested inside each other and combined with custom properties freely: \`clamp(1rem, var(--fluid-base), 3rem)\`, or \`calc(min(50vw, 400px) - 20px)\`. Because they're evaluated by the browser at layout time (not compiled away), they also respond live to window resizing, zoom level, and changes to any custom properties they reference — exactly like the rest of the CSS custom-property system.`,
  examples: [
    {
      id: "calc-mixed-units",
      title: "calc() mixing percentage and pixels",
      summary: "A sidebar layout where the main content is exactly 100% minus a fixed sidebar width.",
      code: `function App() {
  return (
    <div style={{ display: "flex", gap: 0, border: "1px solid #d1d5db", borderRadius: 8, overflow: "hidden" }}>
      <div style={{ width: 140, background: "#1e293b", color: "white", padding: 12 }}>
        Sidebar
        <br />
        140px
      </div>
      <div style={{ width: "calc(100% - 140px)", background: "#f3f4f6", padding: 12 }}>
        This panel is calc(100% - 140px) wide — always exactly filling the rest
        of the row, no matter how wide the container is.
      </div>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "min-max-caps",
      title: "min() and max() as ceiling and floor",
      summary: "Two boxes demonstrate min() capping a width and max() enforcing a minimum width.",
      code: `function App() {
  return (
    <div style={{ display: "grid", gap: 12 }}>
      <div
        style={{
          width: "min(90%, 260px)",
          background: "#bfdbfe",
          padding: 10,
          borderRadius: 8,
        }}
      >
        width: min(90%, 260px) — never wider than 260px, even on a huge
        container.
      </div>
      <div
        style={{
          width: "max(15%, 220px)",
          background: "#fde68a",
          padding: 10,
          borderRadius: 8,
        }}
      >
        width: max(15%, 220px) — never narrower than 220px, even if 15% of the
        container would be tiny.
      </div>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "clamp-fluid-heading",
      title: "clamp() for fluid typography",
      summary: "A heading whose font-size scales smoothly with viewport width, bounded on both ends.",
      code: `function App() {
  return (
    <div style={{ display: "grid", gap: 8 }}>
      <h2
        style={{
          margin: 0,
          fontSize: "clamp(1.25rem, 4vw, 2.75rem)",
          lineHeight: 1.15,
        }}
      >
        Resize the preview panel to see me scale
      </h2>
      <p style={{ margin: 0, color: "#6b7280", fontSize: 13 }}>
        font-size: clamp(1.25rem, 4vw, 2.75rem) — stays readable at narrow
        widths, grows with the viewport, and stops growing past 2.75rem.
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "clamp-with-custom-property",
      title: "clamp() combined with a custom property",
      summary: "The clamp() bounds themselves come from a CSS variable, adjustable live via a slider.",
      code: `function ClampStyles() {
  return (
    <style>{\`
      .clamp-box {
        padding: var(--pad);
        background: #111827;
        color: white;
        border-radius: 8px;
        transition: padding 0.1s ease;
      }
    \`}</style>
  );
}

function App() {
  const [scale, setScale] = useState(1);

  const wrapperStyle = {
    "--pad": "clamp(8px, " + scale + "rem, 40px)",
  };

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <ClampStyles />
      <div className="clamp-box" style={wrapperStyle}>
        padding: clamp(8px, {scale}rem, 40px)
      </div>
      <input
        type="range"
        min="0.2"
        max="4"
        step="0.1"
        value={scale}
        onChange={(e) => setScale(Number(e.target.value))}
      />
    </div>
  );
}

render(<App />);`,
    },
  ],
};
