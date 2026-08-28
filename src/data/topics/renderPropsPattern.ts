import type { Topic } from "../../types";
import { RenderPropsDiagram } from "../../components/molecules/Diagrams/RenderPropsDiagram";

export const renderPropsPatternTopic: Topic = {
  id: "render-props-pattern",
  title: "Render Props",
  category: "Advanced Patterns",
  shortExplanation: `A **render prop** is a component that accepts a *function* as a prop and calls it with its own internal data, letting the caller decide what to render with that data.

- Often literally named \`render\`, or passed via \`children\` as a function
- The component *owns the logic*; the caller *owns the output* — a clean separation
- Nesting several render-prop components stacks callbacks inside callbacks ("render prop hell")
- A **custom hook** now covers the same use case with a flat function call instead of nested JSX`,
  longExplanation: `A render-prop component tracks some data internally — mouse position, form state, a data-fetch result — and instead of deciding how to display it, calls a function prop with that data and renders whatever the function returns: \`<MouseTracker render={(pos) => <p>{pos.x}, {pos.y}</p>} />\`.

- The \`children\` prop can serve the same role when it's a function rather than JSX: \`<Toggle>{(on, toggle) => <button onClick={toggle}>{on ? "On" : "Off"}</button>}</Toggle>\` — this reads a little more naturally since it looks like normal nested JSX at a glance
- Unlike a HOC, a render prop doesn't add a wrapper component to the tree — the logic-owning component *is* the component you render, and it simply calls back into your function during its own render
- The downside shows up when several render-prop components are combined: nesting \`<A render={...}><B render={...}>{...}</B></A>\` stacks callback indentation several levels deep, sometimes called "render prop hell"
- **Custom hooks solve this more directly**: the same mouse-tracking logic as \`const pos = useMousePosition()\` reads flat, needs no nesting, and returns data exactly where it's used — most render-prop components written today would be written as a hook instead

Recognize render props when reading libraries that predate widespread hook adoption (early React Router, Downshift, react-motion) — for new code, a custom hook is almost always the simpler choice.`,
  diagram: RenderPropsDiagram,
  examples: [
    {
      id: "mouse-tracker",
      title: "MouseTracker — the classic render-prop example",
      summary: "A component that tracks mouse position internally and hands it to a render function.",
      code: `function MouseTracker({ render }) {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  function handleMove(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    setPos({ x: Math.round(e.clientX - rect.left), y: Math.round(e.clientY - rect.top) });
  }

  return (
    <div
      onMouseMove={handleMove}
      style={{ height: 140, border: "1px dashed #9ca3af", borderRadius: 6, padding: 8 }}
    >
      {render(pos)}
    </div>
  );
}

function App() {
  return (
    <MouseTracker render={(pos) => <p>Mouse at: {pos.x}, {pos.y}</p>} />
  );
}

render(<App />);`,
    },
    {
      id: "children-as-function",
      title: "Toggle — using children as a function",
      summary: "The same pattern, but reading the function from children instead of a named \"render\" prop.",
      code: `function Toggle({ children }) {
  const [on, setOn] = useState(false);
  const toggle = () => setOn((v) => !v);
  return children(on, toggle);
}

function App() {
  return (
    <Toggle>
      {(on, toggle) => (
        <button onClick={toggle}>{on ? "ON — click to turn off" : "OFF — click to turn on"}</button>
      )}
    </Toggle>
  );
}

render(<App />);`,
    },
    {
      id: "render-prop-hell",
      title: "Nesting render props gets deep, fast",
      summary: "Combining two render-prop components stacks callback nesting — the readability cost of the pattern.",
      code: `function WindowSize({ render }) {
  const [width] = useState(() => (typeof window !== "undefined" ? window.innerWidth : 1024));
  return render(width);
}

function Toggle({ children }) {
  const [on, setOn] = useState(false);
  return children(on, () => setOn((v) => !v));
}

function App() {
  return (
    <WindowSize
      render={(width) => (
        <Toggle>
          {(on, toggle) => (
            <div style={{ display: "grid", gap: 8 }}>
              <p>Width: {width}px, panel is {on ? "open" : "closed"}</p>
              <button onClick={toggle}>Toggle panel</button>
            </div>
          )}
        </Toggle>
      )}
    />
  );
}

render(<App />);`,
    },
    {
      id: "render-prop-vs-hook",
      title: "The same logic as a render prop vs. a custom hook",
      summary: "Comparing a render-prop Toggle to the equivalent useToggle hook, side by side.",
      code: `function Toggle({ children }) {
  const [on, setOn] = useState(false);
  return children(on, () => setOn((v) => !v));
}

function useToggle(initial = false) {
  const [on, setOn] = useState(initial);
  return [on, () => setOn((v) => !v)];
}

function WithRenderProp() {
  return (
    <Toggle>
      {(on, toggle) => <button onClick={toggle}>Render prop: {on ? "On" : "Off"}</button>}
    </Toggle>
  );
}

function WithHook() {
  const [on, toggle] = useToggle();
  return <button onClick={toggle}>Hook: {on ? "On" : "Off"}</button>;
}

function App() {
  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <WithRenderProp />
      <WithHook />
      <small>Same behavior — the hook version needs no nested function or wrapping component.</small>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
