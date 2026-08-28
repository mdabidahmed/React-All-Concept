import type { Topic } from "../../types";

export const jsLoopsForTopic: Topic = {
  id: "js-loops-for",
  title: "JavaScript For Loops",
  category: "Control Flow",
  shortExplanation: `\`for\` loops repeat a block of code a set number of times, or once per item in a collection.

- Classic \`for (init; condition; increment)\` — full manual control over counting
- \`for...of\` — iterates the ==values== of an array (or any iterable) directly
- \`for...in\` — iterates the **keys** (property names) of an object
- Prefer \`for...of\` for arrays; \`for...in\` on an array gives you indexes as strings, which is rarely what you want`,
  longExplanation: `Loops let a program repeat work without writing the same statement over and over — the whole point of having a computer do it. JavaScript has three \`for\`-family loop forms, each aimed at a slightly different job.

- The **classic \`for\` loop** has three parts inside its parentheses, separated by semicolons: \`for (initialization; condition; increment) { ... }\`. The *initialization* runs once, before the loop starts (typically declaring a counter, \`let i = 0\`); the *condition* is checked before every iteration, and the loop stops the moment it's falsy; the *increment* runs after every iteration's body finishes. \`for (let i = 0; i < 5; i++) { ... }\` runs its body exactly 5 times, with \`i\` taking the values \`0\`, \`1\`, \`2\`, \`3\`, \`4\`. This form gives full manual control — you can count backward, skip by twos, or use a condition unrelated to a simple counter — which makes it the right choice whenever you need that flexibility, but it's also the most verbose and error-prone of the three (an off-by-one mistake in the condition is one of the most common bugs in all of programming)
- **\`for...of\`** is a more modern, more readable loop specifically for iterating over the **values** of an *iterable* — arrays, strings, Maps, Sets, and a few other built-in types: \`for (const item of myArray) { ... }\` gives you each element directly, in order, with no manual indexing or counting needed at all. It's the loop of choice whenever you just need "each value in this array/string," which covers the large majority of everyday looping needs
- **\`for...in\`** iterates over the **enumerable property names (keys)** of an *object*: \`for (const key in myObject) { ... }\` gives you each key as a string, which you then typically use to look up the corresponding value with \`myObject[key]\`. It's designed for objects, not arrays
- A very common beginner mistake is using \`for...in\` on an **array**. Because arrays are technically objects with numeric-looking keys, \`for...in\` *will* run, but it iterates the array's **indexes as strings** (\`"0"\`, \`"1"\`, \`"2"\`, ...) rather than its values, and it can also pick up any extra custom properties someone added to the array or its prototype chain, plus it doesn't guarantee iteration order the way \`for...of\` does. For this reason, the standard guideline is: **use \`for...of\` for arrays, and \`for...in\` for plain objects** — never the reverse
- All three loop forms can be exited early with \`break\`, or skipped to the next iteration with \`continue\` (covered in their own dedicated topic) — these work identically across \`for\`, \`for...of\`, and \`for...in\`
- \`for...of\` doesn't give you an index by default, since it hands you values directly — if you also need the index while iterating an array, \`array.entries()\` (which yields \`[index, value]\` pairs) combined with array destructuring, \`for (const [index, value] of array.entries())\`, is the idiomatic modern approach, though a classic counting \`for\` loop remains perfectly valid too when an index is central to the logic

In practice, most day-to-day looping over arrays reaches for \`for...of\` (or, in many codebases, array methods like \`.map()\`/\`.forEach()\`, covered elsewhere) precisely because it reads cleanly and eliminates whole categories of counter-related bugs — the classic \`for\` loop remains valuable specifically when you need that fine-grained manual control.`,
  examples: [
    {
      id: "classic-for-loop",
      title: "The classic for(init; condition; increment) loop",
      summary: "A counter runs a fixed number of times, controlled by the loop you can edit live via the input.",
      code: `function App() {
  const [limit, setLimit] = useState(5);
  const [log, setLog] = useState([]);

  function print(value) {
    setLog((prev) => [...prev, String(value)]);
  }

  function run() {
    setLog([]);
    for (let i = 0; i < limit; i++) {
      print("i = " + i);
    }
  }

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <label>
        Run the loop this many times:{" "}
        <input type="number" value={limit} onChange={(e) => setLimit(Number(e.target.value))} />
      </label>
      <button onClick={run}>Run classic for loop</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 120, width: "100%" }}>
        {log.length === 0 ? "// output appears here" : log.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "for-of-values",
      title: "for...of iterates array values directly",
      summary: "No counter needed — each element of the array is handed to you in order.",
      code: `function App() {
  const [log, setLog] = useState([]);

  function print(value) {
    setLog((prev) => [...prev, String(value)]);
  }

  function run() {
    setLog([]);
    const fruits = ["apple", "banana", "cherry"];
    for (const fruit of fruits) {
      print("Fruit: " + fruit);
    }
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={run}>Run for...of</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 100 }}>
        {log.length === 0 ? "// output appears here" : log.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "for-in-object-keys",
      title: "for...in iterates object keys",
      summary: "Each property name of an object is handed to you, and you look up its value with the key.",
      code: `function App() {
  const [log, setLog] = useState([]);

  function print(value) {
    setLog((prev) => [...prev, String(value)]);
  }

  function run() {
    setLog([]);
    const user = { name: "Ada", role: "Engineer", age: 30 };
    for (const key in user) {
      print(key + ": " + user[key]);
    }
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={run}>Run for...in</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 100 }}>
        {log.length === 0 ? "// output appears here" : log.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "for-in-on-array-pitfall",
      title: "Why for...in on an array is a pitfall",
      summary: "for...in on an array gives you string indexes, not values — for...of is what you almost always want instead.",
      code: `function App() {
  const [log, setLog] = useState([]);

  function print(value) {
    setLog((prev) => [...prev, String(value)]);
  }

  function run() {
    setLog([]);
    const colors = ["red", "green", "blue"];

    print("--- for...in (gives indexes as strings) ---");
    for (const key in colors) {
      print("key = " + JSON.stringify(key) + " (typeof " + typeof key + "), colors[key] = " + colors[key]);
    }

    print("--- for...of (gives values directly) ---");
    for (const value of colors) {
      print("value = " + value);
    }
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={run}>Compare for...in vs for...of</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 180, width: "100%" }}>
        {log.length === 0 ? "// output appears here" : log.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
