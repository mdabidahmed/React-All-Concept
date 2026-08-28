import type { Topic } from "../../types";

export const tsTypeGuardsTopic: Topic = {
  id: "ts-type-guards",
  title: "TypeScript Type Guards",
  category: "Advanced Types",
  shortExplanation: `A **custom type guard** is a reusable function whose return type is a *type predicate* — \`value is Type\` — so calling it narrows a value's type in every place it's used, not just one inline check.

- \`function isString(value: unknown): value is string { return typeof value === "string"; }\`

- After \`if (isString(value)) { ... }\`, TypeScript narrows \`value\` to \`string\` inside that block, exactly as if a \`typeof\` check had been written directly

- Far more reusable than repeating the same \`typeof\`/\`instanceof\` condition inline every time the same check is needed across a codebase`,
  longExplanation: `Inline narrowing (\`typeof value === "string"\`, \`value instanceof Error\`) works great for a simple, one-off check written directly inside an \`if\`. But plenty of real checks are either more complex than a single \`typeof\`/\`instanceof\` — checking several properties on an object at once, for instance — or need to be reused identically across many different places in a codebase. Repeating a multi-line condition everywhere it's needed is both tedious and a maintenance risk: if the check's logic ever needs to change, every copy has to be found and updated in sync. A **custom type guard** solves both problems by packaging the check into a single, named, reusable function.

- **The defining feature is the return type: a *type predicate*, written \`value is Type\`** instead of a plain \`boolean\`: \`function isString(value: unknown): value is string { return typeof value === "string"; }\`. The function's *body* still just returns an ordinary \`true\`/\`false\` — the special part is entirely in what TypeScript is told to *conclude* when that boolean comes back true
- **Calling the guard narrows the checked value everywhere it's called, not just at one inline check.** \`if (isString(value)) { value.toUpperCase(); }\` narrows \`value\` to \`string\` inside that block, exactly as if \`typeof value === "string"\` had been written directly there — but now the same \`isString\` function can be called from ten different files, and every single call site gets the same narrowing benefit, with the actual check logic living in exactly one place
- **This becomes essential once a check is more than a single \`typeof\`/\`instanceof\`.** A guard for "is this a fully-loaded user object" might need to check several properties at once: \`function isUser(value: unknown): value is User { return typeof value === "object" && value !== null && "id" in value && "name" in value; }\`. Writing this whole condition out inline, correctly, every single time it's needed would be repetitive and error-prone — wrapped in a named guard, it becomes a single reusable, testable unit
- **A type guard genuinely more reusable than a raw condition because it's a normal function** — it can be exported from a module, imported anywhere, unit-tested in isolation, and composed with other logic (used inside \`.filter()\`, for instance, to narrow an entire array at once: \`values.filter(isString)\` correctly infers the filtered result as \`string[]\`, not the original wider array type)
- **The type predicate is a promise the function makes to the compiler, not something TypeScript verifies for you.** If \`isString\`'s body were buggy — say, it mistakenly checked \`typeof value === "number"\` while still declaring \`value is string\` — TypeScript would trust the declared predicate and narrow incorrectly, leading to a false sense of safety. This is the one place where a small logic bug can genuinely undermine the type system's guarantees, so a type guard's actual runtime check deserves the same care and correctness as any other piece of core logic
- **Custom type guards compose naturally with discriminated unions and arrays.** A guard like \`function isSuccessState(state: RequestState): state is { status: "success"; data: string } { return state.status === "success"; }\` packages up a discriminant check the same way, useful when the same "is this the success branch" check needs to be reused across several components rather than repeated inline in each one
- Type guards are distinct from, but complementary to, the built-in narrowing covered in the previous topic — a type guard is really "manually teaching TypeScript a new narrowing rule" for a check the compiler couldn't figure out entirely on its own from a single inline \`typeof\`/\`instanceof\`/equality check

The core value of a custom type guard is turning "a runtime check that happens to also inform TypeScript" into "a named, reusable, single-source-of-truth function that both runs the check *and* teaches the type system its result" — exactly the kind of consolidation that keeps a growing codebase's type-narrowing logic consistent instead of scattered and slowly drifting apart across dozens of near-identical inline checks.`,
  examples: [
    {
      id: "basic-custom-type-guard",
      title: "A basic custom type guard: isString",
      summary: "value is string in the return type teaches TypeScript to narrow after calling isString(value).",
      code: `function isString(value: unknown): value is string {
  return typeof value === "string";
}

function describe(value: unknown): string {
  if (isString(value)) {
    return "String of length " + value.length;
  }
  return "Not a string";
}

function App() {
  return (
    <div style={{ display: "grid", gap: 6 }}>
      <p>{describe("hello")}</p>
      <p>{describe(42)}</p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "object-shape-type-guard",
      title: "A type guard checking multiple properties",
      summary: "isUser bundles a multi-property check into one reusable, named function.",
      code: `interface User {
  id: number;
  name: string;
}

function isUser(value: unknown): value is User {
  return (
    typeof value === "object" &&
    value !== null &&
    "id" in value &&
    "name" in value
  );
}

function greet(value: unknown): string {
  if (isUser(value)) {
    return "Welcome, " + value.name + " (#" + value.id + ")";
  }
  return "Not a valid user";
}

function App() {
  const valid = { id: 1, name: "Ada Lovelace" };
  const invalid = { title: "Not a user" };

  return (
    <div style={{ display: "grid", gap: 6 }}>
      <p>{greet(valid)}</p>
      <p>{greet(invalid)}</p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "type-guard-with-filter",
      title: "Using a type guard with Array.filter",
      summary: "filter(isString) narrows the whole resulting array to string[], not the original wider type.",
      code: `function isString(value: unknown): value is string {
  return typeof value === "string";
}

function App() {
  const mixed: unknown[] = ["apple", 42, "banana", true, "cherry"];
  const strings = mixed.filter(isString); // inferred as string[]

  return (
    <div style={{ display: "grid", gap: 6 }}>
      <p>Original mixed array has {mixed.length} items.</p>
      <p>Filtered strings: {strings.join(", ")}</p>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        strings.join(", ") works with no cast — filter(isString) already narrowed the array to string[].
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "discriminant-type-guard",
      title: "A type guard wrapping a discriminant check",
      summary: "isSuccessState packages a discriminated-union check into one reusable, testable function.",
      code: `type RequestState =
  | { status: "loading" }
  | { status: "success"; data: string }
  | { status: "error"; message: string };

function isSuccessState(
  state: RequestState
): state is { status: "success"; data: string } {
  return state.status === "success";
}

function ResultBanner({ state }: { state: RequestState }) {
  if (isSuccessState(state)) {
    return <p style={{ color: "#22c55e" }}>Success: {state.data}</p>;
  }
  return <p style={{ color: "#6b7280" }}>Not ready yet ({state.status})</p>;
}

function App() {
  return (
    <div style={{ display: "grid", gap: 6 }}>
      <ResultBanner state={{ status: "loading" }} />
      <ResultBanner state={{ status: "success", data: "Report complete" }} />
    </div>
  );
}

render(<App />);`,
    },
  ],
};
