import type { Topic } from "../../types";

export const jsFetchApiTopic: Topic = {
  id: "js-fetch-api",
  title: "JavaScript Fetch API",
  category: "Asynchronous JavaScript",
  shortExplanation: `\`fetch(url)\` is the standard way browsers make network requests from JavaScript — it returns a **Promise** that resolves to a \`Response\` object once the server has at least started responding.

- \`.json()\` reads and parses the response body as JSON — and it *also* returns a Promise, since reading the body is itself asynchronous
- A \`fetch()\` promise only rejects on a genuine network failure — an HTTP error like \`404\` or \`500\` still ==resolves==, so \`response.ok\` needs to be checked manually
- Works naturally with \`async\`/\`await\`: \`const response = await fetch(url); const data = await response.json();\``,
  longExplanation: `The **Fetch API** (\`fetch()\`) is the modern, built-in way to make an HTTP request from JavaScript running in a browser — asking a server for data (or sending data to it) without reloading the page. Calling \`fetch(url)\` immediately returns a **Promise**, and that promise resolves once the server has sent back at least the response headers — not necessarily the full body yet, which is a detail that trips a lot of people up the first time.

That first resolved value is a \`Response\` object — it represents the incoming response, but its body hasn't been read or parsed yet. Getting the actual data out requires a *second* asynchronous step: \`response.json()\` reads the full response body and parses it as JSON, and — because reading a body is itself an asynchronous operation — it *also* returns a Promise, which resolves to the actual parsed JavaScript value (an object, an array, whatever the server sent). This is why a typical fetch involves two \`await\`s in a row (or two chained \`.then()\`s): one for the response envelope itself, one for its parsed body. Other methods exist for different body formats — \`.text()\` for plain text, \`.blob()\` for binary data — but \`.json()\` is by far the most common for talking to an API.

The single most surprising fact about \`fetch()\`, and a genuinely common source of bugs, is what actually causes its promise to **reject**. A \`fetch()\` promise only rejects for a true network-level failure — no internet connection, a DNS failure, a CORS block, that category of problem. An HTTP error response — a \`404 Not Found\`, a \`500 Internal Server Error\`, even a \`401 Unauthorized\` — still counts as a *successful* fetch as far as the promise is concerned, and it resolves completely normally with a \`Response\` object describing that error. This means code that only wraps a \`fetch()\` in \`try\`/\`catch\` and assumes an error was caught if something went wrong will silently miss real HTTP failures entirely. The fix is checking \`response.ok\` (a boolean, \`true\` only for status codes in the 200–299 range) immediately after the fetch resolves, and manually treating a not-\`ok\` response as a failure, usually by throwing an error of your own so it flows into the same error-handling path as a real network failure would.

\`fetch()\` reads naturally with \`async\`/\`await\`, which is now the standard way most real code uses it: get the response, check \`response.ok\`, and if it isn't, throw before ever trying to parse a body — all wrapped in one outer \`try\`/\`catch\` that handles both the genuine network-failure case and the manually-thrown HTTP-error case in one place.

This sandbox has no real server to talk to and no real network, so the examples below use a small hand-written stand-in, \`fakeFetch(url)\`, instead of the real global \`fetch\`. It returns a Promise — using \`setTimeout\` to simulate real network latency — that resolves to an object shaped like a genuine \`Response\` (with an \`ok\` flag, a \`status\`, and a \`.json()\` method of its own). Every mechanic demonstrated — the two-step \`await\`, the \`response.ok\` check, the \`try\`/\`catch\` around the whole thing — is used exactly the way it would be against a real \`fetch()\` call; only the underlying network request itself is simulated.`,
  examples: [
    {
      id: "basic-fake-fetch",
      title: "The two-step await: response, then .json()",
      summary: "fakeFetch stands in for fetch() — the Promise + .json() shape is identical to the real thing.",
      code: `function fakeFetch(url) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        ok: true,
        status: 200,
        json: () => Promise.resolve({ id: 1, name: "Ada Lovelace" }),
      });
    }, 700);
  });
}

function App() {
  const [status, setStatus] = useState("idle");
  const [data, setData] = useState(null);

  async function run() {
    setStatus("loading");
    setData(null);
    const response = await fakeFetch("/api/user");
    const parsed = await response.json();
    setData(parsed);
    setStatus("done");
  }

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <button onClick={run} disabled={status === "loading"}>
        {status === "loading" ? "Fetching..." : "fetch('/api/user')"}
      </button>
      <p>Status: <strong>{status}</strong></p>
      {data && <p>Parsed JSON: {JSON.stringify(data)}</p>}
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        There's no real network in this sandbox, so fakeFetch simulates the delay and shape of a real response.
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "checking-response-ok",
      title: "response.ok must be checked manually",
      summary: "A 404 response still resolves the promise — it never rejects on its own.",
      code: `function fakeFetch(url) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        ok: false,
        status: 404,
        json: () => Promise.resolve({ error: "User not found" }),
      });
    }, 500);
  });
}

