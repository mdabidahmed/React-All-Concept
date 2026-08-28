import type { Topic } from "../../types";

export const cssDimensionUnitsTopic: Topic = {
  id: "css-dimension-units",
  title: "CSS Units",
  category: "CSS Box Model",
  shortExplanation: `CSS sizes can be **absolute** (always the same physical size) or **relative** (computed from something else on the page).

- \`px\` — an absolute pixel, unaffected by anything around it
- \`%\` — relative to the *parent's* size
- \`em\` — relative to the *element's own* (or its parent's) \`font-size\`
- \`rem\` — relative to the **root** (\`<html>\`) \`font-size\`, no matter how deeply nested
- \`vw\`/\`vh\` — relative to 1% of the *viewport's* width/height

\`rem\` is generally preferred for typography and spacing because changing one root font-size scales an entire page consistently, without the compounding surprises \`em\` can produce across nested elements.`,
  longExplanation: `Every length in CSS needs a unit, and the unit chosen determines *what that number is measured relative to* — which turns out to matter enormously once a page needs to adapt to different screen sizes, user font preferences, or nested components.

**\`px\`** (pixels) is an absolute unit: \`16px\` means the same physical size everywhere on the page, regardless of what element it's applied to or what's around it. This predictability is exactly why \`px\` is easy to reason about, but it's also why pure-pixel layouts don't respond to a user increasing their browser's default font size for accessibility — a page built entirely in \`px\` stays exactly the same size no matter what the user's own settings say.

**\`%\`** is relative to the size of the containing element — a \`width: 50%\` box is half of its *parent's* content width, and a \`font-size: 150%\` is one-and-a-half times its parent's font size. Percentages are powerful for fluid layouts but can be confusing for heights specifically, since a block-level parent's height is usually determined *by its children*, creating a chicken-and-egg situation where \`height: 100%\` often resolves to nothing unless an ancestor somewhere up the chain has an explicit height.

**\`em\`** is relative to a *font-size* — specifically, the font-size of the element it's used on for most properties, but the font-size of the *parent* when used to set \`font-size\` itself. This produces a well-known compounding effect: if a component sets \`font-size: 1.2em\` and is nested inside another element that also set \`font-size: 1.2em\`, the effective size multiplies at each level, so five levels of nesting can produce a font size wildly larger or smaller than intended, purely as a side effect of the DOM structure rather than any deliberate design choice. \`em\` is still genuinely useful for sizing things that *should* scale with their own local font size — \`padding: 0.5em\` on a button scales its padding automatically if the button's own font-size changes, keeping the proportions consistent without a separate calculation.

**\`rem\`** ("root em") fixes the compounding problem by always measuring against a single fixed reference: the \`font-size\` set on the document's root \`<html>\` element (typically \`16px\` by default), no matter how deeply the element using \`rem\` is nested. This makes \`rem\` far more predictable for global typography and spacing scales — a design system can define spacing as \`0.5rem\`, \`1rem\`, \`1.5rem\`, \`2rem\`, and so on, and changing the single root font-size (say, for a user accessibility preference, or a "large text" mode) scales every one of those values consistently and proportionally across the entire page, with zero risk of the nested-multiplication surprise \`em\` can produce. This is exactly why \`rem\` has become the default recommendation for most spacing and font-size values in modern CSS, with \`em\` reserved for the narrower cases where scaling *relative to a local, already-adjusted font size* is specifically the intent (icon sizing next to text, or padding that should track a button's own font size).

**\`vw\`** and **\`vh\`** are relative to the *viewport* — the visible browser window — rather than to any element on the page: \`1vw\` is 1% of the viewport's width, and \`1vh\` is 1% of its height, so \`width: 50vw\` is always half the browser window's width regardless of any parent element's own size. These are the standard tool for anything that should scale with the *screen* itself rather than with surrounding content — a full-height hero section (\`min-height: 100vh\`), or fluid typography that grows on larger screens. They come with one practical caveat on mobile browsers, where \`vh\` can behave unexpectedly as the address bar shows and hides, which is why newer viewport units like \`svh\`/\`lvh\`/\`dvh\` exist to handle that case more precisely — worth knowing about even if \`vh\` remains the simpler default for most desktop-first work.`,
  examples: [
    {
      id: "px-vs-percent-vs-vw",
      title: "px, %, and vw side by side",
      summary: "Three bars sized with different units behave differently as their container changes.",
      code: `function App() {
  return (
    <div style={{ width: "70%", border: "1px dashed #9ca3af", padding: 10, display: "grid", gap: 8 }}>
      <div style={{ width: 200, height: 24, background: "#93c5fd" }}>width: 200px (fixed)</div>
      <div style={{ width: "50%", height: 24, background: "#86efac" }}>width: 50% (of this container)</div>
      <div style={{ width: "30vw", height: 24, background: "#fca5a5" }}>width: 30vw (of the whole viewport)</div>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "em-compounding-nesting",
      title: "em compounds with nesting; rem doesn't",
      summary: "Three nested boxes each set font-size: 1.3em, multiplying at every level — the rem-based box beside them stays constant.",
      code: `function App() {
  const level = { fontSize: "1.3em", border: "1px solid #d1d5db", padding: 8 };
  return (
    <div style={{ display: "flex", gap: 30 }}>
      <div style={{ fontSize: 14 }}>
        <p style={{ margin: "0 0 4px", fontSize: 12, color: "#6b7280" }}>em (compounds each level)</p>
        <div style={level}>
          Level 1
          <div style={level}>
            Level 2
            <div style={level}>Level 3 — much bigger, just from nesting</div>
          </div>
        </div>
      </div>
      <div style={{ fontSize: 14 }}>
        <p style={{ margin: "0 0 4px", fontSize: 12, color: "#6b7280" }}>rem (always relative to root)</p>
        <div style={{ fontSize: "1.3rem", border: "1px solid #d1d5db", padding: 8 }}>
          Level 1
          <div style={{ fontSize: "1.3rem", border: "1px solid #d1d5db", padding: 8 }}>
            Level 2
            <div style={{ fontSize: "1.3rem", border: "1px solid #d1d5db", padding: 8 }}>
              Level 3 — same size increase every time, no compounding
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "vh-full-height-section",
      title: "vh sized relative to the viewport, not any element",
      summary: "A colored strip sized as a percentage of the browser window's own height.",
      code: `function App() {
  return (
    <div
      style={{
        height: "20vh",
        minHeight: 80,
        background: "linear-gradient(135deg, #0ea5e9, #6366f1)",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: 600,
        borderRadius: 6,
      }}
    >
      height: 20vh — 20% of the browser viewport's height
    </div>
  );
}

render(<App />);`,
    },
  ],
};
