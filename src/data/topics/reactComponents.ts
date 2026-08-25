import type { Topic } from "../../types";
import { ReactComponentsDiagram } from "../../components/molecules/Diagrams/ReactComponentsDiagram";

export const reactComponentsTopic: Topic = {
  id: "react-components",
  title: "React Components",
  category: "Components",
  shortExplanation: `A React component is a JavaScript function, conventionally named in **PascalCase**, that returns JSX describing a piece of UI. Components are ==composable== — they render other components inside them — and reusable, so the same component can appear many times with different props.

- Returns **JSX**: a description of what should appear on screen
- *Composable*: components render other components, forming a tree
- *Reusable*: the same component works with different props each time`,
  longExplanation: `The component is React's core unit of reuse: instead of a page being one monolithic template, it's built from small functions that call each other the way ordinary functions do, each returning a description of some piece of UI.

- A component's name must start with a capital letter (**PascalCase**), because that's how JSX tells components apart from plain HTML tags — \`<button>\` is the built-in DOM element, while \`<Button>\` is looked up as a variable in scope, so a lowercase function would silently render as an unknown HTML tag
- Because a component is "just a function," it can be one line or an entire page — the right size is usually *one clear responsibility*; too many unrelated concerns is a signal to split it up
- Rendering one component inside another builds a ==component tree==: the same nesting you see in JSX maps directly onto nested component instances, with data flowing down through props and events flowing back up through callback props
- Modern React is almost entirely **function components** using hooks; an older style called **class components** (an ES6 class extending \`React.Component\`, with \`this.state\` and lifecycle methods) still shows up in legacy code — see the React Class topic for a full comparison
- Every component, whichever style, must be *pure* with respect to its inputs: given the same props and state, it should always describe the same UI, which is what makes the tree predictable and testable at every level`,
  diagram: ReactComponentsDiagram,
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
