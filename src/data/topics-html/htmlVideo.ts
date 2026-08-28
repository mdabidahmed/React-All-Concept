import type { Topic } from "../../types";

export const htmlVideoTopic: Topic = {
  id: "html-video",
  title: "HTML Video",
  category: "HTML Media",
  shortExplanation: `The \`<video>\` element embeds a playable video, no plug-in required.

- \`src\` points at the video file; \`controls\` shows the browser's native play/pause/volume UI
- \`autoPlay\`, \`loop\`, and \`muted\` change how playback starts and repeats
- Multiple \`<source>\` children let the browser pick whichever format it supports
- \`width\`/\`height\` size the player, same as an image`,
  longExplanation: `\`<video>\` is HTML's native element for embedding video, and in plain HTML its most basic form is just \`<video src="movie.mp4" controls></video>\`.

- **\`controls\`** is the attribute that makes the element actually usable by a person — it tells the browser to render its own play/pause button, seek bar, volume slider, and fullscreen toggle. Leave it off and you get a silent, static video surface with no way to interact with it
- **\`autoPlay\`** starts playback immediately once the video can play, without the visitor clicking anything. Most browsers only allow this if the video is also muted, since unsolicited sound is considered disruptive
- **\`loop\`** restarts the video from the beginning automatically when it reaches the end, useful for background-style clips
- **\`muted\`** starts the video with no sound; it's frequently paired with \`autoPlay\` for exactly the reason above
- **Multiple \`<source>\` elements**: instead of a single \`src\` on \`<video>\` itself, you can nest \`<source src="movie.mp4" type="video/mp4" />\` and \`<source src="movie.webm" type="video/webm" />\` inside \`<video>\`. The browser tries each \`<source>\` in order and plays the first format it supports, giving broader compatibility without extra JavaScript
- **\`width\`/\`height\`** size the player just like they do for \`<img>\`, reserving space in the layout before the video loads

In JSX, boolean attributes like \`controls\`, \`autoPlay\`, \`loop\`, and \`muted\` are written as plain props — \`<video controls autoPlay muted />\` — the same names, just camelCased where the HTML original has capitals (\`autoplay\` becomes \`autoPlay\`).`,
  examples: [
    {
      id: "basic-video-with-controls",
      title: "A basic video with controls",
      summary: "src plus controls is all it takes to get a fully working player.",
      code: `function App() {
  return (
    <video src="https://www.w3schools.com/html/mov_bbb.mp4" controls width={320} />
  );
}

render(<App />);`,
    },
    {
      id: "autoplay-loop-muted",
      title: "autoPlay, loop, and muted together",
      summary: "A toggleable background-style clip: starts itself, has no sound, and repeats forever.",
      code: `function App() {
  const [enabled, setEnabled] = useState(false);

  return (
    <div style={{ display: "grid", gap: 10, maxWidth: 340 }}>
      <button onClick={() => setEnabled((e) => !e)}>
        {enabled ? "Show plain video (no autoplay)" : "Show autoplay + loop + muted video"}
      </button>
      {enabled ? (
        <video
          src="https://www.w3schools.com/html/mov_bbb.mp4"
          autoPlay
          loop
          muted
          width={320}
        />
      ) : (
        <video src="https://www.w3schools.com/html/mov_bbb.mp4" controls width={320} />
      )}
      <small>
        Browsers generally only allow autoplay when the video is also muted — unsolicited sound
        is considered disruptive.
      </small>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "multiple-source-fallbacks",
      title: "Multiple <source> elements for format fallback",
      summary: "The browser tries each <source> in order and plays the first format it supports.",
      code: `function App() {
  return (
    <div style={{ display: "grid", gap: 8, maxWidth: 340 }}>
      <video controls width={320}>
        <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
        <source src="https://www.w3schools.com/html/mov_bbb.ogg" type="video/ogg" />
        Your browser does not support the video tag.
      </video>
      <small>
        If the first &lt;source&gt; format isn't supported, the browser silently moves on to the
        next one. The plain text inside &lt;video&gt; only shows if none of them work.
      </small>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "sized-video-players",
      title: "Sizing the player with width and height",
      summary: "Same width/height concept as an <img>, applied to a video element.",
      code: `function App() {
  const sizes = [
    { label: "Small", width: 160 },
    { label: "Medium", width: 240 },
    { label: "Large", width: 320 },
  ];

  return (
    <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
      {sizes.map((s) => (
        <div key={s.label}>
          <p style={{ fontSize: 12, color: "#6b7280", margin: "0 0 4px" }}>{s.label}</p>
          <video src="https://www.w3schools.com/html/mov_bbb.mp4" controls width={s.width} />
        </div>
      ))}
    </div>
  );
}

render(<App />);`,
    },
  ],
};
