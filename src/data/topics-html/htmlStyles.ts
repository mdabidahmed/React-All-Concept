import type { Topic } from "../../types";

export const htmlStylesTopic: Topic = {
  id: "html-styles",
  title: "HTML Styles",
  category: "HTML Basics",
  shortExplanation: `The **inline \`style\` attribute** applies CSS directly to a single element — \`style="property:value;"\` in HTML, or a JavaScript object in JSX.

- Common properties: \`background-color\`, \`color\`, \`font-family\`, \`text-align\`
- In JSX, \`style\` takes an **object** with camelCase property names, e.g. \`style={{ backgroundColor: "tomato" }}\`
- Inline styling is one of *three* ways to add CSS to a page — the others are an internal \`<style>\` block and an external stylesheet, both covered in dedicated CSS topics later`,
  longExplanation: `CSS can be added to HTML in three different places, and this topic focuses on the most direct of the three: the inline \`style\` attribute.

- In plain HTML, \`style\` takes a string of \`property: value;\` pairs, separated by semicolons: \`<p style="color: blue; text-align: center;">\`. It applies only to that one specific element — nowhere else
- In JSX, \`style\` takes a **JavaScript object** instead of a string, since JSX doesn't parse embedded CSS text. Property names switch from CSS's hyphenated form to **camelCase** (\`background-color\` becomes \`backgroundColor\`, \`font-family\` becomes \`fontFamily\`), and values are usually strings, e.g. \`style={{ backgroundColor: "tomato", color: "white" }}\`
- A handful of properties come up constantly: \`background-color\` (the element's background), \`color\` (its text color), \`font-family\` (which typeface to use), and \`text-align\` (\`left\`, \`center\`, \`right\`, or \`justify\`)
- Inline styling is convenient for a one-off tweak, but it doesn't scale — repeating the same style object on ten elements means updating all ten if something changes. That's exactly what the other two methods of adding CSS solve: an **internal stylesheet** (a \`<style>\` block in the document, covered in a later topic) applies rules to many elements at once by selector, and an **external stylesheet** (a separate \`.css\` file linked into the page) does the same across an entire site. This topic sticks to the inline form; the others get their own dedicated coverage

Inline styles are the fastest way to see CSS properties in action, which is exactly why they're worth starting with — even though real projects typically lean on internal or external stylesheets for anything beyond a quick, isolated adjustment.`,
  examples: [
    {
      id: "inline-style-html-vs-jsx",
      title: "Inline style: HTML string vs. JSX object",
      summary: "The same visual result, written the HTML way and the JSX way.",
      code: `function App() {
  return (
    <div style={{ display: "grid", gap: 8 }}>
      <p>
        In plain HTML: <code>{'style="color: blue; text-align: center;"'}</code>
      </p>
      <p style={{ color: "blue", textAlign: "center" }}>
        In JSX, that becomes an object:{" "}
        <code>{'style={{ color: "blue", textAlign: "center" }}'}</code>
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "common-style-properties",
      title: "Four properties that come up constantly",
      summary: "background-color, color, font-family, and text-align applied to one element.",
      code: `function App() {
  return (
    <div
      style={{
        backgroundColor: "#0f172a",
        color: "#e2e8f0",
        fontFamily: "Georgia, serif",
        textAlign: "center",
        padding: 16,
        borderRadius: 8,
      }}
    >
      This paragraph-like box uses backgroundColor, color, fontFamily, and textAlign.
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "reusable-style-object",
      title: "Reusing a style object across elements",
      summary: "Defining the style once as a variable, instead of repeating it on every element.",
      code: `function App() {
  const cardStyle = {
    border: "1px solid #d1d5db",
    borderRadius: 8,
    padding: 12,
    fontFamily: "Arial, sans-serif",
  };

  return (
    <div style={{ display: "grid", gap: 8 }}>
      <div style={cardStyle}>Card one, using the shared style object.</div>
      <div style={cardStyle}>Card two, reusing the exact same object.</div>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "three-ways-to-add-css",
      title: "Inline styling is one of three approaches",
      summary: "A quick summary of where inline styling fits alongside internal and external stylesheets.",
      code: `function App() {
  return (
    <div style={{ display: "grid", gap: 10 }}>
      <div style={{ background: "#fef3c7", padding: 10, borderRadius: 6 }}>
        1. Inline — the style attribute on one element (this topic).
      </div>
      <div style={{ background: "#e0f2fe", padding: 10, borderRadius: 6 }}>
        2. Internal — a &lt;style&gt; block affecting many elements (covered later).
      </div>
      <div style={{ background: "#dcfce7", padding: 10, borderRadius: 6 }}>
        3. External — a linked .css file affecting an entire site (covered later).
      </div>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
