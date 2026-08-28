import type { Topic } from "../../types";

export const htmlVsXhtmlTopic: Topic = {
  id: "html-vs-xhtml",
  title: "HTML vs. XHTML",
  category: "HTML Scripting & Layout",
  shortExplanation: `**XHTML** rewrites HTML to follow strict **XML** syntax rules — every tag must close, and one syntax mistake can fail the whole page.

- Every element must have a closing tag, including void elements — \`<br />\` instead of \`<br>\`
- All tag and attribute names must be **lowercase**
- Every attribute value must be quoted — no bare \`disabled\` without \`="disabled"\`
- Regular HTML's parser is forgiving of small mistakes; a strict XHTML parser is not`,
  longExplanation: `Regular HTML has always been forgiving: browsers guess at what a page author *meant* even when tags are left open or attributes are unquoted, and the page still renders. XHTML trades that leniency for strict, XML-compliant syntax.

- **Every tag must be explicitly closed.** \`<br>\` and \`<img src="...">\` are valid, unclosed "void" elements in ordinary HTML; in XHTML they must be self-closed as \`<br />\` and \`<img src="..." />\`
- **Lowercase only.** \`<DIV>\` or \`<Div>\` are tolerated by an HTML parser but invalid in XHTML — tag and attribute names must be lowercase
- **Every attribute value must be quoted.** \`<input disabled>\` (a valid HTML boolean attribute shorthand) must be written \`<input disabled="disabled" />\` in XHTML
- **Errors are fatal.** A regular HTML parser skips over many mistakes and still shows *something*; an XHTML document with even one syntax violation can fail to render at all, since it's parsed as XML rather than with HTML's error-tolerant rules

In practice, modern web development mostly writes standard HTML5 rather than XHTML — but the *discipline* XHTML enforced (always close tags, always quote values, always lowercase) is still widely followed as good practice, and it's exactly what tools like JSX enforce as a hard requirement rather than a style choice.`,
  examples: [
    {
      id: "valid-html-invalid-xhtml",
      title: "Valid in HTML, invalid in XHTML",
      summary: "A snippet an ordinary HTML parser accepts without complaint, but a strict XHTML parser would reject.",
      code: `function App() {
  const snippet = \`<DIV>
  <P>A paragraph with an unclosed line break<BR>
  <input type="text" disabled>
</DIV>\`;

  return (
    <div style={{ display: "grid", gap: 8 }}>
      <p style={{ fontWeight: 600 }}>Valid HTML, invalid XHTML:</p>
      <pre style={{ background: "#fef2f2", color: "#7f1d1d", padding: 12, borderRadius: 6, fontSize: 13 }}>
        {snippet}
      </pre>
      <small>Uppercase tags, an unclosed &lt;BR&gt;, and an unquoted "disabled" all fail strict XHTML parsing.</small>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "corrected-xhtml",
      title: "The corrected, XHTML-compliant version",
      summary: "The same markup, rewritten to follow every strict XHTML rule.",
      code: `function App() {
  const snippet = \`<div>
  <p>A paragraph with a properly closed line break<br />
  <input type="text" disabled="disabled" />
</div>\`;

  return (
    <div style={{ display: "grid", gap: 8 }}>
      <p style={{ fontWeight: 600 }}>XHTML-compliant:</p>
      <pre style={{ background: "#f0fdf4", color: "#14532d", padding: 12, borderRadius: 6, fontSize: 13 }}>
        {snippet}
      </pre>
      <small>Lowercase tags, a self-closed &lt;br /&gt;, and a fully quoted attribute value.</small>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "forgiving-vs-strict",
      title: "Forgiving parsing vs. strict parsing",
      summary: "A simple illustration of what happens when a real browser meets a small markup mistake under each model.",
      code: `function App() {
  return (
    <div style={{ display: "grid", gap: 10 }}>
      <div style={{ padding: 12, borderRadius: 6, background: "#f0fdf4" }}>
        <p style={{ fontWeight: 600, color: "#14532d", margin: "0 0 4px" }}>Ordinary HTML parser</p>
        <p style={{ margin: 0, fontSize: 13 }}>
          Sees an unclosed tag or a missing quote, makes a best guess, and keeps rendering the rest of the page.
        </p>
      </div>
      <div style={{ padding: 12, borderRadius: 6, background: "#fef2f2" }}>
        <p style={{ fontWeight: 600, color: "#7f1d1d", margin: "0 0 4px" }}>Strict XHTML (XML) parser</p>
        <p style={{ margin: 0, fontSize: 13 }}>
          Treats the same mistake as a fatal error — the document can stop rendering entirely at the point of the error.
        </p>
      </div>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
