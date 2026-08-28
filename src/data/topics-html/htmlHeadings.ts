import type { Topic } from "../../types";

export const htmlHeadingsTopic: Topic = {
  id: "html-headings",
  title: "HTML Headings",
  category: "HTML Basics",
  shortExplanation: `\`<h1>\` through \`<h6>\` define headings, with \`<h1>\` the most important and \`<h6>\` the least.

- Browsers render them in decreasing size and weight by default, matching their importance
- \`<h1>\` should typically appear once per page — it tells both **search engines** and **screen readers** what the page is fundamentally about
- Skipping levels (jumping from \`<h1>\` straight to \`<h4>\`) breaks the document outline and hurts accessibility
- Headings exist for **structure**, not for making text visually big — that's a styling job, handled separately by CSS`,
  longExplanation: `Headings do more work than they appear to at a glance — they're not just "big bold text," they define the *outline* of a document.

- HTML provides six levels: \`<h1>\`, \`<h2>\`, \`<h3>\`, \`<h4>\`, \`<h5>\`, \`<h6>\` — \`<h1>\` is the highest level of importance, and each level down represents a subsection of the one above it
- Browsers apply default styling that mirrors this hierarchy (larger, bolder text for \`<h1>\`, progressively smaller down to \`<h6>\`), but that visual styling is just a *convention*, not the point of headings
- **\`<h1>\` matters for SEO.** Search engines weigh a page's \`<h1>\` heavily when figuring out what the page is about, since it's expected to state the main topic. Most well-formed pages use exactly one \`<h1>\`
- **\`<h1>\` matters for accessibility.** Screen reader users frequently navigate a page by jumping between headings rather than reading top to bottom — many screen readers can pull up a full list of headings as a table of contents, letting someone skip straight to the section they need. A heading outline that skips levels (say, an \`<h1>\` followed directly by an \`<h4>\`, with no \`<h2>\` or \`<h3>\` used anywhere) makes that navigation confusing, because it implies a jump in depth that isn't reflected in the actual content
- **Headings describe structure, not size.** It's tempting to reach for an \`<h3>\` just because you want text to look bigger — but that misuses the tag and corrupts the outline for anyone relying on it. If text just needs to *look* larger without meaning "this starts a new section," that's a job for CSS \`font-size\`, not a heading tag

A well-formed page reads like an outline even with all styling stripped away: one \`<h1>\` title, a handful of \`<h2>\` sections underneath it, and \`<h3>\` subsections nested inside those, with no gaps in the sequence.`,
  examples: [
    {
      id: "six-heading-levels",
      title: "All six heading levels together",
      summary: "The default size and weight progression from h1 down to h6.",
      code: `function App() {
  return (
    <div>
      <h1>h1 — Main Page Title</h1>
      <h2>h2 — Major Section</h2>
      <h3>h3 — Subsection</h3>
      <h4>h4 — Minor Subsection</h4>
      <h5>h5 — Rarely Used</h5>
      <h6>h6 — Least Important</h6>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "logical-outline-vs-skipped-levels",
      title: "A logical outline vs. a skipped level",
      summary: "Side by side: an outline that steps down one level at a time versus one that jumps and breaks the hierarchy.",
      code: `function App() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
      <div style={{ border: "1px solid #16a34a", padding: 12, borderRadius: 6 }}>
        <p style={{ fontSize: 12, color: "#16a34a", margin: "0 0 8px" }}>Good: one level at a time</p>
        <h1 style={{ margin: "4px 0" }}>Article Title</h1>
        <h2 style={{ margin: "4px 0" }}>Section One</h2>
        <h3 style={{ margin: "4px 0" }}>Subsection</h3>
      </div>
      <div style={{ border: "1px solid #b91c1c", padding: 12, borderRadius: 6 }}>
        <p style={{ fontSize: 12, color: "#b91c1c", margin: "0 0 8px" }}>Bad: jumps straight from h1 to h4</p>
        <h1 style={{ margin: "4px 0" }}>Article Title</h1>
        <h4 style={{ margin: "4px 0" }}>Subsection?</h4>
      </div>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "headings-are-structure-not-size",
      title: "Structure vs. size — these are different jobs",
      summary: "A small-looking h2 and a large-looking paragraph, to prove size and heading level are independent.",
      code: `function App() {
  return (
    <div style={{ display: "grid", gap: 8 }}>
      <h2 style={{ fontSize: 14 }}>This is still a real h2, just styled small with CSS</h2>
      <p style={{ fontSize: 28, fontWeight: 700 }}>
        This is only a paragraph styled to look big — it is not a heading, and won't appear
        in a screen reader's heading outline.
      </p>
      <small style={{ color: "#6b7280" }}>
        Visual size comes from CSS <code>font-size</code>. Whether something is a heading — and
        which level — comes only from the tag used, not from how large it happens to look.
      </small>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "one-h1-per-page",
      title: "One h1 acting as the page's main title",
      summary: "A realistic small page with a single h1 and several h2 sections beneath it.",
      code: `function App() {
  return (
    <div>
      <h1>Understanding HTML Headings</h1>
      <h2>Why Order Matters</h2>
      <p>Headings should step down one level at a time to form a clean outline.</p>
      <h2>Why Search Engines Care</h2>
      <p>The single h1 tells a search engine what the whole page is fundamentally about.</p>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
