import type { Topic } from "../../types";

export const nodeExpressIntroTopic: Topic = {
  id: "node-express-intro",
  title: "Introduction to Express",
  category: "Express.js",
  shortExplanation: `**Express** is a minimal, unopinionated web framework that sits directly on top of Node's built-in \`http\` module — it doesn't replace \`http\`, it wraps it with far more convenient APIs for routing, middleware, and sending responses.

- Install it as a regular npm package: \`npm install express\` — unlike \`http\`, Express is not built into Node itself
- \`const app = express();\` creates an *application object*, the central object every Express app is built around
- \`app.get(path, handler)\`, \`app.post(path, handler)\`, and friends register routes; \`app.listen(port, callback)\` starts the server
- It exists to remove the manual \`req.method\`/\`req.url\` branching, query-string parsing, and body-reading boilerplate that raw \`http\` leaves entirely up to you`,
  longExplanation: `Every topic in the earlier "HTTP & Servers" category was built directly on Node's \`http\` module — and if you worked through those, you likely noticed how much manual bookkeeping a real application needs: checking \`req.method\` and \`req.url\` by hand for every possible route, parsing query strings yourself, reading a request body chunk by chunk before you can even look at it. **Express** is a third-party package — the single most widely used Node.js web framework — built specifically to remove that boilerplate, while staying deliberately close to what \`http\` already gives you.

Unlike \`fs\`, \`http\`, or \`path\`, Express does **not** ship with Node — it's installed like any other dependency: \`npm install express\`. Once installed, \`const express = require("express");\` (or \`import express from "express";\` in ESM-style code) gives you a factory function. Calling it — \`const app = express();\` — returns the **application object**, the central hub every Express app is organized around. Almost everything else in this subject's Express.js category is a method hung off that one \`app\` object.

Two calls make up the entire lifecycle of a minimal Express app:

- **Registering routes**, using methods named after HTTP verbs: \`app.get("/", (req, res) => { res.send("Hello!"); })\` registers a handler that only runs for \`GET\` requests to \`/\`. \`app.post\`, \`app.put\`, \`app.delete\`, and others work the same way for their respective HTTP methods. This is the routing that raw \`http\` forced you to write by hand yourself, now built in.
- **Starting the server**, with \`app.listen(port, callback)\`. Under the hood this is genuinely a convenience wrapper — \`app.listen(3000)\` does almost exactly what \`http.createServer(app).listen(3000)\` would do manually, because the \`app\` object itself is a *function* shaped to be a valid \`http\` request listener. Express is, quite literally, built as a layer on top of \`http.createServer\`, not a replacement for it — a detail worth holding onto as this category goes on to cover routing, middleware, and request/response helpers in more depth.

Express describes itself as **unopinionated**: it doesn't dictate a folder structure, a database, a templating engine, or an authentication strategy. It gives you routing and a middleware pipeline (covered in the next two topics) and leaves the rest of the architecture up to you — part of why it stayed the dominant choice for so long, and also why larger apps often reach for extra conventions or packages on top of it to fill in what it deliberately leaves out.

A couple of things worth knowing before writing real Express code: forgetting to call \`app.listen(...)\` at all means the app object exists but nothing is ever actually serving requests — no error, just silence. And running two processes that both try to \`listen\` on the same port throws the same \`EADDRINUSE\` error covered back in the raw \`http\` topics, since underneath it's the exact same port-binding mechanism.

**This sandbox cannot install or import the real \`express\` package** — it's a Node-only dependency, and this environment has no real network layer to serve requests over anyway. This is a hand-built simulation standing in for the real \`express\` package: every example below builds a small \`createFakeApp()\` function whose methods are named and shaped exactly like real Express's — \`.get\`, \`.post\`, \`.listen\` — so the calls you make here read identically to real Express code. A \`simulateRequest(method, url)\` method stands in for an actual browser or \`curl\` request arriving over the network; it is **not** part of Express's real API, only a way to drive the demo without one.`,
  examples: [
    {
      id: "create-app-and-listen",
      title: "const app = express(); app.listen(port)",
      summary: "The two calls that start every Express app, built as a small fake app object.",
      code: `function createFakeApp() {
  const routes = [];
  let listening = false;
  let port = null;

  const app = {
    get(path, handler) {
      routes.push({ method: "GET", path, handler });
      return app;
    },
    listen(p, callback) {
      port = p;
      listening = true;
      if (callback) callback();
      return app;
    },
    isListening() {
      return listening;
    },
    getPort() {
      return port;
    },
    // Stands in for a real request arriving over the network (a browser,
    // curl, fetch). Not part of Express's real API -- only a demo helper.
    simulateRequest(method, url) {
      if (!listening) {
        return { statusCode: 0, body: "Error: connect ECONNREFUSED (app is not listening yet)" };
      }
      const match = routes.find(function (route) {
        return route.method === method && route.path === url;
      });
      let statusCode = 200;
      let body = null;
      const res = {
        send(text) {
          statusCode = statusCode || 200;
          body = text;
          return res;
        },
      };
      if (match) {
        match.handler({ method, url }, res);
      } else {
        statusCode = 404;
        body = "Cannot " + method + " " + url;
      }
      return { statusCode, body };
    },
  };

  return app;
}

function App() {
  const [log, setLog] = useState([]);
  const [app] = useState(function () {
    return createFakeApp();
  });
  const [started, setStarted] = useState(false);

  function print(value) {
    setLog(function (prev) {
      return [...prev, value];
    });
  }

  function start() {
    app.get("/", function (req, res) {
      res.send("Hello from Express!");
    });
    app.listen(3000, function () {
      setStarted(true);
      print("app.listen(3000) -> listening on port " + app.getPort());
    });
  }

  function sendRequest() {
    const result = app.simulateRequest("GET", "/");
    print("GET / -> " + result.statusCode + " " + JSON.stringify(result.body));
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <button onClick={start} disabled={started}>Create app + app.listen(3000)</button>
        <button onClick={sendRequest} disabled={!started}>Send a fake GET / request</button>
      </div>
      <div style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 80, fontFamily: "monospace", fontSize: 13, display: "grid", gap: 4 }}>
        {log.length === 0
          ? "// output appears here"
          : log.map(function (line, i) {
              return <div key={i}>{line}</div>;
            })}
      </div>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "app-is-a-request-listener",
      title: "The app object is really just an http request listener",
      summary: "app.listen(port) is sugar for handing app to http.createServer -- shown by wiring it up manually.",
      code: `function createFakeApp() {
  const routes = [];

  function app(req, res) {
    const match = routes.find(function (route) {
      return route.method === req.method && route.path === req.url;
    });
    if (match) {
      match.handler(req, res);
    } else {
      res.status(404).send("Cannot " + req.method + " " + req.url);
    }
  }

  app.get = function (path, handler) {
    routes.push({ method: "GET", path, handler });
    return app;
  };

  return app;
}

// Standing in for Node's real http.createServer + server.listen:
function createFakeHttpServer(requestListener) {
  let listening = false;
  return {
    listen(port, callback) {
      listening = true;
      if (callback) callback();
      return this;
    },
    simulateRequest(req) {
      let statusCode = 200;
      let body = null;
      const res = {
        status(code) {
          statusCode = code;
          return res;
        },
        send(text) {
          body = text;
          return res;
        },
      };
      requestListener(req, res);
      return { statusCode, body };
    },
  };
}

function App() {
  const [log, setLog] = useState([]);
  const [server] = useState(function () {
    const app = createFakeApp();
    app.get("/", function (req, res) {
      res.status(200).send("Hello via http.createServer(app)!");
    });
    // This is exactly what app.listen(port) does internally in real Express:
    return createFakeHttpServer(app);
  });

  function print(value) {
    setLog(function (prev) {
      return [...prev, value];
    });
  }

  function start() {
    server.listen(3000, function () {
      print("http.createServer(app).listen(3000) -- ready");
    });
  }

  function sendRequest() {
    const result = server.simulateRequest({ method: "GET", url: "/" });
    print("GET / -> " + result.statusCode + " " + JSON.stringify(result.body));
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <button onClick={start}>Start via http.createServer(app)</button>
        <button onClick={sendRequest}>Send a fake GET / request</button>
      </div>
      <div style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 80, fontFamily: "monospace", fontSize: 13, display: "grid", gap: 4 }}>
        {log.length === 0
          ? "// output appears here"
          : log.map(function (line, i) {
              return <div key={i}>{line}</div>;
            })}
      </div>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        In real Express, app.listen(3000) does this exact wiring for you automatically.
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "multiple-routes-dispatch",
      title: "Multiple routes on one app",
      summary: "Several app.get()/app.post() calls -- one dispatch mechanism decides which handler runs.",
      code: `function createFakeApp() {
  const routes = [];
  let listening = false;

  const app = {
    get(path, handler) {
      routes.push({ method: "GET", path, handler });
      return app;
    },
    post(path, handler) {
      routes.push({ method: "POST", path, handler });
      return app;
    },
    listen(port, callback) {
      listening = true;
      if (callback) callback();
      return app;
    },
    simulateRequest(method, url) {
      if (!listening) return { statusCode: 0, body: "Not listening yet" };
      const match = routes.find(function (route) {
        return route.method === method && route.path === url;
      });
      let statusCode = 200;
      let body = null;
      const res = {
        send(text) {
          body = text;
          return res;
        },
      };
      if (match) {
        match.handler({ method, url }, res);
      } else {
        statusCode = 404;
        body = "Cannot " + method + " " + url;
      }
      return { statusCode, body };
    },
  };

  return app;
}

function App() {
  const [log, setLog] = useState([]);
  const [app] = useState(function () {
    const a = createFakeApp();
    a.get("/", function (req, res) {
      res.send("Home page");
    });
    a.get("/about", function (req, res) {
      res.send("About page");
    });
    a.post("/login", function (req, res) {
      res.send("Login handled");
    });
    a.listen(3000);
    return a;
  });

  function print(value) {
    setLog(function (prev) {
      return [...prev, value];
    });
  }

  function send(method, url) {
    const result = app.simulateRequest(method, url);
    print(method + " " + url + " -> " + result.statusCode + " " + JSON.stringify(result.body));
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <button onClick={function () { send("GET", "/"); }}>GET /</button>
        <button onClick={function () { send("GET", "/about"); }}>GET /about</button>
        <button onClick={function () { send("POST", "/login"); }}>POST /login</button>
        <button onClick={function () { send("DELETE", "/nope"); }}>DELETE /nope</button>
      </div>
      <div style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 100, fontFamily: "monospace", fontSize: 13, display: "grid", gap: 4 }}>
        {log.length === 0
          ? "// send a few requests to see routing dispatch a matching handler"
          : log.map(function (line, i) {
              return <div key={i}>{line}</div>;
            })}
      </div>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "gotcha-forgetting-listen",
      title: "Gotcha: forgetting to call app.listen()",
      summary: "Routes are registered fine, but with no listen() call the app never actually serves anything.",
      code: `function createFakeApp() {
  const routes = [];
  let listening = false;

  const app = {
    get(path, handler) {
      routes.push({ method: "GET", path, handler });
      return app;
    },
    listen(port, callback) {
      listening = true;
      if (callback) callback();
      return app;
    },
    simulateRequest(method, url) {
      if (!listening) {
        return { statusCode: 0, body: "Error: connect ECONNREFUSED -- app.listen() was never called" };
      }
      const match = routes.find(function (route) {
        return route.method === method && route.path === url;
      });
      let statusCode = 200;
      let body = null;
      const res = {
        send(text) {
          body = text;
          return res;
        },
      };
      if (match) {
        match.handler({ method, url }, res);
      } else {
        statusCode = 404;
        body = "Cannot " + method + " " + url;
      }
      return { statusCode, body };
    },
  };

  return app;
}

function App() {
  const [output, setOutput] = useState("");
  const [app] = useState(function () {
    const a = createFakeApp();
    a.get("/", function (req, res) {
      res.send("Hello!");
    });
    // Notice: a.listen(3000) is never called below.
    return a;
  });

  function tryRequest() {
    const result = app.simulateRequest("GET", "/");
    setOutput("GET / -> " + result.statusCode + " " + JSON.stringify(result.body));
  }

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <button onClick={tryRequest}>Send a fake GET / request (app.listen was never called)</button>
      <p>{output || "// output appears here"}</p>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        The route exists and would work fine -- but the app was never told to start accepting requests.
      </p>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
