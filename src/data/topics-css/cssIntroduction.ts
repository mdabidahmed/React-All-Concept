import type { Topic } from "../../types";

export const cssIntroductionTopic: Topic = {
  id: "css-introduction",
  title: "CSS Introduction",
  category: "CSS Basics",
  shortExplanation: `**CSS** (Cascading Style Sheets) describes *how* HTML elements should look — colors, spacing, fonts, layout — keeping presentation separate from the content and structure that HTML provides.

- HTML says *what* something is (a heading, a paragraph, a list)
- CSS says *how* it should appear (blue, bold, 16px, centered)
- "Cascading" refers to the rules that decide which style wins when several could apply to the same element`,
  longExplanation: `HTML and CSS split a webpage into two separate concerns on purpose: HTML describes the *meaning and structure* of content — this is a heading, that is a list, this is a button — while CSS describes *how that structure should be presented*. Before CSS existed, styling information (fonts, colors, spacing) was mixed directly into HTML tags and attributes, which made pages hard to maintain — changing a site's color scheme meant editing every single page. CSS moved all of that presentation logic into its own layer that can be written once and reused everywhere.

- A CSS **rule** targets one or more HTML elements with a *selector*, then lists the properties to change inside curly braces — this is covered in detail in the next topic
- The "cascading" in the name describes what happens when *multiple* rules could apply to the same element: CSS has a defined set of rules (based on specificity, source order, and \`!important\`) for deciding which one wins, rather than just applying all of them blindly
- CSS can be attached to HTML three ways: **inline** (a \`style\` attribute directly on one element), **internal** (a \`<style>\` block in the document's \`<head>\`), and **external** (a separate \`.css\` file linked with \`<link rel="stylesheet">\`) — external stylesheets are the most common in real projects because one file can style an entire site
- Modern CSS does far more than colors and fonts: it drives responsive layouts that adapt to any screen size, animations, and interactive states — all without a single line of JavaScript

Because this sandbox renders JSX rather than raw HTML files, these topics express every CSS concept as inline \`style\` objects or an injected \`<style>\` tag rather than a separate \`.css\` file — the CSS rules themselves, and everything they do, are identical to what you'd write in a real stylesheet.`,
  examples: [
    {
      id: "three-ways-to-add-css",
      title: "Inline, internal, and external CSS",
      summary: "The same paragraph styled three different ways, side by side, to compare where the CSS lives.",
      code: `function App() {
  return (
    <div style={{ display: "grid", gap: 12 }}>
      {/* Inline: a style attribute directly on the element */}
      <p style={{ color: "#2563eb", fontWeight: 600 }}>
        Inline CSS — written directly on this paragraph.
      </p>

      {/* Internal: a <style> block, as if it were in the document's <head> */}
      <style>{\`
        .internal-demo { color: #16a34a; font-weight: 600; }
      \`}</style>
      <p className="internal-demo">
        Internal CSS — defined once in a &lt;style&gt; block, applied by class.
      </p>

      <p style={{ color: "#6b7280", fontSize: 13 }}>
        External CSS works the same way as internal CSS, except the rules live in
        their own .css file and are linked with &lt;link rel="stylesheet"&gt;.
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "html-vs-css-separation",
      title: "Structure (HTML) vs. presentation (CSS)",
      summary: "The exact same HTML structure rendered with two completely different CSS treatments.",
      code: `function ProfileCard({ styleName }) {
  const theme =
    styleName === "bold"
      ? { background: "#111827", color: "white", padding: 20, borderRadius: 4 }
      : { background: "white", color: "#111827", padding: 20, borderRadius: 16, border: "2px dashed #d1d5db" };

  return (
    <div style={theme}>
      <h3 style={{ margin: "0 0 4px" }}>Ada Lovelace</h3>
      <p style={{ margin: 0, opacity: 0.8 }}>Mathematician & writer</p>
    </div>
  );
}

function App() {
  return (
    <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
      <ProfileCard styleName="bold" />
      <ProfileCard styleName="soft" />
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "cascade-last-rule-wins",
      title: "The cascade: the more specific (or later) rule wins",
      summary: "Two rules target the same element; the cascade decides which color actually applies.",
      code: `function CascadeStyles() {
  return (
    <style>{\`
      .notice { color: #6b7280; padding: 10px; border-radius: 6px; background: #f3f4f6; }
      .notice.urgent { color: white; background: #dc2626; }
    \`}</style>
  );
}

function App() {
  return (
    <div style={{ display: "grid", gap: 10 }}>
      <CascadeStyles />
      <div className="notice">Both ".notice" rules apply, but only one background wins.</div>
      <div className="notice urgent">
        This element matches ".notice" AND ".notice.urgent" — the more specific rule wins.
      </div>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
