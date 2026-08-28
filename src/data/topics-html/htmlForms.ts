import type { Topic } from "../../types";

export const htmlFormsTopic: Topic = {
  id: "html-forms",
  title: "HTML Forms",
  category: "HTML Forms",
  shortExplanation: `A \`<form>\` groups related input controls together so a user's input can be collected and handled as one unit.

- \`<form>\` wraps inputs, labels, and a submit control
- \`onSubmit\` fires when the form is submitted (pressing Enter in a field, or clicking a \`type="submit"\` button)
- In plain HTML, submitting a form normally triggers a full page reload/navigation — calling \`event.preventDefault()\` stops that
- In this JSX sandbox, inputs are written as **controlled components** — their \`value\` comes from \`useState\`, kept in sync via \`onChange\``,
  longExplanation: `A \`<form>\` element exists to group a set of related controls — text fields, checkboxes, dropdowns, buttons — so the browser (or, in a React app, your own code) can treat everything inside it as one submission.

- Every field inside a \`<form>\` becomes part of that form's data. In plain HTML, when the form is submitted, the browser gathers every field's current value and sends it somewhere (see the next topic on \`action\`/\`method\`)
- \`<form onSubmit={handleSubmit}>\` — the \`onSubmit\` handler runs when the form is submitted, whether that's from clicking a \`<button type="submit">\` or pressing **Enter** while focus is inside a text field
- A real \`<form>\`'s default behavior is to *navigate* — reload the current page, or go to whatever URL \`action\` points to. That's almost never what a JavaScript-driven app wants, so the handler almost always starts with \`event.preventDefault()\` to cancel that default navigation and keep the page as-is
- In plain HTML/vanilla JavaScript, form fields are commonly left **uncontrolled** — the DOM holds each input's value, and code reads it at submit time via something like \`document.querySelector("#email").value\`. In this React-based sandbox, the idiomatic approach is a ==controlled component==: each input's \`value\` comes from \`useState\`, and \`onChange\` keeps that state updated on every keystroke — so the current values are already sitting in state by the time \`onSubmit\` runs, no querying the DOM required
- Grouping fields inside one \`<form>\` also matters for accessibility and semantics — screen readers and browser autofill both use the \`<form>\` boundary to understand what belongs together

The rest of the HTML Forms topics build on this same shape: a \`<form>\`, some inputs inside it, and an \`onSubmit\` handler that does something with the collected values.`,
  examples: [
    {
      id: "basic-form-with-submit",
      title: "A basic form with two fields",
      summary: "Controlled text inputs collected into state, revealed only after the form is submitted.",
      code: `function App() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [submitted, setSubmitted] = useState(null);

  function handleSubmit(event) {
    event.preventDefault();
    setSubmitted({ firstName, lastName });
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "grid", gap: 8, maxWidth: 260 }}>
      <input
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        placeholder="First name"
      />
      <input
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        placeholder="Last name"
      />
      <button type="submit">Submit</button>
      {submitted && (
        <p style={{ margin: 0 }}>
          Submitted: {submitted.firstName} {submitted.lastName}
        </p>
      )}
    </form>
  );
}

render(<App />);`,
    },
    {
      id: "submit-with-enter-key",
      title: "Submitting by pressing Enter",
      summary: "Pressing Enter inside a text field submits the form, exactly like clicking the submit button.",
      code: `function App() {
  const [message, setMessage] = useState("");
  const [log, setLog] = useState([]);

  function handleSubmit(event) {
    event.preventDefault();
    if (!message.trim()) return;
    setLog((prev) => [...prev, message]);
    setMessage("");
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "grid", gap: 8, maxWidth: 280 }}>
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message and press Enter"
      />
      <ul style={{ margin: 0, paddingLeft: 20 }}>
        {log.map((entry, i) => (
          <li key={i}>{entry}</li>
        ))}
      </ul>
    </form>
  );
}

render(<App />);`,
    },
    {
      id: "why-prevent-default",
      title: "What preventDefault stops",
      summary: "Without preventDefault, a real HTML form would reload the page — this demo shows the guard in place.",
      code: `function App() {
  const [attempts, setAttempts] = useState(0);
  const [defaultPrevented, setDefaultPrevented] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    setDefaultPrevented(event.defaultPrevented);
    setAttempts((a) => a + 1);
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "grid", gap: 8, maxWidth: 280 }}>
      <button type="submit">Submit the form</button>
      <p style={{ margin: 0, fontSize: 13, color: "#6b7280" }}>
        Submitted {attempts} time(s). Default navigation prevented:{" "}
        {defaultPrevented ? "yes" : "no"}
      </p>
      <p style={{ margin: 0, fontSize: 12, color: "#6b7280" }}>
        In a plain HTML page with no {"event.preventDefault()"}, clicking submit would reload
        the page (or navigate to the form's \`action\` URL) instead of just running this handler.
      </p>
    </form>
  );
}

render(<App />);`,
    },
  ],
};
