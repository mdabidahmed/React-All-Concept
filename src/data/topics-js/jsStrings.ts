import type { Topic } from "../../types";

export const jsStringsTopic: Topic = {
  id: "js-strings",
  title: "JavaScript Strings",
  category: "Strings & Numbers",
  shortExplanation: `A **string** is JavaScript's data type for text — a sequence of characters created with single quotes, double quotes, or backticks (all three produce an equivalent plain string). Strings are ==immutable==: no built-in method ever changes an existing string in place, each one always returns a *brand new* string.

- Individual characters are read with bracket notation, e.g. \`str[0]\` for the first character
- \`.length\` gives the character count, e.g. \`"hello".length\` is \`5\`
- Escape characters like \`\\n\` (newline), \`\\'\` (escaped single quote), and \`\\"\` (escaped double quote) let a string contain characters that would otherwise end it early`,
  longExplanation: `Text shows up in almost every program — names, messages, URLs, user input — and JavaScript's **string** type is how all of that is represented. A string is created by wrapping characters in matching quotes: single (\`'hello'\`), double (\`"hello"\`), or backticks (\`\`hello\`\`). For a plain string with no interpolation, all three behave identically — which one to reach for is mostly a style choice, though picking whichever quote style doesn't appear *inside* the text avoids extra escaping. Backticks have one extra super-power (template literals, covered in its own topic) that single and double quotes don't.

The most important — and most commonly misunderstood — fact about strings is that they are **immutable**. A string is a primitive value, not an object with an internal, editable array of characters. When you call a method like \`.toUpperCase()\` on a string, JavaScript does not reach in and rewrite its characters; it computes an entirely new string and returns that, leaving the original completely untouched. This means:

- \`const name = "ada"; name.toUpperCase();\` produces \`"ADA"\` as a *new* string, but \`name\` itself still holds \`"ada"\` afterward — unless you explicitly capture the result: \`const upper = name.toUpperCase();\`
- Every single string method in JavaScript works this way — \`.trim()\`, \`.slice()\`, \`.replace()\`, and every other one always return a new string rather than mutating the original
- You also cannot reassign a single character directly — something like \`name[0] = "A"\` silently does nothing (or throws in strict mode); the only way to "change" a string is to build a new one and store it, typically by reassigning the variable that holds it

This is a deliberate design choice, not a limitation. Because a string can never be secretly modified by some other piece of code that merely holds a reference to it, passing a string into a function is always safe — the caller's copy is guaranteed to still say the same thing afterward. Arrays and objects don't get this guarantee, which is exactly why bugs from unexpected mutation tend to involve those, not strings.

Individual characters are read using bracket notation with a zero-based index: \`str[0]\` is the first character, \`str[1]\` the second, and so on. Asking for an index beyond the end of the string (\`str[999]\`) doesn't throw an error — it simply returns \`undefined\`. The \`.length\` property reports how many characters a string contains, and since indexing starts at \`0\`, the last valid index of any string is always \`str.length - 1\`.

Escape characters solve a different problem: what if the text itself needs to include a character with special meaning, like the very quote mark being used to delimit the string? A backslash before a character gives it special treatment inside a string literal — \`\\n\` inserts a newline, \`\\t\` inserts a tab, \`\\\\\` inserts a literal backslash, and \`\\'\` or \`\\"\` insert a literal quote mark without ending the string early. A string written with double quotes never needs to escape an apostrophe inside it (\`"it's fine"\` works as-is), and a string written with single quotes never needs to escape internal double quotes — escaping is only required when the quote character inside the text matches the one delimiting the string.`,
  examples: [
    {
      id: "creating-strings",
      title: "Three equivalent ways to create a string",
      summary: "Single quotes, double quotes, and backticks all produce the same plain string.",
      code: `function App() {
  const [log, setLog] = useState([]);

  function print(value) {
    setLog((prev) => [...prev, String(value)]);
  }

  function run() {
    setLog([]);
    const a = 'hello';
    const b = "hello";
    const c = \`hello\`;
    print("a === b: " + (a === b));
    print("b === c: " + (b === c));
    print("typeof a: " + typeof a);
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={run}>Compare quote styles</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 80 }}>
        {log.length === 0 ? "// output appears here" : log.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "string-immutability",
      title: "Strings never change in place",
      summary: "Calling .toUpperCase() returns a new string; the original variable is untouched.",
      code: `function App() {
  const [log, setLog] = useState([]);

  function print(value) {
    setLog((prev) => [...prev, String(value)]);
  }

  function run() {
    setLog([]);
    const original = "hello world";
    const shouted = original.toUpperCase();
    print("original: " + original);
    print("shouted: " + shouted);
    print("original is still: " + original);
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={run}>Run immutability check</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 80 }}>
        {log.length === 0 ? "// output appears here" : log.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "accessing-characters",
      title: "Indexing characters and reading .length",
      summary: "Type any text and see its length plus its first and last characters, live.",
      code: `function App() {
  const [text, setText] = useState("JavaScript");

  const firstChar = text.length > 0 ? text[0] : "(empty)";
  const lastChar = text.length > 0 ? text[text.length - 1] : "(empty)";

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type something..."
        style={{ padding: 8, width: 220 }}
      />
      <p>Length: <strong>{text.length}</strong></p>
      <p>First character (text[0]): <strong>{firstChar}</strong></p>
      <p>Last character (text[text.length - 1]): <strong>{lastChar}</strong></p>
      <p>Out-of-range index (text[999]): <strong>{String(text[999])}</strong></p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "escape-characters",
      title: "Escape characters inside a string",
      summary: "Backslash sequences insert a newline, a literal quote, and a literal backslash.",
      code: `function App() {
  const [log, setLog] = useState([]);

  function print(value) {
    setLog((prev) => [...prev, String(value)]);
  }

  function run() {
    setLog([]);
    const twoLines = "Line one\\nLine two";
    const withApostrophe = 'It\\'s escaped';
    const withQuote = "She said \\"hi\\"";
    const withBackslash = "C:\\\\Users\\\\ada";
    print(twoLines);
    print(withApostrophe);
    print(withQuote);
    print(withBackslash);
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={run}>Run escape examples</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 100 }}>
        {log.length === 0 ? "// output appears here" : log.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
