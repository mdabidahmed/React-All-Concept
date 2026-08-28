import type { QuizQuestion } from "../../types/quiz";

export const jsStringsNumbersQuestions: QuizQuestion[] = [
  {
    id: "js-strings-numbers-1",
    question:
      "Strings in JavaScript are immutable. If you run: let name = 'Sam'; name[0] = 'P'; console.log(name); what is logged, and why?",
    type: "single",
    options: [
      "'Sam', because strings cannot be changed in place — indexed assignment on a string silently does nothing",
      "'Pam', because bracket notation lets you reassign individual characters of a string",
      "An error is thrown, because assigning to a string index is illegal syntax",
      "'undefined', because indexing into a string only works for reading, never writing, and clears the variable",
    ],
    correctIndexes: [0],
    explanation:
      "Strings are immutable in JavaScript, so 'name[0] = \"P\"' has no effect; to get a changed string you must build a new one, for example with slicing or replace(), and assign that new string back to the variable.",
  },
  {
    id: "js-strings-numbers-2",
    question:
      "Given const text = 'JavaScript'; what does text.slice(-6, -3) return?",
    type: "single",
    options: [
      "'Scr'",
      "'Script'",
      "'Java'",
      "undefined, because negative indexes are not allowed in slice()",
    ],
    correctIndexes: [0],
    explanation:
      "Negative indexes count backwards from the end of the string, so -6 lands on index 4 ('S') and -3 lands on index 7; slice() extracts up to but not including the end index, giving 'Scr'. substring() would instead treat negative arguments as 0.",
  },
  {
    id: "js-strings-numbers-3",
    question:
      "let word = '  code  '; let shout = word.trim().toUpperCase(); console.log(word); console.log(shout); What is logged?",
    type: "single",
    options: [
      "'  code  ' then 'CODE', because trim() and toUpperCase() both return new strings without modifying the original",
      "'code' then 'CODE', because trim() permanently removes the original string's whitespace",
      "'  CODE  ' then '  CODE  ', because toUpperCase() is applied directly to word",
      "An error, since toUpperCase() cannot be chained after trim()",
    ],
    correctIndexes: [0],
    explanation:
      "Every string method, including trim() and toUpperCase() (and toLowerCase()), returns a brand-new string rather than modifying the original, so 'word' keeps its original spacing and case while 'shout' holds the fully transformed result.",
  },
  {
    id: "js-strings-numbers-4",
    question:
      "const msg = 'cat bat cat'; console.log(msg.replace('cat', 'dog')); console.log(msg.replaceAll('cat', 'dog')); What is logged?",
    type: "single",
    options: [
      "'dog bat cat' then 'dog bat dog'",
      "'dog bat dog' then 'dog bat dog'",
      "'dog bat cat' then 'dog bat cat'",
      "'cat bat cat' then 'dog bat dog', because replace() requires a regular expression to work at all",
    ],
    correctIndexes: [0],
    explanation:
      "replace() with a plain string argument only replaces the first match it finds, while replaceAll() replaces every occurrence; neither method mutates the original string 'msg'.",
  },
  {
    id: "js-strings-numbers-5",
    question:
      "Given const csv = 'red,green,blue'; which of the following are true?",
    type: "multi",
    options: [
      "csv.split(',') returns ['red', 'green', 'blue']",
      "csv.includes('green') is true",
      "csv.startsWith('Red') is true, because startsWith() ignores letter case by default",
      "csv.endsWith('blue') is true",
    ],
    correctIndexes: [0, 1, 3],
    explanation:
      "split(',') breaks the string into an array wherever a comma appears, and includes()/endsWith() perform case-sensitive substring checks that correctly find 'green' and confirm the string ends with 'blue'. startsWith() is also case-sensitive, so checking for 'Red' (capital R) against the lowercase 'red' at the start returns false, not true.",
  },
  {
    id: "js-strings-numbers-6",
    question:
      "Using a template literal written as: Name: ${name}, next year: ${age + 1} (the whole thing enclosed in backticks), where name = 'Ada' and age = 30, what does console.log output?",
    type: "single",
    options: [
      "'Name: Ada, next year: 31'",
      "'Name: ${name}, next year: ${age + 1}', printed literally, because interpolation only works inside single or double quotes",
      "'Name: Ada, next year: age + 1'",
      "An error, because expressions like age + 1 cannot appear inside ${}",
    ],
    correctIndexes: [0],
    explanation:
      "Inside a template literal (a backtick string), any expression written between ${ and } is evaluated and its result is inserted into the string, so ${name} becomes 'Ada' and ${age + 1} becomes 31.",
  },
  {
    id: "js-strings-numbers-7",
    question:
      "Which of the following statements about template literals (backtick strings) are true?",
    type: "multi",
    options: [
      "They can span multiple lines with literal line breaks, unlike single- or double-quoted strings which throw a syntax error if you press Enter inside them",
      "They can embed expressions using ${...} syntax, and the result is converted to a string and inserted",
      "They are delimited with a single quote (') instead of a backtick",
      "Expressions written inside ${} are treated as plain text and are never evaluated",
    ],
    correctIndexes: [0, 1],
    explanation:
      "Template literals are delimited by backticks and support two things regular quoted strings lack: literal multi-line text without any escape sequence, and ${} interpolation, which evaluates the expression inside and inserts its result into the string.",
  },
  {
    id: "js-strings-numbers-8",
    question:
      "Unlike some languages that have separate int and float types, how does JavaScript represent numbers like 4 and 4.5?",
    type: "single",
    options: [
      "Both are the same 'number' type, stored as double-precision floating-point values — there is no separate integer type for ordinary numbers",
      "4 is stored as an integer type and 4.5 as a separate float type, and typeof reveals the difference",
      "JavaScript stores 4 as a string internally until it's used in arithmetic",
      "Numbers without a decimal point are automatically converted to BigInt",
    ],
    correctIndexes: [0],
    explanation:
      "JavaScript has a single 'number' type for all ordinary numbers, whole or fractional, implemented as IEEE 754 double-precision floats; typeof 4 and typeof 4.5 both return 'number'.",
  },
  {
    id: "js-strings-numbers-9",
    question:
      "What does console.log(0.1 + 0.2) print in JavaScript, and how would you get a clean '0.3' for display?",
    type: "single",
    options: [
      "0.30000000000000004, due to floating-point rounding error; calling .toFixed(1) on the result formats it for display as '0.3'",
      "0.3, exactly, because JavaScript rounds decimal arithmetic automatically",
      "An error, because 0.1 and 0.2 cannot be added directly and must first be converted with Number()",
      "NaN, because floating-point addition of two decimals is not supported",
    ],
    correctIndexes: [0],
    explanation:
      "Because numbers are stored in binary floating-point, some decimal fractions like 0.1 and 0.2 cannot be represented exactly, so their sum carries a tiny rounding error; toFixed(n) rounds a number to n decimal places and returns it as a string, which is the standard fix for display purposes.",
  },
  {
    id: "js-strings-numbers-10",
    question: "Which of the following statements about NaN are true?",
    type: "multi",
    options: [
      "NaN !== NaN, so comparing a value to itself with === cannot be used to detect NaN",
      "typeof NaN is 'number', even though the name means 'Not a Number'",
      "isNaN('hello') returns true because isNaN() coerces its argument to a number first, while Number.isNaN('hello') returns false because it does not coerce",
      "NaN is a value that only appears when dividing a number by zero",
    ],
    correctIndexes: [0, 1, 2],
    explanation:
      "NaN is the one value in JavaScript that is never equal to itself, and its type is still 'number'. The global isNaN() converts its argument to a number before checking, so isNaN('hello') is true, whereas Number.isNaN() only returns true for the actual NaN value without coercion; NaN also arises from other invalid operations, like 0/0 or Number('abc'), not just division by zero (which instead produces Infinity or -Infinity).",
  },
  {
    id: "js-strings-numbers-11",
    question:
      "Math.random() returns a floating-point number in the range [0, 1). What expression correctly produces a random integer between 1 and 6 (inclusive), like a dice roll?",
    type: "single",
    options: [
      "Math.floor(Math.random() * 6) + 1",
      "Math.round(Math.random() * 6)",
      "Math.random() * 6",
      "Math.ceil(Math.random()) + 6",
    ],
    correctIndexes: [0],
    explanation:
      "Math.random() * 6 produces a decimal from 0 up to (but not including) 6; Math.floor() truncates it down to a whole number from 0 to 5, and adding 1 shifts the range to 1 through 6. Using Math.round() on the same expression would skew the distribution, landing on 0 and 6 only about half as often as the middle values.",
  },
  {
    id: "js-strings-numbers-12",
    question:
      "Which of the following statements about the Math object are true?",
    type: "multi",
    options: [
      "Math.floor(4.7) returns 4, always rounding down regardless of the decimal portion",
      "Math.ceil(4.2) returns 4, always rounding down to the nearest whole number",
      "Math.max(3, 7, 2) returns 7, and Math.min(3, 7, 2) returns 2",
      "Math.pow(2, 3) and 2 ** 3 both evaluate to 8, and Math.sqrt(64) evaluates to 8",
    ],
    correctIndexes: [0, 2, 3],
    explanation:
      "Math.floor() always rounds down to the nearest integer, so Math.floor(4.7) is 4; Math.ceil() always rounds up, so Math.ceil(4.2) is 5, not 4, which makes that statement false. Math.max()/Math.min() find the largest/smallest of their arguments, and Math.pow(2, 3) (like the exponent operator 2 ** 3) and Math.sqrt(64) both correctly evaluate to 8.",
  },
];
