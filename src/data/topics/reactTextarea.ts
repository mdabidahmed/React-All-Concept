import type { Topic } from "../../types";

export const reactTextareaTopic: Topic = {
  id: "react-textarea",
  title: "React Textarea",
  category: "Forms",
  shortExplanation:
    "In plain HTML a <textarea> holds its initial text as children between its opening and closing tags, but React controls it exactly like an <input>: with a value prop and an onChange handler, and no children at all. This is the one meaningful difference between HTML and JSX textareas — everything else about controlled behavior carries over unchanged.",
  longExplanation:
    "HTML's <textarea>defaultText</textarea> is unusual among form elements because its initial value is written as text content between the tags rather than as a value attribute, which made sense for multi-line text in old HTML but is inconsistent with every other input element. React normalizes this inconsistency away: a <textarea> in JSX takes a value prop and an onChange handler, just like a controlled <input>, and does not accept children for its content at all — passing children to a textarea is deprecated and will trigger a warning. Once that one difference is understood, every controlled-component technique that applies to text inputs applies equally to textareas: the displayed text comes from state, every keystroke fires onChange with an event whose target.value holds the full current text, and the handler decides what the next state should be, which means you can enforce a maximum length, strip disallowed characters, or transform the input before it's ever rendered back to the screen. Because a textarea's value can contain newline characters, it's also a convenient way to demonstrate derived values computed from state during render, such as a live character count or a rendered 'preview' of the text elsewhere on the page, both of which fall out naturally once the raw text lives in state instead of being locked away inside the DOM. As with inputs, an uncontrolled textarea is possible via defaultValue and a ref for cases that don't need to react to every keystroke, but the controlled pattern remains the default in idiomatic React code because it keeps the textarea's content available to the rest of the component for validation, formatting, or synchronization with other UI at all times, not only at the moment of submission.",
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
