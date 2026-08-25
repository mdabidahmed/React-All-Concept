import type { Topic } from "../../types";

export const reactGetStartedTopic: Topic = {
  id: "react-get-started",
  title: "React Get Started",
  category: "Getting Started",
  shortExplanation:
    "A modern React project starts from a build tool like Vite (npm create vite@latest) or a framework like Next.js or Remix, rather than hand-written script tags. Node.js and npm provide the JavaScript runtime and package manager, the bundler compiles JSX and modern syntax into browser-ready code, and npm run dev spins up a local dev server with hot module replacement while you work.",
  longExplanation:
    "Getting started with React today almost always means reaching for a scaffolding tool rather than writing configuration by hand. Running npm create vite@latest (or an equivalent framework CLI like create-next-app) asks a few questions — project name, whether you want TypeScript — and generates a working project: a package.json listing dependencies, an index.html entry point, a src folder with an App component, and a preconfigured bundler. Node.js is the JavaScript runtime that powers all of this tooling outside the browser, and npm (installed alongside it) both fetches the dependencies listed in package.json into node_modules and exposes the project's scripts. Two commands matter most day to day: npm run dev starts a local development server that serves your app in the browser and watches your files, pushing updates into the running page via hot module replacement (HMR) so you see changes instantly without losing component state or doing a full page reload; npm run build instead compiles and bundles everything into optimized static files in a dist folder, ready to deploy to a real web server or CDN. Under the hood, the bundler (Vite uses esbuild and Rollup) is doing essential work you don't see: it transforms JSX syntax into plain JavaScript function calls, transpiles newer language features for broader browser support, and bundles many small modules into the few files a browser actually loads efficiently. Choosing between a plain Vite app and a full framework like Next.js or Remix mostly comes down to whether you need extras those frameworks bundle in, like server-side rendering, file-based routing, or built-in data fetching; a bare Vite + React setup is the leanest way to learn the library itself, which is exactly the setup this app's own examples run in.",
  examples: [
    {
      id: "setup-checklist",
      title: "Interactive setup checklist",
      summary: "Tick off each step of scaffolding a new React project.",
      code: `function ChecklistItem({ label, checked, onToggle }) {
  return (
    <label
      style={{
        display: "flex",
        gap: 10,
        alignItems: "center",
        padding: "8px 10px",
        border: "1px solid #d1d5db",
        borderRadius: 6,
        textDecoration: checked ? "line-through" : "none",
        color: checked ? "#9ca3af" : "inherit",
      }}
    >
      <input type="checkbox" checked={checked} onChange={onToggle} />
      {label}
    </label>
  );
}

function App() {
  const [steps, setSteps] = useState([
    { id: 1, label: "Install Node.js", done: false },
    { id: 2, label: "Run npm create vite@latest", done: false },
    { id: 3, label: "cd into the new project folder", done: false },
    { id: 4, label: "Run npm install", done: false },
    { id: 5, label: "Run npm run dev", done: false },
  ]);

  function toggle(id) {
    setSteps((prev) => prev.map((s) => (s.id === id ? { ...s, done: !s.done } : s)));
  }

  const doneCount = steps.filter((s) => s.done).length;

  return (
    <div style={{ display: "grid", gap: 8, maxWidth: 320 }}>
      {steps.map((s) => (
        <ChecklistItem key={s.id} label={s.label} checked={s.done} onToggle={() => toggle(s.id)} />
      ))}
      <p style={{ fontSize: 13, color: "#6b7280" }}>
        {doneCount} / {steps.length} steps complete
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "mock-terminal",
      title: "Mock terminal of setup commands",
      summary: "Step through the commands you'd actually type, with an explanation for each.",
      code: `function App() {
  const commands = [
    { cmd: "npm create vite@latest my-app", note: "Scaffolds a new project from a template" },
    { cmd: "cd my-app", note: "Enter the generated project folder" },
    { cmd: "npm install", note: "Downloads dependencies into node_modules" },
    { cmd: "npm run dev", note: "Starts the dev server with hot reloading" },
    { cmd: "npm run build", note: "Bundles an optimized production build" },
  ];
  const [step, setStep] = useState(0);

  return (
    <div style={{ display: "grid", gap: 10, maxWidth: 380 }}>
      <div
        style={{
          background: "#111827",
          color: "#4ade80",
          fontFamily: "monospace",
          fontSize: 13,
          padding: 12,
          borderRadius: 6,
          minHeight: 90,
        }}
      >
        {commands.slice(0, step + 1).map((c, i) => (
          <div key={i}>$ {c.cmd}</div>
        ))}
      </div>
      <p style={{ fontSize: 13, color: "#4b5563" }}>{commands[step].note}</p>
      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0}>
          Back
        </button>
        <button
          onClick={() => setStep((s) => Math.min(commands.length - 1, s + 1))}
          disabled={step === commands.length - 1}
        >
          Next command
        </button>
      </div>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "hmr-counter",
      title: "What hot reloading feels like",
      summary: "A live counter stands in for how npm run dev updates the page instantly without losing state.",
      code: `function App() {
  const [count, setCount] = useState(0);

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start", maxWidth: 320 }}>
      <p>
        Imagine you edit this component's code while <code>npm run dev</code> is running: the
        page updates instantly in the browser, and state like this counter survives the edit.
      </p>
      <p>Count: <strong>{count}</strong></p>
      <button onClick={() => setCount((c) => c + 1)}>+1 (simulates a live-reloaded UI)</button>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "tooling-stack",
      title: "The tooling stack, visualized",
      summary: "See how Node, npm, and the bundler each play a distinct role, expandable one at a time.",
      code: `function App() {
  const layers = [
    { name: "Node.js", role: "The JavaScript runtime that runs the tooling itself, outside the browser." },
    { name: "npm", role: "Installs dependencies from package.json and runs project scripts." },
    { name: "Bundler (Vite)", role: "Compiles JSX, transpiles modern syntax, and serves/builds the app." },
    { name: "Browser", role: "Loads the final HTML/CSS/JS and runs your React app." },
  ];
  const [open, setOpen] = useState(null);

  return (
    <div style={{ display: "grid", gap: 8, maxWidth: 340 }}>
      {layers.map((l, i) => (
        <div key={l.name} style={{ border: "1px solid #d1d5db", borderRadius: 6, overflow: "hidden" }}>
          <button
            onClick={() => setOpen(open === i ? null : i)}
            style={{ width: "100%", textAlign: "left", padding: 10, background: "#f9fafb", border: "none", cursor: "pointer" }}
          >
            {l.name}
          </button>
          {open === i && <p style={{ margin: 0, padding: "8px 10px", fontSize: 13, color: "#4b5563" }}>{l.role}</p>}
        </div>
      ))}
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "dev-vs-build",
      title: "npm run dev vs. npm run build",
      summary: "Toggle between the two scripts to compare what each one is for.",
      code: `function App() {
  const [mode, setMode] = useState("dev");
  const info = {
    dev: {
      command: "npm run dev",
      points: ["Starts a local dev server", "Hot module replacement on save", "Unminified, fast to rebuild"],
    },
    build: {
      command: "npm run build",
      points: ["Produces a dist/ folder", "Minified and optimized for production", "Meant to be deployed, not edited"],
    },
  };
  const current = info[mode];

  return (
    <div style={{ display: "grid", gap: 10, maxWidth: 320 }}>
      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={() => setMode("dev")} disabled={mode === "dev"}>dev</button>
        <button onClick={() => setMode("build")} disabled={mode === "build"}>build</button>
      </div>
      <div style={{ border: "1px solid #d1d5db", borderRadius: 6, padding: 12 }}>
        <code>{current.command}</code>
        <ul style={{ margin: "8px 0 0", paddingLeft: 18, fontSize: 13, color: "#4b5563" }}>
          {current.points.map((p, i) => (
            <li key={i}>{p}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
