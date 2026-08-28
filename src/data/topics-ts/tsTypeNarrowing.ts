import type { Topic } from "../../types";

export const tsTypeNarrowingTopic: Topic = {
  id: "ts-type-narrowing",
  title: "TypeScript Type Narrowing",
  category: "Advanced Types",
  shortExplanation: `**Narrowing** is TypeScript automatically shrinking a union type down to a more specific type inside a block, based on a runtime check it can see and understand — this analysis is called ==control flow analysis==.

- \`typeof value === "string"\` narrows \`string | number\` down to just \`string\` inside that branch

- \`instanceof\`, truthiness checks (\`if (value)\`), and equality checks (\`if (value === "success")\`) all narrow too, each in their own way

- The discriminant-property check from discriminated unions (\`if (state.status === "success")\`) is really just narrowing applied to one specific, very common shape`,
  longExplanation: `Whenever a variable has a union type — \`string | number\`, \`User | null\`, a discriminated union — TypeScript starts out only willing to allow operations that are valid for *every* member of that union. **Narrowing** is the process by which TypeScript notices a runtime check in the code and, purely by reading the code's control flow, temporarily treats the variable as a more specific type for the rest of that particular branch. No annotation or cast is needed anywhere — TypeScript is simply reading the same \`if\` conditions a person would read, and drawing the same conclusions.

- **\`typeof\` narrows primitive types.** Given \`value: string | number\`, writing \`if (typeof value === "string") { value.toUpperCase(); }\` is valid — inside that block, TypeScript knows \`value\` can only be a \`string\`, since a \`number\` would never make \`typeof value === "string"\` true. In the corresponding \`else\` branch (or after an early \`return\`), TypeScript narrows the *other* way, treating \`value\` as \`number\`
- **\`instanceof\` narrows class instances the same way.** Given \`error: Error | string\`, \`if (error instanceof Error) { console.log(error.message); }\` narrows \`error\` to \`Error\` inside that block, since only an actual \`Error\` instance could make \`instanceof\` true — accessing \`.message\` is then safe with no cast
- **Truthiness checks narrow away \`null\`, \`undefined\`, and other falsy values.** Given \`user: User | null\`, \`if (user) { console.log(user.name); }\` narrows \`user\` to just \`User\` inside the block, since \`null\` is falsy and would never enter that branch. This is an extremely common pattern for handling optional or not-yet-loaded data, often written as an early return instead: \`if (!user) return; /* user is User from here on */\`
- **Equality checks narrow literal and union types directly.** Given \`status: "loading" | "success" | "error"\`, \`if (status === "success") { ... }\` narrows \`status\` to exactly the literal type \`"success"\` inside that block — nothing more elaborate than a plain \`===\` comparison is needed for TypeScript to draw this conclusion
- **The discriminant-property check that makes discriminated unions work is this exact same mechanism, applied to one specific, very common shape.** \`if (state.status === "success")\` is really just an equality-check narrow on the \`status\` property — TypeScript happens to additionally know that the *rest* of the object's shape is tied to that one property's value, so narrowing \`status\` narrows the whole object along with it. There's no separate "discriminated union feature" in the compiler; it's ordinary equality-check narrowing, made powerful by how the union of object types was designed
- **This overall behavior is called control flow analysis**, because TypeScript is literally tracing through the possible paths execution can take — branches, early returns, loops — and tracking what's provably true about a variable's type at each point along the way, rather than treating the variable's type as one fixed thing for the entire function
- **Narrowing is temporary and scoped to the check that produced it.** Once a narrowed variable is reassigned, or once execution leaves the block the narrowing applied to, TypeScript goes back to treating it as the wider original type — narrowing describes what's known at *this specific point* in the code, not a permanent change to the variable's declared type
- **A subtle real gotcha: narrowing can be lost across a function call.** If a narrowed value is passed into another function, or if a property (rather than a local variable) is checked and then read again after a function call in between, TypeScript sometimes can't guarantee the function call didn't change it — this is one of the reasons destructuring a narrowed property into a local variable first is a common defensive habit

Narrowing is what lets TypeScript combine genuinely flexible union types with genuinely strict guarantees inside each branch — the type stays honest about every possibility a value could hold, while the everyday \`if\` checks a person would naturally write are exactly what's needed to prove, to the compiler's satisfaction, which of those possibilities is actually true at any given line.`,
  examples: [
    {
      id: "typeof-narrowing",
      title: "Narrowing with typeof",
      summary: "A union of string | number is narrowed differently in each branch of an if/else.",
      code: `function describe(value: string | number): string {
  if (typeof value === "string") {
    return "String of length " + value.length;
  }
  return "Number times 2 = " + value * 2;
}

function App() {
  return (
    <div style={{ display: "grid", gap: 6 }}>
      <p>{describe("hello")}</p>
      <p>{describe(21)}</p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "instanceof-narrowing",
      title: "Narrowing with instanceof",
      summary: "error is only treated as an Error instance (with a .message) inside the instanceof branch.",
      code: `function describeError(error: Error | string): string {
  if (error instanceof Error) {
    return "Error object: " + error.message;
  }
  return "Plain string error: " + error;
}

function App() {
  const objectError = new Error("Connection failed");
  const stringError = "Simple failure";

  return (
    <div style={{ display: "grid", gap: 6 }}>
      <p>{describeError(objectError)}</p>
      <p>{describeError(stringError)}</p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "truthiness-narrowing",
      title: "Narrowing away null with a truthiness check",
      summary: "An early return narrows user from User | null down to just User for the rest of the function.",
      code: `interface User {
  name: string;
}

function greet(user: User | null): string {
  if (!user) {
    return "No user is logged in";
  }
  // From this point on, TypeScript knows "user" can only be a real User.
  return "Welcome back, " + user.name;
}

function App() {
  const loggedIn: User | null = { name: "Grace Hopper" };
  const loggedOut: User | null = null;

  return (
    <div style={{ display: "grid", gap: 6 }}>
      <p>{greet(loggedIn)}</p>
      <p>{greet(loggedOut)}</p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "equality-narrowing-and-discriminant",
      title: "Equality narrowing, including a discriminant property",
      summary: "A plain === check narrows a literal union, the exact same mechanism behind discriminated unions.",
      code: `type Status = "loading" | "success" | "error";

function label(status: Status): string {
  if (status === "success") {
    return "Done!";
  } else if (status === "error") {
    return "Something went wrong";
  }
  return "Working on it...";
}

type RequestState =
  | { status: "success"; data: string }
  | { status: "error"; message: string };

function summarize(state: RequestState): string {
  // This === check on "status" is ordinary equality narrowing — it just
  // happens to also narrow the rest of the object's shape along with it.
  if (state.status === "success") {
    return "Data: " + state.data;
  }
  return "Error: " + state.message;
}

function App() {
  return (
    <div style={{ display: "grid", gap: 6 }}>
      <p>{label("loading")}</p>
      <p>{label("success")}</p>
      <p>{summarize({ status: "success", data: "Report ready" })}</p>
      <p>{summarize({ status: "error", message: "Timed out" })}</p>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
