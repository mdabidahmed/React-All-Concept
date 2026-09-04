import type { Topic } from "../../types";

export const mongodbObjectIdTopic: Topic = {
  id: "mongodb-object-id",
  title: "MongoDB ObjectId",
  category: "MongoDB Basics",
  shortExplanation: `Every MongoDB document needs an \`_id\` field as its unique primary key — if you don't supply one, MongoDB auto-generates an **ObjectId**: a 12-byte value shown as a 24-character hex string.

- Structure: **4-byte timestamp** + **5-byte random value** + **3-byte incrementing counter** = 12 bytes total
- Because the timestamp comes *first*, ObjectIds sort roughly in creation order — even without looking at any other field
- You can supply your own \`_id\` instead (a string, a number, anything unique) — MongoDB only auto-generates one when you don't`,
  longExplanation: `Every document in a MongoDB collection must have an \`_id\` field, and it must be unique within that collection — it's the document's primary key, and MongoDB automatically creates a unique index on it the moment a collection exists. If you insert a document without an \`_id\`, MongoDB doesn't leave it blank — it generates one for you, and the type it generates is called an **ObjectId**.

- An ObjectId is **12 bytes** (96 bits) total, conventionally displayed as a **24-character hexadecimal string** (each byte becomes 2 hex characters) — something like \`64f1a2b3c4d5e6f7a8b9c0d1\`.
- Those 12 bytes break down into three parts, in order:
  - **Bytes 0–3 (4 bytes): a Unix timestamp**, in seconds, recording roughly when the ObjectId was generated
  - **Bytes 4–8 (5 bytes): a random value**, generated once per process and shared by every ObjectId that process creates — this is what makes ObjectIds generated on different servers, or in different processes, extremely unlikely to collide, without requiring any coordination between them
  - **Bytes 9–11 (3 bytes): an incrementing counter**, starting from a random value and incrementing for every ObjectId generated within that same process — this is what guarantees uniqueness even for multiple ObjectIds generated within the very same second by the very same process
- **Why the timestamp comes first matters a lot**: because hex strings compare left-to-right just like any other string, and the *most significant* part of an ObjectId (the part that changes slowest) is the timestamp, sorting a list of ObjectIds as plain strings sorts them **roughly by creation time** too — "roughly" because the random+counter portion only guarantees uniqueness within the same second, not a strict tiebreak order. This is a genuinely useful, free side effect: sorting a collection by \`_id\` descending is a common, cheap way to get "most recently inserted first" without needing a separate \`createdAt\` field or index — though an explicit \`createdAt\` field is still the clearer, more intentional choice when creation time is something your application logic actually depends on.
- **Every driver exposes a way to pull the timestamp back out** of an existing ObjectId — in the Node.js driver this is \`objectId.getTimestamp()\`, which returns a real \`Date\` reconstructed from just the first 4 bytes. This is a genuinely useful trick: you can recover *when* a document was created from its \`_id\` alone, with no extra field or index needed.
- **Using a custom \`_id\`**: MongoDB doesn't require an ObjectId specifically — it only requires the \`_id\` field to be unique within the collection. Passing your own value (\`insertOne({ _id: "sku-12345", name: "Widget" })\`) is completely valid and common when a natural unique key already exists (a username, an email address, a product SKU, a UUID from another system) — MongoDB only falls back to auto-generating an ObjectId when \`_id\` is left out entirely.
- **A common beginner mix-up**: an ObjectId is *not* the same thing as a plain hex string, even though it displays as one. \`ObjectId("64f1a2b3c4d5e6f7a8b9c0d1")\` and the bare string \`"64f1a2b3c4d5e6f7a8b9c0d1"\` are different BSON types, and querying with the wrong one (a plain string where an ObjectId is stored, or vice versa) silently matches nothing — this trips up nearly everyone the first time they build a query from a URL parameter or form field, since values arriving that way are always plain strings and usually need to be explicitly converted back into an \`ObjectId\` before querying.

Because a real ObjectId's random component is meant to be cryptographically unpredictable and tied to a specific running process, it can't be *genuinely* reproduced inside this browser sandbox the way this subject's query logic can. The examples below clearly label anything representative, but the timestamp-extraction and sort-order logic — the actual reason ObjectId is designed this way — is real, working code.`,
  examples: [
    {
      id: "anatomy-of-an-objectid",
      title: "Anatomy of an ObjectId: 4 + 5 + 3 bytes",
      summary: "A representative ObjectId hex string, broken into its three parts.",
      code: `// Representative ObjectId — a real one is generated fresh by the server or driver.
const sampleObjectId = "64f1a2b3c4d5e6f7a8b9c0d1";

function App() {
  const timestampHex = sampleObjectId.slice(0, 8); // 4 bytes
  const randomHex = sampleObjectId.slice(8, 18); // 5 bytes
  const counterHex = sampleObjectId.slice(18, 24); // 3 bytes

  const parts = [
    { label: "Timestamp (4 bytes)", hex: timestampHex, desc: "Unix seconds when generated" },
    { label: "Random value (5 bytes)", hex: randomHex, desc: "Fixed per process, near-impossible to collide" },
    { label: "Counter (3 bytes)", hex: counterHex, desc: "Increments per ObjectId within that process" },
  ];

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 10, borderRadius: 6 }}>
        {"ObjectId(\\"" + sampleObjectId + "\\")  <- 24 hex characters, 12 bytes"}
      </pre>
      {parts.map((p) => (
        <div key={p.label} style={{ padding: 8, background: "#f3f4f6", borderRadius: 6 }}>
          <strong>{p.label}</strong>: <code>{p.hex}</code>
          <div style={{ color: "#6b7280", fontSize: 13 }}>{p.desc}</div>
        </div>
      ))}
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "extracting-timestamp-from-objectid",
      title: "Extracting the real creation timestamp — genuine logic",
      summary: "getTimestamp()-style parsing: the first 4 bytes really are a Unix timestamp, decoded here for real.",
      code: `function getTimestampFromObjectId(objectIdHex) {
  const timestampHex = objectIdHex.slice(0, 8);
  const seconds = parseInt(timestampHex, 16); // real hex-to-decimal decoding
  return new Date(seconds * 1000);
}

function App() {
  const sampleObjectIds = [
    "5f1a2b3c0000000000000001",
    "64f1a2b30000000000000002",
    "66a0b1c20000000000000003",
  ];

  return (
    <div style={{ display: "grid", gap: 8 }}>
      {sampleObjectIds.map((id) => (
        <pre key={id} style={{ background: "#111827", color: "#d1fae5", padding: 10, borderRadius: 6 }}>
          {"ObjectId(\\"" + id + "\\").getTimestamp() -> " + getTimestampFromObjectId(id).toISOString()}
        </pre>
      ))}
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        This decoding is genuinely how it works — the first 8 hex characters are parsed as a
        base-16 Unix timestamp in seconds, exactly like a real driver's getTimestamp() does.
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "objectids-sort-by-creation-time",
      title: "ObjectIds sort roughly by creation time",
      summary: "Simplified (illustrative) generator, but the sort-order behavior demonstrated is genuinely how real ObjectIds behave.",
      code: `// Simplified/illustrative generator — a real ObjectId's random component is
// cryptographically generated once per process, not with Math.random().
function generateObjectId(unixSeconds) {
  const timestampHex = unixSeconds.toString(16).padStart(8, "0");
  const randomHex = Math.floor(Math.random() * 0xffffffffff).toString(16).padStart(10, "0");
  const counterHex = Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, "0");
  return timestampHex + randomHex + counterHex;
}

function App() {
  const [ids, setIds] = useState([]);

  function generateThree() {
    const now = Math.floor(Date.now() / 1000);
    const generated = [
      generateObjectId(now),
      generateObjectId(now + 60), // 1 minute later
      generateObjectId(now + 3600), // 1 hour later
    ];
    setIds(generated);
  }

  const sorted = [...ids].sort(); // plain string sort

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={generateThree}>Generate 3 ObjectIds (now, +1min, +1hr)</button>
      {ids.length > 0 && (
        <div style={{ display: "grid", gap: 6 }}>
          <p>Sorted as plain strings (ascending) -></p>
          <pre style={{ background: "#111827", color: "#d1fae5", padding: 10, borderRadius: 6 }}>
            {sorted.join("\\n")}
          </pre>
          <p style={{ color: "#6b7280", fontSize: 13 }}>
            Even though the random/counter bytes are shuffled each time, the leading timestamp
            bytes still put the oldest ObjectId first, the newest last.
          </p>
        </div>
      )}
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "supplying-a-custom-id",
      title: "Supplying your own _id instead of an ObjectId",
      summary: "Genuine Collection logic: insertOne uses whatever _id you provide, and only generates one when you don't.",
      code: `class Collection {
  constructor() {
    this.docs = [];
    this.nextObjectId = 1;
  }
  insertOne(doc) {
    if (doc._id !== undefined) {
      return { acknowledged: true, insertedId: doc._id, generated: false };
    }
    const generatedId = "ObjectId_" + this.nextObjectId++;
    this.docs.push({ _id: generatedId, ...doc });
    return { acknowledged: true, insertedId: generatedId, generated: true };
  }
}

function App() {
  const [collection] = useState(() => new Collection());

  const withCustomId = collection.insertOne({ _id: "sku-12345", name: "Widget" });
  const withAutoId = collection.insertOne({ name: "Gadget" });

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 10, borderRadius: 6 }}>
        {"insertOne({ _id: 'sku-12345', name: 'Widget' }) -> " + JSON.stringify(withCustomId)}
      </pre>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 10, borderRadius: 6 }}>
        {"insertOne({ name: 'Gadget' }) -> " + JSON.stringify(withAutoId)}
      </pre>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        A custom _id (like an existing SKU) is used as-is; leaving _id out is what triggers
        auto-generation.
      </p>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
