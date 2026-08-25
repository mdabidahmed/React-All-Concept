import type { Topic } from "../../types";

export const reactComponentsTopic: Topic = {
  id: "react-components",
  title: "React Components",
  category: "Components",
  shortExplanation:
    "A React component is a JavaScript function, conventionally named in PascalCase, that returns JSX describing a piece of UI. Components are composable — they can render other components inside them — and reusable, since the same component can appear many times with different props, forming a tree that mirrors the structure of the page.",
  longExplanation:
    "The component is React's core unit of reuse: instead of a page being one monolithic template, it's built from small functions, each returning a description of some piece of UI, that call each other the way ordinary functions call each other. A component's name must start with a capital letter (PascalCase) because that's how JSX tells components apart from plain HTML tags — <button> is treated as the built-in DOM element, while <Button> is looked up as a variable in scope, so a lowercase component function would silently be rendered as an unknown HTML tag instead. Because a component is 'just a function', it can be as small as a single line or as large as an entire page, and the right size is usually 'one clear responsibility' — a component that's grown too many unrelated concerns is a signal to split it into smaller ones. Rendering one component inside another (parent renders <Child />) is what builds a component tree: the same nesting relationships you see in the JSX map directly onto a tree of component instances, with data flowing down through props and events flowing back up through callback props. This is also where React's two component styles show up: nearly all modern code is written as function components, which use hooks (useState, useEffect, and friends) for state and lifecycle behavior, but React also supports an older style called class components, written as ES6 classes extending React.Component with their own this.state and lifecycle methods — you'll mostly encounter these reading legacy code rather than writing new code (see the 'React Class' topic for a full comparison). Every component, whichever style, must be pure with respect to its inputs: given the same props and state, it should always describe the same UI, which is what makes the tree predictable and testable at every level.",
  examples: [
    {
      id: "minimal-component",
      title: "A minimal function component",
      summary: "The smallest possible component: a PascalCase function returning JSX.",
      code: `function Greeting() {
  return <p>Hello from a component!</p>;
}

function App() {
  return <Greeting />;
}

render(<App />);`,
    },
    {
      id: "parent-child-composition",
      title: "Parent renders a child component",
      summary: "A Panel component composed of a Header and a Body sub-component.",
      code: `function Header({ title }) {
  return <h3 style={{ margin: 0 }}>{title}</h3>;
}

function Body({ text }) {
  return <p style={{ margin: "8px 0 0", color: "#4b5563" }}>{text}</p>;
}

function Panel({ title, text }) {
  return (
    <div style={{ border: "1px solid #d1d5db", borderRadius: 8, padding: 12, maxWidth: 260 }}>
      <Header title={title} />
      <Body text={text} />
    </div>
  );
}

function App() {
  return <Panel title="Welcome" text="Panel composes Header and Body inside it." />;
}

render(<App />);`,
    },
    {
      id: "reused-with-different-content",
      title: "One component, reused many times",
      summary: "The same Tag component rendered three times with different props.",
      code: `function Tag({ label, color }) {
  return (
    <span
      style={{
        padding: "4px 10px",
        borderRadius: 999,
        fontSize: 12,
        background: color,
        color: "white",
      }}
    >
      {label}
    </span>
  );
}

function App() {
  return (
    <div style={{ display: "flex", gap: 8 }}>
      <Tag label="React" color="#2563eb" />
      <Tag label="Hooks" color="#16a34a" />
      <Tag label="JSX" color="#d97706" />
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "fragment-multiple-children",
      title: "Returning a Fragment",
      summary: "A component can return multiple top-level elements wrapped in a Fragment, no extra div needed.",
      code: `function StatRow() {
  return (
    <React.Fragment>
      <dt style={{ color: "#6b7280" }}>Uptime</dt>
      <dd style={{ margin: 0, fontWeight: 600 }}>99.98%</dd>
    </React.Fragment>
  );
}

function App() {
  return (
    <dl style={{ display: "grid", gridTemplateColumns: "auto auto", gap: "4px 12px", margin: 0 }}>
      <StatRow />
    </dl>
  );
}

render(<App />);`,
    },
    {
      id: "component-tree-demo",
      title: "A small component tree",
      summary: "An App built from Header, Body, and Footer sub-components, mirroring the page structure.",
      code: `function Header() {
  return (
    <header style={{ padding: 10, background: "#111827", color: "white", borderRadius: "6px 6px 0 0" }}>
      My Site
    </header>
  );
}

function Body() {
  return (
    <main style={{ padding: 12 }}>
      <p style={{ margin: 0 }}>The main content lives here, inside its own component.</p>
    </main>
  );
}

function Footer() {
  return (
    <footer style={{ padding: 10, background: "#f3f4f6", borderRadius: "0 0 6px 6px", fontSize: 12 }}>
      © 2026 My Site
    </footer>
  );
}

function App() {
  return (
    <div style={{ border: "1px solid #d1d5db", borderRadius: 6, maxWidth: 280 }}>
      <Header />
      <Body />
      <Footer />
    </div>
  );
}

render(<App />);`,
    },
  ],
};
