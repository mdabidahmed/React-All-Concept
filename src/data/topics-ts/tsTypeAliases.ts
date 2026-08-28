import type { Topic } from "../../types";

export const tsTypeAliasesTopic: Topic = {
  id: "ts-type-aliases",
  title: "TypeScript Type Aliases",
  category: "Interfaces & Types",
  shortExplanation: `A **type alias**, written \`type Name = ...\`, gives an existing type — or a brand-new combination of types — a reusable name. Unlike an interface, a type alias can name almost *any* kind of type, not just an object shape.

- Object shapes: \`type Point = { x: number; y: number };\`
- Unions of specific values: \`type Status = "idle" | "loading" | "success";\`
- Primitives, tuples, and function signatures can all be aliased too: \`type ID = string | number;\`, \`type Compare = (a: number, b: number) => number;\`
- Once declared, the alias name can be used anywhere a type is expected, exactly like a built-in type such as \`string\` or \`number\``,
  longExplanation: `A **type alias** does exactly what the name suggests: it gives a name to a type so that name can be reused instead of repeating the full type expression everywhere. The syntax is \`type Name = <any type expression>;\` — and the phrase "any type expression" is the key difference from an interface, which can only describe the shape of an object.

- **Aliasing an object shape** looks almost identical to an interface: \`type Point = { x: number; y: number };\`. Anywhere a \`Point\` is expected, an object with an \`x\` and a \`y\` number property satisfies it, using the same structural typing rules that apply everywhere else in TypeScript.
- **Aliasing a union** is something an interface simply cannot do, because a union isn't a single object shape — it's a choice between several possibilities. \`type Status = "idle" | "loading" | "success" | "error";\` names a specific, closed set of string values a variable is allowed to hold. This is one of the most common and useful things a type alias is reached for in everyday code.
- **Aliasing a primitive** gives a plain type like \`string\` or \`number\` a more meaningful name in context: \`type UserId = string;\` or \`type Age = number;\`. This doesn't add any runtime checking — a \`UserId\` is still just a \`string\` under the hood — but it documents intent and makes signatures more self-explanatory to read.
- **Aliasing a function signature** names the shape of a callable value: \`type MathOperation = (a: number, b: number) => number;\`. A variable or parameter typed as \`MathOperation\` can then be assigned any function matching that parameter and return type, without repeating the full signature at every call site.
- **Aliasing a tuple or array shape** is possible too: \`type Coordinates = [number, number];\` names a fixed-length, fixed-order pair, distinct from a general \`number[]\`.
- A type alias can also be built by **combining** other types using unions (\`|\`) and intersections (\`&\`), covered in their own topics — \`type ID = string | number;\` and \`type AdminUser = User & { permissions: string[] };\` are both type aliases built out of simpler pieces.
- One subtlety worth knowing: a type alias, once declared, **cannot be reopened** later to add more members the way an interface can (via declaration merging, covered in the next topic). A \`type\` declaration is a single, final definition — if the shape needs to grow, the alias itself has to be edited directly.
- Type aliases are purely a **compile-time** construct. Like every other TypeScript type annotation, they vanish entirely when code is compiled to JavaScript — there is no runtime trace of a \`type\` declaration, no object, no class, nothing a running program could inspect. They exist solely to help the compiler (and the developer reading the code) reason about what values are allowed where.

Because a type alias can name virtually anything — an object shape, a union, a primitive, a function signature, a tuple, or a combination of all of the above — it tends to be the more flexible of TypeScript's two shape-naming tools. The next topic looks directly at how a type alias compares to an interface, and when to reach for each.`,
  examples: [
    {
      id: "alias-for-object-shape",
      title: "A type alias naming an object shape",
      summary: "type Point looks almost identical to an equivalent interface for a simple object shape.",
      code: `type Point = {
  x: number;
  y: number;
};

function distanceFromOrigin(point: Point): number {
  return Math.sqrt(point.x * point.x + point.y * point.y);
}

function App() {
  const location: Point = { x: 3, y: 4 };

  return (
    <div style={{ display: "grid", gap: 6 }}>
      <p>Point: ({location.x}, {location.y})</p>
      <p>Distance from origin: {distanceFromOrigin(location)}</p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "alias-for-union",
      title: "A type alias naming a union of specific string values",
      summary: "Status can only ever be one of four exact strings — anything else is a compile-time error.",
      code: `type Status = "idle" | "loading" | "success" | "error";

function describeStatus(status: Status): string {
  switch (status) {
    case "idle":
      return "Waiting to start";
    case "loading":
      return "In progress...";
    case "success":
      return "Done!";
    case "error":
      return "Something went wrong";
  }
}

function App() {
  const current: Status = "loading";
  // const invalid: Status = "done"; // Error: "done" is not one of the allowed Status values.

  return (
    <div style={{ display: "grid", gap: 6 }}>
      <p>Current status: {current}</p>
      <p>{describeStatus(current)}</p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "alias-for-primitive-and-function",
      title: "Aliasing a primitive and a function signature",
      summary: "UserId documents intent for a plain string; MathOperation names a reusable function shape.",
      code: `type UserId = string;
type MathOperation = (a: number, b: number) => number;

function greetUser(id: UserId): string {
  return "Hello, user " + id;
}

const add: MathOperation = (a, b) => a + b;
const multiply: MathOperation = (a, b) => a * b;

function runOperation(op: MathOperation, a: number, b: number): number {
  return op(a, b);
}

function App() {
  return (
    <div style={{ display: "grid", gap: 6 }}>
      <p>{greetUser("u-1001")}</p>
      <p>runOperation(add, 2, 3) = {runOperation(add, 2, 3)}</p>
      <p>runOperation(multiply, 2, 3) = {runOperation(multiply, 2, 3)}</p>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        "UserId" is just a string underneath — the alias exists purely to make signatures easier to read.
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "alias-combining-union-and-object",
      title: "Combining a union alias with an object shape alias",
      summary: "A Notification's \"kind\" field is a union; the rest of its shape is described with an object type alias.",
      code: `type NotificationKind = "info" | "warning" | "error";

type Notification = {
  kind: NotificationKind;
  message: string;
};

function formatNotification(note: Notification): string {
  return "[" + note.kind.toUpperCase() + "] " + note.message;
}

function App() {
  const notifications: Notification[] = [
    { kind: "info", message: "Build started" },
    { kind: "warning", message: "Disk space is low" },
    { kind: "error", message: "Build failed" },
  ];

  return (
    <ul style={{ display: "grid", gap: 4 }}>
      {notifications.map((note, index) => (
        <li key={index}>{formatNotification(note)}</li>
      ))}
    </ul>
  );
}

render(<App />);`,
    },
  ],
};
