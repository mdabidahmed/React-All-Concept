import type { Topic } from "../../types";

export const jsArrowFunctionsTopic: Topic = {
  id: "js-arrow-functions",
  title: "JavaScript Arrow Functions",
  category: "Functions",
  shortExplanation: `**Arrow functions** (\`=>\`) are a shorter way to write a function expression, with one behavior that sets them apart from every other kind of function.

- \`(a, b) => a + b\` — a single expression is returned *implicitly*, no \`return\` keyword needed
- A single parameter can skip its parentheses: \`x => x * 2\`; zero parameters still need \`()\`
- **Arrow functions do not have their own \`this\`** — they inherit \`this\` from the surrounding (enclosing) scope
- Regular functions each get their *own* \`this\`, determined by *how* they're called — this is the important practical difference`,
  longExplanation: `Arrow functions, introduced in ES2015, are best known for their compact syntax, but the far more consequential difference is how they handle \`this\` — a detail that solves a real, common bug and is the actual reason to reach for one over a regular function in many situations.

- **Syntax**: \`const double = function (x) { return x * 2; };\` can be rewritten as \`const double = (x) => { return x * 2; };\`, or shortened further to \`const double = x => x * 2;\` when the body is a single expression — dropping both the \`{ }\` braces and the \`return\` keyword, since the expression's value is *implicitly* returned. A single parameter's parentheses are optional (\`x => ...\` or \`(x) => ...\` both work), but zero parameters or multiple parameters both require parentheses: \`() => 42\` and \`(a, b) => a + b\`
- One easy-to-miss detail: implicitly returning an *object literal* needs extra parentheses around it, because \`{ }\` after \`=>\` is otherwise read as the start of a function *body*, not an object: \`x => ({ value: x })\`, not \`x => { value: x }\` (the latter is actually a function body containing a label and an expression, and returns \`undefined\`)
- The far more important difference is **\`this\` binding**. A regular \`function\` gets its own \`this\`, and that \`this\` is determined *dynamically* by how the function is called — as a plain call, as an object method, with \`new\`, or via \`.call\`/\`.apply\`/\`.bind\` (covered in its own topic) — meaning the same function body can see a *different* \`this\` on different calls. An **arrow function has no \`this\` of its own at all** — when its body refers to \`this\`, JavaScript looks outward to whatever \`this\` was in the enclosing (lexical) scope at the moment the arrow function was *defined*, and that binding never changes no matter how the arrow function is later called
- This matters in a very concrete, common scenario: an object method that needs to set up a callback (like a \`setTimeout\`, or an event handler) which itself needs access to \`this\`. If that callback is written as a regular \`function\`, it gets its *own* \`this\` when it runs — usually \`undefined\` (in strict mode) or the global object, *not* the object the method was called on — silently breaking any \`this.something\` reference inside it. Writing that same callback as an **arrow function** instead makes it inherit \`this\` from the surrounding method, correctly pointing back at the object — no manual workaround (like the old \`const self = this;\` trick, or \`.bind(this)\`) needed
- Because of this same lexical behavior, arrow functions are a poor fit for defining **object methods themselves**: \`const obj = { name: "Ada", greet: () => "Hi, " + this.name }\` does *not* work as hoped, because the arrow function's \`this\` is inherited from *outside* the object literal (typically the module or global scope), not bound to \`obj\`. Regular functions remain the right choice for methods that need \`this\` to refer to the object they're called on
- A couple of smaller but real restrictions: arrow functions cannot be used as **constructors** (\`new MyArrow()\` throws an error), and they have no \`arguments\` object of their own — inside an arrow function, \`arguments\` (if used) refers to the enclosing regular function's, or is simply unavailable at the top level

The practical rule of thumb many teams follow: reach for arrow functions by default for short callbacks, array-method functions (\`.map\`, \`.filter\`, event handlers passed as props, etc.) precisely *because* they don't rebind \`this\`, and keep regular \`function\` syntax for object methods and anything that genuinely needs its own dynamic \`this\` or needs to work as a constructor.`,
  examples: [
    {
      id: "concise-syntax",
      title: "Concise syntax and implicit return",
      summary: "The same doubling function written three ways, from verbose to concise.",
      code: `function App() {
  const [n, setN] = useState(5);

  function doubleVerbose(x) {
    return x * 2;
  }
  const doubleBlockArrow = (x) => {
    return x * 2;
  };
  const doubleConcise = (x) => x * 2;

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <label>
        Number:{" "}
        <input type="number" value={n} onChange={(e) => setN(Number(e.target.value))} />
      </label>
      <p>Regular function: <code>function doubleVerbose(x) {"{ return x * 2; }"}</code> &rarr; <strong>{doubleVerbose(n)}</strong></p>
      <p>Arrow, block body: <code>(x) =&gt; {"{ return x * 2; }"}</code> &rarr; <strong>{doubleBlockArrow(n)}</strong></p>
      <p>Arrow, implicit return: <code>(x) =&gt; x * 2</code> &rarr; <strong>{doubleConcise(n)}</strong></p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "object-literal-return-gotcha",
      title: "Implicitly returning an object needs parentheses",
      summary: "x => { value: x } is parsed as a function body, not an object — wrap it in ( ) instead.",
      code: `function App() {
  const [log, setLog] = useState([]);

  function print(value) {
    setLog((prev) => [...prev, String(value)]);
  }

  const wrongAttempt = (x) => {
    value: x;
  };
  const correctVersion = (x) => ({ value: x });

  function run() {
    setLog([]);
    print("wrongAttempt(5) -> " + JSON.stringify(wrongAttempt(5)) + "  (treated as a labeled statement, returns undefined)");
    print("correctVersion(5) -> " + JSON.stringify(correctVersion(5)) + "  (parentheses make it an expression)");
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={run}>Run comparison</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 90 }}>
        {log.length === 0 ? "// output appears here" : log.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "this-in-regular-vs-arrow",
      title: "this in a regular function vs. an arrow function",
      summary: "A regular callback loses track of \"this\"; an arrow callback inherits it correctly.",
      code: `function App() {
  const [log, setLog] = useState([]);

  function print(value) {
    setLog((prev) => [...prev, String(value)]);
  }

  function run() {
    setLog([]);

    const counterBroken = {
      label: "Broken Counter",
      count: 0,
      incrementLater: function () {
        setTimeout(function () {
          // Regular function: its own "this" here is NOT counterBroken.
          print("Inside regular-function callback, this.label -> " + (this && this.label));
        }, 0);
      },
    };

    const counterFixed = {
      label: "Fixed Counter",
      count: 0,
      incrementLater: function () {
        setTimeout(() => {
          // Arrow function: inherits "this" from incrementLater, which IS counterFixed.
          print("Inside arrow-function callback, this.label -> " + this.label);
        }, 0);
      },
    };

    counterBroken.incrementLater();
    counterFixed.incrementLater();
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={run}>Run this-binding demo</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 90 }}>
        {log.length === 0 ? "// output appears here" : log.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "arrow-as-object-method-pitfall",
      title: "Why arrow functions make poor object methods",
      summary: "An arrow-function method can't reach the object's own properties via this.",
      code: `function App() {
  const [log, setLog] = useState([]);

  function print(value) {
    setLog((prev) => [...prev, String(value)]);
  }

  const personRegular = {
    name: "Grace",
    greet: function () {
      return "Hi, I'm " + this.name;
    },
  };

  const personArrow = {
    name: "Grace",
    greet: () => {
      return "Hi, I'm " + this.name;
    },
  };

  function run() {
    setLog([]);
    print("Regular-function method: " + personRegular.greet());
    print("Arrow-function method:   " + personArrow.greet() + "  (this.name isn't the object's name)");
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={run}>Run method comparison</button>
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
