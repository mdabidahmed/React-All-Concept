import type { Topic } from "../../types";

export const jsObjectsTopic: Topic = {
  id: "js-objects",
  title: "JavaScript Objects",
  category: "Objects & Arrays",
  shortExplanation: `An **object** groups related data and behavior together as named **properties**, written as \`{ key: value, ... }\`.

- A property can hold any value, including a function — a function stored on an object is called a **method**
- **Dot notation** (\`obj.name\`) is the everyday way to read/write a property; **bracket notation** (\`obj["name"]\`) works too and allows dynamic or non-identifier keys
- Inside a method, \`this\` refers to the object the method was called *on*
- Objects are JavaScript's main way to represent a real-world "thing" with several attributes at once`,
  longExplanation: `Where a primitive value (a number, a string) represents one single piece of data, an **object** represents a *collection* of related data grouped under one name — a user with a name, age, and email; a product with a price and a quantity; a point with an x and a y. Objects are, alongside arrays, the backbone of how JavaScript models real-world data.

- The simplest way to create one is an **object literal**: \`const user = { name: "Ada", age: 30 };\`. Each \`key: value\` pair is called a **property**. Keys are usually written as plain identifiers, but can also be strings (useful for keys with spaces or special characters) or, less commonly, computed dynamically
- A property's value can be *any* type — a string, a number, another object, an array, or a **function**. When a function is stored as a property, it's called a **method**, and it represents behavior the object can perform: \`const user = { name: "Ada", greet() { return "Hi, I'm " + this.name; } };\` — note the shorthand method syntax, \`greet() { ... }\`, which is equivalent to \`greet: function () { ... }\`
- Properties are read and written using **dot notation**, \`user.name\`, which is the clearest and most common syntax, but requires the key to be a valid identifier (no spaces, doesn't start with a digit). **Bracket notation**, \`user["name"]\`, does the same job but takes the key as a *string* (or any expression that evaluates to one), which unlocks two things dot notation can't do: accessing keys that aren't valid identifiers (\`user["favorite color"]\`), and accessing a key **dynamically**, using a variable: \`const key = "name"; user[key]\` reads whatever property name the variable currently holds — essential when the property you need isn't known until the code actually runs
- Properties can be **added**, **changed**, or **removed** at any time after an object is created, even one declared with \`const\` — remember, \`const\` only locks the *variable binding*, not the object's contents: \`user.email = "ada@example.com";\` adds a new property, \`user.age = 31;\` changes an existing one, and \`delete user.age;\` removes it entirely
- Checking whether a property exists is commonly done with the \`in\` operator (\`"name" in user\`) or \`Object.hasOwn(user, "name")\` (the modern replacement for the older \`user.hasOwnProperty("name")\`) — both distinguish an actually-missing property from one that merely holds \`undefined\`
- Inside a method, the special keyword **\`this\`** refers to "the object the method was called on" — so the same method definition, if attached to two different objects, would see a different \`this\` (and thus different property values) on each. This dynamic binding is powerful but is also exactly the behavior that trips people up with regular callbacks losing their \`this\`, which is covered in depth in the arrow functions and call/apply/bind topics
- \`Object.keys(obj)\`, \`Object.values(obj)\`, and \`Object.entries(obj)\` are the standard ways to get, respectively, an array of a plain object's key names, its values, or \`[key, value]\` pairs — useful whenever you need to loop over an object's contents generically, since (unlike arrays) objects don't have a built-in \`.map()\` or \`.forEach()\` of their own
- Two objects are only considered \`===\` equal if they are the *exact same object in memory* — two separately created objects with identical-looking properties are **not** equal, a detail that surprises people used to comparing primitives, and one worth remembering whenever comparing objects for "sameness"

Objects, together with arrays, are how nearly all real-world data ends up represented in a JavaScript program — from a single user profile to an entire JSON API response — so being comfortable creating, reading, and reshaping them is foundational to almost everything built on top of plain JavaScript.`,
  examples: [
    {
      id: "object-literal-basics",
      title: "Creating an object and reading its properties",
      summary: "A simple object literal with data properties and a method using this.",
      code: `function App() {
  const [log, setLog] = useState([]);

  function print(value) {
    setLog((prev) => [...prev, String(value)]);
  }

  const user = {
    name: "Ada",
    age: 30,
    greet() {
      return "Hi, I'm " + this.name + " and I'm " + this.age + ".";
    },
  };

  function run() {
    setLog([]);
    print("user.name -> " + user.name);
    print("user.age -> " + user.age);
    print("user.greet() -> " + user.greet());
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={run}>Run object demo</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 90 }}>
        {log.length === 0 ? "// output appears here" : log.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "dot-vs-bracket-notation",
      title: "Dot notation vs. bracket notation",
      summary: "An interactive lookup shows why bracket notation is needed for dynamic keys.",
      code: `function App() {
  const [key, setKey] = useState("name");

  const product = {
    name: "Keyboard",
    price: 49,
    "in stock": true,
  };

  const dynamicValue = product[key];

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <p>Dot notation: <code>product.name</code> &rarr; <strong>{product.name}</strong></p>
      <p>Bracket notation (fixed): <code>{'product["in stock"]'}</code> &rarr; <strong>{String(product["in stock"])}</strong></p>
      <label>
        Type a property name to look up dynamically (try: name, price):{" "}
        <input value={key} onChange={(e) => setKey(e.target.value)} />
      </label>
      <p>
        <code>{'product[key]'}</code> where key = "{key}" &rarr;{" "}
        <strong>{dynamicValue === undefined ? "undefined (no such property)" : String(dynamicValue)}</strong>
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "add-change-delete-properties",
      title: "Adding, changing, and deleting properties",
      summary: "Properties can be modified freely even on a const-declared object.",
      code: `function App() {
  const [log, setLog] = useState([]);

  function print(value) {
    setLog((prev) => [...prev, String(value)]);
  }

  function run() {
    setLog([]);
    const car = { brand: "Toyota" };
    print("Initial: " + JSON.stringify(car));

    car.model = "Corolla";
    print("After adding 'model': " + JSON.stringify(car));

    car.brand = "Honda";
    print("After changing 'brand': " + JSON.stringify(car));

    delete car.model;
    print("After deleting 'model': " + JSON.stringify(car));
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={run}>Run mutation demo</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 100 }}>
        {log.length === 0 ? "// output appears here" : log.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "object-keys-values-entries",
      title: "Looping over an object with Object.keys/values/entries",
      summary: "Objects lack a built-in forEach, so these helpers turn them into arrays first.",
      code: `function App() {
  const [log, setLog] = useState([]);

  function print(value) {
    setLog((prev) => [...prev, String(value)]);
  }

  const scores = { Ada: 92, Grace: 88, Linus: 95 };

  function run() {
    setLog([]);
    print("Object.keys(scores) -> " + JSON.stringify(Object.keys(scores)));
    print("Object.values(scores) -> " + JSON.stringify(Object.values(scores)));
    print("Object.entries(scores):");
    Object.entries(scores).forEach(([name, score]) => {
      print("  " + name + " scored " + score);
    });
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={run}>Run Object.* demo</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 120 }}>
        {log.length === 0 ? "// output appears here" : log.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
