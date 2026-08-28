import type { Topic } from "../../types";

export const jsSetsMapsTopic: Topic = {
  id: "js-sets-maps",
  title: "JavaScript Sets and Maps",
  category: "Objects & Arrays",
  shortExplanation: `**Set** and **Map** are two built-in collection types that solve problems plain arrays and objects handle awkwardly.

- \`Set\` stores **unique values only** — adding a duplicate is silently ignored; great for de-duplicating a list
- \`Map\` stores **key-value pairs** where keys can be *any type* (an object, a number, a function) — not just strings, unlike plain object keys
- \`Set\` methods: \`.add(value)\`, \`.has(value)\`, \`.delete(value)\`, \`.size\`
- \`Map\` methods: \`.set(key, value)\`, \`.get(key)\`, \`.has(key)\`, \`.delete(key)\`, \`.size\``,
  longExplanation: `Plain arrays and objects cover most everyday data needs, but two recurring problems — "keep only unique values" and "look things up by a key that isn't necessarily a string" — are awkward enough with arrays and objects that JavaScript provides two dedicated built-in types: \`Set\` and \`Map\`.

- A **\`Set\`** is a collection that automatically enforces **uniqueness**: attempting to add a value that's already present is silently ignored rather than creating a duplicate. Create one with \`new Set()\`, optionally passing an iterable (like an array) to seed it: \`new Set([1, 2, 2, 3])\` immediately becomes a set containing just \`1\`, \`2\`, and \`3\`. This makes de-duplicating an array a one-liner: \`[...new Set(arrayWithDuplicates)]\` — spreading a \`Set\` back into array literal syntax converts it right back into a plain array, now with duplicates removed
- \`Set\` provides \`.add(value)\` to insert a value (returning the set itself, so calls can be chained), \`.has(value)\` to check membership in **constant time** (fast, regardless of how large the set is — notably faster than \`array.includes()\` on a large array, which has to check every item one by one), \`.delete(value)\` to remove one, and a \`.size\` property (not \`.length\` — a small but frequent naming trip-up) reporting how many values are currently stored. A \`Set\` can be looped over directly with \`for...of\` or \`.forEach()\`, in the order values were inserted
- A **\`Map\`** is a collection of **key-value pairs**, similar in spirit to a plain object, but solving two specific limitations plain objects have. First, plain object keys are always **coerced to strings** (or symbols) — an object used as a key silently gets converted to the string \`"[object Object]"\`, meaning two different objects used as keys collide into the exact same string key. A \`Map\`, by contrast, allows a key to be **any value at all** — an object, a function, a number, \`NaN\`, even \`undefined\` — and keeps each one distinct by genuine identity, not a stringified version of it. Second, a plain object's keys can accidentally collide with inherited properties from \`Object.prototype\` (like \`"toString"\`), which a \`Map\` never has to worry about, since it isn't built on the same prototype-chain machinery
- \`Map\` provides \`.set(key, value)\` to add or update an entry (also chainable), \`.get(key)\` to retrieve a value (returning \`undefined\` if the key isn't present, the same as a missing object property), \`.has(key)\` to check for a key's presence, \`.delete(key)\` to remove an entry, and a \`.size\` property for the entry count. Like \`Set\`, a \`Map\` can be iterated directly, and \`.forEach((value, key) => ...)\` or \`for (const [key, value] of map)\` both walk through its entries in insertion order
- A practical rule of thumb: reach for a **\`Set\`** whenever the real goal is "a list, but no duplicates allowed" or "fast membership checks on a growing collection." Reach for a **\`Map\`** whenever keys need to be something other than a plain string (or when you specifically want guaranteed insertion-order iteration and a reliable \`.size\`, both of which plain objects historically didn't guarantee as cleanly). For simple, string-keyed data with a known, fixed shape, a plain object or array often remains the more natural, more commonly used choice — \`Set\`/\`Map\` earn their place specifically when their particular guarantees are what the problem actually needs

Both types exist because plain objects and arrays, while flexible, were never specifically designed to guarantee uniqueness or support non-string keys — \`Set\` and \`Map\` fill those two gaps directly, with a clear, purpose-built API.`,
  examples: [
    {
      id: "set-dedupe",
      title: "Set: de-duplicating an array",
      summary: "Wrapping an array in a Set removes duplicates, then spread converts it back.",
      code: `function App() {
  const [log, setLog] = useState([]);

  function print(value) {
    setLog((prev) => [...prev, String(value)]);
  }

  function run() {
    setLog([]);
    const withDuplicates = [1, 2, 2, 3, 3, 3, 4];
    print("Original array: " + JSON.stringify(withDuplicates));

    const uniqueSet = new Set(withDuplicates);
    print("new Set(array) -> size: " + uniqueSet.size);

    const uniqueArray = [...uniqueSet];
    print("[...uniqueSet] back to an array -> " + JSON.stringify(uniqueArray));
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={run}>Run de-dupe demo</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 100 }}>
        {log.length === 0 ? "// output appears here" : log.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "set-methods-interactive",
      title: "Interactive Set: add, has, delete",
      summary: "Type a value and add or remove it from a live Set, watching size and membership update.",
      code: `function App() {
  const [items, setItems] = useState(() => new Set(["apple", "banana"]));
  const [text, setText] = useState("cherry");

  function addItem() {
    const next = new Set(items);
    next.add(text);
    setItems(next);
  }
  function removeItem() {
    const next = new Set(items);
    next.delete(text);
    setItems(next);
  }

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <p>Set contents: <strong>{JSON.stringify([...items])}</strong> (size: {items.size})</p>
      <label>
        Value:{" "}
        <input value={text} onChange={(e) => setText(e.target.value)} />
      </label>
      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={addItem}>Set.add(value)</button>
        <button onClick={removeItem}>Set.delete(value)</button>
      </div>
      <p>items.has("{text}") -&gt; <strong>{String(items.has(text))}</strong></p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "map-object-keys",
      title: "Map: keys that aren't strings",
      summary: "A plain object coerces object keys to a string; a Map keeps them genuinely distinct.",
      code: `function App() {
  const [log, setLog] = useState([]);

  function print(value) {
    setLog((prev) => [...prev, String(value)]);
  }

  function run() {
    setLog([]);
    const userA = { name: "Ada" };
    const userB = { name: "Grace" };

    const brokenObject = {};
    brokenObject[userA] = "score for Ada";
    brokenObject[userB] = "score for Grace";
    print("Plain object used with object keys -> " + JSON.stringify(brokenObject));
    print("(both keys collapsed into the same string key!)");

    const workingMap = new Map();
    workingMap.set(userA, "score for Ada");
    workingMap.set(userB, "score for Grace");
    print("");
    print("Map.get(userA) -> " + workingMap.get(userA));
    print("Map.get(userB) -> " + workingMap.get(userB));
    print("Map size -> " + workingMap.size + "  (both keys stayed distinct)");
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={run}>Run Map vs object demo</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 150 }}>
        {log.length === 0 ? "// output appears here" : log.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "map-iteration",
      title: "Iterating a Map's entries",
      summary: "Loop over key-value pairs directly, in the order they were inserted.",
      code: `function App() {
  const [log, setLog] = useState([]);

  function print(value) {
    setLog((prev) => [...prev, String(value)]);
  }

  function run() {
    setLog([]);
    const inventory = new Map();
    inventory.set("apples", 10);
    inventory.set("bananas", 5);
    inventory.set("cherries", 20);

    print("inventory.size -> " + inventory.size);
    inventory.forEach((count, item) => {
      print(item + ": " + count);
    });
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={run}>Run Map iteration demo</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 110 }}>
        {log.length === 0 ? "// output appears here" : log.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
