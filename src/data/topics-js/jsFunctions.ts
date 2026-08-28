import type { Topic } from "../../types";

export const jsFunctionsTopic: Topic = {
  id: "js-functions",
  title: "JavaScript Functions",
  category: "Functions",
  shortExplanation: `A **function** is a reusable, named block of code that performs a task — define it once, then *call* it as many times as needed.

- A **function declaration** (\`function greet() {}\`) is hoisted and can be called before its definition line
- A **function expression** (\`const greet = function () {}\`) is stored in a variable and is *not* callable before that line runs
- **Parameters** are the named placeholders in the definition; **arguments** are the actual values passed in when calling
- \`return\` sends a value back to the caller and immediately ends the function`,
  longExplanation: `A function packages up a piece of logic under a name so it can be reused instead of retyped, and so a program can be organized into small, understandable pieces instead of one long block of code. Once defined, a function does nothing on its own — it only runs when it is *called* (or "invoked"), using its name followed by parentheses: \`greet()\`.

- There are two everyday ways to define one. A **function declaration** uses the \`function\` keyword followed by a name: \`function add(a, b) { return a + b; }\`. A **function expression** instead assigns an (often anonymous) function to a variable: \`const add = function (a, b) { return a + b; };\`. They behave almost identically when called, but differ in one important way covered by the hoisting topic: a function *declaration* can be called from code that appears above it in the file, because JavaScript hoists the entire function to the top of its scope before running anything. A function *expression* cannot — the variable holding it isn't assigned until that line actually executes, so calling it earlier throws an error
- **Parameters** are the named inputs listed in a function's definition — in \`function add(a, b)\`, \`a\` and \`b\` are parameters. **Arguments** are the concrete values supplied at the call site — in \`add(2, 3)\`, \`2\` and \`3\` are arguments. The distinction is small but the vocabulary matters: parameters are placeholders defined once, arguments are the real values plugged in on each call, and the same parameters can receive completely different arguments on every call
- The \`return\` statement sends a value back out of the function to wherever it was called, and it also **immediately stops** the function from running any further — any code written after a \`return\` inside the same execution path never runs. A function with no \`return\` statement (or a bare \`return;\` with nothing after it) implicitly returns \`undefined\` — this is easy to forget and a common source of "why is my variable undefined" bugs, usually traced back to a forgotten \`return\`
- Functions can take **any type of value** as an argument, including other functions, and can likewise **return** any type of value, including another function. This flexibility is what makes patterns like callbacks and closures possible later on
- Calling a function with the *same* logic and *different* arguments each time is the essence of reusability: rather than writing near-identical blocks of tax math, discount math, or greeting text three separate times with three sets of hardcoded numbers, one function parameterized by its inputs handles all three calls
- Beyond reuse, functions are the primary tool for **organizing** a program: breaking a large task into a handful of well-named functions (\`validateForm()\`, \`calculateTotal()\`, \`sendEmail()\`) makes the overall program's logic readable at a glance, and makes each piece independently testable and fixable without having to understand the whole program at once

Functions are arguably the single most important building block in JavaScript — nearly every other concept in this subject (scope, closures, callbacks, array methods, event handling) is built directly on top of what a function is and how calling one works.`,
  examples: [
    {
      id: "declaration-vs-expression",
      title: "Function declaration vs. function expression",
      summary: "A declaration can be called before its definition line; an expression cannot.",
      code: `function App() {
  const [log, setLog] = useState([]);

  function print(value) {
    setLog((prev) => [...prev, String(value)]);
  }

  function run() {
    setLog([]);

    print("Calling greetDeclaration() BEFORE its definition line:");
    print(greetDeclaration());

    function greetDeclaration() {
      return "Hello from a function declaration!";
    }

    print("");
    print("Calling greetExpression() AFTER its definition line:");
    const greetExpression = function () {
      return "Hello from a function expression!";
    };
    print(greetExpression());
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={run}>Run comparison</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 130 }}>
        {log.length === 0 ? "// output appears here" : log.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "parameters-vs-arguments",
      title: "Parameters vs. arguments",
      summary: "One function, called three times with different arguments plugged into the same parameters.",
      code: `function App() {
  const [a, setA] = useState(4);
  const [b, setB] = useState(7);

  function add(x, y) {
    return x + y;
  }

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <p>Function definition: <code>function add(x, y) {"{ return x + y; }"}</code></p>
      <label>
        First argument:{" "}
        <input type="number" value={a} onChange={(e) => setA(Number(e.target.value))} />
      </label>
      <label>
        Second argument:{" "}
        <input type="number" value={b} onChange={(e) => setB(Number(e.target.value))} />
      </label>
      <p>
        Call: <code>add({a}, {b})</code> &rarr; parameters x and y receive these arguments &rarr;
        result: <strong>{add(a, b)}</strong>
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "return-stops-execution",
      title: "return sends back a value and stops the function",
      summary: "Code written after a return statement in the same path never runs.",
      code: `function App() {
  const [age, setAge] = useState(15);
  const [log, setLog] = useState([]);

  function print(value) {
    setLog((prev) => [...prev, String(value)]);
  }

  function checkAge(years) {
    if (years < 18) {
      return "Not old enough to vote.";
    }
    print("This line only runs if the function did NOT already return above.");
    return "Old enough to vote!";
  }

  function run() {
    setLog([]);
    const result = checkAge(age);
    print("checkAge(" + age + ") returned: " + result);
  }

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <label>
        Age:{" "}
        <input type="number" value={age} onChange={(e) => setAge(Number(e.target.value))} />
      </label>
      <button onClick={run}>Run checkAge()</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 90 }}>
        {log.length === 0 ? "// output appears here" : log.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "no-return-is-undefined",
      title: "No return statement means undefined comes back",
      summary: "A function that only logs and never returns anything hands the caller undefined.",
      code: `function App() {
  const [log, setLog] = useState([]);

  function print(value) {
    setLog((prev) => [...prev, String(value)]);
  }

  function logGreeting(name) {
    print("Hello, " + name + "! (this function has no return statement)");
  }

  function run() {
    setLog([]);
    const result = logGreeting("Ada");
    print("The value returned by logGreeting(): " + result);
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={run}>Run demo</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 90 }}>
        {log.length === 0 ? "// output appears here" : log.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
