import type { Topic } from "../../types";

export const reactTextareaTopic: Topic = {
  id: "react-textarea",
  title: "React Textarea",
  category: "Forms",
  shortExplanation: `Plain HTML's \`<textarea>\` holds its initial text as *children* between its tags, but React controls it exactly like an \`<input>\`: a \`value\` prop and an \`onChange\` handler, with ==no children== at all.

- That's the one meaningful difference between HTML and JSX textareas
- Everything else about controlled behavior — value from state, \`onChange\` updates it — carries over unchanged`,
  longExplanation: `HTML's \`<textarea>defaultText</textarea>\` is unusual among form elements: its initial value is written as *text content* between the tags rather than as a \`value\` attribute — sensible for multi-line text in old HTML, but inconsistent with every other input. React normalizes this away: a \`<textarea>\` in JSX takes \`value\` and \`onChange\` just like a controlled \`<input>\`, and passing children to it is deprecated and triggers a warning.

- Once that one difference is understood, every controlled-input technique carries over: text comes from state, each keystroke fires \`onChange\` with \`event.target.value\` holding the full text, and the handler decides the next state
- That lets you enforce a max length, strip disallowed characters, or transform input before it's rendered back to the screen
- Because the value can contain newlines, it's a natural fit for **derived values** computed during render — a live character count, or a rendered "preview" of the text elsewhere on the page
- An **uncontrolled** textarea is possible via \`defaultValue\` and a \`ref\` for cases that don't need to react to every keystroke, but ==controlled== stays the default so the content is available for validation, formatting, or sync at all times, not just at submission`,
  examples: [
    {
      id: "basic-controlled-textarea",
      title: "A basic controlled textarea",
      summary: "value and onChange control the textarea just like a text input.",
      code: `function App() {
  const [text, setText] = useState("");

  return (
    <div style={{ display: "grid", gap: 8, maxWidth: 280 }}>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write something..."
        rows={4}
        style={{ padding: 8, borderRadius: 6, border: "1px solid #d1d5db", fontFamily: "inherit" }}
      />
      <p style={{ margin: 0, fontSize: 13, color: "#4b5563" }}>{text.length} characters typed</p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "textarea-character-counter",
      title: "Live character counter",
      summary: "A running count derived from the textarea's current state on every render.",
      code: `function App() {
  const [text, setText] = useState("");
  const limit = 200;

  return (
    <div style={{ display: "grid", gap: 6, maxWidth: 280 }}>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={4}
        style={{ padding: 8, borderRadius: 6, border: "1px solid #d1d5db", fontFamily: "inherit" }}
      />
      <small style={{ color: text.length > limit ? "#dc2626" : "#6b7280" }}>
        {text.length} / {limit}
      </small>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "textarea-max-length-enforced",
      title: "Max length enforced in onChange",
      summary: "The handler simply refuses to update state past a character limit.",
      code: `function App() {
  const [text, setText] = useState("");
  const limit = 50;

  function handleChange(event) {
    const next = event.target.value;
    if (next.length <= limit) {
      setText(next);
    }
  }

  return (
    <div style={{ display: "grid", gap: 6, maxWidth: 280 }}>
      <textarea
        value={text}
        onChange={handleChange}
        rows={3}
        style={{ padding: 8, borderRadius: 6, border: "1px solid #d1d5db", fontFamily: "inherit" }}
      />
      <small style={{ color: "#6b7280" }}>
        {text.length} / {limit} (further typing is blocked at the limit)
      </small>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "textarea-growing-rows",
      title: "Row count that grows with the content",
      summary: "The number of visible rows is computed from how many newlines the text contains.",
      code: `function App() {
  const [text, setText] = useState("");
  const lineCount = text.split("\\n").length;
  const rows = Math.min(10, Math.max(3, lineCount));

  return (
    <div style={{ display: "grid", gap: 6, maxWidth: 280 }}>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={rows}
        placeholder="Press Enter to add lines and watch it grow"
        style={{
          padding: 8,
          borderRadius: 6,
          border: "1px solid #d1d5db",
          fontFamily: "inherit",
          resize: "none",
        }}
      />
      <small style={{ color: "#6b7280" }}>{lineCount} line(s)</small>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "textarea-preview",
      title: "Textarea with a rendered preview",
      summary: "A simple notes box: typed text is submitted and shown below as a preview.",
      code: `function App() {
  const [draft, setDraft] = useState("");
  const [note, setNote] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    setNote(draft);
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "grid", gap: 8, maxWidth: 280 }}>
      <textarea
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        rows={4}
        placeholder="Write a note..."
        style={{ padding: 8, borderRadius: 6, border: "1px solid #d1d5db", fontFamily: "inherit" }}
      />
      <button type="submit">Post note</button>
      {note && (
        <div style={{ border: "1px solid #d1d5db", borderRadius: 6, padding: 10 }}>
          <strong style={{ fontSize: 12, color: "#6b7280" }}>Preview</strong>
          <p style={{ margin: "4px 0 0", whiteSpace: "pre-wrap" }}>{note}</p>
        </div>
      )}
    </form>
  );
}

render(<App />);`,
    },
  ],
};
