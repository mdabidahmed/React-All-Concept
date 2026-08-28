import type { Topic } from "../../types";

export const jsCallbacksTopic: Topic = {
  id: "js-callbacks",
  title: "JavaScript Callback Functions",
  category: "Asynchronous JavaScript",
  shortExplanation: `A **callback** is simply a function you pass into another function so that other function can call it later, at the right moment — the callback doesn't run itself, it's invoked *by* whatever it was handed to.

- **Synchronous** callbacks run immediately, during the call — \`[1,2,3].map(callback)\` calls \`callback\` once per element before \`.map()\` even returns
- **Asynchronous** callbacks run later — \`setTimeout(callback, 1000)\` returns right away, and \`callback\` only runs after the delay
- Nesting many async callbacks inside each other for a sequence of steps produces the infamous ==callback hell== — a key motivation for Promises (covered in their own topic)`,
  longExplanation: `A **callback** is one of the simplest and most foundational ideas in JavaScript: it's just a regular function, passed as a value into another function, with the expectation that the receiving function will call it at some appropriate moment. Functions are values in JavaScript — they can be stored in variables, passed as arguments, and returned from other functions — and a callback is exactly that capability put to work: "here's a function to run when you're ready."

The critical distinction to build intuition around is **when** the callback actually runs, and this splits into two very different categories. A **synchronous callback** runs immediately, as part of the very same call — the function you're calling never returns control back to your code until it has finished invoking your callback (possibly several times). \`[1, 2, 3].map(n => n * 2)\` is a synchronous callback: \`.map()\` calls the arrow function once for every element, entirely before \`.map()\` itself returns the new array — by the time the line after it runs, every callback invocation has already happened.

An **asynchronous callback** is fundamentally different: the function you call *returns immediately*, and your callback only runs later, at some future point, once whatever it's waiting on (a timer, a network response, a file read) is actually ready. \`setTimeout(() => console.log("done"), 1000)\` returns right away — the very next line of your code runs before "done" is ever logged — and the callback fires roughly 1000 milliseconds later, from a completely separate turn of execution. This is the core of how JavaScript does anything asynchronous at all without pausing the entire program to wait: register a callback, keep running everything else, and let the callback fire whenever its moment arrives.

Asynchronous callbacks work well for a single async step, but they get genuinely painful once several async operations need to happen **in sequence**, each depending on the previous one's result. The natural way to write that with plain callbacks is to nest one inside the next: fetch a user, and *inside that* callback, fetch their posts, and *inside that* callback, fetch each post's comments, and so on. Each new step indents one level deeper than the last, producing a lopsided, rightward-drifting shape that earned the nickname **callback hell** (also "the pyramid of doom"). Beyond just looking messy, deeply nested callbacks make error handling awkward (each level typically needs its own error check) and make the actual order of operations harder to read at a glance, since the visual nesting doesn't obviously match "step 1, then step 2, then step 3" the way a flatter structure would.

This exact pain point is the direct motivation behind **Promises** (and later, \`async\`/\`await\`, built on top of them) — both covered in their own topics next. They represent the same underlying capability (do something now, handle the result later) but let a sequence of async steps be written as a flat, readable chain instead of an ever-deepening nest of callbacks. Callbacks themselves never went away — Promises are, underneath, still implemented using callbacks — but the tools built on top of them make sequencing async work dramatically easier to write and read.`,
  examples: [
    {
      id: "synchronous-callback-map",
      title: "A synchronous callback with .map()",
      summary: "Every callback invocation finishes before .map() itself returns.",
      code: `function App() {
  const [log, setLog] = useState([]);

  function print(value) {
    setLog((prev) => [...prev, String(value)]);
  }

  function run() {
    setLog([]);
    const numbers = [1, 2, 3, 4];
    const doubled = numbers.map(function (n) {
      print("map callback running for: " + n);
      return n * 2;
    });
    print("Result: " + doubled.join(", "));
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={run}>Run a synchronous callback (.map)</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 120 }}>
        {log.length === 0 ? "// output appears here" : log.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "asynchronous-callback-settimeout",
      title: "An asynchronous callback with setTimeout",
      summary: "The line after setTimeout runs before the callback ever does.",
      code: `function App() {
  const [log, setLog] = useState([]);

  function print(value) {
    setLog((prev) => [...prev, String(value)]);
  }

  function run() {
    setLog([]);
    print("1. Before setTimeout");
    setTimeout(function () {
      print("3. Inside the callback, after the delay");
    }, 500);
    print("2. Right after calling setTimeout (callback hasn't run yet)");
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={run}>Run an asynchronous callback (setTimeout)</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 90 }}>
        {log.length === 0 ? "// output appears here" : log.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "callback-hell-nested",
      title: "Callback hell: three nested async steps",
      summary: "Each dependent step nests one level deeper than the last — the exact problem Promises solve.",
      code: `function App() {
  const [log, setLog] = useState([]);

  function print(value) {
    setLog((prev) => [...prev, value]);
  }

  function getUser(callback) {
    setTimeout(function () {
      callback({ id: 1, name: "Ada" });
    }, 400);
  }

  function getPosts(userId, callback) {
    setTimeout(function () {
      callback(["Post A", "Post B"]);
    }, 400);
  }

  function getComments(post, callback) {
    setTimeout(function () {
      callback(["Nice post!", "Thanks for sharing"]);
    }, 400);
  }

  function run() {
    setLog([]);
    print("Fetching user...");
    getUser(function (user) {
      print("Got user: " + user.name);
      getPosts(user.id, function (posts) {
        print("Got posts: " + posts.join(", "));
        getComments(posts[0], function (comments) {
          print("Got comments for " + posts[0] + ": " + comments.join(", "));
          print("Done — notice how each step nests one level deeper than the last.");
        });
      });
    });
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={run}>Run three nested async steps</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 130 }}>
        {log.length === 0 ? "// output appears here, one step at a time" : log.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "passing-named-callbacks",
      title: "A callback that delegates to named functions",
      summary: "The callback itself stays small by calling out to separately named, reusable functions.",
      code: `function App() {
  const [log, setLog] = useState([]);

  function print(value) {
    setLog((prev) => [...prev, String(value)]);
  }

  function announceEven(n) {
    return n + " is even";
  }

  function announceOdd(n) {
    return n + " is odd";
  }

  function run() {
    setLog([]);
    const numbers = [1, 2, 3, 4, 5];
    numbers.forEach(function (n) {
      const message = n % 2 === 0 ? announceEven(n) : announceOdd(n);
      print(message);
    });
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={run}>Run forEach with a callback calling named functions</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 120 }}>
        {log.length === 0 ? "// output appears here" : log.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
