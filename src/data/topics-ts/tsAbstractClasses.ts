import type { Topic } from "../../types";

export const tsAbstractClassesTopic: Topic = {
  id: "ts-abstract-classes",
  title: "TypeScript Abstract Classes",
  category: "Classes & OOP",
  shortExplanation: `An \`abstract class\` is a class that can **never be instantiated directly** — it exists purely to be extended. It can mix concrete, shared methods with \`abstract\` methods that have no body at all, forcing every subclass to supply its own implementation.

- \`abstract class Shape { abstract area(): number; }\` — \`new Shape()\` is a compile-time error
- \`class Circle extends Shape { area() { return Math.PI * this.radius ** 2; } }\` — a concrete subclass must implement every abstract member
- Unlike a plain interface, an abstract class can also hold **real, shared implementation** that every subclass inherits for free`,
  longExplanation: `A regular class provides a complete, ready-to-use blueprint — every method has a body, and \`new SomeClass()\` immediately produces a working instance. An **abstract class**, declared with the \`abstract\` keyword, is deliberately incomplete: it can define \`abstract\` methods that have no implementation at all, existing only as a signature that every subclass is required to fill in.

- The keyword goes directly before \`class\`: \`abstract class Shape { ... }\`. The defining consequence is that \`new Shape()\` becomes a compile-time error — an abstract class exists purely as a base to extend, never as something instantiated on its own.
- An **abstract method** is declared with the \`abstract\` keyword and a signature, but no body: \`abstract area(): number;\` — notice there are no curly braces at all, unlike a normal method. Any concrete (non-abstract) subclass that extends the abstract class is required to provide a real implementation for every abstract method it declares; leaving one out is a compile-time error on the subclass, not something discovered later at runtime.
- Alongside abstract methods, an abstract class can freely include **fully-implemented, concrete methods and properties** exactly like a normal class — a constructor, regular methods with real bodies, stored properties, even getters and setters. Every subclass inherits all of this shared implementation automatically, on top of whatever it's required to implement itself.
- This is the key practical difference from a plain **interface** (covered elsewhere): an interface can only describe a shape — it has zero ability to carry actual runtime behavior, since there's no such thing as a "body" for an interface's methods. An abstract class can do everything an interface does (define a contract subclasses must fulfill) *and* provide real, shared, inherited implementation for anything that's common across every subclass. A \`toString()\` implementation that every shape should share, or a constructor that validates a shared property, belongs naturally in an abstract base class; it has no equivalent in a plain interface at all.
- Choosing between the two comes down to that exact distinction: reach for a plain **interface** when only the *shape* needs to be guaranteed, and different implementing classes have nothing meaningfully shared to inherit — especially since a class can implement several unrelated interfaces at once, but can only extend one base class. Reach for an **abstract class** specifically when there's real shared logic that multiple subclasses should inherit for free, in addition to a contract they must each individually fulfill.
- A variable can be typed as the abstract class itself, even though it can never hold a direct instance of it — only instances of concrete subclasses: \`function totalArea(shapes: Shape[]): number\` accepts an array containing \`Circle\`s, \`Square\`s, or any other \`Shape\` subclass, mixed freely, and can call \`shape.area()\` on each without knowing or caring which concrete subclass it actually is. This is a common and powerful form of polymorphism — code written once against the abstract base works correctly no matter how many different concrete subclasses exist, including ones written later.
- Abstract classes, like regular classes, are enforced entirely at **compile time** by TypeScript specifically — the check that "you didn't implement this abstract method" or "you tried to instantiate an abstract class directly" never survives into the compiled JavaScript, where the concept of an abstract class doesn't natively exist. TypeScript models it faithfully during development; the emitted JavaScript is close to what a hand-written base class and subclasses would look like anyway.

An abstract class is the right tool exactly when a family of related classes shares enough real logic to be worth centralizing, while still requiring each individual member of that family to plug in its own specific behavior for one or more operations.`,
  examples: [
    {
      id: "basic-abstract-class",
      title: "An abstract class with one abstract method",
      summary: "Shape cannot be instantiated directly; Circle must implement area() to become concrete.",
      code: `abstract class Shape {
  abstract area(): number;

  describe(): string {
    // A concrete, shared method — every subclass gets this for free.
    return "This shape has an area of " + this.area().toFixed(2);
  }
}

class Circle extends Shape {
  constructor(public radius: number) {
    super();
  }

  area(): number {
    return Math.PI * this.radius * this.radius;
  }
}

function App() {
  // const shape = new Shape(); // Error: cannot create an instance of an abstract class.
  const circle = new Circle(4);

  return (
    <div style={{ display: "grid", gap: 6 }}>
      <p>{circle.describe()}</p>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        "describe()" is fully implemented on Shape itself and inherited by Circle with no extra work.
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "shared-implementation-and-abstract-method",
      title: "Mixing shared implementation with a required abstract method",
      summary: "Employee shares a real formatPay() method, but each subclass must define its own calculatePay().",
      code: `abstract class Employee {
  constructor(public name: string) {}

  abstract calculatePay(): number;

  formatPay(): string {
    return this.name + "'s pay: $" + this.calculatePay().toFixed(2);
  }
}

class SalariedEmployee extends Employee {
  constructor(name: string, private annualSalary: number) {
    super(name);
  }

  calculatePay(): number {
    return this.annualSalary / 12;
  }
}

class HourlyEmployee extends Employee {
  constructor(name: string, private hourlyRate: number, private hours: number) {
    super(name);
  }

  calculatePay(): number {
    return this.hourlyRate * this.hours;
  }
}

function App() {
  const employees: Employee[] = [
    new SalariedEmployee("Ada Lovelace", 96000),
    new HourlyEmployee("Grace Hopper", 45, 160),
  ];

  return (
    <div style={{ display: "grid", gap: 6 }}>
      {employees.map((employee) => (
        <p key={employee.name}>{employee.formatPay()}</p>
      ))}
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "missing-implementation-error",
      title: "A subclass that skips an abstract method fails to compile",
      summary: "Every concrete subclass must implement every abstract member — there is no partial opt-out.",
      code: `abstract class Vehicle {
  abstract topSpeed(): number;
}

// class BrokenCar extends Vehicle {
//   // Error: BrokenCar does not implement inherited abstract member "topSpeed" from Vehicle.
// }

class Car extends Vehicle {
  topSpeed(): number {
    return 220;
  }
}

function App() {
  const car = new Car();

  return (
    <div style={{ display: "grid", gap: 6 }}>
      <p>Top speed: {car.topSpeed()} km/h</p>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        Uncomment "BrokenCar" in the editor to see TypeScript reject a subclass that skips an abstract method.
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "polymorphism-with-abstract-base",
      title: "Treating multiple subclasses uniformly through the abstract base",
      summary: "totalArea() works on any mix of Shape subclasses, without knowing which concrete type each one is.",
      code: `abstract class Shape {
  abstract area(): number;
}

class Circle extends Shape {
  constructor(public radius: number) {
    super();
  }
  area(): number {
    return Math.PI * this.radius * this.radius;
  }
}

class Square extends Shape {
  constructor(public side: number) {
    super();
  }
  area(): number {
    return this.side * this.side;
  }
}

function totalArea(shapes: Shape[]): number {
  return shapes.reduce((sum, shape) => sum + shape.area(), 0);
}

function App() {
  const shapes: Shape[] = [new Circle(3), new Square(4), new Circle(2)];

  return (
    <div style={{ display: "grid", gap: 6 }}>
      <p>Total area: {totalArea(shapes).toFixed(2)}</p>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        "totalArea" never checks which concrete subclass each shape is — it only relies on the shared Shape contract.
      </p>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
