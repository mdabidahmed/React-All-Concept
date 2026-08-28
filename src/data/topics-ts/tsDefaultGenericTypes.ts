import type { Topic } from "../../types";

export const tsDefaultGenericTypesTopic: Topic = {
  id: "ts-default-generic-types",
  title: "TypeScript Default Generic Types",
  category: "Generics",
  shortExplanation: `A generic type parameter can be given a **default**, written \`<T = SomeType>\`, so the generic can be used *without* supplying a type argument whenever that default is good enough.

- \`interface ApiResponse<T = unknown> { data: T; status: number; }\` — \`ApiResponse\` alone (no \`<...>\`) is shorthand for \`ApiResponse<unknown>\`

- Supplying an explicit type argument still works exactly as before and simply overrides the default: \`ApiResponse<User>\`

- Defaults reduce boilerplate at the *common* call site, while keeping the *specific* call site just as precise as ever`,
  longExplanation: `Every generic seen so far — \`Box<T>\`, \`Pair<K, V>\`, \`Stack<T>\` — has required a type argument at every single point of use. That's fine when there's no reasonable "usual" choice, but plenty of real generics *do* have a sensible fallback that covers most call sites, with only occasional call sites needing something more specific. TypeScript lets a type parameter declare that fallback directly in its own definition, using \`=\`, the exact same way a function parameter gets a default value.

- **The syntax mirrors default function parameters:** \`interface ApiResponse<T = unknown> { data: T; status: number; error: string | null; }\`. The \`= unknown\` means that when \`ApiResponse\` is referenced with no type argument at all — just \`ApiResponse\`, no angle brackets — TypeScript treats it exactly as if \`ApiResponse<unknown>\` had been written. The default only kicks in when nothing is supplied; it never overrides an explicit type argument
- **The two usages coexist side by side.** \`const response: ApiResponse = fetchRaw();\` gets \`T\` as \`unknown\` for free — a reasonable choice when the payload's shape genuinely isn't known yet, or isn't needed at that call site. Meanwhile \`const userResponse: ApiResponse<User> = fetchUser();\` still works precisely as it always did, supplying \`User\` explicitly and getting a fully-typed \`data: User\` field. Neither usage is "more correct" — they're both valid, and the choice is just about how specific that particular call site needs to be
- **\`unknown\` is usually the right default for a genuinely unconstrained payload**, rather than \`any\`. Defaulting to \`any\` would silently switch off type checking on \`.data\` for every caller who forgets to specify a type argument — exactly the kind of unsafe fallback generics exist to avoid. Defaulting to \`unknown\` keeps the *absence* of a type argument just as safe as its presence: reading \`.data\` still requires narrowing it before doing anything type-specific with it
- **Defaults can also reference another type parameter declared earlier in the same list**, letting one type parameter's default depend on another. A generic pagination wrapper might look like \`interface Paginated<T, E = T> { items: T[]; lastError?: E; }\` — most callers never think about a separate error type and get \`E\` defaulting to whatever \`T\` already is, while a caller with a distinct error shape can still override just \`E\` if needed
- **Defaults apply to functions and classes too, not only interfaces** — \`function createStore<T = Record<string, unknown>>(initial?: T) { ... }\` lets \`createStore()\` be called with no type argument and no initial value at all, falling back to a generic object store, while \`createStore<Settings>({ theme: "dark" })\` stays fully specific when that's what's needed
- **A default doesn't remove the option to be explicit** — it only removes the *requirement*. This is the same relationship optional function parameters have with required ones: adding a default makes a previously-mandatory piece of information optional, without taking away anyone's ability to still provide it

Default generic types exist for the same reason default function parameter values do: they let the common, unremarkable case stay short, while the less common, more specific case stays exactly as expressive as it always was. Reaching for one makes sense whenever a generic type or function has one type parameter that's *usually* the same thing at most call sites — an \`unknown\` payload, an \`Error\` for a rejection type, a project's own default configuration shape — with only a minority of call sites needing to say otherwise.`,
  examples: [
    {
      id: "default-type-param-basic",
      title: "A default type parameter: ApiResponse<T = unknown>",
      summary: "ApiResponse with no type argument at all falls back to ApiResponse<unknown>.",
      code: `interface ApiResponse<T = unknown> {
  data: T;
  status: number;
}

function App() {
  // No type argument supplied — T defaults to "unknown".
  const raw: ApiResponse = { data: { anything: "goes" }, status: 200 };

  return (
    <div style={{ display: "grid", gap: 6 }}>
      <p>raw.status = {raw.status}</p>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        raw.data is "unknown" here — TypeScript won't let it be used as anything specific until it's narrowed.
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "default-vs-explicit-side-by-side",
      title: "With vs. without an explicit type argument",
      summary: "The same interface used both ways: the default covers the generic case, the explicit form stays precise.",
      code: `interface ApiResponse<T = unknown> {
  data: T;
  status: number;
}

interface User {
  id: number;
  name: string;
}

function App() {
  const generic: ApiResponse = { data: "anything at all", status: 200 };
  const typed: ApiResponse<User> = {
    data: { id: 1, name: "Ada Lovelace" },
    status: 200,
  };

  return (
    <div style={{ display: "grid", gap: 6 }}>
      <p>generic.status = {generic.status}</p>
      <p>typed.data.name = {typed.data.name}</p>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        "typed" can safely access .data.name because User was supplied explicitly, overriding the unknown default.
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "default-depending-on-earlier-param",
      title: "A default that references an earlier type parameter",
      summary: "Paginated<T, E = T> lets the error type default to whatever T already is.",
      code: `interface Paginated<T, E = T> {
  items: T[];
  lastError?: E;
}

function App() {
  // E defaults to T here, so lastError (if present) would also be a string.
  const words: Paginated<string> = { items: ["alpha", "beta", "gamma"] };

  // E is overridden here to a distinct error shape.
  const numbers: Paginated<number, string> = {
    items: [1, 2, 3],
    lastError: "timed out",
  };

  return (
    <div style={{ display: "grid", gap: 6 }}>
      <p>words.items = {words.items.join(", ")}</p>
      <p>numbers.items = {numbers.items.join(", ")}, lastError = {numbers.lastError}</p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "default-generic-function",
      title: "A default type parameter on a function",
      summary: "createStore() needs no type argument or initial value at all when the default fits.",
      code: `interface Settings {
  theme: string;
  fontSize: number;
}

function createStore<T = Record<string, unknown>>(initial?: T): T {
  return initial ?? ({} as T);
}

function App() {
  const generic = createStore();
  const settings = createStore<Settings>({ theme: "dark", fontSize: 16 });

  return (
    <div style={{ display: "grid", gap: 6 }}>
      <p>generic = {JSON.stringify(generic)}</p>
      <p>settings.theme = {settings.theme}, settings.fontSize = {settings.fontSize}</p>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
