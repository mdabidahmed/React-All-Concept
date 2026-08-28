import type { Topic } from "../../types";

export const nodeOsModuleTopic: Topic = {
  id: "node-os-module",
  title: "Node.js The OS Module",
  category: "OS & Process",
  shortExplanation: `The built-in \`os\` module reports information about the **operating system and hardware** the Node.js process is currently running on — separate from \`process\`, which is about the running program itself.

- \`os.platform()\` — a short string identifying the OS (\`"darwin"\`, \`"win32"\`, \`"linux"\`)
- \`os.cpus()\` — an array with one entry per logical CPU core, including its model and speed
- \`os.homedir()\` — the current user's home directory path
- \`os.totalmem()\` / \`os.freemem()\` — total and currently-available system memory, in bytes`,
  longExplanation: `Where \`process\` (covered in an earlier topic) describes the currently running Node.js *program* — its arguments, its environment variables, its exit status — the built-in \`os\` module describes the *machine* that program happens to be running on: what operating system, how many CPU cores, how much memory, which user account. The two modules are often used together but answer genuinely different questions.

- **\`os.platform()\`** returns a short identifier for the operating system: \`"darwin"\` for macOS, \`"win32"\` for Windows (yes, even 64-bit Windows), or \`"linux"\`. This is the standard way Node.js code branches on OS-specific behavior — choosing a different shell command, a different default file location, or working around a platform-specific quirk
- **\`os.cpus()\`** returns an array with one entry per logical CPU core available to the system, each including a \`model\` name and a clock \`speed\` in MHz. The most common real use for this isn't the details of any individual core — it's simply \`os.cpus().length\`, which tells a program how many CPU cores it could realistically use in parallel. Node's built-in \`cluster\` module (and the newer \`worker_threads\` module) are often paired with this number to spin up one worker process per core, letting a naturally single-threaded Node.js program actually use every core on a multi-core machine for CPU-heavy work
- **\`os.homedir()\`** returns the path to the current user's home directory (\`/Users/ada\` on macOS, \`/home/ada\` on Linux, a \`C:\\Users\\ada\`-style path on Windows) — commonly combined with the \`path\` module to build a per-user location for configuration files, caches, or credentials (\`path.join(os.homedir(), ".myapp", "config.json")\`), the same convention many real CLI tools (like git or npm) use for their own config files
- **\`os.totalmem()\`** and **\`os.freemem()\`** report, in raw bytes, the total physical memory installed on the machine and how much of it is currently unused, respectively. These describe the entire *system*, not just the current Node.js process's own memory usage — for the process's own footprint specifically, the separate \`process.memoryUsage()\` function (on the \`process\` object, not \`os\`) is the right tool. \`os.freemem()\` is occasionally used for lightweight health checks or logging — deciding whether a background job should proceed if the system looks memory-constrained, for instance — though for anything more serious, dedicated monitoring tools generally do a much more reliable job than reading this value directly
- All of \`os\`'s functions are **read-only queries** — nothing in this module changes anything about the operating system or hardware; it purely reports what's already true

Because this sandbox is a browser tab with no real CPU count, home directory, or memory statistics to report on Node's behalf, every value shown below is a clearly labeled **representative example** — realistic sample data standing in for what a real call to \`os.platform()\`, \`os.cpus()\`, \`os.homedir()\`, or \`os.totalmem()\`/\`os.freemem()\` would return on an actual machine.`,
  examples: [
    {
      id: "platform-representative",
      title: "os.platform(): branching on the OS",
      summary: "A representative platform value used to pick the right shell command.",
      code: `// Representative value — the real os.platform() reflects the actual machine running the code.
const fakePlatform = "darwin";

function App() {
  const [platform] = useState(fakePlatform);

  const openCommand = platform === "darwin" ? "open" : platform === "win32" ? "start" : "xdg-open";

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <p>os.platform() -> {platform}</p>
      <p>Command used to open a file/URL on this OS: {openCommand}</p>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        A real CLI tool might branch exactly like this to run the right shell command per operating system.
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "cpus-representative",
      title: "os.cpus(): how many cores are available",
      summary: "A representative list of CPU cores, commonly used to size a worker pool.",
      code: `// Representative array — a real machine could have anywhere from 1 to dozens of cores.
const fakeCpus = [
  { model: "Apple M2", speed: 3500 },
  { model: "Apple M2", speed: 3500 },
  { model: "Apple M2", speed: 3500 },
  { model: "Apple M2", speed: 3500 },
];

function App() {
  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <p>os.cpus().length -> {fakeCpus.length} (this many logical cores)</p>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6 }}>
        {fakeCpus.map((cpu, i) => "core " + i + ": " + cpu.model + " @ " + cpu.speed + "MHz").join("\\n")}
      </pre>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        A common real use: os.cpus().length tells a clustering tool (like Node's built-in "cluster"
        module) how many worker processes to spin up to use every core.
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "homedir-representative",
      title: "os.homedir(): the current user's home folder",
      summary: "Commonly combined with the path module to build a per-user config file location.",
      code: `// Representative value — the real path depends on the OS and logged-in user.
const fakeHomedir = "/Users/ada";

function App() {
  const configPath = fakeHomedir + "/.myapp/config.json";

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <p>os.homedir() -> {fakeHomedir}</p>
      <p>A typical use: building a per-user config file path from it.</p>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6 }}>
        {"path.join(os.homedir(), '.myapp/config.json') -> " + configPath}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "memory-representative",
      title: "os.totalmem() and os.freemem()",
      summary: "Raw byte counts converted into a human-readable percentage of free memory.",
      code: `// Representative byte counts — real values reflect the actual machine's installed and available RAM.
const fakeTotalMem = 17179869184; // 16 GB, in bytes
const fakeFreeMem = 6442450944; // 6 GB, in bytes

function bytesToGB(bytes) {
  return (bytes / 1024 / 1024 / 1024).toFixed(1) + " GB";
}

function App() {
  const percentFree = ((fakeFreeMem / fakeTotalMem) * 100).toFixed(0);

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <p>os.totalmem() -> {fakeTotalMem} bytes ({bytesToGB(fakeTotalMem)})</p>
      <p>os.freemem() -> {fakeFreeMem} bytes ({bytesToGB(fakeFreeMem)})</p>
      <p>Free: {percentFree}%</p>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        Both return raw bytes — dividing by 1024 three times converts to gigabytes for a human-readable display.
      </p>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
