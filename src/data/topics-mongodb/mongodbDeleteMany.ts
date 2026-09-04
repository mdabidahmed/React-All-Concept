import type { Topic } from "../../types";

export const mongodbDeleteManyTopic: Topic = {
  id: "mongodb-delete-many",
  title: "MongoDB deleteMany()",
  category: "Update & Delete",
  shortExplanation: `\`collection.deleteMany(filter)\` removes **every** document matching \`filter\`, not just the first one.

- \`deletedCount\` can now be any number, not just \`0\` or \`1\`
- ==\`deleteMany({})\` deletes an entire collection's contents== — an empty filter matches everything, which makes this one of the most dangerous one-liners in MongoDB
- There's no built-in confirmation step or undo — a delete is immediate and permanent`,
  longExplanation: `\`deleteMany()\` is \`deleteOne()\`'s bulk counterpart — instead of stopping at the first matching document, it removes *every* document that satisfies the filter, in one call.

- \`deleteMany({ status: "archived" })\` removes every document where \`status\` is \`"archived"\`, however many there are — one, a hundred, or none. The filter syntax is identical to \`find()\` and \`deleteOne()\`; only the *scope* of what gets removed changes
- The returned \`deletedCount\` reports the real total — if twelve documents matched, \`deletedCount\` is \`12\`. This is a genuinely useful confirmation to check in application code after a bulk delete, since "did this do what I expected" is a very different question at scale than it is for a single-document delete
- The single most important thing to understand about \`deleteMany()\` is what happens with an **empty filter**: \`deleteMany({})\` matches every document in the collection, because there are no conditions left to fail — and so it deletes the collection's entire contents in one call, leaving an empty collection behind. This is a completely valid, intentional operation (useful for resetting test data, or clearing out a table between runs) — but it's also the classic accidental-catastrophe shape: a filter object built from a variable that unexpectedly ends up \`{}\` (an unset form field, a query parameter that didn't parse the way you expected) turns "delete the one thing the user asked to delete" into "delete everything," silently and immediately
- Unlike some other systems, there's no confirmation prompt, no recycle bin, and no automatic undo on a real MongoDB server — \`deleteMany()\` (and \`deleteOne()\`) execute immediately and permanently. The only real protections are ones you build yourself: constructing filters carefully (ideally from validated, known-shaped data rather than raw user input), requiring an explicit non-empty filter in code that wraps these calls, taking regular backups, or — for data you might need to recover — using a soft-delete pattern (an \`$set\` marking documents as \`deleted: true\` instead of truly removing them) rather than a hard \`deleteMany()\` at all
- \`deleteMany()\` with a filter that matches nothing behaves exactly like \`deleteOne()\` in that case — it's a safe no-op returning \`{ deletedCount: 0 }\`, with the collection left untouched
- Choosing \`deleteOne()\` vs. \`deleteMany()\` should mirror the same "does this filter identify one specific record, or a whole category?" reasoning from \`updateOne()\` vs. \`updateMany()\`. If you mean to remove one specific thing, filter on something unique (like \`_id\`) and use \`deleteOne()\` — using \`deleteMany()\` there still *works* correctly as long as the filter really is unique, but it reads as "delete however many match this," which is the wrong signal to leave in code meant to remove exactly one record

Because a single \`deleteMany()\` call can silently erase far more than intended, many teams adopt a habit before running one against real data: run the *equivalent* \`find()\` with the same filter first, actually look at what comes back, and only then run the delete once the result set looks right. This sandbox's \`Collection\` supports exactly that workflow — \`collection.find(filter)\` to preview, \`collection.deleteMany(filter)\` to commit — which is good practice to build as a reflex before ever pointing these methods at data that matters.`,
  examples: [
    {
      id: "delete-many-basic",
      title: "deleteMany() removes every match at once",
      summary: "A genuine Collection.deleteMany() removing all archived documents in one call.",
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
  deleteMany(filter) {
    const remaining = [];
    let deletedCount = 0;
    for (const doc of this.docs) {
      if (matchesQuery(doc, filter)) {
        deletedCount++;
      } else {
        remaining.push(doc);
      }
    }
    this.docs = remaining;
    return { deletedCount };
  }
}

function App() {
  const [collection] = useState(() => {
    const c = new Collection();
    c.insertMany([
      { name: "Report A", status: "archived" },
      { name: "Report B", status: "archived" },
      { name: "Report C", status: "active" },
    ]);
    return c;
  });
  const [result, setResult] = useState(null);

  function handleDelete() {
    setResult(collection.deleteMany({ status: "archived" }));
  }

  return (
    <div style={{ display: "grid", gap: 8 }}>
      <button onClick={handleDelete}>deleteMany({"{"} status: "archived" {"}"})</button>
      {result && <p>Result: {JSON.stringify(result)}</p>}
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6 }}>
        {JSON.stringify(collection.find({}), null, 2)}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "delete-many-empty-filter-danger",
      title: "The gotcha: deleteMany({}) wipes the collection",
      summary: "An empty filter matches everything — a common, dangerous-if-accidental call.",
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
  deleteMany(filter) {
    const remaining = [];
    let deletedCount = 0;
    for (const doc of this.docs) {
      if (matchesQuery(doc, filter)) {
        deletedCount++;
      } else {
        remaining.push(doc);
      }
    }
    this.docs = remaining;
    return { deletedCount };
  }
}

function App() {
  const [collection] = useState(() => {
    const c = new Collection();
    c.insertMany([
      { name: "Ada Lovelace" },
      { name: "Alan Turing" },
      { name: "Grace Hopper" },
    ]);
    return c;
  });
  const [result, setResult] = useState(null);

  function handleWipe() {
    setResult(collection.deleteMany({}));
  }

  return (
    <div style={{ display: "grid", gap: 8 }}>
      <p style={{ color: "#dc2626" }}>
        deleteMany({"{}"}) — an empty filter matches every document. Click carefully.
      </p>
      <button onClick={handleWipe}>Run deleteMany({"{}"})</button>
      {result && <p>Result: {JSON.stringify(result)}</p>}
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6 }}>
        {JSON.stringify(collection.find({}), null, 2)}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "delete-many-no-match",
      title: "A filter matching nothing deletes nothing",
      summary: "deletedCount is 0 and the collection is left exactly as it was.",
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
  deleteMany(filter) {
    const remaining = [];
    let deletedCount = 0;
    for (const doc of this.docs) {
      if (matchesQuery(doc, filter)) {
        deletedCount++;
      } else {
        remaining.push(doc);
      }
    }
    this.docs = remaining;
    return { deletedCount };
  }
}

