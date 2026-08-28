import type { Topic } from "../../types";

export const nodeCommandLineArgsTopic: Topic = {
  id: "node-command-line-args",
  title: "Node.js Command-Line Arguments",
  category: "OS & Process",
  shortExplanation: `\`process.argv\` is an array of every command-line argument a Node.js program was started with — but the first **two** entries aren't arguments a user typed, they're the path to the \`node\` executable and the path to the script itself.

- Index \`0\` — path to the Node.js executable; index \`1\` — path to the running script
- Anything actually typed after the script name starts at index \`2\`
- \`process.argv.slice(2)\` is the standard idiom for getting just the "real" arguments
- Real CLI tools parse flags like \`--name=Ada\` or \`--verbose\` out of that sliced array manually, or with a library like \`yargs\`/\`commander\``,
  longExplanation: `Any Node.js program can be started from a terminal with extra words typed after the filename — \`node server.js --port=4000 --verbose\` — and every one of those typed words is available to the running program through \`process.argv\`, an array of strings that's part of the global \`process\` object covered in an earlier topic.

The single most important thing to know about \`process.argv\` is its indexing, because it trips up nearly everyone the first time. Running \`node script.js --name=Ada\` produces an array that looks like this:

- \`argv[0]\` — the absolute path to the Node.js executable itself, e.g. \`"/usr/local/bin/node"\`
- \`argv[1]\` — the absolute path to the script being run, e.g. \`"/Users/you/project/script.js"\`
- \`argv[2]\` and onward — the arguments actually typed after the script name, in order: \`"--name=Ada"\`

Neither of the first two entries was something the person running the command consciously supplied as "an argument" in the everyday sense — they're implementation details of how Node itself was launched. Code that wants just the user-supplied arguments almost always starts with \`const args = process.argv.slice(2);\`, discarding the first two entries and leaving a clean array to work with. Forgetting this — reading \`process.argv[0]\` expecting the first real argument, for instance — is a classic off-by-two bug.

**Parsing the arguments themselves** is entirely manual work with plain Node.js — there's no built-in flag parser. A few common conventions programs choose to support:

- **\`--key=value\` flags**: an argument like \`"--port=4000"\` is typically split on its first \`=\` character to separate the flag name from its value — \`arg.slice(2, arg.indexOf("="))\` for the name, \`arg.slice(arg.indexOf("=") + 1)\` for the value (the \`slice(2)\` strips the leading \`--\`)
- **Boolean flags**: an argument like \`"--verbose"\` that never has a value attached is usually treated as simply *present or absent* — code checks \`args.includes("--verbose")\` rather than trying to parse a value out of it
- **Positional arguments**: some CLI tools expect plain, unlabeled values in a fixed order (\`cp source.txt destination.txt\`) rather than named flags at all — those are just read directly off the sliced array by index

A hand-rolled parser like this works fine for a script with one or two flags, but it gets unwieldy fast once a tool needs to support many flags, short aliases (\`-v\` as well as \`--verbose\`), required-vs-optional arguments, or auto-generated \`--help\` text. Real-world CLI tools almost always reach for a dedicated argument-parsing package — \`yargs\` and \`commander\` are two of the most widely used — rather than hand-writing this logic from scratch once it grows past the basics. Understanding the raw \`process.argv\` shape underneath, though, is exactly what makes those libraries' behavior make sense.

Since this sandbox has no real terminal to launch a program from, every example below **simulates** \`process.argv\` as a plain array of representative strings, shaped exactly like the real thing (executable path, script path, then user arguments) — the slicing and parsing logic shown works identically against Node's real \`process.argv\`.`,
  examples: [
    {
      id: "argv-basics",
      title: "process.argv: what's actually in the array",
      summary: "The first two entries aren't arguments a user typed -- the real ones start at index 2.",
      code: `// Representative array for: node greet.js --name=Ada --verbose
const fakeArgv = [
  "/usr/local/bin/node",
  "/Users/you/project/greet.js",
  "--name=Ada",
  "--verbose",
];

function App() {
  return (
    <div style={{ display: "grid", gap: 10 }}>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        Representative process.argv for: node greet.js --name=Ada --verbose
      </p>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6 }}>
        {fakeArgv.map((arg, i) => i + ": " + arg + (i < 2 ? "   (not a user argument)" : "")).join("\\n")}
      </pre>
      <pre style={{ background: "#000", color: "#4ade80", padding: 12, borderRadius: 6 }}>
        {"process.argv.slice(2) -> " + JSON.stringify(fakeArgv.slice(2))}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "parsing-key-value-flag",
      title: "Extracting a --key=value flag",
      summary: "Splitting an argument like --name=Ada into its key and value by hand.",
      code: `const fakeArgs = ["--name=Ada", "--port=4000"];

function getFlagValue(args, flagName, fallback) {
  const prefix = "--" + flagName + "=";
  const found = args.find((arg) => arg.startsWith(prefix));
  if (!found) return fallback;
  return found.slice(prefix.length);
}

function App() {
  const name = getFlagValue(fakeArgs, "name", "World");
  const port = getFlagValue(fakeArgs, "port", "3000");
  const missing = getFlagValue(fakeArgs, "host", "localhost");

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6 }}>
        {"argv.slice(2) -> " + JSON.stringify(fakeArgs) + "\\n\\n" +
          "--name  -> " + name + "\\n" +
          "--port  -> " + port + "\\n" +
          "--host  -> " + missing + "   (not present, used the fallback)"}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "boolean-flag-presence",
      title: "Boolean flags: checking for presence, not a value",
      summary: "A flag like --verbose has no value attached -- it's just there or it isn't.",
      code: `const fakeArgs = ["build", "--verbose", "--minify"];

function App() {
  const isVerbose = fakeArgs.includes("--verbose");
  const isMinify = fakeArgs.includes("--minify");
  const isWatch = fakeArgs.includes("--watch");

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6 }}>
        {"argv.slice(2) -> " + JSON.stringify(fakeArgs) + "\\n\\n" +
          "--verbose present? -> " + isVerbose + "\\n" +
          "--minify present?  -> " + isMinify + "\\n" +
          "--watch present?   -> " + isWatch}
      </pre>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        No "=value" needed for a boolean flag -- args.includes("--verbose") is enough to detect it.
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "tiny-argv-parser",
      title: "Building a tiny CLI argument parser",
      summary: "Turning a whole argv-style array into one convenient options object.",
      code: `function parseArgs(args) {
  const options = { flags: {}, booleans: [] };
  args.forEach((arg) => {
    if (!arg.startsWith("--")) return;
    const withoutDashes = arg.slice(2);
    const equalsIndex = withoutDashes.indexOf("=");
    if (equalsIndex === -1) {
      options.booleans.push(withoutDashes);
    } else {
      const key = withoutDashes.slice(0, equalsIndex);
      const value = withoutDashes.slice(equalsIndex + 1);
      options.flags[key] = value;
    }
  });
  return options;
}

const scenarios = {
  "node deploy.js --env=production --force": ["--env=production", "--force"],
  "node deploy.js --env=staging --dry-run --region=us-east": ["--env=staging", "--dry-run", "--region=us-east"],
};

function App() {
  const [command, setCommand] = useState(Object.keys(scenarios)[0]);
  const parsed = parseArgs(scenarios[command]);

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {Object.keys(scenarios).map((cmd) => (
          <button key={cmd} onClick={() => setCommand(cmd)}>{cmd}</button>
        ))}
      </div>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, width: "100%" }}>
        {"parseArgs(process.argv.slice(2)) ->\\n" + JSON.stringify(parsed, null, 2)}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
