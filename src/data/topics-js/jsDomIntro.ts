import type { Topic } from "../../types";

export const jsDomIntroTopic: Topic = {
  id: "js-dom-intro",
  title: "JavaScript DOM Introduction",
  category: "DOM & Events",
  shortExplanation: `The **DOM** (Document Object Model) is the browser's live, in-memory tree representation of a web page — built *from* the HTML, but not the HTML itself. Once the browser builds it, JavaScript can read and change it, and the page updates instantly to match.

- \`document\` is the entry point — the single root object representing the whole page
- The DOM is a **tree**: elements nest inside other elements, forming parent, child, and sibling relationships
- Changing the DOM (not the original HTML file) is exactly what makes a page update without a reload`,
  longExplanation: `When a browser loads an HTML file, it doesn't just display the text on screen — it parses that markup and builds a completely separate, in-memory data structure called the **DOM**: the Document Object Model. The DOM is a live *tree* of objects, one object per element (plus text nodes, comment nodes, and a few other node types), that represents the current state of the page. Critically, the DOM is not the HTML source file — it's what that HTML was turned into after parsing — and JavaScript's entire relationship with "the page" happens through this tree, never through the original file on disk.

- The \`document\` object is the single entry point into this tree — every DOM operation starts from it. \`document\` represents the whole page, and its descendants (\`document.documentElement\` for \`<html>\`, \`document.body\` for \`<body>\`) branch out from there
- The DOM is structured as a genuine **tree**: an element can contain child elements, those children can have their own children, and elements that share the same direct parent are called *siblings*. A \`<ul>\` containing three \`<li>\` elements makes the \`<ul>\` the *parent*, each \`<li>\` a *child* of it, and the three \`<li>\` elements *siblings* of one another
- Because it's just a tree of objects, it can be walked programmatically like any tree: every node exposes properties like \`.parentElement\`, \`.children\`, \`.firstElementChild\`, \`.lastElementChild\`, and \`.nextElementSibling\` to move around it in code
- The DOM is **live** — the moment JavaScript changes a node (its text, an attribute, a style, or adds/removes a node entirely), the browser repaints the page to match. There's no separate "apply" step; the tree *is* what gets rendered on screen
- The DOM also distinguishes **node types**: element nodes (like a \`<p>\`), text nodes (the literal text sitting inside an element), comment nodes, and more. This is why a \`<div>\` with one word inside it technically has one child *node* (the text) even though it has zero child *elements* — a distinction that trips people up when \`.childNodes\` and \`.children\` report different lengths
- It's easy to hear about the **BOM** (Browser Object Model — \`window\`, \`navigator\`, \`location\`, and friends) in the same breath as the DOM. The DOM is specifically about the *page's content*; the BOM is about the *browser and its environment* surrounding that content. They're covered as a separate topic in this app, but both are ultimately reached through the same global \`window\` object

Because this app's runnable examples are React components rather than plain \`<script>\` tags, it's worth being explicit about how the two connect. React itself is built entirely on top of the exact same real DOM described above — there's only one DOM in a browser tab, and every framework eventually talks to it. When a React component renders, React calculates the minimal set of changes needed and applies them to this same tree using these same underlying browser mechanisms; it just does that automatically, instead of a developer manually calling \`document.createElement\` or \`.appendChild\`. The examples below use \`useRef\` to obtain a genuine reference to a real DOM node that React rendered onto the page, so operations like reading \`.children\` or \`.parentElement\` run against the actual browser tree — the exact same DOM a plain, non-React \`<script>\` tag would be inspecting, not a simulation of it.`,
  examples: [
    {
      id: "visualizing-the-tree",
      title: "Visualizing the DOM as a tree",
      summary: "A small nested structure, drawn to mirror how the browser actually organizes it internally.",
      code: `function Node({ label, children }) {
  return (
    <div style={{ display: "grid", gap: 6, justifyItems: "center" }}>
      <div
        style={{
          padding: "6px 14px",
          background: "#1d4ed8",
          color: "white",
          borderRadius: 6,
          fontSize: 13,
          fontFamily: "monospace",
        }}
      >
        {label}
      </div>
      {children ? (
        <div style={{ display: "flex", gap: 16, borderTop: "2px solid #cbd5e1", paddingTop: 10 }}>
          {children}
        </div>
      ) : null}
    </div>
  );
}

function App() {
  return (
    <div style={{ display: "grid", justifyItems: "center", gap: 4 }}>
      <Node label="document">
        <Node label="<html>">
          <Node label="<head>" />
          <Node label="<body>">
            <Node label="<h1>" />
            <Node label="<p>" />
          </Node>
        </Node>
      </Node>
      <p style={{ color: "#6b7280", fontSize: 13, marginTop: 8 }}>
        document is the root; html, head, and body are its descendants; h1 and p are siblings under body.
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "document-entry-point",
      title: "document as the real entry point",
      summary: "Reading a handful of genuine properties straight off the real document object.",
      code: `function App() {
  const [log, setLog] = useState([]);

  function print(value) {
    setLog((prev) => [...prev, String(value)]);
  }

  function inspectDocument() {
    setLog([]);
    print("document.title: " + document.title);
    print("document.documentElement.tagName: " + document.documentElement.tagName);
    print("document.body.tagName: " + document.body.tagName);
    print("document.readyState: " + document.readyState);
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={inspectDocument}>Inspect the real document object</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 90 }}>
        {log.length === 0 ? "// output appears here" : log.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "parent-child-sibling",
      title: "Parent, child, and sibling relationships, live",
      summary: "useRef grabs a real DOM node so its genuine .children, .parentElement, and sibling links can be inspected.",
      code: `function App() {
  const containerRef = useRef(null);
  const [log, setLog] = useState([]);

  function print(value) {
    setLog((prev) => [...prev, String(value)]);
  }

  function inspectFamily() {
    setLog([]);
    const container = containerRef.current;
    print("container has " + container.children.length + " child elements");
    const firstChild = container.firstElementChild;
    print("firstElementChild is: " + firstChild.textContent);
    print("its nextElementSibling is: " + firstChild.nextElementSibling.textContent);
    print("container.parentElement.tagName: " + container.parentElement.tagName);
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <div ref={containerRef} style={{ display: "flex", gap: 8 }}>
        <div style={{ padding: 8, background: "#f1f5f9", borderRadius: 6 }}>Alpha</div>
        <div style={{ padding: 8, background: "#f1f5f9", borderRadius: 6 }}>Beta</div>
        <div style={{ padding: 8, background: "#f1f5f9", borderRadius: 6 }}>Gamma</div>
      </div>
      <button onClick={inspectFamily}>Inspect real parent/child/sibling links</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 90 }}>
        {log.length === 0 ? "// output appears here" : log.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "nodes-vs-elements",
      title: "childNodes vs. children: text nodes are real nodes too",
      summary: "Whitespace and text between tags count as nodes, which is why childNodes and children often disagree.",
      code: `function App() {
  const boxRef = useRef(null);
  const [log, setLog] = useState([]);

  function print(value) {
    setLog((prev) => [...prev, String(value)]);
  }

  function compare() {
    setLog([]);
    const box = boxRef.current;
    print("children.length (elements only): " + box.children.length);
    print("childNodes.length (elements + text): " + box.childNodes.length);
    print("The extra entries in childNodes are text nodes, not elements.");
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <div ref={boxRef} style={{ padding: 8, border: "1px solid #d1d5db", borderRadius: 6 }}>
        Some text <strong>bold text</strong> more text <em>italic text</em>
      </div>
      <button onClick={compare}>Compare children vs. childNodes</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 80 }}>
        {log.length === 0 ? "// output appears here" : log.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
