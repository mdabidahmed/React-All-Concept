import type { Topic } from "../../types";

export const reactConditionalsTopic: Topic = {
  id: "react-conditionals",
  title: "React Conditionals",
  category: "Components",
  shortExplanation:
    "Conditional rendering decides which UI a component shows, or whether it shows anything at all, using ordinary JavaScript — ternaries, &&, early returns, or a variable holding JSX. Returning null from a component renders nothing to the DOM, which is the standard way to make a piece of UI optionally disappear.",
  longExplanation:
    "React has no special 'if' syntax in JSX; instead, conditional rendering is just JavaScript deciding what value a component's render logic produces, and the four idioms that cover almost every case are the ternary operator (condition ? <A /> : <B />) for a clean two-way branch, the && operator (condition && <A />) for rendering something or nothing at all, an early return at the top of the component body for guard clauses, and building up a variable that holds a piece of JSX before the final return, useful once the logic gets too branchy for a one-liner. A component is allowed to return null, and React treats that as 'render nothing here' — no DOM node is created — which is the idiomatic way to make a component conditionally invisible without wrapping every usage of it in a conditional at the call site. A frequent pitfall with && is that if the left-hand value is a number like 0, React renders the literal '0' to the screen instead of nothing, since 0 is falsy but still a renderable value — the fix is to coerce it to a boolean (count > 0 && ...) or use a ternary instead. For UIs with more than two states — a status badge, a loading/error/success flow, a multi-step wizard — a lookup object keyed by state or an if/else-if chain scales better than nested ternaries, which quickly become unreadable past one level of nesting. These patterns compose naturally with lists: each item in a rendered array can independently decide its own appearance based on a field on that item, which is how checklists, notification badges, and per-row conditional styling are typically implemented. Conditional rendering is a normal part of every re-render — there's no separate 'update' step to think about, React simply re-evaluates the same logic with the latest state or props.",
  examples: [
    {
      id: "component-returns-null",
      title: "A component that returns null",
      summary: "A Banner conditionally renders nothing at all when dismissed.",
      code: `function Banner({ visible }) {
  if (!visible) return null;
  return (
    <div style={{ background: "#fef3c7", padding: 10, borderRadius: 6 }}>
      This banner can disappear entirely.
    </div>
  );
}

function App() {
  const [show, setShow] = useState(true);
  return (
    <div style={{ display: "grid", gap: 10, maxWidth: 260 }}>
      <Banner visible={show} />
      <button onClick={() => setShow((v) => !v)}>Toggle banner</button>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "ternary-two-state",
      title: "Ternary-based two-state UI",
      summary: "A logged-in/logged-out view switch using a single ternary.",
      code: `function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div style={{ display: "grid", gap: 10, maxWidth: 240 }}>
      {loggedIn ? (
        <p style={{ margin: 0 }}>Welcome back!</p>
      ) : (
        <p style={{ margin: 0 }}>Please log in.</p>
      )}
      <button onClick={() => setLoggedIn((v) => !v)}>
        {loggedIn ? "Log out" : "Log in"}
      </button>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "multi-branch-status-badge",
      title: "Multi-branch status badge",
      summary: "A lookup object maps a status string to its label and color, avoiding nested ternaries.",
      code: `const statusConfig = {
  active: { label: "Active", color: "#166534", background: "#dcfce7" },
  pending: { label: "Pending", color: "#92400e", background: "#fef3c7" },
  suspended: { label: "Suspended", color: "#991b1b", background: "#fee2e2" },
};

function StatusBadge({ status }) {
  const config = statusConfig[status] ?? { label: "Unknown", color: "#374151", background: "#e5e7eb" };
  return (
    <span
      style={{
        padding: "3px 10px",
        borderRadius: 999,
        fontSize: 12,
        color: config.color,
        background: config.background,
      }}
    >
      {config.label}
    </span>
  );
}

function App() {
  return (
    <div style={{ display: "flex", gap: 8 }}>
      <StatusBadge status="active" />
      <StatusBadge status="pending" />
      <StatusBadge status="suspended" />
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "loading-error-success",
      title: "Loading / error / success states",
      summary: "A three-state UI pattern common to almost every data-fetching component.",
      code: `function Result({ state }) {
  if (state === "loading") return <p>Loading...</p>;
  if (state === "error") return <p style={{ color: "#dc2626" }}>Something went wrong.</p>;
  return <p style={{ color: "#166534" }}>Data loaded successfully!</p>;
}

function App() {
  const [state, setState] = useState("loading");

  return (
    <div style={{ display: "grid", gap: 10, maxWidth: 260 }}>
      <Result state={state} />
      <div style={{ display: "flex", gap: 6 }}>
        <button onClick={() => setState("loading")}>Loading</button>
        <button onClick={() => setState("error")}>Error</button>
        <button onClick={() => setState("success")}>Success</button>
      </div>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "checklist-per-item-condition",
      title: "A checklist with per-item conditions",
      summary: "Each item's appearance depends on its own boolean 'done' field.",
      code: `function App() {
  const [items, setItems] = useState([
    { id: 1, text: "Write the topic", done: true },
    { id: 2, text: "Add examples", done: true },
    { id: 3, text: "Proofread", done: false },
  ]);

  function toggle(id) {
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, done: !item.done } : item)));
  }

  return (
    <ul style={{ display: "grid", gap: 6, listStyle: "none", padding: 0, maxWidth: 240 }}>
      {items.map((item) => (
        <li key={item.id} style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <input type="checkbox" checked={item.done} onChange={() => toggle(item.id)} />
          <span
            style={{
              textDecoration: item.done ? "line-through" : "none",
              color: item.done ? "#9ca3af" : "#111827",
            }}
          >
            {item.text}
          </span>
        </li>
      ))}
    </ul>
  );
}

render(<App />);`,
    },
  ],
};
