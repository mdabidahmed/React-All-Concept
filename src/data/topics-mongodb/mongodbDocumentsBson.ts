import type { Topic } from "../../types";

export const mongodbDocumentsBsonTopic: Topic = {
  id: "mongodb-documents-bson",
  title: "MongoDB Documents and BSON",
  category: "MongoDB Basics",
  shortExplanation: `MongoDB documents *look* like JSON, but on disk they're actually stored as **BSON** — "Binary JSON" — a binary-encoded format that adds types plain JSON simply doesn't have.

- BSON adds a real \`Date\` type, a dedicated \`ObjectId\` type, and binary data — none of which JSON can represent natively
- BSON distinguishes between integer and floating-point numbers (\`Int32\`, \`Double\`, \`Decimal128\`); JSON only has one generic "number"
- \`mongosh\` and every driver show you documents *as if* they were JSON for convenience — the BSON encoding happens underneath, transparently`,
  longExplanation: `When you write \`{ name: "Ada", age: 28 }\` into MongoDB, what actually gets written to disk is not that text — it's **BSON**, a binary-encoded superset of JSON's data model. Understanding why BSON exists (rather than MongoDB just storing raw JSON text) explains several behaviors that otherwise seem surprising.

- **JSON is a text format with a very small set of types**: string, number, boolean, \`null\`, array, and object. That's it — notably, there is no \`Date\` type, no way to represent binary data (an image, a file hash) without awkwardly encoding it as a Base64 string, and only one undifferentiated "number" type covering everything from \`3\` to \`3.14159\` to numbers far too large to represent exactly.
- **BSON keeps every one of JSON's types** but adds several more that map directly onto the types a real programming language actually works with: a genuine **Date** type (stored as milliseconds since the Unix epoch, not a string that needs parsing), a **Binary data** type for raw bytes, a dedicated **ObjectId** type (covered in depth in its own topic), and — importantly — it distinguishes between different kinds of numbers instead of collapsing them all into one.
- **Why the Date type matters**: if you store \`{ createdAt: new Date() }\` in a real MongoDB document, it round-trips back out of the database as an actual \`Date\` object in your driver, ready to call \`.getFullYear()\` or compare with \`<\`/\`>\` against another date directly. If MongoDB only stored JSON text, a date could only ever come back as a *string* that your application would have to remember to re-parse into a real \`Date\` every single time it's read — an easy thing to forget, and a common source of subtle bugs in JSON-only systems.
- **Why distinct number types matter**: BSON has \`Int32\` (a 32-bit integer), \`Int64\`, \`Double\` (a 64-bit floating-point number — what JavaScript's own \`Number\` type effectively is), and \`Decimal128\` (a high-precision decimal type built specifically for money and other values where floating-point rounding error is unacceptable — \`0.1 + 0.2\` famously doesn't equal \`0.3\` in ordinary floating-point math). JSON has no way to say "this \`3\` is specifically a 32-bit integer, not a double" — it's just the digits \`3\`. BSON's explicit type tagging means a value's exact numeric type survives being written and re-read, which matters for both storage efficiency and precision.
- **This is (almost always) invisible to you.** \`mongosh\`, MongoDB Compass, and every official driver present documents to you *as if* they were plain JSON/JS objects — you write \`{ name: "Ada" }\` and read back \`{ name: "Ada" }\`, never manually touching the underlying binary bytes. The BSON encoding and decoding happens transparently underneath. The one place it becomes visible is **MongoDB Extended JSON** — a special JSON-text representation used by tools like \`mongoexport\` that need to write BSON-typed data out as plain text, and so has to *tag* values whose type JSON can't otherwise express, e.g. \`{ "$numberInt": "42" }\` or \`{ "$date": "2024-01-15T00:00:00Z" }\`.
- **Documents have a hard 16 MB size limit** — a deliberate BSON design constraint meant to keep any single document (and any single network round-trip carrying it) reasonably sized, and to discourage using a single document as an unbounded, ever-growing bucket. In practice, hitting this limit is a signal that a document's shape needs rethinking (usually: something should be a separate, referenced document instead of endlessly appended array entries — covered in the schema design topics later in this subject).

The net effect: think in JSON while you're writing MongoDB queries and documents day to day — that mental model is accurate for almost everything you do — but remember BSON is the real format underneath whenever a JSON limitation (no real dates, only one number type, a 16 MB document ceiling) suddenly explains behavior that otherwise looks strange.`,
  examples: [
    {
      id: "json-cannot-represent-a-real-date",
      title: "Plain JSON can't represent a real Date — BSON can",
      summary: "A genuine JS demonstration: round-tripping through JSON.stringify/parse silently turns a Date into a string.",
      code: `function App() {
  const document = { name: "Ada Lovelace", createdAt: new Date("2024-01-15T10:30:00Z") };

  // Simulating what plain JSON storage would do to this document
  const roundTrippedThroughJson = JSON.parse(JSON.stringify(document));

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <p>Original createdAt: typeof -> {typeof document.createdAt}, is a real Date? {String(document.createdAt instanceof Date)}</p>
      <p>After JSON.stringify + JSON.parse: typeof -> {typeof roundTrippedThroughJson.createdAt}, is a real Date? {String(roundTrippedThroughJson.createdAt instanceof Date)}</p>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 10, borderRadius: 6 }}>
        {"After round-trip: " + roundTrippedThroughJson.createdAt}
      </pre>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        BSON stores an actual Date type, so a real MongoDB driver hands the Date back as a Date —
        this JSON.stringify/parse round trip demonstrates exactly the information JSON alone loses.
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "extended-json-number-types",
      title: "MongoDB Extended JSON: tagging number types text-only JSON can't express",
      summary: "Representative Extended JSON — how mongoexport writes BSON's distinct number types out as plain text.",
      code: `// Representative output — this is what a real "mongoexport" call produces,
// using MongoDB's Extended JSON to tag BSON types that plain JSON has no syntax for.
const extendedJsonDocument = {
  _id: { "$oid": "64f1a2b3c4d5e6f7a8b9c0d1" },
  name: "Widget",
  quantity: { "$numberInt": "42" },
  price: { "$numberDecimal": "19.99" },
  createdAt: { "$date": "2024-01-15T10:30:00Z" },
};

function App() {
  return (
    <div style={{ display: "grid", gap: 10 }}>
      <p>Representative Extended JSON output for one document:</p>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 10, borderRadius: 6 }}>
        {JSON.stringify(extendedJsonDocument, null, 2)}
      </pre>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        In ordinary use you never see this — mongosh and every driver show plain
        {" "}{JSON.stringify({ quantity: 42 })}. Extended JSON only surfaces when BSON-typed
        data needs to round-trip through a text format, like mongoexport/mongoimport.
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "json-types-vs-bson-extra-types",
      title: "JSON's types vs. the types BSON adds",
      summary: "A side-by-side of what plain JSON can express and what BSON adds on top.",
      code: `function App() {
  const rows = [
    { type: "String", inJson: "yes", inBson: "yes" },
    { type: "Number (generic)", inJson: "yes (one kind)", inBson: "split into Int32 / Int64 / Double / Decimal128" },
    { type: "Boolean", inJson: "yes", inBson: "yes" },
    { type: "null", inJson: "yes", inBson: "yes" },
    { type: "Array / Object", inJson: "yes", inBson: "yes" },
    { type: "Date", inJson: "no (must encode as a string)", inBson: "yes — a real Date type" },
    { type: "Binary data", inJson: "no (must Base64-encode)", inBson: "yes — a real Binary type" },
    { type: "ObjectId", inJson: "no", inBson: "yes — MongoDB's default _id type" },
  ];

  return (
    <table style={{ borderCollapse: "collapse", width: "100%", fontSize: 13 }}>
      <thead>
        <tr>
          <th style={{ textAlign: "left", borderBottom: "2px solid #374151", padding: 8 }}>Type</th>
          <th style={{ textAlign: "left", borderBottom: "2px solid #374151", padding: 8 }}>Plain JSON</th>
          <th style={{ textAlign: "left", borderBottom: "2px solid #374151", padding: 8 }}>BSON</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r) => (
          <tr key={r.type}>
            <td style={{ padding: 8, borderBottom: "1px solid #374151" }}>{r.type}</td>
            <td style={{ padding: 8, borderBottom: "1px solid #374151" }}>{r.inJson}</td>
            <td style={{ padding: 8, borderBottom: "1px solid #374151" }}>{r.inBson}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

render(<App />);`,
    },
    {
      id: "why-only-one-number-type-is-risky",
      title: "Why a single 'number' type is risky for money",
      summary: "A genuine, live demonstration of floating-point imprecision — the real reason Decimal128 exists.",
      code: `function App() {
  const sum = 0.1 + 0.2;

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <p>0.1 + 0.2 in ordinary floating-point math -> {sum}</p>
      <p>Is it exactly 0.3? {String(sum === 0.3)}</p>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 10, borderRadius: 6 }}>
        {JSON.stringify(sum, null, 2)}
      </pre>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        JavaScript's Number (and BSON's Double) is a 64-bit float, so tiny rounding errors like this
        are unavoidable. BSON's separate Decimal128 type exists specifically so money and other
        exact-decimal values don't have to live with this imprecision.
      </p>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
