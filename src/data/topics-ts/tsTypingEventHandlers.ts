import type { Topic } from "../../types";

export const tsTypingEventHandlersTopic: Topic = {
  id: "ts-typing-event-handlers",
  title: "Typing Event Handlers",
  category: "TypeScript with React",
  shortExplanation: `React ships its own specific event types — \`React.ChangeEvent<HTMLInputElement>\`, \`React.MouseEvent<HTMLButtonElement>\`, \`React.FormEvent<HTMLFormElement>\` — each one generic over the exact DOM element the handler is attached to.

- The generic type argument is what tells TypeScript what \`event.target\` actually is: \`React.ChangeEvent<HTMLInputElement>\` means \`event.target\` is an \`HTMLInputElement\`, so \`event.target.value\` is a known, safe \`string\`

- Getting the element type wrong (or leaving it off) either loses useful properties or lets nonexistent ones slip through unchecked

- A controlled \`<input>\` is the classic example: the \`onChange\` handler's event type is what makes \`event.target.value\` type-safe`,
  longExplanation: `Every DOM event handler in React receives a *synthetic* event object — React's own cross-browser wrapper around the underlying native browser event. TypeScript's React types provide a specific type for each kind of synthetic event, and nearly every one of them is **generic**, parameterized by the exact HTML element the handler is attached to. Getting this generic type argument right is what makes \`event.target\` (and similar properties) actually usable with full type safety, rather than being typed so loosely that real mistakes slip through.

- **\`React.ChangeEvent<T>\` types an \`onChange\` handler**, most commonly on form elements: \`function handleChange(event: React.ChangeEvent<HTMLInputElement>) { const value = event.target.value; }\`. The \`<HTMLInputElement>\` argument is what tells TypeScript \`event.target\` is specifically an \`<input>\` element — which is why \`.value\` is available and typed as \`string\`. A \`<select>\`'s change handler instead uses \`React.ChangeEvent<HTMLSelectElement>\`, and a \`<textarea>\`'s uses \`React.ChangeEvent<HTMLTextAreaElement>\` — each one unlocks the properties specific to that element
- **\`React.MouseEvent<T>\` types click (and other mouse) handlers**: \`function handleClick(event: React.MouseEvent<HTMLButtonElement>) { ... }\`. Beyond just knowing the target element's type, this also gives access to mouse-specific properties correctly typed — \`event.clientX\`, \`event.clientY\`, \`event.shiftKey\`, and so on — all without needing to check whether those properties even exist on the event object first
- **\`React.FormEvent<T>\` types a form's \`onSubmit\` handler**: \`function handleSubmit(event: React.FormEvent<HTMLFormElement>) { event.preventDefault(); }\`. Calling \`event.preventDefault()\` to stop the browser's default full-page-reload form submission is by far the most common reason this handler exists at all, and it's available on every synthetic event type, not just this one
- **Why the generic argument specifically matters:** without it — writing a bare \`React.ChangeEvent\` with no type argument, or worse, typing the parameter as \`any\` — \`event.target\` would only be known generically, without the specific properties belonging to *that* particular kind of element. \`event.target.value\` might not be recognized as existing at all, or might be typed so loosely (as \`EventTarget\`, the DOM's generic base type) that using \`.value\` on it is flagged as an error, since a generic \`EventTarget\` doesn't guarantee a \`.value\` property exists. Supplying the correct, specific element type is what unlocks exactly the right subset of properties, no more and no less
- **A related but distinct type is \`event.currentTarget\` versus \`event.target\`.** \`event.currentTarget\` is always the element the handler was actually attached to, correctly typed by the generic argument; \`event.target\` is whatever element originally triggered the event, which — thanks to event bubbling — could technically be a *descendant* of the element the handler is on. For most simple form inputs and buttons the two are the same element, but for handlers attached higher up in the tree (a container div, say), \`currentTarget\` is usually the more reliable one to reach for
- **Inline handlers defined directly in JSX often don't need an explicit type annotation at all.** Writing \`<input onChange={(e) => setValue(e.target.value)} />\` lets TypeScript infer \`e\`'s type automatically from the \`onChange\` prop's own declared type on the \`<input>\` element — this is *contextual typing*, and it's why a lot of everyday React code never manually writes out \`React.ChangeEvent<HTMLInputElement>\` at all. The explicit type becomes necessary specifically when the handler is defined as its own separate named function *outside* the JSX, since there's no surrounding context there for TypeScript to infer the parameter's type from

Getting comfortable with a small handful of these — \`ChangeEvent\`, \`MouseEvent\`, \`FormEvent\`, occasionally \`KeyboardEvent\` and \`FocusEvent\` — covers the overwhelming majority of real event handlers a typical React app writes, and the pattern is always the same: pick the type matching the event, parameterize it with the specific HTML element the handler lives on, and the properties needed inside the handler come out correctly typed.`,
  examples: [
    {
      id: "controlled-input-onchange",
      title: "A controlled input's onChange handler",
      summary: "React.ChangeEvent<HTMLInputElement> makes event.target.value a known, safe string.",
      code: `function App() {
  const [name, setName] = useState("");

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setName(event.target.value);
  }

  return (
    <div style={{ display: "grid", gap: 8 }}>
      <input value={name} onChange={handleChange} placeholder="Type your name" />
      <p>Hello, {name || "stranger"}!</p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "button-click-mouseevent",
      title: "Typing a button's onClick handler",
      summary: "React.MouseEvent<HTMLButtonElement> gives typed access to mouse-specific event properties.",
      code: `function App() {
  const [lastClickInfo, setLastClickInfo] = useState("No clicks yet");

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    setLastClickInfo(
      "Clicked at (" + event.clientX + ", " + event.clientY + ")" +
        (event.shiftKey ? " with Shift held" : "")
    );
  }

  return (
    <div style={{ display: "grid", gap: 8 }}>
      <button onClick={handleClick}>Click me (try holding Shift)</button>
      <p>{lastClickInfo}</p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "form-submit-formevent",
      title: "Typing a form's onSubmit handler",
      summary: "React.FormEvent<HTMLFormElement> is what makes event.preventDefault() available and typed.",
      code: `function App() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState<string | null>(null);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(email);
  }

  return (
    <div style={{ display: "grid", gap: 8 }}>
      <form onSubmit={handleSubmit} style={{ display: "flex", gap: 8 }}>
        <input
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
          placeholder="you@example.com"
        />
        <button type="submit">Subscribe</button>
      </form>
      {submitted && <p>Subscribed: {submitted}</p>}
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "inline-vs-named-handler-inference",
      title: "Inline handlers vs. named handler functions",
      summary: "Inline JSX handlers infer their event type automatically; named functions need it written out.",
      code: `function App() {
  const [text, setText] = useState("");

  // Inline: TypeScript infers "e" from the onChange prop's own type — no annotation needed.
  const inlineHandler = <input value={text} onChange={(e) => setText(e.target.value)} />;

  // Named function, defined outside JSX: needs the type written explicitly.
  function handleTextChange(event: React.ChangeEvent<HTMLInputElement>) {
    setText(event.target.value);
  }

  return (
    <div style={{ display: "grid", gap: 8 }}>
      {inlineHandler}
      <input value={text} onChange={handleTextChange} placeholder="Same behavior, named handler" />
      <p>Current text: {text}</p>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
