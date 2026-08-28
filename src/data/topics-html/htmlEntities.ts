import type { Topic } from "../../types";

export const htmlEntitiesTopic: Topic = {
  id: "html-entities",
  title: "HTML Entities",
  category: "HTML Scripting & Layout",
  shortExplanation: `Certain characters are **reserved** in HTML because they have special meaning to the parser — writing them literally would be read as markup instead of text.

- \`<\` becomes \`&lt;\`, \`>\` becomes \`&gt;\`, \`&\` becomes \`&amp;\`
- \`&nbsp;\` inserts a non-breaking space — a space the browser won't collapse or wrap a line at
- An entity always starts with \`&\` and ends with \`;\`
- JSX has the same underlying concern — a literal \`<\` in JSX text isn't valid either`,
  longExplanation: `A browser's HTML parser treats \`<\` as the start of a tag and \`&\` as the start of an entity — so if a page's actual *text content* needs to contain one of those characters literally, writing it directly would be misread as markup rather than displayed as a character.

- \`&lt;\` displays a literal \`<\`, and \`&gt;\` displays a literal \`>\` — useful for showing example markup as visible text, exactly as this platform's own reference topics do
- \`&amp;\` displays a literal \`&\` — necessary because \`&\` is how *every* entity begins, so an unescaped \`&\` is ambiguous
- \`&nbsp;\` inserts a **non-breaking space**: a space character the browser will never collapse down to nothing and will never break a line at, useful for keeping something like "10 MB" from wrapping awkwardly across two lines
- An HTML entity always has the same shape: an ampersand, a name or number, and a semicolon — \`&amp;\`, \`&#38;\`, and even \`&#x26;\` (hexadecimal) all produce the same \`&\` character

JSX has a closely related concern, for a similar reason: a literal \`<\` typed directly inside JSX text is invalid, because JSX's own parser reads \`<\` as the start of an element, just like HTML does. Writing \`{'<'}\` or the entity \`&lt;\` both work as safe alternatives — the underlying problem (a reserved character colliding with markup syntax) is the same one HTML entities were invented to solve.`,
  examples: [
    {
      id: "the-three-reserved-characters",
      title: "The three most common entities",
      summary: "Escaping <, >, and & so they display as literal characters instead of being read as markup.",
      code: `function App() {
  return (
    <div style={{ display: "grid", gap: 8 }}>
      <p>Use &lt;p&gt; to start a paragraph.</p>
      <p>Fish &amp; chips is a classic dish.</p>
      <p>5 &lt; 10 and 10 &gt; 5.</p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "nbsp-non-breaking-space",
      title: "&nbsp; keeps text from wrapping",
      summary: "A narrow container shows a regular space wrapping mid-phrase, while &nbsp; holds two words together.",
      code: `function App() {
  return (
    <div style={{ display: "grid", gap: 10, maxWidth: 90 }}>
      <div style={{ border: "1px solid #d1d5db", borderRadius: 6, padding: 8 }}>
        <p style={{ margin: 0 }}>File size: 10 MB (regular space, may wrap)</p>
      </div>
      <div style={{ border: "1px solid #d1d5db", borderRadius: 6, padding: 8 }}>
        <p style={{ margin: 0 }}>File size: 10&nbsp;MB (non-breaking, stays together)</p>
      </div>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "why-escaping-is-needed",
      title: "What would go wrong without escaping",
      summary: "Shown as text: writing a raw < inside content would be read as the start of a tag, not a character.",
      code: `function App() {
  const broken = "<p>if (x < 10) { ... }</p>";
  const fixed = "<p>if (x &lt; 10) { ... }</p>";

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <div>
        <p style={{ margin: "0 0 4px", color: "#b91c1c" }}>Ambiguous — the parser sees the start of a new tag:</p>
        <pre style={{ background: "#0f172a", color: "#e2e8f0", padding: 10, borderRadius: 6, fontSize: 12 }}>{broken}</pre>
      </div>
      <div>
        <p style={{ margin: "0 0 4px", color: "#15803d" }}>Escaped — displays as a literal character:</p>
        <pre style={{ background: "#0f172a", color: "#e2e8f0", padding: 10, borderRadius: 6, fontSize: 12 }}>{fixed}</pre>
      </div>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "jsx-has-the-same-concern",
      title: "JSX's own version of the same problem",
      summary: "A literal < in JSX text isn't valid either — the fix is the same underlying idea.",
      code: `function App() {
  return (
    <div style={{ display: "grid", gap: 8 }}>
      <p>{"if (x < 10) { ... }"}</p>
      <p>The line above uses a JS string, since a bare &lt; in JSX text would start a new element.</p>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
