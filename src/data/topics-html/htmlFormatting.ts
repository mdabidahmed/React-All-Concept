import type { Topic } from "../../types";

export const htmlFormattingTopic: Topic = {
  id: "html-formatting",
  title: "HTML Formatting",
  category: "HTML Basics",
  shortExplanation: `HTML has several tags that visually format text, and a matching **semantic** tag for most of them that carries extra meaning, not just appearance.

- \`<b>\` = bold with no added importance; \`<strong>\` = bold *and* semantically important
- \`<i>\` = italic with no added emphasis; \`<em>\` = italic *and* semantically emphasized
- \`<small>\` (fine print), \`<mark>\` (highlighted), \`<del>\` (deleted/strikethrough), \`<ins>\` (inserted/underlined)
- \`<sub>\` (subscript) and \`<sup>\` (superscript) shift text below or above the normal line`,
  longExplanation: `Several HTML tags produce a visual effect that looks identical to another tag, but carries different *meaning* underneath — and that meaning matters to screen readers and search engines even when the pixels on screen look the same.

- \`<b>\` makes text bold purely for visual reasons — a product name, a keyword, nothing implied beyond appearance. \`<strong>\` also renders bold by default, but tells browsers, screen readers, and search engines that this text has genuine **importance**, like a warning
- \`<i>\` sets text in italics purely for visual reasons — a foreign phrase, a title, a stylistic choice. \`<em>\` also renders italic by default, but signals actual **emphasis** — the kind of stress you'd give a word if you were saying the sentence aloud
- \`<small>\` renders text in a smaller font, traditionally used for fine print or side comments
- \`<mark>\` highlights text with a yellow background by default, drawing the reader's eye to it — useful for showing search results or a relevant passage
- \`<del>\` renders text with a strikethrough, marking it as **deleted** or no longer accurate. \`<ins>\` renders text underlined, marking it as newly **inserted**. The two are often used together to show a tracked change: the old value struck through, the new value underlined right after it
- \`<sub>\` drops text slightly below the baseline (subscript) — used for things like chemical formulas (H₂O). \`<sup>\` raises text slightly above the baseline (superscript) — used for footnote markers or exponents (x²)

Choosing \`<strong>\` over \`<b>\`, or \`<em>\` over \`<i>\`, costs nothing visually but adds real meaning — it's a small habit that makes a page more accessible to screen reader users and clearer to search engines, for free.`,
  examples: [
    {
      id: "b-vs-strong",
      title: "b vs. strong",
      summary: "Both look bold by default, but strong signals genuine importance to assistive technology.",
      code: `function App() {
  return (
    <div style={{ display: "grid", gap: 8 }}>
      <p>
        This product is <b>brand new</b> this season — bold purely for style.
      </p>
      <p>
        <strong>Warning:</strong> disconnect power before opening the case — bold *and* important.
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "i-vs-em",
      title: "i vs. em",
      summary: "Both look italic by default, but em signals real emphasis rather than just a stylistic choice.",
      code: `function App() {
  return (
    <div style={{ display: "grid", gap: 8 }}>
      <p>
        The phrase <i>carpe diem</i> is Latin — italic purely for style, no emphasis implied.
      </p>
      <p>
        I said I would finish it <em>today</em>, not tomorrow — italic *and* emphasized.
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "small-mark-del-ins",
      title: "small, mark, del, and ins",
      summary: "Fine print, highlighted text, deleted text, and inserted text, side by side.",
      code: `function App() {
  return (
    <div style={{ display: "grid", gap: 8 }}>
      <p>
        Full price today. <small>Terms and conditions apply.</small>
      </p>
      <p>
        Search results often use <mark>highlighted</mark> text like this.
      </p>
      <p>
        The event starts at <del>6:00 PM</del> <ins>7:00 PM</ins>.
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "sub-and-sup",
      title: "sub and sup",
      summary: "Subscript for chemical formulas, superscript for exponents and footnote markers.",
      code: `function App() {
  return (
    <div style={{ display: "grid", gap: 8 }}>
      <p>
        Water is written H<sub>2</sub>O, with the 2 as a subscript.
      </p>
      <p>
        Energy: E = mc<sup>2</sup>, with the 2 as a superscript.
      </p>
      <p>
        This claim needs a source.<sup>1</sup>
      </p>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
