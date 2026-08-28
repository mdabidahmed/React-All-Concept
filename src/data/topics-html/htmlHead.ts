import type { Topic } from "../../types";

export const htmlHeadTopic: Topic = {
  id: "html-head",
  title: "HTML Head",
  category: "HTML Scripting & Layout",
  shortExplanation: `The \`<head>\` element holds a page's **metadata** — information *about* the page that is never shown as part of the visible content.

- \`<title>\` sets the browser tab's text; \`<meta charset="UTF-8">\` sets the character encoding
- \`<meta name="viewport" content="width=device-width, initial-scale=1.0">\` controls mobile rendering
- \`<link>\` connects an external stylesheet or favicon; \`<style>\` holds internal CSS
- Nothing inside \`<head>\` renders inside the page's visible \`<body>\``,
  longExplanation: `Every HTML document splits into two parts: a \`<head>\` containing information *about* the page, and a \`<body>\` containing what a visitor actually sees. The two never overlap — content placed in \`<head>\` has no visual representation on the page itself.

- \`<title>Page Name</title>\` sets the text shown in the browser's tab and in bookmarks — it's also what search engines usually display as a result's clickable headline
- \`<meta charset="UTF-8">\` declares which character encoding the page uses, so text (especially accented letters, symbols, and non-English scripts) displays correctly instead of as garbled characters — covered in more depth in the Charsets topic
- \`<meta name="viewport" content="width=device-width, initial-scale=1.0">\` tells mobile browsers to render the page at the device's actual width instead of simulating a full desktop layout and zooming out — the starting point for responsive design, covered in the Responsive topic
- \`<link rel="stylesheet" href="styles.css">\` connects an external CSS file; \`<link rel="icon" href="favicon.ico">\` sets the small icon shown in a browser tab
- \`<style>...</style>\` holds CSS written directly inside the document, as an alternative to a separate linked file

This sandbox has no real \`<head>\` element to render into, so most of the examples below simulate it as a two-pane layout: one pane lists the head metadata as plain readable text, the other shows the page's actual visible content — making it concrete that they're two entirely separate things. One exception genuinely runs: \`<title>\` maps directly onto the browser's real, global \`document.title\`, which this sandbox can actually set.`,
  examples: [
    {
      id: "head-vs-body-two-panes",
      title: "Head metadata vs. the visible page",
      summary: "A simulated two-pane view: metadata on the left never appears in the rendered content on the right.",
      code: `function App() {
  const head = [
    { name: "title", value: "My Portfolio" },
    { name: "meta charset", value: "UTF-8" },
    { name: "meta viewport", value: "width=device-width, initial-scale=1.0" },
    { name: "link rel=stylesheet", value: "styles.css" },
    { name: "link rel=icon", value: "favicon.ico" },
  ];

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
      <div>
        <p style={{ margin: "0 0 6px", fontWeight: "bold" }}>&lt;head&gt; (metadata — never shown)</p>
        <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13, color: "#6b7280" }}>
          {head.map((h) => (
            <li key={h.name}>
              <code>{h.name}</code>: {h.value}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <p style={{ margin: "0 0 6px", fontWeight: "bold" }}>&lt;body&gt; (what a visitor sees)</p>
        <div style={{ border: "1px solid #d1d5db", borderRadius: 6, padding: 12 }}>
          <h2 style={{ margin: "0 0 8px" }}>Welcome</h2>
          <p style={{ margin: 0 }}>This is the only part a visitor actually sees.</p>
        </div>
      </div>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "title-actually-changes-the-tab",
      title: "The <title> tag, genuinely running",
      summary: "Unlike the rest of <head>, document.title is a real global this sandbox can actually set.",
      code: `function App() {
  const [title, setTitle] = useState("My Page");

  useEffect(() => {
    document.title = title;
  }, [title]);

  return (
    <div style={{ display: "grid", gap: 8 }}>
      <label>
        Page title:{" "}
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
      </label>
      <p style={{ color: "#6b7280" }}>
        Check your actual browser tab above — it updates as you type, exactly like a real
        <code> {'<title>'}</code> would.
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "viewport-and-charset-as-text",
      title: "Viewport and charset meta tags",
      summary: "Shown as text, since they configure browser rendering behavior rather than producing visible output.",
      code: `function App() {
  const charset = '<meta charset="UTF-8">';
  const viewport = '<meta name="viewport" content="width=device-width, initial-scale=1.0">';

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <div>
        <p style={{ margin: "0 0 4px", color: "#6b7280" }}>Declares the text encoding:</p>
        <pre style={{ background: "#0f172a", color: "#e2e8f0", padding: 10, borderRadius: 6, fontSize: 12 }}>{charset}</pre>
      </div>
      <div>
        <p style={{ margin: "0 0 4px", color: "#6b7280" }}>Enables real responsive rendering on mobile:</p>
        <pre style={{ background: "#0f172a", color: "#e2e8f0", padding: 10, borderRadius: 6, fontSize: 12 }}>{viewport}</pre>
      </div>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "linking-stylesheet-and-favicon",
      title: "Linking a stylesheet and a favicon",
      summary: "Two common <link> uses, shown as text alongside the visible page they affect.",
      code: `function App() {
  const links = [
    '<link rel="stylesheet" href="css/styles.css">',
    '<link rel="icon" href="images/favicon.ico">',
  ];

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <pre style={{ background: "#0f172a", color: "#e2e8f0", padding: 10, borderRadius: 6, fontSize: 12 }}>
        {links.join("\\n")}
      </pre>
      <p style={{ color: "#6b7280" }}>
        Neither line shows up on the page — the stylesheet changes how the body's elements *look*, and the
        favicon only appears in the browser's tab bar.
      </p>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
