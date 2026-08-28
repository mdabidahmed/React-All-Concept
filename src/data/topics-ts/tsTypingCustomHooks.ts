import type { Topic } from "../../types";

export const tsTypingCustomHooksTopic: Topic = {
  id: "ts-typing-custom-hooks",
  title: "Typing Custom Hooks",
  category: "TypeScript with React",
  shortExplanation: `A custom hook can take its own generic type parameter, so *callers* get back the exact type they need — the same way \`useState<T>\` does internally.

- \`function useToggle(initial: boolean) { ... }\` is a normal typed function; \`function useLocalStorage<T>(key: string, initial: T)\` is generic, reusable across any stored value's type

- Returning a **tuple** (like \`useState\` does — \`[value, setValue]\`) needs an explicit tuple type or \`as const\`, or TypeScript infers a plain array instead, losing each position's specific type

- Without that annotation, destructuring \`const [value, setValue] = useMyHook()\` still works, but both positions get the same widened, unhelpfully-generic array element type`,
  longExplanation: `A custom hook is, underneath the special naming convention, just a regular function that happens to call other hooks. Typing its parameters works exactly like typing any function's parameters — but its *return value* has one real, common gotcha worth understanding well: TypeScript's default inference for a returned array doesn't automatically preserve which type belongs to which position, the way returning a genuine tuple should.

- **Giving a custom hook its own generic type parameter lets each caller get back a result specific to their own use.** \`function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] { ... }\` can be called as \`useLocalStorage<string>("username", "")\` in one component and \`useLocalStorage<number>("volume", 50)\` in another, with each call site getting a correctly, independently typed \`value\` and setter — one single hook definition serving every possible stored value type, exactly the same motivation behind a generic function covered earlier
- **The tuple-return gotcha is the single most important thing to know when writing a custom hook that mimics \`useState\`'s \`[value, setter]\` shape.** Given \`function useToggle(initial: boolean) { const [value, setValue] = useState(initial); function toggle() { setValue((v) => !v); } return [value, toggle]; }\`, the \`return [value, toggle]\` line, with no annotation, gets inferred by TypeScript as \`(boolean | (() => void))[]\` — a plain array where *every* position could be *either* type, since TypeScript doesn't know the caller cares about strict positional order the way a real tuple does
- **This loses real information at the call site — in a way that gets in the way of *correct* usage, not just incorrect usage.** Destructuring \`const [isOpen, toggleOpen] = useToggle(false);\` gives *both* \`isOpen\` and \`toggleOpen\` the exact same merged type, \`boolean | (() => void)\`, since TypeScript no longer tracks which position held which original type. That means calling \`toggleOpen()\` directly, or passing it straight to \`onClick\`, is now rejected — not because the code is wrong, but because TypeScript can only see "maybe a boolean, maybe a function" and refuses to call something that might not be callable. Using it correctly now requires an extra, unnecessary narrowing check (\`typeof toggleOpen === "function"\`) that a real tuple return would never have demanded, since a real tuple already knows position \`0\` is always the \`boolean\` and position \`1\` is always the function
- **Fixing it takes one of two approaches.** The most explicit is an actual tuple return type annotation on the function itself: \`function useToggle(initial: boolean): [boolean, () => void] { ... }\`. The other is adding \`as const\` directly on the returned array literal: \`return [value, toggle] as const;\` — this tells TypeScript to infer each element's most specific possible type, in its exact position, rather than merging every element into one shared, widened array type. Both achieve the same end result; the explicit return-type annotation is usually a little more self-documenting for anyone reading the hook's signature alone, without needing to open its implementation
- **An object return value doesn't have this problem at all**, which is why plenty of custom hooks intentionally return a named object instead of a positional tuple: \`function useToggle(initial: boolean) { return { value, toggle }; }\` infers a correctly-typed \`{ value: boolean; toggle: () => void }\` automatically, with no extra annotation needed, since object properties are always tracked individually by name rather than merged together the way array elements are. The trade-off is purely stylistic — a tuple lets a caller freely rename both returned values during destructuring (\`const [isOpen, toggleOpen] = useToggle(false)\`), the same convenience \`useState\` itself offers, while an object forces callers to either use the fixed property names or manually rename during destructuring (\`const { value: isOpen, toggle: toggleOpen } = useToggle(false)\`)
- **Custom hooks compose the same typing tools already covered elsewhere** — a hook's internal \`useState\` calls follow the exact rules from "Typing useState," a hook accepting a DOM ref follows "Typing useRef," and a hook's own parameters and return value follow ordinary function-typing rules; nothing about being a "hook" specifically changes any of those underlying rules, beyond the tuple-return gotcha unique to mimicking \`useState\`'s own shape

The practical takeaway: reach for a generic type parameter on a custom hook the moment it needs to work with more than one possible value type across different call sites, and remember the tuple gotcha specifically whenever a hook's return value is an array meant to be destructured positionally — an explicit tuple return type (or \`as const\`) is what keeps each position's type exactly as precise as it would be coming out of React's own \`useState\`.`,
  examples: [
    {
      id: "generic-uselocalstorage",
      title: "A generic custom hook: useLocalStorage<T>",
      summary: "One hook definition, reused with a string value in one call and a number in another.",
      code: `function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

  function setValue(value: T) {
    setStoredValue(value);
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // ignore write errors (e.g. storage disabled)
    }
  }

  return [storedValue, setValue];
}

function App() {
  const [username, setUsername] = useLocalStorage<string>("demo-username", "");
  const [volume, setVolume] = useLocalStorage<number>("demo-volume", 50);

  return (
    <div style={{ display: "grid", gap: 8 }}>
      <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
      <input
        type="range"
        min={0}
        max={100}
        value={volume}
        onChange={(e) => setVolume(Number(e.target.value))}
      />
      <p>Username: {username || "(empty)"}, Volume: {volume}</p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "tuple-gotcha-without-annotation",
      title: "The tuple gotcha: an unannotated array return",
      summary: "Without a tuple type, TypeScript merges both return positions into one loose, unhelpful type.",
      code: `// Without an explicit return type or "as const", TypeScript infers this
// return value as (boolean | (() => void))[] — a plain array, not a tuple.
function useToggleLoose(initial: boolean) {
  const [value, setValue] = useState(initial);
  function toggle() {
    setValue((v) => !v);
  }
  return [value, toggle];
}

function App() {
  const [isOpen, toggleOpen] = useToggleLoose(false);

  // Because isOpen and toggleOpen share the same merged type
  // (boolean | (() => void)), calling toggleOpen() directly is rejected —
  // this extra check is only needed because the return type was widened.
  function handleClick() {
    if (typeof toggleOpen === "function") {
      toggleOpen();
    }
  }

  return (
    <div style={{ display: "grid", gap: 8 }}>
      <p>Panel is {String(isOpen)}</p>
      <button onClick={handleClick}>Toggle</button>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        A real tuple return type wouldn't need that "typeof" check at all — the next example fixes that.
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "tuple-gotcha-fixed-return-type",
      title: "Fixing it with an explicit tuple return type",
      summary: "[boolean, () => void] pins each position's exact type, just like useState's own return.",
      code: `function useToggle(initial: boolean): [boolean, () => void] {
  const [value, setValue] = useState(initial);
  function toggle() {
    setValue((v) => !v);
  }
  return [value, toggle];
}

function App() {
  const [isOpen, toggleOpen] = useToggle(false);

  return (
    <div style={{ display: "grid", gap: 8 }}>
      <p>Panel is {isOpen ? "open" : "closed"}</p>
      <button onClick={toggleOpen}>Toggle</button>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        Now isOpen is always known as boolean and toggleOpen as () =&gt; void — swapping them would be an error.
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "as-const-alternative",
      title: "The alternative fix: as const on the returned array",
      summary: "Adding as const to the return statement achieves the same precise tuple typing.",
      code: `function useToggle(initial: boolean) {
  const [value, setValue] = useState(initial);
  function toggle() {
    setValue((v) => !v);
  }
  return [value, toggle] as const;
}

function App() {
  const [isOpen, toggleOpen] = useToggle(true);

  return (
    <div style={{ display: "grid", gap: 8 }}>
      <p>Panel is {isOpen ? "open" : "closed"}</p>
      <button onClick={toggleOpen}>Toggle</button>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        "as const" on the return value works just as well as an explicit tuple return type annotation.
      </p>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
