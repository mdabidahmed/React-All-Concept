import type { Topic } from "../../types";
import { DebounceThrottleDiagram } from "../../components/molecules/Diagrams/DebounceThrottleDiagram";

export const debounceThrottleTopic: Topic = {
  id: "debounce-throttle",
  title: "Debouncing & Throttling",
  category: "Advanced Patterns",
  shortExplanation: `**Debouncing** and **throttling** both limit how often a fast-firing event handler actually does work — but they do it in opposite ways.

- *Debounce*: wait for a **pause** in events, then fire once — good for search-as-you-type
- *Throttle*: fire at most **once per fixed interval**, no matter how often events happen — good for scroll tracking
- Both are usually implemented around a piece of state or a ref holding a timer id
- In React, the timer needs cleanup in a \`useEffect\` return function, or it keeps running after the component unmounts`,
  longExplanation: `Both patterns exist to stop a rapidly-firing event (keystrokes, scroll, resize, clicks) from triggering expensive work — a network request, a layout recalculation, a state update — on every single firing.

- **Debounce** resets a timer on every event and only runs the callback once the events *stop* for a given delay. Typing "react" fires five keystrokes, but a 300ms debounce waits until 300ms after the *last* keystroke before actually searching — so one search request fires, not five
- **Throttle** runs the callback immediately, then ignores further calls until a fixed interval has passed, guaranteeing the callback fires at a steady maximum rate. A scroll handler throttled to 200ms updates a "scrolled past header" flag at most five times a second, no matter how many scroll events the browser fires
- Debounce is the right choice when only the *final* value matters (search input, saving a draft after the user stops typing); throttle is the right choice when you need *periodic* updates throughout continuous activity (scroll position, drag position, mouse-move tracking)
- A common implementation shape for debounce: on each call, \`clearTimeout\` the previous timer, then \`setTimeout\` a new one for the delay. For throttle: record the timestamp of the last run, and only run again once \`Date.now() - lastRun >= interval\`
- Inside a component, the timer needs to be cleaned up — a debounce timer scheduled just before the component unmounts would otherwise still fire afterward, trying to update state on an unmounted component. \`useEffect\`'s cleanup function (\`return () => clearTimeout(id)\`) handles this correctly

A reusable \`useDebouncedValue(value, delay)\` hook is a common way to bring this into React idiomatically: it returns a debounced copy of a fast-changing value, which a component can depend on in its own effect (e.g. to trigger a search) without re-implementing the timer logic every time.`,
  diagram: DebounceThrottleDiagram,
  examples: [
    {
      id: "debounced-search",
      title: "A debounced search input",
      summary: "The search only \"fires\" 400ms after the user stops typing, not on every keystroke.",
      code: `function DebouncedSearch() {
  const [query, setQuery] = useState("");
  const [searchedFor, setSearchedFor] = useState("");

  useEffect(() => {
    if (query === "") return;
    const id = setTimeout(() => {
      setSearchedFor(query);
    }, 400);
    return () => clearTimeout(id);
  }, [query]);

  return (
    <div style={{ display: "grid", gap: 8 }}>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Type to search..."
      />
      <p style={{ margin: 0, color: "#6b7280" }}>
        Last search fired for: <strong>{searchedFor || "(nothing yet)"}</strong>
      </p>
    </div>
  );
}

render(<DebouncedSearch />);`,
    },
    {
      id: "throttled-clicks",
      title: "Throttling a rapid-fire button",
      summary: "Clicking fast still only increments the throttled counter at most once every 800ms.",
      code: `function ThrottledClicker() {
  const [rawClicks, setRawClicks] = useState(0);
  const [throttledClicks, setThrottledClicks] = useState(0);
  const lastRunRef = useRef(0);

  function handleClick() {
    setRawClicks((c) => c + 1);
    const now = Date.now();
    if (now - lastRunRef.current >= 800) {
      lastRunRef.current = now;
      setThrottledClicks((c) => c + 1);
    }
  }

  return (
    <div style={{ display: "grid", gap: 8 }}>
      <button onClick={handleClick}>Click me as fast as you can</button>
      <p style={{ margin: 0 }}>Raw clicks: {rawClicks}</p>
      <p style={{ margin: 0 }}>Throttled (max 1 per 800ms): {throttledClicks}</p>
    </div>
  );
}

render(<ThrottledClicker />);`,
    },
    {
      id: "use-debounced-value-hook",
      title: "A reusable useDebouncedValue hook",
      summary: "Extracting the debounce timer logic into a hook that returns a delayed copy of a value.",
      code: `function useDebouncedValue(value, delay) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);

  return debounced;
}

function App() {
  const [text, setText] = useState("");
  const debouncedText = useDebouncedValue(text, 500);

  return (
    <div style={{ display: "grid", gap: 8 }}>
      <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Type something..." />
      <p style={{ margin: 0 }}>Live value: {text}</p>
      <p style={{ margin: 0, color: "#0d9488" }}>Debounced (500ms): {debouncedText}</p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "debounce-vs-throttle-side-by-side",
      title: "Debounce vs. throttle on the same rapid clicks",
      summary: "The same burst of clicks drives both a debounced counter and a throttled counter, side by side.",
      code: `function useDebouncedCounter(delay) {
  const [raw, setRaw] = useState(0);
  const [debounced, setDebounced] = useState(0);

  useEffect(() => {
    const id = setTimeout(() => setDebounced(raw), delay);
    return () => clearTimeout(id);
  }, [raw, delay]);

  return [debounced, () => setRaw((r) => r + 1)];
}

function useThrottledCounter(interval) {
  const [throttled, setThrottled] = useState(0);
  const lastRunRef = useRef(0);

  function bump() {
    const now = Date.now();
    if (now - lastRunRef.current >= interval) {
      lastRunRef.current = now;
      setThrottled((t) => t + 1);
    }
  }

  return [throttled, bump];
}

function App() {
  const [debouncedCount, bumpDebounced] = useDebouncedCounter(500);
  const [throttledCount, bumpThrottled] = useThrottledCounter(500);
  const [rawCount, setRawCount] = useState(0);

  function handleClick() {
    setRawCount((c) => c + 1);
    bumpDebounced();
    bumpThrottled();
  }

  return (
    <div style={{ display: "grid", gap: 8 }}>
      <button onClick={handleClick}>Click rapidly</button>
      <p style={{ margin: 0 }}>Raw clicks: {rawCount}</p>
      <p style={{ margin: 0 }}>Debounced result (fires once, 500ms after you stop): {debouncedCount}</p>
      <p style={{ margin: 0 }}>Throttled result (fires at most every 500ms): {throttledCount}</p>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
