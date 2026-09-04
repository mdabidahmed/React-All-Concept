import type { Topic } from "../../types";

export const mongodbUpdateManyTopic: Topic = {
  id: "mongodb-update-many",
  title: "MongoDB updateMany()",
  category: "Update & Delete",
  shortExplanation: `\`collection.updateMany(filter, update)\` applies \`update\` to **every** document matching \`filter\` — not just the first one.

- Same filter syntax and same operator-based \`update\` argument (\`$set\`, etc.) as \`updateOne()\`
- \`matchedCount\`/\`modifiedCount\` now reflect *how many documents in total* were touched, not just \`0\` or \`1\`
- \`updateMany({}, ...)\` matches every document in the collection, applying the update collection-wide`,
  longExplanation: `\`updateMany()\` is \`updateOne()\`'s bulk sibling — instead of stopping at the first document that satisfies the filter, it walks the *entire* collection and applies the same update to every document that matches. The filter syntax and the operator-based update document (\`$set\`, \`$inc\`, \`$unset\`, \`$push\`, all covered in the next topic) work identically to \`updateOne()\` — the only thing that changes is *how many* documents the operation is allowed to touch.

- \`updateMany({ status: "pending" }, { $set: { status: "shipped" } })\` finds every document where \`status\` is \`"pending"\` and flips all of them to \`"shipped"\` in a single call — compare this to \`updateOne()\` with the same arguments, which would only flip the first one it finds
- The returned \`matchedCount\` and \`modifiedCount\` now report real totals — if five documents matched the filter, \`matchedCount\` is \`5\`. As with \`updateOne()\`, \`modifiedCount\` can in principle be lower than \`matchedCount\` on a real server if some matched documents already held the target values and genuinely didn't change; this sandbox's simplified \`Collection\` keeps the two equal once a match is found, to keep the focus on the "how many documents were affected" question
- \`updateMany({}, { $set: { reviewed: true } })\` — an **empty filter** matches every document in the collection, so this is the pattern for a genuinely collection-wide update: "mark every single document as reviewed," "add a new field with a default value to every existing document" (a common move right after you decide a collection needs a new field going forward), and so on
- Like \`deleteMany()\`, \`updateMany({})\` is powerful and worth a moment's pause before running against real data — an update meant for one document that accidentally omits enough of the filter can silently rewrite an entire collection in one call, and there's no built-in "are you sure?" prompt on a real database driver
- \`updateMany()\` still requires the update argument to use update operators, exactly like \`updateOne()\` — a bare replacement-shaped object is rejected here too, for the same reason: without an operator, MongoDB can't tell "set only these fields" apart from "replace the whole document with this"
- Choosing between \`updateOne()\` and \`updateMany()\` is really a question about your filter's *intent*, not just its syntax: if the filter is written to identify a single, specific record (matching on a unique field like an \`_id\` or an email address), \`updateOne()\` communicates that intent directly. If the filter is written to describe a *category* of documents that should all change together (every order in a certain status, every user in a certain region), \`updateMany()\` is almost always what you actually want — using \`updateOne()\` there would silently leave the rest of the category untouched, which is an easy, quiet bug to introduce

Bulk updates like this are one of the biggest practical advantages of doing the work on the database server rather than in application code: fetching every matching document, editing each one in memory, and writing them all back individually would mean one network round-trip per document. \`updateMany()\` expresses "change all of these" as a single request and lets the database apply it directly, which is both far faster and atomic per-document — no other operation can observe a half-updated document mid-way through the batch.`,
  examples: [
    {
      id: "update-many-basic",
      title: "updateMany() applies $set to every match",
      summary: "A genuine Collection.updateMany() flipping every 'pending' document to 'shipped'.",
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
  updateMany(filter, update) {
    const hasOperator = Object.keys(update).some((key) => key.startsWith("$"));
    if (!hasOperator) {
      throw new Error("updateMany requires update operators like $set — a bare replacement object is not allowed");
    }
    let matchedCount = 0;
    this.docs = this.docs.map((doc) => {
      if (!matchesQuery(doc, filter)) return doc;
      matchedCount++;
      const updated = { ...doc };
      if (update.$set) {
        for (const key in update.$set) {
          updated[key] = update.$set[key];
        }
      }
      return updated;
    });
    return { matchedCount, modifiedCount: matchedCount };
  }
}

function App() {
  const [collection] = useState(() => {
    const c = new Collection();
    c.insertMany([
      { name: "Order A", status: "pending" },
      { name: "Order B", status: "pending" },
      { name: "Order C", status: "shipped" },
    ]);
    return c;
  });
  const [version, setVersion] = useState(0);

  function handleUpdate() {
    collection.updateMany({ status: "pending" }, { $set: { status: "shipped" } });
    setVersion(version + 1);
  }

  return (
    <div style={{ display: "grid", gap: 8 }}>
      <button onClick={handleUpdate}>updateMany({"{"} status: "pending" {"}"}, ...)</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6 }}>
        {JSON.stringify(collection.find({}), null, 2)}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "update-many-matched-count-total",
      title: "matchedCount reflects the total documents touched",
      summary: "The returned counts scale with however many documents matched, not just 0 or 1.",
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
  updateMany(filter, update) {
    let matchedCount = 0;
    this.docs = this.docs.map((doc) => {
      if (!matchesQuery(doc, filter)) return doc;
      matchedCount++;
      const updated = { ...doc };
      if (update.$set) {
        for (const key in update.$set) {
          updated[key] = update.$set[key];
        }
      }
      return updated;
    });
    return { matchedCount, modifiedCount: matchedCount };
  }
}

function App() {
  const [results] = useState(() => {
    const c = new Collection();
    c.insertMany([
      { name: "Ada Lovelace", city: "London" },
      { name: "Alan Turing", city: "London" },
      { name: "Grace Hopper", city: "New York" },
    ]);
    const londonResult = c.updateMany({ city: "London" }, { $set: { timezone: "GMT" } });
    const tokyoResult = c.updateMany({ city: "Tokyo" }, { $set: { timezone: "JST" } });
    return { londonResult, tokyoResult };
  });

  return (
    <div style={{ display: "grid", gap: 8 }}>
      <p>updateMany({"{"} city: "London" {"}"}) → {JSON.stringify(results.londonResult)}</p>
      <p>updateMany({"{"} city: "Tokyo" {"}"}) → {JSON.stringify(results.tokyoResult)}</p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "update-one-vs-update-many-side-by-side",
      title: "updateOne() vs. updateMany(), same filter",
      summary: "Two identically-seeded collections, one call each — only updateMany() changes everything.",
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
  updateOne(filter, update) {
    const index = this.docs.findIndex((doc) => matchesQuery(doc, filter));
    if (index === -1) return { matchedCount: 0, modifiedCount: 0 };
    const updated = { ...this.docs[index] };
    if (update.$set) {
      for (const key in update.$set) {
        updated[key] = update.$set[key];
      }
    }
    this.docs[index] = updated;
    return { matchedCount: 1, modifiedCount: 1 };
  }
  updateMany(filter, update) {
    let matchedCount = 0;
    this.docs = this.docs.map((doc) => {
      if (!matchesQuery(doc, filter)) return doc;
      matchedCount++;
      const updated = { ...doc };
      if (update.$set) {
        for (const key in update.$set) {
          updated[key] = update.$set[key];
        }
      }
      return updated;
    });
    return { matchedCount, modifiedCount: matchedCount };
  }
}

function App() {
  const [results] = useState(() => {
    function makeSeeded() {
      const c = new Collection();
      c.insertMany([
        { name: "Ada Lovelace", status: "pending" },
        { name: "Alan Turing", status: "pending" },
        { name: "Grace Hopper", status: "pending" },
      ]);
      return c;
    }
    const oneCollection = makeSeeded();
    const manyCollection = makeSeeded();
    oneCollection.updateOne({ status: "pending" }, { $set: { status: "done" } });
    manyCollection.updateMany({ status: "pending" }, { $set: { status: "done" } });
    return { one: oneCollection.find({}), many: manyCollection.find({}) };
  });

  return (
    <div style={{ display: "grid", gap: 12 }}>
      <div>
        <p>updateOne — only the first "pending" flips:</p>
        <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6 }}>
          {JSON.stringify(results.one, null, 2)}
        </pre>
      </div>
      <div>
        <p>updateMany — every "pending" flips:</p>
        <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6 }}>
          {JSON.stringify(results.many, null, 2)}
        </pre>
      </div>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "update-many-empty-filter",
      title: "updateMany({}) touches the whole collection",
      summary: "An empty filter matches every document, so the update applies collection-wide.",
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
  updateMany(filter, update) {
    let matchedCount = 0;
    this.docs = this.docs.map((doc) => {
      if (!matchesQuery(doc, filter)) return doc;
      matchedCount++;
      const updated = { ...doc };
      if (update.$set) {
        for (const key in update.$set) {
          updated[key] = update.$set[key];
        }
      }
      return updated;
    });
    return { matchedCount, modifiedCount: matchedCount };
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
  const [version, setVersion] = useState(0);

  function handleUpdate() {
    collection.updateMany({}, { $set: { reviewed: true } });
    setVersion(version + 1);
  }

  return (
    <div style={{ display: "grid", gap: 8 }}>
      <button onClick={handleUpdate}>updateMany({"{}"}, {"{"} $set: {"{"} reviewed: true {"}"} {"}"})</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6 }}>
        {JSON.stringify(collection.find({}), null, 2)}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
