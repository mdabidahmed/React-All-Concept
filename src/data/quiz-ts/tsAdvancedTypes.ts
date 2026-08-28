import type { QuizQuestion } from "../../types/quiz";

export const tsAdvancedTypesQuestions: QuizQuestion[] = [
  {
    id: "ts-advanced-types-1",
    question:
      "What makes a 'literal type' different from the general type string, as in: let direction: 'up' | 'down';?",
    type: "single",
    options: [
      "A literal type narrows the allowed values down to one exact value, or a specific set of exact values, rather than any value of that general type, so direction can only ever be 'up' or 'down'",
      "A literal type behaves exactly like the general string type and adds no restriction of its own",
      "A literal type only applies to numbers, never to strings",
      "A literal type is a runtime check that TypeScript inserts to validate string values while the program executes",
    ],
    correctIndexes: [0],
    explanation:
      "A literal type like 'up' pins the type down to that exact value; combining several with a union, such as 'up' | 'down', restricts a variable to only those specific values instead of any string whatsoever.",
  },
  {
    id: "ts-advanced-types-2",
    question:
      "Given let direction: 'up' | 'down' = 'up'; direction = 'left'; what happens?",
    type: "single",
    options: [
      "It fails to compile, because 'left' is not one of the exact literal values allowed by the 'up' | 'down' union",
      "It compiles and runs fine, since 'left' is still a string value",
      "It compiles, but direction becomes undefined once the reassignment runs",
      "It only fails to compile when strict mode is enabled; otherwise it's allowed",
    ],
    correctIndexes: [0],
    explanation:
      "Once direction is typed as the literal union 'up' | 'down', TypeScript rejects any assignment that isn't one of those two exact strings, catching the typo-like mistake of 'left' before the code ever runs.",
  },
  {
    id: "ts-advanced-types-3",
    question:
      "Consider: enum Status { Pending, Active, Done }. Which statements about this numeric enum are true?",
    type: "multi",
    options: [
      "Status.Pending is 0, Status.Active is 1, and Status.Done is 2, because numeric enum members auto-increment starting from 0 by default",
      "If you instead write enum Status { Pending = 5, Active, Done }, Active becomes 6 and Done becomes 7, continuing to auto-increment from the explicit starting value",
      "Numeric enum members must always be given an explicit value; TypeScript never fills one in automatically",
      "Every member of a numeric enum must have a unique, manually specified string name that also matches its runtime numeric value",
    ],
    correctIndexes: [0, 1],
    explanation:
      "Numeric enums auto-increment by 1 from the previous member, defaulting to 0 for the first member when nothing is specified, and continuing from wherever an explicit value was set, such as 5, 6, 7.",
  },
  {
    id: "ts-advanced-types-4",
    question:
      "Given enum Direction { Up = 'UP', Down = 'DOWN' }, what is Direction.Up at runtime, and how does this differ from a numeric enum?",
    type: "single",
    options: [
      "It is the string 'UP'; unlike numeric enums, string enum members never auto-increment, so every member must be given its own explicit string value",
      "It is 0, following the same auto-incrementing behavior as a numeric enum",
      "It is the string 'Up', matching the member's declared name exactly",
      "It is undefined until something explicitly initializes the enum at runtime",
    ],
    correctIndexes: [0],
    explanation:
      "String enums have no auto-increment behavior at all, so each member's value must be written out explicitly; Direction.Up evaluates to exactly the string that was assigned to it, 'UP'.",
  },
  {
    id: "ts-advanced-types-5",
    question:
      "Why might a codebase prefer a union of string literals, like type Direction = 'up' | 'down';, over an enum for the same set of values?",
    type: "single",
    options: [
      "A string literal union exists purely at compile time with no extra runtime object emitted, and its values are just plain strings, which tends to be simpler and plays more naturally with plain string data such as JSON",
      "String literal unions support auto-incrementing numeric values, while enums do not",
      "Enums are not allowed to hold string values, only literal unions can",
      "Only string literal unions can be exported from a module; enums cannot be exported",
    ],
    correctIndexes: [0],
    explanation:
      "Enums compile down to an actual runtime object, while a literal union like 'up' | 'down' disappears entirely after compilation, leaving plain strings that compare naturally with, say, values coming from an API or JSON payload.",
  },
  {
    id: "ts-advanced-types-6",
    question:
      "What is the key idea behind a 'discriminated union', such as: type Shape = { kind: 'circle'; radius: number } | { kind: 'square'; side: number };?",
    type: "single",
    options: [
      "Each member of the union shares a common property (here, kind) typed as a distinct literal value, which TypeScript can check to narrow the union down to the exact matching member",
      "It's a union where every member is required to have exactly the same set of properties",
      "It's a special keyword, 'discriminated', that must appear before the type definition",
      "It means the union can only be made up of primitive types, never object types",
    ],
    correctIndexes: [0],
    explanation:
      "The shared literal-typed 'tag' property, such as kind, is what lets TypeScript's control flow analysis figure out exactly which member of the union you're dealing with once that property has been checked.",
  },
  {
    id: "ts-advanced-types-7",
    question:
      "Using the Shape union (a 'circle' member with radius, and a 'square' member with side), what does this function do? function area(s: Shape) { if (s.kind === 'circle') { return Math.PI * s.radius ** 2; } return s.side ** 2; }",
    type: "single",
    options: [
      "Inside the if block, TypeScript narrows s to the 'circle' member, making s.radius accessible; after the if, it narrows s to the remaining 'square' member, making s.side accessible",
      "It fails to compile, because s.radius and s.side aren't defined on the general Shape type",
      "It compiles, but s.radius and s.side are both typed as any inside the function",
      "It only compiles if radius and side are declared as optional on both members of the union",
    ],
    correctIndexes: [0],
    explanation:
      "Checking s.kind === 'circle' lets TypeScript rule out the 'square' branch inside the if block, and since the union only has two members, it can also narrow s to 'square' for everything after that block.",
  },
  {
    id: "ts-advanced-types-8",
    question: "Which statements about discriminated unions in TypeScript are true?",
    type: "multi",
    options: [
      "The shared 'tag' property must be typed as a literal, such as a specific string, rather than a general type like string, or TypeScript can't narrow on it",
      "A switch statement on the tag property lets TypeScript narrow the type inside each case block",
      "Every member of the union must explicitly extend a common base interface using the 'extends' keyword",
      "TypeScript can only narrow a discriminated union inside if statements, never inside a switch statement",
    ],
    correctIndexes: [0, 1],
    explanation:
      "Narrowing depends on the tag being a literal type so each value maps to exactly one union member; TypeScript's control flow analysis applies this both to if/else chains and to switch statements, and no shared base interface via 'extends' is required for it to work.",
  },
  {
    id: "ts-advanced-types-9",
    question:
      "What does this code do? function printId(id: string | number) { if (typeof id === 'string') { console.log(id.toUpperCase()); } else { console.log(id.toFixed(2)); } }",
    type: "single",
    options: [
      "The typeof check narrows id to string inside the if branch, making toUpperCase valid, and to number in the else branch, making toFixed valid",
      "It fails to compile, because id.toUpperCase() is never valid on a union type under any circumstances",
      "typeof only evaluates known compile-time values, so this code always takes the else branch",
      "TypeScript ignores the typeof check entirely and treats id as string | number in both branches",
    ],
    correctIndexes: [0],
    explanation:
      "typeof is one of the checks TypeScript's control flow analysis understands for narrowing: inside the 'string' branch id is treated as string, and by elimination it's treated as number in the else branch.",
  },
  {
    id: "ts-advanced-types-10",
    question:
      "Given class Dog { bark() {} } class Cat { meow() {} } function speak(animal: Dog | Cat) { if (animal instanceof Dog) { animal.bark(); } else { animal.meow(); } } why does this compile?",
    type: "single",
    options: [
      "instanceof checks the value's prototype chain at runtime, and TypeScript uses that same check to narrow animal to Dog inside the if branch and to Cat in the else branch",
      "instanceof is a TypeScript-only compile-time keyword that has no effect once the code actually runs",
      "It only compiles because Dog and Cat happen to declare methods with the same name",
      "TypeScript requires an explicit type assertion before instanceof can be used, and one is hidden here implicitly",
    ],
    correctIndexes: [0],
    explanation:
      "instanceof is a real runtime check, and TypeScript recognizes it as a narrowing technique, so within each branch the variable's type is narrowed to match the class that was checked.",
  },
  {
    id: "ts-advanced-types-11",
    question:
      "What does this log, and why? function greet(name?: string) { if (name) { console.log(name.toUpperCase()); } else { console.log('Hello, stranger'); } } greet();",
    type: "single",
    options: [
      "'Hello, stranger', because name is undefined, which is falsy, so the truthiness check sends execution to the else branch, and TypeScript narrows out undefined only inside the if branch",
      "It throws a runtime error, because name.toUpperCase() is called on undefined",
      "'undefined', because name is coerced into a string before being logged",
      "It fails to compile, because optional parameters can't be combined with a truthiness check",
    ],
    correctIndexes: [0],
    explanation:
      "Calling greet() leaves name as undefined, which is falsy, so the if condition is false and the else branch runs; TypeScript also uses that same truthiness check to narrow name to string inside the if branch, ruling out undefined there.",
  },
  {
    id: "ts-advanced-types-12",
    question:
      "Given type Value = 'success' | 'error' | 'loading'; function handle(v: Value) { if (v === 'success') { /* ... */ } }, what happens to the type of v inside that if block?",
    type: "single",
    options: [
      "TypeScript narrows v down to the single literal type 'success' inside the block, since the equality check rules out the other members of the union",
      "v stays typed as the full union 'success' | 'error' | 'loading' inside the block, unaffected by the equality check",
      "The equality check causes a compile error, because literal types can't be compared using ===",
      "v is widened to the general string type inside the block",
    ],
    correctIndexes: [0],
    explanation:
      "An equality check against one specific literal is enough for TypeScript's narrowing to eliminate every other possibility in the union, leaving v typed as exactly 'success' for the rest of that block.",
  },
  {
    id: "ts-advanced-types-13",
    question:
      "What does the return type mean in this function? function isString(value: unknown): value is string { return typeof value === 'string'; }",
    type: "single",
    options: [
      "'value is string' is a type predicate: whenever the function returns true, TypeScript narrows the argument's type to string everywhere isString(value) was checked, such as inside an if block",
      "It means the function's return type is literally the string 'value', ignoring the boolean logic in the body",
      "It has no special meaning to TypeScript; it behaves like a plain comment with no effect on narrowing",
      "It means the function can only ever be called with an argument that is already known to be a string",
    ],
    correctIndexes: [0],
    explanation:
      "A 'value is string' return annotation makes isString a user-defined type guard, so a truthy call to it lets TypeScript narrow the checked variable's type in the branch where the guard held.",
  },
  {
    id: "ts-advanced-types-14",
    question:
      "Which statements about custom type guard functions using a 'value is Type' predicate are true?",
    type: "multi",
    options: [
      "TypeScript trusts the predicate's declared result; it doesn't verify at compile time that the function body's logic actually matches the claimed type",
      "They can narrow the element type of an array, for example values.filter(isString) can be inferred as string[] when isString has the predicate return type",
      "A type guard function is required to use the typeof operator internally; no other kind of check is allowed",
      "Type guard functions can only be used directly inside if statements, never passed as a callback such as to .filter()",
    ],
    correctIndexes: [0, 1],
    explanation:
      "TypeScript takes the type predicate at face value rather than re-verifying the implementation, which is powerful but means a buggy guard can mislead the type checker; predicates work with any internal logic (not just typeof) and are commonly passed to array methods like filter to narrow the result's element type.",
  },
  {
    id: "ts-advanced-types-15",
    question:
      "What does this mapped type produce? type ReadonlyBox<T> = { readonly [K in keyof T]: T[K] };",
    type: "single",
    options: [
      "A new type with the same property names and value types as T, but with every property marked readonly, so none of them can be reassigned",
      "A type with a single property named K that holds all of T's values combined into one tuple",
      "It strips away every property of T, leaving only a generic placeholder behind",
      "It has no effect on T at all, since readonly and keyof cancel each other out",
    ],
    correctIndexes: [0],
    explanation:
      "'[K in keyof T]' loops over every key of T to build a matching property in the new type, and prefixing it with readonly applies that modifier to each of those copied properties.",
  },
  {
    id: "ts-advanced-types-16",
    question:
      "Which statements correctly describe the built-in utility types Partial<T>, Required<T>, Pick<T, K>, and Omit<T, K>?",
    type: "multi",
    options: [
      "Partial<T> makes every property of T optional, while Required<T> makes every property of T mandatory, even ones that were optional in T",
      "Pick<T, K> builds a new type containing only the properties listed in K, while Omit<T, K> builds a new type with every property of T except those listed in K",
      "Partial<T> and Required<T> both change the underlying types of T's properties, not just whether they are optional",
      "Pick and Omit can only be used on array types; they don't work with object interfaces",
    ],
    correctIndexes: [0, 1],
    explanation:
      "Partial and Required only toggle the optional (?) modifier on every property without touching the property value types, while Pick and Omit both operate on object shapes by selecting or excluding named keys, not on arrays.",
  },
  {
    id: "ts-advanced-types-17",
    question:
      "Given interface User { id: number; name: string; }, what does Record<string, User> describe?",
    type: "single",
    options: [
      "An object type whose keys are strings and whose values are all of type User, useful for something like a lookup map keyed by user id or username",
      "An array of User objects, equivalent to User[]",
      "A single User object with an extra 'record' property added to it",
      "A type that tracks a history of changes made to a User object over time",
    ],
    correctIndexes: [0],
    explanation:
      "Record<K, V> builds an object type where every key has type K and every value has type V, so Record<string, User> models a dictionary-like object mapping arbitrary string keys to User values.",
  },
  {
    id: "ts-advanced-types-18",
    question:
      "What does the conditional type ApiResult<T> = T extends string ? 'text-response' : 'object-response'; resolve to for ApiResult<number>?",
    type: "single",
    options: [
      "'object-response', because number does not extend (is not assignable to) string, so the conditional type takes its false branch",
      "'text-response', because conditional types always default to their true branch for primitive types",
      "It fails to compile, because conditional types can't use primitive types as the type being checked",
      "never, because number and string are considered completely unrelated types",
    ],
    correctIndexes: [0],
    explanation:
      "A conditional type 'T extends U ? X : Y' checks whether T is assignable to U; since number isn't assignable to string, ApiResult<number> evaluates to the false branch, 'object-response'.",
  },
];
