import type { Topic } from "../../types";

export const nodePipingStreamsTopic: Topic = {
  id: "node-piping-streams",
  title: "Node.js Piping Streams",
  category: "Events & Streams",
  shortExplanation: `\`.pipe()\` connects a Readable stream directly to a Writable one — \`readableStream.pipe(writableStream)\` — automatically forwarding every chunk and finishing the writable stream once the readable one ends, without writing manual \`on("data")\`/\`on("end")\` wiring yourself.

- Handles **backpressure** automatically: if the writable side falls behind, \`pipe()\` pauses the readable side until the writable side catches up, so memory doesn't balloon with unconsumed data
- Returns the destination stream, so pipes can be **chained**: \`a.pipe(b).pipe(c)\`
- The classic real-world example: \`fs.createReadStream(file).pipe(response)\` streams a file straight to an HTTP client without ever holding the whole file in memory at once`,
  longExplanation: `The final example in the Streams Intro topic manually wired a readable stream to a writable one: an \`on("data")\` listener called \`.write()\`, and an \`on("end")\` listener called \`.end()\`. That pattern is common enough, and easy enough to get subtly wrong, that Node builds it in directly as \`readableStream.pipe(writableStream)\` — one call that does the same forwarding, plus a crucial piece the manual version left out entirely: **backpressure**.

- **What backpressure actually means.** A writable stream's \`.write(chunk)\` returns a boolean: \`true\` means "keep going, I have room," and \`false\` means "my internal buffer is full — please slow down." A readable stream, left unmanaged, might produce chunks faster than the destination can consume them (a fast local disk read piped to a slow network upload, for example) — without any throttling, the unconsumed chunks would pile up in memory, defeating the entire memory-saving point of using streams in the first place. \`pipe()\` watches \`.write()\`'s return value: the moment it sees \`false\`, it calls \`readable.pause()\` internally, halting new \`"data"\` events until the writable side emits a \`"drain"\` event (its signal that the buffer has emptied out enough to accept more), at which point \`pipe()\` calls \`readable.resume()\` to continue. None of this requires a single line of code from you — it's the main reason \`pipe()\` exists rather than everyone hand-rolling the \`on("data")\`/\`.write()\` wiring themselves
- **Chaining**: \`.pipe()\` returns the *destination* stream, which is why real code often chains multiple pipes together, e.g. \`fs.createReadStream("file.txt").pipe(zlib.createGzip()).pipe(fs.createWriteStream("file.txt.gz"))\` — reading a file, piping it through a gzip-compressing \`Transform\` stream, and piping the compressed output into a new file, with backpressure correctly propagating through every stage of the chain
- **The classic real example**: an HTTP server responding with a file's contents almost never uses \`fs.readFile\` followed by \`res.end(data)\`, because that loads the entire file into memory first. Instead, real Node.js code typically does \`fs.createReadStream(path).pipe(res)\` — the file streams directly into the HTTP response, chunk by chunk, keeping memory usage flat regardless of whether the file is 1 KB or 1 GB. \`process.stdin.pipe(process.stdout)\` is a smaller, frequently-cited toy example of the exact same mechanism, echoing terminal input straight back out
- **A well-known gotcha: \`pipe()\` does *not* forward \`"error"\` events.** If the readable side emits \`"error"\`, \`pipe()\` does not automatically pass that along to the writable side, and does not automatically call \`.end()\` on it either (older Node versions in particular do not clean this up for you; even in modern Node, relying on this without care remains a common bug source). The safe habit is to attach a dedicated \`.on("error", ...)\` handler to **each** stream involved in a pipe chain individually, rather than assuming an error on one side is somehow handled by the other
- **Why not always just pipe?** Piping is ideal when data can flow straight through with no per-chunk decision-making from your own code. When your code genuinely needs to inspect, buffer, or make choices based on the actual content of the data (not just transform it uniformly, which is what a \`Transform\` stream is for), manual \`on("data")\` handling — or, in modern code, iterating an async-iterable stream with a \`for await\` loop — remains the right tool

Because a real \`fs\` read stream or HTTP response object needs actual OS and network access this sandbox doesn't have, every example below reuses the \`EventEmitter\`-based fake readable/writable streams from the Streams Intro topic, extended with a genuine \`.pipe()\` method that implements the same forwarding-plus-backpressure logic described above. The mechanics shown — chunk forwarding, pausing on backpressure, resuming on drain, and errors *not* automatically crossing between streams — match real Node.js \`pipe()\` behavior; only the underlying "disk" and "network" are simulated.`,
  examples: [
    {
      id: "basic-pipe",
      title: "readable.pipe(writable): automatic forwarding",
      summary: "One call replaces manual on('data')/on('end') wiring, forwarding every chunk and finishing the writable at the end.",
      code: `class EventEmitter {
  constructor() {
    this.listeners = {};
  }
  on(eventName, callback) {
    if (!this.listeners[eventName]) this.listeners[eventName] = [];
    this.listeners[eventName].push(callback);
    return this;
  }
  emit(eventName, ...args) {
    if (!this.listeners[eventName]) return false;
    this.listeners[eventName].forEach((callback) => callback(...args));
    return true;
  }
}

class FakeReadable extends EventEmitter {
  constructor(chunks, intervalMs) {
    super();
    this.chunks = chunks;
    this.index = 0;
    this.paused = false;
    this.intervalMs = intervalMs || 350;
  }
  start() {
    this._scheduleNext();
  }
  _scheduleNext() {
    if (this.paused) return;
    setTimeout(() => this._pushNext(), this.intervalMs);
  }
  _pushNext() {
    if (this.paused) return;
    if (this.index >= this.chunks.length) {
      this.emit("end");
      return;
    }
    this.emit("data", this.chunks[this.index]);
    this.index += 1;
    this._scheduleNext();
  }
  pause() {
    this.paused = true;
  }
  resume() {
    if (!this.paused) return;
    this.paused = false;
    this._scheduleNext();
  }
  pipe(destination) {
    this.on("data", (chunk) => {
      const canContinue = destination.write(chunk);
      if (canContinue === false) this.pause();
    });
    this.on("end", () => destination.end());
    if (destination.on) destination.on("drain", () => this.resume());
    return destination;
  }
}

function App() {
  const [log, setLog] = useState([]);

  function run() {
    setLog([]);
    const readable = new FakeReadable(["Hello, ", "piped ", "stream!"]);
    const writable = {
      chunks: [],
      write(chunk) {
        this.chunks.push(chunk);
        setLog((prev) => [...prev, 'writable received: "' + chunk + '"']);
        return true;
      },
      end() {
        setLog((prev) => [...prev, "writable finished. Full text: " + this.chunks.join("")]);
      },
    };
    readable.pipe(writable);
    readable.start();
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={run}>readable.pipe(writable)</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 100 }}>
        {log.length === 0 ? "// output appears here" : log.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "backpressure-demo",
      title: "Backpressure: pipe() pausing the source",
      summary: "When write() returns false, pipe() pauses the readable until a 'drain' event says it's safe to continue.",
      code: `class EventEmitter {
  constructor() {
    this.listeners = {};
  }
  on(eventName, callback) {
    if (!this.listeners[eventName]) this.listeners[eventName] = [];
    this.listeners[eventName].push(callback);
    return this;
  }
  emit(eventName, ...args) {
    if (!this.listeners[eventName]) return false;
    this.listeners[eventName].forEach((callback) => callback(...args));
    return true;
  }
}

class FakeReadable extends EventEmitter {
  constructor(chunks, intervalMs) {
    super();
    this.chunks = chunks;
    this.index = 0;
    this.paused = false;
    this.intervalMs = intervalMs || 300;
  }
  start() {
    this._scheduleNext();
  }
  _scheduleNext() {
    if (this.paused) return;
    setTimeout(() => this._pushNext(), this.intervalMs);
  }
  _pushNext() {
    if (this.paused) return;
    if (this.index >= this.chunks.length) {
      this.emit("end");
      return;
    }
    this.emit("data", this.chunks[this.index]);
    this.index += 1;
    this._scheduleNext();
  }
  pause() {
    this.paused = true;
  }
  resume() {
    if (!this.paused) return;
    this.paused = false;
    this._scheduleNext();
  }
  pipe(destination) {
    this.on("data", (chunk) => {
      const canContinue = destination.write(chunk);
      if (canContinue === false) this.pause();
    });
    this.on("end", () => destination.end());
    destination.on("drain", () => this.resume());
    return destination;
  }
}

function App() {
  const [log, setLog] = useState([]);

  function print(value) {
    setLog((prev) => [...prev, value]);
  }

  function run() {
    setLog([]);
    const readable = new FakeReadable(["A", "B", "C", "D"]);
    const writable = new EventEmitter();
    let writeCount = 0;
    writable.write = function (chunk) {
      writeCount += 1;
      print('write("' + chunk + '") received (call #' + writeCount + ")");
      if (writeCount % 2 === 0) {
        print("-> destination buffer full: write() returns false, source pauses");
        setTimeout(() => {
          print("-> destination caught up: emitting 'drain', source resumes");
          writable.emit("drain");
        }, 700);
        return false;
      }
      return true;
    };
    writable.end = function () {
      print("writable end() -- readable finished");
    };

    readable.pipe(writable);
    readable.start();
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={run}>Simulate a slow destination</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 140 }}>
        {log.length === 0 ? "// output appears here" : log.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "chaining-pipes",
      title: "Chaining pipes through a Transform",
      summary: "readable.pipe(transform).pipe(writable) -- each stage passes data to the next, uppercase-transforming it along the way.",
      code: `class EventEmitter {
  constructor() {
    this.listeners = {};
  }
  on(eventName, callback) {
    if (!this.listeners[eventName]) this.listeners[eventName] = [];
    this.listeners[eventName].push(callback);
    return this;
  }
  emit(eventName, ...args) {
    if (!this.listeners[eventName]) return false;
    this.listeners[eventName].forEach((callback) => callback(...args));
    return true;
  }
}

class FakeReadable extends EventEmitter {
  constructor(chunks, intervalMs) {
    super();
    this.chunks = chunks;
    this.index = 0;
    this.intervalMs = intervalMs || 350;
  }
  start() {
    setTimeout(() => this._pushNext(), this.intervalMs);
  }
  _pushNext() {
    if (this.index >= this.chunks.length) {
      this.emit("end");
      return;
    }
    this.emit("data", this.chunks[this.index]);
    this.index += 1;
    setTimeout(() => this._pushNext(), this.intervalMs);
  }
  pipe(destination) {
    this.on("data", (chunk) => destination.write(chunk));
    this.on("end", () => destination.end());
    return destination;
  }
}

class FakeUppercaseTransform extends EventEmitter {
  write(chunk) {
    this.emit("data", chunk.toUpperCase());
    return true;
  }
  end() {
    this.emit("end");
  }
  pipe(destination) {
    this.on("data", (chunk) => destination.write(chunk));
    this.on("end", () => destination.end());
    return destination;
  }
}

function App() {
  const [log, setLog] = useState([]);

  function run() {
    setLog([]);
    const readable = new FakeReadable(["hello ", "chained ", "pipes"]);
    const transform = new FakeUppercaseTransform();
    const writable = {
      chunks: [],
      write(chunk) {
        this.chunks.push(chunk);
        setLog((prev) => [...prev, "writable received: " + chunk]);
        return true;
      },
      end() {
        setLog((prev) => [...prev, "done. Final text: " + this.chunks.join("")]);
      },
    };

    readable.pipe(transform).pipe(writable);
    readable.start();
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={run}>readable.pipe(transform).pipe(writable)</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 110 }}>
        {log.length === 0 ? "// output appears here" : log.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "pipe-does-not-forward-errors",
      title: "The gotcha: pipe() doesn't forward 'error' events",
      summary: "An error on the readable side never reaches the writable side automatically -- each stream needs its own handler.",
      code: `class EventEmitter {
  constructor() {
    this.listeners = {};
  }
  on(eventName, callback) {
    if (!this.listeners[eventName]) this.listeners[eventName] = [];
    this.listeners[eventName].push(callback);
    return this;
  }
  emit(eventName, ...args) {
    const handlers = this.listeners[eventName];
    if (!handlers || handlers.length === 0) {
      if (eventName === "error") return; // simplified: avoid crashing this sandbox demo
      return false;
    }
    handlers.forEach((callback) => callback(...args));
    return true;
  }
}

class FakeReadable extends EventEmitter {
  pipe(destination) {
    this.on("data", (chunk) => destination.write(chunk));
    this.on("end", () => destination.end());
    // Notice: no "error" forwarding happens here -- this matches real pipe() behavior.
    return destination;
  }
}

function App() {
  const [log, setLog] = useState([]);

  function print(value) {
    setLog((prev) => [...prev, value]);
  }

  function run() {
    setLog([]);
    const readable = new FakeReadable();
    const writable = {
      write(chunk) {
        print("writable got: " + chunk);
        return true;
      },
      end() {
        print("writable end()");
      },
    };
    let writableHeardError = false;

    readable.pipe(writable);
    readable.on("error", (err) => print("Caught on the READABLE side only: " + err.message));
    // No "error" listener is attached to writable on purpose, to show it never gets notified.

    readable.emit("data", "one chunk before things go wrong");
    setTimeout(() => {
      readable.emit("error", new Error("Disk read failed"));
      print(
        "The writable side " +
          (writableHeardError ? "was notified" : "was NEVER notified") +
          " -- pipe() does not forward error events."
      );
    }, 400);
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={run}>Trigger an error on the readable side</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 100 }}>
        {log.length === 0 ? "// output appears here" : log.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
