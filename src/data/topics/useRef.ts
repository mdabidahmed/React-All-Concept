import type { Topic } from "../../types";

export const useRefTopic: Topic = {
  id: "use-ref",
  title: "useRef",
  category: "Core Hooks",
  shortExplanation:
    "useRef returns a mutable { current } object that persists for the lifetime of the component. Changing .current does not trigger a re-render, which makes it ideal for DOM references and for values you need to remember without redrawing the UI.",
  longExplanation:
    "useRef(initialValue) returns a plain object with a single mutable property, current, initialized to initialValue. That object is the same object on every render of the component — React never recreates it — so it's a place to stash a value that needs to survive re-renders but, unlike state, updating it does not schedule a re-render and reading it does not participate in rendering. There are two common uses. First, DOM refs: pass a ref to a JSX element's ref attribute (e.g. <input ref={inputRef} />) and after the DOM has been committed, inputRef.current points at the actual DOM node, letting you call imperative APIs like .focus(), .scrollIntoView(), or measure its size — things React's declarative model doesn't cover. Second, mutable instance variables: storing a timer ID to clear later, tracking whether a component is still mounted, counting renders for debugging, or caching a previous value (often via a small custom hook like usePrevious) — anywhere you'd reach for an instance field in a class component. The key mental model: state is for values that affect what's rendered; refs are for values that don't.",
  examples: [
    {
      id: "focus-input",
      title: "Imperatively focusing an input",
      summary: "Use a DOM ref to call .focus() on a button click.",
      code: `function App() {
  const inputRef = useRef(null);

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <input ref={inputRef} placeholder="Click the button to focus me" />
      <button onClick={() => inputRef.current && inputRef.current.focus()}>
        Focus the input
      </button>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "render-count",
      title: "Counting renders without causing more of them",
      summary: "A ref increments freely because writing to .current never re-renders.",
      code: `function App() {
  const [text, setText] = useState("");
  const renderCount = useRef(0);
  renderCount.current += 1;

  return (
    <div style={{ display: "grid", gap: 8, maxWidth: 260 }}>
      <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Type something" />
      <p>This component has rendered <strong>{renderCount.current}</strong> times.</p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "stopwatch-mutable-id",
      title: "Stopwatch: stashing a timer id in a ref",
      summary: "Store the setInterval id where it survives renders but isn't state.",
      code: `function App() {
  const [elapsed, setElapsed] = useState(0);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef(null);

  function start() {
    if (running) return;
    setRunning(true);
    intervalRef.current = setInterval(() => setElapsed((e) => e + 1), 1000);
  }

  function stop() {
    setRunning(false);
    clearInterval(intervalRef.current);
  }

  useEffect(() => () => clearInterval(intervalRef.current), []);

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <p>Elapsed: <strong>{elapsed}s</strong></p>
      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={start} disabled={running}>Start</button>
        <button onClick={stop} disabled={!running}>Stop</button>
      </div>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "does-not-rerender",
      title: "Ref updates don't trigger re-renders",
      summary: "Contrast a ref counter (silent) with a state counter (visible) side by side.",
      code: `function App() {
  const refCount = useRef(0);
  const [stateCount, setStateCount] = useState(0);
  const [, forceRender] = useState(0);

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <button
        onClick={() => {
          refCount.current += 1; // no re-render happens from this alone
        }}
      >
        Bump ref (current: {refCount.current})
      </button>
      <button onClick={() => setStateCount((c) => c + 1)}>
        Bump state (current: {stateCount})
      </button>
      <button onClick={() => forceRender((n) => n + 1)}>Force a re-render</button>
      <small>The ref's displayed number only updates after "Force a re-render".</small>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "measure-element",
      title: "Measuring a DOM node's size",
      summary: "Read layout info from a ref after the browser has painted.",
      code: `function App() {
  const boxRef = useRef(null);
  const [width, setWidth] = useState(null);
  const [text, setText] = useState("Resize me by typing more text here to grow the box");

  useEffect(() => {
    if (boxRef.current) setWidth(boxRef.current.offsetWidth);
  });

  return (
    <div style={{ display: "grid", gap: 10, maxWidth: 320 }}>
      <div
        ref={boxRef}
        style={{ padding: 12, border: "1px solid #d1d5db", borderRadius: 6, wordBreak: "break-word" }}
      >
        {text}
      </div>
      <textarea value={text} onChange={(e) => setText(e.target.value)} rows={2} />
      <p>Measured width: <strong>{width ?? "..."}px</strong></p>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
