import type { Topic } from "../../types";

export const jsArrayIterationTopic: Topic = {
  id: "js-array-iteration",
  title: "JavaScript Array Iteration",
  category: "Objects & Arrays",
  shortExplanation: `Four methods cover almost every everyday need for looping over an array, each with a distinct job.

- \`.forEach(fn)\` — run some code for each item; returns \`undefined\`, nothing to chain
- \`.map(fn)\` — build a **new array** by transforming every item
- \`.filter(fn)\` — build a **new array** keeping only the items that pass a test
- \`.reduce(fn, initial)\` — fold the whole array down into a **single value** (a sum, an object, anything)`,
  longExplanation: `Rather than manually writing a \`for\` loop every time an array needs processing, JavaScript provides several higher-level iteration methods that each express *intent* directly in their name — reading \`.map(...)\` immediately tells you "this transforms every item," which a generic \`for\` loop never communicates on its own.

- **\`.forEach(callback)\`** simply runs the given callback once for every item, purely for its **side effects** (logging, updating some outside variable, pushing into another array manually). It always returns \`undefined\`, so it cannot be chained with another array method afterward — if you find yourself wanting to build a new array or a computed result, \`.forEach()\` is the wrong tool; reach for \`.map()\`, \`.filter()\`, or \`.reduce()\` instead
- **\`.map(callback)\`** runs the callback on every item and collects each **return value** into a brand-new array of the *same length* as the original — it's specifically for **transforming** each item into something else (doubling every number, extracting one property from every object, formatting every value for display). The original array is never touched
- **\`.filter(callback)\`** runs a callback that should return \`true\` or \`false\` for each item, and collects only the items where it returned \`true\` into a new array — the result is the same items (unchanged), just a possibly **shorter** list. It answers "which of these items match some condition?" — unlike \`.find()\`, which stops at the first match, \`.filter()\` always collects *every* match
- **\`.reduce(callback, initialValue)\`** is the most flexible and, at first, the least intuitive: it walks through the array carrying an **accumulator** value forward from one call to the next, and the callback's job is to combine the accumulator with the current item and return the *updated* accumulator. \`arr.reduce((total, item) => total + item, 0)\` sums an array of numbers. Because the accumulator can be anything — a number, a string, an object, even another array — \`.reduce()\` can implement summing, counting, grouping, flattening, or building an entirely new object out of an array, covering cases none of the other three methods can handle alone. The second argument, the **initial value** of the accumulator, is easy to forget but important — without it, \`.reduce()\` uses the array's first item as the starting accumulator and starts iterating from the second item instead, which quietly changes behavior on an empty array (throwing an error) or when the first item isn't a sensible starting point
- All four methods share the same core shape: they take a **callback function** and internally call it once per item, that callback receiving \`(item, index, array)\` as arguments — most everyday code only needs the first (\`item\`), but the index is there when position matters, and the full array is available for callbacks that need context from siblings
- None of \`.forEach\`, \`.map\`, \`.filter\`, or \`.reduce\` **mutate** the array they're called on — all four simply read through it, which keeps them safe to use on data you still need afterward, and makes them a natural fit for immutable-update patterns like the ones React relies on
- Choosing the right one comes down to what shape you want back: side effects only, no return value needed → \`.forEach()\`; a new array with every item **transformed** → \`.map()\`; a new, possibly shorter array with only **some** items kept → \`.filter()\`; one single combined **value** (a number, an object, anything not shaped like "one entry per original item") → \`.reduce()\`. Reaching for the method whose *name* matches your actual goal, rather than defaulting to a generic loop every time, is what makes array-heavy JavaScript code read clearly at a glance.`,
  examples: [
    {
      id: "foreach-side-effects",
      title: ".forEach() for side effects only",
      summary: "Logs each item — notice there's nothing returned to capture or chain.",
      code: `function App() {
  const [log, setLog] = useState([]);

  function print(value) {
    setLog((prev) => [...prev, String(value)]);
  }

  const scores = [72, 88, 95, 60];

  function run() {
    setLog([]);
    scores.forEach((score, index) => {
      print("Item at index " + index + " is " + score);
    });
    const result = scores.forEach(() => {});
    print("forEach() itself returns: " + result);
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={run}>Run forEach() demo</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 120 }}>
        {log.length === 0 ? "// output appears here" : log.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "map-transform",
      title: ".map() transforms every item into a new array",
      summary: "Doubling every number, and separately, extracting one field from a list of objects.",
      code: `function App() {
  const [log, setLog] = useState([]);

  function print(value) {
    setLog((prev) => [...prev, String(value)]);
  }

  const numbers = [1, 2, 3, 4];
  const users = [{ name: "Ada" }, { name: "Grace" }, { name: "Linus" }];

  function run() {
    setLog([]);
    const doubled = numbers.map((n) => n * 2);
    print("numbers.map(n => n * 2) -> " + JSON.stringify(doubled));
    print("original numbers unchanged -> " + JSON.stringify(numbers));

    const names = users.map((u) => u.name);
    print("users.map(u => u.name) -> " + JSON.stringify(names));
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={run}>Run map() demo</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 110 }}>
        {log.length === 0 ? "// output appears here" : log.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "filter-keep-matching",
      title: ".filter() keeps only items that pass a test",
      summary: "An interactive minimum-score slider filters a list of scores live.",
      code: `function App() {
  const scores = [72, 88, 95, 60, 45, 91];
  const [minScore, setMinScore] = useState(70);

  const passing = scores.filter((score) => score >= minScore);

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <p>All scores: <code>{JSON.stringify(scores)}</code></p>
      <label>
        Minimum passing score:{" "}
        <input
          type="number"
          value={minScore}
          onChange={(e) => setMinScore(Number(e.target.value))}
        />
      </label>
      <p>
        scores.filter(s =&gt; s &gt;= {minScore}) -&gt;{" "}
        <strong>{JSON.stringify(passing)}</strong> ({passing.length} of {scores.length})
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "reduce-fold-to-single-value",
      title: ".reduce() folds an array into one value",
      summary: "Summing scores and separately counting how many pass, both using reduce().",
      code: `function App() {
  const [log, setLog] = useState([]);

  function print(value) {
    setLog((prev) => [...prev, String(value)]);
  }

  const scores = [72, 88, 95, 60];

  function run() {
    setLog([]);
    const total = scores.reduce((sum, score) => sum + score, 0);
    print("scores.reduce((sum, s) => sum + s, 0) -> " + total);

    const average = total / scores.length;
    print("Average -> " + average);

    const passingCount = scores.reduce((count, score) => (score >= 70 ? count + 1 : count), 0);
    print("Count of scores >= 70, via reduce -> " + passingCount);

    print("");
    print("Comparison on the SAME array [72, 88, 95, 60]:");
    print("map (transform)  -> " + JSON.stringify(scores.map((s) => s + 5)));
    print("filter (keep some) -> " + JSON.stringify(scores.filter((s) => s >= 70)));
    print("reduce (one value) -> " + total);
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={run}>Run reduce() demo</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 160 }}>
        {log.length === 0 ? "// output appears here" : log.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
