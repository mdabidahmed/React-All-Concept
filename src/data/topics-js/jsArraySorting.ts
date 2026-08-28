import type { Topic } from "../../types";

export const jsArraySortingTopic: Topic = {
  id: "js-array-sorting",
  title: "JavaScript Array Sorting",
  category: "Objects & Arrays",
  shortExplanation: `\`.sort()\` reorders an array **in place**, but its default behavior surprises almost everyone the first time.

- With no arguments, \`.sort()\` converts every item to a **string** and sorts alphabetically — so \`[10, 2, 1].sort()\` becomes \`[1, 10, 2]\`, not \`[1, 2, 10]\`
- Pass a **comparator function**, \`(a, b) => a - b\`, to sort numbers correctly (ascending); \`(a, b) => b - a\` for descending
- \`.sort()\` **mutates** the original array — copy it first (\`[...arr]\`) if you need the original order kept
- \`.reverse()\` simply flips the current order of an array, also in place`,
  longExplanation: `Sorting is one of the most common array operations, and also one of the most common sources of a very specific, well-known JavaScript surprise — one worth understanding thoroughly rather than working around by trial and error.

- Called with **no arguments**, \`.sort()\` converts every element to a **string** and compares those strings in Unicode/alphabetical order. For an array of strings, this is usually exactly what you want: \`["banana", "apple", "cherry"].sort()\` correctly produces \`["apple", "banana", "cherry"]\`. But for an array of **numbers**, this produces the classic surprise: \`[10, 2, 1].sort()\` returns \`[1, 10, 2]\`, because as strings, \`"10"\` alphabetically comes before \`"2"\` (comparing character by character, \`"1"\` < \`"2"\`). This single quirk has confused an enormous number of JavaScript learners (and more than a few experienced developers who forgot to think about it) — anywhere a numeric sort is needed, the default behavior is simply wrong
- The fix is to pass \`.sort()\` a **comparator function** taking two items, \`a\` and \`b\`, and returning a number: **negative** if \`a\` should come *before* \`b\`, **positive** if \`a\` should come *after* \`b\`, and \`0\` if their order doesn't matter relative to each other. For ascending numeric order, the idiomatic comparator is \`(a, b) => a - b\` — when \`a\` is smaller, \`a - b\` is negative, correctly placing \`a\` first. For descending order, simply flip it: \`(a, b) => b - a\`
- The same comparator pattern generalizes to sorting **anything** by any custom rule — sorting objects by a property (\`(a, b) => a.age - b.age\` for ascending age), sorting strings case-insensitively (\`(a, b) => a.toLowerCase().localeCompare(b.toLowerCase())\`), or sorting by any derived value at all. The comparator is really just answering, over and over, "given these two items, which one comes first?" — sort handles applying that rule consistently across the whole array
- A critical, easy-to-forget detail: \`.sort()\` (like \`.splice()\`) **mutates the original array in place** and also returns that same (now-reordered) array — it does not produce an independent, freshly sorted copy. If the original order needs to be preserved elsewhere in the program, sort a **copy** instead: \`const sorted = [...original].sort(...);\` leaves \`original\`'s order untouched while \`sorted\` holds the new order. Forgetting this is a common source of bugs, especially in React, where mutating an array that's part of component state can fail to trigger a re-render, or cause subtle "everything else that referenced this array also changed" surprises
- \`.reverse()\` is a simpler, related method: it flips the **current order** of an array end-to-end, with no comparator involved — the first item becomes the last and vice versa. Like \`.sort()\`, it **mutates in place** and returns the same array. It's often combined with \`.sort()\` for a quick descending sort of an already-ascending list, though writing an explicit \`(a, b) => b - a\` comparator is generally clearer about intent
- Modern JavaScript also offers non-mutating alternatives — \`.toSorted()\` and \`.toReversed()\` — which behave identically to \`.sort()\`/\`.reverse()\` but return a **new** array and leave the original untouched, avoiding the mutation pitfall entirely; they're newer additions and worth knowing exist, even where a project's target environment still requires the classic copy-then-sort pattern

The one habit worth internalizing above all else: never call \`.sort()\` on an array of numbers (or anything you need ordered by more than alphabetical string comparison) without an explicit comparator function — the default behavior is a trap, not a sensible fallback.`,
  examples: [
    {
      id: "default-sort-surprise",
      title: "The classic [10, 2, 1].sort() surprise",
      summary: "Default sort treats numbers as strings, producing a clearly wrong-looking numeric order.",
      code: `function App() {
  const [log, setLog] = useState([]);

  function print(value) {
    setLog((prev) => [...prev, String(value)]);
  }

  function run() {
    setLog([]);
    const numbers = [10, 2, 1, 21, 3];
    print("Original array: " + JSON.stringify(numbers));

    const defaultSorted = [...numbers].sort();
    print("[...numbers].sort() (no comparator) -> " + JSON.stringify(defaultSorted));
    print("Each number was compared as a STRING, so '10' sorts before '2'.");
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={run}>Run default sort demo</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 100 }}>
        {log.length === 0 ? "// output appears here" : log.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "comparator-fixes-it",
      title: "A comparator function fixes numeric sorting",
      summary: "(a, b) => a - b for ascending, (a, b) => b - a for descending — try both.",
      code: `function App() {
  const [log, setLog] = useState([]);

  function print(value) {
    setLog((prev) => [...prev, String(value)]);
  }

  function run() {
    setLog([]);
    const numbers = [10, 2, 1, 21, 3];

    const ascending = [...numbers].sort((a, b) => a - b);
    print("[...numbers].sort((a, b) => a - b) -> " + JSON.stringify(ascending));

    const descending = [...numbers].sort((a, b) => b - a);
    print("[...numbers].sort((a, b) => b - a) -> " + JSON.stringify(descending));

    print("Original numbers array is untouched here because we sorted COPIES: " + JSON.stringify(numbers));
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={run}>Run comparator demo</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 100 }}>
        {log.length === 0 ? "// output appears here" : log.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "sort-mutates-in-place",
      title: "sort() mutates the original array",
      summary: "Calling .sort() directly (without copying first) changes the original array permanently.",
      code: `function App() {
  const [log, setLog] = useState([]);

  function print(value) {
    setLog((prev) => [...prev, String(value)]);
  }

  function run() {
    setLog([]);
    const original = [5, 3, 8, 1];
    print("Before sort(): " + JSON.stringify(original));

    const result = original.sort((a, b) => a - b);
    print("After original.sort(...): " + JSON.stringify(original) + "  (mutated!)");
    print("result === original -> " + (result === original) + "  (sort returns the SAME array, not a new one)");
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={run}>Run mutation demo</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 100 }}>
        {log.length === 0 ? "// output appears here" : log.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "sort-objects-and-reverse",
      title: "Sorting objects by a property, and reverse()",
      summary: "A comparator can compare any derived value — here, sorting people by age.",
      code: `function App() {
  const [log, setLog] = useState([]);

  function print(value) {
    setLog((prev) => [...prev, String(value)]);
  }

  const people = [
    { name: "Grace", age: 36 },
    { name: "Ada", age: 30 },
    { name: "Linus", age: 25 },
  ];

  function run() {
    setLog([]);
    const byAgeAscending = [...people].sort((a, b) => a.age - b.age);
    print("Sorted by age (ascending):");
    byAgeAscending.forEach((p) => print("  " + p.name + " (" + p.age + ")"));

    const reversed = [...byAgeAscending].reverse();
    print("Same list, reversed:");
    reversed.forEach((p) => print("  " + p.name + " (" + p.age + ")"));
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={run}>Run object-sort demo</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 170 }}>
        {log.length === 0 ? "// output appears here" : log.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
