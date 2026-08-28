import type { QuizQuestion } from "../../types/quiz";

export const cssLayoutPositioningQuestions: QuizQuestion[] = [
  {
    id: "css-layout-positioning-1",
    question:
      "Which of the following statements about display: block, inline, and inline-block are true?",
    type: "multi",
    options: [
      "A block-level element takes up the full available width of its container by default and starts on a new line",
      "A plain inline element, like <span>, respects explicit width and height properties set on it",
      "An inline-block element can have explicit width/height set while still sitting next to other elements on the same line",
      "margin-top and margin-bottom have no visible effect on a purely inline element like <span>",
    ],
    correctIndexes: [0, 2, 3],
    explanation:
      "Block elements fill the available width and force a line break before and after themselves, while plain inline elements ignore explicit width/height and vertical margins entirely; inline-block combines flowing inline with full support for width, height, and margin, unlike plain inline elements.",
  },
  {
    id: "css-layout-positioning-2",
    question:
      "An inline <span> has 'width: 200px; height: 100px;' applied via CSS. What happens?",
    type: "single",
    options: [
      "Both the width and height are ignored; the span sizes itself to fit its text content as usual",
      "The span becomes exactly 200px by 100px, the same as if it were block-level",
      "Only the height is ignored, but the width is respected",
      "The browser throws a console error and ignores the entire rule",
    ],
    correctIndexes: [0],
    explanation:
      "width and height have no effect on non-replaced inline elements like <span>; to make an element respect explicit dimensions, its display value needs to be changed to block, inline-block, or another box-generating value that supports sizing.",
  },
  {
    id: "css-layout-positioning-3",
    question:
      "An element has 'position: relative; top: 10px; left: 20px;' with no other positioned ancestors. What happens?",
    type: "single",
    options: [
      "The element shifts 10px down and 20px right from where it would normally sit in the flow, and the space it originally occupied stays reserved",
      "The element is removed from the normal flow and repositioned relative to the browser viewport",
      "The element shifts relative to its nearest positioned ancestor, ignoring its own original position",
      "top and left have no effect unless width and height are also explicitly set",
    ],
    correctIndexes: [0],
    explanation:
      "position: relative offsets an element from its own normal position using top/left/right/bottom, but the space it would have occupied in the flow remains reserved, unlike absolute or fixed positioning which remove the element from the flow entirely.",
  },
  {
    id: "css-layout-positioning-4",
    question:
      "A child <div> has 'position: absolute; top: 0; right: 0;' but its parent has no position set. Why does the child end up positioned relative to the page instead of the parent?",
    type: "single",
    options: [
      "An absolutely positioned element positions itself relative to the nearest ancestor whose position is not static; since the parent is static (the default), the browser keeps looking up the tree, ultimately falling back to the initial containing block",
      "position: absolute always ignores parent elements and is always relative to the browser viewport, no exceptions",
      "The child needs 'position: fixed' instead of 'position: absolute' to respect its parent",
      "Absolute positioning only works on elements that have no CSS class applied",
    ],
    correctIndexes: [0],
    explanation:
      "An absolutely positioned element looks up the ancestor chain for the nearest element with position: relative, absolute, fixed, or sticky; finding none, it falls back to the initial containing block, which is why giving the parent 'position: relative' is the standard way to contain an absolutely positioned child.",
  },
  {
    id: "css-layout-positioning-5",
    question: "How does 'position: sticky;' differ from 'position: fixed;'?",
    type: "single",
    options: [
      "A sticky element behaves like a normal in-flow element until it crosses a specified scroll threshold (e.g. top: 0), at which point it 'sticks' but stays constrained within its containing block, whereas a fixed element is always positioned relative to the viewport",
      "They behave identically in every browser and situation",
      "A fixed element scrolls along with the page, while a sticky element never scrolls at all",
      "Sticky positioning requires JavaScript to function, while fixed positioning is pure CSS",
    ],
    correctIndexes: [0],
    explanation:
      "Sticky positioning toggles between relative and fixed-like behavior depending on scroll position, and it stays constrained within the bounds of its containing block, while fixed positioning is anchored to the viewport at all times, from the moment it's applied.",
  },
  {
    id: "css-layout-positioning-6",
    question:
      "An element has 'z-index: 999;' but visually still appears behind another element. What is the most likely reason?",
    type: "single",
    options: [
      "The element's position property is still 'static' (the default), and z-index has no effect on statically positioned elements",
      "z-index values above 100 are automatically ignored by browsers",
      "z-index only works on elements that also have a background-color set",
      "The two overlapping elements are the same size, and z-index requires them to have different widths",
    ],
    correctIndexes: [0],
    explanation:
      "z-index only affects the stacking order of elements whose position is something other than static (relative, absolute, fixed, or sticky); on a statically positioned element, z-index is simply ignored.",
  },
  {
    id: "css-layout-positioning-7",
    question:
      "Which of the following statements about z-index and stacking contexts are true?",
    type: "multi",
    options: [
      "A higher z-index value places an element above sibling elements that share the same stacking context and are also positioned",
      "An absolutely positioned element with 'z-index: 1;' can still end up visually behind an element with a lower z-index if that other element belongs to a different, higher-level stacking context",
      "Every HTML element automatically creates its own new stacking context, regardless of its CSS properties",
      "Properties like opacity less than 1, or transform, can also create a new stacking context, not just position combined with z-index",
    ],
    correctIndexes: [0, 1, 3],
    explanation:
      "Within a single stacking context, a higher z-index wins, but z-index values only ever compare within the same stacking context, so an element trapped inside a lower-priority context can appear behind an element with a numerically smaller z-index that belongs to a higher-priority context. Not every element creates a stacking context; trigger properties include position with z-index, but also opacity below 1, transform, filter, and others.",
  },
  {
    id: "css-layout-positioning-8",
    question:
      "What is the difference between 'overflow: scroll;' and 'overflow: auto;' on an element with content taller than its set height?",
    type: "single",
    options: [
      "'scroll' always shows scrollbars even if the content actually fits, while 'auto' only shows scrollbars when the content actually overflows",
      "They are exactly the same in every browser and situation",
      "'auto' always shows scrollbars, while 'scroll' never does",
      "'scroll' clips overflowing content with no way to access it, while 'auto' allows scrolling",
    ],
    correctIndexes: [0],
    explanation:
      "overflow: scroll forces scrollbars to always be present regardless of whether the content overflows, while overflow: auto only shows scrollbars when they are actually needed, based on whether the content overflows the box.",
  },
  {
    id: "css-layout-positioning-9",
    question:
      "You set 'text-overflow: ellipsis;' on a <p>, hoping to truncate long text with '...', but nothing happens and the text still wraps onto multiple lines. What else is required?",
    type: "single",
    options: [
      "The element also needs 'overflow: hidden;' and 'white-space: nowrap;' so the text is confined to one line and clipped before text-overflow can add the ellipsis",
      "text-overflow: ellipsis works automatically on any element with a fixed width, no other properties needed",
      "The element needs 'display: inline;' instead of its current display value",
      "text-overflow only works on <input> elements, not on <p> or other block-level elements",
    ],
    correctIndexes: [0],
    explanation:
      "text-overflow: ellipsis only has something to truncate once wrapping is prevented (white-space: nowrap) and the overflowing text is clipped at the box edge (overflow: hidden); without both, there is no single-line overflow condition for text-overflow to mark with an ellipsis.",
  },
  {
    id: "css-layout-positioning-10",
    question:
      "A parent <div> contains two floated child <div> elements and no other content. Why does the parent end up with a height of 0, visually collapsing?",
    type: "single",
    options: [
      "Floated elements are taken out of the normal document flow, so the parent no longer 'sees' their height when calculating its own automatic height",
      "Floats are invisible by default until an explicit width is set on them",
      "The parent element automatically applies 'display: none' whenever it contains floated children",
      "The children also need 'position: absolute' in addition to float for this to happen",
    ],
    correctIndexes: [0],
    explanation:
      "Floating an element removes it from the normal flow so surrounding content can wrap around it; a parent whose only content is floated children has nothing in-flow left to base its automatic height on, so it collapses to zero height, a problem commonly called the 'collapsing parent' issue.",
  },
  {
    id: "css-layout-positioning-11",
    question:
      "Which technique is the classic 'clearfix' fix for the collapsing-parent problem caused by floated children?",
    type: "single",
    options: [
      "Adding a rule like '.clearfix::after { content: ''; display: table; clear: both; }' to the parent",
      "Setting 'float: none;' on the parent element itself",
      "Adding 'overflow: visible;' to the parent",
      "Wrapping the floated children in an <iframe>",
    ],
    correctIndexes: [0],
    explanation:
      "The clearfix technique adds a generated ::after pseudo-element after the floated children and applies 'clear: both;' to it, forcing the parent to stretch and enclose the floats; setting overflow to hidden or auto on the parent is a common alternative fix, but overflow: visible does not solve the problem.",
  },
  {
    id: "css-layout-positioning-12",
    question:
      "Why might a developer switch two <div> elements from 'display: block;' to 'display: inline-block;' if the goal is to place them side by side while still controlling their width and height?",
    type: "single",
    options: [
      "inline-block elements flow next to each other on the same line like inline elements, but unlike plain inline elements, they still accept explicit width, height, and full margin/padding",
      "Block elements can already sit side by side without any CSS changes",
      "inline-block automatically makes elements equal width, splitting the container evenly between them",
      "inline-block removes the ability to set a background-color on the element",
    ],
    correctIndexes: [0],
    explanation:
      "display: block forces each element onto its own line, while plain inline elements flow side by side but ignore width/height; inline-block combines the best of both, flowing inline while still respecting box-model dimensions like width, height, and margin.",
  },
  {
    id: "css-layout-positioning-13",
    question:
      "Two 'display: inline-block;' <div> elements are written in the HTML with a line break between them, and an unexpected small gap appears between them when rendered. What causes this?",
    type: "single",
    options: [
      "The whitespace (the line break) in the HTML source between the two inline-block elements is treated like a space character and rendered as a small visible gap",
      "inline-block elements always have a mandatory 4px margin applied by the browser's default stylesheet",
      "The gap is caused by the two elements having different z-index values",
      "inline-block elements cannot be placed next to each other unless float is also set",
    ],
    correctIndexes: [0],
    explanation:
      "Because inline-block elements participate in inline layout, whitespace in the HTML source (including line breaks) between them collapses into a single rendered space, creating a visible gap; common fixes include removing the whitespace in the markup, setting font-size: 0 on the parent, or switching to flexbox or grid.",
  },
  {
    id: "css-layout-positioning-14",
    question:
      "For 'margin: 0 auto;' to horizontally center a block-level element, what condition must be true?",
    type: "single",
    options: [
      "The element must have an explicit width set (smaller than its containing block), rather than the default width that stretches to fill the container",
      "The element must also have 'position: absolute;' applied",
      "The parent element must use 'display: flex;'",
      "The element must be an inline element, not block-level",
    ],
    correctIndexes: [0],
    explanation:
      "margin: 0 auto splits the leftover horizontal space, the container's width minus the element's own width, evenly between the left and right margins; if the element's width is left at its default, which stretches to fill the container, there is no leftover space to distribute, so nothing visibly moves.",
  },
  {
    id: "css-layout-positioning-15",
    question:
      "Which of the following are valid ways to center a child element both horizontally and vertically inside its parent?",
    type: "multi",
    options: [
      "Setting the parent to 'display: flex; justify-content: center; align-items: center;'",
      "Giving the child 'position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);' inside a positioned parent",
      "Setting only 'margin: 0 auto;' on the child, with no other properties",
      "Setting the parent to 'display: grid; place-items: center;'",
    ],
    correctIndexes: [0, 1, 3],
    explanation:
      "Flexbox's justify-content/align-items, CSS Grid's place-items, and absolute positioning combined with a transform-based offset are all standard techniques for centering in both directions; 'margin: 0 auto;' alone only centers horizontally and has no effect on vertical position.",
  },
  {
    id: "css-layout-positioning-16",
    question:
      "Given the selectors below, which statements correctly describe what each one targets?",
    type: "multi",
    options: [
      "'div p' (descendant combinator) matches every <p> nested anywhere inside a <div>, no matter how deeply nested",
      "'div > p' (child combinator) matches only <p> elements that are direct children of a <div>",
      "'h2 + p' (adjacent sibling combinator) matches a <p> that immediately follows an <h2> as its very next sibling",
      "'h2 ~ p' (general sibling combinator) matches only the first <p> that comes after an <h2>, and no others",
    ],
    correctIndexes: [0, 1, 2],
    explanation:
      "The descendant combinator (a space) matches at any nesting depth, the child combinator (>) matches only direct children, and the adjacent sibling combinator (+) matches just the single element immediately following. The general sibling combinator (~) is the odd one out: it matches every matching sibling that comes after, not just the first.",
  },
  {
    id: "css-layout-positioning-17",
    question: "What is the key difference between ':hover' and ':first-child' as pseudo-classes?",
    type: "single",
    options: [
      "':hover' is a dynamic, interaction-based state that applies while the mouse is over the element, while ':first-child' is a structural pseudo-class matching based on an element's position among its siblings, regardless of interaction",
      "They are two different names for the exact same behavior",
      "':first-child' only works on <li> elements inside a <ul> or <ol>",
      "':hover' can only be applied to <button> and <a> elements",
    ],
    correctIndexes: [0],
    explanation:
      ":hover reflects a temporary interaction state tied to mouse position, while :first-child is a structural selector that matches an element based on being the first child of its parent, independent of any user interaction; both can be applied broadly to most element types.",
  },
  {
    id: "css-layout-positioning-18",
    question: "What does 'li:nth-child(2n) { background: #eee; }' select within a list?",
    type: "single",
    options: [
      "Every even-numbered <li> among its siblings (2nd, 4th, 6th, ...), creating a striped/zebra effect",
      "Only the second <li> in the list",
      "Every odd-numbered <li> (1st, 3rd, 5th, ...)",
      "All <li> elements, since '2n' is treated as invalid and ignored",
    ],
    correctIndexes: [0],
    explanation:
      "nth-child(2n) uses the an+b formula with a=2 and b=0, matching every 2nd element (2, 4, 6, ...), commonly used to create zebra-striped rows or list items; the odd equivalent would be nth-child(2n+1) or the 'odd' keyword.",
  },
  {
    id: "css-layout-positioning-19",
    question: "What does the selector 'button:not(.disabled)' target?",
    type: "single",
    options: [
      "Every <button> element that does NOT have the class 'disabled' applied to it",
      "Every element that is not a <button>, but does have the class 'disabled'",
      "Only <button> elements that are direct children of an element with class 'disabled'",
      "It is invalid syntax, because :not() cannot accept a class as its argument",
    ],
    correctIndexes: [0],
    explanation:
      ":not() is a negation pseudo-class matching elements that do NOT match the selector inside its parentheses, so 'button:not(.disabled)' selects <button> elements lacking the 'disabled' class; it accepts most simple selectors as its argument, including classes.",
  },
  {
    id: "css-layout-positioning-20",
    question: "Which statements about CSS pseudo-elements are true?",
    type: "multi",
    options: [
      "'::before' and '::after' require a content property (even an empty one) to actually generate a visible box",
      "'::first-letter' can be used to create a large decorative drop-cap on the first character of a paragraph",
      "'::selection' lets you style the appearance, such as background color, of text currently highlighted by the user",
      "'::first-line' always styles the literal first sentence of a paragraph, no matter how the text wraps",
    ],
    correctIndexes: [0, 1, 2],
    explanation:
      "::before/::after need a content property to render at all; ::first-letter is commonly used for drop-cap effects; ::selection styles user-highlighted text. ::first-line instead styles whichever text visually renders on the first line based on the current width and wrapping, so the styled portion can change as the browser is resized, rather than always matching a fixed 'first sentence'.",
  },
];
