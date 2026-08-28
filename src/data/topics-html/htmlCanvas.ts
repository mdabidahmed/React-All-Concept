import type { Topic } from "../../types";

export const htmlCanvasTopic: Topic = {
  id: "html-canvas",
  title: "HTML Canvas",
  category: "HTML Graphics",
  shortExplanation: `\`<canvas>\` is a blank rectangle in the page that you draw into **imperatively**, one instruction at a time, using JavaScript.

- \`canvas.getContext("2d")\` gives you a drawing context with methods like \`fillRect\`, \`arc\`, and \`stroke\`
- Nothing appears just from writing \`<canvas>\` — every shape is drawn by calling a JS function
- Canvas output is **pixel-based**: it doesn't scale up cleanly, unlike SVG (the next topic)
- The canvas "forgets" what it drew — there's no shape object to inspect or click later, only pixels`,
  longExplanation: `A \`<canvas>\` element starts out completely blank — it's just a rectangular surface. Nothing is drawn on it until JavaScript actively draws something, using the **Canvas 2D API**.

- \`const ctx = canvas.getContext("2d")\` retrieves a drawing context object; every drawing method (\`fillRect\`, \`arc\`, \`stroke\`, \`fillText\`...) is called on that context, not on the canvas element directly
- \`ctx.fillStyle = "red"\` sets the color used by the *next* fill operation; \`ctx.fillRect(x, y, width, height)\` then draws a filled rectangle at that position and size
- \`ctx.beginPath()\` followed by \`ctx.arc(x, y, radius, startAngle, endAngle)\` and \`ctx.fill()\` draws a filled circle (or partial arc)
- Because drawing is **imperative** — a sequence of function calls executed once — canvas has no memory of "a red circle at (50, 50)" as an object; it only has the resulting pixels. To change or animate a shape, you must clear the relevant area (or the whole canvas) and redraw everything again
- Canvas content is ==pixel-based (raster)==: it's rendered at a fixed resolution, so scaling the canvas element up in CSS makes the drawing blurry, the same way stretching a photo would. Contrast this with **SVG** in the next topic, where each shape stays sharp at any size because it's described as math, not pixels
- In a React component, canvas drawing happens as a *side effect*: get a \`ref\` to the \`<canvas>\` element, and inside a \`useEffect\` (which runs after the canvas exists in the DOM), grab its context and issue your drawing calls

Canvas is the right tool when you need pixel-level control, are drawing a large number of things where individual DOM elements would be too slow (particle effects, image editors, games), or are processing image data directly. For a smaller number of shapes that should stay interactive, styleable, or crisp at any zoom level, SVG is usually the better fit.`,
  examples: [
    {
      id: "basic-shapes-on-canvas",
      title: "Drawing a rectangle and a circle",
      summary: "A ref to the canvas, plus a useEffect that runs the Canvas 2D API drawing calls once the element exists.",
      code: `function App() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "#0d9488";
    ctx.fillRect(20, 20, 100, 60);

    ctx.beginPath();
    ctx.arc(200, 50, 35, 0, 2 * Math.PI);
    ctx.fillStyle = "#f59e0b";
    ctx.fill();
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={280}
      height={100}
      style={{ border: "1px solid #d1d5db", borderRadius: 4 }}
    />
  );
}

render(<App />);`,
    },
    {
      id: "canvas-line-and-text",
      title: "A line, a stroked shape, and text",
      summary: "Beyond fills: stroke() outlines a path, and fillText draws text directly onto the pixel surface.",
      code: `function App() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.strokeStyle = "#1d4ed8";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(10, 80);
    ctx.lineTo(270, 10);
    ctx.stroke();

    ctx.strokeStyle = "#dc2626";
    ctx.strokeRect(30, 20, 80, 50);

    ctx.fillStyle = "#111827";
    ctx.font = "16px sans-serif";
    ctx.fillText("Canvas text", 140, 60);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={280}
      height={100}
      style={{ border: "1px solid #d1d5db", borderRadius: 4 }}
    />
  );
}

render(<App />);`,
    },
    {
      id: "redraw-on-state-change",
      title: "Redrawing when state changes",
      summary: "Canvas has no memory of shapes — changing the circle's color means clearing and redrawing everything.",
      code: `function App() {
  const canvasRef = useRef(null);
  const [color, setColor] = useState("#0d9488");

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.arc(80, 50, 40, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
  }, [color]);

  return (
    <div style={{ display: "grid", gap: 8, maxWidth: 220 }}>
      <canvas
        ref={canvasRef}
        width={160}
        height={100}
        style={{ border: "1px solid #d1d5db", borderRadius: 4 }}
      />
      <div style={{ display: "flex", gap: 6 }}>
        {["#0d9488", "#dc2626", "#f59e0b", "#7c3aed"].map((c) => (
          <button
            key={c}
            onClick={() => setColor(c)}
            style={{ width: 24, height: 24, borderRadius: "50%", background: c, border: "none", cursor: "pointer" }}
          />
        ))}
      </div>
      <small style={{ color: "#6b7280" }}>
        There's no "circle object" to recolor — \`ctx.clearRect\` wipes the pixels, then everything
        is redrawn from scratch with the new fill color.
      </small>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
