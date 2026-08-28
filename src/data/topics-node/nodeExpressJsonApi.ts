import type { Topic } from "../../types";

export const nodeExpressJsonApiTopic: Topic = {
  id: "node-express-json-api",
  title: "Building a JSON API with Express",
  category: "Express.js",
  shortExplanation: `A **JSON API** is just routing, \`req.body\`/\`req.params\`, and \`res.json\` — the previous three topics — combined into one consistent, predictable set of endpoints, usually one per CRUD operation.

- \`GET /items\` — list; \`GET /items/:id\` — read one
- \`POST /items\` — create (conventionally responds \`201 Created\` with the new resource)
- \`PUT /items/:id\` (or \`PATCH\`) — update; \`DELETE /items/:id\` — remove (conventionally \`204 No Content\`, no body)
- Every endpoint reads from the same in-memory "database" and responds with \`res.json(...)\`, keeping the *shape* of every response consistent`,
  longExplanation: `Everything needed to build a real JSON API has already been covered separately — routing (\`app.get\`/\`app.post\`/\`app.put\`/\`app.delete\`), reading data off \`req.params\`/\`req.query\`/\`req.body\`, and sending it back with \`res.status(code).json(data)\`. This topic is mostly about the **conventions** that turn those individual pieces into something that feels like a coherent, predictable API — the same conventions real-world REST APIs lean on.

A common pattern is one **collection endpoint** and one **item endpoint** per resource:

- \`GET /items\` returns the whole list.
- \`GET /items/:id\` returns one item, or \`404\` if the id doesn't exist.
- \`POST /items\` creates a new item from \`req.body\`, and by convention responds with status \`201 Created\` (not the more generic \`200 OK\`) along with the newly created object — including whatever id the server assigned to it, since the client usually doesn't know that yet.
- \`PUT /items/:id\` (or \`PATCH\` for partial updates) modifies an existing item, or \`404\` if it doesn't exist.
- \`DELETE /items/:id\` removes an item and conventionally responds with status \`204 No Content\` — meaning "success, and there's deliberately nothing to send back." A \`204\` response should have no body at all, which is one detail that's easy to get subtly wrong: calling \`res.json(null)\` still sends a body (the four characters \`null\`), which isn't quite the same as truly sending nothing — real Express code for this case typically calls \`res.status(204).end()\` instead, explicitly sending no body.

This category's examples all keep their "database" as a plain in-memory array that lives only for as long as the sandbox tab stays open — every simulated request reads or mutates that same array directly. That's a deliberate simplification, not something you'd do in production: a real server restarts, redeploys, and often runs multiple instances at once, so state kept only in memory disappears or goes out of sync between instances. Real APIs persist data with an actual database (covered conceptually in this subject's "Databases & Advanced" category), and the fake array here exists purely so the CRUD *shape* of the API — which route handles which operation, which status code each one returns — can be demonstrated without one.

A few gotchas worth knowing as this scales past a toy example: **id generation** needs to actually be unique and stable — using an array's current length as a "next id" breaks the moment an item is ever deleted (a new item could reuse a deleted one's old id), so real code tracks a separate incrementing counter or lets the database assign ids. **\`PUT\` is meant to be idempotent** — sending the exact same \`PUT\` request twice should leave the resource in the same final state, whereas \`POST\`ing the same "create" request twice would normally create two separate resources; that expectation is part of why creation uses \`POST\` and updates use \`PUT\`, not the other way around. And every one of these handlers still depends on the request body actually having been parsed first — omitting \`app.use(express.json())\` means \`req.body\` is \`undefined\` in the \`POST\`/\`PUT\` handlers, the exact gotcha covered in the previous topic.

**This is a hand-built simulation standing in for the real \`express\` package.** The \`createFakeApp()\` used in the examples below supports \`.get\`/\`.post\`/\`.put\`/\`.delete\` with \`:param\` route matching and a \`res\` object with chainable \`.status()\`/\`.json()\`, so every handler below is written exactly the way it would be against real Express, reading from and mutating a plain JavaScript array standing in for a real database.`,
  examples: [
    {
      id: "list-and-read-one",
      title: "GET /items and GET /items/:id",
      summary: "The two read endpoints of a CRUD API -- list everything, or fetch a single item by id.",
      code: `function matchPath(pattern, path) {
  const patternParts = pattern.split("/").filter(Boolean);
  const pathParts = path.split("/").filter(Boolean);
  if (patternParts.length !== pathParts.length) return null;
  const params = {};
  for (let i = 0; i < patternParts.length; i++) {
    const part = patternParts[i];
    const actual = pathParts[i];
    if (part.charAt(0) === ":") {
      params[part.slice(1)] = actual;
    } else if (part !== actual) {
      return null;
    }
  }
  return params;
}

function createFakeApp() {
  const routes = [];
  const app = {
    get(path, handler) {
      routes.push({ method: "GET", path, handler });
      return app;
    },
    simulateRequest(method, url) {
      const match = routes.find(function (r) {
        return r.method === method && matchPath(r.path, url) !== null;
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
      if (!match) {
        res.status(404).json({ error: "Cannot " + method + " " + url });
        return { statusCode, body };
      }
      match.handler({ params: matchPath(match.path, url) }, res);
      return { statusCode, body };
    },
  };
  return app;
}

const items = [
  { id: 1, title: "Buy milk" },
  { id: 2, title: "Write report" },
];

const app = createFakeApp();
app.get("/items", function (req, res) {
  res.status(200).json(items);
});
app.get("/items/:id", function (req, res) {
  const item = items.find(function (i) {
    return String(i.id) === req.params.id;
  });
  if (!item) {
    res.status(404).json({ error: "Item " + req.params.id + " not found" });
    return;
  }
  res.status(200).json(item);
});

function App() {
  const [output, setOutput] = useState("");

  function send(method, url) {
    const result = app.simulateRequest(method, url);
    setOutput(result.statusCode + " " + JSON.stringify(result.body));
  }

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <button onClick={function () { send("GET", "/items"); }}>GET /items</button>
        <button onClick={function () { send("GET", "/items/1"); }}>GET /items/1</button>
        <button onClick={function () { send("GET", "/items/99"); }}>GET /items/99</button>
      </div>
      <p>{output || "// output appears here"}</p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "post-create",
      title: "POST /items -- creating a resource",
      summary: "A successful create responds with 201 Created, plus the new item including its assigned id.",
      code: `function createFakeApp() {
  const routes = [];
  const app = {
    post(path, handler) {
      routes.push({ path, handler });
      return app;
    },
    simulateRequest(url, body) {
      const match = routes.find(function (r) {
        return r.path === url;
      });
      let statusCode = 200;
      let responseBody = null;
      const res = {
        status(code) {
          statusCode = code;
          return res;
        },
        json(data) {
          responseBody = data;
          return res;
        },
      };
      if (match) match.handler({ body }, res);
      return { statusCode, body: responseBody };
    },
  };
  return app;
}

let items = [{ id: 1, title: "Buy milk" }];
let nextId = 2;

const app = createFakeApp();
app.post("/items", function (req, res) {
  const newItem = { id: nextId, title: req.body.title };
  nextId = nextId + 1;
  items = items.concat(newItem);
  res.status(201).json(newItem);
});

function App() {
  const [output, setOutput] = useState("");
  const [list, setList] = useState(items);

  function create() {
    const result = app.simulateRequest("/items", { title: "Walk the dog" });
    setOutput(result.statusCode + " " + JSON.stringify(result.body));
    setList(items.slice());
  }

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <button onClick={create}>POST /items with body {"{"} title: "Walk the dog" {"}"}</button>
      <p>Response: {output || "-- click above --"}</p>
      <p>Items now in the fake database: {JSON.stringify(list)}</p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "put-update",
      title: "PUT /items/:id -- updating a resource",
      summary: "Updating an existing item returns 200; updating one that doesn't exist returns 404.",
      code: `function createFakeApp() {
  const routes = [];
  function matchId(pattern, path) {
    const p = pattern.split("/").filter(Boolean);
    const a = path.split("/").filter(Boolean);
    if (p.length !== a.length) return null;
    const params = {};
    for (let i = 0; i < p.length; i++) {
      if (p[i].charAt(0) === ":") params[p[i].slice(1)] = a[i];
      else if (p[i] !== a[i]) return null;
    }
    return params;
  }
  const app = {
    put(path, handler) {
      routes.push({ path, handler });
      return app;
    },
    simulateRequest(url, body) {
      const match = routes.find(function (r) {
        return matchId(r.path, url) !== null;
      });
      let statusCode = 200;
      let responseBody = null;
      const res = {
        status(code) {
          statusCode = code;
          return res;
        },
        json(data) {
          responseBody = data;
          return res;
        },
      };
      if (!match) {
        res.status(404).json({ error: "No route for " + url });
        return { statusCode, body: responseBody };
      }
      match.handler({ params: matchId(match.path, url), body }, res);
      return { statusCode, body: responseBody };
    },
  };
  return app;
}

const items = [
  { id: 1, title: "Buy milk", done: false },
  { id: 2, title: "Write report", done: false },
];

const app = createFakeApp();
app.put("/items/:id", function (req, res) {
  const item = items.find(function (i) {
    return String(i.id) === req.params.id;
  });
  if (!item) {
    res.status(404).json({ error: "Item " + req.params.id + " not found" });
    return;
  }
  if (req.body.title !== undefined) item.title = req.body.title;
  if (req.body.done !== undefined) item.done = req.body.done;
  res.status(200).json(item);
});

function App() {
  const [output, setOutput] = useState("");

  function updateExisting() {
    const result = app.simulateRequest("/items/1", { done: true });
    setOutput(result.statusCode + " " + JSON.stringify(result.body));
  }
  function updateMissing() {
    const result = app.simulateRequest("/items/99", { done: true });
    setOutput(result.statusCode + " " + JSON.stringify(result.body));
  }

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <button onClick={updateExisting}>PUT /items/1 with body {"{"} done: true {"}"}</button>
        <button onClick={updateMissing}>PUT /items/99 with body {"{"} done: true {"}"}</button>
      </div>
      <p>{output || "// output appears here"}</p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "delete-remove",
      title: "DELETE /items/:id -- removing a resource",
      summary: "A successful delete conventionally returns 204 No Content -- a status with no response body.",
      code: `function createFakeApp() {
  const routes = [];
  function matchId(pattern, path) {
    const p = pattern.split("/").filter(Boolean);
    const a = path.split("/").filter(Boolean);
    if (p.length !== a.length) return null;
    const params = {};
    for (let i = 0; i < p.length; i++) {
      if (p[i].charAt(0) === ":") params[p[i].slice(1)] = a[i];
      else if (p[i] !== a[i]) return null;
    }
    return params;
  }
  const app = {
    delete(path, handler) {
      routes.push({ path, handler });
      return app;
    },
    simulateRequest(url) {
      const match = routes.find(function (r) {
        return matchId(r.path, url) !== null;
      });
      let statusCode = 200;
      let body = null;
      let hasBody = false;
      const res = {
        status(code) {
          statusCode = code;
          return res;
        },
        json(data) {
          body = data;
          hasBody = true;
          return res;
        },
        end() {
          hasBody = false;
          return res;
        },
      };
      if (!match) {
        res.status(404).json({ error: "No route for " + url });
        return { statusCode, body, hasBody: true };
      }
      match.handler({ params: matchId(match.path, url) }, res);
      return { statusCode, body, hasBody };
    },
  };
  return app;
}

let items = [
  { id: 1, title: "Buy milk" },
  { id: 2, title: "Write report" },
];

const app = createFakeApp();
app.delete("/items/:id", function (req, res) {
  const index = items.findIndex(function (i) {
    return String(i.id) === req.params.id;
  });
  if (index === -1) {
    res.status(404).json({ error: "Item " + req.params.id + " not found" });
    return;
  }
  items = items.filter(function (i) {
    return String(i.id) !== req.params.id;
  });
  // 204 No Content: status set, but no body -- res.end(), not res.json().
  res.status(204).end();
});

function App() {
  const [output, setOutput] = useState("");
  const [list, setList] = useState(items);

  function remove() {
    const result = app.simulateRequest("/items/1");
    setOutput(result.statusCode + (result.hasBody ? " " + JSON.stringify(result.body) : " (no body)"));
    setList(items.slice());
  }

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <button onClick={remove}>DELETE /items/1</button>
      <p>Response: {output || "-- click above --"}</p>
      <p>Items remaining in the fake database: {JSON.stringify(list)}</p>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
