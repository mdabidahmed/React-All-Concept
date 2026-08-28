import type { QuizQuestion } from "../../types/quiz";

export const tsBasicsQuestions: QuizQuestion[] = [
  {
    id: "ts-basics-1",
    question: "What is TypeScript, in relation to JavaScript?",
    type: "single",
    options: [
      "A superset of JavaScript that adds optional static typing, compiling down to plain JavaScript that runs anywhere JavaScript already runs",
      "A completely separate programming language that runs in its own runtime, unrelated to JavaScript",
      "A JavaScript framework for building user interfaces, similar to React or Vue",
      "A new version of JavaScript that replaces it and runs natively in modern browsers without any build step",
    ],
    correctIndexes: [0],
    explanation:
      "TypeScript is a superset of JavaScript: every valid JavaScript program is (almost) valid TypeScript, and TypeScript adds static type checking on top, but browsers and Node.js cannot run .ts files directly, so it must be compiled to plain JavaScript first.",
  },
  {
    id: "ts-basics-2",
    question:
      "How does TypeScript code actually get executed in a browser or in Node.js?",
    type: "single",
    options: [
      "It is compiled (transpiled) into plain JavaScript, typically via the TypeScript compiler tsc, and that resulting JavaScript is what actually runs",
      "Browsers and Node.js have built-in TypeScript engines that execute .ts files directly, with no compilation step",
      "TypeScript files are renamed to .js without any real translation, since TypeScript syntax is identical to JavaScript",
      "TypeScript code is interpreted line by line at runtime by a special TypeScript interpreter bundled with every browser",
    ],
    correctIndexes: [0],
    explanation:
      "TypeScript has no runtime of its own; the compiler translates .ts source into plain JavaScript (stripping types and down-leveling newer syntax if needed), and it is that emitted JavaScript that the browser or Node.js actually executes.",
  },
  {
    id: "ts-basics-3",
    question:
      "What happens to TypeScript's type annotations, like ': number' or ': string', when the code is compiled to JavaScript?",
    type: "single",
    options: [
      "They are erased entirely; the compiled JavaScript contains no types at all, and there is no runtime cost or runtime type checking left behind",
      "They are converted into runtime checks that throw errors if a value doesn't match the declared type",
      "They remain in the compiled JavaScript as comments for documentation purposes",
      "They are converted into JSON schema objects that JavaScript uses to validate values as the program runs",
    ],
    correctIndexes: [0],
    explanation:
      "TypeScript's type system is purely a compile-time (static analysis) tool; annotations are stripped away during compilation, so the emitted JavaScript is indistinguishable from JavaScript written without types and incurs zero runtime overhead.",
  },
  {
    id: "ts-basics-4",
    question:
      "A tsconfig.json file with default settings sits in a project, and a developer runs 'tsc' from the terminal. What does this command do?",
    type: "single",
    options: [
      "It reads tsconfig.json, type-checks the project's TypeScript files, and compiles them into plain JavaScript output files",
      "It starts a local development web server that serves the TypeScript files directly to the browser",
      "It installs TypeScript and all of the project's npm dependencies",
      "It only checks for syntax errors and never produces any JavaScript output files",
    ],
    correctIndexes: [0],
    explanation:
      "Running the bare tsc command invokes the TypeScript compiler, which uses the nearest tsconfig.json for configuration, type-checks the matched source files, and emits compiled JavaScript files (by default alongside the source, or wherever outDir points).",
  },
  {
    id: "ts-basics-5",
    question: "Which of the following are true about ts-node?",
    type: "multi",
    options: [
      "It lets you run a .ts file directly from the command line without a separate, manual 'tsc' compile step beforehand",
      "It compiles TypeScript to JavaScript in memory (or on the fly) and then executes the result, typically using Node.js under the hood",
      "It is commonly used for quick scripts, prototyping, and development tooling rather than for production builds",
      "It permanently changes Node.js itself so that Node.js can execute .ts files natively forever after, even without ts-node installed",
    ],
    correctIndexes: [0, 1, 2],
    explanation:
      "ts-node is a development convenience that transpiles and runs TypeScript on the fly in a single command, which is handy for scripts and local development; it does not modify Node.js itself, and production setups typically still precompile TypeScript with tsc or a bundler.",
  },
  {
    id: "ts-basics-6",
    question:
      "Which of the following are TypeScript's basic types for everyday primitive values?",
    type: "single",
    options: [
      "string, number, and boolean",
      "text, integer, and flag",
      "str, num, and bool",
      "String, Number, and Boolean (capitalized) are the only correct forms; lowercase versions are invalid",
    ],
    correctIndexes: [0],
    explanation:
      "TypeScript's basic built-in types for everyday values are lowercase string, number, and boolean; the capitalized versions (String, Number, Boolean) refer to wrapper object types and are conventionally avoided for annotating ordinary values.",
  },
  {
    id: "ts-basics-7",
    question:
      "What does this code do? let scores: number[] = [10, 20, 30]; scores.push('forty');",
    type: "single",
    options: [
      "It fails to compile, because scores is typed as an array of numbers, and 'forty' is a string, not a number",
      "It compiles and runs fine, silently converting 'forty' to the number 40",
      "It compiles fine, because arrays in TypeScript can always hold mixed types regardless of annotation",
      "It throws a runtime error, but only after the program has already logged the array once",
    ],
    correctIndexes: [0],
    explanation:
      "number[] annotates an array whose elements must all be numbers; pushing a string violates that element type, so the TypeScript compiler reports a type error before the code ever runs.",
  },
  {
    id: "ts-basics-8",
    question:
      "Which of the following correctly declares a tuple holding a name (string) followed by an age (number)?",
    type: "single",
    options: [
      "let person: [string, number] = ['Sam', 30];",
      "let person: (string, number) = ['Sam', 30];",
      "let person: string[2] = ['Sam', 30];",
      "let person: Array[string, number] = ['Sam', 30];",
    ],
    correctIndexes: [0],
    explanation:
      "A tuple type is written as a square-bracketed list of types in order, like [string, number], which fixes both the length and the type at each position; the other syntaxes shown are not valid TypeScript tuple declarations.",
  },
  {
    id: "ts-basics-9",
    question:
      "Which statement about arrays and tuples in TypeScript is correct?",
    type: "single",
    options: [
      "A tuple like [string, number] fixes both the length and the type expected at each position, while an array type like number[] only constrains element type, not length",
      "Tuples and arrays are identical in TypeScript, and [string, number] behaves exactly like number[] or string[]",
      "Array types like number[] fix the exact number of elements the array may contain",
      "Tuples can only ever contain a single element, unlike arrays which can contain many",
    ],
    correctIndexes: [0],
    explanation:
      "An array type such as number[] constrains element type but places no limit on length, while a tuple pins down both the exact length and the type expected at each specific position, making tuples stricter and not interchangeable with plain arrays.",
  },
  {
    id: "ts-basics-10",
    question:
      "Given 'let score = 90;' with no explicit type annotation, what type does TypeScript infer for score?",
    type: "single",
    options: [
      "number, inferred directly from the initial value 90",
      "any, since no annotation was written",
      "unknown, since the type was not explicitly declared",
      "It has no type until one is explicitly assigned later in the code",
    ],
    correctIndexes: [0],
    explanation:
      "TypeScript performs type inference from initializers: when a variable is declared with a value and no annotation, TypeScript infers the most specific reasonable type from that value, so score becomes type number rather than any or unknown.",
  },
  {
    id: "ts-basics-11",
    question:
      "In which situation does TypeScript most need an explicit type annotation, rather than being able to infer one?",
    type: "single",
    options: [
      "When a variable is declared without an initial value, like 'let total;', and given a value only later in the code",
      "When a variable is declared with a literal value, like 'let total = 0;', since inference never works with literals",
      "When a variable is declared with const and a literal value, since const always requires an explicit annotation",
      "TypeScript can always infer every type in every situation, so explicit annotations are never actually needed",
    ],
    correctIndexes: [0],
    explanation:
      "TypeScript infers types from initializers at the point of declaration; a variable like 'let total;' with no initializer has nothing to infer from (it defaults to an implicit any in non-strict settings), so an explicit annotation such as 'let total: number;' communicates the intended type up front.",
  },
  {
    id: "ts-basics-12",
    question:
      "What happens when this code compiles? let value: any = getUserInput(); value.toUpperCase();",
    type: "single",
    options: [
      "It compiles without error, because any disables type checking on that value entirely, even though it may crash at runtime if the actual value has no toUpperCase method",
      "It fails to compile, because any values cannot have methods called on them",
      "It compiles only if getUserInput() is explicitly typed to return a string",
      "It compiles and TypeScript automatically inserts a runtime check to confirm value is a string before calling toUpperCase",
    ],
    correctIndexes: [0],
    explanation:
      "any tells TypeScript to opt out of type checking for that value completely, so any property access or method call is allowed at compile time regardless of what the value actually turns out to be, shifting the risk of a runtime crash back onto the developer.",
  },
  {
    id: "ts-basics-13",
    question:
      "What happens when this code compiles? let value: unknown = getUserInput(); value.toUpperCase();",
    type: "single",
    options: [
      "It fails to compile, because TypeScript does not know that value is a string, and unknown requires narrowing before you can call methods on it",
      "It compiles without error, behaving exactly the same as if value were typed any",
      "It fails to compile only if strict mode is disabled in tsconfig.json",
      "It compiles, but toUpperCase always returns undefined at runtime for unknown-typed values",
    ],
    correctIndexes: [0],
    explanation:
      "unknown is a safer counterpart to any: you can assign anything to it, but TypeScript will not let you call methods or access properties on an unknown value until you narrow it, for example with a typeof check, proving to the compiler what it actually is.",
  },
  {
    id: "ts-basics-14",
    question:
      "Which of the following correctly describe the key safety difference between any and unknown in TypeScript?",
    type: "multi",
    options: [
      "Both any and unknown can hold a value of any type",
      "unknown forces you to narrow the type (such as with a typeof or instanceof check) before performing operations specific to a concrete type",
      "any allows any operation on the value with no narrowing required, which can hide real bugs until runtime",
      "any and unknown provide the exact same level of type safety, so choosing between them makes no practical difference",
    ],
    correctIndexes: [0, 1, 2],
    explanation:
      "any and unknown are both able to hold values of any type, but unknown requires you to prove what the value actually is before using it in a type-specific way, while any lets anything through unchecked; this makes unknown the safer choice whenever you need a flexible type.",
  },
  {
    id: "ts-basics-15",
    question:
      "Which of the following statements about void, null, and undefined in TypeScript are true?",
    type: "multi",
    options: [
      "void is typically used as a function return type to indicate the function's return value is not meaningful",
      "undefined is the value a declared variable has before it is ever assigned",
      "null and undefined are two distinct values in JavaScript and TypeScript, not the same thing",
      "void, null, and undefined all mean exactly the same thing in TypeScript and can be used interchangeably everywhere",
    ],
    correctIndexes: [0, 1, 2],
    explanation:
      "void describes a function whose return value isn't meaningful, undefined is what an unassigned variable holds, and null and undefined are distinct empty values with different intents (null usually signals 'intentionally no value', undefined signals 'not yet set'); they are not interchangeable, and void specifically only makes sense as a return type.",
  },
  {
    id: "ts-basics-16",
    question:
      "What does 'as' do in this code? let input = document.getElementById('search') as HTMLInputElement; input.value = 'hello';",
    type: "single",
    options: [
      "It is a type assertion that only affects compile-time type checking, telling TypeScript to treat the value as HTMLInputElement; it performs no runtime conversion and does not verify the value actually is an input element",
      "It performs an actual runtime conversion of the DOM element into an HTMLInputElement instance, similar to calling a constructor",
      "It throws a runtime error immediately if the element is not actually an HTMLInputElement",
      "It is functionally identical to calling Number() or String(), performing real data conversion at runtime",
    ],
    correctIndexes: [0],
    explanation:
      "A type assertion like 'as HTMLInputElement' only changes what TypeScript believes about a value's type for the purposes of compile-time checking; unlike an actual conversion function such as Number() or String(), which transforms the underlying value at runtime, an assertion does nothing at runtime and provides no safety guarantee that the value truly is that type.",
  },
];
