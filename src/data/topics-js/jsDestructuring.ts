import type { Topic } from "../../types";

export const jsDestructuringTopic: Topic = {
  id: "js-destructuring",
  title: "JavaScript Destructuring and Spread",
  category: "Objects & Arrays",
  shortExplanation: `**Destructuring** unpacks values out of arrays/objects into individual variables in one step; **spread** (\`...\`) does the reverse, expanding a collection out.

- Array destructuring: \`const [a, b] = arr;\` — matched by **position**
- Object destructuring: \`const { x, y } = obj;\` — matched by **property name**
- Both support **default values**: \`const { role = "guest" } = user;\`
- The **spread operator** \`...\` copies/merges arrays (\`[...a, ...b]\`) and objects (\`{...a, ...b}\`); the **rest pattern** \`...rest\` scoops up "everything else" left over during destructuring`,
  longExplanation: `Destructuring and spread are two closely related pieces of syntax, both built around the same \`...\`-adjacent idea of "unpacking" or "packing" a collection, that together make working with arrays and objects considerably more concise than manually pulling out or merging values one at a time.

- **Array destructuring** pulls values out of an array into named variables **by position**: \`const [first, second] = ["a", "b"];\` sets \`first\` to \`"a"\` and \`second\` to \`"b"\`. Any position can be skipped with a blank slot: \`const [, second] = ["a", "b"];\` grabs only the second item. This same pattern is exactly how \`useState()\` calls are written throughout React — \`const [value, setValue] = useState(0);\` is array destructuring pulling the current value and its setter out of the two-item array \`useState\` returns
- **Object destructuring** pulls values out **by property name**, not position: \`const { name, age } = user;\` creates variables named \`name\` and \`age\`, matching keys on \`user\` regardless of what order they appear in. A destructured variable can be given a different local name using \`:\` — \`const { name: userName } = user;\` reads the \`name\` property but stores it in a variable called \`userName\` — handy for avoiding a naming collision, or for renaming to something clearer in context
- Both forms support **default values**, used whenever the corresponding item is \`undefined\` (a missing array slot, or a missing object property): \`const { role = "guest" } = user;\` sets \`role\` to \`"guest"\` if \`user\` doesn't have a \`role\` property at all. This is extremely common for handling optional configuration objects and optional function parameters cleanly
- Destructuring also works directly in **function parameters**, which is one of its most common real-world uses: \`function greet({ name, age }) { return "Hi " + name; }\` lets a function accept one object argument while immediately unpacking the fields it needs, without a separate line inside the function body
- Destructuring can be **nested** to reach into objects or arrays several levels deep in a single statement: \`const { address: { city } } = user;\` reaches straight into a nested \`address\` object to pull out \`city\`
- The **spread operator**, written as \`...\` in an *array literal, object literal, or function call*, expands a collection's items out in place: \`[...arrayA, ...arrayB]\` merges two arrays into a new one; \`{...objA, ...objB}\` merges two objects into a new one (with \`objB\`'s properties winning on any overlapping key, since it's spread second); \`[...original]\` and \`{...original}\` are the standard idioms for making a quick shallow copy of an array or object. This is exactly what makes non-mutating updates convenient throughout modern JavaScript and React: rather than mutating an existing array or object, spread builds a brand-new one that shares the old values plus whatever changes you add alongside it
- The **rest pattern**, confusingly written with the exact same \`...\` syntax but appearing on the *destructuring* (left-hand, "unpacking") side rather than in a literal, scoops up "everything not already destructured" into its own array or object: \`const [first, ...others] = [1, 2, 3, 4];\` gives \`first = 1\` and \`others = [2, 3, 4]\`; \`const { id, ...rest } = user;\` gives \`id\` on its own and every *other* property of \`user\` bundled into \`rest\`. This is the same underlying \`...\` syntax used by rest *parameters* in function definitions, covered in the function parameters topic — the name "spread" is used when \`...\` is *expanding* a collection, and "rest" when it's *collecting* leftover items during destructuring
- Spread only makes a **shallow** copy — nested objects or arrays inside the copied structure are still shared by reference with the original, a detail worth remembering before assuming a spread copy is fully independent at every level

Together, destructuring and spread/rest are less about doing anything JavaScript couldn't already do with plain property access and loops, and more about writing the *same* operations far more concisely and readably — which is exactly why they show up constantly in modern JavaScript and, especially, in idiomatic React code.`,
  examples: [
    {
      id: "array-destructuring",
      title: "Array destructuring, including skipping and defaults",
      summary: "Values are matched by position — the same pattern used by useState() itself.",
      code: `function App() {
  const [log, setLog] = useState([]);

  function print(value) {
    setLog((prev) => [...prev, String(value)]);
  }

  function run() {
    setLog([]);
    const coordinates = [10, 20, 30];
    const [x, y, z] = coordinates;
    print("const [x, y, z] = [10, 20, 30] -> x=" + x + ", y=" + y + ", z=" + z);

    const [, second] = coordinates;
    print("Skipping the first slot -> second = " + second);

    const [a = 1, b = 2, c = 3, d = 4] = [100, 200];
    print("Defaults fill in missing slots -> a=" + a + ", b=" + b + ", c=" + c + ", d=" + d);
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={run}>Run array destructuring demo</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 100 }}>
        {log.length === 0 ? "// output appears here" : log.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "object-destructuring-renaming-defaults",
      title: "Object destructuring: renaming and default values",
      summary: "Pull fields out by name, rename one, and supply a default for a missing property.",
      code: `function App() {
  const [log, setLog] = useState([]);

  function print(value) {
    setLog((prev) => [...prev, String(value)]);
  }

  const user = { name: "Ada", age: 30 };

  function greet({ name: userName, role = "guest" }) {
    return "Hi " + userName + ", your role is: " + role;
  }

  function run() {
    setLog([]);
    const { name, age } = user;
    print("Destructured -> name=" + name + ", age=" + age);
    print(greet(user) + "  (role defaulted, since user has none)");
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={run}>Run object destructuring demo</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 90 }}>
        {log.length === 0 ? "// output appears here" : log.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "spread-merging-and-copying",
      title: "Spread: merging and copying arrays and objects",
      summary: "Spread builds brand-new arrays/objects, leaving the originals untouched.",
      code: `function App() {
  const [log, setLog] = useState([]);

  function print(value) {
    setLog((prev) => [...prev, String(value)]);
  }

  function run() {
    setLog([]);
    const arrA = [1, 2];
    const arrB = [3, 4];
    const mergedArr = [...arrA, ...arrB];
    print("[...arrA, ...arrB] -> " + JSON.stringify(mergedArr));

    const defaults = { theme: "light", fontSize: 14 };
    const overrides = { fontSize: 18 };
    const finalSettings = { ...defaults, ...overrides };
    print("{...defaults, ...overrides} -> " + JSON.stringify(finalSettings) + "  (overrides win on overlap)");

    const original = { a: 1 };
    const copy = { ...original };
    copy.a = 99;
    print("Original after mutating the copy -> " + JSON.stringify(original) + "  (untouched, it's a real copy)");
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={run}>Run spread demo</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 110 }}>
        {log.length === 0 ? "// output appears here" : log.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "rest-pattern-leftovers",
      title: "The rest pattern: collecting what's left over",
      summary: "Destructure a few named items, and let ...rest scoop up everything else.",
      code: `function App() {
  const [log, setLog] = useState([]);

  function print(value) {
    setLog((prev) => [...prev, String(value)]);
  }

  function run() {
    setLog([]);
    const [first, ...others] = [1, 2, 3, 4, 5];
    print("const [first, ...others] = [1,2,3,4,5] -> first=" + first + ", others=" + JSON.stringify(others));

    const user = { id: 1, name: "Ada", age: 30, role: "admin" };
    const { id, ...rest } = user;
    print("const { id, ...rest } = user -> id=" + id + ", rest=" + JSON.stringify(rest));
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={run}>Run rest-pattern demo</button>
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
