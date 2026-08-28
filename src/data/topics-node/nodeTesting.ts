import type { Topic } from "../../types";

export const nodeTestingTopic: Topic = {
  id: "node-testing",
  title: "Node.js Testing",
  category: "Databases & Advanced",
  shortExplanation: `**Jest** and **Mocha** — already covered in depth in this app's React "Testing" category — aren't browser-specific tools at all; they're general-purpose JavaScript test runners, and they work exactly the same way for server-side Node.js code.

- Same shape everywhere: \`describe(...)\`/\`it(...)\` groups tests, and an assertion (\`expect(actual).toBe(expected)\`) checks a result
- What's different on the server: there's no DOM to render or click — instead, tests typically **mock a database or an outgoing network call**, and assert on an **API endpoint's response** (status code, body) rather than rendered elements
- Mocking keeps tests fast, deterministic, and independent of whether a real database or external service happens to be up at the moment`,
  longExplanation: `If you've worked through this app's React "Testing" category, there's genuinely very little new to learn here conceptually — Jest and Mocha (and newer tools like Vitest) are **general-purpose JavaScript test runners**, with nothing about them tied to browsers or React specifically. The same \`describe("a group of related tests", () => { ... })\`, \`it("does one specific thing", () => { ... })\`, and \`expect(actual).toBe(expected)\`-style assertions apply identically whether the code under test renders a button or handles a database query — the tooling doesn't care which.

**What genuinely differs is *what* gets tested and *what* gets mocked.** A React component test typically renders something and asserts on the resulting DOM. Server-side Node.js code has no DOM at all — there's nothing to render or click. Instead, two patterns dominate:

- **Mocking a database or network dependency.** A function that queries a real database, or calls a real external API, makes a test slow, flaky (dependent on that service actually being reachable right now), and hard to make deterministic (real data changes over time). The standard fix is a **mock** — a fake stand-in for the dependency that returns fixed, predictable data instead of performing the real I/O. Testing frameworks provide utilities for this (Jest's \`jest.fn()\` and module mocking, for instance), but the underlying idea is simple: swap the real dependency for a fake one that behaves predictably, so the test is checking *your* logic, not whether a real database happened to respond correctly just now.
- **Testing an API endpoint's response.** Rather than clicking a button and checking the resulting DOM, a server-side test sends a simulated HTTP request into the app and asserts on what comes back — the status code, and the response body. Real-world Node.js testing commonly uses a tool like **Supertest** specifically for this: it lets a test send a request directly to an Express \`app\` object (the same \`app\` covered throughout this subject's Express.js category) without needing a real network socket or an actual running server bound to a port, then assert on the resulting status and body in one fluent statement.

The reasoning behind both patterns is the same one that shows up throughout this subject: **isolate the thing you're actually testing from things outside your control.** A test asserting that a route handler returns the right shape of JSON for a given input shouldn't also depend on a real database being online, any more than a React component test should depend on a real network request actually succeeding.

**This sandbox cannot import Jest, Mocha, or Supertest** — they're real npm packages meant to run in a Node.js test-runner process, not inside a live-rendered browser component. To keep every example here genuinely running, the examples below build a tiny hand-rolled \`assertEqual(actual, expected, label)\` helper — conceptually the same thing \`expect(...).toBe(...)\` does internally, just implemented directly — and use it to test plain functions, a function with a mocked dependency injected in, and a simulated API endpoint's response. The *pattern* — arrange some input, call the function, assert the result matches what's expected — is identical to what a real Jest or Mocha test file looks like; only the specific assertion syntax would differ.`,
  examples: [
    {
      id: "hand-rolled-assertion-helper",
      title: "A hand-rolled assertion helper testing a plain function",
      summary: "assertEqual(actual, expected, label) -- conceptually what expect(...).toBe(...) does internally.",
      code: `function assertEqual(actual, expected, label) {
  const passed = JSON.stringify(actual) === JSON.stringify(expected);
  return {
    passed,
    label,
    detail: passed
      ? label + ": PASS"
      : label + ": FAIL (expected " + JSON.stringify(expected) + ", got " + JSON.stringify(actual) + ")",
  };
}

function formatPrice(cents) {
  return "$" + (cents / 100).toFixed(2);
}

function App() {
  const [results, setResults] = useState([]);

  function runTests() {
    const outcomes = [
      assertEqual(formatPrice(1999), "$19.99", "formatPrice(1999)"),
      assertEqual(formatPrice(500), "$5.00", "formatPrice(500)"),
      assertEqual(formatPrice(0), "$0.00", "formatPrice(0)"),
    ];
    setResults(outcomes);
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={runTests}>Run the test suite</button>
      <div style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 90, fontFamily: "monospace", fontSize: 13, display: "grid", gap: 4 }}>
        {results.length === 0
          ? "// click above to run assertions against formatPrice()"
          : results.map(function (r, i) {
              return (
                <div key={i} style={{ color: r.passed ? "#34d399" : "#f87171" }}>
                  {r.detail}
                </div>
              );
            })}
      </div>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "mocking-a-database-dependency",
      title: "Mocking a database dependency",
      summary: "Testing logic without needing a real database -- a fake db is injected in place of the real one.",
      code: `function assertEqual(actual, expected, label) {
  const passed = JSON.stringify(actual) === JSON.stringify(expected);
  return passed ? label + ": PASS" : label + ": FAIL (got " + JSON.stringify(actual) + ")";
}

// The function under test depends on a "db" that's passed in, rather than
// importing one directly -- this is what makes it possible to substitute
// a fake one during a test, instead of needing a real database connection.
function getActiveUserCount(db) {
  return db.getAllUsers().filter(function (u) {
    return u.active;
  }).length;
}

// A mock: a fake object shaped like the real database dependency, returning
// fixed, predictable data instead of performing a real query.
const mockDb = {
  getAllUsers() {
    return [
      { id: 1, active: true },
      { id: 2, active: false },
      { id: 3, active: true },
    ];
  },
};

function App() {
  const [result, setResult] = useState("");

  function runTest() {
    const count = getActiveUserCount(mockDb);
    setResult(assertEqual(count, 2, "getActiveUserCount(mockDb)"));
  }

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <button onClick={runTest}>Run test with mockDb (no real database involved)</button>
      <p>{result || "// output appears here"}</p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "testing-an-api-endpoint-response",
      title: "Testing an API endpoint's response",
      summary: "Send a simulated request into a fake Express-like app and assert on status code and body.",
      code: `function assertEqual(actual, expected, label) {
  const passed = JSON.stringify(actual) === JSON.stringify(expected);
  return passed
    ? label + ": PASS"
    : label + ": FAIL (expected " + JSON.stringify(expected) + ", got " + JSON.stringify(actual) + ")";
}

// A minimal fake Express-like app, same shape used throughout this subject's
// Express.js category -- standing in for what Supertest would drive for real.
function createFakeApp() {
  const routes = [];
  const app = {
    get(path, handler) {
      routes.push({ path, handler });
      return app;
    },
    simulateRequest(url) {
      const match = routes.find(function (r) {
        return r.path === url;
      });
      let statusCode = 200;
      let body = null;
      const res = {
        status(code) {
          statusCode = code;
          return res;
        },
        json(data) {
          body = data;
          return res;
        },
      };
      if (match) {
        match.handler({}, res);
      } else {
        statusCode = 404;
        body = { error: "Not found" };
      }
      return { statusCode, body };
    },
  };
  return app;
}

const app = createFakeApp();
app.get("/health", function (req, res) {
  res.status(200).json({ status: "ok" });
});

function App() {
  const [results, setResults] = useState([]);

  function runTests() {
    const response = app.simulateRequest("/health");
    setResults([
      assertEqual(response.statusCode, 200, "GET /health status code"),
      assertEqual(response.body, { status: "ok" }, "GET /health response body"),
    ]);
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={runTests}>Test GET /health</button>
      <div style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 70, fontFamily: "monospace", fontSize: 13, display: "grid", gap: 4 }}>
        {results.length === 0
          ? "// click above to send a simulated request and assert on the response"
          : results.map(function (line, i) {
              return <div key={i}>{line}</div>;
            })}
      </div>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
