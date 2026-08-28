import type { Topic } from "../../types";

export const htmlStyleGuideTopic: Topic = {
  id: "html-style-guide",
  title: "HTML Style Guide",
  category: "HTML Scripting & Layout",
  shortExplanation: `A style guide is a set of conventions for writing HTML that is **consistent** and **easy for other people to read** — none of it is enforced by browsers, all of it makes a codebase easier to work in.

- Always declare \`<!DOCTYPE html>\` as the very first line of a document
- Use **lowercase** tag names and attribute names
- Always **quote** attribute values, and always **close** elements that need closing
- Indent nested elements consistently, and avoid unnecessarily deep nesting`,
  longExplanation: `Browsers are extremely forgiving about *how* HTML is written — mismatched casing, missing quotes, and inconsistent indentation will almost always still render *something*. A style guide exists anyway, because "renders correctly" and "is pleasant and safe to maintain" are different goals.

- **Always declare a doctype**: \`<!DOCTYPE html>\` as the first line tells the browser to use modern standards-mode rendering rather than a legacy compatibility mode
- **Use lowercase** for tag and attribute names — \`<p>\` and \`class\`, not \`<P>\` and \`CLASS\`. HTML doesn't require it, but mixing cases inconsistently across a codebase makes it harder to scan
- **Quote every attribute value** — \`class="menu"\`, not \`class=menu\`. An unquoted value works until it contains a space, at which point it silently breaks
- **Close every element that needs closing**, even when a browser would tolerate leaving it open (like \`<p>\` or \`<li>\`) — it makes the document's structure unambiguous to both humans and tools
- **Indent nested elements** by a consistent amount (2 spaces is the most common convention) so the depth of the tree is visible at a glance
- **Avoid unnecessarily deep nesting** — a wrapper \`<div>\` around a wrapper \`<div>\` around a single \`<span>\` adds no value and makes the real structure harder to find

None of this changes how a page *behaves* — it's purely about making the raw markup something a human can read and trust. Because a style guide is a set of writing conventions rather than a renderable feature, the examples below display messy and clean markup as plain text rather than pretending there's something to visually run.`,
  examples: [
    {
      id: "doctype-case-and-quotes",
      title: "Doctype, casing, and quoted attributes",
      summary: "The same tiny snippet, first ignoring convention, then following it.",
      code: `function App() {
  const messy = "<BODY>\\n<DIV CLASS=box>\\n<P>Hello</P>\\n</DIV>\\n</BODY>";
  const clean = "<!DOCTYPE html>\\n<body>\\n  <div class=\\"box\\">\\n    <p>Hello</p>\\n  </div>\\n</body>";

  return (
    <div style={{ display: "grid", gap: 12 }}>
      <div>
        <p style={{ margin: "0 0 4px", color: "#b91c1c" }}>Works, but avoid this:</p>
        <pre style={{ background: "#0f172a", color: "#e2e8f0", padding: 10, borderRadius: 6, fontSize: 12 }}>{messy}</pre>
      </div>
      <div>
        <p style={{ margin: "0 0 4px", color: "#15803d" }}>Preferred:</p>
        <pre style={{ background: "#0f172a", color: "#e2e8f0", padding: 10, borderRadius: 6, fontSize: 12 }}>{clean}</pre>
      </div>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "closing-elements-and-indentation",
      title: "Closing elements and consistent indentation",
      summary: "Leaving list items open and indenting erratically both compile, but both hurt readability.",
      code: `function App() {
  const messy = "<ul>\\n<li>Milk\\n<li>Eggs\\n    <li>Bread\\n</ul>";
  const clean = "<ul>\\n  <li>Milk</li>\\n  <li>Eggs</li>\\n  <li>Bread</li>\\n</ul>";

  return (
    <div style={{ display: "grid", gap: 12 }}>
      <div>
        <p style={{ margin: "0 0 4px", color: "#b91c1c" }}>Unclosed items, uneven indentation:</p>
        <pre style={{ background: "#0f172a", color: "#e2e8f0", padding: 10, borderRadius: 6, fontSize: 12 }}>{messy}</pre>
      </div>
      <div>
        <p style={{ margin: "0 0 4px", color: "#15803d" }}>Closed, evenly indented:</p>
        <pre style={{ background: "#0f172a", color: "#e2e8f0", padding: 10, borderRadius: 6, fontSize: 12 }}>{clean}</pre>
      </div>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "avoiding-deep-nesting",
      title: "Avoiding unnecessary nesting",
      summary: "Three wrapper elements around one line of text vs. the same content with no wasted structure.",
      code: `function App() {
  const messy = "<div>\\n  <div>\\n    <div>\\n      <span>Welcome back</span>\\n    </div>\\n  </div>\\n</div>";
  const clean = "<p>Welcome back</p>";

  return (
    <div style={{ display: "grid", gap: 12 }}>
      <div>
        <p style={{ margin: "0 0 4px", color: "#b91c1c" }}>Three wrapper elements deep, for no reason:</p>
        <pre style={{ background: "#0f172a", color: "#e2e8f0", padding: 10, borderRadius: 6, fontSize: 12 }}>{messy}</pre>
      </div>
      <div>
        <p style={{ margin: "0 0 4px", color: "#15803d" }}>Says the same thing, with no wasted structure:</p>
        <pre style={{ background: "#0f172a", color: "#e2e8f0", padding: 10, borderRadius: 6, fontSize: 12 }}>{clean}</pre>
      </div>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
