import type { Topic } from "../../types";

export const nodeCommonjsModulesTopic: Topic = {
  id: "node-commonjs-modules",
  title: "Node.js CommonJS Modules",
  category: "Modules",
  shortExplanation: `**CommonJS** is Node's original module system: each file uses \`require("./path")\` to pull in another file's exported values, and \`module.exports\` to declare what it shares.

- \`require("./mathUtils")\` loads a local file (relative paths must start with \`./\` or \`../\`)
- Whatever a file assigns to \`module.exports\` is exactly what a \`require\` of that file receives
- Node ==caches== every required module — a file's top-level code runs only once, no matter how many times it's required`,
  longExplanation: `Before ES modules (\`import\`/\`export\`) came to JavaScript, Node.js already needed a way to split code across files, and it adopted a system called **CommonJS** — still the default in a huge amount of existing Node.js code, and still fully supported today even alongside the newer ES module system.

- **Exporting**: every CommonJS file has an object called \`module.exports\` (an empty object, by default). Whatever you assign to it becomes exactly what another file receives when it \`require\`s this one. A file can export a single function or value (\`module.exports = function add(a, b) { return a + b; }\`), or an object bundling several things together (\`module.exports = { add, subtract };\`) — the second pattern is the more common one, covered in more depth in this subject's "Exporting Multiple Values" topic.
- **Requiring**: \`const mathUtils = require("./mathUtils");\` reads and runs the target file, then hands back whatever that file assigned to \`module.exports\`. The \`./\` prefix is required for local files — without it, \`require\` assumes you mean a package installed in \`node_modules\` (like \`require("express")\`) rather than a file of your own.
- **Path resolution**: when you \`require("./mathUtils")\`, Node doesn't just try that exact filename — it goes through a defined resolution order: first \`./mathUtils.js\`, then \`./mathUtils.json\`, then \`./mathUtils.node\` (a compiled native addon), and if none of those exist but \`./mathUtils\` is actually a *folder*, Node looks for \`./mathUtils/index.js\` inside it. This is why so much CommonJS code simply writes \`require("./utils")\` with no file extension at all — Node fills in the extension automatically by trying each possibility in order.
- **The require cache — this is the important, sometimes-surprising part**: the *first* time any file is required anywhere in a running program, Node actually executes that file's code top to bottom, and stores the resulting \`module.exports\` value in an internal cache, keyed by the file's resolved absolute path. Every *subsequent* \`require\` of that same file — from anywhere else in the program — does **not** re-run the file's code at all. It just returns the exact same cached object instantly. This has two big practical consequences:
  - Any top-level side effect in a module (a \`console.log\`, a database connection being opened, a counter being initialized) happens **exactly once**, the first time the module is required, no matter how many other files require it afterward.
  - Because the *same* object reference is returned every time, mutating an exported object from one file is visible from every other file that required it too — modules aren't silently duplicated or reset.
- **A common mistake**: assuming each \`require\` call gets a "fresh copy" of a module — it doesn't. If a module exports a mutable object with some internal counter, and one file mutates it, every other part of the program sharing that same required module sees the mutated state, because there is only ever one instance of it in memory for the lifetime of the process (the cache is only cleared if the process restarts).

Since this sandbox runs as a single file with no real second file on disk to \`require\`, the first example below shows a realistic second file ("mathUtils.js") as a labeled comment block describing exactly what it would contain, rather than something that actually executes. The caching behavior itself, however, is demonstrated with **real, working JavaScript** — a plain object standing in for Node's internal require cache, alongside a function shaped like \`require\` that checks the cache before running a module's code, which is a faithful, genuinely-executing model of the real mechanism.`,
  examples: [
    {
      id: "commonjs-two-files-shown",
      title: "require and module.exports, shown as two files",
      summary: "mathUtils.js exports two functions; app.js requires the whole file and gets that exact object back.",
      code: `function App() {
  const fileA = [
    "// mathUtils.js",
    "function add(a, b) {",
    "  return a + b;",
    "}",
    "function subtract(a, b) {",
    "  return a - b;",
    "}",
    "",
    "module.exports = { add, subtract };",
  ].join("\\n");

  const fileB = [
    "// app.js",
    "const mathUtils = require('./mathUtils');",
    "",
    "console.log(mathUtils.add(2, 3));       // 5",
    "console.log(mathUtils.subtract(5, 2));  // 3",
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
        This sandbox runs a single file, so this is shown as text rather than a real, executable multi-file require.
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "require-caching-demo",
      title: "The require cache: a module only runs once (real logic)",
      summary: "A working simulation of Node's require() and its internal cache — genuinely demonstrates the caching behavior.",
      code: `// Standing in for the module's own file — this function body represents
// everything that would run at the TOP LEVEL of a real module file.
let timesFileActuallyRan = 0;
function mathUtilsModuleBody() {
  timesFileActuallyRan++;
  return { add: (a, b) => a + b };
}

// A tiny, real implementation of Node's require cache mechanism:
const requireCache = {};
function fakeRequire(path) {
  if (requireCache[path]) {
    return requireCache[path];
  }
  const exportsValue = mathUtilsModuleBody();
  requireCache[path] = exportsValue;
  return exportsValue;
}

function App() {
  const [log, setLog] = useState([]);

  function print(value) {
    setLog((prev) => [...prev, value]);
  }

  function run() {
    setLog([]);
    const first = fakeRequire("./mathUtils");
    print("First require('./mathUtils') -> module body ran " + timesFileActuallyRan + " time(s)");
    const second = fakeRequire("./mathUtils");
    print("Second require('./mathUtils') -> module body ran " + timesFileActuallyRan + " time(s) (still!)");
    print("Same object reference both times? " + (first === second));
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={run}>Require the same module twice</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 90 }}>
        {log.length === 0 ? "// output appears here" : log.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "mutating-a-cached-export",
      title: "Mutating a cached export is visible everywhere it's required",
      summary: "Because require() returns the SAME object every time, a mutation in one place is seen by every other requirer.",
      code: `const requireCache = {};
function counterModuleBody() {
  return { count: 0, increment() { this.count++; } };
}
function fakeRequire(path) {
  if (!requireCache[path]) {
    requireCache[path] = counterModuleBody();
  }
  return requireCache[path];
}

function App() {
  const [log, setLog] = useState([]);

  function print(value) {
    setLog((prev) => [...prev, value]);
  }

  function run() {
    setLog([]);
    const counterInFileA = fakeRequire("./counter");
    counterInFileA.increment();
    counterInFileA.increment();
    print("File A incremented the counter twice. Its value: " + counterInFileA.count);

    const counterInFileB = fakeRequire("./counter");
    print("File B requires the SAME module and sees: " + counterInFileB.count);
    print("(Not 0 — it's literally the same object, not a fresh copy.)");
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={run}>Simulate two files sharing one required module</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 90 }}>
        {log.length === 0 ? "// output appears here" : log.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "path-resolution-order",
      title: "How require resolves a path",
      summary: "The order Node tries file extensions and folder index files when a require path has no extension.",
      code: `function App() {
  const attempts = [
    "require('./mathUtils')",
    "  1. Try file: ./mathUtils.js       <- found here, stop",
    "  2. Try file: ./mathUtils.json",
    "  3. Try file: ./mathUtils.node",
    "  4. Try folder: ./mathUtils/index.js",
  ].join("\\n");

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6 }}>{attempts}</pre>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        This is why so much CommonJS code omits the file extension entirely in its require() calls.
      </p>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
