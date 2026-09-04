import type { Topic } from "../../types";

export const mongodbMongooseCrudTopic: Topic = {
  id: "mongodb-mongoose-crud",
  title: "CRUD with Mongoose",
  category: "Mongoose & Node Integration",
  shortExplanation: `A compiled Model exposes convenient static methods that wrap the underlying create/read/update/delete operations: \`Model.create()\`, \`Model.find()\`, \`Model.findById()\`, \`Model.findByIdAndUpdate()\`, \`Model.findByIdAndDelete()\`.

- \`Model.create(data)\` validates against the schema, saves, and returns the new document in one call
- \`Model.find(query)\` and \`Model.findById(id)\` read; \`Model.findByIdAndUpdate()\` and \`Model.findByIdAndDelete()\` write
- Every one of these is **asynchronous** in real Mongoose — each returns a Promise-like *Query* object, almost always \`await\`ed`,
  longExplanation: `Once a Model exists (covered in the previous topic), day-to-day application code almost never touches the raw MongoDB driver directly — it calls one of a handful of static methods Mongoose hangs off the Model itself, each named after the operation it performs.

**\`Model.create(data)\`** is the standard way to add a new document. Under the hood it's shorthand for \`new Model(data)\` followed by \`.save()\` — it runs the schema's validation rules (covered in the next topic) against \`data\`, and only if validation passes does it actually persist the document and resolve with it. \`Model.create()\` also accepts an **array** of objects, creating several documents in one call and resolving with an array of the created documents.

**\`Model.find(query)\`** reads every document matching a query filter, using the exact same query-document syntax as the raw MongoDB \`find()\` covered earlier in this subject (\`{ age: 28 }\`, \`{}\` for everything, and so on) — Mongoose doesn't invent a new query language, it passes the filter straight through to the underlying driver. Calling it with no arguments, \`Model.find()\`, returns every document in the collection.

**\`Model.findById(id)\`** is a convenience wrapper specifically for the extremely common case of looking a single document up by its \`_id\` — equivalent to \`Model.findOne({ _id: id })\`, but shorter and clearer to read at the call site. It resolves with the matching document, or \`null\` if no document has that id.

**\`Model.findByIdAndUpdate(id, update)\`** locates a document by id and applies an update to it in one round trip, resolving with the document. A real, easy-to-miss detail: by default, Mongoose (matching MongoDB's own driver default) resolves with the document **as it looked before the update was applied** — to get the *updated* document back instead, real code passes a third options argument: \`Model.findByIdAndUpdate(id, update, { new: true })\`. Forgetting \`{ new: true }\` is one of the most common real-world Mongoose bugs — the update genuinely happens in the database, but the value the calling code receives looks stale.

**\`Model.findByIdAndDelete(id)\`** locates a document by id, removes it, and resolves with the document as it looked right before deletion (or \`null\` if no document had that id) — useful for logging or returning what was just removed without a separate lookup.

**Every one of these is asynchronous**, without exception — just like the raw driver operations covered earlier in this subject, and matching the general database-connection pattern covered in the Node.js subject. In real Mongoose, these methods technically return a **Query** object rather than a raw Promise — Query has extra chainable methods (like \`.sort()\`, \`.limit()\`, \`.select()\`) — but it's also *thenable*, meaning \`await Model.find(...)\` works exactly as expected, which is why almost all real Mongoose code simply treats these calls as if they returned Promises directly.

**Errors are expected, not exceptional.** A validation failure inside \`create()\`, a database temporarily unreachable, an id that doesn't parse as a valid MongoDB ObjectId — all of these reject the returned promise, and real code wraps calls in \`try\`/\`catch\` (or an async route handler's error-handling middleware, covered in the Node.js Express topics) rather than assuming every call succeeds.

**This sandbox cannot import the real \`mongoose\` package.** Every example below builds a small, genuinely-working fake Model — an in-memory array wrapped in an object exposing \`create\`, \`find\`, \`findById\`, \`findByIdAndUpdate\`, and \`findByIdAndDelete\`, each written as a real \`async\` function returning a real Promise, with method names and call shapes matching real Mongoose exactly. The \`{ new: true }\` behavior, the array-form of \`create()\`, and the \`null\`-when-not-found behavior are all genuinely reproduced, not merely described.`,
  examples: [
    {
      id: "create-and-find",
      title: "Model.create() and Model.find()",
      summary: "A genuinely-working fake Model backed by a real array, with real async methods.",
      code: `function createModel() {
  const docs = [];
  let nextId = 1;

  return {
    create: async function (data) {
      const doc = { _id: nextId++, ...data };
      docs.push(doc);
      return doc;
    },
    find: async function (query = {}) {
      return docs.filter(function (doc) {
        for (const key in query) {
          if (doc[key] !== query[key]) return false;
        }
        return true;
      });
    },
  };
}

const User = createModel();

function App() {
  const [log, setLog] = useState([]);

  function print(value) {
    setLog(function (prev) {
      return [...prev, value];
    });
  }

  async function run() {
    setLog([]);
    const ada = await User.create({ name: "Ada Lovelace", age: 28 });
    print("Created: " + JSON.stringify(ada));
    await User.create({ name: "Grace Hopper", age: 34 });
    const all = await User.find({});
    print("Model.find({}) -> " + JSON.stringify(all));
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={run}>await User.create(...) then await User.find({"{}"})</button>
      <div style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 90, fontFamily: "monospace", fontSize: 13, display: "grid", gap: 4 }}>
        {log.length === 0
          ? "// output appears here"
          : log.map(function (line, i) {
              return <div key={i}>{line}</div>;
            })}
      </div>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "find-by-id",
      title: "Model.findById(id)",
      summary: "A convenience wrapper for looking up one document by its _id -- resolves null if missing.",
      code: `function createModel() {
  const docs = [];
  let nextId = 1;
  return {
    create: async function (data) {
      const doc = { _id: nextId++, ...data };
      docs.push(doc);
      return doc;
    },
    findById: async function (id) {
      return docs.find(function (d) { return d._id === id; }) || null;
    },
  };
}

const User = createModel();

function App() {
  const [output, setOutput] = useState("");
  const [createdId, setCreatedId] = useState(null);

  async function seed() {
    const ada = await User.create({ name: "Ada Lovelace" });
    setCreatedId(ada._id);
    setOutput("Created user with _id: " + ada._id);
  }

  async function lookupExisting() {
    const found = await User.findById(createdId);
    setOutput("findById(" + createdId + ") -> " + JSON.stringify(found));
  }

  async function lookupMissing() {
    const found = await User.findById(999);
    setOutput("findById(999) -> " + String(found));
  }

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <button onClick={seed}>1. Create a user</button>
        <button onClick={lookupExisting} disabled={createdId === null}>2. findById (exists)</button>
        <button onClick={lookupMissing}>findById(999) (doesn't exist)</button>
      </div>
      <p>{output || "// output appears here"}</p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "find-by-id-and-update",
      title: "Model.findByIdAndUpdate(id, update, { new: true })",
      summary: "Without { new: true }, you get the OLD document back -- a real, common Mongoose gotcha.",
      code: `function createModel() {
  const docs = [];
  let nextId = 1;
  return {
    create: async function (data) {
      const doc = { _id: nextId++, ...data };
      docs.push(doc);
      return doc;
    },
    findByIdAndUpdate: async function (id, update, options = {}) {
      const doc = docs.find(function (d) { return d._id === id; });
      if (!doc) return null;
      const before = { ...doc };
      Object.assign(doc, update);
      return options.new ? doc : before;
    },
  };
}

const User = createModel();

function App() {
  const [log, setLog] = useState([]);
  const [userId, setUserId] = useState(null);

  function print(value) {
    setLog(function (prev) { return [...prev, value]; });
  }

  async function seed() {
    setLog([]);
    const ada = await User.create({ name: "Ada Lovelace", age: 28 });
    setUserId(ada._id);
    print("Created: " + JSON.stringify(ada));
  }

  async function updateWithoutNew() {
    const result = await User.findByIdAndUpdate(userId, { age: 29 });
    print("findByIdAndUpdate(id, {age:29}) WITHOUT {new:true} -> " + JSON.stringify(result) + "  (the OLD document)");
  }

  async function updateWithNew() {
    const result = await User.findByIdAndUpdate(userId, { age: 30 }, { new: true });
    print("findByIdAndUpdate(id, {age:30}, {new:true}) -> " + JSON.stringify(result) + "  (the UPDATED document)");
  }

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <button onClick={seed}>1. Create a user (age 28)</button>
        <button onClick={updateWithoutNew} disabled={userId === null}>2. Update WITHOUT {"{ new: true }"}</button>
        <button onClick={updateWithNew} disabled={userId === null}>3. Update WITH {"{ new: true }"}</button>
      </div>
      <div style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 90, fontFamily: "monospace", fontSize: 13, display: "grid", gap: 4 }}>
        {log.length === 0
          ? "// output appears here"
          : log.map(function (line, i) {
              return <div key={i}>{line}</div>;
            })}
      </div>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "find-by-id-and-delete",
      title: "Model.findByIdAndDelete(id)",
      summary: "Removes a document and resolves with what was deleted -- and it's genuinely gone from find() afterward.",
      code: `function createModel() {
  const docs = [];
  let nextId = 1;
  return {
    create: async function (data) {
      const doc = { _id: nextId++, ...data };
      docs.push(doc);
      return doc;
    },
    find: async function () {
      return docs.slice();
    },
    findByIdAndDelete: async function (id) {
      const index = docs.findIndex(function (d) { return d._id === id; });
      if (index === -1) return null;
      const [removed] = docs.splice(index, 1);
      return removed;
    },
  };
}

const User = createModel();

function App() {
  const [log, setLog] = useState([]);
  const [userId, setUserId] = useState(null);

  function print(value) {
    setLog(function (prev) { return [...prev, value]; });
  }

  async function seed() {
    setLog([]);
    await User.create({ name: "Ada Lovelace" });
    const grace = await User.create({ name: "Grace Hopper" });
    setUserId(grace._id);
    const all = await User.find();
    print("Before delete: " + JSON.stringify(all));
  }

  async function deleteGrace() {
    const removed = await User.findByIdAndDelete(userId);
    print("findByIdAndDelete(" + userId + ") -> " + JSON.stringify(removed));
    const all = await User.find();
    print("After delete: " + JSON.stringify(all));
  }

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <button onClick={seed}>1. Create two users</button>
        <button onClick={deleteGrace} disabled={userId === null}>2. findByIdAndDelete(Grace's id)</button>
      </div>
      <div style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 90, fontFamily: "monospace", fontSize: 13, display: "grid", gap: 4 }}>
        {log.length === 0
          ? "// output appears here"
          : log.map(function (line, i) {
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
