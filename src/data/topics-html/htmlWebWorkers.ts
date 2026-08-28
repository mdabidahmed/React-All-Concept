import type { Topic } from "../../types";

export const htmlWebWorkersTopic: Topic = {
  id: "html-web-workers",
  title: "HTML Web Workers",
  category: "HTML APIs",
  shortExplanation: `A **Web Worker** runs JavaScript on a separate background thread, so heavy computation doesn't freeze the page's UI.

- The main thread and a worker **never share variables** — they only talk through \`postMessage\`/\`onmessage\`
- Without a worker, one long-running calculation blocks *everything* — clicks, animations, scrolling
- Real workers need a separate script file (or a Blob URL), which this sandbox can't set up reliably, so the examples ==simulate== the idea`,
  longExplanation: `Ordinary JavaScript in a browser runs on a single **main thread** — the same thread that also handles rendering, responding to clicks, and running animations. If a script does something computationally heavy on that thread, everything else freezes until it finishes: no clicks register, no animation ticks, the whole page appears to hang.

A **Web Worker** solves this by running a chunk of JavaScript on a genuinely separate background thread:

- \`const worker = new Worker("worker.js")\` starts a worker, loading its code from a separate script file
- The main thread and the worker **do not share memory or variables at all** — the only way they communicate is by sending messages back and forth: \`worker.postMessage(data)\` sends data *to* the worker, and the worker's own \`onmessage\` handler receives it; the worker sends data back the same way, and the main thread's \`worker.onmessage\` receives that
- Because the worker's code runs off the main thread, a long, CPU-heavy calculation inside it doesn't block clicks, scrolling, or on-screen animation on the page at all — the page stays fully responsive while the worker grinds away
- Workers **can't touch the DOM** directly (no \`document\`, no direct element access) — precisely because DOM manipulation must happen on the main thread. A worker computes and reports results; the main thread is the one that updates what's on screen

Spinning up a real \`Worker\` needs a separate script file (or a dynamically generated Blob URL standing in for one), which is fragile to set up reliably inside this sandbox's live-preview environment. The examples below ==simulate== the same mental model instead: a visibly-animating "main thread" counter that never stops ticking, alongside a fake "background task" (built with \`setTimeout\`) that reports a result only when it finishes — illustrating exactly the relationship a real \`postMessage\`/\`onmessage\` pair would have, without needing an actual second thread.`,
  examples: [
    {
      id: "simulated-responsive-main-thread",
      title: "A responsive main thread while a fake background task runs",
      summary: "An animated counter keeps ticking the whole time a simulated heavy task is \"running\" in the background.",
      code: `function App() {
  const [tick, setTick] = useState(0);
  const [taskStatus, setTaskStatus] = useState("idle");
  const [taskResult, setTaskResult] = useState(null);

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 200);
    return () => clearInterval(id);
  }, []);

  function startFakeBackgroundTask() {
    setTaskStatus("running");
    setTaskResult(null);
    // Standing in for worker.postMessage(...) kicking off work on a separate thread.
    setTimeout(() => {
      setTaskResult(123456789);
      setTaskStatus("done");
    }, 3000);
  }

  return (
    <div style={{ display: "grid", gap: 10, maxWidth: 320 }}>
      <p>Main thread tick: <strong>{tick}</strong> (keeps incrementing no matter what)</p>
      <button onClick={startFakeBackgroundTask} disabled={taskStatus === "running"}>
        {taskStatus === "running" ? "Background task running..." : "Start simulated heavy task"}
      </button>
      {taskResult !== null && <p>Task result (via simulated onmessage): <strong>{taskResult}</strong></p>}
      <small>
        Notice the tick counter never pauses, even while the task is "running" — a real Worker
        gives that same non-blocking guarantee, backed by an actual separate thread.
      </small>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "simulated-postmessage-log",
      title: "Simulated postMessage / onmessage exchange",
      summary: "A log of simulated messages sent to and received from a fake worker, mirroring the real API's shape.",
      code: `function App() {
  const [log, setLog] = useState([]);

  function sendToFakeWorker(payload) {
    setLog((prev) => [...prev, { direction: "main -> worker (postMessage)", data: payload }]);
    // Standing in for the worker's own onmessage handler processing the data, then replying.
    setTimeout(() => {
      const result = payload * 2;
      setLog((prev) => [...prev, { direction: "worker -> main (onmessage)", data: result }]);
    }, 800);
  }

  return (
    <div style={{ display: "grid", gap: 10, maxWidth: 360 }}>
      <button onClick={() => sendToFakeWorker(21)}>Send 21 to simulated worker (double it)</button>
      <ul style={{ margin: 0, paddingLeft: 18, fontFamily: "monospace", fontSize: 13 }}>
        {log.map((entry, i) => (
          <li key={i}>{entry.direction}: {entry.data}</li>
        ))}
      </ul>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "without-a-worker-comparison",
      title: "Why this matters: blocking vs. non-blocking, explained side by side",
      summary: "A conceptual comparison — no actual blocking code is run, since that would genuinely freeze this page.",
      code: `function App() {
  const rows = [
    { aspect: "Where it runs", noWorker: "Main thread (same as UI)", withWorker: "Separate background thread" },
    { aspect: "Effect of heavy computation", noWorker: "Page freezes: no clicks, no animation", withWorker: "Page stays fully responsive" },
    { aspect: "Communication", noWorker: "Direct variable access", withWorker: "postMessage / onmessage only" },
    { aspect: "DOM access", noWorker: "Full access", withWorker: "None — must report back to main thread" },
  ];

  return (
    <table style={{ borderCollapse: "collapse", width: "100%", maxWidth: 460, fontSize: 13 }}>
      <thead>
        <tr>
          <th style={{ border: "1px solid #d1d5db", padding: 8, textAlign: "left" }}>Aspect</th>
          <th style={{ border: "1px solid #d1d5db", padding: 8, textAlign: "left" }}>Without a Worker</th>
          <th style={{ border: "1px solid #d1d5db", padding: 8, textAlign: "left" }}>With a Worker</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.aspect}>
            <td style={{ border: "1px solid #d1d5db", padding: 8 }}>{row.aspect}</td>
            <td style={{ border: "1px solid #d1d5db", padding: 8 }}>{row.noWorker}</td>
            <td style={{ border: "1px solid #d1d5db", padding: 8 }}>{row.withWorker}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

render(<App />);`,
    },
  ],
};
