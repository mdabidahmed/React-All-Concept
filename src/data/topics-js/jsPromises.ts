import type { Topic } from "../../types";

export const jsPromisesTopic: Topic = {
  id: "js-promises",
  title: "JavaScript Promises",
  category: "Asynchronous JavaScript",
  shortExplanation: `A **Promise** represents a value that isn't ready yet, but will be — eventually, either successfully (\`resolve\`) or with an error (\`reject\`).

- Three states: \`pending\`, \`fulfilled\`, or \`rejected\`
- \`.then()\` runs when it resolves, \`.catch()\` runs when it rejects, \`.finally()\` runs either way
- Promises can be **chained** — each \`.then()\` returns a new promise`,
  longExplanation: `Before Promises, asynchronous JavaScript (waiting for a timer, a network request, a file to load) relied on passing callback functions directly into async operations — which worked, but nesting several of them quickly became hard to read ("callback hell"). A Promise is an object that represents a value that will exist *in the future*, giving async code a much more manageable, chainable shape.

- A Promise starts in the \`pending\` state. It eventually settles into either \`fulfilled\` (via calling \`resolve(value)\` inside it) or \`rejected\` (via calling \`reject(error)\`) — once settled, it can never change state again
- \`.then(onFulfilled, onRejected)\` registers what should happen once the promise resolves; \`.catch(onRejected)\` is shorthand for handling just the rejection case; \`.finally(fn)\` runs regardless of whether it resolved or rejected — useful for cleanup like hiding a loading spinner
- **Chaining** is what makes Promises powerful: each \`.then()\` returns a *new* promise, so you can chain multiple async steps in sequence, each one waiting for the previous step to finish, without nesting callbacks inside callbacks
- \`Promise.all([p1, p2, p3])\` waits for **every** promise in the array to resolve (or rejects immediately if any one of them rejects) — useful for running several independent async operations in parallel and waiting for them all
- \`Promise.race([p1, p2])\` settles as soon as the **first** promise settles, whichever that is — useful for timeout patterns
- \`async\`/\`await\` (a separate topic) is built directly on top of Promises — it's just a different, more linear-looking *syntax* for working with the exact same underlying Promise objects

This sandbox has no real network or file system, so these examples use \`setTimeout\` to simulate the delay a real async operation (like a network request) would have — the Promise mechanics themselves (states, chaining, \`.then\`/\`.catch\`) are exactly what a genuine \`fetch()\` call would use.`,
  examples: [
    {
      id: "basic-promise-resolve",
      title: "A promise that resolves after a delay",
      summary: "setTimeout stands in for a real async operation like a network request.",
      code: `function fetchUserName() {
  return new Promise((resolve) => {
    setTimeout(() => resolve("Ada Lovelace"), 800);
  });
}

function App() {
  const [status, setStatus] = useState("idle");
  const [name, setName] = useState(null);

  function run() {
    setStatus("pending");
    fetchUserName().then((result) => {
      setName(result);
      setStatus("fulfilled");
    });
  }

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <button onClick={run} disabled={status === "pending"}>
        {status === "pending" ? "Loading..." : "Fetch user"}
      </button>
      <p>Status: <strong>{status}</strong></p>
      {name && <p>Result: {name}</p>}
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "promise-chaining",
      title: "Chaining multiple async steps",
      summary: "Each .then() waits for the previous step, running three simulated steps in sequence.",
      code: `function step(label, ms) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(label), ms);
  });
}

function App() {
  const [log, setLog] = useState([]);

  function print(value) {
    setLog((prev) => [...prev, value]);
  }

  function run() {
    setLog([]);
    step("1. Fetched user", 400)
      .then((result) => {
        print(result);
        return step("2. Fetched user's posts", 400);
      })
      .then((result) => {
        print(result);
        return step("3. Fetched post comments", 400);
      })
      .then((result) => {
        print(result);
        print("Done!");
      });
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={run}>Run chained steps</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 110 }}>
        {log.length === 0 ? "// output appears here, one step at a time" : log.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "promise-reject-catch",
      title: "Handling rejection with .catch()",
      summary: "A promise that randomly succeeds or fails, showing resolve vs. reject and .finally().",
      code: `function riskyOperation() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const succeeded = Math.random() > 0.5;
      if (succeeded) resolve("Operation succeeded!");
      else reject(new Error("Operation failed."));
    }, 600);
  });
}

function App() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  function run() {
    setLoading(true);
    setMessage("");
    riskyOperation()
      .then((result) => setMessage("✓ " + result))
      .catch((error) => setMessage("✗ " + error.message))
      .finally(() => setLoading(false));
  }

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <button onClick={run} disabled={loading}>
        {loading ? "Running..." : "Run risky operation"}
      </button>
      {message && <p>{message}</p>}
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "promise-all-parallel",
      title: "Promise.all — waiting for several promises together",
      summary: "Three independent delays run in parallel; Promise.all resolves once all three finish.",
      code: `function loadResource(name, ms) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(name + " loaded"), ms);
  });
}

function App() {
  const [status, setStatus] = useState("idle");
  const [results, setResults] = useState([]);

  function run() {
    setStatus("pending");
    setResults([]);
    const start = Date.now();
    Promise.all([
      loadResource("Config", 300),
      loadResource("User profile", 700),
      loadResource("Notifications", 500),
    ]).then((all) => {
      setResults(all);
      setStatus("done in about " + Math.round((Date.now() - start) / 100) * 100 + "ms");
    });
  }

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <button onClick={run} disabled={status === "pending"}>
        {status === "pending" ? "Loading all..." : "Load all resources"}
      </button>
      <p>Status: {status}</p>
      <ul>
        {results.map((r) => (
          <li key={r}>{r}</li>
        ))}
      </ul>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        Notice it finishes around 700ms (the slowest one) — not 300 + 700 + 500ms — because all three run in parallel.
      </p>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
