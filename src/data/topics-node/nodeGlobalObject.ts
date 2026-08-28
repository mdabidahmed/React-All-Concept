import type { Topic } from "../../types";

export const nodeGlobalObjectTopic: Topic = {
  id: "node-global-object",
  title: "The Node.js Global Object",
  category: "Node.js Basics",
  shortExplanation: `Every JavaScript environment has a top-level "global object" that's always reachable. In Node.js that's called \`global\`, alongside per-file values like \`__dirname\` and \`__filename\`.

- \`global\` — Node's equivalent of a browser's \`window\`, rarely used directly in modern code
- \`__dirname\` / \`__filename\` — the absolute path to the current file's folder / the current file itself (CommonJS modules only)
- \`globalThis\` — a newer, ==environment-agnostic== way to reach the global object, working identically in Node *and* the browser`,
  longExplanation: `Every JavaScript environment needs some way to expose truly global values and functions — things reachable from anywhere, without an explicit import. How that's exposed has actually changed over JavaScript's history, and Node.js reflects that history directly.

- **\`global\`** is Node's dedicated global object, conceptually parallel to \`window\` in a browser. Anything attached to it (\`global.myValue = 42\`) becomes reachable from any file in the process without an import — but this is now considered poor practice in almost all cases, since it reintroduces exactly the kind of implicit, hard-to-trace shared state that the module system (\`require\`/\`import\`) was designed to avoid. In modern Node.js code, you'll rarely see \`global\` used deliberately at all — it mostly comes up when *reading about* Node's global scope rather than in everyday application code. A few things Node puts there itself are useful to know about though, like \`setTimeout\`/\`setInterval\`/\`console\`, which behave as if they're globally available without ever needing \`global.\` in front of them — Node makes them accessible as bare identifiers, same as a browser does with \`window\`'s properties.
- **\`__dirname\` and \`__filename\`** are not properties of \`global\` — they're special values available inside every **CommonJS** module (a file using \`require\`/\`module.exports\`), and Node computes a different value for each file automatically. \`__filename\` is the absolute path to the current file (e.g. \`/home/user/project/src/app.js\`), and \`__dirname\` is the absolute path to the folder containing it (e.g. \`/home/user/project/src\`). These are extremely useful any time code needs to reference another file *relative to itself* rather than relative to wherever the process happened to be started from — for example, building a path to a config file that sits next to the current script, regardless of which directory the \`node\` command was run from.
- **A key gotcha with \`__dirname\`/\`__filename\`**: they are *not* available in ES modules (files using \`import\`/\`export\`, or any file where \`package.json\` has \`"type": "module"\`) — in ESM, the equivalent information has to be derived from \`import.meta.url\` instead. This is one of the concrete syntax differences between the two module systems, covered in this subject's ES Modules topic.
- **\`globalThis\`** is the newest and most broadly useful of the three, added to the JavaScript language itself (not just Node) specifically to solve environment fragmentation: before it existed, code that needed to reach "the global object, whatever it's called here" had to write awkward environment-detection logic, since it's \`window\` in a browser, \`global\` in Node, and \`self\` in a web worker. \`globalThis\` resolves to the correct one automatically, in every environment, meaning library code that needs to reach the global scope generically no longer needs any environment-specific branching at all. In Node.js, \`globalThis\` and \`global\` refer to the *exact same object* — \`globalThis\` is just the portable name for the same thing.
- **Practical guidance**: reach for \`globalThis\` when writing code meant to run identically in multiple environments; reach for \`__dirname\`/\`__filename\` (or their ESM equivalent) any time file paths need to be built relative to the current file; and avoid attaching your own values to \`global\` directly — pass values explicitly through function parameters, module exports, or a dedicated configuration object instead, the same way you would in any other well-organized codebase.

This sandbox has no real Node.js process, so a genuine \`global\`, \`__dirname\`, or \`__filename\` don't exist here — the examples below simulate \`global\` with a plain object standing in for it, and use representative (rather than real) path strings for \`__dirname\`/\`__filename\`. \`globalThis\`, however, is a real, standard part of JavaScript itself and genuinely exists in this very browser sandbox too — so that part of the comparison below runs for real, not simulated.`,
  examples: [
    {
      id: "simulated-global-object",
      title: "global: a value reachable from anywhere (simulated)",
      summary: "A plain object stands in for Node's real global object, showing what attaching a value to it means.",
      code: `// Standing in for Node's real "global" object:
const global = {};

function setupInFileA() {
  global.appName = "My Node App";
}

function readInFileB() {
  return "Read from another file: " + global.appName;
}

function App() {
  const [output, setOutput] = useState("");

  function run() {
    setupInFileA();
    setOutput(readInFileB());
  }

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <button onClick={run}>Attach a value to global, then read it elsewhere</button>
      <p>{output || "// click the button"}</p>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        This works, but is generally avoided in real Node.js code — it creates implicit, hard-to-trace shared state.
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "dirname-and-filename",
      title: "__dirname and __filename (representative values)",
      summary: "Every CommonJS file gets its own automatically-computed path values — shown here with representative example paths.",
      code: `function App() {
  // Representative values only — a real Node.js process computes these per-file automatically.
  const __filename = "/home/user/project/src/app.js";
  const __dirname = "/home/user/project/src";

  return (
    <div style={{ display: "grid", gap: 8, justifyItems: "start" }}>
      <p>__filename = <code>{__filename}</code></p>
      <p>__dirname &nbsp;= <code>{__dirname}</code></p>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        In real Node.js: path.join(__dirname, "config.json") always resolves next to THIS file,
        no matter which folder the "node" command was run from.
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "globalthis-really-works-here",
      title: "globalThis: genuinely works right here",
      summary: "Unlike global, globalThis is a real part of standard JavaScript — this check runs for real in this sandbox.",
      code: `function App() {
  const [output, setOutput] = useState("");

  function run() {
    // This is a REAL check — globalThis is standard JavaScript, not simulated.
    const isObject = typeof globalThis === "object";
    setOutput("typeof globalThis === 'object' -> " + isObject + " (true in this browser AND in real Node.js)");
  }

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <button onClick={run}>Check globalThis for real</button>
      <p>{output || "// click the button"}</p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "three-globals-compared",
      title: "global vs __dirname/__filename vs globalThis",
      summary: "A quick reference for when each one applies.",
      code: `function App() {
  const rows = [
    { name: "global", availableIn: "Node.js only (CommonJS & ESM)", use: "Rarely used directly today" },
    { name: "__dirname / __filename", availableIn: "Node.js CommonJS files only", use: "Building file paths relative to the current file" },
    { name: "globalThis", availableIn: "Node.js AND browsers (standard JS)", use: "Writing environment-agnostic code" },
  ];

  return (
    <table style={{ borderCollapse: "collapse", width: "100%", fontSize: 14 }}>
      <thead>
        <tr>
          <th style={{ textAlign: "left", borderBottom: "2px solid #374151", padding: 8 }}>Name</th>
          <th style={{ textAlign: "left", borderBottom: "2px solid #374151", padding: 8 }}>Available in</th>
          <th style={{ textAlign: "left", borderBottom: "2px solid #374151", padding: 8 }}>Typical use</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r) => (
          <tr key={r.name}>
            <td style={{ padding: 8, borderBottom: "1px solid #374151", fontFamily: "monospace" }}>{r.name}</td>
            <td style={{ padding: 8, borderBottom: "1px solid #374151" }}>{r.availableIn}</td>
            <td style={{ padding: 8, borderBottom: "1px solid #374151" }}>{r.use}</td>
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
