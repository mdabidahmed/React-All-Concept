import type { Topic } from "../../types";

export const tsThirdPartyTypesTopic: Topic = {
  id: "ts-third-party-types",
  title: "TypeScript Type Declarations for Third-Party Libraries",
  category: "Modules & Configuration",
  shortExplanation: `Not every library on npm is written in TypeScript — but most can still be used with full type safety, thanks to a well-established convention for supplying types separately.

- Some libraries **ship their own types** bundled in the package itself — nothing extra to install
- Others are plain JavaScript with no bundled types, so the community-maintained ==\`@types/package-name\`== packages (from the **DefinitelyTyped** project) supply matching types instead
- As a last resort, for a library with neither, you can hand-write your own \`declare module "package-name"\` block describing just what you actually use`,
  longExplanation: `TypeScript's own type checker only knows the shape of a library if *some* source of type information exists for it — either written by the library's own authors, or supplied separately. Since npm predates TypeScript and the overwhelming majority of published packages are still plain JavaScript, a whole ecosystem convention grew up around solving exactly this gap.

- Many modern, TypeScript-first libraries **bundle their own type declarations** directly in the published package — look for a \`"types"\` (or older \`"typings"\`) field in the library's \`package.json\`, pointing at an included \`.d.ts\` file. When a library does this, \`npm install\`ing it is enough; TypeScript automatically finds and uses the bundled types with zero extra setup. Most actively-maintained libraries today fall into this category
- Libraries that are plain JavaScript with **no bundled types at all** rely on **DefinitelyTyped**, a single enormous community-maintained repository of type declarations for thousands of untyped JS packages. Its declarations are published as separate npm packages under the \`@types\` scope, matching the original package's name: \`npm install lodash\` for the real library, plus \`npm install --save-dev @types/lodash\` for its types. TypeScript automatically picks up anything under \`@types/*\` in \`node_modules\` and applies it to matching imports — the two packages aren't linked explicitly anywhere in your code, TypeScript just knows to look
- \`@types\` packages are installed as dev dependencies (\`--save-dev\`) since they're only needed while writing and type-checking code — they contribute nothing to the actual runtime bundle, and are erased along with every other type annotation
- A library's \`@types\` package can occasionally lag behind the real library's latest version, or describe a slightly different shape than what actually ships — since it's maintained separately, by different people, on its own schedule. This is one of the trade-offs of the split: broad ecosystem coverage for older and smaller packages, at the cost of occasional drift for fast-moving ones (which is exactly why many libraries eventually migrate to bundling their own types instead)
- As a **last resort**, when a library has neither bundled types nor an \`@types\` package (common for small, obscure, or internal-only packages), you can hand-write your own ambient module declaration — typically in a project-level \`.d.ts\` file such as \`global.d.ts\`: \`declare module "some-untyped-lib" { export function doThing(value: string): number; }\`. This tells TypeScript to trust that shape without verifying it against anything real, which is less safe than a properly maintained \`@types\` package (nothing keeps it in sync automatically), but is still far better than the alternative — the import silently becoming \`any\`, with zero autocomplete and zero protection against typos or wrong argument types
- A minimal, even lazier last resort exists too: \`declare module "some-untyped-lib";\` with no body at all makes the whole module type as \`any\`, which at least silences the "could not find a declaration file" error without describing anything — useful as a stopgap, but it gives up all the safety a real declaration would provide

Knowing which bucket a library falls into is usually just a matter of trying the import first — TypeScript's own error message ("Could not find a declaration file for module 'x'. Try \`npm install --save-dev @types/x\` if it exists") is often specific enough to say exactly what to do next.`,
  examples: [
    {
      id: "library-with-own-types",
      title: "Libraries that ship their own bundled types",
      summary: "No @types package needed — the library's package.json points straight at its own .d.ts file.",
      code: `// Modern, TypeScript-first libraries (e.g. "date-fns", "zod", and most
// actively-maintained packages) bundle their own type declarations —
// look for a "types" field in their package.json. Nothing extra to
// install; "npm install" alone is enough for full type safety.

// Standing in for an already-typed function imported from such a library:
function chunk<T>(items: T[], size: number): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    result.push(items.slice(i, i + size));
  }
  return result;
}

function App() {
  const groups = chunk([1, 2, 3, 4, 5], 2);

  return (
    <div>
      <p>chunk([1,2,3,4,5], 2) = {JSON.stringify(groups)}</p>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        "T" is inferred as "number" here purely from the array passed in — the same
        function would work, and stay type-safe, for an array of any other type too.
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "declare-module-fallback",
      title: "Last resort: declaring an untyped library yourself",
      summary: "When a library has no bundled types and no @types package, a hand-written declare module fills the gap.",
      code: `// Last resort: no bundled types, and no matching "@types" package exists.
// Typically written once in a project's own "global.d.ts":
//
//   declare module "imaginary-legacy-lib" {
//     export function shout(text: string): string;
//   }
//
// This tells TypeScript "trust me, this module exists and has this shape" —
// less safe than real, maintained types (nothing re-checks it stays
// accurate), but far better than the import defaulting to "any" everywhere.

declare module "imaginary-legacy-lib" {
  export function shout(text: string): string;
}

function App() {
  // In a real project: import { shout } from "imaginary-legacy-lib";
  // Standing in for that import here, since this sandbox has no real module registry:
  function shout(text: string): string {
    return text.toUpperCase() + "!";
  }

  return (
    <div>
      <p>{shout("hello")}</p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "no-types-means-any",
      title: "What happens with no types at all: silent any",
      summary: "Without bundled types, an @types package, or a declare module, an import loses all type safety.",
      code: `// Without any type information at all, TypeScript treats everything from
// that import as "any" — it compiles, but with zero autocomplete and zero
// protection against typos or wrong argument types.

function App() {
  // Imagine this came from: import legacy from "totally-untyped-lib";
  const legacy: any = { doThing: (n: number) => n * 2 };

  // TypeScript allows this even though "doThing" really expects a number —
  // "any" opts the entire value out of type checking.
  const result = legacy.doThing("oops, not a number, but TS won't complain");

  return (
    <div>
      <p>Result: {String(result)}</p>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        This exact safety gap — "any" swallowing a real mistake — is what a bundled
        types field, an "@types" package, or a hand-written "declare module" each close.
      </p>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
