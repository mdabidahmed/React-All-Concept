import type { Topic } from "../../types";

export const tsBasicTypesTopic: Topic = {
  id: "ts-basic-types",
  title: "TypeScript Basic Types",
  category: "TS Basics",
  shortExplanation: `TypeScript's most fundamental types mirror JavaScript's own primitives, plus a couple of shapes JavaScript never had a name for.

- \`string\`, \`number\`, and \`boolean\` cover text, numbers (there's no separate int/float — just \`number\`), and true/false
- Arrays are written two equivalent ways: \`number[]\` or the generic form \`Array<number>\`
- A ==tuple==, \`[string, number]\`, is a fixed-length array where each position has its own specific type
- \`object\` covers any non-primitive value, but a specific shape (like an interface) is almost always more useful`,
  longExplanation: `JavaScript already has runtime types — \`typeof "hi"\` is \`"string"\`, \`typeof 5\` is \`"number"\` — but nothing enforces them ahead of time. TypeScript's basic types let you say up front what a value is supposed to be, checked the moment code is written rather than the moment it runs.

- \`string\`, \`number\`, and \`boolean\` map directly onto JavaScript's own primitives. Unlike languages such as Java or C#, TypeScript has no separate \`int\`, \`float\`, or \`double\` — every numeric value, whole or decimal, is simply \`number\`
- Arrays have two equivalent spellings: \`number[]\` and \`Array<number>\`. Both mean exactly the same thing — an array where every element is a \`number\` — and choosing between them is purely a style preference; most style guides pick one and stay consistent
- A **tuple** looks like an array but fixes both the *length* and the *type at each position*: \`const point: [number, number] = [10, 20];\` means "exactly two numbers, in this order." A plain \`number[]\` can be any length, but a tuple typed \`[string, number]\` requires a string first, then a number, and nothing else — useful for pairs like coordinates, or a name paired with an age
- Destructuring a tuple works exactly like destructuring an array — \`const [x, y] = point;\` — except TypeScript already knows \`x\` and \`y\`'s types positionally, rather than treating every element as the same union of possibilities
- One subtlety worth knowing: without an explicit annotation, TypeScript infers a tuple-*looking* literal as a plain array by default — \`const point = [10, 20];\` is inferred as \`number[]\`, not \`[number, number]\` — so tuples usually need an explicit type annotation (or an \`as const\` assertion) to actually be treated as fixed-length. This is a common surprise the first time a tuple's positions don't get checked the way you'd expect
- \`object\` is the broadest non-primitive type — it accepts anything that isn't a \`string\`, \`number\`, \`boolean\`, \`null\`, or \`undefined\`, but says nothing about which properties exist on it. This makes it a poor choice whenever the actual shape matters — an \`interface\` or a \`type\` alias describing the real properties catches far more mistakes and gives far better autocomplete than deliberately leaving the shape a mystery
- Every one of these combines with array syntax too — \`string[]\`, \`Point[]\`, even \`[string, number][]\` for an array of tuples — building more specific collections out of any of the individual types

These basic types are the vocabulary everything else in TypeScript is built from: interfaces describe objects made of them, function signatures describe parameters and returns typed with them, and generics parameterize over them. Getting comfortable with this small set — and specifically noticing when \`object\` is too vague and a real shape is called for — pays off throughout the rest of the type system.`,
  examples: [
    {
      id: "the-primitive-types",
      title: "The primitive types",
      summary: "string, number, and boolean, annotated explicitly.",
      code: `function App() {
  const username: string = "Ada";
  const age: number = 28;
  const isAdmin: boolean = false;

  return (
    <div style={{ display: "grid", gap: 6 }}>
      <p>username: {username}</p>
      <p>age: {age}</p>
      <p>isAdmin: {String(isAdmin)}</p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "two-ways-to-type-an-array",
      title: "Two ways to type an array",
      summary: "number[] and Array<number> are two spellings of the exact same type.",
      code: `function App() {
  const scoresA: number[] = [10, 20, 30];
  const scoresB: Array<number> = [40, 50, 60];

  const total = scoresA.concat(scoresB).reduce((sum, n) => sum + n, 0);

  return (
    <div style={{ display: "grid", gap: 6 }}>
      <p>scoresA (number[]): {scoresA.join(", ")}</p>
      <p>scoresB (Array&lt;number&gt;): {scoresB.join(", ")}</p>
      <p>combined total: {total}</p>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        number[] and Array&lt;number&gt; are two spellings of the exact same type.
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "tuples-fixed-length",
      title: "Tuples: fixed length, position-specific types",
      summary: "[number, number] and [string, number] each require a specific shape, not just any array.",
      code: `function App() {
  const point: [number, number] = [10, 20];
  const [x, y] = point;

  const nameAndAge: [string, number] = ["Grace Hopper", 85];
  const [name, age] = nameAndAge;

  return (
    <div style={{ display: "grid", gap: 6 }}>
      <p>point tuple: ({x}, {y})</p>
      <p>nameAndAge tuple: {name} is {age}</p>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        Unlike a plain array, a tuple's length and the type at each position are both fixed and checked.
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "object-vs-a-specific-shape",
      title: "object vs. a specific shape",
      summary: "object only says \"not a primitive\" — a real interface describes what's actually inside.",
      code: `interface Point {
  x: number;
  y: number;
}

function App() {
  // "object" only says "not a primitive" — it doesn't describe what's inside.
  const anything: object = { anythingGoesHere: true, evenThisNumber: 42 };

  const point: Point = { x: 1, y: 2 };

  return (
    <div style={{ display: "grid", gap: 6 }}>
      <p>anything (typed as object): {JSON.stringify(anything)}</p>
      <p>point (typed as Point): ({point.x}, {point.y})</p>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        "point.z" would be a compile error — reading an unlisted property on "anything" would not,
        since object gives up on describing the shape.
      </p>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
