import type { Topic } from "../../types";

export const nodeModuleWrapperTopic: Topic = {
  id: "node-module-wrapper",
  title: "The Node.js Module Wrapper Function",
  category: "Modules",
  shortExplanation: `Before running any CommonJS file, Node.js secretly wraps its entire contents in a function that looks like: \`(function(exports, require, module, __filename, __dirname) { /* your code */ })\`.

- This is ==the actual reason== \`module\`, \`exports\`, \`require\`, \`__filename\`, and \`__dirname\` exist in every file with no import
- They're just ordinary **function parameters** — Node calls this wrapper function for you and passes them in
- A side effect: your file's "top-level" code isn't really global — it's scoped inside this function, so variables don't leak between files`,
  longExplanation: `It can look like magic the first time you notice it: every CommonJS file automatically has access to \`module\`, \`exports\`, \`require\`, \`__dirname\`, and \`__filename\`, without a single import statement anywhere. The real explanation is refreshingly mechanical — Node.js is quietly doing something to your code before it ever runs.

- **What actually happens**: when Node loads a CommonJS file, it doesn't hand your code straight to V8 as-is. It first takes the entire text of your file and wraps it inside a function, producing something conceptually like this:

  \`(function(exports, require, module, __filename, __dirname) {\`
  \`  // your entire file's code goes here\`
  \`});\`

  Node then calls that function itself, passing in the real \`module.exports\` object, the real \`require\` function (scoped to resolve paths correctly relative to this specific file), and the real \`__filename\`/\`__dirname\` for this file — as ordinary function arguments. This is exactly why they're available: they aren't global variables at all, they're **parameters of a function Node calls on your behalf**, and every file gets its own freshly-created set of them.
- **Why wrap the file in a function at all, instead of just handing you the globals directly?** Two big reasons. First, it gives every file **its own private scope** for free — a variable declared with \`var myCounter = 0;\` at the "top level" of one file is really just a local variable inside that file's wrapper function, completely invisible to every other file's wrapper function. Without this, every CommonJS file in a program would share one single global scope, and two unrelated files each declaring \`var myCounter\` would silently stomp on each other. Second, it's what lets \`__filename\`/\`__dirname\`/\`require\` be *correct per file* — since each file's wrapper function is called with different arguments matching that specific file's own location, a single shared \`require\` function couldn't resolve relative paths correctly for every file at once the way this per-file version can.
- **The real implementation detail** (simplified from Node's actual internals): when a module is loaded, Node reads the file's source as plain text, wraps it using a template similar to the one shown above (Node's internal \`Module.wrap()\` function does exactly this), compiles the wrapped text into an actual JavaScript function, and then invokes that function with the five real arguments. This whole process happens once per file, the first time it's required — tying directly into the require-caching behavior covered in this subject's CommonJS topic.
- **ES modules don't work this way.** This entire wrapper mechanism is specific to CommonJS — it's precisely why \`__dirname\`/\`__filename\` aren't available in ES modules (there's no wrapper function quietly injecting them as parameters there) and why ESM's top-level scope behaves differently (module-level bindings in ESM have their own dedicated scoping rules defined directly by the language, rather than being an emergent side effect of a wrapper function trick).
- **A subtle consequence worth knowing**: since your file's code runs *inside* a function, a bare \`return\` statement at the top level of a CommonJS file is actually completely legal JavaScript (it just returns from the wrapper function early, skipping the rest of the file) — something that would be a syntax error in a true top-level/global scope. This is a small but telling clue that CommonJS "top-level" code was never really top-level at all.

Since this is genuinely how Node.js works internally — not something that needs a browser stand-in — the examples below define an actual function shaped exactly like Node's real wrapper and call it manually with representative arguments, which faithfully demonstrates the real mechanism rather than simulating it.`,
  examples: [
    {
      id: "the-wrapper-as-text",
      title: "The wrapper function, shown literally",
      summary: "This is what Node.js effectively wraps around every CommonJS file's contents before running it.",
      code: `function App() {
  const wrapperTemplate = [
    "(function(exports, require, module, __filename, __dirname) {",
    "",
    "  // ---- your entire file's code goes here ----",
    "  const mathUtils = require('./mathUtils');",
    "  module.exports = { double: (n) => n * 2 };",
    "  // ---------------------------------------------",
    "",
    "});",
  ].join("\\n");

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6 }}>{wrapperTemplate}</pre>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        Node calls this function itself, passing in the real module, exports, require, __filename, and
        __dirname for that specific file as arguments.
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "calling-the-wrapper-manually",
      title: "Calling a wrapper function manually",
      summary: "A real function shaped exactly like Node's wrapper, invoked by hand with representative arguments — this genuinely runs.",
      code: `// A real function with the exact same parameter shape Node.js uses internally:
const moduleWrapper = function (exportsParam, requireParam, moduleParam, __filename, __dirname) {
  print2("Inside the wrapper, __filename is: " + __filename);
  print2("Inside the wrapper, __dirname is: " + __dirname);
  exportsParam.greet = function (name) {
    return "Hello from a manually-invoked module, " + name + "!";
  };
};

let logLines = [];
function print2(value) {
  logLines.push(value);
}

function App() {
  const [log, setLog] = useState([]);

  function run() {
    logLines = [];
    // Representative fake arguments, standing in for what Node.js would really pass:
    const fakeModule = { exports: {} };
    const fakeRequire = (path) => ({});
    moduleWrapper(fakeModule.exports, fakeRequire, fakeModule, "/app/greeter.js", "/app");
    print2("Calling the exported function: " + fakeModule.exports.greet("Ada"));
    setLog([...logLines]);
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={run}>Manually call the module wrapper</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 90 }}>
        {log.length === 0 ? "// output appears here" : log.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "why-var-does-not-leak",
      title: "Why a var in one 'file' can't leak into another",
      summary: "Two wrapper functions each create their own private scope — this is genuinely demonstrated, not simulated.",
      code: `// Two separate "files", each wrapped in its own function, exactly like Node does per-file:
function fileOneWrapper() {
  var counter = 1;
  return { getCounter: () => counter };
}

function fileTwoWrapper() {
  var counter = 999; // a completely different "counter" — no collision with file one's
  return { getCounter: () => counter };
}

function App() {
  const [output, setOutput] = useState("");

  function run() {
    const fileOne = fileOneWrapper();
    const fileTwo = fileTwoWrapper();
    setOutput(
      "File one's counter: " + fileOne.getCounter() + "\\n" +
      "File two's counter: " + fileTwo.getCounter() + "\\n" +
      "Both used 'var counter' — but neither could see or affect the other's value."
    );
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={run}>Run both "files"</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 80 }}>
        {output || "// output appears here"}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "bare-return-at-top-level",
      title: "A bare return only makes sense because you're inside a function",
      summary: "Real, working proof that CommonJS 'top-level' code is actually function-scoped.",
      code: `// This function represents an entire CommonJS file's wrapped contents:
function fileWrapper(shouldStopEarly) {
  const linesRun = [];
  linesRun.push("Line 1 of the file ran.");

  if (shouldStopEarly) {
    linesRun.push("Returning early — this is only legal because we're inside a function!");
    return linesRun;
  }

  linesRun.push("Line 2 of the file ran (only reached if we didn't return early).");
  return linesRun;
}

function App() {
  const [output, setOutput] = useState([]);

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={() => setOutput(fileWrapper(true))}>Run "file" with early return</button>
        <button onClick={() => setOutput(fileWrapper(false))}>Run "file" without early return</button>
      </div>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 70 }}>
        {output.length === 0 ? "// output appears here" : output.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
