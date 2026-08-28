import type { Topic } from "../../types";

export const nodeRestApiBasicsTopic: Topic = {
  id: "node-rest-api-basics",
  title: "Node.js Building a Simple REST API",
  category: "HTTP & Servers",
  shortExplanation: `**REST** is a set of *conventions* for designing HTTP APIs — nothing in Node.js enforces any of it — built around treating URLs as **resources** (nouns) and HTTP methods as the **actions** performed on them.

- A resource gets a **collection URL** (\`/tasks\`) and an **item URL** (\`/tasks/42\`), not verb-shaped URLs like \`/getTasks\`
- \`GET /tasks\` lists, \`POST /tasks\` creates, \`DELETE /tasks/42\` removes — each paired with an appropriate status code (\`200\`, \`201\`, \`204\`, \`404\`)
- Each request should be **self-contained** — a REST API shouldn't rely on the server "remembering" anything about a particular client between requests`,
  longExplanation: `REST (**RE**presentational **S**tate **T**ransfer) isn't a protocol, a library, or anything Node.js knows about or enforces — it's a widely-adopted set of *design conventions* for structuring HTTP APIs, built on the routing and method concepts covered in the previous two topics. Following it isn't mandatory, but doing so makes an API predictable to anyone who's used another REST API before, which is exactly the point.

**Resources are nouns, not verbs.** A REST-ish API models data as *resources*, each with its own URL — \`/tasks\` for a collection of tasks, \`/tasks/42\` for one specific task. The *action* being taken lives in the HTTP method, not the URL itself: \`GET /tasks\` (not \`/getTasks\`), \`POST /tasks\` (not \`/createTask\`), \`DELETE /tasks/42\` (not \`/deleteTask?id=42\`). This split — noun in the path, verb in the method — is the core idea the rest of REST design builds on.

**Collection endpoints vs. item endpoints** is the most common shape a resource takes:

- \`GET /tasks\` — list every task in the collection
- \`POST /tasks\` — create a new task, with the new task's data in the request body
- \`GET /tasks/:id\` — fetch one specific task
- \`PUT /tasks/:id\` or \`PATCH /tasks/:id\` — replace or partially update one specific task
- \`DELETE /tasks/:id\` — remove one specific task

**Status codes carry real meaning**, and picking the right one (covered in more depth in the HTTP Methods topic) is part of the convention: \`200 OK\` for a successful \`GET\`, \`201 Created\` for a successful \`POST\` (often with the newly created resource in the body), \`204 No Content\` for a successful \`DELETE\` (there's nothing left to describe), \`404 Not Found\` when an id doesn't exist, and \`400 Bad Request\` when the request itself is malformed (a missing required field, invalid JSON). A client shouldn't have to parse a response body just to figure out whether something succeeded — the status code alone should already say so.

**Statelessness** is a subtler but important REST principle: each request should carry everything the server needs to handle it — the server isn't supposed to remember "what this particular client was doing" from one request to the next, the way an old-fashioned session-based web app might. This doesn't mean a REST API can't have a database or any server-side storage at all (a real API obviously has to store its tasks somewhere) — it means the *request/response cycle itself* doesn't depend on hidden server-side memory of prior requests from that specific client. Any authorization needed has to be included with every request (a token in a header, for instance) rather than assumed from an earlier login step the server "remembers."

**None of this is enforced by Node.js.** A REST API built on the raw \`http\` module is really just the manual \`req.method\`/\`req.url\` routing from the earlier routing topic, applied consistently to a resource's collection and item URLs, plus picking sensible status codes. Frameworks like Express (its own category later in this subject) don't add anything conceptually new here — they just make the routing and response-building noticeably less repetitive to write.

Since this sandbox has no real network or database, the example below **simulates** the entire thing: a small in-memory JavaScript array standing in for a tasks table, and simulated \`req\`/\`res\` objects (shaped like the real \`http\` module's) that a set of buttons drive — listing, creating, and deleting tasks against the same in-memory array, exactly the way a real handler would operate against a real database.`,
  examples: [
    {
      id: "get-tasks-collection",
      title: "GET /tasks -- listing the collection",
      summary: "The collection endpoint returns every task currently in the in-memory store.",
      code: `let tasksDb = [
  { id: 1, title: "Write REST API topic" },
  { id: 2, title: "Review pull request" },
];

function handleGetTasks(req, res) {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(tasksDb));
}

function App() {
  const [output, setOutput] = useState("");

  function run() {
    const res = { statusCode: 200, body: "", writeHead(c) { this.statusCode = c; }, end(b) { this.body = b; } };
    handleGetTasks({ method: "GET", url: "/tasks" }, res);
    setOutput(res.statusCode + ": " + res.body);
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={run}>GET /tasks</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 50 }}>
        {output || "// output appears here"}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "post-tasks-create",
      title: "POST /tasks -- creating a task (201 Created)",
      summary: "A new task is appended to the store and returned with its id and a 201 status.",
      code: `let tasksDb = [{ id: 1, title: "Write REST API topic" }];
let nextId = 2;

function handlePostTask(req, res) {
  if (!req.body || !req.body.title) {
    res.writeHead(400, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "\\"title\\" is required" }));
    return;
  }
  const newTask = { id: nextId, title: req.body.title };
  nextId = nextId + 1;
  tasksDb = [...tasksDb, newTask];
  res.writeHead(201, { "Content-Type": "application/json" });
  res.end(JSON.stringify(newTask));
}

function App() {
  const [output, setOutput] = useState("");

  function send(body) {
    const res = { statusCode: 200, body: "", writeHead(c) { this.statusCode = c; }, end(b) { this.body = b; } };
    handlePostTask({ method: "POST", url: "/tasks", body }, res);
    setOutput(res.statusCode + ": " + res.body + "   (store now has " + tasksDb.length + " task(s))");
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={() => send({ title: "Buy milk" })}>POST /tasks {"{"}"title":"Buy milk"{"}"}</button>
        <button onClick={() => send({})}>POST /tasks {"{}"} (missing title)</button>
      </div>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 50 }}>
        {output || "// output appears here"}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "delete-tasks-item",
      title: "DELETE /tasks/:id -- removing one task (204 or 404)",
      summary: "A successful delete has no body; deleting an id that's already gone returns 404, not another 204.",
      code: `let tasksDb = [{ id: 1, title: "Write REST API topic" }, { id: 2, title: "Review pull request" }];

function handleDeleteTask(req, res, id) {
  const existed = tasksDb.some((t) => t.id === id);
  tasksDb = tasksDb.filter((t) => t.id !== id);
  if (existed) {
    res.writeHead(204);
    res.end();
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "No task with id " + id }));
  }
}

function App() {
  const [output, setOutput] = useState("");

  function run(id) {
    const res = { statusCode: 200, body: "", writeHead(c) { this.statusCode = c; }, end(b) { this.body = b || ""; } };
    handleDeleteTask({ method: "DELETE", url: "/tasks/" + id }, res, id);
    setOutput(res.statusCode + (res.body ? ": " + res.body : " (no body)"));
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={() => run(1)}>DELETE /tasks/1</button>
        <button onClick={() => run(1)}>DELETE /tasks/1 again</button>
      </div>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 40 }}>
        {output || "// output appears here"}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "interactive-rest-client",
      title: "A tiny interactive REST client: list, create, and delete",
      summary: "A full mini-API driven by buttons -- the same in-memory store, handled through simulated GET/POST/DELETE.",
      code: `function createTasksApi() {
  let tasksDb = [{ id: 1, title: "Write REST API topic" }];
  let nextId = 2;

  return {
    list() {
      return { status: 200, body: tasksDb };
    },
    create(title) {
      if (!title || !title.trim()) {
        return { status: 400, body: { error: "\\"title\\" is required" } };
      }
      const newTask = { id: nextId, title };
      nextId = nextId + 1;
      tasksDb = [...tasksDb, newTask];
      return { status: 201, body: newTask };
    },
    remove(id) {
      const existed = tasksDb.some((t) => t.id === id);
      tasksDb = tasksDb.filter((t) => t.id !== id);
      return existed ? { status: 204, body: null } : { status: 404, body: { error: "No task with id " + id } };
    },
    getAll() {
      return tasksDb;
    },
  };
}

function App() {
  const [api] = useState(() => createTasksApi());
  const [tasks, setTasks] = useState(api.getAll());
  const [title, setTitle] = useState("");
  const [log, setLog] = useState([]);

  function print(v) {
    setLog((prev) => [v, ...prev].slice(0, 4));
  }

  function refresh() {
    const result = api.list();
    setTasks(result.body);
  }

  function handleCreate() {
    const result = api.create(title);
    print("POST /tasks -> " + result.status);
    setTitle("");
    refresh();
  }

  function handleDelete(id) {
    const result = api.remove(id);
    print("DELETE /tasks/" + id + " -> " + result.status);
    refresh();
  }

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <div style={{ display: "flex", gap: 8 }}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="New task title"
          style={{ padding: 6 }}
        />
        <button onClick={handleCreate}>POST /tasks</button>
      </div>
      <ul style={{ margin: 0, paddingLeft: 18 }}>
        {tasks.map((t) => (
          <li key={t.id} style={{ marginBottom: 4 }}>
            {t.title}{" "}
            <button onClick={() => handleDelete(t.id)}>DELETE /tasks/{t.id}</button>
          </li>
        ))}
      </ul>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 60, width: "100%" }}>
        {log.length === 0 ? "// request log appears here" : log.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
