import type { Topic } from "../../types";

export const jsClassInheritanceTopic: Topic = {
  id: "js-class-inheritance",
  title: "JavaScript Class Inheritance",
  category: "Advanced Concepts",
  shortExplanation: `\`extends\` lets one class build on another, inheriting its properties and methods instead of rewriting them from scratch.

- \`class Dog extends Animal { ... }\` makes \`Dog\` a *subclass* of \`Animal\`
- \`super(...)\` inside a subclass's constructor calls the parent's constructor — it must run before \`this\` can be used
- Overriding a method just means redefining it with the same name in the subclass; \`super.methodName()\` can still call the parent's original version from inside the override`,
  longExplanation: `Inheritance lets one class reuse another class's behavior instead of duplicating it. Writing \`class Dog extends Animal { ... }\` makes \`Dog\` a **subclass** of \`Animal\`: every instance of \`Dog\` automatically gets access to everything \`Animal\` defines — its properties (once set up) and its methods — plus whatever new properties and methods \`Dog\` adds on top. This models a natural "is-a" relationship: a \`Dog\` *is an* \`Animal\`, with some extra dog-specific behavior layered in.

Inside a subclass's constructor, the very first thing that must happen — before touching \`this\` in any way — is a call to \`super(...)\`, which runs the *parent* class's constructor. This isn't just a style convention; it's enforced by JavaScript itself. In a class that \`extends\` another, \`this\` doesn't actually exist yet at the start of the constructor — it's the parent constructor's job, invoked through \`super()\`, to create it. Trying to reference \`this\` before calling \`super()\` throws a \`ReferenceError\` immediately. In practice, this usually looks like: \`constructor(name, breed) { super(name); this.breed = breed; }\` — the shared piece (\`name\`) is handed up to \`Animal\`'s constructor to set up, and only the \`Dog\`-specific piece (\`breed\`) is set directly.

**Overriding** a method is just as direct as it sounds: define a method with the *same name* in the subclass, and it takes priority for any instance of that subclass. If \`Animal\` defines \`speak() { return this.name + " makes a sound."; }\` and \`Dog\` defines its own \`speak() { return this.name + " barks."; }\`, then calling \`.speak()\` on a \`Dog\` instance runs \`Dog\`'s version, not \`Animal\`'s — JavaScript looks for the method starting at the most specific level (the instance's own class) and only checks further up the chain if it doesn't find a match there.

Overriding a method doesn't have to mean throwing the parent's version away entirely. From inside an override, \`super.methodName()\` explicitly calls the *parent's* original implementation — letting a subclass add to or wrap the base behavior rather than fully replacing it. A common pattern is running some extra logic and then still delegating to the parent: \`speak() { return super.speak() + " Specifically, it barks."; }\` calls \`Animal\`'s \`speak()\` first, then appends more text to what it returns.

Chains can go more than one level deep — a class can extend a class that itself extends another class — and JavaScript will walk up through however many levels exist to resolve a method or property that a subclass doesn't override itself, using the exact same prototype chain mechanism described in the *prototypes* topic (inheritance in JavaScript, under the \`class\` syntax, is still prototype-based underneath). That said, it's worth knowing that deep inheritance chains have a well-known reputation for eventually becoming hard to follow and change — many modern style guides favor keeping hierarchies shallow, or reaching for *composition* (building objects out of smaller, combined pieces) over long chains of \`extends\`, once relationships get complicated. For the straightforward, one- or two-level "is-a" relationships this topic covers, though, \`extends\` and \`super\` are exactly the right, idiomatic tool.`,
  examples: [
    {
      id: "extends-and-super",
      title: "extends and super() in the constructor",
      summary: "Dog inherits speak() from Animal and calls super(name) to set up the shared property.",
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

    class Dog extends Animal {
      constructor(name, breed) {
        super(name);
        this.breed = breed;
      }
    }

    const rex = new Dog("Rex", "Labrador");
    print("rex.name: " + rex.name);
    print("rex.breed: " + rex.breed);
    print("rex.speak(): " + rex.speak());
    print("rex instanceof Animal: " + (rex instanceof Animal));
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={run}>Create a Dog extending Animal</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 100 }}>
        {log.length === 0 ? "// output appears here" : log.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "overriding-a-method",
      title: "Overriding a parent method",
      summary: "Dog redefines speak() with the same name — its version wins for Dog instances.",
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

    class Dog extends Animal {
      speak() {
        return this.name + " barks.";
      }
    }

    const generic = new Animal("Some animal");
    const rex = new Dog("Rex");
    print(generic.speak());
    print(rex.speak());
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={run}>Compare base vs. overridden speak()</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 80 }}>
        {log.length === 0 ? "// output appears here" : log.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "calling-super-method-from-override",
      title: "Calling super.speak() from inside the override",
      summary: "The override extends the parent's behavior instead of fully replacing it.",
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

    class Dog extends Animal {
      speak() {
        return super.speak() + " Specifically, it barks.";
      }
    }

    const rex = new Dog("Rex");
    print(rex.speak());
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={run}>Call the overridden speak()</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 70 }}>
        {log.length === 0 ? "// output appears here" : log.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "shape-hierarchy-interactive",
      title: "An interactive Shape / Circle / Rectangle hierarchy",
      summary: "Two subclasses each implement area() differently, but share the same describe() method.",
      code: `function App() {
  class Shape {
    constructor(name) {
      this.name = name;
    }
    describe() {
      return this.name + " has an area of " + this.area().toFixed(2);
    }
  }

  class Circle extends Shape {
    constructor(radius) {
      super("Circle");
      this.radius = radius;
    }
    area() {
      return Math.PI * this.radius * this.radius;
    }
  }

  class Rectangle extends Shape {
    constructor(width, height) {
      super("Rectangle");
      this.width = width;
      this.height = height;
    }
    area() {
      return this.width * this.height;
    }
  }

  const [radius, setRadius] = useState(4);
  const [width, setWidth] = useState(5);
  const [height, setHeight] = useState(3);

  const circle = new Circle(radius);
  const rectangle = new Rectangle(width, height);

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <span>Circle radius:</span>
        <input type="number" value={radius} onChange={(e) => setRadius(Number(e.target.value))} style={{ padding: 8, width: 70 }} />
      </div>
      <p>{circle.describe()}</p>
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <span>Rectangle width/height:</span>
        <input type="number" value={width} onChange={(e) => setWidth(Number(e.target.value))} style={{ padding: 8, width: 70 }} />
        <input type="number" value={height} onChange={(e) => setHeight(Number(e.target.value))} style={{ padding: 8, width: 70 }} />
      </div>
      <p>{rectangle.describe()}</p>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
