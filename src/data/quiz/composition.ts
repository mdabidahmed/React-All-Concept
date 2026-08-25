import type { QuizQuestion } from "../../types/quiz";

export const compositionQuestions: QuizQuestion[] = [
  {
    id: "compose-1",
    question: "What is the `children` prop in React?",
    type: "single",
    options: [
      "An array of a component's direct DOM child nodes, managed automatically by the browser",
      "A prop that is only available on class components, not function components",
      "A special prop that holds whatever is nested between a component's opening and closing JSX tags",
      "A required prop that every component must explicitly declare and pass a default value for",
    ],
    correctIndexes: [2],
    explanation:
      "When you write `<Card><p>Hi</p></Card>`, React passes the `<p>Hi</p>` content to `Card` as its `children` prop, letting a component render whatever content its caller placed inside it.",
  },
  {
    id: "compose-2",
    question: "React's documentation favors composition over inheritance. Which statements accurately describe why?",
    type: "multi",
    options: [
      "Inheritance between components is impossible to express in JavaScript, so composition is the only technically valid option",
      "Composition lets you build flexible UIs by combining simple components rather than building deep class hierarchies",
      "React's team has found no use case that requires a component inheritance hierarchy to solve well",
      "Passing components or elements as props (including `children`) gives you the flexibility that inheritance hierarchies are often used for in other UI frameworks",
    ],
    correctIndexes: [1, 2, 3],
    explanation:
      "JavaScript classes can technically be extended, but React specifically recommends composition (props, `children`, slots) because it solves customization and code reuse more flexibly than inheritance, not because inheritance is unusable in JavaScript.",
  },
  {
    id: "compose-3",
    question: "In the render props pattern, how does a component share logic or state with its consumer?",
    type: "single",
    options: [
      "It exports its internal state as a global variable that any component can import",
      "It accepts a prop whose value is a function, and calls that function with data, using its return value as what to render",
      "It requires the consumer to extend it as a base class and override a `render` method",
      "It writes its state directly into `localStorage` so other components can read it",
    ],
    correctIndexes: [1],
    explanation:
      "A component using the render props pattern takes a function as a prop (often literally named `render` or passed as `children`), invokes it with internal data, and renders whatever that function returns, letting the consumer control the output while the component controls the logic.",
  },
  {
    id: "compose-4",
    question: "What characterizes the compound components pattern, as seen in something like `<Tabs><Tabs.List /><Tabs.Panel /></Tabs>`?",
    type: "multi",
    options: [
      "A set of components implicitly share state or behavior, typically via context, while presenting a clear, related API to the consumer",
      "The parent component exposes related child components as properties on itself, such as `Tabs.List`",
      "The consumer can rearrange, omit, or restyle the individual subcomponents while the group still functions as a coordinated whole",
      "Each subcomponent must independently duplicate all of the parent's internal state to work correctly",
    ],
    correctIndexes: [0, 1, 2],
    explanation:
      "Compound components coordinate implicitly (often through context) rather than by duplicating state, and they give consumers flexible control over layout and composition while still working together as one cohesive unit.",
  },
  {
    id: "compose-5",
    question: "A higher-order component (HOC) is a function that takes a component and returns a new, enhanced component. Which statements about HOCs are true?",
    type: "multi",
    options: [
      "An HOC is a composition technique for reusing logic across components without repeating that logic in each one",
      "An HOC mutates the original component it receives, rather than returning a new one",
      "Custom hooks have replaced many use cases for HOCs in modern React, since they let you reuse stateful logic without wrapping components",
      "A common naming convention for HOCs is a `with` prefix, such as `withAuth` or `withTheme`",
    ],
    correctIndexes: [0, 2, 3],
    explanation:
      "HOCs are meant to wrap and return a new component (not mutate the original) as a way to share cross-cutting logic; in modern React, custom hooks often achieve the same reuse goals more directly for stateful logic.",
  },
];
