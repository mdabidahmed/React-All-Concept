import type { Topic } from "../../types";

export const mongodbMongooseSchemasModelsTopic: Topic = {
  id: "mongodb-mongoose-schemas-models",
  title: "Mongoose Schemas and Models",
  category: "Mongoose & Node Integration",
  shortExplanation: `A \`Schema\` describes the **shape** a document should have; \`mongoose.model(name, schema)\` compiles that shape into a **Model** — a reusable object your code actually calls methods on.

- \`new Schema({ name: String, age: Number })\` — each field maps to a **type**, not a value
- \`mongoose.model("User", userSchema)\` returns a Model class; every document created through it is checked against \`userSchema\`
- By convention, a Model named \`"User"\` maps to a MongoDB collection named \`users\` — Mongoose automatically lowercases and pluralizes the model name`,
  longExplanation: `Schemas and Models are the two building blocks everything else in Mongoose is built from — a schema describes *what a document should look like*, and a model is *the object your application code actually talks to* in order to create, read, update, and delete documents that match it.

**Defining a Schema.** \`new Schema({ ... })\` takes a plain object where each key is a field name and each value describes that field's expected **type** — \`{ name: String, age: Number, isActive: Boolean, tags: [String] }\`. This looks similar to a real document, but it isn't one: the values here are *type declarations* (the built-in constructors \`String\`, \`Number\`, \`Boolean\`, \`Date\`, \`Array\`— plus Mongoose's own \`Schema.Types.ObjectId\` for references), not actual data. A field can also be written as a fuller descriptor object instead of a bare type — \`{ age: { type: Number, required: true, default: 0 } }\` — which is how validation rules, defaults, and other per-field options get attached (covered in the next topic on validation).

**Compiling a Model.** A schema by itself doesn't do anything — it's an inert description. \`mongoose.model("User", userSchema)\` is the call that turns it into something usable: a **Model**, which is the object every CRUD topic from here on actually calls methods on (\`User.create(...)\`, \`User.find(...)\`, and so on). A Model is often described as "a compiled version of the schema" — it carries the schema's rules internally, and enforces them every time a document is created or saved through it.

**Naming and collections.** Mongoose applies a specific, worth-memorizing convention: the string passed as the *first* argument to \`model()\` is treated as the **singular** name of the thing being modeled, and Mongoose automatically lowercases it and appends an \`"s"\` (pluralizing, with some smarter handling for irregular endings) to decide the underlying MongoDB collection name. \`mongoose.model("User", schema)\` stores documents in a collection literally named \`users\`; \`mongoose.model("Category", schema)\` maps to \`categories\`. This can be overridden with an explicit third argument to \`model()\` if the automatic pluralization ever produces the wrong name, but the default convention is what real Mongoose codebases rely on nearly all the time.

**What a Model actually is.** Conceptually, a Model is a constructor: \`new User({ name: "Ada" })\` creates a single in-memory **document instance** — an object with the fields from the schema, plus Mongoose-added behavior like a \`.save()\` method that persists it. Most day-to-day code doesn't call \`new Model()\` directly, though — the far more common pattern is the static shortcut \`Model.create(data)\`, covered in the next topic, which constructs *and* saves a document in one call.

**A common early mistake** is calling \`mongoose.model()\` more than once for the same name in the same process — Mongoose throws an \`OverwriteModelError\` if it detects a second, conflicting registration, which is a real error beginners hit when a model file accidentally gets re-imported (or re-executed, e.g. by a dev-server hot-reload) more than once. The fix is almost always to define each model exactly once, typically in its own module, and import that single instance everywhere it's needed.

**This sandbox cannot import the real \`mongoose\` package.** Every example below is a hand-built simulation: a small \`Schema\` class that just stores the field definitions it's given, and a \`model()\` function that returns a plain JavaScript object playing the role of a Model — backed by a real in-memory array, with method names matching real Mongoose exactly. The schema/model *relationship* — schema describes shape, \`model()\` compiles it into something callable — is genuine and transfers directly to real Mongoose code; only the underlying storage is faked.`,
  examples: [
    {
      id: "define-schema-and-model",
      title: "new Schema({...}) and mongoose.model(name, schema)",
      summary: "A minimal, genuinely-working Schema class and model() function.",
      code: `class Schema {
  constructor(definition) {
    this.definition = definition;
  }
}

function model(name, schema) {
  const docs = [];
  let nextId = 1;

  return {
    modelName: name,
    collectionName: name.toLowerCase() + "s",
    schema: schema,
    create: function (data) {
      const doc = { _id: nextId++, ...data };
      docs.push(doc);
      return doc;
    },
    find: function () {
      return docs.slice();
    },
  };
}

function App() {
  const userSchema = new Schema({ name: String, age: Number, isActive: Boolean });
  const User = model("User", userSchema);

  return (
    <div style={{ display: "grid", gap: 8 }}>
      <p>Model name: {User.modelName}</p>
      <p>Underlying collection: {User.collectionName}</p>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6 }}>
        {"Schema fields: " + JSON.stringify(Object.keys(userSchema.definition))}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "model-naming-pluralization",
      title: "Model name -> collection name convention",
      summary: "\"User\" becomes users, \"Category\" becomes categorys (a simplified pluralization rule) -- Mongoose auto-derives the collection name.",
      code: `function deriveCollectionName(modelName) {
  return modelName.toLowerCase() + "s";
}

function App() {
  const modelNames = ["User", "Product", "Category", "Order"];

  return (
    <div style={{ display: "grid", gap: 8 }}>
      {modelNames.map(function (name) {
        return (
          <div key={name} style={{ padding: 10, background: "#f3f4f6", borderRadius: 6 }}>
            mongoose.model(<strong>"{name}"</strong>, schema) {"->"} collection <strong>"{deriveCollectionName(name)}"</strong>
          </div>
        );
      })}
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        Real Mongoose's pluralization is smarter about irregular endings than this simplified
        rule, but the core convention -- lowercase and pluralize the model name -- is exact.
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "creating-a-document-instance",
      title: "new Model(data): a document instance vs. a plain object",
      summary: "A Model acts as a constructor -- new User({...}) produces a document shaped by the schema.",
      code: `class Schema {
  constructor(definition) {
    this.definition = definition;
  }
}

function model(name, schema) {
  function Model(data) {
    for (const field in schema.definition) {
      this[field] = data[field];
    }
    this.saved = false;
  }
  Model.prototype.save = function () {
    this.saved = true;
    return this;
  };
  Model.modelName = name;
  return Model;
}

function App() {
  const userSchema = new Schema({ name: String, age: Number });
  const User = model("User", userSchema);

  const ada = new User({ name: "Ada Lovelace", age: 28, extraField: "ignored" });

  return (
    <div style={{ display: "grid", gap: 8 }}>
      <p>new User(...) before .save():</p>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6 }}>
        {JSON.stringify({ name: ada.name, age: ada.age, saved: ada.saved, extraField: ada.extraField }, null, 2)}
      </pre>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        Only fields declared in the schema (name, age) were copied onto the document --
        extraField was silently dropped, because it isn't part of the shape the schema describes.
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "overwrite-model-error-gotcha",
      title: "Gotcha: registering the same model name twice",
      summary: "Real Mongoose throws OverwriteModelError -- simulated here with a registry check.",
      code: `class Schema {
  constructor(definition) {
    this.definition = definition;
  }
}

const registeredModels = {};

function model(name, schema) {
  if (registeredModels[name]) {
    throw new Error(
      "OverwriteModelError: Cannot overwrite \\"" + name + "\\" model once compiled."
    );
  }
  const compiled = { modelName: name, schema: schema, docs: [] };
  registeredModels[name] = compiled;
  return compiled;
}

function App() {
  const [output, setOutput] = useState("");

  function registerOnce() {
    try {
      const schema = new Schema({ name: String });
      model("User", schema);
      setOutput("mongoose.model(\\"User\\", schema) succeeded.");
    } catch (err) {
      setOutput("Error: " + err.message);
    }
  }

  function registerAgain() {
    try {
      const schema = new Schema({ name: String, age: Number });
      model("User", schema);
      setOutput("mongoose.model(\\"User\\", schema) succeeded.");
    } catch (err) {
      setOutput("Error: " + err.message);
    }
  }

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <button onClick={registerOnce}>Register "User" model (first time)</button>
        <button onClick={registerAgain}>Register "User" model again</button>
      </div>
      <p>{output || "// output appears here"}</p>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
