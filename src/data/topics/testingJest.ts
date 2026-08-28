import type { Topic } from "../../types";
import { JestDiagram } from "../../components/molecules/Diagrams/JestDiagram";

export const testingJestTopic: Topic = {
  id: "testing-jest",
  title: "Testing with Jest",
  category: "Testing",
  shortExplanation: `**Jest** is an all-in-one JavaScript testing framework — a test runner, assertion library, and mocking tool bundled together, so a project needs no extra packages to start writing tests.

- \`describe\` groups related tests; \`test\` (or \`it\`) checks one behavior; \`expect(...).toBe(...)\` asserts a result
- Common matchers: \`toBe\`, \`toEqual\`, \`toContain\`, \`toHaveBeenCalled\`
- \`jest.fn()\` creates a **mock function** that records every call made to it
- **Snapshot tests** save a rendered output once, then fail if it unexpectedly changes later`,
  longExplanation: `Jest is the most widely used React testing framework specifically because it ships everything needed to start: a test runner (finds and executes test files), an assertion library (\`expect\`), and mocking utilities — no separate packages required.

- A test file is structured as \`describe("group name", () => { test("does one specific thing", () => { ... }); })\` — \`describe\` is just an organizational grouping, and each \`test\` (aliased as \`it\`) should check one behavior
- Inside a test, \`expect(actual).toBe(expected)\` is the most common assertion; \`toEqual\` compares objects/arrays by value instead of by reference, \`toContain\` checks an array or string for an item, and \`toHaveBeenCalled\`/\`toHaveBeenCalledWith(...)\` check whether a mock function was called, and with what arguments
- \`jest.fn()\` creates a mock function — pass it anywhere a real function is expected (an \`onClick\` handler, a callback prop) and Jest records every call, letting a test assert the handler *was* called, and with the right arguments, without needing real behavior behind it
- **Snapshot testing** renders a component once, saves the output to a file, and on every future test run compares the new output against the saved one — flagging anything that changed so a developer can confirm the change was intentional

This sandbox can't run a real Jest process — there's no test runner watching files here, and \`describe\`/\`test\`/\`expect\` aren't available as globals. The examples below ==simulate== the same ideas by hand: real Jest-style syntax shown as text, paired with a small script that computes the same checks directly and displays pass/fail, so the mental model transfers directly to a real Jest setup.`,
  diagram: JestDiagram,
  examples: [
    {
      id: "simulated-jest-file",
      title: "A simulated Jest test file and runner",
      summary: "Real Jest syntax shown as a test file, with a \"Run tests\" button computing the same checks by hand.",
      code: `function sum(a, b) {
  return a + b;
}

const testFileSource = \`describe("sum", () => {
  test("adds 1 + 2 to equal 3", () => {
    expect(sum(1, 2)).toBe(3);
  });

  test("adds negative numbers", () => {
    expect(sum(-1, -2)).toBe(-3);
  });
});\`;

function App() {
  const [results, setResults] = useState(null);

  function runTests() {
    setResults([
      { name: "adds 1 + 2 to equal 3", passed: sum(1, 2) === 3 },
      { name: "adds negative numbers", passed: sum(-1, -2) === -3 },
    ]);
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <pre style={{ background: "#0f172a", color: "#e2e8f0", padding: 12, borderRadius: 6, fontSize: 12, overflow: "auto" }}>
        {testFileSource}
      </pre>
      <button onClick={runTests}>Run tests</button>
      {results && (
        <ul style={{ margin: 0, paddingLeft: 18 }}>
          {results.map((r) => (
            <li key={r.name} style={{ color: r.passed ? "#15803d" : "#b91c1c" }}>
              {r.passed ? "PASS" : "FAIL"} — {r.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "simulated-jest-fn",
      title: "jest.fn() — simulating a mock function",
      summary: "A hand-built mock function that tracks its calls, mimicking jest.fn()'s toHaveBeenCalledWith.",
      code: `function createMockFn() {
  const calls = [];
  function mock(...args) {
    calls.push(args);
  }
  mock.calls = calls;
  mock.toHaveBeenCalledWith = (...expected) =>
    calls.some((call) => JSON.stringify(call) === JSON.stringify(expected));
  return mock;
}

function Form({ onSubmit }) {
  const [value, setValue] = useState("");
  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(value); }}>
      <input value={value} onChange={(e) => setValue(e.target.value)} placeholder="Type and submit" />
      <button type="submit">Submit</button>
    </form>
  );
}

function App() {
  const onSubmit = createMockFn();
  const [checked, setChecked] = useState(null);

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <Form onSubmit={onSubmit} />
      <button onClick={() => setChecked(onSubmit.toHaveBeenCalledWith("hello"))}>
        Check: was onSubmit called with "hello"?
      </button>
      {checked !== null && (
        <p style={{ color: checked ? "#15803d" : "#b91c1c" }}>{checked ? "PASS" : "FAIL"}</p>
      )}
      <small>Type "hello" and submit, then check — this is what jest.fn() tracks for you automatically.</small>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "matchers-cheatsheet",
      title: "Common matchers, checked live",
      summary: "toBe, toEqual, and toContain implemented by hand and run against real values.",
      code: `function toBe(actual, expected) {
  return actual === expected;
}

function toEqual(actual, expected) {
  return JSON.stringify(actual) === JSON.stringify(expected);
}

function toContain(array, item) {
  return array.includes(item);
}

function App() {
  const checks = [
    { name: 'toBe: 2 + 2 === 4', passed: toBe(2 + 2, 4) },
    { name: "toEqual: {a:1} deep-equals {a:1}", passed: toEqual({ a: 1 }, { a: 1 }) },
    { name: 'toContain: ["a","b"] contains "b"', passed: toContain(["a", "b"], "b") },
  ];

  return (
    <ul style={{ margin: 0, paddingLeft: 18 }}>
      {checks.map((c) => (
        <li key={c.name} style={{ color: c.passed ? "#15803d" : "#b91c1c" }}>
          {c.passed ? "PASS" : "FAIL"} — {c.name}
        </li>
      ))}
    </ul>
  );
}

render(<App />);`,
    },
    {
      id: "simulated-snapshot",
      title: "Snapshot testing, simulated",
      summary: "Saving a rendered string once, then comparing future renders against it and flagging changes.",
      code: `function renderGreeting(name) {
  return "<p>Hello, " + name + "!</p>";
}

function App() {
  const [savedSnapshot, setSavedSnapshot] = useState(null);
  const [currentName, setCurrentName] = useState("Ada");

  const currentOutput = renderGreeting(currentName);
  const matches = savedSnapshot === null || savedSnapshot === currentOutput;

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <input value={currentName} onChange={(e) => setCurrentName(e.target.value)} />
      <pre style={{ background: "#f1f5f9", padding: 8, borderRadius: 6, fontSize: 12 }}>{currentOutput}</pre>
      <button onClick={() => setSavedSnapshot(currentOutput)}>Save snapshot</button>
      {savedSnapshot !== null && (
        <p style={{ color: matches ? "#15803d" : "#b91c1c" }}>
          {matches ? "Matches saved snapshot" : "Snapshot mismatch — output changed since it was saved"}
        </p>
      )}
    </div>
  );
}

render(<App />);`,
    },
  ],
};
