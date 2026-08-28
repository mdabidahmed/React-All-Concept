import type { Topic } from "../../types";

export const jsLocalStorageTopic: Topic = {
  id: "js-local-storage",
  title: "JavaScript Web Storage",
  category: "Browser & Modern JS",
  shortExplanation: `**Web Storage** gives a page a simple key-value store that lives directly in the browser — no server, no network request, no permission prompt.

- \`localStorage\` — persists indefinitely, surviving tab closes and even browser restarts
- \`sessionStorage\` — cleared automatically the moment its tab is closed
- \`setItem(key, value)\`, \`getItem(key)\`, \`removeItem(key)\` — the entire core API, for both
- Only stores **strings** — objects and arrays need \`JSON.stringify()\` / \`JSON.parse()\` to round-trip`,
  longExplanation: `Sometimes a page needs to remember something between visits — a chosen theme, a draft comment, how far a user got in a multi-step form — without involving a server at all. Web Storage is the browser's built-in answer: a small, synchronous key-value store, scoped to the page's own origin, that JavaScript can read and write directly.

- **\`localStorage\`** persists indefinitely. Data saved today is still there tomorrow, next month, or after the browser has been fully closed and reopened — it only goes away if a script explicitly removes it, or the user clears their browser's site data
- **\`sessionStorage\`** shares the exact same API but a very different lifetime: its data disappears automatically the instant that specific tab is closed. It does survive a normal page refresh or in-tab navigation, which makes it a good fit for state that should reset once someone actually leaves, like a multi-step wizard's in-progress answers
- Both objects share the same three core methods: \`.setItem("key", "value")\` writes a value under a key (overwriting anything already stored there), \`.getItem("key")\` reads it back (returning \`null\`, not an error, if the key was never set), and \`.removeItem("key")\` deletes that one entry. \`.clear()\` wipes every key at once
- Critically, Web Storage can only store **strings**. Trying to save a number or boolean silently converts it to its string form, and trying to save an object directly stores the unhelpful text \`"[object Object]"\` instead of its actual data. The standard fix is \`JSON.stringify(myObject)\` before saving, and \`JSON.parse(savedString)\` after reading it back — this round-trip is so common that almost any non-trivial use of Web Storage involves it
- Compared to cookies (the older browser storage mechanism), Web Storage is simpler to use, holds meaningfully more data (typically several megabytes vs. roughly 4KB for cookies), and — unlike cookies — is never automatically attached to outgoing HTTP requests, making it a better fit for data that's only ever needed inside the browser itself
- Because reading and writing happens synchronously and directly against the current tab, storage set by one tab of a site is *not* automatically visible to another open tab of the same site without an extra mechanism (like a \`"storage"\` event listener) — each read only reflects what's been written so far in whatever tab is doing the reading

Because \`localStorage\` and \`sessionStorage\` are genuine, unrestricted, permission-free browser APIs (unlike, say, the camera or clipboard, which require explicit user permission), the examples below run for real against your actual browser's storage for this page. Refresh the page after using the first example, and the saved value really is still sitting there — this isn't a simulation of what Web Storage would do.`,
  examples: [
    {
      id: "persisting-a-counter",
      title: "A counter that survives a page refresh",
      summary: "A real localStorage-backed value — refresh the page and the count is still there, unlike ordinary state.",
      code: `function App() {
  const [count, setCount] = useState(() => Number(localStorage.getItem("js-topic-counter")) || 0);

  function increment() {
    const next = count + 1;
    setCount(next);
    localStorage.setItem("js-topic-counter", String(next));
  }

  function reset() {
    setCount(0);
    localStorage.removeItem("js-topic-counter");
  }

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <p>Count: <strong>{count}</strong></p>
      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={increment}>Increment (saved to localStorage)</button>
        <button onClick={reset}>Reset</button>
      </div>
      <small style={{ color: "#6b7280" }}>Refresh this page — the count you left it on is still there.</small>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "localstorage-vs-sessionstorage",
      title: "localStorage vs. sessionStorage, side by side",
      summary: "Both write real browser storage; only sessionStorage's copy disappears when this tab is closed.",
      code: `function App() {
  const [value, setValue] = useState("");
  const [localValue, setLocalValue] = useState(() => localStorage.getItem("compare-demo"));
  const [sessionValue, setSessionValue] = useState(() => sessionStorage.getItem("compare-demo"));

  function saveBoth() {
    localStorage.setItem("compare-demo", value);
    sessionStorage.setItem("compare-demo", value);
    setLocalValue(value);
    setSessionValue(value);
  }

  return (
    <div style={{ display: "grid", gap: 10, maxWidth: 320 }}>
      <input value={value} onChange={(e) => setValue(e.target.value)} placeholder="Type something" />
      <button onClick={saveBoth}>Save to both storages</button>
      <p>localStorage: <strong>{localValue || "(nothing)"}</strong> — survives closing this tab</p>
      <p>sessionStorage: <strong>{sessionValue || "(nothing)"}</strong> — cleared when this tab closes</p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "storing-an-object-as-json",
      title: "Storing a settings object with JSON.stringify / JSON.parse",
      summary: "Web Storage only holds strings, so a real settings object round-trips through JSON to survive.",
      code: `function App() {
  const [settings, setSettings] = useState(() => {
    const raw = localStorage.getItem("app-settings-demo");
    return raw ? JSON.parse(raw) : { theme: "light", fontSize: 16 };
  });

  function toggleTheme() {
    const next = { ...settings, theme: settings.theme === "light" ? "dark" : "light" };
    setSettings(next);
    localStorage.setItem("app-settings-demo", JSON.stringify(next));
  }

  function increaseFontSize() {
    const next = { ...settings, fontSize: settings.fontSize + 2 };
    setSettings(next);
    localStorage.setItem("app-settings-demo", JSON.stringify(next));
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <p>theme: <strong>{settings.theme}</strong>, fontSize: <strong>{settings.fontSize}</strong></p>
      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={toggleTheme}>Toggle theme</button>
        <button onClick={increaseFontSize}>Increase font size</button>
      </div>
      <small style={{ color: "#6b7280" }}>
        Stored as a single JSON string — refresh the page and these settings are still there.
      </small>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "removing-and-clearing",
      title: "removeItem() vs. clear()",
      summary: "Delete one specific key, or wipe every key this page has ever stored, both genuinely.",
      code: `function App() {
  const [log, setLog] = useState([]);

  function print(value) {
    setLog((prev) => [...prev, value]);
  }

  function setup() {
    localStorage.setItem("demo-a", "1");
    localStorage.setItem("demo-b", "2");
    print("Set demo-a and demo-b");
  }

  function removeOne() {
    localStorage.removeItem("demo-a");
    print("Removed demo-a only. demo-a is now: " + localStorage.getItem("demo-a"));
    print("demo-b is untouched: " + localStorage.getItem("demo-b"));
  }

  function clearAll() {
    localStorage.clear();
    print("Cleared everything. demo-b is now: " + localStorage.getItem("demo-b"));
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <button onClick={setup}>Set two keys</button>
        <button onClick={removeOne}>removeItem("demo-a")</button>
        <button onClick={clearAll}>clear() everything</button>
      </div>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 90 }}>
        {log.length === 0 ? "// click a button above" : log.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
