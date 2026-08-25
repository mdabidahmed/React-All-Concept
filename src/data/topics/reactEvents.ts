import type { Topic } from "../../types";
import { ReactEventsDiagram } from "../../components/molecules/Diagrams/ReactEventsDiagram";

export const reactEventsTopic: Topic = {
  id: "react-events",
  title: "React Events",
  category: "Components",
  shortExplanation: `React handles DOM events through camelCase props like \`onClick\`, \`onChange\`, and \`onSubmit\` — you pass a **function reference**, not a function call.

- \`onClick={handleClick}\` passes a reference; \`onClick={handleClick()}\` calls it immediately during render — a common mistake
- The handler receives an event object: \`event.target.value\`, \`event.preventDefault()\`, and more
- Pass extra arguments by wrapping the call in an inline arrow function: \`onClick={() => remove(id)}\``,
  longExplanation: `Event handling in React looks like HTML's inline \`onclick\` attributes but works differently underneath: you pass an actual function as the value of a camelCase prop — \`onClick\`, \`onChange\`, \`onSubmit\`, \`onMouseEnter\`, and so on — and React attaches the listener for you.

- \`onClick={handleClick()}\` calls the function immediately during render and passes its return value (usually \`undefined\`) as the handler — always pass the *reference*, \`onClick={handleClick}\`
- The handler receives an event object — historically a ==SyntheticEvent== wrapper for cross-browser consistency, though modern React exposes the native event directly in most cases — with familiar members like \`event.target.value\` and \`event.preventDefault()\`
- A handler prop only accepts one function, so extra arguments (which row was clicked) require wrapping the call in an inline arrow function: \`onClick={() => removeItem(item.id)}\`
- By convention, the prop describes the *event* (\`onClick\`) while the function describes the *action* (\`handleClick\`), which keeps large components easier to scan
- Multiple event props can sit on the same element at once — \`onClick\`, \`onMouseEnter\`, \`onMouseLeave\` — since each is just a separate prop`,
  diagram: ReactEventsDiagram,
  examples: [
    {
      id: "basic-click-handler",
      title: "A basic click handler",
      summary: "A function reference passed to onClick, called once per click.",
      code: `function App() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount((c) => c + 1);
  }

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <p>Clicked {count} times</p>
      <button onClick={handleClick}>Click me</button>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "controlled-input-onchange",
      title: "Reading event.target.value",
      summary: "A controlled input updates state from the event object on every keystroke.",
      code: `function App() {
  const [text, setText] = useState("");

  function handleChange(event) {
    setText(event.target.value);
  }

  return (
    <div style={{ display: "grid", gap: 8, maxWidth: 260 }}>
      <input value={text} onChange={handleChange} placeholder="Type something" />
      <p style={{ margin: 0, color: "#4b5563" }}>You typed: {text || "(nothing yet)"}</p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "form-submit-prevent-default",
      title: "onSubmit with preventDefault",
      summary: "Stopping the browser's default full-page reload when a form is submitted.",
      code: `function App() {
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    setSubmitted(name);
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "grid", gap: 8, maxWidth: 260 }}>
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
      <button type="submit">Submit</button>
      {submitted && <p style={{ margin: 0 }}>Hello, {submitted}!</p>}
    </form>
  );
}

render(<App />);`,
    },
    {
      id: "extra-argument-handler",
      title: "Passing an extra argument to a handler",
      summary: "Each button removes 'its own' item by wrapping the handler in an inline arrow function.",
      code: `function App() {
  const [items, setItems] = useState([
    { id: 1, label: "Milk" },
    { id: 2, label: "Eggs" },
    { id: 3, label: "Bread" },
  ]);

  function removeItem(id) {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }

  return (
    <ul style={{ display: "grid", gap: 6, listStyle: "none", padding: 0, maxWidth: 220 }}>
      {items.map((item) => (
        <li
          key={item.id}
          style={{
            display: "flex",
            justifyContent: "space-between",
            border: "1px solid #d1d5db",
            borderRadius: 6,
            padding: "6px 10px",
          }}
        >
          {item.label}
          <button onClick={() => removeItem(item.id)}>Remove</button>
        </li>
      ))}
    </ul>
  );
}

render(<App />);`,
    },
    {
      id: "multiple-event-types",
      title: "Multiple event types on one element",
      summary: "onMouseEnter, onMouseLeave, and onClick combined on a single hoverable card.",
      code: `function App() {
  const [hovered, setHovered] = useState(false);
  const [clicks, setClicks] = useState(0);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => setClicks((c) => c + 1)}
      style={{
        border: "1px solid #d1d5db",
        borderRadius: 8,
        padding: 16,
        maxWidth: 220,
        cursor: "pointer",
        background: hovered ? "#eef2ff" : "white",
        transition: "background 0.15s",
      }}
    >
      <p style={{ margin: 0 }}>{hovered ? "Hovering!" : "Hover over me"}</p>
      <p style={{ margin: "4px 0 0", fontSize: 12, color: "#6b7280" }}>Clicked {clicks} times</p>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
