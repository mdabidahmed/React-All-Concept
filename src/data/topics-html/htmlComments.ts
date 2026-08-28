import type { Topic } from "../../types";

export const htmlCommentsTopic: Topic = {
  id: "html-comments",
  title: "HTML Comments",
  category: "HTML Basics",
  shortExplanation: `An HTML comment is written \`<!-- like this -->\` — anything between those markers is completely ignored by the browser.

- Comments are invisible in the rendered page, but visible to anyone who views the page's source
- They're used to leave notes for other developers, or to temporarily disable a block of markup without deleting it
- **JSX has no equivalent syntax** — this is a real difference worth understanding, not just a small syntax swap`,
  longExplanation: `A comment is text in the source code that the browser deliberately does not render — it exists purely for humans reading the code, not for the page's visitors.

- The syntax is \`<!-- comment text goes here -->\` — everything between \`<!--\` and \`-->\`, including across multiple lines, is ignored when the page renders
- Comments are commonly used for two things: leaving an explanatory note for whoever reads the code next ("this section handles the mobile navigation"), and **temporarily disabling** a block of markup by wrapping it in comment markers, without permanently deleting it — handy while debugging or testing a change
- A comment is invisible in the rendered page, but it's still sitting right there in the page's HTML source — anyone can see it by using a browser's "View Page Source" feature. Comments are not a way to hide sensitive information; they're purely a documentation tool

**This is one place where JSX genuinely differs from HTML, not just in naming.** JSX has its own, unrelated comment syntax — \`{/* like this */}\` — which only works because it's a JavaScript expression wrapped in curly braces; the literal \`<!-- ... -->\` syntax isn't valid JSX at all and would cause a compile error if written directly inside markup. The two serve a similar *purpose* (leaving invisible notes in the code), but they are different syntax rooted in different languages — a real \`.html\` file uses \`<!-- -->\`, while a \`.jsx\`/\`.tsx\` file uses \`{/* */}\`. Because of that, the example below shows real HTML comment syntax as plain displayed text rather than pretending to run it, and separately demonstrates JSX's own comment syntax, which the sandbox can genuinely execute.`,
  examples: [
    {
      id: "html-comment-syntax",
      title: "What a real HTML comment looks like",
      summary: "Shown as literal text, since <!-- --> isn't valid JSX and can't be executed directly in this sandbox.",
      code: `function App() {
  return (
    <div style={{ display: "grid", gap: 8 }}>
      <p>A real .html file might contain a line like this:</p>
      <pre style={{ background: "#0f172a", color: "#e2e8f0", padding: 12, borderRadius: 6, fontSize: 13 }}>
        {"<!-- This paragraph explains the pricing table -->"}
        {"\\n"}
        {"<p>Prices include tax.</p>"}
      </pre>
      <p>
        The comment line never shows up on the rendered page — only the paragraph beneath it does.
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "jsx-comment-syntax",
      title: "JSX's own comment syntax",
      summary: "JSX comments look and work differently — {/* like this */} — but serve a similar documentation purpose.",
      code: `function App() {
  // A regular JavaScript comment, above the JSX entirely
  return (
    <div>
      {/* This is a real, working JSX comment — it renders nothing */}
      <p>Only this paragraph is visible on the page.</p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "commenting-out-a-block",
      title: "Temporarily disabling a block of markup",
      summary: "Toggling a section off mirrors what wrapping markup in HTML comments accomplishes.",
      code: `function App() {
  const [showBanner, setShowBanner] = useState(true);

  return (
    <div style={{ display: "grid", gap: 8 }}>
      <button onClick={() => setShowBanner((v) => !v)}>
        {showBanner ? "Comment out the banner" : "Restore the banner"}
      </button>

      {showBanner && (
        <div style={{ background: "#fef3c7", padding: 10, borderRadius: 6 }}>
          Promotional banner — in real HTML, wrapping this in {"<!-- -->"} would hide it
          the same way, without deleting the markup.
        </div>
      )}

      <p>The rest of the page is unaffected either way.</p>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
