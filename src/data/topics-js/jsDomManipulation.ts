import type { Topic } from "../../types";

export const jsDomManipulationTopic: Topic = {
  id: "js-dom-manipulation",
  title: "JavaScript DOM Manipulation",
  category: "DOM & Events",
  shortExplanation: `Once an element is selected, JavaScript can change what it shows, how it looks, and which CSS classes apply to it — this is what makes a page update *after* it has already loaded.

- \`.textContent\` / \`.innerHTML\` — change the text (or markup) inside an element
- \`.style.property\` — change one inline CSS property directly, in camelCase
- \`.classList.add() / .remove() / .toggle()\` — add, remove, or flip a CSS class`,
  longExplanation: `Selecting an element (covered in the previous topic) is only useful because of what comes next: changing it. DOM manipulation is the general term for using JavaScript to modify an element's content, appearance, or classes after the page has already loaded — no reload, no re-fetch, just an instant change reflected on screen.

- **Changing content**: \`element.textContent = "new text"\` replaces everything inside an element with plain text — safe, and the standard choice when the new content is just text. \`element.innerHTML = "<strong>new</strong> text"\` does the same thing but *parses* the string as HTML, letting you inject real markup — powerful, but risky with untrusted input (a string from a user could contain a \`<script>\`-like payload), which is why \`textContent\` is preferred whenever the content isn't meant to contain markup
- **Changing styles**: \`element.style.color = "red"\` sets a single inline CSS property directly on that one element, taking priority over most stylesheet rules. CSS property names with a hyphen become camelCase in JavaScript — \`background-color\` becomes \`element.style.backgroundColor\`, \`font-size\` becomes \`element.style.fontSize\`
- **Changing classes**: \`element.classList\` exposes a small, purpose-built API for classes: \`.add("name")\` applies a class, \`.remove("name")\` takes it off, \`.toggle("name")\` flips it on if it's off (and off if it's on), and \`.contains("name")\` checks whether it's currently applied. This is almost always preferred over manually writing to \`.style\`, because it keeps the actual visual rules (colors, spacing, animations) defined in CSS, where they belong, while JavaScript only decides *when* a class applies
- All three of these mutate the real, live DOM node immediately — there's no batching or "commit" step in plain JavaScript; the browser repaints as soon as the property is set

Here's where this app's React setting needs an explicit callout: everything above describes the real vanilla DOM API, and it works exactly as described in a plain \`<script>\` tag. But inside a React component, manually reaching into the DOM with \`element.textContent = ...\` or \`element.classList.add(...)\` fights the framework's whole model. React re-renders a component from its **state**, and on every re-render it reconciles the DOM to match what that state says the markup should look like — so a manual DOM edit can simply get overwritten the next time that component re-renders for an unrelated reason, since React doesn't know the manual change happened.

The React-idiomatic equivalent of all three techniques above is to store the *thing that changes* (the text, the color, whether a class is active) in \`useState\`, and let the JSX read from that state — React then handles updating the real DOM for you, using the exact same underlying \`textContent\`/\`style\`/\`className\` mechanisms internally, just automatically and consistently. The examples below show both sides directly: a genuine \`useRef\`-based example that mutates a real DOM node exactly like a plain script would (useful for understanding what's actually happening under the hood, and occasionally necessary for things React doesn't manage, like focusing an input or measuring a size), followed by the state-driven version that accomplishes the identical visible result the way idiomatic React code actually gets written.`,
  examples: [
    {
      id: "text-content-vanilla",
      title: "Changing textContent directly on a real node",
      summary: "A genuine DOM mutation via useRef — bypassing React state entirely, on purpose, to show the raw mechanism.",
      code: `function App() {
  const boxRef = useRef(null);

  function changeText() {
    boxRef.current.textContent = "Changed directly via the DOM!";
  }

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <p ref={boxRef} style={{ padding: 8, background: "#f1f5f9", borderRadius: 6 }}>
        Original text
      </p>
      <button onClick={changeText}>ref.current.textContent = "..."</button>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        React has no idea this text changed — it happened outside of state, exactly like a plain script would do it.
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "style-and-classlist-vanilla",
      title: "style.property and classList, for real",
      summary: "Real inline style changes plus classList.add/remove/toggle against an actual class defined in CSS.",
      code: `function App() {
  const boxRef = useRef(null);
  const [highlighted, setHighlighted] = useState(false);

  function paintRed() {
    boxRef.current.style.color = "#dc2626";
    boxRef.current.style.fontWeight = "bold";
  }

  function toggleClass() {
    boxRef.current.classList.toggle("demo-highlight");
    setHighlighted(boxRef.current.classList.contains("demo-highlight"));
  }

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <style>{".demo-highlight { background: #fef08a; border-radius: 6px; }"}</style>
      <p ref={boxRef} style={{ padding: 8 }}>
        Some sample text
      </p>
      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={paintRed}>ref.current.style.color = "red"</button>
        <button onClick={toggleClass}>ref.current.classList.toggle("demo-highlight")</button>
      </div>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        demo-highlight class is currently: <strong>{highlighted ? "applied" : "not applied"}</strong>
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "react-idiomatic-equivalent",
      title: "The same visible result, the React way",
      summary: "State drives the text, style, and class instead of manual DOM calls — React applies the DOM changes for you.",
      code: `function App() {
  const [text, setText] = useState("Original text");
  const [isRed, setIsRed] = useState(false);
  const [highlighted, setHighlighted] = useState(false);

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <p
        style={{
          padding: 8,
          borderRadius: 6,
          color: isRed ? "#dc2626" : "inherit",
          fontWeight: isRed ? "bold" : "normal",
          background: highlighted ? "#fef08a" : "transparent",
        }}
      >
        {text}
      </p>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <button onClick={() => setText("Changed via state!")}>setText(...)</button>
        <button onClick={() => setIsRed((r) => !r)}>Toggle red via state</button>
        <button onClick={() => setHighlighted((h) => !h)}>Toggle highlight via state</button>
      </div>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        No .textContent, .style, or .classList call anywhere here — React reconciles the DOM from this state.
      </p>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
