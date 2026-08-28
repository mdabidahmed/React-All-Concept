import type { Topic } from "../../types";

export const tsUtilityTypesTopic: Topic = {
  id: "ts-utility-types",
  title: "TypeScript Utility Types",
  category: "Advanced Types",
  shortExplanation: `TypeScript ships a set of built-in **utility types** — ready-made mapped types for extremely common transformations — so nobody has to hand-write them for every project.

- \`Partial<T>\` (every property optional), \`Required<T>\` (every property mandatory), \`Readonly<T>\` (every property read-only)

- \`Pick<T, K>\` (keep only some properties), \`Omit<T, K>\` (drop some properties)

- \`Record<K, V>\` builds an object type mapping every key in \`K\` to a value of type \`V\` — useful for lookup tables and dictionaries`,
  longExplanation: `The previous topic showed that a mapped type like \`{ [K in keyof T]?: T[K] }\` can be written by hand for any transformation needed. In practice, a handful of these transformations come up so often — across nearly every real codebase — that TypeScript ships them as **built-in utility types**, pre-written and globally available with no import needed. Reaching for one of these is almost always preferable to re-deriving the same mapped type from scratch.

- **\`Partial<T>\`** makes every property of \`T\` optional. The classic use case is an "update" or "patch" function: \`function updateUser(id: number, changes: Partial<User>): void\` lets a caller pass just the one or two fields actually changing (\`updateUser(1, { name: "New Name" })\`), rather than being forced to supply a complete \`User\` object every time only a single field is different
- **\`Required<T>\`** does the opposite — it strips away optionality, making every property mandatory, even ones that were originally declared with \`?\`. A realistic use: a form's input state might reasonably start as \`Partial<Settings>\` while the user is still filling it in, but before submitting to the server, a validation step can assert the fully-filled-in result as \`Required<Settings>\`, guaranteeing every field is now present
- **\`Readonly<T>\`** makes every property read-only, preventing reassignment after the object is created. A common use is protecting a piece of configuration or initial state from being accidentally mutated later: \`const defaultConfig: Readonly<Config> = { theme: "dark", locale: "en" };\` — any later attempt to write \`defaultConfig.theme = "light"\` is a compile-time error
- **\`Pick<T, K>\`** builds a new type containing *only* the properties named in \`K\` (a union of the property names as string literals). Given a full \`User\` interface with many fields, \`Pick<User, "id" | "name">\` produces a lean type with just those two — useful for a component or function that only needs a small slice of a much larger shape, without being forced to accept (or fake) the rest
- **\`Omit<T, K>\`** is \`Pick\`'s mirror image: it builds a new type containing *every* property of \`T\` *except* the ones named in \`K\`. A common real use is describing "the data needed to create a new record," where the full record type includes a server-assigned \`id\` that doesn't exist yet at creation time: \`type NewUser = Omit<User, "id">\` — everything from \`User\` except \`id\`
- **\`Record<K, V>\`** builds an object type where every key from \`K\` maps to a value of type \`V\` — the type-level equivalent of "a dictionary" or "a lookup table." \`Record<string, number>\` is a general string-keyed lookup of numbers; more usefully, \`Record<"admin" | "editor" | "viewer", string>\` builds an object that's required to have *exactly* those three keys, each mapping to a \`string\` — genuinely useful for things like a fixed set of role-to-label mappings, where both the keys and the value type are known in advance
- **All of these compose with each other and with custom types freely.** \`Partial<Pick<User, "name" | "email">>\` — an optional slice of just two fields — is a perfectly normal, valid thing to write, and this kind of composition is common in real prop types and API-layer types
- **They're all just mapped types under the hood**, exactly as covered in the previous topic — \`Partial<T>\` really is defined internally as (roughly) \`type Partial<T> = { [K in keyof T]?: T[K] }\`. Knowing this makes the utility types feel far less like arbitrary magic and far more like "the same tool already covered, pre-packaged and named for convenience"

The practical guidance is simple: before hand-writing a variant of an existing type — a version with everything optional, a subset of fields, everything except one field — check whether \`Partial\`, \`Required\`, \`Readonly\`, \`Pick\`, \`Omit\`, or \`Record\` already expresses exactly that transformation, since one of these five almost always does, and reaching for the built-in keeps intent immediately obvious to anyone else reading the code.`,
  examples: [
    {
      id: "partial-update-function",
      title: "Partial<T> for an update/patch function",
      summary: "Callers only need to supply the fields that are actually changing.",
      code: `interface User {
  id: number;
  name: string;
  email: string;
}

function updateUser(user: User, changes: Partial<User>): User {
  return { ...user, ...changes };
}

function App() {
  const original: User = { id: 1, name: "Ada Lovelace", email: "ada@example.com" };
  const updated = updateUser(original, { name: "Ada Byron" }); // only "name" supplied

  return (
    <div style={{ display: "grid", gap: 6 }}>
      <p>Original name: {original.name}</p>
      <p>Updated name: {updated.name}</p>
      <p>Email unchanged: {updated.email}</p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "required-and-readonly",
      title: "Required<T> and Readonly<T>",
      summary: "Required strips away optionality; Readonly locks every property after creation.",
      code: `interface Settings {
  theme?: string;
  locale?: string;
}

function App() {
  // Partial-like draft while the user is still filling the form in:
  const draft: Settings = { theme: "dark" };

  // After validating, every field is guaranteed present:
  const finalized: Required<Settings> = { theme: "dark", locale: "en" };

  // A frozen default that should never be mutated later:
  const defaults: Readonly<Settings> = { theme: "light", locale: "en" };
  // defaults.theme = "dark"; // would be a compile-time error

  return (
    <div style={{ display: "grid", gap: 6 }}>
      <p>draft.theme = {draft.theme}</p>
      <p>finalized = {finalized.theme}, {finalized.locale}</p>
      <p>defaults = {defaults.theme}, {defaults.locale}</p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "pick-and-omit",
      title: "Pick<T, K> and Omit<T, K>",
      summary: "Pick keeps only named fields; Omit keeps everything except the named fields.",
      code: `interface User {
  id: number;
  name: string;
  email: string;
  passwordHash: string;
}

type UserSummary = Pick<User, "id" | "name">;
type NewUser = Omit<User, "id">;

function App() {
  const summary: UserSummary = { id: 1, name: "Grace Hopper" };
  const newUser: NewUser = {
    name: "Alan Turing",
    email: "alan@example.com",
    passwordHash: "hashed-value",
  };

  return (
    <div style={{ display: "grid", gap: 6 }}>
      <p>Summary: #{summary.id} {summary.name}</p>
      <p>New user (no id yet): {newUser.name}, {newUser.email}</p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "record-lookup-table",
      title: "Record<K, V> for a fixed lookup table",
      summary: "Record<Role, string> requires exactly the given keys, each mapped to a string label.",
      code: `type Role = "admin" | "editor" | "viewer";

const roleLabels: Record<Role, string> = {
  admin: "Administrator",
  editor: "Content Editor",
  viewer: "Read-only Viewer",
};

function App() {
  const roles: Role[] = ["admin", "editor", "viewer"];

  return (
    <div style={{ display: "grid", gap: 6 }}>
      {roles.map((role) => (
        <p key={role}>{role} -&gt; {roleLabels[role]}</p>
      ))}
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        Record&lt;Role, string&gt; requires exactly these three keys — omitting one would be a compile-time error.
      </p>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
