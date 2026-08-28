import type { Topic } from "../../types";

export const tsGettersSettersTopic: Topic = {
  id: "ts-getters-setters",
  title: "TypeScript Getters and Setters",
  category: "Classes & OOP",
  shortExplanation: `\`get\` and \`set\` accessors let a class run real logic — validation, computed values, side effects — behind what still *looks* like a plain property at the call site: \`obj.prop\`, not \`obj.getProp()\`.

- \`get fullName() { return this.first + " " + this.last; }\` — read as \`person.fullName\`, computed fresh every access
- \`set age(value: number) { if (value < 0) throw new Error(...); this.storedAge = value; }\` — written as \`person.age = 30\`, validated on the way in
- A \`get\` with no matching \`set\` produces a property that can be **read but never assigned** — a computed, effectively read-only value`,
  longExplanation: `A plain class property is just a labeled slot for a value — reading it returns exactly what was last stored, and writing it stores exactly what was given, with no logic in between. **Accessors** (\`get\` and \`set\`) replace that direct slot with a pair of methods that *look* like a property from the outside, while running real code on every read or write.

- A **getter** is declared with the \`get\` keyword followed by a property-like name and a method body that returns a value: \`get fullName(): string { return this.first + " " + this.last; }\`. Calling code accesses it exactly like a plain property — \`person.fullName\`, no parentheses — even though a full method call happens behind the scenes, recomputing the result fresh every single time it's read.
- A **setter** is declared with \`set\`, taking exactly one parameter representing the incoming value: \`set age(value: number) { ... }\`. Calling code assigns to it exactly like a plain property — \`person.age = 30\` — which actually invokes the setter method with \`30\` as its argument.
- The main reason to reach for an accessor instead of a plain property is to insert **validation** or **computed logic** without changing how the property is used at the call site. A setter can check that an incoming value makes sense before storing it — rejecting a negative age, an empty name, or an out-of-range value — and throw or otherwise handle an invalid one, all while the rest of the codebase keeps writing the ordinary-looking \`person.age = value\`.
- A getter is a natural fit for a **computed** value that's derived from other properties rather than stored directly — a \`fullName\` built from \`first\` and \`last\`, a \`total\` built from an array of line items, an \`isValid\` built from checking several fields at once. Recomputing it in a getter means it's always up to date with whatever the underlying properties currently are, with no risk of it silently going stale the way a manually-stored duplicate value could.
- A common pattern pairs a getter and setter with a separate, differently-named **backing field** that actually stores the value — often prefixed with an underscore by convention, like \`private _age: number;\`, with \`get age()\` returning it and \`set age(value)\` validating and storing into it. The backing field is what actually holds the data; the accessor pair is the *controlled doorway* to it.
- A getter declared **without** a matching setter produces a property that can be read freely but never assigned — attempting \`person.fullName = "New Name";\` against a getter-only accessor is a compile-time error. This is a clean way to expose a genuinely computed, read-only value without reaching for the separate \`readonly\` keyword, which only applies to plain stored properties, not accessors.
- It's also possible to declare a **setter without a matching getter**, producing a write-only property — assignable, but not directly readable back. This is less common in practice, but valid, and occasionally useful for a property that's meant purely to trigger a side effect on assignment.
- From the outside, a class exposing accessors is indistinguishable in *syntax* from one exposing plain properties — \`person.fullName\` and \`person.age = 30\` look identical either way. This is exactly the point: accessors let a class change its internal implementation, add validation, or start computing a value on demand, all without breaking or even touching any of the code that already reads or writes that property.

Accessors are one of the main tools for keeping a class's public-facing API simple and property-like, while still retaining full control over what happens on every single read and write internally — striking a balance between the convenience of direct property access and the safety of dedicated methods.`,
  examples: [
    {
      id: "computed-getter",
      title: "A getter computing a value from other properties",
      summary: "fullName is never stored directly — it's recomputed from first and last on every access.",
      code: `class Person {
  constructor(public first: string, public last: string) {}

  get fullName(): string {
    return this.first + " " + this.last;
  }
}

function App() {
  const person = new Person("Ada", "Lovelace");
  person.last = "King"; // fullName will reflect this immediately, with no manual sync needed

  return (
    <div style={{ display: "grid", gap: 6 }}>
      <p>Full name: {person.fullName}</p>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        "fullName" is accessed like a plain property ("person.fullName", no parentheses) but recomputed every time.
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "setter-with-validation",
      title: "A setter validating an incoming value",
      summary: "Assigning a negative age throws — the same property-like syntax now runs real validation.",
      code: `class Person {
  private _age = 0;

  get age(): number {
    return this._age;
  }

  set age(value: number) {
    if (value < 0) {
      throw new Error("Age cannot be negative");
    }
    this._age = value;
  }
}

function App() {
  const person = new Person();
  person.age = 28; // looks like a plain assignment, but runs through the setter's validation

  let errorMessage = "";
  try {
    person.age = -5;
  } catch (err) {
    errorMessage = (err as Error).message;
  }

  return (
    <div style={{ display: "grid", gap: 6 }}>
      <p>Current age: {person.age}</p>
      <p>Rejected assignment: {errorMessage}</p>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        "person.age = -5" still looks like plain property assignment, but the setter caught the invalid value.
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "backing-field-pattern",
      title: "The get/set + backing field pattern",
      summary: "_celsius stores the actual data; the accessors are the controlled doorway to it.",
      code: `class Temperature {
  private _celsius: number;

  constructor(celsius: number) {
    this._celsius = celsius;
  }

  get celsius(): number {
    return this._celsius;
  }

  set celsius(value: number) {
    this._celsius = value;
  }

  get fahrenheit(): number {
    return this._celsius * 9 / 5 + 32;
  }

  set fahrenheit(value: number) {
    this._celsius = (value - 32) * 5 / 9;
  }
}

function App() {
  const temp = new Temperature(20);
  temp.fahrenheit = 100; // writing through one accessor updates the shared backing field

  return (
    <div style={{ display: "grid", gap: 6 }}>
      <p>Celsius: {temp.celsius.toFixed(1)}</p>
      <p>Fahrenheit: {temp.fahrenheit.toFixed(1)}</p>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        Both accessor pairs read from and write to the same "_celsius" backing field, kept in sync automatically.
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "getter-only-read-only-property",
      title: "A getter with no setter: read-only from the outside",
      summary: "Assigning to a getter-only accessor is a compile-time error — it can only ever be read.",
      code: `class Circle {
  constructor(public radius: number) {}

  get area(): number {
    return Math.PI * this.radius * this.radius;
  }
}

function App() {
  const circle = new Circle(5);

  // circle.area = 100; // Error: "area" has only a getter — it cannot be assigned.

  return (
    <div style={{ display: "grid", gap: 6 }}>
      <p>Radius: {circle.radius}</p>
      <p>Area: {circle.area.toFixed(2)}</p>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        Without a matching setter, "area" behaves like a computed read-only property.
      </p>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
