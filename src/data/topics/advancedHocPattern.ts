import type { Topic } from "../../types";
import { AdvancedHocDiagram } from "../../components/molecules/Diagrams/AdvancedHocDiagram";

export const advancedHocPatternTopic: Topic = {
  id: "advanced-hoc-pattern",
  title: "Higher-Order Components",
  category: "Advanced Patterns",
  shortExplanation: `A **Higher-Order Component (HOC)** takes a component in and returns a *new* component wrapping it — one of the classic pre-hooks patterns for sharing logic across components, alongside render props and the container pattern.

- Named by convention with a \`with\` prefix — \`withAuth\`, \`withLogging\`, \`withPagination\`
- **Composing** several HOCs (\`withA(withB(withC(Component)))\`) nests wrapper components several layers deep
- Each HOC's injected props are ==implicit== — nothing in the JSX shows they exist, which makes prop-name collisions easy to miss
- A **custom hook** now covers the same ground with no extra wrapper and no injected-prop names to remember`,
  longExplanation: `A HOC is just a function: it accepts a component and returns a new one that renders the original, usually with extra props, conditional rendering, or markup layered around it — \`withPagination(Table)\` might inject \`page\`/\`setPage\` props that \`Table\` didn't have to manage itself.

- **Naming and debugging**: since the returned component has no name of its own by default, React DevTools shows it as an anonymous component. Setting \`Wrapped.displayName\` to something like "withX(Inner)" makes it identifiable in the component tree
- **Composing many HOCs** gets hard to trace — \`withA(withB(withC(Component)))\` reads inside-out, and a small \`compose(...)\` helper (\`compose(withA, withB, withC)(Component)\`) only hides the nesting, it doesn't remove the wrapper components themselves
- **Prop collisions**: two HOCs that both inject a prop named \`onChange\` or \`data\` silently overwrite one another depending on wrapping order — nothing warns you at the call site
- **Refs don't pass through automatically** — a ref attached to \`Enhanced\` points at the outermost wrapper, not the wrapped component, unless the HOC explicitly forwards it with \`forwardRef\`

Custom hooks solve the underlying problem — sharing logic — without any of this: \`useAuth()\` called directly inside a component needs no wrapper, injects nothing implicitly, and a ref just works normally. Recognize the HOC pattern when reading older libraries (Redux's \`connect\`, React Router's old \`withRouter\`) rather than reaching for it in new code.`,
  diagram: AdvancedHocDiagram,
  examples: [
    {
      id: "log-props-hoc",
      title: "withLogging — a debugging HOC",
      summary: "A HOC that logs a component's props to the console every time it renders.",
      code: `function withLogging(Wrapped) {
  return function Logged(props) {
    console.log("Rendering with props:", props);
    return <Wrapped {...props} />;
  };
}

function Price({ amount }) {
  return <p style={{ margin: 0 }}>Price: {"$"}{amount}</p>;
}

const LoggedPrice = withLogging(Price);

function App() {
  const [amount, setAmount] = useState(10);
  return (
    <div style={{ display: "grid", gap: 10, maxWidth: 260 }}>
      <LoggedPrice amount={amount} />
      <button onClick={() => setAmount((a) => a + 5)}>Increase price</button>
      <small>Open the console — every render logs the current props.</small>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "compose-helper",
      title: "compose() — combining multiple HOCs",
      summary: "A small utility that flattens withA(withB(withC(X))) into compose(withA, withB, withC)(X).",
      code: `function compose(...hocs) {
  return function (Component) {
    return hocs.reduceRight((wrapped, hoc) => hoc(wrapped), Component);
  };
}

function withBorder(Wrapped) {
  return (props) => (
    <div style={{ border: "2px solid #0d9488", borderRadius: 6, padding: 10 }}>
      <Wrapped {...props} />
    </div>
  );
}

function withUppercase(Wrapped) {
  return ({ text, ...rest }) => <Wrapped {...rest} text={text.toUpperCase()} />;
}

function Label({ text }) {
  return <span>{text}</span>;
}

const Enhanced = compose(withBorder, withUppercase)(Label);

function App() {
  return <Enhanced text="hello from two HOCs" />;
}

render(<App />);`,
    },
    {
      id: "displayname-devtools",
      title: "Naming a HOC for React DevTools",
      summary: "Setting displayName so a HOC-wrapped component is identifiable instead of showing as \"Anonymous\".",
      code: `function withTheme(Wrapped) {
  function ThemedComponent(props) {
    return <Wrapped {...props} theme="dark" />;
  }
  ThemedComponent.displayName = \`withTheme(\${Wrapped.displayName || Wrapped.name || "Component"})\`;
  return ThemedComponent;
}

function Panel({ theme, children }) {
  return (
    <div
      style={{
        padding: 12,
        borderRadius: 6,
        background: theme === "dark" ? "#111827" : "#f9fafb",
        color: theme === "dark" ? "#f9fafb" : "#111827",
      }}
    >
      {children}
    </div>
  );
}

const ThemedPanel = withTheme(Panel);

function App() {
  return (
    <div style={{ display: "grid", gap: 8 }}>
      <ThemedPanel>Inspect this component in devtools —</ThemedPanel>
      <small>its name shows as "{ThemedPanel.displayName}", not "Anonymous".</small>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "hoc-prop-collision",
      title: "A prop-name collision between two HOCs",
      summary: "Two HOCs both inject a prop named \"data\" — the second one silently wins.",
      code: `function withUserData(Wrapped) {
  return (props) => <Wrapped {...props} data={{ kind: "user", name: "Ada" }} />;
}

function withStatsData(Wrapped) {
  return (props) => <Wrapped {...props} data={{ kind: "stats", visits: 42 }} />;
}

function Display({ data }) {
  return <pre style={{ margin: 0 }}>{JSON.stringify(data, null, 2)}</pre>;
}

// withStatsData runs last, so its "data" prop overwrites withUserData's.
const Combined = withUserData(withStatsData(Display));

function App() {
  return (
    <div style={{ display: "grid", gap: 8 }}>
      <Combined />
      <small>Only the stats data ever reaches Display — the user data was silently dropped.</small>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
