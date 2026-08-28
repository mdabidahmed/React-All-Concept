import type { Topic } from "../../types";

export const jsVariablesTopic: Topic = {
  id: "js-variables",
  title: "JavaScript Variables",
  category: "JS Basics",
  shortExplanation: `A **variable** is a named container that holds a value, which the program can read or change later.

- \`const\` — cannot be reassigned after it's set; use this by ==default==
- \`let\` — can be reassigned; use it only when the value genuinely needs to change
- \`var\` — the old way of declaring variables, now discouraged in favor of \`let\`/\`const\`
- Names conventionally use **camelCase**, e.g. \`firstName\`, \`totalPrice\``,
  longExplanation: `A variable is a label attached to a value stored in memory, so that code can refer to that value by name instead of retyping it everywhere. JavaScript has three keywords for declaring one — \`var\`, \`let\`, and \`const\` — and the difference between them is one of the first real "gotchas" most people hit when learning the language.

- \`const\` declares a variable that **cannot be reassigned** once it's given a value: \`const pi = 3.14;\` followed later by \`pi = 4;\` throws an error. Importantly, \`const\` only locks the *binding*, not the contents of an object or array — \`const list = [1, 2];\` still allows \`list.push(3)\`, because \`list\` itself never gets reassigned to a new array, only mutated in place
- \`let\` declares a variable that **can be reassigned**: \`let score = 0;\` followed by \`score = score + 10;\` works fine. \`let\` is also **block-scoped**, meaning a variable declared inside a \`{ }\` block (like inside an \`if\` or a \`for\` loop) only exists inside that block
- \`var\` is the original way to declare variables, dating back to JavaScript's earliest versions, and it behaves quite differently: it's **function-scoped** rather than block-scoped (a \`var\` declared inside an \`if\` block "leaks" out to the whole enclosing function), and it can be redeclared and used *before* its declaration line due to a behavior called **hoisting**, silently returning \`undefined\` instead of an error. Both quirks have caused enough real-world bugs that modern JavaScript style guides recommend avoiding \`var\` entirely in new code
- The modern convention, and the one used throughout this app's own examples, is: **default to \`const\`** for everything, and only reach for \`let\` when you already know the variable's value needs to change later (a loop counter, a running total, a toggled flag). This isn't just a style preference — a codebase full of \`const\` tells a reader at a glance which values are safe from ever silently changing, which is one less thing to track mentally while reading
- **Declaration**, **initialization**, and **assignment** are three related but distinct ideas: *declaration* is introducing the variable's name (\`let age;\`), *initialization* is giving it its first value (either at the same time, \`let age = 30;\`, or later), and *assignment* is any later act of putting a (possibly new) value into an already-declared variable (\`age = 31;\`). A \`const\` must be initialized in the same statement as its declaration, since it can never be assigned to afterward
- **Naming rules**: a variable name must start with a letter, \`$\`, or \`_\` (never a digit), and after that can contain letters, digits, \`$\`, and \`_\`. Names are case-sensitive and cannot be one of JavaScript's reserved keywords (\`let\`, \`class\`, \`return\`, etc.)
- The near-universal **naming convention** in JavaScript is **camelCase**: the first word lowercase, each subsequent word capitalized, no spaces or underscores — \`firstName\`, \`isLoggedIn\`, \`totalItemCount\`. This isn't enforced by the language itself, but following it makes code instantly familiar to any other JavaScript developer

Choosing between \`const\` and \`let\` well is a small habit that pays off constantly: it documents intent right in the declaration, and it lets the engine (and other developers) catch accidental reassignment as an error instead of a silent, hard-to-trace bug.`,
  examples: [
    {
      id: "const-vs-let",
      title: "const blocks reassignment, let allows it",
      summary: "Try reassigning both — const throws, let succeeds.",
      code: `function App() {
  const [log, setLog] = useState([]);

  function print(value) {
    setLog((prev) => [...prev, String(value)]);
  }

  function run() {
    setLog([]);
    let score = 0;
    print("let score starts at " + score);
    score = score + 10;
    print("after reassignment, score = " + score);

    const maxScore = 100;
    print("const maxScore = " + maxScore);
    try {
      maxScore = 200;
    } catch (error) {
      print("Reassigning maxScore threw an error: " + error.message);
    }
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={run}>Run const vs let demo</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 110 }}>
        {log.length === 0 ? "// output appears here" : log.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "const-object-still-mutable",
      title: "const locks the binding, not the contents",
      summary: "A const array can still be pushed into — only reassigning the variable itself is blocked.",
      code: `function App() {
  const [log, setLog] = useState([]);

  function print(value) {
    setLog((prev) => [...prev, String(value)]);
  }

  function run() {
    setLog([]);
    const fruits = ["apple", "banana"];
    print("Initial list: " + fruits.join(", "));
    fruits.push("cherry");
    print("After push: " + fruits.join(", "));
    print("This works because push() mutates the array in place — 'fruits' itself was never reassigned.");
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
      id: "declaration-initialization-assignment",
      title: "Declaration vs. initialization vs. assignment",
      summary: "See the three steps happen one at a time, in order, using an interactive input.",
      code: `function App() {
  const [step, setStep] = useState(0);
  const [log, setLog] = useState([]);

  function print(value) {
    setLog((prev) => [...prev, String(value)]);
  }

  function nextStep() {
    if (step === 0) {
      // Step 1: declaration (no value yet)
      print("let city;  // declared, currently undefined");
    } else if (step === 1) {
      // Step 2: initialization
      let city;
      city = "Tokyo";
      print("city = \\"Tokyo\\";  // initialized, city is now \\"Tokyo\\"");
    } else if (step === 2) {
      // Step 3: assignment (changing it later)
      let city = "Tokyo";
      city = "Paris";
      print("city = \\"Paris\\";  // assigned a new value later");
    } else {
      setLog([]);
      setStep(-1);
      return;
    }
    setStep((s) => s + 1);
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={nextStep}>
        {step >= 3 || step === -1 ? "Restart" : "Run next step"}
      </button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 100 }}>
        {log.length === 0 ? "// click 'Run next step' three times" : log.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "camel-case-naming",
      title: "camelCase naming convention",
      summary: "An interactive form using several camelCase variable names, the JS naming standard.",
      code: `function App() {
  const [firstName, setFirstName] = useState("Ada");
  const [lastName, setLastName] = useState("Lovelace");

  const fullName = firstName + " " + lastName;

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <label>
        First name (firstName):{" "}
        <input value={firstName} onChange={(e) => setFirstName(e.target.value)} />
      </label>
      <label>
        Last name (lastName):{" "}
        <input value={lastName} onChange={(e) => setLastName(e.target.value)} />
      </label>
      <p>Full name (fullName): <strong>{fullName}</strong></p>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        firstName, lastName, and fullName all follow camelCase: lowercase first word, capitalized words after.
      </p>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
