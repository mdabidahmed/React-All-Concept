import type { Topic } from "../../types";

export const cssAnimationsTopic: Topic = {
  id: "css-animations",
  title: "CSS Animations",
  category: "CSS Advanced & Effects",
  shortExplanation: `\`@keyframes\` lets you define a multi-step animation — not just a start and end state like \`transition\`, but any number of points in between — then play it with the \`animation\` property.

- \`@keyframes name { 0% {...} 50% {...} 100% {...} }\` defines the steps
- \`animation: name 2s ease-in-out infinite;\` plays it
- Unlike \`transition\`, an animation can start ==on its own== — it doesn't need a state change to trigger it`,
  longExplanation: `\`transition\` only animates between exactly two states — whatever a property currently is, and whatever it changes to. \`@keyframes\` removes that limitation by letting you describe a sequence of styles at any percentage points along the animation's timeline, which the browser then smoothly interpolates between, step to step.

- A \`@keyframes\` block is named (\`@keyframes pulse { ... }\`) and contains percentage stops — \`0%\`, \`50%\`, \`100%\` — each describing the styles the element should have at that point in the timeline. \`from\`/\`to\` are shorthand for \`0%\`/\`100%\` when there are only two stops
- The \`animation\` shorthand property then plays it: \`animation: pulse 2s ease-in-out infinite\` breaks down into **name** (\`pulse\`), **duration** (\`2s\`), **timing function** (\`ease-in-out\`), and **iteration count** (\`infinite\`, or a number like \`3\`)
- Other useful pieces of the full \`animation\` shorthand: \`animation-delay\` (wait before starting), \`animation-direction: alternate\` (play forward, then backward, alternating), and \`animation-fill-mode: forwards\` (keep the last keyframe's styles after the animation ends, instead of snapping back)
- The key difference from \`transition\`: an animation can run **automatically on mount**, loop **forever**, and pass through **many** intermediate states — none of which a two-state transition can do on its own

Because \`@keyframes\` is a real CSS at-rule, it can't be expressed as a JS \`style\` object — it needs an actual stylesheet. These examples inject one with a genuine \`<style>\` tag, which the sandbox renders directly into the real DOM, so the \`@keyframes\` rules run exactly as they would from a linked \`.css\` file.`,
  examples: [
    {
      id: "basic-keyframes-pulse",
      title: "A looping pulse animation",
      summary: "A @keyframes rule with three stops, played on an infinite loop.",
      code: `function PulseStyles() {
  return (
    <style>{\`
      @keyframes pulse {
        0% { transform: scale(1); opacity: 1; }
        50% { transform: scale(1.15); opacity: 0.7; }
        100% { transform: scale(1); opacity: 1; }
      }
      .pulse-dot {
        width: 60px; height: 60px; border-radius: 50%; background: #2563eb;
        animation: pulse 1.4s ease-in-out infinite;
      }
    \`}</style>
  );
}

function App() {
  return (
    <div>
      <PulseStyles />
      <div className="pulse-dot" />
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "play-pause-toggle",
      title: "Playing and pausing an animation from React state",
      summary: "animation-play-state is toggled by a button, controlled entirely by a React boolean.",
      code: `function SpinStyles() {
  return (
    <style>{\`
      @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      .spinner {
        width: 48px; height: 48px; border-radius: 8px;
        background: linear-gradient(135deg, #8b5cf6, #ec4899);
        animation: spin 2s linear infinite;
      }
      .paused { animation-play-state: paused; }
    \`}</style>
  );
}

function App() {
  const [playing, setPlaying] = useState(true);
  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <SpinStyles />
      <div className={"spinner" + (playing ? "" : " paused")} />
      <button onClick={() => setPlaying((p) => !p)}>{playing ? "Pause" : "Play"}</button>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "fill-mode-forwards",
      title: "animation-fill-mode: forwards",
      summary: "Without fill-mode the element snaps back to its starting style; forwards keeps the final keyframe.",
      code: `function SlideStyles() {
  return (
    <style>{\`
      @keyframes slide-in {
        from { transform: translateX(-40px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
      .slide-card {
        padding: 14px; border-radius: 8px; background: #111827; color: white; width: 200px;
        animation: slide-in 0.5s ease-out forwards;
      }
    \`}</style>
  );
}

function App() {
  const [key, setKey] = useState(0);
  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <SlideStyles />
      <div className="slide-card" key={key}>I slid in and stayed in place.</div>
      <button onClick={() => setKey((k) => k + 1)}>Replay</button>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "staggered-list-animation",
      title: "Staggering an animation across a list",
      summary: "Each item gets a slightly longer animation-delay, based on its index, for a cascading effect.",
      code: `function StaggerStyles() {
  return (
    <style>{\`
      @keyframes fade-up {
        from { transform: translateY(10px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
      }
      .stagger-item {
        padding: 10px 12px; border-radius: 6px; background: #f3f4f6;
        animation: fade-up 0.4s ease-out both;
      }
    \`}</style>
  );
}

function App() {
  const [key, setKey] = useState(0);
  const items = ["First", "Second", "Third", "Fourth"];
  return (
    <div style={{ display: "grid", gap: 8 }} key={key}>
      <StaggerStyles />
      {items.map((label, i) => (
        <div key={label} className="stagger-item" style={{ animationDelay: i * 0.12 + "s" }}>
          {label}
        </div>
      ))}
      <button onClick={() => setKey((k) => k + 1)} style={{ justifySelf: "start" }}>
        Replay
      </button>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
