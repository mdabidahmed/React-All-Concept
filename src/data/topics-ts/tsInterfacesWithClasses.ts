import type { Topic } from "../../types";

export const tsInterfacesWithClassesTopic: Topic = {
  id: "ts-interfaces-with-classes",
  title: "TypeScript Classes Implementing Interfaces",
  category: "Classes & OOP",
  shortExplanation: `A class can commit to fulfilling an interface's shape with the \`implements\` keyword: \`class Circle implements Shape { ... }\`. TypeScript then checks, at compile time, that the class genuinely provides every member the interface requires.

- \`class Circle implements Shape { area() { ... } }\` — Circle must have everything Shape declares
- A class can implement **multiple** interfaces at once: \`class Duck implements Flyable, Swimmable { ... }\`
- \`implements\` is a contract a class fulfills (shape only); \`extends\` is inheritance from a base class (shape *and* shared implementation) — a class can \`extends\` one base class while \`implements\` several interfaces, all at the same time`,
  longExplanation: `An interface describes a shape, but on its own it produces nothing runnable — it's purely a compile-time description. The \`implements\` keyword is how a **class** formally commits to satisfying that shape, letting TypeScript verify the commitment is actually kept.

- The syntax is \`class ClassName implements InterfaceName { ... }\`. TypeScript then checks, member by member, that the class provides everything the interface requires — every property with a compatible type, every method with a compatible signature. Missing a required member, or implementing one with an incompatible type, is a compile-time error directly on the class declaration, not something that surfaces later when the class is actually used.
- Because TypeScript's typing is structural, a class doesn't strictly *need* \`implements\` to satisfy an interface's shape elsewhere in the code — an object matching the right shape is accepted regardless of how it was created. What \`implements\` adds is an explicit, checked **declaration of intent**: it tells TypeScript (and any future reader of the code) "this class is specifically designed to fulfill this contract," and gets the immediate, precise compile-time errors on the class itself the moment that promise isn't kept, rather than a possibly-confusing error somewhere far away where the class happens to be used.
- A class can implement **more than one interface simultaneously**, listed comma-separated: \`class Duck implements Flyable, Swimmable { ... }\`. It must then satisfy every member from every listed interface — a natural way to model a class that fulfills several independent, unrelated capabilities at once, each described by its own small, focused interface.
- \`implements\` only checks the **shape** — it copies no implementation whatsoever from the interface, because an interface has none to copy. Every single member declared by the interface must be given a real, working implementation directly in the class (or inherited from a base class it extends) — nothing is provided automatically.
- This is the essential contrast with **\`extends\`**, covered in its own topic: \`extends\` is inheritance from a real base *class*, which brings along genuine, runnable, shared implementation for free — every concrete method the base class defines is inherited and works immediately, with no need to rewrite it. \`implements\` is a contract with an interface, providing zero implementation — only a shape that must be fulfilled, entirely from scratch, by the implementing class itself.
- A single class can combine both at once: \`class Duck extends Animal implements Flyable, Swimmable { ... }\` extends exactly one base class (inheriting its real implementation) while implementing as many interfaces as needed (each just a shape to fulfill). TypeScript allows extending only one class — JavaScript classes don't support multiple inheritance — but places no such limit on the number of interfaces a class can implement, since an interface contributes no implementation that could conflict.
- A class implementing an interface can be used anywhere that interface is expected, exactly like any other object matching that shape: \`function makeItFly(flyer: Flyable): void\` happily accepts any class instance that implements \`Flyable\`, without needing to know or care about the object's concrete class at all — the same polymorphism enabled by abstract classes, achieved here purely through shape-matching rather than shared inheritance.

The practical guidance from \`extends\` vs. plain interfaces still applies here from the class's point of view: \`implements\` is the right tool when a class needs to guarantee it fulfills one or more independent contracts, especially several at once, without inheriting any shared runtime behavior along with them.`,
  examples: [
    {
      id: "basic-implements",
      title: "A class implementing a single interface",
      summary: "Circle commits to the Shape contract and must provide a working area() method.",
      code: `interface Shape {
  area(): number;
}

class Circle implements Shape {
  constructor(public radius: number) {}

  area(): number {
    return Math.PI * this.radius * this.radius;
  }
}

function App() {
  const circle = new Circle(5);

  return (
    <div style={{ display: "grid", gap: 6 }}>
      <p>Area: {circle.area().toFixed(2)}</p>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        Removing "area()" from Circle would be a compile-time error directly on the class declaration.
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "implementing-multiple-interfaces",
      title: "Implementing multiple interfaces at once",
      summary: "Duck must satisfy both Flyable and Swimmable's requirements simultaneously.",
      code: `interface Flyable {
  fly(): string;
}

interface Swimmable {
  swim(): string;
}

class Duck implements Flyable, Swimmable {
  fly(): string {
    return "The duck flaps its wings and takes off.";
  }

  swim(): string {
    return "The duck paddles across the pond.";
  }
}

function App() {
  const duck = new Duck();

  return (
    <div style={{ display: "grid", gap: 6 }}>
      <p>{duck.fly()}</p>
      <p>{duck.swim()}</p>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        Duck must implement every member of BOTH Flyable and Swimmable — missing either would fail to compile.
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "implements-vs-extends-together",
      title: "Combining extends (one base class) with implements (several interfaces)",
      summary: "Robot extends Machine for shared implementation, and implements Movable for an additional contract.",
      code: `interface Movable {
  move(distance: number): string;
}

class Machine {
  constructor(public name: string) {}

  powerOn(): string {
    return this.name + " powers on.";
  }
}

// "extends" brings real, inherited implementation from Machine (powerOn is inherited, not rewritten).
// "implements" adds a contract that Robot must fulfill itself — Movable provides no implementation at all.
class Robot extends Machine implements Movable {
  move(distance: number): string {
    return this.name + " moves " + distance + " meters.";
  }
}

function App() {
  const robot = new Robot("R2D2");

  return (
    <div style={{ display: "grid", gap: 6 }}>
      <p>{robot.powerOn()}</p>
      <p>{robot.move(10)}</p>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        "powerOn" came free from extending Machine; "move" had to be written because Movable is only a shape.
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "using-implementing-classes-polymorphically",
      title: "Accepting any class that implements an interface",
      summary: "makeItFly works with any Flyable, regardless of which concrete class actually implements it.",
      code: `interface Flyable {
  fly(): string;
}

class Duck implements Flyable {
  fly(): string {
    return "The duck flies low over the water.";
  }
}

class Airplane implements Flyable {
  fly(): string {
    return "The airplane climbs to cruising altitude.";
  }
}

function makeItFly(flyer: Flyable): string {
  return flyer.fly();
}

function App() {
  const flyers: Flyable[] = [new Duck(), new Airplane()];

  return (
    <div style={{ display: "grid", gap: 6 }}>
      {flyers.map((flyer, index) => (
        <p key={index}>{makeItFly(flyer)}</p>
      ))}
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        "makeItFly" only relies on the Flyable contract — it never needs to know the concrete class involved.
      </p>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
