import type { Topic } from "../../types";

export const reactPortalsTopic: Topic = {
  id: "react-portals",
  title: "React Portals",
  category: "Advanced",
  shortExplanation:
    "ReactDOM.createPortal(children, domNode) renders a component's children into a different DOM node than its parent, while keeping that component in its normal place in the React tree. Context, event bubbling through React's synthetic event system, and state all behave as if the portaled content were nested normally — only its physical location in the DOM changes.",
  longExplanation:
    "Normally, a component's rendered output is appended to the DOM inside its parent's DOM node, mirroring the React tree. A portal breaks that link on the DOM side only: ReactDOM.createPortal(children, domNode) tells React to mount children into domNode instead of the current parent, which is exactly what's needed for modals, tooltips, dropdowns, and toasts that must visually escape an ancestor's overflow:hidden, a fixed z-index stacking context, or a scrollable container, without being physically nested inside it. Crucially, the portal does not create a new React tree — the component calling createPortal is still a normal child in the component tree, so props, context providers above it, and component state all work exactly as if no portal were involved. The same is true for events: React's synthetic event system dispatches events based on the React tree, not the raw DOM tree, so a click inside portaled content still bubbles up through onClick handlers on its React ancestors even though, in the actual DOM, the portaled node sits somewhere else entirely — this is one of the most commonly misunderstood aspects of portals and worth demonstrating directly. A frequent real-world target is document.body (or a dedicated #modal-root div added to index.html), since that guarantees escaping every ancestor's CSS containment; the tradeoff is that portaled content still needs its own explicit positioning (typically position: fixed or absolute) because it's no longer inside whatever layout container gave it position before. Portals are a DOM-placement tool, not a state-management tool — reach for context or lifting state up when the goal is sharing data, and reach for a portal only when the goal is where something physically renders.",
  examples: [
    {
      id: "basic-portal",
      title: "Basic portal into a sibling root",
      summary: "Render a styled box into a portal root that lives beside the main content.",
      code: `function App() {
  const portalRootRef = useRef(null);
  const [portalRoot, setPortalRoot] = useState(null);

  useEffect(() => {
    setPortalRoot(portalRootRef.current);
  }, []);

  return (
    <div style={{ display: "grid", gap: 12 }}>
      <div style={{ padding: 12, border: "1px solid #d1d5db", borderRadius: 6 }}>
        This box renders normally, inside App's own JSX.
      </div>
      <div ref={portalRootRef} style={{ border: "1px dashed #9ca3af", borderRadius: 6, padding: 12 }}>
        <small style={{ color: "#6b7280" }}>Portal root (an ordinary sibling div):</small>
        {portalRoot &&
          createPortal(
            <div style={{ marginTop: 8, padding: 12, background: "#ede9fe", borderRadius: 6 }}>
              I was rendered via createPortal, but I'm still part of App's component tree.
            </div>,
            portalRoot
          )}
      </div>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "modal-portal",
      title: "Modal dialog via portal",
      summary: "Toggle a portaled overlay that visually sits above the rest of the page.",
      code: `function App() {
  const portalRootRef = useRef(null);
  const [portalRoot, setPortalRoot] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setPortalRoot(portalRootRef.current);
  }, []);

  return (
    <div style={{ display: "grid", gap: 12 }}>
      <button onClick={() => setOpen(true)}>Open modal</button>
      <div ref={portalRootRef} style={{ position: "relative", minHeight: 120, border: "1px dashed #9ca3af", borderRadius: 6 }}>
        <small style={{ color: "#6b7280", padding: 8, display: "block" }}>Portal root</small>
        {portalRoot &&
          open &&
          createPortal(
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "rgba(17,24,39,0.6)",
                display: "grid",
                placeItems: "center",
                borderRadius: 6,
              }}
            >
              <div style={{ background: "white", padding: 20, borderRadius: 8, display: "grid", gap: 10 }}>
                <strong>I'm a modal</strong>
                <p style={{ margin: 0 }}>Rendered via createPortal into the dashed root.</p>
                <button onClick={() => setOpen(false)}>Close</button>
              </div>
            </div>,
            portalRoot
          )}
      </div>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "portal-event-bubbling",
      title: "Events bubble through the React tree",
      summary: "A click inside portaled content still reaches an onClick on a React ancestor.",
      code: `function App() {
  const portalRootRef = useRef(null);
  const [portalRoot, setPortalRoot] = useState(null);
  const [log, setLog] = useState([]);

  useEffect(() => {
    setPortalRoot(portalRootRef.current);
  }, []);

  function handleAncestorClick() {
    setLog((prev) => [...prev, "Ancestor onClick fired (event bubbled through the React tree)"]);
  }

  return (
    <div onClick={handleAncestorClick} style={{ display: "grid", gap: 12 }}>
      <p>Click the button below. It lives in a different DOM node, but its click still bubbles to this div's onClick.</p>
      <div ref={portalRootRef} style={{ border: "1px dashed #9ca3af", borderRadius: 6, padding: 12 }}>
        {portalRoot &&
          createPortal(
            <button onClick={() => setLog((prev) => [...prev, "Portaled button onClick fired"])}>
              Click me (portaled)
            </button>,
            portalRoot
          )}
      </div>
      <div style={{ display: "grid", gap: 4 }}>
        {log.map((entry, i) => (
          <small key={i}>{entry}</small>
        ))}
      </div>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "tooltip-portal",
      title: "Tooltip positioned via portal",
      summary: "Show a small tooltip near a trigger, rendered through a portal root.",
      code: `function App() {
  const portalRootRef = useRef(null);
  const [portalRoot, setPortalRoot] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setPortalRoot(portalRootRef.current);
  }, []);

  return (
    <div style={{ display: "grid", gap: 12 }}>
      <div
        style={{ position: "relative", display: "inline-block" }}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
      >
        <button>Hover me</button>
      </div>
      <div ref={portalRootRef} style={{ border: "1px dashed #9ca3af", borderRadius: 6, padding: 12, minHeight: 40 }}>
        <small style={{ color: "#6b7280" }}>Portal root — tooltip appears here:</small>
        {portalRoot &&
          visible &&
          createPortal(
            <div style={{ marginTop: 8, display: "inline-block", padding: "4px 8px", background: "#111827", color: "white", borderRadius: 4, fontSize: 12 }}>
              A helpful tooltip
            </div>,
            portalRoot
          )}
      </div>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "portal-shares-state",
      title: "Portaled counter shares app state",
      summary: "The portaled UI is a normal member of the same component tree, sharing the same state.",
      code: `function App() {
  const portalRootRef = useRef(null);
  const [portalRoot, setPortalRoot] = useState(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    setPortalRoot(portalRootRef.current);
  }, []);

  return (
    <div style={{ display: "grid", gap: 12 }}>
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <button onClick={() => setCount((c) => c - 1)}>-1</button>
        <strong>Count: {count}</strong>
        <button onClick={() => setCount((c) => c + 1)}>+1</button>
      </div>
      <div ref={portalRootRef} style={{ border: "1px dashed #9ca3af", borderRadius: 6, padding: 12 }}>
        <small style={{ color: "#6b7280" }}>Portal root:</small>
        {portalRoot &&
          createPortal(
            <div style={{ marginTop: 8, padding: 12, background: "#dcfce7", borderRadius: 6 }}>
              This portaled box reads the SAME count state: <strong>{count}</strong>. Clicking the buttons
              above updates it here too, because it's the same component tree.
            </div>,
            portalRoot
          )}
      </div>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
