import type { Topic } from "../../types";

export const tsConfigBasicsTopic: Topic = {
  id: "ts-config-basics",
  title: "TypeScript tsconfig.json Basics",
  category: "Modules & Configuration",
  shortExplanation: `\`tsconfig.json\` is a project's ==single source of truth== for how the TypeScript compiler should behave — which files to check, which JS version to target, and how strict to be.

- \`target\` — which JavaScript version the compiled output should look like (e.g. \`"ES2020"\`)
- \`module\` — which module format to emit (e.g. \`"ESNext"\` for modern bundlers)
- \`strict\` — turns on a whole bundle of stricter type-safety checks at once
- \`outDir\` — where compiled \`.js\` output goes; \`include\`/\`exclude\` — which files are part of the project at all`,
  longExplanation: `Every non-trivial TypeScript project has a \`tsconfig.json\` file sitting at its root. It's a single JSON file that tells the TypeScript compiler (\`tsc\`, or a build tool like Vite that uses TypeScript under the hood) exactly how to treat the project: which files count as part of it, which JavaScript features are safe to assume, and how strict the type checking should be. Without it, every option falls back to a default, but virtually every real project configures at least a handful of these settings explicitly.

- \`target\` controls which version of JavaScript the compiled output is written in. Modern syntax — optional chaining (\`?.\`), nullish coalescing (\`??\`), class fields, and more — either passes through unchanged (when the target is a modern version like \`"ES2020"\` or later, since the runtime already supports it) or gets rewritten into older, more verbose equivalent code (when the target is something old like \`"ES5"\`, for very old browser support). Most projects building for modern browsers or Node.js set this fairly high, since there's a real cost — larger output, slower code — to compiling down further than necessary
- \`module\` controls the *format* of the emitted \`import\`/\`export\` statements — \`"ESNext"\` keeps them as native ES module syntax (what modern bundlers like Vite expect), while \`"CommonJS"\` rewrites them into Node's older \`require\`/\`module.exports\` style. This is independent from \`target\`: one controls JS *syntax version*, the other controls *module format*
- \`strict\` is a single flag that turns on a whole bundle of individually-toggleable stricter checks at once — \`strictNullChecks\`, \`noImplicitAny\`, \`strictPropertyInitialization\`, and several others (covered in depth in the dedicated Strict Mode topic). It's overwhelmingly recommended to enable \`strict\` from a project's very first day, since retrofitting it onto a large, already-loose codebase later means confronting every previously-ignored type gap all at once
- \`outDir\` sets where compiled \`.js\` files are written when using \`tsc\` directly to build a project (commonly \`"./dist"\`) — kept separate from the hand-written \`.ts\` source so generated output never gets confused with, or accidentally edited as if it were, real source code. Projects using a bundler like Vite for the actual build often don't rely on this directly, since the bundler handles output itself, but it still matters for anything that runs \`tsc\` for type-checking or for building a standalone library
- \`include\` and \`exclude\` are arrays of file globs controlling which files the compiler considers part of the project at all. A typical setup includes only the actual source (\`"include": ["src"]\`) and excludes generated output and dependencies (\`"exclude": ["node_modules", "dist"]\`) — without this, the compiler could waste time re-checking its own previous output, or trying to type-check the (often untyped, or differently-typed) code inside \`node_modules\`
- A large project sometimes splits configuration across multiple files using \`extends\` — a shared \`tsconfig.base.json\` with common settings, referenced by more specific configs for an app versus a library, or for the app's source versus its test files

The examples below can't run a real compiler against a real \`tsconfig.json\` in this single-file sandbox, so they show representative config content directly, alongside small runnable snippets that demonstrate what a setting like \`strict\` actually changes about which code is accepted.`,
  examples: [
    {
      id: "representative-tsconfig",
      title: "A representative tsconfig.json",
      summary: "The shape of a typical small app's config, rendered here as text.",
      code: `function App() {
  const tsconfigExample =
    "{\\n" +
    '  "compilerOptions": {\\n' +
    '    "target": "ES2020",\\n' +
    '    "module": "ESNext",\\n' +
    '    "strict": true,\\n' +
    '    "outDir": "./dist",\\n' +
    '    "jsx": "react-jsx"\\n' +
    "  },\\n" +
    '  "include": ["src"],\\n' +
    '  "exclude": ["node_modules", "dist"]\\n' +
    "}";

  return (
    <div>
      <p>A typical tsconfig.json for a small React app:</p>
      <pre style={{ background: "#111827", color: "#e5e7eb", padding: 12, borderRadius: 6, fontSize: 12, overflowX: "auto" }}>
        {tsconfigExample}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "target-effect",
      title: "What target changes about compiled output",
      summary: "Modern syntax either passes through as-is or gets rewritten, depending on the target version.",
      code: `// "target" tells TypeScript which JS version to compile down to.
// Optional chaining (?.) and nullish coalescing (??) below either pass
// through unchanged (target: "ES2020" or later) or get rewritten into
// older, more verbose equivalent JS (target: "ES5", for old browsers).

function App() {
  const user: { profile?: { nickname?: string } } = {};
  const nickname = user.profile?.nickname ?? "Guest";

  return (
    <div>
      <p>Nickname: {nickname}</p>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        With a low target like "ES5", TypeScript rewrites "?." and "??" into older
        equivalent JS; with a modern target, they pass through as-is.
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "strict-effect-preview",
      title: "A preview of what strict catches: noImplicitAny",
      summary: "Under strict's noImplicitAny check, an unannotated parameter is a compile error, not a free pass.",
      code: `// Under loose settings, a parameter with no type annotation silently
// becomes "any" and TypeScript stays quiet. Under "strict" (specifically
// its "noImplicitAny" check), this becomes a compile-time error until the
// parameter is annotated.

function calculateArea(width: number, height: number): number {
  return width * height;
}

function App() {
  const area = calculateArea(4, 5);

  return (
    <div>
      <p>Area: {area}</p>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        Try deleting both ": number" annotations above — under strict mode, "width"
        and "height" would be flagged as implicit "any" instead of silently allowed.
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "include-exclude-outdir",
      title: "How include, exclude, and outDir shape a project layout",
      summary: "A file-tree walkthrough of which files the compiler touches and where it writes output.",
      code: `// Given this tsconfig.json:
//   "include": ["src"]
//   "exclude": ["node_modules", "dist"]
//   "outDir": "./dist"
//
// A project laid out like this:
//   src/
//     App.tsx
//     utils/
//       math.ts
//   dist/            <- generated output goes here, never hand-edited
//     App.js
//     utils/
//       math.js
//
// ...only compiles files under "src", ignores "node_modules" and "dist"
// entirely (so old compiled output is never re-compiled), and writes the
// resulting plain JS into "dist" without touching the original .ts source.

function App() {
  return (
    <div>
      <p>See the code comment above for how include/exclude/outDir shape a real project's file layout.</p>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
