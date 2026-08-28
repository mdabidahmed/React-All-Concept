import type { Topic } from "../../types";

export const htmlLayoutTopic: Topic = {
  id: "html-layout",
  title: "HTML Layout",
  category: "HTML Scripting & Layout",
  shortExplanation: `A set of **semantic layout elements** describe a page's overall structure — a header, navigation, main content, and a footer — instead of one giant pile of generic \`<div>\`s.

- \`<header>\`, \`<nav>\`, \`<main>\`, \`<footer>\` mark the recurring, page-level regions
- \`<section>\` groups a thematic chunk of content; \`<article>\` marks a self-contained, independently distributable piece
- \`<aside>\` holds content tangentially related to the main content, like a sidebar
- Every one of these renders as an unstyled block by default — their value is *semantic meaning*, not visual styling`,
  longExplanation: `HTML provides a handful of elements whose entire purpose is describing a page's large-scale structure, so both browsers and developers can tell *what role* a section of the page plays, not just where it sits visually.

- \`<header>\` — introductory content for a page or a section, typically a logo, title, or top navigation
- \`<nav>\` — a block of navigation links (a main menu, breadcrumbs, a table of contents)
- \`<main>\` — the page's primary, unique content; there should only be one \`<main>\` per page, and it should not repeat things that appear on every page (like a sidebar or header)
- \`<section>\` — a thematic grouping of content, usually with its own heading, like a "Features" or "Reviews" block on a landing page
- \`<article>\` — content that would make sense on its own, independent of the rest of the page — a blog post, a news story, a forum comment
- \`<aside>\` — content only loosely related to the surrounding content, commonly rendered as a sidebar (related links, an ad, a pull quote)
- \`<footer>\` — closing content for a page or section, typically containing contact info, copyright, or links back to related pages

None of these elements come with default visual styling beyond being a plain block-level box — using \`<header>\` instead of \`<div>\` doesn't change how anything *looks*. What it changes is meaning: assistive technology can build a navigable outline of "header, navigation, main content, sidebar, footer" straight from the tags, and search engines can better judge which part of the page is the actual content worth indexing. These tags render as ordinary JSX with no simulation needed — they behave exactly like any other HTML element.`,
  examples: [
    {
      id: "full-page-skeleton",
      title: "A full page skeleton",
      summary: "Header, nav, main with a section and an aside, and a footer — the classic page layout.",
      code: `function App() {
  const box = { border: "1px dashed #9ca3af", borderRadius: 6, padding: 10 };

  return (
    <div style={{ display: "grid", gap: 8 }}>
      <header style={box}>
        <strong>My Site</strong>
      </header>
      <nav style={box}>
        <a href="#" style={{ marginRight: 12 }}>Home</a>
        <a href="#" style={{ marginRight: 12 }}>Blog</a>
        <a href="#">Contact</a>
      </nav>
      <div style={{ display: "grid", gridTemplateColumns: "3fr 1fr", gap: 8 }}>
        <main style={box}>
          <section style={box}>
            <h2 style={{ margin: "0 0 4px" }}>Latest Posts</h2>
            <p style={{ margin: 0 }}>The page's primary content lives inside main.</p>
          </section>
        </main>
        <aside style={box}>
          <h3 style={{ margin: "0 0 4px" }}>Related</h3>
          <p style={{ margin: 0 }}>Loosely related links go here.</p>
        </aside>
      </div>
      <footer style={box}>
        <small>&copy; 2026 My Site</small>
      </footer>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "blog-listing-with-articles",
      title: "A blog listing built from articles",
      summary: "Each independently meaningful post is its own <article>, grouped inside a <section>.",
      code: `function App() {
  const posts = [
    { title: "Learning Semantic HTML", excerpt: "Why the tags you choose carry meaning of their own." },
    { title: "Flexbox in Five Minutes", excerpt: "The layout model every modern site relies on." },
  ];

  return (
    <section style={{ display: "grid", gap: 10 }}>
      <h2>Blog</h2>
      {posts.map((post) => (
        <article key={post.title} style={{ border: "1px solid #d1d5db", borderRadius: 6, padding: 10 }}>
          <h3 style={{ margin: "0 0 4px" }}>{post.title}</h3>
          <p style={{ margin: 0, color: "#6b7280" }}>{post.excerpt}</p>
        </article>
      ))}
    </section>
  );
}

render(<App />);`,
    },
    {
      id: "unstyled-by-default",
      title: "Semantic, but visually plain",
      summary: "Swapping <div> for <header>/<main>/<footer> changes meaning, not appearance, until CSS is added.",
      code: `function App() {
  return (
    <div style={{ display: "grid", gap: 6 }}>
      <p style={{ color: "#6b7280", margin: 0 }}>No styling applied below — every box looks identical either way:</p>
      <div style={{ display: "flex", gap: 12 }}>
        <div>
          <p style={{ margin: "0 0 4px", fontSize: 12 }}>Using &lt;div&gt;:</p>
          <div>Plain block content</div>
        </div>
        <div>
          <p style={{ margin: "0 0 4px", fontSize: 12 }}>Using &lt;section&gt;:</p>
          <section>Plain block content</section>
        </div>
      </div>
      <p style={{ color: "#6b7280", margin: 0 }}>
        The rendered box is identical — the difference only matters to screen readers, search engines, and other developers reading the markup.
      </p>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
