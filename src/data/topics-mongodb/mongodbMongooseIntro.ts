import type { Topic } from "../../types";

export const mongodbMongooseIntroTopic: Topic = {
  id: "mongodb-mongoose-intro",
  title: "Mongoose Introduction",
  category: "Mongoose & Node Integration",
  shortExplanation: `**Mongoose** is an ==ODM== ("Object Data Modeling" library) for MongoDB and Node.js — it sits on top of MongoDB's own flexible documents and adds schemas, validation, and a convenient model-based API.

- Without Mongoose, any two documents in a collection can have completely different fields; Mongoose lets an app declare the shape it *expects* up front
- \`mongoose.connect(uri)\` opens (and manages) the connection to a MongoDB server, similar in spirit to the raw driver's \`MongoClient.connect(uri)\`
- On top of a connection, Mongoose's \`Schema\` and \`model()\` (covered next) give you methods like \`Model.find()\` instead of hand-written driver calls`,
  longExplanation: `Every earlier topic in this subject worked directly against MongoDB's own flexible document model — any field, on any document, added or removed at will. That flexibility is a genuine strength during early development, but most real applications eventually want more structure: a \`users\` collection where every document really does have a \`name\` and an \`email\`, where \`age\` really is a number and not sometimes a string. **Mongoose** is the most widely used tool in the Node.js ecosystem for adding that structure back in, without giving up MongoDB itself.

Mongoose describes itself as an **ODM** — an *Object Data Modeling* library — the MongoDB-world equivalent of what an **ORM** (*Object-Relational Mapping* library, like Prisma or Sequelize) is for a SQL database. Both solve the same underlying problem: bridge the gap between "the shape my application code thinks in" (JavaScript objects, classes, instances) and "the shape the database actually stores." An ORM maps rows and tables onto objects; an ODM maps flexible documents onto **models** built from a declared **schema**.

Mongoose is built on top of MongoDB's official Node.js driver — it doesn't replace the driver, it wraps it, the same relationship Express has with Node's built-in \`http\` module (covered in the Node.js subject). Every Mongoose call eventually turns into a real driver call underneath; Mongoose's value is entirely in the layer it adds on top: schema definitions, validation rules, default values, middleware hooks that run before/after saving, and a friendlier API shaped around **models** rather than raw collection method calls.

**Connecting** is the first step in any Mongoose-based app: \`mongoose.connect(uri)\`, where \`uri\` is a standard MongoDB connection string (the same \`mongodb://\` or \`mongodb+srv://\` format used by the raw driver, covered in more depth in the "Connecting to MongoDB from Node.js" topic later in this category). \`mongoose.connect()\` returns a Promise that resolves once the connection succeeds — real code \`await\`s it, or attaches \`.then()\`/\`.catch()\`, and wraps it in error handling, exactly like any other async operation. Once connected, Mongoose maintains that connection itself (including its own internal connection pooling) for the lifetime of the process — an application typically calls \`connect()\` **once**, near startup, rather than reconnecting before every query.

Mongoose also exposes the state of that connection through \`mongoose.connection\`, an object with a \`readyState\` property that's one of four numbers: \`0\` (disconnected), \`1\` (connected), \`2\` (connecting), or \`3\` (disconnecting) — and it's also an event emitter, firing events like \`"connected"\`, \`"error"\`, and \`"disconnected"\` that real apps listen for to log connection problems as they happen rather than only at startup.

A common early mistake is calling \`mongoose.connect()\` more than once, or scattered across multiple files — Mongoose is designed around a single shared connection per application, and connecting redundantly (or with mismatched URIs across files) is a real, confusing bug in beginner projects.

**This sandbox cannot install or import the real \`mongoose\` package** — like \`express\` in the Node.js subject, it's an npm dependency that expects a real Node.js process and a real network socket to an actual MongoDB server, neither of which exist in this browser tab. Every example below builds a small, genuinely-working hand-built simulation — a plain JavaScript object shaped like Mongoose's top-level API (\`connect\`, \`connection.readyState\`) — so the calls read identically to real Mongoose code, backed by real (if simplified) JavaScript logic rather than an actual network connection. The next topics in this category build out the simulated \`Schema\` and \`model()\` pieces that this one only introduces.`,
  examples: [
    {
      id: "mongoose-connect-basic",
      title: "mongoose.connect(uri) — a simulated connection",
      summary: "A fake mongoose object whose connect() resolves a Promise, matching the real API shape.",
      code: `function createFakeMongoose() {
  let readyState = 0; // 0 = disconnected, matching real Mongoose's numbering

  const connection = {
    get readyState() {
      return readyState;
    },
  };

  function connect(uri) {
    readyState = 2; // connecting
    return new Promise(function (resolve, reject) {
      setTimeout(function () {
        if (!uri || uri.indexOf("mongodb") !== 0) {
          readyState = 0;
          reject(new Error("Invalid connection string: " + uri));
          return;
        }
        readyState = 1; // connected
        resolve(connection);
      }, 300);
    });
  }

  return { connect: connect, connection: connection };
}

const mongoose = createFakeMongoose();

function App() {
  const [log, setLog] = useState([]);

  function print(value) {
    setLog(function (prev) {
      return [...prev, value];
    });
  }

  async function run() {
    print("readyState before connect: " + mongoose.connection.readyState);
    print("Calling mongoose.connect(\\"mongodb://localhost:27017/myapp\\")...");
    await mongoose.connect("mongodb://localhost:27017/myapp");
    print("Connected! readyState is now: " + mongoose.connection.readyState);
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={run}>mongoose.connect(uri)</button>
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
      id: "mongoose-connect-failure",
      title: "A failed connection is a rejected Promise",
      summary: "An invalid connection string rejects — real code must handle this, not just the happy path.",
      code: `function createFakeMongoose() {
  let readyState = 0;
  const connection = {
    get readyState() {
      return readyState;
    },
  };
  function connect(uri) {
    readyState = 2;
    return new Promise(function (resolve, reject) {
      setTimeout(function () {
        if (!uri || uri.indexOf("mongodb") !== 0) {
          readyState = 0;
          reject(new Error("Invalid connection string: " + JSON.stringify(uri)));
          return;
        }
        readyState = 1;
        resolve(connection);
      }, 250);
    });
  }
  return { connect: connect, connection: connection };
}

const mongoose = createFakeMongoose();

function App() {
  const [output, setOutput] = useState("");

  async function tryConnect(uri) {
    setOutput("Connecting to " + uri + " ...");
    try {
      await mongoose.connect(uri);
      setOutput("Connected. readyState: " + mongoose.connection.readyState);
    } catch (err) {
      setOutput("mongoose.connect() failed: " + err.message);
    }
  }

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <button onClick={function () { tryConnect("mongodb://localhost:27017/myapp"); }}>
          Connect with a valid URI
        </button>
        <button onClick={function () { tryConnect("not-a-real-uri"); }}>
          Connect with an invalid URI
        </button>
      </div>
      <p>{output || "// output appears here"}</p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "readystate-values",
      title: "The four readyState values",
      summary: "0 disconnected, 1 connected, 2 connecting, 3 disconnecting — walked through explicitly.",
      code: `function App() {
  const states = [
    { value: 0, name: "disconnected", desc: "No active connection" },
    { value: 1, name: "connected", desc: "Ready to send queries" },
    { value: 2, name: "connecting", desc: "connect() was called, waiting on the server" },
    { value: 3, name: "disconnecting", desc: "A close() is in progress" },
  ];

  return (
    <div style={{ display: "grid", gap: 8 }}>
      {states.map(function (s) {
        return (
          <div key={s.value} style={{ padding: 10, background: "#f3f4f6", borderRadius: 6, borderLeft: "3px solid #16a34a" }}>
            <strong>mongoose.connection.readyState === {s.value}</strong> ({s.name})
            <div style={{ color: "#6b7280", fontSize: 13 }}>{s.desc}</div>
          </div>
        );
      })}
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "odm-vs-raw-documents",
      title: "The problem Mongoose solves: undisciplined document shapes",
      summary: "Plain MongoDB allows this; an ODM is what pushes an app back toward consistency.",
      code: `function App() {
  const rawMongoDbCollection = [
    { _id: 1, name: "Ada Lovelace", age: 28 },
    { _id: 2, name: "Grace Hopper", age: "thirty-four" }, // age is a string here!
    { _id: 3, naem: "Alan Turing", age: 41 }, // typo'd field name, MongoDB doesn't care
  ];

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6 }}>
        {JSON.stringify(rawMongoDbCollection, null, 2)}
      </pre>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        MongoDB itself accepts every one of these documents without complaint -- a typo'd field
        name and a string where a number was intended both slip right through. A Mongoose Schema
        (next topic) is what catches problems like this at save time, before they reach the database.
      </p>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
