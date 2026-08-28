import type { Topic } from "../../types";

export const nodeHttpServerTopic: Topic = {
  id: "node-http-server",
  title: "Node.js Creating an HTTP Server",
  category: "HTTP & Servers",
  shortExplanation: `Node's built-in \`http\` module lets you create a real web server with no framework at all — \`http.createServer((req, res) => { ... })\` builds the server, and \`server.listen(port)\` starts it accepting connections.

- \`http.createServer(requestListener)\` — the *requestListener* function runs once for every incoming request
- \`server.listen(port, callback)\` — starts listening on a port; the optional callback fires once the server is actually ready
- The listener always receives the same two arguments: \`req\` (the incoming request) and \`res\` (the object used to send a response back)
- A running server keeps the Node.js process alive indefinitely, handling requests until it's stopped`,
  longExplanation: `Every Node.js web framework — Express included — is ultimately built on top of one built-in module: \`http\`. Understanding \`http.createServer\` is understanding what's actually happening underneath the more convenient APIs covered later in this subject.

\`http.createServer(requestListener)\` takes a single function and returns a **server object**. That function — often called the *request listener* or *request handler* — is not called immediately. It's stored away and will be called automatically, once for every single request the server ever receives, for as long as the server keeps running. Node always calls it with exactly two arguments: \`req\` (an object describing the incoming request — its method, URL, headers, and body) and \`res\` (an object with methods for sending a response back to whoever made the request). Nothing happens until \`server.listen(port)\` is called — this is what actually opens a network port and starts accepting connections. \`listen\` optionally takes a callback that runs once the server is ready, which is the conventional place to log something like "Server running on port 3000".

A detail worth internalizing: **\`http.createServer(fn)\` is really just shorthand for creating a server and calling \`server.on("request", fn)\` on it.** The server object returned by \`createServer\` is an \`EventEmitter\` (the same pattern covered in the Events & Streams category) — it emits a \`"request"\` event for every incoming connection, and \`createServer\`'s argument is just a convenience for registering the first listener for that event. This is why some real-world code registers the handler separately: \`const server = http.createServer(); server.on("request", (req, res) => { ... });\` — both forms do exactly the same thing.

Once a server is listening, it keeps the Node.js process alive on its own — this is different from a script that runs top-to-bottom and exits. A server's whole job is to sit and wait indefinitely, which is exactly why long-running server processes are typically what gets deployed, rather than a script that finishes and exits.

A few real gotchas worth knowing before writing actual server code:

- **Forgetting to call \`res.end()\`** is one of the most common early mistakes. If the handler never calls \`res.end()\` (directly, or via a higher-level method that calls it internally), the response is never actually sent — the client's request just hangs forever, eventually timing out. Every code path through a request listener needs to eventually end the response, exactly once.
- **\`EADDRINUSE\`**: calling \`listen(port)\` on a port some *other* process already has open throws an error — a very common source of confusion when restarting a dev server too quickly, before the old process has released the port.
- **One handler receives *everything*.** Whether a request is \`GET /\`, \`POST /users\`, or \`DELETE /users/42\`, they all funnel into the exact same request listener function. The handler itself is responsible for looking at \`req.method\` and \`req.url\` to figure out what to actually do — there's no routing built in at all. That manual branching is covered in the next topic, and is exactly the tedious problem that later motivates using a framework like Express.

Since this sandbox runs in a browser with no real network stack, these examples simulate \`http.createServer\` with a hand-built \`createFakeServer\` function: it stores the request listener you provide, and a \`.listen()\` method that just flips an "is listening" flag. Rather than a real TCP connection arriving over the network, a "Send a fake request" button calls a \`simulateRequest\` method that builds a plain \`req\`/\`res\` object and calls your listener directly — but the listener itself, and everything it does with \`req\` and \`res\`, is written exactly the way it would be against Node's real \`http\` module.`,
  examples: [
    {
      id: "create-server-and-listen",
      title: "Creating and starting a fake HTTP server",
      summary: "http.createServer(fn) plus server.listen(port) — the two calls every Node server starts with.",
      code: `function createFakeRes() {
  return {
    statusCode: 200,
    headers: {},
    body: "",
    ended: false,
    writeHead(code, headers) {
      this.statusCode = code;
      if (headers) Object.assign(this.headers, headers);
      return this;
    },
    end(chunk) {
      if (chunk !== undefined) this.body += chunk;
      this.ended = true;
      return this;
    },
  };
}

function createFakeServer(requestListener) {
  let listening = false;
  let port = null;
  return {
    listen(p, callback) {
      port = p;
      listening = true;
      if (callback) callback();
      return this;
    },
    isListening() {
      return listening;
    },
    getPort() {
      return port;
    },
    // Stands in for a real TCP connection arriving over the network:
    simulateRequest(req) {
      const res = createFakeRes();
      requestListener(req, res);
      return res;
    },
  };
}

function App() {
  const [log, setLog] = useState([]);
  const [started, setStarted] = useState(false);
  const [server] = useState(() =>
    createFakeServer((req, res) => {
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("Hello from the server!");
    })
  );

  function print(value) {
    setLog((prev) => [...prev, value]);
  }

  function start() {
    server.listen(3000, () => {
      setStarted(true);
      print("Server listening on port " + server.getPort());
    });
  }

  function sendRequest() {
    const res = server.simulateRequest({ method: "GET", url: "/" });
    print("-> responded " + res.statusCode + ": \\"" + res.body + "\\"");
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={start} disabled={started}>http.createServer(fn).listen(3000)</button>
        <button onClick={sendRequest} disabled={!started}>Send a fake request</button>
      </div>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 90 }}>
        {log.length === 0 ? "// output appears here" : log.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "server-is-an-event-emitter",
      title: "The server object is an EventEmitter",
      summary: "server.on(\"request\", fn) does exactly the same thing as passing fn to createServer.",
      code: `function createFakeRes() {
  return {
    statusCode: 200,
    body: "",
    end(chunk) {
      if (chunk !== undefined) this.body += chunk;
      return this;
    },
  };
}

function createFakeServer() {
  let requestListener = null;
  return {
    on(eventName, callback) {
      if (eventName === "request") requestListener = callback;
      return this;
    },
    listen(port, callback) {
      if (callback) callback();
      return this;
    },
    simulateRequest(req) {
      const res = createFakeRes();
      if (requestListener) requestListener(req, res);
      return res;
    },
  };
}

function App() {
  const [output, setOutput] = useState("");
  const [server] = useState(() => createFakeServer());

  function wireUp() {
    // Equivalent to passing this same function into http.createServer(...):
    server.on("request", (req, res) => {
      res.end("Handled via server.on(\\"request\\", ...)");
    });
    server.listen(3000);
    setOutput("Listener registered with .on(\\"request\\", ...) — try sending a request.");
  }

  function sendRequest() {
    const res = server.simulateRequest({ method: "GET", url: "/" });
    setOutput("Response body: " + res.body);
  }

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={wireUp}>server.on("request", fn)</button>
        <button onClick={sendRequest}>Send a fake request</button>
      </div>
      <p>{output || "// output appears here"}</p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "multiple-requests-over-time",
      title: "One server, many requests over time",
      summary: "The same listener runs fresh, from scratch, for every single request the server receives.",
      code: `function createFakeRes() {
  return {
    statusCode: 200,
    body: "",
    end(chunk) {
      if (chunk !== undefined) this.body += chunk;
      return this;
    },
  };
}

let requestCount = 0;

function createFakeServer(requestListener) {
  return {
    listen(port, callback) {
      if (callback) callback();
      return this;
    },
    simulateRequest(req) {
      const res = createFakeRes();
      requestListener(req, res);
      return res;
    },
  };
}

function App() {
  const [log, setLog] = useState([]);
  const [server] = useState(() =>
    createFakeServer((req, res) => {
      requestCount = requestCount + 1;
      res.end("This is request #" + requestCount + " (" + req.method + " " + req.url + ")");
    })
  );

  function print(value) {
    setLog((prev) => [...prev, value]);
  }

  function sendRequest(method, url) {
    const res = server.simulateRequest({ method, url });
    print(res.body);
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <button onClick={() => sendRequest("GET", "/")}>GET /</button>
        <button onClick={() => sendRequest("GET", "/about")}>GET /about</button>
        <button onClick={() => sendRequest("POST", "/login")}>POST /login</button>
      </div>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 90 }}>
        {log.length === 0 ? "// send a few requests to see each one handled independently" : log.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "gotcha-forgetting-res-end",
      title: "Gotcha: forgetting res.end() leaves the request hanging",
      summary: "A handler that never ends the response never actually sends anything back — the request just hangs.",
      code: `function createFakeRes(onEnd) {
  return {
    body: "",
    ended: false,
    write(chunk) {
      this.body += chunk;
      return this;
    },
    end(chunk) {
      if (chunk !== undefined) this.body += chunk;
      this.ended = true;
      onEnd(this);
      return this;
    },
  };
}

function brokenHandler(req, res) {
  res.write("Preparing response...");
  // Bug: res.end() is never called! The client waits forever.
}

function fixedHandler(req, res) {
  res.write("Preparing response...");
  res.end(" done.");
}

function App() {
  const [status, setStatus] = useState("");

  function tryHandler(handler) {
    setStatus("Sending request...");
    let finished = false;
    const res = createFakeRes(() => {
      finished = true;
      setStatus("Response completed: \\"" + res.body + "\\"");
    });
    handler({ method: "GET", url: "/" }, res);

    // Simulate the client eventually giving up if end() never arrives:
    setTimeout(() => {
      if (!finished) {
        setStatus("Timed out! res.end() was never called — the response body so far was: \\"" + res.body + "\\"");
      }
    }, 1200);
  }

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={() => tryHandler(brokenHandler)}>Send request to broken handler</button>
        <button onClick={() => tryHandler(fixedHandler)}>Send request to fixed handler</button>
      </div>
      <p>{status || "// output appears here"}</p>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
