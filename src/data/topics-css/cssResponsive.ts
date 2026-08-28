import type { Topic } from "../../types";

export const cssResponsiveTopic: Topic = {
  id: "css-responsive",
  title: "CSS Responsive Design",
  category: "CSS Flexbox & Grid",
  shortExplanation: `**Responsive design** means a page adapts its layout to whatever screen it's viewed on — a phone, a tablet, a desktop monitor — rather than being built for one fixed width.

- ==Fluid== techniques (percentages, \`fr\` units, \`flex-wrap\`) adapt continuously, with no fixed "break points"
- ==Breakpoint== techniques (\`@media\` queries) swap between a few fixed layouts at specific widths
- **Mobile-first**: start with the small-screen layout, then add complexity as space allows
- **Desktop-first**: start with the full layout, then strip things down for small screens`,
  longExplanation: `Responsive design is the practice of building one set of markup and styles that produces a *good* layout across a huge range of screen sizes, instead of designing separately for "the desktop site" and "the mobile site." It rests on two complementary techniques that are usually combined rather than chosen between.

**Fluid layout** techniques adapt continuously, with no specific "break points" at all. A container sized with a percentage (\`width: "80%"\`) or Grid's \`fr\` unit resizes smoothly as its parent resizes. \`flexWrap: "wrap"\` lets items reflow onto new lines the moment they stop fitting, rather than at some predetermined width. \`repeat(auto-fill, minmax(150px, 1fr))\` (covered in the Grid Container topic) is a particularly powerful fluid pattern — the number of columns adjusts itself with zero explicit thresholds. Fluid techniques are appealing because they require no guessing about which device widths matter, and they handle the huge range of *in-between* sizes (a resized browser window, a foldable phone, a tablet in landscape) that fixed breakpoints tend to overlook.

**Breakpoint** techniques use \`@media\` queries (covered in depth in the next topic) to swap between a small number of deliberately designed layouts at specific widths — for example, a single column below 600px and a three-column grid above 900px. Breakpoints are necessary when a layout needs a genuinely *different structure* at different sizes, not just a resized version of the same structure — a sidebar that becomes a bottom tab bar, or a data table that becomes a stack of cards, are changes fluid techniques alone can't express.

**Mobile-first vs. desktop-first** is a question of which layout you write as the *default*, unconditional CSS, and which you layer on with media queries:

- **Mobile-first** starts with simple, single-column, small-screen styles as the base (unconditional) rules, then uses \`min-width\` media queries to progressively *add* complexity as more space becomes available — an extra column, a visible sidebar, larger spacing. This is the approach most real-world teams recommend today: it forces you to think about content priority first ("what actually matters on a small screen?"), and it tends to produce leaner CSS, because the base styles that every device receives (including slow mobile connections) are the simplest ones.
- **Desktop-first** starts with the full, richest layout as the default, then uses \`max-width\` media queries to progressively *remove or simplify* things for smaller screens — hiding a sidebar, collapsing a nav into a hamburger menu. This can feel more natural when redesigning an existing desktop-only site, but it means small screens (often majority of traffic, and often the slowest connections) download and then immediately override a larger amount of CSS.

In practice, robust responsive design combines both ideas: fluid Flexbox/Grid properties handle the continuous, in-between resizing for free, and a small number of \`@media\`-driven breakpoints step in only where the layout genuinely needs to restructure rather than just resize. Because the exact moment a breakpoint fires depends on real viewport width — something a static inline \`style\` object can't observe — the examples below that demonstrate breakpoints use a genuine \`<style>\` tag with real \`@media\` rules; try resizing the preview pane to see them switch live.`,
  examples: [
    {
      id: "fluid-vs-fixed-width",
      title: "Fluid percentage width vs. a fixed pixel width",
      summary: "Resize the preview pane — the percentage-based box adapts continuously, the fixed one never does.",
      code: `function App() {
  return (
    <div style={{ display: "grid", gap: 10 }}>
      <div style={{ width: "60%", background: "#2563eb", color: "white", padding: 10, borderRadius: 6 }}>
        width: "60%" — fluid, resizes with the container
      </div>
      <div style={{ width: 260, background: "#6b7280", color: "white", padding: 10, borderRadius: 6 }}>
        width: 260 — fixed, never changes
      </div>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "flex-wrap-fluid-reflow",
      title: "Reflow via flex-wrap — a fluid technique, no breakpoints",
      summary: "Cards keep their size and simply wrap onto new lines whenever they stop fitting.",
      code: `function App() {
  const cards = ["Alpha", "Bravo", "Charlie", "Delta", "Echo", "Foxtrot"];
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
      {cards.map((label) => (
        <div key={label} style={{ width: 110, background: "#f3f4f6", padding: 12, borderRadius: 8, textAlign: "center" }}>
          {label}
        </div>
      ))}
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "mobile-first-breakpoint",
      title: "Mobile-first: base styles, then min-width adds complexity",
      summary: "Single column by default; a media query adds a second column once there's enough room. Resize the preview pane.",
      code: `function ResponsiveStyles() {
  return (
    <style>{\`
      .mf-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 10px;
      }
      @media (min-width: 500px) {
        .mf-grid {
          grid-template-columns: 1fr 1fr;
        }
      }
    \`}</style>
  );
}

function App() {
  return (
    <div>
      <ResponsiveStyles />
      <p style={{ fontSize: 13, color: "#6b7280", marginTop: 0 }}>
        Resize the preview pane wider than ~500px to see a second column appear.
      </p>
      <div className="mf-grid">
        <div style={{ background: "#2563eb", color: "white", padding: 14, borderRadius: 6 }}>Card A</div>
        <div style={{ background: "#1d4ed8", color: "white", padding: 14, borderRadius: 6 }}>Card B</div>
      </div>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "desktop-first-breakpoint",
      title: "Desktop-first: base is the full layout, max-width simplifies it",
      summary: "A sidebar layout by default; a media query collapses it to a single column below a max-width threshold.",
      code: `function ResponsiveStyles() {
  return (
    <style>{\`
      .df-shell {
        display: grid;
        grid-template-columns: 160px 1fr;
        gap: 10px;
      }
      @media (max-width: 480px) {
        .df-shell {
          grid-template-columns: 1fr;
        }
      }
    \`}</style>
  );
}

function App() {
  return (
    <div>
      <ResponsiveStyles />
      <p style={{ fontSize: 13, color: "#6b7280", marginTop: 0 }}>
        Resize the preview pane narrower than ~480px to see the sidebar drop below the content.
      </p>
      <div className="df-shell">
        <div style={{ background: "#111827", color: "white", padding: 14, borderRadius: 6 }}>Sidebar</div>
        <div style={{ background: "#e0e7ff", color: "#3730a3", padding: 14, borderRadius: 6 }}>Main content</div>
      </div>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
