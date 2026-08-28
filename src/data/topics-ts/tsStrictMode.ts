import type { Topic } from "../../types";

export const tsStrictModeTopic: Topic = {
  id: "ts-strict-mode",
  title: "TypeScript Strict Mode",
  category: "Modules & Configuration",
  shortExplanation: `\`"strict": true\` in \`tsconfig.json\` is an ==umbrella flag== that turns on a whole bundle of individually-toggleable, stricter type-safety checks at once.

- Includes \`strictNullChecks\` (catches using a possibly-\`null\`/\`undefined\` value without checking first), \`noImplicitAny\` (catches an untyped parameter silently becoming \`any\`), \`strictPropertyInitialization\`, and several others
- Code that compiles fine under loose settings can be flagged the moment \`strict\` is turned on — it doesn't change what runs, only what the compiler is willing to accept
- Enabling \`strict\` from a project's *first day* is strongly recommended — retrofitting it onto a large, already-loose codebase later means confronting every previously-ignored gap all at once`,
  longExplanation: `TypeScript ships dozens of individually-toggleable compiler checks, each catching a specific category of mistake. Turning them all on one at a time in \`tsconfig.json\` would be tedious and easy to get wrong, so TypeScript bundles the most important ones behind a single flag: \`"strict": true\`. Flipping it on is equivalent to enabling roughly a dozen underlying flags together, each of which can still be toggled individually if a project needs to opt out of just one.

- \`strictNullChecks\` is arguably the single most impactful check in the bundle. Without it, \`null\` and \`undefined\` are treated as valid values for essentially *any* type — a variable typed \`string\` could secretly hold \`null\`, and TypeScript would say nothing until it blew up at runtime with a "cannot read property of null" error. With it enabled, a type like \`string | null\` must be explicitly narrowed (an \`if\` check, optional chaining, a non-null assertion) before it can be used as a plain \`string\` — the exact class of bug this check exists to catch
- \`noImplicitAny\` flags a parameter or variable that has no type annotation and can't be inferred from context, since it would otherwise silently become \`any\` — TypeScript's escape hatch that disables checking entirely for that value. Without this flag, a typo'd or forgotten annotation quietly opts a piece of code out of type safety without any warning at all
- \`strictPropertyInitialization\` checks that every class property is definitely assigned a value before use — typically in the constructor — rather than being declared with a type and just left \`undefined\` at runtime while TypeScript assumes it's always present
- \`strictFunctionTypes\`, \`strictBindCallApply\`, \`alwaysStrict\`, and a few others round out the bundle, each closing a narrower but still real gap (respectively: safer checking of function parameter types in certain assignment situations, correctly typed \`.call\`/\`.apply\`/\`.bind\`, and emitting JavaScript's own \`"use strict"\` automatically)
- Turning on \`strict\` doesn't change a single thing about how the compiled JavaScript *runs* — it only changes what the compiler is willing to accept as valid source in the first place. Code that was working perfectly fine at runtime can suddenly show compile errors the moment \`strict\` is enabled, because the compiler is now unwilling to let past the exact class of mistake that code happened to get away with
- This is precisely why enabling \`strict\` **from a project's very first day** is so strongly recommended. On a brand-new, mostly-empty codebase, satisfying strict checks is cheap — a handful of extra null checks and type annotations as the code is written. Retrofitting \`strict\` onto a large, already-loose codebase later means every one of those gaps, accumulated over months or years, surfaces all at once, often numbering in the hundreds or thousands of new errors to work through
- Projects that can't flip the switch all at once can still adopt strict incrementally — either enabling individual sub-flags one at a time instead of the whole bundle, or using \`// @ts-expect-error\` comments as a deliberate, visible marker on the specific lines that still need fixing, so the rest of the codebase can enjoy full strict checking immediately

The examples below show the same kind of code twice: what loose settings would silently let through, and what a strict-mode-safe version has to do instead.`,
  examples: [
    {
      id: "strict-null-checks",
      title: "strictNullChecks: a possibly-null value used unsafely",
      summary: "Without a check first, accessing a property on a possibly-null value is exactly what strictNullChecks blocks.",
      code: `function findUser(id: number): { name: string } | null {
  return id === 1 ? { name: "Ada Lovelace" } : null;
}

function App() {
  const user = findUser(2);

  // Under strictNullChecks, writing "user.name" directly here would be a
  // compile-time error, since "user" is possibly "null". A strict-safe
  // version narrows it first:
  const label = user ? user.name : "Unknown user";

  return (
    <div>
      <p>User: {label}</p>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        Try replacing the line above with "const label = user.name;" — under
        strictNullChecks, TypeScript refuses to compile that.
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "no-implicit-any",
      title: "noImplicitAny: an unannotated parameter",
      summary: "A parameter TypeScript can't infer must be annotated under strict — or it silently becomes any.",
      code: `function calculateArea(width: number, height: number): number {
  return width * height;
}

function App() {
  const area = calculateArea(4, 5);

  return (
    <div>
      <p>Area: {area}</p>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        Try deleting both ": number" annotations from calculateArea's parameters —
        under strict mode, "width" and "height" would be flagged as implicit "any"
        instead of silently accepted.
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "strict-property-initialization",
      title: "strictPropertyInitialization: a class field that's never set",
      summary: "A typed class property must be definitely assigned before use — not left implicitly undefined.",
      code: `class Counter {
  count: number = 0; // initialized inline — satisfies strictPropertyInitialization

  increment(): number {
    this.count += 1;
    return this.count;
  }
}

function App() {
  const counter = new Counter();
  counter.increment();
  counter.increment();

  return (
    <div>
      <p>Count: {counter.count}</p>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        Try declaring "count: number;" with no "= 0" and no constructor assignment —
        strictPropertyInitialization would flag that as unsafe, since "count" would
        actually be "undefined" at runtime despite its type claiming otherwise.
      </p>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
