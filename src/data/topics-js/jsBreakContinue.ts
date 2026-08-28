import type { Topic } from "../../types";

export const jsBreakContinueTopic: Topic = {
  id: "js-break-continue",
  title: "JavaScript Break and Continue",
  category: "Control Flow",
  shortExplanation: `\`break\` and \`continue\` change how a loop runs from *inside* its own body.

- \`break\` — exits the loop ==immediately==, skipping every remaining iteration
- \`continue\` — skips just the *rest of the current iteration*, then moves on to the next one
- Both work the same way inside \`for\`, \`while\`, and \`do...while\` loops
- Commonly used to stop searching once something is found, or to skip values that don't matter`,
  longExplanation: `Sometimes a loop's normal top-to-bottom, condition-controlled flow isn't quite enough — you want to stop everything early, or skip just one particular pass without aborting the whole loop. \`break\` and \`continue\` are the two keywords that let you do exactly that, from inside the loop body itself.

- **\`break\`** immediately exits the loop it's inside, no matter what the loop's own condition says. Execution jumps straight to the first line of code *after* the loop, as if the loop had simply finished. A classic use case is **searching**: once you've found the item you're looking for in a list, there's no reason to keep checking the rest — \`break\` stops the search the instant a match is found, which can be a meaningful performance win on a large collection, and also makes the code's intent ("stop as soon as we find it") clear to a reader
- **\`continue\`** is gentler — rather than ending the loop entirely, it skips only the *remainder of the current iteration's body* and jumps straight to the next iteration (checking the loop's condition again, or moving to the next value, as normal). A classic use case is **filtering while iterating**: \`if (n % 2 !== 0) continue;\` inside a loop skips odd numbers entirely, letting the rest of the loop body run only for even ones, without needing to wrap the whole remaining body in an \`if\`
- Both keywords work identically across all three loop types — \`for\`, \`while\`, and \`do...while\` — and inside \`for...of\`/\`for...in\` too. The mental model doesn't change based on which loop syntax you're using
- A common way to think about the difference: \`continue\` says "I'm done with *this one*, give me the next," while \`break\` says "I'm done with *all of this*, move on." Using the wrong one is an easy mistake — accidentally using \`break\` when you meant \`continue\` will silently cut a loop short partway through, processing only some of the data instead of skipping just the irrelevant parts
- With **nested loops** (a loop inside another loop), a plain \`break\` or \`continue\` only affects the **innermost** loop it's directly written inside — it has no effect on any outer loop. JavaScript does support **labeled** \`break\`/\`continue\` (\`outer: for (...) { for (...) { break outer; } }\`) to reach out and affect an outer loop directly, but labels are relatively rare in everyday code and mostly worth knowing exist rather than reaching for by default
- \`break\` is also used inside a \`switch\` statement (covered in the Conditionals topic) to prevent fall-through between cases — it's the same keyword, but there it's ending the \`switch\` block rather than a loop
- Overusing \`break\`/\`continue\` can sometimes make a loop's control flow harder to follow, since execution can jump around rather than proceeding straight through the body — used sparingly and for a clear reason (stop once found, skip what doesn't apply), they usually make code *more* readable, not less, by avoiding deeply nested \`if\` blocks

Together, \`break\` and \`continue\` cover the two most common reasons to deviate from a loop's default behavior: stopping altogether, and skipping just one pass — small tools, but ones that show up constantly once you start writing real loops.`,
  examples: [
    {
      id: "break-stop-at-target",
      title: "break: stop searching once a target is found",
      summary: "The loop exits immediately the moment it finds the target value, skipping every value after it.",
      code: `function App() {
  const [target, setTarget] = useState(7);
  const [log, setLog] = useState([]);

  function print(value) {
    setLog((prev) => [...prev, String(value)]);
  }

  function run() {
    setLog([]);
    const numbers = [2, 4, 6, 7, 8, 9, 10];
    for (let i = 0; i < numbers.length; i++) {
      print("Checking " + numbers[i] + "...");
      if (numbers[i] === target) {
        print("Found " + target + "! Stopping with break.");
        break;
      }
    }
  }

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <label>
        Target to find:{" "}
        <input type="number" value={target} onChange={(e) => setTarget(Number(e.target.value))} />
      </label>
      <button onClick={run}>Run search</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 150, width: "100%" }}>
        {log.length === 0 ? "// output appears here" : log.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "continue-skip-even-numbers",
      title: "continue: skip values that don't matter",
      summary: "Even numbers are skipped entirely with continue — only odd numbers get logged.",
      code: `function App() {
  const [log, setLog] = useState([]);

  function print(value) {
    setLog((prev) => [...prev, String(value)]);
  }

  function run() {
    setLog([]);
    for (let i = 1; i <= 10; i++) {
      if (i % 2 === 0) {
        continue; // skip the rest of this iteration for even numbers
      }
      print(i + " is odd");
    }
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={run}>Run loop, skipping evens</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 130 }}>
        {log.length === 0 ? "// output appears here" : log.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "break-vs-continue-side-by-side",
      title: "break vs. continue on the same data",
      summary: "The same list and condition, once with break (stops early) and once with continue (skips and keeps going).",
      code: `function App() {
  const [log, setLog] = useState([]);

  function print(value) {
    setLog((prev) => [...prev, String(value)]);
  }

  function run() {
    setLog([]);
    const numbers = [1, 2, 3, -1, 4, 5];

    print("--- using break on negative numbers ---");
    for (const n of numbers) {
      if (n < 0) {
        print("Hit a negative number, stopping entirely.");
        break;
      }
      print("Processed: " + n);
    }

    print("--- using continue on negative numbers ---");
    for (const n of numbers) {
      if (n < 0) {
        print("Skipping negative number: " + n);
        continue;
      }
      print("Processed: " + n);
    }
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={run}>Run break vs continue</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 220, width: "100%" }}>
        {log.length === 0 ? "// output appears here" : log.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "continue-in-while-loop",
      title: "continue inside a while loop",
      summary: "The same skip-logic applies identically in a while loop, not just a for loop.",
      code: `function App() {
  const [log, setLog] = useState([]);

  function print(value) {
    setLog((prev) => [...prev, String(value)]);
  }

  function run() {
    setLog([]);
    let n = 0;
    while (n < 10) {
      n = n + 1;
      if (n % 3 !== 0) {
        continue; // only keep multiples of 3
      }
      print(n + " is a multiple of 3");
    }
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={run}>Run while loop with continue</button>
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
