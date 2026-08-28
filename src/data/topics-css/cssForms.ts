import type { Topic } from "../../types";

export const cssFormsTopic: Topic = {
  id: "css-forms",
  title: "CSS Styling Forms",
  category: "CSS Components",
  shortExplanation: `Form controls (\`input\`, \`textarea\`, \`select\`, \`button\`) arrive with inconsistent browser default styling, so real projects reset a few properties on all of them before styling anything else.

- \`boxSizing: "border-box"\` — so \`padding\` and \`border\` don't add to the declared \`width\`
- \`:focus\` gives a clear visual signal of which control currently has keyboard focus
- Custom checkboxes/radios usually restyle a real (visually hidden) input plus a styled sibling, rather than removing the input entirely
- Consistent \`padding\`, \`border\`, and \`borderRadius\` across every control keeps a form feeling cohesive`,
  longExplanation: `Form controls are some of the oldest elements on the web, and browsers still render them with their own native, inconsistent chrome by default — different padding, different border styles, different fonts across \`input\`, \`textarea\`, \`select\`, and \`button\`. Styling a form well is mostly about applying a small, consistent set of resets and states across every control, rather than anything exotic.

**The box-sizing reset.** By default, an element's declared \`width\` covers only its content — \`padding\` and \`border\` are added *on top*, so a text input styled with \`width: "100%"; padding: 10px; border: 1px solid gray\` ends up wider than its container by exactly the padding and border. \`boxSizing: "border-box"\` changes this so the declared \`width\` already *includes* padding and border, making layout math predictable again. This single property is close to universal in real stylesheets, and it matters especially for form inputs because they combine width constraints with padding and borders more than almost any other element.

**\`:focus\` states.** The moment a user tabs to or clicks into a control, it becomes the "focused" element, and \`:focus\` targets exactly that state. Browsers apply a default focus ring (usually a blue outline) automatically, and while it's tempting to remove it for aesthetic reasons, doing so without providing a replacement breaks keyboard accessibility — a sighted keyboard user has no way to see where they are on the page. The right approach is to *restyle* focus rather than delete it: a custom \`border\` color change, a \`boxShadow\` "glow," or a redrawn \`outline\` all communicate focus clearly while matching a design's visual language.

**Custom checkboxes and radios.** The native checkbox/radio square is notoriously hard to restyle directly and looks different across every browser. The standard technique is: keep the real \`<input type="checkbox">\` in the DOM (for correct behavior, keyboard support, and form submission) but visually hide it, then style a **sibling element** (often a \`<span>\`) to look like the checkbox/radio, driven by the real input's checked state via the \`:checked\` pseudo-class and a general sibling combinator (\`input:checked + span { ... }\`). This preserves genuine accessibility and native behavior while giving full visual control — a much better approach than trying to override native control styling directly, which has inconsistent, limited support across browsers.

**Consistency across controls.** A form reads as polished when every control — text inputs, a textarea, a select, buttons — shares the same \`padding\`, \`borderRadius\`, \`border\` color/width, and font size, so the eye doesn't register jarring size or shape differences between adjacent fields. \`textarea\` additionally usually gets \`resize: "vertical"\` (rather than the default free resize in both directions, which can visually break a layout) and a \`fontFamily\` matching the rest of the page — browsers default \`textarea\` and \`select\` to a system monospace/native font that doesn't automatically match the surrounding text.

Every property discussed above — \`boxSizing\`, \`padding\`, \`border\`, \`borderRadius\` — works fine as a plain inline \`style\` object. \`:focus\` and \`:checked\`, being pseudo-classes, need a genuine \`<style>\` tag with real selectors, the same technique used throughout this sandbox for any hover/focus/checked-driven behavior.`,
  examples: [
    {
      id: "basic-styled-inputs",
      title: "Consistent styling across input, textarea, and select",
      summary: "The same padding, border, and border-radius applied uniformly, with box-sizing: border-box.",
      code: `function App() {
  const controlStyle = {
    boxSizing: "border-box",
    width: "100%",
    padding: "10px 12px",
    border: "1px solid #d1d5db",
    borderRadius: 6,
    fontSize: 14,
    fontFamily: "inherit",
  };
  return (
    <form style={{ display: "grid", gap: 12, maxWidth: 280 }}>
      <input type="text" placeholder="Full name" style={controlStyle} />
      <textarea placeholder="Message" rows={3} style={{ ...controlStyle, resize: "vertical" }} />
      <select style={controlStyle}>
        <option>Choose a plan</option>
        <option>Basic</option>
        <option>Pro</option>
      </select>
    </form>
  );
}

render(<App />);`,
    },
    {
      id: "focus-states",
      title: "A custom :focus style instead of removing it",
      summary: "Tab or click into each field — the border color and a soft glow replace the default outline.",
      code: `function FocusStyles() {
  return (
    <style>{\`
      .focus-input {
        box-sizing: border-box;
        width: 100%;
        padding: 10px 12px;
        border: 1px solid #d1d5db;
        border-radius: 6px;
        font-size: 14px;
        outline: none;
        transition: border-color 0.15s ease, box-shadow 0.15s ease;
      }
      .focus-input:focus {
        border-color: #2563eb;
        box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.2);
      }
    \`}</style>
  );
}

function App() {
  return (
    <form style={{ display: "grid", gap: 12, maxWidth: 280 }}>
      <FocusStyles />
      <input className="focus-input" type="text" placeholder="Email" />
      <input className="focus-input" type="password" placeholder="Password" />
    </form>
  );
}

render(<App />);`,
    },
    {
      id: "custom-checkbox",
      title: "A custom checkbox built from a hidden real input plus a styled span",
      summary: "The real checkbox stays in the DOM for accessibility, visually hidden; a sibling span is drawn based on :checked.",
      code: `function CheckboxStyles() {
  return (
    <style>{\`
      .custom-check { display: inline-flex; align-items: center; gap: 8px; cursor: pointer; }
      .custom-check input {
        position: absolute;
        opacity: 0;
        width: 0;
        height: 0;
      }
      .check-box {
        width: 20px;
        height: 20px;
        border: 2px solid #9ca3af;
        border-radius: 5px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 13px;
        transition: background 0.15s ease, border-color 0.15s ease;
      }
      .custom-check input:checked + .check-box {
        background: #2563eb;
        border-color: #2563eb;
      }
      .custom-check input:focus-visible + .check-box {
        box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.25);
      }
    \`}</style>
  );
}

function App() {
  const [checked, setChecked] = useState(true);
  return (
    <div>
      <CheckboxStyles />
      <label className="custom-check">
        <input type="checkbox" checked={checked} onChange={(e) => setChecked(e.target.checked)} />
        <span className="check-box">{checked ? "✓" : ""}</span>
        Email me updates
      </label>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "full-form-layout",
      title: "A complete small form with labels, a submit button, and spacing",
      summary: "All the pieces together: consistent controls, focus states, and a button styled to match.",
      code: `function FormStyles() {
  return (
    <style>{\`
      .demo-form .field { display: grid; gap: 4px; }
      .demo-form label { font-size: 13px; font-weight: 600; color: #374151; }
      .demo-form input, .demo-form textarea {
        box-sizing: border-box;
        padding: 9px 11px;
        border: 1px solid #d1d5db;
        border-radius: 6px;
        font-size: 14px;
        outline: none;
        transition: border-color 0.15s ease;
      }
      .demo-form input:focus, .demo-form textarea:focus {
        border-color: #2563eb;
      }
      .demo-form button {
        padding: 10px 16px;
        background: #2563eb;
        color: white;
        border: none;
        border-radius: 6px;
        font-weight: 600;
        cursor: pointer;
      }
      .demo-form button:hover { background: #1d4ed8; }
    \`}</style>
  );
}

function App() {
  return (
    <form className="demo-form" style={{ display: "grid", gap: 14, maxWidth: 280 }} onSubmit={(e) => e.preventDefault()}>
      <FormStyles />
      <div className="field">
        <label htmlFor="name">Name</label>
        <input id="name" type="text" placeholder="Ada Lovelace" />
      </div>
      <div className="field">
        <label htmlFor="msg">Message</label>
        <textarea id="msg" rows={3} placeholder="Say hello..." />
      </div>
      <button type="submit">Send message</button>
    </form>
  );
}

render(<App />);`,
    },
  ],
};
