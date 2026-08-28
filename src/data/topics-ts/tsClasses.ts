import type { Topic } from "../../types";

export const tsClassesTopic: Topic = {
  id: "ts-classes",
  title: "TypeScript Classes",
  category: "Classes & OOP",
  shortExplanation: `A TypeScript **class** describes both the *shape* of its instances (typed properties) and the *behavior* attached to them (methods), with the constructor typically responsible for setting each property's initial value.

- Typed properties: \`class Point { x: number; y: number; }\` — every instance must have both, with the declared types enforced
- Constructor shorthand: \`constructor(public name: string) {}\` declares **and** assigns the property in one step, instead of writing it twice
- \`new ClassName(...)\` creates an instance — TypeScript checks the constructor arguments against the declared constructor signature`,
  longExplanation: `A class in TypeScript looks almost exactly like a JavaScript class, with one major addition: every property, parameter, and method can carry a type, checked at compile time before the class is ever instantiated.

- **Typed properties** are declared inside the class body, optionally with an initial value: \`class Point { x: number; y: number; }\`. Every instance created from this class is guaranteed to have both properties, with the types TypeScript expects — assigning the wrong type to \`point.x\` anywhere is a compile-time error.
- The **constructor** is a special method, named \`constructor\`, that runs automatically whenever \`new ClassName(...)\` is called. Its job is usually to receive some initial data and use it to set up the instance's properties: \`constructor(x: number, y: number) { this.x = x; this.y = y; }\`.
- TypeScript adds a shorthand that removes a lot of this boilerplate: prefixing a constructor **parameter** with an access modifier (\`public\`, \`private\`, \`protected\`, or \`readonly\`) both declares a class property of that name and type, *and* assigns the passed-in argument to it — automatically, with no separate \`this.x = x;\` line needed at all: \`constructor(public x: number, public y: number) {}\`. This is pure syntax sugar; it behaves identically to writing the property and the assignment by hand.
- Shorthand and regular constructor parameters can be freely mixed in the same constructor — some parameters can become properties automatically via the shorthand, while others stay as plain parameters used only inside the constructor body (or assigned manually, under a different property name if needed).
- **Methods** are defined without the \`function\` keyword, directly inside the class body: \`move(dx: number, dy: number): void { this.x += dx; this.y += dy; }\`. Inside any method, \`this\` refers to the specific instance the method was called on.
- **Creating instances** always goes through \`new ClassName(...)\` — TypeScript checks the arguments passed against the constructor's declared parameter types exactly the way it checks arguments to any other typed function, catching a wrong-typed or missing argument immediately.
- Under the hood, a TypeScript class compiles down to a real JavaScript class (or an equivalent function-and-prototype pattern, depending on the compile target) — all the type annotations are stripped away, exactly as with every other TypeScript feature; classes carry zero runtime cost beyond what an equivalent hand-written JavaScript class would already cost.

Classes are where nearly every other object-oriented TypeScript feature attaches — access modifiers, \`readonly\`, getters and setters, \`abstract\`, \`implements\`, \`static\`, and inheritance via \`extends\` all build directly on this basic shape.`,
  examples: [
    {
      id: "basic-class",
      title: "A basic class with an explicit constructor",
      summary: "Point stores typed x/y coordinates, assigned manually in the constructor.",
      code: `class Point {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  toString(): string {
    return "(" + this.x + ", " + this.y + ")";
  }
}

function App() {
  const origin = new Point(0, 0);
  const somewhere = new Point(3, 4);

  return (
    <div style={{ display: "grid", gap: 6 }}>
      <p>origin = {origin.toString()}</p>
      <p>somewhere = {somewhere.toString()}</p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "constructor-shorthand",
      title: "The constructor parameter property shorthand",
      summary: "Same Point class, with far less boilerplate.",
      code: `// Constructor parameter properties: "public x: number" both declares the property
// AND assigns it — no separate "this.x = x;" line needed.
class Point {
  constructor(public x: number, public y: number) {}

  toString(): string {
    return "(" + this.x + ", " + this.y + ")";
  }
}

function App() {
  const point = new Point(5, 12);

  return (
    <div style={{ display: "grid", gap: 6 }}>
      <p>point = {point.toString()}</p>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        This is functionally identical to the previous example — just far less boilerplate.
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "mixing-shorthand-and-regular",
      title: "Mixing shorthand and regular constructor parameters",
      summary: "id is assigned manually; name and price use the shorthand.",
      code: `class Product {
  // "id" is a plain typed property, set manually in the constructor body.
  id: string;

  // "name" and "price" use the shorthand — declared and assigned directly as parameters.
  constructor(id: string, public name: string, public price: number) {
    this.id = id;
  }

  describe(): string {
    return this.name + " ($" + this.price.toFixed(2) + ") — id: " + this.id;
  }
}

function App() {
  const item = new Product("sku-001", "Mechanical Keyboard", 89.99);

  return (
    <div style={{ display: "grid", gap: 6 }}>
      <p>{item.describe()}</p>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        Shorthand and regular parameters can be freely mixed in the same constructor.
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "independent-instances",
      title: "Independent instances with a default constructor value",
      summary: "Each new Counter(...) call produces its own separate state.",
      code: `class Counter {
  constructor(public label: string, public count: number = 0) {}

  increment(): void {
    this.count += 1;
  }
}

function App() {
  const clicks = new Counter("Clicks");
  const views = new Counter("Views", 100);

  clicks.increment();
  clicks.increment();
  views.increment();

  return (
    <div style={{ display: "grid", gap: 6 }}>
      <p>{clicks.label}: {clicks.count}</p>
      <p>{views.label}: {views.count}</p>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        Each "new Counter(...)" call produces a fully independent instance — try "new Counter(5)" in the editor, TypeScript rejects it since "label" must be a string.
      </p>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
