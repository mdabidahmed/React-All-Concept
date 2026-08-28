import type { Topic } from "../../types";

export const tsOptionalDefaultParamsTopic: Topic = {
  id: "ts-optional-default-params",
  title: "TypeScript Optional and Default Parameters",
  category: "Functions",
  shortExplanation: `TypeScript lets a function parameter be **optional** (\`param?: type\`) or carry a **default value** (\`param: type = value\`) — two different ways of making an argument non-mandatory at the call site.

- \`?\` marks a parameter optional — its type automatically becomes \`type | undefined\`, and it must come *after* all required parameters
- A default value (\`greeting: string = "Hello"\`) is used whenever the argument is omitted, or passed as \`undefined\` explicitly
- If a default value is given without an explicit annotation, TypeScript **infers** the parameter's type from that default`,
  longExplanation: `Plain JavaScript has no built-in way to declare "this argument might be skipped" — code has to check \`arguments.length\` or fall back with \`||\`. TypeScript gives this two distinct, type-checked tools: optional parameters and default parameter values, and it's worth knowing exactly how they differ.

- An **optional parameter** is marked with \`?\` right after its name: \`function greetUser(name: string, title?: string)\`. Its type becomes \`string | undefined\` inside the function body, so code that uses it should account for the possibility it wasn't passed at all. Optional parameters must come *after* every required parameter — TypeScript rejects a required parameter following an optional one, since there'd be no way for the caller to skip only the optional one.
- A **default parameter** supplies a fallback value directly in the signature: \`function greet(name: string, greeting: string = "Hello")\`. If the caller omits the argument — or passes \`undefined\` explicitly — the default value is used instead. Unlike a plain optional parameter, the parameter's value inside the function body is never \`undefined\`; it's always a real, usable value.
- If a default value is provided without writing an explicit type annotation, TypeScript **infers** the type from that default: \`function formatDistance(value: number, unit = "km")\` infers \`unit\` as \`string\`, purely from \`"km"\`. Passing anything other than a string for \`unit\` later becomes a compile-time error, exactly as if it had been annotated \`unit: string\` by hand.
- A parameter cannot combine \`?\` and a default value at the same time (\`param?: type = value\` is a compile error) — a default value already makes a parameter optional to omit, so adding \`?\` on top is redundant and TypeScript disallows it outright.
- Default values are evaluated **left to right**, and later parameters can reference earlier ones: \`function makeRange(start: number, end: number = start + 10)\` — calling \`makeRange(0)\` computes \`end\` as \`10\`, using whatever \`start\` was actually passed.
- A common gotcha: default values only kick in for \`undefined\`, not for other "empty-ish" values. Passing \`0\`, \`""\`, or \`null\` does **not** trigger the default — only omitting the argument, or passing \`undefined\` literally, does.

Together, these two features remove most of the need for manual fallback logic (\`const g = greeting || "Hello";\`) right inside a function body, pushing that intent into the signature itself where it's easy to see and impossible to forget to type-check.`,
  examples: [
    {
      id: "optional-parameter",
      title: "An optional parameter after a required one",
      summary: "title? can be skipped entirely, but must come after the required name.",
      code: `function greetUser(name: string, title?: string): string {
  if (title) {
    return "Hello, " + title + " " + name + "!";
  }
  return "Hello, " + name + "!";
}

function App() {
  const withTitle = greetUser("Ada", "Dr.");
  const withoutTitle = greetUser("Ada");

  return (
    <div style={{ display: "grid", gap: 6 }}>
      <p>{withTitle}</p>
      <p>{withoutTitle}</p>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        "title" is optional and must come after the required "name" parameter — TypeScript rejects the reverse order.
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "default-parameter-value",
      title: "A default parameter value",
      summary: "Omitting greeting, or passing undefined, falls back to \"Hello\".",
      code: `function greet(name: string, greeting: string = "Hello"): string {
  return greeting + ", " + name + "!";
}

function App() {
  const defaultGreeting = greet("Grace");
  const customGreeting = greet("Grace", "Welcome back");

  return (
    <div style={{ display: "grid", gap: 6 }}>
      <p>{defaultGreeting}</p>
      <p>{customGreeting}</p>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        Omitting "greeting" — or passing "undefined" explicitly — falls back to "Hello".
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "inferred-default-type",
      title: "Type inferred from a default value",
      summary: "No annotation on unit — TypeScript infers string from \"km\".",
      code: `// No annotation on "unit" — TypeScript infers its type as "string" from the default value.
function formatDistance(value: number, unit = "km"): string {
  return value + " " + unit;
}

function App() {
  const distance = formatDistance(42);
  const miles = formatDistance(26, "mi");

  return (
    <div style={{ display: "grid", gap: 6 }}>
      <p>{distance}</p>
      <p>{miles}</p>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        Try formatDistance(10, 5) in the editor — TypeScript rejects it, since "unit" was inferred as string from "km".
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "default-referencing-earlier-param",
      title: "A default value referencing an earlier parameter",
      summary: "end defaults to start + 10, computed from whatever start actually was.",
      code: `// A later default parameter can reference an earlier parameter's value.
function makeRange(start: number, end: number = start + 10): number[] {
  const range: number[] = [];
  for (let i = start; i <= end; i++) {
    range.push(i);
  }
  return range;
}

function App() {
  const shortRange = makeRange(5, 8);
  const defaultSpanRange = makeRange(0);

  return (
    <div style={{ display: "grid", gap: 6 }}>
      <p>makeRange(5, 8) = {shortRange.join(", ")}</p>
      <p>makeRange(0) = {defaultSpanRange.join(", ")}</p>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        Note: "end?: number = start + 10" would be a compile error — a parameter can't combine "?" with a default value, since a default already makes it optional.
      </p>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
