import type { Topic } from "../../types";

export const htmlEditorsTopic: Topic = {
  id: "html-editors",
  title: "HTML Editors",
  category: "HTML Basics",
  shortExplanation: `Writing HTML needs nothing fancy — a plain text editor and a browser are technically enough to get started.

- **Notepad** (Windows) or **TextEdit** (Mac, set to plain text mode) can write valid HTML
- A dedicated **code editor** like VS Code adds syntax highlighting, autocomplete, and error checking, but isn't required
- The file must be saved with a \`.html\` extension — that's what tells the browser to *render* it as a page instead of showing raw text
- This sandbox skips the "save a file and open it" step entirely — it plays the role of editor *and* browser at once, rendering your code the instant it runs`,
  longExplanation: `Before any framework, build tool, or code editor existed, people wrote HTML in the simplest text editor available and opened the result directly in a browser. That workflow still works today, and understanding it clarifies what a fancier editor is actually adding.

- **Any plain text editor works.** Windows Notepad, Mac TextEdit (switched to "Plain Text" format, since its default rich-text mode adds hidden formatting that corrupts an HTML file), or Linux's \`gedit\` are all sufficient. There's nothing special about the software — HTML is just text
- **The workflow is: write, save, open.** Type the markup, save the file with a name ending in \`.html\` (like \`index.html\`), then open that file in a browser — either by double-clicking it or dragging it into a browser window
- **The \`.html\` extension is what matters.** A file named \`page.txt\` containing identical markup opens as plain, literal text — the browser has no reason to interpret \`<h1>text</h1>\` as a heading. Rename that same file to \`page.html\`, and the browser parses the tags and renders an actual heading
- **Code editors are a convenience layer, not a requirement.** Tools like **VS Code**, Sublime Text, or WebStorm add *syntax highlighting* (color-coding tags and attributes so mistakes stand out), *autocomplete* (suggesting tag and attribute names as you type), and instant error checking (flagging an unclosed tag before you even run the page). None of that changes what HTML *is* — it just makes writing correct HTML faster and less error-prone
- Professional development almost always uses a code editor for these conveniences, but a beginner (or anyone debugging on an unfamiliar machine) can always fall back to a plain text editor with zero loss of capability

In this platform, there's no literal "save as \`.html\` and open in a browser" step — every example below runs immediately in a live sandbox, which is effectively editor and browser fused into one panel.`,
  examples: [
    {
      id: "minimal-page-by-hand",
      title: "A minimal page, as if typed by hand",
      summary: "The kind of small page anyone could type directly into Notepad or TextEdit.",
      code: `function App() {
  return (
    <div>
      <h1>My First Web Page</h1>
      <p>I wrote this using nothing but a plain text editor.</p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "extension-matters",
      title: "Why the .html extension matters",
      summary: "The same markup, shown as a browser would treat it saved as .txt versus saved as .html.",
      code: `function App() {
  return (
    <div style={{ display: "grid", gap: 16 }}>
      <div>
        <p style={{ fontSize: 12, color: "#6b7280", margin: "0 0 4px" }}>
          Saved as "notes.txt" — the browser shows the raw characters:
        </p>
        <pre style={{ background: "#0f172a", color: "#e2e8f0", padding: 12, borderRadius: 6, fontSize: 13 }}>
          {"<h1>Hello</h1>"}
        </pre>
      </div>
      <div>
        <p style={{ fontSize: 12, color: "#6b7280", margin: "0 0 4px" }}>
          Saved as "page.html" — the browser parses the tags and renders them:
        </p>
        <div style={{ border: "1px solid #d1d5db", padding: 12, borderRadius: 6 }}>
          <h1>Hello</h1>
        </div>
      </div>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "what-a-code-editor-adds",
      title: "What a dedicated code editor adds",
      summary: "Toggle a simulated \"syntax highlighting\" view to see what a plain editor is missing — not requiring.",
      code: `function App() {
  const [highlighted, setHighlighted] = useState(false);

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={() => setHighlighted((h) => !h)}>
        {highlighted ? "Show as plain text editor would" : "Show as a code editor would"}
      </button>
      <pre
        style={{
          background: "#0f172a",
          padding: 12,
          borderRadius: 6,
          fontSize: 13,
          color: highlighted ? "#e2e8f0" : "#e2e8f0",
        }}
      >
        {highlighted ? (
          <span>
            <span style={{ color: "#f472b6" }}>{"<h1>"}</span>
            <span style={{ color: "#e2e8f0" }}>Hello</span>
            <span style={{ color: "#f472b6" }}>{"</h1>"}</span>
          </span>
        ) : (
          <span>{"<h1>Hello</h1>"}</span>
        )}
      </pre>
      <small style={{ color: "#6b7280" }}>
        Both editors save the exact same file — only the *appearance while typing* differs.
      </small>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
