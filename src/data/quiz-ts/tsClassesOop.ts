import type { QuizQuestion } from "../../types/quiz";

export const tsClassesOopQuestions: QuizQuestion[] = [
  {
    id: "ts-classes-oop-1",
    question:
      "Is the following a valid TypeScript class with typed properties? 'class User { name: string; age: number; constructor(name: string, age: number) { this.name = name; this.age = age; } }'",
    type: "single",
    options: [
      "Yes — 'name' and 'age' are declared with explicit types as class fields above the constructor, and the constructor assigns values matching those declared types",
      "No — properties must be declared inside the constructor's parameter list, never as separate class fields",
      "No — TypeScript classes cannot have typed properties, only typed methods",
      "No — 'this.name' can only be used inside a method that is itself named 'name'",
    ],
    correctIndexes: [0],
    explanation:
      "TypeScript classes can declare typed fields directly in the class body (like 'name: string;'), separate from the constructor, and the constructor is free to assign matching values to 'this', with the added benefit that mismatched types are caught at compile time.",
  },
  {
    id: "ts-classes-oop-2",
    question:
      "Under TypeScript's strict mode, why does 'class User { name: string; }' (no constructor, no initializer) produce a compile error?",
    type: "single",
    options: [
      "Strict property initialization requires every declared, non-optional property to definitely be assigned a value — via a default at declaration, an assignment in the constructor, or opting out with '?' or '!' — since otherwise 'name' could be accessed as 'string' while actually being 'undefined'",
      "TypeScript classes are not allowed to declare more than one property",
      "The property name 'name' is a reserved word that cannot be used as a class field",
      "This code compiles without error, since class fields are always optional by default",
    ],
    correctIndexes: [0],
    explanation:
      "With strict property initialization enabled, TypeScript ensures every non-optional property is definitely assigned before the constructor finishes, preventing a property typed 'string' from silently being 'undefined' at runtime; a default value, a constructor assignment, marking it optional with '?', or the definite assignment assertion '!' all resolve the error.",
  },
  {
    id: "ts-classes-oop-3",
    question:
      "What does the following constructor parameter property shorthand accomplish? 'class User { constructor(public name: string, private age: number) {} }'",
    type: "single",
    options: [
      "It both declares 'name' and 'age' as class properties and assigns the constructor arguments to them, all in one step, without separate field declarations or 'this.name = name;' style assignments",
      "It only creates local variables inside the constructor that disappear once the constructor finishes running",
      "It makes 'name' and 'age' static properties shared across every instance of 'User'",
      "It is purely a documentation style with no effect on the compiled class",
    ],
    correctIndexes: [0],
    explanation:
      "Adding an access modifier ('public', 'private', or 'protected') directly to a constructor parameter is shorthand that both declares a class property of that name and type, and assigns the passed-in argument to it, eliminating the need to write the field declaration and the 'this.x = x;' assignment separately.",
  },
  {
    id: "ts-classes-oop-4",
    question:
      "Which pair of class definitions are functionally equivalent?",
    type: "single",
    options: [
      "'class Point { constructor(public x: number) {} }' and 'class Point { x: number; constructor(x: number) { this.x = x; } }'",
      "'class Point { constructor(public x: number) {} }' and 'class Point { constructor(x: number) {} }' with no other code",
      "'class Point { constructor(public x: number) {} }' and 'class Point { static x: number; }'",
      "'class Point { constructor(public x: number) {} }' and 'class Point {}', since the parameter is discarded once the constructor finishes",
    ],
    correctIndexes: [0],
    explanation:
      "The parameter property shorthand 'constructor(public x: number) {}' is exactly equivalent to declaring a field 'x: number;' separately and assigning it with 'this.x = x;' inside the constructor body — it's a more concise way to write the same result, not a different behavior.",
  },
  {
    id: "ts-classes-oop-5",
    question:
      "In 'class Account { balance: number = 0; }', with no access modifier written before 'balance', what visibility does the property have?",
    type: "single",
    options: [
      "'public' — TypeScript treats class members as public by default when no access modifier is specified, so 'balance' can be read and written from anywhere the instance is accessible",
      "'private' — omitting a modifier is treated the same as writing 'private'",
      "'protected' — omitting a modifier defaults to protected visibility",
      "It has no visibility at all and cannot even be accessed from within the class itself",
    ],
    correctIndexes: [0],
    explanation:
      "Unlike some other object-oriented languages, TypeScript defaults every class member to 'public' unless 'private' or 'protected' is explicitly written, so 'balance' here can be read and written from outside the class, e.g. via 'someAccount.balance'.",
  },
  {
    id: "ts-classes-oop-6",
    question:
      "Given 'class Account { private balance: number = 0; } const acc = new Account();', why does 'acc.balance' fail to compile when accessed outside the class?",
    type: "single",
    options: [
      "'private' restricts access to only within the declaring class's own methods and constructor; outside code, even in the same file, cannot read or write the property directly",
      "'private' properties do not actually exist and are removed entirely from the compiled JavaScript object",
      "'balance' was never actually assigned a value, so accessing it fails regardless of the access modifier",
      "It doesn't fail; 'private' in TypeScript only affects documentation and has no enforcement at all",
    ],
    correctIndexes: [0],
    explanation:
      "A 'private' member is only usable inside the body of the class where it's declared — not from outside code, and not even from subclasses; TypeScript's compiler flags any outside access as an error, though the property still exists on the compiled JavaScript object at runtime, since 'private' here is a compile-time-only restriction (unlike the newer '#' private fields).",
  },
  {
    id: "ts-classes-oop-7",
    question:
      "Given 'class Animal { protected sound: string = \"...\"; } class Dog extends Animal { bark() { return this.sound; } }', why does 'bark()' compile successfully, while 'new Dog().sound' from outside both classes does not?",
    type: "single",
    options: [
      "'protected' allows access from within the declaring class and any of its subclasses, but still blocks access from outside code that isn't part of that class hierarchy",
      "'protected' behaves identically to 'public' inside subclasses, but identically to 'private' everywhere else, including inside the declaring class itself",
      "'sound' is actually a static property, so only the class itself, never an instance, can read it",
      "It's a coincidence; 'protected' and 'private' have no real difference in TypeScript",
    ],
    correctIndexes: [0],
    explanation:
      "'protected' sits between 'public' and 'private': like 'private', it blocks access from unrelated outside code, but unlike 'private', it stays visible inside subclasses, which is why Dog's 'bark()' method can read 'this.sound' while external code accessing 'someDog.sound' cannot.",
  },
  {
    id: "ts-classes-oop-8",
    question:
      "Which of the following statements about TypeScript's 'public', 'private', and 'protected' access modifiers are true?",
    type: "multi",
    options: [
      "A member with no access modifier is treated as 'public' by default",
      "A 'private' member can be accessed from within the declaring class's own methods, but not from a subclass",
      "A 'protected' member can be accessed from within the declaring class and from its subclasses, but not from unrelated outside code",
      "'private' and 'protected' both allow unrestricted access from anywhere the object itself is accessible",
    ],
    correctIndexes: [0, 1, 2],
    explanation:
      "TypeScript defaults members to public, restricts private members to the declaring class alone (not even subclasses), and allows protected members to be used by the class and its subclasses while still blocking unrelated external code; the last statement is false, since it describes 'public' behavior rather than 'private' or 'protected'.",
  },
  {
    id: "ts-classes-oop-9",
    question:
      "Which of the following statements about 'readonly' class properties, such as 'class Point { readonly id: string; constructor(id: string) { this.id = id; } }', are true?",
    type: "multi",
    options: [
      "A 'readonly' property can be assigned a value when declared or inside the constructor, but not reassigned afterward",
      "'readonly' is orthogonal to 'public'/'private'/'protected' — a property can be declared, for example, as 'public readonly' or 'private readonly' at the same time",
      "Attempting to write 'somePoint.id = \"new-id\";' from outside the class, after construction, is a compile-time error",
      "'readonly' prevents the property from ever being read from outside the class, similar to 'private'",
    ],
    correctIndexes: [0, 1, 2],
    explanation:
      "'readonly' only controls whether a property's value can change after its initial assignment (allowed at declaration or in the constructor, blocked afterward); it says nothing about visibility, so it freely combines with 'public', 'private', or 'protected'. It does not restrict reading the property from outside the class — that is the job of the access modifiers, not 'readonly'.",
  },
  {
    id: "ts-classes-oop-10",
    question:
      "What do getters and setters, like 'get fullName() { return this.first + \" \" + this.last; }', provide that a plain method wouldn't?",
    type: "single",
    options: [
      "They let a computed value be accessed using ordinary property syntax, like 'user.fullName', while custom logic still runs behind the scenes each time it's read (or written, for a setter)",
      "They make the property faster to compute than a regular method call would be",
      "They are only usable inside abstract classes, never in ordinary classes",
      "They remove the need for the class to have any other properties at all",
    ],
    correctIndexes: [0],
    explanation:
      "A getter (and its counterpart, a setter) lets external code interact with what looks like a plain property — no parentheses needed — while the class runs arbitrary logic behind that access, such as combining other fields or validating a new value before storing it.",
  },
  {
    id: "ts-classes-oop-11",
    question:
      "Given a class with 'get fullName() { return this.first + \" \" + this.last; }', why does 'user.fullName()' throw an error, while 'user.fullName' works correctly?",
    type: "single",
    options: [
      "A getter is accessed like a plain property, without parentheses; writing 'fullName()' tries to call the returned string as if it were a function, which fails",
      "Getters can only be invoked using the 'call()' method, never accessed directly",
      "'fullName' is a static member, so it must be accessed through the class name instead of an instance",
      "It's purely a typo issue; both forms are actually valid and equivalent ways to use a getter",
    ],
    correctIndexes: [0],
    explanation:
      "Even though a getter is defined with function-like syntax in the class body, consumers access it exactly like a regular property, with no call parentheses; adding '()' after it treats whatever value the getter returns (a string, here) as a callable function, which throws a TypeError at runtime.",
  },
  {
    id: "ts-classes-oop-12",
    question:
      "Why can't the following be instantiated directly? 'abstract class Shape { abstract area(): number; } const s = new Shape();'",
    type: "single",
    options: [
      "An abstract class exists only to be extended; it can define shared structure and even concrete methods, but TypeScript forbids creating an instance of the abstract class itself with 'new'",
      "'abstract' is only a naming convention with no actual compiler enforcement",
      "Abstract classes can be instantiated normally; the error here is unrelated to the 'abstract' keyword",
      "Only interfaces can be marked abstract; classes cannot use the 'abstract' keyword at all",
    ],
    correctIndexes: [0],
    explanation:
      "The 'abstract' keyword marks a class as a base meant only to be extended by subclasses; TypeScript's compiler specifically rejects 'new Shape()' on an abstract class, even though the class can otherwise contain regular properties, concrete methods, and a constructor.",
  },
  {
    id: "ts-classes-oop-13",
    question:
      "Given 'abstract class Shape { abstract area(): number; } class Circle extends Shape { }' (Circle provides no 'area' method), what happens?",
    type: "single",
    options: [
      "TypeScript reports a compile error on 'Circle', because a non-abstract subclass must provide a concrete implementation for every abstract method it inherits",
      "'Circle' compiles fine, and calling 'area()' on a Circle instance simply does nothing at runtime",
      "'area' automatically defaults to returning 0 for any subclass that doesn't define it",
      "'Circle' is automatically treated as abstract itself, with no error reported",
    ],
    correctIndexes: [0],
    explanation:
      "An abstract method declares a signature without a body, and every concrete (non-abstract) subclass is required to supply its own implementation; if 'Circle' doesn't define 'area()', TypeScript flags it as an error rather than silently allowing an incomplete class.",
  },
  {
    id: "ts-classes-oop-14",
    question:
      "Which of the following statements correctly distinguish an abstract class from an interface in TypeScript?",
    type: "multi",
    options: [
      "An abstract class can provide concrete (fully implemented) methods and shared state that subclasses inherit, while an interface can only describe shapes, never provide runtime implementation",
      "Both an abstract class and an interface can declare methods that implementing or extending classes are required to define themselves",
      "A class can extend only one abstract class, but can implement multiple interfaces at once",
      "An abstract class can be instantiated directly with 'new', just like an interface can",
    ],
    correctIndexes: [0, 1, 2],
    explanation:
      "Abstract classes support shared, inheritable implementation (fields with values, concrete methods) alongside abstract method signatures that subclasses must fill in, while interfaces are purely structural contracts with no implementation at all. Both can force required methods on their consumers, and TypeScript allows single class inheritance but multiple interface implementation. Neither can be instantiated directly — abstract classes are explicitly blocked from 'new', and interfaces don't exist at runtime to instantiate.",
  },
  {
    id: "ts-classes-oop-15",
    question:
      "What is the key difference between 'class Duck implements Flyable { ... }' and 'class Duck extends Bird { ... }'?",
    type: "single",
    options: [
      "'implements' only requires 'Duck' to satisfy the structural shape described by the 'Flyable' interface (providing its own implementations of everything), while 'extends' inherits actual implementation and state from 'Bird', which 'Duck' can reuse or override",
      "'implements' and 'extends' are two different keywords for the exact same behavior in TypeScript, interchangeable in every situation",
      "'implements' inherits real code from 'Flyable', while 'extends' only checks that the shape matches, without inheriting anything",
      "'implements' can only be used together with abstract classes, never with interfaces",
    ],
    correctIndexes: [0],
    explanation:
      "'extends' is used for class inheritance, giving the subclass real, reusable implementation and state from the base class (plus the ability to override it); 'implements' is used with interfaces (or type shapes) purely to assert that the class provides everything the interface requires, without inheriting any actual code from it.",
  },
  {
    id: "ts-classes-oop-16",
    question:
      "Is the following valid TypeScript? 'class Duck extends Bird implements Flyable, Swimmable { ... }'",
    type: "single",
    options: [
      "Yes — a class can extend only one base class, but it can implement any number of interfaces at the same time",
      "No — a class can never combine 'extends' and 'implements' in the same declaration",
      "No — a class can implement at most one interface, just like it can extend at most one class",
      "Yes — but only if 'Flyable' and 'Swimmable' are also both abstract classes, not interfaces",
    ],
    correctIndexes: [0],
    explanation:
      "TypeScript classes support single inheritance (one 'extends' target) but allow implementing multiple interfaces at once, separated by commas after 'implements', since satisfying multiple structural contracts doesn't run into the ambiguity problems that inheriting implementation from multiple base classes would.",
  },
  {
    id: "ts-classes-oop-17",
    question:
      "In 'class Counter { static count = 0; increment() { Counter.count++; } }', what does the 'static' keyword mean for 'count'?",
    type: "single",
    options: [
      "'count' belongs to the 'Counter' class itself, shared across all instances, rather than being a separate property on each individual instance; it's accessed as 'Counter.count', not 'someInstance.count'",
      "'count' becomes a local variable inside every method, reset to 0 each time a method runs",
      "'static' makes 'count' immutable, identical in effect to 'readonly'",
      "Every new 'Counter' instance automatically gets its own independent copy of 'count'",
    ],
    correctIndexes: [0],
    explanation:
      "A 'static' member lives on the class itself rather than on individual instances, so all instances share the exact same value, and it must be accessed through the class name (like 'Counter.count'); instance methods can still reach it, as shown here, by referring to the class name explicitly.",
  },
  {
    id: "ts-classes-oop-18",
    question:
      "Given 'class Animal { move() { return \"moves\"; } } class Bird extends Animal { move() { return super.move() + \" by flying\"; } }', which statements are true?",
    type: "multi",
    options: [
      "In a subclass constructor, 'super(...)' must be called before 'this' can be used, if the subclass defines its own constructor",
      "'Bird' overrides 'move()' by defining a method with the same name, replacing what callers see when they invoke it on a Bird instance",
      "'super.move()' inside the overriding method calls Animal's original implementation, letting Bird build on top of it rather than fully replacing it",
      "Once a subclass overrides a method, the base class's original version is deleted and can never be invoked again by any code",
    ],
    correctIndexes: [0, 1, 2],
    explanation:
      "When a subclass defines its own constructor, both JavaScript and TypeScript require calling 'super(...)' before accessing 'this', since the base class handles initial setup; overriding replaces the method subclasses see by default, but the base implementation still exists and remains callable via 'super.methodName()', exactly as 'Bird' does here to extend rather than discard Animal's behavior.",
  },
];
