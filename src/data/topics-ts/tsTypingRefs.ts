import type { Topic } from "../../types";

export const tsTypingRefsTopic: Topic = {
  id: "ts-typing-refs",
  title: "Typing useRef",
  category: "TypeScript with React",
  shortExplanation: `\`useRef\` takes a type argument describing what \`.current\` holds — \`useRef<HTMLDivElement>(null)\` for a DOM node, \`useRef<number>(0)\` for a plain mutable value.

- A **DOM ref** starts as \`null\` because the actual DOM node doesn't exist until after the first render — \`.current\` is typed \`HTMLDivElement | null\`, so it must be checked before use

- A **mutable value ref** (like an interval id, or a "did this already run" flag) doesn't need \`| null\` at all if it's given a real initial value — \`.current\` is typed plainly as \`number\`

- Updating a ref's \`.current\` never triggers a re-render, unlike \`useState\` — this is the whole reason to reach for \`useRef\` in the first place`,
  longExplanation: `\`useRef\` serves two genuinely different purposes in React, and the way it's typed differs slightly between them: attaching to a real DOM node to imperatively read or control it, and holding a plain mutable value across renders without causing a re-render when it changes. Both use the same \`useRef<T>(initialValue)\` generic signature, but the type argument and the initial value chosen for each purpose look noticeably different.

- **A DOM ref is typed with the specific HTML element type it will be attached to**, and always initialized to \`null\`: \`const divRef = useRef<HTMLDivElement>(null);\`. The \`null\` initial value is not a workaround or a compromise — it's structurally necessary, because the actual DOM node this ref will eventually point to doesn't exist yet at the moment \`useRef\` runs during the first render. React only fills in \`.current\` with the real DOM node *after* that render commits, once \`ref={divRef}\` has actually been attached to a rendered \`<div>\`. Before that, and any time the ref's associated element unmounts, \`.current\` genuinely is \`null\`
- **This is why a DOM ref's \`.current\` is typed as \`HTMLDivElement | null\`, not just \`HTMLDivElement\`** — TypeScript is being entirely accurate about which of the two states is actually possible at any given moment. Reading \`.current\` inside an event handler or an effect, after the component has mounted, virtually always needs a null check first: \`if (divRef.current) { divRef.current.focus(); }\`, or the optional-chaining shorthand \`divRef.current?.focus();\`
- **A different HTML element type is used depending on what the ref is attached to**: \`useRef<HTMLInputElement>(null)\` for an \`<input>\` (unlocking \`.focus()\`, \`.value\`, \`.select()\`), \`useRef<HTMLButtonElement>(null)\` for a \`<button>\`, \`useRef<HTMLDivElement>(null)\` for a plain \`<div>\`. Getting this element type right matters for the same reason it matters with event handlers — it determines exactly which properties and methods TypeScript will allow calling on \`.current\` once it's been null-checked
- **A mutable *value* ref serves a completely different purpose: holding a plain JavaScript value that needs to persist across renders, without ever causing a re-render when it's updated.** \`const renderCount = useRef<number>(0);\` is a classic example — incrementing \`renderCount.current += 1\` inside the component body tracks how many times it's rendered, entirely silently, with no re-render triggered by that update itself (unlike calling a \`useState\` setter, which always schedules one)
- **A value ref given a real, concrete initial value doesn't need \`| null\` in its type at all** — \`useRef<number>(0)\`'s \`.current\` is plainly typed as \`number\` throughout the ref's entire lifetime, since there's no equivalent "the value doesn't exist yet" moment the way there is with a not-yet-rendered DOM node. \`useRef(0)\` without an explicit type argument would actually infer \`number\` correctly on its own here — the explicit \`<number>\` is optional in this specific case, though writing it can still add clarity
- **A very common real use for a value ref is storing something like a \`setInterval\`/\`setTimeout\` id, so it can be cleared later:** \`const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);\`. This one *does* usually include \`| null\`, since there's a genuine "no interval currently running" state before one has been started, or after it's been cleared — the \`| null\` here reflects an actual meaningful absent-state, the same reasoning as the DOM ref case, just for a different underlying reason (business logic rather than "hasn't mounted yet")
- **The core distinguishing question when typing any \`useRef\` call is: does \`.current\` have a genuine "doesn't exist yet / not currently set" state that needs representing, or does it always hold a real, concrete value from the moment the component mounts onward?** DOM refs almost always need the former (hence \`| null\`); plain counters, flags, and accumulators usually don't (hence a plain type with a real starting value)

Both flavors of \`useRef\` share the same underlying superpower that makes the whole hook worth reaching for: mutating \`.current\` is invisible to React's rendering system entirely, which is exactly what's wanted for DOM access (no need to re-render just because a ref started pointing at a node) and for tracking transient bookkeeping values (an interval id, a previous value, a render count) that should never themselves cause the component to redraw.`,
  examples: [
    {
      id: "dom-ref-div",
      title: "A DOM ref: useRef<HTMLDivElement>(null)",
      summary: "The ref starts as null until React attaches it to the rendered div after mount.",
      code: `function App() {
  const boxRef = useRef<HTMLDivElement>(null);

  function highlightBox() {
    if (boxRef.current) {
      boxRef.current.style.background = "#fde68a";
    }
  }

  return (
    <div style={{ display: "grid", gap: 8 }}>
      <div ref={boxRef} style={{ padding: 16, border: "1px solid #d1d5db", borderRadius: 6 }}>
        This box can be highlighted.
      </div>
      <button onClick={highlightBox}>Highlight box</button>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "dom-ref-input-focus",
      title: "A DOM ref for imperative focus: useRef<HTMLInputElement>(null)",
      summary: "The specific element type (HTMLInputElement) is what unlocks .focus() and .value on .current.",
      code: `function App() {
  const inputRef = useRef<HTMLInputElement>(null);

  function focusInput() {
    inputRef.current?.focus();
  }

  return (
    <div style={{ display: "grid", gap: 8 }}>
      <input ref={inputRef} placeholder="Click the button to focus me" />
      <button onClick={focusInput}>Focus input</button>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "mutable-value-ref-render-count",
      title: "A mutable value ref: useRef<number>(0)",
      summary: "Updating renderCount.current never triggers a re-render, unlike a useState setter would.",
      code: `function App() {
  const renderCount = useRef<number>(0);
  const [text, setText] = useState("");

  renderCount.current += 1;

  return (
    <div style={{ display: "grid", gap: 8 }}>
      <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Type something" />
      <p>This component has rendered {renderCount.current} time(s).</p>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        Note the count only goes up on each render caused by typing — reading .current itself never causes one.
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "interval-id-ref",
      title: "A ref holding a nullable interval id",
      summary: "The interval id genuinely has a meaningful null state before starting or after clearing.",
      code: `function App() {
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);

  function start() {
    if (intervalRef.current !== null) return;
    setRunning(true);
    intervalRef.current = setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);
  }

  function stop() {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setRunning(false);
  }

  return (
    <div style={{ display: "grid", gap: 8 }}>
      <p>Elapsed: {seconds}s</p>
      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={start} disabled={running}>Start</button>
        <button onClick={stop} disabled={!running}>Stop</button>
      </div>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
