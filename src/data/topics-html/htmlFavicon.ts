import type { Topic } from "../../types";

export const htmlFaviconTopic: Topic = {
  id: "html-favicon",
  title: "HTML Favicon",
  category: "HTML Structure",
  shortExplanation: `A **favicon** is the small icon shown next to a page's title in a browser tab, in bookmarks, and in browser history.

- Added inside \`<head>\` with \`<link rel="icon" href="favicon.ico">\`
- Usually a square image — \`.ico\`, \`.png\`, and \`.svg\` are all commonly supported
- It's a tiny detail, but its absence is very noticeable — a generic blank-page icon looks unfinished`,
  longExplanation: `A favicon ("favorite icon") is one of the smallest pieces of HTML, and also one of the most visible — it's the little logo sitting in a browser tab for as long as the page stays open.

- It's declared inside the document's \`<head>\`, not the visible \`<body>\`: \`<link rel="icon" href="favicon.ico">\`. Since \`<head>\` content is never rendered on the page itself, this is metadata *about* the page rather than content *on* it
- The \`href\` points to an image file, typically placed at the root of the site. Modern browsers accept \`.ico\`, \`.png\`, \`.svg\`, and a few other formats — \`.ico\` is the historical default because it can bundle multiple sizes in one file, but a plain \`.png\` works everywhere today
- Favicons show up in more places than just the tab: browser bookmarks, browser history lists, and mobile "add to home screen" shortcuts all use it
- If a page provides no favicon at all, most browsers fall back to a generic blank-page icon — harmless, but it can make a site feel unpolished

Because this sandbox renders one isolated JSX component with no real browser chrome around it, an actual \`<head>\`/\`<link rel="icon">\` can't be demonstrated live. The examples below build a mock browser tab out of ordinary \`<div>\`s to show *where* a favicon appears, and what the underlying HTML looks like.`,
  examples: [
    {
      id: "mock-tab-with-favicon",
      title: "Where a favicon appears — a mock browser tab",
      summary: "A fake browser tab UI, illustrating the icon's position next to the page title.",
      code: `function App() {
  return (
    <div style={{ maxWidth: 260 }}>
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          background: "#e5e7eb",
          borderRadius: "8px 8px 0 0",
          padding: "8px 14px",
          fontSize: 13,
        }}
      >
        <span style={{ fontSize: 14 }}>📄</span>
        <span>My Website</span>
      </div>
      <div style={{ background: "white", border: "1px solid #e5e7eb", padding: 12, borderRadius: "0 6px 6px 6px" }}>
        <small>The 📄 icon above stands in for a real favicon — normally a small logo image, not an emoji.</small>
      </div>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "mock-tab-without-favicon",
      title: "With vs. without a favicon",
      summary: "Comparing a tab that declares a favicon against one that falls back to the browser default.",
      code: `function App() {
  const Tab = ({ icon, label }) => (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        background: "#e5e7eb",
        borderRadius: 8,
        padding: "8px 14px",
        fontSize: 13,
      }}
    >
      <span style={{ fontSize: 14 }}>{icon}</span>
      <span>{label}</span>
    </div>
  );

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <div>
        <p style={{ fontSize: 12, color: "#6b7280", margin: "0 0 4px" }}>
          With <code>{'<link rel="icon" href="favicon.ico">'}</code> in &lt;head&gt;:
        </p>
        <Tab icon="🟢" label="My Website" />
      </div>
      <div>
        <p style={{ fontSize: 12, color: "#6b7280", margin: "0 0 4px" }}>Without any favicon declared:</p>
        <Tab icon="⬜" label="My Website" />
      </div>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "favicon-html-source",
      title: "The actual HTML that declares a favicon",
      summary: "A single link element inside head is all a favicon takes.",
      code: `function App() {
  const source = \`<head>
  <title>My Website</title>
  <link rel="icon" href="favicon.ico" type="image/x-icon">
</head>\`;

  return (
    <div>
      <p>This goes inside &lt;head&gt;, alongside the page's title:</p>
      <pre style={{ background: "#0f172a", color: "#e2e8f0", padding: 12, borderRadius: 6, overflowX: "auto" }}>
        {source}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
