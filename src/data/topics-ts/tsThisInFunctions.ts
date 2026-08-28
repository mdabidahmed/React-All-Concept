import type { Topic } from "../../types";

export const tsThisInFunctionsTopic: Topic = {
  id: "ts-this-in-functions",
  title: "TypeScript this Parameter",
  category: "Functions",
  shortExplanation: `TypeScript lets a function declare a fake, compile-time-only first parameter named \`this\` — \`function foo(this: SomeType, ...)\` — purely to tell the type checker what \`this\` is *supposed* to be when the function runs, so incorrect usage gets flagged before the code ever executes.

- The \`this\` parameter is erased at compile time — it's never actually passed as a real argument
- In plain JavaScript, \`this\` is determined entirely at *runtime*, by how a function is called — TypeScript's \`this\` parameter adds a *static* check on top of that
- Calling a function in a way that would give it the wrong \`this\` (like extracting a method and calling it standalone) becomes a compile-time error instead of a silent runtime bug`,
  longExplanation: `JavaScript's \`this\` is famously one of the language's trickiest features precisely because it's resolved dynamically, purely by *how* a function gets called — \`obj.method()\` binds \`this\` to \`obj\`, but extracting that same function and calling it standalone (\`const fn = obj.method; fn();\`) silently loses that binding, often leaving \`this\` as \`undefined\` or the global object. Nothing in plain JavaScript warns about this until the code actually runs and something breaks.

- TypeScript addresses this by allowing a special, synthetic first parameter literally named \`this\`, with its own declared type: \`function toString(this: Config): string { return this.name; }\`. This parameter is **not real** — it's erased entirely at compile time, doesn't count toward the function's actual argument list, and is never something a caller passes in explicitly.
- Its only job is static checking: TypeScript cross-references every place the function gets called and verifies that, given *how* it's being called, \`this\` really will be an instance of the declared type. If a method declared with \`this: Config\` gets torn off its object and invoked standalone, TypeScript flags the call — the "this" context at that call site doesn't match \`Config\`.
- This is a genuine improvement over plain JavaScript's runtime-only behavior: instead of a mysterious \`undefined\` property access bug surfacing only when that exact code path runs, the mistake is caught immediately, while writing the code, regardless of whether that particular buggy call path was ever manually tested.
- A function can also explicitly declare \`this: void\`, which documents that it **never** relies on \`this\` at all — a plain, non-method callback. This is useful for library and callback-style code: TypeScript will then reject passing a \`this\`-dependent method where a \`this: void\` callback is expected, since that method might get called in a way that leaves its \`this\` binding broken.
- Arrow functions cannot declare a \`this\` parameter at all — they don't have their own \`this\`; they capture it lexically from whatever scope they're defined in, so there's nothing for a \`this\` parameter to check or override.
- The \`this\` parameter, when present, must always be the **first** parameter in the list, before any real parameters — TypeScript recognizes it by name and position and strips it away before the code is ever transpiled to JavaScript.

In short: JavaScript's \`this\` behavior doesn't change one bit — TypeScript can't alter how the language actually resolves \`this\` at runtime. What it adds is a way to *declare your expectations* about \`this\` up front, so any call site that would violate those expectations gets caught during development instead of in production.`,
  examples: [
    {
      id: "this-typed-method",
      title: "A method with an explicit this parameter",
      summary: "this: Button documents how onClick must be called.",
      code: `interface Button {
  label: string;
  onClick(this: Button): void;
}

const button: Button = {
  label: "Save",
  onClick(this: Button) {
    console.log("Clicked: " + this.label);
  },
};

function App() {
  button.onClick();

  return (
    <div style={{ display: "grid", gap: 6 }}>
      <p>Called button.onClick() — check the console for "Clicked: Save".</p>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        "this: Button" tells TypeScript that onClick must always be called as "button.onClick()", never detached and called standalone.
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "detached-this-caught",
      title: "Detaching a method loses its this binding",
      summary: "TypeScript catches the mistake before it becomes a runtime bug.",
      code: `class Counter {
  count = 0;

  increment(this: Counter): void {
    this.count += 1;
  }
}

function App() {
  const counter = new Counter();
  counter.increment();
  counter.increment();

  // const detached = counter.increment;
  // detached(); // TypeScript error: the "this" context of this call doesn't match Counter.

  return (
    <div style={{ display: "grid", gap: 6 }}>
      <p>counter.count = {counter.count}</p>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        Uncomment the "detached" lines in the editor — TypeScript flags the call at compile time, before it could ever produce a runtime "cannot read property of undefined" bug.
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "this-void-callback",
      title: "this: void for a callback that never uses this",
      summary: "Documents that a function is a plain callback, not a method.",
      code: `function onTimerTick(this: void, elapsedMs: number): void {
  console.log("Tick at " + elapsedMs + "ms — this callback never relies on 'this'.");
}

function App() {
  onTimerTick(1000);

  return (
    <div style={{ display: "grid", gap: 6 }}>
      <p>Called onTimerTick(1000) — check the console.</p>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        "this: void" documents that this function should never be called as a method relying on "this" — TypeScript rejects assigning a "this"-dependent method wherever a "this: void" callback is expected.
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "this-parameter-vs-js-runtime",
      title: "Contrasting a compile-time check with JavaScript's runtime-only this",
      summary: "Calling through the object keeps this correctly bound.",
      code: `interface Config {
  name: string;
  describe(this: Config): string;
}

const config: Config = {
  name: "Production",
  describe(this: Config) {
    return "Environment: " + this.name;
  },
};

function describeSafely(cfg: Config): string {
  // Calling through the object keeps "this" correctly bound to "cfg".
  return cfg.describe();
}

function App() {
  const description = describeSafely(config);

  return (
    <div style={{ display: "grid", gap: 6 }}>
      <p>{description}</p>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        In plain JavaScript, nothing stops writing "const d = config.describe; d();" — "this" would silently be undefined at runtime. TypeScript's "this: Config" parameter turns that mistake into a compile-time error instead.
      </p>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
