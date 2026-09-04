import type { Topic } from "../../types";

export const mongodbDatabasesCollectionsTopic: Topic = {
  id: "mongodb-databases-collections",
  title: "MongoDB Databases and Collections",
  category: "MongoDB Basics",
  shortExplanation: `A single MongoDB server hosts many **databases**; each database holds many **collections**; each collection holds many **documents** — the hierarchy is \`database → collection → document\`.

- \`use myDatabase\` switches (or creates) the database you're working in inside \`mongosh\`
- Both databases and collections are created **implicitly** — the first time you insert into them, they simply start existing
- Naming convention: lowercase, no spaces, usually a plural noun for a collection (\`users\`, \`products\`, \`orders\`)`,
  longExplanation: `Before writing a single query, it helps to be precise about the containers data actually lives in — MongoDB organizes everything around a three-level hierarchy: **databases** contain **collections**, and collections contain **documents**.

- A **database** is an isolated container for a group of related collections — one MongoDB server (or cluster) can host many databases side by side, each completely separate from the others. A typical setup might have one database per application (\`blogApp\`, \`shopApp\`), or one per environment (\`myApp_dev\`, \`myApp_test\`, \`myApp_prod\`).
- A **collection** groups related documents together, similar in spirit to a table — a \`blogApp\` database might have \`posts\`, \`comments\`, and \`users\` collections. Unlike a SQL table, a collection has no fixed column list to declare up front.
- Inside \`mongosh\` (the interactive shell, covered in its own topic), \`use myDatabase\` is how you select which database subsequent commands operate against. The interesting part: **it doesn't need to already exist**. Running \`use blogApp\` against a brand-new server switches your session's context to a database named \`blogApp\` without error, even though nothing has been stored in it yet — MongoDB just remembers "this is now the active database for this session."
- The database (and any collection you reference inside it) only **actually** gets created in a way that shows up in \`show dbs\`/\`show collections\` once you write your **first document** into it — typically via \`insertOne\`/\`insertMany\`, covered in upcoming topics. Running \`db.posts.insertOne({ title: "Hello" })\` right after \`use blogApp\` silently creates both the \`blogApp\` database and its \`posts\` collection on the spot, with no separate "create database" or "create collection" step required (though explicit \`db.createCollection()\`/\`db.createDatabase()\`-style commands do exist for the rarer cases where you need to configure something up front, like validation rules covered later in this subject).
- This "implicit creation on first write" behavior is a direct consequence of MongoDB's schema-flexible philosophy — there's no fixed structure to declare in advance, so there's nothing stopping the database from springing into existence the moment it's actually needed.
- **Naming conventions** that most MongoDB codebases converge on: lowercase names, no spaces (use camelCase or snake_case instead — \`orderItems\` or \`order_items\`, never \`order items\`), and collection names are conventionally **plural nouns** describing what each document *is* — \`users\` (not \`user\`), \`products\`, \`orders\`. This mirrors the same convention most SQL codebases use for table names, and it reads naturally in code: \`db.users.find(...)\` reads as "find within the users."
- A database name has a few hard technical restrictions worth knowing: it can't contain a literal space, \`/\`, \`\\\`, \`.\`, quote characters, or \`$\`, and it's limited to 64 bytes — none of which usually matters once you're already following the lowercase/no-spaces convention above.
- Two special databases exist on every MongoDB server: \`admin\` (used for authentication and certain administrative commands) and \`config\` (used internally by sharded clusters) — application data should never be stored in either.

Because this sandbox has no real MongoDB server process to connect to, the examples below simulate a small in-memory "server" — a plain JavaScript object mapping database names to their collections — to demonstrate the exact same implicit-creation behavior a real \`mongosh\` session shows.`,
  examples: [
    {
      id: "server-with-multiple-databases",
      title: "One server, several isolated databases",
      summary: "A tiny in-memory 'server' holding multiple databases, each with its own collections.",
      code: `function App() {
  const server = {
    blogApp: { posts: [{ title: "Hello Mongo" }], users: [{ name: "Ada" }] },
    shopApp: { products: [{ name: "Widget" }], orders: [] },
  };

  const databaseNames = Object.keys(server);

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <p>show dbs -></p>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 10, borderRadius: 6 }}>
        {databaseNames.join("\\n")}
      </pre>
      {databaseNames.map((dbName) => (
        <div key={dbName}>
          <p style={{ margin: "4px 0", fontWeight: 600 }}>{dbName} collections:</p>
          <pre style={{ background: "#111827", color: "#d1fae5", padding: 10, borderRadius: 6 }}>
            {Object.keys(server[dbName]).join(", ")}
          </pre>
        </div>
      ))}
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "collection-created-on-first-insert",
      title: "A collection springs into existence on its first insert",
      summary: "Genuine logic: insertOne creates the collection array if it doesn't already exist.",
      code: `class Database {
  constructor(name) {
    this.name = name;
    this.collections = {}; // starts completely empty
  }
  collection(name) {
    if (!this.collections[name]) {
      this.collections[name] = []; // implicit creation, right here
    }
    return {
      insertOne: (doc) => {
        this.collections[name].push(doc);
        return { acknowledged: true };
      },
    };
  }
  listCollections() {
    return Object.keys(this.collections);
  }
}

function App() {
  const [log, setLog] = useState(["show collections -> " + JSON.stringify([])]);
  const [db] = useState(() => new Database("blogApp"));

  function insertFirstPost() {
    db.collection("posts").insertOne({ title: "Hello Mongo" });
    setLog((prev) => [...prev, "db.posts.insertOne({ title: \\"Hello Mongo\\" })", "show collections -> " + JSON.stringify(db.listCollections())]);
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={insertFirstPost}>Run: db.posts.insertOne(...)</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 10, borderRadius: 6, minHeight: 60 }}>
        {log.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "valid-and-invalid-names",
      title: "Naming conventions: valid vs. discouraged",
      summary: "Lowercase, no spaces, plural nouns — checked with real validation logic.",
      code: `function checkCollectionName(name) {
  const problems = [];
  if (/\\s/.test(name)) problems.push("contains a space");
  if (name !== name.toLowerCase()) problems.push("not lowercase");
  if (!name.endsWith("s")) problems.push("not a plural noun (convention, not a hard rule)");
  return problems;
}

function App() {
  const candidates = ["users", "Order Items", "product", "blog_posts"];

  return (
    <div style={{ display: "grid", gap: 8 }}>
      {candidates.map((name) => {
        const problems = checkCollectionName(name);
        return (
          <div key={name} style={{ padding: 8, borderRadius: 6, background: problems.length ? "#7f1d1d" : "#14532d", color: "white" }}>
            <strong>{JSON.stringify(name)}</strong> — {problems.length ? problems.join("; ") : "follows convention"}
          </div>
        );
      })}
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "isolated-databases-dont-collide",
      title: "Two databases, both with a 'users' collection — no collision",
      summary: "Genuine logic showing database isolation: the same collection name in two databases holds completely separate data.",
      code: `class Database {
  constructor() {
    this.collections = {};
  }
  collection(name) {
    if (!this.collections[name]) this.collections[name] = [];
    return {
      insertOne: (doc) => this.collections[name].push(doc),
      find: () => this.collections[name],
    };
  }
}

function App() {
  const [dbOne] = useState(() => new Database());
  const [dbTwo] = useState(() => new Database());

  dbOne.collection("users").insertOne({ name: "Ada Lovelace" });
  dbTwo.collection("users").insertOne({ name: "Grace Hopper" });

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
      <div>
        <p style={{ fontWeight: 600 }}>appOneDb.users</p>
        <pre style={{ background: "#111827", color: "#d1fae5", padding: 10, borderRadius: 6 }}>
          {JSON.stringify(dbOne.collection("users").find(), null, 2)}
        </pre>
      </div>
      <div>
        <p style={{ fontWeight: 600 }}>appTwoDb.users</p>
        <pre style={{ background: "#111827", color: "#d1fae5", padding: 10, borderRadius: 6 }}>
          {JSON.stringify(dbTwo.collection("users").find(), null, 2)}
        </pre>
      </div>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
