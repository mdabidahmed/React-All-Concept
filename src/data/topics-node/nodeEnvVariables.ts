import type { Topic } from "../../types";

export const nodeEnvVariablesTopic: Topic = {
  id: "node-env-variables",
  title: "Node.js Environment Variables",
  category: "OS & Process",
  shortExplanation: `Node.js exposes every environment variable available to the running process as string properties on \`process.env\` — reading one is as simple as \`process.env.VARIABLE_NAME\`, no import needed.

- Environment variables hold **configuration that changes between environments**: a database URL, an API key, a port number, or \`NODE_ENV\` (\`"development"\` vs \`"production"\`)
- Reading an unset variable returns \`undefined\`, not an error — code typically falls back with \`process.env.PORT || "3000"\`
- The \`dotenv\` package convention loads a local \`.env\` file's \`KEY=value\` lines into \`process.env\` at startup, so secrets never have to live in source code`,
  longExplanation: `Hardcoding configuration directly into source code — a database connection string, a third-party API key, a port number — creates a real problem the moment that code needs to run somewhere other than the machine it was written on. Environment variables solve this: they're values supplied by the *environment* a process runs in (the OS shell, a hosting platform's dashboard, a CI pipeline's secrets settings) rather than being written into the code itself. Node.js exposes every one of them automatically as a plain object called \`process.env\` — no \`require\`/\`import\` needed, since it's simply a property of the built-in global \`process\` object (covered in an earlier topic).

- **Reading a value** is simply \`process.env.SOME_KEY\`. If a shell started the program with \`PORT=4000 node server.js\`, then inside that program \`process.env.PORT\` is \`"4000"\`. If the variable was never set at all, the result is \`undefined\` — not an error, not an empty string — so code almost always guards against a missing value with a fallback: \`const port = process.env.PORT || "3000";\`
- **Every single value is a string.** This is one of the most common real gotchas: \`process.env.PORT\` is never the number \`3000\`, it's the string \`"3000"\`, even though it looks numeric. \`process.env.PORT + 1\` concatenates instead of adding (producing \`"30001"\`), and \`process.env.DEBUG === true\` is *always* \`false\`, no matter what, because \`process.env.DEBUG\` can only ever equal the string \`"true"\` or \`"false"\`, never a real boolean. Code that needs a number or boolean has to convert explicitly — \`Number(process.env.PORT)\`, \`process.env.DEBUG === "true"\`
- **Why environment variables exist at all**: the exact same codebase typically needs to behave differently across a developer's laptop, a staging server, and production — a local database instead of a managed cloud one, a sandbox payment API instead of the real one, verbose logging instead of quiet logging. Environment variables let *one* unmodified program read different values in each place, rather than editing source code (and risking a forgotten edit before deploying) every time it moves
- **\`NODE_ENV\`** is the most widely recognized environment variable in the Node ecosystem, purely by convention — nothing in Node itself forces its meaning, but an enormous number of tools and libraries check \`process.env.NODE_ENV\` and behave differently for \`"development"\` (verbose errors, no caching) versus \`"production"\` (minimal error detail shown to end users, performance optimizations enabled)
- **The \`dotenv\` package** solves a practical problem: typing a long list of \`VAR=value\` pairs before every \`node server.js\` command is tedious and error-prone, and real secrets shouldn't end up sitting in shell history either. Instead, a project keeps a plain-text \`.env\` file (simple \`KEY=value\` lines, one per line) in its root, and a single line near the top of the entry file — \`require("dotenv").config()\`, or \`import "dotenv/config"\` in newer code — reads that file and copies its keys onto \`process.env\` before the rest of the app runs. Because a \`.env\` file usually holds real secrets, it's added to \`.gitignore\` and never committed — a project instead commits a \`.env.example\` listing just the expected key *names*, so teammates know what to fill in locally without ever seeing the real values. (The full mechanics of parsing a \`.env\` file are covered in more depth in a later NPM & Deployment topic — this topic focuses on \`process.env\` itself)

Since this sandbox is a browser tab with no real operating-system environment to read from, every example below **simulates** \`process.env\` as a plain JavaScript object holding representative values — the property access, the always-a-string behavior, and the missing-key fallback pattern all work exactly the way they would against Node's real \`process.env\`.`,
  examples: [
    {
      id: "reading-process-env",
      title: "Reading values from process.env (simulated)",
      summary: "Click a variable name to see process.env.KEY read directly.",
      code: `// Representative example -- real values would come from the actual OS environment.
const fakeEnv = {
  NODE_ENV: "development",
  PORT: "4000",
  DATABASE_URL: "postgres://localhost:5432/myapp",
  API_KEY: "sk_test_abc123",
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
        {"process.env." + key + " -> " + JSON.stringify(fakeEnv[key])}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "default-fallback-value",
      title: "Falling back to a default when a variable is missing",
      summary: "process.env.TIMEOUT || \"5000\" -- the standard pattern for optional configuration.",
      code: `// TIMEOUT was never set in this fake environment -- only PORT was.
const fakeEnv = { PORT: "4000" };

function App() {
  const port = fakeEnv.PORT || "3000";
  const timeout = fakeEnv.TIMEOUT || "5000";

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6 }}>
        {"process.env.PORT -> " + JSON.stringify(fakeEnv.PORT) + "\\n" +
          "process.env.PORT || \\"3000\\" -> " + port + "  (real value was used)\\n\\n" +
          "process.env.TIMEOUT -> " + JSON.stringify(fakeEnv.TIMEOUT) + "\\n" +
          "process.env.TIMEOUT || \\"5000\\" -> " + timeout + "  (fell back to the default)"}
      </pre>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        A missing environment variable is undefined, not an error -- so code reads it with a
        fallback rather than assuming it will always be set.
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "values-are-always-strings",
      title: "Gotcha: process.env values are always strings",
      summary: "RETRIES looks numeric but isn't -- forgetting to convert causes a concatenation bug.",
      code: `const fakeEnv = { RETRIES: "3" };

function App() {
  const rawRetries = fakeEnv.RETRIES;
  const numericRetries = Number(fakeEnv.RETRIES);

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6 }}>
        {"typeof process.env.RETRIES -> " + typeof rawRetries + "\\n\\n" +
          "process.env.RETRIES + 1 -> " + JSON.stringify(rawRetries + 1) +
          "   (string concatenation -- probably a bug)\\n" +
          "Number(process.env.RETRIES) + 1 -> " + (numericRetries + 1) +
          "   (correct)"}
      </pre>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        Every value on process.env is a string, even ones that look numeric or boolean --
        code that needs a real number has to convert explicitly.
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "node-env-conditional-config",
      title: "Choosing configuration based on NODE_ENV",
      summary: "The same code picks a different API base URL and log level from one variable's value.",
      code: `function getConfig(nodeEnv) {
  if (nodeEnv === "production") {
    return { apiBaseUrl: "https://api.example.com", logLevel: "error" };
  }
  return { apiBaseUrl: "https://api-sandbox.example.com", logLevel: "debug" };
}

function App() {
  const [nodeEnv, setNodeEnv] = useState("development");
  const config = getConfig(nodeEnv);

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <label style={{ display: "grid", gap: 4 }}>
        process.env.NODE_ENV:
        <select value={nodeEnv} onChange={(e) => setNodeEnv(e.target.value)} style={{ padding: 6 }}>
          <option value="development">development</option>
          <option value="production">production</option>
        </select>
      </label>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6 }}>
        {"apiBaseUrl -> " + config.apiBaseUrl + "\\n" + "logLevel   -> " + config.logLevel}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "simulated-dotenv-load",
      title: "Loading a .env file into process.env (simulated)",
      summary: "A brief look at what require(\"dotenv\").config() does -- full parsing detail lives in the NPM & Deployment topic.",
      code: `const dotEnvFileContents = [
  "# .env -- local development settings, never committed",
  "PORT=4000",
  "DATABASE_URL=postgres://localhost:5432/myapp_dev",
].join("\\n");

function App() {
  const [processEnv, setProcessEnv] = useState({});

  function loadDotenv() {
    const loaded = {};
    dotEnvFileContents.split("\\n").forEach((line) => {
      if (!line || line.startsWith("#")) return;
      const equalsIndex = line.indexOf("=");
      loaded[line.slice(0, equalsIndex)] = line.slice(equalsIndex + 1);
    });
    setProcessEnv(loaded);
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <pre style={{ background: "#111827", color: "#e5e7eb", padding: 12, borderRadius: 6 }}>{dotEnvFileContents}</pre>
      <button onClick={loadDotenv}>require("dotenv").config()</button>
      <pre style={{ background: "#000", color: "#4ade80", padding: 12, borderRadius: 6, minHeight: 60 }}>
        {Object.keys(processEnv).length === 0
          ? "// process.env stays empty until dotenv loads the file"
          : "process.env now has:\\n" + JSON.stringify(processEnv, null, 2)}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
