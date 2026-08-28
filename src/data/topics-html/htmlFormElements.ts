import type { Topic } from "../../types";

export const htmlFormElementsTopic: Topic = {
  id: "html-form-elements",
  title: "HTML Form Elements",
  category: "HTML Forms",
  shortExplanation: `A form is built out of a handful of standard elements, each suited to a different kind of input.

- \`<input>\` — a single-line control whose behavior changes based on its \`type\`
- \`<label>\` — text tied to a specific input via \`htmlFor\`/\`id\`, improving accessibility and click-to-focus
- \`<select>\` + \`<option>\` — a dropdown of choices
- \`<textarea>\` — a multi-line text box
- \`<button>\` — a clickable control, often \`type="submit"\`
- \`<fieldset>\` + \`<legend>\` — groups related fields under a shared caption`,
  longExplanation: `Beyond \`<form>\` itself, a small set of elements makes up nearly every form ever built.

- \`<input>\` is the workhorse — a single-line control whose \`type\` attribute determines what it looks like and how it behaves (covered in depth in the next topic)
- \`<label>\` gives an input a text description. Pairing a label with its input — via \`htmlFor="some-id"\` on the label matching \`id="some-id"\` on the input — does two real things: clicking the label text focuses (or toggles) the input, and screen readers announce the label when the input receives focus. An input with no associated label is a common, easily-avoided accessibility gap
- \`<select>\` renders a dropdown; each \`<option>\` inside it is one choice. The selected option's \`value\` is what gets submitted
- \`<textarea>\` is like \`<input type="text">\` but allows multiple lines and is resizable by the user by default
- \`<button>\` is clickable; its \`type\` attribute matters — \`type="submit"\` (the default inside a \`<form>\`) submits the form, \`type="button"\` does nothing on its own (useful when you want to attach a custom \`onClick\` instead), and \`type="reset"\` clears the form back to its initial values
- \`<fieldset>\` draws a box around a group of related controls, and \`<legend>\` gives that group a caption — useful for a chunk of a form like "Shipping address" or a set of radio buttons that belong together

In this JSX sandbox, \`for\` becomes \`htmlFor\` (since \`for\` is a reserved word in JavaScript) — everything else about these elements works the same as plain HTML.`,
  examples: [
    {
      id: "label-htmlfor-pairing",
      title: "Pairing a label with its input",
      summary: "Clicking the label text focuses the input, because htmlFor matches the input's id.",
      code: `function App() {
  const [value, setValue] = useState("");

  return (
    <div style={{ display: "grid", gap: 6, maxWidth: 260 }}>
      <label htmlFor="email-field">Email address</label>
      <input
        id="email-field"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="you@example.com"
      />
      <small style={{ color: "#6b7280" }}>
        Click the label text above — it focuses this input, because htmlFor="email-field" matches
        the input's id="email-field".
      </small>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "select-and-textarea",
      title: "A select dropdown and a textarea",
      summary: "Two more common controls: a fixed set of choices, and free-form multi-line text.",
      code: `function App() {
  const [color, setColor] = useState("blue");
  const [bio, setBio] = useState("");

  return (
    <form onSubmit={(e) => e.preventDefault()} style={{ display: "grid", gap: 10, maxWidth: 280 }}>
      <label>
        Favorite color
        <select
          value={color}
          onChange={(e) => setColor(e.target.value)}
          style={{ display: "block", marginTop: 4 }}
        >
          <option value="red">Red</option>
          <option value="blue">Blue</option>
          <option value="green">Green</option>
        </select>
      </label>
      <label>
        Short bio
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          rows={3}
          placeholder="Tell us about yourself"
          style={{ display: "block", marginTop: 4, width: "100%" }}
        />
      </label>
      <p style={{ margin: 0, fontSize: 13 }}>
        Selected: {color}. Bio length: {bio.length} characters.
      </p>
    </form>
  );
}

render(<App />);`,
    },
    {
      id: "button-types",
      title: "submit, reset, and button types",
      summary: "Each button type behaves differently inside a form — only \"submit\" triggers onSubmit.",
      code: `function App() {
  const initial = "";
  const [note, setNote] = useState(initial);
  const [submittedCount, setSubmittedCount] = useState(0);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSubmittedCount((c) => c + 1);
      }}
      style={{ display: "grid", gap: 8, maxWidth: 280 }}
    >
      <input value={note} onChange={(e) => setNote(e.target.value)} placeholder="A note" />
      <div style={{ display: "flex", gap: 8 }}>
        <button type="submit">Submit</button>
        <button type="reset" onClick={() => setNote(initial)}>Reset</button>
        <button type="button" onClick={() => setNote((n) => n + "!")}>
          Add "!" (plain button, no submit)
        </button>
      </div>
      <small style={{ color: "#6b7280" }}>Submitted {submittedCount} time(s).</small>
    </form>
  );
}

render(<App />);`,
    },
    {
      id: "fieldset-and-legend",
      title: "Grouping fields with fieldset and legend",
      summary: "fieldset draws a box around related controls, and legend labels the whole group.",
      code: `function App() {
  const [plan, setPlan] = useState("free");

  return (
    <form onSubmit={(e) => e.preventDefault()} style={{ maxWidth: 280 }}>
      <fieldset style={{ borderRadius: 8, padding: 12 }}>
        <legend>Choose a plan</legend>
        <label style={{ display: "block", marginBottom: 4 }}>
          <input
            type="radio"
            name="plan"
            value="free"
            checked={plan === "free"}
            onChange={(e) => setPlan(e.target.value)}
          />{" "}
          Free
        </label>
        <label style={{ display: "block" }}>
          <input
            type="radio"
            name="plan"
            value="pro"
            checked={plan === "pro"}
            onChange={(e) => setPlan(e.target.value)}
          />{" "}
          Pro
        </label>
      </fieldset>
      <p style={{ marginTop: 8 }}>Selected plan: {plan}</p>
    </form>
  );
}

render(<App />);`,
    },
  ],
};
