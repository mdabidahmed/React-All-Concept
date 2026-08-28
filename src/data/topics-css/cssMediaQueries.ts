import type { Topic } from "../../types";

export const cssMediaQueriesTopic: Topic = {
  id: "css-media-queries",
  title: "CSS Media Queries",
  category: "CSS Flexbox & Grid",
  shortExplanation: `\`@media\` queries apply a block of CSS ==only when== a condition about the browser or screen is true — most commonly, a viewport width threshold.

- \`@media (max-width: 600px) { ... }\` — applies below 600px (desktop-first style)
- \`@media (min-width: 768px) { ... }\` — applies at 768px and above (mobile-first style)
- Common breakpoints cluster around \`480px\`, \`768px\`, and \`1024px\`, roughly phone / tablet / small-desktop
- Mobile-first stacks several \`min-width\` queries, each adding more layout as space increases`,
  longExplanation: `A media query is a conditional wrapper around a block of ordinary CSS rules: the rules inside only take effect when the stated condition is currently true. The most common condition by far is viewport width, but media queries can also test orientation, hover capability, and more — width-based breakpoints are the ones that matter for the vast majority of responsive layouts, so this topic focuses there.

The basic syntax is \`@media (condition) { selector { ... } }\`. Two width-based conditions form the foundation of almost every responsive stylesheet:

- \`(max-width: 600px)\` matches when the viewport is **600px or narrower** — the block runs on small screens
- \`(min-width: 768px)\` matches when the viewport is **768px or wider** — the block runs on larger screens

Which one you reach for first depends on which "first" approach you're using (covered in the Responsive Design topic): a **desktop-first** stylesheet writes the full layout as the default and uses \`max-width\` queries to strip things down for small screens; a **mobile-first** stylesheet writes the simple layout as the default and uses \`min-width\` queries to add complexity as space allows. Mobile-first is the more common recommendation today, and it usually looks like a *staircase* of \`min-width\` queries, each unlocking a bit more layout:

\`\`\`
.grid { grid-template-columns: 1fr; }
@media (min-width: 480px) { .grid { grid-template-columns: 1fr 1fr; } }
@media (min-width: 1024px) { .grid { grid-template-columns: 1fr 1fr 1fr; } }
\`\`\`

Because later rules of equal specificity win, this staircase pattern relies on the queries being written in ascending order — a wide viewport matches *all three* conditions (base, 480px, and 1024px), and the last one to appear in the stylesheet is the one that actually applies.

**Common breakpoint values** aren't defined by the CSS spec — they're conventions that emerged from real device sizes: roughly \`480px\` for phones, \`768px\` for tablets, and \`1024px\`–\`1280px\` for small laptops/desktops. Modern practice increasingly favors picking breakpoints based on where *your own content* actually starts to look awkward, rather than rigidly targeting specific historical device widths — but these numbers remain a reasonable, widely-recognized starting point.

Beyond width, a few other conditions are worth knowing:

- \`orientation: portrait\` / \`orientation: landscape\` — matches based on whether the viewport is taller than wide, or vice versa
- \`prefers-color-scheme: dark\` — matches when the user's OS is set to dark mode, the basis for automatic dark-mode styling
- Combining conditions with \`and\`: \`@media (min-width: 600px) and (max-width: 900px)\` matches only within that range, useful for a tablet-only tweak that shouldn't also apply to desktop

Because a media query is a real CSS at-rule tied to the actual viewport, it can't be expressed as a static inline \`style\` object — a component would need to measure the window itself to replicate it in JS. The examples below instead inject genuine \`<style>\` tags containing real \`@media\` rules; since this sandbox renders directly into the real DOM (no iframe), the browser evaluates them exactly as it would from a linked stylesheet — **resize the preview pane** to see each one respond live.`,
  examples: [
    {
      id: "single-max-width-breakpoint",
      title: "One max-width breakpoint changes the background color",
      summary: "A simple, highly visible way to confirm a media query is firing — resize the preview pane.",
      code: `function MediaStyles() {
  return (
    <style>{\`
      .mq-box {
        padding: 20px;
        border-radius: 8px;
        background: #16a34a;
        color: white;
        font-weight: 600;
        text-align: center;
      }
      @media (max-width: 500px) {
        .mq-box {
          background: #dc2626;
        }
      }
    \`}</style>
  );
}

function App() {
  return (
    <div>
      <MediaStyles />
      <p style={{ fontSize: 13, color: "#6b7280", marginTop: 0 }}>
        Green above 500px wide, red at 500px or narrower. Resize the preview pane to see it flip.
      </p>
      <div className="mq-box">Watch my color as you resize</div>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "mobile-first-staircase",
      title: "A mobile-first staircase of min-width queries",
      summary: "The grid gains a column at each of two breakpoints as the viewport grows.",
      code: `function MediaStyles() {
  return (
    <style>{\`
      .staircase {
        display: grid;
        grid-template-columns: 1fr;
        gap: 8px;
      }
      @media (min-width: 480px) {
        .staircase { grid-template-columns: 1fr 1fr; }
      }
      @media (min-width: 800px) {
        .staircase { grid-template-columns: 1fr 1fr 1fr; }
      }
    \`}</style>
  );
}

function App() {
  const items = ["One", "Two", "Three", "Four", "Five", "Six"];
  return (
    <div>
      <MediaStyles />
      <p style={{ fontSize: 13, color: "#6b7280", marginTop: 0 }}>
        1 column under 480px, 2 columns from 480-800px, 3 columns above 800px.
      </p>
      <div className="staircase">
        {items.map((label) => (
          <div key={label} style={{ background: "#2563eb", color: "white", padding: 12, borderRadius: 6, textAlign: "center" }}>
            {label}
          </div>
        ))}
      </div>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "hide-show-elements",
      title: "Hiding and showing elements at different widths",
      summary: "A 'mobile label' and a 'desktop label' that never appear at the same time.",
      code: `function MediaStyles() {
  return (
    <style>{\`
      .mobile-only { display: none; }
      .desktop-only { display: inline-block; }
      @media (max-width: 600px) {
        .mobile-only { display: inline-block; }
        .desktop-only { display: none; }
      }
    \`}</style>
  );
}

function App() {
  return (
    <div>
      <MediaStyles />
      <p style={{ fontSize: 13, color: "#6b7280", marginTop: 0 }}>Resize narrower than 600px to swap labels.</p>
      <span className="mobile-only" style={{ background: "#7c3aed", color: "white", padding: "6px 12px", borderRadius: 999 }}>
        Mobile layout
      </span>
      <span className="desktop-only" style={{ background: "#2563eb", color: "white", padding: "6px 12px", borderRadius: 999 }}>
        Desktop layout
      </span>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "range-between-two-breakpoints",
      title: "Combining min-width and max-width for a range",
      summary: "A style that applies only in a middle 'tablet' range, not on phones or full desktops.",
      code: `function MediaStyles() {
  return (
    <style>{\`
      .range-box {
        padding: 16px;
        border-radius: 8px;
        background: #f3f4f6;
        border: 2px solid transparent;
      }
      @media (min-width: 500px) and (max-width: 900px) {
        .range-box {
          border-color: #f59e0b;
          background: #fffbeb;
        }
      }
    \`}</style>
  );
}

function App() {
  return (
    <div>
      <MediaStyles />
      <p style={{ fontSize: 13, color: "#6b7280", marginTop: 0 }}>
        Highlighted only between 500px and 900px wide — a "tablet-only" style.
      </p>
      <div className="range-box">This box only gets the amber highlight in the middle range.</div>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
