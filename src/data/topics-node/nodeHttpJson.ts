import type { Topic } from "../../types";

export const nodeHttpJsonTopic: Topic = {
  id: "node-http-json",
  title: "Node.js Serving JSON",
  category: "HTTP & Servers",
  shortExplanation: `Sending JSON back is straightforward — set \`Content-Type: application/json\` and \`res.end(JSON.stringify(data))\`. **Receiving** JSON is the more surprising half: the raw \`http\` module never parses a request body for you at all.

- A request body arrives as a stream of \`"data"\` chunk events, collected and joined, then \`JSON.parse\`d only once the \`"end"\` event fires
- \`JSON.parse\` on malformed input **throws** — an unguarded call can crash a handler (or worse, the whole process) instead of returning a clean \`400 Bad Request\`
- \`res.writeHead(200, { "Content-Type": "application/json" })\` should always be set explicitly — a missing/wrong \`Content-Type\` means clients can't reliably tell how to interpret the body`,
  longExplanation: `**Sending** JSON from a Node.js handler is the easy direction: convert a JavaScript value to a JSON string with \`JSON.stringify(data)\`, set the \`Content-Type\` header to \`"application/json"\` so the client knows how to interpret the bytes, and pass the string straight to \`res.end()\`. \`res.writeHead(200, { "Content-Type": "application/json" }); res.end(JSON.stringify(data));\` is the whole pattern.

**Receiving** a JSON request body is the half that catches people off guard, because the raw \`http\` module does *nothing* to parse it automatically — there's no \`req.body\` property waiting to be read, unlike in Express or similar frameworks. Instead, \`req\` is a **readable stream**: the request body arrives in pieces, over time, as the network delivers it, and a handler has to collect those pieces itself before it can do anything with them:

- \`req.on("data", (chunk) => { ... })\` fires once for every chunk of the body as it arrives — a chunk is a \`Buffer\`, typically converted to a string and appended to a growing accumulator
- \`req.on("end", () => { ... })\` fires once, after every chunk has arrived, signaling that the full body is now available — this is the point where the accumulated string is finally safe to \`JSON.parse\`
- (\`req.on("error", (err) => { ... })\` is also worth listening for — a connection can drop mid-stream)

This chunked, event-driven collection process is exactly what body-parsing middleware in frameworks like Express does *for* you automatically, so most real-world code never writes this loop by hand — but understanding that it's happening underneath explains why request bodies aren't simply "just there" the way \`req.method\` or \`req.headers\` are, and why a body has to be fully received before it can be used at all.

**A real, serious gotcha**: \`JSON.parse\` throws a \`SyntaxError\` on anything that isn't valid JSON — an empty body, truncated input, or a client that simply sends the wrong content type. A handler that calls \`JSON.parse(body)\` without wrapping it in a \`try\`/\`catch\` will throw synchronously inside the \`"end"\` callback. If that throw isn't caught, it becomes an *uncaught exception* — and depending on how the server's top-level error handling is set up, an uncaught exception in a request handler can crash the entire Node.js process, taking down every other client's in-flight request along with it, not just the one that sent bad JSON. The fix is always the same: wrap the parse in \`try\`/\`catch\`, and on failure respond with \`400 Bad Request\` (describing what went wrong) instead of letting the exception propagate.

**Other real gotchas worth knowing:**

- Forgetting the \`Content-Type: application/json\` response header doesn't break a JSON.parse-aware client, but it's technically incorrect and can confuse tools (like browser dev tools, or strict HTTP clients) that decide how to display or validate a response based on its declared type
- \`JSON.stringify\` quietly *drops* values it can't represent — a property whose value is \`undefined\` or a function simply vanishes from the output rather than causing an error, which can be a source of "why is this field missing?" confusion
- \`JSON.stringify\` throws on a genuinely circular object reference (an object that contains itself, directly or indirectly) — rare, but worth knowing rather than being surprised by if a complex object graph is stringified directly

Since this sandbox has no real network stream to read a body from, the examples below **simulate** the chunk-by-chunk collection process explicitly — a small object with an \`.on(eventName, callback)\` method that fires \`"data"\` a few times and then \`"end"\`, mirroring exactly how Node's real \`req\` object behaves as an \`EventEmitter\`-based readable stream — so the collection logic shown maps directly onto real Node.js code, even though the underlying delivery is faked with \`setTimeout\` rather than a real network connection.`,
  examples: [
    {
      id: "responding-with-json",
      title: "Responding with JSON",
      summary: "Content-Type set explicitly, then res.end(JSON.stringify(data)) -- the whole pattern.",
      code: `function handler(req, res) {
  const data = { id: 1, text: "Buy milk", done: false };
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data));
}

function App() {
  const [output, setOutput] = useState("");

  function run() {
    const res = { statusCode: 200, headers: {}, body: "", writeHead(c, h) { this.statusCode = c; this.headers = h; }, end(b) { this.body = b; } };
    handler({ method: "GET", url: "/notes/1" }, res);
    setOutput(res.statusCode + " " + JSON.stringify(res.headers) + "\\n\\nbody: " + res.body);
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={run}>GET /notes/1</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 70 }}>
        {output || "// output appears here"}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "collecting-a-json-body",
      title: "Parsing a JSON request body: collecting chunks, then JSON.parse",
      summary: "req is a stream -- the body arrives in pieces via \"data\" events, finished by a single \"end\" event.",
      code: `function createFakeJsonRequest(fullBodyText) {
  // Simulates req being a readable stream: the body text arrives split into pieces,
  // delivered on a timer, exactly like real network chunks would.
  const pieces = [fullBodyText.slice(0, 10), fullBodyText.slice(10, 22), fullBodyText.slice(22)];
  const listeners = {};
  return {
    on(eventName, callback) {
      listeners[eventName] = callback;
      return this;
    },
    _simulateNetwork() {
      let i = 0;
      function sendNext() {
        if (i >= pieces.length) {
          if (listeners.end) listeners.end();
          return;
        }
        if (listeners.data) listeners.data(pieces[i]);
        i = i + 1;
        setTimeout(sendNext, 200);
      }
      sendNext();
    },
  };
}

function App() {
  const [log, setLog] = useState([]);

  function print(v) {
    setLog((prev) => [...prev, v]);
  }

  function run() {
    setLog([]);
    const req = createFakeJsonRequest('{"text":"Buy milk"}');
    let body = "";
    req.on("data", (chunk) => {
      body = body + chunk;
      print("req.on(\\"data\\") chunk: \\"" + chunk + "\\"");
    });
    req.on("end", () => {
      const parsed = JSON.parse(body);
      print("req.on(\\"end\\") -- full body: \\"" + body + "\\"");
      print("JSON.parse(body) -> " + JSON.stringify(parsed));
    });
    req._simulateNetwork();
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={run}>Send a JSON request body</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 120 }}>
        {log.length === 0 ? "// output appears here" : log.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "gotcha-malformed-json",
      title: "Gotcha: malformed JSON needs a try/catch, or it crashes",
      summary: "JSON.parse throws on bad input -- an unguarded call turns one bad request into a server-wide problem.",
      code: `function handleBody(bodyText) {
  try {
    const parsed = JSON.parse(bodyText);
    return { status: 200, body: "Parsed OK: " + JSON.stringify(parsed) };
  } catch (err) {
    return { status: 400, body: "400 Bad Request: invalid JSON (" + err.message + ")" };
  }
}

function App() {
  const [result, setResult] = useState("");

  function send(bodyText) {
    const res = handleBody(bodyText);
    setResult(res.status + ": " + res.body);
  }

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <button onClick={() => send('{"text":"valid"}')}>Send valid JSON</button>
        <button onClick={() => send('{text: invalid}')}>Send malformed JSON</button>
        <button onClick={() => send("")}>Send an empty body</button>
      </div>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 40, whiteSpace: "pre-wrap" }}>
        {result || "// try each button -- only the try/catch keeps bad input from crashing the handler"}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "json-echo-endpoint",
      title: "Building a simple JSON echo endpoint",
      summary: "A full handler: collect the streamed body, parse it, add a field, and respond with JSON.",
      code: `function createFakeJsonRequest(fullBodyText) {
  const listeners = {};
  return {
    on(eventName, callback) {
      listeners[eventName] = callback;
      return this;
    },
    _simulateNetwork() {
      setTimeout(() => {
        if (listeners.data) listeners.data(fullBodyText);
        if (listeners.end) listeners.end();
      }, 250);
    },
  };
}

function echoHandler(req, res) {
  let body = "";
  req.on("data", (chunk) => {
    body = body + chunk;
  });
  req.on("end", () => {
    try {
      const parsed = JSON.parse(body);
      const responseData = { received: parsed, receivedAt: "2026-08-25T00:00:00.000Z" };
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(responseData));
    } catch (err) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Invalid JSON body" }));
    }
  });
}

function App() {
  const [output, setOutput] = useState("");

  function run() {
    setOutput("Sending POST /echo ...");
    const req = createFakeJsonRequest('{"greeting":"hello server"}');
    const res = {
      writeHead(c, h) { this.statusCode = c; this.headers = h; },
      end(b) { setOutput(this.statusCode + " " + JSON.stringify(this.headers) + "\\n\\n" + b); },
    };
    echoHandler(req, res);
    req._simulateNetwork();
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={run}>POST /echo with {"{"}"greeting":"hello server"{"}"}</button>
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
