import type { Topic } from "../../types";

export const jsPrototypesTopic: Topic = {
  id: "js-prototypes",
  title: "JavaScript Prototypes",
  category: "Advanced Concepts",
  shortExplanation: `Every JavaScript object has a hidden internal link to another object called its ==prototype== — and when a property isn't found directly on an object, JavaScript automatically keeps looking up that link before giving up.

- \`Object.getPrototypeOf(obj)\` reveals an object's prototype
- Following prototype to prototype to prototype forms the **prototype chain** — it ends when a prototype of \`null\` is reached
- This is the real mechanism \`class\` and \`extends\` are built on top of — inheritance in JavaScript has always worked this way, classes just add friendlier syntax on top`,
  longExplanation: `Every object in JavaScript carries a hidden, internal link to another object, called its **prototype**. This link isn't a regular, visible property — you won't see it if you loop over an object's own keys — but JavaScript consults it automatically every single time a property lookup doesn't find a match directly on the object itself.

Here's the mechanism in action: when you write \`someObject.toString()\`, JavaScript first checks whether \`someObject\` has its own \`toString\` property. It almost never does — so JavaScript then checks \`someObject\`'s *prototype*, an object that (for most plain objects) does have a \`toString\` method sitting on it. That prototype object might, in turn, have its *own* prototype, and the lookup keeps walking upward, link by link, until either a match is found or the chain ends. This walk is called the **prototype chain**, and it terminates at an object whose prototype is \`null\` — there's nowhere further to look, so an unfound property finally resolves to \`undefined\`.

\`Object.getPrototypeOf(obj)\` is the standard, explicit way to inspect what an object's prototype actually is. For a plain object literal like \`{}\`, this returns \`Object.prototype\` — the shared object that supplies familiar methods like \`.toString()\` and \`.hasOwnProperty()\` to essentially every object in the language. For an array, \`Object.getPrototypeOf([])\` returns \`Array.prototype\` instead — the object that supplies \`.map()\`, \`.push()\`, \`.filter()\`, and every other array method. This is *why* arrays have those methods available: they aren't special built-in magic attached to each array individually, they're ordinary methods sitting on one shared \`Array.prototype\` object that every array's prototype chain passes through.

\`Object.create(protoObject)\` builds a brand-new, empty object whose prototype is set directly to whatever you pass in — the most explicit, no-syntax-sugar way to wire up a prototype relationship by hand. \`obj.hasOwnProperty("key")\` answers a related, frequently useful question: does this *specific* object have \`"key"\` directly on itself, as opposed to inheriting it from somewhere up the chain? Looping over an object's properties with a plain \`for...in\` loop, for instance, walks inherited properties too, which is exactly why \`hasOwnProperty\` checks are a common guard inside one.

This is the real, underlying mechanism that \`class\` and \`extends\` (covered in their own topics) are built directly on top of. When you write a method inside a \`class\` body, JavaScript doesn't attach a separate copy of that method to every instance — it places the method once on the class's \`.prototype\` object, and every instance's own, hidden prototype link points to that shared object. \`class Dog extends Animal\` works by setting \`Dog.prototype\`'s own prototype to \`Animal.prototype\`, chaining the two prototype objects together — which is exactly how a \`Dog\` instance ends up able to reach methods defined on \`Animal\`. Before the \`class\` keyword existed, JavaScript developers wired this up manually, by directly assigning methods onto a constructor function's \`.prototype\` object — verbose, but functionally identical to what a modern class compiles down to. Understanding prototypes is what turns \`class\`, \`extends\`, and \`super\` from memorized syntax into mechanisms you can actually reason about.`,
  examples: [
    {
      id: "prototype-chain-lookup",
      title: "Inspecting real prototypes",
      summary: "Object.getPrototypeOf() reveals what plain objects and arrays actually inherit from.",
      code: `function App() {
  const [log, setLog] = useState([]);

  function print(value) {
    setLog((prev) => [...prev, String(value)]);
  }

  function run() {
    setLog([]);
    const obj = {};
    const arr = [];
    print("Object.getPrototypeOf({}) === Object.prototype: " + (Object.getPrototypeOf(obj) === Object.prototype));
    print("Object.getPrototypeOf([]) === Array.prototype: " + (Object.getPrototypeOf(arr) === Array.prototype));
    print("typeof obj.toString: " + typeof obj.toString + " (inherited, not defined on obj itself)");
    print("Object.getPrototypeOf(Object.prototype): " + Object.getPrototypeOf(Object.prototype));
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={run}>Inspect prototypes</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 110 }}>
        {log.length === 0 ? "// output appears here" : log.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "object-create",
      title: "Building inheritance by hand with Object.create()",
      summary: "No class syntax at all — just a plain object linked directly as another object's prototype.",
      code: `function App() {
  const [log, setLog] = useState([]);

  function print(value) {
    setLog((prev) => [...prev, String(value)]);
  }

  function run() {
    setLog([]);
    const animalPrototype = {
      speak() {
        return this.name + " makes a sound.";
      },
    };

    const dog = Object.create(animalPrototype);
    dog.name = "Rex";

    print("dog.speak(): " + dog.speak());
    print("dog has own 'speak'? " + dog.hasOwnProperty("speak"));
    print("Object.getPrototypeOf(dog) === animalPrototype: " + (Object.getPrototypeOf(dog) === animalPrototype));
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={run}>Build inheritance with Object.create</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 100 }}>
        {log.length === 0 ? "// output appears here" : log.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "hasOwnProperty-vs-inherited",
      title: "Own properties vs. inherited properties",
      summary: "for...in walks the whole prototype chain — hasOwnProperty tells own and inherited keys apart.",
      code: `function App() {
  const [log, setLog] = useState([]);

  function print(value) {
    setLog((prev) => [...prev, String(value)]);
  }

  function run() {
    setLog([]);
    const base = { greeting: "Hello from base" };
    const child = Object.create(base);
    child.ownField = "I belong to child";

    for (const key in child) {
      print(key + " -> own property? " + child.hasOwnProperty(key));
    }
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={run}>List keys and check ownership</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 90 }}>
        {log.length === 0 ? "// output appears here" : log.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "class-methods-on-prototype",
      title: "Class methods really do live on the prototype",
      summary: "Two instances share the literal same method function via Animal.prototype.",
      code: `function App() {
  const [log, setLog] = useState([]);

  function print(value) {
    setLog((prev) => [...prev, String(value)]);
  }

  function run() {
    setLog([]);
    class Animal {
      constructor(name) {
        this.name = name;
      }
      speak() {
        return this.name + " makes a sound.";
      }
    }

    const a = new Animal("Rex");
    const b = new Animal("Fido");

    print("typeof Animal: " + typeof Animal);
    print("a.speak === Animal.prototype.speak: " + (a.speak === Animal.prototype.speak));
    print("a.speak === b.speak (shared, not copied): " + (a.speak === b.speak));
    print("Object.getPrototypeOf(a) === Animal.prototype: " + (Object.getPrototypeOf(a) === Animal.prototype));
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={run}>Verify class methods live on the prototype</button>
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
