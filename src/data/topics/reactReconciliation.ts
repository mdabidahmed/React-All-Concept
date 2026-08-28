import type { Topic } from "../../types";
import { ReconciliationDiagram } from "../../components/molecules/Diagrams/ReconciliationDiagram";

export const reactReconciliationTopic: Topic = {
  id: "react-reconciliation",
  title: "React Reconciliation",
  category: "Advanced Patterns",
  shortExplanation: `**Reconciliation** is how React decides what actually changed between renders, so it only touches the real DOM where it needs to.

- Same element **type** at the same position → React updates it in place and *keeps its state*
- Different element type at that position → React *unmounts* the old node and *mounts* a new one, resetting its state
- The \`key\` prop tells React how to match items in a **list** across renders by identity, not by position
- Using array *index* as a key breaks this matching once a list is reordered, inserted into, or filtered`,
  longExplanation: `Reconciliation is the algorithm React runs on every render: it compares the previous element tree to the new one and computes the smallest set of real DOM operations needed to catch up, rather than rebuilding the DOM from scratch each time.

- **Same type, same position** — if a \`<Panel>\` is followed by another \`<Panel>\` at the same spot in the tree, React reuses the existing DOM node and component instance, just updating its props. Any state inside that \`Panel\` survives
- **Different type** — if a \`<VideoPlayer>\` is replaced by an \`<Image>\` at that same spot (e.g. a conditional \`{isPlaying ? <VideoPlayer /> : <Image />}\`), React tears down the old subtree entirely and mounts a fresh one. All of \`VideoPlayer\`'s internal state is gone, even if it's rendered again later
- **Lists need \`key\`** — when rendering an array of elements, React uses each element's \`key\` to match items between the old and new list. Without a *stable* key, React falls back to matching by position, which breaks as soon as the list is reordered, filtered, or has an item inserted in the middle
- **The index-as-key bug**: using the array index as a key looks fine until the list changes order. If item 2 and item 3 swap places, React sees "the item at position 2 changed props" rather than "these two items swapped" — for a list of controlled inputs, this shows up as the *typed text appearing to jump to the wrong row*, because React kept the DOM input at that position and just changed its value prop, rather than moving the actual node
- **Forcing a remount on purpose** — changing an element's \`key\` is a legitimate technique to intentionally reset it: \`<Form key={userId} />\` mounts a brand-new \`Form\` (with fresh internal state) whenever \`userId\` changes, since a different key means React treats it as a different node entirely

Understanding reconciliation explains a whole category of "why did my state disappear" or "why is the wrong row showing my typed text" bugs — both trace back to whether React decided to update a node in place or replace it.`,
  diagram: ReconciliationDiagram,
  examples: [
    {
      id: "same-type-keeps-state",
      title: "Same type + position keeps state across renders",
      summary: "A counter inside a child component survives the parent re-rendering, because the element type and position don't change.",
      code: `function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount((c) => c + 1)}>Clicked {count} times</button>;
}

function App() {
  const [tick, setTick] = useState(0);

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <p>Parent re-render count: {tick}</p>
      <button onClick={() => setTick((t) => t + 1)}>Re-render parent</button>
      <Counter />
      <small>Click "Clicked N times" a few times, then re-render the parent — Counter keeps its count.</small>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "different-type-resets-state",
      title: "Different type at the same spot resets state",
      summary: "Swapping between two different component types at one spot tears down and remounts, losing state.",
      code: `function CounterA() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount((c) => c + 1)}>Counter A: {count}</button>;
}

function CounterB() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount((c) => c + 1)}>Counter B: {count}</button>;
}

function App() {
  const [showA, setShowA] = useState(true);

  return (
    <div style={{ display: "grid", gap: 10 }}>
      {showA ? <CounterA /> : <CounterB />}
      <button onClick={() => setShowA((v) => !v)}>Swap component type</button>
      <small>Click the counter a few times, then swap — the new component starts back at 0.</small>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "index-as-key-bug",
      title: "The index-as-key bug with a reorderable list",
      summary: "Using the array index as a key lets typed text appear to jump to the wrong row after reordering.",
      code: `function RowIndexKey({ items, onShuffle }) {
  return (
    <div>
      <p style={{ fontWeight: 600 }}>Using index as key (buggy):</p>
      {items.map((item, index) => (
        <div key={index} style={{ marginBottom: 4 }}>
          {item.label}: <input defaultValue="" placeholder="type something" />
        </div>
      ))}
      <button onClick={onShuffle}>Shuffle rows</button>
      <small style={{ display: "block", marginTop: 4 }}>
        Type in a box, shuffle, and watch your text stay at the same position instead of following its row.
      </small>
    </div>
  );
}

function App() {
  const [items, setItems] = useState([
    { id: "a", label: "Row A" },
    { id: "b", label: "Row B" },
    { id: "c", label: "Row C" },
  ]);

  function shuffle() {
    setItems((prev) => [...prev].reverse());
  }

  return <RowIndexKey items={items} onShuffle={shuffle} />;
}

render(<App />);`,
    },
    {
      id: "stable-key-fix",
      title: "Fixing it with a stable, unique key",
      summary: "The same list, keyed by each item's own id instead of its position — reordering now works correctly.",
      code: `function RowStableKey({ items, onShuffle }) {
  return (
    <div>
      <p style={{ fontWeight: 600 }}>Using a stable id as key (correct):</p>
      {items.map((item) => (
        <div key={item.id} style={{ marginBottom: 4 }}>
          {item.label}: <input defaultValue="" placeholder="type something" />
        </div>
      ))}
      <button onClick={onShuffle}>Shuffle rows</button>
      <small style={{ display: "block", marginTop: 4 }}>
        Type in a box, shuffle — the text now correctly follows its own row.
      </small>
    </div>
  );
}

function App() {
  const [items, setItems] = useState([
    { id: "a", label: "Row A" },
    { id: "b", label: "Row B" },
    { id: "c", label: "Row C" },
  ]);

  function shuffle() {
    setItems((prev) => [...prev].reverse());
  }

  return <RowStableKey items={items} onShuffle={shuffle} />;
}

render(<App />);`,
    },
    {
      id: "key-forces-remount",
      title: "Changing key on purpose to force a remount",
      summary: "Passing a different key to the same component type intentionally resets its internal state.",
      code: `function Stopwatch({ label }) {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, []);

  return <p>{label}: {seconds}s</p>;
}

function App() {
  const [resetCount, setResetCount] = useState(0);

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <Stopwatch key={resetCount} label="Elapsed time" />
      <button onClick={() => setResetCount((n) => n + 1)}>Reset stopwatch</button>
      <small>Changing "key" mounts a brand-new Stopwatch, starting back at 0.</small>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
