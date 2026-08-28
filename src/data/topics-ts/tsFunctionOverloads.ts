import type { Topic } from "../../types";

export const tsFunctionOverloadsTopic: Topic = {
  id: "ts-function-overloads",
  title: "TypeScript Function Overloads",
  category: "Functions",
  shortExplanation: `A **function overload** lets one function name accept several distinct combinations of parameter types, each with its own precise return type — declared as multiple call *signatures* above a single, more general implementation.

- Each overload signature lists one exact way the function can be called: \`function getUser(id: number): User;\` and \`function getUser(ids: number[]): User[];\`
- The final signature is the **implementation** — it must be general enough to handle every overload, but callers never call it directly
- Calling the function with a combination of argument types that matches no overload is a compile-time error, even if the implementation itself could technically handle it`,
  longExplanation: `Sometimes a single function genuinely behaves differently — including returning a differently-shaped result — depending on what *kind* of arguments it receives. A plain union-typed parameter (\`id: number | number[]\`) can express that the input varies, but it forces every caller to get back the same union return type (\`User | User[]\`) and manually narrow it themselves, every single time, even when the caller already knows exactly which case applies. **Function overloads** solve this by declaring the valid call patterns explicitly, up front.

- An overload is written as a list of signatures with **no body**, each describing one valid way to call the function: \`function getUser(id: number): User | undefined;\` followed by \`function getUser(ids: number[]): User[];\`. These are the only two ways TypeScript will let anyone call \`getUser\` — anything else is a compile-time error.
- After the overload signatures comes exactly one **implementation signature**, which does have a body. It must be written broadly enough to satisfy every overload above it (typically using a union parameter type and a runtime check like \`Array.isArray\` or \`typeof\` to branch behavior) — but crucially, **callers never see or call this signature directly**. From the outside, only the overload signatures are visible, so the implementation's own types can be looser without weakening the public API.
- This is exactly why overloads help where a plain union parameter falls short: with overloads, \`getUser(2)\` is known at the call site to return \`User | undefined\`, and \`getUser([1, 3])\` is known to return \`User[]\` — no narrowing needed by the caller. Without overloads, both calls would return the same \`User | undefined | User[]\` regardless of the input, forcing an \`Array.isArray\` check wherever the result is used.
- **Order matters**: TypeScript checks overload signatures top to bottom and uses the first one that matches the call, so more specific signatures should generally be listed before more general ones.
- Overloads aren't something you reach for often in typical application code — but they're common in library and API design, and TypeScript's own built-in DOM types use them constantly (for instance, \`document.createElement("a")\` is typed to return an \`HTMLAnchorElement\` specifically, via overloads keyed on the tag name string).

The core trade-off: overloads add some verbosity (multiple signatures to maintain), but in exchange they let a function's public type surface be far more precise than a single, general signature ever could be.`,
  examples: [
    {
      id: "overload-single-vs-array",
      title: "getUser: a single id vs. an array of ids",
      summary: "The return type tracks exactly which overload was matched.",
      code: `interface User {
  id: number;
  name: string;
}

const allUsers: User[] = [
  { id: 1, name: "Ada Lovelace" },
  { id: 2, name: "Grace Hopper" },
  { id: 3, name: "Katherine Johnson" },
];

// Overload signatures: what callers are allowed to do.
function getUser(id: number): User | undefined;
function getUser(ids: number[]): User[];
// Implementation signature: general enough to cover both, not directly callable.
function getUser(idOrIds: number | number[]): User | undefined | User[] {
  if (Array.isArray(idOrIds)) {
    return allUsers.filter((user) => idOrIds.includes(user.id));
  }
  return allUsers.find((user) => user.id === idOrIds);
}

function App() {
  const single = getUser(2);
  const many = getUser([1, 3]);

  return (
    <div style={{ display: "grid", gap: 6 }}>
      <p>getUser(2) = {single?.name}</p>
      <p>getUser([1, 3]) = {many.map((u) => u.name).join(", ")}</p>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        "single" is typed as "User | undefined" and "many" is typed as "User[]" — TypeScript picks the right overload automatically.
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "overload-number-or-string",
      title: "Overloads branching on number vs. string",
      summary: "Two valid call shapes for formatId, one shared implementation.",
      code: `function formatId(id: number): string;
function formatId(id: string): string;
function formatId(id: number | string): string {
  if (typeof id === "number") {
    return "#" + id.toString().padStart(4, "0");
  }
  return id.toUpperCase();
}

function App() {
  const numericLabel = formatId(42);
  const textLabel = formatId("order-99");

  return (
    <div style={{ display: "grid", gap: 6 }}>
      <p>formatId(42) = {numericLabel}</p>
      <p>formatId("order-99") = {textLabel}</p>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        Two overloads describe the two valid ways to call "formatId" — the shared implementation branches internally with "typeof".
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "overload-order-and-errors",
      title: "Overload order, and an unlisted call shape",
      summary: "makeRange accepts one shape or two numbers — nothing else.",
      code: `function makeRange(length: number): number[];
function makeRange(start: number, end: number): number[];
function makeRange(startOrLength: number, end?: number): number[] {
  if (end === undefined) {
    return Array.from({ length: startOrLength }, (_, i) => i);
  }
  const range: number[] = [];
  for (let i = startOrLength; i <= end; i++) {
    range.push(i);
  }
  return range;
}

function App() {
  const fromLength = makeRange(5);
  const fromStartEnd = makeRange(3, 7);

  return (
    <div style={{ display: "grid", gap: 6 }}>
      <p>makeRange(5) = {fromLength.join(", ")}</p>
      <p>makeRange(3, 7) = {fromStartEnd.join(", ")}</p>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        Try makeRange("5") in the editor — it matches neither overload signature, so TypeScript rejects it even though the implementation itself never runs.
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "without-overloads-comparison",
      title: "Without overloads: manual narrowing at every call site",
      summary: "Contrast plain union typing against the overloaded getUser above.",
      code: `// Without overloads, callers must narrow the result themselves every time.
function getUserPlain(idOrIds: number | number[]): { id: number; name: string } | { id: number; name: string }[] {
  const allUsers = [
    { id: 1, name: "Ada Lovelace" },
    { id: 2, name: "Grace Hopper" },
  ];
  if (Array.isArray(idOrIds)) {
    return allUsers.filter((user) => idOrIds.includes(user.id));
  }
  return allUsers.find((user) => user.id === idOrIds) ?? allUsers[0];
}

function App() {
  const result = getUserPlain(1);
  // Without overloads, TypeScript can't know this is a single user, not an array —
  // "result.name" alone would be a type error without a manual check first.
  const name = Array.isArray(result) ? result[0].name : result.name;

  return (
    <div style={{ display: "grid", gap: 6 }}>
      <p>{name}</p>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        Compare this to the overloaded "getUser" above — overloads let the return type track the input type automatically, with no manual narrowing needed at the call site.
      </p>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
