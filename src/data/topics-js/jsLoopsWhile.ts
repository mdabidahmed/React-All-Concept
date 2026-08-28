import type { Topic } from "../../types";

export const jsLoopsWhileTopic: Topic = {
  id: "js-loops-while",
  title: "JavaScript While Loops",
  category: "Control Flow",
  shortExplanation: `\`while\` loops repeat a block of code for as long as a condition stays truthy — unlike \`for\`, there's no built-in counter.

- \`while (condition) { ... }\` — checks the condition ==first==; may run zero times
- \`do { ... } while (condition);\` — runs the body first, checks after; always runs **at least once**
- Forgetting to update the condition inside the loop causes an **infinite loop** — a real danger to watch for`,
  longExplanation: `\`while\` and \`do...while\` are JavaScript's other two loop forms, and they're built around a single condition rather than the three-part init/condition/increment structure of a classic \`for\` loop. They're the right tool whenever you want to keep repeating "until something becomes true," rather than a predetermined number of times.

- **\`while (condition) { ... }\`** checks its condition *before* running the body, every single time. If the condition is falsy right from the start, the body never runs at all — zero iterations is a completely valid outcome. Each pass through the loop needs to eventually make the condition false, or the loop will never end
- **\`do { ... } while (condition);\`** flips the order: it runs the body *first*, and only checks the condition *afterward*, deciding whether to loop again. This guarantees the body executes **at least once**, even if the condition was already false to begin with. A practical example: asking a user to enter a value and validating it — you need to ask at least once before you have anything to check, which is exactly the shape \`do...while\` is built for
- The choice between \`while\` and \`do...while\` comes down to one question: does the body need to run at least once regardless of the condition? If yes, \`do...while\`; if the condition should be allowed to prevent the body from ever running, plain \`while\`
- Unlike a classic \`for\` loop, neither \`while\` nor \`do...while\` has a built-in place for a counter or increment — if the loop's condition depends on a variable changing over time, *you* are responsible for updating that variable somewhere inside the loop body. This is both their flexibility and their biggest danger
- An **infinite loop** happens when the condition never becomes false — the classic cause is simply forgetting to update the variable the condition depends on. \`let i = 0; while (i < 5) { print(i); }\` (missing an \`i++\`) never terminates, because \`i\` stays \`0\` forever and \`0 < 5\` is always true. In a real browser, an infinite loop can freeze the entire tab, since JavaScript runs on a single thread and nothing else can happen while the loop keeps spinning
- To avoid infinite loops: always make sure something inside the loop body moves the condition toward becoming false (incrementing a counter, shrinking a list, flipping a flag once a task completes), and when experimenting, it's wise to add a hard safety cap (an extra counter with a \`break\` once it passes some maximum) so a logic mistake can't lock up the whole program while you're still debugging it
- \`while\` and \`do...while\` support \`break\` and \`continue\` exactly like \`for\` loops do, letting you exit early or skip to the next condition check

\`while\`/\`do...while\` loops shine specifically when the number of iterations isn't known ahead of time — reading from a stream until it's empty, retrying a request until it succeeds or a limit is hit, prompting a user until they give valid input — situations where a \`for\` loop's "count from A to B" shape doesn't naturally fit.`,
  examples: [
    {
      id: "basic-while-loop",
      title: "A basic while loop",
      summary: "The condition is checked before each pass — the loop naturally stops once it becomes false.",
      code: `function App() {
  const [log, setLog] = useState([]);

  function print(value) {
    setLog((prev) => [...prev, String(value)]);
  }

  function run() {
    setLog([]);
    let count = 0;
    while (count < 5) {
      print("count = " + count);
      count = count + 1;
    }
    print("Loop finished because count reached 5.");
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={run}>Run while loop</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 130 }}>
        {log.length === 0 ? "// output appears here" : log.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "while-runs-zero-times",
      title: "while can run zero times",
      summary: "If the condition starts false, a while loop's body never executes at all.",
      code: `function App() {
  const [startValue, setStartValue] = useState(10);
  const [log, setLog] = useState([]);

  function print(value) {
    setLog((prev) => [...prev, String(value)]);
  }

  function run() {
    setLog([]);
    let n = startValue;
    print("Starting with n = " + n + " (condition is n < 5)");
    while (n < 5) {
      print("Inside loop, n = " + n);
      n = n + 1;
    }
    print("Loop body ran " + (startValue < 5 ? "at least once" : "zero times") + ".");
  }

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <label>
        Starting value of n:{" "}
        <input type="number" value={startValue} onChange={(e) => setStartValue(Number(e.target.value))} />
      </label>
      <button onClick={run}>Run while (n &lt; 5)</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 100, width: "100%" }}>
        {log.length === 0 ? "// output appears here" : log.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "do-while-runs-at-least-once",
      title: "do...while always runs the body first",
      summary: "Even with a condition that's already false, the body still runs exactly once before checking.",
      code: `function App() {
  const [log, setLog] = useState([]);

  function print(value) {
    setLog((prev) => [...prev, String(value)]);
  }

  function run() {
    setLog([]);
    let n = 100;
    print("Starting with n = " + n + " (condition is n < 5, already false!)");
    do {
      print("Inside do...while body, n = " + n);
      n = n + 1;
    } while (n < 5);
    print("The body still ran once, because do...while checks after running.");
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={run}>Run do...while</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 100 }}>
        {log.length === 0 ? "// output appears here" : log.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "avoiding-infinite-loops",
      title: "Guarding against an infinite loop",
      summary: "A safety cap (a max-iterations break) prevents a mistake from freezing the page.",
      code: `function App() {
  const [updateCounter, setUpdateCounter] = useState(true);
  const [log, setLog] = useState([]);

  function print(value) {
    setLog((prev) => [...prev, String(value)]);
  }

  function run() {
    setLog([]);
    let i = 0;
    let safetyCap = 0;
    while (i < 5) {
      print("i = " + i);
      if (updateCounter) {
        i = i + 1; // this line is what makes the condition eventually false
      }
      safetyCap = safetyCap + 1;
      if (safetyCap > 20) {
        print("Safety cap hit — stopping what would otherwise be an infinite loop!");
        break;
      }
    }
  }

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <label>
        <input type="checkbox" checked={updateCounter} onChange={(e) => setUpdateCounter(e.target.checked)} />
        {" "}Update "i" inside the loop (uncheck to simulate the classic mistake)
      </label>
      <button onClick={run}>Run loop</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 140, width: "100%" }}>
        {log.length === 0 ? "// output appears here" : log.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
