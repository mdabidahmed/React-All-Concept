import type { Topic } from "../../types";

export const nodeDebuggingTopic: Topic = {
  id: "node-debugging",
  title: "Node.js Debugging",
  category: "Databases & Advanced",
  shortExplanation: `Debugging Node.js code ranges from the simplest tool available (\`console.log\`) to a real, attachable debugger via \`node --inspect\`.

- \`node --inspect\` opens a debugging port that Chrome DevTools (\`chrome://inspect\`) or an editor's built-in debugger can attach to — real breakpoints, stepping through line by line, and inspecting live variable values
- \`console.log\`/\`console.error\` remain the fastest, lowest-setup way to check what's happening — \`console.error\` writes to a separate stream (\`stderr\`), which matters for filtering logs by severity
- Reading a **stack trace**: the top line is the error itself; each \`at functionName (file:line:column)\` line below it traces the call chain, innermost (where it happened) to outermost (how it got there)
- Two Node-specific bugs worth recognizing on sight: a **forgotten \`return\`** inside a \`.then()\` chain, and a Promise that rejects with **no \`.catch\`** anywhere — both can fail with little or no visible error at all`,
  longExplanation: `Debugging Node.js code isn't fundamentally different from debugging any JavaScript — the tools and the reasoning transfer directly, but a couple of things are specific enough to Node's server-side environment to be worth covering on their own.

**\`node --inspect\`** starts Node with a debugging protocol listening on a port (\`9229\` by default), which a real debugger can connect to over the network. Opening \`chrome://inspect\` in Chrome (or using an editor's built-in Node debugging integration, which typically wraps this same protocol) shows the running process as an attachable target — from there, a real debugger gives you everything \`console.log\` can't: setting actual breakpoints that pause execution mid-function, stepping through code one line at a time, inspecting every variable's live value at that exact paused moment, and walking the full call stack interactively. \`node --inspect-brk\` is a small but useful variant — it pauses execution on the very first line of the program, before anything else runs, which is what you want when the bug you're chasing happens during startup, before you'd have a chance to set a breakpoint manually.

**\`console.log\`/\`console.error\`** ("print debugging") stays enormously popular precisely because it needs zero setup — no debugger to attach, no breakpoints to place, just a line of code and immediate output. Its real limitation is that it only shows you what you explicitly decided to log in advance; a real debugger lets you inspect *anything*, live, without having predicted you'd need to see it. \`console.error\` specifically writes to \`stderr\` rather than \`stdout\` — a distinction that matters in production, where logging infrastructure commonly treats the two streams differently (routing errors to alerting, routing regular output to a general log).

**Reading a Node.js stack trace** is a skill worth being deliberate about. The very first line is the error's type and message (\`TypeError: Cannot read properties of undefined (reading 'name')\`). Every line below it, each starting with \`at\`, is one frame of the call stack — \`at getUserName (app.js:12:18)\`, \`at handleRequest (app.js:34:20)\`, and so on — read from the **top down**, meaning the *first* \`at\` line is where the error actually occurred, and each line after it is one level further out, showing how execution got there. Async code can make traces a little less linear-feeling, since an \`await\` genuinely pauses execution and resumes later — modern JavaScript engines do a reasonable job of stitching an "async stack trace" back together across those pauses, but it's still worth remembering that the frames above an \`await\` boundary describe *how the call was scheduled*, not a literal unbroken synchronous chain.

Two specific bugs are common enough in real Node.js code to call out directly. First: a **forgotten \`return\`** inside a \`.then()\` callback written with curly braces — \`.then(data => { transform(data); })\` silently discards whatever \`transform(data)\` produced, because a brace-bodied arrow function doesn't implicitly return anything; the *next* \`.then\` in the chain receives \`undefined\` instead of the transformed value, with no error at all, just quietly wrong data flowing downstream. Second: an **unhandled Promise rejection** — a rejected Promise with no \`.catch\` anywhere in its chain (and no \`await\` wrapped in \`try\`/\`catch\`) can appear to just... stop, with the operation never completing and no obvious error printed where you're looking, exactly the failure mode covered in the previous Error Handling topic.

This sandbox has no real terminal to run \`node --inspect\` from and no real Chrome DevTools to attach — that part of this topic stays conceptual, illustrated with a simulated "paused at a breakpoint" view using fixed sample data. The stack-trace and forgotten-\`return\`/unhandled-rejection examples, though, use genuinely real JavaScript — actual thrown errors with a real \`.stack\` property, and actual Promise chains — so what you see running is exactly how it behaves in real Node.js.`,
  examples: [
    {
      id: "inspect-conceptual",
      title: "What node --inspect gives you (conceptual)",
      summary: "This sandbox can't attach a real debugger -- this simulates what a paused breakpoint looks like.",
      code: `// Representative example -- this sandbox cannot open a real --inspect port
// or attach Chrome DevTools. This simulates what you'd see paused at a
// breakpoint set on the line: const total = price * quantity;

const fakePausedState = {
  file: "checkout.js",
  line: 14,
  variables: { price: 19.99, quantity: 3, discount: undefined },
  callStack: ["calculateTotal (checkout.js:14)", "handleCheckout (checkout.js:28)", "app.post callback (server.js:9)"],
};

function App() {
  const [revealed, setRevealed] = useState(false);

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <button onClick={function () { setRevealed(true); }}>
        Simulate hitting a breakpoint at checkout.js:14
      </button>
      {revealed && (
        <div style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, fontFamily: "monospace", fontSize: 13, display: "grid", gap: 4 }}>
          <div>Paused at {fakePausedState.file}:{fakePausedState.line}</div>
          <div>Variables: {JSON.stringify(fakePausedState.variables)}</div>
          <div>Call stack (innermost first):</div>
          {fakePausedState.callStack.map(function (frame, i) {
            return <div key={i}>&nbsp;&nbsp;{i + 1}. {frame}</div>;
          })}
        </div>
      )}
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        In real Node.js, "node --inspect app.js" then opening chrome://inspect gives you this exact view, live and interactive.
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "reading-a-stack-trace",
      title: "Reading a real stack trace",
      summary: "A genuinely nested call chain throws -- err.stack shows exactly how execution got there.",
      code: `function getUserName(user) {
  return user.profile.name; // throws if profile is missing
}

function formatGreeting(user) {
  return "Hello, " + getUserName(user) + "!";
}

function renderPage(user) {
  return formatGreeting(user);
}

function App() {
  const [stack, setStack] = useState([]);

  function run() {
    try {
      renderPage({}); // no .profile -- this will throw
    } catch (err) {
      setStack(err.stack.split("\\n"));
    }
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={run}>renderPage({"{"}{"}"}) -- trigger a real error</button>
      <div style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 90, fontFamily: "monospace", fontSize: 12, display: "grid", gap: 2 }}>
        {stack.length === 0
          ? "// click above to see a genuine err.stack"
          : stack.map(function (line, i) {
              return <div key={i}>{line}</div>;
            })}
      </div>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        The first line is the error; each "at ..." line below traces the call chain from where it happened outward.
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "forgotten-return-gotcha",
      title: "Gotcha: a forgotten return inside .then()",
      summary: "A brace-bodied arrow function doesn't implicitly return -- the next .then() silently gets undefined.",
      code: `function fetchNumber() {
  return Promise.resolve(21);
}

function App() {
  const [brokenResult, setBrokenResult] = useState(null);
  const [fixedResult, setFixedResult] = useState(null);

  function runBroken() {
    fetchNumber()
      .then(function (n) {
        n * 2; // Bug: computed, but never returned!
      })
      .then(function (doubled) {
        setBrokenResult(doubled);
      });
  }

  function runFixed() {
    fetchNumber()
      .then(function (n) {
        return n * 2; // Fixed: the value is passed along the chain.
      })
      .then(function (doubled) {
        setFixedResult(doubled);
      });
  }

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <button onClick={runBroken}>Run WITHOUT return (bug)</button>
        <button onClick={runFixed}>Run WITH return (fixed)</button>
      </div>
      <p>Without return: {brokenResult === null ? "-- click above --" : String(brokenResult)}</p>
      <p>With return: {fixedResult === null ? "-- click above --" : String(fixedResult)}</p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "unhandled-rejection-gotcha",
      title: "Gotcha: an unhandled rejection can fail silently",
      summary: "A rejected Promise with no .catch anywhere never resolves your code's flow -- it just goes quiet.",
      code: `function riskyOperation() {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      reject(new Error("The operation failed"));
    }, 300);
  });
}

