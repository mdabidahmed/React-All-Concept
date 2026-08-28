import type { Topic } from "../../types";

export const nodePackageJsonTopic: Topic = {
  id: "node-package-json",
  title: "package.json",
  category: "Node.js Basics",
  shortExplanation: `\`package.json\` is the **manifest file** at the root of every Node.js project — it identifies the project and records everything npm needs to install its dependencies and run its scripts.

- \`name\` and \`version\` identify the project (or package, if published)
- \`main\` (or the newer \`exports\`) points to the file another project would get when it imports this one
- \`scripts\`, \`dependencies\`, and \`devDependencies\` are the fields you'll edit constantly during real development`,
  longExplanation: `Every Node.js project starts with a \`package.json\` file, typically created by running \`npm init\` (or \`npm init -y\` to accept every default without being prompted). It's a plain JSON file, but it functions as the project's identity card, dependency list, and command shortcuts all at once.

- **\`name\`**: the project's name — lowercase, no spaces, using hyphens instead (\`my-cool-app\`). If the package is ever published to the npm registry, this is the name other people would install it under.
- **\`version\`**: the project's current version, following semantic versioning (\`major.minor.patch\`, covered in the npm introduction topic). Even projects never meant for publishing still have a version — many tools expect the field to exist.
- **\`main\`**: the entry-point file that's returned when *another* project runs \`require("your-package-name")\` (relevant mainly for packages you intend to publish, not application code that only runs itself). \`"main": "index.js"\` means \`index.js\` is what gets loaded.
- **\`exports\`**: the newer, more precise replacement for \`main\`. Where \`main\` can only point to a single file, \`exports\` can define multiple named entry points, and — importantly — can explicitly restrict which internal files consumers are allowed to import at all, whereas \`main\` alone leaves every file in the package technically reachable. Many modern packages define both, since \`main\` is still needed as a fallback for older tooling that doesn't understand \`exports\`.
- **\`scripts\`**: an object mapping short names to shell commands, run with \`npm run <name>\` — for example \`"dev": "vite"\` lets you type \`npm run dev\` instead of remembering and typing the full underlying command. A small number of script names (\`start\`, \`test\`) get a shorthand: \`npm start\` and \`npm test\` work without the word "run". This is genuinely one of the most-used parts of the entire file in day-to-day development — it standardizes how a project is built, tested, and run so nobody has to memorize project-specific command-line invocations.
- **\`dependencies\`**: packages the application actually needs to *run* — things imported by the real application code, needed in production. Installed with \`npm install package-name\`.
- **\`devDependencies\`**: packages only needed while *developing* the project — testing frameworks, linters, build tools like \`vite\` or \`typescript\` itself — but never imported by the code that actually ships and runs in production. Installed with \`npm install -D package-name\` (or \`--save-dev\`). This distinction matters because production deployments can often skip installing \`devDependencies\` entirely (\`npm install --omit=dev\`), keeping the deployed footprint smaller.
- A few other fields worth recognizing: \`"type": "module"\` (switches the project to ES modules by default, covered in this subject's ES Modules topic), \`"license"\`, \`"description"\`, and \`"engines"\` (declares which Node.js version(s) the project expects, so a mismatch can be flagged early).
- **A common gotcha**: \`dependencies\` and \`devDependencies\` are edited automatically by \`npm install\`/\`npm install -D\` — hand-editing version numbers directly in \`package.json\` and then forgetting to actually run \`npm install\` afterward means \`node_modules\` and \`package-lock.json\` silently fall out of sync with what the file claims.

Since \`package.json\` is a real, plain JSON object, this topic's examples are a case where genuine JavaScript can render it faithfully — building a representative object and passing it through \`JSON.stringify(obj, null, 2)\` produces output that looks exactly like a real file's contents, because that's exactly what a real \`package.json\` is: JSON, nothing more.`,
  examples: [
    {
      id: "a-representative-package-json",
      title: "A representative package.json, rendered for real",
      summary: "JSON.stringify formats this object exactly the way it would appear in a real file.",
      code: `function App() {
  const pkg = {
    name: "my-cool-app",
    version: "1.4.0",
    type: "module",
    main: "index.js",
    scripts: {
      dev: "vite",
      build: "tsc -b && vite build",
      test: "vitest",
    },
    dependencies: {
      react: "^19.2.8",
      "react-dom": "^19.2.8",
    },
    devDependencies: {
      typescript: "~6.0.2",
      vite: "^8.2.2",
    },
  };

  const formatted = JSON.stringify(pkg, null, 2);

  return (
    <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, overflow: "auto" }}>
      {formatted}
    </pre>
  );
}

render(<App />);`,
    },
    {
      id: "field-by-field-reference",
      title: "Each field, explained",
      summary: "A quick lookup table pairing each common field with what it controls.",
      code: `function App() {
  const fields = [
    { key: "name", desc: "The project's identifying name (lowercase, hyphenated)." },
    { key: "version", desc: "Current semantic version, major.minor.patch." },
    { key: "main", desc: "Entry file returned when another project requires this one." },
    { key: "scripts", desc: "Named shell commands, run via npm run <name>." },
    { key: "dependencies", desc: "Packages needed at runtime, in production." },
    { key: "devDependencies", desc: "Packages needed only during development (tests, build tools)." },
  ];

  return (
    <div style={{ display: "grid", gap: 6 }}>
      {fields.map((f) => (
        <div key={f.key} style={{ display: "flex", gap: 10 }}>
          <code style={{ background: "#111827", color: "#d1fae5", padding: "2px 6px", borderRadius: 4, minWidth: 130 }}>
            {f.key}
          </code>
          <span style={{ color: "#6b7280" }}>{f.desc}</span>
        </div>
      ))}
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "simulated-npm-run-script",
      title: "npm run dev reads the scripts field (simulated)",
      summary: "Running a named script looks up the matching command from package.json and executes it.",
      code: `const pkg = {
  scripts: {
    dev: "vite",
    build: "tsc -b && vite build",
  },
};

function runScript(name) {
  const command = pkg.scripts[name];
  if (!command) {
    return "npm error: missing script: \\"" + name + "\\"";
  }
  return "$ npm run " + name + "\\n> " + command + "\\n\\nVITE ready in 320 ms";
}

function App() {
  const [output, setOutput] = useState("");

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={() => setOutput(runScript("dev"))}>npm run dev</button>
        <button onClick={() => setOutput(runScript("lint"))}>npm run lint (doesn't exist)</button>
      </div>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 90 }}>
        {output || "// output appears here"}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "dependencies-vs-dev-dependencies",
      title: "Filtering dependencies vs. devDependencies",
      summary: "A production install only needs one of these two lists — real filtering logic, no simulation needed.",
      code: `const pkg = {
  dependencies: { react: "^19.2.8", express: "^4.18.2" },
  devDependencies: { typescript: "~6.0.2", vitest: "^1.2.0" },
};

function App() {
  const [mode, setMode] = useState("production");

  const packagesToInstall =
    mode === "production"
      ? Object.keys(pkg.dependencies)
      : [...Object.keys(pkg.dependencies), ...Object.keys(pkg.devDependencies)];

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={() => setMode("production")}>Production install</button>
        <button onClick={() => setMode("full")}>Full (dev) install</button>
      </div>
      <p>Mode: <strong>{mode}</strong></p>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6 }}>
        {packagesToInstall.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
