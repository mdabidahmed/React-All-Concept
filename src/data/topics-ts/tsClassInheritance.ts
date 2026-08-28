import type { Topic } from "../../types";

export const tsClassInheritanceTopic: Topic = {
  id: "ts-class-inheritance",
  title: "TypeScript Class Inheritance",
  category: "Classes & OOP",
  shortExplanation: `\`extends\` lets one class inherit the properties and methods of another, building a more specific class on top of a shared base — the subclass's constructor must call \`super(...)\` before touching \`this\`, and any method it redefines can optionally still call the base version via \`super.method()\`.

- \`class Dog extends Animal { ... }\` — Dog inherits everything Animal defines, and can add more
- \`constructor(name: string) { super(name); }\` — \`super(...)\` runs the base class's constructor first
- Overriding a method can either fully replace the base version, or call \`super.method()\` inside the override to extend it rather than replace it entirely`,
  longExplanation: `**Inheritance** lets one class be defined in terms of another: \`class Dog extends Animal { ... }\` means every \`Dog\` automatically has everything an \`Animal\` has — its properties, its methods — plus whatever \`Dog\` adds or changes on top. This builds a family of related classes without repeating the shared parts in each one.

- The syntax is \`class Subclass extends BaseClass { ... }\`. The subclass immediately inherits every property and method the base class defines, without rewriting any of them — a \`Dog\` instance can call any method \`Animal\` defines, even if \`Dog\` itself never mentions that method at all.
- If the subclass defines its **own constructor**, that constructor must call \`super(...)\` — invoking the base class's constructor — before it can access \`this\` anywhere in its body. \`super(...)\` takes whatever arguments the base class's constructor expects, and is responsible for actually initializing the properties the base class declares; skipping it (when the subclass has its own constructor) is a compile-time error, not a runtime surprise.
- A subclass without its own constructor at all **automatically inherits** the base class's constructor unchanged — no \`super(...)\` call needs to be written by hand in that case, since there's no subclass constructor to write one inside.
- **Overriding a method** means the subclass declares a method with the exact same name and a compatible signature as one already defined on the base class — calling that method on a subclass instance runs the subclass's version instead of the base class's. This is how a shared operation (like \`describe()\` or \`speak()\`) can behave differently depending on the specific subclass involved, while still being called the exact same way from outside.
- Inside an overriding method, \`super.methodName(...)\` calls the **base class's original version** of that same method. This lets an override *extend* the base behavior — running the shared logic first (or last), then adding subclass-specific behavior around it — rather than needing to fully duplicate what the base version already did. An override that never calls \`super.methodName(...)\` at all simply replaces the base behavior outright.
- TypeScript enforces that an overriding method's signature stays **compatible** with the base class's version — a subclass cannot narrow a parameter's type in a way that would break substitutability, though it can typically accept a wider parameter type or return a narrower (more specific) type. This keeps a rule known as the Liskov Substitution Principle intact: anywhere a base class instance is expected, a subclass instance must be safely usable as a drop-in replacement.
- **Typing the difference between a base reference and a subclass instance** matters in practice: a variable declared \`let animal: Animal = new Dog(...);\` is typed as \`Animal\`, so only members that \`Animal\` itself declares are accessible through that variable — even though the actual object at runtime is genuinely a \`Dog\` with possibly more members. To use \`Dog\`-specific members through an \`Animal\`-typed variable, the code needs to narrow it first, typically with an \`instanceof\` check: \`if (animal instanceof Dog) { animal.fetch(); }\`.
- An array or parameter typed as the **base class** can hold a mix of different subclass instances simultaneously — \`const animals: Animal[] = [new Dog(...), new Cat(...)];\` — and calling a shared (possibly overridden) method on each runs whichever version is appropriate for that specific instance's actual class. This is polymorphism achieved through inheritance, distinct from the polymorphism an abstract class or an interface enables, though all three ultimately rely on the same underlying idea: code written once against a shared type works correctly across every more specific variant of it.

Inheritance via \`extends\` is the tool to reach for specifically when a subclass genuinely *is a more specific kind of* the base class, and stands to inherit real, working implementation from it — as opposed to \`implements\`, which commits a class to a contract with no implementation attached at all.`,
  examples: [
    {
      id: "basic-extends-and-super",
      title: "extends with super() in the subclass constructor",
      summary: "Dog's constructor must call super(name) before it can use this — that's what actually sets up name.",
      code: `class Animal {
  constructor(public name: string) {}

  describe(): string {
    return this.name + " is an animal.";
  }
}

class Dog extends Animal {
  constructor(name: string, public breed: string) {
    super(name); // must run before "this" can be used below
  }

  bark(): string {
    return this.name + " says Woof!";
  }
}

function App() {
  const dog = new Dog("Rex", "Labrador");

  return (
    <div style={{ display: "grid", gap: 6 }}>
      <p>{dog.describe()}</p>
      <p>{dog.bark()}</p>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        "describe()" was never redefined on Dog — it's inherited directly from Animal.
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "overriding-and-calling-super",
      title: "Overriding a method and extending it with super.method()",
      summary: "Dog's describe() calls Animal's original version first, then adds more to it.",
      code: `class Animal {
  constructor(public name: string) {}

  describe(): string {
    return this.name + " is an animal.";
  }
}

class Dog extends Animal {
  breed: string;

  constructor(name: string, breed: string) {
    super(name);
    this.breed = breed;
  }

  // Overrides Animal's describe(), but extends it rather than fully replacing it.
  describe(): string {
    return super.describe() + " Specifically, a " + this.breed + ".";
  }
}

function App() {
  const dog = new Dog("Rex", "Labrador");

  return (
    <div style={{ display: "grid", gap: 6 }}>
      <p>{dog.describe()}</p>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        "super.describe()" runs Animal's original implementation before Dog appends its own detail.
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "override-without-super",
      title: "An override that fully replaces the base behavior",
      summary: "Cat's speak() never calls super.speak() — it completely replaces Animal's generic version.",
      code: `class Animal {
  constructor(public name: string) {}

  speak(): string {
    return this.name + " makes a sound.";
  }
}

class Cat extends Animal {
  // No call to super.speak() — this fully replaces the base behavior instead of extending it.
  speak(): string {
    return this.name + " says Meow!";
  }
}

function App() {
  const cat = new Cat("Whiskers");

  return (
    <div style={{ display: "grid", gap: 6 }}>
      <p>{cat.speak()}</p>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        Cat's "speak()" completely overrides Animal's — Animal's generic version never runs at all here.
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "base-reference-vs-subclass-instance",
      title: "A base-class-typed reference holding a mix of subclass instances",
      summary: "animals: Animal[] holds Dog and Cat instances; instanceof narrows to reach subclass-specific members.",
      code: `class Animal {
  constructor(public name: string) {}

  speak(): string {
    return this.name + " makes a sound.";
  }
}

class Dog extends Animal {
  speak(): string {
    return this.name + " says Woof!";
  }
  fetch(): string {
    return this.name + " fetches the ball.";
  }
}

class Cat extends Animal {
  speak(): string {
    return this.name + " says Meow!";
  }
}

function App() {
  const animals: Animal[] = [new Dog("Rex"), new Cat("Whiskers")];

  return (
    <div style={{ display: "grid", gap: 6 }}>
      {animals.map((animal, index) => (
        <p key={index}>
          {animal.speak()}
          {animal instanceof Dog ? " (" + animal.fetch() + ")" : ""}
        </p>
      ))}
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        "animal.fetch()" is only reachable after narrowing with "instanceof Dog" — Animal itself has no "fetch" member.
      </p>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
