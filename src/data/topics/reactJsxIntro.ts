import type { Topic } from "../../types";

export const reactJsxIntroTopic: Topic = {
  id: "react-jsx-intro",
  title: "React JSX Intro",
  category: "JSX",
  shortExplanation: `==JSX== is a syntax extension that lets you write markup-like tags directly in JavaScript.

- A compiler like Babel or esbuild turns each tag into a \`React.createElement\` call (or the equivalent automatic-runtime call) *before* the browser ever sees it
- React uses it because it keeps markup and the logic driving it in **one place**
- You get full JavaScript expressions and tooling support, instead of separate template strings`,
  longExplanation: `JSX looks like HTML embedded in JavaScript, but it is not a templating language — browsers can't run it directly, it's syntax sugar a build step compiles into ordinary function calls.

- \`<h1 className="title">Hi</h1>\` compiles to \`React.createElement('h1', { className: 'title' }, 'Hi')\`, a plain call that returns a lightweight object describing that element
- React's designers chose this over separate template files because a component's markup and the logic computing it live in the **same function** — real JS expressions (loops via \`map\`, conditionals via ternary or \`&&\`) instead of a template language's limited mini-syntax
- It also brings the surrounding tooling for free: syntax highlighting, prop type-checking, linting, "go to definition"
- Because JSX is JS function calls under the hood, a component must return a **single root element** — a *Fragment* (\`<>...</>\`) lets you group siblings without adding a real DOM node
- \`class\` is a reserved word, so JSX uses \`className\` (and \`htmlFor\` instead of \`for\`); most other attributes are camelCased to match DOM property names (\`onClick\`, \`tabIndex\`)
- Void elements like \`<img>\` or \`<input>\` must be self-closed with a trailing slash, since JSX is parsed as JavaScript expressions, not lenient HTML
- Curly braces \`{}\` are the ==single mechanism== for escaping from static markup into a JavaScript value — a variable, a function call, any expression`,
  examples: [
    {
      id: "embedded-expression",
      title: "A simple element with an embedded expression",
      summary: "Curly braces drop a JavaScript expression straight into the markup.",
      code: `function App() {
  const name = "Ada";
  return <p>Hello, {name.toUpperCase()}! You have {2 + 3} new messages.</p>;
}

render(<App />);`,
    },
    {
      id: "jsx-desugars-to-createelement",
      title: "JSX desugars to React.createElement",
      summary: "The exact same UI, written once with JSX and once by calling createElement directly.",
      code: `function App() {
  const jsxVersion = <button style={{ padding: "6px 12px" }}>Click me</button>;
  const createElementVersion = React.createElement(
    "button",
    { style: { padding: "6px 12px" } },
    "Click me"
  );

  return (
    <div style={{ display: "grid", gap: 12 }}>
      <div>
        <small style={{ color: "#6b7280" }}>Written as JSX:</small>
        <div>{jsxVersion}</div>
      </div>
      <div>
        <small style={{ color: "#6b7280" }}>Written as React.createElement:</small>
        <div>{createElementVersion}</div>
      </div>
      <small>Both produce the exact same element — JSX just compiles down to the second form.</small>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "fragment-siblings",
      title: "Grouping siblings with a Fragment",
      summary: "Return multiple top-level elements without adding an extra wrapper div.",
      code: `function Row() {
  return (
    <>
      <dt style={{ fontWeight: 600 }}>Status</dt>
      <dd style={{ margin: 0 }}>Online</dd>
    </>
  );
}

function App() {
  return (
    <dl style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "4px 12px", maxWidth: 240 }}>
      <Row />
    </dl>
  );
}

render(<App />);`,
    },
    {
      id: "attribute-naming",
      title: "className and attribute naming gotchas",
      summary: "className instead of class, camelCase attributes, and a self-closed void element.",
      code: `function App() {
  const [checked, setChecked] = useState(false);

  return (
    <div className="demo-box" style={{ display: "grid", gap: 8, maxWidth: 260 }}>
      <img
        src="https://via.placeholder.com/40"
        alt="placeholder avatar"
        style={{ borderRadius: "50%" }}
      />
      <label htmlFor="agree" style={{ display: "flex", gap: 6, alignItems: "center" }}>
        <input
          id="agree"
          type="checkbox"
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
          tabIndex={0}
        />
        I agree (className, htmlFor, onChange, tabIndex are all camelCased)
      </label>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "inline-computation",
      title: "Inline computation inside curly braces",
      summary: "Curly braces can hold any expression, not just a variable — including a computed value.",
      code: `function App() {
  const [price, setPrice] = useState(19.99);
  const [quantity, setQuantity] = useState(1);

  return (
    <div style={{ display: "grid", gap: 10, maxWidth: 260 }}>
      <label style={{ display: "grid", gap: 4 }}>
        Price
        <input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} />
      </label>
      <label style={{ display: "grid", gap: 4 }}>
        Quantity
        <input type="number" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} />
      </label>
      <p style={{ margin: 0 }}>
        Total: <strong>\${(price * quantity).toFixed(2)}</strong>
      </p>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
