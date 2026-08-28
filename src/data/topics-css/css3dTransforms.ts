import type { Topic } from "../../types";

export const css3dTransformsTopic: Topic = {
  id: "css-3d-transforms",
  title: "CSS 3D Transforms",
  category: "CSS Advanced & Effects",
  shortExplanation: `3D transforms extend 2D transforms with a third axis, letting elements rotate and move as if they had real depth — driven entirely by CSS, no canvas or WebGL needed.

- \`perspective\` — how "close" the imaginary viewer is; smaller values exaggerate the 3D depth
- \`rotateX()\`, \`rotateY()\`, \`rotateZ()\` — spin an element around each of the three axes
- \`transform-style: preserve-3d\` — tells child elements to keep their own 3D positioning instead of flattening
- \`backface-visibility: hidden\` — hides an element's "back side" when it's rotated past 90 degrees, the trick behind flip cards`,
  longExplanation: `2D transforms (\`translate\`, \`rotate\`, \`scale\`, \`skew\`) all operate on a flat X/Y plane. 3D transforms add a **Z axis**, so elements can rotate through actual depth and move toward or away from the viewer — enough to build convincing flip cards, cubes, and depth effects with pure CSS.

**\`perspective\`** is the property that makes 3D transforms look three-dimensional at all. Without it, a 3D rotation is still mathematically happening, but it renders with no vanishing point, so it looks flat and distorted rather than like it's receding into the screen. \`perspective\` is set on the *parent* of the element being rotated (or via the \`perspective()\` transform function directly on the element), and its value represents the imaginary distance from the viewer's eye to the screen — think of it as a camera distance: a **smaller** value (like \`300px\`) means the camera is close, producing dramatic, exaggerated depth; a **larger** value (like \`1500px\`) is like a telephoto lens, producing subtler depth. \`perspective-origin\` additionally controls the vanishing point's position, similar to \`transform-origin\`.

**The three rotation axes.** \`rotateX(deg)\` tips an element forward/backward around a horizontal axis (like a book cover swinging open toward you), \`rotateY(deg)\` spins it around a vertical axis (like a door on a hinge, or a card flipping left-to-right), and \`rotateZ(deg)\` is functionally identical to the familiar 2D \`rotate(deg)\` — spinning flat, in-plane. \`rotate3d(x, y, z, deg)\` generalizes all three into one function by specifying a custom axis vector, useful for diagonal rotations.

**\`transform-style: preserve-3d\`.** By default, a browser "flattens" a 3D-transformed element's children into the same 2D plane as their parent — any 3D transforms *they* have are collapsed away. Setting \`transform-style: preserve-3d\` on the parent tells the browser to keep the 3D scene intact, so nested elements retain their own depth and rotation relative to each other, rather than being squashed flat. This is essential for scenes with more than one 3D layer, like a cube built from six rotated faces.

**\`backface-visibility: hidden\`** hides an element once it has been rotated more than 90 degrees away from the viewer — i.e., once you'd be looking at its "back." This is the entire mechanism behind a **flip card**: two faces (front and back) are stacked in the same position, the back face is pre-rotated 180 degrees around Y, and the whole stack rotates together on hover. Once the rotation passes the halfway point, the front face's back becomes visible for an instant and is hidden by \`backface-visibility: hidden\`, while the back face (rotated to now be facing forward) becomes visible — producing a convincing flip illusion with no JavaScript.

**Common gotchas.** Nested elements that need their own 3D positioning must have an ancestor with \`transform-style: preserve-3d\` — forgetting it is the most common reason a "3D scene" renders flat. \`perspective\` set directly as part of the \`transform\` property (\`transform: perspective(600px) rotateY(20deg)\`) behaves slightly differently from \`perspective\` as a standalone property on the parent — the standalone version is usually preferred for multi-child scenes since all children then share the same vanishing point. Finally, 3D transforms are composited by the GPU exactly like 2D ones, so they remain smooth to animate — pairing them with \`transition\` (covered in the CSS Transitions topic) is what makes hover-triggered flips and tilts feel natural rather than instant.`,
  examples: [
    {
      id: "rotate-axes-compared",
      title: "rotateX, rotateY, and rotateZ compared",
      summary: "The same card rotated 40 degrees around each of the three axes, with perspective applied to the parent.",
      code: `function App() {
  const stageStyle = { perspective: 500 };
  const cardStyle = {
    width: 100,
    height: 70,
    background: "#2563eb",
    borderRadius: 8,
    color: "white",
    display: "grid",
    placeItems: "center",
    fontSize: 12,
  };

  return (
    <div style={{ display: "flex", gap: 40, flexWrap: "wrap" }}>
      <div style={{ textAlign: "center" }}>
        <div style={stageStyle}>
          <div style={{ ...cardStyle, transform: "rotateX(40deg)" }}>rotateX</div>
        </div>
        <p style={{ fontSize: 12, color: "#6b7280", marginTop: 8 }}>rotateX(40deg) — tips forward</p>
      </div>
      <div style={{ textAlign: "center" }}>
        <div style={stageStyle}>
          <div style={{ ...cardStyle, transform: "rotateY(40deg)" }}>rotateY</div>
        </div>
        <p style={{ fontSize: 12, color: "#6b7280", marginTop: 8 }}>rotateY(40deg) — spins like a door</p>
      </div>
      <div style={{ textAlign: "center" }}>
        <div style={stageStyle}>
          <div style={{ ...cardStyle, transform: "rotateZ(40deg)" }}>rotateZ</div>
        </div>
        <p style={{ fontSize: 12, color: "#6b7280", marginTop: 8 }}>rotateZ(40deg) — same as 2D rotate()</p>
      </div>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "perspective-distance-comparison",
      title: "How perspective distance changes the depth",
      summary: "The same rotateY(50deg) card rendered under a close perspective and a far one.",
      code: `function App() {
  const cardStyle = {
    width: 120,
    height: 80,
    background: "#7c3aed",
    borderRadius: 8,
    color: "white",
    display: "grid",
    placeItems: "center",
    transform: "rotateY(50deg)",
  };

  return (
    <div style={{ display: "flex", gap: 60, flexWrap: "wrap" }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ perspective: 250 }}>
          <div style={cardStyle}>Close</div>
        </div>
        <p style={{ fontSize: 12, color: "#6b7280", marginTop: 8 }}>perspective: 250px — dramatic depth</p>
      </div>
      <div style={{ textAlign: "center" }}>
        <div style={{ perspective: 1400 }}>
          <div style={cardStyle}>Far</div>
        </div>
        <p style={{ fontSize: 12, color: "#6b7280", marginTop: 8 }}>perspective: 1400px — subtle depth</p>
      </div>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "flip-card-hover",
      title: "A 3D flip card, triggered on hover",
      summary: "Hover the card to flip it: two faces stacked with backface-visibility: hidden, rotated together via :hover.",
      code: `function FlipCardStyles() {
  return (
    <style>{\`
      .flip-scene { perspective: 800px; width: 180px; height: 120px; }
      .flip-card {
        position: relative;
        width: 100%;
        height: 100%;
        transform-style: preserve-3d;
        transition: transform 0.6s ease;
      }
      .flip-scene:hover .flip-card { transform: rotateY(180deg); }
      .flip-face {
        position: absolute;
        inset: 0;
        backface-visibility: hidden;
        border-radius: 10px;
        display: grid;
        place-items: center;
        color: white;
        font-weight: 600;
      }
      .flip-front { background: #0891b2; }
      .flip-back { background: #db2777; transform: rotateY(180deg); }
    \`}</style>
  );
}

function App() {
  return (
    <div>
      <FlipCardStyles />
      <div className="flip-scene">
        <div className="flip-card">
          <div className="flip-face flip-front">Hover me</div>
          <div className="flip-face flip-back">Flipped!</div>
        </div>
      </div>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "preserve-3d-cube-face",
      title: "transform-style: preserve-3d in action",
      summary: "With preserve-3d, two nested layers keep independent depth; without it, the child flattens onto the parent's plane.",
      code: `function CubeStyles() {
  return (
    <style>{\`
      .cube-stage { perspective: 600px; }
      .cube-outer {
        width: 120px; height: 90px;
        transform: rotateY(25deg);
        display: grid;
        place-items: center;
        background: #f3f4f6;
        border-radius: 8px;
      }
      .preserve-on { transform-style: preserve-3d; }
      .preserve-off { transform-style: flat; }
      .cube-inner {
        width: 60px; height: 60px;
        background: #16a34a;
        color: white;
        display: grid;
        place-items: center;
        font-size: 11px;
        border-radius: 6px;
        transform: rotateY(45deg) translateZ(10px);
      }
    \`}</style>
  );
}

function App() {
  return (
    <div style={{ display: "flex", gap: 40, flexWrap: "wrap" }}>
      <div style={{ textAlign: "center" }}>
        <div className="cube-stage">
          <div className="cube-outer preserve-on">
            <div className="cube-inner">3D kept</div>
          </div>
        </div>
        <p style={{ fontSize: 12, color: "#6b7280", marginTop: 8 }}>preserve-3d — inner box keeps its own tilt</p>
      </div>
      <div style={{ textAlign: "center" }}>
        <div className="cube-stage">
          <div className="cube-outer preserve-off">
            <div className="cube-inner">Flattened</div>
          </div>
        </div>
        <p style={{ fontSize: 12, color: "#6b7280", marginTop: 8 }}>flat (default) — inner box's 3D tilt collapses</p>
      </div>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
