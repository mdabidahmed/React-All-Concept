import type { Topic } from "../../types";

export const htmlQuotationsTopic: Topic = {
  id: "html-quotations",
  title: "HTML Quotations",
  category: "HTML Basics",
  shortExplanation: `HTML has dedicated tags for quoting, citing, and contact information, rather than relying on plain text.

- \`<blockquote cite="...">\` for a long, block-level quotation — browsers usually indent it
- \`<q>\` for a short, inline quotation — browsers usually add quotation marks automatically
- \`<abbr title="...">\` marks an abbreviation and shows a tooltip with its full meaning
- \`<address>\` for contact information; \`<cite>\` for the title of a referenced creative work`,
  longExplanation: `A handful of semantic tags exist specifically for quoting sources, defining abbreviations, and marking contact information — using them instead of plain \`<p>\` or \`<span>\` text gives that meaning to browsers, search engines, and assistive technology.

- \`<blockquote>\` marks a long quotation that stands on its own as a block. Browsers typically render it with indentation on both sides by default. Its optional \`cite\` attribute holds a URL pointing to the quotation's source — it isn't displayed on the page, but it's there for tooling and documentation
- \`<q>\` marks a short quotation that sits *inline*, in the middle of a sentence. Browsers automatically wrap it in quotation marks, so you don't type the quote marks yourself
- \`<abbr title="...">\` marks up an abbreviation or acronym. The \`title\` attribute holds the full expansion, which most browsers show as a tooltip when the abbreviation is hovered — useful for terms like "HTML" or "CSS" that not every reader will immediately recognize
- \`<address>\` marks up contact information for the author or owner of a page or article — a physical address, email, or phone number. Browsers commonly render its content in italics by default
- \`<cite>\` marks the **title** of a referenced creative work — a book, an article, a movie — not the person who said the quote. Browsers commonly render it in italics

These tags cost nothing extra to use over generic \`<p>\`/\`<span>\` markup, and each one gives the browser (and anyone using assistive technology) a clearer picture of what that piece of content actually is.`,
  examples: [
    {
      id: "blockquote-with-cite",
      title: "blockquote with a cite attribute",
      summary: "A long, block-level quotation, indented by the browser, with its source URL in the cite attribute.",
      code: `function App() {
  return (
    <blockquote cite="https://www.w3.org/">
      <p>
        The World Wide Web (WWW) is a repository of information linked together from points all
        over the world.
      </p>
    </blockquote>
  );
}

render(<App />);`,
    },
    {
      id: "inline-q",
      title: "q for a short inline quotation",
      summary: "The browser automatically wraps the quoted text in quotation marks.",
      code: `function App() {
  return (
    <p>
      As the saying goes, <q>don't judge a book by its cover</q>, and that applies to code too.
    </p>
  );
}

render(<App />);`,
    },
    {
      id: "abbr-with-tooltip",
      title: "abbr with a title tooltip",
      summary: "Hover over the abbreviation to see the full expansion, provided by the title attribute.",
      code: `function App() {
  return (
    <p>
      <abbr title="HyperText Markup Language">HTML</abbr> and{" "}
      <abbr title="Cascading Style Sheets">CSS</abbr> are the foundation of the web.
    </p>
  );
}

render(<App />);`,
    },
    {
      id: "address-and-cite",
      title: "address for contact info, cite for a work's title",
      summary: "address marks contact details; cite marks the title of a referenced creative work.",
      code: `function App() {
  return (
    <div style={{ display: "grid", gap: 8 }}>
      <p>
        This quote is from <cite>The Innovator's Dilemma</cite>, discussed on this site.
      </p>
      <address>
        Written by Jane Doe.
        <br />
        Visit us at 123 Web Street, Internet City.
        <br />
        Email: jane@example.com
      </address>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
