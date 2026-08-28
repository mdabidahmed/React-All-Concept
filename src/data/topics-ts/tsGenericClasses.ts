import type { Topic } from "../../types";

export const tsGenericClassesTopic: Topic = {
  id: "ts-generic-classes",
  title: "TypeScript Generic Classes",
  category: "Generics",
  shortExplanation: `Generic **classes** go beyond a single-parameter \`Stack<T>\` — a class can take multiple type parameters, implement a generic interface, or wrap a built-in structure like \`Map\` behind a small, typed API.

- \`class KeyValuePair<K, V> { constructor(public key: K, public value: V) {} }\` takes two type parameters, inferred straight from the constructor arguments

- \`class ListContainer<T> implements Container<T>\` carries the same \`T\` through both the interface and the class implementing it

- A typed \`Cache<K, V>\` class wrapping a \`Map\` is a genuinely common, practical use of generic classes in real code`,
  longExplanation: `A generic class parameterizes over one or more types the same way a generic interface does, but because a class also has behavior (methods) and internal state (fields), a few extra rules and patterns come into play once more than one type parameter — or an implemented interface — is involved.

- **Multiple type parameters on a class work identically to functions and interfaces:** \`class KeyValuePair<K, V> { constructor(public key: K, public value: V) {} }\` takes both types when instantiated — \`new KeyValuePair("theme", "dark")\` infers \`K\` and \`V\` from the constructor arguments, exactly the way a generic function infers its type parameters from its regular arguments. This constructor-argument inference means \`new\` rarely needs an explicit \`<K, V>\` written out by hand

- **A generic class can implement a generic interface**, carrying the same type parameter through both: \`class ListContainer<T> implements Container<T> { ... }\` promises that whatever \`T\` the class is instantiated with, it fully satisfies \`Container<T>\`'s shape for that same \`T\`. This is how a codebase separates *what* something needs to do (the interface) from *how* one particular implementation does it (the class) — while both stay generic together, rather than the interface locking in a concrete type

- **A practical, very common shape is a typed cache**: \`class Cache<K, V> { private store = new Map<K, V>(); set(key: K, value: V): void { ... } get(key: K): V | undefined { ... } }\`. Wrapping a plain \`Map\` in a small class like this adds a type-safe, purpose-built API (\`.get\`, \`.set\`, \`.has\`) on top of a general-purpose built-in, and is a pattern that scales directly into real memoization, request-deduplication, and in-memory lookup utilities

- **A real gotcha worth knowing: static members cannot use the class's own type parameter.** A class's type parameters only exist once the class is *instantiated* with a concrete type — but static members belong to the class itself, not to any particular instance, so there's no concrete type to substitute in at that point. Writing a static factory method that returns \`T\` inside \`class Box<T>\` is a compile error for exactly this reason; a static method has to either be non-generic or introduce its *own* separate type parameter

- Generic classes are how most typed data structures are actually built in real TypeScript code — queues, linked lists, trees, and caches are all naturally generic, since the structural logic (how items move through the structure) is identical no matter what type of item is being stored

The overall shape to recognize is that a generic class is really "a generic interface plus an implementation" — the type parameter list on the class header plays the same role it does on an interface, while the constructor and methods are where the actual generic-aware logic (and inference from arguments) happens.`,
  examples: [
    {
      id: "generic-class-multiple-params",
      title: "A generic class with two type parameters: KeyValuePair<K, V>",
      summary: "Both type parameters are inferred straight from the constructor arguments.",
      code: `class KeyValuePair<K, V> {
  constructor(public key: K, public value: V) {}

  describe(): string {
    return String(this.key) + " -> " + String(this.value);
  }
}

function App() {
  const entry1 = new KeyValuePair("theme", "dark");
  const entry2 = new KeyValuePair(1, true);

  return (
    <div style={{ display: "grid", gap: 6 }}>
      <p>{entry1.describe()}</p>
      <p>{entry2.describe()}</p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "generic-class-implements-interface",
      title: "A generic class implementing a generic interface",
      summary: "ListContainer<T> carries the same T through both the interface and the class.",
      code: `interface Container<T> {
  add(item: T): void;
  getAll(): T[];
}

class ListContainer<T> implements Container<T> {
  private items: T[] = [];

  add(item: T): void {
    this.items.push(item);
  }

  getAll(): T[] {
    return this.items;
  }
}

function App() {
  const numbers = new ListContainer<number>();
  numbers.add(1);
  numbers.add(2);
  numbers.add(3);

  const names = new ListContainer<string>();
  names.add("Ada");
  names.add("Grace");

  return (
    <div style={{ display: "grid", gap: 6 }}>
      <p>Numbers: {numbers.getAll().join(", ")}</p>
      <p>Names: {names.getAll().join(", ")}</p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "typed-cache-class",
      title: "A practical typed key-value cache: Cache<K, V>",
      summary: "A small, type-safe API wrapped around a plain Map.",
      code: `class Cache<K, V> {
  private store = new Map<K, V>();

  set(key: K, value: V): void {
    this.store.set(key, value);
  }

  get(key: K): V | undefined {
    return this.store.get(key);
  }

  has(key: K): boolean {
    return this.store.has(key);
  }
}

function App() {
  const userCache = new Cache<number, string>();
  userCache.set(1, "Ada Lovelace");
  userCache.set(2, "Grace Hopper");

  return (
    <div style={{ display: "grid", gap: 6 }}>
      <p>userCache.get(1) = {userCache.get(1)}</p>
      <p>userCache.get(2) = {userCache.get(2)}</p>
      <p>userCache.has(3) = {String(userCache.has(3))}</p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "generic-class-constructor-inference",
      title: "Inferring a class's type parameter from the constructor",
      summary: "new Wrapper(99) infers T as number with no <T> written anywhere.",
      code: `class Wrapper<T> {
  constructor(public value: T) {}

  unwrap(): T {
    return this.value;
  }
}

function App() {
  const numberWrapper = new Wrapper(99);
  const stringWrapper = new Wrapper("packed");

  return (
    <div style={{ display: "grid", gap: 6 }}>
      <p>numberWrapper.unwrap() = {numberWrapper.unwrap()}</p>
      <p>stringWrapper.unwrap() = {stringWrapper.unwrap()}</p>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        No "&lt;T&gt;" was written at either "new" call — TypeScript infers it from the constructor argument.
      </p>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
