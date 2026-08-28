import type { Topic } from "../../types";

export const htmlMediaTopic: Topic = {
  id: "html-media",
  title: "HTML Media",
  category: "HTML Media",
  shortExplanation: `**Media** on the web means anything beyond plain text and links — images, video, and audio — and modern HTML embeds all of it natively, with no extra software required.

- \`<img>\` embeds a picture (already covered in HTML Images)
- \`<video>\` and \`<audio>\` embed playable media, complete with a browser-provided player UI via the \`controls\` attribute
- Older approaches relied on **plug-ins** (Flash, QuickTime, RealPlayer) that had to be separately installed; browsers now handle common formats like MP4 and MP3 themselves`,
  longExplanation: `"Media" is the umbrella term for the non-text content a page embeds — pictures, video clips, and sound. HTML's approach to all three follows the same idea: a dedicated element points at a file with a \`src\` attribute, and the browser takes care of loading and (for video/audio) playing it.

- \`<img src="..." alt="...">\` embeds a still image — covered in depth in the HTML Images topic. It's the simplest of the three: no playback controls, no timeline, just a picture
- \`<video>\` and \`<audio>\` are richer: they hold **playable** media with a duration, a play/pause state, and (for video) a picture. Adding the \`controls\` attribute tells the browser to show its own built-in player UI — a play button, a seek bar, a volume slider — with zero custom code
- Historically, playing video or audio in a browser meant installing a **plug-in**: Adobe Flash Player, Apple QuickTime, RealPlayer, or the Java applet plug-in. Each needed separate installation, was a common source of security vulnerabilities, and only worked in some browsers
- Modern browsers dropped that requirement entirely. Formats like **MP4** (video) and **MP3** (audio) are decoded natively by the browser itself, so \`<video>\` and \`<audio>\` just work out of the box — no plug-in, no extra download, no per-browser compatibility gamble
- Flash specifically was **officially discontinued** at the end of 2020, and every major browser removed support for it; the native \`<video>\`/\`<audio>\` elements this batch of topics covers are what fully replaced it

The topics that follow — HTML Video, HTML Audio, HTML Plug-ins, and HTML YouTube — each dig into one piece of this picture in more detail.`,
  examples: [
    {
      id: "three-media-kinds-side-by-side",
      title: "Image, video, and audio, side by side",
      summary: "The three core media elements, each pointed at a real file with minimal attributes.",
      code: `function App() {
  return (
    <div style={{ display: "grid", gap: 16, maxWidth: 360 }}>
      <div>
        <p style={{ fontSize: 12, color: "#6b7280", margin: "0 0 4px" }}>Image (&lt;img&gt;):</p>
        <img
          src="https://picsum.photos/seed/htmlmedia/300/140"
          alt="A randomly generated placeholder photo"
          width={300}
          height={140}
        />
      </div>
      <div>
        <p style={{ fontSize: 12, color: "#6b7280", margin: "0 0 4px" }}>Video (&lt;video&gt;):</p>
        <video src="https://www.w3schools.com/html/mov_bbb.mp4" controls width={300} />
      </div>
      <div>
        <p style={{ fontSize: 12, color: "#6b7280", margin: "0 0 4px" }}>Audio (&lt;audio&gt;):</p>
        <audio src="https://www.w3schools.com/html/horse.mp3" controls />
      </div>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "controls-attribute-gives-a-free-ui",
      title: "The controls attribute gives you a player for free",
      summary: "Toggling the controls attribute shows the difference a single attribute makes.",
      code: `function App() {
  const [showControls, setShowControls] = useState(true);

  return (
    <div style={{ display: "grid", gap: 10, maxWidth: 320 }}>
      <label style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <input
          type="checkbox"
          checked={showControls}
          onChange={(e) => setShowControls(e.target.checked)}
        />
        controls attribute enabled
      </label>
      {showControls ? (
        <video src="https://www.w3schools.com/html/mov_bbb.mp4" controls width={300} />
      ) : (
        <video src="https://www.w3schools.com/html/mov_bbb.mp4" width={300} />
      )}
      <small>
        Without \`controls\`, there's no play button, seek bar, or volume slider — just a static
        video surface with no way to interact with it.
      </small>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "plugin-era-vs-native-era",
      title: "Plug-in era vs. native era",
      summary: "A quick side-by-side of what used to be required to play media versus today.",
      code: `function App() {
  const eras = [
    { era: "Then (plug-in era)", detail: "Install Flash Player, QuickTime, or RealPlayer separately; hope the visitor's browser supports it" },
    { era: "Now (native era)", detail: "<video src=\\"clip.mp4\\" controls> — the browser decodes MP4/MP3 itself, no install needed" },
  ];

  return (
    <table style={{ borderCollapse: "collapse", width: "100%", maxWidth: 420 }}>
      <tbody>
        {eras.map((row) => (
          <tr key={row.era}>
            <td style={{ border: "1px solid #d1d5db", padding: 8, fontWeight: 600, whiteSpace: "nowrap" }}>
              {row.era}
            </td>
            <td style={{ border: "1px solid #d1d5db", padding: 8 }}>{row.detail}</td>
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
