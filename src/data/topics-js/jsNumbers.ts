import type { Topic } from "../../types";

export const jsNumbersTopic: Topic = {
  id: "js-numbers",
  title: "JavaScript Numbers",
  category: "Strings & Numbers",
  shortExplanation: `JavaScript has only ==one== number type — there's no separate \`int\`, \`float\`, or \`double\` like many other languages use. Every number, whole or decimal, is stored the same way, which means some decimal math produces tiny rounding errors that can surprise beginners.

- \`Number.isInteger(n)\` checks whether a number has no fractional part
- \`.toFixed(n)\` rounds a number to \`n\` decimal places **for display** — and returns a *string*, not a number
- \`NaN\` ("Not a Number") shows up when a math operation fails to produce a real number, and \`isNaN()\` / \`Number.isNaN()\` test for it`,
  longExplanation: `Many programming languages force you to pick a number type up front — an \`int\` for whole numbers, a \`float\` or \`double\` for decimals — and converting between them is an explicit step. JavaScript has no such distinction: there is exactly one \`number\` type, and \`5\`, \`5.0\`, and \`5.5\` are all just \`number\` values under the hood, all stored using the IEEE 754 double-precision floating-point format also used by many other languages for their decimal type.

That single storage format is convenient, but it comes with a well-known quirk: **not every decimal value can be represented exactly in binary floating-point**, the same way \`1/3\` can't be written exactly in decimal. This is why \`0.1 + 0.2\` does not produce exactly \`0.3\` in JavaScript — it produces \`0.30000000000000004\`, a tiny rounding error baked into how the numbers are stored, not a bug in the \`+\` operator. This surprises almost everyone the first time they see it, and it's not unique to JavaScript — the same thing happens in Python, Java, C, and most other languages that use the same floating-point standard. The practical takeaway is: never compare floating-point results with \`===\` once they've been through arithmetic; instead check that the difference is smaller than some tiny tolerance, or round both sides for comparison.

\`Number.isInteger(n)\` answers a narrower, very useful question: does this number have zero fractional part? \`Number.isInteger(4)\` is \`true\`, \`Number.isInteger(4.5)\` is \`false\`, and \`Number.isInteger(4.0)\` is also \`true\` — because \`4.0\` and \`4\` are literally the same stored value, JavaScript has no separate memory of whether a \`.0\` was ever typed.

\`.toFixed(n)\` solves a different, extremely common problem: displaying a number with a fixed number of decimal places, like formatting a price. \`(19.999).toFixed(2)\` returns \`"20.00"\` — rounding to the requested precision. Two details trip people up here: first, \`.toFixed()\` returns a **string**, not a number, so \`"20.00" + 1\` concatenates rather than adding; second, it's meant for *display formatting*, not for fixing floating-point precision problems in further calculations — chaining more math onto a \`.toFixed()\` result generally means converting it back to a number first with \`Number(...)\`.

Finally, \`NaN\` is the special value JavaScript produces when a numeric operation doesn't yield a real number — \`Number("hello")\`, \`0 / 0\`, and \`Math.sqrt(-1)\` all produce it. \`NaN\` has one famously strange property: it is the only JavaScript value that is never equal to itself — \`NaN === NaN\` is \`false\`. That's exactly why a dedicated check function exists rather than a plain \`=== NaN\` comparison. The global \`isNaN(value)\` function first *converts* its argument to a number and then checks — which means \`isNaN("hello")\` is \`true\`, but so is the possibly-unexpected \`isNaN(undefined)\`. \`Number.isNaN(value)\`, added later, is the stricter, usually-preferred version: it returns \`true\` only if the value is *already* the actual \`NaN\` value, with no coercion — \`Number.isNaN("hello")\` is \`false\`, because the string \`"hello"\` was never converted to a number at all.`,
  examples: [
    {
      id: "one-number-type",
      title: "Whole numbers and decimals are the same type",
      summary: "typeof reports \"number\" for both an integer and a decimal — JavaScript makes no distinction.",
      code: `function App() {
  const [log, setLog] = useState([]);

  function print(value) {
    setLog((prev) => [...prev, String(value)]);
  }

  function run() {
    setLog([]);
    const wholeNumber = 42;
    const decimalNumber = 3.14;
    print("typeof wholeNumber: " + typeof wholeNumber);
    print("typeof decimalNumber: " + typeof decimalNumber);
    print("Are they the same type? " + (typeof wholeNumber === typeof decimalNumber));
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={run}>Check number types</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 80 }}>
        {log.length === 0 ? "// output appears here" : log.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "floating-point-precision",
      title: "0.1 + 0.2 is not exactly 0.3",
      summary: "A real floating-point rounding error, plus two ways to work around it safely.",
      code: `function App() {
  const [log, setLog] = useState([]);

  function print(value) {
    setLog((prev) => [...prev, String(value)]);
  }

  function run() {
    setLog([]);
    const result = 0.1 + 0.2;
    print("0.1 + 0.2 = " + result);
    print("result === 0.3: " + (result === 0.3));
    print("Rounded with toFixed(1): " + result.toFixed(1));
    print("Safe comparison (tolerance): " + (Math.abs(result - 0.3) < 0.0001));
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={run}>Run floating-point check</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 100 }}>
        {log.length === 0 ? "// output appears here" : log.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "integer-check-calculator",
      title: "Number.isInteger() and .toFixed(), live",
      summary: "Type any value and watch both checks update immediately.",
      code: `function App() {
  const [text, setText] = useState("4.5");
  const num = Number(text);

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type a number..."
        style={{ padding: 8, width: 200 }}
      />
      <p>Number(text): <strong>{num}</strong></p>
      <p>Number.isInteger(num): <strong>{String(Number.isInteger(num))}</strong></p>
      <p>num.toFixed(2): <strong>{isNaN(num) ? "N/A" : num.toFixed(2)}</strong></p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "nan-and-isnan",
      title: "NaN, and isNaN() vs. Number.isNaN()",
      summary: "The two NaN-checking functions disagree on non-numeric inputs like undefined.",
      code: `function App() {
  const [log, setLog] = useState([]);

  function print(value) {
    setLog((prev) => [...prev, String(value)]);
  }

  function run() {
    setLog([]);
    const bad = Number("hello");
    print("Number('hello') = " + bad);
    print("bad === NaN: " + (bad === NaN));
    print("isNaN(bad): " + isNaN(bad));
    print("Number.isNaN(bad): " + Number.isNaN(bad));
    print("isNaN(undefined): " + isNaN(undefined));
    print("Number.isNaN(undefined): " + Number.isNaN(undefined));
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={run}>Compare isNaN vs Number.isNaN</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 130 }}>
        {log.length === 0 ? "// output appears here" : log.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
