import type { Topic } from "../../types";
import { ReactIntroDiagram } from "../../components/molecules/Diagrams/ReactIntroDiagram";

export const reactIntroTopic: Topic = {
  id: "react-intro",
  title: "React Intro",
  category: "Getting Started",
  shortExplanation: `React is a JavaScript library for building user interfaces out of small, ==reusable components==. Instead of manually finding DOM nodes and mutating them, you *describe* what the UI should look like for a given state, and React figures out the DOM changes needed to match.

- A **component** is a function that takes \`props\` (and internal state)
- It returns **JSX** — a description of the UI, not the UI itself
- React turns that description into real DOM changes for you`,
  longExplanation: `Before React, building an interactive interface usually meant writing *imperative* code: find an element with \`document.getElementById\`, mutate its text or attributes, and repeat that dance every time something changed — with the burden of tracking exactly which DOM nodes needed updating falling entirely on the developer. React inverts that relationship: you write ==declarative== UI code that says *what* the interface should look like right now, and React's **reconciler** compares that description to the previous one and applies the minimal set of real DOM changes automatically.

- **Components** are small, self-contained, reusable functions that each own a piece of the UI
- Each component receives inputs called **props** and can hold its own internal **state**
- Whenever props or state change, React *re-invokes* the component function to get a fresh UI description, then reconciles it against what's on screen
- Components are composable: a button component doesn't need to know anything about the page that uses it
- Because a component is "just a function of its inputs," the same inputs always produce the same output — unlike imperative code, where the current UI depends on an unpredictable history of DOM mutations

This ==declarative, component-based, unidirectional-data-flow== model is the foundation everything else in React — hooks, context, routing, server rendering — is built on top of.`,
  diagram: ReactIntroDiagram,
  examples: [
    {
      id: "hello-world",
      title: "Minimal Hello World component",
      summary: "The smallest possible React component: a function that returns JSX.",
      code: `function App() {
  return (
    <div style={{ padding: 16, border: "1px solid #d1d5db", borderRadius: 6 }}>
      <h2 style={{ margin: 0 }}>Hello, React!</h2>
      <p style={{ margin: "8px 0 0", color: "#4b5563" }}>
        This entire UI is just a function that returns JSX.
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "component-tree",
      title: "Composing a component tree",
      summary: "Small components combine into a larger UI, like building blocks.",
      code: `function Avatar({ initials }) {
  return (
    <div
      style={{
        width: 36,
        height: 36,
        borderRadius: "50%",
        background: "#2563eb",
        color: "white",
        display: "grid",
        placeItems: "center",
        fontSize: 13,
        fontWeight: 600,
      }}
    >
      {initials}
    </div>
  );
}

function UserRow({ name, role }) {
  return (
    <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
      <Avatar initials={name.slice(0, 2).toUpperCase()} />
      <div>
        <div style={{ fontWeight: 600 }}>{name}</div>
        <div style={{ fontSize: 12, color: "#6b7280" }}>{role}</div>
      </div>
    </div>
  );
}

function App() {
  return (
    <div style={{ display: "grid", gap: 12 }}>
      <UserRow name="Ada Lovelace" role="Engineer" />
      <UserRow name="Grace Hopper" role="Admiral" />
      <UserRow name="Alan Turing" role="Researcher" />
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "declarative-vs-imperative",
      title: "Declarative vs. imperative, side by side",
      summary: "Compare describing 'what' the UI is versus scripting 'how' to change it step by step.",
      code: `function Card({ title, lines }) {
  return (
    <div style={{ padding: 12, border: "1px solid #d1d5db", borderRadius: 6, display: "grid", gap: 6 }}>
      <strong>{title}</strong>
      <ol style={{ margin: 0, paddingLeft: 18, fontSize: 13, color: "#4b5563" }}>
        {lines.map((line, i) => (
          <li key={i}>{line}</li>
        ))}
      </ol>
    </div>
  );
}

function App() {
  const imperative = [
    "const el = document.getElementById('label')",
    "el.textContent = 'Count: ' + count",
    "el.classList.toggle('highlight', count > 5)",
    "// repeat manually for every place the UI can change",
  ];
  const declarative = [
    "return <span>Count: {count}</span>",
    "className={count > 5 ? 'highlight' : ''}",
    "// React re-renders and diffs the DOM for you",
  ];

  return (
    <div style={{ display: "grid", gap: 12, gridTemplateColumns: "1fr 1fr" }}>
      <Card title="Imperative (manual DOM)" lines={imperative} />
      <Card title="Declarative (React)" lines={declarative} />
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "component-is-a-function",
      title: "A component is just a function",
      summary: "The same Button function is reused three times with different props.",
      code: `function Button({ label, color }) {
  return (
    <button
      style={{
        padding: "8px 14px",
        borderRadius: 6,
        border: "none",
        color: "white",
        background: color,
        cursor: "pointer",
      }}
    >
      {label}
    </button>
  );
}

function App() {
  return (
    <div style={{ display: "flex", gap: 8 }}>
      <Button label="Save" color="#16a34a" />
      <Button label="Cancel" color="#6b7280" />
      <Button label="Delete" color="#dc2626" />
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "ui-follows-state",
      title: "UI updates in response to state",
      summary: "Clicking a button changes state, and React re-renders the description automatically.",
      code: `function App() {
  const [likes, setLikes] = useState(0);

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <p>
        This paragraph is a function of <code>likes</code>: it currently reads
        <strong> {likes} like{likes === 1 ? "" : "s"}</strong>.
      </p>
      <button onClick={() => setLikes((n) => n + 1)}>👍 Like</button>
      <small style={{ color: "#6b7280" }}>
        You never touched the DOM directly — you just changed state and described the result.
      </small>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
