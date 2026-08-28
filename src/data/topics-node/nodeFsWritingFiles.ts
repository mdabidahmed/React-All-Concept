import type { Topic } from "../../types";

export const nodeFsWritingFilesTopic: Topic = {
  id: "node-fs-writing-files",
  title: "Node.js Writing Files",
  category: "File System",
  shortExplanation: `The \`fs\` module also lets Node.js write data to disk — creating new files, replacing existing ones, or adding onto the end of a file, in the same async-first style as reading.

- \`fs.writeFile(path, data, callback)\` — creates the file if it doesn't exist, and **completely replaces** its contents if it does
- \`fs.appendFile(path, data, callback)\` — creates the file if it doesn't exist, but **adds onto the end** of existing contents instead of erasing them
- Both have blocking \`*Sync\` counterparts (\`writeFileSync\`, \`appendFileSync\`) that return once the write is done rather than taking a callback`,
  longExplanation: `Writing to disk is the mirror image of reading from it, and Node's \`fs\` module offers the same three flavors — callback-based, synchronous, and promise-based — for creating or modifying a file's contents.

- **\`fs.writeFile(path, data, callback)\`** is asynchronous and, importantly, ==destructive==: if a file already exists at \`path\`, its entire existing contents are erased and replaced with \`data\`. If no file exists there yet, one is created. This makes \`writeFile\` the right tool when you want a file's contents to be *exactly* what you're passing in right now — a freshly rendered HTML page, a JSON config snapshot, a report generated from scratch each time
- **\`fs.appendFile(path, data, callback)\`** behaves identically to \`writeFile\` when the file doesn't exist yet (it creates it), but when the file *does* exist, the new \`data\` is added onto the *end* of the current contents rather than replacing them. This is the natural choice for anything that accumulates over time — a log file that records one line per event, a running record of transactions — where erasing history on every write would defeat the purpose
- A common real bug: calling \`writeFile\` repeatedly inside a loop when the intent was actually to build up a file line-by-line — each call erases what the previous call wrote, leaving only the very last line on disk. Reaching for \`appendFile\` (or building the whole string in memory first and writing it once) fixes this
- Both functions are asynchronous and take an **error-first callback**: \`(err) => { ... }\`, called once the write finishes (or fails — e.g. the containing directory doesn't exist, or the process lacks permission to write there). Notice that unlike \`readFile\`'s callback, there's no second "data" parameter here — a successful write doesn't hand anything back except confirmation that it worked
- **\`fs.writeFileSync(path, data)\`** and **\`fs.appendFileSync(path, data)\`** are the blocking counterparts — no callback, they simply return (or throw an \`Error\` on failure) once the write has actually completed. Like \`readFileSync\`, these block the entire Node.js process for the duration of the write, which is fine for a short one-off script but dangerous inside a server handling concurrent requests, where one slow disk write would stall every other request
- **Modern async/await style**: \`import { writeFile } from "fs/promises"; await writeFile(path, data);\` gets non-blocking behavior with synchronous-looking code, and is generally the preferred style in new code alongside \`try\`/\`catch\` for error handling
- A gotcha shared by all of these: \`fs.writeFile\` and \`fs.appendFile\` do **not** create missing parent directories automatically — writing to \`"logs/app.log"\` fails with an \`ENOENT\` error if the \`logs\` directory doesn't already exist. The next topic in this subject, working with directories, covers \`fs.mkdir\` for exactly this situation
- Concurrency matters too: if multiple parts of a program call \`appendFile\` on the *same* path around the same time, the underlying writes can interleave in ways that aren't always safe to assume are perfectly ordered — a subtlety that becomes important once a program is doing more than one thing at a time (which, in Node.js, is the normal case)

As with reading files, this sandbox has no real disk to write to — every example below simulates \`fs\` with a plain JavaScript object standing in for a tiny "disk," and functions shaped exactly like the real \`fs\` API (same parameter order, same error-first callback, same async delay via \`setTimeout\`), so the behavior you see here — overwrite vs. append, sync vs. async — maps directly onto real Node.js code.`,
  examples: [
    {
      id: "simulated-writefile",
      title: "fs.writeFile creates or overwrites a file",
      summary: "Writing to an existing path completely replaces its previous contents.",
      code: `const fakeDisk = { "notes.txt": "Original content." };

function writeFile(path, data, callback) {
  setTimeout(() => {
    fakeDisk[path] = data;
    callback(null);
  }, 300);
}

function App() {
  const [log, setLog] = useState([]);

  function print(value) {
    setLog((prev) => [...prev, value]);
  }

  function run() {
    setLog(["Disk before: " + JSON.stringify(fakeDisk)]);
    writeFile("notes.txt", "Brand new content!", (err) => {
      if (err) {
        print("Error: " + err.message);
        return;
      }
      print("Write complete.");
      print("Disk after: " + JSON.stringify(fakeDisk));
    });
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={run}>Write (overwrite) notes.txt</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 90 }}>
        {log.length === 0 ? "// output appears here" : log.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "simulated-appendfile",
      title: "fs.appendFile adds to the end",
      summary: "The same file, but each call keeps the previous contents and adds a new line.",
      code: `const fakeDisk = { "log.txt": "Server started.\\n" };

function appendFile(path, data, callback) {
  setTimeout(() => {
    if (!(path in fakeDisk)) {
      fakeDisk[path] = data;
    } else {
      fakeDisk[path] = fakeDisk[path] + data;
    }
    callback(null);
  }, 300);
}

function App() {
  const [output, setOutput] = useState(fakeDisk["log.txt"]);

  function run() {
    appendFile("log.txt", "User logged in.\\n", (err) => {
      if (err) {
        setOutput("Error: " + err.message);
        return;
      }
      setOutput(fakeDisk["log.txt"]);
    });
  }

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <button onClick={run}>Append a new log line</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 80, whiteSpace: "pre-wrap" }}>
        {output}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "overwrite-vs-append",
      title: "Overwrite vs. append, side by side",
      summary: "The same starting file, one call replacing it entirely and one call adding onto it.",
      code: `function App() {
  const [diskA, setDiskA] = useState("Line one.");
  const [diskB, setDiskB] = useState("Line one.");

  function runWrite() {
    setDiskA("Line two."); // writeFile replaces the entire contents
  }

  function runAppend() {
    setDiskB((prev) => prev + "\\nLine two."); // appendFile adds onto the end
  }

  return (
    <div style={{ display: "grid", gap: 14 }}>
      <div>
        <button onClick={runWrite}>Simulate fs.writeFile</button>
        <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, marginTop: 8, whiteSpace: "pre-wrap" }}>
          {diskA}
        </pre>
        <p style={{ color: "#6b7280", fontSize: 13 }}>writeFile replaced the file's entire contents.</p>
      </div>
      <div>
        <button onClick={runAppend}>Simulate fs.appendFile</button>
        <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, marginTop: 8, whiteSpace: "pre-wrap" }}>
          {diskB}
        </pre>
        <p style={{ color: "#6b7280", fontSize: 13 }}>appendFile kept the original line and added a new one.</p>
      </div>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "simulated-sync-versions",
      title: "Sync versions: writeFileSync / appendFileSync",
      summary: "No callback, no setTimeout — both calls finish immediately and block until done.",
      code: `const fakeDisk = {};

function writeFileSync(path, data) {
  fakeDisk[path] = data;
}

function appendFileSync(path, data) {
  fakeDisk[path] = (fakeDisk[path] || "") + data;
}

function App() {
  const [output, setOutput] = useState("// nothing written yet");

  function run() {
    writeFileSync("session.txt", "Session started.\\n");
    appendFileSync("session.txt", "Session continued.\\n");
    setOutput(fakeDisk["session.txt"]);
  }

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <button onClick={run}>Run sync write + append</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 70, whiteSpace: "pre-wrap" }}>
        {output}
      </pre>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        Both calls returned directly with no callback — but in real Node.js, each one blocks the whole
        process until its write is fully done.
      </p>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
