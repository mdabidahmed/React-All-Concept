import type { QuizQuestion } from "../../types/quiz";

export const nodeDatabasesAdvancedQuestions: QuizQuestion[] = [
  {
    id: "node-databases-advanced-1",
    question:
      "When a Node.js app uses a database driver or ORM (such as pg, mongoose, or Prisma) together with a connection string, what is generally true?",
    type: "single",
    options: [
      "The driver/ORM provides the JavaScript API for talking to the database, and the connection string tells it how to locate and authenticate with a specific database instance",
      "The connection string contains the compiled SQL query that will run",
      "An ORM removes any need for the app to ever handle errors from database calls",
      "A driver or ORM only works if the database and the app run on the exact same machine",
    ],
    correctIndexes: [0],
    explanation:
      "A driver or ORM is the library-level interface your code calls (e.g. query() or a model method), while the connection string supplies the specific host, credentials, and database name that connection should use; neither eliminates the need to handle errors that can still occur.",
  },
  {
    id: "node-databases-advanced-2",
    question:
      "Which statement accurately describes why database access in Node.js is typically both asynchronous and often pooled?",
    type: "single",
    options: [
      "Queries are asynchronous so Node's event loop isn't blocked waiting on network/disk I/O, and connection pooling reuses already-open connections instead of paying the cost of opening a new one for every query",
      "Queries are asynchronous because JavaScript cannot express synchronous function calls at all",
      "Connection pooling exists to permanently cache query results so the database itself is only queried once",
      "Node's single-threaded nature means database calls should be written as blocking, synchronous operations to guarantee correctness",
    ],
    correctIndexes: [0],
    explanation:
      "Async queries keep Node's single event loop responsive while waiting on I/O, and pooling avoids the relatively expensive process of establishing a fresh connection for every query by reusing a small set of already-open ones.",
  },
  {
    id: "node-databases-advanced-3",
    question:
      "What does this code do? try { const rows = db.queryAllSync(); } catch (err) { console.error('Query failed:', err); }",
    type: "single",
    options: [
      "It attempts a synchronous database query, and if that call throws, the catch block logs the error instead of letting it crash the program",
      "It runs the query asynchronously in the background regardless of the try/catch",
      "It silently ignores any errors thrown by queryAllSync()",
      "It only catches errors that occur inside the catch block itself",
    ],
    correctIndexes: [0],
    explanation:
      "A standard try/catch around synchronous code catches any exception thrown while that code runs, letting the catch block handle it (here, logging it) instead of the error propagating up and potentially crashing the process.",
  },
  {
    id: "node-databases-advanced-4",
    question:
      "What does this code do? async function getUser(id) { try { const user = await db.findUser(id); return user; } catch (err) { console.error(err); return null; } }",
    type: "single",
    options: [
      "If db.findUser(id) rejects, the catch block runs and the function returns null instead of the rejection propagating as an unhandled promise rejection",
      "try/catch has no effect on code that uses await; only .catch() on the returned promise can handle the error",
      "The catch block only runs if db.findUser is not an async function",
      "It always returns null, even when db.findUser resolves successfully",
    ],
    correctIndexes: [0],
    explanation:
      "Inside an async function, try/catch works around an awaited expression just like synchronous code: if the awaited promise rejects, control jumps to catch, letting the function handle the error gracefully instead of leaving it as an unhandled rejection.",
  },
  {
    id: "node-databases-advanced-5",
    question:
      "Which statements about Node.js error-handling conventions are accurate?",
    type: "multi",
    options: [
      "The 'error-first callback' convention passes an error (or null) as a callback's first argument, which calling code should check before using later arguments",
      "process.on('uncaughtException', ...) and process.on('unhandledRejection', ...) can serve as last-resort safety nets for logging errors that slipped past normal handling",
      "Relying primarily on those global handlers instead of targeted try/catch and .catch() calls is discouraged, since the app's state after an uncaught exception isn't guaranteed to be safe to continue running in",
      "Once an unhandledRejection handler is registered, it's guaranteed safe to keep the process running indefinitely after every uncaught error",
    ],
    correctIndexes: [0, 1, 2],
    explanation:
      "Error-first callbacks put an error object first for the caller to check; the two global process handlers exist as a last-resort net for otherwise-uncaught errors, but relying on them is discouraged because a process's state can be left inconsistent after an uncaught exception, so best practice is to handle errors close to their source and let a process manager restart the app rather than assume it's safe to keep going.",
  },
  {
    id: "node-databases-advanced-6",
    question: "What does running 'node --inspect server.js' enable?",
    type: "single",
    options: [
      "It opens a debugging protocol port that lets you attach Chrome DevTools (or a similar debugger) to set breakpoints and step through the running Node process",
      "It automatically fixes any runtime errors it finds",
      "It disables all console.log output to keep logs clean",
      "It converts the script from CommonJS to ES modules automatically",
    ],
    correctIndexes: [0],
    explanation:
      "The --inspect flag starts Node with a debugging protocol exposed on a port, which tools like Chrome DevTools (via chrome://inspect) or an editor's debugger can connect to for breakpoints, step-through execution, and variable inspection.",
  },
  {
    id: "node-databases-advanced-7",
    question:
      "Why might a developer add targeted console.log() and console.error() statements around a suspicious block of code as a debugging technique?",
    type: "single",
    options: [
      "To quickly inspect the actual values flowing through the code and narrow down where behavior diverges from what's expected, without needing to attach a full debugger",
      "Because console.log() automatically fixes the bug it prints information about",
      "Because it's the only way Node.js allows inspecting variable values at all",
      "Because adding console.log() calls prevents the code from ever throwing an error",
    ],
    correctIndexes: [0],
    explanation:
      "Strategic console.log()/console.error() statements are a lightweight way to observe actual runtime values and control flow, helping to isolate where things go wrong; it's a common complement to, not a replacement for or magic fix of, more formal debugging tools.",
  },
  {
    id: "node-databases-advanced-8",
    question:
      "A developer writes: function getData() { fetchFromApi().then(data => { processData(data); }); return 'done'; } What classic mistake does this contain, and what's the risk?",
    type: "single",
    options: [
      "It forgets to return the promise chain out of getData(), so any caller awaiting getData() won't actually wait for fetchFromApi()/processData() to finish, and if fetchFromApi() rejects, there's no .catch() to handle it",
      "It has a syntax error because .then() cannot be followed by other statements in the same function",
      "processData(data) will run before fetchFromApi() is even called",
      "Returning the string 'done' automatically cancels the fetchFromApi() call",
    ],
    correctIndexes: [0],
    explanation:
      "Because the promise chain isn't returned, getData() resolves immediately with 'done' regardless of when (or whether) the fetch actually finishes, a classic 'forgotten return' bug; and since there's no .catch() anywhere in the chain, a rejection from fetchFromApi() has nowhere to go and can fail silently or only produce a generic unhandled-rejection warning.",
  },
  {
    id: "node-databases-advanced-9",
    question:
      "Testing frameworks like Jest and Mocha are often associated with front-end testing. How well do they apply to server-side Node.js code?",
    type: "single",
    options: [
      "They work just as well for server-side code; the same assertion and test-runner features apply whether the code under test renders UI or handles HTTP requests and database logic",
      "They cannot run at all outside of a browser environment",
      "They can only test code that imports a JSX or HTML file",
      "They require a DOM implementation to execute any test, even for pure server logic",
    ],
    correctIndexes: [0],
    explanation:
      "Jest and Mocha are general-purpose JavaScript test runners; nothing about them is browser-specific, so they're commonly used to test server-side logic, API handlers, and utility functions just as well as UI code.",
  },
  {
    id: "node-databases-advanced-10",
    question:
      "Which practices are common when testing a Node.js API endpoint?",
    type: "multi",
    options: [
      "Mocking the database or an outgoing network call, so the test doesn't depend on a real external service being up and returning consistent data",
      "Sending a simulated request to the endpoint and asserting on the response's status code and body",
      "Inspecting rendered DOM elements to confirm the endpoint behaved correctly",
      "Refusing to run the test suite unless it's connected to the live production database",
    ],
    correctIndexes: [0, 1],
    explanation:
      "Since there's no DOM on the server, testing focuses on the HTTP response itself (status code, body, headers); mocking a database or network dependency keeps tests fast, deterministic, and independent of any real external service being available.",
  },
];