function App() {
  const [log, setLog] = useState([]);

  function print(value) {
    setLog((prev) => [...prev, value]);
  }

  async function run() {
    setLog([]);
    print("Requesting /api/missing-user ...");
    const response = await fakeFetch("/api/missing-user");
    print("response.ok: " + response.ok + ", response.status: " + response.status);
    if (!response.ok) {
      print("Not rejected as an error! fetch() only rejects on a real network failure.");
      print("A manual check like this is required to catch HTTP-level errors like 404.");
    } else {
      const data = await response.json();
      print("Data: " + JSON.stringify(data));
    }
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={run}>Request a missing resource</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 110 }}>
        {log.length === 0 ? "// output appears here" : log.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "full-pattern-with-try-catch",
      title: "The full pattern: await, ok-check, and try/catch",
      summary: "One try/catch handles a network failure and a manually-thrown HTTP error the same way.",
      code: `function fakeFetch(url, mode) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (mode === "network") {
        reject(new Error("Network request failed"));
      } else if (mode === "http") {
        resolve({ ok: false, status: 500, json: () => Promise.resolve({ error: "Server error" }) });
      } else {
        resolve({ ok: true, status: 200, json: () => Promise.resolve({ message: "All good" }) });
      }
    }, 500);
  });
}

function App() {
  const [message, setMessage] = useState("");

  async function run(mode) {
    setMessage("Loading...");
    try {
      const response = await fakeFetch("/api/data", mode);
      if (!response.ok) {
        throw new Error("HTTP error: " + response.status);
      }
      const data = await response.json();
      setMessage("Success: " + JSON.stringify(data));
    } catch (error) {
      setMessage("Caught: " + error.message);
    }
  }

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <button onClick={() => run("ok")}>Simulate success</button>
        <button onClick={() => run("http")}>Simulate HTTP error (500)</button>
        <button onClick={() => run("network")}>Simulate network failure</button>
      </div>
      <p>{message}</p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "sequential-fetches",
      title: "Fetching a user, then fetching their posts",
      summary: "The second fetch depends on data returned by the first — a common real-world shape.",
      code: `function fakeFetch(url) {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (url === "/api/user") {
        resolve({ ok: true, status: 200, json: () => Promise.resolve({ id: 7, name: "Grace Hopper" }) });
      } else {
        resolve({ ok: true, status: 200, json: () => Promise.resolve(["First post", "Second post"]) });
      }
    }, 500);
  });
}

function App() {
  const [log, setLog] = useState([]);

  function print(value) {
    setLog((prev) => [...prev, value]);
  }

  async function run() {
    setLog([]);
    print("Fetching user...");
    const userResponse = await fakeFetch("/api/user");
    const user = await userResponse.json();
    print("Got user: " + user.name);

    print("Fetching " + user.name + "'s posts...");
    const postsResponse = await fakeFetch("/api/users/" + user.id + "/posts");
    const posts = await postsResponse.json();
    print("Got posts: " + posts.join(", "));
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={run}>Fetch user, then fetch their posts</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 110 }}>
        {log.length === 0 ? "// output appears here, one step at a time" : log.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
