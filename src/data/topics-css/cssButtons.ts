import type { Topic } from "../../types";

export const cssButtonsTopic: Topic = {
  id: "css-buttons",
  title: "CSS Buttons",
  category: "CSS Components",
  shortExplanation: `A good button styling system starts with one **base** style, then layers ==variant== classes (primary/secondary/outline) and ==state== pseudo-classes (\`:hover\`, \`:active\`, disabled) on top.

- Base: consistent \`padding\`, \`borderRadius\`, \`fontWeight\`, and a \`cursor: "pointer"\`
- \`:hover\` and \`:active\` give feedback that a click is possible, and that it's registering
- Variant classes (primary/secondary/outline) reuse the same base shape with different colors
- A disabled state (\`disabled\` attribute + \`:disabled\` styling) signals a button can't currently be clicked`,
  longExplanation: `Buttons appear everywhere in an interface, and the cleanest way to style them avoids repeating the same declarations on every single one: define one shared **base** style covering the shape and behavior every button needs, then layer smaller **variant** and **state** rules on top for the parts that actually differ.

**The base style** typically covers: \`padding\` (generous enough for a comfortable click/tap target — a common accessibility guideline calls for at least roughly 44x44px of clickable area), \`borderRadius\` for the corner shape, \`border: "none"\` (buttons don't need a native border once they're custom-styled), \`fontWeight\` and \`fontSize\` to match the rest of the UI, and \`cursor: "pointer"\` — without this last one, a \`<button>\` unexpectedly keeps the default arrow cursor in some browsers rather than the hand cursor users expect over anything clickable.

**Interactive states** communicate two different things at two different moments:

- \`:hover\` fires the instant the pointer moves over the button, and signals "this is clickable" *before* any click happens — commonly a slightly darker or lighter background than the resting state
- \`:active\` fires only during the actual click (mouse button down, not yet released), and signals "this click is registering right now" — commonly an even darker shade, or a tiny \`transform: "scale(0.97)"\` that makes the button feel physically pressed
- Layering both together (a graduated resting → hover → active color progression) is what makes a button feel tactile and responsive rather than static

**Variants** let one base shape serve several purposes without duplicating the shared properties:

- **Primary** — the highest-emphasis action on a screen (solid background, strong color, white text) — there should typically be at most one true primary action visible at a time, so the eye knows exactly what to do next
- **Secondary** — a lower-emphasis but still real action (often a lighter background, or a solid neutral color) — used for anything that isn't the one thing you most want the user to do
- **Outline/ghost** — the lowest-emphasis variant (transparent background, just a border and colored text) — good for tertiary actions like "Cancel" that shouldn't visually compete with a nearby primary button

Since all three variants share the same \`padding\`/\`borderRadius\`/\`fontWeight\`/\`cursor\`, only the color-related properties need to change between them — this is the entire point of separating base from variant.

**The disabled state** communicates that an action currently *cannot* be taken. The real HTML \`disabled\` attribute on a \`<button>\` does more than look different — it also blocks click events and keyboard activation natively, and is exposed to assistive technology automatically. The matching \`:disabled\` pseudo-class then handles the visual side: typically reduced \`opacity\`, a muted background/text color, and \`cursor: "not-allowed"\` to make the non-interactive state visually obvious. Styling a button to merely *look* disabled without the real \`disabled\` attribute is a common accessibility mistake — it still fires clicks and remains focusable, silently confusing users who can't tell the difference.

Base padding/shape properties work fine as inline \`style\` objects, but \`:hover\`, \`:active\`, and \`:disabled\` are pseudo-classes and need a genuine \`<style>\` tag to demonstrate, the same pattern used throughout this sandbox for interactive states.`,
  examples: [
    {
      id: "base-plus-hover-active",
      title: "A base button with hover and active feedback",
      summary: "Click and hold the button — three distinct shades for resting, hover, and active states.",
      code: `function ButtonStyles() {
  return (
    <style>{\`
      .btn-base {
        padding: 10px 20px;
        border: none;
        border-radius: 8px;
        font-weight: 600;
        font-size: 14px;
        cursor: pointer;
        background: #2563eb;
        color: white;
        transition: background 0.15s ease, transform 0.05s ease;
      }
      .btn-base:hover { background: #1d4ed8; }
      .btn-base:active { background: #1e40af; transform: scale(0.97); }
    \`}</style>
  );
}

function App() {
  return (
    <div>
      <ButtonStyles />
      <button className="btn-base">Click and hold me</button>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "variant-classes",
      title: "Primary, secondary, and outline variants sharing one base",
      summary: "Three visual weights of the same button shape, for actions of different importance.",
      code: `function ButtonStyles() {
  return (
    <style>{\`
      .btn {
        padding: 10px 20px;
        border-radius: 8px;
        font-weight: 600;
        font-size: 14px;
        cursor: pointer;
        transition: background 0.15s ease, color 0.15s ease, border-color 0.15s ease;
      }
      .btn-primary { border: none; background: #2563eb; color: white; }
      .btn-primary:hover { background: #1d4ed8; }

      .btn-secondary { border: none; background: #e5e7eb; color: #111827; }
      .btn-secondary:hover { background: #d1d5db; }

      .btn-outline { border: 2px solid #2563eb; background: transparent; color: #2563eb; }
      .btn-outline:hover { background: #eff6ff; }
    \`}</style>
  );
}

function App() {
  return (
    <div style={{ display: "flex", gap: 10 }}>
      <ButtonStyles />
      <button className="btn btn-primary">Save changes</button>
      <button className="btn btn-secondary">Learn more</button>
      <button className="btn btn-outline">Cancel</button>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "disabled-state",
      title: "A real disabled button, styled with :disabled",
      summary: "Toggling a real disabled attribute both blocks clicks and drives its own visual style.",
      code: `function ButtonStyles() {
  return (
    <style>{\`
      .btn-toggleable {
        padding: 10px 20px;
        border: none;
        border-radius: 8px;
        font-weight: 600;
        font-size: 14px;
        cursor: pointer;
        background: #16a34a;
        color: white;
        transition: background 0.15s ease, opacity 0.15s ease;
      }
      .btn-toggleable:hover:not(:disabled) { background: #15803d; }
      .btn-toggleable:disabled {
        background: #9ca3af;
        color: #f3f4f6;
        cursor: not-allowed;
        opacity: 0.7;
      }
    \`}</style>
  );
}

function App() {
  const [agreed, setAgreed] = useState(false);
  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <ButtonStyles />
      <label style={{ fontSize: 13 }}>
        <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} /> I agree to the terms
      </label>
      <button className="btn-toggleable" disabled={!agreed}>
        Continue
      </button>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "icon-and-loading-button",
      title: "A button with an icon, and a loading variant",
      summary: "Flexbox centers an icon next to text; a loading state disables the button and swaps its label.",
      code: `function ButtonStyles() {
  return (
    <style>{\`
      .btn-icon {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 10px 18px;
        border: none;
        border-radius: 8px;
        font-weight: 600;
        font-size: 14px;
        cursor: pointer;
        background: #7c3aed;
        color: white;
        transition: background 0.15s ease, opacity 0.15s ease;
      }
      .btn-icon:hover:not(:disabled) { background: #6d28d9; }
      .btn-icon:disabled { opacity: 0.6; cursor: not-allowed; }
    \`}</style>
  );
}

function App() {
  const [loading, setLoading] = useState(false);
  const handleClick = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1500);
  };
  return (
    <div>
      <ButtonStyles />
      <button className="btn-icon" onClick={handleClick} disabled={loading}>
        <span>{loading ? "⏳" : "🚀"}</span>
        {loading ? "Launching..." : "Launch"}
      </button>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
