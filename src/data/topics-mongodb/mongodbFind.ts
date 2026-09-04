import type { Topic } from "../../types";

export const mongodbFindTopic: Topic = {
  id: "mongodb-find",
  title: "MongoDB find()",
  category: "Create & Read",
  shortExplanation: `\`collection.find(query)\` returns every document matching a query filter — an empty query \`{}\` matches everything.

- \`find({ age: 28 })\` — documents where \`age\` equals exactly \`28\`
- \`find()\` returns a **cursor** over potentially many documents; \`findOne()\` returns a single matching document (or \`null\`)
- Matching multiple fields in one query object is an implicit **AND**`,
  longExplanation: `\`find()\` is the core read operation in MongoDB — given a **query document** describing what to match, it returns every document in the collection that satisfies it. The query language itself is just... more documents, which keeps things consistent: the shape you use to *describe what you're looking for* looks a lot like the shape of the data itself.

- \`db.users.find({ age: 28 })\` matches every document where the \`age\` field is exactly \`28\` — a bare value in a query field means "must equal this exactly"
- \`db.users.find({})\` — an empty query object matches **every** document in the collection, since there are no conditions to fail
- \`db.users.find({ age: 28, city: "London" })\` matches documents where **both** conditions hold — listing multiple fields in one query object is an implicit **AND**. (An explicit \`$or\`/\`$and\` also exists for more complex logic, covered in the next topic)
- \`findOne(query)\` behaves like \`find(query)\` but returns just the **first** matching document directly (or \`null\` if nothing matches) — useful when you only expect (or only care about) one result, like looking up a user by a unique field
- In a real MongoDB driver, \`find()\` technically returns a **cursor** — an object that lazily fetches matching documents in batches rather than loading everything into memory at once — but you almost always immediately convert it to an array (\`.toArray()\`) or iterate it, so it's easiest to think of it as "returns a list of matching documents" while learning
- Querying by a nested field uses **dot notation** as a string key: \`find({ "address.city": "London" })\` reaches into an embedded document's field — this is covered in more depth once embedded documents are introduced later in this subject

Real MongoDB queries run against an actual server over a network connection — this sandbox instead runs a small, genuinely-working in-memory \`Collection\` class implementing the same \`insertOne\`/\`insertMany\`/\`find\`/\`findOne\` methods with real matching logic, so the query syntax and behavior you see here is identical to what a real MongoDB driver would do.`,
  examples: [
    {
      id: "collection-insert-and-find-all",
      title: "A working Collection: insertMany + find(all)",
      summary: "A genuine in-memory implementation of MongoDB's core insert/find API.",
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
  insertOne(doc) {
    const withId = { _id: this.nextId++, ...doc };
    this.docs.push(withId);
    return { insertedId: withId._id };
  }
  insertMany(docs) {
    return { insertedIds: docs.map((d) => this.insertOne(d).insertedId) };
  }
  find(query = {}) {
    return this.docs.filter((doc) => matchesQuery(doc, query));
  }
}

function App() {
  const [users] = useState(() => {
    const c = new Collection();
    c.insertMany([
      { name: "Ada Lovelace", age: 28, city: "London" },
      { name: "Grace Hopper", age: 34, city: "New York" },
      { name: "Alan Turing", age: 28, city: "London" },
    ]);
    return c;
  });

  const allDocs = users.find({});

  return (
    <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6 }}>
      {JSON.stringify(allDocs, null, 2)}
    </pre>
  );
}

render(<App />);`,
    },
    {
      id: "find-with-equality",
      title: "find() with an equality filter",
      summary: "Only documents matching age: 28 come back.",
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
}

function App() {
  const [users] = useState(() => {
    const c = new Collection();
    c.insertMany([
      { name: "Ada Lovelace", age: 28 },
      { name: "Grace Hopper", age: 34 },
      { name: "Alan Turing", age: 28 },
    ]);
    return c;
  });

  const results = users.find({ age: 28 });

  return (
    <div style={{ display: "grid", gap: 8 }}>
      <p>users.find({"{"} age: 28 {"}"}) →</p>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6 }}>
        {JSON.stringify(results, null, 2)}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "find-multiple-fields-and",
      title: "Multiple fields in one query = implicit AND",
      summary: "Both age and city must match for a document to be returned.",
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
}

function App() {
  const [users] = useState(() => {
    const c = new Collection();
    c.insertMany([
      { name: "Ada Lovelace", age: 28, city: "London" },
      { name: "Alan Turing", age: 28, city: "Manchester" },
    ]);
    return c;
  });

  const results = users.find({ age: 28, city: "London" });

  return (
    <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6 }}>
      {JSON.stringify(results, null, 2)}
    </pre>
  );
}

render(<App />);`,
    },
    {
      id: "findone-vs-find",
      title: "findOne() vs. find()",
      summary: "findOne returns a single document (or null) instead of an array.",
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
  findOne(query = {}) {
    return this.docs.find((doc) => matchesQuery(doc, query)) ?? null;
  }
}

function App() {
  const [users] = useState(() => {
    const c = new Collection();
    c.insertMany([{ name: "Ada Lovelace", age: 28 }]);
    return c;
  });

  const found = users.findOne({ name: "Ada Lovelace" });
  const missing = users.findOne({ name: "Nobody Here" });

  return (
    <div style={{ display: "grid", gap: 8 }}>
      <p>findOne (match): {JSON.stringify(found)}</p>
      <p>findOne (no match): {String(missing)}</p>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
