import type { Topic } from "../../types";

export const tsStaticMembersTopic: Topic = {
  id: "ts-static-members",
  title: "TypeScript Static Members",
  category: "Classes & OOP",
  shortExplanation: `A \`static\` property or method belongs to the **class itself**, not to any individual instance — there's exactly one copy, shared across every instance, accessed through the class name rather than through \`this\` on an object.

- \`static count = 0;\` — one shared counter, accessed as \`ClassName.count\`, not \`instance.count\`
- \`static create(...)\` — a factory method that builds and returns instances, callable without one already existing
- Instance methods can reach a static member via the class name (e.g. \`Counter.count\`); a static method has no \`this\` referring to any particular instance at all`,
  longExplanation: `Every regular property and method on a class belongs to a specific **instance** — \`this.name\` on one object is completely independent of \`this.name\` on another. A \`static\` member flips that: it belongs to the **class itself**, and there's exactly one shared copy of it no matter how many instances get created, or even if none have been created at all.

- The syntax is straightforward — prefix a property or method with \`static\`: \`static count = 0;\` or \`static create(): Widget { ... }\`. Everything else about the declaration (types, access modifiers, \`readonly\`) works exactly the same as it does for instance members.
- A static member is accessed through the **class name**, not through an instance: \`Counter.count\`, never \`someCounterInstance.count\`. Attempting to read a static member off an instance is a compile-time error — static members simply don't exist on instances at all, only on the class.
- Inside a static method, \`this\` refers to the class itself, not to any particular instance — there is no "current object" to speak of, since a static method can be called without any instance ever having been created. This means a static method cannot reach instance properties or call instance methods directly; it only has access to other static members.
- A classic, practical use case is a **shared counter** tracking how many instances of a class have ever been created: incrementing a \`static count\` inside the constructor means every single instantiation — regardless of which specific instance triggers it — updates the one shared value, which any code can then check via \`ClassName.count\` without needing a reference to any particular instance.
- Another very common use case is a **factory method** — a static method that constructs and returns an instance, often doing extra setup, validation, or providing a more descriptive alternative to calling \`new\` directly: \`static origin(): Point { return new Point(0, 0); }\` lets code write \`Point.origin()\` instead of \`new Point(0, 0)\`, which can read more clearly for common, named configurations.
- A static property also works well for a **shared constant or piece of configuration** that's genuinely the same across every instance and doesn't belong to any one of them specifically — a fixed conversion rate, a default configuration object, a cache shared by the whole class rather than duplicated per instance.
- Static members can have any access modifier too — \`private static\`, \`protected static\`, and \`public static\` (the default) all work exactly as expected, restricting *where* the static member can be accessed from, completely independent of the fact that it's static rather than per-instance.
- It's worth being precise about the mental model: an instance method genuinely can reach a static member (by referring to it through the class name, e.g. \`Counter.count\` from inside an instance method), since static members are still visible class-wide — but a static method cannot reach instance members, because a static method might run with zero instances in existence, so there's no guaranteed "current instance" for it to use.

Static members are the right tool any time something conceptually belongs to the *class as a whole* rather than to any one object built from it — tracking totals across every instance, offering alternative ways to construct instances, or holding configuration and constants that every instance should agree on without each one storing a separate redundant copy.`,
  examples: [
    {
      id: "static-instance-counter",
      title: "A static counter tracking every instance ever created",
      summary: "Widget.count increases with every new Widget(), shared across all instances.",
      code: `class Widget {
  static count = 0;

  constructor(public label: string) {
    Widget.count += 1; // reaching a static member through the class name, from inside the constructor
  }
}

function App() {
  new Widget("Button");
  new Widget("Slider");
  new Widget("Checkbox");

  return (
    <div style={{ display: "grid", gap: 6 }}>
      <p>Total widgets created: {Widget.count}</p>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        "Widget.count" is accessed through the class itself — there is exactly one shared copy, not one per instance.
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "static-factory-method",
      title: "A static factory method",
      summary: "Point.origin() builds a preset instance without calling new directly.",
      code: `class Point {
  constructor(public x: number, public y: number) {}

  static origin(): Point {
    return new Point(0, 0);
  }

  toString(): string {
    return "(" + this.x + ", " + this.y + ")";
  }
}

function App() {
  const start = Point.origin();
  const somewhere = new Point(4, 7);

  return (
    <div style={{ display: "grid", gap: 6 }}>
      <p>start = {start.toString()}</p>
      <p>somewhere = {somewhere.toString()}</p>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        "Point.origin()" reads more clearly than "new Point(0, 0)" for a common, named configuration.
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "static-shared-configuration",
      title: "A static property holding shared configuration",
      summary: "TAX_RATE is one value shared by every Invoice instance, not duplicated per object.",
      code: `class Invoice {
  static TAX_RATE = 0.08;

  constructor(public amount: number) {}

  totalWithTax(): number {
    // Reaching the static constant through the class name from an instance method.
    return this.amount * (1 + Invoice.TAX_RATE);
  }
}

function App() {
  const invoiceA = new Invoice(100);
  const invoiceB = new Invoice(250);

  return (
    <div style={{ display: "grid", gap: 6 }}>
      <p>Invoice A total: \${invoiceA.totalWithTax().toFixed(2)}</p>
      <p>Invoice B total: \${invoiceB.totalWithTax().toFixed(2)}</p>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        Every invoice shares the exact same "Invoice.TAX_RATE" — changing it once would affect every instance's calculation.
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "static-vs-instance-access",
      title: "Static members are not visible on instances",
      summary: "Accessing a static member through an instance instead of the class name is a compile-time error.",
      code: `class Counter {
  static total = 0;

  increment(): void {
    Counter.total += 1; // valid: reaching the static member through the class name
  }
}

function App() {
  const a = new Counter();
  const b = new Counter();
  a.increment();
  b.increment();
  b.increment();

  // a.total; // Error: "total" is static and does not exist on an instance of Counter.

  return (
    <div style={{ display: "grid", gap: 6 }}>
      <p>Counter.total: {Counter.total}</p>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        Both "a" and "b" incremented the SAME shared static value — accessed only via "Counter.total", never "a.total".
      </p>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
