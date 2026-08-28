import type { Topic } from "../../types";

export const nodeHttpMethodsTopic: Topic = {
  id: "node-http-methods",
  title: "Node.js HTTP Methods",
  category: "HTTP & Servers",
  shortExplanation: `An HTTP **method** (\`req.method\`) declares the *intent* of a request — Node itself doesn't enforce any of these meanings, they're conventions a well-behaved server chooses to follow.

- \`GET\` — read/retrieve a resource, should never change server state
- \`POST\` — create a new resource (or trigger a non-idempotent action); commonly answered with \`201 Created\`
- \`PUT\` — replace an *entire* existing resource with the given data
- \`PATCH\` — apply a *partial* update to an existing resource
- \`DELETE\` — remove a resource; commonly answered with \`204 No Content\``,
  longExplanation: `Every HTTP request carries a method — \`req.method\` on Node's request object — that's meant to communicate *what kind of operation* the client wants performed. Nothing about the raw \`http\` module forces a server to honor any particular meaning for any method; a handler could technically delete data on a \`GET\` request if it wanted to. But a huge amount of the web (browsers, caches, proxies, API clients, and every framework built on Node) assumes servers *do* follow these conventions, so violating them causes real, confusing bugs — a caching layer might silently reuse a stale \`GET\` response assuming it's always safe to do so, for instance.

**The five most common methods, and what each conventionally means**, imagined against a small "notes" resource server:

- **\`GET\`** — retrieve data, and only retrieve it. \`GET /notes\` lists every note; \`GET /notes/3\` fetches one specific note. A \`GET\` request should be *safe* (it never modifies anything on the server) and *idempotent* (making the same \`GET\` request five times in a row has the exact same effect as making it once — namely, none at all)
- **\`POST\`** — create something new, or trigger some action that doesn't map cleanly onto the other verbs. \`POST /notes\` with a request body creates a brand-new note and conventionally responds with status \`201 Created\` (often including the newly created resource, and sometimes its new URL, in the response body). \`POST\` is generally **not idempotent** — sending the exact same \`POST /notes\` request twice typically creates *two* notes, not one
- **\`PUT\`** — replace an entire existing resource with exactly the representation given. \`PUT /notes/3\` with a full note body means "this is now the complete, entire state of note 3" — any field not included is conventionally expected to be cleared, not left alone. \`PUT\` **is idempotent**: sending the same \`PUT /notes/3\` request five times leaves note 3 in the exact same final state as sending it once
- **\`PATCH\`** — apply a partial update, changing only the fields actually included in the request body and leaving everything else untouched. \`PATCH /notes/3\` with just \`{ "pinned": true }\` changes only the \`pinned\` field. Unlike \`PUT\`, \`PATCH\` isn't guaranteed to be idempotent in general (a \`PATCH\` that means "increment this counter by one," for instance, produces a different result every time it's repeated) — though many simple field-replacement \`PATCH\`es happen to be idempotent in practice anyway
- **\`DELETE\`** — remove a resource. \`DELETE /notes/3\` deletes note 3, conventionally answered with \`204 No Content\` (a successful response with no body — there's nothing left to describe) or sometimes \`200 OK\` with a small confirmation body. \`DELETE\` is idempotent in the sense that deleting an already-deleted resource still leaves it deleted — though a second \`DELETE\` on the same id is often answered with \`404 Not Found\` rather than another \`204\`, since there's nothing left to delete

**A real, common gotcha**: a raw \`http\` handler that only checks \`req.url\` and forgets to check \`req.method\` at all will happily run the same code for a \`GET\` and a \`DELETE\` sent to the same path. A well-behaved server responds \`405 Method Not Allowed\` (not \`404\`) when a path exists but doesn't support the method that was used against it — \`404\` means "this resource doesn't exist at all," which is a different, more specific claim than "this resource exists, but that action isn't supported on it."

Since this sandbox has no real network layer, these examples reuse the simulated \`req\`/\`res\` pattern from earlier HTTP topics — a hand-built request object with \`method\`/\`url\`/\`body\` properties, and a response object with genuinely working \`writeHead\`/\`end\` methods — plus a small in-memory JavaScript array standing in for a real notes database, so a request handler dispatching on \`req.method\` behaves exactly as it would against Node's real \`http\` module and a real data store.`,
  examples: [
    {
      id: "get-list-notes",
      title: "GET /notes -- reading, without changing anything",
      summary: "A safe, idempotent request: calling it any number of times never changes server state.",
      code: `const notesDb = [
  { id: 1, text: "Buy milk" },
  { id: 2, text: "Write Node.js notes" },
];

function handleGet(req, res) {
  res.writeHead(200);
  res.end(JSON.stringify(notesDb));
}

function App() {
  const [output, setOutput] = useState("");

  function run() {
    const res = { statusCode: 200, body: "", writeHead(c) { this.statusCode = c; }, end(b) { this.body = b; } };
    handleGet({ method: "GET", url: "/notes" }, res);
    setOutput(res.statusCode + "\\n" + res.body);
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={run}>GET /notes</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 60 }}>
        {output || "// response appears here"}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "post-create-note",
      title: "POST /notes -- creating something new (201 Created)",
      summary: "Not idempotent: sending the same request twice creates two separate notes.",
      code: `let notesDb = [{ id: 1, text: "Buy milk" }];
let nextId = 2;

function handlePost(req, res) {
  const newNote = { id: nextId, text: req.body.text };
  nextId = nextId + 1;
  notesDb = [...notesDb, newNote];
  res.writeHead(201);
  res.end(JSON.stringify(newNote));
}

function App() {
  const [log, setLog] = useState([]);

  function print(v) {
    setLog((prev) => [...prev, v]);
  }

  function run() {
    const res = { statusCode: 200, body: "", writeHead(c) { this.statusCode = c; }, end(b) { this.body = b; } };
    handlePost({ method: "POST", url: "/notes", body: { text: "New task" } }, res);
    print(res.statusCode + " -> " + res.body + "   (total notes now: " + notesDb.length + ")");
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={run}>POST /notes (send the same request each time)</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 80 }}>
        {log.length === 0 ? "// send the request a few times -- notice the note count keeps growing" : log.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "put-vs-patch",
      title: "PUT vs PATCH -- full replace vs partial update",
      summary: "PUT expects the whole resource; PATCH only touches the fields actually sent.",
      code: `function handlePut(existing, body) {
  // PUT: the given body IS the entire new resource -- unlisted fields are gone.
  return { id: existing.id, ...body };
}

function handlePatch(existing, body) {
  // PATCH: merge -- only the fields present in body change.
  return { ...existing, ...body };
}

function App() {
  const existing = { id: 3, text: "Buy milk", pinned: false, tags: ["errand"] };
  const [result, setResult] = useState(null);

  function tryPut() {
    setResult({ label: "PUT /notes/3 with { text: \\"Buy oat milk\\" }", note: handlePut(existing, { text: "Buy oat milk" }) });
  }

  function tryPatch() {
    setResult({ label: "PATCH /notes/3 with { pinned: true }", note: handlePatch(existing, { pinned: true }) });
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <p>Existing note 3: {JSON.stringify(existing)}</p>
      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={tryPut}>PUT /notes/3</button>
        <button onClick={tryPatch}>PATCH /notes/3</button>
      </div>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 70 }}>
        {result ? result.label + "\\n-> " + JSON.stringify(result.note) : "// try each method above"}
      </pre>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        Notice PUT drops the "pinned" and "tags" fields it wasn't given -- PATCH keeps them.
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "delete-and-unsupported-method",
      title: "DELETE /notes/:id (204 No Content), and 405 for an unsupported method",
      summary: "A successful delete has no body to send back -- and a mismatched method gets its own status code.",
      code: `let notesDb = [{ id: 1, text: "Buy milk" }, { id: 2, text: "Write notes" }];

function handleRequest(req) {
  const segments = req.url.split("/").filter(Boolean); // ["notes", "1"]
  if (segments[0] !== "notes" || segments.length !== 2) {
    return { status: 404, body: "" };
  }
  const id = Number(segments[1]);

  if (req.method === "DELETE") {
    const existed = notesDb.some((n) => n.id === id);
    notesDb = notesDb.filter((n) => n.id !== id);
    return existed ? { status: 204, body: "" } : { status: 404, body: "" };
  }
  if (req.method === "GET") {
    const note = notesDb.find((n) => n.id === id);
    return note ? { status: 200, body: JSON.stringify(note) } : { status: 404, body: "" };
  }
  // PATCH/PUT would go here too -- anything else on a real note id is unsupported:
  return { status: 405, body: "Method Not Allowed" };
}

function App() {
  const [log, setLog] = useState([]);

  function print(v) {
    setLog((prev) => [...prev, v]);
  }

  function send(method, url) {
    const result = handleRequest({ method, url });
    print(method + " " + url + " -> " + result.status + (result.body ? " \\"" + result.body + "\\"" : " (no body)"));
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <button onClick={() => send("DELETE", "/notes/1")}>DELETE /notes/1</button>
        <button onClick={() => send("DELETE", "/notes/1")}>DELETE /notes/1 again</button>
        <button onClick={() => send("OPTIONS", "/notes/2")}>OPTIONS /notes/2</button>
      </div>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 90 }}>
        {log.length === 0 ? "// try deleting the same note twice" : log.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
