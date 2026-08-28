import type { Topic } from "../../types";

export const jsDebuggingTopic: Topic = {
  id: "js-debugging",
  title: "JavaScript Debugging",
  category: "Browser & Modern JS",
  shortExplanation: `Debugging is the process of figuring out *why* code isn't doing what you expect — and the browser's DevTools console is the primary tool for it, offering far more than just \`console.log()\`.

- \`console.error()\` and \`console.warn()\` print styled, more prominent messages, and both include a stack trace automatically
- \`console.table()\` prints an array of objects as an actual, readable table instead of a nested wall of text
- Setting a **breakpoint** in DevTools' Sources panel pauses execution entirely at that line, letting you inspect every variable's live value at that exact moment — something no \`console.log()\` can fully substitute for`,
  longExplanation: `Debugging is the skill of methodically figuring out why a program isn't behaving the way you expect, and \`console.log()\` — while genuinely the most-used tool for the job — is only the entry point into a much larger toolkit the browser's **DevTools** provide.

Beyond plain \`console.log()\`, a few other console methods exist specifically to make certain kinds of output easier to spot or read. \`console.error()\` and \`console.warn()\` print messages with distinct styling (typically red and yellow respectively) that stand out visually from ordinary log output, and both automatically attach a **stack trace** — showing not just the message, but exactly which chain of function calls led to that point — which plain \`console.log()\` doesn't do. DevTools consoles also let you filter to show only errors, only warnings, or everything, which matters once a page is producing a lot of console noise. \`console.table()\` solves a specific, common annoyance: logging an array of similar objects with \`console.log()\` produces a deeply nested, hard-to-scan structure, while \`console.table(arrayOfObjects)\` renders the exact same data as an actual row-and-column table, with one column per property — dramatically easier to scan for a specific value or an outlier.

The most powerful tool \`console.log()\` can't fully replace is the **breakpoint**, set inside DevTools' *Sources* panel (this sandbox has no visible DevTools panel of its own, so breakpoints can only be described here, not demonstrated). Clicking next to a line number in the Sources panel tells the browser to *completely pause* JavaScript execution the moment it reaches that line — not just print something and keep going, but genuinely freeze the program mid-execution. While paused, every variable currently in scope can be inspected at its exact live value, the call stack panel shows precisely how execution arrived at that line, and step controls (step over, step into, step out) let you advance the program one statement — or one function call — at a time, watching values change in real time. This is categorically more powerful than sprinkling \`console.log()\` calls everywhere, though it does require the code to actually be reachable in a running page, which is why both tools coexist in practice: quick sanity checks often still reach for \`console.log()\`, while a genuinely confusing bug usually calls for a real breakpoint session.

Reading a **stack trace** is its own small skill. The first line is normally the error message itself; every line beneath it, usually prefixed with "at", is one *frame* — one function call — read **top to bottom as most-recent-call-first**: the very first "at" line is where the error was actually thrown, and each line below it is the function that called the one above, all the way back to wherever the whole chain started. Each frame typically also names the file, line, and column the call happened at, which is usually the fastest way to jump straight to the relevant source location.

Beyond specific tools, a few general strategies consistently pay off when hunting a stubborn bug. **Bisecting** — commenting out or disabling roughly half of the suspect code, checking whether the bug is still there, then repeating on whichever half it's still in — narrows down a bug's location with surprising speed, the same way a binary search narrows down a sorted list. **Checking actual types**, with a quick \`typeof value\` or \`console.log(value)\`, catches an enormous share of real bugs, since a huge number of JavaScript issues come down to a value silently being a string instead of a number, or \`undefined\` instead of the object that was expected. And reading an error message's full text carefully — rather than skimming past it — often states almost exactly what went wrong and where; it's easy to underestimate how much information JavaScript's own error messages already hand you for free.`,
  examples: [
    {
      id: "log-warn-error-severities",
      title: "Simulating console.log / warn / error severities",
      summary: "Each severity gets its own styled prefix, standing in for DevTools' color-coded output.",
      code: `function App() {
  const [log, setLog] = useState([]);

  function print(kind, message) {
    setLog((prev) => [...prev, { kind, message }]);
  }

  function run() {
    setLog([]);
    print("log", "Fetching user data...");
    print("warn", "API response took longer than expected");
    print("error", "Failed to parse the response");
  }

  const colors = { log: "#d1fae5", warn: "#fde68a", error: "#fca5a5" };
  const prefixes = { log: "LOG", warn: "WARN", error: "ERROR" };

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={run}>Simulate console.log / warn / error</button>
      <pre style={{ background: "#111827", padding: 12, borderRadius: 6, minHeight: 100 }}>
        {log.length === 0
          ? "// output appears here"
          : log.map((entry, i) => (
              <div key={i} style={{ color: colors[entry.kind] }}>
                [{prefixes[entry.kind]}] {entry.message}
              </div>
            ))}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "console-table-simulation",
      title: "What console.table() actually renders",
      summary: "A real HTML table standing in for DevTools' row-and-column console.table output.",
      code: `function App() {
  const [showTable, setShowTable] = useState(false);
  const users = [
    { id: 1, name: "Ada", role: "Engineer" },
    { id: 2, name: "Grace", role: "Admiral" },
    { id: 3, name: "Linus", role: "Maintainer" },
  ];

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <button onClick={() => setShowTable(true)}>console.table(users)</button>
      {showTable && (
        <table style={{ borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ border: "1px solid #374151", padding: 6 }}>(index)</th>
              <th style={{ border: "1px solid #374151", padding: 6 }}>id</th>
              <th style={{ border: "1px solid #374151", padding: 6 }}>name</th>
              <th style={{ border: "1px solid #374151", padding: 6 }}>role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, i) => (
              <tr key={user.id}>
                <td style={{ border: "1px solid #374151", padding: 6 }}>{i}</td>
                <td style={{ border: "1px solid #374151", padding: 6 }}>{user.id}</td>
                <td style={{ border: "1px solid #374151", padding: 6 }}>{user.name}</td>
                <td style={{ border: "1px solid #374151", padding: 6 }}>{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        A real console.table() renders exactly this kind of row-and-column layout, right inside DevTools.
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "reading-a-stack-trace",
      title: "Reading a real stack trace",
      summary: "A genuine thrown Error, propagated through three nested calls, with a real error.stack.",
      code: `function App() {
  const [log, setLog] = useState([]);

  function print(value) {
    setLog((prev) => [...prev, String(value)]);
  }

  function stepThree() {
    throw new Error("Something went wrong in stepThree");
  }

  function stepTwo() {
    stepThree();
  }

  function stepOne() {
    stepTwo();
  }

  function run() {
    setLog([]);
    try {
      stepOne();
    } catch (error) {
      print("error.message: " + error.message);
      print("--- error.stack (real stack trace) ---");
      print(error.stack);
    }
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={run}>Throw through three nested calls</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 160, whiteSpace: "pre-wrap" }}>
        {log.length === 0 ? "// output appears here" : log.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "bisecting-strategy-demo",
      title: "Bisecting: isolating which step is broken",
      summary: "Running each step one at a time until the failing one is found, instead of guessing.",
      code: `function App() {
  const [log, setLog] = useState([]);

  function print(value) {
    setLog((prev) => [...prev, String(value)]);
  }

  const steps = [
    { name: "parseInput", run: () => 10 },
    { name: "validateRange", run: () => true },
    { name: "computeTotal", run: () => { throw new Error("Division by zero"); } },
    { name: "formatOutput", run: () => "$10.00" },
  ];

  function run() {
    setLog([]);
    print("Bisecting: checking steps one at a time...");
    for (const step of steps) {
      try {
        step.run();
        print(step.name + ": OK");
      } catch (error) {
        print(step.name + ": FAILED — " + error.message);
        print("Found it — the bug is inside " + step.name + "()");
        break;
      }
    }
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={run}>Run steps one at a time to isolate the bug</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 130 }}>
        {log.length === 0 ? "// output appears here" : log.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
