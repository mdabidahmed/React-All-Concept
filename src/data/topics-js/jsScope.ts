import type { Topic } from "../../types";

export const jsScopeTopic: Topic = {
  id: "js-scope",
  title: "JavaScript Scope",
  category: "Functions",
  shortExplanation: `**Scope** determines where in your code a variable is visible and usable.

- **Global scope** — declared outside any function or block; reachable from *anywhere*
- **Function scope** — declared inside a function (including \`var\`); reachable only inside that function
- **Block scope** — \`let\`/\`const\` declared inside \`{ }\` (an \`if\`, a \`for\` loop, etc.); reachable only inside that block
- Nested scopes form a ==scope chain==: inner code can see outer variables, but never the reverse
- Keeping variables as local as possible (avoiding globals) prevents accidental name collisions and hard-to-trace bugs`,
  longExplanation: `Scope is the set of rules that determines which variables a given line of code is allowed to see and use. Every variable is declared *somewhere*, and that location determines its scope — the region of the program where referencing its name actually works.

- **Global scope** is the outermost level: a variable declared outside of any function or block (e.g. directly in a script file) becomes globally accessible — any function, anywhere in the program, can read and modify it. This sounds convenient, but it's actually the riskiest scope to use liberally: any part of a large program can accidentally overwrite a global variable's value, and two unrelated pieces of code that happen to choose the same global name will silently clash. This is why minimizing global variables is one of the most consistently repeated pieces of JavaScript advice — the fewer variables are globally reachable, the fewer ways one part of a program can accidentally break another
- **Function scope** means a variable declared inside a function — with \`var\`, \`let\`, \`const\`, or as a parameter — exists only *inside* that function and is invisible outside it. Every function call gets its own fresh scope, which is why calling the same function twice doesn't have the second call somehow see the first call's local variables. Notably, \`var\` is scoped to the nearest enclosing **function**, not the nearest block — a \`var\` declared inside an \`if\` block is still visible for the rest of that function, entirely outside the \`if\`
- **Block scope**, introduced with \`let\` and \`const\` (ES2015), is narrower: a variable declared inside *any* \`{ }\` block — an \`if\` statement, a \`for\`/\`while\` loop body, or even a bare standalone \`{ }\` — is only visible within that specific block, and disappears once the block ends. This is the behavior most developers coming from other languages already expect, and it's a major reason \`let\`/\`const\` are preferred over \`var\` today: block scoping keeps a variable's visible "lifetime" as short and predictable as possible, matching exactly the region of code where it's actually meant to be used
- Scopes can **nest**: a function defined inside another function, or a block inside a block, creates layers. JavaScript resolves a variable name by searching the **scope chain** — starting at the innermost scope where the code is running, and walking *outward* through each enclosing scope until it finds a matching declaration (or runs out of scopes and throws a \`ReferenceError\`). This search only ever goes **outward, never inward**: inner code can see and use outer variables, but outer code has no way to reach into an inner scope's local variables once that inner code has finished (this is also exactly the setup that makes closures possible, covered in its own topic)
- When an inner scope declares a variable with the **same name** as one in an outer scope, the inner declaration **shadows** the outer one — within the inner scope, references to that name resolve to the closer, inner variable, and the outer variable becomes temporarily unreachable by that name (though it's untouched, and reappears once the inner scope ends). Shadowing is sometimes intentional (a loop variable named \`i\` reused across sibling loops) but can also cause confusing bugs when it's accidental
- The practical payoff of understanding scope well is defensive: declaring variables in the **narrowest** scope that still gets the job done (a block, then a function, only reaching for a global as a last resort) means fewer names to keep track of at once, fewer accidental collisions between unrelated parts of a program, and a much easier time reasoning about where a given variable's value could possibly have come from or been changed

Scope is one of those foundational ideas that quietly explains a lot of downstream JavaScript behavior — from why \`var\` in a loop causes the classic closure bug, to why a function can't see another function's "private" local variables, to why global variables are considered risky in any codebase larger than a quick script.`,
  examples: [
    {
      id: "global-vs-function-scope",
      title: "Global scope vs. function scope",
      summary: "A global variable is visible everywhere; a function-local one is not.",
      code: `let globalMessage = "I'm visible everywhere";

function App() {
  const [log, setLog] = useState([]);

  function print(value) {
    setLog((prev) => [...prev, String(value)]);
  }

  function showScopes() {
    let localMessage = "I only exist inside showScopes()";
    print("Inside the function, globalMessage -> " + globalMessage);
    print("Inside the function, localMessage -> " + localMessage);
  }

  function run() {
    setLog([]);
    print("Outside any function, globalMessage -> " + globalMessage);
    showScopes();
    try {
      print("Outside the function, localMessage -> " + localMessage);
    } catch (error) {
      print("Trying to read localMessage out here throws: " + error.message);
    }
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={run}>Run scope demo</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 100 }}>
        {log.length === 0 ? "// output appears here" : log.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "var-vs-let-block-scope",
      title: "var leaks out of a block; let stays inside it",
      summary: "A var declared inside an if statement is visible after it — let is not.",
      code: `function App() {
  const [log, setLog] = useState([]);

  function print(value) {
    setLog((prev) => [...prev, String(value)]);
  }

  function run() {
    setLog([]);

    if (true) {
      var leaked = "I used var, and I leak out of this block";
      let contained = "I used let, and I stay inside this block";
      print("Inside the if-block, leaked -> " + leaked);
      print("Inside the if-block, contained -> " + contained);
    }

    print("Outside the if-block, leaked -> " + leaked);
    try {
      print("Outside the if-block, contained -> " + contained);
    } catch (error) {
      print("Trying to read 'contained' out here throws: " + error.message);
    }
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={run}>Run var vs let demo</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 110 }}>
        {log.length === 0 ? "// output appears here" : log.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "nested-scope-chain",
      title: "Nested scopes and the scope chain",
      summary: "An innermost function can see variables from every enclosing scope around it.",
      code: `function App() {
  const [log, setLog] = useState([]);

  function print(value) {
    setLog((prev) => [...prev, String(value)]);
  }

  function outer() {
    const outerVar = "from outer()";

    function middle() {
      const middleVar = "from middle()";

      function inner() {
        const innerVar = "from inner()";
        print("inner() can see innerVar: " + innerVar);
        print("inner() can see middleVar: " + middleVar);
        print("inner() can see outerVar: " + outerVar);
      }

      inner();
    }

    middle();
  }

  function run() {
    setLog([]);
    outer();
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={run}>Run scope-chain demo</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 90 }}>
        {log.length === 0 ? "// output appears here" : log.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "shadowing",
      title: "Shadowing: an inner variable hides an outer one",
      summary: "Declaring the same name in an inner scope temporarily hides the outer variable of that name.",
      code: `function App() {
  const [log, setLog] = useState([]);

  function print(value) {
    setLog((prev) => [...prev, String(value)]);
  }

  function run() {
    setLog([]);
    let color = "blue";
    print("Before the block, color -> " + color);

    {
      let color = "red";
      print("Inside the block, color -> " + color + "  (this is a DIFFERENT variable, shadowing the outer one)");
    }

    print("After the block, color -> " + color + "  (the outer variable was never touched)");
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={run}>Run shadowing demo</button>
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
