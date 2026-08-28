import type { Topic } from "../../types";

export const htmlIframesTopic: Topic = {
  id: "html-iframes",
  title: "HTML Iframes",
  category: "HTML Structure",
  shortExplanation: `An \`<iframe>\` embeds an *entirely separate* HTML page inside the current one — a page within a page.

- Common uses: embedded videos, maps, ads, and third-party widgets
- \`width\` and \`height\` size the embedded frame; \`title\` is required for accessibility, since a screen reader announces it to describe what the frame contains
- Because an iframe can load content from anywhere, embedding **untrusted** sources is a real security consideration — browsers offer a \`sandbox\` attribute to restrict what embedded content is allowed to do`,
  longExplanation: `\`<iframe>\` ("inline frame") is one of the few HTML elements that embeds a whole *other document* — not just an image or a video file, but an entire separate, independently running web page — inside the current one.

- \`src\` points to the page being embedded, exactly like an \`<a>\`'s \`href\` or an \`<img>\`'s \`src\`, but what loads is a full page rather than a link target or a picture
- **Common real-world uses**: embedding a YouTube video player, an interactive map (like Google Maps), a payment widget, or an ad — anything where the safest and simplest approach is to let someone else's page run inside a boxed-off region of yours
- \`width\` and \`height\` set the visible size of the embedded frame, the same as for an image
- **\`title\` is not just documentation — it's required for accessibility**: a screen reader has no way to describe an iframe's contents from the outside, so it reads the \`title\` attribute aloud to tell a visitor what's embedded there (\`title="Embedded YouTube video player"\`, for instance)
- **Security matters here more than with most elements**: because the embedded content is a genuinely separate page — potentially from a source you don't fully control — an iframe is a real point where untrusted code could run alongside yours. Browsers provide a \`sandbox\` attribute that restricts what an embedded page is allowed to do (block scripts, block form submission, block opening new windows, etc.), and this is worth being deliberate about whenever the embedded source isn't fully trusted

Because \`<iframe>\` needs a real \`src\` URL from an external site — and this sandbox's live-code runner has no network access to load one — the examples below focus on the structure, attributes, and a runnable stand-in for an embedded frame rather than a working live embed.`,
  examples: [
    {
      id: "iframe-basic-structure",
      title: "The basic iframe structure",
      summary: "src, width, height, and title, shown as the real markup an iframe needs.",
      code: `function App() {
  const source = \`<iframe
  src="https://www.youtube.com/embed/dQw4w9WgXcQ"
  width="400"
  height="225"
  title="Embedded YouTube video player"
></iframe>\`;

  return (
    <div>
      <p>A typical embedded video iframe looks like this:</p>
      <pre style={{ background: "#0f172a", color: "#e2e8f0", padding: 12, borderRadius: 6, overflowX: "auto" }}>
        {source}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "iframe-placeholder-frame",
      title: "A stand-in for a rendered iframe",
      summary: "This sandbox has no network access to load a real external page, so this box represents where one would appear.",
      code: `function App() {
  return (
    <div>
      <div
        style={{
          width: 320,
          height: 180,
          border: "2px dashed #9ca3af",
          borderRadius: 6,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#6b7280",
          textAlign: "center",
          padding: 12,
        }}
        role="img"
        aria-label="Placeholder representing an embedded iframe"
      >
        An iframe with src="https://example.com/map" would render its content in this exact rectangle.
      </div>
      <small>In a real browser, this box would be replaced by the fully rendered external page.</small>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "why-title-matters",
      title: "Why the title attribute matters",
      summary: "title is what a screen reader announces to describe an otherwise opaque embedded frame.",
      code: `function App() {
  return (
    <div style={{ display: "grid", gap: 10 }}>
      <div style={{ background: "#fee2e2", padding: 10, borderRadius: 6 }}>
        {'<iframe src="...">'} — no title. A screen reader has nothing meaningful to announce.
      </div>
      <div style={{ background: "#dcfce7", padding: 10, borderRadius: 6 }}>
        {'<iframe src="..." title="Embedded pricing calculator">'} — a screen reader announces exactly what
        this frame contains.
      </div>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "iframe-sandbox-security",
      title: "Restricting an iframe with sandbox",
      summary: "The sandbox attribute limits what untrusted embedded content is allowed to do.",
      code: `function App() {
  const source = \`<!-- No restrictions: the embedded page can run scripts, submit forms, open popups, etc. -->
<iframe src="https://untrusted-example.com/widget" title="Third-party widget"></iframe>

<!-- Locked down: scripts are allowed, but popups, form submission, and top-level navigation are blocked -->
<iframe
  src="https://untrusted-example.com/widget"
  title="Third-party widget"
  sandbox="allow-scripts"
></iframe>\`;

  return (
    <div>
      <p>
        An empty <code>sandbox</code> attribute blocks everything (scripts, forms, popups); specific values like{" "}
        <code>allow-scripts</code> re-enable only what's actually needed.
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
