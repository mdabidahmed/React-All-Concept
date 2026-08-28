import type { Topic } from "../../types";

export const cssBackgroundsTopic: Topic = {
  id: "css-backgrounds",
  title: "CSS Backgrounds",
  category: "CSS Basics",
  shortExplanation: `An element's background is controlled by a family of \`background-*\` properties, or the single \`background\` **shorthand** that combines them.

- \`background-color\` — a solid fill
- \`background-image: url(...)\` — a picture (or a gradient) behind the content
- \`background-repeat\` — whether an image tiles (\`repeat\`, default) or not (\`no-repeat\`)
- \`background-position\` — where the image sits (\`center\`, \`top right\`, ...)
- \`background-size\` — \`cover\` (fill and crop) vs. \`contain\` (fit fully, may letterbox)
- \`background-attachment: fixed\` — the image stays put while the page scrolls`,
  longExplanation: `Backgrounds in CSS are built from a small family of properties that can be set individually or combined into one \`background\` shorthand.

**\`background-color\`** paints a solid, flat color behind an element's content and padding (it stops at the border, and does not extend under the margin). It accepts any color notation — named, hex, \`rgb()\`, \`hsl()\` — and is the simplest background of all.

**\`background-image\`** places a picture behind the content instead of (or layered on top of) a color, most commonly via \`url("path/to/image.jpg")\`. It also accepts CSS *gradients* — \`linear-gradient()\`, \`radial-gradient()\` — which are computed images rather than files, making them especially convenient in a sandbox with no real image hosting. If \`background-image\` and \`background-color\` are both set, the image draws on top; the color only shows through any transparent parts of the image.

By default, a background image **tiles** to fill the entire element — this is **\`background-repeat: repeat\`**, the default value, and it's why a single small texture image can cover an arbitrarily large area. \`background-repeat: no-repeat\` shows the image exactly once; \`repeat-x\`/\`repeat-y\` tile along only one axis — useful for a horizontal stripe pattern or a vertical divider texture.

**\`background-position\`** controls where a non-tiling (or partially tiling) image sits within the element, accepting keywords (\`center\`, \`top right\`, \`bottom left\`) or precise offsets (\`20px 10px\`, \`50% 50%\`). Combined with \`no-repeat\`, this is how a single icon or photo gets pinned to one exact spot, like a logo anchored to an element's top-right corner.

**\`background-size\`** controls how large the image renders, independent of its natural pixel dimensions. Two keywords cover the vast majority of real use: **\`cover\`** scales the image up until it completely fills the element in both dimensions, cropping whatever overflows — ideal for a full-bleed hero photo where empty gaps are unacceptable but some cropping is fine. **\`contain\`** scales the image so the *entire* image is visible within the element without cropping, which can leave empty "letterboxed" space on two sides if the image's aspect ratio doesn't match the container's — ideal for a logo or product photo where nothing should ever be cut off.

**\`background-attachment: fixed\`** detaches the image from the element's own scroll position and pins it relative to the *viewport* instead, so the page content scrolls over a background that stays visually still — the classic "parallax" effect. The default, \`scroll\`, moves the background along with the rest of the page as normal.

Finally, the **\`background\`** shorthand folds several of these into one declaration, in a fairly flexible order: \`background: #1e293b url("bg.png") no-repeat center / cover;\` sets color, image, repeat, position, and size (position and size are separated by a slash when both appear) in a single line. The shorthand is convenient, but it's worth knowing it also **resets any longhand \`background-*\` properties not mentioned** back to their defaults — mixing a shorthand and a later longhand override for the same element can produce surprises if that's forgotten.

A background image that fails to load (a bad URL, or none provided) simply shows nothing — the element falls back to its \`background-color\`, if any, or stays transparent, without any layout error.`,
  examples: [
    {
      id: "solid-color-vs-gradient-image",
      title: "background-color vs. background-image (gradient)",
      summary: "A solid fill and a linear-gradient used as a background-image, side by side.",
      code: `function App() {
  const box = { width: 160, height: 100, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: 13, fontWeight: 600 };

  return (
    <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
      <div style={{ ...box, backgroundColor: "#0ea5e9" }}>background-color</div>
      <div style={{ ...box, backgroundImage: "linear-gradient(135deg, #f97316, #ec4899)" }}>
        background-image: gradient
      </div>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "repeat-position-size",
      title: "background-repeat, background-position, background-size",
      summary: "The same small pattern tiled, then pinned once with no-repeat, then scaled with cover.",
      code: `function App() {
  const pattern = "repeating-linear-gradient(45deg, #a855f7 0 8px, #e9d5ff 8px 16px)";
  const box = { width: 160, height: 100, borderRadius: 8, border: "1px solid #d1d5db" };

  return (
    <div style={{ display: "grid", gap: 12 }}>
      <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
        <div style={{ ...box, backgroundImage: pattern, backgroundRepeat: "repeat" }} title="repeat (default)" />
        <div style={{ ...box, backgroundImage: pattern, backgroundRepeat: "no-repeat", backgroundPosition: "center" }} title="no-repeat, centered" />
        <div style={{ ...box, backgroundImage: pattern, backgroundRepeat: "no-repeat", backgroundSize: "cover" }} title="no-repeat, cover" />
      </div>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        Left: tiled (default repeat). Middle: shown once, centered. Right: scaled to fill with "cover".
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "cover-vs-contain",
      title: "background-size: cover vs. contain",
      summary: "cover fills the box and crops overflow; contain fits the whole image, possibly leaving gaps.",
      code: `function App() {
  const image = "linear-gradient(135deg, #22c55e 25%, #eab308 25% 50%, #3b82f6 50% 75%, #ef4444 75%)";
  const frame = { width: 180, height: 110, border: "2px dashed #9ca3af", borderRadius: 6, backgroundRepeat: "no-repeat", backgroundPosition: "center" };

  return (
    <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
      <div>
        <div style={{ ...frame, backgroundImage: image, backgroundSize: "cover" }} />
        <p style={{ textAlign: "center", fontSize: 12, color: "#6b7280" }}>cover</p>
      </div>
      <div>
        <div style={{ ...frame, backgroundImage: image, backgroundSize: "contain", backgroundColor: "#f3f4f6" }} />
        <p style={{ textAlign: "center", fontSize: 12, color: "#6b7280" }}>contain</p>
      </div>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "background-shorthand",
      title: "The background shorthand",
      summary: "Color, image, repeat, position, and size combined into one background declaration via a real <style> tag.",
      code: `function ShorthandStyles() {
  return (
    <style>{\`
      .hero {
        height: 130px;
        border-radius: 10px;
        color: white;
        display: flex;
        align-items: flex-end;
        padding: 12px;
        font-weight: 700;
        background: #0f172a linear-gradient(180deg, rgba(15,23,42,0) 40%, rgba(15,23,42,0.9) 100%),
                    radial-gradient(circle at 70% 30%, #38bdf8, transparent 60%);
        background-repeat: no-repeat;
        background-size: cover;
      }
    \`}</style>
  );
}

function App() {
  return (
    <div>
      <ShorthandStyles />
      <div className="hero">One shorthand-friendly background, layering two gradients</div>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
