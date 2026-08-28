import type { Topic } from "../../types";

export const tsVoidNullUndefinedTopic: Topic = {
  id: "ts-void-null-undefined",
  title: "TypeScript void, null, and undefined",
  category: "TS Basics",
  shortExplanation: `TypeScript gives "nothing" its own precise types, instead of leaving every "empty" case ambiguous.

- \`void\` describes a function that doesn't return a meaningful value (it technically returns \`undefined\`, but that's not the point of calling it)
- \`null\` and \`undefined\` are each their own type, and — with ==strictNullChecks== on — only assignable to a variable that explicitly allows them
- \`strictNullChecks\` is what forces "this might not exist" to be handled instead of discovered at runtime
- Optional chaining \`?.\` and nullish coalescing \`??\` stay just as useful once values are properly typed as possibly \`null\`/\`undefined\``,
  longExplanation: `JavaScript already has two different flavors of "nothing" — \`null\` and \`undefined\` — plus a well-known history of crashing on them ("cannot read property of undefined"). TypeScript doesn't remove either concept; instead it makes both precise types the compiler can reason about, so the classic crash becomes a compile-time warning instead of a runtime surprise.

- \`void\` is a return-type annotation for a function that isn't meant to be used for its return value — typically one that only produces a side effect, like logging or mutating something external. \`function log(message: string): void { console.log(message); }\` still technically returns \`undefined\` under the hood (every JavaScript function returns *something*), but \`void\` communicates "don't use what this returns," which is a slightly different, more intentional signal than typing the return as \`undefined\` directly
- \`null\` and \`undefined\` are each their own type in TypeScript, each containing exactly one value. Without any special configuration, older/looser TypeScript settings allow \`null\` and \`undefined\` to be assigned to *any* type — a \`string\`-typed variable could quietly hold \`null\`, and nothing would flag it until something tried to call \`.toUpperCase()\` on it and crashed
- \`strictNullChecks\` (bundled into the broader \`"strict": true\` setting most modern projects turn on) changes that: once enabled, \`null\` and \`undefined\` are only assignable to a type that explicitly includes them, via a union like \`string | null\`. A plain \`string\` can no longer secretly become \`null\` — if a value genuinely might be absent, the type has to say so out loud, and every place that value is used has to handle the absent case before treating it as present
- This is exactly why \`Array.prototype.find\`, object lookups, and similar "might not find anything" operations are typed to return \`T | undefined\` rather than just \`T\` — the type itself is the warning that the result needs a check before it's trusted
- **Optional chaining** (\`?.\`) and **nullish coalescing** (\`??\`) pair naturally with this. \`person.address?.city\` short-circuits to \`undefined\` instead of throwing if \`address\` is missing, and \`?? "fallback"\` supplies a default only when the left side is \`null\` or \`undefined\` specifically (unlike \`||\`, which would also override a valid empty string or \`0\`). With a properly typed optional property — \`address?: Address\` — TypeScript already knows \`address\` might be missing, and \`?.\`/\`??\` become the concise way to actually handle that, rather than writing out a manual \`if\` check every time
- The combination — types that admit when something might be missing, plus operators built specifically to handle that gracefully — is a big part of why "cannot read property of X of undefined" is a far rarer crash in a properly typed TypeScript codebase than in plain JavaScript

None of this eliminates the concept of "nothing" from a program — it just forces every "nothing" to be visible in the types, at the exact places it can actually occur, instead of discovered by accident three function calls later.`,
  examples: [
    {
      id: "a-void-returning-function",
      title: "A void-returning function",
      summary: "void signals a function's return value isn't meant to be used, even though it technically returns undefined.",
      code: `function App() {
  function logMessage(message: string): void {
    console.log(message);
    // no return statement — that's the point of void
  }

  logMessage("Hello from a void function");

  return (
    <div style={{ display: "grid", gap: 6 }}>
      <p>Check the console — logMessage ran and returned nothing meaningful.</p>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        ": void" tells callers "don't use what this returns" — even though under the hood it
        technically returns undefined.
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "null-and-undefined-need-a-union",
      title: "null and undefined only where allowed",
      summary: "A variable must explicitly include | null in its type to legally hold null at all.",
      code: `function App() {
  let nickname: string | null = null;

  function setNickname(value: string | null) {
    nickname = value;
  }

  setNickname("Ace");

  const display = nickname ?? "(no nickname)";

  return (
    <div style={{ display: "grid", gap: 6 }}>
      <p>nickname: {display}</p>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        "nickname" had to be typed as "string | null" to legally hold null at all — a plain
        "string" would reject the assignment.
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "strictnullchecks-catches-a-bug",
      title: "strictNullChecks catches a classic bug",
      summary: "A lookup that might not find anything is typed to force a check before use.",
      code: `function App() {
  const users = ["Ada", "Grace", "Alan"];

  // Array.prototype.find's return type is "string | undefined" — it might not find anything.
  const found = users.find((name) => name.startsWith("M"));

  // TypeScript forces a check before using "found" as a plain string:
  const message = found !== undefined ? "Found: " + found : "No match found";

  return (
    <div style={{ display: "grid", gap: 6 }}>
      <p>{message}</p>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        Without the "found !== undefined" check, calling "found.toUpperCase()" directly would not
        compile — strictNullChecks catches the crash before it ever happens.
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "optional-chaining-and-nullish-coalescing",
      title: "Optional chaining and nullish coalescing with a typed optional field",
      summary: "?. and ?? handle a genuinely optional, typed property gracefully.",
      code: `interface Address {
  city: string;
}
interface Person {
  name: string;
  address?: Address;
}

function App() {
  const withAddress: Person = { name: "Ada", address: { city: "London" } };
  const withoutAddress: Person = { name: "Alan" };

  const cityA = withAddress.address?.city ?? "unknown city";
  const cityB = withoutAddress.address?.city ?? "unknown city";

  return (
    <div style={{ display: "grid", gap: 6 }}>
      <p>{withAddress.name}: {cityA}</p>
      <p>{withoutAddress.name}: {cityB}</p>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        "address?.city" short-circuits to undefined instead of crashing when address is missing;
        "?? 'unknown city'" then supplies a fallback.
      </p>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
