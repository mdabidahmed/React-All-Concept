import type { Topic } from "../../types";
import { TestingPyramidDiagram } from "../../components/molecules/Diagrams/TestingPyramidDiagram";

export const whatIsTestingTopic: Topic = {
  id: "what-is-testing",
  title: "What is Testing?",
  category: "Testing",
  shortExplanation: `Testing means running your code against known inputs and checking the output matches what you expect — automatically, instead of clicking through the app by hand every time.

- The **testing pyramid**: many fast *unit* tests at the base, fewer *integration* tests in the middle, a handful of slow *end-to-end* tests at the top
- **Arrange, Act, Assert** — set up the input, run the code, check the result — is the shape of almost every test
- A **test double** (mock, stub, or spy) is a fake stand-in for a real dependency, like a fake API response instead of a real network call`,
  longExplanation: `A test is just a small program that runs another piece of your program and checks the result — but doing that automatically, on every change, catches mistakes far earlier than testing by hand ever could.

- **Unit tests** check one small piece — a single function, a single component — in complete isolation from the rest of the app. They're fast (no network, no browser) and there are usually hundreds of them
- **Integration tests** check that several pieces work correctly *together* — a form component plus the validation function it calls, for example. Fewer of these exist, since they're slower and touch more code at once
- **End-to-end (E2E) tests** drive the real, fully running app in a real browser, simulating an actual user from start to finish (log in, add an item, check out). These are the slowest and most realistic, so there are usually only a handful covering the most critical flows
- **Arrange, Act, Assert** describes the shape of most individual tests: *arrange* the starting data, *act* by calling the function or triggering the interaction, *assert* that the result matches expectations
- A **test double** stands in for something a test doesn't want to depend on — a *mock* fake API call that returns fixed data instead of hitting a real server, so the test is fast and doesn't fail because of a network issue that has nothing to do with the code being tested

The pyramid shape is a guideline, not a law: it says most confidence should come cheaply from many fast unit tests, with a smaller number of slower, broader tests catching what only shows up when real pieces interact.`,
  diagram: TestingPyramidDiagram,
  examples: [
    {
      id: "arrange-act-assert",
      title: "Arrange, Act, Assert with a tiny custom \"expect\"",
      summary: "A minimal hand-written assertion helper, run against a real function, shown as pass/fail — no library needed.",
      code: `function expect(actual) {
  return {
    toBe(expected) {
      return actual === expected;
    },
  };
}

function sum(a, b) {
  return a + b;
}

function runCheck(description, passed) {
  return { description, passed };
}

function App() {
  // Arrange
  const a = 2;
  const b = 3;

  // Act
  const result = sum(a, b);

  // Assert
  const checks = [
    runCheck("sum(2, 3) equals 5", expect(result).toBe(5)),
    runCheck("sum(2, 3) does not equal 6", !expect(result).toBe(6)),
  ];

  return (
    <ul style={{ margin: 0, paddingLeft: 18 }}>
      {checks.map((c) => (
        <li key={c.description} style={{ color: c.passed ? "#15803d" : "#b91c1c" }}>
          {c.passed ? "PASS" : "FAIL"} — {c.description}
        </li>
      ))}
    </ul>
  );
}

render(<App />);`,
    },
    {
      id: "unit-vs-integration",
      title: "A unit test vs. an integration test, side by side",
      summary: "Testing a single formatting function alone, versus testing a component that uses several functions together.",
      code: `function formatName(first, last) {
  return first + " " + last;
}

function greet(first, last) {
  return "Hello, " + formatName(first, last) + "!";
}

function Greeting({ first, last }) {
  return <p>{greet(first, last)}</p>;
}

function App() {
  // "Unit" check: formatName alone, no other code involved.
  const unitPassed = formatName("Ada", "Lovelace") === "Ada Lovelace";

  // "Integration" check: greet + formatName working together.
  const integrationPassed = greet("Ada", "Lovelace") === "Hello, Ada Lovelace!";

  return (
    <div style={{ display: "grid", gap: 8 }}>
      <p style={{ color: unitPassed ? "#15803d" : "#b91c1c" }}>
        Unit — formatName alone: {unitPassed ? "PASS" : "FAIL"}
      </p>
      <p style={{ color: integrationPassed ? "#15803d" : "#b91c1c" }}>
        Integration — greet uses formatName: {integrationPassed ? "PASS" : "FAIL"}
      </p>
      <Greeting first="Ada" last="Lovelace" />
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "test-double-stub",
      title: "A test double standing in for a real API call",
      summary: "A fake fetchUser function used instead of a real network request, so the test is fast and predictable.",
      code: `// The real version would call a server. This fake stands in for it during tests.
function fakeFetchUser(id) {
  const users = { 1: { id: 1, name: "Grace Hopper" } };
  return Promise.resolve(users[id] ?? null);
}

function useUser(id, fetchUserFn) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    fetchUserFn(id).then(setUser);
  }, [id, fetchUserFn]);
  return user;
}

function UserGreeting({ id }) {
  const user = useUser(id, fakeFetchUser);
  return <p>{user ? "Hello, " + user.name : "Loading..."}</p>;
}

function App() {
  return (
    <div style={{ display: "grid", gap: 8 }}>
      <UserGreeting id={1} />
      <small>fakeFetchUser is a test double — no real network request happens.</small>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "pyramid-ratio",
      title: "Visualizing the pyramid's test counts",
      summary: "A small interactive bar chart showing a typical ratio of unit, integration, and E2E tests in one suite.",
      code: `function Bar({ label, count, max, color }) {
  const width = Math.round((count / max) * 100);
  return (
    <div style={{ display: "grid", gap: 2 }}>
      <span style={{ fontSize: 13 }}>{label}: {count}</span>
      <div style={{ background: "#e5e7eb", borderRadius: 4, height: 14 }}>
        <div style={{ width: width + "%", background: color, height: "100%", borderRadius: 4 }} />
      </div>
    </div>
  );
}

function App() {
  const counts = { unit: 120, integration: 30, e2e: 6 };
  const max = counts.unit;

  return (
    <div style={{ display: "grid", gap: 10, maxWidth: 300 }}>
      <Bar label="Unit tests" count={counts.unit} max={max} color="#0d9488" />
      <Bar label="Integration tests" count={counts.integration} max={max} color="#0f766e" />
      <Bar label="E2E tests" count={counts.e2e} max={max} color="#134e4a" />
    </div>
  );
}

render(<App />);`,
    },
  ],
};
