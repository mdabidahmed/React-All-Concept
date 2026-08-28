import type { Topic } from "../../types";

export const cssAttributeSelectorsTopic: Topic = {
  id: "css-attribute-selectors",
  title: "CSS Attribute Selectors",
  category: "CSS Advanced & Effects",
  shortExplanation: `Attribute selectors target an element based on the ==presence or value of an HTML attribute== — not just its tag or class — using square-bracket syntax.

- \`[attr]\` — has the attribute at all, any value
- \`[attr="value"]\` — the attribute equals exactly this value
- \`[attr^="value"]\` — value **starts with** this string
- \`[attr$="value"]\` — value **ends with** this string
- \`[attr*="value"]\` — value **contains** this string anywhere
- Great for styling links, form inputs, or any markup by data already present, with no extra classes needed`,
  longExplanation: `Attribute selectors let CSS reach into an element's actual HTML attributes — not just its tag name, class, or ID — and match based on whether an attribute exists, or what its value looks like. They're especially useful when the information you want to style by is already sitting in the markup (a \`type\`, an \`href\`, a \`data-*\` attribute) and adding a class for it would just be duplicating information that's already there.

**The core forms:**

- **\`[attr]\`** matches any element that has the attribute at all, regardless of its value — \`[disabled]\` matches every disabled form control, \`[data-tooltip]\` matches every element carrying that data attribute.
- **\`[attr="value"]\`** matches only when the attribute's value is *exactly* that string — \`[type="checkbox"]\` matches inputs whose \`type\` is precisely \`"checkbox"\`, not \`"checkbox-group"\` or anything else.
- **\`[attr^="value"]\`** (the \`^\` means "starts with," like a caret pointing at the beginning) matches when the value **begins with** the given string — \`[href^="https"]\` matches any link whose \`href\` starts with \`https\`, including \`https://example.com\`.
- **\`[attr$="value"]\`** (the \`$\` means "ends with," echoing regex's end-of-string anchor) matches when the value **ends with** the given string — \`[href$=".pdf"]\` matches any link pointing at a PDF file, regardless of the rest of the URL.
- **\`[attr*="value"]\`** (the \`*\` means "contains," like a wildcard anywhere) matches when the given string appears **anywhere** inside the value — \`[class*="col-"]\` would match \`"col-sm-6"\`, \`"my-col-wrapper"\`, or anything else containing \`col-\`.
- Two additional, less common forms exist: \`[attr~="value"]\` matches when the attribute is a **space-separated list** containing \`value\` as one whole word (useful for attributes like a manually-space-separated \`data-tags\`), and \`[attr|="value"]\` matches \`value\` exactly or \`value\` followed by a hyphen (traditionally used for language codes like \`[lang|="en"]\` matching both \`en\` and \`en-US\`).

**Case sensitivity.** By default, attribute value matching is case-sensitive for most attributes (though HTML itself treats some attributes, like \`type\`, as case-insensitive in the browser's own handling). Adding \` i\` just before the closing bracket makes the match explicitly case-insensitive: \`[href$=".PDF" i]\` matches both \`.pdf\` and \`.PDF\`. An explicit \` s\` flag forces case-sensitive matching where a case-insensitive default would otherwise apply.

**Combining with other selectors.** Attribute selectors can be chained directly onto a tag name or class with no space (meaning "and"): \`input[type="checkbox"]\`, \`a.button[target="_blank"]\`. Adding a space instead means descendant matching, as usual: \`nav [data-active]\` matches any descendant of \`<nav>\` carrying \`data-active\`, regardless of tag.

**Why they're useful in practice.** A very common real-world case is distinguishing external links from internal ones purely from their \`href\` — \`a[href^="http"]\` (external, since internal links are usually root-relative or hash links) can automatically get an icon or \`target="_blank"\`-style visual cue, with zero JavaScript and no extra classes to remember to add by hand. Similarly, styling form controls by their \`type\` attribute (\`input[type="checkbox"]\`, \`input[type="email"]:invalid\`) lets one stylesheet handle every input on a form consistently without a wrapper class on each one. Attribute selectors also pair naturally with custom \`data-*\` attributes as a lightweight alternative to toggling classes for component state (\`[data-state="open"]\`), which is common in component libraries that want styling hooks without polluting \`className\`.

**A specificity note.** Every attribute selector — regardless of which of the forms above is used — counts the same in specificity as a single class selector (the "0,0,1,0" tier described in the CSS Specificity topic), which makes them easy to reason about alongside classes.`,
  examples: [
    {
      id: "presence-and-exact-value",
      title: "[attr] and [attr=\"value\"]",
      summary: "Styling every input that has a 'required' attribute, and specifically the ones with type=\"checkbox\".",
      code: `function AttrStyles() {
  return (
    <style>{\`
      input[required] { border-color: #dc2626; }
      input[type="checkbox"] { width: 18px; height: 18px; accent-color: #7c3aed; }
    \`}</style>
  );
}

function App() {
  return (
    <form style={{ display: "grid", gap: 10, maxWidth: 260 }}>
      <AttrStyles />
      <label style={{ fontSize: 13 }}>
        Email (required)
        <input type="email" required style={{ display: "block", width: "100%", padding: 6, marginTop: 4 }} />
      </label>
      <label style={{ fontSize: 13 }}>
        Nickname (optional)
        <input type="text" style={{ display: "block", width: "100%", padding: 6, marginTop: 4 }} />
      </label>
      <label style={{ fontSize: 13, display: "flex", alignItems: "center", gap: 8 }}>
        <input type="checkbox" />
        Subscribe to updates
      </label>
    </form>
  );
}

render(<App />);`,
    },
    {
      id: "external-vs-internal-links",
      title: "Styling links by href with ^= and $=",
      summary: "External https:// links get an outbound icon and color; a .pdf link is flagged separately by its file extension.",
      code: `function LinkAttrStyles() {
  return (
    <style>{\`
      .attr-links a { display: block; margin-bottom: 8px; text-decoration: none; color: #111827; }
      a[href^="https://"]::after { content: " ↗"; color: #2563eb; }
      a[href^="https://"] { color: #2563eb; }
      a[href$=".pdf"] { color: #b45309; }
      a[href$=".pdf"]::after { content: " (PDF)"; font-size: 11px; color: #b45309; }
      a[href^="#"] { color: #16a34a; }
    \`}</style>
  );
}

function App() {
  return (
    <div className="attr-links">
      <LinkAttrStyles />
      <a href="https://example.com" onClick={(e) => e.preventDefault()}>
        External site (https://...)
      </a>
      <a href="/reports/summary.pdf" onClick={(e) => e.preventDefault()}>
        Download the report (ends in .pdf)
      </a>
      <a href="#section-two" onClick={(e) => e.preventDefault()}>
        Jump to section two (internal #anchor)
      </a>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "contains-selector",
      title: "[attr*=\"value\"]: matching anywhere in the value",
      summary: "A data-tags attribute is matched by substring, regardless of what surrounds it.",
      code: `function ContainsStyles() {
  return (
    <style>{\`
      .tag-item { padding: 8px 10px; border-radius: 6px; margin-bottom: 6px; background: #f3f4f6; }
      [data-tags*="urgent"] { background: #fee2e2; border-left: 4px solid #dc2626; }
      [data-tags*="done"] { background: #dcfce7; border-left: 4px solid #16a34a; }
    \`}</style>
  );
}

function App() {
  return (
    <div>
      <ContainsStyles />
      <div className="tag-item" data-tags="project-urgent-review">
        data-tags="project-urgent-review" {"->"} matched by [data-tags*="urgent"]
      </div>
      <div className="tag-item" data-tags="task-done-archived">
        data-tags="task-done-archived" {"->"} matched by [data-tags*="done"]
      </div>
      <div className="tag-item" data-tags="low-priority">
        data-tags="low-priority" {"->"} matches neither rule
      </div>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "case-insensitive-and-combined",
      title: "Case-insensitive matching and combining with a tag",
      summary: "input[type=\"email\" i] combined with :focus, showing an attribute selector chained directly onto a tag name.",
      code: `function CombinedStyles() {
  return (
    <style>{\`
      input[type="email" i] {
        border: 2px solid #d1d5db;
        border-radius: 6px;
        padding: 8px 10px;
      }
      input[type="email" i]:focus {
        outline: none;
        border-color: #2563eb;
      }
    \`}</style>
  );
}

function App() {
  return (
    <div style={{ display: "grid", gap: 10, maxWidth: 240 }}>
      <CombinedStyles />
      <p style={{ margin: 0, fontSize: 13, color: "#6b7280" }}>
        input[type="email" i] matches regardless of how the type attribute's
        case was written in the markup.
      </p>
      <input type="EMAIL" placeholder="you@example.com" />
    </div>
  );
}

render(<App />);`,
    },
  ],
};
