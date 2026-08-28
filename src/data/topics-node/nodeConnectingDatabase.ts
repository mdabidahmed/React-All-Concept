import type { Topic } from "../../types";

export const nodeConnectingDatabaseTopic: Topic = {
  id: "node-connecting-database",
  title: "Node.js Connecting to a Database",
  category: "Databases & Advanced",
  shortExplanation: `Connecting Node.js to a database follows roughly the same shape no matter which database you use: install a **driver** (or an ORM built on top of one), configure a **connection string**, open a **connection pool**, and run every query **asynchronously**.

- A driver package speaks a specific database's wire protocol (\`pg\` for PostgreSQL, \`mysql2\` for MySQL, the \`mongodb\` driver or \`mongoose\` for MongoDB); an ORM like Prisma or Sequelize sits on top and offers a friendlier API
- Credentials and host details usually live in environment variables, not hardcoded in source — the same \`.env\` pattern covered in this subject's environment-configuration topic
- Every real query crosses a network boundary, even to a database on the same machine, so every driver's query method returns a **Promise** (or, in older code, uses a callback) — never a synchronous return value
- This topic stays deliberately general — a dedicated MongoDB-focused subject covers one specific database in real depth`,
  longExplanation: `Databases are covered in far more depth elsewhere in this app's curriculum (a dedicated MongoDB subject), so this topic stays intentionally general: the *shape* of connecting to any database from Node.js, independent of which one you pick.

**A driver, or an ORM on top of one.** Node itself has no built-in database support — connecting to PostgreSQL, MySQL, MongoDB, SQLite, or anything else requires installing a package that speaks that specific database's network protocol: \`pg\` for PostgreSQL, \`mysql2\` for MySQL, the official \`mongodb\` driver for MongoDB. On top of a raw driver, many projects add an **ORM** (object-relational mapper) or query builder — Prisma, Sequelize, TypeORM for SQL databases, Mongoose for MongoDB — which trades some of the driver's raw flexibility for a friendlier, often more type-safe API: writing \`User.findById(id)\` instead of hand-assembling a SQL string or a MongoDB query document.

**Connecting.** Almost every driver wants the same handful of pieces of information: a host, a port, a username, a password, and a database name — frequently bundled into one connection string, like \`postgres://user:pass@localhost:5432/mydb\`. These details should come from **environment variables** rather than being hardcoded into source, for the same reason covered in this subject's environment-configuration topic: a password committed to source control is a real security incident waiting to happen, and different environments (local development, staging, production) need different values anyway.

**Connection pools.** Opening a fresh network connection for every single query would be slow — a database connection involves a real handshake with real latency, repeated on every request. Instead, drivers typically open a small **pool** of connections once, up front, and hand a query to whichever pooled connection is currently free, returning it to the pool when the query finishes. Application code rarely manages this by hand — calling \`pool.query(...)\` (or the ORM's equivalent) borrows and returns a connection automatically behind the scenes. Skipping the pool and opening a brand-new connection per request is a real, common performance mistake, since establishing connections has real overhead and most databases cap how many can be open at once.

**Every real query is asynchronous**, without exception. Unlike \`fs.readFileSync\`, there's no synchronous way to run a database query — the request genuinely has to leave the process, travel over a socket, and come back, however fast that round trip is. Every driver's query method returns a **Promise** you \`await\`, matching the pattern covered throughout this subject's async topics — reaching for a synchronous-looking database call doesn't exist as an option the way it does for file I/O.

**Errors are common and expected**, not exceptional edge cases: wrong credentials, an unreachable host, a database that's temporarily down, a query that violates a constraint. Real code wraps every database call in a \`try\`/\`catch\` (or handles the rejected Promise), exactly like any other \`await\`ed operation covered in the error-handling topic — an unhandled database error can otherwise crash an entire request, or in the worst case, the whole process.

**This sandbox has no real database, network, or driver package to connect to.** The examples below simulate a tiny in-memory "database" — a plain JavaScript array standing in for a table or collection — wrapped in \`async\` functions that return Promises and use \`setTimeout\` to imitate real network latency. The functions are named \`connect\` and \`query\` deliberately, so the calling code (\`await connect(...)\`, then \`await db.query(...)\`) reads the same way real driver code would, even though nothing here actually leaves the browser tab.`,
  examples: [
    {
      id: "connect-and-query",
      title: "The general connect() + query() pattern",
      summary: "A simulated driver: async connect(), then an async query() returning a Promise of rows.",
      code: `const fakeTable = [
  { id: 1, name: "Ada Lovelace", role: "engineer" },
  { id: 2, name: "Grace Hopper", role: "engineer" },
  { id: 3, name: "Alan Turing", role: "researcher" },
];

function connect(connectionString) {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve({
        query(sql) {
          return new Promise(function (resolveQuery) {
            setTimeout(function () {
              resolveQuery(fakeTable);
            }, 200);
          });
        },
      });
    }, 300);
  });
}

function App() {
  const [log, setLog] = useState([]);

  function print(value) {
    setLog(function (prev) {
      return [...prev, value];
    });
  }

  async function run() {
    setLog([]);
    print("Connecting to postgres://user:pass@localhost:5432/mydb ...");
    const db = await connect("postgres://user:pass@localhost:5432/mydb");
    print("Connected. Running query...");
    const rows = await db.query("SELECT * FROM users");
    print("Rows: " + JSON.stringify(rows));
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={run}>connect() then query()</button>
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
      id: "queries-are-always-async",
      title: "Database queries are always asynchronous",
      summary: "Unlike reading a local file, there's no synchronous version of a database query -- ever.",
      code: `const fakeUsers = [{ id: 1, name: "Ada Lovelace" }];

// There is no queryUsersSync() -- a real query always crosses a network
// boundary, even to a database on the same machine, so it is always async.
function queryUsers() {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve(fakeUsers);
    }, 250);
  });
}

