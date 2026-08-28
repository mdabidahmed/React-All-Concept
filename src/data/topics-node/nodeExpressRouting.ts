import type { Topic } from "../../types";

export const nodeExpressRoutingTopic: Topic = {
  id: "node-express-routing",
  title: "Routing with Express",
  category: "Express.js",
  shortExplanation: `**Routing** is matching an incoming request's HTTP method and URL path to the one handler function that should deal with it — \`app.get(path, handler)\`, \`app.post(path, handler)\`, and the other verb methods each register one such rule.

- A **route parameter** like \`/users/:id\` matches any path in that shape and makes the matched segment available as \`req.params.id\`
- A **query string** like \`?search=foo\` is *not* part of the route pattern at all — it's parsed separately and shows up on \`req.query.search\`
- Routes are checked **in the order they were registered**, and the first match wins — a common gotcha when a dynamic route like \`/users/:id\` is declared before a more specific one like \`/users/new\``,
  longExplanation: `Plain \`http\` gives you only \`req.method\` and \`req.url\` — everything else about "which handler should run for this request" is manual \`if\`/\`else\` branching you write yourself. Express's routing methods (\`app.get\`, \`app.post\`, \`app.put\`, \`app.delete\`, and so on) turn that into a declarative list of rules: for this HTTP method and this URL *pattern*, run this function.

**Route parameters** are the mechanism that makes a pattern match more than one literal URL. Writing \`app.get("/users/:id", (req, res) => { ... })\` doesn't just match the literal path \`/users/:id\` — the leading colon marks \`:id\` as a *placeholder* that matches any single path segment. A request to \`/users/42\` matches, and Express makes the matched value available as \`req.params.id\`, which is \`"42"\` — note that it's always a **string**, even though it looks numeric; converting it with \`Number(req.params.id)\` is your job if you need it as a number. A path can have more than one parameter — \`/users/:userId/posts/:postId\` gives you both \`req.params.userId\` and \`req.params.postId\`.

**Query strings work completely differently**, even though they also look like part of the URL. A request to \`/search?term=cats&sort=newest\` matches the route pattern \`/search\` exactly — the \`?term=cats&sort=newest\` part is never part of the route matching at all. Express parses it separately into \`req.query\`, an object: \`req.query.term\` is \`"cats"\`, \`req.query.sort\` is \`"newest"\`. Like route parameters, query values are always strings (or arrays of strings, for a repeated key) — Express does not guess at numbers, booleans, or other types for you. The rule of thumb: **route parameters identify *which resource*** (which user, which post), while **query strings modify *how to fetch it*** (filtering, sorting, pagination) — that distinction is why \`/users/42\` uses a parameter but \`/products?category=books&page=2\` uses query strings.

**Order matters, and this is a real, common bug.** Express checks routes in the exact order they were registered and stops at the first match. If \`app.get("/users/:id", ...)\` is registered *before* \`app.get("/users/new", ...)\`, then a request to \`/users/new\` matches the \`:id\` pattern first — Express treats \`"new"\` as the value of \`req.params.id\` and the more specific \`/users/new\` handler never runs at all, with no error or warning. The fix is simply to declare more specific, literal routes *before* more general, parameterized ones.

A related detail: Express's own parameter syntax (\`:id\`) is not a regular expression, though Express does support actual regex patterns and wildcards for more advanced matching — those are outside the scope of this introductory topic, and the simple \`:param\` style covers the overwhelming majority of real routes.

**This is a hand-built simulation standing in for the real \`express\` package** — this sandbox has no real network layer and cannot import \`express\` at all. The \`createFakeApp()\` below implements a genuinely-working, simplified version of Express's route matching: it splits a registered pattern and an incoming path into segments, matches literal segments exactly, and captures any \`:name\` segment into \`req.params\`, exactly mirroring how real Express resolves \`req.params\` and \`req.query\` for a matched route.`,
  examples: [
    {
      id: "route-parameters-basic",
      title: "Route parameters: /users/:id",
      summary: "req.params.id holds whatever segment of the URL matched the :id placeholder.",
      code: `function matchPath(pattern, path) {
  const patternParts = pattern.split("/").filter(Boolean);
  const pathParts = path.split("/").filter(Boolean);
  if (patternParts.length !== pathParts.length) return null;
  const params = {};
  for (let i = 0; i < patternParts.length; i++) {
    const part = patternParts[i];
    const actual = pathParts[i];
    if (part.charAt(0) === ":") {
      params[part.slice(1)] = actual;
    } else if (part !== actual) {
      return null;
    }
  }
  return params;
}

function createFakeApp() {
  const routes = [];
  const app = {
    get(path, handler) {
      routes.push({ path, handler });
      return app;
    },
    simulateRequest(url) {
      const match = routes.find(function (route) {
        return matchPath(route.path, url) !== null;
      });
      let body = null;
      const res = {
        send(text) {
          body = text;
          return res;
        },
      };
      if (match) {
        const params = matchPath(match.path, url);
        match.handler({ url, params }, res);
      } else {
        body = "Cannot GET " + url;
      }
      return body;
    },
  };
  return app;
}

function App() {
  const [output, setOutput] = useState("");
  const [app] = useState(function () {
    const a = createFakeApp();
    a.get("/users/:id", function (req, res) {
      res.send("Looking up user with id = " + JSON.stringify(req.params.id));
    });
    return a;
  });

  function visit(url) {
    setOutput(app.simulateRequest(url));
  }

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <button onClick={function () { visit("/users/42"); }}>GET /users/42</button>
        <button onClick={function () { visit("/users/7"); }}>GET /users/7</button>
        <button onClick={function () { visit("/users/abc"); }}>GET /users/abc</button>
      </div>
      <p>{output || "// output appears here"}</p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "query-strings",
      title: "Query strings: req.query",
      summary: "?search=foo is parsed separately from the path -- it lands on req.query, not req.params.",
      code: `function parseQuery(queryString) {
  const query = {};
  if (!queryString) return query;
  queryString.split("&").forEach(function (pair) {
    const parts = pair.split("=");
    query[parts[0]] = decodeURIComponent(parts[1] || "");
  });
  return query;
}

function createFakeApp() {
  const routes = [];
  const app = {
    get(path, handler) {
      routes.push({ path, handler });
      return app;
    },
    simulateRequest(url) {
      const splitAt = url.indexOf("?");
      const pathOnly = splitAt === -1 ? url : url.slice(0, splitAt);
      const query = splitAt === -1 ? {} : parseQuery(url.slice(splitAt + 1));
      const match = routes.find(function (route) {
        return route.path === pathOnly;
      });
      let body = null;
      const res = {
        send(text) {
          body = text;
          return res;
        },
      };
      if (match) {
        match.handler({ url, query }, res);
      } else {
        body = "Cannot GET " + pathOnly;
      }
      return body;
    },
  };
  return app;
}

function App() {
  const [output, setOutput] = useState("");
  const [app] = useState(function () {
    const a = createFakeApp();
    a.get("/search", function (req, res) {
      res.send("Search results for: " + JSON.stringify(req.query));
    });
    return a;
  });

  function visit(url) {
    setOutput(app.simulateRequest(url));
  }

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <button onClick={function () { visit("/search?term=cats"); }}>GET /search?term=cats</button>
        <button onClick={function () { visit("/search?term=cats&sort=newest"); }}>GET /search?term=cats&amp;sort=newest</button>
        <button onClick={function () { visit("/search"); }}>GET /search (no query)</button>
      </div>
      <p>{output || "// output appears here"}</p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "params-and-query-together",
      title: "Route parameters and a query string together",
      summary: "req.params identifies the resource; req.query modifies how it's fetched -- both work at once.",
      code: `function matchPath(pattern, path) {
  const patternParts = pattern.split("/").filter(Boolean);
  const pathParts = path.split("/").filter(Boolean);
  if (patternParts.length !== pathParts.length) return null;
  const params = {};
  for (let i = 0; i < patternParts.length; i++) {
    const part = patternParts[i];
    const actual = pathParts[i];
    if (part.charAt(0) === ":") {
      params[part.slice(1)] = actual;
    } else if (part !== actual) {
      return null;
    }
  }
  return params;
}

function parseQuery(queryString) {
  const query = {};
  if (!queryString) return query;
  queryString.split("&").forEach(function (pair) {
    const parts = pair.split("=");
    query[parts[0]] = decodeURIComponent(parts[1] || "");
  });
  return query;
}

function createFakeApp() {
  const routes = [];
  const app = {
    get(path, handler) {
      routes.push({ path, handler });
      return app;
    },
    simulateRequest(url) {
      const splitAt = url.indexOf("?");
      const pathOnly = splitAt === -1 ? url : url.slice(0, splitAt);
      const query = splitAt === -1 ? {} : parseQuery(url.slice(splitAt + 1));
      const match = routes.find(function (route) {
        return matchPath(route.path, pathOnly) !== null;
      });
      let body = null;
      const res = {
        send(text) {
          body = text;
          return res;
        },
      };
      if (match) {
        const params = matchPath(match.path, pathOnly);
        match.handler({ url, params, query }, res);
      } else {
        body = "Cannot GET " + pathOnly;
      }
      return body;
    },
  };
  return app;
}

function App() {
  const [output, setOutput] = useState("");
  const [app] = useState(function () {
    const a = createFakeApp();
    a.get("/users/:id/posts", function (req, res) {
      res.send(
        "User " + req.params.id + " posts, params=" + JSON.stringify(req.params) + " query=" + JSON.stringify(req.query)
      );
    });
    return a;
  });

  function visit(url) {
    setOutput(app.simulateRequest(url));
  }

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <button onClick={function () { visit("/users/42/posts?sort=newest&limit=5"); }}>
        GET /users/42/posts?sort=newest&amp;limit=5
      </button>
      <p>{output || "// output appears here"}</p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "gotcha-route-order",
      title: "Gotcha: route order -- a specific route hidden behind a dynamic one",
      summary: "Registering /users/:id before /users/new means /users/new is swallowed by the :id parameter.",
      code: `function matchPath(pattern, path) {
  const patternParts = pattern.split("/").filter(Boolean);
  const pathParts = path.split("/").filter(Boolean);
  if (patternParts.length !== pathParts.length) return null;
  const params = {};
  for (let i = 0; i < patternParts.length; i++) {
    const part = patternParts[i];
    const actual = pathParts[i];
    if (part.charAt(0) === ":") {
      params[part.slice(1)] = actual;
    } else if (part !== actual) {
      return null;
    }
  }
  return params;
}

function createFakeApp() {
  const routes = [];
  const app = {
    get(path, handler) {
      routes.push({ path, handler });
      return app;
    },
    simulateRequest(url) {
      const match = routes.find(function (route) {
        return matchPath(route.path, url) !== null;
      });
      let body = null;
      const res = {
        send(text) {
          body = text;
          return res;
        },
      };
      if (match) {
        const params = matchPath(match.path, url);
        match.handler({ url, params }, res);
      } else {
        body = "Cannot GET " + url;
      }
      return body;
    },
  };
  return app;
}

function App() {
  const [broken, setBroken] = useState("");
  const [fixed, setFixed] = useState("");

  function runBroken() {
    const app = createFakeApp();
    // Bug: the dynamic route is registered FIRST.
    app.get("/users/:id", function (req, res) {
      res.send("Looking up user id = " + JSON.stringify(req.params.id));
    });
    app.get("/users/new", function (req, res) {
      res.send("Show the new-user form");
    });
    setBroken(app.simulateRequest("/users/new"));
  }

  function runFixed() {
    const app = createFakeApp();
    // Fixed: the specific literal route is registered FIRST.
    app.get("/users/new", function (req, res) {
      res.send("Show the new-user form");
    });
    app.get("/users/:id", function (req, res) {
      res.send("Looking up user id = " + JSON.stringify(req.params.id));
    });
    setFixed(app.simulateRequest("/users/new"));
  }

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <button onClick={runBroken}>GET /users/new (:id registered first)</button>
        <button onClick={runFixed}>GET /users/new (literal route registered first)</button>
      </div>
      <p>Broken order result: {broken || "-- click above --"}</p>
      <p>Fixed order result: {fixed || "-- click above --"}</p>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
