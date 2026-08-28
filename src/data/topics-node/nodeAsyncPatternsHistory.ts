import type { Topic } from "../../types";

export const nodeAsyncPatternsHistoryTopic: Topic = {
  id: "node-async-patterns-history",
  title: "Node.js Async Patterns: Callbacks to Promises",
  category: "Events & Streams",
  shortExplanation: `Node's original async style was the **error-first callback** — \`fn(args..., (err, result) => {...})\` — still used by some older core APIs; \`util.promisify()\` can wrap any such function into one that returns a Promise instead, and many modules now ship a built-in Promise-based variant (like \`fs/promises\` alongside \`fs\`).

- **Error-first callback**: the callback's first argument is always reserved for an error (or \`null\` if none), checked before touching the result
- \`util.promisify(fn)\` converts a callback-style function into a Promise-returning one automatically, as long as \`fn\` follows the error-first convention
- Modern built-in Promise variants (\`fs/promises\`, etc.) exist so new code rarely needs to reach for \`util.promisify()\` at all`,
  longExplanation: `Node.js is older than native Promises in JavaScript — Node shipped in 2009, and Promises didn't become a standard part of the language until ES2015 (\`async\`/\`await\` arrived even later, in ES2017). Because of this history, Node's foundational built-in modules (\`fs\`, \`dns\`, \`crypto\`, and many others) were designed around the one asynchronous tool that existed at the time: the plain callback function. Understanding *why* three different styles exist side by side in real Node.js code today means understanding this timeline.

- **The error-first callback convention.** Rather than every module inventing its own callback shape, Node standardized on one rule: a callback's first parameter is always reserved for an error (or \`null\`/\`undefined\` if the operation succeeded), and any actual result comes after it — \`fs.readFile(path, encoding, (err, data) => { ... })\`. Disciplined code checks \`err\` *before* touching \`data\`, every single time; skipping that check is one of the most common real bugs in callback-based Node code, since a failed operation's \`data\` argument is typically \`null\` or \`undefined\`
- **The pain point: "callback hell."** Once several async steps need to happen in sequence — read a file, then use its contents to make a network request, then write the response to another file — each step's callback nests inside the previous one's, producing code that drifts rightward with every additional step and becomes hard to read, hard to add error handling to consistently, and hard to reason about in general. This specific pain is what motivated Promises' widespread adoption in the JavaScript world generally, not just in Node
- **\`util.promisify(fn)\`**, from Node's built-in \`util\` module, is a bridge: given a function written in the error-first callback style, it returns a *new* function with the same underlying behavior that instead returns a Promise — resolving with the success value, or rejecting with the error. This works automatically because \`promisify\` can rely on the *convention*: it appends its own callback as the final argument, and translates that callback's \`(err, result)\` call into either a \`resolve(result)\` or a \`reject(err)\`. It only works cleanly, though, for functions that follow the standard convention exactly (a single result value, callback as the true last argument) — a callback-style function with unusual quirks (like passing back multiple success values) needs a custom \`promisify.custom\` implementation or manual wrapping
- **Modern code mostly doesn't need to promisify anything itself**, because Node's own core modules increasingly ship a **built-in Promise-based variant** directly — \`fs/promises\` (\`import { readFile } from "fs/promises"\`), \`dns/promises\`, and others — maintained by Node itself rather than hand-wrapped by application code. \`util.promisify\` remains genuinely useful today mainly for *older third-party libraries* that still only expose a callback API, or for older parts of Node's own API surface that predate a dedicated promises variant
- **All three styles can coexist in one codebase**, and often do, especially in projects with some legacy code. The important discipline is not to silently mix them at the *call site* — a callback-style function can't be \`await\`-ed directly (awaiting a function that doesn't return a Promise just gets you back whatever it actually returned, immediately, without waiting for the callback to ever fire), it first needs either \`util.promisify\` or a manual \`new Promise((resolve, reject) => { ... })\` wrapper around it

Since none of this depends on real disk or network access — it's purely about *which JavaScript shape* an asynchronous operation is expressed in — the examples below implement a small simulated "fetch a user" operation (with an artificial delay via \`setTimeout\`, standing in for a real database or network round-trip) in genuinely all three styles, so the exact same underlying operation can be compared side by side.`,
  examples: [
    {
      id: "callback-style",
      title: "The original style: error-first callbacks",
      summary: "fetchUser(id, callback) -- the callback's first argument is always the error, checked before anything else.",
      code: `// Simulates an operation that would really hit a database or network in Node.js.
function fetchUser(id, callback) {
  setTimeout(() => {
    if (id !== 1) {
      callback(new Error("No user with id " + id), null);
      return;
    }
    callback(null, { id: 1, name: "Ada Lovelace" });
  }, 500);
}

function App() {
  const [output, setOutput] = useState("");

  function run() {
    setOutput("Fetching...");
    fetchUser(1, (err, user) => {
      if (err) {
        setOutput("Error: " + err.message);
        return;
      }
      setOutput("Got user: " + user.name);
    });
  }

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <button onClick={run}>fetchUser(1, callback)</button>
      <p>{output || "// click to fetch"}</p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "promisify-wrapped",
      title: "util.promisify(): wrapping the same function",
      summary: "The exact same fetchUser, wrapped into a Promise-returning version -- no changes to fetchUser itself.",
      code: `function fetchUser(id, callback) {
  setTimeout(() => {
    if (id !== 1) {
      callback(new Error("No user with id " + id), null);
      return;
    }
    callback(null, { id: 1, name: "Ada Lovelace" });
  }, 500);
}

// A simplified reimplementation of Node's real util.promisify().
function promisify(callbackStyleFn) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      callbackStyleFn(...args, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  };
}

const fetchUserPromise = promisify(fetchUser);

function App() {
  const [output, setOutput] = useState("");

  async function run() {
    setOutput("Fetching...");
    try {
      const user = await fetchUserPromise(1);
      setOutput("Got user: " + user.name);
    } catch (err) {
      setOutput("Error: " + err.message);
    }
  }

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <button onClick={run}>await fetchUserPromise(1)</button>
      <p>{output || "// click to fetch"}</p>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        Real Node.js: const fetchUserPromise = util.promisify(fetchUser);
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "native-promise-style",
      title: "The modern way: a native Promise-based version",
      summary: "Written to return a Promise directly, the way fs/promises ships its own APIs -- no wrapping needed at all.",
      code: `// The same operation, written natively as a Promise -- this is the "fs/promises" style:
// a dedicated implementation, not a wrapped callback version.
function fetchUserAsync(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id !== 1) {
        reject(new Error("No user with id " + id));
        return;
      }
      resolve({ id: 1, name: "Ada Lovelace" });
    }, 500);
  });
}

function App() {
  const [output, setOutput] = useState("");

  async function run() {
    setOutput("Fetching...");
    try {
      const user = await fetchUserAsync(1);
      setOutput("Got user: " + user.name);
    } catch (err) {
      setOutput("Error: " + err.message);
    }
  }

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <button onClick={run}>await fetchUserAsync(1)</button>
      <p>{output || "// click to fetch"}</p>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        Real Node.js: import {"{"} readFile {"}"} from "fs/promises" ships APIs shaped exactly like this.
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "all-three-side-by-side",
      title: "All three styles, side by side",
      summary: "The exact same simulated fetch, performed as a callback, a promisified call, and a native Promise call.",
      code: `function fetchUser(id, callback) {
  setTimeout(() => {
    if (id !== 1) {
      callback(new Error("No user with id " + id), null);
      return;
    }
    callback(null, { id: 1, name: "Ada Lovelace" });
  }, 400);
}

function promisify(callbackStyleFn) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      callbackStyleFn(...args, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  };
}
const fetchUserPromisified = promisify(fetchUser);

function fetchUserAsync(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id !== 1) {
        reject(new Error("No user with id " + id));
        return;
      }
      resolve({ id: 1, name: "Ada Lovelace" });
    }, 400);
  });
}

function App() {
  const [log, setLog] = useState([]);

  function print(value) {
    setLog((prev) => [...prev, value]);
  }

  function runCallback() {
    print("[callback] fetching...");
    fetchUser(1, (err, user) => {
      print("[callback] result: " + (err ? err.message : user.name));
    });
  }

  async function runPromisified() {
    print("[promisify] fetching...");
    const user = await fetchUserPromisified(1);
    print("[promisify] result: " + user.name);
  }

  async function runNativePromise() {
    print("[fs/promises-style] fetching...");
    const user = await fetchUserAsync(1);
    print("[fs/promises-style] result: " + user.name);
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <button onClick={runCallback}>Callback style</button>
        <button onClick={runPromisified}>promisify()-wrapped</button>
        <button onClick={runNativePromise}>Native Promise style</button>
      </div>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 120 }}>
        {log.length === 0 ? "// try each style -- same operation, three shapes" : log.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
