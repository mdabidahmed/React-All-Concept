import type { Topic } from "../../types";

export const htmlJavascriptTopic: Topic = {
  id: "html-javascript",
  title: "HTML JavaScript",
  category: "HTML Scripting & Layout",
  shortExplanation: `The \`<script>\` tag is how a page embeds or links in **JavaScript**, letting a page change *after* it loads instead of staying static.

- \`<script>...</script>\` embeds code directly; \`<script src="app.js"></script>\` links to an external file
- The classic pattern is \`document.getElementById("id").innerHTML = "new content"\` — find an element, then mutate it directly
- Placing \`<script>\` at the end of \`<body>\`, or in \`<head>\` with the \`defer\` attribute, makes sure the HTML exists before the script tries to touch it
- React replaces manual \`innerHTML\` mutation with **state** — you describe *what* the UI should look like, and React updates the DOM for you`,
  longExplanation: `Before JavaScript frameworks existed, \`<script>\` plus direct DOM manipulation was *the* way to make a page interactive: find an element by its \`id\`, then reach in and change its content, attributes, or styling by hand.

- \`document.getElementById("demo").innerHTML = "Hello!"\` locates the element with \`id="demo"\` and replaces everything inside it — this is the single most common line of vanilla-JS DOM code ever written
- JavaScript can also run in response to an event, using an inline attribute like \`onclick="myFunction()"\`, or by attaching a listener from a separate script
- **Script placement matters**: if a \`<script>\` sits in \`<head>\` and runs immediately, it executes *before* the \`<body>\` has been parsed, so \`document.getElementById(...)\` would find nothing and return \`null\`. The traditional fix is placing \`<script>\` at the very end of \`<body>\`, after all the HTML above it. The modern fix is keeping \`<script src="...">\` in \`<head>\` but adding the \`defer\` attribute, which tells the browser to keep parsing the page and only run the script once the whole document is ready
- React doesn't remove JavaScript from the page — it changes the *pattern*. Instead of imperatively grabbing a specific element and mutating it (\`element.innerHTML = ...\`), a React component holds ==state== and describes what should be on screen for each possible value of that state; changing the state (with \`setSomething(...)\`) causes React to update the DOM itself, correctly and automatically, without ever calling \`getElementById\`

This sandbox has real browser globals available, including \`document\`, so the classic pattern can genuinely run here — right alongside the React-state version of the same idea, for a direct comparison.`,
  examples: [
    {
      id: "vanilla-dom-manipulation",
      title: "The classic getElementById + innerHTML pattern",
      summary: "A real, working example of the technique every pre-framework website used to update content.",
      code: `function App() {
  const paragraphRef = useRef(null);

  function runScript() {
    // The vanilla-JS way: find the element, then mutate it directly.
    paragraphRef.current.innerHTML = "Changed directly by a script, not by React state.";
  }

  return (
    <div style={{ display: "grid", gap: 8 }}>
      <p ref={paragraphRef} id="demo">
        Original text, untouched.
      </p>
      <button onClick={runScript}>Run script</button>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "react-state-equivalent",
      title: "The same result, the React way",
      summary: "No getElementById, no innerHTML — state describes the content, and React updates the DOM.",
      code: `function App() {
  const [text, setText] = useState("Original text, untouched.");

  return (
    <div style={{ display: "grid", gap: 8 }}>
      <p>{text}</p>
      <button onClick={() => setText("Changed by React state, not by a script.")}>
        Update content
      </button>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "script-placement",
      title: "Where a real <script> tag goes, and why",
      summary: "Shown as text, since script placement is about document parse order, not something to run here.",
      code: `function App() {
  const before = "<head>\\n  <script src=\\"app.js\\"></script>\\n</head>\\n<body>\\n  <p id=\\"demo\\">Hello</p>\\n</body>";
  const fixedWithDefer = "<head>\\n  <script src=\\"app.js\\" defer></script>\\n</head>\\n<body>\\n  <p id=\\"demo\\">Hello</p>\\n</body>";
  const fixedAtBottom = "<body>\\n  <p id=\\"demo\\">Hello</p>\\n  <script src=\\"app.js\\"></script>\\n</body>";

  return (
    <div style={{ display: "grid", gap: 12 }}>
      <div>
        <p style={{ margin: "0 0 4px", color: "#b91c1c" }}>Breaks: script in head, runs before body parses</p>
        <pre style={{ background: "#0f172a", color: "#e2e8f0", padding: 10, borderRadius: 6, fontSize: 12 }}>{before}</pre>
      </div>
      <div>
        <p style={{ margin: "0 0 4px", color: "#15803d" }}>Fix 1: keep script in head, add defer</p>
        <pre style={{ background: "#0f172a", color: "#e2e8f0", padding: 10, borderRadius: 6, fontSize: 12 }}>{fixedWithDefer}</pre>
      </div>
      <div>
        <p style={{ margin: "0 0 4px", color: "#15803d" }}>Fix 2: move script to the end of body</p>
        <pre style={{ background: "#0f172a", color: "#e2e8f0", padding: 10, borderRadius: 6, fontSize: 12 }}>{fixedAtBottom}</pre>
      </div>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "inline-onclick-vs-jsx-onclick",
      title: "Inline onclick (HTML) vs onClick (JSX)",
      summary: "The same event-handling idea, written the old way as text and the JSX way as real, running code.",
      code: `function App() {
  const [count, setCount] = useState(0);
  const oldStyle = "<button onclick=\\"count = count + 1; render();\\">Click me</button>";

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <div>
        <p style={{ margin: "0 0 4px", color: "#6b7280" }}>Old-style inline attribute (shown as text):</p>
        <pre style={{ background: "#0f172a", color: "#e2e8f0", padding: 10, borderRadius: 6, fontSize: 12 }}>{oldStyle}</pre>
      </div>
      <div>
        <p style={{ margin: "0 0 4px", color: "#6b7280" }}>JSX's onClick, actually running:</p>
        <button onClick={() => setCount((c) => c + 1)}>Clicked {count} times</button>
      </div>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
