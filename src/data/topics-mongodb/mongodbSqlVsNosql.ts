import type { Topic } from "../../types";

export const mongodbSqlVsNosqlTopic: Topic = {
  id: "mongodb-sql-vs-nosql",
  title: "MongoDB: SQL vs NoSQL",
  category: "MongoDB Basics",
  shortExplanation: `**SQL** (relational) databases store data in rigid **tables** with a fixed set of columns; **NoSQL** databases like MongoDB store flexible, JSON-like **documents** that can vary in shape from one record to the next.

- SQL: \`tables\` → \`rows\` → \`columns\`, related data lives in separate tables linked by foreign keys and combined with \`JOIN\`s
- NoSQL (MongoDB): \`collections\` → \`documents\` → \`fields\`, related data is often **embedded** directly inside a single document
- Neither is strictly "better" — the right choice depends on how structured and interrelated the data is, and how fast its shape needs to change`,
  longExplanation: `Choosing between a relational (SQL) database and a document database like MongoDB is one of the first real architectural decisions a project makes, and it's worth understanding as a genuine trade-off rather than a "NoSQL is the modern upgrade" story — both models are still widely used in production, often on the very same team.

- **Structure.** A relational database enforces a **schema** up front: a \`users\` table has an exact, named set of columns (\`id\`, \`name\`, \`email\`...), and every single row must fill in that same shape — adding a new column means running a migration against the whole table. MongoDB collections don't enforce this by default — one document can have a \`phone\` field, the next one doesn't, and the database doesn't complain. This makes MongoDB attractive when a data shape is still evolving quickly (early-stage products, content with varying attributes) — but it also means *your application code* now carries more of the responsibility for consistency that the database used to enforce for free.
- **Relationships.** Relational databases are built around **normalization** — data that would otherwise be duplicated (like a customer's address) lives in exactly one table, and every other table that needs it references it by a foreign key, reassembled on demand with a \`JOIN\`. This keeps data consistent (update the address once, everywhere sees the update) and makes complex, multi-table reporting queries a first-class use case. MongoDB instead favors **embedding** — related data is nested directly inside the document that needs it most often, so reading a blog post *with* its comments is a single document fetch instead of a join across two tables. The cost: data that logically belongs in many places (like a product name shown on every order that ever included it) can become duplicated, and keeping duplicates in sync becomes the application's job. MongoDB does support a form of "joining" for the cases embedding doesn't fit (covered later in this subject), but it's less central to how the database is used than \`JOIN\` is in SQL.
- **Consistency guarantees.** Traditional relational databases are built around **ACID transactions** at their core — a multi-table update either fully happens or fully doesn't, with strong guarantees the moment more than one row is involved. MongoDB has supported multi-document ACID transactions for years now too, but its architecture and defaults still lean toward single-document operations being the fast, "free" case, with transactions available but a slightly heavier tool you reach for deliberately.
- **Scaling.** Relational databases traditionally scale **vertically** — a bigger server, more CPU, more RAM — because spreading a single normalized, JOIN-heavy schema across many machines is architecturally hard. MongoDB was designed from the outset for **horizontal scaling** — sharding a collection's documents across many servers — which is easier precisely because a document is a self-contained unit that doesn't need a JOIN to another server's data to make sense on its own.

**When SQL tends to be the better fit:** the data's structure and relationships are well understood up front and unlikely to churn; the application needs strict, table-spanning consistency (banking ledgers, inventory counts that must never go negative); or the primary workload is complex reporting/analytics that slices the same data many different relational ways.

**When MongoDB tends to be the better fit:** the data's shape is still evolving, or naturally varies between records (a product catalog where a "book" and a "laptop" have almost nothing in common); the application is JSON-native end to end (a Node.js/React stack, a REST or GraphQL API) and a document-shaped database removes an entire translation layer; or the application needs to scale horizontally across many commodity servers as it grows.

In practice, many real systems use **both** — a relational database for the structured, transactional core of the business, and MongoDB (or another document store) for the parts of the system whose data shape is fast-moving or naturally document-like. Neither model has fully replaced the other, and understanding both well is what lets you pick deliberately instead of by default.`,
  examples: [
    {
      id: "same-data-two-shapes",
      title: "The same data, modeled two ways",
      summary: "A blog post with comments: normalized relational rows vs. one embedded MongoDB document.",
      code: `function App() {
  // Relational: three separate tables, linked by foreign keys
  const postsTable = [{ id: 1, title: "Learning MongoDB", authorId: 7 }];
  const usersTable = [{ id: 7, name: "Ada Lovelace" }];
  const commentsTable = [
    { id: 101, postId: 1, body: "Great post!" },
    { id: 102, postId: 1, body: "Very clear, thanks." },
  ];

  // Document: everything related lives inside one MongoDB document
  const postDocument = {
    _id: 1,
    title: "Learning MongoDB",
    author: { name: "Ada Lovelace" },
    comments: [
      { body: "Great post!" },
      { body: "Very clear, thanks." },
    ],
  };

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
      <div>
        <p style={{ fontWeight: 600 }}>Relational (3 tables)</p>
        <pre style={{ background: "#111827", color: "#d1fae5", padding: 10, borderRadius: 6, fontSize: 12 }}>
          {"posts:\\n" + JSON.stringify(postsTable, null, 2) +
            "\\n\\nusers:\\n" + JSON.stringify(usersTable, null, 2) +
            "\\n\\ncomments:\\n" + JSON.stringify(commentsTable, null, 2)}
        </pre>
      </div>
      <div>
        <p style={{ fontWeight: 600 }}>MongoDB (1 embedded document)</p>
        <pre style={{ background: "#111827", color: "#d1fae5", padding: 10, borderRadius: 6, fontSize: 12 }}>
          {JSON.stringify(postDocument, null, 2)}
        </pre>
      </div>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "simulating-a-join-vs-embedding",
      title: "Reassembling a JOIN vs. reading an embedded field",
      summary: "A genuine JS join function stitches two tables together; the document version needs no work at all.",
      code: `function joinPostsWithAuthors(posts, users) {
  // A real SQL JOIN, reimplemented as real JS logic
  return posts.map((post) => ({
    ...post,
    author: users.find((u) => u.id === post.authorId) || null,
  }));
}

function App() {
  const postsTable = [{ id: 1, title: "Learning MongoDB", authorId: 7 }];
  const usersTable = [{ id: 7, name: "Ada Lovelace" }];

  const joined = joinPostsWithAuthors(postsTable, usersTable);

  const postDocument = {
    _id: 1,
    title: "Learning MongoDB",
    author: { name: "Ada Lovelace" },
  };

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <p>Relational: join posts + users at query time -></p>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 10, borderRadius: 6 }}>
        {JSON.stringify(joined, null, 2)}
      </pre>
      <p>MongoDB: the author is already embedded, no join needed -></p>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 10, borderRadius: 6 }}>
        {"postDocument.author.name -> " + postDocument.author.name}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "rigid-schema-vs-flexible-schema",
      title: "A rigid schema rejects a mismatched row; a collection doesn't",
      summary: "Simulating a SQL table's fixed columns versus a MongoDB collection accepting a differently-shaped document.",
      code: `const tableColumns = ["id", "name", "price"];

function insertIntoTable(table, row) {
  const extraColumns = Object.keys(row).filter((k) => !tableColumns.includes(k));
  if (extraColumns.length > 0) {
    throw new Error("Unknown column(s): " + extraColumns.join(", "));
  }
  table.push(row);
  return table;
}

function App() {
  const [log, setLog] = useState([]);

  function tryRelational() {
    try {
      insertIntoTable([], { id: 1, name: "Widget", price: 9, warrantyMonths: 12 });
      setLog((prev) => [...prev, "relational: inserted (unexpected)"]);
    } catch (err) {
      setLog((prev) => [...prev, "relational: rejected -> " + err.message]);
    }
  }

  function tryDocument() {
    const products = [];
    products.push({ id: 1, name: "Widget", price: 9, warrantyMonths: 12 });
    setLog((prev) => [...prev, "MongoDB: inserted -> " + JSON.stringify(products[0])]);
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={tryRelational}>Insert extra column into SQL table</button>
        <button onClick={tryDocument}>Insert extra field into MongoDB collection</button>
      </div>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 10, borderRadius: 6, minHeight: 60 }}>
        {log.join("\\n") || "// click a button above"}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "when-to-reach-for-each",
      title: "A practical comparison, side by side",
      summary: "Neither model wins outright — the table below is a decision aid, not a verdict.",
      code: `function App() {
  const rows = [
    { aspect: "Schema", sql: "Fixed, enforced by the database", nosql: "Flexible, enforced by your app (if at all)" },
    { aspect: "Relationships", sql: "Normalized tables + JOINs", nosql: "Embedding (with references for the rest)" },
    { aspect: "Best for", sql: "Stable structure, strict consistency, heavy reporting", nosql: "Fast-changing shapes, JSON-native apps" },
    { aspect: "Scaling style", sql: "Mostly vertical (bigger server)", nosql: "Built for horizontal (sharding)" },
  ];

  return (
    <table style={{ borderCollapse: "collapse", width: "100%", fontSize: 13 }}>
      <thead>
        <tr>
          <th style={{ textAlign: "left", borderBottom: "2px solid #374151", padding: 8 }}>Aspect</th>
          <th style={{ textAlign: "left", borderBottom: "2px solid #374151", padding: 8 }}>SQL (Relational)</th>
          <th style={{ textAlign: "left", borderBottom: "2px solid #374151", padding: 8 }}>MongoDB (Document)</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r) => (
          <tr key={r.aspect}>
            <td style={{ padding: 8, borderBottom: "1px solid #374151" }}>{r.aspect}</td>
            <td style={{ padding: 8, borderBottom: "1px solid #374151" }}>{r.sql}</td>
            <td style={{ padding: 8, borderBottom: "1px solid #374151" }}>{r.nosql}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

render(<App />);`,
    },
  ],
};
