import type { Topic } from "../../types";

export const nodeFsReadingFilesTopic: Topic = {
  id: "node-fs-reading-files",
  title: "Node.js Reading Files",
  category: "File System",
  shortExplanation: `The built-in \`fs\` ("file system") module lets Node.js read files from disk — something a browser's JavaScript is deliberately never allowed to do.

- \`fs.readFile(path, encoding, callback)\` — asynchronous, doesn't block other code while reading
- \`fs.readFileSync(path, encoding)\` — synchronous, returns the contents directly but blocks until done
- Modern code often uses \`fs.promises.readFile(...)\` or \`fs/promises\` with \`async\`/\`await\` instead of callbacks`,
  longExplanation: `Reading a file's contents is one of the most fundamental things a server-side program needs to do — serving an HTML page, loading a configuration file, processing an uploaded document. Node's built-in \`fs\` module (no installation needed — it ships with Node itself) provides this, in three different styles depending on how you want to handle the "this takes time" nature of disk access.

- **Callback style** (the original Node.js pattern): \`fs.readFile("data.txt", "utf-8", (err, data) => { ... })\`. This is *asynchronous* — the function returns immediately, and your callback runs later once the file has actually been read, with the file's contents as \`data\` (or an \`Error\` as \`err\` if something went wrong, like the file not existing). Node's convention is "error-first callbacks" — the callback's first parameter is always reserved for an error, checked before touching the actual data
- **Synchronous style**: \`fs.readFileSync("data.txt", "utf-8")\` returns the file's contents *directly*, no callback needed — but it **blocks** the entire Node.js process until the read finishes. For a web server handling many requests, blocking is a real problem: while one file is being read synchronously, the server can't respond to *any* other request. Synchronous methods are generally reserved for simple scripts or one-time startup work, never for code that runs per-request in a server
- **Promise-based style** (the modern, generally preferred approach): \`import { readFile } from "fs/promises";\` then \`const data = await readFile("data.txt", "utf-8");\` — this gets the non-blocking behavior of the callback version, but with the much more readable syntax of \`async\`/\`await\` instead of nested callbacks
- The **encoding** argument (\`"utf-8"\`) matters — without it, \`fs.readFile\` returns a raw \`Buffer\` (covered in a later topic) rather than a readable string. Passing \`"utf-8"\` tells Node to decode the raw bytes into text
- A common real mistake: forgetting to handle the error case. A missing file, a permissions problem, or a bad path all surface as an \`err\` (callback style) or a thrown exception (promise style with \`await\`) — code that ignores this will crash unpredictably or silently do nothing useful

Since this sandbox runs in a browser with no real file system to read from, these examples simulate \`fs\` with a plain JavaScript object standing in for a tiny "disk" (\`{ "data.txt": "file contents..." }\`), and functions shaped exactly like the real \`fs\` API (same parameter order, same error-first callback convention, same async delay via \`setTimeout\`) — so the code you write here maps directly onto the real \`fs\` module once running in actual Node.js.`,
  examples: [
    {
      id: "simulated-readfile-callback",
      title: "fs.readFile with a callback (simulated)",
      summary: "An error-first callback, exactly matching Node's real fs.readFile convention.",
      code: `// A tiny simulated "disk", standing in for the real file system:
const fakeDisk = {
  "greeting.txt": "Hello from a file!",
  "config.txt": "port=3000",
};

function readFile(path, encoding, callback) {
  setTimeout(() => {
    if (!(path in fakeDisk)) {
      callback(new Error("ENOENT: no such file '" + path + "'"), null);
      return;
    }
    callback(null, fakeDisk[path]);
  }, 300);
}

function App() {
  const [log, setLog] = useState([]);

  function print(value) {
    setLog((prev) => [...prev, value]);
  }

  function run() {
    setLog(["Reading greeting.txt..."]);
    readFile("greeting.txt", "utf-8", (err, data) => {
      if (err) {
        print("Error: " + err.message);
        return;
      }
      print("Contents: " + data);
    });
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={run}>Read file</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 70 }}>
        {log.length === 0 ? "// output appears here" : log.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "simulated-readfile-error",
      title: "Handling a missing file (the error-first pattern)",
      summary: "Reading a file that doesn't exist — the err parameter is what real Node.js code checks first.",
      code: `const fakeDisk = { "greeting.txt": "Hello!" };

function readFile(path, encoding, callback) {
  setTimeout(() => {
    if (!(path in fakeDisk)) {
      callback(new Error("ENOENT: no such file '" + path + "'"), null);
      return;
    }
    callback(null, fakeDisk[path]);
  }, 300);
}

function App() {
  const [result, setResult] = useState("");

  function run() {
    setResult("Reading...");
    readFile("missing.txt", "utf-8", (err, data) => {
      if (err) {
        setResult("Failed: " + err.message);
        return;
      }
      setResult("Contents: " + data);
    });
  }

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <button onClick={run}>Try reading missing.txt</button>
      <p>{result}</p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "simulated-readfile-sync-blocking",
      title: "readFileSync: simple, but blocking",
      summary: "The synchronous version returns data directly — no callback — but would freeze a real server while it works.",
      code: `const fakeDisk = { "config.txt": "port=3000\\nhost=localhost" };

function readFileSync(path, encoding) {
  if (!(path in fakeDisk)) {
    throw new Error("ENOENT: no such file '" + path + "'");
  }
  return fakeDisk[path];
}

function App() {
  const [output, setOutput] = useState("");

  function run() {
    try {
      const contents = readFileSync("config.txt", "utf-8");
      setOutput("Contents:\\n" + contents);
    } catch (err) {
      setOutput("Failed: " + err.message);
    }
  }

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <button onClick={run}>Read config.txt (sync)</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 60 }}>
        {output || "// output appears here"}
      </pre>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        No callback needed here — but in real Node.js, this blocks the whole process until the read completes.
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "simulated-readfile-promise",
      title: "The modern approach: fs/promises with async/await",
      summary: "Non-blocking, and reads top-to-bottom like synchronous code — the best of both earlier styles.",
      code: `const fakeDisk = { "greeting.txt": "Hello, async/await!" };

function readFilePromise(path, encoding) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!(path in fakeDisk)) {
        reject(new Error("ENOENT: no such file '" + path + "'"));
        return;
      }
      resolve(fakeDisk[path]);
    }, 300);
  });
}

function App() {
  const [output, setOutput] = useState("");

  async function run() {
    setOutput("Reading...");
    try {
      const contents = await readFilePromise("greeting.txt", "utf-8");
      setOutput("Contents: " + contents);
    } catch (err) {
      setOutput("Failed: " + err.message);
    }
  }

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <button onClick={run}>Read file (async/await)</button>
      <p>{output}</p>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        In real Node.js this would be: import {"{"} readFile {"}"} from "fs/promises";
      </p>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
