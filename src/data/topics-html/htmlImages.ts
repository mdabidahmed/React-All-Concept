import type { Topic } from "../../types";

export const htmlImagesTopic: Topic = {
  id: "html-images",
  title: "HTML Images",
  category: "HTML Structure",
  shortExplanation: `The \`<img>\` element embeds a picture using \`src\` (where the file is) and \`alt\` (a text description).

- \`alt\` is shown if the image fails to load, and is read aloud by screen readers — it should never be skipped
- \`width\` and \`height\` reserve space for the image *before* it loads, which prevents the page from jumping around
- Wrapping an \`<img>\` inside an \`<a>\` turns the whole image into a clickable link
- Background images are set with CSS, not HTML — a separate concern from the \`<img>\` element`,
  longExplanation: `\`<img>\` is one of HTML's self-closing elements — it holds no content of its own, only attributes that describe which picture to load and how.

- **\`src\`** points to the image file, either a relative path (\`photo.jpg\`, next to the HTML file) or an absolute URL (\`https://example.com/photo.jpg\`)
- **\`alt\`** is required, not optional, for two real reasons: it's what displays in place of the image if the file fails to load or is slow on a bad connection, and it's what a screen reader announces to a visitor who can't see the image at all. A good \`alt\` describes what the image *shows* or *means* — \`alt="A golden retriever catching a frisbee"\`, not \`alt="image123.jpg"\`
- **\`width\` and \`height\`** tell the browser the image's dimensions *before* it has finished downloading, so it can reserve exactly that much space in the layout. Without them, the surrounding content jumps around as each image pops in — a real, measurable annoyance known as *layout shift*
- **Images as links**: wrapping an \`<img>\` inside an \`<a href="...">\` makes the entire image clickable, just like text inside an \`<a>\` would be
- **Background images are a CSS job**, not an HTML one — set with a CSS \`background-image\` property (e.g. \`background-image: url(photo.jpg)\`), rather than the \`<img>\` element. \`<img>\` is for content that is meaningfully *part of the page* (a photo the article is about); a background image is decorative and belongs to styling

Every attribute here — \`src\`, \`alt\`, \`width\`, \`height\` — is written identically in JSX, with one small syntax difference: numeric values like \`width\`/\`height\` are passed as \`{240}\` (a real number) rather than the string \`"240"\` HTML uses, though HTML tolerates either.`,
  examples: [
    {
      id: "basic-img-with-alt",
      title: "src and alt together",
      summary: "alt describes the image for screen readers and for when the image fails to load.",
      code: `function App() {
  return (
    <div style={{ display: "grid", gap: 8 }}>
      <img
        src="https://picsum.photos/seed/htmlimages/300/160"
        alt="A randomly generated placeholder landscape photo"
      />
      <small>Try disabling images in your browser sometime — this is exactly what alt text is for.</small>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "width-height-prevent-shift",
      title: "width and height prevent layout shift",
      summary: "Reserving space up front stops the page from jumping as each image finishes loading.",
      code: `function App() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
      <div>
        <p style={{ fontSize: 12, color: "#6b7280", margin: "0 0 4px" }}>With width/height reserved:</p>
        <img
          src="https://picsum.photos/seed/reserved/200/120"
          alt="Placeholder with reserved space"
          width={200}
          height={120}
          style={{ display: "block", background: "#e5e7eb" }}
        />
      </div>
      <div>
        <p style={{ fontSize: 12, color: "#6b7280", margin: "0 0 4px" }}>Without (space collapses to 0 until loaded):</p>
        <img
          src="https://picsum.photos/seed/unreserved/200/120"
          alt="Placeholder with no reserved space"
          style={{ display: "block" }}
        />
      </div>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "image-as-link",
      title: "Using an image as a link",
      summary: "Wrapping <img> inside <a> makes the whole picture clickable.",
      code: `function App() {
  return (
    <a href="https://developer.mozilla.org" target="_blank" rel="noreferrer">
      <img
        src="https://picsum.photos/seed/imagelink/220/120"
        alt="Click this image to visit MDN Web Docs"
      />
    </a>
  );
}

render(<App />);`,
    },
    {
      id: "background-image-is-css",
      title: "Background images belong to CSS, not <img>",
      summary: "A decorative background uses CSS background-image; content images use <img>.",
      code: `function App() {
  return (
    <div
      style={{
        backgroundImage: "url(https://picsum.photos/seed/bgdemo/400/160)",
        backgroundSize: "cover",
        height: 120,
        borderRadius: 8,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        textShadow: "0 1px 3px rgba(0,0,0,0.6)",
      }}
    >
      This text sits over a CSS background-image — no &lt;img&gt; element involved here at all.
    </div>
  );
}

render(<App />);`,
    },
  ],
};
