import type { QuizQuestion } from "../../types/quiz";

export const tsModulesConfigQuestions: QuizQuestion[] = [
  {
    id: "ts-modules-config-1",
    question:
      "A file 'mathUtils.ts' contains: export function add(a: number, b: number): number { return a + b; } Which import correctly brings 'add' into another file?",
    type: "single",
    options: [
      "import { add } from './mathUtils';",
      "import add from './mathUtils';",
      "import * from './mathUtils';",
      "import { add } as default from './mathUtils';",
    ],
    correctIndexes: [0],
    explanation:
      "A named export must be imported with the same name inside braces; the braces-free form is for a default export, 'import *' needs an 'as' alias to bind the whole module, and the fourth option is not valid syntax.",
  },
  {
    id: "ts-modules-config-2",
    question:
      "A module exports both a type and a function: export interface User { id: number; name: string; } export function getUser(id: number): User { /* ... */ } What is true about importing 'User' elsewhere with 'import { User } from \"./user\";'?",
    type: "single",
    options: [
      "It works to bring in the type for use in annotations, and since User is only a type, the compiler drops this part of the import when emitting JavaScript",
      "Interfaces cannot be exported from a module; only runtime values like functions and classes can be exported",
      "Importing a type requires a special file extension, such as '.type.ts'",
      "'User' can only be imported if it was declared with 'export default'",
    ],
    correctIndexes: [0],
    explanation:
      "TypeScript lets you export and import interfaces and type aliases with the same named-export syntax as values, but since types have no runtime representation, the compiler erases such imports from the compiled JavaScript.",
  },
  {
    id: "ts-modules-config-3",
    question:
      "What is the main benefit of writing 'import type { User } from \"./user\";' instead of a plain 'import { User } from \"./user\";' when 'User' is used only as a type?",
    type: "single",
    options: [
      "It makes explicit that the import can only ever bring in a type, guaranteeing it is fully erased at compile time and cannot accidentally reference a runtime value",
      "It lets 'User' be both a type annotation and a callable function at runtime",
      "It makes the file load faster over the network in the browser",
      "It is required any time an interface is imported, or the code fails to compile",
    ],
    correctIndexes: [0],
    explanation:
      "'import type' marks the import as type-only, so it is always stripped from the emitted JavaScript; a plain import can also be erased if unused as a value, but 'import type' states that intent explicitly and lets the compiler catch misuse.",
  },
  {
    id: "ts-modules-config-4",
    question:
      "A file writes 'import type { getUser } from \"./user\";' where 'getUser' is a regular exported function, not a type. What happens if the code then tries to call 'getUser(1)'?",
    type: "single",
    options: [
      "TypeScript raises a compile error, because a type-only import cannot be used as a value, such as calling it as a function",
      "It works exactly the same as a normal import, since 'import type' is only a stylistic choice",
      "It runs but always returns undefined",
      "It throws a runtime ReferenceError, but only when the app is built in strict mode",
    ],
    correctIndexes: [0],
    explanation:
      "'import type' restricts the imported binding to type positions only; TypeScript reports a compile-time error the moment it is used as a value, such as being invoked as a function.",
  },
  {
    id: "ts-modules-config-5",
    question: "Which of the following statements about TypeScript modules are true?",
    type: "multi",
    options: [
      "Interfaces and type aliases can be exported from a module just like functions and classes",
      "Because types don't exist at runtime, an import used only for a type is erased from the compiled JavaScript output",
      "Every exported type must use 'export default'; named exports cannot be used for types",
      "'import type' can be used to explicitly mark an import as type-only, making its erasure explicit",
    ],
    correctIndexes: [0, 1, 3],
    explanation:
      "Types can be exported and imported by name just like values, and since they carry no runtime representation, type-only imports are dropped during compilation; 'import type' makes that intent explicit, but there is no rule forcing types to use default exports.",
  },
  {
    id: "ts-modules-config-6",
    question:
      "What does this code do? namespace Shapes { export interface Circle { radius: number; } export function area(c: Circle): number { return Math.PI * c.radius ** 2; } }",
    type: "single",
    options: [
      "It groups the Circle type and area function under a single Shapes object, accessible elsewhere as Shapes.Circle and Shapes.area",
      "It automatically creates a new file called Shapes.ts",
      "It behaves identically to plain top-level 'export' statements and has no grouping effect",
      "It throws a compile error, because 'namespace' is not valid TypeScript syntax",
    ],
    correctIndexes: [0],
    explanation:
      "A TypeScript namespace groups related declarations under a single named object; members marked 'export' inside it become accessible as properties of that namespace, such as Shapes.Circle and Shapes.area.",
  },
  {
    id: "ts-modules-config-7",
    question:
      "Why are ES modules (import/export) generally preferred over TypeScript namespaces in modern projects?",
    type: "single",
    options: [
      "ES modules are a native, standard part of JavaScript with strong bundler, Node.js, and browser support, giving better tooling and tree-shaking than the TypeScript-only namespace feature",
      "Namespaces run faster at runtime than ES modules in every JavaScript engine",
      "TypeScript no longer compiles code that uses the 'namespace' keyword",
      "ES modules cannot export types; only namespaces are able to export types",
    ],
    correctIndexes: [0],
    explanation:
      "Namespaces predate widespread support for ES modules and are specific to TypeScript; since ES modules are now a native JavaScript standard with mature tooling for bundling and static analysis, they are the recommended way to organize code, with namespaces mostly seen in legacy codebases.",
  },
  {
    id: "ts-modules-config-8",
    question:
      "What is the purpose of a TypeScript declaration file (a file ending in '.d.ts')?",
    type: "single",
    options: [
      "It describes the shape of variables, functions, or classes, without providing any implementation, so TypeScript can type-check code that uses them",
      "It replaces a '.ts' file entirely, since '.d.ts' files contain both types and a runnable implementation",
      "It is used only to configure the TypeScript compiler, similar to tsconfig.json",
      "It is automatically generated for every stylesheet in a project",
    ],
    correctIndexes: [0],
    explanation:
      "Declaration files contain only type information and no executable logic, letting TypeScript type-check code that consumes a library even though the library's actual implementation lives elsewhere, often as plain JavaScript.",
  },
  {
    id: "ts-modules-config-9",
    question:
      "A team uses a plain JavaScript library, 'legacyMath.js', with no built-in TypeScript support, exporting a function 'multiply(a, b)'. What is a good way to get type-checking and autocomplete for it in a TypeScript project?",
    type: "single",
    options: [
      "Write a 'legacyMath.d.ts' file declaring the shape, such as 'export function multiply(a: number, b: number): number;', alongside the JS file",
      "Rename 'legacyMath.js' to 'legacyMath.ts'; TypeScript will infer full parameter and return types automatically with no other changes",
      "It is impossible to type a plain JavaScript library without rewriting it in TypeScript first",
      "Add a comment above every call site explaining what the function does, since TypeScript reads code comments as types",
    ],
    correctIndexes: [0],
    explanation:
      "A hand-written '.d.ts' file lets you describe an existing plain-JS library's shape so TypeScript can type-check and autocomplete calls into it, without needing to rewrite the library's implementation at all.",
  },
  {
    id: "ts-modules-config-10",
    question:
      "In tsconfig.json, what does the 'target' compiler option roughly control?",
    type: "single",
    options: [
      "Which version of ECMAScript the compiler outputs (e.g., 'es5' or 'es2020'), affecting whether newer syntax is downleveled to older equivalents",
      "Which folder the compiled output files are written to",
      "Whether the compiler enforces stricter type-checking rules",
      "Which source files are included in or excluded from compilation",
    ],
    correctIndexes: [0],
    explanation:
      "'target' sets the JavaScript language version for emitted output, so syntax newer than that target, such as optional chaining on an old target, may be transformed into older equivalent code.",
  },
  {
    id: "ts-modules-config-11",
    question:
      "In tsconfig.json, what does the 'module' compiler option roughly control?",
    type: "single",
    options: [
      "The module system used in the emitted JavaScript, such as 'commonjs' for Node.js or 'esnext' for native ES modules",
      "The maximum number of files that can be imported into a single file",
      "Whether declaration ('.d.ts') files are generated during the build",
      "The version of JavaScript syntax allowed inside source files",
    ],
    correctIndexes: [0],
    explanation:
      "'module' determines how import/export statements are emitted, for example transforming them into 'require'/'module.exports' calls for 'commonjs', or leaving native import/export syntax in place for 'esnext'.",
  },
  {
    id: "ts-modules-config-12",
    question: "Which of the following statements about tsconfig.json options are true?",
    type: "multi",
    options: [
      "'outDir' specifies the folder where compiled JavaScript output files are written",
      "'include' and 'exclude' control which files are considered part of the TypeScript project during compilation",
      "Setting 'strict: true' only affects code formatting, not type-checking behavior",
      "'target' and 'module' can be set independently, since one controls the emitted JS version and the other controls the module system",
    ],
    correctIndexes: [0, 1, 3],
    explanation:
      "'outDir' sets where output goes, and 'include'/'exclude' define which files the compiler considers; 'target' and 'module' are independent settings, one for JS version and one for module format, while 'strict' governs type-checking behavior, not formatting.",
  },
  {
    id: "ts-modules-config-13",
    question:
      "A project depends on a JavaScript library that does not ship its own TypeScript types. What is the conventional way to get type support for it, following the DefinitelyTyped convention?",
    type: "single",
    options: [
      "Install a separate '@types/<package-name>' package (e.g., '@types/lodash'), a community-maintained set of declarations published from DefinitelyTyped",
      "Manually rewrite the entire library's source code from JavaScript into TypeScript",
      "Add 'declare module \"*\";' for every third-party library used anywhere in the project",
      "Wait for a new TypeScript compiler release, since types for third-party libraries ship bundled with the compiler itself",
    ],
    correctIndexes: [0],
    explanation:
      "DefinitelyTyped is a community repository of type declarations published to npm under the '@types' scope; a library without bundled types can often be paired with a matching '@types' package, while some libraries (such as ones written in TypeScript) already ship their own types and need no separate '@types' package.",
  },
  {
    id: "ts-modules-config-14",
    question: "Which of the following statements about TypeScript's 'strict' compiler option are true?",
    type: "multi",
    options: [
      "Setting 'strict: true' is an umbrella flag that enables several individual stricter checks at once, such as 'strictNullChecks' and 'noImplicitAny'",
      "It is generally recommended to enable 'strict' from the very start of a project, since retrofitting it onto a large codebase later means fixing many accumulated type errors at once",
      "'strict: true' has no effect unless every individual strict check is also separately listed in tsconfig.json",
      "With 'strictNullChecks' enabled, 'null' and 'undefined' are only assignable to variables whose type explicitly includes them, catching many potential runtime errors at compile time",
    ],
    correctIndexes: [0, 1, 3],
    explanation:
      "'strict' is shorthand for turning on a family of stricter checks, including 'strictNullChecks' and 'noImplicitAny', without listing each one individually; enabling it from the start avoids a painful retroactive cleanup, and 'strictNullChecks' specifically prevents accidentally treating 'null' or 'undefined' as any other value.",
  },
];
