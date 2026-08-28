import type { QuizQuestion } from "../../types/quiz";

export const htmlScriptingLayoutQuestions: QuizQuestion[] = [
  {
    id: "html-script-1",
    question:
      "Why is a <script> tag with no defer or async attribute often placed just before the closing </body> tag instead of in <head>?",
    type: "single",
    options: [
      "So the browser can parse and render the page content first, before pausing to download and run the blocking script",
      "Because scripts placed in <head> are silently ignored by most browsers",
      "Because <head> only allows a single <script> element per document",
      "So the script's variables automatically become accessible to the page's CSS",
    ],
    correctIndexes: [0],
    explanation:
      "A plain <script> blocks HTML parsing while it downloads and runs, so placing it at the end of <body> lets visible content appear before the script delays the page.",
  },
  {
    id: "html-script-2",
    question:
      "What does adding the defer attribute to a <script> tag placed in <head> achieve?",
    type: "single",
    options: [
      "The script downloads in the background without blocking parsing, then executes only after the HTML document has finished parsing",
      "The script runs immediately as soon as its download finishes, pausing HTML parsing at that moment",
      "The script downloads but is never executed unless a user interacts with the page",
      "The browser executes the script twice, once during parsing and once after",
    ],
    correctIndexes: [0],
    explanation:
      "defer lets the browser keep parsing the page while the script downloads in parallel, then runs the script after parsing completes, in the order the scripts appear.",
  },
  {
    id: "html-script-3",
    question:
      "Which statements are true about a relative file path used in HTML, such as <img src=\"images/logo.png\">?",
    type: "multi",
    options: [
      "It is resolved relative to the location of the current HTML document",
      "It will always resolve to the same file no matter where the site is hosted or moved",
      "It typically needs to be updated if the referencing HTML file moves to a different folder",
      "It always begins with https:// or http://",
    ],
    correctIndexes: [0, 2],
    explanation:
      "Relative paths are resolved against the current document's own location, so moving that document to a different folder can break the reference unless the path is adjusted.",
  },
  {
    id: "html-script-4",
    question:
      "What best describes an absolute path such as https://example.com/images/logo.png used as an <img> source?",
    type: "single",
    options: [
      "It fully specifies the resource's location, so it resolves the same way regardless of where the referencing document is located",
      "It only works when the HTML file and the image file are stored in the same folder",
      "It is interpreted differently by different browsers",
      "It cannot be used for images and is only valid for <a> links",
    ],
    correctIndexes: [0],
    explanation:
      "An absolute URL fully describes where a resource lives, independent of the referencing page's own location, unlike a relative path.",
  },
  {
    id: "html-script-5",
    question: "What is the primary purpose of the <head> section of an HTML document?",
    type: "single",
    options: [
      "To hold metadata about the document, such as its title and character encoding, that is not rendered as visible page content",
      "To hold the main visible content that users read on the page",
      "To define the navigation menu that always appears at the top of the visible page",
      "To store JavaScript variables so they persist between separate page loads",
    ],
    correctIndexes: [0],
    explanation:
      "<head> holds information about the document itself, such as <title>, <meta>, and <link>, none of which are rendered directly as part of the visible page.",
  },
  {
    id: "html-script-6",
    question: "Which of the following are metadata elements that belong inside <head>?",
    type: "multi",
    options: [
      "<title>",
      "<meta charset=\"UTF-8\">",
      "<footer>",
      "<link rel=\"stylesheet\" href=\"styles.css\">",
    ],
    correctIndexes: [0, 1, 3],
    explanation:
      "<title>, <meta>, and <link> describe or configure the document and belong in <head>; <footer> is visible layout content that belongs in <body>.",
  },
  {
    id: "html-script-7",
    question: "What does the <title> element control?",
    type: "single",
    options: [
      "The text shown in the browser tab and used as the default name in bookmarks and search results",
      "The largest visible heading displayed at the top of the rendered page body",
      "The filename of the CSS stylesheet linked to the page",
      "The text shown in the browser's address bar in place of the URL",
    ],
    correctIndexes: [0],
    explanation:
      "<title> sets the document's title, which browsers show in the tab and window title bar, and which search engines typically use as the clickable result text.",
  },
  {
    id: "html-script-8",
    question:
      "Which semantic element is the most appropriate choice for the single primary content area of a page, as opposed to repeated content like a sidebar or navigation?",
    type: "single",
    options: [
      "<main>",
      "<div>",
      "<section>",
      "<article>",
    ],
    correctIndexes: [0],
    explanation:
      "<main> is meant to wrap the dominant, page-unique content and should appear only once per page, distinguishing it from repeated regions like navigation or sidebars.",
  },
  {
    id: "html-script-9",
    question:
      "A page has a top banner with the site logo, a set of primary navigation links, and a sidebar of related links. Which pairing of semantic elements suits these three regions?",
    type: "multi",
    options: [
      "<header> for the top banner",
      "<nav> for the primary navigation links",
      "<aside> for the sidebar of related links",
      "<article> for the sidebar of related links",
    ],
    correctIndexes: [0, 1, 2],
    explanation:
      "<header> suits introductory banner content, <nav> groups primary navigation links, and <aside> is meant for content tangentially related to the main content, such as a sidebar.",
  },
  {
    id: "html-script-10",
    question: "Why does semantic HTML (using elements like <nav>, <main>, and <article>) matter compared to building the same layout entirely out of generic <div> elements?",
    type: "multi",
    options: [
      "Screen readers and other assistive technology can use semantic elements to let users jump directly to regions like navigation or main content",
      "Search engines can better understand the structure and relative importance of page content",
      "Semantic elements automatically apply a default visual style, so no CSS is required",
      "Semantic elements give browsers and tools meaningful structural landmarks that generic <div> elements do not provide",
    ],
    correctIndexes: [0, 1, 3],
    explanation:
      "Semantic elements communicate meaning to assistive technology, search engines, and other tooling, but they carry no special default styling beyond a <div>'s block-level behavior.",
  },
  {
    id: "html-script-11",
    question: "What distinguishes <section> from <article> as semantic elements?",
    type: "single",
    options: [
      "<article> is meant for a self-contained piece of content that could be distributed or reused independently, while <section> groups related content within a larger document",
      "<section> can only be used once per page, while <article> can be used any number of times",
      "<article> is a purely visual element with no semantic meaning, unlike <section>",
      "They are interchangeable aliases for the same element with no meaningful difference",
    ],
    correctIndexes: [0],
    explanation:
      "<article> marks content that stands on its own, such as a blog post or news story, whereas <section> groups a thematic chunk of content within a page without implying independence.",
  },
  {
    id: "html-script-12",
    question: "What is the role of the viewport meta tag, <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">?",
    type: "single",
    options: [
      "It tells the browser to size the page's layout viewport to the device's actual screen width instead of assuming a wide desktop-style default",
      "It forces the page to always render at exactly 1024 pixels wide on every device",
      "It disables all CSS media queries so the page renders identically on every screen",
      "It sets the default font size used throughout the document",
    ],
    correctIndexes: [0],
    explanation:
      "Without this tag, mobile browsers often assume a wide desktop viewport and shrink the page to fit, which defeats responsive CSS; the tag makes the layout viewport match the real device width.",
  },
  {
    id: "html-script-13",
    question: "Which of these are genuine building blocks of responsive web design?",
    type: "multi",
    options: [
      "The viewport meta tag, so the page scales to the device's screen width",
      "CSS media queries that adjust styles based on characteristics like screen width",
      "Relative sizing units, such as percentages, em, or rem, instead of only fixed pixel values",
      "Placing all layout inside a single fixed-width <table> element",
    ],
    correctIndexes: [0, 1, 2],
    explanation:
      "Responsive design typically combines the viewport meta tag, media queries, and flexible sizing units; a fixed-width table layout resists adapting to different screen sizes.",
  },
  {
    id: "html-script-14",
    question: "What is the difference between <code> and <pre> when displaying a snippet of source code?",
    type: "single",
    options: [
      "<code> marks text as computer code inline without preserving whitespace formatting, while <pre> preserves whitespace and line breaks exactly as written",
      "<pre> marks text as computer code inline, while <code> preserves whitespace and line breaks",
      "They are functionally identical and either can be used interchangeably for any purpose",
      "<code> can only be used inside <pre> and has no meaning on its own",
    ],
    correctIndexes: [0],
    explanation:
      "<code> is a semantic inline element for code text, while <pre> is the element that preserves the exact whitespace, indentation, and line breaks of its content.",
  },
  {
    id: "html-script-15",
    question: "Which elements are specifically intended for representing computer input/output text, such as a keyboard key or sample program output?",
    type: "multi",
    options: [
      "<kbd> for representing keyboard input",
      "<samp> for representing sample output from a program",
      "<pre> for representing keyboard input specifically",
      "<code> for representing a fragment of source code",
    ],
    correctIndexes: [0, 1, 3],
    explanation:
      "<kbd>, <samp>, and <code> are semantic elements for keyboard input, program output, and code respectively; <pre> only preserves whitespace and is not specific to keyboard input.",
  },
  {
    id: "html-script-16",
    question: "Why would you write &lt;div&gt; instead of <div> when you want the literal text <div> to appear on the rendered page?",
    type: "single",
    options: [
      "Because < and > are reserved characters that the browser would otherwise interpret as the start of an HTML tag",
      "Because <div> is a reserved word that cannot appear anywhere in an HTML file",
      "Because entities render faster than typing the characters directly",
      "Because lowercase tag names are not allowed inside text content",
    ],
    correctIndexes: [0],
    explanation:
      "The browser's HTML parser treats < and > as markup delimiters, so literal angle brackets in visible text must be escaped as entities like &lt; and &gt; to avoid being parsed as a tag.",
  },
  {
    id: "html-script-17",
    question: "What does the &nbsp; entity represent?",
    type: "single",
    options: [
      "A non-breaking space, which prevents a line break from occurring at that point and is not collapsed like a regular space",
      "A new paragraph break equivalent to pressing Enter twice",
      "The ampersand character itself, &",
      "A horizontal rule used to visually separate sections",
    ],
    correctIndexes: [0],
    explanation:
      "&nbsp; inserts a space that browsers will not collapse or break a line on, which is useful when you need guaranteed spacing that regular whitespace collapsing would otherwise remove.",
  },
  {
    id: "html-script-18",
    question: "What is the purpose of <meta charset=\"UTF-8\"> in an HTML document?",
    type: "single",
    options: [
      "It tells the browser which character encoding to use when interpreting the bytes of the document, so text and symbols display correctly",
      "It sets the default text color used throughout the page",
      "It specifies which spoken language screen readers should use to read the page aloud",
      "It compresses the HTML file to reduce its download size",
    ],
    correctIndexes: [0],
    explanation:
      "The charset declaration tells the browser how to decode the document's bytes into characters; without a matching declaration, special characters can render as garbled text (mojibake).",
  },
  {
    id: "html-script-19",
    question: "Why does a URL like a search query often turn a space into %20 or a plus sign, such as q=hello%20world?",
    type: "single",
    options: [
      "Because URLs can only contain a restricted set of characters, so spaces and other special characters must be percent-encoded to be transmitted safely",
      "Because %20 makes the page load faster than a literal space would",
      "Because search engines require percent-encoding to rank a page higher",
      "Because spaces are entirely forbidden in HTTP responses",
    ],
    correctIndexes: [0],
    explanation:
      "URLs are restricted to a safe subset of characters, so reserved or unsafe characters like spaces are percent-encoded (for example, a space becomes %20) to keep the URL valid and unambiguous.",
  },
  {
    id: "html-script-20",
    question: "Which statements accurately describe a difference between HTML and XHTML?",
    type: "multi",
    options: [
      "XHTML requires every element to be properly closed, including void elements like <br />, while HTML tolerates many unclosed tags",
      "XHTML requires attribute values to be quoted and tag names to be lowercase, rules that plain HTML parsers do not strictly enforce",
      "XHTML documents are parsed more forgivingly than HTML, silently correcting malformed markup",
      "HTML5 parsers are generally more lenient about malformed markup than an XHTML (XML-based) parser is",
    ],
    correctIndexes: [0, 1, 3],
    explanation:
      "XHTML follows strict XML syntax rules such as mandatory closing tags, lowercase names, and quoted attributes, and an XML parser will fail on violations, whereas HTML parsers are designed to recover from many such errors.",
  },
];
