import type { Topic } from "../../types";

export const reactJsxAttributesTopic: Topic = {
  id: "react-jsx-attributes",
  title: "React JSX Attributes",
  category: "JSX",
  shortExplanation: `JSX attributes look like HTML but are actually **JavaScript object properties** — so most are camelCase (\`onClick\`, \`tabIndex\`, \`readOnly\`) rather than lowercase.

- A couple are renamed outright: \`className\` instead of \`class\`, \`htmlFor\` instead of \`for\`, since both are reserved words in JavaScript
- Boolean attributes take a real boolean value or a shorthand with no value at all
- \`style\` takes an **object**, not a CSS string
- \`{...props}\` ==spreads== an object's keys onto an element as individual attributes`,
  longExplanation: `JSX attributes are not HTML attributes, even though they're written to look like them — under the hood JSX compiles to \`React.createElement(type, propsObject, ...children)\`, so every attribute becomes a key on a plain JavaScript object, following JS naming rules rather than HTML's.

- DOM event handlers and many DOM properties are **camelCase** (\`onClick\`, \`tabIndex\`, \`readOnly\`, \`maxLength\`) instead of HTML's all-lowercase, because camelCase is idiomatic JavaScript
- Two attributes are renamed entirely rather than just re-cased: \`class\` becomes \`className\` and \`for\` becomes \`htmlFor\`, since both are reserved words that can't be used as object keys here
- Boolean HTML attributes (\`disabled\`, \`checked\`, \`required\`) work as real booleans: \`disabled={true}\` and the bare shorthand \`disabled\` are equivalent, and \`disabled={false}\` correctly *removes* the attribute rather than rendering \`disabled="false"\`
- \`style\` expects a JavaScript **object** with camelCase CSS properties (\`backgroundColor\`, not \`background-color\`), whose numeric values are assumed to be pixels for most length properties
- Because props are just an object, \`{...someObject}\` ==spreads== an entire object's keys as individual attributes in one shot — useful for pass-through props on wrapper components; later explicit attributes still override earlier spread ones, following normal object-spread precedence`,
  examples: [
    {
      id: "camel-case-attributes",
      title: "camelCase events and DOM properties",
      summary: "onClick, tabIndex, and readOnly instead of HTML's lowercase equivalents.",
      code: `function App() {
  const [clicks, setClicks] = useState(0);

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <button onClick={() => setClicks((c) => c + 1)}>
        Clicked {clicks} times
      </button>
      <input readOnly value="You can't type here" style={{ padding: 6 }} />
      <div style={{ display: "flex", gap: 8 }}>
        <button tabIndex={2}>Second in tab order</button>
        <button tabIndex={1}>First in tab order</button>
      </div>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "class-name-and-conditional-classes",
      title: "className and conditional classes",
      summary: "className instead of class, built up conditionally with a template literal.",
      code: `function Badge({ label, active }) {
  const baseClass = "badge";
  const activeClass = active ? "badge--active" : "badge--inactive";

  return (
    <span
      className={\`\${baseClass} \${activeClass}\`}
      style={{
        padding: "4px 10px",
        borderRadius: 999,
        fontSize: 12,
        background: active ? "#dcfce7" : "#f3f4f6",
        color: active ? "#166534" : "#6b7280",
      }}
    >
      {label}
    </span>
  );
}

function App() {
  return (
    <div style={{ display: "flex", gap: 8 }}>
      <Badge label="Online" active={true} />
      <Badge label="Offline" active={false} />
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "boolean-attributes",
      title: "Boolean attributes: disabled toggle",
      summary: "disabled={true}, disabled shorthand, and disabled={false} all behave as real booleans.",
      code: `function App() {
  const [locked, setLocked] = useState(true);

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <button disabled={locked} style={{ padding: "8px 14px" }}>
        {locked ? "Locked" : "Submit"}
      </button>
      <label style={{ display: "flex", gap: 6, alignItems: "center" }}>
        <input
          type="checkbox"
          checked={!locked}
          onChange={(e) => setLocked(!e.target.checked)}
        />
        Unlock the button
      </label>
      <small style={{ color: "#6b7280" }}>
        disabled={"{true}"} and the bare "disabled" shorthand are equivalent.
      </small>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "style-object",
      title: "The style attribute takes an object",
      summary: "camelCase CSS properties in a JS object, not a semicolon-separated string.",
      code: `function App() {
  const [big, setBig] = useState(false);

  const boxStyle = {
    padding: 16,
    borderRadius: 8,
    backgroundColor: big ? "#2563eb" : "#e5e7eb",
    color: big ? "white" : "#111827",
    fontSize: big ? 20 : 14,
    transition: "all 150ms ease",
    width: 220,
    textAlign: "center",
  };

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <div style={boxStyle}>Styled via a JS object</div>
      <button onClick={() => setBig((b) => !b)}>Toggle size</button>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "spreading-props-onto-an-element",
      title: "Spreading an object onto an element",
      summary: "{...props} forwards every key of an object as individual JSX attributes.",
      code: `function App() {
  const inputProps = {
    type: "email",
    placeholder: "you@example.com",
    maxLength: 40,
    autoComplete: "off",
  };

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <input {...inputProps} style={{ padding: 6, width: 220 }} />
      {/* Explicit attributes after the spread still win, e.g. overriding maxLength: */}
      <input {...inputProps} maxLength={5} style={{ padding: 6, width: 220 }} />
    </div>
  );
}

render(<App />);`,
    },
  ],
};
