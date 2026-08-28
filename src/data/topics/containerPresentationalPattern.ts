import type { Topic } from "../../types";
import { ContainerPatternDiagram } from "../../components/molecules/Diagrams/ContainerPatternDiagram";

export const containerPresentationalPatternTopic: Topic = {
  id: "container-presentational-pattern",
  title: "Container / Presentational Pattern",
  category: "Advanced Patterns",
  shortExplanation: `The **container / presentational pattern** splits a feature into two kinds of components: a *container* that owns state and logic, and a *presentational* component that only renders UI from the props it's given.

- Container: fetches data, holds state, decides *how it works*
- Presentational: receives plain props, holds no state of its own, decides *how it looks*
- The presentational half is easy to reuse and test in isolation, since it has no logic to mock
- Hooks blur the line — a **custom hook** often plays the container's role today, paired with a purely presentational component`,
  longExplanation: `In this pattern, a feature is deliberately split in two: a *container* component that owns the "how it works" — state, data fetching, event handlers — and a *presentational* component that owns the "how it looks", rendering markup purely from the props it receives, with no state or logic of its own.

- \`UserListContainer\` might fetch a list of users and hold a \`loading\` flag, then pass \`users\` and \`loading\` down as plain props to \`UserList\`, which just maps over \`users\` and renders \`<li>\` elements
- Because \`UserList\` has no internal state or side effects, it's trivial to render in isolation (Storybook, tests, a style guide) with any props you like — no mocking a data-fetch or a store is required
- The same presentational component can be reused by a completely different container — a \`SearchResultsContainer\` could reuse \`UserList\` for a filtered subset, with no changes to \`UserList\` itself
- This pattern predates hooks, when there was no lightweight way to share stateful logic other than a component. A **custom hook** — \`const { users, loading } = useUsers()\` — now often plays the container's role directly inside a component that also renders the UI, without needing a literal wrapper "container" component
- The underlying principle — *separate what a piece of UI needs from how it's drawn* — still holds even when a hook replaces the literal container component

Recognize this pattern's shape when reading it in older code or discussions; in new code, a custom hook plus a presentational component usually achieves the same separation with one fewer component in the tree.`,
  diagram: ContainerPatternDiagram,
  examples: [
    {
      id: "classic-split",
      title: "A classic container / presentational split",
      summary: "UserListContainer owns the data; UserList only renders it.",
      code: `const ALL_USERS = ["Ada Lovelace", "Grace Hopper", "Margaret Hamilton"];

function UserList({ users, loading }) {
  if (loading) return <p>Loading users...</p>;
  return (
    <ul style={{ margin: 0, paddingLeft: 18 }}>
      {users.map((name) => (
        <li key={name}>{name}</li>
      ))}
    </ul>
  );
}

function UserListContainer() {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setUsers(ALL_USERS);
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  return <UserList users={users} loading={loading} />;
}

render(<UserListContainer />);`,
    },
    {
      id: "presentational-reuse",
      title: "Reusing the presentational half with a different container",
      summary: "The same UserList component, fed by two different containers with different data sources.",
      code: `function UserList({ users }) {
  return (
    <ul style={{ margin: 0, paddingLeft: 18 }}>
      {users.map((name) => (
        <li key={name}>{name}</li>
      ))}
    </ul>
  );
}

function AllUsersContainer() {
  const users = ["Ada Lovelace", "Grace Hopper", "Margaret Hamilton"];
  return <UserList users={users} />;
}

function SearchResultsContainer({ query }) {
  const all = ["Ada Lovelace", "Grace Hopper", "Margaret Hamilton"];
  const filtered = all.filter((n) => n.toLowerCase().includes(query.toLowerCase()));
  return <UserList users={filtered} />;
}

function App() {
  const [query, setQuery] = useState("a");
  return (
    <div style={{ display: "grid", gap: 12 }}>
      <div>
        <p style={{ fontWeight: 600, margin: "0 0 4px" }}>All users:</p>
        <AllUsersContainer />
      </div>
      <div>
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search..." />
        <SearchResultsContainer query={query} />
      </div>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "presentational-storybook-style",
      title: "Testing the presentational half in isolation",
      summary: "UserList rendered directly with hand-written props — no container, no data fetching needed.",
      code: `function UserList({ users, loading, emptyText }) {
  if (loading) return <p style={{ color: "#6b7280" }}>Loading...</p>;
  if (users.length === 0) return <p style={{ color: "#6b7280" }}>{emptyText}</p>;
  return (
    <ul style={{ margin: 0, paddingLeft: 18 }}>
      {users.map((name) => (
        <li key={name}>{name}</li>
      ))}
    </ul>
  );
}

function App() {
  return (
    <div style={{ display: "grid", gap: 16 }}>
      <div>
        <p style={{ fontWeight: 600, margin: "0 0 4px" }}>Loading state:</p>
        <UserList users={[]} loading={true} emptyText="No users" />
      </div>
      <div>
        <p style={{ fontWeight: 600, margin: "0 0 4px" }}>Empty state:</p>
        <UserList users={[]} loading={false} emptyText="No users found" />
      </div>
      <div>
        <p style={{ fontWeight: 600, margin: "0 0 4px" }}>Populated state:</p>
        <UserList users={["Ada", "Grace"]} loading={false} emptyText="No users" />
      </div>
      <small>No container needed to exercise every state of UserList.</small>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "hook-as-container",
      title: "A custom hook playing the container's role",
      summary: "useUsers() replaces UserListContainer — the same separation, one fewer component.",
      code: `function useUsers() {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setUsers(["Ada Lovelace", "Grace Hopper"]);
      setLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  return { users, loading };
}

function UserList({ users, loading }) {
  if (loading) return <p>Loading users...</p>;
  return (
    <ul style={{ margin: 0, paddingLeft: 18 }}>
      {users.map((name) => (
        <li key={name}>{name}</li>
      ))}
    </ul>
  );
}

function UsersPage() {
  const { users, loading } = useUsers();
  return <UserList users={users} loading={loading} />;
}

render(<UsersPage />);`,
    },
  ],
};
