import type { Topic } from "../../types";
import { MochaDiagram } from "../../components/molecules/Diagrams/MochaDiagram";

export const testingMochaTopic: Topic = {
  id: "testing-mocha",
  title: "Testing with Mocha",
  category: "Testing",
  shortExplanation: `**Mocha** is a flexible JavaScript test runner — unlike Jest, it doesn't ship an assertion library or mocking tools, so it's paired with separate packages to do those jobs.

- Mocha predates Jest, and popularized the \`describe\`/\`it\` structure Jest later adopted
- **Chai** is the most common assertion library paired with Mocha — \`expect(x).to.equal(y)\`
- **Sinon** provides mocking, spies, and stubs, filling in what Jest bundles for free
- The tradeoff: Mocha's "bring your own tools" flexibility vs. Jest's all-in-one convenience`,
  longExplanation: `Mocha is only a test runner: it discovers test files and runs \`describe\`/\`it\` blocks, reporting which passed and which failed. It deliberately doesn't include assertions or mocking, leaving those choices to the project.

- Because Mocha has no built-in \`expect\`, a project typically adds **Chai**, whose assertions read in a sentence-like style: \`expect(sum(1, 2)).to.equal(3)\`, or the alternative \`should\`-style: \`sum(1, 2).should.equal(3)\`. This is functionally similar to Jest's \`expect(sum(1, 2)).toBe(3)\`, just with different chained syntax
- For mocking functions and tracking calls — what \`jest.fn()\` gives for free — a Mocha project typically adds **Sinon**, which provides spies (track calls to a real function), stubs (replace a function's behavior), and mocks (spies with built-in expectations)
- The \`describe\`/\`it\` structure itself looks nearly identical between the two tools — Mocha established this BDD-style shape first, and Jest deliberately kept it for familiarity when it came along later
- The real tradeoff is **flexibility vs. convenience**: Mocha lets a team pick exactly the assertion and mocking libraries they prefer (or swap them later), while Jest's bundled choices mean less setup decision-making but less room to substitute a different assertion style

Like the Jest and Cypress examples, this sandbox can't run a real Mocha process or import Chai/Sinon — the examples below ==simulate== the same ideas, showing real Mocha + Chai syntax as text alongside hand-computed checks that mirror what those libraries would report.`,
  diagram: MochaDiagram,
  examples: [
    {
      id: "simulated-mocha-chai-file",
      title: "A simulated Mocha + Chai test file",
      summary: "Real Mocha/Chai syntax shown as text, with a \"Run tests\" button computing the same checks by hand.",
      code: `function multiply(a, b) {
  return a * b;
}

const testFileSource = \`describe("multiply", function () {
  it("multiplies two positive numbers", function () {
    expect(multiply(3, 4)).to.equal(12);
  });

  it("multiplies by zero", function () {
    expect(multiply(5, 0)).to.equal(0);
  });
});\`;

function App() {
  const [results, setResults] = useState(null);

  function runTests() {
    setResults([
      { name: "multiplies two positive numbers", passed: multiply(3, 4) === 12 },
      { name: "multiplies by zero", passed: multiply(5, 0) === 0 },
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
      id: "chai-vs-jest-syntax",
      title: "Chai's expect().to.equal() vs. Jest's expect().toBe()",
      summary: "The same assertion written in both styles, both computed and checked live.",
      code: `function add(a, b) {
  return a + b;
}

// Chai style (used with Mocha): expect(add(2, 3)).to.equal(5)
function chaiStyleCheck(actual) {
  return { to: { equal: (expected) => actual === expected } };
}

// Jest style: expect(add(2, 3)).toBe(5)
function jestStyleCheck(actual) {
  return { toBe: (expected) => actual === expected };
}

function App() {
  const result = add(2, 3);
  const chaiPassed = chaiStyleCheck(result).to.equal(5);
  const jestPassed = jestStyleCheck(result).toBe(5);

  return (
    <div style={{ display: "grid", gap: 8 }}>
      <p>Chai style — expect(result).to.equal(5): {chaiPassed ? "PASS" : "FAIL"}</p>
      <p>Jest style — expect(result).toBe(5): {jestPassed ? "PASS" : "FAIL"}</p>
      <small>Different chained syntax, same underlying comparison.</small>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "sinon-spy-simulation",
      title: "A Sinon-style spy, simulated",
      summary: "A hand-built spy that wraps a real function and records how many times it was called.",
      code: `function createSpy(realFn) {
  const spy = (...args) => {
    spy.callCount += 1;
    return realFn(...args);
  };
  spy.callCount = 0;
  return spy;
}

function sendWelcomeEmail(name) {
  return "Welcome email sent to " + name;
}

function App() {
  const [log, setLog] = useState([]);
  const spy = useState(() => createSpy(sendWelcomeEmail))[0];

  function signUp(name) {
    const result = spy(name);
    setLog((prev) => [...prev, result]);
  }

  return (
    <div style={{ display: "grid", gap: 8 }}>
      <button onClick={() => signUp("Ada")}>Sign up "Ada"</button>
      <button onClick={() => signUp("Grace")}>Sign up "Grace"</button>
      <p>spy.callCount: {spy.callCount}</p>
      <ul style={{ margin: 0, paddingLeft: 18 }}>
        {log.map((entry, i) => <li key={i}>{entry}</li>)}
      </ul>
      <small>Sinon's real spy() works the same way — wrapping a function to count and inspect its calls.</small>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "nested-describe-it",
      title: "Nested describe/it blocks for multiple scenarios",
      summary: "Grouping several related checks under nested describe blocks, computed and reported together.",
      code: `function isValidPassword(pw) {
  return pw.length >= 8 && /[0-9]/.test(pw);
}

const testFileSource = \`describe("isValidPassword", function () {
  describe("when password is too short", function () {
    it("returns false", function () {
      expect(isValidPassword("abc1")).to.equal(false);
    });
  });

  describe("when password has no digit", function () {
    it("returns false", function () {
      expect(isValidPassword("abcdefgh")).to.equal(false);
    });
  });

  describe("when password is valid", function () {
    it("returns true", function () {
      expect(isValidPassword("abcdefg1")).to.equal(true);
    });
  });
});\`;

function App() {
  const results = [
    { name: "too short -> false", passed: isValidPassword("abc1") === false },
    { name: "no digit -> false", passed: isValidPassword("abcdefgh") === false },
    { name: "valid -> true", passed: isValidPassword("abcdefg1") === true },
  ];

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <pre style={{ background: "#0f172a", color: "#e2e8f0", padding: 12, borderRadius: 6, fontSize: 11, overflow: "auto" }}>
        {testFileSource}
      </pre>
      <ul style={{ margin: 0, paddingLeft: 18 }}>
        {results.map((r) => (
          <li key={r.name} style={{ color: r.passed ? "#15803d" : "#b91c1c" }}>
            {r.passed ? "PASS" : "FAIL"} — {r.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
