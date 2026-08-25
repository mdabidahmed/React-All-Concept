import type { QuizQuestion } from "../../types/quiz";

export const gettingStartedQuestions: QuizQuestion[] = [
  {
    id: "gs-1",
    question: "What is React primarily used for?",
    type: "single",
    options: [
      "Managing server-side databases",
      "Compiling TypeScript into JavaScript",
      "Building user interfaces with reusable components",
      "Replacing HTML entirely with a new markup language",
    ],
    correctIndexes: [2],
    explanation:
      "React is a JavaScript library for building user interfaces out of small, reusable components.",
  },
  {
    id: "gs-2",
    question: "What is the virtual DOM in React?",
    type: "single",
    options: [
      "A browser extension required to run React apps",
      "A lightweight in-memory representation of the real DOM that React uses to compute efficient updates",
      "A second, hidden browser window used for testing",
      "A database that stores component state permanently",
    ],
    correctIndexes: [1],
    explanation:
      "React keeps a virtual representation of the UI in memory, diffs it against the previous version, and applies only the minimal set of changes to the real DOM.",
  },
  {
    id: "gs-3",
    question: "Which statements about JSX are true?",
    type: "multi",
    options: [
      "JSX lets you write markup-like syntax directly inside JavaScript",
      "JSX ultimately gets compiled into JavaScript function calls",
      "JSX is a templating language that runs natively in browsers without any build step",
      "JSX expressions can embed JavaScript values using curly braces",
    ],
    correctIndexes: [0, 1, 3],
    explanation:
      "JSX is syntactic sugar compiled by tools like Babel into JavaScript (typically calls that create React elements); browsers cannot run raw JSX directly.",
  },
  {
    id: "gs-4",
    question: "Which command is commonly used to scaffold a new React project with Vite?",
    type: "single",
    options: [
      "npm build react-app",
      "npx react-init",
      "npm start vite",
      "npm create vite@latest",
    ],
    correctIndexes: [3],
    explanation:
      "`npm create vite@latest` runs Vite's scaffolding tool, which lets you pick a framework template such as React with TypeScript.",
  },
  {
    id: "gs-5",
    question: "What is the role of the `createRoot` function from `react-dom/client`?",
    type: "single",
    options: [
      "It creates a React root that can render a component tree into a DOM container",
      "It creates a new HTML file for the application",
      "It defines a new React component type",
      "It fetches data from an API when the app starts",
    ],
    correctIndexes: [0],
    explanation:
      "`createRoot(container)` returns a root object whose `render()` method mounts your top-level component tree into that DOM node; this is the standard entry point in React 18 and 19.",
  },
  {
    id: "gs-6",
    question: "What is the main difference between the `react` and `react-dom` packages?",
    type: "single",
    options: [
      "`react` is only for class components, while `react-dom` is only for function components",
      "`react` is used in development, and `react-dom` replaces it in production builds",
      "`react` provides the core APIs for defining components and managing state, while `react-dom` provides APIs for rendering to the browser DOM",
      "There is no difference; they are aliases for the same package",
    ],
    correctIndexes: [2],
    explanation:
      "React's core package is platform-agnostic (it also powers React Native), while `react-dom` supplies the renderer and APIs specific to web browsers, such as `createRoot`.",
  },
  {
    id: "gs-7",
    question: "In React's component model, what is a component?",
    type: "single",
    options: [
      "A CSS file that styles a specific page",
      "A JavaScript function (or class) that returns markup describing part of the UI",
      "A configuration object passed to the Vite bundler",
      "A single HTML element with no associated logic",
    ],
    correctIndexes: [1],
    explanation:
      "Components are reusable, self-contained pieces of UI, most commonly written as functions that accept props and return JSX describing what should render.",
  },
  {
    id: "gs-8",
    question: "What does 'one-way data flow' mean in React?",
    type: "single",
    options: [
      "Data can only be fetched once when the app first loads",
      "State updates are only allowed to happen inside event handlers",
      "Components can only render once and never update again",
      "Data flows from parent components down to child components via props, rather than children directly mutating a parent's state",
    ],
    correctIndexes: [3],
    explanation:
      "Parents pass data down to children through props; children communicate back up by calling functions the parent provided, keeping the flow of data predictable and traceable.",
  },
  {
    id: "gs-9",
    question: "Which of these are true about setting up and running a typical Vite-based React project?",
    type: "multi",
    options: [
      "Dependencies are installed with a package manager such as npm, pnpm, or yarn",
      "Every React project must be written entirely in JavaScript with no TypeScript support",
      "A development server can be started with a script like `npm run dev`",
      "`package.json` tracks the project's dependencies and scripts",
    ],
    correctIndexes: [0, 2, 3],
    explanation:
      "Vite fully supports TypeScript templates out of the box, so React projects are commonly written in TypeScript rather than being restricted to plain JavaScript.",
  },
  {
    id: "gs-10",
    question: "What best describes how a React 19 function component renders?",
    type: "single",
    options: [
      "The component writes directly to the DOM using `document.createElement`",
      "React reads the function's source code as plain HTML without executing it",
      "React calls the function, which returns JSX describing the UI for the current props and state",
      "The component must extend a base class and implement a `render` method",
    ],
    correctIndexes: [2],
    explanation:
      "Function components are just functions: React invokes them, and whatever JSX they return describes the UI React should produce; no class or manual DOM manipulation is required.",
  },
];
