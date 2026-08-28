import type { Topic } from "../../types";

export const jsAsyncAwaitTopic: Topic = {
  id: "js-async-await",
  title: "JavaScript Async/Await",
  category: "Asynchronous JavaScript",
  shortExplanation: `\`async\`/\`await\` is syntax that lets asynchronous, Promise-based code read almost like ordinary, top-to-bottom synchronous code — without actually blocking anything.

- Putting \`async\` in front of a function makes it *always* return a Promise, even if you just \`return\` a plain value inside it
- \`await\` pauses that function at that line until the awaited Promise settles — while paused, the rest of the page keeps running normally
- Wrap \`await\` in \`try\`/\`catch\` to handle a rejected promise, the direct equivalent of \`.catch()\``,
  longExplanation: `\`async\`/\`await\` is not a different way of doing asynchronous work — it's built directly on top of Promises (covered in the previous topic) and produces the exact same underlying behavior, just with dramatically more readable syntax. Any \`.then()\` chain can be rewritten using \`async\`/\`await\`, and the two are functionally interchangeable; \`await\` is really just a different way of writing "attach a \`.then()\` here and pause until it resolves."

Adding the \`async\` keyword in front of a function declaration changes one guaranteed thing about it: an \`async function\` **always** returns a Promise, no matter what happens inside it. If the function body does a plain \`return 42;\`, the function doesn't actually return the number \`42\` — it returns a Promise that immediately resolves *to* \`42\`. If the body throws an error, the function doesn't throw synchronously to its caller — it returns a Promise that immediately rejects with that error. This consistency is exactly what makes \`async\` functions safe to compose with other Promise-based code.

Inside an \`async\` function, the \`await\` keyword can be placed in front of any expression that produces a Promise. \`await somePromise\` pauses execution of *that specific function* at that exact line, and doesn't resume until \`somePromise\` settles — resuming with the resolved value if it fulfilled, or throwing if it rejected. The single most important thing to understand about this pause is what it does **not** do: it does not freeze the browser tab, block the UI, or stop any other code from running. Only the one \`async\` function is paused; everything else — button clicks, other functions, the rest of the page — keeps running completely normally while it waits. This is the core reason \`await\` is safe to use for a network request or a timer: it looks like it's "blocking," line by line, but under the hood it's exactly as non-blocking as the \`.then()\` chain it replaced.

The practical payoff shows up clearly when several async steps need to run one after another. A \`.then()\` chain becomes a flat, ordinary-looking sequence of statements: \`const r1 = await step1(); const r2 = await step2(r1); const r3 = await step3(r2);\`. Each line simply waits for the previous one before moving to the next, reading top-to-bottom exactly like synchronous code would, with no nesting and no \`.then()\` callbacks at all.

Error handling follows the same pattern shift. Where Promise chains use \`.catch()\`, \`async\`/\`await\` uses an ordinary \`try\`/\`catch\` block wrapped around one or more \`await\` expressions: if any awaited promise rejects, execution jumps straight to the \`catch\` block, exactly like a thrown synchronous error would. This means a single \`try\`/\`catch\` can cover several sequential \`await\` steps at once, rather than needing a separate \`.catch()\` handler chained after every individual step.

One thing \`async\`/\`await\`'s naturally sequential *look* can obscure: writing \`await step1(); await step2();\` runs those two steps one after another even if they don't actually depend on each other, which wastes time if they could run in parallel. When independent async operations don't need each other's results, \`Promise.all([step1(), step2()])\` awaited together still runs them concurrently — worth remembering, since the straight-line syntax makes it easy to accidentally serialize work that didn't need to be serial.`,
  examples: [
    {
      id: "async-function-always-returns-a-promise",
      title: "An async function always returns a Promise",
      summary: "Even a plain return value comes back wrapped in a Promise, immediately.",
      code: `function App() {
  const [log, setLog] = useState([]);

  function print(value) {
    setLog((prev) => [...prev, String(value)]);
  }

  async function getGreeting() {
    return "Hello from an async function!";
  }

  function run() {
    setLog([]);
    const result = getGreeting();
    print("typeof result (immediately): " + typeof result);
    print("result instanceof Promise: " + (result instanceof Promise));
    result.then((value) => print("Resolved value: " + value));
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={run}>Call an async function and inspect what it returns</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 100 }}>
        {log.length === 0 ? "// output appears here" : log.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "rewriting-then-chain-as-await",
      title: "A .then() chain rewritten as sequential awaits",
      summary: "Three async steps, reading top-to-bottom with no nested callbacks at all.",
      code: `function step(label, ms) {
  return new Promise((resolve) => setTimeout(() => resolve(label), ms));
}

function App() {
  const [log, setLog] = useState([]);

  function print(value) {
    setLog((prev) => [...prev, value]);
  }

  async function runSteps() {
    setLog([]);
    const a = await step("1. Fetched user", 400);
    print(a);
    const b = await step("2. Fetched user's posts", 400);
    print(b);
    const c = await step("3. Fetched post comments", 400);
    print(c);
    print("Done! Reads top-to-bottom, no .then() nesting.");
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={runSteps}>Run sequential awaits</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 110 }}>
        {log.length === 0 ? "// output appears here, one step at a time" : log.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "await-does-not-block-the-page",
      title: "await pauses one function, not the whole page",
      summary: "An independent tick counter keeps climbing while a separate async task is still awaiting.",
      code: `function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function App() {
  const [status, setStatus] = useState("idle");
  const [ticks, setTicks] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTicks((t) => t + 1), 300);
    return () => clearInterval(id);
  }, []);

  async function runSlowTask() {
    setStatus("waiting...");
    await delay(3000);
    setStatus("done!");
  }

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <button onClick={runSlowTask} disabled={status === "waiting..."}>
        Start a 3-second await
      </button>
      <p>Async task status: <strong>{status}</strong></p>
      <p>Independent tick counter (updates every 300ms): <strong>{ticks}</strong></p>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        Notice the tick counter keeps climbing while the task is "waiting..." — the await pauses only that one function, not the page.
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "error-handling-with-try-catch",
      title: "Error handling with try/catch around await",
      summary: "A rejected promise jumps straight to catch, exactly like a thrown synchronous error.",
      code: `function riskyStep() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const succeeded = Math.random() > 0.5;
      if (succeeded) resolve("Step succeeded!");
      else reject(new Error("Step failed."));
    }, 600);
  });
}

function App() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function run() {
    setLoading(true);
    setMessage("");
    try {
      const result = await riskyStep();
      setMessage("Success: " + result);
    } catch (error) {
      setMessage("Caught an error: " + error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <button onClick={run} disabled={loading}>
        {loading ? "Running..." : "Run risky async step"}
      </button>
      {message && <p>{message}</p>}
    </div>
  );
}

render(<App />);`,
    },
  ],
};
