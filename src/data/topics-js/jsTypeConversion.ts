import type { Topic } from "../../types";

export const jsTypeConversionTopic: Topic = {
  id: "js-type-conversion",
  title: "JavaScript Type Conversion",
  category: "JS Basics",
  shortExplanation: `**Type conversion** is turning a value from one type into another — JavaScript does this constantly, sometimes without being asked.

- ==Implicit== coercion happens automatically, e.g. \`"5" + 1\` becomes \`"51"\` but \`"5" - 1\` becomes \`4\`
- ==Explicit== conversion is done on purpose with \`Number()\`, \`String()\`, and \`Boolean()\`
- \`parseInt()\` and \`parseFloat()\` pull a number out of the *start* of a string, ignoring trailing text`,
  longExplanation: `Because JavaScript is dynamically typed and its operators are fairly permissive about what types they accept, the language frequently converts values between types on its own — a behavior called **implicit coercion** (or "type coercion"). Understanding when and how this happens is essential, because it explains some of JavaScript's most notorious "weird" behaviors.

- **Implicit coercion with \`+\`**: \`+\` means addition when both sides are numbers, but string concatenation the moment *either* side is a string. \`"5" + 1\` sees a string on the left, so it converts \`1\` to \`"1"\` and joins them: the result is the string \`"51"\`. This trips up almost everyone the first time they see it, especially since it doesn't throw an error — it just quietly produces the "wrong" (or at least unexpected) type
- **Implicit coercion with other math operators**: \`-\`, \`*\`, \`/\`, and \`%\` only make sense for numbers, so JavaScript coerces *both* sides to numbers no matter what, even if one side is a string: \`"5" - 1\` converts \`"5"\` to the number \`5\` first, giving \`4\`. This asymmetry — \`+\` prefers strings, every other math operator prefers numbers — is exactly why \`"5" + 1\` and \`"5" - 1\` behave so differently despite looking similar
- **Booleans get coerced to numbers in math too**: \`true\` becomes \`1\` and \`false\` becomes \`0\` when used in a numeric context, so \`1 + true\` is \`2\`, and \`10 - false\` is \`10\`
- Because implicit coercion can be surprising, it's good practice to convert values **explicitly** when the intent might not be obvious from context, using one of three built-in conversion functions:
  - \`Number(value)\` converts to a number — \`Number("42")\` is \`42\`, \`Number("42px")\` is \`NaN\` (Not a Number, since \`"42px"\` isn't a clean numeric string), \`Number("")\` is \`0\`, \`Number(true)\` is \`1\`
  - \`String(value)\` converts to a string — \`String(42)\` is \`"42"\`, \`String(true)\` is \`"true"\`, \`String(null)\` is \`"null"\`
  - \`Boolean(value)\` converts to a boolean, based on whether the value is "truthy" or "falsy" (covered fully in the Booleans topic) — \`Boolean(0)\` is \`false\`, \`Boolean("hello")\` is \`true\`
- \`parseInt(string)\` and \`parseFloat(string)\` are more forgiving, specialized ways to pull a number out of a string: rather than requiring the *entire* string to be numeric like \`Number()\` does, they read from the start of the string and stop as soon as they hit a non-numeric character, ignoring whatever comes after. \`parseInt("42px")\` is \`42\` (it reads "42" and stops at "p"), whereas \`Number("42px")\` gives \`NaN\` because the whole string isn't purely numeric. \`parseInt\` only reads whole numbers; \`parseFloat("3.14 meters")\` correctly reads the decimal point too, returning \`3.14\`
- \`parseInt\` optionally takes a second argument, the **radix** (base) to parse in — \`parseInt("10", 2)\` reads \`"10"\` as binary and returns \`2\`. Omitting the radix is usually fine for ordinary base-10 numbers, but it's considered best practice to pass \`10\` explicitly (\`parseInt("08", 10)\`) to avoid any ambiguity about which base is intended
- A related gotcha: comparing values of different types with \`==\` (loose equality) also triggers implicit coercion behind the scenes, which is one of the main reasons \`===\` (strict equality, covered in the Comparisons topic) is generally preferred — it skips coercion entirely and compares both value *and* type

The practical takeaway: JavaScript will almost always try to "make something work" rather than throw an error when types don't match, which is convenient in casual scripts but can hide real bugs in larger programs. Converting explicitly, and reaching for \`===\` over \`==\`, removes most of the guesswork.`,
  examples: [
    {
      id: "implicit-coercion-gotchas",
      title: "The classic + vs - coercion gotcha",
      summary: "\"5\" + 1 concatenates as a string, but \"5\" - 1 coerces to numbers and subtracts.",
      code: `function App() {
  const [log, setLog] = useState([]);

  function print(value) {
    setLog((prev) => [...prev, String(value)]);
  }

  function run() {
    setLog([]);
    print('"5" + 1  ->  ' + ("5" + 1) + "   (string concatenation)");
    print('"5" - 1  ->  ' + ("5" - 1) + "   (numeric subtraction)");
    print('"5" * "2"  ->  ' + ("5" * "2") + "   (both sides coerced to numbers)");
    print("1 + true  ->  " + (1 + true) + "   (true coerces to 1)");
    print("10 - false  ->  " + (10 - false) + "   (false coerces to 0)");
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={run}>Run coercion demo</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 130 }}>
        {log.length === 0 ? "// output appears here" : log.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "explicit-conversion-functions",
      title: "Explicit conversion: Number(), String(), Boolean()",
      summary: "Type any text and see it converted explicitly with all three conversion functions.",
      code: `function App() {
  const [text, setText] = useState("42");

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <label>
        Enter a value:{" "}
        <input value={text} onChange={(e) => setText(e.target.value)} />
      </label>
      <ul>
        <li>Number(your input) = {String(Number(text))}</li>
        <li>String(your input) = "{String(text)}"</li>
        <li>Boolean(your input) = {String(Boolean(text))}</li>
      </ul>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        Try clearing the box entirely, or typing letters like "abc", to see Number() produce NaN or 0.
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "parseint-vs-number",
      title: "parseInt() reads from the start; Number() needs the whole string",
      summary: "\"42px\" converts cleanly with parseInt but becomes NaN with Number().",
      code: `function App() {
  const [log, setLog] = useState([]);

  function print(value) {
    setLog((prev) => [...prev, String(value)]);
  }

  function run() {
    setLog([]);
    print('Number("42px")  ->  ' + Number("42px"));
    print('parseInt("42px")  ->  ' + parseInt("42px"));
    print('parseFloat("3.14 meters")  ->  ' + parseFloat("3.14 meters"));
    print('parseInt("10", 2)  ->  ' + parseInt("10", 2) + "   (reads \\"10\\" as binary)");
    print('parseInt("08", 10)  ->  ' + parseInt("08", 10) + "   (explicit base 10 is safest)");
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={run}>Run parseInt / parseFloat demo</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 130 }}>
        {log.length === 0 ? "// output appears here" : log.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "form-input-conversion",
      title: "Why explicit conversion matters with form inputs",
      summary: "Two numbers typed into text inputs concatenate as strings unless explicitly converted with Number().",
      code: `function App() {
  const [a, setA] = useState("2");
  const [b, setB] = useState("3");

  const wrongResult = a + b;
  const rightResult = Number(a) + Number(b);

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <label>
        a (text input):{" "}
        <input value={a} onChange={(e) => setA(e.target.value)} />
      </label>
      <label>
        b (text input):{" "}
        <input value={b} onChange={(e) => setB(e.target.value)} />
      </label>
      <p>a + b (no conversion) = <strong>{wrongResult}</strong> (string concatenation!)</p>
      <p>Number(a) + Number(b) = <strong>{rightResult}</strong> (correct numeric sum)</p>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
