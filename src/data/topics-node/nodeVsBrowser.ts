import type { Topic } from "../../types";

export const nodeVsBrowserTopic: Topic = {
  id: "node-vs-browser",
  title: "Node.js vs Browser JavaScript",
  category: "Node.js Basics",
  shortExplanation: `Node.js and browser JavaScript share the exact same core language, but run in very different *environments* with different globals available.

- No \`window\`, \`document\`, or DOM in Node — there's no page to represent
- Node adds its own globals instead: \`process\`, \`require\`/\`module\`, \`__dirname\`, and more
- Modern Node.js has adopted several ==Web APIs== (like \`fetch\`) so some code now works unchanged in both places`,
  longExplanation: `It's easy to think of Node.js as "JavaScript, but on a server" and leave it at that — which is true, but the more useful way to think about it is that Node.js and a browser are two completely different **hosts** that both happen to run the same underlying language. The JavaScript specification itself (variables, functions, classes, closures, promises, array methods) is identical in both places. What differs entirely is the set of extra objects and APIs the host environment provides around that shared language.

- **No DOM in Node.** A browser's JavaScript exists to manipulate a web page, so it's given \`window\` (the global object representing the browser tab), \`document\` (the page's structure), and everything that goes with it — \`querySelector\`, \`addEventListener\` on DOM nodes, \`localStorage\`, and so on. Node.js has no page to represent, so none of this exists: referencing \`window\` or \`document\` in a Node.js script throws a \`ReferenceError\`, not because Node is missing a feature, but because the concept doesn't apply outside a browser tab at all.
- **Node's own globals instead.** In place of browser globals, Node provides things a server-side program actually needs: \`process\` (information and control over the currently running Node process — its arguments, environment variables, and the ability to exit), \`require\`/\`module\`/\`exports\` (the CommonJS module system, covered in depth elsewhere in this subject), and per-file values like \`__dirname\`/\`__filename\`. None of these exist in a browser, for the same reason \`window\` doesn't exist in Node — a browser tab has no concept of "the current file's directory on disk."
- **Security is a big part of *why* they differ.** A browser deliberately keeps JavaScript sandboxed away from the rest of the computer — a website's JS can't read arbitrary files or open a raw network socket, because letting it do so would make every website a potential attack on the visitor's machine. Node.js runs in a much more trusted context (code *you* chose to run, typically not downloaded from a random website mid-browsing), so it's given direct access to the file system, networking, and the operating system — access that would be actively dangerous inside a browser tab.
- **Convergence over time.** For years, this meant a lot of code had to be written twice — once for the browser, once for Node — even for tasks that had nothing to do with the DOM or the file system, like making an HTTP request. That gap has narrowed significantly: modern Node.js (18+) ships a built-in \`fetch\`, so the exact same \`fetch(url).then(...)\` code that works in a browser now also works in Node, with no extra library needed. Node has similarly adopted \`URL\`, \`URLSearchParams\`, \`AbortController\`, \`structuredClone\`, and other Web APIs originally designed for browsers, precisely because sharing more of the same surface makes code easier to write once and run in both places.
- **What never converges**: DOM-specific APIs (anything about rendering or manipulating a *page*) will never make sense in Node, since Node has no page — and Node-specific APIs about the file system, process management, or raw networking sockets will never make sense in a browser, since a browser tab was never meant to have that kind of access to a user's machine. The overlap keeps growing, but each environment retains a core of APIs the other simply cannot have.
- \`globalThis\` (covered in the next topic) is the one truly universal way to reach "whatever the top-level global object is" — it resolves to \`window\` in a browser and to \`global\` in Node, without your code needing to know which environment it's running in.

The examples below describe these differences accurately, since a real \`window\`/\`document\` genuinely doesn't exist in Node.js — but note that this very sandbox is itself a browser page, so any code here that checks a *browser* global for real (like \`globalThis\`) reflects the true browser side of the comparison, while the Node.js side of each comparison is described rather than computed, since there's no real Node.js process available to check.`,
  examples: [
    {
      id: "whats-available-where",
      title: "What's available in each environment",
      summary: "A side-by-side reference of globals unique to each host, and what's shared.",
      code: `function App() {
  const rows = [
    { thing: "window / document", browser: "yes", node: "no" },
    { thing: "process", browser: "no", node: "yes" },
    { thing: "require / module / exports", browser: "no", node: "yes" },
    { thing: "__dirname / __filename", browser: "no", node: "yes" },
    { thing: "localStorage", browser: "yes", node: "no (a real file/database is used instead)" },
    { thing: "fetch", browser: "yes", node: "yes (Node 18+)" },
    { thing: "Array, JSON, Promise, Math", browser: "yes", node: "yes" },
  ];

  return (
    <table style={{ borderCollapse: "collapse", width: "100%", fontSize: 14 }}>
      <thead>
        <tr>
          <th style={{ textAlign: "left", borderBottom: "2px solid #374151", padding: 8 }}>Feature</th>
          <th style={{ textAlign: "left", borderBottom: "2px solid #374151", padding: 8 }}>Browser</th>
          <th style={{ textAlign: "left", borderBottom: "2px solid #374151", padding: 8 }}>Node.js</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r) => (
          <tr key={r.thing}>
            <td style={{ padding: 8, borderBottom: "1px solid #374151", fontFamily: "monospace" }}>{r.thing}</td>
            <td style={{ padding: 8, borderBottom: "1px solid #374151" }}>{r.browser}</td>
            <td style={{ padding: 8, borderBottom: "1px solid #374151" }}>{r.node}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

render(<App />);`,
    },
    {
      id: "typeof-comparisons",
      title: "typeof checks, compared",
      summary: "What typeof would report for the same identifier in each environment.",
      code: `function App() {
  const [log, setLog] = useState([]);

  function print(value) {
    setLog((prev) => [...prev, value]);
  }

  function run() {
    setLog([]);
    print("In a browser:  typeof window   -> 'object'");
    print("In Node.js:    typeof window   -> 'undefined' (ReferenceError if not guarded)");
    print("In Node.js:    typeof process  -> 'object'");
    print("In a browser:  typeof process  -> 'undefined'");
    print("In BOTH:       typeof JSON.parse -> 'function' (core JS, unaffected by environment)");
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={run}>Compare typeof results</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 110 }}>
        {log.length === 0 ? "// output appears here" : log.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "shared-web-apis-in-modern-node",
      title: "Shared Web APIs: fetch works in both",
      summary: "Modern Node.js adopted several browser-originated APIs, narrowing the gap between the two environments.",
      code: `function App() {
  const adoptedApis = ["fetch", "URL", "URLSearchParams", "AbortController", "structuredClone", "Blob"];

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <p>APIs that originated in browsers but are now built into modern Node.js (18+), no import needed:</p>
      <ul>
        {adoptedApis.map((name) => (
          <li key={name} style={{ fontFamily: "monospace" }}>{name}</li>
        ))}
      </ul>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        Code using only these APIs (plus core JS) can genuinely run unchanged in a browser or in Node.js —
        no environment-specific rewrite needed.
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "why-the-sandbox-differs",
      title: "Why a security sandbox exists at all",
      summary: "The DOM-vs-file-system split isn't arbitrary — it's a deliberate trust boundary.",
      code: `function App() {
  const reasons = [
    "A browser runs code from websites you didn't choose to trust in advance — so it's sandboxed away from your files and network by design.",
    "Node.js runs code you deliberately chose to execute (a script, a server you wrote or installed) — so it's given direct system access instead.",
    "This is exactly why 'fs', 'http', and 'process' exist only in Node, and 'document', 'window' exist only in browsers.",
  ];

  return (
    <ol style={{ display: "grid", gap: 8, paddingLeft: 20 }}>
      {reasons.map((r, i) => (
        <li key={i}>{r}</li>
      ))}
    </ol>
  );
}

render(<App />);`,
    },
  ],
};
