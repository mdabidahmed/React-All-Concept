import type { Topic } from "../../types";

export const htmlColorsTopic: Topic = {
  id: "html-colors",
  title: "HTML Colors",
  category: "HTML Basics",
  shortExplanation: `A color in HTML/CSS can be written four different ways, all describing the exact same possible colors.

- By **name**: \`"red"\`, \`"tomato"\`, \`"steelblue"\`
- By **hex code**: \`#ff0000\` (red, green, blue as two-digit hex values)
- By \`rgb(255, 0, 0)\` — red, green, blue as numbers from 0 to 255
- By \`hsl(0, 100%, 50%)\` — hue, saturation, and lightness
- Colors are most commonly set for text color, background color, and border color, via the \`style\` attribute`,
  longExplanation: `Wherever a color is expected — text color, a background, a border — HTML and CSS accept the same handful of notations, and it comes down to preference and precision which one to reach for.

- **Named colors** are the simplest: \`"red"\`, \`"tomato"\`, \`"steelblue"\`, and roughly 140 others are recognized by every browser. They're easy to read but limited to that fixed list
- **Hex codes** describe a color as three pairs of hexadecimal digits: \`#RRGGBB\`, where each pair sets the amount of red, green, and blue from \`00\` (none) to \`ff\` (full). \`#ff0000\` is pure red, \`#000000\` is black, \`#ffffff\` is white. Hex is the most common notation in real-world CSS
- \`rgb(red, green, blue)\` describes the same red/green/blue mixture as hex, but using plain numbers from 0 to 255 instead of hex digits — \`rgb(255, 0, 0)\` is the same red as \`#ff0000\`
- \`hsl(hue, saturation, lightness)\` describes color differently: **hue** is a position on the color wheel from 0 to 360 degrees (0 is red, 120 is green, 240 is blue), **saturation** is how intense the color is as a percentage, and **lightness** is how close to black or white it is as a percentage. HSL tends to be the most intuitive for *adjusting* a color — sliding lightness down darkens it while keeping the same hue, something that's much less obvious to do by eye in hex
- Colors are most often applied through the \`style\` attribute: \`color\` sets text color, \`background-color\` sets the background, and \`border-color\` (or a shorthand \`border\`) sets a border's color. In JSX, these become the camelCase \`color\`, \`backgroundColor\`, and \`borderColor\` properties inside a style object

All four notations can describe the exact same color — which one to use is purely a matter of convenience, precision, or how easy a value is to tweak later.`,
  examples: [
    {
      id: "four-notations-same-color",
      title: "The same red, written four ways",
      summary: "Name, hex, rgb, and hsl all producing an identical color swatch.",
      code: `function App() {
  const swatch = { width: 90, height: 60, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: 12 };

  return (
    <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
      <div style={{ ...swatch, backgroundColor: "red" }}>"red"</div>
      <div style={{ ...swatch, backgroundColor: "#ff0000" }}>#ff0000</div>
      <div style={{ ...swatch, backgroundColor: "rgb(255, 0, 0)" }}>rgb(255,0,0)</div>
      <div style={{ ...swatch, backgroundColor: "hsl(0, 100%, 50%)" }}>hsl(0,100%,50%)</div>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "where-colors-get-applied",
      title: "Text color, background color, and border color",
      summary: "The three most common places a color value gets used.",
      code: `function App() {
  return (
    <div style={{ display: "grid", gap: 10 }}>
      <p style={{ color: "steelblue" }}>This text uses color to set its own color.</p>
      <div style={{ backgroundColor: "#fef3c7", padding: 10, borderRadius: 6 }}>
        This box uses backgroundColor.
      </div>
      <div style={{ border: "3px solid tomato", padding: 10, borderRadius: 6 }}>
        This box uses a tomato-colored border.
      </div>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "hex-color-palette",
      title: "A small palette of hex colors",
      summary: "A row of swatches built from an array of hex codes, mapped into elements.",
      code: `function App() {
  const palette = ["#ef4444", "#f97316", "#eab308", "#22c55e", "#3b82f6", "#8b5cf6"];

  return (
    <div style={{ display: "flex", gap: 8 }}>
      {palette.map((hex) => (
        <div
          key={hex}
          style={{ width: 48, height: 48, backgroundColor: hex, borderRadius: 6 }}
          title={hex}
        />
      ))}
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "interactive-hsl-hue-slider",
      title: "Exploring hsl() with a hue slider",
      summary: "A slider that changes only the hue, showing why hsl makes color adjustments easy to reason about.",
      code: `function App() {
  const [hue, setHue] = useState(200);
  const color = "hsl(" + hue + ", 80%, 50%)";

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <div style={{ width: "100%", height: 80, backgroundColor: color, borderRadius: 8 }} />
      <input
        type="range"
        min="0"
        max="360"
        value={hue}
        onChange={(e) => setHue(Number(e.target.value))}
      />
      <p>{color} — only the hue changes; saturation and lightness stay fixed.</p>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
