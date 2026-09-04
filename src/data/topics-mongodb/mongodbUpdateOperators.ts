import type { Topic } from "../../types";

export const mongodbUpdateOperatorsTopic: Topic = {
  id: "mongodb-update-operators",
  title: "MongoDB Update Operators",
  category: "Update & Delete",
  shortExplanation: `Update operators are the \`$\`-prefixed keys that describe *how* to change a document — you saw \`$set\` already; here are its most common siblings.

- \`$set\` — set (or overwrite) a field's value
- \`$unset\` — remove a field from the document entirely
- \`$inc\` — increment (or decrement, with a negative number) a numeric field in place
- \`$push\` — append a value onto the end of an array field`,
  longExplanation: `Every MongoDB update document is built out of **update operators** — \`$\`-prefixed keys, each paired with a small object mapping field names to what should happen to them. You've already met \`$set\`; this topic rounds out the operators you'll reach for constantly, and shows that a single update call can combine several of them at once.

- \`$set: { field: value }\` sets \`field\` to \`value\`, creating the field if it doesn't already exist, or overwriting it if it does. It never touches any field it doesn't name — this is the operator's whole point, and what distinguishes an update from a replace
- \`$unset: { field: "" }\` removes \`field\` from the document entirely — not just to \`null\` or \`undefined\`, but actually gone, so the key won't appear at all if you inspect the document afterward. The value paired with the field name in \`$unset\` is conventionally an empty string (\`""\`) or \`1\` — MongoDB ignores it, since the *presence* of the field name is the only thing that matters, not its value
- \`$inc: { field: amount }\` adds \`amount\` to a numeric field, atomically, on the server — and it works for decrementing too, by passing a negative number: \`$inc: { stock: -1 }\` reduces \`stock\` by one. This is meaningfully different from reading a field's current value in your application, adding one, and writing it back with \`$set\` — if two requests do that "read, add, write" dance concurrently, one of their increments can be silently lost. \`$inc\` tells the database to do the arithmetic itself, so concurrent increments are never lost, no matter how many requests race to increment the same counter at once
- \`$push: { field: value }\` appends \`value\` onto the end of an array field. If the field doesn't exist yet, MongoDB creates it as a new array containing just that one value. If the field exists but *isn't* an array, the operation fails — \`$push\` is specifically for growing array fields, not for silently converting a scalar field into one
- A single update document can combine multiple operators in one call: \`{ $set: { status: "shipped" }, $inc: { version: 1 }, $push: { history: "shipped" } }\` sets a field, bumps a counter, and appends a log entry, all atomically, in one round trip to the server. This composability is one of the biggest practical reasons to prefer the operator-based update language over "fetch the document, mutate it in your app, write the whole thing back" — one focused request instead of a read, an edit, and a write
- There are more operators than these four in real MongoDB — \`$rename\`, \`$mul\`, \`$min\`/\`$max\`, array-specific ones like \`$pull\` and \`$addToSet\` — but \`$set\`, \`$unset\`, \`$inc\`, and \`$push\` cover the overwhelming majority of real-world update logic, which is why they're the ones worth learning first and cold

A useful mental model: think of each operator as a small, named *verb* applied to specific fields, rather than thinking of the update document as "the new shape of the record." \`$set\` says "make this field equal to this," \`$unset\` says "this field shouldn't exist," \`$inc\` says "adjust this number by this much," and \`$push\` says "grow this array by one." Once that clicks, reading (and writing) a MongoDB update document becomes closer to reading a short list of instructions than parsing a data structure.`,
  examples: [
    {
      id: "operator-set",
      title: "$set — overwrite or create a field",
      summary: "$set changes just the field it names, leaving everything else alone.",
      code: `function applyUpdate(doc, update) {
  let result = { ...doc };
  if (update.$set) {
    for (const key in update.$set) {
      result[key] = update.$set[key];
    }
  }
  return result;
}

function App() {
  const before = { name: "Ada Lovelace", age: 28, city: "London" };
  const after = applyUpdate(before, { $set: { age: 29, country: "England" } });

  return (
    <div style={{ display: "grid", gap: 8 }}>
      <p>Before:</p>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6 }}>
        {JSON.stringify(before, null, 2)}
      </pre>
      <p>After $set: {"{"} age: 29, country: "England" {"}"}:</p>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6 }}>
        {JSON.stringify(after, null, 2)}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "operator-unset",
      title: "$unset — remove a field entirely",
      summary: "The field disappears from the document, not just becomes null.",
      code: `function applyUpdate(doc, update) {
  let result = { ...doc };
  if (update.$unset) {
    for (const key in update.$unset) {
      delete result[key];
    }
  }
  return result;
}

function App() {
  const before = { name: "Ada Lovelace", age: 28, temporaryFlag: true };
  const after = applyUpdate(before, { $unset: { temporaryFlag: "" } });

  return (
    <div style={{ display: "grid", gap: 8 }}>
      <p>Before ("temporaryFlag" present):</p>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6 }}>
        {JSON.stringify(before, null, 2)}
      </pre>
      <p>After $unset: {"{"} temporaryFlag: "" {"}"} — the key is gone, not null:</p>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6 }}>
        {JSON.stringify(after, null, 2)}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "operator-inc",
      title: "$inc — increment (or decrement) a number in place",
      summary: "Positive amounts increase a field, negative amounts decrease it.",
      code: `function applyUpdate(doc, update) {
  let result = { ...doc };
  if (update.$inc) {
    for (const key in update.$inc) {
      result[key] = (result[key] || 0) + update.$inc[key];
    }
  }
  return result;
}

function App() {
  const start = { product: "Notebook", stock: 10, views: 0 };
  const afterSale = applyUpdate(start, { $inc: { stock: -1, views: 1 } });
  const afterRestock = applyUpdate(afterSale, { $inc: { stock: 25 } });

  return (
    <div style={{ display: "grid", gap: 8 }}>
      <p>Start: {JSON.stringify(start)}</p>
      <p>After a sale ($inc stock: -1, views: 1): {JSON.stringify(afterSale)}</p>
      <p>After a restock ($inc stock: 25): {JSON.stringify(afterRestock)}</p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "operator-push",
      title: "$push — append to an array field",
      summary: "Grows an existing array, or creates a new one if the field doesn't exist yet.",
      code: `function applyUpdate(doc, update) {
  let result = { ...doc };
  if (update.$push) {
    for (const key in update.$push) {
      const existingArray = Array.isArray(result[key]) ? result[key] : [];
      result[key] = [...existingArray, update.$push[key]];
    }
  }
  return result;
}

function App() {
  const before = { title: "Intro to MongoDB", tags: ["database"] };
  const afterFirstPush = applyUpdate(before, { $push: { tags: "nosql" } });
  const afterSecondPush = applyUpdate(afterFirstPush, { $push: { comments: "First comment!" } });

  return (
    <div style={{ display: "grid", gap: 8 }}>
      <p>Before: {JSON.stringify(before)}</p>
      <p>After $push tags: "nosql": {JSON.stringify(afterFirstPush)}</p>
      <p>After $push comments (field didn't exist yet): {JSON.stringify(afterSecondPush)}</p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "operators-combined",
      title: "Combining several operators in one update",
      summary: "$set, $inc, and $push applied together, in a single atomic-feeling call.",
      code: `function applyUpdate(doc, update) {
  let result = { ...doc };
  if (update.$set) {
    for (const key in update.$set) {
      result[key] = update.$set[key];
    }
  }
  if (update.$unset) {
    for (const key in update.$unset) {
      delete result[key];
    }
  }
  if (update.$inc) {
    for (const key in update.$inc) {
      result[key] = (result[key] || 0) + update.$inc[key];
    }
  }
  if (update.$push) {
    for (const key in update.$push) {
      const existingArray = Array.isArray(result[key]) ? result[key] : [];
      result[key] = [...existingArray, update.$push[key]];
    }
  }
  return result;
}

function App() {
  const before = { orderId: "ORD-1", status: "pending", version: 1, history: ["created"] };

  const after = applyUpdate(before, {
    $set: { status: "shipped" },
    $inc: { version: 1 },
    $push: { history: "shipped" },
  });

  return (
    <div style={{ display: "grid", gap: 8 }}>
      <p>Before:</p>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6 }}>
        {JSON.stringify(before, null, 2)}
      </pre>
      <p>After one update with $set + $inc + $push together:</p>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6 }}>
        {JSON.stringify(after, null, 2)}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
