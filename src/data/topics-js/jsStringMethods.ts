import type { Topic } from "../../types";

export const jsStringMethodsTopic: Topic = {
  id: "js-string-methods",
  title: "JavaScript String Methods",
  category: "Strings & Numbers",
  shortExplanation: `Strings come with a large set of built-in methods for reading and reshaping text — every one of them returns a *new* string (or array) rather than modifying the original.

- \`.slice()\` / \`.substring()\` pull out a portion of a string by position
- \`.toUpperCase()\` / \`.toLowerCase()\` / \`.trim()\` normalize casing and whitespace
- \`.replace()\` / \`.replaceAll()\` swap out matching text
- \`.split()\` breaks a string into an **array** of pieces
- \`.includes()\` / \`.startsWith()\` / \`.endsWith()\` answer yes/no questions about a string's contents`,
  longExplanation: `Once a string exists, the built-in string methods are the toolkit for reading it, searching it, and producing reshaped copies of it. Every method described here follows the immutability rule from the strings topic: none of them touch the original string — each returns a brand-new value, so the result always needs to be captured (assigned to a variable, or used directly) or it's lost.

**Extracting a portion.** \`.slice(start, end)\` returns the characters from index \`start\` up to (but not including) index \`end\`. Leaving off \`end\` slices to the end of the string, and negative numbers count backward from the end — \`"hello".slice(-3)\` gives \`"llo"\`. \`.substring(start, end)\` is very similar but treats negative or swapped arguments differently (it clamps negatives to \`0\` and swaps the arguments if \`start > end\` instead of interpreting them as "from the end"); \`.slice()\` is generally the more predictable, more commonly reached-for of the two.

**Changing case and trimming whitespace.** \`.toUpperCase()\` and \`.toLowerCase()\` return a copy converted to the given case — useful for case-insensitive comparisons, like checking if two usernames match regardless of how they were typed. \`.trim()\` removes whitespace from both ends of a string (handy for cleaning up form input a user may have accidentally padded with spaces); \`.trimStart()\` and \`.trimEnd()\` do just one side.

**Replacing text.** \`.replace(searchValue, newValue)\` returns a copy with the *first* match of \`searchValue\` swapped for \`newValue\`. This is a common gotcha: if the same text appears multiple times, \`.replace()\` only touches the first occurrence unless \`searchValue\` is a regular expression with the global (\`g\`) flag. \`.replaceAll(searchValue, newValue)\` was added specifically to solve this — it replaces *every* occurrence of a plain string match, no regular expression required.

**Splitting into an array.** \`.split(separator)\` is the bridge between strings and arrays: it breaks a string apart everywhere \`separator\` occurs and returns the pieces as an array, with the separator itself discarded. \`"a,b,c".split(",")\` produces \`["a", "b", "c"]\`. Splitting on \`""\` (an empty string) breaks a string into an array of its individual characters. The reverse operation, joining an array back into a string, is the array method \`.join(separator)\`.

**Asking yes/no questions.** \`.includes(substring)\` returns \`true\`/\`false\` for whether a substring appears anywhere inside the string. \`.startsWith(substring)\` and \`.endsWith(substring)\` check specifically the beginning or end. All three are case-sensitive — \`"Hello".includes("hello")\` is \`false\` — so comparisons that shouldn't care about case typically call \`.toLowerCase()\` on both sides first.

A theme runs through all of these: JavaScript's string API is intentionally read-only from the outside. Every method answers a question about the string or computes a transformed copy of it, and chaining several methods together (\`text.trim().toLowerCase().split(" ")\`) is a common, idiomatic way to build up a multi-step transformation in a single expression, reading left to right in the order each step happens.`,
  examples: [
    {
      id: "slice-and-substring",
      title: "Extracting portions with .slice()",
      summary: "Positive and negative indices pull out different parts of the same string.",
      code: `function App() {
  const [log, setLog] = useState([]);

  function print(value) {
    setLog((prev) => [...prev, String(value)]);
  }

  function run() {
    setLog([]);
    const text = "JavaScript";
    print("text.slice(0, 4): " + text.slice(0, 4));
    print("text.slice(4): " + text.slice(4));
    print("text.slice(-6): " + text.slice(-6));
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={run}>Run slice examples</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 90 }}>
        {log.length === 0 ? "// output appears here" : log.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "case-and-trim",
      title: "Normalizing case and whitespace, interactively",
      summary: "Type padded, mixed-case text and watch .trim() and .toUpperCase() clean it up.",
      code: `function App() {
  const [text, setText] = useState("   Hello There   ");

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{ padding: 8, width: 260 }}
      />
      <p>Original ("{text}") length: <strong>{text.length}</strong></p>
      <p>.trim() ("{text.trim()}") length: <strong>{text.trim().length}</strong></p>
      <p>.toUpperCase(): <strong>{text.toUpperCase()}</strong></p>
      <p>.toLowerCase(): <strong>{text.toLowerCase()}</strong></p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "replace-vs-replaceall",
      title: ".replace() only hits the first match",
      summary: ".replaceAll() is needed to swap out every occurrence of repeated text.",
      code: `function App() {
  const [log, setLog] = useState([]);

  function print(value) {
    setLog((prev) => [...prev, String(value)]);
  }

  function run() {
    setLog([]);
    const text = "cat sat on the cat mat";
    print("original: " + text);
    print(".replace(): " + text.replace("cat", "dog"));
    print(".replaceAll(): " + text.replaceAll("cat", "dog"));
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={run}>Compare replace methods</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 90 }}>
        {log.length === 0 ? "// output appears here" : log.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "split-into-array",
      title: "Splitting a sentence into words",
      summary: ".split(' ') turns a sentence into an array, which .map() can then transform.",
      code: `function App() {
  const [sentence, setSentence] = useState("the quick brown fox");

  const words = sentence.split(" ").filter((w) => w.length > 0);

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <input
        value={sentence}
        onChange={(e) => setSentence(e.target.value)}
        style={{ padding: 8, width: 260 }}
      />
      <p>Word count: <strong>{words.length}</strong></p>
      <ul>
        {words.map((word, i) => (
          <li key={i}>{word} ({word.length} letters)</li>
        ))}
      </ul>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "includes-starts-ends",
      title: "Asking yes/no questions about text",
      summary: ".includes(), .startsWith(), and .endsWith() checked live against typed input.",
      code: `function App() {
  const [text, setText] = useState("hello@example.com");

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{ padding: 8, width: 260 }}
      />
      <p>Includes "@": <strong>{String(text.includes("@"))}</strong></p>
      <p>Starts with "hello": <strong>{String(text.startsWith("hello"))}</strong></p>
      <p>Ends with ".com": <strong>{String(text.endsWith(".com"))}</strong></p>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
