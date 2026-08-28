import type { Topic } from "../../types";

export const tsLiteralTypesTopic: Topic = {
  id: "ts-literal-types",
  title: "TypeScript Literal Types",
  category: "Advanced Types",
  shortExplanation: `A **literal type** narrows down to one *exact* value rather than a whole category of values — \`"up"\` as a type means the value must be precisely the string \`"up"\`, not just any \`string\`.

- \`let direction: "up" | "down";\` accepts only those two exact strings — anything else, including a perfectly valid-looking other string, is rejected

- Numbers work the same way: \`let diceRoll: 1 | 2 | 3 | 4 | 5 | 6;\`

- ==This is the foundation everything else in "Advanced Types" builds on==: discriminated unions and strict, typo-proof prop types are both just unions of literal types underneath`,
  longExplanation: `Every value that appears in TypeScript code has two types available to describe it: the general category it belongs to (\`string\`, \`number\`, \`boolean\`), and the *literal* type of that exact value (\`"up"\`, \`42\`, \`true\`). Most of the time the general category is what's wanted — a function parameter typed \`string\` should accept any string. But sometimes only a small, fixed set of exact values actually makes sense, and a **literal type** — or more commonly, a *union* of several literal types — expresses that precisely.

- **A string literal type is written as the string itself, in the position where a type is expected:** \`let direction: "up";\` means \`direction\` isn't just *a* string — it can only ever hold the exact string \`"up"\`. Assigning \`direction = "up"\` compiles; assigning \`direction = "down"\` is a compile-time error, even though \`"down"\` is a perfectly ordinary string
- **A single literal type is rarely useful on its own** — a variable that can only ever be one exact value isn't very interesting. The real power comes from a **union of literal types**: \`let direction: "up" | "down" | "left" | "right";\` describes a small, closed set of valid values. This is dramatically more precise than typing the same variable as plain \`string\`, which would happily accept \`"sideways"\`, \`"UP"\` (wrong case), or any other typo with zero warning
- **Numeric literal types work identically:** \`let diceRoll: 1 | 2 | 3 | 4 | 5 | 6;\` restricts a variable to exactly those six numbers. Boolean literal types exist too (\`true\` and \`false\` individually are valid types), though a union of both — \`true | false\` — is just \`boolean\` again, so this form is mostly seen combined with other literals rather than alone
- **A common gotcha involves \`let\` versus \`const\` and inference.** \`const status = "success";\` infers the *literal* type \`"success"\`, since a \`const\` binding can never be reassigned to a different value. But \`let status = "success";\` infers the *wider* type \`string\`, since TypeScript assumes a \`let\` variable might later be reassigned to some other string. This matters when passing a variable to something expecting a literal union — \`const\` usually "just works," while \`let\` often needs an explicit type annotation to narrow it back down to the literal union that's actually intended
- **Object literals have the same widening behavior for their properties.** \`const config = { mode: "dark" };\` infers \`mode\` as \`string\`, not the literal \`"dark"\`, because object properties are mutable by default even when the object itself is declared with \`const\`. Fixing this needs either an explicit type annotation (\`const config: { mode: "dark" | "light" } = { mode: "dark" };\`) or the \`as const\` assertion, which tells TypeScript to infer every property using its most specific literal type instead of widening
- **This is the exact mechanism behind strict, typo-proof prop types** covered in "Typing React Props" — \`variant: "primary" | "secondary"\` on a props interface is nothing more than a union of string literal types, applied to a prop instead of a plain variable
- **It's also the exact mechanism the next topic, discriminated unions, is built from** — every branch of a discriminated union is tagged with one specific literal value (like \`status: "success"\`), and it's precisely because that tag is a literal type — not just \`string\` — that TypeScript can tell the branches apart and narrow correctly

The underlying idea is a spectrum of precision: \`any\` says nothing at all, \`string\` narrows to "some sequence of characters," and a literal union like \`"up" | "down"\` narrows all the way down to "exactly one of these specific, known values." Reaching for a literal union instead of a general type is how a huge amount of real-world invalid state — typos, unsupported modes, forgotten cases — gets caught before the code ever runs, for free.`,
  examples: [
    {
      id: "string-literal-union",
      title: "A union of string literal types",
      summary: "direction only accepts four exact strings — anything else is a compile-time error.",
      code: `type Direction = "up" | "down" | "left" | "right";

function move(direction: Direction): string {
  return "Moving " + direction;
}

function App() {
  const messages = [move("up"), move("left")];

  return (
    <div style={{ display: "grid", gap: 6 }}>
      {messages.map((message) => (
        <p key={message}>{message}</p>
      ))}
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        Try move("sideways") in the editor — TypeScript rejects it immediately, unlike a plain string parameter.
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "numeric-literal-union",
      title: "A union of numeric literal types",
      summary: "diceRoll is restricted to the exact numbers 1 through 6.",
      code: `type DiceRoll = 1 | 2 | 3 | 4 | 5 | 6;

function describeRoll(roll: DiceRoll): string {
  return roll === 6 ? "Roll of " + roll + " — great roll!" : "Roll of " + roll;
}

function App() {
  const rolls: DiceRoll[] = [3, 6, 1];

  return (
    <div style={{ display: "grid", gap: 6 }}>
      {rolls.map((roll, index) => (
        <p key={index}>{describeRoll(roll)}</p>
      ))}
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "let-vs-const-widening",
      title: "Widening: let infers string, const infers the literal",
      summary: "The same value infers a different type depending on whether it can be reassigned.",
      code: `function App() {
  const fixedStatus = "success"; // inferred as the literal type "success"
  let mutableStatus = "success"; // inferred as the wider type "string"

  mutableStatus = "anything at all"; // allowed — mutableStatus is just "string"

  function requiresLiteral(status: "success" | "error"): string {
    return "Status is: " + status;
  }

  return (
    <div style={{ display: "grid", gap: 6 }}>
      <p>{requiresLiteral(fixedStatus)}</p>
      <p>mutableStatus is now: {mutableStatus}</p>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        requiresLiteral(mutableStatus) would be rejected — TypeScript widened it to plain "string".
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "as-const-narrows-object-literal",
      title: "Fixing object literal widening with as const",
      summary: "Without as const, config.mode widens to string; with it, every property keeps its literal type.",
      code: `function App() {
  const widened = { mode: "dark" }; // widened.mode is inferred as "string"
  const narrowed = { mode: "dark" } as const; // narrowed.mode is the literal "dark"

  function requiresLiteralMode(mode: "dark" | "light"): string {
    return "Rendering in " + mode + " mode";
  }

  return (
    <div style={{ display: "grid", gap: 6 }}>
      <p>{requiresLiteralMode(narrowed.mode)}</p>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        requiresLiteralMode(widened.mode) would be rejected — widened.mode is plain "string", not the literal "dark".
      </p>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
