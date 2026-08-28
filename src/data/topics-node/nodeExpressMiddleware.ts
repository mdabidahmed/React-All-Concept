import type { Topic } from "../../types";

export const nodeExpressMiddlewareTopic: Topic = {
  id: "node-express-middleware",
  title: "Middleware in Express",
  category: "Express.js",
  shortExplanation: `**Middleware** is a function with the signature \`(req, res, next)\` that runs *before* a route's final handler — it can inspect or modify \`req\`/\`res\`, and must call \`next()\` to pass control along to whatever comes after it.

- \`app.use(middlewareFn)\` registers middleware that runs for *every* incoming request, before routing even happens
- A middleware function can also **short-circuit** the chain — sending a response itself (\`res.status(401).json(...)\`) and simply *not* calling \`next()\`, so nothing after it ever runs
- Middleware runs in the exact order it was registered — a logging middleware, then an auth check, then the actual route handler, for example
- Forgetting to call \`next()\` (when you meant to continue) is the middleware equivalent of forgetting \`res.end()\` — the request just hangs, unanswered, forever`,
  longExplanation: `Middleware is arguably Express's single most important idea — more so than routing itself. A **middleware function** has the exact signature \`(req, res, next)\`, and it sits in a *chain* that every matching request passes through, one function at a time, before finally reaching whichever route handler is meant to actually respond.

The key to the whole mechanism is the third argument, \`next\`. Calling \`next()\` tells Express "I'm done with this request for now — hand it to the next function in the chain." Middleware can do useful work on the way through — read a header, log something, attach a piece of data onto \`req\` for later handlers to use, verify a permission — and then call \`next()\` to let processing continue. Critically, **if a middleware function never calls \`next()\` and never sends a response, the request simply hangs** — the exact same category of bug as forgetting \`res.end()\` in raw \`http\`, just one level up the stack.

**\`app.use(middlewareFn)\`** registers a middleware function to run for every request, regardless of path or method, before Express even tries to match a route. This is where you'd register things like request logging, authentication checks, or body-parsing (\`app.use(express.json())\`, covered from the reader's side in the next topic) — cross-cutting concerns that apply to the whole app rather than one specific route.

Middleware doesn't have to call \`next()\` at all — it can instead **short-circuit** the chain by sending a response itself. This is exactly how an authentication check typically works: if a request is missing valid credentials, the middleware calls \`res.status(401).json({ error: "Unauthorized" })\` and simply returns, *without* calling \`next()\`. Whatever route handler would have run next never runs — the middleware effectively intercepted the request. If credentials check out, the middleware calls \`next()\` and the request proceeds normally, none the wiser.

Middleware isn't only global — it can also be scoped to one specific route by listing it as an extra argument before the final handler: \`app.get("/admin", requireAuth, (req, res) => { ... })\`. Express calls \`requireAuth\` first, and only reaches the final handler if \`requireAuth\` calls \`next()\`. Any number of middleware functions can be chained this way for a single route, and they run left to right, in the order listed.

**Order matters, everywhere.** Both globally (\`app.use\` calls run in registration order) and per-route (extra handler arguments run in listed order), Express walks the chain top to bottom. A logging middleware registered *after* an auth check that short-circuits will simply never run for rejected requests — which is sometimes exactly what you want, and sometimes a bug, depending on whether you wanted *every* request logged or only the ones that got through.

A gotcha worth internalizing early: calling \`next()\` **and then also** sending a response yourself (or vice versa) usually produces the real Express error \`"Cannot set headers after they are sent"\` — once a response is sent, nothing downstream should try to send another one. Middleware should do exactly one of: call \`next()\` to continue, or send a response to stop — never both.

**This is a hand-built simulation standing in for the real \`express\` package.** The \`createFakeApp()\` in the examples below implements a genuinely-working middleware chain: an array of registered functions, walked one at a time by a real \`next()\` function, with a matched route's handler appended at the very end of the chain — mirroring exactly how real Express resolves \`app.use\` and per-route middleware before finally reaching a route's handler.`,
  examples: [
    {
      id: "logging-middleware",
      title: "A logging middleware with app.use()",
      summary: "A global middleware runs for every request, before the matching route handler.",
      code: `function createFakeApp() {
  const middlewares = [];
  const routes = [];

  function runChain(req, res, handlers, onDone) {
    let index = -1;
    function next() {
      index = index + 1;
      if (index < handlers.length) {
        handlers[index](req, res, next);
      } else {
        onDone();
      }
    }
    next();
  }

  const app = {
    use(fn) {
      middlewares.push(fn);
      return app;
    },
    get(path, handler) {
      routes.push({ path, handler });
      return app;
    },
    simulateRequest(method, url) {
      const req = { method, url };
      let statusCode = 200;
      let body = null;
      const res = {
        send(text) {
          body = text;
          return res;
        },
      };
      const match = routes.find(function (r) {
        return r.path === url;
      });
      const chain = middlewares.concat(match ? [match.handler] : []);
      runChain(req, res, chain, function () {
        if (!match) {
          statusCode = 404;
          body = "Cannot " + method + " " + url;
        }
      });
      return { statusCode, body };
    },
  };
  return app;
}

function App() {
  const [log, setLog] = useState([]);

  function print(value) {
    setLog(function (prev) {
      return [...prev, value];
    });
  }

  const [app] = useState(function () {
    const a = createFakeApp();
    a.use(function (req, res, next) {
      print("LOG: " + req.method + " " + req.url);
      next();
    });
    a.get("/", function (req, res) {
      res.send("Home page");
    });
    return a;
  });

  function visit() {
    const result = app.simulateRequest("GET", "/");
    print("Response: " + result.statusCode + " " + JSON.stringify(result.body));
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={visit}>Send GET /</button>
      <div style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 90, fontFamily: "monospace", fontSize: 13, display: "grid", gap: 4 }}>
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
      id: "auth-middleware-short-circuit",
      title: "An auth middleware that can short-circuit the chain",
      summary: "Missing credentials -> the middleware responds itself and never calls next().",
      code: `function createFakeApp() {
  const middlewares = [];
  const routes = [];

  function runChain(req, res, handlers, onDone) {
    let index = -1;
    function next() {
      if (res.sent) return;
      index = index + 1;
      if (index < handlers.length) {
        handlers[index](req, res, next);
      } else {
        onDone();
      }
    }
    next();
  }

  const app = {
    use(fn) {
      middlewares.push(fn);
      return app;
    },
    get(path, handler) {
      routes.push({ path, handler });
      return app;
    },
    simulateRequest(method, url, headers) {
      const req = { method, url, headers: headers || {} };
      let statusCode = 200;
      let body = null;
      const res = {
        sent: false,
        status(code) {
          statusCode = code;
          return res;
        },
        json(data) {
          body = data;
          res.sent = true;
          return res;
        },
      };
      const match = routes.find(function (r) {
        return r.path === url;
      });
      const chain = middlewares.concat(match ? [match.handler] : []);
      runChain(req, res, chain, function () {
        if (!res.sent && !match) {
          statusCode = 404;
          body = { error: "Cannot " + method + " " + url };
        }
      });
      return { statusCode, body };
    },
  };
  return app;
}

function requireAuth(req, res, next) {
  if (!req.headers.authorization) {
    res.status(401).json({ error: "Unauthorized -- missing token" });
    return; // next() is deliberately NOT called: the chain stops here
  }
  next();
}

function App() {
  const [output, setOutput] = useState("");
  const [app] = useState(function () {
    const a = createFakeApp();
    a.use(requireAuth);
    a.get("/dashboard", function (req, res) {
      res.status(200).json({ message: "Welcome to your dashboard" });
    });
    return a;
  });

  function visit(headers) {
    const result = app.simulateRequest("GET", "/dashboard", headers);
    setOutput(result.statusCode + " " + JSON.stringify(result.body));
  }

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <button onClick={function () { visit({}); }}>Send request with no token</button>
        <button onClick={function () { visit({ authorization: "Bearer abc123" }); }}>Send request with a token</button>
      </div>
      <p>{output || "// output appears here"}</p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "gotcha-forgetting-next",
      title: "Gotcha: a middleware that forgets to call next()",
      summary: "Just like forgetting res.end() in raw http, the request never resolves -- it just hangs.",
      code: `function createFakeApp() {
  const middlewares = [];

  const app = {
    use(fn) {
      middlewares.push(fn);
      return app;
    },
    simulateRequest(method, url, onFinished) {
      const req = { method, url };
      let finished = false;
      const res = {
        send(text) {
          finished = true;
          onFinished("Response sent: " + text);
        },
      };
      let index = -1;
      function next() {
        index = index + 1;
        if (index < middlewares.length) {
          middlewares[index](req, res, next);
        } else {
          finished = true;
          onFinished("Reached the end with no handler to respond.");
        }
      }
      next();
      return function checkStillPending() {
        return !finished;
      };
    },
  };
  return app;
}

function brokenMiddleware(req, res, next) {
  // Bug: no next() call, and no response sent either.
}

function fixedMiddleware(req, res, next) {
  next();
}

function App() {
  const [status, setStatus] = useState("");

  function tryMiddleware(middleware) {
    setStatus("Sending request...");
    const app = createFakeApp();
    app.use(middleware);
    const checkStillPending = app.simulateRequest("GET", "/", function (result) {
      setStatus(result);
    });
    setTimeout(function () {
      if (checkStillPending()) {
        setStatus("Timed out! The middleware never called next() and never sent a response -- the request is still hanging.");
      }
    }, 1200);
  }

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <button onClick={function () { tryMiddleware(brokenMiddleware); }}>Send request through broken middleware</button>
        <button onClick={function () { tryMiddleware(fixedMiddleware); }}>Send request through fixed middleware</button>
      </div>
      <p>{status || "// output appears here"}</p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "route-specific-middleware",
      title: "Middleware scoped to a single route",
      summary: "app.get(path, middleware, handler) -- extra handlers run only for that one route, in order.",
      code: `function createFakeApp() {
  const middlewares = [];
  const routes = [];

  function runChain(req, res, handlers, onDone) {
    let index = -1;
    function next() {
      index = index + 1;
      if (index < handlers.length) {
        handlers[index](req, res, next);
      } else {
        onDone();
      }
    }
    next();
  }

  const app = {
    use(fn) {
      middlewares.push(fn);
      return app;
    },
    get(path, ...handlers) {
      routes.push({ path, handlers });
      return app;
    },
    simulateRequest(method, url) {
      const req = { method, url, trail: [] };
      let statusCode = 200;
      let body = null;
      const res = {
        send(text) {
          body = text;
          return res;
        },
      };
      const match = routes.find(function (r) {
        return r.path === url;
      });
      const chain = middlewares.concat(match ? match.handlers : []);
      runChain(req, res, chain, function () {
        if (!match) {
          statusCode = 404;
          body = "Cannot " + method + " " + url;
        }
      });
      return { statusCode, body, trail: req.trail };
    },
  };
  return app;
}

function trace(label) {
  return function (req, res, next) {
    req.trail.push(label);
    next();
  };
}

function App() {
  const [publicResult, setPublicResult] = useState(null);
  const [adminResult, setAdminResult] = useState(null);
  const [app] = useState(function () {
    const a = createFakeApp();
    a.use(trace("global logger"));
    a.get("/public", function (req, res) {
      req.trail.push("public handler");
      res.send("Public page. Trail: " + JSON.stringify(req.trail));
    });
    a.get("/admin", trace("requireAuth"), function (req, res) {
      req.trail.push("admin handler");
      res.send("Admin page. Trail: " + JSON.stringify(req.trail));
    });
    return a;
  });

  function visitPublic() {
    setPublicResult(app.simulateRequest("GET", "/public").body);
  }
  function visitAdmin() {
    setAdminResult(app.simulateRequest("GET", "/admin").body);
  }

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <button onClick={visitPublic}>GET /public (no extra middleware)</button>
        <button onClick={visitAdmin}>GET /admin (route-specific middleware)</button>
      </div>
      <p>{publicResult || "-- click above --"}</p>
      <p>{adminResult || "-- click above --"}</p>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
