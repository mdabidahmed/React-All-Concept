import type { Topic } from "../../types";

export const cssGridItemsTopic: Topic = {
  id: "css-grid-items",
  title: "CSS Grid: Items",
  category: "CSS Flexbox & Grid",
  shortExplanation: `Grid **items** can span multiple rows or columns, or be placed by ==name== instead of by counting lines — far more flexible than a plain one-cell-per-item layout.

- \`gridColumn\` / \`gridRow\` place an item using **grid line numbers**, e.g. \`"1 / 3"\`
- \`span\` lets an item cover multiple tracks: \`"span 2"\`
- \`gridTemplateAreas\` (on the container) names regions of the grid as text art
- \`gridArea\` (on an item) drops it into one of those named regions`,
  longExplanation: `A plain grid places one item per cell in source order, but real layouts often need an item to be *bigger* than one cell — a hero image spanning two columns, a sidebar spanning every row — or need each region to be easy to identify by name rather than by counting grid lines. Grid items support both.

**Line-based placement.** Every grid has numbered lines running between its tracks, starting at \`1\`. A three-column grid has four vertical lines: \`1\`, \`2\`, \`3\`, \`4\`. \`gridColumn: "1 / 3"\` places an item starting at line 1 and ending at line 3 — spanning the first two columns. The same applies to \`gridRow\` for the row axis. Counting lines by hand gets tedious for large spans, so CSS provides \`span\`: \`gridColumn: "span 2"\` means "start wherever you'd normally go, but cover 2 column tracks" — no need to know the exact line numbers, which is especially useful when the number of columns might change.

- \`gridColumnStart\` / \`gridColumnEnd\` and \`gridRowStart\` / \`gridRowEnd\` are the longhand versions, useful when you only need to control one edge
- A negative line number counts from the **end**: \`-1\` is always the last line, so \`gridColumn: "1 / -1"\` makes an item span the *entire* width of the grid regardless of how many columns it has — a common way to make a header or footer stretch full-width inside an otherwise multi-column layout

**Named areas.** For layouts with a fixed, recognizable shape (a page shell with header/sidebar/main/footer being the classic example), \`gridTemplateAreas\` on the container lets you draw the layout as literal text art, naming each region:

\`\`\`
gridTemplateAreas: '"header header" "sidebar main" "footer footer"'
\`\`\`

Each quoted string is one row, and each word in it names the area that occupies that cell — repeating a name across adjacent cells (like \`header header\`) makes that area span all of them. Then, each child simply declares \`gridArea: "header"\` (or \`"sidebar"\`, \`"main"\`, \`"footer"\`) to drop into its named region — no line-counting at all, and the layout's *shape* is visible at a glance directly in the CSS, which line-based placement doesn't offer. A cell in \`gridTemplateAreas\` marked with a \`.\` is left empty on purpose.

- Every area name used in \`gridTemplateAreas\` must form a **rectangle** — you can't create an L-shaped or non-rectangular area by repeating a name in a non-rectangular pattern; the browser will reject it
- \`gridTemplateAreas\` is usually paired with explicit \`gridTemplateColumns\`/\`gridTemplateRows\` on the same container, so the named regions have concrete track sizes to occupy

Choosing between the two: line-based placement (\`gridColumn\`/\`gridRow\`/\`span\`) is quicker for irregular, dynamic, or data-driven layouts (a gallery where a few featured items span two cells among many uniform ones); named areas shine for a layout with a small, fixed number of well-understood regions that map to a real page structure. Since inline React \`style\` objects accept plain strings for these properties (\`gridTemplateAreas\` as one long string with rows separated by spaces or explicit \`\n\`), everything in this topic works with ordinary \`style={{...}}\` objects — no \`<style>\` tag required.`,
  examples: [
    {
      id: "line-based-span",
      title: "Spanning columns and rows with span",
      summary: "One featured item spans two columns; another spans two rows, among otherwise uniform cells.",
      code: `function App() {
  const cell = { background: "#2563eb", color: "white", padding: 14, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center" };
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gridAutoRows: 70, gap: 8 }}>
      <div style={{ ...cell, gridColumn: "span 2", background: "#1d4ed8" }}>span 2 columns</div>
      <div style={cell}>1</div>
      <div style={{ ...cell, gridRow: "span 2", background: "#1e3a8a" }}>span 2 rows</div>
      <div style={cell}>2</div>
      <div style={cell}>3</div>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "line-numbers-explicit",
      title: "Placing an item with explicit line numbers",
      summary: "gridColumn: \"1 / 3\" and gridColumn: \"1 / -1\" (full width) shown side by side.",
      code: `function App() {
  const cell = { background: "#16a34a", color: "white", padding: 14, borderRadius: 6, textAlign: "center" };
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
      <div style={{ ...cell, gridColumn: "1 / 3" }}>gridColumn: "1 / 3"</div>
      <div style={cell}>3</div>
      <div style={cell}>4</div>
      <div style={{ ...cell, gridColumn: "1 / -1", background: "#065f46" }}>
        gridColumn: "1 / -1" — always full width
      </div>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "named-grid-areas-page-shell",
      title: "A page shell with gridTemplateAreas",
      summary: "Header, sidebar, main, and footer regions named as text art, then filled in by gridArea.",
      code: `function App() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "140px 1fr",
        gridTemplateRows: "50px 1fr 40px",
        gridTemplateAreas: '"header header" "sidebar main" "footer footer"',
        gap: 8,
        height: 260,
      }}
    >
      <div style={{ gridArea: "header", background: "#111827", color: "white", padding: 10, borderRadius: 6 }}>Header</div>
      <div style={{ gridArea: "sidebar", background: "#374151", color: "white", padding: 10, borderRadius: 6 }}>Sidebar</div>
      <div style={{ gridArea: "main", background: "#e0e7ff", color: "#3730a3", padding: 10, borderRadius: 6 }}>Main content</div>
      <div style={{ gridArea: "footer", background: "#374151", color: "white", padding: 10, borderRadius: 6, fontSize: 12 }}>Footer</div>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "responsive-area-reflow",
      title: "Reflowing named areas for a narrow layout",
      summary: "The same three areas rearrange from a sidebar layout into a stacked layout by redefining gridTemplateAreas.",
      code: `function App() {
  const [stacked, setStacked] = useState(false);
  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={() => setStacked((s) => !s)} style={{ justifySelf: "start" }}>
        Toggle stacked layout
      </button>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: stacked ? "1fr" : "120px 1fr",
          gridTemplateAreas: stacked ? '"nav" "main"' : '"nav main"',
          gap: 8,
          height: 160,
        }}
      >
        <div style={{ gridArea: "nav", background: "#111827", color: "white", padding: 10, borderRadius: 6 }}>Nav</div>
        <div style={{ gridArea: "main", background: "#e0e7ff", color: "#3730a3", padding: 10, borderRadius: 6 }}>Main</div>
      </div>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
