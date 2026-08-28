import type { QuizQuestion } from "../../types/quiz";

export const htmlBasicsQuestions: QuizQuestion[] = [
  {
    id: "html-basics-1",
    question: "What does HTML stand for?",
    type: "single",
    options: [
      "HyperText Markup Language",
      "Hyperlink and Text Markup Language",
      "HighText Machine Language",
      "HyperText Modern Layout",
    ],
    correctIndexes: [0],
    explanation:
      "HTML stands for HyperText Markup Language; it is the standard markup language used to structure content for the web.",
  },
  {
    id: "html-basics-2",
    question: "What is an HTML element made up of?",
    type: "single",
    options: [
      "A start tag, content, and an end tag (or a single tag for empty elements)",
      "Only a pair of angle brackets with no other structure",
      "A start tag and an end tag that must always be different names",
      "A tag name followed by a semicolon-separated list of content",
    ],
    correctIndexes: [0],
    explanation:
      "Most HTML elements consist of a start tag, the element's content, and a matching end tag; empty elements like <br> use only a single tag.",
  },
  {
    id: "html-basics-3",
    question: "Which of these are examples of empty (self-closing) HTML elements that have no closing tag and no content?",
    type: "multi",
    options: ["<br>", "<img>", "<p>", "<hr>"],
    correctIndexes: [0, 1, 3],
    explanation:
      "<br>, <img>, and <hr> are empty elements with no content and no separate closing tag, while <p> is a container element that wraps text content and requires a closing </p> tag.",
  },
  {
    id: "html-basics-4",
    question: "Which of the following are true about creating and viewing a simple HTML page?",
    type: "multi",
    options: [
      "A plain text editor is sufficient to write the markup",
      "The file must be saved with an .html (or .htm) extension for a browser to render it as a webpage",
      "A build tool or compiler must transpile the file before a browser can open it",
      "A running web server is required merely to view the file locally",
    ],
    correctIndexes: [0, 1],
    explanation:
      "HTML is plain text that any text editor can produce, and saving it with an .html extension lets a browser recognize and render it directly, with no compilation step or web server needed for local viewing.",
  },
  {
    id: "html-basics-5",
    question: "Why do browsers typically render <h1> text larger and bolder than <h6> text by default?",
    type: "single",
    options: [
      "Browsers apply default styling that reflects each heading level's importance in the document outline",
      "Heading tags have no inherent meaning and only differ because developers always add custom CSS to them",
      "The numbers 1 through 6 are just arbitrary labels with identical default browser styling",
      "<h1> is reserved exclusively for the page title element and cannot appear more than once by specification default styling",
    ],
    correctIndexes: [0],
    explanation:
      "Heading levels h1 through h6 carry semantic meaning about content hierarchy, and browsers apply decreasing default font sizes and weights to visually reflect that hierarchy.",
  },
  {
    id: "html-basics-6",
    question: "Which of the following are genuine downsides of skipping heading levels (for example, going from an <h1> straight to an <h3>) purely to get a smaller default font size?",
    type: "multi",
    options: [
      "It breaks the logical document outline that screen readers rely on for navigation",
      "It can confuse tools such as search engines that parse heading structure to understand content hierarchy",
      "The browser will refuse to render the skipped heading level at all",
      "HTML validators will throw a fatal parsing error whenever a heading level is skipped",
    ],
    correctIndexes: [0, 1],
    explanation:
      "Headings communicate a document's outline; skipping levels purely for visual reasons can disorient screen reader users navigating by heading and confuse tools that rely on heading structure, so font size should be controlled with CSS instead.",
  },
  {
    id: "html-basics-7",
    question: "In the browser's rendered output, how many spaces will the following paragraph text display between the words \"Hello\" and \"World\": <p>Hello     World</p>?",
    type: "single",
    options: [
      "One space",
      "Five spaces, exactly as typed",
      "Zero spaces; the words will run together",
      "The browser will throw a rendering error",
    ],
    correctIndexes: [0],
    explanation:
      "HTML collapses any sequence of whitespace (multiple spaces, tabs, or line breaks) in the source into a single space when rendering, regardless of how many whitespace characters were typed.",
  },
  {
    id: "html-basics-8",
    question: "What does line 2 do differently from line 1 in the following two paragraphs written across multiple source lines?\nLine 1: <p>Hello\nWorld</p>\nLine 2: <p>Hello<br>World</p>",
    type: "single",
    options: [
      "Line 2 forces a visible line break between the words, while line 1 renders them on one line separated by a single space",
      "Both lines render identically because line breaks in the source are always preserved",
      "Line 1 causes a syntax error because tags cannot span multiple lines",
      "Line 2 removes all spacing between the words entirely",
    ],
    correctIndexes: [0],
    explanation:
      "A raw newline in the HTML source is just collapsed whitespace and renders as a single space, but the <br> tag explicitly forces a line break regardless of surrounding whitespace handling.",
  },
  {
    id: "html-basics-9",
    question: "What does the inline style attribute, such as <p style=\"color:red;\">, allow you to do?",
    type: "single",
    options: [
      "Apply CSS styling directly to a single HTML element",
      "Define a reusable CSS class that other elements can also reference",
      "Load an external stylesheet file for the whole page",
      "Attach a JavaScript event handler to the element",
    ],
    correctIndexes: [0],
    explanation:
      "The style attribute lets you apply CSS declarations directly to one specific element, though for styling many elements consistently, internal or external stylesheets are more maintainable.",
  },
  {
    id: "html-basics-10",
    question: "Which style attribute value would set an element's background color, text color, and font size all at once?",
    type: "single",
    options: [
      "style=\"background-color:yellow; color:blue; font-size:20px;\"",
      "style=\"background:yellow, color:blue, font:20px;\"",
      "style=\"bgcolor='yellow' color='blue' size='20'\"",
      "css=\"background-color:yellow; color:blue; font-size:20px;\"",
    ],
    correctIndexes: [0],
    explanation:
      "Inline styles go inside a style attribute as semicolon-separated CSS property:value declarations, so background-color, color, and font-size can all be set together in one style attribute.",
  },
  {
    id: "html-basics-11",
    question: "Is there a meaningful difference between <b>bold text</b> and <strong>important text</strong>?",
    type: "single",
    options: [
      "Yes; <strong> conveys semantic importance while <b> is purely a visual style with no added meaning",
      "No; they are functionally and semantically identical in every way, including for screen readers",
      "Yes; <b> is deprecated and no longer renders in modern browsers",
      "No difference exists, but <strong> is only valid inside a <p> element",
    ],
    correctIndexes: [0],
    explanation:
      "Both typically render as bold text visually, but <strong> indicates that the content has strong semantic importance (which assistive technology can convey), while <b> is meant purely for stylistic bolding without implying extra importance.",
  },
  {
    id: "html-basics-12",
    question: "Which of the following text formatting tags carry semantic meaning beyond pure visual styling?",
    type: "multi",
    options: ["<em>", "<i>", "<strong>", "<b>"],
    correctIndexes: [0, 2],
    explanation:
      "<em> signals emphasized stress on text and <strong> signals strong importance, both conveyed to assistive technology; <i> and <b> are the purely visual, non-semantic counterparts (italic and bold) with no implied meaning.",
  },
  {
    id: "html-basics-13",
    question: "What does the <mark> tag do to text it wraps?",
    type: "single",
    options: [
      "Highlights the text, typically with a yellow background, to mark it for reference",
      "Strikes a line through the text to show it has been removed",
      "Renders the text as a subscript below the baseline",
      "Marks the text as an abbreviation with a hover tooltip",
    ],
    correctIndexes: [0],
    explanation:
      "The <mark> tag defines text that should be highlighted for reference purposes, and browsers render it with a yellow background by default.",
  },
  {
    id: "html-basics-14",
    question: "Which HTML tags are used to represent smaller text and text with a line through it, respectively?",
    type: "single",
    options: ["<small> and <del>", "<sub> and <mark>", "<small> and <sup>", "<tiny> and <strike>"],
    correctIndexes: [0],
    explanation:
      "<small> renders text in a smaller font size (often used for fine print), and <del> renders text with a strikethrough to indicate it has been deleted or is no longer accurate.",
  },
  {
    id: "html-basics-15",
    question: "What is the purpose of the <sub> and <sup> tags?",
    type: "single",
    options: [
      "They render subscript and superscript text, positioned slightly below or above the normal line",
      "They define secondary and supplementary navigation menus",
      "They mark text as a substitution and a suggestion for spell-checking",
      "They are shorthand aliases for <small> and <mark>",
    ],
    correctIndexes: [0],
    explanation:
      "<sub> lowers text slightly and renders it smaller for things like chemical formulas, while <sup> raises text slightly for things like footnote markers or exponents.",
  },
  {
    id: "html-basics-16",
    question: "Which tags are appropriate for marking up an extended, multi-sentence quotation set off as its own block versus a short inline quotation within a sentence?",
    type: "single",
    options: ["<blockquote> for the block quotation, <q> for the inline quotation", "<q> for the block quotation, <blockquote> for the inline quotation", "<quote> for both cases", "<cite> for the block quotation, <blockquote> for the inline quotation"],
    correctIndexes: [0],
    explanation:
      "<blockquote> is intended for longer, section-level quoted content and is typically rendered indented, while <q> is meant for short quotations embedded within a line of text and browsers usually add quotation marks automatically.",
  },
  {
    id: "html-basics-17",
    question: "What does the <abbr> tag do, for example in <abbr title=\"World Health Organization\">WHO</abbr>?",
    type: "single",
    options: [
      "It marks up an abbreviation and can show its full expansion as a tooltip via the title attribute",
      "It automatically expands the abbreviation into full text everywhere it is used on the page",
      "It renders the abbreviation in a monospace font",
      "It creates a hyperlink to a glossary definition of the term",
    ],
    correctIndexes: [0],
    explanation:
      "The <abbr> tag semantically marks text as an abbreviation or acronym, and its title attribute can supply the full text, which most browsers display as a tooltip on hover.",
  },
  {
    id: "html-basics-18",
    question: "Which of the following statements about HTML comments, such as <!-- this text -->, are true?",
    type: "multi",
    options: [
      "Content between <!-- and --> is not displayed on the rendered page",
      "Comments can be used to temporarily disable a block of markup during development",
      "The browser stops parsing the rest of the document upon encountering a comment",
      "Comment content is displayed on the page but styled in italics by default",
    ],
    correctIndexes: [0, 1],
    explanation:
      "Anything between <!-- and --> is skipped during rendering rather than displayed, which also makes comments a convenient way to temporarily comment out markup while developing, without deleting it outright.",
  },
  {
    id: "html-basics-19",
    question: "Which of the following are valid ways to specify a color for an HTML element's inline style, such as the text color?",
    type: "multi",
    options: ["color:tomato;", "color:#ff6347;", "color:rgb(255,99,71);", "color:C0;"],
    correctIndexes: [0, 1, 2],
    explanation:
      "CSS colors can be specified using a predefined color name, a hexadecimal value, or functional notations like rgb() or hsl(); \"C0\" is not a recognized color name, hex code, or function.",
  },
  {
    id: "html-basics-20",
    question: "In the hexadecimal color value #FF0000, what does each pair of characters represent?",
    type: "single",
    options: [
      "The intensity of red, green, and blue light respectively, from 00 to FF",
      "The hue, saturation, and lightness values respectively",
      "The opacity, brightness, and contrast values respectively",
      "Three separate fallback colors for different browsers",
    ],
    correctIndexes: [0],
    explanation:
      "A hex color code is composed of three two-character pairs representing red, green, and blue intensity from 00 (none) to FF (full), so #FF0000 is full red with no green or blue.",
  },
];
