import type { Topic } from "../../types";

export const htmlCharsetsTopic: Topic = {
  id: "html-charsets",
  title: "HTML Charsets",
  category: "HTML Scripting & Layout",
  shortExplanation: `\`<meta charset="UTF-8">\` in \`<head>\` tells the browser which **character encoding** to use when turning the raw bytes of a file back into text.

- Get it wrong (or omit it) and non-English letters, accents, and symbols can render as garbled ==mojibake== instead of the intended characters
- **UTF-8** covers virtually every character in every language, including emoji, and is the near-universal modern default
- The declaration should be one of the very first things inside \`<head>\`, since it must be read before the rest of the text is decoded`,
  longExplanation: `A text file, at the level a computer actually stores it, is just a sequence of bytes — it takes an agreed-upon **character encoding** to know which bytes correspond to which characters. \`<meta charset="UTF-8">\` is that agreement, stated explicitly so the browser doesn't have to guess.

- If a browser decodes a UTF-8-encoded file using the *wrong* assumed encoding, multi-byte characters (accented letters, symbols, non-Latin scripts, emoji) can come out as a string of unrelated-looking characters — a well-known failure mode nicknamed ==mojibake==
- **UTF-8** is the dominant encoding on the modern web because it can represent essentially every character in every writing system, plus symbols and emoji, while still encoding plain English text efficiently
- The charset declaration needs to appear early in \`<head>\`, ideally as the very first line inside it, because the browser needs to know the encoding *before* it can correctly decode the rest of the document's text, including the \`<title>\` that might follow it

This sandbox has no real bytes to decode and no way to actually mis-encode a string, so the example below simulates the *effect* directly: two hardcoded strings, one representing correctly-decoded text and one representing what a charset mismatch typically looks like, so the failure mode is visible without needing real encoding machinery.`,
  examples: [
    {
      id: "correct-vs-mojibake",
      title: "Correctly decoded text vs. mojibake",
      summary: "The same intended sentence, shown as it should look and as a charset mismatch commonly garbles it.",
      code: `function App() {
  const correct = "Caf\\u00e9 na\\u00efve r\\u00e9sum\\u00e9 \\u2014 \\u65e5\\u672c\\u8a9e";
  const mojibake = "Cafi\\u0301 nai\\u0308ve ri\\u0301sumi\\u0301 a\\u20ac\\u201d ae\\u0161e\\u203aacXe\\u0161e\\u017e";

  return (
    <div style={{ display: "grid", gap: 12 }}>
      <div>
        <p style={{ margin: "0 0 4px", color: "#15803d" }}>With &lt;meta charset="UTF-8"&gt; declared correctly:</p>
        <pre style={{ background: "#0f172a", color: "#e2e8f0", padding: 10, borderRadius: 6, fontSize: 13 }}>{correct}</pre>
      </div>
      <div>
        <p style={{ margin: "0 0 4px", color: "#b91c1c" }}>With a missing or mismatched charset:</p>
        <pre style={{ background: "#0f172a", color: "#e2e8f0", padding: 10, borderRadius: 6, fontSize: 13 }}>{mojibake}</pre>
      </div>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "toggle-charset-declaration",
      title: "Toggling the charset declaration",
      summary: "A button flips between the correctly rendered page and a simulated 'no charset declared' version.",
      code: `function App() {
  const [hasCharset, setHasCharset] = useState(true);
  const correct = "\\u00daltimo: Se\\u00f1or Garc\\u00eda ha llegado";
  const garbled = "a\\u0083\\u2039ltimo: Sea\\u0083ffor Garca\\u0083ada ha llegado";

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={() => setHasCharset((v) => !v)}>
        {hasCharset ? "Remove <meta charset>" : "Add <meta charset=\\"UTF-8\\">"}
      </button>
      <pre style={{ background: "#0f172a", color: "#e2e8f0", padding: 10, borderRadius: 6, fontSize: 13 }}>
        {hasCharset ? correct : garbled}
      </pre>
      <p style={{ color: hasCharset ? "#15803d" : "#b91c1c" }}>
        {hasCharset ? "Decoded correctly." : "Same underlying bytes, decoded with the wrong assumption."}
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "utf8-covers-everything",
      title: "UTF-8 handles every script and emoji alike",
      summary: "A single encoding correctly displaying English, accented text, non-Latin scripts, and emoji together.",
      code: `function App() {
  const samples = [
    "English: Hello, world!",
    "French: \\u00c9cole \\u00e9l\\u00e9mentaire",
    "Japanese: \\u3053\\u3093\\u306b\\u3061\\u306f",
    "Emoji: \\u{1F30D}\\u{1F680}",
  ];

  return (
    <ul style={{ margin: 0, paddingLeft: 18 }}>
      {samples.map((s) => (
        <li key={s}>{s}</li>
      ))}
    </ul>
  );
}

render(<App />);`,
    },
  ],
};
