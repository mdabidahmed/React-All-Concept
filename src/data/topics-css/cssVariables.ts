import type { Topic } from "../../types";

export const cssVariablesTopic: Topic = {
  id: "css-variables",
  title: "CSS Variables (Custom Properties)",
  category: "CSS Advanced & Effects",
  shortExplanation: `**CSS custom properties** (informally called "CSS variables") let you store a value once — usually on \`:root\` — and reuse it anywhere with \`var(--name)\`, so a single change updates every place that references it.

- Declared as \`--main-color: #2563eb;\` (the double dash prefix is required)
- Read with \`var(--main-color)\`, optionally with a fallback: \`var(--main-color, blue)\`
- Unlike Sass/Less variables, they're ==live in the browser== — readable and writable at runtime via JavaScript or media queries, not just compiled away
- Perfect for theming (light/dark mode) since one variable swap restyles the whole page`,
  longExplanation: `CSS custom properties look similar to preprocessor variables (like Sass's \`$primary-color\`), but they are a fundamentally different, more powerful mechanism: they're a real part of the CSS language, resolved by the *browser* at render time rather than by a build tool before the CSS ever ships. That distinction — compile-time versus run-time — is what unlocks everything interesting about them.

**Declaring and reading.** A custom property is any property name starting with two dashes: \`--main-color: #2563eb;\`. It's typically declared on \`:root\` (the \`<html>\` element) so it's available globally, but it can be declared on any selector, in which case it's scoped to that element and its descendants — the same way any inherited CSS value would cascade down. To use the value elsewhere, wrap the name in \`var()\`: \`color: var(--main-color);\`. \`var()\` also accepts an optional second argument as a fallback, used only if the custom property is unset or invalid: \`color: var(--main-color, black);\`.

**Why "live" matters.** Because a Sass variable is just text substitution that happens before compilation, the resulting CSS file has no memory of the variable at all — it's baked into plain values. A CSS custom property, by contrast, still exists as a variable *after* the page loads. That means it can be:

- **Read and changed from JavaScript**: \`element.style.setProperty('--main-color', 'red')\` (or in React, setting it directly in an inline \`style\` object as \`{ "--main-color": "red" }\`) instantly restyles anything referencing that variable — no re-render of a stylesheet needed
- **Changed inside a media query**: a \`@media (prefers-color-scheme: dark)\` block can simply redeclare \`--bg-color\` and \`--text-color\` to new values on \`:root\`, and every element using \`var(--bg-color)\` updates automatically — this is the standard mechanism behind light/dark theming
- **Overridden locally**: redeclaring \`--spacing: 24px\` inside one specific component's wrapper changes the value only within that subtree, while the rest of the page keeps the outer default — this is inheritance in action, exactly like \`color\` or \`font-size\`

**Combining with calc().** Custom properties frequently pair with \`calc()\` for computed values that still respond to changes: \`width: calc(var(--base-size) * 2);\` recalculates automatically whenever \`--base-size\` changes, which a preprocessor variable baked into a fixed number could never do.

**Common gotchas.** The name must include the leading \`--\` both when declared and when referenced inside \`var()\` — forgetting it is the most common mistake. Custom properties are also *case-sensitive* (\`--Main-Color\` and \`--main-color\` are different properties) and their value is inherited as a raw token sequence, not type-checked, so an invalid value (like a color variable holding a random string) silently falls back to the fallback argument, or to nothing if no fallback is given and the property was never set. They also don't work inside media query *conditions* themselves (e.g. you can't do \`@media (min-width: var(--bp))\`) — they only work as *values* inside declarations.

**Why they exist.** Before custom properties, "theming" a site with a preprocessor meant compiling separate stylesheets for each theme, or shipping every possible color as a class name. Custom properties collapse that into one mechanism: change a handful of variables on \`:root\` (or toggle a class that redeclares them), and the entire page's colors, spacing, or fonts update instantly and consistently, whether that change comes from a media query, a class toggle, or a line of JavaScript.`,
  examples: [
    {
      id: "declare-and-use",
      title: "Declaring on :root and using var()",
      summary: "One set of custom properties declared once, reused across several unrelated elements.",
      code: `function VariableStyles() {
  return (
    <style>{\`
      :root {
        --brand-color: #7c3aed;
        --radius: 10px;
      }
      .var-card {
        border: 2px solid var(--brand-color);
        border-radius: var(--radius);
        padding: 14px;
      }
      .var-heading { color: var(--brand-color); margin: 0 0 6px; }
      .var-button {
        background: var(--brand-color);
        color: white;
        border: none;
        border-radius: var(--radius);
        padding: 8px 14px;
      }
    \`}</style>
  );
}

function App() {
  return (
    <div className="var-card">
      <VariableStyles />
      <h4 className="var-heading">Reused everywhere</h4>
      <p style={{ margin: "0 0 10px" }}>
        Both the border color and the heading text read the same --brand-color.
      </p>
      <button className="var-button">Also --brand-color</button>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "fallback-value",
      title: "var() with a fallback",
      summary: "When a custom property is never declared, var()'s second argument is used instead.",
      code: `function FallbackStyles() {
  return (
    <style>{\`
      .fallback-box {
        padding: 14px;
        border-radius: 8px;
        /* --accent is never declared anywhere, so the fallback "teal" applies */
        background: var(--accent, teal);
        color: white;
      }
    \`}</style>
  );
}

function App() {
  return (
    <div style={{ display: "grid", gap: 10 }}>
      <FallbackStyles />
      <div className="fallback-box">
        background: var(--accent, teal) — since --accent was never set, this
        falls back to teal automatically.
      </div>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "light-dark-theme-toggle",
      title: "Light/dark theming by swapping variables",
      summary: "Toggling one class on the wrapper redeclares the theme variables, restyling everything inside it.",
      code: `function ThemeStyles() {
  return (
    <style>{\`
      .theme-wrap {
        --bg: #ffffff;
        --fg: #111827;
        --card-bg: #f3f4f6;
        background: var(--bg);
        color: var(--fg);
        padding: 20px;
        border-radius: 10px;
        transition: background 0.2s ease, color 0.2s ease;
      }
      .theme-wrap.dark {
        --bg: #0f172a;
        --fg: #f1f5f9;
        --card-bg: #1e293b;
      }
      .theme-card {
        background: var(--card-bg);
        padding: 12px;
        border-radius: 8px;
        margin-top: 10px;
      }
    \`}</style>
  );
}

function App() {
  const [dark, setDark] = useState(false);
  return (
    <div>
      <ThemeStyles />
      <div className={"theme-wrap" + (dark ? " dark" : "")}>
        <button onClick={() => setDark((d) => !d)}>
          Switch to {dark ? "light" : "dark"} mode
        </button>
        <div className="theme-card">
          This card's background comes from --card-bg, which is redeclared
          entirely by the ".dark" class — nothing else needs to change.
        </div>
      </div>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "js-driven-variable",
      title: "Setting a custom property from React state (inline style)",
      summary: "Custom properties can be written directly on an inline style object, not just in a <style> block.",
      code: `function App() {
  const [hue, setHue] = useState(220);

  // Setting a CSS custom property straight from an inline style object —
  // the React-friendly alternative to element.style.setProperty(...).
  const wrapperStyle = {
    "--swatch-color": "hsl(" + hue + ", 80%, 55%)",
    display: "grid",
    gap: 10,
    justifyItems: "start",
  };

  return (
    <div style={wrapperStyle}>
      <div
        style={{
          width: 100,
          height: 60,
          borderRadius: 8,
          background: "var(--swatch-color)",
        }}
      />
      <input
        type="range"
        min="0"
        max="360"
        value={hue}
        onChange={(e) => setHue(Number(e.target.value))}
      />
      <p style={{ margin: 0, color: "#6b7280", fontSize: 13 }}>
        Dragging the slider updates --swatch-color on the wrapper; the swatch
        below reads it with var(--swatch-color).
      </p>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
