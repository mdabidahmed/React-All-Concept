import type { Topic } from "../../types";

export const nodeExportingMultipleTopic: Topic = {
  id: "node-exporting-multiple",
  title: "Node.js Exporting Multiple Values",
  category: "Modules",
  shortExplanation: `A CommonJS module can share several values two ways: replacing the whole object with \`module.exports = { a, b }\`, or adding properties one at a time with \`exports.a = ...\`.

- \`module.exports = { add, subtract }\` — replaces the entire exports object in one line
- \`exports.add = ...; exports.subtract = ...;\` — adds properties onto the *existing* exports object
- The footgun: reassigning \`exports = { ... }\` directly ==silently exports nothing== — it breaks the link back to \`module.exports\` entirely`,
  longExplanation: `Exporting more than one value from a CommonJS module is extremely common — a utility file rarely has just one function worth sharing — and there are two legitimate ways to do it, plus one very tempting way that looks almost identical but is actually broken.

- **Method 1 — replace \`module.exports\` entirely**: \`module.exports = { add, subtract, multiply };\` throws away whatever \`module.exports\` used to be (an empty object, by default) and replaces it outright with a brand-new object containing exactly the three named functions. This is probably the single most common pattern in real-world CommonJS code, usually written as one line near the bottom of the file, after every function it references has already been defined above it.
- **Method 2 — add properties onto the existing \`exports\` object, one at a time**: \`exports.add = function (a, b) { ... };\` followed later by \`exports.subtract = function (a, b) { ... };\`. This works because Node gives every module a variable called \`exports\` that, at the very start, points to the *exact same object* as \`module.exports\`. Adding a property to \`exports\` is really just adding a property to that shared object — and since \`require()\` always hands back whatever \`module.exports\` ends up pointing to, those added properties show up for the requirer too.
- **The critical difference between the two methods, and where the footgun lives**: \`exports\` is just a plain variable — a convenient *nickname* that initially points to the same object as \`module.exports\`, nothing more. Adding a *property* to that object (\`exports.add = ...\`) works fine, because you're mutating the object both names are pointing to. But **reassigning the \`exports\` variable itself** — \`exports = { add, subtract };\` — does something completely different: it makes the local \`exports\` variable point to a *brand-new* object, while \`module.exports\` keeps pointing to the original, now-abandoned one. Since \`require()\` only ever looks at \`module.exports\`, not the local \`exports\` variable, this new object is never seen by anything outside the file — the module silently exports an empty object, and every function you thought you were exporting is completely unreachable from the outside, with **no error, no warning, nothing** to indicate anything went wrong. This is one of the most common real bugs new Node.js developers hit, and it's confusing precisely because the broken version (\`exports = {...}\`) looks almost identical to the correct one (\`module.exports = {...}\`).
- **The simple rule that avoids the whole problem**: if you want to replace the whole exports object in one assignment, always assign to \`module.exports\`, never to bare \`exports\`. Reserve bare \`exports.something = ...\` only for *adding a single property at a time* to the object that's already there. Many style guides go further and recommend picking exactly one of the two methods per file and using it consistently, rather than mixing both in the same module.
- **Why does this design exist at all, instead of just having one clearly-named variable?** \`exports\` exists purely as a shorthand convenience for the extremely common case of adding several properties one at a time without having to type \`module.exports.\` in front of each one. It was a reasonable ergonomic shortcut, but its similarity to \`module.exports\` — and the way reassigning it fails completely silently — is a widely-recognized rough edge in the language design that every Node.js developer eventually learns about, usually by accidentally hitting it once.

This is pure JavaScript object and reference-assignment behavior — nothing here depends on any real file system, network, or OS feature — so unlike most of this subject's topics, this one needs no simulation at all. The examples below are a genuine, faithful reproduction of the real mechanism, including a working demonstration of the broken \`exports = {...}\` pattern actually failing to export anything, exactly as it would in real Node.js.`,
  examples: [
    {
      id: "method-one-replace-module-exports",
      title: "Method 1: module.exports = { ... }",
      summary: "Replacing the whole exports object at once — the most common real-world pattern.",
      code: `// Standing in for a module's own private module.exports object, initialized
// empty exactly the way Node initializes it for every real file:
const fakeModule = { exports: {} };

function add(a, b) {
  return a + b;
}
function subtract(a, b) {
  return a - b;
}

// Method 1: replace the whole object in one line.
fakeModule.exports = { add, subtract };

function App() {
  const [output, setOutput] = useState("");

  function run() {
    setOutput(
      "typeof fakeModule.exports.add -> " + typeof fakeModule.exports.add + "\\n" +
      "fakeModule.exports.add(2, 3) -> " + fakeModule.exports.add(2, 3)
    );
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={run}>Check what got exported</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 60 }}>
        {output || "// output appears here"}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "method-two-add-properties",
      title: "Method 2: exports.name = ... (adding properties)",
      summary: "exports starts out pointing to the SAME object as module.exports — adding a property to it works fine.",
      code: `const fakeModule = { exports: {} };
// "exports" starts as a nickname pointing to the exact same object as fakeModule.exports:
let exportsVar = fakeModule.exports;

exportsVar.add = function (a, b) {
  return a + b;
};
exportsVar.subtract = function (a, b) {
  return a - b;
};

function App() {
  const [output, setOutput] = useState("");

  function run() {
    setOutput(
      "fakeModule.exports.add(4, 5) -> " + fakeModule.exports.add(4, 5) + "\\n" +
      "fakeModule.exports.subtract(9, 3) -> " + fakeModule.exports.subtract(9, 3) + "\\n" +
      "Same object? " + (fakeModule.exports === exportsVar)
    );
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={run}>Check what got exported</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 80 }}>
        {output || "// output appears here"}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "the-broken-pattern",
      title: "The footgun: reassigning exports directly (what goes wrong)",
      summary: "This looks almost identical to the working version above, but silently exports nothing at all.",
      code: `const fakeModule = { exports: {} };
let exportsVar = fakeModule.exports; // starts pointing at the same object as fakeModule.exports

function add(a, b) {
  return a + b;
}
function subtract(a, b) {
  return a - b;
}

// THE BUG: this reassigns the local "exportsVar" variable to point to a
// brand-new object — it does NOT update fakeModule.exports at all.
exportsVar = { add, subtract };

function App() {
  const [output, setOutput] = useState("");

  function run() {
    setOutput(
      "exportsVar.add(2, 3) -> " + exportsVar.add(2, 3) + "  (looks fine locally!)\\n" +
      "But require() only ever returns fakeModule.exports, not exportsVar:\\n" +
      "typeof fakeModule.exports.add -> " + typeof fakeModule.exports.add + "\\n" +
      "Object.keys(fakeModule.exports) -> [" + Object.keys(fakeModule.exports).join(", ") + "]\\n" +
      "The requirer gets NOTHING — the reassignment broke the link back to module.exports."
    );
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={run}>See what a requirer of this module would actually get</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 110 }}>
        {output || "// output appears here"}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "side-by-side-comparison",
      title: "All three patterns, side by side",
      summary: "A quick reference for which pattern is safe and which one to avoid.",
      code: `function App() {
  const rows = [
    { pattern: "module.exports = { a, b }", result: "Works — replaces the object require() actually returns." },
    { pattern: "exports.a = ...; exports.b = ...;", result: "Works — mutates the same object module.exports points to." },
    { pattern: "exports = { a, b }", result: "BROKEN — only rebinds the local variable, module.exports is untouched." },
  ];

  return (
    <table style={{ borderCollapse: "collapse", width: "100%", fontSize: 13 }}>
      <thead>
        <tr>
          <th style={{ textAlign: "left", borderBottom: "2px solid #374151", padding: 8 }}>Pattern</th>
          <th style={{ textAlign: "left", borderBottom: "2px solid #374151", padding: 8 }}>What happens</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r) => (
          <tr key={r.pattern}>
            <td style={{ padding: 8, borderBottom: "1px solid #374151", fontFamily: "monospace", whiteSpace: "nowrap" }}>
              {r.pattern}
            </td>
            <td style={{ padding: 8, borderBottom: "1px solid #374151" }}>{r.result}</td>
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
