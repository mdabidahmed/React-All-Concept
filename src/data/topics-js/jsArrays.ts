import type { Topic } from "../../types";

export const jsArraysTopic: Topic = {
  id: "js-arrays",
  title: "JavaScript Arrays",
  category: "Objects & Arrays",
  shortExplanation: `An **array** is an ordered list of values, written as \`[value1, value2, ...]\`, accessed by numeric position.

- **Zero-indexed**: the first item is \`arr[0]\`, not \`arr[1]\`
- \`.length\` tells you how many items are currently in the array
- Add/remove at the **end**: \`.push(item)\` / \`.pop()\`; add/remove at the **start**: \`.unshift(item)\` / \`.shift()\`
- Arrays are technically a specialized kind of \`object\` — \`typeof [1,2,3]\` is \`"object"\`, with numeric keys and a \`length\` under the hood`,
  longExplanation: `An array is JavaScript's built-in structure for holding an **ordered collection** of values — a shopping list, a set of scores, a list of user records — where order matters and items are typically accessed by their numeric position rather than by name.

- Arrays are created with square-bracket syntax: \`const fruits = ["apple", "banana", "cherry"];\`. Unlike some languages, a single JavaScript array can freely mix types — \`[1, "two", true, { id: 3 }]\` is completely valid, though in practice most arrays hold a single consistent type of value for predictability
- Items are accessed using **zero-based indexing**: the first item is at index \`0\`, the second at index \`1\`, and so on — \`fruits[0]\` is \`"apple"\`, not \`fruits[1]\`. This trips up nearly everyone the first time, and stays a common off-by-one source of bugs (looping "one too far" or "one short") even for experienced developers. The **last** item's index is always \`array.length - 1\`, since length counts items starting from 1 while indices start from 0
- \`.length\` is a live property that always reflects the array's current size — it updates automatically as items are added or removed, and is commonly used both to loop over an array (\`for (let i = 0; i < arr.length; i++)\`) and to check whether an array is empty (\`arr.length === 0\`)
- Four built-in methods handle the most common way of growing or shrinking an array **in place** (mutating the original array directly, rather than creating a new one): \`.push(item)\` adds one or more items to the **end** and returns the new length; \`.pop()\` removes and returns the **last** item; \`.unshift(item)\` adds one or more items to the **start** (shifting every existing item's index up); \`.shift()\` removes and returns the **first** item (shifting every remaining item's index down). \`push\`/\`pop\` at the end are efficient operations; \`unshift\`/\`shift\` at the start are comparatively more expensive on large arrays, since every other item has to be re-indexed
- A detail worth internalizing early: an array **is** an object under the hood — \`typeof []\` returns \`"object"\`, not some special \`"array"\` type. What makes something behave as an array is really just a special \`length\` property that automatically tracks the highest numeric key, plus a large family of built-in array methods (\`.map\`, \`.filter\`, \`.push\`, and so on) available via its prototype. \`Array.isArray(value)\` is the reliable way to check specifically whether something is an array, since \`typeof\` alone can't distinguish an array from a plain object
- Arrays, like objects, are **mutable reference types**: assigning an existing array to a new variable (\`const copy = original;\`) doesn't create an independent copy — both names point at the *same* array in memory, so changing one through either name affects what the other sees. Making an actual independent copy requires an explicit method like the spread operator (\`[...original]\`) or \`.slice()\`, covered in later topics
- Reading past the end of an array (\`fruits[10]\` on a 3-item array) doesn't throw an error — it simply returns \`undefined\`, the same "quietly wrong instead of loudly wrong" behavior JavaScript tends to favor, and another reason to check \`.length\` or use safer iteration methods rather than manually guessing valid indices

Arrays and objects together cover the vast majority of real-world data shapes in JavaScript: objects for "one thing with several named attributes," arrays for "many things in a meaningful order" — and the two are very often nested inside each other, such as an array of user objects, each with its own properties.`,
  examples: [
    {
      id: "indexing-and-length",
      title: "Zero-based indexing and .length",
      summary: "An interactive index picker shows exactly which item each index points to.",
      code: `function App() {
  const fruits = ["apple", "banana", "cherry", "date"];
  const [index, setIndex] = useState(0);

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <p>Array: <code>{JSON.stringify(fruits)}</code></p>
      <p>fruits.length -> <strong>{fruits.length}</strong></p>
      <label>
        Index to look up:{" "}
        <input
          type="number"
          value={index}
          onChange={(e) => setIndex(Number(e.target.value))}
        />
      </label>
      <p>
        fruits[{index}] -> <strong>{fruits[index] === undefined ? "undefined (out of range)" : fruits[index]}</strong>
      </p>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        Try index 0 (first item) and index 3 (last item, since length - 1 = 3).
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "push-pop-shift-unshift",
      title: "push, pop, shift, and unshift",
      summary: "Watch the same array grow and shrink from both ends via interactive buttons.",
      code: `function App() {
  const [items, setItems] = useState(["b", "c"]);
  const [log, setLog] = useState([]);

  function print(value) {
    setLog((prev) => [...prev, String(value)]);
  }

  function doPush() {
    const copy = [...items];
    copy.push("d");
    setItems(copy);
    print("push('d') -> " + JSON.stringify(copy));
  }
  function doPop() {
    const copy = [...items];
    const removed = copy.pop();
    setItems(copy);
    print("pop() removed '" + removed + "' -> " + JSON.stringify(copy));
  }
  function doUnshift() {
    const copy = [...items];
    copy.unshift("a");
    setItems(copy);
    print("unshift('a') -> " + JSON.stringify(copy));
  }
  function doShift() {
    const copy = [...items];
    const removed = copy.shift();
    setItems(copy);
    print("shift() removed '" + removed + "' -> " + JSON.stringify(copy));
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <p>Current array: <strong>{JSON.stringify(items)}</strong></p>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <button onClick={doPush}>push('d')</button>
        <button onClick={doPop}>pop()</button>
        <button onClick={doUnshift}>unshift('a')</button>
        <button onClick={doShift}>shift()</button>
      </div>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 100 }}>
        {log.length === 0 ? "// click a button above" : log.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "arrays-are-objects",
      title: "Arrays are a special kind of object",
      summary: "typeof reports \"object\" for arrays too — Array.isArray is the reliable check.",
      code: `function App() {
  const [log, setLog] = useState([]);

  function print(value) {
    setLog((prev) => [...prev, String(value)]);
  }

  function run() {
    setLog([]);
    const list = [1, 2, 3];
    print("typeof list -> " + typeof list);
    print("Array.isArray(list) -> " + Array.isArray(list));
    print("Array.isArray({ length: 3 }) -> " + Array.isArray({ length: 3 }) + "  (looks array-like, but isn't one)");
    print("list.length -> " + list.length + "  (a normal property, just like on any object)");
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={run}>Run demo</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 100 }}>
        {log.length === 0 ? "// output appears here" : log.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "out-of-range-and-copy-gotcha",
      title: "Reading out of range, and the shared-reference gotcha",
      summary: "Missing indices return undefined silently; assigning an array doesn't copy it.",
      code: `function App() {
  const [log, setLog] = useState([]);

  function print(value) {
    setLog((prev) => [...prev, String(value)]);
  }

  function run() {
    setLog([]);
    const original = ["x", "y"];
    print("original[5] -> " + original[5] + "  (no error, just undefined)");

    const notACopy = original;
    notACopy.push("z");
    print("After pushing to 'notACopy', original is now: " + JSON.stringify(original) + "  (same array in memory!)");

    const realCopy = [...original];
    realCopy.push("w");
    print("After pushing to a real copy ([...original]), original stays: " + JSON.stringify(original));
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={run}>Run demo</button>
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
