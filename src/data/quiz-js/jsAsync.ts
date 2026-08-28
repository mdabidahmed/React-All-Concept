import type { QuizQuestion } from "../../types/quiz";

export const jsAsyncQuestions: QuizQuestion[] = [
  {
    id: "js-async-1",
    question:
      "[1, 2, 3].forEach(n => console.log(n)); setTimeout(() => console.log('done'), 0); console.log('end'); Which callback here runs synchronously, and which runs asynchronously?",
    type: "single",
    options: [
      "The forEach callback runs synchronously during the forEach call itself, while the setTimeout callback is deferred and runs asynchronously, after 'end' is logged",
      "Both callbacks are asynchronous, so 'end' logs before any numbers are printed",
      "Both callbacks are synchronous, so 'done' always logs before 'end'",
      "forEach() callbacks are always asynchronous, similar to setTimeout()",
    ],
    correctIndexes: [0],
    explanation:
      "forEach() invokes its callback immediately and synchronously for each element before moving on; setTimeout(), even with a 0ms delay, always defers its callback to run later, after the currently executing synchronous code (including the 'end' log) finishes.",
  },
  {
    id: "js-async-2",
    question: "What is 'callback hell' typically referring to?",
    type: "single",
    options: [
      "Deeply nested callbacks (callbacks inside callbacks inside callbacks) used for sequential async steps, making code hard to read and maintain",
      "A runtime error thrown when a callback function is not defined",
      "The performance cost of calling any function more than once",
      "A security vulnerability caused by passing functions as arguments",
    ],
    correctIndexes: [0],
    explanation:
      "Callback hell describes deeply nested callback structures that arise from chaining several asynchronous steps with plain callbacks; it makes control flow and error handling hard to follow, which is a major reason promises and async/await were introduced.",
  },
  {
    id: "js-async-3",
    question:
      "Which of the following statements about a Promise's state are true?",
    type: "multi",
    options: [
      "A promise starts in the 'pending' state and can become either 'fulfilled' or 'rejected'",
      "Once a promise settles (fulfilled or rejected), it cannot change to a different state or value afterward",
      "A promise can go back from 'fulfilled' to 'pending' if it is awaited again later",
      "A promise begins in the 'fulfilled' state by default, until proven otherwise",
    ],
    correctIndexes: [0, 1],
    explanation:
      "Every promise begins 'pending' and can settle exactly once, becoming either 'fulfilled' or 'rejected'; after that, its outcome is locked in permanently — a settled promise never reverts to pending or switches to the other outcome.",
  },
  {
    id: "js-async-4",
    question:
      "fetchUser().then(user => fetchOrders(user.id)).then(orders => console.log(orders)).catch(err => console.error(err)).finally(() => console.log('done')); Which statement correctly describes this chain?",
    type: "single",
    options: [
      "Each .then() runs only if the previous step succeeded; a single .catch() at the end handles a rejection from any earlier step, and .finally() always runs regardless of success or failure",
      ".catch() only catches errors thrown inside the very last .then() before it, not any earlier ones in the chain",
      ".finally() only runs when the promise chain succeeds, never after a .catch()",
      "Each .then() must have its own .catch() directly attached, or errors are silently ignored",
    ],
    correctIndexes: [0],
    explanation:
      "Promise chains propagate a rejection down to the nearest .catch(), regardless of which step in the chain it came from, and .finally() is guaranteed to run after the chain settles, whether it fulfilled or rejected, making it ideal for cleanup like hiding a loading spinner.",
  },
  {
    id: "js-async-5",
    question:
      "const results = await Promise.all([fetchA(), fetchB(), fetchC()]); Which of the following statements about this line are true, assuming all three calls start immediately?",
    type: "multi",
    options: [
      "It resolves with an array of results in the same order as the input array, regardless of which promise finished first",
      "If any one of the promises rejects, Promise.all() immediately rejects with that reason, even if the others are still pending",
      "It runs the three requests sequentially, one at a time, rather than concurrently",
      "It waits indefinitely and never rejects, even if one of the inputs rejects",
    ],
    correctIndexes: [0, 1],
    explanation:
      "Promise.all() preserves the input order in its resolved array no matter which promise settles first, and it 'fails fast': as soon as any single promise rejects, the whole Promise.all() rejects immediately with that error, without waiting for the others. All the input promises still start running concurrently, not one after another.",
  },
  {
    id: "js-async-6",
    question:
      "function double(n) { return n * 2; } Promise.resolve(5).then(double).then(result => console.log(result)); What is logged, and why?",
    type: "single",
    options: [
      "10, because whatever a .then() callback returns (even a plain, non-promise value) is automatically wrapped in a resolved promise and passed to the next .then()",
      "5, because .then() ignores whatever value its callback returns",
      "A Promise object is logged, not a plain number, because double() doesn't return a promise itself",
      "An error is thrown, because .then() callbacks must always return a promise explicitly",
    ],
    correctIndexes: [0],
    explanation:
      "Whatever value a .then() callback returns becomes the fulfillment value of the promise that .then() itself returns; if that value isn't already a promise, it is automatically wrapped in one, which is what lets plain functions like double() be chained smoothly.",
  },
  {
    id: "js-async-7",
    question:
      "async function getValue() { return 42; } const result = getValue(); console.log(result); What is logged?",
    type: "single",
    options: [
      "A Promise object (in a pending, soon-to-be-fulfilled state), because an async function always returns a promise, even when it returns a plain value",
      "42, because 'async' just means the value is computed instantly",
      "undefined, because getValue() was not awaited",
      "A SyntaxError, because async functions cannot use a plain 'return' statement",
    ],
    correctIndexes: [0],
    explanation:
      "Every async function implicitly wraps its return value in a promise; calling getValue() returns that promise immediately, and you would need 'await getValue()' or a .then() call to access the resolved value of 42.",
  },
  {
    id: "js-async-8",
    question:
      "What does 'await' actually do when used inside an async function?",
    type: "single",
    options: [
      "It pauses execution of that async function until the awaited promise settles, without blocking the rest of the page or other code from running",
      "It freezes the entire browser tab, including UI rendering and event handling, until the promise resolves",
      "It converts the awaited promise into a synchronous, blocking function call",
      "It cancels any other running code until the awaited value is ready",
    ],
    correctIndexes: [0],
    explanation:
      "'await' suspends only the async function it's inside, handing control back to the event loop so the rest of the program (rendering, event handlers, other code) keeps running; when the awaited promise settles, the async function resumes from where it paused.",
  },
  {
    id: "js-async-9",
    question:
      "async function loadData() { try { const res = await fetch('/api/data'); const data = await res.json(); return data; } catch (err) { console.error('Failed:', err); } } Why is the try/catch block useful here?",
    type: "single",
    options: [
      "It catches rejections from either awaited call (fetch() failing, or res.json() failing to parse), letting the function handle errors without a chain of .catch() calls",
      "try/catch only works with synchronous code, so it has no effect on the awaited calls in this function",
      "It prevents fetch() from ever failing in the first place",
      "It is required syntax; async functions cannot compile without a try/catch block",
    ],
    correctIndexes: [0],
    explanation:
      "When an awaited promise rejects, 'await' throws that rejection as a regular exception at the point of the await, which try/catch can intercept — giving async/await code the same familiar error-handling style as synchronous code, in place of chained .catch() calls.",
  },
  {
    id: "js-async-10",
    question:
      "fetch('/api/users').then(res => res.json()).then(data => console.log(data)); Why is a second .then() needed just to get the usable data?",
    type: "single",
    options: [
      "fetch() resolves with a Response object, not the parsed body; calling .json() reads and parses the body, which is itself asynchronous and returns another promise",
      "fetch() resolves directly with the parsed JSON data, so the second .then() is redundant and can be removed",
      ".json() is a synchronous method that blocks until the whole response is available",
      "fetch() only works when chained with exactly two .then() calls, or it throws an error",
    ],
    correctIndexes: [0],
    explanation:
      "The promise returned by fetch() resolves with a Response object representing the HTTP response, before the body has necessarily fully arrived; calling res.json() reads and parses that body into a JavaScript value, and because that step is also asynchronous, it returns its own promise.",
  },
  {
    id: "js-async-11",
    question:
      "fetch('/api/users/999').then(res => { if (!res.ok) { throw new Error('Request failed: ' + res.status); } return res.json(); }); Why does fetch() need this explicit response.ok check, unlike some other HTTP libraries?",
    type: "single",
    options: [
      "fetch()'s returned promise only rejects on network-level failures (like being offline); it does not reject just because the server responded with an error status like 404 or 500",
      "response.ok is required because fetch() never returns a status code otherwise",
      "fetch() automatically throws for any status code above 200, so the check is redundant",
      "response.ok checks whether the browser supports the fetch API at all",
    ],
    correctIndexes: [0],
    explanation:
      "fetch() treats any completed HTTP response, even a 404 or 500, as a successful promise resolution; only network-level failures cause it to reject. Checking response.ok (true for status codes 200-299) is the conventional way to detect and handle server-side error responses.",
  },
  {
    id: "js-async-12",
    question:
      "Which of the following statements about JavaScript's single-threaded concurrency model are true?",
    type: "multi",
    options: [
      "JavaScript executes one thing at a time on a single call stack",
      "Asynchronous work like timers and network requests is handled outside the call stack (by the browser or Node APIs), and callbacks are queued to run later",
      "JavaScript can execute two functions in true parallel on separate CPU cores without any special APIs",
      "A long-running synchronous loop can delay a setTimeout() callback from firing exactly on schedule, since the callback must wait for the call stack to be empty",
    ],
    correctIndexes: [0, 1, 3],
    explanation:
      "JavaScript's main thread runs one thing at a time on a single call stack; asynchronous operations are delegated to browser/Node APIs, and their callbacks wait in a queue until the stack is empty, which is also why a long, blocking synchronous task can delay a timer's callback well past its scheduled delay. True parallel execution on multiple cores requires separate mechanisms like Web Workers, not plain JavaScript functions.",
  },
  {
    id: "js-async-13",
    question:
      "console.log(1); setTimeout(() => console.log(2), 0); console.log(3); In what order are these logged, and why?",
    type: "single",
    options: [
      "1, 3, 2 — the setTimeout callback, even with a 0ms delay, is placed in a queue and only runs after all currently executing synchronous code has finished",
      "1, 2, 3 — because setTimeout(fn, 0) runs immediately, with no real delay",
      "2, 1, 3 — asynchronous code always executes before synchronous code",
      "3, 1, 2 — console.log calls execute in reverse of the order they appear",
    ],
    correctIndexes: [0],
    explanation:
      "Even with a delay of 0ms, setTimeout() hands its callback to the event loop rather than running it immediately; the callback only runs once the call stack is empty, which happens after all the synchronous code (logging 1, then 3) has already run.",
  },
  {
    id: "js-async-14",
    question:
      "What is the key difference between setTimeout() and setInterval(), and what are clearTimeout()/clearInterval() used for?",
    type: "single",
    options: [
      "setTimeout() runs its callback once after a delay, while setInterval() runs its callback repeatedly at that interval; clearTimeout()/clearInterval() cancel a pending timeout or a running interval, respectively, using the id each function returns",
      "setTimeout() and setInterval() are two names for the exact same behavior, kept for backward compatibility",
      "setInterval() runs its callback exactly once, while setTimeout() repeats forever until the page is closed",
      "clearTimeout() and clearInterval() pause a timer temporarily, and it automatically resumes a few seconds later",
    ],
    correctIndexes: [0],
    explanation:
      "setTimeout() schedules a single future execution, while setInterval() repeats its callback on a fixed cycle until stopped; both return an id that can be passed to clearTimeout() or clearInterval() respectively to cancel further execution.",
  },
];
