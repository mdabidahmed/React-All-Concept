import type { Topic } from "../../types";
import { ReactRouterDiagram } from "../../components/molecules/Diagrams/ReactRouterDiagram";

export const reactRouterTopic: Topic = {
  id: "react-router",
  title: "React Router",
  category: "Routing & Motion",
  shortExplanation: `\`react-router-dom\` is the standard **client-side routing** library for React single-page apps.

- \`BrowserRouter\` wraps the app, and \`Routes\`/\`Route\` map URL paths to components
- \`Link\` navigates without a full page reload
- The URL stays in sync with what's on screen, so pages are ==bookmarkable== and back/forward work`,
  longExplanation: `In a real project, \`react-router-dom\` wires your component tree to the browser's URL. A top-level \`<BrowserRouter>\` (or \`<HashRouter>\`/\`<MemoryRouter>\` depending on the environment) provides routing context, \`<Routes>\` contains one or more \`<Route path="/about" element={<About />} />\` entries that each map a URL path to the component rendered there, and \`<Link to="/about">\` renders a real anchor tag but *intercepts* the click to update the URL via the History API instead of triggering a full page reload — so React can swap components instantly while the address bar and browser history stay accurate.

- Dynamic segments in a path (e.g. \`/users/:id\`) are read inside the matched component with the \`useParams\` hook
- \`useNavigate\` gives an *imperative* way to change routes from code — after a form submits, after an action completes — rather than from a rendered link
- **Layout routes** let a persistent shell (header, sidebar, nav) wrap a swappable page area via nested routes and an \`<Outlet />\`

This sandbox has no real address bar to navigate and no external package to import, so these examples ==simulate== the same mental model by hand: a \`useState\` holding the "current path" as a plain string, a plain object mapping path strings to the component that should render, and clickable elements that call \`setPath(...)\` instead of a real \`<Link>\`/\`history.pushState\`. The simulation preserves the concepts — a route table, an active route, param-like data, nested layouts, and programmatic navigation — so the patterns transfer directly once you swap in the real library and a real \`<BrowserRouter>\` in an actual project.`,
  diagram: ReactRouterDiagram,
  examples: [
    {
      id: "basic-three-page-nav",
      title: "Basic 3-page navigation",
      summary: "A simulated router with Home/About/Contact pages switched via state instead of real URLs.",
      code: `function Home() { return <p>Welcome to the Home page.</p>; }
function About() { return <p>This app teaches React concepts.</p>; }
function Contact() { return <p>Reach us at hello@example.com.</p>; }

const routes = { home: Home, about: About, contact: Contact };

function App() {
  const [path, setPath] = useState("home");
  const Page = routes[path];

  return (
    <div style={{ display: "grid", gap: 12, maxWidth: 320 }}>
      <nav style={{ display: "flex", gap: 8 }}>
        {Object.keys(routes).map((key) => (
          <button key={key} onClick={() => setPath(key)}>{key}</button>
        ))}
      </nav>
      <div style={{ border: "1px solid #d1d5db", borderRadius: 6, padding: 12 }}>
        <Page />
      </div>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "simulated-route-param",
      title: "Simulated route params",
      summary: "Clicking a list item navigates to a detail view, standing in for useParams reading /items/:id.",
      code: `const items = [
  { id: 1, name: "Notebook" },
  { id: 2, name: "Pencil" },
  { id: 3, name: "Backpack" },
];

function ItemList({ onSelect }) {
  return (
    <ul style={{ margin: 0, paddingLeft: 18 }}>
      {items.map((item) => (
        <li key={item.id}>
          <button onClick={() => onSelect(item.id)} style={{ background: "none", border: "none", color: "#2563eb", cursor: "pointer", padding: 0 }}>
            {item.name}
          </button>
        </li>
      ))}
    </ul>
  );
}

function ItemDetail({ id, onBack }) {
  const item = items.find((i) => i.id === id);
  return (
    <div style={{ display: "grid", gap: 8 }}>
      <p>Detail for item id: <strong>{id}</strong> ({item.name})</p>
      <button onClick={onBack}>Back to list</button>
    </div>
  );
}

function App() {
  const [selectedId, setSelectedId] = useState(null);

  return (
    <div style={{ maxWidth: 280 }}>
      {selectedId === null
        ? <ItemList onSelect={setSelectedId} />
        : <ItemDetail id={selectedId} onBack={() => setSelectedId(null)} />}
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "active-link-style",
      title: "Active link styling",
      summary: "The simulated nav highlights whichever route is currently active.",
      code: `const pages = ["dashboard", "reports", "settings"];

function App() {
  const [path, setPath] = useState("dashboard");

  return (
    <div style={{ display: "grid", gap: 12, maxWidth: 300 }}>
      <nav style={{ display: "flex", gap: 6 }}>
        {pages.map((p) => (
          <button
            key={p}
            onClick={() => setPath(p)}
            style={{
              padding: "6px 12px",
              borderRadius: 6,
              border: "1px solid " + (p === path ? "#2563eb" : "#d1d5db"),
              background: p === path ? "#2563eb" : "white",
              color: p === path ? "white" : "#111827",
              cursor: "pointer",
            }}
          >
            {p}
          </button>
        ))}
      </nav>
      <p>Current route: <strong>/{path}</strong></p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "nested-layout",
      title: "Nested layout route",
      summary: "A persistent header stays mounted around a swappable page area, simulating a layout route with Outlet.",
      code: `function Header({ path, setPath }) {
  return (
    <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 12px", background: "#111827", color: "white", borderRadius: "6px 6px 0 0" }}>
      <strong>MyApp</strong>
      <div style={{ display: "flex", gap: 8 }}>
        {["feed", "profile"].map((p) => (
          <button key={p} onClick={() => setPath(p)} style={{ background: "none", border: "none", color: "white", cursor: "pointer" }}>
            {p}
          </button>
        ))}
      </div>
    </header>
  );
}

function Feed() { return <p>Your feed goes here.</p>; }
function Profile() { return <p>Your profile goes here.</p>; }

function App() {
  const [path, setPath] = useState("feed");
  const Page = path === "feed" ? Feed : Profile;

  return (
    <div style={{ border: "1px solid #d1d5db", borderRadius: 6, maxWidth: 320 }}>
      <Header path={path} setPath={setPath} />
      <div style={{ padding: 12 }}>
        <Page />
      </div>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "programmatic-navigation",
      title: "Programmatic navigation",
      summary: "Submitting a form switches the simulated route, standing in for useNavigate after an action.",
      code: `function LoginForm({ onLoggedIn }) {
  const [username, setUsername] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (username.trim()) onLoggedIn(username);
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "grid", gap: 8, maxWidth: 240 }}>
      <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
      <button type="submit">Log in</button>
    </form>
  );
}

function Welcome({ username }) {
  return <p>Welcome back, <strong>{username}</strong>! Redirected after submit.</p>;
}

function App() {
  const [path, setPath] = useState("login");
  const [username, setUsername] = useState("");

  function handleLoggedIn(name) {
    setUsername(name);
    setPath("welcome");
  }

  return (
    <div style={{ maxWidth: 280 }}>
      {path === "login"
        ? <LoginForm onLoggedIn={handleLoggedIn} />
        : <Welcome username={username} />}
    </div>
  );
}

render(<App />);`,
    },
  ],
};
