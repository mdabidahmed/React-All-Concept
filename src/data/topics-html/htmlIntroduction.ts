import type { Topic } from "../../types";

export const htmlIntroductionTopic: Topic = {
  id: "html-introduction",
  title: "HTML Introduction",
  category: "HTML Basics",
  shortExplanation: `**HTML** (HyperText Markup Language) is the standard markup language for building web pages — it describes the *structure* of a page using **elements**.

- An HTML element is written as a start tag, content, and an end tag — \`<tagname>content</tagname>\`
- Browsers don't display the tags themselves; they use them to decide *how* to render the content
- HTML describes structure and meaning; **CSS** handles appearance, and **JavaScript** handles behavior
- This sandbox renders everything through JSX, React's HTML-like syntax — the tags are the same, with a few small syntax differences noted as they come up`,
  longExplanation: `HTML is not a programming language — it's a *markup* language, meaning it wraps content in tags that describe what that content *is* (a heading, a paragraph, a link) rather than instructing a computer to compute something.

- A basic HTML document is a **tree of elements**: a page has a \`<html>\` root, containing a \`<head>\` (metadata, not shown on the page) and a \`<body>\` (the visible content)
- Most elements have a **start tag** and a **matching end tag** wrapping their content, like \`<p>This is a paragraph.</p>\`. Some elements are *self-closing* and hold no content, like \`<br>\` (a line break) or \`<img>\` (an image)
- The separation of concerns — **HTML** for structure, **CSS** for presentation, **JavaScript** for behavior — is one of the web platform's foundational ideas, and it's why a well-structured page still makes sense even with no styling applied at all
- Every browser (Chrome, Firefox, Safari, Edge) reads the same HTML and renders it consistently, because it follows a shared, standardized specification

This platform teaches HTML concepts using **JSX** — React's syntax for describing UI, which deliberately looks almost identical to HTML. A real \`.html\` file and a React component share the same tag vocabulary (\`<h1>\`, \`<p>\`, \`<a>\`, \`<table>\`...); the differences that do exist (like \`class\` becoming \`className\`) are called out explicitly wherever they come up, so the concepts transfer directly to a plain HTML file.`,
  examples: [
    {
      id: "first-html-like-page",
      title: "A minimal page structure",
      summary: "The same nesting a real .html file uses: a root element containing a heading and a paragraph.",
      code: `function App() {
  return (
    <div>
      <h1>My First Heading</h1>
      <p>My first paragraph.</p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "start-and-end-tags",
      title: "Start tags, end tags, and content",
      summary: "Elements wrap their content between a start tag and a matching end tag.",
      code: `function App() {
  return (
    <div>
      <p>A paragraph starts with &lt;p&gt; and ends with &lt;/p&gt;.</p>
      <strong>Bold text is wrapped in &lt;strong&gt;...&lt;/strong&gt;.</strong>
      <br />
      <em>Italic text is wrapped in &lt;em&gt;...&lt;/em&gt;.</em>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "self-closing-elements",
      title: "Self-closing elements",
      summary: "Some elements, like line breaks and images, hold no content and need no end tag.",
      code: `function App() {
  return (
    <div>
      <p>
        This line
        <br />
        breaks here.
      </p>
      <img
        src="https://picsum.photos/seed/htmlintro/200/80"
        alt="A random placeholder"
        width={200}
        height={80}
      />
      <p style={{ fontSize: 12, color: "#6b7280" }}>
        In plain HTML: {"<br>"} and {"<img>"} — no closing tag needed. In JSX, self-closing tags end with "/&gt;".
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "structure-vs-style-vs-behavior",
      title: "Structure, style, and behavior, side by side",
      summary: "The same button described with only structure, then with style added, then with behavior added.",
      code: `function App() {
  const [clicks, setClicks] = useState(0);

  return (
    <div style={{ display: "grid", gap: 12 }}>
      <div>
        <p style={{ fontSize: 12, color: "#6b7280", margin: "0 0 4px" }}>Structure only (HTML):</p>
        <button>Click me</button>
      </div>
      <div>
        <p style={{ fontSize: 12, color: "#6b7280", margin: "0 0 4px" }}>Structure + style (CSS):</p>
        <button style={{ background: "#0d9488", color: "white", border: "none", padding: "8px 16px", borderRadius: 6 }}>
          Click me
        </button>
      </div>
      <div>
        <p style={{ fontSize: 12, color: "#6b7280", margin: "0 0 4px" }}>Structure + style + behavior (JavaScript):</p>
        <button
          onClick={() => setClicks((c) => c + 1)}
          style={{ background: "#0d9488", color: "white", border: "none", padding: "8px 16px", borderRadius: 6 }}
        >
          Clicked {clicks} times
        </button>
      </div>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
