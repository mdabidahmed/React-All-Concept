import type { QuizQuestion } from "../../types/quiz";

export const jsBasicsQuestions: QuizQuestion[] = [
  {
    id: "js-basics-1",
    question:
      "In JavaScript, which statement best describes semicolons and statements?",
    type: "single",
    options: [
      "Each statement generally ends with a semicolon, and JavaScript's automatic semicolon insertion (ASI) can add missing ones in many cases, but relying on ASI can cause subtle bugs",
      "Semicolons are strictly required after every statement, and code without them fails to parse",
      "A statement can only contain a single expression, never a declaration or control-flow keyword",
      "JavaScript ignores semicolons entirely; they exist only for style and have no effect on parsing",
    ],
    correctIndexes: [0],
    explanation:
      "JavaScript uses automatic semicolon insertion to infer missing semicolons in many situations, but this mechanism has edge cases (such as a return statement followed by a newline) that can silently change behavior, so writing semicolons explicitly is the safer habit.",
  },
  {
    id: "js-basics-2",
    question:
      "Why would the code 'let class = \"Math101\";' throw a SyntaxError?",
    type: "single",
    options: [
      "'class' is a reserved keyword in JavaScript, so it cannot be used as a variable name",
      "Variable names cannot contain more than four letters",
      "String values cannot be assigned to variables declared with let",
      "'class' is a valid variable name, and this code runs without error",
    ],
    correctIndexes: [0],
    explanation:
      "JavaScript reserves certain words, like class, function, if, and return, for language syntax, so they cannot be used as identifiers such as variable names.",
  },
  {
    id: "js-basics-3",
    question:
      "What does this code log? let age = 25; let Age = 30; console.log(age + ' ' + Age);",
    type: "single",
    options: [
      "25 30",
      "30 30",
      "25 25",
      "It throws an error because 'age' and 'Age' are considered the same variable",
    ],
    correctIndexes: [0],
    explanation:
      "JavaScript identifiers are case-sensitive, so 'age' and 'Age' are two completely distinct variables that can hold different values at the same time.",
  },
  {
    id: "js-basics-4",
    question:
      "Which of the following statements about JavaScript comments are true?",
    type: "multi",
    options: [
      "// starts a single-line comment that continues to the end of the line",
      "/* ... */ can span multiple lines",
      "Comments are ignored before the code runs and have no effect on program behavior",
      "A comment can appear only at the very start of a file, before any code",
    ],
    correctIndexes: [0, 1, 2],
    explanation:
      "JavaScript supports both single-line (//) and multi-line (/* */) comments, and since they are stripped out during parsing, they can be placed anywhere in the code without affecting how it runs.",
  },
  {
    id: "js-basics-5",
    question:
      "Which of the following statements about var and let are true?",
    type: "multi",
    options: [
      "A variable declared with var inside an if-block is still accessible outside that block, because var is function-scoped, not block-scoped",
      "A variable declared with let inside an if-block is not accessible outside that block, because let is block-scoped",
      "Declaring the same variable name twice with var in the same scope is allowed, while doing so with let throws a SyntaxError",
      "let and var are functionally identical in every situation, so switching between them never changes a program's behavior",
    ],
    correctIndexes: [0, 1, 2],
    explanation:
      "var ignores block boundaries and is scoped to the nearest function (or the global scope), while let (and const) are confined to the block they're declared in; var also tolerates redeclaration in the same scope, but let does not.",
  },
  {
    id: "js-basics-6",
    question:
      "What happens when this code runs? console.log(a); var a = 1; console.log(b); let b = 2;",
    type: "single",
    options: [
      "The first line logs undefined, and the second line throws a ReferenceError",
      "Both lines log undefined",
      "Both lines throw a ReferenceError",
      "The first line throws a ReferenceError, and the second logs undefined",
    ],
    correctIndexes: [0],
    explanation:
      "var declarations are hoisted and initialized with undefined before code runs, so 'a' exists but is undefined at that point; let declarations are hoisted too but remain in an inaccessible 'temporal dead zone' until their line executes, so accessing 'b' early throws a ReferenceError.",
  },
  {
    id: "js-basics-7",
    question:
      "What happens when this code runs? const x = 5; x = 10; console.log(x);",
    type: "single",
    options: [
      "It throws a TypeError, because a const binding cannot be reassigned after it's declared",
      "It logs 10",
      "It logs 5",
      "It logs undefined",
    ],
    correctIndexes: [0],
    explanation:
      "const creates a binding that cannot be reassigned to a new value; attempting to assign a new value to x throws 'TypeError: Assignment to constant variable.'",
  },
  {
    id: "js-basics-8",
    question:
      "What does this code log? const user = { name: 'Sam' }; user.name = 'Alex'; console.log(user.name);",
    type: "single",
    options: [
      "Alex",
      "Sam",
      "It throws a TypeError, because properties of a const object cannot be changed",
      "undefined",
    ],
    correctIndexes: [0],
    explanation:
      "const only prevents the variable binding itself from being reassigned to a different value; it does not freeze the object's contents, so properties of a const object can still be changed.",
  },
  {
    id: "js-basics-9",
    question:
      "What is the generally recommended approach for choosing between var, let, and const in modern JavaScript?",
    type: "single",
    options: [
      "Default to const for values that won't be reassigned, use let for values that will change, and avoid var due to its confusing function-scoping and hoisting behavior",
      "Always use var, since it works in the widest range of browsers and situations",
      "Always use const for everything, including variables you plan to reassign later",
      "Use let for every declaration and reserve const and var only for loops",
    ],
    correctIndexes: [0],
    explanation:
      "Modern style guides favor const by default, since it signals intent not to reassign, let when a value genuinely needs to change, and generally avoid var because its function-scoping and hoisting can lead to subtle bugs.",
  },
  {
    id: "js-basics-10",
    question: "Which of the following typeof results are correct?",
    type: "multi",
    options: [
      "typeof 'hello' is 'string'",
      "typeof 42 is 'number'",
      "typeof null is 'object'",
      "typeof undefined is 'string'",
    ],
    correctIndexes: [0, 1, 2],
    explanation:
      "typeof correctly reports 'string' and 'number' for those primitives, and famously, due to a long-standing bug preserved for compatibility, reports 'object' for null; typeof undefined actually returns 'undefined', not 'string'.",
  },
  {
    id: "js-basics-11",
    question:
      "What does this code log? let value = 10; value = 'ten'; console.log(typeof value);",
    type: "single",
    options: [
      "string",
      "number",
      "undefined",
      "It throws a TypeError because a variable's type cannot change after declaration",
    ],
    correctIndexes: [0],
    explanation:
      "JavaScript is dynamically typed, meaning a variable is not locked to the type of its first value; reassigning value to a string changes what typeof reports for it.",
  },
  {
    id: "js-basics-12",
    question:
      "Which of the following are primitive data types in JavaScript?",
    type: "multi",
    options: ["string", "boolean", "number", "array"],
    correctIndexes: [0, 1, 2],
    explanation:
      "string, boolean, and number are primitive types, along with undefined, null, symbol, and bigint; an array is an object, not a primitive.",
  },
  {
    id: "js-basics-13",
    question: "What does console.log(10 % 3, 2 ** 3); log?",
    type: "single",
    options: ["1 8", "3 6", "1 6", "3 8"],
    correctIndexes: [0],
    explanation:
      "The remainder operator % returns the leftover after division, and 10 divided by 3 leaves a remainder of 1; ** is the exponentiation operator, so 2 ** 3 is 2 raised to the third power, which is 8.",
  },
  {
    id: "js-basics-14",
    question:
      "A developer means to add 5 to x, but writes: let x = 10; x =+ 5; console.log(x); What does this log, and why?",
    type: "single",
    options: [
      "5, because =+ is parsed as a plain assignment (=) followed by a unary plus, not a += compound operator",
      "15, because =+ behaves exactly like +=",
      "It throws a SyntaxError, because =+ is not valid syntax",
      "10, because =+ has no effect on the variable",
    ],
    correctIndexes: [0],
    explanation:
      "There is no =+ operator in JavaScript; 'x =+ 5' is parsed as 'x = (+5)', which simply assigns the number 5 to x, a classic typo for the intended 'x += 5'.",
  },
  {
    id: "js-basics-15",
    question:
      "What does console.log(1 + 2 + '3', '1' + 2 + 3); log?",
    type: "single",
    options: ["33 123", "6 6", "123 123", "33 33"],
    correctIndexes: [0],
    explanation:
      "The + operator evaluates left to right: 1 + 2 first computes 3 (both numbers), and then 3 + '3' concatenates into the string '33'; but '1' + 2 immediately concatenates into '12' (a string), and '12' + 3 concatenates again into '123'.",
  },
  {
    id: "js-basics-16",
    question: "What does console.log('5' + 1, '5' - 1); log?",
    type: "single",
    options: ["51 4", "6 4", "51 -4", "6 -4"],
    correctIndexes: [0],
    explanation:
      "+ treats a string operand as a signal to concatenate, joining '5' and 1 into the string '51'; but - has no string-concatenation meaning, so JavaScript coerces '5' to the number 5 and computes 5 - 1 = 4.",
  },
  {
    id: "js-basics-17",
    question:
      "What does console.log(Number('42'), String(42), Boolean('0')); log?",
    type: "single",
    options: ["42 '42' true", "'42' 42 false", "42 '42' false", "NaN '42' true"],
    correctIndexes: [0],
    explanation:
      "Number('42') converts the numeric string to the number 42, String(42) converts the number to the string '42', and Boolean('0') is true because '0' is a non-empty string, and any non-empty string is truthy regardless of its content.",
  },
  {
    id: "js-basics-18",
    question:
      "Why is console.log generally preferred over alert for everyday debugging output in JavaScript?",
    type: "single",
    options: [
      "console.log prints to the browser's developer console without interrupting the page, while alert pops up a blocking dialog that pauses script execution until dismissed",
      "console.log can only display numbers, while alert can display any data type",
      "alert automatically formats objects and arrays for easier reading, while console.log cannot",
      "There is no real difference; both behave identically in every environment",
    ],
    correctIndexes: [0],
    explanation:
      "console.log writes output to the developer console for inspection without disrupting the user, whereas alert halts JavaScript execution and forces the user to dismiss a dialog, making it a disruptive, largely legacy way to surface information.",
  },
];
