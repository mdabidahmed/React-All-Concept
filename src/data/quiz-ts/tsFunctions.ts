import type { QuizQuestion } from "../../types/quiz";

export const tsFunctionsQuestions: QuizQuestion[] = [
  {
    id: "ts-functions-1",
    question:
      "What does the following function signature enforce at compile time? 'function multiply(a: number, b: number): number { return a * b; }'",
    type: "single",
    options: [
      "Both 'a' and 'b' must be numbers at every call site, and TypeScript checks that the function's return value matches the declared 'number' return type",
      "Only the return value is checked; 'a' and 'b' can be passed as any type without error",
      "The type annotations are purely documentation and are stripped without any compile-time checking",
      "TypeScript infers 'a' and 'b' as 'any' regardless of the ': number' annotations",
    ],
    correctIndexes: [0],
    explanation:
      "Type annotations on parameters ('a: number', 'b: number') are enforced at every call site, and the ': number' written after the parameter list is the declared return type, which TypeScript verifies against the function's return statements.",
  },
  {
    id: "ts-functions-2",
    question:
      "Given 'function multiply(a: number, b: number): number { return a * b; }', why does the call 'multiply(4, \"5\")' fail to compile?",
    type: "single",
    options: [
      "'\"5\"' is a string, but the second parameter is declared as 'number', and TypeScript does not implicitly convert a string argument to a number",
      "TypeScript functions can only ever accept a single argument",
      "The function name 'multiply' conflicts with a reserved TypeScript keyword",
      "It does not fail; TypeScript automatically coerces '\"5\"' to the number 5 before the call",
    ],
    correctIndexes: [0],
    explanation:
      "Unlike JavaScript's runtime coercion, TypeScript's static checker compares each argument's type against the declared parameter type at compile time, and a string literal is not assignable to a 'number' parameter, so this call is rejected before the code ever runs.",
  },
  {
    id: "ts-functions-3",
    question:
      "In 'function square(n: number) { return n * n; }', no return type is written after the parameter list. What happens?",
    type: "single",
    options: [
      "TypeScript infers the return type as 'number' from the function body, and calling code is still checked against that inferred type",
      "The function's return type becomes 'any', so its result can be used as any type with no checking",
      "TypeScript refuses to compile the function because a return type annotation is mandatory",
      "The return type becomes 'void', since none was explicitly written",
    ],
    correctIndexes: [0],
    explanation:
      "TypeScript can infer a function's return type from its body when one isn't written explicitly; here it infers 'number' because 'n * n' is a number, and that inference is checked just as strictly as if ': number' had been written by hand.",
  },
  {
    id: "ts-functions-4",
    question:
      "What does the following declare? 'type MathOp = (a: number, b: number) => number;'",
    type: "single",
    options: [
      "A standalone function type alias describing any function that takes two numbers and returns a number, usable to type a variable that should hold such a function",
      "A function named 'MathOp' that immediately runs and returns a number",
      "An interface that a class is required to implement",
      "A tuple type containing two numbers followed by a function",
    ],
    correctIndexes: [0],
    explanation:
      "'(a: number, b: number) => number' is function-type syntax describing the shape of a function (its parameter types and return type) rather than defining an actual function; naming it with 'type MathOp = ...' lets that shape be reused to annotate variables, parameters, or fields expected to hold a matching function.",
  },
  {
    id: "ts-functions-5",
    question:
      "Given 'let op: (a: number, b: number) => number;', does the assignment 'op = (a: number) => a * 2;' compile?",
    type: "single",
    options: [
      "Yes — a function with fewer parameters is assignable to a function type expecting more, since any extra arguments a caller passes are simply ignored",
      "No — the assigned function must declare exactly the same number of parameters as the function type",
      "No — TypeScript only allows assigning arrow functions, never named functions, to a variable declared this way",
      "Yes, but only by coincidence, since the parameter count TypeScript checks has nothing to do with function assignability",
    ],
    correctIndexes: [0],
    explanation:
      "TypeScript's function type compatibility only requires that the assigned function accept at least as few parameters as the target type expects; since JavaScript callers can always pass extra arguments that get silently dropped, a function taking fewer parameters is a safe substitute.",
  },
  {
    id: "ts-functions-6",
    question:
      "Why does 'function greet(greeting?: string, name: string): string { return greeting + name; }' fail to compile?",
    type: "single",
    options: [
      "A required parameter ('name') cannot follow an optional parameter ('greeting'); optional parameters must come after all required ones",
      "A function cannot have more than one parameter of type 'string'",
      "The '?' modifier can only be used on the very last parameter in a parameter list",
      "It compiles fine; the order of optional and required parameters has no effect in TypeScript",
    ],
    correctIndexes: [0],
    explanation:
      "TypeScript requires optional parameters to appear after all required parameters, because parameters are matched positionally; if an optional one came first and were omitted, the compiler couldn't tell whether a supplied argument was meant for the optional slot or the required one, so it flags the required parameter that follows as an error.",
  },
  {
    id: "ts-functions-7",
    question:
      "What is the key difference between an optional parameter, 'function greet(name?: string)', and a default parameter, 'function greet(name: string = \"Guest\")'?",
    type: "single",
    options: [
      "The optional parameter's type really is 'string | undefined', and it's 'undefined' inside the body when omitted; the default parameter is treated as a plain 'string' inside the body, since a fallback value fills in for any omission",
      "There is no difference; both behave identically inside the function body and at every call site",
      "Default parameters can never be omitted by the caller, while optional parameters always can",
      "Optional parameters supply a fallback value when omitted, while default parameters leave the value as 'undefined'",
    ],
    correctIndexes: [0],
    explanation:
      "Marking a parameter with '?' just means the caller may omit it, leaving it 'undefined' inside the function unless checked for; a default parameter goes further by substituting a concrete value when omitted, so its type inside the body doesn't need to include 'undefined'.",
  },
  {
    id: "ts-functions-8",
    question:
      "Which of the following statements about optional parameters ('name?: string') versus default parameters ('name: string = \"Guest\"') are true?",
    type: "multi",
    options: [
      "Both allow the function to be called with fewer arguments than its full parameter list",
      "A parameter marked with '?' has an implicit type of 'T | undefined'",
      "Inside the function body, a parameter with a default value keeps its declared type rather than including 'undefined', since the default fills any gap",
      "An optional parameter is guaranteed to never be 'undefined' inside the function body",
    ],
    correctIndexes: [0, 1, 2],
    explanation:
      "Optional and default parameters both make an argument omittable at the call site; marking a parameter optional widens its type to include 'undefined' since it might not be supplied, while a default parameter substitutes its default whenever omitted, keeping its declared type inside the body. The last statement is false — an optional parameter can absolutely be 'undefined' inside the body when the caller leaves it out.",
  },
  {
    id: "ts-functions-9",
    question:
      "How must a rest parameter be typed so that 'function sum(...nums: number[]): number { return nums.reduce((a, b) => a + b, 0); }' compiles correctly?",
    type: "single",
    options: [
      "As an array type, like 'number[]', since a rest parameter always collects the remaining arguments into an array",
      "As a plain 'number', since each individual argument passed to it is a number",
      "As 'any', because rest parameters cannot be given a specific element type",
      "As a tuple with a fixed length that must match the exact number of arguments passed at every call site",
    ],
    correctIndexes: [0],
    explanation:
      "A rest parameter always represents an array of whatever was passed, so its annotation must be an array (or tuple) type describing the elements it can contain; annotating it as a plain 'number' would incorrectly claim the parameter itself is a single number rather than a collection.",
  },
  {
    id: "ts-functions-10",
    question:
      "What is the purpose of TypeScript function overloads, such as declaring 'function format(value: string): string;' and 'function format(value: number): string;' above a single shared implementation?",
    type: "single",
    options: [
      "They let one function name present multiple distinct call signatures to callers, each checked separately against the arguments supplied, while one shared implementation (broad enough to cover every overload) handles the actual runtime logic",
      "They create two entirely separate functions at runtime that JavaScript can choose between",
      "They let a function accept an unlimited number of arguments of unlimited types with no type checking at all",
      "They are purely a documentation comment style with no effect on type checking",
    ],
    correctIndexes: [0],
    explanation:
      "Overload signatures describe the specific ways a function may legally be called; TypeScript checks each call site against those declared signatures, while only one implementation actually exists at runtime, since overloads are a compile-time-only construct that plain JavaScript has no concept of.",
  },
  {
    id: "ts-functions-11",
    question:
      "Which of the following statements about TypeScript function overloads are true?",
    type: "multi",
    options: [
      "The implementation signature itself is not directly visible to calling code; only the overload signatures declared above it are checked against call sites",
      "The implementation's parameter and return types must be general enough to be compatible with every overload signature it's fulfilling",
      "Overloads produce multiple separate compiled functions in the emitted JavaScript, one per signature",
      "A call that doesn't match any declared overload signature is rejected at compile time, even if it happens to match the implementation signature",
    ],
    correctIndexes: [0, 1, 3],
    explanation:
      "Callers only see the overload signatures, never the implementation signature, so the implementation must be broad enough to satisfy all of them, and any call not matching a declared overload is an error even if the implementation could technically handle it. At runtime, overloads vanish entirely and compile down to a single implementation function, so no extra functions are emitted.",
  },
  {
    id: "ts-functions-12",
    question:
      "What does declaring a 'this' parameter, like 'function handleClick(this: HTMLButtonElement, event: Event) { }', accomplish?",
    type: "single",
    options: [
      "It lets TypeScript check, at compile time only, that the function is called with 'this' bound to an 'HTMLButtonElement'; the 'this' parameter is erased entirely from the emitted JavaScript and is never a real runtime parameter",
      "It adds a genuine extra parameter that every caller must pass as the first argument at runtime",
      "It changes what 'this' means inside every other function in the same file",
      "It has no effect, since 'this' parameters are only permitted inside arrow functions",
    ],
    correctIndexes: [0],
    explanation:
      "A 'this' parameter is a special, TypeScript-only syntax feature that must be listed first in the parameter list; it exists purely so the compiler can verify how the function expects to be called (for example, as a method on a specific object type), and it is completely erased from the compiled JavaScript, never appearing as a real parameter at runtime.",
  },
  {
    id: "ts-functions-13",
    question:
      "Which of the following statements correctly distinguish a 'void' return type from a 'never' return type in TypeScript?",
    type: "multi",
    options: [
      "'void' describes a function that completes normally but returns nothing meaningful, such as one that ends without a 'return' or with a bare 'return;'",
      "'never' describes a function whose control flow can never complete normally at all, such as one that always throws or always loops without end",
      "A function typed to return 'never' can still finish and implicitly return 'undefined'",
      "'void' and 'never' are interchangeable and can always be substituted for each other",
    ],
    correctIndexes: [0, 1],
    explanation:
      "'void' means the function completes normally but produces no useful value, whereas 'never' means the function's control flow never reaches a normal completion point at all — for instance, it always throws or loops indefinitely. A 'never' function returning 'undefined' would contradict its own type, since that would count as completing normally, so the two types are not interchangeable.",
  },
  {
    id: "ts-functions-14",
    question:
      "In a switch statement over a union type, why is assigning the default case's value to a 'never'-typed variable useful for exhaustiveness checking? Example: 'default: const check: never = value; break;'",
    type: "single",
    options: [
      "If every union member has already been handled by earlier cases, TypeScript narrows 'value' down to 'never' in the default branch, so the assignment compiles; if a new union member is added later but left unhandled, 'value' would keep a real type there instead, making the assignment a compile error that flags the missing case",
      "It has no real effect; 'never' here is just a stylistic convention with no compiler behavior behind it",
      "It forces the switch statement to throw a runtime error whenever the default case executes",
      "It tells TypeScript to skip type-checking the rest of the switch statement entirely",
    ],
    correctIndexes: [0],
    explanation:
      "After all specific cases of a union are handled, TypeScript's control-flow narrowing leaves nothing left for 'value' to be in the default branch, so its type there becomes 'never', which is assignable to a 'never'-typed variable; if the union is extended later and a case is forgotten, 'value' retains a real, leftover type in the default branch, and assigning it to a 'never' variable becomes a compile error that catches the oversight.",
  },
];
