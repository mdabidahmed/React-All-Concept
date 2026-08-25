import type { QuizQuestion } from "../../types/quiz";

export const performanceQuestions: QuizQuestion[] = [
  {
    id: "perf-1",
    question: "What does `useMemo(() => computeExpensiveValue(a, b), [a, b])` do?",
    type: "single",
    options: [
      "It recomputes and caches `computeExpensiveValue(a, b)` only when `a` or `b` changes between renders, reusing the cached value otherwise",
      "It guarantees `computeExpensiveValue` is only ever called once for the lifetime of the component",
      "It runs `computeExpensiveValue` in a background thread so it never blocks rendering",
      "It delays the computation until the browser is idle, regardless of `a` or `b`",
    ],
    correctIndexes: [0],
    explanation:
      "`useMemo` caches the result of a computation between renders and only recomputes it when a dependency changes; it does not guarantee a single call forever, nor does it move work off the main thread.",
  },
  {
    id: "perf-2",
    question: "Why is it inaccurate to say `useMemo` guarantees a value is never recomputed unnecessarily?",
    type: "single",
    options: [
      "React may still discard the memoized cache and recompute in certain situations, such as under Strict Mode's double-invocation or low-memory conditions, so `useMemo` is an optimization hint, not a strict guarantee",
      "`useMemo` recomputes on literally every render regardless of dependencies, making it useless",
      "`useMemo` only works for numeric values, not for objects or arrays",
      "It is actually fully accurate; `useMemo` provides a strict guarantee in all cases",
    ],
    correctIndexes: [0],
    explanation:
      "React's documentation is explicit that `useMemo` is a performance optimization, not a semantic guarantee; React may choose to 'forget' a memoized value in certain cases, so code should not rely on it for correctness, only for speed.",
  },
  {
    id: "perf-3",
    question: "What is the main purpose of `useCallback(fn, deps)`?",
    type: "single",
    options: [
      "It returns the same function reference across renders as long as the dependencies haven't changed, instead of creating a brand-new function each render",
      "It caches the return value of calling `fn` so the function body never runs again",
      "It automatically debounces the function so it can only run once per second",
      "It converts a regular function into an async function",
    ],
    correctIndexes: [0],
    explanation:
      "`useCallback` memoizes the function reference itself; without it, a new function object is created on every render, which matters when that reference is compared for equality, such as in a dependency array or a memoized child's props.",
  },
  {
    id: "perf-4",
    question: "A parent passes `onSave={handleSave}` to a child wrapped in `React.memo`, where `handleSave` is defined inline in the parent's function body without `useCallback`. What happens on each parent re-render?",
    type: "single",
    options: [
      "The child still re-renders, because a new `handleSave` function reference is created every render, which fails `React.memo`'s shallow prop comparison",
      "The child never re-renders, because `React.memo` compares function bodies rather than references",
      "React automatically wraps inline functions in `useCallback` behind the scenes, so no re-render occurs",
      "The app crashes because `React.memo` cannot accept function props",
    ],
    correctIndexes: [0],
    explanation:
      "`React.memo` does a shallow comparison of props by reference; a function defined inline is a new object identity every render, so the child re-renders even though `React.memo` was applied, unless the function is memoized with `useCallback`.",
  },
  {
    id: "perf-5",
    question: "Which statements correctly describe `React.memo`?",
    type: "multi",
    options: [
      "By default it shallowly compares each prop to its previous value and skips re-rendering if all props are reference-equal",
      "It prevents a component from ever re-rendering, even if its own internal state changes",
      "It accepts an optional custom comparison function as a second argument for cases where shallow equality isn't sufficient",
      "Wrapping every component in `React.memo` is generally recommended regardless of whether it re-renders often with the same props",
    ],
    correctIndexes: [0, 2],
    explanation:
      "`React.memo` only skips a re-render triggered by the parent when props are shallowly equal; it does not block re-renders from the component's own state or context changes, and wrapping everything indiscriminately adds comparison overhead that isn't always worth it.",
  },
  {
    id: "perf-6",
    question: "By default, when a parent component re-renders, what happens to its child components?",
    type: "single",
    options: [
      "All of its child components re-render too, even if the props passed to them didn't change",
      "Children only re-render if the specific props passed to them changed, without any extra configuration needed",
      "Children never re-render unless their own state changes",
      "Only children that use `useState` re-render; stateless children are automatically skipped",
    ],
    correctIndexes: [0],
    explanation:
      "React's default behavior is that a re-render cascades down to all descendants regardless of whether their props actually changed; skipping unchanged children requires an explicit optimization such as `React.memo`.",
  },
  {
    id: "perf-7",
    question: "Which of the following can cause a function component to re-render?",
    type: "multi",
    options: [
      "Its own state changing via a `useState` or `useReducer` setter",
      "Its parent component re-rendering, by default",
      "A context value it consumes via `useContext` changing",
      "A sibling component's state changing, even if there is no shared parent re-render or context between them",
    ],
    correctIndexes: [0, 1, 2],
    explanation:
      "Renders are triggered by a component's own state changes, its parent re-rendering, or a consumed context value changing; an unrelated sibling with no shared context or parent-render path does not cause a re-render on its own.",
  },
  {
    id: "perf-8",
    question: "Why is `<Widget config={{ size: \"large\" }} />` written inline in a parent's JSX potentially a performance concern for a memoized `Widget`?",
    type: "single",
    options: [
      "A new object literal is created on every render, so `config` has a different reference each time, defeating `React.memo`'s shallow comparison",
      "Object literals in JSX are parsed more slowly by the browser than variables",
      "JSX does not support passing plain objects as props at all",
      "It causes a memory leak because the object is never garbage collected",
    ],
    correctIndexes: [0],
    explanation:
      "Inline object, array, and function literals are recreated with a new identity on every render; even though the contents look the same, `React.memo`'s default shallow prop comparison treats them as changed, causing the memoized child to re-render anyway.",
  },
  {
    id: "perf-9",
    question: "Which of these are legitimate ways to avoid the cost of a fresh object being created as a prop on every parent render?",
    type: "multi",
    options: [
      "Wrap the object creation in `useMemo` so the same reference is reused when its dependencies are unchanged",
      "Hoist the object literal to a constant outside the component if its contents never change",
      "Rename the prop so `React.memo` treats it as a primitive value",
      "Pass the individual primitive fields as separate props instead of one object, if the child only needs specific values",
    ],
    correctIndexes: [0, 1, 3],
    explanation:
      "Memoizing the object, hoisting a truly static object outside the component, or restructuring props into primitives all avoid creating a new reference each render; renaming a prop has no effect on how its value is compared.",
  },
  {
    id: "perf-10",
    question: "A developer wraps every function in their component with `useCallback` and every derived value with `useMemo`, even for a component that renders rarely and has no memoized children. What is the likely outcome?",
    type: "single",
    options: [
      "Little to no measurable benefit, while adding code complexity and the overhead of dependency comparisons on every render",
      "A guaranteed significant performance improvement in all cases",
      "The component will stop re-rendering entirely",
      "React will throw a warning that memoization is being used incorrectly",
    ],
    correctIndexes: [0],
    explanation:
      "Memoization itself has a cost, comparing dependency arrays and retaining cached values, so applying it where there is no expensive computation or no memoized consumer to benefit is a case of premature optimization that adds complexity without a payoff.",
  },
  {
    id: "perf-11",
    question: "In general, when is memoization (`useMemo`, `useCallback`, `React.memo`) actually worth applying?",
    type: "single",
    options: [
      "When profiling or reasoning about the code shows an expensive computation, a costly re-render, or a broken reference-equality dependency that is causing a real, measurable problem",
      "On every single component and function in the codebase, as a universal default",
      "Only in components that use `useState`",
      "Only when the component is exported as the default export of its file",
    ],
    correctIndexes: [0],
    explanation:
      "Memoization is a targeted tool for a demonstrated cost, an expensive calculation, an expensive subtree re-render, or an unstable reference breaking another optimization or effect; applying it everywhere by default is premature optimization that trades simplicity for little gain.",
  },
  {
    id: "perf-12",
    question: "What does `const LazyChart = React.lazy(() => import('./Chart'));` combined with wrapping its usage in `<Suspense fallback={<Spinner />}>` achieve?",
    type: "single",
    options: [
      "The `Chart` component's code is split into a separate bundle chunk and only downloaded when it's actually needed, showing the fallback while it loads",
      "It caches the rendered output of `Chart` so it never needs to re-render",
      "It runs `Chart`'s rendering logic on the server instead of the client",
      "It converts `Chart` into a Web Worker that runs off the main thread",
    ],
    correctIndexes: [0],
    explanation:
      "`React.lazy` enables code-splitting by dynamically importing a component, so its code is fetched only when it's rendered; `Suspense` provides the fallback UI to show while that chunk is loading, which reduces the initial bundle size.",
  },
  {
    id: "perf-13",
    question: "Why does `React.lazy` require a `Suspense` boundary somewhere above it in the tree?",
    type: "single",
    options: [
      "Because the lazily loaded component isn't available synchronously on first render, and `Suspense` provides the fallback to show while the code is being fetched",
      "Because `React.lazy` cannot render any component without `Suspense` present, even after the code has fully loaded",
      "Because `Suspense` is required to enable code-splitting at the bundler level",
      "Because `React.lazy` components must be class components, and `Suspense` converts them automatically",
    ],
    correctIndexes: [0],
    explanation:
      "Loading a code-split chunk is asynchronous, so React needs a fallback to display in the meantime; `Suspense` is what catches that pending state and renders the fallback until the component's module has finished loading.",
  },
  {
    id: "perf-14",
    question: "When rendering a list with `.map()`, why does React recommend using a stable, unique `key` for each item rather than the array index?",
    type: "single",
    options: [
      "A stable key lets React correctly match each rendered element to the same underlying item across renders, even if items are reordered, inserted, or removed",
      "The `key` prop is purely cosmetic and only affects what appears in the browser's dev tools",
      "Using the array index as a key always causes a runtime error",
      "Keys are only relevant for lists rendered inside a `<table>` element",
    ],
    correctIndexes: [0],
    explanation:
      "React uses `key` to identify which array item each rendered element corresponds to between renders; a stable identity-based key (like an id) lets React reuse DOM nodes and component state correctly, whereas an index can misattribute state when the list is reordered or filtered.",
  },
  {
    id: "perf-15",
    question: "A todo list uses `key={index}` from `.map()`, and items can be reordered or deleted. What problem can this specifically cause?",
    type: "single",
    options: [
      "Component state tied to a specific list item, such as an input's local editing state, can appear to jump to the wrong item after the list changes order",
      "React will refuse to render the list at all and log a fatal error",
      "The list will render items in a random order every time",
      "It causes a memory leak that grows unbounded over time",
    ],
    correctIndexes: [0],
    explanation:
      "When items shift position, index-based keys cause React to associate the wrong array item with an existing element and its component state, since the index no longer maps to the same underlying item, which can make local state appear to leak between rows.",
  },
  {
    id: "perf-16",
    question: "Which situations are reasonably safe for using the array index as the `key` prop?",
    type: "multi",
    options: [
      "The list is static and will never be reordered, filtered, or have items inserted or removed",
      "The items have no internal state and are never reordered",
      "The list is frequently reordered by drag-and-drop",
      "Items can be added to or removed from the middle of the list at runtime",
    ],
    correctIndexes: [0, 1],
    explanation:
      "Index keys are only safe when the list order and membership are stable for the component's lifetime; once items can be reordered or inserted and removed from the middle, index keys can cause React to misattribute state and DOM nodes to the wrong items.",
  },
  {
    id: "perf-17",
    question: "A component re-renders far more often than expected. Which of these are plausible, genuine causes worth investigating?",
    type: "multi",
    options: [
      "A parent higher in the tree re-renders on every keystroke and this component isn't memoized",
      "A context value used by the component is a new object created on every render of its Provider",
      "The component calls `useState` once at the top level of its function body",
      "An effect's dependency array includes a new array or object literal that changes identity every render",
    ],
    correctIndexes: [0, 1, 3],
    explanation:
      "Cascading parent re-renders, unstable context values, and unstable effect dependencies are all common, genuine causes of excess re-renders; simply calling `useState` once at the top level, the normal and correct way to use it, is not itself a problem.",
  },
  {
    id: "perf-18",
    question: "What does the phrase 'referential equality' mean in the context of comparing two objects like `{ a: 1 }` and `{ a: 1 }` in JavaScript?",
    type: "single",
    options: [
      "The two objects are different references in memory and are not `===` equal, even though their contents look the same",
      "The two objects are automatically considered equal by JavaScript because their properties match",
      "Referential equality only applies to primitive values like numbers and strings, not objects",
      "React always performs a deep comparison of object contents to determine referential equality",
    ],
    correctIndexes: [0],
    explanation:
      "Two separately created objects with identical contents are still distinct references in memory, so `{ a: 1 } === { a: 1 }` is `false`; this is exactly why newly created objects and functions defeat shallow prop comparisons like the one `React.memo` performs by default.",
  },
  {
    id: "perf-19",
    question: "A developer wraps a callback in `useCallback(fn, [])` and passes it to a plain (non-memoized) child component, expecting this to prevent the child from re-rendering. Why won't it work as expected?",
    type: "single",
    options: [
      "`useCallback` only stabilizes the function reference; it does nothing to stop a re-render unless the receiving child itself is wrapped in `React.memo`",
      "`useCallback` with an empty dependency array is invalid and will throw an error",
      "The child will still re-render because `useCallback` recreates the function on every render regardless of the dependency array",
      "`useCallback` only works when passed to native DOM elements, not custom components",
    ],
    correctIndexes: [0],
    explanation:
      "`useCallback` alone only keeps the function reference stable across renders; without `React.memo` (or similar) on the child, the child has no mechanism to skip re-rendering just because one of its props happens to be reference-stable.",
  },
  {
    id: "perf-20",
    question: "Which of these are accurate reasons to reach for `useMemo` on a computed value?",
    type: "multi",
    options: [
      "The computation is measurably expensive (for example, sorting or filtering a large array) and runs on every render",
      "The resulting value is passed as a prop to a `React.memo`-wrapped child and needs a stable reference to avoid defeating that memoization",
      "The value is a simple derived primitive, like doubling a number, that's cheap to recompute regardless of memoization",
      "The value is used as a dependency in another hook's dependency array, and an unstable reference there would cause that hook to re-run unnecessarily on every render",
    ],
    correctIndexes: [0, 1, 3],
    explanation:
      "`useMemo` earns its keep when the computation itself is costly, or when a stable reference is needed to satisfy another memoized consumer or dependency array; for a genuinely cheap computation like doubling a number, the memoization overhead isn't worth paying.",
  },
];
