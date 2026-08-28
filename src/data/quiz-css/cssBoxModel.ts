import type { QuizQuestion } from "../../types/quiz";

export const cssBoxModelQuestions: QuizQuestion[] = [
  {
    id: "css-box-model-1",
    question:
      "From the inside out, in what order are the four layers of the CSS box model stacked around an element's content?",
    type: "single",
    options: [
      "Content, then padding, then border, then margin",
      "Content, then border, then padding, then margin",
      "Content, then margin, then border, then padding",
      "Content, then padding, then margin, then border",
    ],
    correctIndexes: [0],
    explanation:
      "The box model wraps an element's content first with padding (space inside the border), then a border, then margin (space outside the border, between this element and its neighbors).",
  },
  {
    id: "css-box-model-2",
    question:
      "A div is styled with 'width: 300px; padding: 20px; border: 5px solid black;' and no box-sizing is set. Why does the div actually render wider than 300px, and how wide is its final rendered box?",
    type: "single",
    options: [
      "By default, box-sizing is content-box, so padding and border are added on top of the specified width; the div renders at 300 + 20*2 + 5*2 = 350px wide",
      "The width property is only a suggestion, and browsers always render block elements at their container's full width regardless of padding or border",
      "Padding and border only affect an element's height, never its width, so the div should render at exactly 300px wide",
      "Margin, not padding or border, is what gets added to the width, so the div stays at 300px until a margin is set",
    ],
    correctIndexes: [0],
    explanation:
      "With the default box-sizing value of content-box, the 'width' property sets only the content area's width; padding and border are added on the outside of that, so the visible box is wider than the declared width unless box-sizing: border-box is used.",
  },
  {
    id: "css-box-model-3",
    question: "What does 'margin: 10px 20px 30px 40px;' apply to an element?",
    type: "single",
    options: [
      "10px to the top, 20px to the right, 30px to the bottom, and 40px to the left, in clockwise order starting from the top",
      "10px to all four sides, with the remaining three values ignored",
      "40px to the top, 30px to the right, 20px to the bottom, and 10px to the left, in counter-clockwise order",
      "10px and 30px control the left/right margins, while 20px and 40px control the top/bottom margins",
    ],
    correctIndexes: [0],
    explanation:
      "When four values are given to a shorthand property like margin, they are applied clockwise starting at the top: top, right, bottom, then left.",
  },
  {
    id: "css-box-model-4",
    question:
      "For 'margin: 0 auto;' to horizontally center a block-level element, what else must be true?",
    type: "single",
    options: [
      "The element must have an explicit width (or max-width) that is less than its containing block, so there is leftover horizontal space for 'auto' to distribute evenly",
      "The element must have 'display: inline;' set, since auto margins only work on inline elements",
      "The containing element must also have 'margin: 0 auto;' applied to it",
      "The element's height must be set to 'auto' at the same time, or the centering is ignored",
    ],
    correctIndexes: [0],
    explanation:
      "Auto margins split remaining horizontal space evenly between the left and right sides, but that only works if there is leftover space to divide, which requires the element to have a set width narrower than its container; a full-width block element has no extra space to center within.",
  },
  {
    id: "css-box-model-5",
    question:
      "Two sibling <p> elements are stacked vertically. The first has 'margin-bottom: 20px;' and the second has 'margin-top: 20px;'. Which statements about the resulting gap between them are correct?",
    type: "multi",
    options: [
      "The two margins collapse into a single margin, so the visible gap is 20px, not 40px",
      "Margin collapsing only happens between vertically adjacent margins in normal document flow; it does not apply to horizontal (left/right) margins",
      "The gap would still collapse to 20px even if the elements were flex or grid items instead of normal block elements",
      "Padding never collapses in this same situation, so 'padding-bottom: 20px' and 'padding-top: 20px' on the same two elements would produce a full 40px gap",
    ],
    correctIndexes: [0, 1, 3],
    explanation:
      "Adjacent vertical margins between block elements in normal flow collapse into a single margin equal to the larger of the two (here, both are 20px, so the gap is 20px); this collapsing only applies to vertical margins in normal flow — it does not occur for flex/grid item margins, and it never applies to padding, which always adds up fully.",
  },
  {
    id: "css-box-model-6",
    question: "What does 'padding: 10px 5px;' set on an element?",
    type: "single",
    options: [
      "10px of padding on the top and bottom, and 5px of padding on the left and right",
      "10px of padding on the left and right, and 5px of padding on the top and bottom",
      "10px of padding on all sides, with 5px added only to the bottom",
      "5px of padding on every side, since the first value is overridden by the second",
    ],
    correctIndexes: [0],
    explanation:
      "With two values, the padding (and margin) shorthand applies the first value to the top and bottom, and the second value to the left and right.",
  },
  {
    id: "css-box-model-7",
    question:
      "Unlike margin collapsing, if one element has 'padding-bottom: 20px;' and the next sibling element has 'padding-top: 20px;', what is the total visible space between their content?",
    type: "single",
    options: [
      "40px, because padding always adds up fully and never collapses the way adjacent vertical margins can",
      "20px, because padding collapses the same way margin does",
      "0px, because padding is only visible when a background color is set",
      "It depends on which element has a higher z-index",
    ],
    correctIndexes: [0],
    explanation:
      "Padding is never subject to collapsing; each element's padding is fully preserved and simply adds up, so two adjacent 20px paddings produce a full 40px gap, unlike margins which can collapse into a single shared gap.",
  },
  {
    id: "css-box-model-8",
    question:
      "A container is styled with 'width: 100%; max-width: 960px; margin: 0 auto;'. How does this behave as the viewport is resized?",
    type: "single",
    options: [
      "On wide screens the container stays capped at 960px wide and is centered, while on narrow screens it shrinks to fill 100% of the available width",
      "The container is always exactly 960px wide, regardless of the viewport size",
      "The 'width: 100%' always wins over 'max-width', so the container ignores the 960px cap entirely",
      "The container centers itself only when the viewport is narrower than 960px",
    ],
    correctIndexes: [0],
    explanation:
      "max-width caps how large 'width: 100%' is allowed to grow; on screens wider than 960px the container stops growing and margin: 0 auto centers it, while on narrower screens the 100% width takes over so it shrinks fluidly, which is the basis of a simple responsive container.",
  },
  {
    id: "css-box-model-9",
    question:
      "Why might a card component use 'min-height: 200px;' instead of 'height: 200px;'?",
    type: "single",
    options: [
      "min-height guarantees the card is at least 200px tall but still lets it grow taller if its content needs more space, whereas a fixed height can force overflow or clip content",
      "min-height and height behave identically in every situation, so it makes no practical difference",
      "min-height sets the maximum size the card can ever reach, preventing it from growing further",
      "min-height only works on inline elements, while height only works on block elements",
    ],
    correctIndexes: [0],
    explanation:
      "A fixed height locks an element to that exact size, which can clip or overflow if the content is taller, while min-height sets only a floor, letting the box expand naturally when its content needs more room.",
  },
  {
    id: "css-box-model-10",
    question:
      "What is the key difference between 'box-sizing: content-box' (the default) and 'box-sizing: border-box'?",
    type: "single",
    options: [
      "With content-box, width/height set only the content area and padding/border add on top of it; with border-box, width/height include the padding and border, so the box stays at the declared size",
      "content-box includes padding and border in the declared width, while border-box excludes them",
      "border-box removes the ability to set a border on the element entirely",
      "The two values only affect margin, not the size of the content, padding, or border",
    ],
    correctIndexes: [0],
    explanation:
      "content-box (the default) makes width/height apply to the content only, so padding and border enlarge the final box; border-box instead makes width/height represent the total size including padding and border, keeping the rendered box at exactly the declared dimensions.",
  },
  {
    id: "css-box-model-11",
    question:
      "Many CSS resets include a rule like '*, *::before, *::after { box-sizing: border-box; }'. Which of the following are genuine reasons this is popular?",
    type: "multi",
    options: [
      "It makes an element's declared width and height match its actual rendered size, even after adding padding and a border, which is more intuitive to work with",
      "It prevents the common surprise of a box becoming wider than intended just because padding or a border was added",
      "It automatically removes all default margin and padding that browsers apply to elements like <body>, <ul>, and <h1>",
      "It eliminates the need to ever set a width or height on an element again",
    ],
    correctIndexes: [0, 1],
    explanation:
      "border-box makes sizing predictable by folding padding and border into the declared width/height, which avoids the common 'my box is wider than I set it' surprise; it does not, however, touch default browser margins/padding on other elements or remove the need to size elements at all.",
  },
  {
    id: "css-box-model-12",
    question:
      "A button has 'border: 1px solid gray;'. On ':hover' its 'outline: 3px solid blue;' is added. Why don't the surrounding elements shift or reflow when the outline appears, the way they would if border-width were increased instead?",
    type: "single",
    options: [
      "Outline is drawn outside the border edge without being counted as part of the box model, so it never takes up layout space or affects the size or position of neighboring elements",
      "Outline always renders with a width of 0px regardless of the value specified",
      "Outline replaces the border entirely, so the box's total size never actually changes",
      "Browsers automatically add extra margin around any element that has an outline, canceling out the visual shift",
    ],
    correctIndexes: [0],
    explanation:
      "Unlike border, outline is not part of the box model at all — it is painted on top of, or around, the element without affecting its width, height, or the position of surrounding elements, which is why toggling it never triggers reflow.",
  },
  {
    id: "css-box-model-13",
    question:
      "Which of the following statements about 'outline-offset' and using outline for ':focus' styles are correct?",
    type: "multi",
    options: [
      "'outline-offset: 4px;' pushes the outline 4px away from the border edge, leaving a visible gap, without changing the element's box model size",
      "Outline is commonly used for ':focus' indicators because keyboard users need a clear visual cue for which element is currently focused",
      "Setting 'outline: none;' on ':focus' with no replacement style is a well-known accessibility mistake, since it removes the visual cue keyboard users rely on",
      "A negative value for outline-offset is invalid, and browsers will ignore the entire outline-offset declaration",
    ],
    correctIndexes: [0, 1, 2],
    explanation:
      "outline-offset controls the gap between the outline and the element's edge (positive values push it outward, and negative values are actually valid and pull it inward over the element); outline is the standard way to show keyboard focus, and removing it without any replacement is a common accessibility failure that leaves keyboard users unable to see what's focused.",
  },
  {
    id: "css-box-model-14",
    question:
      "What do 'border-image-source' and 'border-image-slice' each control when using border-image?",
    type: "single",
    options: [
      "border-image-source specifies the image (or gradient) to use for the border, while border-image-slice divides that image into regions that map onto the border's corners and edges",
      "border-image-source sets the border's color, while border-image-slice sets its width in pixels",
      "border-image-slice specifies the image to use, while border-image-source controls how many times it repeats",
      "Both properties do the same thing, and only one needs to be set for a border-image to display",
    ],
    correctIndexes: [0],
    explanation:
      "border-image-source provides the image or gradient, and border-image-slice cuts it into a 3x3 grid, mapping the corner pieces to the border's corners and the edge pieces to be stretched, repeated, or rounded along the border's sides — both properties are needed for a border-image to render as expected.",
  },
  {
    id: "css-box-model-15",
    question:
      "What does 'border-image-source: linear-gradient(to right, red, blue); border-image-slice: 1;' require in order to actually be visible on an element?",
    type: "single",
    options: [
      "A border-style (e.g. solid) and a border-width must also be set, since border-image paints over the border's appearance but still needs a border box to render into",
      "Nothing else is needed; border-image-source alone is always enough to display a border",
      "The element must also have 'background-image: none;' explicitly set, or the gradient is ignored",
      "border-image only works with border-style: dashed, never with solid",
    ],
    correctIndexes: [0],
    explanation:
      "border-image relies on the element already having a border area to paint into, so border-style and border-width (or the border shorthand) must be set; border-image-source (which accepts gradients as well as images) and border-image-slice then determine what gets drawn into that border area.",
  },
  {
    id: "css-box-model-16",
    question:
      "How do the 'px' and '%' units differ when used for an element's width?",
    type: "single",
    options: [
      "px is a fixed, absolute length that stays the same regardless of context, while % is relative to the width of the element's containing block",
      "px and % always compute to the exact same pixel value for any given element",
      "% is an absolute unit fixed to the viewport, while px is relative to the parent's font size",
      "px can only be used for font-size, never for width or height",
    ],
    correctIndexes: [0],
    explanation:
      "px is an absolute, fixed-size unit, whereas a percentage width is resolved relative to the width of the element's containing block, so the same '50%' can compute to very different pixel values depending on the parent's size.",
  },
  {
    id: "css-box-model-17",
    question:
      "An element has 'font-size: 1.5em;' and its parent has 'font-size: 20px;'. Its child, in turn, also has 'font-size: 1.5em;'. Which statements are correct?",
    type: "multi",
    options: [
      "The first element's font-size computes to 30px (1.5 x 20px), based on its parent's font-size",
      "The child's font-size compounds further to 45px (1.5 x 30px), because em is relative to each element's own parent, and font sizes stack down the tree",
      "If 'rem' had been used instead of 'em' throughout, both elements would compute their font-size relative to the root (<html>) element's font-size instead of compounding through each parent",
      "em and rem always produce identical results, because both are relative units",
    ],
    correctIndexes: [0, 1, 2],
    explanation:
      "em is relative to the font-size of the element's own parent, so nested em values compound (1.5em on top of an already-scaled 30px becomes 45px); rem avoids this compounding by always resolving against the root element's font-size, no matter how deeply nested the element is.",
  },
  {
    id: "css-box-model-18",
    question:
      "A hero section is styled with 'width: 100vw; height: 100vh;'. What do these values mean?",
    type: "single",
    options: [
      "The element is sized to exactly 100% of the viewport's current width and height, so it always fills the visible browser window regardless of its parent's size",
      "vw and vh are relative to the parent element's width and height, just like the '%' unit",
      "vw and vh are relative to the root element's font-size, just like rem",
      "100vw and 100vh mean the element is scaled to 100 times the size of the viewport",
    ],
    correctIndexes: [0],
    explanation:
      "vw and vh are viewport units: 1vw equals 1% of the viewport's width and 1vh equals 1% of its height, so 100vw/100vh size an element to fill the entire visible browser window, independent of any parent element's size.",
  },
];
