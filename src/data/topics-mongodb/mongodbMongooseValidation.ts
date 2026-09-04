import type { Topic } from "../../types";

export const mongodbMongooseValidationTopic: Topic = {
  id: "mongodb-mongoose-validation",
  title: "Mongoose Validation",
  category: "Mongoose & Node Integration",
  shortExplanation: `Schema fields can carry **validation rules** — \`required\`, \`min\`/\`max\`, \`enum\`, or a custom \`validate\` function — that run automatically whenever a document is saved, rejecting bad data before it ever reaches the database.

- \`required: true\` — the field must be present
- \`min\`/\`max\` bound a \`Number\` field; \`enum\` restricts a field to a fixed list of allowed values
- A custom \`validate\` function returns \`true\`/\`false\` (or throws) for rules the built-ins can't express — a failure produces a \`ValidationError\` instead of a saved document`,
  longExplanation: `MongoDB itself, as covered at the very start of this subject, doesn't enforce any particular document shape — it will happily store a user with no name, an age of \`-5\`, or a status of \`"maybe"\`. Mongoose's **validation** is exactly the feature that puts those guardrails back, checked automatically at **save time**, before a document is written to the underlying collection.

**\`required: true\`** is the most common rule — it fails validation if the field is \`undefined\`, \`null\`, or (for a \`String\`) an empty string. Real Mongoose lets \`required\` even be a function, so a field can be conditionally required based on another field's value, but the boolean form covers the overwhelming majority of real schemas.

**\`min\` and \`max\`** bound a \`Number\` field's allowed range — \`{ age: { type: Number, min: 0, max: 120 } }\` rejects a negative age or an implausibly large one. (Mongoose also supports \`minlength\`/\`maxlength\` for \`String\` fields, bounding character count rather than numeric value — a detail worth knowing even though this topic focuses on the numeric \`min\`/\`max\` pair.)

**\`enum\`** restricts a field to one of a fixed list of allowed values — \`{ role: { type: String, enum: ["admin", "editor", "viewer"] } }\` rejects anything outside that list, which is exactly the kind of "this should really be one of a known set of options" constraint that's easy to forget without an explicit rule, and a very common source of silently-inconsistent data in schema-less collections.

**A custom \`validate\` function** handles anything the built-in rules can't express — it receives the field's proposed value and returns \`true\` (valid) or \`false\` (invalid), optionally paired with a custom error message. A classic real example: validating that an \`email\` field actually contains an \`@\` sign, or that a \`password\` field meets a minimum complexity rule that \`minlength\` alone can't capture.

**What happens on failure.** When \`Model.create()\` (or \`.save()\`) is called with data that fails one or more of these rules, Mongoose does **not** save the document — it rejects with a \`ValidationError\`, an object whose \`.errors\` property is keyed by field name, each holding a human-readable message describing exactly what went wrong on that field. This is a meaningfully better developer (and end-user-facing) experience than a raw MongoDB insert silently accepting bad data, or a generic database error with no indication of *which* field was the problem — real applications typically catch \`ValidationError\` specifically and map its per-field messages directly onto form error states in the UI.

**Validation runs on \`create()\`/\`save()\` by default, not on every update.** A genuinely common gotcha: \`Model.findByIdAndUpdate()\` (covered in the previous topic) does **not** run schema validators unless explicitly told to, via a \`{ runValidators: true }\` option — code that updates a document expecting invalid data to be caught automatically, without that option, can end up writing data that would have been rejected at creation time. This asymmetry between \`create()\`/\`save()\` and \`findByIdAndUpdate()\` trips up even fairly experienced Mongoose users, and is worth remembering as a deliberate, non-obvious default rather than a bug.

**This sandbox cannot import the real \`mongoose\` package.** The examples below implement a genuinely-working \`validateDoc(schemaDefinition, data)\` function that checks \`required\`, \`min\`/\`max\`, \`enum\`, and a custom \`validate\` function against real data, and a fake Model whose \`create()\` runs that validation before pushing a document into its in-memory array — rejecting with a real error object (shaped like Mongoose's per-field \`errors\`) exactly when real Mongoose would.`,
  examples: [
    {
      id: "required-field-validation",
      title: "required: true",
      summary: "A document missing a required field is rejected before it's ever saved.",
      code: `function validateDoc(definition, data) {
  const errors = {};
  for (const field in definition) {
    const rules = definition[field];
    const value = data[field];
    if (rules.required && (value === undefined || value === null || value === "")) {
      errors[field] = field + " is required.";
    }
  }
  return { valid: Object.keys(errors).length === 0, errors: errors };
}

function createModel(definition) {
  const docs = [];
  let nextId = 1;
  return {
    create: async function (data) {
      const result = validateDoc(definition, data);
      if (!result.valid) {
        const err = new Error("ValidationError");
        err.errors = result.errors;
        throw err;
      }
      const doc = { _id: nextId++, ...data };
      docs.push(doc);
      return doc;
    },
  };
}

const userSchema = { name: { required: true }, email: { required: true } };
const User = createModel(userSchema);

function App() {
  const [output, setOutput] = useState("");

  async function createValid() {
    try {
      const doc = await User.create({ name: "Ada Lovelace", email: "ada@example.com" });
      setOutput("Saved: " + JSON.stringify(doc));
    } catch (err) {
      setOutput("ValidationError: " + JSON.stringify(err.errors));
    }
  }

  async function createInvalid() {
    try {
      const doc = await User.create({ name: "Grace Hopper" }); // missing email
      setOutput("Saved: " + JSON.stringify(doc));
    } catch (err) {
      setOutput("ValidationError: " + JSON.stringify(err.errors));
    }
  }

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <button onClick={createValid}>Create with name + email (valid)</button>
        <button onClick={createInvalid}>Create with only name (missing email)</button>
      </div>
      <p>{output || "// output appears here"}</p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "min-max-enum-validation",
      title: "min / max and enum",
      summary: "A numeric range check and a fixed-list check, both genuinely enforced.",
      code: `function validateDoc(definition, data) {
  const errors = {};
  for (const field in definition) {
    const rules = definition[field];
    const value = data[field];
    if (rules.required && (value === undefined || value === null)) {
      errors[field] = field + " is required.";
      continue;
    }
    if (value === undefined) continue;
    if (typeof rules.min === "number" && value < rules.min) {
      errors[field] = field + " (" + value + ") is below the minimum of " + rules.min + ".";
    }
    if (typeof rules.max === "number" && value > rules.max) {
      errors[field] = field + " (" + value + ") is above the maximum of " + rules.max + ".";
    }
    if (rules.enum && rules.enum.indexOf(value) === -1) {
      errors[field] = value + " is not a valid " + field + " (allowed: " + rules.enum.join(", ") + ").";
    }
  }
  return { valid: Object.keys(errors).length === 0, errors: errors };
}

function createModel(definition) {
  const docs = [];
  let nextId = 1;
  return {
    create: async function (data) {
      const result = validateDoc(definition, data);
      if (!result.valid) {
        const err = new Error("ValidationError");
        err.errors = result.errors;
        throw err;
      }
      const doc = { _id: nextId++, ...data };
      docs.push(doc);
      return doc;
    },
  };
}

const userSchema = {
  age: { min: 0, max: 120 },
  role: { enum: ["admin", "editor", "viewer"] },
};
const User = createModel(userSchema);

function App() {
  const [output, setOutput] = useState("");

  async function tryCreate(data) {
    try {
      const doc = await User.create(data);
      setOutput("Saved: " + JSON.stringify(doc));
    } catch (err) {
      setOutput("ValidationError: " + JSON.stringify(err.errors));
    }
  }

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <button onClick={function () { tryCreate({ age: 28, role: "admin" }); }}>Valid: age 28, role admin</button>
        <button onClick={function () { tryCreate({ age: 200, role: "admin" }); }}>Invalid: age 200 (over max)</button>
        <button onClick={function () { tryCreate({ age: 28, role: "superuser" }); }}>Invalid: role "superuser" (not in enum)</button>
      </div>
      <p>{output || "// output appears here"}</p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "custom-validate-function",
      title: "A custom validate function",
      summary: "Rules the built-ins can't express -- here, requiring an @ sign in an email field.",
      code: `function validateDoc(definition, data) {
  const errors = {};
  for (const field in definition) {
    const rules = definition[field];
    const value = data[field];
    if (rules.required && !value) {
      errors[field] = field + " is required.";
      continue;
    }
    if (value !== undefined && typeof rules.validate === "function") {
      const isValid = rules.validate(value);
      if (!isValid) {
        errors[field] = rules.message || (field + " failed custom validation.");
      }
    }
  }
  return { valid: Object.keys(errors).length === 0, errors: errors };
}

function createModel(definition) {
  const docs = [];
  let nextId = 1;
  return {
    create: async function (data) {
      const result = validateDoc(definition, data);
      if (!result.valid) {
        const err = new Error("ValidationError");
        err.errors = result.errors;
        throw err;
      }
      const doc = { _id: nextId++, ...data };
      docs.push(doc);
      return doc;
    },
  };
}

const userSchema = {
  email: {
    required: true,
    validate: function (value) { return value.indexOf("@") !== -1; },
    message: "email must contain an @ sign.",
  },
};
const User = createModel(userSchema);

function App() {
  const [output, setOutput] = useState("");

  async function tryCreate(email) {
    try {
      const doc = await User.create({ email: email });
      setOutput("Saved: " + JSON.stringify(doc));
    } catch (err) {
      setOutput("ValidationError: " + JSON.stringify(err.errors));
    }
  }

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <button onClick={function () { tryCreate("ada@example.com"); }}>Create with "ada@example.com"</button>
        <button onClick={function () { tryCreate("not-an-email"); }}>Create with "not-an-email"</button>
      </div>
      <p>{output || "// output appears here"}</p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "validation-error-shape",
      title: "The shape of a ValidationError with multiple failed fields",
      summary: "Every failing field is reported at once, keyed by field name -- not just the first problem found.",
      code: `function validateDoc(definition, data) {
  const errors = {};
  for (const field in definition) {
    const rules = definition[field];
    const value = data[field];
    if (rules.required && (value === undefined || value === null || value === "")) {
      errors[field] = field + " is required.";
      continue;
    }
    if (value === undefined) continue;
    if (typeof rules.min === "number" && value < rules.min) {
      errors[field] = field + " must be at least " + rules.min + ".";
    }
  }
  return { valid: Object.keys(errors).length === 0, errors: errors };
}

const productSchema = {
  name: { required: true },
  price: { required: true, min: 0 },
};

function App() {
  const badData = { price: -10 }; // missing name AND a negative price
  const result = validateDoc(productSchema, badData);

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6 }}>
        {"Input: " + JSON.stringify(badData) + "\\n\\n" +
          "valid: " + result.valid + "\\n" +
          "errors: " + JSON.stringify(result.errors, null, 2)}
      </pre>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        Both problems are reported together, one entry per field -- exactly like real Mongoose's
        ValidationError.errors object, so a UI can highlight every invalid field at once.
      </p>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
