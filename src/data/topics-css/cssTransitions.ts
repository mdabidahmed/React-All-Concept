import type { Topic } from "../../types";

export const cssTransitionsTopic: Topic = {
  id: "css-transitions",
  title: "CSS Transitions",
  category: "CSS Advanced & Effects",
  shortExplanation: `A \`transition\` smoothly animates a property ==between two states== — its current value and whatever it changes to — instead of the change happening instantly.

- \`transition-property\` — which property(ies) to animate (or \`all\`)
- \`transition-duration\` — how long the change takes, e.g. \`0.3s\`
- \`transition-timing-function\` — the pacing curve: \`ease\`, \`linear\`, \`ease-in-out\`, \`cubic-bezier(...)\`
- \`transition-delay\` — wait before starting
- Shorthand: \`transition: property duration timing-function delay;\`
- Needs a **trigger** — a \`:hover\`, a class toggle, a React state change — unlike \`@keyframes\`, which can run on its own`,
  longExplanation: `A \`transition\` doesn't create motion by itself — it changes *how* a property change is rendered. Without a transition, flipping a property (say, \`background-color\` from blue to red) happens in a single frame; with a transition declared on that property, the browser instead interpolates smoothly between the old and new value over a set duration. Transitions only ever animate between **two states**: wherever a property currently is, and wherever it's headed — there's no concept of a multi-step sequence, which is the key difference from \`@keyframes\` animations (covered in the CSS Animations topic).

**The four longhand properties:**

- **\`transition-property\`** names which CSS property (or comma-separated list of properties) should animate — \`transition-property: background-color, transform;\`. The keyword \`all\` animates every animatable property that changes, which is convenient but can accidentally animate properties you didn't intend to.
- **\`transition-duration\`** sets how long the interpolation takes, in seconds or milliseconds (\`0.3s\`, \`300ms\`). A duration of \`0\` (the default) means no visible transition happens at all.
- **\`transition-timing-function\`** controls the *pacing* of the change over that duration — not just linear progress, but an acceleration curve. \`ease\` (the default) starts slow, speeds up, then slows down again; \`linear\` moves at a constant rate; \`ease-in\` starts slow and accelerates through to the end; \`ease-out\` starts fast and decelerates; and \`cubic-bezier(x1, y1, x2, y2)\` defines a fully custom curve for fine-tuned motion.
- **\`transition-delay\`** waits a specified amount of time *before* the transition begins, useful for staggering several transitions or waiting for another effect to finish first.

**The shorthand.** Rather than writing all four separately, \`transition: background-color 0.3s ease-in-out 0s;\` packs them into one declaration, in the order *property, duration, timing-function, delay* (delay is optional and defaults to \`0s\`). Multiple properties with different timings can be comma-separated: \`transition: transform 0.2s ease, opacity 0.4s linear;\`.

**What triggers a transition.** A transition only plays when the *value of the watched property actually changes* — and something has to cause that change. In plain CSS, the classic trigger is a pseudo-class like \`:hover\` or \`:focus\` — the element's computed style changes the instant the mouse enters or leaves, and the transition smooths that jump. In a React app, the equivalent trigger is a state change causing a different \`style\` object or class name to be rendered — toggling a boolean that flips a color, position, or size will transition smoothly as long as the same element (not a remounted one) receives the new style, and a \`transition\` property was already present *before* the change.

**Transitions vs. animations, briefly.** A transition needs an external trigger and only ever moves between two endpoints; it cannot loop, and it cannot pass through more than a start and end state on its own. \`@keyframes\` animations, by contrast, can start automatically on mount, define any number of intermediate steps via percentage stops, and loop indefinitely — at the cost of more setup (a named \`@keyframes\` block, plus the \`animation\` shorthand to play it). As a rule of thumb: reach for a **transition** for simple state-driven feedback (a hover effect, an open/closed toggle, a color change on click), and reach for **\`@keyframes\`** when you need a self-running or looping multi-step sequence.

**Common gotchas.** A transition can't animate from \`display: none\` to \`display: block\` (or most other keyword-only properties) because there's no meaningful "halfway point" between them — this is why fade-in/out effects usually transition \`opacity\` (and sometimes \`visibility\` with a delay) instead. Also, if an element is newly mounted already *in* its final state, there's nothing to transition from — the transition needs to witness an actual value change on an element that already exists in the DOM.`,
  examples: [
    {
      id: "hover-color-transition",
      title: "Transitioning on :hover",
      summary: "background-color and transform both transition smoothly when the pointer enters the box.",
      code: `function HoverStyles() {
  return (
    <style>{\`
      .transition-box {
        width: 140px;
        padding: 16px;
        border-radius: 8px;
        background: #2563eb;
        color: white;
        text-align: center;
        transition: background-color 0.3s ease, transform 0.3s ease;
      }
      .transition-box:hover {
        background-color: #dc2626;
        transform: scale(1.08);
      }
    \`}</style>
  );
}

function App() {
  return (
    <div>
      <HoverStyles />
      <div className="transition-box">Hover me</div>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "react-state-triggered-transition",
      title: "Triggering a transition from React state",
      summary: "A button toggles a boolean; the same element's style object changes, and the transition smooths the change.",
      code: `function App() {
  const [open, setOpen] = useState(false);

  const boxStyle = {
    width: 160,
    height: open ? 120 : 40,
    background: open ? "#16a34a" : "#9ca3af",
    borderRadius: 8,
    transition: "height 0.35s ease, background-color 0.35s ease",
  };

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <button onClick={() => setOpen((o) => !o)}>{open ? "Collapse" : "Expand"}</button>
      <div style={boxStyle} />
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "timing-functions-compared",
      title: "Comparing timing functions side by side",
      summary: "Four boxes with identical durations but different transition-timing-function values, all triggered together.",
      code: `function App() {
  const [moved, setMoved] = useState(false);
  const curves = [
    { label: "linear", value: "linear" },
    { label: "ease", value: "ease" },
    { label: "ease-in", value: "ease-in" },
    { label: "cubic-bezier", value: "cubic-bezier(0.68, -0.55, 0.27, 1.55)" },
  ];

  return (
    <div style={{ display: "grid", gap: 14 }}>
      <button onClick={() => setMoved((m) => !m)} style={{ justifySelf: "start" }}>
        {moved ? "Reset" : "Run"}
      </button>
      {curves.map((curve) => (
        <div key={curve.label} style={{ display: "grid", gap: 4 }}>
          <span style={{ fontSize: 12, color: "#6b7280" }}>{curve.label}</span>
          <div style={{ background: "#e5e7eb", borderRadius: 6, padding: 4 }}>
            <div
              style={{
                width: 30,
                height: 30,
                borderRadius: 6,
                background: "#7c3aed",
                transform: moved ? "translateX(220px)" : "translateX(0)",
                transition: "transform 1.2s " + curve.value,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "delay-and-shorthand",
      title: "transition-delay and the full shorthand",
      summary: "Three boxes fade and slide in with staggered delays, using the full transition shorthand.",
      code: `function App() {
  const [shown, setShown] = useState(false);
  const items = [0, 1, 2];

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={() => setShown((s) => !s)} style={{ justifySelf: "start" }}>
        {shown ? "Hide" : "Show"}
      </button>
      <div style={{ display: "flex", gap: 10 }}>
        {items.map((i) => (
          <div
            key={i}
            style={{
              width: 70,
              height: 70,
              borderRadius: 8,
              background: "#0891b2",
              opacity: shown ? 1 : 0,
              transform: shown ? "translateY(0)" : "translateY(14px)",
              // shorthand: property duration timing-function delay
              transition: "opacity 0.4s ease " + i * 0.15 + "s, transform 0.4s ease " + i * 0.15 + "s",
            }}
          />
        ))}
      </div>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
