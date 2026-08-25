import type { Topic } from "../../types";
import { CustomHooksDiagram } from "../../components/molecules/Diagrams/CustomHooksDiagram";

export const customHooksTopic: Topic = {
  id: "custom-hooks",
  title: "Custom Hooks",
  category: "Composition",
  shortExplanation: `A custom hook is just a JavaScript function whose name starts with \`use\` and that calls other hooks inside it. It lets you ==extract and reuse stateful logic== between components without changing the component tree.

- Same rules as built-in hooks: call it at the *top level*, only from components or other hooks
- Each call gets its **own independent state** — sharing logic isn't sharing state`,
  longExplanation: `React components already share non-stateful logic through plain functions, and share UI through composition (children, props). What was historically hard to share was **stateful logic** — a piece of behavior built out of \`useState\`, \`useEffect\`, and friends. Custom hooks solve this: any function that calls one or more built-in hooks and whose name starts with \`use\` *is* a custom hook, and React's rules of hooks apply to it the same way — only call at the top level, only call from React functions.

- Extracting a custom hook doesn't share *state* itself — each component calling \`useMyHook()\` gets its own independent state
- What it shares is the **logic** and the *shape* of that state
- It's the idiomatic replacement for older patterns like higher-order components and render props — think \`useFetch(url)\`, \`useLocalStorage(key)\`, \`useDebounce(value)\`

Good custom hooks have a small, clear contract — what you pass in, what you get back — hide *which* underlying hooks they use, and are ==named for what they do, not how they do it==.`,
  diagram: CustomHooksDiagram,
  examples: [
    {
      id: "use-toggle",
      title: "useToggle — a boolean with a flip function",
      summary: "The smallest possible custom hook: wrap a common useState pattern.",
      code: `function useToggle(initial = false) {
  const [value, setValue] = useState(initial);
  const toggle = useCallback(() => setValue((v) => !v), []);
  return [value, toggle];
}

function App() {
  const [isOpen, toggleOpen] = useToggle(false);
  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <button onClick={toggleOpen}>{isOpen ? "Close" : "Open"} panel</button>
      {isOpen && <div style={{ padding: 12, border: "1px solid #d1d5db" }}>Panel content</div>}
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "use-debounced-value",
      title: "useDebouncedValue — delay reacting to fast changes",
      summary: "Combine useState + useEffect to debounce a fast-changing input.",
      code: `function useDebouncedValue(value, delayMs) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delayMs);
    return () => clearTimeout(id);
  }, [value, delayMs]);

  return debounced;
}

function App() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebouncedValue(query, 400);

  return (
    <div style={{ display: "grid", gap: 8, maxWidth: 260 }}>
      <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Type to search..." />
      <p>Live value: {query}</p>
      <p>Debounced (400ms): <strong>{debouncedQuery}</strong></p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "use-local-storage-demo",
      title: "useLocalStorage — persisted state",
      summary: "The same pattern this app uses to remember your notes.",
      code: `function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const raw = window.localStorage.getItem(key);
      return raw !== null ? JSON.parse(raw) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* ignore quota errors */
    }
  }, [key, value]);

  return [value, setValue];
}

function App() {
  const [name, setName] = useLocalStorage("demo:name", "");
  return (
    <div style={{ display: "grid", gap: 8, maxWidth: 260 }}>
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
      <small>Refresh the preview — this value survives (stored in localStorage).</small>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "use-fetch-status",
      title: "useAsync — track loading/error/data for any async function",
      summary: "Generalize the loading/error/data dance into one reusable hook.",
      code: `function useAsync(asyncFn, deps) {
  const [state, setState] = useState({ status: "idle", data: null, error: null });

  useEffect(() => {
    let cancelled = false;
    setState({ status: "loading", data: null, error: null });

    asyncFn()
      .then((data) => {
        if (!cancelled) setState({ status: "success", data, error: null });
      })
      .catch((error) => {
        if (!cancelled) setState({ status: "error", data: null, error: String(error) });
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line
  }, deps);

  return state;
}

function fakeFetchJoke() {
  return new Promise((resolve) => {
    setTimeout(() => resolve("Why do programmers prefer dark mode? Because light attracts bugs."), 600);
  });
}

function App() {
  const [key, setKey] = useState(0);
  const { status, data } = useAsync(fakeFetchJoke, [key]);

  return (
    <div style={{ display: "grid", gap: 10, maxWidth: 300 }}>
      <p>Status: <strong>{status}</strong></p>
      {status === "success" && <p>{data}</p>}
      <button onClick={() => setKey((k) => k + 1)}>Fetch again</button>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "use-previous",
      title: "usePrevious — remember last render's value",
      summary: "Combine useRef + useEffect to read the previous value of a prop/state.",
      code: `function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

function App() {
  const [count, setCount] = useState(0);
  const previous = usePrevious(count);

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <p>Now: <strong>{count}</strong> — Before: <strong>{previous ?? "n/a"}</strong></p>
      <button onClick={() => setCount((c) => c + 1)}>Increment</button>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
