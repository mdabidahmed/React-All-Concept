import type { Topic } from "../../types";

export const cssCombinatorsTopic: Topic = {
  id: "css-combinators",
  title: "CSS Combinators",
  category: "CSS Layout & Positioning",
  shortExplanation: `Combinators describe a *relationship* between two selectors, letting a rule target elements based on where they sit relative to another element, rather than by class or tag alone.

- \`A B\` (space) — **descendant**: any \`B\` nested anywhere inside \`A\`, no matter how deep
- \`A > B\` — **child**: only a \`B\` that is a *direct* child of \`A\`
- \`A + B\` — **adjacent sibling**: the single \`B\` that comes *immediately* after \`A\`, same parent
- \`A ~ B\` — **general sibling**: *every* \`B\` that comes after \`A\`, same parent (not just the first)`,
  longExplanation: `A plain selector like \`.card\` or \`p\` matches elements purely by what they *are* — their class, tag, or attribute. Combinators add a second dimension: they match elements based on their *position relative to another element* in the document tree, which is what makes it possible to write a single rule like "style a paragraph, but only when it's directly inside a \`.warning\` box" without needing to add an extra class to every single paragraph by hand.

The **descendant combinator** is just a space between two selectors: \`.card p\` matches any \`<p>\` that is nested *anywhere* inside an element with class \`card\` — a direct child, a grandchild, or nested arbitrarily many levels deep, it doesn't matter. This is the combinator used constantly, often without even thinking of it as one — most real stylesheets are full of rules like \`.sidebar a\` or \`nav ul li\` that rely on descendant matching by default. Its main downside is exactly that unlimited depth: a descendant rule can accidentally match an element nested far deeper than intended, inside some completely different component that happens to also live inside the same ancestor.

The **child combinator**, \`>\`, tightens that up: \`.card > p\` matches a \`<p>\` only when it is an *immediate* child of \`.card\` — one level down, no deeper. A paragraph nested inside a \`<div>\` that is itself inside \`.card\` would match the descendant version (\`.card p\`) but not the child version (\`.card > p\`), because the direct parent of that paragraph is the \`<div>\`, not \`.card\` itself. The child combinator is the right tool whenever a style is meant to apply only to a component's *immediate* structure, without leaking into deeply nested unrelated content — a very common real case is styling only the direct \`<li>\` children of one \`<ul>\`, without accidentally also styling \`<li>\`s that belong to a nested sub-list one level deeper.

The **adjacent sibling combinator**, \`+\`, is a same-level relationship rather than a nesting one: \`h2 + p\` matches a \`<p>\` only when it comes *immediately* after an \`<h2>\`, sharing the same parent — the very next sibling element in source order, nothing further away. This is the standard way to add space above a paragraph specifically when it directly follows a heading (\`h2 + p { margin-top: 0; }\`, a common typographic reset), without affecting paragraphs anywhere else.

The **general sibling combinator**, \`~\`, relaxes "immediately after" to just "after, anywhere among the following siblings, same parent": \`h2 ~ p\` matches *every* \`<p>\` that comes after that \`<h2>\` at the same nesting level, not just the very next one. This is the combinator behind some clever pure-CSS interaction tricks — for example, \`input:checked ~ .panel\` can reveal a panel that comes after a checkbox in the markup, purely through CSS, whenever that checkbox becomes checked, with no JavaScript involved at all.

A useful way to keep all four straight: the space and \`>\` combinators both describe **nesting** (space = any depth, \`>\` = exactly one level), while \`+\` and \`~\` both describe **being a later sibling** (\`+\` = the very next one, \`~\` = any later one) — and it's worth noting siblings only ever mean elements that come *after* in source order; CSS has no combinator for "the sibling before."`,
  examples: [
    {
      id: "descendant-vs-child",
      title: "Descendant (space) vs. child (>) combinator",
      summary: "The child-combinator rule skips the deeply nested paragraph that the descendant rule still catches.",
      code: `function ComboStyles() {
  return (
    <style>{\`
      .descendant-demo p { color: #2563eb; }
      .child-demo > p { color: #dc2626; }
    \`}</style>
  );
}

function App() {
  return (
    <div style={{ display: "flex", gap: 24 }}>
      <div className="descendant-demo">
        <p style={{ margin: 0 }}>Direct child paragraph (blue)</p>
        <div>
          <p style={{ margin: 0 }}>Nested paragraph (still blue — any depth matches)</p>
        </div>
      </div>
      <div className="child-demo">
        <p style={{ margin: 0 }}>Direct child paragraph (red)</p>
        <div>
          <p style={{ margin: 0 }}>Nested paragraph (NOT red — only direct children match)</p>
        </div>
      </div>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "adjacent-sibling-heading-spacing",
      title: "Adjacent sibling (+) removes space after a heading",
      summary: "Only the paragraph directly following the heading loses its top margin.",
      code: `function ComboStyles() {
  return (
    <style>{\`
      .sibling-demo h3 + p { margin-top: 0; color: #16a34a; }
      .sibling-demo p { margin-top: 16px; }
    \`}</style>
  );
}

function App() {
  return (
    <div className="sibling-demo">
      <ComboStyles />
      <h3 style={{ margin: 0 }}>A Heading</h3>
      <p>This paragraph directly follows the heading — no top margin, colored green.</p>
      <p>This second paragraph is NOT adjacent to the heading, so it keeps its normal top margin.</p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "general-sibling-checkbox-reveal",
      title: "General sibling (~) reveals every later sibling at once",
      summary: "Checking the box highlights every paragraph that comes after it, not just the first one.",
      code: `function ComboStyles() {
  return (
    <style>{\`
      .reveal-demo input:checked ~ p { background: #fef08a; }
    \`}</style>
  );
}

function App() {
  return (
    <div className="reveal-demo">
      <ComboStyles />
      <label style={{ display: "block", marginBottom: 8 }}>
        <input type="checkbox" /> Highlight all paragraphs below
      </label>
      <p style={{ margin: "4px 0" }}>First paragraph after the checkbox.</p>
      <p style={{ margin: "4px 0" }}>Second paragraph — also matches, general sibling reaches every later one.</p>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
