import type { QuizQuestion } from "../../types/quiz";

export const nodeModulesQuestions: QuizQuestion[] = [
  {
    id: "node-modules-1",
    question:
      "In Node.js's CommonJS module system, how does one file import functionality that another file exports?",
    type: "single",
    options: [
      "The exporting file assigns values to 'module.exports', and the importing file calls require(...) with the file's path to get that value",
      "The exporting file uses the 'import' keyword, and the importing file uses 'export' to receive the value",
      "Both files must be combined into a single file, since Node cannot share code between separate files",
      "The importing file must copy and paste the exported code directly into its own file",
    ],
    correctIndexes: [0],
    explanation:
      "Node's original module system, CommonJS, uses 'module.exports' to expose values from a file and the require() function to pull those values into another file by path.",
  },
  {
    id: "node-modules-2",
    question:
      "Given a file math.js containing: function add(a, b) { return a + b; } module.exports = add; — how would another file use this function?",
    type: "single",
    options: [
      "const add = require('./math'); console.log(add(2, 3)); // 5",
      "import add from 'math.js'; console.log(add(2, 3));",
      "const add = new require('./math')(2, 3);",
      "The function cannot be used elsewhere; module.exports only works for objects, not functions",
    ],
    correctIndexes: [0],
    explanation:
      "require('./math') evaluates math.js and returns whatever was assigned to module.exports, in this case the add function directly, so it can be called immediately as add(2, 3).",
  },
  {
    id: "node-modules-3",
    question:
      "A module counter.js contains: let count = 0; module.exports = function increment() { return ++count; }; Two different files both do const increment = require('./counter'); and each calls increment() once, one after the other. What happens on that second call?",
    type: "single",
    options: [
      "It returns 2, not 1, because Node caches the module after the first require, so both files share the exact same 'count' variable and function instance",
      "It also returns 1, because each require() creates a fresh, independent copy of the module",
      "It throws an error, because a module cannot be required from more than one file",
      "The result is unpredictable and different every time the program runs",
    ],
    correctIndexes: [0],
    explanation:
      "Node caches a module's exports after it runs the first time, so every subsequent require() of that same file (from any file in the app) returns the identical cached object or function, sharing any internal state like 'count' rather than re-running the module from scratch.",
  },
  {
    id: "node-modules-4",
    question:
      "A module logger.js contains console.log('logger loaded'); at its top level, outside any function. It is required from three different files in the same running program. How many times does 'logger loaded' get printed?",
    type: "single",
    options: [
      "Once — Node only executes a module's top-level code the first time it's required, then serves the cached result on every later require",
      "Three times — once for each file that requires it",
      "Zero times — top-level console.log statements are ignored inside modules",
      "It depends on the order the files are required, but it is always at least three",
    ],
    correctIndexes: [0],
    explanation:
      "Because of require caching, a module's file body runs exactly once, no matter how many separate files require() it afterward; those later calls just reuse the cached module.exports value without re-executing the file.",
  },
  {
    id: "node-modules-5",
    question:
      "Which of the following statements about Node's require() caching are correct?",
    type: "multi",
    options: [
      "After the first require() of a file, later require() calls for that same file return the cached export instead of re-running the file",
      "If the exported value is an object, mutating a property on it in one file is visible to other files that required the same module, since they share the same cached object",
      "Node determines the cache key by the resolved absolute file path, so requiring the same file two different (but equivalent) ways still hits the same cache entry",
      "Calling require() on the same file twice always creates two completely separate, independent copies of its exports",
    ],
    correctIndexes: [0, 1, 2],
    explanation:
      "Node's module cache stores exports keyed by resolved file path, so repeated requires of the same file return one shared reference rather than fresh copies; this means mutations to a cached object are visible everywhere that object is required, the opposite of what the last statement claims.",
  },
  {
    id: "node-modules-6",
    question:
      "How does Node.js's newer ES module (ESM) syntax differ from CommonJS at the language level?",
    type: "single",
    options: [
      "ESM uses 'import' and 'export' statements to share code between files, instead of CommonJS's require() and module.exports",
      "ESM and CommonJS use identical syntax; only the file extension changes",
      "ESM removes the ability to define functions inside modules",
      "ESM only works in the browser and was never brought into Node.js",
    ],
    correctIndexes: [0],
    explanation:
      "ES modules are the standardized JavaScript module syntax, using 'import'/'export' keywords, and Node.js has supported running them, alongside its original CommonJS system, for years now.",
  },
  {
    id: "node-modules-7",
    question:
      "How does a Node.js project tell Node to treat '.js' files as ES modules (so 'import'/'export' can be used directly) instead of CommonJS?",
    type: "single",
    options: [
      "By adding \"type\": \"module\" to the project's package.json, or by naming the file with a '.mjs' extension",
      "By starting the file with a '#!/usr/bin/esm' comment",
      "ES modules cannot be used in Node.js under any configuration",
      "By installing a package called 'es-modules' from npm",
    ],
    correctIndexes: [0],
    explanation:
      "Node decides how to parse a file as either CommonJS or an ES module; setting \"type\": \"module\" in package.json switches '.js' files in that project to ESM parsing, and the '.mjs' extension forces ESM treatment regardless of that setting ('.cjs' forces CommonJS).",
  },
  {
    id: "node-modules-8",
    question:
      "What is notable about using 'await' at the top level of a file, outside any async function?",
    type: "single",
    options: [
      "Top-level await is allowed in ES modules, letting a module pause on a promise before the rest of the file runs, but it is not allowed in traditional CommonJS modules",
      "Top-level await works identically and equally well in both ES modules and CommonJS modules",
      "'await' can never be used outside an async function in any kind of JavaScript file",
      "Top-level await automatically converts the entire file into a synchronous script with no promises at all",
    ],
    correctIndexes: [0],
    explanation:
      "Top-level await is a feature of ES modules: it lets a module await a promise directly at the top level, useful for things like awaiting a database connection before continuing, but it isn't available in CommonJS modules, which predate this feature.",
  },
  {
    id: "node-modules-9",
    question:
      "What are Node.js's 'built-in' (or 'core') modules, such as fs, path, http, os, and events?",
    type: "single",
    options: [
      "Modules that ship as part of Node.js itself, so they can be required by name with no npm installation needed",
      "Third-party community packages that must be installed with npm install before use",
      "Modules that only work inside the browser, not inside Node.js",
      "Deprecated modules that Node.js keeps only for backward compatibility and warns against using",
    ],
    correctIndexes: [0],
    explanation:
      "Core modules like fs, path, http, os, and events are bundled directly into the Node.js runtime, so writing require('fs') or require('path') works immediately in any Node project without running npm install first.",
  },
  {
    id: "node-modules-10",
    question:
      "Which of the following statements about Node.js's built-in modules are true?",
    type: "multi",
    options: [
      "'fs' is a core module for interacting with the file system, and it can be used with no npm install",
      "'path' is a core module bundled with Node for working with file and directory paths",
      "'events' is a core module that provides the EventEmitter class, and ships with Node by default",
      "'express' is a core module bundled with Node.js and never needs to be installed separately",
    ],
    correctIndexes: [0, 1, 2],
    explanation:
      "fs, path, and events are all core modules that ship with every Node.js installation and require no npm install; express is a popular but third-party web framework that must be installed separately via npm, unlike Node's built-in modules.",
  },
  {
    id: "node-modules-11",
    question: "What is the module wrapper function in Node.js's CommonJS system?",
    type: "single",
    options: [
      "Before running a CommonJS file's code, Node secretly wraps it in a function that supplies local parameters like exports, require, module, __filename, and __dirname",
      "A function that developers must manually write at the top of every module file",
      "A tool that compresses and minifies module files before they are published to npm",
      "A wrapper that automatically converts ES module syntax into CommonJS syntax",
    ],
    correctIndexes: [0],
    explanation:
      "Node doesn't literally run your file's raw code; it wraps the file's contents in a hidden function, function(exports, require, module, __filename, __dirname) { ... }, which is why those five identifiers are available inside every CommonJS module without being explicitly imported.",
  },
  {
    id: "node-modules-12",
    question:
      "Because of Node's module wrapper function, why don't variables declared at the top level of one CommonJS file collide with same-named variables in another file?",
    type: "single",
    options: [
      "Each file's code actually runs inside its own wrapper function, so top-level variables are local to that function's scope rather than truly global",
      "Node renames every variable behind the scenes to guarantee uniqueness",
      "Every file is required to use different variable names by convention, which Node enforces",
      "They do collide; Node.js has no protection against this and it is a common source of bugs",
    ],
    correctIndexes: [0],
    explanation:
      "Since the module wrapper function wraps each file's code in its own function scope, variables declared with var, let, or const at a file's top level stay local to that function and don't leak into other modules or the global object.",
  },
  {
    id: "node-modules-13",
    question:
      "Which of the following are valid ways to export multiple values from a CommonJS module?",
    type: "multi",
    options: [
      "module.exports = { add, subtract }; at the end of the file",
      "exports.add = add; exports.subtract = subtract; adding properties onto the existing exports object",
      "exports = { add, subtract }; reassigning the exports variable directly",
      "export multiple add, subtract; a special CommonJS syntax for bulk exports",
    ],
    correctIndexes: [0, 1],
    explanation:
      "Both replacing module.exports wholesale with an object, and adding named properties onto the existing exports object, correctly export multiple values; reassigning the local exports variable itself breaks the reference require() relies on, and there is no 'export multiple' syntax in CommonJS.",
  },
  {
    id: "node-modules-14",
    question:
      "A developer wants a module to export two functions, so they write: exports = { add, subtract }; at the bottom of the file, replacing the usual module.exports line. Requiring this file elsewhere gives back an empty object. What went wrong?",
    type: "single",
    options: [
      "Reassigning the local exports variable directly breaks the link to module.exports; only mutating module.exports (or adding properties like exports.add = add) actually changes what require() returns",
      "Nothing is wrong; this is the correct and recommended way to export multiple values",
      "exports can only be used to export a single function, never an object",
      "The functions were not declared with an 'export' keyword, which is required alongside exports",
    ],
    correctIndexes: [0],
    explanation:
      "exports starts out as just a convenience reference to the same object as module.exports, but reassigning the local variable exports to a brand-new object breaks that link; require() always returns whatever module.exports currently points to, so the fix is to either mutate module.exports directly or assign properties onto the existing exports object instead of replacing it.",
  },
];
