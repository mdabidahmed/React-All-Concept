import type { Topic } from "../../types";

export const htmlDragDropTopic: Topic = {
  id: "html-drag-drop",
  title: "HTML Drag and Drop",
  category: "HTML APIs",
  shortExplanation: `The **Drag and Drop API** lets any element become draggable, and any other element become a valid drop target, using real native browser events.

- \`draggable={true}\` marks an element as something that can be picked up
- \`onDragStart\` fires when a drag begins — the usual place to record *what* is being dragged
- \`onDragOver\` must call \`e.preventDefault()\`, or the browser refuses to allow a drop at all
- \`onDrop\` fires when the dragged item is released over a valid target`,
  longExplanation: `Drag and drop is one of the oldest native browser interaction models, built entirely from a small set of DOM events fired on the elements involved.

- \`draggable={true}\` on an element makes the browser let the user pick it up with the mouse and start dragging it — most elements aren't draggable by default (text and images have some default drag behavior, but arbitrary elements like a \`<div>\` need this explicitly)
- \`onDragStart\` fires on the element being picked up, the moment the drag begins. This is the natural place to record which item is being dragged, often using \`e.dataTransfer.setData(...)\` to attach data to the drag operation itself
- \`onDragOver\` fires continuously on any element the dragged item is currently hovering over. **Critically, it must call \`e.preventDefault()\`** — by default, the browser's native behavior is to *disallow* dropping almost everywhere, so skipping this one line means \`onDrop\` never fires at all, no matter what else is wired up
- \`onDrop\` fires on the target element when the user releases the dragged item over it. This is where you read back whatever was recorded in \`onDragStart\` (via \`e.dataTransfer.getData(...)\` or, just as commonly in a React app, plain component state) and update the UI accordingly
- A drag interaction usually also calls \`e.preventDefault()\` inside \`onDrop\` itself, to stop the browser from trying to do something else with the dropped content (like navigating to a dropped link or opening a dropped file)

Because \`draggable\`, \`onDragStart\`, \`onDragOver\`, and \`onDrop\` are all real native DOM events with no permission prompt involved, this sandbox can run a genuinely working drag-and-drop example exactly as it would behave in a real page.`,
  examples: [
    {
      id: "basic-drag-into-drop-zone",
      title: "Dragging a single item into a drop zone",
      summary: "A real, working drag-and-drop interaction: drag the box down into the dashed target.",
      code: `function App() {
  const [dropped, setDropped] = useState(false);

  function handleDragStart(e) {
    e.dataTransfer.setData("text/plain", "my-draggable-item");
  }

  function handleDragOver(e) {
    e.preventDefault(); // required, or onDrop never fires
  }

  function handleDrop(e) {
    e.preventDefault();
    const data = e.dataTransfer.getData("text/plain");
    if (data === "my-draggable-item") setDropped(true);
  }

  return (
    <div style={{ display: "grid", gap: 16, maxWidth: 300 }}>
      <div
        draggable
        onDragStart={handleDragStart}
        style={{
          padding: "10px 16px",
          background: "#2563eb",
          color: "white",
          borderRadius: 6,
          cursor: "grab",
          textAlign: "center",
          width: "fit-content",
        }}
      >
        Drag me
      </div>
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        style={{
          border: "2px dashed " + (dropped ? "#15803d" : "#9ca3af"),
          borderRadius: 8,
          padding: 24,
          textAlign: "center",
          color: dropped ? "#15803d" : "#6b7280",
        }}
      >
        {dropped ? "Dropped!" : "Drop here"}
      </div>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "multiple-items-single-target",
      title: "Multiple draggable items, one drop target",
      summary: "dataTransfer carries which specific item was dragged, so the target knows what it received.",
      code: `function App() {
  const items = ["Apple", "Banana", "Cherry"];
  const [received, setReceived] = useState([]);

  function handleDragStart(e, item) {
    e.dataTransfer.setData("text/plain", item);
  }

  function handleDragOver(e) {
    e.preventDefault();
  }

  function handleDrop(e) {
    e.preventDefault();
    const item = e.dataTransfer.getData("text/plain");
    if (item) setReceived((prev) => [...prev, item]);
  }

  return (
    <div style={{ display: "flex", gap: 20, maxWidth: 420 }}>
      <div style={{ display: "grid", gap: 8 }}>
        {items.map((item) => (
          <div
            key={item}
            draggable
            onDragStart={(e) => handleDragStart(e, item)}
            style={{
              padding: "6px 12px",
              background: "#f1f5f9",
              border: "1px solid #d1d5db",
              borderRadius: 6,
              cursor: "grab",
            }}
          >
            {item}
          </div>
        ))}
      </div>
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        style={{
          flex: 1,
          border: "2px dashed #9ca3af",
          borderRadius: 8,
          padding: 12,
          minHeight: 100,
        }}
      >
        <p style={{ margin: "0 0 6px", fontSize: 12, color: "#6b7280" }}>Basket:</p>
        <ul style={{ margin: 0, paddingLeft: 18 }}>
          {received.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "reorderable-list",
      title: "Reordering a list by dragging",
      summary: "Dragging one list item onto another swaps their positions, using onDragOver + onDrop between siblings.",
      code: `function App() {
  const [items, setItems] = useState(["First", "Second", "Third", "Fourth"]);
  const [draggedIndex, setDraggedIndex] = useState(null);

  function handleDrop(targetIndex) {
    if (draggedIndex === null || draggedIndex === targetIndex) return;
    setItems((prev) => {
      const next = [...prev];
      const [moved] = next.splice(draggedIndex, 1);
      next.splice(targetIndex, 0, moved);
      return next;
    });
    setDraggedIndex(null);
  }

  return (
    <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "grid", gap: 6, maxWidth: 240 }}>
      {items.map((item, index) => (
        <li
          key={item}
          draggable
          onDragStart={() => setDraggedIndex(index)}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => { e.preventDefault(); handleDrop(index); }}
          style={{
            padding: "8px 12px",
            background: draggedIndex === index ? "#e0e7ff" : "#f9fafb",
            border: "1px solid #d1d5db",
            borderRadius: 6,
            cursor: "grab",
          }}
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

render(<App />);`,
    },
  ],
};
