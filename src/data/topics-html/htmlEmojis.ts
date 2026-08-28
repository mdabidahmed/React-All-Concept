import type { Topic } from "../../types";

export const htmlEmojisTopic: Topic = {
  id: "html-emojis",
  title: "HTML Emojis",
  category: "HTML Scripting & Layout",
  shortExplanation: `Emojis are ordinary **Unicode characters** — they can be typed or pasted directly into HTML text content, exactly like any letter or punctuation mark.

- No special tag or attribute is needed to display an emoji; it's plain text
- A browser renders each emoji using a font supplied by the operating system, not by the page itself
- Because they're just characters, an emoji can appear anywhere regular text can — headings, buttons, list items
- Two devices can render the identical character with a visually different emoji design, since the artwork comes from the OS, not from HTML`,
  longExplanation: `Modern Unicode assigns a code point to each emoji, the same way it assigns one to the letter "A" or the digit "7". That means an emoji is not a special HTML feature at all — it's just another character that happens to render as a small picture instead of a glyph.

- Typing or pasting an emoji directly into an element's text content, like \`<p>Great job!</p>\` with a checkmark character inside it, works with no markup of any kind — the browser displays it the same way it displays any other text character
- The browser doesn't draw the emoji itself; it asks the operating system for a font that has artwork for that Unicode code point, which is why the exact same character can look slightly different across different platforms
- Because emojis are just \`Unicode\` characters, they also have a numeric code point, and can be produced from that code point in JavaScript using \`String.fromCodePoint(...)\`, the same underlying mechanism a font uses to look up which picture to draw

These examples render as ordinary JSX text, no simulation required — the code and output below reference specific emoji characters factually, as the literal subject of the topic.`,
  examples: [
    {
      id: "emoji-in-plain-text",
      title: "Emoji typed directly into text",
      summary: "Three status labels, each combining a word with a literal emoji character, no special tag involved.",
      code: `function App() {
  const statuses = [
    { label: "Completed", symbol: "\\u2705" },
    { label: "In progress", symbol: "\\u23F3" },
    { label: "Failed", symbol: "\\u274C" },
  ];

  return (
    <ul style={{ margin: 0, paddingLeft: 18 }}>
      {statuses.map((s) => (
        <li key={s.label}>
          {s.symbol} {s.label}
        </li>
      ))}
    </ul>
  );
}

render(<App />);`,
    },
    {
      id: "emoji-as-button-icons",
      title: "Emoji used as interactive icons",
      summary: "Buttons that use an emoji character in place of an icon image or icon font.",
      code: `function App() {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  return (
    <div style={{ display: "flex", gap: 12 }}>
      <button onClick={() => setLiked((v) => !v)}>
        {liked ? "\\u2764\\uFE0F" : "\\u{1F90D}"} {liked ? "Liked" : "Like"}
      </button>
      <button onClick={() => setSaved((v) => !v)}>
        {saved ? "\\u{1F516}" : "\\u{1F3F7}\\uFE0F"} {saved ? "Saved" : "Save"}
      </button>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "emoji-are-unicode-code-points",
      title: "Emoji are just Unicode code points",
      summary: "String.fromCodePoint builds the identical character a font would draw for that code point.",
      code: `function App() {
  const codePoint = 0x1f600; // the "grinning face" code point
  const emojiChar = String.fromCodePoint(codePoint);

  return (
    <div style={{ display: "grid", gap: 6 }}>
      <p>
        Code point: <code>0x1F600</code>
      </p>
      <p>
        Built with <code>String.fromCodePoint(0x1F600)</code>: <span style={{ fontSize: 24 }}>{emojiChar}</span>
      </p>
      <p style={{ color: "#6b7280" }}>
        Typing that same character directly into an editor produces the identical result — a code point is a
        code point, regardless of how it got onto the page.
      </p>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
