import type { Topic } from "../../types";

export const tsMappedTypesTopic: Topic = {
  id: "ts-mapped-types",
  title: "TypeScript Mapped Types",
  category: "Advanced Types",
  shortExplanation: `A **mapped type** builds a brand new type by transforming every property of an existing type, using the \`{ [K in keyof T]: ... }\` syntax — one line describes what happens to *all* of \`T\`'s properties at once.

- \`type OptionalTodo = { [K in keyof Todo]?: Todo[K] };\` makes every property of \`Todo\` optional

- \`type ReadonlyTodo = { readonly [K in keyof Todo]: Todo[K] };\` makes every property read-only

- ==This is literally what \`Partial<T>\` and \`Readonly<T>\` are built from under the hood== — they're just mapped types someone already wrote once and shared`,
  longExplanation: `Given an existing type like \`interface Todo { title: string; done: boolean; }\`, sometimes what's needed isn't \`Todo\` itself but a close variant of it — every property optional, every property read-only, every property's type changed to something else. Writing that variant out by hand (\`interface OptionalTodo { title?: string; done?: boolean; }\`) works for a small interface, but duplicates every property name, and silently falls out of sync the moment someone adds a new field to \`Todo\` without remembering to add it here too. A **mapped type** solves this by describing the *transformation* once, and letting TypeScript apply it to every property automatically — including any added later.

- **The syntax loops over every key of an existing type:** \`{ [K in keyof T]: T[K] }\`. \`keyof T\` produces a union of \`T\`'s property names as literal types (this is the exact same \`keyof\` seen in generic constraints); \`K in keyof T\` says "for each individual key in that union, do the following"; and \`T[K]\` looks up that specific property's original type. Written exactly like this, with no modifiers at all, the mapped type just reproduces \`T\` — it's the modifiers added around it that make it actually useful
- **Adding \`?\` makes every property optional:** \`type OptionalTodo = { [K in keyof Todo]?: Todo[K] };\` produces a type identical to \`Todo\`, except every property can now be omitted. This is precisely the shape needed for something like an "update" function that only touches the fields actually being changed, rather than requiring the full object every time
- **Adding \`readonly\` makes every property read-only:** \`type ReadonlyTodo = { readonly [K in keyof Todo]: Todo[K] };\` produces a version of \`Todo\` where every field can be read but never reassigned after the object is created — useful for values meant to be treated as immutable once constructed, like a config loaded once at startup
- **The mapped property's type doesn't have to just copy \`T[K]\` unchanged** — it can be transformed into something else entirely. \`type Stringified<T> = { [K in keyof T]: string };\` turns *every* property of any type into a \`string\`, regardless of what it originally was — handy for modeling something like a form's raw text-input state, where every field starts as a string before being parsed
- **Modifiers can also be *removed*, not just added, using \`-\`:** \`{ -readonly [K in keyof T]: T[K] }\` strips \`readonly\` off every property (this is what the built-in \`Mutable\`-style utility types some libraries define is built from), and \`{ [K in keyof T]-?: T[K] }\` strips \`?\` off every property, making everything required — the mirror image of adding \`?\`
- **This is exactly how \`Partial<T>\`, \`Required<T>\`, and \`Readonly<T>\` — covered as their own dedicated topic next — actually work under the hood.** They aren't special compiler magic; they're mapped types, written using precisely this syntax, that TypeScript ships as ready-made, pre-named conveniences so nobody has to write \`{ [K in keyof T]?: T[K] }\` by hand every time they want an all-optional variant of some type
- **Mapped types automatically stay in sync with the source type.** If a new field is added to \`Todo\`, every mapped type derived from it (\`OptionalTodo\`, \`ReadonlyTodo\`) picks up that new field automatically, with the same transformation applied — this is the core advantage over hand-writing each variant separately, and it's the main reason mapped types exist at all rather than just always writing out each shape by hand

The concept worth internalizing here is modest but powerful: a mapped type is a *for-loop over a type's keys*, expressed in a single line, that produces a whole new type as its output — every "all properties optional" or "all properties read-only" utility a codebase uses is ultimately just one specific instance of this one general idea.`,
  examples: [
    {
      id: "basic-mapped-type-copy",
      title: "The plain mapped-type identity: { [K in keyof T]: T[K] }",
      summary: "With no modifiers added, a mapped type simply reproduces the original type's shape.",
      code: `interface Todo {
  title: string;
  done: boolean;
}

type CopyOfTodo = { [K in keyof Todo]: Todo[K] };

function App() {
  const todo: CopyOfTodo = { title: "Learn mapped types", done: false };

  return (
    <div style={{ display: "grid", gap: 6 }}>
      <p>title: {todo.title}</p>
      <p>done: {String(todo.done)}</p>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        CopyOfTodo has exactly the same shape as Todo — the mapped type here adds no transformation.
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "optional-mapped-type",
      title: "Making every property optional: OptionalTodo",
      summary: "Adding ? in the mapped type lets every property of Todo be omitted.",
      code: `interface Todo {
  title: string;
  done: boolean;
  priority: number;
}

type OptionalTodo = { [K in keyof Todo]?: Todo[K] };

function updateTodo(base: Todo, changes: OptionalTodo): Todo {
  return { ...base, ...changes };
}

function App() {
  const original: Todo = { title: "Ship feature", done: false, priority: 1 };
  const updated = updateTodo(original, { done: true }); // only "done" is provided

  return (
    <div style={{ display: "grid", gap: 6 }}>
      <p>Original: {original.title}, done = {String(original.done)}</p>
      <p>Updated: {updated.title}, done = {String(updated.done)}</p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "readonly-mapped-type",
      title: "Making every property read-only: ReadonlyTodo",
      summary: "Adding readonly in the mapped type prevents any property from being reassigned after creation.",
      code: `interface Todo {
  title: string;
  done: boolean;
}

type ReadonlyTodo = { readonly [K in keyof Todo]: Todo[K] };

function App() {
  const frozen: ReadonlyTodo = { title: "Immutable todo", done: false };

  // frozen.done = true; // would be a compile-time error — every property is read-only

  return (
    <div style={{ display: "grid", gap: 6 }}>
      <p>title: {frozen.title}</p>
      <p>done: {String(frozen.done)}</p>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        Try uncommenting "frozen.done = true" in the editor — TypeScript rejects it immediately.
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "transforming-property-types",
      title: "Transforming every property's type: Stringified<T>",
      summary: "A mapped type doesn't have to copy T[K] unchanged — it can convert every property to something else.",
      code: `interface Todo {
  title: string;
  done: boolean;
  priority: number;
}

type Stringified<T> = { [K in keyof T]: string };

function App() {
  // Every field is a string here — a natural shape for raw form-input state.
  const formValues: Stringified<Todo> = {
    title: "Learn mapped types",
    done: "false",
    priority: "1",
  };

  return (
    <div style={{ display: "grid", gap: 6 }}>
      <p>title: "{formValues.title}"</p>
      <p>done: "{formValues.done}"</p>
      <p>priority: "{formValues.priority}"</p>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
