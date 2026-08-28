import type { Topic } from "../../types";

export const cssLinksTopic: Topic = {
  id: "css-links",
  title: "CSS Links",
  category: "CSS Text & Typography",
  shortExplanation: `Links can be styled like any other element, but they also support four special ==pseudo-class states== that target a link at a specific moment in its lifecycle.

- \`:link\` — an unvisited link
- \`:visited\` — a link the user has already visited
- \`:hover\` — the mouse is over the link
- \`:active\` — the moment it's being clicked

These must be written in this exact order (**L**o**V**e **HA**te) — \`:hover\` has to come after \`:link\`/\`:visited\` and before \`:active\` to work correctly.`,
  longExplanation: `By default, browsers render links underlined and blue, and give them the special ability to remember whether you've clicked them before. CSS can restyle every part of that, but links are unique among HTML elements in that they expose *pseudo-classes* — selectors that match an element only during a particular state, rather than all the time.

- \`a:link\` matches a link that **hasn't** been visited yet
- \`a:visited\` matches a link the browser's history shows you **have** visited — for privacy reasons, browsers only allow a small set of properties (mainly \`color\`) to be changed here
- \`a:hover\` matches while the pointer is **over** the link — this is where most interactive feedback (an underline appearing, a color shift) is defined
- \`a:active\` matches only in the **instant** the link is being clicked (mouse button down, not yet released)
- These four must be defined in **this order** — remembered by the mnemonic **LoVe HAte** (Link, Visited, Hover, Active) — because \`:hover\` and \`:active\` need to be able to override \`:link\`/\`:visited\`, and CSS gives later rules of equal specificity priority over earlier ones
- Beyond the pseudo-classes, common link styling includes removing the default underline (\`text-decoration: none\`), and turning links into button-like shapes with padding, a background, and \`border-radius\` — a pattern used constantly for navigation and call-to-action buttons

This sandbox can't simulate genuine browser history, so \`:visited\` isn't demonstrable — but \`:hover\` and \`:active\` behave exactly as they would in a real stylesheet and can be tried directly in the examples below with a real \`<style>\` tag.`,
  examples: [
    {
      id: "four-link-states",
      title: "The four link pseudo-classes, in LoVe HAte order",
      summary: "Hover and click the link to see :hover and :active take effect live.",
      code: `function LinkStyles() {
  return (
    <style>{\`
      a.demo-link:link { color: #2563eb; text-decoration: underline; }
      a.demo-link:visited { color: #7c3aed; }
      a.demo-link:hover { color: #1d4ed8; text-decoration: none; }
      a.demo-link:active { color: #b91c1c; }
    \`}</style>
  );
}

function App() {
  return (
    <div>
      <LinkStyles />
      <a className="demo-link" href="#" onClick={(e) => e.preventDefault()}>
        Hover me, then click and hold
      </a>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        Try hovering and clicking — the color and underline change live, driven by real CSS.
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "button-style-link",
      title: "Turning a link into a button",
      summary: "Removing the default underline and adding padding/background makes a link look like a button.",
      code: `function ButtonLinkStyles() {
  return (
    <style>{\`
      a.link-button {
        display: inline-block;
        text-decoration: none;
        background: #16a34a;
        color: white;
        padding: 10px 18px;
        border-radius: 6px;
        font-weight: 600;
        transition: background 0.15s ease;
      }
      a.link-button:hover { background: #15803d; }
      a.link-button:active { background: #14532d; }
    \`}</style>
  );
}

function App() {
  return (
    <div>
      <ButtonLinkStyles />
      <a className="link-button" href="#" onClick={(e) => e.preventDefault()}>
        Get started
      </a>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "nav-link-list",
      title: "A row of navigation links sharing one hover style",
      summary: "Several links styled together, each getting the same hover feedback.",
      code: `function NavStyles() {
  return (
    <style>{\`
      .nav-row { display: flex; gap: 4px; list-style: none; padding: 0; margin: 0; }
      .nav-row a { display: inline-block; padding: 8px 14px; text-decoration: none; color: #374151; border-radius: 6px; }
      .nav-row a:hover { background: #f3f4f6; color: #111827; }
      .nav-row a.active { background: #111827; color: white; }
    \`}</style>
  );
}

function App() {
  const links = ["Home", "Docs", "Pricing", "About"];
  return (
    <nav>
      <NavStyles />
      <ul className="nav-row">
        {links.map((label, i) => (
          <li key={label}>
            <a href="#" className={i === 0 ? "active" : ""} onClick={(e) => e.preventDefault()}>
              {label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

render(<App />);`,
    },
  ],
};
