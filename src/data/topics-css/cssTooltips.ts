import type { Topic } from "../../types";

export const cssTooltipsTopic: Topic = {
  id: "css-tooltips",
  title: "CSS Tooltips",
  category: "CSS Components",
  shortExplanation: `A pure-CSS tooltip generates its bubble entirely from ==\`::before\`/\`::after\`==, so no extra markup is needed — the text lives in a \`content\` attribute and \`:hover\` reveals it.

- \`content: attr(data-tooltip)\` pulls the tooltip text from a \`data-*\` attribute right in the CSS
- \`::before\` (or \`::after\`) generates the bubble itself; the other can generate a small triangular "arrow"
- \`position: absolute\` on the generated content, anchored to a \`position: relative\` trigger
- Hidden by default (\`opacity: 0\` / \`visibility: hidden\`), revealed by a real \`:hover\` rule`,
  longExplanation: `A tooltip is small floating text that appears near an element to explain it, and the cleanest way to build one needs no extra DOM elements at all — the bubble itself is *generated* by CSS using the \`::before\`/\`::after\` pseudo-elements, driven by nothing more than one \`data-*\` attribute on the trigger element.

**Generated content.** \`::before\` and \`::after\` are pseudo-*elements* (not pseudo-*classes* like \`:hover\`) — they insert an extra, purely visual box just inside an element's content, without it existing anywhere in the actual DOM or being reachable by JavaScript. They require a \`content\` property to have any effect at all; without one, they don't render. \`content: attr(data-tooltip)\` is a particularly elegant use of this: rather than hardcoding the tooltip text into the CSS (which would make every tooltip say the same thing), it pulls the text live from a \`data-tooltip="..."\` attribute on the actual HTML element — one shared CSS rule can then produce a different tooltip on every element, just by changing that attribute's value.

**Positioning the bubble.** The trigger element needs \`position: "relative"\` so the generated \`::before\`/\`::after\` (given \`position: absolute\`) anchors to it rather than to the page — the identical relative/absolute pairing used for dropdowns. \`bottom: "100%"\` positions the tooltip directly above the trigger (its bottom edge sits at the trigger's top edge), and \`left: "50%"\` combined with \`transform: "translateX(-50%)"\` centers it horizontally regardless of how wide the tooltip text ends up being — a common centering trick that works because \`translateX\` shifts by a percentage of the *element's own* width, not its parent's.

- A small rotated square, or a CSS triangle made from transparent borders, is often added as a *second* pseudo-element (if \`::before\` is the bubble, \`::after\` becomes the arrow, or vice versa) to visually connect the tooltip to the exact element it describes
- The tooltip stays invisible by default via \`opacity: 0\` combined with \`visibility: "hidden"\`, and a \`:hover\` rule on the trigger flips both to \`1\`/\`"visible"\` — using both properties together (rather than just \`opacity\`) ensures the invisible tooltip can't be accidentally clicked or interfere with mouse events while hidden
- A short \`transition\` on \`opacity\` (and optionally a small \`transform\` shift) turns the reveal from an abrupt pop into a smooth fade — the same technique used for dropdown reveals and gallery overlays

**Accessibility note**: a pure hover-only, generated-content tooltip has the same fundamental limitation as hover-only dropdowns — it doesn't reveal on keyboard focus or touch, so real tooltip text meant to convey essential information should also be exposed some other way (like a real \`title\` attribute as a fallback, or a focus-visible rule in addition to hover) rather than relying on \`::before\`/\`::after\` alone. As a purely visual/decorative enhancement layered on top of already-accessible content, though, this technique is extremely lightweight — zero extra elements, zero JavaScript.`,
  examples: [
    {
      id: "basic-hover-tooltip",
      title: "A basic tooltip generated entirely by ::before",
      summary: "The tooltip text comes from a data-tooltip attribute; hover the button to reveal it.",
      code: `function TooltipStyles() {
  return (
    <style>{\`
      .tooltip-trigger {
        position: relative;
        display: inline-block;
      }
      .tooltip-trigger::before {
        content: attr(data-tooltip);
        position: absolute;
        bottom: 100%;
        left: 50%;
        transform: translateX(-50%) translateY(-6px);
        background: #111827;
        color: white;
        padding: 6px 10px;
        border-radius: 6px;
        font-size: 12px;
        white-space: nowrap;
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.15s ease;
      }
      .tooltip-trigger:hover::before {
        opacity: 1;
        visibility: visible;
      }
    \`}</style>
  );
}

function App() {
  return (
    <div style={{ padding: 40, textAlign: "center" }}>
      <TooltipStyles />
      <button className="tooltip-trigger" data-tooltip="Saves your changes">
        Save
      </button>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "tooltip-with-arrow",
      title: "Adding a pointing arrow with a second pseudo-element",
      summary: "::before renders the bubble; ::after renders a small rotated square as the arrow.",
      code: `function TooltipStyles() {
  return (
    <style>{\`
      .arrow-trigger { position: relative; display: inline-block; }
      .arrow-trigger::before {
        content: attr(data-tooltip);
        position: absolute;
        bottom: 100%;
        left: 50%;
        transform: translateX(-50%) translateY(-10px);
        background: #2563eb;
        color: white;
        padding: 6px 10px;
        border-radius: 6px;
        font-size: 12px;
        white-space: nowrap;
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.15s ease;
      }
      .arrow-trigger::after {
        content: "";
        position: absolute;
        bottom: 100%;
        left: 50%;
        transform: translateX(-50%) translateY(-4px) rotate(45deg);
        width: 8px;
        height: 8px;
        background: #2563eb;
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.15s ease;
      }
      .arrow-trigger:hover::before,
      .arrow-trigger:hover::after {
        opacity: 1;
        visibility: visible;
      }
    \`}</style>
  );
}

function App() {
  return (
    <div style={{ padding: 40, textAlign: "center" }}>
      <TooltipStyles />
      <span className="arrow-trigger" data-tooltip="Deletes this item permanently" style={{ borderBottom: "1px dotted #6b7280", cursor: "help" }}>
        Delete
      </span>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "tooltip-directions",
      title: "Tooltips positioned in four different directions",
      summary: "The same technique, with top/bottom/left/right swapped to change which side the tooltip appears on.",
      code: `function DirectionalStyles() {
  return (
    <style>{\`
      .dir-tooltip { position: relative; display: inline-block; }
      .dir-tooltip::before {
        content: attr(data-tooltip);
        position: absolute;
        background: #111827;
        color: white;
        padding: 5px 9px;
        border-radius: 5px;
        font-size: 12px;
        white-space: nowrap;
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.15s ease;
      }
      .dir-tooltip:hover::before { opacity: 1; visibility: visible; }

      .dir-top::before { bottom: 100%; left: 50%; transform: translateX(-50%) translateY(-6px); }
      .dir-bottom::before { top: 100%; left: 50%; transform: translateX(-50%) translateY(6px); }
      .dir-left::before { right: 100%; top: 50%; transform: translateY(-50%) translateX(-6px); }
      .dir-right::before { left: 100%; top: 50%; transform: translateY(-50%) translateX(6px); }
    \`}</style>
  );
}

function App() {
  const box = { padding: "8px 12px", background: "#f3f4f6", borderRadius: 6, cursor: "default" };
  return (
    <div style={{ display: "flex", gap: 40, padding: 40, justifyContent: "center" }}>
      <DirectionalStyles />
      <span className="dir-tooltip dir-top" data-tooltip="Above" style={box}>Top</span>
      <span className="dir-tooltip dir-bottom" data-tooltip="Below" style={box}>Bottom</span>
      <span className="dir-tooltip dir-left" data-tooltip="To the left" style={box}>Left</span>
      <span className="dir-tooltip dir-right" data-tooltip="To the right" style={box}>Right</span>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
