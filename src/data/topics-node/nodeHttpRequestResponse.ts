import type { Topic } from "../../types";

export const nodeHttpRequestResponseTopic: Topic = {
  id: "node-http-request-response",
  title: "Node.js Handling Requests and Responses",
  category: "HTTP & Servers",
  shortExplanation: `Every request listener receives an incoming-request object (\`req\`) to *read from*, and a response object (\`res\`) to *write to* — they're separate objects with separate jobs.

- \`req.method\` (\`"GET"\`, \`"POST"\`, ...), \`req.url\` (the path plus any query string), \`req.headers\` (an object of request headers)
- \`res.writeHead(statusCode, headers)\` — sets the status code and response headers *before* any body is sent
- \`res.write(chunk)\` — sends one piece of the body; can be called multiple times for streaming
- \`res.end(chunk?)\` — sends a final piece (optional) and finishes the response — every response must call this exactly once`,
  longExplanation: `A Node.js request listener always receives the same two objects, and it's worth being precise about what each one is for. \`req\` (the *incoming message*) is read-only information about what the client sent — you inspect it, but writing to it does nothing meaningful. \`res\` (the *server response*) is the opposite — a set of methods for building up and sending back a reply. Confusing the two, or expecting one to behave like the other, is a common early mistake.

**Reading from \`req\`:**

- \`req.method\` is a string like \`"GET"\`, \`"POST"\`, \`"PUT"\`, \`"PATCH"\`, or \`"DELETE"\` — exactly what HTTP method the client used.
- \`req.url\` is the path *and query string* the client requested — for a request to \`http://example.com/search?q=cats\`, \`req.url\` is \`"/search?q=cats"\`, not the full URL (there's no protocol or host in it at this level). Splitting off the query string and parsing it is manual work with the raw \`http\` module — Node's \`url\` module helps, and frameworks like Express do it automatically (covered later in this subject).
- \`req.headers\` is a plain object of the request's HTTP headers, with keys already lowercased by Node (\`req.headers["content-type"]\`, \`req.headers["authorization"]\`, and so on) — HTTP headers are case-insensitive by spec, and Node normalizes them for you.
- The request **body** (for a \`POST\` or \`PUT\`, say) is *not* a simple property — it arrives as a stream of data chunks over time, which is exactly what the next topic on JSON bodies covers in detail.

**Writing to \`res\`:**

- \`res.writeHead(statusCode, headers)\` sets the numeric status code (\`200\` for success, \`404\` for not found, \`500\` for a server error, and so on) and any response headers, such as \`{ "Content-Type": "text/plain" }\`. This has to happen *before* any body content is sent — HTTP sends headers first, then the body, and Node enforces that ordering. Calling \`writeHead\` after already writing body content throws an error.
- \`res.write(chunk)\` sends one piece of the response body. It can be called any number of times — each call streams out another chunk immediately, rather than waiting to assemble the whole body in memory first. This matters for large responses (like a big file) where you don't want to hold the entire thing in memory before sending a byte of it.
- \`res.end(chunk?)\` optionally sends one last piece of the body, and then tells Node "this response is finished — send it." **Every request must eventually call \`res.end()\` exactly once.** Skip it, and the client hangs forever waiting for a response that never completes (the exact gotcha covered in the previous topic). Call it twice, and Node throws an error — \`"write after end"\`.

A useful mental model: \`res.write()\` is for the *middle* of a response (zero or more times), and \`res.end()\` is the *only* way to actually finish one (exactly once, always). Many simple handlers skip \`write\` entirely and just pass the whole body straight to \`end("the whole response")\` — which is perfectly fine when there's nothing to stream.

One more subtlety: if you never call \`res.writeHead()\` at all, Node picks reasonable defaults (status \`200\`, and it tries to guess headers) the moment you first call \`write\` or \`end\` — but being explicit about the status code and \`Content-Type\` is almost always what real applications want, since guessed defaults are rarely exactly right.

Since this sandbox has no real network layer, these examples build a small \`req\` object by hand (a plain object with \`method\`, \`url\`, and \`headers\` properties, exactly shaped like Node's real \`IncomingMessage\`) and a small \`res\` object with genuinely-working \`writeHead\`/\`write\`/\`end\` methods that accumulate a status, headers, and body — standing in for Node's real \`ServerResponse\`. The method names, argument order, and behavior (headers before body, \`end\` finishing exactly once) all match the real \`http\` module precisely.`,
  examples: [
    {
      id: "reading-request-properties",
      title: "Reading method, url, and headers from req",
      summary: "A simulated incoming request, shaped exactly like Node's real IncomingMessage object.",
      code: `function App() {
  const [output, setOutput] = useState(null);

  const fakeRequests = [
    { method: "GET", url: "/products?category=books", headers: { "user-agent": "Mozilla/5.0", accept: "text/html" } },
    { method: "POST", url: "/login", headers: { "content-type": "application/json", authorization: "Bearer abc123" } },
  ];

  function inspect(req) {
    setOutput(
      "method:  " + req.method + "\\n" +
      "url:     " + req.url + "\\n" +
      "headers: " + JSON.stringify(req.headers, null, 2)
    );
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={() => inspect(fakeRequests[0])}>Inspect GET /products?category=books</button>
        <button onClick={() => inspect(fakeRequests[1])}>Inspect POST /login</button>
      </div>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 110 }}>
        {output || "// req details appear here"}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "writehead-and-end",
      title: "res.writeHead(status, headers) then res.end(body)",
      summary: "Status and headers must be set before the body — Node enforces that ordering.",
      code: `function createFakeRes() {
  return {
    statusCode: 200,
    headers: {},
    body: "",
    headersSent: false,
    ended: false,
    writeHead(code, headers) {
      if (this.ended) throw new Error("Cannot set headers after they are sent.");
      this.statusCode = code;
      if (headers) Object.assign(this.headers, headers);
      this.headersSent = true;
      return this;
    },
    end(chunk) {
      if (chunk !== undefined) this.body += chunk;
      this.ended = true;
      return this;
    },
  };
}

function handler(req, res) {
  res.writeHead(200, { "Content-Type": "text/plain", "X-Powered-By": "Node.js" });
  res.end("Hello, " + req.url);
}

function App() {
  const [result, setResult] = useState(null);

  function run() {
    const res = createFakeRes();
    handler({ method: "GET", url: "/world" }, res);
    setResult(
      "status:  " + res.statusCode + "\\n" +
      "headers: " + JSON.stringify(res.headers, null, 2) + "\\n" +
      "body:    \\"" + res.body + "\\""
    );
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={run}>Run handler(req, res)</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 100 }}>
        {result || "// output appears here"}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "streaming-with-write",
      title: "Streaming a response with multiple write() calls",
      summary: "write() can be called several times before a single, final end() — each chunk goes out as it's produced.",
      code: `function createFakeRes(onChunk) {
  return {
    body: "",
    write(chunk) {
      this.body += chunk;
      onChunk(chunk, false);
      return this;
    },
    end(chunk) {
      if (chunk !== undefined) {
        this.body += chunk;
        onChunk(chunk, true);
      } else {
        onChunk(null, true);
      }
      return this;
    },
  };
}

function App() {
  const [chunks, setChunks] = useState([]);

  function run() {
    setChunks([]);
    const res = createFakeRes((chunk, isLast) => {
      setChunks((prev) => [
        ...prev,
        (chunk !== null ? "wrote: \\"" + chunk + "\\"" : "") + (isLast ? "  <- end()" : ""),
      ]);
    });

    res.write("Generating report");
    res.write("...");
    res.write(" 50%");
    res.write("... 100%");
    res.end(" done!");
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={run}>Stream a response piece by piece</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 110 }}>
        {chunks.length === 0 ? "// output appears here" : chunks.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "gotcha-double-end",
      title: "Gotcha: calling res.end() twice",
      summary: "Real Node.js throws 'write after end' — this simulation reports the same mistake explicitly.",
      code: `function createFakeRes() {
  return {
    body: "",
    ended: false,
    end(chunk) {
      if (this.ended) {
        throw new Error("Error [ERR_STREAM_WRITE_AFTER_END]: write after end");
      }
      if (chunk !== undefined) this.body += chunk;
      this.ended = true;
      return this;
    },
  };
}

function App() {
  const [output, setOutput] = useState("");

  function run() {
    const res = createFakeRes();
    try {
      res.end("First response.");
      res.end("Trying to send more...");
      setOutput("Both calls succeeded (this shouldn't happen).");
    } catch (err) {
      setOutput("First end() succeeded with body \\"" + res.body + "\\".\\nSecond end() threw: " + err.message);
    }
  }

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <button onClick={run}>Call res.end() twice</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 80 }}>
        {output || "// output appears here"}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
