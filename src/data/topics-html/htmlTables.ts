import type { Topic } from "../../types";

export const htmlTablesTopic: Topic = {
  id: "html-tables",
  title: "HTML Tables",
  category: "HTML Structure",
  shortExplanation: `A \`<table>\` lays out data in rows and columns using \`<tr>\` (row), \`<th>\` (header cell), and \`<td>\` (data cell).

- \`<thead>\` groups the header row(s); \`<tbody>\` groups the actual data rows
- \`<th>\` cells are typically bold and centered by default, marking them as column/row headers rather than data
- \`colspan\`/\`rowspan\` merge cells across columns or rows — written as \`colSpan\`/\`rowSpan\` (camelCase) in JSX
- Tables are for genuinely tabular data — not, historically, for page layout (that's CSS's job)`,
  longExplanation: `A table is one of HTML's oldest and most structured elements — a two-dimensional grid built from a small, fixed vocabulary of nested tags.

- \`<table>\` is the outer wrapper for the whole grid
- \`<tr>\` ("table row") wraps one horizontal row of cells
- \`<th>\` ("table header") marks a cell as a *header* for its column or row — browsers render it bold and centered by default, and it carries real semantic meaning (screen readers announce it differently than a data cell)
- \`<td>\` ("table data") is an ordinary data cell
- \`<thead>\` and \`<tbody>\` group rows into a header section and a body section. This is optional but good practice: it separates "the row that labels the columns" from "the rows that are the actual data," which matters for both semantics and styling
- **Merging cells**: the \`colspan\` attribute makes one cell span multiple columns; \`rowspan\` makes one cell span multiple rows. In plain HTML these are lowercase (\`colspan="2"\`); in JSX they become camelCase, \`colSpan={2}\` and \`rowSpan={2}\`, following the same reserved-word-style renaming pattern as \`class\` → \`className\`
- Tables were once misused for overall *page* layout (arranging a whole site's header/sidebar/content in table cells) before CSS layout tools matured. That's no longer good practice — a \`<table>\` today should hold data that's genuinely tabular (a schedule, a price list, a dataset), while page layout belongs to CSS

Every table tag here — \`table\`, \`tr\`, \`th\`, \`td\`, \`thead\`, \`tbody\` — is identical in JSX; only the two span attributes change casing.`,
  examples: [
    {
      id: "basic-table",
      title: "A basic table",
      summary: "The minimum structure: a table, a row, and cells.",
      code: `function App() {
  return (
    <table style={{ borderCollapse: "collapse" }}>
      <tbody>
        <tr>
          <th style={{ border: "1px solid #d1d5db", padding: 8 }}>Name</th>
          <th style={{ border: "1px solid #d1d5db", padding: 8 }}>Age</th>
        </tr>
        <tr>
          <td style={{ border: "1px solid #d1d5db", padding: 8 }}>Alice</td>
          <td style={{ border: "1px solid #d1d5db", padding: 8 }}>28</td>
        </tr>
        <tr>
          <td style={{ border: "1px solid #d1d5db", padding: 8 }}>Bilal</td>
          <td style={{ border: "1px solid #d1d5db", padding: 8 }}>34</td>
        </tr>
      </tbody>
    </table>
  );
}

render(<App />);`,
    },
    {
      id: "thead-tbody",
      title: "Separating thead from tbody",
      summary: "Grouping the header row apart from the data rows.",
      code: `function App() {
  return (
    <table style={{ borderCollapse: "collapse", width: "100%" }}>
      <thead>
        <tr style={{ background: "#f3f4f6" }}>
          <th style={{ border: "1px solid #d1d5db", padding: 8, textAlign: "left" }}>Product</th>
          <th style={{ border: "1px solid #d1d5db", padding: 8, textAlign: "left" }}>Price</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style={{ border: "1px solid #d1d5db", padding: 8 }}>Notebook</td>
          <td style={{ border: "1px solid #d1d5db", padding: 8 }}>$4</td>
        </tr>
        <tr>
          <td style={{ border: "1px solid #d1d5db", padding: 8 }}>Pen</td>
          <td style={{ border: "1px solid #d1d5db", padding: 8 }}>$1</td>
        </tr>
      </tbody>
    </table>
  );
}

render(<App />);`,
    },
    {
      id: "colspan-rowspan",
      title: "Merging cells with colSpan and rowSpan",
      summary: "In HTML these are colspan/rowspan; in JSX they're camelCase, colSpan/rowSpan.",
      code: `function App() {
  const cell = { border: "1px solid #d1d5db", padding: 8, textAlign: "center" };
  return (
    <table style={{ borderCollapse: "collapse" }}>
      <tbody>
        <tr>
          <th style={cell} colSpan={2}>
            Quarterly Report
          </th>
        </tr>
        <tr>
          <th style={cell} rowSpan={2}>
            Region
          </th>
          <th style={cell}>Q1</th>
        </tr>
        <tr>
          <td style={cell}>North</td>
        </tr>
      </tbody>
    </table>
  );
}

render(<App />);`,
    },
    {
      id: "table-from-data",
      title: "Building a table from an array with .map()",
      summary: "The common React pattern: turning a data array into table rows.",
      code: `function App() {
  const rows = [
    { id: 1, name: "Alice", role: "Engineer" },
    { id: 2, name: "Bilal", role: "Designer" },
    { id: 3, name: "Chen", role: "Product" },
  ];

  return (
    <table style={{ borderCollapse: "collapse" }}>
      <thead>
        <tr>
          <th style={{ border: "1px solid #d1d5db", padding: 8 }}>Name</th>
          <th style={{ border: "1px solid #d1d5db", padding: 8 }}>Role</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.id}>
            <td style={{ border: "1px solid #d1d5db", padding: 8 }}>{row.name}</td>
            <td style={{ border: "1px solid #d1d5db", padding: 8 }}>{row.role}</td>
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
