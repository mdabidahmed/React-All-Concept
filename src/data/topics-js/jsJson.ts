import type { Topic } from "../../types";

export const jsJsonTopic: Topic = {
  id: "js-json",
  title: "JavaScript JSON",
  category: "Objects & Arrays",
  shortExplanation: `**JSON** (JavaScript Object Notation) is a plain-text data format, not JavaScript itself — it's just a string format that *looks* like JS object/array syntax.

- \`JSON.stringify(value)\` — converts a JS object/array into a **JSON string**
- \`JSON.parse(jsonString)\` — converts a JSON string back into a real JS object/array
- JSON is the standard format for sending and receiving data between a browser and a server
- JSON is stricter than a JS object literal: keys **must** be double-quoted strings, and functions/\`undefined\` are not valid JSON values`,
  longExplanation: `JSON stands for **JavaScript Object Notation**, and while its syntax was directly inspired by JavaScript's own object and array literals, it's important to understand that JSON is not JavaScript — it's a **language-independent, text-based data format** that just happens to look like JS syntax. Its entire purpose is representing structured data as a plain string, so that data can be saved to a file, sent over a network, or passed between completely different programming languages that all understand this one shared, simple format.

- **\`JSON.stringify(value)\`** takes a JavaScript value — most commonly an object or array — and converts it into a **JSON-formatted string**: \`JSON.stringify({ name: "Ada", age: 30 })\` produces the string \`'{"name":"Ada","age":30}'\`. This is the direction used whenever JS data needs to be sent somewhere else — saved into \`localStorage\` (which only stores strings), sent in the body of a network request, or logged in a portable, shareable text form
- **\`JSON.parse(jsonString)\`** does the reverse: given a valid JSON string, it reconstructs a real JavaScript object or array from it: \`JSON.parse('{"name":"Ada","age":30}')\` produces an actual object with a genuine \`.name\` and \`.age\` you can access normally. This is the direction used whenever JSON text arrives from *somewhere else* — read back out of \`localStorage\`, or received as the body of a network response — and needs to become usable JavaScript data again rather than just a string
- Conceptually, this stringify/parse round trip is exactly what happens whenever a web app talks to a server: the browser calls an API, the server responds with data formatted as a JSON string (since a network response is fundamentally just text), and the browser's JavaScript calls \`JSON.parse()\` on that response text to turn it back into a usable object before working with it. Sending data to a server typically works the other way — a JS object is built, then \`JSON.stringify()\`'d before being sent as the request body. This sandbox has no real network calls, but understanding this round trip is essential background for any code that eventually will
- JSON's syntax is deliberately a **stricter subset** of JavaScript object/array literal syntax, and the differences matter whenever hand-writing JSON or debugging a "why won't this parse" error: JSON object keys **must** be wrapped in double quotes (\`{"name": "Ada"}\`, never \`{name: "Ada"}\` or \`{'name': "Ada"}\`) — this is the single most common mistake when writing JSON by hand. JSON also has **no support at all** for functions, \`undefined\`, comments, or trailing commas — none of these are valid JSON values or syntax, even though all of them are perfectly normal in a regular JS object literal
- Because \`undefined\` and functions aren't valid JSON, \`JSON.stringify()\` **silently drops** any object property whose value is \`undefined\` or a function (they simply don't appear in the resulting string at all), and converts \`undefined\` inside an *array* to \`null\` instead (since an array can't skip a slot the way an object can skip a key). This asymmetry is worth knowing, since it means round-tripping an object through \`JSON.stringify\` and back through \`JSON.parse\` isn't always perfectly lossless
- \`JSON.stringify()\` also accepts two optional extra arguments worth knowing about: a **replacer** (a function or array of keys, for filtering or transforming which properties get included), and a **space** value (a number or string used for indentation) — \`JSON.stringify(data, null, 2)\` is the standard idiom for producing nicely indented, human-readable JSON text, commonly seen when logging or displaying JSON for debugging
- A malformed JSON string passed to \`JSON.parse()\` throws a \`SyntaxError\` rather than failing quietly — a good reminder that any JSON coming from an external, less-trusted source (a network response, user-provided text) is worth wrapping in a \`try/catch\` before assuming it will parse successfully

Because virtually every web API communicates using JSON, and because it's the standard format for persisting structured data as text, \`JSON.stringify()\` and \`JSON.parse()\` are two of the most frequently used built-in functions in real-world JavaScript, even though the sandboxed examples here can only demonstrate the conversion itself rather than an actual network round trip.`,
  examples: [
    {
      id: "stringify-basics",
      title: "JSON.stringify() turns an object into text",
      summary: "An object literal converted into its JSON string form, with and without indentation.",
      code: `function App() {
  const [log, setLog] = useState([]);

  function print(value) {
    setLog((prev) => [...prev, String(value)]);
  }

  function run() {
    setLog([]);
    const user = { name: "Ada", age: 30, isAdmin: true };

    const compact = JSON.stringify(user);
    print("JSON.stringify(user) -> " + compact);
    print("typeof compact -> " + typeof compact + "  (it's just a STRING now)");

    const pretty = JSON.stringify(user, null, 2);
    print("");
    print("JSON.stringify(user, null, 2) (indented):");
    print(pretty);
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={run}>Run stringify demo</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 170 }}>
        {log.length === 0 ? "// output appears here" : log.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "parse-round-trip",
      title: "JSON.parse() reconstructs a real object",
      summary: "A JSON string is parsed back into an object with genuinely usable properties.",
      code: `function App() {
  const [log, setLog] = useState([]);

  function print(value) {
    setLog((prev) => [...prev, String(value)]);
  }

  function run() {
    setLog([]);
    const jsonText = '{"name":"Grace","age":36,"skills":["C","COBOL"]}';
    print("Raw JSON text (a string): " + jsonText);

    const parsed = JSON.parse(jsonText);
    print("typeof parsed -> " + typeof parsed);
    print("parsed.name -> " + parsed.name);
    print("parsed.skills[1] -> " + parsed.skills[1]);

    const backToString = JSON.stringify(parsed);
    print("Round trip (stringify again) -> " + backToString);
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={run}>Run parse demo</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 140 }}>
        {log.length === 0 ? "// output appears here" : log.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "json-drops-undefined-and-functions",
      title: "JSON has no room for undefined or functions",
      summary: "stringify silently drops properties that JSON simply cannot represent.",
      code: `function App() {
  const [log, setLog] = useState([]);

  function print(value) {
    setLog((prev) => [...prev, String(value)]);
  }

  function run() {
    setLog([]);
    const data = {
      name: "Ada",
      middleName: undefined,
      greet: function () {
        return "hi";
      },
      score: 100,
    };

    print("Original object has 4 properties: name, middleName, greet, score");
    const json = JSON.stringify(data);
    print("JSON.stringify(data) -> " + json);
    print("Notice: middleName and greet are both GONE — JSON can't represent them.");

    const arrayWithUndefined = [1, undefined, 3];
    print("JSON.stringify([1, undefined, 3]) -> " + JSON.stringify(arrayWithUndefined) + "  (becomes null in an array)");
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={run}>Run edge-case demo</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 130 }}>
        {log.length === 0 ? "// output appears here" : log.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "malformed-json-throws",
      title: "Malformed JSON throws — always try/catch untrusted input",
      summary: "An interactive box lets you try parsing your own text and see success or a clear error.",
      code: `function App() {
  const [text, setText] = useState('{"name": "Ada"}');
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  function tryParse() {
    try {
      const parsed = JSON.parse(text);
      setResult(JSON.stringify(parsed));
      setError("");
    } catch (err) {
      setResult(null);
      setError(err.message);
    }
  }

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <label style={{ width: "100%" }}>
        JSON text to parse (try removing a quote to see it fail):
        <br />
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{ width: "100%" }}
        />
      </label>
      <button onClick={tryParse}>Run JSON.parse()</button>
      {result !== null && <p>Success! Parsed value: <strong>{result}</strong></p>}
      {error !== "" && <p style={{ color: "#b91c1c" }}>SyntaxError: {error}</p>}
    </div>
  );
}

render(<App />);`,
    },
  ],
};