function App() {
  const [status, setStatus] = useState("idle");
  const [result, setResult] = useState(null);

  async function run() {
    setStatus("pending");
    setResult(null);
    const rows = await queryUsers();
    setStatus("done");
    setResult(rows);
  }

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <button onClick={run}>await queryUsers()</button>
      <p>Status: {status}</p>
      <p>Result: {result ? JSON.stringify(result) : "(nothing yet -- the query is a real async round trip)"}</p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "handling-connection-error",
      title: "Handling a failed connection",
      summary: "Wrong credentials, a down database, a network blip -- connecting can fail, and code must expect it.",
      code: `function connect(connectionString) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      if (connectionString.indexOf("wrong-password") !== -1) {
        reject(new Error("password authentication failed for user \\"app\\""));
        return;
      }
      resolve({ query: function () { return Promise.resolve([]); } });
    }, 300);
  });
}

function App() {
  const [output, setOutput] = useState("");

  async function tryConnect(connectionString) {
    setOutput("Connecting...");
    try {
      await connect(connectionString);
      setOutput("Connected successfully.");
    } catch (err) {
      setOutput("Connection failed: " + err.message);
    }
  }

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <button onClick={function () { tryConnect("postgres://app:correct-password@localhost/db"); }}>
          Connect with correct credentials
        </button>
        <button onClick={function () { tryConnect("postgres://app:wrong-password@localhost/db"); }}>
          Connect with wrong credentials
        </button>
      </div>
      <p>{output || "// output appears here"}</p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "gotcha-connection-per-query",
      title: "Gotcha: opening a brand-new connection for every query",
      summary: "Without a pool, every query pays the full connection cost again -- a real, common performance bug.",
      code: `let connectionsOpened = 0;

function openNewConnection() {
  connectionsOpened = connectionsOpened + 1;
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve({ query: function () { return Promise.resolve("ok"); } });
    }, 150); // simulated handshake cost, paid every single time
  });
}

// A pool opens its connections ONCE, then reuses them for every query.
const pool = { connection: null };
function getPooledConnection() {
  if (pool.connection) return Promise.resolve(pool.connection);
  connectionsOpened = connectionsOpened + 1;
  return new Promise(function (resolve) {
    setTimeout(function () {
      pool.connection = { query: function () { return Promise.resolve("ok"); } };
      resolve(pool.connection);
    }, 150);
  });
}

function App() {
  const [withoutPool, setWithoutPool] = useState(null);
  const [withPool, setWithPool] = useState(null);

  async function runWithoutPool() {
    connectionsOpened = 0;
    for (let i = 0; i < 5; i++) {
      const conn = await openNewConnection();
      await conn.query("SELECT 1");
    }
    setWithoutPool(connectionsOpened);
  }

  async function runWithPool() {
    connectionsOpened = 0;
    for (let i = 0; i < 5; i++) {
      const conn = await getPooledConnection();
      await conn.query("SELECT 1");
    }
    setWithPool(connectionsOpened);
  }

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <button onClick={runWithoutPool}>Run 5 queries WITHOUT a pool</button>
        <button onClick={runWithPool}>Run 5 queries WITH a pool</button>
      </div>
      <p>Connections opened without a pool: {withoutPool === null ? "-- click above --" : withoutPool}</p>
      <p>Connections opened with a pool: {withPool === null ? "-- click above --" : withPool}</p>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
