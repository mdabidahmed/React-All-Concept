import type { QuizQuestion } from "../../types/quiz";

export const jsBrowserModernQuestions: QuizQuestion[] = [
  {
    id: "js-browser-modern-1",
    question:
      "What does the BOM (Browser Object Model) refer to, and how does it differ from the DOM?",
    type: "single",
    options: [
      "The BOM represents the browser itself (window, navigator, location, history, screen), while the DOM represents the structure and content of the loaded page",
      "The BOM and DOM are two different names for exactly the same set of objects",
      "The BOM only exists in older browsers and has no equivalent in modern ones",
      "The BOM represents page content like <div> and <p> elements, while the DOM represents the browser window",
    ],
    correctIndexes: [0],
    explanation:
      "The Browser Object Model (BOM) exposes browser-level features such as the window, navigator, location, history, and screen objects, whereas the Document Object Model (DOM) represents the actual HTML content of the page loaded inside that browser window.",
  },
  {
    id: "js-browser-modern-2",
    question:
      "Which of the following are part of the BOM rather than the DOM?",
    type: "multi",
    options: [
      "navigator (browser and device information)",
      "location (the current URL, with methods to navigate)",
      "document.body (the page's <body> element)",
      "history (the browser's session navigation history)",
    ],
    correctIndexes: [0, 1, 3],
    explanation:
      "navigator, location, and history are all BOM objects describing the browser environment itself; document.body belongs to the DOM because it represents actual page content, not the browser.",
  },
  {
    id: "js-browser-modern-3",
    question: "What does calling history.back() do?",
    type: "single",
    options: [
      "Navigates the browser to the previous page in the user's session history, the same as clicking the browser's back button",
      "Reloads the current page from the server",
      "Deletes the browser's entire history for that session",
      "Navigates forward to the next page, if one exists",
    ],
    correctIndexes: [0],
    explanation:
      "history.back() moves one step backward through the session history stack, equivalent to the user manually clicking the browser's back button; history.forward() does the opposite.",
  },
  {
    id: "js-browser-modern-4",
    question:
      "What is the key difference between localStorage and sessionStorage?",
    type: "single",
    options: [
      "localStorage persists even after the browser is closed and reopened, while sessionStorage is cleared when its tab or window is closed",
      "sessionStorage persists across browser restarts, while localStorage is cleared after each page reload",
      "They are identical in every way except for the name used to access them",
      "localStorage can only store numbers, while sessionStorage can store any data type",
    ],
    correctIndexes: [0],
    explanation:
      "Both share the same API, but localStorage data survives indefinitely (until explicitly cleared), even across browser restarts, while sessionStorage data is scoped to a single tab and disappears once that tab is closed.",
  },
  {
    id: "js-browser-modern-5",
    question:
      "What is logged by the following code? localStorage.setItem('user', 'Alex'); console.log(localStorage.getItem('user')); localStorage.removeItem('user'); console.log(localStorage.getItem('user'));",
    type: "single",
    options: [
      "'Alex' then null — removeItem deletes the key, and getItem returns null for a missing key",
      "'Alex' then 'Alex' — removeItem does not actually delete anything until the page reloads",
      "null then 'Alex' — setItem does not take effect until the next line runs",
      "'Alex' then undefined — a removed key becomes undefined, not null",
    ],
    correctIndexes: [0],
    explanation:
      "setItem stores the string, the first getItem retrieves it ('Alex'), removeItem deletes that key, and getItem on a missing key returns null (not undefined).",
  },
  {
    id: "js-browser-modern-6",
    question:
      "What happens when you run localStorage.setItem('data', { a: 1 }) and later read it back with localStorage.getItem('data')?",
    type: "single",
    options: [
      "It returns the string '[object Object]', because localStorage only stores strings and the object is automatically coerced to a string",
      "It returns the original object { a: 1 }, fully restored with correct types",
      "It throws a TypeError because objects cannot be passed to setItem",
      "It returns null, because non-string values are silently discarded",
    ],
    correctIndexes: [0],
    explanation:
      "Web Storage only stores strings, so any non-string value passed to setItem is coerced with toString(), and for a plain object that produces the unhelpful '[object Object]'; to store structured data properly, use JSON.stringify() before saving and JSON.parse() after reading it back.",
  },
  {
    id: "js-browser-modern-7",
    question: "What does /^[0-9]+$/.test('abc123') return, and why?",
    type: "single",
    options: [
      "false, because the ^ and $ anchors require the entire string to consist only of digits, but 'abc123' contains letters",
      "true, because the string contains at least one digit somewhere",
      "true, because .test() only checks the first character of the string",
      "false, because .test() always requires the g flag to work correctly",
    ],
    correctIndexes: [0],
    explanation:
      "The ^ and $ anchors mean the pattern must match from the very start to the very end of the string; since [0-9]+ only allows digits, the letters in 'abc123' make the whole string fail to match, so test() returns false.",
  },
  {
    id: "js-browser-modern-8",
    question: "What does 'Hello World'.replace(/o/g, '0') return?",
    type: "single",
    options: [
      "'Hell0 W0rld' — the g flag makes replace() substitute every matching occurrence of 'o', not just the first",
      "'Hell0 World' — replace() only ever changes the first match, even with the g flag",
      "'HELLO WORLD' — the regex accidentally matches the whole string",
      "'Hello World' — replace() requires a plain string as its first argument, not a regex, so nothing changes",
    ],
    correctIndexes: [0],
    explanation:
      "Without the g (global) flag, String.replace() only replaces the first match, but with /o/g it replaces every occurrence of 'o' in the string, turning 'Hello World' into 'Hell0 W0rld'.",
  },
  {
    id: "js-browser-modern-9",
    question:
      "What kind of strings does the regular expression /^\\d{3}-\\d{4}$/ match?",
    type: "single",
    options: [
      "Strings made of exactly 3 digits, a hyphen, then exactly 4 digits, such as '555-1234', and nothing else",
      "Any string that merely contains a hyphen somewhere",
      "Strings with exactly 3 letters followed by 4 letters",
      "Any 7-character string, regardless of what characters it contains",
    ],
    correctIndexes: [0],
    explanation:
      "\\d{3} matches exactly three digits, - matches a literal hyphen, and \\d{4} matches exactly four digits; combined with the ^ and $ anchors, the whole string must be in that exact 3-digit/hyphen/4-digit shape, like a short local phone number.",
  },
  {
    id: "js-browser-modern-10",
    question:
      "Which statements about browser console methods are correct?",
    type: "multi",
    options: [
      "console.table() displays array or object data in a formatted, readable table",
      "console.error() prints a message styled as an error, often including a stack trace, without stopping code execution",
      "console.warn() throws an actual JavaScript error that must be caught with try/catch",
      "console.log() is the only console method that can accept multiple comma-separated arguments",
    ],
    correctIndexes: [0, 1],
    explanation:
      "console.table() is useful for visualizing arrays and objects as a table, and console.error() (like console.warn()) merely prints a styled message and does not throw or halt execution; nearly all console methods, not just log(), accept multiple comma-separated arguments.",
  },
  {
    id: "js-browser-modern-11",
    question:
      "When a browser console shows an error with a stack trace listing several function names and line numbers, what is the most useful way to read it?",
    type: "single",
    options: [
      "Start from the top entry, where the error was thrown, and read downward through the calling functions to trace how execution reached that point",
      "Ignore the stack trace entirely, since only the error message text is ever useful",
      "Read it from the bottom entry upward, since the top entry is always irrelevant browser internals",
      "The line numbers in a stack trace are randomly generated and cannot be trusted",
    ],
    correctIndexes: [0],
    explanation:
      "A stack trace lists function calls from most recent (top, where the error occurred) to least recent (bottom, the original call site), so reading top-to-bottom shows exactly which chain of function calls led to the error, which is invaluable for locating the bug.",
  },
  {
    id: "js-browser-modern-12",
    question:
      "Which of the following are considered good JavaScript practices?",
    type: "multi",
    options: [
      "Declaring variables with const by default, switching to let only when a value truly needs to be reassigned",
      "Using === and !== instead of == and != to avoid unexpected type coercion",
      "Attaching many variables directly to the global object so any function can access them easily",
      "Writing very long functions that each handle many unrelated responsibilities, to minimize the number of functions in a file",
    ],
    correctIndexes: [0, 1],
    explanation:
      "Preferring const communicates intent and prevents accidental reassignment, and === avoids surprising bugs from type coercion (like '0' == 0 being true); relying on global variables and writing large multi-purpose functions are common beginner mistakes that make code harder to test, debug, and reuse.",
  },
  {
    id: "js-browser-modern-13",
    question:
      "Given const user = { profile: null };, what does user.profile?.name evaluate to?",
    type: "single",
    options: [
      "undefined — optional chaining short-circuits and returns undefined as soon as it hits a null or undefined value, instead of throwing",
      "It throws a TypeError, because 'name' does not exist on null",
      "null — it returns whatever the nullish property itself was set to",
      "An empty string, since accessing a property on null defaults to ''",
    ],
    correctIndexes: [0],
    explanation:
      "Optional chaining (?.) checks each step and, if the value before it is null or undefined, stops immediately and returns undefined rather than throwing; here, since user.profile is null, user.profile?.name short-circuits to undefined without ever trying to read .name.",
  },
  {
    id: "js-browser-modern-14",
    question:
      "Given const count = 0;, what is the difference between (count || 10) and (count ?? 10)?",
    type: "single",
    options: [
      "(count || 10) evaluates to 10 because 0 is falsy, while (count ?? 10) evaluates to 0 because ?? only falls back on null or undefined, not on other falsy values",
      "Both expressions evaluate to 10, since 0 is treated as nullish by both operators",
      "Both expressions evaluate to 0, since neither operator treats 0 as a trigger for the fallback",
      "(count || 10) evaluates to 0, while (count ?? 10) evaluates to 10 — the reverse of the actual behavior",
    ],
    correctIndexes: [0],
    explanation:
      "The || operator falls back to its right-hand side for any falsy value (0, '', NaN, null, undefined), so count || 10 becomes 10 even though 0 was a legitimate value; ?? only falls back when the left side is specifically null or undefined, so count ?? 10 correctly preserves 0.",
  },
];
