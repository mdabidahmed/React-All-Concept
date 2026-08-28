import type { QuizQuestion } from "../../types/quiz";

export const nodeEventsStreamsQuestions: QuizQuestion[] = [
  {
    id: "node-events-streams-1",
    question:
      "What does emitter.on('login', callback) do on an EventEmitter instance?",
    type: "single",
    options: [
      "Registers callback as a listener that runs every time the 'login' event is emitted, until it is removed",
      "Immediately invokes callback once and then discards it",
      "Emits a 'login' event immediately, passing callback as data",
      "Registers callback to run exactly once, then automatically removes itself",
    ],
    correctIndexes: [0],
    explanation:
      "emitter.on() subscribes a listener function to a named event; the listener stays registered and runs every time that event is emitted until it is explicitly removed. Running only once is the behavior of once(), not on().",
  },
  {
    id: "node-events-streams-2",
    question:
      "What does this code log? const emitter = new EventEmitter(); emitter.on('tick', () => console.log('A')); emitter.on('tick', () => console.log('B')); emitter.emit('tick');",
    type: "single",
    options: [
      "A then B",
      "B then A",
      "Only A, because emit() stops after the first matching listener",
      "Nothing, because emit() needs at least one argument besides the event name",
    ],
    correctIndexes: [0],
    explanation:
      "emit() calls every listener registered for that event synchronously, in the exact order they were added with on(); since 'A' was registered before 'B', it logs first.",
  },
  {
    id: "node-events-streams-3",
    question:
      "Which of the following statements about EventEmitter's emit() method are true?",
    type: "multi",
    options: [
      "emit() calls all listeners registered for that event synchronously, one after another",
      "emit() runs listeners in the order they were registered with on()",
      "If no listener is registered for the emitted event, emit() simply does nothing (aside from a special case for 'error')",
      "emit() returns a Promise that resolves once every listener has finished executing",
    ],
    correctIndexes: [0, 1, 2],
    explanation:
      "emit() synchronously invokes listeners in registration order and returns a boolean (whether there were listeners), not a Promise; emitting an event with no listeners is a no-op, except that emitting 'error' with no listener throws.",
  },
  {
    id: "node-events-streams-4",
    question:
      "What does this code log? const emitter = new EventEmitter(); function greet(){ console.log('hi'); } emitter.on('wave', greet); emitter.off('wave', greet); emitter.emit('wave');",
    type: "single",
    options: [
      "Nothing is logged",
      "hi",
      "hi hi",
      "It throws an error because greet was never actually registered",
    ],
    correctIndexes: [0],
    explanation:
      "emitter.off() (an alias for removeListener()) detaches the given listener function from the event before emit() runs, so greet never fires and nothing is logged.",
  },
  {
    id: "node-events-streams-5",
    question:
      "What is the key difference between a listener added with emitter.once('event', handler) and one added with emitter.on('event', handler)?",
    type: "single",
    options: [
      "A once() listener automatically removes itself after it runs for the first time, while an on() listener keeps running on every future emit",
      "A once() listener runs before any on() listeners regardless of registration order",
      "once() listeners run asynchronously, while on() listeners always run synchronously",
      "There is no difference; once() is simply an alias for on()",
    ],
    correctIndexes: [0],
    explanation:
      "once() wraps the handler so that after its first invocation it unsubscribes itself, guaranteeing it fires at most one time; on() has no such self-removal and keeps listening indefinitely.",
  },
  {
    id: "node-events-streams-6",
    question:
      "What does this code log? let count = 0; emitter.once('tick', () => count++); emitter.emit('tick'); emitter.emit('tick'); emitter.emit('tick'); console.log(count);",
    type: "single",
    options: [
      "1",
      "3",
      "0",
      "It throws an error on the second emit() call",
    ],
    correctIndexes: [0],
    explanation:
      "once() detaches its listener right after the first time it runs, so only the first emit() increments count; the second and third emits have no listener left to call.",
  },
  {
    id: "node-events-streams-7",
    question:
      "Why would a developer write 'class Uploader extends EventEmitter { ... }' instead of a plain class?",
    type: "single",
    options: [
      "So instances of Uploader inherit on(), emit(), and once(), letting other code subscribe to custom events the upload process fires, such as 'progress' or 'done'",
      "Because extending EventEmitter is required for any class that has methods",
      "To automatically make every property of Uploader instances read-only",
      "So Uploader instances can be used directly as Readable streams",
    ],
    correctIndexes: [0],
    explanation:
      "Extending EventEmitter gives a class the on()/emit()/once() API, so it can broadcast custom events about its own activity and let other parts of the app react, without manually re-implementing a pub/sub mechanism.",
  },
  {
    id: "node-events-streams-8",
    question:
      "class Ticker extends EventEmitter { start(){ this.emit('tick', 1); } } const t = new Ticker(); t.on('tick', (n) => console.log('tick', n)); t.start(); What does this log?",
    type: "single",
    options: [
      "tick 1",
      "tick undefined",
      "Nothing, because start() cannot call emit() before the object is fully constructed",
      "It throws a TypeError because Ticker never calls super() explicitly",
    ],
    correctIndexes: [0],
    explanation:
      "Ticker inherits emit() from EventEmitter, so this.emit('tick', 1) fires the 'tick' event with 1 as an argument, which the registered listener receives and logs; a class extending another only needs an explicit super() call if it defines its own constructor.",
  },
  {
    id: "node-events-streams-9",
    question:
      "Which two events does a Readable stream emit as part of its classic 'flowing mode' read cycle?",
    type: "single",
    options: [
      "'data', fired once per chunk of available data, and 'end', fired once when there is no more data",
      "'read' and 'write'",
      "'start' and 'finish'",
      "'chunk' and 'close', fired for every byte read",
    ],
    correctIndexes: [0],
    explanation:
      "In flowing mode, a Readable stream emits a 'data' event for each chunk it produces, and an 'end' event once the underlying source is exhausted and no further data will arrive.",
  },
  {
    id: "node-events-streams-10",
    question:
      "Which pair of methods is used to send data into a Writable stream and then indicate that no more data will follow?",
    type: "single",
    options: [
      ".write() to send each chunk, and .end() to signal completion",
      ".send() to send each chunk, and .close() to signal completion",
      ".push() to send each chunk, and .flush() to signal completion",
      ".emit() to send each chunk, and .stop() to signal completion",
    ],
    correctIndexes: [0],
    explanation:
      "A Writable stream's .write() method accepts each chunk of data, and calling .end() tells the stream that writing is finished, optionally flushing a final chunk first.",
  },
  {
    id: "node-events-streams-11",
    question:
      "Why would you use a Readable stream to process a 2GB log file instead of fs.readFileSync()?",
    type: "single",
    options: [
      "The stream processes the file in small chunks as they become available, so the whole 2GB never has to sit in memory at once",
      "Readable streams are always faster than readFileSync for every file size, regardless of how the data is processed",
      "fs.readFileSync() cannot read files larger than 1GB under any circumstances",
      "Streams automatically compress the file's contents before handing them to your code",
    ],
    correctIndexes: [0],
    explanation:
      "The main advantage of a stream is processing data incrementally in bounded-size chunks, so memory usage stays low even for very large inputs; fs.readFileSync() instead reads the entire file into memory as one Buffer before returning.",
  },
  {
    id: "node-events-streams-12",
    question: "Which statements about Buffers in Node.js are true?",
    type: "multi",
    options: [
      "A Buffer represents a fixed-length chunk of raw binary data, such as bytes read from a file or socket",
      "Buffer.from('hi') creates a Buffer containing the raw bytes for the string 'hi', typically UTF-8 encoded",
      "Low-level I/O like file and socket reads typically produce Buffers first, which are then decoded into JS strings when text is needed",
      "A Buffer automatically resizes itself like a JavaScript array when new bytes are appended to it",
    ],
    correctIndexes: [0, 1, 2],
    explanation:
      "Buffers hold raw binary data as fixed-length byte sequences; Buffer.from() encodes a string into such bytes, and I/O APIs commonly hand back Buffers that get decoded into strings only when text is actually needed. Unlike arrays, a Buffer's length is fixed at creation and does not grow or shrink automatically.",
  },
  {
    id: "node-events-streams-13",
    question:
      "What does readableStream.pipe(writableStream) do, including its handling of back-pressure?",
    type: "single",
    options: [
      "It forwards data from the readable stream into the writable stream automatically, pausing the readable side if the writable side's internal buffer fills up so data isn't lost or overwhelmed",
      "It merges both streams into a single Buffer and returns that Buffer",
      "It only copies the first chunk of data from the readable stream, then stops",
      "It requires you to still call .write() manually for each chunk after pipe() is called",
    ],
    correctIndexes: [0],
    explanation:
      "pipe() automatically moves data from a readable source into a writable destination and manages back-pressure for you, pausing the source when the destination can't keep up and resuming it once the destination drains, so no manual .write() calls or flow-control code are needed.",
  },
  {
    id: "node-events-streams-14",
    question:
      "Which statements accurately describe how asynchronous patterns have evolved in Node.js?",
    type: "multi",
    options: [
      "Many older built-in and third-party APIs historically used the 'error-first callback' convention, where a callback's first parameter is an error (or null) and the second is the result",
      "util.promisify() can wrap an old-style error-first callback function so that calling it instead returns a Promise",
      "Newer built-in modules often ship promise-based variants directly, such as importing from 'fs/promises' instead of using the callback-based 'fs' module",
      "Once a codebase uses async/await, error-first callbacks and Promises can no longer be used anywhere in that same project",
    ],
    correctIndexes: [0, 1, 2],
    explanation:
      "Node's history moved from error-first callbacks, to util.promisify() as a bridge for wrapping old callback APIs into Promises, to modules now offering native Promise-based APIs like fs/promises; none of these patterns are mutually exclusive within a single codebase.",
  },
];
