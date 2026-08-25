import type { Topic } from "../../types";

export const reactEs6Topic: Topic = {
  id: "react-es6",
  title: "React ES6",
  category: "Getting Started",
  shortExplanation:
    "React code leans heavily on modern JavaScript (ES6 and later): let/const for block-scoped variables, arrow functions and template literals for concise inline logic, destructuring and default parameters for pulling values out of props/state, and spread/rest syntax for copying and combining arrays and objects immutably. Array methods like map, filter, and find are how you turn data into rendered JSX and derived lists.",
  longExplanation:
    "React itself is 'just JavaScript,' but the JavaScript it's written in is almost always modern ES6-and-later syntax, and a lot of what looks like React-specific magic is really plain language features applied consistently. let and const replaced var to give block scoping and, for const, protection against reassignment, which matters in React because props and the destructured values from a hook call are conventionally declared const. Arrow functions are everywhere — as inline event handlers (onClick={() => setCount(c => c + 1)}), as the bodies of function components themselves, and inside array methods — largely because their concise syntax and lack of their own this binding make them ideal for the short callbacks React code is full of. Template literals (backtick strings with ${expr} interpolation) replace clunky string concatenation for building dynamic text, class names, or keys. Destructuring is how props are almost always read (function Card({ title, onClose })) and how a hook's return value is unpacked (const [value, setValue] = useState(...)), and it supports default values inline (function Card({ title = 'Untitled' })) which doubles as a lightweight way to define optional props. The spread operator ({ ...prev, age: prev.age + 1 } or [...items, newItem]) is the idiomatic way to update state immutably: React compares object references to decide whether to re-render, so mutating an existing object or array in place would not reliably trigger updates, while spreading into a new object or array does. The same syntax used as rest parameters collects the remaining arguments or properties (const { id, ...rest } = props) which is common when forwarding most props through to an underlying element. Finally, the array methods map, filter, and find are the standard way to go from a data array to a list of JSX elements, a filtered subset, or a single matching item, and understanding them well is arguably more important to comfortable React development than memorizing any single hook.",
  examples: [
    {
      id: "arrow-template-literals",
      title: "Arrow functions + template literals",
      summary: "Build a greeting string with an arrow function and a template literal.",
      code: `const greet = (name, timeOfDay) => \`Good \${timeOfDay}, \${name}!\`;

function App() {
  const [name, setName] = useState("Ada");
  const [timeOfDay, setTimeOfDay] = useState("morning");

  return (
    <div style={{ display: "grid", gap: 10, maxWidth: 300 }}>
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
      <select value={timeOfDay} onChange={(e) => setTimeOfDay(e.target.value)}>
        <option value="morning">morning</option>
        <option value="afternoon">afternoon</option>
        <option value="evening">evening</option>
      </select>
      <p style={{ margin: 0 }}>{greet(name || "friend", timeOfDay)}</p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "destructuring-defaults",
      title: "Destructuring with default values",
      summary: "Pull fields out of an object and an array, falling back to defaults when missing.",
      code: `function App() {
  const user = { name: "Grace", roles: ["admin", "editor"] };
  const { name, nickname = "no nickname set" } = user;
  const [firstRole = "guest", secondRole = "guest"] = user.roles;
  const [count, setCount] = useState(0);

  return (
    <div style={{ display: "grid", gap: 6, maxWidth: 300 }}>
      <p style={{ margin: 0 }}>Name: <strong>{name}</strong></p>
      <p style={{ margin: 0 }}>Nickname: <strong>{nickname}</strong></p>
      <p style={{ margin: 0 }}>Roles: <strong>{firstRole}, {secondRole}</strong></p>
      <button onClick={() => setCount((c) => c + 1)}>Re-render ({count})</button>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "spread-immutable-update",
      title: "Spread for immutable updates",
      summary: "Why spreading into a new object, not mutating the old one, is what makes React notice a change.",
      code: `function App() {
  const [settings, setSettings] = useState({ theme: "light", notifications: true });

  function toggleTheme() {
    // Spreading creates a NEW object reference, which is what tells React to re-render.
    setSettings((prev) => ({ ...prev, theme: prev.theme === "light" ? "dark" : "light" }));
  }

  function mergeIncoming() {
    const serverUpdate = { notifications: false };
    setSettings((prev) => ({ ...prev, ...serverUpdate }));
  }

  return (
    <div style={{ display: "grid", gap: 10, maxWidth: 300 }}>
      <pre style={{ margin: 0, fontSize: 12 }}>{JSON.stringify(settings, null, 2)}</pre>
      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={toggleTheme}>Toggle theme</button>
        <button onClick={mergeIncoming}>Merge server update</button>
      </div>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "map-filter-list",
      title: "map + filter over a live list",
      summary: "Type into a filter box and watch map/filter recompute the rendered list.",
      code: `function App() {
  const items = ["Apple", "Apricot", "Banana", "Blueberry", "Cherry", "Date"];
  const [query, setQuery] = useState("");

  const visible = items
    .filter((item) => item.toLowerCase().includes(query.toLowerCase()))
    .map((item) => item.toUpperCase());

  return (
    <div style={{ display: "grid", gap: 8, maxWidth: 260 }}>
      <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Filter fruits..." />
      <ul style={{ margin: 0, paddingLeft: 18 }}>
        {visible.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      {visible.length === 0 && <small style={{ color: "#9ca3af" }}>No matches.</small>}
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "ternary-default-params",
      title: "Ternary + default parameters together",
      summary: "A small badge component uses a default parameter and a ternary to pick its label and color.",
      code: `function Badge(status = "pending") {
  const label = status === "done" ? "Done" : status === "error" ? "Failed" : "Pending";
  const color = status === "done" ? "#16a34a" : status === "error" ? "#dc2626" : "#d97706";
  return { label, color };
}

function App() {
  const [status, setStatus] = useState("pending");
  const badge = Badge(status);

  return (
    <div style={{ display: "grid", gap: 10, maxWidth: 260 }}>
      <div style={{ display: "flex", gap: 6 }}>
        {["pending", "done", "error"].map((s) => (
          <button key={s} onClick={() => setStatus(s)} disabled={s === status}>
            {s}
          </button>
        ))}
      </div>
      <span
        style={{
          display: "inline-block",
          padding: "4px 10px",
          borderRadius: 999,
          background: badge.color,
          color: "white",
          fontSize: 13,
          width: "fit-content",
        }}
      >
        {badge.label}
      </span>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
