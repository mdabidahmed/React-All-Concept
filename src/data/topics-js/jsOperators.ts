import type { Topic } from "../../types";

export const jsOperatorsTopic: Topic = {
  id: "js-operators",
  title: "JavaScript Operators",
  category: "JS Basics",
  shortExplanation: `**Operators** are symbols that perform actions on values, like doing math or combining strings.

- Arithmetic: \`+\`, \`-\`, \`*\`, \`/\`, \`%\` (remainder), \`**\` (exponent)
- Assignment: \`=\`, plus shorthand combos like \`+=\`, \`-=\`, \`*=\`, \`/=\`
- **Operator precedence** decides which operator runs first in a mixed expression (\`*\` before \`+\`, just like in math class)
- \`+\` doubles as ==string concatenation== when either side is text`,
  longExplanation: `Operators are the small symbols that combine values into new ones — the verbs of a JavaScript expression. Most of them will already feel familiar from basic math class, with a few JavaScript-specific twists.

- **Arithmetic operators** work on numbers: \`+\` adds, \`-\` subtracts, \`*\` multiplies, \`/\` divides, \`%\` (the **modulo** or remainder operator) gives what's left over after division — \`7 % 2\` is \`1\`, useful for things like checking whether a number is even (\`n % 2 === 0\`), and \`**\` raises to a power — \`2 ** 3\` is \`8\`, the modern replacement for the older \`Math.pow(2, 3)\`
- **Assignment operators** store a value into a variable. Plain \`=\` just assigns: \`x = 5\`. The **compound assignment** operators are shorthand for "do the operation, then assign the result back": \`x += 3\` means \`x = x + 3\`, and the same pattern exists for \`-=\`, \`*=\`, \`/=\`, and \`%=\`. These are extremely common in loops and counters, where a value needs to be nudged repeatedly
- \`++\` and \`--\` are further shorthand specifically for incrementing/decrementing by exactly 1: \`count++\` is equivalent to \`count += 1\`, which is equivalent to \`count = count + 1\`. They come in a prefix form (\`++count\`) and postfix form (\`count++\`) that differ subtly in what *value the expression itself produces*, though both increment the variable
- **Operator precedence** determines the order operations run in in a single expression, following mostly the same rules as arithmetic in math: multiplication and division bind tighter than addition and subtraction, so \`2 + 3 * 4\` is \`14\`, not \`20\` — the \`3 * 4\` is computed first. Parentheses \`( )\` always override precedence and can (and should, for readability) be used to make intent explicit even when they aren't strictly required: \`2 + (3 * 4)\` computes identically to \`2 + 3 * 4\` but reads more clearly to a human
- The \`+\` operator has a special dual role: between two numbers it adds them, but if *either* side is a string, it instead performs **string concatenation** — joining the two values together as text. \`"Score: " + 10\` produces the string \`"Score: 10"\`, not an error and not a number. This is convenient for building display text, but it's also a classic source of bugs (covered more in the Type Conversion topic) — \`"5" + 1\` is the string \`"51"\`, not the number \`6\`
- Comparison operators (\`===\`, \`<\`, \`>\`, etc.) and logical operators (\`&&\`, \`||\`, \`!\`) are also technically operators, but they get their own dedicated topics in this subject's Control Flow section since they're so central to branching logic
- A subtle but important rule: JavaScript **evaluates operands left to right**, but the *order operators run in* is governed by precedence, not left-to-right reading order alone — this is why \`2 + 3 * 4\` doesn't compute \`2 + 3\` first just because it appears first when reading left to right

In everyday code, you rarely need to memorize a full precedence table — the practical skill is knowing that multiplication/division bind tighter than addition/subtraction, and reaching for parentheses whenever an expression's evaluation order isn't immediately obvious at a glance. Clarity for the next reader (often yourself) is worth more than saving a couple of characters.`,
  examples: [
    {
      id: "arithmetic-operators",
      title: "The core arithmetic operators",
      summary: "Try changing the two numbers and watch every arithmetic operator recompute live.",
      code: `function App() {
  const [a, setA] = useState(7);
  const [b, setB] = useState(2);

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <label>
        a:{" "}
        <input type="number" value={a} onChange={(e) => setA(Number(e.target.value))} />
      </label>
      <label>
        b:{" "}
        <input type="number" value={b} onChange={(e) => setB(Number(e.target.value))} />
      </label>
      <ul>
        <li>a + b = {a + b}</li>
        <li>a - b = {a - b}</li>
        <li>a * b = {a * b}</li>
        <li>a / b = {a / b}</li>
        <li>a % b (remainder) = {a % b}</li>
        <li>a ** b (exponent) = {a ** b}</li>
      </ul>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "assignment-shorthand",
      title: "Compound assignment operators",
      summary: "Each button applies a shorthand operator (+=, -=, *=) to the same running total.",
      code: `function App() {
  const [total, setTotal] = useState(10);

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <p>total = <strong>{total}</strong></p>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <button onClick={() => setTotal((t) => t += 5)}>total += 5</button>
        <button onClick={() => setTotal((t) => t -= 3)}>total -= 3</button>
        <button onClick={() => setTotal((t) => t *= 2)}>total *= 2</button>
        <button onClick={() => setTotal((t) => t /= 2)}>total /= 2</button>
        <button onClick={() => setTotal(10)}>Reset</button>
      </div>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "operator-precedence",
      title: "Operator precedence: multiplication before addition",
      summary: "The same digits, with and without parentheses, produce different results.",
      code: `function App() {
  const [log, setLog] = useState([]);

  function print(value) {
    setLog((prev) => [...prev, String(value)]);
  }

  function run() {
    setLog([]);
    print("2 + 3 * 4 = " + (2 + 3 * 4) + "  (multiplication runs first)");
    print("(2 + 3) * 4 = " + ((2 + 3) * 4) + "  (parentheses override precedence)");
    print("10 - 2 ** 2 = " + (10 - 2 ** 2) + "  (exponent runs before subtraction)");
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={run}>Run precedence demo</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 100 }}>
        {log.length === 0 ? "// output appears here" : log.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "plus-as-concatenation",
      title: "+ as addition vs. string concatenation",
      summary: "Type a name and a number to see + switch between adding numbers and joining text.",
      code: `function App() {
  const [name, setName] = useState("Ada");
  const [score, setScore] = useState(90);

  const greeting = "Hello, " + name + "!";
  const bonus = score + 10;

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <label>
        Name:{" "}
        <input value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <label>
        Score:{" "}
        <input type="number" value={score} onChange={(e) => setScore(Number(e.target.value))} />
      </label>
      <p>"Hello, " + name + "!" -&gt; <strong>{greeting}</strong> (string concatenation)</p>
      <p>score + 10 -&gt; <strong>{bonus}</strong> (numeric addition)</p>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
