import type { Topic } from "../../types";

export const htmlSymbolsTopic: Topic = {
  id: "html-symbols",
  title: "HTML Symbols",
  category: "HTML Scripting & Layout",
  shortExplanation: `Beyond the reserved characters, HTML defines **character references** for symbols that don't exist on a standard keyboard.

- \`&copy;\` (copyright), \`&trade;\` (trademark), \`&reg;\` (registered)
- Currency: \`&euro;\`, \`&pound;\`, \`&yen;\`, \`&cent;\`
- Math and arrows: \`&times;\`, \`&divide;\`, \`&larr;\`, \`&rarr;\`
- Every named reference also has an equivalent numeric form, like \`&#169;\` for \`&copy;\``,
  longExplanation: `The entities covered in the previous topic exist to escape characters HTML treats as *syntax*. Symbols are a broader, related idea: characters that aren't reserved, but also aren't on a typical keyboard, so a named or numeric reference is the most reliable way to type them.

- **Legal and business symbols**: \`&copy;\` (&copy;), \`&trade;\` (&trade;), \`&reg;\` (&reg;)
- **Currency symbols**: \`&euro;\` (&euro;), \`&pound;\` (&pound;), \`&yen;\` (&yen;), \`&cent;\` (&cent;) — useful for currencies with no equivalent key on most keyboards
- **Arrows**: \`&larr;\` (&larr;), \`&rarr;\` (&rarr;), \`&uarr;\` (&uarr;), \`&darr;\` (&darr;)
- **Math symbols**: \`&times;\` (&times;) for multiplication, \`&divide;\` (&divide;) for division, \`&ne;\` (&ne;) for "not equal"

Every named reference has a numeric equivalent — \`&copy;\` and \`&#169;\` produce the identical character, since the name is just a memorable alias for a specific Unicode code point. Named references are easier to read in source code; numeric references work even for obscure symbols that don't have a widely supported name. This platform's sandbox supports named HTML character references directly inside JSX text (the same way \`&lt;\`/\`&gt;\` already work in the Entities topic), so these render as ordinary, real text with no simulation needed.`,
  examples: [
    {
      id: "legal-symbols",
      title: "Copyright, trademark, and registered",
      summary: "Three common legal symbols, all typed as named character references.",
      code: `function App() {
  return (
    <div style={{ display: "grid", gap: 6 }}>
      <p>&copy; 2026 Acme Corp. All rights reserved.</p>
      <p>Acme&trade; is a trademark of Acme Corp.</p>
      <p>Acme&reg; is a registered trademark.</p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "currency-symbols",
      title: "Currency symbols from around the world",
      summary: "Symbols without an obvious keyboard key, written as named references.",
      code: `function App() {
  const prices = [
    { label: "USD", value: "$25.00" },
    { label: "EUR", value: "&euro;23.10" },
    { label: "GBP", value: "&pound;19.80" },
    { label: "JPY", value: "&yen;3600" },
  ];

  return (
    <ul style={{ margin: 0, paddingLeft: 18 }}>
      {prices.map((p) => (
        <li key={p.label} dangerouslySetInnerHTML={{ __html: p.label + ": " + p.value }} />
      ))}
    </ul>
  );
}

render(<App />);`,
    },
    {
      id: "arrows-and-math",
      title: "Arrows and math symbols",
      summary: "Directional arrows and common math operators typed directly as character references.",
      code: `function App() {
  return (
    <div style={{ display: "grid", gap: 6 }}>
      <p>&larr; Back &nbsp;&nbsp; Next &rarr;</p>
      <p>6 &times; 7 = 42</p>
      <p>84 &divide; 2 = 42</p>
      <p>3 &ne; 4</p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "named-vs-numeric-reference",
      title: "Named vs. numeric references produce the same symbol",
      summary: "&copy; and &#169; are two ways of writing the identical character.",
      code: `function App() {
  return (
    <div style={{ display: "grid", gap: 6 }}>
      <p>
        Named: &copy; &nbsp;&nbsp; Numeric: &#169;
      </p>
      <p>
        Named: &hearts; &nbsp;&nbsp; Numeric: &#9829;
      </p>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
