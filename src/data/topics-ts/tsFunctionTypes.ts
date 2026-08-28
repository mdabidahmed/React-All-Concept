import type { Topic } from "../../types";

export const tsFunctionTypesTopic: Topic = {
  id: "ts-function-types",
  title: "TypeScript Function Types",
  category: "Functions",
  shortExplanation: `A **function type** describes the shape of a function itself — what parameters it takes and what it returns — so a variable, parameter, or property can be typed as "a function that looks like this," independent of which specific function is assigned to it.

- Inline: \`function add(a: number, b: number): number { return a + b; }\` types the parameters and return value directly on the function
- Standalone: \`type MathOp = (a: number, b: number) => number;\` names that shape once, reusable everywhere
- Any function matching the shape can be assigned to a variable typed \`MathOp\` — this is what makes callbacks type-safe`,
  longExplanation: `JavaScript functions are ordinary values, and TypeScript lets you describe a function's *type* just like any other value's type — either written directly on one specific function (an inline annotation), or named once as a reusable, standalone type that many different functions can match.

- **Inline typing** puts the types directly in the function's own definition: \`function add(a: number, b: number): number { return a + b; }\`. This is enough when a function is only ever referenced by its own name.
- A **standalone function type** names that same shape so it can be reused anywhere a function value is expected: \`type MathOp = (a: number, b: number) => number;\`. Note the arrow-function syntax (\`=>\`) is used for the *type* itself, even if the actual implementing function is written with the \`function\` keyword — the type only describes parameters and a return type, not implementation.
- Once a function type exists, any function whose parameters and return type match can be assigned to a variable declared with that type: \`const add: MathOp = (a, b) => a + b;\`. Inside the implementation, TypeScript already knows \`a\` and \`b\` are numbers from the \`MathOp\` type, so there's no need to re-annotate them.
- The real payoff shows up with **callbacks** — a higher-order function can type its callback parameter using a function type, guaranteeing every caller passes in something with the right shape: \`function calculate(a: number, b: number, operation: MathOp): number\`. Without this, the parameter would either need \`any\` (losing all type safety on what gets called) or a repeated inline signature everywhere.
- A \`type\` alias using arrow syntax and an \`interface\` using a **call signature** (\`interface MathOp { (a: number, b: number): number; }\`) describe the exact same kind of shape — which to use is mostly a style preference, though interfaces are occasionally preferred when the callable shape might later need extra properties attached to it too.
- As with objects, function types are checked **structurally** — the parameter *names* in the type don't need to match the names used in whatever function actually gets assigned; only the parameter types, order, and count (and the return type) matter.

Function types are the backbone of nearly every callback-accepting API in TypeScript — array methods like \`map\` and \`filter\`, event handlers, and React's own prop types for functions like \`onClick\` are all, under the hood, exactly this pattern: a named or inline function type describing exactly what shape of function is expected.`,
  examples: [
    {
      id: "basic-typed-function",
      title: "A function with typed parameters and return value",
      summary: "The signature says exactly what goes in and what comes out.",
      code: `function add(a: number, b: number): number {
  return a + b;
}

function App() {
  const result = add(10, 5);

  return (
    <div style={{ display: "grid", gap: 6 }}>
      <p>add(10, 5) = {result}</p>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        The signature says: takes two numbers, returns a number — nothing else is allowed in or out.
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "function-type-alias",
      title: "A standalone function type used for two implementations",
      summary: "add and multiply both satisfy the same MathOp shape.",
      code: `type MathOp = (a: number, b: number) => number;

const add: MathOp = (a, b) => a + b;
const multiply: MathOp = (a, b) => a * b;

function App() {
  return (
    <div style={{ display: "grid", gap: 6 }}>
      <p>add(3, 4) = {add(3, 4)}</p>
      <p>multiply(3, 4) = {multiply(3, 4)}</p>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        Both "add" and "multiply" satisfy the same MathOp type — TypeScript infers "a" and "b" as numbers inside each, without repeating the annotation.
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "function-type-as-callback-param",
      title: "Using a function type to type a callback parameter",
      summary: "calculate accepts any operation matching the MathOp shape.",
      code: `type MathOp = (a: number, b: number) => number;

function calculate(a: number, b: number, operation: MathOp): number {
  return operation(a, b);
}

function App() {
  const sum = calculate(6, 2, (a, b) => a + b);
  const difference = calculate(6, 2, (a, b) => a - b);

  return (
    <div style={{ display: "grid", gap: 6 }}>
      <p>calculate(6, 2, add) = {sum}</p>
      <p>calculate(6, 2, subtract) = {difference}</p>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        "calculate" doesn't care which operation it receives — only that it matches the MathOp shape.
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "call-signature-interface",
      title: "A call-signature interface vs. an arrow-syntax type alias",
      summary: "Two different ways to write the same function shape.",
      code: `interface MathOpInterface {
  (a: number, b: number): number;
}

type MathOpAlias = (a: number, b: number) => number;

const usingInterface: MathOpInterface = (a, b) => a - b;
const usingAlias: MathOpAlias = (a, b) => a - b;

function App() {
  return (
    <div style={{ display: "grid", gap: 6 }}>
      <p>usingInterface(10, 4) = {usingInterface(10, 4)}</p>
      <p>usingAlias(10, 4) = {usingAlias(10, 4)}</p>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        An interface with a call signature and an arrow-syntax type alias describe the exact same function shape — pick whichever reads better.
      </p>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
