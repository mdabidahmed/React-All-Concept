import type { Topic } from "../../types";

export const nodeExpressErrorHandlingTopic: Topic = {
  id: "node-express-error-handling",
  title: "Error-Handling Middleware in Express",
  category: "Express.js",
  shortExplanation: `Express has a special kind of middleware just for errors — it's recognized purely by having **four** parameters instead of three: \`(err, req, res, next)\` rather than \`(req, res, next)\`.

- Calling \`next(err)\` anywhere in a route handler or regular middleware skips every remaining regular middleware and route, and jumps straight to the nearest error-handling middleware
- Centralizing error responses in one \`app.use((err, req, res, next) => { ... })\` avoids repeating the same try/catch-and-format logic in every single route
- **Gotcha**: in Express 4 and earlier, an error thrown inside an \`async\` route handler *after* an \`await\` is **not** automatically caught — it needs an explicit \`try\`/\`catch\` that calls \`next(err)\` itself (Express 5 fixes this by catching rejected promises from async handlers automatically)`,
  longExplanation: `Express recognizes error-handling middleware through a slightly unusual mechanism: **it counts the function's declared parameters.** A function with three parameters, \`(req, res, next)\`, is treated as regular middleware. A function with exactly **four**, \`(err, req, res, next)\`, is treated as an error handler — registered the same way, with \`app.use(...)\`, but Express routes control to it completely differently. This isn't a naming convention or a special method — it's genuinely based on \`function.length\`, which is why an error-handling middleware must declare all four parameters even if, say, \`next\` is never actually called inside it: dropping to three parameters (even by removing an unused one) silently turns it back into regular middleware, and Express will never route errors to it.

**\`next(err)\`** is how control gets there. Calling \`next()\` with no argument (as covered in the earlier middleware topic) means "continue to whatever's next in line." Calling it *with* an argument — \`next(err)\` — means something different: "something went wrong; skip every remaining regular middleware and route handler, and jump straight to the nearest error-handling middleware instead." This is exactly how an individual route reports a failure to a shared, centralized handler, rather than building its own error response inline.

The real value here is **centralization**. Without this pattern, every single route handler that might fail would need its own repeated try/catch, each one formatting an error response by hand — inconsistent status codes, inconsistent JSON shapes, and a lot of duplicated logic. With one error-handling middleware registered near the end of the app (after all the routes), every route can instead just call \`next(err)\` (or, for synchronous code, simply \`throw\`) and let that one function decide the status code, the response shape, whether to log the error, and whether to hide internal details from the client — all in exactly one place. Real Express apps commonly build custom error classes (a \`NotFoundError\` carrying \`statusCode: 404\`, a \`ValidationError\` carrying \`statusCode: 400\`) so the centralized handler can pick an appropriate status just by reading \`err.statusCode\`, falling back to \`500\` for anything unexpected.

If no custom error-handling middleware is registered at all, Express doesn't crash — it falls back to its own **built-in default error handler**, which sends a generic \`500\` response. That default exists as a safety net, but it's rarely what you actually want in a real API: a generic, unstructured error page or plain-text response instead of a consistent JSON error shape your client code can rely on.

**The async gotcha is a genuinely common, easy-to-miss bug.** Express 4's automatic error catching only covers errors thrown *synchronously* inside a route handler — if a plain (non-\`async\`) handler throws directly, Express catches it and routes it to error-handling middleware for you, no \`try\`/\`catch\` needed. But an \`async\` route handler that throws *after* an \`await\` doesn't throw synchronously at all — it returns a rejected **Promise**, and in Express 4, nothing is watching that Promise. The rejection goes completely unhandled: no error response is ever sent, the client hangs, and (depending on the environment) an "unhandled promise rejection" warning is all that surfaces. The standard fix is either an explicit \`try { await something(); } catch (err) { next(err); }\` inside every async handler, or a small wrapper utility (real-world packages like \`express-async-handler\` do exactly this) that does \`Promise.resolve(handler(req, res, next)).catch(next)\` for you. **Express 5** changed this: route handlers that return a rejected Promise are now caught automatically, without needing the wrapper — worth knowing which major version a real project is on before assuming either behavior.

**This is a hand-built simulation standing in for the real \`express\` package.** The examples below implement Express's actual arity-based dispatch (checking \`fn.length === 4\`) and a genuinely-working \`next(err)\` chain, so the calling patterns here map directly onto real Express error handling.`,
  examples: [
    {
      id: "basic-error-middleware",
      title: "Registering error-handling middleware with 4 parameters",
      summary: "app.use((err, req, res, next) => {...}) -- Express recognizes it by its parameter count.",
      code: `function createFakeApp() {
  const middlewares = [];
  const routes = [];

  const app = {
    use(fn) {
      middlewares.push(fn);
      return app;
    },
    get(path, handler) {
      routes.push({ path, handler });
      return app;
    },
    simulateRequest(url) {
      const req = { url };
      let statusCode = 200;
      let body = null;
      const res = {
        status(code) {
          statusCode = code;
          return res;
        },
        json(data) {
          body = data;
          return res;
        },
      };

      // Express tells regular middleware (req, res, next) apart from
      // error-handling middleware (err, req, res, next) purely by counting
      // each function's declared parameters.
      const errorHandlers = middlewares.filter(function (fn) {
        return fn.length === 4;
      });

      function handleError(err) {
        let index = -1;
        function nextError(e) {
          index = index + 1;
          if (index < errorHandlers.length) {
            errorHandlers[index](e, req, res, nextError);
          } else {
            statusCode = 500;
            body = { error: "Internal Server Error (default handler)" };
          }
        }
        nextError(err);
      }

      const match = routes.find(function (r) {
        return r.path === url;
      });
      if (!match) {
        statusCode = 404;
        body = { error: "Cannot GET " + url };
        return { statusCode, body };
      }
      try {
        match.handler(req, res, function next(err) {
          if (err) handleError(err);
        });
      } catch (thrown) {
        handleError(thrown);
      }
      return { statusCode, body };
    },
  };
  return app;
}

const app = createFakeApp();

app.get("/orders/9", function (req, res) {
  throw new Error("Database connection lost");
});

// Error-handling middleware: exactly four parameters, always (err, req, res, next).
app.use(function (err, req, res, next) {
  res.status(500).json({ error: "Something broke: " + err.message });
});

function App() {
  const [output, setOutput] = useState("");

  function run() {
    const result = app.simulateRequest("/orders/9");
    setOutput(result.statusCode + " " + JSON.stringify(result.body));
  }

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <button onClick={run}>GET /orders/9 (handler throws synchronously)</button>
      <p>{output || "// output appears here"}</p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "centralizing-error-responses",
      title: "Centralizing error responses across multiple routes",
      summary: "Different routes call next(err) with different error types -- one handler formats all of them.",
      code: `function createFakeApp() {
  const middlewares = [];
  const routes = [];

  const app = {
    use(fn) {
      middlewares.push(fn);
      return app;
    },
    get(path, handler) {
      routes.push({ path, handler });
      return app;
    },
    simulateRequest(url) {
      const req = { url };
      let statusCode = 200;
      let body = null;
      const res = {
        status(code) {
          statusCode = code;
          return res;
        },
        json(data) {
          body = data;
          return res;
        },
      };

      const errorHandlers = middlewares.filter(function (fn) {
        return fn.length === 4;
      });

      function handleError(err) {
        let index = -1;
        function nextError(e) {
          index = index + 1;
          if (index < errorHandlers.length) {
            errorHandlers[index](e, req, res, nextError);
          } else {
            statusCode = 500;
            body = { error: "Internal Server Error" };
          }
        }
        nextError(err);
      }

      const match = routes.find(function (r) {
        return r.path === url;
      });
      if (!match) {
        statusCode = 404;
        body = { error: "Cannot GET " + url };
        return { statusCode, body };
      }
      try {
        match.handler(req, res, function next(err) {
          if (err) handleError(err);
        });
      } catch (thrown) {
        handleError(thrown);
      }
      return { statusCode, body };
    },
  };
  return app;
}

function NotFoundError(message) {
  this.name = "NotFoundError";
  this.message = message;
  this.statusCode = 404;
}
NotFoundError.prototype = Object.create(Error.prototype);

function ValidationError(message) {
  this.name = "ValidationError";
  this.message = message;
  this.statusCode = 400;
}
ValidationError.prototype = Object.create(Error.prototype);

const app = createFakeApp();

app.get("/users/1", function (req, res, next) {
  next(new NotFoundError("User 1 does not exist"));
});
app.get("/users/bad-input", function (req, res, next) {
  next(new ValidationError("Invalid user id format"));
});

// ONE centralized place decides how every error becomes a response,
// instead of every route repeating its own try/catch formatting logic.
app.use(function (err, req, res, next) {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({ error: err.message, type: err.name || "Error" });
});

function App() {
  const [output, setOutput] = useState("");

  function run(url) {
    const result = app.simulateRequest(url);
    setOutput(result.statusCode + " " + JSON.stringify(result.body));
  }

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <button onClick={function () { run("/users/1"); }}>GET /users/1 (next(NotFoundError))</button>
        <button onClick={function () { run("/users/bad-input"); }}>GET /users/bad-input (next(ValidationError))</button>
      </div>
      <p>{output || "// output appears here"}</p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "async-handler-gotcha",
      title: "Gotcha: an error thrown inside an async handler after an await",
      summary: "An unwrapped async handler's rejection never reaches next(err) in Express 4 -- a wrapper fixes it.",
      code: `function asyncHandler(fn) {
  return function (req, res, next) {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

async function riskyHandler(req, res) {
  await new Promise(function (resolve) {
    setTimeout(resolve, 300);
  });
  throw new Error("Failed to fetch data from the database");
}

function runRoute(handler, onResult) {
  let resolved = false;
  const res = {
    statusCode: 200,
    status(code) {
      res.statusCode = code;
      return res;
    },
    json(data) {
      resolved = true;
      onResult({ statusCode: res.statusCode, body: data });
      return res;
    },
  };
  function next(err) {
    if (err) {
      resolved = true;
      onResult({ statusCode: 500, body: { error: err.message } });
    }
  }
  try {
    handler({}, res, next);
  } catch (thrown) {
    next(thrown);
  }
  return function isStillPending() {
    return !resolved;
  };
}

function App() {
  const [unsafeStatus, setUnsafeStatus] = useState("");
  const [safeStatus, setSafeStatus] = useState("");

  function tryUnsafe() {
    setUnsafeStatus("Sending request through the UNWRAPPED async handler...");
    const isStillPending = runRoute(riskyHandler, function (result) {
      setUnsafeStatus("Reached next(err): " + JSON.stringify(result));
    });
    setTimeout(function () {
      if (isStillPending()) {
        setUnsafeStatus(
          "Still pending after 600ms -- Express's error handling was never reached. The thrown error became an unhandled promise rejection instead: the client just hangs."
        );
      }
    }, 600);
  }

  function trySafe() {
    setSafeStatus("Sending request through the asyncHandler-WRAPPED handler...");
    runRoute(asyncHandler(riskyHandler), function (result) {
      setSafeStatus("Reached next(err): " + JSON.stringify(result));
    });
  }

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <button onClick={tryUnsafe}>app.get("/data", riskyHandler) -- unwrapped</button>
        <button onClick={trySafe}>app.get("/data", asyncHandler(riskyHandler)) -- wrapped</button>
      </div>
      <p>Unwrapped: {unsafeStatus || "-- click, then wait a moment --"}</p>
      <p>Wrapped: {safeStatus || "-- click, then wait a moment --"}</p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "default-error-handler",
      title: "Express's built-in default error handler",
      summary: "With no custom error middleware registered at all, Express still falls back to a generic 500.",
      code: `function createFakeApp() {
  const routes = [];
  const app = {
    get(path, handler) {
      routes.push({ path, handler });
      return app;
    },
    simulateRequest(url) {
      const match = routes.find(function (r) {
        return r.path === url;
      });
      let statusCode = 200;
      let body = null;
      const res = {
        status(code) {
          statusCode = code;
          return res;
        },
        json(data) {
          body = data;
          return res;
        },
      };
      function next(err) {
        if (err) {
          // No custom error-handling middleware was registered at all --
          // Express's own built-in default error handler takes over.
          statusCode = 500;
          body = { error: "Internal Server Error" };
        }
      }
      if (match) {
        try {
          match.handler({ url }, res, next);
        } catch (thrown) {
          next(thrown);
        }
      } else {
        statusCode = 404;
        body = { error: "Cannot GET " + url };
      }
      return { statusCode, body };
    },
  };
  return app;
}

const app = createFakeApp();
app.get("/crash", function (req, res) {
  throw new Error("Unexpected failure, no custom handler registered");
});

function App() {
  const [output, setOutput] = useState("");

  function run() {
    const result = app.simulateRequest("/crash");
    setOutput(result.statusCode + " " + JSON.stringify(result.body));
  }

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <button onClick={run}>GET /crash (no custom error-handling middleware registered)</button>
      <p>{output || "// output appears here"}</p>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        Real Express behaves the same way: with no custom error-handling middleware, its built-in default handler sends a generic 500 response.
      </p>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
