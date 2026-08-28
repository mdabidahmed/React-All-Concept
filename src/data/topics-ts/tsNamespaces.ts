import type { Topic } from "../../types";

export const tsNamespacesTopic: Topic = {
  id: "ts-namespaces",
  title: "TypeScript Namespaces",
  category: "Modules & Configuration",
  shortExplanation: `A **namespace** is TypeScript's *older*, pre-ES-modules way of grouping related code under a single shared name, using the \`namespace\` keyword.

- \`namespace MathUtils { export function square(n: number) { ... } }\` groups code under \`MathUtils.square(...)\`
- Namespaces predate JavaScript having any built-in module system at all — they were TypeScript's own solution to the same problem \`export\`/\`import\` solve today
- ==Modern TypeScript code should use ES modules, not namespaces== — namespaces are considered legacy, and mainly still turn up in older codebases or in \`.d.ts\` files describing older libraries`,
  longExplanation: `Before JavaScript had \`import\`/\`export\` built into the language, there was no standard way to split code across files without everything landing in one shared global scope, colliding with anything else on the page. TypeScript's answer, introduced early in the language's life, was the \`namespace\` keyword (originally even called "internal modules"): a way to wrap related functions, classes, and variables under one shared name, avoiding naming collisions without needing a real module system underneath.

- The syntax wraps a block of code in \`namespace Name { ... }\`, and anything inside marked \`export\` becomes accessible as \`Name.thing\` from outside the block: \`namespace Shapes { export function area(w: number, h: number) { return w * h; } }\` is then called as \`Shapes.area(4, 5)\`
- Namespaces can be **nested** (\`namespace Outer.Inner { ... }\`) and can even be split across multiple files that all contribute to the same namespace name, which is how large legacy TypeScript codebases organized themselves before ES modules were an option
- Once JavaScript itself gained a real, standardized module system (\`export\`/\`import\`, now supported natively in browsers and Node.js), namespaces lost their main reason to exist. ES modules offer everything namespaces did — grouping and avoiding collisions — plus proper file-level dependency tracking, tree-shaking (unused exports can be dropped from a bundle), and tooling support that treats each file as its own explicit unit, rather than silently merging into a shared global namespace object
- For this reason, ==namespaces are now considered a legacy feature==. Official TypeScript guidance and virtually every modern style guide recommend ES modules for organizing code, reserving namespaces for a couple of narrow remaining cases: maintaining old codebases that already use them extensively, or writing \`.d.ts\` declaration files for older JavaScript libraries that were originally written to attach everything to one global variable (where a namespace can accurately describe that global's shape)
- A practical tell that a codebase predates modern conventions: seeing \`/// <reference path="..." />\` comments at the top of files (namespaces' own file-linking mechanism) instead of \`import\` statements

Nothing about this app, or a typical new project started today, uses namespaces for everyday code organization — every real example throughout this app's own source and throughout the rest of this TypeScript subject uses ES modules (\`export\`/\`import\`). This topic exists mainly so the \`namespace\` keyword is recognizable on sight if it's ever encountered in an older library, a \`.d.ts\` file, or a legacy codebase — not because it should be reached for in new code.`,
  examples: [
    {
      id: "basic-namespace",
      title: "Grouping related functions in a namespace",
      summary: "Everything exported inside the namespace becomes accessible as MathUtils.something.",
      code: `namespace MathUtils {
  export function square(n: number): number {
    return n * n;
  }

  export function cube(n: number): number {
    return n * n * n;
  }

  export const description = "basic math helpers";
}

function App() {
  return (
    <div style={{ display: "grid", gap: 6 }}>
      <p>{MathUtils.description}</p>
      <p>square(4) = {MathUtils.square(4)}</p>
      <p>cube(3) = {MathUtils.cube(3)}</p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "nested-namespace",
      title: "A nested namespace",
      summary: "Namespace.Inner.member reaches values grouped two levels deep.",
      code: `namespace Shapes {
  export namespace Circle {
    export function area(radius: number): number {
      return Math.PI * radius * radius;
    }
  }
}

function App() {
  const area = Shapes.Circle.area(5);

  return (
    <div>
      <p>Circle area (radius 5): {area.toFixed(2)}</p>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        "Shapes.Circle.area" reads like a mini file structure — this nesting is exactly
        what ES modules (a real "shapes/circle.ts" file) now handle more naturally.
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "namespace-vs-module-equivalent",
      title: "The same grouping, the modern ES module way",
      summary: "What the namespace above would look like split into real files with export/import instead.",
      code: `// ---- The namespace example, rewritten as a real multi-file ES module ----
//
// "circle.ts":
//   export function area(radius: number): number {
//     return Math.PI * radius * radius;
//   }
//
// "app.tsx":
//   import { area } from "./circle";
//   area(5);
//
// No shared global namespace object is created — "circle.ts" is its own
// independent unit, and only what it explicitly exports is reachable
// from outside. This is why virtually all modern TypeScript code,
// including everything else in this app, is organized this way instead
// of with "namespace".

function area(radius: number): number {
  return Math.PI * radius * radius;
}

function App() {
  return (
    <div>
      <p>Circle area (radius 5): {area(5).toFixed(2)}</p>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
