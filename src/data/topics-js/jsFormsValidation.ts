import type { Topic } from "../../types";

export const jsFormsValidationTopic: Topic = {
  id: "js-forms-validation",
  title: "JavaScript Form Validation",
  category: "DOM & Events",
  shortExplanation: `**Form validation** checks that user input looks right *before* it gets used or sent anywhere — catching empty fields, wrong formats, and other bad input early.

- Custom JS validation: check the value yourself (empty? too short? matches a pattern?) and show your own error message
- Built-in HTML5 validation: attributes like \`required\` and \`pattern\` make the *browser itself* enforce rules, with zero JavaScript
- Both approaches are commonly combined — HTML5 attributes as a first line of defense, JavaScript for messages and logic the browser can't express`,
  longExplanation: `Validation is the step between "the user typed something" and "that something gets used" — catching problems (an empty required field, a malformed email, a password that's too short) before they cause a confusing error later, or worse, get silently accepted. There are two genuinely different ways to do this, and real forms often use both together.

- **Custom JavaScript validation** means writing the checking logic yourself: reading the current value (usually via state in a React form, or \`element.value\` in plain JS), running whatever checks matter (\`value.trim() === ""\` for empty, \`value.length < 8\` for too short, a regular expression for a pattern), and deciding what to do — typically setting an error message in state and preventing the "success" action until the input passes. This approach is fully flexible: any rule that can be expressed in code can be validated, including things that depend on other fields, on data fetched from a server, or on custom business logic no HTML attribute could ever express
- **Built-in HTML5 validation** takes a completely different approach: certain attributes tell the *browser itself* to enforce a rule, with no JavaScript at all. \`required\` on an \`<input>\` makes the browser refuse to submit the form (and show a small native tooltip) if that field is empty. \`pattern="regex-here"\` makes the browser require the value to match a given regular expression before it will submit. \`type="email"\` similarly makes the browser expect something shaped like an email address. \`minLength\` / \`maxLength\` enforce length bounds. These all run automatically, the moment a submit is attempted, using the browser's own validation UI — genuinely, with zero lines of validation JavaScript
- The two approaches aren't mutually exclusive — many real forms use HTML5 attributes as an immediate first line of defense (catching the obvious cases for free, with built-in accessible error messaging) and layer custom JavaScript on top for anything a plain attribute can't express: cross-field checks ("passwords must match"), custom-styled error messages instead of the browser's native tooltip, or validating as the user types rather than only on submit
- A common beginner mistake is validating too late (only after a slow network request finishes) or too aggressively (showing an error the instant a field is touched, even before the user has had a chance to type anything) — good validation usually waits for a submit attempt, or a small pause after typing stops, before flashing an error
- It's worth remembering client-side validation of either kind is a *user experience* feature, not a security boundary — because it runs in the user's own browser, it can always be bypassed by someone who wants to. Anything that actually matters for security or data integrity still needs to be validated again on the server

The examples below show a manually validated field with custom error messages, a simple pattern check, and — genuinely working, since \`required\`/\`pattern\` are real, unsimulated browser features — the native HTML5 validation UI kicking in with no JavaScript driving it at all.`,
  examples: [
    {
      id: "manual-empty-check",
      title: "Custom validation: rejecting an empty field",
      summary: "State-driven error message, shown only after a submit attempt with nothing typed in.",
      code: `function App() {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (name.trim() === "") {
      setError("Name cannot be empty.");
      setSuccess(false);
      return;
    }
    setError("");
    setSuccess(true);
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "grid", gap: 10, maxWidth: 280 }}>
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
      <button type="submit">Submit</button>
      {error && <p style={{ color: "#dc2626", fontSize: 13, margin: 0 }}>{error}</p>}
      {success && <p style={{ color: "#15803d", fontSize: 13, margin: 0 }}>Looks good!</p>}
    </form>
  );
}

render(<App />);`,
    },
    {
      id: "basic-pattern-check",
      title: "Custom validation: a basic email shape check",
      summary: "A simple regex check that the value at least looks like an email, without full RFC-grade strictness.",
      code: `function App() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const looksLikeEmail = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email);
    setError(looksLikeEmail ? "" : "That doesn't look like a valid email address.");
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "grid", gap: 10, maxWidth: 280 }}>
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
      <button type="submit">Check email</button>
      {error ? (
        <p style={{ color: "#dc2626", fontSize: 13, margin: 0 }}>{error}</p>
      ) : email ? (
        <p style={{ color: "#15803d", fontSize: 13, margin: 0 }}>Looks like a valid shape.</p>
      ) : null}
    </form>
  );
}

render(<App />);`,
    },
    {
      id: "html5-required-pattern",
      title: "Built-in HTML5 validation: required + pattern",
      summary: "No JavaScript validation logic at all — try submitting empty or with letters to see the real browser UI.",
      code: `function App() {
  const [submittedValue, setSubmittedValue] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setSubmittedValue(e.target.elements.zip.value);
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "grid", gap: 10, maxWidth: 280 }}>
      <label style={{ fontSize: 13 }}>
        ZIP code (required, digits only):
        <input name="zip" required pattern="[0-9]{5}" title="Enter exactly 5 digits" />
      </label>
      <button type="submit">Submit</button>
      {submittedValue && <p style={{ color: "#15803d", fontSize: 13 }}>Accepted: {submittedValue}</p>}
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        Try submitting empty, or with letters — the browser itself blocks it and shows its own message.
      </p>
    </form>
  );
}

render(<App />);`,
    },
    {
      id: "validate-as-you-type",
      title: "Real-time feedback while typing",
      summary: "Custom JS validation doesn't have to wait for submit — it can react on every keystroke instead.",
      code: `function App() {
  const [password, setPassword] = useState("");
  const isLongEnough = password.length >= 8;

  return (
    <div style={{ display: "grid", gap: 10, maxWidth: 280 }}>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Choose a password"
        style={{ borderColor: password.length === 0 ? undefined : isLongEnough ? "#15803d" : "#dc2626" }}
      />
      {password.length > 0 && (
        <p style={{ color: isLongEnough ? "#15803d" : "#dc2626", fontSize: 13, margin: 0 }}>
          {isLongEnough ? "Length is OK (8+ characters)" : "Needs at least 8 characters (" + password.length + " so far)"}
        </p>
      )}
    </div>
  );
}

render(<App />);`,
    },
  ],
};
