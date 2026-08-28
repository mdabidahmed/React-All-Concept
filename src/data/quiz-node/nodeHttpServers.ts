import type { QuizQuestion } from "../../types/quiz";

export const nodeHttpServersQuestions: QuizQuestion[] = [
  {
    id: "node-http-servers-1",
    question:
      "What does http.createServer((req, res) => { ... }) return, and what does calling .listen(3000) on it do?",
    type: "single",
    options: [
      "createServer returns a Server instance that isn't accepting connections yet; .listen(3000) binds it to port 3000 and starts it accepting incoming requests",
      "createServer immediately starts listening on a random port, and .listen(3000) merely changes the port after the fact",
      "createServer runs the callback once immediately with empty req/res objects, and .listen does nothing without a callback argument",
      "createServer returns a plain JavaScript object with no methods, so .listen(3000) is actually a static function unrelated to the server",
    ],
    correctIndexes: [0],
    explanation:
      "http.createServer builds a Server object and registers the callback to run for every incoming request, but the server only starts accepting connections once .listen(port) is called, which binds it to that port.",
  },
  {
    id: "node-http-servers-2",
    question:
      "Inside the request handler (req, res) => {...}, which properties would you inspect to find the HTTP verb used and the requested path?",
    type: "single",
    options: [
      "req.method for the verb (e.g. 'GET') and req.url for the path (e.g. '/users/5')",
      "req.verb for the verb and req.path for the path, since both are set automatically on every request",
      "res.method and res.url, since the response object tracks what was requested",
      "req.type for the verb and req.route for the path",
    ],
    correctIndexes: [0],
    explanation:
      "The core http module exposes the request line's method as req.method and the raw request target (path plus any query string) as req.url; there is no req.path or req.verb without a framework layered on top.",
  },
  {
    id: "node-http-servers-3",
    question:
      "How would you read a custom request header such as 'x-api-key' from an incoming request in a plain Node http server?",
    type: "single",
    options: [
      "req.headers['x-api-key'], since Node lower-cases header names and exposes them as a plain object",
      "req.getHeader('x-api-key'), the same method used on the response object",
      "req.header.xApiKey, using automatic camelCase conversion",
      "req.query['x-api-key'], since headers and query parameters share the same object",
    ],
    correctIndexes: [0],
    explanation:
      "Node normalizes incoming header names to lowercase and exposes them on req.headers as a plain object, so a header sent as 'X-Api-Key' is read back via req.headers['x-api-key']; res.getHeader is for headers you're sending, not receiving.",
  },
  {
    id: "node-http-servers-4",
    question:
      "What is the purpose of calling res.writeHead(200, { 'Content-Type': 'text/plain' }) before res.end('hello')?",
    type: "single",
    options: [
      "It sends the HTTP status line and response headers up front, before the body written by res.end is sent",
      "It has no real effect; res.end always sends a 200 status with no headers regardless",
      "It only sets the status code; the header object passed in is silently ignored",
      "It ends the response immediately, making the following res.end('hello') call throw an error",
    ],
    correctIndexes: [0],
    explanation:
      "res.writeHead lets you set the status code and any response headers in one call before the body is streamed out; once headers are sent (whether explicitly or implicitly on the first res.write/res.end), they can no longer be changed.",
  },
  {
    id: "node-http-servers-5",
    question:
      "What happens if a request handler never calls res.end() (and never calls res.write() in a way that closes the response)?",
    type: "single",
    options: [
      "The client's connection is left hanging, waiting indefinitely for a response that never completes",
      "Node automatically calls res.end() with an empty body after the handler function returns",
      "The server crashes immediately with an unhandled exception",
      "The request is retried automatically up to three times",
    ],
    correctIndexes: [0],
    explanation:
      "Node does not automatically finish a response; res.end() is what signals that the response is complete and flushes any remaining data, so forgetting to call it leaves the client waiting until it times out.",
  },
  {
    id: "node-http-servers-6",
    question:
      "A plain Node server routes requests like this: if (req.url === '/users') { ... } else if (req.url === '/users/1') { ... } else if (req.url === '/users/2') { ... }. Why does this approach get unwieldy as an API grows?",
    type: "multi",
    options: [
      "Every dynamic segment (like a specific user id) needs its own hardcoded branch instead of a reusable pattern like '/users/:id'",
      "Method checks (GET vs POST vs DELETE) must be layered on top of the URL checks manually, multiplying the number of conditions",
      "Shared logic like authentication or logging has to be manually copy-pasted into every branch instead of applied once",
      "The http module physically limits a server to at most ten if/else branches",
    ],
    correctIndexes: [0, 1, 2],
    explanation:
      "Hand-rolled routing forces you to enumerate every path and method combination and duplicate cross-cutting logic in each branch, which is exactly the boilerplate that routing frameworks and middleware are designed to eliminate; there is no such branch limit in the http module.",
  },
  {
    id: "node-http-servers-7",
    question:
      "Which statement about matching a dynamic route like '/users/42' using only req.url string comparisons is accurate?",
    type: "single",
    options: [
      "You must manually parse the URL, such as splitting on '/' or using a regular expression, to extract '42' as an id, since req.url is just the raw path string",
      "req.url automatically exposes an id property whenever the path contains a number",
      "Node parses ':id'-style patterns in req.url out of the box, so no manual parsing is needed",
      "Dynamic segments are impossible to handle without installing Express first",
    ],
    correctIndexes: [0],
    explanation:
      "The core http module gives you only the raw URL string; extracting a dynamic segment like an id requires manual work such as splitting the string or applying a regex, which is exactly the kind of parsing that routing libraries automate.",
  },
  {
    id: "node-http-servers-8",
    question:
      "Which of the following correctly describes the conventional meaning of these HTTP methods in a REST-style API?",
    type: "multi",
    options: [
      "GET retrieves a resource without modifying server state, and is expected to be safe to call repeatedly",
      "POST typically creates a new resource, and is not guaranteed to be safe to repeat without side effects",
      "DELETE removes the specified resource",
      "PUT is reserved exclusively for reading resources and never modifies data",
    ],
    correctIndexes: [0, 1, 2],
    explanation:
      "GET is meant to be a safe, read-only operation; POST commonly creates new resources and can have side effects if repeated; DELETE removes a resource. PUT is actually used to replace/update a resource, not to read one.",
  },
  {
    id: "node-http-servers-9",
    question:
      "What is the conventional difference between PUT and PATCH when updating a resource?",
    type: "single",
    options: [
      "PUT conventionally replaces the entire resource with the provided representation, while PATCH applies a partial update to only the specified fields",
      "PUT and PATCH are exact synonyms with no meaningful difference in convention",
      "PATCH is used only for deleting fields, and PUT is used only for adding new ones",
      "PUT can only be used on collections, while PATCH can only be used on a single resource",
    ],
    correctIndexes: [0],
    explanation:
      "By convention, PUT sends a full replacement representation of a resource (fields you omit may be treated as cleared), whereas PATCH sends only the fields that should change, leaving the rest of the resource untouched.",
  },
  {
    id: "node-http-servers-10",
    question:
      "When serving a static file such as './public/style.css' by hand with the core fs and http modules, what must the server do to serve it correctly?",
    type: "multi",
    options: [
      "Read the file's contents from disk, typically with fs.readFile or a stream",
      "Determine the file's Content-Type based on its extension (e.g. '.css' maps to 'text/css') and set that header before sending the body",
      "Handle the case where the file doesn't exist, such as by responding with a 404 status",
      "Rely on the http module to automatically detect and serve any file under the current working directory with no extra code",
    ],
    correctIndexes: [0, 1, 2],
    explanation:
      "Node's http module has no built-in static file serving: you must read the file yourself, infer the correct Content-Type from its extension (the browser would otherwise misinterpret or refuse to render it), and handle missing files, usually by checking the fs error or using fs.stat first.",
  },
  {
    id: "node-http-servers-11",
    question:
      "A handler serves '/logo.png' but forgets to set any Content-Type header, sending only the raw image bytes via res.end(). What is the likely consequence?",
    type: "single",
    options: [
      "The browser may fail to render the image correctly, since without a Content-Type it can't reliably tell the bytes represent a PNG image",
      "Node automatically infers 'image/png' from the '.png' extension in req.url, so nothing goes wrong",
      "The response is rejected outright and res.end() throws an error",
      "The browser always assumes missing Content-Type means plain text, and renders the raw bytes as garbled text, but the request still 'succeeds' visually as an image thanks to file signature sniffing being mandatory in HTTP",
    ],
    correctIndexes: [0],
    explanation:
      "The core http module does not infer Content-Type from a URL or file extension; that responsibility falls entirely on the server code, so omitting it can lead browsers to guess incorrectly (or refuse to render) the response body.",
  },
  {
    id: "node-http-servers-12",
    question:
      "To serve JSON data for a GET request with the core http module, which combination is correct?",
    type: "single",
    options: [
      "Set the 'Content-Type' header to 'application/json' and pass a JSON string to res.end(), typically produced with JSON.stringify(data)",
      "Pass the JavaScript object directly to res.end(data) with no serialization, since Node converts objects to JSON automatically",
      "Set 'Content-Type' to 'text/plain' since JSON is just text and the header doesn't matter to clients",
      "Call res.json(data), which is a built-in method on every Node http response object",
    ],
    correctIndexes: [0],
    explanation:
      "res.end expects a string or Buffer, not a raw object, so the object must be serialized with JSON.stringify first; setting Content-Type to application/json tells clients how to correctly parse the body. res.json is an Express convenience method, not part of core Node.",
  },
  {
    id: "node-http-servers-13",
    question:
      "In a plain Node http server, why can't you read a POST request's JSON body with a single synchronous line like req.body?",
    type: "single",
    options: [
      "req is a readable stream: the body arrives in chunks over 'data' events and must be collected and concatenated before it can be parsed, typically finishing in the 'end' event handler",
      "req.body already exists and holds the raw JSON body as a JavaScript object with no extra work",
      "Node deliberately disallows reading a POST body for security reasons",
      "POST requests never have a body in HTTP, only PUT and PATCH do",
    ],
    correctIndexes: [0],
    explanation:
      "The core http module treats the request as a readable stream rather than eagerly buffering the body, so you must listen for 'data' events to accumulate chunks and an 'end' event to know the body is complete, then run JSON.parse on the assembled string.",
  },
  {
    id: "node-http-servers-14",
    question:
      "A client sends a POST body of malformed JSON. The server does: let body = ''; req.on('data', c => body += c); req.on('end', () => { const data = JSON.parse(body); ... }). What is the main risk here?",
    type: "single",
    options: [
      "JSON.parse throws a SyntaxError on invalid input, and since it isn't wrapped in a try/catch, this can crash the process or leave the request hanging with no response sent",
      "JSON.parse silently returns an empty object for invalid JSON, so no error ever occurs",
      "The 'data' event never fires for POST requests, so body stays empty and JSON.parse always succeeds on ''",
      "req.on('end') fires before req.on('data'), so body is always empty at parse time",
    ],
    correctIndexes: [0],
    explanation:
      "JSON.parse throws on malformed input; without a try/catch around it (and a corresponding error response, such as a 400 status), an uncaught exception in an event handler can crash the server or leave the client without any response.",
  },
  {
    id: "node-http-servers-15",
    question:
      "Following REST conventions, which status code should a server return after successfully creating a new resource via POST /users?",
    type: "single",
    options: ["201 Created", "200 OK", "204 No Content", "202 Accepted, always, regardless of context"],
    correctIndexes: [0],
    explanation:
      "201 Created is the conventional status for a request that successfully results in a new resource being created, often paired with a response body describing the new resource and a Location header pointing to it.",
  },
  {
    id: "node-http-servers-16",
    question:
      "In a REST API, which pairing of situation to status code is correct?",
    type: "multi",
    options: [
      "Requesting a resource that doesn't exist, like GET /users/999 for a missing user, returns 404 Not Found",
      "An unexpected server-side failure, like a database crashing mid-query, returns 500 Internal Server Error",
      "A successful GET request that returns data returns 200 OK",
      "A successful GET request that returns data should return 404 Not Found to indicate the data was found",
    ],
    correctIndexes: [0, 1, 2],
    explanation:
      "404 signals that the requested resource could not be found, 500 signals an unexpected failure on the server's side, and 200 signals a normal successful response; 404 specifically means 'not found,' the opposite of a successful lookup.",
  },
];
