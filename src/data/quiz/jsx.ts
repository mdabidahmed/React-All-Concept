import type { QuizQuestion } from "../../types/quiz";

export const jsxQuestions: QuizQuestion[] = [
  {
    id: "jsx-1",
    question: "How do you embed a JavaScript expression inside JSX?",
    type: "single",
    options: [
      "Wrap it in double parentheses, like `((expression))`",
      "Wrap it in curly braces, like `{expression}`",
      "Prefix it with a dollar sign, like `$expression`",
      "Wrap it in square brackets, like `[expression]`",
    ],
    correctIndexes: [1],
    explanation:
      "Curly braces `{}` in JSX open a window back into JavaScript, letting you embed any expression such as a variable, function call, or arithmetic.",
  },
  {
    id: "jsx-2",
    question: "Why does JSX use `className` instead of `class` for the HTML class attribute?",
    type: "single",
    options: [
      "Because `className` is faster for the browser to parse",
      "Because `class` only works in class components, not function components",
      "There is no real reason; `class` also works identically in JSX",
      "Because `class` is a reserved word in JavaScript, so JSX uses `className` to avoid the conflict",
    ],
    correctIndexes: [3],
    explanation:
      "Since JSX compiles to JavaScript, attribute names that would collide with JavaScript keywords (like `class`) are renamed; `className` avoids clashing with the `class` keyword.",
  },
  {
    id: "jsx-3",
    question: "Which of these are valid ways to write event handler attributes in JSX?",
    type: "multi",
    options: [
      "`onclick={handleClick}`",
      "`onClick={handleClick}`",
      "`on-click={handleClick}`",
      "`onChange={(e) => setValue(e.target.value)}`",
    ],
    correctIndexes: [1, 3],
    explanation:
      "JSX event handlers are camelCase (`onClick`, `onChange`, etc.) and are assigned a function, unlike plain HTML's lowercase, string-based attributes such as `onclick=\"...\"`.",
  },
  {
    id: "jsx-4",
    question: "In JSX, how do you write a self-closing tag for an element with no children, such as an image?",
    type: "single",
    options: [
      "`<img src={url}>`",
      "`<img(src={url})/>`",
      "`<img src={url} />`",
      "`<img src={url}></img src>`",
    ],
    correctIndexes: [2],
    explanation:
      "Elements without children must be closed, either with a matching closing tag or, for elements like `img` and `br`, a self-closing slash before the final `>`.",
  },
  {
    id: "jsx-5",
    question: "A component's JSX must return a single root element. Which of the following satisfy this rule?",
    type: "multi",
    options: [
      "Wrapping multiple sibling elements in a `<div>`",
      "Returning two adjacent top-level elements with no wrapper",
      "Wrapping multiple sibling elements in a Fragment, `<>...</>`",
      "Returning an array of elements, each with a unique `key` prop",
    ],
    correctIndexes: [0, 2, 3],
    explanation:
      "JSX requires one enclosing root node; a `div`, a Fragment, or an array of keyed elements all satisfy that, but two unwrapped adjacent elements do not compile.",
  },
  {
    id: "jsx-6",
    question: "What is the idiomatic way to conditionally render an element only when `isLoggedIn` is true?",
    type: "single",
    options: [
      "`{isLoggedIn && <Welcome />}`",
      "`{if (isLoggedIn) <Welcome />}`",
      "`{isLoggedIn : <Welcome />}`",
      "`<Welcome if={isLoggedIn} />`",
    ],
    correctIndexes: [0],
    explanation:
      "Since JSX only accepts expressions inside `{}`, the `&&` operator is a common idiom: when `isLoggedIn` is truthy, the expression evaluates to `<Welcome />`, and when falsy it renders nothing.",
  },
  {
    id: "jsx-7",
    question: "What is the correct way to render a `<Cat />` when `hasCat` is true and a `<Dog />` otherwise?",
    type: "single",
    options: [
      "`{hasCat && <Cat /> || <Dog />}` only, since ternaries are not allowed in JSX",
      "`<if condition={hasCat}><Cat /><else><Dog /></if>`",
      "`{switch(hasCat) { case true: <Cat />; default: <Dog />; }}`",
      "`{hasCat ? <Cat /> : <Dog />}`",
    ],
    correctIndexes: [3],
    explanation:
      "The conditional (ternary) operator is an expression, so it can be embedded directly in JSX to choose between two elements based on a condition.",
  },
  {
    id: "jsx-8",
    question: "When rendering a list of items with `.map()` in JSX, why does each element need a `key` prop?",
    type: "single",
    options: [
      "It sets the CSS `z-index` for stacking the elements",
      "It helps React identify which items changed, were added, or were removed between renders",
      "It is required by JavaScript's `Array.prototype.map` method itself",
      "It determines the alphabetical sort order of the list",
    ],
    correctIndexes: [1],
    explanation:
      "Keys give React a stable identity for each list item across renders, letting it efficiently match, reorder, or remove elements instead of re-rendering the entire list.",
  },
  {
    id: "jsx-9",
    question: "Under the hood, what does a JSX element like `<div className=\"box\" />` compile to?",
    type: "single",
    options: [
      "A raw HTML string that gets injected with `innerHTML`",
      "A JSON file that is loaded at runtime",
      "A function call that creates a React element describing the div, such as `jsx(\"div\", { className: \"box\" })`",
      "A CSS rule scoped to that component",
    ],
    correctIndexes: [2],
    explanation:
      "Build tools like Babel transform JSX into plain JavaScript function calls (historically `React.createElement`, now often an automatic `jsx` runtime import) that produce React element objects describing the UI.",
  },
  {
    id: "jsx-10",
    question: "Why can't you write a plain `if` statement directly inside a JSX expression like `{ if (x) {...} }`?",
    type: "single",
    options: [
      "Because `{}` in JSX can only contain expressions, and `if` is a statement, not an expression",
      "Because `if` statements are deprecated in React 19",
      "Because JSX only supports arithmetic operators inside curly braces",
      "Because `if` statements cannot be used anywhere in a React component's code",
    ],
    correctIndexes: [0],
    explanation:
      "Curly braces in JSX are evaluated as a single expression, and `if` is a control-flow statement rather than something that produces a value, so it must be moved outside the JSX (or replaced with `&&`/ternary expressions).",
  },
];
