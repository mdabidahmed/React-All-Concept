import type { Topic } from "../../types";

export const mongodbIndexesIntroTopic: Topic = {
  id: "mongodb-indexes-intro",
  title: "MongoDB Introduction to Indexes",
  category: "Indexes & Performance",
  shortExplanation: `Without an index, MongoDB answers a query by checking **every single document** in a collection — a \`==collection scan==\` — which gets slower as the collection grows.

- An **index** is a separate, ordered lookup structure built on one or more fields, letting MongoDB jump straight to matching documents instead of scanning all of them
- Every collection already has one index for free: the \`_id\` field is indexed automatically the moment the collection is created
- Indexes trade **write cost** for **read speed**: every insert/update must also update each index, and each index consumes extra disk/memory — so indexes are a deliberate tradeoff, not a free win`,
  longExplanation: `Ask MongoDB to find documents matching some condition, and it needs a strategy for finding them. With no help, that strategy is a \`==collection scan==\`: walk every document in the collection, one by one, and check whether it matches. This always produces the correct answer, but its cost grows directly with the size of the collection — a scan over 100 documents is instant, a scan over 50 million documents on every request is not.

An **index** exists to avoid that. It's a separate data structure — conceptually similar to the index at the back of a textbook — that keeps values from a chosen field in sorted order alongside a pointer back to the full document. Instead of reading every page (document) to find every mention of a topic (value), you jump straight to the right spot in the index and follow the pointer. Looking a value up in a well-built index is close to instant regardless of how large the collection grows, which is the entire point: it changes a query's cost from "grows with collection size" to "roughly constant."

You already have one index without asking for it: MongoDB automatically creates an index on the \`_id\` field the moment a collection is created, specifically because \`_id\` is the field most commonly used to look up a single document, and because MongoDB itself relies on it internally (e.g., to guarantee uniqueness). Every other field — \`email\`, \`city\`, \`createdAt\`, anything else you query on — gets **no** index unless you explicitly create one, which is why an app that suddenly feels slow as its data grows is, very often, simply missing an index on whatever field its slowest queries filter by.

Indexes are not free, though, which is why MongoDB doesn't just index every field automatically:

- **Write cost**: every \`insertOne\`, \`updateOne\`, or \`deleteOne\` that touches an indexed field must also update every index built on that field, not just the underlying document. A collection with five indexes pays that update cost five extra times on every write. This is exactly why indexes are described as trading read speed for write speed — reads get dramatically faster, writes get slightly slower
- **Storage cost**: an index is a real, separate structure that takes up its own space in memory and on disk, on top of the documents themselves. A collection with many indexes, or indexes on large fields, can end up spending a meaningful fraction of its total storage on indexes rather than data
- **Diminishing (and sometimes negative) returns**: an index only helps if it matches how a collection is actually queried. An index nobody's queries ever use is pure overhead — the write and storage cost, none of the read benefit — which is why real-world index design starts from looking at actual slow queries, not from indexing every field "just in case"

Since this sandbox has no real MongoDB server, this topic (and the next one) build a small, genuinely-measured comparison: a JavaScript array standing in for an unindexed collection, searched with a plain linear scan, versus a \`==Map==\` — JavaScript's native hash-map structure — standing in for an index, built once and then looked up by key. Both run for real, timed with \`performance.now()\`, over the same generated data, so the numbers you see are real measurements of the same fundamental tradeoff a real database index makes, not a simulation of one.`,
  examples: [
    {
      id: "scan-vs-index-timing",
      title: "Collection scan vs. an indexed Map — a real timing comparison",
      summary: "Genuinely measured: looking up documents by scanning an array vs. a pre-built Map, timed with performance.now().",
      code: `function generateDocs(n) {
  const cities = ["London", "Paris", "Berlin", "Madrid", "Rome", "Austin", "Denver", "Seattle"];
  const docs = [];
  for (let i = 0; i < n; i++) {
    docs.push({
      _id: i,
      email: "user" + i + "@example.com",
      city: cities[i % cities.length],
      age: 18 + (i % 50),
    });
  }
  return docs;
}

function collectionScanFind(docs, field, value) {
  let examined = 0;
  for (let i = 0; i < docs.length; i++) {
    examined++;
    if (docs[i][field] === value) return { doc: docs[i], examined };
  }
  return { doc: null, examined };
}

function buildIndex(docs, field) {
  const map = new Map();
  for (let i = 0; i < docs.length; i++) {
    map.set(docs[i][field], docs[i]);
  }
  return map;
}

const DOC_COUNT = 6000;
const LOOKUPS = 400;

function App() {
  const [docs] = useState(() => generateDocs(DOC_COUNT));
  const [index] = useState(() => buildIndex(docs, "email"));
  const [result, setResult] = useState(null);

  function runComparison() {
    const targets = [];
    for (let i = 0; i < LOOKUPS; i++) {
      targets.push("user" + Math.floor(Math.random() * DOC_COUNT) + "@example.com");
    }

    const scanStart = performance.now();
    for (const t of targets) collectionScanFind(docs, "email", t);
    const scanEnd = performance.now();

    const indexStart = performance.now();
    for (const t of targets) index.get(t);
    const indexEnd = performance.now();

    setResult({
      scanMs: (scanEnd - scanStart).toFixed(3),
      indexMs: (indexEnd - indexStart).toFixed(3),
    });
  }

  return (
    <div style={{ display: "grid", gap: 8 }}>
      <p>
        {DOC_COUNT} documents, {LOOKUPS} lookups by "email" — once as a real collection scan, once via a real
        pre-built Map (an index).
      </p>
      <button onClick={runComparison}>Run timing comparison</button>
      {result && (
        <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6 }}>
          {"Collection scan  (" + LOOKUPS + " lookups): " + result.scanMs + " ms\\n" +
            "Indexed Map lookup (" + LOOKUPS + " lookups): " + result.indexMs + " ms"}
        </pre>
      )}
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        These are real measurements taken with performance.now() in your browser right now — click a few times to
        see the numbers vary slightly but stay in the same ballpark.
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "default-id-index",
      title: "The default _id index",
      summary: "Every collection is indexed by _id automatically, even before you create any index yourself.",
      code: `class Collection {
  constructor(docs) {
    this.docs = docs;
    // MongoDB builds this automatically — no createIndex() call needed.
    this.idIndex = new Map();
    for (const doc of docs) this.idIndex.set(doc._id, doc);
  }
  findById(id) {
    // Uses the automatic _id index: an O(1) Map lookup.
    return this.idIndex.get(id) || null;
  }
  findByFieldScan(field, value) {
    // No index exists for arbitrary fields — a full scan is the only option.
    for (const doc of this.docs) {
      if (doc[field] === value) return doc;
    }
    return null;
  }
}

function App() {
  const [collection] = useState(
    () =>
      new Collection([
        { _id: 1, name: "Ada Lovelace", email: "ada@example.com" },
        { _id: 2, name: "Grace Hopper", email: "grace@example.com" },
        { _id: 3, name: "Alan Turing", email: "alan@example.com" },
      ])
  );

  const byId = collection.findById(2);
  const byEmailScan = collection.findByFieldScan("email", "alan@example.com");

  return (
    <div style={{ display: "grid", gap: 8 }}>
      <p>findById(2) — uses the automatic _id index (a real Map lookup):</p>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6 }}>
        {JSON.stringify(byId, null, 2)}
      </pre>
      <p>findByFieldScan("email", ...) — no index exists on "email", so every document is checked:</p>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6 }}>
        {JSON.stringify(byEmailScan, null, 2)}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "index-write-cost",
      title: "The tradeoff: indexes speed up reads, but slow down writes",
      summary: "A real timing comparison of inserting documents with vs. without also maintaining an index.",
      code: `const INSERT_COUNT = 8000;

function insertPlain(n) {
  const docs = [];
  const start = performance.now();
  for (let i = 0; i < n; i++) {
    docs.push({ _id: i, email: "user" + i + "@example.com" });
  }
  const end = performance.now();
  return { docs, ms: end - start };
}

function insertWithIndexMaintained(n) {
  const docs = [];
  const index = new Map();
  const start = performance.now();
  for (let i = 0; i < n; i++) {
    const doc = { _id: i, email: "user" + i + "@example.com" };
    docs.push(doc);
    index.set(doc.email, doc); // every write now also updates the index
  }
  const end = performance.now();
  return { docs, index, ms: end - start };
}

function App() {
  const [result, setResult] = useState(null);

  function runComparison() {
    const withoutIndex = insertPlain(INSERT_COUNT);
    const withIndex = insertWithIndexMaintained(INSERT_COUNT);
    setResult({
      withoutMs: withoutIndex.ms.toFixed(3),
      withMs: withIndex.ms.toFixed(3),
    });
  }

  return (
    <div style={{ display: "grid", gap: 8 }}>
      <p>Inserting {INSERT_COUNT} documents, with vs. without also maintaining a Map index on "email":</p>
      <button onClick={runComparison}>Run write-cost comparison</button>
      {result && (
        <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6 }}>
          {"Insert only (no index):        " + result.withoutMs + " ms\\n" +
            "Insert + maintain one index:  " + result.withMs + " ms"}
        </pre>
      )}
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        Real MongoDB indexes are more sophisticated (B-trees on disk), so the gap is usually small per index — but it
        is never zero, and it multiplies with every extra index a collection has.
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "scan-grows-with-size",
      title: "Scan time grows with collection size; indexed lookup doesn't",
      summary: "Measuring the same lookup at three collection sizes shows the scan slowing down while the Map lookup stays flat.",
      code: `function generateDocs(n) {
  const docs = [];
  for (let i = 0; i < n; i++) {
    docs.push({ _id: i, email: "user" + i + "@example.com" });
  }
  return docs;
}

function timeScan(docs, target, repeats) {
  const start = performance.now();
  for (let r = 0; r < repeats; r++) {
    for (let i = 0; i < docs.length; i++) {
      if (docs[i].email === target) break;
    }
  }
  return performance.now() - start;
}

function timeIndexed(index, target, repeats) {
  const start = performance.now();
  for (let r = 0; r < repeats; r++) {
    index.get(target);
  }
  return performance.now() - start;
}

function App() {
  const [rows, setRows] = useState(null);
  const sizes = [1000, 5000, 20000];

  function runComparison() {
    const results = sizes.map((size) => {
      const docs = generateDocs(size);
      const index = new Map(docs.map((d) => [d.email, d]));
      const target = "user" + (size - 1) + "@example.com"; // worst case: last element
      const scanMs = timeScan(docs, target, 50);
      const indexMs = timeIndexed(index, target, 50);
      return { size, scanMs: scanMs.toFixed(3), indexMs: indexMs.toFixed(3) };
    });
    setRows(results);
  }

  return (
    <div style={{ display: "grid", gap: 8 }}>
      <button onClick={runComparison}>Measure at 1,000 / 5,000 / 20,000 documents</button>
      {rows && (
        <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6 }}>
          {rows
            .map((r) => r.size + " docs  ->  scan: " + r.scanMs + " ms   indexed: " + r.indexMs + " ms")
            .join("\\n")}
        </pre>
      )}
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        Watch the scan column climb as the collection grows, while the indexed column stays roughly flat — that's the
        whole reason indexes exist.
      </p>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
