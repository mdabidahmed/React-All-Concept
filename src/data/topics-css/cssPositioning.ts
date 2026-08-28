import type { Topic } from "../../types";

export const cssPositioningTopic: Topic = {
  id: "css-positioning",
  title: "CSS Position",
  category: "CSS Layout & Positioning",
  shortExplanation: `\`position\` changes *how* an element is placed, and unlocks the \`top\`/\`right\`/\`bottom\`/\`left\` offset properties.

- \`static\` — the default; offsets have no effect, the element sits in normal document flow
- \`relative\` — offsets nudge it from where it *would* have been, but its original space is still reserved
- \`absolute\` — removed from normal flow entirely, positioned relative to its nearest **positioned** ancestor (or the page)
- \`fixed\` — positioned relative to the *viewport*, staying put even while the page scrolls
- \`sticky\` — behaves like \`relative\` until a scroll threshold is crossed, then "sticks" like \`fixed\` within its parent

\`top\`/\`right\`/\`bottom\`/\`left\` only do anything once \`position\` is something other than \`static\`.`,
  longExplanation: `\`position\` is the property that decides which positioning *scheme* an element follows, and that choice determines what \`top\`, \`right\`, \`bottom\`, and \`left\` even mean for it — under \`static\` (the default for every element), those four offset properties are simply ignored.

**\`static\`** is normal document flow: elements are laid out one after another, block elements stacking top to bottom, inline elements flowing left to right, exactly as covered in the Display topic. Nothing here can be "offset" because there's no fixed reference point to offset it from.

**\`relative\`** is the smallest step away from static: the element is still laid out in normal flow *first* — its original space is fully reserved, exactly as if \`position\` were still \`static\` — and only afterward is it visually shifted by whatever \`top\`/\`right\`/\`bottom\`/\`left\` values are given, relative to where it would otherwise have sat. This produces a purely visual offset that leaves a "hole" behind where the element used to be, since the space it originally occupied is never given back to its siblings. \`position: relative\` has a second, arguably more common use that has nothing to do with moving the element at all: simply declaring it establishes a new **positioning context**, meaning it becomes the reference point for any *absolutely* positioned descendant — this is why \`position: relative\` shows up so often on a parent container with no offsets ever actually set on it.

**\`absolute\`** removes the element from normal flow completely — no space is reserved for it at all, as if it were on a separate layer floating above the page — and then positions it using \`top\`/\`right\`/\`bottom\`/\`left\` measured from the edges of its **nearest ancestor that itself has a \`position\` other than \`static\`** (relative, absolute, fixed, or sticky). If no ancestor qualifies, it falls all the way back to being positioned relative to the initial containing block (effectively the page itself). This ancestor-search behavior is exactly why "give the parent \`position: relative\`" is such a common pairing with "give the child \`position: absolute\`" — without it, an absolutely positioned badge or tooltip meant to sit in the corner of *one specific card* would instead jump to the corner of the whole page.

**\`fixed\`** also removes the element from flow, but always positions it relative to the *viewport* — the visible browser window — rather than any ancestor, and it stays visually pinned to that same spot even as the rest of the page scrolls underneath it. This is the standard technique for a persistent header, a "back to top" button, or a chat widget that should always remain visible no matter how far the user has scrolled. (One caveat: a \`fixed\` element's positioning context changes if any ancestor has a \`transform\`, \`filter\`, or a few other properties set — those properties incidentally create a new containing block, which can make a "fixed" element behave more like "absolute" relative to that ancestor instead of the viewport, a subtle gotcha worth knowing about.)

**\`sticky\`** is a hybrid: the element behaves exactly like \`position: relative\` — sitting in normal flow — until the page scrolls past a specified threshold (\`top: 0\`, for instance), at which point it "sticks" in place like \`fixed\`, but *only within the bounds of its own parent container* — once the parent scrolls fully out of view, the sticky element scrolls away with it rather than staying pinned to the viewport forever. This makes \`sticky\` the natural choice for section headers that should stay visible while their own section is on screen, then get replaced by the next section's header once scrolling continues past it.

A useful way to remember the group: \`static\` and \`relative\` keep the element in flow (space reserved); \`absolute\`, \`fixed\`, and \`sticky\` (once triggered) take it out of flow, positioned instead against some explicit reference — an ancestor, the viewport, or a scroll boundary, respectively.`,
  examples: [
    {
      id: "relative-offset-keeps-space",
      title: "position: relative shifts the box but keeps its original space",
      summary: "A relatively-positioned box visually moves, yet a gap remains where it used to be.",
      code: `function App() {
  return (
    <div style={{ display: "flex", gap: 8, border: "1px dashed #9ca3af", padding: 8 }}>
      <div style={{ background: "#93c5fd", padding: 12 }}>Box A</div>
      <div style={{ position: "relative", top: 16, left: 20, background: "#fca5a5", padding: 12 }}>
        Box B — shifted, but its original slot is still reserved
      </div>
      <div style={{ background: "#86efac", padding: 12 }}>Box C — doesn't move to fill the gap</div>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "absolute-relative-to-positioned-parent",
      title: "absolute positions relative to the nearest positioned ancestor",
      summary: "A badge is pinned to the corner of its own card, thanks to the card having position: relative.",
      code: `function App() {
  return (
    <div style={{ display: "flex", gap: 20 }}>
      <div style={{ position: "relative", width: 160, height: 100, background: "#e0e7ff", borderRadius: 8, padding: 10 }}>
        Card with position: relative
        <span
          style={{
            position: "absolute",
            top: 8,
            right: 8,
            background: "#dc2626",
            color: "white",
            fontSize: 11,
            padding: "2px 6px",
            borderRadius: 999,
          }}
        >
          NEW
        </span>
      </div>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "fixed-vs-sticky-scroll",
      title: "fixed stays pinned to the viewport; sticky sticks within its section",
      summary: "Scroll the panel — the fixed label never moves, the sticky label sticks only while its section is visible.",
      code: `function App() {
  return (
    <div style={{ position: "relative", height: 220, overflowY: "auto", border: "2px solid #4338ca", borderRadius: 6 }}>
      <div
        style={{
          position: "fixed",
          top: 10,
          right: 10,
          background: "#4338ca",
          color: "white",
          padding: "4px 8px",
          fontSize: 11,
          borderRadius: 4,
        }}
      >
        position: fixed (viewport)
      </div>
      <div style={{ position: "sticky", top: 0, background: "#facc15", padding: 8, fontSize: 12, fontWeight: 700 }}>
        position: sticky — sticks to the top of THIS scroll box
      </div>
      <div style={{ padding: 12, display: "grid", gap: 10 }}>
        {Array.from({ length: 12 }, (_, i) => (
          <div key={i} style={{ background: "#f3f4f6", padding: 10 }}>
            Scrollable line {i + 1}
          </div>
        ))}
      </div>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
