import type { Topic } from "../../types";

export const propsCompositionTopic: Topic = {
  id: "props-composition",
  title: "Props & Composition",
  category: "Fundamentals",
  shortExplanation:
    "Props are the read-only inputs a parent passes to a child component. Composition means building complex UIs by nesting and combining small components — including passing components as children or as props — rather than through inheritance.",
  longExplanation:
    "Props ('properties') are how data flows down a React tree: a parent renders <Child name=\"Ada\" /> and the Child component receives { name: \"Ada\" } as its function argument. Props are read-only from the child's perspective — a component must never mutate its own props; if it needs to change what's displayed, that change belongs in state (owned by the component itself or lifted to a shared ancestor). React deliberately favors composition over inheritance: instead of building a class hierarchy of components, you build small, focused components and combine them. The most powerful composition tool is the special children prop — anything nested between a component's opening and closing tags is passed to it as props.children, which lets you write generic 'container' or 'layout' components (Card, Modal, Layout) that don't need to know what they'll render inside. Composition also covers passing a component (or a render function) as a prop, letting a parent customize a specific piece of a child's output without the child needing to know the details — this is how flexible, reusable component libraries are built. Two other everyday patterns: 'lifting state up' (moving state to the closest common ancestor of the components that need to share it) and destructuring props in the function signature for readability.",
  examples: [
    {
      id: "basic-props",
      title: "Passing and reading props",
      summary: "A reusable Greeting component driven entirely by its props.",
      code: `function Greeting({ name, excited }) {
  return <p>Hello, {name}{excited ? "!" : "."}</p>;
}

function App() {
  return (
    <div style={{ display: "grid", gap: 4 }}>
      <Greeting name="Ada" excited />
      <Greeting name="Grace" excited={false} />
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "children-prop",
      title: "The children prop for generic containers",
      summary: "A Card component that has no idea what it will render inside.",
      code: `function Card({ title, children }) {
  return (
    <div style={{ border: "1px solid #d1d5db", borderRadius: 8, padding: 12, maxWidth: 260 }}>
      <h4 style={{ margin: "0 0 8px" }}>{title}</h4>
      {children}
    </div>
  );
}

function App() {
  return (
    <div style={{ display: "grid", gap: 12 }}>
      <Card title="Text card">
        <p style={{ margin: 0 }}>Any JSX can go here.</p>
      </Card>
      <Card title="Button card">
        <button>I'm nested inside via children</button>
      </Card>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "lifting-state-up",
      title: "Lifting state up to a shared parent",
      summary: "Two sibling inputs stay in sync via state owned by their parent.",
      code: `function CelsiusInput({ celsius, onChange }) {
  return (
    <label style={{ display: "grid", gap: 4 }}>
      Celsius
      <input
        type="number"
        value={celsius}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </label>
  );
}

function FahrenheitInput({ fahrenheit, onChange }) {
  return (
    <label style={{ display: "grid", gap: 4 }}>
      Fahrenheit
      <input
        type="number"
        value={fahrenheit}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </label>
  );
}

function App() {
  // Single source of truth lives here, in the closest common ancestor.
  const [celsius, setCelsius] = useState(20);

  return (
    <div style={{ display: "flex", gap: 16 }}>
      <CelsiusInput celsius={celsius} onChange={setCelsius} />
      <FahrenheitInput
        fahrenheit={Math.round(celsius * 1.8 + 32)}
        onChange={(f) => setCelsius(Math.round(((f - 32) * 5) / 9))}
      />
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "component-as-prop",
      title: "Passing a component as a prop",
      summary: "A List component that lets the caller customize how each row renders.",
      code: `function List({ items, renderItem }) {
  return (
    <ul style={{ margin: 0, paddingLeft: 18 }}>
      {items.map((item, i) => (
        <li key={i}>{renderItem(item)}</li>
      ))}
    </ul>
  );
}

function App() {
  const fruits = ["apple", "banana", "cherry"];
  return (
    <List
      items={fruits}
      renderItem={(fruit) => <strong style={{ textTransform: "capitalize" }}>{fruit}</strong>}
    />
  );
}

render(<App />);`,
    },
    {
      id: "default-and-spread-props",
      title: "Default props and spreading the rest",
      summary: "Default parameter values plus a ...rest pattern for pass-through props.",
      code: `function Button({ variant = "primary", children, ...rest }) {
  const styles = {
    primary: { background: "#2563eb", color: "white" },
    ghost: { background: "transparent", color: "#2563eb", border: "1px solid #2563eb" },
  };
  return (
    <button
      {...rest}
      style={{ ...styles[variant], padding: "8px 14px", borderRadius: 6, border: "none" }}
    >
      {children}
    </button>
  );
}

function App() {
  return (
    <div style={{ display: "flex", gap: 8 }}>
      <Button onClick={() => alert("primary clicked")}>Primary</Button>
      <Button variant="ghost" onClick={() => alert("ghost clicked")}>Ghost</Button>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
