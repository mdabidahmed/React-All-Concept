import type { Topic } from "../../types";

export const cssFontsTopic: Topic = {
  id: "css-fonts",
  title: "CSS Fonts",
  category: "CSS Text & Typography",
  shortExplanation: `\`font-family\` picks the typeface, but real stylesheets always list a ==fallback stack== rather than a single font name, since not every device has every font installed.

- Generic families: \`serif\`, \`sans-serif\`, \`monospace\`, \`cursive\`, \`fantasy\`
- **Web-safe fonts** (Arial, Georgia, "Times New Roman") are pre-installed on nearly every device
- \`@font-face\` / Google Fonts load a *custom* font file from the network — this sandbox can't fetch external fonts, so examples stick to system fonts
- \`font-weight\`, \`font-style\`, and \`font-size\` control weight, slant, and size
- \`font\` is a shorthand combining several of these into one declaration`,
  longExplanation: `\`font-family\` doesn't just take one font name — it takes a **comma-separated list**, called a font stack, which the browser walks through in order until it finds one it actually has installed. \`font-family: "Helvetica Neue", Arial, sans-serif\` tries Helvetica Neue first, falls back to Arial if that's missing, and finally falls back to the browser's default sans-serif font if neither is available. The last entry in a good font stack should always be a **generic family** — \`serif\`, \`sans-serif\`, \`monospace\`, \`cursive\`, or \`fantasy\` — which guarantees the browser has *something* to fall back to no matter what. Font names containing a space (like \`"Times New Roman"\`) need to be wrapped in quotes.

**Web-safe fonts** are the small set of typefaces reliably pre-installed across operating systems — Arial, Helvetica, Georgia, "Times New Roman", "Courier New", Verdana, Tahoma. Building a font stack out of these means text renders consistently without downloading anything, which is why they're still the safe default fallback even in modern designs built around a custom font.

To use a font that *isn't* pre-installed — a brand's custom typeface, or something from a service like Google Fonts — a page has to explicitly load the font file. \`@font-face\` is the raw CSS mechanism for this: it declares a name and points to one or more font files (\`.woff2\`, \`.woff\`, etc.) hosted somewhere, and after that the declared name can be used in \`font-family\` like any other font. Google Fonts and similar services just host the font files and \`@font-face\` rules for you, so using one is usually as simple as adding a \`<link>\` tag to the page's \`<head>\` and then referencing the font's name. Because this sandbox has no network access to fetch real font files, none of the examples below reference an external font — everything uses fonts already available in the browser (system UI fonts, or the standard generic families), but the *technique* of listing fallbacks is identical either way.

\`font-size\` sets how large the text renders — it accepts pixels (\`16px\`), a relative unit like \`em\` or \`rem\` (relative to the parent's or root's font size), or keywords like \`large\`. \`font-weight\` controls how bold text appears, either with keywords (\`normal\`, \`bold\`) or a numeric scale from \`100\` (thin) to \`900\` (black/heavy), where \`400\` is normal weight and \`700\` is bold — though a given font only actually renders the specific weights it ships with; asking for a weight the font doesn't have makes the browser fake it or just round to the nearest one it has. \`font-style\` controls slant: \`normal\`, \`italic\` (uses the font's dedicated italic design), or \`oblique\` (the browser mechanically slants the upright letterforms when no true italic exists).

Finally, \`font\` is a **shorthand** that can pack \`font-style\`, \`font-weight\`, \`font-size\`, a \`line-height\` (separated from the size by a slash), and \`font-family\` all into one declaration: \`font: italic bold 18px/1.4 Georgia, serif;\`. The shorthand is compact but strict about order — \`font-size\` and \`font-family\` are required and must appear in that relative order, with everything else optional before the size. Most real-world code sticks to the individual longhand properties for clarity, reaching for the shorthand mainly when many of these values need to be set together and terseness matters.`,
  examples: [
    {
      id: "generic-font-families",
      title: "The five generic font families",
      summary: "The same sentence rendered in each CSS generic family, showing the character of each.",
      code: `function App() {
  const families = ["serif", "sans-serif", "monospace", "cursive", "fantasy"];

  return (
    <div style={{ display: "grid", gap: 10 }}>
      {families.map((family) => (
        <div key={family} style={{ fontFamily: family, fontSize: 20 }}>
          {family}: The quick brown fox jumps.
        </div>
      ))}
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "font-stack-fallbacks",
      title: "Building a font stack with fallbacks",
      summary: "A font-family list tries each name in order until one is available, ending in a generic family.",
      code: `function App() {
  return (
    <div style={{ display: "grid", gap: 12 }}>
      <p style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 18, margin: 0 }}>
        font-family: 'Helvetica Neue', Arial, sans-serif
      </p>
      <p style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: 18, margin: 0 }}>
        font-family: Georgia, 'Times New Roman', serif
      </p>
      <p style={{ fontFamily: "'Courier New', Consolas, monospace", fontSize: 18, margin: 0 }}>
        font-family: 'Courier New', Consolas, monospace
      </p>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        The browser tries each name left to right; the final generic keyword
        guarantees something always renders even if none of the named fonts exist.
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "font-weight-and-style-scale",
      title: "font-weight and font-style",
      summary: "Numeric weight steps from thin to black, plus normal vs. italic.",
      code: `function App() {
  const weights = [300, 400, 500, 600, 700, 800];

  return (
    <div style={{ display: "grid", gap: 16 }}>
      <div style={{ display: "grid", gap: 6 }}>
        {weights.map((w) => (
          <p key={w} style={{ fontWeight: w, fontSize: 18, margin: 0 }}>
            font-weight: {w}
          </p>
        ))}
      </div>

      <div style={{ display: "flex", gap: 20 }}>
        <p style={{ fontStyle: "normal", fontSize: 18, margin: 0 }}>font-style: normal</p>
        <p style={{ fontStyle: "italic", fontSize: 18, margin: 0 }}>font-style: italic</p>
      </div>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "font-shorthand",
      title: "The font shorthand property",
      summary: "One font declaration packing style, weight, size, line-height, and family together.",
      code: `function App() {
  return (
    <div style={{ display: "grid", gap: 12 }}>
      <p style={{ font: "italic bold 22px/1.4 Georgia, serif", margin: 0 }}>
        font: italic bold 22px/1.4 Georgia, serif
      </p>
      <p style={{ font: "normal 600 16px/1.6 Arial, sans-serif", margin: 0 }}>
        font: normal 600 16px/1.6 Arial, sans-serif
      </p>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        Both lines set style, weight, size, line-height, and family in a single property.
      </p>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
