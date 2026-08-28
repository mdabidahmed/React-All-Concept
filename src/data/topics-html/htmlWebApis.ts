import type { Topic } from "../../types";

export const htmlWebApisTopic: Topic = {
  id: "html-web-apis",
  title: "HTML Web APIs",
  category: "HTML APIs",
  shortExplanation: `A **Web API** is a capability the *browser itself* provides to JavaScript, beyond just reading and changing the DOM — it's not a backend/server API.

- \`navigator\` and \`window\` expose dozens of these: network status, device info, storage, and more
- Geolocation, Web Storage, Drag and Drop, Web Workers, and Server-Sent Events (covered next) are each one specific Web API
- They share one theme: the browser hands JavaScript a door into something outside plain page content — the user's location, a background thread, a persistent connection`,
  longExplanation: `The DOM (reading and changing elements on the page) is only one thing a browser gives JavaScript access to. A **Web API** is any other capability the browser exposes as a JavaScript interface — usually reached through the global \`navigator\` or \`window\` objects. It's a completely different idea from a "web API" in the backend sense (an HTTP endpoint a server exposes) — here, the browser is the one providing the capability, directly to code running on the page.

- \`navigator.onLine\` reports whether the browser currently thinks it has a network connection
- \`navigator.userAgent\` and \`navigator.language\` describe the browser and the user's preferred language
- \`navigator.geolocation\` asks for the device's physical location (with permission) — covered in the next topic
- \`localStorage\`/\`sessionStorage\`, reached via \`window\`, persist small amounts of data in the browser — covered in HTML Web Storage
- Native **drag-and-drop** events (\`dragstart\`, \`dragover\`, \`drop\`) let elements be dragged and dropped — covered in HTML Drag and Drop
- The \`Worker\` constructor runs JavaScript on a separate background thread — covered in HTML Web Workers
- \`EventSource\` opens a one-way push connection from a server — covered in HTML Server-Sent Events

Each of the five topics that follow is really the same underlying idea applied to one specific browser capability: **the browser provides a JS interface to something beyond ordinary page content** — the device's location, a slot of persistent storage, a native drag interaction, an extra CPU thread, or a live server connection. Some of these run for real in this sandbox (Web Storage, Drag and Drop) since they need no special permission and no external server; others (Geolocation, Web Workers, Server-Sent Events) are simulated here and clearly marked as such, since they'd otherwise trigger permission prompts or need infrastructure this environment doesn't have.`,
  examples: [
    {
      id: "navigator-basics",
      title: "Reading a few real navigator properties",
      summary: "userAgent, language, and onLine are genuine browser globals, read directly with no simulation.",
      code: `function App() {
  return (
    <div style={{ display: "grid", gap: 8, fontFamily: "monospace", fontSize: 13, maxWidth: 420 }}>
      <div style={{ background: "#f1f5f9", padding: 8, borderRadius: 6, overflow: "auto" }}>
        navigator.userAgent: {navigator.userAgent}
      </div>
      <div style={{ background: "#f1f5f9", padding: 8, borderRadius: 6 }}>
        navigator.language: {navigator.language}
      </div>
      <div style={{ background: "#f1f5f9", padding: 8, borderRadius: 6 }}>
        navigator.onLine: {String(navigator.onLine)}
      </div>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "online-offline-live-status",
      title: "Reacting live to online/offline events",
      summary: "A real event listener on window that updates when your actual network connection changes.",
      code: `function App() {
  const [online, setOnline] = useState(navigator.onLine);

  useEffect(() => {
    function handleOnline() { setOnline(true); }
    function handleOffline() { setOnline(false); }
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return (
    <div>
      <p>
        Connection status:{" "}
        <strong style={{ color: online ? "#15803d" : "#b91c1c" }}>{online ? "Online" : "Offline"}</strong>
      </p>
      <small>Try toggling your browser's offline mode in devtools to see this update live.</small>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "web-api-catalog",
      title: "A quick catalog of what's coming next",
      summary: "Each of the next five topics is one specific Web API, listed here as a map of what's ahead.",
      code: `function App() {
  const apis = [
    { name: "Geolocation", gives: "The device's physical coordinates (with permission)" },
    { name: "Web Storage", gives: "localStorage / sessionStorage — persistent key-value data" },
    { name: "Drag and Drop", gives: "Native draggable elements and drop targets" },
    { name: "Web Workers", gives: "A background thread for heavy computation" },
    { name: "Server-Sent Events", gives: "A one-way live push stream from a server" },
  ];

  return (
    <ul style={{ margin: 0, paddingLeft: 18, display: "grid", gap: 6 }}>
      {apis.map((api) => (
        <li key={api.name}>
          <strong>{api.name}</strong> — {api.gives}
        </li>
      ))}
    </ul>
  );
}

render(<App />);`,
    },
  ],
};
