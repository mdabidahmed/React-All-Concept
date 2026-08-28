import type { Topic } from "../../types";

export const tsConditionalTypesTopic: Topic = {
  id: "ts-conditional-types",
  title: "TypeScript Conditional Types",
  category: "Advanced Types",
  shortExplanation: `A **conditional type** picks between two types based on a check, using \`T extends U ? X : Y\` — a type-level if/else, evaluated at compile time.

- \`type IsString<T> = T extends string ? "yes" : "no";\` — \`IsString<string>\` is \`"yes"\`, \`IsString<number>\` is \`"no"\`

- Most beginners rarely *write* these day-to-day — they're an ==advanced feature mostly encountered reading library type definitions==, not something reached for constantly in application code

- Kept simple here on purpose: this is enough to recognize the pattern, not a deep dive into \`infer\``,
  longExplanation: `Everything covered so far — interfaces, unions, mapped types — describes a type's *shape*. A **conditional type** does something different: it describes a *choice* between two possible types, decided by checking whether one type is assignable to another, using syntax that deliberately echoes JavaScript's own ternary operator: \`T extends U ? X : Y\`. Read this as "if \`T\` is assignable to \`U\`, the result is \`X\` — otherwise, the result is \`Y\`" — entirely at compile time, with no runtime check involved anywhere.

- **The basic form checks one type against another:** \`type IsString<T> = T extends string ? "yes" : "no";\`. Referencing \`IsString<string>\` evaluates to the literal type \`"yes"\`; referencing \`IsString<number>\` evaluates to \`"no"\`. Nothing runs when this happens — the compiler is simply resolving, once, which of the two branches the given \`T\` falls into, the same way it resolves any other type alias
- **A more practically useful version picks between two *real* types, not just labels:** \`type ArrayOrSingle<T> = T extends unknown[] ? T : T[];\` — if \`T\` is already some kind of array, the result is \`T\` unchanged; otherwise, the result wraps \`T\` in an array. This kind of "normalize this value into always being an array" logic shows up in a lot of utility functions that accept either a single item or a list of items interchangeably
- **Conditional types are what many library-authored utility types rely on internally.** TypeScript's own built-in \`NonNullable<T>\`, for instance, is defined using a conditional type that filters out \`null\` and \`undefined\` from a type. When reading through a popular library's \`.d.ts\` type definitions and encountering something with an \`extends ... ? ... :\` in it, that's this exact feature — the same one being introduced here, just applied to a more specific problem than a beginner example needs to cover
- **This is deliberately introduced as a *recognize it* feature, not a *reach for it constantly* one.** The large majority of application-level TypeScript — component props, API response shapes, everyday functions — never needs a hand-written conditional type. Where they matter most is *reading* other people's advanced type definitions (frameworks, utility libraries, TypeScript's own built-ins) and understanding what's happening, rather than authoring elaborate ones from scratch in typical day-to-day feature work
- **The deeper end of conditional types — the \`infer\` keyword, which extracts and captures a piece of a type from within the condition itself (used to build things like "the return type of this function" or "the element type of this array") — is intentionally left out here.** It's a real and powerful extension of the same idea, but it adds enough complexity that it's better treated as its own dedicated deep-dive later, once the basic \`T extends U ? X : Y\` shape feels comfortable and unsurprising on its own
- **Conditional types can be combined with generics naturally**, since the \`T\` being checked is usually a type parameter rather than a fixed, hard-coded type — this is exactly what makes \`IsString<T>\` and \`ArrayOrSingle<T>\` reusable across any type passed in, rather than being written for one single specific type each time

The one-sentence mental model worth keeping is: a conditional type is a type-level \`? :\`, and while it's a legitimately advanced corner of TypeScript's type system, understanding just this much — \`T extends U ? X : Y\` picks between two types based on a compatibility check — is enough to no longer be surprised or lost the next time it turns up while reading a library's type definitions.`,
  examples: [
    {
      id: "basic-conditional-type",
      title: "A basic conditional type: IsString<T>",
      summary: "T extends string ? 'yes' : 'no' resolves to a different literal type depending on T.",
      code: `type IsString<T> = T extends string ? "yes" : "no";

function App() {
  // These are type-level checks, resolved entirely at compile time.
  const stringCheck: IsString<string> = "yes";
  const numberCheck: IsString<number> = "no";

  return (
    <div style={{ display: "grid", gap: 6 }}>
      <p>IsString&lt;string&gt; = "{stringCheck}"</p>
      <p>IsString&lt;number&gt; = "{numberCheck}"</p>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        Nothing runs here — TypeScript resolves which branch applies once, at compile time.
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "array-or-single-conditional",
      title: "A practical conditional type: normalize into an array",
      summary: "ArrayOrSingle<T> leaves an already-array type alone, and wraps anything else in an array.",
      code: `type ArrayOrSingle<T> = T extends unknown[] ? T : T[];

function toArray<T>(value: T): ArrayOrSingle<T> {
  return (Array.isArray(value) ? value : [value]) as ArrayOrSingle<T>;
}

function App() {
  const single = toArray("apple"); // normalized into ["apple"]
  const already = toArray(["banana", "cherry"]); // left as-is

  return (
    <div style={{ display: "grid", gap: 6 }}>
      <p>toArray("apple") = [{(single as string[]).join(", ")}]</p>
      <p>toArray(["banana", "cherry"]) = [{(already as string[]).join(", ")}]</p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "conditional-type-in-utility",
      title: "Recognizing the pattern: a simplified NonNullable",
      summary: "TypeScript's built-in NonNullable<T> is itself defined using a conditional type like this one.",
      code: `type MyNonNullable<T> = T extends null | undefined ? never : T;

function printValue(value: MyNonNullable<string>): string {
  return "Value: " + value;
}

function App() {
  // MyNonNullable<string> is just "string" — string was never null or undefined to begin with.
  const message = printValue("hello");

  return (
    <div style={{ display: "grid", gap: 6 }}>
      <p>{message}</p>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        TypeScript's real built-in NonNullable&lt;T&gt; works the same way — this is the pattern behind it.
      </p>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