function App() {
  const [unhandledStatus, setUnhandledStatus] = useState("");
  const [handledStatus, setHandledStatus] = useState("");

  function runUnhandled() {
    setUnhandledStatus("Running, with no .catch anywhere...");
    let resolved = false;
    riskyOperation().then(function () {
      resolved = true;
      setUnhandledStatus("This never runs -- the Promise rejected, it didn't resolve.");
    });
    // No .catch attached at all: the rejection has nowhere to go.
    setTimeout(function () {
      if (!resolved) {
        setUnhandledStatus(
          "Still nothing after 600ms. No error appeared in this UI at all -- only a console warning, easy to miss."
        );
      }
    }, 600);
  }

  function runHandled() {
    setHandledStatus("Running, with a .catch attached...");
    riskyOperation()
      .then(function () {
        setHandledStatus("Succeeded (unexpected).");
      })
      .catch(function (err) {
        setHandledStatus("Caught cleanly: " + err.message);
      });
  }

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <button onClick={runUnhandled}>Run with NO .catch (silent failure)</button>
        <button onClick={runHandled}>Run WITH .catch (handled)</button>
      </div>
      <p>No .catch: {unhandledStatus || "-- click above, then wait a moment --"}</p>
      <p>With .catch: {handledStatus || "-- click above --"}</p>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
