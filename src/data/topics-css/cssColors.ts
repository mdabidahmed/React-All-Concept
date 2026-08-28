import type { Topic } from "../../types";

export const cssColorsTopic: Topic = {
  id: "css-colors",
  title: "CSS Colors",
  category: "CSS Basics",
  shortExplanation: `CSS accepts a color in several interchangeable notations, and two of them — \`rgba()\` and \`hsla()\` — add a fourth ==transparency== channel that hex and plain \`rgb()\`/\`hsl()\` don't have.

- **Named**: \`"tomato"\`, \`"steelblue"\` — a fixed list of ~140 keywords
- **Hex**: \`#3b82f6\`, or the shorthand \`#39f\` (each digit doubled)
- \`rgb(59, 130, 246)\` / \`rgba(59, 130, 246, 0.5)\` — red, green, blue, plus optional **alpha** (0 to 1)
- \`hsl(217, 91%, 60%)\` / \`hsla(217, 91%, 60%, 0.5)\` — hue, saturation, lightness, plus optional alpha
- The standalone \`opacity\` property fades an ==entire element== (and its children); an alpha channel fades ==only the color itself==`,
  longExplanation: `CSS accepts color values in several notations that all describe the same underlying red/green/blue (or hue/saturation/lightness) space — which one to reach for is mostly about convenience, readability, and whether transparency is needed.

**Named colors** are plain keywords — \`red\`, \`tomato\`, \`steelblue\`, \`rebeccapurple\` — and browsers recognize roughly 140 of them. They read clearly in source code but are limited to that fixed list; there's no named color for an exact brand blue.

**Hex codes** (\`#rrggbb\`) pack red, green, and blue into three pairs of hexadecimal digits, each running from \`00\` (none) to \`ff\` (full): \`#3b82f6\` is a mid-tone blue. When each pair happens to repeat the same digit twice — \`#3366ff\` — CSS allows a **shorthand** form that writes each channel once and lets the browser double it: \`#36f\` is exactly equivalent to \`#3366ff\`. Hex is probably the most common notation in real-world stylesheets and design tools, since color pickers and design software both export it directly.

\`rgb(red, green, blue)\` expresses the identical red/green/blue mixture as hex but with plain numbers from 0–255 instead of hex digits — \`rgb(59, 130, 246)\` is the same blue as \`#3b82f6\`. Its real advantage over hex shows up with **\`rgba()\`**, which accepts a fourth value: **alpha**, a number from \`0\` (fully transparent) to \`1\` (fully opaque). \`rgba(59, 130, 246, 0.4)\` is that same blue at 40% opacity — letting whatever is *behind* the element show through. (Modern CSS also allows a slash-separated alpha directly inside plain \`rgb()\` — \`rgb(59 130 246 / 0.4)\` — but the comma-separated \`rgba()\` form remains the most universally recognized.)

\`hsl(hue, saturation, lightness)\` takes a different, often more intuitive approach: **hue** is a position on the color wheel from 0–360 degrees (0/360 = red, 120 = green, 240 = blue), **saturation** is how vivid the color is as a percentage (0% = gray, 100% = fully saturated), and **lightness** is how close to black or white it is (0% = black, 50% = the pure hue, 100% = white). HSL is genuinely easier to *adjust* than hex or rgb — dropping lightness from 60% to 40% reliably darkens a color while keeping its hue and vividness exactly the same, something that's far from obvious to do by eye with hex digits. \`hsla()\` extends it with the same alpha channel as \`rgba()\`: \`hsla(217, 91%, 60%, 0.4)\`.

**Alpha channel vs. the \`opacity\` property** — this is the detail most worth internalizing, because the two look similar but behave very differently:

- An **alpha channel** (in \`rgba()\`/\`hsla()\`, or a slash in modern \`rgb()\`) makes *only that one color value* partially transparent. Set it on \`background-color\` and only the background fades — the element's text, border, and children stay fully opaque
- The standalone **\`opacity\`** property fades the *entire element*, including all of its descendants, as one flattened unit — text, borders, background, everything drops to the same transparency together, and there's no way to keep, say, the text fully opaque while only the background fades

A common real bug follows directly from this: setting \`opacity: 0.5\` on a card to get a "washed out" background ends up fading the card's text to the same 50%, making it hard to read — where \`rgba()\`/\`hsla()\` on just the background color achieves the translucent look without touching text at all.

In short: reach for named colors for quick clarity, hex for compactness and design-tool compatibility, and \`rgba()\`/\`hsla()\` specifically whenever transparency needs to apply to one property rather than a whole element.`,
  examples: [
    {
      id: "four-notations-one-color",
      title: "The same blue, written four ways",
      summary: "Named, hex, rgb, and hsl notations all producing an identical swatch.",
      code: `function App() {
  const swatch = { width: 110, height: 60, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: 12 };

  return (
    <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
      <div style={{ ...swatch, backgroundColor: "royalblue" }}>"royalblue"</div>
      <div style={{ ...swatch, backgroundColor: "#4169e1" }}>#4169e1</div>
      <div style={{ ...swatch, backgroundColor: "rgb(65, 105, 225)" }}>rgb(65,105,225)</div>
      <div style={{ ...swatch, backgroundColor: "hsl(225, 73%, 57%)" }}>hsl(225,73%,57%)</div>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "hex-shorthand",
      title: "Hex shorthand: #rgb vs #rrggbb",
      summary: "A three-digit hex code is expanded by doubling each digit — #3af equals #33aaff.",
      code: `function App() {
  const swatch = { width: 130, height: 60, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: 13, fontFamily: "monospace" };

  return (
    <div style={{ display: "flex", gap: 12 }}>
      <div style={{ ...swatch, backgroundColor: "#3af" }}>#3af</div>
      <div style={{ ...swatch, backgroundColor: "#33aaff" }}>#33aaff</div>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "alpha-channel-vs-opacity",
      title: "rgba() alpha vs. the opacity property",
      summary: "rgba() fades only the background, leaving text crisp; opacity fades the whole element, text included.",
      code: `function App() {
  const box = { padding: 16, borderRadius: 8, color: "#111827", fontWeight: 600, width: 220 };

  return (
    <div style={{ display: "flex", gap: 16, flexWrap: "wrap", background: "repeating-linear-gradient(45deg, #e5e7eb, #e5e7eb 10px, #f3f4f6 10px, #f3f4f6 20px)", padding: 16 }}>
      <div style={{ ...box, backgroundColor: "rgba(37, 99, 235, 0.35)" }}>
        rgba() alpha: only the background is translucent — this text stays fully readable.
      </div>
      <div style={{ ...box, backgroundColor: "rgb(37, 99, 235)", opacity: 0.35 }}>
        opacity: the entire element fades together — text included, and harder to read.
      </div>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "hsl-lightness-slider",
      title: "hsl() makes adjusting a color predictable",
      summary: "Dragging only the lightness value darkens or lightens the same hue, live.",
      code: `function App() {
  const [lightness, setLightness] = useState(55);
  const color = "hsl(160, 70%, " + lightness + "%)";

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <div style={{ width: "100%", height: 70, backgroundColor: color, borderRadius: 8 }} />
      <input
        type="range"
        min="10"
        max="90"
        value={lightness}
        onChange={(e) => setLightness(Number(e.target.value))}
      />
      <p style={{ fontFamily: "monospace" }}>{color}</p>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
