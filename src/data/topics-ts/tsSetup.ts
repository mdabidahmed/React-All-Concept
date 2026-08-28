import type { Topic } from "../../types";

export const tsSetupTopic: Topic = {
  id: "ts-setup",
  title: "Setting Up TypeScript",
  category: "TS Basics",
  shortExplanation: `**TypeScript** doesn't run directly — it needs to be installed and compiled ("transpiled") into plain JavaScript before a browser or Node.js can execute it.

- Install it as a **dev dependency** per project: \`npm install --save-dev typescript\` (a global install, \`npm install -g typescript\`, gives you the \`tsc\` command everywhere, but risks every project using a different, possibly mismatched, version)
- The \`tsc\` command compiles a \`.ts\` file into a \`.js\` file sitting right next to it, stripping out every type annotation along the way
- \`tsc --watch\` keeps recompiling automatically every time a source file is saved, instead of running the command by hand each time
- \`ts-node\` runs a \`.ts\` file directly, compiling it in memory and executing the result in one step — handy for scripts and quick experiments`,
  longExplanation: `Every other topic in this subject runs TypeScript directly, right inside this sandbox's live code runner — but that's only possible because the sandbox already did the setup work behind the scenes. On a real project, on your own machine, TypeScript has to be installed and configured before a single line of it can run.

- **Installing the compiler.** TypeScript is distributed as an ordinary npm package. Running \`npm install --save-dev typescript\` adds it to a project's \`devDependencies\` — it's a build-time tool, never something shipped to end users, so it doesn't belong in regular \`dependencies\`. This also pins an exact version *per project*, which starts to matter the moment you have more than one project: a global install (\`npm install -g typescript\`) puts a single \`tsc\` binary on your system's \`PATH\`, shared by everything, which can quietly let one project compile against a newer or older TypeScript version than it was actually written for
- **The \`tsc\` compiler.** Once installed, running \`tsc app.ts\` reads that one file and produces \`app.js\` right beside it — the exact same logic, minus every type annotation, interface, and generic parameter, since none of that has any meaning once the code is actually running. A real project almost always keeps a \`tsconfig.json\` file at its root configuring *how* \`tsc\` should compile (which JS version to target, how strict to be, where output files go, and much more), so the everyday command becomes just \`tsc\`, reading that config automatically instead of needing every option typed out by hand
- **The \`--watch\` flag.** Manually re-running \`tsc\` after every single edit gets old fast. \`tsc --watch\` (or the shorthand \`tsc -w\`) starts the compiler once and leaves it running in the background, watching the filesystem and silently recompiling within a fraction of a second of every save — much closer to the instant feedback loop developers expect from modern tooling
- **\`ts-node\`.** Sometimes a \`.js\` file sitting on disk isn't even wanted — the goal is just to *run* a TypeScript script right now, the way \`node script.js\` runs a JS one. \`ts-node script.ts\` compiles the file in memory and immediately executes the result, skipping the intermediate file entirely. It's popular for one-off scripts, small CLI tools, and test runners, where a full build step would just be friction
- **Where bundler-based projects fit in.** Tools like Vite, webpack, and esbuild (and this very sandbox) rarely shell out to \`tsc\` to actually produce the JavaScript shipped to the browser — they lean on a much faster transpiler (esbuild, SWC, Babel) that strips types on the fly, file by file, without fully type-checking anything. In setups like this, \`tsc\` is often still run separately, commonly as \`tsc --noEmit\`, purely as a *type-checking* pass that catches mistakes, while the fast transpiler handles the actual output. This is exactly why this sandbox can run real \`interface\`, \`type\`, and generic syntax live: react-live's \`enableTypeScript\` option performs that same strip-the-types transpile in the browser, instantly, on every keystroke

The one constant across every setup is the mental model underneath it all: TypeScript source goes in, type annotations get checked against each other and then thrown away, and plain JavaScript comes out the other side — the exact JavaScript you'd have written by hand if the type system didn't exist at all.`,
  examples: [
    {
      id: "before-and-after-tsc",
      title: "Before and after tsc strips the types",
      summary: "The exact same logic, before compiling (with types) and after (plain JS).",
      code: `function App() {
  const beforeLines = [
    "function greet(name: string): string {",
    "  return 'Hello, ' + name + '!';",
    "}",
  ];

  const afterLines = [
    "function greet(name) {",
    "  return 'Hello, ' + name + '!';",
    "}",
  ];

  // The actual typed function, running live right here in the sandbox:
  function greet(name: string): string {
    return "Hello, " + name + "!";
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <p>{greet("Ada")}</p>
      <pre style={{ background: "#111827", color: "#e5e7eb", padding: 10, fontSize: 12 }}>
        {beforeLines.map((line) => (
          <div key={line}>{line}</div>
        ))}
      </pre>
      <pre style={{ background: "#111827", color: "#e5e7eb", padding: 10, fontSize: 12 }}>
        {afterLines.map((line) => (
          <div key={line}>{line}</div>
        ))}
      </pre>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        Running "tsc greet.ts" turns the top block into the bottom block — same behavior, zero type annotations left.
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "dev-dependency-vs-global",
      title: "Dev dependency vs. global install",
      summary: "Two ways to get the tsc command, with different trade-offs per project.",
      code: `interface InstallOption {
  command: string;
  scope: "Per-project" | "Global";
  tradeoff: string;
}

function App() {
  const options: InstallOption[] = [
    {
      command: "npm install --save-dev typescript",
      scope: "Per-project",
      tradeoff: "Pins an exact tsc version per project — recommended for real projects.",
    },
    {
      command: "npm install -g typescript",
      scope: "Global",
      tradeoff: "One shared tsc on your PATH — quick for experiments, but every project uses the same version.",
    },
  ];

  return (
    <div style={{ display: "grid", gap: 10 }}>
      {options.map((opt) => (
        <div key={opt.command} style={{ border: "1px solid #d1d5db", borderRadius: 6, padding: 10 }}>
          <code>{opt.command}</code>
          <p style={{ margin: "4px 0", fontWeight: 600 }}>{opt.scope}</p>
          <p style={{ color: "#6b7280", fontSize: 13 }}>{opt.tradeoff}</p>
        </div>
      ))}
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "watch-mode-timeline",
      title: "What --watch does over time",
      summary: "tsc --watch recompiles automatically after each save, instead of waiting for a manual command.",
      code: `interface WatchEvent {
  time: string;
  event: string;
}

function App() {
  const timeline: WatchEvent[] = [
    { time: "0:00", event: "Run tsc --watch once — the compiler starts and does an initial full compile." },
    { time: "0:42", event: "You save app.ts — the watcher notices instantly and recompiles just that file." },
    { time: "1:15", event: "You save it again with a type error — tsc reprints the error, no manual re-run needed." },
    { time: "2:03", event: "You stop the terminal process (Ctrl+C) — watching stops." },
  ];

  return (
    <ol style={{ display: "grid", gap: 8, paddingLeft: 20 }}>
      {timeline.map((item) => (
        <li key={item.time}>
          <strong>{item.time}</strong> — {item.event}
        </li>
      ))}
    </ol>
  );
}

render(<App />);`,
    },
    {
      id: "tsc-then-node-vs-ts-node",
      title: "tsc + node vs. ts-node in one step",
      summary: "Two equivalent workflows for actually running a TypeScript file.",
      code: `function App() {
  const twoStepWorkflow: string[] = [
    "1. tsc app.ts    (compiles app.ts into app.js)",
    "2. node app.js   (runs the plain JS output)",
  ];

  const oneStepWorkflow: string[] = [
    "1. ts-node app.ts   (compiles in memory AND runs it, immediately)",
  ];

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
      <div>
        <p style={{ fontWeight: 600 }}>tsc, then node</p>
        {twoStepWorkflow.map((line) => (
          <p key={line} style={{ fontFamily: "monospace", fontSize: 13 }}>{line}</p>
        ))}
      </div>
      <div>
        <p style={{ fontWeight: 600 }}>ts-node</p>
        {oneStepWorkflow.map((line) => (
          <p key={line} style={{ fontFamily: "monospace", fontSize: 13 }}>{line}</p>
        ))}
      </div>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
