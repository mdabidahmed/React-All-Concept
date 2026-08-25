import type { Topic } from "../../types";

export const reactRadioTopic: Topic = {
  id: "react-radio",
  title: "React Radio",
  category: "Forms",
  shortExplanation:
    "A controlled radio group keeps one piece of state for the whole group's selected value, while every radio shares the same name and carries its own value. Each radio's checked prop is derived by comparing that shared state to its own value.",
  longExplanation:
    "Radio buttons are inherently a group concept — the browser only enforces mutual exclusivity among radios that share a name attribute — but React's controlled model puts the selection in exactly one place: a single state variable representing which value is currently chosen. Each <input type=\"radio\"> in the group gets the same name (so the browser groups them, and so any native fallback behavior is sane), its own distinct value, and a checked prop computed as selectedValue === thisRadio's own value; the onChange handler simply calls the setter with event.target.value. This is a subtly different shape from a controlled checkbox group, where each item tracks its own boolean — here there is exactly one 'currently selected' slot, which maps naturally onto mutually-exclusive choices like a shipping method, a subscription tier, or a size. As with selects and checkboxes, options are often generated from an array via .map(), each rendering one radio with a stable key, which keeps the group in sync with data instead of hardcoded markup. Because the selected value is ordinary state, it composes with the rest of the form exactly like any other field: it can drive conditional content elsewhere on the page (e.g. an estimated delivery date that changes with the chosen shipping method), participate in a validation check that disables a 'continue' button until something is selected, or coexist with a second, entirely independent radio group as long as the two groups use different name values — name only needs to be unique within a group, not across the whole form, and reusing it across two logically distinct choices would incorrectly merge them into one mutually-exclusive set.",
  examples: [
    {
      id: "basic-radio-group",
      title: "Basic radio group",
      summary: "One state value shared by three radios with the same name.",
      code: `function App() {
  const [plan, setPlan] = useState("basic");

  return (
    <div style={{ display: "grid", gap: 8, justifyItems: "start" }}>
      {["basic", "pro", "enterprise"].map((option) => (
        <label key={option} style={{ display: "flex", gap: 8, alignItems: "center", textTransform: "capitalize" }}>
          <input
            type="radio"
            name="plan"
            value={option}
            checked={plan === option}
            onChange={(e) => setPlan(e.target.value)}
          />
          {option}
        </label>
      ))}
      <p>Selected plan: <strong>{plan}</strong></p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "radio-group-from-array",
      title: "Radio group generated from an array",
      summary: "Map over a data array to render each radio with a label and price.",
      code: `const sizes = [
  { value: "s", label: "Small", price: 8 },
  { value: "m", label: "Medium", price: 10 },
  { value: "l", label: "Large", price: 12 },
];

function App() {
  const [size, setSize] = useState("m");
  const selected = sizes.find((s) => s.value === size);

  return (
    <div style={{ display: "grid", gap: 8, justifyItems: "start" }}>
      {sizes.map((s) => (
        <label key={s.value} style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <input
            type="radio"
            name="size"
            value={s.value}
            checked={size === s.value}
            onChange={(e) => setSize(e.target.value)}
          />
          {s.label} (\${s.price})
        </label>
      ))}
      <p>Total: <strong>\${selected.price}</strong></p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "radio-drives-conditional-content",
      title: "Radio group driving conditional content",
      summary: "The chosen shipping method changes an estimate shown below the group.",
      code: `const methods = {
  standard: { label: "Standard", days: "5-7 business days", price: 0 },
  express: { label: "Express", days: "2-3 business days", price: 12 },
  overnight: { label: "Overnight", days: "1 business day", price: 25 },
};

function App() {
  const [method, setMethod] = useState("standard");
  const info = methods[method];

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      {Object.entries(methods).map(([key, m]) => (
        <label key={key} style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <input
            type="radio"
            name="shipping"
            value={key}
            checked={method === key}
            onChange={(e) => setMethod(e.target.value)}
          />
          {m.label}
        </label>
      ))}
      <div style={{ padding: 12, border: "1px solid #d1d5db", borderRadius: 6 }}>
        Arrives in <strong>{info.days}</strong> — {info.price === 0 ? "free" : \`$\${info.price}\`}
      </div>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "radio-required-validation",
      title: "Required radio selection",
      summary: "Disable a continue button until one radio in the group is chosen.",
      code: `function App() {
  const [choice, setChoice] = useState(null);

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      {["yes", "no"].map((option) => (
        <label key={option} style={{ display: "flex", gap: 8, alignItems: "center", textTransform: "capitalize" }}>
          <input
            type="radio"
            name="confirmation"
            value={option}
            checked={choice === option}
            onChange={(e) => setChoice(e.target.value)}
          />
          {option}
        </label>
      ))}
      <button disabled={choice === null}>Continue</button>
      {choice === null && <small>Select an option to enable Continue.</small>}
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "two-independent-radio-groups",
      title: "Two independent radio groups",
      summary: "Different name values keep two groups from interfering with each other.",
      code: `function App() {
  const [color, setColor] = useState("black");
  const [material, setMaterial] = useState("cotton");

  return (
    <div style={{ display: "flex", gap: 32 }}>
      <div style={{ display: "grid", gap: 6 }}>
        <strong>Color</strong>
        {["black", "white", "blue"].map((option) => (
          <label key={option} style={{ display: "flex", gap: 8, alignItems: "center", textTransform: "capitalize" }}>
            <input
              type="radio"
              name="color"
              value={option}
              checked={color === option}
              onChange={(e) => setColor(e.target.value)}
            />
            {option}
          </label>
        ))}
      </div>
      <div style={{ display: "grid", gap: 6 }}>
        <strong>Material</strong>
        {["cotton", "linen", "wool"].map((option) => (
          <label key={option} style={{ display: "flex", gap: 8, alignItems: "center", textTransform: "capitalize" }}>
            <input
              type="radio"
              name="material"
              value={option}
              checked={material === option}
              onChange={(e) => setMaterial(e.target.value)}
            />
            {option}
          </label>
        ))}
      </div>
      <p style={{ alignSelf: "start" }}>
        Chosen: <strong>{color}</strong> / <strong>{material}</strong>
      </p>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
