import type { Topic } from "../../types";

export const jsClosuresTopic: Topic = {
  id: "js-closures",
  title: "JavaScript Closures",
  category: "Functions",
  shortExplanation: `A **closure** is a function that "remembers" the variables from the scope it was created in, even after that outer scope has finished running.

- Formed automatically any time a function is defined inside another function
- The inner function keeps ==access== to the outer function's variables
- Commonly used to create private state that can't be reached or modified from outside`,
  longExplanation: `Normally, a function's local variables disappear once the function finishes running — there's nothing left to reference them. A closure is what happens when an *inner* function, defined inside an outer function, is returned or otherwise kept alive after the outer function returns: JavaScript keeps the outer function's variables alive in memory, specifically because the inner function still references them.

- The classic example is a counter: an outer \`createCounter()\` function declares a local \`count\` variable and returns an inner function that increments and reads it. Each call to that returned function can see and modify the very same \`count\` — even though \`createCounter()\` itself finished executing long ago
- This gives closures their most common practical use: **private state**. There's no way to reach into the returned function and directly read or overwrite \`count\` from outside — the only way to interact with it is through the function(s) the closure exposes, similar in spirit to a private class field
- Calling the outer function again creates a **brand new** closure with its own independent copy of the variable — two counters created this way never share state, even though they were built from the same function
- A common gotcha closures explain: using \`var\` inside a loop to set up delayed callbacks (like several \`setTimeout\` calls) captures the *same* shared variable, so all callbacks tend to see its *final* value; switching the loop variable to \`let\` creates a fresh binding per iteration, so each closure captures its own value instead — this is one of the most common closure-related interview questions
- React hooks like \`useState\` are themselves built on closures — the setter function and the current value your component "remembers" between renders rely on this exact mechanism, so this concept quietly underlies most React code

Closures aren't a special syntax to opt into — they happen automatically any time a function is defined inside another and escapes it. Recognizing when that's happening is the real skill.`,
  examples: [
    {
      id: "counter-closure",
      title: "A private counter built with a closure",
      summary: "count can only be changed through the returned function — there's no other way to reach it.",
      code: `function createCounter() {
  let count = 0;
  return function () {
    count += 1;
    return count;
  };
}

function App() {
  const [counterFn] = useState(() => createCounter());
  const [value, setValue] = useState(0);

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <button onClick={() => setValue(counterFn())}>Increment via closure</button>
      <p>Current count: <strong>{value}</strong></p>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        "count" lives only inside createCounter's closure — nothing outside can read or set it directly.
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "independent-closures",
      title: "Two counters, two independent closures",
      summary: "Each call to createCounter() produces a fresh, isolated count variable.",
      code: `function createCounter() {
  let count = 0;
  return function () {
    count += 1;
    return count;
  };
}

function App() {
  const [counterA] = useState(() => createCounter());
  const [counterB] = useState(() => createCounter());
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);

  return (
    <div style={{ display: "flex", gap: 20 }}>
      <div style={{ display: "grid", gap: 8, justifyItems: "start" }}>
        <button onClick={() => setA(counterA())}>Increment A</button>
        <p>Counter A: <strong>{a}</strong></p>
      </div>
      <div style={{ display: "grid", gap: 8, justifyItems: "start" }}>
        <button onClick={() => setB(counterB())}>Increment B</button>
        <p>Counter B: <strong>{b}</strong></p>
      </div>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "var-vs-let-in-loop",
      title: "The classic var-in-a-loop closure gotcha",
      summary: "var shares one binding across all callbacks; let gives each iteration its own.",
      code: `function App() {
  const [log, setLog] = useState([]);

  function print(value) {
    setLog((prev) => [...prev, value]);
  }

  function runWithVar() {
    setLog([]);
    for (var i = 1; i <= 3; i++) {
      setTimeout(() => print("var callback sees i = " + i), i * 100);
    }
  }

  function runWithLet() {
    setLog([]);
    for (let i = 1; i <= 3; i++) {
      setTimeout(() => print("let callback sees i = " + i), i * 100);
    }
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={runWithVar}>Run with var</button>
        <button onClick={runWithLet}>Run with let</button>
      </div>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 90 }}>
        {log.length === 0 ? "// click a button above" : log.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "closure-remembers-argument",
      title: "A closure remembering a function argument",
      summary: "A greeting-maker factory: each returned function permanently remembers its own \"name\" argument.",
      code: `function makeGreeter(name) {
  return function () {
    return "Hello, " + name + "!";
  };
}

function App() {
  const [greetAda] = useState(() => makeGreeter("Ada"));
  const [greetGrace] = useState(() => makeGreeter("Grace"));
  const [messages, setMessages] = useState([]);

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={() => setMessages((m) => [...m, greetAda()])}>Greet Ada</button>
        <button onClick={() => setMessages((m) => [...m, greetGrace()])}>Greet Grace</button>
      </div>
      <ul>
        {messages.map((m, i) => (
          <li key={i}>{m}</li>
        ))}
      </ul>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
