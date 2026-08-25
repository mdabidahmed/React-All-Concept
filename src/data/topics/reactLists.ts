import type { Topic } from "../../types";

export const reactListsTopic: Topic = {
  id: "react-lists",
  title: "React Lists",
  category: "Components",
  shortExplanation:
    "Arrays of data are rendered by calling .map() to turn each item into an element, and every element produced this way needs a stable, unique key prop so React can match items across re-renders. Using the array index as a key works only when the list never reorders, filters, or has items inserted in the middle — otherwise it can silently attach the wrong state to the wrong row.",
  longExplanation:
    "Rendering a list in React is just JavaScript: call .map() on an array and return one element per item. The key prop passed to each element isn't rendered to the DOM at all — it's a hint React's reconciler uses to figure out which element in the new render corresponds to which element from the previous render, so it can preserve DOM nodes, component state, and focus for items that persist across a re-render instead of tearing everything down and rebuilding it. A key must be stable (the same item gets the same key on every render), unique among siblings, and ideally derived from the data itself, like a database id, rather than generated fresh on each render. The classic mistake is using the array index as the key, which works fine for a static list that only ever appends to the end, but breaks down the moment items can be reordered, filtered, or inserted anywhere but the end: because the index is really a position, not an identity, React sees 'item at index 0 changed its text' rather than 'a new item was inserted,' and reuses the DOM node (and any local state, like an input's typed value or a checkbox's checked state) for what is now conceptually a different item. This produces subtle, hard-to-spot bugs where uncontrolled inputs appear to keep the wrong value after the list changes shape, even though the visible labels look correct. The fix is always the same: give each item a real, stable identifier when the data is created, and use that identifier as the key instead of its position. Lists commonly need to be filtered or sorted before rendering, which is simply deriving a new array during render and mapping over that instead of the original, and lists of objects can themselves contain nested arrays, which are rendered the same way, one level deeper, each with their own keys.",
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
