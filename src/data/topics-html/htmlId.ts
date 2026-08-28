import type { Topic } from "../../types";

export const htmlIdTopic: Topic = {
  id: "html-id",
  title: "HTML Id",
  category: "HTML Structure",
  shortExplanation: `The \`id\` attribute uniquely identifies **one specific element** on a page — unlike \`class\`, an \`id\` must not be reused.

- Used for precise CSS targeting (a rule for one exact element), for JavaScript's \`getElementById\`, and for in-page fragment links (\`href="#section"\`)
- Each \`id\` value should appear **at most once** per page
- \`id\` is written identically in both plain HTML and JSX — no renaming, unlike \`class\`/\`className\``,
  longExplanation: `Where \`class\` groups many elements together, \`id\` singles out exactly one — it's HTML's mechanism for giving one specific element a unique name.

- **Uniqueness**: an \`id\` value should exist at most once on a given page. This is the fundamental contrast with \`class\`, which is designed to be shared across as many elements as needed
- **CSS targeting**: a CSS rule written with \`#\` targets the one element with that id — \`#main-header { ... }\` matches \`<div id="main-header">\` and nothing else, since nothing else should share that id
- **JavaScript targeting**: plain JavaScript's \`document.getElementById("main-header")\` returns that exact element directly, with no ambiguity about which one is meant — a common way scripts grab a specific, known part of the page
- **Fragment links**: an \`id\` is also what makes in-page navigation links work, as covered in the Links topic — \`<h2 id="pricing">\` paired with \`<a href="#pricing">Jump to pricing</a>\` scrolls straight to that element
- Unlike \`class\` → \`className\`, the \`id\` attribute is **not renamed** in JSX — \`id\` isn't a reserved JavaScript word, so it's written exactly the same way, \`id="pricing"\`, in both plain HTML and JSX

A simple way to keep the two straight: reach for \`class\`/\`className\` when styling or targeting a *group* of elements the same way, and reach for \`id\` only when a piece of the page needs a single, unambiguous, one-of-a-kind handle.`,
  examples: [
    {
      id: "unique-id-per-element",
      title: "One id, one element",
      summary: "Each id value appears exactly once on the page, unlike a class which can repeat freely.",
      code: `function App() {
  return (
    <div>
      <p id="intro">This paragraph has the unique id "intro".</p>
      <p id="details">This one has the unique id "details" — no other element on this page reuses either id.</p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "id-for-css-targeting",
      title: "Targeting one element by id in CSS",
      summary: "A #id CSS selector matches exactly one element — precise, unlike a class selector.",
      code: `function App() {
  return (
    <div>
      <style>{\`#featured-box { border: 2px solid #f59e0b; background: #fffbeb; padding: 12px; border-radius: 8px; }\`}</style>
      <div id="featured-box">Only the element with id="featured-box" is styled by the #featured-box rule.</div>
      <div style={{ marginTop: 8 }}>This sibling div has no id, so the rule above doesn't touch it.</div>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "id-vs-class-side-by-side",
      title: "id vs. class, side by side",
      summary: "class groups many elements the same way; id singles out exactly one.",
      code: `function App() {
  return (
    <div>
      <style>{\`
        .card { border: 1px solid #d1d5db; border-radius: 8px; padding: 10px; margin-bottom: 6px; }
        #vip-card { border-color: #a855f7; background: #faf5ff; }
      \`}</style>
      <div className="card">Card A (class="card")</div>
      <div className="card">Card B (class="card")</div>
      <div className="card" id="vip-card">
        Card C (class="card" AND the unique id="vip-card")
      </div>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "id-for-fragment-navigation",
      title: "id powering an in-page link",
      summary: "The same id/href pairing from the Links topic — id is what a #fragment link actually jumps to.",
      code: `function App() {
  return (
    <div>
      <a href="#pricing-section">Jump to Pricing</a>
      <div style={{ height: 120, overflow: "auto", border: "1px solid #d1d5db", marginTop: 8 }}>
        <p style={{ padding: 12 }}>Some introductory content above the target section...</p>
        <div style={{ height: 60 }} />
        <h4 id="pricing-section" style={{ padding: "0 12px" }}>
          Pricing
        </h4>
        <p style={{ padding: "0 12px" }}>This is the element the link's href="#pricing-section" points to.</p>
      </div>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
