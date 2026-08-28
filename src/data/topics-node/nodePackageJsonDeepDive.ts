import type { Topic } from "../../types";

export const nodePackageJsonDeepDiveTopic: Topic = {
  id: "node-package-json-deep-dive",
  title: "Node.js package.json Deep Dive",
  category: "NPM & Deployment",
  shortExplanation: `**\`dependencies\`** are packages needed when the app actually runs; **\`devDependencies\`** are only needed while developing (a test runner, a bundler, type definitions) and aren't required when the package is installed as *someone else's* dependency.

- \`^1.2.3\` allows minor and patch updates (\`1.x.x\`, staying below \`2.0.0\`)
- \`~1.2.3\` allows only patch updates (\`1.2.x\`)
- An exact version like \`1.2.3\` (no prefix) pins that version, and only that version
- \`package-lock.json\` records the exact resolved version of *every* package in the whole dependency tree, so \`npm install\` reproduces an identical set of versions on any machine`,
  longExplanation: `\`package.json\` is more than just a name and a list of packages — its \`dependencies\`/\`devDependencies\` split and its version-range syntax exist to answer two separate, important questions: "what does this package actually need to *run*?" and "exactly which versions of those packages am I willing to accept?"

- **\`dependencies\` vs. \`devDependencies\`.** \`dependencies\` lists packages the code needs while actually *running* — a web framework, a database driver, a utility library imported by the shipped code. \`devDependencies\` lists packages only needed *while building or testing* the project — a test runner, a bundler, TypeScript's own compiler, type definition packages (\`@types/...\`). A plain \`npm install\` installs both, but when a package is installed as *someone else's* dependency (i.e., it shows up inside another project's \`node_modules\`), only its \`dependencies\` get pulled in transitively — its \`devDependencies\` are irrelevant to a consumer and are never installed for them. The distinction also matters for image/deployment size: a production Docker build often runs \`npm install --omit=dev\` specifically to skip everything only needed during development
- **Semantic versioning (semver)**, the \`MAJOR.MINOR.PATCH\` convention nearly the entire npm ecosystem follows: a **major** bump signals a breaking change, a **minor** bump signals a backward-compatible new feature, and a **patch** bump signals a backward-compatible bug fix. This is a *convention*, not something npm enforces — a package author can technically break things in a "patch" release — but it's followed closely enough that version ranges are built entirely around trusting it
- **\`^1.2.3\` (caret)**, the default range npm writes when you run \`npm install some-package\`, allows any version that doesn't change the leftmost non-zero digit — so \`^1.2.3\` matches anything from \`1.2.3\` up to (but not including) \`2.0.0\`. There's a well-known nuance for versions below \`1.0.0\`: since a \`0.x.y\` version is conventionally considered potentially unstable, \`^0.2.3\` only allows patch-level changes (\`0.2.x\`) — the caret effectively treats the *minor* version number as if it were the major, for anything still in the \`0.x\` range
- **\`~1.2.3\` (tilde)** is stricter: it only allows patch-level updates, matching \`1.2.x\` but never \`1.3.0\` — useful when you want bug fixes automatically but don't trust a package's minor releases to stay backward-compatible in practice
- **An exact version, with no prefix at all** (just \`1.2.3\`), pins that dependency completely — \`npm install\` will never pick a different version for it, no matter what gets published later. This trades all flexibility for maximum predictability, and is occasionally used for a dependency that has been unreliable about following semver correctly
- **\`package-lock.json\` solves a real, subtle problem**: \`package.json\` only records *ranges* (\`^1.2.3\`), not exact versions — which means, without a lock file, running \`npm install\` on two different days (or two different machines) could resolve \`^1.2.3\` to two different *actual* versions, simply because the package's author published a new \`1.3.0\` in between. This is a classic source of "it works on my machine" bugs, since your teammate's or your CI server's \`node_modules\` could quietly differ from yours despite an identical \`package.json\`. \`package-lock.json\` fixes this by recording the *exact* resolved version of every single package in the *entire* dependency tree (including dependencies of dependencies), the moment it was first installed — a plain \`npm install\` afterward reuses those exact locked versions instead of re-resolving ranges from scratch
- **\`npm ci\` vs. \`npm install\`**: \`npm ci\` ("clean install") is the command most CI pipelines use specifically because it installs *exactly* what \`package-lock.json\` says, deletes \`node_modules\` first for a truly clean slate, and — critically — **fails outright** if \`package.json\` and \`package-lock.json\` have drifted out of sync with each other, rather than silently trying to reconcile them the way plain \`npm install\` would
- Because of all this, \`package-lock.json\` should always be **committed to version control**, right alongside \`package.json\` — it's not a throwaway artifact, it's the thing that makes "reproducible installs" actually true

The examples below simulate npm's version-resolution and installation behavior with plain JavaScript objects and functions standing in for a real npm registry and a real \`node_modules\` folder, since this sandbox has neither.`,
  examples: [
    {
      id: "dependencies-vs-devdependencies",
      title: "dependencies vs. devDependencies",
      summary: "Switching to a production install skips devDependencies entirely.",
      code: `const packageJson = {
  dependencies: { express: "^4.19.0", pg: "^8.11.0" },
  devDependencies: { vitest: "^1.4.0", eslint: "^9.0.0", typescript: "^5.4.0" },
};

function App() {
  const [productionInstall, setProductionInstall] = useState(false);

  const installed = productionInstall
    ? Object.keys(packageJson.dependencies)
    : [...Object.keys(packageJson.dependencies), ...Object.keys(packageJson.devDependencies)];

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <pre style={{ background: "#111827", color: "#e5e7eb", padding: 12, borderRadius: 6 }}>
        {JSON.stringify(packageJson, null, 2)}
      </pre>
      <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <input
          type="checkbox"
          checked={productionInstall}
          onChange={(e) => setProductionInstall(e.target.checked)}
        />
        npm install --omit=dev (production install)
      </label>
      <p>
        Command: {productionInstall ? "npm install --omit=dev" : "npm install"}
      </p>
      <pre style={{ background: "#000", color: "#4ade80", padding: 12, borderRadius: 6 }}>
        {"Installed packages:\\n" + installed.map((name) => "  " + name).join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "semver-ranges-interactive",
      title: "Semver ranges: ^, ~, and exact",
      summary: "Test which published versions a range would actually accept.",
      code: `function parseVersion(v) {
  const parts = v.split(".").map(Number);
  return { major: parts[0], minor: parts[1], patch: parts[2] };
}

function satisfiesRange(range, version) {
  const v = parseVersion(version);
  if (range.startsWith("^")) {
    const r = parseVersion(range.slice(1));
    if (r.major > 0) {
      return v.major === r.major && (v.minor > r.minor || (v.minor === r.minor && v.patch >= r.patch));
    }
    // Below 1.0.0, caret only allows patch-level changes.
    return v.major === 0 && v.minor === r.minor && v.patch >= r.patch;
  }
  if (range.startsWith("~")) {
    const r = parseVersion(range.slice(1));
    return v.major === r.major && v.minor === r.minor && v.patch >= r.patch;
  }
  return range === version; // exact pin
}

const candidateVersions = ["1.1.9", "1.2.3", "1.2.9", "1.3.0", "2.0.0"];

function App() {
  const [range, setRange] = useState("^1.2.3");

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <label style={{ display: "grid", gap: 4 }}>
        Version range in package.json:
        <input value={range} onChange={(e) => setRange(e.target.value)} style={{ padding: 6 }} />
      </label>
      <table style={{ borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ textAlign: "left", padding: 6, borderBottom: "1px solid #374151" }}>Published version</th>
            <th style={{ textAlign: "left", padding: 6, borderBottom: "1px solid #374151" }}>Accepted?</th>
          </tr>
        </thead>
        <tbody>
          {candidateVersions.map((v) => (
            <tr key={v}>
              <td style={{ padding: 6 }}>{v}</td>
              <td style={{ padding: 6, color: satisfiesRange(range, v) ? "#22c55e" : "#ef4444" }}>
                {satisfiesRange(range, v) ? "yes" : "no"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        Try "~1.2.3" or an exact "1.2.3" and compare which rows flip.
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "why-lockfile-matters",
      title: "Why package-lock.json matters",
      summary: "The same range can resolve to a different real version later, unless a lock file pins it down.",
      code: `// Versions of "some-lib" that a fake registry has published, matching package.json's "^1.2.3":
const registryVersionsOverTime = {
  day1: ["1.2.3", "1.2.4"],
  day30: ["1.2.3", "1.2.4", "1.2.5", "1.3.0"],
};

const lockedVersion = "1.2.3"; // recorded the very first time npm install ran, and committed to git

function App() {
  const [day, setDay] = useState("day1");
  const availableVersions = registryVersionsOverTime[day];
  const highestAvailable = availableVersions[availableVersions.length - 1];

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <p>package.json says: "some-lib": "^1.2.3"</p>
      <label style={{ display: "grid", gap: 4 }}>
        Simulate time passing:
        <select value={day} onChange={(e) => setDay(e.target.value)} style={{ padding: 6 }}>
          <option value="day1">Day 1 -- first install</option>
          <option value="day30">Day 30 -- a teammate installs later</option>
        </select>
      </label>
      <p>Registry currently has: {availableVersions.join(", ")}</p>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6 }}>
        {"Without package-lock.json committed:\\n  npm install -> resolves ^1.2.3 to " +
          highestAvailable +
          " (whatever is newest today)\\n\\n" +
          "With package-lock.json committed:\\n  npm ci -> installs exactly " +
          lockedVersion +
          " (locked, no matter what's newly published)"}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "npm-install-vs-ci",
      title: "npm install vs. npm ci",
      summary: "npm ci demands an exact match between package.json and package-lock.json -- and fails loudly if they've drifted.",
      code: `function App() {
  const [lockfileInSync, setLockfileInSync] = useState(true);
  const [output, setOutput] = useState("");

  function runNpmInstall() {
    setOutput(
      "$ npm install\\n" +
        (lockfileInSync
          ? "up to date, audited 214 packages\\n(package-lock.json left mostly as-is)"
          : "package.json changed since the lock file was last written --\\nnpm install updates package-lock.json to match, and continues.")
    );
  }

  function runNpmCi() {
    setOutput(
      "$ npm ci\\n" +
        (lockfileInSync
          ? "removed node_modules, installed 214 packages exactly as locked\\n(fast, fully reproducible)"
          : "npm ERR! \`npm ci\` can only install packages when your package.json and\\nnpm ERR! package-lock.json are in sync. Please update your lock file.")
    );
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <input
          type="checkbox"
          checked={lockfileInSync}
          onChange={(e) => setLockfileInSync(e.target.checked)}
        />
        package-lock.json is in sync with package.json
      </label>
      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={runNpmInstall}>npm install</button>
        <button onClick={runNpmCi}>npm ci</button>
      </div>
      <pre style={{ background: "#000", color: "#4ade80", padding: 12, borderRadius: 6, minHeight: 90 }}>
        {output || "// try both commands, with the checkbox on and off"}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
