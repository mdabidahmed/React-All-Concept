import type { Topic } from "../../types";

export const nodeIntroductionTopic: Topic = {
  id: "node-introduction",
  title: "Node.js Introduction",
  category: "Node.js Basics",
  shortExplanation: `**Node.js** is a runtime that lets JavaScript run *outside* a browser — on a server, in a command-line tool, anywhere a computer can execute a program.

- Built on Chrome's **V8** engine — the same JavaScript engine that powers Google Chrome
- Adds capabilities a browser deliberately blocks for security: reading/writing files, opening network servers, talking to a database
- Node.js is ==single-threaded== but handles many operations at once via a non-blocking, event-driven model`,
  longExplanation: `For years, JavaScript only existed inside a browser tab, sandboxed away from the rest of the computer for safety — a webpage's JavaScript can't read your files or open a network port, and that's intentional. Node.js, created in 2009, took the V8 engine that powers Google Chrome and embedded it in a standalone program that runs directly on a computer, outside any browser — giving JavaScript access to the file system, networking, and everything else a "real" programming language can typically do.

- **Same language, different environment.** The JavaScript syntax you already know — variables, functions, closures, promises — is identical in Node.js. What changes is the *environment* around it: there's no \`window\`, no \`document\`, no DOM at all, but there are new globals like \`process\`, \`require\`/\`module\`, and built-in modules for files, networking, and more (covered throughout this subject)
- **Why this unlocked so much**: before Node.js, building a web application typically meant learning a *second* language for the server (PHP, Python, Ruby, Java) in addition to the JavaScript needed for the browser. Node.js meant a single language could power both sides of a web application — this is the foundation of the "full-stack JavaScript" approach many modern web apps use
- **The event loop and non-blocking I/O.** Node.js runs your JavaScript on a *single thread* — but it doesn't block that thread waiting on slow operations like reading a file or querying a database. Instead, it hands the slow operation off (via \`libuv\`, a C++ library Node is built on) and keeps executing other code, running a callback only once the operation finishes. This is why a single Node.js process can efficiently juggle thousands of concurrent network connections without needing thousands of threads
- Node.js ships with **npm** (Node Package Manager), giving access to an enormous ecosystem of reusable packages — covered in depth later in this subject
- Common real-world uses: web servers and REST APIs, command-line tools, build tools (the very tool that bundles this app's own React code runs on Node.js), real-time applications (chat, live updates), and scripting/automation tasks

This sandbox runs entirely in a browser, so it can't launch a *real* Node.js process, open a *real* file, or start a *real* network server — those topics in this subject describe the genuine Node.js API accurately, then demonstrate the same underlying behavior with a plain-JavaScript simulation standing in for the real environment (clearly explained each time this happens), so the actual mental model still transfers directly to writing real Node.js code.`,
  examples: [
    {
      id: "same-language-different-globals",
      title: "Same JavaScript, different global objects",
      summary: "The core language is identical — only the environment around it changes.",
      code: `function App() {
  const [log, setLog] = useState([]);

  function print(value) {
    setLog((prev) => [...prev, String(value)]);
  }

  function run() {
    setLog([]);
    print("In a browser: typeof window = 'object'");
    print("In Node.js:    typeof window = 'undefined' (no browser, no DOM)");
    print("In Node.js:    typeof process = 'object' (a Node-only global)");
    print("In both:       typeof Array.prototype.map = 'function' (plain JS, unchanged)");
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={run}>Compare environments</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 100 }}>
        {log.length === 0 ? "// output appears here" : log.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "non-blocking-simulation",
      title: "Non-blocking I/O, simulated",
      summary: "A 'slow' operation doesn't stop the rest of the code from running — the same idea a real fs/network call relies on.",
      code: `function App() {
  const [log, setLog] = useState([]);

  function print(value) {
    setLog((prev) => [...prev, value]);
  }

  function run() {
    setLog([]);
    print("1. Starting a slow operation (like reading a large file)...");

    // Simulates handing work off to libuv instead of blocking the thread:
    setTimeout(() => {
      print("3. Slow operation finished — callback runs now.");
    }, 500);

    print("2. Meanwhile, this line already ran — the thread was never blocked.");
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={run}>Run</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 90 }}>
        {log.length === 0 ? "// output appears here" : log.join("\\n")}
      </pre>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        Notice "2" logs before "3" — a real fs.readFile() or database query behaves exactly this way.
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "one-language-both-sides",
      title: "One language, both sides of an app",
      summary: "The same function shape (data in, data out) could run in a browser or in a Node.js server.",
      code: `function App() {
  function formatUser(user) {
    return user.name + " <" + user.email + ">";
  }

  const user = { name: "Ada Lovelace", email: "ada@example.com" };

  return (
    <div style={{ display: "grid", gap: 8 }}>
      <p>{formatUser(user)}</p>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        This exact function could run in a React component (client-side) or inside a Node.js
        server formatting a response — no rewrite needed, because it's just JavaScript.
      </p>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
