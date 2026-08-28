import type { Topic } from "../../types";

export const htmlAttributesTopic: Topic = {
  id: "html-attributes",
  title: "HTML Attributes",
  category: "HTML Basics",
  shortExplanation: `**Attributes** add extra information to an HTML element, written inside its start tag as \`name="value"\`.

- \`href\` tells a link where to go; \`src\` tells an image or script where to load from
- \`alt\` provides alternate text for an image, shown if it fails to load and read aloud by screen readers
- Attribute values are conventionally wrapped in double quotes
- In this JSX-based sandbox, \`class\` becomes \`className\` and \`for\` becomes \`htmlFor\` — everything else works the same`,
  longExplanation: `Attributes live inside an element's start tag and configure that specific element — they never appear in the end tag, and most elements accept a specific set of attributes relevant to what that element does.

- \`<a href="https://example.com">\` — \`href\` is required for a link to actually navigate anywhere
- \`<img src="photo.jpg" alt="A description">\` — \`src\` points to the image file; \`alt\` is shown if the image fails to load, and is read aloud by screen readers, so it should describe the image's content or purpose
- \`<img width="500" height="300">\` — \`width\`/\`height\` reserve space for the image before it loads, preventing the page from jumping around as images finish loading
- Attribute values are almost always wrapped in quotes — double quotes are the near-universal convention, though single quotes work too as long as they're used consistently
- A handful of HTML attribute names are **reserved words in JavaScript**, so JSX renames them: \`class\` becomes \`className\`, and \`for\` (used on \`<label>\`) becomes \`htmlFor\`. Every other attribute — \`href\`, \`src\`, \`alt\`, \`id\`, \`title\`, \`style\` — is written exactly the same way in JSX as in plain HTML (though \`style\` takes an object in JSX instead of a CSS string, which the Styling topics cover)

Knowing which attribute goes with which purpose — \`href\` for navigation, \`src\` for loading a resource, \`alt\` for accessibility — is most of what's needed to use any HTML element correctly.`,
  examples: [
    {
      id: "href-and-title",
      title: "href and title attributes on a link",
      summary: "title adds a tooltip shown on hover, in addition to href making the link work.",
      code: `function App() {
  return (
    <a href="https://www.w3.org" title="The World Wide Web Consortium" target="_blank" rel="noreferrer">
      Hover over this link to see its title tooltip
    </a>
  );
}

render(<App />);`,
    },
    {
      id: "image-src-alt-dimensions",
      title: "src, alt, width, and height on an image",
      summary: "A complete, accessible image tag with all four common attributes.",
      code: `function App() {
  return (
    <div style={{ display: "grid", gap: 8 }}>
      <img
        src="https://picsum.photos/seed/attrs/240/120"
        alt="A randomly generated placeholder photo"
        width={240}
        height={120}
      />
      <small>
        If the image fails to load, the browser shows the alt text instead of a broken image icon.
      </small>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "class-becomes-classname",
      title: "class (HTML) vs. className (JSX)",
      summary: "The same styling attribute, named differently because \"class\" is a reserved word in JavaScript.",
      code: `function App() {
  return (
    <div>
      {/* In plain HTML you would write: <p class="highlight">...</p> */}
      <p className="highlight" style={{ background: "#fef3c7", padding: 8, borderRadius: 4 }}>
        This paragraph uses className, since "class" is reserved in JavaScript.
      </p>
      <label htmlFor="name-field">Name:</label>
      <input id="name-field" type="text" placeholder="for uses htmlFor in JSX" />
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "quoted-attribute-values",
      title: "Attribute values need quotes",
      summary: "Double-quoting attribute values is the standard, consistent convention.",
      code: `function App() {
  const imageId = "quotes-demo";
  return (
    <div style={{ display: "grid", gap: 8 }}>
      <img src={"https://picsum.photos/seed/" + imageId + "/160/90"} alt="Demo of a dynamic attribute value" />
      <p>
        Static values: <code>{'href="https://example.com"'}</code>
      </p>
      <p>
        Dynamic values in JSX use curly braces instead of quotes: <code>{"src={imageUrl}"}</code>
      </p>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
