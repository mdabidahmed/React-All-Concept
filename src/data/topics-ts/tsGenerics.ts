import type { Topic } from "../../types";

export const tsGenericsTopic: Topic = {
  id: "ts-generics",
  title: "TypeScript Generics",
  category: "Generics",
  shortExplanation: `A **generic** is a type that's decided later, at the moment a function, interface, or class is actually *used* — written as \`<T>\`, a placeholder standing in for "whatever type gets passed in."

- \`function identity<T>(value: T): T { return value; }\` works for any type, while keeping full type safety
- Without generics, you'd either lose type information (using \`any\`) or duplicate the same function for every type
- \`T\` is just a convention — it can be named anything, though \`T\`, \`K\`, \`V\` are common short names`,
  longExplanation: `Some logic is genuinely the same regardless of what type of data it's operating on — a function that returns the first item of an array works identically whether the array holds numbers, strings, or objects. Writing that function with a single concrete type (say, \`number[]\`) would force writing near-duplicate versions for every other type; writing it with \`any\` would work for every type but throw away all type safety, since TypeScript would no longer know or check what came back. **Generics** solve exactly this: they let a function, interface, or class stay written *once*, while still being fully type-checked for whichever specific type is used *at the call site*.

- The syntax introduces a placeholder type in angle brackets right after the function name: \`function identity<T>(value: T): T { return value; }\`. Calling \`identity(5)\` makes TypeScript infer \`T\` as \`number\` for that call, and calling \`identity("hi")\` infers \`T\` as \`string\` — the same function body handles both, and the return type is correctly known each time
- Generics apply to more than functions — a generic **interface** like \`interface Box<T> { contents: T; }\` can hold a \`Box<string>\` or a \`Box<number>\`, and a generic **class** works the same way, parameterizing over whatever type it's built to hold (a classic example: a \`Stack<T>\` that works identically for a stack of numbers or a stack of strings)
- TypeScript can usually **infer** the generic type from the argument you pass, so you rarely need to write it explicitly — but you *can* be explicit when needed: \`identity<string>("hi")\`
- **Generic constraints** narrow what a generic type parameter is allowed to be, using \`extends\`: \`function getLength<T extends { length: number }>(item: T): number { return item.length; }\` — this accepts strings, arrays, or any object with a \`.length\` property, while still rejecting a plain number, since a number has no \`.length\`
- Generics show up constantly in everyday TypeScript even before you write your own — \`Array<T>\` (the type behind \`T[]\`), \`Promise<T>\` (a promise resolving to a value of type \`T\`), and React's own typed hooks (\`useState<T>\`) are all generics doing exactly this job under the hood

The letter \`T\` (for "Type") is just a naming convention, not a keyword — you could call it anything, but \`T\`, \`K\` (for a key), and \`V\` (for a value) are common short, conventional names, especially when multiple type parameters are needed at once (\`Map<K, V>\`, for instance).`,
  examples: [
    {
      id: "generic-identity-function",
      title: "A generic identity function",
      summary: "The same function body works for any type, while TypeScript still tracks the exact type each time.",
      code: `function identity<T>(value: T): T {
  return value;
}

function App() {
  const num = identity(42);
  const str = identity("hello");
  const arr = identity([1, 2, 3]);

  return (
    <div style={{ display: "grid", gap: 6 }}>
      <p>identity(42) = {num}</p>
      <p>identity("hello") = {str}</p>
      <p>identity([1, 2, 3]) = {arr.join(", ")}</p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "generic-interface-box",
      title: "A generic interface: Box<T>",
      summary: "The same Box shape holds different content types, each fully type-checked.",
      code: `interface Box<T> {
  contents: T;
}

function App() {
  const numberBox: Box<number> = { contents: 100 };
  const stringBox: Box<string> = { contents: "treasure" };

  return (
    <div style={{ display: "grid", gap: 6 }}>
      <p>Number box: {numberBox.contents}</p>
      <p>String box: {stringBox.contents}</p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "generic-constraint",
      title: "Constraining a generic with extends",
      summary: "T extends { length: number } accepts strings and arrays, but would reject a plain number.",
      code: `function getLength<T extends { length: number }>(item: T): number {
  return item.length;
}

function App() {
  const wordLength = getLength("TypeScript");
  const listLength = getLength([1, 2, 3, 4]);

  return (
    <div style={{ display: "grid", gap: 6 }}>
      <p>getLength("TypeScript") = {wordLength}</p>
      <p>getLength([1, 2, 3, 4]) = {listLength}</p>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        Try getLength(42) in the editor — TypeScript rejects it, since a plain number has no .length.
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "generic-class-stack",
      title: "A generic class: Stack<T>",
      summary: "One Stack implementation, reused for a stack of numbers and a stack of strings.",
      code: `class Stack<T> {
  private items: T[] = [];

  push(item: T): void {
    this.items.push(item);
  }

  pop(): T | undefined {
    return this.items.pop();
  }

  peek(): T | undefined {
    return this.items[this.items.length - 1];
  }
}

function App() {
  const numbers = new Stack<number>();
  numbers.push(1);
  numbers.push(2);
  numbers.push(3);

  const words = new Stack<string>();
  words.push("first");
  words.push("second");

  return (
    <div style={{ display: "grid", gap: 6 }}>
      <p>Top of number stack: {numbers.peek()}</p>
      <p>Top of word stack: {words.peek()}</p>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
