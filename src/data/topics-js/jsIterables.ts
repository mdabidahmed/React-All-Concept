import type { Topic } from "../../types";

export const jsIterablesTopic: Topic = {
  id: "js-iterables",
  title: "JavaScript Iterables",
  category: "Advanced Concepts",
  shortExplanation: `An **iterable** is any value that knows how to hand out its elements one at a time — which is exactly what makes it usable with a \`for...of\` loop or the spread operator (\`...\`).

- Arrays, strings, \`Set\`s, and \`Map\`s are all built-in iterables
- A plain \`{}\` object is ==not== iterable by default — \`for...of\` on one throws a \`TypeError\`
- Generator functions (\`function*\`, using \`yield\`) are the common way custom iterables get built by hand`,
  longExplanation: `**Iterable** is a specific, formal capability a JavaScript value can have: the ability to say, one at a time, "here is my next element," until it runs out. Anything with this capability can be used directly with a \`for...of\` loop, spread out with \`...\`, destructured with \`const [a, b] = iterable\`, or converted to a real array with \`Array.from(iterable)\` — all of these language features are built on the exact same underlying mechanism.

Several familiar built-in types are iterable out of the box. **Arrays** hand out their elements in index order. **Strings** hand out their characters one at a time. **\`Set\`** hands out its unique values in insertion order. **\`Map\`** hands out \`[key, value]\` pairs, also in insertion order. \`for...of\` works identically across all four, even though they're otherwise very different data structures — that uniformity is the entire point of the iterable protocol.

A plain object literal, \`{ a: 1, b: 2 }\`, is the notable **exception**: it is not iterable by default, and writing \`for (const x of myObject)\` throws a \`TypeError: myObject is not iterable\`. This isn't an oversight — a plain object represents an unordered bag of named properties, not an inherently ordered sequence, so there's no unambiguous "next element" to hand out. When an object's data does need to be iterated, the standard approach is converting it into something that *is* iterable first: \`Object.keys(obj)\`, \`Object.values(obj)\`, and \`Object.entries(obj)\` each return a real, iterable array (of keys, values, or \`[key, value]\` pairs respectively) that \`for...of\` works with immediately.

Under the hood, an iterable is simply any object that has a method at the special key \`Symbol.iterator\`, which — when called — returns an *iterator*: an object with a \`.next()\` method that returns \`{ value, done }\` each time it's called, until \`done\` becomes \`true\`. Both \`for...of\` and the spread operator are, under the hood, just repeatedly calling that \`.next()\` method for you.

Writing that machinery out by hand for a custom iterable would be tedious, so JavaScript provides a shortcut: **generator functions**, declared with \`function*\` (an asterisk after \`function\`) and using the \`yield\` keyword inside. Calling a generator function doesn't run its body immediately — it returns an iterator, already correctly wired up to the \`Symbol.iterator\` protocol. Each \`yield expression\` inside the function pauses execution at exactly that point and hands out \`expression\` as the next value; calling \`.next()\` again resumes the function right where it left off, running until the next \`yield\` (or the end of the function, which produces \`done: true\`). A small generator like \`function* countTo(n) { for (let i = 1; i <= n; i++) yield i; }\` can be used directly in a \`for...of\` loop or spread into an array (\`[...countTo(5)]\`) exactly like any built-in iterable — generators are the most common, approachable way custom iterables get built in everyday JavaScript.`,
  examples: [
    {
      id: "for-of-across-built-ins",
      title: "for...of works uniformly across four iterables",
      summary: "The exact same loop syntax works on an array, a string, a Set, and a Map.",
      code: `function App() {
  const [log, setLog] = useState([]);

  function print(value) {
    setLog((prev) => [...prev, String(value)]);
  }

  function run() {
    setLog([]);
    const array = [10, 20, 30];
    const text = "hi";
    const set = new Set(["red", "green", "blue"]);
    const map = new Map([["a", 1], ["b", 2]]);

    for (const item of array) print("array item: " + item);
    for (const char of text) print("string char: " + char);
    for (const color of set) print("set value: " + color);
    for (const [key, value] of map) print("map entry: " + key + " = " + value);
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={run}>Loop over four different iterables</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 160 }}>
        {log.length === 0 ? "// output appears here" : log.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "plain-object-is-not-iterable",
      title: "A plain object is not iterable",
      summary: "for...of throws on {} directly, but Object.entries() makes its data iterable.",
      code: `function App() {
  const [log, setLog] = useState([]);

  function print(value) {
    setLog((prev) => [...prev, String(value)]);
  }

  function run() {
    setLog([]);
    const settings = { theme: "dark", fontSize: 16 };

    try {
      for (const item of settings) {
        print(item);
      }
    } catch (error) {
      print("for...of on a plain object threw: " + error.message);
    }

    print("--- using Object.entries() instead ---");
    for (const [key, value] of Object.entries(settings)) {
      print(key + " = " + value);
    }
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={run}>Try looping over a plain object</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 130 }}>
        {log.length === 0 ? "// output appears here" : log.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "spread-and-destructuring",
      title: "Spread and destructuring both need an iterable",
      summary: "A Set spreads into an array; a string destructures into individual characters.",
      code: `function App() {
  const [log, setLog] = useState([]);

  function print(value) {
    setLog((prev) => [...prev, String(value)]);
  }

  function run() {
    setLog([]);
    const uniqueTags = new Set(["react", "js", "react"]);
    const asArray = [...uniqueTags];
    print("Set spread into an array: " + asArray.join(", "));

    const [first, second, ...rest] = "hello";
    print("Destructured string: first=" + first + " second=" + second + " rest=" + rest.join(""));
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={run}>Spread a Set, destructure a string</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 90 }}>
        {log.length === 0 ? "// output appears here" : log.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "custom-generator-function",
      title: "A custom iterable built with a generator function",
      summary: "function* countTo(n) can be spread into an array just like any built-in iterable.",
      code: `function App() {
  function* countTo(n) {
    for (let i = 1; i <= n; i++) {
      yield i;
    }
  }

  const [n, setN] = useState(5);
  const values = [...countTo(n)];

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <span>countTo(n) where n =</span>
        <input type="number" value={n} onChange={(e) => setN(Number(e.target.value))} style={{ padding: 8, width: 70 }} />
      </div>
      <p>[...countTo(n)]: <strong>{values.join(", ")}</strong></p>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        countTo is a generator function (function*) — calling it returns an iterator, which the spread operator consumes automatically.
      </p>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
