import type { Topic } from "../../types";

export const htmlUrlEncodeTopic: Topic = {
  id: "html-url-encode",
  title: "HTML URL Encode",
  category: "HTML Scripting & Layout",
  shortExplanation: `URLs can only safely contain a limited set of **ASCII** characters — anything else needs to be **percent-encoded** so it isn't misread as part of the URL's own syntax.

- A space becomes \`%20\` (or \`+\` inside a query string)
- \`&\` becomes \`%26\` — necessary because \`&\` already separates query parameters
- Non-English characters get encoded into a percent-escaped sequence of bytes
- JavaScript's built-in \`encodeURIComponent()\` performs this encoding for real, and is available directly in this sandbox`,
  longExplanation: `A URL's syntax relies on a small set of characters having special meaning — \`?\` starts the query string, \`&\` separates one parameter from the next, \`#\` starts a fragment. If a value being placed *into* a URL happens to contain one of those characters, or a character outside the safe ASCII range, it has to be **percent-encoded** first so it's treated as data rather than as URL syntax.

- A literal space becomes \`%20\` in most parts of a URL (historically, \`+\` was used instead inside a query string specifically — both are still seen today)
- \`&\` becomes \`%26\`; without encoding it, a value like \`"Salt & Pepper"\` inside a query parameter would look like the start of an entirely new parameter
- Characters outside the basic ASCII range — accented letters, non-Latin scripts, emoji — get converted into a percent-escaped sequence representing their UTF-8 bytes, which is why an encoded URL containing non-English text can look considerably longer than the original text
- \`encodeURIComponent()\` is a real, built-in JavaScript function that performs exactly this encoding, meant for encoding a single value (like one query parameter) rather than an entire URL. Its close relative, \`encodeURI()\`, is meant for encoding a whole URL and deliberately leaves characters like \`/\`, \`?\`, and \`&\` alone, since those are expected to already be URL structure rather than data

Unlike most of this topic group, URL encoding needs no simulation at all — \`encodeURIComponent()\` and \`encodeURI()\` are real global functions available in any JavaScript environment, including this sandbox, so the examples below call them directly.`,
  examples: [
    {
      id: "live-encoding-as-you-type",
      title: "Live encoding as you type",
      summary: "Typing into the input calls the real encodeURIComponent() on every keystroke.",
      code: `function App() {
  const [text, setText] = useState("Salt & Pepper: 50% off!");

  return (
    <div style={{ display: "grid", gap: 8 }}>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{ width: "100%", padding: 6, boxSizing: "border-box" }}
      />
      <p>
        Encoded: <code>{encodeURIComponent(text)}</code>
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "encodeuri-vs-encodeuricomponent",
      title: "encodeURI vs. encodeURIComponent",
      summary: "The whole-URL version leaves URL structure characters like / and ? untouched; the component version escapes everything.",
      code: `function App() {
  const url = "https://example.com/search?q=coffee & cake";

  return (
    <div style={{ display: "grid", gap: 8 }}>
      <p>Original: <code>{url}</code></p>
      <p>
        encodeURI(): <code>{encodeURI(url)}</code>
      </p>
      <p>
        encodeURIComponent(): <code>{encodeURIComponent(url)}</code>
      </p>
      <p style={{ color: "#6b7280" }}>
        encodeURIComponent escapes the slashes and colon too, which is why it's meant for a single value,
        not a full URL.
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "building-a-query-string",
      title: "Building a full query string from form fields",
      summary: "Two fields are combined into one URL, with each value safely encoded before being joined.",
      code: `function App() {
  const [query, setQuery] = useState("fresh bread & butter");
  const [city, setCity] = useState("São Paulo");

  const url =
    "https://example.com/search?q=" + encodeURIComponent(query) + "&city=" + encodeURIComponent(city);

  return (
    <div style={{ display: "grid", gap: 8, maxWidth: 360 }}>
      <label>
        Search query:{" "}
        <input value={query} onChange={(e) => setQuery(e.target.value)} style={{ width: 180 }} />
      </label>
      <label>
        City:{" "}
        <input value={city} onChange={(e) => setCity(e.target.value)} style={{ width: 180 }} />
      </label>
      <p style={{ wordBreak: "break-all" }}>
        Final URL: <code>{url}</code>
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "common-character-reference-table",
      title: "A table of commonly encoded characters",
      summary: "Each character's actual percent-encoded form, computed live with encodeURIComponent rather than hardcoded.",
      code: `function App() {
  const characters = [" ", "&", "?", "#", "%", "é", "中"];

  return (
    <table style={{ borderCollapse: "collapse", fontSize: 13 }}>
      <thead>
        <tr>
          <th style={{ textAlign: "left", borderBottom: "1px solid #d1d5db", padding: 6 }}>Character</th>
          <th style={{ textAlign: "left", borderBottom: "1px solid #d1d5db", padding: 6 }}>Encoded</th>
        </tr>
      </thead>
      <tbody>
        {characters.map((c) => (
          <tr key={c}>
            <td style={{ padding: 6, borderBottom: "1px solid #f3f4f6", fontFamily: "monospace" }}>
              {c === " " ? "(space)" : c}
            </td>
            <td style={{ padding: 6, borderBottom: "1px solid #f3f4f6", fontFamily: "monospace" }}>
              {encodeURIComponent(c)}
            </td>
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
