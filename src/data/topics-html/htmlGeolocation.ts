import type { Topic } from "../../types";

export const htmlGeolocationTopic: Topic = {
  id: "html-geolocation",
  title: "HTML Geolocation",
  category: "HTML APIs",
  shortExplanation: `The **Geolocation API** lets a page ask for the device's physical location, but only after the user explicitly grants permission.

- \`navigator.geolocation.getCurrentPosition(success, error)\` is the core call
- \`success\` receives an object with \`coords.latitude\` and \`coords.longitude\`
- \`error\` runs if the user denies permission, the device has no location fix, or the request times out
- A real permission prompt behaves unpredictably in an embedded preview, so the examples below ==simulate== it`,
  longExplanation: `\`navigator.geolocation.getCurrentPosition(successCallback, errorCallback)\` is the entire core of the Geolocation API. Calling it triggers the browser's own **permission prompt** — the small banner asking "Allow this site to know your location?" — and only proceeds once the user responds.

- If the user **allows** it, \`successCallback\` is called with a position object; the coordinates live at \`position.coords.latitude\` and \`position.coords.longitude\`
- If the user **denies** it, the device can't get a fix, or the request times out, \`errorCallback\` runs instead with an error object describing what went wrong
- Because it's permission-gated, geolocation is inherently unreliable to depend on — a page must always handle the "user said no" case gracefully, never assume success
- A second function, \`navigator.geolocation.watchPosition(...)\`, works the same way but keeps calling back as the device's location changes, useful for live tracking (e.g. a map that follows the user while walking)

This sandbox can't safely trigger a real geolocation permission prompt — inside an embedded preview with no direct user gesture context recognized by the browser, the prompt can behave unpredictably or simply hang with no way to resolve it. The examples below ==simulate== the same flow by hand: clicking a button starts a short fake "locating..." delay, then sets made-up coordinates into state — standing in for exactly what \`getCurrentPosition\`'s success callback would receive from a real permission-gated call.`,
  examples: [
    {
      id: "simulated-get-current-position",
      title: "Simulated getCurrentPosition",
      summary: "A button fakes the permission-prompt-then-callback flow with a short delay and made-up coordinates.",
      code: `function App() {
  const [status, setStatus] = useState("idle");
  const [position, setPosition] = useState(null);

  function simulateGetCurrentPosition() {
    setStatus("locating");
    setPosition(null);
    setTimeout(() => {
      // Standing in for what a real permission-gated navigator.geolocation.getCurrentPosition
      // success callback would receive.
      setPosition({ latitude: 51.5072, longitude: -0.1276 });
      setStatus("done");
    }, 1200);
  }

  return (
    <div style={{ display: "grid", gap: 10, maxWidth: 320 }}>
      <button onClick={simulateGetCurrentPosition} disabled={status === "locating"}>
        {status === "locating" ? "Locating..." : "Get my location (simulated)"}
      </button>
      {position && (
        <p>
          Latitude: <strong>{position.latitude}</strong>, Longitude: <strong>{position.longitude}</strong>
        </p>
      )}
      <small>
        A real call would first show the browser's own permission prompt; this sandbox simulates
        the result after a short fake delay instead.
      </small>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "simulated-permission-denied",
      title: "Simulating a denied permission",
      summary: "Choosing \"deny\" runs the error-callback path instead of the success path.",
      code: `function App() {
  const [result, setResult] = useState(null);

  function simulateRequest(userAllows) {
    setResult("locating");
    setTimeout(() => {
      if (userAllows) {
        setResult({ ok: true, coords: { latitude: 35.6762, longitude: 139.6503 } });
      } else {
        setResult({ ok: false, message: "User denied Geolocation permission." });
      }
    }, 900);
  }

  return (
    <div style={{ display: "grid", gap: 10, maxWidth: 340 }}>
      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={() => simulateRequest(true)}>Simulate: user allows</button>
        <button onClick={() => simulateRequest(false)}>Simulate: user denies</button>
      </div>
      {result === "locating" && <p>Waiting for permission response...</p>}
      {result && result !== "locating" && result.ok && (
        <p style={{ color: "#15803d" }}>
          Success callback: lat {result.coords.latitude}, lng {result.coords.longitude}
        </p>
      )}
      {result && result !== "locating" && !result.ok && (
        <p style={{ color: "#b91c1c" }}>Error callback: {result.message}</p>
      )}
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "simulated-watch-position",
      title: "Simulating watchPosition's repeated callbacks",
      summary: "A fake moving position, updating every couple of seconds, standing in for watchPosition tracking movement.",
      code: `function App() {
  const [tracking, setTracking] = useState(false);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    if (!tracking) return;
    let lat = 40.7128;
    let lng = -74.006;
    const id = setInterval(() => {
      lat += (Math.random() - 0.5) * 0.01;
      lng += (Math.random() - 0.5) * 0.01;
      setHistory((h) => [...h.slice(-3), { latitude: lat.toFixed(4), longitude: lng.toFixed(4) }]);
    }, 1500);
    return () => clearInterval(id);
  }, [tracking]);

  return (
    <div style={{ display: "grid", gap: 10, maxWidth: 340 }}>
      <button onClick={() => setTracking((t) => !t)}>
        {tracking ? "Stop simulated watchPosition" : "Start simulated watchPosition"}
      </button>
      <ul style={{ margin: 0, paddingLeft: 18 }}>
        {history.map((p, i) => (
          <li key={i}>lat {p.latitude}, lng {p.longitude}</li>
        ))}
      </ul>
      <small>A real watchPosition keeps calling back as the device physically moves; this fakes movement with small random steps.</small>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
