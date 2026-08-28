import type { Topic } from "../../types";

export const cssGridContainerTopic: Topic = {
  id: "css-grid-container",
  title: "CSS Grid: Container",
  category: "CSS Flexbox & Grid",
  shortExplanation: `**Grid** is a two-dimensional layout system — unlike Flexbox's single row or column, a grid container defines both ==rows and columns== at once, and children are placed into the resulting cells.

- \`display: "grid"\` turns an element into a grid container
- \`gridTemplateColumns\` / \`gridTemplateRows\` define the track sizes, often using \`fr\` (fraction) units and \`repeat()\`
- \`gap\` adds space between rows and columns
- \`justifyItems\` / \`alignItems\` position content *within* each cell`,
  longExplanation: `Flexbox is designed to solve one-dimensional problems — a single row, or a single column. Grid was designed for the problem Flexbox handles awkwardly: laying things out along **two dimensions simultaneously**, rows and columns together, the way a spreadsheet or a page layout naturally works.

Turning an element into a grid container is the same pattern as flexbox: \`display: "grid"\`. What's different is what happens next — instead of items flowing along one axis, you explicitly describe a grid of tracks, and children are placed into the cells that grid creates.

- \`gridTemplateColumns\` defines the **column tracks** — how many columns exist and how wide each is. \`"200px 200px 200px"\` creates three fixed 200px columns. Far more common is the \`fr\` unit (a "fraction" of the remaining space): \`"1fr 1fr 1fr"\` creates three equal flexible columns, and \`"2fr 1fr"\` creates a first column twice as wide as the second. \`fr\` units and fixed units can mix freely, e.g. \`"200px 1fr"\` for a fixed sidebar plus a fluid main area.
- \`repeat()\` avoids repeating yourself for many equal tracks: \`repeat(3, 1fr)\` is identical to \`"1fr 1fr 1fr"\`. Combined with \`minmax()\`, \`repeat(auto-fill, minmax(150px, 1fr))\` produces a genuinely responsive grid — as many 150px-minimum columns as fit the container, each stretching to fill any remainder — with zero media queries.
- \`gridTemplateRows\` works identically but for row tracks. When rows aren't explicitly defined, Grid creates "implicit" rows automatically sized by \`gridAutoRows\` (default: sized to content).
- \`gap\` (shorthand for \`rowGap\` + \`columnGap\`) puts consistent space between every row and column line, without the "extra margin on the edge" problem that plagued pre-\`gap\` layouts. Setting a single value like \`gap: 16\` applies it to both dimensions; \`"16px 8px"\` sets row gap and column gap separately.
- \`justifyItems\` and \`alignItems\`, written on the container, position each item's content **inside its own cell** — horizontally and vertically respectively. This is a common point of confusion with Flexbox: in Grid, \`justifyItems\` is about the *horizontal* axis, while in Flexbox, \`justifyContent\` is about whichever axis \`flexDirection\` currently makes the main one. Grid's cross-cutting two-axis nature is exactly why it needs two separately-named alignment properties for the two dimensions, rather than a "main axis / cross axis" pair.

A useful rule of thumb for choosing between the two systems: reach for Flexbox when you're arranging a row or column of items whose sizes are mostly driven by their content (a nav bar, a button group, a card's internal header), and reach for Grid when you're defining an overall page or component *structure* — a fixed number of regions that content gets placed into (a page shell with header/sidebar/main/footer, a photo gallery, a dashboard of cards). They compose well together: a Grid for the big structure, with Flexbox arranging things inside individual grid cells. Every property here is an ordinary CSS property with a direct camelCase equivalent, so plain inline \`style\` objects express all of it — no \`<style>\` tag needed.`,
  examples: [
    {
      id: "basic-three-column-grid",
      title: "A basic three-column grid with fr units",
      summary: "Three equal-width columns created with a single gridTemplateColumns declaration.",
      code: `function App() {
  const cell = { background: "#2563eb", color: "white", padding: 16, borderRadius: 6, textAlign: "center" };
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
      {[1, 2, 3, 4, 5, 6].map((n) => (
        <div key={n} style={cell}>Cell {n}</div>
      ))}
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "fixed-plus-fluid-columns",
      title: "Mixing fixed and fr columns",
      summary: "A fixed 120px sidebar next to a main area that fills all remaining space.",
      code: `function App() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "120px 1fr", gap: 12, height: 140 }}>
      <div style={{ background: "#111827", color: "white", padding: 12, borderRadius: 6 }}>
        Sidebar
        <div style={{ fontSize: 11, opacity: 0.7 }}>120px</div>
      </div>
      <div style={{ background: "#e0e7ff", color: "#3730a3", padding: 12, borderRadius: 6 }}>
        Main content
        <div style={{ fontSize: 11, opacity: 0.8 }}>1fr — fills the rest</div>
      </div>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "repeat-and-minmax-responsive",
      title: "repeat(auto-fill, minmax(...)) — a grid that self-adjusts",
      summary: "As many 100px-minimum columns as fit, no media query required. Try resizing the preview pane.",
      code: `function App() {
  const items = Array.from({ length: 9 }, (_, i) => i + 1);
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))",
        gap: 10,
      }}
    >
      {items.map((n) => (
        <div key={n} style={{ background: "#16a34a", color: "white", padding: 14, borderRadius: 6, textAlign: "center" }}>
          {n}
        </div>
      ))}
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "justify-align-items-in-cells",
      title: "justifyItems and alignItems position content inside cells",
      summary: "Each cell is much bigger than its content — these properties decide where the content sits inside it.",
      code: `function App() {
  const [justify, setJustify] = useState("center");
  const [align, setAlign] = useState("center");
  const options = ["start", "center", "end"];

  return (
    <div style={{ display: "grid", gap: 12 }}>
      <div style={{ display: "flex", gap: 16, fontSize: 13 }}>
        <label>
          justifyItems:{" "}
          <select value={justify} onChange={(e) => setJustify(e.target.value)}>
            {options.map((o) => <option key={o} value={o}>{o}</option>)}
          </select>
        </label>
        <label>
          alignItems:{" "}
          <select value={align} onChange={(e) => setAlign(e.target.value)}>
            {options.map((o) => <option key={o} value={o}>{o}</option>)}
          </select>
        </label>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gridTemplateRows: "80px 80px",
          gap: 8,
          justifyItems: justify,
          alignItems: align,
          background: "#f3f4f6",
          padding: 10,
          borderRadius: 8,
        }}
      >
        {[1, 2, 3, 4].map((n) => (
          <div key={n} style={{ background: "#2563eb", color: "white", padding: "6px 12px", borderRadius: 4 }}>
            {n}
          </div>
        ))}
      </div>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
