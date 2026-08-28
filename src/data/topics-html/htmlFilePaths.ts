import type { Topic } from "../../types";

export const htmlFilePathsTopic: Topic = {
  id: "html-file-paths",
  title: "HTML File Paths",
  category: "HTML Scripting & Layout",
  shortExplanation: `A **file path** tells the browser where to find a resource — an image, a stylesheet, another page — relative to something.

- An **absolute path** is a full address: \`https://example.com/images/pic.jpg\` or a root-relative \`/images/pic.jpg\`
- A **relative path** points from the *current* file's location: \`images/pic.jpg\` (a subfolder) or \`../pic.jpg\` (up one folder)
- Relative paths are shorter and portable across domains, but they *break* if a file moves without its paths being updated
- This sandbox has no real file system, so the examples below build a small pretend one to resolve paths against`,
  longExplanation: `Every \`src\` and \`href\` in an HTML document is a path, and paths come in two flavors that resolve completely differently.

- An **absolute path** is a complete, unambiguous address: either a full URL (\`https://example.com/images/pic.jpg\`) or a *root-relative* path starting with \`/\` (\`/images/pic.jpg\`, meaning "from the site's root folder, regardless of which page linked it"). It always resolves to the same place, no matter which file references it
- A **relative path** is resolved *against the location of the current file*. From a file at \`/blog/post.html\`, the relative path \`images/pic.jpg\` means "look in an \`images\` folder next to this file" (i.e. \`/blog/images/pic.jpg\`), while \`../images/pic.jpg\` means "go up one folder first" (i.e. \`/images/pic.jpg\`)
- Relative paths are generally preferred *within* a single project — they're shorter, and an entire site keeps working if it's moved to a different domain, since nothing hardcodes the domain name
- The tradeoff: a relative path is only correct as long as the *relationship* between the two files stays the same. Moving \`post.html\` into a different folder without updating its relative paths silently breaks every image and link inside it, because the browser resolves the same text (\`images/pic.jpg\`) against a new starting point and lands somewhere else — or nowhere at all

There's no real file system in this sandbox, so the examples below build a small pretend one by hand — a plain object mapping folder paths to the files inside them — and resolve a chosen relative path against a chosen "current file" location using the same \`..\`-popping logic a real browser applies, so the mental model transfers directly to an actual project.`,
  examples: [
    {
      id: "absolute-vs-relative-overview",
      title: "Absolute vs. relative, at a glance",
      summary: "The four common forms of a path, shown side by side with what each one means.",
      code: `function App() {
  const rows = [
    { kind: "Absolute (full URL)", path: "https://example.com/images/pic.jpg", meaning: "Always this exact file, on this exact domain" },
    { kind: "Absolute (root-relative)", path: "/images/pic.jpg", meaning: "From the site's root, no matter which page links it" },
    { kind: "Relative (same folder)", path: "pic.jpg", meaning: "A file sitting right next to the current file" },
    { kind: "Relative (subfolder)", path: "images/pic.jpg", meaning: "Look inside a folder next to the current file" },
    { kind: "Relative (up one level)", path: "../pic.jpg", meaning: "Go up one folder from the current file, then look" },
  ];

  return (
    <table style={{ borderCollapse: "collapse", width: "100%", fontSize: 13 }}>
      <thead>
        <tr>
          <th style={{ textAlign: "left", borderBottom: "1px solid #d1d5db", padding: 6 }}>Kind</th>
          <th style={{ textAlign: "left", borderBottom: "1px solid #d1d5db", padding: 6 }}>Path</th>
          <th style={{ textAlign: "left", borderBottom: "1px solid #d1d5db", padding: 6 }}>Meaning</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r) => (
          <tr key={r.path}>
            <td style={{ padding: 6, borderBottom: "1px solid #f3f4f6" }}>{r.kind}</td>
            <td style={{ padding: 6, borderBottom: "1px solid #f3f4f6", fontFamily: "monospace" }}>{r.path}</td>
            <td style={{ padding: 6, borderBottom: "1px solid #f3f4f6", color: "#6b7280" }}>{r.meaning}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

render(<App />);`,
    },
    {
      id: "resolve-against-pretend-filesystem",
      title: "Resolving a relative path by hand",
      summary: "A tiny pretend file system, plus the same '..'-popping logic a browser uses to resolve a relative path.",
      code: `const pretendSite = {
  "/index.html": true,
  "/about.html": true,
  "/images/logo.png": true,
  "/images/icons/arrow.svg": true,
  "/blog/post.html": true,
  "/blog/images/pic.jpg": true,
};

function resolvePath(currentFile, relativePath) {
  const currentDir = currentFile.slice(0, currentFile.lastIndexOf("/"));
  const parts = currentDir.split("/").filter(Boolean);
  for (const segment of relativePath.split("/")) {
    if (segment === "..") parts.pop();
    else if (segment === ".") continue;
    else parts.push(segment);
  }
  return "/" + parts.join("/");
}

function App() {
  const [currentFile, setCurrentFile] = useState("/blog/post.html");
  const [relativePath, setRelativePath] = useState("images/pic.jpg");

  const resolved = resolvePath(currentFile, relativePath);
  const exists = Boolean(pretendSite[resolved]);

  return (
    <div style={{ display: "grid", gap: 10, maxWidth: 420 }}>
      <label>
        Current file:{" "}
        <select value={currentFile} onChange={(e) => setCurrentFile(e.target.value)}>
          <option value="/index.html">/index.html</option>
          <option value="/blog/post.html">/blog/post.html</option>
        </select>
      </label>
      <label>
        Relative path written in that file:{" "}
        <input value={relativePath} onChange={(e) => setRelativePath(e.target.value)} style={{ width: 160 }} />
      </label>
      <p>
        Resolves to: <code>{resolved}</code>
      </p>
      <p style={{ color: exists ? "#15803d" : "#b91c1c" }}>
        {exists ? "Found — this file exists in the pretend site." : "Not found — no file lives at that resolved path."}
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "moving-a-file-breaks-the-path",
      title: "What breaks when a file moves",
      summary: "The exact same relative path resolves somewhere else once the referencing file changes location.",
      code: `function resolvePath(currentFile, relativePath) {
  const currentDir = currentFile.slice(0, currentFile.lastIndexOf("/"));
  const parts = currentDir.split("/").filter(Boolean);
  for (const segment of relativePath.split("/")) {
    if (segment === "..") parts.pop();
    else if (segment === ".") continue;
    else parts.push(segment);
  }
  return "/" + parts.join("/");
}

function App() {
  const relativePath = "images/logo.png";
  const before = resolvePath("/about.html", relativePath);
  const after = resolvePath("/company/about.html", relativePath);

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <p>
        The file always contains the same line: <code>{'<img src="' + relativePath + '">'}</code>
      </p>
      <p>
        Before moving <code>about.html</code>, it resolves to: <code>{before}</code>
      </p>
      <p>
        After moving it into a <code>/company</code> folder, the identical line now resolves to: <code>{after}</code>
      </p>
      <p style={{ color: "#b91c1c" }}>
        Nobody edited the image tag — moving the file was enough to break it, because the path was relative all along.
      </p>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
