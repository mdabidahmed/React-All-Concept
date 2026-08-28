import type { QuizQuestion } from "../../types/quiz";

export const jsFunctionsQuestions: QuizQuestion[] = [
  {
    id: "js-functions-1",
    question:
      "What is the key difference between a function declaration, like 'function greet() { }', and a function expression, like 'const greet = function() { };'?",
    type: "single",
    options: [
      "Function declarations are hoisted with their full body, so they can be called before they appear in the code, while function expressions are not usable before the line where they are assigned",
      "Function expressions are hoisted with their full body, while function declarations can never be hoisted",
      "There is no difference; both are hoisted identically and can be called before their definition",
      "Function declarations cannot be assigned to a variable, while function expressions always must be",
    ],
    correctIndexes: [0],
    explanation:
      "Function declarations are hoisted completely, including their body, so calling one earlier in the file works fine. A function expression only creates the function when that line of code runs, so referencing the variable earlier either throws (let/const) or is undefined (var).",
  },
  {
    id: "js-functions-2",
    question:
      "In 'function add(a, b) { return a + b; } add(2, 3);', what are 'a' and 'b' called, versus the values '2' and '3'?",
    type: "single",
    options: [
      "'a' and 'b' are parameters, the named placeholders in the function definition; '2' and '3' are arguments, the actual values passed in when the function is called",
      "'a' and 'b' are arguments and '2' and '3' are parameters",
      "Both pairs are called arguments; 'parameter' is an outdated term no longer used in JavaScript",
      "'a' and 'b' are local variables that must be declared with let before use, unlike '2' and '3'",
    ],
    correctIndexes: [0],
    explanation:
      "Parameters are the names listed in a function's definition, acting as placeholders; arguments are the concrete values supplied at call time that get assigned to those parameters.",
  },
  {
    id: "js-functions-3",
    question:
      "What does the following log? 'function greet(name = \"Guest\") { console.log(name); } greet();'",
    type: "single",
    options: [
      "'Guest'",
      "undefined",
      "An error is thrown because greet() was called without an argument",
      "An empty string",
    ],
    correctIndexes: [0],
    explanation:
      "Default parameters supply a fallback value only when an argument is omitted (or explicitly passed as undefined); since greet() is called with no argument, 'name' falls back to 'Guest'.",
  },
  {
    id: "js-functions-4",
    question:
      "What does the following log? 'function sum(...nums) { console.log(nums); } sum(1, 2, 3);'",
    type: "single",
    options: [
      "[1, 2, 3], because the rest parameter gathers every remaining argument into a real array",
      "3, because ...nums only keeps the last argument",
      "'1,2,3' as a single joined string",
      "An object like { 0: 1, 1: 2, 2: 3 } rather than an array",
    ],
    correctIndexes: [0],
    explanation:
      "A rest parameter (...nums) collects all remaining arguments passed to the function into a genuine array, so sum(1, 2, 3) logs [1, 2, 3], and array methods like map or reduce work directly on it.",
  },
  {
    id: "js-functions-5",
    question:
      "Which of the following statements about rest parameters (e.g. '...args') compared to the older 'arguments' object are true?",
    type: "multi",
    options: [
      "A rest parameter produces a real Array, so methods like .map() or .filter() can be called on it directly",
      "The 'arguments' object is array-like but not a true Array, so array methods must be borrowed or it must be converted first",
      "Arrow functions have their own 'arguments' object, separate from any enclosing function",
      "A rest parameter must be the last parameter in a function's parameter list",
    ],
    correctIndexes: [0, 1, 3],
    explanation:
      "Rest parameters create genuine arrays and must come last in the parameter list, while 'arguments' is only array-like. Arrow functions do not have their own 'arguments' object at all — inside an arrow function, 'arguments' refers to the nearest enclosing regular function's, if any.",
  },
  {
    id: "js-functions-6",
    question:
      "What does 'const double = n => n * 2; console.log(double(5));' log, and why?",
    type: "single",
    options: [
      "10, because an arrow function with a single expression body implicitly returns that expression's value without needing the 'return' keyword",
      "undefined, because arrow functions never return a value unless curly braces are used",
      "'n * 2' as a literal string",
      "A syntax error, because arrow functions require parentheses around a single parameter",
    ],
    correctIndexes: [0],
    explanation:
      "When an arrow function's body is a single expression written without curly braces, that expression's value is returned automatically, so double(5) evaluates 5 * 2 and returns 10.",
  },
  {
    id: "js-functions-7",
    question:
      "A developer writes 'const makeUser = name => { name: name };' hoping it returns an object, but 'console.log(makeUser(\"Ana\"))' logs 'undefined'. What went wrong?",
    type: "single",
    options: [
      "The curly braces are being parsed as a function body block (with 'name:' read as a label), not as an object literal, so nothing is explicitly returned; wrapping it in parentheses, like '({ name: name })', fixes it",
      "Arrow functions are physically incapable of ever returning an object",
      "The parameter name 'name' conflicts with a reserved JavaScript keyword and silently fails",
      "'makeUser' needs to be declared with 'function' instead of 'const' for this to work",
    ],
    correctIndexes: [0],
    explanation:
      "Curly braces right after the arrow are always treated as the start of a function body, so { name: name } is parsed as a block containing a labeled statement, and the function returns undefined. Wrapping the object in parentheses, ({ name: name }), tells JavaScript to treat it as an expression to return.",
  },
  {
    id: "js-functions-8",
    question:
      "Why do arrow functions behave differently from regular functions when it comes to the 'this' keyword?",
    type: "single",
    options: [
      "An arrow function does not have its own 'this' binding; it captures 'this' lexically from the scope where it was defined, and that value never changes no matter how the arrow function is later called",
      "An arrow function always sets 'this' to the global object, regardless of where it is defined",
      "An arrow function's 'this' is re-evaluated fresh on every single call, exactly like a regular function",
      "Arrow functions are identical to regular functions in every way, including how 'this' is determined",
    ],
    correctIndexes: [0],
    explanation:
      "Regular functions get their own 'this', determined by how they're called; arrow functions have no 'this' of their own and instead simply use the 'this' value from their surrounding (lexical) scope at the time they were defined.",
  },
  {
    id: "js-functions-9",
    question:
      "What does the following log? 'const timer = { seconds: 10, start: function() { setTimeout(() => { console.log(this.seconds); }, 0); } }; timer.start();'",
    type: "single",
    options: [
      "10, because the arrow function passed to setTimeout has no 'this' of its own, so it uses 'this' from the enclosing 'start' method, where 'this' is 'timer'",
      "undefined, because arrow functions can never access properties through 'this'",
      "10, purely by coincidence unrelated to how 'this' works",
      "An error, because setTimeout cannot accept an arrow function as its callback",
    ],
    correctIndexes: [0],
    explanation:
      "Because the callback is an arrow function, it doesn't create its own 'this' — it inherits 'this' from the surrounding 'start' method, which was called as timer.start(), so 'this' there is timer and this.seconds is 10. A regular function passed to setTimeout would instead have 'this' default to undefined (in strict mode) or the global object.",
  },
  {
    id: "js-functions-10",
    question:
      "How does 'greet.call(person, \"Hello\")' differ from 'greet.apply(person, [\"Hello\"])'?",
    type: "single",
    options: [
      "They do the same thing — both immediately invoke 'greet' with 'this' set to 'person' — but call() takes arguments individually while apply() takes them bundled in an array",
      "call() invokes the function immediately, while apply() only returns a new function without calling it",
      "apply() can only be used with arrow functions, while call() only works with regular functions",
      "call() sets 'this' to 'person', while apply() ignores the first argument entirely",
    ],
    correctIndexes: [0],
    explanation:
      "Both call() and apply() invoke the function right away with a specified 'this' value; the only difference is how the remaining arguments are supplied — call() lists them one by one, while apply() takes a single array of arguments.",
  },
  {
    id: "js-functions-11",
    question:
      "What makes 'bind()' different from 'call()' and 'apply()'?",
    type: "single",
    options: [
      "bind() does not invoke the function immediately; instead it returns a new function with 'this' (and optionally some leading arguments) permanently locked in, ready to be called later",
      "bind() invokes the function immediately and permanently changes the original function's 'this' for every future call",
      "bind() can only be used on arrow functions",
      "bind() behaves exactly like call(), just with a different name",
    ],
    correctIndexes: [0],
    explanation:
      "call() and apply() both call the function right away, but bind() instead returns a brand-new function with 'this' fixed to whatever was passed in, which is especially useful for event handlers or callbacks that need a specific 'this' when they eventually run.",
  },
  {
    id: "js-functions-12",
    question:
      "Which of the following statements about call(), apply(), and bind() are true?",
    type: "multi",
    options: [
      "call() and apply() both invoke the function immediately, while bind() returns a new function for later use",
      "apply() accepts its extra arguments as a single array, while call() accepts them as a comma-separated list",
      "All three methods can be used to explicitly set what 'this' refers to inside a function",
      "bind() permanently mutates the original function, so calling the original function afterward also uses the new 'this'",
    ],
    correctIndexes: [0, 1, 2],
    explanation:
      "call, apply, and bind all let you explicitly control 'this'; call and apply differ only in how they pass extra arguments (list vs array) and invoke right away, while bind returns a new, separate function and leaves the original function completely untouched.",
  },
  {
    id: "js-functions-13",
    question:
      "What does the following log? 'function makeCounter() { let count = 0; return function() { count += 1; return count; }; } const counter = makeCounter(); console.log(counter()); console.log(counter());'",
    type: "single",
    options: [
      "1 then 2, because the inner function forms a closure that keeps a persistent reference to 'count' from makeCounter's scope across calls",
      "1 then 1, because each call to counter() re-creates 'count' from scratch",
      "undefined then undefined, because 'count' goes out of scope as soon as makeCounter() returns",
      "An error, because 'count' cannot be accessed outside of makeCounter",
    ],
    correctIndexes: [0],
    explanation:
      "A closure lets an inner function keep access to variables from the scope it was created in, even after the outer function has returned. Here, 'counter' keeps referencing the same 'count' variable, so each call increments and remembers its new value.",
  },
  {
    id: "js-functions-14",
    question:
      "How can closures be used to create 'private' data in JavaScript, given that the language has no true private variables at the function level?",
    type: "single",
    options: [
      "A variable declared inside an outer function is only reachable by inner functions defined within it; if those inner functions are returned or exposed, outside code can interact with the variable only through them, never by referencing it directly",
      "By declaring the variable with a special 'private' keyword that blocks all outside access",
      "Closures make it impossible for any code, inside or outside the function, to ever change the variable's value",
      "Private data requires a class with a '#' prefixed field; closures cannot achieve anything similar",
    ],
    correctIndexes: [0],
    explanation:
      "Because a variable declared inside a function is only visible within that function's scope, wrapping it with inner functions (like getters/setters) that get returned lets outside code interact with it indirectly, without ever being able to reach in and reference the variable itself, effectively simulating private state.",
  },
  {
    id: "js-functions-15",
    question:
      "What does the following log? 'for (var i = 0; i < 3; i++) { setTimeout(() => console.log(i), 0); }'",
    type: "single",
    options: [
      "3, 3, 3 — because 'var' is function-scoped (not block-scoped), so all three callbacks share the exact same 'i', whose final value is 3 by the time they run",
      "0, 1, 2 — because each iteration of the loop automatically gets its own separate 'i'",
      "0, 0, 0 — because setTimeout always runs with the value 'i' had on the very first iteration",
      "A syntax error, because 'var' cannot be used inside a for loop",
    ],
    correctIndexes: [0],
    explanation:
      "Because 'var' creates one single variable shared across every loop iteration, all three arrow functions close over that same 'i'. By the time the callbacks actually run (after the loop finishes), 'i' has already reached 3. Replacing 'var' with 'let' fixes this, since 'let' creates a fresh binding of 'i' for each iteration, logging 0, 1, 2 instead.",
  },
  {
    id: "js-functions-16",
    question:
      "Which of the following statements about JavaScript scope and hoisting are true?",
    type: "multi",
    options: [
      "Declaring a variable with 'var' inside an 'if' block makes it scoped to that block only, exactly like 'let' or 'const' would",
      "A function declared with 'function greet() { }' can be called before its definition appears in the code, because the whole function, including its body, is hoisted",
      "A variable declared with 'var' is hoisted and accessible (as undefined) before its declaration line runs, whereas a 'let' or 'const' variable is hoisted into a 'temporal dead zone' and throws a ReferenceError if accessed before its declaration line",
      "Global scope means code inside any function, while function scope means code accessible from anywhere in the file",
    ],
    correctIndexes: [1, 2],
    explanation:
      "'var' ignores block boundaries and is only confined by function scope, so option one is false — var 'leaks' out of if-blocks and loops. Function declarations are fully hoisted and callable early, and while var is hoisted and initialized to undefined, let/const are hoisted but remain unusable in the temporal dead zone until their declaration executes. The last option has the definitions of global and function scope backwards.",
  },
];
