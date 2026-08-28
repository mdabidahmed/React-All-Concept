import type { Topic } from "../../types";

export const jsBrowserBomTopic: Topic = {
  id: "js-browser-bom",
  title: "JavaScript Browser Object Model (BOM)",
  category: "Browser & Modern JS",
  shortExplanation: `The **BOM** (Browser Object Model) is JavaScript's window into the *browser itself* — separate from the DOM, which is only about the page's content.

- \`window\` — the global browser window; almost everything else (including \`document\`) hangs off of it
- \`navigator\` — information about the browser and device running the page
- \`screen\` — the physical display's dimensions
- \`location\` / \`history\` — the current URL, and the tab's navigation history`,
  longExplanation: `The DOM and the BOM are easy to lump together because JavaScript reaches both from the browser, but they describe genuinely different things. The **DOM** (Document Object Model) is specifically about the *content* of the current page — the tree of elements a script can read and change. The **BOM** (Browser Object Model) is about the *browser and the environment around that page* — the window it's displayed in, the device and software running it, the physical screen, and the browsing history. There's no single official BOM specification the way there is for the DOM, but the objects that make it up are standard across every modern browser.

- **\`window\`** is the top-level global object in a browser tab — it represents the browser window (or tab) itself. In practice, \`window\` is so central that most global things a script uses (\`document\`, \`setTimeout\`, \`console\`, even declaring a variable with \`var\` at the top level) are actually properties of \`window\`, whether or not the code bothers to write the \`window.\` prefix. \`window.innerWidth\` and \`window.innerHeight\` report the size of the actual visible browser viewport (the content area, excluding browser chrome like the address bar), and both update live if the user resizes the window
- **\`navigator\`** describes the browser and device the page is currently running on. \`navigator.userAgent\` is a (famously messy, historically inconsistent) string identifying the browser and OS; \`navigator.language\` reports the browser's preferred language; \`navigator.onLine\` reports whether the device currently believes it has a network connection. It's the object to check when behavior needs to adapt to the environment the page is running in
- **\`screen\`** describes the user's physical display, independent of how big the browser window currently is. \`screen.width\` and \`screen.height\` report the *entire monitor's* resolution — a browser window can be far smaller than the screen it's sitting on, which is exactly why \`screen.width\` and \`window.innerWidth\` usually report different numbers
- **\`location\`** represents the current page's URL, and also doubles as a way to *navigate*: reading \`location.href\` gives the full current URL, \`location.pathname\` gives just the path portion, and assigning to \`location.href\` (or calling \`location.reload()\`) makes the browser actually navigate or refresh
- **\`history\`** gives limited access to the tab's back/forward navigation stack — \`history.length\` reports how many entries are in it, and \`history.back()\` / \`history.forward()\` can move through it programmatically, the same as clicking the browser's own back/forward buttons

Because navigating away or reloading would break this sandbox's own page, the examples below stick to genuinely **reading** real BOM values rather than triggering real navigation — but every value shown (\`window.innerWidth\`, \`navigator.userAgent\`, \`screen.width\`, \`location.href\`) is read from the real browser environment this page is actually running in, live, not simulated. Resizing the browser window while the first example is open will visibly update the numbers on screen.`,
  examples: [
    {
      id: "window-inner-width-live",
      title: "window.innerWidth / innerHeight, updating live",
      summary: "A real resize listener on the actual browser window — try resizing the window to watch the numbers change.",
      code: `function App() {
  const [size, setSize] = useState({ width: window.innerWidth, height: window.innerHeight });

  useEffect(() => {
    function handleResize() {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div style={{ display: "grid", gap: 6 }}>
      <p>window.innerWidth: <strong>{size.width}px</strong></p>
      <p>window.innerHeight: <strong>{size.height}px</strong></p>
      <p style={{ color: "#6b7280", fontSize: 13 }}>Resize your actual browser window to see these update live.</p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "navigator-info",
      title: "navigator: information about this browser",
      summary: "Genuine values read straight from the real navigator object of whatever browser is viewing this page.",
      code: `function App() {
  const [info, setInfo] = useState(null);

  function inspect() {
    setInfo({
      userAgent: navigator.userAgent,
      language: navigator.language,
      onLine: navigator.onLine,
    });
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={inspect}>Read navigator</button>
      {info && (
        <div style={{ display: "grid", gap: 4, fontSize: 13 }}>
          <p>navigator.language: <strong>{info.language}</strong></p>
          <p>navigator.onLine: <strong>{String(info.onLine)}</strong></p>
          <p style={{ wordBreak: "break-all" }}>navigator.userAgent: <strong>{info.userAgent}</strong></p>
        </div>
      )}
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "screen-vs-window",
      title: "screen (the monitor) vs. window (the viewport)",
      summary: "screen.width reports the whole physical display; window.innerWidth reports only the visible browser content area.",
      code: `function App() {
  return (
    <div style={{ display: "grid", gap: 8, fontSize: 13 }}>
      <p>screen.width x screen.height: <strong>{screen.width} x {screen.height}</strong> (the whole monitor)</p>
      <p>window.innerWidth x window.innerHeight: <strong>{window.innerWidth} x {window.innerHeight}</strong> (just the browser's content area)</p>
      <p style={{ color: "#6b7280" }}>
        The browser window is almost always smaller than the full screen it's displayed on — that's the difference between the two.
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "location-and-history",
      title: "location and history, read (not navigated)",
      summary: "Real values from this actual page's URL and navigation stack, read without triggering any navigation.",
      code: `function App() {
  const [info, setInfo] = useState(null);

  function inspect() {
    setInfo({
      href: location.href,
      protocol: location.protocol,
      historyLength: history.length,
    });
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={inspect}>Read location and history</button>
      {info && (
        <div style={{ display: "grid", gap: 4, fontSize: 13, wordBreak: "break-all" }}>
          <p>location.protocol: <strong>{info.protocol}</strong></p>
          <p>location.href: <strong>{info.href}</strong></p>
          <p>history.length: <strong>{info.historyLength}</strong> entries in this tab's navigation stack</p>
        </div>
      )}
    </div>
  );
}

render(<App />);`,
    },
  ],
};
