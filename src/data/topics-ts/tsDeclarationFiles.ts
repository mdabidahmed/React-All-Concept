import type { Topic } from "../../types";

export const tsDeclarationFilesTopic: Topic = {
  id: "ts-declaration-files",
  title: "TypeScript Declaration Files",
  category: "Modules & Configuration",
  shortExplanation: `A **declaration file** (\`.d.ts\`) contains *only* type information — interfaces, type aliases, function signatures — and ==no actual implementation code== at all.

- It describes the *shape* of something (a library, a global variable, an untyped JS file) so TypeScript can check code that uses it, without needing to see or compile its real source
- \`declare function\`, \`declare const\`, and \`declare module\` are the core building blocks used inside a \`.d.ts\` file
- They're how plain JavaScript libraries become usable with full autocomplete and type safety, and how a Vite/React project like this one type-checks things like CSS Module imports`,
  longExplanation: `Every \`.ts\` or \`.tsx\` file mixes two things together: the real logic that runs, and type annotations describing that logic. A \`.d.ts\` file strips this down to *only* the second half — it declares what exists and what shape it has, with zero implementation. Nothing in a \`.d.ts\` file ever runs; it exists purely so the TypeScript compiler (and your editor) knows what's available and what types to expect.

- The core keyword is \`declare\`: \`declare function leftPad(value: string, totalWidth: number): string;\` tells TypeScript "a function called \`leftPad\` with this signature exists somewhere at runtime — trust this shape, but don't ask where the implementation is." No function body is written or allowed
- This matters most for **plain JavaScript libraries** that were never written in TypeScript. The library's actual \`.js\` code ships and runs exactly as-is, but a companion \`.d.ts\` file (either bundled with the library or installed separately as an \`@types\` package, covered in its own topic) describes its exports' shapes. TypeScript reads the \`.d.ts\` file when you \`import\` from the library, giving full autocomplete and type-checking on top of code that itself has no types at all
- \`declare module "some-package"\` describes an entire module's exports at once — useful both for third-party libraries and for **non-code assets** a bundler lets you import that TypeScript wouldn't otherwise understand. A real, concrete example lives in this very app: Vite projects declare something like \`declare module "*.module.css" { const classes: { [key: string]: string }; export default classes; }\`, which is exactly what makes \`import styles from "./Component.module.css"\` type-check and gives \`styles.someClassName\` real autocomplete, even though a \`.css\` file obviously isn't TypeScript source
- \`declare global { ... }\` augments globally available types — for instance, adding a custom property to the built-in \`Window\` interface so \`window.myCustomThing\` type-checks instead of being flagged as nonexistent. This is common when a script tag or a build step injects something onto \`window\` before the app's own code runs
- A \`.d.ts\` file can live alongside a \`.js\` implementation file with a matching name (TypeScript automatically pairs \`utils.js\` with \`utils.d.ts\`), be bundled inside a published npm package, or be hand-written in a project as a global declarations file (commonly named \`global.d.ts\` or, in a Vite project, \`vite-env.d.ts\`)
- Because nothing in a \`.d.ts\` file produces real code, it's entirely reasonable for the shapes it describes to drift out of sync with the actual implementation if it's hand-maintained — a \`.d.ts\` file is a promise about shape, not an automatically-verified guarantee, unless it's generated directly from real \`.ts\` source (which \`tsc\`'s \`declaration: true\` option can do automatically for a library you author yourself)

This sandbox runs every example in one self-contained file, so it can't demonstrate a real second \`.d.ts\` file being picked up automatically the way an actual project's compiler does. The examples below use comments to show what a realistic \`.d.ts\` file's contents would look like, then provide the equivalent implementation directly inline so the example can actually run.`,
  examples: [
    {
      id: "dts-for-a-plain-js-library",
      title: "A .d.ts file describing a plain JavaScript library",
      summary: "The library's real code stays untyped JS; a separate .d.ts file gives TypeScript its shape.",
      code: `// ---- Imagine a plain-JS library file, "leftPad.js", with no types: ----
//
//   function leftPad(value, totalWidth, padChar) {
//     return value.length >= totalWidth
//       ? value
//       : padChar.repeat(totalWidth - value.length) + value;
//   }
//   module.exports = { leftPad };
//
// ---- Its companion "leftPad.d.ts" describes the shape for TypeScript: ----
//
//   export function leftPad(
//     value: string,
//     totalWidth: number,
//     padChar?: string
//   ): string;
//
// TypeScript reads the .d.ts file automatically alongside the library,
// giving full autocomplete and type checking on code that calls it —
// even though the library's own source has no types at all.

// Standing in for the untyped library's real runtime implementation:
function leftPad(value: string, totalWidth: number, padChar: string = " "): string {
  return value.length >= totalWidth ? value : padChar.repeat(totalWidth - value.length) + value;
}

function App() {
  const padded = leftPad("7", 3, "0");

  return (
    <div>
      <p>leftPad("7", 3, "0") = "{padded}"</p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "declare-module-for-css-modules",
      title: "declare module: how CSS Module imports get typed",
      summary: "This exact pattern is what lets this app's own components import .module.css files safely.",
      code: `// This app's real components rely on a declaration like this one
// (typically living in "vite-env.d.ts") to make CSS Module imports
// type-check at all:
//
//   declare module "*.module.css" {
//     const classes: { [key: string]: string };
//     export default classes;
//   }
//
// That single declaration is what lets code elsewhere in this app write:
//
//   import styles from "./TopicFooterNav.module.css";
//   <nav className={styles.footer}>
//
// ...with "styles.footer" fully typed as a string, and a typo like
// "styles.footr" caught immediately instead of silently rendering
// "undefined" as a class name.

function App() {
  // Standing in for what "styles" looks like once typed via the declaration above:
  const styles: { [key: string]: string } = { footer: "footer_h29k1" };

  return (
    <nav className={styles.footer} style={{ padding: 8, border: "1px solid #d1d5db", borderRadius: 6 }}>
      <p>This "footer" class name came from a typed CSS Module import.</p>
    </nav>
  );
}

render(<App />);`,
    },
    {
      id: "declare-global-augmentation",
      title: "declare global: augmenting a built-in type",
      summary: "Adding a custom property to Window so TypeScript recognizes it instead of flagging it.",
      code: `// This pattern usually lives in a project's "global.d.ts" file:
declare global {
  interface Window {
    appBuildId: string;
  }
}

function App() {
  // In a real app, some other script sets this on window before React loads.
  window.appBuildId = "2026.08.25-1";

  return (
    <div>
      <p>Build ID: {window.appBuildId}</p>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        Without the "declare global" block above, TypeScript wouldn't recognize
        "appBuildId" as a property of "window" and would flag this as an error.
      </p>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
