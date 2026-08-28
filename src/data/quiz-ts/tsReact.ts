import type { QuizQuestion } from "../../types/quiz";

export const tsReactQuestions: QuizQuestion[] = [
  {
    id: "ts-react-1",
    question:
      "Given this prop type: interface ButtonProps { label: string; disabled?: boolean; } What is true about 'disabled'?",
    type: "single",
    options: [
      "'disabled' is optional, so a consumer can omit it entirely, and inside the component its type is 'boolean | undefined'",
      "'disabled' is required, and the '?' only means it defaults to false automatically",
      "'disabled' can only ever be the literal value 'true', never 'false'",
      "The '?' has no effect on type-checking; it is purely a comment for other developers",
    ],
    correctIndexes: [0],
    explanation:
      "A '?' after a property name in an interface marks it optional, so callers may leave it out entirely; inside the component, TypeScript widens its type to include 'undefined' alongside its declared type.",
  },
  {
    id: "ts-react-2",
    question:
      "A component accepts a 'variant' prop that should only ever be 'primary', 'secondary', or 'danger'. Which prop type definition best enforces this at compile time?",
    type: "single",
    options: [
      "interface CardProps { variant: 'primary' | 'secondary' | 'danger'; }",
      "interface CardProps { variant: string; }",
      "interface CardProps { variant: any; }",
      "interface CardProps { variant?: boolean; }",
    ],
    correctIndexes: [0],
    explanation:
      "A union of string literal types restricts 'variant' to exactly those three strings, so passing an unlisted value like 'variant=\"large\"' is a compile-time error, unlike the general 'string' type, which accepts any string at all.",
  },
  {
    id: "ts-react-3",
    question:
      "What type does TypeScript infer for 'count' and for the value 'setCount' accepts, given 'const [count, setCount] = useState(0);' with no explicit type argument?",
    type: "single",
    options: [
      "number, inferred automatically from the initial value 0",
      "any, since useState cannot infer a type without an explicit type argument",
      "string, since useState internally stores all state as a string",
      "0, meaning count can never be updated to a different number",
    ],
    correctIndexes: [0],
    explanation:
      "When useState is given a primitive initial value, TypeScript infers the state's type from it, so passing 0 makes both 'count' and the value the setter accepts a number, without needing an explicit type argument.",
  },
  {
    id: "ts-react-4",
    question:
      "A component needs state that starts as 'null' but will later hold a 'User' object once data loads. Which is the correct way to type this with useState?",
    type: "single",
    options: [
      "const [user, setUser] = useState<User | null>(null);",
      "const [user, setUser] = useState(null); // TypeScript infers User automatically later",
      "const [user, setUser] = useState<User>(null);",
      "const [user, setUser] = useState(); // leave it untyped and cast later",
    ],
    correctIndexes: [0],
    explanation:
      "Without a type argument, 'useState(null)' infers the state's type as just 'null', which would reject any later assignment of a 'User' object; supplying the explicit type argument 'User | null' lets the state legally hold either value over its lifetime.",
  },
  {
    id: "ts-react-5",
    question: "Which of the following statements about typing useState in TypeScript are true?",
    type: "multi",
    options: [
      "When given a primitive initial value, like useState(0) or useState(''), TypeScript infers the state's type automatically without needing a type argument",
      "When a state value must start as null but later hold a different type, such as a fetched object, an explicit type argument (e.g., useState<User | null>(null)) is needed so the state accepts both possibilities",
      "useState always requires an explicit type argument, even for primitive initial values like 0",
      "Passing an explicit type argument to useState, like useState<User>(initialUser), means only values assignable to that type can be passed to the setter afterward",
    ],
    correctIndexes: [0, 1, 3],
    explanation:
      "TypeScript infers useState's type from a primitive initial value just fine, so an explicit type argument is mainly needed for trickier cases, like a value that starts as null but later becomes something else; once a type argument is given, the setter enforces that later updates match it.",
  },
  {
    id: "ts-react-6",
    question:
      "Why does this handler use 'React.ChangeEvent<HTMLInputElement>' as its parameter type? function handleChange(event: React.ChangeEvent<HTMLInputElement>) { console.log(event.target.value); }",
    type: "single",
    options: [
      "The generic argument tells TypeScript that 'event.target' is specifically an HTMLInputElement, so accessing 'event.target.value' is type-safe; without it, 'target' would be typed too generically to have a 'value' property",
      "The generic argument only affects how the event bubbles through the DOM, not its TypeScript type",
      "'React.ChangeEvent' behaves identically with or without a generic argument; it is purely stylistic",
      "The generic argument specifies which CSS class the input element must have",
    ],
    correctIndexes: [0],
    explanation:
      "'React.ChangeEvent<HTMLInputElement>' narrows 'event.target' to an HTMLInputElement, which has a 'value' property; leaving out the generic argument, or using a more general event target type, would make 'event.target.value' a type error since generic DOM targets don't guarantee a 'value' property.",
  },
  {
    id: "ts-react-7",
    question:
      "Which event type correctly describes the parameter of a click handler attached to a <button> element via onClick?",
    type: "single",
    options: [
      "React.MouseEvent<HTMLButtonElement>",
      "React.ChangeEvent<HTMLButtonElement>",
      "React.KeyboardEvent<HTMLButtonElement>",
      "Event<HTMLButtonElement>",
    ],
    correctIndexes: [0],
    explanation:
      "Click interactions are represented by React's MouseEvent type; ChangeEvent is for value changes like inputs, KeyboardEvent is for key presses, and plain 'Event' isn't how React's synthetic events are typed with an element type argument.",
  },
  {
    id: "ts-react-8",
    question: "Which of the following statements about typing React event handlers are true?",
    type: "multi",
    options: [
      "React.ChangeEvent<HTMLInputElement> is commonly used for onChange handlers on <input> elements, giving 'event.target.value' the type string",
      "React.MouseEvent<HTMLButtonElement> is appropriate for typing an onClick handler on a <button>",
      "The generic type argument, like HTMLInputElement, is optional decoration that TypeScript ignores when checking 'event.target'",
      "Using the wrong or missing generic argument can cause 'event.target' to lack properties like 'value', leading to a compile error when accessing them",
    ],
    correctIndexes: [0, 1, 3],
    explanation:
      "The generic argument on these event types determines what concrete element 'event.target' is treated as, which is exactly what makes properties like '.value' accessible in a type-safe way; it is not merely decorative, and mismatching it is a common source of type errors.",
  },
  {
    id: "ts-react-9",
    question:
      "A component accepts a 'children' prop that could be text, numbers, JSX elements, or arrays of any of those. Which type is the standard, broad choice for this?",
    type: "single",
    options: [
      "React.ReactNode",
      "string",
      "JSX.Element",
      "object",
    ],
    correctIndexes: [0],
    explanation:
      "React.ReactNode covers virtually anything React can render, strings, numbers, booleans, JSX elements, and arrays of these, making it the standard type for a flexible 'children' prop; JSX.Element is narrower and only covers a single rendered element, excluding things like a plain string.",
  },
  {
    id: "ts-react-10",
    question:
      "Why is 'null' passed as the initial value in 'const divRef = useRef<HTMLDivElement>(null);', and what does the type argument accomplish?",
    type: "single",
    options: [
      "'null' reflects that no DOM element is attached until after the component first renders and React attaches the ref, and HTMLDivElement tells TypeScript what divRef.current will hold once attached",
      "'null' is required because useRef never accepts DOM element types as type arguments",
      "HTMLDivElement means the ref must be initialized with 'new HTMLDivElement()' instead of null",
      "This usage is invalid; useRef can only store numbers, not DOM elements",
    ],
    correctIndexes: [0],
    explanation:
      "Before React attaches the ref to the rendered DOM node, 'divRef.current' is null, so the initial value must be null; typing it as useRef<HTMLDivElement>(null) tells TypeScript that once attached, '.current' will be an HTMLDivElement.",
  },
  {
    id: "ts-react-11",
    question:
      "What is the purpose of 'const renderCount = useRef<number>(0);' compared to using useState for the same counter?",
    type: "single",
    options: [
      "It creates a mutable container whose '.current' value can be read and updated across renders without triggering a re-render when it changes, unlike useState",
      "It behaves exactly like useState, triggering a re-render every time '.current' is reassigned",
      "It can only be used for numbers, never for anything else a component wants to track silently",
      "'renderCount.current' is read-only and can never be reassigned after the ref is created",
    ],
    correctIndexes: [0],
    explanation:
      "useRef returns a mutable ref object whose 'current' property can be freely reassigned; unlike a state update, changing 'current' does not cause the component to re-render, which is useful for values, like a render count, that shouldn't affect what's displayed.",
  },
  {
    id: "ts-react-12",
    question: "Which of the following statements about useRef in TypeScript are true?",
    type: "multi",
    options: [
      "useRef<HTMLDivElement>(null) is typically used for attaching to a DOM node via the ref attribute, where '.current' starts as null until React attaches the element",
      "useRef<number>(0) is typically used to hold a plain mutable value, where '.current' starts at 0 and can be freely reassigned by your own code",
      "Both useRef<HTMLDivElement>(null) and useRef<number>(0) trigger a component re-render whenever '.current' is reassigned",
      "The type argument passed to useRef determines the type of '.current', whether it holds a DOM element or a plain value",
    ],
    correctIndexes: [0, 1, 3],
    explanation:
      "DOM refs and plain mutable-value refs both use useRef but for different purposes, one for imperative DOM access and one for storing a value across renders; in neither case does reassigning '.current' cause a re-render, since useRef intentionally sits outside React's render cycle.",
  },
  {
    id: "ts-react-13",
    question:
      "A custom hook is defined as 'function useLocalStorage<T>(key: string, initialValue: T)'. Why is the generic type parameter T useful here?",
    type: "single",
    options: [
      "It lets each call site get back a value typed specifically to what it stored, e.g., useLocalStorage<string>('name', '') returns a string while useLocalStorage<number>('age', 0) returns a number, without the hook hardcoding a type",
      "It forces every call to useLocalStorage to always store a string, regardless of the type argument given",
      "Generic type parameters are not allowed in custom hooks; hooks can only use concrete, fixed types",
      "T has no effect on the return type; it only documents intent for other developers reading the code",
    ],
    correctIndexes: [0],
    explanation:
      "A generic type parameter lets one hook implementation work correctly for many concrete types, with each call site's usage determining what T is, so the returned value is typed precisely instead of falling back to something like 'any'.",
  },
  {
    id: "ts-react-14",
    question:
      "A custom hook returns an array like this: function useToggle(initial: boolean) { const [value, setValue] = useState(initial); const toggle = () => setValue(v => !v); return [value, toggle]; } What does TypeScript infer for the returned array, and why can this be a problem for callers?",
    type: "single",
    options: [
      "TypeScript infers a general array type like (boolean | (() => void))[], not a fixed-position tuple, which can cause type errors or lost precision when destructuring as 'const [value, toggle] = useToggle(false);' unless the return is fixed with 'as const' or an explicit tuple type",
      "TypeScript automatically infers a precise tuple type [boolean, () => void] with no extra effort needed",
      "This code fails to compile, because functions are not allowed to return array literals in TypeScript",
      "The order of the destructured variables no longer matters, since TypeScript infers named properties instead of array positions",
    ],
    correctIndexes: [0],
    explanation:
      "By default, TypeScript widens a returned array literal to a general array type (a union of the element types), not a fixed-length tuple, so destructuring can lose position-specific typing; adding 'as const' to the returned array, or annotating the function's return type as a tuple like [boolean, () => void], fixes this, mirroring how useState itself returns a proper tuple.",
  },
  {
    id: "ts-react-15",
    question:
      "A reusable List component needs to render an array of any item type using a caller-provided renderItem function: interface ListProps<T> { items: T[]; renderItem: (item: T) => React.ReactNode; } Is this prop type correct, and why?",
    type: "single",
    options: [
      "Yes: T is a generic type parameter shared between 'items' and 'renderItem', so whatever type of items are passed in, renderItem is guaranteed to receive that same type",
      "No: generic type parameters cannot be used in interfaces, only in standalone functions",
      "No: 'items: T[]' should instead be 'items: any[]' to allow any type of array",
      "No: 'renderItem' should be typed as '(item: any) => any', since its argument type can never be known in advance",
    ],
    correctIndexes: [0],
    explanation:
      "Making ListProps generic over T lets TypeScript connect the type of 'items' to the parameter type of 'renderItem', so if items is 'User[]', renderItem is checked as receiving a 'User', giving full type safety without resorting to 'any'.",
  },
  {
    id: "ts-react-16",
    question:
      "Why is 'interface ListProps<T> { items: T[]; renderItem: (item: T) => React.ReactNode; }' generally better than using 'any' for 'items' and renderItem's parameter?",
    type: "single",
    options: [
      "With a generic T, TypeScript checks that renderItem's parameter matches the actual type of items at each usage, catching mismatches at compile time; with 'any', that connection is lost and mismatches would go unchecked",
      "'any' produces smaller compiled JavaScript output than a generic type parameter does",
      "Generic type parameters like T are erased identically to 'any' during compilation, so there is no practical difference between them",
      "React does not support components with generic type parameters, so 'any' is the only valid option",
    ],
    correctIndexes: [0],
    explanation:
      "Generics preserve the relationship between related parts of a type, such as an array's element type and a callback's parameter type, so TypeScript can verify they stay consistent; 'any' opts out of type-checking for that relationship entirely, which can hide real bugs while still compiling fine.",
  },
];
