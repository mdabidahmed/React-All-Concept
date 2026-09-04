import type { Topic } from "../../types";

export const mongodbGroupStageTopic: Topic = {
  id: "mongodb-group-stage",
  title: "MongoDB $group Stage",
  category: "Aggregation Framework",
  shortExplanation: `\`$group\` collapses many documents into one summary document **per distinct value** of a chosen key — the aggregation-pipeline equivalent of SQL's \`GROUP BY\`.

- \`_id\` in a \`$group\` stage is the field you're grouping **by**, not a document's normal \`_id\`
- Every other field in the stage is an **accumulator** — \`$sum\`, \`$avg\`, \`$min\`, \`$max\`, \`$push\` — computed across each group
- \`$sum: 1\` is the classic "count how many documents are in this group" idiom`,
  longExplanation: `\`$group\` is where the aggregation pipeline stops looking like a fancier \`find()\` and starts doing real reporting-style work — turning a pile of individual documents into per-category summaries, totals, and averages, entirely on the database side.

- The \`_id\` field inside a \`$group\` stage has a special, overloaded meaning: it's **not** a document's normal \`_id\` field — it's the expression MongoDB groups documents *by*. \`{ $group: { _id: "$city" } }\` produces one output document per distinct \`city\` value found across the input documents. \`{ $group: { _id: null } }\` groups **everything** into a single group — useful for a grand total across the whole collection
- Every other field defined alongside \`_id\` is an **accumulator expression**, computed once per group from all the documents that fell into it:
  - \`$sum\` adds up a numeric field across the group — \`{ total: { $sum: "$price" } }\`. The special case \`{ $sum: 1 }\` adds \`1\` for every document instead of summing a field, which is the standard way to **count** how many documents landed in each group
  - \`$avg\` computes the mean of a numeric field across the group
  - \`$min\`/\`$max\` find the smallest/largest value of a field in the group
  - \`$push\` collects a value from every document in the group into an array on the output document — useful for "list the names of everyone in this group" style results
- \`$group\` is almost always preceded by a \`$match\` stage in a real pipeline — filter down to the relevant documents *first*, then group and summarize just that subset, since filtering after grouping is either impossible or much more awkward
- A single pipeline can chain a \`$group\` with \`$sort\` afterward (documents produced by \`$group\` can themselves be sorted, e.g. by total descending) — this "filter → group → sort" shape is one of the most common aggregation pipelines written in real MongoDB applications, covered as a complete worked example in a later topic

Since this sandbox has no real MongoDB server, this subject's aggregation topics run a small, genuinely-working pipeline function implementing \`$match\` and \`$group\` (with the \`$sum\`/\`$avg\`/\`$push\` accumulators) as real JavaScript logic over a plain array of documents — the pipeline *shape* and *stage syntax* are identical to what a real \`collection.aggregate([...])\` call expects.`,
  examples: [
    {
      id: "group-count-by-city",
      title: "Counting documents per group with $sum: 1",
      summary: "A genuine, working $group stage grouping users by city and counting each group.",
      code: `function runGroup(docs, groupStage) {
  const groups = new Map();
  for (const doc of docs) {
    const keyField = groupStage._id.slice(1); // strip leading "$"
    const key = doc[keyField];
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(doc);
  }
  return Array.from(groups.entries()).map(([key, groupDocs]) => {
    const out = { _id: key };
    for (const field in groupStage) {
      if (field === "_id") continue;
      const acc = groupStage[field];
      if (acc.$sum === 1) out[field] = groupDocs.length;
      else if (typeof acc.$sum === "string") {
        out[field] = groupDocs.reduce((sum, d) => sum + (d[acc.$sum.slice(1)] || 0), 0);
      }
    }
    return out;
  });
}

function App() {
  const users = [
    { name: "Ada", city: "London" },
    { name: "Alan", city: "London" },
    { name: "Grace", city: "New York" },
  ];

  const result = runGroup(users, { _id: "$city", count: { $sum: 1 } });

  return (
    <div style={{ display: "grid", gap: 8 }}>
      <p>{"{"} $group: {"{"} _id: "$city", count: {"{"} $sum: 1 {"}"} {"}"} {"}"}</p>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6 }}>
        {JSON.stringify(result, null, 2)}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "group-sum-field",
      title: "Summing a field per group",
      summary: "Total order value per customer, computed with $sum on a real field.",
      code: `function runGroup(docs, groupStage) {
  const groups = new Map();
  for (const doc of docs) {
    const keyField = groupStage._id.slice(1);
    const key = doc[keyField];
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(doc);
  }
  return Array.from(groups.entries()).map(([key, groupDocs]) => {
    const out = { _id: key };
    for (const field in groupStage) {
      if (field === "_id") continue;
      const acc = groupStage[field];
      if (acc.$sum === 1) out[field] = groupDocs.length;
      else if (typeof acc.$sum === "string") {
        out[field] = groupDocs.reduce((sum, d) => sum + (d[acc.$sum.slice(1)] || 0), 0);
      }
    }
    return out;
  });
}

function App() {
  const orders = [
    { customer: "Ada", total: 50 },
    { customer: "Ada", total: 30 },
    { customer: "Grace", total: 100 },
  ];

  const result = runGroup(orders, { _id: "$customer", totalSpent: { $sum: "$total" } });

  return (
    <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6 }}>
      {JSON.stringify(result, null, 2)}
    </pre>
  );
}

render(<App />);`,
    },
    {
      id: "group-null-grand-total",
      title: "_id: null for a single grand-total group",
      summary: "Grouping everything into one bucket collapses the whole collection into a single summary document.",
      code: `function runGroup(docs, groupStage) {
  const groups = new Map();
  for (const doc of docs) {
    const key = groupStage._id === null ? "ALL" : doc[groupStage._id.slice(1)];
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(doc);
  }
  return Array.from(groups.values()).map((groupDocs) => {
    const out = { _id: null };
    for (const field in groupStage) {
      if (field === "_id") continue;
      const acc = groupStage[field];
      if (acc.$sum === 1) out[field] = groupDocs.length;
      else if (typeof acc.$sum === "string") {
        out[field] = groupDocs.reduce((sum, d) => sum + (d[acc.$sum.slice(1)] || 0), 0);
      }
    }
    return out;
  });
}

function App() {
  const orders = [{ total: 50 }, { total: 30 }, { total: 100 }];

  const result = runGroup(orders, { _id: null, grandTotal: { $sum: "$total" }, count: { $sum: 1 } });

  return (
    <div style={{ display: "grid", gap: 8 }}>
      <p>{"{"} _id: null, grandTotal: ..., count: ... {"}"} — one summary document, not grouped by anything</p>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6 }}>
        {JSON.stringify(result, null, 2)}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
