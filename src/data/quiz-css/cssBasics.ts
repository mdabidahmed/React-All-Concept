import type { QuizQuestion } from "../../types/quiz";

export const cssBasicsQuestions: QuizQuestion[] = [
  {
    id: "css-basics-1",
    question:
      "In the CSS rule 'p { color: blue; font-size: 16px; }', which statement correctly describes its parts?",
    type: "single",
    options: [
      "'p' is the selector choosing which elements to style, and the braces contain a declaration block made of property:value pairs separated by semicolons",
      "The declaration block always comes before the selector in a valid CSS rule",
      "The selector defines which CSS property changes, while the declaration block defines which elements receive the style",
      "Each property can only ever be paired with a single number, never a keyword or another kind of value",
    ],
    correctIndexes: [0],
    explanation:
      "A CSS rule pairs a selector (here, 'p') with a declaration block; inside the braces, each declaration is a property:value pair, and multiple declarations are separated by semicolons.",
  },
  {
    id: "css-basics-2",
    question:
      "How does an element (type) selector like 'p { }' differ from a class selector like '.intro { }'?",
    type: "single",
    options: [
      "The element selector targets every <p> element on the page, while the class selector only targets elements carrying class=\"intro\", regardless of their tag name",
      "They are functionally identical; only the syntax used to write them differs",
      "The element selector applies only to the first matching element on the page, while the class selector applies to all matching elements",
      "The class selector can only be applied to <div> elements, never to other tags",
    ],
    correctIndexes: [0],
    explanation:
      "A type selector matches every element with that tag name, while a class selector matches any element (of any tag) that has the matching class attribute, letting the same class be reused across different kinds of elements.",
  },
  {
    id: "css-basics-3",
    question:
      "What is a key convention about the id selector, such as '#main-header { }', compared to a class selector?",
    type: "single",
    options: [
      "An id is meant to be unique to a single element per page, while a class can be reused across many elements",
      "An id can be applied to as many elements as needed on the same page, just like a class",
      "An id selector cannot be styled with CSS at all and is only usable from JavaScript",
      "An id selector is written with a leading period (.) instead of a hash (#)",
    ],
    correctIndexes: [0],
    explanation:
      "By convention (and per the HTML specification), an id should identify one specific element on a page, whereas a class is designed to be shared across multiple elements that need the same styling.",
  },
  {
    id: "css-basics-4",
    question:
      "What does the universal selector '*' do when used as '* { margin: 0; padding: 0; }'?",
    type: "single",
    options: [
      "It applies the margin and padding reset to every single element in the document",
      "It applies the reset only to the root <html> element",
      "It targets only elements that do not already have a class or id assigned",
      "It is invalid syntax and the browser ignores the entire rule",
    ],
    correctIndexes: [0],
    explanation:
      "The universal selector '*' matches every element in the document, which is why it is commonly used in CSS resets to zero out default spacing across the whole page.",
  },
  {
    id: "css-basics-5",
    question:
      "What is the benefit of grouping selectors with commas, as in 'h1, h2, h3 { font-family: sans-serif; }'?",
    type: "single",
    options: [
      "It applies the same declarations to all three heading levels without repeating the same style block for each one",
      "It applies the style only to h1, and h2/h3 are silently ignored",
      "It creates one combined virtual element that behaves like a nested <h1><h2><h3>",
      "The comma means all three selectors must match the same single element at once",
    ],
    correctIndexes: [0],
    explanation:
      "A comma-separated selector list lets multiple, independent selectors share one declaration block, avoiding the need to repeat identical styles in separate rules for h1, h2, and h3.",
  },
  {
    id: "css-basics-6",
    question:
      "Which of the following statements about CSS comments, written as /* comment text */, are true?",
    type: "multi",
    options: [
      "They are ignored by the browser and have no effect on how the page renders",
      "A single comment can span multiple lines",
      "Comments can be nested inside one another, such as /* outer /* inner */ */",
      "CSS also supports // for single-line comments, the same as JavaScript",
    ],
    correctIndexes: [0, 1],
    explanation:
      "CSS comments use /* ... */, are stripped out before rendering, and may span several lines, but they cannot be nested and CSS has no // single-line comment syntax outside of some preprocessors.",
  },
  {
    id: "css-basics-7",
    question:
      "Which of the following are valid ways to specify a CSS color value?",
    type: "multi",
    options: [
      "coral",
      "#3498db",
      "rgb(52, 152, 219)",
      "hsl 210, 70%, 53%",
    ],
    correctIndexes: [0, 1, 2],
    explanation:
      "A predefined color keyword like 'coral', a hex code, and the rgb() function are all valid; the last option is invalid because hsl() requires parentheses around its values, like hsl(210, 70%, 53%).",
  },
  {
    id: "css-basics-8",
    question: "What full hex color does the shorthand '#0f0' expand to?",
    type: "single",
    options: ["#00ff00", "#000f00", "#0f0f0f", "#f0f0f0"],
    correctIndexes: [0],
    explanation:
      "In 3-digit hex shorthand, each digit is duplicated to form the full 6-digit value, so '0', 'f', '0' becomes '00', 'ff', '00', which is pure green.",
  },
  {
    id: "css-basics-9",
    question:
      "In the color value 'rgba(255, 0, 0, 0.5)', what does the fourth number (0.5) control?",
    type: "single",
    options: [
      "The alpha channel, which sets how transparent or opaque the color is",
      "The lightness of the red color",
      "The saturation percentage of the color",
      "The hue rotation in degrees",
    ],
    correctIndexes: [0],
    explanation:
      "The fourth value in rgba() is the alpha channel, ranging from 0 (fully transparent) to 1 (fully opaque); the other three values (255, 0, 0) set the red, green, and blue intensities.",
  },
  {
    id: "css-basics-10",
    question:
      "A <div> shows white text on a red background. Why would 'background-color: rgba(255, 0, 0, 0.5)' be a better choice than 'opacity: 0.5' on the div, if the goal is a semi-transparent background with fully solid, readable text?",
    type: "single",
    options: [
      "opacity: 0.5 fades the entire element, including its text and children, while rgba() on background-color only makes the background translucent and leaves the text fully opaque",
      "The two approaches always produce identical visual results, so either works equally well",
      "rgba() has no effect when used with background-color and only works with the color property",
      "opacity: 0.5 only affects the background layer of an element, never its text or children",
    ],
    correctIndexes: [0],
    explanation:
      "The opacity property fades an entire element and everything inside it, including text, while setting an rgba() (or hsla()) background color only makes that background translucent and leaves child content, like text, fully opaque.",
  },
  {
    id: "css-basics-11",
    question:
      "By default, if an element has 'background-image: url(pattern.png);' with no other background properties set, what happens?",
    type: "single",
    options: [
      "The image tiles (repeats) both horizontally and vertically to fill the element",
      "The image is shown exactly once, centered within the element",
      "The image stretches to exactly fill the element's width and height",
      "Nothing is shown until background-repeat is explicitly set to a value",
    ],
    correctIndexes: [0],
    explanation:
      "The default value of background-repeat is 'repeat', which tiles the background image both horizontally and vertically until the element's background area is filled.",
  },
  {
    id: "css-basics-12",
    question:
      "What do the two values in 'background-position: right top;' control?",
    type: "single",
    options: [
      "The horizontal and vertical alignment of the background image within the element, in that order",
      "The width and height the background image is resized to",
      "The horizontal and vertical scroll speed of the background image",
      "The offset of the element's border relative to its padding box",
    ],
    correctIndexes: [0],
    explanation:
      "background-position sets where the background image is placed inside the element's background area, with keywords, percentages, or lengths controlling the horizontal position first and vertical position second.",
  },
  {
    id: "css-basics-13",
    question:
      "What visual effect does 'background-attachment: fixed;' produce on a background image as the page is scrolled?",
    type: "single",
    options: [
      "The background image stays fixed relative to the viewport while the page content scrolls over it, creating a parallax-like effect",
      "The background image scrolls along with the element's content at the same speed",
      "The background image is duplicated at fixed intervals down the length of the page",
      "The property freezes the entire page and prevents any further scrolling",
    ],
    correctIndexes: [0],
    explanation:
      "'fixed' anchors the background image to the viewport instead of the element, so the image appears to stay in place while the rest of the page content scrolls past it.",
  },
  {
    id: "css-basics-14",
    question:
      "Which of the following can be combined into a single 'background' shorthand declaration, such as 'background: #fff url(bg.png) no-repeat right top / cover fixed;'?",
    type: "multi",
    options: [
      "background-color",
      "background-image",
      "background-repeat",
      "font-family",
    ],
    correctIndexes: [0, 1, 2],
    explanation:
      "The background shorthand can combine color, image, repeat, position/size, and attachment (among others) into one declaration; font-family is an unrelated text property and has no place in the background shorthand.",
  },
  {
    id: "css-basics-15",
    question: "Which of the following statements about CSS borders are true?",
    type: "multi",
    options: [
      "The border shorthand conventionally lists width, style, and color, e.g. 'border: 2px solid black;'",
      "If border-style is not set (or is 'none'), no border will be visible even if border-width and border-color are set",
      "border-width alone is enough to make a visible border appear without specifying a style",
      "The border shorthand property can only be used with the 'solid' border style",
    ],
    correctIndexes: [0, 1],
    explanation:
      "The border shorthand is conventionally written as width, then style, then color, and because the default border-style is 'none', a border stays invisible until a style like solid or dashed is explicitly set, no matter what width or color are given.",
  },
  {
    id: "css-basics-16",
    question:
      "What does applying 'border-radius: 50%;' to a square element (equal width and height) produce?",
    type: "single",
    options: [
      "A perfect circle, because the radius curves each corner all the way to the element's center",
      "A square with only slightly rounded corners",
      "An oval that is wider than it is tall",
      "No visible change, since border-radius requires a border to already be set",
    ],
    correctIndexes: [0],
    explanation:
      "On an element with equal width and height, a border-radius of 50% curves all four corners until they meet at the center, producing a perfect circle; border-radius also works with no border set, since it clips the element's own shape.",
  },
  {
    id: "css-basics-17",
    question:
      "What does it mean when we say CSS is a 'cascading' style sheet language?",
    type: "single",
    options: [
      "When multiple rules target the same element, conflicts are resolved using a combination of source order, selector specificity, and declared importance",
      "Styles always flow strictly from parent to child, with a child's computed value automatically overriding whatever its parent declares",
      "Each linked stylesheet must @import the next one in sequence, or the browser refuses to apply any of them",
      "Only the very last CSS rule written in the last-loaded file is ever applied, and every earlier matching rule is discarded",
    ],
    correctIndexes: [0],
    explanation:
      "The 'cascade' is the algorithm browsers use to decide which declaration wins when several rules could apply to the same element, weighing source order, specificity, and importance (such as !important) together.",
  },
  {
    id: "css-basics-18",
    question:
      "What are the three ways to add CSS to an HTML page, and which one applies styles to only a single element?",
    type: "single",
    options: [
      "Inline (the style attribute) applies to a single element, while internal (a <style> block in <head>) and external (a linked .css file) can apply page-wide or site-wide",
      "Internal, external, and imported, with imported applying only to a single element",
      "Inline, internal, and external, but internal is the one that applies only to a single element",
      "Inline, class-based, and id-based, with class-based applying only to a single element",
    ],
    correctIndexes: [0],
    explanation:
      "Inline CSS is written directly on one element via its style attribute and affects only that element, while internal CSS in a <style> tag and external CSS in a linked .css file both define rules that can apply across the whole page or site.",
  },
];
