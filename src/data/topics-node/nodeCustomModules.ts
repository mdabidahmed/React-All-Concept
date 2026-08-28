import type { Topic } from "../../types";

export const nodeCustomModulesTopic: Topic = {
  id: "node-custom-modules",
  title: "Node.js Creating a Custom Module",
  category: "Modules",
  shortExplanation: `Any file you write can become a reusable **module** — just put whatever you want to share onto \`module.exports\`, and \`require\` it from anywhere else in the project.

- No special syntax needed to "declare" a module — every CommonJS file already *is* one
- Group related functions into a single \`module.exports = { ... }\` object for a clean, organized import
- Splitting code into small, focused modules is what makes a growing project stay ==readable and maintainable==`,
  longExplanation: `Every built-in module (\`fs\`, \`path\`, \`events\`) and every npm package (\`express\`, \`react\`) works exactly the same way as a file *you* write yourself — there's no special ceremony to turn a plain file into a "real" module. As soon as a file assigns something to \`module.exports\`, it's a module, ready to be \`require\`d from anywhere else in the project.

- **The basic recipe**: write your functions (or classes, or plain values) normally in a file, then at the bottom (or throughout the file, if you prefer), assign whatever should be usable elsewhere to \`module.exports\`. Anything *not* assigned there — a helper function only used internally, a temporary variable — stays completely private to that file. This is one of the module system's most valuable side effects: it gives every file real, enforced privacy by default, rather than everything living in one shared global scope.
- **Bundling related functions together**: a module doesn't have to export just one thing. A common, clean pattern is exporting a single object grouping several related functions: \`module.exports = { add, subtract, multiply, divide };\`. The file requiring it then gets one namespaced object (\`const mathUtils = require("./mathUtils"); mathUtils.add(2, 3);\`), which reads clearly at the call site and avoids cluttering the importing file with a long list of individually-imported names.
- **Why bother splitting code into modules at all?** A single 2,000-line file is hard to navigate, hard to test in isolation, and hard for more than one person to work on simultaneously without constant merge conflicts. Breaking related functionality into focused, well-named files — a \`mathUtils.js\`, a \`validators.js\`, a \`formatters.js\` — makes each piece easy to find, easy to reason about on its own, and easy to reuse in a completely different project later, since a well-written module generally doesn't depend on anything specific to the project it was first written in.
- **Naming and organizing**: there's no strict rule enforced by Node itself, but a common convention groups related custom modules into a folder (like \`utils/\` or \`lib/\`), each with a name describing what it's responsible for. A module's exported function names should also generally describe *what* they do, independent of *which* file happens to contain them — \`add\` and \`subtract\`, not \`mathUtilsAdd\` and \`mathUtilsSubtract\`, since the act of requiring the module already provides that context (\`mathUtils.add(...)\`).
- **A module can require other modules too**: nothing prevents \`mathUtils.js\` itself from having its own \`require\` calls at the top, pulling in other custom modules or built-in ones — this is exactly how larger Node.js applications compose dozens or hundreds of small, focused files into one working program, each one only needing to understand the small piece it's directly responsible for.

Since this sandbox can't genuinely \`require\` a second file from disk, the example below shows exactly what a real \`mathUtils.js\` file would contain as a clearly labeled block of text, and then defines the *same* functions directly in the example — labeled clearly as standing in for what requiring that file would hand back — so the functions themselves run for real and behave exactly as they would if genuinely imported.`,
  examples: [
    {
      id: "mathutils-module-shown",
      title: "mathUtils.js — a custom module, shown as a file",
      summary: "A realistic small utility module, exporting several related functions as one object.",
      code: `function App() {
  const mathUtilsFile = [
    "// mathUtils.js",
    "function add(a, b) {",
    "  return a + b;",
    "}",
    "function subtract(a, b) {",
    "  return a - b;",
    "}",
    "function isEven(n) {",
    "  return n % 2 === 0;",
    "}",
    "",
    "module.exports = { add, subtract, isEven };",
  ].join("\\n");

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6 }}>{mathUtilsFile}</pre>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        Anything not assigned to module.exports here (there's nothing extra in this example) would stay
        completely private to this file.
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "consuming-the-module",
      title: "Consuming mathUtils — running the exported functions for real",
      summary: "These functions are defined here only because this sandbox is one file — they represent exactly what require('./mathUtils') would hand back.",
      code: `// What require("./mathUtils") would actually return, reproduced directly here
// since this sandbox can't require a real second file from disk:
const mathUtils = {
  add(a, b) {
    return a + b;
  },
  subtract(a, b) {
    return a - b;
  },
  isEven(n) {
    return n % 2 === 0;
  },
};

function App() {
  const [log, setLog] = useState([]);

  function print(value) {
    setLog((prev) => [...prev, value]);
  }

  function run() {
    setLog([]);
    print("mathUtils.add(2, 3) -> " + mathUtils.add(2, 3));
    print("mathUtils.subtract(10, 4) -> " + mathUtils.subtract(10, 4));
    print("mathUtils.isEven(7) -> " + mathUtils.isEven(7));
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={run}>Use the "imported" mathUtils module</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 90 }}>
        {log.length === 0 ? "// output appears here" : log.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "private-vs-exported",
      title: "Private helpers vs. exported functions",
      summary: "A module can keep internal helpers to itself — only what's exported is reachable from outside.",
      code: `function App() {
  const moduleFile = [
    "// validators.js",
    "",
    "// PRIVATE — not exported, invisible outside this file:",
    "function isNonEmptyString(value) {",
    "  return typeof value === 'string' && value.trim().length > 0;",
    "}",
    "",
    "// PUBLIC — this is what require('./validators') actually returns:",
    "function validateUsername(name) {",
    "  return isNonEmptyString(name) && name.length >= 3;",
    "}",
    "",
    "module.exports = { validateUsername };",
    "// Note: isNonEmptyString is NOT exported — a requirer has no access to it at all.",
  ].join("\\n");

  return (
    <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6 }}>{moduleFile}</pre>
  );
}

render(<App />);`,
    },
    {
      id: "a-module-requiring-another-module",
      title: "A module built from other modules",
      summary: "Real applications compose many small custom modules together — shown here as labeled file contents.",
      code: `function App() {
  const orderServiceFile = [
    "// orderService.js",
    "const mathUtils = require('./mathUtils');",
    "const validators = require('./validators');",
    "",
    "function calculateTotal(prices) {",
    "  return prices.reduce((sum, p) => mathUtils.add(sum, p), 0);",
    "}",
    "",
    "module.exports = { calculateTotal };",
  ].join("\\n");

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6 }}>{orderServiceFile}</pre>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        orderService.js is itself a custom module — and it's built by requiring two OTHER custom modules.
        This is how larger Node.js programs are assembled from many small, focused files.
      </p>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
