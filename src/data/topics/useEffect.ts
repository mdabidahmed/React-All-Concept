import type { Topic } from "../../types";

export const useEffectTopic: Topic = {
  id: "use-effect",
  title: "useEffect",
  category: "Core Hooks",
  shortExplanation:
    "useEffect runs side effects (subscriptions, timers, fetches, DOM work) after render. It takes a function and a dependency array; the effect re-runs whenever a dependency changes, and its return value is a cleanup function.",
  longExplanation:
    "useEffect lets a component step outside pure rendering to synchronize with something external: the DOM, a timer, a subscription, a network request, or browser APIs. React runs the effect function after the browser has painted. The second argument, the dependency array, controls when it re-runs: omit it and the effect runs after every render; pass [] and it runs once after the initial mount; pass [a, b] and it re-runs whenever a or b changes between renders (compared with Object.is). If the effect function returns a function, React treats that as cleanup and calls it before the effect runs again and when the component unmounts — this is how you cancel a timer, close a socket, or remove an event listener. A common mistake is omitting a value the effect actually reads from its dependency array, which causes the effect to close over a stale value; the fix is almost always to include the dependency (or restructure so the effect doesn't need it). useEffect is for synchronizing with systems outside React; it is not the right tool for deriving values from props/state (a plain calculation during render is simpler and faster) or for responding to a specific user event (an event handler is more direct).",
  examples: [
    {
      id: "document-title",
      title: "Sync document title",
      summary: "Keep an external system (the tab title) in sync with state.",
      code: `function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = "Clicks: " + count;
    return () => {
      document.title = "React App";
    };
  }, [count]);

  return (
    <div style={{ display: "grid", gap: 12, justifyItems: "start" }}>
      <p>Clicked <strong>{count}</strong> times — check the browser tab title.</p>
      <button onClick={() => setCount((c) => c + 1)}>Click me</button>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "interval-cleanup",
      title: "Timer with cleanup",
      summary: "Return a cleanup function so intervals don't leak on unmount.",
      code: `function Clock() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    // Cleanup runs on unmount (or before the effect re-runs).
    return () => clearInterval(id);
  }, []);

  return <p>Elapsed: <strong>{seconds}s</strong></p>;
}

function App() {
  const [mounted, setMounted] = useState(true);
  return (
    <div style={{ display: "grid", gap: 12, justifyItems: "start" }}>
      {mounted && <Clock />}
      <button onClick={() => setMounted((m) => !m)}>
        {mounted ? "Unmount clock" : "Mount clock"}
      </button>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "fetch-race",
      title: "Data fetching + ignoring stale responses",
      summary: "Guard against race conditions when a dependency changes quickly.",
      code: `function useDelayedUser(id) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setUser(null);

    const timeout = setTimeout(() => {
      if (!cancelled) setUser({ id, name: "User #" + id });
    }, 500);

    return () => {
      cancelled = true;
      clearTimeout(timeout);
    };
  }, [id]);

  return user;
}

function App() {
  const [id, setId] = useState(1);
  const user = useDelayedUser(id);

  return (
    <div style={{ display: "grid", gap: 12, justifyItems: "start" }}>
      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={() => setId((n) => n + 1)}>Next user</button>
      </div>
      <p>{user ? user.name : "Loading..."}</p>
      <small>Click fast: stale responses are ignored via the cancelled flag.</small>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "event-listener",
      title: "Subscribing to a DOM event",
      summary: "Attach and detach a window event listener safely.",
      code: `function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return width;
}

function App() {
  const width = useWindowWidth();
  return <p>Window width: <strong>{width}px</strong> (try resizing)</p>;
}

render(<App />);`,
    },
    {
      id: "dependency-mistakes",
      title: "Empty deps vs. missing deps",
      summary: "See how an incomplete dependency array causes a stale closure.",
      code: `function StaleExample() {
  const [count, setCount] = useState(0);
  const [log, setLog] = useState([]);

  useEffect(() => {
    const id = setInterval(() => {
      // Bug: this closure captured "count" from the first render only.
      setLog((prev) => [...prev, "interval sees count=" + count].slice(-4));
    }, 1000);
    return () => clearInterval(id);
    // eslint-disable-next-line
  }, []); // <- missing "count" dependency on purpose, to demonstrate the bug

  return (
    <div style={{ display: "grid", gap: 8, justifyItems: "start" }}>
      <button onClick={() => setCount((c) => c + 1)}>count = {count}</button>
      <pre style={{ margin: 0, fontSize: 12 }}>{log.join("\\n")}</pre>
      <small>Increase count, then watch the log: it stays stuck at 0.</small>
    </div>
  );
}

function App() {
  return <StaleExample />;
}

render(<App />);`,
    },
  ],
};
