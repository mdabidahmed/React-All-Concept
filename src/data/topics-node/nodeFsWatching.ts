import type { Topic } from "../../types";

export const nodeFsWatchingTopic: Topic = {
  id: "node-fs-watching",
  title: "Node.js Watching Files",
  category: "File System",
  shortExplanation: `\`fs.watch(path, callback)\` subscribes to changes on a file or directory — instead of repeatedly checking whether something changed, Node tells you the moment it does.

- The callback receives an \`eventType\` (usually \`"change"\` or \`"rename"\`) and (on most platforms) the \`filename\` that changed
- Watching a directory reports changes to *any* file inside it, one level deep by default (or recursively, with an option)
- This is the mechanism behind tools like \`nodemon\` restarting a server, or a bundler rebuilding when source files change`,
  longExplanation: `Most of the \`fs\` functions covered so far are *imperative* — you ask, once, what a file currently contains, or you write new contents right now. \`fs.watch(path, callback)\` is different: it's *subscription*-based, notifying your callback every time something changes on disk, for as long as the watcher stays open, without you ever needing to ask again.

- \`fs.watch(path, callback)\` returns an \`FSWatcher\` object immediately, and calls \`callback(eventType, filename)\` every time the watched file — or, if \`path\` is a directory, anything inside it — changes. \`eventType\` is typically \`"change"\` (contents modified) or \`"rename"\` (a file created, deleted, or literally renamed) — though which one fires for a given edit can vary depending on the operating system and even the specific editor used to make the edit
- Watching a directory reports events for any file directly inside it (one level deep by default); passing \`{ recursive: true }\` extends this to subdirectories as well, though historically this option's cross-platform support has been inconsistent (solid on macOS and Windows, more limited on Linux) — worth checking the current Node.js docs for a given deployment target
- **Under the hood**, \`fs.watch\` doesn't poll or repeatedly check the file — it asks the *operating system* to notify Node.js directly, using whatever native mechanism that OS provides (\`inotify\` on Linux, \`FSEvents\` on macOS, \`ReadDirectoryChangesW\` on Windows). This makes it efficient — no wasted CPU cycles checking a file that hasn't changed — but it also means its exact behavior isn't perfectly identical across platforms, which is why Node's own documentation calls out \`fs.watch\` as one of the least platform-consistent parts of the \`fs\` API
- A close cousin, \`fs.watchFile(path, callback)\`, takes a different approach: it *polls* the file's stats on a fixed interval (checking whether the modification time changed) rather than relying on OS notifications. This is more consistent across platforms (it doesn't depend on OS-specific features) but less efficient and slower to notice a change, since it's limited by the polling interval
- A watcher stays active — and keeps the Node.js process alive — until it's explicitly stopped by calling \`.close()\` on the object \`fs.watch\` returned, or the process exits. Forgetting to close a watcher that's no longer needed is a small but real source of resource leaks in long-running programs
- **A common real gotcha**: many text editors and build tools don't overwrite a file's bytes directly — instead, they write a brand-new temporary file and then rename it over the original (to avoid ever leaving a half-written file on disk if the save is interrupted). This can cause \`fs.watch\` to fire more than one event for what feels like "a single save," or to report \`"rename"\` when you'd naturally expect \`"change"\`. Because of quirks like this, most real-world tools (bundlers, dev servers, test runners) don't call \`fs.watch\` directly — they use a well-tested wrapper library, most commonly \`chokidar\`, which smooths these platform and editor inconsistencies into one predictable event stream
- The most familiar real-world use is a **development server or build tool that automatically reacts to source changes** — a Node.js process (like \`nodemon\`) watches your script files and restarts the server the instant one changes, or a bundler watches source files and re-runs its build, all without you needing to manually stop and restart anything yourself

This sandbox obviously has no real file to change on a real disk, so the examples below simulate \`fs.watch\` with a small pub/sub helper: a \`watch(callback)\` function that stores the callback, and a \`triggerChange(filename)\` function standing in for "the operating system just told us this file changed" — pressing a button plays the role the OS would normally play, invoking the same callback shape (\`eventType\`, \`filename\`) that real \`fs.watch\` provides.`,
  examples: [
    {
      id: "watch-basic",
      title: "fs.watch fires when a file changes",
      summary: "Subscribing a callback, then simulating an edit that triggers it.",
      code: `function createFakeWatcher() {
  let listeners = [];
  return {
    watch(callback) {
      listeners.push(callback);
      return {
        close() {
          listeners = listeners.filter((cb) => cb !== callback);
        },
      };
    },
    triggerChange(filename) {
      listeners.forEach((cb) => cb("change", filename));
    },
  };
}

const appJsWatcher = createFakeWatcher();

function App() {
  const [log, setLog] = useState([]);
  const [watching, setWatching] = useState(false);

  function print(value) {
    setLog((prev) => [...prev, value]);
  }

  function startWatching() {
    setWatching(true);
    print("Watching app.js for changes...");
    appJsWatcher.watch((eventType, filename) => {
      print("Change detected! eventType=" + eventType + ", filename=" + filename);
    });
  }

  function editFile() {
    appJsWatcher.triggerChange("app.js");
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={startWatching} disabled={watching}>
        {watching ? "Watching app.js" : "fs.watch('app.js', callback)"}
      </button>
      <button onClick={editFile} disabled={!watching}>
        Simulate editing app.js
      </button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 80 }}>
        {log.length === 0 ? "// output appears here" : log.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "watch-dev-server",
      title: "Real-world use: a dev server auto-restart",
      summary: "Saving a file triggers exactly the sequence a tool like nodemon runs under the hood.",
      code: `function createFakeWatcher() {
  let listeners = [];
  return {
    watch(callback) {
      listeners.push(callback);
    },
    triggerChange(filename) {
      listeners.forEach((cb) => cb("change", filename));
    },
  };
}

const serverWatcher = createFakeWatcher();

function App() {
  const [log, setLog] = useState([]);
  const [ready, setReady] = useState(false);

  function print(value) {
    setLog((prev) => [...prev, value]);
  }

  function setupDevServer() {
    setReady(true);
    setLog(["Dev server started. Watching server.js for changes..."]);
    serverWatcher.watch((eventType, filename) => {
      print("Detected " + eventType + " in " + filename);
      print("Restarting server...");
      setTimeout(() => {
        print("Server restarted. Ready again.");
      }, 500);
    });
  }

  function saveFile() {
    print("(You just saved server.js in your editor)");
    serverWatcher.triggerChange("server.js");
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={setupDevServer} disabled={ready}>Start dev server</button>
        <button onClick={saveFile} disabled={!ready}>Save server.js</button>
      </div>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 100 }}>
        {log.length === 0 ? "// output appears here" : log.join("\\n")}
      </pre>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        This is exactly how tools like nodemon work under the hood: fs.watch (or a library built on
        it) notices a change and restarts the process.
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "watch-close",
      title: "Stopping a watcher with close()",
      summary: "Once closed, further changes no longer reach the (now removed) listener.",
      code: `function createFakeWatcher() {
  let listeners = [];
  return {
    watch(callback) {
      listeners.push(callback);
      return {
        close() {
          listeners = listeners.filter((cb) => cb !== callback);
        },
      };
    },
    triggerChange(filename) {
      listeners.forEach((cb) => cb("change", filename));
    },
  };
}

const watcher = createFakeWatcher();

function App() {
  const [log, setLog] = useState([]);
  const [handleRef, setHandleRef] = useState(null);

  function print(value) {
    setLog((prev) => [...prev, value]);
  }

  function start() {
    const handle = watcher.watch((eventType, filename) => {
      print("Change: " + filename);
    });
    setHandleRef(() => handle);
    print("Started watching.");
  }

  function stop() {
    if (handleRef) {
      handleRef.close();
      print("Stopped watching (watcher.close() called).");
    }
  }

  function trigger() {
    print("Triggering a change...");
    watcher.triggerChange("data.json");
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={start}>Start watching</button>
        <button onClick={stop}>Stop watching (close)</button>
        <button onClick={trigger}>Simulate a change</button>
      </div>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 90 }}>
        {log.length === 0 ? "// output appears here" : log.join("\\n")}
      </pre>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        After stopping, "Simulate a change" no longer prints anything — the listener was removed.
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "watch-directory-filenames",
      title: "Watching a directory: reacting per filename",
      summary: "A directory watcher reports the filename that changed, letting code react differently per file.",
      code: `function createFakeWatcher() {
  let listeners = [];
  return {
    watch(callback) {
      listeners.push(callback);
    },
    triggerChange(filename) {
      listeners.forEach((cb) => cb("change", filename));
    },
  };
}

const dirWatcher = createFakeWatcher();

function App() {
  const [log, setLog] = useState([]);
  const [started, setStarted] = useState(false);

  function print(value) {
    setLog((prev) => [...prev, value]);
  }

  function startWatchingDir() {
    setStarted(true);
    setLog(["Watching directory 'src'..."]);
    dirWatcher.watch((eventType, filename) => {
      if (filename.endsWith(".css")) {
        print(filename + " changed -> re-injecting styles only");
      } else {
        print(filename + " changed -> full rebuild needed");
      }
    });
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={startWatchingDir} disabled={started}>fs.watch("src", callback)</button>
      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={() => dirWatcher.triggerChange("styles.css")} disabled={!started}>
          Edit styles.css
        </button>
        <button onClick={() => dirWatcher.triggerChange("index.js")} disabled={!started}>
          Edit index.js
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
  ],
};
