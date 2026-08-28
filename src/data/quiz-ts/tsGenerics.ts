import type { QuizQuestion } from "../../types/quiz";

export const tsGenericsQuestions: QuizQuestion[] = [
  {
    id: "ts-generics-1",
    question:
      "What is a 'generic' in TypeScript, and why would you reach for one?",
    type: "single",
    options: [
      "A way to write a function, class, or interface that works across many types while still preserving type information, so TypeScript keeps checking your code instead of falling back to 'any'",
      "A special kind of variable that can hold any JavaScript value without ever needing a type annotation",
      "A built-in utility that automatically converts any interface into a class at compile time",
      "A syntax that marks a function as returning no value",
    ],
    correctIndexes: [0],
    explanation:
      "Generics let you parameterize a type the same way a function parameterizes a value, so one implementation stays reusable across many concrete types without losing the type safety that 'any' would throw away.",
  },
  {
    id: "ts-generics-2",
    question:
      "Which of the following are genuine advantages of a generic function like 'function identity<T>(value: T): T { return value; }' over (a) typing the parameter as 'any', or (b) writing a separate identity function for every type you need?",
    type: "multi",
    options: [
      "It preserves the specific type of the argument in the return type, so callers still get type-checked results, unlike 'any' which silently allows any operation on the value",
      "It avoids duplicating nearly identical code for each type, since one implementation works correctly for all of them",
      "It removes the need for TypeScript to compile the function at all",
      "It automatically converts the return value to a string, no matter what type was passed in",
    ],
    correctIndexes: [0, 1],
    explanation:
      "Generics give you both safety (the compiler still tracks the real type instead of treating it as 'any') and reuse (no need for identityNumber, identityString, and so on), which is exactly the combination 'any' and per-type duplication each fail to deliver.",
  },
  {
    id: "ts-generics-3",
    question:
      "What does the 'T' represent in this signature? function identity<T>(value: T): T { return value; }",
    type: "single",
    options: [
      "T is a type parameter, a placeholder that gets filled in with a concrete type each time the function is called",
      "T is a required argument that must be passed as the function's first value",
      "T is a TypeScript keyword that marks the function as asynchronous",
      "T restricts the function so it can only accept numbers",
    ],
    correctIndexes: [0],
    explanation:
      "The angle-bracket syntax <T> declares a type parameter, standing in for whatever type is used at each call site, similar to how 'value' stands in for whatever argument is passed.",
  },
  {
    id: "ts-generics-4",
    question:
      "Given function identity<T>(value: T): T { return value; }, what type does TypeScript infer for T in the call identity(42)?",
    type: "single",
    options: [
      "number, because TypeScript infers T from the type of the argument that was actually passed in",
      "any, because generics disable type inference",
      "T remains an unresolved placeholder and is never turned into a concrete type",
      "string, because TypeScript defaults an unspecified generic to string",
    ],
    correctIndexes: [0],
    explanation:
      "TypeScript performs generic type inference by looking at the arguments supplied at the call site, so passing 42 sets T to number for that call without you having to write identity<number>(42) yourself.",
  },
  {
    id: "ts-generics-5",
    question:
      "Why might a developer write identity<string>('5') and explicitly supply the type argument, instead of simply calling identity('5') and letting TypeScript infer it?",
    type: "single",
    options: [
      "To make the intent explicit, or to guide TypeScript in cases where it cannot infer a useful type on its own, such as from an empty array literal passed to a generic function",
      "Because generic functions are incapable of inferring a type from a string argument",
      "Because explicit type arguments are mandatory syntax and can never be left out",
      "Because writing the explicit type argument changes identity's return type to always be string, no matter what type argument was given",
    ],
    correctIndexes: [0],
    explanation:
      "Inference and explicit type arguments both resolve T to a concrete type; explicit arguments matter most when inference has nothing useful to go on, like an empty array literal, or when you want to be unambiguous about intent.",
  },
  {
    id: "ts-generics-6",
    question:
      "Consider function wrapInArray<T>(value: T): T[] { return [value]; }. Which statements about it are true?",
    type: "multi",
    options: [
      "wrapInArray(5) infers T as number, so the result type is number[]",
      "wrapInArray<string>(5) is a compile error, because 5 is not assignable to the explicitly specified type string",
      "Explicit type arguments are always silently ignored whenever TypeScript is able to infer a type on its own",
      "wrapInArray(5) produces a plain any[] array, since the array's contents can't be known until the code actually runs",
    ],
    correctIndexes: [0, 1],
    explanation:
      "TypeScript infers T as number from the argument 5, giving number[]; but when a type argument is supplied explicitly, TypeScript checks the argument against that exact type, so passing 5 where string was specified fails to compile.",
  },
  {
    id: "ts-generics-7",
    question:
      "Given interface Box<T> { value: T; }, which declaration correctly creates a Box holding a number?",
    type: "single",
    options: [
      "const numberBox: Box<number> = { value: 42 };",
      "const numberBox: Box = { value: 42 };",
      "const numberBox: Box<T> = { value: 42 };",
      "const numberBox: Box(number) = { value: 42 };",
    ],
    correctIndexes: [0],
    explanation:
      "Box<T> is a generic interface, so using it requires supplying a concrete type argument in angle brackets, as in Box<number>; T by itself is only meaningful inside a generic declaration, not at a usage site.",
  },
  {
    id: "ts-generics-8",
    question:
      "Given interface ApiResponse<T> { data: T; success: boolean; }, which type correctly describes a response whose data is an array of user names (strings)?",
    type: "single",
    options: [
      "ApiResponse<string[]>",
      "ApiResponse<string>",
      "ApiResponse[]",
      "ApiResponse<Array>",
    ],
    correctIndexes: [0],
    explanation:
      "ApiResponse<T> needs a concrete type argument describing the shape of 'data'; since the data here is a list of strings, the correct argument is string[], giving ApiResponse<string[]>.",
  },
  {
    id: "ts-generics-9",
    question:
      "A generic class Stack<T> has push(item: T): void and pop(): T | undefined. What happens with: const numbers = new Stack<number>(); numbers.push('hello');",
    type: "single",
    options: [
      "It fails to compile, because 'hello' is a string and doesn't match T, which was fixed to number for this particular instance",
      "It runs fine, because Stack accepts any value regardless of the type parameter it was created with",
      "It runs fine, but numbers.pop() will always return undefined afterward",
      "It compiles without any warning, but throws a runtime TypeError when the code executes",
    ],
    correctIndexes: [0],
    explanation:
      "Once Stack<number> fixes T to number for that instance, every method that references T, including push, is checked against number, so pushing a string is a type error caught at compile time, not left to fail at runtime.",
  },
  {
    id: "ts-generics-10",
    question:
      "What is the main benefit of writing a single class Stack<T> { ... }, compared to writing separate NumberStack and StringStack classes with otherwise identical logic?",
    type: "single",
    options: [
      "One generic implementation works correctly and type-safely for any element type, without duplicating the push/pop logic for each type",
      "Generic classes automatically execute faster at runtime than non-generic classes",
      "Generic classes are the only way to declare private fields in TypeScript",
      "Generic classes never require specifying a type when they are instantiated",
    ],
    correctIndexes: [0],
    explanation:
      "The whole point of a generic class is reuse without repetition: the push/pop logic is written once, and TypeScript still enforces the right element type for each instantiation like Stack<number> or Stack<string>.",
  },
  {
    id: "ts-generics-11",
    question:
      "What does the constraint do in function logLength<T extends { length: number }>(item: T): void { console.log(item.length); }?",
    type: "single",
    options: [
      "It restricts T to only types that have a 'length' property, which is what makes item.length safe to access inside the function body",
      "It forces every argument to be converted into an array before the function runs",
      "It means T must literally be the type 'number'",
      "It has no effect at compile time and is only checked once the code is running",
    ],
    correctIndexes: [0],
    explanation:
      "'extends { length: number }' is a generic constraint, narrowing which types are allowed for T to ones that have a numeric length property, such as strings and arrays, so the compiler can guarantee item.length exists.",
  },
  {
    id: "ts-generics-12",
    question:
      "Given function logLength<T extends { length: number }>(item: T): void { console.log(item.length); }, what happens when you call logLength(42)?",
    type: "single",
    options: [
      "It fails to compile, because the number type has no 'length' property, so 42 doesn't satisfy the constraint",
      "It compiles fine and logs undefined at runtime",
      "It compiles fine, because generic constraints are only ever checked at runtime, never at compile time",
      "It compiles fine and logs 42",
    ],
    correctIndexes: [0],
    explanation:
      "Generic constraints are enforced at compile time; since number doesn't have a length property, passing 42 violates 'T extends { length: number }' and TypeScript rejects the call before it ever runs.",
  },
  {
    id: "ts-generics-13",
    question:
      "Given function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] { return obj[key]; }, which statements are true?",
    type: "multi",
    options: [
      "K extends keyof T restricts key to only the property names that actually exist on T, so passing a mistyped key fails to compile",
      "The return type T[K] gives the exact type of that property, so getProperty(user, 'name') returns whatever type user.name actually has",
      "Without the keyof constraint, an arbitrary string passed as key would still be validated against T's real properties",
      "keyof T produces a runtime array of T's property names that the function body can loop over",
    ],
    correctIndexes: [0, 1],
    explanation:
      "The keyof constraint ties key to T's actual property names so mistyped keys are caught at compile time, and indexing with T[K] lets the return type track the precise property type; keyof itself is a compile-time-only operator, not a runtime array, and dropping the constraint would let any string through unchecked.",
  },
  {
    id: "ts-generics-14",
    question:
      "Given interface Container<T = string> { value: T; }, what is the type of value in const c: Container = { value: 'hi' };?",
    type: "single",
    options: [
      "string, because Container's type parameter defaults to string whenever no type argument is supplied",
      "It's a compile error, because Container must always be given an explicit type argument",
      "any, because omitting the type argument disables type checking for that usage",
      "unknown, because TypeScript can't infer anything without an explicit type argument",
    ],
    correctIndexes: [0],
    explanation:
      "'T = string' declares a default generic type parameter, so writing Container without angle brackets is equivalent to Container<string>, and value is typed as string rather than becoming any or unknown.",
  },
];
