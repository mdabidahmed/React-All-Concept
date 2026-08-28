import type { Topic } from "../../types";

export const htmlBlockInlineTopic: Topic = {
  id: "html-block-inline",
  title: "HTML Block and Inline",
  category: "HTML Structure",
  shortExplanation: `Every HTML element is, by default, either **block-level** or **inline**, and the difference is about layout, not meaning.

- *Block* elements (\`<div>\`, \`<p>\`, \`<h1>\`, \`<ul>\`) start on a new line and stretch to fill the available width
- *Inline* elements (\`<span>\`, \`<a>\`, \`<strong>\`) flow within a line of text, taking up only as much width as their content needs
- A block element can contain inline elements — but not the other way around, in well-structured markup`,
  longExplanation: `Behind the scenes, every HTML element has a default *display* behavior — and almost everything falls into one of two categories.

- **Block-level elements** — \`<div>\`, \`<p>\`, \`<h1>\`–\`<h6>\`, \`<ul>\`, \`<ol>\`, \`<table>\`, \`<section>\` — always start on a new line, and by default stretch to fill the full width of their container, whether or not their content needs that much space
- **Inline elements** — \`<span>\`, \`<a>\`, \`<strong>\`, \`<em>\`, \`<img>\` — never force a line break. They sit *within* the flow of surrounding text, taking up only as much horizontal space as their own content requires
- **Nesting rules**: a block element can contain inline elements (a \`<p>\` full of \`<strong>\` and \`<a>\` text is completely normal), and a block element can usually contain other block elements too. Going the other way — putting a block element like a \`<div>\` inside an inline element like a \`<span>\`— is not valid, well-structured HTML
- There is a well-known real-world wrinkle: HTML5 specifically allows \`<a>\` (normally inline) to wrap an entire block of content, like a whole card made of a heading and a paragraph, and still be valid. It's a deliberate, documented exception rather than a rule to fully internalize — the block/inline distinction as a general default is still the right mental model
- This is purely a *default* — CSS can override any element's \`display\` to change it (a \`<li>\` can be made to lay out horizontally, a \`<span>\` can be made block-level), but understanding the *default* is what makes an unstyled page's layout predictable

This default block/inline behavior is inherited straight from the browser's own rendering rules — it's identical whether the tags are written in a plain \`.html\` file or in JSX.`,
  examples: [
    {
      id: "block-elements-stack",
      title: "Block elements stack vertically",
      summary: "Each block element starts on its own new line and fills the available width, regardless of content length.",
      code: `function App() {
  const block = { background: "#e0f2fe", border: "1px solid #7dd3fc", padding: 8, marginBottom: 4 };
  return (
    <div>
      <div style={block}>First div (short text)</div>
      <div style={block}>Second div — even though this text is much longer, the box still spans the full width.</div>
      <p style={block}>A paragraph is block-level too.</p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "inline-elements-flow",
      title: "Inline elements flow within a line",
      summary: "Inline elements sit side by side, only taking up as much width as their content needs.",
      code: `function App() {
  const inline = { background: "#fef3c7", border: "1px solid #fcd34d", padding: "2px 6px" };
  return (
    <p>
      This sentence has <span style={inline}>an inline span</span>, then <strong style={inline}>bold text</strong>,
      then <a href="#" style={inline}>a link</a> — all sitting on the same line, each sized to its own content.
    </p>
  );
}

render(<App />);`,
    },
    {
      id: "block-can-contain-inline",
      title: "A block element containing inline elements",
      summary: "This is the normal, valid direction: block wraps inline, not the other way around.",
      code: `function App() {
  return (
    <div style={{ border: "1px solid #d1d5db", padding: 12 }}>
      {/* <div> is block-level; <span>, <strong>, and <a> inside it are all inline */}
      <p>
        This <strong>paragraph</strong> contains <span style={{ color: "#0d9488" }}>a span</span> and{" "}
        <a href="#">a link</a> — all valid inline content inside a block-level wrapper.
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "css-can-override-default",
      title: "CSS can override the default display",
      summary: "The block/inline distinction is a default, not a permanent rule — display can be changed.",
      code: `function App() {
  return (
    <div>
      <p style={{ fontSize: 12, color: "#6b7280", margin: "0 0 6px" }}>
        A &lt;span&gt; (normally inline), styled to behave like a block:
      </p>
      <span style={{ display: "block", background: "#dcfce7", padding: 8, marginBottom: 8 }}>
        display: "block" makes this span start on its own line and fill the width.
      </span>
      <p style={{ fontSize: 12, color: "#6b7280", margin: "0 0 6px" }}>
        A &lt;div&gt; (normally block), styled to flow inline:
      </p>
      <div style={{ display: "inline", background: "#fee2e2", padding: "2px 6px" }}>an inline-styled div</div>
      <span> sits right next to it on the same line.</span>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
