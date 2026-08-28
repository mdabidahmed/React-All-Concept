import type { Topic } from "../../types";

export const jsComparisonsTopic: Topic = {
  id: "js-comparisons",
  title: "JavaScript Comparisons",
  category: "Control Flow",
  shortExplanation: `Comparison operators compare two values and produce a **boolean** (\`true\` or \`false\`).

- \`===\` / \`!==\` — ==strict== equality: compares value *and* type, no conversion
- \`==\` / \`!=\` — loose equality: converts types first, which can cause surprises
- \`<\`, \`>\`, \`<=\`, \`>=\` — ordering comparisons, work on numbers and strings alike
- Prefer \`===\`/\`!==\` almost always — it's predictable and avoids coercion bugs`,
  longExplanation: `Comparisons are how a program makes decisions — every \`if\`, every loop condition, ultimately boils down to a comparison producing \`true\` or \`false\`. JavaScript actually has two different flavors of equality check, and picking the right one matters more than it might first appear.

- \`===\` (**strict equality**) compares two values and only returns \`true\` if they have both the **same type** *and* the **same value**, with zero implicit conversion. \`5 === 5\` is \`true\`; \`5 === "5"\` is \`false\`, because a number and a string are never strictly equal no matter what they contain. \`!==\` is its opposite: strict *inequality*
- \`==\` (**loose equality**) also compares two values, but if their types differ, it first tries to **coerce** one or both sides to a common type before comparing. \`5 == "5"\` is \`true\`, because the string \`"5"\` gets converted to the number \`5\` before comparing. This sounds convenient, but the coercion rules are genuinely complex and have produced some famously bizarre results — \`0 == "0"\` is \`true\`, but \`0 == ""\` is *also* \`true\`, while \`"0" == ""\` is \`false\`, even though intuitively you might expect all three empty/zero-ish comparisons to agree. \`!=\` is loose equality's opposite: loose *inequality*
- Because loose equality's coercion rules are hard to hold in your head and easy to get wrong, the near-universal modern guideline is: **use \`===\` and \`!==\` by default**, and only reach for \`==\`/\`!=\` in the rare case you specifically want type coercion (one legitimate, narrow example: \`value == null\` is a common shorthand that catches *both* \`null\` and \`undefined\` in one check, since \`null == undefined\` is one of the few loose-equality results everyone agrees is intuitive)
- **Ordering comparisons** — \`<\`, \`>\`, \`<=\`, \`>=\` — work as expected on numbers (\`3 < 5\` is \`true\`) but also work on **strings**, comparing them character by character based on their character codes (essentially alphabetical order, though it's case-sensitive: uppercase letters sort before lowercase ones, so \`"Zebra" < "apple"\` is \`true\`, which surprises people expecting pure alphabetical order). Ordering operators don't have separate "strict" and "loose" versions the way equality does — they always attempt numeric comparison first, converting operands as needed, which means comparing mismatched types (like a number to a string) can still occasionally surprise you, so it's good practice to compare values of the same type
- **Comparing objects** (including arrays) with any equality operator, strict or loose, compares by **reference**, not by contents: two separate arrays holding identical elements, \`[1, 2] === [1, 2]\`, are \`false\`, because they're two distinct objects living at different locations in memory, even though they look the same when printed. Only comparing an object to *itself* (the same reference) returns \`true\`. This trips up beginners expecting a "deep" content comparison, which JavaScript's built-in operators simply don't do
- \`NaN\` (Not a Number) has a uniquely strange rule: it is **never equal to anything, including itself** — \`NaN === NaN\` is \`false\`. To check whether a value is \`NaN\`, use \`Number.isNaN(value)\` instead of an equality comparison

The single highest-value habit from this topic: default to \`===\`/\`!==\` everywhere, treat \`==\`/\`!=\` as something you almost never reach for, and remember that comparing objects/arrays checks *identity*, not *content*.`,
  examples: [
    {
      id: "strict-vs-loose-equality",
      title: "=== vs == side by side",
      summary: "Strict equality never coerces types; loose equality tries to make mismatched types comparable.",
      code: `function App() {
  const [log, setLog] = useState([]);

  function print(value) {
    setLog((prev) => [...prev, String(value)]);
  }

  function run() {
    setLog([]);
    print('5 === "5"   ->  ' + (5 === "5") + "   (different types, strict says false)");
    print('5 == "5"    ->  ' + (5 == "5") + "   (loose coerces \\"5\\" to 5 first)");
    print('0 == ""     ->  ' + (0 == "") + "   (a classic surprising loose-equality result)");
    print('"0" == ""   ->  ' + ("0" == "") + "   (yet this one is false!)");
    print("null == undefined  ->  " + (null == undefined) + "   (one loose-equality result everyone relies on)");
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={run}>Run equality comparisons</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 130 }}>
        {log.length === 0 ? "// output appears here" : log.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "interactive-comparison",
      title: "Compare two values you type in",
      summary: "Enter two values and see === and == potentially disagree, live.",
      code: `function App() {
  const [left, setLeft] = useState("5");
  const [right, setRight] = useState("5");

  // Everything typed into an <input> arrives as a string.
  const looseEqual = left == right;
  const strictEqual = left === right;

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <label>
        Left value: <input value={left} onChange={(e) => setLeft(e.target.value)} />
      </label>
      <label>
        Right value: <input value={right} onChange={(e) => setRight(e.target.value)} />
      </label>
      <p>left === right -&gt; <strong>{String(strictEqual)}</strong></p>
      <p>left == right -&gt; <strong>{String(looseEqual)}</strong></p>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        Both inputs are strings here, so try instead comparing "5" to "05" or "5" to "5.0" to see string comparison quirks.
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "ordering-numbers-and-strings",
      title: "Ordering comparisons on numbers and strings",
      summary: "<, >, <=, >= work on numbers as expected, and compare strings character by character.",
      code: `function App() {
  const [log, setLog] = useState([]);

  function print(value) {
    setLog((prev) => [...prev, String(value)]);
  }

  function run() {
    setLog([]);
    print("3 < 5   ->  " + (3 < 5));
    print('"apple" < "banana"   ->  ' + ("apple" < "banana") + "   (alphabetical order)");
    print('"Zebra" < "apple"    ->  ' + ("Zebra" < "apple") + "   (uppercase sorts before lowercase!)");
    print("10 >= 10   ->  " + (10 >= 10));
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={run}>Run ordering comparisons</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 110 }}>
        {log.length === 0 ? "// output appears here" : log.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "reference-equality-for-objects",
      title: "Objects and arrays compare by reference",
      summary: "Two arrays with identical contents are still not === equal, because they're different objects in memory.",
      code: `function App() {
  const [log, setLog] = useState([]);

  function print(value) {
    setLog((prev) => [...prev, String(value)]);
  }

  function run() {
    setLog([]);
    const arrayA = [1, 2, 3];
    const arrayB = [1, 2, 3];
    const arrayC = arrayA;

    print("arrayA === arrayB  ->  " + (arrayA === arrayB) + "   (same contents, different objects)");
    print("arrayA === arrayC  ->  " + (arrayA === arrayC) + "   (arrayC points to the exact same array)");
    print("NaN === NaN  ->  " + (NaN === NaN) + "   (NaN is never equal to anything, even itself)");
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={run}>Run reference equality demo</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 100 }}>
        {log.length === 0 ? "// output appears here" : log.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
