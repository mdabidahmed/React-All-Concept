import type { Topic } from "../../types";

export const nodePathModuleTopic: Topic = {
  id: "node-path-module",
  title: "Node.js The Path Module",
  category: "File System",
  shortExplanation: `The built-in \`path\` module provides small, dependable utilities for working with file path *strings* — joining pieces together, turning a relative path into an absolute one, and pulling out a directory, filename, or extension.

- \`path.join(...segments)\` — glues segments together with the right separator and normalizes \`..\`/\`.\`
- \`path.resolve(...segments)\` — builds an *absolute* path, using the current working directory when needed
- \`path.dirname()\`, \`path.basename()\`, \`path.extname()\` — pull the directory, filename, or extension out of a path string
- Unlike \`fs\`, \`path\` does no disk I/O at all — it's pure string manipulation, so it works identically in this sandbox`,
  longExplanation: `Almost every Node.js program that touches the file system also needs to manipulate file *path strings* — combining a base folder with a filename, figuring out a file's extension, or turning a relative reference into something absolute. It's tempting to do this with plain string concatenation (\`folder + "/" + filename\`), but that quickly runs into real problems: what if \`folder\` already ends with a slash? What if a path uses \`..\` to go up a level? What about Windows, where the traditional separator is a backslash instead of a forward slash? The built-in \`path\` module exists specifically to handle these cases correctly and consistently, without ever touching the actual disk.

- **\`path.join(...segments)\`** concatenates any number of path segments using the correct separator for the current operating system, then *normalizes* the result — collapsing repeated slashes, resolving \`.\` (current directory, a no-op) and \`..\` (parent directory, which cancels out the previous segment) into a clean final path. Critically, \`join\` does **not** make anything absolute — \`path.join("a", "b")\` returns \`"a/b"\`, a relative path, even though joining feels like it "builds" something
- **\`path.resolve(...segments)\`** is join's more assertive cousin: it always returns an **absolute** path. It processes its arguments from right to left, stopping as soon as it constructs something absolute — if none of the segments given is itself absolute, Node prepends the current working directory (\`process.cwd()\`) to make the final result absolute. This is why \`path.resolve("src", "app.js")\` and \`path.join(process.cwd(), "src", "app.js")\` tend to produce the same answer, even though the two functions work quite differently under the hood
- **\`path.dirname(path)\`** returns everything before the last separator — effectively "the folder this path lives in." **\`path.basename(path)\`** is the mirror image: everything *after* the last separator, i.e. the final file or folder name. \`basename\` also accepts an optional second argument — an extension to strip if present, so \`path.basename("app.test.js", ".js")\` returns \`"app.test"\`
- **\`path.extname(path)\`** returns the extension of the final path segment, *including* the leading dot (\`".js"\`, not \`"js"\`) — or an empty string if there isn't one. Two gotchas worth knowing: a file with multiple dots like \`"archive.tar.gz"\` has an extname of only \`".gz"\` (the *last* dot counts, not the first), and a dotfile like \`".gitignore"\` has **no** extension at all by Node's convention — a leading dot is treated as part of the name, not as introducing an extension
- Because path separators genuinely differ between operating systems, the \`path\` module actually exposes three related objects: plain \`path\` (behaves like the current OS), \`path.posix\` (always forward-slash behavior, for parsing paths meant for POSIX systems regardless of what OS the code happens to run on — e.g., URLs or paths from a cloud storage bucket), and \`path.win32\` (always backslash behavior). Reaching for \`path.posix\` explicitly is a common way to keep path-string manipulation deterministic regardless of which machine runs the code
- Every function in \`path\` is pure string manipulation with **zero disk access** — calling \`path.join("does/not/exist", "nope.txt")\` never checks whether that path is real, and never throws for that reason. This makes \`path\` categorically different from \`fs\`: it can be used freely to *construct* or *analyze* a path before ever deciding whether to read, write, or check it with \`fs\`

Because \`path\`'s functions are pure logic with no dependency on an operating system or a real disk, this is one of the few topics in this subject that needs **no simulation at all** — every example below is a genuinely working (if intentionally simplified, POSIX-style-only) reimplementation of \`join\`, \`resolve\`, \`dirname\`, \`basename\`, and \`extname\`, producing the same output a real Node.js program would for these everyday inputs. The one exception is \`resolve\`'s use of "the current working directory" — since there's no real process here, a fixed constant stands in for \`process.cwd()\`, clearly labeled as such.`,
  examples: [
    {
      id: "path-join",
      title: "path.join(): combining segments safely",
      summary: "Segments are glued together and .. / . are normalized away — a genuinely working implementation.",
      code: `function normalizePath(pathStr) {
  const isAbsolute = pathStr.startsWith("/");
  const parts = pathStr.split("/").filter((part) => part !== "" && part !== ".");
  const stack = [];
  for (const part of parts) {
    if (part === "..") {
      if (stack.length > 0 && stack[stack.length - 1] !== "..") {
        stack.pop();
      } else if (!isAbsolute) {
        stack.push("..");
      }
    } else {
      stack.push(part);
    }
  }
  let result = stack.join("/");
  if (isAbsolute) result = "/" + result;
  if (result === "") result = isAbsolute ? "/" : ".";
  return result;
}

function joinPath(...segments) {
  if (segments.length === 0) return ".";
  return normalizePath(segments.join("/"));
}

function App() {
  const examples = [
    ["users", "ada", "notes.txt"],
    ["/home/user", "project", "..", "app.js"],
    ["src", "./components", "Button.jsx"],
    ["a", "b", "../../c"],
  ];

  return (
    <div style={{ display: "grid", gap: 10 }}>
      {examples.map((segments, i) => (
        <div key={i} style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6 }}>
          <div>{"path.join(" + segments.map((s) => '"' + s + '"').join(", ") + ")"}</div>
          <div style={{ color: "#facc15" }}>{"-> " + joinPath(...segments)}</div>
        </div>
      ))}
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "path-resolve",
      title: "path.resolve(): building an absolute path",
      summary: "Resolves right to left, prepending a stand-in for the current working directory when needed.",
      code: `const CWD = "/home/user/project";

function normalizePath(pathStr) {
  const isAbsolute = pathStr.startsWith("/");
  const parts = pathStr.split("/").filter((part) => part !== "" && part !== ".");
  const stack = [];
  for (const part of parts) {
    if (part === "..") {
      if (stack.length > 0 && stack[stack.length - 1] !== "..") {
        stack.pop();
      } else if (!isAbsolute) {
        stack.push("..");
      }
    } else {
      stack.push(part);
    }
  }
  let result = stack.join("/");
  if (isAbsolute) result = "/" + result;
  if (result === "") result = isAbsolute ? "/" : ".";
  return result;
}

function resolvePath(...segments) {
  let resolved = "";
  let resolvedAbsolute = false;
  for (let i = segments.length - 1; i >= 0 && !resolvedAbsolute; i--) {
    const segment = segments[i];
    if (!segment) continue;
    resolved = segment + "/" + resolved;
    resolvedAbsolute = segment.startsWith("/");
  }
  if (!resolvedAbsolute) {
    resolved = CWD + "/" + resolved;
  }
  return normalizePath(resolved);
}

function App() {
  const examples = [
    ["src", "app.js"],
    ["./src", "./app.js"],
    ["/etc", "config"],
    ["src", "../dist", "bundle.js"],
  ];

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        Simulated current working directory (CWD): {CWD}
      </p>
      {examples.map((segments, i) => (
        <div key={i} style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6 }}>
          <div>{"path.resolve(" + segments.map((s) => '"' + s + '"').join(", ") + ")"}</div>
          <div style={{ color: "#facc15" }}>{"-> " + resolvePath(...segments)}</div>
        </div>
      ))}
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "path-dirname-basename",
      title: "path.dirname() and path.basename(): pulling a path apart",
      summary: "dirname returns the containing folder, basename returns the final segment.",
      code: `function dirnamePath(pathStr) {
  const isAbsolute = pathStr.startsWith("/");
  const trimmed = pathStr.length > 1 && pathStr.endsWith("/") ? pathStr.slice(0, -1) : pathStr;
  const lastSlash = trimmed.lastIndexOf("/");
  if (lastSlash === -1) return ".";
  if (lastSlash === 0) return isAbsolute ? "/" : ".";
  return trimmed.slice(0, lastSlash);
}

function basenamePath(pathStr, ext) {
  const trimmed = pathStr.length > 1 && pathStr.endsWith("/") ? pathStr.slice(0, -1) : pathStr;
  const lastSlash = trimmed.lastIndexOf("/");
  let base = lastSlash === -1 ? trimmed : trimmed.slice(lastSlash + 1);
  if (ext && base.endsWith(ext) && base !== ext) {
    base = base.slice(0, base.length - ext.length);
  }
  return base;
}

function App() {
  const paths = ["/home/user/project/src/app.js", "/home/user/project/src/", "readme.md"];

  return (
    <div style={{ display: "grid", gap: 10 }}>
      {paths.map((p, i) => (
        <div key={i} style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6 }}>
          <div>path: {p}</div>
          <div style={{ color: "#facc15" }}>{"dirname -> " + dirnamePath(p)}</div>
          <div style={{ color: "#93c5fd" }}>{"basename -> " + basenamePath(p)}</div>
          <div style={{ color: "#93c5fd" }}>{"basename(path, '.js') -> " + basenamePath(p, ".js")}</div>
        </div>
      ))}
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "path-extname",
      title: "path.extname(): getting a file's extension",
      summary: "Type your own path and watch the extension update live — including the tricky cases.",
      code: `function basenamePath(pathStr) {
  const trimmed = pathStr.length > 1 && pathStr.endsWith("/") ? pathStr.slice(0, -1) : pathStr;
  const lastSlash = trimmed.lastIndexOf("/");
  return lastSlash === -1 ? trimmed : trimmed.slice(lastSlash + 1);
}

function extnamePath(pathStr) {
  const base = basenamePath(pathStr);
  const lastDot = base.lastIndexOf(".");
  if (lastDot <= 0) return "";
  return base.slice(lastDot);
}

function App() {
  const [value, setValue] = useState("archive.tar.gz");

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #374151" }}
      />
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6 }}>
        {"path.extname(" + value + ") -> " + (extnamePath(value) || "(no extension)")}
      </pre>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        Try .gitignore (no extension, by Node's convention) or a.b.c (only the final part counts as the extension).
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "path-parts-together",
      title: "Putting it together: breaking a path into parts",
      summary: "dirname, basename, name (without extension), and extname, all computed from one path.",
      code: `function dirnamePath(pathStr) {
  const isAbsolute = pathStr.startsWith("/");
  const trimmed = pathStr.length > 1 && pathStr.endsWith("/") ? pathStr.slice(0, -1) : pathStr;
  const lastSlash = trimmed.lastIndexOf("/");
  if (lastSlash === -1) return ".";
  if (lastSlash === 0) return isAbsolute ? "/" : ".";
  return trimmed.slice(0, lastSlash);
}

function basenamePath(pathStr) {
  const trimmed = pathStr.length > 1 && pathStr.endsWith("/") ? pathStr.slice(0, -1) : pathStr;
  const lastSlash = trimmed.lastIndexOf("/");
  return lastSlash === -1 ? trimmed : trimmed.slice(lastSlash + 1);
}

function extnamePath(pathStr) {
  const base = basenamePath(pathStr);
  const lastDot = base.lastIndexOf(".");
  if (lastDot <= 0) return "";
  return base.slice(lastDot);
}

const samplePaths = [
  "/home/user/project/src/components/Button.jsx",
  "/home/user/project/README.md",
  "notes.txt",
];

function App() {
  const [index, setIndex] = useState(0);
  const path = samplePaths[index];
  const ext = extnamePath(path);
  const base = basenamePath(path);
  const name = ext ? base.slice(0, base.length - ext.length) : base;

  function next() {
    setIndex((i) => (i + 1) % samplePaths.length);
  }

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <button onClick={next}>Try another path</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, width: "100%" }}>
        {"path:     " + path + "\\n" +
          "dirname:  " + dirnamePath(path) + "\\n" +
          "basename: " + base + "\\n" +
          "name:     " + name + "\\n" +
          "extname:  " + (ext || "(none)")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
