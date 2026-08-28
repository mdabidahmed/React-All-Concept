import type { Topic } from "../../types";

export const cssOutlineTopic: Topic = {
  id: "css-outline",
  title: "CSS Outline",
  category: "CSS Box Model",
  shortExplanation: `\`outline\` draws a line around an element that looks a lot like \`border\`, but with one crucial difference: it ==never takes up layout space==.

- \`outline-style\`, \`outline-width\`, \`outline-color\` — the three longhands, combinable into the \`outline\` shorthand
- \`outline-offset\` — a gap between the outline and the element's border edge (can even be negative)
- Because it doesn't affect layout, \`outline\` is the standard way browsers (and developers) show \`:focus\` — it can appear and disappear without shifting anything around it

Outlines also don't respect \`border-radius\` corners by default and always follow the element's rectangular box (in most browsers) unless explicitly rounded.`,
  longExplanation: `\`outline\` draws a line around an element's border edge, and at a glance it looks like a second \`border\` — it has the same \`-style\`, \`-width\`, and \`-color\` longhands, and the same \`outline: 2px solid red;\` shorthand syntax. The difference that actually matters is about layout: **border participates in the box model, outline does not**. Adding or removing a border shifts padding, content, and neighboring elements outward or inward, because border is one of the box model's four layers. Adding or removing an outline changes nothing about the element's size or position — it's drawn *on top of*, outside the border edge, without ever being counted toward width, height, or the space it takes from its neighbors.

This single property — not affecting layout — is exactly why \`outline\` is the tool browsers use by default to show which element currently has keyboard focus (that faint blue ring you see around a button or input after tabbing to it). If focus indication were done with \`border\` instead, giving an element focus would make it grow by the border's width and push surrounding content around, creating a distracting layout shift every time focus moved. Because \`outline\` sits outside the box without consuming space, an element can gain a highly visible focus ring and lose it again with zero effect on anything else on the page — which is also why removing focus outlines with \`outline: none\` and *not* replacing them with an equivalent visual cue is a well-known accessibility mistake: keyboard users lose all indication of where they are on the page.

The three longhands mirror border's: \`outline-style\` (\`solid\`, \`dashed\`, \`dotted\`, \`double\`, etc. — \`none\` by default, so an outline is invisible until a style is set), \`outline-width\` (a length, or the keywords \`thin\`/\`medium\`/\`thick\`), and \`outline-color\` (any color, plus the special keyword \`invert\`, historically used to guarantee visibility against any background, though it's now rarely supported). All three combine into the \`outline\` shorthand exactly like border: \`outline: 3px dashed #2563eb;\`.

\`outline-offset\` is the one property with no border equivalent — it adds a gap between the outline and the element's own edge, effectively pushing the outline further away without touching the element's size (since, again, outline never affects layout regardless of its offset). A positive offset floats the outline outward, visually detaching it from the box; a negative offset pulls it inward, drawing it *over* the element instead — a technique sometimes used for a focus ring that sits just inside a button rather than around it.

Two more differences from border are worth knowing. First, \`outline\` cannot have per-side values — there's no \`outline-top\` or similar; it always wraps the entire element uniformly on all four sides. Second, \`outline\` traditionally ignores \`border-radius\` and is drawn as a plain rectangle even around a rounded box, though modern browsers have increasingly started rounding outlines to match — behavior worth double-checking if a design depends on it. In practice, \`outline\` is reached for almost exclusively for interactive states (\`:focus\`, \`:focus-visible\`) and the occasional decorative "ring" effect where layout stability matters more than border's flexibility.`,
  examples: [
    {
      id: "outline-vs-border-layout",
      title: "Outline never shifts layout; border does",
      summary: "Two identical boxes gain a 10px border/outline — only the bordered one pushes its neighbor away.",
      code: `function App() {
  return (
    <div style={{ display: "flex", gap: 20 }}>
      <div style={{ display: "flex", gap: 0, border: "1px dashed #9ca3af", padding: 4 }}>
        <div style={{ width: 80, height: 60, background: "#fca5a5", border: "10px solid #b91c1c" }} />
        <div style={{ width: 80, height: 60, background: "#93c5fd" }} />
      </div>
      <div style={{ display: "flex", gap: 0, border: "1px dashed #9ca3af", padding: 4 }}>
        <div style={{ width: 80, height: 60, background: "#fca5a5", outline: "10px solid #b91c1c" }} />
        <div style={{ width: 80, height: 60, background: "#93c5fd" }} />
      </div>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "outline-offset-demo",
      title: "outline-offset floats the outline away from the box",
      summary: "Increasing outline-offset pushes the ring further from the box without changing the box's own size.",
      code: `function App() {
  const offsets = [0, 6, 14];
  return (
    <div style={{ display: "flex", gap: 40, padding: 20 }}>
      {offsets.map((o) => (
        <div
          key={o}
          style={{
            width: 70,
            height: 50,
            background: "#ddd6fe",
            outline: "3px solid #6d28d9",
            outlineOffset: o,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 11,
          }}
        >
          offset {o}px
        </div>
      ))}
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "focus-visible-outline",
      title: "A real :focus outline on a button",
      summary: "Tab to (or click) the button and see the browser-standard technique of an outline for focus feedback.",
      code: `function FocusStyles() {
  return (
    <style>{\`
      .focus-demo-btn {
        padding: 10px 18px;
        border-radius: 6px;
        border: 1px solid #4338ca;
        background: white;
        color: #4338ca;
        font-weight: 600;
        cursor: pointer;
      }
      .focus-demo-btn:focus-visible {
        outline: 3px solid #4338ca;
        outline-offset: 2px;
      }
    \`}</style>
  );
}

function App() {
  return (
    <div>
      <FocusStyles />
      <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 8 }}>
        Click the button, then press Tab away and back (or just click it) to see the focus outline appear.
      </p>
      <button className="focus-demo-btn">Focus me</button>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
