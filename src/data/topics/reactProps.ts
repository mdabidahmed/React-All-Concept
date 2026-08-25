import type { Topic } from "../../types";
import { ReactPropsDiagram } from "../../components/molecules/Diagrams/ReactPropsDiagram";

export const reactPropsTopic: Topic = {
  id: "react-props",
  title: "React Props",
  category: "Components",
  shortExplanation: `Props ("properties") are the ==read-only== inputs a parent passes down to a child component, written as JSX attributes and received as the child function's argument object.

- Any JS value can be a prop: string, number, boolean, array, object, even a function
- Props configure a *reusable* component for one particular usage
- Data flows **one way only** — down the tree, parent to child, never back up on its own`,
  longExplanation: `Props are how a component becomes reusable instead of a hardcoded template: a single \`Button\` can accept \`label\` and \`color\` props and decide what to render from its function argument, rather than needing a dozen near-identical copies.

- A prop can be **any JavaScript value** — string, number, boolean, array, object, even a function or another component
- The parent supplies props like HTML attributes; React collects them into a single object and passes it as the child's first argument
- Props are strictly **read-only**: a component must never reassign or mutate the props object it received, since that object may be shared or compared by reference elsewhere in React
- A value that changes over time belongs in *state*, not a mutated prop; state shared between siblings should be *lifted up* to their closest common ancestor and passed down to both
- A child reports events back up via **callback props** (\`onSelect\`, \`onChange\`) — the parent owns the state, the child just calls the function it was given

The result is a strictly ==unidirectional data flow==: given a component's props and its own state, you can always predict what it renders, without needing to know anything about its siblings or worry about hidden two-way bindings.`,
  diagram: ReactPropsDiagram,
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
