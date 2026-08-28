import type { Topic } from "../../types";

export const cssCountersTopic: Topic = {
  id: "css-counters",
  title: "CSS Counters",
  category: "CSS Components",
  shortExplanation: `**CSS counters** are variables the browser increments automatically as it renders matching elements, letting you auto-number sections, steps, or list items without hardcoding any numbers.

- \`counter-reset: name\` — creates/resets a named counter (usually on a parent)
- \`counter-increment: name\` — bumps the counter by 1 each time a matching element is rendered
- \`content: counter(name)\` inside \`::before\` — displays the counter's current value
- Nesting a second counter enables multi-level numbering, like \`2.3\` for section 2, item 3`,
  longExplanation: `Numbering a list of items is easy with an ordinary \`<ol>\`, but plenty of real designs need auto-incrementing numbers in places an \`<ol>\` doesn't fit — custom section headings, a multi-step form's step indicators, or numbered figure captions. CSS counters solve exactly this: they're integer variables, scoped to the document (or a subtree), that the browser increments automatically as it walks through matching elements — no JavaScript, and no manually typing "1.", "2.", "3." into the content itself.

**The three pieces work together.** \`counter-reset: "section"\` creates a counter named \`section\` and initializes it to \`0\` (or a value you specify) — this typically goes on a *container* element, so the counter starts fresh at the top of that container. \`counter-increment: "section"\` then goes on the element that should actually be counted (say, every heading with a particular class) — each time the browser encounters one, it adds 1 to the counter before that element renders. Finally, \`content: counter(section)\` — placed inside a \`::before\` pseudo-element, since counters only produce visible output through generated content — displays the counter's *current* value at that point in the document.

- \`counter-reset\` **must** happen somewhere before (in document order, and typically as an ancestor of) the elements that increment and display the counter — resetting scopes the counter to that container, so multiple independent lists on the same page can each restart their own numbering at 1 without interfering with each other
- \`content: counter(name, style)\` accepts an optional second argument controlling the numbering style — \`decimal\` (default), \`upper-roman\`, \`lower-alpha\`, and others, the same style keywords used by \`list-style-type\`
- Static text can be mixed directly into the same \`content\` value: \`content: "Section " counter(section) ": "\` — multiple space-separated pieces inside one \`content\` declaration concatenate together into a single generated string

**Nested/multi-level counters.** A single \`counter-increment\` handles flat numbering (1, 2, 3...), but real multi-level numbering — \`1.1\`, \`1.2\`, \`2.1\`, the pattern used in outlines and legal documents — needs *two* counters working together: an outer counter incremented on top-level sections, reset by each section for an inner counter incremented on that section's sub-items. \`content: counters(name, ".")\` (note the plural \`counters\`, distinct from \`counter\`) is a dedicated function for exactly this: it automatically joins the value of a counter at *every nesting level* with the given separator string, producing \`1.1\`, \`1.2\`, \`2.1\` automatically from properly nested \`counter-reset\`/\`counter-increment\` declarations, without manually combining two separate \`counter()\` calls.

**Why not just hardcode the numbers?** Hardcoded numbers break the moment content is reordered, an item is inserted in the middle, or an item is filtered out conditionally (very common in a React app rendering a list from an array) — every subsequent number would need to be manually recalculated. A CSS counter recalculates itself automatically from the actual rendered order every time, making it a good fit specifically for auto-numbered content driven by dynamic, reorderable, or conditionally-rendered data — exactly the kind of list a React component naturally produces from a \`.map()\`.

Because counters rely on \`::before\` generated content and the \`counter-reset\`/\`counter-increment\` at-rules, none of this can be expressed as an inline \`style\` object — every example below uses a genuine \`<style>\` tag with real CSS counter syntax.`,
  examples: [
    {
      id: "basic-auto-numbered-sections",
      title: "Auto-numbered sections with counter-reset and counter-increment",
      summary: "Each heading gets its number entirely from CSS — nothing is hardcoded in the markup.",
      code: `function CounterStyles() {
  return (
    <style>{\`
      .doc { counter-reset: section; }
      .doc h3 { counter-increment: section; }
      .doc h3::before {
        content: "Section " counter(section) ": ";
        color: #2563eb;
        font-weight: 700;
      }
    \`}</style>
  );
}

function App() {
  const sections = ["Introduction", "Getting Started", "Advanced Usage", "FAQ"];
  return (
    <div className="doc">
      <CounterStyles />
      {sections.map((title) => (
        <h3 key={title} style={{ fontSize: 15, margin: "10px 0" }}>{title}</h3>
      ))}
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "dynamic-list-counter",
      title: "A counter that recalculates automatically as items are added",
      summary: "Add or remove items from a React array — the CSS counter always stays correct with no manual renumbering.",
      code: `function CounterStyles() {
  return (
    <style>{\`
      .step-list { counter-reset: step; list-style: none; padding: 0; margin: 0; display: grid; gap: 6px; }
      .step-list li { counter-increment: step; padding: 8px 12px; background: #f3f4f6; border-radius: 6px; }
      .step-list li::before {
        content: "Step " counter(step) ": ";
        font-weight: 700;
        color: #7c3aed;
      }
    \`}</style>
  );
}

function App() {
  const [steps, setSteps] = useState(["Sign up", "Verify email", "Choose a plan"]);
  return (
    <div style={{ display: "grid", gap: 10 }}>
      <CounterStyles />
      <ul className="step-list">
        {steps.map((label, i) => (
          <li key={label}>{label}</li>
        ))}
      </ul>
      <button
        style={{ justifySelf: "start" }}
        onClick={() => setSteps((s) => [...s, "New step " + (s.length + 1)])}
      >
        Add a step
      </button>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "roman-numeral-style",
      title: "Changing the numbering style with counter()'s second argument",
      summary: "The same counter mechanism, rendered as upper-roman numerals instead of plain decimals.",
      code: `function CounterStyles() {
  return (
    <style>{\`
      .roman-list { counter-reset: item; list-style: none; padding: 0; margin: 0; display: grid; gap: 6px; }
      .roman-list li { counter-increment: item; padding: 6px 10px; }
      .roman-list li::before {
        content: counter(item, upper-roman) ". ";
        font-weight: 700;
        color: #111827;
        margin-right: 4px;
      }
    \`}</style>
  );
}

function App() {
  const items = ["Preface", "Chapter One", "Chapter Two", "Appendix"];
  return (
    <ul className="roman-list">
      <CounterStyles />
      {items.map((label) => (
        <li key={label}>{label}</li>
      ))}
    </ul>
  );
}

render(<App />);`,
    },
    {
      id: "nested-multilevel-counters",
      title: "Nested counters producing 1.1, 1.2, 2.1 style numbering",
      summary: "An outer 'chapter' counter and an inner 'item' counter combine via counters() into multi-level numbers.",
      code: `function CounterStyles() {
  return (
    <style>{\`
      .outline { counter-reset: chapter; }
      .chapter { counter-reset: item; counter-increment: chapter; margin-bottom: 10px; }
      .chapter > .chapter-title::before {
        content: counter(chapter) ". ";
        font-weight: 700;
        color: #2563eb;
      }
      .chapter .item { counter-increment: item; margin-left: 20px; font-size: 14px; }
      .chapter .item::before {
        content: counters(chapter item, ".") " ";
        color: #6b7280;
        margin-right: 4px;
      }
    \`}</style>
  );
}

function App() {
  const chapters = [
    { title: "Getting Started", items: ["Installation", "Configuration"] },
    { title: "Core Concepts", items: ["Components", "Props", "State"] },
  ];
  return (
    <div className="outline">
      <CounterStyles />
      {chapters.map((ch) => (
        <div className="chapter" key={ch.title}>
          <div className="chapter-title">{ch.title}</div>
          {ch.items.map((it) => (
            <div className="item" key={it}>{it}</div>
          ))}
        </div>
      ))}
    </div>
  );
}

render(<App />);`,
    },
  ],
};
