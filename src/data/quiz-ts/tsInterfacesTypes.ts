import type { QuizQuestion } from "../../types/quiz";

export const tsInterfacesTypesQuestions: QuizQuestion[] = [
  {
    id: "ts-interfaces-types-1",
    question:
      "What is the primary purpose of an interface in TypeScript?",
    type: "single",
    options: [
      "To describe the shape of an object: the names, types, and optionality of its properties (and sometimes methods)",
      "To store runtime values that can be logged with console.log, the same way an object literal does",
      "To replace classes entirely, since interfaces can be instantiated directly with 'new'",
      "To define a function's implementation body that other code can call directly",
    ],
    correctIndexes: [0],
    explanation:
      "An interface is a compile-time construct that describes the expected shape of an object, such as which properties it must have and what type each one is; interfaces contain no implementation and cannot be instantiated with 'new' or logged as values, since they disappear entirely once compiled to JavaScript.",
  },
  {
    id: "ts-interfaces-types-2",
    question:
      "Does this compile? interface User { name: string; age?: number; } let u: User = { name: 'Sam' };",
    type: "single",
    options: [
      "Yes, because age is marked optional with '?', so a User object is allowed to omit it entirely",
      "No, because every property declared in an interface must be present in any object typed as that interface",
      "Yes, but only because TypeScript automatically sets age to 0 when it is omitted",
      "No, because 'age?: number' is invalid syntax inside an interface",
    ],
    correctIndexes: [0],
    explanation:
      "Appending '?' to a property name in an interface marks it optional, meaning objects of that type may include it or leave it out entirely; TypeScript does not invent a default value for a missing optional property, it simply allows the property to be absent (or undefined).",
  },
  {
    id: "ts-interfaces-types-3",
    question:
      "What happens with this code? interface Point { readonly x: number; } let p: Point = { x: 5 }; p.x = 10;",
    type: "single",
    options: [
      "It fails to compile, because x is marked readonly, so it can be set during initialization but not reassigned afterward",
      "It compiles and runs fine, updating p.x to 10",
      "It compiles, but p.x silently remains 5 at runtime because readonly properties never change",
      "It fails to compile because readonly properties cannot be given a value at all, even when the object is first created",
    ],
    correctIndexes: [0],
    explanation:
      "readonly allows a property to be assigned once, when the object is created, but the TypeScript compiler rejects any later attempt to reassign it; this is a compile-time-only restriction, since readonly (like all TypeScript features) is erased and has no effect on the emitted JavaScript.",
  },
  {
    id: "ts-interfaces-types-4",
    question:
      "Given 'interface Point { x: number; y: number; }' and 'function log(p: Point) { }', does calling log({ x: 1, y: 2 }) compile, even though the object literal was never declared to 'implement' Point?",
    type: "single",
    options: [
      "Yes, because TypeScript uses structural typing: any value with the required properties and types satisfies the interface, with no explicit 'implements' needed for object literals or plain values",
      "No, because only classes that explicitly write 'implements Point' can be used where a Point is expected",
      "No, because object literals can never be assigned to an interface type directly",
      "Yes, but only because TypeScript ignores interfaces entirely for plain object literals",
    ],
    correctIndexes: [0],
    explanation:
      "TypeScript's type system is structural (sometimes called 'duck typing'): a value is considered compatible with a type if it has the required shape, regardless of how it was created or declared; there is no need for an object literal, or even a class, to explicitly declare that it implements an interface for structural compatibility to hold.",
  },
  {
    id: "ts-interfaces-types-5",
    question:
      "Which of the following statements about TypeScript's structural typing are true?",
    type: "multi",
    options: [
      "A plain object literal can satisfy an interface simply by having the right properties and types, without ever mentioning that interface by name",
      "Structural typing means compatibility is based on the shape of a value, not on an explicit declared relationship like 'implements'",
      "A class must always write 'implements SomeInterface' before any of its instances can be assigned to a variable of that interface type",
      "Two differently-named interfaces with identical property shapes can be used interchangeably for a value that matches both",
    ],
    correctIndexes: [0, 1, 3],
    explanation:
      "TypeScript compares shapes, not names or declared relationships, so an object literal, a class instance, or any other value can satisfy an interface just by matching its structure, and even two unrelated interfaces with the same shape are interchangeable; explicitly writing 'implements' on a class is optional and only adds an extra compile-time check, it is not required for structural compatibility.",
  },
  {
    id: "ts-interfaces-types-6",
    question:
      "Does this compile? type ID = string | number; let userId: ID = 42; userId = 'abc123';",
    type: "single",
    options: [
      "Yes, because a type alias can alias a union of primitive types, and both a number and a string are valid values for ID",
      "No, because type aliases can only describe object shapes, never unions of primitives",
      "No, because once userId is assigned a number, it can never be reassigned to a string",
      "Yes, but only because 'let' allows type changes that 'const' would forbid",
    ],
    correctIndexes: [0],
    explanation:
      "A type alias, written with 'type Name = ...', is not limited to describing object shapes; it can alias a union of primitive types like string | number, and a variable of that union type may legally hold, or be reassigned to, any value matching either member of the union.",
  },
  {
    id: "ts-interfaces-types-7",
    question:
      "What does this type alias describe? type Adder = (a: number, b: number) => number;",
    type: "single",
    options: [
      "The shape of a function that takes two number parameters and returns a number, which any matching function value can be assigned to",
      "An object with two properties, a and b, both of type number",
      "A tuple containing exactly three numbers",
      "This is invalid syntax; type aliases cannot describe function types",
    ],
    correctIndexes: [0],
    explanation:
      "Type aliases can describe function types directly, specifying the parameter types and return type; any function expression or declaration whose signature is compatible can then be assigned to a variable typed as Adder.",
  },
  {
    id: "ts-interfaces-types-8",
    question:
      "What happens with this code? interface Box { width: number; } interface Box { height: number; } let b: Box = { width: 10, height: 20 };",
    type: "single",
    options: [
      "It compiles, because TypeScript merges multiple interface declarations with the same name into a single interface containing all of their members (declaration merging)",
      "It fails to compile, because an interface named Box cannot be declared more than once in the same scope",
      "It compiles, but the second declaration completely replaces the first, so Box only ends up with a height property",
      "It compiles, but width and height are both treated as optional, even though neither was marked with '?'",
    ],
    correctIndexes: [0],
    explanation:
      "Interfaces support declaration merging: multiple interface declarations sharing the same name in the same scope are automatically combined into one interface with all of their members, so Box ends up requiring both width and height; this merging behavior is unique to interfaces.",
  },
  {
    id: "ts-interfaces-types-9",
    question:
      "What happens with this code? type Box = { width: number }; type Box = { height: number };",
    type: "single",
    options: [
      "It fails to compile with a duplicate identifier error, because unlike interfaces, type aliases cannot be declared more than once with the same name and merged together",
      "It compiles and merges into a single Box type with both width and height, exactly like interfaces would",
      "It compiles, and the first declaration silently overrides the second",
      "It compiles, but only the properties present in both declarations are kept",
    ],
    correctIndexes: [0],
    explanation:
      "Declaration merging is a feature specific to interfaces; a type alias name can only be bound once in a given scope, so redeclaring 'type Box' a second time triggers a duplicate identifier compile error, which is one of the key practical differences between interfaces and type aliases.",
  },
  {
    id: "ts-interfaces-types-10",
    question:
      "Why can a status type be written as type Status = 'active' | 'inactive'; using a type alias, but not as an equivalent interface declaration?",
    type: "single",
    options: [
      "Interfaces can only describe object shapes (named properties and their types); a union of literal values is not an object shape, so it can only be expressed with a type alias",
      "The word 'interface' is reserved and cannot be followed by the word 'Status' under any circumstances",
      "Union types are not supported anywhere in TypeScript, in interfaces or type aliases",
      "Interfaces require every member to start with the 'readonly' keyword, which is missing here",
    ],
    correctIndexes: [0],
    explanation:
      "An interface body is a list of property (and method) signatures describing an object's shape; it has no syntax for expressing 'this type is A or B'. Type aliases, by contrast, can name any type, including a union of string literals like 'active' | 'inactive', which is exactly the kind of type interfaces cannot directly express.",
  },
  {
    id: "ts-interfaces-types-11",
    question:
      "Given 'interface Animal { name: string; } interface Dog extends Animal { breed: string; }', what must an object satisfy to be assignable to a variable of type Dog?",
    type: "single",
    options: [
      "It must have both a name property (inherited from Animal) and a breed property, matching the types declared in each interface",
      "It only needs a breed property; the name property from Animal becomes optional automatically when extending",
      "It only needs a name property, since extends copies nothing new from Dog itself",
      "It must call a special constructor function that Dog automatically generates",
    ],
    correctIndexes: [0],
    explanation:
      "When an interface extends another with 'extends', it inherits all of the base interface's members in addition to its own; so a value assignable to Dog must include every required property from both Animal (name) and Dog (breed), not just one or the other.",
  },
  {
    id: "ts-interfaces-types-12",
    question:
      "Which of the following statements about extending interfaces with 'extends' in TypeScript are true?",
    type: "multi",
    options: [
      "An interface can extend more than one other interface at the same time, combining all of their members",
      "An interface can extend an object-shaped type alias, as long as that alias describes an object type",
      "Extending an interface always makes every inherited property optional in the new interface",
      "A property re-declared in the extending interface must remain compatible with the type it had in the base interface",
    ],
    correctIndexes: [0, 1, 3],
    explanation:
      "TypeScript interfaces can extend multiple interfaces at once (comma-separated), can extend an object-shaped type alias, and if a subinterface re-declares an inherited property, its type must still be compatible with the base; extending never makes properties optional by itself, that would have to be declared explicitly.",
  },
  {
    id: "ts-interfaces-types-13",
    question:
      "Given 'type Named = { name: string }; type Aged = { age: number }; type Person = Named & Aged;', what is required of a value typed as Person?",
    type: "single",
    options: [
      "It must have both a name property and an age property, since an intersection type (&) combines all of the members from every type it intersects",
      "It must have either a name property or an age property, but not necessarily both",
      "It can have neither property, since & means the properties cancel each other out",
      "It must have a single property called 'NamedAged' that holds both values",
    ],
    correctIndexes: [0],
    explanation:
      "The intersection operator & combines multiple types into one that must satisfy all of them simultaneously, so a Person value needs every member from both Named and Aged: both name and age must be present.",
  },
  {
    id: "ts-interfaces-types-14",
    question:
      "What is the resulting type of x in this code? type A = { x: string }; type B = { x: number }; type Combined = A & B;",
    type: "single",
    options: [
      "x has type never, because a value would need to be both a string and a number at the same time, which is impossible for any real value",
      "x has type string, because A is listed first in the intersection",
      "x has type string | number, since the intersection combines the two possibilities into a union",
      "This is a compile error; TypeScript refuses to create the Combined type at all",
    ],
    correctIndexes: [0],
    explanation:
      "When an intersection combines two types that declare the same property with incompatible primitive types, the property's resulting type becomes the intersection of those types, which for two unrelated primitives like string and number collapses to never, since no value can simultaneously be both; TypeScript still compiles Combined, but no real value can ever satisfy that property.",
  },
  {
    id: "ts-interfaces-types-15",
    question:
      "Does this compile? function printId(id: string | number) { console.log(id.toUpperCase()); }",
    type: "single",
    options: [
      "No, because toUpperCase only exists on strings, and id could be a number at that point; TypeScript requires narrowing the union before calling a type-specific member",
      "Yes, because TypeScript automatically converts numbers to strings before calling string methods on them",
      "Yes, because union types always expose every method from every member type",
      "No, because union types cannot be used as function parameter types at all",
    ],
    correctIndexes: [0],
    explanation:
      "A union type like string | number only allows operations that are valid for every member of the union; since toUpperCase does not exist on number, TypeScript rejects the call until the code narrows id down to specifically string, for example with a typeof check.",
  },
  {
    id: "ts-interfaces-types-16",
    question:
      "Given 'function printId(id: string | number) { }', which of the following correctly narrow id to a single concrete type before using a type-specific member?",
    type: "multi",
    options: [
      "if (typeof id === 'string') { console.log(id.toUpperCase()); }",
      "if (typeof id === 'number') { console.log(id.toFixed(2)); }",
      "console.log(id.toUpperCase()); if (typeof id === 'string') { }",
      "id.toString(); // no check needed, since toString exists on both string and number",
    ],
    correctIndexes: [0, 1],
    explanation:
      "A typeof check inside an if-block narrows the union so that within that branch, TypeScript knows id is specifically a string or a number, making id.toUpperCase() or id.toFixed(2) safe to call; calling toUpperCase() before any check (as in the third option) is exactly the unsafe pattern narrowing prevents, and the last option isn't narrowing at all, it just happens to call a method common to both union members.",
  },
];
