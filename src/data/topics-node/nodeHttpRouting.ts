import type { Topic } from "../../types";

export const nodeHttpRoutingTopic: Topic = {
  id: "node-http-routing",
  title: "Node.js HTTP Routing Basics",
  category: "HTTP & Servers",
  shortExplanation: `The raw \`http\` module has **no built-in router** — every request, regardless of method or path, funnels into the same request-listener function, so *routing* means manually branching on \`req.method\` and \`req.url\` yourself.

- A small server can get away with a simple \`if\`/\`else\` chain, or a \`switch\` on \`req.url\`
- \`req.url\` includes the **query string** too (\`"/search?q=cats"\`), so exact-match comparisons need it split off first
- Dynamic segments (\`/users/42\`) require manual string parsing — there's no automatic \`:id\`-style extraction
- This hand-written pattern gets unwieldy fast, which is exactly what motivates using a framework like ==Express== (covered in the next category)`,
  longExplanation: `A previous topic covered how \`http.createServer((req, res) => { ... })\` sends *every single incoming request* — a \`GET /\`, a \`POST /users\`, a \`DELETE /users/42\` — into the exact same request-listener function. Node makes no distinction between them at the framework level; the raw \`http\` module doesn't know or care what "routing" means. Deciding what code should run for which request is entirely the request listener's own job, and that job is called *routing*.

**The simplest approach** is a plain \`if\`/\`else\` chain, checking \`req.method\` and \`req.url\` together:

- \`if (req.method === "GET" && req.url === "/") { ... }\`
- \`else if (req.method === "GET" && req.url === "/about") { ... }\`
- \`else if (req.method === "POST" && req.url === "/login") { ... }\`
- \`else { res.writeHead(404); res.end("Not found"); }\`

This works fine for a handful of routes, and a \`switch (req.url)\` statement (with nested \`if\`s on \`req.method\` inside each \`case\`) is a common variation that reads slightly cleaner once there are several distinct paths to branch on.

**A few real complications show up quickly, though:**

- **\`req.url\` includes the query string.** A request to \`/search?q=cats\` has \`req.url\` equal to \`"/search?q=cats"\` — not \`"/search"\` — so a naive \`req.url === "/search"\` check silently fails the moment any query parameters are attached. Code that needs to match just the path has to split off everything from the first \`"?"\` onward before comparing (Node's built-in \`url\` module, or the newer global \`URL\` class, helps with this)
- **Dynamic path segments require manual parsing.** A route like "get the user with this id" (\`/users/42\`, \`/users/7\`, ...) can't be matched with a simple equality check at all, since the id changes every time. It has to be pattern-matched by hand — splitting the path on \`"/"\`, checking the first segment is \`"users"\`, and treating whatever comes after as the id (with validation, since it's just a raw string until checked — \`isNaN\`, bounds checks, and so on)
- **Every branch needs an explicit fallback.** Without a final \`else\` (or \`default\`) case that sends a \`404\`, a request that doesn't match anything falls through with no response ever sent — the exact "forgot to call \`res.end()\`" hang covered in an earlier topic
- **Order and overlap start to matter.** As more routes get added, it becomes easy to accidentally write two branches that could both match the same request, with whichever comes first in the chain silently winning
- **The same logic repeats itself constantly.** A typical small API needs \`GET\`, \`POST\`, \`PUT\`, and \`DELETE\` handling for more than one kind of resource (\`/notes\`, \`/users\`, ...), and hand-writing the same method/path-matching boilerplate for each one adds up to a lot of near-identical, easy-to-typo code

**This is exactly the pain point that motivates using a web framework.** Express (covered in its own category later in this subject) and similar frameworks provide a declarative router — \`app.get("/users/:id", handler)\` — that handles path matching, query-string parsing, and named dynamic segments (\`:id\`) automatically, along with middleware for cross-cutting concerns like authentication or logging that would otherwise have to be copy-pasted into every branch by hand. Understanding the raw \`if\`/\`else\` version first is what makes it clear *what a router is actually doing underneath* — Express's router isn't magic, it's essentially this same method-and-path branching, just handled for you.

Since this sandbox runs in a browser with no real network stack, these examples reuse the same simulated server pattern from earlier HTTP topics — a hand-built \`createFakeServer\`/\`createFakeRes\` pair shaped like Node's real \`http\` module — and simulate incoming requests with a "Send a fake request" button rather than a real TCP connection, so the routing logic itself is written exactly as it would be against Node's real \`http\` module.`,
  examples: [
    {
      id: "simple-if-else-router",
      title: "A simple if/else router",
      summary: "Branching on req.method and req.url together, with an explicit 404 fallback.",
      code: `function createFakeRes() {
  return {
    statusCode: 200,
    body: "",
    writeHead(code) {
      this.statusCode = code;
      return this;
    },
    end(chunk) {
      if (chunk !== undefined) this.body += chunk;
      return this;
    },
  };
}

function handler(req, res) {
  if (req.method === "GET" && req.url === "/") {
    res.writeHead(200);
    res.end("Welcome home!");
  } else if (req.method === "GET" && req.url === "/about") {
    res.writeHead(200);
    res.end("About this site.");
  } else if (req.method === "POST" && req.url === "/login") {
    res.writeHead(200);
    res.end("Logged in.");
  } else {
    res.writeHead(404);
    res.end("Not found.");
  }
}

function App() {
  const [log, setLog] = useState([]);

  function print(value) {
    setLog((prev) => [...prev, value]);
  }

  function send(method, url) {
    const res = createFakeRes();
    handler({ method, url }, res);
    print(method + " " + url + " -> " + res.statusCode + " \\"" + res.body + "\\"");
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <button onClick={() => send("GET", "/")}>GET /</button>
        <button onClick={() => send("GET", "/about")}>GET /about</button>
        <button onClick={() => send("POST", "/login")}>POST /login</button>
        <button onClick={() => send("GET", "/missing")}>GET /missing</button>
      </div>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 100 }}>
        {log.length === 0 ? "// send a request to see it routed" : log.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "url-includes-query-string",
      title: "Gotcha: req.url includes the query string",
      summary: "A naive equality check against req.url silently breaks the moment a query string is attached.",
      code: `function naiveMatch(req) {
  // Bug: this only matches when there is NO query string at all.
  return req.url === "/search" ? "matched /search" : "no match (404)";
}

function fixedMatch(req) {
  const path = req.url.split("?")[0];
  return path === "/search" ? "matched /search" : "no match (404)";
}

function App() {
  const req = { method: "GET", url: "/search?q=cats" };

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <p>Incoming request: GET {req.url}</p>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6 }}>
        {"req.url === \\"/search\\"           -> " + naiveMatch(req) + "\\n" +
          "req.url.split(\\"?\\")[0] === \\"/search\\" -> " + fixedMatch(req)}
      </pre>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        req.url is the path AND the query string together -- matching just the path means
        splitting the query string off first.
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "matching-a-dynamic-segment",
      title: "The pain point: matching a dynamic path segment",
      summary: "Extracting an id from /users/42 requires manual string splitting -- there's no automatic :id matching.",
      code: `function handleUserRoute(req) {
  const path = req.url.split("?")[0];
  const segments = path.split("/").filter(Boolean); // ["users", "42"]

  if (segments[0] !== "users") {
    return "404: not a /users route";
  }
  if (segments.length === 1) {
    return "200: list all users";
  }
  const id = segments[1];
  if (isNaN(Number(id))) {
    return "400: \\"" + id + "\\" is not a valid user id";
  }
  return "200: show user #" + id;
}

function App() {
  const [result, setResult] = useState("");

  function tryUrl(url) {
    setResult(handleUserRoute({ method: "GET", url }));
  }

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <button onClick={() => tryUrl("/users")}>GET /users</button>
        <button onClick={() => tryUrl("/users/42")}>GET /users/42</button>
        <button onClick={() => tryUrl("/users/abc")}>GET /users/abc</button>
      </div>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 40 }}>
        {result || "// pick a request above"}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "why-this-doesnt-scale",
      title: "Why this doesn't scale (and what Express fixes)",
      summary: "The same routing logic, written the raw way versus the declarative way -- shown side by side, not executed.",
      code: `function App() {
  const rawHttpVersion =
    "if (req.method === \\"GET\\" && req.url === \\"/notes\\") { listNotes(req, res); }\\n" +
    "else if (req.method === \\"POST\\" && req.url === \\"/notes\\") { createNote(req, res); }\\n" +
    "else if (req.method === \\"GET\\" && req.url.split(\\"?\\")[0].startsWith(\\"/notes/\\")) {\\n" +
    "  const id = req.url.split(\\"?\\")[0].split(\\"/\\")[2];\\n" +
    "  getNoteById(req, res, id);\\n" +
    "}\\n" +
    "else if (req.method === \\"DELETE\\" && req.url.split(\\"?\\")[0].startsWith(\\"/notes/\\")) {\\n" +
    "  const id = req.url.split(\\"?\\")[0].split(\\"/\\")[2];\\n" +
    "  deleteNote(req, res, id);\\n" +
    "}\\n" +
    "else { res.writeHead(404); res.end(\\"Not found\\"); }";

  const expressVersion =
    "// covered in the Express.js category -- shown here only for contrast, not executed\\n" +
    "app.get(\\"/notes\\", listNotes);\\n" +
    "app.post(\\"/notes\\", createNote);\\n" +
    "app.get(\\"/notes/:id\\", getNoteById);\\n" +
    "app.delete(\\"/notes/:id\\", deleteNote);";

  return (
    <div style={{ display: "grid", gap: 14 }}>
      <div>
        <p style={{ margin: "0 0 6px" }}>Raw http module -- manual routing:</p>
        <pre style={{ background: "#111827", color: "#fca5a5", padding: 12, borderRadius: 6, whiteSpace: "pre-wrap" }}>
          {rawHttpVersion}
        </pre>
      </div>
      <div>
        <p style={{ margin: "0 0 6px" }}>A router-based framework -- same four routes:</p>
        <pre style={{ background: "#111827", color: "#86efac", padding: 12, borderRadius: 6, whiteSpace: "pre-wrap" }}>
          {expressVersion}
        </pre>
      </div>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
