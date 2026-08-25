import type { Topic } from "../../types";

export const reactForwardRefTopic: Topic = {
  id: "react-forward-ref",
  title: "React Forward Ref",
  category: "Advanced",
  shortExplanation:
    "A plain ref prop passed to a custom component is silently ignored, because refs don't flow through props like other values do. React.forwardRef((props, ref) => ...) opts a component into receiving that ref and lets it attach it to one of its own underlying DOM nodes, which is essential for reusable wrapper components that still need to expose .focus(), .click(), or similar imperative behavior.",
  longExplanation:
    "React treats ref specially: it is not part of the props object a component receives, so writing <MyInput ref={someRef} /> where MyInput is an ordinary function component does nothing useful — someRef.current stays null, and in development React historically warned that function components cannot be given refs. React.forwardRef((props, ref) => element) fixes this by giving a component a second parameter, ref, which the caller's ref is passed into, and which the component can then forward onto whatever DOM node inside it should be the real target — typically by writing ref={ref} on that node. This is the mechanism that makes reusable, styled wrapper components (a design-system TextInput, Button, or Modal) behave like native elements from the outside: a parent can still call .focus() on the input, .click() on the button, or measure the wrapped node's size, exactly as if no wrapper existed. Forwarding the raw DOM node is sometimes too permissive, though — it lets any parent call arbitrary DOM methods and read arbitrary DOM state, which couples callers to implementation details. useImperativeHandle(ref, () => ({ ... })), used together with forwardRef, replaces the forwarded value with a custom object exposing only the specific methods the component author wants to support (e.g. focus and clear), keeping the underlying DOM node itself private. This pattern also generalizes to collections: a list where each row needs its own imperatively-controllable ref (to scroll to it, flash it, or measure it) typically keeps an array or Map of refs — one per item — created with useRef and populated via callback refs or indexed assignment, rather than a single shared ref. The overarching rule to remember is that ref and props are separate channels; forwardRef is the explicit bridge between them for custom components, and useImperativeHandle is the way to control exactly what crosses that bridge.",
  examples: [
    {
      id: "forward-ref-text-input",
      title: "Focusing a wrapped TextInput",
      summary: "A forwardRef-wrapped custom input lets a parent call .focus() on the real DOM node.",
      code: `const TextInput = React.forwardRef(function TextInput(props, ref) {
  return (
    <input
      ref={ref}
      style={{ padding: 6, borderRadius: 6, border: "1px solid #d1d5db" }}
      {...props}
    />
  );
});

function App() {
  const inputRef = useRef(null);

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <TextInput ref={inputRef} placeholder="Click the button to focus me" />
      <button onClick={() => inputRef.current && inputRef.current.focus()}>
        Focus the input
      </button>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "forward-ref-button-click",
      title: "Triggering a wrapped Button",
      summary: "A forwardRef-wrapped Button exposes its DOM node so a parent can call .click().",
      code: `const Button = React.forwardRef(function Button(props, ref) {
  return (
    <button
      ref={ref}
      style={{ padding: "8px 14px", borderRadius: 6, border: "1px solid #d1d5db", background: "#f3f4f6" }}
      {...props}
    />
  );
});

function App() {
  const buttonRef = useRef(null);
  const [clicks, setClicks] = useState(0);

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <Button ref={buttonRef} onClick={() => setClicks((c) => c + 1)}>
        Real button ({clicks} clicks)
      </Button>
      <button onClick={() => buttonRef.current && buttonRef.current.click()}>
        Trigger it programmatically
      </button>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "plain-ref-vs-forward-ref",
      title: "Plain ref vs. forwardRef",
      summary: "A ref on a plain function component doesn't reach the DOM; forwardRef fixes it.",
      code: `// This component does NOT use forwardRef, so a ref passed to it
// is ignored — .current stays null, the DOM node is unreachable.
function PlainInput(props) {
  return <input style={{ padding: 6, borderRadius: 6, border: "1px solid #fca5a5" }} {...props} />;
}

// This one forwards the ref onto the actual <input>, so it works.
const FixedInput = React.forwardRef(function FixedInput(props, ref) {
  return <input ref={ref} style={{ padding: 6, borderRadius: 6, border: "1px solid #86efac" }} {...props} />;
});

function App() {
  const plainRef = useRef(null);
  const fixedRef = useRef(null);
  const [result, setResult] = useState("");

  function checkRefs() {
    setResult(
      \`plainRef.current: \${plainRef.current ? "an input element" : "null"} | fixedRef.current: \${fixedRef.current ? "an input element" : "null"}\`
    );
  }

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <PlainInput ref={plainRef} placeholder="No forwardRef" />
      <FixedInput ref={fixedRef} placeholder="With forwardRef" />
      <button onClick={checkRefs}>Check both refs</button>
      {result && <p>{result}</p>}
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "use-imperative-handle",
      title: "Exposing a limited API",
      summary: "useImperativeHandle exposes only focus and clear, hiding the raw DOM node.",
      code: `const ManagedInput = React.forwardRef(function ManagedInput(props, ref) {
  const inputRef = useRef(null);

  useImperativeHandle(ref, () => ({
    focus() {
      inputRef.current.focus();
    },
    clear() {
      inputRef.current.value = "";
    },
  }));

  return <input ref={inputRef} style={{ padding: 6, borderRadius: 6, border: "1px solid #d1d5db" }} />;
});

function App() {
  const apiRef = useRef(null);

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <ManagedInput ref={apiRef} />
      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={() => apiRef.current.focus()}>Focus</button>
        <button onClick={() => apiRef.current.clear()}>Clear</button>
      </div>
      <small>apiRef only has .focus() and .clear() — no access to the raw input node.</small>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "forward-ref-list-scroll-to-item",
      title: "Scroll to item in a list of refs",
      summary: "Each forwardRef row keeps its own ref inside an array so any item can be targeted.",
      code: `const Row = React.forwardRef(function Row(props, ref) {
  return (
    <div
      ref={ref}
      style={{ padding: 10, border: "1px solid #d1d5db", borderRadius: 6, background: "white" }}
    >
      {props.label}
    </div>
  );
});

function App() {
  const items = ["Alpha", "Bravo", "Charlie", "Delta", "Echo"];
  const rowRefs = useRef(items.map(() => React.createRef()));

  function scrollToItem(index) {
    const node = rowRefs.current[index].current;
    if (node) node.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
        {items.map((label, i) => (
          <button key={label} onClick={() => scrollToItem(i)}>
            Scroll to {label}
          </button>
        ))}
      </div>
      <div style={{ display: "grid", gap: 8, maxHeight: 160, overflowY: "auto", padding: 8, border: "1px dashed #9ca3af", borderRadius: 6 }}>
        {items.map((label, i) => (
          <Row key={label} ref={rowRefs.current[i]} label={label} />
        ))}
      </div>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
