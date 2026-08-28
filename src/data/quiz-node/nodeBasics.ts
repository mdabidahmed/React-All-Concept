import type { QuizQuestion } from "../../types/quiz";

export const nodeBasicsQuestions: QuizQuestion[] = [
  {
    id: "node-basics-1",
    question: "What is Node.js, most accurately?",
    type: "single",
    options: [
      "A JavaScript runtime built on Chrome's V8 engine that lets JavaScript run outside a web browser, such as on a server",
      "A new programming language designed to replace JavaScript on the server",
      "A web browser optimized for running JavaScript faster than Chrome or Firefox",
      "A JavaScript framework for building only front-end user interfaces",
    ],
    correctIndexes: [0],
    explanation:
      "Node.js is not a language or a browser; it's a runtime environment that embeds Google's V8 JavaScript engine outside the browser, letting the same JavaScript language execute in places like servers, CLIs, and desktop apps.",
  },
  {
    id: "node-basics-2",
    question:
      "Before Node.js existed, why couldn't JavaScript be used to write standalone server-side applications?",
    type: "single",
    options: [
      "JavaScript engines like V8 only existed embedded inside web browsers, so there was no way to run JavaScript as a standalone program outside that context",
      "JavaScript itself lacked the syntax needed to write loops and functions on a server",
      "Servers physically cannot execute any interpreted language, only compiled ones",
      "JavaScript could already run on servers before Node.js; Node.js only added a REPL",
    ],
    correctIndexes: [0],
    explanation:
      "JavaScript engines predated Node.js, but they were bundled inside browsers to run page scripts; Node.js took V8 out of the browser and wrapped it with APIs (like file system and networking access) so JavaScript could run as a standalone server-side program.",
  },
  {
    id: "node-basics-3",
    question:
      "What is a commonly cited advantage of using Node.js on the backend of a web application?",
    type: "single",
    options: [
      "Teams can use a single language, JavaScript, for both the client-side browser code and the server-side code, reducing context switching",
      "Node.js automatically makes any algorithm run faster than it would in any other language",
      "Node.js eliminates the need for a database in web applications",
      "Node.js code cannot contain bugs because it is single-threaded",
    ],
    correctIndexes: [0],
    explanation:
      "A major appeal of Node.js is letting developers write both front-end and back-end logic in JavaScript, sharing code, tooling, and knowledge across the stack, rather than a guaranteed raw performance advantage.",
  },
  {
    id: "node-basics-4",
    question:
      "Which of the following statements about how Node.js handles concurrency are true?",
    type: "multi",
    options: [
      "Node.js runs your JavaScript on a single main thread, one operation at a time",
      "Slow operations like file or network I/O are delegated to the system or a background thread pool, and Node resumes your code via a callback once the result is ready",
      "This delegation lets Node handle many concurrent I/O operations without needing a separate operating system thread for every piece of your JavaScript",
      "Node.js gives each incoming request its own dedicated thread to run your JavaScript in parallel",
    ],
    correctIndexes: [0, 1, 2],
    explanation:
      "Node executes your JavaScript on a single thread, but hands off slow I/O to the underlying system, which is how it manages concurrency; it does not spin up a new thread to run your JavaScript for every request, which is a common misconception.",
  },
  {
    id: "node-basics-5",
    question:
      "What does this code log, and in what order? console.log('1'); fs.readFile('data.txt', () => console.log('2')); console.log('3');",
    type: "single",
    options: [
      "1, 3, 2 — reading the file is asynchronous, so Node moves on to the next line while the file loads, and the callback runs later once the read completes",
      "1, 2, 3 — Node always runs code in the exact order it's written, waiting for each line to finish",
      "2, 1, 3 — file reads are always given top priority in the event loop",
      "1, 3 — the readFile callback never gets a chance to run in this example",
    ],
    correctIndexes: [0],
    explanation:
      "fs.readFile is asynchronous and non-blocking: Node starts the file read in the background and immediately continues to '3', only running the '2' callback once the file has finished loading, after the synchronous code has already completed.",
  },
  {
    id: "node-basics-6",
    question:
      "Which of the following are true about running JavaScript inside Node.js compared to inside a browser?",
    type: "multi",
    options: [
      "Node.js has no 'window' or 'document' object, since there is no web page or DOM to represent",
      "Node.js provides globals like 'process' and 'module' that don't exist in browser JavaScript",
      "Both environments run the exact same JavaScript language syntax, such as variables, functions, and classes",
      "Browser JavaScript and Node.js are actually different programming languages with incompatible syntax",
    ],
    correctIndexes: [0, 1, 2],
    explanation:
      "Node and browsers both execute standard JavaScript syntax, but they expose different host environments: browsers provide DOM globals like window and document, while Node provides server-oriented globals like process, module, and require that have no browser equivalent.",
  },
  {
    id: "node-basics-7",
    question:
      "A developer writes document.getElementById('app') inside a Node.js script and runs it with 'node app.js'. What happens?",
    type: "single",
    options: [
      "It throws a ReferenceError because 'document' is not defined; Node has no DOM since it isn't running inside a browser",
      "It runs fine and returns null, since Node.js still has an empty document object",
      "It automatically opens a browser window to execute the DOM code",
      "It logs a warning but continues running normally",
    ],
    correctIndexes: [0],
    explanation:
      "The DOM, and the 'document' global that represents it, is provided by web browsers, not by Node.js; referencing 'document' in a Node script throws a ReferenceError because that identifier was never defined in that environment.",
  },
  {
    id: "node-basics-8",
    question: "What is the Node.js REPL?",
    type: "single",
    options: [
      "An interactive command-line environment that Reads a line of JavaScript, Evaluates it, Prints the result, and Loops back to read the next line",
      "A build tool that bundles multiple JavaScript files into a single output file",
      "A testing framework built into Node.js for running unit tests",
      "A configuration file that lists a project's dependencies",
    ],
    correctIndexes: [0],
    explanation:
      "REPL stands for Read-Eval-Print-Loop; typing 'node' with no filename starts this interactive prompt, letting you type JavaScript expressions and see their results immediately, which is handy for quick experiments.",
  },
  {
    id: "node-basics-9",
    question:
      "What is the difference between typing 'node' alone in a terminal versus typing 'node app.js'?",
    type: "single",
    options: [
      "'node' alone opens the interactive REPL for typing JavaScript line by line, while 'node app.js' runs the JavaScript code written in the app.js file from start to finish",
      "They are exactly identical in every way",
      "'node app.js' opens an interactive prompt, while 'node' alone requires a file argument and errors without one",
      "'node' alone permanently installs Node.js, while 'node app.js' only runs a temporary preview",
    ],
    correctIndexes: [0],
    explanation:
      "Running 'node' with no arguments starts the interactive REPL, whereas providing a filename tells Node to execute that script's code non-interactively and exit once the code (and any pending asynchronous work) finishes.",
  },
  {
    id: "node-basics-10",
    question:
      "Inside a Node.js CommonJS file, what do the '__dirname' and '__filename' variables represent?",
    type: "single",
    options: [
      "'__dirname' is the absolute path to the directory containing the current file, and '__filename' is the absolute path to the current file itself",
      "'__dirname' is the name of the npm package, and '__filename' is the name of the main entry file listed in package.json",
      "Both are relative paths measured from wherever the terminal's current working directory happens to be",
      "They are deprecated browser globals that also happen to work in Node.js",
    ],
    correctIndexes: [0],
    explanation:
      "Node injects __dirname and __filename into each CommonJS module, giving the absolute filesystem path of the containing folder and the file itself, which is useful for building reliable file paths regardless of where the process was launched from.",
  },
  {
    id: "node-basics-11",
    question:
      "Which statement about Node's 'global' and 'globalThis' is correct?",
    type: "single",
    options: [
      "'global' is Node's own name for the global object (its equivalent of the browser's 'window'), while 'globalThis' is a newer, standardized name that refers to the same kind of global object across any JavaScript environment",
      "'global' and 'globalThis' are completely unrelated objects that never refer to the same thing",
      "'globalThis' only exists in browsers and was never added to Node.js",
      "Declaring 'let x = 5;' at the top of a module file automatically adds 'x' as a property of 'global'",
    ],
    correctIndexes: [0],
    explanation:
      "'global' is Node's long-standing name for its global object, and 'globalThis' is a newer ECMAScript standard providing one consistent name for the global object in any environment; note that top-level let/const declarations in a CommonJS module stay local to that module and are not attached to global.",
  },
  {
    id: "node-basics-12",
    question: "What is npm?",
    type: "single",
    options: [
      "The default package manager bundled with Node.js, used to install, share, and manage JavaScript libraries and their versions",
      "A built-in Node.js module for reading and writing files",
      "An alternative JavaScript engine that competes with V8",
      "A cloud hosting provider specifically for Node.js servers",
    ],
    correctIndexes: [0],
    explanation:
      "npm (Node Package Manager) ships with Node.js and lets developers download reusable packages from its public registry, publish their own, and manage project dependencies through package.json.",
  },
  {
    id: "node-basics-13",
    question:
      "What happens when a developer runs 'npm install express' inside a project?",
    type: "single",
    options: [
      "npm downloads the 'express' package (and its own dependencies) into a 'node_modules' folder, and records it in package.json",
      "It permanently installs the 'express' package globally on the operating system for every project on the machine",
      "It compiles the developer's JavaScript code into a standalone executable",
      "It only updates package.json without actually downloading any files",
    ],
    correctIndexes: [0],
    explanation:
      "By default, 'npm install <package>' fetches that package plus its transitive dependencies into the local 'node_modules' folder, and records it under 'dependencies' in package.json (or under 'devDependencies' instead, if installed with the '--save-dev' flag).",
  },
  {
    id: "node-basics-14",
    question:
      "In package.json, a dependency is listed as \"lodash\": \"^4.17.21\". What does the caret (^) mean under semantic versioning?",
    type: "single",
    options: [
      "npm may install any newer version that keeps the same major version number, allowing minor and patch updates but not a jump to the next major version",
      "npm will install exactly version 4.17.21 and no other version, ever",
      "The caret means this package is optional and won't actually be installed",
      "npm will only ever install patch updates, never minor version updates",
    ],
    correctIndexes: [0],
    explanation:
      "A caret range like ^4.17.21 permits updates that don't change the leftmost non-zero version number, so npm can install newer minor or patch releases (like 4.18.0), but won't jump to 5.0.0, since a major version bump can include breaking changes.",
  },
  {
    id: "node-basics-15",
    question:
      "How does a tilde range like \"~4.17.21\" in package.json differ from a caret range like \"^4.17.21\"?",
    type: "single",
    options: [
      "The tilde only allows patch-level updates (like 4.17.22), while the caret also allows minor version updates (like 4.18.0)",
      "The tilde and caret behave identically in every version of npm",
      "The tilde locks the version completely, while the caret allows any version at all, including older ones",
      "The tilde only applies to devDependencies, while the caret only applies to dependencies",
    ],
    correctIndexes: [0],
    explanation:
      "Semantic versioning ranges are more conservative with tilde (~) than caret (^): tilde restricts updates to patch releases within the same minor version, while caret is looser and also allows minor version bumps as long as the major version stays the same.",
  },
  {
    id: "node-basics-16",
    question:
      "Which of the following statements about a typical package.json file are true?",
    type: "multi",
    options: [
      "The 'name' and 'version' fields identify the package and its current release number",
      "The 'main' field points to the file that loads when another module requires this package",
      "The 'scripts' field can define named commands, such as 'start' or 'test', runnable via 'npm run'",
      "A 'database' field is required in every package.json to specify a SQL connection string",
    ],
    correctIndexes: [0, 1, 2],
    explanation:
      "package.json commonly includes 'name'/'version' for identity, 'main' as the package's entry point, and a 'scripts' map for command shortcuts (along with 'dependencies'/'devDependencies' for tracking required packages); there's no standard or required 'database' field, since package.json describes the package itself rather than runtime infrastructure.",
  },
];
