import type { Topic } from "../../types";

export const nodeNpmScriptsTopic: Topic = {
  id: "node-npm-scripts",
  title: "Node.js NPM Scripts",
  category: "NPM & Deployment",
  shortExplanation: `The **\`"scripts"\`** field in \`package.json\` maps short names to shell commands, so a whole team runs the same command the same way — \`npm run script-name\` executes whatever command string is listed under \`"script-name"\`.

- \`npm start\` and \`npm test\` are special-cased shorthands — they run the \`start\`/\`test\` scripts *without* needing the word \`run\`
- Every other script name needs the full form: \`npm run dev\`, \`npm run build\`, \`npm run lint\`
- Scripts automatically get locally-installed CLI tools (like \`vite\` or \`eslint\`) on their \`PATH\`, so they run without being installed globally anywhere`,
  longExplanation: `Every \`package.json\` can have a \`"scripts"\` field — a plain object mapping short names to arbitrary shell command strings. Running \`npm run <name>\` looks up \`<name>\` in that object and executes the associated string exactly as if it had been typed into a terminal. This sounds almost too simple to matter, but it solves a real, recurring problem: without it, every developer (and every CI system) needs to independently know the exact right incantation to build, test, or start a project — with \`scripts\`, that knowledge lives in one committed file, and everyone just runs \`npm run build\`.

- **A key piece of "magic": the local \`.bin\` PATH.** When a package like \`vite\` or \`eslint\` is installed as a project dependency, npm places a small executable for it inside \`node_modules/.bin\`. That folder isn't on your terminal's normal \`PATH\` — but npm automatically *does* put it on the \`PATH\` for the duration of any script it runs. This is why a script can simply say \`"build": "vite build"\` and it works, even though \`vite\` was never installed globally on the machine; without \`npm run\`, typing \`vite build\` directly into a normal terminal would fail with "command not found"
- **\`npm start\` and \`npm test\` are special.** Historically, these two script names can be run without the word \`run\` — \`npm start\` instead of \`npm run start\`, \`npm test\` instead of \`npm run test\`. Every other script name (\`dev\`, \`build\`, \`lint\`, anything custom) always needs the full \`npm run <name>\` form. This inconsistency is purely historical (these two commands existed in npm before the general-purpose \`run\` mechanism did) rather than logical, and trips up plenty of people expecting \`npm dev\` to work by analogy — it doesn't
- **Pre/post hooks run automatically.** If a script named \`pretest\` exists, \`npm test\` runs it *automatically* immediately before running \`test\` itself — no explicit call needed. The same applies to any script name prefixed with \`pre\`/\`post\` matching another script's name (\`prebuild\` before \`build\`, \`postbuild\` after it). This convention is commonly used to run a linter or type-check automatically before tests, or to run a cleanup step automatically after a build
- **Common script names and what they typically do** (none of these names are enforced by npm itself — they're strong team/ecosystem conventions):
  - \`"dev"\`: starts a local development server, usually with hot-reloading, so changes show up instantly without a manual rebuild (e.g. \`vite\`, \`next dev\`)
  - \`"build"\`: produces an optimized, production-ready output — minified, bundled, often type-checked (e.g. \`vite build\`, \`tsc\`)
  - \`"start"\`: runs the already-built production output (a compiled server, or a static file server for a built frontend) — distinct from \`"dev"\`, which usually runs source files directly with extra developer conveniences \`"start"\` intentionally skips for speed and correctness in production
  - \`"test"\`: runs the project's automated test suite (via Jest, Vitest, Mocha, or similar)
  - \`"lint"\`: runs a static-analysis tool (typically ESLint) that flags style issues and likely bugs without actually running the code
- **Forwarding extra arguments**: anything after a literal \`--\` in an \`npm run\` invocation is passed straight through to the underlying command rather than being interpreted by npm itself — e.g. \`npm run build -- --mode production\` runs the \`build\` script's command with \`--mode production\` appended to it
- **Why this matters beyond convenience**: CI/CD pipelines, deployment platforms, and other engineers on a team all typically call the *same* small set of standard script names (\`build\`, \`test\`, \`start\`) rather than needing to know a project's specific tool choices. This means the underlying tools can be swapped out later (a new bundler, a new test runner) without breaking anything that depends on the *script names* staying the same

Because this sandbox has no real terminal, shell, or installed CLI tools to actually run, the examples below simulate an \`npm run\` invocation: clicking a script name plays back the *kind* of output that command would realistically print in an actual terminal, clearly presented as illustrative sample output rather than a live process.`,
  examples: [
    {
      id: "representative-scripts-field",
      title: "A representative package.json scripts field",
      summary: "Click a script name to see the kind of output it would typically print in a real terminal.",
      code: `const scripts = {
  dev: "vite",
  build: "vite build",
  start: "node server.js",
  test: "vitest run",
  lint: "eslint .",
};

const sampleOutput = {
  dev: "  VITE v5.2.0  ready in 312 ms\\n\\n  ➜  Local:   http://localhost:5173/\\n  ➜  press h to show help",
  build: "vite v5.2.0 building for production...\\n✓ 148 modules transformed.\\ndist/index.html   0.46 kB\\ndist/assets/index.js  86.21 kB\\n✓ built in 1.42s",
  start: "Server listening on port 3000",
  test: "✓ src/math.test.js (3 tests) 4ms\\n\\nTest Files  1 passed (1)\\n     Tests  3 passed (3)",
  lint: "✔ No ESLint warnings or errors found",
};

function App() {
  const [command, setCommand] = useState("");
  const [output, setOutput] = useState("");

  function run(name) {
    const invocation = name === "start" || name === "test" ? "npm " + name : "npm run " + name;
    setCommand(invocation);
    setOutput("Running: " + scripts[name] + " ...");
    setTimeout(() => setOutput(sampleOutput[name]), 500);
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <pre style={{ background: "#111827", color: "#e5e7eb", padding: 12, borderRadius: 6 }}>
        {JSON.stringify({ scripts: scripts }, null, 2)}
      </pre>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {Object.keys(scripts).map((name) => (
          <button key={name} onClick={() => run(name)}>
            {name === "start" || name === "test" ? "npm " + name : "npm run " + name}
          </button>
        ))}
      </div>
      <pre style={{ background: "#000", color: "#4ade80", padding: 12, borderRadius: 6, minHeight: 100 }}>
        {command ? "$ " + command + "\\n" + output : "// pick a script above"}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "start-test-shorthand",
      title: "npm start / npm test are special-cased",
      summary: "Only these two names skip the word 'run' -- every other script always needs the full npm run form.",
      code: `const validInvocations = {
  start: ["npm start", "npm run start"],
  test: ["npm test", "npm run test"],
  dev: ["npm run dev"],
  build: ["npm run build"],
};

function App() {
  const [selected, setSelected] = useState("dev");
  const [attempt, setAttempt] = useState("npm dev");

  const isValid = validInvocations[selected].includes(attempt);

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <label style={{ display: "grid", gap: 4 }}>
        Script name:
        <select value={selected} onChange={(e) => setSelected(e.target.value)} style={{ padding: 6 }}>
          <option value="dev">dev</option>
          <option value="build">build</option>
          <option value="start">start</option>
          <option value="test">test</option>
        </select>
      </label>
      <label style={{ display: "grid", gap: 4 }}>
        Try an invocation:
        <input value={attempt} onChange={(e) => setAttempt(e.target.value)} style={{ padding: 6 }} />
      </label>
      <p style={{ color: isValid ? "#22c55e" : "#ef4444" }}>
        {isValid ? "Works: " + attempt : "Won't run as typed: " + attempt}
      </p>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        Valid forms for "{selected}": {validInvocations[selected].join(" or ")}
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "pre-post-hooks",
      title: "pre/post hooks run automatically",
      summary: "A 'pretest' script runs by itself right before 'test' -- no explicit call needed.",
      code: `const scripts = {
  pretest: "eslint .",
  test: "vitest run",
};

function App() {
  const [log, setLog] = useState([]);

  function print(value) {
    setLog((prev) => [...prev, value]);
  }

  function runNpmTest() {
    setLog([]);
    print("$ npm test");
    print("> pretest -- " + scripts.pretest + " (runs automatically first)");
    setTimeout(() => {
      print("  \\u2714 No ESLint warnings or errors found");
      setTimeout(() => {
        print("> test -- " + scripts.test);
        setTimeout(() => {
          print("  \\u2714 3 tests passed");
        }, 400);
      }, 300);
    }, 400);
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <pre style={{ background: "#111827", color: "#e5e7eb", padding: 12, borderRadius: 6 }}>
        {JSON.stringify({ scripts: scripts }, null, 2)}
      </pre>
      <button onClick={runNpmTest}>npm test</button>
      <pre style={{ background: "#000", color: "#4ade80", padding: 12, borderRadius: 6, minHeight: 100 }}>
        {log.length === 0 ? "// run npm test to see pretest fire automatically" : log.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "forwarding-extra-args",
      title: "Forwarding extra arguments with --",
      summary: "Everything after a literal -- is passed straight through to the underlying command, not interpreted by npm.",
      code: `function parseNpmRunInvocation(invocation) {
  const dashDashIndex = invocation.indexOf(" -- ");
  if (dashDashIndex === -1) {
    return { scriptPart: invocation, forwardedArgs: "" };
  }
  return {
    scriptPart: invocation.slice(0, dashDashIndex),
    forwardedArgs: invocation.slice(dashDashIndex + 4),
  };
}

const scripts = { build: "vite build" };

function App() {
  const [invocation, setInvocation] = useState("npm run build -- --mode production");
  const parsed = parseNpmRunInvocation(invocation);
  const scriptName = parsed.scriptPart.replace("npm run ", "").trim();
  const underlyingCommand = scripts[scriptName] || "(unknown script)";
  const finalCommand = parsed.forwardedArgs ? underlyingCommand + " " + parsed.forwardedArgs : underlyingCommand;

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <label style={{ display: "grid", gap: 4 }}>
        Try an invocation:
        <input value={invocation} onChange={(e) => setInvocation(e.target.value)} style={{ padding: 6 }} />
      </label>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6 }}>
        {"actually executes: " + finalCommand}
      </pre>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        The "-- " separator tells npm: everything after this is for the underlying command, not for npm itself.
      </p>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
