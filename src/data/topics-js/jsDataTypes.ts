import type { Topic } from "../../types";

export const jsDataTypesTopic: Topic = {
  id: "js-data-types",
  title: "JavaScript Data Types",
  category: "JS Basics",
  shortExplanation: `Every value in JavaScript has a **type**, which falls into one of two big groups: ==primitives== and objects.

- Primitives: \`string\`, \`number\`, \`boolean\`, \`undefined\`, \`null\`, \`bigint\`, \`symbol\`
- Everything else — plain objects, arrays, functions — is an \`object\`
- The \`typeof\` operator tells you a value's type at runtime
- JavaScript is **dynamically typed**: the same variable can hold a number today and a string tomorrow`,
  longExplanation: `Every value that flows through a JavaScript program — a number typed into a form, a name loaded from a database, a list of items — has a type, and understanding the small set of types JavaScript recognizes is foundational to understanding almost everything else about the language.

- JavaScript has seven **primitive** types: \`string\` (text, like \`"hello"\`), \`number\` (all numbers, both integers and decimals share one type — there's no separate "int" vs "float"), \`boolean\` (\`true\` or \`false\`), \`undefined\` (a variable that has been declared but never given a value), \`null\` (an intentional, explicit "no value"), \`bigint\` (for integers too large for the regular \`number\` type to represent safely, written like \`123n\`), and \`symbol\` (unique, mostly-internal identifiers rarely seen in everyday app code)
- Everything that is *not* one of those seven primitives is an **object**. This includes plain object literals (\`{ name: "Ada" }\`), arrays (\`[1, 2, 3]\` — arrays are actually a specialized kind of object), functions, dates, and more. Objects can hold collections of values and, unlike primitives, are typically compared by *reference* rather than by their contents (covered in the objects topic)
- The \`typeof\` operator returns a string naming a value's type: \`typeof 42\` is \`"number"\`, \`typeof "hi"\` is \`"string"\`, \`typeof true\` is \`"boolean"\`, \`typeof undefined\` is \`"undefined"\`, and \`typeof {}\` (or an array, or a function reference) is \`"object"\` (with functions being a documented special case: \`typeof\` on a function returns \`"function"\`, even though functions are technically objects under the hood)
- A famous, long-standing quirk: \`typeof null\` returns \`"object"\`, not \`"null"\`. This is a bug from JavaScript's very first version that's been kept ever since for backward compatibility — countless existing websites would break if it were "fixed" today. In practice, if you need to check specifically for \`null\`, compare directly with \`=== null\` instead of relying on \`typeof\`
- \`undefined\` vs \`null\` is a common early point of confusion: \`undefined\` is what JavaScript gives you automatically — a declared-but-unassigned variable, a missing object property, a function that doesn't explicitly \`return\` anything. \`null\`, by contrast, is something a programmer deliberately assigns to represent "no value here, on purpose" — for example, \`let selectedUser = null;\` before any user has been picked
- JavaScript is **dynamically typed**, which means a variable itself doesn't have a fixed type — only the *value* it currently holds does, and that can change: \`let x = 5;\` (a number) followed later by \`x = "five";\` (now a string) is completely legal. This is different from **statically typed** languages (and from TypeScript, which this very app is written in) where a variable's type is fixed for its entire lifetime and checked before the code even runs. Dynamic typing gives JavaScript flexibility, but it also means type-related bugs that a static type checker would catch instantly can instead only surface when the code actually runs
- Because of dynamic typing, it's common — and a good habit — to check a value's type before relying on it, especially for data arriving from outside the program (a form input, an API response), using \`typeof\` or other checks rather than assuming the shape of the data

Understanding these types (and the primitive vs. object split especially) sets up nearly every other topic in this subject: how equality comparisons behave, how type conversion works, and how objects and arrays are structured all build directly on this foundation.`,
  examples: [
    {
      id: "typeof-primitives",
      title: "Checking types with typeof",
      summary: "Run typeof against each primitive type and see what it reports.",
      code: `function App() {
  const [log, setLog] = useState([]);

  function print(value) {
    setLog((prev) => [...prev, String(value)]);
  }

  function run() {
    setLog([]);
    print("typeof 42 -> " + typeof 42);
    print("typeof \\"hello\\" -> " + typeof "hello");
    print("typeof true -> " + typeof true);
    print("typeof undefined -> " + typeof undefined);
    print("typeof null -> " + typeof null + "  (a famous long-standing quirk!)");
    print("typeof {} -> " + typeof {});
    print("typeof [1, 2, 3] -> " + typeof [1, 2, 3] + "  (arrays are objects too)");
    print("typeof function(){} -> " + typeof function () {});
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={run}>Run typeof checks</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 160 }}>
        {log.length === 0 ? "// output appears here" : log.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "interactive-type-checker",
      title: "Type-check whatever you type in",
      summary: "An input box lets you try different values and immediately see their JS type.",
      code: `function App() {
  const [text, setText] = useState("42");

  function analyze(raw) {
    if (raw === "true" || raw === "false") return { value: raw === "true", type: "boolean" };
    if (raw === "null") return { value: null, type: "object (that famous quirk!)" };
    if (raw === "undefined" || raw === "") return { value: undefined, type: "undefined" };
    if (raw !== "" && !isNaN(Number(raw))) return { value: Number(raw), type: "number" };
    return { value: raw, type: "string" };
  }

  const result = analyze(text);

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <label>
        Type a value (try: 42, true, null, undefined, hello):{" "}
        <input value={text} onChange={(e) => setText(e.target.value)} />
      </label>
      <p>typeof your input is: <strong>{result.type}</strong></p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "undefined-vs-null",
      title: "undefined vs. null",
      summary: "undefined happens automatically; null is something you assign on purpose.",
      code: `function App() {
  const [log, setLog] = useState([]);

  function print(value) {
    setLog((prev) => [...prev, String(value)]);
  }

  function run() {
    setLog([]);
    let notYetAssigned;
    print("A declared-but-unassigned variable: " + notYetAssigned + " (typeof " + typeof notYetAssigned + ")");

    let selectedUser = null;
    print("A variable explicitly set to 'no value': " + selectedUser + " (typeof " + typeof selectedUser + ")");

    const obj = { name: "Ada" };
    print("Reading a missing property (obj.age): " + obj.age);
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={run}>Run undefined vs null demo</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 100 }}>
        {log.length === 0 ? "// output appears here" : log.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "dynamic-typing",
      title: "Dynamic typing: one variable, many types",
      summary: "The same variable holds a number, then a string, then a boolean — all perfectly legal.",
      code: `function App() {
  const [log, setLog] = useState([]);

  function print(value) {
    setLog((prev) => [...prev, String(value)]);
  }

  function run() {
    setLog([]);
    let x = 5;
    print("x = " + x + "  (typeof " + typeof x + ")");
    x = "five";
    print("x = " + x + "  (typeof " + typeof x + ")");
    x = true;
    print("x = " + x + "  (typeof " + typeof x + ")");
    print("Same variable, three different types — this is what 'dynamically typed' means.");
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={run}>Run dynamic typing demo</button>
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
