import type { Topic } from "../../types";

export const jsThisKeywordTopic: Topic = {
  id: "js-this-keyword",
  title: "JavaScript this Keyword",
  category: "Advanced Concepts",
  shortExplanation: `\`this\` isn't fixed by where a function is *defined* — it's determined by ==how the function is called==. The same method can have a completely different \`this\` depending on the call.

- Called as \`obj.method()\` → \`this\` is \`obj\`
- Called alone, as a plain function → \`this\` is \`undefined\` in strict mode (modules and classes are always strict)
- Arrow functions have no \`this\` of their own — they inherit it from the *enclosing* scope where they were defined`,
  longExplanation: `Unlike variables, which are scoped based on *where* they're written, \`this\` is determined dynamically, based on *how* the enclosing function was actually called — the exact same function body can produce a different \`this\` value on every single call. This is one of the most confusing parts of JavaScript for people coming from languages where \`this\`/\`self\` always refers to the instance a method was defined on.

There are a few clear patterns worth memorizing. **Method call**: when a function is called as a property of an object — \`user.greet()\` — \`this\` inside \`greet\` is set to \`user\`, the object right before the dot. **Plain function call**: when a function is called on its own, with no object before it — \`greet()\` — there's no object to bind to, so \`this\` is \`undefined\` in strict mode (and in every ES module and every class body, which are strict by default). **Constructor call**: calling a function with \`new\` (\`new User()\`) creates a fresh, brand-new object and sets \`this\` to point at it for the duration of that constructor call — this is the mechanism classes are built on.

The single most common real-world \`this\` bug is **losing \`this\`** by extracting a method away from its object before calling it. If \`user.greet\` is passed by itself into something else — as a callback to \`setTimeout\`, an event handler, or \`.then()\` — only the *function* travels, not the object it was attached to. By the time it's actually invoked, there's no \`obj.method()\` call shape left; it's called plain, and \`this\` inside it is \`undefined\`, not \`user\`. This is exactly why code like \`button.addEventListener('click', user.greet)\` or \`setTimeout(user.greet, 1000)\` so often breaks with a confusing "cannot read property of undefined" error — the method's \`this.name\` lookup fails because \`this\` isn't \`user\` anymore.

There are two standard fixes. The first is wrapping the call in an anonymous function so the method call shape is preserved at the actual moment of invocation: \`setTimeout(() => user.greet(), 1000)\` — by the time this arrow function runs, it performs a genuine \`user.greet()\` method call, so \`this\` resolves correctly. The second is \`.bind()\`: \`const boundGreet = user.greet.bind(user)\` returns a *new* function permanently locked to always use \`user\` as \`this\`, no matter how it's later called or passed around.

This connects directly to the **arrow function exception**: arrow functions never have their own \`this\` at all. Instead, they capture whatever \`this\` value was active in the surrounding scope at the moment they were *defined*, and keep using that forever, regardless of how the arrow function itself is later called. This makes arrow functions immune to the "losing this" problem described above, which is exactly why they're the default choice for callbacks inside a method body that need access to the *instance's* \`this\` — a regular \`function\` passed as that same callback would get its own, unrelated \`this\`, while an arrow function transparently reuses the method's.`,
  examples: [
    {
      id: "this-in-a-method-call",
      title: "this inside a method call",
      summary: "Calling obj.method() sets this to obj — the most common, straightforward case.",
      code: `function App() {
  const [log, setLog] = useState([]);

  function print(value) {
    setLog((prev) => [...prev, String(value)]);
  }

  function run() {
    setLog([]);
    const user = {
      name: "Ada",
      greet() {
        return "Hi, I'm " + this.name;
      },
    };
    print(user.greet());
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={run}>Call user.greet()</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 60 }}>
        {log.length === 0 ? "// output appears here" : log.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "losing-this-as-a-callback",
      title: "Losing this by extracting a method",
      summary: "Calling the exact same function alone, instead of as user.greet(), breaks this.",
      code: `function App() {
  const [log, setLog] = useState([]);

  function print(value) {
    setLog((prev) => [...prev, String(value)]);
  }

  function run() {
    setLog([]);
    const user = {
      name: "Ada",
      greet() {
        return "Hi, I'm " + this.name;
      },
    };
    print("user.greet(): " + user.greet());

    const extracted = user.greet;
    try {
      print("extracted() called alone: " + extracted());
    } catch (error) {
      print("extracted() threw: " + error.message);
    }
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={run}>Compare method call vs. extracted call</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 90 }}>
        {log.length === 0 ? "// output appears here" : log.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "fixing-with-arrow-or-bind",
      title: "Two fixes: an arrow wrapper, and .bind()",
      summary: "Both restore the correct this without changing what greet() actually does.",
      code: `function App() {
  const [log, setLog] = useState([]);

  function print(value) {
    setLog((prev) => [...prev, String(value)]);
  }

  function run() {
    setLog([]);
    const user = {
      name: "Ada",
      greet() {
        return "Hi, I'm " + this.name;
      },
    };

    const wrapped = () => user.greet();
    print("Arrow wrapper: " + wrapped());

    const bound = user.greet.bind(user);
    print("bind(): " + bound());
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={run}>Run both fixes</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 80 }}>
        {log.length === 0 ? "// output appears here" : log.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "arrow-function-inherits-enclosing-this",
      title: "Arrow functions inherit the enclosing this",
      summary: "A regular inner function gets its own this; an arrow inner function reuses the method's.",
      code: `function App() {
  const [log, setLog] = useState([]);

  function print(value) {
    setLog((prev) => [...prev, String(value)]);
  }

  function run() {
    setLog([]);
    const counter = {
      count: 0,
      regularIncrement: function () {
        return function () {
          this.count = (this.count || 0) + 1;
          return "regular inner function's this.count: " + this.count;
        };
      },
      arrowIncrement: function () {
        return () => {
          this.count = (this.count || 0) + 1;
          return "arrow inner function's this.count: " + this.count;
        };
      },
    };

    const regularInner = counter.regularIncrement();
    const arrowInner = counter.arrowIncrement();

    try {
      print(regularInner());
    } catch (error) {
      print("regular inner function threw: " + error.message);
    }
    print(arrowInner());
    print("counter.count is now: " + counter.count);
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={run}>Compare regular vs. arrow inner function</button>
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
