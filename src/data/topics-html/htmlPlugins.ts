import type { Topic } from "../../types";

export const htmlPluginsTopic: Topic = {
  id: "html-plugins",
  title: "HTML Plug-ins",
  category: "HTML Media",
  shortExplanation: `**Plug-ins** were browser add-ons (Flash Player, Java applets, QuickTime) that handled content HTML itself couldn't; \`<embed>\` and \`<object>\` were the tags used to host them.

- \`<embed>\` is a simple, self-closing container for external content
- \`<object>\` is a slightly richer version that can carry fallback content between its tags
- Nearly all plug-ins are now **obsolete** — Flash was discontinued, and browsers handle PDFs, video, and audio natively`,
  longExplanation: `Before browsers could play video, render PDFs, or run rich interactive content on their own, they relied on **plug-ins** — separately installed programs (Adobe Flash Player, Java, Apple QuickTime, Microsoft Silverlight, RealPlayer) that a browser would hand off to whenever it hit content it didn't understand natively. HTML gave two elements for embedding that plug-in-hosted content directly on a page:

- **\`<embed>\`** is a simple, self-closing element: \`<embed src="file.swf" width="300" height="200">\`. It has no closing tag and no fallback content — if the browser has no plug-in for that content type, nothing useful happens
- **\`<object>\`** is the richer alternative: \`<object data="file.pdf" type="application/pdf" width="300" height="200"></object>\`. Unlike \`<embed>\`, it's a container element, so you can nest fallback content between its tags that displays if the primary content can't be loaded

Both elements still exist in the HTML spec and still work for a narrow set of cases (notably, \`<object>\` remains a legitimate way to embed a PDF), but the plug-in *ecosystem* they were built for has almost entirely disappeared:

- **Flash was officially discontinued at the end of 2020**, and every major browser removed support for it entirely — content that once required a \`.swf\` file and a plug-in simply doesn't run anymore
- **Java applets** and browser plug-ins for Java were removed from browsers years earlier, as they were a major, recurring source of security vulnerabilities
- Browsers now handle the content that used to *need* a plug-in **natively**: video and audio through \`<video>\`/\`<audio>\` (no Flash player needed), and PDFs through a built-in PDF viewer that opens directly, with no plug-in at all

So today, \`<embed>\`/\`<object>\` are mostly a piece of HTML history worth recognizing rather than reaching for — modern equivalents (\`<video>\`, \`<audio>\`, \`<iframe>\`, or just linking directly to a PDF) cover nearly everything plug-ins used to be needed for.`,
  examples: [
    {
      id: "embed-vs-object-shape",
      title: "The shape of <embed> versus <object>",
      summary: "Neither of these runs real plug-in content anymore, but this shows the syntax difference.",
      code: `function App() {
  return (
    <div style={{ display: "grid", gap: 10, fontFamily: "monospace", fontSize: 13 }}>
      <div style={{ background: "#f1f5f9", padding: 10, borderRadius: 6 }}>
        {'<embed src="file.swf" width="300" height="200">'}
        <br />
        <span style={{ color: "#6b7280" }}>— self-closing, no fallback content</span>
      </div>
      <div style={{ background: "#f1f5f9", padding: 10, borderRadius: 6 }}>
        {'<object data="file.pdf" type="application/pdf" width="300" height="200">'}
        <br />
        {"  Your browser can't display this PDF."}
        <br />
        {"</object>"}
        <br />
        <span style={{ color: "#6b7280" }}>— a container, can hold fallback content</span>
      </div>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "object-embedding-a-pdf",
      title: "<object> still works for embedding a PDF",
      summary: "One case where <object> remains genuinely useful today, with fallback text for browsers that can't display it inline.",
      code: `function App() {
  return (
    <div style={{ maxWidth: 360 }}>
      <object
        data="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
        type="application/pdf"
        width="100%"
        height="240"
      >
        <p>
          Your browser can't display embedded PDFs. <a href="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" target="_blank" rel="noreferrer">Open the PDF instead</a>.
        </p>
      </object>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "then-vs-now-timeline",
      title: "What plug-ins used to handle, and what replaced them",
      summary: "A quick timeline table of plug-in-era content types versus their modern native equivalent.",
      code: `function App() {
  const rows = [
    { then: "Flash animations/games (.swf)", now: "CSS animations, <canvas>, or plain video" },
    { then: "Java applets", now: "Removed entirely; replaced by JavaScript in-page" },
    { then: "PDF viewer plug-in", now: "Built-in browser PDF viewer, no plug-in" },
    { then: "QuickTime/RealPlayer video", now: "Native <video> element" },
  ];

  return (
    <table style={{ borderCollapse: "collapse", width: "100%", maxWidth: 420, fontSize: 13 }}>
      <thead>
        <tr>
          <th style={{ border: "1px solid #d1d5db", padding: 8, textAlign: "left" }}>Then (plug-in)</th>
          <th style={{ border: "1px solid #d1d5db", padding: 8, textAlign: "left" }}>Now (native)</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.then}>
            <td style={{ border: "1px solid #d1d5db", padding: 8 }}>{row.then}</td>
            <td style={{ border: "1px solid #d1d5db", padding: 8 }}>{row.now}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

render(<App />);`,
    },
  ],
};
