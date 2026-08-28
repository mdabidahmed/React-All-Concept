import type { Topic } from "../../types";

export const cssImageGalleryTopic: Topic = {
  id: "css-image-gallery",
  title: "CSS Image Gallery",
  category: "CSS Components",
  shortExplanation: `An image gallery combines a ==responsive grid== of uniform thumbnails with a ==hover effect== that gives feedback when the pointer is over one.

- Grid or \`flexWrap\` arranges thumbnails into responsive rows/columns
- \`objectFit: "cover"\` keeps every thumbnail the same shape regardless of its source image's aspect ratio
- \`transform: "scale(...)"\` on \`:hover\` creates a zoom effect
- \`overflow: "hidden"\` on the thumbnail's wrapper clips the zoomed image to its original box`,
  longExplanation: `A photo gallery is really two separate problems solved together: laying out a responsive grid of same-sized thumbnails, and giving each one interactive hover feedback so it feels alive rather than static.

**The layout half** is a direct application of ideas from the Grid and Responsive Images topics. \`gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))"\` produces a self-adjusting number of columns with no media query needed — as many 140px-minimum thumbnails as fit the container width, each stretching evenly to fill any leftover space. Because source photos rarely share the same aspect ratio, each \`<img>\` needs \`objectFit: "cover"\` (and a fixed \`height\`) so every thumbnail renders as a uniform, cleanly cropped rectangle instead of a grid of mismatched shapes.

**The interaction half** is where \`:hover\` comes in, and it needs a genuine \`<style>\` tag rather than an inline \`style\` object, since \`:hover\` is a pseudo-class the browser evaluates continuously. Two closely related hover patterns cover almost every gallery you'll see in the wild:

- **Zoom-on-hover**: the image gets \`transform: "scale(1.08)"\` (or similar) purely on \`:hover\`, and a \`transition\` on \`transform\` makes the zoom animate smoothly rather than snapping instantly. Critically, the thumbnail's *wrapper* needs \`overflow: "hidden"\` — without it, the zoomed image would spill outside its intended box rather than appearing to zoom "within" a fixed frame. This is a subtle but essential detail: the scaling happens on the \`<img>\`, but the clipping happens on its parent.
- **Overlay-on-hover**: a semi-transparent caption or icon layer sits on top of the image, using \`position: absolute\` inside a \`position: relative\` wrapper (the same anchoring pattern from the Dropdowns topic), with \`opacity: 0\` by default and \`opacity: 1\` on the wrapper's \`:hover\` — revealing a caption, a set of icons, or a "view" button only when the user's attention is actually on that particular photo.

Both patterns benefit from a CSS \`transition\` (covered in the Animations/Transitions topics) on the animated property — without one, the scale or opacity change happens instantly, which reads as jarring rather than polished; \`transition: "transform 0.25s ease"\` or similar is what makes a hover effect feel deliberate.

A gallery is also a good place to reinforce a boundary from the Responsive Images topic: \`objectFit\` controls how each *individual* image fills its box, while the grid properties control how many boxes exist and how they're arranged — the two concerns are independent and compose cleanly, which is exactly why a gallery is often the first place people notice how useful that separation is.`,
  examples: [
    {
      id: "responsive-thumbnail-grid",
      title: "A self-adjusting responsive thumbnail grid",
      summary: "repeat(auto-fill, minmax(...)) plus objectFit produces uniform thumbnails with zero media queries.",
      code: `function App() {
  const ids = [1011, 1015, 1025, 1035, 1041, 1050];
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))", gap: 8 }}>
      {ids.map((id) => (
        <img
          key={id}
          src={\`https://picsum.photos/id/\${id}/300/300\`}
          alt={\`Sample \${id}\`}
          style={{ width: "100%", height: 100, objectFit: "cover", borderRadius: 6, display: "block" }}
        />
      ))}
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "zoom-on-hover",
      title: "A zoom effect clipped to each thumbnail's frame",
      summary: "Hover any photo — it scales up smoothly but never spills past its own rounded frame.",
      code: `function GalleryStyles() {
  return (
    <style>{\`
      .zoom-frame {
        overflow: hidden;
        border-radius: 8px;
      }
      .zoom-frame img {
        display: block;
        width: 100%;
        height: 110px;
        object-fit: cover;
        transition: transform 0.3s ease;
      }
      .zoom-frame:hover img {
        transform: scale(1.12);
      }
    \`}</style>
  );
}

function App() {
  const ids = [1005, 1015, 1025, 1035];
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>
      <GalleryStyles />
      {ids.map((id) => (
        <div className="zoom-frame" key={id}>
          <img src={\`https://picsum.photos/id/\${id}/300/300\`} alt={\`Sample \${id}\`} />
        </div>
      ))}
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "caption-overlay-on-hover",
      title: "A caption overlay revealed on hover",
      summary: "position: relative/absolute plus opacity creates a caption that appears only on hover.",
      code: `function GalleryStyles() {
  return (
    <style>{\`
      .overlay-frame { position: relative; border-radius: 8px; overflow: hidden; }
      .overlay-frame img { display: block; width: 100%; height: 130px; object-fit: cover; }
      .overlay-caption {
        position: absolute;
        left: 0; right: 0; bottom: 0;
        padding: 8px 10px;
        background: linear-gradient(transparent, rgba(0,0,0,0.75));
        color: white;
        font-size: 13px;
        opacity: 0;
        transition: opacity 0.2s ease;
      }
      .overlay-frame:hover .overlay-caption { opacity: 1; }
    \`}</style>
  );
}

function App() {
  const photos = [
    { id: 1018, caption: "Mountain trail" },
    { id: 1024, caption: "Golden fields" },
    { id: 1039, caption: "Forest lake" },
  ];
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
      <GalleryStyles />
      {photos.map((p) => (
        <div className="overlay-frame" key={p.id}>
          <img src={\`https://picsum.photos/id/\${p.id}/300/300\`} alt={p.caption} />
          <div className="overlay-caption">{p.caption}</div>
        </div>
      ))}
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "gallery-with-featured-item",
      title: "A gallery with one featured item spanning two cells",
      summary: "Combining Grid's span with the hover-zoom pattern for a magazine-style layout.",
      code: `function GalleryStyles() {
  return (
    <style>{\`
      .feat-frame { overflow: hidden; border-radius: 8px; }
      .feat-frame img { display: block; width: 100%; height: 100%; object-fit: cover; transition: transform 0.3s ease; }
      .feat-frame:hover img { transform: scale(1.08); }
    \`}</style>
  );
}

function App() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gridAutoRows: 90, gap: 8 }}>
      <GalleryStyles />
      <div className="feat-frame" style={{ gridColumn: "span 2", gridRow: "span 2" }}>
        <img src="https://picsum.photos/id/1015/500/500" alt="Featured" />
      </div>
      <div className="feat-frame">
        <img src="https://picsum.photos/id/1025/300/300" alt="Sample" />
      </div>
      <div className="feat-frame">
        <img src="https://picsum.photos/id/1035/300/300" alt="Sample" />
      </div>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
