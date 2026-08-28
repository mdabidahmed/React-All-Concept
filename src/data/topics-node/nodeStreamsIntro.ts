import type { Topic } from "../../types";

export const nodeStreamsIntroTopic: Topic = {
  id: "node-streams-intro",
  title: "Node.js Introduction to Streams",
  category: "Events & Streams",
  shortExplanation: `A **stream** processes data piece-by-piece ("chunks") as it arrives, instead of waiting for the entire thing to load into memory first — critical for large files, network responses, or anything whose total size is too big (or unknown) to hold entirely in RAM up front.

- **Readable** streams emit \`"data"\` events as chunks arrive, and an \`"end"\` event once there's nothing left
- **Writable** streams accept data via \`.write(chunk)\` calls, and are finished off with \`.end()\`
- Streams are themselves \`EventEmitter\`s under the hood — everything from the \`EventEmitter\` topic applies directly to them`,
  longExplanation: `Imagine copying a 2 GB video file. \`fs.readFile\` would load the *entire* 2 GB into memory before your code can do anything with it — if the machine doesn't have 2 GB of RAM to spare (and a real server juggling many requests at once often doesn't), this either crashes the process or grinds everything to a halt. A **stream** solves this by never holding more than a small chunk of the data in memory at any one time: it reads a piece, hands that piece to your code, then reads the next piece, forgetting the previous one once it's been dealt with. This is the same principle behind streaming a video — playback starts long before the whole file has downloaded, because the player only ever needs the next few seconds of data in memory.

- **Readable streams** are the *source* side. A readable stream starts "paused," and once you attach a \`"data"\` listener it begins "flowing," emitting a \`"data"\` event for every chunk it produces. Each chunk shows up as a \`Buffer\` (raw bytes — covered in the next topic) unless an encoding like \`"utf-8"\` was specified, in which case chunks arrive as decoded strings instead. When the source is exhausted, the stream emits a single \`"end"\` event, and if something goes wrong while reading, it emits \`"error"\` instead (the same special \`"error"\` convention covered in the Custom Events topic)
- **Writable streams** are the *destination* side. Instead of one big write, code calls \`.write(chunk)\` repeatedly, once per piece of data, and calls \`.end()\` (optionally with one final chunk) to signal "no more data is coming." A writable stream's \`.write()\` actually returns a boolean — \`false\` means its internal buffer is full and the writer should slow down, which becomes important once streams are connected together (covered in the next topic, Piping Streams)
- **Four kinds exist in real Node.js**: \`Readable\` (source only, e.g. reading a file), \`Writable\` (destination only, e.g. writing an HTTP response), \`Duplex\` (both — e.g. a network socket, which can be read from and written to independently), and \`Transform\` (a duplex stream that modifies data as it passes through, e.g. a gzip compressor). This topic focuses on the two simplest, foundational kinds — Readable and Writable — which the other two are built from
- **Real-world Readable/Writable streams you'll meet constantly**: \`fs.createReadStream(path)\` / \`fs.createWriteStream(path)\` for files, an incoming HTTP \`request\` object (readable — the request body arrives as a stream) and the \`response\` object (writable — you write the reply as it's generated), and \`process.stdin\` / \`process.stdout\` for a command-line program's input and output
- **A common gotcha**: forgetting that \`"data"\` events can fire many times, with a *partial* piece of the eventual full content each time. Code that expects one \`"data"\` event to already contain "the whole thing" will silently process incomplete data — chunk boundaries in a stream have no relationship to logical boundaries (a single JSON object, for instance, can easily be split across two separate chunks)

Since this sandbox can't open a real file handle or network socket, the example below simulates a Readable stream using the same \`EventEmitter\` base class from the previous topics — a plain JavaScript object that emits \`"data"\` a few times on a \`setTimeout\` schedule, then emits \`"end"\`. This is a genuinely accurate stand-in for how a real stream *behaves* from the outside (the sequence and shape of events is identical); only the actual disk/network access underneath is faked.`,
  examples: [
    {
      id: "simulated-readable-stream",
      title: "A Readable stream, simulated with EventEmitter",
      summary: "Chunks arrive over time via 'data' events, followed by a single 'end' event.",
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

// Simulates fs.createReadStream("bigfile.txt") emitting a few chunks, then finishing.
function createFakeReadStream(chunks) {
  const stream = new EventEmitter();
  let index = 0;
  function pushNext() {
    if (index >= chunks.length) {
      stream.emit("end");
      return;
    }
    stream.emit("data", chunks[index]);
    index += 1;
    setTimeout(pushNext, 400);
  }
  setTimeout(pushNext, 400);
  return stream;
}

function App() {
  const [log, setLog] = useState([]);
  const [running, setRunning] = useState(false);

  function run() {
    setLog([]);
    setRunning(true);
    const stream = createFakeReadStream(["chunk 1: Hello ", "chunk 2: from a ", "chunk 3: stream!"]);
    stream.on("data", (chunk) => {
      setLog((prev) => [...prev, "data event -> " + JSON.stringify(chunk)]);
    });
    stream.on("end", () => {
      setLog((prev) => [...prev, "end event -> no more data"]);
      setRunning(false);
    });
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={run} disabled={running}>
        {running ? "Streaming..." : "Start reading (simulated)"}
      </button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 100 }}>
        {log.length === 0 ? "// output appears here" : log.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "processing-as-it-arrives",
      title: "Processing each chunk as it arrives (not after)",
      summary: "Work happens per-chunk, instead of waiting for everything to be collected first — the whole point of a stream.",
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

function createFakeReadStream(chunks) {
  const stream = new EventEmitter();
  let index = 0;
  function pushNext() {
    if (index >= chunks.length) {
      stream.emit("end");
      return;
    }
    stream.emit("data", chunks[index]);
    index += 1;
    setTimeout(pushNext, 350);
  }
  setTimeout(pushNext, 350);
  return stream;
}

function App() {
  const [runningTotal, setRunningTotal] = useState(0);
  const [log, setLog] = useState([]);

  function run() {
    setLog([]);
    setRunningTotal(0);
    // Numbers arriving as a "stream" -- each one is summed the moment it arrives,
    // instead of collecting the whole array first and summing it at the end.
    const stream = createFakeReadStream([10, 20, 30, 40]);
    let total = 0;
    stream.on("data", (chunkValue) => {
      total += chunkValue;
      setRunningTotal(total);
      setLog((prev) => [...prev, "+" + chunkValue + " -> running total is now " + total]);
    });
    stream.on("end", () => {
      setLog((prev) => [...prev, "Stream ended. Final total: " + total]);
    });
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={run}>Stream numbers and sum as they arrive</button>
      <p>Running total: {runningTotal}</p>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 90 }}>
        {log.length === 0 ? "// output appears here" : log.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "simulated-writable-stream",
      title: "A Writable stream, simulated",
      summary: "write() is called once per chunk, and end() signals that no more data is coming.",
      code: `class WritableStream {
  constructor() {
    this.received = [];
    this.finished = false;
  }
  write(chunk) {
    if (this.finished) throw new Error("Cannot write after end()");
    this.received.push(chunk);
    return true; // "true" means: keep writing, my internal buffer has room
  }
  end(finalChunk) {
    if (finalChunk !== undefined) this.write(finalChunk);
    this.finished = true;
  }
}

function App() {
  const [log, setLog] = useState([]);
  const [writer] = useState(() => new WritableStream());

  function print(value) {
    setLog((prev) => [...prev, value]);
  }

  function writeChunk(text) {
    writer.write(text);
    print("write(\\"" + text + "\\") -> buffered " + writer.received.length + " chunk(s) so far");
  }

  function finish() {
    writer.end("(final chunk)");
    print("end() called -> stream finished. Full contents: " + writer.received.join(""));
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={() => writeChunk("Hello, ")} disabled={writer.finished}>
          write("Hello, ")
        </button>
        <button onClick={() => writeChunk("Writable ")} disabled={writer.finished}>
          write("Writable ")
        </button>
        <button onClick={finish} disabled={writer.finished}>
          end()
        </button>
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
      id: "manually-wiring-readable-to-writable",
      title: "Manually connecting a Readable to a Writable",
      summary: "Forwarding every 'data' event into write(), and 'end' into end() — the exact job pipe() automates next.",
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

function createFakeReadStream(chunks) {
  const stream = new EventEmitter();
  let index = 0;
  function pushNext() {
    if (index >= chunks.length) {
      stream.emit("end");
      return;
    }
    stream.emit("data", chunks[index]);
    index += 1;
    setTimeout(pushNext, 350);
  }
  setTimeout(pushNext, 350);
  return stream;
}

class WritableStream {
  constructor(onWrite, onEnd) {
    this.onWrite = onWrite;
    this.onEnd = onEnd;
  }
  write(chunk) {
    this.onWrite(chunk);
    return true;
  }
  end() {
    this.onEnd();
  }
}

function App() {
  const [log, setLog] = useState([]);

  function print(value) {
    setLog((prev) => [...prev, value]);
  }

  function run() {
    setLog([]);
    const readable = createFakeReadStream(["one ", "two ", "three "]);
    const writable = new WritableStream(
      (chunk) => print("writable.write() <- \\"" + chunk + "\\""),
      () => print("writable.end() <- readable finished")
    );

    // This manual wiring is exactly what readable.pipe(writable) does automatically:
    readable.on("data", (chunk) => writable.write(chunk));
    readable.on("end", () => writable.end());
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={run}>Connect readable to writable manually</button>
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
