import type { Topic } from "../../types";

export const reactPropsChildrenTopic: Topic = {
  id: "react-props-children",
  title: "React Props Children",
  category: "Components",
  shortExplanation:
    "props.children is a special prop that holds whatever JSX is nested between a component's opening and closing tags. It lets you write generic 'container' components — Card, Modal, Layout — that render whatever content the caller puts inside them without needing to know its shape.",
  longExplanation:
    "Whenever you write <Card><p>Hello</p></Card>, React automatically passes the <p>Hello</p> element to Card as a prop named children, exactly as if you had written <Card children={<p>Hello</p>} />. This single mechanism is the backbone of composition in React: a component that accepts children doesn't need to know or care what's rendered inside it, so the same Card, Modal, or Panel component can wrap a paragraph, a form, a chart, or another component tree without any changes to its own code. children can be a single element, an array of elements, a string, a number, or even a function (the 'render props' pattern, used less often now that hooks exist) — React treats whatever you nest as the value, and a component simply decides where in its own output to place {children}. A common pitfall is forgetting that children is undefined when nothing is nested, so components that always expect content should provide a fallback (a placeholder, an empty state, or a default value) rather than assuming children exists. Another subtlety is that children is opaque to the component receiving it — to inspect, count, or transform individual child elements you reach for the React.Children utilities (React.Children.map, React.Children.count) rather than treating children as a plain array, since it may be a single element rather than a list. Understanding children well is what unlocks writing true 'layout' components, and it's the foundation the rest of composition-based patterns (component-as-prop, slots, compound components) build on top of.",
  examples: [
    {
      id: "basic-card-children",
      title: "A basic Card with children",
      summary: "A Card component renders whatever JSX is nested inside it.",
      code: `function Card({ title, children }) {
  return (
    <div style={{ border: "1px solid #d1d5db", borderRadius: 8, padding: 16, maxWidth: 260 }}>
      <h4 style={{ margin: "0 0 8px" }}>{title}</h4>
      {children}
    </div>
  );
}

function App() {
  return (
    <Card title="Welcome">
      <p style={{ margin: 0, color: "#4b5563" }}>
        This paragraph was passed in as <code>children</code>.
      </p>
    </Card>
  );
}

render(<App />);`,
    },
    {
      id: "layout-wrapping-children",
      title: "A Layout component wrapping different children",
      summary: "One generic Layout renders a header, a form, and a list without knowing about any of them.",
      code: `function Layout({ children }) {
  return (
    <div
      style={{
        border: "1px solid #d1d5db",
        borderRadius: 8,
        padding: 16,
        display: "grid",
        gap: 12,
        maxWidth: 280,
      }}
    >
      {children}
    </div>
  );
}

function App() {
  return (
    <Layout>
      <h4 style={{ margin: 0 }}>Dashboard</h4>
      <input placeholder="Search..." style={{ padding: 6, borderRadius: 6, border: "1px solid #d1d5db" }} />
      <ul style={{ margin: 0, paddingLeft: 18 }}>
        <li>Item one</li>
        <li>Item two</li>
      </ul>
    </Layout>
  );
}

render(<App />);`,
    },
    {
      id: "children-fallback",
      title: "Fallback content when children is missing",
      summary: "A Panel shows a placeholder message whenever no children were passed.",
      code: `function Panel({ title, children }) {
  return (
    <div style={{ border: "1px solid #d1d5db", borderRadius: 8, padding: 16, maxWidth: 260 }}>
      <h4 style={{ margin: "0 0 8px" }}>{title}</h4>
      {children ? (
        children
      ) : (
        <p style={{ margin: 0, color: "#9ca3af", fontStyle: "italic" }}>
          Nothing to show yet.
        </p>
      )}
    </div>
  );
}

function App() {
  return (
    <div style={{ display: "grid", gap: 12 }}>
      <Panel title="With content">
        <p style={{ margin: 0 }}>Real content here.</p>
      </Panel>
      <Panel title="Empty panel" />
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "wrapping-children-with-styles",
      title: "Wrapping each child with extra styling",
      summary: "React.Children.map adds a numbered badge and spacing to every child passed in.",
      code: `function NumberedList({ children }) {
  const items = React.Children.map(children, (child, index) => (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "6px 10px",
        border: "1px solid #d1d5db",
        borderRadius: 6,
      }}
    >
      <span
        style={{
          background: "#2563eb",
          color: "white",
          borderRadius: "50%",
          width: 20,
          height: 20,
          display: "grid",
          placeItems: "center",
          fontSize: 12,
        }}
      >
        {index + 1}
      </span>
      {child}
    </div>
  ));

  return <div style={{ display: "grid", gap: 8, maxWidth: 260 }}>{items}</div>;
}

function App() {
  return (
    <NumberedList>
      <span>Wake up</span>
      <span>Write React</span>
      <span>Ship it</span>
    </NumberedList>
  );
}

render(<App />);`,
    },
    {
      id: "nested-composition",
      title: "Nested composition with custom components",
      summary: "A Card's children can themselves be other custom components, several levels deep.",
      code: `function Card({ title, children }) {
  return (
    <div style={{ border: "1px solid #d1d5db", borderRadius: 8, padding: 16, maxWidth: 300 }}>
      <h4 style={{ margin: "0 0 8px" }}>{title}</h4>
      <div style={{ display: "grid", gap: 8 }}>{children}</div>
    </div>
  );
}

function Tag({ children }) {
  return (
    <span
      style={{
        background: "#eef2ff",
        color: "#4338ca",
        padding: "2px 8px",
        borderRadius: 999,
        fontSize: 12,
      }}
    >
      {children}
    </span>
  );
}

function TagRow({ children }) {
  return <div style={{ display: "flex", gap: 6 }}>{children}</div>;
}

function App() {
  return (
    <Card title="Article">
      <p style={{ margin: 0 }}>A short summary of the article goes here.</p>
      <TagRow>
        <Tag>react</Tag>
        <Tag>composition</Tag>
        <Tag>children</Tag>
      </TagRow>
    </Card>
  );
}

render(<App />);`,
    },
  ],
};
