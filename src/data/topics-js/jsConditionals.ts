import type { Topic } from "../../types";

export const jsConditionalsTopic: Topic = {
  id: "js-conditionals",
  title: "JavaScript If...Else and Switch",
  category: "Control Flow",
  shortExplanation: `Conditionals let a program take **different paths** depending on whether something is true or false.

- \`if\` / \`else if\` / \`else\` — run a block only when its condition is truthy, checked top to bottom
- The **ternary operator** \`condition ? a : b\` is a compact if/else that produces a *value*
- \`switch\` compares one value against several \`case\`s — remember \`break\`, or execution ==falls through==
- \`default\` in a \`switch\` runs when no \`case\` matches, similar to a final \`else\``,
  longExplanation: `Almost every interesting program needs to do different things under different conditions — show a discount if the cart total is high enough, greet a user differently depending on the time of day. JavaScript offers a few different syntaxes for this, each suited to slightly different situations.

- **\`if\`** runs a block of code only if its condition is truthy: \`if (age >= 18) { ... }\`. **\`else\`** provides a fallback block that runs when the \`if\`'s condition was falsy. **\`else if\`** lets you chain additional conditions in between, checked in order from top to bottom — the *first* condition that's truthy has its block run, and the rest are skipped entirely, even if a later condition would also have been true
- Conditions are evaluated for **truthiness** (see the Booleans topic), not just strict \`true\`/\`false\` — \`if (username)\` runs its block whenever \`username\` is any truthy value, which is why this pattern is so common for "is there something meaningful here" checks
- The **ternary operator**, \`condition ? valueIfTrue : valueIfFalse\`, is the only operator in JavaScript that takes three operands (hence "ternary"). It behaves like a miniature if/else, but crucially it's an **expression** that produces a value, rather than a statement that runs a block — which makes it perfect for inline use: \`const label = age >= 18 ? "Adult" : "Minor";\` or directly inside JSX, \`{isLoading ? <Spinner /> : <Content />}\`. A full \`if\`/\`else\` statement can't be dropped directly into an expression position like that
- Ternaries are great for a single, simple either/or choice, but chaining several of them together (\`a ? x : b ? y : z\`) quickly becomes hard to read — at that point, a regular \`if\`/\`else if\` chain, or a \`switch\`, is usually clearer
- **\`switch\`** compares one value against a list of possible matches: \`switch (day) { case "Mon": ...; break; case "Tue": ...; break; default: ...; }\`. It's often more readable than a long \`if\`/\`else if\` chain when you're comparing the *same* single value against many possible exact matches, rather than evaluating several different, unrelated conditions
- The \`break\` keyword at the end of each \`case\` is **essential** — without it, execution "falls through" and keeps running the code in the *next* case too, regardless of whether that case's value actually matches. This fall-through behavior is occasionally used intentionally (stacking several case labels that should share one block of code), but forgetting a \`break\` by accident is a classic, hard-to-spot bug
- \`default\` is optional and, if present, runs when none of the \`case\`s matched — conceptually similar to a final \`else\` at the end of an \`if\`/\`else if\` chain. It doesn't have to be the last case textually, but it conventionally is
- \`switch\` uses **strict equality** (\`===\`) internally to compare the switched value against each \`case\`, so \`case "5":\` will not match the number \`5\` — the types have to match exactly, just as with \`===\`

Choosing between these three is mostly about fit: reach for \`if\`/\`else\` for general branching logic, a ternary for a small inline either/or that needs to produce a value, and \`switch\` when you're checking one value against many specific, known possibilities.`,
  examples: [
    {
      id: "if-else-if-else-chain",
      title: "if / else if / else chain",
      summary: "A score input runs through several conditions in order, stopping at the first truthy one.",
      code: `function App() {
  const [score, setScore] = useState(75);

  function getGrade(s) {
    if (s >= 90) {
      return "A";
    } else if (s >= 80) {
      return "B";
    } else if (s >= 70) {
      return "C";
    } else {
      return "F";
    }
  }

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <label>
        Score:{" "}
        <input type="number" value={score} onChange={(e) => setScore(Number(e.target.value))} />
      </label>
      <p>Grade: <strong>{getGrade(score)}</strong></p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "ternary-operator",
      title: "The ternary operator as a compact if/else",
      summary: "condition ? a : b produces a value directly, perfect for use right inside JSX.",
      code: `function App() {
  const [age, setAge] = useState(20);

  const label = age >= 18 ? "Adult" : "Minor";

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <label>
        Age:{" "}
        <input type="number" value={age} onChange={(e) => setAge(Number(e.target.value))} />
      </label>
      <p>Category: <strong>{label}</strong></p>
      <p>{age >= 18 ? "You can vote." : "You cannot vote yet."}</p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "switch-statement",
      title: "switch with case, break, and default",
      summary: "One value is compared against several exact matches — try removing 'break' mentally to see why it matters.",
      code: `function App() {
  const [day, setDay] = useState("Mon");

  function describeDay(d) {
    switch (d) {
      case "Sat":
      case "Sun":
        return "Weekend! 🎉";
      case "Mon":
        return "Start of the work week.";
      case "Fri":
        return "Almost the weekend.";
      default:
        return "A regular weekday.";
    }
  }

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <label>
        Day:{" "}
        <select value={day} onChange={(e) => setDay(e.target.value)}>
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
      </label>
      <p>{describeDay(day)}</p>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        Notice "Sat" and "Sun" share one block by "falling through" one case with no break, on purpose.
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "fall-through-bug-demo",
      title: "What forgetting break actually does",
      summary: "Two switch statements on the same input, one with break and one without, showing the fall-through bug.",
      code: `function App() {
  const [log, setLog] = useState([]);

  function print(value) {
    setLog((prev) => [...prev, String(value)]);
  }

  function withBreak(color) {
    switch (color) {
      case "red":
        return "Stop";
      case "yellow":
        return "Slow down";
      case "green":
        return "Go";
      default:
        return "Unknown";
    }
  }

  function withoutBreak(color) {
    let result = [];
    switch (color) {
      case "red":
        result.push("Stop");
      case "yellow":
        result.push("Slow down");
      case "green":
        result.push("Go");
      default:
        result.push("Unknown");
    }
    return result.join(" -> ");
  }

  function run() {
    setLog([]);
    print('withBreak("red")     ->  ' + withBreak("red"));
    print('withoutBreak("red")  ->  ' + withoutBreak("red") + "   (fell through every remaining case!)");
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={run}>Run fall-through comparison</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 90 }}>
        {log.length === 0 ? "// output appears here" : log.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
