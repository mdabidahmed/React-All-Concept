import type { Topic } from "../../types";

export const nodeNextTickImmediateTopic: Topic = {
  id: "node-nexttick-immediate",
  title: "Node.js process.nextTick and setImmediate",
  category: "OS & Process",
  shortExplanation: `Node.js schedules deferred work through several different queues, each with its own priority — \`process.nextTick(callback)\` jumps the line ahead of everything else, while \`setImmediate(callback)\` and \`setTimeout(callback, 0)\` wait for a later turn of the event loop.

- \`process.nextTick(callback)\` — runs before Node continues to *any* other phase of the event loop; the **highest-priority** way to defer work
- \`setImmediate(callback)\` — runs on the event loop's "check" phase, generally after I/O callbacks in the current iteration
- \`setTimeout(callback, 0)\` — scheduled as a timer; runs after nextTick and (usually) after setImmediate, even with a \`0\`ms delay
- Recursively calling \`process.nextTick\` without a stopping condition can **starve the event loop**, blocking timers and I/O from ever running`,
  longExplanation: `Node.js doesn't just have "synchronous code" and "asynchronous code" — it has several distinct queues for deferred work, each processed at a different, well-defined point in the event loop, and the order between them is not arbitrary. \`process.nextTick\` and \`setImmediate\` are two of the most commonly confused pieces of this picture, especially because both sound like they mean "as soon as possible."

**\`process.nextTick(callback)\`** is the highest-priority way to defer a function call in Node.js. Its callback runs *before* the event loop is allowed to continue to its next phase — after the currently executing operation finishes, but before Node moves on to processing timers, I/O callbacks, or anything else. In modern Node.js, the entire \`nextTick\` queue is drained first, ahead of even the Promise microtask queue. This makes it useful for a specific, narrow purpose: letting an API guarantee a callback is *always* asynchronous (never called synchronously in some code paths and asynchronously in others — a classic source of subtle bugs), by deferring it just barely into the future rather than scheduling it alongside ordinary I/O-bound work.

**\`setImmediate(callback)\`** schedules a callback to run during the event loop's "check" phase — conceptually, "once the current pass through the loop's I/O-handling phases is done, before starting over." A very common and easy-to-remember pattern: when \`setImmediate\` is called from *inside* an I/O callback (say, a file read that just finished), its callback is guaranteed to run before any \`setTimeout\` scheduled at the same moment, because the check phase for that iteration comes before timers get another look in. At the very top level of a script (not inside any I/O callback), though, the order between \`setImmediate\` and \`setTimeout(fn, 0)\` is **not guaranteed** — it can depend on things like how long the process took to start up.

**\`setTimeout(callback, 0)\`** places a callback on the timers queue with a minimum (not exact) delay — Node clamps very small delays up to at least 1ms internally. It runs later than \`process.nextTick\`, and, depending on context, often later than \`setImmediate\` too.

Putting the three together, from soonest to (typically) latest: **synchronous code finishes first**, then the entire \`process.nextTick\` queue drains, then Promise microtasks run, and only after all of that does the event loop move on to timers (\`setTimeout\`) and, later in the same iteration or the next one, \`setImmediate\`'s check phase. The exact relative order of \`setTimeout(fn, 0)\` versus \`setImmediate(fn)\` specifically is the one part of this that can vary by context — it's a well-known enough quirk that Node's own documentation calls it out directly.

**The real gotcha**: because \`process.nextTick\` callbacks run before the event loop is allowed to proceed at all, a callback that keeps calling \`process.nextTick\` on itself — recursively, without ever stopping — can **starve the entire event loop**. Timers never fire, incoming I/O is never handled, nothing else in the program runs, forever. This is a genuine, documented Node.js pitfall, and it's exactly why \`process.nextTick\` is meant for small, bounded, "just barely defer this" use cases, not general-purpose scheduling.

Since this sandbox runs inside a browser tab, there's no real \`process.nextTick\` or \`setImmediate\` to call at all — browsers only expose the microtask queue (\`Promise.resolve().then(...)\`) and the macrotask/timer queue (\`setTimeout\`). The examples below **simulate** \`process.nextTick\` with a resolved Promise's \`.then()\` (a genuine microtask, which does run before any timer, matching \`nextTick\`'s "runs soonest" behavior) and simulate both \`setImmediate\` and \`setTimeout(fn, 0)\` with real \`setTimeout\` calls. This reliably demonstrates the big, important idea — *nextTick-style work always beats timer-style work* — but it cannot faithfully reproduce every real Node.js edge case, like the exact \`setImmediate\`-vs-\`setTimeout\` ordering inside an I/O callback, since the browser has no equivalent phases to model that with.`,
  examples: [
    {
      id: "sync-code-runs-first",
      title: "Synchronous code always finishes before any deferred callback",
      summary: "Both the nextTick-style and setTimeout-style callbacks wait until all synchronous code is done.",
      code: `function App() {
  const [log, setLog] = useState([]);

  function print(value) {
    setLog((prev) => [...prev, value]);
  }

  function run() {
    setLog([]);
    print("1: synchronous line A");

    // Simulated process.nextTick -- a real microtask, closest browser equivalent:
    Promise.resolve().then(() => print("3: process.nextTick callback (simulated)"));

    // Simulated setTimeout(callback, 0):
    setTimeout(() => print("4: setTimeout(callback, 0)"), 0);

    print("2: synchronous line B");
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={run}>Run</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 100 }}>
        {log.length === 0 ? "// output appears here, in order" : log.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "nexttick-beats-scheduling-order",
      title: "process.nextTick runs first even when scheduled second",
      summary: "setTimeout is called before the nextTick-style callback in the code, but still logs after it.",
      code: `function App() {
  const [log, setLog] = useState([]);

  function print(value) {
    setLog((prev) => [...prev, value]);
  }

  function run() {
    setLog([]);

    // Scheduled FIRST in the code...
    setTimeout(() => print("setTimeout(callback, 0) ran"), 0);

    // ...but process.nextTick (simulated) still wins, despite being scheduled SECOND:
    Promise.resolve().then(() => print("process.nextTick(callback) ran (simulated)"));

    print("(both were just scheduled -- neither has run yet)");
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={run}>Run</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 90 }}>
        {log.length === 0 ? "// output appears here" : log.join("\\n")}
      </pre>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        nextTick's priority is about when it runs relative to the event loop, not the order it
        was called in.
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "setimmediate-vs-settimeout-approximation",
      title: "setImmediate vs setTimeout(0): a browser approximation",
      summary: "Browsers have no real setImmediate -- both are simulated here, with the real ordering nuance explained rather than demonstrated.",
      code: `function App() {
  const [log, setLog] = useState([]);

  function print(value) {
    setLog((prev) => [...prev, value]);
  }

  function run() {
    setLog([]);
    print("Both lines below are simulated with setTimeout(fn, 0) -- the browser has no");
    print("real setImmediate to compare against, so this can only approximate Node.js.");

    // Simulated setImmediate:
    setTimeout(() => print("setImmediate(callback) ran (simulated with setTimeout)"), 0);

    // Real setTimeout(fn, 0):
    setTimeout(() => print("setTimeout(callback, 0) ran"), 0);

    print("In real Node.js, inside an I/O callback, setImmediate is guaranteed to run");
    print("before a setTimeout(fn, 0) scheduled at the same moment. At the top level of a");
    print("script (not inside I/O), the order between the two is officially not guaranteed.");
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={run}>Run</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 140, whiteSpace: "pre-wrap" }}>
        {log.length === 0 ? "// output appears here" : log.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "gotcha-recursive-nexttick-starves-loop",
      title: "Gotcha: recursive process.nextTick can starve the event loop",
      summary: "A bounded demo of a real, documented Node.js pitfall -- unbounded recursion here would freeze everything.",
      code: `function App() {
  const [log, setLog] = useState([]);
  const [running, setRunning] = useState(false);

  function print(value) {
    setLog((prev) => [...prev, value]);
  }

  function run() {
    setLog([]);
    setRunning(true);

    // A real Node.js bug looks like this WITHOUT the "count < 5" stopping condition --
    // process.nextTick keeps re-scheduling itself, and since nextTick always runs before
    // the event loop is allowed to move on, timers and I/O never get a turn, forever.
    let count = 0;
    function starve() {
      count = count + 1;
      print("process.nextTick callback #" + count + " (simulated)");
      if (count < 5) {
        Promise.resolve().then(starve);
      } else {
        print("(stopped here -- a real unbounded version would never stop, and would");
        print("block every timer and I/O callback in the whole process indefinitely)");
        setRunning(false);
      }
    }
    Promise.resolve().then(starve);

    // This setTimeout would never fire at all while an unbounded starve() kept going:
    setTimeout(() => print("a normal setTimeout callback -- finally got a turn"), 0);
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={run} disabled={running}>Run (bounded to 5 recursive calls)</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 130 }}>
        {log.length === 0 ? "// output appears here" : log.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
