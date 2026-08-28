import type { Topic } from "../../types";

export const nodeNpmIntroTopic: Topic = {
  id: "node-npm-intro",
  title: "NPM Introduction",
  category: "Node.js Basics",
  shortExplanation: `**npm** (Node Package Manager) is installed automatically alongside Node.js, and lets you download and manage reusable code packages published by other developers.

- \`npm install package-name\` downloads a package into a local \`node_modules\` folder
- Installed packages are recorded in \`package.json\` using **semantic versioning**: \`major.minor.patch\`
- \`^\` and \`~\` in a version range control ==how much a package is allowed to auto-update== when reinstalled`,
  longExplanation: `Writing every piece of functionality a project needs completely from scratch would be enormously wasteful — countless other developers have already solved problems like "parse this date format" or "make an HTTP request with retries" and published their solution for anyone to reuse. **npm** is the tool that makes reusing that code practical: it's a package manager (installed automatically the moment you install Node.js itself) paired with a public registry hosting well over a million packages.

- **Installing a package**: \`npm install express\` (or the shorthand \`npm i express\`) downloads the \`express\` package — along with anything *it* depends on — into a folder named \`node_modules\` inside your project, and adds \`"express": "^4.18.2"\` (or similar) to the \`dependencies\` section of your project's \`package.json\`. From that point on, any file in the project can \`require("express")\` (or \`import express from "express"\`) and use it directly.
- **The \`node_modules\` folder** is where every installed package's actual code physically lives — it can grow to be enormous (thousands of files, because most packages depend on other packages, which depend on still more packages) and is essentially never edited by hand or committed to version control. Instead, only \`package.json\` (which records *which* packages and versions are needed) is committed — anyone else working on the project runs \`npm install\` with no arguments to regenerate an identical \`node_modules\` folder from that list.
- **\`package-lock.json\`** is generated automatically alongside \`node_modules\` and records the *exact* version of every package (and every package those packages depend on, all the way down) that was actually installed. This solves a real problem: two developers running \`npm install\` on the same \`package.json\` weeks apart could otherwise end up with subtly different package versions if newer ones were published in between. Committing \`package-lock.json\` guarantees everyone gets identical versions.
- **Semantic versioning ("semver")** is the \`major.minor.patch\` numbering convention almost all npm packages follow (e.g. \`4.18.2\`) — and the three numbers aren't arbitrary:
  - **major** (the first number) increases when a change could break existing code that depends on the package
  - **minor** (the second number) increases when new functionality is added in a way that doesn't break anything existing
  - **patch** (the third number) increases for bug fixes that don't add or change any functionality
- **\`^\` and \`~\` in package.json control how much a package is allowed to change** when \`npm install\` is run again later, if a newer version has been published:
  - \`^4.18.2\` (the default npm uses) allows any new **minor** or **patch** release, but never a new **major** version — so it could update to \`4.19.0\` or \`4.18.5\`, but never to \`5.0.0\`. This is the most common choice, on the assumption that a package's own maintainers are following semver correctly and minor/patch releases genuinely won't break anything.
  - \`~4.18.2\` is more conservative — it only allows new **patch** releases (\`4.18.3\`, \`4.18.9\`), never a new minor or major version.
  - An exact version with no prefix at all (\`4.18.2\`) allows no automatic updates whatsoever — reinstalling always fetches that precise version.
- **Other common commands**: \`npm install\` (no package name) installs everything already listed in \`package.json\`; \`npm install --save-dev\` (or \`-D\`) installs a package as a *development-only* dependency (like a testing tool, not needed once the app is actually running); \`npm uninstall package-name\` removes a package and its entry from \`package.json\`; \`npm update\` upgrades installed packages within the ranges allowed by \`^\`/\`~\`.

Since this sandbox has no real terminal and no connection to the actual npm registry, none of these commands can genuinely execute here. The examples below simulate what running each command would print in a real terminal, and the semver-range-matching logic is demonstrated with real, working JavaScript (parsing and comparing version numbers is plain logic — no simulation is needed for that part, only for the actual network install itself).`,
  examples: [
    {
      id: "simulated-npm-install",
      title: "npm install express (simulated output)",
      summary: "What a real npm install typically prints to the terminal.",
      code: `function App() {
  const [output, setOutput] = useState("");

  function run() {
    setOutput([
      "$ npm install express",
      "",
      "added 57 packages, and audited 58 packages in 2s",
      "",
      "8 packages are looking for funding",
      "  run 'npm fund' for details",
      "",
      "found 0 vulnerabilities",
    ].join("\\n"));
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={run}>Run: npm install express</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 130 }}>
        {output || "// terminal output appears here"}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "node-modules-tree",
      title: "What lands in node_modules",
      summary: "A representative (simplified) view of the folder npm install creates.",
      code: `function App() {
  const tree = [
    "node_modules/",
    "  express/",
    "    lib/",
    "    package.json",
    "  body-parser/       (a dependency of express)",
    "  cookie/            (a dependency of body-parser)",
    "  ... (dozens more nested dependencies)",
    "package.json          <- committed to version control",
    "package-lock.json     <- committed to version control",
  ].join("\\n");

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6 }}>{tree}</pre>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        node_modules itself is never committed — it's regenerated from package.json on any machine via npm install.
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "semver-range-matcher",
      title: "Does a version satisfy ^ or ~? (real logic)",
      summary: "Genuine, working semver comparison logic — parsing version numbers is plain JavaScript, nothing to simulate here.",
      code: `function parseVersion(v) {
  const parts = v.split(".").map(Number);
  return { major: parts[0], minor: parts[1], patch: parts[2] };
}

function satisfiesCaret(range, candidate) {
  // ^4.18.2 allows any 4.x.x >= 4.18.2
  const base = parseVersion(range);
  const c = parseVersion(candidate);
  if (c.major !== base.major) return false;
  if (c.minor > base.minor) return true;
  if (c.minor === base.minor) return c.patch >= base.patch;
  return false;
}

function satisfiesTilde(range, candidate) {
  // ~4.18.2 allows only 4.18.x >= 4.18.2
  const base = parseVersion(range);
  const c = parseVersion(candidate);
  return c.major === base.major && c.minor === base.minor && c.patch >= base.patch;
}

function App() {
  const range = "4.18.2";
  const candidates = ["4.18.2", "4.18.9", "4.19.0", "5.0.0"];

  return (
    <table style={{ borderCollapse: "collapse", width: "100%", fontSize: 14 }}>
      <thead>
        <tr>
          <th style={{ textAlign: "left", borderBottom: "2px solid #374151", padding: 8 }}>Candidate version</th>
          <th style={{ textAlign: "left", borderBottom: "2px solid #374151", padding: 8 }}>^{range} allows it?</th>
          <th style={{ textAlign: "left", borderBottom: "2px solid #374151", padding: 8 }}>~{range} allows it?</th>
        </tr>
      </thead>
      <tbody>
        {candidates.map((c) => (
          <tr key={c}>
            <td style={{ padding: 8, borderBottom: "1px solid #374151", fontFamily: "monospace" }}>{c}</td>
            <td style={{ padding: 8, borderBottom: "1px solid #374151" }}>{String(satisfiesCaret(range, c))}</td>
            <td style={{ padding: 8, borderBottom: "1px solid #374151" }}>{String(satisfiesTilde(range, c))}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

render(<App />);`,
    },
    {
      id: "common-npm-commands",
      title: "A quick reference of common npm commands",
      summary: "The handful of commands used in almost every Node.js project.",
      code: `function App() {
  const commands = [
    { cmd: "npm install", desc: "Installs everything listed in package.json" },
    { cmd: "npm install express", desc: "Adds and installs a specific package" },
    { cmd: "npm install -D vitest", desc: "Installs as a development-only dependency" },
    { cmd: "npm uninstall express", desc: "Removes a package" },
    { cmd: "npm update", desc: "Upgrades packages within their allowed ^ / ~ ranges" },
    { cmd: "npm run dev", desc: "Runs the 'dev' entry from package.json's scripts" },
  ];

  return (
    <div style={{ display: "grid", gap: 6 }}>
      {commands.map((c) => (
        <div key={c.cmd} style={{ display: "flex", gap: 10 }}>
          <code style={{ background: "#111827", color: "#d1fae5", padding: "2px 6px", borderRadius: 4, whiteSpace: "nowrap" }}>
            {c.cmd}
          </code>
          <span style={{ color: "#6b7280" }}>{c.desc}</span>
        </div>
      ))}
    </div>
  );
}

render(<App />);`,
    },
  ],
};
