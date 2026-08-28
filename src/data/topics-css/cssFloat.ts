import type { Topic } from "../../types";

export const cssFloatTopic: Topic = {
  id: "css-float",
  title: "CSS Float",
  category: "CSS Layout & Positioning",
  shortExplanation: `\`float\` pulls an element to one side of its container and lets other content wrap around it — its original purpose was flowing text around an image, like a newspaper column.

- \`float: left\` / \`float: right\` — push the element to that side; other inline content wraps around it
- \`clear: left/right/both\` — stops an element from wrapping next to a floated one, pushing it below instead
- A parent whose children are *all* floated ==collapses to zero height==, since floated elements are removed from normal flow — the classic "clearfix" hack exists specifically to fix this
- Flexbox and grid have replaced float for nearly all actual page *layout* — float is now mostly reserved for its original, narrower use: wrapping text around an image`,
  longExplanation: `\`float\` was never actually designed to build page layouts — its original purpose was much narrower: letting text wrap around an image, the same way a magazine or newspaper flows a paragraph around an inset photo. \`float: left\` pulls an element out of its normal position and shifts it to the left edge of its container, and any inline content that follows it in the source (text, mostly) flows up and wraps around its remaining space, rather than starting below it. \`float: right\` does the mirror image, pushing the element to the right edge with content wrapping around its left side.

Despite that narrow original intent, for many years — before flexbox and grid existed — floats were pressed into service as the primary tool for building entire multi-column page layouts: floating a sidebar left and a main content area to fill the rest, for instance. This workaround came with real structural downsides, because a floated element is **removed from normal document flow**, similar to \`position: absolute\`. That single fact is the root of the most notorious float problem: **if every child inside a parent container is floated, the parent has no in-flow content left to measure, and its height collapses to zero** — visually, the parent's background and border simply vanish, even though the floated children are still visibly rendered (just no longer "inside" their own parent's box as far as height calculation is concerned).

The classic fix for that collapse is the **clearfix** technique: adding a rule, usually via a \`::after\` pseudo-element, that inserts an invisible block-level element after the floated children and sets \`clear: both\` on it, forcing the parent to stretch back down to contain it. A typical clearfix looks like:

\`.clearfix::after { content: ""; display: block; clear: both; }\`

The \`clear\` property itself is float's direct counterpart: \`clear: left\` tells an element "don't wrap up next to any element floated left — push yourself below it instead," and \`clear: right\`/\`clear: both\` extend that to the right side or both sides respectively. It's what a clearfix relies on, but it's also directly useful any time a block element (say, a footer) needs to guarantee it starts on a fresh line below any floated content above it, rather than awkwardly wrapping alongside it.

Today, **flexbox and grid have almost entirely replaced float for actual page and component layout** — they were purpose-built for arranging boxes, they don't remove elements from flow, they don't collapse parent heights, and they don't need a clearfix hack at all. Modern CSS guidance is consistently to reach for flexbox or grid first for anything resembling "arrange these boxes next to each other." Float, however, hasn't disappeared — it's still the right, and arguably still the *simplest*, tool for its original job: wrapping body text around a single inset image or pull-quote within an article, a case flexbox and grid don't handle nearly as naturally, since they're designed to arrange sibling boxes, not to make running text flow around one of them.`,
  examples: [
    {
      id: "float-text-wrap",
      title: "Floating an image so text wraps around it",
      summary: "A colored box floats left; the paragraph text flows around its remaining space, just like text around a photo.",
      code: `function App() {
  return (
    <div style={{ border: "1px solid #d1d5db", padding: 12 }}>
      <div
        style={{
          float: "left",
          width: 90,
          height: 90,
          background: "#f59e0b",
          marginRight: 12,
          marginBottom: 6,
          borderRadius: 6,
        }}
      />
      <p style={{ margin: 0 }}>
        This paragraph's text wraps around the floated box to its left, exactly the way
        newspaper text once wrapped around an inset photograph — this was float's original,
        intended purpose, long before it was ever used for entire page layouts.
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "collapsed-parent-and-clearfix",
      title: "A collapsed floated parent, then fixed with a clearfix",
      summary: "The first parent's border collapses to nothing; the second, using a clearfix, contains its floated children properly.",
      code: `function ClearfixStyles() {
  return (
    <style>{\`
      .broken-parent { border: 3px solid #dc2626; padding: 4px; }
      .fixed-parent { border: 3px solid #16a34a; padding: 4px; }
      .fixed-parent::after { content: ""; display: block; clear: both; }
      .float-box { float: left; width: 60px; height: 60px; background: #93c5fd; margin: 4px; }
    \`}</style>
  );
}

function App() {
  return (
    <div style={{ display: "grid", gap: 16 }}>
      <ClearfixStyles />
      <div>
        <p style={{ fontSize: 12, marginBottom: 4 }}>No clearfix — red border collapses to almost nothing</p>
        <div className="broken-parent">
          <div className="float-box" />
          <div className="float-box" />
        </div>
      </div>
      <div>
        <p style={{ fontSize: 12, marginBottom: 4 }}>With clearfix — green border properly wraps the floats</p>
        <div className="fixed-parent">
          <div className="float-box" />
          <div className="float-box" />
        </div>
      </div>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "clear-pushes-below-float",
      title: "clear: both forces an element below any floats",
      summary: "A footer with clear: both drops below the floated boxes instead of wrapping up next to them.",
      code: `function App() {
  return (
    <div style={{ border: "1px dashed #9ca3af", padding: 8 }}>
      <div style={{ float: "left", width: 80, height: 60, background: "#86efac", marginRight: 8 }}>Float A</div>
      <div style={{ float: "left", width: 80, height: 60, background: "#86efac" }}>Float B</div>
      <div style={{ clear: "both", background: "#fde68a", padding: 8, marginTop: 8 }}>
        clear: both — always starts on its own line below both floats
      </div>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
