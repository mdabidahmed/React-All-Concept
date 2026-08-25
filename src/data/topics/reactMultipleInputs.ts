import type { Topic } from "../../types";

export const reactMultipleInputsTopic: Topic = {
  id: "react-multiple-inputs",
  title: "React Multiple Inputs",
  category: "Forms",
  shortExplanation: `Rather than writing a separate \`onChange\` handler for every field, give each input a \`name\` attribute matching a key in a single state object, and use one ==generic handler== that writes into that key.

- Every input shares one \`handleChange\` function
- \`event.target.name\` tells the handler which key to update
- It scales to any number of fields without new code per field`,
  longExplanation: `A form with many fields gets unwieldy if each input has its own \`useState\` call and its own handler function. The **generic-handler pattern** collapses all of that into one state object and a single \`handleChange\` function.

- Every input gets a \`name\` attribute matching a key on the state object; the handler reads \`event.target.name\` and writes into just that key: \`setForm(prev => ({ ...prev, [name]: value }))\`
- This relies on *computed property names* and on treating the input's \`name\` as data — that's what makes the handler reusable across fields instead of hardcoded per field
- Mixed forms still need to branch on input type: a checkbox's meaningful value lives on \`event.target.checked\`, not \`event.target.value\` — reading the wrong property silently produces \`"on"\`/\`undefined\` instead of a boolean or string
- The same idea extends to a *dynamic* set of fields — an array of rows added and removed at runtime — by keying each row's state slot with an id or array index instead of a fixed name
- It also simplifies whole-form operations: resetting is one \`setForm(initialState)\` call, and checking that every field is filled is one pass over \`Object.values(form)\` instead of a flag per input

The tradeoff is that the shared shape must be planned up front: a typo in a \`name\` attribute makes updates ==silently land on the wrong key== instead of throwing, so keeping names and state keys consistent matters.`,
  examples: [
    {
      id: "two-field-shared-handler",
      title: "Two fields, one handler",
      summary: "A single handleChange updates either field based on its name attribute.",
      code: `function App() {
  const [form, setForm] = useState({ firstName: "", lastName: "" });

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  return (
    <div style={{ display: "grid", gap: 10, maxWidth: 280 }}>
      <label style={{ display: "grid", gap: 4 }}>
        First name
        <input name="firstName" value={form.firstName} onChange={handleChange} />
      </label>
      <label style={{ display: "grid", gap: 4 }}>
        Last name
        <input name="lastName" value={form.lastName} onChange={handleChange} />
      </label>
      <p>
        Hello, <strong>{form.firstName || "..."} {form.lastName || "..."}</strong>
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "mixed-input-types",
      title: "Mixed input types, one handler",
      summary: "Branch on event.target.type to read value vs checked correctly.",
      code: `function App() {
  const [form, setForm] = useState({ email: "", subscribe: false, plan: "free" });

  function handleChange(event) {
    const { name, type, value, checked } = event.target;
    const nextValue = type === "checkbox" ? checked : value;
    setForm((prev) => ({ ...prev, [name]: nextValue }));
  }

  return (
    <div style={{ display: "grid", gap: 10, maxWidth: 280 }}>
      <label style={{ display: "grid", gap: 4 }}>
        Email
        <input name="email" value={form.email} onChange={handleChange} placeholder="you@example.com" />
      </label>
      <label style={{ display: "flex", gap: 6, alignItems: "center" }}>
        <input type="checkbox" name="subscribe" checked={form.subscribe} onChange={handleChange} />
        Subscribe to newsletter
      </label>
      <label style={{ display: "grid", gap: 4 }}>
        Plan
        <select name="plan" value={form.plan} onChange={handleChange} style={{ padding: 6, borderRadius: 6, border: "1px solid #d1d5db" }}>
          <option value="free">Free</option>
          <option value="pro">Pro</option>
        </select>
      </label>
      <pre style={{ margin: 0, fontSize: 12 }}>{JSON.stringify(form, null, 2)}</pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "reset-all-fields",
      title: "Resetting every field at once",
      summary: "Store the initial shape and restore it in a single setForm call.",
      code: `const initialForm = { username: "", bio: "", city: "" };

function App() {
  const [form, setForm] = useState(initialForm);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleReset() {
    setForm(initialForm);
  }

  return (
    <div style={{ display: "grid", gap: 10, maxWidth: 280 }}>
      {["username", "bio", "city"].map((field) => (
        <label key={field} style={{ display: "grid", gap: 4, textTransform: "capitalize" }}>
          {field}
          <input name={field} value={form[field]} onChange={handleChange} />
        </label>
      ))}
      <button onClick={handleReset}>Reset all</button>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "validate-all-filled",
      title: "Validating multiple fields together",
      summary: "Enable submit only once every field in the shared state is non-empty.",
      code: `function App() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  const allFilled = Object.values(form).every((v) => v.trim() !== "");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
      style={{ display: "grid", gap: 10, maxWidth: 280 }}
    >
      <input name="name" placeholder="Name" value={form.name} onChange={handleChange} />
      <input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
      <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} />
      <button type="submit" disabled={!allFilled}>Submit</button>
      {submitted && <p>Form submitted with all fields filled.</p>}
    </form>
  );
}

render(<App />);`,
    },
    {
      id: "dynamic-input-rows",
      title: "Dynamic list of inputs",
      summary: "Add and remove input rows from an array, each updated by the same generic handler.",
      code: `function App() {
  const [rows, setRows] = useState([{ id: 1, value: "" }]);

  function handleChange(id, event) {
    const { value } = event.target;
    setRows((prev) => prev.map((row) => (row.id === id ? { ...row, value } : row)));
  }

  function addRow() {
    setRows((prev) => [...prev, { id: Date.now(), value: "" }]);
  }

  function removeRow(id) {
    setRows((prev) => prev.filter((row) => row.id !== id));
  }

  return (
    <div style={{ display: "grid", gap: 10, maxWidth: 320 }}>
      {rows.map((row) => (
        <div key={row.id} style={{ display: "flex", gap: 8 }}>
          <input
            value={row.value}
            onChange={(e) => handleChange(row.id, e)}
            placeholder="An ingredient"
            style={{ flex: 1 }}
          />
          <button onClick={() => removeRow(row.id)} disabled={rows.length === 1}>
            Remove
          </button>
        </div>
      ))}
      <button onClick={addRow}>Add row</button>
      <pre style={{ margin: 0, fontSize: 12 }}>{JSON.stringify(rows.map((r) => r.value))}</pre>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
