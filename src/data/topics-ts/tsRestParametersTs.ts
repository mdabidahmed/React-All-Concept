import type { Topic } from "../../types";

export const tsRestParametersTsTopic: Topic = {
  id: "ts-rest-parameters-ts",
  title: "TypeScript Rest Parameters",
  category: "Functions",
  shortExplanation: `A **rest parameter** (\`...args\`) collects any number of trailing arguments into a single typed array, letting a function accept a variable number of arguments while every argument is still type-checked.

- \`function sum(...nums: number[]): number\` — \`nums\` is a real \`number[]\` inside the function body
- A rest parameter must be the **last** parameter in the list, and there can only be one per function
- Combined with a generic (\`...args: T[]\`), a rest parameter stays flexible across types while remaining fully type-safe`,
  longExplanation: `Plain JavaScript's old \`arguments\` object gave functions access to every argument passed in, but it was never a real array and carried no type information at all. A **rest parameter** replaces that pattern with something both idiomatic and fully typed: any number of trailing arguments get collected into one genuine, typed array.

- The syntax prefixes a parameter with \`...\` and gives it an array type: \`function sum(...nums: number[]): number\`. Inside the function body, \`nums\` behaves like an ordinary \`number[]\` — every element is guaranteed to be a number, and array methods like \`.reduce\` or \`.map\` work on it directly.
- A rest parameter must be the **last** parameter in a function's list, and a function can only have **one**. Fixed parameters can still come before it: \`function logAll(prefix: string, ...messages: string[])\` requires exactly one \`prefix\` argument, followed by any number of \`messages\`.
- Rest parameters combine naturally with **generics**: \`function combine<T>(...items: T[]): T[]\` stays flexible across any type, while TypeScript still infers a single, consistent \`T\` for each individual call — calling \`combine(1, 2, 3)\` infers \`T\` as \`number\`, and calling \`combine("a", "b")\` infers \`T\` as \`string\`, all from the same implementation.
- Rest parameters (at the function *declaration*) and the spread operator (at a *call site*, like \`sum(...[1, 2, 3])\`) share the same \`...\` syntax but do opposite jobs — rest *collects* multiple arguments into an array, spread *expands* an array back out into multiple arguments. They're frequently used together: an array can be spread directly into a function that declares a rest parameter.
- Rest parameters can also be typed as **tuples** for more advanced fixed-plus-variable shapes, though the common case is simply an array type like \`string[]\` or a generic \`T[]\`.

Rest parameters are what make genuinely variadic (accepting "any number of arguments") utility functions possible without ever reaching for \`any\` — logging helpers, math utilities, and functions that combine or merge an unknown number of typed values all lean on exactly this feature.`,
  examples: [
    {
      id: "basic-rest-parameter",
      title: "A rest parameter collecting numbers",
      summary: "nums is a genuine number[] built from any number of arguments.",
      code: `function sum(...nums: number[]): number {
  return nums.reduce((total, n) => total + n, 0);
}

function App() {
  const total = sum(1, 2, 3, 4, 5);
  const totalFromArray = sum(...[10, 20, 30]);

  return (
    <div style={{ display: "grid", gap: 6 }}>
      <p>sum(1, 2, 3, 4, 5) = {total}</p>
      <p>sum(...[10, 20, 30]) = {totalFromArray}</p>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        Inside the function, "nums" is a genuine number[] — every element is type-checked as a number.
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "rest-with-leading-param",
      title: "A rest parameter combined with a required leading parameter",
      summary: "prefix is required; ...messages collects everything after it.",
      code: `function logAll(prefix: string, ...messages: string[]): string[] {
  return messages.map((message) => prefix + ": " + message);
}

function App() {
  const logs = logAll("INFO", "server started", "listening on port 3000");

  return (
    <div style={{ display: "grid", gap: 6 }}>
      {logs.map((log) => (
        <p key={log}>{log}</p>
      ))}
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        "prefix" is a required fixed parameter; "...messages" collects everything after it — a rest parameter must always come last.
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "generic-rest-parameter",
      title: "A generic rest parameter",
      summary: "combine works for any type, inferring a fresh T on every call.",
      code: `function combine<T>(...items: T[]): T[] {
  return items;
}

function App() {
  const numbers = combine(1, 2, 3);
  const words = combine("alpha", "beta", "gamma");

  return (
    <div style={{ display: "grid", gap: 6 }}>
      <p>combine(1, 2, 3) = {numbers.join(", ")}</p>
      <p>combine("alpha", "beta", "gamma") = {words.join(", ")}</p>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        TypeScript infers T separately for each call — number for the first, string for the second — while staying one implementation.
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "rest-parameter-rules",
      title: "Only one rest parameter, and it must be last",
      summary: "A practical team-roster function, plus the ordering rule as a gotcha.",
      code: `function describeTeam(captain: string, ...members: string[]): string {
  if (members.length === 0) {
    return captain + " (no other members)";
  }
  return captain + " leads " + members.join(", ");
}

function App() {
  const soloTeam = describeTeam("Ada");
  const fullTeam = describeTeam("Ada", "Grace", "Katherine", "Margaret");

  return (
    <div style={{ display: "grid", gap: 6 }}>
      <p>{soloTeam}</p>
      <p>{fullTeam}</p>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        Only one rest parameter is allowed per function, and it must be the last one — "function bad(...a: number[], b: string)" is a compile error.
      </p>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
