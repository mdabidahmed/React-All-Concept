import type { Topic } from "../../types";

export const mongodbShellDriversTopic: Topic = {
  id: "mongodb-shell-drivers",
  title: "MongoDB Shell and Drivers",
  category: "MongoDB Basics",
  shortExplanation: `Everything you've learned in this subject — \`insertOne\`, \`find\`, update operators — is real MongoDB syntax, and there are three official tools for actually running it: \`mongosh\` (an interactive shell), **drivers** (libraries your app code imports), and **MongoDB Compass** (a GUI).

- \`mongosh\` — a command-line, JavaScript-flavored REPL for typing commands directly against a database
- A **driver** (\`mongodb\` for Node.js, \`pymongo\` for Python, etc.) is what an application imports to run the same operations programmatically
- **Compass** is the official point-and-click GUI for browsing data and building queries visually

This sandbox can't open a real terminal or network connection, so the examples below describe these tools accurately and show clearly-labeled *representative* output rather than a live session.`,
  longExplanation: `Every operation covered elsewhere in this subject — \`find()\`, \`insertOne()\`, \`updateOne()\`, aggregation stages — is genuine MongoDB query language. This topic is about the tools people actually type that language *into*. There are three you'll run into constantly, and they all speak the same underlying language, just wrapped in different shells.

- **\`mongosh\`** ("Mongo shell") is MongoDB's official interactive command-line tool. You launch it with a connection string (\`mongosh "mongodb://localhost:27017"\` for a local server, or a longer \`mongodb+srv://...\` string for a hosted MongoDB Atlas cluster), and it drops you into a JavaScript-flavored REPL connected live to that server. From there you type commands like \`use blogApp\` to select a database, \`db.posts.find({ published: true })\` to query, or \`show collections\` to list what exists — and results print immediately, right in the terminal. Because \`mongosh\` is genuinely a JavaScript environment, you can also write real JS in it: variables, loops, even small scripts, alongside the Mongo-specific \`db\` global it injects.
- \`mongosh\` is where people explore data, debug a query that isn't matching what they expect, or run one-off administrative commands (creating an index, checking \`db.stats()\`) — the kind of task where opening a full application just to run one query would be overkill. It is *not* how applications talk to MongoDB in production; that's what drivers are for.
- **Drivers** are official, MongoDB-maintained libraries — one per language: \`mongodb\` for Node.js, \`pymongo\` for Python, the MongoDB Java Driver, and so on. An application imports its language's driver, opens a connection once (typically kept open and reused, not reconnected per request), and then calls methods that map almost one-to-one onto the same operations you'd type into \`mongosh\`: \`collection.find({...})\`, \`collection.insertOne({...})\`, \`collection.updateOne({...}, {...})\`. This is the whole point of learning MongoDB's query language the way this subject teaches it — the \`{ field: value }\` query documents, the \`$set\`/\`$inc\`/\`$push\` update operators, the \`$gt\`/\`$in\` comparison operators — all of it is what you pass to driver methods too. There's no separate "driver query language" to relearn.
- One real difference: most drivers are **asynchronous**. The Node.js driver's methods return Promises, so real application code awaits them (\`const results = await collection.find({ status: "active" }).toArray();\`) rather than getting a value back instantly the way this sandbox's simplified, synchronous \`Collection\` class does. That asynchrony reflects reality — a real query travels over a network to an actual database server and back — but it doesn't change *what* you're asking for, only how you wait for the answer.
- **MongoDB Compass** is the official desktop GUI. It connects to a database the same way \`mongosh\` or a driver does (same connection string), then lets you browse collections, inspect individual documents, and build queries and filters by clicking through form fields instead of typing them — Compass translates your clicks into the exact same query documents you'd write by hand. It's especially useful for visually exploring a collection's schema (Compass can sample documents and show you which fields appear and how often), and for viewing a query's \`explain()\` output — how the database actually executed it — without memorizing the command syntax for that.
- A common early setup: install MongoDB locally (or spin up a free MongoDB Atlas cloud cluster), use Compass to poke around and confirm data looks right, use \`mongosh\` for quick one-off checks and admin tasks, and use the driver inside your actual application code. All three are just different front doors onto the exact same database and the exact same query language.`,
  examples: [
    {
      id: "mongosh-session-illustrated",
      title: "A mongosh session, illustrated",
      summary: "Representative commands and output from an interactive mongosh session — labeled illustrative, since no real terminal exists here.",
      code: `// Illustrative only — mongosh requires a real terminal connected to a real
// MongoDB server, which this sandbox doesn't have. The commands and output
// shown are representative of what a real session looks like.
function App() {
  const session = [
    { input: "mongosh \\"mongodb://localhost:27017\\"", output: "Current Mongosh Log ID: 64f...\\nConnecting to: mongodb://localhost:27017/\\nUsing MongoDB: 7.0.2" },
    { input: "use blogApp", output: "switched to db blogApp" },
    { input: "db.posts.find({ published: true }).limit(1)", output: "[\\n  { _id: ObjectId(\\"64f...\\"), title: \\"Intro to MongoDB\\", published: true }\\n]" },
    { input: "db.posts.insertOne({ title: \\"New Post\\", published: false })", output: "{\\n  acknowledged: true,\\n  insertedId: ObjectId(\\"66a...\\")\\n}" },
  ];

  return (
    <div style={{ background: "#0b1120", color: "#d1fae5", padding: 14, borderRadius: 6, fontFamily: "monospace", fontSize: 13 }}>
      {session.map((line, i) => (
        <div key={i} style={{ marginBottom: 10 }}>
          <div style={{ color: "#93c5fd" }}>{"test> " + line.input}</div>
          <div style={{ whiteSpace: "pre-wrap", color: "#d1fae5" }}>{line.output}</div>
        </div>
      ))}
      <p style={{ color: "#6b7280", marginTop: 8 }}>Illustrative session output — representative of a real mongosh terminal.</p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "node-driver-connect",
      title: "Connecting with the official Node.js driver",
      summary: "Representative driver code — the same CRUD calls you've learned, called from real application code.",
      code: `// Illustrative only — this is what real Node.js application code looks
// like using the official "mongodb" driver package. It cannot actually
// run here since there's no real network or MongoDB server.
function App() {
  const driverCode = [
    "import { MongoClient } from \\"mongodb\\";",
    "",
    "const client = new MongoClient(\\"mongodb://localhost:27017\\");",
    "await client.connect();",
    "",
    "const db = client.db(\\"blogApp\\");",
    "const posts = db.collection(\\"posts\\");",
    "",
    "// The exact same query/update language taught throughout this subject:",
    "const published = await posts.find({ published: true }).toArray();",
    "const result = await posts.insertOne({ title: \\"New Post\\", published: false });",
    "await posts.updateOne({ _id: result.insertedId }, { \\$set: { published: true } });",
  ];

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 14, borderRadius: 6, overflow: "auto" }}>
        {driverCode.join("\\n")}
      </pre>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        Notice: find(), insertOne(), and \\$set are identical to what you've been running in this
        sandbox's Collection class — the driver's job is just to send them over the network.
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "same-operation-three-ways",
      title: "The same insertOne(), three ways",
      summary: "mongosh, the Node.js driver, and Compass all end up describing the identical operation.",
      code: `function App() {
  const rows = [
    { tool: "mongosh", snippet: "db.posts.insertOne({ title: \\"New Post\\" })" },
    { tool: "Node.js driver", snippet: "await db.collection(\\"posts\\").insertOne({ title: \\"New Post\\" })" },
    { tool: "Python driver (pymongo)", snippet: "db.posts.insert_one({\\"title\\": \\"New Post\\"})" },
    { tool: "Compass", snippet: "Click \\"Insert Document\\", type { title: \\"New Post\\" }, click Insert" },
  ];

  return (
    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
      <thead>
        <tr>
          <th style={{ textAlign: "left", padding: 8, borderBottom: "2px solid #d1d5db" }}>Tool</th>
          <th style={{ textAlign: "left", padding: 8, borderBottom: "2px solid #d1d5db" }}>Same operation, expressed as</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r) => (
          <tr key={r.tool}>
            <td style={{ padding: 8, borderBottom: "1px solid #e5e7eb", fontWeight: "bold" }}>{r.tool}</td>
            <td style={{ padding: 8, borderBottom: "1px solid #e5e7eb", fontFamily: "monospace" }}>{r.snippet}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

render(<App />);`,
    },
    {
      id: "compass-panels-overview",
      title: "MongoDB Compass, described panel by panel",
      summary: "What each major area of the Compass GUI corresponds to, in query-language terms.",
      code: `function App() {
  const panels = [
    { name: "Databases list", does: "Shows every database on the connected server — same as running \\"show dbs\\" in mongosh" },
    { name: "Documents tab", does: "Browses a collection's documents with a filter bar — typing { age: { \\$gt: 30 } } there is identical to find({ age: { \\$gt: 30 } })" },
    { name: "Schema tab", does: "Samples documents and charts which fields appear, how often, and their types — useful for spotting a schema-less collection's actual shape" },
    { name: "Explain Plan tab", does: "Runs the current query with explain() and visualizes whether an index was used" },
    { name: "Indexes tab", does: "Lists and creates indexes without typing createIndex() by hand" },
  ];

  return (
    <div style={{ display: "grid", gap: 8 }}>
      {panels.map((p) => (
        <div key={p.name} style={{ padding: 10, background: "#f3f4f6", borderRadius: 6, borderLeft: "3px solid #16a34a" }}>
          <strong>{p.name}</strong>
          <div style={{ color: "#6b7280", fontSize: 13 }}>{p.does}</div>
        </div>
      ))}
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        Every Compass action is a GUI layer over the same query/update documents used everywhere
        else in this subject — nothing new to learn syntactically.
      </p>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
