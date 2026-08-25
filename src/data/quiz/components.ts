import type { QuizQuestion } from "../../types/quiz";

export const componentsQuestions: QuizQuestion[] = [
  {
    id: "comp-1",
    question:
      "Which of the following are genuine differences between function components (using Hooks) and class components in React?",
    type: "multi",
    options: [
      "Function components use Hooks like useState for state, while class components use this.state and this.setState",
      "Function components do not need to bind event handler methods to `this`, since there is no `this` context to manage",
      "Only class components are allowed to receive props from their parent",
      "Function components cannot use any lifecycle-equivalent behavior, such as running code after mount",
    ],
    correctIndexes: [0, 1],
    explanation:
      "Hooks replace this.state/this.setState and eliminate the need for this-binding of event handlers; function components can still replicate lifecycle behavior using useEffect, and both component types can receive props.",
  },
  {
    id: "comp-2",
    question:
      "In React, why is it considered incorrect for a component to reassign the properties of its own `props` object?",
    type: "single",
    options: [
      "React treats props as read-only; a component should be a pure function of its props",
      "Props are stored in a frozen array that throws an error on mutation",
      "Reassigning props causes the component to unmount immediately",
      "TypeScript prevents props from being reassigned at compile time",
    ],
    correctIndexes: [0],
    explanation:
      "React's data flow model expects components to treat props as immutable inputs and derive their output from them, not mutate them.",
  },
  {
    id: "comp-3",
    question: "How does a parent component pass a value down to a child component?",
    type: "single",
    options: [
      'By setting an attribute on the child element in JSX, e.g. `<Greeting name="Ana" />`',
      "By calling the child component directly as a function inside the parent's return statement",
      "By importing the child's internal state variable",
      "By writing the value into the child's source file before rendering",
    ],
    correctIndexes: [0],
    explanation:
      "JSX attributes become the props object that the child component receives as its function argument.",
  },
  {
    id: "comp-4",
    question:
      "Which is the idiomatic way to give a function component prop a default value in modern React with TypeScript?",
    type: "single",
    options: [
      'Destructure the prop with a default in the parameter list, e.g. `function Button({ size = "medium" }: Props)`',
      'Set `Button.defaultProps = { size: "medium" }` on the function component',
      'Wrap every usage of the component with `<Button size={size ?? "medium"} />` in the parent',
      'Add `size: string = "medium"` directly inside the TypeScript props interface',
    ],
    correctIndexes: [0],
    explanation:
      "Default values in a destructured parameter list is the standard modern pattern; defaultProps on function components is legacy and discouraged, and a TypeScript interface can only describe a shape, not carry runtime defaults.",
  },
  {
    id: "comp-5",
    question:
      "Given a component that receives `{ name: string; age: number }` as props, what does destructuring those props in the parameter list look like?",
    type: "single",
    options: [
      "`function UserCard({ name, age }: { name: string; age: number }) { ... }`",
      "`function UserCard(props.name, props.age) { ... }`",
      "`function UserCard() { const { name, age } = this.props; ... }`",
      "`function UserCard([name, age]: { name: string; age: number }) { ... }`",
    ],
    correctIndexes: [0],
    explanation:
      "Destructuring the props object in the parameter list lets you reference name and age directly; this.props only exists inside class components, and array destructuring does not match an object's shape.",
  },
  {
    id: "comp-6",
    question: "Which of the following statements about the `children` prop are true?",
    type: "multi",
    options: [
      "It lets a component render whatever markup its parent nests between its opening and closing tags",
      "It is automatically passed to a component without the parent explicitly writing a prop named children",
      "It can only ever be a single string of text, never another element or array of elements",
      "Every component must explicitly declare and use children, or React will throw an error",
    ],
    correctIndexes: [0, 1],
    explanation:
      "Nested JSX content is passed implicitly as props.children, and it can be a string, a single element, multiple elements, or even a function; using it is entirely optional for a component.",
  },
  {
    id: "comp-7",
    question: "What is a SyntheticEvent in React?",
    type: "single",
    options: [
      "A cross-browser wrapper around the native DOM event that React passes to event handlers",
      "A fake event object used only in unit tests, never in real browsers",
      "An event that only fires when using class components, not function components",
      "A custom event type that must be manually created with `new SyntheticEvent()`",
    ],
    correctIndexes: [0],
    explanation:
      "React wraps native browser events in a SyntheticEvent object to normalize behavior across browsers, while still exposing the underlying native event when needed.",
  },
  {
    id: "comp-8",
    question:
      "You want an `onClick` handler to receive a specific `id` argument for each item in a list. Which approach correctly does this without calling the handler immediately during render?",
    type: "single",
    options: [
      "`<button onClick={() => handleClick(id)}>Delete</button>`",
      "`<button onClick={handleClick(id)}>Delete</button>`",
      "`<button onClick={handleClick.bind(id)}>Delete</button>`",
      "`<button onClick={handleClick(id())}>Delete</button>`",
    ],
    correctIndexes: [0],
    explanation:
      "Wrapping the call in an arrow function defers execution until the click actually happens; calling handleClick(id) directly in JSX invokes it immediately during render instead.",
  },
  {
    id: "comp-9",
    question: "Which of the following are valid ways to conditionally render JSX inside a function component?",
    type: "multi",
    options: [
      "`{isLoggedIn && <Dashboard />}`",
      "`{isLoggedIn ? <Dashboard /> : <LoginForm />}`",
      "An early `return null;` (or returning different JSX) before the main return statement, based on a condition",
      "`{if (isLoggedIn) { <Dashboard /> }}`",
    ],
    correctIndexes: [0, 1, 2],
    explanation:
      "The logical AND operator, the ternary operator, and early returns are all standard patterns for conditional rendering; if statements are not expressions, so they cannot be used directly inside JSX curly braces.",
  },
  {
    id: "comp-10",
    question:
      "What does `.map()` do when used to render a list of items in JSX, as in `items.map(item => <li key={item.id}>{item.name}</li>)`?",
    type: "single",
    options: [
      "Transforms each item in the array into a JSX element, producing a new array of elements React can render",
      "Filters out items that don't match a condition before rendering",
      "Mutates the original items array so each entry becomes a JSX element",
      "Sorts the items alphabetically before rendering them",
    ],
    correctIndexes: [0],
    explanation:
      "Array.prototype.map returns a new array by transforming each element, which is exactly the shape (an array of elements) that React needs to render a list.",
  },
  {
    id: "comp-11",
    question: "Which of the following statements about the `key` prop are correct?",
    type: "multi",
    options: [
      "Keys only need to be unique among siblings in the same list, not across the entire application",
      "Keys help React match elements between renders so it can update, reorder, or remove the correct DOM nodes",
      "The key prop is accessible inside the component as a regular prop via `props.key`",
      "Using a stable, unique identifier (such as a database id) as the key is generally preferred over using the array index",
    ],
    correctIndexes: [0, 1, 3],
    explanation:
      "Keys need only be unique among sibling elements and are used internally by React for reconciliation, but they are deliberately not exposed as props.key inside the component; stable IDs avoid the bugs that index-based keys can cause when a list changes.",
  },
  {
    id: "comp-12",
    question:
      "Why is using the array index as a `key` often problematic for a list that can be reordered, filtered, or have items inserted?",
    type: "single",
    options: [
      "The index doesn't track the identity of an item, so React can associate the wrong state or DOM node with an item after the list changes",
      "React throws a runtime error whenever an index is used as a key",
      "Array indexes are not valid values for the key prop and get silently ignored",
      "Using an index as a key disables the .map() method entirely",
    ],
    correctIndexes: [0],
    explanation:
      "Because the index is tied to position rather than the item itself, inserting or removing items shifts which index maps to which item, causing React to misattribute component state (such as input values) to the wrong row.",
  },
  {
    id: "comp-13",
    question:
      "Why must a custom React component's name start with an uppercase letter, e.g. `UserCard` instead of `userCard`?",
    type: "single",
    options: [
      "JSX uses the capitalization to distinguish a custom component from a built-in HTML tag like div or span",
      "Lowercase component names cause a TypeScript compilation error",
      "It is only a stylistic convention with no effect on how JSX is compiled",
      "React requires uppercase names to enable Hooks inside the component",
    ],
    correctIndexes: [0],
    explanation:
      "JSX treats lowercase tag names as native DOM elements and capitalized names as references to a variable holding a component, so a lowercase custom component would be misread as an HTML tag.",
  },
  {
    id: "comp-14",
    question: "What does 'component composition' refer to in React?",
    type: "single",
    options: [
      "Building complex UIs by combining smaller, focused components together, often by nesting them or passing components via props like children",
      "Writing all UI logic inside a single large component to avoid extra files",
      "Using CSS-in-JS to style multiple components at once",
      "Automatically generating components from a JSON schema",
    ],
    correctIndexes: [0],
    explanation:
      "Composition means assembling UI from smaller reusable pieces rather than inheritance, which is the React team's recommended way to share and reuse behavior between components.",
  },
  {
    id: "comp-15",
    question:
      "What best describes a 'presentational' (or 'dumb') component in the common React component-classification pattern?",
    type: "single",
    options: [
      "A component that mainly focuses on how things look, receiving data and callbacks via props rather than managing its own complex state or data fetching",
      "A component that is not allowed to render any JSX",
      "A component that always uses class syntax instead of functions",
      "A component that automatically synchronizes with a global Redux store",
    ],
    correctIndexes: [0],
    explanation:
      "Presentational components are typically concerned with rendering markup and styling based on the props they receive, leaving state management and data logic to container or parent components.",
  },
  {
    id: "comp-16",
    question:
      "Two sibling components need to share and stay in sync with the same piece of state. What is the standard React pattern for this?",
    type: "single",
    options: [
      "Move the state up to their closest common parent component, and pass it down to both siblings via props",
      "Have one sibling component directly import and read the other sibling's internal state variable",
      "Store the state in a global CSS variable that both components read",
      "Duplicate the state independently in both siblings and rely on React to keep the copies in sync automatically",
    ],
    correctIndexes: [0],
    explanation:
      "React state is local to the component that declares it, so sharing it between siblings requires 'lifting state up' to a common ancestor that owns and distributes it via props.",
  },
  {
    id: "comp-17",
    question: "What is the typical way to type the props of a function component in TypeScript?",
    type: "single",
    options: [
      "Define an interface or type alias describing the prop shape, then annotate the function's parameter with it, e.g. `function Button(props: ButtonProps)`",
      "Use `any` for every prop so TypeScript does not restrict what can be passed",
      "Rely on PropTypes exclusively, since TypeScript cannot type component props",
      "Add `// @ts-ignore` above the component so props are not checked",
    ],
    correctIndexes: [0],
    explanation:
      "Declaring a props interface or type and annotating the parameter gives compile-time checking of what a component accepts, which is the standard TypeScript and React pattern.",
  },
  {
    id: "comp-18",
    question: "Which of the following statements about React Fragments are true?",
    type: "multi",
    options: [
      "The shorthand syntax `<>...</>` cannot accept a key prop; the explicit `<React.Fragment key={...}>` form must be used instead",
      "Fragments let a component return multiple sibling elements without adding an extra wrapper node to the DOM",
      "Fragments automatically add a `<div>` with `display: contents` around their children",
      "A component's return statement can only ever contain one Fragment, never multiple sibling Fragments",
    ],
    correctIndexes: [0, 1],
    explanation:
      "The shorthand <> syntax doesn't support attributes such as key, so list items that need a key must use the explicit React.Fragment form; Fragments group elements without adding any actual DOM node.",
  },
  {
    id: "comp-19",
    question: "What is the key difference between a React element and a React component?",
    type: "single",
    options: [
      "An element is a plain object describing what to render (created by JSX or React.createElement), while a component is a function (or class) that returns elements",
      "An element can hold state, while a component cannot",
      "A component is only used for class-based code, while an element is only used for function-based code",
      "Elements and components are two names for exactly the same concept in React",
    ],
    correctIndexes: [0],
    explanation:
      "JSX like <Button /> compiles to a call that produces a lightweight element object describing the UI; the component is the reusable function or class definition that React calls to produce those elements.",
  },
  {
    id: "comp-20",
    question:
      "Before TypeScript became common in React projects, how did many JavaScript-only codebases validate the types of props passed to a component at runtime?",
    type: "single",
    options: [
      "By using the prop-types package to declare expected prop types, which logs a console warning in development when a mismatch occurs",
      "By writing if statements in every component to manually check typeof for each prop and throwing an error",
      "React validated all prop types automatically at compile time, with no extra library needed",
      "By using ESLint exclusively, since it can catch incorrect prop values at runtime",
    ],
    correctIndexes: [0],
    explanation:
      "The prop-types library provided runtime prop-shape validation with development-only console warnings, whereas TypeScript performs compile-time checking instead, which is why most modern projects prefer TypeScript.",
  },
];
