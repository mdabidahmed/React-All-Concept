import type { Topic } from "../../types";
import { ReactClassDiagram } from "../../components/molecules/Diagrams/ReactClassDiagram";

export const reactClassTopic: Topic = {
  id: "react-class",
  title: "React Class",
  category: "Components",
  shortExplanation: `Class components are React's older component style: an ES6 class extending \`React.Component\`, holding state in \`this.state\`, and hooking into the lifecycle through named methods. Modern React is almost entirely ==function components== with hooks — this topic is mainly for reading legacy code.

- State lives in \`this.state\`, updated via \`this.setState()\`
- **Lifecycle methods** replace \`useEffect\`: mount, update, unmount
- *Rarely written today* — you'll mostly encounter it in older codebases`,
  longExplanation: `Before hooks arrived in React 16.8, class components were the only way to give a component local state or lifecycle behavior — a function component back then could only be a stateless, prop-in/JSX-out template. A class extends \`React.Component\`, stores its state as a single object on \`this.state\` (initialized in the constructor), and never mutates it directly — it calls \`this.setState(partialUpdate)\`, which shallow-merges the change and schedules a re-render, conceptually similar to what the \`useState\` setter does.

- **componentDidMount** runs once, right after the component is first inserted into the DOM — the place to start a subscription, a timer, or a data fetch
- **componentDidUpdate** runs after every re-render caused by a props or state change — typically after comparing \`prevProps\`/\`prevState\` to the current ones, to avoid infinite update loops
- **componentWillUnmount** runs right before the component is removed — the place to clean up anything started in \`componentDidMount\`, like clearing an interval or unsubscribing

A recurring class-component headache is that a regular method loses its \`this\` binding when passed around as a callback (\`onClick={this.handleClick}\`), since JavaScript methods aren't automatically bound to their instance — the fix is binding in the constructor, or declaring the method as an arrow-function class property, which captures \`this\` lexically. Hooks were created specifically to remove these pain points: no \`this\`, no binding, and related logic — a subscription's setup and its cleanup — can live together in one \`useEffect\` instead of being split across two lifecycle methods, which is why virtually all new React code favors ==function components== today.`,
  diagram: ReactClassDiagram,
  examples: [
    {
      id: "class-counter",
      title: "A class component counter",
      summary: "this.state and this.setState driving a simple counter.",
      code: `class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }

  increment = () => {
    this.setState((prev) => ({ count: prev.count + 1 }));
  };

  decrement = () => {
    this.setState((prev) => ({ count: prev.count - 1 }));
  };

  render() {
    return (
      <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
        <p>Count: <strong>{this.state.count}</strong></p>
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={this.decrement}>-1</button>
          <button onClick={this.increment}>+1</button>
        </div>
      </div>
    );
  }
}

function App() {
  return <Counter />;
}

render(<App />);`,
    },
    {
      id: "component-did-mount",
      title: "componentDidMount for setup work",
      summary: "Simulate a mount-triggered fetch with setTimeout, resolved once the component is on screen.",
      code: `class UserCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: true, name: null };
  }

  componentDidMount() {
    // Runs once, right after this component is first inserted into the DOM.
    this.timerId = setTimeout(() => {
      this.setState({ loading: false, name: "Ada Lovelace" });
    }, 800);
  }

  componentWillUnmount() {
    clearTimeout(this.timerId);
  }

  render() {
    return (
      <div style={{ padding: 12, border: "1px solid #d1d5db", borderRadius: 6, width: 200 }}>
        {this.state.loading ? "Loading..." : \`Loaded: \${this.state.name}\`}
      </div>
    );
  }
}

function App() {
  return <UserCard />;
}

render(<App />);`,
    },
    {
      id: "class-clock-with-cleanup",
      title: "Interval + cleanup in componentWillUnmount",
      summary: "The class-component version of the interval-timer pattern: set up in componentDidMount, tear down in componentWillUnmount.",
      code: `class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = { seconds: 0 };
  }

  componentDidMount() {
    this.intervalId = setInterval(() => {
      this.setState((prev) => ({ seconds: prev.seconds + 1 }));
    }, 1000);
  }

  componentWillUnmount() {
    // Cleanup runs right before this component is removed from the DOM.
    clearInterval(this.intervalId);
  }

  render() {
    return <p>Elapsed: <strong>{this.state.seconds}s</strong></p>;
  }
}

function App() {
  const [mounted, setMounted] = useState(true);
  return (
    <div style={{ display: "grid", gap: 12, justifyItems: "start" }}>
      {mounted && <Clock />}
      <button onClick={() => setMounted((m) => !m)}>
        {mounted ? "Unmount clock" : "Mount clock"}
      </button>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "binding-this-in-handlers",
      title: "Binding this in event handlers",
      summary: "An arrow-function class property binds itself automatically; a regular method needs .bind in the constructor.",
      code: `class ToggleButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { on: false };
    // Regular methods need to be bound manually, or "this" is undefined
    // when the method is later called as a plain callback.
    this.handleClickBound = this.handleClickBound.bind(this);
  }

  // Needs the .bind(this) above to work correctly as an onClick handler.
  handleClickBound() {
    this.setState((prev) => ({ on: !prev.on }));
  }

  // An arrow function class property captures "this" lexically, no bind needed.
  handleClickArrow = () => {
    this.setState((prev) => ({ on: !prev.on }));
  };

  render() {
    return (
      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={this.handleClickBound}>Bound method: {this.state.on ? "ON" : "OFF"}</button>
        <button onClick={this.handleClickArrow}>Arrow property: {this.state.on ? "ON" : "OFF"}</button>
      </div>
    );
  }
}

function App() {
  return <ToggleButton />;
}

render(<App />);`,
    },
    {
      id: "class-vs-function-side-by-side",
      title: "Class vs. function component, side by side",
      summary: "The same counter written as a class component and as a function component with hooks.",
      code: `class ClassCounter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }

  increment = () => {
    this.setState((prev) => ({ count: prev.count + 1 }));
  };

  render() {
    return (
      <div style={{ display: "grid", gap: 6, justifyItems: "start" }}>
        <strong>Class</strong>
        <p style={{ margin: 0 }}>Count: {this.state.count}</p>
        <button onClick={this.increment}>+1</button>
      </div>
    );
  }
}

function FunctionCounter() {
  const [count, setCount] = useState(0);

  return (
    <div style={{ display: "grid", gap: 6, justifyItems: "start" }}>
      <strong>Function + hooks</strong>
      <p style={{ margin: 0 }}>Count: {count}</p>
      <button onClick={() => setCount((c) => c + 1)}>+1</button>
    </div>
  );
}

function App() {
  return (
    <div style={{ display: "flex", gap: 24 }}>
      <ClassCounter />
      <FunctionCounter />
    </div>
  );
}

render(<App />);`,
    },
  ],
};
