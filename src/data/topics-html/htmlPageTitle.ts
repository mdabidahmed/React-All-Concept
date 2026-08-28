import type { Topic } from "../../types";

export const htmlPageTitleTopic: Topic = {
  id: "html-page-title",
  title: "HTML Page Title",
  category: "HTML Structure",
  shortExplanation: `The \`<title>\` element, placed inside \`<head>\`, sets the text shown in the **browser tab**, in **bookmarks**, and as the clickable **heading of a search engine result**.

- Every page should have exactly *one* \`<title>\`, and it should be genuinely descriptive
- It's metadata, not content — it never appears inside the visible page itself
- \`"My Page"\` or \`"Untitled Document"\` tells a visitor (and a search engine) nothing useful`,
  longExplanation: `\`<title>\` is a small element that does a surprising amount of work — it's one of the very first things a browser, a search engine, and a human all look at when deciding what a page is.

- It lives inside \`<head>\`, so — like a favicon — it never renders as visible content on the page. Its job is entirely about *identifying* the page from the outside
- It sets the text shown in the **browser tab** itself, which is often the only way a visitor with many tabs open can tell pages apart
- It becomes the default text used when a visitor **bookmarks** the page
- Search engines display it as the large, clickable **headline** of a search result — a vague or missing title actively hurts how a page performs in search results, since it's often the first thing a person reads before deciding whether to click
- Good practice: keep it short but specific (\`"HTML Page Title - Learn HTML"\` rather than just \`"Page"\` or \`"Untitled"\`), and give every page on a site its *own* distinct title rather than reusing one title everywhere

Because \`<title>\` only affects the actual browser chrome — a real tab, a real bookmark menu, a real search result — it can't be demonstrated by rendering something inside this sandbox's page itself. The examples below build a mock browser tab and a mock search result to show its effect concretely.`,
  examples: [
    {
      id: "mock-tab-titles",
      title: "Good title vs. vague title, as browser tabs",
      summary: "The exact same page, differing only in its <title>, shown as two mock browser tabs.",
      code: `function App() {
  const Tab = ({ label }) => (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        background: "#e5e7eb",
        borderRadius: 8,
        padding: "8px 14px",
        fontSize: 13,
        maxWidth: 200,
        overflow: "hidden",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
      }}
    >
      <span>📄</span>
      <span>{label}</span>
    </div>
  );

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <div>
        <p style={{ fontSize: 12, color: "#6b7280", margin: "0 0 4px" }}>{'<title>Untitled Document</title>'}</p>
        <Tab label="Untitled Document" />
      </div>
      <div>
        <p style={{ fontSize: 12, color: "#6b7280", margin: "0 0 4px" }}>
          {'<title>HTML Page Title - Learn HTML</title>'}
        </p>
        <Tab label="HTML Page Title - Learn HTML" />
      </div>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "mock-search-result",
      title: "The title as a search-engine headline",
      summary: "A mock search result, with the <title> text used as the clickable heading.",
      code: `function App() {
  return (
    <div style={{ maxWidth: 480, fontFamily: "Arial, sans-serif" }}>
      <div style={{ fontSize: 12, color: "#059669" }}>https://example.com/learn/html</div>
      <div style={{ fontSize: 18, color: "#1a0dab", margin: "2px 0" }}>HTML Page Title - Learn HTML</div>
      <div style={{ fontSize: 13, color: "#4b5563" }}>
        The title element sets the headline shown here — a vague title makes a page far less inviting to click.
      </div>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "page-title-source",
      title: "Where <title> lives in the document",
      summary: "One title element inside head, distinct from any heading rendered on the page.",
      code: `function App() {
  const source = \`<head>
  <title>HTML Page Title - Learn HTML</title>
</head>
<body>
  <h1>Welcome to the Page</h1>
</body>\`;

  return (
    <div>
      <p>
        Note the difference: &lt;title&gt; sets tab/bookmark/search text, while &lt;h1&gt; is a visible on-page
        heading — they usually shouldn't say the exact same thing.
      </p>
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
