import type { Topic } from "../../types";

export const cssMultipleColumnsTopic: Topic = {
  id: "css-multiple-columns",
  title: "CSS Multiple Columns",
  category: "CSS Flexbox & Grid",
  shortExplanation: `The **multi-column** layout module flows a single block of content across several ==newspaper-style== columns automatically — content just flows from the bottom of one column to the top of the next.

- \`columnCount\` — a fixed number of columns
- \`columnGap\` — space between columns
- \`columnRule\` — a dividing line between columns (shorthand like \`border\`)
- \`columns\` — a shorthand combining a target column *width* and count`,
  longExplanation: `Flexbox and Grid both require you to place individual *items* into a layout — each child is a distinct box you position. Multi-column layout solves a different problem entirely: taking **one continuous flow of content** (like a long article or a list) and automatically breaking it across several side-by-side columns, the way a newspaper or magazine does, without manually splitting the content into separate elements yourself.

- \`columnCount\` is the simplest way to opt in: \`columnCount: 3\` splits the container's content into three columns of equal width, and the browser decides where each column breaks automatically, balancing the amount of content in each as evenly as it can.
- \`columnWidth\` is the alternative starting point: instead of specifying *how many* columns, you specify an *ideal width* per column (e.g. \`columnWidth: 200\`), and the browser fits as many 200px-ish columns as the container allows — similar in spirit to Grid's \`repeat(auto-fill, minmax(...))\`, but for flowing text rather than discrete grid items.
- \`columns\` is the shorthand for both at once, in \`"width count"\` order — e.g. \`columns: "200px 3"\` suggests both a preferred width and a maximum count, and the browser reconciles them.
- \`columnGap\` sets the space **between** columns — conceptually identical to Flexbox/Grid's \`gap\`, but multi-column layout had this property long before \`gap\` was generalized to the other layout modes.
- \`columnRule\` draws a **dividing line** down the gap between columns, and uses the exact same shorthand syntax as \`border\`: a width, a style, and a color (e.g. \`"1px solid #d1d5db"\`). Unlike a border, it never affects the layout's spacing — it's purely a decorative line drawn in the gap that \`columnGap\` already reserved.
- \`breakInside: "avoid"\` (applied to a *child* element, like a card or a heading-plus-paragraph pair) prevents that specific element from being split awkwardly across two columns — without it, a browser might place a heading at the very bottom of one column and its paragraph at the top of the next, orphaning the two from each other.

**When to use it, and when not to.** Multi-column layout is purpose-built for **long-form text** — articles, reference content, glossaries — where the reading experience benefits from shorter line lengths, the way print always has. It is deliberately *not* a general-purpose layout tool: because content flows automatically from column to column, you don't get to control which specific item lands in which column (unlike Grid, where placement is explicit), and vertical alignment between columns isn't guaranteed. Reaching for Grid or Flexbox instead is almost always right for card grids, page shells, and anything where controlling exact item placement matters — multi-column shines specifically for the "wall of text should read like a newspaper" use case, which the other two layout systems don't handle naturally at all.

All of the properties above are ordinary CSS with direct camelCase equivalents (\`columnCount\`, \`columnGap\`, \`columnRule\`, \`columns\`, \`breakInside\`), so every example below is a plain inline \`style\` object — no \`<style>\` tag is required for any of it.`,
  examples: [
    {
      id: "basic-column-count",
      title: "columnCount splits text into newspaper-style columns",
      summary: "One paragraph of text, flowed automatically across three columns.",
      code: `function App() {
  const text =
    "Multi-column layout takes one continuous flow of text and breaks it across several columns automatically. The browser decides exactly where each column ends, balancing the content between them, the same way a printed newspaper or magazine column of text behaves.";
  return (
    <div style={{ columnCount: 3, columnGap: 24, maxWidth: 600 }}>
      <p style={{ margin: 0 }}>{text}</p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "column-gap-and-rule",
      title: "columnGap and columnRule together",
      summary: "A visible dividing line drawn inside the gap between two columns of text.",
      code: `function App() {
  const text =
    "columnRule draws a purely decorative line inside the gap that columnGap already reserves between columns — it never adds extra spacing of its own, and it uses the exact same width/style/color shorthand syntax as a regular border.";
  return (
    <div
      style={{
        columnCount: 2,
        columnGap: 32,
        columnRule: "2px dashed #9ca3af",
        maxWidth: 500,
      }}
    >
      <p style={{ margin: 0 }}>{text}</p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "columns-shorthand-responsive-width",
      title: "The columns shorthand: target width plus a max count",
      summary: "columns: \"180px 4\" fits as many ~180px columns as the container allows, capped at four.",
      code: `function App() {
  const text =
    "The columns shorthand combines a target column width with a maximum column count in one declaration, letting the number of columns adapt to however much space is actually available, similar in spirit to Grid's repeat(auto-fill, minmax()) pattern but for flowing text.";
  return (
    <div style={{ columns: "180px 4", columnGap: 20 }}>
      <p style={{ margin: 0 }}>{text}</p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "break-inside-avoid-cards",
      title: "breakInside: avoid prevents awkward splits",
      summary: "Small glossary entries flow into columns without a heading being separated from its own text.",
      code: `function Entry({ term, def }) {
  return (
    <div style={{ breakInside: "avoid", marginBottom: 14 }}>
      <strong>{term}</strong>
      <p style={{ margin: "2px 0 0", fontSize: 13, color: "#4b5563" }}>{def}</p>
    </div>
  );
}

function App() {
  const entries = [
    { term: "Specificity", def: "The rule that decides which of several matching CSS rules wins." },
    { term: "Cascade", def: "The overall algorithm CSS uses to resolve conflicting rules." },
    { term: "Box model", def: "How width, padding, border, and margin combine to size an element." },
    { term: "Flow", def: "The default way block and inline elements are laid out on a page." },
  ];
  return (
    <div style={{ columnCount: 2, columnGap: 28 }}>
      {entries.map((e) => (
        <Entry key={e.term} {...e} />
      ))}
    </div>
  );
}

render(<App />);`,
    },
  ],
};
