import type { QuizQuestion } from "../../types/quiz";

export const advancedPatternsQuestions: QuizQuestion[] = [
  // --- Higher-Order Components (HOC) ---
  {
    id: "adv-pat-1",
    question: "What is a higher-order component (HOC) in React?",
    type: "single",
    options: [
      "A component that renders more than one child element",
      "A React hook that manages complex state transitions",
      "A function that takes a component and returns a new component with added behavior or props",
      "A component that is rendered conditionally based on a higher-order function",
    ],
    correctIndexes: [2],
    explanation:
      "A HOC is just a function shaped like `Component => EnhancedComponent`; it produces a new component definition rather than rendering anything on its own.",
  },
  {
    id: "adv-pat-2",
    question:
      "Modern React code increasingly favors a custom hook like `useAuth()` over a HOC like `withAuth(Dashboard)` for the same job. What is a key advantage of the hook version?",
    type: "single",
    options: [
      "Hooks execute on the server while HOCs can only run in the browser",
      "The hook returns data directly to the component that calls it, so there is no extra wrapper component and prop origins stay explicit",
      "Hooks automatically memoize all returned values, while HOCs never do",
      "Hooks eliminate the need for the `Component` prop type entirely",
    ],
    correctIndexes: [1],
    explanation:
      "A custom hook is called from inside the component itself, so there's no wrapper component added to the tree and no implicitly injected props to trace — the data flow is explicit at the call site.",
  },
  {
    id: "adv-pat-3",
    question:
      "Which of the following are common real-world use cases historically solved with HOCs?",
    type: "multi",
    options: [
      "Permanently disabling React's virtual DOM diffing for a subtree",
      "Wrapping a component to redirect unauthenticated users away from a protected page (an 'auth guard')",
      "Replacing the need for a `key` prop in rendered lists",
      "Injecting props such as a fetched data object or theme values into a wrapped component",
    ],
    correctIndexes: [1, 3],
    explanation:
      "HOCs became popular for cross-cutting concerns like route or auth guards and injecting derived data or theme props; they have nothing to do with list keys or diffing internals.",
  },
  {
    id: "adv-pat-4",
    question:
      "What is a well-known drawback of composing several HOCs together, such as `withA(withB(withC(Component)))`?",
    type: "single",
    options: [
      "It causes a compile-time TypeScript error because HOCs cannot be nested",
      "It prevents the innermost component from ever re-rendering",
      "It automatically merges all props into a single object, causing a runtime crash",
      "It creates a deeply nested tree of wrapper components that is hard to trace in devtools and can make prop origins unclear",
    ],
    correctIndexes: [3],
    explanation:
      "Each HOC typically renders its own wrapper component, so stacking many of them produces a deep, hard-to-read tree ('wrapper hell'), and it can become unclear which HOC injected which prop.",
  },
  {
    id: "adv-pat-5",
    question:
      "Two HOCs, `withTheme` and `withUser`, each inject a prop named `data` into the component they wrap. What problem does this create?",
    type: "single",
    options: [
      "Whichever HOC is applied last (outermost) overwrites the `data` prop from the other, silently hiding one value from the wrapped component",
      "React throws a compile-time error because prop names must be globally unique across all HOCs",
      "Both values are automatically merged into an array so the wrapped component receives both",
      "The wrapped component receives `data` as `undefined` because of the naming conflict",
    ],
    correctIndexes: [0],
    explanation:
      "Because HOCs just set or spread props on the component they return, two HOCs using the same prop name silently collide and only one value survives — an issue composed hooks avoid, since each hook's return value is named explicitly by the caller.",
  },

  // --- Render Props ---
  {
    id: "adv-pat-6",
    question: "What is the 'render prop' pattern?",
    type: "single",
    options: [
      "A component that renders a list of other components passed to it as an array prop",
      "A prop that must be a JSX element, never a function",
      "A technique for rendering components lazily using `React.lazy`",
      "A component accepts a function as a prop (often called `render`, or as `children`) and calls it with internal data, letting the consumer decide what to render",
    ],
    correctIndexes: [3],
    explanation:
      "The component owns some internal state or logic and hands it to a function prop, so the caller controls the actual markup while the component controls the data.",
  },
  {
    id: "adv-pat-7",
    question:
      "Given `<MouseTracker render={(pos) => <p>{pos.x}, {pos.y}</p>} />`, how does `MouseTracker` most likely use the `render` prop internally?",
    type: "single",
    options: [
      "It passes `render` down as a prop to every DOM element it creates",
      "It tracks the mouse position in its own state and calls `render(position)` inside its own JSX output",
      "It calls `render()` once when the component unmounts, to clean up the position",
      "It uses `render` as the component's display name shown in devtools",
    ],
    correctIndexes: [1],
    explanation:
      "`MouseTracker` keeps the mouse coordinates in its own state and, on every render, invokes the `render` function with that state so the caller's function decides what markup appears.",
  },
  {
    id: "adv-pat-8",
    question:
      "Which statements accurately describe how the render-prop pattern differs from a higher-order component (HOC)?",
    type: "multi",
    options: [
      "Render props can only be used with class components, while HOCs work only with function components",
      "The consumer decides what to render by writing a function inline, rather than the pattern implicitly injecting extra props into a wrapped component",
      "A render-prop component's function argument can only receive a single number or string, never an object",
      "Composition is visible directly in the JSX, as components nested inside each other, rather than hidden inside a chain of function calls like `withA(withB(withC(Component)))`",
    ],
    correctIndexes: [1, 3],
    explanation:
      "Both patterns solve similar cross-cutting problems, but a render prop nests visibly in JSX and lets the caller write the rendering logic directly, whereas a HOC's composition and prop injection happen implicitly outside the JSX tree.",
  },
  {
    id: "adv-pat-9",
    question:
      "What problem is commonly nicknamed 'render prop hell', and how do custom hooks typically avoid it?",
    type: "single",
    options: [
      "Render props cause infinite re-render loops that only a custom hook's dependency array can fix",
      "Render props leak memory unless wrapped in `React.memo`, which custom hooks do automatically",
      "Nesting several render-prop components to combine their data creates deeply indented JSX; a custom hook can combine the same data with plain function calls and no extra nesting",
      "Render props cannot accept more than one argument, forcing awkward nested calls that hooks avoid by accepting arrays",
    ],
    correctIndexes: [2],
    explanation:
      "Needing data from multiple render-prop components forces nesting them inside each other's function props, producing deeply indented JSX; calling several custom hooks in a row achieves the same composition without any extra nesting.",
  },

  // --- Container / Presentational Pattern ---
  {
    id: "adv-pat-10",
    question:
      "In the container/presentational pattern, what is the responsibility of a 'presentational' component?",
    type: "single",
    options: [
      "Fetching data from an API and storing the result in its own state",
      "Receiving data and callbacks via props and rendering UI from them, without owning its own business logic or data fetching",
      "Deciding which route the user should be navigated to",
      "Managing global application state via a context provider",
    ],
    correctIndexes: [1],
    explanation:
      "A presentational component is only concerned with 'how things look' — it renders based on the props it receives and leaves data fetching and business logic to a container.",
  },
  {
    id: "adv-pat-11",
    question:
      "Why does separating presentational components from container components help with testing and reuse?",
    type: "single",
    options: [
      "Presentational components automatically generate their own unit tests",
      "Container components cannot contain any JSX, so all rendering logic must live elsewhere",
      "Presentational components are compiled separately, so they never trigger a full app rebuild",
      "A presentational component can be rendered with plain, hard-coded props in a test or a style guide, without needing to mock data fetching or application state",
    ],
    correctIndexes: [3],
    explanation:
      "Because a presentational component only depends on its props, you can render it directly with sample data in isolation, whether in a test or a component gallery, with no need to set up the surrounding data-fetching logic.",
  },
  {
    id: "adv-pat-12",
    question:
      "How has the rise of hooks blurred the traditional container/presentational split?",
    type: "multi",
    options: [
      "A custom hook can now hold the state and data-fetching logic that a container component used to hold, paired with a purely presentational component",
      "Hooks made it illegal to write a presentational component that receives props only",
      "It is now common to skip a literal wrapper container component and instead call a data-fetching hook directly inside a component that also renders UI",
      "Hooks removed the need for any component to ever manage local state",
    ],
    correctIndexes: [0, 2],
    explanation:
      "A hook such as `useUserProfile()` can now supply the data and logic a container component used to provide, so many components fetch their own data internally without a separate wrapper component, even though a purely presentational component receiving only props is still just as valid as before.",
  },

  // --- React Reconciliation ---
  {
    id: "adv-pat-13",
    question: "What is 'reconciliation' in React?",
    type: "single",
    options: [
      "The process of merging conflicting Git branches in a React project",
      "A step that converts JSX syntax into `React.createElement` calls at build time",
      "The algorithm React uses to compare the previous and next element trees and determine the minimal set of real DOM updates needed",
      "The garbage-collection process that frees memory used by unmounted components",
    ],
    correctIndexes: [2],
    explanation:
      "Reconciliation is React's diffing process: it compares the new element tree against the previous one and figures out the smallest set of changes to apply to the actual DOM.",
  },
  {
    id: "adv-pat-14",
    question:
      "A component renders `<button>` on one render and `<button>` again (same type) at the same position on the next render, just with a different `label` prop. What does React do?",
    type: "single",
    options: [
      "It updates the existing DOM node and component instance in place, preserving any internal state",
      "It unmounts the old `<button>` and mounts a brand-new one, resetting its internal state",
      "It skips re-rendering that position entirely and reuses the last output pixel-for-pixel",
      "It throws a warning because the `label` prop changed without a matching `key`",
    ],
    correctIndexes: [0],
    explanation:
      "When an element at the same position keeps the same type across renders, React updates that existing instance in place instead of tearing it down, so state tied to it survives.",
  },
  {
    id: "adv-pat-15",
    question:
      "A component conditionally renders either `<LoginForm />` or `<Dashboard />` at the same position, depending on `isLoggedIn`. When `isLoggedIn` flips, what happens to any state stored inside whichever component was previously mounted there?",
    type: "single",
    options: [
      "It is preserved automatically, since both elements occupy the same position in the tree",
      "It is discarded, because a different element type at that position causes React to unmount the old subtree and mount a new one",
      "It is preserved only if both components declare the same prop names",
      "React merges the two components' state objects together",
    ],
    correctIndexes: [1],
    explanation:
      "Reconciliation only reuses an instance when the type at a given position stays the same; switching to a different element type tears down the old subtree entirely, wiping any state it held.",
  },
  {
    id: "adv-pat-16",
    question: "Which statements about the `key` prop in lists are correct?",
    type: "multi",
    options: [
      "Using the array index as `key` is safe even when the list can be reordered, since React always falls back to comparing full item content",
      "`key` lets React match list items across re-renders by identity, which matters when items are reordered, inserted, or removed",
      "Using a stable, unique id from the underlying data as `key` (instead of the array index) avoids the state-mismatch bugs that show up when a reorderable list uses index-based keys",
      "Intentionally changing a component's `key` is a valid way to force React to fully remount it and reset its internal state",
    ],
    correctIndexes: [1, 2, 3],
    explanation:
      "`key` gives React a stable identity to match items by, so reordering doesn't just line up by position; using the array index as `key` in a reorderable list is a classic bug because state can end up attached to the wrong item, and deliberately changing `key` is a legitimate trick to force a full remount.",
  },

  // --- Debouncing and Throttling ---
  {
    id: "adv-pat-17",
    question:
      "What is the key difference between debouncing and throttling an event handler?",
    type: "single",
    options: [
      "Debouncing and throttling both guarantee the handler runs exactly once per second",
      "Throttling waits for a pause in events, while debouncing runs the handler on a fixed interval",
      "Debouncing and throttling are two names for the same technique, just used by different libraries",
      "Debouncing waits for a pause in events before running once, while throttling runs at most once per fixed time interval regardless of how many events fire",
    ],
    correctIndexes: [3],
    explanation:
      "Debounce delays execution until the events stop for a set period, while throttle simply caps how often the handler can run, letting it fire repeatedly at a steady rate while events continue.",
  },
  {
    id: "adv-pat-18",
    question:
      "A search input should only fire an API request once the user has stopped typing for 300ms. Which technique fits, and why?",
    type: "single",
    options: [
      "Throttling, because it caps the request rate to one every 300ms even while the user keeps typing",
      "Debouncing, because it fires a request on every single keystroke immediately",
      "Debouncing, because it delays the request until there is a pause in the keystroke events",
      "Throttling, because it waits indefinitely until the input loses focus",
    ],
    correctIndexes: [2],
    explanation:
      "Debounce is built for exactly this: it resets a timer on every keystroke and only fires once the events stop for the configured delay, avoiding a request per keystroke.",
  },
  {
    id: "adv-pat-19",
    question:
      "A scroll event handler updates a 'reading progress' bar and needs to run periodically while scrolling, but not on every single scroll event (which can fire dozens of times per second). Which technique fits best?",
    type: "single",
    options: [
      "Debouncing, so the handler only runs once, after scrolling has completely stopped",
      "Throttling, so the handler runs at most once every fixed interval, such as every 200ms, for the duration of the scroll",
      "Throttling, so the handler runs exactly once total, no matter how long the user scrolls",
      "Debouncing, so the handler runs on every scroll event without any delay",
    ],
    correctIndexes: [1],
    explanation:
      "Throttle keeps the handler running at a steady, capped rate during continuous scrolling, which keeps the progress bar updating live instead of only after scrolling stops.",
  },
  {
    id: "adv-pat-20",
    question:
      "Which statements correctly describe how debounce and throttle are typically implemented and used?",
    type: "multi",
    options: [
      "Debounce and throttle both require a third-party library and cannot be implemented with plain `setTimeout` and timestamps",
      "A typical throttle implementation checks a stored 'last-ran' timestamp and only invokes the function if enough time has passed since that timestamp, updating the timestamp when it runs",
      "A typical debounce implementation calls `clearTimeout` on the previous timer and starts a new `setTimeout` on every event, only letting the wrapped function run once the timer finally fires",
      "Throttling a button's click handler is a reasonable way to guard against a user accidentally triggering an action multiple times from rapid repeated clicks",
    ],
    correctIndexes: [1, 2, 3],
    explanation:
      "Debounce is commonly built by resetting a timeout on every event, throttle by comparing against a last-ran timestamp, and throttling rapid clicks is a common way to prevent duplicate submissions — none of this requires a third-party library.",
  },
];
