import type { Topic } from "../../types";

export const mongodbUpdateOneTopic: Topic = {
  id: "mongodb-update-one",
  title: "MongoDB updateOne()",
  category: "Update & Delete",
  shortExplanation: `\`collection.updateOne(filter, update)\` finds the **first** document matching \`filter\` and applies \`update\` to it in place.

- The \`update\` argument must use **update operators** like \`$set\` — a bare object such as \`{ age: 29 }\` is not a valid update document and MongoDB rejects it
- \`{ $set: { age: 29 } }\` overwrites just the \`age\` field, leaving every other field untouched
- The result reports \`matchedCount\` (documents found) and \`modifiedCount\` (documents actually changed) separately`,
  longExplanation: `\`updateOne()\` is MongoDB's tool for changing a single existing document without replacing it wholesale. It takes two arguments — a **filter** document (exactly like the query you'd pass to \`find()\`) that selects which document to touch, and an **update** document describing *how* to change it.

- The filter works identically to \`find()\`'s query — \`{ name: "Ada Lovelace" }\` matches on equality, multiple fields form an implicit AND, and so on
- Critically, the *update* argument is not just "the new field values" — it has to be built from **update operators**, the most common being \`$set\`. \`updateOne({ name: "Ada Lovelace" }, { $set: { age: 29 } })\` reads as "find Ada's document, then set her \`age\` field to \`29\`, leaving every other field exactly as it was"
- This is a common gotcha for anyone coming from a plain-object mental model: calling \`updateOne({ name: "Ada Lovelace" }, { age: 29 })\` — a bare object with no operator — is **not** shorthand for "set the age field." Real MongoDB actually rejects this call outright, because a bare document passed as the update argument is interpreted as a request to *replace the entire matched document* with that object, and a replacement document isn't allowed to look like a partial update. This sandbox's \`Collection\` throws the same kind of error so the gotcha is visible, not just described
- If you genuinely want to replace an entire document, that's a different, deliberate operation — \`replaceOne()\` — covered in its own topic. \`updateOne()\` with \`$set\` is for surgical, single-field-or-few-fields edits
- \`updateOne()\` only ever touches **one** document, even when the filter would match several. It stops at the first match it finds — updating *every* match instead requires \`updateMany()\`, covered next. In a real MongoDB deployment there's no guaranteed "first" without an explicit sort; this sandbox's simplified \`Collection\` uses insertion order, which is enough to demonstrate the "only one document changes" behavior clearly
- The object returned by \`updateOne()\` reports two counts: \`matchedCount\` — how many documents the filter found (\`0\` or \`1\`, since it stops at the first) — and \`modifiedCount\` — how many were *actually changed* as a result. These can differ in real MongoDB: if the filter matches a document but the \`$set\` values are identical to what's already stored, the server may report \`matchedCount: 1, modifiedCount: 0\`, since nothing genuinely changed. This sandbox keeps the two counts equal for simplicity once a match is found, since the distinction matters far less than the matched-vs-not-matched case while learning
- If no document matches the filter, both counts are \`0\` and nothing in the collection is touched — no error is thrown for "nothing matched," only for a malformed update document

Because an update only ever describes a *change* rather than a full new document, \`updateOne()\` is the tool of choice any time you want to nudge one field on an existing record — bumping a status, correcting a typo, recording a timestamp — without first fetching the whole document into your application, editing it there, and sending the entire thing back over the network. The operator-based update language ($set and its siblings, covered in the next topic) is also what lets MongoDB apply the change atomically and efficiently on the server, touching only the bytes that actually changed.`,
  examples: [
    {
      id: "update-one-basic-set",
      title: "updateOne() applies $set to the first match",
      summary: "A genuine Collection.updateOne() changing one field on a matched document.",
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
    const hasOperator = Object.keys(update).some((key) => key.startsWith("$"));
    if (!hasOperator) {
      throw new Error("updateOne requires update operators like $set — a bare replacement object is not allowed");
    }
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
}

function App() {
  const [collection] = useState(() => {
    const c = new Collection();
    c.insertMany([{ name: "Ada Lovelace", age: 28, city: "London" }]);
    return c;
  });
  const [version, setVersion] = useState(0);

  function handleUpdate() {
    collection.updateOne({ name: "Ada Lovelace" }, { $set: { age: 29 } });
    setVersion(version + 1);
  }

  return (
    <div style={{ display: "grid", gap: 8 }}>
      <button onClick={handleUpdate}>updateOne: set age to 29</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6 }}>
        {JSON.stringify(collection.find({}), null, 2)}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "update-one-matched-modified-count",
      title: "matchedCount vs. a filter with no match",
      summary: "updateOne() reports how many documents it found, even when it found none.",
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
}

function App() {
  const [results] = useState(() => {
    const c = new Collection();
    c.insertMany([{ name: "Ada Lovelace", age: 28 }]);
    const matchResult = c.updateOne({ name: "Ada Lovelace" }, { $set: { age: 29 } });
    const noMatchResult = c.updateOne({ name: "Nobody Here" }, { $set: { age: 40 } });
    return { matchResult, noMatchResult };
  });

  return (
    <div style={{ display: "grid", gap: 8 }}>
      <p>Matching filter → {JSON.stringify(results.matchResult)}</p>
      <p>Filter with no match → {JSON.stringify(results.noMatchResult)}</p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "update-one-only-first-match",
      title: "updateOne() only ever touches ONE document",
      summary: "Three documents match the filter, but only the first one changes.",
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
}

function App() {
  const [collection] = useState(() => {
    const c = new Collection();
    c.insertMany([
      { name: "Ada Lovelace", status: "pending" },
      { name: "Alan Turing", status: "pending" },
      { name: "Grace Hopper", status: "pending" },
    ]);
    return c;
  });
  const [version, setVersion] = useState(0);

  function handleUpdate() {
    collection.updateOne({ status: "pending" }, { $set: { status: "done" } });
    setVersion(version + 1);
  }

  return (
    <div style={{ display: "grid", gap: 8 }}>
      <button onClick={handleUpdate}>updateOne({"{"} status: "pending" {"}"}, ...)</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6 }}>
        {JSON.stringify(collection.find({}), null, 2)}
      </pre>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        Only the first "pending" document flips to "done" — click again to flip the next one.
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "update-one-bare-object-gotcha",
      title: "The gotcha: an update with no operator is rejected",
      summary: "Passing a bare object instead of { $set: ... } throws, just like real MongoDB.",
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
  updateOne(filter, update) {
    const hasOperator = Object.keys(update).some((key) => key.startsWith("$"));
    if (!hasOperator) {
      throw new Error("updateOne requires update operators like $set — a bare replacement object is not allowed");
    }
    const index = this.docs.findIndex((doc) => matchesQuery(doc, filter));
    if (index === -1) return { matchedCount: 0, modifiedCount: 0 };
    const updated = { ...this.docs[index], ...update.$set };
    this.docs[index] = updated;
    return { matchedCount: 1, modifiedCount: 1 };
  }
}

function App() {
  const [collection] = useState(() => {
    const c = new Collection();
    c.insertMany([{ name: "Ada Lovelace", age: 28 }]);
    return c;
  });
  const [message, setMessage] = useState("Click the button to try an update with no operator.");

  function tryBareUpdate() {
    try {
      collection.updateOne({ name: "Ada Lovelace" }, { age: 29 });
      setMessage("No error — this should not happen!");
    } catch (err) {
      setMessage("Error thrown: " + err.message);
    }
  }

  return (
    <div style={{ display: "grid", gap: 8 }}>
      <button onClick={tryBareUpdate}>updateOne(filter, {"{"} age: 29 {"}"}) — no $set</button>
      <p style={{ color: "#dc2626" }}>{message}</p>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
