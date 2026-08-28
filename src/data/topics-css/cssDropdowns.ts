import type { Topic } from "../../types";

export const cssDropdownsTopic: Topic = {
  id: "css-dropdowns",
  title: "CSS Dropdowns",
  category: "CSS Components",
  shortExplanation: `A pure-CSS dropdown is built from a positioning pair: a ==relatively== positioned parent that anchors the menu, and an ==absolutely== positioned child that's hidden until the parent is hovered.

- \`position: "relative"\` on the wrapper — doesn't move it, just becomes the anchor for children
- \`position: "absolute"\` on the menu — positions it relative to that nearest relative ancestor
- The menu starts \`display: "none"\`; a real \`:hover\` rule flips it to \`display: "block"\`
- No JavaScript needed at all for the simplest case — it's pure CSS interactivity`,
  longExplanation: `A dropdown menu is one of the clearest demonstrations of how far pure CSS can go without any JavaScript. The whole mechanism rests on two CSS positioning concepts working together, plus one pseudo-class.

**The positioning pair.** \`position: "relative"\` on an element does nothing visible by itself — the element stays exactly where normal document flow would put it. What it *does* do is establish that element as the **positioning context** for any descendant that uses \`position: "absolute"\`. An absolutely positioned element is normally removed from the document flow and placed relative to the nearest ancestor that has a \`position\` other than \`static\` (the default) — so wrapping a dropdown trigger and its menu in a \`position: relative\` container guarantees the menu positions itself relative to *that* container, rather than relative to the entire page (which is what would happen with no positioned ancestor at all).

**The show/hide mechanism.** The dropdown menu itself starts with \`display: "none"\` — completely removed from rendering, taking up no space. A CSS rule using the \`:hover\` pseudo-class on the *parent* container then flips the menu's \`display\` to \`"block"\` the moment the pointer enters the parent: \`.dropdown:hover .dropdown-menu { display: block; }\`. Because \`:hover\` is continuously re-evaluated by the browser, the menu disappears again automatically the instant the pointer leaves the parent — no explicit "close" logic needed.

- The trigger and the menu must share a **common relatively-positioned ancestor** for \`:hover\` on the parent to correctly reveal the child — this is why the wrapper element (often just a \`<div>\` or \`<li>\`) matters structurally, not just visually
- \`top\`, \`left\`, \`right\`, and \`bottom\` on the absolutely positioned menu control exactly where it appears relative to the parent — \`top: "100%"\` is the standard way to say "start right below the bottom edge of the trigger," which adapts automatically if the trigger's height ever changes
- A menu commonly also needs \`zIndex\` set high enough to render above whatever content sits below it, since an absolutely positioned element otherwise stacks according to its position in the source order
- The pure-CSS hover approach works well for desktop mouse interactions but has real limitations worth knowing: it offers no keyboard support (no way to open the menu with Enter/Space, or navigate it with arrow keys) and no true touch/click support on mobile, since \`:hover\` doesn't fire the same way on touchscreens. Production dropdown menus intended to be fully accessible typically pair this same visual structure with JavaScript that toggles a class on click and manages focus, rather than relying on \`:hover\` alone — but the *positioning* technique (relative parent, absolute child) stays exactly the same either way

Because \`:hover\` cannot be expressed as a static inline \`style\` object, every example below uses a genuine \`<style>\` tag with real CSS selectors, which this sandbox renders directly into the live DOM.`,
  examples: [
    {
      id: "basic-hover-dropdown",
      title: "A basic hover-triggered dropdown",
      summary: "Hover over the trigger — the menu is revealed purely by a :hover rule flipping display: none to block.",
      code: `function DropdownStyles() {
  return (
    <style>{\`
      .dropdown { position: relative; display: inline-block; }
      .dropdown-trigger {
        padding: 10px 16px;
        background: #2563eb;
        color: white;
        border-radius: 6px;
        cursor: pointer;
      }
      .dropdown-menu {
        display: none;
        position: absolute;
        top: 100%;
        left: 0;
        margin-top: 4px;
        background: white;
        border: 1px solid #e5e7eb;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        min-width: 160px;
        z-index: 10;
      }
      .dropdown:hover .dropdown-menu { display: block; }
      .dropdown-menu a {
        display: block;
        padding: 10px 14px;
        color: #374151;
        text-decoration: none;
      }
      .dropdown-menu a:hover { background: #f3f4f6; }
    \`}</style>
  );
}

function App() {
  return (
    <div className="dropdown">
      <DropdownStyles />
      <div className="dropdown-trigger">Account &#9662;</div>
      <div className="dropdown-menu">
        <a href="#" onClick={(e) => e.preventDefault()}>Profile</a>
        <a href="#" onClick={(e) => e.preventDefault()}>Settings</a>
        <a href="#" onClick={(e) => e.preventDefault()}>Sign out</a>
      </div>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "nav-item-with-dropdown",
      title: "A navigation link that opens a dropdown",
      summary: "The same relative/absolute pattern applied to one item inside a horizontal nav bar.",
      code: `function NavDropdownStyles() {
  return (
    <style>{\`
      .nav-row { list-style: none; display: flex; gap: 4px; margin: 0; padding: 0; }
      .nav-row > li { position: relative; }
      .nav-row > li > a { display: block; padding: 10px 14px; text-decoration: none; color: #374151; border-radius: 6px; }
      .nav-row > li:hover > a { background: #f3f4f6; }
      .nav-dropdown {
        display: none;
        position: absolute;
        top: 100%;
        left: 0;
        background: white;
        border: 1px solid #e5e7eb;
        border-radius: 8px;
        min-width: 150px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
      }
      .nav-row > li:hover .nav-dropdown { display: block; }
      .nav-dropdown a { display: block; padding: 8px 12px; color: #374151; text-decoration: none; }
      .nav-dropdown a:hover { background: #eef2ff; color: #4338ca; }
    \`}</style>
  );
}

function App() {
  return (
    <nav>
      <NavDropdownStyles />
      <ul className="nav-row">
        <li><a href="#" onClick={(e) => e.preventDefault()}>Home</a></li>
        <li>
          <a href="#" onClick={(e) => e.preventDefault()}>Products &#9662;</a>
          <div className="nav-dropdown">
            <a href="#" onClick={(e) => e.preventDefault()}>Laptops</a>
            <a href="#" onClick={(e) => e.preventDefault()}>Phones</a>
            <a href="#" onClick={(e) => e.preventDefault()}>Tablets</a>
          </div>
        </li>
        <li><a href="#" onClick={(e) => e.preventDefault()}>Contact</a></li>
      </ul>
    </nav>
  );
}

render(<App />);`,
    },
    {
      id: "dropdown-with-fade-transition",
      title: "Softening the reveal with opacity + transition",
      summary: "Instead of an abrupt display swap, the menu fades and slides in using visibility and opacity.",
      code: `function FadeDropdownStyles() {
  return (
    <style>{\`
      .fade-dropdown { position: relative; display: inline-block; }
      .fade-trigger { padding: 10px 16px; background: #111827; color: white; border-radius: 6px; cursor: pointer; }
      .fade-menu {
        position: absolute;
        top: 100%;
        left: 0;
        margin-top: 6px;
        background: white;
        border: 1px solid #e5e7eb;
        border-radius: 8px;
        min-width: 160px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.12);
        opacity: 0;
        visibility: hidden;
        transform: translateY(-6px);
        transition: opacity 0.15s ease, transform 0.15s ease, visibility 0.15s;
      }
      .fade-dropdown:hover .fade-menu {
        opacity: 1;
        visibility: visible;
        transform: translateY(0);
      }
      .fade-menu a { display: block; padding: 10px 14px; color: #374151; text-decoration: none; }
      .fade-menu a:hover { background: #f3f4f6; }
    \`}</style>
  );
}

function App() {
  return (
    <div className="fade-dropdown">
      <FadeDropdownStyles />
      <div className="fade-trigger">Options &#9662;</div>
      <div className="fade-menu">
        <a href="#" onClick={(e) => e.preventDefault()}>Edit</a>
        <a href="#" onClick={(e) => e.preventDefault()}>Duplicate</a>
        <a href="#" onClick={(e) => e.preventDefault()}>Delete</a>
      </div>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
