import type { Topic } from "../../types";

export const cssBoxSizingTopic: Topic = {
  id: "css-box-sizing",
  title: "CSS Box Sizing",
  category: "CSS Box Model",
  shortExplanation: `\`box-sizing\` controls what \`width\`/\`height\` actually *measure*.

- \`content-box\` (the browser default) — \`width\`/\`height\` measure the content only; padding and border are added ==on top==, making the element visibly bigger than the number you wrote
- \`border-box\` — \`width\`/\`height\` measure the *total* box, padding and border included; the content area simply shrinks to make room

Because \`content-box\` makes sizes unpredictable the moment padding or a border is involved, almost every modern stylesheet starts with a universal reset: \`* { box-sizing: border-box; }\`.`,
  longExplanation: `\`box-sizing\` answers a deceptively simple question: when you write \`width: 200px\`, what exactly is 200px wide? The browser's default answer, \`content-box\`, is that 200px describes *only the content area* — padding and border are then added on top of that, expanding the element's actual rendered footprint beyond the number you specified. A \`width: 200px\` box with \`20px\` of padding and a \`2px\` border on every side therefore renders at \`200 + 20 + 20 + 2 + 2 = 244px\` wide in total, not 200px. This is one of the most common early surprises in CSS: a row of "200px" boxes with some padding added simply doesn't fit the way the numbers suggest, because the visible size is quietly larger than what was written.

\`box-sizing: border-box\` flips this. With it, \`width\`/\`height\` describe the box's *total, final, rendered size* — border and padding are then subtracted from that number to figure out how much room is left for the actual content. A \`border-box\` element with \`width: 200px\`, \`20px\` padding, and a \`2px\` border still renders at exactly 200px wide; the content area inside simply shrinks to \`200 - 20 - 20 - 2 - 2 = 156px\` to make room. The element's footprint always matches the number in the \`width\` declaration, no matter how much padding or border gets added or removed later — which is precisely why it's so much easier to reason about, especially in grid and flex layouts where several boxes need to line up to exact widths.

Because \`content-box\` requires re-deriving the actual rendered size by hand every time padding or border changes, and \`border-box\` avoids that arithmetic entirely, the near-universal convention in real-world CSS is a global reset applied once, at the top of a stylesheet:

\`* { box-sizing: border-box; }\`

or, more precisely, a version that also opts pseudo-elements in:

\`*, *::before, *::after { box-sizing: border-box; }\`

This doesn't change what any *content* looks like — text, images, and colors are unaffected — it only changes how the browser interprets \`width\`/\`height\` numbers everywhere on the page, uniformly, so that developers never have to remember which sizing mode is "currently active" while writing new CSS. It's considered such a safe default that it's one of the very first lines in almost every CSS reset or framework (Bootstrap, Tailwind's Preflight, and most modern boilerplates all set it automatically).

One subtlety: \`box-sizing\` only changes how \`width\`/\`height\` are *interpreted* — it doesn't change the visible position of the border or padding layers themselves, and it has zero effect on \`margin\`, which was never part of either box's measured size in the first place. It also doesn't retroactively fix percentage-based children sized against a parent — it only resolves the padding/border-vs-width ambiguity for the element it's applied to. Because the effect is purely about *arithmetic*, not appearance, it's completely safe to add \`box-sizing: border-box\` to an existing project without breaking any visual layout that didn't specifically rely on the old content-box math — which in practice is almost none, making it one of the lowest-risk, highest-value single lines you can add to any stylesheet.`,
  examples: [
    {
      id: "content-box-vs-border-box",
      title: "Same width, padding, and border — different rendered sizes",
      summary: "content-box grows past 200px once padding and border are added; border-box stays exactly 200px.",
      code: `function App() {
  const shared = {
    width: 200,
    padding: 20,
    border: "4px solid #4338ca",
    backgroundColor: "#e0e7ff",
  };

  return (
    <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
      <div style={{ ...shared, boxSizing: "content-box" }}>
        box-sizing: content-box
        <br />
        renders at 200 + 40 + 8 = 248px wide
      </div>
      <div style={{ ...shared, boxSizing: "border-box" }}>
        box-sizing: border-box
        <br />
        renders at exactly 200px wide
      </div>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "border-box-universal-reset",
      title: "The universal border-box reset in action",
      summary: "A real <style> tag applies box-sizing: border-box to every element, so a row of equal-width cards actually fits.",
      code: `function BoxSizingReset() {
  return (
    <style>{\`
      .reset-demo, .reset-demo *, .reset-demo *::before, .reset-demo *::after {
        box-sizing: border-box;
      }
      .reset-demo .card {
        width: 33.333%;
        padding: 16px;
        border: 3px solid #0f766e;
        background: #ccfbf1;
      }
    \`}</style>
  );
}

function App() {
  return (
    <div className="reset-demo" style={{ border: "1px dashed #9ca3af" }}>
      <BoxSizingReset />
      <div style={{ display: "flex" }}>
        <div className="card">Card A</div>
        <div className="card">Card B</div>
        <div className="card">Card C</div>
      </div>
      <p style={{ color: "#6b7280", fontSize: 13, padding: 8 }}>
        Each card is exactly one third of the row, padding and border included —
        without border-box, three 33.333%-wide cards with padding and border
        would overflow past the container's edge.
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "growing-padding-content-box",
      title: "Increasing padding under content-box keeps enlarging the box",
      summary: "Watch the box visibly grow as padding increases, because padding is added on top of a fixed width.",
      code: `function App() {
  const paddings = [0, 12, 24, 40];
  return (
    <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
      {paddings.map((p) => (
        <div
          key={p}
          style={{
            boxSizing: "content-box",
            width: 100,
            padding: p,
            border: "2px solid #b91c1c",
            backgroundColor: "#fee2e2",
            textAlign: "center",
            fontSize: 12,
          }}
        >
          padding: {p}px
        </div>
      ))}
    </div>
  );
}

render(<App />);`,
    },
  ],
};
