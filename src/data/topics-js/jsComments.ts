import type { Topic } from "../../types";

export const jsCommentsTopic: Topic = {
  id: "js-comments",
  title: "JavaScript Comments",
  category: "JS Basics",
  shortExplanation: `**Comments** are notes in the source code that JavaScript completely ignores when it runs — they exist purely for humans reading the code.

- \`// single-line\` comments out everything to the end of that line
- \`/* multi-line */\` comments out everything between the markers, even across many lines
- Useful for explaining *why* code does something, and for temporarily disabling code while debugging`,
  longExplanation: `A comment is text in a source file that the JavaScript engine skips entirely — it has zero effect on how the program runs. Comments exist for the humans who read the code later, which is often *you*, a few months from now, having forgotten why a particular line exists.

- \`// this is a comment\` — the double-slash starts a **single-line comment**. Everything from \`//\` to the end of that physical line is ignored. It can sit on its own line, or trail after real code on the same line
- \`/* this is a comment */\` — the slash-star pair starts a **multi-line (block) comment**. Everything between \`/*\` and \`*/\` is ignored, no matter how many lines it spans, which makes it convenient for longer explanations or for commenting out entire blocks of code at once. Block comments cannot be nested — a \`/*\` inside another \`/* */\` block ends the *outer* comment early, at the first \`*/\` encountered
- A very common practical use is **temporarily disabling code** while debugging: instead of deleting a line you're not sure about, you comment it out, run the program to see the effect, and then either delete it for good or uncomment it back in. This is often called "commenting out" code, and most code editors have a keyboard shortcut (frequently Ctrl+/ or Cmd+/) to toggle a line or selection between commented and active
- Good comments explain the *why*, not the *what*. Code like \`x = x + 1; // add one to x\` is a useless comment — the code already says that. A useful comment instead explains reasoning that isn't obvious from the code itself, e.g. \`// we add 1 here to offset the zero-based index from the API\`
- Comments matter enormously for **maintainability**: a codebase that several people work on (or that one person returns to after months away) is far easier to understand when tricky decisions, workarounds, and non-obvious business rules are documented inline, right where the relevant code lives
- Overusing comments has a real cost too — comments can go stale (the code changes but the comment doesn't get updated to match), and too many comments stating the obvious add noise rather than clarity. A common guideline is to prefer clear variable and function names over comments wherever possible, and reserve actual comments for things names can't express: reasoning, warnings, and links to external context (like a ticket number or a spec)
- Documentation comment styles like \`/** ... */\` (used by tools such as JSDoc) are just block comments with a stricter convention, letting editors show helpful hints (parameter names, expected types) when you hover over a function elsewhere in the code

Comments cost nothing at runtime — they're stripped out or ignored before execution — so there's no performance reason to avoid them. The only real cost is clutter, so the goal is a small number of comments that each earn their place.`,
  examples: [
    {
      id: "single-line-comments",
      title: "Single-line comments with //",
      summary: "Text after // on a line is ignored — only the actual statements run.",
      code: `function App() {
  const [log, setLog] = useState([]);

  function print(value) {
    setLog((prev) => [...prev, String(value)]);
  }

  function run() {
    setLog([]);
    // This whole line is a comment and does nothing.
    let price = 20; // this trailing comment is also ignored
    let quantity = 3;
    print("price = " + price);
    print("quantity = " + quantity);
    print("total = " + price * quantity);
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={run}>Run with comments</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 100 }}>
        {log.length === 0 ? "// output appears here" : log.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "multi-line-comments",
      title: "Multi-line comments with /* */",
      summary: "A block comment can span several lines, useful for longer explanations.",
      code: `function App() {
  const [log, setLog] = useState([]);

  function print(value) {
    setLog((prev) => [...prev, String(value)]);
  }

  /*
   * This function converts a temperature from
   * Celsius to Fahrenheit using the standard formula.
   * It spans several lines, all ignored at runtime.
   */
  function celsiusToFahrenheit(celsius) {
    return celsius * 9 / 5 + 32;
  }

  function run() {
    setLog([]);
    print("0°C = " + celsiusToFahrenheit(0) + "°F");
    print("100°C = " + celsiusToFahrenheit(100) + "°F");
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={run}>Run temperature conversion</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 100 }}>
        {log.length === 0 ? "// output appears here" : log.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "commenting-out-code",
      title: "Using a comment to disable a line of code",
      summary: "Toggle a checkbox to simulate commenting a line in and out, and see the result change.",
      code: `function App() {
  const [discountEnabled, setDiscountEnabled] = useState(false);
  const [log, setLog] = useState([]);

  function print(value) {
    setLog((prev) => [...prev, String(value)]);
  }

  function run() {
    setLog([]);
    let total = 100;
    print("Starting total: " + total);

    if (discountEnabled) {
      total = total * 0.9; // discount line is "active"
      print("Discount line ran: total is now " + total);
    } else {
      print("// total = total * 0.9;  <-- this line is 'commented out'");
      print("Discount line skipped: total stays " + total);
    }
  }

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <label>
        <input
          type="checkbox"
          checked={discountEnabled}
          onChange={(e) => setDiscountEnabled(e.target.checked)}
        />
        {" "}Enable the discount line (simulates uncommenting it)
      </label>
      <button onClick={run}>Run code</button>
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
