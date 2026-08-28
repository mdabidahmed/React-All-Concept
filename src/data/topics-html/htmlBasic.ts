import type { Topic } from "../../types";

export const htmlBasicTopic: Topic = {
  id: "html-basic",
  title: "HTML Basic",
  category: "HTML Basics",
  shortExplanation: `A handful of elements show up in almost every HTML document — headings, paragraphs, and links are the essentials worth knowing first.

- \`<h1>\` through \`<h6>\` are headings, \`<h1>\` being the most important
- \`<p>\` marks a paragraph of text
- \`<a href="...">\` creates a clickable link
- Browsers ignore extra whitespace and line breaks in your source code — only actual HTML elements control layout`,
  longExplanation: `A small set of elements covers most of what a first page needs, and they're worth knowing cold before moving on to anything more specialized.

- **Headings**: \`<h1>\` through \`<h6>\`, in decreasing order of importance. \`<h1>\` is typically the page's main title, and there's usually only one per page
- **Paragraphs**: \`<p>\` wraps a block of text. Browsers automatically add space before and after a paragraph
- **Links**: \`<a href="https://example.com">visible text</a>\` — the \`href\` attribute is what makes it a link; without it, an \`<a>\` tag does nothing special
- **Whitespace collapsing**: HTML ignores extra spaces, tabs, and line breaks in your source. Writing a paragraph's text across multiple indented lines in your code doesn't create multiple lines on the page — only actual elements like \`<br>\` or a new \`<p>\` do that
- **HTML is not case sensitive** for tag names (\`<P>\` behaves the same as \`<p>\`), but the universal convention is lowercase tags

These handful of elements — headings, paragraphs, and links — are enough to build a genuinely readable page, before anything about styling or layout gets involved.`,
  examples: [
    {
      id: "heading-levels",
      title: "All six heading levels",
      summary: "h1 through h6, shown together to see the size and weight progression.",
      code: `function App() {
  return (
    <div>
      <h1>Heading 1</h1>
      <h2>Heading 2</h2>
      <h3>Heading 3</h3>
      <h4>Heading 4</h4>
      <h5>Heading 5</h5>
      <h6>Heading 6</h6>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "paragraphs-and-spacing",
      title: "Paragraphs handle their own spacing",
      summary: "Browsers add space around each paragraph automatically — no manual blank lines needed.",
      code: `function App() {
  return (
    <div>
      <p>This is the first paragraph.</p>
      <p>This is the second paragraph, automatically spaced apart from the first.</p>
      <p>
        Extra          spaces     and
        line breaks in the source code are collapsed into a single space here.
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "basic-link",
      title: "A basic link with href",
      summary: "The href attribute is what makes an <a> tag an actual, clickable link.",
      code: `function App() {
  return (
    <div style={{ display: "grid", gap: 8 }}>
      <a href="https://developer.mozilla.org" target="_blank" rel="noreferrer">
        Visit MDN Web Docs
      </a>
      <span style={{ color: "#6b7280" }}>
        Without an href attribute, {"<a>Text</a>"} looks like a link but does nothing when clicked.
      </span>
      <a>This one has no href</a>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "whitespace-does-not-matter",
      title: "Source formatting vs. rendered output",
      summary: "Messy indentation and line breaks in the code don't affect how the page actually looks.",
      code: `function App() {
  return (
    <p>
        This
      text
            is written
        with
      wildly inconsistent indentation
        and line breaks
      in the source —
    but it renders as one normal, evenly-spaced paragraph.
    </p>
  );
}

render(<App />);`,
    },
  ],
};
