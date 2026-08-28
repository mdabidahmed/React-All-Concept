import type { Topic } from "../../types";

export const tsGenericConstraintsTopic: Topic = {
  id: "ts-generic-constraints",
  title: "TypeScript Generic Constraints",
  category: "Generics",
  shortExplanation: `An \`extends\` constraint narrows what a generic type parameter is allowed to be, unlocking safe access to whatever the constraint guarantees.

- Constraining to a shape: \`function printName<T extends { name: string }>(item: T)\` accepts any object with at least a \`name\` property

- ==One of the most useful patterns in real TypeScript==: \`function getProp<T, K extends keyof T>(obj: T, key: K): T[K]\` — \`K\` is constrained to \`T\`'s actual keys, so both the key and the returned value stay fully type-safe

- Without this constraint, a "get any property" helper would need \`any\`, silently accepting typos that don't exist on the object at all`,
  longExplanation: `An unconstrained generic type parameter, plain \`<T>\`, can be absolutely anything — which also means TypeScript won't let the function body assume it has *any* particular property or behavior. A **constraint**, written with \`extends\`, narrows that down: \`<T extends SomeShape>\` tells the compiler "\`T\` can be any type, as long as it at least has this shape" — unlocking safe access to whatever the constraint guarantees, while still preserving genericity over everything else about \`T\`.

- **Constraining to an interface shape** is the most direct form: \`function printName<T extends Named>(item: T): string\`, where \`Named\` is \`{ name: string }\`, accepts *any* object with at least a \`name\` property — a \`User\`, a \`Product\`, a plain object literal — while still rejecting anything missing that property entirely. Extra properties beyond what the constraint requires are always fine; \`extends\` here means "has at least this shape," not "has exactly this shape"

- **The single most useful constraint pattern in everyday TypeScript combines a constraint with \`keyof\`:** \`function getProp<T, K extends keyof T>(obj: T, key: K): T[K] { return obj[key]; }\`. Here, \`keyof T\` produces a union of \`T\`'s actual property names as string-literal types, and constraining \`K\` to that union means the *second* type parameter's valid values are dictated by whatever the *first* one turns out to be — a genuine, tight relationship between two type parameters, rather than two independent ones. The return type \`T[K]\` — an "indexed access type" — then looks up exactly which property type corresponds to that specific key, so \`getProp(user, "name")\` returns a \`string\` and \`getProp(user, "active")\` returns a \`boolean\`, both correctly, from one single function definition

- **Compare this to the unsafe alternative:** a version written as \`function getProp(obj: any, key: string): any\` would compile for literally any inputs, including a typo'd key that doesn't exist on the object at all, silently returning \`undefined\` at runtime with no warning anywhere. The constrained generic version makes that exact mistake — passing a key that isn't really one of \`T\`'s properties — a compile-time error instead, and as a bonus, most editors will autocomplete the valid key names right at the call site, since TypeScript already knows the full \`keyof T\` union

- This \`<T, K extends keyof T>\` pattern is genuinely everywhere in real-world TypeScript: form libraries use it to type a single "get this field's value" or "set this field's value" helper across an entire form's shape, table and grid components use it to type a column's accessor function, and general-purpose utilities like lodash's \`get\`/\`set\`/\`pick\` are typed with exactly this pattern (or close relatives), so they stay both fully generic and fully type-safe at the same time

- Constraints can also combine a shape requirement with other type operators, or use multiple bounds via an intersection (\`T extends A & B\`) — but the shape-constraint and the \`keyof\`-constraint together cover the large majority of constraints seen in practice

The underlying idea worth internalizing is that a constraint is a trade: giving up a little bit of "\`T\` can be absolutely anything" flexibility in exchange for the compiler being able to guarantee — and therefore let the function body safely use — something specific about whatever \`T\` turns out to be at each call site.`,
  examples: [
    {
      id: "constrain-to-shape",
      title: "Constraining to an interface shape",
      summary: "T extends Named accepts any object with at least a name property.",
      code: `interface Named {
  name: string;
}

function printName<T extends Named>(item: T): string {
  return "Name: " + item.name;
}

function App() {
  const user = { name: "Ada Lovelace", age: 28 };
  const product = { name: "Keyboard", price: 49 };

  return (
    <div style={{ display: "grid", gap: 6 }}>
      <p>{printName(user)}</p>
      <p>{printName(product)}</p>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        Both objects have extra properties beyond "name" — that's fine, extends only requires at least a name.
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "getprop-keyof-constraint",
      title: "The keyof pattern: getProp<T, K extends keyof T>",
      summary: "K is constrained to T's real keys, so both the key and the return type are safe.",
      code: `function getProp<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

function App() {
  const user = { id: 1, name: "Ada Lovelace", active: true };

  const name = getProp(user, "name");
  const active = getProp(user, "active");

  return (
    <div style={{ display: "grid", gap: 6 }}>
      <p>getProp(user, "name") = {name}</p>
      <p>getProp(user, "active") = {String(active)}</p>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        Try getProp(user, "email") in the editor — TypeScript rejects it, since "email" isn't a real key of user.
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "setprop-keyof-constraint",
      title: "Writing safely too: setProp<T, K extends keyof T>",
      summary: "The value's type is tied to T[K] for that exact key, on both read and write.",
      code: `function setProp<T, K extends keyof T>(obj: T, key: K, value: T[K]): T {
  return { ...obj, [key]: value };
}

function App() {
  const settings = { theme: "light", fontSize: 14, notifications: true };

  const updated = setProp(settings, "theme", "dark");
  const resized = setProp(settings, "fontSize", 18);

  return (
    <div style={{ display: "grid", gap: 6 }}>
      <p>updated.theme = {updated.theme}</p>
      <p>resized.fontSize = {resized.fontSize}</p>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        setProp(settings, "theme", 5) would be rejected — the value's type must match T[K] for that specific key.
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "pluck-keyof-constraint",
      title: "A generic pluck helper built on the same pattern",
      summary: "pluck<T, K extends keyof T> stays type-safe across any array of objects.",
      code: `function pluck<T, K extends keyof T>(items: T[], key: K): T[K][] {
  return items.map((item) => item[key]);
}

function App() {
  const users = [
    { id: 1, name: "Ada" },
    { id: 2, name: "Grace" },
    { id: 3, name: "Alan" },
  ];

  const names = pluck(users, "name");
  const ids = pluck(users, "id");

  return (
    <div style={{ display: "grid", gap: 6 }}>
      <p>pluck(users, "name") = {names.join(", ")}</p>
      <p>pluck(users, "id") = {ids.join(", ")}</p>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
