import type { Topic } from "../../types";

export const mongodbReplaceOneTopic: Topic = {
  id: "mongodb-replace-one",
  title: "MongoDB replaceOne()",
  category: "Update & Delete",
  shortExplanation: `\`collection.replaceOne(filter, replacement)\` swaps out the **entire** matched document for \`replacement\` — every old field is gone unless it's in the new document.

- \`_id\` is the one exception — it's preserved from the original document, even though the replacement document doesn't (and can't meaningfully) specify it
- No update operators here — \`replacement\` is a plain document describing the *whole new shape*, not a set of instructions
- Contrast with \`updateOne()\`'s \`$set\`: \`$set\` only touches the fields you name; \`replaceOne()\` discards everything you *don't* name`,
  longExplanation: `\`replaceOne()\` sits alongside \`updateOne()\` and \`deleteOne()\` as the third way to change a single existing document — but it does something genuinely different from both: it doesn't edit the document in place, and it doesn't remove it either. It swaps the whole thing out for a brand new document.

- \`replaceOne(filter, replacement)\` finds the first document matching \`filter\`, exactly like \`updateOne()\` and \`deleteOne()\` do, but then throws away everything about the original document *except its \`_id\`*, and puts \`replacement\` in its place
- The \`replacement\` argument is a plain document — no \`$set\`, no operators at all. That's not an oversight; it's the defining difference from \`updateOne()\`. An update operator document describes a set of *changes* to apply to whatever's already there; a replacement document describes the *entire new state* of the record, full stop. Anything the old document had that isn't repeated in \`replacement\` simply doesn't exist afterward
- \`_id\` is the one field \`replaceOne()\` won't let you change — real MongoDB either rejects a replacement document that tries to set a different \`_id\`, or (as this sandbox's simplified \`Collection\` does) simply ignores whatever \`_id\` you pass and keeps the original. Either way, the practical rule is the same: a document's identity survives a \`replaceOne()\` even though everything else about it might not
- This makes the choice between \`updateOne()\` with \`$set\` and \`replaceOne()\` genuinely consequential, not just a style preference. Say a user document has \`{ name, age, city, createdAt }\` and you want to update just the \`age\`: \`updateOne({ _id }, { $set: { age: 29 } })\` leaves \`name\`, \`city\`, and \`createdAt\` exactly as they were. Calling \`replaceOne({ _id }, { name: "Ada Lovelace", age: 29 })\` instead — even though the *intent* was "just change the age" — silently drops \`city\` and \`createdAt\` from the document forever, because they weren't repeated in the replacement object. This is one of the easier ways to accidentally lose data in MongoDB: reaching for \`replaceOne()\` (or building a replacement document from an incomplete in-memory copy) when what was actually meant was a narrow, single-field \`$set\`
- \`replaceOne()\` does have a real, legitimate use: when you genuinely want to swap a document's entire content wholesale — importing a corrected record from an external system, or an application flow where the client always sends the *complete* new state of a document (like a form that submits the whole record on every save) rather than a diff of what changed. In those cases, replacement is exactly the right tool, and reusing \`updateOne()\`/\`$set\` for it would actually be more awkward, requiring you to compute which fields changed rather than just sending the whole new document
- Like \`updateOne()\`, \`replaceOne()\` returns \`matchedCount\`/\`modifiedCount\`, and behaves as a safe no-op — \`{ matchedCount: 0, modifiedCount: 0 }\` — when the filter matches nothing

The rule of thumb worth internalizing: reach for \`updateOne()\` with \`$set\` (or the other update operators) as your *default* for changing an existing document, since it's inherently safer — it can only ever affect the fields you explicitly name. Reach for \`replaceOne()\` only when you deliberately mean "this document's entire content should become this new thing," and you're confident the replacement object really does represent the complete record you want stored, not just the part of it you happened to be looking at.`,
  examples: [
    {
      id: "replace-one-basic",
      title: "replaceOne() swaps the entire document",
      summary: "A genuine Collection.replaceOne() replacing a document's whole content.",
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
  replaceOne(filter, replacement) {
    const index = this.docs.findIndex((doc) => matchesQuery(doc, filter));
    if (index === -1) return { matchedCount: 0, modifiedCount: 0 };
    const preservedId = this.docs[index]._id;
    this.docs[index] = { _id: preservedId, ...replacement };
    return { matchedCount: 1, modifiedCount: 1 };
  }
}

function App() {
  const [collection] = useState(() => {
    const c = new Collection();
    c.insertMany([{ name: "Ada Lovelace", age: 28, city: "London", role: "Mathematician" }]);
    return c;
  });
  const [version, setVersion] = useState(0);

  function handleReplace() {
    collection.replaceOne({ name: "Ada Lovelace" }, { name: "Ada Lovelace", age: 29 });
    setVersion(version + 1);
  }

  return (
    <div style={{ display: "grid", gap: 8 }}>
      <button onClick={handleReplace}>
        replaceOne(filter, {"{"} name: "Ada Lovelace", age: 29 {"}"})
      </button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6 }}>
        {JSON.stringify(collection.find({}), null, 2)}
      </pre>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        "city" and "role" are gone — they weren't repeated in the replacement document.
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "replace-one-preserves-id",
      title: "_id survives a replaceOne(), even if you try to change it",
      summary: "The replacement's own _id (if any) is ignored — the original _id is always kept.",
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
  replaceOne(filter, replacement) {
    const index = this.docs.findIndex((doc) => matchesQuery(doc, filter));
    if (index === -1) return { matchedCount: 0, modifiedCount: 0 };
    const preservedId = this.docs[index]._id;
    const { _id, ...rest } = replacement;
    this.docs[index] = { _id: preservedId, ...rest };
    return { matchedCount: 1, modifiedCount: 1 };
  }
}

function App() {
  const [result] = useState(() => {
    const c = new Collection();
    c.insertMany([{ name: "Ada Lovelace" }]);
    c.replaceOne({ name: "Ada Lovelace" }, { _id: 9999, name: "Ada, Countess of Lovelace" });
    return c.find({})[0];
  });

  return (
    <div style={{ display: "grid", gap: 8 }}>
      <p>Replacement document tried to set _id to 9999:</p>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6 }}>
        {JSON.stringify(result, null, 2)}
      </pre>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        Stored _id is still the original one — replaceOne() never lets the identity change.
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "update-set-vs-replace-side-by-side",
      title: "The critical contrast: $set keeps fields, replaceOne() drops them",
      summary: "Same starting document, same 'change the age' intent, very different results.",
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
  replaceOne(filter, replacement) {
    const index = this.docs.findIndex((doc) => matchesQuery(doc, filter));
    if (index === -1) return { matchedCount: 0, modifiedCount: 0 };
    const preservedId = this.docs[index]._id;
    this.docs[index] = { _id: preservedId, ...replacement };
    return { matchedCount: 1, modifiedCount: 1 };
  }
}

