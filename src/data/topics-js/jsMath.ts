import type { Topic } from "../../types";

export const jsMathTopic: Topic = {
  id: "js-math",
  title: "JavaScript Math Object",
  category: "Strings & Numbers",
  shortExplanation: `The **\`Math\`** object bundles a set of ready-made numeric functions — it's not a constructor (you never write \`new Math()\`), just a namespace of ==static== methods called directly on \`Math\`.

- \`Math.round()\`, \`Math.floor()\`, and \`Math.ceil()\` each round a decimal to a whole number, but in different directions
- \`Math.random()\` returns a random decimal between \`0\` (inclusive) and \`1\` (exclusive) — combined with a small formula, it becomes a random *integer* in any range you choose
- \`Math.max()\` / \`Math.min()\` find the largest/smallest of a list of numbers; \`Math.pow()\` / \`Math.sqrt()\` handle powers and square roots`,
  longExplanation: `Unlike most objects you create yourself, \`Math\` is a **built-in namespace object** — it groups together a set of numeric constants (like \`Math.PI\`) and utility functions, but it is never instantiated. You never write \`new Math()\`; every property and method is called directly on \`Math\` itself, e.g. \`Math.round(4.6)\`.

The three rounding methods each round in a different, fixed direction, and mixing them up is a common source of off-by-one bugs. \`Math.round(n)\` rounds to the *nearest* whole number, with \`.5\` rounding up (\`Math.round(2.5)\` is \`3\`) — though quirks with floating point mean negative halves don't always behave symmetrically (\`Math.round(-2.5)\` is \`-2\`, not \`-3\`). \`Math.floor(n)\` always rounds *down*, toward negative infinity, regardless of the decimal part — \`Math.floor(2.9)\` is \`2\`, and \`Math.floor(-2.1)\` is \`-3\`. \`Math.ceil(n)\` always rounds *up*, toward positive infinity — \`Math.ceil(2.1)\` is \`3\`. Picking the wrong one for the job (say, using \`.round()\` when you actually need \`.floor()\` to keep an index inside array bounds) is an easy beginner mistake.

\`Math.random()\` returns a pseudo-random decimal that is always \`>= 0\` and \`< 1\` — it can return exactly \`0\`, but it can never return exactly \`1\`. On its own that's rarely useful directly; what's actually needed almost every time is a **random whole number within a specific range**, which takes a small, very commonly memorized formula: \`Math.floor(Math.random() * (max - min + 1)) + min\`. Multiplying stretches the \`[0, 1)\` range out to \`[0, max - min + 1)\`, \`Math.floor()\` drops it to a whole number from \`0\` up to (but not including) \`max - min + 1\`, and adding \`min\` shifts the whole range to start at \`min\` instead of \`0\` — the result is a uniformly random integer that includes both \`min\` and \`max\`.

\`Math.max()\` and \`Math.min()\` each take any number of arguments and return the largest or smallest one — \`Math.max(3, 7, 2)\` is \`7\`. A common gotcha: they don't accept an array directly (\`Math.max([3, 7, 2])\` returns \`NaN\`) — to find the max of an existing array, the array first needs to be *spread* into individual arguments: \`Math.max(...numbers)\`. Calling either with no arguments at all returns a fittingly extreme fallback: \`Math.max()\` is \`-Infinity\` and \`Math.min()\` is \`Infinity\`, so that they never accidentally "win" against a real number when used as a running starting value.

\`Math.pow(base, exponent)\` raises \`base\` to \`exponent\` — \`Math.pow(2, 10)\` is \`1024\`. Modern JavaScript also has the equivalent \`**\` operator (\`2 ** 10\`) as a shorter alternative, but \`Math.pow()\` still works everywhere and reads unambiguously. \`Math.sqrt(n)\` returns the square root of \`n\` — and, since a negative number has no real square root, \`Math.sqrt(-4)\` returns \`NaN\` rather than throwing an error.`,
  examples: [
    {
      id: "rounding-trio",
      title: "Math.round() vs. Math.floor() vs. Math.ceil()",
      summary: "Type any decimal and see all three rounding directions side by side, live.",
      code: `function App() {
  const [text, setText] = useState("4.5");
  const num = Number(text);

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{ padding: 8, width: 160 }}
      />
      <p>Math.round(num): <strong>{Math.round(num)}</strong></p>
      <p>Math.floor(num): <strong>{Math.floor(num)}</strong></p>
      <p>Math.ceil(num): <strong>{Math.ceil(num)}</strong></p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "random-integer-in-range",
      title: "A random integer in any range",
      summary: "The standard Math.floor(Math.random() * (max - min + 1)) + min recipe, with adjustable bounds.",
      code: `function App() {
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(6);
  const [result, setResult] = useState(null);

  function roll() {
    const value = Math.floor(Math.random() * (max - min + 1)) + min;
    setResult(value);
  }

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <div style={{ display: "flex", gap: 8 }}>
        <input type="number" value={min} onChange={(e) => setMin(Number(e.target.value))} style={{ padding: 8, width: 80 }} />
        <input type="number" value={max} onChange={(e) => setMax(Number(e.target.value))} style={{ padding: 8, width: 80 }} />
      </div>
      <button onClick={roll}>Roll random integer</button>
      {result !== null && <p>Result: <strong>{result}</strong></p>}
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "max-min-with-array",
      title: "Math.max() / Math.min() need a spread, not an array",
      summary: "Passing an array directly produces NaN — spreading it into individual arguments is required.",
      code: `function App() {
  const [log, setLog] = useState([]);

  function print(value) {
    setLog((prev) => [...prev, String(value)]);
  }

  function run() {
    setLog([]);
    const numbers = [8, 3, 19, 6, 42, 1];
    print("numbers: " + numbers.join(", "));
    print("Math.max(...numbers): " + Math.max(...numbers));
    print("Math.min(...numbers): " + Math.min(...numbers));
    print("Math.max(numbers) without spread: " + Math.max(numbers));
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={run}>Find max and min</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 100 }}>
        {log.length === 0 ? "// output appears here" : log.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "pow-and-sqrt",
      title: "Math.pow() and Math.sqrt(), live",
      summary: "Adjust a base, an exponent, and a square-root input to see both methods update instantly.",
      code: `function App() {
  const [base, setBase] = useState(2);
  const [exponent, setExponent] = useState(10);
  const [sqrtInput, setSqrtInput] = useState(16);

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <input type="number" value={base} onChange={(e) => setBase(Number(e.target.value))} style={{ padding: 8, width: 70 }} />
        <span>to the power of</span>
        <input type="number" value={exponent} onChange={(e) => setExponent(Number(e.target.value))} style={{ padding: 8, width: 70 }} />
      </div>
      <p>Math.pow(base, exponent): <strong>{Math.pow(base, exponent)}</strong></p>
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <span>Math.sqrt of</span>
        <input type="number" value={sqrtInput} onChange={(e) => setSqrtInput(Number(e.target.value))} style={{ padding: 8, width: 70 }} />
      </div>
      <p>Math.sqrt(sqrtInput): <strong>{String(Math.sqrt(sqrtInput))}</strong></p>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
