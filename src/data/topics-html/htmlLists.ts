import type { Topic } from "../../types";

export const htmlListsTopic: Topic = {
  id: "html-lists",
  title: "HTML Lists",
  category: "HTML Structure",
  shortExplanation: `HTML has three kinds of lists: \`<ul>\` (**unordered**, bullets), \`<ol>\` (**ordered**, numbered), and \`<dl>\` (**description list**, term/definition pairs).

- \`<ul>\` and \`<ol>\` both contain \`<li>\` (list item) elements
- \`<dl>\` pairs a \`<dt>\` (term) with one or more \`<dd>\` (description) elements
- Lists can nest — an entire \`<ul>\` or \`<ol>\` can sit inside a single \`<li>\`
- When a list is built from an array with \`.map()\` in JSX, each \`<li>\` needs a unique \`key\` prop — a JSX-specific requirement with no HTML equivalent`,
  longExplanation: `Lists group related items together, and HTML has a specific tag for each *kind* of grouping rather than one generic list element.

- **\`<ul>\`** (unordered list) renders each \`<li>\` with a bullet — use it when the order of items doesn't matter
- **\`<ol>\`** (ordered list) renders each \`<li>\` with an automatically incrementing number — use it when sequence matters (steps in a recipe, ranked results)
- **\`<dl>\`** (description list) is different in shape: instead of \`<li>\`, it pairs a \`<dt>\` (the term being defined) with one or more \`<dd>\` (its definition or description) — useful for glossaries, metadata, or key/value information
- **Nesting**: a list item can contain an entire sub-list. A \`<ul>\` inside an \`<li>\` renders as an indented sub-list, which is how multi-level outlines and navigation menus are typically structured
- **The \`key\` prop, a JSX-only concern**: plain HTML has no equivalent of this — but when a list in JSX is generated dynamically from an array with \`.map()\`, React needs a stable, unique \`key\` on each \`<li>\` to track which item is which across re-renders. Forgetting it doesn't break a static list, but it causes real bugs (and a console warning) the moment the list's data can change, reorder, or filter

Every list tag — \`ul\`, \`ol\`, \`li\`, \`dl\`, \`dt\`, \`dd\` — is written exactly the same in JSX as in plain HTML; \`key\` is the one addition that only exists because JSX is being generated dynamically by JavaScript.`,
  examples: [
    {
      id: "ul-vs-ol",
      title: "Unordered vs. ordered lists",
      summary: "Bullets when order doesn't matter, numbers when it does.",
      code: `function App() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
      <div>
        <p style={{ fontSize: 12, color: "#6b7280", margin: "0 0 4px" }}>{'<ul> — unordered'}</p>
        <ul>
          <li>Milk</li>
          <li>Eggs</li>
          <li>Bread</li>
        </ul>
      </div>
      <div>
        <p style={{ fontSize: 12, color: "#6b7280", margin: "0 0 4px" }}>{'<ol> — ordered'}</p>
        <ol>
          <li>Preheat the oven</li>
          <li>Mix the ingredients</li>
          <li>Bake for 20 minutes</li>
        </ol>
      </div>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "description-list",
      title: "A description list",
      summary: "dl pairs a term (dt) with its definition (dd) — different shape from ul/ol.",
      code: `function App() {
  return (
    <dl>
      <dt style={{ fontWeight: "bold" }}>HTML</dt>
      <dd style={{ margin: "0 0 8px" }}>The markup language that structures a web page.</dd>
      <dt style={{ fontWeight: "bold" }}>CSS</dt>
      <dd style={{ margin: 0 }}>The language that styles a web page's appearance.</dd>
    </dl>
  );
}

render(<App />);`,
    },
    {
      id: "nested-list",
      title: "Nesting a list inside a list item",
      summary: "A sub-list lives entirely inside its parent's <li>, rendering as an indented outline.",
      code: `function App() {
  return (
    <ul>
      <li>
        Frontend
        <ul>
          <li>HTML</li>
          <li>CSS</li>
          <li>JavaScript</li>
        </ul>
      </li>
      <li>
        Backend
        <ul>
          <li>Node.js</li>
          <li>Databases</li>
        </ul>
      </li>
    </ul>
  );
}

render(<App />);`,
    },
    {
      id: "list-from-array-with-key",
      title: "Generating a list with .map() and a key",
      summary: "Each <li> needs a unique key when the list comes from an array — a JSX-only requirement.",
      code: `function App() {
  const fruits = ["Apple", "Banana", "Cherry"];

  return (
    <ul>
      {fruits.map((fruit) => (
        <li key={fruit}>{fruit}</li>
      ))}
    </ul>
  );
}

render(<App />);`,
    },
  ],
};