function App() {
  const [results] = useState(() => {
    function makeSeeded() {
      const c = new Collection();
      c.insertMany([{ name: "Ada Lovelace", age: 28, city: "London" }]);
      return c;
    }
    const updatedCollection = makeSeeded();
    const replacedCollection = makeSeeded();

    updatedCollection.updateOne({ name: "Ada Lovelace" }, { $set: { age: 29 } });
    replacedCollection.replaceOne({ name: "Ada Lovelace" }, { name: "Ada Lovelace", age: 29 });

    return { updated: updatedCollection.find({}), replaced: replacedCollection.find({}) };
  });

  return (
    <div style={{ display: "grid", gap: 12 }}>
      <div>
        <p>updateOne({"{"} $set: {"{"} age: 29 {"}"} {"}"}) — "city" survives:</p>
        <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6 }}>
          {JSON.stringify(results.updated, null, 2)}
        </pre>
      </div>
      <div>
        <p>replaceOne({"{"} name, age {"}"}) — "city" is gone:</p>
        <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6 }}>
          {JSON.stringify(results.replaced, null, 2)}
        </pre>
      </div>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "replace-one-no-match",
      title: "replaceOne() with no match: a safe no-op",
      summary: "matchedCount is 0 and the collection is left completely untouched.",
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
  replaceOne(filter, replacement) {
    const index = this.docs.findIndex((doc) => matchesQuery(doc, filter));
    if (index === -1) return { matchedCount: 0, modifiedCount: 0 };
    const preservedId = this.docs[index]._id;
    this.docs[index] = { _id: preservedId, ...replacement };
    return { matchedCount: 1, modifiedCount: 1 };
  }
}

function App() {
  const [results] = useState(() => {
    const c = new Collection();
    c.insertMany([{ name: "Ada Lovelace", age: 28 }]);
    const result = c.replaceOne({ name: "Nobody Here" }, { name: "Someone Else" });
    return { result, remaining: c.find({}) };
  });

  return (
    <div style={{ display: "grid", gap: 8 }}>
      <p>replaceOne({"{"} name: "Nobody Here" {"}"}, ...) → {JSON.stringify(results.result)}</p>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6 }}>
        {JSON.stringify(results.remaining, null, 2)}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
