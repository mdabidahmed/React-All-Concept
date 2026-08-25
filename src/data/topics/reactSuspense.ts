import type { Topic } from "../../types";
import { ReactSuspenseDiagram } from "../../components/molecules/Diagrams/ReactSuspenseDiagram";

export const reactSuspenseTopic: Topic = {
  id: "react-suspense",
  title: "React Suspense",
  category: "Advanced",
  shortExplanation: `\`<Suspense fallback={...}>\` lets part of the tree =="wait"== for something async — typically \`React.lazy()\` code or a Suspense-integrated data source — instead of manual \`isLoading\` flags scattered across components.

- A component signals *"not ready yet"* by throwing a **promise** during render
- The nearest \`Suspense\` boundary catches it, shows the \`fallback\`, and retries once it resolves
- \`React.lazy(() => import(...))\` is the most common built-in producer of this pattern`,
  longExplanation: `Suspense inverts the usual approach to loading states: instead of every component tracking its own \`isLoading\` boolean and conditionally rendering a spinner, a component simply *throws* while rendering if its data isn't ready yet, and the nearest ancestor \`<Suspense fallback={...}>\` catches that thrown value, shows the fallback, and automatically retries rendering the subtree once the thing it threw resolves.

- \`React.lazy(() => import(...))\` is the most common producer of this pattern, since a dynamically-imported chunk isn't available synchronously — but the same mechanism underlies any Suspense-compatible data-fetching library
- A Suspense-integrated resource internally throws a **pending promise** from a \`read()\`-style call the first time data is requested, then throws the resolved value or the error on later renders once it settles — Suspense doesn't know anything about promises specifically, it only reacts to a thrown value with a \`.then\` method
- One boundary can wrap several independent resources: a single \`Suspense\` around multiple children shows one fallback until *everything* inside is ready, while nested boundaries let each subtree reveal itself independently
- \`Suspense\` is **not** an error boundary — a rejected resource's thrown error must be caught by an actual class-based error boundary (\`componentDidCatch\` / \`static getDerivedStateFromError\`) placed around it, not by the fallback itself
- "Retry" is just re-creating the resource: a fresh pending promise makes the boundary ==suspend== again, which is how retry/refetch buttons are typically implemented on top of this pattern`,
  diagram: ReactSuspenseDiagram,
  examples: [
    {
      id: "basic-suspense-resource",
      title: "Basic Suspense with one resource",
      summary: "A resource that throws a pending promise shows the fallback until it resolves.",
      code: `function createResource(promise) {
  let status = "pending";
  let result;
  const suspender = promise.then(
    (data) => { status = "success"; result = data; },
    (error) => { status = "error"; result = error; }
  );
  return {
    read() {
      if (status === "pending") throw suspender;
      if (status === "error") throw result;
      return result;
    },
  };
}

const greetingResource = createResource(
  new Promise((resolve) => setTimeout(() => resolve("Hello from the resolved data!"), 1500))
);

function Greeting() {
  const message = greetingResource.read();
  return <p>{message}</p>;
}

function App() {
  return (
    <React.Suspense fallback={<p>Loading greeting...</p>}>
      <Greeting />
    </React.Suspense>
  );
}

render(<App />);`,
    },
    {
      id: "sibling-resources-different-delays",
      title: "Sibling resources with different delays",
      summary: "One shared Suspense boundary waits for the slowest of two sibling resources.",
      code: `function createResource(promise) {
  let status = "pending";
  let result;
  const suspender = promise.then(
    (data) => { status = "success"; result = data; },
    (error) => { status = "error"; result = error; }
  );
  return {
    read() {
      if (status === "pending") throw suspender;
      if (status === "error") throw result;
      return result;
    },
  };
}

const fastResource = createResource(
  new Promise((resolve) => setTimeout(() => resolve("Fast data (500ms)"), 500))
);
const slowResource = createResource(
  new Promise((resolve) => setTimeout(() => resolve("Slow data (2000ms)"), 2000))
);

function Fast() {
  return <p>{fastResource.read()}</p>;
}

function Slow() {
  return <p>{slowResource.read()}</p>;
}

function App() {
  return (
    <div style={{ display: "grid", gap: 10 }}>
      <p>A single boundary wrapping both means the fallback stays until the SLOWEST child is ready:</p>
      <React.Suspense fallback={<p>Loading both...</p>}>
        <Fast />
        <Slow />
      </React.Suspense>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "retry-resuspend",
      title: "Retry button re-suspends",
      summary: "Creating a fresh resource causes the boundary to suspend again.",
      code: `function createResource(promise) {
  let status = "pending";
  let result;
  const suspender = promise.then(
    (data) => { status = "success"; result = data; },
    (error) => { status = "error"; result = error; }
  );
  return {
    read() {
      if (status === "pending") throw suspender;
      if (status === "error") throw result;
      return result;
    },
  };
}

function fetchRandomFact() {
  const facts = ["Octopuses have three hearts.", "Bananas are berries.", "Honey never spoils."];
  const pick = facts[Math.floor(Math.random() * facts.length)];
  return new Promise((resolve) => setTimeout(() => resolve(pick), 1200));
}

function Fact({ resource }) {
  return <p>{resource.read()}</p>;
}

function App() {
  const [resource, setResource] = useState(() => createResource(fetchRandomFact()));

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <React.Suspense fallback={<p>Fetching a fact...</p>}>
        <Fact resource={resource} />
      </React.Suspense>
      <button onClick={() => setResource(createResource(fetchRandomFact()))}>
        Get another fact
      </button>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "suspense-plus-error-boundary",
      title: "Suspense does not catch errors",
      summary: "Pair Suspense with a class-based error boundary for rejected resources.",
      code: `function createResource(promise) {
  let status = "pending";
  let result;
  const suspender = promise.then(
    (data) => { status = "success"; result = data; },
    (error) => { status = "error"; result = error; }
  );
  return {
    read() {
      if (status === "pending") throw suspender;
      if (status === "error") throw result;
      return result;
    },
  };
}

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }
  static getDerivedStateFromError(error) {
    return { error };
  }
  render() {
    if (this.state.error) {
      return <p style={{ color: "#b91c1c" }}>Caught by the error boundary: {String(this.state.error.message || this.state.error)}</p>;
    }
    return this.props.children;
  }
}

const failingResource = createResource(
  new Promise((resolve, reject) => setTimeout(() => reject(new Error("Failed to load data")), 1000))
);

function Risky() {
  const data = failingResource.read();
  return <p>{data}</p>;
}

function App() {
  return (
    <div style={{ display: "grid", gap: 10 }}>
      <small style={{ color: "#6b7280" }}>
        Note: Suspense only handles the "loading" state. Errors must be caught by a real error boundary.
      </small>
      <ErrorBoundary>
        <React.Suspense fallback={<p>Loading...</p>}>
          <Risky />
        </React.Suspense>
      </ErrorBoundary>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "nested-suspense",
      title: "Nested Suspense boundaries",
      summary: "An inner boundary reveals its own content independently of the outer one.",
      code: `function createResource(promise) {
  let status = "pending";
  let result;
  const suspender = promise.then(
    (data) => { status = "success"; result = data; },
    (error) => { status = "error"; result = error; }
  );
  return {
    read() {
      if (status === "pending") throw suspender;
      if (status === "error") throw result;
      return result;
    },
  };
}

const outerResource = createResource(
  new Promise((resolve) => setTimeout(() => resolve("Outer content ready"), 700))
);
const innerResource = createResource(
  new Promise((resolve) => setTimeout(() => resolve("Inner content ready"), 2200))
);

function Outer() {
  const text = outerResource.read();
  return (
    <div style={{ display: "grid", gap: 8 }}>
      <p>{text}</p>
      <React.Suspense fallback={<p>Loading inner section...</p>}>
        <Inner />
      </React.Suspense>
    </div>
  );
}

function Inner() {
  const text = innerResource.read();
  return <p>{text}</p>;
}

function App() {
  return (
    <React.Suspense fallback={<p>Loading outer section...</p>}>
      <Outer />
    </React.Suspense>
  );
}

render(<App />);`,
    },
  ],
};
