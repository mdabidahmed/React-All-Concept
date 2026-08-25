import type { QuizQuestion } from "../../types/quiz";

export const hooksQuestions: QuizQuestion[] = [
  {
    id: "hook-1",
    question: "What does calling the state setter from `useState` do when the new value is different from the current one?",
    type: "single",
    options: [
      "It schedules a re-render with the updated state on the next render",
      "It immediately mutates the state variable in place",
      "It merges the new value into the existing state object automatically",
      "It triggers a synchronous re-render before the next line of code runs",
    ],
    correctIndexes: [0],
    explanation:
      "Calling a `useState` setter schedules an update; React re-renders the component with the new value, but the update is not applied synchronously to the variable you already have in scope.",
  },
  {
    id: "hook-2",
    question: "Unlike `this.setState` in class components, what does the `useState` setter do with object state?",
    type: "single",
    options: [
      "It replaces the entire state value rather than merging it with the previous object",
      "It deep merges the new object into the previous state object",
      "It shallow merges only the top-level keys automatically",
      "It merges arrays but replaces plain objects",
    ],
    correctIndexes: [0],
    explanation:
      "`useState` always replaces the previous value with whatever you pass to the setter; there is no automatic merging, so you must manually spread the previous state when updating an object.",
  },
  {
    id: "hook-3",
    question: "Why should you use the functional updater form, `setCount(c => c + 1)`, instead of `setCount(count + 1)` in some cases?",
    type: "single",
    options: [
      "It guarantees the update is based on the most recent state, even if multiple updates are queued from the same event",
      "It is required syntax and `setCount(count + 1)` will throw an error",
      "It makes the update happen synchronously instead of being batched",
      "It is only a stylistic preference with no functional difference",
    ],
    correctIndexes: [0],
    explanation:
      "The functional form receives the latest pending state as its argument, so multiple queued updates compose correctly instead of each one reading the same stale `count` from the closure.",
  },
  {
    id: "hook-4",
    question: "Which of the following are true about React's batching of state updates inside an event handler?",
    type: "multi",
    options: [
      "Multiple `setState` calls triggered by the same event handler are typically grouped into a single re-render",
      "Batching means React waits until the end of the event handler to apply all queued updates at once",
      "Batching guarantees that state variables are updated synchronously before the next line of code executes",
      "React 18+ extends automatic batching to updates inside promises, timeouts, and native event handlers, not just React event handlers",
    ],
    correctIndexes: [0, 1, 3],
    explanation:
      "React batches updates within an event handler to avoid redundant renders, and since React 18 this automatic batching also applies to async callbacks like promises and `setTimeout`; state is still not updated synchronously in place.",
  },
  {
    id: "hook-5",
    question: "A component calls `useState(getInitialValue())` where `getInitialValue` is an expensive function. What is the recommended fix?",
    type: "single",
    options: [
      "Pass the function itself, `useState(getInitialValue)`, so it only runs once on the initial render",
      "Wrap the whole component in `useMemo` to avoid recomputation",
      "Move the call outside the component entirely, since there is no other way to avoid recomputation",
      "It does not matter because `useState` only ever evaluates its argument once regardless of how it is written",
    ],
    correctIndexes: [0],
    explanation:
      "Passing a function as the initializer (lazy initial state) tells React to call it only once, on mount, whereas passing `getInitialValue()` directly re-invokes the expensive function on every render even though only the first result is used.",
  },
  {
    id: "hook-6",
    question: "What runs when a component with `useEffect(() => { ... }, [])` first mounts?",
    type: "single",
    options: [
      "The effect function runs once, after React commits the DOM changes and the browser paints",
      "The effect function runs once, before React commits any DOM changes",
      "The effect function runs on every render because the empty array is ignored",
      "The effect function never runs because there are no dependencies to trigger it",
    ],
    correctIndexes: [0],
    explanation:
      "A common misconception is that `[]` makes the effect run before paint; in reality `useEffect` always runs asynchronously after the browser has painted, and `[]` just means it runs only once, on mount.",
  },
  {
    id: "hook-7",
    question: "In `useEffect(() => { doSomething(count); }, [count])`, when does the effect re-run?",
    type: "single",
    options: [
      "After any render where `count` is different from its value during the previous render",
      "After every single render of the component, regardless of `count`",
      "Only once, when the component first mounts",
      "Only when `count` changes and the component also re-renders for an unrelated reason",
    ],
    correctIndexes: [0],
    explanation:
      "React compares each dependency to its value from the previous render using `Object.is`; the effect re-runs only when at least one dependency, here `count`, has changed.",
  },
  {
    id: "hook-8",
    question: "What happens if you omit the dependency array entirely, as in `useEffect(() => { ... })`?",
    type: "single",
    options: [
      "The effect runs after every render of the component",
      "The effect runs only once, on mount, the same as passing `[]`",
      "React throws a runtime error because the dependency array is required",
      "The effect never runs since React cannot determine when to trigger it",
    ],
    correctIndexes: [0],
    explanation:
      "With no dependency array, React has no way to skip re-running the effect, so it runs after every completed render, which is rarely what you want for anything but debugging.",
  },
  {
    id: "hook-9",
    question: "What is the purpose of the function returned from an effect, e.g. `useEffect(() => { const id = setInterval(fn, 1000); return () => clearInterval(id); }, [])`?",
    type: "single",
    options: [
      "It is a cleanup function React calls before re-running the effect and when the component unmounts",
      "It is a callback React calls immediately after the effect function to confirm it ran",
      "It replaces the effect function entirely on the next render",
      "It is only invoked if the component throws an error during render",
    ],
    correctIndexes: [0],
    explanation:
      "React runs the returned cleanup function before applying a new effect (when dependencies changed) and one final time when the component unmounts, which is essential for canceling subscriptions, timers, and listeners.",
  },
  {
    id: "hook-10",
    question: "Why is `useEffect(() => { const controller = new AbortController(); fetchData(controller.signal); return () => controller.abort(); }, [id])` a better pattern than fetching without cleanup?",
    type: "single",
    options: [
      "It prevents a stale response for an old `id` from overwriting state after the component has moved on to a new `id`",
      "It makes the fetch request run synchronously so state updates immediately",
      "It is required because `useEffect` cannot make network requests without an `AbortController`",
      "It guarantees the fetch will never fail or reject",
    ],
    correctIndexes: [0],
    explanation:
      "Without cleanup, a slow response tied to a previous `id` can resolve after a newer effect run has started, causing a race condition; aborting the stale request avoids applying outdated data.",
  },
  {
    id: "hook-11",
    question: "Which statements correctly describe `useContext`?",
    type: "multi",
    options: [
      "It lets a component read the nearest matching Context Provider's value without passing props through every intermediate component",
      "A component calling `useContext(MyContext)` re-renders when the Provider's value changes",
      "You must wrap every component in the tree with a Provider or `useContext` will throw an error",
      "Context is intended to share data that many components need, such as theme or authenticated user, rather than as a full replacement for all state management",
    ],
    correctIndexes: [0, 1, 3],
    explanation:
      "`useContext` avoids prop drilling by subscribing to the nearest Provider above it; if no Provider is present, it simply falls back to the context's default value rather than throwing, and it is best suited to broadly shared, infrequently changing data.",
  },
  {
    id: "hook-12",
    question: "What problem does passing data through `useContext` primarily solve compared to plain props?",
    type: "single",
    options: [
      "Avoiding the need to manually pass a prop down through every intermediate component that does not itself use the value",
      "Making state updates happen without triggering any re-renders",
      "Automatically persisting the value to local storage",
      "Replacing the need for a state management library in every application",
    ],
    correctIndexes: [0],
    explanation:
      "Prop drilling means forwarding a prop through components that only pass it along; Context lets deeply nested components read a value directly from the nearest Provider instead.",
  },
  {
    id: "hook-13",
    question: "A reducer function is defined as `function reducer(state, action) { switch (action.type) { ... } }` for use with `useReducer`. Which statement about it is correct?",
    type: "single",
    options: [
      "It should be a pure function that returns a new state value based on the current state and the dispatched action, without mutating the existing state",
      "It should directly mutate and return the same `state` object for performance reasons",
      "It must always return a Promise so React can await the new state",
      "It is called automatically on every render regardless of whether `dispatch` was invoked",
    ],
    correctIndexes: [0],
    explanation:
      "Like a Redux-style reducer, the function passed to `useReducer` should be pure and return a brand-new state value; React compares the previous and next state to decide whether to re-render, so mutating in place can cause updates to be missed.",
  },
  {
    id: "hook-14",
    question: "When is `useReducer` generally preferred over `useState` for managing a piece of state?",
    type: "single",
    options: [
      "When the next state depends on complex logic involving multiple sub-values or several related actions that update state together",
      "Whenever the state is a single boolean flag",
      "Whenever performance is a concern, since `useReducer` always re-renders less often than `useState`",
      "Only when the component needs to fetch data from an API",
    ],
    correctIndexes: [0],
    explanation:
      "`useReducer` shines when state transitions are intertwined or numerous, since centralizing the update logic in one reducer function keeps it easier to follow and test than scattering many related `setState` calls.",
  },
  {
    id: "hook-15",
    question: "Which statements about `useRef` are true?",
    type: "multi",
    options: [
      "Updating `ref.current` does not by itself cause the component to re-render",
      "`useRef` can hold a reference to a DOM node when passed to an element's `ref` attribute",
      "A ref's `.current` value persists across renders, unlike a plain local variable declared inside the component body",
      "`useRef` triggers a re-render whenever `.current` changes, similar to `useState`",
    ],
    correctIndexes: [0, 1, 2],
    explanation:
      "Refs are a mutable box that survives across renders and can point at a DOM node, but mutating `.current` never schedules a re-render, which is precisely what distinguishes it from state.",
  },
  {
    id: "hook-16",
    question: "A component uses `const renderCount = useRef(0);` and increments `renderCount.current` inside the component body on every render. Why won't the displayed count update on screen automatically?",
    type: "single",
    options: [
      "Because mutating a ref does not schedule a re-render, so the new value is only visible the next time something else causes a render",
      "Because refs are reset to their initial value on every render",
      "Because `useRef` values can only be read inside effects, never during render",
      "Because incrementing a ref throws an error in strict mode",
    ],
    correctIndexes: [0],
    explanation:
      "Refs intentionally do not participate in React's rendering cycle, so changing `.current` never causes a re-render on its own; you would need state, or another trigger, for the UI to reflect the new count.",
  },
  {
    id: "hook-17",
    question: "Which of these correctly follow the Rules of Hooks?",
    type: "multi",
    options: [
      "Calling `useState` and `useEffect` unconditionally at the top level of a function component",
      "Calling a hook inside a regular function component or inside a custom hook",
      "Calling `useState` conditionally, only inside an `if` block, when a certain prop is truthy",
      "Calling a hook inside a nested loop that runs a variable number of times per render",
    ],
    correctIndexes: [0, 1],
    explanation:
      "Hooks must be called in the same order on every render, so they must be invoked unconditionally at the top level of a component or custom hook; calling them inside conditionals, loops, or nested functions breaks that guarantee.",
  },
  {
    id: "hook-18",
    question: "Why does React rely on hooks being called in the same order on every render?",
    type: "single",
    options: [
      "React associates each hook call with its stored state internally by call order, not by name, so a changed order would mismatch state across renders",
      "React re-parses the component's source code on every render to find hook calls",
      "The order only matters for `useEffect`, not for `useState` or `useRef`",
      "It is a stylistic convention with no actual runtime consequence",
    ],
    correctIndexes: [0],
    explanation:
      "Internally React keeps a linked list of hook state per component instance, indexed by call order; if hooks were called conditionally, the order could shift between renders and cause state to be attached to the wrong hook.",
  },
  {
    id: "hook-19",
    question: "What is the naming convention for a custom hook, and why does it matter?",
    type: "single",
    options: [
      "Its name should start with `use`, so React's linter tooling and other developers can recognize it follows the Rules of Hooks",
      "Its name should start with `with`, matching the higher-order component convention",
      "There is no required naming convention; any function name works identically",
      "It must be named exactly `useCustom` for React to treat it as a hook",
    ],
    correctIndexes: [0],
    explanation:
      "The `use` prefix is a convention (enforced by ESLint's hooks plugin) that lets tooling verify the function follows the Rules of Hooks and lets other developers know it may call other hooks internally.",
  },
  {
    id: "hook-20",
    question: "Fundamentally, what is a custom hook like `function useWindowWidth() { const [width, setWidth] = useState(window.innerWidth); useEffect(() => { ... }, []); return width; }`?",
    type: "single",
    options: [
      "A regular JavaScript function that calls other hooks internally and can be reused across multiple components",
      "A special React API that must be registered with `createContext` before use",
      "A wrapper that React compiles into a separate component under the hood",
      "A class that extends `React.Hook` to share stateful logic",
    ],
    correctIndexes: [0],
    explanation:
      "Custom hooks are plain functions; they let you extract and reuse stateful logic built from existing hooks like `useState` and `useEffect`, without changing how that logic behaves or creating a separate component.",
  },
];
