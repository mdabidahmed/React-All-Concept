import type { Topic } from "../../types";

export const nodeFsSyncVsAsyncTopic: Topic = {
  id: "node-fs-sync-vs-async",
  title: "Node.js Sync vs Async File Operations",
  category: "File System",
  shortExplanation: `Every \`fs\` operation comes in (at least) two flavors — **synchronous** (\`*Sync\`, blocking) and **asynchronous** (callback- or promise-based, non-blocking) — and picking the right one matters more than it might first appear.

- A **sync** call (\`readFileSync\`, \`writeFileSync\`, ...) doesn't return until the operation is fully done — during that time, the single JS thread can do *nothing* else
- An **async** call (\`readFile\`, \`writeFile\`, or their \`fs/promises\` equivalents) returns immediately and finishes later, letting other code run in the meantime
- In a server handling many users at once, one slow sync call ==blocks every other request==, not just the one that triggered it`,
  longExplanation: `Node.js runs your JavaScript on a single thread — there is no automatic parallelism, no separate thread per request. This single fact is the entire reason the *synchronous vs. asynchronous* distinction in \`fs\` (and most of Node's other I/O-related modules) matters so much: whatever the single thread is doing right now is the *only* thing happening, for every user and every operation the process is handling.

- A **synchronous** function like \`fs.readFileSync\` or \`fs.writeFileSync\` does not return until its operation has fully completed. If the operation takes 200ms, the thread is unavailable for those 200ms — no other code, no other pending request, no timer callback, nothing runs until it's done. This is called ==blocking==
- An **asynchronous** function like \`fs.readFile\` or \`fs.writeFile\` (or their \`fs/promises\` equivalents used with \`await\`) hands the actual I/O work off elsewhere (to \`libuv\`, the C++ library underneath Node) and returns *immediately*, letting the thread move on to other work. Only once the operation finishes does Node run the corresponding callback (or resolve the corresponding promise), fit in whenever the thread next has a free moment. This is ==non-blocking==
- **Why synchronous versions exist at all**: they're genuinely simpler to reason about — no callback, no promise, just a direct return value — and for a short-lived script or one-time startup task (reading a config file before a server even starts accepting requests, for instance), blocking briefly costs nothing because there's nothing else the process needs to be doing at that moment anyway
- **Why this becomes dangerous inside a server**: a web server built with Node.js is, by design, meant to handle *many* requests concurrently on that one thread, interleaving work between them while each waits on relatively slow I/O. If a request handler calls a \`*Sync\` function that takes even a few hundred milliseconds, *every other in-flight request* — for every other user connected to that server — is completely stuck waiting, even though their own work has nothing to do with the slow file. This is one of the most common real performance bugs in Node.js servers: an innocent-looking \`fs.readFileSync\` (or a synchronous cryptographic hash, or a large \`JSON.parse\`) sprinkled into a hot request path, quietly stalling the entire server for everyone else every time it runs
- **The practical rule of thumb**: reach for sync methods in top-level scripts, CLI tools, and one-time startup code where nothing else is competing for the thread; use async methods (ideally with \`fs/promises\` and \`async\`/\`await\`) for anything inside a request handler, an event listener, or any code that runs while the process needs to stay responsive to other things
- Async code takes more discipline to write correctly — it's easy to forget to wait for a result, or to mishandle an error inside a callback — which is exactly why the promise-based \`fs/promises\` API, combined with \`async\`/\`await\`, became the preferred modern style: it keeps the *non-blocking* behavior of callbacks while reading almost as linearly as synchronous code

The examples below can't call a real blocking system call from inside a browser tab, so the "sync" examples instead use a genuine tight \`while\` loop that spins for a fixed amount of time — this is a real, if artificial, way to occupy a browser's single JavaScript thread for that duration, producing the exact same practical symptom (everything else visibly freezes) that a real \`fs.readFileSync\` call causes in real Node.js. The "async" examples use a real \`setTimeout\`, which — just like real non-blocking I/O — never occupies the thread while "waiting."`,
  examples: [
    {
      id: "blocking-vs-nonblocking-counter",
      title: "Side by side: a counter that freezes, or doesn't",
      summary: "A background counter genuinely stalls during a real busy-wait, but keeps climbing during a real setTimeout.",
      code: `function App() {
  const [counter, setCounter] = useState(0);
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    const id = setInterval(() => {
      setCounter((c) => c + 1);
    }, 100);
    return () => clearInterval(id);
  }, []);

  function blockingRead() {
    setStatus("reading (blocking)...");
    const start = Date.now();
    // A real busy-wait loop: this genuinely occupies the JS thread for ~1.5s,
    // exactly like a real fs.readFileSync() would while the disk is slow.
    while (Date.now() - start < 1500) {
      // deliberately doing nothing but burning CPU time
    }
    setStatus("done reading (blocking)");
  }

  function asyncRead() {
    setStatus("reading (async)...");
    setTimeout(() => {
      setStatus("done reading (async)");
    }, 1500);
  }

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <p>Background counter (updates every 100ms): {counter}</p>
      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={blockingRead}>Run a blocking "readFileSync" (1.5s)</button>
        <button onClick={asyncRead}>Run an async "readFile" (1.5s)</button>
      </div>
      <p>{status}</p>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        Watch the counter freeze completely during the blocking read, but keep climbing during the
        async read — the single JS thread can't update React state and burn CPU in a loop at the same time.
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "execution-order",
      title: "Execution order: sync vs. async",
      summary: "Sync code runs top to bottom in order; async code lets later lines run before the callback fires.",
      code: `function App() {
  const [log, setLog] = useState([]);

  function print(value) {
    setLog((prev) => [...prev, value]);
  }

  function runSync() {
    setLog([]);
    print("1. Before readFileSync");
    print("2. readFileSync returns directly: 'file contents'");
    print("3. After readFileSync — this only runs once the read is fully done");
  }

  function runAsync() {
    setLog([]);
    print("1. Before readFile (async)");
    setTimeout(() => {
      print("3. readFile's callback finally runs: 'file contents'");
    }, 800);
    print("2. After readFile call — but the read isn't done yet!");
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={runSync}>Run sync order</button>
        <button onClick={runAsync}>Run async order</button>
      </div>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 90 }}>
        {log.length === 0 ? "// output appears here" : log.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "server-scenario",
      title: "Why this matters for a server: two requests",
      summary: "A slow sync read makes a second request wait; a slow async read never blocks it.",
      code: `const fakeDisk = { "big-report.csv": "large amount of data..." };

function readFileSync(path) {
  // Simulate the CPU time a real slow synchronous disk read would consume.
  const start = Date.now();
  while (Date.now() - start < 1200) {
    // busy-wait: the thread is genuinely stuck here
  }
  return fakeDisk[path];
}

function readFileAsync(path, callback) {
  setTimeout(() => {
    callback(fakeDisk[path]);
  }, 1200);
}

function App() {
  const [log, setLog] = useState([]);

  function print(value) {
    setLog((prev) => [...prev, value]);
  }

  function runSyncScenario() {
    setLog([]);
    print("Request A arrives: reading big-report.csv synchronously...");
    const data = readFileSync("big-report.csv");
    print("Request A finished reading (" + data.length + " chars).");
    print("Request B arrives: NOW it can finally be handled — it was stuck waiting the whole time.");
  }

  function runAsyncScenario() {
    setLog([]);
    print("Request A arrives: reading big-report.csv asynchronously...");
    readFileAsync("big-report.csv", (data) => {
      print("Request A's read finished in the background (" + data.length + " chars).");
    });
    print("Request B arrives: handled immediately — Request A's slow read never blocked it.");
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={runSyncScenario}>Simulate with readFileSync</button>
        <button onClick={runAsyncScenario}>Simulate with async readFile</button>
      </div>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 100 }}>
        {log.length === 0 ? "// output appears here" : log.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "code-shape-comparison",
      title: "Code shape: a direct return value vs. a callback",
      summary: "The same file read, once returning its value directly and once only inside a callback.",
      code: `const fakeDisk = { "notes.txt": "Buy milk" };

function readFileSync(path) {
  if (!(path in fakeDisk)) throw new Error("ENOENT: no such file '" + path + "'");
  return fakeDisk[path];
}

function readFile(path, callback) {
  setTimeout(() => {
    if (!(path in fakeDisk)) {
      callback(new Error("ENOENT: no such file '" + path + "'"), null);
      return;
    }
    callback(null, fakeDisk[path]);
  }, 300);
}

function App() {
  const [syncResult, setSyncResult] = useState("");
  const [asyncResult, setAsyncResult] = useState("");

  function runSync() {
    // Notice: the value comes back directly, right where it's called.
    const contents = readFileSync("notes.txt");
    setSyncResult(contents);
  }

  function runAsync() {
    setAsyncResult("waiting...");
    // Notice: the value only exists inside this callback, later.
    readFile("notes.txt", (err, contents) => {
      setAsyncResult(contents);
    });
  }

  return (
    <div style={{ display: "grid", gap: 16 }}>
      <div>
        <button onClick={runSync}>readFileSync("notes.txt")</button>
        <p>Result: {syncResult || "(not run yet)"}</p>
      </div>
      <div>
        <button onClick={runAsync}>readFile("notes.txt", callback)</button>
        <p>Result: {asyncResult || "(not run yet)"}</p>
      </div>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
