import type { Topic } from "../../types";

export const htmlComputercodeTopic: Topic = {
  id: "html-computercode",
  title: "HTML Computercode Elements",
  category: "HTML Scripting & Layout",
  shortExplanation: `A handful of elements exist specifically to mark up **computer-related text**, each carrying a distinct meaning.

- \`<code>\` — a snippet of computer code, shown in a monospace font
- \`<kbd>\` — text a user should type on a keyboard
- \`<samp>\` — sample output from a program
- \`<var>\` — a variable name in a mathematical or programming context
- \`<pre>\` — preformatted text that preserves whitespace and line breaks exactly as written`,
  longExplanation: `Alongside general-purpose text elements, HTML defines a small family of tags specifically for discussing code, programs, and their output — useful for anyone writing technical documentation.

- \`<code>\` marks an inline snippet of source code, like \`const x = 5;\`, and browsers render it in a monospace font by default
- \`<kbd>\` marks keyboard input a user is expected to type, like pressing **Ctrl+C**, and is also rendered in monospace
- \`<samp>\` marks sample output — text a program printed out, as opposed to code someone wrote or typed
- \`<var>\` marks a variable name, typically shown in italics, useful when writing out a formula or describing an algorithm in prose
- \`<pre>\` stands for *preformatted* text: unlike every other HTML element, it preserves exactly the whitespace, line breaks, and indentation written inside it, instead of collapsing them the way normal HTML does. It's almost always paired with \`<code>\` for multi-line code blocks

All five map directly onto real DOM elements, so they render as ordinary JSX here with no simulation needed.`,
  examples: [
    {
      id: "code-kbd-samp-var-together",
      title: "code, kbd, samp, and var in one paragraph",
      summary: "Four related but distinct tags, each styled slightly differently by the browser's default stylesheet.",
      code: `function App() {
  return (
    <div style={{ display: "grid", gap: 10 }}>
      <p>
        Run <code>npm install</code> to install dependencies.
      </p>
      <p>
        Press <kbd>Ctrl</kbd> + <kbd>C</kbd> to stop the running server.
      </p>
      <p>
        The terminal then prints: <samp>Server stopped.</samp>
      </p>
      <p>
        The formula <var>a</var><sup>2</sup> + <var>b</var><sup>2</sup> = <var>c</var><sup>2</sup> uses variable names, not code.
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "pre-preserves-whitespace",
      title: "<pre> preserves whitespace exactly",
      summary: "The same indented, multi-line text rendered as a normal paragraph vs. inside <pre>.",
      code: `function App() {
  const snippet = "function greet(name) {\\n    return \\"Hello, \\" + name;\\n}";

  return (
    <div style={{ display: "grid", gap: 12 }}>
      <div>
        <p style={{ margin: "0 0 4px", color: "#6b7280" }}>Inside a normal &lt;p&gt; — whitespace collapses:</p>
        <p style={{ border: "1px solid #d1d5db", borderRadius: 6, padding: 8 }}>{snippet}</p>
      </div>
      <div>
        <p style={{ margin: "0 0 4px", color: "#6b7280" }}>Inside &lt;pre&gt; — whitespace is preserved:</p>
        <pre style={{ background: "#0f172a", color: "#e2e8f0", padding: 10, borderRadius: 6, fontSize: 13 }}>{snippet}</pre>
      </div>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "terminal-session-recreation",
      title: "Recreating a terminal session",
      summary: "kbd for what the user types, samp for what the program prints, and pre to hold it all together.",
      code: `function App() {
  return (
    <pre style={{ background: "#0f172a", color: "#e2e8f0", padding: 12, borderRadius: 6, fontSize: 13, lineHeight: 1.6 }}>
      $ <kbd style={{ color: "#93c5fd" }}>node app.js</kbd>
      {"\\n"}
      <samp>Server listening on port 3000</samp>
      {"\\n"}
      $ <kbd style={{ color: "#93c5fd" }}>curl localhost:3000</kbd>
      {"\\n"}
      <samp>{'{"status":"ok"}'}</samp>
    </pre>
  );
}

render(<App />);`,
    },
    {
      id: "code-block-with-pre",
      title: "A full multi-line code block",
      summary: "<pre><code>...</code></pre> is the standard combination for displaying a block of source code.",
      code: `function App() {
  const code = "function sum(a, b) {\\n  return a + b;\\n}\\n\\nconsole.log(sum(2, 3));";

  return (
    <pre style={{ background: "#0f172a", color: "#e2e8f0", padding: 12, borderRadius: 6, fontSize: 13 }}>
      <code>{code}</code>
    </pre>
  );
}

render(<App />);`,
    },
  ],
};
