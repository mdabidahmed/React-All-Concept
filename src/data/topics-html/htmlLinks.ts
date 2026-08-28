import type { Topic } from "../../types";

export const htmlLinksTopic: Topic = {
  id: "html-links",
  title: "HTML Links",
  category: "HTML Structure",
  shortExplanation: `A **link** is written as \`<a href="...">visible text</a>\` — the \`href\` attribute is what makes it clickable and tells the browser where to go.

- \`href\` can point to an *absolute* URL (\`https://example.com\`) or a *relative* one (\`about.html\`, a page in the same folder)
- \`target="_blank"\` opens the link in a new tab — pair it with \`rel="noreferrer"\` for security
- \`href="mailto:someone@example.com"\` opens the visitor's email client with that address pre-filled
- \`href="#some-id"\` jumps down to the element with that \`id\` on the *same* page`,
  longExplanation: `The \`<a>\` (anchor) element is what turns HTML into "hypertext" — clickable connections between pages, resources, and even points within a single page.

- **Absolute vs. relative URLs**: \`href="https://example.com/about"\` is an *absolute* URL — a full address that works from anywhere. \`href="about.html"\` or \`href="/about"\` is *relative* — it's resolved against the current page's location, and is what you use for links between pages of the same site
- **Opening in a new tab**: \`target="_blank"\` makes the link open in a new browser tab instead of navigating away from the current page. When doing this, it's good practice to also add \`rel="noreferrer"\` (or \`rel="noopener noreferrer"\`) — without it, the newly opened page gets partial access to the original page via \`window.opener\`, which is a small but real security and performance concern
- **Email links**: \`href="mailto:someone@example.com"\` opens the visitor's default email application with a new message addressed to that address already filled in
- **Linking within the same page**: give any element an \`id\` (e.g. \`<h2 id="section-two">\`), then link to it with a \`href="#section-two"\` — clicking that link scrolls the page down to that exact element. This is how "back to top" links and in-page tables of contents work
- **Styling links by state**: CSS can style a link differently depending on whether it's unvisited, visited, or hovered, using the \`:link\`, \`:visited\`, and \`:hover\` pseudo-classes. These are CSS states that only appear on real mouse interaction, so they can't be demonstrated in this static sandbox — the concept is worth knowing even though it isn't shown live here

Every one of these is written exactly the same way in JSX as in plain HTML — \`<a>\` and \`href\` don't change at all moving from \`.html\` to a React component.`,
  examples: [
    {
      id: "absolute-vs-relative",
      title: "Absolute vs. relative URLs",
      summary: "An absolute URL works from anywhere; a relative URL is resolved against the current page.",
      code: `function App() {
  return (
    <div style={{ display: "grid", gap: 8 }}>
      <a href="https://developer.mozilla.org" target="_blank" rel="noreferrer">
        Absolute: https://developer.mozilla.org
      </a>
      <a href="about.html">Relative: about.html (a page next to this one)</a>
      <small>
        A relative link like <code>about.html</code> only makes sense once this page actually lives among other
        files — here it has nowhere real to navigate to.
      </small>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "target-blank-with-rel",
      title: "target=\"_blank\" paired with rel=\"noreferrer\"",
      summary: "Opening a link in a new tab safely, without leaking a reference back to this page.",
      code: `function App() {
  return (
    <div style={{ display: "grid", gap: 8 }}>
      <a href="https://www.w3.org" target="_blank" rel="noreferrer">
        Opens in a new tab, safely
      </a>
      <small>
        <code>target="_blank"</code> opens a new tab. Pairing it with <code>rel="noreferrer"</code> stops the new
        page from getting a live reference back to this one via <code>window.opener</code>.
      </small>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "mailto-link",
      title: "A mailto: link",
      summary: "Clicking this opens the visitor's email client with the address already filled in.",
      code: `function App() {
  return (
    <p>
      Questions? <a href="mailto:hello@example.com">Email hello@example.com</a>
    </p>
  );
}

render(<App />);`,
    },
    {
      id: "fragment-link-same-page",
      title: "Jumping to a section with an id and a # link",
      summary: "href=\"#id\" scrolls the page to the element that has a matching id — click the link below to try it.",
      code: `function App() {
  return (
    <div>
      <nav style={{ marginBottom: 16 }}>
        <a href="#section-two">Jump down to Section Two</a>
      </nav>
      <div style={{ height: 200, overflow: "auto", border: "1px solid #d1d5db", padding: 12 }}>
        <h3 id="section-one">Section One</h3>
        <p>Scroll (or click the link above) to see the jump in action.</p>
        <div style={{ height: 150 }} />
        <h3 id="section-two">Section Two</h3>
        <p>You arrived here via #section-two.</p>
      </div>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
