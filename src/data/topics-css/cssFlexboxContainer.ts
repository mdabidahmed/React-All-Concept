import type { Topic } from "../../types";

export const cssFlexboxContainerTopic: Topic = {
  id: "css-flexbox-container",
  title: "CSS Flexbox: Container",
  category: "CSS Flexbox & Grid",
  shortExplanation: `**Flexbox** is a one-dimensional layout system — it arranges children in a single row or column and gives the *parent* a set of properties to control how they're spaced and aligned along that line.

- \`display: "flex"\` turns an element into a flex ==container== and its direct children into flex items
- \`flexDirection\` chooses the axis: \`"row"\` (default) or \`"column"\`
- \`justifyContent\` aligns items along the **main** axis; \`alignItems\` aligns them along the **cross** axis
- \`flexWrap\` lets items wrap onto new lines instead of squeezing into one
- \`gap\` adds space between items without needing margins`,
  longExplanation: `Before flexbox, centering something vertically or evenly spacing a row of items required hacks involving floats, \`display: table\`, or absolute positioning with negative margins. Flexbox was designed specifically to solve *one-dimensional* layout problems — arranging items along a single row or a single column — and it does so by moving almost all of the interesting decisions onto the **container**, not the items.

Turning any element into a flex container is a single declaration: \`display: "flex"\`. The moment you do that, every direct child becomes a "flex item," and a whole new set of properties on the *parent* start controlling how those children are laid out. This is the first thing to get comfortable with — properties like \`justifyContent\` and \`alignItems\` are written on the container, not on the items you're trying to move.

- \`flexDirection\` decides which axis is the **main axis**. \`"row"\` (the default) lays items left-to-right, making the main axis horizontal; \`"column"\` stacks them top-to-bottom, making the main axis vertical. Every other alignment property is defined *relative to* whichever axis is currently the main one — this is the detail that trips people up most, because switching \`flexDirection\` silently swaps what \`justifyContent\` and \`alignItems\` each do.
- \`justifyContent\` controls spacing **along the main axis**: \`"flex-start"\`, \`"center"\`, \`"flex-end"\`, \`"space-between"\` (items spread out, no space at the very ends), \`"space-around"\` (equal space around each item), and \`"space-evenly"\` (perfectly equal gaps everywhere, including the ends).
- \`alignItems\` controls positioning **along the cross axis** (perpendicular to the main axis): \`"stretch"\` (the default — items grow to fill the cross axis), \`"flex-start"\`, \`"center"\`, \`"flex-end"\`. This single property is the classic one-line fix for "how do I vertically center something," because in a row-direction container the cross axis is vertical.
- \`flexWrap: "wrap"\` allows items that don't fit on one line to flow onto additional lines, rather than the default \`"nowrap"\` behavior of shrinking everything to fit (or overflowing). When wrapping is on, \`alignContent\` additionally controls how the resulting *lines* are spaced within the container, distinct from how items are aligned within each line.
- \`gap\` puts consistent space **between** items (and between wrapped lines) without the classic "extra margin on the last child" problem that came from styling items individually with \`margin-right\`.

A useful mental model: flexbox answers "how do these items share this row/column?" while its sibling, Grid (covered in the next topics), answers "how do things line up across *two* dimensions at once?" Many real interfaces use both — a page-level Grid for overall structure, with Flexbox handling the one-dimensional arrangement inside individual pieces like a toolbar, a card's header, or a button group. Because \`display: flex\`, \`flexDirection\`, \`justifyContent\`, \`alignItems\`, \`flexWrap\`, and \`gap\` are all ordinary CSS properties, they translate directly into a React \`style\` object using their camelCase names — no \`<style>\` tag is needed for any of it.`,
  examples: [
    {
      id: "row-vs-column",
      title: "flexDirection: row vs. column",
      summary: "The exact same three boxes laid out horizontally, then vertically, just by flipping flexDirection.",
      code: `function Boxes() {
  const box = { width: 60, height: 60, background: "#2563eb", color: "white", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 6 };
  return (
    <>
      <div style={box}>1</div>
      <div style={box}>2</div>
      <div style={box}>3</div>
    </>
  );
}

function App() {
  return (
    <div style={{ display: "grid", gap: 20 }}>
      <div>
        <p style={{ margin: "0 0 6px", fontSize: 13, color: "#6b7280" }}>flexDirection: "row"</p>
        <div style={{ display: "flex", flexDirection: "row", gap: 10 }}>
          <Boxes />
        </div>
      </div>
      <div>
        <p style={{ margin: "0 0 6px", fontSize: 13, color: "#6b7280" }}>flexDirection: "column"</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <Boxes />
        </div>
      </div>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "justify-content-options",
      title: "Comparing justifyContent values",
      summary: "Toggle through the main-axis alignment options on the same row of items.",
      code: `function App() {
  const options = ["flex-start", "center", "flex-end", "space-between", "space-around", "space-evenly"];
  const [choice, setChoice] = useState("space-between");

  return (
    <div style={{ display: "grid", gap: 12 }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => setChoice(opt)}
            style={{
              padding: "4px 8px",
              fontSize: 12,
              borderRadius: 4,
              border: "1px solid #d1d5db",
              background: choice === opt ? "#111827" : "white",
              color: choice === opt ? "white" : "#111827",
            }}
          >
            {opt}
          </button>
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: choice, gap: 8, background: "#f3f4f6", padding: 10, borderRadius: 8 }}>
        {[1, 2, 3].map((n) => (
          <div key={n} style={{ width: 50, height: 50, background: "#2563eb", color: "white", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 6 }}>
            {n}
          </div>
        ))}
      </div>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "align-items-center",
      title: "Vertically centering with alignItems",
      summary: "A one-line fix for the classic 'how do I center this vertically' problem.",
      code: `function App() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: 160,
        background: "#111827",
        borderRadius: 12,
      }}
    >
      <div style={{ background: "white", padding: "12px 20px", borderRadius: 8, fontWeight: 600 }}>
        Perfectly centered, both axes
      </div>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "flex-wrap-and-gap",
      title: "flexWrap and gap together",
      summary: "Shrink the container mentally — items wrap onto new lines, each still separated by a consistent gap.",
      code: `function App() {
  const tags = ["React", "TypeScript", "Vite", "CSS Grid", "Flexbox", "Accessibility", "Testing", "Performance"];
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: 8,
        maxWidth: 260,
        padding: 12,
        background: "#f9fafb",
        borderRadius: 8,
        border: "1px solid #e5e7eb",
      }}
    >
      {tags.map((tag) => (
        <span key={tag} style={{ background: "#e0e7ff", color: "#3730a3", padding: "4px 10px", borderRadius: 999, fontSize: 13 }}>
          {tag}
        </span>
      ))}
    </div>
  );
}

render(<App />);`,
    },
  ],
};
