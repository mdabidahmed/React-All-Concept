import type { Topic } from "../../types";

export const htmlParagraphsTopic: Topic = {
  id: "html-paragraphs",
  title: "HTML Paragraphs",
  category: "HTML Basics",
  shortExplanation: `\`<p>\` marks up a block of text as a paragraph, and browsers automatically add space before and after it.

- HTML collapses extra spaces, tabs, and blank lines in your source into a single space
- \`<br>\` forces a line break *within* the same paragraph, without starting a new one
- Don't use empty paragraphs (\`<p></p>\`) just to create vertical gaps — that's a job for CSS margin or padding`,
  longExplanation: `The paragraph is one of the most common elements in HTML, and it comes with a couple of behaviors worth understanding well.

- \`<p>\` wraps one block of text. Browsers give every paragraph automatic margin above and below it by default, which is why stacking several \`<p>\` elements produces visibly separated blocks with no extra work
- **Whitespace collapsing** is a core HTML behavior: no matter how many spaces, tabs, or blank lines appear between words in your source code, the browser renders them as a single space. This is why indentation and line breaks inside your markup are purely for the *developer's* readability — they have zero effect on the rendered page
- \`<br>\` is the exception to "whitespace doesn't matter" — it's an actual element that forces a visible line break at that exact point, without closing the current paragraph and starting a new one. Multiple \`<p>\` tags create separate paragraphs (each with its own margin); \`<br>\` creates line breaks *inside* one paragraph
- A tempting but incorrect shortcut is inserting empty paragraphs, \`<p></p>\`, purely to push content further down the page. This misuses the paragraph element for a purely visual effect, produces inconsistent spacing across browsers, and confuses anyone reading the markup (an empty paragraph looks like a mistake, not intentional spacing). Vertical spacing is what CSS \`margin\` and \`padding\` are for — reach for those instead

Knowing when to reach for a new \`<p>\` versus a \`<br>\` — and knowing that neither should ever be used purely to create blank visual space — covers nearly everything paragraphs are used for.`,
  examples: [
    {
      id: "automatic-paragraph-spacing",
      title: "Automatic spacing between paragraphs",
      summary: "Stacked p elements get margin above and below automatically, with no extra styling.",
      code: `function App() {
  return (
    <div>
      <p>This is the first paragraph.</p>
      <p>This is a second, separate paragraph — notice the gap above it, added automatically.</p>
      <p>And a third one, spaced the same way.</p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "br-vs-new-paragraph",
      title: "br forces a line break without a new paragraph",
      summary: "Contrast a single paragraph broken into lines with br, against two genuinely separate paragraphs.",
      code: `function App() {
  return (
    <div style={{ display: "grid", gap: 16 }}>
      <div style={{ border: "1px solid #d1d5db", padding: 8, borderRadius: 6 }}>
        <p style={{ fontSize: 12, color: "#6b7280", margin: "0 0 4px" }}>One paragraph, two lines:</p>
        <p>
          Roses are red,
          <br />
          Violets are blue.
        </p>
      </div>
      <div style={{ border: "1px solid #d1d5db", padding: 8, borderRadius: 6 }}>
        <p style={{ fontSize: 12, color: "#6b7280", margin: "0 0 4px" }}>Two separate paragraphs:</p>
        <p>Roses are red,</p>
        <p>Violets are blue.</p>
      </div>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "whitespace-collapses",
      title: "Extra spaces and blank lines collapse",
      summary: "No matter how the source is spaced out, the browser renders it as one normal line.",
      code: `function App() {
  return (
    <p>
      This      paragraph


      has extra          spaces
      and several blank lines
      in the source code,


      but it all renders as one normally spaced block of text.
    </p>
  );
}

render(<App />);`,
    },
    {
      id: "dont-fake-spacing-with-empty-p",
      title: "Don't use empty paragraphs for spacing",
      summary: "Real vertical spacing should come from CSS margin, not from empty p tags.",
      code: `function App() {
  return (
    <div style={{ display: "grid", gap: 8 }}>
      <p>First paragraph.</p>
      {/* Avoid this pattern: <p></p> used only to push the next line down */}
      <p style={{ marginTop: 32 }}>
        Second paragraph, pushed down with a real <code>margin-top</code> instead of an empty paragraph.
      </p>
      <small style={{ color: "#6b7280" }}>
        An empty <code>{"<p></p>"}</code> renders inconsistently across browsers and confuses
        anyone reading the markup later — <code>margin</code>/<code>padding</code> is the correct tool for spacing.
      </small>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
