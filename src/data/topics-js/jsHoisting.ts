import type { Topic } from "../../types";

export const jsHoistingTopic: Topic = {
  id: "js-hoisting",
  title: "JavaScript Hoisting",
  category: "Functions",
  shortExplanation: `**Hoisting** is JavaScript's behavior of processing declarations before running any code, so some names are "known" before their line is reached.

- \`function\` declarations are fully hoisted — you can *call* one before its definition line
- \`var\` declarations are hoisted but only the *name*, initialized to \`undefined\` — usable early, but not with its real value yet
- \`let\`/\`const\` are hoisted too, but stay in a ==temporal dead zone== (TDZ) — accessing them before their line throws an error, rather than returning \`undefined\`
- The safest mental model: always declare things before you use them, regardless of what hoisting technically allows`,
  longExplanation: `Before running a script, JavaScript's engine scans it and registers every variable and function declaration it finds — a process called **hoisting** — as if those declarations were mentally lifted to the top of their scope. Understanding hoisting mostly matters for explaining *why* certain code that looks like it should fail actually works (and why other code that looks similar throws a confusing error instead).

- **Function declarations** (\`function greet() { ... }\`) are hoisted completely — both the name *and* the function body are available from the very top of their scope. This is why a function declaration can be called from code positioned *above* it in the file: by the time any code actually starts running, the whole function already exists in memory. This is a genuinely useful, intentional feature — it lets you organize a file with the "main" logic near the top and helper function definitions below it, read top-down for a human, while still working correctly
- **\`var\` declarations** are hoisted too, but only *partially*: the variable's **name** is registered ahead of time and automatically initialized to \`undefined\`, while the **value assignment** stays exactly where it was written in the code and only happens when that line actually executes. This means \`console.log(x); var x = 5;\` doesn't throw an error — it prints \`undefined\`, because \`x\` already exists (as \`undefined\`) by the time the \`console.log\` runs, even though its real value of \`5\` hasn't been assigned yet. This half-hoisted behavior is confusing enough that it's one of the most cited reasons to avoid \`var\` in modern code
- **\`let\` and \`const\`** are *also* technically hoisted — their names are known to the engine ahead of time, the same as \`var\` — but they are **not** initialized to \`undefined\`. Instead, they sit in what's called the **temporal dead zone (TDZ)**: the span of code between the start of their scope and the actual line where they're declared. Attempting to reference a \`let\`/\`const\` variable anywhere inside its TDZ throws a \`ReferenceError\` ("Cannot access 'x' before initialization") rather than silently returning \`undefined\`. This is widely considered an improvement over \`var\`'s behavior: it turns what would be a silent, hard-to-trace \`undefined\` bug into a loud, immediate, easy-to-locate error at exactly the point of the mistake
- **Function expressions and arrow functions** assigned to a variable (\`const greet = function () {...}\`, or \`const greet = () => {...}\`) follow the hoisting rules of *however they're declared* — \`var\`, \`let\`, or \`const\` — not the special full-hoisting behavior that only applies to true function *declarations*. So a \`const\`-declared function expression is just as unusable before its line (throwing a TDZ error) as any other \`const\` variable would be
- \`class\` declarations behave like \`let\`/\`const\`: they're hoisted but land in the same temporal dead zone, so a class cannot be instantiated or referenced above the line where it's defined
- Knowing the mechanics of hoisting is mostly valuable for *debugging* and for understanding *why* certain error messages appear — it is deliberately **not** meant to be leaned on as a coding style. Well-written JavaScript declares every variable and function before it's used, reading top-to-bottom exactly like the order things actually happen, so hoisting's quirks rarely become a practical concern in code that's organized this way in the first place

The takeaway most style guides converge on: understand hoisting well enough to explain the behavior when you see it (especially the \`var\`-returns-\`undefined\` vs. \`let\`-throws-an-error distinction, a frequent interview topic), but write code that never actually depends on it.`,
  examples: [
    {
      id: "function-declaration-hoisted",
      title: "Function declarations are fully hoisted",
      summary: "This function is called on the line before its own definition appears, and it works.",
      code: `function App() {
  const [log, setLog] = useState([]);

  function print(value) {
    setLog((prev) => [...prev, String(value)]);
  }

  function run() {
    setLog([]);
    print("Calling sayHi() BEFORE its definition line in the source:");
    print(sayHi());

    function sayHi() {
      return "Hi! I was called before my own definition, and it still worked.";
    }
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={run}>Run hoisting demo</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 90 }}>
        {log.length === 0 ? "// output appears here" : log.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "var-hoisted-as-undefined",
      title: "var is hoisted, but only as undefined",
      summary: "Reading a var before its assignment line gives undefined instead of an error.",
      code: `function App() {
  const [log, setLog] = useState([]);

  function print(value) {
    setLog((prev) => [...prev, String(value)]);
  }

  function run() {
    setLog([]);
    print("Reading x BEFORE its 'var x = 5' line: " + x);
    var x = 5;
    print("Reading x AFTER its 'var x = 5' line: " + x);
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={run}>Run var-hoisting demo</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 90 }}>
        {log.length === 0 ? "// output appears here" : log.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "temporal-dead-zone",
      title: "let and const: the temporal dead zone",
      summary: "Reading a let variable before its declaration line throws, instead of returning undefined.",
      code: `function App() {
  const [log, setLog] = useState([]);

  function print(value) {
    setLog((prev) => [...prev, String(value)]);
  }

  function run() {
    setLog([]);
    try {
      print("Reading y BEFORE its 'let y = 5' line...");
      print(y);
      let y = 5;
    } catch (error) {
      print("Threw an error instead: " + error.message);
    }

    let y = 5;
    print("Reading y AFTER its declaration line: " + y);
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={run}>Run temporal-dead-zone demo</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 100 }}>
        {log.length === 0 ? "// output appears here" : log.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "var-vs-let-side-by-side",
      title: "var vs. let hoisting, side by side",
      summary: "Two nearly identical functions, one with var and one with let, produce different outcomes.",
      code: `function App() {
  const [log, setLog] = useState([]);

  function print(value) {
    setLog((prev) => [...prev, String(value)]);
  }

  function tryVar() {
    print("var version -> value before declaration: " + typeof valueVar + " (" + valueVar + ")");
    var valueVar = "assigned";
    print("var version -> value after declaration: " + valueVar);
  }

  function tryLet() {
    try {
      print("let version -> value before declaration: " + valueLet);
    } catch (error) {
      print("let version -> accessing before declaration threw: " + error.message);
    }
    let valueLet = "assigned";
    print("let version -> value after declaration: " + valueLet);
  }

  function run() {
    setLog([]);
    tryVar();
    print("");
    tryLet();
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={run}>Run side-by-side comparison</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 120 }}>
        {log.length === 0 ? "// output appears here" : log.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
