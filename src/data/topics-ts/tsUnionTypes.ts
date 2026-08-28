import type { Topic } from "../../types";

export const tsUnionTypesTopic: Topic = {
  id: "ts-union-types",
  title: "TypeScript Union Types",
  category: "Interfaces & Types",
  shortExplanation: `A **union type**, written \`TypeA | TypeB\`, means a value could be *either* type — TypeScript only knows for certain that it's one of the listed possibilities, not which one, until the code checks.

- \`type RequestState = "loading" | "success" | "error";\` — a variable that can only ever hold one of a few specific values
- Before using a member that only exists on *one* branch of a union, the code must ==narrow== it first — with \`typeof\`, \`in\`, an equality check, or similar
- Skipping the narrowing step and accessing a type-specific member directly is a compile-time error, not a runtime guess`,
  longExplanation: `A **union type** describes a value that could be one of several specific types, written by separating each possibility with a pipe: \`TypeA | TypeB\`. A variable typed \`string | number\` might hold a string today and a number tomorrow — TypeScript only guarantees it's one of the two, and won't let code assume which one without checking first.

- The most common everyday use is a **finite set of specific string values** standing in for a status or a mode: \`type RequestState = "loading" | "success" | "error";\`. This is far more precise than typing the same variable as a plain \`string\`, since \`string\` would accept typos like \`"succes"\` with no complaint, while the union rejects anything outside the exact listed values at compile time.
- Unions aren't limited to string literals — any types can be combined: \`string | number\`, \`User | null\`, or even a union of several different object shapes, such as \`type Shape = Circle | Square | Triangle;\` where each branch has its own distinct properties.
- The defining rule of working with a union is **narrowing**: TypeScript only allows access to members that exist on *every* branch of the union, unless the code first proves which specific branch it's dealing with. Given \`value: string | number\`, calling \`value.toUpperCase()\` directly is a compile-time error, because a \`number\` has no \`toUpperCase\` method — even though the value might genuinely be a string at runtime, TypeScript can't take that on faith.
- **\`typeof\`** is the standard way to narrow a union of primitives: \`if (typeof value === "string") { value.toUpperCase(); }\`. Inside that \`if\` block, TypeScript automatically treats \`value\` as a plain \`string\`, since it's the only remaining possibility that satisfies the check — this automatic narrowing inside a checked branch is often called "type narrowing" or "control flow analysis."
- **\`in\`** narrows a union of object shapes by checking whether a specific property exists on the value: \`if ("radius" in shape) { /* shape is treated as Circle here */ }\`. This works well for a union of object types that don't share an identical property list.
- A **discriminated union** — a union of object types that all share one common literal property (often called \`kind\` or \`type\`) with a different value per branch — is one of the most powerful and common narrowing patterns: \`type Shape = { kind: "circle"; radius: number } | { kind: "square"; side: number };\`. Checking \`shape.kind === "circle"\` narrows the entire object to the \`circle\` branch, safely exposing \`radius\` and hiding \`side\`, and a \`switch\` over \`kind\` lets TypeScript verify every branch has been handled.
- **Equality checks** narrow unions of specific literal values directly: given \`status: "loading" | "success" | "error"\`, an \`if (status === "success")\` branch narrows \`status\` to the single literal type \`"success"\` for the rest of that block.
- It's worth contrasting a union with an **intersection** (the previous topic): a union (\`|\`) means "one of these," requiring narrowing before using type-specific members, while an intersection (\`&\`) means "all of these at once," with every member from every combined type available immediately, with no narrowing step at all.

Unions show up constantly in realistic code: a function that might return a result or \`null\`, a piece of state that's one of a handful of named modes, an API response that succeeded or failed with an error, or a prop that accepts a couple of different but specific input shapes. Narrowing is not extra ceremony to work around — it's TypeScript verifying, at compile time, that every possible branch of the union really has been accounted for before code runs.`,
  examples: [
    {
      id: "basic-union",
      title: "A basic union of two primitive types",
      summary: "id can hold either a string or a number — nothing else is allowed.",
      code: `type Id = string | number;

function formatId(id: Id): string {
  return "ID: " + id;
}

function App() {
  const stringId: Id = "abc-123";
  const numberId: Id = 4567;

  return (
    <div style={{ display: "grid", gap: 6 }}>
      <p>{formatId(stringId)}</p>
      <p>{formatId(numberId)}</p>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        Try "const bad: Id = true;" in the editor — a boolean isn't part of the string | number union.
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "status-literal-union",
      title: "A string literal union modeling a request status",
      summary: "RequestState can only ever be one of three exact strings, unlike a plain string.",
      code: `type RequestState = "loading" | "success" | "error";

function describeState(state: RequestState): string {
  switch (state) {
    case "loading":
      return "Fetching data...";
    case "success":
      return "Data loaded!";
    case "error":
      return "Failed to load data.";
  }
}

function App() {
  const current: RequestState = "success";
  // const typo: RequestState = "succes"; // Error: not one of the allowed literal values.

  return (
    <div style={{ display: "grid", gap: 6 }}>
      <p>{describeState(current)}</p>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        A plain "string" type would happily accept a typo like "succes" — the literal union catches it instead.
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "narrowing-with-typeof",
      title: "Narrowing a union with typeof",
      summary: "TypeScript only allows toUpperCase() inside the branch where value is proven to be a string.",
      code: `function formatValue(value: string | number): string {
  if (typeof value === "string") {
    // Inside this block, TypeScript treats "value" as just a string.
    return value.toUpperCase();
  }
  // Out here, the only remaining possibility is "number".
  return value.toFixed(2);
}

function App() {
  return (
    <div style={{ display: "grid", gap: 6 }}>
      <p>{formatValue("hello")}</p>
      <p>{formatValue(3.14159)}</p>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        Calling "value.toUpperCase()" before the typeof check would be a compile-time error — a number has no such method.
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "discriminated-union-narrowing",
      title: "Narrowing a discriminated union with a shared \"kind\" field",
      summary: "Checking shape.kind narrows the whole object to the matching branch, safely.",
      code: `type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "square"; side: number };

function area(shape: Shape): number {
  if (shape.kind === "circle") {
    // Narrowed: only "radius" exists on this branch.
    return Math.PI * shape.radius * shape.radius;
  }
  // Narrowed: only "side" exists on this remaining branch.
  return shape.side * shape.side;
}

function App() {
  const circle: Shape = { kind: "circle", radius: 3 };
  const square: Shape = { kind: "square", side: 4 };

  return (
    <div style={{ display: "grid", gap: 6 }}>
      <p>Circle area: {area(circle).toFixed(2)}</p>
      <p>Square area: {area(square)}</p>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        Accessing "shape.radius" without first checking "shape.kind" would be a compile-time error.
      </p>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
