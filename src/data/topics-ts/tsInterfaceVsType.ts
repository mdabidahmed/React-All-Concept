import type { Topic } from "../../types";

export const tsInterfaceVsTypeTopic: Topic = {
  id: "ts-interface-vs-type",
  title: "TypeScript Interface vs Type Alias",
  category: "Interfaces & Types",
  shortExplanation: `\`interface\` and \`type\` overlap heavily — both can describe an object's shape, and for that job they're nearly interchangeable. They diverge outside that overlap: an \`interface\` can be **re-opened and extended later** (declaration merging), while a \`type\` alias can directly name things an interface never can, like unions and primitives.

- Same job, object shapes: \`interface User { name: string }\` and \`type User = { name: string }\` behave almost identically
- Only \`interface\` supports declaration merging — two \`interface User { ... }\` blocks with the same name combine into one
- Only \`type\` can alias a union, a primitive, or a function signature directly — an interface cannot
- Common rule of thumb: **interface** for public, extendable object shapes; **type** for unions and compositions — treat it as a default, not a law`,
  longExplanation: `\`interface\` and \`type\` alias spend most of their time doing the exact same job: giving a name to the shape of an object. \`interface Point { x: number; y: number }\` and \`type Point = { x: number; y: number }\` accept and reject exactly the same values, extend the same way in almost every practical case, and either one will happily serve as a function parameter type, a class's implemented shape, or a component's props type. For plain object shapes, choosing between them is mostly a style preference, not a functional one.

Where they genuinely differ:

- **Declaration merging.** An \`interface\` with a given name can be declared more than once in the same scope, and TypeScript automatically merges every declaration into one combined shape: two separate \`interface Window { title: string }\` and \`interface Window { onClose(): void }\` blocks produce a single \`Window\` interface with both members. A \`type\` alias cannot do this at all — declaring \`type Window = { ... }\` twice with the same name is a straightforward compile-time error, "duplicate identifier." This makes interfaces the right tool in situations where a shape genuinely needs to be extended from multiple, possibly separate, locations — the most common real-world example is augmenting a third-party library's types, or a global type like \`Window\`, without editing the original declaration.
- **Naming things beyond object shapes.** A \`type\` alias can name a union (\`type Status = "idle" | "loading";\`), an intersection, a primitive, a tuple, or a function signature directly, by itself, with no wrapping object involved. An \`interface\` fundamentally describes the shape of an object (or a callable), so it has no way to directly express "this is one of these three specific strings" the way a union type alias can.
- **Extending.** Both support building a more specific shape from a simpler one — an \`interface\` uses \`extends\`, a \`type\` uses an intersection (\`&\`). The next two topics look at each mechanism on its own; functionally, for combining plain object shapes, they tend to produce very similar end results, though error messages and edge-case behavior around conflicting members can differ subtly between the two.

**Practical guidance**, treated as a helpful default rather than a hard rule:

- Reach for \`interface\` when describing the shape of something meant to be public and potentially extended by other code — a component's props, a class's contract, a library's exported object shape. The ability to be re-opened later (by the same codebase, or by a consumer's declaration merging) is a genuine advantage for anything meant to be a stable, extensible public surface.
- Reach for \`type\` when the thing being described is a union, an intersection, a function signature, a primitive alias, or any composition of other types that isn't fundamentally "an object with these properties." Since unions and primitives are only expressible with \`type\`, this half of the guidance is less a preference and more a simple fact about what each tool can do.
- For a plain, non-extended object shape that will never need declaration merging, either works fine — many real style guides simply pick one as a team default (often \`interface\` for consistency with the object-shape convention above) and move on, rather than agonizing over each individual declaration.

Neither tool is "the old one" or "the new one" — both remain fully supported, actively used, and equally type-safe. The distinction is about which capabilities each provides, not about one being deprecated in favor of the other. Treating the guidance above as a strong default — and reaching for the other tool the moment its specific capability is actually needed — tends to serve most codebases well.`,
  examples: [
    {
      id: "same-job-object-shapes",
      title: "interface and type describing the same object shape",
      summary: "For a plain object shape, interface and type accept and reject exactly the same values.",
      code: `interface UserAsInterface {
  name: string;
  age: number;
}

type UserAsType = {
  name: string;
  age: number;
};

function describeInterfaceUser(user: UserAsInterface): string {
  return user.name + " (" + user.age + ")";
}

function describeTypeUser(user: UserAsType): string {
  return user.name + " (" + user.age + ")";
}

function App() {
  const ada = { name: "Ada Lovelace", age: 28 };

  return (
    <div style={{ display: "grid", gap: 6 }}>
      <p>{describeInterfaceUser(ada)}</p>
      <p>{describeTypeUser(ada)}</p>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        The same plain object satisfies both — for object shapes, interface and type are nearly interchangeable.
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "declaration-merging-interface-only",
      title: "Declaration merging: only interfaces can be reopened",
      summary: "Two separate \"interface Config\" blocks automatically merge into one combined shape.",
      code: `// First declaration — perhaps from a "core" part of the app.
interface Config {
  appName: string;
}

// A second, separate declaration with the SAME name — TypeScript merges them automatically.
interface Config {
  version: string;
}

// A type alias could NOT do this — "type Config = {...}" declared twice would be a duplicate-identifier error.

function App() {
  const config: Config = {
    appName: "React All Concept",
    version: "1.0.0",
  };

  return (
    <div style={{ display: "grid", gap: 6 }}>
      <p>{config.appName} v{config.version}</p>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        Config now requires BOTH "appName" and "version" — the two interface blocks were merged into one.
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "type-only-union",
      title: "Only a type alias can directly name a union",
      summary: "There is no interface equivalent for \"one of these specific string values.\"",
      code: `type Theme = "light" | "dark" | "system";

// There is no way to write this as an "interface Theme extends ..." — interfaces describe object
// shapes and callables, not a closed set of specific primitive values.

function describeTheme(theme: Theme): string {
  return "Using the \\"" + theme + "\\" theme";
}

function App() {
  const themes: Theme[] = ["light", "dark", "system"];

  return (
    <ul style={{ display: "grid", gap: 4 }}>
      {themes.map((theme) => (
        <li key={theme}>{describeTheme(theme)}</li>
      ))}
    </ul>
  );
}

render(<App />);`,
    },
    {
      id: "practical-rule-of-thumb",
      title: "Practical guidance applied together",
      summary: "An interface describes public component props; a type alias names the union it depends on.",
      code: `// Union of specific values — only expressible with "type".
type ButtonVariant = "primary" | "secondary" | "danger";

// Public, potentially-extendable shape — a natural fit for "interface".
interface ButtonInfo {
  label: string;
  variant: ButtonVariant;
}

function renderButtonLabel(info: ButtonInfo): string {
  return "[" + info.variant.toUpperCase() + "] " + info.label;
}

function App() {
  const buttons: ButtonInfo[] = [
    { label: "Save", variant: "primary" },
    { label: "Cancel", variant: "secondary" },
    { label: "Delete", variant: "danger" },
  ];

  return (
    <div style={{ display: "grid", gap: 6 }}>
      {buttons.map((info) => (
        <p key={info.label}>{renderButtonLabel(info)}</p>
      ))}
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        "type" names the closed set of variants; "interface" describes the extendable shape that uses it — a common, practical pairing.
      </p>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
