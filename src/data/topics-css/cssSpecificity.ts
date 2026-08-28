import type { Topic } from "../../types";

export const cssSpecificityTopic: Topic = {
  id: "css-specificity",
  title: "CSS Specificity",
  category: "CSS Advanced & Effects",
  shortExplanation: `When multiple CSS rules target the same element, ==specificity== is the scoring system the browser uses to decide which one wins — it's not just "last rule wins."

- **Inline styles** beat everything (\`style="..."\` on the element itself)
- **ID selectors** (\`#header\`) beat classes
- **Classes, attribute selectors, and pseudo-classes** (\`.card\`, \`[type="text"]\`, \`:hover\`) beat plain elements
- **Element selectors** (\`div\`, \`p\`) and pseudo-elements are the weakest
- Equal specificity? The rule that appears **later in the source** wins
- \`!important\` overrides normal specificity entirely — powerful, but a maintenance trap best avoided`,
  longExplanation: `Every CSS selector has a *specificity* — a weight calculated from what kinds of selectors it's built from — and when two or more rules both apply valid styles to the same property on the same element, the browser doesn't guess: it compares these weights and applies the winner's declaration. Understanding specificity is what turns "why isn't my CSS working?!" into a predictable, debuggable process instead of trial and error.

Specificity is commonly represented as a tuple of four numbers, usually written *(inline, IDs, classes, elements)*:

- **Inline styles** (a \`style\` attribute written directly on an element) always win over any selector in a stylesheet — think of this as an invisible "1,0,0,0" that nothing but \`!important\` can beat
- **ID selectors** (\`#nav\`) count as "0,1,0,0" each — very strong, because IDs are supposed to be unique per page
- **Class selectors** (\`.button\`), **attribute selectors** (\`[type="submit"]\`), and **pseudo-classes** (\`:hover\`, \`:first-child\`) all count equally, as "0,0,1,0" each
- **Element/type selectors** (\`div\`, \`a\`, \`h1\`) and **pseudo-elements** (\`::before\`) are the weakest, at "0,0,0,1" each
- The universal selector (\`*\`), combinators (\`>\`, \`+\`, \`~\`), and \`:where()\` contribute **zero** specificity — they can be added freely without ever tipping the scale

To read a selector's specificity, just count how many of each kind it contains. \`.card .title\` is two classes, "0,0,2,0". \`#sidebar .card a:hover\` is one ID, one class, one pseudo-class, and one element — "0,1,2,1". Compare tuples left to right: any single ID beats *any number* of classes, and any single class beats *any number* of elements. So "0,1,0,0" beats "0,0,99,0" — a common surprise for developers who assume "more selectors" always means "wins."

When two selectors land on the exact same specificity tuple, specificity can't break the tie — so CSS falls back to **source order**: whichever rule was declared *later* (further down the stylesheet, or in a later \`<style>\`/\`<link>\`) wins. This is why reordering two identical-specificity rules can silently change which style applies, and it's also the entire mechanism behind utility-class systems and CSS resets, which rely on later rules quietly overriding earlier ones.

\`!important\` is the escape hatch that sidesteps all of this: appending \`!important\` to a declaration makes it override *any* normal-specificity rule, inline styles included (though two \`!important\` declarations still fall back to specificity, then source order, to fight it out between themselves). It's tempting to reach for when a style "just won't apply," but it's discouraged because it breaks the predictable cascade — once one rule uses \`!important\`, the only way to override *it* later is with another \`!important\` (or higher specificity plus \`!important\`), which tends to spiral. It's best reserved for narrow, deliberate cases (like utility overrides or third-party CSS you can't edit) rather than as a general fix.

The practical takeaway: keep selectors as simple and flat as reasonably possible (favor classes over deeply nested chains or IDs), and when a style "isn't working," specificity — not a typo — is usually the first thing to check.`,
  examples: [
    {
      id: "specificity-tiers",
      title: "Element vs. class vs. ID vs. inline",
      summary: "Four rules of increasing specificity all target the same box; only the strongest wins each property.",
      code: `function SpecificityStyles() {
  return (
    <style>{\`
      div.spec-box { background: #fca5a5; border: 4px solid #7f1d1d; }
      .spec-box.spec-box { background: #fdba74; }
      #spec-target { background: #86efac; }
    \`}</style>
  );
}

function App() {
  return (
    <div style={{ display: "grid", gap: 10 }}>
      <SpecificityStyles />
      <div className="spec-box" id="spec-target" style={{ padding: 16, borderRadius: 8, color: "#111827", fontWeight: 600 }}>
        Background is green: the #id rule ("0,1,0,0") beats the doubled class rule
        ("0,0,2,0"), which itself beat the plain element rule ("0,0,0,1").
      </div>
      <div
        className="spec-box"
        id="spec-target"
        style={{ padding: 16, borderRadius: 8, color: "white", fontWeight: 600, background: "#1d4ed8" }}
      >
        This one has an inline background too — inline always wins over any
        stylesheet rule, regardless of ID or class.
      </div>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "source-order-tiebreak",
      title: "Equal specificity: source order decides",
      summary: "Two class selectors have identical specificity, so whichever is declared later in the <style> block wins.",
      code: `function TieBreakStyles() {
  return (
    <style>{\`
      .tie-box.style-a { background: #93c5fd; }
      .tie-box.style-b { background: #fde047; }
    \`}</style>
  );
}

function App() {
  return (
    <div style={{ display: "grid", gap: 10 }}>
      <TieBreakStyles />
      <div className="tie-box style-a style-b" style={{ padding: 16, borderRadius: 8 }}>
        Both ".tie-box.style-a" and ".tie-box.style-b" have the same specificity
        (0,0,2,0). Yellow wins because ".style-b" is declared LATER in the
        stylesheet — not because it's "more specific."
      </div>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "important-override",
      title: "!important overrides normal specificity",
      summary: "A weak element selector with !important beats a much stronger ID selector.",
      code: `function ImportantStyles() {
  return (
    <style>{\`
      #important-target { color: #111827; }
      p { color: #dc2626 !important; }
    \`}</style>
  );
}

function App() {
  return (
    <div style={{ display: "grid", gap: 10 }}>
      <ImportantStyles />
      <p id="important-target" style={{ padding: 12, background: "#f3f4f6", borderRadius: 8 }}>
        This text is red, even though an #id selector normally beats a plain
        element selector — !important short-circuits the whole comparison.
      </p>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        Notice how little effort it takes to override this again: only another
        !important (or a more specific one) can beat it back.
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "reading-a-selector",
      title: "Reading a compound selector's specificity",
      summary: "Three selectors of different composition, labeled with their specificity tuple, so you can compare them visually.",
      code: `function ReadingStyles() {
  return (
    <style>{\`
      .selector-demo li { padding: 8px 10px; border-radius: 6px; margin-bottom: 6px; font-family: monospace; }
      .tier-element { background: #e5e7eb; }
      .tier-class { background: #bfdbfe; }
      .tier-id { background: #bbf7d0; }
    \`}</style>
  );
}

function App() {
  return (
    <ul className="selector-demo" style={{ listStyle: "none", padding: 0, margin: 0 }}>
      <ReadingStyles />
      <li className="tier-element">nav a {"->"} specificity (0,0,0,2) — two elements</li>
      <li className="tier-class">.nav .link:hover {"->"} specificity (0,0,3,0) — two classes plus one pseudo-class</li>
      <li className="tier-id">#nav .link {"->"} specificity (0,1,1,0) — one ID beats any number of classes</li>
    </ul>
  );
}

render(<App />);`,
    },
  ],
};
