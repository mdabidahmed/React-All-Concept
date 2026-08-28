import type { QuizQuestion } from "../../types/quiz";

export const cssAdvancedEffectsQuestions: QuizQuestion[] = [
  {
    id: "css-advanced-effects-1",
    question:
      "An element matches all three of these rules: '#header { border: 1px solid red; }', '.logo { border: 2px dashed green; }', and 'img { border: 3px dotted blue; }'. Which border wins?",
    type: "single",
    options: [
      "The red, 1px solid border from '#header', because ID selectors outweigh both class and element selectors in specificity, regardless of the values chosen or the order the rules appear in",
      "The green, 2px dashed border from '.logo', because class selectors override IDs whenever a thicker or more decorative value is used",
      "The blue, 3px dotted border from 'img', because element/tag selectors are always treated as the most specific kind of selector",
      "All three borders are combined and rendered stacked on top of each other",
    ],
    correctIndexes: [0],
    explanation:
      "CSS specificity is calculated in tiers: ID selectors outrank class/attribute/pseudo-class selectors, which in turn outrank plain element/type selectors. Here '#header' wins purely because it is an ID selector, no matter what value it sets or where it happens to be written in the stylesheet.",
  },
  {
    id: "css-advanced-effects-2",
    question:
      "Two rules, '.btn { color: blue; }' and '.btn { color: green; }', both target the same element and have identical specificity. Which color applies, and why?",
    type: "single",
    options: [
      "Green, because when specificity is exactly equal, the declaration that comes later in the source order (further down the same stylesheet, or in a stylesheet linked later) wins",
      "Blue, because the first rule written for a given selector always takes precedence over any later rule with the same specificity",
      "The two colors are averaged into a blended shade",
      "Neither color applies, so the browser falls back to its default text color",
    ],
    correctIndexes: [0],
    explanation:
      "When two competing declarations tie on specificity, the cascade breaks the tie using source order: whichever rule was declared later wins, which is why '.btn' ends up green here.",
  },
  {
    id: "css-advanced-effects-3",
    question:
      "Which of the following statements about inline styles and !important in the CSS cascade are true?",
    type: "multi",
    options: [
      "An inline style (written via the style attribute) normally outranks any selector written in a stylesheet, including ID selectors",
      "Adding !important to a declaration in a stylesheet can override even an inline style on that element",
      "When two conflicting declarations are both marked !important, the tie is still resolved using specificity and then source order",
      "Once a property is marked !important anywhere on the page, that value is automatically applied to every element",
    ],
    correctIndexes: [0, 1, 2],
    explanation:
      "Inline styles beat every stylesheet selector under normal specificity rules, but !important is a special override that can beat even an inline style; if multiple !important declarations still conflict, specificity and then source order decide the winner. !important only affects the elements matched by its own selector, not the whole page.",
  },
  {
    id: "css-advanced-effects-4",
    question:
      "What is the idiomatic way to define a custom property that should be available globally, and how is it consumed later?",
    type: "single",
    options: [
      "Declare it on ':root { --main-color: teal; }' and read it elsewhere with 'color: var(--main-color);'",
      "Declare it as '$main-color: teal;' at the top of the file and use it with 'color: $main-color;'",
      "Declare it as '@main-color: teal;' and reference it with 'color: @main-color;'",
      "Custom properties must be redeclared inside every single selector that uses them; CSS has no shared or global scope for them",
    ],
    correctIndexes: [0],
    explanation:
      "Native CSS custom properties use a double-hyphen prefix (like --main-color) and are typically set on :root so every element inherits them, then read back with the var() function. The '$' and '@' prefixes belong to preprocessors like Sass and Less, not plain CSS.",
  },
  {
    id: "css-advanced-effects-5",
    question:
      "Which of the following correctly describe native CSS custom properties (e.g. --spacing) and how they differ from preprocessor variables (e.g. Sass's $spacing)?",
    type: "multi",
    options: [
      "Custom properties are resolved at runtime in the browser, so JavaScript can read or update them with element.style.setProperty(), while preprocessor variables are substituted at compile time and no longer exist once the CSS is generated",
      "'var(--spacing, 1rem)' falls back to 1rem only if --spacing has not been defined (or is invalid) in the current scope",
      "Custom properties can be given different values inside different selectors or media queries, so the same var() reference can resolve differently depending on context",
      "Sass variables are inherited through the DOM the same way custom properties are, so a $variable set on a parent element automatically cascades to its children in the compiled CSS",
    ],
    correctIndexes: [0, 1, 2],
    explanation:
      "Custom properties live in the cascade and are resolved live in the browser, which is why JavaScript can change them and var() can supply fallbacks or be overridden per selector or media query. Sass variables, by contrast, are pure compile-time text substitution with no concept of DOM inheritance or runtime scoping.",
  },
  {
    id: "css-advanced-effects-6",
    question:
      "Why would a developer write 'width: calc(100% - 40px);' instead of using a single fixed value?",
    type: "single",
    options: [
      "It lets the width be computed from a mix of a relative unit (percentage) and an absolute unit (pixels), staying responsive while still subtracting a fixed amount, such as padding or a fixed-width sidebar",
      "calc() is required whenever more than one CSS property is declared on the same element",
      "Percentages cannot be used for width at all unless they are wrapped in calc()",
      "calc() always converts its result into pixels only, discarding the percentage portion entirely",
    ],
    correctIndexes: [0],
    explanation:
      "calc() lets you combine different unit types, like % and px, in a single expression, which is exactly what's needed for a responsive size that must still subtract or add a fixed amount.",
  },
  {
    id: "css-advanced-effects-7",
    question:
      "What does 'font-size: clamp(1rem, 4vw, 2rem);' compute to on a very narrow viewport, where 4vw evaluates to less than 1rem?",
    type: "single",
    options: [
      "1rem, because clamp() never lets the value fall below the specified minimum, even if the preferred (middle) value would compute lower",
      "4vw, because the preferred value always wins no matter what the min and max bounds are",
      "2rem, because clamp() always resolves to its maximum value on small screens",
      "0, because a preferred value outside the min/max range makes the entire declaration invalid",
    ],
    correctIndexes: [0],
    explanation:
      "clamp(min, preferred, max) uses the preferred value only when it falls between min and max. If the preferred value would compute below the minimum, the result is pulled up to the minimum instead, and similarly capped at the maximum on the other end.",
  },
  {
    id: "css-advanced-effects-8",
    question:
      "For 'transform: translateX(100px) rotate(45deg);' versus 'transform: rotate(45deg) translateX(100px);', why can these two produce different visual results on the same element?",
    type: "single",
    options: [
      "Each transform function operates within the coordinate system left behind by the previous one, so translating first moves the element along the original axes before it tilts, while rotating first tilts the axes that the following translate then moves along",
      "The order of transform functions is purely stylistic and never changes the rendered result",
      "Only the last function listed is actually applied; any earlier ones in the list are ignored",
      "Browsers reorder transform functions alphabetically before applying them, regardless of how they were written",
    ],
    correctIndexes: [0],
    explanation:
      "CSS transform functions are applied in the order they are written, and each one acts relative to the coordinate space produced by the transforms before it, so translating before rotating moves along the original axes, while rotating first changes the axes a later translate then follows.",
  },
  {
    id: "css-advanced-effects-9",
    question:
      "What does changing 'transform-origin' from its default to 'transform-origin: top left;' do to a 'rotate(45deg)' transform on an element?",
    type: "single",
    options: [
      "It moves the pivot point of the rotation from the element's center (the default) to its top-left corner, so the element swings around that corner instead of spinning in place",
      "It has no effect on rotate(); it only changes the behavior of scale() and skew()",
      "It changes the rotation angle itself from 45deg to a value measured relative to the corner",
      "It moves the element's actual position in normal document flow to the top-left of its containing block",
    ],
    correctIndexes: [0],
    explanation:
      "transform-origin sets the fixed point around which transform functions like rotate() and scale() are calculated. By default that point is the element's center, so moving it to 'top left' makes the element pivot around that corner instead.",
  },
  {
    id: "css-advanced-effects-10",
    question:
      "Why does applying 'transform: rotateY(45deg);' alone often look like a flat, squished shape rather than a convincing 3D tilt?",
    type: "single",
    options: [
      "Without a 'perspective' value set (either as the perspective() function or the perspective property on a parent), the browser has no vanishing point to render the rotation with, so it flattens the depth of the effect",
      "rotateY() is purely a 2D function and has no 3D behavior in any browser",
      "3D transform functions require 'transform-style: flat;' in order to render at all",
      "The element must be given 'display: none;' first for the 3D rotation to take effect",
    ],
    correctIndexes: [0],
    explanation:
      "3D transform functions like rotateY() need a 'perspective' to establish a viewing distance and vanishing point. Without one, the 3D rotation is rendered with no depth cues, which can make it look flat or oddly distorted.",
  },
  {
    id: "css-advanced-effects-11",
    question:
      "In a scene with a rotated parent containing rotated children, what does 'transform-style: preserve-3d;' on the parent do?",
    type: "single",
    options: [
      "It keeps the children positioned in the same 3D space as the parent, so their own 3D transforms render relative to that shared space instead of being flattened into a single 2D plane",
      "It disables all transforms on the child elements entirely",
      "It forces every child element to inherit the exact same rotation angle as the parent",
      "It is purely a development/debugging aid with no effect once the site is deployed",
    ],
    correctIndexes: [0],
    explanation:
      "By default, a 3D-transformed element flattens its children into its own plane. 'transform-style: preserve-3d' tells the browser to keep the children in the same 3D rendering space as the parent, so nested 3D transforms compose correctly instead of collapsing flat.",
  },
  {
    id: "css-advanced-effects-12",
    question:
      "In the shorthand 'transition: background-color 0.3s ease-in-out 0.1s;', what does each value represent, in order?",
    type: "single",
    options: [
      "The property to animate, the duration, the timing function, and then the delay before the transition starts",
      "The delay, the duration, the property, and then the timing function",
      "The property, the delay, the duration, and then the timing function",
      "The timing function, the property, the duration, and then the delay",
    ],
    correctIndexes: [0],
    explanation:
      "The transition shorthand's conventional order is transition-property, transition-duration, transition-timing-function, and transition-delay; when two time values appear, duration is always listed before delay.",
  },
  {
    id: "css-advanced-effects-13",
    question:
      "Which of the following correctly distinguish CSS transitions from CSS animations?",
    type: "multi",
    options: [
      "A transition needs a state change (like :hover, focus, or a class toggled via JavaScript) to trigger it, while an @keyframes animation can start automatically and run without any external trigger",
      "A transition can only interpolate between a start and an end state, while an animation can define multiple intermediate steps using percentage-based keyframes",
      "Animations cannot loop or repeat, while transitions can repeat indefinitely using a transition-iteration-count property",
      "Transitions require JavaScript to run at all, while animations run purely in CSS",
    ],
    correctIndexes: [0, 1],
    explanation:
      "Transitions animate between two states in response to a trigger, while @keyframes animations can define several intermediate steps and start on their own. There is no transition-iteration-count property, and both transitions and animations run in pure CSS without requiring JavaScript.",
  },
  {
    id: "css-advanced-effects-14",
    question:
      "In 'box-shadow: 4px 8px 12px 2px rgba(0,0,0,0.4);', what does the 2px value represent?",
    type: "single",
    options: [
      "The spread radius, which expands (positive) or shrinks (negative) the shadow's size beyond the element's box before the blur is applied",
      "The blur radius, which softens the edges of the shadow",
      "The vertical offset, moving the shadow further down the page",
      "The width of a border drawn around the shadow itself",
    ],
    correctIndexes: [0],
    explanation:
      "box-shadow's values are ordered offset-x, offset-y, blur-radius, spread-radius, then color. Here 4px is offset-x, 8px is offset-y, 12px is the blur radius, and 2px is the spread radius that grows the shadow's shape before blurring.",
  },
  {
    id: "css-advanced-effects-15",
    question:
      "What visual difference does adding the 'inset' keyword make to a box-shadow declaration?",
    type: "single",
    options: [
      "It draws the shadow inside the element's border edge, making it appear to recede into the element, instead of projecting outward behind it",
      "It makes the shadow invisible unless the element also has 'overflow: hidden;'",
      "It swaps the offset-x and offset-y values with each other",
      "It forces the shadow to use the element's border-color instead of the color specified in the declaration",
    ],
    correctIndexes: [0],
    explanation:
      "Without 'inset', a box-shadow is cast outward from the element's edges like a drop shadow. Adding 'inset' flips it to render inside the element's border box, creating a carved-in, recessed appearance.",
  },
  {
    id: "css-advanced-effects-16",
    question:
      "Which of the following statements about text-shadow and layered (comma-separated) shadows are true?",
    type: "multi",
    options: [
      "text-shadow accepts offset-x, offset-y, an optional blur radius, and a color, but unlike box-shadow it has no spread-radius argument",
      "When several shadows are separated by commas in either box-shadow or text-shadow, the first shadow listed renders on top, closer to the viewer, with later ones layered behind it",
      "text-shadow supports a fifth value for spread, exactly like box-shadow does",
      "An element can only ever have one shadow applied to it, so comma-separated shadow lists are not valid CSS",
    ],
    correctIndexes: [0, 1],
    explanation:
      "text-shadow's syntax is limited to offset-x, offset-y, an optional blur, and a color, with no spread value at all. For both box-shadow and text-shadow, listing multiple shadows separated by commas stacks them, with the first one specified rendered on top and later ones layered progressively behind it.",
  },
  {
    id: "css-advanced-effects-17",
    question:
      "How does 'filter: drop-shadow(2px 2px 4px black);' differ from 'box-shadow' when applied to an image with transparent areas, such as a PNG icon?",
    type: "single",
    options: [
      "drop-shadow() follows the actual visible (non-transparent) shape of the image content, casting a shadow that hugs the icon's silhouette, while box-shadow only follows the element's rectangular box",
      "The two are functionally identical and always render the exact same shadow",
      "drop-shadow() can only be applied to text elements, never to images",
      "box-shadow automatically detects transparency and behaves like drop-shadow() without any extra configuration",
    ],
    correctIndexes: [0],
    explanation:
      "filter: drop-shadow() operates on the rendered alpha channel of an element's content, so it can hug an irregular or transparent-cut-out shape like a PNG icon, while box-shadow always outlines the element's rectangular border box regardless of any internal transparency.",
  },
  {
    id: "css-advanced-effects-18",
    question:
      "What is distinctive about 'backdrop-filter: blur(10px);' compared to the regular 'filter' property, and what does it need in order to be visible?",
    type: "single",
    options: [
      "backdrop-filter blurs whatever content is visually behind the element rather than the element itself, so the element (or its background) typically needs some transparency for the blurred backdrop to show through",
      "backdrop-filter blurs the element's own text and children, exactly like filter does, but with better performance",
      "backdrop-filter has no visible effect unless the element also has 'position: fixed;' applied to it",
      "backdrop-filter and filter both process the same layer, so the two properties can never be used on the same element",
    ],
    correctIndexes: [0],
    explanation:
      "Unlike filter, which affects an element's own rendering, backdrop-filter processes the region behind the element. That effect, commonly used for a frosted-glass look, is only visible if the element itself has some transparency, such as a semi-transparent background-color, letting the blurred backdrop show through.",
  },
  {
    id: "css-advanced-effects-19",
    question:
      "What is the difference between the selectors '[data-status]' and '[data-status=\"active\"]'?",
    type: "single",
    options: [
      "'[data-status]' matches any element that has a data-status attribute at all, regardless of its value, while '[data-status=\"active\"]' only matches elements whose data-status attribute value is exactly \"active\"",
      "They are exactly equivalent; the quoted value is just a comment with no effect on matching",
      "'[data-status]' matches only elements where the attribute is empty, and adding a value makes it stop matching entirely",
      "'[data-status=\"active\"]' matches any attribute name at all, as long as its value is \"active\", ignoring the attribute name entirely",
    ],
    correctIndexes: [0],
    explanation:
      "A bare attribute selector like '[data-status]' matches based on the presence of the attribute alone, regardless of its value, while adding '=\"active\"' narrows the match down to only elements whose attribute value is exactly that string.",
  },
  {
    id: "css-advanced-effects-20",
    question:
      "For '<a href=\"https://example.com/report.pdf\">', which selector correctly matches based on the href value ending in a specific substring?",
    type: "single",
    options: [
      "a[href$=\".pdf\"]",
      "a[href^=\".pdf\"]",
      "a[href~=\".pdf\"]",
      "a[href*=\"^.pdf\"]",
    ],
    correctIndexes: [0],
    explanation:
      "The '$=' operator matches an attribute value that ends with the given substring, so 'a[href$=\".pdf\"]' matches any link ending in .pdf. '^=' checks the start of the value instead, '~=' checks for an exact whitespace-separated word match, and '*=' with a caret would just search for the literal characters \"^.pdf\" rather than anchoring to the start.",
  },
];
