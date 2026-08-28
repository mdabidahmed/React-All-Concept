import type { Topic } from "../../types";

export const jsSyntaxTopic: Topic = {
  id: "js-syntax",
  title: "JavaScript Syntax",
  category: "JS Basics",
  shortExplanation: `**Syntax** is the set of rules that define how valid JavaScript is written — get it wrong and the code won't run at all.

- A program is built from ==statements==, each usually ending in a semicolon
- **Values** (literals) like \`42\` or \`"hi"\` are the raw data statements work with
- JavaScript is **case-sensitive** (\`myVar\` and \`myvar\` are different) and mostly ignores extra whitespace`,
  longExplanation: `Every programming language has a grammar, and JavaScript's is what a browser or Node.js engine parses before it can run anything. A JavaScript program is just a sequence of **statements** — instructions like declaring a variable, running a function call, or looping — executed roughly top to bottom. Each statement is typically terminated with a semicolon (\`;\`), the same way a sentence ends with a period.

- A **value** (or *literal*) is a fixed piece of data written directly into the code: \`42\` is a number literal, \`"hello"\` is a string literal, \`true\` is a boolean literal. Statements combine values, variables, and operators to do something useful
- **Variables** are named containers for values, declared with \`let\`, \`const\`, or the older \`var\` (covered in its own topic). A variable name must start with a letter, \`$\`, or \`_\`, and can't be a reserved **keyword** — words like \`if\`, \`return\`, \`function\`, and \`for\` that already mean something to the language and can't be reused as identifiers
- JavaScript is ==case-sensitive== everywhere: keywords, variable names, and function names. \`let age\` and \`let Age\` are two completely separate variables — a very common source of bugs for beginners coming from case-insensitive contexts
- **Whitespace** (spaces, tabs, newlines) between tokens is almost entirely ignored by the parser — it exists for humans, not the engine. You could write an entire program on one line, or spread every token across its own line, and it would run identically. That said, consistent indentation is essential for humans reading the code
- Semicolons are technically optional in many places because of a feature called **Automatic Semicolon Insertion (ASI)** — the engine tries to guess where a statement ends if you omit the \`;\`. ASI mostly works, but it has sharp edges: a \`return\` statement followed by a newline and then a value can silently insert a semicolon right after \`return\`, turning \`return\n  { ok: true }\` into \`return;\` followed by unreachable code. The safest habit is to write semicolons explicitly rather than rely on ASI's guesses
- Curly braces \`{ }\` group statements into a **block** (used by \`if\`, loops, and functions), parentheses \`( )\` are used for function calls, conditions, and parameter lists, and code is a mix of expressions (things that produce a value, like \`2 + 2\`) and statements (things that perform an action, like an \`if\` block)

Getting comfortable with syntax is mostly about pattern recognition — once you've seen enough valid JavaScript, invalid JavaScript (a missing brace, a misplaced comma) starts to visually "look wrong" before you even know exactly why. The examples below let you poke at these rules directly.`,
  examples: [
    {
      id: "statements-and-values",
      title: "Statements built from values",
      summary: "Each line below is a separate statement combining literal values with a variable.",
      code: `function App() {
  const [log, setLog] = useState([]);

  function print(value) {
    setLog((prev) => [...prev, String(value)]);
  }

  function run() {
    setLog([]);
    let age = 30;
    print("A number literal: " + 42);
    print("A string literal: " + "hello");
    print("A boolean literal: " + true);
    print("A variable holding a value: age = " + age);
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={run}>Run statements</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 100 }}>
        {log.length === 0 ? "// output appears here" : log.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "case-sensitivity",
      title: "Case sensitivity in action",
      summary: "myVar and myvar are two totally different variables to the JavaScript engine.",
      code: `function App() {
  const [log, setLog] = useState([]);

  function print(value) {
    setLog((prev) => [...prev, String(value)]);
  }

  function run() {
    setLog([]);
    let myVar = "camelCase version";
    let myvar = "all lowercase version";
    print("myVar = " + myVar);
    print("myvar = " + myvar);
    print("They are different variables, even though they look almost identical.");
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={run}>Run case-sensitivity demo</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 100 }}>
        {log.length === 0 ? "// output appears here" : log.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "whitespace-doesnt-matter",
      title: "Whitespace is (mostly) ignored",
      summary: "Type extra spaces and newlines into the input — the computed result never changes.",
      code: `function App() {
  const [a, setA] = useState(2);
  const [b, setB] = useState(3);

  // No matter how this is formatted, "a + b" always computes the same value.
  const sum =
    a
      +
        b;

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <label>
        a:{" "}
        <input
          type="number"
          value={a}
          onChange={(e) => setA(Number(e.target.value))}
        />
      </label>
      <label>
        b:{" "}
        <input
          type="number"
          value={b}
          onChange={(e) => setB(Number(e.target.value))}
        />
      </label>
      <p>a + b = <strong>{sum}</strong></p>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        The oddly-spaced "a + b" above still evaluates correctly — whitespace between tokens doesn't change meaning.
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "asi-gotcha",
      title: "A gotcha caused by Automatic Semicolon Insertion",
      summary: "A return statement followed by a newline can silently return undefined instead of the intended object.",
      code: `function App() {
  const [log, setLog] = useState([]);

  function print(value) {
    setLog((prev) => [...prev, String(value)]);
  }

  function makeUserBroken() {
    return
    {
      name: "Ada",
    };
  }

  function makeUserFixed() {
    return {
      name: "Ada",
    };
  }

  function run() {
    setLog([]);
    const broken = makeUserBroken();
    const fixed = makeUserFixed();
    print("makeUserBroken() returned: " + broken);
    print("makeUserFixed() returned an object with name: " + fixed.name);
    print("ASI inserted a semicolon right after 'return' in the broken version!");
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={run}>Run ASI demo</button>
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
