import type { Topic } from "../../types";

export const tsEnumsTopic: Topic = {
  id: "ts-enums",
  title: "TypeScript Enums",
  category: "Advanced Types",
  shortExplanation: `An \`enum\` gives a set of named constants a shared type — **numeric enums** auto-increment from \`0\` by default, while **string enums** require every member to have its own explicit string value.

- \`enum Status { Pending, Active, Closed }\` — \`Pending\` is \`0\`, \`Active\` is \`1\`, \`Closed\` is \`2\`

- \`enum Status { Pending = "PENDING", Active = "ACTIVE", Closed = "CLOSED" }\` — generally preferred, since logging or debugging shows a readable string instead of a meaningless number

- ==Enums vs. a union of string literals is a genuinely debated trade-off in real TypeScript teams== — there's no single universally-correct answer`,
  longExplanation: `An \`enum\` is TypeScript's dedicated construct for a fixed, named set of related constants — days of the week, HTTP methods, a request's status. Unlike most TypeScript features, an enum isn't purely a compile-time construct that disappears after type-checking — it actually generates real JavaScript objects at runtime, which is part of what makes it both useful and, to some in the TypeScript community, a bit controversial.

- **A numeric enum auto-increments from \`0\` by default:** \`enum Status { Pending, Active, Closed }\` gives \`Status.Pending\` the value \`0\`, \`Status.Active\` the value \`1\`, and \`Status.Closed\` the value \`2\`. Any member can override its own starting number (\`enum Status { Pending = 1, Active, Closed }\` starts at \`1\` and continues incrementing from there), but leaving the numbers implicit is the common case. Numeric enums also generate a **reverse mapping** — \`Status[0]\` evaluates back to the string \`"Pending"\` at runtime — which is occasionally handy for debugging, but adds extra generated code that a lot of teams never actually use
- **A string enum requires every single member to have its own explicit value:** \`enum Status { Pending = "PENDING", Active = "ACTIVE", Closed = "CLOSED" }\`. There's no auto-increment for string enums — leaving one member without a value is a compile error, precisely because there's no sensible "next string" to generate the way there is with numbers
- **String enums are generally the preferred choice when a choice must be made between the two**, mainly for readability. Logging, debugging, and network payloads all show the *actual string* — \`"PENDING"\` — rather than a bare, meaningless \`0\` that requires looking up the enum definition to understand. A numeric enum's values also aren't stable in the same way — inserting a new member in the middle of the list shifts every number after it, silently changing values that might already be persisted somewhere (a saved file, a database column, an API contract) elsewhere
- **The genuinely debated real trade-off is enums versus a union of string literals** (\`type Status = "pending" | "active" | "closed";\`), and thoughtful TypeScript developers land on both sides. In favor of the union: it's zero runtime code (an enum compiles to a real object that ships in the bundle; a union type vanishes entirely after compilation), it works identically with plain JSON data from an API with no conversion step, and it avoids a few real enum quirks — numeric enums allow assigning *any* number to an enum-typed variable with no error, which surprises many people the first time they hit it. In favor of enums: the values are grouped under one namespace (\`Status.Active\` is arguably more self-documenting at the call site than a bare \`"active"\` string), autocomplete surfaces every member together under that namespace, and some codebases like having one indisputable canonical definition rather than a type that could technically be satisfied by any string matching the union
- **The official TypeScript team's own more recent guidance leans toward preferring literal unions for most everyday cases**, partly because of the runtime-code and any-number quirks above — but plenty of large, well-maintained real-world codebases use enums extensively and are perfectly happy with them. There is no single universally-correct answer here, and reasonable teams make different calls based on their own priorities (bundle size, JSON interop, namespacing preference)
- \`const enum\` is a variant that's fully inlined at compile time with zero runtime object generated at all — but it has enough tooling and build-system caveats (particularly around isolated compilation) that it's worth knowing exists without reaching for it by default

The practical takeaway: an enum is a legitimate, first-class tool for a fixed set of named constants, string enums are the safer default of the two enum flavors when an enum is the chosen approach, and reaching for a plain union of string literals instead is an equally legitimate, arguably lighter-weight alternative that a lot of modern TypeScript code prefers — both solve the same underlying problem of "restrict this value to a known, named set."`,
  examples: [
    {
      id: "numeric-enum-auto-increment",
      title: "A numeric enum, auto-incrementing from 0",
      summary: "Pending is 0, Active is 1, Closed is 2 — assigned automatically.",
      code: `enum Status {
  Pending,
  Active,
  Closed,
}

function App() {
  const current = Status.Active;

  return (
    <div style={{ display: "grid", gap: 6 }}>
      <p>Status.Pending = {Status.Pending}</p>
      <p>Status.Active = {Status.Active}</p>
      <p>Status.Closed = {Status.Closed}</p>
      <p>current === Status.Active: {String(current === Status.Active)}</p>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        Status[1] reverse-maps back to the string "Active" at runtime — a feature unique to numeric enums.
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "string-enum-explicit-values",
      title: "A string enum, with explicit values everywhere",
      summary: "Every member needs its own value — logging shows a readable string instead of a bare number.",
      code: `enum Status {
  Pending = "PENDING",
  Active = "ACTIVE",
  Closed = "CLOSED",
}

function describeStatus(status: Status): string {
  return "Current status: " + status;
}

function App() {
  const current = Status.Active;

  return (
    <div style={{ display: "grid", gap: 6 }}>
      <p>{describeStatus(current)}</p>
      <p>Status.Pending = {Status.Pending}</p>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        Notice the value itself is the readable string "ACTIVE", not a hard-to-interpret number like 1.
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "enum-in-switch-narrowing",
      title: "Using an enum in a switch statement",
      summary: "A function branching on every enum member, with the return type helping catch unhandled cases.",
      code: `enum Status {
  Pending = "PENDING",
  Active = "ACTIVE",
  Closed = "CLOSED",
}

function statusColor(status: Status): string {
  switch (status) {
    case Status.Pending:
      return "#f59e0b";
    case Status.Active:
      return "#22c55e";
    case Status.Closed:
      return "#6b7280";
  }
}

function App() {
  const statuses = [Status.Pending, Status.Active, Status.Closed];

  return (
    <div style={{ display: "grid", gap: 6 }}>
      {statuses.map((status) => (
        <p key={status} style={{ color: statusColor(status) }}>
          {status}
        </p>
      ))}
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "enum-vs-string-literal-union",
      title: "The alternative: a union of string literals",
      summary: "The same idea with zero generated runtime code — a genuinely debated trade-off either way.",
      code: `// The enum version generates a real JS object at runtime:
enum StatusEnum {
  Pending = "PENDING",
  Active = "ACTIVE",
  Closed = "CLOSED",
}

// The union version generates NO runtime code at all — it vanishes after compilation:
type StatusUnion = "PENDING" | "ACTIVE" | "CLOSED";

function describeEnum(status: StatusEnum): string {
  return "Enum status: " + status;
}

function describeUnion(status: StatusUnion): string {
  return "Union status: " + status;
}

function App() {
  return (
    <div style={{ display: "grid", gap: 6 }}>
      <p>{describeEnum(StatusEnum.Active)}</p>
      <p>{describeUnion("ACTIVE")}</p>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        The union version works directly with plain JSON data ("ACTIVE") — no import or conversion needed.
      </p>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
