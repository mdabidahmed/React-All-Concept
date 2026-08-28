import type { Topic } from "../../types";

export const jsTemplateLiteralsTopic: Topic = {
  id: "js-template-literals",
  title: "JavaScript Template Literals",
  category: "Strings & Numbers",
  shortExplanation: `A **template literal** is a string delimited by backticks instead of quotes, and it supports two things a regular quoted string can't: expression interpolation with \`\${expression}\`, and real multi-line text with no escape codes needed.

- \`\${expression}\` embeds *any* JavaScript expression directly inside the string — it's evaluated and automatically converted to text
- A backtick string can span multiple lines exactly as typed in the source, no \`\\n\` required
- They largely replace the older pattern of building strings with \`+\` concatenation, which gets hard to read once more than one or two values are involved`,
  longExplanation: `Before template literals existed, building a string out of several pieces meant chaining them together with the \`+\` operator: \`"Hello, " + name + "! You are " + age + " years old."\`. This works, but every variable requires breaking out of the string, adding a \`+\`, and carefully tracking spaces at each seam — it gets error-prone and hard to read fast once a handful of values are involved. Template literals, written with backticks instead of single or double quotes, were added specifically to solve this.

The key feature is **interpolation**: anywhere inside a backtick string, \`\${expression}\` embeds a JavaScript expression directly in the text. The exact same message above becomes one continuous, readable string with the two variables marked inline, instead of scattered across several \`+\` operators. Critically, what goes inside \`\${}\` isn't limited to a plain variable — it can be *any* expression: arithmetic like \`\${price * quantity}\`, a function call like \`\${formatDate(date)}\`, a ternary like \`\${count > 0 ? "items" : "no items"}\`, or property access like \`\${user.name}\`. JavaScript evaluates the expression first, converts the result to a string (calling \`.toString()\` on it if it isn't one already), and splices that text into place.

The second feature is **real multi-line strings**. Writing a newline directly inside a single- or double-quoted string is a syntax error — the only way to include one is the escape sequence \`\\n\`, which makes multi-paragraph text hard to read in the source because it's all crammed onto one line. A backtick string can simply be typed across multiple physical lines, and every line break in the source becomes an actual newline character in the resulting string — no \`\\n\` needed at all, though \`\\n\` still works inside a template literal if you prefer it.

A few things are worth knowing as you adopt them. First, whitespace and indentation inside a multi-line template literal are preserved exactly as typed — if the template is indented to match the surrounding code, that indentation becomes part of the string itself, which can be a surprise the first time it happens. Second, template literals are still just strings once created; every string method from the strings and string-methods topics (\`.trim()\`, \`.split()\`, \`.length\`, and so on) works on them identically. Third, because backticks and the dollar-brace pairing now carry special meaning, including either of them as literal characters inside a template literal requires putting a backslash directly in front of the character so JavaScript treats it as plain text instead of special syntax.

Template literals didn't replace single and double quotes entirely — a short, static string like \`"OK"\` or \`'error'\` with no dynamic content is arguably just as clear either way, and picking single or double quotes for those is purely a style preference. But the moment a string needs to weave in a variable, an expression, or span multiple lines, template literals are the modern, idiomatic choice, and most JavaScript style guides now default to them over manual \`+\` concatenation whenever any interpolation is involved.`,
  examples: [
    {
      id: "basic-interpolation",
      title: "Interpolating variables into a greeting",
      summary: "Two inputs feed live values directly into a template literal with ${}.",
      code: `function App() {
  const [name, setName] = useState("Ada");
  const [topic, setTopic] = useState("JavaScript");

  const greeting = \`Hello, \${name}! Ready to learn some \${topic}?\`;

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <div style={{ display: "flex", gap: 8 }}>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" style={{ padding: 8, width: 140 }} />
        <input value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="Topic" style={{ padding: 8, width: 140 }} />
      </div>
      <p>{greeting}</p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "multiline-template",
      title: "A multi-line string with no \\n needed",
      summary: "The template literal spans multiple lines in the source exactly as it will render.",
      code: `function App() {
  const [log, setLog] = useState([]);

  function print(value) {
    setLog((prev) => [...prev, String(value)]);
  }

  function run() {
    setLog([]);
    const name = "Ada";
    const message = \`Dear \${name},
Thank you for signing up.
We hope you enjoy the course.\`;
    print(message);
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={run}>Build multi-line message</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 100, whiteSpace: "pre-wrap" }}>
        {log.length === 0 ? "// output appears here" : log.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "concatenation-vs-template",
      title: "Old-style concatenation vs. a template literal",
      summary: "Both produce the exact same string — one is far easier to read at a glance.",
      code: `function App() {
  const [name, setName] = useState("Ada");
  const [age, setAge] = useState(28);

  const oldWay = "My name is " + name + " and I am " + age + " years old.";
  const newWay = \`My name is \${name} and I am \${age} years old.\`;

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <div style={{ display: "flex", gap: 8 }}>
        <input value={name} onChange={(e) => setName(e.target.value)} style={{ padding: 8, width: 120 }} />
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(Number(e.target.value))}
          style={{ padding: 8, width: 80 }}
        />
      </div>
      <p>Concatenation: {oldWay}</p>
      <p>Template literal: {newWay}</p>
      <p>Same result: <strong>{String(oldWay === newWay)}</strong></p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "expressions-inside-interpolation",
      title: "Any expression can go inside ${}",
      summary: "Arithmetic, a function call, and a ternary — all evaluated live inside one template literal.",
      code: `function App() {
  const [price, setPrice] = useState(19.99);
  const [quantity, setQuantity] = useState(3);

  function formatCurrency(n) {
    return "$" + n.toFixed(2);
  }

  const summary = \`\${quantity} item(s) x \${formatCurrency(price)} = \${formatCurrency(price * quantity)}\`;
  const stockNote = \`Status: \${quantity > 5 ? "Bulk order" : "Standard order"}\`;

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <div style={{ display: "flex", gap: 8 }}>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          style={{ padding: 8, width: 100 }}
        />
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          style={{ padding: 8, width: 80 }}
        />
      </div>
      <p>{summary}</p>
      <p>{stockNote}</p>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
