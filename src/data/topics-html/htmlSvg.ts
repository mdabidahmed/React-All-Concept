import type { Topic } from "../../types";

export const htmlSvgTopic: Topic = {
  id: "html-svg",
  title: "HTML SVG",
  category: "HTML Graphics",
  shortExplanation: `\`<svg>\` describes shapes **declaratively** as markup — \`<circle>\`, \`<rect>\`, \`<line>\`, \`<path>\` — instead of drawing them one instruction at a time.

- Each shape is a real, individually addressable element in the DOM, not just pixels
- SVG is **vector-based**: it scales to any size with no blurring, unlike Canvas
- Shapes can have their own \`onClick\`, be styled with CSS, and be updated by re-rendering, just like any other element
- In JSX, an inline \`<svg>\` is written the same way as any other markup — no \`ref\` or drawing API required`,
  longExplanation: `Where \`<canvas>\` is a blank surface you paint into with function calls, \`<svg>\` is a container element whose *children* are the shapes themselves — \`<circle>\`, \`<rect>\`, \`<line>\`, \`<path>\`, and more, each written directly as markup.

- \`<svg viewBox="0 0 200 100">\` sets up a coordinate system 200 units wide and 100 tall, independent of the pixel size it's actually displayed at — the browser scales everything inside proportionally
- \`<circle cx="50" cy="50" r="30" fill="teal" />\` — a circle centered at (50, 50) with radius 30
- \`<rect x="10" y="10" width="80" height="40" fill="orange" rx="6" />\` — a rectangle, optionally with rounded corners via \`rx\`
- \`<line x1="0" y1="0" x2="100" y2="100" stroke="black" />\` — a straight line, defined by its two endpoints
- \`<path d="M10 10 L90 90" stroke="black" />\` — the most flexible shape; its \`d\` attribute is a compact list of drawing commands (move, line, curve) that can describe arbitrarily complex outlines
- Because each shape is a **real DOM element**, it can carry its own \`onClick\` or \`onMouseEnter\` handlers, be selected in devtools, styled with CSS, and animated by simply changing its attributes on re-render. Canvas has none of this — it's only ever pixels
- SVG is ==vector-based==: shapes are described mathematically (a center and a radius, two endpoints, a curve formula), so the browser can render them crisply at any zoom level or physical size — a small icon and a full-page hero illustration can share the exact same SVG markup
- In JSX, inline SVG is written exactly like any other element — \`<svg>\`, \`<circle>\`, \`<rect>\` and friends nest directly into your component's return value, with the same camelCase attribute renaming as regular JSX (\`stroke-width\` becomes \`strokeWidth\`, for example)

Choosing between them: reach for **SVG** when you have a moderate number of shapes that should stay sharp, styleable, and interactive (icons, charts, diagrams, illustrations). Reach for **Canvas** when you're drawing so many things that individual DOM elements would be slow, or you need pixel-level image manipulation.`,
  examples: [
    {
      id: "basic-svg-shapes",
      title: "A small scene built from basic shapes",
      summary: "circle, rect, and line, all written directly as JSX markup inside an <svg>.",
      code: `function App() {
  return (
    <svg viewBox="0 0 200 100" width={280} height={140} style={{ border: "1px solid #d1d5db", borderRadius: 4 }}>
      <rect x={10} y={60} width={180} height={10} fill="#a3a3a3" />
      <circle cx={50} cy={50} r={30} fill="#0d9488" />
      <rect x={110} y={30} width={50} height={40} rx={6} fill="#f59e0b" />
      <line x1={10} y1={10} x2={190} y2={10} stroke="#1d4ed8" strokeWidth={2} />
    </svg>
  );
}

render(<App />);`,
    },
    {
      id: "svg-path-shape",
      title: "A custom shape with <path>",
      summary: "path's d attribute describes an outline with move/line/curve commands — here, a simple triangle.",
      code: `function App() {
  return (
    <svg viewBox="0 0 200 100" width={280} height={140} style={{ border: "1px solid #d1d5db", borderRadius: 4 }}>
      <path d="M100 10 L180 90 L20 90 Z" fill="#7c3aed" stroke="#4c1d95" strokeWidth={2} />
    </svg>
  );
}

render(<App />);`,
    },
    {
      id: "interactive-svg-shape",
      title: "A shape that responds to clicks",
      summary: "Because each shape is a real DOM element, it can carry its own onClick — try clicking the circle.",
      code: `function App() {
  const colors = ["#0d9488", "#dc2626", "#f59e0b", "#7c3aed"];
  const [colorIndex, setColorIndex] = useState(0);

  return (
    <div style={{ display: "grid", gap: 8 }}>
      <svg
        viewBox="0 0 200 100"
        width={220}
        height={110}
        style={{ border: "1px solid #d1d5db", borderRadius: 4 }}
      >
        <circle
          cx={100}
          cy={50}
          r={35}
          fill={colors[colorIndex]}
          onClick={() => setColorIndex((i) => (i + 1) % colors.length)}
          style={{ cursor: "pointer" }}
        />
      </svg>
      <small style={{ color: "#6b7280" }}>
        Click the circle to cycle its fill color — a plain \`onClick\` prop works because \`<circle>\`
        is a normal DOM element, exactly like a \`<div>\` or \`<button>\`.
      </small>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "svg-scales-without-blurring",
      title: "The same markup at two sizes",
      summary: "Unlike a canvas or a raster image, the identical SVG shapes stay perfectly sharp when scaled up.",
      code: `function Scene({ size }) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size}>
      <circle cx={50} cy={50} r={40} fill="#0d9488" />
      <circle cx={50} cy={50} r={20} fill="#f0fdfa" />
    </svg>
  );
}

function App() {
  return (
    <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
      <Scene size={40} />
      <Scene size={100} />
      <Scene size={180} />
    </div>
  );
}

render(<App />);`,
    },
  ],
};
