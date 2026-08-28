import type { Topic } from "../../types";

export const jsArrayMethodsTopic: Topic = {
  id: "js-array-methods",
  title: "JavaScript Array Methods",
  category: "Objects & Arrays",
  shortExplanation: `Beyond growing and shrinking an array, JavaScript ships a large toolkit of methods for reading, searching, and reshaping arrays.

- \`.slice(start, end)\` — returns a **new** array with a portion copied out; does *not* touch the original
- \`.splice(start, count, ...items)\` — **mutates** the original array in place: removes and/or inserts items
- \`.concat()\` joins arrays into a new one; \`.join(separator)\` turns an array into a single string
- \`.includes(value)\` / \`.indexOf(value)\` check for presence; \`.find(fn)\` returns the *first matching item itself*, not just its position`,
  longExplanation: `Arrays come with a large standard library of built-in methods, and knowing which ones **mutate** the original array versus which ones **return a new one** without touching the original is one of the single most important habits to build — mixing this up is a frequent source of subtle bugs, especially once React (which relies on detecting new array references) enters the picture.

- **\`.slice(start, end)\`** returns a **new** array containing a shallow copy of the portion from index \`start\` up to (but not including) index \`end\`. The original array is left completely untouched. Omitting \`end\` slices to the end of the array; omitting both arguments (\`.slice()\`) is a common trick for making a full, independent copy of an array. Negative indices count from the end (\`-1\` is the last item), which is handy for grabbing "the last N items" without knowing the array's exact length
- **\`.splice(start, deleteCount, ...itemsToInsert)\`** is the mutating cousin, and does considerably more: it can remove items, insert items, or both, directly modifying the original array, and it **returns an array of the removed items** (not the modified array itself — an easy detail to trip over). \`arr.splice(2, 1)\` removes one item starting at index 2; \`arr.splice(2, 0, "new")\` removes nothing but inserts \`"new"\` at index 2; \`arr.splice(1, 2, "a", "b")\` removes two items starting at index 1 and replaces them with \`"a"\` and \`"b"\`. The name similarity to \`.slice()\` — and the very different behavior — makes this pair a classic point of confusion worth memorizing deliberately
- **\`.concat(otherArray)\`** returns a **new** array formed by joining the original with one or more additional arrays (or values), again without mutating anything: \`[1, 2].concat([3, 4])\` produces \`[1, 2, 3, 4]\`. The spread operator (\`[...a, ...b]\`) accomplishes the same result and has become the more common modern style, but \`.concat()\` still appears often enough to recognize
- **\`.join(separator)\`** converts an entire array into a single **string**, placing the given separator between each item — \`["a", "b", "c"].join(", ")\` produces \`"a, b, c"\`. Called with no argument, it defaults to a comma. This is the natural inverse of a string's \`.split()\` method
- **\`.includes(value)\`** returns a plain \`true\`/\`false\` for whether a value exists anywhere in the array — the clearest, most readable way to ask "is this in the list?". **\`.indexOf(value)\`** answers a related but different question: *where* is this value (returning its index), or \`-1\` if it isn't found at all — useful when the position itself matters, not just presence, though a bare "is it in there" check reads more clearly with \`.includes()\`
- **\`.find(callbackFn)\`** scans the array and returns the **first item itself** for which the callback returns \`true\` (or \`undefined\` if nothing matches) — distinct from \`.indexOf()\`, which only ever gives you a position, and distinct from \`.filter()\` (covered in the iteration topic), which returns *every* matching item as a new array rather than just the first one. \`.find()\` is the right tool specifically when you expect at most one match and want the actual object or value back, such as locating one user by \`id\` inside an array of users
- All of these read/search methods (\`.slice\`, \`.concat\`, \`.join\`, \`.includes\`, \`.indexOf\`, \`.find\`) leave the original array **unchanged** — only \`.splice()\` (among this list) mutates. This non-mutating-by-default pattern matters enormously in frameworks like React, where updating state by mutating an existing array in place often fails to trigger a re-render, while producing a brand-new array (via \`.slice\`, spread, \`.concat\`, etc.) is the pattern that reliably works

Knowing this toolkit well means reaching for the exact right method by name instead of hand-rolling a loop for tasks JavaScript already solves in one line — and, just as importantly, knowing at a glance whether a given line of code is safe to run on data you still need unchanged afterward.`,
  examples: [
    {
      id: "slice-vs-splice",
      title: "slice() (non-mutating) vs. splice() (mutating)",
      summary: "The same starting array run through both methods, showing which one changes the original.",
      code: `function App() {
  const [log, setLog] = useState([]);

  function print(value) {
    setLog((prev) => [...prev, String(value)]);
  }

  function run() {
    setLog([]);
    const original = ["a", "b", "c", "d", "e"];

    const sliced = original.slice(1, 3);
    print("original.slice(1, 3) -> " + JSON.stringify(sliced));
    print("original after slice() -> " + JSON.stringify(original) + "  (unchanged)");

    const removed = original.splice(1, 2);
    print("original.splice(1, 2) removed -> " + JSON.stringify(removed));
    print("original after splice() -> " + JSON.stringify(original) + "  (mutated in place!)");
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={run}>Run slice vs splice demo</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 120 }}>
        {log.length === 0 ? "// output appears here" : log.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "concat-and-join",
      title: "concat() to merge arrays, join() to make a string",
      summary: "Two small arrays merged into one, then flattened into a single readable string.",
      code: `function App() {
  const [log, setLog] = useState([]);

  function print(value) {
    setLog((prev) => [...prev, String(value)]);
  }

  function run() {
    setLog([]);
    const morning = ["coffee", "toast"];
    const evening = ["pasta", "salad"];

    const allMeals = morning.concat(evening);
    print("morning.concat(evening) -> " + JSON.stringify(allMeals));
    print("morning is still -> " + JSON.stringify(morning) + "  (concat doesn't mutate)");

    print("allMeals.join(', ') -> " + allMeals.join(", "));
    print("allMeals.join(' -> ') -> " + allMeals.join(" -> "));
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={run}>Run concat/join demo</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 110 }}>
        {log.length === 0 ? "// output appears here" : log.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "includes-indexof-interactive",
      title: "Searching with includes() and indexOf()",
      summary: "Type a value and see whether it's present, and at which index, in real time.",
      code: `function App() {
  const groceries = ["milk", "eggs", "bread", "butter"];
  const [query, setQuery] = useState("bread");

  const found = groceries.includes(query);
  const position = groceries.indexOf(query);

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <p>List: <code>{JSON.stringify(groceries)}</code></p>
      <label>
        Search for:{" "}
        <input value={query} onChange={(e) => setQuery(e.target.value)} />
      </label>
      <p>groceries.includes("{query}") -> <strong>{String(found)}</strong></p>
      <p>groceries.indexOf("{query}") -> <strong>{position}</strong>{position === -1 ? "  (not found)" : ""}</p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "find-first-match",
      title: "find() returns the matching item itself",
      summary: "Locating one user object by id — find() hands back the object, not just its position.",
      code: `function App() {
  const [log, setLog] = useState([]);

  function print(value) {
    setLog((prev) => [...prev, String(value)]);
  }

  const users = [
    { id: 1, name: "Ada" },
    { id: 2, name: "Grace" },
    { id: 3, name: "Linus" },
  ];

  function run() {
    setLog([]);
    const match = users.find((u) => u.id === 2);
    print("users.find(u => u.id === 2) -> " + JSON.stringify(match));

    const noMatch = users.find((u) => u.id === 99);
    print("users.find(u => u.id === 99) -> " + noMatch + "  (no match found)");
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={run}>Run find() demo</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 90 }}>
        {log.length === 0 ? "// output appears here" : log.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
