import type { Topic } from "../../types";

export const hooksIntroTopic: Topic = {
  id: "hooks-intro",
  title: "What is Hooks?",
  category: "Core Hooks",
  shortExplanation:
    "Hooks are plain functions, always starting with 'use', that let function components 'hook into' React features — state, effects, context, refs — that used to require class components. Two rules govern them: only call hooks at the top level of a component (never inside conditionals, loops, or nested functions), and only call them from React function components or other custom hooks.",
  longExplanation:
    "Before hooks were introduced in React 16.8, a function component could only render UI from its props — anything stateful (a counter, a form value, a subscription) required rewriting the component as a class, with state living on this.state, updates going through this.setState, and lifecycle logic split across separate methods like componentDidMount and componentWillUnmount even when that logic was conceptually one piece of behavior. Hooks let a plain function component opt into these same capabilities directly: useState gives it a piece of local state, useEffect lets it run code in response to render (replacing the scattered lifecycle methods with logic grouped by concern instead of by timing), useContext reads a value provided higher in the tree, useRef holds a mutable value that doesn't trigger re-renders, and useReducer, useMemo, and useCallback build on these fundamentals for more specific needs. The name convention (every hook starts with 'use') exists so React's linter and tooling can enforce the two rules that make hooks work at all: hooks must be called in the same order on every render, which is only guaranteed if they're called unconditionally at the top level of the function (never inside an if, a loop, or a callback), because React tracks each hook's state by the position it was called in, not by name; and hooks can only be called from function components or from other custom hooks, never from regular helper functions or outside the render flow, since that's the only context where React's per-component bookkeeping is available. This app's Core Hooks section walks through the built-in hooks one at a time — useState, useEffect, useContext, useRef, useReducer, useMemo, useCallback — and the Composition section shows how you can package your own logic into custom hooks (functions like useToggle or useDebouncedValue that call built-in hooks internally), which is the idiomatic way to share stateful behavior between components once you're comfortable with the basics.",
  examples: [
    {
      id: "before-and-after-hooks",
      title: "Before hooks vs. with hooks",
      summary: "A class-based counter and a hook-based counter side by side, doing the exact same thing.",
      code: `class ClassCounter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
    this.increment = this.increment.bind(this);
  }
  increment() {
    this.setState({ count: this.state.count + 1 });
  }
  render() {
    return <button onClick={this.increment}>Class count: {this.state.count}</button>;
  }
}

function HookCounter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>Hook count: {count}</button>;
}

function App() {
  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <ClassCounter />
      <HookCounter />
      <small>Same behavior — the hook version needs no constructor, no "this", no manual binding.</small>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "top-level-rule",
      title: "The 'top level only' rule, done correctly",
      summary: "Both hooks are declared unconditionally at the top of the component; the condition lives in the logic below, not around the hook call.",
      code: `function App() {
  // Correct: both hooks are called unconditionally, every render, in the same order.
  const [showDetails, setShowDetails] = useState(false);
  const [visits, setVisits] = useState(0);

  // Wrong (do NOT do this): wrapping a hook call itself in a condition, e.g.
  //   if (showDetails) { const [x, setX] = useState(0); }
  // breaks React's ability to track hook state, because the number/order of
  // hook calls would then vary between renders.

  useEffect(() => {
    setVisits((v) => v + 1);
  }, []);

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <p>Component has rendered/mounted {visits} time(s).</p>
      <button onClick={() => setShowDetails((s) => !s)}>
        {showDetails ? "Hide" : "Show"} details
      </button>
      {showDetails && <p>The condition lives in the JSX, not around the hook call above.</p>}
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "two-hooks-together",
      title: "Two hooks working together",
      summary: "useState holds a value and useEffect keeps a derived, formatted version of it in sync.",
      code: `function App() {
  const [name, setName] = useState("ada");
  const [formatted, setFormatted] = useState("");

  useEffect(() => {
    setFormatted(name.charAt(0).toUpperCase() + name.slice(1));
  }, [name]);

  return (
    <div style={{ display: "grid", gap: 8, maxWidth: 240 }}>
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Type a name" />
      <p>Formatted: <strong>{formatted}</strong></p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "hooks-are-just-functions",
      title: "Hooks are just functions",
      summary: "A tiny custom hook, useDoubled, is defined inline and used like any built-in hook.",
      code: `function useDoubled(value) {
  // A custom hook is nothing more than a function that calls other hooks.
  const [doubled, setDoubled] = useState(value * 2);

  useEffect(() => {
    setDoubled(value * 2);
  }, [value]);

  return doubled;
}

function App() {
  const [number, setNumber] = useState(4);
  const doubled = useDoubled(number);

  return (
    <div style={{ display: "grid", gap: 8, maxWidth: 240 }}>
      <input
        type="number"
        value={number}
        onChange={(e) => setNumber(Number(e.target.value))}
      />
      <p>{number} doubled is <strong>{doubled}</strong></p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "reusing-a-custom-hook",
      title: "Reusing the same custom hook twice",
      summary: "useDoubled is called twice in one component, and each call keeps its own independent state.",
      code: `function useDoubled(value) {
  const [doubled, setDoubled] = useState(value * 2);
  useEffect(() => {
    setDoubled(value * 2);
  }, [value]);
  return doubled;
}

function App() {
  const [priceA, setPriceA] = useState(10);
  const [priceB, setPriceB] = useState(25);

  const doubledA = useDoubled(priceA);
  const doubledB = useDoubled(priceB);

  return (
    <div style={{ display: "grid", gap: 10, maxWidth: 280 }}>
      <div style={{ display: "grid", gap: 4 }}>
        <label>Item A price</label>
        <input type="number" value={priceA} onChange={(e) => setPriceA(Number(e.target.value))} />
        <small>Doubled: {doubledA}</small>
      </div>
      <div style={{ display: "grid", gap: 4 }}>
        <label>Item B price</label>
        <input type="number" value={priceB} onChange={(e) => setPriceB(Number(e.target.value))} />
        <small>Doubled: {doubledB}</small>
      </div>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
