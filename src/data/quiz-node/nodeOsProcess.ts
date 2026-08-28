import type { QuizQuestion } from "../../types/quiz";

export const nodeOsProcessQuestions: QuizQuestion[] = [
  {
    id: "node-os-process-1",
    question:
      "What does process.argv contain when a Node.js script is run from the command line?",
    type: "single",
    options: [
      "An array of command-line arguments, where the first two entries are the path to the Node executable and the path to the script, followed by any user-supplied arguments",
      "An object mapping environment variable names to their values",
      "A string containing the entire command line as typed, unsplit",
      "Only the arguments the user typed, with no reference to Node or the script itself",
    ],
    correctIndexes: [0],
    explanation:
      "process.argv is always an array whose first element is the path to the node executable and second element is the path to the script being run; any arguments the user actually passed start at index 2.",
  },
  {
    id: "node-os-process-2",
    question:
      "Given the command 'node app.js build --watch', what is process.argv[2]?",
    type: "single",
    options: [
      "'build'",
      "'node'",
      "'app.js'",
      "'--watch'",
    ],
    correctIndexes: [0],
    explanation:
      "process.argv[0] is the node executable's path, process.argv[1] is the script path ('app.js'), so the first real user-supplied argument, 'build', lands at index 2; '--watch' follows at index 3.",
  },
  {
    id: "node-os-process-3",
    question:
      "What is process.env typically used for in a Node.js application?",
    type: "single",
    options: [
      "Accessing environment variables, such as configuration values or secrets, that were set outside the script itself",
      "Storing temporary variables that automatically reset every time a function returns",
      "Reading the contents of files in the current working directory",
      "Tracking how much memory the current process has used so far",
    ],
    correctIndexes: [0],
    explanation:
      "process.env is an object exposing the current process's environment variables (e.g. process.env.PORT or process.env.NODE_ENV), which is the standard way Node programs read configuration supplied by the shell, a hosting platform, or an .env file loader.",
  },
  {
    id: "node-os-process-4",
    question:
      "if (!isDbConnected) { console.error('Cannot start: database unreachable'); process.exit(1); } Why pass 1 to process.exit() here instead of calling it with no argument?",
    type: "single",
    options: [
      "A non-zero exit code signals to the shell or process manager that the program terminated due to an error, whereas exit code 0 conventionally means success",
      "process.exit() requires a numeric argument or it throws a TypeError",
      "Passing 1 tells Node to retry the operation exactly once before exiting",
      "There is no difference; the exit code is purely cosmetic and ignored by every tool",
    ],
    correctIndexes: [0],
    explanation:
      "By convention, an exit code of 0 means the process finished successfully, while any non-zero code signals failure; tools like shell scripts, CI pipelines, and process managers (e.g. restarting a crashed service) often check this code to decide what to do next.",
  },
  {
    id: "node-os-process-5",
    question:
      "Which of the following correctly describe properties available on the process object?",
    type: "multi",
    options: [
      "process.platform reports the operating system Node is running on, such as 'darwin', 'win32', or 'linux'",
      "process.version reports the version of Node.js currently running the script",
      "process.platform can be reassigned at runtime to change what operating system the code believes it's running on",
      "process.version always returns the version of npm installed, not Node itself",
    ],
    correctIndexes: [0, 1],
    explanation:
      "process.platform and process.version are read-only informational properties describing the runtime environment: platform identifies the OS, and version identifies the Node.js version string (e.g. 'v20.11.0'); process.version has nothing to do with npm's version.",
  },
  {
    id: "node-os-process-6",
    question:
      "What is the primary difference between Node's process module and its os module?",
    type: "single",
    options: [
      "process provides information and control specific to the currently running Node.js program (like its arguments, env vars, and exit behavior), while os provides information about the underlying operating system and hardware (like CPU and memory)",
      "process only works on Windows, while os only works on Linux and macOS",
      "os is used to spawn new Node.js processes, while process reads system-wide CPU statistics",
      "They are two names for the exact same module, kept for backward compatibility",
    ],
    correctIndexes: [0],
    explanation:
      "The process global is scoped to the currently executing Node.js instance (its arguments, environment, exit code, and so on), whereas the 'os' module (imported via require('os') or 'node:os') reports facts about the host machine itself, such as its platform, CPU cores, and memory.",
  },
  {
    id: "node-os-process-7",
    question:
      "Which of the following correctly pair an os module method with what it returns?",
    type: "multi",
    options: [
      "os.platform() returns a string identifying the operating system, like 'darwin' or 'linux'",
      "os.cpus() returns an array with information about each logical CPU core",
      "os.homedir() returns the path to the current user's home directory",
      "os.homedir() returns the amount of free disk space available",
    ],
    correctIndexes: [0, 1, 2],
    explanation:
      "os.platform() identifies the OS, os.cpus() returns an array of per-core details (such as model and speed), and os.homedir() returns the current user's home directory path; disk space isn't what os.homedir() reports at all.",
  },
  {
    id: "node-os-process-8",
    question:
      "console.log(os.totalmem(), os.freemem()); What do these two os module calls report, and in what unit?",
    type: "single",
    options: [
      "The total amount of system RAM and the currently free amount of system RAM, both measured in bytes",
      "The total and free disk storage space, measured in gigabytes",
      "The total and currently used CPU percentage, measured as a decimal between 0 and 1",
      "The maximum and current memory usage of only the running Node.js process, in kilobytes",
    ],
    correctIndexes: [0],
    explanation:
      "os.totalmem() and os.freemem() report the total and currently free system memory (RAM) in bytes; they describe the whole machine's memory, not disk space, CPU load, or just the memory used by the current Node process (that's process.memoryUsage()).",
  },
  {
    id: "node-os-process-9",
    question:
      "Why do many Node.js projects use a package like dotenv along with a .env file, instead of hardcoding values like database passwords directly in the source code?",
    type: "single",
    options: [
      "It lets configuration (including secrets) vary between environments like development, testing, and production, and keeps sensitive values out of source control when the .env file is git-ignored",
      "dotenv is required by Node.js itself; without it, process.env does not exist at all",
      ".env files execute faster than reading values from process.env directly",
      "It automatically encrypts all environment variables so they can never be read by the running process",
    ],
    correctIndexes: [0],
    explanation:
      "dotenv loads key-value pairs from a .env file into process.env at startup, which lets each environment (local machine, staging, production) supply its own configuration and credentials without editing code, and keeping that file out of git prevents secrets from leaking into source control history.",
  },
  {
    id: "node-os-process-10",
    question:
      "Why does it matter that user-supplied command-line arguments start at process.argv[2] rather than process.argv[0]?",
    type: "single",
    options: [
      "Because indexes 0 and 1 are reserved for the Node executable path and the script path, so code that reads arguments starting at index 0 would mistakenly treat those paths as user input",
      "Because process.argv is 1-indexed instead of 0-indexed for historical reasons",
      "Because Node reserves the first two slots for security tokens that change on every run",
      "It doesn't matter; process.argv[0] and process.argv[2] always hold identical values",
    ],
    correctIndexes: [0],
    explanation:
      "process.argv[0] is always the path to the node binary and process.argv[1] is always the path to the executed script, so a script that wants only what the user actually typed after the script name needs to slice or index starting from position 2.",
  },
  {
    id: "node-os-process-11",
    question:
      "console.log('start'); setTimeout(() => console.log('timeout'), 0); setImmediate(() => console.log('immediate')); process.nextTick(() => console.log('nextTick')); console.log('end'); What is the correct relative order of the four logged lines?",
    type: "single",
    options: [
      "'start', 'end', 'nextTick', then 'timeout' and 'immediate' (in an order that can vary depending on context, but both after nextTick)",
      "'start', 'end', 'timeout', 'immediate', 'nextTick'",
      "'nextTick', 'start', 'end', 'timeout', 'immediate'",
      "'start', 'nextTick', 'end', 'timeout', 'immediate'",
    ],
    correctIndexes: [0],
    explanation:
      "Synchronous code ('start', 'end') always runs first; process.nextTick() callbacks are then drained before the event loop proceeds to any timer or check phase, so 'nextTick' logs next; setTimeout(fn, 0) and setImmediate() both then fire from later event-loop phases, and their relative order to each other can depend on context (like whether the code runs inside an I/O callback).",
  },
  {
    id: "node-os-process-12",
    question:
      "Which of the following statements about process.nextTick(), setImmediate(), and setTimeout(fn, 0) are true?",
    type: "multi",
    options: [
      "process.nextTick() callbacks run before the event loop continues to its next phase, ahead of both setTimeout and setImmediate callbacks",
      "setTimeout(fn, 0) schedules fn to run after a minimum delay, not literally at time zero, so other pending work can still run first",
      "setImmediate() is guaranteed to always run strictly before every setTimeout(fn, 0) call, no matter where either is scheduled from",
      "process.nextTick(), setImmediate(), and setTimeout(fn, 0) all execute their callbacks perfectly synchronously, with zero deferral",
    ],
    correctIndexes: [0, 1],
    explanation:
      "process.nextTick() has the highest priority of the three, running before the event loop moves on; setTimeout(fn, 0) is still asynchronous and only guarantees a minimum delay, not immediate execution. The relative order of setImmediate() versus setTimeout(fn, 0) is not always fixed at the top level (it depends on context such as being inside an I/O callback), and none of these three run synchronously — they are all deferred to some later point.",
  },
];
