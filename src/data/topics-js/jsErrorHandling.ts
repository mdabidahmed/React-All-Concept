import type { Topic } from "../../types";

export const jsErrorHandlingTopic: Topic = {
  id: "js-error-handling",
  title: "JavaScript Error Handling",
  category: "DOM & Events",
  shortExplanation: `**Error handling** lets a program deal with something going wrong *on its own terms*, instead of crashing outright.

- \`try { ... } catch (error) { ... }\` — run risky code, and catch whatever goes wrong instead of letting it stop everything
- \`finally { ... }\` — runs no matter what, whether the try succeeded or the catch ran
- \`throw new Error("message")\` — deliberately raise your own error, with a \`.message\` describing what went wrong`,
  longExplanation: `Not every operation succeeds: a network request can fail, a file can be missing, user-provided text might not be valid JSON, a function might be called with the wrong kind of input. Left alone, an error thrown in JavaScript stops execution of the current function (and bubbles up the call stack looking for something to catch it) — if nothing ever catches it, it typically gets logged to the console and the surrounding code simply doesn't finish running. Error handling is how a program takes control of that instead of leaving it to chance.

- \`try { ... }\` wraps a block of "risky" code — anything that might throw. If everything inside runs without error, the \`catch\` block is simply skipped entirely
- \`catch (error) { ... }\` only runs if something inside the matching \`try\` block threw. The \`error\` parameter is the actual thrown value — almost always an \`Error\` object (or a subclass of it), which carries a \`.message\` property describing what went wrong, and a \`.name\` property naming the error type (like \`"TypeError"\` or \`"SyntaxError"\`)
- \`finally { ... }\` is optional, and runs **unconditionally** — whether the \`try\` block succeeded, or the \`catch\` block ran, or even if the \`try\`/\`catch\` contains a \`return\` statement. It's the right place for cleanup that absolutely must happen either way, like closing a connection or resetting a loading indicator
- \`throw\` lets code deliberately raise its own error, rather than only reacting to errors the JavaScript engine raises on its own. \`throw new Error("Age cannot be negative")\` creates a real \`Error\` object with that message and interrupts execution exactly like a built-in error would — any surrounding \`try\`/\`catch\` up the call stack can catch it the same way. This is the standard way for a function to say "I was given bad input, and I refuse to continue" in a way that calling code can respond to, rather than the function silently returning something wrong or corrupt
- A very real, common source of thrown errors: \`JSON.parse(someString)\` throws a genuine \`SyntaxError\` the instant the string it's given isn't valid JSON. Any code that parses JSON from an untrustworthy source (user input, an unreliable API, \`localStorage\` that might have been tampered with) should wrap that call in a \`try\`/\`catch\` — otherwise a single malformed string can crash an entire feature
- Errors can also be custom classes that extend the built-in \`Error\` (\`class ValidationError extends Error { ... }\`), which lets a \`catch\` block check \`error instanceof ValidationError\` to react differently to different categories of failure — useful once an app has more than one kind of thing that can go wrong

The core mindset error handling encourages is defensive: assume an operation *can* fail, decide in advance what should happen if it does, and make sure the user sees something helpful (a friendly message) rather than the raw technical failure (or, worse, a silently broken feature with no explanation at all). The examples below trigger genuine JavaScript errors — including a real \`JSON.parse\` failure — and catch them for real, rather than simulating what an error would look like.`,
  examples: [
    {
      id: "try-catch-finally-basics",
      title: "try / catch / finally, in order",
      summary: "A deliberately thrown error shows exactly which block runs, and that finally always runs last.",
      code: `function App() {
  const [log, setLog] = useState([]);

  function print(value) {
    setLog((prev) => [...prev, value]);
  }

  function run() {
    setLog([]);
    try {
      print("1. Inside try — about to throw");
      throw new Error("Something went wrong on purpose");
    } catch (error) {
      print("2. Inside catch — caught: " + error.message);
    } finally {
      print("3. Inside finally — always runs");
    }
    print("4. Execution continues normally after the try/catch/finally");
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={run}>Run try/catch/finally</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 110 }}>
        {log.length === 0 ? "// output appears here" : log.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "throwing-a-custom-error",
      title: "throw-ing a custom, meaningful error",
      summary: "A validation function refuses bad input by throwing, and the caller decides how to react.",
      code: `function App() {
  const [age, setAge] = useState("25");
  const [result, setResult] = useState("");

  function validateAge(value) {
    const parsed = Number(value);
    if (Number.isNaN(parsed)) {
      throw new Error("Age must be a number.");
    }
    if (parsed < 0) {
      throw new Error("Age cannot be negative.");
    }
    return parsed;
  }

  function handleCheck() {
    try {
      const validAge = validateAge(age);
      setResult("Valid age: " + validAge);
    } catch (error) {
      setResult("Rejected: " + error.message);
    }
  }

  return (
    <div style={{ display: "grid", gap: 10, maxWidth: 280 }}>
      <input value={age} onChange={(e) => setAge(e.target.value)} placeholder="Enter an age" />
      <button onClick={handleCheck}>Validate</button>
      {result && <p style={{ fontSize: 13 }}>{result}</p>}
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "json-parse-real-error",
      title: "Catching a real JSON.parse failure",
      summary: "A genuine SyntaxError from malformed JSON, caught and turned into a friendly message instead of crashing.",
      code: `function App() {
  const [text, setText] = useState('{"name": "Ada"');
  const [result, setResult] = useState(null);
  const [isError, setIsError] = useState(false);

  function handleParse() {
    try {
      const parsed = JSON.parse(text);
      setResult(JSON.stringify(parsed));
      setIsError(false);
    } catch (error) {
      setResult("Couldn't read that as JSON (" + error.message + ")");
      setIsError(true);
    }
  }

  return (
    <div style={{ display: "grid", gap: 10, maxWidth: 320 }}>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={3}
        style={{ fontFamily: "monospace" }}
      />
      <button onClick={handleParse}>JSON.parse(text)</button>
      {result && (
        <p style={{ color: isError ? "#dc2626" : "#15803d", fontSize: 13 }}>{result}</p>
      )}
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        The starting text above is missing a closing brace — try fixing it to see the success path too.
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "safe-divide-friendly-fallback",
      title: "A friendly fallback instead of crashing",
      summary: "Dividing by zero doesn't throw in JS, but this custom guard throws on purpose so a friendly message can be shown.",
      code: `function App() {
  const [a, setA] = useState("10");
  const [b, setB] = useState("0");
  const [result, setResult] = useState("");

  function safeDivide(x, y) {
    if (y === 0) {
      throw new Error("Cannot divide by zero.");
    }
    return x / y;
  }

  function handleDivide() {
    try {
      const answer = safeDivide(Number(a), Number(b));
      setResult(a + " / " + b + " = " + answer);
    } catch (error) {
      setResult("Error: " + error.message);
    }
  }

  return (
    <div style={{ display: "grid", gap: 10, maxWidth: 280 }}>
      <div style={{ display: "flex", gap: 8 }}>
        <input value={a} onChange={(e) => setA(e.target.value)} style={{ width: 80 }} />
        <span style={{ alignSelf: "center" }}>/</span>
        <input value={b} onChange={(e) => setB(e.target.value)} style={{ width: 80 }} />
      </div>
      <button onClick={handleDivide}>Divide</button>
      {result && <p style={{ fontSize: 13 }}>{result}</p>}
    </div>
  );
}

render(<App />);`,
    },
  ],
};
