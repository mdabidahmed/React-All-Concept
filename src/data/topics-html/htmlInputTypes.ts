import type { Topic } from "../../types";

export const htmlInputTypesTopic: Topic = {
  id: "html-input-types",
  title: "HTML Input Types",
  category: "HTML Forms",
  shortExplanation: `The \`type\` attribute is what turns a plain \`<input>\` into a text box, a checkbox, a date picker, or something else entirely.

- \`text\`, \`password\`, \`email\`, \`number\` — different kinds of typed text
- \`checkbox\`, \`radio\` — pick one or more from a set of options
- \`range\`, \`color\`, \`date\` — specialized native pickers
- \`file\` — lets the user choose a file from their device
- Each type comes with its own built-in browser UI and, for some, built-in validation`,
  longExplanation: `A single \`<input>\` element can render as more than a dozen different controls, all switched by its \`type\` attribute. The browser supplies the UI and, for several types, free validation and formatting.

- \`type="text"\` (the default) — a plain single-line text box
- \`type="password"\` — like text, but characters are masked as dots
- \`type="email"\` — a text box that the browser will validate looks like an email address (something@something) when the form is submitted, without any custom JavaScript
- \`type="number"\` — restricts input to numeric values and shows small increment/decrement arrows
- \`type="date"\` — a native date picker, so users don't have to type a date format by hand
- \`type="checkbox"\` — an independent on/off toggle; multiple checkboxes in a group can all be checked at once
- \`type="radio"\` — one choice from a set; give every radio in the group the same \`name\` so selecting one deselects the others
- \`type="range"\` — a slider between a \`min\` and \`max\`
- \`type="color"\` — a native color picker that returns a hex value like \`#3b82f6\`
- \`type="file"\` — lets the user pick a file from their device to upload. File inputs are always ==uncontrolled== in React — the browser (for security reasons) won't let JavaScript set what file is "selected," so there's no \`value\` prop to control, only an \`onChange\` to read what was picked

Because each type ships with native browser behavior — a date picker, email format checking, a color swatch — reaching for the right \`type\` first is usually simpler and more accessible than rebuilding that behavior yourself with plain text inputs and custom JavaScript.`,
  examples: [
    {
      id: "text-password-email-number",
      title: "text, password, email, and number",
      summary: "Four related types that all collect typed text, each with different built-in behavior.",
      code: `function App() {
  const [form, setForm] = useState({ username: "", password: "", email: "", age: "" });

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  return (
    <form onSubmit={(e) => e.preventDefault()} style={{ display: "grid", gap: 8, maxWidth: 260 }}>
      <input
        type="text"
        value={form.username}
        onChange={(e) => update("username", e.target.value)}
        placeholder="Username (type: text)"
      />
      <input
        type="password"
        value={form.password}
        onChange={(e) => update("password", e.target.value)}
        placeholder="Password (masked)"
      />
      <input
        type="email"
        value={form.email}
        onChange={(e) => update("email", e.target.value)}
        placeholder="Email (validated on submit)"
      />
      <input
        type="number"
        value={form.age}
        onChange={(e) => update("age", e.target.value)}
        placeholder="Age (numeric only)"
      />
    </form>
  );
}

render(<App />);`,
    },
    {
      id: "checkbox-vs-radio",
      title: "checkbox vs. radio",
      summary: "Checkboxes allow multiple selections independently; radios sharing a name allow only one.",
      code: `function App() {
  const [toppings, setToppings] = useState([]);
  const [size, setSize] = useState("medium");

  function toggleTopping(name) {
    setToppings((prev) =>
      prev.includes(name) ? prev.filter((t) => t !== name) : [...prev, name]
    );
  }

  return (
    <div style={{ display: "grid", gap: 12, maxWidth: 280 }}>
      <div>
        <strong>Toppings (checkboxes, multiple allowed):</strong>
        {["Cheese", "Olives", "Mushrooms"].map((name) => (
          <label key={name} style={{ display: "block" }}>
            <input
              type="checkbox"
              checked={toppings.includes(name)}
              onChange={() => toggleTopping(name)}
            />{" "}
            {name}
          </label>
        ))}
      </div>
      <div>
        <strong>Size (radio, only one allowed):</strong>
        {["small", "medium", "large"].map((value) => (
          <label key={value} style={{ display: "block" }}>
            <input
              type="radio"
              name="size"
              value={value}
              checked={size === value}
              onChange={(e) => setSize(e.target.value)}
            />{" "}
            {value}
          </label>
        ))}
      </div>
      <p style={{ margin: 0, fontSize: 13 }}>
        Toppings: {toppings.join(", ") || "none"}. Size: {size}.
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "range-color-date",
      title: "range, color, and date pickers",
      summary: "Three specialized input types, each rendering its own native UI.",
      code: `function App() {
  const [volume, setVolume] = useState(50);
  const [color, setColor] = useState("#3b82f6");
  const [date, setDate] = useState("2026-01-01");

  return (
    <div style={{ display: "grid", gap: 12, maxWidth: 280 }}>
      <label>
        Volume: {volume}
        <input
          type="range"
          min={0}
          max={100}
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
          style={{ display: "block", width: "100%" }}
        />
      </label>
      <label>
        Favorite color: {color}
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          style={{ display: "block", marginTop: 4 }}
        />
      </label>
      <label>
        Date: {date}
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          style={{ display: "block", marginTop: 4 }}
        />
      </label>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "file-input",
      title: "The file input (always uncontrolled)",
      summary: "File inputs can't be controlled with value — read the chosen file's name from the change event instead.",
      code: `function App() {
  const [fileName, setFileName] = useState("");

  function handleChange(event) {
    const file = event.target.files[0];
    setFileName(file ? file.name : "");
  }

  return (
    <div style={{ display: "grid", gap: 8, maxWidth: 280 }}>
      <input type="file" onChange={handleChange} />
      <p style={{ margin: 0, fontSize: 13 }}>
        {fileName ? "Selected: " + fileName : "No file selected yet."}
      </p>
      <small style={{ color: "#6b7280" }}>
        Note: there's no \`value\` prop here — the browser won't let JavaScript set which file is
        "chosen" for security reasons, so file inputs are read via \`onChange\` only.
      </small>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
