import type { Topic } from "../../types";

export const jsDomSelectingTopic: Topic = {
  id: "js-dom-selecting",
  title: "JavaScript DOM Selecting Elements",
  category: "DOM & Events",
  shortExplanation: `Before JavaScript can change anything on a page, it has to *find* the element first — the DOM's selection methods are how a plain script grabs a reference to a real node.

- \`document.getElementById("id")\` — fastest, finds one element by its exact \`id\`
- \`document.querySelector("css-selector")\` — the most versatile: any CSS selector, returns the *first* match
- \`document.querySelectorAll("css-selector")\` — returns **every** match, as a NodeList`,
  longExplanation: `Selecting is the first step of almost any DOM interaction: a script can't change text, toggle a class, or read a value without first getting a real reference to the element it cares about. Modern JavaScript offers a small handful of selection methods, and they differ mainly in *how* they find a match and *how many* results they return.

- \`document.getElementById("some-id")\` is the oldest and narrowest of the three — it looks specifically for an element whose \`id\` attribute matches exactly, and returns that single element (or \`null\` if nothing matches). Because \`id\` values are meant to be unique per page, this method never returns more than one element. It's also the fastest option, since the browser can look ids up directly rather than scanning the tree
- \`document.querySelector("selector")\` accepts **any valid CSS selector** — an id (\`"#box"\`), a class (\`".highlight"\`), a tag name (\`"button"\`), an attribute (\`"[data-active]"\`), or a combination (\`"ul.menu > li:first-child"\`) — and returns the *first* element in the document that matches, or \`null\` if there's no match. Because it understands the same selector syntax as CSS, it's by far the most flexible and commonly reached-for of the three in modern code
- \`document.querySelectorAll("selector")\` uses the exact same CSS selector syntax, but instead of stopping at the first match, it returns **every** matching element, bundled into a \`NodeList\`. A \`NodeList\` looks and behaves a lot like an array (it supports \`.forEach()\` and has a \`.length\`), but it's technically its own type — it isn't a full array, so array-only methods like \`.map()\` need the list converted first with \`Array.from(...)\` or the spread operator
- All of these methods can also be called on any *element*, not just \`document\` — \`someElement.querySelector(...)\` searches only within that element's descendants, which is a common way to scope a search to one section of the page instead of scanning the whole document
- A frequent beginner mix-up: \`getElementById\` takes the id *without* a leading \`#\` (\`getElementById("box")\`), while \`querySelector\` needs the CSS-style \`#\` prefix (\`querySelector("#box")\`) because it's parsing a genuine selector, not a bare id string

In a plain, non-React script, these three methods are how nearly every DOM interaction begins — you select something, then read or change it. In a React application, this exact selection step is handled differently: instead of asking the whole document to go find an element by id or class after the fact, a component attaches a \`ref\` directly to the JSX it renders, and React fills that ref with the real DOM node the moment it exists. \`useRef()\` is effectively React's replacement for "go select this node" — it hands back the same kind of real DOM element object that \`getElementById\` or \`querySelector\` would, just without needing to search the tree for it, because the component already knows exactly which node it wants. The examples below demonstrate the genuine vanilla methods directly against the real page (they work exactly as described above), using a ref only to safely scope the search to this example's own markup rather than the whole document.`,
  examples: [
    {
      id: "get-element-by-id",
      title: "getElementById finds one exact match",
      summary: "A genuine document.getElementById call against a real id rendered on the page.",
      code: `function App() {
  const [log, setLog] = useState([]);

  function print(value) {
    setLog((prev) => [...prev, String(value)]);
  }

  function select() {
    setLog([]);
    const box = document.getElementById("js-select-demo-box");
    print("Found element: " + box.tagName);
    print("Its current text: " + box.textContent);
    box.style.background = "#dbeafe";
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <div id="js-select-demo-box" style={{ padding: 10, border: "1px solid #d1d5db", borderRadius: 6, width: 200 }}>
        Select me by id
      </div>
      <button onClick={select}>document.getElementById("js-select-demo-box")</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 80 }}>
        {log.length === 0 ? "// output appears here" : log.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "query-selector-first-match",
      title: "querySelector returns only the first match",
      summary: "Three elements share a class; a CSS selector only ever hands back the first one.",
      code: `function App() {
  const containerRef = useRef(null);
  const [log, setLog] = useState([]);

  function print(value) {
    setLog((prev) => [...prev, String(value)]);
  }

  function select() {
    setLog([]);
    const container = containerRef.current;
    const first = container.querySelector(".pickable");
    print("querySelector('.pickable') found: " + first.textContent);
    first.style.fontWeight = "bold";
    print("Only the FIRST matching element was returned and styled.");
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <div ref={containerRef} style={{ display: "flex", gap: 8 }}>
        <div className="pickable" style={{ padding: 8, background: "#f1f5f9", borderRadius: 6 }}>Item A</div>
        <div className="pickable" style={{ padding: 8, background: "#f1f5f9", borderRadius: 6 }}>Item B</div>
        <div className="pickable" style={{ padding: 8, background: "#f1f5f9", borderRadius: 6 }}>Item C</div>
      </div>
      <button onClick={select}>container.querySelector(".pickable")</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 80 }}>
        {log.length === 0 ? "// output appears here" : log.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "query-selector-all",
      title: "querySelectorAll returns every match",
      summary: "The same selector, but every matching real element gets found and updated, not just the first.",
      code: `function App() {
  const listRef = useRef(null);
  const [log, setLog] = useState([]);

  function print(value) {
    setLog((prev) => [...prev, String(value)]);
  }

  function selectAll() {
    setLog([]);
    const items = listRef.current.querySelectorAll("li");
    print("querySelectorAll('li') found " + items.length + " elements");
    items.forEach((item, index) => {
      print("  [" + index + "] " + item.textContent);
      item.style.color = "#15803d";
    });
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <ul ref={listRef} style={{ margin: 0, paddingLeft: 18 }}>
        <li>First item</li>
        <li>Second item</li>
        <li>Third item</li>
      </ul>
      <button onClick={selectAll}>listRef.current.querySelectorAll("li")</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 100 }}>
        {log.length === 0 ? "// output appears here" : log.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "ref-as-react-selection",
      title: "useRef: React's alternative to selecting after the fact",
      summary: "Instead of searching the document for a node, the component already holds a direct reference to it.",
      code: `function App() {
  const inputRef = useRef(null);
  const [log, setLog] = useState([]);

  function print(value) {
    setLog((prev) => [...prev, String(value)]);
  }

  function focusAndInspect() {
    setLog([]);
    const input = inputRef.current;
    print("inputRef.current is a real DOM node: " + input.tagName);
    input.focus();
    print("Focused it directly — no getElementById or querySelector needed.");
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <input ref={inputRef} placeholder="React already knows this node" />
      <button onClick={focusAndInspect}>Use the ref directly</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 70 }}>
        {log.length === 0 ? "// output appears here" : log.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
