import type { Topic } from "../../types";

export const reactPropsDestructuringTopic: Topic = {
  id: "react-props-destructuring",
  title: "React Props Destructuring",
  category: "Components",
  shortExplanation: `Instead of writing \`props.title\`, \`props.count\`, and so on throughout a component, you can ==destructure== the props object right in the function signature — \`function Card({ title, children })\`.

- Pulls named variables out directly, no repeated \`props.\` prefix
- Supports **default values**, right next to the prop's declaration
- Can *rename* a prop while extracting it, or collect the rest with \`...rest\``,
  longExplanation: `Because a component's props arrive as a single plain object, every trick JavaScript's object-destructuring syntax offers applies equally well to props — and doing it right in the function signature is by far the most common style in modern React code, since \`function Card({ title, children })\` reads like a clear contract compared to hunting for \`props.title\` throughout the function body.

- **Default values** inline — \`function Card({ title = 'Untitled' })\` — are preferred over an \`||\` fallback because they only kick in when the prop is actually \`undefined\`, unlike \`||\`, which would also override an intentionally-falsy value like \`''\` or \`0\`
- **Renaming** a prop while extracting it, \`{ name: userName }\`, is useful when the prop's public name would otherwise collide with an outer variable, a reserved word, or just wouldn't read clearly inside the function
- Destructuring **nests** too — a prop that's itself an object, like \`config\`, can be pulled apart directly, \`{ config: { theme, locale } }\`, though this trades off readability past one level deep
- The **\`...rest\`** pattern, \`{ variant, ...rest }\`, pulls out the props a component cares about by name and bundles everything else into an object — the standard way to build a thin wrapper component (a styled \`Button\`, a custom \`Input\`) that forwards every other prop it was given onto the underlying element via \`{...rest}\``,
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
