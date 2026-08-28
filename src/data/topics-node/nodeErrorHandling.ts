import type { Topic } from "../../types";

export const nodeErrorHandlingTopic: Topic = {
  id: "node-error-handling",
  title: "Node.js Error Handling",
  category: "Databases & Advanced",
  shortExplanation: `Node.js code needs to handle errors from three different shapes of code, each slightly differently: plain synchronous code, \`await\`-ed asynchronous code, and older-style **error-first callbacks**.

- \`try { ... } catch (err) { ... }\` wraps synchronous code, and also works around \`await\`-ed code — a rejected Promise effectively becomes a \`throw\` at the \`await\` point
- **Error-first callbacks** (\`callback(err, data)\`) are Node's original async convention — the error is *never* caught by wrapping the outer call in \`try\`/\`catch\`; you must check the \`err\` parameter directly, inside the callback
- \`process.on("uncaughtException", ...)\` and \`process.on("unhandledRejection", ...)\` are **process-level, last-resort safety nets** — for logging a fatal error and shutting down cleanly, never a substitute for handling errors where they actually happen`,
  longExplanation: `Node.js code encounters errors in three distinct shapes, and conflating them is one of the most common sources of "why didn't my try/catch catch that?" confusion.

**Synchronous code** is the simplest case: a function that throws directly — \`JSON.parse\` on malformed input, accessing a property on \`undefined\`, a manual \`throw new Error(...)\` — is caught by a normal \`try { ... } catch (err) { ... }\` wrapped around the call, exactly like error handling in any JavaScript environment.

**\`await\`-ed asynchronous code** behaves the same way, which is exactly why \`async\`/\`await\` is easier to reason about than raw Promises or callbacks. When an \`await\`ed Promise **rejects**, that rejection is converted into a \`throw\` at the point of the \`await\` — so wrapping the \`await\` in the same kind of \`try\`/\`catch\` genuinely catches it: \`try { const data = await fetchSomething(); } catch (err) { ... }\`. The gotcha here isn't the syntax, it's forgetting to \`await\` at all — a Promise that's created but never awaited (and never given a \`.catch\`) can reject with nobody watching, which surfaces later as an *unhandled rejection*, covered further down.

**Error-first callbacks** are older, and behave completely differently from the two shapes above — this is the one most likely to genuinely surprise someone coming from Promise-based code. Node's original async convention (still used by some core APIs and older third-party packages) calls a callback function with the error as its *first* argument: \`doSomething(arg, (err, result) => { if (err) { ... } else { ... } });\`. Critically, **wrapping the call to \`doSomething\` in a \`try\`/\`catch\` does nothing** — the callback runs later, asynchronously, often after the surrounding \`try\`/\`catch\` block has already finished executing and exited. There is no exception traveling up a call stack for \`try\`/\`catch\` to intercept; the only way to know something went wrong is checking whether \`err\` is truthy, *inside* the callback itself, every single time.

**\`process.on("uncaughtException", handler)\`** fires when an error is thrown somewhere and genuinely nothing in the call stack ever caught it — the last point before Node would otherwise crash with an unformatted stack trace. **\`process.on("unhandledRejection", handler)\`** is the Promise equivalent: it fires when a Promise rejects and nothing ever attached a \`.catch\` (or an \`await\` of it was never wrapped in \`try\`/\`catch\`). Both exist purely as a **last line of defense** — a place to log what happened before the process goes down, not a place to build real application logic. Node's own documentation is explicit about \`uncaughtException\`: by the time it fires, the program may be in an unknown, inconsistent state (some cleanup may have run, some may not have), so the recommended response is to log the error and then exit the process deliberately, rather than trying to keep running as if nothing happened. In modern Node.js, an unhandled rejection that nothing catches at all will, by default, actually crash the process outright — a deliberate change from Node's early years, when unhandled rejections were silently swallowed and just logged a warning.

**Why not just rely on these global handlers for everything?** Because by the time an error reaches them, all the useful context is gone. If a web server's request handler fails, the specific request that failed, the specific response object waiting for an answer, and any specific cleanup that request needed are all out of reach from a single global handler — there's no way to send *that one client* a proper error response from way up there. Real error handling belongs close to where an operation can actually fail — inside each route handler, around each individual \`await\`, checking each individual callback's \`err\` — with the global handlers reserved purely as an emergency net for whatever slips through everything else.

Everything below runs genuinely — real \`try\`/\`catch\`, real rejected Promises, and a small \`fakeProcess\` object (since this sandbox has no real Node.js \`process\` global to attach to) whose \`.on(...)\` method is written to work exactly like the real thing, so the pattern transfers directly.`,
  examples: [
    {
      id: "try-catch-sync",
      title: "try/catch around synchronous code",
      summary: "JSON.parse throws on malformed input -- a plain try/catch handles it.",
      code: `function parseConfig(text) {
  try {
    return JSON.parse(text);
  } catch (err) {
    return { error: "Invalid JSON: " + err.message };
  }
}

function App() {
  const [output, setOutput] = useState(null);

  function parseValid() {
    setOutput(parseConfig("{\\"port\\": 3000}"));
  }
  function parseInvalid() {
    setOutput(parseConfig("{ this is not valid json "));
  }

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <button onClick={parseValid}>Parse valid JSON</button>
        <button onClick={parseInvalid}>Parse invalid JSON</button>
      </div>
      <p>{output ? JSON.stringify(output) : "// output appears here"}</p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "try-catch-await",
      title: "try/catch around an awaited async function",
      summary: "A rejected Promise, once awaited, is caught by try/catch exactly like a synchronous throw.",
      code: `function fetchUser(id) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      if (id === 404) {
        reject(new Error("User " + id + " not found"));
        return;
      }
      resolve({ id, name: "Ada Lovelace" });
    }, 300);
  });
}

