import type { QuizQuestion } from "../../types/quiz";

export const cssTextTypographyQuestions: QuizQuestion[] = [
  {
    id: "css-text-typography-1",
    question:
      "Which of the following statements about the color and text-align properties are correct?",
    type: "multi",
    options: [
      "'color: crimson;' sets the color of the text content, while the element's background is controlled separately by background-color",
      "'text-align: right;' aligns inline-level content, like text, against the right edge of its containing block",
      "'text-align: center;' centers the element's own box horizontally within its parent, the same way 'margin: 0 auto;' does",
      "The color property, when set on a <div>, also changes the color of any <img> placed inside it",
    ],
    correctIndexes: [0, 1],
    explanation:
      "color sets the foreground text color while background-color is an independent property, and text-align: right aligns the inline content inside a box against that box's right edge. text-align only affects how inline content is arranged within its own box, not the box's own position (margin: auto does that), and color has no effect on raster images like <img>.",
  },
  {
    id: "css-text-typography-2",
    question:
      "By default, browsers underline <a> links. Which CSS declaration removes that underline?",
    type: "single",
    options: [
      "text-decoration: none;",
      "text-align: none;",
      "text-transform: none;",
      "list-style: none;",
    ],
    correctIndexes: [0],
    explanation:
      "text-decoration controls line effects like underline, overline, and line-through; setting it to 'none' on the anchor removes the browser's default underline styling.",
  },
  {
    id: "css-text-typography-3",
    question:
      "Which of the following is NOT a valid value for the text-transform property?",
    type: "single",
    options: ["uppercase", "lowercase", "capitalize", "titlecase"],
    correctIndexes: [3],
    explanation:
      "text-transform supports none, uppercase, lowercase, and capitalize (which uppercases the first letter of each word); 'titlecase' is not a recognized CSS keyword, even though capitalize produces a visually similar result.",
  },
  {
    id: "css-text-typography-4",
    question:
      "Given 'letter-spacing: -1px;' on a heading, what visual effect does this produce compared to the default spacing?",
    type: "single",
    options: [
      "The characters are pulled slightly closer together than normal, tightening the text",
      "The characters are pushed further apart than normal",
      "The line height increases, adding more vertical space between lines",
      "The text is rendered in bold automatically",
    ],
    correctIndexes: [0],
    explanation:
      "Negative letter-spacing values reduce the space between characters, pulling them closer than the font's default tracking; positive values would push them apart instead.",
  },
  {
    id: "css-text-typography-5",
    question:
      "Why is it generally recommended to write 'line-height: 1.5;' (a unitless number) instead of 'line-height: 24px;' for body text?",
    type: "single",
    options: [
      "A unitless value acts as a multiplier of each element's own font-size, so it scales correctly for descendants with different font sizes, while a fixed px value is inherited literally and can look cramped or excessive elsewhere",
      "A unitless value is exactly the same as a percentage and always computes to an identical pixel amount",
      "A px-based line-height automatically recalculates on browser resize while a unitless value does not",
      "Unitless line-height values only work inside flex containers",
    ],
    correctIndexes: [0],
    explanation:
      "A unitless line-height is recomputed as a ratio of each element's own computed font-size, so nested elements with larger or smaller text still get proportionally appropriate line spacing, whereas a fixed px value is inherited as-is and can end up too tight or too loose relative to a different font-size.",
  },
  {
    id: "css-text-typography-6",
    question:
      "In 'text-shadow: 2px 3px 5px rgba(0,0,0,0.5);', what does the third value (5px) represent?",
    type: "single",
    options: [
      "The blur radius, which softens and spreads the edges of the shadow",
      "The horizontal offset of the shadow",
      "The vertical offset of the shadow",
      "The spread distance that enlarges the shadow's box before blurring",
    ],
    correctIndexes: [0],
    explanation:
      "text-shadow's syntax is offset-x, offset-y, blur-radius, then color; the third value blurs and softens the shadow's edges. Unlike box-shadow, text-shadow has no separate 'spread' value.",
  },
  {
    id: "css-text-typography-7",
    question:
      "Why is it good practice to write 'font-family: 'Helvetica Neue', Arial, sans-serif;' instead of just 'font-family: 'Helvetica Neue';'?",
    type: "multi",
    options: [
      "If the user's device doesn't have 'Helvetica Neue' installed, the browser tries Arial next, giving a graceful fallback",
      "Listing multiple fonts causes the browser to blend them together into a single hybrid typeface",
      "Ending the stack with a generic family like sans-serif guarantees text still renders in some sans-serif font even if none of the named fonts are installed",
      "Font names must always be wrapped in quotes whenever they contain no spaces",
    ],
    correctIndexes: [0, 2],
    explanation:
      "A font stack lists fallbacks in priority order; the browser uses the first font in the list that is actually available, and a trailing generic family (serif, sans-serif, monospace, etc.) always resolves to some font as a last resort. Browsers never blend multiple named fonts together, and quoting is only required for names containing spaces or special characters, not as a universal rule.",
  },
  {
    id: "css-text-typography-8",
    question: "What is a 'web-safe font'?",
    type: "single",
    options: [
      "A font that is pre-installed on the vast majority of devices and operating systems, so it very likely displays correctly without needing to be downloaded",
      "A font specifically designed by browser vendors to prevent security exploits",
      "Any font loaded through the @font-face rule from a remote server",
      "A font that only renders correctly inside <input> and <textarea> elements",
    ],
    correctIndexes: [0],
    explanation:
      "Web-safe fonts, such as Arial, Georgia, or Times New Roman, are commonly pre-installed across most operating systems, making them reliable choices that don't depend on a custom font file being downloaded.",
  },
  {
    id: "css-text-typography-9",
    question:
      "Which two sub-properties are the minimum required values when using the 'font' shorthand, as in 'font: italic bold 16px/1.5 Arial, sans-serif;'?",
    type: "single",
    options: [
      "font-size and font-family",
      "font-weight and font-style",
      "line-height and font-family",
      "font-style and font-size",
    ],
    correctIndexes: [0],
    explanation:
      "The font shorthand requires at least a font-size and font-family; font-style, font-variant, and font-weight are optional values that may come before the size, and an optional line-height may follow the size after a slash, but omitting size or family makes the shorthand invalid.",
  },
  {
    id: "css-text-typography-10",
    question: "In 'font-weight: 700;', what does the numeric value 700 correspond to?",
    type: "single",
    options: [
      "Bold, the same visual weight as the keyword 'bold'",
      "Normal/regular weight, the same as 'normal'",
      "A weight lighter than the default, similar to 'lighter'",
      "An invalid value, since font-weight only accepts keywords, not numbers",
    ],
    correctIndexes: [0],
    explanation:
      "font-weight accepts numeric values from 100 to 900 in steps of 100; 400 corresponds to the keyword 'normal' and 700 corresponds to 'bold', with other values used for finer-grained weights, especially on variable fonts.",
  },
  {
    id: "css-text-typography-11",
    question:
      "When building an icon with inline SVG (pasting the <svg> markup directly into the HTML) and styling it with CSS, which statement is correct?",
    type: "single",
    options: [
      "Setting 'fill: currentColor;' on the SVG's paths lets the icon automatically match the surrounding text color, including changes on :hover",
      "Inline SVG icons cannot have their size changed with CSS; only the SVG element's own width/height attributes work",
      "Inline SVG icons cannot be vertically aligned with adjacent text using flexbox",
      "Inline SVG is only usable in image editing software, not directly inside an HTML document",
    ],
    correctIndexes: [0],
    explanation:
      "Because an inline SVG becomes part of the page's DOM, its fill can reference currentColor to inherit (and dynamically follow) the surrounding text color, its size can be controlled with CSS width/height, and it can be lined up with text by placing both inside a flex container with align-items: center.",
  },
  {
    id: "css-text-typography-12",
    question: "Which statement about list-style properties is correct?",
    type: "single",
    options: [
      "'list-style-type: none;' removes the bullet or number, but the list item's default padding/indentation remains unless that is also reset",
      "The list-style shorthand cannot combine a type keyword with an image; only one or the other is allowed",
      "list-style-position can only ever be set to 'outside', never 'inside'",
      "The ::marker pseudo-element styles an entire list item's text, not just its bullet or number",
    ],
    correctIndexes: [0],
    explanation:
      "Removing the marker with list-style-type: none does not remove the indentation created by the list's default margin/padding, so a full reset often zeroes those out too. The list-style shorthand can combine type, position, and image together, list-style-position also accepts 'inside', and ::marker specifically targets just the bullet or number, not the rest of the item's text.",
  },
];
