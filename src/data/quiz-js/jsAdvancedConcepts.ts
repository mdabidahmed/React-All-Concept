import type { QuizQuestion } from "../../types/quiz";

export const jsAdvancedConceptsQuestions: QuizQuestion[] = [
  {
    id: "js-advanced-concepts-1",
    question:
      "const person = { name: 'Mia', greet() { console.log(this.name); } }; const fn = person.greet; person.greet(); fn(); What determines the value of 'this' in each call, and what happens?",
    type: "single",
    options: [
      "'this' is set by how a function is called, not where it's defined; person.greet() logs 'Mia', but calling the extracted fn() alone loses that context, so this.name is undefined (or throws in strict mode)",
      "'this' always refers to the object where the method was originally defined, so both calls log 'Mia'",
      "'this' is determined at the time the function is declared, so extracting greet into fn preserves the binding to person",
      "Both calls throw a SyntaxError, because a method cannot be assigned to a plain variable",
    ],
    correctIndexes: [0],
    explanation:
      "In a regular function, 'this' is bound based on how the function is invoked: calling it as person.greet() binds this to person, but calling the extracted reference fn() as a plain function loses that binding entirely.",
  },
  {
    id: "js-advanced-concepts-2",
    question:
      "const timer = { seconds: 0, start() { setInterval(() => { this.seconds++; }, 1000); } }; timer.start(); Why does the arrow function correctly update timer.seconds, when a regular function passed to setInterval would not?",
    type: "single",
    options: [
      "Arrow functions don't have their own 'this'; they capture 'this' lexically from the surrounding start() method, where 'this' is timer",
      "Arrow functions automatically bind 'this' to the global object, which happens to equal timer in this case",
      "setInterval() always passes the enclosing object as 'this' to any callback, arrow or not",
      "Arrow functions convert 'this' into a static property fixed at the time the file is loaded",
    ],
    correctIndexes: [0],
    explanation:
      "Arrow functions have no 'this' binding of their own; they look up 'this' in the enclosing lexical scope. Because the arrow function is defined inside start(), where this is timer, it keeps referring to timer even inside the later-running setInterval callback.",
  },
  {
    id: "js-advanced-concepts-3",
    question:
      "class Button { constructor(label) { this.label = label; } handleClick() { console.log(this.label); } } const btn = new Button('Save'); element.addEventListener('click', btn.handleClick); When the button is clicked, what commonly goes wrong?",
    type: "single",
    options: [
      "'this' inside handleClick no longer refers to btn, so this.label is undefined, because the method was passed as a bare reference and gets invoked as a plain function call",
      "Nothing goes wrong; class methods automatically stay bound to their instance no matter how they're called",
      "The click handler throws a SyntaxError before the page even loads",
      "'this' becomes the Button class itself rather than the btn instance",
    ],
    correctIndexes: [0],
    explanation:
      "Passing btn.handleClick as a callback detaches it from btn; when the browser later invokes it, 'this' is determined by the call, not by where the method came from. This is commonly fixed with an arrow function wrapper or by using .bind(btn).",
  },
  {
    id: "js-advanced-concepts-4",
    question:
      "Which of the following statements about call(), apply(), and bind() are true?",
    type: "multi",
    options: [
      "All three let you explicitly control what 'this' refers to inside a function call",
      "apply() takes its arguments as an array (or array-like), while call() takes them individually, comma-separated",
      "bind() invokes the function immediately, exactly like call()",
      "bind() returns a new function with 'this' permanently set, without invoking the original function right away",
    ],
    correctIndexes: [0, 1, 3],
    explanation:
      "call() and apply() both invoke the function right away with a given 'this' — the difference is that call() takes arguments one by one while apply() takes them as an array; bind() instead returns a new function pre-bound to a specific 'this' that you call later, so it does not invoke immediately like call() does.",
  },
  {
    id: "js-advanced-concepts-5",
    question:
      "class Car { constructor(make, model) { this.make = make; this.model = model; } } const c = new Car('Toyota', 'Corolla'); What is the role of the constructor method here?",
    type: "single",
    options: [
      "It runs automatically when 'new Car(...)' is called, initializing the new instance's properties from the given arguments",
      "It must be called manually after 'new Car(...)' to set up the object",
      "It defines a static property shared by all Car instances rather than per-instance state",
      "It replaces the need for the 'new' keyword entirely",
    ],
    correctIndexes: [0],
    explanation:
      "The constructor is a special method that runs automatically whenever 'new' creates an instance of the class; it's where arguments are typically assigned to 'this' to set up that instance's own properties.",
  },
  {
    id: "js-advanced-concepts-6",
    question:
      "class Dog { bark() { console.log('Woof'); } } const a = new Dog(); const b = new Dog(); Which of the following statements are true?",
    type: "multi",
    options: [
      "a.bark === b.bark is true, because the method lives once on Dog.prototype and is shared by every instance",
      "Each instance gets its own independent copy of bark(), so a.bark === b.bark is false",
      "Adding Dog.prototype.sit = function() {} later would make .sit() immediately available on both a and b",
      "Methods defined in a class body are enumerable own properties of each instance, listed by Object.keys(a)",
    ],
    correctIndexes: [0, 2],
    explanation:
      "Class methods are defined once on the shared prototype rather than copied per instance, so a.bark === b.bark is true and any method added later to the prototype becomes instantly available to existing instances. Such methods are also non-enumerable and live on the prototype rather than as own properties, so Object.keys(a) would not list them.",
  },
  {
    id: "js-advanced-concepts-7",
    question:
      "Which statement best describes the relationship between JavaScript classes and prototypes?",
    type: "single",
    options: [
      "Classes are primarily syntactic sugar over JavaScript's existing prototype-based inheritance; under the hood, methods still end up on the prototype object",
      "Classes replaced prototypes entirely, and prototype-based objects no longer exist in the engine once a class is used",
      "Classes compile to a completely different, unrelated object model that has no connection to prototypes",
      "Only functions declared with the 'function' keyword use prototypes; the 'class' keyword avoids them",
    ],
    correctIndexes: [0],
    explanation:
      "The class syntax introduced in ES6 is largely syntactic sugar: it provides a cleaner way to write constructor functions and attach methods to a prototype, but the underlying prototype-based inheritance model is unchanged.",
  },
  {
    id: "js-advanced-concepts-8",
    question:
      "class Animal { speak() { console.log('...'); } } class Cat extends Animal {} const kitty = new Cat(); kitty.speak(); What happens?",
    type: "single",
    options: [
      "'...' is logged, because Cat inherits speak() from Animal through the prototype chain even though Cat doesn't define it",
      "A TypeError is thrown, because Cat must define its own speak() method",
      "Nothing is logged, because extends only inherits properties, not methods",
      "'undefined' is logged, because subclasses cannot call inherited methods directly",
    ],
    correctIndexes: [0],
    explanation:
      "'extends' sets up Cat.prototype to inherit from Animal.prototype, so instances of Cat can call any method defined on Animal, like speak(), without redefining it themselves.",
  },
  {
    id: "js-advanced-concepts-9",
    question:
      "class Animal { constructor(name) { this.name = name; } } class Dog extends Animal { constructor(name, breed) { super(name); this.breed = breed; } } Why is the call to super(name) necessary before using 'this' in Dog's constructor?",
    type: "single",
    options: [
      "In a derived class, 'this' is not initialized until the parent constructor runs via super(), so accessing 'this' before calling it throws a ReferenceError",
      "super(name) is just a stylistic convention; omitting it has no functional effect",
      "super() deletes any properties the parent constructor would have set, so it must run first to clear them",
      "super() is only required when the parent class has no constructor of its own",
    ],
    correctIndexes: [0],
    explanation:
      "In a class that extends another, the JavaScript engine requires super() to be called before 'this' can be used in the constructor, because it's the parent constructor that actually creates and initializes the instance.",
  },
  {
    id: "js-advanced-concepts-10",
    question:
      "class Shape { area() { return 0; } } class Square extends Shape { constructor(side) { super(); this.side = side; } area() { return this.side * this.side; } } What does overriding area() in Square accomplish, and how could Square still call Shape's original version if needed?",
    type: "single",
    options: [
      "It replaces the inherited behavior with Square's own logic; the original can still be invoked explicitly with super.area()",
      "It is not possible to override an inherited method; JavaScript throws an error when Square defines its own area()",
      "Overriding permanently deletes Shape's area() method for every class, including Shape itself",
      "The parent version always runs first automatically, then Square's version runs afterward, with no way to skip either",
    ],
    correctIndexes: [0],
    explanation:
      "A subclass can define a method with the same name to override the parent's version for its own instances; the original parent implementation isn't lost and remains reachable via super.methodName() if the subclass wants to extend, rather than fully replace, that behavior.",
  },
  {
    id: "js-advanced-concepts-11",
    question:
      "const obj = {}; console.log(obj.toString()); The obj literal never defines a toString method. How does this call succeed?",
    type: "single",
    options: [
      "JavaScript looks up the prototype chain from obj to Object.prototype, which defines toString(), and uses that inherited method",
      "It doesn't succeed; calling an undefined method on a plain object throws an error",
      "Every object literal automatically gets a hidden, independent copy of all Object.prototype methods when it's created",
      "toString() is a reserved keyword, not a method, so it's handled specially by the parser",
    ],
    correctIndexes: [0],
    explanation:
      "When a property or method isn't found directly on an object, JavaScript searches up its prototype chain; plain objects inherit from Object.prototype, which supplies default methods like toString() and hasOwnProperty().",
  },
  {
    id: "js-advanced-concepts-12",
    question:
      "function Person(name) { this.name = name; } const p1 = new Person('Lee'); Person.prototype.sayHi = function () { console.log('Hi, ' + this.name); }; p1.sayHi(); Why does this work, even though sayHi() was added to the prototype after p1 was already created?",
    type: "single",
    options: [
      "Instances don't copy the prototype's methods; they hold a live reference to it, so a method added later is immediately visible to every existing instance too",
      "It doesn't work; sayHi is undefined on p1 because p1 already existed when sayHi was added",
      "JavaScript automatically re-runs the Person constructor on p1 whenever the prototype changes",
      "sayHi() is copied onto p1 only the next time the page reloads",
    ],
    correctIndexes: [0],
    explanation:
      "An instance's link to its prototype is a live reference, not a one-time snapshot copied at creation time, so adding a method to Person.prototype makes it instantly available to p1 and to any other existing or future instances.",
  },
  {
    id: "js-advanced-concepts-13",
    question:
      "Given a file that contains 'export default function add(a, b) { return a + b; }' and also 'export const PI = 3.14;', which import statement correctly brings in both?",
    type: "single",
    options: [
      "import add, { PI } from './math.js';",
      "import { add, PI } from './math.js';",
      "import default add, named PI from './math.js';",
      "import add, PI from './math.js';",
    ],
    correctIndexes: [0],
    explanation:
      "A default export is imported without curly braces and can be given any local name, while named exports (like PI) must be imported inside curly braces using their exported name, so importing both together looks like 'import add, { PI } from ...'.",
  },
  {
    id: "js-advanced-concepts-14",
    question:
      "What is a main reason JavaScript codebases are organized into modules, using export/import, rather than one giant script file?",
    type: "single",
    options: [
      "Modules give each file its own scope, so variables don't leak into the global namespace, and they let code be organized into reusable, explicitly connected pieces",
      "Modules make the browser download the entire application faster by combining all files into one request automatically",
      "Modules are required because JavaScript cannot otherwise define more than one function per file",
      "Modules disable all variable scoping, making every declaration globally available across files automatically",
    ],
    correctIndexes: [0],
    explanation:
      "Each module has its own top-level scope, so declarations inside it don't pollute the global namespace by default; explicit export/import statements make dependencies between files clear and let code be split into focused, reusable pieces.",
  },
  {
    id: "js-advanced-concepts-15",
    question:
      "Which of the following can be used directly with a for...of loop, without any conversion?",
    type: "multi",
    options: [
      "An array, like [1, 2, 3]",
      "A string, like 'hi'",
      "A Set or a Map",
      "A plain object literal, like { a: 1, b: 2 }",
    ],
    correctIndexes: [0, 1, 2],
    explanation:
      "Arrays, strings, Sets, and Maps all implement the iterable protocol built into JavaScript, so for...of works on them directly; plain objects do not implement this protocol by default, so using for...of directly on one throws a TypeError unless it is first converted, for example with Object.entries().",
  },
  {
    id: "js-advanced-concepts-16",
    question:
      "function* countTo3() { yield 1; yield 2; yield 3; } for (const n of countTo3()) { console.log(n); } What makes a generator function like this usable with for...of?",
    type: "single",
    options: [
      "Calling a generator function returns an iterator object that produces values one at a time via yield, which satisfies the iterable protocol that for...of relies on",
      "Generator functions are a special case that for...of handles separately, unrelated to iterables",
      "The function* syntax converts the function into a regular array before the loop runs",
      "yield behaves exactly like return, so only the value 1 would ever be logged",
    ],
    correctIndexes: [0],
    explanation:
      "A generator function (declared with function*) returns a generator object when called, which is both an iterator and an iterable; each yield pauses execution and produces the next value, which is exactly the mechanism for...of consumes.",
  },
];