function App() {
  const [results] = useState(() => {
    const c = new Collection();
    c.insertMany([{ name: "Ada Lovelace", status: "active" }]);
    const result = c.deleteMany({ status: "archived" });
    return { result, remaining: c.find({}) };
  });

  return (
    <div style={{ display: "grid", gap: 8 }}>
      <p>deleteMany({"{"} status: "archived" {"}"}) → {JSON.stringify(results.result)}</p>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6 }}>
        {JSON.stringify(results.remaining, null, 2)}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "delete-one-vs-delete-many-side-by-side",
      title: "deleteOne() vs. deleteMany(), same filter",
      summary: "Two identically-seeded collections show the scope difference directly.",
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
  deleteMany(filter) {
    const remaining = [];
    let deletedCount = 0;
    for (const doc of this.docs) {
      if (matchesQuery(doc, filter)) {
        deletedCount++;
      } else {
        remaining.push(doc);
      }
    }
    this.docs = remaining;
    return { deletedCount };
  }
}

function App() {
  const [results] = useState(() => {
    function makeSeeded() {
      const c = new Collection();
      c.insertMany([
        { name: "Draft A", status: "draft" },
        { name: "Draft B", status: "draft" },
        { name: "Published C", status: "published" },
      ]);
      return c;
    }
    const oneCollection = makeSeeded();
    const manyCollection = makeSeeded();
    const oneResult = oneCollection.deleteOne({ status: "draft" });
    const manyResult = manyCollection.deleteMany({ status: "draft" });
    return {
      oneResult,
      manyResult,
      oneRemaining: oneCollection.find({}),
      manyRemaining: manyCollection.find({}),
    };
  });

  return (
    <div style={{ display: "grid", gap: 12 }}>
      <div>
        <p>deleteOne → {JSON.stringify(results.oneResult)}</p>
        <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6 }}>
          {JSON.stringify(results.oneRemaining, null, 2)}
        </pre>
      </div>
      <div>
        <p>deleteMany → {JSON.stringify(results.manyResult)}</p>
        <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6 }}>
          {JSON.stringify(results.manyRemaining, null, 2)}
        </pre>
      </div>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
