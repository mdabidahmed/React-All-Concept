import type { QuizQuestion } from "../../types/quiz";

export const htmlApisQuestions: QuizQuestion[] = [
  {
    id: "html-apis-1",
    question: "In the context of the browser, what does the term \"Web API\" generally refer to?",
    type: "single",
    options: [
      "A capability the browser exposes to JavaScript beyond the core language and the DOM, such as geolocation or storage",
      "A server-side API that only backend code written in JavaScript can call",
      "A synonym for the HTML specification itself",
      "A type of CSS selector used to target specific elements",
    ],
    correctIndexes: [0],
    explanation:
      "Web APIs are browser-provided features accessible from JavaScript, such as navigator.geolocation, localStorage, or Worker, that go beyond the core JavaScript language and basic DOM manipulation.",
  },
  {
    id: "html-apis-2",
    question: "What does calling navigator.geolocation.getCurrentPosition(success, error) do?",
    type: "single",
    options: [
      "It asks the browser to determine the user's current location, prompting the user for permission if it hasn't already been granted",
      "It immediately returns the user's location without ever requiring permission",
      "It sets the user's location in the address bar's search suggestions",
      "It downloads a map image showing the user's current location",
    ],
    correctIndexes: [0],
    explanation:
      "The Geolocation API is permission-gated: calling getCurrentPosition triggers a browser permission prompt if needed, and only calls the success or error callback once the user responds and a location is determined (or fails).",
  },
  {
    id: "html-apis-3",
    question: "Which statement correctly distinguishes localStorage from sessionStorage?",
    type: "single",
    options: [
      "localStorage persists until explicitly cleared, while sessionStorage is cleared automatically when the browser tab is closed",
      "sessionStorage persists until explicitly cleared, while localStorage is cleared when the browser tab is closed",
      "They behave identically, with the only difference being their variable name",
      "localStorage is only accessible from a Web Worker, not from the main page script",
    ],
    correctIndexes: [0],
    explanation:
      "localStorage data survives across browser restarts until code or the user clears it, whereas sessionStorage data is scoped to a single tab and disappears once that tab is closed.",
  },
  {
    id: "html-apis-4",
    question: "Which methods are part of the Web Storage API for reading and writing key-value data?",
    type: "multi",
    options: [
      "setItem",
      "getItem",
      "removeItem",
      "fetchItem",
    ],
    correctIndexes: [0, 1, 2],
    explanation:
      "setItem, getItem, and removeItem are real Web Storage methods for writing, reading, and deleting a stored key; fetchItem is not part of the Storage interface.",
  },
  {
    id: "html-apis-5",
    question: "A developer stores a user's saved preferences with sessionStorage.setItem(\"theme\", \"dark\"). What happens to that value after the user closes the browser tab and reopens the site in a brand new tab later?",
    type: "single",
    options: [
      "The stored value is gone, because sessionStorage is scoped to that specific tab and does not survive it closing",
      "The value is still available in the new tab, identical to how localStorage behaves",
      "The value is automatically copied to localStorage when the tab closes",
      "The value persists only if the user is signed into a browser account",
    ],
    correctIndexes: [0],
    explanation:
      "sessionStorage is tied to the lifetime of a specific tab (or window); once that tab closes, its sessionStorage data is discarded and a new tab starts with an empty store.",
  },
  {
    id: "html-apis-6",
    question: "What must be added to the draggable element (or a global default) for native HTML drag-and-drop to allow an element to be picked up by the mouse?",
    type: "single",
    options: [
      "The draggable=\"true\" attribute must be set on the element",
      "Drag-and-drop works on every element by default with no attribute needed",
      "The element must be wrapped in a <form> tag",
      "The element must have an onclick handler defined",
    ],
    correctIndexes: [0],
    explanation:
      "Most elements are not draggable by default (aside from a few like images and links), so the draggable=\"true\" attribute is generally required to make an arbitrary element draggable.",
  },
  {
    id: "html-apis-7",
    question: "In the native HTML Drag and Drop API, why must the ondragover handler on a drop target call event.preventDefault()?",
    type: "single",
    options: [
      "Because the browser's default behavior is to disallow dropping, so preventing that default is required to signal the element as a valid drop target",
      "Because it is only a best-practice convention with no actual functional effect",
      "Because it stops the dragged element from being visible during the drag",
      "Because it is required to start the drag operation in the first place",
    ],
    correctIndexes: [0],
    explanation:
      "By default, most elements do not accept drops; calling preventDefault() inside ondragover overrides that default so the browser allows a drop event to fire on that element.",
  },
  {
    id: "html-apis-8",
    question: "Which event handlers are part of the native HTML Drag and Drop workflow?",
    type: "multi",
    options: [
      "ondragstart, fired on the element being dragged when the drag begins",
      "ondragover, fired repeatedly on a potential drop target while an item is dragged over it",
      "ondrop, fired on the target element when the dragged item is released",
      "onmutation, fired whenever any element on the page moves position",
    ],
    correctIndexes: [0, 1, 2],
    explanation:
      "ondragstart, ondragover, and ondrop are real events in the Drag and Drop API; onmutation is not a standard drag-and-drop or DOM event.",
  },
  {
    id: "html-apis-9",
    question: "A developer implements drag-and-drop but forgets to call preventDefault() in the ondragover handler. What is the observed result?",
    type: "single",
    options: [
      "Dropping the element onto the target does not work, because the browser's default \"disallow drop\" behavior remains in effect",
      "The drag-and-drop still works exactly as intended, since preventDefault() is purely optional styling",
      "The page throws a JavaScript error as soon as the drag starts",
      "The dragged element becomes permanently undraggable for the rest of the session",
    ],
    correctIndexes: [0],
    explanation:
      "Without calling preventDefault() in ondragover, the browser keeps its default behavior of rejecting the drop, so the drop event never successfully completes on that target.",
  },
  {
    id: "html-apis-10",
    question: "What is the main purpose of a Web Worker?",
    type: "single",
    options: [
      "To run JavaScript on a background thread so heavy computation does not block the main thread's UI updates",
      "To directly read and modify the page's DOM from a separate thread for better performance",
      "To replace fetch as the standard way to make network requests",
      "To automatically parallelize all JavaScript in a page without any code changes",
    ],
    correctIndexes: [0],
    explanation:
      "A Web Worker runs script on a separate background thread, keeping expensive computation from freezing the main thread that handles rendering and user interaction.",
  },
  {
    id: "html-apis-11",
    question: "Why can a Web Worker not directly access or modify the page's DOM?",
    type: "single",
    options: [
      "It runs on a separate thread from the main thread, and the DOM is only safely accessible from the main thread",
      "It can access the DOM freely, just like regular page scripts",
      "DOM access from a worker is possible but only for reading, never writing",
      "Workers are blocked from the DOM only in browsers that don't support Web Workers",
    ],
    correctIndexes: [0],
    explanation:
      "Web Workers run in an isolated background thread without access to the window or document objects, since the DOM is not thread-safe and is confined to the main thread.",
  },
  {
    id: "html-apis-12",
    question: "How does a Web Worker typically exchange data with the main script that created it?",
    type: "single",
    options: [
      "By sending messages with postMessage and receiving them through an onmessage handler on each side",
      "By directly reading and writing shared JavaScript variables declared in the main script",
      "By writing values into localStorage, which is the only supported communication channel",
      "By calling functions defined in the main script directly, as if they were in the same scope",
    ],
    correctIndexes: [0],
    explanation:
      "Workers communicate with the main thread by passing messages: the sender calls postMessage, and the receiver handles the data in an onmessage event listener, since they do not share memory or variables directly.",
  },
  {
    id: "html-apis-13",
    question: "Which scenarios describe genuinely appropriate uses of a Web Worker?",
    type: "multi",
    options: [
      "Performing a computationally expensive data transformation on a large dataset without freezing the page's UI",
      "Directly updating a <div> element's text content from inside the worker's script",
      "Running a complex image-processing algorithm in the background while the main thread stays responsive",
      "Offloading a long-running calculation so scrolling and animations on the page keep working smoothly",
    ],
    correctIndexes: [0, 2, 3],
    explanation:
      "Web Workers are appropriate for offloading heavy computation to keep the UI responsive, but they cannot touch the DOM directly; any UI update must be relayed back to the main thread via messages.",
  },
  {
    id: "html-apis-14",
    question: "What does EventSource, used for Server-Sent Events, provide?",
    type: "single",
    options: [
      "A one-way channel over a single long-lived connection that lets the server push updates to the client as they occur",
      "A two-way channel where the client and server can each send messages to the other at any time",
      "A way to send a single HTTP request and receive a single response, identical to fetch",
      "A mechanism for the browser to push notifications to the server's operating system",
    ],
    correctIndexes: [0],
    explanation:
      "Server-Sent Events, accessed through EventSource, open a single persistent connection over which the server can continuously push new events to the client, but the client cannot send data back over that same connection.",
  },
  {
    id: "html-apis-15",
    question: "How does a WebSocket connection differ from a Server-Sent Events (EventSource) connection?",
    type: "single",
    options: [
      "A WebSocket supports two-way communication, allowing both client and server to send messages, while Server-Sent Events only allow the server to push data to the client",
      "A WebSocket only allows the client to send data, while Server-Sent Events allow both directions",
      "They are functionally identical, differing only in which JavaScript object name is used",
      "Server-Sent Events require a browser plug-in, while WebSockets do not",
    ],
    correctIndexes: [0],
    explanation:
      "WebSockets establish a full-duplex connection where either side can send messages at any time, whereas Server-Sent Events are strictly one-way, from server to client, over a single long-lived HTTP connection.",
  },
];
