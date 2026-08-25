import type { Topic } from "../../types";

export const reactCheckboxTopic: Topic = {
  id: "react-checkbox",
  title: "React Checkbox",
  category: "Forms",
  shortExplanation:
    "A controlled checkbox is driven by a boolean checked prop instead of value, paired with an onChange handler that reads event.target.checked. The same boolean-toggle idea extends to groups of checkboxes backed by an array of selected ids.",
  longExplanation:
    "Checkboxes differ from text-like inputs in which prop React uses to control them: a checkbox's on/off state is expressed with checked (a boolean), not value, and its change handler reads event.target.checked rather than event.target.value. Passing checked without onChange produces the familiar read-only-input warning and an unresponsive box, exactly as with any other controlled field. A single checkbox typically toggles one boolean in state, often used to conditionally render another piece of UI (show/hide a section, enable/disable a button). Groups of checkboxes introduce the classic parent/children pattern — a top-level 'select all' checkbox alongside individual item checkboxes — where the parent's checked state is derived from whether every child is currently checked, and toggling the parent sets every child at once; a fully accurate implementation would also set the DOM node's indeterminate property (via a ref, since there is no indeterminate prop) to represent a partial selection, though many apps simplify this to a plain fully-checked/not-fully-checked boolean. A very common shape for a checkbox list is an array of selected ids: instead of one state variable per item, a single array (or Set) holds the ids that are currently checked, and each checkbox's checked prop is computed by testing membership (selectedIds.includes(id)), while its onChange adds or removes that id from the array. This same array-of-objects-with-a-checked-flag pattern is exactly what powers todo-list-style UIs, where toggling one item's done flag is an immutable map over the array rather than a mutation.",
  examples: [
    {
      id: "single-controlled-checkbox",
      title: "Single controlled checkbox",
      summary: "Toggle a boolean using checked and event.target.checked.",
      code: `function App() {
  const [agreed, setAgreed] = useState(false);

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <input
          type="checkbox"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
        />
        I agree to the terms
      </label>
      <p>Agreed: <strong>{String(agreed)}</strong></p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "checkbox-toggles-visibility",
      title: "Checkbox toggling visibility",
      summary: "Use a boolean checkbox to show or hide another element.",
      code: `function App() {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <input
          type="checkbox"
          checked={showDetails}
          onChange={(e) => setShowDetails(e.target.checked)}
        />
        Show extra details
      </label>
      {showDetails && (
        <div style={{ padding: 12, border: "1px solid #d1d5db", borderRadius: 6 }}>
          Here are the extra details, revealed only while the box is checked.
        </div>
      )}
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "select-all-group",
      title: "Select-all with a group of checkboxes",
      summary: "A parent checkbox stays in sync with whether every child is checked.",
      code: `const initialItems = [
  { id: 1, label: "Milk", checked: false },
  { id: 2, label: "Eggs", checked: false },
  { id: 3, label: "Bread", checked: true },
];

function App() {
  const [items, setItems] = useState(initialItems);
  const allChecked = items.every((item) => item.checked);

  function toggleItem(id) {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item))
    );
  }

  function toggleAll(checked) {
    setItems((prev) => prev.map((item) => ({ ...item, checked })));
  }

  return (
    <div style={{ display: "grid", gap: 8, justifyItems: "start" }}>
      <label style={{ display: "flex", gap: 8, alignItems: "center", fontWeight: 600 }}>
        <input type="checkbox" checked={allChecked} onChange={(e) => toggleAll(e.target.checked)} />
        Select all
      </label>
      <div style={{ display: "grid", gap: 4, paddingLeft: 20 }}>
        {items.map((item) => (
          <label key={item.id} style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <input type="checkbox" checked={item.checked} onChange={() => toggleItem(item.id)} />
            {item.label}
          </label>
        ))}
      </div>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "checkbox-list-array-of-ids",
      title: "Checkbox list backed by an id array",
      summary: "Toggle membership of an id inside a selectedIds array.",
      code: `const options = [
  { id: "js", label: "JavaScript" },
  { id: "ts", label: "TypeScript" },
  { id: "py", label: "Python" },
  { id: "go", label: "Go" },
];

function App() {
  const [selectedIds, setSelectedIds] = useState(["js"]);

  function toggle(id) {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }

  return (
    <div style={{ display: "grid", gap: 8, justifyItems: "start" }}>
      {options.map((opt) => (
        <label key={opt.id} style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <input
            type="checkbox"
            checked={selectedIds.includes(opt.id)}
            onChange={() => toggle(opt.id)}
          />
          {opt.label}
        </label>
      ))}
      <p>Selected: <strong>{selectedIds.length ? selectedIds.join(", ") : "none"}</strong></p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "todo-checkbox-list",
      title: "Todo list with checkbox toggles",
      summary: "Reuse the array-of-objects toggle pattern for a done/undone todo list.",
      code: `const initialTodos = [
  { id: 1, text: "Write React examples", done: false },
  { id: 2, text: "Review pull request", done: true },
  { id: 3, text: "Ship the release", done: false },
];

function App() {
  const [todos, setTodos] = useState(initialTodos);

  function toggleTodo(id) {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, done: !todo.done } : todo))
    );
  }

  const doneCount = todos.filter((t) => t.done).length;

  return (
    <div style={{ display: "grid", gap: 8, justifyItems: "start" }}>
      {todos.map((todo) => (
        <label
          key={todo.id}
          style={{
            display: "flex",
            gap: 8,
            alignItems: "center",
            textDecoration: todo.done ? "line-through" : "none",
            color: todo.done ? "#6b7280" : "inherit",
          }}
        >
          <input type="checkbox" checked={todo.done} onChange={() => toggleTodo(todo.id)} />
          {todo.text}
        </label>
      ))}
      <p>{doneCount} of {todos.length} done</p>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
