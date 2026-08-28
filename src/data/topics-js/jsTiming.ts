import type { Topic } from "../../types";

export const jsTimingTopic: Topic = {
  id: "js-timing",
  title: "JavaScript Timing Events",
  category: "Asynchronous JavaScript",
  shortExplanation: `JavaScript has two core built-in timer functions: \`setTimeout\` runs a function ==once==, after a delay; \`setInterval\` runs a function *repeatedly*, at a fixed interval, until it's explicitly stopped.

- \`setTimeout(fn, ms)\` and \`setInterval(fn, ms)\` both return an ID that can be used to cancel them
- \`clearTimeout(id)\` cancels a pending timeout before it fires; \`clearInterval(id)\` stops a running interval
- Inside a React component, an interval started in \`useEffect\` must be cleared in its **cleanup function** — otherwise it keeps ticking (and trying to update unmounted state) after the component is gone`,
  longExplanation: `JavaScript provides two complementary built-in functions for running code after time has passed, rather than immediately. \`setTimeout(callback, delay)\` schedules \`callback\` to run **once**, no sooner than \`delay\` milliseconds from now (the browser's event loop, covered in its own topic, means it's a minimum wait, not a guarantee — busy synchronous code can push the actual firing later). \`setInterval(callback, delay)\` schedules the exact same kind of delayed callback, but **repeatedly**, firing again and again every \`delay\` milliseconds, indefinitely, until something explicitly stops it.

Both functions return a value — a numeric ID in browsers — the moment they're called, and that ID is the only handle you have for canceling the timer later. \`clearTimeout(id)\` cancels a *pending* timeout before it has a chance to fire; calling it after the timeout has already run does nothing harmful, it's simply a no-op. \`clearInterval(id)\` stops a running interval from firing again — the interval that already fired isn't undone, but every future tick is prevented. Losing track of an interval's ID effectively loses the ability to ever stop it (short of the whole page being closed or reloaded), which is exactly the shape of bug that causes runaway timers.

This connects directly to a very common, easy-to-write React bug. Starting a \`setInterval\` inside a component — say, inside a \`useEffect\` — without ever calling \`clearInterval\` means that interval keeps firing even after the component using it has unmounted (the user navigated away, the parent stopped rendering it, whatever the reason). Each tick that fires will typically try to call a state setter that belonged to the now-gone component, which wastes work at best and can produce warnings or bugs at worst. \`useEffect\`'s **cleanup function** — the function optionally *returned* from the effect callback — exists specifically to solve this: React automatically calls it right before the component unmounts (and also before the effect re-runs, if its dependencies changed), which is the correct, guaranteed place to call \`clearInterval\`. The idiomatic shape is: \`useEffect(() => { const id = setInterval(tick, 1000); return () => clearInterval(id); }, []);\` — the interval is created when the effect runs, and the returned cleanup function reliably tears it down.

The same discipline applies to \`setTimeout\` used inside a component, though the failure mode is a little less obvious: if a component schedules a timeout and then unmounts before the delay elapses, the callback still fires later against a component that's no longer there, unless it was cleaned up with \`clearTimeout\` in the same way.

It's also worth knowing that timers are not perfectly precise instruments. A requested delay is a *minimum*, not an exact promise — if the call stack is busy running other synchronous code when the delay elapses, the callback simply waits until the stack clears (see the event loop topic). Browsers also intentionally throttle timers in backgrounded, inactive tabs to save battery and CPU, which can make an interval tick noticeably slower than requested while a tab isn't in focus. None of this matters for most everyday uses like countdowns or polling, but it's the reason \`setInterval\` is not the right tool for anything requiring frame-accurate or millisecond-precise timing.`,
  examples: [
    {
      id: "settimeout-schedule-and-cancel",
      title: "Scheduling a timeout, and canceling it",
      summary: "clearTimeout stops the callback from ever firing, if called before the delay elapses.",
      code: `function App() {
  const [message, setMessage] = useState("Nothing scheduled yet.");
  const timeoutRef = useRef(null);

  function schedule() {
    setMessage("Waiting 3 seconds...");
    timeoutRef.current = setTimeout(() => {
      setMessage("Timeout fired!");
    }, 3000);
  }

  function cancel() {
    clearTimeout(timeoutRef.current);
    setMessage("Cancelled before it fired.");
  }

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={schedule}>Schedule a 3s timeout</button>
        <button onClick={cancel}>Cancel it</button>
      </div>
      <p>{message}</p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "countdown-timer-with-interval",
      title: "A countdown timer built with setInterval",
      summary: "Start, stop, and reset a countdown — the interval is created and cleared inside useEffect.",
      code: `function App() {
  const [seconds, setSeconds] = useState(10);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setSeconds((s) => {
        if (s <= 1) {
          clearInterval(id);
          setRunning(false);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [running]);

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <p>Time left: <strong>{seconds}s</strong></p>
      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={() => setRunning(true)} disabled={running || seconds <= 0}>Start</button>
        <button onClick={() => setRunning(false)} disabled={!running}>Stop</button>
        <button onClick={() => { setRunning(false); setSeconds(10); }}>Reset</button>
      </div>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        The interval is created when running becomes true, and cleared by useEffect's cleanup function either way.
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "tick-counter-mount-unmount",
      title: "Unmounting stops the interval automatically",
      summary: "The cleanup function clears the interval the instant the Ticker component unmounts.",
      code: `function Ticker() {
  const [ticks, setTicks] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setTicks((t) => t + 1);
    }, 500);
    return () => clearInterval(id);
  }, []);

  return <p>Ticker is mounted — ticks: <strong>{ticks}</strong></p>;
}

function App() {
  const [showTicker, setShowTicker] = useState(true);

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <button onClick={() => setShowTicker((v) => !v)}>
        {showTicker ? "Unmount Ticker" : "Mount Ticker"}
      </button>
      {showTicker ? <Ticker /> : <p>Ticker is unmounted — its interval was cleared, so it isn't running or updating anything.</p>}
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "start-stop-tick-counter",
      title: "A manually start/stoppable tick counter",
      summary: "setInterval only runs while running is true, cleaned up correctly either way it stops.",
      code: `function App() {
  const [count, setCount] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setCount((c) => c + 1);
    }, 1000);
    return () => clearInterval(id);
  }, [running]);

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <p>Count: <strong>{count}</strong></p>
      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={() => setRunning(true)} disabled={running}>Start</button>
        <button onClick={() => setRunning(false)} disabled={!running}>Stop</button>
        <button onClick={() => { setRunning(false); setCount(0); }}>Reset</button>
      </div>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
