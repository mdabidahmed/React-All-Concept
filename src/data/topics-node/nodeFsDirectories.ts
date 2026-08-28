import type { Topic } from "../../types";

export const nodeFsDirectoriesTopic: Topic = {
  id: "node-fs-directories",
  title: "Node.js Working with Directories",
  category: "File System",
  shortExplanation: `Beyond individual files, Node's \`fs\` module also manages **directories** — creating new folders, listing what's inside a folder, and checking whether a path exists at all.

- \`fs.mkdir(path, callback)\` — creates a new directory (fails with \`EEXIST\` if it already exists)
- \`fs.readdir(path, callback)\` — lists the names of everything directly inside a directory
- \`fs.existsSync(path)\` — synchronously returns \`true\`/\`false\` for whether *anything* (file or directory) exists at a path`,
  longExplanation: `A directory (or "folder") is just a special kind of entry in a file system — instead of holding text or binary content, it holds a list of other entries (both files and other directories), forming the tree structure you navigate when browsing files. Node's \`fs\` module treats creating, listing, and checking directories as first-class operations, each with predictable failure modes worth knowing.

- **\`fs.mkdir(path, callback)\`** creates a new, empty directory at \`path\`. By default, it does **not** create missing parent directories — calling \`fs.mkdir("a/b/c", ...)\` fails with an \`ENOENT\` error if \`a/b\` doesn't already exist. Passing \`{ recursive: true }\` as a second argument (\`fs.mkdir(path, { recursive: true }, callback)\`) changes this, creating every missing directory along the path, and — helpfully — no longer errors if the target directory already exists either
- Attempting to create a directory that's already there (without \`recursive: true\`) fails with an \`EEXIST\` error — a common source of bugs in scripts that assume they're running for the first time, e.g. a setup script re-run on a machine where it already ran once
- **\`fs.readdir(path, callback)\`** returns an array of the *names* (not full paths, and not contents) of everything directly inside a directory — both files and subdirectories, listed together, one level deep only. To tell files apart from subdirectories, either \`fs.stat\` each name afterward, or pass \`{ withFileTypes: true }\`, which makes \`readdir\` return \`Dirent\` objects with an \`isDirectory()\` / \`isFile()\` method instead of plain strings
- **\`fs.existsSync(path)\`** is unusual among \`fs\` functions: it has no error-first callback version at all (there used to be an async \`fs.exists\`, but it was deprecated specifically because its callback shape — taking only a boolean, no error — didn't fit Node's conventions, and using it invited a subtle bug: checking a file exists and then acting on it moments later, during which time the file could be deleted or created by something else, known as a *TOCTOU* — time-of-check to time-of-use — race condition). For this reason, Node's docs recommend against using \`existsSync\` as a gate before reading/writing a file; it's better suited to one-off scripts and startup checks, using \`try\`/\`catch\` around the actual operation for anything that matters
- The modern promise-based equivalents live under \`fs/promises\`: \`await fs.promises.mkdir(path, { recursive: true })\` and \`await fs.promises.readdir(path)\` behave the same as their callback counterparts, just with \`async\`/\`await\` syntax
- A closely related function, \`fs.rmdir\` (or \`fs.rm\` with \`{ recursive: true }\` for non-empty directories), removes directories — not covered in depth here, but good to know exists as the natural counterpart to \`mkdir\`

Because this sandbox can't create a real folder on a real disk, the examples below simulate a small directory tree with a plain nested JavaScript object — an inner object represents a subdirectory, and any other value represents a file — with \`mkdir\`/\`readdir\`/\`existsSync\` functions shaped like the real \`fs\` API, including the same error-first callbacks and \`ENOENT\`/\`EEXIST\` style error messages, so the mental model carries over directly to a real file system.`,
  examples: [
    {
      id: "simulated-readdir",
      title: "fs.readdir lists a directory's contents",
      summary: "Returns just the names inside a folder, one level deep — files and subfolders together.",
      code: `const fakeFS = {
  "project": {
    "src": {
      "index.js": "console.log('hello');",
      "app.js": "// app logic",
    },
    "package.json": '{ "name": "project" }',
  },
};

function resolvePath(path) {
  const segments = path.split("/").filter(Boolean);
  let node = fakeFS;
  for (const segment of segments) {
    if (node && typeof node === "object" && segment in node) {
      node = node[segment];
    } else {
      return undefined;
    }
  }
  return node;
}

function readdir(path, callback) {
  setTimeout(() => {
    const node = resolvePath(path);
    if (node === undefined) {
      callback(new Error("ENOENT: no such directory '" + path + "'"), null);
      return;
    }
    if (typeof node !== "object") {
      callback(new Error("ENOTDIR: '" + path + "' is not a directory"), null);
      return;
    }
    callback(null, Object.keys(node));
  }, 300);
}

function App() {
  const [log, setLog] = useState([]);

  function print(value) {
    setLog((prev) => [...prev, value]);
  }

  function run() {
    setLog(["Reading directory 'project'..."]);
    readdir("project", (err, names) => {
      if (err) {
        print("Error: " + err.message);
        return;
      }
      print("Contents: " + names.join(", "));
    });
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={run}>List "project" contents</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 70 }}>
        {log.length === 0 ? "// output appears here" : log.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "simulated-mkdir",
      title: "fs.mkdir creates a new directory",
      summary: "The directory shows up in a follow-up readdir once the callback fires.",
      code: `const fakeFS = {
  "project": {
    "src": {},
  },
};

function resolvePath(path) {
  const segments = path.split("/").filter(Boolean);
  let node = fakeFS;
  for (const segment of segments) {
    if (node && typeof node === "object" && segment in node) {
      node = node[segment];
    } else {
      return undefined;
    }
  }
  return node;
}

function mkdir(path, callback) {
  setTimeout(() => {
    const segments = path.split("/").filter(Boolean);
    const newName = segments[segments.length - 1];
    const parentPath = segments.slice(0, -1).join("/");
    const parent = parentPath ? resolvePath(parentPath) : fakeFS;
    if (!parent || typeof parent !== "object") {
      callback(new Error("ENOENT: no such directory to create '" + path + "' in"));
      return;
    }
    if (newName in parent) {
      callback(new Error("EEXIST: '" + path + "' already exists"));
      return;
    }
    parent[newName] = {};
    callback(null);
  }, 300);
}

function App() {
  const [log, setLog] = useState([]);

  function print(value) {
    setLog((prev) => [...prev, value]);
  }

  function run() {
    const before = Object.keys(fakeFS.project.src).join(", ") || "(empty)";
    setLog(["project/src before: " + before]);
    mkdir("project/src/components", (err) => {
      if (err) {
        print("Error: " + err.message);
        return;
      }
      const after = Object.keys(fakeFS.project.src).join(", ");
      print("Created project/src/components");
      print("project/src after: " + after);
    });
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={run}>Create a new directory</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 90 }}>
        {log.length === 0 ? "// output appears here" : log.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "simulated-existssync",
      title: "fs.existsSync checks a path",
      summary: "A synchronous true/false check — no callback, no error for a missing path.",
      code: `const fakeFS = {
  "project": {
    "src": {
      "index.js": "console.log('hello');",
    },
  },
};

function resolvePath(path) {
  const segments = path.split("/").filter(Boolean);
  let node = fakeFS;
  for (const segment of segments) {
    if (node && typeof node === "object" && segment in node) {
      node = node[segment];
    } else {
      return undefined;
    }
  }
  return node;
}

function existsSync(path) {
  return resolvePath(path) !== undefined;
}

function App() {
  const [log, setLog] = useState([]);

  function run() {
    const paths = ["project", "project/src", "project/src/index.js", "project/missing"];
    const results = paths.map((path) => path + " -> " + existsSync(path));
    setLog(results);
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={run}>Check several paths</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 90 }}>
        {log.length === 0 ? "// output appears here" : log.join("\\n")}
      </pre>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        existsSync returns true/false immediately — no callback, no error thrown for a missing path.
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "simulated-mkdir-eexist",
      title: "Trying to create a directory that already exists",
      summary: "Without { recursive: true }, mkdir on an existing path fails with EEXIST.",
      code: `const fakeFS = {
  "project": {
    "src": {},
  },
};

function resolvePath(path) {
  const segments = path.split("/").filter(Boolean);
  let node = fakeFS;
  for (const segment of segments) {
    if (node && typeof node === "object" && segment in node) {
      node = node[segment];
    } else {
      return undefined;
    }
  }
  return node;
}

function mkdir(path, callback) {
  setTimeout(() => {
    const segments = path.split("/").filter(Boolean);
    const newName = segments[segments.length - 1];
    const parentPath = segments.slice(0, -1).join("/");
    const parent = parentPath ? resolvePath(parentPath) : fakeFS;
    if (!parent || typeof parent !== "object") {
      callback(new Error("ENOENT: no such directory to create '" + path + "' in"));
      return;
    }
    if (newName in parent) {
      callback(new Error("EEXIST: '" + path + "' already exists"));
      return;
    }
    parent[newName] = {};
    callback(null);
  }, 300);
}

function App() {
  const [result, setResult] = useState("");

  function run() {
    setResult("Creating project/src again...");
    mkdir("project/src", (err) => {
      if (err) {
        setResult("Failed: " + err.message);
        return;
      }
      setResult("Created.");
    });
  }

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <button onClick={run}>Try creating "project/src" (already exists)</button>
      <p>{result}</p>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
