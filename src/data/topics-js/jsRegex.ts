import type { Topic } from "../../types";

export const jsRegexTopic: Topic = {
  id: "js-regex",
  title: "JavaScript Regular Expressions",
  category: "Browser & Modern JS",
  shortExplanation: `A **regular expression** (regex) is a pattern used to match, test, or extract text — written between slashes, \`/pattern/flags\`, as its own kind of value in JavaScript.

- \`.test(str)\` returns \`true\`/\`false\` for whether the pattern matches anywhere in the string
- \`.match(regex)\` (on a string) returns the actual matched text; \`.replace(regex, replacement)\` swaps matched text out
- Flags change how matching works — \`g\` (global, find *every* match, not just the first) and \`i\` (case-insensitive) are the two used most often`,
  longExplanation: `A **regular expression**, or *regex*, is a compact, specialized mini-language for describing a *pattern* of text, rather than one exact string to match. Instead of checking "does this string exactly equal 555-1234", a regex can check "does this string look like three digits, a dash, then four digits" — matching an entire category of text at once. In JavaScript, a regex is its own kind of value, most commonly written as a **literal** directly in the source code, delimited by forward slashes: \`/pattern/flags\`, e.g. \`/cat/\` or \`/[0-9]+/g\`.

Inside the pattern, most ordinary characters just match themselves literally — \`/cat/\` matches the exact text "cat" wherever it appears. The real power comes from special pattern syntax layered on top. A **character class**, written in square brackets, matches *any one* character from the set listed inside it: \`[0-9]\` matches any single digit, \`[a-zA-Z]\` matches any single letter regardless of case, and \`[aeiou]\` matches any single vowel. A **quantifier** placed right after something says how many times it can repeat: \`+\` means "one or more," \`*\` means "zero or more," \`?\` means "zero or one" (optional), and \`{2,}\` means "two or more." So \`[0-9]+\` means "one or more digits in a row" — enough to match a whole multi-digit number, not just a single digit. **Anchors** pin a match to a specific position rather than letting it match anywhere inside the string: \`^\` means "the very start of the string," and \`$\` means "the very end" — wrapping a pattern in both, like \`/^[0-9]+$/\`, requires the *entire* string to be nothing but digits, rather than merely containing some digits somewhere inside it.

Two **flags**, appended after the closing slash, change how the whole pattern behaves. \`i\` makes the match case-insensitive, so \`/cat/i\` matches "Cat", "CAT", and "cat" alike. \`g\` (global) tells a method to keep finding *every* match in the string rather than stopping after the first one — this matters a lot for \`.replace()\` in particular, since without \`g\` it only swaps out the first occurrence, exactly like the plain \`.replace()\` behavior covered in the string methods topic.

With a regex value in hand, three methods do almost everything a beginner needs. \`regex.test(str)\` is the simplest: it returns a plain \`true\`/\`false\` for whether the pattern matches anywhere in \`str\` — perfect for validation checks. \`str.match(regex)\` runs the regex *against* a string (note it's called on the string, with the regex as the argument) and returns the actual matched text (or \`null\` if nothing matched; with the \`g\` flag, it returns *all* matches as an array). \`str.replace(regex, replacement)\` works like the string \`.replace()\` already covered, but accepting a regex unlocks pattern-based replacement — with the \`g\` flag, every match gets replaced, not just the first.

Two classic, beginner-friendly patterns worth internalizing: a **digits-only** check, \`/^[0-9]+$/\`, useful for validating something like a PIN or a quantity field; and a deliberately simplified **email shape** check, \`/^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$/\` — "some characters, an @, some more characters, a dot, then at least two letters." Real email validation is famously more complicated than it looks (the full official spec allows far stranger addresses than most people expect), so a pattern like this is meant as a reasonable, good-enough sanity check on user input, not a bulletproof, spec-complete validator.`,
  examples: [
    {
      id: "test-digits-only",
      title: "Testing for digits-only input, live",
      summary: "A real /^[0-9]+$/ pattern checked against whatever you type.",
      code: `function App() {
  const [text, setText] = useState("12345");
  const digitsOnly = /^[0-9]+$/;

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <input value={text} onChange={(e) => setText(e.target.value)} style={{ padding: 8, width: 200 }} />
      <p>Pattern: /^[0-9]+$/</p>
      <p>digitsOnly.test(text): <strong>{String(digitsOnly.test(text))}</strong></p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "match-and-replace",
      title: "Extracting numbers with .match(), redacting with .replace()",
      summary: "The g flag finds every match, not just the first one.",
      code: `function App() {
  const [log, setLog] = useState([]);

  function print(value) {
    setLog((prev) => [...prev, String(value)]);
  }

  function run() {
    setLog([]);
    const sentence = "Order 42 has 3 items and cost 99 dollars";
    const numberPattern = /[0-9]+/g;

    const found = sentence.match(numberPattern);
    print("Found numbers: " + found.join(", "));

    const redacted = sentence.replace(numberPattern, "#");
    print("Redacted: " + redacted);
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={run}>Extract and redact numbers</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 100 }}>
        {log.length === 0 ? "// output appears here" : log.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "case-insensitive-flag",
      title: "The i flag makes matching case-insensitive",
      summary: "The exact same pattern behaves differently with and without the i flag.",
      code: `function App() {
  const [text, setText] = useState("JavaScript is great");
  const caseSensitive = /javascript/;
  const caseInsensitive = /javascript/i;

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <input value={text} onChange={(e) => setText(e.target.value)} style={{ padding: 8, width: 260 }} />
      <p>/javascript/.test(text): <strong>{String(caseSensitive.test(text))}</strong></p>
      <p>/javascript/i.test(text): <strong>{String(caseInsensitive.test(text))}</strong></p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "basic-email-shape-check",
      title: "A simplified email shape check",
      summary: "A beginner-friendly sanity check, not a fully spec-compliant validator.",
      code: `function App() {
  const [text, setText] = useState("ada@example.com");
  const emailShape = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$/;

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <input value={text} onChange={(e) => setText(e.target.value)} style={{ padding: 8, width: 260 }} />
      <p>emailShape.test(text): <strong>{String(emailShape.test(text))}</strong></p>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        This is a simplified sanity check, not a fully spec-compliant email validator.
      </p>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
