import type { Topic } from "../../types";
import { UseMemoCallbackDiagram } from "../../components/molecules/Diagrams/UseMemoCallbackDiagram";

export const useMemoCallbackTopic: Topic = {
  id: "use-memo-callback",
  title: "useMemo & useCallback",
  category: "Performance",
  shortExplanation: `\`useMemo\` memoizes a **computed value**; \`useCallback\` memoizes a **function reference**. Both take a dependency array and only recompute when a dependency changes — mainly to avoid ==expensive recalculation== or unnecessary child re-renders.

- \`useMemo(fn, deps)\` → caches the *return value* of \`fn\`
- \`useCallback(fn, deps)\` → caches the *function itself*
- Unchanged deps → cached result reused; changed deps → recompute`,
  longExplanation: `\`useMemo(fn, deps)\` caches the return value of \`fn\` across renders, only recomputing it when one of \`deps\` changes — every other render just returns the previously cached value. \`useCallback(fn, deps)\` is the same idea specialized for functions: it returns the *same function reference* across renders as long as \`deps\` haven't changed.

- \`useMemo\` pays off for genuinely expensive work — sorting/filtering large lists, heavy math — or to produce a stable object/array reference so a \`React.memo\`-wrapped child doesn't re-render unnecessarily
- \`useCallback\` matters when a function is passed as a prop to a memoized child, or used as a dependency of another hook like \`useEffect\`
- Both are ==performance optimizations, not correctness tools== — a component behaves the same with or without them, and React doesn't guarantee the cache is kept forever (it may be discarded, e.g. under memory pressure)

The common mistake is reaching for them everywhere "just in case": memoization itself has a cost — comparing dependencies, retaining the cache — so it only pays off when the wrapped computation is genuinely expensive, or the referential stability is actually consumed by something like \`React.memo\` or a dependency array.`,
  diagram: UseMemoCallbackDiagram,
  examples: [
    {
      id: "expensive-calc",
      title: "Memoizing an expensive computation",
      summary: "Avoid re-running a slow calculation on unrelated re-renders.",
      code: `function slowSum(limit) {
  let total = 0;
  for (let i = 0; i < limit; i++) total += i;
  return total;
}

function App() {
  const [limit, setLimit] = useState(100000);
  const [tick, setTick] = useState(0);

  const total = useMemo(() => slowSum(limit), [limit]);

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <p>Sum up to {limit}: <strong>{total}</strong></p>
      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={() => setLimit((l) => l + 100000)}>Increase limit</button>
        <button onClick={() => setTick((t) => t + 1)}>
          Re-render only ({tick})
        </button>
      </div>
      <small>The sum only recomputes when "limit" changes, not on the re-render button.</small>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "memo-child",
      title: "useCallback + React.memo to skip child renders",
      summary: "Give a memoized child a stable function prop so it doesn't re-render needlessly.",
      code: `let childRenderCount = 0;

const Child = React.memo(function Child({ onClick }) {
  childRenderCount++;
  return <button onClick={onClick}>Child rendered {childRenderCount} times</button>;
});

function App() {
  const [count, setCount] = useState(0);
  const [other, setOther] = useState(0);

  // Stable reference across renders where "count" hasn't changed.
  const handleClick = useCallback(() => setCount((c) => c + 1), []);

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <p>Parent count: {count}</p>
      <Child onClick={handleClick} />
      <button onClick={() => setOther((o) => o + 1)}>
        Re-render parent only ({other})
      </button>
      <small>Child's own render counter won't increase from the button above.</small>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "derived-list",
      title: "Memoizing a derived, filtered list",
      summary: "Recompute a filtered/sorted list only when its inputs change.",
      code: `const people = [
  { name: "Ada", age: 36 },
  { name: "Grace", age: 85 },
  { name: "Alan", age: 41 },
  { name: "Katherine", age: 101 },
];

function App() {
  const [query, setQuery] = useState("");
  const [renders, setRenders] = useState(0);

  const filtered = useMemo(
    () => people.filter((p) => p.name.toLowerCase().includes(query.toLowerCase())),
    [query],
  );

  return (
    <div style={{ display: "grid", gap: 10, maxWidth: 260 }}>
      <input
        placeholder="Filter by name"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <ul style={{ margin: 0, paddingLeft: 18 }}>
        {filtered.map((p) => (
          <li key={p.name}>{p.name} ({p.age})</li>
        ))}
      </ul>
      <button onClick={() => setRenders((r) => r + 1)}>Unrelated re-render ({renders})</button>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "stable-object-prop",
      title: "Stabilizing an object passed as a prop",
      summary: "useMemo prevents a new object literal from breaking downstream memoization.",
      code: `const Panel = React.memo(function Panel({ style, children }) {
  console.log("Panel rendered");
  return <div style={style}>{children}</div>;
});

function App() {
  const [count, setCount] = useState(0);

  // Without useMemo, "style" would be a brand-new object every render,
  // defeating React.memo on Panel even though the values never change.
  const style = useMemo(
    () => ({ padding: 12, border: "1px solid #d1d5db", borderRadius: 6 }),
    [],
  );

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <Panel style={style}>Stable panel (see console: logs once)</Panel>
      <button onClick={() => setCount((c) => c + 1)}>Re-render parent ({count})</button>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "when-not-to-memoize",
      title: "When memoization isn't worth it",
      summary: "A cheap computation gains nothing from useMemo — simplicity wins.",
      code: `function App() {
  const [first, setFirst] = useState("Ada");
  const [last, setLast] = useState("Lovelace");

  // This concatenation is trivially cheap: useMemo here would only
  // add overhead (dependency comparison) with no measurable benefit.
  const fullName = first + " " + last;

  return (
    <div style={{ display: "grid", gap: 10, maxWidth: 260 }}>
      <input value={first} onChange={(e) => setFirst(e.target.value)} placeholder="First name" />
      <input value={last} onChange={(e) => setLast(e.target.value)} placeholder="Last name" />
      <p>Full name: <strong>{fullName}</strong></p>
      <small>Rule of thumb: measure first. Memoize expensive work, not everything.</small>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
