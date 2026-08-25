import type { Topic } from "../../types";
import { ReactListsDiagram } from "../../components/molecules/Diagrams/ReactListsDiagram";

export const reactListsTopic: Topic = {
  id: "react-lists",
  title: "React Lists",
  category: "Components",
  shortExplanation: `Arrays are rendered by calling \`.map()\` to turn each item into an element, and every element needs a stable, unique **\`key\`** prop so React can match items across re-renders.

- \`key\` isn't rendered to the DOM — it's a hint for React's *reconciler*
- Use a stable id from the data, not the array index, whenever the list can reorder
- A wrong key can ==silently== attach the wrong state to the wrong row`,
  longExplanation: `Rendering a list in React is just JavaScript: call \`.map()\` on an array and return one element per item. The \`key\` prop isn't rendered to the DOM at all — it's a hint React's **reconciler** uses to match elements in the new render to elements from the previous one.

- A key must be **stable** (the same item gets the same key every render), **unique** among siblings, and ideally derived from the data itself — a database id, not something regenerated on each render
- Matching keys let React preserve DOM nodes, component state, and focus for items that persist across a re-render, instead of tearing everything down and rebuilding it
- The **array index** works fine for a static list that only appends to the end, but breaks once items can be reordered, filtered, or inserted in the middle — the index is a *position*, not an ==identity==
- With index keys, React can reuse a DOM node (and its local state, like a typed input value) for what is now conceptually a *different* item — a subtly wrong result even though the visible labels look correct
- Filtering or sorting a list is just deriving a new array during render and mapping over that; nested arrays render the same way, one level deeper, each with their own keys

The fix is always the same: give each item a real, stable identifier when the data is created, and use that identifier as the key instead of its position.`,
  diagram: ReactListsDiagram,
  examples: [
    {
      id: "basic-map-list",
      title: "A basic .map()-rendered list",
      summary: "Turning an array of strings into a list of elements.",
      code: `function App() {
  const fruits = ["Apple", "Banana", "Cherry"];

  return (
    <ul style={{ margin: 0, paddingLeft: 18 }}>
      {fruits.map((fruit) => (
        <li key={fruit}>{fruit}</li>
      ))}
    </ul>
  );
}

render(<App />);`,
    },
    {
      id: "stable-id-keys",
      title: "Stable ids as keys",
      summary: "Each item carries its own unique id, used directly as the key.",
      code: `function App() {
  const [users] = useState([
    { id: "u1", name: "Ada Lovelace" },
    { id: "u2", name: "Grace Hopper" },
    { id: "u3", name: "Margaret Hamilton" },
  ]);

  return (
    <ul style={{ display: "grid", gap: 6, listStyle: "none", padding: 0, maxWidth: 240 }}>
      {users.map((user) => (
        <li key={user.id} style={{ border: "1px solid #d1d5db", borderRadius: 6, padding: "6px 10px" }}>
          {user.name}
        </li>
      ))}
    </ul>
  );
}

render(<App />);`,
    },
    {
      id: "index-as-key-bug",
      title: "The index-as-key bug",
      summary: "Inserting an item at the top with index keys makes each row's input show the wrong value.",
      code: `function Row({ label }) {
  const [note, setNote] = useState("");
  return (
    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
      <span style={{ width: 70 }}>{label}</span>
      <input
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="type here"
        style={{ padding: 4, borderRadius: 4, border: "1px solid #d1d5db" }}
      />
    </div>
  );
}

function App() {
  const [items, setItems] = useState([
    { id: 1, label: "Row A" },
    { id: 2, label: "Row B" },
  ]);
  const [useIndex, setUseIndex] = useState(true);

  function insertAtTop() {
    const nextId = Math.max(0, ...items.map((i) => i.id)) + 1;
    setItems((prev) => [{ id: nextId, label: "Row " + String.fromCharCode(64 + nextId) }, ...prev]);
  }

  return (
    <div style={{ display: "grid", gap: 10, maxWidth: 320 }}>
      <label style={{ fontSize: 13, display: "flex", gap: 6 }}>
        <input type="checkbox" checked={useIndex} onChange={(e) => setUseIndex(e.target.checked)} />
        Use array index as key (buggy)
      </label>
      <button onClick={insertAtTop}>Insert new row at top</button>
      <div style={{ display: "grid", gap: 6 }}>
        {items.map((item, index) => (
          <Row key={useIndex ? index : item.id} label={item.label} />
        ))}
      </div>
      <small style={{ color: "#6b7280" }}>
        Type into an input, then insert a row at the top. With index keys, the text
        appears to jump to a different row; with id keys it stays put.
      </small>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "filterable-list",
      title: "A filterable list",
      summary: "A search input filters an array before it's mapped to elements.",
      code: `function App() {
  const [query, setQuery] = useState("");
  const items = ["React", "Redux", "Vite", "Vue", "Svelte", "Angular"];
  const filtered = items.filter((item) => item.toLowerCase().includes(query.toLowerCase()));

  return (
    <div style={{ display: "grid", gap: 8, maxWidth: 220 }}>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Filter..."
        style={{ padding: 6, borderRadius: 6, border: "1px solid #d1d5db" }}
      />
      <ul style={{ margin: 0, paddingLeft: 18 }}>
        {filtered.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      {filtered.length === 0 && <p style={{ margin: 0, color: "#9ca3af" }}>No matches.</p>}
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "nested-list",
      title: "A nested list",
      summary: "Categories, each containing its own array of items, rendered two levels deep.",
      code: `function App() {
  const categories = [
    { id: "c1", name: "Fruits", items: ["Apple", "Banana"] },
    { id: "c2", name: "Vegetables", items: ["Carrot", "Spinach", "Pea"] },
  ];

  return (
    <div style={{ display: "grid", gap: 12 }}>
      {categories.map((category) => (
        <div key={category.id}>
          <strong>{category.name}</strong>
          <ul style={{ margin: "4px 0 0", paddingLeft: 18 }}>
            {category.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

render(<App />);`,
    },
  ],
};
