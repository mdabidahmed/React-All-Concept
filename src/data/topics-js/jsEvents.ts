import type { Topic } from "../../types";

export const jsEventsTopic: Topic = {
  id: "js-events",
  title: "JavaScript Events",
  category: "DOM & Events",
  shortExplanation: `An **event** is something that happens on a page the browser tells JavaScript about — a click, a keystroke, a form submission, a page finishing loading, and many more.

- Old style: an \`onclick="..."\` attribute written directly in HTML — works, but considered ==legacy==
- Modern style: \`element.addEventListener("click", handler)\` — separates JS from markup, and allows *multiple* listeners on one element
- In React, \`onClick\` / \`onChange\` JSX props are React's own syntax for wiring up these same underlying browser events`,
  longExplanation: `An event is the browser's way of announcing that something happened: a user clicked a button, typed into a field, submitted a form, resized the window, or an image finished loading. JavaScript's job, most of the time, is reacting to these events — and there have been two very different ways to wire up that reaction over the language's history.

- The **legacy** approach writes the handler straight into an HTML attribute: \`<button onclick="doSomething()">Click</button>\`. This works, and you'll still see it in old code and tutorials, but it has real downsides: it mixes JavaScript logic directly into markup, it only allows **one** handler per element per event type (assigning a second overwrites the first), and it makes the handler function need to exist as a global, which gets messy fast in a larger app
- The **modern** approach is \`element.addEventListener("click", handlerFunction)\`, called from JavaScript rather than written into the HTML. This keeps behavior and structure separate, and — importantly — it supports attaching **multiple independent listeners** to the very same event on the very same element; each one fires, in the order it was added, without any of them overwriting the others. There's a matching \`element.removeEventListener("click", handlerFunction)\` to detach one later, which is why event handler functions are usually written as named functions rather than throwaway anonymous ones when they might need to be removed
- Both approaches ultimately respond to the exact same set of underlying browser events — \`click\`, \`input\`, \`change\`, \`submit\`, \`keydown\`, \`mouseover\`, and many more — \`addEventListener\` is simply the more capable, more maintainable way to hook into them
- Handler functions are called by the browser with an **event object** as their argument, carrying details about what happened — this is significant enough to get its own topic

In a React component, you don't typically call \`addEventListener\` yourself, and you don't write \`onclick="..."\` in a string either. Instead, JSX has its own built-in props — \`onClick\`, \`onChange\`, \`onSubmit\`, \`onKeyDown\`, and so on — that look similar to the legacy HTML attribute style but work completely differently under the hood: they aren't strings, they're real JavaScript function references, and React itself is the one calling \`addEventListener\` behind the scenes (in modern React, largely at the root of the app, using a technique called *event delegation*, where one real listener catches events for many elements and figures out which one triggered it). The important thing to understand is that this is not a different *kind* of event system — \`onClick={handleClick}\` in JSX and \`button.addEventListener("click", handleClick)\` in plain JavaScript are two different pieces of syntax pointing at the exact same underlying browser click event. Learning the vanilla \`addEventListener\` mechanics genuinely explains what JSX's event props are a convenient shorthand for.

The examples below start with real, working \`addEventListener\` calls (attached via \`useRef\` + \`useEffect\`, with the required cleanup that calls \`removeEventListener\` when the component unmounts — skipping that cleanup is a common source of memory leaks and duplicate handlers in real apps), then bridge to the familiar JSX \`onClick\` style so the connection between the two is explicit rather than assumed.`,
  examples: [
    {
      id: "add-event-listener-vanilla",
      title: "addEventListener, genuinely wired up",
      summary: "A real vanilla event listener attached via useRef + useEffect, with proper cleanup on unmount.",
      code: `function App() {
  const buttonRef = useRef(null);
  const [clicks, setClicks] = useState(0);

  useEffect(() => {
    const button = buttonRef.current;
    function handleClick() {
      setClicks((c) => c + 1);
    }
    button.addEventListener("click", handleClick);
    return () => button.removeEventListener("click", handleClick);
  }, []);

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <button ref={buttonRef}>Click me (wired with addEventListener)</button>
      <p>Clicked <strong>{clicks}</strong> time{clicks === 1 ? "" : "s"}.</p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "multiple-listeners-one-element",
      title: "Multiple independent listeners on one element",
      summary: "addEventListener lets two completely separate handlers both react to the same click, unlike onclick=\"...\".",
      code: `function App() {
  const buttonRef = useRef(null);
  const [log, setLog] = useState([]);

  function print(value) {
    setLog((prev) => [...prev, value]);
  }

  useEffect(() => {
    const button = buttonRef.current;
    function handlerOne() {
      print("Listener #1 saw the click");
    }
    function handlerTwo() {
      print("Listener #2 also saw the same click");
    }
    button.addEventListener("click", handlerOne);
    button.addEventListener("click", handlerTwo);
    return () => {
      button.removeEventListener("click", handlerOne);
      button.removeEventListener("click", handlerTwo);
    };
  }, []);

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button ref={buttonRef}>Click (two listeners attached)</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 80 }}>
        {log.length === 0 ? "// click the button above" : log.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "legacy-onclick-illustrated",
      title: "The legacy onclick=\"...\" style, for comparison",
      summary: "Shown as reference only — this is the old inline-attribute style you'll still see in older code and tutorials.",
      code: `function App() {
  const legacyExample = "<button onclick=\\"handleClick()\\">Click</button>";
  const modernExample = "button.addEventListener('click', handleClick)";

  return (
    <div style={{ display: "grid", gap: 10, maxWidth: 420 }}>
      <div>
        <p style={{ margin: "0 0 4px", fontSize: 13, color: "#6b7280" }}>Legacy (inline attribute, one handler max):</p>
        <pre style={{ background: "#111827", color: "#fca5a5", padding: 10, borderRadius: 6, margin: 0 }}>{legacyExample}</pre>
      </div>
      <div>
        <p style={{ margin: "0 0 4px", fontSize: 13, color: "#6b7280" }}>Modern (separate, supports multiple handlers):</p>
        <pre style={{ background: "#111827", color: "#d1fae5", padding: 10, borderRadius: 6, margin: 0 }}>{modernExample}</pre>
      </div>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "onclick-jsx-prop",
      title: "React's onClick prop: the same event, different syntax",
      summary: "This is what most React code actually uses day to day — the same click event, wired the React way.",
      code: `function App() {
  const [message, setMessage] = useState("Not clicked yet");

  function handleClick() {
    setMessage("Clicked! React attached the real listener for you.");
  }

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <button onClick={handleClick}>Click me (JSX onClick)</button>
      <p>{message}</p>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        Under the hood this is still a real browser click event — onClick is JSX's syntax for hooking into it.
      </p>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
