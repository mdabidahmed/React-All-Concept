import type { Topic } from "../../types";

export const jsDomCreateRemoveTopic: Topic = {
  id: "js-dom-create-remove",
  title: "JavaScript Creating and Removing Elements",
  category: "DOM & Events",
  shortExplanation: `Beyond changing existing elements, plain JavaScript can build brand-new ones from nothing and insert them into the page, or take existing ones out entirely.

- \`document.createElement("tag")\` — builds a new element **in memory**, not yet visible anywhere
- \`.appendChild(node)\` / \`.append(...)\` — attaches it into the real page as a child of some element
- \`.removeChild(node)\` / \`node.remove()\` — takes an element back out of the page`,
  longExplanation: `Selecting and manipulating existing elements only goes so far — plenty of real pages need to add entirely new elements (a new item added to a list, a new row in a table) or take existing ones away (dismissing a notification, deleting a list item). Plain JavaScript handles both with a small set of methods.

- \`document.createElement("li")\` creates a brand-new element **node in memory** — it exists as a JavaScript object, fully configurable (you can set its \`.textContent\`, add attributes, assign classes), but it is not yet part of the visible page. Nothing shows up on screen until it's explicitly attached somewhere
- \`parent.appendChild(newNode)\` inserts that node as the *last* child of \`parent\`, and it's only at this point that the browser actually renders it. \`parent.append(...)\` is a newer, slightly more flexible sibling of \`appendChild\` — it can take multiple arguments at once, and unlike \`appendChild\`, it accepts plain strings directly (turning them into text nodes automatically) rather than requiring a node object first
- \`parent.removeChild(childNode)\` removes a specific child node from \`parent\`, taking it (and everything inside it) out of the visible page entirely. \`childNode.remove()\` is the newer, more convenient version — it's called directly on the node being removed, with no need to separately reference its parent
- Once a node has been removed, the memory it used is normally cleaned up automatically (garbage collected) once nothing else references it — there's no manual "destroy" step required
- These four methods are the literal building blocks that power dynamic, JavaScript-generated content on a plain page: an infinite-scroll feed appending new items, a todo app removing a completed task, a live chat appending each new message as it arrives — all of it eventually comes down to \`createElement\`, \`append\`/\`appendChild\`, and \`remove\`/\`removeChild\`

This is the one DOM topic where working inside a React component genuinely calls for a different approach, rather than just a different way of looking at the same code. React renders a component's JSX by comparing it against the previous render and updating the real DOM to match — it keeps its own internal bookkeeping about exactly which real nodes correspond to which parts of your JSX. If code inside that same component *also* manually calls \`document.createElement\` and \`appendChild\` on a DOM subtree that React is separately rendering from state, the two can conflict: React expects that subtree to look a certain way, and a manual insertion it doesn't know about can be silently wiped out (or worse, cause a mismatch) the next time that component re-renders.

The React-idiomatic way to accomplish "add a new item" or "remove an item" is to keep the items themselves in an array in \`useState\`, and let the JSX \`.map()\` over that array to render one element per entry, with a stable \`key\`. "Creating" an item means adding a new entry to that array (\`setItems([...items, newItem])\`); "removing" one means filtering it out (\`setItems(items.filter(...))\`). React then figures out, on its own, which real \`createElement\`/\`appendChild\`/\`removeChild\`-equivalent calls are needed to make the real DOM match the new array — using the exact same underlying browser mechanisms described above, just orchestrated automatically instead of by hand. That state-driven pattern is the actual runnable example below, since it's both the correct way to write this in React and the fair, working comparison to the vanilla mechanics explained in prose.`,
  examples: [
    {
      id: "adding-items-react-way",
      title: "Adding items the React way",
      summary: "New items come from a state array rendered with .map() — React handles the real appendChild-equivalent work.",
      code: `function App() {
  const [items, setItems] = useState(["First item"]);
  const [text, setText] = useState("");

  function addItem() {
    if (!text.trim()) return;
    setItems((prev) => [...prev, text]);
    setText("");
  }

  return (
    <div style={{ display: "grid", gap: 10, maxWidth: 280 }}>
      <div style={{ display: "flex", gap: 8 }}>
        <input value={text} onChange={(e) => setText(e.target.value)} placeholder="New item text" />
        <button onClick={addItem}>Add (creates + appends)</button>
      </div>
      <ul style={{ margin: 0, paddingLeft: 18 }}>
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        Each new list item exists because it was added to state — React created and inserted the real DOM node for it.
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "removing-items-react-way",
      title: "Removing items the React way",
      summary: "Filtering an item out of state is the React equivalent of removeChild/remove() on that item's node.",
      code: `function App() {
  const [items, setItems] = useState(["Buy milk", "Walk the dog", "Read a book"]);

  function removeItem(index) {
    setItems((prev) => prev.filter((_, i) => i !== index));
  }

  return (
    <div style={{ display: "grid", gap: 10, maxWidth: 280 }}>
      <ul style={{ margin: 0, paddingLeft: 0, listStyle: "none", display: "grid", gap: 6 }}>
        {items.map((item, i) => (
          <li
            key={item}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "6px 10px",
              background: "#f1f5f9",
              borderRadius: 6,
            }}
          >
            {item}
            <button onClick={() => removeItem(i)}>Remove</button>
          </li>
        ))}
        {items.length === 0 && <p style={{ color: "#6b7280" }}>All items removed.</p>}
      </ul>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "vanilla-mechanics-in-a-scratch-area",
      title: "The vanilla mechanics, genuinely, in an area React never renders into",
      summary: "createElement + append + remove() run for real here, safely, because React never manages this div's children.",
      code: `function App() {
  const scratchRef = useRef(null);
  const [count, setCount] = useState(0);

  function addRealElement() {
    const li = document.createElement("li");
    li.textContent = "Real DOM node #" + (count + 1);
    li.style.padding = "4px 0";
    scratchRef.current.append(li);
    setCount((c) => c + 1);
  }

  function removeLastRealElement() {
    const scratch = scratchRef.current;
    if (scratch.lastElementChild) {
      scratch.lastElementChild.remove();
      setCount((c) => Math.max(0, c - 1));
    }
  }

  return (
    <div style={{ display: "grid", gap: 10, maxWidth: 320 }}>
      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={addRealElement}>createElement + append</button>
        <button onClick={removeLastRealElement}>lastElementChild.remove()</button>
      </div>
      <ul ref={scratchRef} style={{ margin: 0, paddingLeft: 18, minHeight: 40 }} />
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        This ul has no JSX children of its own, so React never re-renders its contents — these are genuine,
        manually created and removed DOM nodes, exactly as a plain script would do it.
      </p>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
