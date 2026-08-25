import type { Topic } from "../../types";

export const reactFirstAppTopic: Topic = {
  id: "react-first-app",
  title: "React First App",
  category: "Getting Started",
  shortExplanation: `Every React app boils down to one **entry file** that mounts a single root component into the page, and that root component is just JSX describing the UI.

- A first app usually starts as a static "Hello"
- It grows by splitting markup into **child components**
- Then adds a bit of ==state== — the same shape every larger React app eventually takes`,
  longExplanation: `A generated React project can look intimidating at first, but nearly all of it is scaffolding around one small idea.

- Somewhere there's an **entry file** (typically \`main.jsx\`) that calls \`createRoot\` on a DOM node and renders one top-level component — conventionally named **App** — into it; everything the user sees comes from that one component tree
- \`App\` is just a function that returns **JSX**: markup-like syntax that's really JavaScript, so it can freely mix plain text, embedded expressions in curly braces, and nested elements
- The first version of a "first app" is often nothing more than a heading and a paragraph — intentionally underwhelming, since the point is just to confirm the whole pipeline (bundler, JSX compilation, mounting, rendering) works end to end
- From there you split markup into smaller named components once a section of JSX starts doing its own job (a \`Header\`, a \`Greeting\`, a \`Footer\`), which is also the first practical lesson in **props**, since a parent has to pass data down to configure its children
- Then you introduce \`useState\` once the app needs to remember something between renders — like typed text or whether a panel is expanded — and see firsthand how a state change causes React to re-render

By the time a first app has a couple of components and one piece of state, it already exercises the same loop — data flows down as *props*, state changes flow up as events, and React re-renders the affected parts — that every larger React application is built on.`,
  examples: [
    {
      id: "static-hello",
      title: "Static Hello World app",
      summary: "The most minimal App component: no props, no state, just JSX.",
      code: `function App() {
  return <h1>Hello, world!</h1>;
}

render(<App />);`,
    },
    {
      id: "heading-paragraph-button",
      title: "A heading, paragraph, and button",
      summary: "A slightly fuller static app before any state is introduced.",
      code: `function App() {
  return (
    <div style={{ display: "grid", gap: 8, maxWidth: 320 }}>
      <h2 style={{ margin: 0 }}>My First React App</h2>
      <p style={{ margin: 0, color: "#4b5563" }}>
        This paragraph, the heading above, and the button below are all produced by one
        App component returning JSX.
      </p>
      <button onClick={() => alert("Hello from React!")}>Say hello</button>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "split-into-children",
      title: "Splitting App into child components",
      summary: "Extract a Header and Footer so App just composes them.",
      code: `function Header() {
  return <h2 style={{ margin: 0 }}>My Journal</h2>;
}

function Footer() {
  return <p style={{ margin: 0, fontSize: 12, color: "#9ca3af" }}>Built with React</p>;
}

function App() {
  return (
    <div style={{ display: "grid", gap: 12, maxWidth: 320 }}>
      <Header />
      <p style={{ margin: 0 }}>Today I learned that a component is just a function.</p>
      <Footer />
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "name-input-state",
      title: "Adding one piece of state",
      summary: "A name input whose value is reflected live in a greeting below it.",
      code: `function App() {
  const [name, setName] = useState("");

  return (
    <div style={{ display: "grid", gap: 10, maxWidth: 300 }}>
      <label style={{ display: "grid", gap: 4 }}>
        Your name
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Type your name" />
      </label>
      <p style={{ margin: 0 }}>
        Hello, <strong>{name || "stranger"}</strong>!
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "greeting-card",
      title: "Putting it together: a greeting card",
      summary: "Combines child components, props, and toggled state into one small app.",
      code: `function Card({ children }) {
  return (
    <div style={{ padding: 16, border: "1px solid #d1d5db", borderRadius: 8, maxWidth: 300 }}>
      {children}
    </div>
  );
}

function App() {
  const [name, setName] = useState("Ada");
  const [flipped, setFlipped] = useState(false);

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Recipient's name" />
      <Card>
        {flipped ? (
          <p style={{ margin: 0 }}>Wishing you a fantastic day, {name || "friend"}!</p>
        ) : (
          <h3 style={{ margin: 0 }}>To: {name || "friend"}</h3>
        )}
      </Card>
      <button onClick={() => setFlipped((f) => !f)}>{flipped ? "Show front" : "Open card"}</button>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
