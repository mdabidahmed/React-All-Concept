import type { QuizQuestion } from "../../types/quiz";

export const nodeFileSystemQuestions: QuizQuestion[] = [
  {
    id: "node-file-system-1",
    question:
      "What is the key difference between fs.readFile() and fs.readFileSync()?",
    type: "single",
    options: [
      "fs.readFile() reads the file asynchronously and takes a callback, letting other code run while it waits, while fs.readFileSync() blocks the entire thread until the read finishes",
      "fs.readFile() only works with text files, while fs.readFileSync() works with any file type",
      "fs.readFileSync() is always faster because it skips the callback queue entirely",
      "There is no real difference; both names exist only for backward compatibility",
    ],
    correctIndexes: [0],
    explanation:
      "fs.readFile() performs the read in the background and invokes its callback once the data is ready, leaving Node's single thread free in the meantime, whereas fs.readFileSync() halts everything else until the file has been fully read.",
  },
  {
    id: "node-file-system-2",
    question:
      "Why is fs.readFileSync() generally discouraged inside an HTTP request handler in a Node.js server?",
    type: "single",
    options: [
      "Because it blocks Node's single JS thread while it runs, so every other incoming request has to wait until that one file read completes, hurting throughput under load",
      "Because synchronous functions cannot read files larger than 1KB",
      "Because it does not exist in the fs module and would throw a ReferenceError",
      "Because it silently returns an empty buffer when called from inside a server",
    ],
    correctIndexes: [0],
    explanation:
      "Node.js handles many concurrent requests on a single JavaScript thread; a blocking sync call like fs.readFileSync() freezes that thread for every other client until it returns, which can badly degrade a server's ability to handle concurrent traffic.",
  },
  {
    id: "node-file-system-3",
    question:
      "fs.readFile('notes.txt', 'utf8', (err, data) => { console.log(data); }); console.log('started'); What is logged, and in what order?",
    type: "single",
    options: [
      "'started' is logged first, then the file's contents, because the read happens asynchronously and the callback fires later",
      "The file's contents are logged first, then 'started'",
      "Only 'started' is logged; the callback never runs",
      "Both lines are logged at the same time, in an unpredictable order",
    ],
    correctIndexes: [0],
    explanation:
      "fs.readFile() schedules the actual disk read and returns immediately, so the synchronous console.log('started') runs right away; the callback with the file's data only fires later, once the asynchronous read completes.",
  },
  {
    id: "node-file-system-4",
    question:
      "What is the 'error-first callback' convention used throughout Node.js's core APIs, such as fs.readFile(path, (err, data) => {...})?",
    type: "single",
    options: [
      "The callback's first parameter is reserved for an error (or null if none occurred), and subsequent parameters carry the actual result, so the caller should check err before trusting data",
      "The callback must throw the error itself instead of receiving it as a parameter",
      "The first parameter is always the file path, and errors are only reported via a separate .catch() call",
      "It means the callback runs before the operation starts, so it can validate arguments up front",
    ],
    correctIndexes: [0],
    explanation:
      "By convention, Node's callback-based APIs pass 'err' as the first argument (null when the operation succeeded) and the result as later arguments, which is why well-written callbacks always check 'if (err) { ... }' before touching the data.",
  },
  {
    id: "node-file-system-5",
    question:
      "fs.readFile('config.json', 'utf8', (err, data) => { console.log(data.length); }); If the file does not exist, what happens?",
    type: "single",
    options: [
      "'data' is undefined because the read failed, so calling data.length throws a TypeError inside the callback, since the code never checked 'err' first",
      "'data' is an empty string, so data.length logs 0",
      "Node automatically creates the missing file and then logs 0",
      "The callback is never called, so nothing happens at all",
    ],
    correctIndexes: [0],
    explanation:
      "When a read fails, fs.readFile() still invokes the callback, but with 'err' set and 'data' left undefined; code that skips checking err and immediately accesses data.length crashes with a TypeError, which is exactly why the error-first check matters.",
  },
  {
    id: "node-file-system-6",
    question:
      "Which of the following statements correctly describe fs.writeFile() versus fs.appendFile()?",
    type: "multi",
    options: [
      "fs.writeFile() replaces the entire contents of the target file (or creates it if it doesn't exist)",
      "fs.appendFile() adds new content to the end of the file, keeping whatever was already there",
      "fs.appendFile() always throws an error if the file already exists",
      "fs.writeFile() and fs.appendFile() produce identical results in every case",
    ],
    correctIndexes: [0, 1],
    explanation:
      "fs.writeFile() overwrites a file's existing content (creating the file if needed), while fs.appendFile() preserves what's already in the file and adds the new data after it; appendFile() also creates the file if it does not yet exist, it does not error.",
  },
  {
    id: "node-file-system-7",
    question:
      "fs.writeFile('log.txt', 'first\\n', () => { fs.writeFile('log.txt', 'second\\n', () => { console.log('done'); }); }); What ends up in log.txt after this runs?",
    type: "single",
    options: [
      "Only 'second\\n', because the second writeFile() call overwrites the file rather than adding to it",
      "'first\\nsecond\\n', because both writes are combined into the file",
      "'second\\nfirst\\n', because the callback fires before the write starts",
      "The file remains empty, because writeFile() cannot be called twice on the same path",
    ],
    correctIndexes: [0],
    explanation:
      "fs.writeFile() replaces a file's entire contents each time it's called, so the second call overwrites 'first' entirely, leaving only 'second\\n' in the file; to keep both lines, fs.appendFile() would be needed instead.",
  },
  {
    id: "node-file-system-8",
    question:
      "Which module methods would you use to create a new directory and then list what's inside it?",
    type: "single",
    options: [
      "fs.mkdir() to create the directory, and fs.readdir() to list its contents",
      "fs.mkfile() to create the directory, and fs.listdir() to list its contents",
      "fs.newDir() to create the directory, and fs.readFile() to list its contents",
      "fs.createDir() to create the directory, and fs.dirContents() to list its contents",
    ],
    correctIndexes: [0],
    explanation:
      "fs.mkdir() (or its promise/sync variants) creates a directory, and fs.readdir() returns an array of the names of the entries (files and subdirectories) inside a given directory; the other method names shown do not exist in the fs module.",
  },
  {
    id: "node-file-system-9",
    question:
      "What does fs.existsSync(path) do, and how does it commonly get used?",
    type: "single",
    options: [
      "It synchronously checks whether a file or directory exists at the given path and returns a boolean, often used to decide whether to create something before writing to it",
      "It asynchronously deletes the file at the given path if it exists",
      "It returns the full contents of the file as a string if it exists",
      "It throws an error if the path exists, and returns undefined if it does not",
    ],
    correctIndexes: [0],
    explanation:
      "fs.existsSync() performs a blocking check and returns true or false depending on whether the path exists, which developers commonly use in setup code (like ensuring a directory exists) before performing further file operations.",
  },
  {
    id: "node-file-system-10",
    question:
      "What does path.join('/api', 'users', '../posts', './2024') return, and why?",
    type: "single",
    options: [
      "'/api/posts/2024', because path.join() concatenates segments with the correct separator and then normalizes the result, resolving '..' and './' along the way",
      "'/api/users/../posts/./2024', because path.join() only concatenates without normalizing",
      "'/api/users/posts/2024', because path.join() ignores '..' segments entirely instead of resolving them",
      "It throws an error, because path.join() rejects relative segments like '..' and '.'",
    ],
    correctIndexes: [0],
    explanation:
      "path.join() joins all given segments using the platform's separator and then normalizes the resulting path, so a '..' segment moves back up one directory ('users' is dropped) and a leading './' segment is simplified away, leaving '/api/posts/2024'.",
  },
  {
    id: "node-file-system-11",
    question:
      "How does path.resolve('data', 'file.txt') differ from path.join('data', 'file.txt')?",
    type: "single",
    options: [
      "path.resolve() builds an absolute path by resolving the segments against the current working directory, while path.join() simply joins and normalizes the segments as given, which may stay relative",
      "path.resolve() and path.join() always return exactly the same string",
      "path.join() returns an absolute path, while path.resolve() always returns a relative one",
      "path.resolve() only works with file names, never directory names",
    ],
    correctIndexes: [0],
    explanation:
      "path.join() combines path segments and normalizes the separators/'..'/'.' but leaves the result relative if the inputs were relative, whereas path.resolve() processes segments right-to-left and prefixes the current working directory (or an earlier absolute segment) so the final result is always an absolute path.",
  },
  {
    id: "node-file-system-12",
    question:
      "Given const p = '/home/user/reports/summary.report.pdf', which of the following are correct?",
    type: "multi",
    options: [
      "path.dirname(p) is '/home/user/reports'",
      "path.basename(p) is 'summary.report.pdf'",
      "path.extname(p) is '.pdf'",
      "path.extname(p) is '.report.pdf'",
    ],
    correctIndexes: [0, 1, 2],
    explanation:
      "path.dirname() returns everything before the final segment, path.basename() returns just the final segment (the file name with its extension), and path.extname() returns only the last extension after the final dot, '.pdf', not everything after the first dot.",
  },
  {
    id: "node-file-system-13",
    question:
      "Why does Node.js provide both synchronous (e.g. fs.readFileSync) and asynchronous (e.g. fs.readFile) versions of most fs operations, and when is the sync version reasonable to use?",
    type: "single",
    options: [
      "Because Node runs JavaScript on a single thread; async versions avoid blocking that thread during I/O, while sync versions are acceptable in one-off scripts or startup code where blocking briefly doesn't affect other work",
      "Because the sync versions are newer and meant to fully replace the async ones",
      "Because sync versions run on a separate thread automatically, so they never block anything",
      "Because async versions only work with text files, while sync versions work with binary files",
    ],
    correctIndexes: [0],
    explanation:
      "Node's single JS thread means any blocking call pauses everything else running on it; that's fine for a short-lived CLI script or one-time startup configuration loading, but it's a poor choice inside a long-running server that needs to stay responsive to many clients at once.",
  },
  {
    id: "node-file-system-14",
    question:
      "What is fs.watch() used for, and what should developers keep in mind when using it?",
    type: "single",
    options: [
      "It watches a file or directory and emits events (like 'change' or 'rename') when something happens to it, though its exact behavior and reliability can vary somewhat across operating systems",
      "It permanently locks a file so no other process can modify it",
      "It periodically re-reads an entire file's contents into memory on a fixed interval",
      "It compresses a file automatically whenever it's saved",
    ],
    correctIndexes: [0],
    explanation:
      "fs.watch() sets up a listener that fires events when the watched file or directory changes, which is useful for things like auto-reloading tools, but its event details and consistency are known to differ somewhat between platforms, so it should be used with some caution around edge cases.",
  },
];
