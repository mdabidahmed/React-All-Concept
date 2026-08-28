import type { Topic } from "../../types";

export const cssIconsTopic: Topic = {
  id: "css-icons",
  title: "CSS Icons",
  category: "CSS Text & Typography",
  shortExplanation: `CSS doesn't have a dedicated "icon" element — icons are just small graphics styled and sized like any other content, most commonly **inline SVG**.

- Inline SVG icons are sized with \`width\`/\`height\` and colored with \`fill: currentColor\` so they automatically match the surrounding text color
- **Icon fonts** (an older technique) size a glyph with \`font-size\`, the same way you'd size text
- Flexbox (\`display: flex\`, \`align-items: center\`, a small \`gap\`) is the standard way to line an icon up neatly next to text
- In real projects, icon libraries like **Font Awesome** or **Bootstrap Icons** provide hundreds of ready-made icons — this sandbox draws them directly as inline SVG instead, since it has no network access to load one`,
  longExplanation: `There's no \`<icon>\` tag in HTML — every icon on the web is really just a small graphic, and CSS treats it exactly like any other visual element: it gets sized, colored, and positioned with ordinary properties.

The most common dependency-free approach today is an **inline SVG**: the \`<svg>\` markup for the icon's shape is pasted directly into the HTML (or JSX), rather than loaded as a separate image file. Because it's real markup sitting in the DOM, it can be styled with CSS exactly like text — most importantly, giving its \`fill\` (or \`stroke\`) the special value \`currentColor\` makes the icon automatically inherit whatever \`color\` is set on it or its parent, so a single icon component can be reused in any color context without duplicating artwork. Sizing an inline SVG is done the same way as any block-level element — \`width\` and \`height\` (in pixels, ems, or percentages) directly on the \`<svg>\` tag or via CSS.

Before inline SVG became practical, **icon fonts** were the dominant technique — libraries like Font Awesome shipped a font file where each "letter" was actually a tiny icon glyph, and you displayed an icon by rendering that character with a specific \`font-family\`. The clever part of this trick is that, because an icon font's glyphs are just characters, they can be sized with plain \`font-size\` and colored with plain \`color\` — the exact same properties used for text, with no special icon-specific CSS needed at all. Icon fonts still show up in a lot of existing code, but SVG icons have mostly overtaken them because SVG supports multiple colors per icon, scales without any blurriness at any size, and doesn't force a whole extra font file to be downloaded for a handful of glyphs.

Whichever technique is used, icons are usually placed *next to* a label — a "Delete" button with a trash icon, a nav link with a home icon — and the standard way to align the two is **flexbox**: wrapping the icon and the text in a container with \`display: flex\`, \`alignItems: "center"\`, and a small \`gap\` keeps them vertically centered against each other with consistent spacing, regardless of exactly how tall the icon or the text happens to be. Trying to line these up with old techniques like \`vertical-align\` is fragile and font-dependent by comparison — flexbox alignment is the modern default.

In real-world projects, almost nobody draws every icon by hand. Icon libraries like **Font Awesome**, **Bootstrap Icons**, **Material Icons**, or **Heroicons** ship hundreds to thousands of ready-made icons as either an icon font or a set of SVG files/React components, installed via a package or a \`<link>\` to a hosted stylesheet. Since this sandbox has no network access to fetch an external icon library or font file, every example below draws its icons as plain inline SVG paths — but the sizing, coloring, and alignment techniques shown are exactly what you'd use with icons from any of those libraries too.`,
  examples: [
    {
      id: "basic-inline-svg-icon",
      title: "An inline SVG icon that inherits text color",
      summary: "fill: currentColor lets the icon automatically match whatever color it's placed in.",
      code: `function StarIcon({ size, color }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      style={{ color, fill: "currentColor" }}
    >
      <path d="M12 2l2.9 6.6 7.1.6-5.4 4.7 1.6 7-6.2-3.7-6.2 3.7 1.6-7L2 9.2l7.1-.6z" />
    </svg>
  );
}

function App() {
  return (
    <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
      <StarIcon size={28} color="#f59e0b" />
      <StarIcon size={28} color="#2563eb" />
      <StarIcon size={28} color="#16a34a" />
      <span style={{ color: "#6b7280", fontSize: 13 }}>
        Same SVG markup, three colors — set only with the color prop.
      </span>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "sizing-svg-vs-icon-font",
      title: "Sizing with width/height vs. font-size",
      summary: "An SVG icon sized in pixels next to a text-glyph icon sized like a font, the old icon-font way.",
      code: `function CheckIcon({ size }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function App() {
  return (
    <div style={{ display: "grid", gap: 14 }}>
      <div style={{ display: "flex", gap: 12, alignItems: "center", color: "#16a34a" }}>
        <CheckIcon size={16} />
        <CheckIcon size={24} />
        <CheckIcon size={40} />
        <span style={{ color: "#6b7280", fontSize: 13 }}>SVG sized via width/height</span>
      </div>

      <div style={{ display: "flex", gap: 12, alignItems: "baseline", color: "#2563eb" }}>
        <span style={{ fontSize: 16 }}>&#9733;</span>
        <span style={{ fontSize: 24 }}>&#9733;</span>
        <span style={{ fontSize: 40 }}>&#9733;</span>
        <span style={{ color: "#6b7280", fontSize: 13 }}>
          Text glyph sized via font-size — how icon fonts work
        </span>
      </div>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "icon-text-flex-alignment",
      title: "Aligning an icon next to text with flexbox",
      summary: "A row of labeled buttons keeping their icon and text vertically centered using flex + gap.",
      code: `function TrashIcon() {
  return (
    <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0-1 14a2 2 0 01-2 2H7a2 2 0 01-2-2L4 6" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

function IconButton({ icon, label, color }) {
  return (
    <button
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "8px 14px",
        borderRadius: 6,
        border: "1px solid #d1d5db",
        background: "white",
        color,
        cursor: "pointer",
      }}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

function App() {
  return (
    <div style={{ display: "flex", gap: 10 }}>
      <IconButton icon={<PlusIcon />} label="Add item" color="#16a34a" />
      <IconButton icon={<TrashIcon />} label="Delete" color="#dc2626" />
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "hover-interactive-icon-button",
      title: "A hover-interactive icon button",
      summary: "A circular icon button that changes background on :hover, using a real <style> tag.",
      code: `function IconButtonStyles() {
  return (
    <style>{\`
      .icon-btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        border: none;
        background: #f3f4f6;
        color: #374151;
        cursor: pointer;
        transition: background 0.15s ease, color 0.15s ease;
      }
      .icon-btn:hover { background: #2563eb; color: white; }
    \`}</style>
  );
}

function HeartIcon() {
  return (
    <svg width={18} height={18} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 21s-6.7-4.35-9.3-8.2C1 10.1 1.6 6.6 4.6 5.2c2.2-1 4.6-.2 5.9 1.6C11.8 5 14.2 4.2 16.4 5.2c3 1.4 3.6 4.9 1.9 7.6C18.7 16.65 12 21 12 21z" />
    </svg>
  );
}

function App() {
  return (
    <div>
      <IconButtonStyles />
      <button className="icon-btn" aria-label="Like">
        <HeartIcon />
      </button>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
