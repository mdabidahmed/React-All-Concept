import type { Topic } from "../../types";
import { ReactTransitionsDiagram } from "../../components/molecules/Diagrams/ReactTransitionsDiagram";

export const reactTransitionsTopic: Topic = {
  id: "react-transitions",
  title: "React Transitions",
  category: "Routing & Motion",
  shortExplanation: `Animating an element as it enters or leaves the DOM requires keeping it mounted a beat longer than the state that wants it gone, because plain conditional rendering removes elements ==instantly== — with no time for a CSS transition to play.

- The general technique is a short *delay* around the actual mount/unmount
- Typically via \`setTimeout\`, or toggling a class one frame apart from visibility
- This gives the browser a "before" state and an "after" state to animate between`,
  longExplanation: `When a component is removed by conditional rendering (\`isOpen && <Panel />\`) it disappears from the DOM in the same render that the condition flips, so a CSS \`transition\` on that element never gets a chance to animate — the browser has nothing to interpolate between because the element is simply gone. The general workaround is to decouple "should this be visible" from "should this be mounted": keep a second, slightly-delayed piece of state controlling whether the element stays in the DOM, and use the immediate state only to toggle a CSS class or style value (like opacity or transform) that the browser can transition.

- **Entering** is the easier direction — mount the element, then flip an "entered" class on in a \`useEffect\` (typically after a tiny \`setTimeout\`, or a follow-up frame) so the browser sees the *before* state before the *after* state; without that separation, an element born already fully visible has nothing to transition from
- **Exiting** is the harder direction — trigger the CSS change first (opacity to 0, scale to 0.9), and only actually remove the element from the tree after the transition's duration has elapsed, usually via a matching \`setTimeout\` or by listening for the \`transitionend\` event
- Dedicated libraries manage this bookkeeping in a real project: React Transition Group provides \`<CSSTransition>\`/\`<TransitionGroup>\` built around this enter/exit lifecycle, and Framer Motion offers a spring-based API with its own exit-animation support via \`AnimatePresence\`

The underlying mechanism in both libraries is the same ==delayed-mount/delayed-unmount== technique demonstrated by hand here, so understanding it makes those libraries' APIs much less mysterious.`,
  diagram: ReactTransitionsDiagram,
  examples: [
    {
      id: "fade-in-on-mount",
      title: "Fade in on mount",
      summary: "An element starts at opacity 0 and transitions to opacity 1 a tick after mounting.",
      code: `function FadeStyles() {
  return (
    <style>{\`
      .fade-box { opacity: 0; transition: opacity 0.3s ease; }
      .fade-box.entered { opacity: 1; }
    \`}</style>
  );
}

function FadeIn({ children }) {
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => setEntered(true), 20);
    return () => clearTimeout(id);
  }, []);

  return (
    <div className={"fade-box" + (entered ? " entered" : "")} style={{ border: "1px solid #d1d5db", borderRadius: 6, padding: 12 }}>
      {children}
    </div>
  );
}

function App() {
  const [key, setKey] = useState(0);
  return (
    <div style={{ display: "grid", gap: 10, maxWidth: 260 }}>
      <FadeStyles />
      <FadeIn key={key}>I fade in on mount.</FadeIn>
      <button onClick={() => setKey((k) => k + 1)}>Remount to replay</button>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "fade-out-before-unmount",
      title: "Fade out before unmount",
      summary: "The element's removal from the DOM is delayed until its exit transition has finished.",
      code: `function FadeStyles() {
  return (
    <style>{\`
      .fade-box { opacity: 1; transition: opacity 0.3s ease; }
      .fade-box.leaving { opacity: 0; }
    \`}</style>
  );
}

function App() {
  const [mounted, setMounted] = useState(true);
  const [leaving, setLeaving] = useState(false);

  function handleRemove() {
    setLeaving(true);
    setTimeout(() => setMounted(false), 300);
  }

  function handleReset() {
    setLeaving(false);
    setMounted(true);
  }

  return (
    <div style={{ display: "grid", gap: 10, maxWidth: 260 }}>
      <FadeStyles />
      {mounted && (
        <div className={"fade-box" + (leaving ? " leaving" : "")} style={{ border: "1px solid #d1d5db", borderRadius: 6, padding: 12 }}>
          I fade out before actually unmounting.
        </div>
      )}
      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={handleRemove} disabled={!mounted}>Remove</button>
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "combined-show-hide",
      title: "Combined show/hide toggle",
      summary: "One toggle button drives both the enter and exit transitions of the same element.",
      code: `function FadeStyles() {
  return (
    <style>{\`
      .fade-box { opacity: 0; transform: translateY(-6px); transition: opacity 0.25s ease, transform 0.25s ease; }
      .fade-box.entered { opacity: 1; transform: translateY(0); }
    \`}</style>
  );
}

function App() {
  const [mounted, setMounted] = useState(false);
  const [entered, setEntered] = useState(false);

  function toggle() {
    if (!mounted) {
      setMounted(true);
      setTimeout(() => setEntered(true), 20);
    } else {
      setEntered(false);
      setTimeout(() => setMounted(false), 250);
    }
  }

  return (
    <div style={{ display: "grid", gap: 10, maxWidth: 260 }}>
      <FadeStyles />
      <button onClick={toggle}>{mounted ? "Hide" : "Show"} panel</button>
      {mounted && (
        <div className={"fade-box" + (entered ? " entered" : "")} style={{ border: "1px solid #d1d5db", borderRadius: 6, padding: 12 }}>
          Slide + fade panel
        </div>
      )}
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "list-item-enter",
      title: "List item enter animation",
      summary: "Newly added items fade and slide in while existing items stay put.",
      code: `function ListStyles() {
  return (
    <style>{\`
      .list-item { opacity: 0; transform: translateX(-8px); transition: opacity 0.25s ease, transform 0.25s ease; }
      .list-item.entered { opacity: 1; transform: translateX(0); }
    \`}</style>
  );
}

function Item({ text }) {
  const [entered, setEntered] = useState(false);
  useEffect(() => {
    const id = setTimeout(() => setEntered(true), 20);
    return () => clearTimeout(id);
  }, []);
  return (
    <li className={"list-item" + (entered ? " entered" : "")} style={{ padding: "6px 10px", border: "1px solid #d1d5db", borderRadius: 6, marginBottom: 6 }}>
      {text}
    </li>
  );
}

function App() {
  const [items, setItems] = useState(["First task"]);

  function addItem() {
    setItems((prev) => [...prev, "Task " + (prev.length + 1)]);
  }

  return (
    <div style={{ maxWidth: 260 }}>
      <ListStyles />
      <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
        {items.map((text, i) => (
          <Item key={i} text={text} />
        ))}
      </ul>
      <button onClick={addItem}>Add item</button>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "animated-progress-bar",
      title: "Animated progress bar",
      summary: "A simpler transition example: the bar's width transitions smoothly whenever state changes.",
      code: `function App() {
  const [value, setValue] = useState(30);

  return (
    <div style={{ display: "grid", gap: 10, maxWidth: 260 }}>
      <div style={{ background: "#e5e7eb", borderRadius: 6, height: 14, overflow: "hidden" }}>
        <div
          style={{
            width: value + "%",
            height: "100%",
            background: "#2563eb",
            transition: "width 0.4s ease",
          }}
        />
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={() => setValue(20)}>20%</button>
        <button onClick={() => setValue(60)}>60%</button>
        <button onClick={() => setValue(100)}>100%</button>
      </div>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
