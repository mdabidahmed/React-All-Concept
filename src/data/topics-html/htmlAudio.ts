import type { Topic } from "../../types";

export const htmlAudioTopic: Topic = {
  id: "html-audio",
  title: "HTML Audio",
  category: "HTML Media",
  shortExplanation: `The \`<audio>\` element embeds a playable sound file — same idea as \`<video>\`, minus the picture.

- \`src\` points at the audio file; \`controls\` shows a native play/pause/volume bar
- \`autoPlay\`, \`loop\`, and \`muted\` work exactly like they do on \`<video>\`
- No \`width\`/\`height\` needed — audio has no visual dimensions to reserve
- Common uses: background music, short sound effects, embedded podcast episodes`,
  longExplanation: `\`<audio>\` is \`<video>\`'s sibling element for sound-only media, and it shares almost the exact same attribute set — the difference is purely that there's no picture to display.

- \`<audio src="clip.mp3" controls></audio>\` is the minimal working form — \`controls\` shows the browser's built-in bar with play/pause, a seek/progress indicator, and volume
- **\`autoPlay\`**, **\`loop\`**, and **\`muted\`** behave identically to \`<video>\`: autoplay is generally only permitted alongside \`muted\`, and \`loop\` restarts the clip once it finishes
- Unlike \`<video>\`, there's **no \`width\`/\`height\`** to set — audio has no visual frame, so the native controls bar just takes up whatever horizontal space its container allows
- \`<audio>\` also supports nested \`<source>\` elements the same way \`<video>\` does, letting the browser pick between formats like MP3 and OGG
- Typical real-world uses: **background music** on a page, short **UI sound effects** (a notification ping, a success chime), and embedding a single **podcast episode** player directly on a page without linking out to a separate platform

Because there's no picture involved, \`<audio>\` is the simpler of the two media elements — the same mental model as \`<video>\`, with one less dimension to think about.`,
  examples: [
    {
      id: "basic-audio-with-controls",
      title: "A basic audio player with controls",
      summary: "src plus controls gives a full play/pause/volume/seek bar with no custom UI code.",
      code: `function App() {
  return <audio src="https://www.w3schools.com/html/horse.mp3" controls />;
}

render(<App />);`,
    },
    {
      id: "loop-and-muted-toggle",
      title: "Toggling loop and muted",
      summary: "Checkboxes control whether the same audio element loops and/or plays silently.",
      code: `function App() {
  const [loop, setLoop] = useState(false);
  const [muted, setMuted] = useState(false);

  return (
    <div style={{ display: "grid", gap: 10, maxWidth: 300 }}>
      <label style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <input type="checkbox" checked={loop} onChange={(e) => setLoop(e.target.checked)} />
        loop
      </label>
      <label style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <input type="checkbox" checked={muted} onChange={(e) => setMuted(e.target.checked)} />
        muted
      </label>
      <audio src="https://www.w3schools.com/html/horse.mp3" controls loop={loop} muted={muted} />
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "audio-source-fallbacks",
      title: "Format fallback with nested <source>",
      summary: "Just like <video>, <audio> can list multiple formats and let the browser choose.",
      code: `function App() {
  return (
    <audio controls>
      <source src="https://www.w3schools.com/html/horse.mp3" type="audio/mpeg" />
      <source src="https://www.w3schools.com/html/horse.ogg" type="audio/ogg" />
      Your browser does not support the audio element.
    </audio>
  );
}

render(<App />);`,
    },
    {
      id: "use-case-podcast-list",
      title: "A small list of embedded podcast episodes",
      summary: "Several <audio> players, one per episode, using the same element that plays sound effects or music.",
      code: `function App() {
  const episodes = [
    { title: "Episode 1: Getting Started" },
    { title: "Episode 2: Going Deeper" },
  ];

  return (
    <div style={{ display: "grid", gap: 14, maxWidth: 340 }}>
      {episodes.map((ep) => (
        <div key={ep.title}>
          <p style={{ margin: "0 0 6px", fontWeight: 600 }}>{ep.title}</p>
          <audio src="https://www.w3schools.com/html/horse.mp3" controls />
        </div>
      ))}
    </div>
  );
}

render(<App />);`,
    },
  ],
};
