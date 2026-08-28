import type { Topic } from "../../types";

export const nodeEnvConfigTopic: Topic = {
  id: "node-env-config",
  title: "Node.js Environment Configuration",
  category: "NPM & Deployment",
  shortExplanation: `**\`.env\`** files hold key-value configuration (API URLs, secrets, feature flags) outside the codebase itself; the \`dotenv\` package reads a \`.env\` file at startup and copies its values onto Node's built-in \`process.env\` object, so the rest of the app just reads \`process.env.SOME_KEY\` like any other environment variable.

- Configuration that **varies by environment** (a local database URL vs. a production one) shouldn't be hardcoded — it should be read from \`process.env\` so the exact same code works everywhere
- \`.env\` belongs in \`.gitignore\` — committing it would leak secrets (API keys, database passwords) into version control history, permanently
- \`NODE_ENV\` (\`"development"\` vs \`"production"\`, sometimes \`"test"\`) is the standard convention many tools and libraries check to decide how to behave`,
  longExplanation: `\`process.env\` is a plain object Node.js exposes automatically, populated from whatever environment variables the surrounding operating system (or hosting platform) handed to the process when it started. Reading configuration from it — instead of hardcoding values directly into source files — is one of the most important habits for writing code that can move between a developer's laptop, a staging server, and production without needing a single line changed.

- **Why not just hardcode the values?** A database connection string, an external API's base URL, and a feature flag typically need to be *different* locally than in production — a local Postgres instance vs. a managed cloud database, a sandbox payment API vs. the real one. Hardcoding forces editing (and remembering to un-edit) source code every time the code moves between environments, which is both tedious and genuinely dangerous — it's exactly how development secrets or test API keys end up accidentally deployed to production, or production credentials end up committed to a public repository
- **The \`.env\` file format** is intentionally simple: plain \`KEY=value\` lines, with \`#\` for comments, and no code execution of any kind — it's a static list of settings, not a script. A typical \`.env\` might read:
\`DATABASE_URL=postgres://localhost:5432/myapp_dev\`
\`API_BASE_URL=https://api-sandbox.example.com\`
\`FEATURE_NEW_CHECKOUT=false\`
- **The \`dotenv\` package** reads that file (by convention, from the project root) and copies each key into \`process.env\`, typically via one line near the very top of the app's entry file: \`require("dotenv").config()\` (or \`import "dotenv/config"\` in newer code). Order matters here — if any other module reads \`process.env.SOME_KEY\` at the moment it's first imported, and that import happens *before* \`dotenv.config()\` has run, it'll see \`undefined\` instead of the real value. A subtle but important detail: \`dotenv\` only fills in keys that **aren't already set** in the real environment — a genuine environment variable set by the hosting platform itself always takes priority over whatever \`.env\` says, which is exactly the behavior you want in production, where there usually isn't a \`.env\` file at all (more on this in the Deployment Overview topic)
- **Every value in \`process.env\` is a string — always**, even if it visually looks like a number or a boolean. \`process.env.PORT\` is the string \`"3000"\`, never the number \`3000\`; code that does \`process.env.PORT + 1\` will get the *string* \`"30001"\` (concatenation, not addition) unless it explicitly converts with \`Number(process.env.PORT)\` first. The same applies to anything meant to represent \`true\`/\`false\` — \`process.env.DEBUG === "true"\` is a real, necessary comparison, since \`process.env.DEBUG\` can never literally *be* the boolean \`true\`
- **\`.env\` must never be committed to version control.** Since it typically holds real secrets (database passwords, third-party API keys), committing it leaks those secrets into the repository's history *permanently* — even deleting the file in a later commit doesn't remove it from history, so a leaked secret should be treated as compromised and rotated, not just "un-committed." The standard practice is adding \`.env\` to \`.gitignore\`, while committing a \`.env.example\` (listing the expected keys with placeholder or blank values) so teammates know what needs to be filled in locally
- **\`NODE_ENV\`** is just an ordinary environment variable, but it's treated as a special *convention* across the Node.js ecosystem — Express, testing frameworks, and many build tools check \`process.env.NODE_ENV\` to decide things like whether to show verbose error messages and stack traces (\`"development"\`) or hide them from end users and enable performance optimizations (\`"production"\`), with \`"test"\` sometimes used to select test-specific configuration. Nothing forces this convention to be respected — it works purely because enough of the ecosystem agreed to check the same variable name

Since this sandbox can't read a real \`.env\` file from disk or a real operating system's environment variables, the examples below simulate \`process.env\` as a plain JavaScript object and simulate \`dotenv\`'s file-parsing and merge behavior with ordinary string processing — the parsing rules and merge behavior shown match what the real \`dotenv\` package does.`,
  examples: [
    {
      id: "simulated-dotenv-parsing",
      title: "Parsing a .env file into process.env (simulated)",
      summary: "dotenv turns KEY=value lines into properties on process.env -- here reimplemented as a small parser.",
      code: `const fakeEnvFileContents = [
  "# Local development settings",
  "DATABASE_URL=postgres://localhost:5432/myapp_dev",
  "API_BASE_URL=https://api-sandbox.example.com",
  "PORT=3000",
].join("\\n");

function parseDotenv(fileContents) {
  const result = {};
  fileContents.split("\\n").forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) return; // skip blank lines and comments
    const equalsIndex = trimmed.indexOf("=");
    const key = trimmed.slice(0, equalsIndex);
    const value = trimmed.slice(equalsIndex + 1);
    result[key] = value;
  });
  return result;
}

function App() {
  const [processEnv, setProcessEnv] = useState({});

  function loadDotenv() {
    setProcessEnv(parseDotenv(fakeEnvFileContents));
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <pre style={{ background: "#111827", color: "#e5e7eb", padding: 12, borderRadius: 6 }}>{fakeEnvFileContents}</pre>
      <button onClick={loadDotenv}>require("dotenv").config()</button>
      <pre style={{ background: "#000", color: "#4ade80", padding: 12, borderRadius: 6, minHeight: 80 }}>
        {Object.keys(processEnv).length === 0
          ? "// process.env is empty until dotenv loads the file"
          : "process.env now contains:\\n" + JSON.stringify(processEnv, null, 2)}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "env-values-are-strings",
      title: "process.env values are always strings",
      summary: "PORT looks like a number but isn't one -- a real, common source of bugs.",
      code: `const processEnv = { PORT: "3000", DEBUG: "true" };

function App() {
  const rawPort = processEnv.PORT;
  const numericPort = Number(processEnv.PORT);
  const isDebug = processEnv.DEBUG === "true";

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6 }}>
        {"typeof process.env.PORT -> " +
          typeof rawPort +
          "\\nprocess.env.PORT + 1 -> \\"" +
          (rawPort + 1) +
          "\\"  (string concatenation, probably not what you wanted!)\\n" +
          "Number(process.env.PORT) + 1 -> " +
          (numericPort + 1) +
          "  (correct)\\n\\n" +
          "process.env.DEBUG === true -> " +
          (processEnv.DEBUG === true) +
          "  (never true -- it's the string \\"true\\", not the boolean)\\n" +
          'process.env.DEBUG === "true" -> ' +
          isDebug +
          "  (correct way to check it)"}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "node-env-branching",
      title: "Branching behavior on NODE_ENV",
      summary: "The same code path behaves differently depending purely on one conventional environment variable.",
      code: `function describeErrorForUser(err, nodeEnv) {
  if (nodeEnv === "production") {
    return "Something went wrong. Please try again later.";
  }
  return "DEV ERROR: " + err.message + "\\n" + err.stack;
}

function App() {
  const [nodeEnv, setNodeEnv] = useState("development");
  const fakeError = new Error("Failed to connect to the database");
  fakeError.stack = "Error: Failed to connect to the database\\n    at connectToDb (db.js:12)";

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <label style={{ display: "grid", gap: 4 }}>
        NODE_ENV:
        <select value={nodeEnv} onChange={(e) => setNodeEnv(e.target.value)} style={{ padding: 6 }}>
          <option value="development">development</option>
          <option value="production">production</option>
        </select>
      </label>
      <p>What the user would actually see:</p>
      <pre style={{ background: "#111827", color: "#fca5a5", padding: 12, borderRadius: 6, whiteSpace: "pre-wrap" }}>
        {describeErrorForUser(fakeError, nodeEnv)}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "dotenv-does-not-override-real-env",
      title: "dotenv never overrides a real environment variable",
      summary: "A key already present in the real environment always wins over the .env file's value.",
      code: `function mergeDotenv(realProcessEnv, parsedDotenvFile) {
  const merged = { ...realProcessEnv };
  Object.keys(parsedDotenvFile).forEach((key) => {
    if (!(key in merged)) {
      merged[key] = parsedDotenvFile[key]; // only fills in keys that aren't already set
    }
  });
  return merged;
}

// Simulates a real environment variable the hosting platform already injected:
const realProcessEnv = { DATABASE_URL: "postgres://prod-host:5432/myapp" };

const parsedDotenvFile = {
  DATABASE_URL: "postgres://localhost:5432/myapp_dev",
  API_BASE_URL: "https://api-sandbox.example.com",
};

function App() {
  const [result, setResult] = useState(null);

  function loadDotenv() {
    setResult(mergeDotenv(realProcessEnv, parsedDotenvFile));
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <p>Real environment already has: {JSON.stringify(realProcessEnv)}</p>
      <p>.env file has: {JSON.stringify(parsedDotenvFile)}</p>
      <button onClick={loadDotenv}>require("dotenv").config()</button>
      <pre style={{ background: "#000", color: "#4ade80", padding: 12, borderRadius: 6, minHeight: 70 }}>
        {result
          ? "Final process.env:\\n" + JSON.stringify(result, null, 2) + "\\n\\nDATABASE_URL kept the real one -- dotenv didn't override it."
          : "// load dotenv to see the merge"}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
