import type { Topic } from "../../types";

export const nodeReplRunningFilesTopic: Topic = {
  id: "node-repl-running-files",
  title: "The Node.js REPL and Running Files",
  category: "Node.js Basics",
  shortExplanation: `Typing \`node\` with no arguments in a terminal opens the **REPL** — Read, Eval, Print, Loop — an interactive prompt that runs one JavaScript expression at a time and immediately shows the result.

- \`node\` — opens the interactive REPL
- \`node filename.js\` — runs an entire script file from top to bottom, non-interactively
- \`node --version\` (or \`node -v\`) — prints the installed Node.js version and exits`,
  longExplanation: `Node.js can be used two very different ways from a terminal, and knowing when to reach for each one is a basic but important habit.

- **The REPL** (Read-Eval-Print-Loop) is what starts when you type just \`node\` and press enter, with no filename after it. It's an interactive prompt — you type one line of JavaScript, press enter, and Node immediately **R**eads what you typed, **E**valuates it, **P**rints the result, then **L**oops back to wait for your next line. It's the same core idea as a browser's DevTools console, but running in a real Node.js environment instead of a browser tab, so \`process\`, \`require\`, and other Node globals are all available to experiment with directly. The REPL is ideal for quickly checking how a piece of syntax behaves, testing a small function, or exploring an API — nobody writes a real application inside the REPL, since anything typed there disappears the moment the session ends and there's no way to save or easily edit multi-line code.
- **Running a file** is what you do for anything that should actually persist: \`node app.js\` tells Node to read the entire \`app.js\` file, execute it top to bottom, and then exit (unless the script itself does something that keeps the process alive, like starting an HTTP server or setting up a timer). This is how virtually all real Node.js programs are actually run — the REPL is for exploration, running a file is for execution.
- **A crucial REPL detail**: each line you type is evaluated *and its result is printed automatically*, even without calling \`console.log\`. Typing \`2 + 2\` in the REPL shows \`4\` immediately. This is *not* true inside a regular script file — running \`node app.js\` prints absolutely nothing unless the code explicitly calls \`console.log\` (or writes output some other way). This trips up beginners moving from the REPL to real files: code that "worked" (produced visible output) in the REPL appears to silently do nothing when saved to a file and run with \`node app.js\`, simply because the automatic result-printing behavior doesn't apply outside the REPL.
- \`node --version\` (or the short form \`node -v\`) doesn't start anything interactive — it just prints the currently installed Node.js version string (like \`v20.11.0\`) and immediately exits. This is one of the first things worth checking on any machine, since Node.js version differences can matter a great deal (a project requiring a very recent Node version simply won't run correctly, or at all, on an old one). Similarly, \`npm --version\` reports the version of npm that shipped alongside that Node.js installation.
- **Exiting the REPL**: typing \`.exit\`, or pressing Ctrl+C twice in a row, closes the REPL session and returns to the regular terminal prompt.
- The REPL also understands a few special dot-commands beyond \`.exit\` — \`.help\` lists them, and \`.editor\` switches into a mode for pasting in multi-line code blocks that would otherwise be awkward to type one line at a time.

Since this sandbox is a browser page with no real terminal or Node.js process behind it, none of these commands can actually be executed here. The examples below use the same simulated \`log\`/\`print\` pattern used throughout this subject to accurately show what typing each command into a real terminal would look like and print, so the mental model transfers directly the first time you try it in a real terminal.`,
  examples: [
    {
      id: "simulated-repl-session",
      title: "A simulated REPL session",
      summary: "Click to 'type' a few expressions and watch the REPL evaluate and print each one automatically.",
      code: `function App() {
  const [history, setHistory] = useState([]);

  function typeExpression(expr, result) {
    setHistory((prev) => [...prev, "> " + expr, result]);
  }

  const steps = [
    { expr: "2 + 2", result: "4" },
    { expr: "typeof process", result: "'object'" },
    { expr: "[1, 2, 3].map(n => n * 2)", result: "[ 2, 4, 6 ]" },
  ];

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {steps.map((s) => (
          <button key={s.expr} onClick={() => typeExpression(s.expr, s.result)}>
            Type: {s.expr}
          </button>
        ))}
        <button onClick={() => setHistory([])}>Clear</button>
      </div>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 120 }}>
        {history.length === 0 ? "$ node\\n// waiting for input..." : "$ node\\n" + history.join("\\n")}
      </pre>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        Notice each result prints automatically — no console.log needed in the REPL.
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "running-a-script-file",
      title: "Running a script file with node app.js",
      summary: "A file only prints something if the code inside it explicitly says so.",
      code: `function App() {
  const [output, setOutput] = useState("");

  const fileContents = [
    "// app.js",
    "const total = 2 + 2;",
    "console.log('The total is:', total);",
  ].join("\\n");

  function runFile() {
    setOutput("$ node app.js\\nThe total is: 4");
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <p style={{ margin: 0, fontWeight: 600 }}>app.js contents:</p>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6 }}>{fileContents}</pre>
      <button onClick={runFile}>Run: node app.js</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 50 }}>
        {output || "// terminal output appears here"}
      </pre>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        Only the explicit console.log call produced output — unlike the REPL, nothing is printed automatically.
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "version-and-help-commands",
      title: "node --version and other one-shot commands",
      summary: "Some commands print one line of information and exit immediately, with no interactive session.",
      code: `function App() {
  const [output, setOutput] = useState("");

  const commands = [
    { cmd: "node --version", result: "v20.11.0" },
    { cmd: "node -v", result: "v20.11.0" },
    { cmd: "npm --version", result: "10.2.4" },
  ];

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {commands.map((c) => (
          <button key={c.cmd} onClick={() => setOutput("$ " + c.cmd + "\\n" + c.result)}>
            Run: {c.cmd}
          </button>
        ))}
      </div>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 50 }}>
        {output || "// terminal output appears here"}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "repl-vs-file-differences",
      title: "REPL vs. running a file, side by side",
      summary: "The same two behaviors that most often confuse beginners moving between the two.",
      code: `function App() {
  const rows = [
    { aspect: "Started by", repl: "node (no arguments)", file: "node filename.js" },
    { aspect: "Auto-prints each result?", repl: "yes", file: "no — only explicit console.log" },
    { aspect: "Multi-line code?", repl: "awkward (use .editor mode)", file: "natural — it's a whole file" },
    { aspect: "Typical use", repl: "quick experiments", file: "real programs" },
  ];

  return (
    <table style={{ borderCollapse: "collapse", width: "100%", fontSize: 14 }}>
      <thead>
        <tr>
          <th style={{ textAlign: "left", borderBottom: "2px solid #374151", padding: 8 }}>Aspect</th>
          <th style={{ textAlign: "left", borderBottom: "2px solid #374151", padding: 8 }}>REPL</th>
          <th style={{ textAlign: "left", borderBottom: "2px solid #374151", padding: 8 }}>Running a file</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r) => (
          <tr key={r.aspect}>
            <td style={{ padding: 8, borderBottom: "1px solid #374151" }}>{r.aspect}</td>
            <td style={{ padding: 8, borderBottom: "1px solid #374151" }}>{r.repl}</td>
            <td style={{ padding: 8, borderBottom: "1px solid #374151" }}>{r.file}</td>
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
