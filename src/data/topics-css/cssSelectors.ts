import type { Topic } from "../../types";

export const cssSelectorsTopic: Topic = {
  id: "css-selectors",
  title: "CSS Selectors",
  category: "CSS Basics",
  shortExplanation: `A **selector** decides which elements a rule applies to. The four most fundamental kinds:

- **Element** — \`p { }\` targets every \`<p>\` on the page
- **Class** — \`.card { }\` targets every element with \`class="card"\` — ==reusable== across many elements
- **ID** — \`#header { }\` targets the one element with \`id="header"\` — must be ==unique== per page
- **Universal** — \`* { }\` targets *every* element, commonly used for resets
- **Grouping** — \`h1, h2, p { }\` applies one declaration block to several selectors at once`,
  longExplanation: `Selecting the right elements is the first job of any CSS rule, and CSS offers several ways to do it, each suited to a different situation.

An **element selector** (also called a type selector) matches every instance of a tag: \`p { }\` applies to every \`<p>\` in the document, \`button { }\` to every \`<button>\`. It's the broadest and simplest kind, ideal for baseline styling that should apply everywhere a given tag appears — a good place for typography defaults, for instance.

A **class selector**, written with a leading dot (\`.card\`), matches every element carrying that class in its \`class\` attribute — and crucially, an element can carry *multiple* classes at once (\`class="card featured"\`), and a single class can be reused across as many elements as needed. This reusability is exactly why classes are the workhorse selector of real-world CSS: define \`.button\` once, apply it to fifty different \`<button>\` elements, and they all update together the moment the rule changes.

An **ID selector**, written with a leading hash (\`#header\`), matches the one element carrying \`id="header"\`. IDs are meant to be **unique** — only one element per page should ever have a given id — which makes id selectors well suited to one-off elements like a page's single header or main navigation, but poorly suited to anything that repeats. Because an id selector also carries much higher *specificity* than a class selector (harder to override later), reaching for a class by default and reserving ids for truly unique elements — or for JavaScript hooks and internal page links rather than styling — is the convention most real projects follow.

The **universal selector**, a lone asterisk (\`*\`), matches *every* element on the page with no exceptions. Its most common job is a CSS reset: \`* { margin: 0; padding: 0; box-sizing: border-box; }\` strips every browser's inconsistent default spacing in one line, before other rules build spacing back up intentionally. Because it touches everything, it's also the selector most likely to cause performance concerns or unexpected overrides in large stylesheets, so it's typically used sparingly and near the top of a stylesheet, not scattered throughout.

Any of these selectors can be **grouped** together with commas to share one declaration block: \`h1, h2, .title { font-family: serif; }\` — three otherwise-unrelated selectors, one rule. Grouping avoids repeating an identical declaration block for every selector that needs it, and it can mix element, class, and id selectors freely in the same comma-separated list.

Putting the four together, a practical rule of thumb: reach for an **element** selector for tag-wide defaults, a **class** selector for anything reusable (the vast majority of real styling), an **ID** selector only for a genuinely one-of-a-kind element, and the **universal** selector sparingly, mostly for resets. Selectors can also be *combined* — \`p.intro\` matches only a \`<p>\` that also has class \`intro\`, \`#sidebar p\` matches a \`<p>\` descended from the element with id \`sidebar\` — but those combinators build on exactly these four fundamentals.`,
  examples: [
    {
      id: "element-selector",
      title: "Element selector — every <p> at once",
      summary: "One rule targeting the tag name applies to every paragraph on the page.",
      code: `function ElementStyles() {
  return (
    <style>{\`
      p { color: #374151; line-height: 1.6; }
    \`}</style>
  );
}

function App() {
  return (
    <div>
      <ElementStyles />
      <p>Every paragraph gets this color and line-height...</p>
      <p>...including this second one, with zero extra markup.</p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "class-selector-reuse",
      title: "Class selector — reused across many elements",
      summary: "The same .tag class applied to several elements, each showing the identical style.",
      code: `function ClassStyles() {
  return (
    <style>{\`
      .tag {
        display: inline-block;
        background: #e0e7ff;
        color: #3730a3;
        padding: 4px 10px;
        border-radius: 999px;
        font-size: 12px;
        margin-right: 6px;
      }
    \`}</style>
  );
}

function App() {
  const labels = ["css", "selectors", "reusable", "classes"];
  return (
    <div>
      <ClassStyles />
      {labels.map((label) => (
        <span key={label} className="tag">{label}</span>
      ))}
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "id-vs-class-uniqueness",
      title: "ID selector vs. class selector",
      summary: "An id targets exactly one element; a class can style several at once — even the same element.",
      code: `function IdVsClassStyles() {
  return (
    <style>{\`
      #page-header { background: #111827; color: white; padding: 12px; border-radius: 6px 6px 0 0; }
      .panel { background: #f9fafb; padding: 12px; border: 1px solid #e5e7eb; }
    \`}</style>
  );
}

function App() {
  return (
    <div>
      <IdVsClassStyles />
      <div id="page-header">#page-header — there is only one of these on the page</div>
      <div className="panel">.panel — could be reused any number of times</div>
      <div className="panel" style={{ borderTop: "none" }}>Same .panel class, second instance</div>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "universal-and-grouped-selectors",
      title: "Universal selector reset + grouped selectors",
      summary: "* clears default spacing everywhere, while a grouped selector styles three tags identically.",
      code: `function ResetAndGroupStyles() {
  return (
    <style>{\`
      * { box-sizing: border-box; }

      h1, h2, p {
        margin: 0 0 6px 0;
        font-family: system-ui, sans-serif;
      }
    \`}</style>
  );
}

function App() {
  return (
    <div style={{ border: "1px dashed #9ca3af", padding: 10 }}>
      <ResetAndGroupStyles />
      <h1 style={{ fontSize: 20 }}>Heading</h1>
      <h2 style={{ fontSize: 15, color: "#6b7280" }}>Subheading</h2>
      <p>All three share the grouped rule's margin and font-family.</p>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
