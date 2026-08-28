import type { Topic } from "../../types";

export const htmlResponsiveTopic: Topic = {
  id: "html-responsive",
  title: "HTML Responsive",
  category: "HTML Scripting & Layout",
  shortExplanation: `**Responsive design** means a page's layout adapts to the size of the screen it's viewed on, instead of looking identical (and often unusable) on every device.

- The viewport meta tag, \`<meta name="viewport" content="width=device-width, initial-scale=1.0">\`, tells a mobile browser to render at the device's actual width
- Without it, phones simulate a full desktop-width page and then zoom out, making everything tiny
- A responsive layout typically rearranges — fewer columns, a stacked menu — as the available width shrinks
- This sandbox has no real device to resize, so the examples below simulate different screen widths with a manual switch`,
  longExplanation: `Before responsive design, a single fixed-width layout was expected to work on every screen — which meant it worked well on none of them. Mobile browsers made this worse by default: to avoid rendering a horrible mess, they'd quietly render the page as if it were on a desktop-width screen, then shrink the whole thing down to fit, leaving text and buttons too small to use.

- \`<meta name="viewport" content="width=device-width, initial-scale=1.0">\` fixes exactly that: \`width=device-width\` tells the browser to use the device's actual pixel width as the page's width, and \`initial-scale=1.0\` sets the initial zoom level to 100%, so a phone renders the page at phone-appropriate proportions from the start
- With the viewport set correctly, responsive **CSS** (media queries, flexible grids — covered in depth in later CSS topics) can rearrange the layout at different widths: a three-column layout might become one column on a phone, a horizontal nav might collapse into a stacked list, and font sizes might scale down
- The general pattern is: design for the smallest useful width first, then add extra columns and content as more space becomes available (often called ==mobile-first== design)

There's no real device to resize in this sandbox, and no way to trigger an actual browser's viewport behavior. The examples below simulate the effect by hand: a manual "Desktop / Tablet / Mobile" switch re-renders the same content with a different column count and arrangement, standing in for what real responsive CSS driven by real screen width would do automatically.`,
  examples: [
    {
      id: "device-switcher-columns",
      title: "Simulated device switcher",
      summary: "The same three cards rearrange from three columns down to one as the simulated device shrinks.",
      code: `function App() {
  const [device, setDevice] = useState("desktop");
  const columns = { desktop: 3, tablet: 2, mobile: 1 };
  const cards = ["Feature A", "Feature B", "Feature C"];

  return (
    <div style={{ display: "grid", gap: 12 }}>
      <div style={{ display: "flex", gap: 8 }}>
        {["desktop", "tablet", "mobile"].map((d) => (
          <button
            key={d}
            onClick={() => setDevice(d)}
            style={{
              padding: "6px 12px",
              borderRadius: 6,
              border: "1px solid " + (device === d ? "#2563eb" : "#d1d5db"),
              background: device === d ? "#2563eb" : "white",
              color: device === d ? "white" : "#111827",
              cursor: "pointer",
            }}
          >
            {d}
          </button>
        ))}
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(" + columns[device] + ", 1fr)",
          gap: 8,
        }}
      >
        {cards.map((c) => (
          <div key={c} style={{ border: "1px solid #d1d5db", borderRadius: 6, padding: 10, textAlign: "center" }}>
            {c}
          </div>
        ))}
      </div>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        {columns[device]} column{columns[device] > 1 ? "s" : ""} at the "{device}" simulated width.
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "nav-collapses-to-stacked",
      title: "Navigation: horizontal vs. stacked",
      summary: "A nav bar goes from a horizontal row to a stacked list, the way a real mobile layout often would.",
      code: `function App() {
  const [device, setDevice] = useState("desktop");
  const isNarrow = device === "mobile";
  const items = ["Home", "Shop", "About", "Contact"];

  return (
    <div style={{ display: "grid", gap: 12, maxWidth: 300 }}>
      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={() => setDevice("desktop")}>Desktop</button>
        <button onClick={() => setDevice("mobile")}>Mobile</button>
      </div>
      <nav
        style={{
          display: "flex",
          flexDirection: isNarrow ? "column" : "row",
          gap: 8,
          border: "1px solid #d1d5db",
          borderRadius: 6,
          padding: 10,
        }}
      >
        {items.map((item) => (
          <a key={item} href="#">
            {item}
          </a>
        ))}
      </nav>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "viewport-tag-as-text",
      title: "The viewport meta tag itself",
      summary: "Shown as text — this specific tag configures a real browser's rendering, which this sandbox can't trigger.",
      code: `function App() {
  const tag = '<meta name="viewport" content="width=device-width, initial-scale=1.0">';

  return (
    <div style={{ display: "grid", gap: 8 }}>
      <pre style={{ background: "#0f172a", color: "#e2e8f0", padding: 10, borderRadius: 6, fontSize: 12 }}>{tag}</pre>
      <p style={{ color: "#6b7280" }}>
        Without this tag, a phone typically renders the page at a wide, desktop-like width and then zooms the
        whole thing out — the exact opposite of what a responsive layout needs.
      </p>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
