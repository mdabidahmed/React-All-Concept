import type { Topic } from "../../types";

export const tsGenericInterfacesTopic: Topic = {
  id: "ts-generic-interfaces",
  title: "TypeScript Generic Interfaces",
  category: "Generics",
  shortExplanation: `A generic interface isn't limited to a single type parameter like \`Box<T>\` — it can take several at once, and it can describe the shape of a *function* just as easily as the shape of a plain object.

- \`interface Pair<K, V> { key: K; value: V; }\` models a shape with two independently-typed fields

- \`interface ApiResponse<T> { data: T; status: number; error: string | null; }\` is a common real-world pattern: wrap varying payload shapes in one consistent ==envelope==

- An interface can also describe a **callable shape** — a function signature — parameterized by a generic type`,
  longExplanation: `\`interface Box<T> { contents: T; }\` is the simplest possible generic interface — one type parameter, one property. Real interfaces usually need more than that: multiple independent type parameters, or a shape that describes a callable thing rather than a plain data bag.

- **Multiple type parameters work exactly like they do on functions.** \`interface Pair<K, V> { key: K; value: V; }\` takes two independent placeholders, filled in together when the interface is used: \`Pair<string, number>\` produces a shape with a \`string\` key and a \`number\` value. Each type parameter is completely independent of the others — nothing forces \`K\` and \`V\` to relate to each other unless a default (covered in a later topic) is used to link them

- **The \`ApiResponse<T>\` pattern is one of the most common uses of a generic interface in real applications.** An HTTP client or API layer typically wraps every response in the same consistent envelope — a status code, maybe an error message — but the actual payload varies by endpoint. \`interface ApiResponse<T> { data: T; status: number; error: string | null; }\` captures that once: \`ApiResponse<User>\` and \`ApiResponse<Product[]>\` share the same envelope shape while carrying completely different, fully-typed payloads

- **A generic interface can also describe a callable shape** — a function signature — instead of an object with named properties. Writing \`(a: T, b: T): number\` directly inside the interface body, with no property name in front of it, describes "something you can call with two arguments of type \`T\`, returning a \`number\`": \`interface Comparator<T> { (a: T, b: T): number; }\`. Any function matching that signature — including a plain arrow function — satisfies the interface, thanks to TypeScript's structural typing

- **A generic interface can also describe an object with a generic *method***, which is subtly different from a callable interface: \`interface Transformer<T, U> { transform(input: T): U; }\` describes an object with a named \`transform\` method, rather than being directly callable itself. This shape shows up constantly in real code as the type for pluggable strategies — validators, formatters, converters — where the concrete implementation varies but the shape stays fixed

- Just like generic functions, a generic interface's type parameters are usually supplied explicitly at the point of use (\`ApiResponse<User>\`, \`Pair<string, boolean>\`), since there's no argument for TypeScript to infer them from the way there is with a function call — the interface itself isn't "called," it's just referenced as a type

Generic interfaces are where a lot of an application's own domain modeling actually lives — once a codebase has a handful of these patterns (a response envelope, a paginated list wrapper, a form-field descriptor), most of the app's regular interfaces end up being non-generic instantiations of one of these, rather than one-off shapes written from scratch each time.`,
  examples: [
    {
      id: "generic-interface-pair",
      title: "A generic interface with two type parameters: Pair<K, V>",
      summary: "One shape, filled in with two independent, unrelated types.",
      code: `interface Pair<K, V> {
  key: K;
  value: V;
}

function App() {
  const idPair: Pair<string, number> = { key: "userId", value: 1024 };
  const flagPair: Pair<string, boolean> = { key: "isActive", value: true };

  return (
    <div style={{ display: "grid", gap: 6 }}>
      <p>{idPair.key} = {idPair.value}</p>
      <p>{flagPair.key} = {String(flagPair.value)}</p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "api-response-envelope",
      title: "A generic response envelope: ApiResponse<T>",
      summary: "The same wrapper shape carries completely different, fully-typed payloads.",
      code: `interface ApiResponse<T> {
  data: T;
  status: number;
  error: string | null;
}

interface User {
  id: number;
  name: string;
}

function App() {
  const userResponse: ApiResponse<User> = {
    data: { id: 1, name: "Ada Lovelace" },
    status: 200,
    error: null,
  };

  const listResponse: ApiResponse<string[]> = {
    data: ["apples", "bananas", "cherries"],
    status: 200,
    error: null,
  };

  return (
    <div style={{ display: "grid", gap: 6 }}>
      <p>User response: {userResponse.data.name} (status {userResponse.status})</p>
      <p>List response: {listResponse.data.join(", ")}</p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "callable-generic-interface",
      title: "A generic interface describing a callable shape",
      summary: "Comparator<T> describes any function callable with two Ts, returning a number.",
      code: `interface Comparator<T> {
  (a: T, b: T): number;
}

const byLength: Comparator<string> = (a, b) => a.length - b.length;
const byValue: Comparator<number> = (a, b) => a - b;

function App() {
  const words = ["banana", "fig", "cherry"].sort(byLength);
  const numbers = [40, 5, 22].sort(byValue);

  return (
    <div style={{ display: "grid", gap: 6 }}>
      <p>Sorted by length: {words.join(", ")}</p>
      <p>Sorted by value: {numbers.join(", ")}</p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "generic-method-interface",
      title: "A generic interface with a method: Transformer<T, U>",
      summary: "An object shape whose method converts one generic type into another.",
      code: `interface Transformer<T, U> {
  transform(input: T): U;
}

const toLength: Transformer<string, number> = {
  transform(input) {
    return input.length;
  },
};

const toGreeting: Transformer<string, string> = {
  transform(input) {
    return "Hello, " + input + "!";
  },
};

function App() {
  return (
    <div style={{ display: "grid", gap: 6 }}>
      <p>toLength.transform("TypeScript") = {toLength.transform("TypeScript")}</p>
      <p>toGreeting.transform("Ada") = {toGreeting.transform("Ada")}</p>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
