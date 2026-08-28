import type { Topic } from "../../types";

export const htmlButtonsTopic: Topic = {
  id: "html-buttons",
  title: "HTML Buttons",
  category: "HTML Structure",
  shortExplanation: `\`<button>\` creates a clickable button, and its \`type\` attribute — \`"button"\`, \`"submit"\`, or \`"reset"\` — controls what it actually *does*.

- Inside a \`<form>\`, a button *defaults* to \`type="submit"\` — it submits the form unless told otherwise
- Setting \`type="button"\` explicitly is important for a button that should just run some JavaScript, so it doesn't accidentally submit a surrounding form
- \`disabled\` turns a button non-interactive and typically grays it out automatically`,
  longExplanation: `\`<button>\` is HTML's dedicated element for a clickable action — more accessible and more flexible than trying to fake a button out of a styled \`<div>\`.

- **The \`type\` attribute has three values**:
  - \`type="submit"\` submits the form the button lives inside — and this is the *default* if no \`type\` is given at all
  - \`type="reset"\` clears every field in the form back to its initial values
  - \`type="button"\` does nothing on its own — it's meant to be paired with a JavaScript click handler for any custom action that *isn't* submitting or resetting a form
- **Why the explicit \`type="button"\` matters**: because \`submit\` is the default, a plain \`<button>\` placed anywhere inside a \`<form>\` — even one only meant to toggle a menu or open a dialog — will submit that form when clicked unless \`type="button"\` is set explicitly. This is a very common, very real bug in form-heavy pages
- **Styling**: like any element, a button's look can be fully customized with the \`style\` attribute (or CSS classes) — background color, padding, border radius, and so on
- **\`disabled\`**: adding the \`disabled\` attribute makes a button non-interactive — clicks don't fire, and browsers typically render it visually muted by default. In JSX, this is written as \`disabled\` (no value) or \`disabled={someCondition}\` for a dynamically controlled state

\`<button>\`, \`type\`, and \`disabled\` are written identically in plain HTML and JSX — the only JSX-specific addition is that \`disabled\` and click behavior are commonly driven by JavaScript state (\`useState\`), which plain static HTML can't do on its own.`,
  examples: [
    {
      id: "button-types",
      title: "The three button types",
      summary: "submit, reset, and button — each does something different, especially inside a form.",
      code: `function App() {
  return (
    <div style={{ display: "flex", gap: 8 }}>
      <button type="submit">type="submit"</button>
      <button type="reset">type="reset"</button>
      <button type="button">type="button"</button>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "explicit-type-button-in-form",
      title: "Why type=\"button\" matters inside a form",
      summary: "Without an explicit type, a button inside a form defaults to submit and can trigger it unintentionally.",
      code: `function App() {
  const [submitCount, setSubmitCount] = useState(0);
  const [helperClicks, setHelperClicks] = useState(0);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitCount((c) => c + 1);
      }}
      style={{ display: "grid", gap: 8 }}
    >
      <p>Form submitted {submitCount} time(s).</p>
      <button
        type="button"
        onClick={() => setHelperClicks((c) => c + 1)}
      >
        Helper action (type="button", clicked {helperClicks}x, never submits)
      </button>
      <button type="submit">Actually submit the form</button>
    </form>
  );
}

render(<App />);`,
    },
    {
      id: "styled-button",
      title: "Styling a button",
      summary: "Buttons accept the same style attribute as any other element.",
      code: `function App() {
  return (
    <button
      style={{
        background: "#0d9488",
        color: "white",
        border: "none",
        padding: "10px 20px",
        borderRadius: 6,
        fontSize: 15,
        cursor: "pointer",
      }}
    >
      A fully custom-styled button
    </button>
  );
}

render(<App />);`,
    },
    {
      id: "disabled-button",
      title: "Disabling a button",
      summary: "The disabled attribute, here driven dynamically by a checkbox's state.",
      code: `function App() {
  const [agreed, setAgreed] = useState(false);

  return (
    <div style={{ display: "grid", gap: 8 }}>
      <label>
        <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} />{" "}
        I agree to the terms
      </label>
      <button disabled={!agreed}>Continue</button>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
