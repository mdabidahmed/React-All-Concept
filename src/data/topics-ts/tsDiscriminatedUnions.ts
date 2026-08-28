import type { Topic } from "../../types";

export const tsDiscriminatedUnionsTopic: Topic = {
  id: "ts-discriminated-unions",
  title: "TypeScript Discriminated Unions",
  category: "Advanced Types",
  shortExplanation: `A **discriminated union** is a union of object types that all share one common, literal-typed property — the ==discriminant== (or "tag") — which TypeScript uses to automatically narrow to the exact matching type in each branch.

- \`{ status: "loading" } | { status: "success"; data: string } | { status: "error"; message: string }\` — \`status\` is the tag

- Checking \`if (state.status === "success")\` narrows \`state\` to *only* the \`success\` branch inside that block — \`state.data\` becomes safely accessible

- The classic real-world example: modeling a loading / success / error request state as one clean type instead of a pile of optional, possibly-contradictory fields`,
  longExplanation: `A common but genuinely messy way to model a request's state is a single object with several optional fields: \`{ loading?: boolean; data?: string; error?: string }\`. The problem is this shape allows nonsensical combinations that should never actually happen — \`loading: true\` *and* \`error: "failed"\` set at the same time, or all three fields simply missing. Nothing in the type stops these invalid combinations from compiling, so bugs like "showing both a spinner and an error message" become possible purely because the type allowed a state that should have been impossible.

- **A discriminated union fixes this by modeling each state as its own separate, complete object type**, then unioning them together: \`type RequestState = { status: "loading" } | { status: "success"; data: string } | { status: "error"; message: string };\`. Now a \`success\` state *must* have a \`data\` field and *cannot* have a \`message\` field — the type itself makes the invalid combinations impossible to construct in the first place, rather than merely discouraging them
- **The property every branch shares — here, \`status\` — is called the discriminant, or "tag."** Two things make it work: every branch has this exact same property name, and each branch gives it a different *literal* type (\`"loading"\`, \`"success"\`, \`"error"\` — this is exactly the literal types topic in action). Without the literal types — if \`status\` were typed as plain \`string\` on every branch — TypeScript would have no way to tell the branches apart just from a runtime check
- **Checking the discriminant is what triggers narrowing.** Inside \`if (state.status === "success") { ... }\`, TypeScript doesn't just know that this branch runs when the check is true — it re-examines the entire union and rules out every branch whose \`status\` type couldn't possibly be \`"success"\`. What's left is *only* the \`success\` branch, so \`state.data\` becomes safely accessible inside that block with no cast, no optional-chaining, and no extra checks needed — while attempting \`state.message\` in that same block is now correctly flagged as an error, since the \`success\` branch has no such property
- **A \`switch\` on the discriminant is the most common real-world pattern**, and it composes naturally with **exhaustiveness checking**: assigning the value in an unreachable \`default\` case to a variable typed \`never\` causes a compile error if a new branch is ever added to the union without also being handled in the switch. This turns "I added a new state variant but forgot to update this one rendering function" from a silent runtime gap into an immediate compile-time error
- **This pattern scales to any number of branches and any set of extra fields per branch** — a real app's request state often adds a fourth \`idle\` state before loading even starts, or a fifth \`refetching\` state that carries both the old \`data\` and a \`loading\` flag together, and each new branch simply gets its own literal tag value and its own specific fields
- **The tag doesn't have to be named \`status\`** — \`type\`, \`kind\`, and \`tag\` are all extremely common alternate names for the exact same pattern, and the mechanism works identically regardless of what the property is called, as long as it's consistently present with a distinct literal type on every branch

Discriminated unions are one of the highest-leverage patterns in everyday TypeScript because they turn a category of bug — an object being in a contradictory or nonsensical state — into something the type system itself refuses to allow, rather than something that has to be remembered and manually guarded against in every place the value is used.`,
  examples: [
    {
      id: "loading-success-error-state",
      title: "Modeling a loading/success/error request state",
      summary: "Each branch is a complete, self-consistent object — no contradictory field combinations are possible.",
      code: `type RequestState =
  | { status: "loading" }
  | { status: "success"; data: string }
  | { status: "error"; message: string };

function renderState(state: RequestState): string {
  if (state.status === "loading") {
    return "Loading...";
  }
  if (state.status === "success") {
    return "Data: " + state.data; // state.data is safely accessible here
  }
  return "Error: " + state.message; // state.message is safely accessible here
}

function App() {
  const states: RequestState[] = [
    { status: "loading" },
    { status: "success", data: "Ada Lovelace" },
    { status: "error", message: "Network timeout" },
  ];

  return (
    <div style={{ display: "grid", gap: 6 }}>
      {states.map((state, index) => (
        <p key={index}>{renderState(state)}</p>
      ))}
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "switch-on-discriminant",
      title: "Switching on the discriminant property",
      summary: "A switch statement is the most common way to handle every branch of a discriminated union.",
      code: `type RequestState =
  | { status: "loading" }
  | { status: "success"; data: string }
  | { status: "error"; message: string };

function StatusBanner({ state }: { state: RequestState }) {
  switch (state.status) {
    case "loading":
      return <p style={{ color: "#6b7280" }}>Loading...</p>;
    case "success":
      return <p style={{ color: "#22c55e" }}>Loaded: {state.data}</p>;
    case "error":
      return <p style={{ color: "#ef4444" }}>Failed: {state.message}</p>;
  }
}

function App() {
  return (
    <div style={{ display: "grid", gap: 6 }}>
      <StatusBanner state={{ status: "loading" }} />
      <StatusBanner state={{ status: "success", data: "Profile loaded" }} />
      <StatusBanner state={{ status: "error", message: "Not found" }} />
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "exhaustiveness-checking",
      title: "Exhaustiveness checking with never",
      summary: "Assigning the unreachable default case to a never-typed variable catches unhandled branches.",
      code: `type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "square"; side: number }
  | { kind: "rectangle"; width: number; height: number };

function area(shape: Shape): number {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius * shape.radius;
    case "square":
      return shape.side * shape.side;
    case "rectangle":
      return shape.width * shape.height;
    default: {
      // If a new "kind" is ever added without a matching case above,
      // "shape" would no longer be assignable to "never" — a compile error.
      const exhaustiveCheck: never = shape;
      return exhaustiveCheck;
    }
  }
}

function App() {
  const shapes: Shape[] = [
    { kind: "circle", radius: 4 },
    { kind: "square", side: 5 },
    { kind: "rectangle", width: 3, height: 6 },
  ];

  return (
    <div style={{ display: "grid", gap: 6 }}>
      {shapes.map((shape, index) => (
        <p key={index}>{shape.kind}: {area(shape).toFixed(2)}</p>
      ))}
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "adding-a-new-branch",
      title: "Extending a discriminated union with a new branch",
      summary: "An idle and a refetching state slot in naturally, each with their own tag and fields.",
      code: `type RequestState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "refetching"; data: string }
  | { status: "success"; data: string }
  | { status: "error"; message: string };

function renderState(state: RequestState): string {
  switch (state.status) {
    case "idle":
      return "Not started yet";
    case "loading":
      return "Loading for the first time...";
    case "refetching":
      return "Refreshing (showing stale data: " + state.data + ")";
    case "success":
      return "Up to date: " + state.data;
    case "error":
      return "Error: " + state.message;
  }
}

function App() {
  const states: RequestState[] = [
    { status: "idle" },
    { status: "refetching", data: "Cached profile" },
    { status: "success", data: "Fresh profile" },
  ];

  return (
    <div style={{ display: "grid", gap: 6 }}>
      {states.map((state, index) => (
        <p key={index}>{renderState(state)}</p>
      ))}
    </div>
  );
}

render(<App />);`,
    },
  ],
};
