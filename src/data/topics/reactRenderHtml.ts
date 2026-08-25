import type { Topic } from "../../types";

export const reactRenderHtmlTopic: Topic = {
  id: "react-render-html",
  title: "React Render HTML",
  category: "Getting Started",
  shortExplanation: `React turns JSX into real DOM nodes by calling \`createRoot\` on a container element, then \`.render(<App />)\` on that root.

- A **root** is the bridge between a plain DOM node and React's virtual tree
- On every update, React ==reconciles== the new description against the previous one
- It patches only the parts of the real DOM that actually changed — never a full rebuild`,
  longExplanation: `When a React app starts, the entry file grabs a real DOM element — usually a single \`<div id="root">\` in \`index.html\` — and calls \`createRoot(container).render(<App />)\`. That call does two things: it establishes a **root**, React's internal bookkeeping tied to that container, and it renders the \`App\` element tree into it for the first time, producing actual DOM nodes from the JSX you wrote.

- On every update after that, React does **not** throw away the DOM and rebuild it from scratch — that would be slow and would destroy things like input focus, scroll position, and CSS transition state
- Instead React keeps a lightweight internal representation of the UI tree and, on each render, diffs the new version against the previous one — a process called ==reconciliation==
- It then generates the *minimal* set of real DOM operations needed to sync the page: updating a text node here, adding an attribute there, inserting or removing an element only where the tree actually differs
- Elements are matched by their position in the tree and, for lists, by a **key** prop — which is why stable keys matter for correctness and performance
- Sibling elements that don't depend on changed state are left completely untouched during a re-render, even though the component function reruns — rerunning the function is cheap, but React only *commits* the DOM writes that actually differ

Understanding root-mounting and diffing explains a lot of React's behavior at once: why forms preserve focus across re-renders, why unrelated parts of the page don't flicker, and why keys matter once lists get involved.`,
  examples: [
    {
      id: "plain-tags",
      title: "Rendering plain HTML tags via JSX",
      summary: "JSX tags like <h2> and <ul> compile down to real DOM elements.",
      code: `function App() {
  return (
    <div>
      <h2>Groceries</h2>
      <ul>
        <li>Apples</li>
        <li>Bread</li>
        <li>Milk</li>
      </ul>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "nested-elements",
      title: "Nested elements",
      summary: "JSX can nest as deeply as the DOM tree it describes.",
      code: `function App() {
  return (
    <div style={{ border: "1px solid #d1d5db", borderRadius: 6, padding: 12 }}>
      <section>
        <h3 style={{ margin: 0 }}>Card</h3>
        <div style={{ marginTop: 8 }}>
          <p style={{ margin: 0 }}>
            A paragraph containing <strong>bold text</strong> and{" "}
            <em>emphasis</em>, all nested inside a section, inside a div.
          </p>
        </div>
      </section>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "list-of-elements",
      title: "Rendering a list of elements",
      summary: "Map an array of data to an array of JSX elements, each with a stable key.",
      code: `function App() {
  const fruits = ["Apple", "Banana", "Cherry", "Date"];

  return (
    <ul style={{ margin: 0, paddingLeft: 18 }}>
      {fruits.map((fruit) => (
        <li key={fruit}>{fruit}</li>
      ))}
    </ul>
  );
}

render(<App />);`,
    },
    {
      id: "only-changed-parts-update",
      title: "React only touches what changed",
      summary: "A sibling that never re-derives stays visually untouched while the counter updates.",
      code: `function App() {
  const [count, setCount] = useState(0);
  const mountedAt = useRef(new Date().toLocaleTimeString()).current;

  return (
    <div style={{ display: "grid", gap: 10, maxWidth: 300 }}>
      <div style={{ padding: 10, border: "1px solid #d1d5db", borderRadius: 6 }}>
        <small style={{ color: "#6b7280" }}>Mounted at (never re-renders):</small>
        <p style={{ margin: "4px 0 0" }}>{mountedAt}</p>
      </div>
      <div style={{ padding: 10, border: "1px solid #d1d5db", borderRadius: 6 }}>
        <small style={{ color: "#6b7280" }}>Live counter (patched every click):</small>
        <p style={{ margin: "4px 0 0" }}>{count}</p>
      </div>
      <button onClick={() => setCount((c) => c + 1)}>+1</button>
      <small style={{ color: "#6b7280" }}>
        The timestamp box's text node is never rewritten, even though App's function reruns.
      </small>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "conditional-render",
      title: "Conditional rendering",
      summary: "An element is rendered or omitted from the tree entirely based on state.",
      code: `function App() {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div style={{ display: "grid", gap: 10, maxWidth: 300 }}>
      <button onClick={() => setShowDetails((s) => !s)}>
        {showDetails ? "Hide details" : "Show details"}
      </button>
      {showDetails && (
        <p style={{ margin: 0, padding: 10, border: "1px solid #d1d5db", borderRadius: 6 }}>
          This paragraph is only mounted into the DOM when showDetails is true — it doesn't
          exist in the page at all otherwise.
        </p>
      )}
    </div>
  );
}

render(<App />);`,
    },
  ],
};
