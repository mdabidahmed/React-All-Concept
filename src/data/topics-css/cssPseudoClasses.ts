import type { Topic } from "../../types";

export const cssPseudoClassesTopic: Topic = {
  id: "css-pseudo-classes",
  title: "CSS Pseudo-Classes",
  category: "CSS Layout & Positioning",
  shortExplanation: `A pseudo-class matches an element based on a **state or position** that plain selectors can't express — written as a colon plus a keyword, attached directly to a selector.

- \`:hover\` — while the pointer is over the element
- \`:focus\` — while the element has keyboard/input focus
- \`:first-child\` / \`:last-child\` — the element is the first/last child of its parent
- \`:nth-child(n)\` — the *n*th child, and it also accepts formulas like \`2n\` (even) or \`2n+1\` (odd)
- \`:not(selector)\` — matches anything that does **not** match the given selector

(\`:link\`, \`:visited\`, and \`:active\` — the other well-known state pseudo-classes — are covered in the Links topic.)`,
  longExplanation: `A pseudo-class targets an element based on some *condition* — a state it's currently in, or a position it occupies among its siblings — rather than a property written directly into the HTML like a class or tag name. Syntactically, it's always a colon followed by a keyword (optionally with arguments in parentheses), attached directly to the end of a selector with no space: \`button:hover\`, \`li:first-child\`.

**\`:hover\`** matches an element for as long as the pointer is positioned over it, and it's the foundation of nearly all interactive visual feedback on the web — button color shifts, underlines appearing on links, cards lifting with a shadow. Because it depends on a physical pointer, \`:hover\` doesn't apply in any meaningful way on touch-only devices, which is worth remembering when a design relies on hover to *reveal* content that would then be completely inaccessible to a touch user.

**\`:focus\`** matches an element while it holds keyboard or input focus — the element currently receiving typed input or that would respond to Enter/Space if it's a button. It's essential for accessibility: any interactive element (links, buttons, form fields) should have a visible \`:focus\` style so a keyboard-only user can see where they currently are on the page, typically expressed with the \`outline\` property (covered in its own topic) specifically because outline doesn't disturb layout the way a border would.

**\`:first-child\`** and **\`:last-child\`** match an element only when it is, respectively, the first or last child *among all of its parent's children* — not the first/last of a particular tag, but literally first/last in the DOM regardless of what type of element it is. This distinction matters: \`li:first-child\` matches an \`<li>\` only if it's also the very first child element of its \`<ul>\` — if some other element (a heading, a comment) happened to come before it, \`li:first-child\` would match nothing at all, since that \`<li>\` isn't actually first. (The related but different \`:first-of-type\`/\`:last-of-type\` match the first/last of a specific *tag*, ignoring other tag types in between — a subtlety worth knowing exists even if it's not the focus here.)

**\`:nth-child(n)\`** is the most flexible positional pseudo-class: it accepts a plain number (\`:nth-child(3)\` — the third child, exactly), or a formula in the form \`an + b\`, evaluated for every non-negative integer value of \`n\` (0, 1, 2, 3...) to produce a whole sequence of matching positions. \`:nth-child(2n)\` matches every even-positioned child (2, 4, 6...), \`:nth-child(2n+1)\` matches every odd-positioned child (1, 3, 5...) — and CSS even provides the plain keywords \`even\` and \`odd\` as shorthands for exactly those two formulas. This is the standard technique for "zebra-striping" alternating table rows or list items with alternating background colors, without needing to add a class to every other element by hand.

**\`:not(selector)\`** is a negation wrapper — it matches any element that does *not* match whatever selector is passed inside its parentheses. \`li:not(:last-child)\` is a common pattern for adding a border or margin *between* list items without adding one after the very last item as well (where it would just create unwanted trailing space) — a task that would otherwise require either extra classes or a "remove it from the last one instead" follow-up rule.

Together, these five demonstrate what pseudo-classes are for as a category: expressing *conditions* — a live interaction state, or a structural position — directly in the selector, rather than requiring extra classes or scripting to capture the same information by hand.`,
  examples: [
    {
      id: "hover-and-focus-feedback",
      title: "hover and focus give interactive feedback",
      summary: "A real button that changes on hover, and shows a focus ring when tabbed to or clicked.",
      code: `function PseudoStyles() {
  return (
    <style>{\`
      .pc-btn { padding: 10px 18px; border-radius: 6px; border: 2px solid #4338ca; background: white; color: #4338ca; font-weight: 600; cursor: pointer; }
      .pc-btn:hover { background: #4338ca; color: white; }
      .pc-btn:focus-visible { outline: 3px solid #f59e0b; outline-offset: 2px; }
    \`}</style>
  );
}

function App() {
  return (
    <div>
      <PseudoStyles />
      <button className="pc-btn">Hover or focus me</button>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "first-last-child",
      title: ":first-child and :last-child",
      summary: "The first and last items in a list are styled differently from the ones in between.",
      code: `function PseudoStyles() {
  return (
    <style>{\`
      .fl-list { list-style: none; padding: 0; margin: 0; width: 180px; }
      .fl-list li { padding: 8px; background: #e5e7eb; margin-bottom: 4px; }
      .fl-list li:first-child { background: #86efac; font-weight: 700; }
      .fl-list li:last-child { background: #fca5a5; font-weight: 700; }
    \`}</style>
  );
}

function App() {
  return (
    <ul className="fl-list">
      <PseudoStyles />
      <li>First item</li>
      <li>Middle item</li>
      <li>Another middle item</li>
      <li>Last item</li>
    </ul>
  );
}

render(<App />);`,
    },
    {
      id: "nth-child-zebra-stripes",
      title: ":nth-child(even) zebra-stripes a table",
      summary: "Every even row gets a light background automatically, with no extra classes needed.",
      code: `function PseudoStyles() {
  return (
    <style>{\`
      .zebra-table { border-collapse: collapse; width: 100%; }
      .zebra-table td { padding: 8px; border-bottom: 1px solid #e5e7eb; }
      .zebra-table tr:nth-child(even) { background: #f3f4f6; }
    \`}</style>
  );
}

function App() {
  const rows = ["Alice", "Bob", "Carol", "Dave", "Erin"];
  return (
    <table className="zebra-table">
      <PseudoStyles />
      <tbody>
        {rows.map((name) => (
          <tr key={name}>
            <td>{name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

render(<App />);`,
    },
    {
      id: "not-selector-dividers",
      title: ":not(:last-child) adds dividers only between items",
      summary: "Every item gets a bottom border except the last one, avoiding an unwanted trailing line.",
      code: `function PseudoStyles() {
  return (
    <style>{\`
      .divider-list { list-style: none; padding: 0; margin: 0; width: 180px; }
      .divider-list li { padding: 10px 4px; }
      .divider-list li:not(:last-child) { border-bottom: 1px solid #d1d5db; }
    \`}</style>
  );
}

function App() {
  return (
    <ul className="divider-list">
      <PseudoStyles />
      <li>Settings</li>
      <li>Profile</li>
      <li>Log out</li>
    </ul>
  );
}

render(<App />);`,
    },
  ],
};
