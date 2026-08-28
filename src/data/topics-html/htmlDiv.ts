import type { Topic } from "../../types";

export const htmlDivTopic: Topic = {
  id: "html-div",
  title: "HTML Div",
  category: "HTML Structure",
  shortExplanation: `\`<div>\` is a generic, **block-level container** with no meaning of its own — it exists purely to group other elements for styling or layout.

- It renders nothing visible by itself — no default border, spacing, or styling
- It's the go-to wrapper when no more specific, meaningful tag fits
- Semantic alternatives like \`<section>\`, \`<article>\`, and \`<header>\` (covered in a later topic) describe *why* a group exists — a \`<div>\` doesn't`,
  longExplanation: `\`<div>\` ("division") is deliberately the most generic element HTML offers — a plain rectangular block with no semantic meaning attached to the tag itself.

- Unlike \`<h1>\` (a heading), \`<table>\` (tabular data), or \`<a>\` (a link), a \`<div>\` says nothing about *what kind of content* it holds. Its only built-in behavior is being block-level (starting on a new line, filling available width)
- That "meaninglessness" is exactly what makes it useful: it's the standard tool for **grouping** a handful of elements together so they can be styled, positioned, or manipulated as one unit — a card, a sidebar, a row in a custom layout
- Because a \`<div>\` carries no semantic information, screen readers and search engines learn nothing about the *purpose* of a \`<div>\`'s content from the tag alone, unlike a \`<nav>\` or a \`<table>\`
- HTML does provide more descriptive alternatives for common structural roles — \`<header>\`, \`<nav>\`, \`<main>\`, \`<section>\`, \`<article>\`, \`<footer>\` — which say *why* a chunk of the page exists rather than just marking it as "a box." Those get their own dedicated coverage; the short version is: reach for one of them when it accurately describes the role of that section, and fall back to a plain \`<div>\` when nothing more specific fits (a purely visual wrapper, a layout row, a styling hook)
- \`<div>\` is everywhere in real-world HTML and in JSX alike — most React components return a \`<div>\` wrapping their actual content for exactly this grouping reason

\`<div>\` works identically in JSX and plain HTML — no attribute or behavior differences at all.`,
  examples: [
    {
      id: "div-as-grouping-container",
      title: "div grouping unrelated elements into one unit",
      summary: "A div with no meaning of its own, used only to bundle a heading, text, and a button together.",
      code: `function App() {
  return (
    <div style={{ border: "1px solid #d1d5db", borderRadius: 8, padding: 16 }}>
      <h3 style={{ margin: "0 0 8px" }}>Card Title</h3>
      <p style={{ margin: "0 0 8px" }}>This entire card is one div, grouping a heading, text, and a button.</p>
      <button>Learn more</button>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "div-has-no-default-look",
      title: "A div renders nothing by itself",
      summary: "Without any styling, a div is invisible — it only exists in the layout, not visually.",
      code: `function App() {
  return (
    <div>
      <p>Text before an unstyled div:</p>
      <div>This text is inside a div with no styling at all — it looks exactly like plain text.</div>
      <p>Text after it — notice the div added no visible border, background, or spacing on its own.</p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "nested-divs-for-layout",
      title: "Nesting divs to build a layout",
      summary: "A common pattern: outer divs for layout structure, inner content for the actual page.",
      code: `function App() {
  return (
    <div style={{ display: "flex", gap: 12 }}>
      <div style={{ flex: 1, background: "#f3f4f6", padding: 12, borderRadius: 6 }}>
        <p style={{ margin: 0 }}>Sidebar div</p>
      </div>
      <div style={{ flex: 3, background: "#eff6ff", padding: 12, borderRadius: 6 }}>
        <p style={{ margin: 0 }}>Main content div — neither div means anything on its own; only the layout CSS gives them a role.</p>
      </div>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "div-vs-semantic-preview",
      title: "div vs. a semantic alternative (preview)",
      summary: "A quick look ahead: <section> says what a block is for; <div> says nothing.",
      code: `function App() {
  return (
    <div style={{ display: "grid", gap: 10 }}>
      <div style={{ background: "#fef3c7", padding: 10, borderRadius: 6 }}>
        {'<div>'} — a generic box. Fine here, but says nothing about its purpose.
      </div>
      <div style={{ background: "#dcfce7", padding: 10, borderRadius: 6 }}>
        {'<section>'}, {'<article>'}, {'<header>'} — semantic alternatives that describe the role of the content
        (covered in their own topic).
      </div>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
