import type { Topic } from "../../types";

export const reactSelectTopic: Topic = {
  id: "react-select",
  title: "React Select",
  category: "Forms",
  shortExplanation:
    "A controlled <select> gets its selected option from a value prop on the <select> element itself, not from a selected attribute on any <option>. Pair it with onChange reading event.target.value, and React keeps the dropdown in sync with state on every render.",
  longExplanation:
    "In plain HTML, the selected option is marked by putting a selected attribute on that particular <option> tag. React's controlled model inverts this: you put value on the <select> element itself, and React figures out which child <option> to display as selected by matching that value against each option's own value. This means the source of truth lives in one place — your component state — rather than being scattered across sibling <option> tags, which is exactly the same pattern used for controlled text inputs. As with any controlled field, you must also supply an onChange handler that reads event.target.value and calls your setter, or the select will appear frozen because React keeps re-rendering it back to the state value. A common pitfall is forgetting the onChange handler entirely and passing only value, which React will warn about and which makes the dropdown unresponsive to clicks. Options are frequently generated dynamically from an array via .map(), each rendering an <option value={...}> with a stable key. For selecting more than one item at once, the same element supports a multiple attribute; the change handler then reads the chosen options off event.target.selectedOptions (an HTMLCollection) rather than a single value. Because the selected value is ordinary state, it composes naturally with the rest of a form: it can drive conditional rendering, feed a submit handler, or be validated alongside other fields before enabling further actions.",
  examples: [
    {
      id: "basic-controlled-select",
      title: "Basic controlled select",
      summary: "Drive a <select> from state using value and onChange.",
      code: `function App() {
  const [fruit, setFruit] = useState("apple");

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <label style={{ display: "grid", gap: 4 }}>
        Favorite fruit
        <select
          value={fruit}
          onChange={(e) => setFruit(e.target.value)}
          style={{ padding: 6, borderRadius: 6, border: "1px solid #d1d5db" }}
        >
          <option value="apple">Apple</option>
          <option value="banana">Banana</option>
          <option value="cherry">Cherry</option>
        </select>
      </label>
      <p>You picked: <strong>{fruit}</strong></p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "options-from-array",
      title: "Options generated from an array",
      summary: "Map over a data array to render <option> elements.",
      code: `const countries = [
  { code: "us", name: "United States" },
  { code: "ca", name: "Canada" },
  { code: "mx", name: "Mexico" },
  { code: "fr", name: "France" },
];

function App() {
  const [countryCode, setCountryCode] = useState(countries[0].code);
  const selected = countries.find((c) => c.code === countryCode);

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <label style={{ display: "grid", gap: 4 }}>
        Country
        <select
          value={countryCode}
          onChange={(e) => setCountryCode(e.target.value)}
          style={{ padding: 6, borderRadius: 6, border: "1px solid #d1d5db" }}
        >
          {countries.map((c) => (
            <option key={c.code} value={c.code}>
              {c.name}
            </option>
          ))}
        </select>
      </label>
      <p>Selected: <strong>{selected.name}</strong></p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "select-drives-preview",
      title: "Select value drives a preview",
      summary: "Use the chosen option to style another piece of UI.",
      code: `const themes = {
  ocean: { background: "#dbeafe", color: "#1e3a8a" },
  forest: { background: "#dcfce7", color: "#14532d" },
  sunset: { background: "#fee2e2", color: "#7f1d1d" },
};

function App() {
  const [theme, setTheme] = useState("ocean");

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <label style={{ display: "grid", gap: 4 }}>
        Theme
        <select
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          style={{ padding: 6, borderRadius: 6, border: "1px solid #d1d5db" }}
        >
          <option value="ocean">Ocean</option>
          <option value="forest">Forest</option>
          <option value="sunset">Sunset</option>
        </select>
      </label>
      <div
        style={{
          padding: 16,
          borderRadius: 8,
          border: "1px solid #d1d5db",
          ...themes[theme],
        }}
      >
        Preview of the "{theme}" theme.
      </div>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "multi-select",
      title: "Multi-select toppings",
      summary: "Read multiple chosen values from event.target.selectedOptions.",
      code: `const toppings = ["Cheese", "Pepperoni", "Mushroom", "Onion", "Olive"];

function App() {
  const [picked, setPicked] = useState(["Cheese"]);

  function handleChange(event) {
    const values = Array.from(event.target.selectedOptions).map((o) => o.value);
    setPicked(values);
  }

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <label style={{ display: "grid", gap: 4 }}>
        Toppings (ctrl/cmd-click for multiple)
        <select
          multiple
          value={picked}
          onChange={handleChange}
          style={{ padding: 6, borderRadius: 6, border: "1px solid #d1d5db", minWidth: 160 }}
        >
          {toppings.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </label>
      <p>Chosen: <strong>{picked.length ? picked.join(", ") : "none"}</strong></p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "select-with-confirm",
      title: "Select paired with a confirm button",
      summary: "Keep a draft selection separate from the confirmed value until submit.",
      code: `function App() {
  const [draft, setDraft] = useState("standard");
  const [confirmed, setConfirmed] = useState(null);

  function handleSubmit(event) {
    event.preventDefault();
    setConfirmed(draft);
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <label style={{ display: "grid", gap: 4 }}>
        Shipping speed
        <select
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          style={{ padding: 6, borderRadius: 6, border: "1px solid #d1d5db" }}
        >
          <option value="standard">Standard (5-7 days)</option>
          <option value="express">Express (2-3 days)</option>
          <option value="overnight">Overnight</option>
        </select>
      </label>
      <button type="submit">Confirm choice</button>
      <p>
        Confirmed: <strong>{confirmed ?? "nothing yet"}</strong>
      </p>
    </form>
  );
}

render(<App />);`,
    },
  ],
};
