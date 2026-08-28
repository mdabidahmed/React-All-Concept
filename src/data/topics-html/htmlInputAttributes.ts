import type { Topic } from "../../types";

export const htmlInputAttributesTopic: Topic = {
  id: "html-input-attributes",
  title: "HTML Input Attributes",
  category: "HTML Forms",
  shortExplanation: `A set of attributes fine-tune how an individual \`<input>\` behaves, independent of its \`type\`.

- \`value\` — the input's current content
- \`readOnly\` vs \`disabled\` — both block editing, but only \`disabled\` removes the field from focus and submission
- \`size\`, \`maxLength\` — the input's visible width and character limit
- \`placeholder\` — faint hint text shown when empty
- \`required\` — blocks submission until filled in
- \`autofocus\` — focuses the input automatically when the page loads`,
  longExplanation: `These attributes apply to \`<input>\` regardless of its \`type\`, and mostly control constraints and hints rather than the fundamental kind of control it is.

- \`value\` holds the input's current content. In plain HTML, \`value="..."\` just sets an *initial* value the user can then freely edit; in this React sandbox, pairing \`value\` with \`onChange\` makes it a fully ==controlled component== instead, as covered in the Forms topic
- \`readOnly\` and \`disabled\` both stop the user from editing a field, but they're not interchangeable:
  - A \`readOnly\` field can still be **focused**, selected, and copied from — and its value is still submitted with the form. Use it for a value that's fixed but relevant, like a generated ID
  - A \`disabled\` field can't be focused or interacted with at all, and its value is **excluded** from form submission entirely — use it for a field that's genuinely not applicable right now, like a shipping-state dropdown before a country is chosen
- \`size\` sets the input's visible width in characters (roughly how many characters fit before scrolling) — a display hint, not a hard limit on what can be typed
- \`maxLength\` **is** a hard limit — the browser refuses to let the user type past that many characters
- \`placeholder\` shows light gray hint text inside an empty input, disappearing as soon as the user types. It's a hint, not a label — it disappears once there's a value, so it shouldn't be the *only* description of what a field is for
- \`required\` marks a field as mandatory; the browser blocks form submission and shows a native prompt if it's left empty
- \`autofocus\` moves keyboard focus to that input automatically when the page/component first loads — useful sparingly (e.g. a search box on a search-focused page), since it can be disorienting if overused

In JSX, several of these are spelled with camelCase because of the same reserved-word/casing convention as \`class\`/\`className\`: \`readonly\` becomes \`readOnly\`, \`maxlength\` becomes \`maxLength\`, and \`autofocus\` becomes \`autoFocus\`.`,
  examples: [
    {
      id: "readonly-vs-disabled",
      title: "readOnly vs. disabled",
      summary: "Both look similar, but only the disabled field is excluded from what gets submitted.",
      code: `function App() {
  const [form, setForm] = useState({ id: "USR-4821", nickname: "" });

  function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    alert("Submitted fields: " + Array.from(data.keys()).join(", "));
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "grid", gap: 10, maxWidth: 280 }}>
      <label>
        User ID (readOnly — visible, copyable, still submitted)
        <input name="id" value={form.id} readOnly style={{ display: "block", marginTop: 4 }} />
      </label>
      <label>
        Referral code (disabled — not focusable, excluded from submission)
        <input name="referral" value="" disabled placeholder="Not available yet" style={{ display: "block", marginTop: 4 }} />
      </label>
      <label>
        Nickname (normal, editable field)
        <input
          name="nickname"
          value={form.nickname}
          onChange={(e) => setForm((prev) => ({ ...prev, nickname: e.target.value }))}
          style={{ display: "block", marginTop: 4 }}
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}

render(<App />);`,
    },
    {
      id: "maxlength-and-placeholder",
      title: "maxLength and placeholder",
      summary: "maxLength hard-caps how many characters can be typed; placeholder is just a hint that vanishes on input.",
      code: `function App() {
  const [tweet, setTweet] = useState("");
  const max = 20;

  return (
    <div style={{ display: "grid", gap: 6, maxWidth: 260 }}>
      <input
        value={tweet}
        onChange={(e) => setTweet(e.target.value)}
        maxLength={max}
        placeholder="What's happening?"
      />
      <small style={{ color: tweet.length === max ? "#dc2626" : "#6b7280" }}>
        {tweet.length} / {max} — the browser itself won't let you type past the limit.
      </small>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "required-field-validation",
      title: "required blocks submission",
      summary: "An empty required field triggers the browser's own validation prompt instead of calling onSubmit.",
      code: `function App() {
  const [submitCount, setSubmitCount] = useState(0);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitCount((c) => c + 1);
      }}
      style={{ display: "grid", gap: 8, maxWidth: 260 }}
    >
      <label>
        Full name (required)
        <input required placeholder="Required — try submitting empty" style={{ display: "block", marginTop: 4 }} />
      </label>
      <button type="submit">Submit</button>
      <small style={{ color: "#6b7280" }}>Successful submits: {submitCount}</small>
    </form>
  );
}

render(<App />);`,
    },
    {
      id: "autofocus-and-size",
      title: "autoFocus and size",
      summary: "autoFocus puts the cursor in a field immediately; size hints at the input's visible width.",
      code: `function App() {
  const [query, setQuery] = useState("");

  return (
    <div style={{ display: "grid", gap: 8, maxWidth: 260 }}>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        autoFocus
        size={40}
        placeholder="Focused automatically on load"
      />
      <small style={{ color: "#6b7280" }}>
        \`size\` suggests a display width in characters; it doesn't limit what can be typed — that's
        what \`maxLength\` is for.
      </small>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
