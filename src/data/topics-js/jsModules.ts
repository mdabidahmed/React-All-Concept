import type { Topic } from "../../types";

export const jsModulesTopic: Topic = {
  id: "js-modules",
  title: "JavaScript Modules",
  category: "Advanced Concepts",
  shortExplanation: `A **module** is just a JavaScript file that explicitly declares what it shares with other files (\`export\`) and what it needs from them (\`import\`) — instead of every script dumping variables into one shared global space.

- \`export\` (named) shares a value under a specific name; \`export default\` marks one primary value a file hands out
- \`import { name } from "./file.js"\` pulls in named exports; \`import name from "./file.js"\` pulls in a default export
- Modules exist to split a large program across multiple files while avoiding ==global namespace pollution== — two files can each have their own \`helper\` without colliding`,
  longExplanation: `Before JavaScript had real modules, splitting a program across multiple files meant loading each one with its own \`<script>\` tag, and every one of those scripts ran in the exact same shared global scope — a variable named \`data\` declared in one file could silently collide with a \`data\` in another, and the order the \`<script>\` tags appeared in the HTML mattered enormously, since a later file could only use something an earlier file had already defined. Large projects built this way became fragile: it was easy to break something by simply reordering script tags, and there was no way to tell, just by reading one file, exactly what it depended on from elsewhere.

The **module** system fixes this by giving every file its **own private scope** by default. Nothing declared inside a module — a variable, a function, a class — is visible outside it unless the module explicitly hands it out with the \`export\` keyword. This eliminates accidental collisions entirely: two completely unrelated files can each declare their own \`function helper() {}\` with zero conflict, because neither is ever placed in a shared global space.

There are two flavors of export. A **named export** shares a specific value under its own name, and a single file can have as many as it needs: \`export function add(a, b) { return a + b; }\` and \`export const PI = 3.14159;\` could both live in the same file. A **default export** marks one value as a file's primary, "main" output, and a file can have at most one: \`export default function formatCurrency(n) { ... }\`. On the receiving end, \`import { add, PI } from "./mathUtils.js"\` pulls in named exports by their exact exported name (though \`import { add as sum }\` can rename one on the way in), while \`import formatCurrency from "./format.js"\` pulls in a default export under whatever local name you choose to give it — no curly braces, and the name doesn't have to match anything from the original file.

Beyond just organization, explicit \`import\`/\`export\` statements let tools **see the dependency graph** of a project without running any code — a bundler can trace exactly which files depend on which, and even strip out exports that nothing ever actually imports (a technique called *tree-shaking*), something that was essentially impossible to do reliably with old-style global scripts.

This sandbox runs every example as a single, self-contained file, so it genuinely cannot demonstrate a real import pulling from a second, separate file the way an actual project would. The examples below show the correct \`export\`/\`import\` syntax as illustrative text, with a clear description of exactly what a real second file would contain, alongside a working demonstration of the actual behavior an import would give you once the values are in scope.`,
  examples: [
    {
      id: "named-exports-and-imports",
      title: "Named exports and imports, shown as two files",
      summary: "mathUtils.js exports two named values; app.js imports them by name.",
      code: `function App() {
  const fileA = [
    "// mathUtils.js",
    "export function add(a, b) {",
    "  return a + b;",
    "}",
    "",
    "export const PI = 3.14159;",
  ].join("\\n");

  const fileB = [
    "// app.js",
    "import { add, PI } from './mathUtils.js';",
    "",
    "console.log(add(2, 3));  // 5",
    "console.log(PI);         // 3.14159",
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
        This sandbox runs a single file, so this is shown as text rather than a real, executable multi-file import.
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "default-export-and-import",
      title: "A default export, shown as two files",
      summary: "A file can have only one default export, and the importer can name it anything.",
      code: `function App() {
  const fileA = [
    "// formatCurrency.js",
    "export default function formatCurrency(amount) {",
    "  return '$' + amount.toFixed(2);",
    "}",
  ].join("\\n");

  const fileB = [
    "// app.js",
    "import formatCurrency from './formatCurrency.js';",
    "",
    "console.log(formatCurrency(19.9));  // $19.90",
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
        No curly braces for a default import — and the local name ("formatCurrency" here) doesn't have to match anything.
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "the-behavior-a-real-import-would-give-you",
      title: "The behavior a real import would give you",
      summary: "Defined locally here only because this sandbox is a single file — it would work identically imported.",
      code: `function App() {
  // In a real project, this function would live in its own file (e.g. dateUtils.js)
  // and be pulled in with: import { formatDate } from "./dateUtils.js";
  function formatDate(date) {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    return day + "/" + month + "/" + date.getFullYear();
  }

  const [log, setLog] = useState([]);

  function print(value) {
    setLog((prev) => [...prev, String(value)]);
  }

  function run() {
    setLog([]);
    print("formatDate(new Date()): " + formatDate(new Date()));
    print("This function behaves exactly the same whether it is defined locally or imported from another module.");
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={run}>Run the "imported" function</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 90 }}>
        {log.length === 0 ? "// output appears here" : log.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "renaming-a-named-import-with-as",
      title: "Renaming an import with as",
      summary: "The local name is just a nickname — the underlying function is identical either way.",
      code: `function App() {
  // In a real project: import { reverse as flip } from "./stringUtils.js";
  // The imported binding can be renamed on the way in — "flip" here is just
  // a local nickname for the function actually named "reverse" in its own file.
  function reverse(str) {
    return str.split("").reverse().join("");
  }
  const flip = reverse;

  const [text, setText] = useState("hello");

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <input value={text} onChange={(e) => setText(e.target.value)} style={{ padding: 8, width: 200 }} />
      <p>flip(text): <strong>{flip(text)}</strong></p>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        Renaming with "as" only changes the local name used to call it — the underlying function is identical.
      </p>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
