import type { Topic } from "../../types";

export const jsOutputTopic: Topic = {
  id: "js-output",
  title: "JavaScript Output Methods",
  category: "JS Basics",
  shortExplanation: `JavaScript has several distinct ways to "show" a result, each suited to a different situation.

- \`console.log()\` — writes to the browser's **Developer Console**, meant for developers, not end users
- Changing the **DOM** (via \`textContent\`/\`innerHTML\`) — updates what's visibly on the page itself
- \`alert()\` — a blocking pop-up box; it exists, but is rarely used in real, modern apps
- Building a **string** by hand (with \`+\`) is often the step before displaying a result any of these ways`,
  longExplanation: `"Output" in JavaScript just means making some computed value visible somewhere — but *where* it becomes visible, and *who* is meant to see it, differs quite a bit between methods.

- \`console.log(value)\` is the workhorse of **debugging**. It prints a value into the browser's Developer Console (usually opened with F12 or right-click → Inspect), a panel that's completely invisible to a normal visitor browsing the page. It's meant for the *developer* writing and troubleshooting the code, not for communicating anything to end users. Because this sandbox has no visible DevTools panel, every topic in this subject simulates \`console.log()\` by appending values to an on-page list instead — the JavaScript behavior being demonstrated is identical to a real \`console.log()\` call
- Changing the **DOM** (Document Object Model — the browser's live, in-memory representation of the page) is how JavaScript shows something to the actual *user*, as opposed to just the developer. In real browser JavaScript, this is commonly done by selecting an element and setting its \`.textContent\` (sets plain text, safely) or \`.innerHTML\` (sets HTML markup, which is powerful but risks XSS security issues if it ever includes untrusted user input) property, which immediately updates what's rendered on screen. In a React app like this one, the same idea shows up as updating **state** with \`useState\` and letting React re-render the JSX — conceptually the same goal (make new information visible on the page), just achieved through React's declarative update mechanism instead of manually reaching into the DOM
- \`alert("message")\` shows a small pop-up dialog box, provided directly by the browser, that the user must dismiss before they can do anything else on the page — it **blocks** all other interaction while it's open. It's the simplest possible way to get information in front of a user, and useful for a five-second demo, but it's disruptive and considered poor practice in real, modern applications: it can't be styled, it halts execution of the entire script, and it interrupts the user's flow. Real applications almost always prefer visible on-page UI (a message, a toast notification, a modal you actually control) instead
- \`prompt()\` and \`confirm()\` are \`alert()\`'s lesser-used cousins — \`prompt()\` pops up asking for text input, \`confirm()\` pops up asking for OK/Cancel — and they share the same blocking downside, so they're similarly rare in production code today
- Before any of these output methods runs, there's often a step of **building the string** you actually want to show: combining several pieces of data into one readable message using \`+\` (string concatenation, covered in the Operators topic) — for example \`"Total: $" + total\` — so that the *final* output call (whether it's \`console.log\`, a DOM update, or an \`alert\`) receives one complete, human-readable piece of text rather than several separate values
- Choosing the right output method is really about **audience**: \`console.log()\` is for you, the developer, while you're building or debugging something; DOM/state updates are for the actual end user viewing a finished page; \`alert()\` (and friends) are for quick, blocking notices that are rarely appropriate once an app is polished. A production-quality app leans almost entirely on the DOM/state approach, uses \`console.log()\` heavily during development (often removed or gated before shipping), and avoids \`alert()\` almost entirely

Recognizing these categories helps make sense of code examples you'll see elsewhere: a tutorial snippet using \`console.log()\` everywhere isn't showing you how a finished app should talk to its users — it's showing you how to inspect what's happening while you write the code.`,
  examples: [
    {
      id: "simulated-console-log-output",
      title: "console.log(), simulated on the page",
      summary: "Since there's no visible DevTools console here, each logged value is appended to an on-page list instead.",
      code: `function App() {
  const [log, setLog] = useState([]);

  function print(value) {
    setLog((prev) => [...prev, String(value)]);
  }

  function run() {
    setLog([]);
    print("This line stands in for console.log(...)");
    print("A number: " + 99);
    print("A computed value: " + (10 * 4));
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={run}>Run "console.log" calls</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 100 }}>
        {log.length === 0 ? "// output appears here" : log.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "dom-style-output",
      title: "Writing output into the page itself",
      summary: "Updating state (React's version of changing textContent) makes a result visible to the actual user, not just a developer.",
      code: `function App() {
  const [a, setA] = useState(4);
  const [b, setB] = useState(6);
  const [message, setMessage] = useState("");

  function showOnPage() {
    // In plain JS this might be: document.getElementById("out").textContent = "..."
    // In React, updating state and re-rendering achieves the same visible result.
    setMessage(a + " + " + b + " = " + (a + b));
  }

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <label>
        a: <input type="number" value={a} onChange={(e) => setA(Number(e.target.value))} />
      </label>
      <label>
        b: <input type="number" value={b} onChange={(e) => setB(Number(e.target.value))} />
      </label>
      <button onClick={showOnPage}>Show result on the page</button>
      <p style={{ fontWeight: "bold" }}>{message || "(nothing shown yet)"}</p>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        This message is visible to a real end user — unlike console.log, which only a developer would ever see.
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "alert-exists-but-blocks",
      title: "alert() exists, but blocks the whole page",
      summary: "A working alert() call — notice how disruptive a blocking pop-up feels compared to on-page output.",
      code: `function App() {
  const [count, setCount] = useState(0);

  function showAlert() {
    alert("This is a real alert() call. Notice it demands attention before you can do anything else.");
  }

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <button onClick={showAlert}>Show a blocking alert()</button>
      <button onClick={() => setCount((c) => c + 1)}>Increment count: {count}</button>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        Real apps almost always prefer on-page messages (like the counter above) over alert() — it can be styled,
        it doesn't freeze the rest of the interface, and it doesn't interrupt the user.
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "building-a-string-before-output",
      title: "Building a message before displaying it",
      summary: "Concatenating pieces into one readable string is often the step right before any output method runs.",
      code: `function App() {
  const [name, setName] = useState("Ada");
  const [items, setItems] = useState(3);
  const [log, setLog] = useState([]);

  function print(value) {
    setLog((prev) => [...prev, String(value)]);
  }

  function run() {
    setLog([]);
    const message = "Hello " + name + ", you have " + items + " item" + (items === 1 ? "" : "s") + " in your cart.";
    print(message);
  }

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <label>
        Name: <input value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <label>
        Items: <input type="number" value={items} onChange={(e) => setItems(Number(e.target.value))} />
      </label>
      <button onClick={run}>Build and show message</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 60, width: "100%" }}>
        {log.length === 0 ? "// output appears here" : log.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
