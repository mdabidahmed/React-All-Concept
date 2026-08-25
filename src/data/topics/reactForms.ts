import type { Topic } from "../../types";

export const reactFormsTopic: Topic = {
  id: "react-forms",
  title: "React Forms",
  category: "Forms",
  shortExplanation:
    "A controlled component is a form input whose value is driven entirely by React state: the input's value comes from state and every keystroke calls onChange to update that state, keeping React as the single source of truth. The alternative, an uncontrolled input read via a ref, lets the DOM itself hold the current value instead.",
  longExplanation:
    "Plain HTML form elements keep their own internal state — an <input> remembers what the user typed regardless of anything in JavaScript — but React encourages a different model called controlled components, where the input's value prop is always set from React state and the onChange handler is the only thing that ever updates that state. This creates a tight, predictable loop: state determines what's on screen, the user's keystroke fires onChange, the handler computes new state, React re-renders, and the input's value prop reflects the new state, which visually looks unchanged to the user but is now fully driven by your code. Making state the single source of truth is what enables instant validation feedback, formatting input as the user types, disabling a submit button based on current values, or resetting an entire form to its initial state with one setState call, since the displayed value can never drift out of sync with what your application logic believes is true. The alternative is an uncontrolled input, where you don't pass a value prop at all and instead read the current value out of the DOM on demand using a ref (typically inputRef.current.value), which is closer to how plain HTML forms work and involves less code, but gives up the ability to react to every keystroke and makes validation or formatting logic harder to express. Uncontrolled inputs still have legitimate uses — file inputs, for instance, can only be read this way, and very simple 'read the value once on submit' forms sometimes don't need the overhead of controlled state — but controlled components are the conventional default in React because they make the UI a pure function of state rather than a mix of DOM state and React state that can silently disagree. A common gotcha when converting an input from uncontrolled to controlled is forgetting the value prop, or passing undefined during the initial render, which triggers a console warning about switching between controlled and uncontrolled.",
  examples: [
    {
      id: "single-controlled-input",
      title: "A single controlled text input",
      summary: "value comes from state, onChange updates that same state.",
      code: `function App() {
  const [name, setName] = useState("");

  return (
    <div style={{ display: "grid", gap: 8, maxWidth: 240 }}>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Your name"
      />
      <p style={{ margin: 0 }}>Hello, {name || "stranger"}!</p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "live-character-count",
      title: "Live character count and validation",
      summary: "State drives both the input's value and instant feedback about its length.",
      code: `function App() {
  const [username, setUsername] = useState("");
  const max = 12;
  const tooLong = username.length > max;

  return (
    <div style={{ display: "grid", gap: 6, maxWidth: 240 }}>
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        style={{
          padding: 6,
          borderRadius: 6,
          border: "1px solid " + (tooLong ? "#dc2626" : "#d1d5db"),
        }}
      />
      <small style={{ color: tooLong ? "#dc2626" : "#6b7280" }}>
        {username.length} / {max} characters
      </small>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "controlled-reset-button",
      title: "A controlled input with a reset button",
      summary: "Resetting the form is a single setState call back to the initial value.",
      code: `function App() {
  const initial = "";
  const [email, setEmail] = useState(initial);

  return (
    <div style={{ display: "grid", gap: 8, maxWidth: 240 }}>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <button onClick={() => setEmail(initial)}>Reset</button>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "uncontrolled-with-ref",
      title: "An uncontrolled input via useRef",
      summary: "The DOM holds the value directly; React only reads it on demand.",
      code: `function App() {
  const inputRef = useRef(null);
  const [lastSubmitted, setLastSubmitted] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setLastSubmitted(inputRef.current.value);
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "grid", gap: 8, maxWidth: 240 }}>
      <input ref={inputRef} defaultValue="" placeholder="Uncontrolled input" />
      <button type="submit">Read value</button>
      {lastSubmitted && <p style={{ margin: 0 }}>Last read: {lastSubmitted}</p>}
    </form>
  );
}

render(<App />);`,
    },
    {
      id: "two-fields-one-object",
      title: "Two fields sharing one state object",
      summary: "Why controlled forms matter: a single object stays the source of truth for every field.",
      code: `function App() {
  const [form, setForm] = useState({ firstName: "", lastName: "" });

  function updateField(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  return (
    <div style={{ display: "grid", gap: 8, maxWidth: 240 }}>
      <input
        value={form.firstName}
        onChange={(e) => updateField("firstName", e.target.value)}
        placeholder="First name"
      />
      <input
        value={form.lastName}
        onChange={(e) => updateField("lastName", e.target.value)}
        placeholder="Last name"
      />
      <p style={{ margin: 0 }}>
        Full name: {form.firstName} {form.lastName}
      </p>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
