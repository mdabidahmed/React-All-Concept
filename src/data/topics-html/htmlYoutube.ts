import type { Topic } from "../../types";

export const htmlYoutubeTopic: Topic = {
  id: "html-youtube",
  title: "HTML YouTube",
  category: "HTML Media",
  shortExplanation: `Embedding a YouTube video on a page just means pointing an \`<iframe>\` at YouTube's special **embed URL**.

- Swap a normal watch URL's \`/watch?v=VIDEO_ID\` for \`/embed/VIDEO_ID\`
- \`width\`/\`height\` size the player; \`title\` matters for accessibility
- \`allowFullScreen\` lets the visitor expand the embedded player to fullscreen`,
  longExplanation: `YouTube doesn't give you a special HTML element — embedding one of its videos is just a regular \`<iframe>\` pointed at a URL YouTube serves specifically for embedding.

- A normal YouTube watch page lives at \`https://www.youtube.com/watch?v=VIDEO_ID\`. To embed that same video, swap the path for the **embed** form: \`https://www.youtube.com/embed/VIDEO_ID\`
- \`<iframe src="https://www.youtube.com/embed/VIDEO_ID" width="560" height="315"></iframe>\` is the minimal working embed — an \`<iframe>\` loads an entire separate page (YouTube's player) inside a rectangle on yours
- **\`title\`** on the \`<iframe>\` matters more than it might seem: screen readers announce it to describe what the embedded frame contains, since there's no other way for assistive tech to know what's inside a third-party frame
- **\`allowFullScreen\`** (written as the \`allowfullscreen\` HTML attribute) lets the visitor expand YouTube's player to fill the whole screen using its own built-in fullscreen button
- This works because YouTube's embed player, unlike an arbitrary page, is deliberately designed to run inside someone else's \`<iframe>\` — most sites block being framed this way as a security measure, but YouTube (and services like it) explicitly allow it for exactly this purpose

Because an \`<iframe>\` is a completely standard HTML element with no permission prompts or special browser APIs involved, embedding YouTube video is one of the few "external" HTML features that runs exactly the same way in this sandbox as it would in a real page.`,
  examples: [
    {
      id: "basic-youtube-embed",
      title: "A basic YouTube embed",
      summary: "An <iframe> pointed at YouTube's /embed/ URL form, with a real embeddable public video.",
      code: `function App() {
  return (
    <iframe
      width="360"
      height="203"
      src="https://www.youtube.com/embed/dQw4w9WgXcQ"
      title="Embedded YouTube video"
      allowFullScreen
      style={{ border: "none", borderRadius: 6 }}
    />
  );
}

render(<App />);`,
    },
    {
      id: "watch-url-to-embed-url",
      title: "Converting a watch URL to an embed URL",
      summary: "The only change needed: /watch?v=ID becomes /embed/ID.",
      code: `function App() {
  const videoId = "dQw4w9WgXcQ";
  const watchUrl = "https://www.youtube.com/watch?v=" + videoId;
  const embedUrl = "https://www.youtube.com/embed/" + videoId;

  return (
    <div style={{ display: "grid", gap: 8, fontFamily: "monospace", fontSize: 13, maxWidth: 380 }}>
      <div style={{ background: "#f1f5f9", padding: 8, borderRadius: 6 }}>Watch URL: {watchUrl}</div>
      <div style={{ background: "#f1f5f9", padding: 8, borderRadius: 6 }}>Embed URL: {embedUrl}</div>
      <iframe
        width="360"
        height="203"
        src={embedUrl}
        title="Embedded video from converted URL"
        allowFullScreen
        style={{ border: "none", borderRadius: 6 }}
      />
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "sized-embed-with-fullscreen-toggle",
      title: "Sizing the player and toggling allowFullScreen",
      summary: "Comparing width/height presets, and seeing what allowFullScreen actually controls.",
      code: `function App() {
  const [large, setLarge] = useState(false);
  const [fullscreenAllowed, setFullscreenAllowed] = useState(true);

  return (
    <div style={{ display: "grid", gap: 10, maxWidth: 420 }}>
      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={() => setLarge((v) => !v)}>{large ? "Use small size" : "Use large size"}</button>
        <button onClick={() => setFullscreenAllowed((v) => !v)}>
          allowFullScreen: {fullscreenAllowed ? "on" : "off"}
        </button>
      </div>
      <iframe
        width={large ? 420 : 280}
        height={large ? 236 : 158}
        src="https://www.youtube.com/embed/dQw4w9WgXcQ"
        title="Resizable embedded YouTube video"
        allowFullScreen={fullscreenAllowed}
        style={{ border: "none", borderRadius: 6 }}
      />
      <small>
        With allowFullScreen off, the player's own fullscreen button stops working — the browser
        enforces this at the iframe level.
      </small>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
