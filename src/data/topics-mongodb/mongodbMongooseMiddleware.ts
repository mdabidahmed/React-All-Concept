import type { Topic } from "../../types";

export const mongodbMongooseMiddlewareTopic: Topic = {
  id: "mongodb-mongoose-middleware",
  title: "Mongoose Middleware (Hooks)",
  category: "Mongoose & Node Integration",
  shortExplanation: `Middleware (also called **hooks**) are functions a schema runs automatically **before** or **after** an operation like saving — \`schema.pre("save", fn)\` and \`schema.post("save", fn)\`.

- \`pre("save", fn)\` runs *before* a document is written — the classic use case is hashing a plaintext password so the raw value never reaches the database
- \`post("save", fn)\` runs *after* a document is written — useful for logging, sending a welcome email, or other side effects that should only happen once a save genuinely succeeded
- Inside a \`pre\` hook, \`this\` refers to the document about to be saved — mutating it there changes what actually gets persisted`,
  longExplanation: `Validation (the previous topic) answers "is this data acceptable?" — middleware answers a different question: "what should happen automatically, every time, right before or right after this operation runs?" Mongoose calls these hooks **middleware**, the same term Express uses for its request pipeline (covered in the Node.js subject) — both describe a function given a chance to run, and a chance to affect what happens next, around some central operation.

**\`schema.pre("save", function(next) { ... })\`** registers a function that runs immediately before a document is saved — after validation has already passed, but before the write actually happens. Inside a \`pre\` hook, \`this\` is bound to the document instance about to be saved, so the hook can read *and mutate* its fields — whatever the hook changes on \`this\` is what actually gets persisted. This is exactly how the single most common real-world use case works: **hashing a password before it's saved**. An application never wants to store a user's plaintext password — a \`pre("save", ...)\` hook intercepts the document right before it's written, replaces \`this.password\` with a hashed version (using a library like \`bcrypt\` in real code), and only *then* lets the save proceed. The application code that calls \`User.create({ password: "plaintext" })\` never has to remember to hash anything itself — the schema guarantees it happens, every time, for every document, which is a meaningfully more reliable place to enforce that rule than scattering the hashing call across every place a user might be created.

**\`schema.post("save", function(doc) { ... })\`** runs *after* a document has been successfully saved, receiving the saved document itself. Because it only fires on success, it's the right place for side effects that genuinely should only happen once data is safely persisted — logging that a new record was created, queuing a welcome email, incrementing an in-memory counter for a dashboard. A \`post\` hook that throws does not undo the save that already happened — it already succeeded — so \`post\` hooks are for reacting to a save, not for gatekeeping it (that's what \`pre\` and validation are for).

**The \`next\` callback (or returning a Promise).** Older Mongoose code writes \`pre\` hooks that accept a \`next\` callback and call \`next()\` explicitly when the hook is done — necessary because a hook doing asynchronous work (like an \`await\`ed hashing call) needs some way to signal "I'm finished, proceed with the save" rather than the save happening before the hook's async work completes. Modern Mongoose (5+) also accepts an \`async\` function directly as the hook, letting it simply \`await\` its work and return normally instead of calling \`next()\` — both styles exist in real codebases, so it's worth recognizing both. Calling \`next(someError)\` (or throwing/rejecting inside an async hook) aborts the save entirely, exactly like a failed validation would.

**Hooks aren't limited to \`save\`.** Real Mongoose supports \`pre\`/\`post\` around many other operations — \`validate\`, \`remove\`, \`updateOne\`, and more — each firing around its own specific operation. This topic focuses on \`save\`, by far the most common one, since it's where the password-hashing pattern and most other real-world middleware usage lives.

**This sandbox cannot import the real \`mongoose\` package.** The examples below implement a genuinely-working hook system: a fake \`Schema\` with real \`pre\`/\`post\` registries, and a fake Model whose \`create()\` actually runs every registered \`pre("save", ...)\` hook (with \`this\` bound to the document, letting a hook mutate it) before persisting, then runs every \`post("save", ...)\` hook afterward — the hashing transformation shown really does run and really does change what ends up stored, not just described in prose.`,
  examples: [
    {
      id: "pre-save-password-hashing",
      title: "pre(\"save\", ...) hashing a password before it's stored",
      summary: "The classic real-world hook: the plaintext password never actually reaches the saved document.",
      code: `// A stand-in for a real hashing function like bcrypt.hash() -- not real
// cryptography, just enough to demonstrate the hook transforming the value.
function fakeHash(plaintext) {
  return "hashed:" + plaintext.split("").reverse().join("") + ":" + plaintext.length;
}

function createSchema() {
  const preSaveHooks = [];
  return {
    pre: function (event, fn) {
      if (event === "save") preSaveHooks.push(fn);
    },
    runPreSave: function (doc) {
      preSaveHooks.forEach(function (hook) {
        hook.call(doc);
      });
    },
  };
}

function createModel(schema) {
  const docs = [];
  let nextId = 1;
  return {
    create: async function (data) {
      const doc = { _id: nextId++, ...data };
      schema.runPreSave(doc); // "this" inside each hook is bound to doc
      docs.push(doc);
      return doc;
    },
  };
}

const userSchema = createSchema();
userSchema.pre("save", function () {
  this.password = fakeHash(this.password);
});
const User = createModel(userSchema);

function App() {
  const [output, setOutput] = useState("");

  async function createUser() {
    const doc = await User.create({ name: "Ada Lovelace", password: "hunter2" });
    setOutput(
      "Input password: \\"hunter2\\"\\n\\n" +
      "Saved document: " + JSON.stringify(doc) + "\\n\\n" +
      "The plaintext password was never persisted -- the pre(\\"save\\") hook replaced it first."
    );
  }

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <button onClick={createUser}>User.create({"{ name, password: \\"hunter2\\" }"})</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 90, width: "100%" }}>
        {output || "// output appears here"}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "post-save-logging",
      title: "post(\"save\", ...) reacting after a successful save",
      summary: "A post hook fires only once the document is genuinely saved -- here, appending to an activity log.",
      code: `function createSchema() {
  const postSaveHooks = [];
  return {
    post: function (event, fn) {
      if (event === "save") postSaveHooks.push(fn);
    },
    runPostSave: function (doc) {
      postSaveHooks.forEach(function (hook) {
        hook(doc);
      });
    },
  };
}

function createModel(schema) {
  const docs = [];
  let nextId = 1;
  return {
    create: async function (data) {
      const doc = { _id: nextId++, ...data };
      docs.push(doc);
      schema.runPostSave(doc);
      return doc;
    },
  };
}

function App() {
  const [activityLog, setActivityLog] = useState([]);

  const [User] = useState(function () {
    const schema = createSchema();
    schema.post("save", function (doc) {
      setActivityLog(function (prev) {
        return [...prev, "New user saved: " + doc.name + " (_id: " + doc._id + ")"];
      });
    });
    return createModel(schema);
  });

  async function createUser(name) {
    await User.create({ name: name });
  }

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <button onClick={function () { createUser("Ada Lovelace"); }}>Create "Ada Lovelace"</button>
        <button onClick={function () { createUser("Grace Hopper"); }}>Create "Grace Hopper"</button>
      </div>
      <div style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 90, fontFamily: "monospace", fontSize: 13, display: "grid", gap: 4 }}>
        {activityLog.length === 0
          ? "// the post(\\"save\\") hook's log appears here"
          : activityLog.map(function (line, i) {
              return <div key={i}>{line}</div>;
            })}
      </div>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "pre-save-abort-with-error",
      title: "A pre(\"save\") hook can abort the save entirely",
      summary: "Calling next() with an error (or throwing) stops the document from being persisted at all.",
      code: `function createSchema() {
  const preSaveHooks = [];
  return {
    pre: function (event, fn) {
      if (event === "save") preSaveHooks.push(fn);
    },
    runPreSave: async function (doc) {
      for (const hook of preSaveHooks) {
        await new Promise(function (resolve, reject) {
          hook.call(doc, function (err) {
            if (err) reject(err);
            else resolve();
          });
        });
      }
    },
  };
}

function createModel(schema) {
  const docs = [];
  let nextId = 1;
  return {
    create: async function (data) {
      const doc = { _id: nextId++, ...data };
      await schema.runPreSave(doc); // throws if a hook calls next(err)
      docs.push(doc);
      return doc;
    },
  };
}

const userSchema = createSchema();
userSchema.pre("save", function (next) {
  if (this.name === "Banned Name") {
    next(new Error("This name is not allowed."));
    return;
  }
  next();
});
const User = createModel(userSchema);

function App() {
  const [output, setOutput] = useState("");

  async function tryCreate(name) {
    try {
      const doc = await User.create({ name: name });
      setOutput("Saved: " + JSON.stringify(doc));
    } catch (err) {
      setOutput("Save aborted by pre(\\"save\\") hook: " + err.message);
    }
  }

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <button onClick={function () { tryCreate("Ada Lovelace"); }}>Create "Ada Lovelace"</button>
        <button onClick={function () { tryCreate("Banned Name"); }}>Create "Banned Name"</button>
      </div>
      <p>{output || "// output appears here"}</p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "multiple-pre-hooks-run-in-order",
      title: "Multiple pre(\"save\") hooks run in registration order",
      summary: "Two independent hooks both touch the same document, each seeing the previous hook's changes.",
      code: `function createSchema() {
  const preSaveHooks = [];
  return {
    pre: function (event, fn) {
      if (event === "save") preSaveHooks.push(fn);
    },
    runPreSave: function (doc) {
      preSaveHooks.forEach(function (hook) {
        hook.call(doc);
      });
    },
  };
}

function createModel(schema) {
  const docs = [];
  let nextId = 1;
  return {
    create: async function (data) {
      const doc = { _id: nextId++, ...data };
      schema.runPreSave(doc);
      docs.push(doc);
      return doc;
    },
  };
}

const postSchema = createSchema();
postSchema.pre("save", function () {
  this.slug = this.title.toLowerCase().split(" ").join("-");
});
postSchema.pre("save", function () {
  this.excerpt = this.body.slice(0, 20) + "...";
});
const Post = createModel(postSchema);

function App() {
  const [output, setOutput] = useState("");

  async function createPost() {
    const doc = await Post.create({
      title: "Hello Mongoose World",
      body: "This is the full body of a brand new blog post about hooks.",
    });
    setOutput(JSON.stringify(doc, null, 2));
  }

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <button onClick={createPost}>Post.create({"{ title, body }"})</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 100, width: "100%" }}>
        {output || "// output appears here -- slug and excerpt are added by two separate hooks"}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
