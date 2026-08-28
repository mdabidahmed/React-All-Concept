import type { QuizQuestion } from "../../types/quiz";

export const jsObjectsArraysQuestions: QuizQuestion[] = [
  {
    id: "js-objects-arrays-1",
    question:
      "Given 'const user = { \"first-name\": \"Ana\", age: 30 };', why must you use bracket notation, 'user[\"first-name\"]', instead of dot notation to read the first property?",
    type: "single",
    options: [
      "Dot notation only works with property names that are valid identifiers (no spaces, hyphens, or leading numbers), while bracket notation accepts any string, including one with a hyphen like 'first-name'",
      "Dot notation and bracket notation are completely interchangeable in every situation, with no restrictions",
      "Bracket notation can only be used for reading array elements, never object properties",
      "Property names containing a hyphen are not allowed in JavaScript objects at all",
    ],
    correctIndexes: [0],
    explanation:
      "Dot notation requires the property name to be a valid identifier, so a name like 'first-name' (which JavaScript would otherwise parse as subtraction) must be accessed with bracket notation and a string key instead.",
  },
  {
    id: "js-objects-arrays-2",
    question:
      "When you call 'const ana = new Person(\"Ana\");' on 'function Person(name) { this.name = name; }', which of the following are true about what the 'new' keyword does?",
    type: "multi",
    options: [
      "It creates a brand-new empty object and sets 'this' inside the constructor to refer to that new object",
      "It links the new object's internal prototype to Person.prototype, so methods added there become available on 'ana'",
      "It automatically returns the newly created object from the constructor call, unless the constructor explicitly returns a different object",
      "It requires the constructor's name to start with a lowercase letter to work correctly",
    ],
    correctIndexes: [0, 1, 2],
    explanation:
      "'new' creates a fresh object, binds 'this' to it inside the constructor, links its prototype to the constructor's .prototype, and returns that object automatically (unless the constructor itself returns another object). Capitalizing constructor names, like Person, is only a convention, not a requirement enforced by the language.",
  },
  {
    id: "js-objects-arrays-3",
    question:
      "What is a likely consequence of calling 'Person(\"Ana\")' without the 'new' keyword, given 'function Person(name) { this.name = name; }' and the code running in non-strict mode?",
    type: "single",
    options: [
      "'this' inside the function refers to the global object instead of a new Person instance, so 'name' gets attached to the global object rather than creating a usable Person",
      "JavaScript automatically inserts 'new' for you, so the result is identical either way",
      "It throws a syntax error immediately, since constructor functions cannot be called without 'new'",
      "It correctly returns a new Person object, just without linking its prototype",
    ],
    correctIndexes: [0],
    explanation:
      "Without 'new', a regular function call sets 'this' according to normal call rules — in non-strict mode that means the global object — so 'this.name = name' pollutes the global object instead of building a new instance. In strict mode, 'this' would instead be undefined, causing an error when 'this.name' is accessed.",
  },
  {
    id: "js-objects-arrays-4",
    question:
      "What does the following log? 'const colors = [\"red\", \"green\", \"blue\"]; console.log(colors[colors.length - 1]);'",
    type: "single",
    options: [
      "'blue', because arrays are zero-indexed, so the last valid index is length minus 1",
      "'green', because length refers to the second-to-last position",
      "undefined, because colors.length - 1 is out of bounds",
      "3, because colors.length itself is logged",
    ],
    correctIndexes: [0],
    explanation:
      "Array indexes start at 0, so a 3-element array has valid indexes 0, 1, and 2; colors.length - 1 equals 2, which holds 'blue', the last element.",
  },
  {
    id: "js-objects-arrays-5",
    question:
      "Which of the following statements about push(), pop(), shift(), and unshift() are true?",
    type: "multi",
    options: [
      "push() adds one or more elements to the end of the array and returns the array's new length",
      "pop() removes the last element from the array and returns that removed element",
      "shift() adds a new element to the beginning of the array, similar to unshift()",
      "unshift() adds one or more elements to the beginning of the array and returns the array's new length",
    ],
    correctIndexes: [0, 1, 3],
    explanation:
      "push adds to the end, pop removes from the end, and unshift adds to the beginning — all mutating the array and returning either the new length or the removed element. shift() actually removes the first element (the opposite of what the third option claims); adding to the front is unshift's job.",
  },
  {
    id: "js-objects-arrays-6",
    question:
      "What is the key difference between 'arr.slice(1, 3)' and 'arr.splice(1, 2)'?",
    type: "single",
    options: [
      "slice() returns a shallow copy of a portion of the array without changing the original, while splice() removes (and optionally inserts) elements, mutating the original array in place and returning the removed elements",
      "Both methods mutate the original array identically; only the argument meaning differs",
      "slice() removes elements permanently from the original array, while splice() only ever returns a copy",
      "slice() and splice() are simply two different spellings of the exact same method",
    ],
    correctIndexes: [0],
    explanation:
      "slice() is non-mutating — it just returns a shallow copy of the requested range and leaves the source array untouched — while splice() mutates the array directly, removing (and optionally inserting) elements and returning whichever elements were removed.",
  },
  {
    id: "js-objects-arrays-7",
    question:
      "What does 'const a = [1, 2]; const b = [3, 4]; const c = a.concat(b); console.log(a, c);' log?",
    type: "single",
    options: [
      "[1, 2] then [1, 2, 3, 4] — concat() returns a brand-new merged array and leaves both original arrays unchanged",
      "[1, 2, 3, 4] then [1, 2, 3, 4] — concat() mutates 'a' to include 'b's elements too",
      "[1, 2] then [3, 4] — concat() has no effect unless its result is reassigned to 'a'",
      "An error, because concat() only works on strings",
    ],
    correctIndexes: [0],
    explanation:
      "concat() does not mutate either array; it builds and returns a new array that contains the elements of the original array followed by the elements of the argument array(s), so 'a' remains [1, 2] afterward.",
  },
  {
    id: "js-objects-arrays-8",
    question:
      "Which of the following statements about includes(), indexOf(), and find() are true?",
    type: "multi",
    options: [
      "arr.includes(value) returns a boolean, and unlike indexOf(), it can correctly detect the presence of NaN in the array",
      "arr.indexOf(value) returns the index of the first match, or -1 if the value is not found",
      "arr.find(callback) returns the index of the first element that satisfies the callback, exactly like indexOf() does",
      "arr.find(callback) returns undefined if no element in the array satisfies the callback",
    ],
    correctIndexes: [0, 1, 3],
    explanation:
      "includes() and indexOf() both check for a value's presence, but only includes() reliably finds NaN since indexOf() uses strict equality; find() is fundamentally different from indexOf() because it returns the actual matching element itself (or undefined if none match), not a numeric index.",
  },
  {
    id: "js-objects-arrays-9",
    question:
      "Which statement correctly contrasts forEach(), map(), and filter() when iterating over an array?",
    type: "single",
    options: [
      "forEach() returns undefined and is used purely for side effects, map() returns a new array of the same length with each element transformed, and filter() returns a new array containing only the elements that pass a test (possibly shorter than the original)",
      "All three methods return a new array of exactly the same length as the original",
      "forEach() and map() both mutate the original array in place, while filter() never does",
      "filter() and map() both return undefined, while forEach() is the only one that returns a new array",
    ],
    correctIndexes: [0],
    explanation:
      "These three iteration methods differ mainly in their return value: forEach() always returns undefined (used only for side effects), map() transforms every element into a new array of the same length, and filter() selectively keeps only elements matching a condition, so its result can be shorter. None of them mutate the original array.",
  },
  {
    id: "js-objects-arrays-10",
    question:
      "What does '[1, 2, 3, 4].reduce((acc, n) => acc + n, 0)' evaluate to?",
    type: "single",
    options: [
      "10, because reduce() runs the callback for each element, accumulating a single running total starting from the initial value 0",
      "[1, 2, 3, 4], the same array returned unchanged",
      "0, because the initial value is always the final result",
      "4, the length of the array",
    ],
    correctIndexes: [0],
    explanation:
      "reduce() applies the callback to each element in turn, carrying forward an accumulator ('acc') that starts at the given initial value (0 here); adding each number to the running total produces 1+2+3+4 = 10.",
  },
  {
    id: "js-objects-arrays-11",
    question:
      "What does 'console.log([10, 2, 1].sort());' log, and why might that be surprising?",
    type: "single",
    options: [
      "[1, 10, 2] — by default, sort() converts elements to strings and compares them lexicographically (character by character), so '10' sorts before '2' because '1' comes before '2'",
      "[1, 2, 10] — sort() always arranges numbers in correct ascending numeric order by default",
      "[10, 2, 1] — sort() leaves numeric arrays completely unchanged",
      "An error, because sort() cannot be used on arrays of numbers",
    ],
    correctIndexes: [0],
    explanation:
      "Without a comparator function, Array.prototype.sort() converts every element to a string and compares them as text, so numerically 10 ends up before 2 because the character '1' is 'less than' the character '2' — a classic gotcha for numeric arrays.",
  },
  {
    id: "js-objects-arrays-12",
    question:
      "How does '[10, 2, 1].sort((a, b) => a - b)' fix the default string-sorting surprise, and what does it log?",
    type: "single",
    options: [
      "[1, 2, 10] — the comparator returns a negative, zero, or positive number to tell sort() the correct numeric ordering, overriding the default string-based comparison",
      "[10, 2, 1] — passing a function to sort() has no effect on numbers",
      "[1, 10, 2] — the same surprising order as the default sort",
      "An error, because sort() only accepts a comparator for strings, not numbers",
    ],
    correctIndexes: [0],
    explanation:
      "A comparator function receives pairs of elements and returns a negative number to sort 'a' before 'b', positive to sort 'b' before 'a', or zero to keep their order; 'a - b' produces true ascending numeric order, fixing the string-comparison issue of the default sort.",
  },
  {
    id: "js-objects-arrays-13",
    question:
      "What does 'const [first, , third = 10] = [1, 2]; console.log(first, third);' log?",
    type: "single",
    options: [
      "1 10 — the middle element is skipped with an empty slot, and 'third' falls back to its default value of 10 since index 2 is undefined in the source array",
      "1 2 — the empty slot is ignored and 'third' just takes the next available value",
      "1 undefined — default values are not supported in array destructuring",
      "An error, because you cannot skip elements in array destructuring",
    ],
    correctIndexes: [0],
    explanation:
      "A blank spot between commas in array destructuring skips that position entirely; since the source array only has two elements, the third position is undefined, so 'third' falls back to its default value of 10.",
  },
  {
    id: "js-objects-arrays-14",
    question:
      "What does 'const { name: userName, age = 18 } = { name: \"Ana\" }; console.log(userName, age);' log?",
    type: "single",
    options: [
      "'Ana' 18 — 'name' is destructured into a differently-named variable 'userName', and 'age' falls back to its default of 18 since it's missing from the object",
      "undefined 18 — renaming during destructuring is not valid syntax",
      "'Ana' undefined — default values only work in array destructuring, not object destructuring",
      "An error, because 'name' and 'userName' don't match",
    ],
    correctIndexes: [0],
    explanation:
      "Object destructuring supports 'sourceKey: newVariableName' to rename a property while extracting it, and also supports default values with '= someValue' for properties that are missing or undefined on the source object.",
  },
  {
    id: "js-objects-arrays-15",
    question:
      "What does 'const original = { a: 1 }; const copy = { ...original, b: 2 }; console.log(copy, original);' log?",
    type: "single",
    options: [
      "{ a: 1, b: 2 } then { a: 1 } — the spread operator copies original's own properties into a new object, then adds b, leaving 'original' completely untouched",
      "{ a: 1, b: 2 } then { a: 1, b: 2 } — spreading also modifies the original object to match",
      "{ b: 2 } then { a: 1 } — spreading discards all of original's existing properties",
      "An error, because objects cannot be spread with '...', only arrays can",
    ],
    correctIndexes: [0],
    explanation:
      "The spread operator copies an object's own enumerable properties into a new object literal, which is useful for creating shallow copies or merging objects without mutating the source; 'original' is unaffected because 'copy' is an entirely separate object.",
  },
  {
    id: "js-objects-arrays-16",
    question:
      "What does 'const [first, ...rest] = [1, 2, 3, 4]; console.log(first, rest);' log?",
    type: "single",
    options: [
      "1 [2, 3, 4] — the rest pattern gathers all remaining elements after 'first' into a new array",
      "1 4 — rest just refers to the last element",
      "[1, 2, 3, 4] [] — 'first' captures everything and 'rest' is empty",
      "An error, because rest patterns can only be used with function parameters, not destructuring",
    ],
    correctIndexes: [0],
    explanation:
      "In destructuring, a rest pattern (...rest) must come last and collects whatever elements haven't already been picked off individually into a new array — here, everything after 'first' ends up in 'rest'.",
  },
  {
    id: "js-objects-arrays-17",
    question:
      "What does 'const nums = [1, 2, 2, 3, 3, 3]; const unique = [...new Set(nums)]; console.log(unique);' log?",
    type: "single",
    options: [
      "[1, 2, 3] — a Set automatically stores only unique values, and spreading it back into an array removes the duplicates",
      "[1, 2, 2, 3, 3, 3] — Sets do not actually remove duplicate values",
      "{1, 2, 3} — an object, not an array, since Set produces object output",
      "6 — the count of items originally in 'nums'",
    ],
    correctIndexes: [0],
    explanation:
      "A Set can only hold unique values, silently ignoring duplicates when they're added; spreading a Set back into an array literal is a common, concise way to deduplicate an array.",
  },
  {
    id: "js-objects-arrays-18",
    question:
      "What is a key advantage of a Map over a plain object for storing key-value pairs?",
    type: "single",
    options: [
      "A Map can use any value as a key, including objects and functions, while plain object keys are always coerced to strings (or symbols)",
      "A Map can only store string keys, making it stricter and safer than plain objects",
      "A Map cannot be iterated over, while plain objects can always be looped through directly",
      "A plain object automatically tracks its own size, while a Map does not",
    ],
    correctIndexes: [0],
    explanation:
      "Plain objects implicitly convert any non-symbol key to a string, so an object or function used as a key gets turned into something like '[object Object]'; a Map preserves the original key of any type, and also offers a direct .size property and reliable insertion-order iteration.",
  },
  {
    id: "js-objects-arrays-19",
    question:
      "Which of the following statements about JSON.stringify() and JSON.parse() are true?",
    type: "multi",
    options: [
      "JSON.stringify(obj) converts a JavaScript value into a JSON-formatted string, and JSON.parse(str) converts that string back into a JavaScript value",
      "Properties whose value is a function or undefined are simply omitted from the output when an object is passed to JSON.stringify()",
      "JSON.stringify() preserves functions in the output by converting them to a string representation of their source code",
      "JSON.parse() can turn a valid JSON string back into an object with the same shape it had before it was stringified",
    ],
    correctIndexes: [0, 1, 3],
    explanation:
      "stringify/parse form a round trip between JS values and JSON text, but JSON has no concept of functions, so any property holding a function (or the value undefined) is dropped entirely from the stringified output rather than being preserved in any form.",
  },
  {
    id: "js-objects-arrays-20",
    question:
      "What does 'const d = new Date(2024, 0, 15); console.log(d.getMonth());' log, and why?",
    type: "single",
    options: [
      "0 — getMonth() is zero-indexed, so January is represented as 0, February as 1, and so on up through November as 11",
      "1 — getMonth() returns a human-friendly 1-based month number matching the calendar",
      "2024 — getMonth() actually returns the year, not the month",
      "15 — getMonth() returns the day of the month, not the month itself",
    ],
    correctIndexes: [0],
    explanation:
      "JavaScript's Date methods use zero-indexed months, so new Date(2024, 0, 15) constructs January 15, 2024, and calling getMonth() on it returns 0 rather than 1 — a frequent source of off-by-one bugs when displaying or comparing dates.",
  },
];
