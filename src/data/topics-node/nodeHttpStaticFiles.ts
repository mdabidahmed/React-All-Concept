import type { Topic } from "../../types";

export const nodeHttpStaticFilesTopic: Topic = {
  id: "node-http-static-files",
  title: "Node.js Serving Static Files",
  category: "HTTP & Servers",
  shortExplanation: `Serving a "static file" (an HTML page, a stylesheet, an image) with the raw \`http\` module means reading it from disk with \`fs\` and writing its contents to \`res\` with the **correct \`Content-Type\` header** — nothing does this automatically.

- The extension of the requested path (\`.html\`, \`.css\`, \`.js\`, \`.png\`) has to be mapped to a MIME type by hand, e.g. \`text/css\` or \`application/javascript\`
- A missing/wrong \`Content-Type\` can make a browser misinterpret the response — CSS served as plain text is simply ignored, for instance
- Naively joining \`req.url\` onto a base folder is a real **path-traversal security risk** (\`../../etc/passwd\`) unless the resolved path is checked to stay inside the intended folder
- Real apps rarely hand-roll this — \`express.static\` or a CDN/reverse proxy typically serves static files instead`,
  longExplanation: `A "static" file is one whose bytes don't change per-request — an \`index.html\`, a \`styles.css\`, a \`logo.png\` — as opposed to a response generated fresh from a database query or some other server-side logic. Serving one with the raw \`http\` module combines two things covered in earlier topics: reading a file with \`fs\`, and writing a response with \`res\`.

**The basic shape** of a static file handler: take the requested path, read the corresponding file from disk, and write its contents as the response body — with the right \`Content-Type\` header set before that body goes out. \`fs.readFile\` (or, for larger files, \`fs.createReadStream\` piped directly into \`res\`, which avoids loading the entire file into memory before sending the first byte) does the actual reading.

**Content-Type has to be figured out by hand.** The raw \`http\` module has no idea that a \`.css\` file should be served as \`text/css\`, or that a \`.js\` file should be \`application/javascript\`/\`text/javascript\` — that mapping is ordinary application code, usually a lookup table from file extension to MIME type. Getting this wrong has real, visible consequences: a browser that requests a stylesheet and receives it with \`Content-Type: text/plain\` (or no \`Content-Type\` at all) will typically just display the raw CSS as text rather than applying it, since the browser trusts the declared type over guessing from content.

**A file that doesn't exist** needs an explicit \`404\` — \`fs.readFile\`'s error callback (or a promise rejection with the async/await version) fires with an \`ENOENT\` error in exactly that case, which the handler should catch and turn into a proper \`404\` response rather than letting it crash the handler or hang the request.

**A genuine security concern**: building a file path by directly concatenating \`req.url\` onto a base "public" directory (\`publicDir + req.url\`) is dangerous, because nothing stops a client from requesting a path like \`/../../etc/passwd\` or \`/../server.js\`, walking *up and out* of the intended folder using \`..\` segments and potentially reading files that were never meant to be public — configuration files, source code, credentials. Safe implementations resolve the final, normalized absolute path (Node's \`path\` module helps here) and explicitly verify it's still located *inside* the intended public directory before reading it — rejecting the request with a \`403\` or \`404\` if it isn't.

**In practice, applications rarely hand-write this whole thing.** Express (covered in its own category later in this subject) ships a built-in \`express.static(directory)\` middleware that already handles MIME type lookup, \`404\`s, streaming, and path-traversal protection correctly. At a larger scale, static assets are frequently served by something *other* than the Node.js application entirely — a reverse proxy like Nginx, or a CDN — since those are typically far more efficient at serving unchanging files than a general-purpose application server needs to (or should) be. Understanding the raw version here is still worthwhile, though, since it's exactly what those tools are doing underneath.

Since this sandbox has no real disk and no real network, these examples combine both simulation patterns from earlier topics: a \`fakeDisk\`-style plain object standing in for the file system (as in the \`fs\` topics), and the \`createFakeServer\`/\`createFakeRes\` pair standing in for \`http\` (as in the earlier HTTP topics) — together showing exactly how a real static file handler is structured, without a real file system or network underneath it.`,
  examples: [
    {
      id: "serving-with-correct-content-type",
      title: "Serving a file with the right Content-Type",
      summary: "The file extension is looked up in a MIME-type table before the response is sent.",
      code: `const fakeDisk = {
  "/index.html": "<h1>Hello!</h1>",
  "/styles.css": "body { margin: 0; }",
  "/app.js": "console.log('hi');",
};

const mimeTypes = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "application/javascript",
};

function getExtension(path) {
  const dotIndex = path.lastIndexOf(".");
  return dotIndex === -1 ? "" : path.slice(dotIndex);
}

function serveStatic(req, res) {
  const path = req.url;
  if (!(path in fakeDisk)) {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 Not Found");
    return;
  }
  const contentType = mimeTypes[getExtension(path)] || "application/octet-stream";
  res.writeHead(200, { "Content-Type": contentType });
  res.end(fakeDisk[path]);
}

function App() {
  const [output, setOutput] = useState("");

  function request(path) {
    const res = { statusCode: 200, headers: {}, body: "", writeHead(c, h) { this.statusCode = c; this.headers = h; }, end(b) { this.body = b; } };
    serveStatic({ url: path }, res);
    setOutput(res.statusCode + " " + JSON.stringify(res.headers) + "\\n\\n" + res.body);
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <button onClick={() => request("/index.html")}>GET /index.html</button>
        <button onClick={() => request("/styles.css")}>GET /styles.css</button>
        <button onClick={() => request("/app.js")}>GET /app.js</button>
      </div>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 90 }}>
        {output || "// pick a file above"}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "static-file-404",
      title: "404 when a file doesn't exist",
      summary: "Reading a missing path from the fake disk gets turned into a proper 404, not a crash.",
      code: `const fakeDisk = { "/index.html": "<h1>Hello!</h1>" };

function readFakeFile(path, callback) {
  setTimeout(() => {
    if (!(path in fakeDisk)) {
      callback(new Error("ENOENT: no such file '" + path + "'"), null);
      return;
    }
    callback(null, fakeDisk[path]);
  }, 200);
}

function serveStatic(req, res) {
  readFakeFile(req.url, (err, data) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("404 Not Found: " + req.url);
      return;
    }
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(data);
  });
}

function App() {
  const [output, setOutput] = useState("");

  function request(path) {
    setOutput("Reading " + path + "...");
    const res = { statusCode: 200, body: "", writeHead(c) { this.statusCode = c; }, end(b) { this.body = b; setOutput(res.statusCode + ": " + b); } };
    serveStatic({ url: path }, res);
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={() => request("/index.html")}>GET /index.html</button>
        <button onClick={() => request("/missing.html")}>GET /missing.html</button>
      </div>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 50 }}>
        {output || "// output appears here"}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "path-traversal-guard",
      title: "Gotcha: guarding against path traversal (../)",
      summary: "Naively joining req.url onto a base folder can walk right out of it -- unless the result is checked.",
      code: `const publicDir = "/var/www/public";
const fakeDisk = {
  "/var/www/public/index.html": "<h1>Public page</h1>",
  "/var/www/secrets.txt": "DB_PASSWORD=hunter2",
};

function normalizePath(path) {
  // A simplified stand-in for what Node's real path.normalize/path.resolve do:
  // it collapses "a/../b" segments down to "b".
  const parts = path.split("/");
  const stack = [];
  parts.forEach((part) => {
    if (part === "" || part === ".") return;
    if (part === "..") stack.pop();
    else stack.push(part);
  });
  return "/" + stack.join("/");
}

function serveStatic(req, res) {
  const requestedPath = normalizePath(publicDir + req.url);
  if (!requestedPath.startsWith(publicDir)) {
    res.writeHead(403, { "Content-Type": "text/plain" });
    res.end("403 Forbidden: path escapes the public directory");
    return;
  }
  if (!(requestedPath in fakeDisk)) {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 Not Found");
    return;
  }
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(fakeDisk[requestedPath]);
}

function App() {
  const [output, setOutput] = useState("");

  function request(url) {
    const res = { statusCode: 200, body: "", writeHead(c) { this.statusCode = c; }, end(b) { this.body = b; } };
    serveStatic({ url }, res);
    setOutput(res.statusCode + ": " + res.body);
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <button onClick={() => request("/index.html")}>GET /index.html</button>
        <button onClick={() => request("/../secrets.txt")}>GET /../secrets.txt (attack)</button>
      </div>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 50 }}>
        {output || "// try the normal request, then the attack"}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "streaming-a-large-file",
      title: "Real Node.js: streaming a large file instead of loading it all at once",
      summary: "fs.createReadStream + res -- sending a file chunk by chunk, without holding the whole thing in memory first.",
      code: `// A large file, represented here as an array of chunks rather than one giant string --
// standing in for what fs.createReadStream would hand a real handler piece by piece.
const fakeLargeFileChunks = ["chunk 1 of video.mp4...", "chunk 2...", "chunk 3...", "chunk 4 (final)"];

function serveStreamed(req, res, onProgress) {
  res.writeHead(200, { "Content-Type": "video/mp4" });
  let i = 0;
  function sendNextChunk() {
    if (i >= fakeLargeFileChunks.length) {
      res.end();
      onProgress("Done -- res.end() called, all chunks sent without ever holding the full file in memory.");
      return;
    }
    res.write(fakeLargeFileChunks[i]);
    onProgress("res.write(): " + fakeLargeFileChunks[i]);
    i = i + 1;
    setTimeout(sendNextChunk, 300);
  }
  sendNextChunk();
}

function App() {
  const [log, setLog] = useState([]);
  const [sending, setSending] = useState(false);

  function run() {
    setLog([]);
    setSending(true);
    const res = { write() {}, end() { setSending(false); } };
    serveStreamed({ url: "/video.mp4" }, res, (line) => setLog((prev) => [...prev, line]));
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={run} disabled={sending}>GET /video.mp4 (streamed)</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 100 }}>
        {log.length === 0 ? "// output appears here" : log.join("\\n")}
      </pre>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        fs.createReadStream(path).pipe(res) does this same thing in real Node.js: each chunk
        read from disk is written to the response as soon as it's available, instead of
        waiting to load the entire file into memory first.
      </p>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
