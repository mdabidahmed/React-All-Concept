import type { Topic } from "../../types";

export const reactHocTopic: Topic = {
  id: "react-hoc",
  title: "React HOC",
  category: "Advanced",
  shortExplanation:
    "A Higher-Order Component (HOC) is a function that takes a component and returns a new, enhanced component — const Enhanced = withSomething(MyComponent). It's a way to reuse cross-cutting logic (auth checks, loading states, logging) by wrapping components rather than modifying them. Custom hooks now cover most of the same ground with less indirection.",
  longExplanation:
    "A higher-order component follows a simple shape: it's a plain function that accepts a component as an argument and returns a new component wrapping it, injecting extra props, extra markup, or conditional rendering around the original — for example withAuth(Dashboard) might render a login prompt instead of Dashboard when the user isn't authenticated, or withLoading(Table) might render a spinner while data is still loading. HOCs were the primary way to share stateful, cross-cutting logic between components before hooks existed, and libraries like older versions of Redux (connect) and React Router (withRouter) popularized the pattern. They come with well-known drawbacks, though: each HOC adds a wrapper component to the tree (visible in devtools as extra nesting), the props a HOC injects are implicit and can silently collide with props the wrapped component already uses or another HOC also injects, and composing several HOCs together (withA(withB(withC(Component)))) gets hard to read and trace. Custom hooks solve the same underlying problem — sharing stateful logic across components — without any of those costs: a hook like useAuth() or useLoading() is called directly inside the component that needs it, so there's no extra wrapper in the tree, no prop injection to name-collide, and the data flow is explicit at the call site. For that reason modern React code reaches for custom hooks by default and treats HOCs as a pattern you should recognize (since you'll still see it in some libraries and older codebases) rather than one you should reach for in new code.",
  examples: [
    {
      id: "with-border",
      title: "withBorder — a basic wrapping HOC",
      summary: "A HOC that wraps any component in a bordered container without changing its own code.",
      code: `function withBorder(Wrapped) {
  return function BorderedComponent(props) {
    return (
      <div style={{ border: "1px solid #d1d5db", borderRadius: 6, padding: 12 }}>
        <Wrapped {...props} />
      </div>
    );
  };
}

function Greeting({ name }) {
  return <p style={{ margin: 0 }}>Hello, {name}!</p>;
}

const BorderedGreeting = withBorder(Greeting);

function App() {
  return (
    <div style={{ display: "grid", gap: 10, maxWidth: 260 }}>
      <BorderedGreeting name="Ada" />
      <small>withBorder(Greeting) adds a wrapper div — Greeting itself is untouched.</small>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "with-toggle",
      title: "withToggle — injecting isOn/toggle props",
      summary: "A HOC that owns a piece of state and injects it plus a setter into the wrapped component.",
      code: `function withToggle(Wrapped) {
  return function ToggleableComponent(props) {
    const [isOn, setIsOn] = useState(false);
    const toggle = () => setIsOn((v) => !v);
    return <Wrapped {...props} isOn={isOn} toggle={toggle} />;
  };
}

function Lamp({ isOn, toggle }) {
  return (
    <div style={{ display: "grid", gap: 8, justifyItems: "start" }}>
      <div
        style={{
          width: 60,
          height: 60,
          borderRadius: "50%",
          background: isOn ? "#facc15" : "#e5e7eb",
          border: "1px solid #d1d5db",
        }}
      />
      <button onClick={toggle}>{isOn ? "Turn off" : "Turn on"}</button>
    </div>
  );
}

const ToggleableLamp = withToggle(Lamp);

function App() {
  return <ToggleableLamp />;
}

render(<App />);`,
    },
    {
      id: "with-loading",
      title: "withLoading — a fallback while isLoading is true",
      summary: "A HOC that swaps in a spinner-like fallback based on an isLoading prop.",
      code: `function withLoading(Wrapped) {
  return function WithLoadingComponent({ isLoading, ...rest }) {
    if (isLoading) {
      return (
        <div style={{ padding: 16, color: "#6b7280", fontStyle: "italic" }}>
          Loading...
        </div>
      );
    }
    return <Wrapped {...rest} />;
  };
}

function UserCard({ name }) {
  return (
    <div style={{ border: "1px solid #d1d5db", borderRadius: 6, padding: 12 }}>
      User: <strong>{name}</strong>
    </div>
  );
}

const UserCardWithLoading = withLoading(UserCard);

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div style={{ display: "grid", gap: 10, maxWidth: 260 }}>
      <UserCardWithLoading isLoading={isLoading} name="Grace Hopper" />
      <button onClick={() => setIsLoading((v) => !v)}>
        {isLoading ? "Finish loading" : "Reset to loading"}
      </button>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "with-auth",
      title: "withAuth — conditional rendering based on an injected prop",
      summary: "A HOC that renders the wrapped component only when an auth-like condition is met.",
      code: `function withAuth(Wrapped) {
  return function AuthGuarded({ isLoggedIn, ...rest }) {
    if (!isLoggedIn) {
      return (
        <p style={{ color: "#b91c1c" }}>You must be logged in to view this content.</p>
      );
    }
    return <Wrapped {...rest} />;
  };
}

function SecretPanel() {
  return (
    <div style={{ border: "1px solid #d1d5db", borderRadius: 6, padding: 12 }}>
      Top secret content.
    </div>
  );
}

const GuardedPanel = withAuth(SecretPanel);

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div style={{ display: "grid", gap: 10, maxWidth: 280 }}>
      <GuardedPanel isLoggedIn={isLoggedIn} />
      <button onClick={() => setIsLoggedIn((v) => !v)}>
        {isLoggedIn ? "Log out" : "Log in"}
      </button>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "hoc-vs-hook",
      title: "HOC vs. custom hook, side by side",
      summary: "The same counter logic implemented once as a HOC and once as a custom hook.",
      code: `function withCounter(Wrapped) {
  return function WithCounter(props) {
    const [count, setCount] = useState(0);
    const increment = () => setCount((c) => c + 1);
    return <Wrapped {...props} count={count} increment={increment} />;
  };
}

function CounterViewHoc({ count, increment }) {
  return <button onClick={increment}>HOC count: {count}</button>;
}
const CounterWithHoc = withCounter(CounterViewHoc);

function useCounter() {
  const [count, setCount] = useState(0);
  const increment = () => setCount((c) => c + 1);
  return { count, increment };
}

function CounterWithHook() {
  const { count, increment } = useCounter();
  return <button onClick={increment}>Hook count: {count}</button>;
}

function App() {
  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <CounterWithHoc />
      <CounterWithHook />
      <small>Same behavior, but the hook version has no extra wrapper component and no injected props to name.</small>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
