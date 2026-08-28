import type { Topic } from "../../types";

export const jsEventObjectTopic: Topic = {
  id: "js-event-object",
  title: "JavaScript The Event Object",
  category: "DOM & Events",
  shortExplanation: `Every event handler is automatically called with an **event object** describing exactly what happened — it's not optional to receive, only optional to use.

- \`event.target\` — the actual element the event happened on
- \`event.type\` — the event's name as a string, e.g. \`"click"\`
- \`event.preventDefault()\` — cancels the browser's default reaction (like a form reloading the page on submit)
- \`event.stopPropagation()\` — stops the event from ==bubbling== further up to ancestor elements`,
  longExplanation: `Whenever a browser fires an event and calls a handler function for it, it always passes that handler one argument: the **event object**. Every single handler receives one, whether or not the function bothers to declare a parameter for it — ignoring it just means the extra information goes unused, not that it wasn't sent.

- \`event.target\` is the actual DOM element the event originated from — the specific button that was clicked, the specific input that was typed into. This matters a lot when one handler is shared across several elements (attached to a parent, for instance): \`event.target\` is how the handler figures out *which* element the browser is actually reacting to
- \`event.type\` is a plain string naming the event that fired — \`"click"\`, \`"submit"\`, \`"keydown"\`, and so on. Useful when the same function is registered as the handler for more than one kind of event, and needs to branch on which one just happened
- \`event.preventDefault()\` cancels whatever the browser would otherwise have done automatically in response to that event. The textbook example is a form's \`submit\` event: by default, submitting a form makes the browser navigate (often reloading the page or going to the form's \`action\` URL) — calling \`event.preventDefault()\` inside the \`submit\` handler stops that navigation so the page can instead handle the submitted data itself, with JavaScript, without a reload. Other common uses: preventing a link's default navigation, or preventing a checkbox from actually toggling until some condition is checked
- \`event.stopPropagation()\` addresses a different behavior entirely: **bubbling**. When an event fires on an element, it doesn't just call that one element's handler and stop — it then "bubbles" upward, triggering matching handlers on that element's parent, then *its* parent, and so on up to \`document\`. This is deliberate and usually convenient (it's what makes event delegation possible — one handler on a parent can catch events from many children), but sometimes a specific handler wants to be the last word on an event and stop it from continuing upward. Calling \`event.stopPropagation()\` inside a handler does exactly that: ancestor handlers for that same event simply never run for this particular occurrence
- \`preventDefault()\` and \`stopPropagation()\` solve two unrelated problems and are often confused: \`preventDefault()\` is about the **browser's own default behavior** for that event (like navigating or reloading); \`stopPropagation()\` is about **other handlers further up the tree** getting a turn at all. A handler can call either one, both, or neither, independently

In React, the object a JSX handler like \`onClick={(e) => ...}\` receives is a real event object with this exact same API (\`.target\`, \`.type\`, \`.preventDefault()\`, \`.stopPropagation()\`) — React wraps the native browser event in a lightweight synthetic layer for cross-browser consistency, but every property and method described above works exactly the way it's described here. Code written against \`event.preventDefault()\` or \`event.target.value\` in a React \`onChange\` handler is working with the same real browser event object a plain vanilla script would receive from \`addEventListener\`, not a simulation of it.`,
  examples: [
    {
      id: "target-and-type",
      title: "Reading event.target and event.type",
      summary: "Every keystroke's real event object carries both — genuinely inspected here, not simulated.",
      code: `function App() {
  const [log, setLog] = useState([]);

  function print(value) {
    setLog((prev) => [...prev, String(value)]);
  }

  function handleChange(e) {
    print("event.type: " + e.type);
    print("event.target.tagName: " + e.target.tagName);
    print("event.target.value: " + e.target.value);
  }

  return (
    <div style={{ display: "grid", gap: 10, maxWidth: 300 }}>
      <input onChange={handleChange} placeholder="Type something" />
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 90 }}>
        {log.length === 0 ? "// type in the input above" : log.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "prevent-default-form-submit",
      title: "preventDefault() stopping a real page reload",
      summary: "Without preventDefault, submitting this form would genuinely reload the page — this stops it.",
      code: `function App() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "grid", gap: 10, maxWidth: 260 }}>
      <input placeholder="Type anything" />
      <button type="submit">Submit form</button>
      <p style={{ color: submitted ? "#15803d" : "#6b7280", fontSize: 13 }}>
        {submitted
          ? "Submitted without a reload — e.preventDefault() stopped the browser's default behavior."
          : "Submit to see preventDefault() in action."}
      </p>
    </form>
  );
}

render(<App />);`,
    },
    {
      id: "stop-propagation-bubbling",
      title: "stopPropagation() interrupting a bubbling click",
      summary: "Toggle whether the inner box stops propagation to see the outer handler stop (or keep) firing.",
      code: `function App() {
  const [stopIt, setStopIt] = useState(false);
  const [log, setLog] = useState([]);

  function print(value) {
    setLog((prev) => [...prev, value]);
  }

  function handleOuterClick() {
    print("Outer div's click handler ran");
  }

  function handleInnerClick(e) {
    if (stopIt) e.stopPropagation();
    print("Inner box's click handler ran" + (stopIt ? " (and stopped propagation)" : ""));
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <label style={{ fontSize: 13 }}>
        <input type="checkbox" checked={stopIt} onChange={(e) => setStopIt(e.target.checked)} /> Call stopPropagation() on inner click
      </label>
      <div onClick={handleOuterClick} style={{ padding: 20, background: "#e0e7ff", borderRadius: 8 }}>
        Outer div
        <div onClick={handleInnerClick} style={{ marginTop: 10, padding: 20, background: "#c7d2fe", borderRadius: 8 }}>
          Inner box (click me)
        </div>
      </div>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 80 }}>
        {log.length === 0 ? "// click the inner box" : log.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "bubbling-order",
      title: "Bubbling order: target first, then each ancestor",
      summary: "One click on the innermost box fires three handlers, in order from the target outward.",
      code: `function App() {
  const [log, setLog] = useState([]);

  function print(value) {
    setLog((prev) => [...prev, value]);
  }

  function reset() {
    setLog([]);
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={reset}>Reset log</button>
      <div onClick={() => print("3. Grandparent handler ran")} style={{ padding: 24, background: "#fee2e2", borderRadius: 8 }}>
        Grandparent
        <div onClick={() => print("2. Parent handler ran")} style={{ marginTop: 10, padding: 24, background: "#fecaca", borderRadius: 8 }}>
          Parent
          <div onClick={() => print("1. Target (innermost) handler ran")} style={{ marginTop: 10, padding: 24, background: "#fca5a5", borderRadius: 8 }}>
            Click me (target)
          </div>
        </div>
      </div>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 80 }}>
        {log.length === 0 ? "// click the innermost box" : log.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
