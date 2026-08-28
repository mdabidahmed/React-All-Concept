import type { Topic } from "../../types";

export const jsBitwiseTopic: Topic = {
  id: "js-bitwise",
  title: "JavaScript Bitwise Operators",
  category: "Control Flow",
  shortExplanation: `**Bitwise operators** work on the individual ==binary bits== of a number, rather than its value as a whole.

- \`&\` (AND), \`|\` (OR), \`^\` (XOR), \`~\` (NOT) — combine or flip bits
- \`<<\` and \`>>\` — shift a number's bits left or right
- Rarely needed in everyday app code, but useful for **flags/masks** and a few numeric tricks
- Numbers are converted to a 32-bit integer form behind the scenes before a bitwise operator runs`,
  longExplanation: `Every number in a computer is ultimately stored as a sequence of binary bits (0s and 1s). Most JavaScript code never needs to think about that representation directly — arithmetic operators (\`+\`, \`-\`, etc.) work on numbers as whole values. **Bitwise operators** are the exception: they reach directly into a number's individual bits.

- Before a bitwise operator runs, JavaScript converts its operands into a **32-bit signed integer** representation behind the scenes (even though JavaScript numbers are normally stored as 64-bit floating point) — this is a detail worth knowing exists, though it rarely matters for the small, everyday numbers most bitwise tricks are used on
- \`&\` (**AND**) compares two numbers bit by bit, and each resulting bit is \`1\` only if *both* corresponding input bits were \`1\`. \`5 & 3\` — in binary, \`101 & 011\` — gives \`001\`, which is \`1\`
- \`|\` (**OR**) also compares bit by bit, but each resulting bit is \`1\` if *either* input bit was \`1\`. \`5 | 3\` — \`101 | 011\` — gives \`111\`, which is \`7\`
- \`^\` (**XOR**, exclusive or) gives a \`1\` bit only where the two input bits *differ*. \`5 ^ 3\` — \`101 ^ 011\` — gives \`110\`, which is \`6\`
- \`~\` (**NOT**) flips every bit of a single number (0 becomes 1, 1 becomes 0). Because of how negative numbers are represented, this has the effect of computing \`~n\` as \`-(n + 1)\` — so \`~5\` is \`-6\`
- \`<<\` (**left shift**) and \`>>\` (**right shift**) slide a number's bits left or right by a given number of positions, filling in with zeros (or, for \`>>\`, preserving the sign). Shifting left by 1 has the effect of *doubling* a number, and shifting right by 1 *halves* it (rounding toward zero) — \`5 << 1\` is \`10\`, and \`5 >> 1\` is \`2\`. This is occasionally used as a fast way to multiply/divide by powers of two, though modern JavaScript engines optimize plain \`*\`/\`/\` well enough that this is rarely necessary purely for performance today
- The most practical everyday use of bitwise operators is **flags and bitmasks**: representing several true/false options as individual bits packed into one single number, rather than several separate boolean variables. For example, permissions might be defined as \`READ = 1\` (binary \`001\`), \`WRITE = 2\` (binary \`010\`), \`EXECUTE = 4\` (binary \`100\`) — combining \`READ | WRITE\` with \`|\` produces \`3\` (binary \`011\`), a single number representing "both read and write." Checking whether a specific flag is set uses \`&\`: \`(permissions & WRITE) !== 0\` tests whether the WRITE bit is turned on inside \`permissions\`, regardless of what any other bit is set to
- Bitwise operators are genuinely **rare** in typical day-to-day application code — most business logic (form validation, rendering UI, calling an API) never needs to touch individual bits, and using separate named booleans or a small object is usually clearer than a packed bitmask for most application-level code. Where they do still show up: low-level libraries, certain graphics/color code (color channels are frequently packed into a single 24 or 32-bit integer), file format parsing, competitive programming, and some clever numeric one-liners you'll occasionally encounter in other people's code
- A quick trick worth knowing purely for recognition: \`n | 0\` truncates \`n\` to an integer by discarding any decimal part (because the bitwise conversion step forces a 32-bit integer), similarly to \`Math.trunc(n)\` for typical-sized numbers — you may see this in older or performance-sensitive code, though \`Math.trunc()\` or \`Math.floor()\` are clearer choices in new code

The goal with bitwise operators isn't to reach for them often — it's to recognize \`&\`, \`|\`, \`^\`, \`~\`, \`<<\`, and \`>>\` on sight, understand roughly what they're doing to a number's bits, and know that flags/masks are their main legitimate everyday use case.`,
  examples: [
    {
      id: "and-or-xor-basics",
      title: "AND, OR, and XOR on two numbers",
      summary: "Type two small numbers and watch &, |, and ^ combine their bits differently.",
      code: `function App() {
  const [a, setA] = useState(5);
  const [b, setB] = useState(3);

  function toBinary(n) {
    return (n >>> 0).toString(2).padStart(4, "0");
  }

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <label>
        a:{" "}
        <input type="number" value={a} onChange={(e) => setA(Number(e.target.value))} />
        {" "}(binary: {toBinary(a)})
      </label>
      <label>
        b:{" "}
        <input type="number" value={b} onChange={(e) => setB(Number(e.target.value))} />
        {" "}(binary: {toBinary(b)})
      </label>
      <ul>
        <li>a &amp; b (AND) = {a & b} (binary: {toBinary(a & b)})</li>
        <li>a | b (OR) = {a | b} (binary: {toBinary(a | b)})</li>
        <li>a ^ b (XOR) = {a ^ b} (binary: {toBinary(a ^ b)})</li>
        <li>~a (NOT) = {~a}</li>
      </ul>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "shift-operators",
      title: "Left shift and right shift",
      summary: "Shifting bits left doubles a number; shifting right halves it (rounding toward zero).",
      code: `function App() {
  const [n, setN] = useState(5);
  const [log, setLog] = useState([]);

  function print(value) {
    setLog((prev) => [...prev, String(value)]);
  }

  function run() {
    setLog([]);
    print(n + " << 1  ->  " + (n << 1) + "   (like multiplying by 2)");
    print(n + " << 2  ->  " + (n << 2) + "   (like multiplying by 4)");
    print(n + " >> 1  ->  " + (n >> 1) + "   (like dividing by 2, rounded down)");
  }

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <label>
        n:{" "}
        <input type="number" value={n} onChange={(e) => setN(Number(e.target.value))} />
      </label>
      <button onClick={run}>Run shift demo</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 100, width: "100%" }}>
        {log.length === 0 ? "// output appears here" : log.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "flags-and-bitmasks",
      title: "A practical use: packing flags into one number",
      summary: "Toggle checkboxes for READ, WRITE, and EXECUTE, combined into one permissions number using bitwise OR.",
      code: `function App() {
  const READ = 1;
  const WRITE = 2;
  const EXECUTE = 4;

  const [read, setRead] = useState(true);
  const [write, setWrite] = useState(false);
  const [execute, setExecute] = useState(false);

  let permissions = 0;
  if (read) permissions = permissions | READ;
  if (write) permissions = permissions | WRITE;
  if (execute) permissions = permissions | EXECUTE;

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <label>
        <input type="checkbox" checked={read} onChange={(e) => setRead(e.target.checked)} /> READ (1)
      </label>
      <label>
        <input type="checkbox" checked={write} onChange={(e) => setWrite(e.target.checked)} /> WRITE (2)
      </label>
      <label>
        <input type="checkbox" checked={execute} onChange={(e) => setExecute(e.target.checked)} /> EXECUTE (4)
      </label>
      <p>Combined permissions number: <strong>{permissions}</strong></p>
      <p>Has WRITE? <strong>{String((permissions & WRITE) !== 0)}</strong></p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "truncate-with-bitwise-or",
      title: "A quick numeric trick: truncating with | 0",
      summary: "n | 0 discards any decimal part, similar to Math.trunc(n) — shown here for recognition, not daily use.",
      code: `function App() {
  const [value, setValue] = useState(9.75);

  const truncatedByBitwise = value | 0;
  const truncatedByMath = Math.trunc(value);

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <label>
        Decimal number:{" "}
        <input
          type="number"
          step="0.01"
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
        />
      </label>
      <p>value | 0 -&gt; <strong>{truncatedByBitwise}</strong></p>
      <p>Math.trunc(value) -&gt; <strong>{truncatedByMath}</strong></p>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        Both discard the decimal part. Math.trunc() is the clearer, modern choice for everyday code.
      </p>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
