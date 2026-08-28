import type { Topic } from "../../types";

export const tsModulesTopic: Topic = {
  id: "ts-modules",
  title: "TypeScript Modules",
  category: "Modules & Configuration",
  shortExplanation: `TypeScript modules use the exact same \`export\` / \`import\` syntax as modern JavaScript — the main addition is that *types* can be exported and imported too, right alongside values.

- \`export interface User { ... }\` and \`export type ID = string | number;\` — types are exported just like functions or constants
- \`import type { User } from "./user";\` — the ==\`import type\`== keyword marks an import as type-only, so it's guaranteed to disappear completely once compiled
- Since types don't exist at runtime, this keeps it obvious which imports produce real runtime code and which are purely a compile-time aid`,
  longExplanation: `A TypeScript file is an ES module in exactly the same sense a modern JavaScript file is — \`export\` makes something available outside the file, \`import\` pulls it into another file, and a "default export" still works the same way. Nothing about the module *syntax* changes. What TypeScript adds is the ability to export and import **types** using that identical syntax, since interfaces, type aliases, and the values built from them all need to travel between files in any real project.

- Exporting a type looks just like exporting a value: \`export interface Product { id: number; name: string; price: number; }\` or \`export type Status = "idle" | "loading" | "error";\`. Anywhere else in the project, \`import { Product, Status } from "./types";\` brings both in
- \`import type { Product } from "./types";\` is a special form that tells TypeScript (and the build tool) "this import exists purely for type-checking — erase it entirely from the compiled output." Since \`Product\` is only ever used in type positions (parameter types, variable annotations, generic arguments) and never as a real runtime value, there is nothing left to import once compilation strips the types away
- Mixing value and type imports in one statement is also allowed: \`import { someFunction, type Product } from "./utils";\` marks just \`Product\` as type-only within an otherwise normal import
- Why bother distinguishing at all, when TypeScript can usually figure out on its own which imports are types? Being explicit with \`import type\` avoids a subtle class of bug with certain build tools (particularly ones that transpile files one at a time, like Babel or esbuild, without a full type-checking pass) — those tools can't always tell a type-only import from a real one, and might either leave behind a broken \`import\` statement for a module that doesn't actually exist at runtime, or fail to elide it as an optimization. \`import type\` removes all ambiguity
- \`export default\` still works exactly as in JavaScript for a module's single "main" export, while named exports (\`export function\`, \`export const\`, \`export interface\`) allow any number of additional exports per file. Most real projects lean toward named exports for better refactoring support (renaming stays consistent everywhere), which is also the convention used throughout this app's own source
- This sandbox runs every example as a single, self-contained file, so it cannot execute a real \`import\` pulling from a second file the way an actual project does. The examples below use code comments to show exactly what a second file's contents and the corresponding import statement would look like, then define the equivalent code directly inline so it can actually run here

In a real multi-file project, this all ties together with \`tsconfig.json\`'s \`module\` setting (covered in the tsconfig topic), which controls exactly what the compiled \`import\`/\`export\` statements look like in the final JavaScript output — but the source-level syntax you write is identical regardless of that setting.`,
  examples: [
    {
      id: "exporting-and-importing-values",
      title: "Exporting and importing ordinary values",
      summary: "The same export/import syntax as JavaScript — shown here with the 'second file' as a comment.",
      code: `// ---- In a real project, this would live in its own file, "mathUtils.ts": ----
//
//   export function add(a: number, b: number): number {
//     return a + b;
//   }
//
//   export const PI = 3.14159;
//
// ---- Another file would then import from it like this: ----
//
//   import { add, PI } from "./mathUtils";
//
// This sandbox only runs a single file, so the same declarations are
// written directly below instead of imported — the export/import syntax
// itself works identically in a real multi-file project.

function add(a: number, b: number): number {
  return a + b;
}

const PI = 3.14159;

function App() {
  return (
    <div style={{ display: "grid", gap: 6 }}>
      <p>add(2, 3) = {add(2, 3)}</p>
      <p>PI = {PI}</p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "exporting-and-importing-types",
      title: "Exporting and importing a type",
      summary: "export interface / import type works exactly like exporting and importing a value.",
      code: `// ---- In a real project, "user.ts" might contain: ----
//
//   export interface User {
//     id: number;
//     name: string;
//   }
//
// ---- And a component file would bring the type in with: ----
//
//   import type { User } from "./user";
//
// "import type" makes it explicit that nothing runtime-related is being
// pulled in — only a compile-time shape description.

interface User {
  id: number;
  name: string;
}

function greet(user: User): string {
  return "Hello, " + user.name + "!";
}

function App() {
  const currentUser: User = { id: 1, name: "Ada Lovelace" };

  return (
    <div>
      <p>{greet(currentUser)}</p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "mixed-value-and-type-import",
      title: "Mixing a value import with a type-only import",
      summary: "A single import statement can mark just one named import as type-only.",
      code: `// ---- Imagine "productApi.ts" exporting both a function and a type: ----
//
//   export interface Product {
//     id: number;
//     name: string;
//     price: number;
//   }
//
//   export function formatPrice(product: Product): string {
//     return "$" + product.price.toFixed(2);
//   }
//
// ---- A consuming file can import both together, marking just the type: ----
//
//   import { formatPrice, type Product } from "./productApi";

interface Product {
  id: number;
  name: string;
  price: number;
}

function formatPrice(product: Product): string {
  return "$" + product.price.toFixed(2);
}

function App() {
  const product: Product = { id: 7, name: "Keyboard", price: 49.5 };

  return (
    <div>
      <p>{product.name}: {formatPrice(product)}</p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "why-import-type-is-erased",
      title: "Why import type is fully erased at compile time",
      summary: "Type-only imports never appear in the compiled JavaScript, since types have no runtime existence.",
      code: `// A type-only import contributes nothing to the compiled output. Given:
//
//   import type { Product } from "./productApi";
//   import { formatPrice } from "./productApi";
//
// ...after compilation, only the second line survives — the first line
// simply vanishes, since "Product" was only ever used in type positions
// (parameter annotations, variable types) and never as an actual value.
//
// This is exactly why the annotations below cost nothing at runtime:
// they exist purely to catch mistakes while writing the code.

interface Product {
  id: number;
  name: string;
}

function describeProduct(product: Product): string {
  return "#" + product.id + " — " + product.name;
}

function App() {
  const product: Product = { id: 42, name: "Wireless Mouse" };

  return (
    <div style={{ display: "grid", gap: 6 }}>
      <p>{describeProduct(product)}</p>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        The "Product" interface never exists in the compiled JavaScript — it's
        purely a compile-time contract that "describeProduct" honors.
      </p>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
