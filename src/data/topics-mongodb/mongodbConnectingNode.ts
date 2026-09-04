import type { Topic } from "../../types";

export const mongodbConnectingNodeTopic: Topic = {
  id: "mongodb-connecting-node",
  title: "Connecting to MongoDB from Node.js",
  category: "Mongoose & Node Integration",
  shortExplanation: `Node.js code can talk to MongoDB two ways: the official, lower-level **MongoDB Node.js driver** (\`MongoClient.connect(uri)\`, no schema enforcement), or **Mongoose** built on top of it (higher-level, schema-based).

- A **connection string** — \`mongodb://user:pass@host:port/database\` (or \`mongodb+srv://...\` for Atlas) — bundles every detail a driver needs to connect
- The raw driver hands back plain documents and lets you write MongoDB's native query syntax directly; Mongoose adds schemas, validation, and models on top
- Credentials belong in **environment variables**, never hardcoded in source — the same \`.env\` pattern covered in the Node.js subject`,
  longExplanation: `Every topic in the Mongoose category so far has used Mongoose's own API — but Mongoose itself is built on something more fundamental: the **official MongoDB Node.js driver** (the \`mongodb\` npm package), the lower-level library that actually speaks MongoDB's wire protocol over the network. Understanding both, and when to reach for which, matters even in a Mongoose-heavy project.

**The raw driver**: \`const client = new MongoClient(uri); await client.connect();\` establishes the connection, and \`client.db("myapp").collection("users")\` gets a handle to a specific collection — from there, methods like \`.find()\`, \`.insertOne()\`, \`.updateOne()\` work exactly as covered throughout the earlier "MongoDB Basics" topics in this subject, because those topics' simulated \`Collection\` class was modeled directly on the real driver's API. The driver enforces **no schema at all** — it hands back and accepts plain JavaScript objects, giving maximum flexibility and the least abstraction between your code and what MongoDB actually does.

**Mongoose**, covered in the rest of this category, sits on top of that same driver and adds the schema/model/validation/middleware layer this category has been building out. **When to reach for which**: the raw driver suits small scripts, situations demanding fine control over exactly what's sent to the database, or teams that prefer enforcing structure at the application layer some other way (e.g., a separate validation library). Mongoose suits the far more common case of a larger application where consistent document shape, built-in validation, and convenient model methods are worth the extra abstraction layer — which is why most real-world Node + MongoDB projects reach for Mongoose by default, and drop to the raw driver only for specific cases Mongoose makes awkward.

**Connection string anatomy.** Both the raw driver and Mongoose accept the same connection string format: \`mongodb://username:password@host:port/database\`. Breaking it down — \`mongodb://\` is the protocol/scheme; \`username:password\` are credentials for a database user (distinct from an OS-level login); \`host:port\` is where the server is reachable (\`localhost:27017\` for a local install, since \`27017\` is MongoDB's default port); \`/database\` names which database on that server to use. A self-hosted replica set often lists multiple \`host:port\` pairs separated by commas instead of just one. MongoDB Atlas (the managed cloud service, covered in a later topic in this subject) issues connection strings with the \`mongodb+srv://\` scheme instead of plain \`mongodb://\` — the \`+srv\` tells the driver to look up the actual list of servers via a DNS SRV record rather than being given them directly, which lets Atlas add, remove, or fail over servers without ever changing the connection string an application uses.

**Never hardcode credentials.** A connection string contains a real password — committing \`mongodb://admin:SuperSecret123@prod-host/app\` directly into source code is a genuine, common security incident, not a theoretical one: search engines and automated bots actively scan public GitHub repositories for exactly this pattern. This ties directly back to the environment-variable pattern covered in the Node.js subject: the connection string belongs in \`process.env.MONGODB_URI\` (or similar), loaded from a \`.env\` file that's git-ignored in development and set through the hosting platform's secret/config settings in production — never typed directly into a \`connect()\` call in a file that gets committed.

**This sandbox has no real network layer or MongoDB server to connect to.** The examples below build a small, genuinely-working simulation of the raw driver's shape — a fake \`MongoClient\` whose \`connect(uri)\` resolves a \`client\` object, whose \`.db(name).collection(name)\` returns a real in-memory \`Collection\` (reusing the same kind of \`insertOne\`/\`find\` logic from earlier in this subject) — alongside a genuine (non-simulated) connection-string parser, since parsing a string with regular expressions is real JavaScript that needs no network or package at all.`,
  examples: [
    {
      id: "parse-connection-string",
      title: "Parsing a mongodb:// connection string",
      summary: "Genuine string parsing (no simulation needed) -- breaking a URI into its real parts.",
      code: `function parseConnectionString(uri) {
  const match = uri.match(/^mongodb(\\+srv)?:\\/\\/(?:([^:]+):([^@]+)@)?([^/]+)\\/(.+)$/);
  if (!match) return null;
  return {
    isAtlasStyle: Boolean(match[1]),
    username: match[2] || null,
    password: match[3] ? "***hidden***" : null,
    hostAndPort: match[4],
    database: match[5],
  };
}

function App() {
  const [uri, setUri] = useState("mongodb://appuser:secretpass@localhost:27017/myapp");
  const parsed = parseConnectionString(uri);

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <input
        value={uri}
        onChange={function (e) { setUri(e.target.value); }}
        style={{ padding: 8, fontFamily: "monospace" }}
      />
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6 }}>
        {parsed ? JSON.stringify(parsed, null, 2) : "Could not parse this connection string."}
      </pre>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        Try changing "mongodb://" to "mongodb+srv://" and removing the port -- that's the Atlas-style form.
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "raw-driver-connect-and-collection",
      title: "MongoClient.connect(uri) -> client.db().collection()",
      summary: "A simulated raw driver: no schema, no model -- just a Collection handle with real insert/find logic.",
      code: `function matchesQuery(doc, query) {
  for (const key in query) {
    if (doc[key] !== query[key]) return false;
  }
  return true;
}

function createCollection() {
  const docs = [];
  let nextId = 1;
  return {
    insertOne: function (doc) {
      const withId = { _id: nextId++, ...doc };
      docs.push(withId);
      return { insertedId: withId._id };
    },
    find: function (query = {}) {
      return docs.filter(function (doc) { return matchesQuery(doc, query); });
    },
  };
}

function createFakeMongoClient() {
  const databases = {};
  return {
    connect: function (uri) {
      return new Promise(function (resolve) {
        setTimeout(function () {
          resolve({
            db: function (name) {
              if (!databases[name]) databases[name] = {};
              return {
                collection: function (collectionName) {
                  if (!databases[name][collectionName]) {
                    databases[name][collectionName] = createCollection();
                  }
                  return databases[name][collectionName];
                },
              };
            },
          });
        }, 250);
      });
    },
  };
}

const MongoClient = createFakeMongoClient();

function App() {
  const [log, setLog] = useState([]);

  function print(value) {
    setLog(function (prev) { return [...prev, value]; });
  }

  async function run() {
    setLog([]);
    print("await MongoClient.connect(uri)...");
    const client = await MongoClient.connect("mongodb://localhost:27017/myapp");
    const users = client.db("myapp").collection("users");
    users.insertOne({ name: "Ada Lovelace", age: 28 });
    print("Inserted a raw document -- no schema was checked against it.");
    print("find({}) -> " + JSON.stringify(users.find({})));
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={run}>Connect with the raw driver + insert + find</button>
      <div style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 90, fontFamily: "monospace", fontSize: 13, display: "grid", gap: 4 }}>
        {log.length === 0
          ? "// output appears here"
          : log.map(function (line, i) {
              return <div key={i}>{line}</div>;
            })}
      </div>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "credentials-from-env-not-hardcoded",
      title: "Gotcha: hardcoded credentials vs. environment variables",
      summary: "The same connect() call, driven by a hardcoded string versus a simulated process.env lookup.",
      code: `// Representative simulated process.env -- a real app reads actual OS/hosting env vars.
const fakeProcessEnv = { MONGODB_URI: "mongodb://appuser:realpassword@prod-host:27017/app" };

function connectHardcoded() {
  // Never do this: a real password, committed directly into source control.
  const uri = "mongodb://appuser:realpassword@prod-host:27017/app";
  return "Connecting with a HARDCODED string -- this exact line would leak the password to anyone who reads the source.";
}

function connectFromEnv() {
  const uri = fakeProcessEnv.MONGODB_URI;
  return "Connecting with process.env.MONGODB_URI -- the real value never appears in source code at all.";
}

function App() {
  const [output, setOutput] = useState("");

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <button onClick={function () { setOutput(connectHardcoded()); }}>Show the hardcoded approach</button>
        <button onClick={function () { setOutput(connectFromEnv()); }}>Show the process.env approach</button>
      </div>
      <p>{output || "// click a button above"}</p>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        Both "work" the same way at runtime -- the difference only shows up the moment source code
        is shared, committed to a public repo, or reviewed by someone else.
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "srv-vs-standard-uri",
      title: "mongodb:// vs. mongodb+srv:// at a glance",
      summary: "A side-by-side comparison of a self-hosted-style URI and an Atlas-style URI.",
      code: `function App() {
  const rows = [
    { label: "Scheme", standard: "mongodb://", srv: "mongodb+srv://" },
    { label: "Port in the URI", standard: "Explicit, e.g. :27017", srv: "Omitted -- resolved via DNS" },
    { label: "Server list", standard: "Given directly (one or more host:port pairs)", srv: "Looked up from a DNS SRV record" },
    { label: "Typical use", standard: "Self-hosted MongoDB, local development", srv: "MongoDB Atlas (managed cloud)" },
  ];

  return (
    <div style={{ display: "grid", gap: 8 }}>
      {rows.map(function (row) {
        return (
          <div key={row.label} style={{ padding: 10, background: "#f3f4f6", borderRadius: 6 }}>
            <strong>{row.label}</strong>
            <div>mongodb://: {row.standard}</div>
            <div>mongodb+srv://: {row.srv}</div>
          </div>
        );
      })}
    </div>
  );
}

render(<App />);`,
    },
  ],
};
