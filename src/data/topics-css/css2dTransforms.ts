import type { Topic } from "../../types";

export const css2dTransformsTopic: Topic = {
  id: "css-2d-transforms",
  title: "CSS 2D Transforms",
  category: "CSS Advanced & Effects",
  shortExplanation: `The \`transform\` property moves, rotates, resizes, and skews an element in 2D space ==without affecting the layout== of surrounding elements.

- \`translate(x, y)\` — shifts the element from its normal position
- \`rotate(deg)\` — spins it around a pivot point
- \`scale(x, y)\` — grows or shrinks it
- \`skew(x-deg, y-deg)\` — slants it along an axis
- Multiple functions can be **combined in one \`transform\`**, applied left to right
- \`transform-origin\` changes the pivot point that \`rotate\`/\`scale\` work around (default: the element's center)`,
  longExplanation: `The \`transform\` property visually repositions, resizes, or reshapes an element without touching the document's normal layout flow — other elements behave as if the transformed element were still sitting in its original box. This is what makes transforms ideal for hover effects, drag feedback, and animations: they're computed purely on the compositor, so they're both cheap to animate and never trigger a layout reflow the way changing \`top\`/\`left\`/\`width\` would.

**\`translate(x, y)\`** moves an element by a distance, relative to where it would otherwise be. \`translate(20px, -10px)\` shifts it 20px right and 10px up. \`translateX()\` and \`translateY()\` are shorthand for moving along just one axis. Because it's relative rather than absolute, translating an element never depends on knowing its parent's exact size — this is the trick behind the classic "center an element exactly" pattern: \`position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);\`.

**\`rotate(deg)\`** spins an element around a pivot point, measured in degrees (positive values rotate clockwise). \`rotate(45deg)\` and \`rotate(-90deg)\` are both common.

**\`scale(x, y)\`** multiplies the element's size — \`scale(1.5)\` (a single value applies to both axes) makes it 150% of its original size, \`scale(0.5)\` shrinks it to half, and \`scale(1, 2)\` stretches only vertically. Crucially, scaling doesn't change the space the element reserves in the layout — a scaled-up element can visually overlap its neighbors rather than push them away.

**\`skew(x-deg, y-deg)\`** slants an element along the X and/or Y axis, distorting its shape into a parallelogram — used far less often than the other three, but effective for stylized banner or ribbon shapes.

**Combining functions.** Multiple transform functions can be listed space-separated in one \`transform\` value, and they apply in **left-to-right order**: \`transform: translateX(20px) rotate(15deg) scale(1.1);\` first translates, then rotates the already-translated element, then scales the result. Order matters — \`rotate(45deg) translateX(50px)\` produces a visually different result than \`translateX(50px) rotate(45deg)\`, because each function operates on the coordinate system left behind by the one before it.

**\`transform-origin\`** controls the pivot point that \`rotate\` and \`scale\` operate around. By default it's the element's own center (\`50% 50%\`), but it can be moved to a corner (\`transform-origin: top left\`) or any coordinate, which changes rotation and scaling dramatically — a corner-pivoted rotation sweeps in an arc rather than spinning in place, which is exactly the behavior needed for things like a clock hand or a door swinging open.

**Common gotchas.** Transforms don't affect layout, so if you need the *space* an element takes up to also change, you need to adjust actual layout properties (\`width\`, \`margin\`) alongside the transform, not instead of it. A transformed element also creates a new *containing block* for any absolutely-positioned descendants, and it establishes a new stacking context — both of which occasionally surprise developers debugging \`position: absolute\` children that suddenly anchor to the transformed ancestor instead of the page. Finally, transforms pair naturally with \`transition\` for smooth, GPU-accelerated hover and interaction effects, covered in more detail in the CSS Transitions topic.`,
  examples: [
    {
      id: "translate-rotate-scale",
      title: "translate, rotate, and scale side by side",
      summary: "Three boxes, each showing one transform function in isolation against a faded outline of the original position.",
      code: `function App() {
  const boxStyle = { width: 70, height: 70, background: "#2563eb", borderRadius: 8 };
  const ghostStyle = {
    ...boxStyle,
    position: "absolute",
    background: "transparent",
    border: "2px dashed #cbd5e1",
  };

  return (
    <div style={{ display: "flex", gap: 40, flexWrap: "wrap" }}>
      <div style={{ position: "relative", width: 70, height: 70 }}>
        <div style={ghostStyle} />
        <div style={{ ...boxStyle, transform: "translate(20px, 15px)" }} />
        <p style={{ marginTop: 8, fontSize: 12, color: "#6b7280" }}>translate(20px, 15px)</p>
      </div>
      <div style={{ position: "relative", width: 70, height: 70 }}>
        <div style={ghostStyle} />
        <div style={{ ...boxStyle, transform: "rotate(30deg)" }} />
        <p style={{ marginTop: 8, fontSize: 12, color: "#6b7280" }}>rotate(30deg)</p>
      </div>
      <div style={{ position: "relative", width: 70, height: 70 }}>
        <div style={ghostStyle} />
        <div style={{ ...boxStyle, transform: "scale(1.3)" }} />
        <p style={{ marginTop: 8, fontSize: 12, color: "#6b7280" }}>scale(1.3)</p>
      </div>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "combining-transforms",
      title: "Combining multiple transform functions",
      summary: "One transform value chains translate, rotate, and scale together — order changes the result.",
      code: `function App() {
  return (
    <div style={{ display: "flex", gap: 50, flexWrap: "wrap", padding: 20 }}>
      <div style={{ textAlign: "center" }}>
        <div
          style={{
            width: 80,
            height: 80,
            background: "#7c3aed",
            borderRadius: 8,
            transform: "translateX(20px) rotate(20deg) scale(1.1)",
          }}
        />
        <p style={{ fontSize: 12, color: "#6b7280", marginTop: 8, maxWidth: 160 }}>
          translateX first, then rotate, then scale
        </p>
      </div>
      <div style={{ textAlign: "center" }}>
        <div
          style={{
            width: 80,
            height: 80,
            background: "#ec4899",
            borderRadius: 8,
            transform: "rotate(20deg) translateX(20px) scale(1.1)",
          }}
        />
        <p style={{ fontSize: 12, color: "#6b7280", marginTop: 8, maxWidth: 160 }}>
          rotate first — the translate now happens along the ROTATED axis
        </p>
      </div>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "transform-origin-pivot",
      title: "Changing the pivot with transform-origin",
      summary: "The same rotation looks completely different depending on where transform-origin is set.",
      code: `function App() {
  return (
    <div style={{ display: "flex", gap: 50, flexWrap: "wrap", padding: 30 }}>
      <div style={{ textAlign: "center" }}>
        <div
          style={{
            width: 80,
            height: 80,
            background: "#16a34a",
            borderRadius: 8,
            transform: "rotate(30deg)",
            transformOrigin: "center",
          }}
        />
        <p style={{ fontSize: 12, color: "#6b7280", marginTop: 8 }}>transform-origin: center (default)</p>
      </div>
      <div style={{ textAlign: "center" }}>
        <div
          style={{
            width: 80,
            height: 80,
            background: "#0891b2",
            borderRadius: 8,
            transform: "rotate(30deg)",
            transformOrigin: "top left",
          }}
        />
        <p style={{ fontSize: 12, color: "#6b7280", marginTop: 8 }}>transform-origin: top left</p>
      </div>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "interactive-skew-scale",
      title: "Driving transforms from React state",
      summary: "Sliders control rotate() and skewX() in real time, showing how the values map to the visual result.",
      code: `function App() {
  const [angle, setAngle] = useState(0);
  const [skew, setSkew] = useState(0);

  return (
    <div style={{ display: "grid", gap: 14, justifyItems: "start" }}>
      <div
        style={{
          width: 120,
          height: 80,
          background: "#f59e0b",
          borderRadius: 8,
          transform: "rotate(" + angle + "deg) skewX(" + skew + "deg)",
        }}
      />
      <label style={{ fontSize: 13, display: "grid", gap: 4 }}>
        rotate: {angle}deg
        <input type="range" min="-45" max="45" value={angle} onChange={(e) => setAngle(Number(e.target.value))} />
      </label>
      <label style={{ fontSize: 13, display: "grid", gap: 4 }}>
        skewX: {skew}deg
        <input type="range" min="-30" max="30" value={skew} onChange={(e) => setSkew(Number(e.target.value))} />
      </label>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
