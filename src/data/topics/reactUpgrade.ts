import type { Topic } from "../../types";

export const reactUpgradeTopic: Topic = {
  id: "react-upgrade",
  title: "React Upgrade",
  category: "Getting Started",
  shortExplanation:
    "Upgrading React's major version means bumping react and react-dom in package.json, reading the official upgrade guide and running any provided codemods, and hunting down deprecated or removed APIs before shipping. Recent major versions have removed things like ReactDOM.render and string refs in favor of createRoot and callback/object refs, and added new hooks such as useId, useTransition, and useDeferredValue.",
  longExplanation:
    "A React major-version upgrade is rarely just changing a number in package.json, even though that is the first mechanical step: running npm install react@latest react-dom@latest pulls the new code, but the real work is verifying the app still behaves correctly against it. The React team publishes an upgrade guide for every major release along with, historically, automated codemods that rewrite common deprecated patterns for you, and reading that guide first is the fastest way to find out what actually changed rather than discovering it through runtime warnings. The biggest recent example is the switch from ReactDOM.render(<App />, container) to createRoot(container).render(<App />): the old API silently kept working for one release with warnings and then was removed, and the new root-based API is what unlocks concurrent features. Another widely felt change was the automatic JSX runtime, which lets the compiler inject the createElement-equivalent calls it needs directly, meaning most files no longer need import React from 'react' just to use JSX — a small but very common source of upgrade-time lint or build errors when a project's tooling isn't configured for it yet. Legacy patterns like string refs (ref='myInput') and the old context API (contextTypes / getChildContext) were deprecated for years before eventually being removed entirely, so an upgrade is often the moment those finally have to be migrated to callback refs, useRef, or the modern createContext/useContext pair. On the addition side, newer major versions have introduced hooks aimed at responsiveness under concurrent rendering — useId for stable, SSR-safe unique identifiers, useTransition for marking updates as non-urgent, and useDeferredValue for deprioritizing a value's update — none of which existing code is required to adopt immediately, but which become available once the upgrade lands. Because a lot of this only surfaces at runtime (deprecation warnings, subtly changed batching behavior, third-party libraries pinned to an older peer dependency), the safe process is always: read the guide, upgrade in a branch, run the full test suite and click through the app manually, and only then merge.",
  examples: [
    {
      id: "old-vs-new-mount",
      title: "Old mount API vs. new root API",
      summary: "Compare the retired ReactDOM.render call to the modern createRoot pattern used today.",
      code: `function CodeBlock({ label, code, deprecated }) {
  return (
    <div style={{ border: "1px solid #d1d5db", borderRadius: 6, padding: 10 }}>
      <small style={{ color: deprecated ? "#dc2626" : "#16a34a" }}>
        {deprecated ? "Removed" : "Current"} — {label}
      </small>
      <pre style={{ margin: "6px 0 0", fontSize: 12, whiteSpace: "pre-wrap" }}>{code}</pre>
    </div>
  );
}

function App() {
  return (
    <div style={{ display: "grid", gap: 10, maxWidth: 360 }}>
      <CodeBlock
        label="React 17 and earlier"
        deprecated
        code={"ReactDOM.render(<App />, document.getElementById('root'));"}
      />
      <CodeBlock
        label="React 18+"
        code={"const root = ReactDOM.createRoot(document.getElementById('root'));\\nroot.render(<App />);"}
      />
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "automatic-jsx-runtime",
      title: "Automatic JSX runtime",
      summary: "See why import React is no longer required in every file that uses JSX.",
      code: `function App() {
  const [showImport, setShowImport] = useState(true);

  return (
    <div style={{ display: "grid", gap: 10, maxWidth: 360 }}>
      <button onClick={() => setShowImport((s) => !s)}>
        Toggle: {showImport ? "Classic runtime" : "Automatic runtime"}
      </button>
      <pre style={{ margin: 0, padding: 10, border: "1px solid #d1d5db", borderRadius: 6, fontSize: 12 }}>
{showImport
  ? "import React from 'react';\\n\\nfunction App() {\\n  return <h1>Hi</h1>;\\n}"
  : "function App() {\\n  return <h1>Hi</h1>;\\n}\\n// the compiler injects the JSX helper import for you"}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "removed-string-refs",
      title: "String refs replaced by useRef",
      summary: "The legacy ref='name' string API was removed in favor of the ref object pattern.",
      code: `function App() {
  const inputRef = useRef(null);

  return (
    <div style={{ display: "grid", gap: 10, maxWidth: 300 }}>
      <small style={{ color: "#6b7280" }}>
        Old (removed): {"<input ref=\\"myInput\\" />"}, then this.refs.myInput
      </small>
      <small style={{ color: "#16a34a" }}>
        Current: {"<input ref={inputRef} />"}, then inputRef.current
      </small>
      <input ref={inputRef} placeholder="Focus me via the modern ref API" />
      <button onClick={() => inputRef.current && inputRef.current.focus()}>Focus input</button>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "upgrade-checklist",
      title: "A pre-upgrade checklist",
      summary: "Interactively check off the steps of a typical major-version upgrade.",
      code: `function App() {
  const [steps, setSteps] = useState([
    { id: 1, label: "Read the official upgrade guide", done: false },
    { id: 2, label: "Run available codemods", done: false },
    { id: 3, label: "npm install react@latest react-dom@latest", done: false },
    { id: 4, label: "Fix deprecation warnings in the console", done: false },
    { id: 5, label: "Run the test suite and click through manually", done: false },
  ]);

  function toggle(id) {
    setSteps((prev) => prev.map((s) => (s.id === id ? { ...s, done: !s.done } : s)));
  }

  return (
    <div style={{ display: "grid", gap: 6, maxWidth: 320 }}>
      {steps.map((s) => (
        <label key={s.id} style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <input type="checkbox" checked={s.done} onChange={() => toggle(s.id)} />
          <span style={{ textDecoration: s.done ? "line-through" : "none", color: s.done ? "#9ca3af" : "inherit" }}>
            {s.label}
          </span>
        </label>
      ))}
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "new-hooks-timeline",
      title: "Newer hooks added over recent versions",
      summary: "Browse a short timeline of hooks that arrived in recent major releases, plus one live demo.",
      code: `function App() {
  const additions = [
    { hook: "useId", note: "Stable, SSR-safe unique IDs for form/aria attributes" },
    { hook: "useTransition", note: "Marks a state update as low priority / non-blocking" },
    { hook: "useDeferredValue", note: "Lets a value lag behind urgent updates" },
  ];
  const [selected, setSelected] = useState(additions[0]);
  const [count, setCount] = useState(0);

  return (
    <div style={{ display: "grid", gap: 10, maxWidth: 340 }}>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
        {additions.map((a) => (
          <button key={a.hook} onClick={() => setSelected(a)} disabled={a.hook === selected.hook}>
            {a.hook}
          </button>
        ))}
      </div>
      <p style={{ margin: 0, fontSize: 13, color: "#4b5563" }}>{selected.note}</p>
      <div style={{ borderTop: "1px solid #e5e7eb", paddingTop: 10 }}>
        <small style={{ color: "#6b7280" }}>A plain useState counter, for comparison:</small>
        <p style={{ margin: "4px 0" }}>{count}</p>
        <button onClick={() => setCount((c) => c + 1)}>+1</button>
      </div>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
