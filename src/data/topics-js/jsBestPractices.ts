import type { Topic } from "../../types";

export const jsBestPracticesTopic: Topic = {
  id: "js-best-practices",
  title: "JavaScript Best Practices",
  category: "Browser & Modern JS",
  shortExplanation: `Good JavaScript isn't about clever tricks — it's about writing code that's easy to read, hard to accidentally break, and predictable to reason about. A handful of small habits go a long way.

- Default to \`const\`, reach for \`let\` only when a variable genuinely needs to be reassigned, and avoid \`var\` entirely
- Always use \`===\` / \`!==\` instead of \`==\` / \`!=\`, to avoid surprising type coercion
- Keep functions small and focused on one job, use ==meaningful names== over comments explaining bad ones, and avoid unnecessary global variables`,
  longExplanation: `None of the practices in this topic are exotic — they're small, consistently-applied habits that compound over time into code that's dramatically easier for anyone (including your future self) to read, trust, and safely change.

**Default to \`const\`.** Reach for \`const\` for every variable unless you have a concrete reason it needs to be reassigned later, in which case use \`let\`. This isn't just stylistic: a codebase full of \`const\` declarations tells a reader, at a glance, exactly which values are ever going to change and which are locked in for good — that signal disappears the moment everything is declared with a reassignable \`let\` "just in case." \`var\` should be avoided entirely in modern code; it doesn't respect block scope the way \`let\`/\`const\` do, which causes exactly the kind of subtle bugs (a variable "leaking" out of an \`if\` block or a loop) that \`let\`/\`const\` were introduced specifically to prevent.

**Use meaningful names.** A variable named \`data\`, \`temp\`, \`x\`, or \`arr\` forces every future reader (again, quite often your own future self) to trace back through the code to figure out what it actually represents. A name like \`filteredOrders\` or \`userEmail\` documents the value's purpose permanently, right at the point of use, with zero extra effort and no comment required. Good naming is one of the highest-leverage habits in programming precisely because it's free — it costs nothing at runtime and saves real time on every future read.

**Avoid unnecessary global variables.** A variable declared in the global scope can be read — and overwritten — from literally anywhere else in the program, including code that has nothing conceptually to do with it. This makes bugs caused by global state notoriously hard to trace, since the value could have been changed by any of dozens of unrelated places. Keeping variables scoped as narrowly as possible (inside the function or module that actually needs them) keeps their possible causes of change small and traceable.

**Use \`===\` and \`!==\`, not \`==\` and \`!=\`.** The loose equality operators perform type coercion before comparing, producing famously surprising results (\`"" == 0\` is \`true\`; \`null == undefined\` is \`true\`; \`"0" == false\` is \`true\`). Strict equality skips coercion entirely and only ever considers two values equal if they're already the same type *and* value — dramatically more predictable, and the near-universal default in modern style guides.

**Keep functions small and focused.** A function that does one clearly-named job is easier to test, easier to reuse elsewhere, and easier to reason about than one that quietly does five unrelated things in sequence. If a function's name needs the word "and" to describe what it does, it's usually a sign to split it into two.

A few specific mistakes trip up beginners constantly enough to call out directly. **Forgetting to \`return\` a value** from a function is an easy typo to make and a confusing one to debug, since the function "works" (no error) but silently produces \`undefined\` everywhere its result is used. **Off-by-one loop errors** — using \`<=\` instead of \`<\` (or vice versa) against an array's \`.length\`, or starting a loop counter at \`1\` instead of \`0\` — routinely cause a loop to run one iteration too many or too few. And **mutating a value directly instead of creating a new copy** — pushing straight into an array or reassigning a property on an object you were handed, rather than building a new array or object — causes bugs that are especially painful in React, where state updates are only detected when they produce a genuinely new reference; mutating an array in place and then re-passing the same reference into a state setter typically doesn't even trigger a re-render, while spreading it into a brand-new array does, correctly.`,
  examples: [
    {
      id: "const-vs-var-scoping",
      title: "var leaks across a loop; let doesn't",
      summary: "The classic setTimeout-in-a-loop bug, and why let fixes it.",
      code: `function App() {
  const [log, setLog] = useState([]);

  function print(value) {
    setLog((prev) => [...prev, String(value)]);
  }

  function run() {
    setLog([]);
    print("--- using var (shared scope) ---");
    for (var i = 0; i < 3; i++) {
      setTimeout(function () {
        print("var i is now: " + i);
      }, 100);
    }

    print("--- using let (new scope per iteration) ---");
    for (let j = 0; j < 3; j++) {
      setTimeout(function () {
        print("let j is now: " + j);
      }, 200);
    }
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={run}>Compare var vs. let inside a loop</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 160 }}>
        {log.length === 0 ? "// output appears here, after a short delay" : log.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "strict-vs-loose-equality",
      title: "== vs. === on the same values",
      summary: "Loose equality's type coercion produces several famously surprising results.",
      code: `function App() {
  const [log, setLog] = useState([]);

  function print(value) {
    setLog((prev) => [...prev, String(value)]);
  }

  function run() {
    setLog([]);
    print("'' == 0: " + ("" == 0) + "   |   '' === 0: " + ("" === 0));
    print("null == undefined: " + (null == undefined) + "   |   null === undefined: " + (null === undefined));
    print("'0' == false: " + ("0" == false) + "   |   '0' === false: " + ("0" === false));
    print("1 == '1': " + (1 == "1") + "   |   1 === '1': " + (1 === "1"));
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={run}>Compare == vs ===</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 110 }}>
        {log.length === 0 ? "// output appears here" : log.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "forgetting-to-return",
      title: "Forgetting to return a value",
      summary: "The function runs without error, but silently produces undefined everywhere it's used.",
      code: `function App() {
  const [log, setLog] = useState([]);

  function print(value) {
    setLog((prev) => [...prev, String(value)]);
  }

  function addBroken(a, b) {
    const sum = a + b;
    // forgot to return sum!
  }

  function addFixed(a, b) {
    const sum = a + b;
    return sum;
  }

  function run() {
    setLog([]);
    print("addBroken(2, 3): " + addBroken(2, 3));
    print("addFixed(2, 3): " + addFixed(2, 3));
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={run}>Compare a function missing return vs. fixed</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 80 }}>
        {log.length === 0 ? "// output appears here" : log.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "mutating-vs-copying-array",
      title: "Mutating state directly vs. copying it",
      summary: "A React-relevant before/after: the mutated version can silently fail to re-render.",
      code: `function App() {
  const [items, setItems] = useState(["Apple", "Banana"]);
  const [log, setLog] = useState([]);

  function print(value) {
    setLog((prev) => [...prev, value]);
  }

  function addBadly() {
    items.push("Cherry (mutated in place)");
    setItems(items);
    print("Mutated the array directly and called setItems(items) — same reference, React may not re-render.");
  }

  function addProperly() {
    setItems([...items, "Cherry (added immutably)"]);
    print("Created a new array with [...items, newItem] — a genuinely new reference, so React re-renders.");
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={addBadly}>Add by mutating (bad)</button>
        <button onClick={addProperly}>Add by copying (good)</button>
      </div>
      <p>Items: {items.join(", ")}</p>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 70 }}>
        {log.length === 0 ? "// click a button above" : log.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
