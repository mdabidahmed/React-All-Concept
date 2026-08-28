import type { Topic } from "../../types";

export const htmlSemanticsTopic: Topic = {
  id: "html-semantics",
  title: "HTML Semantics",
  category: "HTML Scripting & Layout",
  shortExplanation: `A **semantic element** clearly describes its meaning to both the browser and the developer reading the code; a **non-semantic element** describes nothing at all.

- \`<article>\`, \`<nav>\`, \`<footer>\` are semantic — their name says what they contain
- \`<div>\` and \`<span>\` are non-semantic — generic boxes that could hold anything
- Semantic elements let screen readers build a navigable outline of a page automatically
- Search engines also weigh semantic structure when deciding what a page's content is actually about`,
  longExplanation: `HTML has always had generic containers — \`<div>\` for block-level grouping, \`<span>\` for inline grouping — that carry zero meaning of their own. They're useful precisely because they're neutral, but a page built *entirely* out of them tells a browser nothing about what any part of it actually is.

- A **semantic element**'s tag name itself communicates purpose: \`<nav>\` is unambiguously navigation, \`<article>\` is unambiguously a self-contained piece of content, \`<footer>\` is unambiguously closing material. A developer reading the markup — or a machine parsing it — doesn't need a class name or a comment to know what role it plays
- A **non-semantic element** like \`<div>\` says nothing beyond "this is a box." A page built only from \`<div class="nav">\`, \`<div class="article">\`, and \`<div class="footer">\` looks identical once styled, but a machine reading the raw markup only sees three anonymous boxes with different class names attached
- This matters most for **accessibility**: a screen reader can generate a jump-to-section outline directly from \`<nav>\`, \`<main>\`, \`<h1>\`—\`<h6>\`, letting a visually impaired visitor skip straight to the main content instead of tabbing through every link in a wall of unlabeled \`<div>\`s
- It also matters for **SEO** — search engines use the semantic structure of a page (what's inside \`<article>\`, whether headings are used correctly) as one signal for what the page is about and how to summarize it in results

Semantic elements render as ordinary JSX exactly like \`<div>\` does, with no simulation needed — the difference is entirely in what the tag *communicates*, not how it behaves.`,
  examples: [
    {
      id: "div-soup-version",
      title: "The non-semantic version: div soup",
      summary: "A working layout that tells a machine nothing — every region is an anonymous <div>.",
      code: `function App() {
  return (
    <div>
      <div className="top-bar">
        <div className="site-name">My Blog</div>
      </div>
      <div className="menu">
        <div>Home</div>
        <div>Posts</div>
      </div>
      <div className="content">
        <div className="post">
          <div className="post-title">Hello World</div>
          <div className="post-body">My first post.</div>
        </div>
      </div>
      <div className="bottom">&copy; 2026</div>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "semantic-version",
      title: "The same layout, made semantic",
      summary: "Identical visual result, but every region now announces its own role.",
      code: `function App() {
  return (
    <div>
      <header>
        <strong>My Blog</strong>
      </header>
      <nav>
        <a href="#">Home</a> <a href="#">Posts</a>
      </nav>
      <main>
        <article>
          <h1>Hello World</h1>
          <p>My first post.</p>
        </article>
      </main>
      <footer>&copy; 2026</footer>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "screen-reader-outline-comparison",
      title: "What a screen reader can build from each",
      summary: "A simulated 'landmark outline' extracted from each version, showing what assistive tech actually gets.",
      code: `function App() {
  const divVersionLandmarks = [];
  const semanticVersionLandmarks = ["header", "nav", "main", "article", "footer"];

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
      <div>
        <p style={{ margin: "0 0 4px", fontWeight: "bold" }}>Div-soup landmarks found:</p>
        {divVersionLandmarks.length === 0 ? (
          <p style={{ color: "#b91c1c" }}>None — a screen reader sees an undifferentiated block of content.</p>
        ) : null}
      </div>
      <div>
        <p style={{ margin: "0 0 4px", fontWeight: "bold" }}>Semantic version landmarks found:</p>
        <ul style={{ margin: 0, paddingLeft: 18, color: "#15803d" }}>
          {semanticVersionLandmarks.map((l) => (
            <li key={l}>{l}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
