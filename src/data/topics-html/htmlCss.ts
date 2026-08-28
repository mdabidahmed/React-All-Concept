import type { Topic } from "../../types";

export const htmlCssTopic: Topic = {
  id: "html-css",
  title: "HTML CSS",
  category: "HTML Structure",
  shortExplanation: `**CSS** (Cascading Style Sheets) controls how HTML looks, and there are three ways to attach it to a page: **inline**, **internal**, and **external**.

- *Inline* — a \`style\` attribute on one single element
- *Internal* — a \`<style>\` block placed inside \`<head>\`, applying rules to the whole page
- *External* — a separate \`.css\` file linked in with \`<link rel="stylesheet" href="...">\`, shared across many pages
- ==External stylesheets== are the standard choice for real projects — one file can style an entire site, and updating it updates every page at once`,
  longExplanation: `HTML describes *structure*; CSS describes *appearance*. There are exactly three places CSS rules can live, and knowing when to reach for each one is a core web skill.

- **Inline CSS** sets the \`style\` attribute directly on one element, e.g. \`<p style="color: blue;">\`. It wins the styling priority battle (inline beats internal and external), but it only affects that single element and has to be repeated everywhere it's needed — it doesn't scale past a quick, one-off tweak
- **Internal CSS** lives in a \`<style>\` block inside the document's \`<head>\`, using CSS selectors to target elements by tag, class, or id: \`<style>p { color: blue; }</style>\`. Every matching element on *that page* picks up the rule, but a second page needs its own copy of the same \`<style>\` block
- **External CSS** moves the rules into their own \`.css\` file, referenced from the page's \`<head>\` with \`<link rel="stylesheet" href="styles.css">\`. This is the approach almost every real website uses: *one* file can style an unlimited number of HTML pages, and changing a single rule in that file instantly updates every page that links to it — no hunting through each page's markup
- The three approaches can be mixed on the same page, and CSS resolves conflicts with a well-defined **cascade** (inline > internal/external, with more specific selectors generally winning over less specific ones) — hence the "C" in CSS

Because this sandbox only renders one live JSX component with no separate \`<head>\` or linked files, the runnable examples below stick to inline styles (as \`style={{ ... }}\` objects, the JSX equivalent of the \`style\` attribute) — but the prose and mock examples walk through what internal and external CSS look like in a real \`.html\` file.`,
  examples: [
    {
      id: "inline-css-recap",
      title: "Inline CSS: the style attribute",
      summary: "A style attribute applied directly to a single element — works, but doesn't scale.",
      code: `function App() {
  return (
    <div>
      <p style={{ color: "#2563eb", fontSize: 18 }}>
        This paragraph is styled inline. In real HTML: {'<p style="color: blue; font-size: 18px;">'}
      </p>
      <small>
        In JSX the style attribute takes an object, not a CSS string — camelCase property names, values as JS.
      </small>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "internal-css-mockup",
      title: "What internal CSS looks like in real HTML",
      summary: "A <style> block in <head> targets elements across the whole page by selector — shown here as a code sample, since a real <head> can't run in this sandbox.",
      code: `function App() {
  const internalCssExample = \`<head>
  <style>
    p { color: blue; }
    .highlight { background: yellow; }
  </style>
</head>
<body>
  <p>Every paragraph on this page is now blue.</p>
  <p class="highlight">This one also has a yellow background.</p>
</body>\`;

  return (
    <div>
      <p>An internal stylesheet lives inside &lt;head&gt;, and its rules apply to the whole document:</p>
      <pre style={{ background: "#0f172a", color: "#e2e8f0", padding: 12, borderRadius: 6, overflowX: "auto" }}>
        {internalCssExample}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "external-css-mockup",
      title: "What external CSS looks like in real HTML",
      summary: "One .css file linked from <head>, shared across every page of a site.",
      code: `function App() {
  const pageOne = \`<head>
  <link rel="stylesheet" href="styles.css">
</head>\`;
  const cssFile = \`/* styles.css */
body { font-family: Arial, sans-serif; }
h1 { color: #0d9488; }\`;

  return (
    <div style={{ display: "grid", gap: 12 }}>
      <div>
        <p style={{ fontSize: 12, color: "#6b7280", margin: "0 0 4px" }}>index.html and about.html both link the same file:</p>
        <pre style={{ background: "#0f172a", color: "#e2e8f0", padding: 12, borderRadius: 6, overflowX: "auto" }}>
          {pageOne}
        </pre>
      </div>
      <div>
        <p style={{ fontSize: 12, color: "#6b7280", margin: "0 0 4px" }}>styles.css, shared by every page that links it:</p>
        <pre style={{ background: "#0f172a", color: "#e2e8f0", padding: 12, borderRadius: 6, overflowX: "auto" }}>
          {cssFile}
        </pre>
      </div>
      <p>Changing this one file updates the look of every page that links to it — no per-page edits needed.</p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "why-external-wins",
      title: "Why external stylesheets are the standard choice",
      summary: "Comparing all three approaches side by side for a five-page site.",
      code: `function App() {
  const rows = [
    { method: "Inline", scope: "One element", toRestyleFivePages: "Edit every element, on every page" },
    { method: "Internal", scope: "One page", toRestyleFivePages: "Edit the <style> block on every page" },
    { method: "External", scope: "Every linked page", toRestyleFivePages: "Edit one .css file, once" },
  ];

  return (
    <table style={{ borderCollapse: "collapse", width: "100%" }}>
      <thead>
        <tr>
          <th style={{ border: "1px solid #d1d5db", padding: 8, textAlign: "left" }}>Method</th>
          <th style={{ border: "1px solid #d1d5db", padding: 8, textAlign: "left" }}>Scope</th>
          <th style={{ border: "1px solid #d1d5db", padding: 8, textAlign: "left" }}>To restyle a 5-page site</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.method}>
            <td style={{ border: "1px solid #d1d5db", padding: 8 }}>{row.method}</td>
            <td style={{ border: "1px solid #d1d5db", padding: 8 }}>{row.scope}</td>
            <td style={{ border: "1px solid #d1d5db", padding: 8 }}>{row.toRestyleFivePages}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

render(<App />);`,
    },
  ],
};
