import type { Topic } from "../../types";

export const reactPropsTopic: Topic = {
  id: "react-props",
  title: "React Props",
  category: "Components",
  shortExplanation:
    "Props ('properties') are the read-only inputs a parent component passes to a child, written as JSX attributes and received as the child function's argument object. They're how a reusable component gets configured for a particular usage, and they flow strictly one way — down the component tree, from parent to child, never back up on their own.",
  longExplanation:
    "Props are React's mechanism for turning a component from a fixed, hardcoded template into something reusable: instead of writing a dozen near-identical Button components, you write one Button that accepts props like label and color and reads them out of its function argument to decide what to render. A prop can be any JavaScript value — a string, number, boolean, array, object, or even another function or component — and the parent supplies it exactly like an HTML attribute, <Widget size={40} onSave={handleSave} />, which React collects into a single object and passes as the first argument to the Widget function. The single most important rule about props is that they are read-only from the receiving component's point of view: a component must never reassign or mutate the props object it was given, because that object may be shared, memoized, or compared by reference elsewhere in React's rendering logic, and mutating it silently breaks those assumptions without necessarily throwing an error. If a component needs to change what's displayed over time, that changing value belongs in state, not in a mutated prop — and if a piece of state needs to be shared between components, the usual move is to lift it up to their closest common ancestor and pass it down to both as props. This top-down flow is also what makes callback props so central to React: since data can't flow back up the tree automatically, a child that needs to notify its parent of something (a click, a selection, a value change) does so by calling a function the parent passed down as a prop, such as onSelect or onChange — the parent owns the state, and the child just reports events into it. The result is a strictly unidirectional data flow that makes big applications easier to reason about: given a component's props (and its own local state), you can always predict what it renders, without needing to know anything about siblings or worry about hidden two-way bindings.",
  examples: [
    {
      id: "basic-prop-passing",
      title: "Passing and reading a prop",
      summary: "A parent passes a name prop; the child reads it off its props object.",
      code: `function Greeting(props) {
  return <p>Hello, {props.name}!</p>;
}

function App() {
  return (
    <div style={{ display: "grid", gap: 4 }}>
      <Greeting name="Ada" />
      <Greeting name="Grace" />
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "multiple-prop-types",
      title: "Props of different types",
      summary: "A single component driven by a string, a number, and a boolean prop.",
      code: `function StockBadge(props) {
  return (
    <div
      style={{
        display: "inline-flex",
        gap: 6,
        padding: "6px 12px",
        borderRadius: 6,
        border: "1px solid #d1d5db",
        alignItems: "center",
      }}
    >
      <strong>{props.name}</strong>
      <span>qty: {props.quantity}</span>
      <span style={{ color: props.inStock ? "#16a34a" : "#dc2626" }}>
        {props.inStock ? "In stock" : "Out of stock"}
      </span>
    </div>
  );
}

function App() {
  return (
    <div style={{ display: "grid", gap: 8 }}>
      <StockBadge name="Widget" quantity={12} inStock={true} />
      <StockBadge name="Gadget" quantity={0} inStock={false} />
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "default-prop-value",
      title: "A prop with a default value",
      summary: "A default parameter supplies a sensible fallback when the prop is omitted.",
      code: `function Avatar(props) {
  const size = props.size || 40;
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: "#2563eb",
        color: "white",
        display: "grid",
        placeItems: "center",
        fontSize: size / 3,
      }}
    >
      {props.initials}
    </div>
  );
}

function App() {
  return (
    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
      <Avatar initials="AL" />
      <Avatar initials="GH" size={64} />
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "function-as-prop",
      title: "Passing a function as a prop",
      summary: "A callback prop lets the child report an event back up to the parent that owns the state.",
      code: `function FruitList(props) {
  return (
    <ul style={{ margin: 0, paddingLeft: 18 }}>
      {props.fruits.map((fruit) => (
        <li key={fruit}>
          {fruit}{" "}
          <button onClick={() => props.onSelect(fruit)}>Pick</button>
        </li>
      ))}
    </ul>
  );
}

function App() {
  const [picked, setPicked] = useState(null);
  const fruits = ["apple", "banana", "cherry"];

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <FruitList fruits={fruits} onSelect={setPicked} />
      <p>Picked: {picked || "nothing yet"}</p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "props-through-multiple-levels",
      title: "Props flowing through two levels",
      summary: "A prop passed from App to Child to Grandchild, unchanged along the way.",
      code: `function Grandchild(props) {
  return <p style={{ margin: 0 }}>Theme received: <strong>{props.theme}</strong></p>;
}

function Child(props) {
  return (
    <div style={{ padding: 8, border: "1px dashed #d1d5db", borderRadius: 6 }}>
      <p style={{ margin: "0 0 6px", fontSize: 12, color: "#6b7280" }}>Child (just forwards theme)</p>
      <Grandchild theme={props.theme} />
    </div>
  );
}

function App() {
  return (
    <div style={{ padding: 8, border: "1px solid #d1d5db", borderRadius: 6, maxWidth: 260 }}>
      <p style={{ margin: "0 0 6px", fontSize: 12, color: "#6b7280" }}>App (owns the theme prop)</p>
      <Child theme="dark" />
    </div>
  );
}

render(<App />);`,
    },
  ],
};
