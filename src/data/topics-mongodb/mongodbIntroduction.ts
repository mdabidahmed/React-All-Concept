import type { Topic } from "../../types";

export const mongodbIntroductionTopic: Topic = {
  id: "mongodb-introduction",
  title: "MongoDB Introduction",
  category: "MongoDB Basics",
  shortExplanation: `**MongoDB** is a **document database** — instead of rows in rigid tables, it stores data as flexible, JSON-like **documents** grouped into **collections**.

- A **document** is a set of key-value pairs, similar to a JavaScript object
- A **collection** is a group of documents, roughly like a table — but documents in the same collection don't have to share an identical shape
- MongoDB is the most widely used ==NoSQL== ("not only SQL") database`,
  longExplanation: `For decades, the default way to store application data was a **relational database** (like MySQL or PostgreSQL): fixed tables with named columns, every row in a table sharing the exact same shape, and relationships expressed by linking tables together with foreign keys. MongoDB takes a different approach — it's a **document database**, part of the broader "NoSQL" family, where data is stored as flexible documents that look and feel like the objects a JavaScript (or Python, or Java...) program already works with.

- A **document** is MongoDB's basic unit of storage — a set of field/value pairs, written and thought about almost exactly like a JSON object: \`{ name: "Ada Lovelace", age: 28, skills: ["math", "writing"] }\`. Values can be strings, numbers, booleans, arrays, dates, or even *other documents* nested inside (covered more in later topics)
- A **collection** groups related documents together — conceptually similar to a table in a relational database. The key difference: MongoDB doesn't enforce that every document in a collection has the same fields. One \`users\` document might have a \`phone\` field while another doesn't — the database itself won't complain (though your *application* usually still wants some consistency, covered under schema design later in this subject)
- A **database** is a container for one or more collections — a single MongoDB server can host many databases, each isolated from the others, much like a relational database server can host multiple databases
- This gives MongoDB's core hierarchy: **database → collection → document → field**, which maps loosely onto the relational world's **database → table → row → column** — but with far more flexibility at every level
- MongoDB is especially popular for JavaScript-heavy stacks (the "MERN"/"MEAN" stack: MongoDB, Express, React/Angular, Node.js) precisely because documents look like the JSON your app is already passing around — there's no translation step between "the shape my app thinks in" and "the shape the database stores"
- Common real-world use cases: content management systems, product catalogs (where products can have wildly different attributes), user profiles, real-time analytics, and any application whose data shape evolves quickly during early development

This subject teaches MongoDB's query language and concepts by running a genuinely-working, simplified in-memory implementation of MongoDB's own API directly in JavaScript — the same method names (\`insertOne\`, \`find\`, \`updateOne\`...) and the same query syntax you'd use against a real MongoDB server, so everything demonstrated here transfers directly to writing real MongoDB code.`,
  examples: [
    {
      id: "a-mongodb-document",
      title: "A MongoDB document, rendered",
      summary: "A document is just a JS-object-shaped record — this one describes a single user.",
      code: `function App() {
  const document = {
    _id: "64f1a2b3c4d5e6f7a8b9c0d1",
    name: "Ada Lovelace",
    age: 28,
    skills: ["mathematics", "writing", "logic"],
    address: { city: "London", country: "England" },
  };

  return (
    <pre style={{ background: "#111827", color: "#d1fae5", padding: 14, borderRadius: 6, overflow: "auto" }}>
      {JSON.stringify(document, null, 2)}
    </pre>
  );
}

render(<App />);`,
    },
    {
      id: "collection-of-varied-documents",
      title: "A collection where documents don't share an identical shape",
      summary: "Two 'users' documents with genuinely different fields — MongoDB allows this by default.",
      code: `function App() {
  const usersCollection = [
    { _id: 1, name: "Ada Lovelace", age: 28 },
    { _id: 2, name: "Grace Hopper", age: 34, rank: "Rear Admiral", branch: "US Navy" },
  ];

  return (
    <div style={{ display: "grid", gap: 10 }}>
      {usersCollection.map((doc) => (
        <pre key={doc._id} style={{ background: "#111827", color: "#d1fae5", padding: 10, borderRadius: 6 }}>
          {JSON.stringify(doc, null, 2)}
        </pre>
      ))}
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        Same collection, different fields per document — a relational table could never do this.
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "hierarchy-diagram",
      title: "Database → Collection → Document → Field",
      summary: "The four-level hierarchy MongoDB organizes everything around.",
      code: `function App() {
  const levels = [
    { label: "Database", example: '"blogApp"', desc: "A container for related collections" },
    { label: "Collection", example: '"posts"', desc: "A group of related documents" },
    { label: "Document", example: '{ title: "...", body: "..." }', desc: "One record" },
    { label: "Field", example: '"title"', desc: "One key inside a document" },
  ];

  return (
    <div style={{ display: "grid", gap: 8 }}>
      {levels.map((l, i) => (
        <div key={l.label} style={{ padding: 10, marginLeft: i * 20, background: "#f3f4f6", borderRadius: 6, borderLeft: "3px solid #16a34a" }}>
          <strong>{l.label}</strong> — e.g. {l.example}
          <div style={{ color: "#6b7280", fontSize: 13 }}>{l.desc}</div>
        </div>
      ))}
    </div>
  );
}

render(<App />);`,
    },
  ],
};
