import type { Topic } from "../../types";

export const tsGenericFunctionsTopic: Topic = {
  id: "ts-generic-functions",
  title: "TypeScript Generic Functions",
  category: "Generics",
  shortExplanation: `Generic **functions** aren't limited to a single placeholder type — a function can introduce several type parameters at once, each inferred independently from whatever arguments are actually passed.

- \`function pair<K, V>(key: K, value: V)\` infers \`K\` and \`V\` separately, one per argument

- Arrow functions can be generic too: \`const identity = <T,>(value: T): T => value;\` — the trailing comma matters in \`.tsx\` files, so \`<T>\` isn't mistaken for a JSX tag

- TypeScript can infer a type parameter from *inside* an array argument: \`function firstOf<T>(arr: T[]): T\` figures out \`T\` from the array's element type, with no type argument written anywhere`,
  longExplanation: `A generic function is not restricted to a single \`<T>\` — its angle-bracket list can hold as many type parameters as the function needs, separated by commas: \`function pair<K, V>(key: K, value: V): [K, V] { return [key, value]; }\`. Calling \`pair("id", 42)\` infers \`K\` as \`string\` and \`V\` as \`number\` in the same call, entirely independently — TypeScript matches each type parameter to its corresponding argument position. This scales to three, four, or more parameters, though in practice most real-world generic functions stop at one or two before readability suffers.

- **Order matters positionally, not semantically.** \`pair<K, V>(key: K, value: V)\` behaves correctly as long as each parameter is used consistently in the body — the names \`K\` and \`V\` are just labels. What matters is which parameter each argument's type gets bound to

- **Arrow functions can be generic too**, but with a syntax wrinkle: in a plain \`.ts\` file, \`const identity = <T>(value: T): T => value;\` works fine, but in a \`.tsx\` file (like every example on this page), the parser sees \`<T>\` at the start of an expression and tries to read it as the opening of a JSX element. The fix is a trailing comma inside the brackets: \`<T,>(value: T): T => value\`. The comma has no effect on the type — it exists purely to tell the parser "this is a generic parameter list, not JSX"

- **Inference reaches inside array arguments.** \`function firstOf<T>(arr: T[]): T { return arr[0]; }\` never says what \`T\` is directly — instead, TypeScript looks at the *element type* of whatever array is passed in. Calling \`firstOf([1, 2, 3])\` infers \`T\` as \`number\` by looking through the array wrapper; calling \`firstOf(["a", "b"])\` infers \`T\` as \`string\`. This is the same inference engine that powers array methods like \`.map\`, \`.filter\`, and \`.reduce\` behind the scenes — none of those need an explicit type argument either, because TypeScript reconstructs \`T\` from the array they're called on

- **Inference can fail when there's nothing to look at.** An empty array literal, \`[]\`, carries no element to infer a type from, so calling a generic function with \`[]\` alone gives TypeScript nothing to work with. This is exactly when an **explicit type argument** earns its keep: \`firstOf<number>([])\` tells TypeScript directly what \`T\` should be, sidestepping the guesswork entirely

- **Multiple parameters and array inference combine naturally.** A function like \`function zip<A, B>(as: A[], bs: B[]): [A, B][]\` infers both \`A\` and \`B\` from two separate array arguments in a single call, with no annotations needed anywhere at the call site

The practical takeaway is that most of the time, a generic function's type parameters are invisible at the call site — you write \`identity(5)\` or \`firstOf(names)\` exactly as you would for an untyped function, and TypeScript quietly fills in the type parameters behind the scenes by watching the shapes of the arguments actually passed. Explicit type arguments (\`identity<number>(5)\`) exist as an escape hatch for the minority of cases — usually an empty collection, or a call where the desired type is deliberately broader than what inference alone would guess — where the compiler doesn't have enough information to work it out on its own.`,
  examples: [
    {
      id: "pair-multiple-type-parameters",
      title: "Multiple type parameters at once: pair<K, V>",
      summary: "K and V are inferred separately, one per argument, in the same call.",
      code: `function pair<K, V>(key: K, value: V): [K, V] {
  return [key, value];
}

function App() {
  const a = pair("id", 42);
  const b = pair("active", true);

  return (
    <div style={{ display: "grid", gap: 6 }}>
      <p>pair("id", 42) = [{a[0]}, {String(a[1])}]</p>
      <p>pair("active", true) = [{b[0]}, {String(b[1])}]</p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "generic-arrow-functions",
      title: "Generic arrow functions",
      summary: "Arrow functions can be generic too — note the trailing comma needed in .tsx files.",
      code: `const identity = <T,>(value: T): T => value;

const wrapInArray = <T,>(value: T): T[] => [value];

function App() {
  const num = identity(7);
  const wrapped = wrapInArray("hello");

  return (
    <div style={{ display: "grid", gap: 6 }}>
      <p>identity(7) = {num}</p>
      <p>wrapInArray("hello") = [{wrapped.join(", ")}]</p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "infer-from-array-argument",
      title: "Inferring T from an array argument",
      summary: "firstOf<T>(arr: T[]) figures out T by looking at the array's element type.",
      code: `function firstOf<T>(arr: T[]): T | undefined {
  return arr[0];
}

function App() {
  const firstNumber = firstOf([10, 20, 30]);
  const firstWord = firstOf(["alpha", "beta", "gamma"]);

  return (
    <div style={{ display: "grid", gap: 6 }}>
      <p>firstOf([10, 20, 30]) = {firstNumber}</p>
      <p>firstOf(["alpha", "beta", "gamma"]) = {firstWord}</p>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        No type argument was written anywhere — TypeScript inferred T from each array's element type.
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "multiple-params-with-arrays",
      title: "Combining multiple type parameters with array inference",
      summary: "zip<A, B> infers both type parameters from two array arguments in one call.",
      code: `function zip<A, B>(as: A[], bs: B[]): [A, B][] {
  const length = Math.min(as.length, bs.length);
  const result: [A, B][] = [];
  for (let i = 0; i < length; i++) {
    result.push([as[i], bs[i]]);
  }
  return result;
}

function App() {
  const names = ["Ada", "Grace", "Alan"];
  const scores = [95, 88, 91];
  const zipped = zip(names, scores);

  return (
    <div style={{ display: "grid", gap: 6 }}>
      {zipped.map((entry) => (
        <p key={entry[0]}>{entry[0]}: {entry[1]}</p>
      ))}
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "explicit-type-arguments",
      title: "When inference needs help: explicit type arguments",
      summary: "An empty array gives TypeScript nothing to infer from, so T must be supplied explicitly.",
      code: `function firstOf<T>(arr: T[]): T | undefined {
  return arr[0];
}

function App() {
  const empty = firstOf<number>([]);
  const explicitMixed = firstOf<string | number>(["mixed", 5]);

  return (
    <div style={{ display: "grid", gap: 6 }}>
      <p>firstOf&lt;number&gt;([]) = {String(empty)}</p>
      <p>firstOf&lt;string | number&gt;(["mixed", 5]) = {String(explicitMixed)}</p>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        An empty array gives TypeScript nothing to infer from, so T must be supplied explicitly here.
      </p>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
