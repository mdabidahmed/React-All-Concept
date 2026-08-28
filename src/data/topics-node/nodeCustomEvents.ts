import type { Topic } from "../../types";

export const nodeCustomEventsTopic: Topic = {
  id: "node-custom-events",
  title: "Node.js Custom Events",
  category: "Events & Streams",
  shortExplanation: `**Custom events** turn your own class into an event-driven object by *extending* \`EventEmitter\` — instead of forcing callers to know exactly which method to call and when, the object \`emit\`s named events at meaningful moments, and any interested code can \`on\` them independently.

- \`class TaskQueue extends EventEmitter { ... }\` inherits \`on\`/\`emit\`/\`off\`/\`once\` for free — no extra work needed
- Call \`this.emit("taskAdded", task)\` from inside a method, at the exact moment something noteworthy happens
- Multiple, unrelated parts of an app can each \`.on(...)\` the same object's events without it needing to know they exist, or how many there are`,
  longExplanation: `Node's built-in \`events\` module isn't only meant for Node's own core classes — it's meant to be *inherited*. Any class you write can \`extends EventEmitter\` and immediately gain \`on\`, \`emit\`, \`off\`, and \`once\`, turning an ordinary application object (a task queue, an order, a background job, a game character) into the same event-driven shape that HTTP servers and streams already use internally.

- **Why bother, instead of just calling a method directly?** A method call is a *hard-coded* connection — the caller must know the method's exact name and call it at the right time, and the object can only react in one fixed way. Emitting an event **decouples** the two sides: a \`TaskQueue\` doesn't know or care whether zero listeners, one listener, or five completely unrelated listeners (a logger, a UI update, an analytics ping) are subscribed to \`"taskCompleted"\` — it just announces that a task finished and lets each listener decide independently what to do about it. This is the same underlying idea as \`addEventListener\` on the browser side of JavaScript
- **The constructor still needs \`super()\`.** Because \`EventEmitter\` keeps its own internal bookkeeping (the map of event names to listener arrays) inside its constructor, a subclass's constructor **must** call \`super()\` before using \`this.emit\` or \`this.on\` — a classic gotcha with \`class\` inheritance generally, not something specific to \`EventEmitter\`
- **Where to \`emit\` from.** The convention is to emit from *inside* the class's own methods, right at the point where the underlying state actually changes — e.g. inside \`addTask()\`, immediately after pushing the new task onto an internal array, call \`this.emit("taskAdded", task)\`. This keeps "when did this actually happen" logic in exactly one place, instead of scattered across every caller that also happens to want to notify someone
- **The special \`"error"\` event.** Node's real \`EventEmitter\` treats the event name \`"error"\` specially: emitting \`"error"\` with *no* listener subscribed throws the error and can crash the process — unlike every other event name, where emitting with no listeners is a silent no-op. This is a deliberate safety net, since an error is the one kind of event that's genuinely dangerous to let disappear silently
- **Listener cleanup still matters.** A custom emitter that lives for a long time (attached once at app startup, say) and keeps accumulating \`.on(...)\` calls without matching \`.off(...)\` calls will leak memory — each listener closure keeps whatever it captured alive for as long as the emitter itself is alive
- **This is a design pattern, not a special language feature.** Nothing here is magic — \`EventEmitter\` is a plain class with a \`listeners\` object and a handful of array-manipulating methods. Extending it works exactly like extending any other JavaScript class; the payoff is inheriting a well-understood, widely-recognized API shape for "this object announces things that happen to it," instead of inventing a bespoke one-off notification system for every class that needs one

Because \`EventEmitter\`-based code is pure JavaScript logic — no file system, network, or OS access involved anywhere in it — every example below runs for real, using a genuine (if minimal) reimplementation of the same \`on\`/\`emit\`/\`off\` API Node's actual \`events\` module provides. There is no simulation in this topic: subclassing this \`EventEmitter\` and subclassing the real one imported from Node's \`events\` module behave identically.`,
  examples: [
    {
      id: "task-queue-basic",
      title: "A TaskQueue built on EventEmitter",
      summary: "Adding and completing a task emits taskAdded / taskCompleted for any listener to react to.",
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

class TaskQueue extends EventEmitter {
  constructor() {
    super();
    this.tasks = [];
  }
  addTask(name) {
    const task = { name: name, done: false };
    this.tasks.push(task);
    this.emit("taskAdded", task);
    return task;
  }
  completeTask(task) {
    task.done = true;
    this.emit("taskCompleted", task);
  }
}

function App() {
  const [log, setLog] = useState([]);
  const [queue] = useState(() => {
    const q = new TaskQueue();
    q.on("taskAdded", (task) => {
      setLog((prev) => [...prev, "Added: " + task.name]);
    });
    q.on("taskCompleted", (task) => {
      setLog((prev) => [...prev, "Completed: " + task.name]);
    });
    return q;
  });

  function addAndComplete() {
    const task = queue.addTask("Write report");
    setTimeout(() => queue.completeTask(task), 600);
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={addAndComplete}>Add a task, then complete it</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 80 }}>
        {log.length === 0 ? "// output appears here" : log.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "multiple-listeners",
      title: "Multiple independent listeners on one event",
      summary: "A logger and a counter both react to 'taskCompleted', without knowing about each other.",
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

class TaskQueue extends EventEmitter {
  completeTask(name) {
    this.emit("taskCompleted", name);
  }
}

function App() {
  const [log, setLog] = useState([]);
  const [count, setCount] = useState(0);
  const [queue] = useState(() => {
    const q = new TaskQueue();
    // Listener 1: a "logger" that only cares about printing text
    q.on("taskCompleted", (name) => {
      setLog((prev) => [...prev, "[log] task finished: " + name]);
    });
    // Listener 2: a "counter" added completely separately, with no knowledge of listener 1
    q.on("taskCompleted", () => {
      setCount((c) => c + 1);
    });
    return q;
  });

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={() => queue.completeTask("Write report")}>Complete a task</button>
      <p>Completed count (from the independent counter listener): {count}</p>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 70 }}>
        {log.length === 0 ? "// output appears here" : log.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "the-error-event",
      title: "The special 'error' event",
      summary: "Emitting 'error' with no listener throws in real Node.js — this reimplementation matches that behavior.",
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
      if (eventName === "error") {
        // Real Node.js behavior: an unhandled "error" event throws instead of quietly doing nothing.
        const err = args[0];
        throw err instanceof Error ? err : new Error(String(err));
      }
      return false;
    }
    handlers.forEach((callback) => callback(...args));
    return true;
  }
}

class TaskQueue extends EventEmitter {
  addTask(name) {
    if (!name) {
      this.emit("error", new Error("A task needs a name"));
      return;
    }
    this.emit("taskAdded", name);
  }
}

function App() {
  const [output, setOutput] = useState("");
  const [hasErrorListener, setHasErrorListener] = useState(false);
  const [queue] = useState(() => new TaskQueue());

  function attachListener() {
    if (hasErrorListener) return;
    queue.on("error", (err) => {
      setOutput((prev) => prev + "Caught safely: " + err.message + "\\n");
    });
    setHasErrorListener(true);
  }

  function triggerError() {
    try {
      queue.addTask(""); // no name -> emits "error"
    } catch (err) {
      setOutput((prev) => prev + "Uncaught! A real process would crash here: " + err.message + "\\n");
    }
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={attachListener} disabled={hasErrorListener}>
          {hasErrorListener ? "Error listener attached" : "Attach an 'error' listener"}
        </button>
        <button onClick={triggerError}>Add a task with no name</button>
      </div>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 80 }}>
        {output || "// try triggering the error with, and without, a listener attached"}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "removing-a-listener",
      title: "Unsubscribing with off()",
      summary: "A temporary listener stops reacting once removed, using the exact function reference it was added with.",
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

class TaskQueue extends EventEmitter {
  addTask(name) {
    this.emit("taskAdded", name);
  }
}

function App() {
  const [log, setLog] = useState([]);
  const [subscribed, setSubscribed] = useState(true);
  const [state] = useState(() => {
    const queue = new TaskQueue();
    const onTaskAdded = (name) => {
      setLog((prev) => [...prev, "Temporary listener heard: " + name]);
    };
    queue.on("taskAdded", onTaskAdded);
    return { queue: queue, onTaskAdded: onTaskAdded };
  });
  const queue = state.queue;
  const onTaskAdded = state.onTaskAdded;

  function toggle() {
    if (subscribed) {
      queue.off("taskAdded", onTaskAdded);
    } else {
      queue.on("taskAdded", onTaskAdded);
    }
    setSubscribed((s) => !s);
  }

  function addTask() {
    queue.addTask("New task #" + (log.length + 1));
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={toggle}>{subscribed ? "Unsubscribe" : "Resubscribe"}</button>
        <button onClick={addTask}>Add a task</button>
      </div>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 80 }}>
        {log.length === 0 ? "// output appears here" : log.join("\\n")}
      </pre>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        off() needs the exact same function reference passed to on() — a fresh inline arrow function could never be removed this way.
      </p>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
