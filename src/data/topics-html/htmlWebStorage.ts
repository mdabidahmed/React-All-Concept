import type { Topic } from "../../types";

export const htmlWebStorageTopic: Topic = {
  id: "html-web-storage",
  title: "HTML Web Storage",
  category: "HTML APIs",
  shortExplanation: `**Web Storage** lets a page save simple string key-value data directly in the browser, with no server involved.

- \`localStorage\` persists until it's explicitly cleared — it survives closing the tab and even restarting the browser
- \`sessionStorage\` is cleared automatically the moment its tab is closed
- \`setItem(key, value)\`, \`getItem(key)\`, and \`removeItem(key)\` are the entire core API
- A lighter, simpler alternative to cookies for data that's only ever needed *in the browser*`,
  longExplanation: `Web Storage gives a page a small, synchronous, browser-side key-value store — no network request, no server, no permission prompt. There are two flavors, and the only difference between them is **how long the data sticks around**:

- **\`localStorage\`** persists indefinitely — data written today is still there tomorrow, next week, or after a full browser restart, until a page (or the user, via browser settings) explicitly deletes it
- **\`sessionStorage\`** is scoped to one tab's lifetime — the data disappears automatically the moment that tab is closed, even though it survives page refreshes and normal navigation within that tab
- Both share the exact same three-method API: \`localStorage.setItem("key", "value")\` writes a value, \`localStorage.getItem("key")\` reads it back (returning \`null\` if the key doesn't exist), and \`localStorage.removeItem("key")\` deletes it. \`localStorage.clear()\` wipes everything at once
- Web Storage only stores **strings** — saving an object or array means converting it with \`JSON.stringify(...)\` first, and parsing it back out with \`JSON.parse(...)\` when reading it
- Compared to **cookies** (the older way to persist small bits of browser data), Web Storage is simpler to use, holds meaningfully more data (typically several megabytes vs. a few kilobytes), and — unlike cookies — is never automatically sent along with every HTTP request to the server, which makes it a better fit for data a page only needs locally, like a saved theme preference or a draft of unsent form input

Because \`localStorage\` is a genuine, synchronous, permission-free browser API, the examples below run for real against your actual browser's storage — refresh the page and the saved value really is still there.`,
  examples: [
    {
      id: "basic-set-get-remove",
      title: "setItem, getItem, and removeItem, live",
      summary: "A real localStorage read/write, working against your actual browser storage.",
      code: `function App() {
  const [name, setName] = useState("");
  const [saved, setSaved] = useState(() => localStorage.getItem("demo-name"));

  function handleSave() {
    localStorage.setItem("demo-name", name);
    setSaved(name);
  }

  function handleClear() {
    localStorage.removeItem("demo-name");
    setSaved(null);
  }

  return (
    <div style={{ display: "grid", gap: 10, maxWidth: 280 }}>
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Type a name" />
      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={handleSave}>Save to localStorage</button>
        <button onClick={handleClear}>Remove</button>
      </div>
      <p>
        Currently saved: <strong>{saved === null ? "(nothing)" : saved}</strong>
      </p>
      <small>Refresh the page — the saved value is still there, because it lives in the browser, not in React state.</small>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "localstorage-vs-sessionstorage",
      title: "localStorage vs. sessionStorage, side by side",
      summary: "Both write real browser storage; only sessionStorage disappears when this tab closes.",
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
      <p>localStorage: <strong>{localValue ?? "(nothing)"}</strong> — survives closing the tab</p>
      <p>sessionStorage: <strong>{sessionValue ?? "(nothing)"}</strong> — cleared when this tab closes</p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "storing-json-objects",
      title: "Storing an object with JSON.stringify / JSON.parse",
      summary: "Web Storage only holds strings, so a real object round-trips through JSON.",
      code: `function App() {
  const [items, setItems] = useState(() => {
    const raw = localStorage.getItem("todo-demo");
    return raw ? JSON.parse(raw) : [];
  });
  const [text, setText] = useState("");

  function addItem() {
    if (!text.trim()) return;
    const next = [...items, text];
    setItems(next);
    localStorage.setItem("todo-demo", JSON.stringify(next));
    setText("");
  }

  function clearAll() {
    setItems([]);
    localStorage.removeItem("todo-demo");
  }

  return (
    <div style={{ display: "grid", gap: 10, maxWidth: 280 }}>
      <div style={{ display: "flex", gap: 8 }}>
        <input value={text} onChange={(e) => setText(e.target.value)} placeholder="New item" />
        <button onClick={addItem}>Add</button>
      </div>
      <ul style={{ margin: 0, paddingLeft: 18 }}>
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
      <button onClick={clearAll}>Clear all</button>
      <small>Stored as one JSON string under a single key — refresh and the list is still there.</small>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "storage-vs-cookies",
      title: "Why Web Storage instead of cookies",
      summary: "A quick comparison table of the practical differences.",
      code: `function App() {
  const rows = [
    { aspect: "Typical size limit", storage: "~5-10 MB", cookies: "~4 KB" },
    { aspect: "Sent with every HTTP request?", storage: "No", cookies: "Yes, automatically" },
    { aspect: "API", storage: "setItem / getItem / removeItem", cookies: "document.cookie string parsing" },
  ];

  return (
    <table style={{ borderCollapse: "collapse", width: "100%", maxWidth: 440, fontSize: 13 }}>
      <thead>
        <tr>
          <th style={{ border: "1px solid #d1d5db", padding: 8, textAlign: "left" }}>Aspect</th>
          <th style={{ border: "1px solid #d1d5db", padding: 8, textAlign: "left" }}>Web Storage</th>
          <th style={{ border: "1px solid #d1d5db", padding: 8, textAlign: "left" }}>Cookies</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.aspect}>
            <td style={{ border: "1px solid #d1d5db", padding: 8 }}>{row.aspect}</td>
            <td style={{ border: "1px solid #d1d5db", padding: 8 }}>{row.storage}</td>
            <td style={{ border: "1px solid #d1d5db", padding: 8 }}>{row.cookies}</td>
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
