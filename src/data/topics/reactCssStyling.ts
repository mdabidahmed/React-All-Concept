import type { Topic } from "../../types";

export const reactCssStylingTopic: Topic = {
  id: "react-css-styling",
  title: "React CSS Styling",
  category: "Styling",
  shortExplanation:
    "React components are typically styled three ways: inline styles via the style prop (a JS object with camelCase keys), plain CSS classes via className backed by a real stylesheet, and conditionally combined class names for state-driven appearance. Each trades off dynamism, reusability, and separation of concerns differently.",
  longExplanation:
    "The style prop accepts a JavaScript object rather than a CSS string — properties are camelCase (backgroundColor, not background-color) and numeric values are treated as pixels unless the property is unitless-safe (like flex, opacity, or zIndex) — which makes inline styles ideal for values that are computed at render time from state or props, such as a progress bar's width or a color derived from a score, but awkward for anything that needs pseudo-classes (:hover, :focus), media queries, or reuse across many elements, since there's no selector mechanism, only per-element objects. className, by contrast, references real CSS rules defined in an actual stylesheet (usually imported at the top of a component file in a real project), which is where pseudo-classes, animations, and shared rules belong, and it's generally the better default for static or rarely-changing styling; the tradeoff is that the connection between a class name and its rules is implicit — you have to go find the CSS to know what a class does. In practice, real applications combine both: className for the baseline look and structural styling, style for values that genuinely depend on runtime state, and conditionally-built class strings (join together only the classes that are currently 'true', e.g. an 'active' class only when a tab is selected) to express state-driven variation without inline style objects. This file's examples run inside a sandbox with no real stylesheet import available, so global CSS is demonstrated by injecting a <style> tag from a component instead of the normal import — a stand-in for what would be a separate .css file in an actual project — and hover/focus effects are simulated with onMouseEnter/onMouseLeave state toggling, since real :hover requires real CSS.",
  examples: [
    {
      id: "inline-dynamic",
      title: "Inline styles driven by state",
      summary: "A progress bar whose width and color come from component state via the style prop.",
      code: `function App() {
  const [progress, setProgress] = useState(40);

  const barColor = progress < 33 ? "#ef4444" : progress < 66 ? "#f59e0b" : "#22c55e";

  return (
    <div style={{ display: "grid", gap: 10, maxWidth: 280 }}>
      <div style={{ background: "#e5e7eb", borderRadius: 6, height: 16, overflow: "hidden" }}>
        <div
          style={{
            width: progress + "%",
            height: "100%",
            background: barColor,
            transition: "width 0.2s ease",
          }}
        />
      </div>
      <p style={{ margin: 0 }}>{progress}%</p>
      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={() => setProgress((p) => Math.max(0, p - 10))}>-10</button>
        <button onClick={() => setProgress((p) => Math.min(100, p + 10))}>+10</button>
      </div>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "injected-global-css",
      title: "Global CSS via className (sandbox stand-in)",
      summary: "A <style> tag stands in for a real imported stylesheet, then plain className is used as usual.",
      code: `function GlobalStyles() {
  return (
    <style>{\`
      .card { border: 1px solid #d1d5db; border-radius: 6px; padding: 12px; }
      .card-title { margin: 0 0 6px; font-weight: 600; color: #111827; }
      .card-body { margin: 0; color: #4b5563; }
    \`}</style>
  );
}

function App() {
  return (
    <div>
      <GlobalStyles />
      <div className="card">
        <p className="card-title">Real project note</p>
        <p className="card-body">
          Here you'd normally write "import './Card.css'" and use these same class names.
        </p>
      </div>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "conditional-classnames",
      title: "Conditional className for tabs",
      summary: "Build the class string conditionally so the active tab looks different from the rest.",
      code: `function GlobalStyles() {
  return (
    <style>{\`
      .tab { padding: 8px 14px; border: 1px solid #d1d5db; background: white; cursor: pointer; }
      .tab.active { background: #111827; color: white; border-color: #111827; }
    \`}</style>
  );
}

function App() {
  const [active, setActive] = useState("home");
  const tabs = ["home", "profile", "settings"];

  return (
    <div>
      <GlobalStyles />
      <div style={{ display: "flex", gap: 4 }}>
        {tabs.map((tab) => (
          <button
            key={tab}
            className={"tab" + (tab === active ? " active" : "")}
            onClick={() => setActive(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "combined-style-classname",
      title: "Combining className and inline style",
      summary: "A className provides the base look while an inline style adds a dynamic touch.",
      code: `function GlobalStyles() {
  return (
    <style>{\`
      .badge { display: inline-block; padding: 4px 10px; border-radius: 999px; font-size: 13px; }
    \`}</style>
  );
}

function App() {
  const [level, setLevel] = useState(2);
  const hue = 200 + level * 30;

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <GlobalStyles />
      <span className="badge" style={{ background: \`hsl(\${hue}, 70%, 85%)\`, color: \`hsl(\${hue}, 70%, 25%)\` }}>
        Level {level}
      </span>
      <button onClick={() => setLevel((l) => l + 1)}>Level up</button>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "hover-focus-simulation",
      title: "Hover state via onMouseEnter/onMouseLeave",
      summary: "Simulate a :hover effect with state toggling since real hover styles need real CSS.",
      code: `function App() {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: "10px 18px",
        borderRadius: 6,
        border: "1px solid #2563eb",
        background: hovered ? "#2563eb" : "white",
        color: hovered ? "white" : "#2563eb",
        cursor: "pointer",
        transition: "background 0.15s ease, color 0.15s ease",
      }}
    >
      Hover me
    </button>
  );
}

render(<App />);`,
    },
  ],
};
