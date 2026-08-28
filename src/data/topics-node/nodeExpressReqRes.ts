import type { Topic } from "../../types";

export const nodeExpressReqResTopic: Topic = {
  id: "node-express-req-res",
  title: "Request and Response Objects in Express",
  category: "Express.js",
  shortExplanation: `Express hands every handler an enhanced \`req\` and \`res\` — the same underlying Node \`http\` objects, but with extra convenience properties and methods layered on top.

- \`req.params\` — values captured from \`:name\` segments in the matched route path
- \`req.query\` — the parsed query string, as a plain object
- \`req.body\` — the parsed request body, populated only if a body-parsing middleware (like \`express.json()\`) ran first
- \`res.status(code)\`, \`res.json(data)\`, and \`res.send(text)\` all return \`res\` itself, so calls can be **chained**: \`res.status(404).json({ error: "Not found" })\``,
  longExplanation: `Express doesn't replace Node's \`req\` and \`res\` objects — it *decorates* them with extra properties and convenience methods, on top of everything raw \`http\` already provides (\`req.method\`, \`req.headers\`, \`res.writeHead\`, and so on all still exist underneath). This topic covers the Express-specific additions that day-to-day route handlers reach for constantly.

**Three ways data arrives on \`req\`:**

- \`req.params\` holds values captured from a matching route's \`:name\` segments — for \`app.get("/users/:id", ...)\` matched against \`/users/42\`, \`req.params.id\` is \`"42"\`.
- \`req.query\` holds the parsed query string as a plain object — for a request to \`/search?term=cats\`, \`req.query.term\` is \`"cats"\`.
- \`req.body\` holds the parsed request body — but **only if body-parsing middleware ran first**. Without \`app.use(express.json())\` registered ahead of a route, \`req.body\` is \`undefined\` for a JSON request body, even though the client genuinely sent one — Express deliberately doesn't parse bodies by default, since not every route needs to, and parsing has a real cost. This is one of the most common early-Express bugs: a route handler that reads \`req.body.someField\` and gets a confusing "cannot read property of undefined" error, simply because the JSON body-parsing middleware was never wired up.

**Sending a response, and the methods that build it:**

- \`res.status(code)\` sets the HTTP status code (\`200\`, \`404\`, \`500\`, ...) — but on its own, **it does not send anything**. Calling only \`res.status(404)\` with no follow-up leaves the response unfinished, exactly like calling \`res.writeHead\` without ever calling \`res.end\` in raw \`http\`.
- \`res.json(data)\` serializes \`data\` to a JSON string, sets the \`Content-Type\` header to \`application/json\` automatically, and sends it. This is the standard way a JSON API responds.
- \`res.send(text)\` sends a response body and tries to infer the right \`Content-Type\` from what you pass it — a string becomes \`text/html\`, an object or array is automatically JSON-stringified (behaving much like \`res.json\` in that case), a \`Buffer\` is sent as raw binary. In practice, most JSON APIs use \`res.json\` explicitly anyway, since it's clearer about intent than relying on \`res.send\`'s type-sniffing behavior.

**Chaining** is what ties status codes and bodies together cleanly. \`res.status\`, and the underlying methods each of these builds on, all return \`res\` itself — so \`res.status(404).json({ error: "Not found" })\` reads as one fluent statement: set the status, then send the JSON body. This chaining pattern shows up constantly in real Express code, and is worth recognizing as exactly that — a method returning \`this\` so the next call can be tacked directly onto it, not some special syntax unique to responses.

A couple of gotchas worth knowing: calling \`res.json()\` (or \`res.send()\`) a **second time** on the same response throws \`"Cannot set headers after they are sent"\`, exactly like double-calling \`res.end()\` in raw \`http\` — a response can only be finished once. And \`req.params\`, \`req.query\`, and any parsed \`req.body\` fields are **always strings by default** (except \`req.body\` fields that came from JSON, which keep their original JSON types) — a query value like \`?page=2\` arrives as the string \`"2"\`, not the number \`2\`, and comparing it with \`===\` against a number silently fails.

**This is a hand-built simulation standing in for the real \`express\` package.** The fake \`req\`/\`res\` objects in the examples below are plain JavaScript objects with methods named and behaving exactly like real Express's — \`status\`, \`json\`, \`send\` all return the response object for chaining, and \`req.body\` is only populated when a stand-in body-parsing step runs first — so the exact same patterns apply directly to real Express route handlers.`,
  examples: [
    {
      id: "reading-params-query-body",
      title: "Reading req.params, req.query, and req.body",
      summary: "Three different places data can arrive from on one simulated request.",
      code: `function App() {
  const [output, setOutput] = useState(null);

  const fakeReq = {
    method: "PATCH",
    url: "/users/42/orders?status=pending",
    params: { id: "42" },
    query: { status: "pending" },
    body: { note: "Please gift-wrap this order" },
  };

  function handler(req, res) {
    return (
      "params: " + JSON.stringify(req.params) + "\\n" +
      "query:  " + JSON.stringify(req.query) + "\\n" +
      "body:   " + JSON.stringify(req.body)
    ).split("\\n");
  }

  function run() {
    setOutput(handler(fakeReq, {}));
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={run}>Inspect req.params / req.query / req.body</button>
      <div style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 90, fontFamily: "monospace", fontSize: 13, display: "grid", gap: 4 }}>
        {!output
          ? "// output appears here"
          : output.map(function (line, i) {
              return <div key={i}>{line}</div>;
            })}
      </div>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "req-body-needs-middleware",
      title: "req.body is undefined without body-parsing middleware",
      summary: "A very common early bug: reading req.body before any JSON body-parser has run.",
      code: `function createFakeApp() {
  let bodyParserEnabled = false;
  const routes = [];

  const app = {
    enableJsonBodyParsing() {
      bodyParserEnabled = true;
      return app;
    },
    post(path, handler) {
      routes.push({ path, handler });
      return app;
    },
    simulateRequest(url, rawBody) {
      const match = routes.find(function (r) {
        return r.path === url;
      });
      const req = {
        url,
        // Only populated if the (fake) express.json() middleware ran first:
        body: bodyParserEnabled ? rawBody : undefined,
      };
      let result = null;
      const res = {
        json(data) {
          result = data;
          return res;
        },
      };
      if (match) {
        try {
          match.handler(req, res);
        } catch (err) {
          result = { error: err.message };
        }
      }
      return result;
    },
  };
  return app;
}

function App() {
  const [withoutParser, setWithoutParser] = useState(null);
  const [withParser, setWithParser] = useState(null);

  function tryWithout() {
    const app = createFakeApp();
    app.post("/notes", function (req, res) {
      res.json({ received: req.body.text });
    });
    setWithoutParser(JSON.stringify(app.simulateRequest("/notes", { text: "Buy milk" })));
  }

  function tryWith() {
    const app = createFakeApp();
    app.enableJsonBodyParsing();
    app.post("/notes", function (req, res) {
      res.json({ received: req.body.text });
    });
    setWithParser(JSON.stringify(app.simulateRequest("/notes", { text: "Buy milk" })));
  }

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <button onClick={tryWithout}>POST /notes (no app.use(express.json()))</button>
        <button onClick={tryWith}>POST /notes (with app.use(express.json()))</button>
      </div>
      <p>Without body parser: {withoutParser || "-- click above --"}</p>
      <p>With body parser: {withParser || "-- click above --"}</p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "status-json-chaining",
      title: "Chaining: res.status(code).json(data)",
      summary: "status(), json(), and send() all return res itself, so calls can be chained fluently.",
      code: `function createFakeRes() {
  const res = {
    statusCode: 200,
    body: null,
    status(code) {
      res.statusCode = code;
      return res;
    },
    json(data) {
      res.body = data;
      return res;
    },
    send(text) {
      res.body = text;
      return res;
    },
  };
  return res;
}

function findUser(id) {
  const users = { "1": { id: "1", name: "Ada" }, "2": { id: "2", name: "Grace" } };
  return users[id] || null;
}

function getUserHandler(req, res) {
  const user = findUser(req.params.id);
  if (!user) {
    res.status(404).json({ error: "User " + req.params.id + " not found" });
    return;
  }
  res.status(200).json(user);
}

function App() {
  const [output, setOutput] = useState("");

  function run(id) {
    const res = createFakeRes();
    getUserHandler({ params: { id } }, res);
    setOutput(res.statusCode + " " + JSON.stringify(res.body));
  }

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <button onClick={function () { run("1"); }}>GET /users/1</button>
        <button onClick={function () { run("99"); }}>GET /users/99</button>
      </div>
      <p>{output || "// output appears here"}</p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "gotcha-status-alone-sends-nothing",
      title: "Gotcha: res.status(code) alone sends nothing",
      summary: "Setting a status code isn't the same as finishing the response -- a follow-up call is required.",
      code: `function createFakeRes() {
  const res = {
    statusCode: 200,
    ended: false,
    status(code) {
      res.statusCode = code;
      return res;
    },
    json(data) {
      res.body = data;
      res.ended = true;
      return res;
    },
  };
  return res;
}

function brokenHandler(req, res) {
  res.status(404);
  // Bug: no .json()/.send() call after this -- the response never finishes.
}

function fixedHandler(req, res) {
  res.status(404).json({ error: "Not found" });
}

function App() {
  const [output, setOutput] = useState("");

  function tryHandler(handler) {
    const res = createFakeRes();
    handler({}, res);
    if (res.ended) {
      setOutput("Response finished: " + res.statusCode + " " + JSON.stringify(res.body));
    } else {
      setOutput("Status was set to " + res.statusCode + ", but no body method was called -- the request is still hanging, unfinished.");
    }
  }

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <button onClick={function () { tryHandler(brokenHandler); }}>Run handler that only calls res.status()</button>
        <button onClick={function () { tryHandler(fixedHandler); }}>Run handler that chains .status().json()</button>
      </div>
      <p>{output || "// output appears here"}</p>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
