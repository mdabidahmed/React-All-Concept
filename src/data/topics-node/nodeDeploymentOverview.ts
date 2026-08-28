import type { Topic } from "../../types";

export const nodeDeploymentOverviewTopic: Topic = {
  id: "node-deployment-overview",
  title: "Node.js Deployment Overview",
  category: "NPM & Deployment",
  shortExplanation: `Deploying a Node.js app means running it reliably somewhere other than your own machine — a **process manager** (like PM2) keeps the process alive and restarts it after a crash, while the app itself typically binds to \`process.env.PORT\` (since many hosts assign the port dynamically) and reads configuration from real environment variables set on the platform, not a shipped \`.env\` file.

- **Process managers** (PM2 and similar) restart a crashed process automatically, manage logs, and can run multiple instances of the same app across CPU cores
- **Hosting approaches** range from a bare VM you manage yourself, to a **container** (Docker) that packages the app with its exact runtime environment, to a fully **managed platform** that handles most of this for you
- Production environment variables are set **on the platform itself** (a dashboard, a config file, a secrets manager) — never by uploading a \`.env\` file alongside the code`,
  longExplanation: `Running \`node app.js\` on a laptop and "deploying" that same app are different problems. A laptop session ends the moment you close the terminal; a deployed app needs to keep running unattended, indefinitely, survive crashes and server reboots, and often needs to handle far more simultaneous traffic than a single process comfortably can. This topic is a conceptual map of the pieces involved — none of it can be genuinely demonstrated in a browser sandbox, since it's fundamentally about processes, servers, and infrastructure outside any single script.

- **Process managers.** A tool like **PM2** wraps your app in a supervising process: if your app crashes (an uncaught exception, for instance), PM2 notices immediately and restarts it automatically, rather than leaving the service down until a human notices. PM2 also supports **cluster mode** — since a single Node.js process only uses one CPU core (a consequence of Node's single-threaded event loop), cluster mode runs several copies of the same app across multiple cores, letting one machine serve more traffic concurrently. It also centralizes logs from all of this into one place instead of scattered terminal output. On some platforms, none of this is necessary because the platform itself already supervises your process (restarting it on crash, load-balancing across instances) — PM2 (or an OS-level equivalent like \`systemd\`) matters most when you're managing the underlying server yourself
- **Hosting approaches span a spectrum of control vs. convenience**:
  - A **bare virtual machine (VM)** gives full control — you install Node yourself, configure a process manager, set up a reverse proxy, apply OS security updates — but also full responsibility for every layer
  - A **container (Docker)** packages the app together with its exact Node.js version and any OS-level dependencies into one portable image, so it runs identically on a laptop, a colleague's machine, or a production server — solving "works on my machine" at the level of the entire runtime environment, not just the code. Containers are also the standard building block most modern orchestration systems (like Kubernetes) and many managed platforms are built around
  - A **managed / "platform-as-a-service" host** takes a container or a source repository, and handles provisioning, process supervision, scaling, and often TLS certificates and custom domains automatically — trading away low-level control for dramatically less operational work
- **Binding to \`process.env.PORT\`.** Many hosting platforms decide, at deploy or startup time, exactly which port your app is allowed to listen on — and communicate that decision through a specific environment variable, conventionally named \`PORT\`. Code that hardcodes \`app.listen(3000)\` works fine locally but fails on such a platform, since the platform's actual assigned port might be something else entirely, and may even change between deploys. The standard, portable pattern is \`const port = process.env.PORT || 3000;\` — using whatever the platform assigns if it's set, and falling back to a fixed port only for local development where nothing sets \`PORT\` at all
- **Setting environment variables in production.** The previous topic covered \`.env\` files and \`dotenv\` as a local-development convenience — but shipping an actual \`.env\` file to production is generally avoided. Instead, real hosting platforms provide their own place to set environment variables directly on the running service — a web dashboard, a CLI command, infrastructure-as-code configuration, or a dedicated secrets manager — and those variables land in \`process.env\` automatically, with no file, and no \`dotenv\` package, involved at all. This is also typically *more* secure than a file: platform-managed secrets are usually encrypted at rest and access-controlled, where a plaintext \`.env\` file sitting on a server's disk is not
- **A few supporting pieces worth knowing exist**, even without deep detail here: a **reverse proxy** (commonly \`nginx\`) often sits in front of a Node app in production, handling TLS/HTTPS termination, serving static files efficiently, and load-balancing across multiple app instances; production apps typically log to \`stdout\`/\`stderr\` rather than writing their own log files, so the hosting platform's own log-aggregation tooling can capture and centralize them; and "zero-downtime" deploys generally work by starting new instances *before* stopping old ones, rather than stopping everything and then starting the replacement

Every example below is necessarily a simulation of behavior and decision-making (a real deploy, a real crash-and-restart cycle, a real hosting dashboard) rather than a live demonstration, since none of this can genuinely happen inside a browser tab — each is clearly framed as illustrating the *pattern*, not performing the real infrastructure operation.`,
  examples: [
    {
      id: "binding-to-platform-port",
      title: "Binding to process.env.PORT",
      summary: "The standard fallback pattern: use whatever port the platform assigns, or a fixed one for local dev.",
      code: `function startServer(processEnvPort) {
  const port = processEnvPort || 3000; // the portable, standard pattern
  return "Server listening on port " + port;
}

function App() {
  const [platformAssignsPort, setPlatformAssignsPort] = useState(true);
  const assignedPort = platformAssignsPort ? "8080" : undefined;

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <input
          type="checkbox"
          checked={platformAssignsPort}
          onChange={(e) => setPlatformAssignsPort(e.target.checked)}
        />
        Hosting platform sets process.env.PORT
      </label>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6 }}>
        {"process.env.PORT = " +
          (assignedPort === undefined ? "undefined  (local dev, nothing sets it)" : '"' + assignedPort + '"') +
          "\\n\\n" +
          startServer(assignedPort)}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "process-manager-restart",
      title: "A process manager restarting a crashed app (simulated)",
      summary: "PM2-style behavior: a crash is detected automatically, and the process restarts without human intervention.",
      code: `function App() {
  const [log, setLog] = useState([]);
  const [status, setStatus] = useState("stopped");
  const [restarts, setRestarts] = useState(0);

  function print(value) {
    setLog((prev) => [...prev, value]);
  }

  function start() {
    setStatus("running");
    print("$ pm2 start app.js");
    print("[pm2] app.js started (pid 1001)");
  }

  function simulateCrash() {
    if (status !== "running") return;
    print("[app] Uncaught exception -- process exited with code 1");
    setStatus("restarting");
    setTimeout(() => {
      const nextRestartCount = restarts + 1;
      setRestarts(nextRestartCount);
      print("[pm2] crash detected -- restarting automatically (restart #" + nextRestartCount + ")");
      setStatus("running");
      print("[pm2] app.js started (pid " + (1001 + nextRestartCount) + ")");
    }, 900);
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={start} disabled={status !== "stopped"}>
          pm2 start app.js
        </button>
        <button onClick={simulateCrash} disabled={status !== "running"}>
          Simulate a crash
        </button>
      </div>
      <p>Status: {status} -- restarts so far: {restarts}</p>
      <pre style={{ background: "#000", color: "#4ade80", padding: 12, borderRadius: 6, minHeight: 110 }}>
        {log.length === 0 ? "// start the app, then crash it a few times" : log.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "hosting-approaches-tradeoffs",
      title: "Comparing hosting approaches: control vs. convenience",
      summary: "A bare VM, a container, and a managed platform trade operational control for less day-to-day work.",
      code: `const approaches = {
  vm: { label: "Bare VM", control: 95, convenience: 20, description: "You install Node, configure a process manager, patch the OS, and set up a reverse proxy yourself." },
  container: { label: "Container (Docker)", control: 65, convenience: 60, description: "The app ships with its exact runtime baked in; a container platform handles running and scaling it." },
  managed: { label: "Managed platform", control: 25, convenience: 95, description: "Push code and the platform provisions, supervises, and scales it -- least control, least operational work." },
};

function Bar(props) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "90px 1fr 40px", gap: 8, alignItems: "center" }}>
      <span style={{ fontSize: 13 }}>{props.label}</span>
      <div style={{ background: "#1f2937", borderRadius: 4, overflow: "hidden", height: 10 }}>
        <div style={{ width: props.value + "%", background: props.color, height: "100%" }} />
      </div>
      <span style={{ fontSize: 13 }}>{props.value}</span>
    </div>
  );
}

function App() {
  const [selected, setSelected] = useState("container");
  const approach = approaches[selected];

  return (
    <div style={{ display: "grid", gap: 12 }}>
      <div style={{ display: "flex", gap: 8 }}>
        {Object.keys(approaches).map((key) => (
          <button key={key} onClick={() => setSelected(key)} disabled={key === selected}>
            {approaches[key].label}
          </button>
        ))}
      </div>
      <Bar label="Control" value={approach.control} color="#60a5fa" />
      <Bar label="Convenience" value={approach.convenience} color="#4ade80" />
      <p style={{ color: "#6b7280", fontSize: 13 }}>{approach.description}</p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "platform-env-vars-vs-dotenv-file",
      title: "Platform-set environment variables vs. a shipped .env file",
      summary: "In production, real environment variables come from the platform itself -- there's no file to parse at all.",
      code: `// Local development: dotenv reads a file and copies keys onto process.env.
function loadFromDotenvFile(fileContents) {
  const env = {};
  fileContents.split("\\n").forEach((line) => {
    const eq = line.indexOf("=");
    if (eq === -1) return;
    env[line.slice(0, eq)] = line.slice(eq + 1);
  });
  return env;
}

// Production on a real host: the platform injects process.env directly -- no file involved.
const platformInjectedEnv = {
  DATABASE_URL: "postgres://prod-cluster.internal:5432/myapp",
  NODE_ENV: "production",
};

function App() {
  const [mode, setMode] = useState("production");
  const localEnvFile = "DATABASE_URL=postgres://localhost:5432/myapp_dev\\nNODE_ENV=development";
  const resolvedEnv = mode === "production" ? platformInjectedEnv : loadFromDotenvFile(localEnvFile);

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <label style={{ display: "grid", gap: 4 }}>
        Environment:
        <select value={mode} onChange={(e) => setMode(e.target.value)} style={{ padding: 6 }}>
          <option value="development">Local development</option>
          <option value="production">Production (real host)</option>
        </select>
      </label>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6 }}>
        {mode === "production"
          ? "No .env file exists here at all.\\nprocess.env was populated directly by the hosting platform:\\n" +
            JSON.stringify(resolvedEnv, null, 2)
          : "dotenv parsed a local .env file:\\n" + JSON.stringify(resolvedEnv, null, 2)}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
