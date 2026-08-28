import type { Topic } from "../../types";

export const nodeEsModulesTopic: Topic = {
  id: "node-es-modules",
  title: "ES Modules in Node.js",
  category: "Modules",
  shortExplanation: `Node.js also supports **ES Modules** — the standard \`import\`/\`export\` syntax built into the JavaScript language itself — as an alternative to the older CommonJS system.

- Enabled per-project by adding \`"type": "module"\` to \`package.json\`, or per-file with a \`.mjs\` extension
- \`import\` statements are ==hoisted and static== (resolved before any code runs), unlike \`require()\` calls
- ES modules allow **top-level \`await\`** — \`require\` never could`,
  longExplanation: `CommonJS (\`require\`/\`module.exports\`) was Node's module system for most of its history, but it predates JavaScript having any *official*, language-level module syntax. Once TC39 (the committee that standardizes JavaScript) shipped \`import\`/\`export\` as part of the language itself, Node.js added full support for it — and today, both systems coexist across the Node.js ecosystem, with ES modules increasingly the default choice for new projects.

- **Turning ES modules on**: Node.js still treats \`.js\` files as CommonJS by default, for backward compatibility with the enormous amount of existing code depending on that behavior. To use \`import\`/\`export\` syntax, a project needs either \`"type": "module"\` added to its \`package.json\` (which makes *every* \`.js\` file in the project an ES module), or an individual file can be given the \`.mjs\` extension regardless of the project's overall setting. The reverse also exists — a \`.cjs\` extension forces a file to be treated as CommonJS even inside a \`"type": "module"\` project. This dual-extension escape hatch exists specifically so a single project can mix both systems where needed during a migration.
- **Syntax differences that matter in practice**:
  - CommonJS: \`const fs = require("fs");\` — a plain function call, evaluated wherever it appears, at runtime, like any other line of code.
  - ES modules: \`import fs from "fs";\` — a special *declaration*, not a function call. It must appear at the top level of a file (never conditionally inside an \`if\`, unlike \`require\`, which can be called anywhere) and is **hoisted**: all imports are resolved and set up before any of the file's own code runs, regardless of where in the file the \`import\` line is physically written.
  - Because \`import\`/\`export\` are static (the exact set of imports and exports can be determined just by reading the file, without running it), tools can analyze a project's dependency graph and strip out exports nothing uses (tree-shaking) — something far harder to do reliably with dynamic \`require()\` calls, whose argument could technically be a variable computed at runtime.
- **Top-level \`await\`**: inside an ES module, \`await\` can be used directly at the top level of the file, outside any \`async function\` — for example, \`const data = await fetchConfig();\` as one of the first lines in the file. CommonJS never allowed this (\`await\` outside an \`async function\` was always a syntax error there), since \`require()\` itself is fundamentally synchronous. This makes ES modules noticeably nicer for startup code that genuinely needs to wait on something asynchronous — like loading configuration or connecting to a database — before the rest of the module can run.
- **No \`__dirname\`/\`__filename\` in ES modules**: as covered in the Global Object topic, these two CommonJS-only values aren't available in an ES module — the equivalent path information is derived from \`import.meta.url\` instead.
- **Interop**: an ES module can \`import\` a CommonJS module without much friction (Node handles the conversion automatically in most cases), but the reverse — a CommonJS file using \`require()\` to load a genuine ES module — generally does *not* work directly, because \`require()\` is synchronous and loading an ES module is fundamentally an asynchronous operation. This asymmetry is one of the most common practical snags when a codebase mixes both systems.
- **Both are here to stay, for now**: an enormous amount of existing Node.js code, and many published npm packages, still use CommonJS, so understanding \`require\`/\`module.exports\` remains necessary even as \`import\`/\`export\` becomes the more common choice for new code.

This sandbox evaluates each example as a single self-contained script for react-live, which doesn't support top-level \`import\`/\`export\` declarations the way a real multi-file Node.js (or bundler) project does. So, exactly like this subject's CommonJS topic, the examples below show the real \`import\`/\`export\` syntax and a second file's contents as clearly labeled text, alongside a genuine, running demonstration of the *behavioral* differences (like top-level await) using patterns that are valid within a single script.`,
  examples: [
    {
      id: "esm-two-files-shown",
      title: "import / export, shown as two files",
      summary: "The ES module equivalent of the CommonJS require()/module.exports example.",
      code: `function App() {
  const fileA = [
    "// mathUtils.js  (inside a \\"type\\": \\"module\\" project)",
    "export function add(a, b) {",
    "  return a + b;",
    "}",
    "export function subtract(a, b) {",
    "  return a - b;",
    "}",
  ].join("\\n");

  const fileB = [
    "// app.js",
    "import { add, subtract } from './mathUtils.js';",
    "",
    "console.log(add(2, 3));       // 5",
    "console.log(subtract(5, 2));  // 3",
  ].join("\\n");

  return (
    <div style={{ display: "grid", gap: 12 }}>
      <div>
        <p style={{ margin: "0 0 4px", fontWeight: 600 }}>File 1</p>
        <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6 }}>{fileA}</pre>
      </div>
      <div>
        <p style={{ margin: "0 0 4px", fontWeight: 600 }}>File 2</p>
        <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6 }}>{fileB}</pre>
      </div>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        Note the required .js extension in the import path — ES modules, unlike CommonJS, generally require it.
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "commonjs-vs-esm-syntax",
      title: "CommonJS vs. ES Modules, side by side",
      summary: "The same two operations, written both ways.",
      code: `function App() {
  const rows = [
    { op: "Import a module", cjs: "const x = require('./x')", esm: "import x from './x.js'" },
    { op: "Named export", cjs: "module.exports = { add }", esm: "export function add() {}" },
    { op: "Enable it", cjs: "default behavior", esm: "\\"type\\": \\"module\\" in package.json" },
    { op: "Can be conditional?", cjs: "yes (require anywhere)", esm: "no (import is static, top-level only)" },
    { op: "Top-level await?", cjs: "not allowed", esm: "allowed" },
  ];

  return (
    <table style={{ borderCollapse: "collapse", width: "100%", fontSize: 13 }}>
      <thead>
        <tr>
          <th style={{ textAlign: "left", borderBottom: "2px solid #374151", padding: 8 }}>Operation</th>
          <th style={{ textAlign: "left", borderBottom: "2px solid #374151", padding: 8 }}>CommonJS</th>
          <th style={{ textAlign: "left", borderBottom: "2px solid #374151", padding: 8 }}>ES Modules</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r) => (
          <tr key={r.op}>
            <td style={{ padding: 8, borderBottom: "1px solid #374151" }}>{r.op}</td>
            <td style={{ padding: 8, borderBottom: "1px solid #374151", fontFamily: "monospace" }}>{r.cjs}</td>
            <td style={{ padding: 8, borderBottom: "1px solid #374151", fontFamily: "monospace" }}>{r.esm}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

render(<App />);`,
    },
    {
      id: "top-level-await-demo",
      title: "Top-level await: real behavior, ES-modules-only",
      summary: "An async IIFE stands in for a real ES module's top level, since react-live evaluates each example as one script.",
      code: `function App() {
  const [log, setLog] = useState([]);

  function print(value) {
    setLog((prev) => [...prev, value]);
  }

  function fetchConfig() {
    return new Promise((resolve) => {
      setTimeout(() => resolve({ port: 3000 }), 400);
    });
  }

  async function run() {
    setLog(["Simulating a real ES module's top level:"]);
    // In a real .mjs file (or "type": "module" project), this "await" could sit
    // directly at the top level of the file, with no wrapping function at all:
    print("const config = await fetchConfig();  // <- valid at top level in ESM");
    const config = await fetchConfig();
    print("Config loaded: port " + config.port);
    print("CommonJS could never do this — require() has no async form like this.");
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={run}>Simulate a module awaiting startup config</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 90 }}>
        {log.length === 0 ? "// output appears here" : log.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "import-is-hoisted",
      title: "Imports are hoisted — order in the file doesn't matter",
      summary: "Real behavior: functions defined further down are just as usable as if declared first, since resolution happens before execution.",
      code: `function App() {
  const [output, setOutput] = useState("");

  function run() {
    // This mirrors how an ES module works: greet() is available immediately,
    // as if it had already been fully "imported", regardless of source order.
    setOutput(greet("Ada"));
  }

  // Written AFTER it's used above — real import/export declarations are hoisted
  // the same way, so this ordering would work identically in an ES module.
  function greet(name) {
    return "Hello, " + name + "!";
  }

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <button onClick={run}>Call a function "imported" before its own definition</button>
      <p>{output || "// click the button"}</p>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
