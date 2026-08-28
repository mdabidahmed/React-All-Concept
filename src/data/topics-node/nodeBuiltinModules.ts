import type { Topic } from "../../types";

export const nodeBuiltinModulesTopic: Topic = {
  id: "node-builtin-modules",
  title: "Node.js Built-in Modules",
  category: "Modules",
  shortExplanation: `Node.js ships with a large standard library of **built-in modules** — no \`npm install\` needed, just \`require("module-name")\` (or \`import ... from "module-name"\`) and they're ready to use.

- \`fs\`, \`path\`, \`http\`, \`os\`, and \`events\` are covered in depth elsewhere in this subject
- \`crypto\` (hashing, randomness) and \`util\` (helper functions) are two more worth knowing about
- \`process\` isn't technically a module — it's a global available everywhere — but it's closely related to this whole group`,
  longExplanation: `One of Node.js's biggest practical advantages is how much it can do *before* installing a single third-party package. A large standard library of **built-in modules** ships with every Node.js installation, covering file access, networking, and operating-system information — this topic is a map of that territory, tying together modules covered in depth elsewhere in this subject and introducing a couple more worth knowing about.

- **\`fs\`** ("file system") — reading, writing, and manipulating files and directories on disk. Covered in depth in this subject's file system topics.
- **\`path\`** — building and manipulating file paths correctly across different operating systems (Windows uses backslashes, everything else uses forward slashes) without manually concatenating strings. Covered in this subject's \`path\` topics.
- **\`http\`** — creating web servers and making HTTP requests at the lowest level Node.js exposes (most real projects use a framework built on top of it, but the framework itself is built from these primitives). Covered in this subject's HTTP topics.
- **\`os\`** — information about the computer Node is actually running on: CPU details, total/free memory, the platform ("darwin", "win32", "linux"), and more. Covered in this subject's \`os\` topic.
- **\`events\`** — exports the \`EventEmitter\` class, the subscribe/publish pattern used throughout Node's own core APIs. Covered in this subject's EventEmitter topic.
- **\`process\`** isn't a module you \`require\` at all — it's a **global**, automatically available in every file with no import needed. It's mentioned here because it's so closely related to this whole group: it exposes the command-line arguments a script was started with (\`process.argv\`), environment variables (\`process.env\`), and the ability to end the program (\`process.exit()\`).
- **\`crypto\`** — cryptographic functionality: generating secure random values, and computing hashes (a one-way fingerprint of some data — the same input always produces the same hash, but the original input can't be recovered from the hash). A common use is hashing a password before storing it, so the real password is never kept anywhere, even in the application's own database. \`crypto.createHash("sha256").update(data).digest("hex")\` is the classic shape of this API.
- **\`util\`** — a grab-bag of helper functions that don't fit neatly anywhere else. The most commonly used one is \`util.promisify\`, which takes an older, Node-style function using an error-first callback (\`fn(args, callback)\`) and returns a new function with the exact same behavior, but returning a \`Promise\` instead — letting older callback-based APIs be used with modern \`async\`/\`await\` syntax without rewriting them by hand.
- **How to know if you need to install something**: if a name shows up in Node's official API documentation (\`nodejs.org/api\`), it's built in and needs no installation. If it's not there, it's a third-party package, installed via \`npm install\`. This distinction trips up beginners fairly often, since some very well-known packages (like \`express\`) are so central to how Node.js is typically used that it's easy to assume they ship with Node itself — they don't.

Since most of these modules do real, OS-level work (touching the file system, opening network sockets, reading real hardware info), this sandbox can't execute the real versions — that's exactly why each one gets its own dedicated topic elsewhere in this subject, with a properly simulated, faithful stand-in explained in detail there. This topic itself stays at the reference level: the examples below list the modules together with what each is for, and demonstrate the parts that genuinely are plain, portable JavaScript logic (like the *shape* of \`util.promisify\`) for real.`,
  examples: [
    {
      id: "modules-covered-elsewhere",
      title: "Built-in modules covered elsewhere in this subject",
      summary: "A quick reference to what each require('...') call unlocks.",
      code: `function App() {
  const modules = [
    { name: "fs", desc: "Reading and writing files and directories." },
    { name: "path", desc: "Building and parsing file paths safely, across operating systems." },
    { name: "http", desc: "Creating web servers and making HTTP requests." },
    { name: "os", desc: "Information about the machine Node is running on." },
    { name: "events", desc: "The EventEmitter class — subscribe/publish, used throughout Node's core." },
  ];

  return (
    <div style={{ display: "grid", gap: 8 }}>
      {modules.map((m) => (
        <div key={m.name} style={{ display: "flex", gap: 10, alignItems: "baseline" }}>
          <code style={{ background: "#111827", color: "#d1fae5", padding: "2px 6px", borderRadius: 4, whiteSpace: "nowrap" }}>
            require("{m.name}")
          </code>
          <span style={{ color: "#6b7280" }}>{m.desc}</span>
        </div>
      ))}
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "a-few-more-modules",
      title: "A couple more worth knowing: crypto and util",
      summary: "Not covered in their own topic, but common enough to recognize on sight.",
      code: `function App() {
  const modules = [
    { name: "crypto", desc: "Hashing and secure random values, e.g. createHash('sha256')." },
    { name: "util", desc: "Helper functions, most notably promisify() for callback -> Promise conversion." },
  ];

  return (
    <div style={{ display: "grid", gap: 8 }}>
      {modules.map((m) => (
        <div key={m.name} style={{ display: "flex", gap: 10, alignItems: "baseline" }}>
          <code style={{ background: "#111827", color: "#d1fae5", padding: "2px 6px", borderRadius: 4, whiteSpace: "nowrap" }}>
            require("{m.name}")
          </code>
          <span style={{ color: "#6b7280" }}>{m.desc}</span>
        </div>
      ))}
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        process (command-line args, environment variables, exiting) is related to this group too, but is a
        global, not something you require.
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "promisify-real-logic",
      title: "util.promisify's core idea, implemented for real",
      summary: "Wrapping a callback-based function to return a Promise instead — pure JS logic, no OS dependency, so this genuinely runs.",
      code: `// A real (simplified) implementation of the core idea behind util.promisify:
function promisify(fn) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      fn(...args, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  };
}

// An old-style, callback-based function (shaped like a real Node.js API):
function oldStyleDouble(n, callback) {
  setTimeout(() => {
    if (typeof n !== "number") {
      callback(new Error("Expected a number"), null);
      return;
    }
    callback(null, n * 2);
  }, 300);
}

const doubleAsync = promisify(oldStyleDouble);

function App() {
  const [output, setOutput] = useState("");

  async function run() {
    setOutput("Awaiting the promisified function...");
    try {
      const result = await doubleAsync(21);
      setOutput("Result: " + result);
    } catch (err) {
      setOutput("Failed: " + err.message);
    }
  }

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <button onClick={run}>Run doubleAsync(21) with await</button>
      <p>{output || "// click the button"}</p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "how-to-tell-builtin-vs-npm",
      title: "Built-in module vs. an npm package: how to tell",
      summary: "A quick decision guide for a name you don't recognize.",
      code: `function App() {
  const examples = [
    { name: "fs", builtin: true },
    { name: "path", builtin: true },
    { name: "express", builtin: false },
    { name: "react", builtin: false },
    { name: "crypto", builtin: true },
  ];

  return (
    <table style={{ borderCollapse: "collapse", width: "100%", fontSize: 14 }}>
      <thead>
        <tr>
          <th style={{ textAlign: "left", borderBottom: "2px solid #374151", padding: 8 }}>Name</th>
          <th style={{ textAlign: "left", borderBottom: "2px solid #374151", padding: 8 }}>Built into Node.js?</th>
          <th style={{ textAlign: "left", borderBottom: "2px solid #374151", padding: 8 }}>Needs npm install?</th>
        </tr>
      </thead>
      <tbody>
        {examples.map((e) => (
          <tr key={e.name}>
            <td style={{ padding: 8, borderBottom: "1px solid #374151", fontFamily: "monospace" }}>{e.name}</td>
            <td style={{ padding: 8, borderBottom: "1px solid #374151" }}>{e.builtin ? "yes" : "no"}</td>
            <td style={{ padding: 8, borderBottom: "1px solid #374151" }}>{e.builtin ? "no" : "yes"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

render(<App />);`,
    },
  ],
};
