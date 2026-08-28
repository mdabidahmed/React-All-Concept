import type { Topic } from "../../types";

export const jsEventLoopTopic: Topic = {
  id: "js-event-loop",
  title: "JavaScript Event Loop",
  category: "Asynchronous JavaScript",
  shortExplanation: `JavaScript runs on a ==single thread== — one line of code at a time, never two at once — yet it still manages timers, network responses, and click handlers without freezing. The **event loop** is the mechanism that makes that possible.

- The **call stack** tracks which function is currently running; JavaScript won't start anything new until the stack is empty
- Callbacks from \`setTimeout\`, promises, and events don't jump the queue — they wait until the current synchronous code has *completely* finished
- Even \`setTimeout(fn, 0)\` runs *after* any synchronous code below it — 0ms means "as soon as the stack is clear," not "immediately"`,
  longExplanation: `JavaScript is a **single-threaded** language: it has exactly one call stack, and can run only one piece of code at any given instant — never two functions truly simultaneously. This sounds like it should make responsive web pages impossible; a single slow operation ought to freeze everything else. The **event loop** is the mechanism that resolves that apparent contradiction, and understanding it clears up a lot of behavior that otherwise looks like magic (or like a bug).

The **call stack** is where JavaScript tracks what's currently executing — when a function is called, it's pushed onto the stack; when it returns, it's popped back off. Crucially, JavaScript will not start running anything new — not the next queued timer callback, not a promise's \`.then()\`, not the next click handler — until the call stack is completely empty. Synchronous code always runs to full completion first, no matter what else might be waiting.

So where does \`setTimeout\`'s delayed callback actually go while it's waiting? It isn't sitting on the call stack the whole time — that would block everything else for the entire delay. Instead, the browser itself (not the JavaScript engine) handles the actual waiting behind the scenes, and once the delay elapses, it places the callback into a **task queue** (sometimes called the macrotask queue), rather than running it immediately. The event loop's actual job, running continuously, is deceptively simple: check whether the call stack is empty, and if it is, take the next callback waiting in the queue and push it onto the stack to run. This one repeating check is the entire "event loop."

This explains a famous, easy-to-verify behavior: given \`console.log(1); setTimeout(() => console.log(2), 0); console.log(3);\`, the output is always \`1\`, \`3\`, \`2\` — never \`1\`, \`2\`, \`3\`. Even with a delay of \`0\` milliseconds, the \`setTimeout\` callback cannot run until the call stack is empty, and the call stack isn't empty until *after* the synchronous \`console.log(3)\` on the line below has already run. \`setTimeout(fn, 0)\` doesn't mean "run this immediately" — it means "run this as soon as possible *after* all currently-running synchronous code has finished," which is a meaningfully different guarantee.

There's one more layer worth knowing at a beginner level: alongside the (macro)task queue that \`setTimeout\` callbacks go into, there's a separate **microtask queue**, which is where resolved Promise \`.then()\`/\`.catch()\`/\`.finally()\` callbacks (and \`async\`/\`await\` continuations) go. The event loop always fully drains the *entire* microtask queue before picking even one callback off the regular task queue — meaning a Promise callback will reliably run before a \`setTimeout(fn, 0)\` callback, even if the \`setTimeout\` was scheduled first. This is a beginner-friendly simplification of a more detailed spec, but it's accurate enough to explain the ordering you'll actually observe, and it's why Promise-based code is sometimes described as generally "higher priority" than timer-based code.

None of this requires memorizing implementation details to use effectively day to day — but it's exactly why "asynchronous" in JavaScript never means "runs on another thread." Everything asynchronous in JavaScript still eventually executes on that same single call stack, one piece at a time; the event loop just controls *when* each queued piece gets its turn.`,
  examples: [
    {
      id: "classic-1-3-2-demo",
      title: "The classic 1, 3, 2 demonstration",
      summary: "setTimeout(fn, 0) still runs after the synchronous code below it.",
      code: `function App() {
  const [log, setLog] = useState([]);

  function print(value) {
    setLog((prev) => [...prev, String(value)]);
  }

  function run() {
    setLog([]);
    print("1. Synchronous, runs first");
    setTimeout(() => {
      print("3. Inside setTimeout(fn, 0) — runs last");
    }, 0);
    print("2. Synchronous, runs second (still before the timeout)");
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={run}>Run the classic 1, 3, 2 demo</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 90 }}>
        {log.length === 0 ? "// output appears here" : log.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "call-stack-blocks-everything",
      title: "A busy call stack delays even a shorter timeout",
      summary: "A 100ms timeout doesn't fire until a 1000ms synchronous busy loop finishes.",
      code: `function App() {
  const [log, setLog] = useState([]);

  function print(value) {
    setLog((prev) => [...prev, String(value)]);
  }

  function busyWaitMs(ms) {
    const start = Date.now();
    while (Date.now() - start < ms) {
      // deliberately blocking the single thread
    }
  }

  function run() {
    setLog([]);
    const startedAt = Date.now();
    print("Scheduling a setTimeout for 100ms...");
    setTimeout(() => {
      print("setTimeout callback finally ran at " + (Date.now() - startedAt) + "ms");
    }, 100);
    print("Now blocking the thread for 1000ms with a busy loop...");
    busyWaitMs(1000);
    print("Busy loop finished. The call stack is now empty.");
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={run}>Block the thread and watch the timeout wait</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 110 }}>
        {log.length === 0 ? "// output appears here" : log.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "microtask-vs-macrotask",
      title: "A Promise callback beats a 0ms setTimeout",
      summary: "The microtask queue is always fully drained before the next macrotask runs.",
      code: `function App() {
  const [log, setLog] = useState([]);

  function print(value) {
    setLog((prev) => [...prev, String(value)]);
  }

  function run() {
    setLog([]);
    print("1. Synchronous start");
    setTimeout(() => {
      print("4. setTimeout(fn, 0) callback (macrotask)");
    }, 0);
    Promise.resolve().then(() => {
      print("3. Promise .then() callback (microtask)");
    });
    print("2. Synchronous end");
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={run}>Compare a microtask vs. a macrotask</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 100 }}>
        {log.length === 0 ? "// output appears here" : log.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "multiple-timeouts-in-order",
      title: "Multiple timeouts fire by delay, not by scheduling order",
      summary: "Three timeouts are scheduled A, B, C, but fire in order of their actual delay.",
      code: `function App() {
  const [log, setLog] = useState([]);

  function print(value) {
    setLog((prev) => [...prev, String(value)]);
  }

  function run() {
    setLog([]);
    print("Start");
    setTimeout(() => print("Timeout A (100ms)"), 100);
    setTimeout(() => print("Timeout B (0ms)"), 0);
    setTimeout(() => print("Timeout C (50ms)"), 50);
    print("End of synchronous code");
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={run}>Queue three timeouts with different delays</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 120 }}>
        {log.length === 0 ? "// output appears here" : log.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
