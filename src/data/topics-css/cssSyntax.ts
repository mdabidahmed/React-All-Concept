import type { Topic } from "../../types";

export const cssSyntaxTopic: Topic = {
  id: "css-syntax",
  title: "CSS Syntax",
  category: "CSS Basics",
  shortExplanation: `A CSS **rule** pairs a *selector* (what to target) with a *declaration block* (what to change): \`selector { property: value; }\`.

- **Selector** — chooses which element(s) the rule applies to
- \`{ }\` — the **declaration block**, wraps one or more declarations
- \`property: value;\` — one **declaration**; the colon separates property from value, the semicolon ends it
- A rule can hold ==many declarations==, and multiple selectors can share one declaration block by separating them with commas`,
  longExplanation: `Every CSS rule follows the same shape, no matter how simple or complex: a **selector**, followed by a **declaration block** wrapped in curly braces. The selector decides *which* elements are targeted — a tag name, a class, an id, or something more elaborate. Inside the braces sits one or more **declarations**, and each declaration is a **property** and a **value** separated by a colon, ending in a semicolon: \`color: blue;\`. Put together, a full rule looks like \`p { color: blue; font-size: 16px; }\` — target every \`<p>\`, make its text blue and 16 pixels tall.

The semicolon at the end of a declaration is what separates it from the next one, so a rule with several declarations just lists them one after another, each ended with its own semicolon: \`color: blue; font-size: 16px; margin: 0;\`. Technically the very last declaration in a block doesn't *need* a trailing semicolon before the closing brace, but leaving it off is a common source of bugs the moment someone adds a new declaration after it — the two lines silently merge into one broken declaration. Because of that, writing a semicolon after every single declaration, including the last, is the near-universal convention.

CSS is whitespace-insensitive: line breaks, indentation, and extra spaces are purely for human readability and have zero effect on how the browser interprets a rule. \`p{color:blue;font-size:16px;}\` and a version spread across five indented lines are identical to the browser — minifiers rely on exactly this fact to strip whitespace for smaller file sizes without changing behavior.

A single declaration block can also be shared by **multiple selectors** at once by separating them with commas: \`h1, h2, p { margin: 0; }\` resets the margin on all three element types in one rule, rather than repeating the same declaration block three separate times. This grouping is one of the most common ways real stylesheets stay short — anywhere several unrelated elements need identical treatment, a comma-separated selector list says so in one place.

A few gotchas worth knowing from the start:

- Misspelling a **property** name (\`colr: blue\`) or writing an invalid **value** doesn't throw an error or break the page — the browser simply ignores that one declaration and moves on, applying everything else in the rule normally. This "fail silently" behavior is convenient for forward-compatibility (old browsers ignore properties they don't understand yet) but means a broken style can be surprisingly hard to spot; the fix is almost always to check browser dev tools, where an invalid declaration shows up crossed out
- Forgetting the closing \`}\` on a rule causes everything that follows — potentially the rest of the stylesheet — to be swallowed into that one broken rule, since the parser is still looking for where the block ends
- Selectors and property names are case-*insensitive* in practice for standard CSS, but class and id names *are* case-sensitive, since they're matched against the exact attribute value in the HTML

Once this shape — selector, braces, semicolon-separated declarations — is second nature, everything else in CSS (selectors, the box model, layout systems like flexbox and grid) is just filling in more elaborate selectors and more specific properties inside that same structure.`,
  examples: [
    {
      id: "anatomy-of-a-rule",
      title: "The anatomy of one rule",
      summary: "A single selector, declaration block, and one declaration, labeled and rendered.",
      code: `function AnatomyStyles() {
  return (
    <style>{\`
      /* selector -> .highlight-box   declaration block -> { ... } */
      .highlight-box {
        /* property   value */
        background: #fef08a;
        padding: 14px;
        border-radius: 8px;
      }
    \`}</style>
  );
}

function App() {
  return (
    <div style={{ display: "grid", gap: 10 }}>
      <AnatomyStyles />
      <code style={{ color: "#6b7280" }}>
        .highlight-box {"{"} background: #fef08a; padding: 14px; {"}"}
      </code>
      <div className="highlight-box">
        This box is styled by the rule shown above.
      </div>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "multiple-declarations",
      title: "Multiple declarations in one rule",
      summary: "One selector, several property/value pairs, each ended with a semicolon.",
      code: `function CardStyles() {
  return (
    <style>{\`
      .info-card {
        background: #111827;
        color: white;
        padding: 16px;
        border-radius: 10px;
        font-size: 14px;
        line-height: 1.5;
      }
    \`}</style>
  );
}

function App() {
  return (
    <div>
      <CardStyles />
      <div className="info-card">
        Six declarations — background, color, padding, border-radius, font-size,
        and line-height — all inside one rule.
      </div>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "grouping-selectors-with-commas",
      title: "Grouping selectors with commas",
      summary: "h1, h2, and p share the exact same declaration block instead of repeating it three times.",
      code: `function GroupedStyles() {
  return (
    <style>{\`
      h1, h2, p {
        margin: 0 0 8px 0;
        font-family: system-ui, sans-serif;
        color: #1f2937;
      }
      h1 { font-size: 22px; }
      h2 { font-size: 17px; }
    \`}</style>
  );
}

function App() {
  return (
    <div>
      <GroupedStyles />
      <h1>Heading one</h1>
      <h2>Heading two</h2>
      <p>All three of these share one grouped rule for margin, font, and color.</p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "a-missing-semicolon-breaks-the-next-line",
      title: "Why every declaration gets its own semicolon",
      summary: "A missing semicolon merges two declarations into one invalid line, which the browser then ignores.",
      code: `function BrokenVsFixedStyles() {
  return (
    <style>{\`
      /* Missing semicolon after the first value: the parser reads
         "background: #fee2e2 color: #991b1b;" as one broken declaration,
         so BOTH properties are dropped. */
      .broken {
        background: #fee2e2
        color: #991b1b;
        padding: 12px;
        border-radius: 8px;
      }

      /* Every declaration properly terminated: both properties apply. */
      .fixed {
        background: #dcfce7;
        color: #166534;
        padding: 12px;
        border-radius: 8px;
      }
    \`}</style>
  );
}

function App() {
  return (
    <div style={{ display: "grid", gap: 10 }}>
      <BrokenVsFixedStyles />
      <div className="broken">Missing semicolon above — background/color never applied.</div>
      <div className="fixed">Semicolon after every declaration — both apply correctly.</div>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
