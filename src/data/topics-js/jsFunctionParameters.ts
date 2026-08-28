import type { Topic } from "../../types";

export const jsFunctionParametersTopic: Topic = {
  id: "js-function-parameters",
  title: "JavaScript Function Parameters",
  category: "Functions",
  shortExplanation: `Parameters can do more than just receive one value each — JavaScript lets you give them fallbacks and let them soak up extras.

- **Default parameters**: \`function greet(name = "friend")\` fills in a value when no argument (or \`undefined\`) is passed
- **Rest parameters**: \`function sum(...nums)\` gathers any number of arguments into a real array
- The old \`arguments\` object still exists inside regular functions but is legacy — prefer rest parameters
- JavaScript never errors on too many or too few arguments — extras are ignored, missing ones become \`undefined\``,
  longExplanation: `Beyond simply naming inputs, JavaScript's parameter syntax has a few features worth knowing well, because they solve real everyday problems: giving a parameter a sensible fallback, and accepting a flexible number of arguments.

- **Default parameter values** let you specify what a parameter should be when the caller doesn't supply an argument for it (or explicitly passes \`undefined\`): \`function greet(name = "friend") { return "Hi, " + name; }\`. Calling \`greet()\` returns \`"Hi, friend"\`, while \`greet("Ada")\` returns \`"Hi, Ada"\`. Defaults can even reference earlier parameters: \`function makeRange(start, end = start + 10)\`. Before this syntax existed (added in ES2015), developers had to write manual checks like \`name = name || "friend";\` inside the function body — the \`=\` default syntax is simply cleaner and handles \`undefined\` specifically rather than every "falsy" value
- **Rest parameters** use \`...\` before the last parameter name to collect *any* number of remaining arguments into a genuine array: \`function sum(...numbers) { return numbers.reduce((total, n) => total + n, 0); }\`. Calling \`sum(1, 2, 3, 4)\` gathers \`[1, 2, 3, 4]\` into \`numbers\`, and because it's a real array, all the array methods (\`.map\`, \`.reduce\`, \`.forEach\`, and so on) work on it directly — no conversion needed. A rest parameter must be the *last* parameter in the list, since it claims everything from that position onward
- Before rest parameters existed, functions relied on a special built-in **\`arguments\` object**, automatically available inside every regular \`function\` (not arrow functions), holding all passed-in arguments. It looks array-like — you can access \`arguments[0]\`, and check \`arguments.length\` — but it is *not* a real array, so array methods like \`.map()\` don't work on it directly without first converting it (e.g. \`Array.from(arguments)\`). It's still valid, working code you may encounter in older codebases, but modern JavaScript prefers rest parameters because they're a real array from the start, they can be named descriptively, and — unlike \`arguments\` — they work inside arrow functions too
- A detail that surprises people coming from stricter languages: JavaScript **never throws an error** over an argument count mismatch. Calling a two-parameter function with three arguments simply ignores the extra one (though it's still reachable via \`arguments\` or a rest parameter, if used). Calling it with only one argument leaves the missing parameter as \`undefined\`, unless a default value was specified for it. This is a deliberate design choice for flexibility, but it also means a typo'd or miscounted function call fails *silently* rather than immediately — the bug tends to surface later as an unexpected \`undefined\` somewhere downstream, which is exactly the kind of bug default parameters and careful testing help catch early
- Default values and rest parameters can be combined with regular parameters in one signature, as long as the rest parameter comes last: \`function createUser(name, role = "member", ...permissions)\`

Together these features make function signatures far more expressive than "a fixed list of required inputs": a function can offer sensible defaults for optional configuration while still accepting an open-ended list of extra values, which is exactly the shape of many real-world APIs (a logging function that always needs a level but accepts any number of message parts, for instance).`,
  examples: [
    {
      id: "default-parameters",
      title: "Default parameter values",
      summary: "Omitting an argument (or passing undefined) falls back to the default.",
      code: `function App() {
  const [name, setName] = useState("");
  const [log, setLog] = useState([]);

  function print(value) {
    setLog((prev) => [...prev, String(value)]);
  }

  function greet(who = "friend") {
    return "Hi, " + who + "!";
  }

  function run() {
    setLog([]);
    print("greet(\\"" + name + "\\") -> " + greet(name === "" ? undefined : name));
    print("greet() with nothing passed -> " + greet());
  }

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <label>
        Name (try leaving it blank):{" "}
        <input value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <button onClick={run}>Run greet()</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 80 }}>
        {log.length === 0 ? "// output appears here" : log.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "rest-parameters-sum",
      title: "Rest parameters: sum any number of values",
      summary: "...numbers collects every argument into a real array you can reduce over.",
      code: `function App() {
  const [text, setText] = useState("2, 4, 6, 8");
  const [log, setLog] = useState([]);

  function print(value) {
    setLog((prev) => [...prev, String(value)]);
  }

  function sum(...numbers) {
    return numbers.reduce((total, n) => total + n, 0);
  }

  function run() {
    setLog([]);
    const nums = text.split(",").map((s) => Number(s.trim())).filter((n) => !isNaN(n));
    print("Calling sum(" + nums.join(", ") + ")");
    print("Array.isArray(rest parameter)? " + Array.isArray(nums));
    print("Total: " + sum(...nums));
  }

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <label>
        Comma-separated numbers:{" "}
        <input value={text} onChange={(e) => setText(e.target.value)} style={{ width: 200 }} />
      </label>
      <button onClick={run}>Run sum(...numbers)</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 90 }}>
        {log.length === 0 ? "// output appears here" : log.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "arguments-object-legacy",
      title: "The legacy arguments object",
      summary: "Array-like but not a real array — shown alongside the modern rest-parameter equivalent.",
      code: `function App() {
  const [log, setLog] = useState([]);

  function print(value) {
    setLog((prev) => [...prev, String(value)]);
  }

  function oldStyle() {
    print("arguments.length -> " + arguments.length);
    print("arguments[0] -> " + arguments[0]);
    print("Array.isArray(arguments) -> " + Array.isArray(arguments) + "  (it's array-LIKE, not a real array)");
  }

  function modernStyle(...args) {
    print("args.length -> " + args.length);
    print("Array.isArray(args) -> " + Array.isArray(args) + "  (a real array, methods like .map work directly)");
  }

  function run() {
    setLog([]);
    print("--- legacy arguments object ---");
    oldStyle("a", "b", "c");
    print("");
    print("--- modern rest parameter ---");
    modernStyle("a", "b", "c");
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={run}>Run comparison</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 140 }}>
        {log.length === 0 ? "// output appears here" : log.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "argument-count-mismatch",
      title: "JavaScript never errors on argument count",
      summary: "Too many arguments are ignored; too few become undefined — no exception either way.",
      code: `function App() {
  const [log, setLog] = useState([]);

  function print(value) {
    setLog((prev) => [...prev, String(value)]);
  }

  function add(a, b) {
    return a + b;
  }

  function run() {
    setLog([]);
    print("add(2, 3) -> " + add(2, 3) + "  (correct count)");
    print("add(2, 3, 4, 5) -> " + add(2, 3, 4, 5) + "  (extra args 4 and 5 are silently ignored)");
    print("add(2) -> " + add(2) + "  (missing 'b' becomes undefined, so 2 + undefined = NaN)");
    print("No error was thrown in either mismatched case above.");
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={run}>Run mismatch demo</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 110 }}>
        {log.length === 0 ? "// output appears here" : log.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
