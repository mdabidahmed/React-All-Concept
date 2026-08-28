import type { Topic } from "../../types";

export const nodeCreatingPackageTopic: Topic = {
  id: "node-creating-package",
  title: "Node.js Creating Your Own NPM Package",
  category: "NPM & Deployment",
  shortExplanation: `Publishing an npm package requires a \`package.json\` with a handful of required fields — \`name\` (must be unique across the entire public registry, or scoped like \`@yourname/pkg\`), \`version\` (following semver), and \`main\`/\`exports\` (pointing at the file that runs when someone \`require\`s or \`import\`s your package) — plus, in practice, a **\`README\`** so anyone who finds it knows what it does.

- \`npm init\` (or \`npm init -y\` to accept every default) scaffolds a starter \`package.json\` interactively
- \`npm publish\` uploads the current package to the registry under the version in \`package.json\` — each version can only ever be published **once**
- A \`.npmignore\` file (or the \`"files"\` field) controls exactly which files get uploaded, keeping tests, source maps, and config out of what users actually download`,
  longExplanation: `Every package installed with \`npm install some-package\` came from somewhere — someone ran \`npm publish\` on it. The process of becoming that "someone" is more approachable than it might sound, but it does depend on getting a handful of \`package.json\` fields right, since the public registry (and \`npm install\` itself) relies on them being accurate.

- **\`name\` must be unique across the entire registry.** Unlike a variable name or a file name, an npm package name is a single shared global namespace — if \`"left-pad"\` is already taken, no one else can ever publish a package under that exact name. This is exactly why **scoped packages** exist: \`@yourusername/some-tool\` lives in your own namespace, so it can never collide with anyone else's package, and scopes are also how organizations group a family of related packages together (\`@babel/core\`, \`@babel/preset-env\`, and so on)
- **\`version\` must follow semver**, and — importantly — **a specific version number can only ever be published once, permanently.** Once \`1.2.3\` is published, its contents are locked in forever (aside from a short unpublish window for genuine mistakes, and the ability to *deprecate* an old version with a warning message); fixing a bug always means publishing a *new* version number, never overwriting an old one. This immutability is deliberate: since other projects' installs may depend on \`1.2.3\` specifically (directly, or transitively through a lock file), the registry guarantees that a given version's actual code can never silently change out from under anyone
- **\`main\` (and the more modern \`exports\`) tell Node.js which file to load** when someone writes \`require("your-package")\` or \`import "your-package"\`. \`main\` is the older, simpler field — a single path to one entry file. \`exports\` is more expressive: it can define different entry files depending on how the package is being consumed (a \`require\`-based CommonJS project vs. an \`import\`-based ES module project can be pointed at two different built files), and it can also deliberately restrict which internal file paths are importable at all — a package can expose \`your-package\` and \`your-package/utils\` while keeping every other internal file genuinely private to outside consumers, which \`main\` alone never could do
- **A README isn't technically required by npm**, but publishing without one still triggers a warning, and in practice it's the very first thing anyone lands on when they find the package on npm's website — a package with no README is, for most people, indistinguishable from a package that doesn't work
- **\`npm init\`** interactively asks for the basics (name, version, description, entry point, test command, git repository, license) and writes out a starter \`package.json\` from the answers; \`npm init -y\` skips every prompt and accepts npm's defaults, useful for quickly scaffolding something you'll edit by hand afterward anyway
- **\`npm publish\`** packages up the current directory (respecting a \`.npmignore\` file, or an explicit \`"files"\` allowlist in \`package.json\`, so tests, source maps, and local config don't ship to users) into a compressed archive and uploads it to the registry — this requires being authenticated (\`npm login\`) with an npm account, and a *scoped* package defaults to private, needing an explicit \`--access public\` flag the first time it's published publicly on npm's free tier
- **\`npm version patch|minor|major\`** is a small but genuinely useful helper: it reads the current version, bumps whichever part you asked for (resetting the parts to its right, following semver's own rules), writes the new version back into \`package.json\`, and creates a matching git commit and tag — removing the error-prone step of hand-editing the version number and remembering the semver rules correctly every single release
- **Why the semver discipline from the previous topic matters even more here**: once other projects depend on your package via a \`^\`/\`~\` range, an accidental breaking change published under a *minor* or *patch* bump will silently break every project that auto-updates to it — this is precisely the trust the entire npm ecosystem's automatic-update ranges are built on

Since this sandbox can't actually authenticate with, or upload to, the real npm registry, the examples below simulate the *decision-making* around publishing — validating a package.json's required fields, and reproducing the kind of console output (success and common failure messages) a real \`npm publish\` would print — clearly presented as illustrative rather than a genuine network call.`,
  examples: [
    {
      id: "minimal-publishable-package",
      title: "What a publishable package.json needs",
      summary: "A checklist evaluator for the fields npm actually requires before it will let you publish.",
      code: `function checkPackageJson(pkg) {
  const problems = [];
  if (!pkg.name) problems.push('"name" is required');
  if (pkg.name && /[A-Z\\s]/.test(pkg.name)) problems.push('"name" must be lowercase, with no spaces');
  if (!pkg.version) problems.push('"version" is required');
  if (pkg.version && !/^\\d+\\.\\d+\\.\\d+$/.test(pkg.version)) problems.push('"version" must look like 1.2.3');
  if (!pkg.main && !pkg.exports) problems.push('either "main" or "exports" should point at an entry file');
  return problems;
}

const samplePackages = {
  good: { name: "@ada/tiny-utils", version: "1.0.0", main: "index.js", license: "MIT" },
  missingFields: { name: "tiny-utils" },
  badVersion: { name: "tiny-utils", version: "v1", main: "index.js" },
};

function App() {
  const [selected, setSelected] = useState("good");
  const pkg = samplePackages[selected];
  const problems = checkPackageJson(pkg);

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <select value={selected} onChange={(e) => setSelected(e.target.value)} style={{ padding: 6 }}>
        <option value="good">A valid package.json</option>
        <option value="missingFields">Missing required fields</option>
        <option value="badVersion">An invalid version string</option>
      </select>
      <pre style={{ background: "#111827", color: "#e5e7eb", padding: 12, borderRadius: 6 }}>
        {JSON.stringify(pkg, null, 2)}
      </pre>
      <div style={{ color: problems.length === 0 ? "#22c55e" : "#ef4444" }}>
        {problems.length === 0
          ? "Ready to publish."
          : "Problems found:\\n" + problems.map((p) => "- " + p).join("\\n")}
      </div>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "simulated-npm-publish",
      title: "Simulated npm publish: success and common failures",
      summary: "The same command, three different registry responses -- taken name, duplicate version, and success.",
      code: `const publishedRegistry = {
  "left-pad": ["1.0.0", "1.0.1", "1.3.0"],
};

function simulatePublish(name, version) {
  if (publishedRegistry[name] && !name.startsWith("@")) {
    return { ok: false, message: "npm ERR! 403 Forbidden - You do not have permission to publish \\"" + name + "\\"" };
  }
  const existingVersions = publishedRegistry["@you/" + name] || [];
  if (existingVersions.includes(version)) {
    return { ok: false, message: "npm ERR! 403 Forbidden - You cannot publish over the previously published version " + version };
  }
  return { ok: true, message: "+ @you/" + name + "@" + version + "\\npublished successfully" };
}

function App() {
  const [name, setName] = useState("tiny-utils");
  const [version, setVersion] = useState("1.0.0");
  const [output, setOutput] = useState("");

  function publish() {
    const result = simulatePublish(name, version);
    setOutput("$ npm publish\\n" + result.message);
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <label style={{ display: "grid", gap: 4 }}>
        Package name (try "left-pad" to see a taken-name error):
        <input value={name} onChange={(e) => setName(e.target.value)} style={{ padding: 6 }} />
      </label>
      <label style={{ display: "grid", gap: 4 }}>
        Version:
        <input value={version} onChange={(e) => setVersion(e.target.value)} style={{ padding: 6 }} />
      </label>
      <button onClick={publish}>npm publish</button>
      <pre style={{ background: "#000", color: "#4ade80", padding: 12, borderRadius: 6, minHeight: 70 }}>
        {output || "// try publishing with different names and versions"}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "main-vs-exports",
      title: "main vs. exports: resolving an entry point",
      summary: "exports can point CommonJS and ESM consumers at different files -- main always points at just one.",
      code: `const packageWithMainOnly = { main: "./dist/index.cjs.js" };

const packageWithExports = {
  exports: {
    require: "./dist/index.cjs.js",
    import: "./dist/index.esm.js",
  },
};

function resolveEntry(pkg, consumerStyle) {
  if (pkg.exports) {
    return pkg.exports[consumerStyle] || "(no entry defined for " + consumerStyle + ")";
  }
  return pkg.main; // "main" has no concept of different consumer styles
}

function App() {
  const [consumerStyle, setConsumerStyle] = useState("require");

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <label style={{ display: "grid", gap: 4 }}>
        A consumer writes:
        <select value={consumerStyle} onChange={(e) => setConsumerStyle(e.target.value)} style={{ padding: 6 }}>
          <option value="require">const pkg = require("your-package")</option>
          <option value="import">import pkg from "your-package"</option>
        </select>
      </label>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6 }}>
        {"Using \\"main\\" only:\\n  always resolves to " +
          resolveEntry(packageWithMainOnly, consumerStyle) +
          "\\n\\nUsing \\"exports\\":\\n  resolves to " +
          resolveEntry(packageWithExports, consumerStyle)}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "npm-version-bump",
      title: "Bumping a version with npm version",
      summary: "patch, minor, and major each reset the parts to their right, following semver's own rules.",
      code: `function bumpVersion(version, kind) {
  const parts = version.split(".").map(Number);
  let major = parts[0];
  let minor = parts[1];
  let patch = parts[2];
  if (kind === "major") {
    major += 1;
    minor = 0;
    patch = 0;
  } else if (kind === "minor") {
    minor += 1;
    patch = 0;
  } else {
    patch += 1;
  }
  return major + "." + minor + "." + patch;
}

function App() {
  const [version, setVersion] = useState("1.4.2");
  const [log, setLog] = useState([]);

  function bump(kind) {
    const next = bumpVersion(version, kind);
    setLog((prev) => [...prev, "npm version " + kind + "  -->  " + version + " becomes " + next]);
    setVersion(next);
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <p>Current version: {version}</p>
      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={() => bump("patch")}>npm version patch</button>
        <button onClick={() => bump("minor")}>npm version minor</button>
        <button onClick={() => bump("major")}>npm version major</button>
      </div>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 80 }}>
        {log.length === 0 ? "// bump the version a few times" : log.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