function App() {
  const [output, setOutput] = useState("");

  async function run(id) {
    setOutput("Fetching user " + id + "...");
    try {
      const user = await fetchUser(id);
      setOutput("Success: " + JSON.stringify(user));
    } catch (err) {
      setOutput("Caught error: " + err.message);
    }
  }

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <button onClick={function () { run(1); }}>await fetchUser(1)</button>
        <button onClick={function () { run(404); }}>await fetchUser(404)</button>
      </div>
      <p>{output || "// output appears here"}</p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "error-first-callback-gotcha",
      title: "Gotcha: try/catch does not catch an error-first callback",
      summary: "The callback runs later -- the err parameter must be checked directly inside it.",
      code: `function readConfigFile(path, callback) {
  setTimeout(function () {
    if (path !== "config.json") {
      callback(new Error("ENOENT: no such file '" + path + "'"), null);
      return;
    }
    callback(null, { port: 3000 });
  }, 200);
}

function App() {
  const [wrongApproach, setWrongApproach] = useState("");
  const [rightApproach, setRightApproach] = useState("");

  function tryWrongApproach() {
    setWrongApproach("Running...");
    try {
      readConfigFile("missing.json", function (err, data) {
        // This runs LATER, after the try block below has already finished.
        // A throw here would NOT be caught by the try/catch around this call.
      });
      setWrongApproach("try block finished with no error -- but the callback hasn't even run yet!");
    } catch (err) {
      setWrongApproach("This will never run for a callback-delivered error.");
    }
  }

  function tryRightApproach() {
    setRightApproach("Running...");
    readConfigFile("missing.json", function (err, data) {
      if (err) {
        setRightApproach("Correctly caught via the err parameter: " + err.message);
        return;
      }
      setRightApproach("Config: " + JSON.stringify(data));
    });
  }

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <button onClick={tryWrongApproach}>Wrap the call in try/catch (doesn't work)</button>
        <button onClick={tryRightApproach}>Check the err parameter (correct)</button>
      </div>
      <p>Wrapped in try/catch: {wrongApproach || "-- click above --"}</p>
      <p>Checked err param: {rightApproach || "-- click above --"}</p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "process-level-safety-nets",
      title: "process.on('uncaughtException' / 'unhandledRejection') as a last resort",
      summary: "A simulated fakeProcess.on(...) -- for logging a fatal error and exiting, not everyday handling.",
      code: `// This sandbox has no real Node.js "process" global to attach to -- fakeProcess
// is written to behave exactly like it for this one purpose.
function createFakeProcess() {
  const listeners = {};
  return {
    on(eventName, handler) {
      listeners[eventName] = handler;
      return this;
    },
    // Stands in for an error that truly escaped every other try/catch:
    simulateUncaughtException(err) {
      if (listeners.uncaughtException) listeners.uncaughtException(err);
    },
    simulateUnhandledRejection(reason) {
      if (listeners.unhandledRejection) listeners.unhandledRejection(reason);
    },
  };
}

function App() {
  const [log, setLog] = useState([]);
  const [fakeProcess] = useState(function () {
    const p = createFakeProcess();
    p.on("uncaughtException", function (err) {
      print("[fatal] uncaughtException: " + err.message);
      print("Logging complete -- in real Node.js, the process should now exit deliberately.");
    });
    p.on("unhandledRejection", function (reason) {
      print("[fatal] unhandledRejection: " + reason);
      print("Modern Node.js versions crash the process by default for this, rather than only warning.");
    });
    return p;
  });

  function print(value) {
    setLog(function (prev) {
      return [...prev, value];
    });
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <button onClick={function () { fakeProcess.simulateUncaughtException(new Error("Something totally uncaught")); }}>
          Simulate an uncaught exception
        </button>
        <button onClick={function () { fakeProcess.simulateUnhandledRejection("a Promise rejected with no .catch"); }}>
          Simulate an unhandled rejection
        </button>
      </div>
      <div style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 90, fontFamily: "monospace", fontSize: 13, display: "grid", gap: 4 }}>
        {log.length === 0
          ? "// these are last-resort safety nets -- prefer catching errors where they happen"
          : log.map(function (line, i) {
              return <div key={i}>{line}</div>;
            })}
      </div>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
