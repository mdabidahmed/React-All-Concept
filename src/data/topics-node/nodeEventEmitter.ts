import type { Topic } from "../../types";

export const nodeEventEmitterTopic: Topic = {
  id: "node-event-emitter",
  title: "Node.js EventEmitter",
  category: "Events & Streams",
  shortExplanation: `\`EventEmitter\`, from Node's built-in \`events\` module, is the pattern behind most of Node's own APIs — an object that can \`emit\` named events, which any number of listeners can \`on\` (subscribe to) in advance.

- \`emitter.on("eventName", callback)\` — subscribe a listener
- \`emitter.emit("eventName", ...args)\` — fire the event, calling every subscribed listener synchronously, in order
- Many core Node objects (HTTP servers, streams, and more) *are* EventEmitters under the hood`,
  longExplanation: `A huge amount of Node.js is built around one recurring shape: something happens, and any interested code should be able to react to it, without the thing that happened needing to know who — or how many listeners — are interested in advance. This is exactly what the \`EventEmitter\` class, from Node's built-in \`events\` module, provides — and it's genuinely one of the most-reused patterns in the entire platform.

- **Subscribing**: \`emitter.on("eventName", (payload) => { ... })\` registers a callback ("listener") to run whenever that named event fires. Multiple listeners can subscribe to the *same* event name — all of them run, in the order they were registered
- **Emitting**: \`emitter.emit("eventName", payload)\` synchronously calls every listener currently subscribed to that name, passing along whatever arguments were given to \`emit\`. If no listener is subscribed, \`emit\` simply does nothing (it doesn't throw or queue the event for later)
- **Unsubscribing**: \`emitter.off("eventName", callback)\` (or the older alias \`removeListener\`) removes a specific listener — this requires keeping a reference to the original callback function, since an anonymous inline function can't be removed later
- \`emitter.once("eventName", callback)\` subscribes a listener that automatically removes itself after firing exactly one time — useful for a one-off "ready" or "connected" signal
- **This is everywhere in Node's own core APIs**: an HTTP server emits a \`"request"\` event for every incoming request; a readable stream emits \`"data"\` events as chunks arrive and an \`"end"\` event when it's finished; a child process emits an \`"exit"\` event when it terminates. Once you understand \`EventEmitter\`, a huge portion of Node's built-in API surface stops looking like a pile of unrelated one-off APIs and starts looking like the same well-known pattern, applied consistently
- A custom class can gain this exact behavior by **extending** \`EventEmitter\`: \`class Order extends EventEmitter { ... }\` — now every \`Order\` instance can \`.emit(...)\` its own events (like \`"shipped"\` or \`"cancelled"\`) and any other part of the app can \`.on(...)\` to react, without the \`Order\` class needing to know anything about who's listening
- One thing to watch for: by default, Node warns if more than 10 listeners are added for a single event name on one emitter — usually a sign of a memory leak (listeners being added repeatedly without ever being removed), though the limit itself can be adjusted when a legitimately large number of listeners is expected

Unlike file system or network APIs, \`EventEmitter\` is **pure JavaScript logic** with no dependency on an operating system or browser sandbox — so unlike most of this subject's topics, this one needs no simulation at all. The class shown here genuinely implements the real \`on\`/\`emit\`/\`off\`/\`once\` API from Node's \`events\` module, and behaves identically to importing the real thing.`,
  examples: [
    {
      id: "basic-event-emitter",
      title: "A working EventEmitter implementation",
      summary: "Genuine on()/emit() behavior — this is the same API Node's real events module provides.",
      code: `class EventEmitter {
  constructor() {
    this.listeners = {};
  }
  on(eventName, callback) {
    if (!this.listeners[eventName]) this.listeners[eventName] = [];
    this.listeners[eventName].push(callback);
    return this;
  }
  off(eventName, callback) {
    if (!this.listeners[eventName]) return this;
    this.listeners[eventName] = this.listeners[eventName].filter((cb) => cb !== callback);
    return this;
  }
  emit(eventName, ...args) {
    if (!this.listeners[eventName]) return false;
    this.listeners[eventName].forEach((callback) => callback(...args));
    return true;
  }
}

function App() {
  const [log, setLog] = useState([]);
  const [emitter] = useState(() => new EventEmitter());

  function print(value) {
    setLog((prev) => [...prev, value]);
  }

  function run() {
    setLog([]);
    emitter.on("greet", (name) => print("Listener 1 heard: hello, " + name));
    emitter.on("greet", (name) => print("Listener 2 heard: hi, " + name));
    emitter.emit("greet", "Ada");
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={run}>Subscribe two listeners and emit</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 70 }}>
        {log.length === 0 ? "// output appears here" : log.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "once-listener",
      title: "once(): a listener that fires exactly one time",
      summary: "After the first emit, the once-listener automatically unsubscribes itself.",
      code: `class EventEmitter {
  constructor() {
    this.listeners = {};
  }
  on(eventName, callback) {
    if (!this.listeners[eventName]) this.listeners[eventName] = [];
    this.listeners[eventName].push(callback);
    return this;
  }
  once(eventName, callback) {
    const wrapper = (...args) => {
      this.off(eventName, wrapper);
      callback(...args);
    };
    return this.on(eventName, wrapper);
  }
  off(eventName, callback) {
    if (!this.listeners[eventName]) return this;
    this.listeners[eventName] = this.listeners[eventName].filter((cb) => cb !== callback);
    return this;
  }
  emit(eventName, ...args) {
    if (!this.listeners[eventName]) return false;
    [...this.listeners[eventName]].forEach((callback) => callback(...args));
    return true;
  }
}

function App() {
  const [log, setLog] = useState([]);
  const [emitter] = useState(() => new EventEmitter());
  const [count, setCount] = useState(0);

  function print(value) {
    setLog((prev) => [...prev, value]);
  }

  function setup() {
    emitter.once("ready", () => print("Fired! (this only happens once, ever)"));
    print("Listener registered with once() — try emitting a few times below.");
  }

  function fire() {
    setCount((c) => c + 1);
    emitter.emit("ready");
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={setup}>Register once() listener</button>
        <button onClick={fire}>Emit "ready" (emitted {count}x)</button>
      </div>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 70 }}>
        {log.length === 0 ? "// output appears here" : log.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "custom-class-extends-emitter",
      title: "A custom class built on EventEmitter",
      summary: "An Order object emits its own domain-specific events — the exact pattern Node's own APIs use internally.",
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

class Order extends EventEmitter {
  constructor(id) {
    super();
    this.id = id;
    this.status = "created";
  }
  ship() {
    this.status = "shipped";
    this.emit("shipped", { id: this.id, status: this.status });
  }
}

function App() {
  const [log, setLog] = useState([]);
  const [order] = useState(() => {
    const o = new Order(1001);
    o.on("shipped", (details) => {
      setLog((prev) => [...prev, "Order " + details.id + " is now: " + details.status]);
    });
    return o;
  });

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={() => order.ship()}>Ship order #1001</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 60 }}>
        {log.length === 0 ? "// ship the order to see it emit an event" : log.join("\\n")}
      </pre>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        Real Node.js: "class Order extends EventEmitter" would import EventEmitter from "events".
      </p>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
