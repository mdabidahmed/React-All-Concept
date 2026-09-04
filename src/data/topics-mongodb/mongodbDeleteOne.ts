import type { Topic } from "../../types";

export const mongodbDeleteOneTopic: Topic = {
  id: "mongodb-delete-one",
  title: "MongoDB deleteOne()",
  category: "Update & Delete",
  shortExplanation: `\`collection.deleteOne(filter)\` removes the **first** document matching \`filter\` from the collection.

- If several documents match, only the first one found is removed — the rest are left alone
- The result reports \`deletedCount\`, which is always \`0\` or \`1\`
- A filter that matches nothing simply deletes nothing — no error, \`deletedCount: 0\``,
  longExplanation: `\`deleteOne()\` is the update/delete family's simplest member — given a filter document (same shape and semantics as \`find()\`'s query), it removes exactly one matching document from the collection, permanently.

- \`deleteOne({ name: "Ada Lovelace" })\` searches for a document matching that filter and removes it from the collection outright — there's no operator language here like there is for updates, because deletion doesn't need to describe *how* to change a document, only *which one* to remove
- Just like \`updateOne()\`, \`deleteOne()\` stops after removing the **first** match — if the filter happens to match several documents, only one of them is actually deleted, and the rest remain in the collection completely untouched. This sandbox's simplified \`Collection\` removes the first match in insertion order; a real MongoDB server makes no such guarantee unless you sort first, so relying on "first" meaning anything specific is itself a bit of a trap — if you need a specific document removed, filter by something unique (like \`_id\`) rather than a field that could match more than one record
- The return value is a small result object with a single meaningful field: \`deletedCount\`, which for \`deleteOne()\` is always either \`0\` (nothing matched) or \`1\` (one document was removed) — there's no in-between
- Calling \`deleteOne()\` with a filter that matches nothing is not an error — it's a normal, silent no-op that simply returns \`{ deletedCount: 0 }\`, and the collection is left exactly as it was. This makes \`deleteOne()\` safe to call defensively (e.g. "delete this session if it still exists") without needing to check for existence first
- Deletion in MongoDB is genuinely permanent — there's no built-in undo, recycle bin, or soft-delete behavior. Applications that need to "undelete" something, or keep an audit trail of what was removed and when, typically implement that themselves — either by using an \`$set\` update to flag a document as \`deleted: true\` instead of truly removing it (a common pattern called a **soft delete**), or by copying the document into an archive collection immediately before calling \`deleteOne()\` on the original
- Filtering on a field that isn't guaranteed unique (like \`status\` or \`city\`) and calling \`deleteOne()\` expecting "just this one record" to disappear is a subtle bug — it works fine while there's only one matching document in your test data, then silently deletes the wrong one once a second matching document shows up in production. Filtering on \`_id\`, or another field your application enforces as unique, is the reliable way to guarantee \`deleteOne()\` removes the *specific* record you mean

\`deleteOne()\` pairs naturally with a prior \`findOne()\` in real application code — look a document up, confirm it's the right one (maybe checking permissions, or showing a confirmation dialog to a user), then delete it by its \`_id\`. Reaching for \`deleteOne()\` directly with a loosely-specified filter, without that lookup step first, is where accidental over-deletion tends to creep in — which is exactly the concern \`deleteMany()\`, covered next, takes to its logical extreme.`,
  examples: [
    {
      id: "delete-one-basic",
      title: "deleteOne() removes a matching document",
      summary: "A genuine Collection.deleteOne() removing one document from the array.",
      code: `function matchesQuery(doc, query) {
  for (const key in query) {
    if (doc[key] !== query[key]) return false;
  }
  return true;
}

class Collection {
  constructor() {
    this.docs = [];
    this.nextId = 1;
  }
  insertMany(docs) {
    docs.forEach((d) => this.docs.push({ _id: this.nextId++, ...d }));
  }
  find(query = {}) {
    return this.docs.filter((doc) => matchesQuery(doc, query));
  }
  deleteOne(filter) {
    const index = this.docs.findIndex((doc) => matchesQuery(doc, filter));
    if (index === -1) return { deletedCount: 0 };
    this.docs.splice(index, 1);
    return { deletedCount: 1 };
  }
}

function App() {
  const [collection] = useState(() => {
    const c = new Collection();
    c.insertMany([
      { name: "Ada Lovelace", age: 28 },
      { name: "Alan Turing", age: 41 },
    ]);
    return c;
  });
  const [version, setVersion] = useState(0);

  function handleDelete() {
    collection.deleteOne({ name: "Ada Lovelace" });
    setVersion(version + 1);
  }

  return (
    <div style={{ display: "grid", gap: 8 }}>
      <button onClick={handleDelete}>deleteOne({"{"} name: "Ada Lovelace" {"}"})</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6 }}>
        {JSON.stringify(collection.find({}), null, 2)}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "delete-one-only-first-match",
      title: "deleteOne() only removes the FIRST match",
      summary: "Three documents match the filter, but only one is actually removed.",
      code: `function matchesQuery(doc, query) {
  for (const key in query) {
    if (doc[key] !== query[key]) return false;
  }
  return true;
}

class Collection {
  constructor() {
    this.docs = [];
    this.nextId = 1;
  }
  insertMany(docs) {
    docs.forEach((d) => this.docs.push({ _id: this.nextId++, ...d }));
  }
  find(query = {}) {
    return this.docs.filter((doc) => matchesQuery(doc, query));
  }
  deleteOne(filter) {
    const index = this.docs.findIndex((doc) => matchesQuery(doc, filter));
    if (index === -1) return { deletedCount: 0 };
    this.docs.splice(index, 1);
    return { deletedCount: 1 };
  }
}

function App() {
  const [collection] = useState(() => {
    const c = new Collection();
    c.insertMany([
      { name: "Draft A", status: "draft" },
      { name: "Draft B", status: "draft" },
      { name: "Draft C", status: "draft" },
    ]);
    return c;
  });
  const [version, setVersion] = useState(0);

  function handleDelete() {
    const result = collection.deleteOne({ status: "draft" });
    setVersion(version + 1);
  }

  return (
    <div style={{ display: "grid", gap: 8 }}>
      <button onClick={handleDelete}>deleteOne({"{"} status: "draft" {"}"})</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6 }}>
        {JSON.stringify(collection.find({}), null, 2)}
      </pre>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        Click repeatedly — one "draft" document disappears per click, not all of them at once.
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "delete-one-no-match",
      title: "A filter with no match: deletedCount is 0, nothing changes",
      summary: "Calling deleteOne() with an unmatched filter is a safe, silent no-op.",
      code: `function matchesQuery(doc, query) {
  for (const key in query) {
    if (doc[key] !== query[key]) return false;
  }
  return true;
}

class Collection {
  constructor() {
    this.docs = [];
    this.nextId = 1;
  }
  insertMany(docs) {
    docs.forEach((d) => this.docs.push({ _id: this.nextId++, ...d }));
  }
  find(query = {}) {
    return this.docs.filter((doc) => matchesQuery(doc, query));
  }
  deleteOne(filter) {
    const index = this.docs.findIndex((doc) => matchesQuery(doc, filter));
    if (index === -1) return { deletedCount: 0 };
    this.docs.splice(index, 1);
    return { deletedCount: 1 };
  }
}

function App() {
  const [results] = useState(() => {
    const c = new Collection();
    c.insertMany([{ name: "Ada Lovelace" }]);
    const result = c.deleteOne({ name: "Nobody Here" });
    return { result, remaining: c.find({}) };
  });

  return (
    <div style={{ display: "grid", gap: 8 }}>
      <p>deleteOne({"{"} name: "Nobody Here" {"}"}) → {JSON.stringify(results.result)}</p>
      <p>Collection is unchanged:</p>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6 }}>
        {JSON.stringify(results.remaining, null, 2)}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "delete-one-by-unique-id",
      title: "Filtering by _id for a reliably specific delete",
      summary: "Filtering on a guaranteed-unique field is the safe way to target one exact document.",
      code: `function matchesQuery(doc, query) {
  for (const key in query) {
    if (doc[key] !== query[key]) return false;
  }
  return true;
}

class Collection {
  constructor() {
    this.docs = [];
    this.nextId = 1;
  }
  insertMany(docs) {
    docs.forEach((d) => this.docs.push({ _id: this.nextId++, ...d }));
  }
  find(query = {}) {
    return this.docs.filter((doc) => matchesQuery(doc, query));
  }
  deleteOne(filter) {
    const index = this.docs.findIndex((doc) => matchesQuery(doc, filter));
    if (index === -1) return { deletedCount: 0 };
    this.docs.splice(index, 1);
    return { deletedCount: 1 };
  }
}

function App() {
  const [collection] = useState(() => {
    const c = new Collection();
    c.insertMany([
      { name: "Ada Lovelace", city: "London" },
      { name: "Alan Turing", city: "London" },
    ]);
    return c;
  });
  const [version, setVersion] = useState(0);

  function handleDelete() {
    collection.deleteOne({ _id: 1 });
    setVersion(version + 1);
  }

  return (
    <div style={{ display: "grid", gap: 8 }}>
      <button onClick={handleDelete}>deleteOne({"{"} _id: 1 {"}"}) — targets exactly one record</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6 }}>
        {JSON.stringify(collection.find({}), null, 2)}
      </pre>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        Filtering by {"{"} city: "London" {"}"} here would also match Alan Turing — _id is unique, so it can't.
      </p>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
