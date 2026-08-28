import type { Topic } from "../../types";

export const cssListsTopic: Topic = {
  id: "css-lists",
  title: "CSS Lists",
  category: "CSS Text & Typography",
  shortExplanation: `Every \`<ul>\`/\`<ol>\` gets a default marker (bullet or number) that CSS can restyle, replace, or remove entirely.

- \`list-style-type\`: \`disc\`, \`circle\`, \`square\`, \`decimal\`, or \`none\`
- \`list-style-position\`: \`outside\` (default, marker sits outside the text block) or \`inside\` (marker indents with the text)
- \`list-style-image\` swaps the marker for a custom image
- \`list-style\` is the shorthand for all three
- \`list-style: none\` + zero \`padding\`/\`margin\` is the standard first step for turning a list into a ==nav menu==
- \`::marker\` (or a \`::before\` pseudo-element) lets you build fully custom bullets`,
  longExplanation: `Lists come with built-in visual styling that most other HTML elements don't — an unordered list (\`<ul>\`) shows a bullet before each \`<li>\`, and an ordered list (\`<ol>\`) shows an automatically incrementing number. CSS controls every part of that marker through a small family of properties.

\`list-style-type\` chooses the marker's shape or numbering scheme. For unordered lists, the common values are \`disc\` (a filled circle, the default), \`circle\` (an outlined circle), and \`square\`; for ordered lists there's \`decimal\` (\`1, 2, 3\`), \`decimal-leading-zero\` (\`01, 02\`), \`lower-alpha\`/\`upper-alpha\` (\`a, b, c\` / \`A, B, C\`), and \`lower-roman\`/\`upper-roman\` (\`i, ii, iii\`). Setting \`list-style-type: none\` removes the marker entirely, without affecting anything else about the list.

\`list-style-position\` controls where the marker sits relative to the item's text, which matters most when an item wraps onto multiple lines. The default, \`outside\`, places the marker outside the content box, so wrapped lines all line up with each other, indented past the marker. \`inside\` pulls the marker inside the content box, which means it counts as part of the first line's text — wrapped lines after the first will start flush with the marker's position instead of lining up with the first line's text, a subtle layout difference that's easy to miss until a list item actually wraps.

\`list-style-image\` replaces the marker with a custom image (\`list-style-image: url(...)\`) — for icon-based bullet lists, though in modern CSS it's often simpler and more flexible to remove the default marker and add a custom one with \`::before\` instead, since \`::before\` allows full control over size, color, and spacing that \`list-style-image\` doesn't give you.

\`list-style\` is a shorthand combining \`list-style-type\`, \`list-style-position\`, and \`list-style-image\` into one declaration, in any order: \`list-style: square inside;\`.

One of the most common real-world list patterns is turning a \`<ul>\` into **navigation**: browsers give lists a default \`margin\` and \`padding\` (which is what creates the marker's indent) alongside the bullet itself, so a horizontal nav bar built from list items almost always starts with \`list-style: none; margin: 0; padding: 0;\` on the \`<ul>\`, before laying the \`<li>\`s out horizontally with \`display: flex\`. This is semantically important too — using a real \`<ul>\` for navigation (rather than a row of plain \`<div>\`s) tells screen readers "this is a list of N items," which \`list-style: none\` doesn't undo, even though it removes the bullets visually.

For full creative control over what a bullet looks like, there are two pseudo-element approaches. \`::marker\` is a pseudo-element specifically designed to target the marker box itself — it supports a narrow set of properties (\`color\`, \`font-*\`, and the \`content\` property to replace the marker's text entirely, e.g. \`content: "→ "\`), which is enough for recoloring bullets or swapping in a custom character without giving up the marker's automatic behavior (like numbering). For markers that need more elaborate styling — a background color, padding, an icon, precise sizing — the older but more powerful technique is to set \`list-style: none\` and add a \`::before\` pseudo-element to each \`<li>\` with its own \`content\`, sized and positioned however you like, since \`::before\` supports the full range of CSS properties that \`::marker\` doesn't.`,
  examples: [
    {
      id: "list-style-type-gallery",
      title: "list-style-type values",
      summary: "disc, circle, square, decimal, and none side by side.",
      code: `function App() {
  const col = { display: "grid", gap: 4 };

  return (
    <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
      <div style={col}>
        <strong>disc</strong>
        <ul style={{ listStyleType: "disc" }}>
          <li>Apples</li>
          <li>Bananas</li>
        </ul>
      </div>
      <div style={col}>
        <strong>circle</strong>
        <ul style={{ listStyleType: "circle" }}>
          <li>Apples</li>
          <li>Bananas</li>
        </ul>
      </div>
      <div style={col}>
        <strong>square</strong>
        <ul style={{ listStyleType: "square" }}>
          <li>Apples</li>
          <li>Bananas</li>
        </ul>
      </div>
      <div style={col}>
        <strong>decimal</strong>
        <ol style={{ listStyleType: "decimal" }}>
          <li>Apples</li>
          <li>Bananas</li>
        </ol>
      </div>
      <div style={col}>
        <strong>none</strong>
        <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
          <li>Apples</li>
          <li>Bananas</li>
        </ul>
      </div>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "list-style-position-comparison",
      title: "list-style-position: outside vs. inside",
      summary: "A wrapping item shows how outside keeps wrapped lines aligned, while inside pulls them under the marker.",
      code: `function App() {
  const longItem =
    "This list item is intentionally long enough that it wraps onto a second line.";

  return (
    <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
      <div style={{ maxWidth: 220 }}>
        <strong>outside (default)</strong>
        <ul style={{ listStylePosition: "outside" }}>
          <li>{longItem}</li>
        </ul>
      </div>
      <div style={{ maxWidth: 220 }}>
        <strong>inside</strong>
        <ul style={{ listStylePosition: "inside" }}>
          <li>{longItem}</li>
        </ul>
      </div>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "list-to-nav-menu",
      title: "Turning a list into a nav menu",
      summary: "list-style: none plus zero margin/padding, then a flex row for horizontal navigation.",
      code: `function App() {
  const links = ["Home", "Products", "Pricing", "Contact"];

  return (
    <nav>
      <ul
        style={{
          listStyle: "none",
          margin: 0,
          padding: 0,
          display: "flex",
          gap: 4,
        }}
      >
        {links.map((label) => (
          <li key={label}>
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              style={{
                display: "inline-block",
                padding: "8px 14px",
                color: "#111827",
                textDecoration: "none",
                borderRadius: 6,
                background: "#f3f4f6",
              }}
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

render(<App />);`,
    },
    {
      id: "custom-bullets-marker-and-before",
      title: "Custom bullets with ::marker and ::before",
      summary: "Two techniques for replacing the default bullet: the ::marker pseudo-element and a full ::before bullet.",
      code: `function BulletStyles() {
  return (
    <style>{\`
      .marker-list li::marker {
        content: "\\2192  ";
        color: #2563eb;
        font-size: 18px;
      }
      .before-list { list-style: none; padding-left: 0; }
      .before-list li {
        position: relative;
        padding-left: 26px;
        margin-bottom: 6px;
      }
      .before-list li::before {
        content: "";
        position: absolute;
        left: 0;
        top: 6px;
        width: 12px;
        height: 12px;
        border-radius: 3px;
        background: #16a34a;
      }
    \`}</style>
  );
}

function App() {
  return (
    <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
      <div>
        <strong>::marker with a custom arrow</strong>
        <BulletStyles />
        <ul className="marker-list">
          <li>First step</li>
          <li>Second step</li>
        </ul>
      </div>
      <div>
        <strong>::before with a colored square</strong>
        <ul className="before-list">
          <li>Fully custom bullet</li>
          <li>Any shape or color</li>
        </ul>
      </div>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
