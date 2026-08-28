import type { Topic } from "../../types";

export const tsAnyUnknownTopic: Topic = {
  id: "ts-any-unknown",
  title: "TypeScript any and unknown",
  category: "TS Basics",
  shortExplanation: `Both \`any\` and \`unknown\` mean "I don't know the type yet" — but they handle that uncertainty in very different ways.

- \`any\` completely opts a value out of type checking — anything goes, with no safety net at all
- \`unknown\` also accepts any value, but ==forces a check or narrowing== before you're allowed to use it for anything specific
- Overusing \`any\` quietly reintroduces every bug TypeScript exists to prevent
- \`unknown\` is the type-safe way to say "this could be anything" — commonly used for values from \`JSON.parse\`, API responses, or a \`catch\` block`,
  longExplanation: `Sometimes a value's type genuinely isn't known ahead of time — data just arrived over the network, came out of \`JSON.parse\`, or was thrown inside a \`catch\` block. TypeScript has two types for "I don't know what this is yet," and picking the wrong one determines whether the compiler still protects you or quietly steps aside.

- \`any\` is the original escape hatch, inherited from TypeScript's early days of making JavaScript migration painless. A value typed \`any\` can be reassigned to anything, have any property accessed on it, and be passed anywhere — TypeScript performs *zero* checking on it from that point forward. This is exactly what makes it dangerous: \`any\` doesn't just mean "unknown right now," it means "stop checking this value, and everything derived from it, forever." A single \`any\` can spread silently through a codebase, since anything that touches an \`any\` value tends to become \`any\` itself
- \`unknown\`, added later specifically to give \`any\` a safer alternative, accepts any value just like \`any\` does — but it refuses to let you *do* anything with that value until you've proven what it actually is. Trying to call a method, access a property, or use it in an operation on a raw \`unknown\` is a compile error. You're required to narrow it first, using \`typeof\`, \`instanceof\`, an \`in\` check, or a custom type guard function — and only inside the branch where that check has already succeeded does TypeScript trust the value enough to let you use it
- The practical difference shows up the moment a mistake is made. With \`any\`, a typo like reading a misspelled property name compiles without complaint and simply returns \`undefined\` at runtime — the bug ships. With \`unknown\`, that same access is rejected at compile time, because nothing has proven the value even *has* that property yet
- A very common, realistic use of \`unknown\` is a \`catch\` block: under a strict TypeScript configuration, \`catch (error: unknown)\` is the default, forcing an \`instanceof Error\` check (or similar) before reading \`error.message\` — because JavaScript technically allows throwing anything at all, not just \`Error\` objects, so assuming a shape without checking would be unsound
- \`any\` isn't inherently forbidden — it still has legitimate, narrow uses: gradually migrating a large JavaScript codebase file by file, working around a third-party library with missing or broken type definitions, or a genuinely dynamic edge case. The difference is intent: reaching for \`any\` should be a deliberate, temporary decision, not a reflexive way to make a type error disappear
- As a rule of thumb: default to \`unknown\` whenever a value's type genuinely can't be known ahead of time, and treat every appearance of \`any\` in a codebase as worth a second look — it's very often silencing a real, catchable bug rather than describing a genuine impossibility.

The names are a good mnemonic on their own: \`any\` says "trust me, don't check," while \`unknown\` says "I admit I don't know — prove it before you use it."`,
  examples: [
    {
      id: "any-lets-a-bug-through",
      title: "any lets a bug through",
      summary: "any switches off checking entirely, so an invalid operation compiles without complaint.",
      code: `function App() {
  let value: any = "hello";
  value = 42; // any allows switching types freely — no error, ever

  // any completely disables checking, so this is allowed even though it doesn't exist:
  const shout = value.toUpperCase ? value.toUpperCase() : "no toUpperCase on a number";

  return (
    <div style={{ display: "grid", gap: 6 }}>
      <p>value is now: {String(value)}</p>
      <p>result: {shout}</p>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        TypeScript never complained about "value.toUpperCase()" even after value became a number —
        "any" switched off checking on it entirely.
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "unknown-forces-narrowing",
      title: "unknown forces narrowing before use",
      summary: "A raw unknown value can't be used for anything specific until it's checked first.",
      code: `function App() {
  let value: unknown = "hello";
  value = 42;

  // unknown cannot be used directly — it must be narrowed first:
  let result: string;
  if (typeof value === "string") {
    result = value.toUpperCase();
  } else if (typeof value === "number") {
    result = "a number: " + value;
  } else {
    result = "something else";
  }

  return (
    <div style={{ display: "grid", gap: 6 }}>
      <p>result: {result}</p>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        Try removing the "typeof value === 'string'" check and calling value.toUpperCase()
        directly — TypeScript refuses to compile it until value is narrowed.
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "any-vs-unknown-side-by-side",
      title: "any vs. unknown, side by side, on the same typo",
      summary: "any lets a misspelled property through silently; unknown demands a check first.",
      code: `function App() {
  function parseAsAny(json: string): any {
    return JSON.parse(json);
  }

  function parseAsUnknown(json: string): unknown {
    return JSON.parse(json);
  }

  const dataAny = parseAsAny('{"name": "Ada"}');
  const dataUnknown = parseAsUnknown('{"name": "Ada"}');

  // With "any", this typo compiles with zero complaints:
  const nameFromAny = dataAny.nmae; // undefined at runtime, no compile error

  // With "unknown", the shape must be checked before it can be read:
  let nameFromUnknown = "unknown shape";
  if (typeof dataUnknown === "object" && dataUnknown !== null && "name" in dataUnknown) {
    nameFromUnknown = String((dataUnknown as { name: unknown }).name);
  }

  return (
    <div style={{ display: "grid", gap: 6 }}>
      <p>nameFromAny (typo "nmae"): {String(nameFromAny)}</p>
      <p>nameFromUnknown (checked first): {nameFromUnknown}</p>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        The "any" version's typo silently returns undefined. The "unknown" version can't even
        access ".name" without proving the shape first.
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "unknown-in-a-catch-block",
      title: "unknown in a catch block",
      summary: "A caught error's type isn't guaranteed, so it must be checked before reading .message.",
      code: `function App() {
  function risky(): number {
    throw new Error("Something went wrong");
  }

  let message = "no error";
  try {
    risky();
  } catch (error: unknown) {
    // error is unknown by default in a strict TS setup — it must be narrowed before use:
    if (error instanceof Error) {
      message = error.message;
    }
  }

  return (
    <div style={{ display: "grid", gap: 6 }}>
      <p>caught message: {message}</p>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        "catch (error: unknown)" forces an "instanceof Error" check before reading ".message" —
        a common, realistic use of unknown.
      </p>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
