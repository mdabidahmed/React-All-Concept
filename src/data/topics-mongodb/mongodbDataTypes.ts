import type { Topic } from "../../types";

export const mongodbDataTypesTopic: Topic = {
  id: "mongodb-data-types",
  title: "MongoDB Data Types",
  category: "MongoDB Basics",
  shortExplanation: `A document's fields can hold **String**, **Number** (Int32/Double/Decimal128), **Boolean**, **Date**, **Array**, an embedded **Document**, **Null**, or **ObjectId** — and different documents in the same collection are free to mix and match.

- Arrays and embedded documents can nest inside each other to any depth
- \`null\` (a field explicitly set to nothing) is different from a field that's **missing entirely**
- Picking the right type up front avoids awkward conversions later — e.g. storing a date as a \`Date\`, not a string`,
  longExplanation: `MongoDB documents support a rich set of field types — inherited from BSON's extended type system (covered in its own topic) — and a single document is free to use any mix of them, nested as deep as it needs to.

- **String** — text, the most common type, stored as UTF-8 (\`"Ada Lovelace"\`)
- **Number** — BSON actually has *several* distinct number types rather than one generic "number": \`Int32\` (a 32-bit whole number, used for small counters/quantities), \`Double\` (a 64-bit floating-point number — the default when a driver writes a plain JS number), and \`Decimal128\` (a high-precision decimal type built for money and other values where floating-point rounding is unacceptable). Most day-to-day code just writes ordinary JS numbers and lets the driver pick \`Int32\` or \`Double\` automatically; \`Decimal128\` is reached for deliberately when exact precision matters
- **Boolean** — \`true\`/\`false\` (\`inStock: true\`)
- **Date** — a real, dedicated date/time type (not a string!) — stored internally as milliseconds since the Unix epoch, and handed back to your application as a genuine \`Date\` object ready to compare, format, or do date math with directly
- **Array** — an ordered list of values, and the values inside don't even have to share a type (\`tags: ["math", 1815, true]\` is legal, if unusual) — arrays are how MongoDB represents one-to-many data without a separate table
- **Embedded Document (Object)** — a document nested inside a field of another document (\`address: { city: "London", country: "England" }\`) — this is the core mechanism behind MongoDB's "embed related data" modeling style discussed in the SQL vs. NoSQL topic
- **Null** — a field can be explicitly set to \`null\`, meaning "this field exists, but deliberately has no value." This is a genuinely different situation from the field being **absent** from the document entirely — \`{ middleName: null }\` and a document with no \`middleName\` key at all behave differently for some queries (an explicit \`{ middleName: null }\` query actually matches *both* cases by default, which is a common source of confusion worth remembering)
- **ObjectId** — MongoDB's default type for the \`_id\` field, covered in depth in its own topic
- A few less common types round things out: **Binary data** (raw bytes, e.g. a stored file hash), and internal-use types like **Timestamp** and **MinKey**/**MaxKey** that show up in replication internals rather than everyday application code

Because MongoDB collections don't enforce a schema by default, nothing stops one document from storing \`age\` as a number and another from storing it as a string — the database itself won't complain. This flexibility is powerful, but it's also a well-known footgun: a query like \`find({ age: 28 })\` (the number \`28\`) will *not* match a document that accidentally stored \`age: "28"\` (the string), since BSON type is part of what \`$eq\`-style equality checks — including the implicit equality of a bare query value — actually compares. In practice, most real applications add a validation layer (either MongoDB's own schema validation rules, or an ODM like Mongoose, both covered later in this subject) specifically to catch this kind of type drift before it becomes a bug hunting through inconsistent data.

Choosing the right type up front matters beyond just correctness — it affects what operations are even available. Only a \`Date\` field supports date-range comparisons and date-math aggregation operators; a date accidentally stored as a string supports neither without first converting it back. Similarly, only genuine numbers support \`$gt\`/\`$lt\`-style comparisons the way you'd expect — a numeric value stored as a string compares *lexicographically* ("9" is considered "greater than" "10" as strings), which is almost never the intended behavior.`,
  examples: [
    {
      id: "one-document-many-types",
      title: "One document exercising several BSON types at once",
      summary: "A genuine typeof/instanceof check against each field of a realistic product document.",
      code: `function App() {
  const product = {
    _id: "64f1a2b3c4d5e6f7a8b9c0d1",
    name: "Wireless Mouse",
    price: 29.99,
    quantityInStock: 142,
    inStock: true,
    releasedAt: new Date("2023-06-01"),
    tags: ["electronics", "accessories", "wireless"],
    dimensions: { widthCm: 6, heightCm: 11 },
    discontinuedReason: null,
  };

  const inspected = Object.entries(product).map(([key, value]) => {
    let kind;
    if (value === null) kind = "Null";
    else if (Array.isArray(value)) kind = "Array";
    else if (value instanceof Date) kind = "Date";
    else if (typeof value === "object") kind = "Embedded Document";
    else if (typeof value === "number") kind = "Number";
    else if (typeof value === "boolean") kind = "Boolean";
    else if (typeof value === "string" && key === "_id") kind = "ObjectId (as hex string)";
    else kind = "String";
    return { key, kind };
  });

  return (
    <table style={{ borderCollapse: "collapse", width: "100%", fontSize: 13 }}>
      <thead>
        <tr>
          <th style={{ textAlign: "left", borderBottom: "2px solid #374151", padding: 6 }}>Field</th>
          <th style={{ textAlign: "left", borderBottom: "2px solid #374151", padding: 6 }}>BSON-ish type</th>
        </tr>
      </thead>
      <tbody>
        {inspected.map((row) => (
          <tr key={row.key}>
            <td style={{ padding: 6, borderBottom: "1px solid #374151" }}>{row.key}</td>
            <td style={{ padding: 6, borderBottom: "1px solid #374151" }}>{row.kind}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

render(<App />);`,
    },
    {
      id: "floating-point-and-decimal128",
      title: "Why Decimal128 exists: a genuine floating-point demo",
      summary: "Real JS floating-point math showing exactly the precision problem Decimal128 was built to avoid.",
      code: `function App() {
  const prices = [0.1, 0.2, 0.3];
  const total = prices.reduce((sum, p) => sum + p, 0);

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <p>0.1 + 0.2 + 0.3 as ordinary Doubles -> {total}</p>
      <p>Exactly 0.6? {String(total === 0.6)}</p>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        A real accounting system storing this as BSON Decimal128 instead of Double would get an
        exact 0.6 -- this is the actual reason Decimal128 exists as a separate BSON number type.
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "null-vs-missing-field",
      title: "null vs. a genuinely missing field",
      summary: "A real distinction: 'in' checks presence, while reading the value can't tell the two apart.",
      code: `function App() {
  const withNull = { name: "Ada", middleName: null };
  const withoutField = { name: "Grace" };

  return (
    <div style={{ display: "grid", gap: 8 }}>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 10, borderRadius: 6 }}>
        {"withNull.middleName -> " + withNull.middleName +
          "\\n'middleName' in withNull -> " + ("middleName" in withNull) +
          "\\n\\nwithoutField.middleName -> " + withoutField.middleName +
          "\\n'middleName' in withoutField -> " + ("middleName" in withoutField)}
      </pre>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        Both read back as null/undefined-ish when accessed directly, but "in" proves only the
        first document actually has the field. MongoDB's {"{ field: null }"} query matches both
        cases by default -- a common surprise.
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "type-mismatch-breaks-equality",
      title: "A stored type mismatch silently breaks matching",
      summary: "Genuine equality logic: age: 28 (number) never matches age: '28' (string), by design.",
      code: `function matchesQuery(doc, query) {
  for (const key in query) {
    if (doc[key] !== query[key]) return false;
  }
  return true;
}

function App() {
  const documents = [
    { name: "Ada Lovelace", age: 28 }, // age stored correctly, as a Number
    { name: "Alan Turing", age: "28" }, // age accidentally stored as a String
  ];

  const results = documents.filter((doc) => matchesQuery(doc, { age: 28 }));

  return (
    <div style={{ display: "grid", gap: 8 }}>
      <p>find({"{ age: 28 }"}) against a mixed-type collection -></p>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 10, borderRadius: 6 }}>
        {JSON.stringify(results, null, 2)}
      </pre>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        Only Alan Turing's document is excluded -- not because of his name, but because his age
        field's BSON type (String) doesn't match the query's type (Number).
      </p>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
