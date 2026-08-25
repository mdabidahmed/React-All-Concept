import type { Topic } from "../../types";

export const reactPropsDestructuringTopic: Topic = {
  id: "react-props-destructuring",
  title: "React Props Destructuring",
  category: "Components",
  shortExplanation:
    "Instead of writing props.title, props.count, and so on throughout a component, you can destructure the props object right in the function signature — function Card({ title, children }) — to pull out named variables directly. Destructuring also supports default values, renaming a prop while extracting it, and collecting the remaining props with a ...rest pattern for pass-through.",
  longExplanation:
    "Because a component's props arrive as a single plain object, everything JavaScript's object-destructuring syntax can do to any object applies equally well to props, and doing it in the function signature is by far the most common style in modern React code. Writing function Card({ title, children }) instead of function Card(props) and then props.title, props.children everywhere reads more like a clear contract — 'this component accepts a title and children' is visible at a glance, without hunting through the function body for every props.something access. Destructuring supports default values inline, function Card({ title = 'Untitled' }), which is functionally similar to the || fallback pattern but is preferred because it only kicks in when the prop is actually undefined (unlike ||, which would also override an intentionally-falsy value like an empty string or 0), and it keeps the default visible right next to the prop's declaration instead of buried in the function body. You can also rename a prop while pulling it out, { name: userName }, which is useful when the prop's public name (chosen for the component's API) would otherwise collide with an outer variable, a reserved word, or just wouldn't read as clearly inside the function. Destructuring nests too — a prop that is itself an object, like config, can be destructured directly into its fields, { config: { theme, locale } }, skipping an intermediate config.theme reference, though this trades off readability once nesting gets more than one level deep. Finally, the rest pattern, { variant, ...rest }, pulls out the props a component cares about by name and bundles everything else into a plain object, which is the standard way to build a thin wrapper component (a styled Button, a custom Input) that adds a few props of its own while transparently forwarding every other prop — onClick, id, aria-label, whatever the caller passed — onto the underlying native element via {...rest}.",
  examples: [
    {
      id: "props-object-vs-destructured",
      title: "props.x vs. destructured, side by side",
      summary: "The exact same component written both ways.",
      code: `function GreetingWithPropsObject(props) {
  return (
    <p>
      Hello, {props.name}! You have {props.messageCount} new messages.
    </p>
  );
}

function GreetingDestructured({ name, messageCount }) {
  return (
    <p>
      Hello, {name}! You have {messageCount} new messages.
    </p>
  );
}

function App() {
  return (
    <div style={{ display: "grid", gap: 4 }}>
      <GreetingWithPropsObject name="Ada" messageCount={3} />
      <GreetingDestructured name="Ada" messageCount={3} />
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "destructuring-with-defaults",
      title: "Destructuring with default values",
      summary: "Default parameters fill in a prop only when it's actually undefined.",
      code: `function Alert({ message, level = "info" }) {
  const colors = {
    info: { background: "#eff6ff", color: "#1d4ed8" },
    warning: { background: "#fffbeb", color: "#b45309" },
    error: { background: "#fef2f2", color: "#b91c1c" },
  };

  return (
    <div style={{ ...colors[level], padding: 10, borderRadius: 6 }}>
      [{level.toUpperCase()}] {message}
    </div>
  );
}

function App() {
  return (
    <div style={{ display: "grid", gap: 8 }}>
      <Alert message="Everything looks fine." />
      <Alert message="Disk space is low." level="warning" />
      <Alert message="Save failed." level="error" />
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "destructuring-with-renaming",
      title: "Renaming a prop while destructuring",
      summary: "{ name: userName } pulls out the name prop into a locally-clearer variable name.",
      code: `function UserLabel({ name: userName, role: userRole }) {
  return (
    <p>
      <strong>{userName}</strong> — <span style={{ color: "#6b7280" }}>{userRole}</span>
    </p>
  );
}

function App() {
  return (
    <div style={{ display: "grid", gap: 4 }}>
      <UserLabel name="Grace Hopper" role="Admiral" />
      <UserLabel name="Alan Turing" role="Researcher" />
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "nested-destructuring",
      title: "Destructuring a nested object prop",
      summary: "Pull fields directly out of a prop that is itself an object, like a config prop.",
      code: `function ThemedPanel({ config: { theme, accentColor } }) {
  return (
    <div
      style={{
        padding: 12,
        borderRadius: 6,
        background: theme === "dark" ? "#111827" : "#f9fafb",
        color: theme === "dark" ? "white" : "#111827",
        borderLeft: \`4px solid \${accentColor}\`,
      }}
    >
      Theme: {theme}, accent: {accentColor}
    </div>
  );
}

function App() {
  return (
    <div style={{ display: "grid", gap: 8 }}>
      <ThemedPanel config={{ theme: "light", accentColor: "#2563eb" }} />
      <ThemedPanel config={{ theme: "dark", accentColor: "#f59e0b" }} />
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "rest-pass-through",
      title: "The ...rest pass-through pattern",
      summary: "A wrapper Button that handles a few named props and forwards everything else to the DOM element.",
      code: `function Button({ variant = "primary", children, ...rest }) {
  const styles = {
    primary: { background: "#2563eb", color: "white" },
    danger: { background: "#dc2626", color: "white" },
  };

  return (
    <button
      {...rest}
      style={{ ...styles[variant], padding: "8px 14px", borderRadius: 6, border: "none" }}
    >
      {children}
    </button>
  );
}

function App() {
  return (
    <div style={{ display: "flex", gap: 8 }}>
      <Button onClick={() => alert("Saved!")}>Save</Button>
      <Button variant="danger" onClick={() => alert("Deleted!")} title="Permanently delete">
        Delete
      </Button>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
