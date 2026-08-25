import type { Topic } from "../../types";

export const reactFormsSubmitTopic: Topic = {
  id: "react-forms-submit",
  title: "React Forms Submit",
  category: "Forms",
  shortExplanation:
    "Form submission belongs on the <form> element's onSubmit handler, not on the submit button's onClick, so that pressing Enter inside any field also triggers it. The handler almost always starts with event.preventDefault() to stop the browser's default full-page reload, and typically validates the data and gives the user feedback before, during, and after the submission.",
  longExplanation:
    "A native HTML <form> has a default behavior: submitting it (by clicking a submit button or pressing Enter in a text field) sends a request and reloads the page, which is almost never what a single-page React app wants. The fix is to attach an onSubmit handler to the <form> element itself, rather than an onClick handler to the submit button, because onSubmit fires for every way a form can be submitted — clicking the button, pressing Enter, or calling form.requestSubmit() — while a button's onClick only fires for that one button and misses the Enter-key case entirely. The very first line of a submit handler is almost always event.preventDefault(), which cancels the browser's default navigation and hands control of what happens next entirely to your JavaScript; skipping it causes the page to visibly flash and reload, wiping out component state and making it look like the app is broken even though the logic that follows would otherwise have worked fine. Once the default is prevented, a typical handler validates the current form state and bails out early (often by returning, or by setting an error message) if something is missing or malformed, so that invalid data never gets 'submitted' in the first place. Beyond validation, good forms give the user feedback about what's happening: a temporary success message once submission completes, and — especially for anything that simulates or performs a network request — a disabled submit button paired with a loading label like 'Submitting...' so users don't double-click and accidentally submit twice while a request is in flight. These are UI-state concerns exactly like any other piece of component state (a boolean isSubmitting, a string error, a boolean submitted), managed with the same useState patterns used everywhere else in React, which is what makes forms feel like a natural extension of the rest of the component model rather than a special case.",
  examples: [
    {
      id: "basic-onsubmit-preventdefault",
      title: "Basic onSubmit + preventDefault",
      summary: "onSubmit lives on the form, and preventDefault stops the page reload.",
      code: `function App() {
  const [value, setValue] = useState("");
  const [result, setResult] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    setResult("Submitted: " + value);
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "grid", gap: 8, maxWidth: 240 }}>
      <input value={value} onChange={(e) => setValue(e.target.value)} placeholder="Type something" />
      <button type="submit">Submit</button>
      {result && <p style={{ margin: 0 }}>{result}</p>}
    </form>
  );
}

render(<App />);`,
    },
    {
      id: "forgetting-preventdefault",
      title: "What forgetting preventDefault looks like",
      summary: "Contrasts a broken handler (commented out) with the correct one that actually works.",
      code: `function BrokenForm() {
  const [value, setValue] = useState("");

  function handleSubmit(event) {
    // Without event.preventDefault() here, the browser would try to do a
    // full-page navigation/reload on submit, and this state update would
    // never be visible to the user before the page reset.
    // event.preventDefault();  <-- commented out on purpose to explain the bug
    setValue("this would be lost on a real page reload");
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "grid", gap: 6 }}>
      <p style={{ margin: 0, fontSize: 13, color: "#dc2626" }}>Broken: no preventDefault()</p>
      <button type="submit">Submit (would reload)</button>
    </form>
  );
}

function FixedForm() {
  const [value, setValue] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    setValue("Form handled entirely in React, no reload!");
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "grid", gap: 6 }}>
      <p style={{ margin: 0, fontSize: 13, color: "#166534" }}>Fixed: with preventDefault()</p>
      <button type="submit">Submit</button>
      {value && <p style={{ margin: 0 }}>{value}</p>}
    </form>
  );
}

function App() {
  return (
    <div style={{ display: "grid", gap: 16, maxWidth: 260 }}>
      <BrokenForm />
      <FixedForm />
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "validation-blocks-submit",
      title: "Validation blocking submission",
      summary: "The handler bails out early with an error message when the input is invalid.",
      code: `function App() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      setSubmitted(false);
      return;
    }
    setError("");
    setSubmitted(true);
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "grid", gap: 8, maxWidth: 240 }}>
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      {error && <small style={{ color: "#dc2626" }}>{error}</small>}
      <button type="submit">Submit</button>
      {submitted && <p style={{ margin: 0, color: "#166534" }}>Valid email submitted!</p>}
    </form>
  );
}

render(<App />);`,
    },
    {
      id: "temporary-success-message",
      title: "A temporary success confirmation",
      summary: "A 'Submitted!' message appears after submit and disappears again after a short delay.",
      code: `function App() {
  const [value, setValue] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "grid", gap: 8, maxWidth: 240 }}>
      <input value={value} onChange={(e) => setValue(e.target.value)} placeholder="Message" />
      <button type="submit">Send</button>
      {showSuccess && <p style={{ margin: 0, color: "#166534" }}>Submitted!</p>}
    </form>
  );
}

render(<App />);`,
    },
    {
      id: "fake-async-submitting-state",
      title: "Disabling the button during a fake async submit",
      summary: "setTimeout simulates a network request while the button shows 'Submitting...'.",
      code: `function App() {
  const [value, setValue] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    setIsSubmitting(true);
    setDone(false);
    setTimeout(() => {
      setIsSubmitting(false);
      setDone(true);
    }, 1500);
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "grid", gap: 8, maxWidth: 240 }}>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Comment"
        disabled={isSubmitting}
      />
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>
      {done && <p style={{ margin: 0, color: "#166534" }}>Done!</p>}
    </form>
  );
}

render(<App />);`,
    },
  ],
};
