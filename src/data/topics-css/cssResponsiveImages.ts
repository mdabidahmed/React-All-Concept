import type { Topic } from "../../types";

export const cssResponsiveImagesTopic: Topic = {
  id: "css-responsive-images",
  title: "CSS Responsive Images",
  category: "CSS Flexbox & Grid",
  shortExplanation: `Images have their own intrinsic size, so they need a couple of specific CSS properties to behave well inside a fluid or grid layout instead of overflowing it.

- \`maxWidth: "100%"\` + \`height: "auto"\` — the classic fix: never wider than the container, height scales proportionally
- \`objectFit\` — how an image fills a *fixed-size* box: \`"cover"\` (crop to fill), \`"contain"\` (shrink to fit whole), \`"fill"\` (stretch, may distort)
- \`objectPosition\` — which part of the image stays visible when \`objectFit: "cover"\` crops it`,
  longExplanation: `An \`<img>\` element has its own natural, intrinsic dimensions from the source file, and by default a browser renders it at exactly that size — regardless of whether it fits inside its container. In a fluid or responsive layout, this causes two classic, very common problems, each solved by a different set of properties.

**Problem 1: images overflowing their container.** If a container shrinks (a narrow phone screen, a sidebar), a full-resolution image simply keeps its native width and spills out, breaking the layout. The fix is close to universal in real stylesheets: \`maxWidth: "100%"\` prevents the image from ever exceeding the width of its parent, and \`height: "auto"\` lets the height scale down proportionally alongside the constrained width, so the image never distorts. This pair of properties is close to a mandatory default on every \`<img>\` in a responsive layout — without \`height: auto\`, constraining just the width would leave the original height intact and squash the image.

**Problem 2: fitting an image into a fixed-size box without distorting it.** Sometimes a design calls for an image to occupy an exact box — a square avatar, a fixed-height card thumbnail — regardless of the source image's own aspect ratio. Simply forcing both \`width\` and \`height\` stretches the image unevenly whenever its native ratio doesn't match the box. \`objectFit\` solves this the same way \`background-size\` does for background images, but for real \`<img>\`/\`<video>\` elements:

- \`objectFit: "cover"\` scales the image to completely **fill** the box, cropping whatever overflows — the most common choice for thumbnails and hero images, because it never leaves empty space and never distorts proportions
- \`objectFit: "contain"\` scales the image to fit **entirely inside** the box, preserving the whole image but potentially leaving empty space (letterboxing) on two sides if the aspect ratios don't match — the right choice when no part of the image can be cropped, e.g. a logo or a diagram
- \`objectFit: "fill"\` (the old default behavior) stretches the image to exactly match the box's width and height, distorting the aspect ratio if they don't match — rarely desirable, but occasionally useful for deliberately stylized effects
- \`objectFit: "none"\` ignores the box size entirely and shows the image at its native size, cropped by the box's overflow

**\`objectPosition\`** works only alongside \`objectFit: "cover"\` (or \`"none"\`), where cropping is happening — it decides *which part* of the image survives the crop. It accepts the same keyword/percentage syntax as \`background-position\`: \`"center"\` (default), \`"top"\`, \`"top right"\`, or precise percentages like \`"50% 20%"\`. This matters a lot for photos of people — cropping a portrait to a square with the default center position can cut off the top of someone's head, and \`objectPosition: "top"\` or \`"50% 0%"\` fixes that without touching the source image.

A useful mental model: \`maxWidth: 100% / height: auto\` is for images that should **shrink to fit** an already-flexible container (most content images, in articles or fluid grids), while \`objectFit\` is for images placed into a container whose size is **fixed by the layout** (a grid of uniform thumbnails, a fixed-height card banner) where the image's own aspect ratio can't be allowed to dictate the box size. Both are ordinary CSS properties with direct camelCase equivalents, so everything here works as a plain inline \`style\` object — no \`<style>\` tag needed. Because this sandbox has no real image files, the examples below stand in actual photos with colored placeholder boxes carrying a visible aspect ratio, so the cropping/scaling behavior is still genuinely visible.`,
  examples: [
    {
      id: "max-width-prevents-overflow",
      title: "maxWidth: 100% prevents an oversized image from overflowing",
      summary: "A placeholder 'photo' twice as wide as its container, shown with and without the fix.",
      code: `function Placeholder({ label }) {
  return (
    <div
      style={{
        width: 600,
        height: 160,
        background: "linear-gradient(135deg, #2563eb, #7c3aed)",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 13,
        borderRadius: 6,
      }}
    >
      {label} (native size: 600 x 160)
    </div>
  );
}

function App() {
  return (
    <div style={{ display: "grid", gap: 16 }}>
      <div>
        <p style={{ margin: "0 0 6px", fontSize: 13, color: "#6b7280" }}>Without a fix — overflows a 240px container</p>
        <div style={{ width: 240, overflow: "hidden", border: "1px dashed #d1d5db", padding: 4 }}>
          <Placeholder label="Overflowing" />
        </div>
      </div>
      <div>
        <p style={{ margin: "0 0 6px", fontSize: 13, color: "#6b7280" }}>
          With maxWidth: "100%" — constrained, proportions preserved
        </p>
        <div style={{ width: 240, border: "1px dashed #d1d5db", padding: 4 }}>
          <div style={{ maxWidth: "100%", height: "auto" }}>
            <Placeholder label="Constrained" />
          </div>
        </div>
      </div>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "object-fit-cover-vs-contain",
      title: "objectFit: cover vs. contain in a fixed box",
      summary: "The same wide image forced into a square box three different ways.",
      code: `function WideImage(props) {
  return (
    <img
      src="https://picsum.photos/id/1015/400/200"
      alt="Wide landscape"
      style={{ width: 140, height: 140, borderRadius: 8, background: "#e5e7eb", ...props.style }}
    />
  );
}

function App() {
  return (
    <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
      <div>
        <p style={{ fontSize: 12, color: "#6b7280", margin: "0 0 6px" }}>objectFit: "cover"</p>
        <WideImage style={{ objectFit: "cover" }} />
      </div>
      <div>
        <p style={{ fontSize: 12, color: "#6b7280", margin: "0 0 6px" }}>objectFit: "contain"</p>
        <WideImage style={{ objectFit: "contain" }} />
      </div>
      <div>
        <p style={{ fontSize: 12, color: "#6b7280", margin: "0 0 6px" }}>objectFit: "fill" (distorted)</p>
        <WideImage style={{ objectFit: "fill" }} />
      </div>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "object-position-crop-focus",
      title: "objectPosition changes which part survives the crop",
      summary: "Same image, same cover crop, but a different objectPosition keeps a different region visible.",
      code: `function CroppedImage({ position }) {
  return (
    <div style={{ display: "grid", gap: 6, justifyItems: "center" }}>
      <img
        src="https://picsum.photos/id/1005/400/400"
        alt="Portrait"
        style={{ width: 110, height: 110, objectFit: "cover", objectPosition: position, borderRadius: 8 }}
      />
      <span style={{ fontSize: 12, color: "#6b7280" }}>{position}</span>
    </div>
  );
}

function App() {
  return (
    <div style={{ display: "flex", gap: 20 }}>
      <CroppedImage position="top" />
      <CroppedImage position="center" />
      <CroppedImage position="bottom" />
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "responsive-thumbnail-grid",
      title: "Uniform thumbnail grid using objectFit",
      summary: "Images of different native aspect ratios all fill identical grid cells cleanly.",
      code: `function App() {
  const ids = [1011, 1015, 1025, 1035];
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>
      {ids.map((id) => (
        <img
          key={id}
          src={\`https://picsum.photos/id/\${id}/300/300\`}
          alt={\`Sample \${id}\`}
          style={{ width: "100%", height: 90, objectFit: "cover", borderRadius: 6 }}
        />
      ))}
    </div>
  );
}

render(<App />);`,
    },
  ],
};
