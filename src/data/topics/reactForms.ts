import type { Topic } from "../../types";
import { ReactFormsDiagram } from "../../components/molecules/Diagrams/ReactFormsDiagram";

export const reactFormsTopic: Topic = {
  id: "react-forms",
  title: "React Forms",
  category: "Forms",
  shortExplanation: `A ==controlled component== is a form input whose value is driven entirely by React *state* — every keystroke calls \`onChange\` to update that state, keeping React as the single source of truth.

- The input's \`value\` prop comes from **state**
- \`onChange\` is the only thing that ever updates that state
- An **uncontrolled** input (read via a \`ref\`) is the alternative — the DOM holds the value instead`,
  longExplanation: `Plain HTML form elements keep their own internal state — an \`<input>\` remembers what the user typed regardless of anything in JavaScript. React's ==controlled components== model inverts that: the input's \`value\` prop is always set from state, and \`onChange\` is the *only* thing that ever updates it.

- State determines what's on screen; a keystroke fires \`onChange\`, which computes new state and triggers a re-render — the input's value always reflects state, even though nothing visibly changes for the user beyond what they typed
- Because the displayed value can never drift from what your code believes is true, this enables instant validation, formatting as-you-type, a submit button disabled by current values, or resetting a whole form with one \`setState\` call
- The alternative is an **uncontrolled** input: skip \`value\` and read the current value from the DOM on demand via a \`ref\` (\`inputRef.current.value\`)
- Uncontrolled inputs are closer to plain HTML and involve less code, but give up per-keystroke reactivity — file inputs can *only* be read this way, and very simple "read once on submit" forms sometimes don't need controlled state
- Controlled components are the conventional default, since they make the UI a pure function of state instead of a mix of DOM state and React state that can silently disagree

A common gotcha when converting an input from uncontrolled to controlled is forgetting the \`value\` prop, or passing \`undefined\` on the first render — React warns about switching between controlled and uncontrolled.`,
  diagram: ReactFormsDiagram,
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
