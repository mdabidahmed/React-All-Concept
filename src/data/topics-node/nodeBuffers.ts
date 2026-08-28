import type { Topic } from "../../types";

export const nodeBuffersTopic: Topic = {
  id: "node-buffers",
  title: "Node.js Buffers",
  category: "Events & Streams",
  shortExplanation: `A **Buffer** is a fixed-size chunk of raw binary data — a list of numbers, each 0-255, representing individual bytes — used to hold data *before* it's decoded into a JS string (or after it's been encoded back down to bytes for sending out).

- \`Buffer.from("text", "utf-8")\` encodes a string into its raw byte representation
- \`buffer.toString("utf-8")\` decodes those bytes back into a readable JS string
- Buffers exist because file and network data arrives as raw bytes — text is just one *interpretation* of those bytes, not something files or sockets store directly`,
  longExplanation: `Underneath everything, a computer only ever stores and moves around bytes — plain numbers from 0 to 255. "Text" is a human convention layered on top: an encoding (almost always **UTF-8** in modern software) defines a mapping from sequences of bytes to characters. When Node reads a file or receives data over the network, what it actually gets is a pile of raw bytes; whether those bytes are supposed to *mean* text, an image, audio, or something else entirely is not something the bytes themselves carry — it depends on what you, the programmer, know about the source. A \`Buffer\` is Node's built-in representation of "raw bytes, not yet interpreted as anything."

- **\`Buffer.from(string, encoding)\`** takes a JS string and produces the raw bytes that string would occupy under the given encoding (almost always \`"utf-8"\`) — this is what happens, for instance, right before text is sent out over a network socket, since a socket only understands bytes, never JS string objects
- **\`buffer.toString(encoding)\`** does the reverse: given raw bytes and an encoding, it decodes them back into a JS string. This is exactly what \`fs.readFile(path, "utf-8", callback)\` does internally — without the \`"utf-8"\` argument, \`readFile\` hands back the raw \`Buffer\` instead, leaving the decoding step to you
- **Buffer length is a *byte* count, not a character count.** For plain ASCII text (English letters, digits, common punctuation) each character happens to take exactly one byte in UTF-8, so the two numbers match up and this distinction is easy to miss. But many characters take *more* than one byte: an accented letter like \`é\` takes 2 bytes, the euro sign \`€\` takes 3, and most emoji take 4. A string like \`"café"\` has \`.length === 4\` in JavaScript, but its UTF-8 byte representation is 5 bytes long — a real, common source of subtle bugs when code assumes "1 character = 1 byte" (for example, truncating a string to "the first 10 bytes" by slicing 10 *characters* can cut a multi-byte character in half, producing corrupted text)
- **Why not just always decode everything to a string immediately?** Because not everything *is* text. An uploaded image, a video file, a compressed archive — these are legitimately binary data, and calling \`.toString()\` on them doesn't produce anything meaningful; it just reinterprets arbitrary bytes as if they were UTF-8 text, which typically produces garbled, unusable output (and can even throw, for byte sequences that aren't valid UTF-8 at all). Buffers let Node's APIs stay agnostic about *what* the bytes mean, leaving the decoding decision to code that actually knows
- **A historical note**: today, Node's \`Buffer\` class is actually built on top of JavaScript's standard \`Uint8Array\` (a typed array of unsigned 8-bit integers) — \`Buffer\` predates \`Uint8Array\` in Node's history and originally worked differently, but the modern \`Buffer\` is essentially a \`Uint8Array\` with extra convenience methods (like \`.toString(encoding)\`) layered on top

Since a browser sandbox has no genuine \`Buffer\` class from Node's \`buffer\` module, the examples below use a small plain-JavaScript stand-in — an array of numbers representing byte-like values, clearly built and labeled as an illustration of the concept rather than a real \`Buffer\` instance. The *behavior* being demonstrated (encoding text to bytes, decoding bytes back to text, and byte-count vs. character-count mismatches) matches how the real \`Buffer\` class behaves in actual Node.js.`,
  examples: [
    {
      id: "simulated-buffer-from",
      title: "Buffer.from(): encoding text into bytes (simulated)",
      summary: "Each character becomes a numeric byte value — an illustrative stand-in for a real Buffer's contents.",
      code: `// An illustrative stand-in for Buffer.from(text, "utf-8") -- NOT the real Buffer class.
function fakeBufferFrom(text) {
  const bytes = [];
  for (let i = 0; i < text.length; i++) {
    bytes.push(text.charCodeAt(i)); // simplified: treats each JS char as one byte-like value
  }
  return bytes;
}

function App() {
  const [text, setText] = useState("Hi");
  const bytes = fakeBufferFrom(text);

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <label style={{ display: "grid", gap: 4 }}>
        Text to encode:
        <input value={text} onChange={(e) => setText(e.target.value)} style={{ padding: 6 }} />
      </label>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 60 }}>
        {"fakeBufferFrom(\\"" + text + "\\") -> [" + bytes.join(", ") + "]"}
      </pre>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        Real Node.js: Buffer.from("{text}", "utf-8") produces an actual Buffer of raw bytes, shown here as plain numbers.
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "simulated-buffer-tostring",
      title: "buffer.toString(): decoding bytes back into text (simulated)",
      summary: "Reversing the process — raw byte-like values decoded back into a readable string.",
      code: `// An illustrative stand-in for buffer.toString("utf-8") -- NOT the real Buffer class.
function fakeBufferToString(bytes) {
  let text = "";
  for (let i = 0; i < bytes.length; i++) {
    text += String.fromCharCode(bytes[i]);
  }
  return text;
}

function App() {
  const [output, setOutput] = useState("");
  const bytes = [72, 101, 108, 108, 111, 33]; // stands in for a Buffer received from a file or socket

  function decode() {
    setOutput(fakeBufferToString(bytes));
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6 }}>
        {"incoming bytes: [" + bytes.join(", ") + "]"}
      </pre>
      <button onClick={decode}>Decode with toString("utf-8")</button>
      <p>{output ? "Decoded text: " + output : "// click decode to see the text"}</p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "byte-length-vs-character-length",
      title: "Byte length vs. character length",
      summary: "A multi-byte character makes a string's byte count exceed its character count -- a real, common gotcha.",
      code: `// A simplified illustrative lookup of real UTF-8 byte costs for a few non-ASCII characters.
const byteCostPerChar = { "é": 2, "ñ": 2, "€": 3, "😀": 4 };

function utf8ByteLength(text) {
  let total = 0;
  for (const ch of text) {
    total += byteCostPerChar[ch] || 1; // plain ASCII characters cost exactly 1 byte in UTF-8
  }
  return total;
}

function App() {
  const samples = ["cafe", "café", "piñata", "10€", "😀 hi"];

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <table style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th style={{ textAlign: "left", borderBottom: "1px solid #374151", padding: 6 }}>String</th>
            <th style={{ textAlign: "left", borderBottom: "1px solid #374151", padding: 6 }}>.length (characters)</th>
            <th style={{ textAlign: "left", borderBottom: "1px solid #374151", padding: 6 }}>UTF-8 bytes</th>
          </tr>
        </thead>
        <tbody>
          {samples.map((s) => (
            <tr key={s}>
              <td style={{ padding: 6 }}>{s}</td>
              <td style={{ padding: 6 }}>{s.length}</td>
              <td style={{ padding: 6 }}>{utf8ByteLength(s)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        Whenever these two columns differ, code that assumes "1 character = 1 byte" (like slicing the "first N bytes"
        by character count) risks cutting a multi-byte character in half.
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "text-vs-binary-data",
      title: "Not everything should be decoded as text",
      summary: "Calling toString() on genuinely binary data (like an image) produces garbage -- Buffers stay neutral on purpose.",
      code: `function fakeBufferToString(bytes) {
  let text = "";
  for (let i = 0; i < bytes.length; i++) {
    text += String.fromCharCode(bytes[i]);
  }
  return text;
}

// Illustrative "incoming data" -- one is genuinely UTF-8 text, the other stands in for binary image data.
const textResponseBytes = [72, 101, 108, 108, 111]; // "Hello"
const imageResponseBytes = [137, 80, 78, 71, 13, 10, 26, 10]; // stands in for a PNG file's raw header bytes

function App() {
  const [decodedText, setDecodedText] = useState("");
  const [decodedImageAttempt, setDecodedImageAttempt] = useState("");

  return (
    <div style={{ display: "grid", gap: 12 }}>
      <div>
        <button onClick={() => setDecodedText(fakeBufferToString(textResponseBytes))}>
          Decode a text response as UTF-8
        </button>
        <p>{decodedText ? "Result: \\"" + decodedText + "\\" (correct -- it really was text)" : ""}</p>
      </div>
      <div>
        <button onClick={() => setDecodedImageAttempt(fakeBufferToString(imageResponseBytes))}>
          Decode an image response as UTF-8 (a mistake!)
        </button>
        <p>
          {decodedImageAttempt
            ? "Result: \\"" + decodedImageAttempt + "\\" (garbled -- this was never text to begin with)"
            : ""}
        </p>
      </div>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        A Buffer deliberately holds raw bytes without deciding what they mean -- your code has to know
        whether a "toString()" makes sense for the data it received.
      </p>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
