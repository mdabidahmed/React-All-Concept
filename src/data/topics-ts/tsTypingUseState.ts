import type { Topic } from "../../types";

export const tsTypingUseStateTopic: Topic = {
  id: "ts-typing-usestate",
  title: "Typing useState",
  category: "TypeScript with React",
  shortExplanation: `\`useState\` is generic — \`useState<Type>(initialValue)\` — and TypeScript can often ==infer== that type from the initial value alone, without writing the \`<Type>\` at all.

- \`useState(0)\` infers \`number\`; \`useState("")\` infers \`string\`; \`useState(false)\` infers \`boolean\` — no explicit type argument needed
- An **explicit type argument** is needed when the initial value doesn't reveal the full type — most commonly \`useState<User | null>(null)\`, where the state starts as \`null\` but will later hold a real object
- Also needed for a state value that can be one of several types: \`useState<string | number>("")\``,
  longExplanation: `\`useState\` is a **generic function** — its full signature looks roughly like \`function useState<S>(initialState: S): [S, Dispatch<SetStateAction<S>>]\`. The type parameter \`S\` determines both the type of the state value returned and the type of value the setter function will accept. Most of the time, this generic type is inferred automatically and never needs to be written explicitly.

- When the initial value is a plain literal — \`useState(0)\`, \`useState("")\`, \`useState(false)\`, \`useState([])\` (inferred as \`never[]\`, worth noting as a case where inference isn't quite enough — see below) — TypeScript looks at that value and infers \`S\` directly: \`number\`, \`string\`, \`boolean\`. The returned state variable and its setter are both correctly typed with zero extra annotation
- The most common case needing an **explicit type argument** is state that starts out empty or absent but will later hold something more specific — classically, data that hasn't loaded yet: \`const [user, setUser] = useState<User | null>(null);\`. Without the explicit \`<User | null>\`, TypeScript would infer the type purely from \`null\` itself, meaning \`user\` would be typed as just \`null\` forever — and any later \`setUser(realUserObject)\` would be a type error, since a real \`User\` wouldn't be assignable to a state variable TypeScript believes can only ever be \`null\`
- The same issue shows up with an empty array initial value: \`useState([])\` infers the array's element type as \`never\` (an array that can never actually hold anything, from TypeScript's point of view), so pushing a real value into it later fails to type-check. The fix is the same: be explicit — \`useState<Todo[]>([])\`
- A state value that can legitimately be **one of several distinct types** over its lifetime also needs an explicit union: \`useState<string | number>("")\`. Every place that reads the state then has to handle both possibilities (often with a \`typeof\` check or a discriminated union), and every call to the setter must pass a value matching one of those exact types
- The setter function itself is fully typed to match: calling \`setCount("not a number")\` on a \`useState<number>\` state is a compile-time error, exactly the same kind of mistake typing the initial value correctly is meant to prevent
- The setter also accepts a **function updater** form — \`setCount((prev) => prev + 1)\` — where TypeScript infers \`prev\`'s type as exactly the state's type, giving full safety on both the read and the write of the previous value

Choosing between letting TypeScript infer versus writing the type argument explicitly comes down to one question: does the *initial* value alone fully describe every type the state variable will ever hold during the component's lifetime? If yes, inference is enough. If the state starts narrower (often \`null\`, \`undefined\`, or an empty array) than it will eventually become, an explicit type argument is what keeps every future update correctly type-checked.`,
  examples: [
    {
      id: "inferred-state-types",
      title: "Letting TypeScript infer the state type",
      summary: "No <Type> needed — the initial value alone is enough for number, string, and boolean state.",
      code: `function App() {
  const [count, setCount] = useState(0); // inferred: number
  const [name, setName] = useState("Ada"); // inferred: string
  const [isOpen, setIsOpen] = useState(false); // inferred: boolean

  return (
    <div style={{ display: "grid", gap: 8 }}>
      <p>{name} clicked {count} times. Panel is {isOpen ? "open" : "closed"}.</p>
      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={() => setCount(count + 1)}>+1</button>
        <button onClick={() => setIsOpen(!isOpen)}>Toggle</button>
      </div>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "explicit-type-for-nullable-object",
      title: "An explicit type for state that starts as null",
      summary: "useState<User | null>(null) lets the state later hold a real object, not just null forever.",
      code: `interface User {
  id: number;
  name: string;
}

function App() {
  // Without "<User | null>", TypeScript would infer just "null" from the
  // initial value, and calling setUser(realUser) below would be an error.
  const [user, setUser] = useState<User | null>(null);

  function loadUser() {
    setUser({ id: 1, name: "Grace Hopper" });
  }

  return (
    <div style={{ display: "grid", gap: 8 }}>
      <p>{user ? "Loaded: " + user.name : "No user loaded yet"}</p>
      <button onClick={loadUser}>Load user</button>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "explicit-type-for-empty-array",
      title: "An explicit type for state that starts as an empty array",
      summary: "useState<Todo[]>([]) avoids the empty array being inferred as an array that can never hold anything.",
      code: `interface Todo {
  id: number;
  text: string;
}

function App() {
  // Without "<Todo[]>", an empty array literal infers as "never[]" —
  // an array TypeScript believes can never actually contain anything.
  const [todos, setTodos] = useState<Todo[]>([]);

  function addTodo() {
    setTodos([...todos, { id: todos.length + 1, text: "Todo #" + (todos.length + 1) }]);
  }

  return (
    <div style={{ display: "grid", gap: 8 }}>
      <button onClick={addTodo}>Add todo</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "union-state-type",
      title: "A union type for state that can hold more than one type",
      summary: "useState<string | number> lets the same state hold either type, with checks handling both.",
      code: `function App() {
  const [value, setValue] = useState<string | number>("");

  function useTextValue() {
    setValue("some text");
  }

  function useNumberValue() {
    setValue(42);
  }

  const description = typeof value === "number" ? "a number: " + value : "a string: \\"" + value + "\\"";

  return (
    <div style={{ display: "grid", gap: 8 }}>
      <p>Current value is {description}</p>
      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={useTextValue}>Set text</button>
        <button onClick={useNumberValue}>Set number</button>
      </div>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
