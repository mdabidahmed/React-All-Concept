import type { Topic } from "../../types";

export const htmlElementsTopic: Topic = {
  id: "html-elements",
  title: "HTML Elements",
  category: "HTML Basics",
  shortExplanation: `An **HTML element** is everything from its start tag to its matching end tag, including the content in between.

- \`<tagname>content</tagname>\` — start tag, content, end tag
- Elements can nest inside other elements, forming a **parent/child** relationship
- Never leave a tag that needs closing unclosed, and never overlap two tags — close them in the *reverse* order they were opened
- **Empty elements** have no content at all between their opening and closing (or in a single self-closing tag)`,
  longExplanation: `An element is the fundamental building block of an HTML document — nearly everything on a page is one.

- A typical element has three parts: a **start tag** (\`<p>\`), the **content** (\`This is a paragraph.\`), and an **end tag** (\`</p>\`). Together, \`<p>This is a paragraph.</p>\` is one complete element
- Elements can contain other elements as their content — this is called **nesting**, and it's how a page builds up structure. A \`<ul>\` (list) containing several \`<li>\` (list item) elements is a parent with several children; a \`<div>\` wrapping a heading and a paragraph makes that \`<div>\` their shared parent
- **Closing tags matters.** Some elements can technically be left unclosed in older HTML and browsers will try to guess where they end, but the result is unpredictable and can break the layout of everything after it. Always close what you open
- **Never overlap tags.** Elements must be closed in the exact reverse order they were opened — this is properly nested: \`<b><i>text</i></b>\`. This is invalid because the tags cross each other: \`<b><i>text</b></i>\` (the \`<b>\` was opened first but closed before the \`<i>\` that opened after it). In this JSX-based sandbox, this rule is enforced even more strictly — improperly overlapped tags are a syntax error and the code won't run at all, whereas a real browser might silently try to recover from it
- **Empty elements** contain no content between their tags — there's simply nothing to put there. \`<br>\` (a line break) and \`<hr>\` (a horizontal rule) are empty by nature; in JSX these are written as self-closing tags, \`<br />\` and \`<hr />\`

Getting comfortable with "start tag, content, end tag" and correct nesting is really the whole grammar of HTML — every other topic is just which specific tag to reach for.`,
  examples: [
    {
      id: "parent-and-child",
      title: "Parent and child elements",
      summary: "A div acts as the parent of a heading and a paragraph nested inside it.",
      code: `function App() {
  return (
    <div style={{ border: "1px solid #d1d5db", padding: 12, borderRadius: 6 }}>
      {/* This outer div is the parent element */}
      <h2>I am a child of the div</h2>
      <p>So am I — elements nested inside another element are its children.</p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "correct-nesting-order",
      title: "Closing tags in reverse order",
      summary: "Properly nested tags close in the exact reverse order they opened.",
      code: `function App() {
  return (
    <div style={{ display: "grid", gap: 8 }}>
      <p>
        <b>
          <i>This text is bold and italic, correctly nested.</i>
        </b>
      </p>
      <small style={{ color: "#6b7280" }}>
        Correct: {"<b><i>text</i></b>"} — the {"<i>"} opened last, so it closes first.
        <br />
        Invalid: {"<b><i>text</b></i>"} — the tags cross each other and never work correctly.
      </small>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "empty-elements",
      title: "Empty elements",
      summary: "br and hr hold no content at all — there is nothing between their opening and closing.",
      code: `function App() {
  return (
    <div>
      <p>
        First line
        <br />
        Second line, right after a line break with no content of its own.
      </p>
      <hr />
      <p>Text after a horizontal rule, another empty element.</p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "always-close-your-tags",
      title: "Always close tags that need closing",
      summary: "A fully and correctly closed structure, contrasted with the risk of leaving a tag open.",
      code: `function App() {
  return (
    <div style={{ display: "grid", gap: 8 }}>
      <div style={{ border: "1px solid #16a34a", padding: 8, borderRadius: 6 }}>
        <p>Correctly closed: every start tag has a matching end tag.</p>
        <ul>
          <li>First item</li>
          <li>Second item</li>
        </ul>
      </div>
      <small style={{ color: "#6b7280" }}>
        Leaving a tag like {"<li>"} unclosed can make a browser guess where it ends — often
        swallowing up unrelated content after it. JSX won't even compile with an unclosed tag,
        which is one reason its error messages tend to be clearer than a browser's silent guesswork.
      </small>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
