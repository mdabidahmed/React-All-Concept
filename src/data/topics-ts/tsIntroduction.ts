import type { Topic } from "../../types";

export const tsIntroductionTopic: Topic = {
  id: "ts-introduction",
  title: "TypeScript Introduction",
  category: "TS Basics",
  shortExplanation: `**TypeScript** is JavaScript with an added ==type system== — you write ordinary JS logic, but you can also declare what *shape* of data a variable, parameter, or return value is expected to hold.

- A **superset** of JavaScript: every valid JS file is already valid TypeScript
- Types are checked at ==compile time==, before the code ever runs, catching a whole class of bugs early
- TypeScript compiles down ("transpiles") to plain JavaScript — browsers and Node.js never run TypeScript directly`,
  longExplanation: `JavaScript has no concept of types until a value actually exists at runtime — a function expecting a number can silently receive a string, and nothing complains until something breaks, possibly deep inside a large codebase. TypeScript, created by Microsoft, adds an optional type system on top of JavaScript that catches exactly this class of mistake *before* the code ever runs, directly in the editor and at compile time.

- TypeScript is a strict **superset** of JavaScript — every feature JavaScript has, TypeScript has too, plus type annotations layered on top. This means adopting TypeScript is incremental: an existing \`.js\` file can usually be renamed to \`.ts\` with few or no changes and already be valid
- The core idea is describing the *shape* of data: \`let age: number = 30;\` tells the compiler that \`age\` should always hold a number, and it will flag an error immediately if code later tries to assign a string to it — long before that mistake could cause a runtime bug
- TypeScript code never runs directly in a browser or in Node.js — it's compiled ("transpiled") into plain JavaScript by the TypeScript compiler (\`tsc\`), which strips out all the type annotations, leaving ordinary JS behind. Type checking is purely a *development-time* safety net; it has zero cost at runtime
- The benefits compound as a codebase grows: better autocomplete and inline documentation in the editor (the tooling knows exactly what properties/methods are valid on a given value), safer refactoring (renaming a property flags every place it's used incorrectly), and self-documenting function signatures that describe exactly what they expect and return
- TypeScript is *gradually adoptable* — the \`any\` type (covered in a later topic) lets you opt out of type checking for a specific value when needed, so a codebase doesn't need to be perfectly typed everywhere to benefit

This sandbox genuinely runs TypeScript syntax directly — type annotations, interfaces, generics, and everything else in this subject are real TypeScript, transpiled on the fly exactly as a real project's build tool would.`,
  examples: [
    {
      id: "basic-type-annotation",
      title: "A basic type annotation catching a mismatch",
      summary: "Declaring a variable's type lets the tooling flag an incorrect assignment before the code runs.",
      code: `function App() {
  let age: number = 30;
  age = 31; // fine — still a number

  const label: string = "Age: " + age;

  return (
    <div>
      <p>{label}</p>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        Try changing "age = 31" to "age = 'thirty-one'" in the editor above — TypeScript will flag it.
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "function-with-typed-params",
      title: "A function with typed parameters and return type",
      summary: "The signature documents exactly what the function expects and produces.",
      code: `function App() {
  function add(a: number, b: number): number {
    return a + b;
  }

  const result = add(4, 7);

  return (
    <div>
      <p>add(4, 7) = {result}</p>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        The signature "(a: number, b: number): number" means: takes two numbers, returns a number.
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "typescript-compiles-to-js",
      title: "The same logic, with and without types",
      summary: "Type annotations disappear once compiled — they only exist to help while writing the code.",
      code: `function App() {
  // With TypeScript's type annotations:
  function greetTyped(name: string): string {
    return "Hello, " + name + "!";
  }

  // What this looks like after tsc removes the types (plain JS):
  //   function greetPlain(name) {
  //     return "Hello, " + name + "!";
  //   }

  return (
    <div style={{ display: "grid", gap: 8 }}>
      <p>{greetTyped("Ada")}</p>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        Both versions run identically — the types are erased at compile time and add zero runtime cost.
      </p>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
