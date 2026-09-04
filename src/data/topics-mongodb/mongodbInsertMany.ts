import type { Topic } from "../../types";

export const mongodbInsertManyTopic: Topic = {
  id: "mongodb-insert-many",
  title: "MongoDB insertMany()",
  category: "Create & Read",
  shortExplanation: `\`collection.insertMany(docs)\` inserts an **array** of documents in a single call — much faster than calling \`insertOne()\` in a loop.

- Each document gets its own \`_id\` assigned exactly like \`insertOne()\` would: auto-generated if missing, used as-is if supplied
- The result reports \`insertedIds\`, one per inserted document, in the same order as the input array
- By default the insert is **ordered**: if one document fails partway through, MongoDB stops and leaves the rest of the batch un-inserted — pass \`{ ordered: false }\` to keep going instead`,
  longExplanation: `\`insertMany()\` does exactly what \`insertOne()\` does, just for a whole batch of documents at once — and that "at once" matters more than it might first appear. Sending one hundred documents as a single \`insertMany()\` call is one round trip to the server; sending them as one hundred separate \`insertOne()\` calls is one hundred round trips. For any real bulk-seed, import, or batch-processing job, \`insertMany()\` is dramatically more efficient.

- Call it with an array: \`db.users.insertMany([{ name: "Ada" }, { name: "Alan" }, { name: "Grace" }])\`. Every element of the array is inserted as its own independent document, exactly as if you'd called \`insertOne()\` on each one in turn.
- Each document is assigned its own \`_id\` following the exact same rule as \`insertOne()\`: if a document already has an \`_id\`, that value is kept; if it doesn't, one is generated for it. Documents in the same \`insertMany()\` call can freely mix both styles — some can arrive with their own id, others without.
- The result object reports \`insertedIds\` — the id ultimately assigned to every successfully inserted document, in the same order the documents were given. This is what you'd loop over afterward if you needed to immediately reference every newly created document (real MongoDB drivers actually return this as an object keyed by each document's array index rather than a plain array, but the idea — "here is every id, matched up to what you inserted" — is identical; this sandbox keeps it as a simple array for clarity).
- **Ordered vs. unordered** is the option most worth understanding early. By default (\`ordered: true\`), MongoDB inserts documents from the array **in order**, and if any single document fails (most commonly a duplicate \`_id\`), it stops immediately — every document before the failure is inserted, but everything from the failure onward is not attempted at all.
- Passing \`{ ordered: false }\` changes that: MongoDB attempts to insert *every* document in the batch regardless of individual failures, and reports back everything that failed at the end, rather than stopping at the first problem. This trades "stop at the first sign of trouble" for "get as much done as possible" — useful for something like a bulk import where one bad record (say, a duplicate you've already imported before) shouldn't block the other 999 good ones behind it.
- A common real-world pattern: seeding sample or reference data when an application first starts up, or bulk-loading records from an external file (a CSV import, a data migration from another system) — anywhere you already have a whole collection of ready-made documents in memory and want them all persisted in one motion instead of looping over \`insertOne()\` yourself.
- If the array passed to \`insertMany()\` is empty, it's simply a no-op — no documents are inserted, and \`insertedIds\` comes back as an empty list, with no error raised.

The mental model worth keeping is: \`insertMany()\` is not some fundamentally different operation from \`insertOne()\` — it's the exact same per-document rules (auto-\`_id\`, duplicate rejection) applied to a whole array in one trip to the server, with one extra dial (\`ordered\`) controlling what happens when something in that batch goes wrong partway through.`,
  examples: [
    {
      id: "insert-many-bulk-seed",
      title: "Seeding sample data with one insertMany() call",
      summary: "A genuine Collection.insertMany() inserting several documents, each with its own generated id.",
      code: `class Collection {
  constructor() {
    this.docs = [];
    this.nextId = 1;
  }
  insertOne(doc) {
    if (doc._id !== undefined) {
      const exists = this.docs.some((d) => d._id === doc._id);
      if (exists) throw new Error("E11000 duplicate key error: _id " + doc._id);
      this.docs.push({ ...doc });
      return { insertedId: doc._id };
    }
    const generatedId = this.nextId++;
    this.docs.push({ _id: generatedId, ...doc });
    return { insertedId: generatedId };
  }
  insertMany(docs) {
    const insertedIds = docs.map((d) => this.insertOne(d).insertedId);
    return { acknowledged: true, insertedIds };
  }
}

function App() {
  const [result, setResult] = useState(null);
  const [collection] = useState(() => new Collection());

  function seed() {
    const r = collection.insertMany([
      { name: "Ada Lovelace", role: "Mathematician" },
      { name: "Grace Hopper", role: "Rear Admiral" },
      { name: "Alan Turing", role: "Cryptographer" },
    ]);
    setResult(r);
  }

  return (
    <div style={{ display: "grid", gap: 8 }}>
      <button onClick={seed}>insertMany() — seed 3 documents</button>
      {result && (
        <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6 }}>
          {"Result: " + JSON.stringify(result) + "\\n\\nStored docs:\\n" + JSON.stringify(collection.docs, null, 2)}
        </pre>
      )}
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "insert-many-mixed-ids",
      title: "Mixing custom and auto-generated ids in one call",
      summary: "Some documents supply their own _id, others get one generated — within the same insertMany().",
      code: `class Collection {
  constructor() {
    this.docs = [];
    this.nextId = 1;
  }
  insertOne(doc) {
    if (doc._id !== undefined) {
      this.docs.push({ ...doc });
      return { insertedId: doc._id };
    }
    const generatedId = this.nextId++;
    this.docs.push({ _id: generatedId, ...doc });
    return { insertedId: generatedId };
  }
  insertMany(docs) {
    const insertedIds = docs.map((d) => this.insertOne(d).insertedId);
    return { acknowledged: true, insertedIds };
  }
}

function App() {
  const [collection] = useState(() => new Collection());

  const result = collection.insertMany([
    { _id: "sku-100", name: "Keyboard" },
    { name: "Mouse" },
    { _id: "sku-102", name: "Monitor" },
    { name: "Webcam" },
  ]);

  return (
    <div style={{ display: "grid", gap: 8 }}>
      <p>insertedIds (in the same order as the input array):</p>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6 }}>
        {JSON.stringify(result.insertedIds, null, 2)}
      </pre>
      <p>Stored documents:</p>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6 }}>
        {JSON.stringify(collection.docs, null, 2)}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "insert-many-ordered-stops-at-failure",
      title: "Ordered (default): a failure stops the rest of the batch",
      summary: "With ordered inserts, everything after the first duplicate-id failure is never attempted.",
      code: `class Collection {
  constructor() {
    this.docs = [];
    this.nextId = 1;
  }
  insertOne(doc) {
    if (doc._id !== undefined) {
      const exists = this.docs.some((d) => d._id === doc._id);
      if (exists) throw new Error("duplicate key: _id " + doc._id);
      this.docs.push({ ...doc });
      return { insertedId: doc._id };
    }
    const generatedId = this.nextId++;
    this.docs.push({ _id: generatedId, ...doc });
    return { insertedId: generatedId };
  }
  insertMany(docs, options = {}) {
    const ordered = options.ordered !== false;
    const insertedIds = [];
    const failures = [];
    for (const doc of docs) {
      try {
        insertedIds.push(this.insertOne(doc).insertedId);
      } catch (err) {
        failures.push(err.message);
        if (ordered) break;
      }
    }
    return { acknowledged: true, insertedIds, failures };
  }
}

function App() {
  const [collection] = useState(() => {
    const c = new Collection();
    c.insertOne({ _id: "sku-2", name: "Already here" });
    return c;
  });

  const result = collection.insertMany([
    { _id: "sku-1", name: "First" },
    { _id: "sku-2", name: "Duplicate — will fail" },
    { _id: "sku-3", name: "Never attempted (ordered stops here)" },
  ]);

  return (
    <div style={{ display: "grid", gap: 8 }}>
      <p>Result (ordered, default): {JSON.stringify(result)}</p>
      <p>Only "sku-1" made it in before the stop:</p>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6 }}>
        {JSON.stringify(collection.docs, null, 2)}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "insert-many-unordered-keeps-going",
      title: "Unordered: keep going past a failure",
      summary: "{ ordered: false } inserts every valid document, collecting failures instead of stopping.",
      code: `class Collection {
  constructor() {
    this.docs = [];
    this.nextId = 1;
  }
  insertOne(doc) {
    if (doc._id !== undefined) {
      const exists = this.docs.some((d) => d._id === doc._id);
      if (exists) throw new Error("duplicate key: _id " + doc._id);
      this.docs.push({ ...doc });
      return { insertedId: doc._id };
    }
    const generatedId = this.nextId++;
    this.docs.push({ _id: generatedId, ...doc });
    return { insertedId: generatedId };
  }
  insertMany(docs, options = {}) {
    const ordered = options.ordered !== false;
    const insertedIds = [];
    const failures = [];
    for (const doc of docs) {
      try {
        insertedIds.push(this.insertOne(doc).insertedId);
      } catch (err) {
        failures.push(err.message);
        if (ordered) break;
      }
    }
    return { acknowledged: true, insertedIds, failures };
  }
}

function App() {
  const [collection] = useState(() => {
    const c = new Collection();
    c.insertOne({ _id: "sku-2", name: "Already here" });
    return c;
  });

  const result = collection.insertMany(
    [
      { _id: "sku-1", name: "First" },
      { _id: "sku-2", name: "Duplicate — will fail, but we keep going" },
      { _id: "sku-3", name: "Still attempted" },
    ],
    { ordered: false }
  );

  return (
    <div style={{ display: "grid", gap: 8 }}>
      <p>Result ({"{"} ordered: false {"}"}): {JSON.stringify(result)}</p>
      <p>Both "sku-1" and "sku-3" made it in — only the duplicate was skipped:</p>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6 }}>
        {JSON.stringify(collection.docs, null, 2)}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
