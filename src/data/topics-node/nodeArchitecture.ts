import type { Topic } from "../../types";

export const nodeArchitectureTopic: Topic = {
  id: "node-architecture",
  title: "Node.js Architecture",
  category: "Node.js Basics",
  shortExplanation: `Node.js is built from two main pieces: Google's **V8** engine, which compiles and runs your JavaScript, and **libuv**, a C++ library that provides the *event loop* and hands slow I/O work off so it never blocks your code.

- Your JavaScript itself always runs on ==a single thread==
- Slow work (reading a file, querying a database, a network request) is delegated to libuv, which can use the operating system or a background thread pool
- The **event loop** is what notices finished work and runs the matching callback, without ever pausing to "wait" in the meantime`,
  longExplanation: `Node.js is often described in one sentence — "JavaScript outside the browser" — but *how* it manages to run fast, concurrent, I/O-heavy programs on a single thread is really the more interesting story, and it comes down to two components working together.

- **V8** is the JavaScript engine originally built for Google Chrome. Its job is narrow but critical: take JavaScript source code, compile it (V8 uses a Just-In-Time compiler, turning JS into fast machine code on the fly rather than interpreting it line by line), and execute it. V8 has no idea what a file system or a network socket is — it only knows how to run JavaScript. Node.js embeds V8 and then *adds* everything else around it.
- **libuv** is a C++ library that Node.js is built on top of, and it's where the "everything else" lives. libuv provides the **event loop** — the mechanism that lets Node.js stay responsive — and it provides access to the underlying operating system for things V8 knows nothing about: opening files, making network connections, timers, and more. For I/O operations the OS can already do asynchronously (most networking, on most platforms), libuv asks the OS to notify it when the work is done. For operations that don't have a good asynchronous OS API (some file system calls, and CPU-heavy work like certain crypto and compression functions), libuv maintains a small **thread pool** (four threads, by default) to run that work in the background instead of on Node's main thread.
- **The event loop, conceptually**: your JavaScript always runs on one single main thread. When that code calls something asynchronous — \`fs.readFile\`, \`setTimeout\`, an HTTP request — Node hands the actual waiting off to libuv and immediately continues running the *next* line of your code, without pausing. libuv (using the OS or its thread pool) does the slow work in the background. Once it finishes, it doesn't run your callback immediately — it queues it. The event loop is constantly cycling, checking "has anything finished?", and when it finds completed work, it runs the corresponding callback on the main thread, one at a time. This is why Node code frequently finishes in a different order than it was *started* in: whichever asynchronous operation finishes first gets its callback run first, regardless of the order the calls were originally made.
- **Why this matters in practice**: a single Node.js process can have thousands of file reads, database queries, or network requests all "in flight" at once, because none of them occupy the main thread while they wait — the main thread is only ever busy for the brief moments it's actually *running* your JavaScript (starting a request, or handling a finished one). This is fundamentally different from a traditional threaded server model, where handling more concurrent connections usually means spinning up more threads, each consuming memory and CPU scheduling overhead even while idle.
- **The important caveat**: this model is excellent for I/O-bound work (waiting on disk, network, or a database) but does *not* help with CPU-bound work. A JavaScript loop that spends five real seconds computing something (like hashing a huge amount of data synchronously) still runs entirely on the single main thread and blocks *everything* else — no other callback, no other request, nothing — until it finishes. This is why long-running CPU-heavy computations in Node are typically broken into chunks, offloaded to libuv's thread pool via a built-in async API, or moved to a separate \`worker_thread\`, rather than run synchronously on the main thread.

This sandbox can't spin up real OS-level threads or a genuine libuv thread pool, so the examples below simulate the *timing and ordering* behavior of Node's architecture using \`setTimeout\` to stand in for "slow work happening somewhere else" — the actual mental model (non-blocking dispatch, out-of-order completion, and the very real difference between I/O-bound and CPU-bound work) transfers directly to real Node.js.`,
  examples: [
    {
      id: "out-of-order-completions",
      title: "Slow operations finish out of order",
      summary: "Three 'slow' operations are started in one order but complete in a different order — exactly like real I/O handled by libuv.",
      code: `function App() {
  const [log, setLog] = useState([]);

  function print(value) {
    setLog((prev) => [...prev, value]);
  }

  function run() {
    setLog([]);
    print("Started: database query (slow, ~800ms)");
    print("Started: read a small file (fast, ~200ms)");
    print("Started: network request (medium, ~500ms)");

    setTimeout(() => print("Finished: read a small file"), 200);
    setTimeout(() => print("Finished: network request"), 500);
    setTimeout(() => print("Finished: database query"), 800);
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={run}>Start all three operations</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 130 }}>
        {log.length === 0 ? "// output appears here" : log.join("\\n")}
      </pre>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        All three "start" lines print immediately (the main thread was never blocked). The finish order matches
        whichever operation actually completed first — the small file, then the network request, then the query.
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "thread-never-waits",
      title: "The main thread keeps going while work is delegated",
      summary: "A synchronous line printed right after starting an async operation runs before that operation's callback ever does.",
      code: `function App() {
  const [log, setLog] = useState([]);

  function print(value) {
    setLog((prev) => [...prev, value]);
  }

  function run() {
    setLog([]);
    print("1. Handing off a slow operation to libuv...");
    setTimeout(() => {
      print("3. libuv finished — the event loop now runs this callback.");
    }, 600);
    print("2. This line runs immediately — the main thread was free the entire time.");
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={run}>Run</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 90 }}>
        {log.length === 0 ? "// output appears here" : log.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "architecture-pieces",
      title: "What each piece is responsible for",
      summary: "A quick reference for which component does what inside Node.js.",
      code: `function App() {
  const pieces = [
    { name: "V8", job: "Compiles and executes your JavaScript. Has no idea what a file or a socket is." },
    { name: "libuv", job: "Provides the event loop, plus OS access for files, networking, timers, and a background thread pool for the rest." },
    { name: "Event loop", job: "Continuously checks for finished async work and runs the matching callback, one at a time, on the main thread." },
    { name: "Your JS code", job: "Always runs on a single thread — never in parallel with itself." },
  ];

  return (
    <table style={{ borderCollapse: "collapse", width: "100%" }}>
      <thead>
        <tr>
          <th style={{ textAlign: "left", borderBottom: "2px solid #374151", padding: 8 }}>Piece</th>
          <th style={{ textAlign: "left", borderBottom: "2px solid #374151", padding: 8 }}>Responsibility</th>
        </tr>
      </thead>
      <tbody>
        {pieces.map((p) => (
          <tr key={p.name}>
            <td style={{ padding: 8, borderBottom: "1px solid #374151", fontFamily: "monospace" }}>{p.name}</td>
            <td style={{ padding: 8, borderBottom: "1px solid #374151" }}>{p.job}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

render(<App />);`,
    },
    {
      id: "cpu-bound-still-blocks",
      title: "CPU-bound work still blocks everything",
      summary: "Unlike I/O, a heavy synchronous loop runs on the single main thread and freezes it until it's done.",
      code: `function App() {
  const [result, setResult] = useState("");
  const [scheduled, setScheduled] = useState(false);

  function scheduleReminder() {
    setScheduled(true);
    setTimeout(() => print2("A scheduled callback finally ran — see how late it was?"), 0);
  }

  function print2(value) {
    setResult((prev) => (prev ? prev + "\\n" + value : value));
  }

  function runHeavyLoop() {
    setResult("Running a heavy synchronous loop on the main thread...");
    // A CPU-bound loop — this is real work that genuinely occupies this thread.
    let total = 0;
    for (let i = 0; i < 3e8; i++) {
      total += i % 7;
    }
    print2("Heavy loop finished. total = " + total);
    print2("Only NOW can any pending callback (like the one below) finally run.");
  }

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={scheduleReminder}>1. Schedule a callback (setTimeout 0ms)</button>
        <button onClick={runHeavyLoop}>2. Immediately run a heavy CPU-bound loop</button>
      </div>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 90, width: "100%" }}>
        {result || "// click both buttons quickly, in order"}
      </pre>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        Even though the timer was scheduled for 0ms, its callback can't run until the main thread is free —
        proving CPU-bound work is fundamentally different from I/O-bound work in Node's model.
      </p>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
