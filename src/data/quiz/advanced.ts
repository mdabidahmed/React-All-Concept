import type { QuizQuestion } from "../../types/quiz";

export const advancedQuestions: QuizQuestion[] = [
  {
    id: "adv-1",
    question: "What does `ReactDOM.createPortal(child, container)` do?",
    type: "single",
    options: [
      "Renders `child` into the given DOM node while keeping it inside the React component tree for context and event purposes",
      "Renders `child` into a completely separate React root that shares no context with the parent tree",
      "Moves the given DOM `container` node into the React component tree at the call site",
      "Creates a new browser window and renders `child` inside it",
    ],
    correctIndexes: [0],
    explanation:
      "A portal renders its children into a different DOM location, but the rendered node stays part of the normal React tree, so context and event handling behave as if it had not moved.",
  },
  {
    id: "adv-2",
    question: "Which scenario is a well-motivated use case for `createPortal`?",
    type: "single",
    options: [
      "Rendering a modal dialog so it visually escapes a parent container with `overflow: hidden` or a low `z-index` stacking context",
      "Preventing a component from re-rendering when its props change",
      "Sharing state between two sibling components without lifting state up",
      "Fetching data before a component mounts",
    ],
    correctIndexes: [0],
    explanation:
      "Portals let you render markup outside a DOM ancestor that clips or stacks content, which is exactly the problem with modals, tooltips, and dropdown menus.",
  },
  {
    id: "adv-3",
    question:
      "A button rendered through a portal into a `<div>` at the end of `document.body` is clicked. What happens to the resulting click event in React?",
    type: "single",
    options: [
      "It bubbles up through the React component tree the button is logically part of, not through its DOM ancestors",
      "It does not bubble at all, because portal content is outside the DOM tree",
      "It only bubbles through the DOM ancestors of the portal's target container",
      "It bubbles through both the DOM ancestors and the React tree, firing matching handlers twice",
    ],
    correctIndexes: [0],
    explanation:
      "Even though the DOM node lives elsewhere in the document, React still dispatches the event according to the component hierarchy, so parent handlers in that React tree still fire.",
  },
  {
    id: "adv-4",
    question: "What is the primary purpose of a `Suspense` boundary?",
    type: "single",
    options: [
      "Show a fallback UI while descendants are not yet ready to render, such as a lazy-loaded component still being fetched",
      "Catch and display errors thrown anywhere in the component tree",
      "Automatically retry a failed network request",
      "Delay rendering until all CSS has finished loading",
    ],
    correctIndexes: [0],
    explanation:
      "`Suspense` lets a subtree signal it isn't ready yet and shows the `fallback` prop until it is, which is how `React.lazy` displays a loading state while its module is fetched.",
  },
  {
    id: "adv-5",
    question: "Which snippet correctly lazy-loads a component with `React.lazy`?",
    type: "single",
    options: [
      "`const Profile = React.lazy(() => import('./Profile'));`",
      "`const Profile = React.lazy(import('./Profile'));`",
      "`const Profile = React.lazy(() => require('./Profile'));`",
      "`const Profile = React.lazy('./Profile');`",
    ],
    correctIndexes: [0],
    explanation:
      "`React.lazy` takes a function that returns a promise resolving to a module with a default export, and `import()` is exactly that kind of dynamic-import promise.",
  },
  {
    id: "adv-6",
    question: "Which statements about `Suspense` are true?",
    type: "multi",
    options: [
      "A component wrapped in `React.lazy` must be rendered inside a `Suspense` boundary that provides a `fallback`",
      "`Suspense` alone will catch and handle a JavaScript error thrown during rendering",
      "`Suspense` does not remove the need for an error boundary to handle rendering errors",
      "The fallback can be shown again later if the subtree suspends a second time, such as when navigating to another lazy-loaded route",
    ],
    correctIndexes: [0, 2, 3],
    explanation:
      "Suspense only handles the case where a subtree is not yet ready and can trigger its fallback whenever a wrapped subtree suspends, but it does not catch thrown errors, so a separate error boundary is still required.",
  },
  {
    id: "adv-7",
    question: "What is the main benefit of code-splitting a large application with dynamic `import()`?",
    type: "single",
    options: [
      "The initial JavaScript bundle sent to the browser is smaller, since some code is fetched only when it's needed",
      "It eliminates the need for a build tool like Vite or webpack",
      "It automatically minifies all CSS in the project",
      "It guarantees a component will never re-render unnecessarily",
    ],
    correctIndexes: [0],
    explanation:
      "Splitting code into separate chunks that load on demand reduces how much JavaScript the browser must download and parse before the app becomes interactive.",
  },
  {
    id: "adv-8",
    question: "In pre-React 19 code, what problem does `forwardRef` solve?",
    type: "single",
    options: [
      "By default, function components cannot receive a `ref` prop that points to one of their own DOM nodes or children, so `forwardRef` lets a parent's ref reach through to an inner element",
      "It allows a component to skip re-rendering when its parent re-renders",
      "It lets a component read another component's state directly",
      "It converts a class component into a function component automatically",
    ],
    correctIndexes: [0],
    explanation:
      "Function components don't automatically expose a DOM node the way class component instances do, so `forwardRef` was the mechanism for passing a `ref` through to an underlying element or component.",
  },
  {
    id: "adv-9",
    question: "What is the correct signature for a component defined with `forwardRef`?",
    type: "single",
    options: [
      "`forwardRef((props, ref) => { ... })`",
      "`forwardRef((ref, props) => { ... })`",
      "`forwardRef((props) => { ... }, ref)`",
      "`forwardRef(ref => { ... })`",
    ],
    correctIndexes: [0],
    explanation:
      "`forwardRef` wraps a render function that receives `props` as the first argument and the forwarded `ref` as the second.",
  },
  {
    id: "adv-10",
    question: "What changed in React 19 regarding `ref`?",
    type: "single",
    options: [
      "Function components can now accept `ref` as a regular prop directly, without needing to wrap the component in `forwardRef`",
      "Class components can no longer accept a `ref`",
      "`ref` can now only be used on components created with `forwardRef`",
      "`useRef` was removed in favor of `forwardRef` for all use cases",
    ],
    correctIndexes: [0],
    explanation:
      "React 19 lets `ref` be read as an ordinary prop on function components, so `forwardRef` is now only needed for backward compatibility rather than as the sole way to receive a ref.",
  },
  {
    id: "adv-11",
    question:
      "A component needs to expose a custom imperative method, like `focus()`, to its parent instead of exposing its raw DOM node. Which hook is typically paired with a forwarded ref to do this?",
    type: "single",
    options: ["`useImperativeHandle`", "`useLayoutEffect`", "`useReducer`", "`useDeferredValue`"],
    correctIndexes: [0],
    explanation:
      "`useImperativeHandle` customizes the value exposed on a forwarded ref, letting a component present a curated method instead of its underlying DOM node.",
  },
  {
    id: "adv-12",
    question: "What best describes the Higher-Order Component (HOC) pattern?",
    type: "single",
    options: [
      "A function that takes a component as an argument and returns a new component with added behavior or props",
      "A component that renders itself recursively without a base case",
      "A React hook that replaces the need for props entirely",
      "A component that can only be used at the very top of the component tree",
    ],
    correctIndexes: [0],
    explanation:
      "An HOC is a plain function, not a component itself, that wraps an input component to inject props, subscribe to data, or otherwise extend its behavior, and returns the wrapped result.",
  },
  {
    id: "adv-13",
    question:
      "By convention, how should a Higher-Order Component that wraps `UserList` and adds loading behavior be named?",
    type: "single",
    options: ["`withLoading`", "`UserListLoading`", "`LoadingUserList`", "`useLoading`"],
    correctIndexes: [0],
    explanation:
      "The `withX` naming convention signals that the function wraps a component to add the named capability, distinguishing it from a hook, which would start with `use`.",
  },
  {
    id: "adv-14",
    question: "Which are genuine drawbacks of overusing the HOC pattern compared to hooks?",
    type: "multi",
    options: [
      "Wrapping components in multiple HOCs can create deeply nested layers that are hard to trace in dev tools, sometimes called wrapper hell",
      "Different HOCs may inject props with colliding names, causing silent conflicts",
      "HOCs cannot be written in TypeScript",
      "HOCs always prevent the wrapped component from receiving any props",
    ],
    correctIndexes: [0, 1],
    explanation:
      "Stacking several HOCs nests components deeply and makes prop origins harder to track, and independently written HOCs have no built-in way to avoid naming collisions in the props they inject.",
  },
  {
    id: "adv-15",
    question: "Which React Router component renders UI only when the current URL matches its configured path?",
    type: "single",
    options: ["`<Route>`", "`<Link>`", "`<Outlet>`", "`<Router>`"],
    correctIndexes: [0],
    explanation:
      "`<Route>` maps a path pattern to an element, rendering that element only when the current location matches.",
  },
  {
    id: "adv-16",
    question: "Which statements about `<Link>` compared to a plain `<a>` tag in a React Router app are true?",
    type: "multi",
    options: [
      "`<Link>` performs client-side navigation without a full page reload, preserving in-memory app state",
      "`<Link>` updates the browser's URL and history without requesting a new HTML document from the server",
      "`<Link>` cannot be styled with CSS the way an `<a>` tag can",
      "`<Link>` prevents the destination URL from ever being visible to the user",
    ],
    correctIndexes: [0, 1],
    explanation:
      "`<Link>` intercepts the click, updates history through the router, and re-renders the matched route client-side, avoiding the full-document reload of a normal anchor while still rendering as a real, stylable anchor element.",
  },
  {
    id: "adv-17",
    question: "Which React Router hooks are correctly described?",
    type: "multi",
    options: [
      "`useParams` returns an object of dynamic segments matched from the current URL, such as `{ id: '42' }` for a route like `/users/:id`",
      "`useNavigate` returns a function you can call to programmatically change the current route",
      "`useParams` triggers a network request to fetch the route's data automatically",
      "`useNavigate` re-renders every component in the app whenever it is called",
    ],
    correctIndexes: [0, 1],
    explanation:
      "`useParams` just reads the matched path segments into an object, and `useNavigate` gives you an imperative function for redirecting, neither of which performs data fetching or forces an app-wide re-render on its own.",
  },
  {
    id: "adv-18",
    question: "What does `<Outlet>` render in a nested React Router route configuration?",
    type: "single",
    options: [
      "The matched child route's element, at the position where `<Outlet>` is placed in the parent route's layout",
      "A list of all available routes as navigation links",
      "The current URL as plain text",
      "A fallback error page when no route matches",
    ],
    correctIndexes: [0],
    explanation:
      "`<Outlet>` is a placeholder in a parent layout route that gets replaced by whichever nested child route currently matches, enabling shared layouts.",
  },
  {
    id: "adv-19",
    question:
      "A component is removed from a list and React unmounts its DOM node immediately. Why can't a plain CSS `transition` on that element play an exit animation?",
    type: "single",
    options: [
      "The DOM node is already gone before the transition would have time to run, since a plain unmount removes it synchronously",
      "CSS transitions only work on elements that use `position: absolute`",
      "React blocks all CSS transitions on unmounting elements for performance reasons",
      "CSS transitions require the element's `className` to remain unchanged for its entire lifecycle",
    ],
    correctIndexes: [0],
    explanation:
      "A CSS transition needs the element to stay in the DOM while its styles change over time, but a plain unmount removes the node immediately, so a library that delays removal until the animation finishes is needed to animate exits.",
  },
  {
    id: "adv-20",
    question: "Which of the following correctly describe error boundaries in React?",
    type: "multi",
    options: [
      "They must be implemented as class components using `static getDerivedStateFromError` and/or `componentDidCatch`",
      "They catch errors thrown during rendering, in lifecycle methods, and in constructors of the component tree below them",
      "They catch errors thrown inside event handlers, such as an `onClick` callback",
      "`getDerivedStateFromError` is used to update state and render a fallback UI, while `componentDidCatch` is typically used for side effects like logging the error",
    ],
    correctIndexes: [0, 1, 3],
    explanation:
      "Error boundaries only catch errors from rendering and lifecycle code below them in the tree, not from event handlers or asynchronous code, and there is still no function-component equivalent, so they remain one of the few places classes are required.",
  },
];
