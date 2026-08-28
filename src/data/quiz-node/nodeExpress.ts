import type { QuizQuestion } from "../../types/quiz";

export const nodeExpressQuestions: QuizQuestion[] = [
  {
    id: "node-express-1",
    question:
      "What is the main reason developers reach for Express instead of using the core http module directly?",
    type: "single",
    options: [
      "Express provides a routing layer, request/response helpers, and middleware system that eliminate the boilerplate of manually branching on req.url/req.method and manually parsing request bodies",
      "Express replaces JavaScript with a faster compiled language for handling requests",
      "The core http module cannot open a TCP port, so a framework is required to accept any connections at all",
      "Express is required because Node cannot serve more than one request at a time without it",
    ],
    correctIndexes: [0],
    explanation:
      "Node's http module is deliberately low-level; Express builds on top of it to provide declarative routing, convenient req/res helpers, and composable middleware, removing the repetitive string-matching and manual body-parsing that plain http servers require.",
  },
  {
    id: "node-express-2",
    question:
      "What does app.get('/about', (req, res) => { res.send('About page'); }) register?",
    type: "single",
    options: [
      "A route handler that runs only for GET requests to the exact path '/about'",
      "A route handler that runs for every HTTP method as long as the path is '/about'",
      "A global middleware that runs on every route before app.listen is called",
      "A handler that only runs once, the first time the server starts",
    ],
    correctIndexes: [0],
    explanation:
      "app.get registers a handler scoped to both a specific method (GET) and a specific path; other methods on that same path, or GET requests to other paths, won't trigger this handler.",
  },
  {
    id: "node-express-3",
    question:
      "What is required for app.listen(4000, () => console.log('running')) to actually start accepting connections?",
    type: "single",
    options: [
      "Nothing else; calling app.listen with a port number is what binds the server and starts it accepting incoming requests",
      "You must separately call app.start() after app.listen()",
      "You must call app.bind(4000) before app.listen() will do anything",
      "app.listen only registers the port; a separate http.createServer call is always required to actually start it",
    ],
    correctIndexes: [0],
    explanation:
      "app.listen wraps the underlying http server creation and starts it listening on the given port in one step, so no additional bind or start call is needed; the callback simply runs once the server is ready.",
  },
  {
    id: "node-express-4",
    question:
      "Given app.get('/users/:id', (req, res) => { res.send(req.params.id); }), what does a request to '/users/42' respond with?",
    type: "single",
    options: [
      "42, since ':id' is a route parameter and Express captures the matching URL segment into req.params.id",
      "undefined, since route parameters must be manually parsed from req.url",
      "'/users/:id', the literal route pattern string",
      "An error, because ':id' is not valid Express route syntax",
    ],
    correctIndexes: [0],
    explanation:
      "Express route parameters like ':id' are placeholders that capture the corresponding segment of the actual URL and expose it on req.params, keyed by the parameter name, so req.params.id would be the string '42'.",
  },
  {
    id: "node-express-5",
    question:
      "For a request to '/search?term=cats&page=2', which statement correctly distinguishes route params from query strings?",
    type: "single",
    options: [
      "There are no route params here; 'term' and 'page' are query string values read via req.query.term and req.query.page",
      "'term' and 'page' are route params, accessible via req.params.term and req.params.page",
      "Query strings and route params are the same thing in Express, both read from req.params",
      "req.query only works for POST requests, never for GET requests with a query string",
    ],
    correctIndexes: [0],
    explanation:
      "Route params come from named placeholders in the route path itself (like '/users/:id'), while query string key-value pairs after the '?' are parsed automatically by Express and exposed on req.query, regardless of HTTP method.",
  },
  {
    id: "node-express-6",
    question:
      "Which statements correctly describe Express middleware functions?",
    type: "multi",
    options: [
      "A middleware function has the signature (req, res, next) and can inspect or modify req/res before the route handler runs",
      "Calling next() passes control to the next middleware or route handler in the chain",
      "app.use() registers a middleware function to run for matching requests, optionally scoped to a path prefix",
      "A middleware function can never send a response itself; only the final route handler is allowed to call res.send or res.json",
    ],
    correctIndexes: [0, 1, 2],
    explanation:
      "Middleware sits between the incoming request and the eventual route handler, can read or modify req/res, and calls next() to continue the chain; but middleware absolutely can end the response itself (e.g. an auth check that responds with 401 and never calls next()).",
  },
  {
    id: "node-express-7",
    question:
      "A middleware function is defined but the developer forgets to call next() and doesn't send a response either: app.use((req, res, next) => { console.log('hit'); }); What happens to requests?",
    type: "single",
    options: [
      "The request hangs indefinitely: since neither next() nor a response method was called, the chain never continues and the client never receives a reply",
      "Express automatically calls next() after one second if it wasn't called manually",
      "The next route handler runs anyway, since middleware is purely optional in the chain",
      "Express throws a startup error because next() must always be called synchronously",
    ],
    correctIndexes: [0],
    explanation:
      "Express does not automatically advance the middleware chain; if a middleware neither calls next() nor sends a response, request handling simply stalls there, and the client's connection will eventually time out.",
  },
  {
    id: "node-express-8",
    question:
      "What does res.status(404).json({ error: 'Not found' }) do?",
    type: "single",
    options: [
      "It sets the response status code to 404 and sends a JSON body of {\"error\":\"Not found\"}, since res.status() returns the response object so the call can be chained",
      "It sends two separate responses to the client, one for the status and one for the JSON",
      "It throws a runtime error because status() and json() cannot be chained together",
      "It sets the status code to 200 regardless, because json() always overrides a previously set status",
    ],
    correctIndexes: [0],
    explanation:
      "res.status(code) sets the status code and returns the response object itself, which is what makes chaining calls like .json(data) or .send(data) possible; the final call in the chain sends the response with that status.",
  },
  {
    id: "node-express-9",
    question:
      "What is the practical difference between res.send() and res.json() in Express?",
    type: "single",
    options: [
      "res.json() always serializes its argument to a JSON string and sets Content-Type to application/json, while res.send() inspects the argument's type and can send strings, buffers, or objects (serializing objects to JSON automatically too)",
      "res.send() can only send plain text and never objects, while res.json() can send any data type",
      "They are entirely unrelated methods; res.json() is for GET requests and res.send() is only for POST requests",
      "res.json() sends a response without a status code, while res.send() requires one to be set first",
    ],
    correctIndexes: [0],
    explanation:
      "res.json() is explicit about serializing to JSON, while res.send() is a more general-purpose method that adapts its behavior based on the type of value passed to it, including auto-serializing plain objects to JSON as well.",
  },
  {
    id: "node-express-10",
    question:
      "In a small CRUD API for '/tasks', which set of route definitions best matches conventional REST design?",
    type: "single",
    options: [
      "app.get('/tasks', listAll); app.post('/tasks', create); app.get('/tasks/:id', getOne); app.put('/tasks/:id', update); app.delete('/tasks/:id', remove)",
      "app.get('/tasks/list', listAll); app.get('/tasks/create', create); app.get('/tasks/update', update); app.get('/tasks/delete', remove)",
      "app.post('/getTasks', listAll); app.post('/makeTask', create); app.post('/changeTask', update); app.post('/removeTask', remove)",
      "app.get('/tasks', create); app.post('/tasks', listAll); app.delete('/tasks/:id', update); app.put('/tasks/:id', remove)",
    ],
    correctIndexes: [0],
    explanation:
      "Conventional REST design uses the HTTP method to express the action (GET to read, POST to create, PUT/PATCH to update, DELETE to remove) on a consistent resource path, rather than encoding the verb into the URL or using GET/POST for everything.",
  },
  {
    id: "node-express-11",
    question:
      "Why does error-handling middleware in Express need exactly four parameters, like (err, req, res, next), instead of the usual three?",
    type: "single",
    options: [
      "Express identifies a middleware function as an error handler specifically by checking its arity (four parameters), and only routes errors to functions defined that way",
      "The fourth parameter is purely stylistic and has no effect on how Express treats the function",
      "Four-parameter middleware runs before every other middleware in the app, regardless of where it's defined",
      "Express requires exactly four parameters on all middleware, not just error handlers",
    ],
    correctIndexes: [0],
    explanation:
      "Express distinguishes error-handling middleware from regular middleware purely by counting its declared parameters: a function with four parameters (err, req, res, next) is treated as an error handler and is only invoked when next(err) is called or an error is thrown synchronously in a preceding handler.",
  },
  {
    id: "node-express-12",
    question:
      "In an older Express version (pre-5), a route is defined as: app.get('/data', async (req, res) => { const result = await fetchData(); res.json(result); }); If fetchData() rejects, what typically happens?",
    type: "single",
    options: [
      "The rejection becomes an unhandled promise rejection that Express does not automatically catch, so the request hangs without a response unless the error is manually caught and passed to next(err)",
      "Express automatically catches the rejection and responds with a 500 status and a generic error message",
      "The rejection is silently ignored and res.json(undefined) is sent as if fetchData() had resolved",
      "The server process always crashes immediately whenever any async route handler rejects",
    ],
    correctIndexes: [0],
    explanation:
      "In Express versions before 5, the framework does not automatically catch promise rejections thrown inside async route handlers, so an unhandled rejection can leave the request hanging; the common fix is wrapping the handler in a try/catch that calls next(err), or using a helper/wrapper to forward rejections automatically. (Express 5 changed this by catching rejected promises automatically.)",
  },
  {
    id: "node-express-13",
    question:
      "Which of the following are true about how Express matches and runs route handlers and middleware in the order they're registered?",
    type: "multi",
    options: [
      "Express checks middleware and routes in the order app.use()/app.get()/etc. were called, top to bottom, for each incoming request",
      "If an earlier matching middleware never calls next(), later middleware and route handlers registered after it will not run for that request",
      "A route registered with app.get() will also match POST requests to the same path, since Express treats all methods the same",
      "Placing app.use(express.json()) before your route handlers is what allows those handlers to read a parsed JSON body from req.body",
    ],
    correctIndexes: [0, 1, 3],
    explanation:
      "Express walks the stack of registered middleware and routes in registration order, stopping the chain wherever next() isn't called; express.json() must run before a route handler for that handler to see a parsed req.body. app.get() only matches GET requests, not POST.",
  },
  {
    id: "node-express-14",
    question:
      "A developer wants one function to handle errors thrown anywhere in the app and defines it as the very first thing after app.listen() is set up (before any routes are registered). What's wrong with this?",
    type: "single",
    options: [
      "Error-handling middleware must be registered after the routes it's meant to protect, since Express only reaches it when an earlier handler calls next(err) or throws; placed first, no route has run yet to trigger it",
      "Nothing is wrong; middleware order never matters in Express",
      "Error-handling middleware must always be the very first middleware registered, so this is actually correct",
      "app.listen() must always be the last line in a file, so this code would fail to even start the server",
    ],
    correctIndexes: [0],
    explanation:
      "Express processes middleware in registration order, and an error handler can only catch errors from handlers that ran before it in that order, so it needs to be registered after the routes (and other middleware) it's meant to guard, typically near the end of the middleware stack.",
  },
];
