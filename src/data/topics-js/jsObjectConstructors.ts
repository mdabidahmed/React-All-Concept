import type { Topic } from "../../types";

export const jsObjectConstructorsTopic: Topic = {
  id: "js-object-constructors",
  title: "JavaScript Object Constructors",
  category: "Objects & Arrays",
  shortExplanation: `A **constructor function** is a regular function designed to be called with \`new\`, acting as a *template* for creating many similar objects.

- Calling \`new Person("Ada")\` creates a **brand-new empty object**, binds \`this\` inside the function to it, then returns it automatically
- By convention, constructor function names are **PascalCase** (\`Person\`, not \`person\`) to signal "call me with \`new\`"
- Each object created this way is an independent instance — changing one doesn't affect the others
- Modern JavaScript often prefers \`class\` syntax for this same job, but classes are mostly a cleaner syntax over this exact mechanism`,
  longExplanation: `When a program needs to create many objects that all share the same *shape* — several users, several products, several points on a graph — writing out a separate object literal for each one gets repetitive and error-prone. A **constructor function** solves this by acting as a reusable template: define the shape once as a function, then stamp out as many independent objects from it as needed using the \`new\` keyword.

- A constructor is written as an ordinary function, conventionally named starting with a **capital letter** (PascalCase) purely as a convention to signal "this function is meant to be called with \`new\`", not a regular call: \`function Person(name, age) { this.name = name; this.age = age; }\`
- The \`new\` keyword changes how a function call behaves, performing several steps automatically: it creates a **brand-new, empty object**; it sets \`this\` *inside* the function to point at that new object for the duration of the call; it runs the function body (which typically attaches properties to \`this\`); and, unless the function explicitly returns some other object, it automatically **returns the newly created object** — no explicit \`return\` needed inside the constructor
- Calling \`new Person("Ada", 30)\` and \`new Person("Grace", 36)\` produces two completely separate objects — each with its own independent \`name\` and \`age\` — even though both were built from the exact same function. Changing \`ada.age\` afterward has no effect whatsoever on \`grace\`; they don't share any storage, only the "recipe" that built them
- Calling the *same* function *without* \`new\` behaves completely differently and is a classic source of bugs: without \`new\`, \`this\` inside the function is **not** a new object — depending on strict mode, it may be \`undefined\` (throwing an error when a property is assigned to it) or the global object (silently attaching properties to the wrong place). This is precisely why the PascalCase naming convention exists: it's a visual reminder, at every call site, that a function must be invoked with \`new\`
- Constructor functions can also define shared **methods**, though attaching a method directly inside the constructor body (\`this.greet = function () {...}\`) would wastefully recreate an identical function for every single instance. The traditional fix is to attach shared methods to the constructor's \`prototype\` instead — \`Person.prototype.greet = function () { return "Hi, I'm " + this.name; };\` — so every instance shares one single copy of the method in memory, while still being able to call \`instance.greet()\` as if it were its own
- The \`instanceof\` operator checks whether a given object was built by a particular constructor: \`ada instanceof Person\` is \`true\`, which is useful for verifying an object's "type" at runtime in a dynamically-typed language
- Modern JavaScript (ES2015+) offers \`class\` syntax — \`class Person { constructor(name) { this.name = name; } greet() {...} }\` — as a cleaner, more readable way to write the exact same underlying mechanism: a \`class\`'s \`constructor\` method and its other methods compile down to essentially the same constructor-function-plus-prototype pattern described above. Understanding constructor functions directly is what makes \`class\` syntax feel like a clear syntactic shortcut rather than a completely separate concept

Constructor functions (and the \`class\` syntax built on top of them) are the standard way JavaScript models "many objects of the same kind" — understanding the mechanics of \`new\` and \`this\` here pays off directly when working with \`class\`-based code, which is extremely common in real applications.`,
  examples: [
    {
      id: "basic-constructor",
      title: "A Person constructor creating multiple instances",
      summary: "The same constructor function produces independent objects with their own data.",
      code: `function App() {
  const [log, setLog] = useState([]);

  function print(value) {
    setLog((prev) => [...prev, String(value)]);
  }

  function Person(name, age) {
    this.name = name;
    this.age = age;
  }

  function run() {
    setLog([]);
    const ada = new Person("Ada", 30);
    const grace = new Person("Grace", 36);

    print("ada -> name: " + ada.name + ", age: " + ada.age);
    print("grace -> name: " + grace.name + ", age: " + grace.age);

    ada.age = 31;
    print("After changing ada.age, grace.age is still: " + grace.age + "  (they're independent objects)");
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={run}>Run constructor demo</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 100 }}>
        {log.length === 0 ? "// output appears here" : log.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "shared-prototype-method",
      title: "Sharing a method via the prototype",
      summary: "One greet method lives on Person.prototype and is shared by every instance.",
      code: `function App() {
  const [log, setLog] = useState([]);

  function print(value) {
    setLog((prev) => [...prev, String(value)]);
  }

  function Person(name) {
    this.name = name;
  }
  Person.prototype.greet = function () {
    return "Hi, I'm " + this.name;
  };

  function run() {
    setLog([]);
    const ada = new Person("Ada");
    const grace = new Person("Grace");

    print(ada.greet());
    print(grace.greet());
    print("ada.greet === grace.greet -> " + (ada.greet === grace.greet) + "  (same shared function on the prototype)");
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={run}>Run prototype-method demo</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 90 }}>
        {log.length === 0 ? "// output appears here" : log.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "missing-new-pitfall",
      title: "What goes wrong without new",
      summary: "Calling a constructor as a plain function leaves this pointing at the wrong place.",
      code: `function App() {
  const [log, setLog] = useState([]);

  function print(value) {
    setLog((prev) => [...prev, String(value)]);
  }

  function Person(name) {
    this.name = name;
  }

  function run() {
    setLog([]);
    const withNew = new Person("Ada");
    print("new Person('Ada') -> name: " + withNew.name + "  (correct — this pointed at a fresh object)");

    try {
      const withoutNew = Person("Ada");
      print("Person('Ada') without new -> returned: " + withoutNew);
    } catch (error) {
      print("Calling Person('Ada') without new threw: " + error.message);
    }
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={run}>Run new-vs-no-new demo</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 100 }}>
        {log.length === 0 ? "// output appears here" : log.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "instanceof-check",
      title: "Checking an object's constructor with instanceof",
      summary: "instanceof confirms which constructor built a given object.",
      code: `function App() {
  const [log, setLog] = useState([]);

  function print(value) {
    setLog((prev) => [...prev, String(value)]);
  }

  function Person(name) {
    this.name = name;
  }
  function Product(title) {
    this.title = title;
  }

  function run() {
    setLog([]);
    const ada = new Person("Ada");
    const keyboard = new Product("Keyboard");

    print("ada instanceof Person -> " + (ada instanceof Person));
    print("ada instanceof Product -> " + (ada instanceof Product));
    print("keyboard instanceof Product -> " + (keyboard instanceof Product));
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={run}>Run instanceof demo</button>
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
