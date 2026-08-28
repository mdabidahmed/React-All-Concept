import type { Topic } from "../../types";

export const jsBooleansTopic: Topic = {
  id: "js-booleans",
  title: "JavaScript Booleans and Truthy/Falsy",
  category: "Control Flow",
  shortExplanation: `A **boolean** is either \`true\` or \`false\` — but JavaScript also treats *every other value* as either "truthy" or "falsy" when used in a condition.

- Exactly **7 falsy values**: \`false\`, \`0\`, \`""\` (empty string), \`null\`, \`undefined\`, \`NaN\`, \`0n\`
- ==Everything else== is truthy — including \`"0"\`, \`[]\`, and \`{}\`, which surprise beginners
- \`&&\` and \`||\` **short-circuit**: they stop evaluating as soon as the result is already determined
- \`??\` (nullish coalescing) only falls back on \`null\`/\`undefined\`, unlike \`||\` which falls back on *any* falsy value`,
  longExplanation: `The \`boolean\` type has exactly two values, \`true\` and \`false\`, and they're the direct result of every comparison and logical expression. But JavaScript conditions (\`if\`, \`while\`, the \`&&\`/\`||\` operators) don't require an actual boolean — they'll accept *any* value and internally convert it to \`true\` or \`false\` first. That conversion is what "truthy" and "falsy" describe.

- There are exactly **seven falsy values** in JavaScript — meaning every other value that could ever exist, no matter how exotic, is truthy: \`false\` (obviously), \`0\` (and \`-0\`), \`""\` (the empty string), \`null\`, \`undefined\`, \`NaN\`, and \`0n\` (BigInt zero). If you can memorize this short list, you know everything you need — anything not on it is truthy
- The surprising part for most beginners is what counts as **truthy**: the string \`"0"\` (a non-empty string containing the character zero) is truthy, an empty array \`[]\` is truthy, and an empty object \`{}\` is truthy — even though all three might intuitively feel "empty" or "zero-like." Only the *exact* seven listed values are falsy; everything else, including all objects and arrays regardless of what they contain, is truthy
- \`if (value)\` checks whether \`value\` is truthy, which is why code like \`if (username)\` is a common, concise way to check "is this a non-empty string that isn't null/undefined" all in one shot — it relies on the fact that \`""\`, \`null\`, and \`undefined\` are all falsy, so if none of those apply, something meaningful is presumably in there
- \`&&\` (logical AND) and \`||\` (logical OR) don't just produce \`true\`/\`false\` — they're **short-circuiting** operators that return one of their *actual operands*, not necessarily a boolean. \`a && b\` evaluates \`a\`; if it's falsy, it returns \`a\` immediately without even looking at \`b\` (because the whole expression can only be falsy at that point) — otherwise it evaluates and returns \`b\`. \`a || b\` works the opposite way: if \`a\` is truthy, it returns \`a\` immediately without evaluating \`b\`; otherwise it returns \`b\`
- This short-circuiting behavior is extremely common in real code: \`isLoggedIn && renderDashboard()\` only calls \`renderDashboard()\` if \`isLoggedIn\` is truthy, entirely skipping the function call otherwise — a compact substitute for a full \`if\` statement. Likewise, \`userProvidedName || "Guest"\` returns \`userProvidedName\` if it's truthy, or falls back to \`"Guest"\` otherwise — a common way to supply a default value
- The \`||\` default-value pattern has one well-known flaw: it falls back on **any** falsy value, not just "missing" ones. \`quantity || 10\` intends to default a missing quantity to \`10\`, but if \`quantity\` is legitimately \`0\` (a perfectly valid value someone might want!), \`||\` incorrectly treats that \`0\` as "missing" and replaces it with \`10\` anyway
- \`??\` (the **nullish coalescing operator**) fixes exactly that flaw: \`a ?? b\` returns \`a\` unless \`a\` is specifically \`null\` or \`undefined\`, in which case it returns \`b\`. Every other falsy value (\`0\`, \`""\`, \`false\`, \`NaN\`) is left alone and returned as-is. \`quantity ?? 10\` correctly keeps a real \`0\` while still defaulting genuinely missing (\`null\`/\`undefined\`) values to \`10\` — this is why \`??\` was added to the language relatively recently, specifically to handle the case \`||\` gets wrong
- \`!\` (logical NOT) flips a value to its boolean opposite: \`!true\` is \`false\`, and — handy as a quick truthy/falsy check — \`!value\` converts *any* value straight to its opposite boolean, so \`!!value\` (double negation) is a common shorthand idiom to convert any value into its plain \`true\`/\`false\` truthy equivalent

Truthy/falsy rules aren't optional trivia — they silently govern the behavior of every \`if\`, every \`&&\`/\`||\` shortcut, and every default-value pattern in real JavaScript code, so internalizing the seven falsy values pays off constantly.`,
  examples: [
    {
      id: "the-seven-falsy-values",
      title: "The seven falsy values, tested directly",
      summary: "Every one of these converts to false in a boolean context — everything else converts to true.",
      code: `function App() {
  const [log, setLog] = useState([]);

  function print(value) {
    setLog((prev) => [...prev, String(value)]);
  }

  function run() {
    setLog([]);
    const falsyValues = [false, 0, "", null, undefined, NaN, 0n];
    falsyValues.forEach((v) => {
      print("Boolean(" + String(v) + ")  ->  " + Boolean(v));
    });
    print("--- and some surprising truthy values ---");
    print('Boolean("0")  ->  ' + Boolean("0") + "   (non-empty string, even of '0')");
    print("Boolean([])  ->  " + Boolean([]) + "   (an empty array is still truthy)");
    print("Boolean({})  ->  " + Boolean({}) + "   (an empty object is still truthy)");
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={run}>Run truthy/falsy checks</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 220 }}>
        {log.length === 0 ? "// output appears here" : log.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "try-your-own-value",
      title: "Test any value's truthiness interactively",
      summary: "Type a value and instantly see whether JavaScript treats it as truthy or falsy.",
      code: `function App() {
  const [text, setText] = useState("");

  const isTruthy = Boolean(text);

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <label>
        Type something (try leaving it empty, or typing "0"):{" "}
        <input value={text} onChange={(e) => setText(e.target.value)} />
      </label>
      <p>
        Boolean(your input) -&gt;{" "}
        <strong style={{ color: isTruthy ? "#16a34a" : "#dc2626" }}>{String(isTruthy)}</strong>
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "short-circuit-and-or",
      title: "Short-circuit evaluation with && and ||",
      summary: "A toggle controls whether the right-hand side of && or || even runs.",
      code: `function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [log, setLog] = useState([]);

  function print(value) {
    setLog((prev) => [...prev, String(value)]);
  }

  function sideEffectFunction() {
    print("sideEffectFunction() actually ran!");
    return "dashboard content";
  }

  function run() {
    setLog([]);
    print("isLoggedIn is currently: " + isLoggedIn);
    const result = isLoggedIn && sideEffectFunction();
    print("isLoggedIn && sideEffectFunction()  ->  " + result);
  }

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <label>
        <input type="checkbox" checked={isLoggedIn} onChange={(e) => setIsLoggedIn(e.target.checked)} />
        {" "}isLoggedIn
      </label>
      <button onClick={run}>Run isLoggedIn && sideEffectFunction()</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 90, width: "100%" }}>
        {log.length === 0 ? "// output appears here" : log.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "nullish-coalescing-vs-or",
      title: "?? vs || when the value is legitimately 0",
      summary: "|| incorrectly replaces a real 0 with the fallback; ?? correctly leaves it alone.",
      code: `function App() {
  const [quantity, setQuantity] = useState(0);

  const withOr = quantity || 10;
  const withNullish = quantity ?? 10;

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <label>
        quantity:{" "}
        <input type="number" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} />
      </label>
      <p>quantity || 10  -&gt;  <strong>{withOr}</strong> {quantity === 0 && "(bug: a real 0 got replaced!)"}</p>
      <p>quantity ?? 10  -&gt;  <strong>{withNullish}</strong> {quantity === 0 && "(correct: 0 is kept)"}</p>
      <p style={{ color: "#6b7280", fontSize: 13 }}>Set quantity to 0 above to see the difference between || and ??.</p>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
