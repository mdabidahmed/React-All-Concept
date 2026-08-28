import type { Topic } from "../../types";

export const cssNavigationBarsTopic: Topic = {
  id: "css-navigation-bars",
  title: "CSS Navigation Bars",
  category: "CSS Components",
  shortExplanation: `A navigation bar is almost always built from a \`<ul>\`/\`<li>\` list — semantically a list of links — restyled with Flexbox to sit ==in a row== (or a column, for a sidebar) instead of stacking vertically.

- Strip default list styling: \`listStyle: "none"\`, zero \`margin\`/\`padding\`
- \`display: "flex"\` on the \`<ul>\` arranges the \`<li>\`s horizontally
- \`flexDirection: "column"\` turns the same markup into a vertical sidebar
- \`:hover\` and an \`.active\` class give links interactive and "current page" feedback`,
  longExplanation: `A navigation bar looks like a specialized component, but structurally it's just a list of links — which is exactly why the correct semantic markup for one is a \`<ul>\` containing an \`<li>\` for each link, with an \`<a>\` inside each \`<li>\`. Using a real list (rather than a row of plain \`<div>\`s) matters for accessibility: screen readers announce it as a list of a specific length, which orients users browsing by landmark or list.

Browsers give \`<ul>\` elements default bullet points and left padding, both of which need to be removed before the list can look like a nav bar: \`listStyle: "none"\` removes the bullets, and \`margin: 0\` / \`padding: 0\` remove the browser's default spacing (which exists specifically to make room for those bullets).

With the default list chrome stripped away, \`display: "flex"\` on the \`<ul>\` is what actually turns the vertically-stacked \`<li>\` elements into a horizontal row — this is the same Flexbox container property covered in the Flexbox topics, just applied to a list. \`gap\` spaces the items evenly, and \`alignItems: "center"\` keeps everything vertically centered if the nav bar also contains a logo or a taller element like a button.

- A **horizontal top nav** is the flex-row version just described — the most common pattern for a site header
- A **vertical sidebar nav** is the exact same markup with one change: \`flexDirection: "column"\` on the \`<ul>\`. This is a good demonstration of how little actually differs between a top nav and a sidebar — the semantic structure (a list of links) is identical; only the flex direction changes
- Each \`<a>\` typically gets \`display: "block"\` or \`"inline-block"\` plus its own \`padding\`, so the entire clickable area is generously sized (a larger hit target than the text alone), not just the text itself
- \`:hover\` gives immediate feedback that an item is clickable — commonly a background color change or an underline — and requires a real \`<style>\` tag with a genuine CSS selector, since \`:hover\` can't be expressed as a static inline \`style\` object
- An \`.active\` (or \`aria-current="page"\`) class marks whichever link corresponds to the **currently viewed page**, usually styled distinctly (a different background or a bottom border) so users always know where they are within the site — in a real app this class is normally computed from the current route rather than hardcoded

A subtle but important accessibility detail: the whole nav should usually be wrapped in a \`<nav>\` landmark element, which tells assistive technology "this block is navigation," distinct from the page's main content — screen reader users can jump directly to the \`<nav>\` region, or skip past it, using this landmark.`,
  examples: [
    {
      id: "horizontal-top-nav",
      title: "A horizontal top navigation bar",
      summary: "A ul/li list, restyled with flexbox and given hover + active states via a real <style> tag.",
      code: `function NavStyles() {
  return (
    <style>{\`
      .top-nav { list-style: none; margin: 0; padding: 0; display: flex; gap: 4px; }
      .top-nav a {
        display: inline-block;
        padding: 10px 16px;
        text-decoration: none;
        color: #374151;
        border-radius: 6px;
        font-weight: 500;
      }
      .top-nav a:hover { background: #f3f4f6; color: #111827; }
      .top-nav a.active { background: #111827; color: white; }
    \`}</style>
  );
}

function App() {
  const links = ["Home", "Products", "Pricing", "Contact"];
  return (
    <nav style={{ background: "white", padding: 8, borderRadius: 8, border: "1px solid #e5e7eb" }}>
      <NavStyles />
      <ul className="top-nav">
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
    {
      id: "nav-with-logo-and-actions",
      title: "A nav bar with a logo on the left and links on the right",
      summary: "justifyContent: space-between splits a logo and a link list to opposite ends of the same row.",
      code: `function NavStyles() {
  return (
    <style>{\`
      .site-nav { list-style: none; margin: 0; padding: 0; display: flex; gap: 4px; }
      .site-nav a { padding: 8px 14px; text-decoration: none; color: #374151; border-radius: 6px; }
      .site-nav a:hover { background: #eef2ff; color: #4338ca; }
    \`}</style>
  );
}

function App() {
  return (
    <nav
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "10px 16px",
        background: "white",
        border: "1px solid #e5e7eb",
        borderRadius: 8,
      }}
    >
      <NavStyles />
      <strong style={{ color: "#4338ca" }}>BrandName</strong>
      <ul className="site-nav">
        {["Docs", "Blog", "Sign in"].map((label) => (
          <li key={label}>
            <a href="#" onClick={(e) => e.preventDefault()}>{label}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

render(<App />);`,
    },
    {
      id: "vertical-sidebar-nav",
      title: "The same markup as a vertical sidebar",
      summary: "Only flexDirection changes — everything else about the nav is identical to the horizontal version.",
      code: `function SidebarStyles() {
  return (
    <style>{\`
      .side-nav { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 2px; }
      .side-nav a { display: block; padding: 10px 14px; text-decoration: none; color: #374151; border-radius: 6px; }
      .side-nav a:hover { background: #f3f4f6; }
      .side-nav a.active { background: #eef2ff; color: #4338ca; font-weight: 600; }
    \`}</style>
  );
}

function App() {
  const links = ["Dashboard", "Projects", "Team", "Settings"];
  return (
    <nav style={{ width: 180, background: "white", padding: 8, borderRadius: 8, border: "1px solid #e5e7eb" }}>
      <SidebarStyles />
      <ul className="side-nav">
        {links.map((label, i) => (
          <li key={label}>
            <a href="#" className={i === 1 ? "active" : ""} onClick={(e) => e.preventDefault()}>
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
    {
      id: "active-link-from-state",
      title: "Driving the active link from real interaction",
      summary: "Clicking a link updates which one is marked .active, simulating routing.",
      code: `function NavStyles() {
  return (
    <style>{\`
      .interactive-nav { list-style: none; margin: 0; padding: 0; display: flex; gap: 4px; }
      .interactive-nav a { padding: 8px 14px; text-decoration: none; color: #374151; border-radius: 6px; cursor: pointer; }
      .interactive-nav a:hover { background: #f3f4f6; }
      .interactive-nav a.active { background: #111827; color: white; }
    \`}</style>
  );
}

function App() {
  const links = ["Overview", "Analytics", "Reports"];
  const [current, setCurrent] = useState(links[0]);
  return (
    <nav style={{ background: "white", padding: 8, borderRadius: 8, border: "1px solid #e5e7eb" }}>
      <NavStyles />
      <ul className="interactive-nav">
        {links.map((label) => (
          <li key={label}>
            <a className={current === label ? "active" : ""} onClick={() => setCurrent(label)}>
              {label}
            </a>
          </li>
        ))}
      </ul>
      <p style={{ fontSize: 13, color: "#6b7280", margin: "10px 0 0" }}>Current page: {current}</p>
    </nav>
  );
}

render(<App />);`,
    },
  ],
};
