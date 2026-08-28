import type { Topic } from "../../types";

export const nodeProcessObjectTopic: Topic = {
  id: "node-process-object",
  title: "Node.js The Process Object",
  category: "OS & Process",
  shortExplanation: `\`process\` is a **global object** automatically available in every Node.js program — no \`require\`/\`import\` needed — giving access to information and control over the currently running program itself.

- \`process.argv\` — an array of the command-line arguments used to start the program
- \`process.env\` — an object of environment variables available to the process
- \`process.exit(code)\` — immediately ends the program with a given exit code (\`0\` = success, anything else = failure/signal)
- \`process.platform\` / \`process.version\` — which OS and which Node.js version the program is running under`,
  longExplanation: `Every Node.js program automatically has access to a special global object called \`process\` — no \`import\` or \`require\` required — representing the currently running program itself: what was typed to start it, what environment it's running in, and ways to control or inspect it while it runs.

- **\`process.argv\`** is an array of strings holding every command-line argument the program was started with — including, notably, two entries you didn't type yourself: index \`0\` is the path to the Node.js executable, and index \`1\` is the path to the script being run. Anything you actually typed as an argument starts at index \`2\` onward. (This indexing quirk trips up almost everyone the first time — it's covered in detail in the next topic on command-line arguments)
- **\`process.env\`** is a plain object exposing every environment variable available to the process — things like \`PATH\`, \`HOME\`, or any custom variable set before starting the program (\`PORT=3000 node server.js\`, or values loaded from a \`.env\` file, covered in the following topic). A frequent gotcha: **every value in \`process.env\` is always a string**, even ones that look numeric or boolean — \`process.env.PORT\` is the string \`"3000"\`, not the number \`3000\`, and \`process.env.DEBUG\` is the string \`"false"\` even if someone meant it as a boolean — code that forgets this and does math or comparisons directly on an env var without converting it first (\`Number(process.env.PORT)\`) can produce subtle bugs
- **\`process.exit(code)\`** immediately and forcibly terminates the Node.js process, using \`code\` as the program's exit status: \`0\` conventionally means "finished successfully," and any non-zero code signals some kind of failure to whatever shell script, process manager, or CI pipeline is watching for it. It's tempting to reach for \`process.exit()\` freely, but it's **generally discouraged** in ordinary application code — calling it immediately cuts off *everything* still in flight, including asynchronous work that hasn't finished (an unwritten file, an unflushed log line, a database write mid-transaction). The gentler alternative is setting \`process.exitCode = 1\` and letting the program's own logic finish and the event loop drain naturally — Node exits on its own once there's nothing left to do, using whatever \`exitCode\` was set
- **\`process.platform\`** reports the operating system Node.js is running on as a short string — \`"darwin"\` (macOS), \`"win32"\` (Windows), or \`"linux"\`, among others — useful for the rare cases where code genuinely needs to branch based on OS (a file path convention, a platform-specific command). **\`process.version\`** reports which version of Node.js itself is running (e.g. \`"v20.11.1"\`), useful for logging, debugging, or checking that a minimum required version is in use
- \`process\` offers plenty more worth knowing exists: \`process.cwd()\` (the current working directory the process was started from), \`process.memoryUsage()\` (how much memory the process is currently using), and — since \`process\` is itself an \`EventEmitter\` — \`process.on("exit", callback)\` or \`process.on("SIGINT", callback)\` to run cleanup logic when the program is about to end or receives an interrupt signal (like Ctrl+C)

Since this sandbox has no real command line, no real environment variables, and no real Node.js process to exit, every value shown below is a clearly labeled **representative example** — realistic-looking data standing in for what these properties would actually contain if this code ran for real in a terminal, so the *shape* of the data (and how to work with it) transfers directly, even though the specific values here are fixed sample data rather than anything genuinely read from your machine.`,
  examples: [
    {
      id: "argv-representative",
      title: "process.argv: command-line arguments",
      summary: "A representative argv array for: node server.js --port=3000 --verbose",
      code: `// Representative example: in real Node.js this reflects what you actually typed at the terminal.
const fakeArgv = [
  "/usr/local/bin/node",
  "/Users/you/project/server.js",
  "--port=3000",
  "--verbose",
];

function App() {
  return (
    <div style={{ display: "grid", gap: 10 }}>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        Representative process.argv for: node server.js --port=3000 --verbose
      </p>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6 }}>
        {fakeArgv.map((arg, i) => i + ": " + arg).join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "env-representative",
      title: "process.env: environment variables",
      summary: "Click a variable name to see a representative value it might hold.",
      code: `// Representative example — real values would come from the actual OS environment.
const fakeEnv = {
  NODE_ENV: "development",
  PORT: "3000",
  DATABASE_URL: "postgres://localhost:5432/myapp",
  HOME: "/Users/you",
};

function App() {
  const [key, setKey] = useState("NODE_ENV");

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {Object.keys(fakeEnv).map((name) => (
          <button key={name} onClick={() => setKey(name)}>{name}</button>
        ))}
      </div>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, width: "100%" }}>
        {"process.env." + key + " -> " + fakeEnv[key]}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "exit-simulation",
      title: "process.exit(code): ending the program",
      summary: "A non-zero code signals failure to whatever started the process.",
      code: `function App() {
  const [log, setLog] = useState([]);

  function print(value) {
    setLog((prev) => [...prev, value]);
  }

  function simulateExit(code) {
    setLog([]);
    print("Running cleanup code before exit...");
    print("Calling process.exit(" + code + ")");
    if (code === 0) {
      print("Process ends. Exit code 0 tells the OS/shell: everything succeeded.");
    } else {
      print("Process ends. Exit code " + code + " tells the OS/shell: something went wrong.");
    }
    print("(Note: any code written after process.exit() in real Node.js would never run.)");
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={() => simulateExit(0)}>process.exit(0) — success</button>
        <button onClick={() => simulateExit(1)}>process.exit(1) — failure</button>
      </div>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 90 }}>
        {log.length === 0 ? "// output appears here" : log.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "platform-version-representative",
      title: "process.platform and process.version",
      summary: "Representative values describing the OS and Node.js version running the program.",
      code: `// Representative values — the real ones depend on the machine and Node.js version actually running.
const fakeProcessInfo = {
  platform: "darwin",
  version: "v20.11.1",
  arch: "arm64",
};

function App() {
  return (
    <div style={{ display: "grid", gap: 10 }}>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6 }}>
        {"process.platform -> " + fakeProcessInfo.platform + "\\n" +
          "process.version  -> " + fakeProcessInfo.version + "\\n" +
          "process.arch     -> " + fakeProcessInfo.arch}
      </pre>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        platform is one of "darwin" (macOS), "win32" (Windows), or "linux" — useful for
        writing code that needs to behave slightly differently across operating systems.
      </p>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
