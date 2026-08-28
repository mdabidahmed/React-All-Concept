import type { Topic } from "../../types";

export const jsIntroductionTopic: Topic = {
  id: "js-introduction",
  title: "JavaScript Introduction",
  category: "JS Basics",
  shortExplanation: `**JavaScript** is the programming language that makes web pages *interactive* — while HTML provides structure and CSS provides style, JavaScript adds behavior: responding to clicks, updating content, validating forms, and much more.

- Runs directly in the browser, no installation needed
- Can also run outside the browser (e.g. **Node.js**) — this app's own React examples are JavaScript (technically TypeScript, a typed superset)
- Historically added to pages via \`console.log()\` for debugging output and \`<script>\` tags for execution`,
  longExplanation: `Of the three core web technologies, JavaScript is the one that makes a page *do* things rather than just display them. HTML describes a document's structure (this is a button, that is a list), CSS describes its appearance (blue, bold, centered), and JavaScript is the programming language that can react to events, change what's on the page after it has already loaded, talk to servers, store data, and run any logic a program needs.

- JavaScript was created in 1995 and, despite the similar name, has no direct relationship to Java — the name was largely a marketing decision at the time
- It's a genuinely full programming language: it has variables, functions, loops, conditionals, objects, and everything else you'd expect, not just a scripting shorthand for animations
- In a real webpage, JavaScript is added via a \`<script>\` tag — either inline (\`<script>...</script>\`) or linked to an external file (\`<script src="app.js"></script>\`) — and the browser executes it as the page loads or in response to events
- \`console.log()\` is the most common way to inspect what a piece of code is actually doing while writing or debugging it — browsers have a **Developer Console** (usually opened with F12) that displays these messages, separate from anything the user sees on the page itself
- JavaScript also runs **outside** the browser: **Node.js** lets the same language run on a server, power command-line tools, and more — meaning JavaScript skills transfer far beyond just webpages

Because this sandbox has no visible browser DevTools console, these topics simulate \`console.log()\` output by appending each logged value to a list rendered directly on the page — the underlying JavaScript behavior demonstrated is identical to what a real \`console.log()\` call would produce.`,
  examples: [
    {
      id: "simulated-console-log",
      title: "Simulating console.log output",
      summary: "Each call appends a line to an on-page list, standing in for the browser's DevTools console.",
      code: `function App() {
  const [log, setLog] = useState([]);

  function print(value) {
    setLog((prev) => [...prev, String(value)]);
  }

  function run() {
    setLog([]);
    print("Hello, JavaScript!");
    print(2 + 2);
    print("The result above came from a real JS expression.");
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={run}>Run code</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 60 }}>
        {log.length === 0 ? "// output appears here" : log.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "js-is-a-real-language",
      title: "JavaScript has real program logic, not just styling",
      summary: "A small function with a loop and a conditional — genuine programming, not markup or style rules.",
      code: `function App() {
  const [log, setLog] = useState([]);

  function print(value) {
    setLog((prev) => [...prev, String(value)]);
  }

  function run() {
    setLog([]);
    for (let i = 1; i <= 5; i++) {
      if (i % 2 === 0) {
        print(i + " is even");
      } else {
        print(i + " is odd");
      }
    }
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={run}>Run loop + conditional</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 100 }}>
        {log.length === 0 ? "// output appears here" : log.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "js-reacts-to-events",
      title: "JavaScript reacting to a real page event",
      summary: "A click event triggers JavaScript that changes what's on the page — the core job of the language in a browser.",
      code: `function App() {
  const [clicks, setClicks] = useState(0);

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <button onClick={() => setClicks((c) => c + 1)}>Click me</button>
      <p>This button has been clicked <strong>{clicks}</strong> time{clicks === 1 ? "" : "s"}.</p>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        Nothing here is HTML or CSS reacting on its own — JavaScript is what listens for the click and updates the count.
      </p>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
