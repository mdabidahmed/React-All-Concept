import type { Topic } from "../../types";

export const htmlSseTopic: Topic = {
  id: "html-sse",
  title: "HTML Server-Sent Events",
  category: "HTML APIs",
  shortExplanation: `**Server-Sent Events (SSE)** let a page receive a one-way stream of push updates from a server over a single long-lived connection, without repeatedly asking for new data.

- \`new EventSource(url)\` opens the connection; its \`onmessage\` handler fires each time the server pushes something new
- Simpler than **WebSockets** when data only needs to flow server -> browser, not the other way
- There's no real server here to stream from, so the examples below ==simulate== the push behavior with a timer`,
  longExplanation: `Normally, a page has to *ask* a server for new data — send a request, get a response, repeat. **Server-Sent Events** flip that: the browser opens one connection and the server pushes new data down it whenever it has something, with no further requests needed.

- \`const source = new EventSource("/updates")\` opens a long-lived HTTP connection to that URL
- \`source.onmessage = (event) => { ... }\` fires every time the server sends a new message; \`event.data\` holds whatever text the server pushed
- The connection stays open in the background, and the browser **automatically reconnects** if it drops — this reconnection handling is built into \`EventSource\` itself, with no extra code needed
- Typical uses: a live score ticker, a stock price feed, a notification bell that updates without a page refresh, a progress indicator for a long server-side job

**SSE vs. WebSockets**: both let a server push data without the browser polling for it, but they solve different shaped problems. SSE is **one-way only** — server to browser — and is deliberately simple: plain HTTP, automatic reconnection, and a tiny API. **WebSockets** are **two-way** — the browser can send data back over the same connection just as easily as it receives — which is the right tool when the browser needs to talk back (a chat app, a multiplayer game), but is more setup than SSE needs to bother with when data only ever needs to flow in one direction.

There's no real backend endpoint in this sandbox to open an actual \`EventSource\` connection to. The examples below ==simulate== the same push behavior with \`setInterval\`, appending a new fake "server" message to a list every couple of seconds — standing in for exactly what a real \`EventSource\`'s \`onmessage\` handler would do each time the server pushed something new.`,
  examples: [
    {
      id: "simulated-event-source-feed",
      title: "A simulated live feed, standing in for EventSource",
      summary: "setInterval pushes a fake \"server\" message into a list every couple of seconds, mirroring onmessage.",
      code: `function App() {
  const [messages, setMessages] = useState([]);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    if (!connected) return;
    let count = 0;
    // Standing in for source.onmessage firing each time the server pushes new data.
    const id = setInterval(() => {
      count += 1;
      const fakeEvent = \`update #\${count} at \${new Date().toLocaleTimeString()}\`;
      setMessages((prev) => [...prev.slice(-4), fakeEvent]);
    }, 2000);
    return () => clearInterval(id);
  }, [connected]);

  return (
    <div style={{ display: "grid", gap: 10, maxWidth: 340 }}>
      <button onClick={() => setConnected((c) => !c)}>
        {connected ? "Close simulated EventSource" : "Open simulated EventSource"}
      </button>
      <ul style={{ margin: 0, paddingLeft: 18, fontFamily: "monospace", fontSize: 13 }}>
        {messages.map((msg, i) => (
          <li key={i}>{msg}</li>
        ))}
      </ul>
      <small>A real connection would be \`new EventSource("/updates")\`, with each message arriving via onmessage.</small>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "simulated-live-score-ticker",
      title: "A simulated live score ticker",
      summary: "A realistic SSE use case: a score that updates itself, pushed in without the page requesting it.",
      code: `function App() {
  const [score, setScore] = useState({ home: 0, away: 0 });
  const [live, setLive] = useState(false);

  useEffect(() => {
    if (!live) return;
    const id = setInterval(() => {
      setScore((prev) => {
        const homeScores = Math.random() < 0.5;
        return homeScores
          ? { ...prev, home: prev.home + 1 }
          : { ...prev, away: prev.away + 1 };
      });
    }, 2500);
    return () => clearInterval(id);
  }, [live]);

  return (
    <div style={{ display: "grid", gap: 10, maxWidth: 260, textAlign: "center" }}>
      <button onClick={() => setLive((l) => !l)}>{live ? "Disconnect" : "Connect to live scores"}</button>
      <div style={{ fontSize: 28, fontWeight: 700 }}>
        {score.home} : {score.away}
      </div>
      <small>Each update simulates a push from the server — the page never asks for a refresh.</small>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "sse-vs-websocket-comparison",
      title: "SSE vs. WebSockets, side by side",
      summary: "A comparison table of when each fits, since they solve related but different-shaped problems.",
      code: `function App() {
  const rows = [
    { aspect: "Direction", sse: "One-way: server to browser", ws: "Two-way: both directions" },
    { aspect: "Protocol", sse: "Plain HTTP", ws: "Its own ws:// protocol" },
    { aspect: "Auto-reconnect", sse: "Built in", ws: "Must be handled manually" },
    { aspect: "Good fit for", sse: "Live feeds, notifications, progress updates", ws: "Chat, multiplayer, anything needing replies" },
  ];

  return (
    <table style={{ borderCollapse: "collapse", width: "100%", maxWidth: 480, fontSize: 13 }}>
      <thead>
        <tr>
          <th style={{ border: "1px solid #d1d5db", padding: 8, textAlign: "left" }}>Aspect</th>
          <th style={{ border: "1px solid #d1d5db", padding: 8, textAlign: "left" }}>SSE (EventSource)</th>
          <th style={{ border: "1px solid #d1d5db", padding: 8, textAlign: "left" }}>WebSockets</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.aspect}>
            <td style={{ border: "1px solid #d1d5db", padding: 8 }}>{row.aspect}</td>
            <td style={{ border: "1px solid #d1d5db", padding: 8 }}>{row.sse}</td>
            <td style={{ border: "1px solid #d1d5db", padding: 8 }}>{row.ws}</td>
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
