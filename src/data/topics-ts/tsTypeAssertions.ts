import type { Topic } from "../../types";

export const tsTypeAssertionsTopic: Topic = {
  id: "ts-type-assertions",
  title: "TypeScript Type Assertions",
  category: "TS Basics",
  shortExplanation: `A **type assertion** tells TypeScript "trust me, I know this value's type better than you do" — written as \`value as Type\`, or the older \`<Type>value\` syntax. It only changes what TypeScript *believes* about a value at compile time; it does **not** convert or transform the value at runtime.

- Reach for an assertion when you genuinely know more than the compiler can infer — typically right after a runtime check has already confirmed a shape
- Using an assertion to make a real type error go away, rather than to state a fact you've already verified, is a common ==code smell==
- An assertion compiles to nothing — no conversion happens, the underlying value is completely unchanged, only TypeScript's compile-time label for it changes`,
  longExplanation: `TypeScript infers types wherever it can, but sometimes a developer legitimately has information the compiler doesn't — the result of \`JSON.parse\`, a value pulled out of a broader union after a runtime check, or a DOM lookup that TypeScript can only type generically. A **type assertion** lets code state that extra knowledge explicitly: \`const config = raw as AppConfig;\` tells TypeScript "treat \`raw\` as an \`AppConfig\` from this point on," without running any actual conversion logic.

- The standard syntax is \`value as Type\`, placed directly after the expression being asserted. There is also an older syntax, \`<Type>value\`, which predates \`as\` — but it is ambiguous with JSX angle brackets, so it cannot be used at all in \`.tsx\` files, and even in plain \`.ts\` files the community has almost entirely standardized on \`as\` instead.
- An assertion is fundamentally different from a **type conversion**. \`Number("42")\`, \`String(42)\`, and \`parseInt("42", 10)\` are real function calls that inspect a value and produce a new one of a different runtime type. \`"42" as unknown as number\` does none of that — it produces the exact same string value, unchanged, with TypeScript simply agreeing (incorrectly, in that example) to call it a \`number\` from then on. Running \`typeof\` on the result at runtime still reports \`"string"\`, because nothing about the actual value ever changed.
- A **good** use of an assertion narrows a type the compiler couldn't narrow on its own, in a spot where the surrounding code has already proven the narrower type is correct. A classic example: \`JSON.parse(text)\` returns \`any\`, and after checking that the parsed value has the expected keys, asserting it \`as UserProfile\` communicates "I already verified this shape" rather than asking TypeScript to blindly trust an unchecked guess.
- A **smell** use of an assertion is reaching for it purely to make a real, correct type error disappear — for instance, asserting a value \`as SomeType\` specifically because TypeScript flagged an incompatibility, without first confirming the value actually has that shape. This routes around the exact safety net TypeScript exists to provide, and it's a common source of runtime crashes in codebases that lean on assertions too casually — the bug still exists, just hidden until the code runs.
- TypeScript normally refuses an assertion between two genuinely unrelated types (asserting a \`string\` directly \`as number\`, for example) as a basic sanity check. That restriction can be bypassed by going through \`unknown\` first — \`value as unknown as number\` — which is why "double assertion through \`unknown\`" is a recognizable pattern for forcing an assertion TypeScript would otherwise reject. Needing that escape hatch is usually itself a signal to slow down and double-check the surrounding logic.
- Because an assertion has zero runtime effect, it cannot be used as a substitute for actual validation or conversion. If a value truly needs to become a different runtime type, or needs to be checked before being trusted, a real conversion function or a runtime type guard (an \`if\` check, a validation library, a custom function returning \`value is Type\`) is the correct tool — the assertion only comes after that check has already happened, to tell TypeScript what was just proven.

The rule of thumb: an assertion should always be a statement of something already true, never a wish that something were true. If there's no runtime check backing it up, it's very likely papering over a real bug rather than describing one.`,
  examples: [
    {
      id: "assertion-after-runtime-check",
      title: "A safe assertion after a real runtime check",
      summary: "JSON.parse returns any — an assertion is appropriate right after verifying the shape.",
      code: `interface UserProfile {
  name: string;
  age: number;
}

function parseUserProfile(text: string): UserProfile {
  const parsed = JSON.parse(text);

  // A runtime check comes FIRST — the assertion only follows once we've actually verified the shape.
  if (typeof parsed.name !== "string" || typeof parsed.age !== "number") {
    throw new Error("Invalid user profile JSON");
  }

  return parsed as UserProfile;
}

function App() {
  const profile = parseUserProfile('{"name": "Ada Lovelace", "age": 28}');

  return (
    <div style={{ display: "grid", gap: 6 }}>
      <p>{profile.name} is {profile.age} years old.</p>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        The assertion here only restates something the "if" check already proved — it isn't doing the safety work by itself.
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "as-vs-angle-bracket-syntax",
      title: "The `as` syntax vs. the older angle-bracket syntax",
      summary: "<Type>value is the older assertion syntax — it clashes with JSX, so as is used everywhere in .tsx files.",
      code: `interface Shape {
  area: number;
}

function App() {
  const raw: unknown = { area: 42 };

  // The modern, universally-supported assertion syntax:
  const shape = raw as Shape;

  // The older syntax "const shape = <Shape>raw;" means the exact same thing in a plain .ts file,
  // but it is ambiguous with a JSX element and cannot be parsed at all in a .tsx file like this one —
  // "as" is the only option here, and is what the whole TypeScript + React ecosystem uses today.

  return (
    <div style={{ display: "grid", gap: 6 }}>
      <p>Shape area: {shape.area}</p>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        "&lt;Shape&gt;raw" would look just like a JSX tag here — that ambiguity is why "as" won out.
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "assertion-does-not-convert",
      title: "An assertion changes what TypeScript believes, not the actual value",
      summary: "Asserting a string as a number does not convert it — typeof still reports \"string\" at runtime.",
      code: `function App() {
  const raw: string = "42";

  // TypeScript won't allow "raw as number" directly (the types are unrelated),
  // so this forces it through "unknown" first — a recognizable, risky pattern.
  const fakedNumber = raw as unknown as number;

  const realNumber = Number(raw); // an actual conversion — a new value, a new runtime type

  return (
    <div style={{ display: "grid", gap: 6 }}>
      <p>typeof fakedNumber at runtime: {typeof fakedNumber}</p>
      <p>typeof realNumber at runtime: {typeof realNumber}</p>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        The assertion never touched the actual value — it is still the string "42" underneath, despite TypeScript's static type for it now saying "number".
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "assertion-as-a-smell",
      title: "When an assertion becomes a smell",
      summary: "Asserting away a real type error hides a bug instead of fixing it — a type guard is the honest fix.",
      code: `interface AdminUser {
  name: string;
  permissions: string[];
}

function getPermissions(user: Partial<AdminUser>): string[] {
  // SMELL: this silences a real error (permissions might be undefined) without checking anything.
  // return (user as AdminUser).permissions;

  // HONEST FIX: narrow with an actual runtime check first, THEN the type is safely known.
  if (user.permissions) {
    return user.permissions;
  }
  return [];
}

function App() {
  const withPerms = getPermissions({ name: "Ada", permissions: ["read", "write"] });
  const withoutPerms = getPermissions({ name: "Grace" });

  return (
    <div style={{ display: "grid", gap: 6 }}>
      <p>Ada: {withPerms.join(", ")}</p>
      <p>Grace: {withoutPerms.length === 0 ? "(no permissions)" : withoutPerms.join(", ")}</p>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        The commented-out assertion would have crashed at runtime for Grace — the "if" check catches it instead, safely.
      </p>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
