import type { Topic } from "../../types";

export const cssBorderImagesTopic: Topic = {
  id: "css-border-images",
  title: "CSS Border Images",
  category: "CSS Box Model",
  shortExplanation: `\`border-image\` replaces a plain solid border with an image (or a CSS gradient) that gets sliced into nine pieces and stretched or tiled around the box's edge.

- \`border-image-source\` — the image or gradient to use
- \`border-image-slice\` — where to cut the source into corners/edges/center
- \`border-image-repeat\` — \`stretch\`, \`repeat\`, or \`round\` for how the edge pieces fill the border's length
- \`border-image\` — the shorthand combining source, slice, width, and repeat

A \`border-width\` is still required for a border-image to have somewhere to render — \`border-image\` doesn't work without a base \`border\` sized region to fill.`,
  longExplanation: `A plain \`border\` is a single flat color drawn around a box. \`border-image\` replaces that flat color with a picture — typically a small image or a CSS \`gradient()\` — sliced up and mapped onto the border's four edges and four corners. It's the same underlying mechanism used by "9-slice" scaling in game engines and UI toolkits: split a rectangular image into a 3x3 grid (four corners, four edges, one center), keep the corners fixed size, and stretch or repeat the edge pieces to fill whatever length the actual border needs — letting a single small source image decorate a border of *any* size without the corners looking distorted.

**\`border-image-source\`** sets what to slice — most commonly \`url(...)\` for a real image file, or a \`linear-gradient()\`/\`radial-gradient()\`, which is far more practical in a sandbox or demo context since it needs no external asset and still produces a genuinely dynamic-looking border (a rainbow edge, a fading gradient ring, etc.).

**\`border-image-slice\`** defines where the source gets cut into its nine regions, as one to four numbers (interpreted as percentages or pixel offsets from each edge of the source). This is the trickiest part to build intuition for: the four slice values mark inset lines from the top, right, bottom, and left edges of the source image, dividing it into a grid — the four corner regions between those lines are used as-is for the border's corners, while the four edge strips between them are what gets stretched, repeated, or rounded to fill the border's actual length and width. A gradient source technically has no "natural size" the way a bitmap does, so with a gradient, \`border-image-slice\` mostly controls how much of the gradient's color range shows up at the corners versus the edges.

**\`border-image-width\`** optionally overrides how wide the rendered border-image band is (independent of \`border-width\`, though \`border-width\` still needs to be set to give the border-image somewhere to occupy in the first place). **\`border-image-repeat\`** decides how the edge strips fill the remaining length: \`stretch\` (the default) scales a single copy to fit exactly, which can look distorted for patterned images; \`repeat\` tiles copies of the edge strip, which can get cut off mid-pattern at the end; and \`round\` also tiles, but scales each tile slightly so a whole number of copies fits exactly, avoiding any cut-off tile at the cost of very slightly stretching each one.

All of these longhands combine into the **\`border-image\`** shorthand: \`border-image: linear-gradient(90deg, red, blue) 30 / 10px stretch;\` — source, then slice, then (after a \`/\`) width, then repeat.

The most important gotcha, and the reason \`border-image\` surprises people the first time they try it: **setting \`border-image\` alone does nothing without a corresponding \`border-style\` and \`border-width\`.** \`border-image\` only paints *within* the region a normal border would already occupy — it needs \`border-width\` (or the shorthand \`border\`) to establish how thick that region is, and typically \`border-style: solid\` as a fallback for browsers or situations where the image fails to load. In practice, \`border-image\` sees relatively limited real-world use compared to plain borders — it's most often reached for in decorative UI (ornate frames, dashed rainbow effects, sci-fi/game-style panel borders) rather than everyday layout work, precisely because getting the slicing math to look right takes noticeably more tuning than a solid color or simple gradient background would.`,
  examples: [
    {
      id: "gradient-border-image-basic",
      title: "A gradient used as a border-image",
      summary: "A linear-gradient sliced and stretched around a box's border, instead of a flat border color.",
      code: `function App() {
  return (
    <div
      style={{
        width: 220,
        height: 120,
        border: "12px solid transparent",
        borderImage: "linear-gradient(45deg, #f472b6, #6366f1, #22d3ee) 1",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: 600,
      }}
    >
      Gradient border-image
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "border-image-repeat-modes",
      title: "stretch vs. round for border-image-repeat",
      summary: "The same striped gradient source tiled two different ways around the same size border.",
      code: `function App() {
  const stripes = "repeating-linear-gradient(45deg, #f59e0b 0 10px, #92400e 10px 20px)";
  return (
    <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
      <div
        style={{
          width: 180,
          height: 100,
          border: "14px solid transparent",
          borderImageSource: stripes,
          borderImageSlice: 20,
          borderImageRepeat: "stretch",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 12,
        }}
      >
        repeat: stretch
      </div>
      <div
        style={{
          width: 180,
          height: 100,
          border: "14px solid transparent",
          borderImageSource: stripes,
          borderImageSlice: 20,
          borderImageRepeat: "round",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 12,
        }}
      >
        repeat: round
      </div>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "border-image-shorthand",
      title: "The full border-image shorthand",
      summary: "Source, slice, width, and repeat combined into a single border-image declaration.",
      code: `function App() {
  return (
    <div
      style={{
        width: 240,
        height: 100,
        border: "10px solid transparent",
        borderImage: "linear-gradient(90deg, #16a34a, #facc15, #dc2626) 30 / 10px stretch",
        padding: 12,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      border-image: linear-gradient(...) 30 / 10px stretch
    </div>
  );
}

render(<App />);`,
    },
  ],
};
